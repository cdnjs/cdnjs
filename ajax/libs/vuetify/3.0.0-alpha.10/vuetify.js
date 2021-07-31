/*!
* Vuetify v3.0.0-alpha.10
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

/***/ "./src/components/VAlert/VAlert.tsx":
/*!******************************************!*\
  !*** ./src/components/VAlert/VAlert.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allowedTypes": () => (/* binding */ allowedTypes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VAlert_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAlert.sass */ "./src/components/VAlert/VAlert.sass");
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../VAvatar */ "./src/components/VAvatar/VAvatar.tsx");
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/VBtn.tsx");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_variant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/variant */ "./src/composables/variant.tsx");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components


 // Composables










 // Utilities


 // Types

const allowedTypes = ['success', 'info', 'warning', 'error'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VAlert',
  props: {
    border: {
      type: [Boolean, String],
      validator: val => {
        return typeof val === 'boolean' || ['top', 'end', 'bottom', 'start'].includes(val);
      }
    },
    borderColor: String,
    closable: Boolean,
    closeIcon: {
      type: String,
      default: '$close'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    icon: {
      type: [Boolean, String],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    prominent: Boolean,
    sticky: Boolean,
    text: String,
    tip: Boolean,
    type: {
      type: String,
      validator: val => allowedTypes.includes(val)
    },
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.makeDensityProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_4__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_5__.makePositionProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_7__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_8__.makeThemeProps)(),
    ...(0,_composables_variant__WEBPACK_IMPORTED_MODULE_9__.makeVariantProps)()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    slots
  }) {
    const borderProps = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
      border: props.border === true || props.tip ? 'start' : props.border
    }));
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_10__.useProxiedModel)(props, 'modelValue');
    const icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$icon;

      if (props.icon === false) return undefined;
      if (!props.type) return props.icon;
      return (_props$icon = props.icon) != null ? _props$icon : `$${props.type}`;
    });
    const variantProps = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$color;

      return {
        color: (_props$color = props.color) != null ? _props$color : props.type,
        textColor: props.textColor,
        variant: props.variant
      };
    });
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_8__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_11__.useBorder)(borderProps.value, 'v-alert');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = (0,_composables_variant__WEBPACK_IMPORTED_MODULE_9__.useVariant)(variantProps, 'v-alert');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.useDensity)(props, 'v-alert');
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_4__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_5__.usePosition)(props, 'v-alert');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.useRounded)(props, 'v-alert');
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_12__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$borderColor;

      return (_props$borderColor = props.borderColor) != null ? _props$borderColor : props.tip ? variantProps.value.color : undefined;
    }));

    function onCloseClick(e) {
      isActive.value = false;
    }

    return () => {
      const hasBorder = !!borderProps.value.border;
      const hasClose = !!(slots.close || props.closable);
      const hasPrepend = !!(slots.prepend || props.icon || props.type);
      const hasText = !!(slots.default || props.text || hasClose);
      return isActive.value && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-alert', {
          [`v-alert--border-${borderProps.value.border}`]: hasBorder,
          'v-alert--prominent': props.prominent,
          'v-alert--tip': props.tip
        }, themeClasses.value, borderClasses.value, !props.tip && colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [!props.tip && colorStyles.value, positionStyles.value],
        "role": "alert"
      }, {
        default: () => [hasBorder && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": ['v-alert__border', textColorClasses.value],
          "style": textColorStyles.value
        }, null, 6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-alert__underlay"
        }, null), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-alert__content"
        }, [hasPrepend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-alert__avatar"
        }, [slots.prepend ? slots.prepend() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_13__.default, {
          "class": props.tip && textColorClasses.value,
          "style": props.tip && textColorStyles.value,
          "density": props.density,
          "icon": icon.value
        }, null, 8, ["class", "style", "density", "icon"])]), hasText && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-alert__text"
        }, [slots.default ? slots.default() : props.text, hasClose && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-alert__close"
        }, [slots.close ? slots.close({
          props: {
            onClick: onCloseClick
          }
        }) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBtn__WEBPACK_IMPORTED_MODULE_14__.default, {
          "density": props.density,
          "icon": props.closeIcon,
          "variant": "text",
          "onClick": onCloseClick
        }, null, 8, ["density", "icon", "onClick"])])])])],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VAlert/index.ts":
/*!****************************************!*\
  !*** ./src/components/VAlert/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VAlert": () => (/* reexport safe */ _VAlert__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VAlert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VAlert */ "./src/components/VAlert/VAlert.tsx");


/***/ }),

/***/ "./src/components/VApp/VApp.tsx":
/*!**************************************!*\
  !*** ./src/components/VApp/VApp.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VApp_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VApp.sass */ "./src/components/VApp/VApp.sass");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _composables_rtl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/rtl */ "./src/composables/rtl.ts");

// Styles
 // Composables


 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VApp',
  props: { ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.makeLayoutProps)({
      fullHeight: true
    }),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_4__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_4__.useTheme)(props);
    const {
      layoutClasses
    } = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.createLayout)(props);
    const {
      rtlClasses
    } = (0,_composables_rtl__WEBPACK_IMPORTED_MODULE_5__.useRtl)();
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": ['v-application', themeClasses.value, layoutClasses.value, rtlClasses.value],
        "data-app": "true"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-application__wrap"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])], 2);
    };
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

/***/ "./src/components/VAppBar/VAppBar.tsx":
/*!********************************************!*\
  !*** ./src/components/VAppBar/VAppBar.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VAppBar_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAppBar.sass */ "./src/components/VAppBar/VAppBar.sass");
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../VImg */ "./src/components/VImg/VImg.tsx");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

// Styles
 // Components

 // Composables








 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VAppBar',
  props: {
    // TODO: Implement scrolling techniques
    // hideOnScroll: Boolean
    // invertedScroll: Boolean
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    collapse: Boolean,
    color: String,
    flat: Boolean,
    height: {
      type: [Number, String],
      default: 64
    },
    extensionHeight: {
      type: [Number, String],
      default: 48
    },
    floating: Boolean,
    image: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    prominent: Boolean,
    prominentHeight: {
      type: [Number, String],
      default: 128
    },
    position: {
      type: String,
      default: 'top',
      validator: value => ['top', 'bottom'].includes(value)
    },
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.makeDensityProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.makeElevationProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.makeRoundedProps)(),
    ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_7__.makeLayoutItemProps)({
      name: 'app-bar'
    }),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)({
      tag: 'header'
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    slots
  }) {
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-app-bar');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.useDensity)(props, 'v-app-bar');
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.useElevation)(props);
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.useRounded)(props, 'v-app-bar');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_9__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const isExtended = !!slots.extension;
    const contentHeight = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => Number(props.prominent ? props.prominentHeight : props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
    const height = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => contentHeight.value + Number(isExtended ? props.extensionHeight : 0));
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_10__.useProxiedModel)(props, 'modelValue', props.modelValue);
    const layoutStyles = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_7__.useLayoutItem)(props.name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'priority'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'position'), height, height, isActive);
    return () => {
      var _slots$img, _slots$default, _slots$extension;

      const hasImage = !!(slots.image || props.image);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-app-bar', {
          'v-app-bar--bottom': props.position === 'bottom',
          'v-app-bar--collapsed': props.collapse,
          'v-app-bar--flat': props.flat,
          'v-app-bar--floating': props.floating,
          'v-app-bar--is-active': isActive.value,
          'v-app-bar--prominent': props.prominent,
          'v-app-bar--absolute': props.absolute
        }, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutStyles.value]
      }, {
        default: () => [hasImage && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-app-bar__image"
        }, [slots.image ? (_slots$img = slots.img) == null ? void 0 : _slots$img.call(slots, {
          src: props.image
        }) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VImg__WEBPACK_IMPORTED_MODULE_11__.default, {
          "src": props.image,
          "cover": true
        }, null, 8, ["src", "cover"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-app-bar__content",
          "style": {
            height: (0,_util__WEBPACK_IMPORTED_MODULE_12__.convertToUnit)(contentHeight.value)
          }
        }, [slots.prepend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-app-bar__prepend"
        }, [slots.prepend()]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.append && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-app-bar__append"
        }, [slots.append()])], 4), isExtended && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-app-bar__extension",
          "style": {
            height: (0,_util__WEBPACK_IMPORTED_MODULE_12__.convertToUnit)(props.extensionHeight)
          }
        }, [(_slots$extension = slots.extension) == null ? void 0 : _slots$extension.call(slots)], 4)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VAppBar/VAppBarNavIcon.tsx":
/*!***************************************************!*\
  !*** ./src/components/VAppBar/VAppBarNavIcon.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/VBtn.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Components
 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VAppBarNavIcon',
  props: {
    icon: {
      type: String,
      default: '$menu'
    }
  },

  setup(props, {
    slots
  }) {
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBtn__WEBPACK_IMPORTED_MODULE_2__.default, {
        "class": "v-app-bar-nav-icon",
        "icon": props.icon
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      }, 8, ["icon"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VAppBar/VAppBarTitle.tsx":
/*!*************************************************!*\
  !*** ./src/components/VAppBar/VAppBarTitle.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VAppBarTitle_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAppBarTitle.sass */ "./src/components/VAppBar/VAppBarTitle.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables

 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VAppBarTitle',
  props: { ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)({
      tag: 'header'
    })
  },

  setup(props, {
    slots
  }) {
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": "v-app-bar-title"
    }, {
      default: () => [slots.default && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-app-bar-title__placeholder"
      }, [slots.default()])]
    });
  }

}));

/***/ }),

/***/ "./src/components/VAppBar/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VAppBar/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VAppBar": () => (/* reexport safe */ _VAppBar__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VAppBarNavIcon": () => (/* reexport safe */ _VAppBarNavIcon__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "VAppBarTitle": () => (/* reexport safe */ _VAppBarTitle__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _VAppBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VAppBar */ "./src/components/VAppBar/VAppBar.tsx");
/* harmony import */ var _VAppBarNavIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAppBarNavIcon */ "./src/components/VAppBar/VAppBarNavIcon.tsx");
/* harmony import */ var _VAppBarTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VAppBarTitle */ "./src/components/VAppBar/VAppBarTitle.tsx");




/***/ }),

/***/ "./src/components/VAvatar/VAvatar.tsx":
/*!********************************************!*\
  !*** ./src/components/VAvatar/VAvatar.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VAvatar_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAvatar.sass */ "./src/components/VAvatar/VAvatar.sass");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../VImg */ "./src/components/VImg/VImg.tsx");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components


 // Composables





 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VAvatar',
  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    icon: String,
    image: String,
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.makeDensityProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_4__.makeRoundedProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_5__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_6__.makeTagProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_7__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.useDensity)(props, 'v-avatar');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_4__.useRounded)(props, 'v-avatar');
    const {
      sizeClasses,
      sizeStyles
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_5__.useSize)(props, 'v-avatar');
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-avatar', {
          'v-avatar--left': props.left,
          'v-avatar--right': props.right
        }, backgroundColorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value],
        "style": [backgroundColorStyles.value, sizeStyles.value]
      }, {
        default: () => [props.image && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VImg__WEBPACK_IMPORTED_MODULE_8__.default, {
          "src": props.image,
          "alt": ""
        }, null, 8, ["src"]), props.icon && !props.image && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_9__.default, {
          "icon": props.icon
        }, null, 8, ["icon"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style"]);
    };
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

/***/ "./src/components/VBadge/VBadge.tsx":
/*!******************************************!*\
  !*** ./src/components/VBadge/VBadge.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBadge_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBadge.sass */ "./src/components/VBadge/VBadge.sass");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/transition */ "./src/composables/transition.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

// Styles
 // Components

 // Composables




 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VBadge',
  inheritAttrs: false,
  props: {
    bordered: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    content: String,
    dot: Boolean,
    floating: Boolean,
    icon: String,
    inline: Boolean,
    label: {
      type: String,
      default: '$vuetify.badge'
    },
    location: {
      type: String,
      default: 'top-right',
      validator: value => {
        const [vertical, horizontal] = (value != null ? value : '').split('-');
        return ['top', 'bottom'].includes(vertical) && ['left', 'right'].includes(horizontal);
      }
    },
    max: [Number, String],
    modelValue: {
      type: Boolean,
      default: true
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_3__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)(),
    ...(0,_composables_transition__WEBPACK_IMPORTED_MODULE_5__.makeTransitionProps)({
      transition: 'scale-rotate-transition'
    })
  },

  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_6__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_3__.useRounded)(props, 'v-badge');
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_6__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'textColor'));
    const position = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
    });

    function calculatePosition(offset) {
      return `calc(100% - ${(0,_util__WEBPACK_IMPORTED_MODULE_7__.convertToUnit)(position.value + parseInt(offset != null ? offset : 0, 10))})`;
    }

    const locationStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$location;

      const [vertical, horizontal] = ((_props$location = props.location) != null ? _props$location : '').split('-'); // TODO: RTL support

      const styles = {
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        top: 'auto'
      };

      if (!props.inline) {
        styles[horizontal === 'left' ? 'right' : 'left'] = calculatePosition(props.offsetX);
        styles[vertical === 'top' ? 'bottom' : 'top'] = calculatePosition(props.offsetY);
      }

      return styles;
    });
    return () => {
      var _ctx$slots$default, _ctx$slots, _ctx$slots$badge, _ctx$slots2;

      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = (0,_util__WEBPACK_IMPORTED_MODULE_7__.extract)(ctx.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
        "class": ['v-badge', {
          'v-badge--bordered': props.bordered,
          'v-badge--dot': props.dot,
          'v-badge--floating': props.floating,
          'v-badge--inline': props.inline
        }]
      }, attrs), {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-badge__wrapper"
        }, [(_ctx$slots$default = (_ctx$slots = ctx.slots).default) == null ? void 0 : _ctx$slots$default.call(_ctx$slots), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_composables_transition__WEBPACK_IMPORTED_MODULE_5__.MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
            "class": ['v-badge__badge', backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
            "style": [backgroundColorStyles.value, locationStyles.value, textColorStyles.value],
            "aria-atomic": "true",
            "aria-label": "locale string here",
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? undefined : ctx.slots.badge ? (_ctx$slots$badge = (_ctx$slots2 = ctx.slots).badge) == null ? void 0 : _ctx$slots$badge.call(_ctx$slots2) : props.icon ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_8__.default, {
            "icon": props.icon
          }, null, 8, ["icon"]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
            "class": "v-badge__content"
          }, [content])], 16), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, props.modelValue]])]
        }, 8, ["transition"])])]
      }, 16, ["class"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VBadge/index.ts":
/*!****************************************!*\
  !*** ./src/components/VBadge/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VBadge": () => (/* reexport safe */ _VBadge__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VBadge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBadge */ "./src/components/VBadge/VBadge.tsx");


/***/ }),

/***/ "./src/components/VBanner/VBanner.tsx":
/*!********************************************!*\
  !*** ./src/components/VBanner/VBanner.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBanner_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBanner.sass */ "./src/components/VBanner/VBanner.sass");
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../VAvatar */ "./src/components/VAvatar/VAvatar.tsx");
/* harmony import */ var _VBannerActions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VBannerActions */ "./src/components/VBanner/VBannerActions.ts");
/* harmony import */ var _VBannerAvatar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./VBannerAvatar */ "./src/components/VBanner/VBannerAvatar.tsx");
/* harmony import */ var _VBannerContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VBannerContent */ "./src/components/VBanner/VBannerContent.ts");
/* harmony import */ var _VBannerText__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./VBannerText */ "./src/components/VBanner/VBannerText.ts");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_display__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/display */ "./src/composables/display.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components





 // Composables










 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VBanner',
  props: {
    avatar: String,
    color: String,
    icon: String,
    lines: {
      type: String,
      default: 'one'
    },
    sticky: Boolean,
    text: String,
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.makeDensityProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.makePositionProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_8__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_9__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_10__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_10__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-banner');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.useDensity)(props, 'v-banner');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.useDimension)(props);
    const {
      mobile
    } = (0,_composables_display__WEBPACK_IMPORTED_MODULE_11__.useDisplay)();
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_7__.usePosition)(props, 'v-banner');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_8__.useRounded)(props, 'v-banner');
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_12__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    return () => {
      var _slots$default;

      const hasAvatar = !!(props.avatar || props.icon || slots.avatar || slots.icon);
      const hasText = !!(props.text || slots.text);
      const hasContent = hasAvatar || hasText || slots.default;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-banner', {
          'v-banner--mobile': mobile.value,
          'v-banner--sticky': props.sticky,
          [`v-banner--${props.lines}-line`]: true
        }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, textColorClasses.value, themeClasses.value],
        "style": [dimensionStyles.value, positionStyles.value, textColorStyles.value],
        "role": "banner"
      }, {
        default: () => [hasContent && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBannerContent__WEBPACK_IMPORTED_MODULE_13__.default, null, {
          default: () => [hasAvatar && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBannerAvatar__WEBPACK_IMPORTED_MODULE_14__.default, null, {
            default: () => [slots.avatar ? slots.avatar() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_15__.default, {
              "density": props.density,
              "icon": props.icon,
              "image": props.avatar
            }, null, 8, ["density", "icon", "image"])]
          }), hasText && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBannerText__WEBPACK_IMPORTED_MODULE_16__.default, null, {
            default: () => [slots.text ? slots.text() : props.text]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
          _: 1
        }), slots.actions && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBannerActions__WEBPACK_IMPORTED_MODULE_17__.default, null, {
          default: slots.actions
        })],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VBanner/VBannerActions.ts":
/*!**************************************************!*\
  !*** ./src/components/VBanner/VBannerActions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-banner-actions'));

/***/ }),

/***/ "./src/components/VBanner/VBannerAvatar.tsx":
/*!**************************************************!*\
  !*** ./src/components/VBanner/VBannerAvatar.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Composables
 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VBannerAvatar',
  props: {
    left: Boolean,
    right: Boolean,
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_2__.makeTagProps)()
  },

  setup(props, {
    slots
  }) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-banner-avatar', {
          'v-banner-avatar--start': props.left,
          'v-banner-avatar--end': props.right
        }]
      }, slots, 8, ["class"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VBanner/VBannerContent.ts":
/*!**************************************************!*\
  !*** ./src/components/VBanner/VBannerContent.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-banner-content'));

/***/ }),

/***/ "./src/components/VBanner/VBannerText.ts":
/*!***********************************************!*\
  !*** ./src/components/VBanner/VBannerText.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-banner-text'));

/***/ }),

/***/ "./src/components/VBanner/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VBanner/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VBanner": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VBannerActions": () => (/* reexport safe */ _VBannerActions__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "VBannerAvatar": () => (/* reexport safe */ _VBannerAvatar__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "VBannerContent": () => (/* reexport safe */ _VBannerContent__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "VBannerText": () => (/* reexport safe */ _VBannerText__WEBPACK_IMPORTED_MODULE_4__.default)
/* harmony export */ });
/* harmony import */ var _VBanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBanner */ "./src/components/VBanner/VBanner.tsx");
/* harmony import */ var _VBannerActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBannerActions */ "./src/components/VBanner/VBannerActions.ts");
/* harmony import */ var _VBannerAvatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VBannerAvatar */ "./src/components/VBanner/VBannerAvatar.tsx");
/* harmony import */ var _VBannerContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VBannerContent */ "./src/components/VBanner/VBannerContent.ts");
/* harmony import */ var _VBannerText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VBannerText */ "./src/components/VBanner/VBannerText.ts");






/***/ }),

/***/ "./src/components/VBottomNavigation/VBottomNavigation.tsx":
/*!****************************************************************!*\
  !*** ./src/components/VBottomNavigation/VBottomNavigation.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBottomNavigation_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBottomNavigation.sass */ "./src/components/VBottomNavigation/VBottomNavigation.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

// Styles
 // Composables









 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VBottomNavigation',
  props: {
    bgColor: String,
    color: String,
    grow: Boolean,
    modelValue: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      validator: v => !v || ['horizontal', 'shift'].includes(v)
    },
    height: {
      type: [Number, String],
      default: 56
    },
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.makeDensityProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.makeElevationProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.makeRoundedProps)(),
    ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_7__.makeLayoutItemProps)({
      name: 'bottom-navigation'
    }),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)({
      tag: 'header'
    }),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.makeThemeProps)()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-bottom-navigation');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_10__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.bgColor));
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_10__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.color));
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.useDensity)(props, 'v-bottom-navigation');
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.useElevation)(props);
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.useRounded)(props, 'v-bottom-navigation');
    const height = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => Number(props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_11__.useProxiedModel)(props, 'modelValue', props.modelValue);
    const layoutStyles = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_7__.useLayoutItem)(props.name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.priority), (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => 'bottom'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => isActive.value ? height.value : 0), height, isActive);
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-bottom-navigation', {
          'v-bottom-navigation--grow': props.grow,
          'v-bottom-navigation--horizontal': props.mode === 'horizontal',
          'v-bottom-navigation--is-active': isActive.value,
          'v-bottom-navigation--shift': props.mode === 'shift',
          'v-bottom-navigation--absolute': props.absolute
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, textColorClasses.value],
        "style": [backgroundColorStyles.value, layoutStyles.value, textColorStyles.value, {
          height: (0,_util__WEBPACK_IMPORTED_MODULE_12__.convertToUnit)(height.value),
          transform: `translateY(${(0,_util__WEBPACK_IMPORTED_MODULE_12__.convertToUnit)(!isActive.value ? 100 : 0, '%')})`
        }]
      }, {
        default: () => [slots.default && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-bottom-navigation__content"
        }, [slots.default()])]
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VBottomNavigation/index.ts":
/*!***************************************************!*\
  !*** ./src/components/VBottomNavigation/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VBottomNavigation": () => (/* reexport safe */ _VBottomNavigation__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VBottomNavigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBottomNavigation */ "./src/components/VBottomNavigation/VBottomNavigation.tsx");


/***/ }),

/***/ "./src/components/VBreadcrumbs/VBreadcrumbs.tsx":
/*!******************************************************!*\
  !*** ./src/components/VBreadcrumbs/VBreadcrumbs.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBreadcrumbs_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBreadcrumbs.sass */ "./src/components/VBreadcrumbs/VBreadcrumbs.sass");
/* harmony import */ var _VBreadcrumbsItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VBreadcrumbsItem */ "./src/components/VBreadcrumbs/VBreadcrumbsItem.tsx");
/* harmony import */ var _VBreadcrumbsDivider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./VBreadcrumbsDivider */ "./src/components/VBreadcrumbs/VBreadcrumbsDivider.tsx");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared */ "./src/components/VBreadcrumbs/shared.ts");

// Styles
 // Components



 // Composables




 // Utilities



 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VBreadcrumbs',
  props: {
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: '/'
    },
    icon: String,
    items: {
      type: Array,
      default: () => []
    },
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.makeDensityProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_4__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_5__.makeTagProps)({
      tag: 'ul'
    })
  },

  setup(props, {
    slots
  }) {
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.useDensity)(props, 'v-breadcrumbs');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_4__.useRounded)(props, 'v-breadcrumbs');
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_6__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return props.items.map((item, index, array) => ({
        props: {
          disabled: index >= array.length - 1,
          ...(typeof item === 'string' ? {
            text: item
          } : item)
        }
      }));
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(_shared__WEBPACK_IMPORTED_MODULE_7__.VBreadcrumbsSymbol, {
      color: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'),
      disabled: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'disabled')
    });
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-breadcrumbs', densityClasses.value, roundedClasses.value, textColorClasses.value],
        "style": [textColorStyles.value]
      }, {
        default: () => [props.icon && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_8__.default, {
          "icon": props.icon,
          "left": true
        }, null, 8, ["icon", "left"]), items.value.map((item, index) => {
          var _slots$item;

          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBreadcrumbsItem__WEBPACK_IMPORTED_MODULE_9__.default, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
            "key": index
          }, item.props), {
            default: () => [(_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, { ...item,
              index
            })]
          }, 16), index < props.items.length - 1 && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBreadcrumbsDivider__WEBPACK_IMPORTED_MODULE_10__.default, null, {
            default: () => [slots.divider ? slots.divider({ ...item,
              index
            }) : props.divider]
          })]);
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VBreadcrumbs/VBreadcrumbsDivider.tsx":
/*!*************************************************************!*\
  !*** ./src/components/VBreadcrumbs/VBreadcrumbsDivider.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-breadcrumbs-divider', 'li'));

/***/ }),

/***/ "./src/components/VBreadcrumbs/VBreadcrumbsItem.tsx":
/*!**********************************************************!*\
  !*** ./src/components/VBreadcrumbs/VBreadcrumbsItem.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/router */ "./src/composables/router.tsx");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared */ "./src/components/VBreadcrumbs/shared.ts");

// Composables


 // Utilities




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VBreadcrumbsItem',
  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    text: String,
    ...(0,_composables_router__WEBPACK_IMPORTED_MODULE_2__.makeRouterProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)({
      tag: 'li'
    })
  },

  setup(props, {
    slots,
    attrs
  }) {
    const breadcrumbs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(_shared__WEBPACK_IMPORTED_MODULE_4__.VBreadcrumbsSymbol);
    if (!breadcrumbs) throw new Error('[Vuetify] Could not find v-breadcrumbs provider');
    const link = (0,_composables_router__WEBPACK_IMPORTED_MODULE_2__.useLink)(props, attrs);
    const isActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _link$isExactActive;

      return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value);
    });
    const color = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$activeColor;

      if (isActive.value) return (_props$activeColor = props.activeColor) != null ? _props$activeColor : breadcrumbs.color.value;
      return props.color;
    });
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_5__.useTextColor)(color);
    return () => {
      var _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(Tag, {
        "class": ['v-breadcrumbs-item', {
          'v-breadcrumbs-item--active': isActive.value,
          'v-breadcrumbs-item--disabled': props.disabled || breadcrumbs.disabled.value,
          'v-breadcrumbs-item--link': link.isLink.value,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value],
        "style": [textColorStyles.value],
        "aria-current": isActive.value ? 'page' : undefined,
        "onClick": isActive.value && link.navigate
      }, {
        default: () => [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style", "aria-current", "onClick"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VBreadcrumbs/index.ts":
/*!**********************************************!*\
  !*** ./src/components/VBreadcrumbs/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VBreadcrumbs": () => (/* reexport safe */ _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VBreadcrumbsItem": () => (/* reexport safe */ _VBreadcrumbsItem__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "VBreadcrumbsDivider": () => (/* reexport safe */ _VBreadcrumbsDivider__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBreadcrumbs */ "./src/components/VBreadcrumbs/VBreadcrumbs.tsx");
/* harmony import */ var _VBreadcrumbsItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBreadcrumbsItem */ "./src/components/VBreadcrumbs/VBreadcrumbsItem.tsx");
/* harmony import */ var _VBreadcrumbsDivider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VBreadcrumbsDivider */ "./src/components/VBreadcrumbs/VBreadcrumbsDivider.tsx");




/***/ }),

/***/ "./src/components/VBreadcrumbs/shared.ts":
/*!***********************************************!*\
  !*** ./src/components/VBreadcrumbs/shared.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VBreadcrumbsSymbol": () => (/* binding */ VBreadcrumbsSymbol)
/* harmony export */ });
const VBreadcrumbsSymbol = Symbol.for('vuetify:breadcrumbs');

/***/ }),

/***/ "./src/components/VBtn/VBtn.tsx":
/*!**************************************!*\
  !*** ./src/components/VBtn/VBtn.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBtn_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBtn.sass */ "./src/components/VBtn/VBtn.sass");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/router */ "./src/composables/router.tsx");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_variant__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../composables/variant */ "./src/composables/variant.tsx");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components

 // Composables











 // Directives

 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VBtn',
  directives: {
    Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_3__.Ripple
  },
  props: {
    flat: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    appendIcon: String,
    block: Boolean,
    stacked: Boolean,
    disabled: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_4__.makeBorderProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_5__.makeRoundedProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_6__.makeDensityProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_7__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_8__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_9__.makePositionProps)(),
    ...(0,_composables_router__WEBPACK_IMPORTED_MODULE_10__.makeRouterProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_11__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_12__.makeTagProps)({
      tag: 'button'
    }),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_13__.makeThemeProps)(),
    ...(0,_composables_variant__WEBPACK_IMPORTED_MODULE_14__.makeVariantProps)({
      variant: 'contained'
    })
  },

  setup(props, {
    attrs,
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_13__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_4__.useBorder)(props, 'v-btn');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = (0,_composables_variant__WEBPACK_IMPORTED_MODULE_14__.useVariant)(props, 'v-btn');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_6__.useDensity)(props, 'v-btn');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_7__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_8__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_9__.usePosition)(props, 'v-btn');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_5__.useRounded)(props, 'v-btn');
    const {
      sizeClasses
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_11__.useSize)(props, 'v-btn');
    const link = (0,_composables_router__WEBPACK_IMPORTED_MODULE_10__.useLink)(props, attrs);
    const isElevated = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return props.variant === 'contained' && !(props.disabled || props.flat || props.border);
    });
    return () => {
      var _link$isExactActive, _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(Tag, {
        "type": Tag === 'a' ? undefined : 'button',
        "class": ['v-btn', {
          'v-btn--active': (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value,
          'v-btn--block': props.block,
          'v-btn--disabled': props.disabled,
          'v-btn--elevated': isElevated.value,
          'v-btn--icon': !!props.icon,
          'v-btn--stacked': props.stacked
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
        "disabled": props.disabled || undefined,
        "href": link.href.value,
        "onClick": props.disabled || link.navigate
      }, {
        default: () => [(0,_composables_variant__WEBPACK_IMPORTED_MODULE_14__.genOverlays)(true, 'v-btn'), !props.icon && props.prependIcon && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_15__.default, {
          "class": "v-btn__icon",
          "icon": props.prependIcon,
          "left": !props.stacked
        }, null, 8, ["icon", "left"]), typeof props.icon === 'boolean' ? (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_15__.default, {
          "class": "v-btn__icon",
          "icon": props.icon,
          "size": props.size
        }, null, 8, ["icon", "size"]), !props.icon && props.appendIcon && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_15__.default, {
          "class": "v-btn__icon",
          "icon": props.appendIcon,
          "right": !props.stacked
        }, null, 8, ["icon", "right"])],
        _: 1
      }, 8, ["type", "class", "style", "disabled", "href", "onClick"]), [[(0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("ripple"), !props.disabled && props.ripple, null]]);
    };
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

/***/ "./src/components/VCard/VCard.tsx":
/*!****************************************!*\
  !*** ./src/components/VCard/VCard.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VCard_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VCard.sass */ "./src/components/VCard/VCard.sass");
/* harmony import */ var _VCardActions__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./VCardActions */ "./src/components/VCard/VCardActions.ts");
/* harmony import */ var _VCardAvatar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VCardAvatar */ "./src/components/VCard/VCardAvatar.ts");
/* harmony import */ var _VCardHeader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./VCardHeader */ "./src/components/VCard/VCardHeader.ts");
/* harmony import */ var _VCardHeaderText__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./VCardHeaderText */ "./src/components/VCard/VCardHeaderText.ts");
/* harmony import */ var _VCardImg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./VCardImg */ "./src/components/VCard/VCardImg.ts");
/* harmony import */ var _VCardSubtitle__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./VCardSubtitle */ "./src/components/VCard/VCardSubtitle.ts");
/* harmony import */ var _VCardText__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./VCardText */ "./src/components/VCard/VCardText.ts");
/* harmony import */ var _VCardTitle__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./VCardTitle */ "./src/components/VCard/VCardTitle.ts");
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../VAvatar */ "./src/components/VAvatar/VAvatar.tsx");
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../VImg */ "./src/components/VImg/VImg.tsx");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/router */ "./src/composables/router.tsx");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_variant__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../composables/variant */ "./src/composables/variant.tsx");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components










 // Composables










 // Directives

 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VCard',
  directives: {
    Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_3__.Ripple
  },
  props: {
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    ripple: Boolean,
    subtitle: String,
    text: String,
    title: String,
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_4__.makeThemeProps)(),
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_5__.makeBorderProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_6__.makeDensityProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_7__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_8__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_9__.makePositionProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_10__.makeRoundedProps)(),
    ...(0,_composables_router__WEBPACK_IMPORTED_MODULE_11__.makeRouterProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_12__.makeTagProps)(),
    ...(0,_composables_variant__WEBPACK_IMPORTED_MODULE_13__.makeVariantProps)({
      variant: 'contained'
    })
  },

  setup(props, {
    attrs,
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_4__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_5__.useBorder)(props, 'v-card');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = (0,_composables_variant__WEBPACK_IMPORTED_MODULE_13__.useVariant)(props, 'v-card');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_6__.useDensity)(props, 'v-card');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_7__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_8__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_9__.usePosition)(props, 'v-card');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_10__.useRounded)(props, 'v-card');
    const link = (0,_composables_router__WEBPACK_IMPORTED_MODULE_11__.useLink)(props, attrs);
    return () => {
      var _slots$image, _slots$media, _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasTitle = !!(slots.title || props.title);
      const hasSubtitle = !!(slots.subtitle || props.subtitle);
      const hasHeaderText = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasHeader = hasHeaderText || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text);
      const isClickable = !props.disabled && (link.isClickable.value || props.link);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(Tag, {
        "class": ['v-card', {
          'v-card--disabled': props.disabled,
          'v-card--flat': props.flat,
          'v-card--hover': props.hover && !(props.disabled || props.flat),
          'v-card--link': isClickable
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
        "href": link.href.value,
        "onClick": isClickable && link.navigate
      }, {
        default: () => [(0,_composables_variant__WEBPACK_IMPORTED_MODULE_13__.genOverlays)(isClickable, 'v-card'), hasImage && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardImg__WEBPACK_IMPORTED_MODULE_14__.default, null, {
          default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
            src: props.image
          }) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VImg__WEBPACK_IMPORTED_MODULE_15__.default, {
            "src": props.image,
            "cover": true,
            "alt": ""
          }, null, 8, ["src", "cover"])]
        }), (_slots$media = slots.media) == null ? void 0 : _slots$media.call(slots), hasHeader && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardHeader__WEBPACK_IMPORTED_MODULE_16__.default, null, {
          default: () => [hasPrepend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardAvatar__WEBPACK_IMPORTED_MODULE_17__.default, null, {
            default: () => [slots.prepend ? slots.prepend() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_18__.default, {
              "density": props.density,
              "icon": props.prependIcon,
              "image": props.prependAvatar
            }, null, 8, ["density", "icon", "image"])]
          }), hasHeaderText && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardHeaderText__WEBPACK_IMPORTED_MODULE_19__.default, null, {
            default: () => [hasTitle && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardTitle__WEBPACK_IMPORTED_MODULE_20__.default, null, {
              default: () => [slots.title ? slots.title() : props.title]
            }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardSubtitle__WEBPACK_IMPORTED_MODULE_21__.default, null, {
              default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
            })],
            _: 1
          }), hasAppend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardAvatar__WEBPACK_IMPORTED_MODULE_17__.default, null, {
            default: () => [slots.append ? slots.append() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_18__.default, {
              "density": props.density,
              "icon": props.appendIcon,
              "image": props.appendAvatar
            }, null, 8, ["density", "icon", "image"])]
          })],
          _: 1
        }), hasText && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardText__WEBPACK_IMPORTED_MODULE_22__.default, null, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.actions && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VCardActions__WEBPACK_IMPORTED_MODULE_23__.default, null, {
          default: slots.actions
        })],
        _: 1
      }, 8, ["class", "style", "href", "onClick"]), [[(0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("ripple"), isClickable]]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VCard/VCardActions.ts":
/*!**********************************************!*\
  !*** ./src/components/VCard/VCardActions.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-actions'));

/***/ }),

/***/ "./src/components/VCard/VCardAvatar.ts":
/*!*********************************************!*\
  !*** ./src/components/VCard/VCardAvatar.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-avatar'));

/***/ }),

/***/ "./src/components/VCard/VCardHeader.ts":
/*!*********************************************!*\
  !*** ./src/components/VCard/VCardHeader.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-header'));

/***/ }),

/***/ "./src/components/VCard/VCardHeaderText.ts":
/*!*************************************************!*\
  !*** ./src/components/VCard/VCardHeaderText.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-header-text'));

/***/ }),

/***/ "./src/components/VCard/VCardImg.ts":
/*!******************************************!*\
  !*** ./src/components/VCard/VCardImg.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-img'));

/***/ }),

/***/ "./src/components/VCard/VCardSubtitle.ts":
/*!***********************************************!*\
  !*** ./src/components/VCard/VCardSubtitle.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-subtitle'));

/***/ }),

/***/ "./src/components/VCard/VCardText.ts":
/*!*******************************************!*\
  !*** ./src/components/VCard/VCardText.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-text'));

/***/ }),

/***/ "./src/components/VCard/VCardTitle.ts":
/*!********************************************!*\
  !*** ./src/components/VCard/VCardTitle.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-card-title'));

/***/ }),

/***/ "./src/components/VCard/index.ts":
/*!***************************************!*\
  !*** ./src/components/VCard/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VCard": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VCardActions": () => (/* reexport safe */ _VCardActions__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "VCardAvatar": () => (/* reexport safe */ _VCardAvatar__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "VCardHeader": () => (/* reexport safe */ _VCardHeader__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "VCardHeaderText": () => (/* reexport safe */ _VCardHeaderText__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "VCardImg": () => (/* reexport safe */ _VCardImg__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "VCardItem": () => (/* reexport safe */ _VCardHeaderText__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "VCardSubtitle": () => (/* reexport safe */ _VCardSubtitle__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "VCardText": () => (/* reexport safe */ _VCardText__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "VCardTitle": () => (/* reexport safe */ _VCardTitle__WEBPACK_IMPORTED_MODULE_8__.default)
/* harmony export */ });
/* harmony import */ var _VCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VCard */ "./src/components/VCard/VCard.tsx");
/* harmony import */ var _VCardActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VCardActions */ "./src/components/VCard/VCardActions.ts");
/* harmony import */ var _VCardAvatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VCardAvatar */ "./src/components/VCard/VCardAvatar.ts");
/* harmony import */ var _VCardHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VCardHeader */ "./src/components/VCard/VCardHeader.ts");
/* harmony import */ var _VCardHeaderText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VCardHeaderText */ "./src/components/VCard/VCardHeaderText.ts");
/* harmony import */ var _VCardImg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VCardImg */ "./src/components/VCard/VCardImg.ts");
/* harmony import */ var _VCardSubtitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VCardSubtitle */ "./src/components/VCard/VCardSubtitle.ts");
/* harmony import */ var _VCardText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VCardText */ "./src/components/VCard/VCardText.ts");
/* harmony import */ var _VCardTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VCardTitle */ "./src/components/VCard/VCardTitle.ts");











