(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["shoppable"],{

/***/ "./components/shoppable-bar/layout/bar-layout.js":
/*!*******************************************************!*\
  !*** ./components/shoppable-bar/layout/bar-layout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shoppable_products_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shoppable-products-overlay */ "./components/shoppable-bar/layout/shoppable-products-overlay.js");
/* harmony import */ var _shoppable_panel_toggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shoppable-panel-toggle */ "./components/shoppable-bar/layout/shoppable-panel-toggle.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");

const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');




class ShoppableBarLayout extends Component {
  constructor(player, options) {
    super(player, options);
    this.player_ = player;
    this.player().addClass('cld-shoppable-panel');
    this.player().addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_HIDDEN_CLASS);
    this.contentWrpEl_ = dom.createEl('div', {
      className: 'cld-spbl-bar'
    });
    this.contentBannerEl_ = dom.createEl('div', {
      className: 'cld-spbl-banner-msg base-color-text'
    }, {}, this.options_.bannerMsg || 'Shop the Video');
    this.contentWrpEl_.appendChild(this.contentBannerEl_);
    const productsOverlay = new _shoppable_products_overlay__WEBPACK_IMPORTED_MODULE_1__["default"](this.player_, this.options_);
    this.contentWrpEl_.appendChild(productsOverlay.el_);
    this.contentEl_ = dom.createEl('div', {
      className: _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.CLD_SPBL_INNER_BAR
    });
    this.contentWrpEl_.appendChild(this.contentEl_);
    this.player().el().appendChild(this.contentWrpEl_);
    this.addChild(new _shoppable_panel_toggle__WEBPACK_IMPORTED_MODULE_2__["default"](this.player_, {
      toggleIcon: this.options_.toggleIcon,
      clickHandler: () => {
        this.togglePanel();
      }
    }));
    this.addChild('ShoppablePanel', this.options_);
    this.dispose = () => {
      this.removeLayout();
      super.dispose();
    };
    this.togglePanel = open => {
      if (open === true) {
        // Open
        this.player().removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_HIDDEN_CLASS);
        this.player().addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_VISIBLE_CLASS);
      } else if (open === false) {
        // Close
        this.player().removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_VISIBLE_CLASS);
        this.player().addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_HIDDEN_CLASS);
      } else {
        // Toggle
        this.player().toggleClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_HIDDEN_CLASS);
        this.player().toggleClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_VISIBLE_CLASS);
      }
      let eventName = this.player().hasClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_VISIBLE_CLASS) ? 'productBarMax' : 'productBarMin';
      this.player().trigger(eventName);
    };

    // Open shoppable
    if (this.options_.startState === 'open') {
      this.togglePanel(true);
    }

    // On play start
    this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_4__.PLAYER_EVENT.PLAY, () => {
      if (this.player_.currentTime() < 0.01) {
        // Open shoppable on-play
        if (this.options_.startState === 'openOnPlay') {
          this.togglePanel(true, this.options_.autoClose);
        }

        // Auto-close shoppable
        if (this.options_.autoClose && this.options_.startState.indexOf('open') !== -1) {
          setTimeout(() => {
            // Keep it open while hovered
            if (!this.contentEl_.matches(':hover')) {
              this.togglePanel(false);
            } else {
              this.contentEl_.addEventListener('mouseleave', () => {
                this.togglePanel(false);
              }, {
                once: true
              });
            }
          }, this.options_.autoClose * 1000);
        }
      }
    });
  }
  createEl() {
    const el = super.createEl('div');
    return el;
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('shoppableBarLayout', ShoppableBarLayout);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShoppableBarLayout);

/***/ }),

/***/ "./components/shoppable-bar/layout/shoppable-panel-toggle.js":
/*!*******************************************************************!*\
  !*** ./components/shoppable-bar/layout/shoppable-panel-toggle.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");



const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
class ShoppablePanelToggle extends ClickableComponent {
  constructor(player, options) {
    super(player, options);
    this.options_ = options;
  }
  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.options_.clickHandler();
  }
  createEl() {
    let iconProps = {};
    let iconAttrs = {};
    if (this.options_.toggleIcon) {
      iconProps = {
        className: "".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_ICON_CLASS, " ").concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_CUSTOM_ICON_CLASS, " ").concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLOSE_ICON_CLASS)
      };
      iconAttrs = {
        style: "background-image: url(".concat(this.options_.toggleIcon, ")")
      };
    } else {
      iconProps = {
        className: "".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_ICON_CLASS, " ").concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.ICON_CART_CLASS)
      };
    }
    const icon = dom.createEl('span', iconProps, iconAttrs);
    const el = super.createEl('a', {
      className: "".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_CLASS, " base-color-bg")
    });
    el.appendChild(icon);
    this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENT.PRODUCT_BAR_MIN, () => {
      setTimeout(() => {
        icon.classList.add(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.SHOPPABLE_ANIMATION_CLASS);
        setTimeout(() => {
          icon.classList.remove(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.SHOPPABLE_ANIMATION_CLASS);
        }, 1000);
      }, 500);
    });
    return el;
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('shoppablePanelToggle', ShoppablePanelToggle);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShoppablePanelToggle);

/***/ }),

/***/ "./components/shoppable-bar/layout/shoppable-products-overlay.js":
/*!***********************************************************************!*\
  !*** ./components/shoppable-bar/layout/shoppable-products-overlay.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/time */ "./utils/time.js");
/* harmony import */ var utils_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/find */ "./utils/find.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());




