/*!
* Vuetify v3.0.0-alpha.2
* Forged by John Leider
* Released under the MIT License.
*/     
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["Vuetify"] = factory(require("vue"));
	else
		root["Vuetify"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_vue__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/VApp/VApp.tsx":
/*!**************************************!*\
  !*** ./src/components/VApp/VApp.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VApp_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VApp.sass */ "./src/components/VApp/VApp.sass");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");

// Styles
 // Utilities


 // Composables



/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VApp',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    theme: String,
    ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.makeLayoutProps)()
  }),

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_4__.useTheme)();
    const {
      layoutClasses
    } = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.createLayout)(props);
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": ['v-application', themeClasses.value, layoutClasses.value],
      "data-app": "true"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": "v-application__wrap"
    }, [slots.default == null ? void 0 : slots.default()])], 2);
  }

}));

/***/ }),

/***/ "./src/components/VApp/index.ts":
/*!**************************************!*\
  !*** ./src/components/VApp/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VApp": () => (/* reexport safe */ _VApp__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VApp */ "./src/components/VApp/VApp.tsx");



/***/ }),

/***/ "./src/components/VAvatar/VAvatar.tsx":
/*!********************************************!*\
  !*** ./src/components/VAvatar/VAvatar.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VAvatar_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAvatar.sass */ "./src/components/VAvatar/VAvatar.sass");
/* harmony import */ var _composables_border_radius__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/border-radius */ "./src/composables/border-radius.ts");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");

// Styles
 // Composables




 // Utilities


/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VAvatar',
  props: { ...(0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_2__.makeBorderRadiusProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_3__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)(),
    color: String,
    left: Boolean,
    right: Boolean
  },

  setup(props, {
    slots
  }) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_5__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      borderRadiusClasses
    } = (0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_2__.useBorderRadius)(props);
    const {
      sizeClasses,
      sizeStyles
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_3__.useSize)(props, 'v-avatar');
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-avatar', {
        'v-avatar--left': props.left,
        'v-avatar--right': props.right
      }, backgroundColorClasses.value, borderRadiusClasses.value, sizeClasses.value],
      "style": [backgroundColorStyles.value, sizeStyles.value]
    }, {
      default: () => [slots.default == null ? void 0 : slots.default()]
    }, 8, ["class", "style"]);
  }

}));

/***/ }),

/***/ "./src/components/VAvatar/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VAvatar/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VAvatar": () => (/* reexport safe */ _VAvatar__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VAvatar */ "./src/components/VAvatar/VAvatar.tsx");


/***/ }),

/***/ "./src/components/VBanner/VBanner.tsx":
/*!********************************************!*\
  !*** ./src/components/VBanner/VBanner.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBanner_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBanner.sass */ "./src/components/VBanner/VBanner.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_border_radius__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border-radius */ "./src/composables/border-radius.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables







 // Utilities



/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VBanner',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({ ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.makeBorderRadiusProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.makePositionProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)(),
    avatar: String,
    icon: String,
    mobile: Boolean,
    singleLine: Boolean,
    sticky: Boolean
  }),

  setup(props, {
    slots
  }) {
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-banner');
    const {
      borderRadiusClasses
    } = (0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.useBorderRadius)(props);
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.usePosition)(props, 'v-banner');
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)();
    return () => {
      const hasThumbnail = !!props.avatar || !!props.icon || !!slots.thumbnail;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-banner', {
          'v-banner--has-thumbnail': hasThumbnail,
          'v-banner--is-mobile': props.mobile,
          'v-banner--single-line': props.singleLine,
          'v-banner--sticky': props.sticky
        }, themeClasses.value, borderClasses.value, borderRadiusClasses.value, elevationClasses.value, positionClasses.value],
        "style": [dimensionStyles.value, positionStyles.value],
        "role": "banner"
      }, {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-banner__sizer"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-banner__content"
        }, [hasThumbnail && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-banner__thumbnail"
        }, [slots.thumbnail == null ? void 0 : slots.thumbnail(), props.avatar && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
          "class": "v-banner__avatar",
          "src": props.avatar,
          "alt": ""
        }, null, 8, ["src"]), props.icon && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
          "class": "v-banner__icon"
        }, [props.icon])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-banner__text"
        }, [slots.default == null ? void 0 : slots.default()])]), slots.actions && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-banner__actions"
        }, [slots.actions == null ? void 0 : slots.actions()])])],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VBanner/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VBanner/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VBanner": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VBanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBanner */ "./src/components/VBanner/VBanner.tsx");


/***/ }),

/***/ "./src/components/VBtn/VBtn.tsx":
/*!**************************************!*\
  !*** ./src/components/VBtn/VBtn.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBtn_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBtn.sass */ "./src/components/VBtn/VBtn.sass");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_border_radius__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border-radius */ "./src/composables/border-radius.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple/index.ts");
/* harmony import */ var _VIcon_VIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../VIcon/VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
/* harmony import */ var _util_useDirective__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../util/useDirective */ "./src/util/useDirective.ts");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");

// Styles
 // Composables









 // Directives

 // Components

 // Utilities





/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VBtn',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({ ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.makeBorderRadiusProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_5__.makeDensityProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_6__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_7__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_8__.makePositionProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_9__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_10__.makeTagProps)({
      tag: 'button'
    }),
    text: Boolean,
    flat: Boolean,
    plain: Boolean,
    icon: [Boolean, String],
    block: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    disabled: Boolean
  }),

  setup(props, {
    slots
  }) {
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-btn');
    const {
      borderRadiusClasses
    } = (0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.useBorderRadius)(props);
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_5__.useDensity)(props, 'v-btn');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_6__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_7__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_8__.usePosition)(props, 'v-btn');
    const {
      sizeClasses
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_9__.useSize)(props, 'v-btn');
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_11__.useTheme)();
    const isContained = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return !(props.text || props.plain || props.icon || props.outlined || props.border !== false);
    });
    const isElevated = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return isContained.value && !(props.disabled || props.flat);
    });
    const {
      colorClasses,
      colorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_12__.useColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
      [isContained.value ? 'background' : 'text']: props.color
    })));
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "type": "button",
      "class": ['v-btn', {
        'v-btn--contained': isContained.value,
        'v-btn--elevated': isElevated.value,
        'v-btn--icon': !!props.icon,
        'v-btn--plain': props.plain,
        'v-btn--block': props.block,
        'v-btn--disabled': props.disabled
      }, borderClasses.value, borderRadiusClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, sizeClasses.value, themeClasses.value],
      "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
      "disabled": props.disabled
    }, {
      default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
        "class": "v-btn__overlay"
      }, null), typeof props.icon === 'boolean' ? slots.default == null ? void 0 : slots.default() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon_VIcon__WEBPACK_IMPORTED_MODULE_13__.default, {
        "icon": props.icon,
        "size": props.size
      }, null, 8, ["icon", "size"])],
      _: 1
    }, 8, ["class", "style", "disabled"]), [(0,_util_useDirective__WEBPACK_IMPORTED_MODULE_14__.useDirective)(_directives_ripple__WEBPACK_IMPORTED_MODULE_15__.Ripple, {
      value: !props.disabled,
      modifiers: {
        center: !!props.icon
      }
    })]);
  }

}));

/***/ }),

/***/ "./src/components/VBtn/index.ts":
/*!**************************************!*\
  !*** ./src/components/VBtn/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VBtn": () => (/* reexport safe */ _VBtn__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBtn */ "./src/components/VBtn/VBtn.tsx");


/***/ }),

/***/ "./src/components/VDivider/VDivider.tsx":
/*!**********************************************!*\
  !*** ./src/components/VDivider/VDivider.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VDivider_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VDivider.sass */ "./src/components/VDivider/VDivider.sass");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");

// Styles
 // Utilities



 // Composables

 // Types

/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VDivider',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    inset: Boolean,
    length: [Number, String],
    thickness: [Number, String],
    vertical: Boolean
  }),

  setup(props, {
    attrs
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
    const dividerStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const styles = {};

      if (props.length) {
        styles[props.vertical ? 'maxHeight' : 'maxWidth'] = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.convertToUnit)(props.length);
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.convertToUnit)(props.thickness);
      }

      return styles;
    });
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
        "class": [{
          'v-divider': true,
          'v-divider--inset': props.inset,
          'v-divider--vertical': props.vertical
        }, themeClasses.value],
        "style": dividerStyles.value,
        "aria-orientation": !attrs.role || attrs.role === 'separator' ? props.vertical ? 'vertical' : 'horizontal' : undefined,
        "role": "".concat(attrs.role || 'separator')
      }, null, 14, ["aria-orientation", "role"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VDivider/index.ts":
/*!******************************************!*\
  !*** ./src/components/VDivider/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VDivider": () => (/* reexport safe */ _VDivider__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VDivider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDivider */ "./src/components/VDivider/VDivider.tsx");


/***/ }),

/***/ "./src/components/VFooter/VFooter.tsx":
/*!********************************************!*\
  !*** ./src/components/VFooter/VFooter.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VFooter_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VFooter.sass */ "./src/components/VFooter/VFooter.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_border_radius__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border-radius */ "./src/composables/border-radius.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables







 // Utilities



/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VFooter',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({ ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.makeBorderRadiusProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.makePositionProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)({
      tag: 'footer'
    })
  }),

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)();
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-footer');
    const {
      borderRadiusClasses
    } = (0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.useBorderRadius)(props);
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.usePosition)(props, 'v-footer');
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-footer', themeClasses.value, borderClasses.value, borderRadiusClasses.value, elevationClasses.value, positionClasses.value],
      "style": [dimensionStyles.value, positionStyles.value]
    }, { ...slots,
      _: 1
    }, 8, ["class", "style"]);
  }

}));

/***/ }),

/***/ "./src/components/VFooter/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VFooter/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VFooter": () => (/* reexport safe */ _VFooter__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VFooter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VFooter */ "./src/components/VFooter/VFooter.tsx");


/***/ }),

/***/ "./src/components/VGrid/VCol.ts":
/*!**************************************!*\
  !*** ./src/components/VGrid/VCol.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VGrid.sass */ "./src/components/VGrid/VGrid.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
// Styles
 // Composables

 // Utilities


 // Types

const breakpoints = ['sm', 'md', 'lg', 'xl']; // no xs

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['offset' + (0,vue__WEBPACK_IMPORTED_MODULE_1__.capitalize)(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['order' + (0,vue__WEBPACK_IMPORTED_MODULE_1__.capitalize)(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};

function breakpointClass(type, prop, val) {
  let className = type;

  if (val == null || val === false) {
    return undefined;
  }

  if (prop) {
    const breakpoint = prop.replace(type, '');
    className += "-".concat(breakpoint);
  }

  if (type === 'col') {
    className = 'v-' + className;
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .v-col-md
    return className.toLowerCase();
  } // .order-md-6


  className += "-".concat(val);
  return className.toLowerCase();
}

/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VCol',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: str => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
    },
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)()
  }),

  setup(props, {
    slots
  }) {
    const classes = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
      const classList = []; // Loop through `col`, `offset`, `order` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      const hasColClasses = classList.some(className => className.startsWith('v-col-'));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        'v-col': !hasColClasses || !props.cols,
        ["v-col-".concat(props.cols)]: props.cols,
        ["offset-".concat(props.offset)]: props.offset,
        ["order-".concat(props.order)]: props.order,
        ["align-self-".concat(props.alignSelf)]: props.alignSelf
      });
      return classList;
    });
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_1__.h)(props.tag, {
      class: classes.value
    }, slots.default == null ? void 0 : slots.default());
  }

}));

/***/ }),

/***/ "./src/components/VGrid/VContainer.tsx":
/*!*********************************************!*\
  !*** ./src/components/VGrid/VContainer.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VGrid_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VGrid.sass */ "./src/components/VGrid/VGrid.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables

 // Utilities



/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VContainer',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    fluid: {
      type: Boolean,
      default: false
    },
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)()
  }),

  setup(props, {
    slots
  }) {
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-container', {
        'v-container--fluid': props.fluid
      }]
    }, { ...slots,
      _: 1
    }, 8, ["class"]);
  }

}));

/***/ }),

/***/ "./src/components/VGrid/VRow.ts":
/*!**************************************!*\
  !*** ./src/components/VGrid/VRow.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VGrid.sass */ "./src/components/VGrid/VGrid.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
// Styles
 // Composables

 // Utilities


 // Types

const breakpoints = ['sm', 'md', 'lg', 'xl']; // no xs

const ALIGNMENT = ['start', 'end', 'center'];

function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + (0,vue__WEBPACK_IMPORTED_MODULE_1__.capitalize)(val)] = def();
    return props;
  }, {});
}

const alignValidator = str => [...ALIGNMENT, 'baseline', 'stretch'].includes(str);

const alignProps = makeRowProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));

const justifyValidator = str => [...ALIGNMENT, 'space-between', 'space-around'].includes(str);

const justifyProps = makeRowProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));

const alignContentValidator = str => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str);

const alignContentProps = makeRowProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content'
};

function breakpointClass(type, prop, val) {
  let className = classMap[type];

  if (val == null) {
    return undefined;
  }

  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '');
    className += "-".concat(breakpoint);
  } // .align-items-sm-center


  className += "-".concat(val);
  return className.toLowerCase();
}

/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VRow',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps,
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)()
  }),

  setup(props, {
    slots
  }) {
    const classes = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
      const classList = []; // Loop through `align`, `justify`, `alignContent` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      classList.push({
        'v-row--no-gutters': props.noGutters,
        'v-row--dense': props.dense,
        ["align-".concat(props.align)]: props.align,
        ["justify-".concat(props.justify)]: props.justify,
        ["align-content-".concat(props.alignContent)]: props.alignContent
      });
      return classList;
    });
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_1__.h)(props.tag, {
      class: ['v-row', classes.value]
    }, slots.default == null ? void 0 : slots.default());
  }

}));

/***/ }),

/***/ "./src/components/VGrid/VSpacer.ts":
/*!*****************************************!*\
  !*** ./src/components/VGrid/VSpacer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");

/* harmony default export */ __webpack_exports__["default"] = ((0,_util_helpers__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('flex-grow-1', 'div', 'VSpacer'));

/***/ }),

/***/ "./src/components/VGrid/index.ts":
/*!***************************************!*\
  !*** ./src/components/VGrid/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VContainer": () => (/* reexport safe */ _VContainer__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VCol": () => (/* reexport safe */ _VCol__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "VRow": () => (/* reexport safe */ _VRow__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "VSpacer": () => (/* reexport safe */ _VSpacer__WEBPACK_IMPORTED_MODULE_3__.default)
/* harmony export */ });
/* harmony import */ var _VContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VContainer */ "./src/components/VGrid/VContainer.tsx");
/* harmony import */ var _VCol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VCol */ "./src/components/VGrid/VCol.ts");
/* harmony import */ var _VRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VRow */ "./src/components/VGrid/VRow.ts");
/* harmony import */ var _VSpacer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VSpacer */ "./src/components/VGrid/VSpacer.ts");






/***/ }),

/***/ "./src/components/VIcon/VIcon.tsx":
/*!****************************************!*\
  !*** ./src/components/VIcon/VIcon.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VIcon.sass */ "./src/components/VIcon/VIcon.sass");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/icons */ "./src/composables/icons.tsx");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables




 // Utilities



 // Types

