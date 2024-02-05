"use strict";
(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["shoppable"],{

/***/ "./components/shoppable-bar/layout/bar-layout.js":
/*!*******************************************************!*\
  !*** ./components/shoppable-bar/layout/bar-layout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_matches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/matches */ "./utils/matches.js");
/* harmony import */ var _shoppable_products_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shoppable-products-overlay */ "./components/shoppable-bar/layout/shoppable-products-overlay.js");
/* harmony import */ var _shoppable_panel_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shoppable-panel-toggle */ "./components/shoppable-bar/layout/shoppable-panel-toggle.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");


const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');




class ShoppableBarLayout extends Component {
  constructor(player, options) {
    super(player, options);
    this.player_ = player;
    this.player().addClass('cld-shoppable-panel');
    this.player().addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_HIDDEN_CLASS);
    this.contentWrpEl_ = dom.createEl('div', {
      className: 'cld-spbl-bar'
    });
    this.contentBannerEl_ = dom.createEl('div', {
      className: 'cld-spbl-banner-msg base-color-text'
    }, {}, this.options_.bannerMsg || 'Shop the Video');
    this.contentWrpEl_.appendChild(this.contentBannerEl_);
    const productsOverlay = new _shoppable_products_overlay__WEBPACK_IMPORTED_MODULE_2__["default"](this.player_, this.options_);
    this.contentWrpEl_.appendChild(productsOverlay.el_);
    this.contentEl_ = dom.createEl('div', {
      className: _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.CLD_SPBL_INNER_BAR
    });
    this.contentWrpEl_.appendChild(this.contentEl_);
    this.player().el().appendChild(this.contentWrpEl_);
    this.addChild(new _shoppable_panel_toggle__WEBPACK_IMPORTED_MODULE_3__["default"](this.player_, {
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
        this.player().removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_HIDDEN_CLASS);
        this.player().addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_VISIBLE_CLASS);
      } else if (open === false) {
        // Close
        this.player().removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_VISIBLE_CLASS);
        this.player().addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_HIDDEN_CLASS);
      } else {
        // Toggle
        this.player().toggleClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_HIDDEN_CLASS);
        this.player().toggleClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_VISIBLE_CLASS);
      }
      let eventName = this.player().hasClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_VISIBLE_CLASS) ? 'productBarMax' : 'productBarMin';
      this.player().trigger(eventName);
    };

    // Open shoppable
    if (this.options_.startState === 'open') {
      this.togglePanel(true);
    }

    // On play start
    this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_5__.PLAYER_EVENT.PLAY, () => {
      if (this.player_.currentTime() < 0.01) {
        // Open shoppable on-play
        if (this.options_.startState === 'openOnPlay') {
          this.togglePanel(true, this.options_.autoClose);
        }

        // Auto-close shoppable
        if (this.options_.autoClose && this.options_.startState.indexOf('open') !== -1) {
          setTimeout(() => {
            // Keep it open while hovered
            if (!(0,utils_matches__WEBPACK_IMPORTED_MODULE_1__.elMatches)(this.contentEl_, ':hover')) {
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
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
        className: `${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_ICON_CLASS} ${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_CUSTOM_ICON_CLASS} ${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLOSE_ICON_CLASS}`
      };
      iconAttrs = {
        style: `background-image: url(${this.options_.toggleIcon})`
      };
    } else {
      iconProps = {
        className: `${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_ICON_CLASS} ${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.ICON_CART_CLASS}`
      };
    }
    const icon = dom.createEl('span', iconProps, iconAttrs);
    const el = super.createEl('a', {
      className: `${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_1__.CLD_SPBL_TOGGLE_CLASS} base-color-bg`
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/time */ "./utils/time.js");
/* harmony import */ var utils_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/find */ "./utils/find.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");

const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());




const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class ShoppableProductsOverlay extends Component {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(player, options);
    this.options_ = options;
    this.player_ = player;
    this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_4__.PLAYER_EVENT.SHOW_PRODUCTS_OVERLAY, this.renderProducts);
    this.dispose = () => {
      this.layout_.dispose();
    };
  }
  renderProducts = () => {
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
  };
  clearLayout = () => {
    this.layout_.innerHTML = '';
    this.player_.removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_PRODUCTS_OVERLAY_CLASS);
  };
  createEl() {
    const dimensions = this.player_.currentDimensions();
    this.layout_ = dom.createEl('div', {
      className: 'cld-spbl-products-overlay',
      style: `padding-top: ${dimensions.height / dimensions.width * 100}%;`
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_matches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/matches */ "./utils/matches.js");
/* harmony import */ var _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../plugins/cloudinary/models/image-source */ "./plugins/cloudinary/models/image-source.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");


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
    if (!(0,utils_matches__WEBPACK_IMPORTED_MODULE_1__.elMatches)(this.el_, `.dragged .${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.CLD_SPBL_ITEM}`)) {
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
      className: `${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.CLD_SPBL_ITEM} base-color-bg accent-color-text`,
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
      className: _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.CLD_SPBL_IMAGE
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
  if (conf.action === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_HOVER_ACTIONS.OVERLAY) {
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
    const switchImgSource = new _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_2__["default"](conf.args.publicId, {
      cloudinaryConfig: cldConf,
      transformation: conf.args.transformation
    });
    const hoverImg = dom.createEl('img', {
      className: `${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.CLD_SPBL_IMAGE} cld-spbl-hover-img`
    }, {
      src: switchImgSource.url(widthTransformation)
    });
    el.appendChild(hoverImg);
  }
};
const addOnClick = (el, conf) => {
  el.setAttribute('data-click-action', conf.action);
  el.setAttribute('data-pause', conf.pause);
  if (conf.action === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_CLICK_ACTIONS.SEEk) {
    el.setAttribute('data-seek', conf.args.time);
  } else if (conf.action === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_3__.SHOPPABLE_CLICK_ACTIONS.GO_TO) {
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/assign */ "./utils/assign.js");
/* harmony import */ var utils_throttle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/throttle */ "./utils/throttle.js");
/* harmony import */ var utils_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils/time */ "./utils/time.js");
/* harmony import */ var _shoppable_panel_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shoppable-panel-item */ "./components/shoppable-bar/panel/shoppable-panel-item.js");
/* harmony import */ var _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../plugins/cloudinary/models/image-source */ "./plugins/cloudinary/models/image-source.js");
/* harmony import */ var _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shoppable-widget.const */ "./components/shoppable-bar/shoppable-widget.const.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");