/***/ }),

/***/ "./src/components/VChip/VChip.tsx":
/*!****************************************!*\
  !*** ./src/components/VChip/VChip.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VChip_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VChip.sass */ "./src/components/VChip/VChip.sass");
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../VAvatar */ "./src/components/VAvatar/VAvatar.tsx");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _composables_variant__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/variant */ "./src/composables/variant.tsx");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/router */ "./src/composables/router.tsx");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components


 // Composables










 // Directives

 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VChip',
  directives: {
    Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_3__.Ripple
  },
  props: {
    activeClass: String,
    appendAvatar: String,
    appendIcon: String,
    closable: Boolean,
    closeIcon: {
      type: String,
      default: '$delete'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    disabled: Boolean,
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$complete'
    },
    label: Boolean,
    link: Boolean,
    pill: Boolean,
    prependAvatar: String,
    prependIcon: String,
    ripple: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_4__.makeBorderProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_5__.makeDensityProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.makeElevationProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.makeRoundedProps)(),
    ...(0,_composables_router__WEBPACK_IMPORTED_MODULE_8__.makeRouterProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_9__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_10__.makeTagProps)({
      tag: 'span'
    }),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_11__.makeThemeProps)(),
    ...(0,_composables_variant__WEBPACK_IMPORTED_MODULE_12__.makeVariantProps)({
      variant: 'contained'
    })
  },
  emits: {
    'click:close': e => e,
    'update:active': value => value
  },

  setup(props, {
    attrs,
    emit,
    slots
  }) {
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_13__.useProxiedModel)(props, 'modelValue');
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_11__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_4__.useBorder)(props, 'v-chip');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = (0,_composables_variant__WEBPACK_IMPORTED_MODULE_12__.useVariant)(props, 'v-chip');
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.useElevation)(props);
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.useRounded)(props, 'v-chip');
    const {
      sizeClasses
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_9__.useSize)(props, 'v-chip');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_5__.useDensity)(props, 'v-chip');
    const link = (0,_composables_router__WEBPACK_IMPORTED_MODULE_8__.useLink)(props, attrs);

    function onCloseClick(e) {
      isActive.value = false;
      emit('click:close', e);
    }

    return () => {
      var _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasAppend = !!(slots.append || props.appendIcon || props.appendAvatar);
      const hasClose = !!(slots.close || props.closable);
      const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar);
      const isClickable = !props.disabled && (link.isClickable.value || props.link);
      return isActive.value && (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(Tag, {
        "class": ['v-chip', {
          'v-chip--disabled': props.disabled,
          'v-chip--label': props.label,
          'v-chip--link': isClickable,
          'v-chip--pill': props.pill
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [colorStyles.value],
        "disabled": props.disabled || undefined,
        "draggable": props.draggable,
        "href": link.href.value,
        "onClick": isClickable && link.navigate
      }, {
        default: () => [(0,_composables_variant__WEBPACK_IMPORTED_MODULE_12__.genOverlays)(isClickable, 'v-chip'), hasPrepend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-chip__prepend"
        }, [slots.prepend ? slots.prepend() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_14__.default, {
          "icon": props.prependIcon,
          "image": props.prependAvatar,
          "size": props.size
        }, null, 8, ["icon", "image", "size"])]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), hasAppend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-chip__append"
        }, [slots.append ? slots.append() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_14__.default, {
          "icon": props.appendIcon,
          "image": props.appendAvatar,
          "size": props.size
        }, null, 8, ["icon", "image", "size"])]), hasClose && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-chip__close",
          "onClick": onCloseClick
        }, [slots.close ? slots.close({
          props: {
            onClick: onCloseClick
          }
        }) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_15__.default, {
          "icon": props.closeIcon,
          "size": "x-small"
        }, null, 8, ["icon"])], 8, ["onClick"])],
        _: 1
      }, 8, ["class", "style", "disabled", "draggable", "href", "onClick"]), [[(0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("ripple"), isClickable && props.ripple, null]]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VChip/index.ts":
/*!***************************************!*\
  !*** ./src/components/VChip/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VChip": () => (/* reexport safe */ _VChip__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VChip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VChip */ "./src/components/VChip/VChip.tsx");


/***/ }),

/***/ "./src/components/VCode/index.ts":
/*!***************************************!*\
  !*** ./src/components/VCode/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VCode": () => (/* binding */ VCode)
/* harmony export */ });
/* harmony import */ var _VCode_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VCode.sass */ "./src/components/VCode/VCode.sass");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");


const VCode = (0,_util__WEBPACK_IMPORTED_MODULE_1__.createSimpleFunctional)('v-code');

/***/ }),

/***/ "./src/components/VDefaultsProvider/VDefaultsProvider.tsx":
/*!****************************************************************!*\
  !*** ./src/components/VDefaultsProvider/VDefaultsProvider.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _composables_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../composables/defaults */ "./src/composables/defaults.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  props: {
    defaults: Object
  },

  setup(props, {
    slots
  }) {
    (0,_composables_defaults__WEBPACK_IMPORTED_MODULE_1__.provideDefaults)(props);
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    };
  }

}));

/***/ }),

/***/ "./src/components/VDefaultsProvider/index.ts":
/*!***************************************************!*\
  !*** ./src/components/VDefaultsProvider/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VDefaultsProvider": () => (/* reexport safe */ _VDefaultsProvider__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VDefaultsProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDefaultsProvider */ "./src/components/VDefaultsProvider/VDefaultsProvider.tsx");


/***/ }),

/***/ "./src/components/VDialog/VDialog.tsx":
/*!********************************************!*\
  !*** ./src/components/VDialog/VDialog.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VDialog_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VDialog.sass */ "./src/components/VDialog/VDialog.sass");
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/dialog-transition.tsx");
/* harmony import */ var _VOverlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../VOverlay */ "./src/components/VOverlay/VOverlay.tsx");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/transition */ "./src/composables/transition.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util */ "./src/util/globals.ts");

// Styles
 // Components


 // Composables



 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VDialog',
  props: {
    fullscreen: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    modelValue: Boolean,
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.makeDimensionProps)({
      width: 'auto'
    }),
    ...(0,_composables_transition__WEBPACK_IMPORTED_MODULE_4__.makeTransitionProps)({
      transition: {
        component: _transitions__WEBPACK_IMPORTED_MODULE_5__.default
      }
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    attrs,
    slots
  }) {
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_6__.useProxiedModel)(props, 'modelValue');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.useDimension)(props);
    const overlay = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();

    function onFocusin(e) {
      var _overlay$value;

      const before = e.relatedTarget;
      const after = e.target;

      if (before !== after && (_overlay$value = overlay.value) != null && _overlay$value.content && // It isn't the document or the dialog body
      ![document, overlay.value.content].includes(after) && // It isn't inside the dialog body
      !overlay.value.content.contains(after) // We're the topmost dialog
      // TODO: this.activeZIndex >= this.getMaxZIndex() &&
      // It isn't inside a dependent element (like a menu)
      // TODO: !this.getOpenDependentElements().some(el => el.contains(target))
      // So we must have focused something outside the dialog and its children
      ) {
          const focusable = [...overlay.value.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
          if (!focusable.length) return;
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];

          if (before === firstElement) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }
        }
    }

    if (_util__WEBPACK_IMPORTED_MODULE_7__.IN_BROWSER) {
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => isActive.value && props.retainFocus, val => {
        val ? document.addEventListener('focusin', onFocusin) : document.removeEventListener('focusin', onFocusin);
      }, {
        immediate: true
      });
    }

    const activatorElement = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();

    const activator = ({
      props,
      ...data
    }) => {
      var _slots$activator;

      return (_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, { ...data,
        props: (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)(props, {
          'aria-haspopup': 'dialog',
          onClick: e => {
            activatorElement.value = e.currentTarget;
          }
        })
      });
    };

    return () => {
      const transition = (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
        target: activatorElement.value
      }, typeof props.transition === 'string' ? {
        name: props.transition
      } : props.transition);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VOverlay__WEBPACK_IMPORTED_MODULE_8__.default, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-dialog', {
          'v-dialog--fullscreen': props.fullscreen
        }],
        "style": dimensionStyles.value,
        "transition": transition,
        "ref": overlay,
        "aria-role": "dialog",
        "aria-modal": "true"
      }, attrs), {
        default: slots.default,
        activator
      }, 16, ["modelValue", "onUpdate:modelValue", "class", "style", "transition"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VDialog/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VDialog/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VDialog": () => (/* reexport safe */ _VDialog__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDialog */ "./src/components/VDialog/VDialog.tsx");



/***/ }),

/***/ "./src/components/VDivider/VDivider.tsx":
/*!**********************************************!*\
  !*** ./src/components/VDivider/VDivider.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VDivider_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VDivider.sass */ "./src/components/VDivider/VDivider.sass");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");

// Styles
 // Utilities


 // Composables

 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VDivider',
  props: {
    inset: Boolean,
    length: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.makeThemeProps)()
  },

  setup(props, {
    attrs
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.useTheme)(props);
    const dividerStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const styles = {};

      if (props.length) {
        styles[props.vertical ? 'maxHeight' : 'maxWidth'] = (0,_util__WEBPACK_IMPORTED_MODULE_4__.convertToUnit)(props.length);
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = (0,_util__WEBPACK_IMPORTED_MODULE_4__.convertToUnit)(props.thickness);
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
        "role": `${attrs.role || 'separator'}`
      }, null, 14, ["aria-orientation"]);
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VFooter_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VFooter.sass */ "./src/components/VFooter/VFooter.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables







 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VFooter',
  props: { ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_4__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_6__.makePositionProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)({
      tag: 'footer'
    }),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-footer');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_4__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_6__.usePosition)(props, 'v-footer');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.useRounded)(props, 'v-footer');
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-footer', themeClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [dimensionStyles.value, positionStyles.value]
    }, slots, 8, ["class", "style"]);
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VGrid.sass */ "./src/components/VGrid/VGrid.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
// Styles
 // Composables

 // Utilities


 // Types

const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']; // no xs

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
    className += `-${breakpoint}`;
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


  className += `-${val}`;
  return className.toLowerCase();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VCol',
  props: {
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
  },

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
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_1__.h)(props.tag, {
        class: classes.value
      }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }

}));

/***/ }),

/***/ "./src/components/VGrid/VContainer.tsx":
/*!*********************************************!*\
  !*** ./src/components/VGrid/VContainer.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VGrid_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VGrid.sass */ "./src/components/VGrid/VGrid.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables

 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VContainer',
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)()
  },

  setup(props, {
    slots
  }) {
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-container', {
        'v-container--fluid': props.fluid
      }]
    }, slots, 8, ["class"]);
  }

}));

/***/ }),

/***/ "./src/components/VGrid/VRow.ts":
/*!**************************************!*\
  !*** ./src/components/VGrid/VRow.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VGrid.sass */ "./src/components/VGrid/VGrid.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
// Styles
 // Composables

 // Utilities


 // Types

const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']; // no xs

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
    className += `-${breakpoint}`;
  } // .align-items-sm-center


  className += `-${val}`;
  return className.toLowerCase();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VRow',
  props: {
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
  },

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
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_1__.h)(props.tag, {
        class: ['v-row', classes.value]
      }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }

}));

/***/ }),

/***/ "./src/components/VGrid/VSpacer.ts":
/*!*****************************************!*\
  !*** ./src/components/VGrid/VSpacer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('flex-grow-1', 'div', 'VSpacer'));

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

/***/ "./src/components/VHover/VHover.tsx":
/*!******************************************!*\
  !*** ./src/components/VHover/VHover.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _composables_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../composables/delay */ "./src/composables/delay.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
// Composables

 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VHover',
  props: {
    disabled: Boolean,
    modelValue: {
      type: Boolean,
      default: undefined
    },
    ...(0,_composables_delay__WEBPACK_IMPORTED_MODULE_1__.makeDelayProps)()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    slots
  }) {
    const hover = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_2__.useProxiedModel)(props, 'modelValue');
    const {
      runOpenDelay,
      runCloseDelay
    } = (0,_composables_delay__WEBPACK_IMPORTED_MODULE_1__.useDelay)(props, value => !props.disabled && (hover.value = value));
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        hover: hover.value,
        props: {
          onMouseenter: runOpenDelay,
          onMouseleave: runCloseDelay
        }
      });
    };
  }

}));

/***/ }),

/***/ "./src/components/VHover/index.ts":
/*!****************************************!*\
  !*** ./src/components/VHover/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VHover": () => (/* reexport safe */ _VHover__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VHover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VHover */ "./src/components/VHover/VHover.tsx");


/***/ }),

/***/ "./src/components/VIcon/VIcon.tsx":
/*!****************************************!*\
  !*** ./src/components/VIcon/VIcon.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VIcon.sass */ "./src/components/VIcon/VIcon.sass");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/icons */ "./src/composables/icons.tsx");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

// Styles
 // Composables




 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VIcon',
  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    icon: {
      type: [String, Object]
    },
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_3__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)({
      tag: 'i'
    })
  },

  setup(props, {
    slots
  }) {
    let slotIcon;

    if (slots.default) {
      slotIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
        var _slots$default, _flattenFragments$fil;

        const slot = (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VImg_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VImg.sass */ "./src/components/VImg/VImg.sass");
/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../VResponsive */ "./src/components/VResponsive/VResponsive.tsx");
/* harmony import */ var _directives_intersect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/intersect */ "./src/directives/intersect/index.ts");
/* harmony import */ var _composables_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/transition */ "./src/composables/transition.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util */ "./src/util/globals.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util */ "./src/util/useRender.ts");

 // Components

 // Directives

 // Composables

 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VImg',
  directives: {
    intersect: _directives_intersect__WEBPACK_IMPORTED_MODULE_3__.default
  },
  props: {
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
    ...(0,_composables_transition__WEBPACK_IMPORTED_MODULE_4__.makeTransitionProps)()
  },
  emits: ['loadstart', 'load', 'error'],

  setup(props, {
    emit,
    slots
  }) {
    const currentSrc = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(''); // Set from srcset

    const image = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const state = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.eager ? 'loading' : 'idle');
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
      if (props.eager && isIntersecting) return;
      if (_util__WEBPACK_IMPORTED_MODULE_5__.SUPPORTS_INTERSECTION && !isIntersecting && !props.eager) return;
      state.value = 'loading';
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        var _image$value, _image$value2;

        emit('loadstart', ((_image$value = image.value) == null ? void 0 : _image$value.currentSrc) || normalisedSrc.value.src);

        if ((_image$value2 = image.value) != null && _image$value2.complete) {
          if (!image.value.naturalWidth) {
            onError();
          }

          if (state.value === 'error') return;
          if (!aspectRatio.value) pollForSize(image.value, null);
          onLoad();
        } else {
          if (!aspectRatio.value) pollForSize(image.value);
          getSrc();
        }
      });

      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
    }

    function onLoad() {
      var _image$value3;

      getSrc();
      state.value = 'loaded';
      emit('load', ((_image$value3 = image.value) == null ? void 0 : _image$value3.currentSrc) || normalisedSrc.value.src);
    }

    function onError() {
      var _image$value4;

      state.value = 'error';
      emit('error', ((_image$value4 = image.value) == null ? void 0 : _image$value4.currentSrc) || normalisedSrc.value.src);
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
      var _slots$sources;

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
      const sources = (_slots$sources = slots.sources) == null ? void 0 : _slots$sources.call(slots);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_composables_transition__WEBPACK_IMPORTED_MODULE_4__.MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(sources ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, state.value === 'loaded']])],
        _: 2
      }, 8, ["transition", "appear"]);
    });

    const __preloadImage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_composables_transition__WEBPACK_IMPORTED_MODULE_4__.MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== 'loaded' && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
        "class": ['v-img__img', 'v-img__img--preload', containClasses.value],
        "src": normalisedSrc.value.lazySrc,
        "alt": ""
      }, null, 10, ["src"])]
    }, 8, ["transition"]));

    const __placeholder = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!slots.placeholder) return;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_composables_transition__WEBPACK_IMPORTED_MODULE_4__.MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === 'loading' || state.value === 'error' && !slots.error) && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      }, 8, ["transition", "appear"]);
    });

    const __error = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!slots.error) return;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_composables_transition__WEBPACK_IMPORTED_MODULE_4__.MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === 'error' && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      }, 8, ["transition", "appear"]);
    });

    (0,_util__WEBPACK_IMPORTED_MODULE_6__.useRender)(() => (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VResponsive__WEBPACK_IMPORTED_MODULE_7__.default, {
      "class": "v-img",
      "aspectRatio": aspectRatio.value,
      "aria-label": props.alt,
      "role": props.alt ? 'img' : undefined
    }, {
      additional: () => [__image.value, __preloadImage.value, __placeholder.value, __error.value],
      default: slots.default
    }, 8, ["aspectRatio", "aria-label", "role"]), [[(0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("intersect"), {
      handler: init,
      options: props.options
    }, null, {
      once: true
    }]]));
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

/***/ "./src/components/VInput/VInput.tsx":
/*!******************************************!*\
  !*** ./src/components/VInput/VInput.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VInput_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VInput.sass */ "./src/components/VInput/VInput.sass");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _VInputLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./VInputLabel */ "./src/components/VInput/VInputLabel.tsx");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util */ "./src/util/animation.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util */ "./src/util/easing.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util */ "./src/util/useRender.ts");

// Styles
 // Components


 // Composables




 // Utilities


 // Types

const allowedVariants = ['underlined', 'outlined', 'filled', 'contained', 'plain'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VInput',
  inheritAttrs: false,
  props: {
    active: Boolean,
    appendIcon: String,
    appendOuterIcon: String,
    bgColor: String,
    color: String,
    hideDetails: [Boolean, String],
    hideSpinButtons: Boolean,
    hint: String,
    id: String,
    label: String,
    loading: Boolean,
    modelValue: null,
    persistentHint: Boolean,
    prependIcon: String,
    prependOuterIcon: String,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String,
      default: 'filled',
      validator: v => allowedVariants.includes(v)
    },
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.makeThemeProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.makeDensityProps)()
  },
  emits: {
    'update:modelValue': value => true,
    'update:active': value => true,
    'click:prepend-outer': e => e,
    'click:prepend': e => e,
    'click:append': e => e,
    'click:append-outer': e => e
  },

  setup(props, {
    attrs,
    emit,
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.useTheme)(props);
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.useDensity)(props, 'v-input');
    const value = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_5__.useProxiedModel)(props, 'modelValue');
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_5__.useProxiedModel)(props, 'active');
    const uid = (0,_util__WEBPACK_IMPORTED_MODULE_6__.getUid)();
    const labelRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const floatingLabelRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const controlRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const fieldRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const inputRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const isDirty = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => value.value != null && value.value !== '');
    const isFocused = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const id = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.id || `input-${uid}`);
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect)(() => isActive.value = isFocused.value || isDirty.value);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_7__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'bgColor'));
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_7__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return isFocused.value ? props.color : undefined;
    }));
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(isActive, val => {
      if (!props.singleLine) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        const rect = (0,_util__WEBPACK_IMPORTED_MODULE_8__.nullifyTransforms)(el);
        const targetRect = targetEl.getBoundingClientRect();
        const x = targetRect.x - rect.x;
        const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
        const targetWidth = targetRect.width / 0.75;
        const width = Math.abs(targetWidth - rect.width) > 1 ? {
          maxWidth: (0,_util__WEBPACK_IMPORTED_MODULE_6__.convertToUnit)(targetWidth)
        } : undefined;
        const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000;
        const scale = parseFloat(getComputedStyle(targetEl).getPropertyValue('--v-input-label-scale'));
        el.style.visibility = 'visible';
        targetEl.style.visibility = 'hidden';
        el.animate([{
          transform: 'translate(0)'
        }, {
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          ...width
        }], {
          duration,
          easing: _util__WEBPACK_IMPORTED_MODULE_9__.standardEasing,
          direction: val ? 'normal' : 'reverse'
        }).finished.then(() => {
          el.style.removeProperty('visibility');
          targetEl.style.removeProperty('visibility');
        });
      }
    }, {
      flush: 'post'
    });

    function onMousedown(e) {
      if (e.target !== document.activeElement) {
        e.preventDefault();
      }

      focus();
    }

    function focus() {
      var _inputRef$value;

      (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
    }

    function blur() {
      var _inputRef$value2;

      (_inputRef$value2 = inputRef.value) == null ? void 0 : _inputRef$value2.blur();
    }

    (0,_util__WEBPACK_IMPORTED_MODULE_10__.useRender)(() => {
      var _slots$default;

      const isOutlined = props.variant === 'outlined';
      const hasPrepend = slots.prepend || props.prependIcon;
      const hasPrependOuter = slots.prependOuter || props.prependOuterIcon;
      const hasAppend = slots.append || props.appendIcon;
      const hasAppendOuter = slots.appendOuter || props.appendOuterIcon;
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
        "class": ['v-input', {
          'v-input--prepended': hasPrepend,
          'v-input--appended': hasAppend,
          'v-input--dirty': isActive.value,
          'v-input--focused': isFocused.value,
          'v-input--reverse': props.reverse,
          'v-input--has-background': !!props.bgColor,
          'v-input--single-line': props.singleLine,
          [`v-input--variant-${props.variant}`]: true
        }, themeClasses.value, densityClasses.value, textColorClasses.value],
        "style": [textColorStyles.value]
      }, attrs), [hasPrependOuter && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__prepend-outer",
        "onClick": e => emit('click:prepend-outer', e)
      }, [slots.prependOuter ? slots.prependOuter() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_11__.default, {
        "icon": props.prependOuterIcon
      }, null, 8, ["icon"])], 8, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "ref": controlRef,
        "class": ['v-input__control', backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "onMousedown": onMousedown
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__overlay"
      }, null), hasPrepend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__prepend",
        "onClick": e => emit('click:prepend', e)
      }, [slots.prepend ? slots.prepend() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_11__.default, {
        "icon": props.prependIcon
      }, null, 8, ["icon"])], 8, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__field",
        "ref": fieldRef
      }, [['contained', 'filled'].includes(props.variant) && !props.singleLine && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VInputLabel__WEBPACK_IMPORTED_MODULE_12__.default, {
        "ref": floatingLabelRef,
        "floating": true
      }, {
        default: () => [label],
        _: 2
      }, 8, ["floating"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VInputLabel__WEBPACK_IMPORTED_MODULE_12__.default, {
        "ref": labelRef,
        "for": id.value
      }, {
        default: () => [label],
        _: 2
      }, 8, ["for"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        uid,
        isActive: isActive.value,
        props: {
          id: id.value,
          value: value.value,
          ref: inputRef,
          onFocus: () => isFocused.value = true,
          onBlur: () => isFocused.value = false,
          onInput: e => {
            const el = e.target;
            value.value = el.value;
          },
          onChange: e => {
            const el = e.target;
            if (value.value === el.value) return;
            value.value = el.value;
          }
        }
      })], 512), hasAppend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__append",
        "onClick": e => emit('click:append', e)
      }, [slots.append ? slots.append() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_11__.default, {
        "icon": props.appendIcon
      }, null, 8, ["icon"])], 8, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__outline"
      }, [isOutlined && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__outline__start"
      }, null), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__outline__notch"
      }, [!props.singleLine && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VInputLabel__WEBPACK_IMPORTED_MODULE_12__.default, {
        "ref": floatingLabelRef,
        "floating": true
      }, {
        default: () => [label],
        _: 2
      }, 8, ["floating"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__outline__end"
      }, null)]), ['plain', 'underlined'].includes(props.variant) && !props.singleLine && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VInputLabel__WEBPACK_IMPORTED_MODULE_12__.default, {
        "ref": floatingLabelRef,
        "floating": true
      }, {
        default: () => [label],
        _: 2
      }, 8, ["floating"])])], 46, ["onMousedown"]), hasAppendOuter && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__append-outer",
        "onClick": e => emit('click:append-outer', e)
      }, [slots.appendOuter ? slots.appendOuter() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_11__.default, {
        "icon": props.appendOuterIcon
      }, null, 8, ["icon"])], 8, ["onClick"]), slots.details && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-input__details"
      }, [slots.details()])], 16);
    });
    return {
      blur,
      focus,
      value,
      isActive,
      isDirty,
      isFocused
    };
  }

}));

/***/ }),

/***/ "./src/components/VInput/VInputLabel.tsx":
/*!***********************************************!*\
  !*** ./src/components/VInput/VInputLabel.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");

// Utilities
 // Composables


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VInputLabel',
  props: {
    floating: Boolean,
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_2__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
        "class": ['v-input-label', {
          'v-input-label--floating': props.floating
        }],
        "aria-hidden": props.floating || undefined
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 10, ["aria-hidden"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VInput/index.ts":
/*!****************************************!*\
  !*** ./src/components/VInput/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VInput": () => (/* reexport safe */ _VInput__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VInputLabel": () => (/* reexport safe */ _VInputLabel__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VInput */ "./src/components/VInput/VInput.tsx");
/* harmony import */ var _VInputLabel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VInputLabel */ "./src/components/VInput/VInputLabel.tsx");



/***/ }),

/***/ "./src/components/VItemGroup/VItem.tsx":
/*!*********************************************!*\
  !*** ./src/components/VItemGroup/VItem.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _composables_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../composables/group */ "./src/composables/group.ts");
/* harmony import */ var _VItemGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VItemGroup */ "./src/components/VItemGroup/VItemGroup.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
// Composables

 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VItem',
  props: (0,_composables_group__WEBPACK_IMPORTED_MODULE_1__.makeGroupItemProps)(),

  setup(props, {
    slots
  }) {
    const {
      isSelected,
      select,
      toggle,
      selectedClass,
      value,
      disabled
    } = (0,_composables_group__WEBPACK_IMPORTED_MODULE_1__.useGroupItem)(props, _VItemGroup__WEBPACK_IMPORTED_MODULE_2__.VItemGroupSymbol);
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    };
  }

}));

/***/ }),

/***/ "./src/components/VItemGroup/VItemGroup.tsx":
/*!**************************************************!*\
  !*** ./src/components/VItemGroup/VItemGroup.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VItemGroupSymbol": () => (/* binding */ VItemGroupSymbol),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VItemGroup_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VItemGroup.sass */ "./src/components/VItemGroup/VItemGroup.sass");
/* harmony import */ var _composables_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/group */ "./src/composables/group.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables



 // Utilities


const VItemGroupSymbol = Symbol.for('vuetify:v-item-group');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VItemGroup',
  props: { ...(0,_composables_group__WEBPACK_IMPORTED_MODULE_3__.makeGroupProps)({
      selectedClass: 'v-item--selected'
    }),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_5__.makeThemeProps)()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_5__.useTheme)(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = (0,_composables_group__WEBPACK_IMPORTED_MODULE_3__.useGroup)(props, VItemGroupSymbol);
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-item-group', themeClasses.value]
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      }, 8, ["class"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VItemGroup/index.ts":
/*!********************************************!*\
  !*** ./src/components/VItemGroup/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VItemGroup": () => (/* reexport safe */ _VItemGroup__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VItem": () => (/* reexport safe */ _VItem__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _VItemGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VItemGroup */ "./src/components/VItemGroup/VItemGroup.tsx");
/* harmony import */ var _VItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VItem */ "./src/components/VItemGroup/VItem.tsx");



/***/ }),

/***/ "./src/components/VKbd/index.ts":
/*!**************************************!*\
  !*** ./src/components/VKbd/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VKbd": () => (/* binding */ VKbd)
/* harmony export */ });
/* harmony import */ var _VKbd_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VKbd.sass */ "./src/components/VKbd/VKbd.sass");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");


const VKbd = (0,_util__WEBPACK_IMPORTED_MODULE_1__.createSimpleFunctional)('v-kbd');

/***/ }),

/***/ "./src/components/VLayout/VLayout.tsx":
/*!********************************************!*\
  !*** ./src/components/VLayout/VLayout.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VLayout_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VLayout.sass */ "./src/components/VLayout/VLayout.sass");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util */ "./src/util/useRender.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");

// Styles
 // Utilities

 // Composables


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VLayout',
  props: (0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.makeLayoutProps)(),

  setup(props, {
    slots
  }) {
    const {
      layoutClasses,
      getLayoutItem,
      items
    } = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.createLayout)(props);
    (0,_util__WEBPACK_IMPORTED_MODULE_4__.useRender)(() => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": layoutClasses.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 2);
    });
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VLayoutItem_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VLayoutItem.sass */ "./src/components/VLayout/VLayoutItem.sass");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables

 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VLayoutItem',
  props: {
    position: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 300
    },
    modelValue: Boolean,
    ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.makeLayoutItemProps)()
  },

  setup(props, {
    slots
  }) {
    const styles = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_3__.useLayoutItem)(props.name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'priority'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'position'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'size'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'size'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'modelValue'));
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": ['v-layout-item', {
          'v-layout-item--absolute': props.absolute
        }],
        "style": styles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 6);
    };
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

/***/ "./src/components/VLazy/VLazy.tsx":
/*!****************************************!*\
  !*** ./src/components/VLazy/VLazy.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/transition */ "./src/composables/transition.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _directives_intersect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../directives/intersect */ "./src/directives/intersect/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Composables



 // Directives

 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VLazy',
  directives: {
    intersect: _directives_intersect__WEBPACK_IMPORTED_MODULE_2__.default
  },
  props: {
    modelValue: Boolean,
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
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.makeDimensionProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)(),
    ...(0,_composables_transition__WEBPACK_IMPORTED_MODULE_5__.makeTransitionProps)({
      transition: 'fade-transition'
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    slots
  }) {
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.useDimension)(props);
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_6__.useProxiedModel)(props, 'modelValue');

    function onIntersect(isIntersecting) {
      if (isActive.value) return;
      isActive.value = isIntersecting;
    }

    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": "v-lazy",
        "style": dimensionStyles.value
      }, {
        default: () => [isActive.value && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_composables_transition__WEBPACK_IMPORTED_MODULE_5__.MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        }, 8, ["transition"])]
      }, 8, ["style"]), [[(0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("intersect"), onIntersect, props.options]]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VLazy/index.ts":
/*!***************************************!*\
  !*** ./src/components/VLazy/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VLazy": () => (/* reexport safe */ _VLazy__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VLazy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VLazy */ "./src/components/VLazy/VLazy.tsx");


/***/ }),

/***/ "./src/components/VList/VList.tsx":
/*!****************************************!*\
  !*** ./src/components/VList/VList.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VList_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VList.sass */ "./src/components/VList/VList.sass");
/* harmony import */ var _VListSubheader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./VListSubheader */ "./src/components/VList/VListSubheader.tsx");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components
// import { VListItem } from '.'

 // Composables








 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VList',
  props: {
    color: String,
    disabled: Boolean,
    lines: {
      type: String,
      default: 'one'
    },
    nav: Boolean,
    subheader: {
      type: [Boolean, String],
      default: false
    },
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.makeDensityProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.makeElevationProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_10__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-list');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_4__.useDensity)(props, 'v-list');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_5__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_6__.useElevation)(props);
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.useRounded)(props, 'v-list');
    return () => {
      var _slots$default;

      const hasHeader = typeof props.subheader === 'string' || slots.subheader;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-list', {
          'v-list--disabled': props.disabled,
          'v-list--nav': props.nav,
          'v-list--subheader': props.subheader,
          'v-list--subheader-sticky': props.subheader === 'sticky',
          [`v-list--${props.lines}-line`]: true
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value]
      }, {
        default: () => [hasHeader && (slots.subheader ? slots.subheader() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VListSubheader__WEBPACK_IMPORTED_MODULE_11__.default, null, {
          default: () => [props.subheader]
        })), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VList/VListImg.ts":
/*!******************************************!*\
  !*** ./src/components/VList/VListImg.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-list-img'));

/***/ }),

/***/ "./src/components/VList/VListItem.tsx":
/*!********************************************!*\
  !*** ./src/components/VList/VListItem.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VListItem_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VListItem.sass */ "./src/components/VList/VListItem.sass");
/* harmony import */ var _VListItemAvatar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VListItemAvatar */ "./src/components/VList/VListItemAvatar.tsx");
/* harmony import */ var _VListItemHeader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./VListItemHeader */ "./src/components/VList/VListItemHeader.ts");
/* harmony import */ var _VListItemSubtitle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VListItemSubtitle */ "./src/components/VList/VListItemSubtitle.ts");
/* harmony import */ var _VListItemTitle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./VListItemTitle */ "./src/components/VList/VListItemTitle.ts");
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../VAvatar */ "./src/components/VAvatar/VAvatar.tsx");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/router */ "./src/composables/router.tsx");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_variant__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/variant */ "./src/composables/variant.tsx");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Components





 // Composables









 // Directives

 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VListItem',
  directives: {
    Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_3__.Ripple
  },
  props: {
    active: Boolean,
    activeColor: String,
    activeClass: String,
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    subtitle: String,
    title: String,
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_4__.makeBorderProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_5__.makeDensityProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_6__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_7__.makeElevationProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_8__.makeRoundedProps)(),
    ...(0,_composables_router__WEBPACK_IMPORTED_MODULE_9__.makeRouterProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_10__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_11__.makeThemeProps)(),
    ...(0,_composables_variant__WEBPACK_IMPORTED_MODULE_12__.makeVariantProps)({
      variant: 'text'
    })
  },

  setup(props, {
    attrs,
    slots
  }) {
    var _props$activeColor;

    const link = (0,_composables_router__WEBPACK_IMPORTED_MODULE_9__.useLink)(props, attrs);
    const isActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _link$isExactActive;

      return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value);
    });
    const activeColor = (_props$activeColor = props.activeColor) != null ? _props$activeColor : props.color;
    const variantProps = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
      color: isActive.value ? activeColor : props.color,
      textColor: props.textColor,
      variant: props.variant
    }));
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_11__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_4__.useBorder)(props, 'v-list-item');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = (0,_composables_variant__WEBPACK_IMPORTED_MODULE_12__.useVariant)(variantProps, 'v-list-item');
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_5__.useDensity)(props, 'v-list-item');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_6__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_7__.useElevation)(props);
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_8__.useRounded)(props, 'v-list-item');
    return () => {
      var _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasTitle = slots.title || props.title;
      const hasSubtitle = slots.subtitle || props.subtitle;
      const hasHeader = !!(hasTitle || hasSubtitle);
      const hasAppend = slots.append || props.appendAvatar || props.appendIcon;
      const hasPrepend = slots.prepend || props.prependAvatar || props.prependIcon;
      const isClickable = !props.disabled && (link.isClickable.value || props.link);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(Tag, {
        "class": ['v-list-item', {
          'v-list-item--active': isActive.value,
          'v-list-item--disabled': props.disabled,
          'v-list-item--link': isClickable,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value],
        "href": link.href.value,
        "tabindex": isClickable ? 0 : undefined,
        "onClick": isClickable && link.navigate
      }, {
        default: () => [(0,_composables_variant__WEBPACK_IMPORTED_MODULE_12__.genOverlays)(!!(isClickable || isActive.value), 'v-list-item'), hasPrepend && (slots.prepend ? slots.prepend() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VListItemAvatar__WEBPACK_IMPORTED_MODULE_13__.default, {
          "left": true
        }, {
          default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_14__.default, {
            "density": props.density,
            "icon": props.prependIcon,
            "image": props.prependAvatar
          }, null, 8, ["density", "icon", "image"])]
        }, 8, ["left"])), hasHeader && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VListItemHeader__WEBPACK_IMPORTED_MODULE_15__.default, null, {
          default: () => [hasTitle && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VListItemTitle__WEBPACK_IMPORTED_MODULE_16__.default, null, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasSubtitle && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VListItemSubtitle__WEBPACK_IMPORTED_MODULE_17__.default, null, {
            default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
          })],
          _: 1
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), hasAppend && (slots.append ? slots.append() : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VListItemAvatar__WEBPACK_IMPORTED_MODULE_13__.default, {
          "right": true
        }, {
          default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VAvatar__WEBPACK_IMPORTED_MODULE_14__.default, {
            "density": props.density,
            "icon": props.appendIcon,
            "image": props.appendAvatar
          }, null, 8, ["density", "icon", "image"])]
        }, 8, ["right"]))],
        _: 1
      }, 8, ["class", "style", "href", "tabindex", "onClick"]), [[(0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("ripple"), isClickable]]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VList/VListItemAvatar.tsx":
/*!**************************************************!*\
  !*** ./src/components/VList/VListItemAvatar.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Composables
 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VListItemAvatar',
  props: {
    left: Boolean,
    right: Boolean,
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_2__.makeTagProps)()
  },

  setup(props, {
    slots
  }) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-list-item-avatar', {
          'v-list-item-avatar--start': props.left,
          'v-list-item-avatar--end': props.right
        }]
      }, slots, 8, ["class"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VList/VListItemHeader.ts":
/*!*************************************************!*\
  !*** ./src/components/VList/VListItemHeader.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-list-item-header'));

/***/ }),

/***/ "./src/components/VList/VListItemMedia.tsx":
/*!*************************************************!*\
  !*** ./src/components/VList/VListItemMedia.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Composables
 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VListItemMedia',
  props: {
    left: Boolean,
    right: Boolean,
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_2__.makeTagProps)()
  },

  setup(props, {
    slots
  }) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-list-item-media', {
          'v-list-item-media--start': props.left,
          'v-list-item-media--end': props.right
        }]
      }, slots, 8, ["class"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VList/VListItemSubtitle.ts":
/*!***************************************************!*\
  !*** ./src/components/VList/VListItemSubtitle.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-list-item-subtitle'));

/***/ }),

/***/ "./src/components/VList/VListItemTitle.ts":
/*!************************************************!*\
  !*** ./src/components/VList/VListItemTitle.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/createSimpleFunctional.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.createSimpleFunctional)('v-list-item-title'));

/***/ }),

/***/ "./src/components/VList/VListSubheader.tsx":
/*!*************************************************!*\
  !*** ./src/components/VList/VListSubheader.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Composables

 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VListSubheader',
  props: {
    color: String,
    inset: Boolean,
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_2__.makeTagProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_3__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-list-subheader', {
        'v-list-subheader--inset': props.inset
      }, textColorClasses.value],
      "style": {
        textColorStyles
      }
    }, {
      default: () => [slots.default && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-list-subheader__text"
      }, [slots.default()])]
    }, 8, ["class", "style"]);
  }

}));

/***/ }),

