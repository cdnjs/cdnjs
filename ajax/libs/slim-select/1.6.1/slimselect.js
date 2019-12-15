(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SlimSelect"] = factory();
	else
		root["SlimSelect"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function hasClassInTree(element, className, output) {
    if (output === void 0) { output = false; }
    if (output) {
        console.log(className);
    }
    function hasClass(element, className) {
        if (output) {
            console.log(element);
        }
        if (!(!className || !element || !element.classList || !element.classList.contains(className))) {
            return element;
        }
        return null;
    }
    function parentByClass(childElement, className) {
        if (!childElement || childElement === document) {
            return null;
        }
        else if (hasClass(childElement, className)) {
            return childElement;
        }
        else {
            return parentByClass(childElement.parentNode, className);
        }
    }
    return hasClass(element, className) || parentByClass(element, className);
}
exports.hasClassInTree = hasClassInTree;
function ensureElementInView(container, element) {
    // Determine container top and bottom
    var cTop = container.scrollTop + container.offsetTop; // Make sure to have offsetTop
    var cBottom = cTop + container.clientHeight;
    // Determine element top and bottom
    var eTop = element.offsetTop;
    var eBottom = eTop + element.clientHeight;
    // Check if out of view
    if (eTop < cTop) {
        container.scrollTop -= (cTop - eTop);
    }
    else if (eBottom > cBottom) {
        container.scrollTop += (eBottom - cBottom);
    }
}
exports.ensureElementInView = ensureElementInView;
function putContent(el, currentPosition, isOpen) {
    var height = el.offsetHeight;
    var rect = el.getBoundingClientRect();
    var elemTop = (isOpen ? rect.top : rect.top - height);
    var elemBottom = (isOpen ? rect.bottom : rect.bottom + height);
    if (elemTop <= 0) {
        return 'below';
    }
    if (elemBottom >= window.innerHeight) {
        return 'above';
    }
    return (isOpen ? currentPosition : 'below');
}
exports.putContent = putContent;
function debounce(func, wait, immediate) {
    if (wait === void 0) { wait = 100; }
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
exports.debounce = debounce;
function isValueInArrayOfObjects(selected, key, value) {
    if (!Array.isArray(selected)) {
        return selected[key] === value;
    }
    for (var i = 0; i < selected.length; i++) {
        if (selected[i] && selected[i][key] && selected[i][key] === value) {
            return true;
        }
    }
    return false;
}
exports.isValueInArrayOfObjects = isValueInArrayOfObjects;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(2);
__webpack_require__(3); // Needed for IE to use custom events
var config_1 = __webpack_require__(4);
var helper_1 = __webpack_require__(0);
var select_1 = __webpack_require__(5);
var data_1 = __webpack_require__(6);
var slim_1 = __webpack_require__(7);
var SlimSelect = /** @class */ (function () {
    function SlimSelect(info) {
        var _this = this;
        this.addable = null;
        this.beforeOnChange = null;
        this.onChange = null;
        this.validate(info);
        var selectElement = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select);
        // If select already has a slim select id on it lets destroy it first
        if (selectElement.dataset.ssid) {
            this.destroy(selectElement.dataset.ssid);
        }
        // Add addable if option is passed in
        if (info.addable) {
            this.addable = info.addable;
        }
        this.config = new config_1["default"]({
            select: selectElement,
            showSearch: info.showSearch,
            searchText: info.searchText,
            closeOnSelect: info.closeOnSelect,
            showContent: info.showContent,
            placeholderText: info.placeholder,
            isEnabled: info.isEnabled
        });
        this.select = new select_1["default"]({
            select: selectElement,
            main: this
        });
        this.data = new data_1["default"]({
            main: this
        });
        this.slim = new slim_1["default"]({ main: this });
        // Add after original select element
        this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling);
        // If data is passed in lets set it
        // and thus will start the render
        if (info.data) {
            this.setData(info.data);
        }
        else {
            // Do an initial render on startup
            this.render();
        }
        // Add onclick listener to document to closeContent if clicked outside
        document.addEventListener('click', function (e) {
            if (!helper_1.hasClassInTree(e.target, _this.config.id)) {
                // console.log(hasClassInTree(e.target, this.config.id, !this.config.closeOnSelect))
                _this.close();
            }
        });
        window.addEventListener('scroll', helper_1.debounce(function (e) {
            if (_this.data.contentOpen && _this.config.showContent === 'auto') {
                if (helper_1.putContent(_this.slim.content, _this.data.contentPosition, _this.data.contentOpen) === 'above') {
                    _this.moveContentAbove();
                }
                else {
                    _this.moveContentBelow();
                }
            }
        }), false);
        // Add event callbacks after everthing has been created
        if (info.beforeOnChange) {
            this.beforeOnChange = info.beforeOnChange;
        }
        if (info.onChange) {
            this.onChange = info.onChange;
        }
    }
    SlimSelect.prototype.validate = function (info) {
        var select = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select);
        if (!select) {
            throw new Error('Could not find select element');
        }
        if (select.tagName !== 'SELECT') {
            throw new Error('Element isnt of type select');
        }
    };
    // Sets value of the select, adds it to data and original select
    SlimSelect.prototype.set = function (value, type, close, render) {
        if (type === void 0) { type = 'value'; }
        if (close === void 0) { close = true; }
        if (render === void 0) { render = true; }
        if (this.config.isMultiple && !Array.isArray(value)) {
            this.data.addToSelected(value, type);
        }
        else {
            this.data.setSelected(value, type);
        }
        this.select.setValue();
        this.data.onDataChange(); // Trigger on change callback
        this.render();
        if (close) {
            this.close();
        }
    };
    SlimSelect.prototype.setData = function (data) {
        // Validate data if passed in
        var isValid = data_1.validateData(data);
        if (!isValid) {
            console.error('Validation problem on: #' + this.select.element.id);
            return;
        } // If data passed in is not valid DO NOT parse, set and render
        var newData = JSON.parse(JSON.stringify(data));
        this.select.create(newData);
        this.data.parseSelectData();
        this.data.setSelectedFromSelect();
        this.render();
    };
    // addData will append to the current data set
    SlimSelect.prototype.addData = function (data) {
        // Validate data if passed in
        var isValid = data_1.validateData([data]);
        if (!isValid) {
            console.error('Validation problem on: #' + this.select.element.id);
            return;
        } // If data passed in is not valid DO NOT parse, set and render
        var option = this.data.newOption(data);
        this.data.add(option);
        this.select.create(this.data.data);
        this.data.parseSelectData();
        this.data.setSelectedFromSelect();
        this.render();
    };
    // Open content section
    SlimSelect.prototype.open = function () {
        // Dont open if disabled
        if (!this.config.isEnabled) {
            return;
        }
        this.slim.search.input.focus();
        // Dont do anything if the content is already open
        if (this.data.contentOpen) {
            return;
        }
        if (this.config.isMultiple) {
            this.slim.multiSelected.plus.classList.add('ss-cross');
        }
        else {
            this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down');
            this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up');
        }
        this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add((this.data.contentPosition === 'above' ? this.config.openAbove : this.config.openBelow));
        this.slim.content.classList.add(this.config.open);
        // Check showContent to see if they want to specifically show in a certain direction
        if (this.config.showContent.toLowerCase() === 'up') {
            this.moveContentAbove();
        }
        else if (this.config.showContent.toLowerCase() === 'down') {
            this.moveContentBelow();
        }
        else {
            // Auto identify where to put it
            if (helper_1.putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
                this.moveContentAbove();
            }
            else {
                this.moveContentBelow();
            }
        }
        this.data.contentOpen = true;
    };
    // Close content section
    SlimSelect.prototype.close = function () {
        var _this = this;
        // Dont do anything if the content is already closed
        if (!this.data.contentOpen) {
            return;
        }
        // this.slim.search.input.blur() // Removed due to safari quirk
        if (this.config.isMultiple) {
            this.slim.multiSelected.container.classList.remove(this.config.openAbove);
            this.slim.multiSelected.container.classList.remove(this.config.openBelow);
            this.slim.multiSelected.plus.classList.remove('ss-cross');
        }
        else {
            this.slim.singleSelected.container.classList.remove(this.config.openAbove);
            this.slim.singleSelected.container.classList.remove(this.config.openBelow);
            this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-down');
            this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-up');
        }
        this.slim.content.classList.remove(this.config.open);
        this.data.contentOpen = false;
        this.search(''); // Clear search
        // Reset the content below
        setTimeout(function () {
            _this.slim.content.removeAttribute('style');
            _this.data.contentPosition = 'below';
            _this.slim[(_this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(_this.config.openAbove);
            _this.slim[(_this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(_this.config.openBelow);
        }, 300);
    };
    SlimSelect.prototype.moveContentAbove = function () {
        var selectHeight = (this.config.isMultiple ? this.slim.multiSelected.container.offsetHeight : this.slim.singleSelected.container.offsetHeight);
        var contentHeight = this.slim.content.offsetHeight;
        var height = selectHeight + contentHeight - 1;
        this.slim.content.style.margin = '-' + height + 'px 0 0 0';
        this.slim.content.style['transform-origin'] = 'center bottom';
        this.data.contentPosition = 'above';
        this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openBelow);
        this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add(this.config.openAbove);
    };
    SlimSelect.prototype.moveContentBelow = function () {
        this.slim.content.removeAttribute('style');
        this.data.contentPosition = 'below';
        this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openAbove);
        this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add(this.config.openBelow);
    };
    // Set to enabled, remove disabled classes and removed disabled from original select
    SlimSelect.prototype.enable = function () {
        this.config.isEnabled = true;
        if (this.config.isMultiple) {
            this.slim.multiSelected.container.classList.remove(this.config.disabled);
        }
        else {
            this.slim.singleSelected.container.classList.remove(this.config.disabled);
        }
        // Disable original select but dont trigger observer
        this.select.disconnectMutationObserver();
        this.select.element.disabled = false;
        this.slim.search.input.disabled = false;
        this.select.observeMutationObserver();
    };
    // Set to disabled, add disabled classes and add disabled to original select
    SlimSelect.prototype.disable = function () {
        this.config.isEnabled = false;
        if (this.config.isMultiple) {
            this.slim.multiSelected.container.classList.add(this.config.disabled);
        }
        else {
            this.slim.singleSelected.container.classList.add(this.config.disabled);
        }
        // Enable original select but dont trigger observer
        this.select.disconnectMutationObserver();
        this.select.element.disabled = true;
        this.slim.search.input.disabled = true;
        this.select.observeMutationObserver();
    };
    // Take in string value and search current options
    SlimSelect.prototype.search = function (value) {
        // Only filter data and rerender if value has changed
        if (this.data.searchValue !== value) {
            this.slim.search.input.value = value;
            this.data.search(value);
            this.render();
        }
    };
    SlimSelect.prototype.render = function () {
        if (this.config.isMultiple) {
            this.slim.values();
        }
        else {
            this.slim.placeholder();
        }
        this.slim.options();
    };
    // Display original select again and remove slim
    SlimSelect.prototype.destroy = function (id) {
        if (id === void 0) { id = null; }
        var slim = (id ? document.querySelector('.' + id) : this.slim.container);
        var select = (id ? document.querySelector("[data-ssid=" + id + "]") : this.select.element);
        // If there is no slim dont do anything
        if (!slim || !select) {
            return;
        }
        // Show original select
        select.style.display = null;
        delete select.dataset.ssid;
        // Remove slim select
        if (slim.parentElement) {
            slim.parentElement.removeChild(slim);
        }
    };
    return SlimSelect;
}());
exports["default"] = SlimSelect;
(module).exports = SlimSelect;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var config = /** @class */ (function () {
    function config(info) {
        this.id = '';
        this.isMultiple = false;
        this.showSearch = true;
        this.closeOnSelect = true;
        this.showContent = 'auto'; // options: auto, up, down
        this.searchText = 'No Results';
        this.placeholderText = 'Select Value';
        this.isEnabled = true;
        // Classes
        this.main = 'ss-main';
        this.singleSelected = 'ss-single-selected';
        this.arrow = 'ss-arrow';
        this.multiSelected = 'ss-multi-selected';
        this.add = 'ss-add';
        this.plus = 'ss-plus';
        this.values = 'ss-values';
        this.value = 'ss-value';
        this.valueText = 'ss-value-text';
        this.valueDelete = 'ss-value-delete';
        this.content = 'ss-content';
        this.open = 'ss-open';
        this.openAbove = 'ss-open-above';
        this.openBelow = 'ss-open-below';
        this.search = 'ss-search';
        this.addable = 'ss-addable';
        this.list = 'ss-list';
        this.optgroup = 'ss-optgroup';
        this.optgroupLabel = 'ss-optgroup-label';
        this.option = 'ss-option';
        this.highlighted = 'ss-highlighted';
        this.disabled = 'ss-disabled';
        this.hide = 'ss-hide';
        this.id = 'ss-' + Math.floor(Math.random() * 100000);
        this.style = info.select.style.cssText;
        this["class"] = info.select.classList;
        this.isMultiple = info.select.multiple;
        this.showSearch = (info.showSearch === false ? false : true);
        this.closeOnSelect = (info.closeOnSelect === false ? false : true);
        if (info.showContent) {
            this.showContent = info.showContent;
        }
        this.isEnabled = (info.isEnabled === false ? false : true);
        if (info.searchText) {
            this.searchText = info.searchText;
        }
        if (info.placeholderText) {
            this.placeholderText = info.placeholderText;
        }
    }
    return config;
}());
exports["default"] = config;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var select = /** @class */ (function () {
    function select(info) {
        this.element = info.select;
        this.main = info.main;
        // If original select is set to disabled lets make sure slim is too
        if (this.element.disabled) {
            this.main.config.isEnabled = false;
        }
        this.addAttributes();
        this.addEventListeners();
        this.addMutationObserver();
    }
    select.prototype.setValue = function () {
        if (!this.main.data.getSelected()) {
            return;
        }
        if (this.main.config.isMultiple) {
            // If multiple loop through options and set selected
            var selected = this.main.data.getSelected();
            var options = this.element.options;
            for (var o = 0; o < options.length; o++) {
                var option = options[o];
                option.selected = false;
                for (var s = 0; s < selected.length; s++) {
                    if (selected[s].value === option.value) {
                        option.selected = true;
                    }
                }
            }
        }
        else {
            // If single select simply set value
            var selected = this.main.data.getSelected();
            this.element.value = (selected ? selected.value : '');
        }
        // Do not trigger onChange callbacks for this event listener
        this.main.data.isOnChangeEnabled = false;
        this.element.dispatchEvent(new CustomEvent('change'));
        this.main.data.isOnChangeEnabled = true;
    };
    select.prototype.addAttributes = function () {
        this.element.tabIndex = -1;
        this.element.style.display = 'none';
        // Add slim select id
        this.element.dataset.ssid = this.main.config.id;
    };
    // Add onChange listener to original select
    select.prototype.addEventListeners = function () {
        var _this = this;
        this.element.addEventListener('change', function (e) {
            _this.main.data.setSelectedFromSelect();
            _this.main.render();
        });
    };
    // Add MutationObserver to select
    select.prototype.addMutationObserver = function () {
        var _this = this;
        this.mutationObserver = new MutationObserver(function (mutations) {
            _this.main.data.parseSelectData();
            _this.main.data.setSelectedFromSelect();
            _this.main.render();
        });
        this.observeMutationObserver();
    };
    select.prototype.observeMutationObserver = function () {
        this.mutationObserver.observe(this.element, {
            attributes: true,
            childList: true,
            characterData: true
        });
    };
    select.prototype.disconnectMutationObserver = function () {
        this.mutationObserver.disconnect();
    };
    // Create select element and optgroup/options
    select.prototype.create = function (data) {
        // Clear out select
        this.element.innerHTML = '';
        for (var i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty('options')) {
                var optgroupObject = data[i];
                var optgroup = document.createElement('optgroup');
                optgroup.label = optgroupObject.label;
                for (var o = 0; o < optgroupObject.options.length; o++) {
                    optgroup.appendChild(this.createOption(optgroupObject.options[o]));
                }
                this.element.appendChild(optgroup);
            }
            else {
                this.element.appendChild(this.createOption(data[i]));
            }
        }
    };
    select.prototype.createOption = function (info) {
        var option = document.createElement('option');
        option.value = info.value || info.text;
        option.innerHTML = info.innerHTML || info.text;
        if (info.selected) {
            option.selected = info.selected;
        }
        if (info.disabled) {
            option.disabled = true;
        }
        if (info.placeholder) {
            option.setAttribute('data-placeholder', 'true');
        }
        if (info.data && typeof info.data === 'object') {
            Object.keys(info.data).forEach(function (key) {
                option.setAttribute('data-' + key, info.data[key]);
            });
        }
        return option;
    };
    return select;
}());
exports["default"] = select;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
// Class is responsible for managing the data
var data = /** @class */ (function () {
    function data(info) {
        this.contentOpen = false;
        this.contentPosition = 'below';
        this.isOnChangeEnabled = true;
        this.main = info.main;
        this.searchValue = '';
        this.data = [];
        this.filtered = null;
        this.parseSelectData();
        this.setSelectedFromSelect();
    }
    data.prototype.newOption = function (info) {
        return {
            id: (info.id ? info.id : String(Math.floor(Math.random() * 100000000))),
            value: (info.value ? info.value : ''),
            text: (info.text ? info.text : ''),
            innerHTML: (info.innerHTML ? info.innerHTML : ''),
            selected: (info.selected ? info.selected : false),
            disabled: (info.disabled ? info.disabled : false),
            placeholder: (info.placeholder ? info.placeholder : ''),
            data: (info.data ? info.data : {})
        };
    };
    // Add to the current data array
    data.prototype.add = function (data) {
        var dataObject = {
            id: String(Math.floor(Math.random() * 100000000)),
            value: data.value,
            text: data.text,
            innerHTML: '',
            selected: false,
            disabled: false,
            placeholder: '',
            data: {}
        };
        this.data.push(dataObject);
    };
    // From passed in select element pull optgroup and options into data
    data.prototype.parseSelectData = function () {
        this.data = [];
        // Loop through nodes and create data
        var element = this.main.select.element;
        var nodes = element.childNodes;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeName === 'OPTGROUP') {
                var node = nodes[i];
                var optgroup = {
                    label: node.label,
                    options: []
                };
                var options = nodes[i].childNodes;
                for (var ii = 0; ii < options.length; ii++) {
                    if (options[ii].nodeName === 'OPTION') {
                        optgroup.options.push(this.pullOptionData(options[ii]));
                    }
                }
                this.data.push(optgroup);
            }
            else if (nodes[i].nodeName === 'OPTION') {
                this.data.push(this.pullOptionData(nodes[i]));
            }
        }
    };
    // From passed in option pull pieces of usable information
    data.prototype.pullOptionData = function (option) {
        return {
            id: (option.dataset ? option.dataset.id : false) || String(Math.floor(Math.random() * 100000000)),
            value: option.value,
            text: option.text,
            innerHTML: option.innerHTML,
            selected: option.selected,
            disabled: option.disabled,
            placeholder: option.dataset.placeholder || null,
            data: option.dataset
        };
    };
    // From select element get current selected and set selected
    data.prototype.setSelectedFromSelect = function () {
        var options = this.main.select.element.options;
        if (this.main.config.isMultiple) {
            var newSelected = [];
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                if (option.selected) {
                    newSelected.push(this.getObjectFromData(option.value, 'value').id);
                }
            }
            this.setSelected(newSelected, 'id');
        }
        else {
            // Single select element
            if (options.selectedIndex !== -1) {
                var option = options[options.selectedIndex];
                var value = option.value;
                this.setSelected(value, 'value');
            }
        }
    };
    // From value set the selected value
    data.prototype.setSelected = function (value, type) {
        if (type === void 0) { type = 'id'; }
        // Loop through data and set selected values
        for (var i = 0; i < this.data.length; i++) {
            // Deal with optgroups
            if (this.data[i].hasOwnProperty('label')) {
                if (this.data[i].hasOwnProperty('options')) {
                    var options = this.data[i].options;
                    for (var o = 0; o < options.length; o++) {
                        options[o].selected = this.shouldBeSelected(options[o], value, type);
                    }
                }
            }
            else {
                this.data[i].selected = this.shouldBeSelected(this.data[i], value, type);
            }
        }
    };
    // Determines whether or not passed in option should be selected based upon possible values
    data.prototype.shouldBeSelected = function (option, value, type) {
        if (type === void 0) { type = 'id'; }
        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                if (String(option[type]) === String(value[i])) {
                    return true;
                }
            }
        }
        else {
            if (String(option[type]) === String(value)) {
                return true;
            }
        }
        return false;
    };
    // From data get option | option[] of selected values
    // If single select return last selected value
    data.prototype.getSelected = function () {
        var value = null;
        var values = [];
        for (var i = 0; i < this.data.length; i++) {
            // Deal with optgroups
            if (this.data[i].hasOwnProperty('label')) {
                if (this.data[i].hasOwnProperty('options')) {
                    var options = this.data[i].options;
                    for (var o = 0; o < options.length; o++) {
                        if (options[o].selected) {
                            // If single return option
                            if (!this.main.config.isMultiple) {
                                value = options[o];
                            }
                            else {
                                // Push to multiple array
                                values.push(options[o]);
                            }
                        }
                    }
                }
            }
            else {
                // Push options to array
                if (this.data[i].selected) {
                    // If single return option
                    if (!this.main.config.isMultiple) {
                        value = this.data[i];
                    }
                    else {
                        // Push to multiple array
                        values.push(this.data[i]);
                    }
                }
            }
        }
        // Either return array or object or null
        if (this.main.config.isMultiple) {
            return values;
        }
        return value;
    };
    // If select type is multiple append value and set selected
    data.prototype.addToSelected = function (value, type) {
        if (type === void 0) { type = 'id'; }
        if (this.main.config.isMultiple) {
            var values = [];
            var selected = this.getSelected();
            for (var i = 0; i < selected.length; i++) {
                values.push(selected[i][type]);
            }
            values.push(value);
            this.setSelected(values, type);
        }
    };
    // Remove object from selected
    data.prototype.removeFromSelected = function (value, type) {
        if (type === void 0) { type = 'id'; }
        if (this.main.config.isMultiple) {
            var values = [];
            var selected = this.getSelected();
            for (var i = 0; i < selected.length; i++) {
                if (String(selected[i][type]) !== String(value)) {
                    values.push(selected[i][type]);
                }
            }
            this.setSelected(values, type);
        }
    };
    // Trigger onChange callback
    data.prototype.onDataChange = function () {
        if (this.main.onChange && this.isOnChangeEnabled) {
            this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())));
        }
    };
    // Take in a value loop through the data till you find it and return it
    data.prototype.getObjectFromData = function (value, type) {
        if (type === void 0) { type = 'id'; }
        for (var i = 0; i < this.data.length; i++) {
            // If option check if value is the same
            if (type in this.data[i] && String(this.data[i][type]) === String(value)) {
                return this.data[i];
            }
            // If optgroup loop through options
            if (this.data[i].hasOwnProperty('options')) {
                var optgroupObject = this.data[i];
                for (var ii = 0; ii < optgroupObject.options.length; ii++) {
                    if (String(optgroupObject.options[ii][type]) === String(value)) {
                        return optgroupObject.options[ii];
                    }
                }
            }
        }
        return null;
    };
    // Take in search string and return filtered list of values
    data.prototype.search = function (search) {
        this.searchValue = search;
        if (search.trim() === '') {
            this.filtered = null;
            return;
        }
        var valuesArray = this.data.slice(0);
        search = search.trim().toLowerCase();
        var filtered = valuesArray.map(function (obj) {
            // If optgroup
            if (obj.hasOwnProperty('options')) {
                var optgroupObj = obj;
                var options = optgroupObj.options.filter(function (opt) {
                    return opt.text.toLowerCase().indexOf(search) !== -1;
                });
                if (options.length !== 0) {
                    var optgroup = Object.assign({}, optgroupObj); // Break pointer
                    optgroup.options = options;
                    return optgroup;
                }
            }
            // If single option
            if (obj.hasOwnProperty('text')) {
                var optionObj = obj;
                if (optionObj.text.toLowerCase().indexOf(search) !== -1) {
                    return obj;
                }
            }
            return null;
        });
        // Filter out false values
        this.filtered = filtered.filter(function (info) { return info; });
    };
    return data;
}());
exports["default"] = data;
function validateData(data) {
    if (!data) {
        console.error('Data must be an array of objects');
        return;
    }
    var isValid = false;
    var errorCount = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty('label')) {
            if (data[i].hasOwnProperty('options')) {
                var optgroup = data[i];
                var options = optgroup.options;
                for (var j = 0; j < options.length; j++) {
                    isValid = validateOption(options[j]);
                    if (!isValid) {
                        errorCount++;
                    }
                }
            }
        }
        else {
            var option = data[i];
            isValid = validateOption(option);
            if (!isValid) {
                errorCount++;
            }
        }
    }
    return errorCount === 0;
}
exports.validateData = validateData;
function validateOption(option) {
    if (option.text === undefined) {
        console.error('Data object option must have at least have a text value. Check object: ' + JSON.stringify(option));
        return false;
    }
    return true;
}
exports.validateOption = validateOption;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var helper_1 = __webpack_require__(0);
// Class is responsible for creating all the elements
var slim = /** @class */ (function () {
    function slim(info) {
        this.main = info.main;
        // Create elements in order of appending
        this.container = this.containerDiv();
        this.content = this.contentDiv();
        this.search = this.searchDiv();
        this.list = this.listDiv();
        this.options();
        if (this.main.config.isMultiple) {
            this.multiSelected = this.multiSelectedDiv();
            this.container.appendChild(this.multiSelected.container);
        }
        else {
            this.singleSelected = this.singleSelectedDiv();
            this.container.appendChild(this.singleSelected.container);
        }
        this.container.appendChild(this.content);
        this.content.appendChild(this.search.container);
        this.content.appendChild(this.list);
    }
    // Create main container
    slim.prototype.containerDiv = function () {
        // Create main container
        var container = document.createElement('div');
        container.classList.add(this.main.config.id);
        container.classList.add(this.main.config.main);
        // Add style and classes
        container.style.cssText = this.main.config.style;
        for (var i = 0; i < this.main.config["class"].length; i++) {
            container.classList.add(this.main.config["class"][i]);
        }
        return container;
    };
    slim.prototype.singleSelectedDiv = function () {
        var _this = this;
        var container = document.createElement('div');
        container.classList.add(this.main.config.singleSelected);
        // Placeholder text
        var placeholder = document.createElement('span');
        placeholder.classList.add('placeholder');
        container.appendChild(placeholder);
        // Arrow
        var arrowContainer = document.createElement('span');
        arrowContainer.classList.add(this.main.config.arrow);
        var arrowIcon = document.createElement('span');
        arrowIcon.classList.add('arrow-down');
        arrowContainer.appendChild(arrowIcon);
        container.appendChild(arrowContainer);
        // Add onclick for main selector div
        container.onclick = function () {
            if (!_this.main.config.isEnabled) {
                return;
            }
            _this.main.data.contentOpen ? _this.main.close() : _this.main.open();
        };
        return {
            container: container,
            placeholder: placeholder,
            arrowIcon: {
                container: arrowContainer,
                arrow: arrowIcon
            }
        };
    };
    // Based upon current selection set placeholder text
    slim.prototype.placeholder = function () {
        var selected = this.main.data.getSelected();
        // Placeholder display
        if (selected && selected.placeholder) {
            var placeholder = document.createElement('span');
            placeholder.classList.add(this.main.config.disabled);
            placeholder.innerHTML = this.main.config.placeholderText;
            this.singleSelected.placeholder.innerHTML = placeholder.outerHTML;
        }
        else {
            this.singleSelected.placeholder.innerHTML = (selected ? selected.innerHTML || selected.text : '');
        }
    };
    slim.prototype.multiSelectedDiv = function () {
        var _this = this;
        var container = document.createElement('div');
        container.classList.add(this.main.config.multiSelected);
        var values = document.createElement('div');
        values.classList.add(this.main.config.values);
        container.appendChild(values);
        var add = document.createElement('div');
        add.classList.add(this.main.config.add);
        var plus = document.createElement('span');
        plus.classList.add(this.main.config.plus);
        plus.onclick = function (e) {
            if (_this.main.data.contentOpen) {
                _this.main.close();
                e.stopPropagation();
            }
        };
        add.appendChild(plus);
        container.appendChild(add);
        container.onclick = function (e) {
            if (!_this.main.config.isEnabled) {
                return;
            }
            // Open only if you are not clicking on x text
            var target = e.target;
            if (!target.classList.contains(_this.main.config.valueDelete)) {
                _this.main.open();
            }
        };
        return {
            container: container,
            values: values,
            add: add,
            plus: plus
        };
    };
    // Get selected values and append to multiSelected values container
    // and remove those who shouldnt exist
    slim.prototype.values = function () {
        if (!this.main.config.isMultiple) {
            return;
        }
        var currentNodes = this.multiSelected.values.childNodes;
        var selected = this.main.data.getSelected();
        // Remove nodes that shouldnt be there
        var exists;
        for (var c = 0; c < currentNodes.length; c++) {
            exists = true;
            var node = currentNodes[c];
            for (var s = 0; s < selected.length; s++) {
                if (String(selected[s].id) === String(node.dataset.id)) {
                    exists = false;
                }
            }
            if (exists) {
                var node_1 = currentNodes[c];
                node_1.classList.add('ss-out');
                this.multiSelected.values.removeChild(node_1);
            }
        }
        // Add values that dont currently exist
        for (var s = 0; s < selected.length; s++) {
            exists = false;
            for (var c = 0; c < currentNodes.length; c++) {
                var node = currentNodes[c];
                if (selected[s].id === node.dataset.id) {
                    exists = true;
                }
            }
            if (!exists) {
                if (currentNodes.length === 0) {
                    this.multiSelected.values.appendChild(this.valueDiv(selected[s]));
                }
                else if (s === 0) {
                    this.multiSelected.values.insertBefore(this.valueDiv(selected[s]), currentNodes[s]);
                }
                else {
                    currentNodes[s - 1].insertAdjacentElement('afterend', this.valueDiv(selected[s]));
                }
            }
        }
        // If there are no values set placeholder
        if (selected.length === 0) {
            var placeholder = document.createElement('span');
            placeholder.classList.add(this.main.config.disabled);
            placeholder.innerHTML = this.main.config.placeholderText;
            this.multiSelected.values.innerHTML = placeholder.outerHTML;
        }
    };
    slim.prototype.valueDiv = function (option) {
        var _this = this;
        var value = document.createElement('div');
        value.classList.add(this.main.config.value);
        value.dataset.id = option.id;
        var text = document.createElement('span');
        text.classList.add(this.main.config.valueText);
        text.innerHTML = option.text;
        value.appendChild(text);
        var deleteSpan = document.createElement('span');
        deleteSpan.classList.add(this.main.config.valueDelete);
        deleteSpan.innerHTML = 'x';
        deleteSpan.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!_this.main.config.isEnabled) {
                return;
            }
            if (_this.main.beforeOnChange) {
                var selected = _this.main.data.getSelected();
                var currentValues = JSON.parse(JSON.stringify(selected));
                // Remove from current selection
                for (var i = 0; i < currentValues.length; i++) {
                    if (currentValues[i].id === option.id) {
                        currentValues.splice(i, 1);
                    }
                }
                var beforeOnchange = _this.main.beforeOnChange(currentValues);
                if (beforeOnchange !== false) {
                    _this.main.data.removeFromSelected(option.id, 'id');
                    _this.main.render();
                    _this.main.select.setValue();
                }
            }
            else {
                _this.main.data.removeFromSelected(option.id, 'id');
                _this.main.render();
                _this.main.select.setValue();
                _this.main.data.onDataChange(); // Trigger on change callback
            }
        };
        value.appendChild(deleteSpan);
        return value;
    };
    // Create content container
    slim.prototype.contentDiv = function () {
        var container = document.createElement('div');
        container.classList.add(this.main.config.content);
        return container;
    };
    slim.prototype.searchDiv = function () {
        var _this = this;
        var container = document.createElement('div');
        container.classList.add(this.main.config.search);
        // We still want the search to be tabable but not shown
        if (!this.main.config.showSearch) {
            container.classList.add(this.main.config.hide);
        }
        var input = document.createElement('input');
        input.type = 'search';
        input.placeholder = 'Search';
        input.tabIndex = 0;
        input.onclick = function (e) {
            setTimeout(function () {
                var target = e.target;
                if (target.value === '') {
                    _this.main.search('');
                }
            }, 10);
        };
        input.onkeydown = function (e) {
            if (e.key === 'ArrowUp') {
                _this.main.open();
                _this.highlightUp();
                e.preventDefault();
            }
            else if (e.key === 'ArrowDown') {
                _this.main.open();
                _this.highlightDown();
                e.preventDefault();
            }
            else if (e.key === 'Tab') {
                _this.main.close();
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
            }
        };
        input.onkeyup = function (e) {
            var target = e.target;
            if (e.key === 'Enter') {
                if (_this.main.addable && e.ctrlKey) {
                    addable.click();
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                var highlighted = _this.list.querySelector('.' + _this.main.config.highlighted);
                if (highlighted) {
                    highlighted.click();
                }
            }
            else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // Cancel out to leave for onkeydown to handle
            }
            else if (e.key === 'Escape') {
                _this.main.close();
            }
            else {
                _this.main.search(target.value);
            }
            e.preventDefault();
            e.stopPropagation();
        };
        input.onfocus = function () { _this.main.open(); };
        container.appendChild(input);
        if (this.main.addable) {
            var addable = document.createElement('div');
            addable.classList.add(this.main.config.addable);
            addable.innerHTML = '+';
            addable.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                var inputValue = _this.search.input.value;
                if (inputValue.trim() === '') {
                    _this.search.input.focus();
                    return;
                }
                var addableValue = _this.main.addable(inputValue);
                if (!addableValue) {
                    return;
                }
                var info = _this.main.data.newOption({
                    text: addableValue,
                    value: addableValue
                });
                _this.main.addData(info);
                _this.main.search('');
                setTimeout(function () {
                    _this.main.set(addableValue, 'value', false, false);
                }, 100);
                // Close it only if closeOnSelect = true
                if (_this.main.config.closeOnSelect) {
                    setTimeout(function () {
                        _this.main.close();
                    }, 100);
                }
            };
            container.appendChild(addable);
        }
        return {
            container: container,
            input: input,
            addable: addable
        };
    };
    slim.prototype.highlightUp = function () {
        var highlighted = this.list.querySelector('.' + this.main.config.highlighted);
        var prev = null;
        if (highlighted) {
            prev = highlighted.previousSibling;
            while (prev !== null) {
                if (prev.classList.contains(this.main.config.disabled)) {
                    prev = prev.previousSibling;
                    continue;
                }
                else {
                    break;
                }
            }
        }
        else {
            var allOptions = this.list.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
            prev = allOptions[allOptions.length - 1];
        }
        // Do not select if optgroup label
        if (prev && prev.classList.contains(this.main.config.optgroupLabel)) {
            prev = null;
        }
        // Check if parent is optgroup
        if (prev === null) {
            var parent = highlighted.parentNode;
            if (parent.classList.contains(this.main.config.optgroup)) {
                if (parent.previousSibling) {
                    var prevNodes = parent.previousSibling.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
                    if (prevNodes.length) {
                        prev = prevNodes[prevNodes.length - 1];
                    }
                }
            }
        }
        // If previous element exists highlight it
        if (prev) {
            if (highlighted) {
                highlighted.classList.remove(this.main.config.highlighted);
            }
            prev.classList.add(this.main.config.highlighted);
            helper_1.ensureElementInView(this.list, prev);
        }
    };
    slim.prototype.highlightDown = function () {
        var highlighted = this.list.querySelector('.' + this.main.config.highlighted);
        var next = null;
        if (highlighted) {
            next = highlighted.nextSibling;
            while (next !== null) {
                if (next.classList.contains(this.main.config.disabled)) {
                    next = next.nextSibling;
                    continue;
                }
                else {
                    break;
                }
            }
        }
        else {
            next = this.list.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
        }
        // Check if parent is optgroup
        if (next === null && highlighted !== null) {
            var parent = highlighted.parentNode;
            if (parent.classList.contains(this.main.config.optgroup)) {
                if (parent.nextSibling) {
                    var sibling = parent.nextSibling;
                    next = sibling.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
                }
            }
        }
        // If previous element exists highlight it
        if (next) {
            if (highlighted) {
                highlighted.classList.remove(this.main.config.highlighted);
            }
            next.classList.add(this.main.config.highlighted);
            helper_1.ensureElementInView(this.list, next);
        }
    };
    // Create main container that options will reside
    slim.prototype.listDiv = function () {
        var list = document.createElement('div');
        list.classList.add(this.main.config.list);
        list.onmousewheel = function (e) {
            var scrollTop = list.scrollTop, scrollHeight = list.scrollHeight, height = list.offsetHeight, delta = (e.type == 'DOMMouseScroll' ? e.detail * -40 : e.wheelDelta), up = delta > 0;
            var prevent = function () {
                e.stopPropagation();
                e.preventDefault();
                e.returnValue = false;
                return false;
            };
            if (!up && -delta > scrollHeight - height - scrollTop) {
                // Scrolling down, but this will take us past the bottom.
                list.scrollTop = scrollHeight;
                return prevent();
            }
            else if (up && delta > scrollTop) {
                // Scrolling up, but this will take us past the top.
                list.scrollTop = 0;
                return prevent();
            }
        };
        return list;
    };
    // Loop through data || filtered data and build options and append to list container
    slim.prototype.options = function () {
        var data = this.main.data.filtered || this.main.data.data;
        this.list.innerHTML = '';
        // If no results show no results text
        if (data.length === 0) {
            var noResults = document.createElement('div');
            noResults.classList.add(this.main.config.option);
            noResults.classList.add(this.main.config.disabled);
            noResults.innerHTML = this.main.config.searchText;
            this.list.appendChild(noResults);
            return;
        }
        // Append individual options to div container
        for (var i = 0; i < data.length; i++) {
            // Create optgroup
            if (data[i].hasOwnProperty('label')) {
                var item = data[i];
                var optgroup = document.createElement('div');
                optgroup.classList.add(this.main.config.optgroup);
                // Create label
                var optgroupLabel = document.createElement('div');
                optgroupLabel.classList.add(this.main.config.optgroupLabel);
                optgroupLabel.innerHTML = item.label;
                optgroup.appendChild(optgroupLabel);
                var options = item.options;
                for (var ii = 0; ii < options.length; ii++) {
                    optgroup.appendChild(this.option(options[ii]));
                }
                this.list.appendChild(optgroup);
            }
            else {
                this.list.appendChild(this.option(data[i]));
            }
        }
    };
    // Create single option
    slim.prototype.option = function (data) {
        // Add hidden placeholder
        if (data.placeholder) {
            var placeholder = document.createElement('div');
            placeholder.classList.add(this.main.config.option);
            placeholder.classList.add(this.main.config.hide);
            return placeholder;
        }
        var option = document.createElement('div');
        option.classList.add(this.main.config.option);
        var selected = this.main.data.getSelected();
        option.dataset.id = data.id;
        option.innerHTML = data.innerHTML;
        var master = this;
        option.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var element = this;
            var elementID = element.dataset.id;
            if (master.main.beforeOnChange) {
                var value = void 0;
                var objectInfo = JSON.parse(JSON.stringify(master.main.data.getObjectFromData(elementID)));
                objectInfo.selected = true;
                if (master.main.config.isMultiple) {
                    value = JSON.parse(JSON.stringify(selected));
                    value.push(objectInfo);
                }
                else {
                    value = JSON.parse(JSON.stringify(objectInfo));
                }
                var beforeOnchange = master.main.beforeOnChange(value);
                if (beforeOnchange !== false) {
                    master.main.set(elementID, 'id', master.main.config.closeOnSelect);
                }
            }
            else {
                master.main.set(elementID, 'id', master.main.config.closeOnSelect);
            }
        };
        if (data.disabled || (selected && helper_1.isValueInArrayOfObjects(selected, 'id', data.id))) {
            option.onclick = null;
            option.classList.add(this.main.config.disabled);
        }
        return option;
    };
    return slim;
}());
exports["default"] = slim;


/***/ })
/******/ ]);
});