/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VIcon',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    color: String,
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    icon: {
      type: [String, Object]
    },
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_3__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)({
      tag: 'i'
    })
  }),

  setup(props, {
    slots
  }) {
    let slotIcon;

    if (slots.default) {
      slotIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
        var _flattenFragments$fil;

        const slot = slots.default == null ? void 0 : slots.default();
        if (!slot) return;
        return (_flattenFragments$fil = (0,_util__WEBPACK_IMPORTED_MODULE_5__.flattenFragments)(slot).filter(node => node.children && typeof node.children === 'string')[0]) == null ? void 0 : _flattenFragments$fil.children;
      });
    }

    const {
      iconData
    } = (0,_composables_icons__WEBPACK_IMPORTED_MODULE_6__.useIcon)(slotIcon || props);
    const {
      sizeClasses
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_3__.useSize)(props, 'v-icon');
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_7__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ['v-icon', 'notranslate', sizeClasses.value, textColorClasses.value, {
          'v-icon--disabled': props.disabled,
          'v-icon--left': props.left,
          'v-icon--right': props.right
        }],
        "style": [!sizeClasses.value ? {
          fontSize: (0,_util__WEBPACK_IMPORTED_MODULE_5__.convertToUnit)(props.size),
          width: (0,_util__WEBPACK_IMPORTED_MODULE_5__.convertToUnit)(props.size),
          height: (0,_util__WEBPACK_IMPORTED_MODULE_5__.convertToUnit)(props.size)
        } : undefined, textColorStyles.value],
        "aria-hidden": "true"
      }, null, 8, ["tag", "icon", "class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VIcon/index.ts":
/*!***************************************!*\
  !*** ./src/components/VIcon/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VComponentIcon": () => (/* reexport safe */ _composables_icons__WEBPACK_IMPORTED_MODULE_1__.VComponentIcon),
/* harmony export */   "VSvgIcon": () => (/* reexport safe */ _composables_icons__WEBPACK_IMPORTED_MODULE_1__.VSvgIcon),
/* harmony export */   "VLigatureIcon": () => (/* reexport safe */ _composables_icons__WEBPACK_IMPORTED_MODULE_1__.VLigatureIcon),
/* harmony export */   "VClassIcon": () => (/* reexport safe */ _composables_icons__WEBPACK_IMPORTED_MODULE_1__.VClassIcon)
/* harmony export */ });
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _composables_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../composables/icons */ "./src/composables/icons.tsx");



/***/ }),

/***/ "./src/components/VImg/VImg.tsx":
/*!**************************************!*\
  !*** ./src/components/VImg/VImg.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VImg_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VImg.sass */ "./src/components/VImg/VImg.sass");
/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VResponsive */ "./src/components/VResponsive/VResponsive.tsx");
/* harmony import */ var _directives_intersect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../directives/intersect */ "./src/directives/intersect/index.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
/* harmony import */ var _util_useRender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/useRender */ "./src/util/useRender.ts");
/* harmony import */ var _util_useDirective__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/useDirective */ "./src/util/useDirective.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

 // Vue


// Components
 // Directives


// Utils



 // not intended for public use, this is passed in by vuetify-loader

const hasIntersect = typeof window !== 'undefined' && 'IntersectionObserver' in window;
/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VImg',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    aspectRatio: [String, Number],
    alt: String,
    cover: Boolean,
    eager: Boolean,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined
      })
    },
    position: {
      type: String,
      default: 'center center'
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: ''
    },
    srcset: String,
    transition: {
      type: [Boolean, String],
      default: 'fade-transition',
      validator: val => val !== true
    }
  }),
  emits: ['loadstart', 'load', 'error'],

  setup(props, {
    emit,
    slots
  }) {
    const currentSrc = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(''); // Set from srcset

    const image = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const state = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('idle');
    const naturalWidth = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const naturalHeight = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const normalisedSrc = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return props.src && typeof props.src === 'object' ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => props.src, () => {
      init(state.value !== 'idle');
    }); // TODO: getSrc when window width changes

    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount)(() => init());

    function init(isIntersecting) {
      // If the current browser supports the intersection
      // observer api, the image is not observable, and
      // the eager prop isn't being used, do not load
      if (hasIntersect && !isIntersecting && !props.eager) return;
      state.value = 'loading';
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        var _image$value;

        emit('loadstart', ((_image$value = image.value) == null ? void 0 : _image$value.currentSrc) || normalisedSrc.value.src);
        if (!aspectRatio.value) pollForSize(image.value);
        getSrc();
      });

      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
    }

    function onLoad() {
      var _image$value2;

      getSrc();
      state.value = 'loaded';
      emit('load', ((_image$value2 = image.value) == null ? void 0 : _image$value2.currentSrc) || normalisedSrc.value.src);
    }

    function onError() {
      var _image$value3;

      state.value = 'error';
      emit('error', ((_image$value3 = image.value) == null ? void 0 : _image$value3.currentSrc) || normalisedSrc.value.src);
    }

    function getSrc() {
      const img = image.value;
      if (img) currentSrc.value = img.currentSrc || img.src;
    }

    function pollForSize(img, timeout = 100) {
      const poll = () => {
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;

        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === 'loading' && timeout != null) {
          setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };

      poll();
    }

    const containClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
      'v-img__img--cover': props.cover,
      'v-img__img--contain': !props.cover
    }));

    const __image = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!normalisedSrc.value.src || state.value === 'idle') return;
      const img = (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
        class: ['v-img__img', containClasses.value],
        src: normalisedSrc.value.src,
        srcset: normalisedSrc.value.srcset,
        sizes: props.sizes,
        ref: image,
        onLoad,
        onError
      });
      const sources = slots.sources == null ? void 0 : slots.sources();
      return (0,_util__WEBPACK_IMPORTED_MODULE_3__.maybeTransition)(props, {
        appear: true
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(sources ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("picture", {
        "class": "v-img__picture"
      }, [sources, img]) : img, [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, state.value === 'loaded']]));
    });

    const __preloadImage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return (0,_util__WEBPACK_IMPORTED_MODULE_3__.maybeTransition)(props, {}, normalisedSrc.value.lazySrc && state.value !== 'loaded' ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
        "class": ['v-img__img', 'v-img__img--preload', containClasses.value],
        "src": normalisedSrc.value.lazySrc,
        "alt": ""
      }, null, 10, ["src"]) : undefined);
    });

    const __placeholder = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!slots.placeholder) return;
      const placeholder = state.value === 'loading' || state.value === 'error' && !slots.error ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-img__placeholder"
      }, [slots.placeholder()]) : undefined;
      return (0,_util__WEBPACK_IMPORTED_MODULE_3__.maybeTransition)(props, {
        appear: true
      }, placeholder);
    });

    const __error = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!slots.error) return;
      const error = state.value === 'error' ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-img__error"
      }, [slots.error()]) : undefined;
      return (0,_util__WEBPACK_IMPORTED_MODULE_3__.maybeTransition)(props, {
        appear: true
      }, error);
    });

    (0,_util_useRender__WEBPACK_IMPORTED_MODULE_4__.useRender)(() => (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VResponsive__WEBPACK_IMPORTED_MODULE_5__.default, {
      "class": "v-img",
      "aspectRatio": aspectRatio.value,
      "aria-label": props.alt,
      "role": props.alt ? 'img' : undefined
    }, {
      additional: () => [__image.value, __preloadImage.value, __placeholder.value, __error.value],
      default: slots.default,
      _: 1
    }, 8, ["aspectRatio", "aria-label", "role"]), [(0,_util_useDirective__WEBPACK_IMPORTED_MODULE_6__.useDirective)(_directives_intersect__WEBPACK_IMPORTED_MODULE_7__.default, {
      value: {
        handler: init,
        options: props.options
      },
      modifiers: {
        once: true
      }
    })]));
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }

}));

/***/ }),

/***/ "./src/components/VImg/index.ts":
/*!**************************************!*\
  !*** ./src/components/VImg/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VImg": () => (/* reexport safe */ _VImg__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VImg */ "./src/components/VImg/VImg.tsx");



/***/ }),

/***/ "./src/components/VLayout/VLayout.tsx":
/*!********************************************!*\
  !*** ./src/components/VLayout/VLayout.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VLayout_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VLayout.sass */ "./src/components/VLayout/VLayout.sass");
/* harmony import */ var _util_useRender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/useRender */ "./src/util/useRender.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");

// Styles
 // Utilities



 // Composables


/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VLayout',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)((0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.makeLayoutProps)()),

  setup(props, {
    slots
  }) {
    const {
      layoutClasses,
      getLayoutItem,
      items
    } = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.createLayout)(props);
    (0,_util_useRender__WEBPACK_IMPORTED_MODULE_4__.useRender)(() => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": layoutClasses.value,
      "style": {
        height: props.fullHeight ? '100vh' : undefined
      }
    }, [slots.default == null ? void 0 : slots.default()], 6));
    return {
      getLayoutItem,
      items
    };
  }

}));

/***/ }),

/***/ "./src/components/VLayout/VLayoutItem.tsx":
/*!************************************************!*\
  !*** ./src/components/VLayout/VLayoutItem.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Composables
 // Utilities


 // Types

/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VLayoutItem',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_1__.default)({
    position: {
      type: String,
      required: true
    },
    ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_2__.makeLayoutItemProps)()
  }),

  setup(props, {
    slots
  }) {
    const styles = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_2__.useLayoutItem)(props.name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'priority'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$position;

      return (_props$position = props.position) != null ? _props$position : 'left';
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'size'));
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "style": styles.value
    }, [slots.default == null ? void 0 : slots.default()], 4);
  }

}));

/***/ }),

/***/ "./src/components/VLayout/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VLayout/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VLayout": () => (/* reexport safe */ _VLayout__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VLayoutItem": () => (/* reexport safe */ _VLayoutItem__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _VLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VLayout */ "./src/components/VLayout/VLayout.tsx");
/* harmony import */ var _VLayoutItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VLayoutItem */ "./src/components/VLayout/VLayoutItem.tsx");



/***/ }),

/***/ "./src/components/VMain/VMain.tsx":
/*!****************************************!*\
  !*** ./src/components/VMain/VMain.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VMain_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VMain.sass */ "./src/components/VMain/VMain.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _composables_ssrBoot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/ssrBoot */ "./src/composables/ssrBoot.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables



 // Utilities



/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VMain',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)((0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)({
    tag: 'main'
  })),

  setup(props, {
    slots
  }) {
    const {
      mainStyles
    } = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_4__.useMain)();
    const {
      ssrBootStyles
    } = (0,_composables_ssrBoot__WEBPACK_IMPORTED_MODULE_5__.useSsrBoot)();
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": "v-main",
      "style": [mainStyles.value, ssrBootStyles.value]
    }, {
      default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-main__wrap"
      }, [slots.default == null ? void 0 : slots.default()])],
      _: 1
    }, 8, ["style"]);
  }

}));

/***/ }),

/***/ "./src/components/VMain/index.ts":
/*!***************************************!*\
  !*** ./src/components/VMain/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VMain": () => (/* reexport safe */ _VMain__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VMain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VMain */ "./src/components/VMain/VMain.tsx");


/* harmony default export */ __webpack_exports__["default"] = (_VMain__WEBPACK_IMPORTED_MODULE_0__.default);

/***/ }),

/***/ "./src/components/VNavigationDrawer/VNavigationDrawer.tsx":
/*!****************************************************************!*\
  !*** ./src/components/VNavigationDrawer/VNavigationDrawer.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VNavigationDrawer_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VNavigationDrawer.sass */ "./src/components/VNavigationDrawer/VNavigationDrawer.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_border_radius__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border-radius */ "./src/composables/border-radius.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables








 // Utilities




/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VNavigationDrawer',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({ ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.makeBorderRadiusProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.makeElevationProps)(),
    ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_6__.makeLayoutItemProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.makePositionProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)({
      tag: 'nav'
    }),
    expandOnHover: Boolean,
    mobile: Boolean,
    modelValue: Boolean,
    permanent: Boolean,
    rail: Boolean,
    railWidth: {
      type: [Number, String],
      default: 72
    },
    src: String,
    temporary: Boolean,
    width: {
      type: [Number, String],
      default: 256
    }
  }),

  setup(props, {
    slots
  }) {
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-navigation-drawer');
    const {
      borderRadiusClasses
    } = (0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.useBorderRadius)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.usePosition)(props, 'v-navigation-drawer');
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)();
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_10__.useProxiedModel)(props, 'modelValue');
    const isHovering = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const size = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => Number(props.rail ? props.railWidth : props.width));
    const width = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return props.rail && props.expandOnHover && isHovering.value ? props.width : size.value;
    });
    const layoutStyles = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_6__.useLayoutItem)(props.name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'priority'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.right ? 'right' : 'left'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return props.permanent || isActive.value && !props.temporary ? size.value : 0;
    }));
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount)(() => {
      if (isActive.value == null) isActive.value = !props.mobile;
    });
    return () => {
      const hasImg = slots.img || props.src;
      const translate = (props.permanent || isActive.value ? 0 : 100) * (!props.right && !props.bottom ? -1 : 1);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "onMouseenter": () => isHovering.value = true,
        "onMouseleave": () => isHovering.value = false,
        "class": ['v-navigation-drawer', {
          'v-navigation-drawer--bottom': props.bottom,
          'v-navigation-drawer--end': props.right,
          'v-navigation-drawer--expand-on-hover': props.expandOnHover,
          'v-navigation-drawer--is-hovering': isHovering.value,
          'v-navigation-drawer--is-mobile': props.mobile,
          'v-navigation-drawer--rail': props.rail,
          'v-navigation-drawer--start': props.left || !props.right,
          'v-navigation-drawer--temporary': props.temporary || props.mobile
        }, borderClasses.value, borderRadiusClasses.value, elevationClasses.value, positionClasses.value, themeClasses.value],
        "style": [layoutStyles.value, positionStyles.value, {
          transform: "translate".concat(props.bottom ? 'Y' : 'X', "(").concat((0,_util_helpers__WEBPACK_IMPORTED_MODULE_11__.convertToUnit)(translate, '%'), ")"),
          width: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_11__.convertToUnit)(width.value)
        }]
      }, {
        default: () => [hasImg && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__img"
        }, [slots.img ? slots.img == null ? void 0 : slots.img({
          src: props.src
        }) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
          "src": props.src,
          "alt": ""
        }, null, 8, ["src"])]), slots.prepend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__prepend"
        }, [slots.prepend == null ? void 0 : slots.prepend()]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__content"
        }, [slots.default == null ? void 0 : slots.default()]), slots.append && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__append"
        }, [slots.append == null ? void 0 : slots.append()])],
        _: 1
      }, 8, ["onMouseenter", "onMouseleave", "class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VNavigationDrawer/index.ts":
/*!***************************************************!*\
  !*** ./src/components/VNavigationDrawer/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VNavigationDrawer": () => (/* reexport safe */ _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VNavigationDrawer */ "./src/components/VNavigationDrawer/VNavigationDrawer.tsx");


/***/ }),

/***/ "./src/components/VResponsive/VResponsive.tsx":
/*!****************************************************!*\
  !*** ./src/components/VResponsive/VResponsive.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useAspectStyles": () => (/* binding */ useAspectStyles)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VResponsive_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VResponsive.sass */ "./src/components/VResponsive/VResponsive.sass");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");





function useAspectStyles(props) {
  return {
    aspectStyles: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + '%'
      } : undefined;
    })
  };
}
/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VResponsive',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    aspectRatio: [String, Number],
    contentClass: String,
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.makeDimensionProps)()
  }),

  setup(props, {
    slots
  }) {
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.useDimension)(props);
    const {
      aspectStyles
    } = useAspectStyles(props);
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": "v-responsive",
      "style": dimensionStyles.value
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": "v-responsive__sizer",
      "style": aspectStyles.value
    }, null, 4), slots.additional == null ? void 0 : slots.additional(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": ['v-responsive__content', props.contentClass]
    }, [slots.default == null ? void 0 : slots.default()], 2)], 4);
  }

}));

/***/ }),

/***/ "./src/components/VResponsive/index.ts":
/*!*********************************************!*\
  !*** ./src/components/VResponsive/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VResponsive": () => (/* reexport safe */ _VResponsive__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VResponsive */ "./src/components/VResponsive/VResponsive.tsx");



/***/ }),