/***/ "./src/components/VList/index.ts":
/*!***************************************!*\
  !*** ./src/components/VList/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VList": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VListSubheader": () => (/* reexport safe */ _VListSubheader__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "VListImg": () => (/* reexport safe */ _VListImg__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "VListItem": () => (/* reexport safe */ _VListItem__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "VListItemAvatar": () => (/* reexport safe */ _VListItemAvatar__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "VListItemHeader": () => (/* reexport safe */ _VListItemHeader__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "VListItemMedia": () => (/* reexport safe */ _VListItemMedia__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "VListItemSubtitle": () => (/* reexport safe */ _VListItemSubtitle__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "VListItemTitle": () => (/* reexport safe */ _VListItemTitle__WEBPACK_IMPORTED_MODULE_8__.default)
/* harmony export */ });
/* harmony import */ var _VList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VList */ "./src/components/VList/VList.tsx");
/* harmony import */ var _VListSubheader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VListSubheader */ "./src/components/VList/VListSubheader.tsx");
/* harmony import */ var _VListImg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VListImg */ "./src/components/VList/VListImg.ts");
/* harmony import */ var _VListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VListItem */ "./src/components/VList/VListItem.tsx");
/* harmony import */ var _VListItemAvatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VListItemAvatar */ "./src/components/VList/VListItemAvatar.tsx");
/* harmony import */ var _VListItemHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VListItemHeader */ "./src/components/VList/VListItemHeader.ts");
/* harmony import */ var _VListItemMedia__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VListItemMedia */ "./src/components/VList/VListItemMedia.tsx");
/* harmony import */ var _VListItemSubtitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VListItemSubtitle */ "./src/components/VList/VListItemSubtitle.ts");
/* harmony import */ var _VListItemTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VListItemTitle */ "./src/components/VList/VListItemTitle.ts");










/***/ }),

/***/ "./src/components/VLocaleProvider/VLocaleProvider.tsx":
/*!************************************************************!*\
  !*** ./src/components/VLocaleProvider/VLocaleProvider.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VLocaleProvider_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VLocaleProvider.sass */ "./src/components/VLocaleProvider/VLocaleProvider.sass");
/* harmony import */ var _composables_locale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/locale */ "./src/composables/locale.ts");
/* harmony import */ var _composables_rtl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/rtl */ "./src/composables/rtl.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

 // Composables


 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VLocaleProvider',
  props: {
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: undefined
    }
  },

  setup(props, {
    slots
  }) {
    const localeInstance = (0,_composables_locale__WEBPACK_IMPORTED_MODULE_3__.provideLocale)(props);
    const {
      rtlClasses
    } = (0,_composables_rtl__WEBPACK_IMPORTED_MODULE_4__.provideRtl)(props, localeInstance);
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": ['v-locale-provider', rtlClasses.value]
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 2);
    };
  }

}));

/***/ }),

/***/ "./src/components/VLocaleProvider/index.ts":
/*!*************************************************!*\
  !*** ./src/components/VLocaleProvider/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VLocaleProvider": () => (/* reexport safe */ _VLocaleProvider__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VLocaleProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VLocaleProvider */ "./src/components/VLocaleProvider/VLocaleProvider.tsx");


/***/ }),

/***/ "./src/components/VMain/VMain.tsx":
/*!****************************************!*\
  !*** ./src/components/VMain/VMain.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VMain_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VMain.sass */ "./src/components/VMain/VMain.sass");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _composables_ssrBoot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/ssrBoot */ "./src/composables/ssrBoot.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables



 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VMain',
  props: (0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)({
    tag: 'main'
  }),

  setup(props, {
    slots
  }) {
    const {
      mainStyles
    } = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_4__.useMain)();
    const {
      ssrBootStyles
    } = (0,_composables_ssrBoot__WEBPACK_IMPORTED_MODULE_5__.useSsrBoot)();
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": "v-main",
        "style": [mainStyles.value, ssrBootStyles.value]
      }, {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-main__wrap"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
      }, 8, ["style"]);
    };
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


/***/ }),

/***/ "./src/components/VNavigationDrawer/VNavigationDrawer.tsx":
/*!****************************************************************!*\
  !*** ./src/components/VNavigationDrawer/VNavigationDrawer.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VNavigationDrawer_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VNavigationDrawer.sass */ "./src/components/VNavigationDrawer/VNavigationDrawer.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/layout */ "./src/composables/layout.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_display__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/display */ "./src/composables/display.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables









 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VNavigationDrawer',
  props: {
    color: String,
    disableResizeWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    permanent: Boolean,
    rail: Boolean,
    railWidth: {
      type: [Number, String],
      default: 72
    },
    image: String,
    temporary: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    position: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right', 'bottom'].includes(value)
    },
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_4__.makeElevationProps)(),
    ...(0,_composables_layout__WEBPACK_IMPORTED_MODULE_5__.makeLayoutItemProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_7__.makeTagProps)({
      tag: 'nav'
    }),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_8__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_8__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-navigation-drawer');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_9__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_4__.useElevation)(props);
    const {
      mobile
    } = (0,_composables_display__WEBPACK_IMPORTED_MODULE_10__.useDisplay)();
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.useRounded)(props, 'v-navigation-drawer');
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_11__.useProxiedModel)(props, 'modelValue');
    const isHovering = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const width = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return props.rail && props.expandOnHover && isHovering.value ? props.width : Number(props.rail ? props.railWidth : props.width);
    });
    const isTemporary = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => !props.permanent && (mobile.value || props.temporary));
    const layoutStyles = (0,_composables_layout__WEBPACK_IMPORTED_MODULE_5__.useLayoutItem)(props.name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'priority'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'position'), (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value), width, isActive);

    if (!props.disableResizeWatcher) {
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(mobile, val => !props.permanent && (isActive.value = !val));
    }

    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(props, val => {
      if (val.permanent) isActive.value = true;
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount)(() => {
      if (props.modelValue != null) return;
      isActive.value = props.permanent || !mobile.value;
    });
    return () => {
      var _slots$image, _slots$prepend, _slots$default, _slots$append;

      const hasImage = slots.image || props.image;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "onMouseenter": () => isHovering.value = true,
        "onMouseleave": () => isHovering.value = false,
        "class": ['v-navigation-drawer', {
          'v-navigation-drawer--bottom': props.position === 'bottom',
          'v-navigation-drawer--end': props.position === 'right',
          'v-navigation-drawer--expand-on-hover': props.expandOnHover,
          'v-navigation-drawer--floating': props.floating,
          'v-navigation-drawer--is-hovering': isHovering.value,
          'v-navigation-drawer--rail': props.rail,
          'v-navigation-drawer--start': props.position === 'left',
          'v-navigation-drawer--temporary': isTemporary.value,
          'v-navigation-drawer--absolute': props.absolute
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutStyles.value]
      }, {
        default: () => [hasImage && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__img"
        }, [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
          image: props.image
        }) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
          "src": props.image,
          "alt": ""
        }, null, 8, ["src"])]), slots.prepend && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__content"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          "class": "v-navigation-drawer__append"
        }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])],
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

/***/ "./src/components/VOverlay/VOverlay.tsx":
/*!**********************************************!*\
  !*** ./src/components/VOverlay/VOverlay.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VOverlay_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VOverlay.sass */ "./src/components/VOverlay/VOverlay.sass");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_transition__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/transition */ "./src/composables/transition.ts");
/* harmony import */ var _composables_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/router */ "./src/composables/router.tsx");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _composables_rtl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/rtl */ "./src/composables/rtl.ts");
/* harmony import */ var _composables_teleport__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/teleport */ "./src/composables/teleport.ts");
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../directives/click-outside */ "./src/directives/click-outside/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/getScrollParent.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../util */ "./src/util/easing.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../util */ "./src/util/useRender.ts");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Styles
 // Composables







 // Directives

 // Utilities


 // Types

function useBooted(isActive, eager) {
  const isBooted = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(eager.value);
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect)(() => {
    if (eager.value || isActive.value) {
      isBooted.value = true;
    }
  });
  return {
    isBooted
  };
}

const positionStrategies = ['global', // specific viewport position, usually centered
'connected', // connected to a certain element
'flexible' // connected to an element with the ability to overflow or shift if it doesn't fit in the screen
];
const scrollStrategies = ['close', 'block', 'reposition'];

function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
      "class": ['v-overlay__scrim', props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null, 16)]
  }, 8, ["appear"]);
}

class CloseScrollStrategy {
  constructor({
    content,
    isActive
  }) {
    _defineProperty(this, "scrollElements", []);

    this.content = content;
    this.isActive = isActive;
  }

  enable() {
    this.scrollElements = [document, ...(0,_util__WEBPACK_IMPORTED_MODULE_2__.getScrollParents)(this.content.value)];
    this.scrollElements.forEach(el => {
      el.addEventListener('scroll', this.onScroll.bind(this), {
        passive: true
      });
    });
  }

  disable() {
    this.scrollElements.forEach(el => {
      el.removeEventListener('scroll', this.onScroll.bind(this));
    });
  }

  onScroll() {
    this.isActive.value = false;
  }

}

class BlockScrollStrategy {
  constructor({
    content
  }) {
    _defineProperty(this, "initialOverflow", []);

    _defineProperty(this, "scrollElements", []);

    this.content = content;
  }

  enable() {
    this.scrollElements = (0,_util__WEBPACK_IMPORTED_MODULE_2__.getScrollParents)(this.content.value);
    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
    document.documentElement.style.setProperty('--v-scrollbar-offset', (0,_util__WEBPACK_IMPORTED_MODULE_3__.convertToUnit)(scrollbarWidth));
    this.scrollElements.forEach((el, i) => {
      this.initialOverflow[i] = el.style.overflowY;
      el.style.overflowY = 'hidden';
      el.style.setProperty('--v-scrollbar-offset', (0,_util__WEBPACK_IMPORTED_MODULE_3__.convertToUnit)(scrollbarWidth));
    });
  }

  disable() {
    this.scrollElements.forEach((el, i) => {
      el.style.overflowY = this.initialOverflow[i];
      el.style.removeProperty('--v-scrollbar-offset');
    });
    document.documentElement.style.removeProperty('--v-scrollbar-offset');
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_4__.defineComponent)({
  name: 'VOverlay',
  directives: {
    ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_5__.ClickOutside
  },
  inheritAttrs: false,
  props: {
    absolute: Boolean,
    attach: {
      type: [Boolean, String, Object],
      default: 'body'
    },
    eager: Boolean,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    origin: [String, Object],
    persistent: Boolean,
    positionStrategy: {
      type: String,
      default: 'global',
      validator: val => positionStrategies.includes(val)
    },
    scrim: {
      type: [String, Boolean],
      default: true
    },
    scrollStrategy: {
      type: String,
      default: 'block',
      validator: val => scrollStrategies.includes(val)
    },
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_6__.makeThemeProps)(),
    ...(0,_composables_transition__WEBPACK_IMPORTED_MODULE_7__.makeTransitionProps)()
  },
  emits: {
    'click:outside': e => true,
    'update:modelValue': value => true
  },

  setup(props, {
    slots,
    attrs,
    emit
  }) {
    const isActive = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_8__.useProxiedModel)(props, 'modelValue');
    const {
      teleportTarget
    } = (0,_composables_teleport__WEBPACK_IMPORTED_MODULE_9__.useTeleport)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'attach'));
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_6__.useTheme)(props);
    const {
      rtlClasses
    } = (0,_composables_rtl__WEBPACK_IMPORTED_MODULE_10__.useRtl)();
    const {
      isBooted
    } = useBooted(isActive, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'eager'));
    const scrimColor = (0,_composables_color__WEBPACK_IMPORTED_MODULE_11__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    }));

    function onClickOutside(e) {
      emit('click:outside', e);
      if (!props.persistent) isActive.value = false;else animateClick();
    }

    function closeConditional() {
      return isActive.value;
    }

    const activatorElement = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();

    function onActivatorClick(e) {
      activatorElement.value = e.currentTarget || e.target;
      isActive.value = !isActive.value;
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        if (!props.persistent) {
          isActive.value = false;
        } else animateClick();
      }
    }

    (0,_composables_router__WEBPACK_IMPORTED_MODULE_12__.useBackButton)(next => {
      next(!isActive.value);
      if (!props.persistent) isActive.value = false;else animateClick();
    });
    const content = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(isActive, val => {
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        if (val) {
          var _content$value;

          (_content$value = content.value) == null ? void 0 : _content$value.focus();
        } else {
          var _activatorElement$val;

          (_activatorElement$val = activatorElement.value) == null ? void 0 : _activatorElement$val.focus();
        }
      });
    });
    const root = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    const top = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => isActive.value && props.absolute && teleportTarget.value == null, val => {
      if (val) {
        const scrollParent = (0,_util__WEBPACK_IMPORTED_MODULE_2__.getScrollParent)(root.value);

        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    }); // Add a quick "bounce" animation to the content

    function animateClick() {
      var _content$value2;

      if (props.noClickAnimation) return;
      (_content$value2 = content.value) == null ? void 0 : _content$value2.animate([{
        transformOrigin: 'center'
      }, {
        transform: 'scale(1.03)'
      }, {
        transformOrigin: 'center'
      }], {
        duration: 150,
        easing: _util__WEBPACK_IMPORTED_MODULE_13__.standardEasing
      });
    }

    function onAfterLeave() {
      if (!props.eager) isBooted.value = false;
    }

    const scrollStrategy = props.scrollStrategy === 'close' ? new CloseScrollStrategy({
      content,
      isActive
    }) : props.scrollStrategy === 'block' ? new BlockScrollStrategy({
      content
    }) : null; // TODO: reactive

    if (scrollStrategy) {
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(isActive, val => {
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
          val ? scrollStrategy.enable() : scrollStrategy.disable();
        });
      });
    }

    (0,_util__WEBPACK_IMPORTED_MODULE_14__.useRender)(() => {
      var _slots$activator, _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, {
        isActive: isActive.value,
        props: {
          modelValue: isActive.value,
          'onUpdate:modelValue': val => isActive.value = val,
          onClick: onActivatorClick
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
        "disabled": !teleportTarget.value,
        "ref": root,
        "to": teleportTarget.value
      }, {
        default: () => [isBooted.value && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
          "class": ['v-overlay', {
            'v-overlay--absolute': props.absolute,
            'v-overlay--active': isActive.value
          }, themeClasses.value, rtlClasses.value],
          "style": top.value != null ? `top: ${(0,_util__WEBPACK_IMPORTED_MODULE_3__.convertToUnit)(top.value)}` : undefined
        }, attrs), [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(Scrim, {
          "color": scrimColor,
          "modelValue": isActive.value && !!props.scrim
        }, null, 8, ["color", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_composables_transition__WEBPACK_IMPORTED_MODULE_7__.MaybeTransition, {
          "appear": true,
          "onAfterLeave": onAfterLeave,
          "persisted": true,
          "transition": props.transition
        }, {
          default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
            "ref": content,
            "class": "v-overlay__content",
            "tabindex": -1,
            "onKeydown": onKeydown
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isActive
          })], 40, ["tabindex", "onKeydown"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, isActive.value], [(0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("click-outside"), {
            handler: onClickOutside,
            closeConditional
          }]])]
        }, 8, ["appear", "onAfterLeave", "persisted", "transition"])], 16)]
      }, 8, ["disabled", "to"])]);
    });
    return {
      animateClick,
      content
    };
  }

}));

/***/ }),

/***/ "./src/components/VOverlay/index.ts":
/*!******************************************!*\
  !*** ./src/components/VOverlay/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VOverlay": () => (/* reexport safe */ _VOverlay__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VOverlay */ "./src/components/VOverlay/VOverlay.tsx");



/***/ }),

/***/ "./src/components/VPagination/VPagination.tsx":
/*!****************************************************!*\
  !*** ./src/components/VPagination/VPagination.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VPagination_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VPagination.sass */ "./src/components/VPagination/VPagination.sass");
/* harmony import */ var _VPaginationBtn__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VPaginationBtn */ "./src/components/VPagination/VPaginationBtn.tsx");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_locale__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../composables/locale */ "./src/composables/locale.ts");
/* harmony import */ var _composables_rtl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../composables/rtl */ "./src/composables/rtl.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_variant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/variant */ "./src/composables/variant.tsx");
/* harmony import */ var _composables_resizeObserver__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../composables/resizeObserver */ "./src/composables/resizeObserver.ts");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_refs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../composables/refs */ "./src/composables/refs.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

 // Components

 // Composables













 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VPagination',
  props: {
    start: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: Number,
      default: props => props.start
    },
    disabled: Boolean,
    length: {
      type: [Number, String],
      default: 1,
      validator: val => val % 1 === 0
    },
    totalVisible: [Number, String],
    firstIcon: {
      type: String,
      default: '$first'
    },
    prevIcon: {
      type: String,
      default: '$prev'
    },
    nextIcon: {
      type: String,
      default: '$next'
    },
    lastIcon: {
      type: String,
      default: '$last'
    },
    ariaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.root'
    },
    pageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.page'
    },
    currentPageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.currentPage'
    },
    firstAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.first'
    },
    previousAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.previous'
    },
    nextAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.next'
    },
    lastAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.last'
    },
    ellipsis: {
      type: String,
      default: '...'
    },
    showFirstLastPage: Boolean,
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_3__.makeTagProps)({
      tag: 'nav'
    }),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_4__.makeElevationProps)(),
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_5__.makeDensityProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_6__.makeRoundedProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_7__.makeSizeProps)(),
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_8__.makeBorderProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.makeThemeProps)(),
    ...(0,_composables_variant__WEBPACK_IMPORTED_MODULE_10__.makeVariantProps)({
      variant: 'text'
    })
  },
  emits: {
    'update:modelValue': value => true,
    first: value => true,
    prev: value => true,
    next: value => true,
    last: value => true
  },

  setup(props, {
    slots,
    emit
  }) {
    const page = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_11__.useProxiedModel)(props, 'modelValue');
    const {
      t,
      n
    } = (0,_composables_locale__WEBPACK_IMPORTED_MODULE_12__.useLocale)();
    const {
      isRtl
    } = (0,_composables_rtl__WEBPACK_IMPORTED_MODULE_13__.useRtl)();
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)(props);
    const maxButtons = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(-1);
    const {
      resizeRef
    } = (0,_composables_resizeObserver__WEBPACK_IMPORTED_MODULE_14__.useResizeObserver)(entries => {
      if (!entries.length) return;
      const {
        target,
        contentRect
      } = entries[0];
      const firstItem = target.querySelector('.v-pagination__list > *');
      if (!firstItem) return;
      const totalWidth = contentRect.width;
      const itemWidth = firstItem.getBoundingClientRect().width + 10;
      maxButtons.value = Math.max(0, Math.floor((totalWidth - 96) / itemWidth));
    });
    const length = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => parseInt(props.length, 10));
    const start = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => parseInt(props.start, 10));
    const totalVisible = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$totalVisible;

      if (props.totalVisible) return Math.min(parseInt((_props$totalVisible = props.totalVisible) != null ? _props$totalVisible : '', 10), length.value);else if (maxButtons.value >= 0) return maxButtons.value;
      return length.value;
    });
    const range = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (length.value <= 0) return [];

      if (totalVisible.value <= 3) {
        return [Math.min(Math.max(start.value, page.value), start.value + length.value)];
      }

      if (props.length <= totalVisible.value) {
        return (0,_util__WEBPACK_IMPORTED_MODULE_15__.createRange)(length.value, start.value);
      }

      const middle = Math.ceil(totalVisible.value / 2);
      const left = middle;
      const right = length.value - middle;

      if (page.value < left) {
        return [...(0,_util__WEBPACK_IMPORTED_MODULE_15__.createRange)(Math.max(1, totalVisible.value - 2), start.value), props.ellipsis, length.value];
      } else if (page.value > right) {
        const rangeLength = totalVisible.value - 2;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...(0,_util__WEBPACK_IMPORTED_MODULE_15__.createRange)(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 4);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...(0,_util__WEBPACK_IMPORTED_MODULE_15__.createRange)(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    }); // TODO: 'first' | 'prev' | 'next' | 'last' does not work here?

    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }

    const {
      refs,
      updateRef
    } = (0,_composables_refs__WEBPACK_IMPORTED_MODULE_16__.useRefs)();
    const items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const sharedProps = {
        density: props.density,
        rounded: props.rounded,
        size: props.size
      };
      return range.value.map((item, index) => {
        const ref = e => updateRef(e, index);

        if (typeof item === 'string') {
          return {
            isActive: false,
            page: item,
            props: { ...sharedProps,
              ref,
              ellipsis: true,
              icon: true,
              disabled: true,
              variant: props.variant,
              border: props.border
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            page: n(item),
            props: { ...sharedProps,
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || props.length < 2,
              elevation: props.elevation,
              variant: props.variant,
              border: props.border,
              color: isActive ? props.color : undefined,
              ariaCurrent: isActive,
              ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
              onClick: e => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const sharedProps = {
        color: undefined,
        density: props.density,
        rounded: props.rounded,
        size: props.size,
        variant: props.variant,
        border: props.border
      };
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? { ...sharedProps,
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: e => setValue(e, start.value, 'first'),
          disabled: prevDisabled,
          ariaLabel: t(props.firstAriaLabel),
          ariaDisabled: prevDisabled
        } : undefined,
        prev: { ...sharedProps,
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: e => setValue(e, page.value - 1, 'prev'),
          disabled: prevDisabled,
          ariaLabel: t(props.previousAriaLabel),
          ariaDisabled: prevDisabled
        },
        next: { ...sharedProps,
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: e => setValue(e, page.value + 1, 'next'),
          disabled: nextDisabled,
          ariaLabel: t(props.nextAriaLabel),
          ariaDisabled: nextDisabled
        },
        last: props.showFirstLastPage ? { ...sharedProps,
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: e => setValue(e, start.value + length.value - 1, 'last'),
          disabled: nextDisabled,
          ariaLabel: t(props.lastAriaLabel),
          ariaDisabled: nextDisabled
        } : undefined
      };
    });

    function updateFocus() {
      var _refs$value$currentIn;

      const currentIndex = page.value - start.value;
      (_refs$value$currentIn = refs.value[currentIndex]) == null ? void 0 : _refs$value$currentIn.$el.focus();
    }

    function onKeydown(e) {
      if (e.key === _util__WEBPACK_IMPORTED_MODULE_15__.keyValues.left && !props.disabled && page.value > props.start) {
        page.value = page.value - 1;
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(updateFocus);
      } else if (e.key === _util__WEBPACK_IMPORTED_MODULE_15__.keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(updateFocus);
      }
    }

    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "ref": resizeRef,
      "class": ['v-pagination', themeClasses.value],
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", {
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VPaginationBtn__WEBPACK_IMPORTED_MODULE_17__.default, controls.value.first, null, 16)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", {
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VPaginationBtn__WEBPACK_IMPORTED_MODULE_17__.default, controls.value.prev, null, 16)]), items.value.map((item, index) => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", {
        "key": `${index}_${item.page}`,
        "class": ['v-pagination__item', {
          'v-pagination__item--is-active': item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VPaginationBtn__WEBPACK_IMPORTED_MODULE_17__.default, item.props, {
        default: () => [item.page]
      }, 16)], 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", {
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VPaginationBtn__WEBPACK_IMPORTED_MODULE_17__.default, controls.value.next, null, 16)]), props.showFirstLastPage && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", {
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VPaginationBtn__WEBPACK_IMPORTED_MODULE_17__.default, controls.value.last, null, 16)])])]
    }, 8, ["class", "aria-label", "onKeydown"]);
  }

}));

/***/ }),

/***/ "./src/components/VPagination/VPaginationBtn.tsx":
/*!*******************************************************!*\
  !*** ./src/components/VPagination/VPaginationBtn.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/VBtn.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
// Components
 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({ ..._VBtn__WEBPACK_IMPORTED_MODULE_1__.default,
  name: 'VPaginationBtn'
}));

/***/ }),

/***/ "./src/components/VPagination/index.ts":
/*!*********************************************!*\
  !*** ./src/components/VPagination/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VPagination": () => (/* reexport safe */ _VPagination__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VPaginationBtn": () => (/* reexport safe */ _VPaginationBtn__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _VPagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VPagination */ "./src/components/VPagination/VPagination.tsx");
/* harmony import */ var _VPaginationBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VPaginationBtn */ "./src/components/VPagination/VPaginationBtn.tsx");



/***/ }),

/***/ "./src/components/VProgressCircular/VProgressCircular.tsx":
/*!****************************************************************!*\
  !*** ./src/components/VProgressCircular/VProgressCircular.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VProgressCircular_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VProgressCircular.sass */ "./src/components/VProgressCircular/VProgressCircular.sass");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_intersectionObserver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/intersectionObserver */ "./src/composables/intersectionObserver.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

// Styles
 // Composables





 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VProgressCircular',
  props: {
    bgColor: String,
    color: String,
    indeterminate: [Boolean, String],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 4
    },
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_3__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)({
      tag: 'div'
    }),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_5__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_5__.useTheme)(props);
    const {
      sizeClasses,
      sizeStyles
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_3__.useSize)(props, 'v-progress-circular');
    const {
      textColorClasses,
      textColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_6__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_6__.useTextColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'bgColor'));
    const {
      intersectionRef,
      isIntersecting
    } = (0,_composables_intersectionObserver__WEBPACK_IMPORTED_MODULE_7__.useIntersectionObserver)();
    const normalizedValue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => Number(props.width));
    const size = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      // Get size from element if size prop value is small, large etc
      return sizeStyles.value ? Number(props.size) : intersectionRef.value ? intersectionRef.value.getBoundingClientRect().width : Math.max(width.value, 32);
    });
    const diameter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => width.value / size.value * diameter.value);
    const strokeDashOffset = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,_util__WEBPACK_IMPORTED_MODULE_8__.convertToUnit)((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "ref": intersectionRef,
      "class": ['v-progress-circular', {
        'v-progress-circular--indeterminate': !!props.indeterminate,
        'v-progress-circular--visible': isIntersecting.value,
        'v-progress-circular--disable-shrink': props.indeterminate === 'disable-shrink'
      }, themeClasses.value, sizeClasses.value, textColorClasses.value],
      "style": [sizeStyles.value, textColorStyles.value],
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? undefined : normalizedValue.value
    }, {
      default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("circle", {
        "class": ['v-progress-circular__underlay', underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null, 14, ["r", "stroke-width", "stroke-dasharray"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null, 8, ["r", "stroke-width", "stroke-dasharray", "stroke-dashoffset"])]), slots.default && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])],
      _: 1
    }, 8, ["class", "style", "aria-valuenow"]);
  }

}));

/***/ }),

/***/ "./src/components/VProgressCircular/index.ts":
/*!***************************************************!*\
  !*** ./src/components/VProgressCircular/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VProgressCircular": () => (/* reexport safe */ _VProgressCircular__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VProgressCircular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VProgressCircular */ "./src/components/VProgressCircular/VProgressCircular.tsx");


/***/ }),

/***/ "./src/components/VRating/VRating.tsx":
/*!********************************************!*\
  !*** ./src/components/VRating/VRating.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VRating_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VRating.sass */ "./src/components/VRating/VRating.sass");
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/VBtn.tsx");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_proxiedModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/locale */ "./src/composables/locale.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");

