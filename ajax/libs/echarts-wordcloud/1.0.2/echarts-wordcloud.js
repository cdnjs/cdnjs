(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("echarts"));
	else if(typeof define === 'function' && define.amd)
		define(["echarts"], factory);
	else if(typeof exports === 'object')
		exports["echarts-wordcloud"] = factory(require("echarts"));
	else
		root["echarts-wordcloud"] = factory(root["echarts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var echarts = __webpack_require__(2);
	var layoutUtil = __webpack_require__(3);

	__webpack_require__(11);
	__webpack_require__(13);

	var wordCloudLayoutHelper = __webpack_require__(14);

	if (!wordCloudLayoutHelper.isSupported) {
	    throw new Error('Sorry your browser not support wordCloud');
	}

	// https://github.com/timdream/wordcloud2.js/blob/c236bee60436e048949f9becc4f0f67bd832dc5c/index.js#L233
	function updateCanvasMask(maskCanvas) {
	    var ctx = maskCanvas.getContext('2d');
	    var imageData = ctx.getImageData(
	        0, 0, maskCanvas.width, maskCanvas.height);
	    var newImageData = ctx.createImageData(imageData);

	    for (var i = 0; i < imageData.data.length; i += 4) {
	        var tone = imageData.data[i] +
	            imageData.data[i + 1] +
	            imageData.data[i + 2];
	        var alpha = imageData.data[i + 3];

	        if (alpha < 128 || tone > 128 * 3) {
	            // Area not to draw
	            newImageData.data[i] = 0;
	            newImageData.data[i + 1] = 0;
	            newImageData.data[i + 2] = 0;
	            newImageData.data[i + 3] = 0;
	        }
	        else {
	            // Area to draw
	            // The color must be same with backgroundColor
	            newImageData.data[i] = 255;
	            newImageData.data[i + 1] = 255;
	            newImageData.data[i + 2] = 255;
	            newImageData.data[i + 3] = 255;
	        }
	    }

	    ctx.putImageData(newImageData, 0, 0);
	}

	echarts.registerLayout(function (ecModel, api) {
	    ecModel.eachSeriesByType('wordCloud', function (seriesModel) {
	        var gridRect = layoutUtil.getLayoutRect(
	            seriesModel.getBoxLayoutParams(), {
	                width: api.getWidth(),
	                height: api.getHeight()
	            }
	        );
	        var data = seriesModel.getData();

	        var canvas = document.createElement('canvas');
	        canvas.width = gridRect.width;
	        canvas.height = gridRect.height;

	        var ctx = canvas.getContext('2d');
	        var maskImage = seriesModel.get('maskImage');
	        if (maskImage) {
	            try {
	                ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
	                updateCanvasMask(canvas);
	            }
	            catch (e) {
	                console.error('Invalid mask image');
	                console.error(e.toString());
	            }
	        }

	        var sizeRange = seriesModel.get('sizeRange');
	        var rotationRange = seriesModel.get('rotationRange');
	        var valueExtent = data.getDataExtent('value');

	        var DEGREE_TO_RAD = Math.PI / 180;
	        var gridSize = seriesModel.get('gridSize');
	        wordCloudLayoutHelper(canvas, {
	            list: data.mapArray('value', function (value, idx) {
	                var itemModel = data.getItemModel(idx);
	                return [
	                    data.getName(idx),
	                    itemModel.get('textStyle.normal.textSize', true)
	                        || echarts.number.linearMap(value, valueExtent, sizeRange),
	                    idx
	                ];
	            }).sort(function (a, b) {
	                // Sort from large to small in case there is no more room for more words
	                return b[1] - a[1];
	            }),
	            fontFamily: seriesModel.get('textStyle.normal.fontFamily')
	                || seriesModel.get('textStyle.emphasis.fontFamily')
	                || ecModel.get('textStyle.fontFamily'),
	            fontWeight: seriesModel.get('textStyle.normal.fontWeight')
	                || seriesModel.get('textStyle.emphasis.fontWeight')
	                || ecModel.get('textStyle.fontWeight'),
	            gridSize: gridSize,

	            ellipticity: gridRect.height / gridRect.width,

	            minRotation: rotationRange[0] * DEGREE_TO_RAD,
	            maxRotation: rotationRange[1] * DEGREE_TO_RAD,

	            clearCanvas: !maskImage,

	            rotateRatio: 1,

	            rotationStep: seriesModel.get('rotationStep') * DEGREE_TO_RAD,

	            drawOutOfBound: false,

	            shuffle: false,

	            shape: seriesModel.get('shape')
	        });

	        canvas.addEventListener('wordclouddrawn', function (e) {
	            var item = e.detail.item;
	            if (e.detail.drawn && seriesModel.layoutInstance.ondraw) {
	                e.detail.drawn.gx += gridRect.x / gridSize;
	                e.detail.drawn.gy += gridRect.y / gridSize;
	                seriesModel.layoutInstance.ondraw(
	                    item[0], item[1], item[2], e.detail.drawn
	                );
	            }
	        });

	        seriesModel.layoutInstance = {
	            ondraw: null
	        };
	    });
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// Layout helpers for each component positioning


	    var zrUtil = __webpack_require__(4);
	    var BoundingRect = __webpack_require__(6);
	    var numberUtil = __webpack_require__(9);
	    var formatUtil = __webpack_require__(10);
	    var parsePercent = numberUtil.parsePercent;
	    var each = zrUtil.each;

	    var layout = {};

	    var LOCATION_PARAMS = ['left', 'right', 'top', 'bottom', 'width', 'height'];

	    function boxLayout(orient, group, gap, maxWidth, maxHeight) {
	        var x = 0;
	        var y = 0;
	        if (maxWidth == null) {
	            maxWidth = Infinity;
	        }
	        if (maxHeight == null) {
	            maxHeight = Infinity;
	        }
	        var currentLineMaxSize = 0;
	        group.eachChild(function (child, idx) {
	            var position = child.position;
	            var rect = child.getBoundingRect();
	            var nextChild = group.childAt(idx + 1);
	            var nextChildRect = nextChild && nextChild.getBoundingRect();
	            var nextX;
	            var nextY;
	            if (orient === 'horizontal') {
	                var moveX = rect.width + (nextChildRect ? (-nextChildRect.x + rect.x) : 0);
	                nextX = x + moveX;
	                // Wrap when width exceeds maxWidth or meet a `newline` group
	                if (nextX > maxWidth || child.newline) {
	                    x = 0;
	                    nextX = moveX;
	                    y += currentLineMaxSize + gap;
	                    currentLineMaxSize = rect.height;
	                }
	                else {
	                    currentLineMaxSize = Math.max(currentLineMaxSize, rect.height);
	                }
	            }
	            else {
	                var moveY = rect.height + (nextChildRect ? (-nextChildRect.y + rect.y) : 0);
	                nextY = y + moveY;
	                // Wrap when width exceeds maxHeight or meet a `newline` group
	                if (nextY > maxHeight || child.newline) {
	                    x += currentLineMaxSize + gap;
	                    y = 0;
	                    nextY = moveY;
	                    currentLineMaxSize = rect.width;
	                }
	                else {
	                    currentLineMaxSize = Math.max(currentLineMaxSize, rect.width);
	                }
	            }

	            if (child.newline) {
	                return;
	            }

	            position[0] = x;
	            position[1] = y;

	            orient === 'horizontal'
	                ? (x = nextX + gap)
	                : (y = nextY + gap);
	        });
	    }

	    /**
	     * VBox or HBox layouting
	     * @param {string} orient
	     * @param {module:zrender/container/Group} group
	     * @param {number} gap
	     * @param {number} [width=Infinity]
	     * @param {number} [height=Infinity]
	     */
	    layout.box = boxLayout;

	    /**
	     * VBox layouting
	     * @param {module:zrender/container/Group} group
	     * @param {number} gap
	     * @param {number} [width=Infinity]
	     * @param {number} [height=Infinity]
	     */
	    layout.vbox = zrUtil.curry(boxLayout, 'vertical');

	    /**
	     * HBox layouting
	     * @param {module:zrender/container/Group} group
	     * @param {number} gap
	     * @param {number} [width=Infinity]
	     * @param {number} [height=Infinity]
	     */
	    layout.hbox = zrUtil.curry(boxLayout, 'horizontal');

	    /**
	     * If x or x2 is not specified or 'center' 'left' 'right',
	     * the width would be as long as possible.
	     * If y or y2 is not specified or 'middle' 'top' 'bottom',
	     * the height would be as long as possible.
	     *
	     * @param {Object} positionInfo
	     * @param {number|string} [positionInfo.x]
	     * @param {number|string} [positionInfo.y]
	     * @param {number|string} [positionInfo.x2]
	     * @param {number|string} [positionInfo.y2]
	     * @param {Object} containerRect
	     * @param {string|number} margin
	     * @return {Object} {width, height}
	     */
	    layout.getAvailableSize = function (positionInfo, containerRect, margin) {
	        var containerWidth = containerRect.width;
	        var containerHeight = containerRect.height;

	        var x = parsePercent(positionInfo.x, containerWidth);
	        var y = parsePercent(positionInfo.y, containerHeight);
	        var x2 = parsePercent(positionInfo.x2, containerWidth);
	        var y2 = parsePercent(positionInfo.y2, containerHeight);

	        (isNaN(x) || isNaN(parseFloat(positionInfo.x))) && (x = 0);
	        (isNaN(x2) || isNaN(parseFloat(positionInfo.x2))) && (x2 = containerWidth);
	        (isNaN(y) || isNaN(parseFloat(positionInfo.y))) && (y = 0);
	        (isNaN(y2) || isNaN(parseFloat(positionInfo.y2))) && (y2 = containerHeight);

	        margin = formatUtil.normalizeCssArray(margin || 0);

	        return {
	            width: Math.max(x2 - x - margin[1] - margin[3], 0),
	            height: Math.max(y2 - y - margin[0] - margin[2], 0)
	        };
	    };

	    /**
	     * Parse position info.
	     *
	     * @param {Object} positionInfo
	     * @param {number|string} [positionInfo.left]
	     * @param {number|string} [positionInfo.top]
	     * @param {number|string} [positionInfo.right]
	     * @param {number|string} [positionInfo.bottom]
	     * @param {number|string} [positionInfo.width]
	     * @param {number|string} [positionInfo.height]
	     * @param {number|string} [positionInfo.aspect] Aspect is width / height
	     * @param {Object} containerRect
	     * @param {string|number} [margin]
	     *
	     * @return {module:zrender/core/BoundingRect}
	     */
	    layout.getLayoutRect = function (
	        positionInfo, containerRect, margin
	    ) {
	        margin = formatUtil.normalizeCssArray(margin || 0);

	        var containerWidth = containerRect.width;
	        var containerHeight = containerRect.height;

	        var left = parsePercent(positionInfo.left, containerWidth);
	        var top = parsePercent(positionInfo.top, containerHeight);
	        var right = parsePercent(positionInfo.right, containerWidth);
	        var bottom = parsePercent(positionInfo.bottom, containerHeight);
	        var width = parsePercent(positionInfo.width, containerWidth);
	        var height = parsePercent(positionInfo.height, containerHeight);

	        var verticalMargin = margin[2] + margin[0];
	        var horizontalMargin = margin[1] + margin[3];
	        var aspect = positionInfo.aspect;

	        // If width is not specified, calculate width from left and right
	        if (isNaN(width)) {
	            width = containerWidth - right - horizontalMargin - left;
	        }
	        if (isNaN(height)) {
	            height = containerHeight - bottom - verticalMargin - top;
	        }

	        // If width and height are not given
	        // 1. Graph should not exceeds the container
	        // 2. Aspect must be keeped
	        // 3. Graph should take the space as more as possible
	        if (isNaN(width) && isNaN(height)) {
	            if (aspect > containerWidth / containerHeight) {
	                width = containerWidth * 0.8;
	            }
	            else {
	                height = containerHeight * 0.8;
	            }
	        }

	        if (aspect != null) {
	            // Calculate width or height with given aspect
	            if (isNaN(width)) {
	                width = aspect * height;
	            }
	            if (isNaN(height)) {
	                height = width / aspect;
	            }
	        }

	        // If left is not specified, calculate left from right and width
	        if (isNaN(left)) {
	            left = containerWidth - right - width - horizontalMargin;
	        }
	        if (isNaN(top)) {
	            top = containerHeight - bottom - height - verticalMargin;
	        }

	        // Align left and top
	        switch (positionInfo.left || positionInfo.right) {
	            case 'center':
	                left = containerWidth / 2 - width / 2 - margin[3];
	                break;
	            case 'right':
	                left = containerWidth - width - horizontalMargin;
	                break;
	        }
	        switch (positionInfo.top || positionInfo.bottom) {
	            case 'middle':
	            case 'center':
	                top = containerHeight / 2 - height / 2 - margin[0];
	                break;
	            case 'bottom':
	                top = containerHeight - height - verticalMargin;
	                break;
	        }
	        // If something is wrong and left, top, width, height are calculated as NaN
	        left = left || 0;
	        top = top || 0;
	        if (isNaN(width)) {
	            // Width may be NaN if only one value is given except width
	            width = containerWidth - left - (right || 0);
	        }
	        if (isNaN(height)) {
	            // Height may be NaN if only one value is given except height
	            height = containerHeight - top - (bottom || 0);
	        }

	        var rect = new BoundingRect(left + margin[3], top + margin[0], width, height);
	        rect.margin = margin;
	        return rect;
	    };

	    /**
	     * Position group of component in viewport
	     *  Group position is specified by either
	     *  {left, top}, {right, bottom}
	     *  If all properties exists, right and bottom will be igonred.
	     *
	     * @param {module:zrender/container/Group} group
	     * @param {Object} positionInfo
	     * @param {number|string} [positionInfo.left]
	     * @param {number|string} [positionInfo.top]
	     * @param {number|string} [positionInfo.right]
	     * @param {number|string} [positionInfo.bottom]
	     * @param {Object} containerRect
	     * @param {string|number} margin
	     */
	    layout.positionGroup = function (
	        group, positionInfo, containerRect, margin
	    ) {
	        var groupRect = group.getBoundingRect();

	        positionInfo = zrUtil.extend(zrUtil.clone(positionInfo), {
	            width: groupRect.width,
	            height: groupRect.height
	        });

	        positionInfo = layout.getLayoutRect(
	            positionInfo, containerRect, margin
	        );

	        group.position = [
	            positionInfo.x - groupRect.x,
	            positionInfo.y - groupRect.y
	        ];
	    };

	    /**
	     * Consider Case:
	     * When defulat option has {left: 0, width: 100}, and we set {right: 0}
	     * through setOption or media query, using normal zrUtil.merge will cause
	     * {right: 0} does not take effect.
	     *
	     * @example
	     * ComponentModel.extend({
	     *     init: function () {
	     *         ...
	     *         var inputPositionParams = layout.getLayoutParams(option);
	     *         this.mergeOption(inputPositionParams);
	     *     },
	     *     mergeOption: function (newOption) {
	     *         newOption && zrUtil.merge(thisOption, newOption, true);
	     *         layout.mergeLayoutParam(thisOption, newOption);
	     *     }
	     * });
	     *
	     * @param {Object} targetOption
	     * @param {Object} newOption
	     * @param {Object|string} [opt]
	     * @param {boolean} [opt.ignoreSize=false] Some component must has width and height.
	     */
	    layout.mergeLayoutParam = function (targetOption, newOption, opt) {
	        !zrUtil.isObject(opt) && (opt = {});
	        var hNames = ['width', 'left', 'right']; // Order by priority.
	        var vNames = ['height', 'top', 'bottom']; // Order by priority.
	        var hResult = merge(hNames);
	        var vResult = merge(vNames);

	        copy(hNames, targetOption, hResult);
	        copy(vNames, targetOption, vResult);

	        function merge(names) {
	            var newParams = {};
	            var newValueCount = 0;
	            var merged = {};
	            var mergedValueCount = 0;
	            var enoughParamNumber = opt.ignoreSize ? 1 : 2;

	            each(names, function (name) {
	                merged[name] = targetOption[name];
	            });
	            each(names, function (name) {
	                // Consider case: newOption.width is null, which is
	                // set by user for removing width setting.
	                hasProp(newOption, name) && (newParams[name] = merged[name] = newOption[name]);
	                hasValue(newParams, name) && newValueCount++;
	                hasValue(merged, name) && mergedValueCount++;
	            });

	            // Case: newOption: {width: ..., right: ...},
	            // or targetOption: {right: ...} and newOption: {width: ...},
	            // There is no conflict when merged only has params count
	            // little than enoughParamNumber.
	            if (mergedValueCount === enoughParamNumber || !newValueCount) {
	                return merged;
	            }
	            // Case: newOption: {width: ..., right: ...},
	            // Than we can make sure user only want those two, and ignore
	            // all origin params in targetOption.
	            else if (newValueCount >= enoughParamNumber) {
	                return newParams;
	            }
	            else {
	                // Chose another param from targetOption by priority.
	                // When 'ignoreSize', enoughParamNumber is 1 and those will not happen.
	                for (var i = 0; i < names.length; i++) {
	                    var name = names[i];
	                    if (!hasProp(newParams, name) && hasProp(targetOption, name)) {
	                        newParams[name] = targetOption[name];
	                        break;
	                    }
	                }
	                return newParams;
	            }
	        }

	        function hasProp(obj, name) {
	            return obj.hasOwnProperty(name);
	        }

	        function hasValue(obj, name) {
	            return obj[name] != null && obj[name] !== 'auto';
	        }

	        function copy(names, target, source) {
	            each(names, function (name) {
	                target[name] = source[name];
	            });
	        }
	    };

	    /**
	     * Retrieve 'left', 'right', 'top', 'bottom', 'width', 'height' from object.
	     * @param {Object} source
	     * @return {Object} Result contains those props.
	     */
	    layout.getLayoutParams = function (source) {
	        return layout.copyLayoutParams({}, source);
	    };

	    /**
	     * Retrieve 'left', 'right', 'top', 'bottom', 'width', 'height' from object.
	     * @param {Object} source
	     * @return {Object} Result contains those props.
	     */
	    layout.copyLayoutParams = function (target, source) {
	        source && target && each(LOCATION_PARAMS, function (name) {
	            source.hasOwnProperty(name) && (target[name] = source[name]);
	        });
	        return target;
	    };

	    module.exports = layout;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module zrender/core/util
	 */

	    var Gradient = __webpack_require__(5);
	    // 用于处理merge时无法遍历Date等对象的问题
	    var BUILTIN_OBJECT = {
	        '[object Function]': 1,
	        '[object RegExp]': 1,
	        '[object Date]': 1,
	        '[object Error]': 1,
	        '[object CanvasGradient]': 1
	    };

	    var objToString = Object.prototype.toString;

	    var arrayProto = Array.prototype;
	    var nativeForEach = arrayProto.forEach;
	    var nativeFilter = arrayProto.filter;
	    var nativeSlice = arrayProto.slice;
	    var nativeMap = arrayProto.map;
	    var nativeReduce = arrayProto.reduce;

	    /**
	     * @param {*} source
	     * @return {*} 拷贝后的新对象
	     */
	    function clone(source) {
	        if (typeof source == 'object' && source !== null) {
	            var result = source;
	            if (source instanceof Array) {
	                result = [];
	                for (var i = 0, len = source.length; i < len; i++) {
	                    result[i] = clone(source[i]);
	                }
	            }
	            else if (
	                !isBuildInObject(source)
	                // 是否为 dom 对象
	                && !isDom(source)
	            ) {
	                result = {};
	                for (var key in source) {
	                    if (source.hasOwnProperty(key)) {
	                        result[key] = clone(source[key]);
	                    }
	                }
	            }

	            return result;
	        }

	        return source;
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {*} target
	     * @param {*} source
	     * @param {boolean} [overwrite=false]
	     */
	    function merge(target, source, overwrite) {
	        // We should escapse that source is string
	        // and enter for ... in ...
	        if (!isObject(source) || !isObject(target)) {
	            return overwrite ? clone(source) : target;
	        }

	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                var targetProp = target[key];
	                var sourceProp = source[key];

	                if (isObject(sourceProp)
	                    && isObject(targetProp)
	                    && !isArray(sourceProp)
	                    && !isArray(targetProp)
	                    && !isDom(sourceProp)
	                    && !isDom(targetProp)
	                    && !isBuildInObject(sourceProp)
	                    && !isBuildInObject(targetProp)
	                ) {
	                    // 如果需要递归覆盖，就递归调用merge
	                    merge(targetProp, sourceProp, overwrite);
	                }
	                else if (overwrite || !(key in target)) {
	                    // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
	                    // NOTE，在 target[key] 不存在的时候也是直接覆盖
	                    target[key] = clone(source[key], true);
	                }
	            }
	        }

	        return target;
	    }

	    /**
	     * @param {Array} targetAndSources The first item is target, and the rests are source.
	     * @param {boolean} [overwrite=false]
	     * @return {*} target
	     */
	    function mergeAll(targetAndSources, overwrite) {
	        var result = targetAndSources[0];
	        for (var i = 1, len = targetAndSources.length; i < len; i++) {
	            result = merge(result, targetAndSources[i], overwrite);
	        }
	        return result;
	    }

	    /**
	     * @param {*} target
	     * @param {*} source
	     * @memberOf module:zrender/core/util
	     */
	    function extend(target, source) {
	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key];
	            }
	        }
	        return target;
	    }

	    /**
	     * @param {*} target
	     * @param {*} source
	     * @param {boolen} [overlay=false]
	     * @memberOf module:zrender/core/util
	     */
	    function defaults(target, source, overlay) {
	        for (var key in source) {
	            if (source.hasOwnProperty(key)
	                && (overlay ? source[key] != null : target[key] == null)
	            ) {
	                target[key] = source[key];
	            }
	        }
	        return target;
	    }

	    function createCanvas() {
	        return document.createElement('canvas');
	    }
	    // FIXME
	    var _ctx;
	    function getContext() {
	        if (!_ctx) {
	            // Use util.createCanvas instead of createCanvas
	            // because createCanvas may be overwritten in different environment
	            _ctx = util.createCanvas().getContext('2d');
	        }
	        return _ctx;
	    }

	    /**
	     * 查询数组中元素的index
	     * @memberOf module:zrender/core/util
	     */
	    function indexOf(array, value) {
	        if (array) {
	            if (array.indexOf) {
	                return array.indexOf(value);
	            }
	            for (var i = 0, len = array.length; i < len; i++) {
	                if (array[i] === value) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    }

	    /**
	     * 构造类继承关系
	     *
	     * @memberOf module:zrender/core/util
	     * @param {Function} clazz 源类
	     * @param {Function} baseClazz 基类
	     */
	    function inherits(clazz, baseClazz) {
	        var clazzPrototype = clazz.prototype;
	        function F() {}
	        F.prototype = baseClazz.prototype;
	        clazz.prototype = new F();

	        for (var prop in clazzPrototype) {
	            clazz.prototype[prop] = clazzPrototype[prop];
	        }
	        clazz.prototype.constructor = clazz;
	        clazz.superClass = baseClazz;
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {Object|Function} target
	     * @param {Object|Function} sorce
	     * @param {boolean} overlay
	     */
	    function mixin(target, source, overlay) {
	        target = 'prototype' in target ? target.prototype : target;
	        source = 'prototype' in source ? source.prototype : source;

	        defaults(target, source, overlay);
	    }

	    /**
	     * @param {Array|TypedArray} data
	     */
	    function isArrayLike(data) {
	        if (! data) {
	            return;
	        }
	        if (typeof data == 'string') {
	            return false;
	        }
	        return typeof data.length == 'number';
	    }

	    /**
	     * 数组或对象遍历
	     * @memberOf module:zrender/core/util
	     * @param {Object|Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     */
	    function each(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.forEach && obj.forEach === nativeForEach) {
	            obj.forEach(cb, context);
	        }
	        else if (obj.length === +obj.length) {
	            for (var i = 0, len = obj.length; i < len; i++) {
	                cb.call(context, obj[i], i, obj);
	            }
	        }
	        else {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    cb.call(context, obj[key], key, obj);
	                }
	            }
	        }
	    }

	    /**
	     * 数组映射
	     * @memberOf module:zrender/core/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function map(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.map && obj.map === nativeMap) {
	            return obj.map(cb, context);
	        }
	        else {
	            var result = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                result.push(cb.call(context, obj[i], i, obj));
	            }
	            return result;
	        }
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {Object} [memo]
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function reduce(obj, cb, memo, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.reduce && obj.reduce === nativeReduce) {
	            return obj.reduce(cb, memo, context);
	        }
	        else {
	            for (var i = 0, len = obj.length; i < len; i++) {
	                memo = cb.call(context, memo, obj[i], i, obj);
	            }
	            return memo;
	        }
	    }

	    /**
	     * 数组过滤
	     * @memberOf module:zrender/core/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function filter(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.filter && obj.filter === nativeFilter) {
	            return obj.filter(cb, context);
	        }
	        else {
	            var result = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                if (cb.call(context, obj[i], i, obj)) {
	                    result.push(obj[i]);
	                }
	            }
	            return result;
	        }
	    }

	    /**
	     * 数组项查找
	     * @memberOf module:zrender/core/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function find(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        for (var i = 0, len = obj.length; i < len; i++) {
	            if (cb.call(context, obj[i], i, obj)) {
	                return obj[i];
	            }
	        }
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {Function} func
	     * @param {*} context
	     * @return {Function}
	     */
	    function bind(func, context) {
	        var args = nativeSlice.call(arguments, 2);
	        return function () {
	            return func.apply(context, args.concat(nativeSlice.call(arguments)));
	        };
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {Function} func
	     * @return {Function}
	     */
	    function curry(func) {
	        var args = nativeSlice.call(arguments, 1);
	        return function () {
	            return func.apply(this, args.concat(nativeSlice.call(arguments)));
	        };
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isArray(value) {
	        return objToString.call(value) === '[object Array]';
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isFunction(value) {
	        return typeof value === 'function';
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isString(value) {
	        return objToString.call(value) === '[object String]';
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isObject(value) {
	        // Avoid a V8 JIT bug in Chrome 19-20.
	        // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	        var type = typeof value;
	        return type === 'function' || (!!value && type == 'object');
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isBuildInObject(value) {
	        return !!BUILTIN_OBJECT[objToString.call(value)]
	            || (value instanceof Gradient);
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isDom(value) {
	        return value && value.nodeType === 1
	               && typeof(value.nodeName) == 'string';
	    }

	    /**
	     * If value1 is not null, then return value1, otherwise judget rest of values.
	     * @memberOf module:zrender/core/util
	     * @return {*} Final value
	     */
	    function retrieve(values) {
	        for (var i = 0, len = arguments.length; i < len; i++) {
	            if (arguments[i] != null) {
	                return arguments[i];
	            }
	        }
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {Array} arr
	     * @param {number} startIndex
	     * @param {number} endIndex
	     * @return {Array}
	     */
	    function slice() {
	        return Function.call.apply(nativeSlice, arguments);
	    }

	    /**
	     * @memberOf module:zrender/core/util
	     * @param {boolean} condition
	     * @param {string} message
	     */
	    function assert(condition, message) {
	        if (!condition) {
	            throw new Error(message);
	        }
	    }

	    var util = {
	        inherits: inherits,
	        mixin: mixin,
	        clone: clone,
	        merge: merge,
	        mergeAll: mergeAll,
	        extend: extend,
	        defaults: defaults,
	        getContext: getContext,
	        createCanvas: createCanvas,
	        indexOf: indexOf,
	        slice: slice,
	        find: find,
	        isArrayLike: isArrayLike,
	        each: each,
	        map: map,
	        reduce: reduce,
	        filter: filter,
	        bind: bind,
	        curry: curry,
	        isArray: isArray,
	        isString: isString,
	        isObject: isObject,
	        isFunction: isFunction,
	        isBuildInObject: isBuildInObject,
	        isDom: isDom,
	        retrieve: retrieve,
	        assert: assert,
	        noop: function () {}
	    };
	    module.exports = util;



/***/ },
/* 5 */
/***/ function(module, exports) {

	

	    /**
	     * @param {Array.<Object>} colorStops
	     */
	    var Gradient = function (colorStops) {

	        this.colorStops = colorStops || [];
	    };

	    Gradient.prototype = {

	        constructor: Gradient,

	        addColorStop: function (offset, color) {
	            this.colorStops.push({

	                offset: offset,

	                color: color
	            });
	        }
	    };

	    module.exports = Gradient;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module echarts/core/BoundingRect
	 */


	    var vec2 = __webpack_require__(7);
	    var matrix = __webpack_require__(8);

	    var v2ApplyTransform = vec2.applyTransform;
	    var mathMin = Math.min;
	    var mathAbs = Math.abs;
	    var mathMax = Math.max;
	    /**
	     * @alias module:echarts/core/BoundingRect
	     */
	    function BoundingRect(x, y, width, height) {
	        /**
	         * @type {number}
	         */
	        this.x = x;
	        /**
	         * @type {number}
	         */
	        this.y = y;
	        /**
	         * @type {number}
	         */
	        this.width = width;
	        /**
	         * @type {number}
	         */
	        this.height = height;
	    }

	    BoundingRect.prototype = {

	        constructor: BoundingRect,

	        /**
	         * @param {module:echarts/core/BoundingRect} other
	         */
	        union: function (other) {
	            var x = mathMin(other.x, this.x);
	            var y = mathMin(other.y, this.y);

	            this.width = mathMax(
	                    other.x + other.width,
	                    this.x + this.width
	                ) - x;
	            this.height = mathMax(
	                    other.y + other.height,
	                    this.y + this.height
	                ) - y;
	            this.x = x;
	            this.y = y;
	        },

	        /**
	         * @param {Array.<number>} m
	         * @methods
	         */
	        applyTransform: (function () {
	            var min = [];
	            var max = [];
	            return function (m) {
	                // In case usage like this
	                // el.getBoundingRect().applyTransform(el.transform)
	                // And element has no transform
	                if (!m) {
	                    return;
	                }
	                min[0] = this.x;
	                min[1] = this.y;
	                max[0] = this.x + this.width;
	                max[1] = this.y + this.height;

	                v2ApplyTransform(min, min, m);
	                v2ApplyTransform(max, max, m);

	                this.x = mathMin(min[0], max[0]);
	                this.y = mathMin(min[1], max[1]);
	                this.width = mathAbs(max[0] - min[0]);
	                this.height = mathAbs(max[1] - min[1]);
	            };
	        })(),

	        /**
	         * Calculate matrix of transforming from self to target rect
	         * @param  {module:zrender/core/BoundingRect} b
	         * @return {Array.<number>}
	         */
	        calculateTransform: function (b) {
	            var a = this;
	            var sx = b.width / a.width;
	            var sy = b.height / a.height;

	            var m = matrix.create();

	            // 矩阵右乘
	            matrix.translate(m, m, [-a.x, -a.y]);
	            matrix.scale(m, m, [sx, sy]);
	            matrix.translate(m, m, [b.x, b.y]);

	            return m;
	        },

	        /**
	         * @param {(module:echarts/core/BoundingRect|Object)} b
	         * @return {boolean}
	         */
	        intersect: function (b) {
	            var a = this;
	            var ax0 = a.x;
	            var ax1 = a.x + a.width;
	            var ay0 = a.y;
	            var ay1 = a.y + a.height;

	            var bx0 = b.x;
	            var bx1 = b.x + b.width;
	            var by0 = b.y;
	            var by1 = b.y + b.height;

	            return ! (ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
	        },

	        contain: function (x, y) {
	            var rect = this;
	            return x >= rect.x
	                && x <= (rect.x + rect.width)
	                && y >= rect.y
	                && y <= (rect.y + rect.height);
	        },

	        /**
	         * @return {module:echarts/core/BoundingRect}
	         */
	        clone: function () {
	            return new BoundingRect(this.x, this.y, this.width, this.height);
	        },

	        /**
	         * Copy from another rect
	         */
	        copy: function (other) {
	            this.x = other.x;
	            this.y = other.y;
	            this.width = other.width;
	            this.height = other.height;
	        }
	    };

	    module.exports = BoundingRect;


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	    var ArrayCtor = typeof Float32Array === 'undefined'
	        ? Array
	        : Float32Array;

	    /**
	     * @typedef {Float32Array|Array.<number>} Vector2
	     */
	    /**
	     * 二维向量类
	     * @exports zrender/tool/vector
	     */
	    var vector = {
	        /**
	         * 创建一个向量
	         * @param {number} [x=0]
	         * @param {number} [y=0]
	         * @return {Vector2}
	         */
	        create: function (x, y) {
	            var out = new ArrayCtor(2);
	            out[0] = x || 0;
	            out[1] = y || 0;
	            return out;
	        },

	        /**
	         * 复制向量数据
	         * @param {Vector2} out
	         * @param {Vector2} v
	         * @return {Vector2}
	         */
	        copy: function (out, v) {
	            out[0] = v[0];
	            out[1] = v[1];
	            return out;
	        },

	        /**
	         * 克隆一个向量
	         * @param {Vector2} v
	         * @return {Vector2}
	         */
	        clone: function (v) {
	            var out = new ArrayCtor(2);
	            out[0] = v[0];
	            out[1] = v[1];
	            return out;
	        },

	        /**
	         * 设置向量的两个项
	         * @param {Vector2} out
	         * @param {number} a
	         * @param {number} b
	         * @return {Vector2} 结果
	         */
	        set: function (out, a, b) {
	            out[0] = a;
	            out[1] = b;
	            return out;
	        },

	        /**
	         * 向量相加
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        add: function (out, v1, v2) {
	            out[0] = v1[0] + v2[0];
	            out[1] = v1[1] + v2[1];
	            return out;
	        },

	        /**
	         * 向量缩放后相加
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @param {number} a
	         */
	        scaleAndAdd: function (out, v1, v2, a) {
	            out[0] = v1[0] + v2[0] * a;
	            out[1] = v1[1] + v2[1] * a;
	            return out;
	        },

	        /**
	         * 向量相减
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        sub: function (out, v1, v2) {
	            out[0] = v1[0] - v2[0];
	            out[1] = v1[1] - v2[1];
	            return out;
	        },

	        /**
	         * 向量长度
	         * @param {Vector2} v
	         * @return {number}
	         */
	        len: function (v) {
	            return Math.sqrt(this.lenSquare(v));
	        },

	        /**
	         * 向量长度平方
	         * @param {Vector2} v
	         * @return {number}
	         */
	        lenSquare: function (v) {
	            return v[0] * v[0] + v[1] * v[1];
	        },

	        /**
	         * 向量乘法
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        mul: function (out, v1, v2) {
	            out[0] = v1[0] * v2[0];
	            out[1] = v1[1] * v2[1];
	            return out;
	        },

	        /**
	         * 向量除法
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        div: function (out, v1, v2) {
	            out[0] = v1[0] / v2[0];
	            out[1] = v1[1] / v2[1];
	            return out;
	        },

	        /**
	         * 向量点乘
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @return {number}
	         */
	        dot: function (v1, v2) {
	            return v1[0] * v2[0] + v1[1] * v2[1];
	        },

	        /**
	         * 向量缩放
	         * @param {Vector2} out
	         * @param {Vector2} v
	         * @param {number} s
	         */
	        scale: function (out, v, s) {
	            out[0] = v[0] * s;
	            out[1] = v[1] * s;
	            return out;
	        },

	        /**
	         * 向量归一化
	         * @param {Vector2} out
	         * @param {Vector2} v
	         */
	        normalize: function (out, v) {
	            var d = vector.len(v);
	            if (d === 0) {
	                out[0] = 0;
	                out[1] = 0;
	            }
	            else {
	                out[0] = v[0] / d;
	                out[1] = v[1] / d;
	            }
	            return out;
	        },

	        /**
	         * 计算向量间距离
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @return {number}
	         */
	        distance: function (v1, v2) {
	            return Math.sqrt(
	                (v1[0] - v2[0]) * (v1[0] - v2[0])
	                + (v1[1] - v2[1]) * (v1[1] - v2[1])
	            );
	        },

	        /**
	         * 向量距离平方
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @return {number}
	         */
	        distanceSquare: function (v1, v2) {
	            return (v1[0] - v2[0]) * (v1[0] - v2[0])
	                + (v1[1] - v2[1]) * (v1[1] - v2[1]);
	        },

	        /**
	         * 求负向量
	         * @param {Vector2} out
	         * @param {Vector2} v
	         */
	        negate: function (out, v) {
	            out[0] = -v[0];
	            out[1] = -v[1];
	            return out;
	        },

	        /**
	         * 插值两个点
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @param {number} t
	         */
	        lerp: function (out, v1, v2, t) {
	            out[0] = v1[0] + t * (v2[0] - v1[0]);
	            out[1] = v1[1] + t * (v2[1] - v1[1]);
	            return out;
	        },

	        /**
	         * 矩阵左乘向量
	         * @param {Vector2} out
	         * @param {Vector2} v
	         * @param {Vector2} m
	         */
	        applyTransform: function (out, v, m) {
	            var x = v[0];
	            var y = v[1];
	            out[0] = m[0] * x + m[2] * y + m[4];
	            out[1] = m[1] * x + m[3] * y + m[5];
	            return out;
	        },
	        /**
	         * 求两个向量最小值
	         * @param  {Vector2} out
	         * @param  {Vector2} v1
	         * @param  {Vector2} v2
	         */
	        min: function (out, v1, v2) {
	            out[0] = Math.min(v1[0], v2[0]);
	            out[1] = Math.min(v1[1], v2[1]);
	            return out;
	        },
	        /**
	         * 求两个向量最大值
	         * @param  {Vector2} out
	         * @param  {Vector2} v1
	         * @param  {Vector2} v2
	         */
	        max: function (out, v1, v2) {
	            out[0] = Math.max(v1[0], v2[0]);
	            out[1] = Math.max(v1[1], v2[1]);
	            return out;
	        }
	    };

	    vector.length = vector.len;
	    vector.lengthSquare = vector.lenSquare;
	    vector.dist = vector.distance;
	    vector.distSquare = vector.distanceSquare;

	    module.exports = vector;



/***/ },
/* 8 */
/***/ function(module, exports) {

	
	    var ArrayCtor = typeof Float32Array === 'undefined'
	        ? Array
	        : Float32Array;
	    /**
	     * 3x2矩阵操作类
	     * @exports zrender/tool/matrix
	     */
	    var matrix = {
	        /**
	         * 创建一个单位矩阵
	         * @return {Float32Array|Array.<number>}
	         */
	        create : function() {
	            var out = new ArrayCtor(6);
	            matrix.identity(out);

	            return out;
	        },
	        /**
	         * 设置矩阵为单位矩阵
	         * @param {Float32Array|Array.<number>} out
	         */
	        identity : function(out) {
	            out[0] = 1;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            out[4] = 0;
	            out[5] = 0;
	            return out;
	        },
	        /**
	         * 复制矩阵
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} m
	         */
	        copy: function(out, m) {
	            out[0] = m[0];
	            out[1] = m[1];
	            out[2] = m[2];
	            out[3] = m[3];
	            out[4] = m[4];
	            out[5] = m[5];
	            return out;
	        },
	        /**
	         * 矩阵相乘
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} m1
	         * @param {Float32Array|Array.<number>} m2
	         */
	        mul : function (out, m1, m2) {
	            // Consider matrix.mul(m, m2, m);
	            // where out is the same as m2.
	            // So use temp variable to escape error.
	            var out0 = m1[0] * m2[0] + m1[2] * m2[1];
	            var out1 = m1[1] * m2[0] + m1[3] * m2[1];
	            var out2 = m1[0] * m2[2] + m1[2] * m2[3];
	            var out3 = m1[1] * m2[2] + m1[3] * m2[3];
	            var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
	            var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
	            out[0] = out0;
	            out[1] = out1;
	            out[2] = out2;
	            out[3] = out3;
	            out[4] = out4;
	            out[5] = out5;
	            return out;
	        },
	        /**
	         * 平移变换
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         * @param {Float32Array|Array.<number>} v
	         */
	        translate : function(out, a, v) {
	            out[0] = a[0];
	            out[1] = a[1];
	            out[2] = a[2];
	            out[3] = a[3];
	            out[4] = a[4] + v[0];
	            out[5] = a[5] + v[1];
	            return out;
	        },
	        /**
	         * 旋转变换
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         * @param {number} rad
	         */
	        rotate : function(out, a, rad) {
	            var aa = a[0];
	            var ac = a[2];
	            var atx = a[4];
	            var ab = a[1];
	            var ad = a[3];
	            var aty = a[5];
	            var st = Math.sin(rad);
	            var ct = Math.cos(rad);

	            out[0] = aa * ct + ab * st;
	            out[1] = -aa * st + ab * ct;
	            out[2] = ac * ct + ad * st;
	            out[3] = -ac * st + ct * ad;
	            out[4] = ct * atx + st * aty;
	            out[5] = ct * aty - st * atx;
	            return out;
	        },
	        /**
	         * 缩放变换
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         * @param {Float32Array|Array.<number>} v
	         */
	        scale : function(out, a, v) {
	            var vx = v[0];
	            var vy = v[1];
	            out[0] = a[0] * vx;
	            out[1] = a[1] * vy;
	            out[2] = a[2] * vx;
	            out[3] = a[3] * vy;
	            out[4] = a[4] * vx;
	            out[5] = a[5] * vy;
	            return out;
	        },
	        /**
	         * 求逆矩阵
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         */
	        invert : function(out, a) {

	            var aa = a[0];
	            var ac = a[2];
	            var atx = a[4];
	            var ab = a[1];
	            var ad = a[3];
	            var aty = a[5];

	            var det = aa * ad - ab * ac;
	            if (!det) {
	                return null;
	            }
	            det = 1.0 / det;

	            out[0] = ad * det;
	            out[1] = -ab * det;
	            out[2] = -ac * det;
	            out[3] = aa * det;
	            out[4] = (ac * aty - ad * atx) * det;
	            out[5] = (ab * atx - aa * aty) * det;
	            return out;
	        }
	    };

	    module.exports = matrix;



/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * 数值处理模块
	 * @module echarts/util/number
	 */



	    var number = {};

	    var RADIAN_EPSILON = 1e-4;

	    function _trim(str) {
	        return str.replace(/^\s+/, '').replace(/\s+$/, '');
	    }

	    /**
	     * Linear mapping a value from domain to range
	     * @memberOf module:echarts/util/number
	     * @param  {(number|Array.<number>)} val
	     * @param  {Array.<number>} domain Domain extent domain[0] can be bigger than domain[1]
	     * @param  {Array.<number>} range  Range extent range[0] can be bigger than range[1]
	     * @param  {boolean} clamp
	     * @return {(number|Array.<number>}
	     */
	    number.linearMap = function (val, domain, range, clamp) {
	        var subDomain = domain[1] - domain[0];
	        var subRange = range[1] - range[0];

	        if (subDomain === 0) {
	            return subRange === 0
	                ? range[0]
	                : (range[0] + range[1]) / 2;
	        }

	        // Avoid accuracy problem in edge, such as
	        // 146.39 - 62.83 === 83.55999999999999.
	        // See echarts/test/ut/spec/util/number.js#linearMap#accuracyError
	        // It is a little verbose for efficiency considering this method
	        // is a hotspot.
	        if (clamp) {
	            if (subDomain > 0) {
	                if (val <= domain[0]) {
	                    return range[0];
	                }
	                else if (val >= domain[1]) {
	                    return range[1];
	                }
	            }
	            else {
	                if (val >= domain[0]) {
	                    return range[0];
	                }
	                else if (val <= domain[1]) {
	                    return range[1];
	                }
	            }
	        }
	        else {
	            if (val === domain[0]) {
	                return range[0];
	            }
	            if (val === domain[1]) {
	                return range[1];
	            }
	        }

	        return (val - domain[0]) / subDomain * subRange + range[0];
	    };

	    /**
	     * Convert a percent string to absolute number.
	     * Returns NaN if percent is not a valid string or number
	     * @memberOf module:echarts/util/number
	     * @param {string|number} percent
	     * @param {number} all
	     * @return {number}
	     */
	    number.parsePercent = function(percent, all) {
	        switch (percent) {
	            case 'center':
	            case 'middle':
	                percent = '50%';
	                break;
	            case 'left':
	            case 'top':
	                percent = '0%';
	                break;
	            case 'right':
	            case 'bottom':
	                percent = '100%';
	                break;
	        }
	        if (typeof percent === 'string') {
	            if (_trim(percent).match(/%$/)) {
	                return parseFloat(percent) / 100 * all;
	            }

	            return parseFloat(percent);
	        }

	        return percent == null ? NaN : +percent;
	    };

	    /**
	     * Fix rounding error of float numbers
	     * @param {number} x
	     * @return {number}
	     */
	    number.round = function (x) {
	        // PENDING
	        return +(+x).toFixed(10);
	    };

	    number.asc = function (arr) {
	        arr.sort(function (a, b) {
	            return a - b;
	        });
	        return arr;
	    };

	    /**
	     * Get precision
	     * @param {number} val
	     */
	    number.getPrecision = function (val) {
	        if (isNaN(val)) {
	            return 0;
	        }
	        // It is much faster than methods converting number to string as follows
	        //      var tmp = val.toString();
	        //      return tmp.length - 1 - tmp.indexOf('.');
	        // especially when precision is low
	        var e = 1;
	        var count = 0;
	        while (Math.round(val * e) / e !== val) {
	            e *= 10;
	            count++;
	        }
	        return count;
	    };

	    /**
	     * @param {Array.<number>} dataExtent
	     * @param {Array.<number>} pixelExtent
	     * @return {number}  precision
	     */
	    number.getPixelPrecision = function (dataExtent, pixelExtent) {
	        var log = Math.log;
	        var LN10 = Math.LN10;
	        var dataQuantity = Math.floor(log(dataExtent[1] - dataExtent[0]) / LN10);
	        var sizeQuantity = Math.round(log(Math.abs(pixelExtent[1] - pixelExtent[0])) / LN10);
	        return Math.max(
	            -dataQuantity + sizeQuantity,
	            0
	        );
	    };

	    // Number.MAX_SAFE_INTEGER, ie do not support.
	    number.MAX_SAFE_INTEGER = 9007199254740991;

	    /**
	     * To 0 - 2 * PI, considering negative radian.
	     * @param {number} radian
	     * @return {number}
	     */
	    number.remRadian = function (radian) {
	        var pi2 = Math.PI * 2;
	        return (radian % pi2 + pi2) % pi2;
	    };

	    /**
	     * @param {type} radian
	     * @return {boolean}
	     */
	    number.isRadianAroundZero = function (val) {
	        return val > -RADIAN_EPSILON && val < RADIAN_EPSILON;
	    };

	    /**
	     * @param {string|Date|number} value
	     * @return {number} timestamp
	     */
	    number.parseDate = function (value) {
	        return value instanceof Date
	            ? value
	            : new Date(
	                typeof value === 'string'
	                    ? value.replace(/-/g, '/')
	                    : Math.round(value)
	            );
	    };

	    /**
	     * Quantity of a number. e.g. 0.1, 1, 10, 100
	     * @param  {number} val
	     * @return {number}
	     */
	    number.quantity = function (val) {
	        return Math.pow(10, Math.floor(Math.log(val) / Math.LN10));
	    };

	    // "Nice Numbers for Graph Labels" of Graphic Gems
	    /**
	     * find a “nice” number approximately equal to x. Round the number if round = true, take ceiling if round = false
	     * The primary observation is that the “nicest” numbers in decimal are 1, 2, and 5, and all power-of-ten multiples of these numbers.
	     * @param  {number} val
	     * @param  {boolean} round
	     * @return {number}
	     */
	    number.nice = function (val, round) {
	        var exp10 = number.quantity(val);
	        var f = val / exp10; // between 1 and 10
	        var nf;
	        if (round) {
	            if (f < 1.5) { nf = 1; }
	            else if (f < 2.5) { nf = 2; }
	            else if (f < 4) { nf = 3; }
	            else if (f < 7) { nf = 5; }
	            else { nf = 10; }
	        }
	        else {
	            if (f < 1) { nf = 1; }
	            else if (f < 2) { nf = 2; }
	            else if (f < 3) { nf = 3; }
	            else if (f < 5) { nf = 5; }
	            else { nf = 10; }
	        }
	        return nf * exp10;
	    };

	    module.exports = number;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	

	    var zrUtil = __webpack_require__(4);
	    var numberUtil = __webpack_require__(9);

	    /**
	     * 每三位默认加,格式化
	     * @type {string|number} x
	     */
	    function addCommas(x) {
	        if (isNaN(x)) {
	            return '-';
	        }
	        x = (x + '').split('.');
	        return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,'$1,')
	               + (x.length > 1 ? ('.' + x[1]) : '');
	    }

	    /**
	     * @param {string} str
	     * @return {string} str
	     */
	    function toCamelCase(str) {
	        return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
	            return group1.toUpperCase();
	        });
	    }

	    /**
	     * Normalize css liked array configuration
	     * e.g.
	     *  3 => [3, 3, 3, 3]
	     *  [4, 2] => [4, 2, 4, 2]
	     *  [4, 3, 2] => [4, 3, 2, 3]
	     * @param {number|Array.<number>} val
	     */
	    function normalizeCssArray(val) {
	        var len = val.length;
	        if (typeof (val) === 'number') {
	            return [val, val, val, val];
	        }
	        else if (len === 2) {
	            // vertical | horizontal
	            return [val[0], val[1], val[0], val[1]];
	        }
	        else if (len === 3) {
	            // top | horizontal | bottom
	            return [val[0], val[1], val[2], val[1]];
	        }
	        return val;
	    }

	    function encodeHTML(source) {
	        return String(source)
	            .replace(/&/g, '&amp;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#39;');
	    }

	    var TPL_VAR_ALIAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

	    function wrapVar(varName, seriesIdx) {
	        return '{' + varName + (seriesIdx == null ? '' : seriesIdx) + '}';
	    }
	    /**
	     * Template formatter
	     * @param  {string} tpl
	     * @param  {Array.<Object>|Object} paramsList
	     * @return {string}
	     */
	    function formatTpl(tpl, paramsList) {
	        if (!zrUtil.isArray(paramsList)) {
	            paramsList = [paramsList];
	        }
	        var seriesLen = paramsList.length;
	        if (!seriesLen) {
	            return '';
	        }

	        var $vars = paramsList[0].$vars;
	        for (var i = 0; i < $vars.length; i++) {
	            var alias = TPL_VAR_ALIAS[i];
	            tpl = tpl.replace(wrapVar(alias),  wrapVar(alias, 0));
	        }
	        for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++) {
	            for (var k = 0; k < $vars.length; k++) {
	                tpl = tpl.replace(
	                    wrapVar(TPL_VAR_ALIAS[k], seriesIdx),
	                    paramsList[seriesIdx][$vars[k]]
	                );
	            }
	        }

	        return tpl;
	    }

	    /**
	     * ISO Date format
	     * @param {string} tpl
	     * @param {number} value
	     * @inner
	     */
	    function formatTime(tpl, value) {
	        if (tpl === 'week'
	            || tpl === 'month'
	            || tpl === 'quarter'
	            || tpl === 'half-year'
	            || tpl === 'year'
	        ) {
	            tpl = 'MM-dd\nyyyy';
	        }

	        var date = numberUtil.parseDate(value);
	        var y = date.getFullYear();
	        var M = date.getMonth() + 1;
	        var d = date.getDate();
	        var h = date.getHours();
	        var m = date.getMinutes();
	        var s = date.getSeconds();

	        tpl = tpl.replace('MM', s2d(M))
	            .toLowerCase()
	            .replace('yyyy', y)
	            .replace('yy', y % 100)
	            .replace('dd', s2d(d))
	            .replace('d', d)
	            .replace('hh', s2d(h))
	            .replace('h', h)
	            .replace('mm', s2d(m))
	            .replace('m', m)
	            .replace('ss', s2d(s))
	            .replace('s', s);

	        return tpl;
	    }

	    /**
	     * @param {string} str
	     * @return {string}
	     * @inner
	     */
	    function s2d(str) {
	        return str < 10 ? ('0' + str) : str;
	    }

	    module.exports = {

	        normalizeCssArray: normalizeCssArray,

	        addCommas: addCommas,

	        toCamelCase: toCamelCase,

	        encodeHTML: encodeHTML,

	        formatTpl: formatTpl,

	        formatTime: formatTime
	    };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var completeDimensions = __webpack_require__(12);
	var echarts = __webpack_require__(2);

	echarts.extendSeriesModel({

	    type: 'series.wordCloud',

	    visualColorAccessPath: 'textStyle.normal.color',

	    optionUpdated: function () {
	        var option = this.option;
	        option.gridSize = Math.max(Math.floor(option.gridSize), 4);
	    },

	    getInitialData: function (option, ecModel) {
	        var dimensions = completeDimensions(['value'], option.data);
	        var list = new echarts.List(dimensions, this);
	        list.initData(option.data);
	        return list;
	    },

	    // Most of options are from https://github.com/timdream/wordcloud2.js/blob/gh-pages/API.md
	    defaultOption: {

	        maskImage: null,

	        // Shape can be 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
	        shape: 'circle',

	        left: 'center',

	        top: 'center',

	        width: '70%',

	        height: '80%',

	        sizeRange: [12, 60],

	        rotationRange: [-90, 90],

	        rotationStep: 45,

	        gridSize: 8,

	        textStyle: {
	            normal: {
	                fontWeight: 'normal'
	            }
	        }
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Complete dimensions by data (guess dimension).
	 */


	    var zrUtil = __webpack_require__(4);

	    /**
	     * Complete the dimensions array guessed from the data structure.
	     * @param  {Array.<string>} dimensions      Necessary dimensions, like ['x', 'y']
	     * @param  {Array} data                     Data list. [[1, 2, 3], [2, 3, 4]]
	     * @param  {Array.<string>} defaultNames    Default names to fill not necessary dimensions, like ['value']
	     * @param  {string} extraPrefix             Prefix of name when filling the left dimensions.
	     * @return {Array.<string>}
	     */
	    function completeDimensions(dimensions, data, defaultNames, extraPrefix) {
	        if (!data) {
	            return dimensions;
	        }

	        var value0 = retrieveValue(data[0]);
	        var dimSize = zrUtil.isArray(value0) && value0.length || 1;

	        defaultNames = defaultNames || [];
	        extraPrefix = extraPrefix || 'extra';
	        for (var i = 0; i < dimSize; i++) {
	            if (!dimensions[i]) {
	                var name = defaultNames[i] || (extraPrefix + (i - defaultNames.length));
	                dimensions[i] = guessOrdinal(data, i)
	                    ? {type: 'ordinal', name: name}
	                    : name;
	            }
	        }

	        return dimensions;
	    }

	    // The rule should not be complex, otherwise user might not
	    // be able to known where the data is wrong.
	    function guessOrdinal(data, dimIndex) {
	        for (var i = 0, len = data.length; i < len; i++) {
	            var value = retrieveValue(data[i]);

	            if (!zrUtil.isArray(value)) {
	                return false;
	            }

	            var value = value[dimIndex];
	            if (value != null && isFinite(value)) {
	                return false;
	            }
	            else if (zrUtil.isString(value) && value !== '-') {
	                return true;
	            }
	        }
	        return false;
	    }

	    function retrieveValue(o) {
	        return zrUtil.isArray(o) ? o : zrUtil.isObject(o) ? o.value: o;
	    }

	    module.exports = completeDimensions;



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var echarts = __webpack_require__(2);

	function getShallow(model, path) {
	    return model && model.getShallow(path);
	}

	echarts.extendChartView({

	    type: 'wordCloud',

	    render: function (seriesModel, ecModel, api) {
	        var group = this.group;
	        group.removeAll();

	        var data = seriesModel.getData();

	        var gridSize = seriesModel.get('gridSize');

	        seriesModel.layoutInstance.ondraw = function (text, size, dataIdx, drawn) {
	            var itemModel = data.getItemModel(dataIdx);
	            var textStyleModel = itemModel.getModel('textStyle.normal');
	            var emphasisTextStyleModel = itemModel.getModel('textStyle.emphasis');

	            var getFont = function (model, otherModel) {
	                var ecModel = model.ecModel;
	                var gTextStyleModel = ecModel && ecModel.getModel('textStyle');
	                return ['fontStyle', 'fontWeight', 'fontSize', 'fontFamily'].map(function (name, idx) {
	                    if (idx !== 2) {
	                        return model.getShallow(name)
	                                || otherModel.getShallow(name)
	                                || getShallow(gTextStyleModel, name);
	                    }
	                    else {
	                        return (
	                            model.getShallow(name, true)
	                            || Math.round(
	                                    model === textStyleModel
	                                    ? size : (otherModel.getShallow(name, true) || size)
	                                )
	                        ) + 'px';
	                    }
	                }).join(' ');
	            };
	            var text = new echarts.graphic.Text({
	                style: {
	                    x: drawn.info.fillTextOffsetX,
	                    y: drawn.info.fillTextOffsetY + size * 0.5,
	                    text: text,
	                    textBaseline: 'middle',
	                    font: getFont(textStyleModel, emphasisTextStyleModel)
	                },
	                scale: [1 / drawn.info.mu, 1 / drawn.info.mu],
	                position: [
	                    (drawn.gx + drawn.info.gw / 2) * gridSize,
	                    (drawn.gy + drawn.info.gh / 2) * gridSize
	                ],
	                rotation: drawn.rot
	            });

	            text.setStyle(textStyleModel.getItemStyle());
	            text.setStyle({
	                fill: data.getItemVisual(dataIdx, 'color')
	            });

	            group.add(text);

	            data.setItemGraphicEl(dataIdx, text);
	            echarts.graphic.setHoverStyle(
	                text, echarts.util.extend(
	                    emphasisTextStyleModel.getItemStyle(),
	                    {
	                        font: getFont(emphasisTextStyleModel, textStyleModel)
	                    }
	                )
	            );
	        };
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * wordcloud2.js
	 * http://timdream.org/wordcloud2.js/
	 *
	 * Copyright 2011 - 2013 Tim Chien
	 * Released under the MIT license
	 */

	'use strict';

	// setImmediate
	if (!window.setImmediate) {
	  window.setImmediate = (function setupSetImmediate() {
	    return window.msSetImmediate ||
	    window.webkitSetImmediate ||
	    window.mozSetImmediate ||
	    window.oSetImmediate ||
	    (function setupSetZeroTimeout() {
	      if (!window.postMessage || !window.addEventListener) {
	        return null;
	      }

	      var callbacks = [undefined];
	      var message = 'zero-timeout-message';

	      // Like setTimeout, but only takes a function argument.  There's
	      // no time argument (always zero) and no arguments (you have to
	      // use a closure).
	      var setZeroTimeout = function setZeroTimeout(callback) {
	        var id = callbacks.length;
	        callbacks.push(callback);
	        window.postMessage(message + id.toString(36), '*');

	        return id;
	      };

	      window.addEventListener('message', function setZeroTimeoutMessage(evt) {
	        // Skipping checking event source, retarded IE confused this window
	        // object with another in the presence of iframe
	        if (typeof evt.data !== 'string' ||
	            evt.data.substr(0, message.length) !== message/* ||
	            evt.source !== window */) {
	          return;
	        }

	        evt.stopImmediatePropagation();

	        var id = parseInt(evt.data.substr(message.length), 36);
	        if (!callbacks[id]) {
	          return;
	        }

	        callbacks[id]();
	        callbacks[id] = undefined;
	      }, true);

	      /* specify clearImmediate() here since we need the scope */
	      window.clearImmediate = function clearZeroTimeout(id) {
	        if (!callbacks[id]) {
	          return;
	        }

	        callbacks[id] = undefined;
	      };

	      return setZeroTimeout;
	    })() ||
	    // fallback
	    function setImmediateFallback(fn) {
	      window.setTimeout(fn, 0);
	    };
	  })();
	}

	if (!window.clearImmediate) {
	  window.clearImmediate = (function setupClearImmediate() {
	    return window.msClearImmediate ||
	    window.webkitClearImmediate ||
	    window.mozClearImmediate ||
	    window.oClearImmediate ||
	    // "clearZeroTimeout" is implement on the previous block ||
	    // fallback
	    function clearImmediateFallback(timer) {
	      window.clearTimeout(timer);
	    };
	  })();
	}

	(function(global) {

	  // Check if WordCloud can run on this browser
	  var isSupported = (function isSupported() {
	    var canvas = document.createElement('canvas');
	    if (!canvas || !canvas.getContext) {
	      return false;
	    }

	    var ctx = canvas.getContext('2d');
	    if (!ctx.getImageData) {
	      return false;
	    }
	    if (!ctx.fillText) {
	      return false;
	    }

	    if (!Array.prototype.some) {
	      return false;
	    }
	    if (!Array.prototype.push) {
	      return false;
	    }

	    return true;
	  }());

	  // Find out if the browser impose minium font size by
	  // drawing small texts on a canvas and measure it's width.
	  var minFontSize = (function getMinFontSize() {
	    if (!isSupported) {
	      return;
	    }

	    var ctx = document.createElement('canvas').getContext('2d');

	    // start from 20
	    var size = 20;

	    // two sizes to measure
	    var hanWidth, mWidth;

	    while (size) {
	      ctx.font = size.toString(10) + 'px sans-serif';
	      if ((ctx.measureText('\uFF37').width === hanWidth) &&
	          (ctx.measureText('m').width) === mWidth) {
	        return (size + 1);
	      }

	      hanWidth = ctx.measureText('\uFF37').width;
	      mWidth = ctx.measureText('m').width;

	      size--;
	    }

	    return 0;
	  })();

	  // Based on http://jsfromhell.com/array/shuffle
	  var shuffleArray = function shuffleArray(arr) {
	    for (var j, x, i = arr.length; i;
	      j = Math.floor(Math.random() * i),
	      x = arr[--i], arr[i] = arr[j],
	      arr[j] = x) {}
	    return arr;
	  };

	  var WordCloud = function WordCloud(elements, options) {
	    if (!isSupported) {
	      return;
	    }

	    if (!Array.isArray(elements)) {
	      elements = [elements];
	    }

	    elements.forEach(function(el, i) {
	      if (typeof el === 'string') {
	        elements[i] = document.getElementById(el);
	        if (!elements[i]) {
	          throw 'The element id specified is not found.';
	        }
	      } else if (!el.tagName && !el.appendChild) {
	        throw 'You must pass valid HTML elements, or ID of the element.';
	      }
	    });

	    /* Default values to be overwritten by options object */
	    var settings = {
	      list: [],
	      fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' +
	                  '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
	      fontWeight: 'normal',
	      color: 'random-dark',
	      minSize: 0, // 0 to disable
	      weightFactor: 1,
	      clearCanvas: true,
	      backgroundColor: '#fff',  // opaque white = rgba(255, 255, 255, 1)

	      gridSize: 8,
	      drawOutOfBound: false,
	      origin: null,

	      drawMask: false,
	      maskColor: 'rgba(255,0,0,0.3)',
	      maskGapWidth: 0.3,

	      wait: 0,
	      abortThreshold: 0, // disabled
	      abort: function noop() {},

	      minRotation: - Math.PI / 2,
	      maxRotation: Math.PI / 2,
	      rotationStep: 0.1,

	      shuffle: true,
	      rotateRatio: 0.1,

	      shape: 'circle',
	      ellipticity: 0.65,

	      classes: null,

	      hover: null,
	      click: null
	    };

	    if (options) {
	      for (var key in options) {
	        if (key in settings) {
	          settings[key] = options[key];
	        }
	      }
	    }

	    /* Convert weightFactor into a function */
	    if (typeof settings.weightFactor !== 'function') {
	      var factor = settings.weightFactor;
	      settings.weightFactor = function weightFactor(pt) {
	        return pt * factor; //in px
	      };
	    }

	    /* Convert shape into a function */
	    if (typeof settings.shape !== 'function') {
	      switch (settings.shape) {
	        case 'circle':
	        /* falls through */
	        default:
	          // 'circle' is the default and a shortcut in the code loop.
	          settings.shape = 'circle';
	          break;

	        case 'cardioid':
	          settings.shape = function shapeCardioid(theta) {
	            return 1 - Math.sin(theta);
	          };
	          break;

	        /*
	        To work out an X-gon, one has to calculate "m",
	        where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
	        http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
	        2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29
	        Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
	        where t' equals to mod(t, 2PI/X);
	        */

	        case 'diamond':
	        case 'square':
	          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
	          // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
	          // +0+..+2*PI
	          settings.shape = function shapeSquare(theta) {
	            var thetaPrime = theta % (2 * Math.PI / 4);
	            return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
	          };
	          break;

	        case 'triangle-forward':
	          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
	          // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
	          // %29%29%2C+t+%3D+0+..+2*PI
	          settings.shape = function shapeTriangle(theta) {
	            var thetaPrime = theta % (2 * Math.PI / 3);
	            return 1 / (Math.cos(thetaPrime) +
	                        Math.sqrt(3) * Math.sin(thetaPrime));
	          };
	          break;

	        case 'triangle':
	        case 'triangle-upright':
	          settings.shape = function shapeTriangle(theta) {
	            var thetaPrime = (theta + Math.PI * 3 / 2) % (2 * Math.PI / 3);
	            return 1 / (Math.cos(thetaPrime) +
	                        Math.sqrt(3) * Math.sin(thetaPrime));
	          };
	          break;

	        case 'pentagon':
	          settings.shape = function shapePentagon(theta) {
	            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 5);
	            return 1 / (Math.cos(thetaPrime) +
	                        0.726543 * Math.sin(thetaPrime));
	          };
	          break;

	        case 'star':
	          settings.shape = function shapeStar(theta) {
	            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 10);
	            if ((theta + 0.955) % (2 * Math.PI / 5) - (2 * Math.PI / 10) >= 0) {
	              return 1 / (Math.cos((2 * Math.PI / 10) - thetaPrime) +
	                          3.07768 * Math.sin((2 * Math.PI / 10) - thetaPrime));
	            } else {
	              return 1 / (Math.cos(thetaPrime) +
	                          3.07768 * Math.sin(thetaPrime));
	            }
	          };
	          break;
	      }
	    }

	    /* Make sure gridSize is a whole number and is not smaller than 4px */
	    settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);

	    /* shorthand */
	    var g = settings.gridSize;
	    var maskRectWidth = g - settings.maskGapWidth;

	    /* normalize rotation settings */
	    var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
	    var minRotation = Math.min(settings.maxRotation, settings.minRotation);
	    var rotationStep = settings.rotationStep;

	    /* information/object available to all functions, set when start() */
	    var grid, // 2d array containing filling information
	      ngx, ngy, // width and height of the grid
	      center, // position of the center of the cloud
	      maxRadius;

	    /* timestamp for measuring each putWord() action */
	    var escapeTime;

	    /* function for getting the color of the text */
	    var getTextColor;
	    function random_hsl_color(min, max) {
	      return 'hsl(' +
	        (Math.random() * 360).toFixed() + ',' +
	        (Math.random() * 30 + 70).toFixed() + '%,' +
	        (Math.random() * (max - min) + min).toFixed() + '%)';
	    }
	    switch (settings.color) {
	      case 'random-dark':
	        getTextColor = function getRandomDarkColor() {
	          return random_hsl_color(10, 50);
	        };
	        break;

	      case 'random-light':
	        getTextColor = function getRandomLightColor() {
	          return random_hsl_color(50, 90);
	        };
	        break;

	      default:
	        if (typeof settings.color === 'function') {
	          getTextColor = settings.color;
	        }
	        break;
	    }

	    /* function for getting the classes of the text */
	    var getTextClasses = null;
	    if (typeof settings.classes === 'function') {
	      getTextClasses = settings.classes;
	    }

	    /* Interactive */
	    var interactive = false;
	    var infoGrid = [];
	    var hovered;

	    var getInfoGridFromMouseTouchEvent =
	    function getInfoGridFromMouseTouchEvent(evt) {
	      var canvas = evt.currentTarget;
	      var rect = canvas.getBoundingClientRect();
	      var clientX;
	      var clientY;
	      /** Detect if touches are available */
	      if (evt.touches) {
	        clientX = evt.touches[0].clientX;
	        clientY = evt.touches[0].clientY;
	      } else {
	        clientX = evt.clientX;
	        clientY = evt.clientY;
	      }
	      var eventX = clientX - rect.left;
	      var eventY = clientY - rect.top;

	      var x = Math.floor(eventX * ((canvas.width / rect.width) || 1) / g);
	      var y = Math.floor(eventY * ((canvas.height / rect.height) || 1) / g);

	      return infoGrid[x][y];
	    };

	    var wordcloudhover = function wordcloudhover(evt) {
	      var info = getInfoGridFromMouseTouchEvent(evt);

	      if (hovered === info) {
	        return;
	      }

	      hovered = info;
	      if (!info) {
	        settings.hover(undefined, undefined, evt);

	        return;
	      }

	      settings.hover(info.item, info.dimension, evt);

	    };

	    var wordcloudclick = function wordcloudclick(evt) {
	      var info = getInfoGridFromMouseTouchEvent(evt);
	      if (!info) {
	        return;
	      }

	      settings.click(info.item, info.dimension, evt);
	      evt.preventDefault();
	    };

	    /* Get points on the grid for a given radius away from the center */
	    var pointsAtRadius = [];
	    var getPointsAtRadius = function getPointsAtRadius(radius) {
	      if (pointsAtRadius[radius]) {
	        return pointsAtRadius[radius];
	      }

	      // Look for these number of points on each radius
	      var T = radius * 8;

	      // Getting all the points at this radius
	      var t = T;
	      var points = [];

	      if (radius === 0) {
	        points.push([center[0], center[1], 0]);
	      }

	      while (t--) {
	        // distort the radius to put the cloud in shape
	        var rx = 1;
	        if (settings.shape !== 'circle') {
	          rx = settings.shape(t / T * 2 * Math.PI); // 0 to 1
	        }

	        // Push [x, y, t]; t is used solely for getTextColor()
	        points.push([
	          center[0] + radius * rx * Math.cos(-t / T * 2 * Math.PI),
	          center[1] + radius * rx * Math.sin(-t / T * 2 * Math.PI) *
	            settings.ellipticity,
	          t / T * 2 * Math.PI]);
	      }

	      pointsAtRadius[radius] = points;
	      return points;
	    };

	    /* Return true if we had spent too much time */
	    var exceedTime = function exceedTime() {
	      return ((settings.abortThreshold > 0) &&
	        ((new Date()).getTime() - escapeTime > settings.abortThreshold));
	    };

	    /* Get the deg of rotation according to settings, and luck. */
	    var getRotateDeg = function getRotateDeg() {
	      if (settings.rotateRatio === 0) {
	        return 0;
	      }

	      if (Math.random() > settings.rotateRatio) {
	        return 0;
	      }

	      if (rotationRange === 0) {
	        return minRotation;
	      }

	      return minRotation + Math.round(Math.random() * rotationRange / rotationStep) * rotationStep;
	    };

	    var getTextInfo = function getTextInfo(word, weight, rotateDeg) {
	      // calculate the acutal font size
	      // fontSize === 0 means weightFactor function wants the text skipped,
	      // and size < minSize means we cannot draw the text.
	      var debug = false;
	      var fontSize = settings.weightFactor(weight);
	      if (fontSize <= settings.minSize) {
	        return false;
	      }

	      // Scale factor here is to make sure fillText is not limited by
	      // the minium font size set by browser.
	      // It will always be 1 or 2n.
	      var mu = 1;
	      if (fontSize < minFontSize) {
	        mu = (function calculateScaleFactor() {
	          var mu = 2;
	          while (mu * fontSize < minFontSize) {
	            mu += 2;
	          }
	          return mu;
	        })();
	      }

	      var fcanvas = document.createElement('canvas');
	      var fctx = fcanvas.getContext('2d', { willReadFrequently: true });

	      fctx.font = settings.fontWeight + ' ' +
	        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

	      // Estimate the dimension of the text with measureText().
	      var fw = fctx.measureText(word).width / mu;
	      var fh = Math.max(fontSize * mu,
	                        fctx.measureText('m').width,
	                        fctx.measureText('\uFF37').width) / mu;

	      // Create a boundary box that is larger than our estimates,
	      // so text don't get cut of (it sill might)
	      var boxWidth = fw + fh * 2;
	      var boxHeight = fh * 3;
	      var fgw = Math.ceil(boxWidth / g);
	      var fgh = Math.ceil(boxHeight / g);
	      boxWidth = fgw * g;
	      boxHeight = fgh * g;

	      // Calculate the proper offsets to make the text centered at
	      // the preferred position.

	      // This is simply half of the width.
	      var fillTextOffsetX = - fw / 2;
	      // Instead of moving the box to the exact middle of the preferred
	      // position, for Y-offset we move 0.4 instead, so Latin alphabets look
	      // vertical centered.
	      var fillTextOffsetY = - fh * 0.4;

	      // Calculate the actual dimension of the canvas, considering the rotation.
	      var cgh = Math.ceil((boxWidth * Math.abs(Math.sin(rotateDeg)) +
	                           boxHeight * Math.abs(Math.cos(rotateDeg))) / g);
	      var cgw = Math.ceil((boxWidth * Math.abs(Math.cos(rotateDeg)) +
	                           boxHeight * Math.abs(Math.sin(rotateDeg))) / g);
	      var width = cgw * g;
	      var height = cgh * g;

	      fcanvas.setAttribute('width', width);
	      fcanvas.setAttribute('height', height);

	      if (debug) {
	        // Attach fcanvas to the DOM
	        document.body.appendChild(fcanvas);
	        // Save it's state so that we could restore and draw the grid correctly.
	        fctx.save();
	      }

	      // Scale the canvas with |mu|.
	      fctx.scale(1 / mu, 1 / mu);
	      fctx.translate(width * mu / 2, height * mu / 2);
	      fctx.rotate(- rotateDeg);

	      // Once the width/height is set, ctx info will be reset.
	      // Set it again here.
	      fctx.font = settings.fontWeight + ' ' +
	        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

	      // Fill the text into the fcanvas.
	      // XXX: We cannot because textBaseline = 'top' here because
	      // Firefox and Chrome uses different default line-height for canvas.
	      // Please read https://bugzil.la/737852#c6.
	      // Here, we use textBaseline = 'middle' and draw the text at exactly
	      // 0.5 * fontSize lower.
	      fctx.fillStyle = '#000';
	      fctx.textBaseline = 'middle';
	      fctx.fillText(word, fillTextOffsetX * mu,
	                    (fillTextOffsetY + fontSize * 0.5) * mu);

	      // Get the pixels of the text
	      var imageData = fctx.getImageData(0, 0, width, height).data;

	      if (exceedTime()) {
	        return false;
	      }

	      if (debug) {
	        // Draw the box of the original estimation
	        fctx.strokeRect(fillTextOffsetX * mu,
	                        fillTextOffsetY, fw * mu, fh * mu);
	        fctx.restore();
	      }

	      // Read the pixels and save the information to the occupied array
	      var occupied = [];
	      var gx = cgw, gy, x, y;
	      var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
	      while (gx--) {
	        gy = cgh;
	        while (gy--) {
	          y = g;
	          singleGridLoop: {
	            while (y--) {
	              x = g;
	              while (x--) {
	                if (imageData[((gy * g + y) * width +
	                               (gx * g + x)) * 4 + 3]) {
	                  occupied.push([gx, gy]);

	                  if (gx < bounds[3]) {
	                    bounds[3] = gx;
	                  }
	                  if (gx > bounds[1]) {
	                    bounds[1] = gx;
	                  }
	                  if (gy < bounds[0]) {
	                    bounds[0] = gy;
	                  }
	                  if (gy > bounds[2]) {
	                    bounds[2] = gy;
	                  }

	                  if (debug) {
	                    fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
	                    fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
	                  }
	                  break singleGridLoop;
	                }
	              }
	            }
	            if (debug) {
	              fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
	              fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
	            }
	          }
	        }
	      }

	      if (debug) {
	        fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
	        fctx.fillRect(bounds[3] * g,
	                      bounds[0] * g,
	                      (bounds[1] - bounds[3] + 1) * g,
	                      (bounds[2] - bounds[0] + 1) * g);
	      }

	      // Return information needed to create the text on the real canvas
	      return {
	        mu: mu,
	        occupied: occupied,
	        bounds: bounds,
	        gw: cgw,
	        gh: cgh,
	        fillTextOffsetX: fillTextOffsetX,
	        fillTextOffsetY: fillTextOffsetY,
	        fillTextWidth: fw,
	        fillTextHeight: fh,
	        fontSize: fontSize
	      };
	    };

	    /* Determine if there is room available in the given dimension */
	    var canFitText = function canFitText(gx, gy, gw, gh, occupied) {
	      // Go through the occupied points,
	      // return false if the space is not available.
	      var i = occupied.length;
	      while (i--) {
	        var px = gx + occupied[i][0];
	        var py = gy + occupied[i][1];

	        if (px >= ngx || py >= ngy || px < 0 || py < 0) {
	          if (!settings.drawOutOfBound) {
	            return false;
	          }
	          continue;
	        }

	        if (!grid[px][py]) {
	          return false;
	        }
	      }
	      return true;
	    };

	    /* Actually draw the text on the grid */
	    var drawText = function drawText(gx, gy, info, word, weight,
	                                     distance, theta, rotateDeg, attributes) {

	      var fontSize = info.fontSize;
	      var color;
	      if (getTextColor) {
	        color = getTextColor(word, weight, fontSize, distance, theta);
	      } else {
	        color = settings.color;
	      }

	      var classes;
	      if (getTextClasses) {
	        classes = getTextClasses(word, weight, fontSize, distance, theta);
	      } else {
	        classes = settings.classes;
	      }

	      var dimension;
	      var bounds = info.bounds;
	      dimension = {
	        x: (gx + bounds[3]) * g,
	        y: (gy + bounds[0]) * g,
	        w: (bounds[1] - bounds[3] + 1) * g,
	        h: (bounds[2] - bounds[0] + 1) * g
	      };

	      elements.forEach(function(el) {
	        if (el.getContext) {
	          var ctx = el.getContext('2d');
	          var mu = info.mu;

	          // Save the current state before messing it
	          ctx.save();
	          ctx.scale(1 / mu, 1 / mu);

	          ctx.font = settings.fontWeight + ' ' +
	                     (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;
	          ctx.fillStyle = color;

	          // Translate the canvas position to the origin coordinate of where
	          // the text should be put.
	          ctx.translate((gx + info.gw / 2) * g * mu,
	                        (gy + info.gh / 2) * g * mu);

	          if (rotateDeg !== 0) {
	            ctx.rotate(- rotateDeg);
	          }

	          // Finally, fill the text.

	          // XXX: We cannot because textBaseline = 'top' here because
	          // Firefox and Chrome uses different default line-height for canvas.
	          // Please read https://bugzil.la/737852#c6.
	          // Here, we use textBaseline = 'middle' and draw the text at exactly
	          // 0.5 * fontSize lower.
	          ctx.textBaseline = 'middle';
	          ctx.fillText(word, info.fillTextOffsetX * mu,
	                             (info.fillTextOffsetY + fontSize * 0.5) * mu);

	          // The below box is always matches how <span>s are positioned
	          /* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
	            info.fillTextWidth, info.fillTextHeight); */

	          // Restore the state.
	          ctx.restore();
	        } else {
	          // drawText on DIV element
	          var span = document.createElement('span');
	          var transformRule = '';
	          transformRule = 'rotate(' + (- rotateDeg / Math.PI * 180) + 'deg) ';
	          if (info.mu !== 1) {
	            transformRule +=
	              'translateX(-' + (info.fillTextWidth / 4) + 'px) ' +
	              'scale(' + (1 / info.mu) + ')';
	          }
	          var styleRules = {
	            'position': 'absolute',
	            'display': 'block',
	            'font': settings.fontWeight + ' ' +
	                    (fontSize * info.mu) + 'px ' + settings.fontFamily,
	            'left': ((gx + info.gw / 2) * g + info.fillTextOffsetX) + 'px',
	            'top': ((gy + info.gh / 2) * g + info.fillTextOffsetY) + 'px',
	            'width': info.fillTextWidth + 'px',
	            'height': info.fillTextHeight + 'px',
	            'lineHeight': fontSize + 'px',
	            'whiteSpace': 'nowrap',
	            'transform': transformRule,
	            'webkitTransform': transformRule,
	            'msTransform': transformRule,
	            'transformOrigin': '50% 40%',
	            'webkitTransformOrigin': '50% 40%',
	            'msTransformOrigin': '50% 40%'
	          };
	          if (color) {
	            styleRules.color = color;
	          }
	          span.textContent = word;
	          for (var cssProp in styleRules) {
	            span.style[cssProp] = styleRules[cssProp];
	          }
	          if (attributes) {
	            for (var attribute in attributes) {
	              span.setAttribute(attribute, attributes[attribute]);
	            }
	          }
	          if (classes) {
	            span.className += classes;
	          }
	          el.appendChild(span);
	        }
	      });
	    };

	    /* Help function to updateGrid */
	    var fillGridAt = function fillGridAt(x, y, drawMask, dimension, item) {
	      if (x >= ngx || y >= ngy || x < 0 || y < 0) {
	        return;
	      }

	      grid[x][y] = false;

	      if (drawMask) {
	        var ctx = elements[0].getContext('2d');
	        ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);
	      }

	      if (interactive) {
	        infoGrid[x][y] = { item: item, dimension: dimension };
	      }
	    };

	    /* Update the filling information of the given space with occupied points.
	       Draw the mask on the canvas if necessary. */
	    var updateGrid = function updateGrid(gx, gy, gw, gh, info, item) {
	      var occupied = info.occupied;
	      var drawMask = settings.drawMask;
	      var ctx;
	      if (drawMask) {
	        ctx = elements[0].getContext('2d');
	        ctx.save();
	        ctx.fillStyle = settings.maskColor;
	      }

	      var dimension;
	      if (interactive) {
	        var bounds = info.bounds;
	        dimension = {
	          x: (gx + bounds[3]) * g,
	          y: (gy + bounds[0]) * g,
	          w: (bounds[1] - bounds[3] + 1) * g,
	          h: (bounds[2] - bounds[0] + 1) * g
	        };
	      }

	      var i = occupied.length;
	      while (i--) {
	        var px = gx + occupied[i][0];
	        var py = gy + occupied[i][1];

	        if (px >= ngx || py >= ngy || px < 0 || py < 0) {
	          continue;
	        }

	        fillGridAt(px, py, drawMask, dimension, item);
	      }

	      if (drawMask) {
	        ctx.restore();
	      }
	    };

	    /* putWord() processes each item on the list,
	       calculate it's size and determine it's position, and actually
	       put it on the canvas. */
	    var putWord = function putWord(item) {
	      var word, weight, attributes;
	      if (Array.isArray(item)) {
	        word = item[0];
	        weight = item[1];
	      } else {
	        word = item.word;
	        weight = item.weight;
	        attributes = item.attributes;
	      }
	      var rotateDeg = getRotateDeg();

	      // get info needed to put the text onto the canvas
	      var info = getTextInfo(word, weight, rotateDeg);

	      // not getting the info means we shouldn't be drawing this one.
	      if (!info) {
	        return false;
	      }

	      if (exceedTime()) {
	        return false;
	      }

	      // If drawOutOfBound is set to false,
	      // skip the loop if we have already know the bounding box of
	      // word is larger than the canvas.
	      if (!settings.drawOutOfBound) {
	        var bounds = info.bounds;
	        if ((bounds[1] - bounds[3] + 1) > ngx ||
	          (bounds[2] - bounds[0] + 1) > ngy) {
	          return false;
	        }
	      }

	      // Determine the position to put the text by
	      // start looking for the nearest points
	      var r = maxRadius + 1;

	      var tryToPutWordAtPoint = function(gxy) {
	        var gx = Math.floor(gxy[0] - info.gw / 2);
	        var gy = Math.floor(gxy[1] - info.gh / 2);
	        var gw = info.gw;
	        var gh = info.gh;

	        // If we cannot fit the text at this position, return false
	        // and go to the next position.
	        if (!canFitText(gx, gy, gw, gh, info.occupied)) {
	          return false;
	        }

	        // Actually put the text on the canvas
	        drawText(gx, gy, info, word, weight,
	                 (maxRadius - r), gxy[2], rotateDeg, attributes);

	        // Mark the spaces on the grid as filled
	        updateGrid(gx, gy, gw, gh, info, item);

	        return {
	          gx: gx,
	          gy: gy,
	          rot: rotateDeg,
	          info: info
	        };
	      };

	      while (r--) {
	        var points = getPointsAtRadius(maxRadius - r);

	        if (settings.shuffle) {
	          points = [].concat(points);
	          shuffleArray(points);
	        }

	        // Try to fit the words by looking at each point.
	        // array.some() will stop and return true
	        // when putWordAtPoint() returns true.
	        for (var i = 0; i < points.length; i++) {
	          var res = tryToPutWordAtPoint(points[i]);
	          if (res) {
	            return res;
	          }
	        }

	        // var drawn = points.some(tryToPutWordAtPoint);
	        // if (drawn) {
	        //   // leave putWord() and return true
	        //   return true;
	        // }
	      }
	      // we tried all distances but text won't fit, return null
	      return null;
	    };

	    /* Send DOM event to all elements. Will stop sending event and return
	       if the previous one is canceled (for cancelable events). */
	    var sendEvent = function sendEvent(type, cancelable, detail) {
	      if (cancelable) {
	        return !elements.some(function(el) {
	          var evt = document.createEvent('CustomEvent');
	          evt.initCustomEvent(type, true, cancelable, detail || {});
	          return !el.dispatchEvent(evt);
	        }, this);
	      } else {
	        elements.forEach(function(el) {
	          var evt = document.createEvent('CustomEvent');
	          evt.initCustomEvent(type, true, cancelable, detail || {});
	          el.dispatchEvent(evt);
	        }, this);
	      }
	    };

	    /* Start drawing on a canvas */
	    var start = function start() {
	      // For dimensions, clearCanvas etc.,
	      // we only care about the first element.
	      var canvas = elements[0];

	      if (canvas.getContext) {
	        ngx = Math.ceil(canvas.width / g);
	        ngy = Math.ceil(canvas.height / g);
	      } else {
	        var rect = canvas.getBoundingClientRect();
	        ngx = Math.ceil(rect.width / g);
	        ngy = Math.ceil(rect.height / g);
	      }

	      // Sending a wordcloudstart event which cause the previous loop to stop.
	      // Do nothing if the event is canceled.
	      if (!sendEvent('wordcloudstart', true)) {
	        return;
	      }

	      // Determine the center of the word cloud
	      center = (settings.origin) ?
	        [settings.origin[0]/g, settings.origin[1]/g] :
	        [ngx / 2, ngy / 2];

	      // Maxium radius to look for space
	      maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));

	      /* Clear the canvas only if the clearCanvas is set,
	         if not, update the grid to the current canvas state */
	      grid = [];

	      var gx, gy, i;
	      if (!canvas.getContext || settings.clearCanvas) {
	        elements.forEach(function(el) {
	          if (el.getContext) {
	            var ctx = el.getContext('2d');
	            ctx.fillStyle = settings.backgroundColor;
	            ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
	            ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
	          } else {
	            el.textContent = '';
	            el.style.backgroundColor = settings.backgroundColor;
	            el.style.position = 'relative';
	          }
	        });

	        /* fill the grid with empty state */
	        gx = ngx;
	        while (gx--) {
	          grid[gx] = [];
	          gy = ngy;
	          while (gy--) {
	            grid[gx][gy] = true;
	          }
	        }
	      } else {
	        /* Determine bgPixel by creating
	           another canvas and fill the specified background color. */
	        var bctx = document.createElement('canvas').getContext('2d');

	        bctx.fillStyle = settings.backgroundColor;
	        bctx.fillRect(0, 0, 1, 1);
	        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

	        /* Read back the pixels of the canvas we got to tell which part of the
	           canvas is empty.
	           (no clearCanvas only works with a canvas, not divs) */
	        var imageData =
	          canvas.getContext('2d').getImageData(0, 0, ngx * g, ngy * g).data;

	        gx = ngx;
	        var x, y;
	        while (gx--) {
	          grid[gx] = [];
	          gy = ngy;
	          while (gy--) {
	            y = g;
	            singleGridLoop: while (y--) {
	              x = g;
	              while (x--) {
	                i = 4;
	                while (i--) {
	                  if (imageData[((gy * g + y) * ngx * g +
	                                 (gx * g + x)) * 4 + i] !== bgPixel[i]) {
	                    grid[gx][gy] = false;
	                    break singleGridLoop;
	                  }
	                }
	              }
	            }
	            if (grid[gx][gy] !== false) {
	              grid[gx][gy] = true;
	            }
	          }
	        }

	        imageData = bctx = bgPixel = undefined;
	      }

	      // fill the infoGrid with empty state if we need it
	      if (settings.hover || settings.click) {

	        interactive = true;

	        /* fill the grid with empty state */
	        gx = ngx + 1;
	        while (gx--) {
	          infoGrid[gx] = [];
	        }

	        if (settings.hover) {
	          canvas.addEventListener('mousemove', wordcloudhover);
	        }

	        if (settings.click) {
	          canvas.addEventListener('click', wordcloudclick);
	          canvas.addEventListener('touchstart', wordcloudclick);
	          canvas.addEventListener('touchend', function (e) {
	            e.preventDefault();
	          });
	          canvas.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
	        }

	        canvas.addEventListener('wordcloudstart', function stopInteraction() {
	          canvas.removeEventListener('wordcloudstart', stopInteraction);

	          canvas.removeEventListener('mousemove', wordcloudhover);
	          canvas.removeEventListener('click', wordcloudclick);
	          hovered = undefined;
	        });
	      }

	      i = 0;
	      var loopingFunction, stoppingFunction;
	      if (settings.wait !== 0) {
	        loopingFunction = window.setTimeout;
	        stoppingFunction = window.clearTimeout;
	      } else {
	        loopingFunction = window.setImmediate;
	        stoppingFunction = window.clearImmediate;
	      }

	      var addEventListener = function addEventListener(type, listener) {
	        elements.forEach(function(el) {
	          el.addEventListener(type, listener);
	        }, this);
	      };

	      var removeEventListener = function removeEventListener(type, listener) {
	        elements.forEach(function(el) {
	          el.removeEventListener(type, listener);
	        }, this);
	      };

	      var anotherWordCloudStart = function anotherWordCloudStart() {
	        removeEventListener('wordcloudstart', anotherWordCloudStart);
	        stoppingFunction(timer);
	      };

	      addEventListener('wordcloudstart', anotherWordCloudStart);

	      var timer = loopingFunction(function loop() {
	        if (i >= settings.list.length) {
	          stoppingFunction(timer);
	          sendEvent('wordcloudstop', false);
	          removeEventListener('wordcloudstart', anotherWordCloudStart);

	          return;
	        }
	        escapeTime = (new Date()).getTime();
	        var drawn = putWord(settings.list[i]);
	        var canceled = !sendEvent('wordclouddrawn', true, {
	          item: settings.list[i], drawn: drawn });
	        if (exceedTime() || canceled) {
	          stoppingFunction(timer);
	          settings.abort();
	          sendEvent('wordcloudabort', false);
	          sendEvent('wordcloudstop', false);
	          removeEventListener('wordcloudstart', anotherWordCloudStart);
	          return;
	        }
	        i++;
	        timer = loopingFunction(loop, settings.wait);
	      }, settings.wait);
	    };

	    // All set, start the drawing
	    start();
	  };

	  WordCloud.isSupported = isSupported;
	  WordCloud.minFontSize = minFontSize;

	  // Expose the library as an AMD module
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return WordCloud; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module.exports) {
	    module.exports = WordCloud;
	  } else {
	    global.WordCloud = WordCloud;
	  }

	})(this); //jshint ignore:line

/***/ }
/******/ ])
});
;