/***/ "./src/components/VSheet/VSheet.tsx":
/*!******************************************!*\
  !*** ./src/components/VSheet/VSheet.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSheet_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VSheet.sass */ "./src/components/VSheet/VSheet.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_border_radius__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border-radius */ "./src/composables/border-radius.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables








 // Utilities



/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VSheet',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({ ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.makeBorderRadiusProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.makePositionProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)(),
    color: String
  }),

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)();
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_10__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-sheet');
    const {
      borderRadiusClasses
    } = (0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.useBorderRadius)(props);
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.usePosition)(props, 'v-sheet');
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, borderRadiusClasses.value, elevationClasses.value, positionClasses.value],
      "style": [backgroundColorStyles.value, dimensionStyles.value, positionStyles.value]
    }, { ...slots,
      _: 1
    }, 8, ["class", "style"]);
  }

}));

/***/ }),

/***/ "./src/components/VSheet/index.ts":
/*!****************************************!*\
  !*** ./src/components/VSheet/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VSheet": () => (/* reexport safe */ _VSheet__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VSheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSheet */ "./src/components/VSheet/VSheet.tsx");


/* harmony default export */ __webpack_exports__["default"] = (_VSheet__WEBPACK_IMPORTED_MODULE_0__.default);

/***/ }),

/***/ "./src/components/VSystemBar/VSystemBar.tsx":
/*!**************************************************!*\
  !*** ./src/components/VSystemBar/VSystemBar.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSystemBar_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VSystemBar.sass */ "./src/components/VSystemBar/VSystemBar.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_border_radius__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border-radius */ "./src/composables/border-radius.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Composables







 // Utilities



/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VSystemBar',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    lightsOut: Boolean,
    window: Boolean,
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.makeBorderRadiusProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.makePositionProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)()
  }),

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)();
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-system-bar');
    const {
      borderRadiusClasses
    } = (0,_composables_border_radius__WEBPACK_IMPORTED_MODULE_4__.useBorderRadius)(props);
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.usePosition)(props, 'v-system-bar');
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": [{
        'v-system-bar': true,
        'v-system-bar--lights-out': props.lightsOut,
        'v-system-bar--window': props.window
      }, themeClasses.value, borderClasses.value, borderRadiusClasses.value, elevationClasses.value, positionClasses.value],
      "style": [dimensionStyles.value, positionStyles.value]
    }, { ...slots,
      _: 1
    }, 8, ["class", "style"]);
  }

}));

/***/ }),

/***/ "./src/components/VSystemBar/index.ts":
/*!********************************************!*\
  !*** ./src/components/VSystemBar/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VSystemBar": () => (/* reexport safe */ _VSystemBar__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VSystemBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSystemBar */ "./src/components/VSystemBar/VSystemBar.tsx");


/***/ }),

/***/ "./src/components/VThemeProvider/VThemeProvider.tsx":
/*!**********************************************************!*\
  !*** ./src/components/VThemeProvider/VThemeProvider.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VThemeProvider.sass */ "./src/components/VThemeProvider/VThemeProvider.sass");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");

// Styles
 // Utilities




/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VThemeProvider',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)({
    theme: {
      type: String
    },
    // TODO: Better name
    newContext: {
      type: Boolean
    }
  }),

  setup(props, context) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.provideTheme)(props, context);
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": ['v-theme-provider', themeClasses.value]
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", null, [context.slots.default == null ? void 0 : context.slots.default()])], 2);
    };
  }

}));

/***/ }),

/***/ "./src/components/VThemeProvider/index.ts":
/*!************************************************!*\
  !*** ./src/components/VThemeProvider/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VThemeProvider": () => (/* reexport safe */ _VThemeProvider__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VThemeProvider */ "./src/components/VThemeProvider/VThemeProvider.tsx");


/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VApp": () => (/* reexport safe */ _VApp__WEBPACK_IMPORTED_MODULE_0__.VApp),
/* harmony export */   "VAvatar": () => (/* reexport safe */ _VAvatar__WEBPACK_IMPORTED_MODULE_1__.VAvatar),
/* harmony export */   "VBanner": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_2__.VBanner),
/* harmony export */   "VBtn": () => (/* reexport safe */ _VBtn__WEBPACK_IMPORTED_MODULE_3__.VBtn),
/* harmony export */   "VDivider": () => (/* reexport safe */ _VDivider__WEBPACK_IMPORTED_MODULE_4__.VDivider),
/* harmony export */   "VFooter": () => (/* reexport safe */ _VFooter__WEBPACK_IMPORTED_MODULE_5__.VFooter),
/* harmony export */   "VCol": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_6__.VCol),
/* harmony export */   "VContainer": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_6__.VContainer),
/* harmony export */   "VRow": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_6__.VRow),
/* harmony export */   "VSpacer": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_6__.VSpacer),
/* harmony export */   "VClassIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_7__.VClassIcon),
/* harmony export */   "VComponentIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_7__.VComponentIcon),
/* harmony export */   "VIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_7__.VIcon),
/* harmony export */   "VLigatureIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_7__.VLigatureIcon),
/* harmony export */   "VSvgIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_7__.VSvgIcon),
/* harmony export */   "VImg": () => (/* reexport safe */ _VImg__WEBPACK_IMPORTED_MODULE_8__.VImg),
/* harmony export */   "VLayout": () => (/* reexport safe */ _VLayout__WEBPACK_IMPORTED_MODULE_9__.VLayout),
/* harmony export */   "VLayoutItem": () => (/* reexport safe */ _VLayout__WEBPACK_IMPORTED_MODULE_9__.VLayoutItem),
/* harmony export */   "VMain": () => (/* reexport safe */ _VMain__WEBPACK_IMPORTED_MODULE_10__.VMain),
/* harmony export */   "VNavigationDrawer": () => (/* reexport safe */ _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_11__.VNavigationDrawer),
/* harmony export */   "VSheet": () => (/* reexport safe */ _VSheet__WEBPACK_IMPORTED_MODULE_12__.VSheet),
/* harmony export */   "VResponsive": () => (/* reexport safe */ _VResponsive__WEBPACK_IMPORTED_MODULE_13__.VResponsive),
/* harmony export */   "VSystemBar": () => (/* reexport safe */ _VSystemBar__WEBPACK_IMPORTED_MODULE_14__.VSystemBar),
/* harmony export */   "VThemeProvider": () => (/* reexport safe */ _VThemeProvider__WEBPACK_IMPORTED_MODULE_15__.VThemeProvider),
/* harmony export */   "VCarouselReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VCarouselReverseTransition),
/* harmony export */   "VCarouselTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VCarouselTransition),
/* harmony export */   "VDialogBottomTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VDialogBottomTransition),
/* harmony export */   "VDialogTopTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VDialogTopTransition),
/* harmony export */   "VDialogTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VDialogTransition),
/* harmony export */   "VExpandTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VExpandTransition),
/* harmony export */   "VExpandXTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VExpandXTransition),
/* harmony export */   "VFabTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VFabTransition),
/* harmony export */   "VFadeTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VFadeTransition),
/* harmony export */   "VMenuTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VMenuTransition),
/* harmony export */   "VScaleTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VScaleTransition),
/* harmony export */   "VScrollXReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VScrollXReverseTransition),
/* harmony export */   "VScrollXTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VScrollXTransition),
/* harmony export */   "VScrollYReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VScrollYReverseTransition),
/* harmony export */   "VScrollYTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VScrollYTransition),
/* harmony export */   "VSlideXReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VSlideXReverseTransition),
/* harmony export */   "VSlideXTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VSlideXTransition),
/* harmony export */   "VSlideYReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VSlideYReverseTransition),
/* harmony export */   "VSlideYTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VSlideYTransition),
/* harmony export */   "VTabReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VTabReverseTransition),
/* harmony export */   "VTabTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_16__.VTabTransition)
/* harmony export */ });
/* harmony import */ var _VApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VApp */ "./src/components/VApp/index.ts");
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAvatar */ "./src/components/VAvatar/index.ts");
/* harmony import */ var _VBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VBanner */ "./src/components/VBanner/index.ts");
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _VDivider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VDivider */ "./src/components/VDivider/index.ts");
/* harmony import */ var _VFooter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VFooter */ "./src/components/VFooter/index.ts");
/* harmony import */ var _VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VGrid */ "./src/components/VGrid/index.ts");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VImg */ "./src/components/VImg/index.ts");
/* harmony import */ var _VLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VLayout */ "./src/components/VLayout/index.ts");
/* harmony import */ var _VMain__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./VMain */ "./src/components/VMain/index.ts");
/* harmony import */ var _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./VNavigationDrawer */ "./src/components/VNavigationDrawer/index.ts");
/* harmony import */ var _VSheet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./VSheet */ "./src/components/VSheet/index.ts");
/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VResponsive */ "./src/components/VResponsive/index.ts");
/* harmony import */ var _VSystemBar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./VSystemBar */ "./src/components/VSystemBar/index.ts");
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./VThemeProvider */ "./src/components/VThemeProvider/index.ts");
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./transitions */ "./src/components/transitions/index.ts");
 // export * from './VAppBar'
// export * from './VAlert'
// export * from './VAutocomplete'

 // export * from './VBadge'

 // export * from './VBottomNavigation'
// export * from './VBottomSheet'
// export * from './VBreadcrumbs'
// export * from './VBtn'

 // export * from './VBtnToggle'
// export * from './VCalendar'
// export * from './VCard'
// export * from './VCarousel'
// export * from './VCheckbox'
// export * from './VChip'
// export * from './VChipGroup'
// export * from './VColorPicker'
// export * from './VContent'
// export * from './VCombobox'
// export * from './VCounter'
// export * from './VData'
// export * from './VDataIterator'
// export * from './VDataTable'
// export * from './VDatePicker'
// export * from './VDialog'

 // export * from './VExpansionPanel'
// export * from './VFileInput'

 // export * from './VForm'

 // export * from './VHover'


 // export * from './VInput'
// export * from './VItemGroup'
// export * from './VLabel'

 // export * from './VLazy'
// export * from './VList'

 // export * from './VMenu'
// export * from './VMessages'

 // export * from './VOverflowBtn'
// export * from './VOverlay'
// export * from './VPagination'

 // export * from './VParallax'
// export * from './VPicker'
// export * from './VProgressCircular'
// export * from './VProgressLinear'
// export * from './VRadioGroup'
// export * from './VRangeSlider'
// export * from './VRating'

 // export * from './VSelect'
// export * from './VSkeletonLoader'
// export * from './VSlider'
// export * from './VSlideGroup'
// export * from './VSnackbar'
// export * from './VSparkline'
// export * from './VSpeedDial'
// export * from './VStepper'
// export * from './VSubheader'
// export * from './VSwitch'

 // export * from './VTabs'
// export * from './VTextarea'
// export * from './VTextField'

 // export * from './VTimeline'
// export * from './VTimePicker'
// export * from './VToolbar'
// export * from './VTooltip'
// export * from './VTreeview'
// export * from './VVirtualScroll'
// export * from './VWindow'



/***/ }),

/***/ "./src/components/transitions/createTransition.ts":
/*!********************************************************!*\
  !*** ./src/components/transitions/createTransition.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCssTransition": () => (/* binding */ createCssTransition),
/* harmony export */   "createJavascriptTransition": () => (/* binding */ createJavascriptTransition)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/makeProps */ "./src/util/makeProps.ts");
// Utilities

 // Types

function createCssTransition(name, origin = 'top center 0', mode) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name,
    props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_1__.default)({
      group: Boolean,
      hideOnLeave: Boolean,
      leaveAbsolute: Boolean,
      mode: {
        type: String,
        default: mode
      },
      origin: {
        type: String,
        default: origin
      }
    }),

    setup(props, {
      slots
    }) {
      return () => {
        const tag = props.group ? vue__WEBPACK_IMPORTED_MODULE_0__.TransitionGroup : vue__WEBPACK_IMPORTED_MODULE_0__.Transition;
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(tag, {
          name,
          mode: props.mode,

          onBeforeEnter(el) {
            el.style.transformOrigin = props.origin;
          },

          onLeave(el) {
            if (props.leaveAbsolute) el.style.position = 'absolute';
            if (props.hideOnLeave) el.style.display = 'none';
          }

        }, slots.default);
      };
    }

  });
}
function createJavascriptTransition(name, functions, mode = 'in-out') {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name,
    props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_1__.default)({
      mode: {
        type: String,
        default: mode
      }
    }),

    setup(props, {
      slots
    }) {
      return () => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
          name,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...functions
        }, slots.default);
      };
    }

  });
}

/***/ }),

/***/ "./src/components/transitions/expand-transition.ts":
/*!*********************************************************!*\
  !*** ./src/components/transitions/expand-transition.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Utilities

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(expandedParentClass = '', x = false) {
  const sizeProperty = x ? 'width' : 'height';
  const offsetProperty = (0,vue__WEBPACK_IMPORTED_MODULE_0__.camelize)("offset-".concat(sizeProperty));
  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },

    onEnter(el) {
      const initialStyle = el._initialStyle;
      el.style.setProperty('transition', 'none', 'important'); // Hide overflow to account for collapsed margins in the calculated height

      el.style.overflow = 'hidden';
      const offset = "".concat(el[offsetProperty], "px");
      el.style[sizeProperty] = '0';
      void el.offsetHeight; // force reflow

      el.style.transition = initialStyle.transition;

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }

      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },

    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,

    onLeave(el) {
      el._initialStyle = {
        transition: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = 'hidden';
      el.style[sizeProperty] = "".concat(el[offsetProperty], "px");
      void el.offsetHeight; // force reflow

      requestAnimationFrame(() => el.style[sizeProperty] = '0');
    },

    onAfterLeave,
    onLeaveCancelled: onAfterLeave
  };

  function onAfterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }

    resetStyles(el);
  }

  function resetStyles(el) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null) el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
}

/***/ }),

/***/ "./src/components/transitions/index.ts":
/*!*********************************************!*\
  !*** ./src/components/transitions/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VCarouselTransition": () => (/* binding */ VCarouselTransition),
/* harmony export */   "VCarouselReverseTransition": () => (/* binding */ VCarouselReverseTransition),
/* harmony export */   "VTabTransition": () => (/* binding */ VTabTransition),
/* harmony export */   "VTabReverseTransition": () => (/* binding */ VTabReverseTransition),
/* harmony export */   "VMenuTransition": () => (/* binding */ VMenuTransition),
/* harmony export */   "VFabTransition": () => (/* binding */ VFabTransition),
/* harmony export */   "VDialogTransition": () => (/* binding */ VDialogTransition),
/* harmony export */   "VDialogBottomTransition": () => (/* binding */ VDialogBottomTransition),
/* harmony export */   "VDialogTopTransition": () => (/* binding */ VDialogTopTransition),
/* harmony export */   "VFadeTransition": () => (/* binding */ VFadeTransition),
/* harmony export */   "VScaleTransition": () => (/* binding */ VScaleTransition),
/* harmony export */   "VScrollXTransition": () => (/* binding */ VScrollXTransition),
/* harmony export */   "VScrollXReverseTransition": () => (/* binding */ VScrollXReverseTransition),
/* harmony export */   "VScrollYTransition": () => (/* binding */ VScrollYTransition),
/* harmony export */   "VScrollYReverseTransition": () => (/* binding */ VScrollYReverseTransition),
/* harmony export */   "VSlideXTransition": () => (/* binding */ VSlideXTransition),
/* harmony export */   "VSlideXReverseTransition": () => (/* binding */ VSlideXReverseTransition),
/* harmony export */   "VSlideYTransition": () => (/* binding */ VSlideYTransition),
/* harmony export */   "VSlideYReverseTransition": () => (/* binding */ VSlideYReverseTransition),
/* harmony export */   "VExpandTransition": () => (/* binding */ VExpandTransition),
/* harmony export */   "VExpandXTransition": () => (/* binding */ VExpandXTransition)
/* harmony export */ });
/* harmony import */ var _createTransition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTransition */ "./src/components/transitions/createTransition.ts");
/* harmony import */ var _expand_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expand-transition */ "./src/components/transitions/expand-transition.ts");

 // Component specific transitions

const VCarouselTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('carousel-transition');
const VCarouselReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('carousel-reverse-transition');
const VTabTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('tab-transition');
const VTabReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('tab-reverse-transition');
const VMenuTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('menu-transition');
const VFabTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('fab-transition', 'center center', 'out-in'); // Generic transitions

const VDialogTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('dialog-transition');
const VDialogBottomTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('dialog-bottom-transition');
const VDialogTopTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('dialog-top-transition');
const VFadeTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('fade-transition');
const VScaleTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('scale-transition');
const VScrollXTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('scroll-x-transition');
const VScrollXReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('scroll-x-reverse-transition');
const VScrollYTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('scroll-y-transition');
const VScrollYReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('scroll-y-reverse-transition');
const VSlideXTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('slide-x-transition');
const VSlideXReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('slide-x-reverse-transition');
const VSlideYTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('slide-y-transition');
const VSlideYReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('slide-y-reverse-transition'); // Javascript transitions

const VExpandTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createJavascriptTransition)('expand-transition', (0,_expand_transition__WEBPACK_IMPORTED_MODULE_1__.default)());
const VExpandXTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createJavascriptTransition)('expand-x-transition', (0,_expand_transition__WEBPACK_IMPORTED_MODULE_1__.default)('', true));

/***/ }),

/***/ "./src/composables/border-radius.ts":
/*!******************************************!*\
  !*** ./src/composables/border-radius.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeBorderRadiusProps": () => (/* binding */ makeBorderRadiusProps),
/* harmony export */   "useBorderRadius": () => (/* binding */ useBorderRadius)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Utilities

 // Types

const makeBorderRadiusProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  rounded: [Boolean, Number, String]
}, 'border-radius'); // Composables

function useBorderRadius(props) {
  const borderRadiusClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];

    if (props.rounded === true || props.rounded === '') {
      classes.push('rounded');
    } else if (typeof props.rounded === 'string' || props.rounded === 0) {
      for (const value of String(props.rounded).split(' ')) {
        classes.push("rounded-".concat(value));
      }
    }

    return classes;
  });
  return {
    borderRadiusClasses
  };
}

/***/ }),

/***/ "./src/composables/border.ts":
/*!***********************************!*\
  !*** ./src/composables/border.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeBorderProps": () => (/* binding */ makeBorderProps),
/* harmony export */   "useBorder": () => (/* binding */ useBorder)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Utilities

 // Types

// Composables
const makeBorderProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  outlined: Boolean,
  border: [Boolean, Number, String]
}, 'border');
function useBorder(props, name) {
  const borderClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];

    if (props.outlined || props.border === true || props.border === '') {
      classes.push("".concat(name, "--border"));
    } else if (typeof props.border === 'string' || props.border === 0) {
      for (const value of String(props.border).split(' ')) {
        classes.push("border-".concat(value));
      }
    }

    return classes;
  });
  return {
    borderClasses
  };
}

/***/ }),

/***/ "./src/composables/color.ts":
/*!**********************************!*\
  !*** ./src/composables/color.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useColor": () => (/* binding */ useColor),
/* harmony export */   "useTextColor": () => (/* binding */ useTextColor),
/* harmony export */   "useBackgroundColor": () => (/* binding */ useBackgroundColor)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_colorUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/colorUtils */ "./src/util/colorUtils.ts");
// Utilities

 // Types

function useColor(colors) {
  const backgroundIsCssColor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,_util_colorUtils__WEBPACK_IMPORTED_MODULE_1__.isCssColor)(colors.value.background));
  const textIsCssColor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,_util_colorUtils__WEBPACK_IMPORTED_MODULE_1__.isCssColor)(colors.value.text));
  const colorClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];

    if (colors.value.background && !backgroundIsCssColor.value) {
      classes.push("bg-".concat(colors.value.background));
    }

    if (colors.value.text && !textIsCssColor.value) {
      classes.push("text-".concat(colors.value.text));
    }

    return classes;
  });
  const colorStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const styles = {};

    if (colors.value.background && backgroundIsCssColor.value) {
      styles.backgroundColor = colors.value.background;
    }

    if (colors.value.text && textIsCssColor.value) {
      styles.color = colors.value.text;
      styles.caretColor = colors.value.text;
    }

    return styles;
  });
  return {
    colorClasses,
    colorStyles
  };
}
function useTextColor(props, name) {
  const colors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
    text: (0,vue__WEBPACK_IMPORTED_MODULE_0__.isRef)(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(colors);
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(props, name) {
  const colors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
    background: (0,vue__WEBPACK_IMPORTED_MODULE_0__.isRef)(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(colors);
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}

/***/ }),

/***/ "./src/composables/density.ts":
/*!************************************!*\
  !*** ./src/composables/density.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeDensityProps": () => (/* binding */ makeDensityProps),
/* harmony export */   "useDensity": () => (/* binding */ useDensity)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Utilities

 // Types

const allowedDensities = ['default', 'comfortable', 'compact'];
// Composables
const makeDensityProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  density: {
    type: String,
    default: 'default',
    validator: v => allowedDensities.includes(v)
  }
}, 'density');
function useDensity(props, name) {
  const densityClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return "".concat(name, "--density-").concat(props.density);
  });
  return {
    densityClasses
  };
}

/***/ }),

/***/ "./src/composables/dimensions.ts":
/*!***************************************!*\
  !*** ./src/composables/dimensions.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeDimensionProps": () => (/* binding */ makeDimensionProps),
/* harmony export */   "useDimension": () => (/* binding */ useDimension)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Utilities


 // Types

// Composables
const makeDimensionProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, 'dimension');
function useDimension(props) {
  const dimensionStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
    height: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.height),
    maxHeight: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.maxHeight),
    maxWidth: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.maxWidth),
    minHeight: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.minHeight),
    minWidth: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.minWidth),
    width: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.width)
  }));
  return {
    dimensionStyles
  };
}

/***/ }),

/***/ "./src/composables/elevation.ts":
/*!**************************************!*\
  !*** ./src/composables/elevation.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeElevationProps": () => (/* binding */ makeElevationProps),
/* harmony export */   "useElevation": () => (/* binding */ useElevation)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");

 // Types

const makeElevationProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  elevation: {
    type: [Number, String],

    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }

  }
}, 'elevation'); // Effect

function useElevation(props) {
  const elevationClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];
    if (props.elevation == null) return classes;
    classes.push("elevation-".concat(props.elevation));
    return classes;
  });
  return {
    elevationClasses
  };
}

/***/ }),

/***/ "./src/composables/icons.tsx":
/*!***********************************!*\
  !*** ./src/composables/icons.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VuetifyIconSymbol": () => (/* binding */ VuetifyIconSymbol),
/* harmony export */   "makeIconProps": () => (/* binding */ makeIconProps),
/* harmony export */   "VComponentIcon": () => (/* binding */ VComponentIcon),
/* harmony export */   "VSvgIcon": () => (/* binding */ VSvgIcon),
/* harmony export */   "VLigatureIcon": () => (/* binding */ VLigatureIcon),
/* harmony export */   "VClassIcon": () => (/* binding */ VClassIcon),
/* harmony export */   "defaultSets": () => (/* binding */ defaultSets),
/* harmony export */   "useIcon": () => (/* binding */ useIcon)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
/* harmony import */ var _util_makeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/makeProps */ "./src/util/makeProps.ts");

// Utilities


 // Types

const VuetifyIconSymbol = Symbol.for('vuetify:icons');
const makeIconProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  icon: {
    type: [String, Object],
    required: true
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true
  }
}, 'icon');
const VComponentIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VComponentIcon',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)(makeIconProps()),

  setup(props) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, null, {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.icon, null, null)],
        _: 1
      });
    };
  }

});
const VSvgIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)(makeIconProps()),

  setup(props, {
    attrs
  }) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)(attrs, {
        "style": null
      }), {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("svg", {
          "class": 'v-icon__svg',
          "xmlns": 'http://www.w3.org/2000/svg',
          "viewBox": '0 0 24 24',
          "role": 'img',
          "aria-hidden": "true"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("path", {
          "d": props.icon
        }, null, 8, ["d"])])],
        _: 1
      }, 16);
    };
  }

});
const VLigatureIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VLigatureIcon',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)(makeIconProps()),

  setup(props) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }

});
const VClassIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VClassIcon',
  props: (0,_util_makeProps__WEBPACK_IMPORTED_MODULE_2__.default)(makeIconProps()),

  setup(props) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": props.icon
      }, null, 8, ["class"]);
    };
  }

});
const defaultSets = {
  svg: {
    component: VSvgIcon
  },
  class: {
    component: VClassIcon
  }
}; // Composables

const useIcon = props => {
  const icons = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyIconSymbol);
  if (!icons) throw new Error('Missing Vuetify Icons provide!');
  const iconData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const iconAlias = (0,vue__WEBPACK_IMPORTED_MODULE_0__.isRef)(props) ? props.value : props.icon;
    if (!iconAlias) throw new Error('Icon value is undefined or null');
    let icon = iconAlias;

    if (typeof iconAlias === 'string' && iconAlias.includes('$')) {
      var _icons$aliases;

      icon = (_icons$aliases = icons.aliases) == null ? void 0 : _icons$aliases[iconAlias.slice(iconAlias.indexOf('$') + 1)];
    }

    if (!icon) throw new Error("Could not find aliased icon \"".concat(iconAlias, "\""));

    if (typeof icon !== 'string') {
      return {
        component: VComponentIcon,
        icon
      };
    }

    const hasSet = icon.includes(':');
    const setName = hasSet ? icon.split(':')[0] : icons.defaultSet;
    const iconName = hasSet ? icon.split(':')[1] : icon;
    const set = icons.sets[setName != null ? setName : icons.defaultSet];

    if (!set) {
      throw new Error("Could not find icon set \"".concat(setName, "\""));
    }

    return {
      component: set.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};

/***/ }),

/***/ "./src/composables/layout.ts":
/*!***********************************!*\
  !*** ./src/composables/layout.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VuetifyLayoutKey": () => (/* binding */ VuetifyLayoutKey),
/* harmony export */   "makeLayoutProps": () => (/* binding */ makeLayoutProps),
/* harmony export */   "makeLayoutItemProps": () => (/* binding */ makeLayoutItemProps),
/* harmony export */   "useMain": () => (/* binding */ useMain),
/* harmony export */   "useLayoutItem": () => (/* binding */ useLayoutItem),
/* harmony export */   "createLayout": () => (/* binding */ createLayout)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Utilities


 // Types

const VuetifyLayoutKey = Symbol.for('vuetify:layout');
const makeLayoutProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, 'layout');
const makeLayoutItemProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  name: {
    type: String
  },
  priority: {
    type: Number,
    default: 0
  },
  size: {
    type: [Number, String],
    default: 300
  }
}, 'layout-item');
function useMain() {
  const layout = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyLayoutKey);
  if (!layout) throw new Error('Could not find injected Vuetify layout');
  return layout;
}
function useLayoutItem(name, priority, position, amount) {
  const layout = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyLayoutKey);
  if (!layout) throw new Error('Could not find injected Vuetify layout');
  const id = name != null ? name : "layout-item-".concat((0,_util__WEBPACK_IMPORTED_MODULE_2__.getUid)());
  const styles = layout.register(id, priority, position, amount);
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => layout.unregister(id));
  return styles;
}

const generateLayers = (layout, registered, positions, amounts) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: '',
    layer: { ...previousLayer
    }
  }];
  const ids = !layout.length ? registered : layout.map(l => l.split(':')[0]).filter(l => registered.includes(l));

  for (const id of ids) {
    const position = positions.get(id);
    const amount = amounts.get(id);
    if (!position || !amount) continue;
    const layer = { ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + parseInt(amount.value, 10)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }

  return layers;
}; // TODO: Remove undefined from layout and overlaps when vue typing for required: true prop is fixed


function createLayout(props) {
  const registered = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
  const positions = new Map();
  const amounts = new Map();
  const priorities = new Map();
  const computedOverlaps = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    var _props$overlaps;

    const map = new Map();
    const overlaps = (_props$overlaps = props.overlaps) != null ? _props$overlaps : [];

    for (const overlap of overlaps.filter(item => item.includes(':'))) {
      const [top, bottom] = overlap.split(':');
      if (!registered.value.includes(top) || !registered.value.includes(bottom)) continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = amounts.get(top);
      const bottomAmount = amounts.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount) continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }

    return map;
  });
  const layers = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const entries = [...priorities.entries()];
    const sortedEntries = entries.sort(([, a], [, b]) => a.value - b.value).map(([id]) => id);
    return generateLayers(sortedEntries, registered.value, positions, amounts);
  });
  const mainStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const layer = layers.value[layers.value.length - 1].layer;
    return {
      position: 'absolute',
      left: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.left),
      right: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.right),
      top: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.top),
      bottom: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.bottom)
    };
  });
  const items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return layers.value.slice(1).map(({
      id
    }, index) => {
      const {
        layer
      } = layers.value[index];
      const size = amounts.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value)
      };
    });
  });

  const getLayoutItem = id => {
    return items.value.find(item => item.id === id);
  };

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(VuetifyLayoutKey, {
    register: (id, priority, position, amount) => {
      priorities.set(id, priority);
      positions.set(id, position);
      amounts.set(id, amount);
      registered.value.push(id);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
        var _amount$value, _amount$value2;

        const index = items.value.findIndex(i => i.id === id);
        if (index < 0) throw new Error("Layout item \"".concat(id, "\" is missing from layout prop"));
        const item = items.value[index];
        if (!item) throw new Error("Could not find layout item \"".concat(id));
        const overlap = computedOverlaps.value.get(id);

        if (overlap) {
          item[overlap.position] += overlap.amount;
        }

        const isHorizontal = position.value === 'left' || position.value === 'right';
        const isOpposite = position.value === 'right';
        const amount = amounts.get(id);
        return {
          [position.value]: 0,
          height: isHorizontal ? "calc(100% - ".concat(item.top, "px - ").concat(item.bottom, "px)") : "".concat((_amount$value = amount == null ? void 0 : amount.value) != null ? _amount$value : 0, "px"),
          marginLeft: isOpposite ? undefined : "".concat(item.left, "px"),
          marginRight: isOpposite ? "".concat(item.right, "px") : undefined,
          marginTop: position.value !== 'bottom' ? "".concat(item.top, "px") : undefined,
          marginBottom: position.value !== 'top' ? "".concat(item.bottom, "px") : undefined,
          position: 'absolute',
          width: !isHorizontal ? "calc(100% - ".concat(item.left, "px - ").concat(item.right, "px)") : "".concat((_amount$value2 = amount == null ? void 0 : amount.value) != null ? _amount$value2 : 0, "px"),
          zIndex: layers.value.length - index
        };
      });
    },
    unregister: id => {
      positions.delete(id);
      amounts.delete(id);
      priorities.delete(id);
      registered.value = registered.value.filter(v => v !== id);
    },
    mainStyles,
    getLayoutItem,
    items
  });
  return {
    layoutClasses: (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('v-layout'),
    getLayoutItem,
    items
  };
}

/***/ }),

/***/ "./src/composables/position.ts":
/*!*************************************!*\
  !*** ./src/composables/position.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makePositionProps": () => (/* binding */ makePositionProps),
/* harmony export */   "usePosition": () => (/* binding */ usePosition)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Utilities


 // Types