// Styles
 // Components

 // Composables






 // Utilities


 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VRating',
  props: {
    name: String,
    itemAriaLabel: {
      type: String,
      default: '$vuetify.rating.ariaLabel.item'
    },
    activeColor: String,
    color: String,
    clearable: Boolean,
    disabled: Boolean,
    emptyIcon: {
      type: String,
      default: '$ratingEmpty'
    },
    fullIcon: {
      type: String,
      default: '$ratingFull'
    },
    halfIncrements: Boolean,
    hover: Boolean,
    length: {
      type: [Number, String],
      default: 5
    },
    readonly: Boolean,
    modelValue: {
      type: Number,
      default: 0
    },
    itemLabels: Array,
    itemLabelPosition: {
      type: String,
      default: 'top',
      validator: v => ['top', 'bottom'].includes(v)
    },
    ripple: Boolean,
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.makeDensityProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_4__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_5__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_6__.makeThemeProps)()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, {
    slots
  }) {
    const {
      t
    } = (0,_composables_locale__WEBPACK_IMPORTED_MODULE_7__.useLocale)();
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_6__.useTheme)(props);
    const rating = (0,_composables_proxiedModel__WEBPACK_IMPORTED_MODULE_8__.useProxiedModel)(props, 'modelValue');
    const range = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,_util__WEBPACK_IMPORTED_MODULE_9__.createRange)(Number(props.length), 1));
    const increments = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(-1);
    const focusIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(-1);
    const firstRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    let isClicking = false;
    const itemState = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => increments.value.map(value => {
      var _props$activeColor;

      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = rating.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = (_props$activeColor = props.activeColor) != null ? _props$activeColor : props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => [0, ...increments.value].map(value => {
      function onMouseenter() {
        hoverIndex.value = value;
      }

      function onMouseleave() {
        hoverIndex.value = -1;
      }

      function onFocus() {
        if (value === 0 && rating.value === 0) {
          var _firstRef$value;

          (_firstRef$value = firstRef.value) == null ? void 0 : _firstRef$value.focus();
        } else {
          focusIndex.value = value;
        }
      }

      function onBlur() {
        if (!isClicking) focusIndex.value = -1;
      }

      function onClick() {
        if (props.disabled || props.readonly) return;
        rating.value = rating.value === value && props.clearable ? 0 : value;
      }

      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onFocus,
        onBlur,
        onClick
      };
    }));

    function onMousedown() {
      isClicking = true;
    }

    function onMouseup() {
      isClicking = false;
    }

    const name = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : `v-rating-${(0,_util__WEBPACK_IMPORTED_MODULE_9__.getUid)()}`;
    });

    function VRatingItem({
      value,
      index,
      showStar = true
    }) {
      var _itemState$value$inde, _itemState$value$inde2;

      const {
        onMouseenter,
        onMouseleave,
        onFocus,
        onBlur,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace('.', '-')}`;
      const btnProps = {
        color: (_itemState$value$inde = itemState.value[index]) == null ? void 0 : _itemState$value$inde.color,
        density: props.density,
        disabled: props.disabled,
        icon: (_itemState$value$inde2 = itemState.value[index]) == null ? void 0 : _itemState$value$inde2.icon,
        ripple: props.ripple,
        size: props.size,
        tag: 'span',
        variant: 'plain'
      };
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
        "for": id,
        "class": {
          'v-rating__item--half': props.halfIncrements && value % 1 > 0,
          'v-rating__item--full': props.halfIncrements && value % 1 === 0
        },
        "onMousedown": onMousedown,
        "onMouseup": onMouseup,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? undefined : slots.item ? slots.item({ ...itemState.value,
        props: btnProps,
        value,
        index
      }) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VBtn__WEBPACK_IMPORTED_MODULE_10__.default, btnProps, null, 16)], 42, ["for", "onMousedown", "onMouseup", "onMouseenter", "onMouseleave"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": rating.value === value,
        "onClick": onClick,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "ref": index === 0 ? firstRef : undefined,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null, 40, ["name", "id", "value", "checked", "onClick", "onFocus", "onBlur", "readonly", "disabled"])]);
    }

    return () => {
      var _props$itemLabels;

      const hasLabels = !!((_props$itemLabels = props.itemLabels) != null && _props$itemLabels.length);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-rating', {
          'v-rating--readonly': props.readonly
        }, themeClasses.value]
      }, {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null, 8, ["index"]), range.value.map((value, i) => {
          var _props$itemLabels2, _props$itemLabels3;

          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
            "class": "v-rating__wrapper"
          }, [!hasLabels ? undefined : slots['item-label'] ? slots['item-label']() : (_props$itemLabels2 = props.itemLabels) != null && _props$itemLabels2[i] ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", null, [(_props$itemLabels3 = props.itemLabels) == null ? void 0 : _props$itemLabels3[i]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("\xA0")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
            "class": ['v-rating__item', {
              'v-rating__item--focused': Math.ceil(focusIndex.value) === value
            }]
          }, [props.halfIncrements ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(VRatingItem, {
            "value": value - 0.5,
            "index": i * 2
          }, null, 8, ["value", "index"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(VRatingItem, {
            "value": value,
            "index": i * 2 + 1
          }, null, 8, ["value", "index"])]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(VRatingItem, {
            "value": value,
            "index": i
          }, null, 8, ["value", "index"])], 2)]);
        })],
        _: 1
      }, 8, ["class"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VRating/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VRating/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRating": () => (/* reexport safe */ _VRating__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _VRating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VRating */ "./src/components/VRating/VRating.tsx");


/***/ }),

/***/ "./src/components/VResponsive/VResponsive.tsx":
/*!****************************************************!*\
  !*** ./src/components/VResponsive/VResponsive.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useAspectStyles": () => (/* binding */ useAspectStyles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VResponsive_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VResponsive.sass */ "./src/components/VResponsive/VResponsive.sass");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables

 // Utilities



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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VResponsive',
  props: {
    aspectRatio: [String, Number],
    contentClass: String,
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.makeDimensionProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_3__.useDimension)(props);
    const {
      aspectStyles
    } = useAspectStyles(props);
    return () => {
      var _slots$additional;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-responsive",
        "style": dimensionStyles.value
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null, 4), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots), slots.default && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": ['v-responsive__content', props.contentClass]
      }, [slots.default()], 2)], 4);
    };
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSheet_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VSheet.sass */ "./src/components/VSheet/VSheet.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables








 // Utilities



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VSheet',
  props: {
    color: {
      type: String,
      default: 'surface'
    },
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_4__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_6__.makePositionProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_10__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'color'));
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-sheet');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_4__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_6__.usePosition)(props, 'v-sheet');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.useRounded)(props, 'v-sheet');
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": ['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, dimensionStyles.value, positionStyles.value]
    }, slots, 8, ["class", "style"]);
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


/***/ }),

/***/ "./src/components/VSystemBar/VSystemBar.tsx":
/*!**************************************************!*\
  !*** ./src/components/VSystemBar/VSystemBar.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSystemBar_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VSystemBar.sass */ "./src/components/VSystemBar/VSystemBar.sass");
/* harmony import */ var _composables_border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/border */ "./src/composables/border.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_position__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/position */ "./src/composables/position.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables







 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VSystemBar',
  props: {
    lightsOut: Boolean,
    window: Boolean,
    ...(0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.makeBorderProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_4__.makeDimensionProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.makeElevationProps)(),
    ...(0,_composables_position__WEBPACK_IMPORTED_MODULE_6__.makePositionProps)(),
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.makeRoundedProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_8__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_9__.useTheme)(props);
    const {
      borderClasses
    } = (0,_composables_border__WEBPACK_IMPORTED_MODULE_3__.useBorder)(props, 'v-system-bar');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_4__.useDimension)(props);
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_5__.useElevation)(props);
    const {
      positionClasses,
      positionStyles
    } = (0,_composables_position__WEBPACK_IMPORTED_MODULE_6__.usePosition)(props, 'v-system-bar');
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_7__.useRounded)(props, 'v-system-bar');
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
      "class": [{
        'v-system-bar': true,
        'v-system-bar--lights-out': props.lightsOut,
        'v-system-bar--window': props.window
      }, themeClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [dimensionStyles.value, positionStyles.value]
    }, slots, 8, ["class", "style"]);
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VThemeProvider.sass */ "./src/components/VThemeProvider/VThemeProvider.sass");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");

// Styles
 // Composables


 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VThemeProvider',
  props: {
    withBackground: Boolean,
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.makeThemeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.useTheme)(props);
    return () => {
      var _slots$default, _slots$default2;

      if (!props.withBackground) return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-theme-provider', themeClasses.value]
      }, {
        default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
      }, 8, ["class"]);
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

/***/ "./src/components/VTimeline/VTimeline.tsx":
/*!************************************************!*\
  !*** ./src/components/VTimeline/VTimeline.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VTimeline_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTimeline.sass */ "./src/components/VTimeline/VTimeline.sass");
/* harmony import */ var _VTimelineItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VTimelineItem */ "./src/components/VTimeline/VTimelineItem.tsx");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_density__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/density */ "./src/composables/density.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared */ "./src/components/VTimeline/shared.ts");

// Styles
 // Components

 // Composables



 // Helpers



 // Types

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VTimeline',
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: v => ['vertical', 'horizontal'].includes(v)
    },
    side: {
      type: String,
      validator: v => v == null || ['start', 'end'].includes(v)
    },
    lineInset: {
      type: [String, Number],
      default: 0
    },
    lineThickness: {
      type: [String, Number],
      default: 2
    },
    lineColor: String,
    truncateLine: {
      type: String,
      default: 'start',
      validator: v => ['none', 'start', 'end', 'both'].includes(v)
    },
    ...(0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.makeDensityProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_4__.makeTagProps)(),
    ...(0,_composables_theme__WEBPACK_IMPORTED_MODULE_5__.makeThemeProps)()
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = (0,_composables_theme__WEBPACK_IMPORTED_MODULE_5__.useTheme)(props);
    const {
      densityClasses
    } = (0,_composables_density__WEBPACK_IMPORTED_MODULE_3__.useDensity)(props, 'v-timeline');
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(_shared__WEBPACK_IMPORTED_MODULE_6__.VTimelineSymbol, {
      density: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'density'),
      lineColor: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'lineColor')
    });
    const sideClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
      return side && `v-timeline--side-${side}`;
    });
    return () => {
      var _slots$default;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, {
        "class": ['v-timeline', `v-timeline--${props.direction}`, {
          'v-timeline--inset-line': !!props.lineInset,
          'v-timeline--truncate-line-end': props.truncateLine === 'end' || props.truncateLine === 'both'
        }, themeClasses.value, densityClasses.value, sideClass.value],
        "style": {
          '--v-timeline-line-thickness': (0,_util__WEBPACK_IMPORTED_MODULE_7__.convertToUnit)(props.lineThickness),
          '--v-timeline-line-inset': (0,_util__WEBPACK_IMPORTED_MODULE_7__.convertToUnit)(props.lineInset || undefined)
        }
      }, {
        default: () => [(props.truncateLine === 'none' || props.truncateLine === 'end') && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VTimelineItem__WEBPACK_IMPORTED_MODULE_8__.default, {
          "hideDot": true
        }, null, 8, ["hideDot"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

}));

/***/ }),

/***/ "./src/components/VTimeline/VTimelineDivider.tsx":
/*!*******************************************************!*\
  !*** ./src/components/VTimeline/VTimelineDivider.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/VIcon.tsx");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared */ "./src/components/VTimeline/shared.ts");
/* harmony import */ var _composables_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/color */ "./src/composables/color.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");

// Components

 // Composables




 // Utilities


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VTimelineDivider',
  props: {
    hideDot: Boolean,
    lineColor: String,
    icon: String,
    iconColor: String,
    fillDot: Boolean,
    dotColor: String,
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_1__.makeRoundedProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_2__.makeSizeProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_3__.makeElevationProps)()
  },

  setup(props, {
    slots
  }) {
    const timeline = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(_shared__WEBPACK_IMPORTED_MODULE_4__.VTimelineSymbol);
    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
    const {
      sizeClasses,
      sizeStyles
    } = (0,_composables_size__WEBPACK_IMPORTED_MODULE_2__.useSize)(props, 'v-timeline-divider__dot');
    const {
      backgroundColorStyles,
      backgroundColorClasses
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_5__.useBackgroundColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'dotColor'));
    const {
      backgroundColorStyles: lineColorStyles,
      backgroundColorClasses: lineColorClasses
    } = (0,_composables_color__WEBPACK_IMPORTED_MODULE_5__.useBackgroundColor)(timeline.lineColor);
    const {
      roundedClasses
    } = (0,_composables_rounded__WEBPACK_IMPORTED_MODULE_1__.useRounded)(props, 'v-timeline-divider__dot');
    const {
      elevationClasses
    } = (0,_composables_elevation__WEBPACK_IMPORTED_MODULE_3__.useElevation)(props);
    return () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": ['v-timeline-divider', {
        'v-timeline-divider--fill-dot': props.fillDot
      }]
    }, [!props.hideDot && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": ['v-timeline-divider__dot', roundedClasses.value, sizeClasses.value, elevationClasses.value],
      "style": sizeStyles.value
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": ['v-timeline-divider__inner-dot', roundedClasses.value, backgroundColorClasses.value],
      "style": backgroundColorStyles.value
    }, [slots.default ? slots.default({
      icon: props.icon,
      iconColor: props.iconColor,
      size: props.size
    }) : props.icon ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VIcon__WEBPACK_IMPORTED_MODULE_6__.default, {
      "icon": props.icon,
      "color": props.iconColor,
      "size": props.size
    }, null, 8, ["icon", "color", "size"]) : undefined], 6)], 6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": ['v-timeline-divider__line', lineColorClasses.value],
      "style": lineColorStyles.value
    }, null, 6)], 2);
  }

}));

/***/ }),

/***/ "./src/components/VTimeline/VTimelineItem.tsx":
/*!****************************************************!*\
  !*** ./src/components/VTimeline/VTimelineItem.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared */ "./src/components/VTimeline/shared.ts");
/* harmony import */ var _VTimelineDivider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VTimelineDivider */ "./src/components/VTimeline/VTimelineDivider.tsx");
/* harmony import */ var _composables_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../composables/tag */ "./src/composables/tag.ts");
/* harmony import */ var _composables_size__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../composables/size */ "./src/composables/size.ts");
/* harmony import */ var _composables_elevation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../composables/elevation */ "./src/composables/elevation.ts");
/* harmony import */ var _composables_rounded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../composables/rounded */ "./src/composables/rounded.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
/* harmony import */ var _composables_dimensions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../composables/dimensions */ "./src/composables/dimensions.ts");

// Types
// Components

 // Composables




 // Utilities




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VTimelineItem',
  props: {
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    hideOpposite: {
      type: Boolean,
      default: undefined
    },
    icon: String,
    iconColor: String,
    ...(0,_composables_rounded__WEBPACK_IMPORTED_MODULE_2__.makeRoundedProps)(),
    ...(0,_composables_elevation__WEBPACK_IMPORTED_MODULE_3__.makeElevationProps)(),
    ...(0,_composables_size__WEBPACK_IMPORTED_MODULE_4__.makeSizeProps)(),
    ...(0,_composables_tag__WEBPACK_IMPORTED_MODULE_5__.makeTagProps)(),
    ...(0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_6__.makeDimensionProps)()
  },

  setup(props, {
    slots
  }) {
    const timeline = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(_shared__WEBPACK_IMPORTED_MODULE_7__.VTimelineSymbol);
    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
    const {
      dimensionStyles
    } = (0,_composables_dimensions__WEBPACK_IMPORTED_MODULE_6__.useDimension)(props);
    const dotSize = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const dotRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(dotRef, newValue => {
      var _newValue$$el$querySe, _newValue$$el$querySe2;

      if (!newValue) return;
      dotSize.value = (_newValue$$el$querySe = (_newValue$$el$querySe2 = newValue.$el.querySelector('.v-timeline-divider__dot')) == null ? void 0 : _newValue$$el$querySe2.getBoundingClientRect().width) != null ? _newValue$$el$querySe : 0;
    }, {
      flush: 'post'
    });
    return () => {
      var _slots$default, _slots$opposite;

      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": ['v-timeline-item', {
          'v-timeline-item--fill-dot': props.fillDot
        }],
        "style": {
          // @ts-expect-error: broken vue types
          '--v-timeline-dot-size': (0,_util__WEBPACK_IMPORTED_MODULE_8__.convertToUnit)(dotSize.value)
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-timeline-item__body",
        "style": dimensionStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_VTimelineDivider__WEBPACK_IMPORTED_MODULE_9__.default, {
        "ref": dotRef,
        "hideDot": props.hideDot,
        "icon": props.icon,
        "iconColor": props.iconColor,
        "size": props.size,
        "elevation": props.elevation,
        "dotColor": props.dotColor,
        "fillDot": props.fillDot,
        "rounded": props.rounded
      }, {
        default: slots.icon
      }, 8, ["hideDot", "icon", "iconColor", "size", "elevation", "dotColor", "fillDot", "rounded"]), timeline.density.value !== 'compact' && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        "class": "v-timeline-item__opposite"
      }, [!props.hideOpposite && ((_slots$opposite = slots.opposite) == null ? void 0 : _slots$opposite.call(slots))])], 6);
    };
  }

}));

/***/ }),

/***/ "./src/components/VTimeline/index.ts":
/*!*******************************************!*\
  !*** ./src/components/VTimeline/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VTimeline": () => (/* reexport safe */ _VTimeline__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VTimelineItem": () => (/* reexport safe */ _VTimelineItem__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _VTimeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTimeline */ "./src/components/VTimeline/VTimeline.tsx");
/* harmony import */ var _VTimelineItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTimelineItem */ "./src/components/VTimeline/VTimelineItem.tsx");



/***/ }),

/***/ "./src/components/VTimeline/shared.ts":
/*!********************************************!*\
  !*** ./src/components/VTimeline/shared.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VTimelineSymbol": () => (/* binding */ VTimelineSymbol)
/* harmony export */ });
const VTimelineSymbol = Symbol.for('vuetify:timeline');

/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VApp": () => (/* reexport safe */ _VApp__WEBPACK_IMPORTED_MODULE_0__.VApp),
/* harmony export */   "VAppBar": () => (/* reexport safe */ _VAppBar__WEBPACK_IMPORTED_MODULE_1__.VAppBar),
/* harmony export */   "VAppBarNavIcon": () => (/* reexport safe */ _VAppBar__WEBPACK_IMPORTED_MODULE_1__.VAppBarNavIcon),
/* harmony export */   "VAppBarTitle": () => (/* reexport safe */ _VAppBar__WEBPACK_IMPORTED_MODULE_1__.VAppBarTitle),
/* harmony export */   "VAlert": () => (/* reexport safe */ _VAlert__WEBPACK_IMPORTED_MODULE_2__.VAlert),
/* harmony export */   "VAvatar": () => (/* reexport safe */ _VAvatar__WEBPACK_IMPORTED_MODULE_3__.VAvatar),
/* harmony export */   "VBadge": () => (/* reexport safe */ _VBadge__WEBPACK_IMPORTED_MODULE_4__.VBadge),
/* harmony export */   "VBanner": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_5__.VBanner),
/* harmony export */   "VBannerActions": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_5__.VBannerActions),
/* harmony export */   "VBannerAvatar": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_5__.VBannerAvatar),
/* harmony export */   "VBannerContent": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_5__.VBannerContent),
/* harmony export */   "VBannerText": () => (/* reexport safe */ _VBanner__WEBPACK_IMPORTED_MODULE_5__.VBannerText),
/* harmony export */   "VBottomNavigation": () => (/* reexport safe */ _VBottomNavigation__WEBPACK_IMPORTED_MODULE_6__.VBottomNavigation),
/* harmony export */   "VBreadcrumbs": () => (/* reexport safe */ _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__.VBreadcrumbs),
/* harmony export */   "VBreadcrumbsDivider": () => (/* reexport safe */ _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__.VBreadcrumbsDivider),
/* harmony export */   "VBreadcrumbsItem": () => (/* reexport safe */ _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__.VBreadcrumbsItem),
/* harmony export */   "VBtn": () => (/* reexport safe */ _VBtn__WEBPACK_IMPORTED_MODULE_8__.VBtn),
/* harmony export */   "VCard": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCard),
/* harmony export */   "VCardActions": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardActions),
/* harmony export */   "VCardAvatar": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardAvatar),
/* harmony export */   "VCardHeader": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardHeader),
/* harmony export */   "VCardHeaderText": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardHeaderText),
/* harmony export */   "VCardImg": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardImg),
/* harmony export */   "VCardItem": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardItem),
/* harmony export */   "VCardSubtitle": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardSubtitle),
/* harmony export */   "VCardText": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardText),
/* harmony export */   "VCardTitle": () => (/* reexport safe */ _VCard__WEBPACK_IMPORTED_MODULE_9__.VCardTitle),
/* harmony export */   "VChip": () => (/* reexport safe */ _VChip__WEBPACK_IMPORTED_MODULE_10__.VChip),
/* harmony export */   "VCode": () => (/* reexport safe */ _VCode__WEBPACK_IMPORTED_MODULE_11__.VCode),
/* harmony export */   "VDefaultsProvider": () => (/* reexport safe */ _VDefaultsProvider__WEBPACK_IMPORTED_MODULE_12__.VDefaultsProvider),
/* harmony export */   "VDialog": () => (/* reexport safe */ _VDialog__WEBPACK_IMPORTED_MODULE_13__.VDialog),
/* harmony export */   "VDivider": () => (/* reexport safe */ _VDivider__WEBPACK_IMPORTED_MODULE_14__.VDivider),
/* harmony export */   "VFooter": () => (/* reexport safe */ _VFooter__WEBPACK_IMPORTED_MODULE_15__.VFooter),
/* harmony export */   "VCol": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_16__.VCol),
/* harmony export */   "VContainer": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_16__.VContainer),
/* harmony export */   "VRow": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_16__.VRow),
/* harmony export */   "VSpacer": () => (/* reexport safe */ _VGrid__WEBPACK_IMPORTED_MODULE_16__.VSpacer),
/* harmony export */   "VHover": () => (/* reexport safe */ _VHover__WEBPACK_IMPORTED_MODULE_17__.VHover),
/* harmony export */   "VClassIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_18__.VClassIcon),
/* harmony export */   "VComponentIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_18__.VComponentIcon),
/* harmony export */   "VIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_18__.VIcon),
/* harmony export */   "VLigatureIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_18__.VLigatureIcon),
/* harmony export */   "VSvgIcon": () => (/* reexport safe */ _VIcon__WEBPACK_IMPORTED_MODULE_18__.VSvgIcon),
/* harmony export */   "VImg": () => (/* reexport safe */ _VImg__WEBPACK_IMPORTED_MODULE_19__.VImg),
/* harmony export */   "VInput": () => (/* reexport safe */ _VInput__WEBPACK_IMPORTED_MODULE_20__.VInput),
/* harmony export */   "VInputLabel": () => (/* reexport safe */ _VInput__WEBPACK_IMPORTED_MODULE_20__.VInputLabel),
/* harmony export */   "VKbd": () => (/* reexport safe */ _VKbd__WEBPACK_IMPORTED_MODULE_21__.VKbd),
/* harmony export */   "VItem": () => (/* reexport safe */ _VItemGroup__WEBPACK_IMPORTED_MODULE_22__.VItem),
/* harmony export */   "VItemGroup": () => (/* reexport safe */ _VItemGroup__WEBPACK_IMPORTED_MODULE_22__.VItemGroup),
/* harmony export */   "VLayout": () => (/* reexport safe */ _VLayout__WEBPACK_IMPORTED_MODULE_23__.VLayout),
/* harmony export */   "VLayoutItem": () => (/* reexport safe */ _VLayout__WEBPACK_IMPORTED_MODULE_23__.VLayoutItem),
/* harmony export */   "VLocaleProvider": () => (/* reexport safe */ _VLocaleProvider__WEBPACK_IMPORTED_MODULE_24__.VLocaleProvider),
/* harmony export */   "VList": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VList),
/* harmony export */   "VListImg": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListImg),
/* harmony export */   "VListItem": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListItem),
/* harmony export */   "VListItemAvatar": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListItemAvatar),
/* harmony export */   "VListItemHeader": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListItemHeader),
/* harmony export */   "VListItemMedia": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListItemMedia),
/* harmony export */   "VListItemSubtitle": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListItemSubtitle),
/* harmony export */   "VListItemTitle": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListItemTitle),
/* harmony export */   "VListSubheader": () => (/* reexport safe */ _VList__WEBPACK_IMPORTED_MODULE_25__.VListSubheader),
/* harmony export */   "VLazy": () => (/* reexport safe */ _VLazy__WEBPACK_IMPORTED_MODULE_26__.VLazy),
/* harmony export */   "VMain": () => (/* reexport safe */ _VMain__WEBPACK_IMPORTED_MODULE_27__.VMain),
/* harmony export */   "VNavigationDrawer": () => (/* reexport safe */ _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_28__.VNavigationDrawer),
/* harmony export */   "VOverlay": () => (/* reexport safe */ _VOverlay__WEBPACK_IMPORTED_MODULE_29__.VOverlay),
/* harmony export */   "VPagination": () => (/* reexport safe */ _VPagination__WEBPACK_IMPORTED_MODULE_30__.VPagination),
/* harmony export */   "VPaginationBtn": () => (/* reexport safe */ _VPagination__WEBPACK_IMPORTED_MODULE_30__.VPaginationBtn),
/* harmony export */   "VSheet": () => (/* reexport safe */ _VSheet__WEBPACK_IMPORTED_MODULE_31__.VSheet),
/* harmony export */   "VProgressCircular": () => (/* reexport safe */ _VProgressCircular__WEBPACK_IMPORTED_MODULE_32__.VProgressCircular),
/* harmony export */   "VRating": () => (/* reexport safe */ _VRating__WEBPACK_IMPORTED_MODULE_33__.VRating),
/* harmony export */   "VResponsive": () => (/* reexport safe */ _VResponsive__WEBPACK_IMPORTED_MODULE_34__.VResponsive),
/* harmony export */   "VSystemBar": () => (/* reexport safe */ _VSystemBar__WEBPACK_IMPORTED_MODULE_35__.VSystemBar),
/* harmony export */   "VThemeProvider": () => (/* reexport safe */ _VThemeProvider__WEBPACK_IMPORTED_MODULE_36__.VThemeProvider),
/* harmony export */   "VTimeline": () => (/* reexport safe */ _VTimeline__WEBPACK_IMPORTED_MODULE_37__.VTimeline),
/* harmony export */   "VTimelineItem": () => (/* reexport safe */ _VTimeline__WEBPACK_IMPORTED_MODULE_37__.VTimelineItem),
/* harmony export */   "VCarouselReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VCarouselReverseTransition),
/* harmony export */   "VCarouselTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VCarouselTransition),
/* harmony export */   "VDialogBottomTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VDialogBottomTransition),
/* harmony export */   "VDialogTopTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VDialogTopTransition),
/* harmony export */   "VDialogTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VDialogTransition),
/* harmony export */   "VExpandTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VExpandTransition),
/* harmony export */   "VExpandXTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VExpandXTransition),
/* harmony export */   "VFabTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VFabTransition),
/* harmony export */   "VFadeTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VFadeTransition),
/* harmony export */   "VMenuTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VMenuTransition),
/* harmony export */   "VScaleTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VScaleTransition),
/* harmony export */   "VScrollXReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VScrollXReverseTransition),
/* harmony export */   "VScrollXTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VScrollXTransition),
/* harmony export */   "VScrollYReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VScrollYReverseTransition),
/* harmony export */   "VScrollYTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VScrollYTransition),
/* harmony export */   "VSlideXReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VSlideXReverseTransition),
/* harmony export */   "VSlideXTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VSlideXTransition),
/* harmony export */   "VSlideYReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VSlideYReverseTransition),
/* harmony export */   "VSlideYTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VSlideYTransition),
/* harmony export */   "VTabReverseTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VTabReverseTransition),
/* harmony export */   "VTabTransition": () => (/* reexport safe */ _transitions__WEBPACK_IMPORTED_MODULE_38__.VTabTransition)
/* harmony export */ });
/* harmony import */ var _VApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VApp */ "./src/components/VApp/index.ts");
/* harmony import */ var _VAppBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAppBar */ "./src/components/VAppBar/index.ts");
/* harmony import */ var _VAlert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VAlert */ "./src/components/VAlert/index.ts");
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VAvatar */ "./src/components/VAvatar/index.ts");
/* harmony import */ var _VBadge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VBadge */ "./src/components/VBadge/index.ts");
/* harmony import */ var _VBanner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VBanner */ "./src/components/VBanner/index.ts");
/* harmony import */ var _VBottomNavigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VBottomNavigation */ "./src/components/VBottomNavigation/index.ts");
/* harmony import */ var _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VBreadcrumbs */ "./src/components/VBreadcrumbs/index.ts");
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _VCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VCard */ "./src/components/VCard/index.ts");
/* harmony import */ var _VChip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./VChip */ "./src/components/VChip/index.ts");
/* harmony import */ var _VCode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./VCode */ "./src/components/VCode/index.ts");
/* harmony import */ var _VDefaultsProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./VDefaultsProvider */ "./src/components/VDefaultsProvider/index.ts");
/* harmony import */ var _VDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VDialog */ "./src/components/VDialog/index.ts");
/* harmony import */ var _VDivider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./VDivider */ "./src/components/VDivider/index.ts");
/* harmony import */ var _VFooter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./VFooter */ "./src/components/VFooter/index.ts");
/* harmony import */ var _VGrid__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./VGrid */ "./src/components/VGrid/index.ts");
/* harmony import */ var _VHover__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VHover */ "./src/components/VHover/index.ts");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./VImg */ "./src/components/VImg/index.ts");
/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./VInput */ "./src/components/VInput/index.ts");
/* harmony import */ var _VKbd__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./VKbd */ "./src/components/VKbd/index.ts");
/* harmony import */ var _VItemGroup__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./VItemGroup */ "./src/components/VItemGroup/index.ts");
/* harmony import */ var _VLayout__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./VLayout */ "./src/components/VLayout/index.ts");
/* harmony import */ var _VLocaleProvider__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./VLocaleProvider */ "./src/components/VLocaleProvider/index.ts");
/* harmony import */ var _VList__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./VList */ "./src/components/VList/index.ts");
/* harmony import */ var _VLazy__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./VLazy */ "./src/components/VLazy/index.ts");
/* harmony import */ var _VMain__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./VMain */ "./src/components/VMain/index.ts");
/* harmony import */ var _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./VNavigationDrawer */ "./src/components/VNavigationDrawer/index.ts");
/* harmony import */ var _VOverlay__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./VOverlay */ "./src/components/VOverlay/index.ts");
/* harmony import */ var _VPagination__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./VPagination */ "./src/components/VPagination/index.ts");
/* harmony import */ var _VSheet__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./VSheet */ "./src/components/VSheet/index.ts");
/* harmony import */ var _VProgressCircular__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./VProgressCircular */ "./src/components/VProgressCircular/index.ts");
/* harmony import */ var _VRating__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./VRating */ "./src/components/VRating/index.ts");
/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./VResponsive */ "./src/components/VResponsive/index.ts");
/* harmony import */ var _VSystemBar__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./VSystemBar */ "./src/components/VSystemBar/index.ts");
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./VThemeProvider */ "./src/components/VThemeProvider/index.ts");
/* harmony import */ var _VTimeline__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./VTimeline */ "./src/components/VTimeline/index.ts");
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./transitions */ "./src/components/transitions/index.ts");


 // export * from './VAutocomplete'




 // export * from './VBottomSheet'


 // export * from './VBtnToggle'
// export * from './VCalendar'

 // export * from './VCarousel'
// export * from './VCheckbox'

 // export * from './VChipGroup'

 // export * from './VColorPicker'
// export * from './VContent'
// export * from './VCombobox'
// export * from './VCounter'
// export * from './VData'
// export * from './VDataIterator'
// export * from './VDataTable'
// export * from './VDatePicker'



 // export * from './VExpansionPanel'
// export * from './VFileInput'

 // export * from './VForm'





 // export * from './VItemGroup'


 // export * from './VLabel'





 // export * from './VMenu'
// export * from './VMessages'

 // export * from './VOverflowBtn'



 // export * from './VParallax'
// export * from './VPicker'

 // export * from './VProgressLinear'
// export * from './VRadioGroup'
// export * from './VRangeSlider'


 // export * from './VSelect'
// export * from './VSkeletonLoader'
// export * from './VSlider'
// export * from './VSlideGroup'
// export * from './VSnackbar'
// export * from './VSparkline'
// export * from './VSpeedDial'
// export * from './VStepper'
// export * from './VSwitch'

 // export * from './VTabs'
// export * from './VTextarea'
// export * from './VTextField'


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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
// Utilities

 // Types

function createCssTransition(name, origin = 'top center 0', mode) {
  return (0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
    name,
    props: {
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
    },

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
            if (props.leaveAbsolute) {
              const {
                offsetTop,
                offsetLeft,
                offsetWidth,
                offsetHeight
              } = el;
              el._transitionInitialStyles = {
                position: el.style.position,
                top: el.style.top,
                left: el.style.left,
                width: el.style.width,
                height: el.style.height
              };
              el.style.position = 'absolute';
              el.style.top = `${offsetTop}px`;
              el.style.left = `${offsetLeft}px`;
              el.style.width = `${offsetWidth}px`;
              el.style.height = `${offsetHeight}px`;
            }

            if (props.hideOnLeave) {
              el._initialDisplay = el.style.display;
              el.style.display = 'none';
            }
          },

          onAfterLeave(el) {
            if (props.leaveAbsolute && el != null && el._transitionInitialStyles) {
              const {
                position,
                top,
                left,
                width,
                height
              } = el._transitionInitialStyles;
              delete el._transitionInitialStyles;
              el.style.position = position || '';
              el.style.top = top || '';
              el.style.left = left || '';
              el.style.width = width || '';
              el.style.height = height || '';
            }

            if (props.hideOnLeave && el) {
              el.style.display = el._initialDisplay || '';
            }
          }

        }, slots.default);
      };
    }

  });
}
function createJavascriptTransition(name, functions, mode = 'in-out') {
  return (0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
    name,
    props: {
      mode: {
        type: String,
        default: mode
      }
    },

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

/***/ "./src/components/transitions/dialog-transition.tsx":
/*!**********************************************************!*\
  !*** ./src/components/transitions/dialog-transition.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/defineComponent.tsx");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util/easing.ts");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'VDialogTransition',
  props: {
    target: Object
  },

  setup(props, {
    slots
  }) {
    const functions = {
      onEnter(el, done) {
        const {
          x,
          y
        } = getDimensions(props.target, el);
        const animation = el.animate([{
          transform: `translate(${x}px, ${y}px) scale(0.1)`,
          opacity: 0
        }, {
          transform: ''
        }], {
          duration: 225,
          easing: _util__WEBPACK_IMPORTED_MODULE_2__.deceleratedEasing
        });
        animation.finished.then(() => done());
      },

      onLeave(el, done) {
        const {
          x,
          y
        } = getDimensions(props.target, el);
        const animation = el.animate([{
          transform: ''
        }, {
          transform: `translate(${x}px, ${y}px) scale(0.1)`,
          opacity: 0
        }], {
          duration: 125,
          easing: _util__WEBPACK_IMPORTED_MODULE_2__.acceleratedEasing
        });
        animation.finished.then(() => done());
      }

    };
    return () => {
      return props.target ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots, 16) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }

}));

function getDimensions(target, el) {
  const initialDisplay = el.style.display;
  const initialTransform = el.style.transform;
  el.style.transition = 'none';
  el.style.display = '';
  el.style.transform = 'none';
  const targetBox = target.getBoundingClientRect();
  const elBox = el.getBoundingClientRect();
  const x = targetBox.width / 2 + targetBox.left - (elBox.width / 2 + elBox.left);
  const y = targetBox.height / 2 + targetBox.top - (elBox.height / 2 + elBox.top);
  el.style.display = initialDisplay;
  el.style.transform = initialTransform;
  return {
    x,
    y
  };
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
  const offsetProperty = (0,vue__WEBPACK_IMPORTED_MODULE_0__.camelize)(`offset-${sizeProperty}`);
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
      const offset = `${el[offsetProperty]}px`;
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
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
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
/* harmony export */   "VExpandXTransition": () => (/* binding */ VExpandXTransition),
/* harmony export */   "VDialogTransition": () => (/* reexport safe */ _dialog_transition__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _createTransition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTransition */ "./src/components/transitions/createTransition.ts");
/* harmony import */ var _expand_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expand-transition */ "./src/components/transitions/expand-transition.ts");
/* harmony import */ var _dialog_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialog-transition */ "./src/components/transitions/dialog-transition.tsx");

 // Component specific transitions

const VCarouselTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('carousel-transition');
const VCarouselReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('carousel-reverse-transition');
const VTabTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('tab-transition');
const VTabReverseTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('tab-reverse-transition');
const VMenuTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('menu-transition');
const VFabTransition = (0,_createTransition__WEBPACK_IMPORTED_MODULE_0__.createCssTransition)('fab-transition', 'center center', 'out-in'); // Generic transitions

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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
// Utilities

 // Types

// Composables
const makeBorderProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  border: [Boolean, Number, String]
}, 'border');
function useBorder(props, name) {
  const borderClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];

    if (props.border != null && props.border !== false) {
      classes.push(`${name}--border`);
    }

    if (typeof props.border === 'string' && props.border !== '' || props.border === 0) {
      for (const value of String(props.border).split(' ')) {
        classes.push(`border-${value}`);
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/colorUtils.ts");
// Utilities

 // Types

// Composables
function useColor(colors) {
  const backgroundIsCssColor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.isCssColor)(colors.value.background));
  const textIsCssColor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.isCssColor)(colors.value.text));
  const colorClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];

    if (colors.value.background && !backgroundIsCssColor.value) {
      classes.push(`bg-${colors.value.background}`);
    }

    if (colors.value.text && !textIsCssColor.value) {
      classes.push(`text-${colors.value.text}`);
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

/***/ "./src/composables/defaults.ts":
/*!*************************************!*\
  !*** ./src/composables/defaults.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultsSymbol": () => (/* binding */ DefaultsSymbol),
/* harmony export */   "createDefaults": () => (/* binding */ createDefaults),
/* harmony export */   "useDefaults": () => (/* binding */ useDefaults),
/* harmony export */   "provideDefaults": () => (/* binding */ provideDefaults)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");


const DefaultsSymbol = Symbol.for('vuetify:defaults');
function createDefaults(options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(options != null ? options : {});
}
function useDefaults() {
  const defaults = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(DefaultsSymbol);
  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
  return defaults;
}
function provideDefaults(props) {
  const defaults = useDefaults();
  const newDefaults = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(defaults.value, props == null ? void 0 : props.defaults));
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(DefaultsSymbol, newDefaults);
  return newDefaults;
}

/***/ }),

/***/ "./src/composables/delay.ts":
/*!**********************************!*\
  !*** ./src/composables/delay.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeDelayProps": () => (/* binding */ makeDelayProps),
/* harmony export */   "useDelay": () => (/* binding */ useDelay)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/globals.ts");
// Utilities
 // Types

// Composables
const makeDelayProps = (0,_util__WEBPACK_IMPORTED_MODULE_0__.propsFactory)({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, 'delay');
function useDelay(props, cb) {
  const delays = {};

  const runDelayFactory = prop => () => {
    // istanbul ignore next
    if (!_util__WEBPACK_IMPORTED_MODULE_1__.IN_BROWSER) return Promise.resolve(true);
    const active = prop === 'openDelay';
    delays.closeDelay && window.clearTimeout(delays.closeDelay);
    delete delays.closeDelay;
    delays.openDelay && window.clearTimeout(delays.openDelay);
    delete delays.openDelay;
    return new Promise(resolve => {
      var _props$prop;

      const delay = parseInt((_props$prop = props[prop]) != null ? _props$prop : 0, 10);
      delays[prop] = window.setTimeout(() => {
        cb == null ? void 0 : cb(active);
        resolve(active);
      }, delay);
    });
  };

  return {
    runCloseDelay: runDelayFactory('closeDelay'),
    runOpenDelay: runDelayFactory('openDelay')
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
// Utilities

 // Types

const allowedDensities = [null, 'default', 'comfortable', 'compact'];
// Composables
const makeDensityProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  density: {
    type: String,
    default: 'default',
    validator: v => allowedDensities.includes(v)
  }
}, 'density');
function useDensity(props, name) {
  const densityClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return `${name}--density-${props.density}`;
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
// Utilities

 // Types

// Composables
const makeDimensionProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, 'dimension');
function useDimension(props) {
  const dimensionStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
    height: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.height),
    maxHeight: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.maxHeight),
    maxWidth: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.maxWidth),
    minHeight: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.minHeight),
    minWidth: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.minWidth),
    width: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(props.width)
  }));
  return {
    dimensionStyles
  };
}

/***/ }),

/***/ "./src/composables/display.ts":
/*!************************************!*\
  !*** ./src/composables/display.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplaySymbol": () => (/* binding */ DisplaySymbol),
/* harmony export */   "createDisplay": () => (/* binding */ createDisplay),
/* harmony export */   "useDisplay": () => (/* binding */ useDisplay)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
/* harmony import */ var _util_globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/globals */ "./src/util/globals.ts");
// Utilities

 // Globals

 // Types

const DisplaySymbol = Symbol.for('vuetify:display');
const defaultDisplayOptions = {
  mobileBreakpoint: 'lg',
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};

const parseDisplayOptions = (options = defaultDisplayOptions) => {
  return (0,_util__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(defaultDisplayOptions, options);
}; // Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081


function getClientWidth() {
  return _util_globals__WEBPACK_IMPORTED_MODULE_2__.IN_BROWSER ? Math.max(document.documentElement.clientWidth, window.innerWidth) : 0; // SSR
}

function getClientHeight() {
  return _util_globals__WEBPACK_IMPORTED_MODULE_2__.IN_BROWSER ? Math.max(document.documentElement.clientHeight, window.innerHeight) : 0; // SSR
}

function getPlatform() {
  const userAgent = _util_globals__WEBPACK_IMPORTED_MODULE_2__.IN_BROWSER ? window.navigator.userAgent : 'ssr';

  function match(regexp) {
    return Boolean(userAgent.match(regexp));
  }

  const android = match(/android/i);
  const ios = match(/iphone|ipad|ipod/i);
  const cordova = match(/cordova/i);
  const electron = match(/electron/i);
  const chrome = match(/chrome/i);
  const edge = match(/edge/i);
  const firefox = match(/firefox/i);
  const opera = match(/opera/i);
  const win = match(/win/i);
  const mac = match(/mac/i);
  const linux = match(/linux/i);
  const ssr = match(/ssr/i);
  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: _util_globals__WEBPACK_IMPORTED_MODULE_2__.SUPPORTS_TOUCH,
    ssr
  };
}

function createDisplay(options) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(getClientHeight());
  const platform = getPlatform();
  const state = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({});
  const width = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(getClientWidth());

  function onResize() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  } // eslint-disable-next-line max-statements


  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect)(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'xxl';
    const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = !platform.ssr ? width.value < breakpointValue : platform.android || platform.ios || platform.opera;
    state.xs = xs;
    state.sm = sm;
    state.md = md;
    state.lg = lg;
    state.xl = xl;
    state.xxl = xxl;
    state.smAndUp = !xs;
    state.mdAndUp = !(xs || sm);
    state.lgAndUp = !(xs || sm || md);
    state.xlAndUp = !(xs || sm || md || lg);
    state.smAndDown = !(md || lg || xl || xxl);
    state.mdAndDown = !(lg || xl || xxl);
    state.lgAndDown = !(xl || xxl);
    state.xlAndDown = !xxl;
    state.name = name;
    state.height = height.value;
    state.width = width.value;
    state.mobile = mobile;
    state.mobileBreakpoint = mobileBreakpoint;
    state.platform = platform;
    state.thresholds = thresholds;
  });

  if (_util_globals__WEBPACK_IMPORTED_MODULE_2__.IN_BROWSER) {
    window.addEventListener('resize', onResize, {
      passive: true
    });
  }

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(state);
}
function useDisplay() {
  const display = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(DisplaySymbol);
  if (!display) throw new Error('Could not find Vuetify display injection');
  return display;
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
// Utilities

 // Types

// Composables
const makeElevationProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  elevation: {
    type: [Number, String],

    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }

  }
}, 'elevation');
function useElevation(props) {
  const elevationClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];
    if (props.elevation == null) return classes;
    classes.push(`elevation-${props.elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}

/***/ }),

/***/ "./src/composables/group.ts":
/*!**********************************!*\
  !*** ./src/composables/group.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeGroupProps": () => (/* binding */ makeGroupProps),
/* harmony export */   "makeGroupItemProps": () => (/* binding */ makeGroupItemProps),
/* harmony export */   "useGroupItem": () => (/* binding */ useGroupItem),
/* harmony export */   "useGroup": () => (/* binding */ useGroup)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _proxiedModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./proxiedModel */ "./src/composables/proxiedModel.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ "./src/util/console.ts");
// Utilities


 // Types

const makeGroupProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  modelValue: {
    type: [Number, Boolean, String, Array, Object],
    default: undefined
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String
}, 'group');
const makeGroupItemProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  value: {
    type: [Number, Boolean, String, Object],
    default: undefined
  },
  disabled: Boolean,
  selectedClass: String
}, 'group-item'); // Composables

function useGroupItem(props, injectKey) {
  const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();

  if (!vm) {
    throw new Error('[Vuetify] useGroupItem composable must be used inside a component setup function');
  }

  const group = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(injectKey, null);

  if (!group) {
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }

  const id = (0,_util__WEBPACK_IMPORTED_MODULE_2__.getUid)();
  const value = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'value');
  const disabled = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'disabled');
  group.register({
    id,
    value,
    disabled
  }, vm);
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
    group.unregister(id);
  });
  const isSelected = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return group.isSelected(id);
  });
  const selectedClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    var _group$selectedClass$;

    return isSelected.value && ((_group$selectedClass$ = group.selectedClass.value) != null ? _group$selectedClass$ : props.selectedClass);
  });
  return {
    isSelected,
    toggle: () => group.select(id, !isSelected.value),
    select: value => group.select(id, value),
    selectedClass,
    value,
    disabled
  };
}
function useGroup(props, injectKey) {
  let isUnmounted = false;
  const items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)([]);
  const selected = (0,_proxiedModel__WEBPACK_IMPORTED_MODULE_3__.useProxiedModel)(props, 'modelValue', [], v => {
    if (v == null) return [];
    return getIds(items, (0,_util__WEBPACK_IMPORTED_MODULE_2__.wrapInArray)(v));
  }, v => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();

  function register(item, vm) {
    // Is there a better way to fix this typing?
    const unwrapped = item;
    const children = (0,_util__WEBPACK_IMPORTED_MODULE_2__.findChildren)(groupVm == null ? void 0 : groupVm.vnode);
    const instances = children.slice(1) // First one is group component itself
    .filter(cmp => !!cmp.provides[injectKey]); // TODO: Fix in TS 4.4

    const index = instances.indexOf(vm);
    if (index > -1) items.splice(index, 0, unwrapped);else items.push(unwrapped);
  }

  function unregister(id) {
    if (isUnmounted) return;
    selected.value = selected.value.filter(v => v !== id);
    forceMandatoryValue();
    const index = items.findIndex(item => item.id === id);
    items.splice(index, 1);
  } // If mandatory and nothing is selected, then select first non-disabled item


  function forceMandatoryValue() {
    const item = items.find(item => !item.disabled);

    if (item && props.mandatory === 'force' && !selected.value.length) {
      selected.value = [item.id];
    }
  }

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
    forceMandatoryValue();
  });
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
    isUnmounted = true;
  });

  function select(id, isSelected) {
    const item = items.find(item => item.id === id);
    if (isSelected && item != null && item.disabled) return;

    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex(v => v === id); // We can't remove value if group is
      // mandatory, value already exists,
      // and it is the only value

      if (props.mandatory && index > -1 && internalValue.length <= 1) return; // We can't add value if it would
      // cause max limit to be exceeded

      if (props.max != null && index < 0 && internalValue.length + 1 > props.max) return;
      if (index < 0 && isSelected) internalValue.push(id);else if (index >= 0 && !isSelected) internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      if (props.mandatory && selected.value.includes(id)) return;
      selected.value = isSelected ? [id] : [];
    }
  }

  function step(offset) {
    // getting an offset from selected value obviously won't work with multiple values
    if (props.multiple) (0,_util__WEBPACK_IMPORTED_MODULE_4__.consoleWarn)('This method is not supported when using "multiple" prop');

    if (!selected.value.length) {
      const item = items.find(item => !item.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex(i => i.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];

      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }

      if (newItem.disabled) return;
      selected.value = [items[newIndex].id];
    }
  }

  const state = {
    register,
    unregister,
    selected,
    select,
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: id => selected.value.includes(id),
    selectedClass: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.selectedClass)
  };
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(injectKey, state);
  return state;
}