const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class ShoppableProductsOverlay extends Component {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(player, options);
    _defineProperty(this, "renderProducts", () => {
      // Close products side-panel
      this.player_.removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_VISIBLE_CLASS);
      this.player_.addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PANEL_HIDDEN_CLASS);
      this.player_.addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PRODUCTS_OVERLAY_CLASS);
      this.layout_.innerHTML = '';

      // Filter products with appearance on currentTime
      const currentTime = this.player_.currentTime();
      const currentProducts = this.options_.products.filter(product => product.hotspots && product.hotspots.some(a => (0,utils_time__WEBPACK_IMPORTED_MODULE_1__.parseTime)(a.time) === currentTime));
      currentProducts.forEach(product => {
        const hotspot = (0,utils_find__WEBPACK_IMPORTED_MODULE_2__.find)(product.hotspots, hs => (0,utils_time__WEBPACK_IMPORTED_MODULE_1__.parseTime)(hs.time) === currentTime);
        const productName = dom.createEl('div', {
          className: 'cld-spbl-product-hotspot-name'
        }, {}, product.productName);
        const productTooltip = dom.createEl('div', {
          className: 'cld-spbl-product-tooltip cld-spbl-product-tooltip-' + hotspot.tooltipPosition
        }, {}, productName);
        const productHotSpot = dom.createEl('a', {
          className: 'cld-spbl-product-hotspot accent-color-text',
          href: hotspot.clickUrl,
          target: '_blank'
        }, {
          style: 'left:' + hotspot.x + '; top:' + hotspot.y + ';'
        }, productTooltip);
        this.layout_.appendChild(productHotSpot);
      });

      // Remove
      this.player_.one(_utils_consts__WEBPACK_IMPORTED_MODULE_4__.PLAYER_EVENT.SEEKING, this.clearLayout);
      this.player_.one(_utils_consts__WEBPACK_IMPORTED_MODULE_4__.PLAYER_EVENT.PLAY, this.clearLayout);
    });
    _defineProperty(this, "clearLayout", () => {
      this.layout_.innerHTML = '';
      this.player_.removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PRODUCTS_OVERLAY_CLASS);
    });
    this.options_ = options;
    this.player_ = player;
    this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_4__.PLAYER_EVENT.SHOW_PRODUCTS_OVERLAY, this.renderProducts);
    this.dispose = () => {
      this.layout_.dispose();
    };
  }
  createEl() {
    const dimensions = this.player_.currentDimensions();
    this.layout_ = dom.createEl('div', {
      className: 'cld-spbl-products-overlay',
      style: "padding-top: ".concat(dimensions.height / dimensions.width * 100, "%;")
    });
    return this.layout_;
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('ShoppableProductsOverlay', ShoppableProductsOverlay);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShoppableProductsOverlay);

/***/ }),

/***/ "./components/shoppable-bar/panel/shoppable-panel-item.js":
/*!****************************************************************!*\
  !*** ./components/shoppable-bar/panel/shoppable-panel-item.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../plugins/cloudinary/models/image-source */ "./plugins/cloudinary/models/image-source.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");

const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());


const widthTransformation = {
  width: 132
};
class ShoppablePanelItem extends ClickableComponent {
  constructor(player, initOptions) {
    super(player, initOptions);
    this.options_ = initOptions;
    this.isDragged = false;
  }
  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.el_.matches(".dragged .".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.CLD_SPBL_ITEM))) {
      // Prevent click event if dragged
      this.options_.clickHandler(event);
    }
    this.isDragged = false;
  }
  getTitle() {
    return this.options_.conf.title;
  }
  createEl() {
    const el = super.createEl('a', {
      className: "".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.CLD_SPBL_ITEM, " base-color-bg accent-color-text"),
      href: '#'
    });
    el.setAttribute('data-product-id', this.options_.conf.productId || '');
    el.setAttribute('data-product-name', this.options_.conf.productName || '');
    if (this.options_.conf.onHover) {
      addOnHover(el, this.options_.conf.onHover, this.options_.item.cloudinaryConfig());
    }
    if (this.options_.conf.onClick) {
      addOnClick(el, this.options_.conf.onClick);
    }
    const img = super.createEl('img', {
      className: _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.CLD_SPBL_IMAGE
    }, {
      src: this.options_.item.url(widthTransformation)
    });
    el.appendChild(img);
    if (this.getTitle()) {
      const info = dom.createEl('div', {
        className: 'cld-spbl-item-info base-color-semi-bg text-color-text'
      });
      const title = dom.createEl('span', {
        className: 'cld-spbl-item-title'
      }, {}, this.getTitle());
      info.appendChild(title);
      el.appendChild(info);
    }
    return el;
  }
}
const addOnHover = (el, conf, cldConf) => {
  el.setAttribute('data-hover-action', conf.action);
  if (conf.action === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.SHOPPABLE_HOVER_ACTIONS.OVERLAY) {
    const overlayText = dom.createEl('span', {
      className: 'cld-spbl-overlay-text base-color-text'
    }, {}, conf.args);
    const overlay = dom.createEl('span', {
      className: 'cld-spbl-overlay text-color-semi-bg base-color-text'
    }, {
      title: conf.args
    }, overlayText);
    el.appendChild(overlay);
  } else {
    const switchImgSource = new _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_1__["default"](conf.args.publicId, {
      cloudinaryConfig: cldConf,
      transformation: conf.args.transformation
    });
    const hoverImg = dom.createEl('img', {
      className: "".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.CLD_SPBL_IMAGE, " cld-spbl-hover-img")
    }, {
      src: switchImgSource.url(widthTransformation)
    });
    el.appendChild(hoverImg);
  }
};
const addOnClick = (el, conf) => {
  el.setAttribute('data-click-action', conf.action);
  el.setAttribute('data-pause', conf.pause);
  if (conf.action === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.SHOPPABLE_CLICK_ACTIONS.SEEk) {
    el.setAttribute('data-seek', conf.args.time);
  } else if (conf.action === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.SHOPPABLE_CLICK_ACTIONS.GO_TO) {
    el.setAttribute('data-goto-url', conf.args.url);
  }
};
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('shoppablePanelItem', ShoppablePanelItem);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShoppablePanelItem);

/***/ }),

/***/ "./components/shoppable-bar/panel/shoppable-panel.js":
/*!***********************************************************!*\
  !*** ./components/shoppable-bar/panel/shoppable-panel.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/throttle */ "../node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/time */ "./utils/time.js");
/* harmony import */ var _shoppable_panel_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shoppable-panel-item */ "./components/shoppable-bar/panel/shoppable-panel-item.js");
/* harmony import */ var _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../plugins/cloudinary/models/image-source */ "./plugins/cloudinary/models/image-source.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");