const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'];
// Composables
const makePositionProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  absolute: Boolean,
  bottom: [Boolean, Number, String],
  fixed: Boolean,
  left: [Boolean, Number, String],
  position: {
    type: String,
    validator:
    /* istanbul ignore next */
    v => positionValues.includes(v)
  },
  right: [Boolean, Number, String],
  top: [Boolean, Number, String]
}, 'position');
function usePosition(props, name) {
  const targets = ['top', 'right', 'bottom', 'left'];
  const positionClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (props.fixed) return "".concat(name, "--fixed");
    if (props.absolute) return "".concat(name, "--absolute");
    return props.position ? "position-".concat(props.position) : undefined;
  });
  const positionStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const styles = {};

    for (const target of targets) {
      const prop = props[target];
      if (prop == null || prop === false) continue;
      styles[target] = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(prop === true ? '0' : String(prop));
    }

    return styles;
  });
  return {
    positionClasses,
    positionStyles
  };
}

/***/ }),

/***/ "./src/composables/proxiedModel.ts":
/*!*****************************************!*\
  !*** ./src/composables/proxiedModel.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useProxiedModel": () => (/* binding */ useProxiedModel)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/console */ "./src/util/console.ts");
// Types
// Utilities


function useProxiedModel(props, prop, defaultValue, transformIn = v => v, transformOut = v => v) {
  const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
  if (!vm) (0,_util_console__WEBPACK_IMPORTED_MODULE_1__.consoleError)('useProxiedModel must be called from inside a setup function');
  const propIsDefined = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    var _vm$vnode$props, _vm$vnode$props2;

    return !!(typeof props[prop] !== 'undefined' && ((vm == null ? void 0 : (_vm$vnode$props = vm.vnode.props) == null ? void 0 : _vm$vnode$props.hasOwnProperty(prop)) || (vm == null ? void 0 : (_vm$vnode$props2 = vm.vnode.props) == null ? void 0 : _vm$vnode$props2.hasOwnProperty((0,vue__WEBPACK_IMPORTED_MODULE_0__.capitalize)(prop)))));
  });
  const internal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(transformIn(propIsDefined.value ? props[prop] : defaultValue));
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)({
    get() {
      if (propIsDefined.value) return transformIn(props[prop]);else return internal.value;
    },

    set(newValue) {
      internal.value = newValue;
      vm == null ? void 0 : vm.emit("update:".concat(prop), transformOut(newValue));
    }

  });
}

/***/ }),

/***/ "./src/composables/size.ts":
/*!*********************************!*\
  !*** ./src/composables/size.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeSizeProps": () => (/* binding */ makeSizeProps),
/* harmony export */   "useSize": () => (/* binding */ useSize)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Setup



const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large'];
// Props
const makeSizeProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_1__.default)({
  size: {
    type: [String, Number],
    default: 'default'
  }
}, 'size'); // Effect

function useSize(props, name) {
  const sizeClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return predefinedSizes.includes(props.size) ? "".concat(name, "--size-").concat(props.size) : null;
  });
  const sizeStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return !predefinedSizes.includes(props.size) && props.size ? {
      width: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.size),
      height: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.size)
    } : null;
  });
  return {
    sizeClasses,
    sizeStyles
  };
}

/***/ }),

/***/ "./src/composables/ssrBoot.ts":
/*!************************************!*\
  !*** ./src/composables/ssrBoot.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSsrBoot": () => (/* binding */ useSsrBoot)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Utilities
 // Composables

function useSsrBoot() {
  const isBooted = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true;
    });
  });
  const ssrBootStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => !isBooted.value ? {
    transition: 'none !important'
  } : undefined);
  return {
    ssrBootStyles
  };
}

/***/ }),

/***/ "./src/composables/tag.ts":
/*!********************************!*\
  !*** ./src/composables/tag.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeTagProps": () => (/* binding */ makeTagProps)
/* harmony export */ });
/* harmony import */ var _util_propsFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/propsFactory */ "./src/util/propsFactory.ts");
// Utilities
 // Types

// Props
const makeTagProps = (0,_util_propsFactory__WEBPACK_IMPORTED_MODULE_0__.default)({
  tag: {
    type: String,
    default: 'div'
  }
}, 'tag');

/***/ }),

/***/ "./src/composables/theme.ts":
/*!**********************************!*\
  !*** ./src/composables/theme.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VuetifyThemeSymbol": () => (/* binding */ VuetifyThemeSymbol),
/* harmony export */   "createTheme": () => (/* binding */ createTheme),
/* harmony export */   "provideTheme": () => (/* binding */ provideTheme),
/* harmony export */   "useTheme": () => (/* binding */ useTheme)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/colorUtils.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
// Utilities

 // Types

const VuetifyThemeSymbol = Symbol.for('vuetify:theme');
const defaultThemeOptions = {
  defaultTheme: 'light',
  variations: {
    colors: [],
    lighten: 0,
    darken: 0
  },
  themes: {
    light: {
      dark: false,
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      },
      variables: {
        'border-color': '0, 0, 0',
        'border-opacity': 0.12
      }
    },
    dark: {
      dark: true,
      colors: {
        background: '#121212',
        surface: '#121212',
        primary: '#BB86FC',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC5',
        'secondary-darken-1': '#03DAC5',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      },
      variables: {
        'border-color': '255, 255, 255',
        'border-opacity': 0.12
      }
    }
  }
};

const parseThemeOptions = (options = defaultThemeOptions) => {
  if (!options) return { ...defaultThemeOptions,
    isDisabled: true
  };
  return { ...defaultThemeOptions,
    ...options,
    variations: (options == null ? void 0 : options.variations) == null || (options == null ? void 0 : options.variations) === false ? defaultThemeOptions.variations : options.variations
  };
};

function createTheme(options) {
  const parsedOptions = parseThemeOptions(options);
  const styleEl = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
  const current = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(parsedOptions.defaultTheme);
  const themes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(parsedOptions.themes);
  const variations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(parsedOptions.variations);
  const computedThemes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return Object.keys(themes.value).reduce((obj, key) => {
      var _parsedOptions$variat;

      const theme = { ...themes.value[key],
        colors: { ...themes.value[key].colors,
          ...((_parsedOptions$variat = parsedOptions.variations.colors) != null ? _parsedOptions$variat : []).reduce((obj, color) => {
            return { ...obj,
              ...genColorVariations(color, themes.value[key].colors[color])
            };
          }, {})
        }
      };

      for (const color of Object.keys(theme.colors)) {
        if (/on-[a-z]/.test(color) || theme.colors["on-".concat(color)]) continue;
        const onColor = "on-".concat(color);
        theme.colors[onColor] = (0,_util__WEBPACK_IMPORTED_MODULE_1__.intToHex)((0,_util__WEBPACK_IMPORTED_MODULE_1__.getLuma)(theme.colors[color]) > 0.18 ? 0x0 : 0xffffff);
      }

      obj[key] = theme;
      return obj;
    }, {});
  });

  function genColorVariations(name, color) {
    const obj = {};

    for (const variation of ['lighten', 'darken']) {
      const fn = variation === 'lighten' ? _util__WEBPACK_IMPORTED_MODULE_1__.lighten : _util__WEBPACK_IMPORTED_MODULE_1__.darken;

      for (const amount of (0,_util__WEBPACK_IMPORTED_MODULE_2__.createRange)(variations.value[variation], 1)) {
        obj["".concat(name, "-").concat(variation, "-").concat(amount)] = (0,_util__WEBPACK_IMPORTED_MODULE_1__.intToHex)(fn((0,_util__WEBPACK_IMPORTED_MODULE_1__.colorToInt)(color), amount));
      }
    }

    return obj;
  }

  function genCssVariables(name) {
    const theme = computedThemes.value[name];
    if (!theme) throw new Error("Could not find theme ".concat(name));
    const lightOverlay = theme.dark ? 2 : 1;
    const darkOverlay = theme.dark ? 1 : 2;
    const variables = [];

    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = (0,_util__WEBPACK_IMPORTED_MODULE_1__.colorToRGB)(value);
      variables.push("--v-theme-".concat(key, ": ").concat(rgb.r, ",").concat(rgb.g, ",").concat(rgb.b));

      if (!key.startsWith('on-')) {
        variables.push("--v-theme-".concat(key, "-overlay-multiplier: ").concat((0,_util__WEBPACK_IMPORTED_MODULE_1__.getLuma)(value) > 0.18 ? lightOverlay : darkOverlay));
      }
    }

    return variables;
  }

  function genStyleElement() {
    if (typeof document === 'undefined' || styleEl.value) return;
    const el = document.createElement('style');
    el.type = 'text/css';
    el.id = 'vuetify-theme-stylesheet';
    styleEl.value = el;
    document.head.appendChild(styleEl.value);
  }

  function createCssClass(selector, content) {
    return ["".concat(selector, " {\n"), ...content.map(line => "  ".concat(line, ";\n")), '}\n'];
  }

  function updateStyles() {
    if (parsedOptions.isDisabled) return;
    genStyleElement();
    const lines = [];

    for (const themeName of Object.keys(computedThemes.value)) {
      const variables = computedThemes.value[themeName].variables;
      lines.push(...createCssClass(".v-theme--".concat(themeName), [...genCssVariables(themeName), ...Object.keys(variables).map(key => {
        return "--v-".concat(key, ": ").concat(variables[key]);
      })]));
    } // Assumption is that all theme objects have the same keys, so it doesn't matter which one
    // we use since the values are all css variables.


    const firstTheme = Object.keys(computedThemes.value)[0];

    for (const key of Object.keys(computedThemes.value[firstTheme].colors)) {
      if (/on-[a-z]/.test(key)) {
        lines.push(...createCssClass(".".concat(key), ["color: rgb(var(--v-theme-".concat(key, "))")]));
      } else {
        lines.push(...createCssClass(".bg-".concat(key), ["--v-theme-overlay-multiplier: var(--v-theme-".concat(key, "-overlay-multiplier)"), "background: rgb(var(--v-theme-".concat(key, "))"), "color: rgb(var(--v-theme-on-".concat(key, "))")]), ...createCssClass(".text-".concat(key), ["color: rgb(var(--v-theme-".concat(key, "))")]), ...createCssClass(".border-".concat(key), ["--v-border-color: var(--v-theme-".concat(key, ")")]));
      }
    }

    if (styleEl.value) styleEl.value.innerHTML = lines.map((str, i) => i === 0 ? str : "    ".concat(str)).join('');
  }

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(themes, updateStyles, {
    deep: true,
    immediate: true
  });
  return {
    isDisabled: parsedOptions.isDisabled,
    themes: computedThemes,
    setTheme: (key, theme) => themes.value[key] = theme,
    getTheme: key => computedThemes.value[key],
    current,
    themeClasses: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => parsedOptions.isDisabled ? '' : "v-theme--".concat(current.value)),
    hasColor: color => !!computedThemes.value[current.value].colors[color]
  };
}
/**
 * Used to either set up and provide a new theme instance, or to pass
 * along the closest available already provided instance.
 *
 * A new theme instance will be created if either `theme` prop is provided,
 * or if `newContext` prop is true
 */

function provideTheme(props = {}, context) {
  const theme = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyThemeSymbol, null);
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  const internal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
  const current = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)({
    get: () => {
      var _ref, _internal$value;

      return (_ref = (_internal$value = internal.value) != null ? _internal$value : props.theme) != null ? _ref : theme == null ? void 0 : theme.current.value;
    },

    set(value) {
      if (theme && !props.theme && !props.newContext) {
        theme.current.value = value;
      } else {
        internal.value = value;
        context.emit('update:theme', value);
      }
    }

  });
  const themeClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => theme.isDisabled ? '' : "v-theme--".concat(current.value));
  const newTheme = { ...theme,
    current,
    themeClasses
  };
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(VuetifyThemeSymbol, newTheme);
  return newTheme;
}
/**
 * Injects and returns closest available provided theme instance.
 */

function useTheme() {
  const theme = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyThemeSymbol);
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  return theme;
}

/***/ }),

/***/ "./src/directives/click-outside/index.ts":
/*!***********************************************!*\
  !*** ./src/directives/click-outside/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClickOutside": () => (/* binding */ ClickOutside)
/* harmony export */ });
function defaultConditional() {
  return true;
}

function directive(e, el, binding) {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler;
  const isActive = typeof binding.value === 'object' && binding.value.closeConditional || defaultConditional; // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.

  if (!e || !isActive(e)) return; // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)

  const elements = (typeof binding.value === 'object' && binding.value.include || (() => []))(); // Add the root element for the component this directive was defined on


  elements.push(el); // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occur before
  // the bubbling click event on any outside elements.

  !elements.some(el => el.contains(e.target)) && setTimeout(() => {
    isActive(e) && handler && handler(e);
  }, 0);
}

const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    var _document$querySelect;

    const onClick = e => directive(e, el, binding); // iOS does not recognize click events on document
    // or body, this is the entire purpose of the v-app
    // component and [data-app], stop removing this


    const app = (_document$querySelect = document.querySelector('[data-app]')) != null ? _document$querySelect : document.body; // This is only for unit tests

    app.addEventListener('click', onClick, true);
    el._clickOutside = onClick;
  },

  unmounted(el) {
    var _document$querySelect2;

    if (!el._clickOutside) return;
    const app = (_document$querySelect2 = document.querySelector('[data-app]')) != null ? _document$querySelect2 : document.body; // This is only for unit tests

    app == null ? void 0 : app.removeEventListener('click', el._clickOutside, true);
    delete el._clickOutside;
  }

};
/* harmony default export */ __webpack_exports__["default"] = (ClickOutside);

/***/ }),

/***/ "./src/directives/index.ts":
/*!*********************************!*\
  !*** ./src/directives/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClickOutside": () => (/* reexport safe */ _click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutside),
/* harmony export */   "Intersect": () => (/* reexport safe */ _intersect__WEBPACK_IMPORTED_MODULE_1__.Intersect),
/* harmony export */   "Resize": () => (/* reexport safe */ _resize__WEBPACK_IMPORTED_MODULE_2__.Resize),
/* harmony export */   "Ripple": () => (/* reexport safe */ _ripple__WEBPACK_IMPORTED_MODULE_3__.Ripple),
/* harmony export */   "Scroll": () => (/* reexport safe */ _scroll__WEBPACK_IMPORTED_MODULE_4__.Scroll),
/* harmony export */   "Touch": () => (/* reexport safe */ _touch__WEBPACK_IMPORTED_MODULE_5__.Touch)
/* harmony export */ });
/* harmony import */ var _click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./click-outside */ "./src/directives/click-outside/index.ts");
/* harmony import */ var _intersect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intersect */ "./src/directives/intersect/index.ts");
/* harmony import */ var _resize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resize */ "./src/directives/resize/index.ts");
/* harmony import */ var _ripple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ripple */ "./src/directives/ripple/index.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scroll */ "./src/directives/scroll/index.ts");
/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./touch */ "./src/directives/touch/index.ts");
 // export { Color } from './color'

 // export { Mutate } from './mutate'






/***/ }),

/***/ "./src/directives/intersect/index.ts":
/*!*******************************************!*\
  !*** ./src/directives/intersect/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Intersect": () => (/* binding */ Intersect)
/* harmony export */ });
// Types
function mounted(el, binding) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    handler,
    options
  } = typeof value === 'object' ? value : {
    handler: value,
    options: {}
  };
  const observer = new IntersectionObserver((entries = [], observer) => {
    /* istanbul ignore if */
    if (!el._observe) return; // Just in case, should never fire
    // If is not quiet or has already been
    // initted, invoke the user callback

    if (handler && (!modifiers.quiet || el._observe.init)) {
      const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting));
      handler(isIntersecting, entries, observer);
    } // If has already been initted and
    // has the once modifier, unbind


    if (el._observe.init && modifiers.once) unmounted(el); // Otherwise, mark the observer as initted
    else el._observe.init = true;
  }, options);
  el._observe = {
    init: false,
    observer
  };
  observer.observe(el);
}

function unmounted(el) {
  /* istanbul ignore if */
  if (!el._observe) return;

  el._observe.observer.unobserve(el);

  delete el._observe;
}

const Intersect = {
  mounted,
  unmounted
};
/* harmony default export */ __webpack_exports__["default"] = (Intersect);

/***/ }),