function getIds(items, modelValue) {
  const ids = [];

  for (const item of items) {
    if (item.value != null) {
      if (modelValue.find(value => (0,_util__WEBPACK_IMPORTED_MODULE_2__.deepEqual)(value, item.value))) {
        ids.push(item.id);
      }
    } else if (modelValue.includes(item.id)) {
      ids.push(item.id);
    }
  }

  return ids;
}

function getValues(items, ids) {
  const values = [];

  for (const item of items) {
    if (ids.includes(item.id)) {
      values.push(item.value != null ? item.value : item.id);
    }
  }

  return values;
}

/***/ }),

/***/ "./src/composables/icons.tsx":
/*!***********************************!*\
  !*** ./src/composables/icons.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconSymbol": () => (/* binding */ IconSymbol),
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/defineComponent.tsx");

// Utilities

 // Types

const IconSymbol = Symbol.for('vuetify:icons');
const makeIconProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
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
const VComponentIcon = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VComponentIcon',
  props: makeIconProps(),

  setup(props) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, null, {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.icon, null, null)]
      });
    };
  }

});
const VSvgIcon = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: makeIconProps(),

  setup(props, {
    attrs
  }) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)(attrs, {
        "style": null
      }), {
        default: () => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("path", {
          "d": props.icon
        }, null, 8, ["d"])])]
      }, 16);
    };
  }

});
const VLigatureIcon = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VLigatureIcon',
  props: makeIconProps(),

  setup(props) {
    return () => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }

});
const VClassIcon = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  name: 'VClassIcon',
  props: makeIconProps(),

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
  const icons = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(IconSymbol);
  if (!icons) throw new Error('Missing Vuetify Icons provide!');
  const iconData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const iconAlias = (0,vue__WEBPACK_IMPORTED_MODULE_0__.isRef)(props) ? props.value : props.icon;
    if (!iconAlias) throw new Error('Icon value is undefined or null');
    let icon = iconAlias;

    if (typeof iconAlias === 'string' && iconAlias.includes('$')) {
      var _icons$aliases;

      icon = (_icons$aliases = icons.aliases) == null ? void 0 : _icons$aliases[iconAlias.slice(iconAlias.indexOf('$') + 1)];
    }

    if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`);

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
      throw new Error(`Could not find icon set "${setName}"`);
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

/***/ "./src/composables/intersectionObserver.ts":
/*!*************************************************!*\
  !*** ./src/composables/intersectionObserver.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIntersectionObserver": () => (/* binding */ useIntersectionObserver)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Utilities

function useIntersectionObserver(callback) {
  const intersectionRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
  const isIntersecting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  const observer = new IntersectionObserver(entries => {
    callback == null ? void 0 : callback(entries, observer);
    isIntersecting.value = !!entries.find(entry => entry.isIntersecting);
  });
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
    observer.disconnect();
  });
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(intersectionRef, (newValue, oldValue) => {
    if (oldValue) {
      observer.unobserve(oldValue);
      isIntersecting.value = false;
    }

    if (newValue) observer.observe(newValue);
  }, {
    flush: 'post'
  });
  return {
    intersectionRef,
    isIntersecting
  };
}

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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
// Utilities

 // Types

const VuetifyLayoutKey = Symbol.for('vuetify:layout');
const makeLayoutProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, 'layout'); // Composables

const makeLayoutItemProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  name: {
    type: String
  },
  priority: {
    type: Number,
    default: 0
  },
  absolute: Boolean
}, 'layout-item');
function useMain() {
  const layout = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyLayoutKey);
  if (!layout) throw new Error('Could not find injected Vuetify layout');
  return layout;
}
function useLayoutItem(name, priority, position, layoutSize, elementSize, active) {
  const layout = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyLayoutKey);
  if (!layout) throw new Error('Could not find injected Vuetify layout');
  const id = name != null ? name : `layout-item-${(0,_util__WEBPACK_IMPORTED_MODULE_2__.getUid)()}`;
  const styles = layout.register(id, priority, position, layoutSize, elementSize, active);
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => layout.unregister(id));
  return styles;
}

const generateLayers = (layout, registered, positions, layoutSizes, activeItems) => {
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
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active) continue;
    const layer = { ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
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
  const layoutSizes = new Map();
  const priorities = new Map();
  const activeItems = new Map();
  const computedOverlaps = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    var _props$overlaps;

    const map = new Map();
    const overlaps = (_props$overlaps = props.overlaps) != null ? _props$overlaps : [];

    for (const overlap of overlaps.filter(item => item.includes(':'))) {
      const [top, bottom] = overlap.split(':');
      if (!registered.value.includes(top) || !registered.value.includes(bottom)) continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
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
    return generateLayers(sortedEntries, registered.value, positions, layoutSizes, activeItems);
  });
  const mainStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const layer = layers.value[layers.value.length - 1].layer;
    return {
      position: 'relative',
      paddingLeft: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.left),
      paddingRight: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.right),
      paddingTop: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.top),
      paddingBottom: (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(layer.bottom)
    };
  });
  const items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return layers.value.slice(1).map(({
      id
    }, index) => {
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
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
    register: (id, priority, position, layoutSize, elementSize, active) => {
      priorities.set(id, priority);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      registered.value.push(id);
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
        const index = items.value.findIndex(i => i.id === id);
        if (index < 0) throw new Error(`Layout item "${id}" is missing from layout prop`);
        const item = items.value[index];
        if (!item) throw new Error(`Could not find layout item "${id}`);
        const overlap = computedOverlaps.value.get(id);

        if (overlap) {
          item[overlap.position] += overlap.amount;
        }

        const isHorizontal = position.value === 'left' || position.value === 'right';
        const isOppositeHorizontal = position.value === 'right';
        const isOppositeVertical = position.value === 'bottom';
        return {
          [position.value]: 0,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : `${elementSize.value}px`,
          marginLeft: isOppositeHorizontal ? undefined : `${item.left}px`,
          marginRight: isOppositeHorizontal ? `${item.right}px` : undefined,
          marginTop: position.value !== 'bottom' ? `${item.top}px` : undefined,
          marginBottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : `${elementSize.value}px`,
          zIndex: layers.value.length - index,
          transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`
        };
      });
    },
    unregister: id => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      registered.value = registered.value.filter(v => v !== id);
    },
    mainStyles,
    getLayoutItem,
    items
  });
  const layoutClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ['v-layout', {
    'v-layout--full-height': props.fullHeight
  }]);
  return {
    layoutClasses,
    getLayoutItem,
    items
  };
}

/***/ }),

/***/ "./src/composables/locale.ts":
/*!***********************************!*\
  !*** ./src/composables/locale.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocaleAdapterSymbol": () => (/* binding */ LocaleAdapterSymbol),
/* harmony export */   "VuetifyLocaleSymbol": () => (/* binding */ VuetifyLocaleSymbol),
/* harmony export */   "provideLocale": () => (/* binding */ provideLocale),
/* harmony export */   "useLocale": () => (/* binding */ useLocale),
/* harmony export */   "createLocaleAdapter": () => (/* binding */ createLocaleAdapter),
/* harmony export */   "createDefaultLocaleAdapter": () => (/* binding */ createDefaultLocaleAdapter)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/console.ts");
/* harmony import */ var _locale_en__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../locale/en */ "./src/locale/en.ts");


 // Types

const LocaleAdapterSymbol = Symbol.for('vuetify:locale-adapter');
const VuetifyLocaleSymbol = Symbol.for('vuetify:locale');
function provideLocale(props) {
  const adapter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(LocaleAdapterSymbol);
  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter');
  return adapter.createScope(props);
}
function useLocale() {
  const adapter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(LocaleAdapterSymbol);
  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter');
  return adapter.getScope();
}

function isLocaleAdapter(x) {
  return !!x && x.hasOwnProperty('getScope') && x.hasOwnProperty('createScope') && x.hasOwnProperty('createRoot');
}

function createLocaleAdapter(app, options) {
  const adapter = isLocaleAdapter(options) ? options : createDefaultLocaleAdapter(options);
  const rootInstance = adapter.createRoot(app);
  return {
    adapter,
    rootInstance
  };
}
const LANG_PREFIX = '$vuetify.';

const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    /* istanbul ignore next */
    return String(params[+index]);
  });
};

const createTranslateFunction = (current, fallback, messages) => {
  return (key, ...params) => {
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params);
    }

    const shortKey = key.replace(LANG_PREFIX, '');
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getObjectValueByPath)(currentLocale, shortKey, null);

    if (!str) {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.consoleWarn)(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getObjectValueByPath)(fallbackLocale, shortKey, null);
    }

    if (!str) {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.consoleError)(`Translation key "${key}" not found in fallback`);
      str = key;
    }

    if (typeof str !== 'string') {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.consoleError)(`Translation key "${key}" has a non-string value`);
      str = key;
    }

    return replace(str, params);
  };
};

function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
    return numberFormat.format(value);
  };
}

function createDefaultLocaleAdapter(options) {
  const createScope = options => {
    const current = (0,_util__WEBPACK_IMPORTED_MODULE_1__.wrapInRef)(options.current);
    const fallback = (0,_util__WEBPACK_IMPORTED_MODULE_1__.wrapInRef)(options.fallback);
    const messages = (0,_util__WEBPACK_IMPORTED_MODULE_1__.wrapInRef)(options.messages);
    return {
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback)
    };
  };

  return {
    createRoot: app => {
      var _options$defaultLocal, _options$fallbackLoca, _options$messages;

      const rootScope = createScope({
        current: (_options$defaultLocal = options == null ? void 0 : options.defaultLocale) != null ? _options$defaultLocal : 'en',
        fallback: (_options$fallbackLoca = options == null ? void 0 : options.fallbackLocale) != null ? _options$fallbackLoca : 'en',
        messages: (_options$messages = options == null ? void 0 : options.messages) != null ? _options$messages : {
          en: _locale_en__WEBPACK_IMPORTED_MODULE_3__.default
        }
      });
      app.provide(VuetifyLocaleSymbol, rootScope);
      return rootScope;
    },
    getScope: () => {
      const currentScope = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyLocaleSymbol);
      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
      return currentScope;
    },
    createScope: options => {
      const currentScope = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(VuetifyLocaleSymbol);
      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
      const newScope = createScope({
        current: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
          var _options$locale;

          return (_options$locale = options == null ? void 0 : options.locale) != null ? _options$locale : currentScope.current.value;
        }),
        fallback: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
          var _options$locale2;

          return (_options$locale2 = options == null ? void 0 : options.locale) != null ? _options$locale2 : currentScope.fallback.value;
        }),
        messages: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
          var _options$messages2;

          return (_options$messages2 = options == null ? void 0 : options.messages) != null ? _options$messages2 : currentScope.messages.value;
        })
      });
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(VuetifyLocaleSymbol, newScope);
      return newScope;
    }
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
// Utilities

 // Types

const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'];
// Composables
const makePositionProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
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
    if (props.fixed) return `${name}--fixed`;
    if (props.absolute) return `${name}--absolute`;
    return props.position ? `position-${props.position}` : undefined;
  });
  const positionStyles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const styles = {};

    for (const target of targets) {
      const prop = props[target];
      if (prop == null || prop === false) continue;
      styles[target] = (0,_util__WEBPACK_IMPORTED_MODULE_2__.convertToUnit)(prop === true ? '0' : String(prop));
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/console.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
// Utilities

 // Types

// Composables
function useProxiedModel(props, prop, defaultValue, transformIn = v => v, transformOut = v => v) {
  const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
  if (!vm) (0,_util__WEBPACK_IMPORTED_MODULE_1__.consoleError)('useProxiedModel must be called from inside a setup function');
  const propIsDefined = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    var _vm$vnode$props, _vm$vnode$props2;

    return !!(typeof props[prop] !== 'undefined' && (vm != null && (_vm$vnode$props = vm.vnode.props) != null && _vm$vnode$props.hasOwnProperty(prop) || vm != null && (_vm$vnode$props2 = vm.vnode.props) != null && _vm$vnode$props2.hasOwnProperty((0,_util__WEBPACK_IMPORTED_MODULE_2__.toKebabCase)(prop))));
  });
  const internal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(transformIn(props[prop]));
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)({
    get() {
      if (propIsDefined.value) return transformIn(props[prop]);else return internal.value;
    },

    set(newValue) {
      internal.value = newValue;
      vm == null ? void 0 : vm.emit(`update:${prop}`, transformOut(newValue));
    }

  });
}

/***/ }),

/***/ "./src/composables/refs.ts":
/*!*********************************!*\
  !*** ./src/composables/refs.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useRefs": () => (/* binding */ useRefs)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Imports

function useRefs() {
  const refs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate)(() => refs.value = []);

  function updateRef(e, i) {
    refs.value[i] = e;
  }

  return {
    refs,
    updateRef
  };
}

/***/ }),

/***/ "./src/composables/resizeObserver.ts":
/*!*******************************************!*\
  !*** ./src/composables/resizeObserver.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useResizeObserver": () => (/* binding */ useResizeObserver)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Utilities

function useResizeObserver(callback) {
  const resizeRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
  const contentRect = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
  const contentBoxSize = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
  const borderBoxSize = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
  const observer = new ResizeObserver(entries => {
    callback == null ? void 0 : callback(entries, observer);
    if (!entries.length) return;
    contentRect.value = entries[0].contentRect;
    contentBoxSize.value = entries[0].contentBoxSize[0];
    borderBoxSize.value = entries[0].borderBoxSize[0];
  });
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
    observer.disconnect();
  });
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(resizeRef, (newValue, oldValue) => {
    if (oldValue) {
      observer.unobserve(oldValue);
      contentRect.value = undefined;
      contentBoxSize.value = undefined;
      borderBoxSize.value = undefined;
    }

    if (newValue) observer.observe(newValue);
  }, {
    flush: 'post'
  });
  return {
    resizeRef,
    contentRect: (0,vue__WEBPACK_IMPORTED_MODULE_0__.readonly)(contentRect),
    contentBoxSize: (0,vue__WEBPACK_IMPORTED_MODULE_0__.readonly)(contentBoxSize),
    borderBoxSize: (0,vue__WEBPACK_IMPORTED_MODULE_0__.readonly)(borderBoxSize)
  };
}

/***/ }),

/***/ "./src/composables/rounded.ts":
/*!************************************!*\
  !*** ./src/composables/rounded.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeRoundedProps": () => (/* binding */ makeRoundedProps),
/* harmony export */   "useRounded": () => (/* binding */ useRounded)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
// Utilities

 // Types

// Composables
const makeRoundedProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  rounded: {
    type: [Boolean, Number, String],
    default: undefined
  },
  tile: Boolean
}, 'rounded');
function useRounded(props, name) {
  const roundedClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const classes = [];

    if (props.tile) {
      classes.push(`${name}--tile`);
    } else if (props.rounded === true || props.rounded === '') {
      classes.push(`${name}--rounded`);
    } else if (typeof props.rounded === 'string' || props.rounded === 0) {
      for (const value of String(props.rounded).split(' ')) {
        classes.push(`rounded-${value}`);
      }
    }

    return classes;
  });
  return {
    roundedClasses
  };
}

/***/ }),

/***/ "./src/composables/router.tsx":
/*!************************************!*\
  !*** ./src/composables/router.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useRoute": () => (/* binding */ useRoute),
/* harmony export */   "useRouter": () => (/* binding */ useRouter),
/* harmony export */   "useLink": () => (/* binding */ useLink),
/* harmony export */   "makeRouterProps": () => (/* binding */ makeRouterProps),
/* harmony export */   "useBackButton": () => (/* binding */ useBackButton)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Utilities

 // Types

function useRoute() {
  const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    var _vm$proxy;

    return vm == null ? void 0 : (_vm$proxy = vm.proxy) == null ? void 0 : _vm$proxy.$route;
  });
}
function useRouter() {
  var _getCurrentInstance, _getCurrentInstance$p;

  return (_getCurrentInstance = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)()) == null ? void 0 : (_getCurrentInstance$p = _getCurrentInstance.proxy) == null ? void 0 : _getCurrentInstance$p.$router;
}
function useLink(props, attrs) {
  const RouterLink = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent)('RouterLink');
  const isLink = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => !!(props.href || props.to));
  const isClickable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return (isLink == null ? void 0 : isLink.value) || !!(attrs.onClick || attrs.onClickOnce);
  });

  if (typeof RouterLink === 'string') {
    return {
      isLink,
      isClickable,
      href: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRef)(props, 'href')
    };
  }

  const link = props.to ? RouterLink.useLink(props) : undefined;
  return { ...link,
    isLink,
    isClickable,
    href: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
  };
}
const makeRouterProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  href: String,
  replace: Boolean,
  to: [String, Object]
}, 'router');
function useBackButton(cb) {
  const router = useRouter();
  let popped = false;
  let removeGuard;
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
    window.addEventListener('popstate', onPopstate);
    removeGuard = router == null ? void 0 : router.beforeEach((to, from, next) => {
      setTimeout(() => popped ? cb(next) : next());
    });
  });
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
    var _removeGuard;

    window.removeEventListener('popstate', onPopstate);
    (_removeGuard = removeGuard) == null ? void 0 : _removeGuard();
  });

  function onPopstate(e) {
    if (e.state.replaced) return;
    popped = true;
    setTimeout(() => popped = false);
  }
}

/***/ }),

/***/ "./src/composables/rtl.ts":
/*!********************************!*\
  !*** ./src/composables/rtl.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RtlSymbol": () => (/* binding */ RtlSymbol),
/* harmony export */   "createRtl": () => (/* binding */ createRtl),
/* harmony export */   "createRtlScope": () => (/* binding */ createRtlScope),
/* harmony export */   "provideRtl": () => (/* binding */ provideRtl),
/* harmony export */   "useRtl": () => (/* binding */ useRtl)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locale */ "./src/locale/index.ts");

 // Types

const RtlSymbol = Symbol.for('vuetify:rtl');
function createRtl(localeScope, options) {
  var _options$rtl, _options$defaultRtl;

  return createRtlScope({
    rtl: { ..._locale__WEBPACK_IMPORTED_MODULE_1__.rtl,
      ...((_options$rtl = options == null ? void 0 : options.rtl) != null ? _options$rtl : {})
    },
    isRtl: (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)((_options$defaultRtl = options == null ? void 0 : options.defaultRtl) != null ? _options$defaultRtl : false),
    rtlClasses: (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('')
  }, localeScope);
}
function createRtlScope(currentScope, localeScope, options) {
  const isRtl = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (typeof (options == null ? void 0 : options.rtl) === 'boolean') return options.rtl;

    if (localeScope.current.value && currentScope.rtl.hasOwnProperty(localeScope.current.value)) {
      return currentScope.rtl[localeScope.current.value];
    }

    return currentScope.isRtl.value;
  });
  return {
    isRtl,
    rtl: currentScope.rtl,
    rtlClasses: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
  };
}
function provideRtl(props, localeScope) {
  const currentScope = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(RtlSymbol);
  if (!currentScope) throw new Error('[Vuetify] Could not find injected rtl instance');
  const newScope = createRtlScope(currentScope, localeScope, props);
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(RtlSymbol, newScope);
  return newScope;
}
function useRtl() {
  const currentScope = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(RtlSymbol);
  if (!currentScope) throw new Error('[Vuetify] Could not find injected rtl instance');
  return currentScope;
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
// Utilities

 // Types

const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large'];
// Composables
const makeSizeProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  size: {
    type: [String, Number],
    default: 'default'
  }
}, 'size');
function useSize(props, name) {
  const sizeClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return predefinedSizes.includes(props.size) ? `${name}--size-${props.size}` : null;
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
// Utilities
 // Types

// Composables
const makeTagProps = (0,_util__WEBPACK_IMPORTED_MODULE_0__.propsFactory)({
  tag: {
    type: String,
    default: 'div'
  }
}, 'tag');

/***/ }),

/***/ "./src/composables/teleport.ts":
/*!*************************************!*\
  !*** ./src/composables/teleport.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useTeleport": () => (/* binding */ useTeleport)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

function useTeleport(target) {
  const teleportTarget = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const _target = target.value;
    if (_target === true) return undefined;
    const targetElement = _target === false ? document.body : typeof _target === 'string' ? document.querySelector(_target) : _target;

    if (targetElement == null) {
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.warn)(`Unable to locate target ${_target}`);
      return undefined;
    }

    if (!useTeleport.cache.has(targetElement)) {
      const el = document.createElement('div');
      el.className = 'v-overlay-container';
      targetElement.appendChild(el);
      useTeleport.cache.set(targetElement, el);
    }

    return useTeleport.cache.get(targetElement);
  });
  return {
    teleportTarget
  };
}
useTeleport.cache = new WeakMap();

/***/ }),

/***/ "./src/composables/theme.ts":
/*!**********************************!*\
  !*** ./src/composables/theme.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemeSymbol": () => (/* binding */ ThemeSymbol),
/* harmony export */   "makeThemeProps": () => (/* binding */ makeThemeProps),
/* harmony export */   "createTheme": () => (/* binding */ createTheme),
/* harmony export */   "useTheme": () => (/* binding */ useTheme)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/helpers.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/util/colorUtils.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/console */ "./src/util/console.ts");
/* harmony import */ var _util_color_APCA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/color/APCA */ "./src/util/color/APCA.ts");
 // Utilities

 // Types



const ThemeSymbol = Symbol.for('vuetify:theme');
const makeThemeProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  theme: String
}, 'theme');
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
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'activated-opacity': 0.12,
        'idle-opacity': 0.04,
        'hover-opacity': 0.12,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'dragged-opacity': 0.08,
        'pressed-opacity': 0.16,
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#C2C2C2'
      }
    },
    dark: {
      dark: true,
      colors: {
        background: '#121212',
        surface: '#212121',
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
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'activated-opacity': 0.12,
        'idle-opacity': 0.10,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'dragged-opacity': 0.08,
        'pressed-opacity': 0.16,
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#B7B7B7'
      }
    }
  }
};

const parseThemeOptions = (options = defaultThemeOptions) => {
  if (!options) return { ...defaultThemeOptions,
    isDisabled: true
  };
  return (0,_util__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)(defaultThemeOptions, options);
}; // Composables


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
        if (/on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue;
        const onColor = `on-${color}`;
        const colorVal = (0,_util__WEBPACK_IMPORTED_MODULE_3__.colorToInt)(theme.colors[color]);
        const blackContrast = Math.abs((0,_util_color_APCA__WEBPACK_IMPORTED_MODULE_4__.APCAcontrast)(0, colorVal));
        const whiteContrast = Math.abs((0,_util_color_APCA__WEBPACK_IMPORTED_MODULE_4__.APCAcontrast)(0xffffff, colorVal)); // TODO: warn about poor color selections
        // const contrastAsText = Math.abs(APCAcontrast(colorVal, colorToInt(theme.colors.background)))
        // const minContrast = Math.max(blackContrast, whiteContrast)
        // if (minContrast < 60) {
        //   consoleInfo(`${key} theme color ${color} has poor contrast (${minContrast.toFixed()}%)`)
        // } else if (contrastAsText < 60 && !['background', 'surface'].includes(color)) {
        //   consoleInfo(`${key} theme color ${color} has poor contrast as text (${contrastAsText.toFixed()}%)`)
        // }
        // Prefer white text if both have an acceptable contrast ratio

        theme.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000';
      }

      obj[key] = theme;
      return obj;
    }, {});
  });

  function genColorVariations(name, color) {
    const obj = {};

    for (const variation of ['lighten', 'darken']) {
      const fn = variation === 'lighten' ? _util__WEBPACK_IMPORTED_MODULE_3__.lighten : _util__WEBPACK_IMPORTED_MODULE_3__.darken;

      for (const amount of (0,_util__WEBPACK_IMPORTED_MODULE_2__.createRange)(variations.value[variation], 1)) {
        obj[`${name}-${variation}-${amount}`] = (0,_util__WEBPACK_IMPORTED_MODULE_3__.intToHex)(fn((0,_util__WEBPACK_IMPORTED_MODULE_3__.colorToInt)(color), amount));
      }
    }

    return obj;
  }

  function genCssVariables(name) {
    const theme = computedThemes.value[name];
    if (!theme) throw new Error(`Could not find theme ${name}`);
    const lightOverlay = theme.dark ? 2 : 1;
    const darkOverlay = theme.dark ? 1 : 2;
    const variables = [];

    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = (0,_util__WEBPACK_IMPORTED_MODULE_3__.colorToRGB)(value);
      variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);

      if (!key.startsWith('on-')) {
        variables.push(`--v-theme-${key}-overlay-multiplier: ${(0,_util__WEBPACK_IMPORTED_MODULE_3__.getLuma)(value) > 0.18 ? lightOverlay : darkOverlay}`);
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
    return [`${selector} {\n`, ...content.map(line => `  ${line};\n`), '}\n'];
  }

  function updateStyles() {
    if (parsedOptions.isDisabled) return;
    genStyleElement();
    const lines = [];

    for (const themeName of Object.keys(computedThemes.value)) {
      const variables = computedThemes.value[themeName].variables;
      lines.push(...createCssClass(`.v-theme--${themeName}`, [...genCssVariables(themeName), ...Object.keys(variables).map(key => {
        const value = variables[key];
        const color = typeof value === 'string' && value.startsWith('#') ? (0,_util__WEBPACK_IMPORTED_MODULE_3__.colorToRGB)(value) : undefined;
        const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined;
        return `--v-${key}: ${rgb != null ? rgb : value}`;
      })]));
    } // Assumption is that all theme objects have the same keys, so it doesn't matter which one
    // we use since the values are all css variables.


    const firstTheme = Object.keys(computedThemes.value)[0];

    for (const key of Object.keys(computedThemes.value[firstTheme].colors)) {
      if (/on-[a-z]/.test(key)) {
        lines.push(...createCssClass(`.${key}`, [`color: rgb(var(--v-theme-${key}))`]));
      } else {
        lines.push(...createCssClass(`.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background: rgb(var(--v-theme-${key}))`, `color: rgb(var(--v-theme-on-${key}))`]), ...createCssClass(`.text-${key}`, [`color: rgb(var(--v-theme-${key}))`]), ...createCssClass(`.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]));
      }
    }

    if (styleEl.value) styleEl.value.innerHTML = lines.map((str, i) => i === 0 ? str : `    ${str}`).join('');
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
    themeClasses: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => parsedOptions.isDisabled ? undefined : `v-theme--${current.value}`)
  };
}
/**
 * Used to either set up and provide a new theme instance, or to pass
 * along the closest available already provided instance.
 */

function useTheme(props) {
  const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
  const theme = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(ThemeSymbol, null);
  if (!vm) (0,_util_console__WEBPACK_IMPORTED_MODULE_5__.consoleError)('provideTheme must be called from inside a setup function');
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  const current = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    var _props$theme;

    return (_props$theme = props.theme) != null ? _props$theme : theme == null ? void 0 : theme.current.value;
  });
  const themeClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => theme.isDisabled ? undefined : `v-theme--${current.value}`);
  const newTheme = { ...theme,
    current,
    themeClasses
  };
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(ThemeSymbol, newTheme);
  return newTheme;
}

/***/ }),

/***/ "./src/composables/transition.ts":
/*!***************************************!*\
  !*** ./src/composables/transition.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeTransitionProps": () => (/* binding */ makeTransitionProps),
/* harmony export */   "MaybeTransition": () => (/* binding */ MaybeTransition)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");
// Utilities

 // Types

const makeTransitionProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  transition: {
    type: [Boolean, String, Object],
    default: 'fade-transition',
    validator: val => val !== true
  }
}, 'transition');
const MaybeTransition = (props, {
  slots
}) => {
  var _slots$default;

  const {
    transition,
    ...rest
  } = props;
  if (!transition || typeof transition === 'boolean') return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
  const {
    component = vue__WEBPACK_IMPORTED_MODULE_0__.Transition,
    ...customProps
  } = typeof transition === 'object' ? transition : {};
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(component, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)(typeof transition === 'string' ? {
    name: transition
  } : customProps, rest), slots);
};

/***/ }),

/***/ "./src/composables/variant.tsx":
/*!*************************************!*\
  !*** ./src/composables/variant.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allowedVariants": () => (/* binding */ allowedVariants),
/* harmony export */   "genOverlays": () => (/* binding */ genOverlays),
/* harmony export */   "makeVariantProps": () => (/* binding */ makeVariantProps),
/* harmony export */   "useVariant": () => (/* binding */ useVariant)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color */ "./src/composables/color.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/propsFactory.ts");

// Composables
 // Utilities


 // Types

const allowedVariants = ['contained', 'outlined', 'plain', 'text', 'contained-text'];
function genOverlays(isClickable, name) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [isClickable && (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
    "class": `${name}__overlay`
  }, null), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
    "class": `${name}__underlay`
  }, null)]);
}
const makeVariantProps = (0,_util__WEBPACK_IMPORTED_MODULE_1__.propsFactory)({
  color: String,
  textColor: String,
  variant: {
    type: String,
    default: 'contained',
    validator: v => allowedVariants.includes(v)
  }
}, 'variant');
function useVariant(props, name) {
  const variantClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const {
      variant
    } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.unref)(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = (0,_color__WEBPACK_IMPORTED_MODULE_2__.useColor)((0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const {
      textColor,
      variant,
      color
    } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.unref)(props);
    return {
      text: textColor,
      [variant === 'contained' ? 'background' : 'text']: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}

/***/ }),

/***/ "./src/directives/click-outside/index.ts":
/*!***********************************************!*\
  !*** ./src/directives/click-outside/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClickOutside": () => (/* binding */ ClickOutside),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/dom.ts");


function defaultConditional() {
  return true;
}

function checkEvent(e, el, binding) {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || checkIsActive(e, binding) === false) return false; // If we're clicking inside the shadowroot, then the app root doesn't get the same
  // level of introspection as to _what_ we're clicking. We want to check to see if
  // our target is the shadowroot parent container, and if it is, ignore.

  const root = (0,_util__WEBPACK_IMPORTED_MODULE_0__.attachedRoot)(el);
  if (root instanceof ShadowRoot && root.host === e.target) return false; // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)

  const elements = (typeof binding.value === 'object' && binding.value.include || (() => []))(); // Add the root element for the component this directive was defined on


  elements.push(el); // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occur before
  // the bubbling click event on any outside elements.

  return !elements.some(el => el.contains(e.target));
}

function checkIsActive(e, binding) {
  const isActive = typeof binding.value === 'object' && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}

function directive(e, el, binding) {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}

function handleShadow(el, callback) {
  const root = (0,_util__WEBPACK_IMPORTED_MODULE_0__.attachedRoot)(el);
  callback(document.body);

  if (root instanceof ShadowRoot) {
    callback(root);
  }
}

const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = e => directive(e, el, binding);

    const onMousedown = e => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };

    handleShadow(el, app => {
      app.addEventListener('click', onClick, true);
      app.addEventListener('mousedown', onMousedown, true);
    });
    el._clickOutside = {
      lastMousedownWasOutside: true,
      onClick,
      onMousedown
    };
  },

  unmounted(el) {
    if (!el._clickOutside) return;
    handleShadow(el, app => {
      if (!app || !el._clickOutside) return;
      app.removeEventListener('click', el._clickOutside.onClick, true);
      app.removeEventListener('mousedown', el._clickOutside.onMousedown, true);
    });
    delete el._clickOutside;
  }

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClickOutside);

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
/* harmony export */   "Mutate": () => (/* reexport safe */ _mutate__WEBPACK_IMPORTED_MODULE_2__.Mutate),
/* harmony export */   "Resize": () => (/* reexport safe */ _resize__WEBPACK_IMPORTED_MODULE_3__.Resize),
/* harmony export */   "Ripple": () => (/* reexport safe */ _ripple__WEBPACK_IMPORTED_MODULE_4__.Ripple),
/* harmony export */   "Scroll": () => (/* reexport safe */ _scroll__WEBPACK_IMPORTED_MODULE_5__.Scroll),
/* harmony export */   "Touch": () => (/* reexport safe */ _touch__WEBPACK_IMPORTED_MODULE_6__.Touch)
/* harmony export */ });
/* harmony import */ var _click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./click-outside */ "./src/directives/click-outside/index.ts");
/* harmony import */ var _intersect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intersect */ "./src/directives/intersect/index.ts");
/* harmony import */ var _mutate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutate */ "./src/directives/mutate/index.ts");
/* harmony import */ var _resize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resize */ "./src/directives/resize/index.ts");
/* harmony import */ var _ripple__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ripple */ "./src/directives/ripple/index.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scroll */ "./src/directives/scroll/index.ts");
/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./touch */ "./src/directives/touch/index.ts");
 // export { Color } from './color'








/***/ }),

/***/ "./src/directives/intersect/index.ts":
/*!*******************************************!*\
  !*** ./src/directives/intersect/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Intersect": () => (/* binding */ Intersect),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/globals.ts");
// Utils
 // Types

function mounted(el, binding) {
  if (!_util__WEBPACK_IMPORTED_MODULE_0__.SUPPORTS_INTERSECTION) return;
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

    const isIntersecting = entries.some(entry => entry.isIntersecting); // If is not quiet or has already been
    // initted, invoke the user callback

    if (handler && (!modifiers.quiet || el._observe.init) && (!modifiers.once || isIntersecting || !el._observe.init)) {
      handler(isIntersecting, entries, observer);
    }

    if (isIntersecting && modifiers.once) unmounted(el);else el._observe.init = true;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Intersect);

/***/ }),

/***/ "./src/directives/mutate/index.ts":
/*!****************************************!*\
  !*** ./src/directives/mutate/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mutate": () => (/* binding */ Mutate),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Types
function mounted(el, binding) {
  var _modifierKeys$attr, _modifierKeys$char, _modifierKeys$child, _modifierKeys$sub;

  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    once,
    immediate,
    ...modifierKeys
  } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;
  const {
    handler,
    options
  } = typeof value === 'object' ? value : {
    handler: value,
    options: {
      attributes: (_modifierKeys$attr = modifierKeys == null ? void 0 : modifierKeys.attr) != null ? _modifierKeys$attr : defaultValue,
      characterData: (_modifierKeys$char = modifierKeys == null ? void 0 : modifierKeys.char) != null ? _modifierKeys$char : defaultValue,
      childList: (_modifierKeys$child = modifierKeys == null ? void 0 : modifierKeys.child) != null ? _modifierKeys$child : defaultValue,
      subtree: (_modifierKeys$sub = modifierKeys == null ? void 0 : modifierKeys.sub) != null ? _modifierKeys$sub : defaultValue
    }
  };
  const observer = new MutationObserver((mutations = [], observer) => {
    handler == null ? void 0 : handler(mutations, observer);
    if (once) unmounted(el);
  });
  if (immediate) handler == null ? void 0 : handler([], observer);
  el._mutate = {
    observer
  };
  observer.observe(el, options);
}

function unmounted(el) {
  var _el$_mutate, _el$_mutate$observer;

  el == null ? void 0 : (_el$_mutate = el._mutate) == null ? void 0 : (_el$_mutate$observer = _el$_mutate.observer) == null ? void 0 : _el$_mutate$observer.disconnect();
  delete el._mutate;
}

const Mutate = {
  mounted,
  unmounted
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mutate);

/***/ }),

/***/ "./src/directives/resize/index.ts":
/*!****************************************!*\
  !*** ./src/directives/resize/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resize": () => (/* binding */ Resize),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function mounted(el, binding) {
  var _binding$modifiers, _binding$modifiers2;

  const handler = binding.value;
  const options = {
    passive: !((_binding$modifiers = binding.modifiers) != null && _binding$modifiers.active)
  };
  window.addEventListener('resize', handler, options);
  el._onResize = {
    handler,
    options
  };

  if (!((_binding$modifiers2 = binding.modifiers) != null && _binding$modifiers2.quiet)) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Resize);

/***/ }),

/***/ "./src/directives/ripple/index.ts":
/*!****************************************!*\
  !*** ./src/directives/ripple/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ripple": () => (/* binding */ Ripple),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VRipple_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VRipple.sass */ "./src/directives/ripple/VRipple.sass");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
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
  el.style.opacity = `calc(${value} * var(--v-theme-overlay-multiplier))`;
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

  if ((_el$_ripple = el._ripple) != null && _el$_ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }

  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
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

    if (!(el != null && (_el$_ripple2 = el._ripple) != null && _el$_ripple2.enabled)) {
      return;
    }

    const container = document.createElement('span');
    const animation = document.createElement('span');
    container.appendChild(animation);
    container.className = 'v-ripple__container';

    if (value.class) {
      container.className += ` ${value.class}`;
    }

    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
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
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    opacity(animation, 0);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter');
      animation.classList.add('v-ripple__animation--in');
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      opacity(animation, 0.08);
    }, 0);
  },

  hide(el) {
    var _el$_ripple3;

    if (!(el != null && (_el$_ripple3 = el._ripple) != null && _el$_ripple3.enabled)) return;
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
  if (!(element != null && element._ripple) || element._ripple.touched || e[rippleStop]) return; // Don't allow the event to trigger ripples on any other elements

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

      if (element != null && (_element$_ripple = element._ripple) != null && _element$_ripple.showTimerCommit) {
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
  if (!keyboardRipple && (e.keyCode === _util__WEBPACK_IMPORTED_MODULE_1__.keyCodes.enter || e.keyCode === _util__WEBPACK_IMPORTED_MODULE_1__.keyCodes.space)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}

function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}

function focusRippleHide(e) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(e);
  }
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

  if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isObject)(value) && value.class) {
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
    el.addEventListener('keyup', keyboardRippleHide);
    el.addEventListener('blur', focusRippleHide); // Anchor tags can be dragged, causes other hides to fail - #1537

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
  el.removeEventListener('blur', focusRippleHide);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ripple);

/***/ }),

/***/ "./src/directives/scroll/index.ts":
/*!****************************************!*\
  !*** ./src/directives/scroll/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scroll": () => (/* binding */ Scroll),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scroll);

/***/ }),

/***/ "./src/directives/touch/index.ts":
/*!***************************************!*\
  !*** ./src/directives/touch/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Touch": () => (/* binding */ Touch),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util/helpers.ts");
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
  var _wrapper$start;

  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_wrapper$start = wrapper.start) == null ? void 0 : _wrapper$start.call(wrapper, { ...event,
    ...wrapper
  });
}

function touchend(event, wrapper) {
  var _wrapper$end;

  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_wrapper$end = wrapper.end) == null ? void 0 : _wrapper$end.call(wrapper, { ...event,
    ...wrapper
  });
  handleGesture(wrapper);
}