const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class ShoppablePanel extends Component {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(player, options);
    this.options = options;
    const itemChangeHandler = () => {
      this.render();
    };
    player.on(_utils_consts__WEBPACK_IMPORTED_MODULE_7__.PLAYER_EVENT.SHOPPABLE_ITEM_CHANGED, itemChangeHandler);
    this.render();
    this.dispose = () => {
      super.dispose();
      player.off(_utils_consts__WEBPACK_IMPORTED_MODULE_7__.PLAYER_EVENT.SHOPPABLE_ITEM_CHANGED, itemChangeHandler);
    };
  }
  createEl() {
    const el = super.createEl();
    [_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_6__.CLD_SPBL_PANEL_CLASS, 'base-color-bg'].map(cls => el.classList.add(cls));
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
        product.onHover.args.transformation = (0,utils_assign__WEBPACK_IMPORTED_MODULE_1__.assign)({}, this.options.transformation, product.onHover.args.transformation);
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
      const imageSource = new _plugins_cloudinary_models_image_source__WEBPACK_IMPORTED_MODULE_5__["default"](product.publicId, {
        cloudinaryConfig: cloudinaryConfig,
        transformation: (0,utils_assign__WEBPACK_IMPORTED_MODULE_1__.assign)({}, this.options.transformation, product.transformation)
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
    const throttledScrollToActiveItem = (0,utils_throttle__WEBPACK_IMPORTED_MODULE_2__.throttle)(() => this.scrollToActiveItem(), 1000);
    items.forEach((item, index) => {
      const shoppablePanelItem = new _shoppable_panel_item__WEBPACK_IMPORTED_MODULE_4__["default"](this.player(), {
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
          if (target.dataset.clickAction === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_6__.SHOPPABLE_CLICK_ACTIONS.GO_TO) {
            window.open(target.dataset.gotoUrl, '_blank');
          } else if (target.dataset.clickAction === _shoppable_widget_const__WEBPACK_IMPORTED_MODULE_6__.SHOPPABLE_CLICK_ACTIONS.SEEk) {
            const gotoSecs = (0,utils_time__WEBPACK_IMPORTED_MODULE_3__.parseTime)(target.dataset.seek);
            if (gotoSecs !== null) {
              this.player_.addClass('vjs-has-started'); // Hide the poster image
              if (this.player_.postModal) {
                this.player_.postModal.close();
              }
              this.player_.currentTime(gotoSecs);
              // Close products side-panel
              this.player_.removeClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_6__.SHOPPABLE_PANEL_VISIBLE_CLASS);
              this.player_.addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_6__.SHOPPABLE_PANEL_HIDDEN_CLASS);
              this.player_.addClass(_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_6__.SHOPPABLE_PRODUCTS_OVERLAY_CLASS);
              // Wait for the time update and show the tooltips
              this.player_.one('seeked', () => this.player_.trigger('showProductsOverlay'));
            }
          }

          // pause - true (default), false, or number of seconds
          if (target.dataset.pause !== 'false') {
            this.player_.pause();
            if ((0,utils_time__WEBPACK_IMPORTED_MODULE_3__.parseTime)(target.dataset.pause)) {
              setTimeout(() => {
                this.player_.play();
              }, (0,utils_time__WEBPACK_IMPORTED_MODULE_3__.parseTime)(target.dataset.pause) * 1000);
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
        this.player_.on(_utils_consts__WEBPACK_IMPORTED_MODULE_7__.PLAYER_EVENT.TIME_UPDATE, () => {
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
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
    const slider = postModal.querySelector(`.${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_2__.CLD_SPBL_PANEL_CLASS}`);
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
      style: `background-image: url("${bgSrc.url()}")`
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_bar_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout/bar-layout */ "./components/shoppable-bar/layout/bar-layout.js");
/* harmony import */ var _shoppable_post_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shoppable-post-widget */ "./components/shoppable-bar/shoppable-post-widget.js");
/* harmony import */ var _shoppable_widget_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shoppable-widget.scss */ "./components/shoppable-bar/shoppable-widget.scss");
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
    this._injectCSS(`
      .${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.CLD_SPBL_INNER_BAR} {
        transform: translateX(${width});
      }
      .${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.SHOPPABLE_PANEL_VISIBLE_CLASS} .vjs-control-bar {
        width: calc(100% - ${width});
      }
      .${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.CLD_SPBL_TOGGLE_CLASS} {
        right: ${width};
      }
      .${_shoppable_widget_const__WEBPACK_IMPORTED_MODULE_4__.CLD_SPBL_PANEL_CLASS}{
        width: ${width};
      }
    `);
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

/***/ "./utils/matches.js":
/*!**************************!*\
  !*** ./utils/matches.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   elMatches: () => (/* binding */ elMatches)
/* harmony export */ });
// Test for matches()/
const elMatches = (el, selector) => {
  let p = Element.prototype;
  let f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
};


/***/ }),

/***/ "./utils/throttle.js":
/*!***************************!*\
  !*** ./utils/throttle.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
/**
 * Wraps the given function, `fn`, with a new function that only invokes `fn`
 * at most once per every `wait` milliseconds.
 *
 * @function
 * @param    {Function} fn
 *           The function to be throttled.
 *
 * @param    {number}   wait
 *           The number of milliseconds by which to throttle.
 *
 * @return   {Function}
 */

function throttle(fn, wait) {
  let last = window.performance.now();
  const throttled = function () {
    const now = window.performance.now();
    if (now - last >= wait) {
      fn(...arguments);
      last = now;
    }
  };
  return throttled;
}


/***/ }),

/***/ "./utils/time.js":
/*!***********************!*\
  !*** ./utils/time.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseISO8601: () => (/* binding */ parseISO8601),
/* harmony export */   parseTime: () => (/* binding */ parseTime)
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

/***/ "./components/shoppable-bar/shoppable-widget.scss":
/*!********************************************************!*\
  !*** ./components/shoppable-bar/shoppable-widget.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=shoppable.js.map