/***/ "./src/directives/resize/index.ts":
/*!****************************************!*\
  !*** ./src/directives/resize/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resize": () => (/* binding */ Resize)
/* harmony export */ });
function mounted(el, binding) {
  var _binding$modifiers, _binding$modifiers2;

  const handler = binding.value;
  const options = {
    passive: !((_binding$modifiers = binding.modifiers) == null ? void 0 : _binding$modifiers.active)
  };
  window.addEventListener('resize', handler, options);
  el._onResize = {
    handler,
    options
  };

  if (!((_binding$modifiers2 = binding.modifiers) == null ? void 0 : _binding$modifiers2.quiet)) {
    handler();
  }
}

function unmounted(el) {
  if (!el._onResize) return;
  const {
    handler,
    options
  } = el._onResize;
  window.removeEventListener('resize', handler, options);
  delete el._onResize;
}

const Resize = {
  mounted,
  unmounted
};
/* harmony default export */ __webpack_exports__["default"] = (Resize);

/***/ }),

/***/ "./src/directives/ripple/index.ts":
/*!****************************************!*\
  !*** ./src/directives/ripple/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ripple": () => (/* binding */ Ripple)
/* harmony export */ });
/* harmony import */ var _VRipple_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VRipple.sass */ "./src/directives/ripple/VRipple.sass");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
// Styles
 // Utilities

 // Types

const rippleStop = Symbol('rippleStop');
const DELAY_RIPPLE = 80;

function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}

function opacity(el, value) {
  el.style.opacity = "calc(".concat(value, " * var(--v-theme-overlay-multiplier))");
}

function isTouchEvent(e) {
  return e.constructor.name === 'TouchEvent';
}

function isKeyboardEvent(e) {
  return e.constructor.name === 'KeyboardEvent';
}

const calculate = (e, el, value = {}) => {
  var _el$_ripple;

  let localX = 0;
  let localY = 0;

  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }

  let radius = 0;
  let scale = 0.3;

  if ((_el$_ripple = el._ripple) == null ? void 0 : _el$_ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }

  const centerX = "".concat((el.clientWidth - radius * 2) / 2, "px");
  const centerY = "".concat((el.clientHeight - radius * 2) / 2, "px");
  const x = value.center ? centerX : "".concat(localX - radius, "px");
  const y = value.center ? centerY : "".concat(localY - radius, "px");
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};

const ripples = {
  /* eslint-disable max-statements */
  show(e, el, value = {}) {
    var _el$_ripple2;

    if (!(el == null ? void 0 : (_el$_ripple2 = el._ripple) == null ? void 0 : _el$_ripple2.enabled)) {
      return;
    }

    const container = document.createElement('span');
    const animation = document.createElement('span');
    container.appendChild(animation);
    container.className = 'v-ripple__container';

    if (value.class) {
      container.className += " ".concat(value.class);
    }

    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = "".concat(radius * 2, "px");
    animation.className = 'v-ripple__animation';
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed = window.getComputedStyle(el);

    if (computed && computed.position === 'static') {
      el.style.position = 'relative';
      el.dataset.previousPosition = 'static';
    }

    animation.classList.add('v-ripple__animation--enter');
    animation.classList.add('v-ripple__animation--visible');
    transform(animation, "translate(".concat(x, ", ").concat(y, ") scale3d(").concat(scale, ",").concat(scale, ",").concat(scale, ")"));
    opacity(animation, 0);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter');
      animation.classList.add('v-ripple__animation--in');
      transform(animation, "translate(".concat(centerX, ", ").concat(centerY, ") scale3d(1,1,1)"));
      opacity(animation, 0.08);
    }, 0);
  },

  hide(el) {
    var _el$_ripple3;

    if (!(el == null ? void 0 : (_el$_ripple3 = el._ripple) == null ? void 0 : _el$_ripple3.enabled)) return;
    const ripples = el.getElementsByClassName('v-ripple__animation');
    if (ripples.length === 0) return;
    const animation = ripples[ripples.length - 1];
    if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in');
      animation.classList.add('v-ripple__animation--out');
      opacity(animation, 0);
      setTimeout(() => {
        const ripples = el.getElementsByClassName('v-ripple__animation');

        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }

        animation.parentNode && el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }

};

function isRippleEnabled(value) {
  return typeof value === 'undefined' || !!value;
}

function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple) || element._ripple.touched || e[rippleStop]) return; // Don't allow the event to trigger ripples on any other elements

  e[rippleStop] = true;

  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    // It's possible for touch events to fire
    // as mouse events on Android/iOS, this
    // will skip the event call if it has
    // already been registered as touch
    if (element._ripple.isTouch) return;
  }

  value.center = element._ripple.centered || isKeyboardEvent(e);

  if (element._ripple.class) {
    value.class = element._ripple.class;
  }

  if (isTouchEvent(e)) {
    // already queued that shows or hides the ripple
    if (element._ripple.showTimerCommit) return;

    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };

    element._ripple.showTimer = window.setTimeout(() => {
      var _element$_ripple;

      if (element == null ? void 0 : (_element$_ripple = element._ripple) == null ? void 0 : _element$_ripple.showTimerCommit) {
        element._ripple.showTimerCommit();

        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}

function rippleHide(e) {
  const element = e.currentTarget;
  if (!element || !element._ripple) return;
  window.clearTimeout(element._ripple.showTimer); // The touch interaction occurs before the show timer is triggered.
  // We still want to show ripple effect.

  if (e.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();

    element._ripple.showTimerCommit = null; // re-queue ripple hiding

    element._ripple.showTimer = setTimeout(() => {
      rippleHide(e);
    });
    return;
  }

  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}

function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!element || !element._ripple) return;

  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }

  window.clearTimeout(element._ripple.showTimer);
}

let keyboardRipple = false;

function keyboardRippleShow(e) {
  if (!keyboardRipple && (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_1__.keyCodes.enter || e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_1__.keyCodes.space)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}

function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}

function updateRipple(el, binding, wasEnabled) {
  var _el$_ripple4;

  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);

  if (!enabled) {
    ripples.hide(el);
  }

  el._ripple = (_el$_ripple4 = el._ripple) != null ? _el$_ripple4 : {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;

  if ((0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.isObject)(value) && value.class) {
    el._ripple.class = value.class;
  }

  if (enabled && !wasEnabled) {
    el.addEventListener('touchstart', rippleShow, {
      passive: true
    });
    el.addEventListener('touchend', rippleHide, {
      passive: true
    });
    el.addEventListener('touchmove', rippleCancelShow, {
      passive: true
    });
    el.addEventListener('touchcancel', rippleHide);
    el.addEventListener('mousedown', rippleShow);
    el.addEventListener('mouseup', rippleHide);
    el.addEventListener('mouseleave', rippleHide);
    el.addEventListener('keydown', keyboardRippleShow);
    el.addEventListener('keyup', keyboardRippleHide); // Anchor tags can be dragged, causes other hides to fail - #1537

    el.addEventListener('dragstart', rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}

function removeListeners(el) {
  el.removeEventListener('mousedown', rippleShow);
  el.removeEventListener('touchstart', rippleShow);
  el.removeEventListener('touchend', rippleHide);
  el.removeEventListener('touchmove', rippleCancelShow);
  el.removeEventListener('touchcancel', rippleHide);
  el.removeEventListener('mouseup', rippleHide);
  el.removeEventListener('mouseleave', rippleHide);
  el.removeEventListener('keydown', keyboardRippleShow);
  el.removeEventListener('keyup', keyboardRippleHide);
  el.removeEventListener('dragstart', rippleHide);
}

function mounted(el, binding) {
  updateRipple(el, binding, false);
}

function unmounted(el) {
  delete el._ripple;
  removeListeners(el);
}

function updated(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }

  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}

const Ripple = {
  mounted,
  unmounted,
  updated
};
/* harmony default export */ __webpack_exports__["default"] = (Ripple);

/***/ }),

/***/ "./src/directives/scroll/index.ts":
/*!****************************************!*\
  !*** ./src/directives/scroll/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scroll": () => (/* binding */ Scroll)
/* harmony export */ });
function mounted(el, binding) {
  var _binding$modifiers;

  const {
    self = false
  } = (_binding$modifiers = binding.modifiers) != null ? _binding$modifiers : {};
  const value = binding.value;
  const options = typeof value === 'object' && value.options || {
    passive: true
  };
  const handler = typeof value === 'function' || 'handleEvent' in value ? value : value.handler;
  const target = self ? el : binding.arg ? document.querySelector(binding.arg) : window;
  if (!target) return;
  target.addEventListener('scroll', handler, options);
  el._onScroll = {
    handler,
    options,
    // Don't reference self
    target: self ? undefined : target
  };
}

function unmounted(el) {
  if (!el._onScroll) return;
  const {
    handler,
    options,
    target = el
  } = el._onScroll;
  target.removeEventListener('scroll', handler, options);
  delete el._onScroll;
}

function updated(el, binding) {
  if (binding.value === binding.oldValue) return;
  unmounted(el);
  mounted(el, binding);
}

const Scroll = {
  mounted,
  unmounted,
  updated
};
/* harmony default export */ __webpack_exports__["default"] = (Scroll);

/***/ }),

/***/ "./src/directives/touch/index.ts":
/*!***************************************!*\
  !*** ./src/directives/touch/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Touch": () => (/* binding */ Touch)
/* harmony export */ });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
// Types
// Utilities


const handleGesture = wrapper => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};

function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start == null ? void 0 : wrapper.start({ ...event,
    ...wrapper
  });
}

function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end == null ? void 0 : wrapper.end({ ...event,
    ...wrapper
  });
  handleGesture(wrapper);
}

function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move == null ? void 0 : wrapper.move({ ...event,
    ...wrapper
  });
}

function createHandlers(value = {}) {
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: e => touchstart(e, wrapper),
    touchend: e => touchend(e, wrapper),
    touchmove: e => touchmove(e, wrapper)
  };
}

function mounted(el, binding) {
  var _value$options, _binding$instance, _target$_touchHandler;

  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (_value$options = value == null ? void 0 : value.options) != null ? _value$options : {
    passive: true
  };
  const uid = (_binding$instance = binding.instance) == null ? void 0 : _binding$instance.$.uid; // TODO: use custom uid generator

  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = (_target$_touchHandler = target._touchHandlers) != null ? _target$_touchHandler : Object.create(null);
  target._touchHandlers[uid] = handlers;
  (0,_util_helpers__WEBPACK_IMPORTED_MODULE_0__.keys)(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}

function unmounted(el, binding) {
  var _binding$value, _binding$instance2;

  const target = ((_binding$value = binding.value) == null ? void 0 : _binding$value.parent) ? el.parentElement : el;
  const uid = (_binding$instance2 = binding.instance) == null ? void 0 : _binding$instance2.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid) return;
  const handlers = target._touchHandlers[uid];
  (0,_util_helpers__WEBPACK_IMPORTED_MODULE_0__.keys)(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}

const Touch = {
  mounted,
  unmounted
};
/* harmony default export */ __webpack_exports__["default"] = (Touch);

/***/ }),

/***/ "./src/entry-bundler.ts":
/*!******************************!*\
  !*** ./src/entry-bundler.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VApp": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VApp),
/* harmony export */   "VAvatar": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VAvatar),
/* harmony export */   "VBanner": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VBanner),
/* harmony export */   "VBtn": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VBtn),
/* harmony export */   "VCarouselReverseTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VCarouselReverseTransition),
/* harmony export */   "VCarouselTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VCarouselTransition),
/* harmony export */   "VClassIcon": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VClassIcon),
/* harmony export */   "VCol": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VCol),
/* harmony export */   "VComponentIcon": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VComponentIcon),
/* harmony export */   "VContainer": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VContainer),
/* harmony export */   "VDialogBottomTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VDialogBottomTransition),
/* harmony export */   "VDialogTopTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VDialogTopTransition),
/* harmony export */   "VDialogTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VDialogTransition),
/* harmony export */   "VDivider": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VDivider),
/* harmony export */   "VExpandTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VExpandTransition),
/* harmony export */   "VExpandXTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VExpandXTransition),
/* harmony export */   "VFabTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VFabTransition),
/* harmony export */   "VFadeTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VFadeTransition),
/* harmony export */   "VFooter": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VFooter),
/* harmony export */   "VIcon": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VIcon),
/* harmony export */   "VImg": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VImg),
/* harmony export */   "VLayout": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VLayout),
/* harmony export */   "VLayoutItem": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VLayoutItem),
/* harmony export */   "VLigatureIcon": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VLigatureIcon),
/* harmony export */   "VMain": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VMain),
/* harmony export */   "VMenuTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VMenuTransition),
/* harmony export */   "VNavigationDrawer": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VNavigationDrawer),
/* harmony export */   "VResponsive": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VResponsive),
/* harmony export */   "VRow": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VRow),
/* harmony export */   "VScaleTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VScaleTransition),
/* harmony export */   "VScrollXReverseTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VScrollXReverseTransition),
/* harmony export */   "VScrollXTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VScrollXTransition),
/* harmony export */   "VScrollYReverseTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VScrollYReverseTransition),
/* harmony export */   "VScrollYTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VScrollYTransition),
/* harmony export */   "VSheet": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSheet),
/* harmony export */   "VSlideXReverseTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSlideXReverseTransition),
/* harmony export */   "VSlideXTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSlideXTransition),
/* harmony export */   "VSlideYReverseTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSlideYReverseTransition),
/* harmony export */   "VSlideYTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSlideYTransition),
/* harmony export */   "VSpacer": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSpacer),
/* harmony export */   "VSvgIcon": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSvgIcon),
/* harmony export */   "VSystemBar": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VSystemBar),
/* harmony export */   "VTabReverseTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VTabReverseTransition),
/* harmony export */   "VTabTransition": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VTabTransition),
/* harmony export */   "VThemeProvider": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_1__.VThemeProvider),
/* harmony export */   "VuetifySymbol": () => (/* reexport safe */ _framework__WEBPACK_IMPORTED_MODULE_2__.VuetifySymbol),
/* harmony export */   "useVuetify": () => (/* reexport safe */ _framework__WEBPACK_IMPORTED_MODULE_2__.useVuetify),
/* harmony export */   "createVuetify": () => (/* binding */ createVuetify)
/* harmony export */ });
/* harmony import */ var _styles_main_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.sass */ "./src/styles/main.sass");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives */ "./src/directives/index.ts");
/* harmony import */ var _framework__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./framework */ "./src/framework.ts");






const createVuetify = (options = {}) => {
  return _framework__WEBPACK_IMPORTED_MODULE_2__.createVuetify({
    components: _components__WEBPACK_IMPORTED_MODULE_1__,
    directives: _directives__WEBPACK_IMPORTED_MODULE_3__,
    ...options
  });
};

/***/ }),

/***/ "./src/framework.ts":
/*!**************************!*\
  !*** ./src/framework.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VuetifySymbol": () => (/* binding */ VuetifySymbol),
/* harmony export */   "useVuetify": () => (/* binding */ useVuetify),
/* harmony export */   "createVuetify": () => (/* binding */ createVuetify)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./composables/icons */ "./src/composables/icons.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util/helpers.ts");
/* harmony import */ var _iconsets_mdi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./iconsets/mdi */ "./src/iconsets/mdi.ts");




 // Types