function touchmove(event, wrapper) {
  var _wrapper$move;

  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_wrapper$move = wrapper.move) == null ? void 0 : _wrapper$move.call(wrapper, { ...event,
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
  const target = value != null && value.parent ? el.parentElement : el;
  const options = (_value$options = value == null ? void 0 : value.options) != null ? _value$options : {
    passive: true
  };
  const uid = (_binding$instance = binding.instance) == null ? void 0 : _binding$instance.$.uid; // TODO: use custom uid generator

  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = (_target$_touchHandler = target._touchHandlers) != null ? _target$_touchHandler : Object.create(null);
  target._touchHandlers[uid] = handlers;
  (0,_util__WEBPACK_IMPORTED_MODULE_0__.keys)(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}

function unmounted(el, binding) {
  var _binding$value, _binding$instance2;

  const target = (_binding$value = binding.value) != null && _binding$value.parent ? el.parentElement : el;
  const uid = (_binding$instance2 = binding.instance) == null ? void 0 : _binding$instance2.$.uid;
  if (!(target != null && target._touchHandlers) || !uid) return;
  const handlers = target._touchHandlers[uid];
  (0,_util__WEBPACK_IMPORTED_MODULE_0__.keys)(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}

const Touch = {
  mounted,
  unmounted
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Touch);

/***/ }),

/***/ "./src/framework.ts":
/*!**************************!*\
  !*** ./src/framework.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVuetify": () => (/* binding */ createVuetify)
/* harmony export */ });
/* harmony import */ var _composables_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./composables/display */ "./src/composables/display.ts");
/* harmony import */ var _composables_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./composables/theme */ "./src/composables/theme.ts");
/* harmony import */ var _composables_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./composables/icons */ "./src/composables/icons.tsx");
/* harmony import */ var _composables_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./composables/defaults */ "./src/composables/defaults.ts");
/* harmony import */ var _composables_locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./composables/locale */ "./src/composables/locale.ts");
/* harmony import */ var _composables_rtl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./composables/rtl */ "./src/composables/rtl.ts");
/* harmony import */ var _iconsets_mdi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./iconsets/mdi */ "./src/iconsets/mdi.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/util/helpers.ts");






 // Utilities


 // Types

const createVuetify = (options = {}) => {
  const install = app => {
    const {
      components = {},
      directives = {},
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

    app.provide(_composables_defaults__WEBPACK_IMPORTED_MODULE_1__.DefaultsSymbol, (0,_composables_defaults__WEBPACK_IMPORTED_MODULE_1__.createDefaults)(options.defaults));
    app.provide(_composables_display__WEBPACK_IMPORTED_MODULE_2__.DisplaySymbol, (0,_composables_display__WEBPACK_IMPORTED_MODULE_2__.createDisplay)(options.display));
    app.provide(_composables_theme__WEBPACK_IMPORTED_MODULE_3__.ThemeSymbol, (0,_composables_theme__WEBPACK_IMPORTED_MODULE_3__.createTheme)(options.theme));
    app.provide(_composables_icons__WEBPACK_IMPORTED_MODULE_4__.IconSymbol, (0,_util__WEBPACK_IMPORTED_MODULE_5__.mergeDeep)({
      defaultSet: 'mdi',
      sets: { ..._composables_icons__WEBPACK_IMPORTED_MODULE_4__.defaultSets,
        mdi: _iconsets_mdi__WEBPACK_IMPORTED_MODULE_6__.mdi
      },
      aliases: _iconsets_mdi__WEBPACK_IMPORTED_MODULE_6__.aliases
    }, icons));
    const {
      adapter,
      rootInstance
    } = (0,_composables_locale__WEBPACK_IMPORTED_MODULE_7__.createLocaleAdapter)(app, options == null ? void 0 : options.locale);
    app.provide(_composables_locale__WEBPACK_IMPORTED_MODULE_7__.LocaleAdapterSymbol, adapter);
    app.provide(_composables_rtl__WEBPACK_IMPORTED_MODULE_8__.RtlSymbol, (0,_composables_rtl__WEBPACK_IMPORTED_MODULE_8__.createRtl)(rootInstance, options == null ? void 0 : options.locale)); // Vue's inject() can only be used in setup

    function inject(key) {
      var _vm$parent$provides, _vm$parent, _vm$vnode$appContext;

      const vm = this.$;
      const provides = (_vm$parent$provides = (_vm$parent = vm.parent) == null ? void 0 : _vm$parent.provides) != null ? _vm$parent$provides : (_vm$vnode$appContext = vm.vnode.appContext) == null ? void 0 : _vm$vnode$appContext.provides;

      if (provides && key in provides) {
        return provides[key];
      }
    }

    app.mixin({
      computed: {
        $vuetify() {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({
            defaults: inject.call(this, _composables_defaults__WEBPACK_IMPORTED_MODULE_1__.DefaultsSymbol),
            display: inject.call(this, _composables_display__WEBPACK_IMPORTED_MODULE_2__.DisplaySymbol),
            theme: inject.call(this, _composables_theme__WEBPACK_IMPORTED_MODULE_3__.ThemeSymbol),
            icons: inject.call(this, _composables_icons__WEBPACK_IMPORTED_MODULE_4__.IconSymbol),
            locale: inject.call(this, _composables_locale__WEBPACK_IMPORTED_MODULE_7__.LocaleAdapterSymbol),
            rtl: inject.call(this, _composables_rtl__WEBPACK_IMPORTED_MODULE_8__.RtlSymbol)
          });
        }

      }
    });
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
  warning: 'mdi-alert-circle',
  error: 'mdi-close-circle',
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

/***/ "./src/locale/af.ts":
/*!**************************!*\
  !*** ./src/locale/af.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'badge',
  close: 'Close',
  dataIterator: {
    noResultsText: 'Geen ooreenstemmende resultate is gevind nie',
    loadingText: 'Loading item...'
  },
  dataTable: {
    itemsPerPageText: 'Rye per bladsy:',
    ariaLabel: {
      sortDescending: 'Sorted descending.',
      sortAscending: 'Sorted ascending..',
      sortNone: 'Not sorted.',
      activateNone: 'Activate to remove sorting.',
      activateDescending: 'Activate to sort descending.',
      activateAscending: 'Activate to sort ascending.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: 'Aantal per bladsy:',
    itemsPerPageAll: 'Alles',
    nextPage: 'Volgende bladsy',
    prevPage: 'Vorige bladsy',
    firstPage: 'Eerste bladsy',
    lastPage: 'Laaste bladsy',
    pageText: '{0}-{1} van {2}'
  },
  datePicker: {
    itemsSelected: '{0} gekies',
    nextMonthAriaLabel: 'Volgende maand',
    nextYearAriaLabel: 'Volgende jaar',
    prevMonthAriaLabel: 'Vorige maand',
    prevYearAriaLabel: 'Vorige jaar'
  },
  noDataText: 'Geen data is beskikbaar nie',
  carousel: {
    prev: 'Vorige visuele',
    next: 'Volgende visuele',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} meer'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Paginasie-navigasie',
      next: 'Volgende bladsy',
      previous: 'Vorige bladsy',
      page: 'Gaan na bladsy {0}',
      currentPage: 'Huidige bladsy, Bladsy {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/ar.ts":
/*!**************************!*\
  !*** ./src/locale/ar.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'شارة',
  close: 'إغلاق',
  dataIterator: {
    noResultsText: 'لا توجد سجلات مطابقة',
    loadingText: 'تحميل العنصر...'
  },
  dataTable: {
    itemsPerPageText: 'الصفوف لكل صفحة:',
    ariaLabel: {
      sortDescending: 'مفروز تنازلي. تنشيط لإزالة الفرز.',
      sortAscending: 'مفروز تصاعدي. تنشيط للفرز التنازلي.',
      sortNone: 'غير مفروزة. تفعيل لفرز تصاعدي.',
      activateNone: 'Activate to remove sorting.',
      activateDescending: 'Activate to sort descending.',
      activateAscending: 'Activate to sort ascending.'
    },
    sortBy: 'مفروزة حسب'
  },
  dataFooter: {
    itemsPerPageText: 'العناصر لكل صفحة:',
    itemsPerPageAll: 'الكل',
    nextPage: 'الصفحة التالية',
    prevPage: 'الصفحة السابقة',
    firstPage: 'الصفحة الأولى',
    lastPage: 'الصفحة الأخيرة',
    pageText: '{0}-{1} من {2}'
  },
  datePicker: {
    itemsSelected: '{0} مختارة',
    nextMonthAriaLabel: 'الشهر القادم',
    nextYearAriaLabel: 'العام القادم',
    prevMonthAriaLabel: 'الشهر الماضى',
    prevYearAriaLabel: 'السنة الماضية'
  },
  noDataText: 'لا توجد بيانات متاحة',
  carousel: {
    prev: 'البصري السابق',
    next: 'البصري التالي',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} أكثر'
  },
  fileInput: {
    counter: '{0} ملفات',
    counterSize: '{0} ملفات ({1} في المجموع)'
  },
  timePicker: {
    am: 'صباحاً',
    pm: 'مساءً'
  },
  pagination: {
    ariaLabel: {
      root: 'ترقيم الصفحات الملاحة',
      next: 'الصفحة التالية',
      previous: 'الصفحة السابقة',
      page: '{0} انتقل إلى صفحة',
      currentPage: '{0} الصفحة الحالية ، الصفحة',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/az.ts":
/*!**************************!*\
  !*** ./src/locale/az.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'nişan',
  close: 'Bağla',
  dataIterator: {
    noResultsText: 'Uyğun məlumat tapılmadı',
    loadingText: 'Yüklənir... Zəhmət olmasa, gözləyin.'
  },
  dataTable: {
    itemsPerPageText: 'Səhifə başı sətir sayı:',
    ariaLabel: {
      sortDescending: 'Azalan sıra ilə düzülmüş.',
      sortAscending: 'Artan sıra ilə düzülmüş.',
      sortNone: 'Sıralanmamışdır. ',
      activateNone: 'Sıralamanı yığışdır.',
      activateDescending: 'Azalan sıra ilə düz.',
      activateAscending: 'Artan sıra ilə düz.'
    },
    sortBy: 'Sırala'
  },
  dataFooter: {
    itemsPerPageText: 'Səhifə başı sətir sayı:',
    itemsPerPageAll: 'Hamısı',
    nextPage: 'Növbəti səhifə',
    prevPage: 'Əvvəlki səhifə',
    firstPage: 'İlk səhifə',
    lastPage: 'Son səhifə',
    pageText: '{0} - {1} arası, Cəmi: {2} qeydiyyat'
  },
  datePicker: {
    itemsSelected: '{0} element seçildi',
    nextMonthAriaLabel: 'Növbəti ay',
    nextYearAriaLabel: 'Növbəti yıl',
    prevMonthAriaLabel: 'Keçən ay',
    prevYearAriaLabel: 'Keçən yıl'
  },
  noDataText: 'Bu görüntüdə məlumat yoxdur.',
  carousel: {
    prev: 'Əvvəlki görüntü',
    next: 'Növbəti görüntü',
    ariaLabel: {
      delimiter: 'Galereya səhifə {0} / {1}'
    }
  },
  calendar: {
    moreEvents: '{0} ədad daha'
  },
  fileInput: {
    counter: '{0} fayl',
    counterSize: '{0} fayl (cəmi {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Səhifələmə Naviqasiyası',
      next: 'Növbəti səhifə',
      previous: 'Əvəvlki səhifə',
      page: 'Səhifəyə get {0}',
      currentPage: 'Cari səhifə, Səhifə {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/bg.ts":
/*!**************************!*\
  !*** ./src/locale/bg.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Значка',
  close: 'Затвори',
  dataIterator: {
    noResultsText: 'Не са намерени записи',
    loadingText: 'Зареждане на елементи...'
  },
  dataTable: {
    itemsPerPageText: 'Редове на страница:',
    ariaLabel: {
      sortDescending: 'Подреди в намаляващ ред.',
      sortAscending: 'Подреди в нарастващ ред.',
      sortNone: 'Без подредба.',
      activateNone: 'Активирай за премахване на подредбата.',
      activateDescending: 'Активирай за подредба в намаляващ ред.',
      activateAscending: 'Активирай за подредба в нарастващ ред.'
    },
    sortBy: 'Сортирай по'
  },
  dataFooter: {
    itemsPerPageText: 'Елементи на страница:',
    itemsPerPageAll: 'Всички',
    nextPage: 'Следваща страница',
    prevPage: 'Предишна страница',
    firstPage: 'Първа страница',
    lastPage: 'Последна страница',
    pageText: '{0}-{1} от {2}'
  },
  datePicker: {
    itemsSelected: '{0} избрани',
    nextMonthAriaLabel: 'Следващ месец',
    nextYearAriaLabel: 'Следващата година',
    prevMonthAriaLabel: 'Предишен месец',
    prevYearAriaLabel: 'Предишна година'
  },
  noDataText: 'Няма налични данни',
  carousel: {
    prev: 'Предишна визуализация',
    next: 'Следваща визуализация',
    ariaLabel: {
      delimiter: 'Кадър {0} от {1} на въртележката'
    }
  },
  calendar: {
    moreEvents: 'Още {0}'
  },
  fileInput: {
    counter: '{0} файла',
    counterSize: '{0} файла ({1} общо)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Странициране',
      next: 'Следваща страница',
      previous: 'Предишна страница',
      page: 'Отиди на страница {0}',
      currentPage: 'Текуща страница, Страница {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/ca.ts":
/*!**************************!*\
  !*** ./src/locale/ca.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Insígnia',
  close: 'Tancar',
  dataIterator: {
    noResultsText: 'Sense dades per mostrar',
    loadingText: 'Carregant...'
  },
  dataTable: {
    itemsPerPageText: 'Files per pàgina:',
    ariaLabel: {
      sortDescending: 'Ordre descendent. Premi per treure la ordenació.',
      sortAscending: 'Ordre ascendent. Premi per ordenar descendent.',
      sortNone: 'Sense ordenar. Premi per ordenar ascendent.',
      activateNone: 'Activate to remove sorting.',
      activateDescending: 'Activate to sort descending.',
      activateAscending: 'Activate to sort ascending.'
    },
    sortBy: 'Ordenat per'
  },
  dataFooter: {
    itemsPerPageText: 'Elements per pàgina:',
    itemsPerPageAll: 'Tot',
    nextPage: 'Pàgina següent',
    prevPage: 'Pàgina anterior',
    firstPage: 'Primera pàgina',
    lastPage: 'Última pàgina',
    pageText: '{0}-{1} de {2}'
  },
  datePicker: {
    itemsSelected: '{0} seleccionats',
    nextMonthAriaLabel: 'El mes que ve',
    nextYearAriaLabel: `L'any que ve`,
    prevMonthAriaLabel: 'Mes anterior',
    prevYearAriaLabel: 'Any anterior'
  },
  noDataText: 'Sense dades',
  carousel: {
    prev: 'Visualització prèvia',
    next: 'Visualització següent',
    ariaLabel: {
      delimiter: 'Diapositiva {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} més'
  },
  fileInput: {
    counter: '{0} fitxers',
    counterSize: '{0} fitxers ({1} en total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navegació de la pàgina',
      next: 'Pàgina següent',
      previous: 'Pàgina anterior',
      page: 'Ves a la pàgina {0}',
      currentPage: 'Pàgina actual, pàgina {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/ckb.ts":
/*!***************************!*\
  !*** ./src/locale/ckb.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'باج',
  close: 'داخستن',
  dataIterator: {
    noResultsText: 'هیچ تۆمارێکی هاوتا نەدۆزرایەوە',
    loadingText: 'بارکردنی ئایتمەکان...'
  },
  dataTable: {
    itemsPerPageText: 'ڕیزەکان بۆ هەر پەڕەیەک:',
    ariaLabel: {
      sortDescending: '.سەر بەرەو خوار ڕیزکراوە',
      sortAscending: '.سەر بەرەو ژوور ڕیزکراوە',
      sortNone: 'ڕیزنەکراوە.',
      activateNone: 'چالاککردن بۆ لابردنی ڕیزکردن.',
      activateDescending: 'چالاککردن بۆ ڕیزکردنی سەربەرەوخوار.',
      activateAscending: 'چالاککردن بۆ ڕیزکردنی سەر بەرەو ژوور.'
    },
    sortBy: 'ڕیزکردن بەپێی'
  },
  dataFooter: {
    itemsPerPageText: 'ئایتمەکان بۆ هەر پەڕەیەک:',
    itemsPerPageAll: 'هەمووی',
    nextPage: 'پەڕەی دواتر',
    prevPage: 'پەڕەی پێشوو',
    firstPage: 'پەڕەی یەکەم',
    lastPage: 'پەڕەی کۆتایی',
    pageText: '{0}-{1} لە {2}'
  },
  datePicker: {
    itemsSelected: '{0} دەسنیشانکراوە',
    nextMonthAriaLabel: 'مانگی داهاتوو',
    nextYearAriaLabel: 'ساڵی داهاتوو',
    prevMonthAriaLabel: 'مانگی پێشوو',
    prevYearAriaLabel: 'ساڵی پێشوو'
  },
  noDataText: 'هیچ داتایەک بەردەست نیە',
  carousel: {
    prev: 'بینراوی پێشوو',
    next: 'بینراوی داهاتوو',
    ariaLabel: {
      delimiter: 'سلایدی کارۆسێل {0} لە {1}'
    }
  },
  calendar: {
    moreEvents: '{0} زیاتر'
  },
  fileInput: {
    counter: '{0} فایل',
    counterSize: '{0} فایل ({1} لە کۆی گشتی)'
  },
  timePicker: {
    am: 'پێش نیوەڕۆژ',
    pm: 'دوای نیوەڕۆژ'
  },
  pagination: {
    ariaLabel: {
      root: 'ڕێنیشاندەری پەڕەگۆڕکێ',
      next: 'پەڕەی دواتر',
      previous: 'پەڕەی پێشوو',
      page: 'بڕۆ بۆ پەڕەی {0}',
      currentPage: 'پەڕەی ئێستا، پەڕە{0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/cs.ts":
/*!**************************!*\
  !*** ./src/locale/cs.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Odznak',
  close: 'Zavřít',
  dataIterator: {
    noResultsText: 'Nenalezeny žádné záznamy',
    loadingText: 'Načítám položky...'
  },
  dataTable: {
    itemsPerPageText: 'Řádků na stránku:',
    ariaLabel: {
      sortDescending: 'Řazeno sestupně.',
      sortAscending: 'Řazeno vzestupně.',
      sortNone: 'Neseřazeno.',
      activateNone: 'Aktivováním vypnete řazení.',
      activateDescending: 'Aktivováním se bude řadit sestupně.',
      activateAscending: 'Aktivováním se bude řadit vzestupně.'
    },
    sortBy: 'Řadit dle'
  },
  dataFooter: {
    itemsPerPageText: 'Položek na stránku:',
    itemsPerPageAll: 'Vše',
    nextPage: 'Další strana',
    prevPage: 'Předchozí strana',
    firstPage: 'První strana',
    lastPage: 'Poslední strana',
    pageText: '{0}-{1} z {2}'
  },
  datePicker: {
    itemsSelected: '{0} vybráno',
    nextMonthAriaLabel: 'Příští měsíc',
    nextYearAriaLabel: 'Příští rok',
    prevMonthAriaLabel: 'Předchozí měsíc',
    prevYearAriaLabel: 'Předchozí rok'
  },
  noDataText: 'Nejsou dostupná žádná data',
  carousel: {
    prev: 'Předchozí obrázek',
    next: 'Další obrázek',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} dalších'
  },
  fileInput: {
    counter: '{0} souborů',
    counterSize: '{0} souborů ({1} celkem)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigace stránkování',
      next: 'Další strana',
      previous: 'Předchozí strana',
      page: 'Přejít na stránku {0}',
      currentPage: 'Aktuální stránka, stránka {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/da.ts":
/*!**************************!*\
  !*** ./src/locale/da.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Emblem',
  close: 'Luk',
  dataIterator: {
    noResultsText: 'Ingen matchende data fundet',
    loadingText: 'Indhenter data...'
  },
  dataTable: {
    itemsPerPageText: 'Rækker pr. side:',
    ariaLabel: {
      sortDescending: 'Sorteret faldende.',
      sortAscending: 'Sorteret stigende.',
      sortNone: 'Ikke sorteret.',
      activateNone: 'Aktiver for at fjerne sortering.',
      activateDescending: 'Aktiver for at sortere faldende.',
      activateAscending: 'Aktiver for at sortere stigende.'
    },
    sortBy: 'Sorter efter'
  },
  dataFooter: {
    itemsPerPageText: 'Rækker pr. side:',
    itemsPerPageAll: 'Alle',
    nextPage: 'Næste side',
    prevPage: 'Forrige side',
    firstPage: 'Første side',
    lastPage: 'Sidste side',
    pageText: '{0}-{1} af {2}'
  },
  datePicker: {
    itemsSelected: '{0} valgt',
    nextMonthAriaLabel: 'Næste måned',
    nextYearAriaLabel: 'Næste år',
    prevMonthAriaLabel: 'Forrige måned',
    prevYearAriaLabel: 'Forrige år'
  },
  noDataText: 'Ingen data tilgængelig',
  carousel: {
    prev: 'Forrige visuelle',
    next: 'Næste visuelle',
    ariaLabel: {
      delimiter: 'Karrusel dias {0} af {1}'
    }
  },
  calendar: {
    moreEvents: '{0} mere'
  },
  fileInput: {
    counter: '{0} filer',
    counterSize: '{0} filer ({1} total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Pagineringsnavigation',
      next: 'Næste side',
      previous: 'Forrige side',
      page: 'Gå til side {0}',
      currentPage: 'Nuværende side, Side {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Bedømmelse {0} af {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/de.ts":
/*!**************************!*\
  !*** ./src/locale/de.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Abzeichen',
  close: 'Schließen',
  dataIterator: {
    noResultsText: 'Keine Elemente gefunden',
    loadingText: 'Lade Elemente...'
  },
  dataTable: {
    itemsPerPageText: 'Zeilen pro Seite:',
    ariaLabel: {
      sortDescending: 'Absteigend sortiert.',
      sortAscending: 'Aufsteigend sortiert.',
      sortNone: 'Nicht sortiert.',
      activateNone: 'Aktivieren um Sortierung zu entfernen.',
      activateDescending: 'Aktivieren um absteigend zu sortieren.',
      activateAscending: 'Aktivieren um aufsteigend zu sortieren.'
    },
    sortBy: 'Sortiere nach'
  },
  dataFooter: {
    itemsPerPageText: 'Elemente pro Seite:',
    itemsPerPageAll: 'Alle',
    nextPage: 'Nächste Seite',
    prevPage: 'Vorherige Seite',
    firstPage: 'Erste Seite',
    lastPage: 'Letzte Seite',
    pageText: '{0}-{1} von {2}'
  },
  datePicker: {
    itemsSelected: '{0} ausgewählt',
    nextMonthAriaLabel: 'Nächsten Monat',
    nextYearAriaLabel: 'Nächstes Jahr',
    prevMonthAriaLabel: 'Vorheriger Monat',
    prevYearAriaLabel: 'Vorheriges Jahr'
  },
  noDataText: 'Keine Daten vorhanden',
  carousel: {
    prev: 'Vorheriges Bild',
    next: 'Nächstes Bild',
    ariaLabel: {
      delimiter: 'Element {0} von {1}'
    }
  },
  calendar: {
    moreEvents: '{0} mehr'
  },
  fileInput: {
    counter: '{0} Dateien',
    counterSize: '{0} Dateien ({1} gesamt)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Seitennavigation',
      next: 'Nächste Seite',
      previous: 'Vorherige Seite',
      page: 'Gehe zu Seite {0}',
      currentPage: 'Aktuelle Seite, Seite {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/el.ts":
/*!**************************!*\
  !*** ./src/locale/el.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Σήμα',
  close: 'Close',
  dataIterator: {
    noResultsText: 'Δε βρέθηκαν αποτελέσματα',
    loadingText: 'Loading item...'
  },
  dataTable: {
    itemsPerPageText: 'Γραμμές ανά σελίδα:',
    ariaLabel: {
      sortDescending: 'Sorted descending.',
      sortAscending: 'Sorted ascending.',
      sortNone: 'Not sorted.',
      activateNone: 'Activate to remove sorting.',
      activateDescending: 'Activate to sort descending.',
      activateAscending: 'Activate to sort ascending.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: 'Αντικείμενα ανά σελίδα:',
    itemsPerPageAll: 'Όλα',
    nextPage: 'Επόμενη σελίδα',
    prevPage: 'Προηγούμενη σελίδα',
    firstPage: 'Πρώτη σελίδα',
    lastPage: 'Τελευταία σελίδα',
    pageText: '{0}-{1} από {2}'
  },
  datePicker: {
    itemsSelected: '{0} επιλεγμένα',
    nextMonthAriaLabel: 'Τον επόμενο μήνα',
    nextYearAriaLabel: 'Του χρόνου',
    prevMonthAriaLabel: 'Προηγούμενος μήνας',
    prevYearAriaLabel: 'Προηγούμενο έτος'
  },
  noDataText: 'Χωρίς δεδομένα',
  carousel: {
    prev: 'הקודם חזותי',
    next: 'הבא חזותי',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} ακόμη'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Πλοήγηση με προορισμούς',
      next: 'Επόμενη σελίδα',
      previous: 'Προηγούμενη σελίδα',
      page: 'Πήγαινε στην σελίδα {0}',
      currentPage: 'Τρέχουσα σελίδα, σελίδα {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/en.ts":
/*!**************************!*\
  !*** ./src/locale/en.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Badge',
  close: 'Close',
  dataIterator: {
    noResultsText: 'No matching records found',
    loadingText: 'Loading items...'
  },
  dataTable: {
    itemsPerPageText: 'Rows per page:',
    ariaLabel: {
      sortDescending: 'Sorted descending.',
      sortAscending: 'Sorted ascending.',
      sortNone: 'Not sorted.',
      activateNone: 'Activate to remove sorting.',
      activateDescending: 'Activate to sort descending.',
      activateAscending: 'Activate to sort ascending.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: 'Items per page:',
    itemsPerPageAll: 'All',
    nextPage: 'Next page',
    prevPage: 'Previous page',
    firstPage: 'First page',
    lastPage: 'Last page',
    pageText: '{0}-{1} of {2}'
  },
  datePicker: {
    itemsSelected: '{0} selected',
    nextMonthAriaLabel: 'Next month',
    nextYearAriaLabel: 'Next year',
    prevMonthAriaLabel: 'Previous month',
    prevYearAriaLabel: 'Previous year'
  },
  noDataText: 'No data available',
  carousel: {
    prev: 'Previous visual',
    next: 'Next visual',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} more'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Pagination Navigation',
      next: 'Next page',
      previous: 'Previous page',
      page: 'Goto Page {0}',
      currentPage: 'Page {0}, Current Page',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/es.ts":
/*!**************************!*\
  !*** ./src/locale/es.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Placa',
  close: 'Cerrar',
  dataIterator: {
    noResultsText: 'Ningún elemento coincide con la búsqueda',
    loadingText: 'Cargando...'
  },
  dataTable: {
    itemsPerPageText: 'Filas por página:',
    ariaLabel: {
      sortDescending: 'Orden descendente.',
      sortAscending: 'Orden ascendente.',
      sortNone: 'Sin ordenar.',
      activateNone: 'Pulse para quitar orden.',
      activateDescending: 'Pulse para ordenar descendente.',
      activateAscending: 'Pulse para ordenar ascendente.'
    },
    sortBy: 'Ordenado por'
  },
  dataFooter: {
    itemsPerPageText: 'Elementos por página:',
    itemsPerPageAll: 'Todos',
    nextPage: 'Página siguiente',
    prevPage: 'Página anterior',
    firstPage: 'Primer página',
    lastPage: 'Última página',
    pageText: '{0}-{1} de {2}'
  },
  datePicker: {
    itemsSelected: '{0} seleccionados',
    nextMonthAriaLabel: 'Próximo mes',
    nextYearAriaLabel: 'Próximo año',
    prevMonthAriaLabel: 'Mes anterior',
    prevYearAriaLabel: 'Año anterior'
  },
  noDataText: 'No hay datos disponibles',
  carousel: {
    prev: 'Visual anterior',
    next: 'Visual siguiente',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} más'
  },
  fileInput: {
    counter: '{0} archivos',
    counterSize: '{0} archivos ({1} en total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navegación de paginación',
      next: 'Página siguiente',
      previous: 'Página anterior',
      page: 'Ir a la página {0}',
      currentPage: 'Página actual, página {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/et.ts":
/*!**************************!*\
  !*** ./src/locale/et.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Märk',
  close: 'Sulge',
  dataIterator: {
    noResultsText: 'Vastavaid kirjeid ei leitud',
    loadingText: 'Andmeid laaditakse...'
  },
  dataTable: {
    itemsPerPageText: 'Ridu leheküljel:',
    ariaLabel: {
      sortDescending: 'Kahanevalt sorteeritud.',
      sortAscending: 'Kasvavalt sorteeritud.',
      sortNone: 'Ei ole sorteeritud.',
      activateNone: 'Vajuta uuesti sorteerimise eemaldamiseks.',
      activateDescending: 'Vajuta uuesti, et sorteerida kahanevalt.',
      activateAscending: 'Vajuta kasvavalt sorteerimiseks.'
    },
    sortBy: 'Sorteerimise alus'
  },
  dataFooter: {
    itemsPerPageText: 'Kirjeid leheküljel:',
    itemsPerPageAll: 'Kõik',
    nextPage: 'Järgmine lehekülg',
    prevPage: 'Eelmine lehekülg',
    firstPage: 'Esimene lehekülg',
    lastPage: 'Viimane lehekülg',
    pageText: '{0}-{1} {2}st'
  },
  datePicker: {
    itemsSelected: '{0} valitud',
    nextMonthAriaLabel: 'Järgmine kuu',
    nextYearAriaLabel: 'Järgmine aasta',
    prevMonthAriaLabel: 'Eelmine kuu',
    prevYearAriaLabel: 'Eelmine aasta'
  },
  noDataText: 'Andmed puuduvad',
  carousel: {
    prev: 'Eelmine visuaalne',
    next: 'Järgmine visuaalne',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} veel'
  },
  fileInput: {
    counter: '{0} faili',
    counterSize: '{0} faili (kokku {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Pagination Navigation',
      next: 'Järgmine lehekülg',
      previous: 'Eelmine lehekülg',
      page: 'Mine lehele {0}',
      currentPage: 'Praegune leht, leht {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/fa.ts":
/*!**************************!*\
  !*** ./src/locale/fa.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'نشان',
  close: 'بستن',
  dataIterator: {
    noResultsText: 'نتیجه‌ای یافت نشد',
    loadingText: 'در حال بارگذاری...'
  },
  dataTable: {
    itemsPerPageText: 'ردیف در صفحه:',
    ariaLabel: {
      sortDescending: 'مرتب‌سازی نزولی',
      sortAscending: 'مرتب‌سازی صعودی',
      sortNone: 'بدون مرتب‌سازی',
      activateNone: 'غیرفعال‌سازی مرتب‌سازی',
      activateDescending: 'غیرفعال‌سازی مرتب‌سازی نزولی',
      activateAscending: 'غیرفعال‌سازی مرتب‌سازی صعودی'
    },
    sortBy: 'مرتب‌سازی براساس'
  },
  dataFooter: {
    itemsPerPageText: 'ردیف در صفحه:',
    itemsPerPageAll: 'همه',
    nextPage: 'صفحه‌ی بعد',
    prevPage: 'صفحه‌ی قبل',
    firstPage: 'صفحه‌ی یکم',
    lastPage: 'صفحه‌ی آخر',
    pageText: '{0} تا {1} از {2}'
  },
  datePicker: {
    itemsSelected: '{0} انتخاب شده',
    nextMonthAriaLabel: 'ماه بعد',
    nextYearAriaLabel: 'سال بعد',
    prevMonthAriaLabel: 'ماه قبل',
    prevYearAriaLabel: 'سال قبل'
  },
  noDataText: 'داده‌ای موجود نیست',
  carousel: {
    prev: 'اسلاید قبلی',
    next: 'اسلاید بعدی',
    ariaLabel: {
      delimiter: 'اسلاید {0} از {1}'
    }
  },
  calendar: {
    moreEvents: '{بیشتر {0'
  },
  fileInput: {
    counter: '{0} پرونده',
    counterSize: '{0} پرونده ({1} در کل)'
  },
  timePicker: {
    am: 'قبل از ظهر',
    pm: 'بعد از ظهر'
  },
  pagination: {
    ariaLabel: {
      root: 'جهت یابی صفحه',
      next: 'صفحه بعد',
      previous: 'صفحه قبلی',
      page: 'برو صفحه {0}',
      currentPage: '{0} صفحه فعلی ، صفحه',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/fi.ts":
/*!**************************!*\
  !*** ./src/locale/fi.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Infopiste',
  close: 'Sulje',
  dataIterator: {
    noResultsText: 'Ei osumia',
    loadingText: 'Ladataan kohteita...'
  },
  dataTable: {
    itemsPerPageText: 'Rivejä sivulla:',
    ariaLabel: {
      sortDescending: ': Järjestetty laskevasti. Poista järjestäminen aktivoimalla.',
      sortAscending: ': Järjestetty nousevasti. Järjestä laskevasti aktivoimalla.',
      sortNone: ': Ei järjestetty. Järjestä nousevasti aktivoimalla.',
      activateNone: 'Aktivoi lajittelun poistamiseksi.',
      activateDescending: 'Aktivoi laskevien laskevien lajittelemiseksi.',
      activateAscending: 'Aktivoi lajitella nouseva.'
    },
    sortBy: 'Järjestä'
  },
  dataFooter: {
    itemsPerPageText: 'Kohteita sivulla:',
    itemsPerPageAll: 'Kaikki',
    nextPage: 'Seuraava sivu',
    prevPage: 'Edellinen sivu',
    firstPage: 'Ensimmäinen sivu',
    lastPage: 'Viimeinen sivu',
    pageText: '{0}-{1} ({2})'
  },
  datePicker: {
    itemsSelected: '{0} valittu',
    nextMonthAriaLabel: 'Seuraava kuukausi',
    nextYearAriaLabel: 'Ensi vuosi',
    prevMonthAriaLabel: 'Edellinen kuukausi',
    prevYearAriaLabel: 'Edellinen vuosi'
  },
  noDataText: 'Ei dataa',
  carousel: {
    prev: 'Edellinen kuva',
    next: 'Seuraava kuva',
    ariaLabel: {
      delimiter: 'Karusellin kuva {0}/{1}'
    }
  },
  calendar: {
    moreEvents: '{0} lisää'
  },
  fileInput: {
    counter: '{0} tiedostoa',
    counterSize: '{0} tiedostoa ({1} yhteensä)'
  },
  timePicker: {
    am: 'ap.',
    pm: 'ip.'
  },
  pagination: {
    ariaLabel: {
      root: 'Pagination Navigation',
      next: 'Next page',
      previous: 'Previous page',
      page: 'Goto Page {0}',
      currentPage: 'Current Page, Page {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/fr.ts":
/*!**************************!*\
  !*** ./src/locale/fr.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Badge',
  close: 'Fermer',
  dataIterator: {
    noResultsText: 'Aucun enregistrement correspondant trouvé',
    loadingText: `Chargement de l'élément...`
  },
  dataTable: {
    itemsPerPageText: 'Lignes par page :',
    ariaLabel: {
      sortDescending: 'Tri décroissant.',
      sortAscending: 'Tri croissant.',
      sortNone: 'Non trié.',
      activateNone: 'Activer pour supprimer le tri.',
      activateDescending: 'Activer pour trier par ordre décroissant.',
      activateAscending: 'Activer pour trier par ordre croissant.'
    },
    sortBy: 'Trier par'
  },
  dataFooter: {
    itemsPerPageText: 'Élements par page :',
    itemsPerPageAll: 'Tous',
    nextPage: 'Page suivante',
    prevPage: 'Page précédente',
    firstPage: 'Première page',
    lastPage: 'Dernière page',
    pageText: '{0}-{1} de {2}'
  },
  datePicker: {
    itemsSelected: '{0} sélectionné(s)',
    nextMonthAriaLabel: 'Le mois prochain',
    nextYearAriaLabel: `L'année prochaine`,
    prevMonthAriaLabel: 'Le mois précédent',
    prevYearAriaLabel: 'Année précédente'
  },
  noDataText: 'Aucune donnée disponible',
  carousel: {
    prev: 'Visuel précédent',
    next: 'Visuel suivant',
    ariaLabel: {
      delimiter: 'Diapositive {0} de {1}'
    }
  },
  calendar: {
    moreEvents: '{0} de plus'
  },
  fileInput: {
    counter: '{0} fichier(s)',
    counterSize: '{0} fichier(s) ({1} au total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigation de pagination',
      next: 'Page suivante',
      previous: 'Page précédente',
      page: 'Aller à la page {0}',
      currentPage: 'Page actuelle, Page {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/he.ts":
/*!**************************!*\
  !*** ./src/locale/he.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'תג',
  close: 'סגור',
  dataIterator: {
    noResultsText: 'לא נמצאו תוצאות מתאימות',
    loadingText: 'טוען פריט...'
  },
  dataTable: {
    itemsPerPageText: 'שורות לעמוד:',
    ariaLabel: {
      sortDescending: 'ממוין לפי סדר עולה. לחץ להספקת המיון.',
      sortAscending: 'ממוין לפי סדר יורד. לחץ למיון לפי סדר עולה.',
      sortNone: 'לא ממוין. לחץ למיון לפי סדר עולה.',
      activateNone: 'הפעל להסרת המיון.',
      activateDescending: 'הפעל למיון יורד.',
      activateAscending: 'הפעל למיון עולה.'
    },
    sortBy: 'סדר לפי'
  },
  dataFooter: {
    itemsPerPageText: 'פריטים לדף:',
    itemsPerPageAll: 'הכל',
    nextPage: 'עמוד הבא',
    prevPage: 'עמוד הקודם',
    firstPage: 'עמוד ראשון',
    lastPage: 'עמוד אחרון',
    pageText: '{0}-{1} מתוך {2}'
  },
  datePicker: {
    itemsSelected: '{0} נבחרו',
    nextMonthAriaLabel: 'חודש הבא',
    nextYearAriaLabel: 'שנה הבאה',
    prevMonthAriaLabel: 'חודש שעבר',
    prevYearAriaLabel: 'שנה שעברה'
  },
  noDataText: 'אין נתונים זמינים',
  carousel: {
    prev: 'מצג קודם',
    next: 'מצג הבא',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} נוספים'
  },
  fileInput: {
    counter: '{0} קבצים',
    counterSize: '{0} קבצים ({1} בסך הכל)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'ניווט עימוד',
      next: 'עמוד הבא',
      previous: 'עמוד הקודם',
      page: '{0} לך לעמוד',
      currentPage: '{0} עמוד נוכחי, עמוד',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/hr.ts":
/*!**************************!*\
  !*** ./src/locale/hr.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Bedž',
  close: 'Zatvori',
  dataIterator: {
    noResultsText: 'Nisu pronađene odgovarajuće stavke',
    loadingText: 'Učitavanje...'
  },
  dataTable: {
    itemsPerPageText: 'Redaka po stranici:',
    ariaLabel: {
      sortDescending: 'Sortirano silazno.',
      sortAscending: 'Sortirano uzlazno.',
      sortNone: 'Nije sortirano.',
      activateNone: 'Odaberite za uklanjanje sortiranja.',
      activateDescending: 'Odaberite za silazno sortiranje.',
      activateAscending: 'Odaberite za uzlazno sortiranje.'
    },
    sortBy: 'Sortirajte po'
  },
  dataFooter: {
    itemsPerPageText: 'Stavki po stranici:',
    itemsPerPageAll: 'Sve',
    nextPage: 'Sljedeća stranica',
    prevPage: 'Prethodna stranica',
    firstPage: 'Prva stranica',
    lastPage: 'Posljednja stranica',
    pageText: '{0}-{1} od {2}'
  },
  datePicker: {
    itemsSelected: '{0} odabrano',
    nextMonthAriaLabel: 'Sljedeći mjesec',
    nextYearAriaLabel: 'Slijedeće godine',
    prevMonthAriaLabel: 'Prethodni mjesec',
    prevYearAriaLabel: 'Prošla godina'
  },
  noDataText: 'Nema dostupnih podataka',
  carousel: {
    prev: 'Prethodno',
    next: 'Sljedeće',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: 'Još {0}'
  },
  fileInput: {
    counter: 'Odabranih datoteka: {0}',
    counterSize: 'Odabranih datoteka: {0} ({1} ukupno)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigacija stranicama',
      next: 'Sljedeća stranica',
      previous: 'Prethodna stranica',
      page: 'Idi na stranicu {0}',
      currentPage: 'Trenutna stranica, stranica {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/hu.ts":
/*!**************************!*\
  !*** ./src/locale/hu.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Jelvény',
  close: 'Bezárás',
  dataIterator: {
    noResultsText: 'Nincs egyező találat',
    loadingText: 'Betöltés...'
  },
  dataTable: {
    itemsPerPageText: 'Elem oldalanként:',
    ariaLabel: {
      sortDescending: 'Csökkenő sorrendbe rendezve.',
      sortAscending: 'Növekvő sorrendbe rendezve.',
      sortNone: 'Rendezetlen.',
      activateNone: 'Rendezés törlése.',
      activateDescending: 'Aktiváld a csökkenő rendezésért.',
      activateAscending: 'Aktiváld a növekvő rendezésért.'
    },
    sortBy: 'Rendezés'
  },
  dataFooter: {
    itemsPerPageText: 'Elem oldalanként:',
    itemsPerPageAll: 'Mind',
    nextPage: 'Következő oldal',
    prevPage: 'Előző oldal',
    firstPage: 'Első oldal',
    lastPage: 'Utolsó oldal',
    pageText: '{0}-{1} / {2}'
  },
  datePicker: {
    itemsSelected: '{0} kiválasztva',
    nextMonthAriaLabel: 'Következő hónap',
    nextYearAriaLabel: 'Következő év',
    prevMonthAriaLabel: 'Előző hónap',
    prevYearAriaLabel: 'Előző év'
  },
  noDataText: 'Nincs elérhető adat',
  carousel: {
    prev: 'Előző',
    next: 'Következő',
    ariaLabel: {
      delimiter: 'Dia {0}/{1}'
    }
  },
  calendar: {
    moreEvents: '{0} további'
  },
  fileInput: {
    counter: '{0} fájl',
    counterSize: '{0} fájl ({1} összesen)'
  },
  timePicker: {
    am: 'de',
    pm: 'du'
  },
  pagination: {
    ariaLabel: {
      root: 'Oldal navigáció',
      next: 'Következő oldal',
      previous: 'Előző oldal',
      page: 'Menj a(z) {0}. oldalra',
      currentPage: 'Aktuális oldal: {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/id.ts":
/*!**************************!*\
  !*** ./src/locale/id.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Lencana',
  close: 'Tutup',
  dataIterator: {
    noResultsText: 'Tidak ditemukan catatan yang cocok',
    loadingText: 'Memuat data...'
  },
  dataTable: {
    itemsPerPageText: 'Baris per halaman:',
    ariaLabel: {
      sortDescending: 'Diurutkan kebawah.',
      sortAscending: 'Diurutkan keatas.',
      sortNone: 'Tidak diurutkan.',
      activateNone: 'Aktifkan untuk menghapus penyortiran.',
      activateDescending: 'Aktifkan untuk mengurutkan kebawah.',
      activateAscending: 'Aktifkan untuk mengurutkan keatas.'
    },
    sortBy: 'Urutkan berdasar'
  },
  dataFooter: {
    itemsPerPageText: 'Item per halaman:',
    itemsPerPageAll: 'Semua',
    nextPage: 'Halaman selanjutnya',
    prevPage: 'Halaman sebelumnya',
    firstPage: 'Halaman pertama',
    lastPage: 'Halaman terakhir',
    pageText: '{0}-{1} dari {2}'
  },
  datePicker: {
    itemsSelected: '{0} dipilih',
    nextMonthAriaLabel: 'Bulan depan',
    nextYearAriaLabel: 'Tahun depan',
    prevMonthAriaLabel: 'Bulan sebelumnya',
    prevYearAriaLabel: 'Tahun sebelumnya'
  },
  noDataText: 'Tidak ada data tersedia',
  carousel: {
    prev: 'Visual sebelumnya',
    next: 'Visual selanjutnya',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} lagi'
  },
  fileInput: {
    counter: '{0} berkas',
    counterSize: '{0} berkas (dari total {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigasi Pagination',
      next: 'Halaman selanjutnya',
      previous: 'Halaman sebelumnya',
      page: 'Buka halaman {0}',
      currentPage: 'Halaman Saat Ini, Halaman {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/index.ts":
/*!*****************************!*\
  !*** ./src/locale/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "af": () => (/* reexport safe */ _af__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "ar": () => (/* reexport safe */ _ar__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "bg": () => (/* reexport safe */ _bg__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "ca": () => (/* reexport safe */ _ca__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "ckb": () => (/* reexport safe */ _ckb__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "cs": () => (/* reexport safe */ _cs__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "da": () => (/* reexport safe */ _da__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "de": () => (/* reexport safe */ _de__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "el": () => (/* reexport safe */ _el__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "en": () => (/* reexport safe */ _en__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "es": () => (/* reexport safe */ _es__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "et": () => (/* reexport safe */ _et__WEBPACK_IMPORTED_MODULE_11__.default),
/* harmony export */   "fa": () => (/* reexport safe */ _fa__WEBPACK_IMPORTED_MODULE_12__.default),
/* harmony export */   "fi": () => (/* reexport safe */ _fi__WEBPACK_IMPORTED_MODULE_13__.default),
/* harmony export */   "fr": () => (/* reexport safe */ _fr__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "hr": () => (/* reexport safe */ _hr__WEBPACK_IMPORTED_MODULE_15__.default),
/* harmony export */   "hu": () => (/* reexport safe */ _hu__WEBPACK_IMPORTED_MODULE_16__.default),
/* harmony export */   "he": () => (/* reexport safe */ _he__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "id": () => (/* reexport safe */ _id__WEBPACK_IMPORTED_MODULE_18__.default),
/* harmony export */   "it": () => (/* reexport safe */ _it__WEBPACK_IMPORTED_MODULE_19__.default),
/* harmony export */   "ja": () => (/* reexport safe */ _ja__WEBPACK_IMPORTED_MODULE_20__.default),
/* harmony export */   "ko": () => (/* reexport safe */ _ko__WEBPACK_IMPORTED_MODULE_21__.default),
/* harmony export */   "lv": () => (/* reexport safe */ _lv__WEBPACK_IMPORTED_MODULE_22__.default),
/* harmony export */   "lt": () => (/* reexport safe */ _lt__WEBPACK_IMPORTED_MODULE_23__.default),
/* harmony export */   "nl": () => (/* reexport safe */ _nl__WEBPACK_IMPORTED_MODULE_24__.default),
/* harmony export */   "no": () => (/* reexport safe */ _no__WEBPACK_IMPORTED_MODULE_25__.default),
/* harmony export */   "pl": () => (/* reexport safe */ _pl__WEBPACK_IMPORTED_MODULE_26__.default),
/* harmony export */   "pt": () => (/* reexport safe */ _pt__WEBPACK_IMPORTED_MODULE_27__.default),
/* harmony export */   "ro": () => (/* reexport safe */ _ro__WEBPACK_IMPORTED_MODULE_28__.default),
/* harmony export */   "ru": () => (/* reexport safe */ _ru__WEBPACK_IMPORTED_MODULE_29__.default),
/* harmony export */   "sk": () => (/* reexport safe */ _sk__WEBPACK_IMPORTED_MODULE_30__.default),
/* harmony export */   "sl": () => (/* reexport safe */ _sl__WEBPACK_IMPORTED_MODULE_31__.default),
/* harmony export */   "srCyrl": () => (/* reexport safe */ _sr_Cyrl__WEBPACK_IMPORTED_MODULE_32__.default),
/* harmony export */   "srLatn": () => (/* reexport safe */ _sr_Latn__WEBPACK_IMPORTED_MODULE_33__.default),
/* harmony export */   "sv": () => (/* reexport safe */ _sv__WEBPACK_IMPORTED_MODULE_34__.default),
/* harmony export */   "th": () => (/* reexport safe */ _th__WEBPACK_IMPORTED_MODULE_35__.default),
/* harmony export */   "tr": () => (/* reexport safe */ _tr__WEBPACK_IMPORTED_MODULE_36__.default),
/* harmony export */   "az": () => (/* reexport safe */ _az__WEBPACK_IMPORTED_MODULE_37__.default),
/* harmony export */   "uk": () => (/* reexport safe */ _uk__WEBPACK_IMPORTED_MODULE_38__.default),
/* harmony export */   "vi": () => (/* reexport safe */ _vi__WEBPACK_IMPORTED_MODULE_39__.default),
/* harmony export */   "zhHans": () => (/* reexport safe */ _zh_Hans__WEBPACK_IMPORTED_MODULE_40__.default),
/* harmony export */   "zhHant": () => (/* reexport safe */ _zh_Hant__WEBPACK_IMPORTED_MODULE_41__.default),
/* harmony export */   "rtl": () => (/* binding */ rtl)
/* harmony export */ });
/* harmony import */ var _af__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./af */ "./src/locale/af.ts");
/* harmony import */ var _ar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ar */ "./src/locale/ar.ts");
/* harmony import */ var _bg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bg */ "./src/locale/bg.ts");
/* harmony import */ var _ca__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ca */ "./src/locale/ca.ts");
/* harmony import */ var _ckb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ckb */ "./src/locale/ckb.ts");
/* harmony import */ var _cs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cs */ "./src/locale/cs.ts");
/* harmony import */ var _da__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./da */ "./src/locale/da.ts");
/* harmony import */ var _de__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./de */ "./src/locale/de.ts");
/* harmony import */ var _el__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./el */ "./src/locale/el.ts");
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./en */ "./src/locale/en.ts");
/* harmony import */ var _es__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./es */ "./src/locale/es.ts");
/* harmony import */ var _et__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./et */ "./src/locale/et.ts");
/* harmony import */ var _fa__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fa */ "./src/locale/fa.ts");
/* harmony import */ var _fi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fi */ "./src/locale/fi.ts");
/* harmony import */ var _fr__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fr */ "./src/locale/fr.ts");
/* harmony import */ var _hr__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./hr */ "./src/locale/hr.ts");
/* harmony import */ var _hu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./hu */ "./src/locale/hu.ts");
/* harmony import */ var _he__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./he */ "./src/locale/he.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./id */ "./src/locale/id.ts");
/* harmony import */ var _it__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./it */ "./src/locale/it.ts");
/* harmony import */ var _ja__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ja */ "./src/locale/ja.ts");
/* harmony import */ var _ko__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ko */ "./src/locale/ko.ts");
/* harmony import */ var _lv__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./lv */ "./src/locale/lv.ts");
/* harmony import */ var _lt__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./lt */ "./src/locale/lt.ts");
/* harmony import */ var _nl__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./nl */ "./src/locale/nl.ts");
/* harmony import */ var _no__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./no */ "./src/locale/no.ts");
/* harmony import */ var _pl__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pl */ "./src/locale/pl.ts");
/* harmony import */ var _pt__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./pt */ "./src/locale/pt.ts");
/* harmony import */ var _ro__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./ro */ "./src/locale/ro.ts");
/* harmony import */ var _ru__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./ru */ "./src/locale/ru.ts");
/* harmony import */ var _sk__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./sk */ "./src/locale/sk.ts");
/* harmony import */ var _sl__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./sl */ "./src/locale/sl.ts");
/* harmony import */ var _sr_Cyrl__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./sr-Cyrl */ "./src/locale/sr-Cyrl.ts");
/* harmony import */ var _sr_Latn__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./sr-Latn */ "./src/locale/sr-Latn.ts");
/* harmony import */ var _sv__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./sv */ "./src/locale/sv.ts");
/* harmony import */ var _th__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./th */ "./src/locale/th.ts");
/* harmony import */ var _tr__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./tr */ "./src/locale/tr.ts");
/* harmony import */ var _az__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./az */ "./src/locale/az.ts");
/* harmony import */ var _uk__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./uk */ "./src/locale/uk.ts");
/* harmony import */ var _vi__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./vi */ "./src/locale/vi.ts");
/* harmony import */ var _zh_Hans__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./zh-Hans */ "./src/locale/zh-Hans.ts");
/* harmony import */ var _zh_Hant__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./zh-Hant */ "./src/locale/zh-Hant.ts");










