const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class ShoppablePanel extends Component {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(player, options);
    this.options = options;
    const itemChangeHandler = () => {
      this.render();
    };
    player.on(_utils_consts__WEBPACK_IMPORTED_MODULE_6__.PLAYER_EVENT.SHOPPABLE_ITEM_CHANGED, itemChangeHandler);
    this.render();
    this.dispose = () => {
      super.dispose();
      player.off(_utils_consts__WEBPACK_IMPORTED_MODULE_6__.PLAYER_EVENT.SHOPPABLE_ITEM_CHANGED, itemChangeHandler);
    };
  }
  createEl() {
    const el = super.createEl();
    [_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_5__.CLD_SPBL_PANEL_CLASS, 'base-color-bg'].map(cls => el.classList.add(cls));
    return el;
  }
  removeAll() {
    const childrens = this.children();
    for (let i = childrens.length - 1; i >= 0; --i) {
      this.removeChild(childrens[i]);
    }
  }
  getItems() {
    const cloudinaryConfig = this.player_.cloudinary.cloudinaryConfig();
    return this.options.products.map(product => {
      if (product.onHover && typeof product.onHover.args === 'object') {
        product.onHover.args.transformation = Object.assign({}, this.options.transformation, product.onHover.args.transformation);
      }
      const conf = {
        productId: product.productId,
        productName: product.productName,
        title: product.title,
        onHover: product.onHover,
        onClick: product.onClick,
        startTime: product.startTime,
        endTime: product.endTime
      };
      const imageSource = new _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_4__["default"](product.publicId, {
        cloudinaryConfig: cloudinaryConfig,
        transformation: Object.assign({}, this.options.transformation, product.transformation)
      });
      return {
        imageSrc: imageSource,
        conf: conf
      };
    });
  }
  scrollToActiveItem() {
    const activeItems = this.el_.getElementsByClassName('active');
    if (activeItems.length > 0) {
      const toScroll = activeItems[0].offsetTop - 12;
      // Test for native scrollTo support (IE will fail)
      if ('scrollBehavior' in document.documentElement.style) {
        this.el_.scrollTo({
          top: toScroll,
          behavior: 'smooth'
        });
      } else {
        this.el_.scrollTop = toScroll;
      }
    }
  }
  render() {
    this.removeAll();
    const items = this.getItems();
    const throttledScrollToActiveItem = lodash_throttle__WEBPACK_IMPORTED_MODULE_1___default()(() => this.scrollToActiveItem(), 1000);
    items.forEach((item, index) => {
      const shoppablePanelItem = new _shoppable_panel_item__WEBPACK_IMPORTED_MODULE_3__["default"](this.player(), {
        item: item.imageSrc,
        conf: item.conf,
        next: index === 1,
        current: index === 0,
        clickHandler: e => {
          let target = e.currentTarget || e.target;
          let evName = this.player_.ended() ? 'productClickPost' : 'productClick';
          this.player_.trigger(evName, {
            productId: target.dataset.productId,
            productName: target.dataset.productName
          });

          // Go to URL, or seek video (set currentTime)
          if (target.dataset.clickAction === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_5__.SHOPPABLE_CLICK_ACTIONS.GO_TO) {
            window.open(target.dataset.gotoUrl, '_blank');
          } else if (target.dataset.clickAction === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_5__.SHOPPABLE_CLICK_ACTIONS.SEEk) {
            const gotoSecs = (0,utils_time__WEBPACK_IMPORTED_MODULE_2__.parseTime)(target.dataset.seek);
            if (gotoSecs !== null) {
              this.player_.addClass('vjs-has-started'); // Hide the poster image
              if (this.player_.postModal) {
                this.player_.postModal.close();
              }
              this.player_.currentTime(gotoSecs);
              // Close products side-panel
              this.player_.removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_5__.SHOPPABLE_PANEL_VISIBLE_CLASS);
              this.player_.addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_5__.SHOPPABLE_PANEL_HIDDEN_CLASS);
              this.player_.addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_5__.SHOPPABLE_PRODUCTS_OVERLAY_CLASS);
              // Wait for the time update and show the tooltips
              this.player_.one('seeked', () => this.player_.trigger('showProductsOverlay'));
            }
          }

          // pause - true (default), false, or number of seconds
          if (target.dataset.pause !== 'false') {
            this.player_.pause();
            if ((0,utils_time__WEBPACK_IMPORTED_MODULE_2__.parseTime)(target.dataset.pause)) {
              setTimeout(() => {
                this.player_.play();
              }, (0,utils_time__WEBPACK_IMPORTED_MODULE_2__.parseTime)(target.dataset.pause) * 1000);
            }
          }
        }
      });
      shoppablePanelItem.on('mouseover', e => {
        let target = e.currentTarget || e.target;
        let evName = this.player_.ended() ? 'productHoverPost' : 'productHover';
        this.player_.trigger(evName, {
          productId: target.dataset.productId,
          productName: target.dataset.productName
        });
      });
      if (typeof item.conf.startTime !== 'undefined' && typeof item.conf.endTime !== 'undefined') {
        this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_6__.PLAYER_EVENT.TIME_UPDATE, () => {
          const time = this.player_.currentTime();
          if (time >= item.conf.startTime && time < item.conf.endTime) {
            shoppablePanelItem.el_.classList.add('active');
            throttledScrollToActiveItem();
          } else if (shoppablePanelItem.el_.classList.contains('active')) {
            shoppablePanelItem.el_.classList.remove('active');
          }
        });
      }
      this.addChild(shoppablePanelItem);
    });
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('shoppablePanel', ShoppablePanel);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShoppablePanel);

/***/ }),

/***/ "./components/shoppable-bar/shoppable-post-widget.js":
/*!***********************************************************!*\
  !*** ./components/shoppable-bar/shoppable-post-widget.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _panel_shoppable_panel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel/shoppable-panel.js */ "./components/shoppable-bar/panel/shoppable-panel.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");



const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
class ShoppablePostWidget {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.options_ = {
      ...options,
      postPlay: true
    };
    this.player_ = player;
    this.render();