const VuetifySymbol = Symbol.for('vuetify');
const useVuetify = () => {
  const vuetify = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifySymbol);

  if (!vuetify) {
    throw new Error('Vuetify has not been installed on this app');
  }

  return vuetify;
};
const createVuetify = (options = {}) => {
  const install = app => {
    const {
      components = {},
      directives = {},
      defaults = {},
      icons = {}
    } = options;

    for (const key in directives) {
      const directive = directives[key];
      app.directive(key, directive);
    }

    for (const key in components) {
      const component = components[key];
      app.component(key, component);
    }

    const vuetify = {
      defaults: {
        global: {},
        ...defaults
      }
    };
    app.provide(VuetifySymbol, vuetify);
    app.provide(_composables_theme__WEBPACK_IMPORTED_MODULE_1__.VuetifyThemeSymbol, (0,_composables_theme__WEBPACK_IMPORTED_MODULE_1__.createTheme)(options.theme));
    app.provide(_composables_icons__WEBPACK_IMPORTED_MODULE_2__.VuetifyIconSymbol, (0,_util__WEBPACK_IMPORTED_MODULE_3__.mergeDeep)({
      defaultSet: 'mdi',
      sets: { ..._composables_icons__WEBPACK_IMPORTED_MODULE_2__.defaultSets,
        mdi: _iconsets_mdi__WEBPACK_IMPORTED_MODULE_4__.mdi
      },
      aliases: _iconsets_mdi__WEBPACK_IMPORTED_MODULE_4__.aliases
    }, icons));
    app.config.globalProperties.$vuetify = vuetify;
  };

  return {
    install
  };
};

/***/ }),

/***/ "./src/iconsets/mdi.ts":
/*!*****************************!*\
  !*** ./src/iconsets/mdi.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aliases": () => (/* binding */ aliases),
/* harmony export */   "mdi": () => (/* binding */ mdi)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composables/icons */ "./src/composables/icons.tsx");
// Utilities
 // Components

 // Types

const aliases = {
  complete: 'mdi-check',
  cancel: 'mdi-close-circle',
  close: 'mdi-close',
  delete: 'mdi-close-circle',
  // delete (e.g. v-chip close)
  clear: 'mdi-close',
  success: 'mdi-check-circle',
  info: 'mdi-information',
  warning: 'mdi-exclamation',
  error: 'mdi-alert',
  prev: 'mdi-chevron-left',
  next: 'mdi-chevron-right',
  checkboxOn: 'mdi-checkbox-marked',
  checkboxOff: 'mdi-checkbox-blank-outline',
  checkboxIndeterminate: 'mdi-minus-box',
  delimiter: 'mdi-circle',
  // for carousel
  sort: 'mdi-arrow-up',
  expand: 'mdi-chevron-down',
  menu: 'mdi-menu',
  subgroup: 'mdi-menu-down',
  dropdown: 'mdi-menu-down',
  radioOn: 'mdi-radiobox-marked',
  radioOff: 'mdi-radiobox-blank',
  edit: 'mdi-pencil',
  ratingEmpty: 'mdi-star-outline',
  ratingFull: 'mdi-star',
  ratingHalf: 'mdi-star-half-full',
  loading: 'mdi-cached',
  first: 'mdi-page-first',
  last: 'mdi-page-last',
  unfold: 'mdi-unfold-more-horizontal',
  file: 'mdi-paperclip',
  plus: 'mdi-plus',
  minus: 'mdi-minus'
};
const mdi = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: props => (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(_composables_icons__WEBPACK_IMPORTED_MODULE_1__.VClassIcon, { ...props,
    class: 'mdi'
  })
};


/***/ }),

/***/ "./src/util/color/transformCIELAB.ts":
/*!*******************************************!*\
  !*** ./src/util/color/transformCIELAB.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromXYZ": () => (/* binding */ fromXYZ),
/* harmony export */   "toXYZ": () => (/* binding */ toXYZ)
/* harmony export */ });
const delta = 0.20689655172413793; // 6÷29

const cielabForwardTransform = t => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;

const cielabReverseTransform = t => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);

function fromXYZ(xyz) {
  const transform = cielabForwardTransform;
  const transformedY = transform(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883))];
}
function toXYZ(lab) {
  const transform = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform(Ln + lab[1] / 500) * 0.95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883];
}

/***/ }),

/***/ "./src/util/color/transformSRGB.ts":
/*!*****************************************!*\
  !*** ./src/util/color/transformSRGB.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromXYZ": () => (/* binding */ fromXYZ),
/* harmony export */   "toXYZ": () => (/* binding */ toXYZ)
/* harmony export */ });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
 // For converting XYZ to sRGB

const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]]; // Forward gamma adjust

const srgbForwardTransform = C => C <= 0.0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055; // For converting sRGB to XYZ


const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]]; // Reverse gamma adjust

const srgbReverseTransform = C => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;

function fromXYZ(xyz) {
  const rgb = Array(3);
  const transform = srgbForwardTransform;
  const matrix = srgbForwardMatrix; // Matrix transform, then gamma adjustment

  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round((0,_util_helpers__WEBPACK_IMPORTED_MODULE_0__.clamp)(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  } // Rescale back to [0, 255]


  return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
}
function toXYZ(rgb) {
  const xyz = [0, 0, 0];
  const transform = srgbReverseTransform;
  const matrix = srgbReverseMatrix; // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB

  const r = transform((rgb >> 16 & 0xff) / 255);
  const g = transform((rgb >> 8 & 0xff) / 255);
  const b = transform((rgb >> 0 & 0xff) / 255); // Matrix color space transform

  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }

  return xyz;
}

/***/ }),

/***/ "./src/util/colorUtils.ts":
/*!********************************!*\
  !*** ./src/util/colorUtils.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isCssColor": () => (/* binding */ isCssColor),
/* harmony export */   "colorToInt": () => (/* binding */ colorToInt),
/* harmony export */   "classToHex": () => (/* binding */ classToHex),
/* harmony export */   "intToHex": () => (/* binding */ intToHex),
/* harmony export */   "colorToHex": () => (/* binding */ colorToHex),
/* harmony export */   "HSVAtoRGBA": () => (/* binding */ HSVAtoRGBA),
/* harmony export */   "RGBAtoHSVA": () => (/* binding */ RGBAtoHSVA),
/* harmony export */   "HSVAtoHSLA": () => (/* binding */ HSVAtoHSLA),
/* harmony export */   "HSLAtoHSVA": () => (/* binding */ HSLAtoHSVA),
/* harmony export */   "RGBAtoCSS": () => (/* binding */ RGBAtoCSS),
/* harmony export */   "RGBtoCSS": () => (/* binding */ RGBtoCSS),
/* harmony export */   "RGBAtoHex": () => (/* binding */ RGBAtoHex),
/* harmony export */   "HexToRGBA": () => (/* binding */ HexToRGBA),
/* harmony export */   "HexToHSVA": () => (/* binding */ HexToHSVA),
/* harmony export */   "HSVAtoHex": () => (/* binding */ HSVAtoHex),
/* harmony export */   "parseHex": () => (/* binding */ parseHex),
/* harmony export */   "parseGradient": () => (/* binding */ parseGradient),
/* harmony export */   "RGBtoInt": () => (/* binding */ RGBtoInt),
/* harmony export */   "colorToRGB": () => (/* binding */ colorToRGB),
/* harmony export */   "lighten": () => (/* binding */ lighten),
/* harmony export */   "darken": () => (/* binding */ darken),
/* harmony export */   "getLuma": () => (/* binding */ getLuma),
/* harmony export */   "getContrast": () => (/* binding */ getContrast)
/* harmony export */ });
/* harmony import */ var _console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./console */ "./src/util/console.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/util/helpers.ts");
/* harmony import */ var _color_transformSRGB__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color/transformSRGB */ "./src/util/color/transformSRGB.ts");
/* harmony import */ var _color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color/transformCIELAB */ "./src/util/color/transformCIELAB.ts");
// Utilities



 // Types

function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function colorToInt(color) {
  let rgb;

  if (typeof color === 'number') {
    rgb = color;
  } else if (typeof color === 'string') {
    let c = color.startsWith('#') ? color.substring(1) : color;

    if (c.length === 3) {
      c = c.split('').map(char => char + char).join('');
    }

    if (c.length !== 6) {
      (0,_console__WEBPACK_IMPORTED_MODULE_0__.consoleWarn)("'".concat(color, "' is not a valid rgb color"));
    }

    rgb = parseInt(c, 16);
  } else {
    throw new TypeError("Colors can only be numbers or strings, recieved ".concat(color == null ? color : color.constructor.name, " instead"));
  }

  if (rgb < 0) {
    (0,_console__WEBPACK_IMPORTED_MODULE_0__.consoleWarn)("Colors cannot be negative: '".concat(color, "'"));
    rgb = 0;
  } else if (rgb > 0xffffff || isNaN(rgb)) {
    (0,_console__WEBPACK_IMPORTED_MODULE_0__.consoleWarn)("'".concat(color, "' is not a valid rgb color"));
    rgb = 0xffffff;
  }

  return rgb;
}
function classToHex(color, colors, currentTheme) {
  const [colorName, colorModifier] = color.toString().trim().replace('-', '').split(' ', 2);
  let hexColor = '';

  if (colorName && colorName in colors) {
    if (colorModifier && colorModifier in colors[colorName]) {
      hexColor = colors[colorName][colorModifier];
    } else if ('base' in colors[colorName]) {
      hexColor = colors[colorName].base;
    }
  } else if (colorName && colorName in currentTheme) {
    hexColor = currentTheme[colorName];
  }

  return hexColor;
}
function intToHex(color) {
  let hexColor = color.toString(16);
  if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor;
  return '#' + hexColor;
}
function colorToHex(color) {
  return intToHex(colorToInt(color));
}
/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */

function HSVAtoRGBA(hsva) {
  const {
    h,
    s,
    v,
    a
  } = hsva;

  const f = n => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };

  const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255));
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a
  };
}
/**
 * Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color RGBA color as an array [0-255, 0-255, 0-255, 0-1]
 */

function RGBAtoHSVA(rgba) {
  if (!rgba) return {
    h: 0,
    s: 1,
    v: 1,
    a: 1
  };
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min));
    }
  }

  if (h < 0) h = h + 360;
  const s = max === 0 ? 0 : (max - min) / max;
  const hsv = [h, s, max];
  return {
    h: hsv[0],
    s: hsv[1],
    v: hsv[2],
    a: rgba.a
  };
}
function HSVAtoHSLA(hsva) {
  const {
    h,
    s,
    v,
    a
  } = hsva;
  const l = v - v * s / 2;
  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h,
    s: sprime,
    l,
    a
  };
}
function HSLAtoHSVA(hsl) {
  const {
    h,
    s,
    l,
    a
  } = hsl;
  const v = l + s * Math.min(l, 1 - l);
  const sprime = v === 0 ? 0 : 2 - 2 * l / v;
  return {
    h,
    s: sprime,
    v,
    a
  };
}
function RGBAtoCSS(rgba) {
  return "rgba(".concat(rgba.r, ", ").concat(rgba.g, ", ").concat(rgba.b, ", ").concat(rgba.a, ")");
}
function RGBtoCSS(rgba) {
  return RGBAtoCSS({ ...rgba,
    a: 1
  });
}
function RGBAtoHex(rgba) {
  const toHex = v => {
    const h = Math.round(v).toString(16);
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase();
  };

  return "#".concat([toHex(rgba.r), toHex(rgba.g), toHex(rgba.b), toHex(Math.round(rgba.a * 255))].join(''));
}
function HexToRGBA(hex) {
  const rgba = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.chunk)(hex.slice(1), 2).map(c => parseInt(c, 16));
  return {
    r: rgba[0],
    g: rgba[1],
    b: rgba[2],
    a: Math.round(rgba[3] / 255 * 100) / 100
  };
}
function HexToHSVA(hex) {
  const rgb = HexToRGBA(hex);
  return RGBAtoHSVA(rgb);
}
function HSVAtoHex(hsva) {
  return RGBAtoHex(HSVAtoRGBA(hsva));
}
function parseHex(hex) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  hex = hex.replace(/([^0-9a-f])/gi, 'F');

  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split('').map(x => x + x).join('');
  }

  if (hex.length === 6) {
    hex = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.padEnd)(hex, 8, 'F');
  } else {
    hex = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.padEnd)((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.padEnd)(hex, 6), 8, 'F');
  }

  return "#".concat(hex).toUpperCase().substr(0, 9);
}
function parseGradient(gradient, colors, currentTheme) {
  return gradient.replace(/([a-z]+(\s[a-z]+-[1-5])?)(?=$|,)/gi, x => {
    return classToHex(x, colors, currentTheme) || x;
  }).replace(/(rgba\()#[0-9a-f]+(?=,)/gi, x => {
    return 'rgba(' + Object.values(HexToRGBA(parseHex(x.replace(/rgba\(/, '')))).slice(0, 3).join(',');
  });
}
function RGBtoInt(rgba) {
  return (rgba.r << 16) + (rgba.g << 8) + rgba.b;
}
function colorToRGB(color) {
  const int = colorToInt(color);
  return {
    r: (int & 0xFF0000) >> 16,
    g: (int & 0xFF00) >> 8,
    b: int & 0xFF
  };
}
function lighten(value, amount) {
  const lab = _color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__.fromXYZ(_color_transformSRGB__WEBPACK_IMPORTED_MODULE_3__.toXYZ(value)); // TODO: why this false positive?
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands

  lab[0] = lab[0] + amount * 10;
  return _color_transformSRGB__WEBPACK_IMPORTED_MODULE_3__.fromXYZ(_color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__.toXYZ(lab));
}
function darken(value, amount) {
  const lab = _color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__.fromXYZ(_color_transformSRGB__WEBPACK_IMPORTED_MODULE_3__.toXYZ(value));
  lab[0] = lab[0] - amount * 10;
  return _color_transformSRGB__WEBPACK_IMPORTED_MODULE_3__.fromXYZ(_color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__.toXYZ(lab));
}
/**
 * Calculate the relative luminance of a given color
 * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */

function getLuma(color) {
  const rgb = colorToInt(color);
  return _color_transformSRGB__WEBPACK_IMPORTED_MODULE_3__.toXYZ(rgb)[1];
}
/**
 * Returns the contrast ratio (1-21) between two colors.
 * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */

function getContrast(first, second) {
  const l1 = getLuma(first);
  const l2 = getLuma(second);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

/***/ }),

/***/ "./src/util/console.ts":
/*!*****************************!*\
  !*** ./src/util/console.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "consoleInfo": () => (/* binding */ consoleInfo),
/* harmony export */   "consoleWarn": () => (/* binding */ consoleWarn),
/* harmony export */   "consoleError": () => (/* binding */ consoleError),
/* harmony export */   "deprecate": () => (/* binding */ deprecate),
/* harmony export */   "breaking": () => (/* binding */ breaking),
/* harmony export */   "removed": () => (/* binding */ removed)
/* harmony export */ });
/* eslint-disable no-console */
// import Vuetify from '../framework'
function createMessage(message, vm, parent) {
  // if (Vuetify.config.silent) return
  if (parent) {
    vm = {
      _isVue: true,
      $parent: parent,
      $options: vm
    };
  }

  if (vm) {
    // Only show each message once per instance
    vm.$_alreadyWarned = vm.$_alreadyWarned || [];
    if (vm.$_alreadyWarned.includes(message)) return;
    vm.$_alreadyWarned.push(message);
  }

  return "[Vuetify] ".concat(message) + (vm ? generateComponentTrace(vm) : '');
}

function consoleInfo(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.info(newMessage);
}
function consoleWarn(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.warn(newMessage);
}
function consoleError(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.error(newMessage);
}
function deprecate(original, replacement, vm, parent) {
  consoleWarn("[UPGRADE] '".concat(original, "' is deprecated, use '").concat(replacement, "' instead."), vm, parent);
}
function breaking(original, replacement, vm, parent) {
  consoleError("[BREAKING] '".concat(original, "' has been removed, use '").concat(replacement, "' instead. For more information, see the upgrade guide https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide"), vm, parent);
}
function removed(original, vm, parent) {
  consoleWarn("[REMOVED] '".concat(original, "' has been removed. You can safely omit it."), vm, parent);
}
/**
 * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
 */

const classifyRE = /(?:^|[-_])(\w)/g;

const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');