const rtl = {
  af: false,
  ar: true,
  bg: false,
  ca: false,
  ckb: false,
  cs: false,
  de: false,
  el: false,
  en: false,
  es: false,
  et: false,
  fa: false,
  fi: false,
  fr: false,
  hr: false,
  hu: false,
  he: true,
  id: false,
  it: false,
  ja: false,
  ko: false,
  lv: false,
  lt: false,
  nl: false,
  no: false,
  pl: false,
  pt: false,
  ro: false,
  ru: false,
  sk: false,
  sl: false,
  srCyrl: false,
  srLatn: false,
  sv: false,
  th: false,
  tr: false,
  az: false,
  uk: false,
  vi: false,
  zhHans: false,
  zhHant: false
};

/***/ }),

/***/ "./src/locale/it.ts":
/*!**************************!*\
  !*** ./src/locale/it.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Distintivo',
  close: 'Chiudi',
  dataIterator: {
    noResultsText: 'Nessun risultato trovato',
    loadingText: 'Caricamento in corso...'
  },
  dataTable: {
    itemsPerPageText: 'Righe per pagina:',
    ariaLabel: {
      sortDescending: 'Ordinati in ordine decrescente.',
      sortAscending: 'Ordinati in ordine crescente.',
      sortNone: 'Non ordinato.',
      activateNone: `Attiva per rimuovere l'ordinamento.`,
      activateDescending: 'Attiva per ordinare in ordine decrescente.',
      activateAscending: 'Attiva per ordinare in ordine crescente.'
    },
    sortBy: 'Ordina per'
  },
  dataFooter: {
    itemsPerPageText: 'Elementi per pagina:',
    itemsPerPageAll: 'Tutti',
    nextPage: 'Pagina seguente',
    prevPage: 'Pagina precedente',
    firstPage: 'Pagina prima',
    lastPage: 'Pagina ultima',
    pageText: '{0}-{1} di {2}'
  },
  datePicker: {
    itemsSelected: '{0} selezionati',
    nextMonthAriaLabel: 'Il prossimo mese',
    nextYearAriaLabel: `L'anno prossimo`,
    prevMonthAriaLabel: 'Il mese scorso',
    prevYearAriaLabel: `L'anno scorso`
  },
  noDataText: 'Nessun elemento disponibile',
  carousel: {
    prev: 'Vista precedente',
    next: 'Prossima vista',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} di più'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in totale)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigazione impaginazione',
      next: 'Pagina seguente',
      previous: 'Pagina precedente',
      page: 'Vai alla pagina {0}',
      currentPage: 'Pagina corrente, pagina {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/ja.ts":
/*!**************************!*\
  !*** ./src/locale/ja.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'バッジ',
  close: '閉じる',
  dataIterator: {
    noResultsText: '検索結果が見つかりません。',
    loadingText: '項目をロード中です...'
  },
  dataTable: {
    itemsPerPageText: '1ページあたりの行数：',
    ariaLabel: {
      sortDescending: '降順の並び替え。',
      sortAscending: '昇順の並び替え。',
      sortNone: 'ソートされていません。',
      activateNone: 'ソートを削除するには有効にしてください。',
      activateDescending: '降順の並び替えのためには有効にしてください。',
      activateAscending: '昇順のソートのためには有効にしてください。'
    },
    sortBy: 'ソート方式'
  },
  dataFooter: {
    itemsPerPageText: '1ページあたりの件数：',
    itemsPerPageAll: 'すべて',
    nextPage: '次のページ',
    prevPage: '前のページ',
    firstPage: '最初のページ',
    lastPage: '最後のページ',
    pageText: '{0}-{1} 件目 / {2}件'
  },
  datePicker: {
    itemsSelected: '{0}日付選択',
    nextMonthAriaLabel: '来月',
    nextYearAriaLabel: '来年',
    prevMonthAriaLabel: '前月',
    prevYearAriaLabel: '前年'
  },
  noDataText: 'データはありません。',
  carousel: {
    prev: '前のビジュアル',
    next: '次のビジュアル',
    ariaLabel: {
      delimiter: 'カルーセルのスライド {0}件目 / {1}件'
    }
  },
  calendar: {
    moreEvents: 'さらに{0}'
  },
  fileInput: {
    counter: '{0} ファイル',
    counterSize: '{0} ファイル (合計 {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'ページネーションナビゲーション',
      next: '次のページ',
      previous: '前のページ',
      page: '{0}ページ目に移動',
      currentPage: '現在のページ、ページ {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: '評価 {1} のうち {0}'
    }
  }
});

/***/ }),

/***/ "./src/locale/ko.ts":
/*!**************************!*\
  !*** ./src/locale/ko.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: '배지',
  close: '닫기',
  dataIterator: {
    noResultsText: '일치하는 항목이 없습니다.',
    loadingText: '불러오는 중...'
  },
  dataTable: {
    itemsPerPageText: '페이지 당 행 수:',
    ariaLabel: {
      sortDescending: '내림차순 정렬.',
      sortAscending: '오름차순 정렬.',
      sortNone: '정렬하지 않음.',
      activateNone: '정렬을 취소하려면 활성화하세요.',
      activateDescending: '내림차순 정렬을 위해 활성화하세요.',
      activateAscending: '오름차순 정렬을 위해 활성화하세요.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: '페이지 당 항목 수:',
    itemsPerPageAll: '전체',
    nextPage: '다음 페이지',
    prevPage: '이전 페이지',
    firstPage: '첫 페이지',
    lastPage: '마지막 페이지',
    pageText: '{2} 중 {0}-{1}'
  },
  datePicker: {
    itemsSelected: '{0} 선택됨',
    nextMonthAriaLabel: '다음 달',
    nextYearAriaLabel: '내년',
    prevMonthAriaLabel: '지난달',
    prevYearAriaLabel: '전년도'
  },
  noDataText: '데이터가 없습니다.',
  carousel: {
    prev: '이전 화면',
    next: '다음 화면',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} 더보기'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in total)'
  },
  timePicker: {
    am: '오전',
    pm: '오후'
  },
  pagination: {
    ariaLabel: {
      root: 'Pagination Navigation',
      next: '다음 페이지',
      previous: '이전 페이지',
      page: '고토 페이지 {0}',
      currentPage: '현재 페이지, 페이지 {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/lt.ts":
/*!**************************!*\
  !*** ./src/locale/lt.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Ženklelis',
  close: 'Uždaryti',
  dataIterator: {
    noResultsText: 'Nerasta atitinkančių įrašų',
    loadingText: 'Kraunama...'
  },
  dataTable: {
    itemsPerPageText: 'Eilutės per puslapį:',
    ariaLabel: {
      sortDescending: 'Išrikiuota mažėjimo tvarka.',
      sortAscending: 'Išrikiuota didėjimo tvarka.',
      sortNone: 'Nerikiuota.',
      activateNone: 'Suaktyvinkite, jei norite rikiavimą pašalinti.',
      activateDescending: 'Suaktyvinkite, jei norite rikiuoti mažėjimo tvarka.',
      activateAscending: 'Suaktyvinkite, jei norite rikiuoti didėjimo tvarka.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: 'Įrašai per puslapį:',
    itemsPerPageAll: 'Visi',
    nextPage: 'Kitas puslapis',
    prevPage: 'Ankstesnis puslapis',
    firstPage: 'Pirmas puslapis',
    lastPage: 'Paskutinis puslapis',
    pageText: '{0}-{1} iš {2}'
  },
  datePicker: {
    itemsSelected: '{0} pasirinkta',
    nextMonthAriaLabel: 'Kitą mėnesį',
    nextYearAriaLabel: 'Kitais metais',
    prevMonthAriaLabel: 'Praeita mėnesį',
    prevYearAriaLabel: 'Praeiti metai'
  },
  noDataText: 'Nėra duomenų',
  carousel: {
    prev: 'Ankstesnioji skaidrė',
    next: 'Kita skaidrė',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: 'Daugiau {0}'
  },
  fileInput: {
    counter: '{0} failų',
    counterSize: '{0} failų ({1} iš viso)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Puslapio naršymas',
      next: 'Kitas puslapis',
      previous: 'Ankstesnis puslapis',
      page: 'Eiti į puslapį {0}',
      currentPage: 'Dabartinis puslapis, puslapis {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/lv.ts":
/*!**************************!*\
  !*** ./src/locale/lv.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Žetons',
  close: 'Aizvērt',
  dataIterator: {
    noResultsText: 'Nekas netika atrasts',
    loadingText: 'Ielādē...'
  },
  dataTable: {
    itemsPerPageText: 'Rādīt lapā:',
    ariaLabel: {
      sortDescending: 'Sakārtots dilstošā secībā.',
      sortAscending: 'Sakārtots augošā secībā.',
      sortNone: 'Nav sakārtots.',
      activateNone: 'Aktivizēt, lai noņemtu kārtošanu.',
      activateDescending: 'Aktivizēt, lai sakārtotu dilstošā secībā.',
      activateAscending: 'Aktivizēt, lai sakārtotu augošā secībā.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: 'Rādīt lapā:',
    itemsPerPageAll: 'Visu',
    nextPage: 'Nākamā lapa',
    prevPage: 'Iepriekšējā lapa',
    firstPage: 'Pirmā lapa',
    lastPage: 'Pēdējā lapa',
    pageText: '{0}-{1} no {2}'
  },
  datePicker: {
    itemsSelected: '{0} izvēlēts',
    nextMonthAriaLabel: 'Nākammēnes',
    nextYearAriaLabel: 'Nākamgad',
    prevMonthAriaLabel: 'Iepriekšējais mēnesis',
    prevYearAriaLabel: 'Iepriekšējais gads'
  },
  noDataText: 'Nav pieejamu datu',
  carousel: {
    prev: 'Iepriekšējais slaids',
    next: 'Nākamais slaids',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: 'Vēl {0}'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigācija paginationā',
      next: 'Nākamā lapa',
      previous: 'Iepriekšējā lapa',
      page: 'Iet uz lapu {0}',
      currentPage: 'Pašreizējā lapa, lapa {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/nl.ts":
/*!**************************!*\
  !*** ./src/locale/nl.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'insigne',
  close: 'Sluiten',
  dataIterator: {
    noResultsText: 'Geen overeenkomende resultaten gevonden',
    loadingText: 'Items aan het laden...'
  },
  dataTable: {
    itemsPerPageText: 'Rijen per pagina:',
    ariaLabel: {
      sortDescending: 'Aflopend gesorteerd.',
      sortAscending: 'Oplopend gesorteerd.',
      sortNone: 'Niet gesorteerd.',
      activateNone: 'Activeer om de sortering te verwijderen.',
      activateDescending: 'Activeer om aflopend te sorteren.',
      activateAscending: 'Activeer om oplopend te sorteren.'
    },
    sortBy: 'Sorteer volgens'
  },
  dataFooter: {
    itemsPerPageText: 'Aantal per pagina:',
    itemsPerPageAll: 'Alles',
    nextPage: 'Volgende pagina',
    prevPage: 'Vorige pagina',
    firstPage: 'Eerste pagina',
    lastPage: 'Laatste pagina',
    pageText: '{0}-{1} van {2}'
  },
  datePicker: {
    itemsSelected: '{0} geselecteerd',
    nextMonthAriaLabel: 'Volgende maand',
    nextYearAriaLabel: 'Volgend jaar',
    prevMonthAriaLabel: 'Vorige maand',
    prevYearAriaLabel: 'Vorig jaar'
  },
  noDataText: 'Geen gegevens beschikbaar',
  carousel: {
    prev: 'Vorig beeld',
    next: 'Volgend beeld',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} meer'
  },
  fileInput: {
    counter: '{0} bestanden',
    counterSize: '{0} bestanden ({1} in totaal)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Paginanavigatie',
      next: 'Volgende pagina',
      previous: 'Vorige pagina',
      page: 'Ga naar pagina {0}',
      currentPage: 'Huidige pagina, pagina {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/no.ts":
/*!**************************!*\
  !*** ./src/locale/no.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Skilt',
  close: 'Lukk',
  dataIterator: {
    noResultsText: 'Fant ingen matchende elementer.',
    loadingText: 'Laster elementer...'
  },
  dataTable: {
    itemsPerPageText: 'Rader per side:',
    ariaLabel: {
      sortDescending: 'Sortert synkende.',
      sortAscending: 'Sortert stigende.',
      sortNone: 'Ikke sortert.',
      activateNone: 'Aktiver for å fjerne sortering.',
      activateDescending: 'Aktiver for å sortere synkende.',
      activateAscending: 'Aktiver for å sortere stigende.'
    },
    sortBy: 'Sorter etter'
  },
  dataFooter: {
    itemsPerPageText: 'Elementer per side:',
    itemsPerPageAll: 'Alle',
    nextPage: 'Neste side',
    prevPage: 'Forrige side',
    firstPage: 'Første side',
    lastPage: 'Siste side',
    pageText: '{0}-{1} av {2}'
  },
  datePicker: {
    itemsSelected: '{0} valgt',
    nextMonthAriaLabel: 'Neste måned',
    nextYearAriaLabel: 'Neste år',
    prevMonthAriaLabel: 'Forrige måned',
    prevYearAriaLabel: 'Forrige år'
  },
  noDataText: 'Ingen data er tilgjengelig',
  carousel: {
    prev: 'Forrige bilde',
    next: 'Neste bilde',
    ariaLabel: {
      delimiter: 'Karusellbilde {0} av {1}'
    }
  },
  calendar: {
    moreEvents: '{0} flere'
  },
  fileInput: {
    counter: '{0} filer',
    counterSize: '{0} filer ({1} totalt)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Paginasjonsnavigasjon',
      next: 'Neste side',
      previous: 'Forrige side',
      page: 'Gå til side {0}',
      currentPage: 'Gjeldende side, side {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/pl.ts":
/*!**************************!*\
  !*** ./src/locale/pl.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Odznaka',
  close: 'Zamknij',
  dataIterator: {
    noResultsText: 'Nie znaleziono danych odpowiadających wyszukiwaniu',
    loadingText: 'Wczytywanie danych...'
  },
  dataTable: {
    itemsPerPageText: 'Wierszy na stronie:',
    ariaLabel: {
      sortDescending: 'Sortowanie malejąco. Kliknij aby zmienić.',
      sortAscending: 'Sortowanie rosnąco. Kliknij aby zmienić.',
      sortNone: 'Bez sortowania. Kliknij aby posortować rosnąco.',
      activateNone: 'Kliknij aby usunąć sortowanie.',
      activateDescending: 'Kliknij aby posortować malejąco.',
      activateAscending: 'Kliknij aby posortować rosnąco.'
    },
    sortBy: 'Sortuj według'
  },
  dataFooter: {
    itemsPerPageText: 'Pozycji na stronie:',
    itemsPerPageAll: 'Wszystkie',
    nextPage: 'Następna strona',
    prevPage: 'Poprzednia strona',
    firstPage: 'Pierwsza strona',
    lastPage: 'Ostatnia strona',
    pageText: '{0}-{1} z {2}'
  },
  datePicker: {
    itemsSelected: '{0} dat(y)',
    nextMonthAriaLabel: 'Następny miesiąc',
    nextYearAriaLabel: 'Następny rok',
    prevMonthAriaLabel: 'Poprzedni miesiąc',
    prevYearAriaLabel: 'Poprzedni rok'
  },
  noDataText: 'Brak danych',
  carousel: {
    prev: 'Poprzedni obraz',
    next: 'Następny obraz',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} więcej'
  },
  fileInput: {
    counter: 'Liczba plików: {0}',
    counterSize: 'Liczba plików: {0} (łącznie {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Nawigacja paginacyjna',
      next: 'Następna strona',
      previous: 'Poprzednia strona',
      page: 'Idź do strony {0}',
      currentPage: 'Bieżąca strona, strona {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/pt.ts":
/*!**************************!*\
  !*** ./src/locale/pt.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Distintivo',
  close: 'Fechar',
  dataIterator: {
    noResultsText: 'Nenhum dado encontrado',
    loadingText: 'Carregando itens...'
  },
  dataTable: {
    itemsPerPageText: 'Linhas por página:',
    ariaLabel: {
      sortDescending: 'Ordenado decrescente.',
      sortAscending: 'Ordenado crescente.',
      sortNone: 'Não ordenado.',
      activateNone: 'Ative para remover a ordenação.',
      activateDescending: 'Ative para ordenar decrescente.',
      activateAscending: 'Ative para ordenar crescente.'
    },
    sortBy: 'Ordenar por'
  },
  dataFooter: {
    itemsPerPageText: 'Itens por página:',
    itemsPerPageAll: 'Todos',
    nextPage: 'Próxima página',
    prevPage: 'Página anterior',
    firstPage: 'Primeira página',
    lastPage: 'Última página',
    pageText: '{0}-{1} de {2}'
  },
  datePicker: {
    itemsSelected: '{0} selecionado(s)',
    nextMonthAriaLabel: 'Próximo mês',
    nextYearAriaLabel: 'Próximo ano',
    prevMonthAriaLabel: 'Mês anterior',
    prevYearAriaLabel: 'Ano anterior'
  },
  noDataText: 'Não há dados disponíveis',
  carousel: {
    prev: 'Visão anterior',
    next: 'Próxima visão',
    ariaLabel: {
      delimiter: 'Slide {0} de {1} do carrossel'
    }
  },
  calendar: {
    moreEvents: 'Mais {0}'
  },
  fileInput: {
    counter: '{0} arquivo(s)',
    counterSize: '{0} arquivo(s) ({1} no total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navegação de paginação',
      next: 'Próxima página',
      previous: 'Página anterior',
      page: 'Ir à página {0}',
      currentPage: 'Página atual, página {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/ro.ts":
/*!**************************!*\
  !*** ./src/locale/ro.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Insignă',
  close: 'Închideți',
  dataIterator: {
    noResultsText: 'Nu s-au găsit înregistrări corespunzătoare',
    loadingText: 'Se încarcă articolele...'
  },
  dataTable: {
    itemsPerPageText: 'Rânduri pe pagină:',
    ariaLabel: {
      sortDescending: 'Sortate descendent.',
      sortAscending: 'Sortate ascendent.',
      sortNone: 'Nesortate.',
      activateNone: 'Activați pentru a elimina sortarea.',
      activateDescending: 'Activați pentru a sorta descendent.',
      activateAscending: 'Activați pentru a sorta ascendent.'
    },
    sortBy: 'Sortați după'
  },
  dataFooter: {
    itemsPerPageText: 'Articole pe pagină:',
    itemsPerPageAll: 'Toate',
    nextPage: 'Pagina următoare',
    prevPage: 'Pagina anterioară',
    firstPage: 'Prima pagină',
    lastPage: 'Ultima pagină',
    pageText: '{0}-{1} din {2}'
  },
  datePicker: {
    itemsSelected: '{0} selectate',
    nextMonthAriaLabel: 'Luna următoare',
    nextYearAriaLabel: 'Anul următor',
    prevMonthAriaLabel: 'Luna anterioară',
    prevYearAriaLabel: 'Anul anterior'
  },
  noDataText: 'Nu există date disponibile',
  carousel: {
    prev: 'Grafica anterioară',
    next: 'Grafica următoare',
    ariaLabel: {
      delimiter: 'Slide carusel {0} din {1}'
    }
  },
  calendar: {
    moreEvents: 'încă {0}'
  },
  fileInput: {
    counter: '{0} fișiere',
    counterSize: '{0} fișiere ({1} în total)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigare prin paginare',
      next: 'Pagina următoare',
      previous: 'Pagina anterioară',
      page: 'Mergeți la pagina {0}',
      currentPage: 'Pagina curentă, pagina {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating de {0} din {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/ru.ts":
/*!**************************!*\
  !*** ./src/locale/ru.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'знак',
  close: 'Закрыть',
  dataIterator: {
    noResultsText: 'Не найдено подходящих записей',
    loadingText: 'Запись загружается...'
  },
  dataTable: {
    itemsPerPageText: 'Строк на странице:',
    ariaLabel: {
      sortDescending: 'Упорядочено по убыванию.',
      sortAscending: 'Упорядочено по возрастанию.',
      sortNone: 'Не упорядочено.',
      activateNone: 'Активируйте, чтобы убрать сортировку.',
      activateDescending: 'Активируйте для упорядочивания убыванию.',
      activateAscending: 'Активируйте для упорядочивания по возрастанию.'
    },
    sortBy: 'Сортировать по'
  },
  dataFooter: {
    itemsPerPageText: 'Записей на странице:',
    itemsPerPageAll: 'Все',
    nextPage: 'Следующая страница',
    prevPage: 'Предыдущая страница',
    firstPage: 'Первая страница',
    lastPage: 'Последняя страница',
    pageText: '{0}-{1} из {2}'
  },
  datePicker: {
    itemsSelected: '{0} выбран',
    nextMonthAriaLabel: 'Следующий месяц',
    nextYearAriaLabel: 'Следующий год',
    prevMonthAriaLabel: 'Прошлый месяц',
    prevYearAriaLabel: 'Предыдущий год'
  },
  noDataText: 'Отсутствуют данные',
  carousel: {
    prev: 'Предыдущий слайд',
    next: 'Следующий слайд',
    ariaLabel: {
      delimiter: 'Слайд {0} из {1}'
    }
  },
  calendar: {
    moreEvents: 'Еще {0}'
  },
  fileInput: {
    counter: 'Файлов: {0}',
    counterSize: 'Файлов: {0} (всего {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Навигация по страницам',
      next: 'Следующая страница',
      previous: 'Предыдущая страница',
      page: 'Перейти на страницу {0}',
      currentPage: 'Текущая страница, Страница {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/sk.ts":
/*!**************************!*\
  !*** ./src/locale/sk.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Odznak',
  close: 'Zavrieť',
  dataIterator: {
    noResultsText: 'Neboli nájdené žiadne záznamy',
    loadingText: 'Načítavam položky...'
  },
  dataTable: {
    itemsPerPageText: 'Počet riadkov na stránku:',
    ariaLabel: {
      sortDescending: 'Zoradené zostupne.',
      sortAscending: 'Zoradené vzostupne.',
      sortNone: 'Nezoradené.',
      activateNone: 'Aktivujte na zrušenie triedenia.',
      activateDescending: 'Aktivujte na zoradenie zostupne.',
      activateAscending: 'Aktivujte na zoradenie vzostupne.'
    },
    sortBy: 'Zoradiť podľa'
  },
  dataFooter: {
    itemsPerPageText: 'Počet položiek na stránku:',
    itemsPerPageAll: 'Všetko',
    nextPage: 'Ďalšia stránka',
    prevPage: 'Predchádzajúca stránka',
    firstPage: 'Prvá stránka',
    lastPage: 'Posledná stránka',
    pageText: '{0}–{1} z {2}'
  },
  datePicker: {
    itemsSelected: '{0} vybrané',
    nextMonthAriaLabel: 'Ďalší mesiac',
    nextYearAriaLabel: 'Ďalší rok',
    prevMonthAriaLabel: 'Predchádzajúci mesiac',
    prevYearAriaLabel: 'Predchádzajúci rok'
  },
  noDataText: 'Nie sú dostupné žiadne dáta',
  carousel: {
    prev: 'Predchádzajúci obrázok',
    next: 'Další obrázok',
    ariaLabel: {
      delimiter: 'Snímka {0} z {1}'
    }
  },
  calendar: {
    moreEvents: '{0} ďalších'
  },
  fileInput: {
    counter: '{0} súborov',
    counterSize: '{0} súborov ({1} celkom)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigácia stránkovania',
      next: 'Ďalšia stránka',
      previous: 'Predchádzajúca stránka',
      page: 'Ísť na stránku {0}',
      currentPage: 'Aktuálna stránka, stránka {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Hodnotenie {0} z {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/sl.ts":
/*!**************************!*\
  !*** ./src/locale/sl.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Značka',
  close: 'Zapri',
  dataIterator: {
    noResultsText: 'Ni iskanega zapisa',
    loadingText: 'Nalaganje...'
  },
  dataTable: {
    itemsPerPageText: 'Vrstic na stran:',
    ariaLabel: {
      sortDescending: 'Razvrščeno padajoče.',
      sortAscending: 'Razvrščeno naraščajoče.',
      sortNone: 'Ni razvrščeno.',
      activateNone: 'Aktivirajte za odstranitev razvrščanja.',
      activateDescending: 'Aktivirajte za padajoče razvrščanje.',
      activateAscending: 'Aktivirajte za naraščajoče razvrščanje.'
    },
    sortBy: 'Razvrsti po'
  },
  dataFooter: {
    itemsPerPageText: 'Predmetov na stran:',
    itemsPerPageAll: 'Vse',
    nextPage: 'Naslednja stran',
    prevPage: 'Prejšnja stran',
    firstPage: 'Prva stran',
    lastPage: 'Zadnja stran',
    pageText: '{0}-{1} od {2}'
  },
  datePicker: {
    itemsSelected: '{0} izbrano/-ih',
    nextMonthAriaLabel: 'Naslednji mesec',
    nextYearAriaLabel: 'Naslednje leto',
    prevMonthAriaLabel: 'Prejšnji mesec',
    prevYearAriaLabel: 'Prejšnje leto'
  },
  noDataText: 'Ni podatkov',
  carousel: {
    prev: 'Prejšnji prikaz',
    next: 'Naslednji prikaz',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: 'Še {0}'
  },
  fileInput: {
    counter: '{0} datotek',
    counterSize: '{0} datotek ({1} skupno)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigacija po strani po strani',
      next: 'Naslednja stran',
      previous: 'Prejšnja stran',
      page: 'Pojdi na stran {0}',
      currentPage: 'Trenutna stran, stran {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/sr-Cyrl.ts":
/*!*******************************!*\
  !*** ./src/locale/sr-Cyrl.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Значка',
  close: 'Затвори',
  dataIterator: {
    noResultsText: 'Ни један запис није пронађен',
    loadingText: 'Учитавање ставке...'
  },
  dataTable: {
    itemsPerPageText: 'Редова по страници:',
    ariaLabel: {
      sortDescending: 'Сортирано опадајуће.',
      sortAscending: 'Сортирано растуће.',
      sortNone: 'Није сортирано.',
      activateNone: 'Кликни да уклониш сортирање.',
      activateDescending: 'Кликни да сортираш опадајуће.',
      activateAscending: 'Кликни да сортираш растуће.'
    },
    sortBy: 'Сортирај по'
  },
  dataFooter: {
    itemsPerPageText: 'Ставки по страници:',
    itemsPerPageAll: 'Све',
    nextPage: 'Следећа страница',
    prevPage: 'Претходна страница',
    firstPage: 'Прва страница',
    lastPage: 'Последња страница',
    pageText: '{0}-{1} од {2}'
  },
  datePicker: {
    itemsSelected: '{0} одабрано',
    nextMonthAriaLabel: 'Следећег месеца',
    nextYearAriaLabel: 'Следеће године',
    prevMonthAriaLabel: 'Претходни месец',
    prevYearAriaLabel: 'Претходна година'
  },
  noDataText: 'Нема доступних података',
  carousel: {
    prev: 'Претходна слика',
    next: 'Следећа слика',
    ariaLabel: {
      delimiter: 'Слика {0} од {1}'
    }
  },
  calendar: {
    moreEvents: '{0} више'
  },
  fileInput: {
    counter: '{0} фајлова',
    counterSize: '{0} фајлова ({1} укупно)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Навигација страницама',
      next: 'Следећа страница',
      previous: 'Претходна страница',
      page: 'Иди на страну {0}',
      currentPage: 'Тренутна страница, страница {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Оцена {0} од {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/sr-Latn.ts":
/*!*******************************!*\
  !*** ./src/locale/sr-Latn.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Značka',
  close: 'Zatvori',
  dataIterator: {
    noResultsText: 'Nijedan zapis nije pronađen',
    loadingText: 'Učitavanje stavke...'
  },
  dataTable: {
    itemsPerPageText: 'Redova po stranici:',
    ariaLabel: {
      sortDescending: 'Sortirano opadajuće.',
      sortAscending: 'Sortirano rastuće.',
      sortNone: 'Nije sortirano.',
      activateNone: 'Klikni da ukloniš sortiranje.',
      activateDescending: 'Klikni da sortiraš opadajuće.',
      activateAscending: 'Klikni da sortiraš rastuće.'
    },
    sortBy: 'Sortiraj po'
  },
  dataFooter: {
    itemsPerPageText: 'Stavki po stranici:',
    itemsPerPageAll: 'Sve',
    nextPage: 'Sledeća stranica',
    prevPage: 'Prethodna stranica',
    firstPage: 'Prva stranica',
    lastPage: 'Poslednja stranica',
    pageText: '{0}-{1} od {2}'
  },
  datePicker: {
    itemsSelected: '{0} odabrano',
    nextMonthAriaLabel: 'Sledećeg meseca',
    nextYearAriaLabel: 'Sledeće godine',
    prevMonthAriaLabel: 'Prethodni mesec',
    prevYearAriaLabel: 'Prethodna godina'
  },
  noDataText: 'Nema dostupnih podataka',
  carousel: {
    prev: 'Prethodna slika',
    next: 'Sledeća slika',
    ariaLabel: {
      delimiter: 'Slika {0} od {1}'
    }
  },
  calendar: {
    moreEvents: '{0} više'
  },
  fileInput: {
    counter: '{0} fajlova',
    counterSize: '{0} fajlova ({1} ukupno)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Navigacija stranicama',
      next: 'Sledeća stranica',
      previous: 'Prethodna stranica',
      page: 'Idi na stranu {0}',
      currentPage: 'Trenutna stranica, stranica {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Ocena {0} od {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/sv.ts":
/*!**************************!*\
  !*** ./src/locale/sv.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Bricka',
  close: 'Stäng',
  dataIterator: {
    noResultsText: 'Inga poster funna',
    loadingText: 'Laddar data...'
  },
  dataTable: {
    itemsPerPageText: 'Rader per sida:',
    ariaLabel: {
      sortDescending: 'Sorterat fallande.',
      sortAscending: 'Sorterat stigande.',
      sortNone: 'Osorterat.',
      activateNone: 'Aktivera för att ta bort sortering.',
      activateDescending: 'Aktivera för sortering fallande.',
      activateAscending: 'Aktivera för sortering stigande.'
    },
    sortBy: 'Sortera efter'
  },
  dataFooter: {
    itemsPerPageText: 'Objekt per sida:',
    itemsPerPageAll: 'Alla',
    nextPage: 'Nästa sida',
    prevPage: 'Föregående sida',
    firstPage: 'Första sidan',
    lastPage: 'Sista sidan',
    pageText: '{0}-{1} av {2}'
  },
  datePicker: {
    itemsSelected: '{0} markerade',
    nextMonthAriaLabel: 'Nästa månad',
    nextYearAriaLabel: 'Nästa år',
    prevMonthAriaLabel: 'Förra månaden',
    prevYearAriaLabel: 'Förra året'
  },
  noDataText: 'Ingen data tillgänglig',
  carousel: {
    prev: 'Föregående vy',
    next: 'Nästa vy',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} fler'
  },
  fileInput: {
    counter: '{0} filer',
    counterSize: '{0} filer (av {1} totalt)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Pagination Navigation',
      next: 'Nästa sida',
      previous: 'Föregående sida',
      page: 'Gå till sidan {0}',
      currentPage: 'Aktuell sida, sida {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/th.ts":
/*!**************************!*\
  !*** ./src/locale/th.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'สัญลักษณ์',
  close: 'ปิด',
  dataIterator: {
    noResultsText: 'ไม่พบข้อมูลที่ค้นหา',
    loadingText: 'กำลังโหลดข้อมูล...'
  },
  dataTable: {
    itemsPerPageText: 'แถวต่อหน้า:',
    ariaLabel: {
      sortDescending: 'เรียงจากมากไปน้อยอยู่',
      sortAscending: 'เรียงจากน้อยไปมากอยู่',
      sortNone: 'ไม่ได้เรียงลำดับ',
      activateNone: 'กดเพื่อปิดการเรียงลำดับ',
      activateDescending: 'กดเพื่อเรียงจากมากไปน้อย',
      activateAscending: 'กดเพื่อเรียงจากน้อยไปมาก'
    },
    sortBy: 'เรียงตาม'
  },
  dataFooter: {
    itemsPerPageText: 'รายการต่อหน้า:',
    itemsPerPageAll: 'ทั้งหมด',
    nextPage: 'หน้าต่อไป',
    prevPage: 'หน้าที่แล้ว',
    firstPage: 'หน้าแรก',
    lastPage: 'หน้าสุดท้าย',
    pageText: '{0}-{1} จาก {2}'
  },
  datePicker: {
    itemsSelected: 'เลือก {0} วัน',
    nextMonthAriaLabel: 'เดือนถัดไป',
    nextYearAriaLabel: 'ปีถัดไป',
    prevMonthAriaLabel: 'เดือนก่อนหน้า',
    prevYearAriaLabel: 'ปีก่อนหน้า'
  },
  noDataText: 'ไม่มีข้อมูล',
  carousel: {
    prev: 'ภาพก่อนหน้า',
    next: 'ภาพถัดไป',
    ariaLabel: {
      delimiter: 'ภาพสไลด์ที่ {0} จาก {1}'
    }
  },
  calendar: {
    moreEvents: 'มีอีก {0}'
  },
  fileInput: {
    counter: '{0} ไฟล์',
    counterSize: '{0} ไฟล์ (รวม {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'การนำทางไปยังหน้า',
      next: 'หน้าต่อไป',
      previous: 'หน้าที่แล้ว',
      page: 'ไปที่หน้า {0}',
      currentPage: 'หน้าปัจจุบัน (หน้า {0})',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/tr.ts":
/*!**************************!*\
  !*** ./src/locale/tr.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'rozet',
  close: 'Kapat',
  dataIterator: {
    noResultsText: 'Eşleşen veri bulunamadı',
    loadingText: 'Yükleniyor... Lütfen bekleyin.'
  },
  dataTable: {
    itemsPerPageText: 'Sayfa başına satır:',
    ariaLabel: {
      sortDescending: 'Z den A ya sıralı.',
      sortAscending: 'A dan Z ye sıralı.',
      sortNone: 'Sıralı değil. ',
      activateNone: 'Sıralamayı kaldırmak için etkinleştir.',
      activateDescending: 'Z den A ya sıralamak için etkinleştir.',
      activateAscending: 'A dan Z ye sıralamak için etkinleştir.'
    },
    sortBy: 'Sırala'
  },
  dataFooter: {
    itemsPerPageText: 'Sayfa başına satır:',
    itemsPerPageAll: 'Hepsi',
    nextPage: 'Sonraki sayfa',
    prevPage: 'Önceki sayfa',
    firstPage: 'İlk sayfa',
    lastPage: 'Son sayfa',
    pageText: '{0} - {1} arası, Toplam: {2} kayıt'
  },
  datePicker: {
    itemsSelected: '{0} öge seçildi',
    nextMonthAriaLabel: 'Gelecek ay',
    nextYearAriaLabel: 'Gelecek yıl',
    prevMonthAriaLabel: 'Geçtiğimiz ay',
    prevYearAriaLabel: 'Geçen yıl'
  },
  noDataText: 'Bu görünümde veri yok.',
  carousel: {
    prev: 'Önceki görsel',
    next: 'Sonraki görsel',
    ariaLabel: {
      delimiter: 'Galeri sayfa {0} / {1}'
    }
  },
  calendar: {
    moreEvents: '{0} tane daha'
  },
  fileInput: {
    counter: '{0} dosya',
    counterSize: '{0} dosya (toplamda {1})'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Sayfalandırma Navigasyonu',
      next: 'Sonraki sayfa',
      previous: 'Önceki sayfa',
      page: 'Sayfaya git {0}',
      currentPage: 'Geçerli Sayfa, Sayfa {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/uk.ts":
/*!**************************!*\
  !*** ./src/locale/uk.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Знак',
  close: 'Закрити',
  dataIterator: {
    noResultsText: 'В результаті пошуку нічого не знайдено',
    loadingText: 'Завантаження...'
  },
  dataTable: {
    itemsPerPageText: 'Рядків на сторінці:',
    ariaLabel: {
      sortDescending: 'Відсортовано за спаданням.',
      sortAscending: 'Відсортовано за зростанням.',
      sortNone: 'Не відсортовано.',
      activateNone: 'Активувати, щоб видалити сортування.',
      activateDescending: 'Активувати, щоб відсортувати за спаданням.',
      activateAscending: 'Активувати, щоб відсортувати за зростанням.'
    },
    sortBy: 'Відсортувати за'
  },
  dataFooter: {
    itemsPerPageText: 'Елементів на сторінці:',
    itemsPerPageAll: 'Всі',
    nextPage: 'Наступна сторінка',
    prevPage: 'Попередня сторінка',
    firstPage: 'Перша сторінка',
    lastPage: 'Остання сторінка',
    pageText: '{0}-{1} з {2}'
  },
  datePicker: {
    itemsSelected: '{0} вибрано',
    nextMonthAriaLabel: 'Наступного місяця',
    nextYearAriaLabel: 'Наступного року',
    prevMonthAriaLabel: 'Попередній місяць',
    prevYearAriaLabel: 'Попередній рік'
  },
  noDataText: 'Немає даних для відображення',
  carousel: {
    prev: 'Попередній слайд',
    next: 'Наступий слайд',
    ariaLabel: {
      delimiter: 'Слайд {0} з {1}'
    }
  },
  calendar: {
    moreEvents: 'Ще {0}'
  },
  fileInput: {
    counter: '{0} файлів',
    counterSize: '{0} файлів ({1} загалом)'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: 'Навігація по сторінках',
      next: 'Наступна сторінка',
      previous: 'Попередня сторінка',
      page: 'Перейти на сторінку {0}',
      currentPage: 'Поточна сторінка, Сторінка {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/vi.ts":
/*!**************************!*\
  !*** ./src/locale/vi.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: 'Huy hiệu',
  close: 'Đóng',
  dataIterator: {
    noResultsText: 'Không tìm thấy kết quả nào',
    loadingText: 'Đang tải...'
  },
  dataTable: {
    itemsPerPageText: 'Số hàng mỗi trang:',
    ariaLabel: {
      sortDescending: 'Sắp xếp giảm dần.',
      sortAscending: 'Sắp xếp tăng dần.',
      sortNone: 'Không sắp xếp.',
      activateNone: 'Kích hoạt để bỏ sắp xếp.',
      activateDescending: 'Kích hoạt để sắp xếp giảm dần.',
      activateAscending: 'Kích hoạt để sắp xếp tăng dần.'
    },
    sortBy: 'Sắp xếp'
  },
  dataFooter: {
    itemsPerPageText: 'Số mục mỗi trang:',
    itemsPerPageAll: 'Toàn bộ',
    nextPage: 'Trang tiếp theo',
    prevPage: 'Trang trước',
    firstPage: 'Trang đầu',
    lastPage: 'Trang cuối',
    pageText: '{0}-{1} trên {2}'
  },
  datePicker: {
    itemsSelected: '{0} được chọn',
    nextMonthAriaLabel: 'Tháng sau',
    nextYearAriaLabel: 'Năm sau',
    prevMonthAriaLabel: 'Tháng trước',
    prevYearAriaLabel: 'Năm trước'
  },
  noDataText: 'Không có dữ liệu',
  carousel: {
    prev: 'Ảnh tiếp theo',
    next: 'Ảnh trước',
    ariaLabel: {
      delimiter: 'Carousel slide {0} trên {1}'
    }
  },
  calendar: {
    moreEvents: '{0} nữa'
  },
  fileInput: {
    counter: '{0} tệp',
    counterSize: '{0} tệp (tổng cộng {1})'
  },
  timePicker: {
    am: 'SA',
    pm: 'CH'
  },
  pagination: {
    ariaLabel: {
      root: 'Điều hướng phân trang',
      next: 'Trang tiếp theo',
      previous: 'Trang trước',
      page: 'Đến trang {0}',
      currentPage: 'Trang hiện tại, Trang {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Đánh giá {0} trên {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/zh-Hans.ts":
/*!*******************************!*\
  !*** ./src/locale/zh-Hans.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: '徽章',
  close: '关闭',
  dataIterator: {
    noResultsText: '没有符合条件的结果',
    loadingText: '加载中……'
  },
  dataTable: {
    itemsPerPageText: '每页数目：',
    ariaLabel: {
      sortDescending: '：降序排列。',
      sortAscending: '：升序排列。',
      sortNone: '：未排序。',
      activateNone: '点击以移除排序。',
      activateDescending: '点击以降序排列。',
      activateAscending: '点击以升序排列。'
    },
    sortBy: '排序方式'
  },
  dataFooter: {
    itemsPerPageText: '每页数目：',
    itemsPerPageAll: '全部',
    nextPage: '下一页',
    prevPage: '上一页',
    firstPage: '首页',
    lastPage: '尾页',
    pageText: '{0}-{1} 共 {2}'
  },
  datePicker: {
    itemsSelected: '已选择 {0}',
    nextMonthAriaLabel: '下个月',
    nextYearAriaLabel: '明年',
    prevMonthAriaLabel: '前一个月',
    prevYearAriaLabel: '前一年'
  },
  noDataText: '没有数据',
  carousel: {
    prev: '上一张',
    next: '下一张',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '还有 {0} 项'
  },
  fileInput: {
    counter: '{0} 个文件',
    counterSize: '{0} 个文件（共 {1}）'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: '分页导航',
      next: '下一页',
      previous: '上一页',
      page: '转到页面 {0}',
      currentPage: '当前页 {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/locale/zh-Hant.ts":
/*!*******************************!*\
  !*** ./src/locale/zh-Hant.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  badge: '徽章',
  close: '關閉',
  dataIterator: {
    noResultsText: '沒有符合條件的結果',
    loadingText: '讀取中...'
  },
  dataTable: {
    itemsPerPageText: '每頁列數：',
    ariaLabel: {
      sortDescending: '：降序排列。',
      sortAscending: '：升序排列。',
      sortNone: '無排序方式。點擊以升序排列。',
      activateNone: '點擊以移除排序方式。',
      activateDescending: '點擊以降序排列。',
      activateAscending: '點擊以移除排序方式。'
    },
    sortBy: '排序方式'
  },
  dataFooter: {
    itemsPerPageText: '每頁項目：',
    itemsPerPageAll: '全部',
    nextPage: '下一頁',
    prevPage: '上一頁',
    firstPage: '第一頁',
    lastPage: '最後頁',
    pageText: '{2} 條中的 {0}~{1} 條'
  },
  datePicker: {
    itemsSelected: '已選擇 {0}',
    nextMonthAriaLabel: '下個月',
    nextYearAriaLabel: '明年',
    prevMonthAriaLabel: '前一個月',
    prevYearAriaLabel: '前一年'
  },
  noDataText: '沒有資料',
  carousel: {
    prev: '上一張',
    next: '下一張',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '還有其他 {0} 項'
  },
  fileInput: {
    counter: '{0} 個檔案',
    counterSize: '{0} 個檔案（共 {1}）'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM'
  },
  pagination: {
    ariaLabel: {
      root: '分頁導航',
      next: '下一頁',
      previous: '上一頁',
      page: '轉到頁面 {0}',
      currentPage: '當前頁 {0}',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
});

/***/ }),