    // Handle drag-to-scroll
    this.handleDragToScroll();
    this.dispose = () => {
      this.layout_.dispose();
    };
  }
  handleDragToScroll() {
    const postModal = this.player_.postModal.el_;
    const slider = postModal.querySelector(".".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.CLD_SPBL_PANEL_CLASS));
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    slider.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    document.addEventListener('mouseup', e => {
      isDown = false;
      setTimeout(() => {
        slider.classList.remove('dragged');
      }, 300);
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > 5) {
        e.preventDefault();
      }
    });
    document.addEventListener('mousemove', e => {
      if (!isDown) {
        return;
      }
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
      if (Math.abs(walk) > 5 && !slider.classList.contains('dragged')) {
        slider.classList.add('dragged');
      }
    });
  }
  render() {
    this.player_.postModal = null;
    const el = dom.createEl('div', {
      className: 'cld-spbl-post-play'
    });
    const panel = new _panel_shoppable_panel_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.player_, this.options_);
    const title = dom.createEl('div', {
      className: 'cld-spbl-post-title base-color-text'
    }, {}, this.options_.bannerMsg || 'Shop the Video');

    // Background - poster + blur effect
    const bgSrc = this.player_.cloudinary.currentPoster();
    bgSrc.transformation([bgSrc.transformation().toOptions ? bgSrc.transformation().toOptions() : {}, {
      effect: 'blur:3000'
    }]);
    const panelBg = dom.createEl('div', {
      className: 'cld-spbl-post-play-bg',
      style: "background-image: url(\"".concat(bgSrc.url(), "\")")
    });
    const replayBtn = dom.createEl('button', {
      className: 'cld-spbl-replay-btn base-color-bg vjs-icon-replay',
      onclick: () => {
        this.player_.trigger('replay');
        this.player_.postModal.close();
        this.player_.play();
      }
    }, {}, 'Replay');
    el.appendChild(panelBg);
    el.appendChild(title);
    el.appendChild(panel.el());
    el.appendChild(replayBtn);
    this.player_.postModal = this.player_.createModal(el, {
      name: 'postModal',
      uncloseable: true
    });
    this.player_.addClass('cld-spbl-post-modal');
    this.player_.postModal.on('beforemodalclose', () => {
      this.player_.removeClass('cld-spbl-post-modal');
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShoppablePostWidget);

/***/ }),

/***/ "./components/shoppable-bar/shoppable-widget.const.js":
/*!************************************************************!*\
  !*** ./components/shoppable-bar/shoppable-widget.const.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLD_SPBL_IMAGE: () => (/* binding */ CLD_SPBL_IMAGE),
/* harmony export */   CLD_SPBL_INNER_BAR: () => (/* binding */ CLD_SPBL_INNER_BAR),
/* harmony export */   CLD_SPBL_ITEM: () => (/* binding */ CLD_SPBL_ITEM),
/* harmony export */   CLD_SPBL_PANEL_CLASS: () => (/* binding */ CLD_SPBL_PANEL_CLASS),
/* harmony export */   CLD_SPBL_TOGGLE_CLASS: () => (/* binding */ CLD_SPBL_TOGGLE_CLASS),
/* harmony export */   CLD_SPBL_TOGGLE_CUSTOM_ICON_CLASS: () => (/* binding */ CLD_SPBL_TOGGLE_CUSTOM_ICON_CLASS),
/* harmony export */   CLD_SPBL_TOGGLE_ICON_CLASS: () => (/* binding */ CLD_SPBL_TOGGLE_ICON_CLASS),
/* harmony export */   CLOSE_ICON_CLASS: () => (/* binding */ CLOSE_ICON_CLASS),
/* harmony export */   ICON_CART_CLASS: () => (/* binding */ ICON_CART_CLASS),
/* harmony export */   SHOPPABLE_ANIMATION_CLASS: () => (/* binding */ SHOPPABLE_ANIMATION_CLASS),
/* harmony export */   SHOPPABLE_CLICK_ACTIONS: () => (/* binding */ SHOPPABLE_CLICK_ACTIONS),
/* harmony export */   SHOPPABLE_HOVER_ACTIONS: () => (/* binding */ SHOPPABLE_HOVER_ACTIONS),
/* harmony export */   SHOPPABLE_PANEL_HIDDEN_CLASS: () => (/* binding */ SHOPPABLE_PANEL_HIDDEN_CLASS),
/* harmony export */   SHOPPABLE_PANEL_VISIBLE_CLASS: () => (/* binding */ SHOPPABLE_PANEL_VISIBLE_CLASS),
/* harmony export */   SHOPPABLE_PRODUCTS_OVERLAY_CLASS: () => (/* binding */ SHOPPABLE_PRODUCTS_OVERLAY_CLASS),
/* harmony export */   SHOPPABLE_WIDGET_OPTIONS_DEFAULTS: () => (/* binding */ SHOPPABLE_WIDGET_OPTIONS_DEFAULTS)
/* harmony export */ });
const SHOPPABLE_WIDGET_OPTIONS_DEFAULTS = {
  location: 'right',
  toggleIcon: '',
  width: '20%',
  startState: 'openOnPlay',
  autoClose: 2,
  transformation: {
    quality: 'auto',
    width: 'auto',
    fetch_format: 'auto',
    crop: 'scale'
  },
  products: [],
  showPostPlayOverlay: false
};
const SHOPPABLE_CLICK_ACTIONS = {
  GO_TO: 'goto',
  SEEk: 'seek'
};
const SHOPPABLE_HOVER_ACTIONS = {
  OVERLAY: 'overlay'
};
const SHOPPABLE_PANEL_VISIBLE_CLASS = 'shoppable-panel-visible';
const SHOPPABLE_PANEL_HIDDEN_CLASS = 'shoppable-panel-hidden';
const SHOPPABLE_PRODUCTS_OVERLAY_CLASS = 'shoppable-products-overlay';
const CLD_SPBL_PANEL_CLASS = 'cld-spbl-panel';
const CLD_SPBL_TOGGLE_CLASS = 'cld-spbl-toggle';
const CLD_SPBL_TOGGLE_ICON_CLASS = 'cld-spbl-toggle-icon';
const CLD_SPBL_INNER_BAR = 'cld-spbl-bar-inner';
const CLD_SPBL_TOGGLE_CUSTOM_ICON_CLASS = 'cld-spbl-toggle-custom-icon';
const ICON_CART_CLASS = 'vjs-icon-cart';
const CLOSE_ICON_CLASS = 'vjs-icon-close';
const SHOPPABLE_ANIMATION_CLASS = 'animate';
const CLD_SPBL_ITEM = 'cld-spbl-item';
const CLD_SPBL_IMAGE = 'cld-spbl-img';