function formatComponentName(vm, includeFile) {
  if (vm.$root === vm) {
    return '<Root>';
  }

  const options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
  let name = options.name || options._componentTag;
  const file = options.__file;

  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    name = match == null ? void 0 : match[1];
  }

  return (name ? "<".concat(classify(name), ">") : "<Anonymous>") + (file && includeFile !== false ? " at ".concat(file) : '');
}

function generateComponentTrace(vm) {
  if (vm._isVue && vm.$parent) {
    const tree = [];
    let currentRecursiveSequence = 0;

    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1];

        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++;
          vm = vm.$parent;
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }

      tree.push(vm);
      vm = vm.$parent;
    }

    return '\n\nfound in\n\n' + tree.map((vm, i) => "".concat(i === 0 ? '---> ' : ' '.repeat(5 + i * 2)).concat(Array.isArray(vm) ? "".concat(formatComponentName(vm[0]), "... (").concat(vm[1], " recursive calls)") : formatComponentName(vm))).join('\n');
  } else {
    return "\n\n(found in ".concat(formatComponentName(vm), ")");
  }
}

/***/ }),

/***/ "./src/util/helpers.ts":
/*!*****************************!*\
  !*** ./src/util/helpers.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSimpleFunctional": () => (/* binding */ createSimpleFunctional),
/* harmony export */   "getNestedValue": () => (/* binding */ getNestedValue),
/* harmony export */   "deepEqual": () => (/* binding */ deepEqual),
/* harmony export */   "getObjectValueByPath": () => (/* binding */ getObjectValueByPath),
/* harmony export */   "getPropertyFromItem": () => (/* binding */ getPropertyFromItem),
/* harmony export */   "createRange": () => (/* binding */ createRange),
/* harmony export */   "getZIndex": () => (/* binding */ getZIndex),
/* harmony export */   "escapeHTML": () => (/* binding */ escapeHTML),
/* harmony export */   "filterObjectOnKeys": () => (/* binding */ filterObjectOnKeys),
/* harmony export */   "convertToUnit": () => (/* binding */ convertToUnit),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "keyCodes": () => (/* binding */ keyCodes),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "arrayDiff": () => (/* binding */ arrayDiff),
/* harmony export */   "groupItems": () => (/* binding */ groupItems),
/* harmony export */   "wrapInArray": () => (/* binding */ wrapInArray),
/* harmony export */   "sortItems": () => (/* binding */ sortItems),
/* harmony export */   "defaultFilter": () => (/* binding */ defaultFilter),
/* harmony export */   "searchItems": () => (/* binding */ searchItems),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "throttle": () => (/* binding */ throttle),
/* harmony export */   "getPrefixedSlots": () => (/* binding */ getPrefixedSlots),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "padEnd": () => (/* binding */ padEnd),
/* harmony export */   "chunk": () => (/* binding */ chunk),
/* harmony export */   "humanReadableFileSize": () => (/* binding */ humanReadableFileSize),
/* harmony export */   "camelizeObjectKeys": () => (/* binding */ camelizeObjectKeys),
/* harmony export */   "mergeDeep": () => (/* binding */ mergeDeep),
/* harmony export */   "fillArray": () => (/* binding */ fillArray),
/* harmony export */   "getUid": () => (/* binding */ getUid),
/* harmony export */   "flattenFragments": () => (/* binding */ flattenFragments),
/* harmony export */   "maybeTransition": () => (/* binding */ maybeTransition),
/* harmony export */   "randomHexColor": () => (/* binding */ randomHexColor)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _makeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeProps */ "./src/util/makeProps.ts");



function createSimpleFunctional(klass, tag = 'div', name) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name: name != null ? name : (0,vue__WEBPACK_IMPORTED_MODULE_0__.capitalize)((0,vue__WEBPACK_IMPORTED_MODULE_0__.camelize)(klass.replace(/__/g, '-'))),
    props: (0,_makeProps__WEBPACK_IMPORTED_MODULE_1__.default)((0,_composables_tag__WEBPACK_IMPORTED_MODULE_2__.makeTagProps)({
      tag
    })),

    setup(props, {
      slots
    }) {
      return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(props.tag, {
        class: klass
      }, slots.default == null ? void 0 : slots.default());
    }

  });
}
function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0) return obj === undefined ? fallback : obj;

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }

    obj = obj[path[i]];
  }

  if (obj == null) return fallback;
  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    // If the values are Date, compare them as timestamps
    return false;
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false;
  }

  return props.every(p => deepEqual(a[p], b[p]));
}
function getObjectValueByPath(obj, path, fallback) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback;
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

  path = path.replace(/^\./, ''); // strip a leading dot

  return getNestedValue(obj, path.split('.'), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property == null) return item === undefined ? fallback : item;
  if (item !== Object(item)) return fallback === undefined ? item : fallback;
  if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property)) return getNestedValue(item, property, fallback);
  if (typeof property !== 'function') return fallback;
  const value = property(item, fallback);
  return typeof value === 'undefined' ? fallback : value;
}
function createRange(length, start = 0) {
  return Array.from({
    length
  }, (v, k) => start + k);
}
function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
  const index = +window.getComputedStyle(el).getPropertyValue('z-index');
  if (!index) return getZIndex(el.parentNode);
  return index;
}
const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
function escapeHTML(str) {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag);
}
function filterObjectOnKeys(obj, keys) {
  const filtered = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key];
    }
  }

  return filtered;
}
function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return "".concat(Number(str)).concat(unit);
  }
}
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
} // KeyboardEvent.keyCode aliases

const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
});
function keys(o) {
  return Object.keys(o);
}
/**
 * Returns the set difference of B and A, i.e. the set of elements in B but not in A
 */

function arrayDiff(a, b) {
  const diff = [];

  for (let i = 0; i < b.length; i++) {
    if (!a.includes(b[i])) diff.push(b[i]);
  }

  return diff;
}
function groupItems(items, groupBy, groupDesc) {
  const key = groupBy[0];
  const groups = [];
  let current;

  for (var i = 0; i < items.length; i++) {
    const item = items[i];
    const val = getObjectValueByPath(item, key, null);

    if (current !== val) {
      current = val;
      groups.push({
        name: val != null ? val : '',
        items: []
      });
    }

    groups[groups.length - 1].items.push(item);
  }

  return groups;
}
function wrapInArray(v) {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}
function sortItems(items, sortBy, sortDesc, locale, customSorters) {
  if (sortBy === null || !sortBy.length) return items;
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: 'accent',
    usage: 'sort'
  });
  return items.sort((a, b) => {
    for (let i = 0; i < sortBy.length; i++) {
      const sortKey = sortBy[i];
      let sortA = getObjectValueByPath(a, sortKey);
      let sortB = getObjectValueByPath(b, sortKey);

      if (sortDesc[i]) {
        [sortA, sortB] = [sortB, sortA];
      }

      if (customSorters == null ? void 0 : customSorters[sortKey]) {
        const customResult = customSorters[sortKey](sortA, sortB);
        if (!customResult) continue;
        return customResult;
      } // Check if both cannot be evaluated


      if (sortA === null && sortB === null) {
        continue;
      }

      [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString().toLocaleLowerCase());

      if (sortA !== sortB) {
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }

    return 0;
  });
}
function defaultFilter(value, search, item) {
  return value != null && search != null && typeof value !== 'boolean' && value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
}
function searchItems(items, search) {
  if (!search) return items;
  search = search.toString().toLowerCase();
  if (search.trim() === '') return items;
  return items.filter(item => Object.keys(item).some(key => defaultFilter(getObjectValueByPath(item, key), search, item)));
}
function debounce(fn, delay) {
  let timeoutId = 0;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
function throttle(fn, limit) {
  let throttling = false;
  return (...args) => {
    if (!throttling) {
      throttling = true;
      setTimeout(() => throttling = false, limit);
      return fn(...args);
    }
  };
}
/**
 * Filters slots to only those starting with `prefix`, removing the prefix
 */

function getPrefixedSlots(prefix, slots) {
  return Object.keys(slots).filter(k => k.startsWith(prefix)).reduce((obj, k) => {
    obj[k.replace(prefix, '')] = slots[k];
    return obj;
  }, {});
}
function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}
function padEnd(str, length, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length));
}
function chunk(str, size = 1) {
  const chunked = [];
  let index = 0;

  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }

  return chunked;
}
function humanReadableFileSize(bytes, binary = false) {
  const base = binary ? 1024 : 1000;

  if (bytes < base) {
    return "".concat(bytes, " B");
  }

  const prefix = binary ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;

  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }

  return "".concat(bytes.toFixed(1), " ").concat(prefix[unit], "B");
}
function camelizeObjectKeys(obj) {
  if (!obj) return {};
  return Object.keys(obj).reduce((o, key) => {
    o[(0,vue__WEBPACK_IMPORTED_MODULE_0__.camelize)(key)] = obj[key];
    return o;
  }, {});
}
function mergeDeep(source = {}, target = {}) {
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key]; // Only continue deep merging if
    // both properties are objects

    if (isObject(sourceProperty) && isObject(targetProperty)) {
      source[key] = mergeDeep(sourceProperty, targetProperty);
      continue;
    }

    source[key] = targetProperty;
  }

  return source;
}
function fillArray(length, obj) {
  return Array(length).fill(obj);
}
function getUid() {
  return getUid._uid++;
}
getUid._uid = 0;
function flattenFragments(nodes) {
  return nodes.map(node => {
    if (node.type === vue__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      return flattenFragments(node.children);
    } else {
      return node;
    }
  }).flat();
}
function maybeTransition(props, data, vNodes) {
  if (!props.transition) return vNodes;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
    name: props.transition
  }, data), () => vNodes);
}
const randomHexColor = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

/***/ }),

/***/ "./src/util/makeProps.ts":
/*!*******************************!*\
  !*** ./src/util/makeProps.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ makeProps)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework */ "./src/framework.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./src/util/helpers.ts");
/* harmony import */ var _console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./console */ "./src/util/console.ts");
// Utilities



 // Types

function makeProps(props) {
  for (const key in props) {
    const originalProp = props[key];
    const isOptions = !(originalProp == null || Array.isArray(originalProp) || typeof originalProp === 'function');
    const propDefinition = isOptions ? originalProp : {
      type: originalProp
    };
    const originalDefault = propDefinition.default;
    const wrappedDefault = generateDefault(key, originalDefault, propDefinition.type);
    props[key] = { ...propDefinition,
      default: wrappedDefault
    };
  }

  return props;
}

function generateDefault(propName, localDefault, type) {
  if (localDefault === undefined && (type === Boolean || Array.isArray(type) && type.includes(Boolean))) {
    localDefault = false;
  }

  return props => {
    var _vuetify$defaults$vm$;

    const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();

    if (!vm) {
      (0,_console__WEBPACK_IMPORTED_MODULE_1__.consoleWarn)('Unable to get current component instance when generating default prop value');
      return localDefault;
    }

    if (!vm.type.name) {
      (0,_console__WEBPACK_IMPORTED_MODULE_1__.consoleWarn)('The component is missing an explicit name, unable to generate default prop value');
      return localDefault;
    }

    const vuetify = (0,_framework__WEBPACK_IMPORTED_MODULE_2__.useVuetify)();
    const globalDefault = vuetify.defaults.global[propName];
    const componentDefault = (_vuetify$defaults$vm$ = vuetify.defaults[vm.type.name]) == null ? void 0 : _vuetify$defaults$vm$[propName];
    const actualDefault = typeof componentDefault !== 'undefined' ? componentDefault : typeof globalDefault !== 'undefined' ? globalDefault : localDefault;
    return isFactory(actualDefault, type) ? actualDefault(props) : actualDefault;
  };
} // Would be nice to have PropOptions here


function isFactory(val, type) {
  return typeof val === 'function' && !(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.wrapInArray)(type).includes(Function);
}

/***/ }),

/***/ "./src/util/propsFactory.ts":
/*!**********************************!*\
  !*** ./src/util/propsFactory.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ propsFactory)
/* harmony export */ });
/**
 * Creates a factory function for props definitions.
 * This is used to define props in a composable then override
 * default values in an implementing component.
 *
 * @example Simplified signature
 * (props: Props) => (defaults?: Record<keyof props, any>) => Props
 *
 * @example Usage
 * const makeProps = propsFactory({
 *   foo: String,
 * })
 *
 * defineComponent({
 *   props: {
 *     ...makeProps({
 *       foo: 'a',
 *     }),
 *   },
 *   setup (props) {
 *     // would be "string | undefined", now "string" because a default has been provided
 *     props.foo
 *   },
 * }
 */
function propsFactory(props, source) {
  return defaults => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === 'object' && props[prop] != null && !Array.isArray(props[prop]);
      const definition = isObjectDefinition ? props[prop] : {
        type: props[prop]
      };

      if (defaults && prop in defaults) {
        obj[prop] = { ...definition,
          default: defaults[prop]
        };
      } else {
        obj[prop] = definition;
      }

      if (source) {
        obj[prop].source = source;
      }

      return obj;
    }, {});
  };
}

/***/ }),

/***/ "./src/util/useDirective.ts":
/*!**********************************!*\
  !*** ./src/util/useDirective.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useDirective": () => (/* binding */ useDirective)
/* harmony export */ });
/**
 * Transform DirectiveBinding to DirectiveArguments with strict typing
 */
function useDirective(directive, binding) {
  return [directive, binding.value, binding.arg, binding.modifiers];
}

/***/ }),

/***/ "./src/util/useRender.ts":
/*!*******************************!*\
  !*** ./src/util/useRender.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useRender": () => (/* binding */ useRender)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

function useRender(render) {
  const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
  vm.render = render;
}

/***/ }),

/***/ "./src/components/VApp/VApp.sass":
/*!***************************************!*\
  !*** ./src/components/VApp/VApp.sass ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VAvatar/VAvatar.sass":
/*!*********************************************!*\
  !*** ./src/components/VAvatar/VAvatar.sass ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VBanner/VBanner.sass":
/*!*********************************************!*\
  !*** ./src/components/VBanner/VBanner.sass ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VBtn/VBtn.sass":
/*!***************************************!*\
  !*** ./src/components/VBtn/VBtn.sass ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VDivider/VDivider.sass":
/*!***********************************************!*\
  !*** ./src/components/VDivider/VDivider.sass ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VFooter/VFooter.sass":
/*!*********************************************!*\
  !*** ./src/components/VFooter/VFooter.sass ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VGrid/VGrid.sass":
/*!*****************************************!*\
  !*** ./src/components/VGrid/VGrid.sass ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VIcon/VIcon.sass":
/*!*****************************************!*\
  !*** ./src/components/VIcon/VIcon.sass ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VImg/VImg.sass":
/*!***************************************!*\
  !*** ./src/components/VImg/VImg.sass ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VLayout/VLayout.sass":
/*!*********************************************!*\
  !*** ./src/components/VLayout/VLayout.sass ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VMain/VMain.sass":
/*!*****************************************!*\
  !*** ./src/components/VMain/VMain.sass ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VNavigationDrawer/VNavigationDrawer.sass":
/*!*****************************************************************!*\
  !*** ./src/components/VNavigationDrawer/VNavigationDrawer.sass ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VResponsive/VResponsive.sass":
/*!*****************************************************!*\
  !*** ./src/components/VResponsive/VResponsive.sass ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VSheet/VSheet.sass":
/*!*******************************************!*\
  !*** ./src/components/VSheet/VSheet.sass ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VSystemBar/VSystemBar.sass":
/*!***************************************************!*\
  !*** ./src/components/VSystemBar/VSystemBar.sass ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VThemeProvider/VThemeProvider.sass":
/*!***********************************************************!*\
  !*** ./src/components/VThemeProvider/VThemeProvider.sass ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/directives/ripple/VRipple.sass":
/*!********************************************!*\
  !*** ./src/directives/ripple/VRipple.sass ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/main.sass":
/*!******************************!*\
  !*** ./src/styles/main.sass ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "vue":
/*!******************************************************************************!*\
  !*** external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"} ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/entry-bundler.ts");
/******/ })()
;
});
//# sourceMappingURL=vuetify.js.map