/***/ "./src/util/animation.ts":
/*!*******************************!*\
  !*** ./src/util/animation.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nullifyTransforms": () => (/* binding */ nullifyTransforms)
/* harmony export */ });
/** @see https://stackoverflow.com/a/57876601/2074736 */
function nullifyTransforms(el) {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const tx = style.transform;

  if (tx) {
    let ta, sx, sy, dx, dy;

    if (tx.startsWith('matrix3d(')) {
      ta = tx.slice(9, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[5];
      dx = +ta[12];
      dy = +ta[13];
    } else if (tx.startsWith('matrix(')) {
      ta = tx.slice(7, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[3];
      dx = +ta[4];
      dy = +ta[5];
    } else {
      return rect;
    }

    const to = style.transformOrigin;
    const x = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
    const w = sx ? rect.width / sx : el.offsetWidth;
    const h = sy ? rect.height / sy : el.offsetHeight;
    return {
      x,
      y,
      width: w,
      height: h,
      top: y,
      right: x + w,
      bottom: y + h,
      left: x
    };
  } else {
    return rect;
  }
}

/***/ }),

/***/ "./src/util/color/APCA.ts":
/*!********************************!*\
  !*** ./src/util/color/APCA.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "APCAcontrast": () => (/* binding */ APCAcontrast)
/* harmony export */ });
/**
 * WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
 * @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
 */
// MAGICAL NUMBERS
// sRGB Conversion to Relative Luminance (Y)
// Transfer Curve (aka "Gamma") for sRGB linearization
// Simple power curve vs piecewise described in docs
// Essentially, 2.4 best models actual display
// characteristics in combination with the total method
const mainTRC = 2.4;
const Rco = 0.2126729; // sRGB Red Coefficient (from matrix)

const Gco = 0.7151522; // sRGB Green Coefficient (from matrix)

const Bco = 0.0721750; // sRGB Blue Coefficient (from matrix)
// For Finding Raw SAPC Contrast from Relative Luminance (Y)
// Constants for SAPC Power Curve Exponents
// One pair for normal text, and one for reverse
// These are the "beating heart" of SAPC

const normBG = 0.55;
const normTXT = 0.58;
const revTXT = 0.57;
const revBG = 0.62; // For Clamping and Scaling Values

const blkThrs = 0.03; // Level that triggers the soft black clamp

const blkClmp = 1.45; // Exponent for the soft black clamp curve

const deltaYmin = 0.0005; // Lint trap

const scaleBoW = 1.25; // Scaling for dark text on light

const scaleWoB = 1.25; // Scaling for light text on dark

const loConThresh = 0.078; // Threshold for new simple offset scale

const loConFactor = 12.82051282051282; // = 1/0.078,

const loConOffset = 0.06; // The simple offset

const loClip = 0.001; // Output clip (lint trap #2)

function APCAcontrast(text, background) {
  // Linearize sRGB
  const Rtxt = ((text >> 16 & 0xff) / 255) ** mainTRC;
  const Gtxt = ((text >> 8 & 0xff) / 255) ** mainTRC;
  const Btxt = ((text >> 0 & 0xff) / 255) ** mainTRC;
  const Rbg = ((background >> 16 & 0xff) / 255) ** mainTRC;
  const Gbg = ((background >> 8 & 0xff) / 255) ** mainTRC;
  const Bbg = ((background >> 0 & 0xff) / 255) ** mainTRC; // Apply the standard coefficients and sum to Y

  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco; // Soft clamp Y when near black.
  // Now clamping all colors to prevent crossover errors

  if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp; // Return 0 Early for extremely low ∆Y (lint trap #1)

  if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0.0; // SAPC CONTRAST

  let outputContrast; // For weighted final values

  if (Ybg > Ytxt) {
    // For normal polarity, black text on white
    // Calculate the SAPC contrast value and scale
    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW; // NEW! SAPC SmoothScale™
    // Low Contrast Smooth Scale Rollout to prevent polarity reversal
    // and also a low clip for very low contrasts (lint trap #2)
    // much of this is for very low contrasts, less than 10
    // therefore for most reversing needs, only loConOffset is important

    outputContrast = SAPC < loClip ? 0.0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
  } else {
    // For reverse polarity, light text on dark
    // WoB should always return negative value.
    const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
    outputContrast = SAPC > -loClip ? 0.0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
  }

  return outputContrast * 100;
}

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
      (0,_console__WEBPACK_IMPORTED_MODULE_0__.consoleWarn)(`'${color}' is not a valid rgb color`);
    }

    rgb = parseInt(c, 16);
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
  }

  if (rgb < 0) {
    (0,_console__WEBPACK_IMPORTED_MODULE_0__.consoleWarn)(`Colors cannot be negative: '${color}'`);
    rgb = 0;
  } else if (rgb > 0xffffff || isNaN(rgb)) {
    (0,_console__WEBPACK_IMPORTED_MODULE_0__.consoleWarn)(`'${color}' is not a valid rgb color`);
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
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
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

  return `#${[toHex(rgba.r), toHex(rgba.g), toHex(rgba.b), toHex(Math.round(rgba.a * 255))].join('')}`;
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

  return `#${hex}`.toUpperCase().substr(0, 9);
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

  return `[Vuetify] ${message}` + (vm ? generateComponentTrace(vm) : '');
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
  consoleWarn(`[UPGRADE] '${original}' is deprecated, use '${replacement}' instead.`, vm, parent);
}
function breaking(original, replacement, vm, parent) {
  consoleError(`[BREAKING] '${original}' has been removed, use '${replacement}' instead. For more information, see the upgrade guide https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide`, vm, parent);
}
function removed(original, vm, parent) {
  consoleWarn(`[REMOVED] '${original}' has been removed. You can safely omit it.`, vm, parent);
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

  return (name ? `<${classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : '');
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

    return '\n\nfound in\n\n' + tree.map((vm, i) => `${i === 0 ? '---> ' : ' '.repeat(5 + i * 2)}${Array.isArray(vm) ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)` : formatComponentName(vm)}`).join('\n');
  } else {
    return `\n\n(found in ${formatComponentName(vm)})`;
  }
}

/***/ }),

/***/ "./src/util/createSimpleFunctional.ts":
/*!********************************************!*\
  !*** ./src/util/createSimpleFunctional.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSimpleFunctional": () => (/* binding */ createSimpleFunctional)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defineComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defineComponent */ "./src/util/defineComponent.tsx");


function createSimpleFunctional(klass, tag = 'div', name) {
  return (0,_defineComponent__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
    name: name != null ? name : (0,vue__WEBPACK_IMPORTED_MODULE_0__.capitalize)((0,vue__WEBPACK_IMPORTED_MODULE_0__.camelize)(klass.replace(/__/g, '-'))),
    props: {
      tag: {
        type: String,
        default: tag
      }
    },

    setup(props, {
      slots
    }) {
      return () => {
        var _slots$default;

        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(props.tag, {
          class: klass
        }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
      };
    }

  });
}

/***/ }),

/***/ "./src/util/defineComponent.tsx":
/*!**************************************!*\
  !*** ./src/util/defineComponent.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defineComponent": () => (/* binding */ defineComponent)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./console */ "./src/util/console.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/util/helpers.ts");
/* harmony import */ var _composables_defaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../composables/defaults */ "./src/composables/defaults.ts");
// Utils



 // Types

function propIsDefined(vnode, prop) {
  var _vnode$props, _vnode$props2;

  return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.toKebabCase)(prop)));
}

const defineComponent = function defineComponent(options) {
  var _options$_setup;

  options._setup = (_options$_setup = options._setup) != null ? _options$_setup : options.setup;

  if (!options.name) {
    (0,_console__WEBPACK_IMPORTED_MODULE_2__.consoleWarn)('The component is missing an explicit name, unable to generate default prop value');
    return options;
  }

  if (options._setup) {
    options.setup = function setup(props, ctx) {
      const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
      const defaults = (0,_composables_defaults__WEBPACK_IMPORTED_MODULE_3__.useDefaults)();

      const _props = (0,vue__WEBPACK_IMPORTED_MODULE_0__.shallowReactive)({ ...(0,vue__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props)
      });

      (0,vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect)(() => {
        const globalDefaults = defaults.value.global;
        const componentDefaults = defaults.value[options.name];

        for (const prop of Object.keys(props)) {
          let newVal;

          if (propIsDefined(vm.vnode, prop)) {
            newVal = props[prop];
          } else {
            var _ref, _componentDefaults$pr;

            newVal = (_ref = (_componentDefaults$pr = componentDefaults == null ? void 0 : componentDefaults[prop]) != null ? _componentDefaults$pr : globalDefaults == null ? void 0 : globalDefaults[prop]) != null ? _ref : props[prop];
          }

          if (_props[prop] !== newVal) {
            _props[prop] = newVal;
          }
        }
      });
      return options._setup(_props, ctx);
    };
  }

  return options;
};

/***/ }),

/***/ "./src/util/dom.ts":
/*!*************************!*\
  !*** ./src/util/dom.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attachedRoot": () => (/* binding */ attachedRoot)
/* harmony export */ });
/**
 * Returns:
 *  - 'null' if the node is not attached to the DOM
 *  - the root node (HTMLDocument | ShadowRoot) otherwise
 */
function attachedRoot(node) {
  /* istanbul ignore next */
  if (typeof node.getRootNode !== 'function') {
    // Shadow DOM not supported (IE11), lets find the root of this node
    while (node.parentNode) node = node.parentNode; // The root parent is the document if the node is attached to the DOM


    if (node !== document) return null;
    return document;
  }

  const root = node.getRootNode(); // The composed root node is the document if the node is attached to the DOM

  if (root !== document && root.getRootNode({
    composed: true
  }) !== document) return null;
  return root;
}

/***/ }),

/***/ "./src/util/easing.ts":
/*!****************************!*\
  !*** ./src/util/easing.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "standardEasing": () => (/* binding */ standardEasing),
/* harmony export */   "deceleratedEasing": () => (/* binding */ deceleratedEasing),
/* harmony export */   "acceleratedEasing": () => (/* binding */ acceleratedEasing)
/* harmony export */ });
const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';
const deceleratedEasing = 'cubic-bezier(0.0, 0, 0.2, 1)'; // Entering

const acceleratedEasing = 'cubic-bezier(0.4, 0, 1, 1)'; // Leaving

/***/ }),

/***/ "./src/util/getScrollParent.ts":
/*!*************************************!*\
  !*** ./src/util/getScrollParent.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getScrollParent": () => (/* binding */ getScrollParent),
/* harmony export */   "getScrollParents": () => (/* binding */ getScrollParents)
/* harmony export */ });
function getScrollParent(el) {
  while (el) {
    if (hasScrollbar(el)) return el;
    el = el.parentElement;
  }

  return document.scrollingElement;
}
function getScrollParents(el) {
  const elements = [];

  while (el) {
    if (hasScrollbar(el)) elements.push(el);
    el = el.parentElement;
  }

  return elements;
}

function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = window.getComputedStyle(el);
  return style.overflowY === 'scroll' || style.overflowY === 'auto' && el.scrollHeight > el.clientHeight;
}

/***/ }),

/***/ "./src/util/globals.ts":
/*!*****************************!*\
  !*** ./src/util/globals.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IS_NODE": () => (/* binding */ IS_NODE),
/* harmony export */   "IN_BROWSER": () => (/* binding */ IN_BROWSER),
/* harmony export */   "IS_DEBUG": () => (/* binding */ IS_DEBUG),
/* harmony export */   "IS_PROD": () => (/* binding */ IS_PROD),
/* harmony export */   "SUPPORTS_INTERSECTION": () => (/* binding */ SUPPORTS_INTERSECTION),
/* harmony export */   "SUPPORTS_TOUCH": () => (/* binding */ SUPPORTS_TOUCH)
/* harmony export */ });
const IS_NODE = typeof process !== 'undefined';
const IN_BROWSER = typeof window !== 'undefined';
const IS_DEBUG = IS_NODE && process.env.DEBUG === 'true';
const IS_PROD = IS_NODE && "development" === 'production';
const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window;
const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);

/***/ }),

/***/ "./src/util/helpers.ts":
/*!*****************************!*\
  !*** ./src/util/helpers.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/* harmony export */   "isComponentInstance": () => (/* binding */ isComponentInstance),
/* harmony export */   "keyCodes": () => (/* binding */ keyCodes),
/* harmony export */   "keyValues": () => (/* binding */ keyValues),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "extract": () => (/* binding */ extract),
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
/* harmony export */   "randomHexColor": () => (/* binding */ randomHexColor),
/* harmony export */   "toKebabCase": () => (/* binding */ toKebabCase),
/* harmony export */   "wrapInRef": () => (/* binding */ wrapInRef),
/* harmony export */   "findChildren": () => (/* binding */ findChildren)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Utilities
 // Types

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
    return `${Number(str)}${unit}`;
  }
}
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}
function isComponentInstance(obj) {
  return obj == null ? void 0 : obj.$el;
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
  pagedown: 34,
  shift: 16
});
const keyValues = Object.freeze({
  enter: 'Enter',
  tab: 'Tab',
  delete: 'Delete',
  esc: 'Escape',
  space: 'Space',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  end: 'End',
  home: 'Home',
  del: 'Delete',
  backspace: 'Backspace',
  insert: 'Insert',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  shift: 'Shift'
});
function keys(o) {
  return Object.keys(o);
}
function extract(obj, properties) {
  const extracted = {};
  const rest = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (properties.includes(key)) {
      extracted[key] = value;
    } else {
      rest[key] = value;
    }
  });
  return [extracted, rest];
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

  for (let i = 0; i < items.length; i++) {
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

      if (customSorters != null && customSorters[sortKey]) {
        const customResult = customSorters[sortKey](sortA, sortB);
        if (!customResult) continue;
        return customResult;
      } // Check if both cannot be evaluated


      if (sortA === null && sortB === null) {
        continue;
      } // Dates should be compared numerically


      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime();
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
    return `${bytes} B`;
  }

  const prefix = binary ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;

  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }

  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
function camelizeObjectKeys(obj) {
  if (!obj) return {};
  return Object.keys(obj).reduce((o, key) => {
    o[(0,vue__WEBPACK_IMPORTED_MODULE_0__.camelize)(key)] = obj[key];
    return o;
  }, {});
}
function mergeDeep(source = {}, target = {}, out = {}) {
  for (const key in source) {
    out[key] = source[key];
  }

  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key]; // Only continue deep merging if
    // both properties are objects

    if (isObject(sourceProperty) && isObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty);
      continue;
    }

    out[key] = targetProperty;
  }

  return out;
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
const randomHexColor = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
const toKebabCase = str => str.replace(/([A-Z])/g, match => `-${match.toLowerCase()}`);
function wrapInRef(x) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.isRef)(x) ? x : (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(x);
}
function findChildren(vnode) {
  if (!vnode || typeof vnode !== 'object') {
    return [];
  }

  if (Array.isArray(vnode)) {
    return vnode.map(child => findChildren(child)).filter(v => v).flat(1);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map(child => findChildren(child)).filter(v => v).flat(1);
  } else if (vnode.component) {
    var _vnode$component;

    return [vnode.component, ...findChildren((_vnode$component = vnode.component) == null ? void 0 : _vnode$component.subTree)].filter(v => v).flat(1);
  }

  return [];
}

/***/ }),

/***/ "./src/util/propsFactory.ts":
/*!**********************************!*\
  !*** ./src/util/propsFactory.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "propsFactory": () => (/* binding */ propsFactory)
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

/***/ "./src/components/VAlert/VAlert.sass":
/*!*******************************************!*\
  !*** ./src/components/VAlert/VAlert.sass ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VApp/VApp.sass":
/*!***************************************!*\
  !*** ./src/components/VApp/VApp.sass ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VAppBar/VAppBar.sass":
/*!*********************************************!*\
  !*** ./src/components/VAppBar/VAppBar.sass ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VAppBar/VAppBarTitle.sass":
/*!**************************************************!*\
  !*** ./src/components/VAppBar/VAppBarTitle.sass ***!
  \**************************************************/
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

/***/ "./src/components/VBadge/VBadge.sass":
/*!*******************************************!*\
  !*** ./src/components/VBadge/VBadge.sass ***!
  \*******************************************/
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

/***/ "./src/components/VBottomNavigation/VBottomNavigation.sass":
/*!*****************************************************************!*\
  !*** ./src/components/VBottomNavigation/VBottomNavigation.sass ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VBreadcrumbs/VBreadcrumbs.sass":
/*!*******************************************************!*\
  !*** ./src/components/VBreadcrumbs/VBreadcrumbs.sass ***!
  \*******************************************************/
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

/***/ "./src/components/VCard/VCard.sass":
/*!*****************************************!*\
  !*** ./src/components/VCard/VCard.sass ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VChip/VChip.sass":
/*!*****************************************!*\
  !*** ./src/components/VChip/VChip.sass ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VCode/VCode.sass":
/*!*****************************************!*\
  !*** ./src/components/VCode/VCode.sass ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VDialog/VDialog.sass":
/*!*********************************************!*\
  !*** ./src/components/VDialog/VDialog.sass ***!
  \*********************************************/
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

/***/ "./src/components/VInput/VInput.sass":
/*!*******************************************!*\
  !*** ./src/components/VInput/VInput.sass ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VItemGroup/VItemGroup.sass":
/*!***************************************************!*\
  !*** ./src/components/VItemGroup/VItemGroup.sass ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VKbd/VKbd.sass":
/*!***************************************!*\
  !*** ./src/components/VKbd/VKbd.sass ***!
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

/***/ "./src/components/VLayout/VLayoutItem.sass":
/*!*************************************************!*\
  !*** ./src/components/VLayout/VLayoutItem.sass ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VList/VList.sass":
/*!*****************************************!*\
  !*** ./src/components/VList/VList.sass ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VList/VListItem.sass":
/*!*********************************************!*\
  !*** ./src/components/VList/VListItem.sass ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VLocaleProvider/VLocaleProvider.sass":
/*!*************************************************************!*\
  !*** ./src/components/VLocaleProvider/VLocaleProvider.sass ***!
  \*************************************************************/
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

/***/ "./src/components/VOverlay/VOverlay.sass":
/*!***********************************************!*\
  !*** ./src/components/VOverlay/VOverlay.sass ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VPagination/VPagination.sass":
/*!*****************************************************!*\
  !*** ./src/components/VPagination/VPagination.sass ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VProgressCircular/VProgressCircular.sass":
/*!*****************************************************************!*\
  !*** ./src/components/VProgressCircular/VProgressCircular.sass ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/VRating/VRating.sass":
/*!*********************************************!*\
  !*** ./src/components/VRating/VRating.sass ***!
  \*********************************************/
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

/***/ "./src/components/VTimeline/VTimeline.sass":
/*!*************************************************!*\
  !*** ./src/components/VTimeline/VTimeline.sass ***!
  \*************************************************/
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/entry-bundler.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVuetify": () => (/* binding */ createVuetify)
/* harmony export */ });
/* harmony import */ var _styles_main_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.sass */ "./src/styles/main.sass");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives */ "./src/directives/index.ts");
/* harmony import */ var _framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework */ "./src/framework.ts");




const createVuetify = (options = {}) => {
  return _framework__WEBPACK_IMPORTED_MODULE_1__.createVuetify({
    components: _components__WEBPACK_IMPORTED_MODULE_2__,
    directives: _directives__WEBPACK_IMPORTED_MODULE_3__,
    ...options
  });
};
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vuetify.js.map