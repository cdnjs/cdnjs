(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("ckeditor"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "ckeditor"], factory);
	else if(typeof exports === 'object')
		exports["ngCkeditor"] = factory(require("angular"), require("ckeditor"));
	else
		root["ngCkeditor"] = factory(root["angular"], root["CKEDITOR"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ckeditor__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ckeditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ckeditor__);
/*
 * autor: Miller Augusto S. Martins
 * e-mail: miller.augusto@gmail.com
 * github: miamarti
 * */




/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('ng.ckeditor', ['ng'])
.directive('ngCkeditor', ['$timeout', function ($timeout) {

    __WEBPACK_IMPORTED_MODULE_1_ckeditor___default.a.on('instanceCreated', function (event) {
        var editor = event.editor,
            element = editor.element;

        if (element.getAttribute('class') == 'simpleEditor') {
            editor.on('configLoaded', function () {
                editor.config.removePlugins = 'colorbutton,find,flash,font, forms,iframe,image,newpage,removeformat, smiley,specialchar,stylescombo,templates';
                editor.removeButtons = 'About';
                editor.config.toolbarGroups = [{
                    name: 'editing',
                    groups: ['basicstyles', 'links']
                }, {
                    name: 'undo'
                }, {
                    name: 'clipboard',
                    groups: ['selection', 'clipboard']
                }];
            });
        }
    });

    return {
        restrict: 'E',
        scope: {
            ngModel: '=ngModel',
            ngChange: '=ngChange',
            ngDisabled: '=ngDisabled',
            ngConfig: '=ngConfig'
        },
        link: function (scope, elem, attrs) {
            elem[0].innerHTML = '<div class="ng-ckeditor"></div> <div class="totalTypedCharacters"></div>';

            var elemEditor = elem[0].querySelectorAll('.ng-ckeditor');
            var config = {
                removeButtons: (attrs.removeButtons != undefined) ? 'About,' + attrs.removeButtons : 'About',
                readOnly: scope.ngDisabled ? scope.ngDisabled : false
            };
            if (attrs.removePlugins != undefined) {
                config.removePlugins = attrs.removePlugins;
            }
            if (attrs.skin != undefined) {
                config.skin = attrs.skin;
            }
            if (attrs.width != undefined) {
                config.width = attrs.width;
            }
            if (attrs.height != undefined) {
                config.height = attrs.height;
            }
            if (attrs.resizeEnabled != undefined) {
                config.resize_enabled = (attrs.resizeEnabled == "false") ? false : true;
            }

            var editor = __WEBPACK_IMPORTED_MODULE_1_ckeditor___default.a.appendTo(elemEditor[0], (scope.ngConfig ? scope.ngConfig : config), '');

            var addEventListener = function (editor) {
                (editor).on('change', function (evt) {
                    scope.$apply(function () {
                        scope.ngModel = evt.editor.getData();
                    });
                    if (attrs.msnCount != undefined) {
                        element[0].querySelector('.totalTypedCharacters').innerHTML = attrs.msnCount + " " + evt.editor.getData().length;
                    }
                    if(scope.ngChange && typeof scope.ngChange === 'function'){
                        scope.ngChange(evt.editor.getData());
                    }
                });
                (editor).on('focus', function (evt) {
                    editor.setData(scope.ngModel);
                });
                (editor).on('key', function (evt) {
                    $timeout(function () {
	                    scope.$apply(function () {
		                    scope.ngModel = evt.editor.getData();
	                    });
	                    if (attrs.msnCount != undefined) {
		                    element[0].querySelector('.totalTypedCharacters').innerHTML = attrs.msnCount + " " + evt.editor.getData().length;
	                    }
	                    if(scope.ngChange && typeof scope.ngChange === 'function'){
		                    scope.ngChange(evt.editor.getData());
	                    }
                    }, 0);
                });
            };

            var interval = undefined;
            var setValue = function (value, editor) {
                if (interval) {
                    clearTimeout(interval);
                }
                interval = setTimeout(function () {
                    if (value && editor) {
                        editor.setData(value);
                    } else if (editor) {
                        editor.setData('');
                    }
                }, 1000);
            };

            addEventListener(editor);

            scope.$watch('ngModel', function (value) {
                clearTimeout(interval);
                if(value !== editor.getData()){
                    setValue(value, editor);   
                }
            });

            scope.$watch('ngDisabled', function (value) {
                if (value) {
                    config.readOnly = true;
                } else {
                    config.readOnly = false;
                }

                //editor = CKEDITOR.replace(elemEditor[0], (scope.ngConfig ? scope.ngConfig : config), '');
                editor.destroy();
                editor = __WEBPACK_IMPORTED_MODULE_1_ckeditor___default.a.appendTo(elemEditor[0], (scope.ngConfig ? scope.ngConfig : config), '');
                addEventListener(editor);
                editor.setData(scope.ngModel);
            });
        }
    };
}])
.name);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});