/***/ }),

/***/ "./components/shoppable-bar/shoppable-widget.js":
/*!******************************************************!*\
  !*** ./components/shoppable-bar/shoppable-widget.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_bar_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout/bar-layout */ "./components/shoppable-bar/layout/bar-layout.js");
/* harmony import */ var _shoppable_post_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shoppable-post-widget */ "./components/shoppable-bar/shoppable-post-widget.js");
/* harmony import */ var _shoppable_widget_scss_style_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shoppable-widget.scss?style-loader */ "./components/shoppable-bar/shoppable-widget.scss?style-loader");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");






class ShoppableWidget {
  constructor(player) {
    let initOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.options_ = video_js__WEBPACK_IMPORTED_MODULE_0___default().obj.merge(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_WIDGET_OPTIONS_DEFAULTS, initOptions);
    this.player_ = player;
    if (this.options_.showPostPlayOverlay) {
      this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_5__.PLAYER_EVENT.ENDED, () => {
        this.player_.addChild(new _shoppable_post_widget__WEBPACK_IMPORTED_MODULE_2__["default"](this.player_, this.options_));
      });
    }
    const width = this.options_.width;
    this._injectCSS("\n      .".concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.CLD_SPBL_INNER_BAR, " {\n        transform: translateX(").concat(width, ");\n      }\n      .").concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_VISIBLE_CLASS, " .vjs-control-bar {\n        width: calc(100% - ").concat(width, ");\n      }\n      .").concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.CLD_SPBL_TOGGLE_CLASS, " {\n        right: ").concat(width, ";\n      }\n      .").concat(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.CLD_SPBL_PANEL_CLASS, "{\n        width: ").concat(width, ";\n      }\n    "));
    this._setListeners();
  }
  _setListeners() {
    const resizeHandler = this._resizeHandler.bind(this);
    this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_5__.PLAYER_EVENT.RESIZE, resizeHandler);
    window.addEventListener('resize', resizeHandler);
    this.dispose = () => {
      this.player_.off(_utils_consts__WEBPACK_IMPORTED_MODULE_5__.PLAYER_EVENT.RESIZE, resizeHandler);
      window.removeEventListener('resize', resizeHandler);
      this.layout_.dispose();
    };
  }
  _injectCSS(css) {
    const style = document.createElement('style');
    style.innerHTML = css;
    this.player_.el_.appendChild(style);
  }
  _resizeHandler() {
    const shoppableBarBreakpoints = [['sm', 0, 80], ['md', 81, 110], ['lg', 111, 170]];
    const shoppableBarWidth = parseFloat(this.options_.width) / 100.0 * this.player_.el_.clientWidth;
    let inRange = false;
    if (shoppableBarWidth) {
      for (const [name, min, max] of shoppableBarBreakpoints) {
        if (shoppableBarWidth > min && shoppableBarWidth <= max) {
          this.layout_.contentWrpEl_.setAttribute('size', name);
          inRange = name;
        }
      }
      if (!inRange) {
        this.layout_.contentWrpEl_.removeAttribute('size');
      }
    }
  }
  init() {
    this.render();
  }
  render() {
    this.layout_ = new _layout_bar_layout__WEBPACK_IMPORTED_MODULE_1__["default"](this.player_, this.options_);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShoppableWidget);

/***/ }),

/***/ "./utils/time.js":
/*!***********************!*\
  !*** ./utils/time.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseTime: () => (/* binding */ parseTime)
