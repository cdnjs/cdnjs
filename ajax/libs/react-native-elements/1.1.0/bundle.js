/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = react;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = react-native;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(64)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(63)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.withTheme=exports.ThemeConsumer=exports.ThemeProvider=exports.fonts=exports.TextPropTypes=exports.ViewPropTypes=exports.getStatusBarHeight=exports.colors=exports.BackgroundImage=undefined;var _reactNative=__webpack_require__(1);var _reactNativeStatusBarHeight=__webpack_require__(70);var _BackgroundImage=__webpack_require__(43);var _BackgroundImage2=_interopRequireDefault(_BackgroundImage);var _colors=__webpack_require__(13);var _colors2=_interopRequireDefault(_colors);var _ViewPropTypes=__webpack_require__(12);var _ViewPropTypes2=_interopRequireDefault(_ViewPropTypes);var _fonts=__webpack_require__(24);var _fonts2=_interopRequireDefault(_fonts);var _ThemeProvider=__webpack_require__(23);var _ThemeProvider2=_interopRequireDefault(_ThemeProvider);var _withTheme=__webpack_require__(45);var _withTheme2=_interopRequireDefault(_withTheme);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var TextPropTypes=_reactNative.Text.propTypes;exports.BackgroundImage=_BackgroundImage2.default;exports.colors=_colors2.default;exports.getStatusBarHeight=_reactNativeStatusBarHeight.getStatusBarHeight;exports.ViewPropTypes=_ViewPropTypes2.default;exports.TextPropTypes=TextPropTypes;exports.fonts=_fonts2.default;exports.ThemeProvider=_ThemeProvider2.default;exports.ThemeConsumer=_ThemeProvider.ThemeConsumer;exports.withTheme=_withTheme2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.color=exports.conditionalStyle=exports.isIOS=exports.ScreenHeight=exports.ScreenWidth=exports.nodeType=exports.normalizeText=exports.getIconType=exports.renderNode=undefined;var _reactNative=__webpack_require__(1);var _color=__webpack_require__(57);var _color2=_interopRequireDefault(_color);var _renderNode=__webpack_require__(47);var _renderNode2=_interopRequireDefault(_renderNode);var _getIconType=__webpack_require__(9);var _getIconType2=_interopRequireDefault(_getIconType);var _normalizeText=__webpack_require__(10);var _normalizeText2=_interopRequireDefault(_normalizeText);var _nodeType=__webpack_require__(46);var _nodeType2=_interopRequireDefault(_nodeType);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Screen=_reactNative.Dimensions.get('window');var ScreenWidth=Screen.width;var ScreenHeight=Screen.height;var isIOS=_reactNative.Platform.OS==='ios';var conditionalStyle=function conditionalStyle(condition,style){return condition?style:{};};exports.renderNode=_renderNode2.default;exports.getIconType=_getIconType2.default;exports.normalizeText=_normalizeText2.default;exports.nodeType=_nodeType2.default;exports.ScreenWidth=ScreenWidth;exports.ScreenHeight=ScreenHeight;exports.isIOS=isIOS;exports.conditionalStyle=conditionalStyle;exports.color=_color2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Icon=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/icons/Icon.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _getIconType=__webpack_require__(9);var _getIconType2=_interopRequireDefault(_getIconType);var _config=__webpack_require__(3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var Icon=function Icon(props){var type=props.type,name=props.name,size=props.size,color=props.color,iconStyle=props.iconStyle,underlayColor=props.underlayColor,reverse=props.reverse,raised=props.raised,containerStyle=props.containerStyle,reverseColor=props.reverseColor,disabled=props.disabled,disabledStyle=props.disabledStyle,onPress=props.onPress,_props$Component=props.Component,Component=_props$Component===undefined?onPress?_reactNative.TouchableHighlight:_reactNative.View:_props$Component,attributes=_objectWithoutProperties(props,['type','name','size','color','iconStyle','underlayColor','reverse','raised','containerStyle','reverseColor','disabled','disabledStyle','onPress','Component']);var IconComponent=(0,_getIconType2.default)(type);var getBackgroundColor=function getBackgroundColor(){if(reverse){return color;}return raised?'white':'transparent';};return _react2.default.createElement(_reactNative.View,{style:containerStyle&&containerStyle,__source:{fileName:_jsxFileName,lineNumber:43}},_react2.default.createElement(Component,_extends({},attributes,{underlayColor:reverse?color:underlayColor||color,style:_reactNative.StyleSheet.flatten([(reverse||raised)&&styles.button,(reverse||raised)&&{borderRadius:size+4,height:size*2+4,width:size*2+4},raised&&styles.raised,{backgroundColor:getBackgroundColor(),alignItems:'center',justifyContent:'center'},disabled&&styles.disabled,disabled&&disabledStyle])},onPress&&{disabled:disabled},{onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:44}}),_react2.default.createElement(IconComponent,{testID:'iconIcon',style:_reactNative.StyleSheet.flatten([{backgroundColor:'transparent'},iconStyle&&iconStyle]),size:size,name:name,color:reverse?reverseColor:color,__source:{fileName:_jsxFileName,lineNumber:66}})));};Icon.propTypes={type:_propTypes2.default.string,name:_propTypes2.default.string,size:_propTypes2.default.number,color:_propTypes2.default.string,Component:_propTypes2.default.func,underlayColor:_propTypes2.default.string,reverse:_propTypes2.default.bool,raised:_propTypes2.default.bool,containerStyle:_config.ViewPropTypes.style,iconStyle:_reactNative.Text.propTypes.style,onPress:_propTypes2.default.func,reverseColor:_propTypes2.default.string,disabled:_propTypes2.default.bool,disabledStyle:_config.ViewPropTypes.style};Icon.defaultProps={underlayColor:'white',reverse:false,raised:false,size:24,color:'black',reverseColor:'white',disabled:false,type:'material'};var styles=_reactNative.StyleSheet.create({button:{margin:7},raised:_extends({},_reactNative.Platform.select({android:{elevation:2},default:{shadowColor:'rgba(0,0,0, .4)',shadowOffset:{height:1,width:1},shadowOpacity:1,shadowRadius:1}})),disabled:{backgroundColor:'#D1D5D8'}});exports.Icon=Icon;exports.default=(0,_config.withTheme)(Icon,'Icon');

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.TextElement=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/text/Text.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _normalizeText=__webpack_require__(10);var _normalizeText2=_interopRequireDefault(_normalizeText);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var TextElement=function TextElement(props){var style=props.style,children=props.children,h1=props.h1,h2=props.h2,h3=props.h3,h4=props.h4,h1Style=props.h1Style,h2Style=props.h2Style,h3Style=props.h3Style,h4Style=props.h4Style,rest=_objectWithoutProperties(props,['style','children','h1','h2','h3','h4','h1Style','h2Style','h3Style','h4Style']);return _react2.default.createElement(_reactNative.Text,_extends({style:_reactNative.StyleSheet.flatten([styles.text,style&&style,h1&&_reactNative.StyleSheet.flatten([{fontSize:(0,_normalizeText2.default)(40)},h1Style]),h2&&_reactNative.StyleSheet.flatten([{fontSize:(0,_normalizeText2.default)(34)},h2Style]),h3&&_reactNative.StyleSheet.flatten([{fontSize:(0,_normalizeText2.default)(28)},h3Style]),h4&&_reactNative.StyleSheet.flatten([{fontSize:(0,_normalizeText2.default)(22)},h4Style]),h1&&styles.bold,h2&&styles.bold,h3&&styles.bold,h4&&styles.bold])},rest,{__source:{fileName:_jsxFileName,lineNumber:24}}),children);};TextElement.propTypes={style:_reactNative.Text.propTypes.style,h1:_propTypes2.default.bool,h2:_propTypes2.default.bool,h3:_propTypes2.default.bool,h4:_propTypes2.default.bool,h1Style:_reactNative.Text.propTypes.style,h2Style:_reactNative.Text.propTypes.style,h3Style:_reactNative.Text.propTypes.style,h4Style:_reactNative.Text.propTypes.style,children:_propTypes2.default.node};TextElement.defaultProps={h1:false,h2:false,h3:false,h4:false,style:{},h1Style:{},h2Style:{},h3Style:{},h4Style:{},children:''};var styles=_reactNative.StyleSheet.create({text:_extends({},_reactNative.Platform.select({android:_extends({},_config.fonts.android.regular)})),bold:_extends({},_reactNative.Platform.select({android:_extends({},_config.fonts.android.bold)}))});exports.TextElement=TextElement;exports.default=(0,_config.withTheme)(TextElement,'Text');

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Input=undefined;var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/input/Input.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _helpers=__webpack_require__(4);var _config=__webpack_require__(3);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var renderText=function renderText(content,defaultProps,style){return(0,_helpers.renderNode)(_reactNative.Text,content,_extends({},defaultProps,{style:_reactNative.StyleSheet.flatten([style,defaultProps&&defaultProps.style])}));};var Input=function(_React$Component){_inherits(Input,_React$Component);function Input(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Input);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Input.__proto__||Object.getPrototypeOf(Input)).call.apply(_ref,[this].concat(args))),_this),_this.shakeAnimationValue=new _reactNative.Animated.Value(0),_this.shake=function(){var _this2=_this,shakeAnimationValue=_this2.shakeAnimationValue;shakeAnimationValue.setValue(0);_reactNative.Animated.timing(shakeAnimationValue,{duration:375,toValue:3,ease:_reactNative.Easing.bounce}).start();},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Input,[{key:'focus',value:function focus(){this.input.focus();}},{key:'blur',value:function blur(){this.input.blur();}},{key:'clear',value:function clear(){this.input.clear();}},{key:'isFocused',value:function isFocused(){return this.input.isFocused();}},{key:'setNativeProps',value:function setNativeProps(nativeProps){this.input.setNativeProps(nativeProps);}},{key:'render',value:function render(){var _this3=this;var _props=this.props,containerStyle=_props.containerStyle,inputContainerStyle=_props.inputContainerStyle,leftIcon=_props.leftIcon,leftIconContainerStyle=_props.leftIconContainerStyle,rightIcon=_props.rightIcon,rightIconContainerStyle=_props.rightIconContainerStyle,_props$inputComponent=_props.inputComponent,InputComponent=_props$inputComponent===undefined?_reactNative.TextInput:_props$inputComponent,inputStyle=_props.inputStyle,errorProps=_props.errorProps,errorStyle=_props.errorStyle,errorMessage=_props.errorMessage,label=_props.label,labelStyle=_props.labelStyle,labelProps=_props.labelProps,theme=_props.theme,attributes=_objectWithoutProperties(_props,['containerStyle','inputContainerStyle','leftIcon','leftIconContainerStyle','rightIcon','rightIconContainerStyle','inputComponent','inputStyle','errorProps','errorStyle','errorMessage','label','labelStyle','labelProps','theme']);var translateX=this.shakeAnimationValue.interpolate({inputRange:[0,0.5,1,1.5,2,2.5,3],outputRange:[0,-15,0,15,0,-15,0]});return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.container,containerStyle]),__source:{fileName:_jsxFileName,lineNumber:86}},renderText(label,_extends({style:labelStyle},labelProps),styles.label(theme)),_react2.default.createElement(_reactNative.Animated.View,{style:_reactNative.StyleSheet.flatten([styles.inputContainer(theme),inputContainerStyle,{transform:[{translateX:translateX}]}]),__source:{fileName:_jsxFileName,lineNumber:93}},leftIcon&&_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.iconContainer,leftIconContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:101}},(0,_helpers.renderNode)(_Icon2.default,leftIcon)),_react2.default.createElement(InputComponent,_extends({testID:'RNE__Input__text-input',underlineColorAndroid:'transparent'},attributes,{ref:function ref(_ref2){_this3.input=_ref2;},style:_reactNative.StyleSheet.flatten([styles.input,inputStyle]),__source:{fileName:_jsxFileName,lineNumber:111}})),rightIcon&&_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.iconContainer,rightIconContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:122}},(0,_helpers.renderNode)(_Icon2.default,rightIcon))),!!errorMessage&&_react2.default.createElement(_reactNative.Text,_extends({},errorProps,{style:_reactNative.StyleSheet.flatten([styles.error(theme),errorStyle&&errorStyle]),__source:{fileName:_jsxFileName,lineNumber:134}}),errorMessage));}}]);return Input;}(_react2.default.Component);Input.propTypes={containerStyle:_config.ViewPropTypes.style,inputContainerStyle:_config.ViewPropTypes.style,leftIcon:_helpers.nodeType,leftIconContainerStyle:_config.ViewPropTypes.style,rightIcon:_helpers.nodeType,rightIconContainerStyle:_config.ViewPropTypes.style,inputStyle:_config.TextPropTypes.style,inputComponent:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.func]),shake:_propTypes2.default.any,errorProps:_propTypes2.default.object,errorStyle:_config.TextPropTypes.style,errorMessage:_propTypes2.default.string,label:_propTypes2.default.node,labelStyle:_config.TextPropTypes.style,labelProps:_propTypes2.default.object,theme:_propTypes2.default.object};var styles={container:{width:'100%',paddingHorizontal:10},inputContainer:function inputContainer(theme){return{flexDirection:'row',borderBottomWidth:1,alignItems:'center',borderColor:theme.colors.grey3};},iconContainer:{height:40,justifyContent:'center',alignItems:'center',marginLeft:15},input:{alignSelf:'center',color:'black',fontSize:18,flex:1,minHeight:40},error:function error(theme){return{margin:5,fontSize:12,color:theme.colors.error};},label:function label(theme){return _extends({fontSize:16,color:theme.colors.grey3},_reactNative.Platform.select({android:_extends({},_config.fonts.android.bold),default:{fontWeight:'bold'}}));}};exports.Input=Input;exports.default=(0,_config.withTheme)(Input,'Input');

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.registerCustomIconType=undefined;var _Zocial=__webpack_require__(85);var _Zocial2=_interopRequireDefault(_Zocial);var _Octicons=__webpack_require__(83);var _Octicons2=_interopRequireDefault(_Octicons);var _MaterialIcons=__webpack_require__(82);var _MaterialIcons2=_interopRequireDefault(_MaterialIcons);var _MaterialCommunityIcons=__webpack_require__(81);var _MaterialCommunityIcons2=_interopRequireDefault(_MaterialCommunityIcons);var _Ionicons=__webpack_require__(80);var _Ionicons2=_interopRequireDefault(_Ionicons);var _Foundation=__webpack_require__(79);var _Foundation2=_interopRequireDefault(_Foundation);var _EvilIcons=__webpack_require__(77);var _EvilIcons2=_interopRequireDefault(_EvilIcons);var _Entypo=__webpack_require__(76);var _Entypo2=_interopRequireDefault(_Entypo);var _FontAwesome=__webpack_require__(16);var _FontAwesome2=_interopRequireDefault(_FontAwesome);var _SimpleLineIcons=__webpack_require__(84);var _SimpleLineIcons2=_interopRequireDefault(_SimpleLineIcons);var _Feather=__webpack_require__(78);var _Feather2=_interopRequireDefault(_Feather);var _AntDesign=__webpack_require__(71);var _AntDesign2=_interopRequireDefault(_AntDesign);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var customIcons={};var registerCustomIconType=exports.registerCustomIconType=function registerCustomIconType(id,customIcon){customIcons[id]=customIcon;};exports.default=function(type){switch(type){case'zocial':return _Zocial2.default;case'octicon':return _Octicons2.default;case'material':return _MaterialIcons2.default;case'material-community':return _MaterialCommunityIcons2.default;case'ionicon':return _Ionicons2.default;case'foundation':return _Foundation2.default;case'evilicon':return _EvilIcons2.default;case'entypo':return _Entypo2.default;case'font-awesome':return _FontAwesome2.default;case'simple-line-icon':return _SimpleLineIcons2.default;case'feather':return _Feather2.default;case'antdesign':return _AntDesign2.default;default:if(Object.prototype.hasOwnProperty.call(customIcons,type)){return customIcons[type];}return _MaterialIcons2.default;}};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=__webpack_require__(1);var pixelRatio=_reactNative.PixelRatio.get();var deviceHeight=_reactNative.Dimensions.get('window').height;var deviceWidth=_reactNative.Dimensions.get('window').width;var normalize=function normalize(size){if(pixelRatio>=2&&pixelRatio<3){if(deviceWidth<360){return size*0.95;}if(deviceHeight<667){return size;}if(deviceHeight>=667&&deviceHeight<=735){return size*1.15;}return size*1.25;}if(pixelRatio>=3&&pixelRatio<3.5){if(deviceWidth<=360){return size;}if(deviceHeight<667){return size*1.15;}if(deviceHeight>=667&&deviceHeight<=735){return size*1.2;}return size*1.27;}if(pixelRatio>=3.5){if(deviceWidth<=360){return size;}if(deviceHeight<667){return size*1.2;}if(deviceHeight>=667&&deviceHeight<=735){return size*1.25;}return size*1.4;}return size;};exports.default=normalize;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Badge=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/badge/Badge.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var Badge=function Badge(props){var containerStyle=props.containerStyle,textStyle=props.textStyle,badgeStyle=props.badgeStyle,onPress=props.onPress,_props$Component=props.Component,Component=_props$Component===undefined?onPress?_reactNative.TouchableOpacity:_reactNative.View:_props$Component,value=props.value,theme=props.theme,status=props.status,attributes=_objectWithoutProperties(props,['containerStyle','textStyle','badgeStyle','onPress','Component','value','theme','status']);var element=(0,_helpers.renderNode)(_reactNative.Text,value,{style:_reactNative.StyleSheet.flatten([styles.text,textStyle&&textStyle])});return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([containerStyle&&containerStyle]),__source:{fileName:_jsxFileName,lineNumber:26}},_react2.default.createElement(Component,_extends({},attributes,{style:_reactNative.StyleSheet.flatten([styles.badge(theme,status),!element&&styles.miniBadge,badgeStyle&&badgeStyle]),onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:27}}),element));};Badge.propTypes={containerStyle:_config.ViewPropTypes.style,badgeStyle:_config.ViewPropTypes.style,textStyle:_reactNative.Text.propTypes.style,value:_propTypes2.default.node,onPress:_propTypes2.default.func,Component:_propTypes2.default.func,theme:_propTypes2.default.object,status:_propTypes2.default.oneOf(['primary','success','warning','error'])};Badge.defaultProps={status:'primary'};var size=18;var miniSize=8;var styles={badge:function badge(theme,status){return{alignSelf:'center',minWidth:size,height:size,borderRadius:size/2,alignItems:'center',justifyContent:'center',backgroundColor:theme.colors[status],borderWidth:_reactNative.StyleSheet.hairlineWidth,borderColor:'#fff'};},miniBadge:{paddingHorizontal:0,paddingVertical:0,minWidth:miniSize,height:miniSize,borderRadius:miniSize/2},text:{fontSize:12,color:'white',paddingHorizontal:4}};exports.Badge=Badge;exports.default=(0,_config.withTheme)(Badge,'Badge');

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=__webpack_require__(1);var ViewPropTypes=_reactNative.ViewPropTypes||_reactNative.View.propTypes;exports.default=ViewPropTypes;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=__webpack_require__(1);exports.default={primary:'#2089dc',secondary:'#8F0CE8',grey0:'#393e42',grey1:'#43484d',grey2:'#5e6977',grey3:'#86939e',grey4:'#bdc6cf',grey5:'#e1e8ee',greyOutline:'#bbb',searchBg:'#303337',success:'#52c41a',error:'#ff190c',warning:'#faad14',disabled:'hsl(208, 8%, 90%)',divider:_reactNative.StyleSheet.hairlineWidth<1?'#bcbbc1':'rgba(0, 0, 0, 0.12)',platform:{ios:{primary:'#007aff',secondary:'#5856d6',success:'#4cd964',error:'#ff3b30',warning:'#ffcc00'},android:{primary:'#2196f3',secondary:'#9C27B0',success:'#4caf50',error:'#f44336',warning:'#ffeb3b'}}};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/FontAwesome;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Avatar=undefined;var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/avatar/Avatar.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);var _Image=__webpack_require__(22);var _Image2=_interopRequireDefault(_Image);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var avatarSizes={small:34,medium:50,large:75,xlarge:150};var defaultEditButton={name:'mode-edit',type:'material',color:'#fff',underlayColor:'#000'};var Avatar=function Avatar(_ref){var onPress=_ref.onPress,onLongPress=_ref.onLongPress,_ref$Component=_ref.Component,Component=_ref$Component===undefined?onPress||onLongPress?_reactNative.TouchableOpacity:_reactNative.View:_ref$Component,containerStyle=_ref.containerStyle,icon=_ref.icon,iconStyle=_ref.iconStyle,source=_ref.source,size=_ref.size,avatarStyle=_ref.avatarStyle,rounded=_ref.rounded,title=_ref.title,titleStyle=_ref.titleStyle,overlayContainerStyle=_ref.overlayContainerStyle,showEditButton=_ref.showEditButton,passedEditButton=_ref.editButton,onEditPress=_ref.onEditPress,imageProps=_ref.imageProps,placeholderStyle=_ref.placeholderStyle,renderPlaceholderContent=_ref.renderPlaceholderContent,ImageComponent=_ref.ImageComponent,attributes=_objectWithoutProperties(_ref,['onPress','onLongPress','Component','containerStyle','icon','iconStyle','source','size','avatarStyle','rounded','title','titleStyle','overlayContainerStyle','showEditButton','editButton','onEditPress','imageProps','placeholderStyle','renderPlaceholderContent','ImageComponent']);var width=typeof size==='number'?size:avatarSizes[size]||avatarSizes.small;var height=width;var titleSize=width/2;var iconSize=width/2;var editButton=_extends({},defaultEditButton,passedEditButton);var editButtonSize=editButton.size||(width+height)/2/3;var Utils=showEditButton&&_react2.default.createElement(_reactNative.TouchableHighlight,{style:_reactNative.StyleSheet.flatten([styles.editButton,{width:editButtonSize,height:editButtonSize,borderRadius:editButtonSize/2},editButton.style]),underlayColor:editButton.underlayColor,onPress:onEditPress,__source:{fileName:_jsxFileName,lineNumber:71}},_react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:84}},_react2.default.createElement(_Icon2.default,_extends({size:editButtonSize*0.8},editButton,{__source:{fileName:_jsxFileName,lineNumber:85}}))));var PlaceholderContent=renderPlaceholderContent&&(0,_helpers.renderNode)(undefined,renderPlaceholderContent)||title&&_react2.default.createElement(_reactNative.Text,{style:_reactNative.StyleSheet.flatten([styles.title,{fontSize:titleSize},titleStyle]),__source:{fileName:_jsxFileName,lineNumber:94}},title)||icon&&_react2.default.createElement(_Icon2.default,{style:iconStyle&&iconStyle,color:icon.color||'white',name:icon.name||'user',size:icon.size||iconSize,type:icon.type&&icon.type,__source:{fileName:_jsxFileName,lineNumber:105}});var hidePlaceholder=!source;return _react2.default.createElement(Component,_extends({onPress:onPress,onLongPress:onLongPress,style:_reactNative.StyleSheet.flatten([styles.container,{height:height,width:width},rounded&&{borderRadius:width/2},containerStyle])},attributes,{__source:{fileName:_jsxFileName,lineNumber:118}}),_react2.default.createElement(_Image2.default,_extends({placeholderStyle:_reactNative.StyleSheet.flatten([placeholderStyle,hidePlaceholder&&{backgroundColor:'transparent'}]),PlaceholderContent:PlaceholderContent,containerStyle:_reactNative.StyleSheet.flatten([styles.overlayContainer,overlayContainerStyle,rounded&&{borderRadius:width/2,overflow:'hidden'}]),source:source},imageProps,{style:_reactNative.StyleSheet.flatten([styles.avatar,imageProps&&imageProps.style,avatarStyle]),ImageComponent:ImageComponent,__source:{fileName:_jsxFileName,lineNumber:129}})),Utils);};var styles=_reactNative.StyleSheet.create({container:{backgroundColor:'transparent'},avatar:{flex:1,width:null,height:null},overlayContainer:{flex:1,backgroundColor:'#bdbdbd'},title:{color:'#ffffff',backgroundColor:'transparent',textAlign:'center'},editButton:_extends({position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'#aaa'},_reactNative.Platform.select({android:{elevation:1},default:{shadowColor:'#000',shadowOffset:{width:1,height:1},shadowRadius:2,shadowOpacity:0.5}}))});Avatar.propTypes={Component:_propTypes2.default.oneOf([_reactNative.View,_reactNative.TouchableOpacity,_reactNative.TouchableHighlight,_reactNative.TouchableNativeFeedback,_reactNative.TouchableWithoutFeedback]),onPress:_propTypes2.default.func,onLongPress:_propTypes2.default.func,containerStyle:_config.ViewPropTypes.style,source:_reactNative.Image.propTypes.source,avatarStyle:_config.ViewPropTypes.style,rounded:_propTypes2.default.bool,title:_propTypes2.default.string,titleStyle:_reactNative.Text.propTypes.style,overlayContainerStyle:_config.ViewPropTypes.style,activeOpacity:_propTypes2.default.number,icon:_propTypes2.default.object,iconStyle:_reactNative.Text.propTypes.style,size:_propTypes2.default.oneOfType([_propTypes2.default.oneOf(['small','medium','large','xlarge']),_propTypes2.default.number]),showEditButton:_propTypes2.default.bool,onEditPress:_propTypes2.default.func,editButton:_propTypes2.default.shape({size:_propTypes2.default.number,name:_propTypes2.default.string,type:_propTypes2.default.string,color:_propTypes2.default.string,underlayColor:_propTypes2.default.string,style:_config.ViewPropTypes.style}),placeholderStyle:_config.ViewPropTypes.style,renderPlaceholderContent:_helpers.nodeType,imageProps:_propTypes2.default.object,ImageComponent:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object])};Avatar.defaultProps={showEditButton:false,onEditPress:null,size:'small',editButton:defaultEditButton,ImageComponent:_reactNative.Image};exports.Avatar=Avatar;exports.default=(0,_config.withTheme)(Avatar,'Avatar');

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports,"__esModule",{value:true});exports.Button=undefined;var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/buttons/Button.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var defaultLoadingProps=function defaultLoadingProps(type,theme){return{color:type==='solid'?'white':theme.colors.primary,size:'small'};};var Button=function(_Component){_inherits(Button,_Component);function Button(){_classCallCheck(this,Button);return _possibleConstructorReturn(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));}_createClass(Button,[{key:'componentDidMount',value:function componentDidMount(){var _props=this.props,linearGradientProps=_props.linearGradientProps,ViewComponent=_props.ViewComponent;if(linearGradientProps&&!global.Expo&&!ViewComponent){console.error('You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require(\'react-native-linear-gradient\')}');}}},{key:'render',value:function render(){var _props2=this.props,TouchableComponent=_props2.TouchableComponent,containerStyle=_props2.containerStyle,onPress=_props2.onPress,buttonStyle=_props2.buttonStyle,type=_props2.type,loading=_props2.loading,loadingStyle=_props2.loadingStyle,passedLoadingProps=_props2.loadingProps,title=_props2.title,titleProps=_props2.titleProps,titleStyle=_props2.titleStyle,icon=_props2.icon,iconContainerStyle=_props2.iconContainerStyle,iconRight=_props2.iconRight,disabled=_props2.disabled,disabledStyle=_props2.disabledStyle,disabledTitleStyle=_props2.disabledTitleStyle,raised=_props2.raised,linearGradientProps=_props2.linearGradientProps,_props2$ViewComponent=_props2.ViewComponent,ViewComponent=_props2$ViewComponent===undefined?!disabled&&linearGradientProps&&global.Expo?global.Expo.LinearGradient:_reactNative.View:_props2$ViewComponent,theme=_props2.theme,attributes=_objectWithoutProperties(_props2,['TouchableComponent','containerStyle','onPress','buttonStyle','type','loading','loadingStyle','loadingProps','title','titleProps','titleStyle','icon','iconContainerStyle','iconRight','disabled','disabledStyle','disabledTitleStyle','raised','linearGradientProps','ViewComponent','theme']);if(_reactNative.Platform.OS==='android'&&buttonStyle.borderRadius&&!attributes.background){if(_reactNative.Platform.Version>=21){attributes.background=_reactNative.TouchableNativeFeedback.Ripple('ThemeAttrAndroid',false);}else{attributes.background=_reactNative.TouchableNativeFeedback.SelectableBackground();}}var loadingProps=_extends({},defaultLoadingProps(type,theme),passedLoadingProps);return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.container,{borderRadius:buttonStyle.borderRadius||styles.container.borderRadius},containerStyle,raised&&!disabled&&styles.raised(type)]),__source:{fileName:_jsxFileName,lineNumber:81}},_react2.default.createElement(TouchableComponent,_extends({onPress:onPress,activeOpacity:0.3,disabled:disabled},attributes,{__source:{fileName:_jsxFileName,lineNumber:92}}),_react2.default.createElement(ViewComponent,_extends({},linearGradientProps,{style:_reactNative.StyleSheet.flatten([styles.button(type,theme),buttonStyle,disabled&&styles.disabled(type,theme),disabled&&disabledStyle]),__source:{fileName:_jsxFileName,lineNumber:98}}),loading&&_react2.default.createElement(_reactNative.ActivityIndicator,_extends({style:_reactNative.StyleSheet.flatten([styles.loading,loadingStyle]),color:loadingProps.color,size:loadingProps.size},loadingProps,{__source:{fileName:_jsxFileName,lineNumber:108}})),!loading&&icon&&!iconRight&&(0,_helpers.renderNode)(_Icon2.default,icon,{containerStyle:_reactNative.StyleSheet.flatten([styles.iconContainer,iconContainerStyle])}),!loading&&!!title&&_react2.default.createElement(_reactNative.Text,_extends({style:_reactNative.StyleSheet.flatten([styles.title(type,theme),titleStyle,disabled&&styles.disabledTitle(theme),disabled&&disabledTitleStyle])},titleProps,{__source:{fileName:_jsxFileName,lineNumber:127}}),title),!loading&&icon&&iconRight&&(0,_helpers.renderNode)(_Icon2.default,icon,{containerStyle:_reactNative.StyleSheet.flatten([styles.iconContainer,iconContainerStyle])}))));}}]);return Button;}(_react.Component);Button.propTypes={title:_propTypes2.default.string,titleStyle:_reactNative.Text.propTypes.style,titleProps:_propTypes2.default.object,buttonStyle:_config.ViewPropTypes.style,type:_propTypes2.default.oneOf(['solid','clear','outline']),loading:_propTypes2.default.bool,loadingStyle:_config.ViewPropTypes.style,loadingProps:_propTypes2.default.object,onPress:_propTypes2.default.func,containerStyle:_config.ViewPropTypes.style,icon:_helpers.nodeType,iconContainerStyle:_config.ViewPropTypes.style,iconRight:_propTypes2.default.bool,linearGradientProps:_propTypes2.default.object,TouchableComponent:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object]),ViewComponent:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object]),disabled:_propTypes2.default.bool,disabledStyle:_config.ViewPropTypes.style,disabledTitleStyle:_reactNative.Text.propTypes.style,raised:_propTypes2.default.bool,theme:_propTypes2.default.object};Button.defaultProps={title:'',iconRight:false,TouchableComponent:_reactNative.Platform.select({android:_reactNative.TouchableNativeFeedback,default:_reactNative.TouchableOpacity}),onPress:function onPress(){return console.log('Please attach a method to this component');},type:'solid',buttonStyle:{borderRadius:3},disabled:false,raised:false,loading:false};var styles={button:function button(type,theme){return{flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:3,backgroundColor:type==='solid'?theme.colors.primary:'transparent',padding:8,borderWidth:type==='outline'?_reactNative.StyleSheet.hairlineWidth:0,borderColor:theme.colors.primary};},container:{borderRadius:3},disabled:function disabled(type,theme){return _extends({},(0,_helpers.conditionalStyle)(type==='solid',{backgroundColor:theme.colors.disabled}),(0,_helpers.conditionalStyle)(type==='outline',{borderColor:(0,_helpers.color)(theme.colors.disabled).darken(0.3)}));},disabledTitle:function disabledTitle(theme){return{color:(0,_helpers.color)(theme.colors.disabled).darken(0.3)};},title:function title(type,theme){return _extends({color:type==='solid'?'white':theme.colors.primary,fontSize:16,textAlign:'center',paddingTop:2,paddingBottom:1},_reactNative.Platform.select({android:{fontFamily:'sans-serif-medium'},default:{fontSize:18}}));},iconContainer:{marginHorizontal:5},raised:function raised(type){return type!=='clear'&&_extends({backgroundColor:'#fff'},_reactNative.Platform.select({android:{elevation:4},default:{shadowColor:'rgba(0,0,0, .4)',shadowOffset:{height:1,width:1},shadowOpacity:1,shadowRadius:1}}));},loading:{marginVertical:2}};exports.Button=Button;exports.default=(0,_config.withTheme)(Button,'Button');
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.ButtonGroup=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/buttons/ButtonGroup.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var ButtonGroup=function ButtonGroup(props){var theme=props.theme,rest=_objectWithoutProperties(props,['theme']);var Component=rest.Component,buttons=rest.buttons,_onPress=rest.onPress,selectedIndex=rest.selectedIndex,selectedIndexes=rest.selectedIndexes,selectMultiple=rest.selectMultiple,containerStyle=rest.containerStyle,innerBorderStyle=rest.innerBorderStyle,lastBorderStyle=rest.lastBorderStyle,buttonStyle=rest.buttonStyle,textStyle=rest.textStyle,selectedTextStyle=rest.selectedTextStyle,selectedButtonStyle=rest.selectedButtonStyle,_rest$underlayColor=rest.underlayColor,underlayColor=_rest$underlayColor===undefined?theme.colors.primary:_rest$underlayColor,activeOpacity=rest.activeOpacity,onHideUnderlay=rest.onHideUnderlay,onShowUnderlay=rest.onShowUnderlay,setOpacityTo=rest.setOpacityTo,containerBorderRadius=rest.containerBorderRadius,disabled=rest.disabled,disabledStyle=rest.disabledStyle,disabledTextStyle=rest.disabledTextStyle,disabledSelectedStyle=rest.disabledSelectedStyle,disabledSelectedTextStyle=rest.disabledSelectedTextStyle,attributes=_objectWithoutProperties(rest,['Component','buttons','onPress','selectedIndex','selectedIndexes','selectMultiple','containerStyle','innerBorderStyle','lastBorderStyle','buttonStyle','textStyle','selectedTextStyle','selectedButtonStyle','underlayColor','activeOpacity','onHideUnderlay','onShowUnderlay','setOpacityTo','containerBorderRadius','disabled','disabledStyle','disabledTextStyle','disabledSelectedStyle','disabledSelectedTextStyle']);var innerBorderWidth=1;if(innerBorderStyle&&Object.prototype.hasOwnProperty.call(innerBorderStyle,'width')){innerBorderWidth=innerBorderStyle.width;}return _react2.default.createElement(_reactNative.View,_extends({},attributes,{style:_reactNative.StyleSheet.flatten([styles.container,containerStyle&&containerStyle]),__source:{fileName:_jsxFileName,lineNumber:59}}),buttons.map(function(button,i){var isSelected=selectedIndex===i||selectedIndexes.includes(i);var isDisabled=disabled===true||Array.isArray(disabled)&&disabled.includes(i);return _react2.default.createElement(_reactNative.View,{key:i,style:_reactNative.StyleSheet.flatten([styles.button,i<buttons.length-1&&{borderRightWidth:i===0?0:innerBorderWidth,borderRightColor:innerBorderStyle&&innerBorderStyle.color||theme.colors.grey4},i===1&&{borderLeftWidth:innerBorderWidth,borderLeftColor:innerBorderStyle&&innerBorderStyle.color||theme.colors.grey4},i===buttons.length-1&&_extends({},lastBorderStyle,{borderTopRightRadius:containerBorderRadius,borderBottomRightRadius:containerBorderRadius}),i===0&&{borderTopLeftRadius:containerBorderRadius,borderBottomLeftRadius:containerBorderRadius}]),__source:{fileName:_jsxFileName,lineNumber:73}},_react2.default.createElement(Component,{testID:'buttonGroupItem',activeOpacity:activeOpacity,setOpacityTo:setOpacityTo,onHideUnderlay:onHideUnderlay,onShowUnderlay:onShowUnderlay,underlayColor:underlayColor,disabled:isDisabled,onPress:function onPress(){if(selectMultiple){if(selectedIndexes.includes(i)){_onPress(selectedIndexes.filter(function(index){return index!==i;}));}else{_onPress([].concat(_toConsumableArray(selectedIndexes),[i]));}}else{_onPress(i);}},style:styles.button,__source:{fileName:_jsxFileName,lineNumber:102}},_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.textContainer,buttonStyle&&buttonStyle,isSelected&&{backgroundColor:theme.colors.primary},isSelected&&selectedButtonStyle&&selectedButtonStyle,isDisabled&&styles.disabled,isDisabled&&disabledStyle,isDisabled&&isSelected&&styles.disabledSelected(theme),isDisabled&&isSelected&&disabledSelectedStyle]),__source:{fileName:_jsxFileName,lineNumber:123}},button.element?_react2.default.createElement(button.element,{__source:{fileName:_jsxFileName,lineNumber:138}}):_react2.default.createElement(_Text2.default,{testID:'buttonGroupItemText',style:_reactNative.StyleSheet.flatten([styles.buttonText(theme),textStyle&&textStyle,isSelected&&{color:'#fff'},isSelected&&selectedTextStyle,isDisabled&&styles.disabledText(theme),isDisabled&&disabledTextStyle,isDisabled&&isSelected&&disabledSelectedTextStyle]),__source:{fileName:_jsxFileName,lineNumber:140}},button))));}));};var styles={button:{flex:1},textContainer:{flex:1,justifyContent:'center',alignItems:'center'},container:{marginLeft:10,marginRight:10,marginBottom:5,marginTop:5,borderColor:'#e3e3e3',borderWidth:1,flexDirection:'row',borderRadius:3,overflow:'hidden',backgroundColor:'#fff',height:40},buttonText:function buttonText(theme){return _extends({fontSize:(0,_helpers.normalizeText)(13),color:theme.colors.grey2},_reactNative.Platform.select({android:{},default:{fontWeight:'500'}}));},disabled:{backgroundColor:'transparent'},disabledText:function disabledText(theme){return{color:(0,_helpers.color)(theme.colors.disabled).darken(0.3)};},disabledSelected:function disabledSelected(theme){return{backgroundColor:theme.colors.disabled};}};ButtonGroup.propTypes={button:_propTypes2.default.object,Component:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object]),onPress:_propTypes2.default.func,buttons:_propTypes2.default.array,containerStyle:_config.ViewPropTypes.style,textStyle:_reactNative.Text.propTypes.style,selectedTextStyle:_reactNative.Text.propTypes.style,selectedButtonStyle:_config.ViewPropTypes.style,underlayColor:_propTypes2.default.string,selectedIndex:_propTypes2.default.number,selectedIndexes:_propTypes2.default.arrayOf(_propTypes2.default.number),activeOpacity:_propTypes2.default.number,onHideUnderlay:_propTypes2.default.func,onShowUnderlay:_propTypes2.default.func,setOpacityTo:_propTypes2.default.func,innerBorderStyle:_propTypes2.default.shape({color:_propTypes2.default.string,width:_propTypes2.default.number}),lastBorderStyle:_propTypes2.default.oneOfType([_config.ViewPropTypes.style,_reactNative.Text.propTypes.style]),buttonStyle:_config.ViewPropTypes.style,containerBorderRadius:_propTypes2.default.number,selectMultiple:_propTypes2.default.bool,theme:_propTypes2.default.object,disabled:_propTypes2.default.oneOfType([_propTypes2.default.bool,_propTypes2.default.arrayOf(_propTypes2.default.number)]),disabledStyle:_config.ViewPropTypes.style,disabledTextStyle:_reactNative.Text.propTypes.style,disabledSelectedStyle:_config.ViewPropTypes.style,disabledSelectedTextStyle:_reactNative.Text.propTypes.style};ButtonGroup.defaultProps={selectedIndexes:[],selectMultiple:false,containerBorderRadius:3,disabled:false,Component:_reactNative.Platform.select({android:_reactNative.TouchableNativeFeedback,default:_reactNative.TouchableOpacity}),onPress:function onPress(){return null;}};exports.ButtonGroup=ButtonGroup;exports.default=(0,_config.withTheme)(ButtonGroup,'ButtonGroup');

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.CheckBox=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/checkbox/CheckBox.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _CheckBoxIcon=__webpack_require__(42);var _CheckBoxIcon2=_interopRequireDefault(_CheckBoxIcon);var _config=__webpack_require__(3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var CheckBox=function CheckBox(props){var theme=props.theme,rest=_objectWithoutProperties(props,['theme']);var Component=rest.Component,checked=rest.checked,iconRight=rest.iconRight,title=rest.title,titleProps=rest.titleProps,center=rest.center,right=rest.right,containerStyle=rest.containerStyle,textStyle=rest.textStyle,wrapperStyle=rest.wrapperStyle,onPress=rest.onPress,onLongPress=rest.onLongPress,checkedTitle=rest.checkedTitle,fontFamily=rest.fontFamily,_rest$checkedColor=rest.checkedColor,checkedColor=_rest$checkedColor===undefined?theme.colors.primary:_rest$checkedColor,attributes=_objectWithoutProperties(rest,['Component','checked','iconRight','title','titleProps','center','right','containerStyle','textStyle','wrapperStyle','onPress','onLongPress','checkedTitle','fontFamily','checkedColor']);return _react2.default.createElement(Component,_extends({},attributes,{onLongPress:onLongPress,onPress:onPress,style:_reactNative.StyleSheet.flatten([styles.container,title&&styles.containerHasTitle,containerStyle&&containerStyle]),__source:{fileName:_jsxFileName,lineNumber:39}}),_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.wrapper,right&&{justifyContent:'flex-end'},center&&{justifyContent:'center'},wrapperStyle&&wrapperStyle]),__source:{fileName:_jsxFileName,lineNumber:49}},!iconRight&&_react2.default.createElement(_CheckBoxIcon2.default,_extends({},props,{checkedColor:checkedColor,__source:{fileName:_jsxFileName,lineNumber:57}})),_react2.default.isValidElement(title)?title:title&&_react2.default.createElement(_Text2.default,_extends({testID:'checkboxTitle',style:_reactNative.StyleSheet.flatten([styles.text(theme),textStyle&&textStyle,fontFamily&&{fontFamily:fontFamily}])},titleProps,{__source:{fileName:_jsxFileName,lineNumber:62}}),checked?checkedTitle||title:title),iconRight&&_react2.default.createElement(_CheckBoxIcon2.default,_extends({},props,{checkedColor:checkedColor,__source:{fileName:_jsxFileName,lineNumber:75}}))));};CheckBox.propTypes=_extends({},_CheckBoxIcon2.default.propTypes,{Component:_propTypes2.default.oneOfType([_propTypes2.default.object,_propTypes2.default.func]),iconRight:_propTypes2.default.bool,title:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),titleProps:_propTypes2.default.object,center:_propTypes2.default.bool,right:_propTypes2.default.bool,containerStyle:_config.ViewPropTypes.style,wrapperStyle:_config.ViewPropTypes.style,textStyle:_reactNative.Text.propTypes.style,onPress:_propTypes2.default.func,onLongPress:_propTypes2.default.func,checkedTitle:_propTypes2.default.string,fontFamily:_propTypes2.default.string});CheckBox.defaultProps={checked:false,iconRight:false,right:false,center:false,uncheckedColor:'#bfbfbf',checkedIcon:'check-square-o',uncheckedIcon:'square-o',size:24,Component:_reactNative.TouchableOpacity,titleProps:{}};var styles={wrapper:{flexDirection:'row',alignItems:'center'},container:{margin:5,marginLeft:10,marginRight:10,padding:10},containerHasTitle:{borderWidth:1,borderRadius:3,backgroundColor:'#fafafa',borderColor:'#ededed'},text:function text(theme){return _extends({marginLeft:10,marginRight:10,color:theme.colors.grey1},_reactNative.Platform.select({android:_extends({},_config.fonts.android.bold),default:{fontWeight:'bold'}}));}};exports.CheckBox=CheckBox;exports.default=(0,_config.withTheme)(CheckBox,'CheckBox');

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Divider=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/divider/Divider.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var Divider=function Divider(_ref){var style=_ref.style,theme=_ref.theme,rest=_objectWithoutProperties(_ref,['style','theme']);return _react2.default.createElement(_reactNative.View,_extends({style:_reactNative.StyleSheet.flatten([styles.container(theme),style])},rest,{__source:{fileName:_jsxFileName,lineNumber:8}}));};Divider.propTypes={style:_config.ViewPropTypes.style,theme:_propTypes2.default.object};var styles={container:function container(theme){return{backgroundColor:theme.colors.divider,height:_reactNative.StyleSheet.hairlineWidth};}};exports.Divider=Divider;exports.default=(0,_config.withTheme)(Divider,'Divider');

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Image=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/image/Image.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _helpers=__webpack_require__(4);var _config=__webpack_require__(3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Image=function(_React$PureComponent){_inherits(Image,_React$PureComponent);function Image(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Image);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Image.__proto__||Object.getPrototypeOf(Image)).call.apply(_ref,[this].concat(args))),_this),_this.placeholderContainerOpacity=new _reactNative.Animated.Value(1),_this.onLoadEnd=function(){var minimumWait=100;var staggerNonce=200*Math.random();setTimeout(function(){return _reactNative.Animated.timing(_this.placeholderContainerOpacity,{toValue:0,duration:350,useNativeDriver:true}).start();},minimumWait+staggerNonce);},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Image,[{key:'render',value:function render(){var _props=this.props,placeholderStyle=_props.placeholderStyle,PlaceholderContent=_props.PlaceholderContent,containerStyle=_props.containerStyle,style=_props.style,ImageComponent=_props.ImageComponent,attributes=_objectWithoutProperties(_props,['placeholderStyle','PlaceholderContent','containerStyle','style','ImageComponent']);return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.container,containerStyle]),__source:{fileName:_jsxFileName,lineNumber:45}},_reactNative.Platform.select({android:_react2.default.createElement(_react2.default.Fragment,{__source:{fileName:_jsxFileName,lineNumber:48}},_react2.default.createElement(_reactNative.View,{style:styles.placeholderContainer,__source:{fileName:_jsxFileName,lineNumber:49}},_react2.default.createElement(_reactNative.Animated.View,{testID:'RNE__Image__placeholder',style:_reactNative.StyleSheet.flatten([style,styles.placeholder,{backgroundColor:this.placeholderContainerOpacity.interpolate({inputRange:[0,1],outputRange:[styles.placeholder.backgroundColor,'transparent']})},placeholderStyle]),__source:{fileName:_jsxFileName,lineNumber:50}},PlaceholderContent)),_react2.default.createElement(ImageComponent,_extends({},attributes,{style:style,__source:{fileName:_jsxFileName,lineNumber:73}}))),default:_react2.default.createElement(_react2.default.Fragment,{__source:{fileName:_jsxFileName,lineNumber:77}},_react2.default.createElement(ImageComponent,_extends({},attributes,{onLoadEnd:this.onLoadEnd,style:style,__source:{fileName:_jsxFileName,lineNumber:78}})),_react2.default.createElement(_reactNative.Animated.View,{style:_reactNative.StyleSheet.flatten([styles.placeholderContainer,{opacity:this.placeholderContainerOpacity}]),__source:{fileName:_jsxFileName,lineNumber:84}},_react2.default.createElement(_reactNative.View,{testID:'RNE__Image__placeholder',style:_reactNative.StyleSheet.flatten([style,styles.placeholder,placeholderStyle]),__source:{fileName:_jsxFileName,lineNumber:90}},PlaceholderContent)))}));}}]);return Image;}(_react2.default.PureComponent);var styles={container:{backgroundColor:'transparent',position:'relative'},placeholderContainer:_extends({},_reactNative.StyleSheet.absoluteFillObject),placeholder:{backgroundColor:'#bdbdbd',alignItems:'center',justifyContent:'center'}};Image.propTypes=_extends({},_reactNative.Image.propTypes,{ImageComponent:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object]),PlaceholderContent:_helpers.nodeType,containerStyle:_config.ViewPropTypes.style,placeholderStyle:_reactNative.Image.propTypes.style});Image.defaultProps={ImageComponent:_reactNative.Image};exports.Image=Image;exports.default=(0,_config.withTheme)(Image,'Image');

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.ThemeConsumer=undefined;var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/config/ThemeProvider.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _deepmerge=__webpack_require__(26);var _deepmerge2=_interopRequireDefault(_deepmerge);var _colors=__webpack_require__(13);var _colors2=_interopRequireDefault(_colors);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ThemeContext=_react2.default.createContext();var ThemeProvider=function(_React$Component){_inherits(ThemeProvider,_React$Component);function ThemeProvider(props){_classCallCheck(this,ThemeProvider);var _this=_possibleConstructorReturn(this,(ThemeProvider.__proto__||Object.getPrototypeOf(ThemeProvider)).call(this,props));_this.updateTheme=function(updates){_this.setState(function(_ref){var theme=_ref.theme;return{theme:(0,_deepmerge2.default)(theme,updates)};});};_this.getTheme=function(){return _this.state.theme;};_this.state={theme:(0,_deepmerge2.default)({colors:_colors2.default},props.theme)};return _this;}_createClass(ThemeProvider,[{key:'render',value:function render(){return _react2.default.createElement(ThemeContext.Provider,{value:{theme:this.state.theme,updateTheme:this.updateTheme},__source:{fileName:_jsxFileName,lineNumber:33}},this.props.children);}}]);return ThemeProvider;}(_react2.default.Component);exports.default=ThemeProvider;ThemeProvider.propTypes={theme:_propTypes2.default.object,children:_propTypes2.default.node.isRequired};ThemeProvider.defaultProps={theme:{}};var ThemeConsumer=exports.ThemeConsumer=ThemeContext.Consumer;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});exports.default={android:{regular:{fontFamily:'sans-serif'},light:{fontFamily:'sans-serif-light'},condensed:{fontFamily:'sans-serif-condensed'},condensed_light:{fontFamily:'sans-serif-condensed',fontWeight:'light'},black:{fontFamily:'sans-serif',fontWeight:'bold'},thin:{fontFamily:'sans-serif-thin'},medium:{fontFamily:'sans-serif-medium'},bold:{fontFamily:'sans-serif',fontWeight:'bold'}},default:{}};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(60);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.deepmerge = factory());
}(this, (function () { 'use strict';

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!options.isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		} else {
			destination[key] = deepmerge(target[key], source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

return deepmerge_1;

})));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(14);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/badge/withBadge.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _reactNative=__webpack_require__(1);var _Badge=__webpack_require__(11);var _Badge2=_interopRequireDefault(_Badge);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var withBadge=function withBadge(value){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return function(WrappedComponent){var WithBadge=function WithBadge(props){var bottom=options.bottom,_options$hidden=options.hidden,hidden=_options$hidden===undefined?false:_options$hidden,left=options.left,containerStyle=options.containerStyle,badgeProps=_objectWithoutProperties(options,['bottom','hidden','left','containerStyle']);var _options$right=options.right,right=_options$right===undefined?-16:_options$right,_options$top=options.top,top=_options$top===undefined?-1:_options$top;if(!value){right=-3;top=3;}var badgeValue=typeof value==='function'?value(props):value;return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.container,containerStyle]),__source:{fileName:_jsxFileName,lineNumber:26}},_react2.default.createElement(WrappedComponent,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:27}})),!hidden&&_react2.default.createElement(_Badge2.default,_extends({value:badgeValue,status:'error',containerStyle:_reactNative.StyleSheet.flatten([styles.badgeContainer,{bottom:bottom,left:left,right:right,top:top}])},badgeProps,{__source:{fileName:_jsxFileName,lineNumber:30}})));};WithBadge.displayName='WithBadge('+(WrappedComponent.displayName||WrappedComponent.name||'Component')+')';return WithBadge;};};var styles=_reactNative.StyleSheet.create({badgeContainer:{position:'absolute'},container:{alignItems:'center',justifyContent:'center',position:'relative'}});exports.default=withBadge;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Card=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/card/Card.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _normalizeText=__webpack_require__(10);var _normalizeText2=_interopRequireDefault(_normalizeText);var _config=__webpack_require__(3);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _Divider=__webpack_require__(21);var _Divider2=_interopRequireDefault(_Divider);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var Card=function Card(props){var children=props.children,containerStyle=props.containerStyle,wrapperStyle=props.wrapperStyle,imageWrapperStyle=props.imageWrapperStyle,title=props.title,titleStyle=props.titleStyle,titleNumberOfLines=props.titleNumberOfLines,featuredTitle=props.featuredTitle,featuredTitleStyle=props.featuredTitleStyle,featuredSubtitle=props.featuredSubtitle,featuredSubtitleStyle=props.featuredSubtitleStyle,dividerStyle=props.dividerStyle,image=props.image,imageStyle=props.imageStyle,imageProps=props.imageProps,theme=props.theme,attributes=_objectWithoutProperties(props,['children','containerStyle','wrapperStyle','imageWrapperStyle','title','titleStyle','titleNumberOfLines','featuredTitle','featuredTitleStyle','featuredSubtitle','featuredSubtitleStyle','dividerStyle','image','imageStyle','imageProps','theme']);return _react2.default.createElement(_reactNative.View,_extends({},attributes,{style:_reactNative.StyleSheet.flatten([styles.container(theme),image&&{padding:0},containerStyle&&containerStyle]),__source:{fileName:_jsxFileName,lineNumber:39}}),_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.wrapper,wrapperStyle&&wrapperStyle]),__source:{fileName:_jsxFileName,lineNumber:47}},title===''||_react2.default.isValidElement(title)?title:title&&title.length&&_react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:57}},_react2.default.createElement(_Text2.default,{testID:'cardTitle',style:_reactNative.StyleSheet.flatten([styles.cardTitle(theme),image&&styles.imageCardTitle,titleStyle&&titleStyle]),numberOfLines:titleNumberOfLines,__source:{fileName:_jsxFileName,lineNumber:58}},title),!image&&_react2.default.createElement(_Divider2.default,{style:_reactNative.StyleSheet.flatten([styles.divider,dividerStyle&&dividerStyle]),__source:{fileName:_jsxFileName,lineNumber:71}})),image&&_react2.default.createElement(_reactNative.View,{style:imageWrapperStyle&&imageWrapperStyle,__source:{fileName:_jsxFileName,lineNumber:82}},_react2.default.createElement(_config.BackgroundImage,_extends({style:[{width:null,height:150},imageStyle&&imageStyle],source:image},imageProps,{__source:{fileName:_jsxFileName,lineNumber:83}}),(featuredTitle||featuredSubtitle)&&_react2.default.createElement(_reactNative.View,{style:styles.overlayContainer,__source:{fileName:_jsxFileName,lineNumber:89}},featuredTitle&&_react2.default.createElement(_Text2.default,{style:_reactNative.StyleSheet.flatten([styles.featuredTitle,featuredTitleStyle&&featuredTitleStyle]),__source:{fileName:_jsxFileName,lineNumber:91}},featuredTitle),featuredSubtitle&&_react2.default.createElement(_Text2.default,{style:_reactNative.StyleSheet.flatten([styles.featuredSubtitle,featuredSubtitleStyle&&featuredSubtitleStyle]),__source:{fileName:_jsxFileName,lineNumber:101}},featuredSubtitle))),_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([{padding:10},wrapperStyle&&wrapperStyle]),__source:{fileName:_jsxFileName,lineNumber:114}},children)),!image&&children));};Card.propTypes={children:_propTypes2.default.oneOfType([_propTypes2.default.element,_propTypes2.default.arrayOf(_propTypes2.default.element)]),containerStyle:_config.ViewPropTypes.style,wrapperStyle:_config.ViewPropTypes.style,overlayStyle:_config.ViewPropTypes.style,title:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),titleStyle:_config.TextPropTypes.style,featuredTitle:_propTypes2.default.string,featuredTitleStyle:_config.TextPropTypes.style,featuredSubtitle:_propTypes2.default.string,featuredSubtitleStyle:_config.TextPropTypes.style,dividerStyle:_config.ViewPropTypes.style,image:_reactNative.Image.propTypes.source,imageStyle:_config.ViewPropTypes.style,imageWrapperStyle:_config.ViewPropTypes.style,imageProps:_propTypes2.default.object,titleNumberOfLines:_propTypes2.default.number,theme:_propTypes2.default.object};var styles={container:function container(theme){return _extends({backgroundColor:'white',borderWidth:1,padding:15,margin:15,marginBottom:0,borderColor:theme.colors.grey5},_reactNative.Platform.select({android:{elevation:1},default:{shadowColor:'rgba(0,0,0, .2)',shadowOffset:{height:0,width:0},shadowOpacity:1,shadowRadius:1}}));},featuredTitle:_extends({fontSize:(0,_normalizeText2.default)(18),marginBottom:8,color:'white'},_reactNative.Platform.select({android:_extends({},_config.fonts.android.black),default:{fontWeight:'800'}})),featuredSubtitle:_extends({fontSize:(0,_normalizeText2.default)(13),marginBottom:8,color:'white'},_reactNative.Platform.select({android:_extends({},_config.fonts.android.black),default:{fontWeight:'400'}})),wrapper:{backgroundColor:'transparent'},divider:{marginBottom:15},cardTitle:function cardTitle(theme){return _extends({fontSize:(0,_normalizeText2.default)(14),color:theme.colors.grey1},_reactNative.Platform.select({android:_extends({},_config.fonts.android.black),default:{fontWeight:'bold'}}),{textAlign:'center',marginBottom:15});},imageCardTitle:{marginTop:15},overlayContainer:{flex:1,alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.2)',alignSelf:'stretch',justifyContent:'center',position:'absolute',top:0,left:0,right:0,bottom:0}};exports.Card=Card;exports.default=(0,_config.withTheme)(Card,'Card');

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Header=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/header/Header.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var ALIGN_STYLE={left:'flex-start',right:'flex-end',center:'center'};var Children=function Children(_ref){var style=_ref.style,placement=_ref.placement,children=_ref.children;return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([{alignItems:ALIGN_STYLE[placement]},style]),__source:{fileName:_jsxFileName,lineNumber:26}},children==null||children===false?null:children.text?(0,_helpers.renderNode)(_Text2.default,children.text,_extends({numberOfLines:1},children)):children.icon?(0,_helpers.renderNode)(_Icon2.default,_extends({},children,{name:children.icon,containerStyle:_reactNative.StyleSheet.flatten([{alignItems:ALIGN_STYLE[placement]},children.containerStyle])})):(0,_helpers.renderNode)(_Text2.default,children));};Children.propTypes={placement:_propTypes2.default.oneOf(['left','center','right']),style:_config.ViewPropTypes.style,children:_propTypes2.default.oneOfType([_helpers.nodeType,_propTypes2.default.node])};var Header=function Header(_ref2){var statusBarProps=_ref2.statusBarProps,leftComponent=_ref2.leftComponent,centerComponent=_ref2.centerComponent,rightComponent=_ref2.rightComponent,leftContainerStyle=_ref2.leftContainerStyle,centerContainerStyle=_ref2.centerContainerStyle,rightContainerStyle=_ref2.rightContainerStyle,backgroundColor=_ref2.backgroundColor,backgroundImage=_ref2.backgroundImage,backgroundImageStyle=_ref2.backgroundImageStyle,containerStyle=_ref2.containerStyle,placement=_ref2.placement,barStyle=_ref2.barStyle,children=_ref2.children,theme=_ref2.theme,attributes=_objectWithoutProperties(_ref2,['statusBarProps','leftComponent','centerComponent','rightComponent','leftContainerStyle','centerContainerStyle','rightContainerStyle','backgroundColor','backgroundImage','backgroundImageStyle','containerStyle','placement','barStyle','children','theme']);return _react2.default.createElement(_reactNative.ImageBackground,_extends({testID:'headerContainer'},attributes,{style:_reactNative.StyleSheet.flatten([styles.container(theme),backgroundColor&&{backgroundColor:backgroundColor},containerStyle]),source:backgroundImage,imageStyle:backgroundImageStyle,__source:{fileName:_jsxFileName,lineNumber:70}}),_react2.default.createElement(_reactNative.StatusBar,_extends({barStyle:barStyle},statusBarProps,{__source:{fileName:_jsxFileName,lineNumber:81}})),_react2.default.createElement(Children,{style:_reactNative.StyleSheet.flatten([placement==='center'&&styles.rightLeftContainer,leftContainerStyle]),placement:'left',__source:{fileName:_jsxFileName,lineNumber:82}},_react2.default.isValidElement(children)&&children||children[0]||leftComponent),_react2.default.createElement(Children,{style:_reactNative.StyleSheet.flatten([styles.centerContainer,placement!=='center'&&{paddingHorizontal:_reactNative.Platform.select({android:16,default:15})},centerContainerStyle]),placement:placement,__source:{fileName:_jsxFileName,lineNumber:94}},children[1]||centerComponent),_react2.default.createElement(Children,{style:_reactNative.StyleSheet.flatten([placement==='center'&&styles.rightLeftContainer,rightContainerStyle]),placement:'right',__source:{fileName:_jsxFileName,lineNumber:110}},children[2]||rightComponent));};Header.propTypes={placement:_propTypes2.default.oneOf(['left','center','right']),leftComponent:_helpers.nodeType,centerComponent:_helpers.nodeType,rightComponent:_helpers.nodeType,leftContainerStyle:_config.ViewPropTypes.style,centerContainerStyle:_config.ViewPropTypes.style,rightContainerStyle:_config.ViewPropTypes.style,backgroundColor:_propTypes2.default.string,backgroundImage:_propTypes2.default.object,backgroundImageStyle:_reactNative.Image.propTypes.style,containerStyle:_config.ViewPropTypes.style,statusBarProps:_propTypes2.default.object,barStyle:_propTypes2.default.oneOf(['default','light-content','dark-content']),children:_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node),_propTypes2.default.node]),theme:_propTypes2.default.object};Header.defaultProps={placement:'center',children:[]};var styles={container:function container(theme){return{borderBottomColor:'#f2f2f2',borderBottomWidth:_reactNative.StyleSheet.hairlineWidth,paddingHorizontal:10,backgroundColor:theme.colors.primary,paddingTop:(0,_config.getStatusBarHeight)(),flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:_reactNative.Platform.select({android:56,default:44})+(0,_config.getStatusBarHeight)()};},centerContainer:{flex:3},rightLeftContainer:{flex:1}};exports.Header=Header;exports.default=(0,_config.withTheme)(Header,'Header');

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports,"__esModule",{value:true});exports.ListItem=undefined;var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/list/ListItem.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _helpers=__webpack_require__(4);var _config=__webpack_require__(3);var _Avatar=__webpack_require__(17);var _Avatar2=_interopRequireDefault(_Avatar);var _Badge=__webpack_require__(11);var _Badge2=_interopRequireDefault(_Badge);var _CheckBox=__webpack_require__(20);var _CheckBox2=_interopRequireDefault(_CheckBox);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _ButtonGroup=__webpack_require__(19);var _ButtonGroup2=_interopRequireDefault(_ButtonGroup);var _Input=__webpack_require__(8);var _Input2=_interopRequireDefault(_Input);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var ANDROID_SECONDARY='rgba(0, 0, 0, 0.54)';var chevronDefaultProps={type:_reactNative.Platform.OS==='ios'?'ionicon':'material',color:'#D1D1D6',name:_reactNative.Platform.OS==='ios'?'ios-arrow-forward':'keyboard-arrow-right',size:16};var checkmarkDefaultProps=function checkmarkDefaultProps(theme){return{name:'check',size:20,color:theme.colors.primary};};var renderText=function renderText(content,defaultProps,style){return(0,_helpers.renderNode)(_Text2.default,content,_extends({},defaultProps,{style:_reactNative.StyleSheet.flatten([style,defaultProps&&defaultProps.style])}));};var renderAvatar=function renderAvatar(content){return(0,_helpers.renderNode)(_Avatar2.default,content,{size:40,rounded:true});};var renderIcon=function renderIcon(content){return(0,_helpers.renderNode)(_Icon2.default,content,{color:_reactNative.Platform.OS==='ios'?null:ANDROID_SECONDARY,size:24});};var ListItem=function ListItem(props){var title=props.title,titleStyle=props.titleStyle,titleProps=props.titleProps,subtitle=props.subtitle,subtitleStyle=props.subtitleStyle,subtitleProps=props.subtitleProps,containerStyle=props.containerStyle,onPress=props.onPress,onLongPress=props.onLongPress,_props$Component=props.Component,Component=_props$Component===undefined?onPress||onLongPress?_reactNative.TouchableHighlight:_reactNative.View:_props$Component,leftIcon=props.leftIcon,leftAvatar=props.leftAvatar,leftElement=props.leftElement,rightIcon=props.rightIcon,rightAvatar=props.rightAvatar,rightElement=props.rightElement,rightTitle=props.rightTitle,rightTitleStyle=props.rightTitleStyle,rightTitleProps=props.rightTitleProps,rightSubtitle=props.rightSubtitle,rightSubtitleStyle=props.rightSubtitleStyle,rightSubtitleProps=props.rightSubtitleProps,input=props.input,buttonGroup=props.buttonGroup,switchProps=props.switch,checkBox=props.checkBox,badge=props.badge,chevron=props.chevron,contentContainerStyle=props.contentContainerStyle,rightContentContainerStyle=props.rightContentContainerStyle,checkmark=props.checkmark,disabled=props.disabled,disabledStyle=props.disabledStyle,bottomDivider=props.bottomDivider,topDivider=props.topDivider,pad=props.pad,linearGradientProps=props.linearGradientProps,_props$ViewComponent=props.ViewComponent,ViewComponent=_props$ViewComponent===undefined?linearGradientProps&&global.Expo?global.Expo.LinearGradient:_reactNative.View:_props$ViewComponent,theme=props.theme,attributes=_objectWithoutProperties(props,['title','titleStyle','titleProps','subtitle','subtitleStyle','subtitleProps','containerStyle','onPress','onLongPress','Component','leftIcon','leftAvatar','leftElement','rightIcon','rightAvatar','rightElement','rightTitle','rightTitleStyle','rightTitleProps','rightSubtitle','rightSubtitleStyle','rightSubtitleProps','input','buttonGroup','switch','checkBox','badge','chevron','contentContainerStyle','rightContentContainerStyle','checkmark','disabled','disabledStyle','bottomDivider','topDivider','pad','linearGradientProps','ViewComponent','theme']);return _react2.default.createElement(Component,_extends({},attributes,{onPress:onPress,onLongPress:onLongPress,disabled:disabled,__source:{fileName:_jsxFileName,lineNumber:101}}),_react2.default.createElement(PadView,_extends({Component:ViewComponent},linearGradientProps,{style:_reactNative.StyleSheet.flatten([styles.container(theme),(buttonGroup||switchProps)&&{paddingVertical:8},topDivider&&{borderTopWidth:_reactNative.StyleSheet.hairlineWidth},bottomDivider&&{borderBottomWidth:_reactNative.StyleSheet.hairlineWidth},containerStyle,disabled&&disabledStyle]),pad:pad,__source:{fileName:_jsxFileName,lineNumber:107}}),(0,_helpers.renderNode)(_Text2.default,leftElement),renderIcon(leftIcon),renderAvatar(leftAvatar),(typeof title!=='undefined'||subtitle)&&_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.contentContainer,contentContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:125}},renderText(title,_extends({testID:'listItemTitle'},titleProps),_reactNative.StyleSheet.flatten([styles.title,titleStyle])),renderText(subtitle,subtitleProps,_reactNative.StyleSheet.flatten([styles.subtitle,subtitleStyle]))),(!!rightTitle||!!rightSubtitle)&&_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.rightContentContainer,rightContentContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:145}},renderText(rightTitle,rightTitleProps,_reactNative.StyleSheet.flatten([styles.title,styles.rightTitle,rightTitleStyle])),renderText(rightSubtitle,rightSubtitleProps,_reactNative.StyleSheet.flatten([styles.subtitle,styles.rightSubtitle,rightSubtitleStyle]))),input&&_react2.default.createElement(_Input2.default,_extends({},input,{inputStyle:_reactNative.StyleSheet.flatten([styles.input,input&&input.inputStyle]),inputContainerStyle:_reactNative.StyleSheet.flatten([styles.inputContentContainer,input&&input.inputContainerStyle]),containerStyle:_reactNative.StyleSheet.flatten([styles.inputContainer,input&&input.containerStyle]),__source:{fileName:_jsxFileName,lineNumber:174}})),switchProps&&_react2.default.createElement(_reactNative.Switch,_extends({},switchProps,{__source:{fileName:_jsxFileName,lineNumber:190}})),checkBox&&_react2.default.createElement(_CheckBox2.default,_extends({},checkBox,{containerStyle:_reactNative.StyleSheet.flatten([styles.checkboxContainer,checkBox&&checkBox.containerStyle]),__source:{fileName:_jsxFileName,lineNumber:192}})),badge&&_react2.default.createElement(_Badge2.default,_extends({},badge,{__source:{fileName:_jsxFileName,lineNumber:200}})),buttonGroup&&_react2.default.createElement(_ButtonGroup2.default,_extends({},buttonGroup,{containerStyle:_reactNative.StyleSheet.flatten([styles.buttonGroupContainer,buttonGroup&&buttonGroup.containerStyle]),__source:{fileName:_jsxFileName,lineNumber:202}})),renderAvatar(rightAvatar),renderIcon(rightIcon),(0,_helpers.renderNode)(_Text2.default,rightElement),(0,_helpers.renderNode)(_Icon2.default,checkmark,checkmarkDefaultProps(theme)),(0,_helpers.renderNode)(_Icon2.default,chevron,chevronDefaultProps)));};var styles={container:function container(theme){return _extends({},_reactNative.Platform.select({ios:{padding:14},default:{padding:16}}),{flexDirection:'row',alignItems:'center',backgroundColor:'white',borderColor:theme.colors.divider});},title:_extends({backgroundColor:'transparent'},_reactNative.Platform.select({ios:{fontSize:17},default:{fontSize:16}})),subtitle:_extends({backgroundColor:'transparent'},_reactNative.Platform.select({ios:{fontSize:15},default:{color:ANDROID_SECONDARY,fontSize:14}})),contentContainer:{flex:1,justifyContent:'center'},rightContentContainer:{flex:0.5,justifyContent:'center',alignItems:'flex-end'},inputContainer:{flex:1,paddingRight:0},inputContentContainer:{flex:1,borderBottomWidth:0,width:null,height:null},input:{flex:1,textAlign:'right',width:null,height:null},checkboxContainer:{margin:0,marginRight:0,marginLeft:0,padding:0},buttonGroupContainer:{flex:1,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0},rightTitle:{color:ANDROID_SECONDARY},rightSubtitle:{color:ANDROID_SECONDARY}};ListItem.propTypes={containerStyle:_config.ViewPropTypes.style,contentContainerStyle:_config.ViewPropTypes.style,rightContentContainerStyle:_config.ViewPropTypes.style,Component:_propTypes2.default.func,onPress:_propTypes2.default.func,onLongPress:_propTypes2.default.func,title:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),titleStyle:_config.TextPropTypes.style,titleProps:_propTypes2.default.object,subtitle:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),subtitleStyle:_config.TextPropTypes.style,subtitleProps:_propTypes2.default.object,leftIcon:_helpers.nodeType,leftAvatar:_helpers.nodeType,leftElement:_helpers.nodeType,rightIcon:_helpers.nodeType,rightAvatar:_helpers.nodeType,rightElement:_helpers.nodeType,rightTitle:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),rightTitleStyle:_config.TextPropTypes.style,rightTitleProps:_propTypes2.default.object,rightSubtitle:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),rightSubtitleStyle:_config.TextPropTypes.style,rightSubtitleProps:_propTypes2.default.object,input:_propTypes2.default.object,buttonGroup:_propTypes2.default.object,switch:_propTypes2.default.object,checkBox:_propTypes2.default.object,badge:_propTypes2.default.object,chevron:_helpers.nodeType,checkmark:_helpers.nodeType,disabled:_propTypes2.default.bool,disabledStyle:_config.ViewPropTypes.style,topDivider:_propTypes2.default.bool,bottomDivider:_propTypes2.default.bool,pad:_propTypes2.default.number,linearGradientProps:_propTypes2.default.object,ViewComponent:_propTypes2.default.func,theme:_propTypes2.default.object};ListItem.defaultProps={pad:16,title:''};var PadView=function PadView(_ref){var children=_ref.children,pad=_ref.pad,Component=_ref.Component,props=_objectWithoutProperties(_ref,['children','pad','Component']);var childrens=_react2.default.Children.toArray(children);var length=childrens.length;var Container=Component||_reactNative.View;return _react2.default.createElement(Container,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:356}}),_react2.default.Children.map(childrens,function(child,index){return child&&[child,index!==length-1&&_react2.default.createElement(_reactNative.View,{width:pad,__source:{fileName:_jsxFileName,lineNumber:360}})];}));};PadView.propTypes={children:_propTypes2.default.node,pad:_propTypes2.default.number,Component:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object])};exports.ListItem=ListItem;exports.default=(0,_config.withTheme)(ListItem,'ListItem');
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Overlay=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/overlay/Overlay.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var Overlay=function Overlay(props){var children=props.children,isVisible=props.isVisible,containerStyle=props.containerStyle,overlayStyle=props.overlayStyle,windowBackgroundColor=props.windowBackgroundColor,overlayBackgroundColor=props.overlayBackgroundColor,onBackdropPress=props.onBackdropPress,borderRadius=props.borderRadius,width=props.width,height=props.height,fullScreen=props.fullScreen,rest=_objectWithoutProperties(props,['children','isVisible','containerStyle','overlayStyle','windowBackgroundColor','overlayBackgroundColor','onBackdropPress','borderRadius','width','height','fullScreen']);return _react2.default.createElement(_reactNative.Modal,_extends({visible:isVisible,onRequestClose:onBackdropPress,transparent:true},rest,{__source:{fileName:_jsxFileName,lineNumber:31}}),_react2.default.createElement(_reactNative.TouchableWithoutFeedback,{onPress:onBackdropPress,testID:'RNE__Overlay__backdrop',__source:{fileName:_jsxFileName,lineNumber:37}},_react2.default.createElement(_reactNative.View,{testID:'overlayContainer',style:_reactNative.StyleSheet.flatten([styles.backdrop,{backgroundColor:windowBackgroundColor},containerStyle]),__source:{fileName:_jsxFileName,lineNumber:41}})),_react2.default.createElement(_reactNative.View,{style:styles.container,pointerEvents:'box-none',__source:{fileName:_jsxFileName,lineNumber:51}},_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.overlay,{borderRadius:borderRadius,backgroundColor:overlayBackgroundColor,width:width,height:height},fullScreen&&styles.fullscreen,overlayStyle]),__source:{fileName:_jsxFileName,lineNumber:52}},children)));};Overlay.propTypes={children:_propTypes2.default.element.isRequired,isVisible:_propTypes2.default.bool.isRequired,containerStyle:_config.ViewPropTypes.style,overlayStyle:_config.ViewPropTypes.style,windowBackgroundColor:_propTypes2.default.string,overlayBackgroundColor:_propTypes2.default.string,onBackdropPress:_propTypes2.default.func,borderRadius:_propTypes2.default.number,width:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]),height:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]),fullScreen:_propTypes2.default.bool};Overlay.defaultProps={borderRadius:3,fullScreen:false,windowBackgroundColor:'rgba(0, 0, 0, .4)',overlayBackgroundColor:'white',width:_helpers.ScreenWidth-80,height:_helpers.ScreenHeight-180,onBackdropPress:function onBackdropPress(){return null;}};var styles=_reactNative.StyleSheet.create({backdrop:{position:'absolute',top:0,left:0,width:'100%',height:'100%',justifyContent:'center',alignItems:'center'},container:{flex:1,alignItems:'center',justifyContent:'center'},fullscreen:{width:'100%',height:'100%'},overlay:_extends({borderRadius:5,padding:10},_reactNative.Platform.select({android:{elevation:2},default:{shadowColor:'rgba(0, 0, 0, .3)',shadowOffset:{width:0,height:1},shadowRadius:4}}))});exports.Overlay=Overlay;exports.default=(0,_config.withTheme)(Overlay,'Overlay');

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.PricingCard=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/pricing/PricingCard.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _helpers=__webpack_require__(4);var _config=__webpack_require__(3);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _Button=__webpack_require__(18);var _Button2=_interopRequireDefault(_Button);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var PricingCard=function PricingCard(props){var theme=props.theme,rest=_objectWithoutProperties(props,['theme']);var containerStyle=rest.containerStyle,wrapperStyle=rest.wrapperStyle,title=rest.title,price=rest.price,info=rest.info,button=rest.button,_rest$color=rest.color,color=_rest$color===undefined?theme.colors.primary:_rest$color,titleStyle=rest.titleStyle,pricingStyle=rest.pricingStyle,infoStyle=rest.infoStyle,onButtonPress=rest.onButtonPress,attributes=_objectWithoutProperties(rest,['containerStyle','wrapperStyle','title','price','info','button','color','titleStyle','pricingStyle','infoStyle','onButtonPress']);return _react2.default.createElement(_reactNative.View,_extends({},attributes,{style:_reactNative.StyleSheet.flatten([styles.container(theme),containerStyle&&containerStyle]),__source:{fileName:_jsxFileName,lineNumber:31}}),_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.wrapper,wrapperStyle&&wrapperStyle]),__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement(_Text2.default,{testID:'pricingCardTitle',style:_reactNative.StyleSheet.flatten([styles.pricingTitle,titleStyle,{color:color}]),__source:{fileName:_jsxFileName,lineNumber:44}},title),_react2.default.createElement(_Text2.default,{style:_reactNative.StyleSheet.flatten([styles.pricingPrice,pricingStyle]),__source:{fileName:_jsxFileName,lineNumber:55}},price),info.map(function(item){return _react2.default.createElement(_Text2.default,{key:item,style:_reactNative.StyleSheet.flatten([styles.pricingInfo(theme),infoStyle]),__source:{fileName:_jsxFileName,lineNumber:60}},item);}),_react2.default.createElement(_Button2.default,{title:button.title,buttonStyle:_reactNative.StyleSheet.flatten([styles.button,button.buttonStyle,{backgroundColor:color}]),onPress:onButtonPress,icon:_react2.default.createElement(_Icon2.default,{name:button.icon,size:15,color:'white',__source:{fileName:_jsxFileName,lineNumber:76}}),__source:{fileName:_jsxFileName,lineNumber:68}})));};PricingCard.propTypes={containerStyle:_config.ViewPropTypes.style,wrapperStyle:_config.ViewPropTypes.style,title:_propTypes2.default.string,price:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]),info:_propTypes2.default.arrayOf(_propTypes2.default.string),button:_propTypes2.default.object,color:_propTypes2.default.string,onButtonPress:_propTypes2.default.func,titleStyle:_propTypes2.default.object,pricingStyle:_propTypes2.default.object,infoStyle:_propTypes2.default.object,theme:_propTypes2.default.object};PricingCard.defaultProps={info:[]};var styles={container:function container(theme){return _extends({margin:15,marginBottom:15,backgroundColor:'white',borderWidth:1,padding:15,borderColor:theme.colors.grey5},_reactNative.Platform.select({android:{elevation:1},default:{shadowColor:'rgba(0,0,0, .2)',shadowOffset:{height:1,width:0},shadowOpacity:0.5,shadowRadius:0.5}}));},wrapper:{backgroundColor:'transparent'},pricingTitle:_extends({textAlign:'center',fontSize:(0,_helpers.normalizeText)(30)},_reactNative.Platform.select({android:_extends({},_config.fonts.android.black),default:{fontWeight:'800'}})),pricingPrice:_extends({textAlign:'center',marginTop:10,marginBottom:10,fontSize:(0,_helpers.normalizeText)(40)},_reactNative.Platform.select({android:_extends({},_config.fonts.android.bold),default:{fontWeight:'700'}})),pricingInfo:function pricingInfo(theme){return _extends({textAlign:'center',marginTop:5,marginBottom:5,color:theme.colors.grey3},_reactNative.Platform.select({android:_extends({},_config.fonts.android.bold),default:{fontWeight:'600'}}));},button:{marginTop:15,marginBottom:10}};exports.PricingCard=PricingCard;exports.default=(0,_config.withTheme)(PricingCard,'PricingCard');

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.SearchBar=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/searchbar/SearchBar.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _config=__webpack_require__(3);var _SearchBarIos=__webpack_require__(51);var _SearchBarIos2=_interopRequireDefault(_SearchBarIos);var _SearchBarAndroid=__webpack_require__(49);var _SearchBarAndroid2=_interopRequireDefault(_SearchBarAndroid);var _SearchBarDefault=__webpack_require__(50);var _SearchBarDefault2=_interopRequireDefault(_SearchBarDefault);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var SEARCHBAR_COMPONENTS={ios:_SearchBarIos2.default,android:_SearchBarAndroid2.default,default:_SearchBarDefault2.default};var SearchBar=function(_React$Component){_inherits(SearchBar,_React$Component);function SearchBar(){var _ref;var _temp,_this,_ret;_classCallCheck(this,SearchBar);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=SearchBar.__proto__||Object.getPrototypeOf(SearchBar)).call.apply(_ref,[this].concat(args))),_this),_this.focus=function(){_this.searchbar.focus();},_this.blur=function(){_this.searchbar.blur();},_this.clear=function(){_this.searchbar.clear();},_this.cancel=function(){_this.searchbar.cancel&&_this.searchbar.cancel();},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(SearchBar,[{key:'render',value:function render(){var _this2=this;var Component=SEARCHBAR_COMPONENTS[this.props.platform]||_SearchBarDefault2.default;return _react2.default.createElement(Component,_extends({ref:function ref(_ref2){_this2.searchbar=_ref2;}},this.props,{__source:{fileName:_jsxFileName,lineNumber:38}}));}}]);return SearchBar;}(_react2.default.Component);SearchBar.propTypes={platform:_propTypes2.default.oneOf(['default','ios','android'])};SearchBar.defaultProps={platform:'default'};exports.SearchBar=SearchBar;exports.default=(0,_config.withTheme)(SearchBar,'SearchBar');

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Slider=undefined;var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/slider/Slider.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var TRACK_SIZE=4;var THUMB_SIZE=20;var DEFAULT_ANIMATION_CONFIGS={spring:{friction:7,tension:100},timing:{duration:150,easing:_reactNative.Easing.inOut(_reactNative.Easing.ease),delay:0}};var getBoundedValue=function getBoundedValue(_ref){var value=_ref.value,maximumValue=_ref.maximumValue,minimumValue=_ref.minimumValue;return value>maximumValue?maximumValue:value<minimumValue?minimumValue:value;};var Rect=function(){function Rect(x,y,width,height){_classCallCheck(this,Rect);this.x=x;this.y=y;this.width=width;this.height=height;}_createClass(Rect,[{key:'containsPoint',value:function containsPoint(x,y){return x>=this.x&&y>=this.y&&x<=this.x+this.width&&y<=this.y+this.height;}}]);return Rect;}();var Slider=function(_Component){_inherits(Slider,_Component);function Slider(props){_classCallCheck(this,Slider);var _this=_possibleConstructorReturn(this,(Slider.__proto__||Object.getPrototypeOf(Slider)).call(this,props));_this.measureContainer=function(x){_this.handleMeasure('containerSize',x);};_this.measureTrack=function(x){_this.handleMeasure('trackSize',x);};_this.measureThumb=function(x){_this.handleMeasure('thumbSize',x);};_this.state={containerSize:{width:0,height:0},trackSize:{width:0,height:0},thumbSize:{width:0,height:0},allMeasured:false,value:new _reactNative.Animated.Value(getBoundedValue(props))};_this.panResponder=_reactNative.PanResponder.create({onStartShouldSetPanResponder:_this.handleStartShouldSetPanResponder.bind(_this),onMoveShouldSetPanResponder:_this.handleMoveShouldSetPanResponder.bind(_this),onPanResponderGrant:_this.handlePanResponderGrant.bind(_this),onPanResponderMove:_this.handlePanResponderMove.bind(_this),onPanResponderRelease:_this.handlePanResponderEnd.bind(_this),onPanResponderTerminationRequest:_this.handlePanResponderRequestEnd.bind(_this),onPanResponderTerminate:_this.handlePanResponderEnd.bind(_this)});return _this;}_createClass(Slider,[{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var newValue=getBoundedValue(this.props);if(prevProps.value!==newValue){if(this.props.animateTransitions){this.setCurrentValueAnimated(newValue);}else{this.setCurrentValue(newValue);}}}},{key:'setCurrentValue',value:function setCurrentValue(value){this.state.value.setValue(value);}},{key:'setCurrentValueAnimated',value:function setCurrentValueAnimated(value){var animationType=this.props.animationType;var animationConfig=_extends({},DEFAULT_ANIMATION_CONFIGS[animationType],this.props.animationConfig,{toValue:value});_reactNative.Animated[animationType](this.state.value,animationConfig).start();}},{key:'handleMoveShouldSetPanResponder',value:function handleMoveShouldSetPanResponder(){return false;}},{key:'handlePanResponderGrant',value:function handlePanResponderGrant(){this._previousLeft=this.getThumbLeft(this.getCurrentValue());this.fireChangeEvent('onSlidingStart');}},{key:'handlePanResponderMove',value:function handlePanResponderMove(_,gestureState){if(this.props.disabled){return;}this.setCurrentValue(this.getValue(gestureState));this.fireChangeEvent('onValueChange');}},{key:'handlePanResponderRequestEnd',value:function handlePanResponderRequestEnd(){return false;}},{key:'handlePanResponderEnd',value:function handlePanResponderEnd(_,gestureState){if(this.props.disabled){return;}this.setCurrentValue(this.getValue(gestureState));this.fireChangeEvent('onSlidingComplete');}},{key:'thumbHitTest',value:function thumbHitTest(_ref2){var nativeEvent=_ref2.nativeEvent;var thumbTouchRect=this.getThumbTouchRect();return thumbTouchRect.containsPoint(nativeEvent.locationX,nativeEvent.locationY);}},{key:'handleStartShouldSetPanResponder',value:function handleStartShouldSetPanResponder(e){return this.thumbHitTest(e);}},{key:'fireChangeEvent',value:function fireChangeEvent(event){if(this.props[event]){this.props[event](this.getCurrentValue());}}},{key:'getTouchOverflowSize',value:function getTouchOverflowSize(){var _state=this.state,thumbSize=_state.thumbSize,allMeasured=_state.allMeasured,containerSize=_state.containerSize;var thumbTouchSize=this.props.thumbTouchSize;var size={};if(allMeasured===true){size.width=Math.max(0,thumbTouchSize.width-thumbSize.width);size.height=Math.max(0,thumbTouchSize.height-containerSize.height);}return size;}},{key:'getTouchOverflowStyle',value:function getTouchOverflowStyle(){var _getTouchOverflowSize=this.getTouchOverflowSize(),width=_getTouchOverflowSize.width,height=_getTouchOverflowSize.height;var touchOverflowStyle={};if(width!==undefined&&height!==undefined){var verticalMargin=-height/2;touchOverflowStyle.marginTop=verticalMargin;touchOverflowStyle.marginBottom=verticalMargin;var horizontalMargin=-width/2;touchOverflowStyle.marginLeft=horizontalMargin;touchOverflowStyle.marginRight=horizontalMargin;}if(this.props.debugTouchArea===true){touchOverflowStyle.backgroundColor='orange';touchOverflowStyle.opacity=0.5;}return touchOverflowStyle;}},{key:'handleMeasure',value:function handleMeasure(name,x){var _x$nativeEvent$layout=x.nativeEvent.layout,layoutWidth=_x$nativeEvent$layout.width,layoutHeight=_x$nativeEvent$layout.height;var width=this.props.orientation==='vertical'?layoutHeight:layoutWidth;var height=this.props.orientation==='vertical'?layoutWidth:layoutHeight;var size={width:width,height:height};var storeName='_'+name;var currentSize=this[storeName];if(currentSize&&width===currentSize.width&&height===currentSize.height){return;}this[storeName]=size;if(this._containerSize&&this._trackSize&&this._thumbSize){this.setState({containerSize:this._containerSize,trackSize:this._trackSize,thumbSize:this._thumbSize,allMeasured:true});}}},{key:'getValue',value:function getValue(gestureState){var length=this.state.containerSize.width-this.state.thumbSize.width;var thumbLeft=this._previousLeft+(this.props.orientation==='vertical'?gestureState.dy:gestureState.dx);var ratio=thumbLeft/length;if(this.props.step){return Math.max(this.props.minimumValue,Math.min(this.props.maximumValue,this.props.minimumValue+Math.round(ratio*(this.props.maximumValue-this.props.minimumValue)/this.props.step)*this.props.step));}return Math.max(this.props.minimumValue,Math.min(this.props.maximumValue,ratio*(this.props.maximumValue-this.props.minimumValue)+this.props.minimumValue));}},{key:'getCurrentValue',value:function getCurrentValue(){return this.state.value.__getValue();}},{key:'getRatio',value:function getRatio(value){return(value-this.props.minimumValue)/(this.props.maximumValue-this.props.minimumValue);}},{key:'getThumbLeft',value:function getThumbLeft(value){var ratio=this.getRatio(value);return ratio*(this.state.containerSize.width-this.state.thumbSize.width);}},{key:'getThumbTouchRect',value:function getThumbTouchRect(){var _state2=this.state,thumbSize=_state2.thumbSize,containerSize=_state2.containerSize;var thumbTouchSize=this.props.thumbTouchSize;var touchOverflowSize=this.getTouchOverflowSize();if(this.props.orientation==='vertical'){return new Rect(touchOverflowSize.height/2+(containerSize.height-thumbTouchSize.height)/2,touchOverflowSize.width/2+this.getThumbLeft(this.getCurrentValue())+(thumbSize.width-thumbTouchSize.width)/2,thumbTouchSize.width,thumbTouchSize.height);}return new Rect(touchOverflowSize.width/2+this.getThumbLeft(this.getCurrentValue())+(thumbSize.width-thumbTouchSize.width)/2,touchOverflowSize.height/2+(containerSize.height-thumbTouchSize.height)/2,thumbTouchSize.width,thumbTouchSize.height);}},{key:'renderDebugThumbTouchRect',value:function renderDebugThumbTouchRect(thumbLeft){var thumbTouchRect=this.getThumbTouchRect();var positionStyle={left:thumbLeft,top:thumbTouchRect.y,width:thumbTouchRect.width,height:thumbTouchRect.height};return _react2.default.createElement(_reactNative.Animated.View,{style:positionStyle,pointerEvents:'none',__source:{fileName:_jsxFileName,lineNumber:323}});}},{key:'getMinimumTrackStyles',value:function getMinimumTrackStyles(thumbStart){var _state3=this.state,thumbSize=_state3.thumbSize,trackSize=_state3.trackSize;var minimumTrackStyle={position:'absolute'};if(this.props.orientation==='vertical'){minimumTrackStyle.height=_reactNative.Animated.add(thumbStart,thumbSize.height/2);minimumTrackStyle.marginLeft=-trackSize.width;}else{minimumTrackStyle.width=_reactNative.Animated.add(thumbStart,thumbSize.width/2);minimumTrackStyle.marginTop=-trackSize.height;}return minimumTrackStyle;}},{key:'getThumbPositionStyles',value:function getThumbPositionStyles(thumbStart){if(this.props.orientation==='vertical'){return[{translateX:-(this.state.trackSize.height+this.state.thumbSize.height)/2},{translateY:thumbStart}];}return[{translateX:thumbStart},{translateY:-(this.state.trackSize.height+this.state.thumbSize.height)/2}];}},{key:'render',value:function render(){var _props=this.props,minimumValue=_props.minimumValue,maximumValue=_props.maximumValue,minimumTrackTintColor=_props.minimumTrackTintColor,maximumTrackTintColor=_props.maximumTrackTintColor,thumbTintColor=_props.thumbTintColor,containerStyle=_props.containerStyle,style=_props.style,trackStyle=_props.trackStyle,thumbStyle=_props.thumbStyle,debugTouchArea=_props.debugTouchArea,orientation=_props.orientation,other=_objectWithoutProperties(_props,['minimumValue','maximumValue','minimumTrackTintColor','maximumTrackTintColor','thumbTintColor','containerStyle','style','trackStyle','thumbStyle','debugTouchArea','orientation']);var _state4=this.state,value=_state4.value,containerSize=_state4.containerSize,thumbSize=_state4.thumbSize,allMeasured=_state4.allMeasured;var mainStyles=containerStyle||styles;var thumbStart=value.interpolate({inputRange:[minimumValue,maximumValue],outputRange:[0,containerSize.width-thumbSize.width]});var valueVisibleStyle={};if(!allMeasured){valueVisibleStyle.height=0;valueVisibleStyle.width=0;}var minimumTrackStyle=_extends({},this.getMinimumTrackStyles(thumbStart),{backgroundColor:minimumTrackTintColor},valueVisibleStyle);var thumbStyleTransform=thumbStyle&&thumbStyle.transform||[];var touchOverflowStyle=this.getTouchOverflowStyle();return _react2.default.createElement(_reactNative.View,_extends({},other,{style:_reactNative.StyleSheet.flatten([orientation==='vertical'?mainStyles.containerVertical:mainStyles.containerHorizontal,style]),onLayout:this.measureContainer,__source:{fileName:_jsxFileName,lineNumber:401}}),_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([mainStyles.track,orientation==='vertical'?mainStyles.trackVertical:mainStyles.trackHorizontal,trackStyle,{backgroundColor:maximumTrackTintColor}]),onLayout:this.measureTrack,__source:{fileName:_jsxFileName,lineNumber:411}}),_react2.default.createElement(_reactNative.Animated.View,{style:_reactNative.StyleSheet.flatten([mainStyles.track,orientation==='vertical'?mainStyles.trackVertical:mainStyles.trackHorizontal,trackStyle,minimumTrackStyle]),__source:{fileName:_jsxFileName,lineNumber:422}}),_react2.default.createElement(_reactNative.Animated.View,{testID:'sliderThumb',onLayout:this.measureThumb,style:_reactNative.StyleSheet.flatten([{backgroundColor:thumbTintColor},mainStyles.thumb,orientation==='vertical'?mainStyles.thumbVertical(trackStyle&&trackStyle.width):mainStyles.thumbHorizontal(trackStyle&&trackStyle.height),thumbStyle,_extends({transform:[].concat(_toConsumableArray(this.getThumbPositionStyles(thumbStart)),_toConsumableArray(thumbStyleTransform))},valueVisibleStyle)]),__source:{fileName:_jsxFileName,lineNumber:432}}),_react2.default.createElement(_reactNative.View,_extends({style:_reactNative.StyleSheet.flatten([styles.touchArea,touchOverflowStyle])},this.panResponder.panHandlers,{__source:{fileName:_jsxFileName,lineNumber:451}}),debugTouchArea===true&&this.renderDebugThumbTouchRect(thumbStart)));}}]);return Slider;}(_react.Component);Slider.propTypes={value:_propTypes2.default.number,disabled:_propTypes2.default.bool,minimumValue:_propTypes2.default.number,maximumValue:_propTypes2.default.number,step:_propTypes2.default.number,minimumTrackTintColor:_propTypes2.default.string,maximumTrackTintColor:_propTypes2.default.string,thumbTintColor:_propTypes2.default.string,thumbTouchSize:_propTypes2.default.shape({width:_propTypes2.default.number,height:_propTypes2.default.number}),onValueChange:_propTypes2.default.func,onSlidingStart:_propTypes2.default.func,onSlidingComplete:_propTypes2.default.func,style:_config.ViewPropTypes.style,trackStyle:_config.ViewPropTypes.style,thumbStyle:_config.ViewPropTypes.style,debugTouchArea:_propTypes2.default.bool,animateTransitions:_propTypes2.default.bool,animationType:_propTypes2.default.oneOf(['spring','timing']),orientation:_propTypes2.default.oneOf(['horizontal','vertical']),animationConfig:_propTypes2.default.object,containerStyle:_config.ViewPropTypes.style};Slider.defaultProps={value:0,minimumValue:0,maximumValue:1,step:0,minimumTrackTintColor:'#3f3f3f',maximumTrackTintColor:'#b3b3b3',thumbTintColor:'red',thumbTouchSize:{width:40,height:40},debugTouchArea:false,animationType:'timing',orientation:'horizontal'};var styles=_reactNative.StyleSheet.create({containerHorizontal:{height:40,justifyContent:'center'},containerVertical:{width:40,flexDirection:'column',alignItems:'center'},track:{borderRadius:TRACK_SIZE/2},trackHorizontal:{height:TRACK_SIZE},trackVertical:{flex:1,width:TRACK_SIZE},thumb:{position:'absolute',width:THUMB_SIZE,height:THUMB_SIZE,borderRadius:THUMB_SIZE/2},thumbHorizontal:function thumbHorizontal(height){return{top:22+(height?(height-4)/2:0)};},thumbVertical:function thumbVertical(width){return{left:22+(width?(width-4)/2:0)};},touchArea:{position:'absolute',backgroundColor:'transparent',top:0,left:0,right:0,bottom:0},debugThumbTouchArea:{position:'absolute',backgroundColor:'green',opacity:0.5}});exports.Slider=Slider;exports.default=(0,_config.withTheme)(Slider,'Slider');

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.SocialIcon=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/social/SocialIcon.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _FontAwesome=__webpack_require__(16);var _FontAwesome2=_interopRequireDefault(_FontAwesome);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _fonts=__webpack_require__(24);var _fonts2=_interopRequireDefault(_fonts);var _config=__webpack_require__(3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var log=function log(){console.log('please attach method to this component');};var colors={'github-alt':'#000000','google-plus-official':'#dd4b39','reddit-alien':'#fc461e','stack-overflow':'#f27f33',angellist:'#1c4082',codepen:'#000000',envelope:'#000000',etsy:'#f2581e',facebook:'#3b5998',foursquare:'#0072b1',github:'#000000',gitlab:'#e14329',instagram:'#517fa4',linkedin:'#007bb6',medium:'#02b875',pinterest:'#cb2027',quora:'#a82400',soundcloud:'#f50',steam:'#c6c3c1',stumbleupon:'#EB4823',tumblr:'#32506d',twitch:'#6441A5',twitter:'#00aced',vimeo:'#aad450',wechat:'#7bb32e',wordpress:'#21759b',youtube:'#bb0000'};var SocialIcon=function SocialIcon(props){var activityIndicatorStyle=props.activityIndicatorStyle,button=props.button,disabled=props.disabled,fontFamily=props.fontFamily,fontStyle=props.fontStyle,fontWeight=props.fontWeight,iconColor=props.iconColor,iconSize=props.iconSize,iconStyle=props.iconStyle,light=props.light,loading=props.loading,onLongPress=props.onLongPress,onPress=props.onPress,_props$Component=props.Component,Component=_props$Component===undefined?onPress||onLongPress?Component||_reactNative.TouchableHighlight:_reactNative.View:_props$Component,raised=props.raised,small=props.small,style=props.style,title=props.title,type=props.type,underlayColor=props.underlayColor,attributes=_objectWithoutProperties(props,['activityIndicatorStyle','button','disabled','fontFamily','fontStyle','fontWeight','iconColor','iconSize','iconStyle','light','loading','onLongPress','onPress','Component','raised','small','style','title','type','underlayColor']);var loadingElement=void 0;if(loading){loadingElement=_react2.default.createElement(_reactNative.ActivityIndicator,{animating:true,style:_reactNative.StyleSheet.flatten([styles.activityIndicatorStyle,activityIndicatorStyle]),color:iconColor||'white',size:small&&'small'||'large',__source:{fileName:_jsxFileName,lineNumber:80}});}return _react2.default.createElement(Component,_extends({},attributes,{underlayColor:light?'white':underlayColor||colors[type],onLongPress:disabled?null:onLongPress||log,onPress:(!disabled||log)&&(onPress||log),disabled:disabled||false,style:_reactNative.StyleSheet.flatten([raised&&styles.raised,styles.container,button&&styles.button,!button&&raised&&styles.icon,!button&&!light&&!raised&&{width:iconSize*2+4,height:iconSize*2+4,borderRadius:iconSize*2},{backgroundColor:colors[type]},light&&{backgroundColor:'white'},style&&style]),__source:{fileName:_jsxFileName,lineNumber:92}}),_react2.default.createElement(_reactNative.View,{style:styles.wrapper,__source:{fileName:_jsxFileName,lineNumber:115}},_react2.default.createElement(_FontAwesome2.default,{style:_reactNative.StyleSheet.flatten([iconStyle&&iconStyle]),color:light?colors[type]:iconColor,name:type,size:iconSize,__source:{fileName:_jsxFileName,lineNumber:116}}),button&&title&&_react2.default.createElement(_Text2.default,{style:_reactNative.StyleSheet.flatten([styles.title,light&&{color:colors[type]},fontFamily&&{fontFamily:fontFamily},fontWeight&&{fontWeight:fontWeight},fontStyle&&fontStyle]),__source:{fileName:_jsxFileName,lineNumber:123}},title),loading&&loadingElement));};SocialIcon.propTypes={Component:_propTypes2.default.func,type:_propTypes2.default.string,button:_propTypes2.default.bool,onPress:_propTypes2.default.func,onLongPress:_propTypes2.default.func,iconStyle:_config.ViewPropTypes.style,style:_config.ViewPropTypes.style,iconColor:_propTypes2.default.string,underlayColor:_propTypes2.default.string,title:_propTypes2.default.string,raised:_propTypes2.default.bool,disabled:_propTypes2.default.bool,loading:_propTypes2.default.bool,activityIndicatorStyle:_config.ViewPropTypes.style,small:_propTypes2.default.string,iconSize:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]),light:_propTypes2.default.bool,fontWeight:_propTypes2.default.string,fontStyle:_reactNative.Text.propTypes.style,fontFamily:_propTypes2.default.string};SocialIcon.defaultProps={raised:true,iconColor:'white',iconSize:24,button:false};var styles=_reactNative.StyleSheet.create({container:{margin:7,borderRadius:30,flexDirection:'row',justifyContent:'center',alignItems:'center'},button:{paddingTop:14,paddingBottom:14},raised:_extends({},_reactNative.Platform.select({android:{elevation:2},default:{shadowColor:'rgba(0,0,0, .4)',shadowOffset:{height:1,width:1},shadowOpacity:1,shadowRadius:1}})),wrapper:{flexDirection:'row',justifyContent:'center',alignItems:'center'},title:_extends({color:'white',marginLeft:15},_reactNative.Platform.select({android:_extends({},_fonts2.default.android.black),default:{fontWeight:'bold'}})),icon:{height:52,width:52},activityIndicatorStyle:{marginHorizontal:10,height:0}});exports.SocialIcon=SocialIcon;exports.default=(0,_config.withTheme)(SocialIcon,'SocialIcon');

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Tile=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/tile/Tile.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);var _FeaturedTile=__webpack_require__(52);var _FeaturedTile2=_interopRequireDefault(_FeaturedTile);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var Tile=function Tile(props){var featured=props.featured,imageSrc=props.imageSrc,icon=props.icon,title=props.title,children=props.children,caption=props.caption,titleStyle=props.titleStyle,onPress=props.onPress,activeOpacity=props.activeOpacity,overlayContainerStyle=props.overlayContainerStyle,captionStyle=props.captionStyle,iconContainerStyle=props.iconContainerStyle,imageContainerStyle=props.imageContainerStyle,containerStyle=props.containerStyle,contentContainerStyle=props.contentContainerStyle,titleNumberOfLines=props.titleNumberOfLines,ImageComponent=props.ImageComponent,attributes=_objectWithoutProperties(props,['featured','imageSrc','icon','title','children','caption','titleStyle','onPress','activeOpacity','overlayContainerStyle','captionStyle','iconContainerStyle','imageContainerStyle','containerStyle','contentContainerStyle','titleNumberOfLines','ImageComponent']);var width=props.width,_props$height=props.height,height=_props$height===undefined?width*0.8:_props$height;if(featured){var featuredProps={title:title,icon:icon,caption:caption,imageSrc:imageSrc,onPress:onPress,activeOpacity:activeOpacity,containerStyle:containerStyle,imageContainerStyle:imageContainerStyle,overlayContainerStyle:overlayContainerStyle,titleStyle:titleStyle,captionStyle:captionStyle,width:width,height:height,ImageComponent:ImageComponent};return _react2.default.createElement(_FeaturedTile2.default,_extends({},featuredProps,{__source:{fileName:_jsxFileName,lineNumber:63}}));}return _react2.default.createElement(_reactNative.TouchableOpacity,_extends({},attributes,{onPress:onPress,activeOpacity:activeOpacity,style:_reactNative.StyleSheet.flatten([{width:width,height:height},containerStyle&&containerStyle]),__source:{fileName:_jsxFileName,lineNumber:67}}),_react2.default.createElement(ImageComponent,{source:imageSrc,style:_reactNative.StyleSheet.flatten([styles.imageContainer,imageContainerStyle&&imageContainerStyle]),resizeMode:'cover',__source:{fileName:_jsxFileName,lineNumber:79}},_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.iconContainer,iconContainerStyle&&iconContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:87}},icon&&_react2.default.createElement(_Icon2.default,_extends({},icon,{__source:{fileName:_jsxFileName,lineNumber:93}})))),_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.contentContainer,contentContainerStyle&&contentContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:96}},_react2.default.createElement(_Text2.default,{testID:'tileTitle',h4:true,style:_reactNative.StyleSheet.flatten([styles.text,titleStyle&&titleStyle]),numberOfLines:titleNumberOfLines,__source:{fileName:_jsxFileName,lineNumber:102}},title),children));};Tile.propTypes={title:_propTypes2.default.string,icon:_propTypes2.default.object,caption:_propTypes2.default.node,imageSrc:_reactNative.Image.propTypes.source,onPress:_propTypes2.default.func,activeOpacity:_propTypes2.default.number,containerStyle:_config.ViewPropTypes.style,imageContainerStyle:_config.ViewPropTypes.style,iconContainerStyle:_config.ViewPropTypes.style,overlayContainerStyle:_config.ViewPropTypes.style,titleStyle:_config.TextPropTypes.style,captionStyle:_config.TextPropTypes.style,width:_propTypes2.default.number,height:_propTypes2.default.number,featured:_propTypes2.default.bool,children:_propTypes2.default.node,contentContainerStyle:_config.ViewPropTypes.style,titleNumberOfLines:_propTypes2.default.number,ImageComponent:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object])};Tile.defaultProps={width:_reactNative.Dimensions.get('window').width,ImageComponent:_config.BackgroundImage};var styles=_reactNative.StyleSheet.create({imageContainer:{alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff',flex:2},text:{backgroundColor:'rgba(0,0,0,0)',marginBottom:5},contentContainer:{paddingTop:15,paddingBottom:5,paddingLeft:15,paddingRight:15},iconContainer:{justifyContent:'center',alignItems:'center',alignSelf:'center'}});exports.Tile=Tile;exports.default=(0,_config.withTheme)(Tile,'Tile');

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Tooltip=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/tooltip/Tooltip.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Triangle=__webpack_require__(53);var _Triangle2=_interopRequireDefault(_Triangle);var _getTooltipCoordinate2=__webpack_require__(54);var _getTooltipCoordinate3=_interopRequireDefault(_getTooltipCoordinate2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Tooltip=function(_React$PureComponent){_inherits(Tooltip,_React$PureComponent);function Tooltip(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Tooltip);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Tooltip.__proto__||Object.getPrototypeOf(Tooltip)).call.apply(_ref,[this].concat(args))),_this),_this.state={isVisible:false,yOffset:0,xOffset:0,elementWidth:0,elementHeight:0},_this.toggleTooltip=function(){var onClose=_this.props.onClose;_this.getElementPosition();_this.setState(function(prevState){if(prevState.isVisible&&!_helpers.isIOS){onClose&&onClose();}return{isVisible:!prevState.isVisible};});},_this.wrapWithPress=function(toggleOnPress,children){if(toggleOnPress){return _react2.default.createElement(_reactNative.TouchableOpacity,{onPress:_this.toggleTooltip,activeOpacity:1,__source:{fileName:_jsxFileName,lineNumber:39}},children);}return children;},_this.getTooltipStyle=function(){var _this$state=_this.state,yOffset=_this$state.yOffset,xOffset=_this$state.xOffset,elementHeight=_this$state.elementHeight,elementWidth=_this$state.elementWidth;var _this$props=_this.props,height=_this$props.height,backgroundColor=_this$props.backgroundColor,width=_this$props.width,withPointer=_this$props.withPointer,containerStyle=_this$props.containerStyle;var _getTooltipCoordinate=(0,_getTooltipCoordinate3.default)(xOffset,yOffset,elementWidth,elementHeight,_helpers.ScreenWidth,_helpers.ScreenHeight,width,height,withPointer),x=_getTooltipCoordinate.x,y=_getTooltipCoordinate.y;return _extends({position:'absolute',left:x,top:y,width:width,height:height,backgroundColor:backgroundColor,display:'flex',alignItems:'center',justifyContent:'center',flex:1,borderRadius:10,padding:10},containerStyle);},_this.renderPointer=function(tooltipY){var _this$state2=_this.state,yOffset=_this$state2.yOffset,xOffset=_this$state2.xOffset,elementHeight=_this$state2.elementHeight,elementWidth=_this$state2.elementWidth;var _this$props2=_this.props,backgroundColor=_this$props2.backgroundColor,pointerColor=_this$props2.pointerColor;var pastMiddleLine=yOffset>tooltipY;return _react2.default.createElement(_reactNative.View,{style:{position:'absolute',top:pastMiddleLine?yOffset-13:yOffset+elementHeight-2,left:xOffset+(0,_getTooltipCoordinate2.getElementVisibleWidth)(elementWidth,xOffset,_helpers.ScreenWidth)/2-7.5},__source:{fileName:_jsxFileName,lineNumber:94}},_react2.default.createElement(_Triangle2.default,{style:{borderBottomColor:pointerColor||backgroundColor},isDown:pastMiddleLine,__source:{fileName:_jsxFileName,lineNumber:104}}));},_this.renderContent=function(withTooltip){var _this$props3=_this.props,popover=_this$props3.popover,withPointer=_this$props3.withPointer,toggleOnPress=_this$props3.toggleOnPress,highlightColor=_this$props3.highlightColor;if(!withTooltip)return _this.wrapWithPress(toggleOnPress,_this.props.children);var _this$state3=_this.state,yOffset=_this$state3.yOffset,xOffset=_this$state3.xOffset,elementWidth=_this$state3.elementWidth,elementHeight=_this$state3.elementHeight;var tooltipStyle=_this.getTooltipStyle();return _react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:121}},_react2.default.createElement(_reactNative.View,{style:{position:'absolute',top:yOffset,left:xOffset,backgroundColor:highlightColor,overflow:'visible',width:elementWidth,height:elementHeight},__source:{fileName:_jsxFileName,lineNumber:122}},_this.props.children),withPointer&&_this.renderPointer(tooltipStyle.top),_react2.default.createElement(_reactNative.View,{style:tooltipStyle,testID:'tooltipPopoverContainer',__source:{fileName:_jsxFileName,lineNumber:136}},popover));},_this.getElementPosition=function(){_this.renderedElement&&_this.renderedElement.measure(function(frameOffsetX,frameOffsetY,width,height,pageOffsetX,pageOffsetY){_this.setState({xOffset:pageOffsetX,yOffset:_helpers.isIOS?pageOffsetY:pageOffsetY-_reactNative.StatusBar.currentHeight,elementWidth:width,elementHeight:height});});},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Tooltip,[{key:'componentDidMount',value:function componentDidMount(){setTimeout(this.getElementPosition,500);}},{key:'render',value:function render(){var _this2=this;var isVisible=this.state.isVisible;var _props=this.props,onClose=_props.onClose,withOverlay=_props.withOverlay,onOpen=_props.onOpen;return _react2.default.createElement(_reactNative.View,{collapsable:false,ref:function ref(e){_this2.renderedElement=e;},__source:{fileName:_jsxFileName,lineNumber:176}},this.renderContent(false),_react2.default.createElement(_reactNative.Modal,{animationType:'fade',visible:isVisible,transparent:true,onDismiss:onClose,onShow:onOpen,onRequestClose:onClose,__source:{fileName:_jsxFileName,lineNumber:183}},_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.container(withOverlay),onPress:this.toggleTooltip,activeOpacity:1,__source:{fileName:_jsxFileName,lineNumber:191}},this.renderContent(true))));}}]);return Tooltip;}(_react2.default.PureComponent);Tooltip.propTypes={children:_propTypes2.default.element,withPointer:_propTypes2.default.bool,popover:_propTypes2.default.element,toggleOnPress:_propTypes2.default.bool,height:_propTypes2.default.number,width:_propTypes2.default.oneOfType([_propTypes2.default.number,_propTypes2.default.string]),containerStyle:_config.ViewPropTypes.style,pointerColor:_propTypes2.default.string,onClose:_propTypes2.default.func,onOpen:_propTypes2.default.func,withOverlay:_propTypes2.default.bool,backgroundColor:_propTypes2.default.string,highlightColor:_propTypes2.default.string};Tooltip.defaultProps={withOverlay:true,highlightColor:'transparent',withPointer:true,toggleOnPress:true,height:40,width:150,containerStyle:{},backgroundColor:'#617080',onClose:function onClose(){},onOpen:function onOpen(){}};var styles={container:function container(withOverlay){return{backgroundColor:withOverlay?'rgba(250, 250, 250, 0.70)':'transparent',flex:1};}};exports.Tooltip=Tooltip;exports.default=(0,_config.withTheme)(Tooltip,'Tooltip');

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SwipeRating__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SwipeRating___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SwipeRating__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TapRating__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TapRating___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__TapRating__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__SwipeRating__, "default")) __webpack_require__.d(__webpack_exports__, "Rating", function() { return __WEBPACK_IMPORTED_MODULE_0__SwipeRating__["default"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__TapRating__, "default")) __webpack_require__.d(__webpack_exports__, "AirbnbRating", function() { return __WEBPACK_IMPORTED_MODULE_1__TapRating__["default"]; });






/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/checkbox/CheckBoxIcon.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _FontAwesome=__webpack_require__(16);var _FontAwesome2=_interopRequireDefault(_FontAwesome);var _getIconType=__webpack_require__(9);var _getIconType2=_interopRequireDefault(_getIconType);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var CheckBoxIcon=function CheckBoxIcon(_ref){var checked=_ref.checked,onIconPress=_ref.onIconPress,onLongIconPress=_ref.onLongIconPress,size=_ref.size,checkedIcon=_ref.checkedIcon,uncheckedIcon=_ref.uncheckedIcon,iconType=_ref.iconType,checkedColor=_ref.checkedColor,uncheckedColor=_ref.uncheckedColor;if(checked&&_react2.default.isValidElement(checkedIcon)){return checkedIcon;}if(!checked&&_react2.default.isValidElement(uncheckedIcon)){return uncheckedIcon;}var VectorIcon=iconType?(0,_getIconType2.default)(iconType):_FontAwesome2.default;return _react2.default.createElement(VectorIcon,{color:checked?checkedColor:uncheckedColor,name:checked?checkedIcon:uncheckedIcon,size:size||24,style:{minWidth:size||24},onLongPress:onLongIconPress,onPress:onIconPress,__source:{fileName:_jsxFileName,lineNumber:29}});};CheckBoxIcon.propTypes={checked:_propTypes2.default.bool,onIconPress:_propTypes2.default.func,onLongIconPress:_propTypes2.default.func,size:_propTypes2.default.number,checkedIcon:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),uncheckedIcon:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.element]),iconType:_propTypes2.default.string,checkedColor:_propTypes2.default.string,uncheckedColor:_propTypes2.default.string};exports.default=CheckBoxIcon;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=__webpack_require__(1);var BackgroundImage=_reactNative.ImageBackground||_reactNative.Image;exports.default=BackgroundImage;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _colors=__webpack_require__(13);var _colors2=_interopRequireDefault(_colors);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default={colors:_colors2.default};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/config/withTheme.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _deepmerge=__webpack_require__(26);var _deepmerge2=_interopRequireDefault(_deepmerge);var _hoistNonReactStatics=__webpack_require__(61);var _hoistNonReactStatics2=_interopRequireDefault(_hoistNonReactStatics);var _ThemeProvider=__webpack_require__(23);var _theme=__webpack_require__(44);var _theme2=_interopRequireDefault(_theme);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var isClassComponent=function isClassComponent(Component){return Boolean(Component.prototype&&Component.prototype.isReactComponent);};var withTheme=function withTheme(WrappedComponent,themeKey){var ThemedComponent=function(_React$Component){_inherits(ThemedComponent,_React$Component);function ThemedComponent(){_classCallCheck(this,ThemedComponent);return _possibleConstructorReturn(this,(ThemedComponent.__proto__||Object.getPrototypeOf(ThemedComponent)).apply(this,arguments));}_createClass(ThemedComponent,[{key:'render',value:function render(){var _props=this.props,forwardedRef=_props.forwardedRef,children=_props.children,rest=_objectWithoutProperties(_props,['forwardedRef','children']);return _react2.default.createElement(_ThemeProvider.ThemeConsumer,{__source:{fileName:_jsxFileName,lineNumber:18}},function(context){if(!context){var _props2=_extends({},rest,{theme:_theme2.default,children:children});return isClassComponent(WrappedComponent)?_react2.default.createElement(WrappedComponent,_extends({ref:forwardedRef},_props2,{__source:{fileName:_jsxFileName,lineNumber:25}})):_react2.default.createElement(WrappedComponent,_extends({},_props2,{__source:{fileName:_jsxFileName,lineNumber:27}}));}var theme=context.theme,updateTheme=context.updateTheme;var props=_extends({theme:theme,updateTheme:updateTheme},(0,_deepmerge2.default)(themeKey&&theme[themeKey]||{},rest),{children:children});if(isClassComponent(WrappedComponent)){return _react2.default.createElement(WrappedComponent,_extends({ref:forwardedRef},props,{__source:{fileName:_jsxFileName,lineNumber:40}}));}return _react2.default.createElement(WrappedComponent,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:42}}));});}}]);return ThemedComponent;}(_react2.default.Component);var name=themeKey?'Themed.'+themeKey:'Themed.'+(WrappedComponent.displayName||WrappedComponent.name||'Component');if(isClassComponent(WrappedComponent)){var forwardRef=function forwardRef(props,ref){return _react2.default.createElement(ThemedComponent,_extends({},props,{forwardedRef:ref,__source:{fileName:_jsxFileName,lineNumber:57}}));};forwardRef.displayName=name;return(0,_hoistNonReactStatics2.default)(_react2.default.forwardRef(forwardRef),WrappedComponent);}ThemedComponent.displayName=name;return ThemedComponent;};exports.default=withTheme;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=_propTypes2.default.oneOfType([_propTypes2.default.element,_propTypes2.default.object,_propTypes2.default.bool,_propTypes2.default.func]);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/helpers/renderNode.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var renderNode=function renderNode(Component,content,defaultProps){if(content==null||content===false){return null;}if(_react2.default.isValidElement(content)){return content;}if(typeof content==='function'){return content();}if(content===true){return _react2.default.createElement(Component,_extends({},defaultProps,{__source:{fileName:_jsxFileName,lineNumber:15}}));}if(typeof content==='string'||typeof content==='number'){return _react2.default.createElement(Component,_extends({},defaultProps,{__source:{fileName:_jsxFileName,lineNumber:18}}),content);}return _react2.default.createElement(Component,_extends({},defaultProps,content,{__source:{fileName:_jsxFileName,lineNumber:20}}));};exports.default=renderNode;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.Image=exports.withTheme=exports.withBadge=exports.ThemeConsumer=exports.ThemeProvider=exports.Overlay=exports.Header=exports.AirbnbRating=exports.Rating=exports.Avatar=exports.Slider=exports.Tile=exports.normalize=exports.registerCustomIconType=exports.getIconType=exports.colors=exports.Icon=exports.SearchBar=exports.CheckBox=exports.Divider=exports.Text=exports.SocialIcon=exports.Tooltip=exports.PricingCard=exports.ListItem=exports.Input=exports.Card=exports.ButtonGroup=exports.Button=exports.Badge=undefined;var _Button=__webpack_require__(18);var _Button2=_interopRequireDefault(_Button);var _Input=__webpack_require__(8);var _Input2=_interopRequireDefault(_Input);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);var _ListItem=__webpack_require__(33);var _ListItem2=_interopRequireDefault(_ListItem);var _SocialIcon=__webpack_require__(38);var _SocialIcon2=_interopRequireDefault(_SocialIcon);var _Overlay=__webpack_require__(34);var _Overlay2=_interopRequireDefault(_Overlay);var _SearchBar=__webpack_require__(36);var _SearchBar2=_interopRequireDefault(_SearchBar);var _Badge=__webpack_require__(11);var _Badge2=_interopRequireDefault(_Badge);var _withBadge=__webpack_require__(30);var _withBadge2=_interopRequireDefault(_withBadge);var _CheckBox=__webpack_require__(20);var _CheckBox2=_interopRequireDefault(_CheckBox);var _Divider=__webpack_require__(21);var _Divider2=_interopRequireDefault(_Divider);var _Slider=__webpack_require__(37);var _Slider2=_interopRequireDefault(_Slider);var _ButtonGroup=__webpack_require__(19);var _ButtonGroup2=_interopRequireDefault(_ButtonGroup);var _Image=__webpack_require__(22);var _Image2=_interopRequireDefault(_Image);var _Card=__webpack_require__(31);var _Card2=_interopRequireDefault(_Card);var _Tile=__webpack_require__(39);var _Tile2=_interopRequireDefault(_Tile);var _Avatar=__webpack_require__(17);var _Avatar2=_interopRequireDefault(_Avatar);var _Header=__webpack_require__(32);var _Header2=_interopRequireDefault(_Header);var _PricingCard=__webpack_require__(35);var _PricingCard2=_interopRequireDefault(_PricingCard);var _Tooltip=__webpack_require__(40);var _Tooltip2=_interopRequireDefault(_Tooltip);var _reactNativeRatings=__webpack_require__(41);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _config=__webpack_require__(3);var _getIconType=__webpack_require__(9);var _getIconType2=_interopRequireDefault(_getIconType);var _normalizeText=__webpack_require__(10);var _normalizeText2=_interopRequireDefault(_normalizeText);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var AirbnbRating=(0,_config.withTheme)(_reactNativeRatings.AirbnbRating,'AirbnbRating');var Rating=(0,_config.withTheme)(_reactNativeRatings.Rating,'Rating');exports.Badge=_Badge2.default;exports.Button=_Button2.default;exports.ButtonGroup=_ButtonGroup2.default;exports.Card=_Card2.default;exports.Input=_Input2.default;exports.ListItem=_ListItem2.default;exports.PricingCard=_PricingCard2.default;exports.Tooltip=_Tooltip2.default;exports.SocialIcon=_SocialIcon2.default;exports.Text=_Text2.default;exports.Divider=_Divider2.default;exports.CheckBox=_CheckBox2.default;exports.SearchBar=_SearchBar2.default;exports.Icon=_Icon2.default;exports.colors=_config.colors;exports.getIconType=_getIconType2.default;exports.registerCustomIconType=_getIconType.registerCustomIconType;exports.normalize=_normalizeText2.default;exports.Tile=_Tile2.default;exports.Slider=_Slider2.default;exports.Avatar=_Avatar2.default;exports.Rating=Rating;exports.AirbnbRating=AirbnbRating;exports.Header=_Header2.default;exports.Overlay=_Overlay2.default;exports.ThemeProvider=_config.ThemeProvider;exports.ThemeConsumer=_config.ThemeConsumer;exports.withBadge=_withBadge2.default;exports.withTheme=_config.withTheme;exports.Image=_Image2.default;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/searchbar/SearchBar-android.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Input=__webpack_require__(8);var _Input2=_interopRequireDefault(_Input);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ANDROID_GRAY='rgba(0, 0, 0, 0.54)';var defaultSearchIcon={type:'material',size:25,color:ANDROID_GRAY,name:'search'};var defaultCancelIcon={type:'material',size:25,color:ANDROID_GRAY,name:'arrow-back'};var defaultClearIcon={type:'material',size:25,color:ANDROID_GRAY,name:'clear'};var SearchBar=function(_Component){_inherits(SearchBar,_Component);function SearchBar(props){_classCallCheck(this,SearchBar);var _this=_possibleConstructorReturn(this,(SearchBar.__proto__||Object.getPrototypeOf(SearchBar)).call(this,props));_this.focus=function(){_this.input.focus();};_this.blur=function(){_this.input.blur();};_this.clear=function(){_this.input.clear();_this.onChangeText('');_this.props.onClear();};_this.cancel=function(){_this.blur();_this.props.onCancel();};_this.onFocus=function(){_this.props.onFocus();_this.setState({hasFocus:true});};_this.onBlur=function(){_this.props.onBlur();_this.setState({hasFocus:false});};_this.onChangeText=function(text){_this.props.onChangeText(text);_this.setState({isEmpty:text===''});};var value=props.value;_this.state={hasFocus:false,isEmpty:value?value==='':true};return _this;}_createClass(SearchBar,[{key:'render',value:function render(){var _this2=this;var _props=this.props,clearIcon=_props.clearIcon,containerStyle=_props.containerStyle,leftIconContainerStyle=_props.leftIconContainerStyle,rightIconContainerStyle=_props.rightIconContainerStyle,inputContainerStyle=_props.inputContainerStyle,inputStyle=_props.inputStyle,searchIcon=_props.searchIcon,cancelIcon=_props.cancelIcon,showLoading=_props.showLoading,loadingProps=_props.loadingProps,attributes=_objectWithoutProperties(_props,['clearIcon','containerStyle','leftIconContainerStyle','rightIconContainerStyle','inputContainerStyle','inputStyle','searchIcon','cancelIcon','showLoading','loadingProps']);var _state=this.state,hasFocus=_state.hasFocus,isEmpty=_state.isEmpty;var loadingStyle=loadingProps.style,otherLoadingProps=_objectWithoutProperties(loadingProps,['style']);return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.container,containerStyle]),__source:{fileName:_jsxFileName,lineNumber:96}},_react2.default.createElement(_Input2.default,_extends({},attributes,{testID:'searchInput',onFocus:this.onFocus,onBlur:this.onBlur,onChangeText:this.onChangeText,ref:function ref(input){_this2.input=input;},containerStyle:{paddingHorizontal:0},inputStyle:_reactNative.StyleSheet.flatten([styles.input,inputStyle]),inputContainerStyle:_reactNative.StyleSheet.flatten([styles.inputContainer,inputContainerStyle]),leftIcon:hasFocus?(0,_helpers.renderNode)(_Icon2.default,cancelIcon,_extends({},defaultCancelIcon,{onPress:this.cancel})):(0,_helpers.renderNode)(_Icon2.default,searchIcon,defaultSearchIcon),leftIconContainerStyle:_reactNative.StyleSheet.flatten([styles.leftIconContainerStyle,leftIconContainerStyle]),rightIcon:_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'},__source:{fileName:_jsxFileName,lineNumber:125}},showLoading&&_react2.default.createElement(_reactNative.ActivityIndicator,_extends({key:'loading',style:_reactNative.StyleSheet.flatten([{marginRight:5},loadingStyle])},otherLoadingProps,{__source:{fileName:_jsxFileName,lineNumber:127}})),!isEmpty&&(0,_helpers.renderNode)(_Icon2.default,clearIcon,_extends({},defaultClearIcon,{key:'cancel',onPress:this.clear}))),rightIconContainerStyle:_reactNative.StyleSheet.flatten([styles.rightIconContainerStyle,rightIconContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:97}})));}}]);return SearchBar;}(_react.Component);SearchBar.propTypes={value:_propTypes2.default.string,clearIcon:_helpers.nodeType,searchIcon:_helpers.nodeType,cancelIcon:_helpers.nodeType,loadingProps:_propTypes2.default.object,showLoading:_propTypes2.default.bool,containerStyle:_config.ViewPropTypes.style,leftIconContainerStyle:_config.ViewPropTypes.style,rightIconContainerStyle:_config.ViewPropTypes.style,inputContainerStyle:_config.ViewPropTypes.style,inputStyle:_reactNative.Text.propTypes.style,onClear:_propTypes2.default.func,onCancel:_propTypes2.default.func,onFocus:_propTypes2.default.func,onBlur:_propTypes2.default.func,onChangeText:_propTypes2.default.func};SearchBar.defaultProps={value:'',loadingProps:{},showLoading:false,onClear:function onClear(){return null;},onCancel:function onCancel(){return null;},onFocus:function onFocus(){return null;},onBlur:function onBlur(){return null;},onChangeText:function onChangeText(){return null;},searchIcon:defaultSearchIcon,clearIcon:defaultClearIcon,cancelIcon:defaultCancelIcon};var styles=_reactNative.StyleSheet.create({container:{backgroundColor:'white',paddingTop:8,paddingBottom:8},input:{marginLeft:24,marginRight:8},inputContainer:{borderBottomWidth:0,width:'100%'},rightIconContainerStyle:{marginRight:8},leftIconContainerStyle:{marginLeft:8}});exports.default=SearchBar;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/searchbar/SearchBar-default.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Input=__webpack_require__(8);var _Input2=_interopRequireDefault(_Input);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var defaultSearchIcon=function defaultSearchIcon(theme){return{type:'material',size:18,name:'search',color:theme.colors.grey3};};var defaultClearIcon=function defaultClearIcon(theme){return{type:'material',size:18,name:'clear',color:theme.colors.grey3};};var SearchBar=function(_React$Component){_inherits(SearchBar,_React$Component);function SearchBar(props){_classCallCheck(this,SearchBar);var _this=_possibleConstructorReturn(this,(SearchBar.__proto__||Object.getPrototypeOf(SearchBar)).call(this,props));_this.focus=function(){_this.input.focus();};_this.blur=function(){_this.input.blur();};_this.clear=function(){_this.input.clear();_this.onChangeText('');_this.props.onClear();};_this.onFocus=function(){_this.props.onFocus();};_this.onBlur=function(){_this.props.onBlur();};_this.onChangeText=function(text){_this.props.onChangeText(text);_this.setState({isEmpty:text===''});};var value=props.value;_this.state={isEmpty:value?value==='':true};return _this;}_createClass(SearchBar,[{key:'render',value:function render(){var _this2=this;var _props=this.props,theme=_props.theme,rest=_objectWithoutProperties(_props,['theme']);var lightTheme=rest.lightTheme,round=rest.round,_rest$clearIcon=rest.clearIcon,clearIcon=_rest$clearIcon===undefined?defaultClearIcon(theme):_rest$clearIcon,containerStyle=rest.containerStyle,_rest$searchIcon=rest.searchIcon,searchIcon=_rest$searchIcon===undefined?defaultSearchIcon(theme):_rest$searchIcon,leftIconContainerStyle=rest.leftIconContainerStyle,rightIconContainerStyle=rest.rightIconContainerStyle,inputContainerStyle=rest.inputContainerStyle,inputStyle=rest.inputStyle,showLoading=rest.showLoading,loadingProps=rest.loadingProps,_rest$placeholderText=rest.placeholderTextColor,placeholderTextColor=_rest$placeholderText===undefined?theme.colors.grey3:_rest$placeholderText,attributes=_objectWithoutProperties(rest,['lightTheme','round','clearIcon','containerStyle','searchIcon','leftIconContainerStyle','rightIconContainerStyle','inputContainerStyle','inputStyle','showLoading','loadingProps','placeholderTextColor']);var isEmpty=this.state.isEmpty;var loadingStyle=loadingProps.style,otherLoadingProps=_objectWithoutProperties(loadingProps,['style']);return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.container(theme),lightTheme&&styles.containerLight(theme),containerStyle]),__source:{fileName:_jsxFileName,lineNumber:84}},_react2.default.createElement(_Input2.default,_extends({},attributes,{testID:'searchInput',onFocus:this.onFocus,onBlur:this.onBlur,onChangeText:this.onChangeText,ref:function ref(input){_this2.input=input;},placeholderTextColor:placeholderTextColor,inputStyle:_reactNative.StyleSheet.flatten([styles.inputStyle(theme),inputStyle]),inputContainerStyle:_reactNative.StyleSheet.flatten([styles.inputContentContainer(theme),lightTheme&&styles.inputContentContainerLight(theme),round&&styles.round,inputContainerStyle]),containerStyle:styles.inputContainer,leftIcon:(0,_helpers.renderNode)(_Icon2.default,searchIcon,defaultSearchIcon(theme)),leftIconContainerStyle:_reactNative.StyleSheet.flatten([styles.leftIconContainerStyle,leftIconContainerStyle]),rightIcon:_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'},__source:{fileName:_jsxFileName,lineNumber:118}},showLoading&&_react2.default.createElement(_reactNative.ActivityIndicator,_extends({key:'loading',style:_reactNative.StyleSheet.flatten([{marginRight:5},loadingStyle])},otherLoadingProps,{__source:{fileName:_jsxFileName,lineNumber:120}})),!isEmpty&&(0,_helpers.renderNode)(_Icon2.default,clearIcon,_extends({},defaultClearIcon(theme),{key:'cancel',onPress:this.clear}))),rightIconContainerStyle:_reactNative.StyleSheet.flatten([styles.rightIconContainerStyle,rightIconContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:91}})));}}]);return SearchBar;}(_react2.default.Component);SearchBar.propTypes={value:_propTypes2.default.string,clearIcon:_helpers.nodeType,searchIcon:_helpers.nodeType,loadingProps:_propTypes2.default.object,showLoading:_propTypes2.default.bool,containerStyle:_config.ViewPropTypes.style,leftIconContainerStyle:_config.ViewPropTypes.style,rightIconContainerStyle:_config.ViewPropTypes.style,inputContainerStyle:_config.ViewPropTypes.style,inputStyle:_reactNative.Text.propTypes.style,onClear:_propTypes2.default.func,onFocus:_propTypes2.default.func,onBlur:_propTypes2.default.func,onChangeText:_propTypes2.default.func,placeholderTextColor:_propTypes2.default.string,lightTheme:_propTypes2.default.bool,round:_propTypes2.default.bool,theme:_propTypes2.default.object};SearchBar.defaultProps={value:'',loadingProps:{},showLoading:false,lightTheme:false,round:false,onClear:function onClear(){return null;},onFocus:function onFocus(){return null;},onBlur:function onBlur(){return null;},onChangeText:function onChangeText(){return null;}};var styles={container:function container(theme){return{borderTopWidth:1,borderBottomWidth:1,borderBottomColor:'#000',borderTopColor:'#000',padding:8,backgroundColor:theme.colors.grey0};},rightIconContainerStyle:{marginRight:8},leftIconContainerStyle:{marginLeft:8},containerLight:function containerLight(theme){return{borderTopColor:'#e1e1e1',borderBottomColor:'#e1e1e1',backgroundColor:theme.colors.grey5};},inputContainer:{paddingHorizontal:0},inputStyle:function inputStyle(theme){return{color:theme.colors.grey3,marginLeft:10};},inputContentContainer:function inputContentContainer(theme){return{borderBottomWidth:0,borderRadius:3,overflow:'hidden',minHeight:30,backgroundColor:theme.colors.searchBg};},inputContentContainerLight:function inputContentContainerLight(theme){return{backgroundColor:theme.colors.grey4};},round:{borderRadius:15}};exports.default=SearchBar;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/searchbar/SearchBar-ios.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _reactNative=__webpack_require__(1);var _ViewPropTypes=__webpack_require__(12);var _ViewPropTypes2=_interopRequireDefault(_ViewPropTypes);var _Input=__webpack_require__(8);var _Input2=_interopRequireDefault(_Input);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);var _helpers=__webpack_require__(4);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var IOS_GRAY='#7d7d7d';var defaultSearchIcon={type:'ionicon',size:20,name:'ios-search',color:IOS_GRAY};var defaultClearIcon={type:'ionicon',name:'ios-close-circle',size:20,color:IOS_GRAY};var SearchBar=function(_Component){_inherits(SearchBar,_Component);function SearchBar(props){_classCallCheck(this,SearchBar);var _this=_possibleConstructorReturn(this,(SearchBar.__proto__||Object.getPrototypeOf(SearchBar)).call(this,props));_this.focus=function(){_this.input.focus();};_this.blur=function(){_this.input.blur();};_this.clear=function(){_this.input.clear();_this.onChangeText('');_this.props.onClear();};_this.cancel=function(){_this.blur();_this.props.onCancel();};_this.onFocus=function(){_this.props.onFocus();_reactNative.UIManager.configureNextLayoutAnimation&&_reactNative.LayoutAnimation.easeInEaseOut();_this.setState({hasFocus:true});};_this.onBlur=function(){_this.props.onBlur();_reactNative.UIManager.configureNextLayoutAnimation&&_reactNative.LayoutAnimation.easeInEaseOut();_this.setState({hasFocus:false});};_this.onChangeText=function(text){_this.props.onChangeText(text);_this.setState({isEmpty:text===''});};var value=props.value;_this.state={hasFocus:false,isEmpty:value?value==='':true,cancelButtonWidth:null};return _this;}_createClass(SearchBar,[{key:'render',value:function render(){var _this2=this;var _props=this.props,cancelButtonProps=_props.cancelButtonProps,cancelButtonTitle=_props.cancelButtonTitle,clearIcon=_props.clearIcon,containerStyle=_props.containerStyle,leftIconContainerStyle=_props.leftIconContainerStyle,rightIconContainerStyle=_props.rightIconContainerStyle,inputContainerStyle=_props.inputContainerStyle,inputStyle=_props.inputStyle,placeholderTextColor=_props.placeholderTextColor,showLoading=_props.showLoading,loadingProps=_props.loadingProps,searchIcon=_props.searchIcon,attributes=_objectWithoutProperties(_props,['cancelButtonProps','cancelButtonTitle','clearIcon','containerStyle','leftIconContainerStyle','rightIconContainerStyle','inputContainerStyle','inputStyle','placeholderTextColor','showLoading','loadingProps','searchIcon']);var _state=this.state,hasFocus=_state.hasFocus,isEmpty=_state.isEmpty;var loadingStyle=loadingProps.style,otherLoadingProps=_objectWithoutProperties(loadingProps,['style']);var buttonStyle=cancelButtonProps.buttonStyle,buttonTextStyle=cancelButtonProps.buttonTextStyle,buttonColor=cancelButtonProps.color,buttonDisabled=cancelButtonProps.disabled,buttonDisabledStyle=cancelButtonProps.buttonDisabledStyle,buttonDisabledTextStyle=cancelButtonProps.buttonDisabledTextStyle,otherCancelButtonProps=_objectWithoutProperties(cancelButtonProps,['buttonStyle','buttonTextStyle','color','disabled','buttonDisabledStyle','buttonDisabledTextStyle']);return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.container,containerStyle]),__source:{fileName:_jsxFileName,lineNumber:117}},_react2.default.createElement(_Input2.default,_extends({},attributes,{testID:'searchInput',onFocus:this.onFocus,onBlur:this.onBlur,onChangeText:this.onChangeText,ref:function ref(input){_this2.input=input;},inputStyle:_reactNative.StyleSheet.flatten([styles.input,inputStyle]),containerStyle:{paddingHorizontal:0},inputContainerStyle:_reactNative.StyleSheet.flatten([styles.inputContainer,hasFocus&&{marginRight:this.state.cancelButtonWidth},inputContainerStyle]),leftIcon:(0,_helpers.renderNode)(_Icon2.default,searchIcon,defaultSearchIcon),leftIconContainerStyle:_reactNative.StyleSheet.flatten([styles.leftIconContainerStyle,leftIconContainerStyle]),placeholderTextColor:placeholderTextColor,rightIcon:_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'},__source:{fileName:_jsxFileName,lineNumber:143}},showLoading&&_react2.default.createElement(_reactNative.ActivityIndicator,_extends({key:'loading',style:_reactNative.StyleSheet.flatten([{marginRight:5},loadingStyle])},otherLoadingProps,{__source:{fileName:_jsxFileName,lineNumber:145}})),!isEmpty&&(0,_helpers.renderNode)(_Icon2.default,clearIcon,_extends({},defaultClearIcon,{key:'cancel',onPress:this.clear}))),rightIconContainerStyle:_reactNative.StyleSheet.flatten([styles.rightIconContainerStyle,rightIconContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:118}})),_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.cancelButtonContainer,{opacity:this.state.cancelButtonWidth===null?0:1,right:hasFocus?0:-this.state.cancelButtonWidth}]),onLayout:function onLayout(event){return _this2.setState({cancelButtonWidth:event.nativeEvent.layout.width});},__source:{fileName:_jsxFileName,lineNumber:165}},_react2.default.createElement(_reactNative.TouchableOpacity,_extends({accessibilityRole:'button',onPress:this.cancel,disabled:buttonDisabled},otherCancelButtonProps,{__source:{fileName:_jsxFileName,lineNumber:177}}),_react2.default.createElement(_reactNative.View,{style:[buttonStyle,buttonDisabled&&buttonDisabledStyle],__source:{fileName:_jsxFileName,lineNumber:183}},_react2.default.createElement(_reactNative.Text,{style:[styles.buttonTextStyle,buttonColor&&{color:buttonColor},buttonTextStyle,buttonDisabled&&(buttonDisabledTextStyle||styles.buttonTextDisabled)],disabled:buttonDisabled,__source:{fileName:_jsxFileName,lineNumber:184}},cancelButtonTitle)))));}}]);return SearchBar;}(_react.Component);SearchBar.propTypes={value:_propTypes2.default.string,cancelButtonProps:_propTypes2.default.object,cancelButtonTitle:_propTypes2.default.string,clearIcon:_helpers.nodeType,searchIcon:_helpers.nodeType,loadingProps:_propTypes2.default.object,showLoading:_propTypes2.default.bool,onClear:_propTypes2.default.func,onCancel:_propTypes2.default.func,onFocus:_propTypes2.default.func,onBlur:_propTypes2.default.func,onChangeText:_propTypes2.default.func,containerStyle:_ViewPropTypes2.default.style,leftIconContainerStyle:_ViewPropTypes2.default.style,rightIconContainerStyle:_ViewPropTypes2.default.style,inputContainerStyle:_ViewPropTypes2.default.style,inputStyle:_reactNative.Text.propTypes.style,placeholderTextColor:_propTypes2.default.string};SearchBar.defaultProps={value:'',cancelButtonTitle:'Cancel',loadingProps:{},cancelButtonProps:{},showLoading:false,onClear:function onClear(){return null;},onCancel:function onCancel(){return null;},onFocus:function onFocus(){return null;},onBlur:function onBlur(){return null;},onChangeText:function onChangeText(){return null;},placeholderTextColor:IOS_GRAY,searchIcon:defaultSearchIcon,clearIcon:defaultClearIcon};var styles=_reactNative.StyleSheet.create({container:{backgroundColor:'#f5f5f5',paddingBottom:13,paddingTop:13,flexDirection:'row',overflow:'hidden',alignItems:'center'},input:{marginLeft:6},inputContainer:{borderBottomWidth:0,backgroundColor:'#dcdce1',borderRadius:9,minHeight:36,marginLeft:8,marginRight:8},rightIconContainerStyle:{marginRight:8},leftIconContainerStyle:{marginLeft:8},buttonTextStyle:{color:'#007aff',textAlign:'center',padding:8,fontSize:18},buttonTextDisabled:{color:'#cdcdcd'},cancelButtonContainer:{position:'absolute'}});exports.default=SearchBar;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.FeaturedTile=undefined;var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/tile/FeaturedTile.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _config=__webpack_require__(3);var _helpers=__webpack_require__(4);var _Text=__webpack_require__(6);var _Text2=_interopRequireDefault(_Text);var _Icon=__webpack_require__(5);var _Icon2=_interopRequireDefault(_Icon);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var renderText=function renderText(content,defaultProps,style){return(0,_helpers.renderNode)(_Text2.default,content,_extends({},defaultProps,{style:_reactNative.StyleSheet.flatten([style,defaultProps&&defaultProps.style])}));};var FeaturedTile=function FeaturedTile(props){var title=props.title,icon=props.icon,caption=props.caption,imageSrc=props.imageSrc,containerStyle=props.containerStyle,imageContainerStyle=props.imageContainerStyle,overlayContainerStyle=props.overlayContainerStyle,iconContainerStyle=props.iconContainerStyle,titleStyle=props.titleStyle,captionStyle=props.captionStyle,ImageComponent=props.ImageComponent,attributes=_objectWithoutProperties(props,['title','icon','caption','imageSrc','containerStyle','imageContainerStyle','overlayContainerStyle','iconContainerStyle','titleStyle','captionStyle','ImageComponent']);var _props$width=props.width,width=_props$width===undefined?_reactNative.Dimensions.get('window').width:_props$width,_props$height=props.height,height=_props$height===undefined?width*0.8:_props$height;var styles=_reactNative.StyleSheet.create({container:{width:width,height:height},imageContainer:{alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff',width:width,height:height},overlayContainer:{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.2)',alignSelf:'stretch',justifyContent:'center',paddingLeft:25,paddingRight:25,paddingTop:45,paddingBottom:40,position:'absolute',top:0,left:0,right:0,bottom:0},text:{color:'#ffffff',backgroundColor:'rgba(0,0,0,0)',marginBottom:15,textAlign:'center'},iconContainer:{justifyContent:'center',alignItems:'center',alignSelf:'center'}});return _react2.default.createElement(_reactNative.TouchableOpacity,_extends({},attributes,{style:_reactNative.StyleSheet.flatten([styles.container,containerStyle&&containerStyle]),__source:{fileName:_jsxFileName,lineNumber:87}}),_react2.default.createElement(ImageComponent,{source:imageSrc,style:_reactNative.StyleSheet.flatten([styles.imageContainer,imageContainerStyle&&imageContainerStyle]),resizeMode:'cover',__source:{fileName:_jsxFileName,lineNumber:94}},_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.overlayContainer,overlayContainerStyle&&overlayContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:102}},_react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.iconContainer,iconContainerStyle&&iconContainerStyle]),__source:{fileName:_jsxFileName,lineNumber:108}},icon&&_react2.default.createElement(_Icon2.default,_extends({},icon,{__source:{fileName:_jsxFileName,lineNumber:114}}))),_react2.default.createElement(_Text2.default,{testID:'featuredTileTitle',h4:true,style:_reactNative.StyleSheet.flatten([styles.text,titleStyle&&titleStyle]),__source:{fileName:_jsxFileName,lineNumber:116}},title),renderText(caption,{style:captionStyle},styles.text))));};FeaturedTile.propTypes={title:_propTypes2.default.string,icon:_propTypes2.default.object,caption:_propTypes2.default.node,imageSrc:_reactNative.Image.propTypes.source,onPress:_propTypes2.default.func,containerStyle:_config.ViewPropTypes.style,iconContainerStyle:_config.ViewPropTypes.style,imageContainerStyle:_config.ViewPropTypes.style,overlayContainerStyle:_config.ViewPropTypes.style,titleStyle:_reactNative.Text.propTypes.style,captionStyle:_reactNative.Text.propTypes.style,width:_propTypes2.default.number,height:_propTypes2.default.number,ImageComponent:_propTypes2.default.oneOfType([_propTypes2.default.func,_propTypes2.default.object])};FeaturedTile.defaultProps={ImageComponent:_config.BackgroundImage};exports.FeaturedTile=FeaturedTile;exports.default=(0,_config.withTheme)(FeaturedTile,'FeaturedTile');

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='/Users/kyleroach/Developer/react-native-elements/src/tooltip/Triangle.js';var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__(2);var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=__webpack_require__(1);var _ViewPropTypes=__webpack_require__(12);var _ViewPropTypes2=_interopRequireDefault(_ViewPropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Triangle=function Triangle(_ref){var style=_ref.style,isDown=_ref.isDown;return _react2.default.createElement(_reactNative.View,{style:_reactNative.StyleSheet.flatten([styles.triangle,style,isDown?styles.down:{}]),__source:{fileName:_jsxFileName,lineNumber:8}});};Triangle.propTypes={style:_ViewPropTypes2.default.style,isDown:_propTypes2.default.bool};var styles=_reactNative.StyleSheet.create({down:{transform:[{rotate:'180deg'}]},triangle:{width:0,height:0,backgroundColor:'transparent',borderStyle:'solid',borderLeftWidth:8,borderRightWidth:8,borderBottomWidth:15,borderLeftColor:'transparent',borderRightColor:'transparent',borderBottomColor:'white'}});exports.default=Triangle;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});var getArea=function getArea(a,b){return a*b;};var getPointDistance=function getPointDistance(a,b){return Math.sqrt((a[0]-b[0])**2+(a[1]-b[1])**2);};var getElementVisibleWidth=exports.getElementVisibleWidth=function getElementVisibleWidth(elementWidth,xOffset,ScreenWidth){if(xOffset>=0){return xOffset+elementWidth<=ScreenWidth?elementWidth:ScreenWidth-xOffset;}return elementWidth-xOffset;};var getTooltipCoordinate=function getTooltipCoordinate(x,y,width,height,ScreenWidth,ScreenHeight,tooltipWidth,tooltipHeight,withPointer){var center=[x+getElementVisibleWidth(width,x,ScreenWidth)/2,y+height/2];var pOne=[center[0],0];var pTwo=[ScreenWidth,center[1]];var pThree=[center[0],ScreenHeight];var pFour=[0,center[1]];var vOne=getPointDistance(center,pOne);var vTwo=getPointDistance(center,pTwo);var vThree=getPointDistance(center,pThree);var vFour=getPointDistance(center,pFour);var areas=[getArea(vOne,vFour),getArea(vOne,vTwo),getArea(vTwo,vThree),getArea(vThree,vFour)].map(function(each,index){return{area:each,id:index};});var sortedArea=areas.sort(function(a,b){return b.area-a.area;});var dX=0.001;var dY=height/2;var directionCorrection=[[-1,-1],[1,-1],[1,1],[-1,1]];var deslocateReferencePoint=[[-tooltipWidth,-tooltipHeight],[0,-tooltipHeight],[0,0],[-tooltipWidth,0]];var qIndex=sortedArea[0].id;var getWithPointerOffsetY=function getWithPointerOffsetY(){return withPointer?10*directionCorrection[qIndex][1]:0;};var getWithPointerOffsetX=function getWithPointerOffsetX(){return withPointer?center[0]-18*directionCorrection[qIndex][0]:center[0];};var newX=getWithPointerOffsetX()+(dX*directionCorrection[qIndex][0]+deslocateReferencePoint[qIndex][0]);return{x:constraintX(newX,qIndex,center[0],ScreenWidth,tooltipWidth),y:center[1]+(dY*directionCorrection[qIndex][1]+deslocateReferencePoint[qIndex][1])+getWithPointerOffsetY()};};var constraintX=function constraintX(newX,qIndex,x,ScreenWidth,tooltipWidth){switch(qIndex){case 0:case 3:{var maxWidth=newX>ScreenWidth?ScreenWidth-10:newX;return newX<1?10:maxWidth;}case 1:case 2:{var leftOverSpace=ScreenWidth-newX;return leftOverSpace>=tooltipWidth?newX:newX-(tooltipWidth-leftOverSpace+10);}default:{return 0;}}};exports.default=getTooltipCoordinate;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(56);
var swizzle = __webpack_require__(74);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colorString = __webpack_require__(55);
var convert = __webpack_require__(58);

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (typeof obj === 'undefined') {
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(25);
var route = __webpack_require__(59);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(25);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(67);
var React = __webpack_require__(0);
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = TYPE_STATICS[targetComponent['$$typeof']] || REACT_STATICS;
        var sourceStatics = TYPE_STATICS[sourceComponent['$$typeof']] || REACT_STATICS;

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(15);
  var warning = __webpack_require__(27);
  var ReactPropTypesSecret = __webpack_require__(28);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(14);
var invariant = __webpack_require__(15);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(14);
var invariant = __webpack_require__(15);
var warning = __webpack_require__(27);

var ReactPropTypesSecret = __webpack_require__(28);
var checkPropTypes = __webpack_require__(62);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.3.2
 * react-is.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;


var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol['for']('react.strict_mode') : 0xeacc;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol['for']('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol['for']('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol['for']('react.async_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol['for']('react.forward_ref') : 0xead0;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_STRICT_MODE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Portal = REACT_PORTAL_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;

function isAsyncMode(object) {
  return typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Portal = Portal;
exports.StrictMode = StrictMode;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isPortal = isPortal;
exports.isStrictMode = isStrictMode;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.3.2
 * react-is.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});var b="function"===typeof Symbol&&Symbol["for"],c=b?Symbol["for"]("react.element"):60103,d=b?Symbol["for"]("react.portal"):60106,e=b?Symbol["for"]("react.fragment"):60107,f=b?Symbol["for"]("react.strict_mode"):60108,g=b?Symbol["for"]("react.provider"):60109,h=b?Symbol["for"]("react.context"):60110,k=b?Symbol["for"]("react.async_mode"):60111,l=b?Symbol["for"]("react.forward_ref"):60112;
function m(a){if("object"===typeof a&&null!==a){var n=a.$$typeof;switch(n){case c:switch(a=a.type,a){case k:case e:case f:return a;default:switch(a=a&&a.$$typeof,a){case h:case l:case g:return a;default:return n}}case d:return n}}}exports.typeOf=m;exports.AsyncMode=k;exports.ContextConsumer=h;exports.ContextProvider=g;exports.Element=c;exports.ForwardRef=l;exports.Fragment=e;exports.Portal=d;exports.StrictMode=f;
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===k||a===f||"object"===typeof a&&null!==a&&(a.$$typeof===g||a.$$typeof===h||a.$$typeof===l)};exports.isAsyncMode=function(a){return m(a)===k};exports.isContextConsumer=function(a){return m(a)===h};exports.isContextProvider=function(a){return m(a)===g};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return m(a)===l};
exports.isFragment=function(a){return m(a)===e};exports.isPortal=function(a){return m(a)===d};exports.isStrictMode=function(a){return m(a)===f};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(66);
} else {
  module.exports = __webpack_require__(65);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 68 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kyleroach/Developer/react-native-elements/node_modules/react-native-ratings/src/SwipeRating.js Unexpected token (41:22)\nYou may need an appropriate loader to handle this file type.\n| \n| export default class SwipeRating extends Component {\n|   static defaultProps = {\n|     type: 'star',\n|     ratingImage: require('./images/star.png'),");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kyleroach/Developer/react-native-elements/node_modules/react-native-ratings/src/TapRating.js Unexpected token (11:22)\nYou may need an appropriate loader to handle this file type.\n| \n| export default class TapRating extends Component {\n|   static defaultProps = {\n|     defaultRating: 3,\n|     reviews: [\"Terrible\", \"Bad\", \"Okay\", \"Good\", \"Great\"],");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kyleroach/Developer/react-native-elements/node_modules/react-native-status-bar-height/index.js Unexpected token (18:46)\nYou may need an appropriate loader to handle this file type.\n| }\n| \n| export function getStatusBarHeight(skipAndroid: boolean = false): number {\n|     return Platform.select({\n|         ios: isIPhoneX ? 44 : 20,");

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_create_icon_set__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_create_icon_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_create_icon_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__glyphmaps_AntDesign_json__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__glyphmaps_AntDesign_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__glyphmaps_AntDesign_json__);
/**
 * AntDesign icon set component.
 * Usage: <AntDesign name="icon-name" size={20} color="#4F8EF7" />
 */




const iconSet = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_create_icon_set__["default"])(__WEBPACK_IMPORTED_MODULE_1__glyphmaps_AntDesign_json___default.a, 'anticon', 'AntDesign.ttf');

/* harmony default export */ __webpack_exports__["default"] = (iconSet);

const Button = iconSet.Button;
/* harmony export (immutable) */ __webpack_exports__["Button"] = Button;

const TabBarItem = iconSet.TabBarItem;
/* harmony export (immutable) */ __webpack_exports__["TabBarItem"] = TabBarItem;

const TabBarItemIOS = iconSet.TabBarItemIOS;
/* harmony export (immutable) */ __webpack_exports__["TabBarItemIOS"] = TabBarItemIOS;

const ToolbarAndroid = iconSet.ToolbarAndroid;
/* harmony export (immutable) */ __webpack_exports__["ToolbarAndroid"] = ToolbarAndroid;

const getImageSource = iconSet.getImageSource;
/* harmony export (immutable) */ __webpack_exports__["getImageSource"] = getImageSource;




/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = {
	"stepforward": 58880,
	"stepbackward": 58881,
	"forward": 58882,
	"banckward": 58883,
	"caretright": 58884,
	"caretleft": 58885,
	"caretdown": 58886,
	"caretup": 58887,
	"rightcircle": 58888,
	"leftcircle": 58889,
	"upcircle": 58890,
	"downcircle": 58891,
	"rightcircleo": 58892,
	"leftcircleo": 58893,
	"upcircleo": 58894,
	"downcircleo": 58895,
	"verticleleft": 58896,
	"verticleright": 58897,
	"back": 58898,
	"retweet": 58899,
	"shrink": 58900,
	"arrowsalt": 58901,
	"doubleright": 58903,
	"doubleleft": 58904,
	"arrowdown": 58905,
	"arrowup": 58906,
	"arrowright": 58907,
	"arrowleft": 58908,
	"down": 58909,
	"up": 58910,
	"right": 58911,
	"left": 58912,
	"minussquareo": 58913,
	"minuscircle": 58914,
	"minuscircleo": 58915,
	"minus": 58916,
	"pluscircleo": 58917,
	"pluscircle": 58918,
	"plus": 58919,
	"infocirlce": 58920,
	"infocirlceo": 58921,
	"info": 58922,
	"exclamation": 58923,
	"exclamationcircle": 58924,
	"exclamationcircleo": 58925,
	"closecircle": 58926,
	"closecircleo": 58927,
	"checkcircle": 58928,
	"checkcircleo": 58929,
	"check": 58930,
	"close": 58931,
	"customerservice": 58932,
	"creditcard": 58933,
	"codesquareo": 58934,
	"book": 58935,
	"barschart": 58936,
	"bars": 58937,
	"question": 58938,
	"questioncircle": 58939,
	"questioncircleo": 58940,
	"pause": 58941,
	"pausecircle": 58942,
	"pausecircleo": 58943,
	"clockcircle": 58944,
	"clockcircleo": 58945,
	"swap": 58946,
	"swapleft": 58947,
	"swapright": 58948,
	"plussquareo": 58949,
	"frown": 58950,
	"menufold": 58968,
	"mail": 58969,
	"link": 58971,
	"areachart": 58972,
	"linechart": 58973,
	"home": 58974,
	"laptop": 58975,
	"star": 58976,
	"staro": 58977,
	"filter": 58979,
	"meho": 58982,
	"meh": 58983,
	"shoppingcart": 58984,
	"save": 58985,
	"user": 58986,
	"videocamera": 58987,
	"totop": 58988,
	"team": 58989,
	"sharealt": 58993,
	"setting": 58994,
	"picture": 58996,
	"phone": 58997,
	"paperclip": 58998,
	"notification": 58999,
	"menuunfold": 59001,
	"inbox": 59002,
	"lock": 59003,
	"qrcode": 59004,
	"tags": 59005,
	"tagso": 59006,
	"cloudo": 59007,
	"cloud": 59008,
	"cloudupload": 59009,
	"clouddownload": 59010,
	"clouddownloado": 59011,
	"clouduploado": 59012,
	"enviroment": 59013,
	"enviromento": 59014,
	"eye": 59015,
	"eyeo": 59016,
	"camera": 59017,
	"camerao": 59018,
	"windows": 59019,
	"export2": 59024,
	"export": 59025,
	"circledowno": 59027,
	"circledown": 59028,
	"hdd": 59034,
	"ie": 59035,
	"delete": 59039,
	"enter": 59040,
	"pushpino": 59041,
	"pushpin": 59042,
	"heart": 59043,
	"hearto": 59044,
	"smile-circle": 59047,
	"smileo": 59048,
	"frowno": 59049,
	"calculator": 59050,
	"chrome": 59052,
	"github": 59053,
	"iconfontdesktop": 59060,
	"caretcircleoup": 59061,
	"upload": 59062,
	"download": 59063,
	"piechart": 59064,
	"lock1": 59065,
	"unlock": 59066,
	"windowso": 59068,
	"dotchart": 59069,
	"barchart": 59070,
	"codesquare": 59071,
	"plussquare": 59072,
	"minussquare": 59073,
	"closesquare": 59074,
	"closesquareo": 59075,
	"checksquare": 59076,
	"checksquareo": 59077,
	"fastbackward": 59078,
	"fastforward": 59079,
	"upsquare": 59080,
	"downsquare": 59081,
	"leftsquare": 59082,
	"rightsquare": 59083,
	"rightsquareo": 59084,
	"leftsquareo": 59085,
	"down-square-o": 59086,
	"up-square-o": 59087,
	"play": 59088,
	"playcircleo": 59089,
	"tag": 59090,
	"tago": 59091,
	"addfile": 59664,
	"folder1": 58978,
	"file1": 58980,
	"switcher": 59667,
	"addfolder": 59668,
	"folderopen": 59033,
	"search1": 58992,
	"ellipsis1": 58951,
	"calendar": 59067,
	"filetext1": 59032,
	"copy1": 58952,
	"jpgfile1": 59036,
	"pdffile1": 59059,
	"exclefile1": 59056,
	"pptfile1": 59057,
	"unknowfile1": 59055,
	"wordfile1": 59058,
	"dingding": 59683,
	"dingding-o": 59685,
	"mobile1": 59000,
	"tablet1": 58990,
	"bells": 58958,
	"disconnect": 58959,
	"database": 58960,
	"barcode": 58962,
	"hourglass": 58963,
	"key": 58964,
	"flag": 58965,
	"layout": 58966,
	"printer": 58995,
	"USB": 59095,
	"skin": 59096,
	"tool": 59097,
	"car": 59100,
	"addusergroup": 59101,
	"carryout": 59103,
	"deleteuser": 59104,
	"deleteusergroup": 59105,
	"man": 59106,
	"isv": 59107,
	"gift": 59108,
	"idcard": 59109,
	"medicinebox": 59110,
	"redenvelopes": 59111,
	"rest": 59112,
	"Safety": 59114,
	"wallet": 59115,
	"woman": 59116,
	"adduser": 59117,
	"bank": 59118,
	"Trophy": 59119,
	"loading1": 59054,
	"loading2": 58957,
	"like2": 59037,
	"dislike2": 59038,
	"like1": 58956,
	"dislike1": 58955,
	"bulb1": 58953,
	"rocket1": 59663,
	"select1": 58954,
	"apple1": 59020,
	"apple-o": 59092,
	"android1": 59704,
	"android": 59021,
	"aliwangwang-o1": 59023,
	"aliwangwang": 59022,
	"pay-circle1": 59045,
	"pay-circle-o1": 59046,
	"poweroff": 59093,
	"trademark": 58961,
	"find": 59099,
	"copyright": 59102,
	"sound": 59113,
	"earth": 59121,
	"wifi": 59094,
	"sync": 59098,
	"login": 58967,
	"logout": 58970,
	"reload1": 58902,
	"message1": 59051,
	"shake": 59727,
	"API": 59729,
	"appstore-o": 59029,
	"appstore1": 59030,
	"scan1": 59031,
	"exception1": 58981,
	"contacts": 59120,
	"solution1": 58991,
	"fork": 59122,
	"edit": 59026,
	"form": 59798,
	"warning": 59799,
	"table": 59800,
	"profile": 59801,
	"dashboard": 59802,
	"indent-left": 59814,
	"indent-right": 59815,
	"menu-unfold": 59820,
	"menu-fold": 59821,
	"antdesign": 59826,
	"alipay-square": 59827,
	"codepen-circle": 59828,
	"google": 59829,
	"amazon": 59830,
	"codepen": 59831,
	"facebook-square": 59832,
	"dropbox": 59833,
	"googleplus": 59834,
	"linkedin-square": 59835,
	"medium-monogram": 59836,
	"gitlab": 59837,
	"medium-wordmark": 59838,
	"QQ": 59839,
	"skype": 59840,
	"taobao-square": 59841,
	"alipay-circle": 59842,
	"youtube": 59843,
	"wechat": 59844,
	"twitter": 59845,
	"weibo": 59846,
	"HTML": 59847,
	"taobao-circle": 59123,
	"weibo-circle": 59124,
	"weibo-square": 59125,
	"CodeSandbox": 59860,
	"aliyun": 59892,
	"zhihu": 59139,
	"behance": 59143,
	"dribbble": 59145,
	"dribbble-square": 59146,
	"behance-square": 59144,
	"file-markdown": 59140,
	"instagram": 59147,
	"yuque": 59148,
	"slack": 59141,
	"slack-square": 59142
};

/***/ }),
/* 73 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kyleroach/Developer/react-native-elements/node_modules/react-native-vector-icons/lib/create-icon-set.js Unexpected token (43:21)\nYou may need an appropriate loader to handle this file type.\n| \n|   class Icon extends PureComponent {\n|     static propTypes = {\n|       allowFontScaling: PropTypes.bool,\n|       name: IconNamePropType,");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(75);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/Entypo;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/EvilIcons;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/Feather;

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/Foundation;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/Ionicons;

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/MaterialCommunityIcons;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/MaterialIcons;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/Octicons;

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/SimpleLineIcons;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = react-native-vector-icons/Zocial;

/***/ })
/******/ ]);