/* harmony export */ });
// Convert time string i.e. '2:40' to seconds number (160)
// Also allows h:m:s format and mm:ss, m:s etc.
const parseTime = function (hms) {
  const [seconds, minutes, hours] = hms.split(':').reverse();
  let sum = null;
  if (!isNaN(seconds)) {
    sum = (+hours || 0) * 60 * 60 + (+minutes || 0) * 60 + +seconds;
  }
  return sum;
};


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/shoppable-bar/shoppable-widget.scss?style-loader":
/*!****************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/shoppable-bar/shoppable-widget.scss?style-loader ***!
  \****************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, `.cld-spbl-bar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.cld-spbl-bar-inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(20%);
  transition: transform 0.3s;
}

.cld-video-player .vjs-control-bar {
  transition: width 0.3s;
}

.shoppable-panel-visible .cld-spbl-bar-inner {
  transform: translateX(0);
}
.shoppable-panel-visible .vjs-control-bar {
  width: 80%;
}
.shoppable-panel-visible .cld-spbl-toggle-icon:before {
  content: "\\f119";
}

.cld-spbl-banner-msg {
  position: absolute;
  font-size: 2em;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  left: 0;
  top: calc(50% + 3em);
  width: 100%;
  text-align: center;
}
.cld-video-player.vjs-has-started .cld-spbl-banner-msg, .cld-video-player.vjs-error .cld-spbl-banner-msg {
  display: none;
}

.cld-spbl-toggle {
  position: absolute;
  top: 3%;
  right: 20%;
  color: inherit;
  border-radius: 6px 0 0 6px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  pointer-events: all;
  text-decoration: none;
}
.cld-spbl-toggle:hover {
  color: inherit;
  text-decoration: none;
}
.cld-spbl-toggle:focus {
  outline: none;
}

.cld-spbl-toggle-icon {
  display: block;
  animation-duration: 1s;
  animation-fill-mode: both;
}
.cld-spbl-toggle-icon.cld-spbl-toggle-custom-icon {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
}
.shoppable-panel-hidden .cld-spbl-toggle-icon.cld-spbl-toggle-custom-icon:before {
  display: none;
}
.shoppable-panel-visible .cld-spbl-toggle-icon.cld-spbl-toggle-custom-icon {
  background-image: none !important;
}
.cld-spbl-toggle-icon.animate, .shoppable-panel-hidden .cld-spbl-toggle-icon:hover {
  animation-name: tada;
  animation-iteration-count: infinite;
}

.cld-spbl-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20%;
  overflow: auto;
  pointer-events: all;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.cld-spbl-panel::-webkit-scrollbar {
  display: none;
}

.cld-spbl-item {
  display: block;
  position: relative;
  margin: 12px 8px;
  color: inherit;
  transform: scale(0.98);
  transition: transform 0.3s;
}
.cld-spbl-bar[size=md] .cld-spbl-item {
  font-size: 10px;
}
.cld-spbl-bar[size=sm] .cld-spbl-item {
  font-size: 8px;
}
.cld-spbl-item:before, .cld-spbl-item:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  box-shadow: 0 0 0;
  transition: box-shadow 0.3s;
  border-radius: 3px;
}
.cld-spbl-item.active {
  transform: scale(1);
}
.cld-spbl-item.active:before {
  opacity: 0.5;
  box-shadow: 0 0 0 4px;
}
.cld-spbl-item.active:after {
  box-shadow: 0 0 0 2px;
}
.cld-spbl-item:hover {
  color: inherit;
}

.cld-spbl-img {
  max-width: 100%;
  height: auto;
}

.cld-spbl-hover-img {
  display: none;
}

.cld-spbl-item-info {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  max-height: 100%;
  overflow: hidden;
  padding: 6%;
}

.cld-spbl-overlay {
  display: inline-flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  line-height: 1.3;
  font-size: 120%;
  text-align: center;
  padding: 10%;
  z-index: 1;
  opacity: 0;
}
.cld-spbl-overlay .cld-spbl-overlay-text {
  margin: auto;
}

.cld-spbl-item:hover .cld-spbl-overlay {
  opacity: 1;
}
.cld-spbl-item:hover .cld-spbl-overlay ~ .cld-spbl-item-info {
  display: none;
}
.cld-spbl-item:hover .cld-spbl-hover-img {
  display: block;
}
.cld-spbl-item:hover .cld-spbl-hover-img + .cld-spbl-img {
  display: none;
}

.cld-spbl-post-play .cld-spbl-post-play-bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
}
.cld-spbl-post-play .cld-spbl-post-title {
  position: absolute;
  font-size: 1.5em;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0.8em;
  width: 100%;
  text-align: center;
}
.cld-spbl-post-play .cld-spbl-panel {
  width: 100%;
  top: 16%;
  height: 60%;
  padding: 10px 8px;
  white-space: nowrap;
  background: none !important;
  cursor: grab;
}
.cld-spbl-post-play .cld-spbl-panel:active {
  cursor: grabbing;
}
.cld-spbl-post-play .cld-spbl-item {
  display: inline-block;
  width: 28%;
  padding-top: 28%;
  margin: 0 8px;
  white-space: normal;
  vertical-align: top;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px 1.2px rgba(0, 0, 0, 0.24), 0 6px 8px 4px rgba(0, 0, 0, 0.24);
  transform: none;
}
.cld-spbl-post-play .cld-spbl-img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto auto;
}
.cld-spbl-post-play .cld-spbl-replay-btn {
  position: absolute;
  left: 5%;
  bottom: 10%;
  font-family: inherit;
  padding: 8px 15px;
  border-radius: 5px;
}
.cld-spbl-post-play .cld-spbl-replay-btn:before {
  font-family: VideoJS;
  vertical-align: bottom;
  margin-right: 4px;
}

.cld-spbl-post-modal .cld-spbl-bar,
.cld-spbl-post-modal .vjs-big-play-button,
.cld-spbl-post-modal .vjs-recommendations-overlay {
  display: none;
}

@keyframes tada {
  0% {
    transform: scale3d(1, 1, 1);
  }
  10%, 20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%, 60%, 80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
.shoppable-products-overlay .vjs-title-bar,
.shoppable-products-overlay .vjs-big-play-button {
  display: none !important;
}

.cld-spbl-products-overlay {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.cld-spbl-product-hotspot {
  pointer-events: all;
  position: absolute;
  cursor: pointer;
  padding: 15px;
}
.cld-spbl-product-hotspot:after {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  background: #fff;
  box-shadow: 0 0 0 4px #0078FF, 0 0 0 8px rgba(0, 120, 255, 0.24);
  border-radius: 18px;
}
.cld-spbl-product-hotspot:hover .cld-spbl-product-tooltip {
  display: block;
}

.cld-spbl-product-tooltip {
  display: none;
  position: absolute;
  white-space: nowrap;
  padding: 4px 6px;
  border-radius: 4px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.cld-spbl-product-tooltip.cld-spbl-product-tooltip-top {
  top: auto;
  bottom: 100%;
}
.cld-spbl-product-tooltip.cld-spbl-product-tooltip-left {
  top: 50%;
  right: 100%;
  left: auto;
  transform: translateY(-50%);
}
.cld-spbl-product-tooltip.cld-spbl-product-tooltip-right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
}`, "",{"version":3,"sources":["webpack://./components/shoppable-bar/shoppable-widget.scss"],"names":[],"mappings":"AACA;EACE,kBAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,oBAAA;EACA,gBAAA;EACA,UAAA;AAAF;;AAEA;EACE,kBAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,0BAAA;EACA,0BAAA;AACF;;AACA;EACE,sBAAA;AAEF;;AACE;EACE,wBAAA;AAEJ;AAAE;EACE,UAAA;AAEJ;AAAE;EACE,gBAAA;AAEJ;;AACA;EACE,kBAAA;EACA,cAAA;EACA,uCAAA;EACA,OAAA;EACA,oBAAA;EACA,WAAA;EACA,kBAAA;AAEF;AADE;EAEE,aAAA;AAEJ;;AACA;EACE,kBAAA;EACA,OAAA;EACA,UAlDM;EAmDN,cAAA;EACA,0BAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;EACA,qBAAA;AAEF;AADE;EACE,cAAA;EACA,qBAAA;AAGJ;AADE;EACE,aAAA;AAGJ;;AAAA;EAuBE,cAAA;EACA,sBAAA;EACA,yBAAA;AAnBF;AAHE;EACE,kBAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,2BAAA;EACA,4BAAA;EACA,oBAAA;AAKJ;AAHM;EACE,aAAA;AAKR;AAFI;EACE,iCAAA;AAIN;AAIE;EAEE,oBAAA;EACA,mCAAA;AAHJ;;AAOA;EACE,kBAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,UA3GM;EA4GN,cAAA;EACA,mBAAA;EAGA,wBAAA;EACA,qBAAA;AANF;AAOE;EACE,aAAA;AALJ;;AAQA;EACE,cAAA;EACA,kBAAA;EACA,gBAAA;EACA,cAAA;EACA,sBAAA;EACA,0BAAA;AALF;AAOE;EACE,eAAA;AALJ;AAOE;EACE,cAAA;AALJ;AAQE;EAEE,WAAA;EACA,kBAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,UAAA;EACA,oBAAA;EACA,iBAAA;EACA,2BAAA;EACA,kBAAA;AAPJ;AASE;EACE,mBAAA;AAPJ;AAQI;EACE,YAAA;EACA,qBAAA;AANN;AAQI;EACE,qBAAA;AANN;AAUE;EACE,cAAA;AARJ;;AAWA;EACE,eAAA;EACA,YAAA;AARF;;AAUA;EACE,aAAA;AAPF;;AASA;EACE,kBAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,gBAAA;EACA,gBAAA;EACA,WAAA;AANF;;AAQA;EACE,oBAAA;EACA,kBAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;EACA,YAAA;EACA,UAAA;EACA,UAAA;AALF;AAOE;EACE,YAAA;AALJ;;AASE;EACE,UAAA;AANJ;AAOI;EACE,aAAA;AALN;AAQE;EACE,cAAA;AANJ;AAQM;EACE,aAAA;AANR;;AAaE;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,sBAAA;AAVJ;AAYE;EACE,kBAAA;EACA,gBAAA;EACA,uCAAA;EACA,OAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;AAVJ;AAYE;EACE,WAAA;EACA,QAAA;EACA,WAAA;EACA,iBAAA;EACA,mBAAA;EACA,2BAAA;EAEA,YAAA;AAXJ;AAYI;EACE,gBAAA;AAVN;AAaE;EACE,qBAAA;EACA,UAAA;EACA,gBAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kFAAA;EACA,eAAA;AAXJ;AAaE;EACE,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,mBAAA;AAXJ;AAaE;EACE,kBAAA;EACA,QAAA;EACA,WAAA;EACA,oBAAA;EACA,iBAAA;EACA,kBAAA;AAXJ;AAYI;EACE,oBAAA;EACA,sBAAA;EACA,iBAAA;AAVN;;AAgBE;;;EAGE,aAAA;AAbJ;;AAiBA;EACE;IACE,2BAAA;EAdF;EAgBA;IACE,0DAAA;EAdF;EAgBA;IACE,yDAAA;EAdF;EAgBA;IACE,0DAAA;EAdF;EAgBA;IACE,2BAAA;EAdF;AACF;AAmBE;;EAEE,wBAAA;AAjBJ;;AAoBA;EACE,kBAAA;EACA,WAAA;EACA,QAAA;EACA,2BAAA;AAjBF;;AAmBA;EACE,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;AAhBF;AAiBE;EACE,WAAA;EACA,cAAA;EACA,UAAA;EACA,WAAA;EACA,gBAAA;EACA,gEAAA;EACA,mBAAA;AAfJ;AAkBE;EACE,cAAA;AAhBJ;;AAmBA;EACE,aAAA;EACA,kBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,SAAA;EACA,SAAA;EACA,2BAAA;AAhBF;AAiBE;EACE,SAAA;EACA,YAAA;AAfJ;AAiBE;EACE,QAAA;EACA,WAAA;EACA,UAAA;EACA,2BAAA;AAfJ;AAiBE;EACE,QAAA;EACA,UAAA;EACA,2BAAA;AAfJ","sourcesContent":["$width: 20%;\n.cld-spbl-bar {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 1;\n}\n.cld-spbl-bar-inner {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  transform: translateX($width);\n  transition: transform .3s;\n}\n.cld-video-player .vjs-control-bar {\n  transition: width .3s;\n}\n.shoppable-panel-visible {\n  .cld-spbl-bar-inner {\n    transform: translateX(0);\n  }\n  .vjs-control-bar {\n    width: 100% - $width;\n  }\n  .cld-spbl-toggle-icon:before {\n    content: \"\\f119\";\n  }\n}\n.cld-spbl-banner-msg {\n  position: absolute;\n  font-size: 2em;\n  text-shadow: 0 0 5px rgba(#000, .5);\n  left: 0;\n  top: calc(50% + 3em);\n  width: 100%;\n  text-align: center;\n  .cld-video-player.vjs-has-started &,\n  .cld-video-player.vjs-error & {\n    display: none;\n  }\n}\n.cld-spbl-toggle {\n  position: absolute;\n  top: 3%;\n  right: $width;\n  color: inherit;\n  border-radius: 6px 0 0 6px;\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n  font-size: 24px;\n  text-align: center;\n  cursor: pointer;\n  pointer-events: all;\n  text-decoration: none;\n  &:hover {\n    color: inherit;\n    text-decoration: none;\n  }\n  &:focus {\n    outline: none;\n  }\n}\n.cld-spbl-toggle-icon {\n\n  // Custom toggle icon\n  &.cld-spbl-toggle-custom-icon {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: 75%;\n    .shoppable-panel-hidden & {\n      &:before {\n        display: none;\n      }\n    }\n    .shoppable-panel-visible & {\n      background-image: none !important;\n    }\n  }\n\n  // Animate\n  display: block;\n  animation-duration: 1s;\n  animation-fill-mode: both;\n  &.animate,\n  .shoppable-panel-hidden &:hover {\n    animation-name: tada;\n    animation-iteration-count: infinite;\n  }\n\n}\n.cld-spbl-panel {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: $width;\n  overflow: auto;\n  pointer-events: all;\n\n  // Hide scrollbar\n  -ms-overflow-style: none;  // Internet Explorer 10+\n  scrollbar-width: none;  // Firefox\n  &::-webkit-scrollbar {\n    display: none;  // Safari and Chrome\n  }\n}\n.cld-spbl-item {\n  display: block;\n  position: relative;\n  margin: 12px 8px;\n  color: inherit;\n  transform: scale(0.98);\n  transition: transform .3s;\n\n  .cld-spbl-bar[size=\"md\"] & {\n    font-size: 10px;\n  }\n  .cld-spbl-bar[size=\"sm\"] & {\n    font-size: 8px;\n  }\n\n  &:before,\n  &:after {\n    content:  \"\";\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 0;\n    pointer-events: none;\n    box-shadow: 0 0 0;\n    transition: box-shadow .3s;\n    border-radius: 3px;\n  }\n  &.active {\n    transform: scale(1);\n    &:before {\n      opacity: .5;\n      box-shadow: 0 0 0 4px;\n    }\n    &:after {\n      box-shadow: 0 0 0 2px;\n    }\n\n  }\n  &:hover {\n    color: inherit;\n  }\n}\n.cld-spbl-img {\n  max-width: 100%;\n  height: auto;\n}\n.cld-spbl-hover-img {\n  display: none;\n}\n.cld-spbl-item-info {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  max-height: 100%;\n  overflow: hidden;\n  padding: 6%;\n}\n.cld-spbl-overlay {\n  display: inline-flex;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  line-height: 1.3;\n  font-size: 120%;\n  text-align: center;\n  padding: 10%;\n  z-index: 1;\n  opacity: 0;\n\n  .cld-spbl-overlay-text {\n    margin: auto;\n  }\n}\n.cld-spbl-item:hover {\n  .cld-spbl-overlay {\n    opacity: 1;\n    ~ .cld-spbl-item-info {\n      display: none;\n    }\n  }\n  .cld-spbl-hover-img {\n    display: block;\n    + {\n      .cld-spbl-img {\n        display: none;\n      }\n    }\n  }\n}\n\n.cld-spbl-post-play {\n  .cld-spbl-post-play-bg {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    background-size: cover;\n  }\n  .cld-spbl-post-title {\n    position: absolute;\n    font-size: 1.5em;\n    text-shadow: 0 0 5px rgba(#000, .5);\n    left: 0;\n    top: 0.8em;\n    width: 100%;\n    text-align: center;\n  }\n  .cld-spbl-panel {\n    width:  100%;\n    top: 16%;\n    height: 60%;\n    padding: 10px 8px;\n    white-space: nowrap;\n    background: none !important;\n\n    cursor: grab;\n    &:active {\n      cursor: grabbing;\n    }\n  }\n  .cld-spbl-item {\n    display: inline-block;\n    width: 28%;\n    padding-top: 28%;\n    margin: 0 8px;\n    white-space: normal;\n    vertical-align: top;\n    border-radius: 10px;\n    overflow: hidden;\n    box-shadow: 0 4px 6px 1.2px rgba(0,0,0,0.24), 0 6px 8px 4px rgba(0,0,0,0.24);\n    transform: none;\n  }\n  .cld-spbl-img {\n    max-width: 100%;\n    max-height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    margin: 0 auto auto;\n  }\n  .cld-spbl-replay-btn {\n    position: absolute;\n    left: 5%;\n    bottom: 10%;\n    font-family: inherit;\n    padding: 8px 15px;\n    border-radius: 5px;\n    &:before {\n      font-family: VideoJS;\n      vertical-align: bottom;\n      margin-right: 4px;\n    }\n  }\n}\n\n.cld-spbl-post-modal {\n  .cld-spbl-bar,\n  .vjs-big-play-button,\n  .vjs-recommendations-overlay {\n    display: none;\n  }\n}\n\n@keyframes tada {\n  0% {\n    transform: scale3d(1, 1, 1);\n  }\n  10%, 20% {\n    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n  }\n  30%, 50%, 70%, 90% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n  40%, 60%, 80% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n  100% {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n// cld-spbl-products-overlay\n.shoppable-products-overlay {\n  .vjs-title-bar,\n  .vjs-big-play-button {\n    display: none !important;\n  }\n}\n.cld-spbl-products-overlay {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n}\n.cld-spbl-product-hotspot {\n  pointer-events: all;\n  position: absolute;\n  cursor: pointer;\n  padding: 15px;\n  &:after {\n    content: '';\n    display: block;\n    width: 8px;\n    height: 8px;\n    background: #fff;\n    box-shadow: 0 0 0 4px #0078FF, 0 0 0 8px rgba(0,120,255,0.24);\n    border-radius: 18px;\n  }\n\n  &:hover .cld-spbl-product-tooltip {\n    display: block;\n  }\n}\n.cld-spbl-product-tooltip {\n  display: none;\n  position: absolute;\n  white-space: nowrap;\n  padding: 4px 6px;\n  border-radius: 4px;\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  &.cld-spbl-product-tooltip-top {\n    top: auto;\n    bottom: 100%;\n  }\n  &.cld-spbl-product-tooltip-left {\n    top: 50%;\n    right: 100%;\n    left: auto;\n    transform: translateY(-50%);\n  }\n  &.cld-spbl-product-tooltip-right {\n    top: 50%;\n    left: 100%;\n    transform: translateY(-50%);\n  }\n\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/lodash/debounce.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/debounce.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "../node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "../node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "../node_modules/lodash/now.js":
/*!*************************************!*\
  !*** ../node_modules/lodash/now.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "../node_modules/lodash/throttle.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/throttle.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debounce = __webpack_require__(/*! ./debounce */ "../node_modules/lodash/debounce.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),

/***/ "./components/shoppable-bar/shoppable-widget.scss?style-loader":
/*!*********************************************************************!*\
  !*** ./components/shoppable-bar/shoppable-widget.scss?style-loader ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_shoppable_widget_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./shoppable-widget.scss?style-loader */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/shoppable-bar/shoppable-widget.scss?style-loader");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_shoppable_widget_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_shoppable_widget_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_shoppable_widget_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_shoppable_widget_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

}]);
//# sourceMappingURL=shoppable.light.js.map