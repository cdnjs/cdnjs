/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * Angular 1.x directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.4.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular")) : factory(root["angular"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	exports.module = ng.module('officeuifabric.core', []);


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var calloutModule = __webpack_require__(4);
	var buttonModule = __webpack_require__(7);
	var choicefieldModule = __webpack_require__(10);
	var contextualMenuModule = __webpack_require__(12);
	var dropdownModule = __webpack_require__(13);
	var iconModule = __webpack_require__(14);
	var labelModule = __webpack_require__(16);
	var linkModule = __webpack_require__(17);
	var overlayModule = __webpack_require__(18);
	var progressIndicatorModule = __webpack_require__(20);
	var searchboxModule = __webpack_require__(21);
	var spinnerModule = __webpack_require__(22);
	var tableModule = __webpack_require__(24);
	var textFieldModule = __webpack_require__(26);
	var toggleModule = __webpack_require__(27);
	exports.module = ng.module('officeuifabric.components', [
	    calloutModule.module.name,
	    buttonModule.module.name,
	    choicefieldModule.module.name,
	    contextualMenuModule.module.name,
	    dropdownModule.module.name,
	    iconModule.module.name,
	    labelModule.module.name,
	    linkModule.module.name,
	    overlayModule.module.name,
	    progressIndicatorModule.module.name,
	    searchboxModule.module.name,
	    spinnerModule.module.name,
	    tableModule.module.name,
	    textFieldModule.module.name,
	    toggleModule.module.name
	]);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var calloutTypeEnum_1 = __webpack_require__(5);
	var calloutArrowEnum_1 = __webpack_require__(6);
	var CalloutController = (function () {
	    function CalloutController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	    }
	    CalloutController.$inject = ['$scope', '$log'];
	    return CalloutController;
	})();
	exports.CalloutController = CalloutController;
	var CalloutHeaderDirective = (function () {
	    function CalloutHeaderDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.scope = false;
	        this.template = '<div class="ms-Callout-header"><p class="ms-Callout-title" ng-transclude></p></div>';
	    }
	    CalloutHeaderDirective.factory = function () {
	        var directive = function () { return new CalloutHeaderDirective(); };
	        return directive;
	    };
	    CalloutHeaderDirective.prototype.link = function (scope, instanceElement, attrs, ctrls) {
	        var mainWrapper = instanceElement.parent().parent();
	        if (!ng.isUndefined(mainWrapper) && mainWrapper.hasClass('ms-Callout-main')) {
	            var detachedHeader = instanceElement.detach();
	            mainWrapper.prepend(detachedHeader);
	        }
	    };
	    return CalloutHeaderDirective;
	})();
	exports.CalloutHeaderDirective = CalloutHeaderDirective;
	var CalloutContentDirective = (function () {
	    function CalloutContentDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.scope = false;
	        this.template = '<div class="ms-Callout-content"><p class="ms-Callout-subText" ng-transclude></p></div>';
	    }
	    CalloutContentDirective.factory = function () {
	        var directive = function () { return new CalloutContentDirective(); };
	        return directive;
	    };
	    return CalloutContentDirective;
	})();
	exports.CalloutContentDirective = CalloutContentDirective;
	var CalloutActionsDirective = (function () {
	    function CalloutActionsDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.scope = false;
	        this.template = '<div class="ms-Callout-actions" ng-transclude></div>';
	        this.require = '^?uifCallout';
	    }
	    CalloutActionsDirective.factory = function () {
	        var directive = function () { return new CalloutActionsDirective(); };
	        return directive;
	    };
	    CalloutActionsDirective.prototype.link = function (scope, instanceElement, attrs, calloutController) {
	        if (ng.isObject(calloutController)) {
	            calloutController.$scope.$watch('hasSeparator', function (hasSeparator) {
	                var actionChildren = instanceElement.children().eq(0).children();
	                for (var buttonIndex = 0; buttonIndex < actionChildren.length; buttonIndex++) {
	                    var action = actionChildren.eq(buttonIndex);
	                    if (hasSeparator) {
	                        action.addClass('ms-Callout-action');
	                    }
	                    else {
	                        action.removeClass('ms-Callout-action');
	                    }
	                    var actionSpans = action.find('span');
	                    for (var spanIndex = 0; spanIndex < actionSpans.length; spanIndex++) {
	                        var actionSpan = actionSpans.eq(spanIndex);
	                        if (hasSeparator) {
	                            actionSpan.addClass('ms-Callout-actionText');
	                        }
	                        else {
	                            actionSpan.removeClass('ms-Callout-actionText');
	                        }
	                    }
	                }
	            });
	        }
	    };
	    return CalloutActionsDirective;
	})();
	exports.CalloutActionsDirective = CalloutActionsDirective;
	var CalloutDirective = (function () {
	    function CalloutDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.template = '<div class="ms-Callout ms-Callout--arrow{{arrowDirection}}" ' +
	            'ng-class="{\'ms-Callout--actionText\': hasSeparator, \'ms-Callout--OOBE\': uifType==\'oobe\',' +
	            ' \'ms-Callout--Peek\': uifType==\'peek\', \'ms-Callout--close\': closeButton}">' +
	            '<div class="ms-Callout-main"><div class="ms-Callout-inner" ng-transclude></div></div></div>';
	        this.require = ['uifCallout'];
	        this.scope = {
	            ngShow: '=?',
	            uifType: '@'
	        };
	        this.controller = CalloutController;
	    }
	    CalloutDirective.factory = function () {
	        var directive = function () { return new CalloutDirective(); };
	        return directive;
	    };
	    CalloutDirective.prototype.link = function (scope, instanceElement, attrs, ctrls) {
	        var calloutController = ctrls[0];
	        attrs.$observe('uifType', function (calloutType) {
	            if (ng.isUndefined(calloutTypeEnum_1.CalloutType[calloutType])) {
	                calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
	                    calloutType + '" is not a valid value for uifType. It should be oobe or peek');
	            }
	        });
	        if (!attrs.uifArrow) {
	            scope.arrowDirection = 'Left';
	        }
	        attrs.$observe('uifArrow', function (attrArrowDirection) {
	            if (ng.isUndefined(calloutArrowEnum_1.CalloutArrow[attrArrowDirection])) {
	                calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
	                    attrArrowDirection + '" is not a valid value for uifArrow. It should be left, right, top, bottom.');
	                return;
	            }
	            var capitalizedDirection = (attrArrowDirection.charAt(0)).toUpperCase();
	            capitalizedDirection += (attrArrowDirection.slice(1)).toLowerCase();
	            scope.arrowDirection = capitalizedDirection;
	        });
	        scope.hasSeparator = (!ng.isUndefined(attrs.uifActionText) || !ng.isUndefined(attrs.uifSeparator));
	        if (!ng.isUndefined(attrs.uifClose)) {
	            scope.closeButton = true;
	            var closeButtonElement = ng.element('<button class="ms-Callout-close">' +
	                '<i class="ms-Icon ms-Icon--x"></i>' +
	                '</button>');
	            var calloutDiv = instanceElement.find('div').eq(0);
	            calloutDiv.append(closeButtonElement);
	            closeButtonElement.bind('click', function (eventObject) {
	                scope.ngShow = false;
	                scope.closeButtonClicked = true;
	                scope.$apply();
	            });
	        }
	        instanceElement.bind('mouseenter', function (eventObject) {
	            scope.isMouseOver = true;
	            scope.$apply();
	        });
	        instanceElement.bind('mouseleave', function (eventObject) {
	            scope.isMouseOver = false;
	            scope.$apply();
	        });
	        scope.$watch('ngShow', function (newValue, oldValue) {
	            var isClosingByButtonClick = !newValue && scope.closeButtonClicked;
	            if (isClosingByButtonClick) {
	                scope.ngShow = scope.closeButtonClicked = false;
	                return;
	            }
	            if (!newValue) {
	                scope.ngShow = scope.isMouseOver;
	            }
	        });
	        scope.$watch('isMouseOver', function (newVal, oldVal) {
	            if (!newVal && oldVal) {
	                if (!scope.closeButton) {
	                    scope.ngShow = false;
	                }
	            }
	        });
	    };
	    return CalloutDirective;
	})();
	exports.CalloutDirective = CalloutDirective;
	exports.module = ng.module('officeuifabric.components.callout', ['officeuifabric.components'])
	    .directive('uifCallout', CalloutDirective.factory())
	    .directive('uifCalloutHeader', CalloutHeaderDirective.factory())
	    .directive('uifCalloutContent', CalloutContentDirective.factory())
	    .directive('uifCalloutActions', CalloutActionsDirective.factory());


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	(function (CalloutType) {
	    CalloutType[CalloutType["oobe"] = 0] = "oobe";
	    CalloutType[CalloutType["peek"] = 1] = "peek";
	})(exports.CalloutType || (exports.CalloutType = {}));
	var CalloutType = exports.CalloutType;


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	(function (CalloutArrow) {
	    CalloutArrow[CalloutArrow["left"] = 0] = "left";
	    CalloutArrow[CalloutArrow["right"] = 1] = "right";
	    CalloutArrow[CalloutArrow["top"] = 2] = "top";
	    CalloutArrow[CalloutArrow["bottom"] = 3] = "bottom";
	})(exports.CalloutArrow || (exports.CalloutArrow = {}));
	var CalloutArrow = exports.CalloutArrow;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var buttonTypeEnum_ts_1 = __webpack_require__(8);
	var buttonTemplateType_ts_1 = __webpack_require__(9);
	var ButtonController = (function () {
	    function ButtonController($log) {
	        this.$log = $log;
	    }
	    ButtonController.$inject = ['$log'];
	    return ButtonController;
	})();
	var ButtonDirective = (function () {
	    function ButtonDirective($log) {
	        var _this = this;
	        this.$log = $log;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.scope = {};
	        this.controller = ButtonController;
	        this.controllerAs = 'button';
	        this.template = function ($element, $attrs) {
	            if (!ng.isUndefined($attrs.uifType) && ng.isUndefined(buttonTypeEnum_ts_1.ButtonTypeEnum[$attrs.uifType])) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.button - Unsupported button: ' +
	                    'The button (\'' + $attrs.uifType + '\') is not supported by the Office UI Fabric. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/button/buttonTypeEnum.ts');
	            }
	            switch ($attrs.uifType) {
	                case buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.primary]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.primaryButton]
	                        : _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.primaryLink];
	                case buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.command]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.commandButton]
	                        : _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.commandLink];
	                case buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.compound]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.compoundButton]
	                        : _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.compoundLink];
	                case buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.hero]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.heroButton]
	                        : _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.heroLink];
	                default:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.actionButton]
	                        : _this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.actionLink];
	            }
	        };
	        this.templateOptions = {};
	        this._populateHtmlTemplates();
	    }
	    ButtonDirective.factory = function () {
	        var directive = function ($log) { return new ButtonDirective($log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    ButtonDirective.prototype.compile = function (element, attrs, transclude) {
	        return {
	            post: this.postLink,
	            pre: this.preLink
	        };
	    };
	    ButtonDirective.prototype.preLink = function (scope, element, attrs, controllers, transclude) {
	        var disabled = 'disabled' in attrs;
	        scope.disabled = disabled;
	    };
	    ButtonDirective.prototype.postLink = function (scope, element, attrs, controllers, transclude) {
	        if (ng.isUndefined(attrs.uifType) ||
	            attrs.uifType === buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.primary] ||
	            attrs.uifType === buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.compound]) {
	            var iconElement = element.find('uif-icon');
	            if (iconElement.length !== 0) {
	                iconElement.remove();
	                controllers.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.button - ' +
	                    'Icon not allowed in primary or compound buttons: ' +
	                    'The primary & compound button does not support including icons in the body. ' +
	                    'The icon has been removed but may cause rendering errors. Consider buttons that support icons such as command or hero.');
	            }
	        }
	        transclude(function (clone) {
	            var wrapper;
	            switch (attrs.uifType) {
	                case buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.command]:
	                    for (var i = 0; i < clone.length; i++) {
	                        if (clone[i].tagName === 'SPAN') {
	                            wrapper = ng.element('<span></span>');
	                            wrapper.addClass('ms-Button-label').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                        if (clone[i].tagName === 'UIF-ICON') {
	                            wrapper = ng.element('<span></span>');
	                            wrapper.addClass('ms-Button-icon').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                    }
	                    break;
	                case buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.compound]:
	                    for (var i = 0; i < clone.length; i++) {
	                        if (clone[i].tagName !== 'SPAN') {
	                            continue;
	                        }
	                        if (clone[i].classList[0] === 'ng-scope' &&
	                            clone[i].classList.length === 1) {
	                            wrapper = ng.element('<span></span>');
	                            wrapper.addClass('ms-Button-label').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                        else {
	                            element.append(clone[i]);
	                        }
	                    }
	                    break;
	                case buttonTypeEnum_ts_1.ButtonTypeEnum[buttonTypeEnum_ts_1.ButtonTypeEnum.hero]:
	                    for (var i = 0; i < clone.length; i++) {
	                        if (clone[i].tagName === 'SPAN') {
	                            wrapper = ng.element('<span></span>');
	                            wrapper.addClass('ms-Button-label').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                        if (clone[i].tagName === 'UIF-ICON') {
	                            wrapper = ng.element('<span></span>');
	                            wrapper.addClass('ms-Button-icon').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                    }
	                    break;
	                default:
	                    break;
	            }
	        });
	    };
	    ButtonDirective.prototype._populateHtmlTemplates = function () {
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.actionButton] =
	            "<button class=\"ms-Button\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.actionLink] =
	            "<a class=\"ms-Button\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.primaryButton] =
	            "<button class=\"ms-Button ms-Button--primary\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.primaryLink] =
	            "<a class=\"ms-Button ms-Button--primary\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.commandButton] =
	            "<button class=\"ms-Button ms-Button--command\" ng-class=\"{'is-disabled': disabled}\"></button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.commandLink] =
	            "<a class=\"ms-Button ms-Button--command\" ng-class=\"{'is-disabled': disabled}\"></a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.compoundButton] =
	            "<button class=\"ms-Button ms-Button--compound\" ng-class=\"{'is-disabled': disabled}\"></button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.compoundLink] =
	            "<a class=\"ms-Button ms-Button--compound\" ng-class=\"{'is-disabled': disabled}\"></a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.heroButton] =
	            "<button class=\"ms-Button ms-Button--hero\" ng-class=\"{'is-disabled': disabled}\"></button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.heroLink] =
	            "<a class=\"ms-Button ms-Button--hero\" ng-class=\"{'is-disabled': disabled}\"></a>";
	    };
	    return ButtonDirective;
	})();
	exports.ButtonDirective = ButtonDirective;
	var ButtonDescriptionDirective = (function () {
	    function ButtonDescriptionDirective() {
	        this.restrict = 'E';
	        this.require = '^uifButton';
	        this.transclude = true;
	        this.replace = true;
	        this.scope = false;
	        this.template = '<span class="ms-Button-description" ng-transclude></span>';
	    }
	    ButtonDescriptionDirective.factory = function () {
	        var directive = function () { return new ButtonDescriptionDirective(); };
	        return directive;
	    };
	    return ButtonDescriptionDirective;
	})();
	exports.ButtonDescriptionDirective = ButtonDescriptionDirective;
	exports.module = ng.module('officeuifabric.components.button', [
	    'officeuifabric.components'
	])
	    .directive('uifButton', ButtonDirective.factory())
	    .directive('uifButtonDescription', ButtonDescriptionDirective.factory());


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	(function (ButtonTypeEnum) {
	    ButtonTypeEnum[ButtonTypeEnum["primary"] = 0] = "primary";
	    ButtonTypeEnum[ButtonTypeEnum["command"] = 1] = "command";
	    ButtonTypeEnum[ButtonTypeEnum["compound"] = 2] = "compound";
	    ButtonTypeEnum[ButtonTypeEnum["hero"] = 3] = "hero";
	})(exports.ButtonTypeEnum || (exports.ButtonTypeEnum = {}));
	var ButtonTypeEnum = exports.ButtonTypeEnum;
	;


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	(function (ButtonTemplateType) {
	    ButtonTemplateType[ButtonTemplateType["actionButton"] = 0] = "actionButton";
	    ButtonTemplateType[ButtonTemplateType["actionLink"] = 1] = "actionLink";
	    ButtonTemplateType[ButtonTemplateType["primaryButton"] = 2] = "primaryButton";
	    ButtonTemplateType[ButtonTemplateType["primaryLink"] = 3] = "primaryLink";
	    ButtonTemplateType[ButtonTemplateType["commandButton"] = 4] = "commandButton";
	    ButtonTemplateType[ButtonTemplateType["commandLink"] = 5] = "commandLink";
	    ButtonTemplateType[ButtonTemplateType["compoundButton"] = 6] = "compoundButton";
	    ButtonTemplateType[ButtonTemplateType["compoundLink"] = 7] = "compoundLink";
	    ButtonTemplateType[ButtonTemplateType["heroButton"] = 8] = "heroButton";
	    ButtonTemplateType[ButtonTemplateType["heroLink"] = 9] = "heroLink";
	})(exports.ButtonTemplateType || (exports.ButtonTemplateType = {}));
	var ButtonTemplateType = exports.ButtonTemplateType;
	;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var choicefieldTypeEnum_1 = __webpack_require__(11);
	var ChoicefieldOptionController = (function () {
	    function ChoicefieldOptionController($log) {
	        this.$log = $log;
	    }
	    ChoicefieldOptionController.$inject = ['$log'];
	    return ChoicefieldOptionController;
	})();
	exports.ChoicefieldOptionController = ChoicefieldOptionController;
	var ChoicefieldOptionDirective = (function () {
	    function ChoicefieldOptionDirective() {
	        this.template = '<div class="ms-ChoiceField">' +
	            '<input id="{{::$id}}" class="ms-ChoiceField-input" type="{{uifType}}" value="{{value}}" ' +
	            'ng-model="ngModel" ng-true-value="{{ngTrueValue}}" ng-false-value="{{ngFalseValue}}" />' +
	            '<label for="{{::$id}}" class="ms-ChoiceField-field"><span class="ms-Label" ng-transclude></span></label>' +
	            '</div>';
	        this.restrict = 'E';
	        this.require = ['uifChoicefieldOption', '^?uifChoicefieldGroup'];
	        this.replace = true;
	        this.transclude = true;
	        this.scope = {
	            ngFalseValue: '@',
	            ngModel: '=',
	            ngTrueValue: '@',
	            uifType: '@',
	            value: '@'
	        };
	        this.controller = ChoicefieldOptionController;
	    }
	    ChoicefieldOptionDirective.factory = function () {
	        var directive = function () {
	            return new ChoicefieldOptionDirective();
	        };
	        return directive;
	    };
	    ChoicefieldOptionDirective.prototype.compile = function (templateElement, templateAttributes, transclude) {
	        var input = templateElement.find('input');
	        if (!('ngModel' in templateAttributes)) {
	            input.removeAttr('ng-model');
	        }
	        return {
	            pre: this.preLink
	        };
	    };
	    ChoicefieldOptionDirective.prototype.preLink = function (scope, instanceElement, attrs, ctrls, transclude) {
	        var choicefieldOptionController = ctrls[0];
	        var choicefieldGroupController = ctrls[1];
	        scope.$watch('uifType', function (newValue, oldValue) {
	            if (choicefieldTypeEnum_1.ChoicefieldType[newValue] === undefined) {
	                choicefieldOptionController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.choicefield - "' +
	                    newValue + '" is not a valid value for uifType. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/choicefield/choicefieldTypeEnum.ts');
	            }
	        });
	        if (choicefieldGroupController != null) {
	            var render = function () {
	                var checked = (choicefieldGroupController.getViewValue() === attrs.value);
	                instanceElement.find('input').prop('checked', checked);
	            };
	            choicefieldGroupController.addRender(render);
	            attrs.$observe('value', render);
	            instanceElement
	                .on('$destroy', function () {
	                choicefieldGroupController.removeRender(render);
	            });
	        }
	        var disabled = 'disabled' in attrs;
	        var parentScope = scope.$parent.$parent;
	        disabled = disabled || (parentScope != null && parentScope.disabled);
	        if (disabled) {
	            instanceElement.find('input').attr('disabled', 'disabled');
	        }
	        instanceElement
	            .on('click', function (ev) {
	            if (disabled) {
	                return;
	            }
	            scope.$apply(function () {
	                if (choicefieldGroupController != null) {
	                    choicefieldGroupController.setViewValue(attrs.value, ev);
	                }
	            });
	        });
	    };
	    return ChoicefieldOptionDirective;
	})();
	exports.ChoicefieldOptionDirective = ChoicefieldOptionDirective;
	var ChoicefieldGroupController = (function () {
	    function ChoicefieldGroupController($element, $scope) {
	        this.$element = $element;
	        this.$scope = $scope;
	        this.renderFns = [];
	    }
	    ChoicefieldGroupController.prototype.init = function () {
	        var _this = this;
	        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
	            this.$scope.ngModel.$render = function () {
	                _this.render();
	            };
	            this.render();
	        }
	    };
	    ChoicefieldGroupController.prototype.addRender = function (fn) {
	        this.renderFns.push(fn);
	    };
	    ChoicefieldGroupController.prototype.removeRender = function (fn) {
	        this.renderFns.splice(this.renderFns.indexOf(fn));
	    };
	    ChoicefieldGroupController.prototype.setViewValue = function (value, eventType) {
	        this.$scope.ngModel.$setViewValue(value, eventType);
	        this.render();
	    };
	    ChoicefieldGroupController.prototype.getViewValue = function () {
	        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
	            return this.$scope.ngModel.$viewValue;
	        }
	    };
	    ChoicefieldGroupController.prototype.render = function () {
	        for (var i = 0; i < this.renderFns.length; i++) {
	            this.renderFns[i]();
	        }
	    };
	    ChoicefieldGroupController.$inject = ['$element', '$scope'];
	    return ChoicefieldGroupController;
	})();
	exports.ChoicefieldGroupController = ChoicefieldGroupController;
	var ChoicefieldGroupDirective = (function () {
	    function ChoicefieldGroupDirective() {
	        this.template = '<div class="ms-ChoiceFieldGroup">' +
	            '<div class="ms-ChoiceFieldGroup-title">' +
	            '<label class="ms-Label is-required">Pick one</label>' +
	            '</div>' +
	            '<ng-transclude />' +
	            '</div>';
	        this.restrict = 'E';
	        this.transclude = true;
	        this.require = ['uifChoicefieldGroup', '?ngModel'];
	        this.controller = ChoicefieldGroupController;
	    }
	    ChoicefieldGroupDirective.factory = function () {
	        var directive = function () { return new ChoicefieldGroupDirective(); };
	        return directive;
	    };
	    ChoicefieldGroupDirective.prototype.compile = function (templateElement, templateAttributes, transclude) {
	        return {
	            pre: this.preLink
	        };
	    };
	    ChoicefieldGroupDirective.prototype.preLink = function (scope, instanceElement, instanceAttributes, ctrls) {
	        var choicefieldGroupController = ctrls[0];
	        var modelController = ctrls[1];
	        scope.ngModel = modelController;
	        choicefieldGroupController.init();
	        scope.disabled = 'disabled' in instanceAttributes;
	    };
	    return ChoicefieldGroupDirective;
	})();
	exports.ChoicefieldGroupDirective = ChoicefieldGroupDirective;
	exports.module = ng.module('officeuifabric.components.choicefield', [
	    'officeuifabric.components'
	])
	    .directive('uifChoicefieldOption', ChoicefieldOptionDirective.factory())
	    .directive('uifChoicefieldGroup', ChoicefieldGroupDirective.factory());


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	(function (ChoicefieldType) {
	    ChoicefieldType[ChoicefieldType["radio"] = 0] = "radio";
	    ChoicefieldType[ChoicefieldType["checkbox"] = 1] = "checkbox";
	})(exports.ChoicefieldType || (exports.ChoicefieldType = {}));
	var ChoicefieldType = exports.ChoicefieldType;
	;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var MenuItemTypes;
	(function (MenuItemTypes) {
	    MenuItemTypes[MenuItemTypes["link"] = 0] = "link";
	    MenuItemTypes[MenuItemTypes["divider"] = 1] = "divider";
	    MenuItemTypes[MenuItemTypes["header"] = 2] = "header";
	    MenuItemTypes[MenuItemTypes["subMenu"] = 3] = "subMenu";
	})(MenuItemTypes || (MenuItemTypes = {}));
	exports.contextualMenuItemDirectiveName = 'uifContextualMenuItem';
	exports.contextualMenuDirectiveName = 'uifContextualMenu';
	var ContextualMenuItemDirective = (function () {
	    function ContextualMenuItemDirective($log) {
	        var _this = this;
	        this.$log = $log;
	        this.restrict = 'E';
	        this.require = '^uifContextualMenu';
	        this.transclude = true;
	        this.controller = ContextualMenuItemController;
	        this.template = function ($element, $attrs) {
	            var type = $attrs.uifType;
	            if (ng.isUndefined(type)) {
	                return _this.templateTypes[MenuItemTypes.link];
	            }
	            if (MenuItemTypes[type] === undefined) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - unsupported menu type:\n' +
	                    'the type \'' + type + '\' is not supported by ng-Office UI Fabric as valid type for context menu.' +
	                    'Supported types can be found under MenuItemTypes enum here:\n' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/contextualmenu/contextualMenu.ts');
	            }
	            return _this.templateTypes[MenuItemTypes[type]];
	        };
	        this.replace = true;
	        this.scope = {
	            isDisabled: '=?uifIsDisabled',
	            isSelected: '=?uifIsSelected',
	            onClick: '&uifClick',
	            text: '=uifText',
	            type: '@uifType'
	        };
	        this.templateTypes = {};
	        this.templateTypes[MenuItemTypes.subMenu] =
	            "<li class=\"ms-ContextualMenu-item\">\n                <a class=\"ms-ContextualMenu-link ms-ContextualMenu-link--hasMenu\"\n                ng-class=\"{'is-selected': isSelected, 'is-disabled': isDisabled}\" ng-click=\"selectItem()\" href>{{text}}</a>\n                <i class=\"ms-ContextualMenu-subMenuIcon ms-Icon ms-Icon--chevronRight\"></i>\n                <div class=\"content\"></div>\n            </li>";
	        this.templateTypes[MenuItemTypes.link] =
	            "<li class=\"ms-ContextualMenu-item\">\n                <a class=\"ms-ContextualMenu-link\" ng-class=\"{'is-selected': isSelected, 'is-disabled': isDisabled}\"\n                ng-click=\"selectItem()\" href>{{text}}</a>\n            </li>";
	        this.templateTypes[MenuItemTypes.header] = "<li class=\"ms-ContextualMenu-item ms-ContextualMenu-item--header\">{{text}}</li>";
	        this.templateTypes[MenuItemTypes.divider] = "<li class=\"ms-ContextualMenu-item ms-ContextualMenu-item--divider\"></li>";
	    }
	    ContextualMenuItemDirective.factory = function () {
	        var directive = function ($log) { return new ContextualMenuItemDirective($log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    ContextualMenuItemDirective.prototype.link = function ($scope, $element, $attrs, contextualMenuController, $transclude) {
	        if (typeof $scope.isDisabled !== 'boolean' && $scope.isDisabled !== undefined) {
	            contextualMenuController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - ' +
	                'invalid attribute type: \'uif-is-disabled\'.\n' +
	                'The type \'' + typeof $scope.isDisabled + '\' is not supported as valid type for \'uif-is-disabled\' attribute for ' +
	                '<uif-contextual-menu-item />. The valid type is boolean.');
	        }
	        if (typeof $scope.isSelected !== 'boolean' && $scope.isSelected !== undefined) {
	            contextualMenuController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - ' +
	                'invalid attribute type: \'uif-is-selected\'.\n' +
	                'The type \'' + typeof $scope.isSelected + '\' is not supported as valid type for \'uif-is-selected\' attribute for ' +
	                '<uif-contextual-menu-item />. The valid type is boolean.');
	        }
	        $transclude(function (clone) {
	            $element.find('div').replaceWith(clone);
	        });
	        $scope.selectItem = function () {
	            if (!contextualMenuController.isMultiSelectionMenu()) {
	                contextualMenuController.onDeselectItems();
	            }
	            if (ng.isUndefined($scope.isSelected) && !$scope.isDisabled) {
	                $scope.isSelected = true;
	            }
	            else {
	                $scope.isSelected = !$scope.isSelected;
	            }
	            if (contextualMenuController.isRootMenu()) {
	                contextualMenuController.onCloseMenus($scope.$id);
	            }
	            else {
	                if (!$scope.hasChildMenu) {
	                    contextualMenuController.onCloseMenus(null, true);
	                    contextualMenuController.onDeselectItems(true);
	                }
	                else {
	                    contextualMenuController.onCloseMenus($scope.$id);
	                }
	            }
	            if ($scope.hasChildMenu) {
	                $scope.childMenuCtrl.openMenu();
	            }
	            if (!ng.isUndefined($scope.onClick)) {
	                $scope.onClick();
	            }
	        };
	        $scope.$on('uif-menu-deselect', function () {
	            $scope.isSelected = false;
	        });
	        $scope.$on('uif-menu-close', function (event, menuItemId) {
	            if ($scope.hasChildMenu && $scope.$id !== menuItemId) {
	                $scope.childMenuCtrl.closeMenu();
	            }
	        });
	    };
	    return ContextualMenuItemDirective;
	})();
	exports.ContextualMenuItemDirective = ContextualMenuItemDirective;
	var ContextualMenuItemController = (function () {
	    function ContextualMenuItemController($scope, $element) {
	        this.$scope = $scope;
	        this.$element = $element;
	    }
	    ContextualMenuItemController.prototype.setChildMenu = function (childMenuCtrl) {
	        this.$scope.hasChildMenu = true;
	        this.$scope.childMenuCtrl = childMenuCtrl;
	    };
	    ContextualMenuItemController.$inject = ['$scope', '$element'];
	    return ContextualMenuItemController;
	})();
	exports.ContextualMenuItemController = ContextualMenuItemController;
	var ContextualMenuDirective = (function () {
	    function ContextualMenuDirective() {
	        this.restrict = 'E';
	        this.require = exports.contextualMenuDirectiveName;
	        this.transclude = true;
	        this.template = "<ul class=\"ms-ContextualMenu\" ng-transclude></ul>";
	        this.replace = true;
	        this.controller = ContextualMenuController;
	        this.scope = {
	            isOpen: '=?uifIsOpen',
	            multiselect: '@uifMultiselect'
	        };
	    }
	    ContextualMenuDirective.factory = function () {
	        var directive = function () { return new ContextualMenuDirective(); };
	        return directive;
	    };
	    ContextualMenuDirective.prototype.link = function ($scope, $element, $attrs, contextualMenuController) {
	        var parentMenuItemCtrl = $element.controller(exports.contextualMenuItemDirectiveName);
	        if (!ng.isUndefined(parentMenuItemCtrl)) {
	            parentMenuItemCtrl.setChildMenu(contextualMenuController);
	        }
	        if (!ng.isUndefined($scope.multiselect) && $scope.multiselect.toLowerCase() === 'true') {
	            $element.addClass('ms-ContextualMenu--multiselect');
	        }
	    };
	    return ContextualMenuDirective;
	})();
	exports.ContextualMenuDirective = ContextualMenuDirective;
	var ContextualMenuController = (function () {
	    function ContextualMenuController($scope, $animate, $element, $log) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$animate = $animate;
	        this.$element = $element;
	        this.$log = $log;
	        this.isOpenClassName = 'is-open';
	        if (ng.isUndefined($element.controller(exports.contextualMenuItemDirectiveName))) {
	            $scope.isRootMenu = true;
	        }
	        $scope.$watch('isOpen', function (newValue) {
	            if (typeof newValue !== 'boolean' && newValue !== undefined) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - invalid attribute type: \'uif-is-open\'.\n' +
	                    'The type \'' + typeof newValue + '\' is not supported as valid type for \'uif-is-open\' attribute for ' +
	                    '<uif-contextual-menu />. The valid type is boolean.');
	            }
	            $animate[newValue ? 'addClass' : 'removeClass']($element, _this.isOpenClassName);
	        });
	    }
	    ContextualMenuController.prototype.onDeselectItems = function (deselectParentMenus) {
	        this.$scope.$broadcast('uif-menu-deselect');
	        if (deselectParentMenus) {
	            this.$scope.$emit('uif-menu-deselect');
	        }
	    };
	    ContextualMenuController.prototype.onCloseMenus = function (menuItemToSkip, closeRootMenu) {
	        if (closeRootMenu) {
	            this.$scope.$emit('uif-menu-close');
	        }
	        else {
	            this.$scope.$broadcast('uif-menu-close', menuItemToSkip);
	        }
	    };
	    ContextualMenuController.prototype.openMenu = function () {
	        this.$scope.isOpen = true;
	    };
	    ContextualMenuController.prototype.closeMenu = function () {
	        this.$scope.isOpen = false;
	    };
	    ContextualMenuController.prototype.isRootMenu = function () {
	        return this.$scope.isRootMenu;
	    };
	    ContextualMenuController.prototype.isMultiSelectionMenu = function () {
	        if (ng.isUndefined(this.$scope.multiselect)) {
	            return false;
	        }
	        return this.$scope.multiselect.toLowerCase() === 'true';
	    };
	    ContextualMenuController.$inject = ['$scope', '$animate', '$element', '$log'];
	    return ContextualMenuController;
	})();
	exports.ContextualMenuController = ContextualMenuController;
	exports.module = ng.module('officeuifabric.components.contextualmenu', [
	    'officeuifabric.components'])
	    .directive(exports.contextualMenuDirectiveName, ContextualMenuDirective.factory())
	    .directive(exports.contextualMenuItemDirectiveName, ContextualMenuItemDirective.factory());


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var DropdownOptionDirective = (function () {
	    function DropdownOptionDirective() {
	        this.template = '<li class="ms-Dropdown-item" ng-transclude></li>';
	        this.restrict = 'E';
	        this.require = '^uifDropdown';
	        this.replace = true;
	        this.transclude = true;
	    }
	    DropdownOptionDirective.factory = function () {
	        var directive = function () { return new DropdownOptionDirective(); };
	        return directive;
	    };
	    DropdownOptionDirective.prototype.compile = function (templateElement, templateAttributes, transclude) {
	        return {
	            post: this.postLink
	        };
	    };
	    DropdownOptionDirective.prototype.postLink = function (scope, instanceElement, attrs, dropdownController, transclude) {
	        if (!dropdownController) {
	            throw 'Dropdown controller not found!';
	        }
	        instanceElement
	            .on('click', function (ev) {
	            scope.$apply(function () {
	                dropdownController.setViewValue(instanceElement.find('span').html(), attrs.value, ev);
	            });
	        });
	    };
	    return DropdownOptionDirective;
	})();
	exports.DropdownOptionDirective = DropdownOptionDirective;
	var DropdownController = (function () {
	    function DropdownController($element, $scope) {
	        this.$element = $element;
	        this.$scope = $scope;
	    }
	    DropdownController.prototype.init = function () {
	        var self = this;
	        this.$element.bind('click', function () {
	            if (!self.$scope.disabled) {
	                self.$scope.isOpen = !self.$scope.isOpen;
	                self.$scope.$apply();
	                var dropdownWidth = angular.element(this.querySelector('.ms-Dropdown'))[0].clientWidth;
	                angular.element(this.querySelector('.ms-Dropdown-items'))[0].style.width = dropdownWidth + 'px';
	            }
	        });
	        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
	            this.$scope.ngModel.$render = function () {
	                var options = self.$element.find('li');
	                for (var i = 0; i < options.length; i++) {
	                    var option = options[i];
	                    var value = option.getAttribute('value');
	                    if (value === self.$scope.ngModel.$viewValue) {
	                        self.$scope.selectedTitle = angular.element(option).find('span').html();
	                        break;
	                    }
	                }
	            };
	        }
	    };
	    DropdownController.prototype.setViewValue = function (title, value, eventType) {
	        this.$scope.selectedTitle = title;
	        this.$scope.ngModel.$setViewValue(value, eventType);
	    };
	    DropdownController.prototype.getViewValue = function () {
	        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
	            return this.$scope.ngModel.$viewValue;
	        }
	    };
	    DropdownController.$inject = ['$element', '$scope'];
	    return DropdownController;
	})();
	exports.DropdownController = DropdownController;
	var DropdownDirective = (function () {
	    function DropdownDirective() {
	        this.template = '<div ng-click="dropdownClick" ' +
	            'ng-class="{\'ms-Dropdown\' : true, \'is-open\': isOpen, \'is-disabled\': disabled}" tabindex="0">' +
	            '<i class="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>' +
	            '<span class="ms-Dropdown-title">{{selectedTitle}}</span><ul class="ms-Dropdown-items"><ng-transclude></ng-transclude></ul></div>';
	        this.restrict = 'E';
	        this.transclude = true;
	        this.require = ['uifDropdown', '?ngModel'];
	        this.scope = {};
	        this.controller = DropdownController;
	    }
	    DropdownDirective.factory = function () {
	        var directive = function () { return new DropdownDirective(); };
	        return directive;
	    };
	    DropdownDirective.prototype.compile = function (templateElement, templateAttributes, transclude) {
	        return {
	            pre: this.preLink
	        };
	    };
	    DropdownDirective.prototype.preLink = function (scope, instanceElement, instanceAttributes, ctrls) {
	        var dropdownController = ctrls[0];
	        var modelController = ctrls[1];
	        scope.ngModel = modelController;
	        dropdownController.init();
	        scope.disabled = 'disabled' in instanceAttributes;
	    };
	    return DropdownDirective;
	})();
	exports.DropdownDirective = DropdownDirective;
	exports.module = ng.module('officeuifabric.components.dropdown', [
	    'officeuifabric.components'
	])
	    .directive('uifDropdownOption', DropdownOptionDirective.factory())
	    .directive('uifDropdown', DropdownDirective.factory());


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var iconEnum_1 = __webpack_require__(15);
	var IconController = (function () {
	    function IconController($log) {
	        this.$log = $log;
	    }
	    IconController.$inject = ['$log'];
	    return IconController;
	})();
	var IconDirective = (function () {
	    function IconDirective() {
	        this.restrict = 'E';
	        this.template = '<i class="ms-Icon ms-Icon--{{uifType}}" aria-hidden="true"></i>';
	        this.scope = {
	            uifType: '@'
	        };
	        this.transclude = true;
	        this.controller = IconController;
	        this.controllerAs = 'icon';
	    }
	    IconDirective.factory = function () {
	        var directive = function () { return new IconDirective(); };
	        return directive;
	    };
	    IconDirective.prototype.link = function (scope, instanceElement, attrs, controller) {
	        scope.$watch('uifType', function (newValule, oldValue) {
	            if (iconEnum_1.IconEnum[newValule] === undefined) {
	                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.icon - Unsupported icon: ' +
	                    'The icon (\'' + scope.uifType + '\') is not supported by the Office UI Fabric. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/icon/iconEnum.ts');
	            }
	        });
	    };
	    ;
	    return IconDirective;
	})();
	exports.IconDirective = IconDirective;
	exports.module = ng.module('officeuifabric.components.icon', [
	    'officeuifabric.components'
	])
	    .directive('uifIcon', IconDirective.factory());


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	(function (IconEnum) {
	    IconEnum[IconEnum["alert"] = 0] = "alert";
	    IconEnum[IconEnum["alert2"] = 1] = "alert2";
	    IconEnum[IconEnum["alertOutline"] = 2] = "alertOutline";
	    IconEnum[IconEnum["arrowDown"] = 3] = "arrowDown";
	    IconEnum[IconEnum["arrowDown2"] = 4] = "arrowDown2";
	    IconEnum[IconEnum["arrowDownLeft"] = 5] = "arrowDownLeft";
	    IconEnum[IconEnum["arrowDownRight"] = 6] = "arrowDownRight";
	    IconEnum[IconEnum["arrowLeft"] = 7] = "arrowLeft";
	    IconEnum[IconEnum["arrowRight"] = 8] = "arrowRight";
	    IconEnum[IconEnum["arrowUp"] = 9] = "arrowUp";
	    IconEnum[IconEnum["arrowUp2"] = 10] = "arrowUp2";
	    IconEnum[IconEnum["arrowUpLeft"] = 11] = "arrowUpLeft";
	    IconEnum[IconEnum["arrowUpRight"] = 12] = "arrowUpRight";
	    IconEnum[IconEnum["ascending"] = 13] = "ascending";
	    IconEnum[IconEnum["at"] = 14] = "at";
	    IconEnum[IconEnum["attachment"] = 15] = "attachment";
	    IconEnum[IconEnum["bag"] = 16] = "bag";
	    IconEnum[IconEnum["balloon"] = 17] = "balloon";
	    IconEnum[IconEnum["bell"] = 18] = "bell";
	    IconEnum[IconEnum["boards"] = 19] = "boards";
	    IconEnum[IconEnum["bold"] = 20] = "bold";
	    IconEnum[IconEnum["bookmark"] = 21] = "bookmark";
	    IconEnum[IconEnum["books"] = 22] = "books";
	    IconEnum[IconEnum["briefcase"] = 23] = "briefcase";
	    IconEnum[IconEnum["bundle"] = 24] = "bundle";
	    IconEnum[IconEnum["cake"] = 25] = "cake";
	    IconEnum[IconEnum["calendar"] = 26] = "calendar";
	    IconEnum[IconEnum["calendarDay"] = 27] = "calendarDay";
	    IconEnum[IconEnum["calendarPublic"] = 28] = "calendarPublic";
	    IconEnum[IconEnum["calendarWeek"] = 29] = "calendarWeek";
	    IconEnum[IconEnum["calendarWorkWeek"] = 30] = "calendarWorkWeek";
	    IconEnum[IconEnum["camera"] = 31] = "camera";
	    IconEnum[IconEnum["car"] = 32] = "car";
	    IconEnum[IconEnum["caretDown"] = 33] = "caretDown";
	    IconEnum[IconEnum["caretDownLeft"] = 34] = "caretDownLeft";
	    IconEnum[IconEnum["caretDownOutline"] = 35] = "caretDownOutline";
	    IconEnum[IconEnum["caretDownRight"] = 36] = "caretDownRight";
	    IconEnum[IconEnum["caretLeft"] = 37] = "caretLeft";
	    IconEnum[IconEnum["caretLeftOutline"] = 38] = "caretLeftOutline";
	    IconEnum[IconEnum["caretRight"] = 39] = "caretRight";
	    IconEnum[IconEnum["caretRightOutline"] = 40] = "caretRightOutline";
	    IconEnum[IconEnum["caretUp"] = 41] = "caretUp";
	    IconEnum[IconEnum["caretUpLeft"] = 42] = "caretUpLeft";
	    IconEnum[IconEnum["caretUpOutline"] = 43] = "caretUpOutline";
	    IconEnum[IconEnum["caretUpRight"] = 44] = "caretUpRight";
	    IconEnum[IconEnum["cart"] = 45] = "cart";
	    IconEnum[IconEnum["cat"] = 46] = "cat";
	    IconEnum[IconEnum["chart"] = 47] = "chart";
	    IconEnum[IconEnum["chat"] = 48] = "chat";
	    IconEnum[IconEnum["chatAdd"] = 49] = "chatAdd";
	    IconEnum[IconEnum["check"] = 50] = "check";
	    IconEnum[IconEnum["checkbox"] = 51] = "checkbox";
	    IconEnum[IconEnum["checkboxCheck"] = 52] = "checkboxCheck";
	    IconEnum[IconEnum["checkboxEmpty"] = 53] = "checkboxEmpty";
	    IconEnum[IconEnum["checkboxMixed"] = 54] = "checkboxMixed";
	    IconEnum[IconEnum["checkPeople"] = 55] = "checkPeople";
	    IconEnum[IconEnum["chevronDown"] = 56] = "chevronDown";
	    IconEnum[IconEnum["chevronLeft"] = 57] = "chevronLeft";
	    IconEnum[IconEnum["chevronRight"] = 58] = "chevronRight";
	    IconEnum[IconEnum["chevronsDown"] = 59] = "chevronsDown";
	    IconEnum[IconEnum["chevronsLeft"] = 60] = "chevronsLeft";
	    IconEnum[IconEnum["chevronsRight"] = 61] = "chevronsRight";
	    IconEnum[IconEnum["chevronsUp"] = 62] = "chevronsUp";
	    IconEnum[IconEnum["chevronThickDown"] = 63] = "chevronThickDown";
	    IconEnum[IconEnum["chevronThickLeft"] = 64] = "chevronThickLeft";
	    IconEnum[IconEnum["chevronThickRight"] = 65] = "chevronThickRight";
	    IconEnum[IconEnum["chevronThickUp"] = 66] = "chevronThickUp";
	    IconEnum[IconEnum["chevronThinDown"] = 67] = "chevronThinDown";
	    IconEnum[IconEnum["chevronThinLeft"] = 68] = "chevronThinLeft";
	    IconEnum[IconEnum["chevronThinRight"] = 69] = "chevronThinRight";
	    IconEnum[IconEnum["chevronThinUp"] = 70] = "chevronThinUp";
	    IconEnum[IconEnum["chevronUp"] = 71] = "chevronUp";
	    IconEnum[IconEnum["circle"] = 72] = "circle";
	    IconEnum[IconEnum["circleBall"] = 73] = "circleBall";
	    IconEnum[IconEnum["circleBalloons"] = 74] = "circleBalloons";
	    IconEnum[IconEnum["circleCar"] = 75] = "circleCar";
	    IconEnum[IconEnum["circleCat"] = 76] = "circleCat";
	    IconEnum[IconEnum["circleCoffee"] = 77] = "circleCoffee";
	    IconEnum[IconEnum["circleDog"] = 78] = "circleDog";
	    IconEnum[IconEnum["circleEmpty"] = 79] = "circleEmpty";
	    IconEnum[IconEnum["circleFill"] = 80] = "circleFill";
	    IconEnum[IconEnum["circleFilled"] = 81] = "circleFilled";
	    IconEnum[IconEnum["circleHalfFilled"] = 82] = "circleHalfFilled";
	    IconEnum[IconEnum["circleInfo"] = 83] = "circleInfo";
	    IconEnum[IconEnum["circleLightning"] = 84] = "circleLightning";
	    IconEnum[IconEnum["circlePill"] = 85] = "circlePill";
	    IconEnum[IconEnum["circlePlane"] = 86] = "circlePlane";
	    IconEnum[IconEnum["circlePlus"] = 87] = "circlePlus";
	    IconEnum[IconEnum["circlePoodle"] = 88] = "circlePoodle";
	    IconEnum[IconEnum["circleUnfilled"] = 89] = "circleUnfilled";
	    IconEnum[IconEnum["classNotebook"] = 90] = "classNotebook";
	    IconEnum[IconEnum["classroom"] = 91] = "classroom";
	    IconEnum[IconEnum["clock"] = 92] = "clock";
	    IconEnum[IconEnum["clutter"] = 93] = "clutter";
	    IconEnum[IconEnum["coffee"] = 94] = "coffee";
	    IconEnum[IconEnum["collapse"] = 95] = "collapse";
	    IconEnum[IconEnum["conflict"] = 96] = "conflict";
	    IconEnum[IconEnum["contact"] = 97] = "contact";
	    IconEnum[IconEnum["contactForm"] = 98] = "contactForm";
	    IconEnum[IconEnum["contactPublic"] = 99] = "contactPublic";
	    IconEnum[IconEnum["copy"] = 100] = "copy";
	    IconEnum[IconEnum["creditCard"] = 101] = "creditCard";
	    IconEnum[IconEnum["creditCardOutline"] = 102] = "creditCardOutline";
	    IconEnum[IconEnum["dashboard"] = 103] = "dashboard";
	    IconEnum[IconEnum["descending"] = 104] = "descending";
	    IconEnum[IconEnum["desktop"] = 105] = "desktop";
	    IconEnum[IconEnum["deviceWipe"] = 106] = "deviceWipe";
	    IconEnum[IconEnum["dialpad"] = 107] = "dialpad";
	    IconEnum[IconEnum["directions"] = 108] = "directions";
	    IconEnum[IconEnum["document"] = 109] = "document";
	    IconEnum[IconEnum["documentAdd"] = 110] = "documentAdd";
	    IconEnum[IconEnum["documentForward"] = 111] = "documentForward";
	    IconEnum[IconEnum["documentLandscape"] = 112] = "documentLandscape";
	    IconEnum[IconEnum["documentPDF"] = 113] = "documentPDF";
	    IconEnum[IconEnum["documentReply"] = 114] = "documentReply";
	    IconEnum[IconEnum["documents"] = 115] = "documents";
	    IconEnum[IconEnum["documentSearch"] = 116] = "documentSearch";
	    IconEnum[IconEnum["dog"] = 117] = "dog";
	    IconEnum[IconEnum["dogAlt"] = 118] = "dogAlt";
	    IconEnum[IconEnum["dot"] = 119] = "dot";
	    IconEnum[IconEnum["download"] = 120] = "download";
	    IconEnum[IconEnum["drm"] = 121] = "drm";
	    IconEnum[IconEnum["drop"] = 122] = "drop";
	    IconEnum[IconEnum["dropdown"] = 123] = "dropdown";
	    IconEnum[IconEnum["editBox"] = 124] = "editBox";
	    IconEnum[IconEnum["ellipsis"] = 125] = "ellipsis";
	    IconEnum[IconEnum["embed"] = 126] = "embed";
	    IconEnum[IconEnum["event"] = 127] = "event";
	    IconEnum[IconEnum["eventCancel"] = 128] = "eventCancel";
	    IconEnum[IconEnum["eventInfo"] = 129] = "eventInfo";
	    IconEnum[IconEnum["eventRecurring"] = 130] = "eventRecurring";
	    IconEnum[IconEnum["eventShare"] = 131] = "eventShare";
	    IconEnum[IconEnum["exclamation"] = 132] = "exclamation";
	    IconEnum[IconEnum["expand"] = 133] = "expand";
	    IconEnum[IconEnum["eye"] = 134] = "eye";
	    IconEnum[IconEnum["favorites"] = 135] = "favorites";
	    IconEnum[IconEnum["fax"] = 136] = "fax";
	    IconEnum[IconEnum["fieldMail"] = 137] = "fieldMail";
	    IconEnum[IconEnum["fieldNumber"] = 138] = "fieldNumber";
	    IconEnum[IconEnum["fieldText"] = 139] = "fieldText";
	    IconEnum[IconEnum["fieldTextBox"] = 140] = "fieldTextBox";
	    IconEnum[IconEnum["fileDocument"] = 141] = "fileDocument";
	    IconEnum[IconEnum["fileImage"] = 142] = "fileImage";
	    IconEnum[IconEnum["filePDF"] = 143] = "filePDF";
	    IconEnum[IconEnum["filter"] = 144] = "filter";
	    IconEnum[IconEnum["filterClear"] = 145] = "filterClear";
	    IconEnum[IconEnum["firstAid"] = 146] = "firstAid";
	    IconEnum[IconEnum["flag"] = 147] = "flag";
	    IconEnum[IconEnum["folder"] = 148] = "folder";
	    IconEnum[IconEnum["folderMove"] = 149] = "folderMove";
	    IconEnum[IconEnum["folderPublic"] = 150] = "folderPublic";
	    IconEnum[IconEnum["folderSearch"] = 151] = "folderSearch";
	    IconEnum[IconEnum["fontColor"] = 152] = "fontColor";
	    IconEnum[IconEnum["fontDecrease"] = 153] = "fontDecrease";
	    IconEnum[IconEnum["fontIncrease"] = 154] = "fontIncrease";
	    IconEnum[IconEnum["frowny"] = 155] = "frowny";
	    IconEnum[IconEnum["fullscreen"] = 156] = "fullscreen";
	    IconEnum[IconEnum["gear"] = 157] = "gear";
	    IconEnum[IconEnum["glasses"] = 158] = "glasses";
	    IconEnum[IconEnum["globe"] = 159] = "globe";
	    IconEnum[IconEnum["graph"] = 160] = "graph";
	    IconEnum[IconEnum["group"] = 161] = "group";
	    IconEnum[IconEnum["header"] = 162] = "header";
	    IconEnum[IconEnum["heart"] = 163] = "heart";
	    IconEnum[IconEnum["heartEmpty"] = 164] = "heartEmpty";
	    IconEnum[IconEnum["hide"] = 165] = "hide";
	    IconEnum[IconEnum["home"] = 166] = "home";
	    IconEnum[IconEnum["inboxCheck"] = 167] = "inboxCheck";
	    IconEnum[IconEnum["info"] = 168] = "info";
	    IconEnum[IconEnum["infoCircle"] = 169] = "infoCircle";
	    IconEnum[IconEnum["italic"] = 170] = "italic";
	    IconEnum[IconEnum["key"] = 171] = "key";
	    IconEnum[IconEnum["late"] = 172] = "late";
	    IconEnum[IconEnum["lifesaver"] = 173] = "lifesaver";
	    IconEnum[IconEnum["lifesaverLock"] = 174] = "lifesaverLock";
	    IconEnum[IconEnum["lightBulb"] = 175] = "lightBulb";
	    IconEnum[IconEnum["lightning"] = 176] = "lightning";
	    IconEnum[IconEnum["link"] = 177] = "link";
	    IconEnum[IconEnum["linkRemove"] = 178] = "linkRemove";
	    IconEnum[IconEnum["listBullets"] = 179] = "listBullets";
	    IconEnum[IconEnum["listCheck"] = 180] = "listCheck";
	    IconEnum[IconEnum["listCheckbox"] = 181] = "listCheckbox";
	    IconEnum[IconEnum["listGroup"] = 182] = "listGroup";
	    IconEnum[IconEnum["listGroup2"] = 183] = "listGroup2";
	    IconEnum[IconEnum["listNumbered"] = 184] = "listNumbered";
	    IconEnum[IconEnum["lock"] = 185] = "lock";
	    IconEnum[IconEnum["mail"] = 186] = "mail";
	    IconEnum[IconEnum["mailCheck"] = 187] = "mailCheck";
	    IconEnum[IconEnum["mailDown"] = 188] = "mailDown";
	    IconEnum[IconEnum["mailEdit"] = 189] = "mailEdit";
	    IconEnum[IconEnum["mailEmpty"] = 190] = "mailEmpty";
	    IconEnum[IconEnum["mailError"] = 191] = "mailError";
	    IconEnum[IconEnum["mailOpen"] = 192] = "mailOpen";
	    IconEnum[IconEnum["mailPause"] = 193] = "mailPause";
	    IconEnum[IconEnum["mailPublic"] = 194] = "mailPublic";
	    IconEnum[IconEnum["mailRead"] = 195] = "mailRead";
	    IconEnum[IconEnum["mailSend"] = 196] = "mailSend";
	    IconEnum[IconEnum["mailSync"] = 197] = "mailSync";
	    IconEnum[IconEnum["mailUnread"] = 198] = "mailUnread";
	    IconEnum[IconEnum["mapMarker"] = 199] = "mapMarker";
	    IconEnum[IconEnum["meal"] = 200] = "meal";
	    IconEnum[IconEnum["menu"] = 201] = "menu";
	    IconEnum[IconEnum["menu2"] = 202] = "menu2";
	    IconEnum[IconEnum["merge"] = 203] = "merge";
	    IconEnum[IconEnum["metadata"] = 204] = "metadata";
	    IconEnum[IconEnum["microphone"] = 205] = "microphone";
	    IconEnum[IconEnum["miniatures"] = 206] = "miniatures";
	    IconEnum[IconEnum["minus"] = 207] = "minus";
	    IconEnum[IconEnum["mobile"] = 208] = "mobile";
	    IconEnum[IconEnum["money"] = 209] = "money";
	    IconEnum[IconEnum["move"] = 210] = "move";
	    IconEnum[IconEnum["multiChoice"] = 211] = "multiChoice";
	    IconEnum[IconEnum["music"] = 212] = "music";
	    IconEnum[IconEnum["navigate"] = 213] = "navigate";
	    IconEnum[IconEnum["new"] = 214] = "new";
	    IconEnum[IconEnum["newsfeed"] = 215] = "newsfeed";
	    IconEnum[IconEnum["note"] = 216] = "note";
	    IconEnum[IconEnum["notebook"] = 217] = "notebook";
	    IconEnum[IconEnum["noteEdit"] = 218] = "noteEdit";
	    IconEnum[IconEnum["noteForward"] = 219] = "noteForward";
	    IconEnum[IconEnum["noteReply"] = 220] = "noteReply";
	    IconEnum[IconEnum["notRecurring"] = 221] = "notRecurring";
	    IconEnum[IconEnum["onlineAdd"] = 222] = "onlineAdd";
	    IconEnum[IconEnum["onlineJoin"] = 223] = "onlineJoin";
	    IconEnum[IconEnum["oofReply"] = 224] = "oofReply";
	    IconEnum[IconEnum["org"] = 225] = "org";
	    IconEnum[IconEnum["page"] = 226] = "page";
	    IconEnum[IconEnum["paint"] = 227] = "paint";
	    IconEnum[IconEnum["panel"] = 228] = "panel";
	    IconEnum[IconEnum["partner"] = 229] = "partner";
	    IconEnum[IconEnum["pause"] = 230] = "pause";
	    IconEnum[IconEnum["pencil"] = 231] = "pencil";
	    IconEnum[IconEnum["people"] = 232] = "people";
	    IconEnum[IconEnum["peopleAdd"] = 233] = "peopleAdd";
	    IconEnum[IconEnum["peopleCheck"] = 234] = "peopleCheck";
	    IconEnum[IconEnum["peopleError"] = 235] = "peopleError";
	    IconEnum[IconEnum["peoplePause"] = 236] = "peoplePause";
	    IconEnum[IconEnum["peopleRemove"] = 237] = "peopleRemove";
	    IconEnum[IconEnum["peopleSecurity"] = 238] = "peopleSecurity";
	    IconEnum[IconEnum["peopleSync"] = 239] = "peopleSync";
	    IconEnum[IconEnum["person"] = 240] = "person";
	    IconEnum[IconEnum["personAdd"] = 241] = "personAdd";
	    IconEnum[IconEnum["personRemove"] = 242] = "personRemove";
	    IconEnum[IconEnum["phone"] = 243] = "phone";
	    IconEnum[IconEnum["phoneAdd"] = 244] = "phoneAdd";
	    IconEnum[IconEnum["phoneTransfer"] = 245] = "phoneTransfer";
	    IconEnum[IconEnum["picture"] = 246] = "picture";
	    IconEnum[IconEnum["pictureAdd"] = 247] = "pictureAdd";
	    IconEnum[IconEnum["pictureEdit"] = 248] = "pictureEdit";
	    IconEnum[IconEnum["pictureRemove"] = 249] = "pictureRemove";
	    IconEnum[IconEnum["pill"] = 250] = "pill";
	    IconEnum[IconEnum["pinDown"] = 251] = "pinDown";
	    IconEnum[IconEnum["pinLeft"] = 252] = "pinLeft";
	    IconEnum[IconEnum["placeholder"] = 253] = "placeholder";
	    IconEnum[IconEnum["plane"] = 254] = "plane";
	    IconEnum[IconEnum["play"] = 255] = "play";
	    IconEnum[IconEnum["plus"] = 256] = "plus";
	    IconEnum[IconEnum["plus2"] = 257] = "plus2";
	    IconEnum[IconEnum["pointItem"] = 258] = "pointItem";
	    IconEnum[IconEnum["popout"] = 259] = "popout";
	    IconEnum[IconEnum["post"] = 260] = "post";
	    IconEnum[IconEnum["print"] = 261] = "print";
	    IconEnum[IconEnum["protectionCenter"] = 262] = "protectionCenter";
	    IconEnum[IconEnum["question"] = 263] = "question";
	    IconEnum[IconEnum["questionReverse"] = 264] = "questionReverse";
	    IconEnum[IconEnum["quote"] = 265] = "quote";
	    IconEnum[IconEnum["radioButton"] = 266] = "radioButton";
	    IconEnum[IconEnum["reactivate"] = 267] = "reactivate";
	    IconEnum[IconEnum["receiptCheck"] = 268] = "receiptCheck";
	    IconEnum[IconEnum["receiptForward"] = 269] = "receiptForward";
	    IconEnum[IconEnum["receiptReply"] = 270] = "receiptReply";
	    IconEnum[IconEnum["refresh"] = 271] = "refresh";
	    IconEnum[IconEnum["reload"] = 272] = "reload";
	    IconEnum[IconEnum["reply"] = 273] = "reply";
	    IconEnum[IconEnum["replyAll"] = 274] = "replyAll";
	    IconEnum[IconEnum["replyAllAlt"] = 275] = "replyAllAlt";
	    IconEnum[IconEnum["replyAlt"] = 276] = "replyAlt";
	    IconEnum[IconEnum["ribbon"] = 277] = "ribbon";
	    IconEnum[IconEnum["room"] = 278] = "room";
	    IconEnum[IconEnum["save"] = 279] = "save";
	    IconEnum[IconEnum["scheduling"] = 280] = "scheduling";
	    IconEnum[IconEnum["search"] = 281] = "search";
	    IconEnum[IconEnum["section"] = 282] = "section";
	    IconEnum[IconEnum["sections"] = 283] = "sections";
	    IconEnum[IconEnum["settings"] = 284] = "settings";
	    IconEnum[IconEnum["share"] = 285] = "share";
	    IconEnum[IconEnum["shield"] = 286] = "shield";
	    IconEnum[IconEnum["sites"] = 287] = "sites";
	    IconEnum[IconEnum["smiley"] = 288] = "smiley";
	    IconEnum[IconEnum["soccer"] = 289] = "soccer";
	    IconEnum[IconEnum["socialListening"] = 290] = "socialListening";
	    IconEnum[IconEnum["sort"] = 291] = "sort";
	    IconEnum[IconEnum["sortLines"] = 292] = "sortLines";
	    IconEnum[IconEnum["split"] = 293] = "split";
	    IconEnum[IconEnum["star"] = 294] = "star";
	    IconEnum[IconEnum["starEmpty"] = 295] = "starEmpty";
	    IconEnum[IconEnum["stopwatch"] = 296] = "stopwatch";
	    IconEnum[IconEnum["story"] = 297] = "story";
	    IconEnum[IconEnum["styleRemove"] = 298] = "styleRemove";
	    IconEnum[IconEnum["subscribe"] = 299] = "subscribe";
	    IconEnum[IconEnum["sun"] = 300] = "sun";
	    IconEnum[IconEnum["sunAdd"] = 301] = "sunAdd";
	    IconEnum[IconEnum["sunQuestion"] = 302] = "sunQuestion";
	    IconEnum[IconEnum["support"] = 303] = "support";
	    IconEnum[IconEnum["table"] = 304] = "table";
	    IconEnum[IconEnum["tablet"] = 305] = "tablet";
	    IconEnum[IconEnum["tag"] = 306] = "tag";
	    IconEnum[IconEnum["taskRecurring"] = 307] = "taskRecurring";
	    IconEnum[IconEnum["tasks"] = 308] = "tasks";
	    IconEnum[IconEnum["teamwork"] = 309] = "teamwork";
	    IconEnum[IconEnum["text"] = 310] = "text";
	    IconEnum[IconEnum["textBox"] = 311] = "textBox";
	    IconEnum[IconEnum["tile"] = 312] = "tile";
	    IconEnum[IconEnum["timeline"] = 313] = "timeline";
	    IconEnum[IconEnum["today"] = 314] = "today";
	    IconEnum[IconEnum["toggle"] = 315] = "toggle";
	    IconEnum[IconEnum["toggleMiddle"] = 316] = "toggleMiddle";
	    IconEnum[IconEnum["touch"] = 317] = "touch";
	    IconEnum[IconEnum["trash"] = 318] = "trash";
	    IconEnum[IconEnum["triangleDown"] = 319] = "triangleDown";
	    IconEnum[IconEnum["triangleEmptyDown"] = 320] = "triangleEmptyDown";
	    IconEnum[IconEnum["triangleEmptyLeft"] = 321] = "triangleEmptyLeft";
	    IconEnum[IconEnum["triangleEmptyRight"] = 322] = "triangleEmptyRight";
	    IconEnum[IconEnum["triangleEmptyUp"] = 323] = "triangleEmptyUp";
	    IconEnum[IconEnum["triangleLeft"] = 324] = "triangleLeft";
	    IconEnum[IconEnum["triangleRight"] = 325] = "triangleRight";
	    IconEnum[IconEnum["triangleUp"] = 326] = "triangleUp";
	    IconEnum[IconEnum["trophy"] = 327] = "trophy";
	    IconEnum[IconEnum["underline"] = 328] = "underline";
	    IconEnum[IconEnum["unsubscribe"] = 329] = "unsubscribe";
	    IconEnum[IconEnum["upload"] = 330] = "upload";
	    IconEnum[IconEnum["video"] = 331] = "video";
	    IconEnum[IconEnum["voicemail"] = 332] = "voicemail";
	    IconEnum[IconEnum["voicemailForward"] = 333] = "voicemailForward";
	    IconEnum[IconEnum["voicemailReply"] = 334] = "voicemailReply";
	    IconEnum[IconEnum["waffle"] = 335] = "waffle";
	    IconEnum[IconEnum["work"] = 336] = "work";
	    IconEnum[IconEnum["wrench"] = 337] = "wrench";
	    IconEnum[IconEnum["x"] = 338] = "x";
	    IconEnum[IconEnum["xCircle"] = 339] = "xCircle";
	})(exports.IconEnum || (exports.IconEnum = {}));
	var IconEnum = exports.IconEnum;
	;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var LabelDirective = (function () {
	    function LabelDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.scope = false;
	        this.template = '<label class="ms-Label"><ng-transclude/></label>';
	    }
	    LabelDirective.factory = function () {
	        var directive = function () { return new LabelDirective(); };
	        return directive;
	    };
	    LabelDirective.prototype.link = function (scope, instanceElement, attributes) {
	        if (ng.isDefined(attributes.disabled)) {
	            instanceElement.find('label').eq(0).addClass('is-disabled');
	        }
	        if (ng.isDefined(attributes.required)) {
	            instanceElement.find('label').eq(0).addClass('is-required');
	        }
	    };
	    return LabelDirective;
	})();
	exports.LabelDirective = LabelDirective;
	exports.module = ng.module('officeuifabric.components.label', ['officeuifabric.components'])
	    .directive('uifLabel', LabelDirective.factory());


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var LinkDirective = (function () {
	    function LinkDirective() {
	        this.restrict = 'E';
	        this.template = '<a ng-href="{{ ngHref }}" class="ms-Link" ng-transclude></a>';
	        this.scope = {
	            ngHref: '@'
	        };
	        this.transclude = true;
	        this.replace = true;
	    }
	    LinkDirective.factory = function () {
	        var directive = function () { return new LinkDirective(); };
	        return directive;
	    };
	    return LinkDirective;
	})();
	exports.LinkDirective = LinkDirective;
	exports.module = ng.module('officeuifabric.components.link', [
	    'officeuifabric.components'
	])
	    .directive('uifLink', LinkDirective.factory());


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var overlayModeEnum_ts_1 = __webpack_require__(19);
	var OverlayController = (function () {
	    function OverlayController(log) {
	        this.log = log;
	    }
	    OverlayController.$inject = ['$log'];
	    return OverlayController;
	})();
	var OverlayDirective = (function () {
	    function OverlayDirective(log) {
	        this.log = log;
	        this.restrict = 'E';
	        this.template = '<div class="ms-Overlay" ng-class="{\'ms-Overlay--dark\': uifMode == \'dark\'}" ng-transclude></div>';
	        this.scope = {
	            uifMode: '@'
	        };
	        this.transclude = true;
	        OverlayDirective.log = log;
	    }
	    OverlayDirective.factory = function () {
	        var directive = function (log) { return new OverlayDirective(log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    OverlayDirective.prototype.link = function (scope) {
	        scope.$watch('uifMode', function (newValue, oldValue) {
	            if (overlayModeEnum_ts_1.OverlayMode[newValue] === undefined) {
	                OverlayDirective.log.error('Error [ngOfficeUiFabric] officeuifabric.components.overlay - Unsupported overlay mode: ' +
	                    'The overlay mode (\'' + scope.uifMode + '\') is not supported by the Office UI Fabric. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/overlay/overlayModeEnum.ts');
	            }
	        });
	    };
	    ;
	    return OverlayDirective;
	})();
	exports.OverlayDirective = OverlayDirective;
	exports.module = ng.module('officeuifabric.components.overlay', [
	    'officeuifabric.components'
	])
	    .directive('uifOverlay', OverlayDirective.factory());


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	(function (OverlayMode) {
	    OverlayMode[OverlayMode["light"] = 0] = "light";
	    OverlayMode[OverlayMode["dark"] = 1] = "dark";
	})(exports.OverlayMode || (exports.OverlayMode = {}));
	var OverlayMode = exports.OverlayMode;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var ProgressIndicatorDirective = (function () {
	    function ProgressIndicatorDirective(log) {
	        this.log = log;
	        this.restrict = 'E';
	        this.template = '<div class="ms-ProgressIndicator">' +
	            '<div class="ms-ProgressIndicator-itemName">{{uifName}}</div>' +
	            '<div class="ms-ProgressIndicator-itemProgress">' +
	            '<div class="ms-ProgressIndicator-progressTrack"></div>' +
	            '<div class="ms-ProgressIndicator-progressBar" ng-style="{width: uifPercentComplete+\'%\'}"></div>' +
	            '</div>' +
	            '<div class="ms-ProgressIndicator-itemDescription">{{uifDescription}}</div>' +
	            '</div>';
	        this.scope = {
	            uifDescription: '@',
	            uifName: '@',
	            uifPercentComplete: '@'
	        };
	        ProgressIndicatorDirective.log = log;
	    }
	    ProgressIndicatorDirective.factory = function () {
	        var directive = function (log) { return new ProgressIndicatorDirective(log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    ProgressIndicatorDirective.prototype.link = function (scope) {
	        scope.$watch('uifPercentComplete', function (newValue, oldValue) {
	            if (newValue == null || newValue === '') {
	                scope.uifPercentComplete = 0;
	                return;
	            }
	            var newPercentComplete = parseFloat(newValue);
	            if (isNaN(newPercentComplete) || newPercentComplete < 0 || newPercentComplete > 100) {
	                ProgressIndicatorDirective.log.error('Error [ngOfficeUiFabric] officeuifabric.components.progressindicator - ' +
	                    'Percent complete must be a valid number between 0 and 100.');
	                scope.uifPercentComplete = Math.max(Math.min(newPercentComplete, 100), 0);
	            }
	        });
	    };
	    ;
	    return ProgressIndicatorDirective;
	})();
	exports.ProgressIndicatorDirective = ProgressIndicatorDirective;
	exports.module = ng.module('officeuifabric.components.progressindicator', [
	    'officeuifabric.components'
	])
	    .directive('uifProgressIndicator', ProgressIndicatorDirective.factory());


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var SearchBoxDirective = (function () {
	    function SearchBoxDirective() {
	        this.template = '<div class="ms-SearchBox" ng-class="{\'is-active\':isActive}">' +
	            '<input class="ms-SearchBox-field" ng-focus="inputFocus()" ng-blur="inputBlur()"' +
	            ' ng-model="value" id="{{::\'searchBox_\'+$id}}" />' +
	            '<label class="ms-SearchBox-label" for="{{::\'searchBox_\'+$id}}" ng-hide="isLabelHidden">' +
	            '<i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i> {{placeholder}}</label>' +
	            '<button class="ms-SearchBox-closeButton" ng-mousedown="btnMousedown()" type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
	            '</div>';
	        this.scope = {
	            placeholder: '=?',
	            value: '=?'
	        };
	    }
	    SearchBoxDirective.factory = function () {
	        var directive = function () { return new SearchBoxDirective(); };
	        return directive;
	    };
	    SearchBoxDirective.prototype.link = function (scope, elem, attrs) {
	        scope.isFocus = false;
	        scope.isCancel = false;
	        scope.isLabelHidden = false;
	        scope.isActive = false;
	        scope.inputFocus = function () {
	            scope.isFocus = true;
	            scope.isLabelHidden = true;
	            scope.isActive = true;
	        };
	        scope.inputBlur = function () {
	            if (scope.isCancel) {
	                scope.value = '';
	                scope.isLabelHidden = false;
	            }
	            scope.isActive = false;
	            if (typeof (scope.value) === 'undefined' || scope.value === '') {
	                scope.isLabelHidden = false;
	            }
	            scope.isFocus = scope.isCancel = false;
	        };
	        scope.btnMousedown = function () {
	            scope.isCancel = true;
	        };
	        scope.$watch('value', function (val) {
	            if (!scope.isFocus) {
	                if (val && val !== '') {
	                    scope.isLabelHidden = true;
	                }
	                else {
	                    scope.isLabelHidden = false;
	                }
	                scope.value = val;
	            }
	        });
	        scope.$watch('placeholder', function (search) {
	            scope.placeholder = search;
	        });
	    };
	    return SearchBoxDirective;
	})();
	exports.SearchBoxDirective = SearchBoxDirective;
	exports.module = ng.module('officeuifabric.components.searchbox', ['officeuifabric.components'])
	    .directive('uifSearchbox', SearchBoxDirective.factory());


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var spinnerSizeEnum_1 = __webpack_require__(23);
	var SpinnerDirective = (function () {
	    function SpinnerDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Spinner"></div>';
	        this.controller = SpinnerController;
	        this.scope = {
	            'ngShow': '=',
	            'uifSize': '@'
	        };
	    }
	    SpinnerDirective.factory = function () {
	        var directive = function () { return new SpinnerDirective(); };
	        return directive;
	    };
	    SpinnerDirective.prototype.link = function (scope, instanceElement, attrs, controller, $transclude) {
	        if (ng.isDefined(attrs.uifSize)) {
	            if (ng.isUndefined(spinnerSizeEnum_1.SpinnerSize[attrs.uifSize])) {
	                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.spinner - Unsupported size: ' +
	                    'Spinner size (\'' + attrs.uifSize + '\') is not supported by the Office UI Fabric.');
	            }
	            if (spinnerSizeEnum_1.SpinnerSize[attrs.uifSize] === spinnerSizeEnum_1.SpinnerSize.large) {
	                instanceElement.addClass('ms-Spinner--large');
	            }
	        }
	        if (attrs.ngShow != null) {
	            scope.$watch('ngShow', function (newVisible, oldVisible, spinnerScope) {
	                if (newVisible) {
	                    spinnerScope.start();
	                }
	                else {
	                    spinnerScope.stop();
	                }
	            });
	        }
	        else {
	            scope.start();
	        }
	        $transclude(function (clone) {
	            if (clone.length > 0) {
	                var wrapper = ng.element('<div></div>');
	                wrapper.addClass('ms-Spinner-label').append(clone);
	                instanceElement.append(wrapper);
	            }
	        });
	        scope.init();
	    };
	    return SpinnerDirective;
	})();
	exports.SpinnerDirective = SpinnerDirective;
	var SpinnerController = (function () {
	    function SpinnerController($scope, $element, $interval, $log) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$element = $element;
	        this.$interval = $interval;
	        this.$log = $log;
	        this._offsetSize = 0.179;
	        this._numCircles = 8;
	        this._animationSpeed = 90;
	        this._circles = [];
	        $scope.init = function () {
	            _this._parentSize = spinnerSizeEnum_1.SpinnerSize[_this.$scope.uifSize] === spinnerSizeEnum_1.SpinnerSize.large ? 28 : 20;
	            _this.createCirclesAndArrange();
	            _this.setInitialOpacity();
	        };
	        $scope.start = function () {
	            _this._animationInterval = $interval(function () {
	                var i = _this._circles.length;
	                while (i--) {
	                    _this.fadeCircle(_this._circles[i]);
	                }
	            }, _this._animationSpeed);
	        };
	        $scope.stop = function () {
	            $interval.cancel(_this._animationInterval);
	        };
	    }
	    SpinnerController.prototype.createCirclesAndArrange = function () {
	        var angle = 0;
	        var offset = this._parentSize * this._offsetSize;
	        var step = (2 * Math.PI) / this._numCircles;
	        var i = this._numCircles;
	        var radius = (this._parentSize - offset) * 0.5;
	        while (i--) {
	            var circle = this.createCircle();
	            var x = Math.round(this._parentSize * 0.5 + radius * Math.cos(angle) - circle[0].clientWidth * 0.5) - offset * 0.5;
	            var y = Math.round(this._parentSize * 0.5 + radius * Math.sin(angle) - circle[0].clientHeight * 0.5) - offset * 0.5;
	            this.$element.append(circle);
	            circle.css('left', (x + 'px'));
	            circle.css('top', (y + 'px'));
	            angle += step;
	            var circleObject = new CircleObject(circle, i);
	            this._circles.push(circleObject);
	        }
	    };
	    SpinnerController.prototype.createCircle = function () {
	        var circle = ng.element('<div></div>');
	        var dotSize = (this._parentSize * this._offsetSize) + 'px';
	        circle.addClass('ms-Spinner-circle').css('width', dotSize).css('height', dotSize);
	        return circle;
	    };
	    ;
	    SpinnerController.prototype.setInitialOpacity = function () {
	        var _this = this;
	        var opcaityToSet;
	        this._fadeIncrement = 1 / this._numCircles;
	        this._circles.forEach(function (circle, index) {
	            opcaityToSet = (_this._fadeIncrement * (index + 1));
	            circle.opacity = opcaityToSet;
	        });
	    };
	    SpinnerController.prototype.fadeCircle = function (circle) {
	        var newOpacity = circle.opacity - this._fadeIncrement;
	        if (newOpacity <= 0) {
	            newOpacity = 1;
	        }
	        circle.opacity = newOpacity;
	    };
	    SpinnerController.$inject = ['$scope', '$element', '$interval', '$log'];
	    return SpinnerController;
	})();
	var CircleObject = (function () {
	    function CircleObject(circleElement, circleIndex) {
	        this.circleElement = circleElement;
	        this.circleIndex = circleIndex;
	    }
	    Object.defineProperty(CircleObject.prototype, "opacity", {
	        get: function () {
	            return +(this.circleElement.css('opacity'));
	        },
	        set: function (opacity) {
	            this.circleElement.css('opacity', opacity);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CircleObject;
	})();
	exports.module = ng.module('officeuifabric.components.spinner', ['officeuifabric.components'])
	    .directive('uifSpinner', SpinnerDirective.factory());


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	(function (SpinnerSize) {
	    SpinnerSize[SpinnerSize['small'] = 0] = 'small';
	    SpinnerSize[SpinnerSize['large'] = 1] = 'large';
	})(exports.SpinnerSize || (exports.SpinnerSize = {}));
	var SpinnerSize = exports.SpinnerSize;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var tableRowSelectModeEnum_1 = __webpack_require__(25);
	var TableController = (function () {
	    function TableController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	        this.$scope.orderBy = null;
	        this.$scope.orderAsc = true;
	        this.$scope.rows = [];
	    }
	    Object.defineProperty(TableController.prototype, "orderBy", {
	        get: function () {
	            return this.$scope.orderBy;
	        },
	        set: function (property) {
	            this.$scope.orderBy = property;
	            this.$scope.$digest();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableController.prototype, "orderAsc", {
	        get: function () {
	            return this.$scope.orderAsc;
	        },
	        set: function (orderAsc) {
	            this.$scope.orderAsc = orderAsc;
	            this.$scope.$digest();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableController.prototype, "rowSelectMode", {
	        get: function () {
	            return this.$scope.rowSelectMode;
	        },
	        set: function (rowSelectMode) {
	            if (tableRowSelectModeEnum_1.TableRowSelectModeEnum[rowSelectMode] === undefined) {
	                this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
	                    '\'' + rowSelectMode + '\' is not a valid option for \'uif-row-select-mode\'. ' +
	                    'Valid options are none|single|multiple.');
	            }
	            this.$scope.rowSelectMode = rowSelectMode;
	            this.$scope.$digest();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableController.prototype, "rows", {
	        get: function () {
	            return this.$scope.rows;
	        },
	        set: function (rows) {
	            this.$scope.rows = rows;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableController.prototype, "selectedItems", {
	        get: function () {
	            var selectedItems = [];
	            for (var i = 0; i < this.rows.length; i++) {
	                if (this.rows[i].selected === true) {
	                    selectedItems.push(this.rows[i].item);
	                }
	            }
	            return selectedItems;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TableController.$inject = ['$scope', '$log'];
	    return TableController;
	})();
	var TableDirective = (function () {
	    function TableDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Table" ng-transclude></div>';
	        this.controller = TableController;
	        this.controllerAs = 'table';
	    }
	    TableDirective.factory = function () {
	        var directive = function () { return new TableDirective(); };
	        return directive;
	    };
	    TableDirective.prototype.link = function (scope, instanceElement, attrs, controller) {
	        if (attrs.uifRowSelectMode !== undefined && attrs.uifRowSelectMode !== null) {
	            if (tableRowSelectModeEnum_1.TableRowSelectModeEnum[attrs.uifRowSelectMode] === undefined) {
	                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
	                    '\'' + attrs.uifRowSelectMode + '\' is not a valid option for \'uif-row-select-mode\'. ' +
	                    'Valid options are none|single|multiple.');
	            }
	            else {
	                scope.rowSelectMode = attrs.uifRowSelectMode;
	            }
	        }
	        if (scope.rowSelectMode === undefined) {
	            scope.rowSelectMode = tableRowSelectModeEnum_1.TableRowSelectModeEnum[tableRowSelectModeEnum_1.TableRowSelectModeEnum.none];
	        }
	    };
	    return TableDirective;
	})();
	exports.TableDirective = TableDirective;
	var TableRowController = (function () {
	    function TableRowController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	    }
	    Object.defineProperty(TableRowController.prototype, "item", {
	        get: function () {
	            return this.$scope.item;
	        },
	        set: function (item) {
	            this.$scope.item = item;
	            this.$scope.$digest();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableRowController.prototype, "selected", {
	        get: function () {
	            return this.$scope.selected;
	        },
	        set: function (selected) {
	            this.$scope.selected = selected;
	            this.$scope.$digest();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TableRowController.$inject = ['$scope', '$log'];
	    return TableRowController;
	})();
	var TableRowDirective = (function () {
	    function TableRowDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Table-row" ng-transclude></div>';
	        this.require = '^uifTable';
	        this.scope = {
	            item: '=uifItem'
	        };
	        this.controller = TableRowController;
	    }
	    TableRowDirective.factory = function () {
	        var directive = function () { return new TableRowDirective(); };
	        return directive;
	    };
	    TableRowDirective.prototype.link = function (scope, instanceElement, attrs, table) {
	        if (attrs.uifSelected !== undefined &&
	            attrs.uifSelected !== null) {
	            var selectedString = attrs.uifSelected.toLowerCase();
	            if (selectedString !== 'true' && selectedString !== 'false') {
	                table.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
	                    '\'' + attrs.uifSelected + '\' is not a valid boolean value. ' +
	                    'Valid options are true|false.');
	            }
	            else {
	                if (selectedString === 'true') {
	                    scope.selected = true;
	                }
	            }
	        }
	        if (scope.item !== undefined) {
	            table.rows.push(scope);
	        }
	        scope.rowClick = function (ev) {
	            scope.selected = !scope.selected;
	            scope.$apply();
	        };
	        scope.$watch('selected', function (newValue, oldValue, tableRowScope) {
	            if (newValue === true) {
	                if (table.rowSelectMode === tableRowSelectModeEnum_1.TableRowSelectModeEnum[tableRowSelectModeEnum_1.TableRowSelectModeEnum.single]) {
	                    if (table.rows) {
	                        for (var i = 0; i < table.rows.length; i++) {
	                            if (table.rows[i] !== tableRowScope) {
	                                table.rows[i].selected = false;
	                            }
	                        }
	                    }
	                }
	                instanceElement.addClass('is-selected');
	            }
	            else {
	                instanceElement.removeClass('is-selected');
	            }
	        });
	        if (table.rowSelectMode !== tableRowSelectModeEnum_1.TableRowSelectModeEnum[tableRowSelectModeEnum_1.TableRowSelectModeEnum.none] &&
	            scope.item !== undefined) {
	            instanceElement.on('click', scope.rowClick);
	        }
	        if (table.rowSelectMode === tableRowSelectModeEnum_1.TableRowSelectModeEnum[tableRowSelectModeEnum_1.TableRowSelectModeEnum.none]) {
	            instanceElement.css('cursor', 'default');
	        }
	    };
	    return TableRowDirective;
	})();
	exports.TableRowDirective = TableRowDirective;
	var TableRowSelectDirective = (function () {
	    function TableRowSelectDirective() {
	        this.restrict = 'E';
	        this.template = '<span class="ms-Table-rowCheck"></span>';
	        this.replace = true;
	        this.require = ['^uifTable', '^uifTableRow'];
	    }
	    TableRowSelectDirective.factory = function () {
	        var directive = function () { return new TableRowSelectDirective(); };
	        return directive;
	    };
	    TableRowSelectDirective.prototype.link = function (scope, instanceElement, attrs, controllers) {
	        scope.rowSelectClick = function (ev) {
	            var table = controllers[0];
	            var row = controllers[1];
	            if (table.rowSelectMode !== tableRowSelectModeEnum_1.TableRowSelectModeEnum[tableRowSelectModeEnum_1.TableRowSelectModeEnum.multiple]) {
	                return;
	            }
	            if (row.item === undefined || row.item === null) {
	                var shouldSelectAll = false;
	                for (var i = 0; i < table.rows.length; i++) {
	                    if (table.rows[i].selected !== true) {
	                        shouldSelectAll = true;
	                        break;
	                    }
	                }
	                for (var i = 0; i < table.rows.length; i++) {
	                    if (table.rows[i].selected !== shouldSelectAll) {
	                        table.rows[i].selected = shouldSelectAll;
	                    }
	                }
	                scope.$apply();
	            }
	        };
	        instanceElement.on('click', scope.rowSelectClick);
	    };
	    return TableRowSelectDirective;
	})();
	exports.TableRowSelectDirective = TableRowSelectDirective;
	var TableCellDirective = (function () {
	    function TableCellDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<span class="ms-Table-cell" ng-transclude></span>';
	        this.replace = true;
	    }
	    TableCellDirective.factory = function () {
	        var directive = function () { return new TableCellDirective(); };
	        return directive;
	    };
	    return TableCellDirective;
	})();
	exports.TableCellDirective = TableCellDirective;
	var TableHeaderDirective = (function () {
	    function TableHeaderDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<span class="ms-Table-cell" ng-transclude></span>';
	        this.require = '^uifTable';
	    }
	    TableHeaderDirective.factory = function () {
	        var directive = function () { return new TableHeaderDirective(); };
	        return directive;
	    };
	    TableHeaderDirective.prototype.link = function (scope, instanceElement, attrs, table) {
	        scope.headerClick = function (ev) {
	            if (table.orderBy === attrs.uifOrderBy) {
	                table.orderAsc = !table.orderAsc;
	            }
	            else {
	                table.orderBy = attrs.uifOrderBy;
	                table.orderAsc = true;
	            }
	        };
	        scope.$watch('table.orderBy', function (newOrderBy, oldOrderBy, tableHeaderScope) {
	            if (oldOrderBy !== newOrderBy &&
	                newOrderBy === attrs.uifOrderBy) {
	                var cells = instanceElement.parent().children();
	                for (var i = 0; i < cells.length; i++) {
	                    if (cells.eq(i).children().length === 2) {
	                        cells.eq(i).children().eq(1).remove();
	                    }
	                }
	                instanceElement.append('<span class="uif-sort-order">&nbsp;\
	                <i class="ms-Icon ms-Icon--caretDown" aria-hidden="true"></i></span>');
	            }
	        });
	        scope.$watch('table.orderAsc', function (newOrderAsc, oldOrderAsc, tableHeaderScope) {
	            if (instanceElement.children().length === 2) {
	                var oldCssClass = oldOrderAsc ? 'ms-Icon--caretDown' : 'ms-Icon--caretUp';
	                var newCssClass = newOrderAsc ? 'ms-Icon--caretDown' : 'ms-Icon--caretUp';
	                instanceElement.children().eq(1).children().eq(0).removeClass(oldCssClass).addClass(newCssClass);
	            }
	        });
	        if ('uifOrderBy' in attrs) {
	            instanceElement.on('click', scope.headerClick);
	        }
	    };
	    return TableHeaderDirective;
	})();
	exports.TableHeaderDirective = TableHeaderDirective;
	exports.module = ng.module('officeuifabric.components.table', ['officeuifabric.components'])
	    .directive('uifTable', TableDirective.factory())
	    .directive('uifTableRow', TableRowDirective.factory())
	    .directive('uifTableRowSelect', TableRowSelectDirective.factory())
	    .directive('uifTableCell', TableCellDirective.factory())
	    .directive('uifTableHeader', TableHeaderDirective.factory());


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	(function (TableRowSelectModeEnum) {
	    TableRowSelectModeEnum[TableRowSelectModeEnum["none"] = 0] = "none";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["single"] = 1] = "single";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["multiple"] = 2] = "multiple";
	})(exports.TableRowSelectModeEnum || (exports.TableRowSelectModeEnum = {}));
	var TableRowSelectModeEnum = exports.TableRowSelectModeEnum;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var TextFieldDirective = (function () {
	    function TextFieldDirective() {
	        this.template = '<div ng-class="{\'is-active\': isActive, \'ms-TextField\': true, ' +
	            '\'ms-TextField--underlined\': uifUnderlined, \'ms-TextField--placeholder\': placeholder}">' +
	            '<label ng-show="labelShown" class="ms-Label">{{uifLabel || placeholder}}</label>' +
	            '<input ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" class="ms-TextField-field" />' +
	            '<span class="ms-TextField-description">{{uifDescription}}</span>' +
	            '</div>';
	        this.scope = {
	            ngModel: '=',
	            placeholder: '@',
	            uifDescription: '@',
	            uifLabel: '@'
	        };
	        this.require = '?ngModel';
	        this.restrict = 'E';
	    }
	    TextFieldDirective.factory = function () {
	        var directive = function () { return new TextFieldDirective(); };
	        return directive;
	    };
	    TextFieldDirective.prototype.link = function (scope, instanceElement, attrs, ngModel) {
	        scope.labelShown = true;
	        scope.uifUnderlined = 'uifUnderlined' in attrs;
	        scope.inputFocus = function (ev) {
	            if (scope.uifUnderlined) {
	                scope.isActive = true;
	            }
	        };
	        scope.inputClick = function (ev) {
	            if (scope.placeholder) {
	                scope.labelShown = false;
	            }
	        };
	        scope.inputBlur = function (ev) {
	            var input = instanceElement.find('input');
	            if (scope.placeholder && input.val().length === 0) {
	                scope.labelShown = true;
	            }
	            if (scope.uifUnderlined) {
	                scope.isActive = false;
	            }
	        };
	        if (ngModel != null) {
	            ngModel.$render = function () {
	                scope.labelShown = !ngModel.$viewValue;
	            };
	        }
	    };
	    return TextFieldDirective;
	})();
	exports.TextFieldDirective = TextFieldDirective;
	exports.module = ng.module('officeuifabric.components.textfield', [
	    'officeuifabric.components'
	])
	    .directive('uifTextfield', TextFieldDirective.factory());


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var ToggleDirective = (function () {
	    function ToggleDirective() {
	        this.template = '<div ng-class="toggleClass">' +
	            '<span class="ms-Toggle-description"><ng-transclude/></span>' +
	            '<input type="checkbox" id="{{::$id}}" class="ms-Toggle-input" ng-model="ngModel" />' +
	            '<label for="{{::$id}}" class="ms-Toggle-field">' +
	            '<span class="ms-Label ms-Label--off">{{uifLabelOff}}</span>' +
	            '<span class="ms-Label ms-Label--on">{{uifLabelOn}}</span>' +
	            '</label>' +
	            '</div>';
	        this.restrict = 'E';
	        this.transclude = true;
	        this.scope = {
	            ngModel: '=?',
	            uifLabelOff: '@',
	            uifLabelOn: '@',
	            uifTextLocation: '@'
	        };
	    }
	    ToggleDirective.factory = function () {
	        var directive = function () { return new ToggleDirective(); };
	        return directive;
	    };
	    ToggleDirective.prototype.link = function (scope, elem, attrs) {
	        scope.toggleClass = 'ms-Toggle';
	        if (scope.uifTextLocation) {
	            var loc = scope.uifTextLocation;
	            loc = loc.charAt(0).toUpperCase() + loc.slice(1);
	            scope.toggleClass += ' ms-Toggle--text' + loc;
	        }
	    };
	    return ToggleDirective;
	})();
	exports.ToggleDirective = ToggleDirective;
	exports.module = ng.module('officeuifabric.components.toggle', [
	    'officeuifabric.components'
	])
	    .directive('uifToggle', ToggleDirective.factory());


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNjg3YWU4ODY0MjNmNzc5MTM4MyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblRlbXBsYXRlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZFR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xhYmVsL2xhYmVsRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpbmsvbGlua0RpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBLGdEOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5QyxxQ0FBcUM7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxnQ0FBZ0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBbUUsZ0JBQWdCO0FBQ25GLHlCQUF3QjtBQUN4QiwyRkFBMEY7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvREFBb0Q7QUFDckQ7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLGtDQUFrQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxzREFBcUQsd0JBQXdCO0FBQzdFO0FBQ0EsaURBQWdELHdCQUF3QjtBQUN4RTtBQUNBLHlFQUF3RSx3QkFBd0I7QUFDaEc7QUFDQSxvRUFBbUUsd0JBQXdCO0FBQzNGO0FBQ0EseUVBQXdFLHdCQUF3QjtBQUNoRztBQUNBLG9FQUFtRSx3QkFBd0I7QUFDM0Y7QUFDQSwwRUFBeUUsd0JBQXdCO0FBQ2pHO0FBQ0EscUVBQW9FLHdCQUF3QjtBQUM1RjtBQUNBLHNFQUFxRSx3QkFBd0I7QUFDN0Y7QUFDQSxpRUFBZ0Usd0JBQXdCO0FBQ3hGO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx5Q0FBeUM7QUFDOUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHdEQUF3RDtBQUN6RDtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxnRUFBZ0U7QUFDakU7QUFDQTs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQixPQUFPLHVDQUF1QyxTQUFTLFdBQVcsT0FBTztBQUNuRyxrREFBaUQsYUFBYSxvQkFBb0IsY0FBYztBQUNoRyw0QkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QiwyQkFBMkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDBEQUEwRDtBQUMzRDtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsc0NBQXNDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNLQUFxSyxxREFBcUQsb0NBQW9DLE1BQU07QUFDcFE7QUFDQSxxSEFBb0gscURBQXFELHFEQUFxRCxNQUFNO0FBQ3BPLDJIQUEwSCxNQUFNO0FBQ2hJO0FBQ0E7QUFDQTtBQUNBLDBDQUF5Qyw4Q0FBOEM7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVFQUF1RTtBQUMvRjtBQUNBLGdEQUErQyxlQUFlO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx1REFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDRDQUE0QztBQUM3QztBQUNBOzs7Ozs7O0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkJBQTZCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsVUFBVTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTRELDBDQUEwQztBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxrQ0FBa0M7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMEQsU0FBUztBQUNuRTtBQUNBO0FBQ0EsdUVBQXNFLGdDQUFnQztBQUN0RztBQUNBLGtFQUFpRSxnQkFBZ0I7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLDRDQUE0QztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBOEQsdUJBQXVCO0FBQ3JGO0FBQ0Esc0NBQXFDLHNCQUFzQjtBQUMzRCx1REFBc0Qsc0JBQXNCO0FBQzVFLDJFQUEwRSxhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQztBQUNEO0FBQ0E7Ozs7Ozs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGtEQUFrRDtBQUNuRDs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDZCQUE2QjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1Qyx1QkFBdUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLHVCQUF1QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLHVCQUF1QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTJFO0FBQzNFO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0VBQXdFO0FBQ3pFOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUM7QUFDekMsc0dBQXFHO0FBQ3JHLDZEQUE0RCx5QkFBeUI7QUFDckY7QUFDQSx1REFBc0QsZ0JBQWdCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLE9BQU87QUFDakQsNEJBQTJCLE9BQU87QUFDbEMscURBQW9ELGFBQWE7QUFDakUsb0RBQW1ELFlBQVk7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibmdPZmZpY2VVaUZhYnJpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSkgOiBmYWN0b3J5KHJvb3RbXCJhbmd1bGFyXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwNjg3YWU4ODY0MjNmNzc5MTM4M1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb3JlJywgW10pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb3JlL2NvcmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2FsbG91dE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0RGlyZWN0aXZlJyk7XG52YXIgYnV0dG9uTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlJyk7XG52YXIgY2hvaWNlZmllbGRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlJyk7XG52YXIgY29udGV4dHVhbE1lbnVNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51Jyk7XG52YXIgZHJvcGRvd25Nb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlJyk7XG52YXIgaWNvbk1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaWNvbi9pY29uRGlyZWN0aXZlJyk7XG52YXIgbGFiZWxNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2xhYmVsL2xhYmVsRGlyZWN0aXZlJyk7XG52YXIgbGlua01vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbGluay9saW5rRGlyZWN0aXZlJyk7XG52YXIgb3ZlcmxheU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5RGlyZWN0aXZlJyk7XG52YXIgcHJvZ3Jlc3NJbmRpY2F0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3Byb2dyZXNzaW5kaWNhdG9yL3Byb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlJyk7XG52YXIgc2VhcmNoYm94TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zZWFyY2hib3gvc2VhcmNoYm94RGlyZWN0aXZlJyk7XG52YXIgc3Bpbm5lck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlJyk7XG52YXIgdGFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RhYmxlL3RhYmxlRGlyZWN0aXZlJyk7XG52YXIgdGV4dEZpZWxkTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlJyk7XG52YXIgdG9nZ2xlTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90b2dnbGUvdG9nZ2xlRGlyZWN0aXZlJyk7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cycsIFtcbiAgICBjYWxsb3V0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGJ1dHRvbk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjaG9pY2VmaWVsZE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb250ZXh0dWFsTWVudU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkcm9wZG93bk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBpY29uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxhYmVsTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxpbmtNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgb3ZlcmxheU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwcm9ncmVzc0luZGljYXRvck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBzZWFyY2hib3hNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgc3Bpbm5lck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0YWJsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0ZXh0RmllbGRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdG9nZ2xlTW9kdWxlLm1vZHVsZS5uYW1lXG5dKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9jb21wb25lbnRzLnRzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGNhbGxvdXRUeXBlRW51bV8xID0gcmVxdWlyZSgnLi9jYWxsb3V0VHlwZUVudW0nKTtcbnZhciBjYWxsb3V0QXJyb3dFbnVtXzEgPSByZXF1aXJlKCcuL2NhbGxvdXRBcnJvd0VudW0nKTtcbnZhciBDYWxsb3V0Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FsbG91dENvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBDYWxsb3V0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuICAgIHJldHVybiBDYWxsb3V0Q29udHJvbGxlcjtcbn0pKCk7XG5leHBvcnRzLkNhbGxvdXRDb250cm9sbGVyID0gQ2FsbG91dENvbnRyb2xsZXI7XG52YXIgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1oZWFkZXJcIj48cCBjbGFzcz1cIm1zLUNhbGxvdXQtdGl0bGVcIiBuZy10cmFuc2NsdWRlPjwvcD48L2Rpdj4nO1xuICAgIH1cbiAgICBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIG1haW5XcmFwcGVyID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLnBhcmVudCgpO1xuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKG1haW5XcmFwcGVyKSAmJiBtYWluV3JhcHBlci5oYXNDbGFzcygnbXMtQ2FsbG91dC1tYWluJykpIHtcbiAgICAgICAgICAgIHZhciBkZXRhY2hlZEhlYWRlciA9IGluc3RhbmNlRWxlbWVudC5kZXRhY2goKTtcbiAgICAgICAgICAgIG1haW5XcmFwcGVyLnByZXBlbmQoZGV0YWNoZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEhlYWRlckRpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLkNhbGxvdXRIZWFkZXJEaXJlY3RpdmUgPSBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlO1xudmFyIENhbGxvdXRDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1jb250ZW50XCI+PHAgY2xhc3M9XCJtcy1DYWxsb3V0LXN1YlRleHRcIiBuZy10cmFuc2NsdWRlPjwvcD48L2Rpdj4nO1xuICAgIH1cbiAgICBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dENvbnRlbnREaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5DYWxsb3V0Q29udGVudERpcmVjdGl2ZSA9IENhbGxvdXRDb250ZW50RGlyZWN0aXZlO1xudmFyIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1hY3Rpb25zXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXj91aWZDYWxsb3V0JztcbiAgICB9XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNhbGxvdXRDb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChuZy5pc09iamVjdChjYWxsb3V0Q29udHJvbGxlcikpIHtcbiAgICAgICAgICAgIGNhbGxvdXRDb250cm9sbGVyLiRzY29wZS4kd2F0Y2goJ2hhc1NlcGFyYXRvcicsIGZ1bmN0aW9uIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uQ2hpbGRyZW4gPSBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGJ1dHRvbkluZGV4ID0gMDsgYnV0dG9uSW5kZXggPCBhY3Rpb25DaGlsZHJlbi5sZW5ndGg7IGJ1dHRvbkluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbkNoaWxkcmVuLmVxKGJ1dHRvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1NlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmFkZENsYXNzKCdtcy1DYWxsb3V0LWFjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnJlbW92ZUNsYXNzKCdtcy1DYWxsb3V0LWFjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFucyA9IGFjdGlvbi5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHNwYW5JbmRleCA9IDA7IHNwYW5JbmRleCA8IGFjdGlvblNwYW5zLmxlbmd0aDsgc3BhbkluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFuID0gYWN0aW9uU3BhbnMuZXEoc3BhbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TcGFuLmFkZENsYXNzKCdtcy1DYWxsb3V0LWFjdGlvblRleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblNwYW4ucmVtb3ZlQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLkNhbGxvdXRBY3Rpb25zRGlyZWN0aXZlID0gQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmU7XG52YXIgQ2FsbG91dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FsbG91dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQgbXMtQ2FsbG91dC0tYXJyb3d7e2Fycm93RGlyZWN0aW9ufX1cIiAnICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cIntcXCdtcy1DYWxsb3V0LS1hY3Rpb25UZXh0XFwnOiBoYXNTZXBhcmF0b3IsIFxcJ21zLUNhbGxvdXQtLU9PQkVcXCc6IHVpZlR5cGU9PVxcJ29vYmVcXCcsJyArXG4gICAgICAgICAgICAnIFxcJ21zLUNhbGxvdXQtLVBlZWtcXCc6IHVpZlR5cGU9PVxcJ3BlZWtcXCcsIFxcJ21zLUNhbGxvdXQtLWNsb3NlXFwnOiBjbG9zZUJ1dHRvbn1cIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1tYWluXCI+PGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtaW5uZXJcIiBuZy10cmFuc2NsdWRlPjwvZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2FsbG91dCddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdTaG93OiAnPT8nLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENhbGxvdXRDb250cm9sbGVyO1xuICAgIH1cbiAgICBDYWxsb3V0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIGNhbGxvdXRDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCd1aWZUeXBlJywgZnVuY3Rpb24gKGNhbGxvdXRUeXBlKSB7XG4gICAgICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoY2FsbG91dFR5cGVFbnVtXzEuQ2FsbG91dFR5cGVbY2FsbG91dFR5cGVdKSkge1xuICAgICAgICAgICAgICAgIGNhbGxvdXRDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNhbGxvdXQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBjYWxsb3V0VHlwZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmVHlwZS4gSXQgc2hvdWxkIGJlIG9vYmUgb3IgcGVlaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFhdHRycy51aWZBcnJvdykge1xuICAgICAgICAgICAgc2NvcGUuYXJyb3dEaXJlY3Rpb24gPSAnTGVmdCc7XG4gICAgICAgIH1cbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3VpZkFycm93JywgZnVuY3Rpb24gKGF0dHJBcnJvd0RpcmVjdGlvbikge1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGNhbGxvdXRBcnJvd0VudW1fMS5DYWxsb3V0QXJyb3dbYXR0ckFycm93RGlyZWN0aW9uXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ckFycm93RGlyZWN0aW9uICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZBcnJvdy4gSXQgc2hvdWxkIGJlIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FwaXRhbGl6ZWREaXJlY3Rpb24gPSAoYXR0ckFycm93RGlyZWN0aW9uLmNoYXJBdCgwKSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNhcGl0YWxpemVkRGlyZWN0aW9uICs9IChhdHRyQXJyb3dEaXJlY3Rpb24uc2xpY2UoMSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBzY29wZS5hcnJvd0RpcmVjdGlvbiA9IGNhcGl0YWxpemVkRGlyZWN0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuaGFzU2VwYXJhdG9yID0gKCFuZy5pc1VuZGVmaW5lZChhdHRycy51aWZBY3Rpb25UZXh0KSB8fCAhbmcuaXNVbmRlZmluZWQoYXR0cnMudWlmU2VwYXJhdG9yKSk7XG4gICAgICAgIGlmICghbmcuaXNVbmRlZmluZWQoYXR0cnMudWlmQ2xvc2UpKSB7XG4gICAgICAgICAgICBzY29wZS5jbG9zZUJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gbmcuZWxlbWVudCgnPGJ1dHRvbiBjbGFzcz1cIm1zLUNhbGxvdXQtY2xvc2VcIj4nICtcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXhcIj48L2k+JyArXG4gICAgICAgICAgICAgICAgJzwvYnV0dG9uPicpO1xuICAgICAgICAgICAgdmFyIGNhbGxvdXREaXYgPSBpbnN0YW5jZUVsZW1lbnQuZmluZCgnZGl2JykuZXEoMCk7XG4gICAgICAgICAgICBjYWxsb3V0RGl2LmFwcGVuZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgICAgICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5iaW5kKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBzY29wZS5pc01vdXNlT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5iaW5kKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBzY29wZS5pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ25nU2hvdycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpc0Nsb3NpbmdCeUJ1dHRvbkNsaWNrID0gIW5ld1ZhbHVlICYmIHNjb3BlLmNsb3NlQnV0dG9uQ2xpY2tlZDtcbiAgICAgICAgICAgIGlmIChpc0Nsb3NpbmdCeUJ1dHRvbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IHNjb3BlLmlzTW91c2VPdmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc01vdXNlT3ZlcicsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICAgaWYgKCFuZXdWYWwgJiYgb2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29wZS5jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENhbGxvdXREaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5DYWxsb3V0RGlyZWN0aXZlID0gQ2FsbG91dERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNhbGxvdXQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0JywgQ2FsbG91dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEhlYWRlcicsIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRDb250ZW50JywgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRBY3Rpb25zJywgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXREaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKENhbGxvdXRUeXBlKSB7XG4gICAgQ2FsbG91dFR5cGVbQ2FsbG91dFR5cGVbXCJvb2JlXCJdID0gMF0gPSBcIm9vYmVcIjtcbiAgICBDYWxsb3V0VHlwZVtDYWxsb3V0VHlwZVtcInBlZWtcIl0gPSAxXSA9IFwicGVla1wiO1xufSkoZXhwb3J0cy5DYWxsb3V0VHlwZSB8fCAoZXhwb3J0cy5DYWxsb3V0VHlwZSA9IHt9KSk7XG52YXIgQ2FsbG91dFR5cGUgPSBleHBvcnRzLkNhbGxvdXRUeXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dFR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChDYWxsb3V0QXJyb3cpIHtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wibGVmdFwiXSA9IDBdID0gXCJsZWZ0XCI7XG4gICAgQ2FsbG91dEFycm93W0NhbGxvdXRBcnJvd1tcInJpZ2h0XCJdID0gMV0gPSBcInJpZ2h0XCI7XG4gICAgQ2FsbG91dEFycm93W0NhbGxvdXRBcnJvd1tcInRvcFwiXSA9IDJdID0gXCJ0b3BcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wiYm90dG9tXCJdID0gM10gPSBcImJvdHRvbVwiO1xufSkoZXhwb3J0cy5DYWxsb3V0QXJyb3cgfHwgKGV4cG9ydHMuQ2FsbG91dEFycm93ID0ge30pKTtcbnZhciBDYWxsb3V0QXJyb3cgPSBleHBvcnRzLkNhbGxvdXRBcnJvdztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgYnV0dG9uVHlwZUVudW1fdHNfMSA9IHJlcXVpcmUoJy4vYnV0dG9uVHlwZUVudW0udHMnKTtcbnZhciBidXR0b25UZW1wbGF0ZVR5cGVfdHNfMSA9IHJlcXVpcmUoJy4vYnV0dG9uVGVtcGxhdGVUeXBlLnRzJyk7XG52YXIgQnV0dG9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnV0dG9uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIEJ1dHRvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBCdXR0b25Db250cm9sbGVyO1xufSkoKTtcbnZhciBCdXR0b25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnV0dG9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnYnV0dG9uJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRhdHRycy51aWZUeXBlKSAmJiBuZy5pc1VuZGVmaW5lZChidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtWyRhdHRycy51aWZUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5idXR0b24gLSBVbnN1cHBvcnRlZCBidXR0b246ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGJ1dHRvbiAoXFwnJyArICRhdHRycy51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKCRhdHRycy51aWZUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0ucHJpbWFyeV06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmcuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRMaW5rXTtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kTGlua107XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uaGVyb106XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25MaW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5fcG9wdWxhdGVIdG1sVGVtcGxhdGVzKCk7XG4gICAgfVxuICAgIEJ1dHRvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBCdXR0b25EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmssXG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIGRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycztcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoYXR0cnMudWlmVHlwZSkgfHxcbiAgICAgICAgICAgIGF0dHJzLnVpZlR5cGUgPT09IGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5wcmltYXJ5XSB8fFxuICAgICAgICAgICAgYXR0cnMudWlmVHlwZSA9PT0gYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXSkge1xuICAgICAgICAgICAgdmFyIGljb25FbGVtZW50ID0gZWxlbWVudC5maW5kKCd1aWYtaWNvbicpO1xuICAgICAgICAgICAgaWYgKGljb25FbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbiAtICcgK1xuICAgICAgICAgICAgICAgICAgICAnSWNvbiBub3QgYWxsb3dlZCBpbiBwcmltYXJ5IG9yIGNvbXBvdW5kIGJ1dHRvbnM6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHByaW1hcnkgJiBjb21wb3VuZCBidXR0b24gZG9lcyBub3Qgc3VwcG9ydCBpbmNsdWRpbmcgaWNvbnMgaW4gdGhlIGJvZHkuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGljb24gaGFzIGJlZW4gcmVtb3ZlZCBidXQgbWF5IGNhdXNlIHJlbmRlcmluZyBlcnJvcnMuIENvbnNpZGVyIGJ1dHRvbnMgdGhhdCBzdXBwb3J0IGljb25zIHN1Y2ggYXMgY29tbWFuZCBvciBoZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlcjtcbiAgICAgICAgICAgIHN3aXRjaCAoYXR0cnMudWlmVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1pY29uJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF06XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lICE9PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS5jbGFzc0xpc3RbMF0gPT09ICduZy1zY29wZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZVtpXS5jbGFzc0xpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmhlcm9dOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1pY29uJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLl9wb3B1bGF0ZUh0bWxUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25CdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tcHJpbWFyeVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZExpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbW1hbmRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZEJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21wb3VuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tcG91bmRMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21wb3VuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0taGVyb1xcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWhlcm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuQnV0dG9uRGlyZWN0aXZlID0gQnV0dG9uRGlyZWN0aXZlO1xudmFyIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZCdXR0b24nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1CdXR0b24tZGVzY3JpcHRpb25cIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgIH1cbiAgICBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5CdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSA9IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b24nLCBCdXR0b25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJ1dHRvbkRlc2NyaXB0aW9uJywgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChCdXR0b25UeXBlRW51bSkge1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wicHJpbWFyeVwiXSA9IDBdID0gXCJwcmltYXJ5XCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJjb21tYW5kXCJdID0gMV0gPSBcImNvbW1hbmRcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImNvbXBvdW5kXCJdID0gMl0gPSBcImNvbXBvdW5kXCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJoZXJvXCJdID0gM10gPSBcImhlcm9cIjtcbn0pKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gfHwgKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gPSB7fSkpO1xudmFyIEJ1dHRvblR5cGVFbnVtID0gZXhwb3J0cy5CdXR0b25UeXBlRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKEJ1dHRvblRlbXBsYXRlVHlwZSkge1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJhY3Rpb25CdXR0b25cIl0gPSAwXSA9IFwiYWN0aW9uQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImFjdGlvbkxpbmtcIl0gPSAxXSA9IFwiYWN0aW9uTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJwcmltYXJ5QnV0dG9uXCJdID0gMl0gPSBcInByaW1hcnlCdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wicHJpbWFyeUxpbmtcIl0gPSAzXSA9IFwicHJpbWFyeUxpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiY29tbWFuZEJ1dHRvblwiXSA9IDRdID0gXCJjb21tYW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbW1hbmRMaW5rXCJdID0gNV0gPSBcImNvbW1hbmRMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kQnV0dG9uXCJdID0gNl0gPSBcImNvbXBvdW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kTGlua1wiXSA9IDddID0gXCJjb21wb3VuZExpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiaGVyb0J1dHRvblwiXSA9IDhdID0gXCJoZXJvQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImhlcm9MaW5rXCJdID0gOV0gPSBcImhlcm9MaW5rXCI7XG59KShleHBvcnRzLkJ1dHRvblRlbXBsYXRlVHlwZSB8fCAoZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGUgPSB7fSkpO1xudmFyIEJ1dHRvblRlbXBsYXRlVHlwZSA9IGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UZW1wbGF0ZVR5cGUudHNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2hvaWNlZmllbGRUeXBlRW51bV8xID0gcmVxdWlyZSgnLi9jaG9pY2VmaWVsZFR5cGVFbnVtJyk7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG59KSgpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZFwiPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBpZD1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtQ2hvaWNlRmllbGQtaW5wdXRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIiB2YWx1ZT1cInt7dmFsdWV9fVwiICcgK1xuICAgICAgICAgICAgJ25nLW1vZGVsPVwibmdNb2RlbFwiIG5nLXRydWUtdmFsdWU9XCJ7e25nVHJ1ZVZhbHVlfX1cIiBuZy1mYWxzZS12YWx1ZT1cInt7bmdGYWxzZVZhbHVlfX1cIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkLWZpZWxkXCI+PHNwYW4gY2xhc3M9XCJtcy1MYWJlbFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPjwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZDaG9pY2VmaWVsZE9wdGlvbicsICdeP3VpZkNob2ljZWZpZWxkR3JvdXAnXTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nRmFsc2VWYWx1ZTogJ0AnLFxuICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgbmdUcnVlVmFsdWU6ICdAJyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJyxcbiAgICAgICAgICAgIHZhbHVlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gdGVtcGxhdGVFbGVtZW50LmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgIGlmICghKCduZ01vZGVsJyBpbiB0ZW1wbGF0ZUF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCduZy1tb2RlbCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGN0cmxzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBjaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyID0gY3RybHNbMV07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZFR5cGVFbnVtXzEuQ2hvaWNlZmllbGRUeXBlW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNob2ljZWZpZWxkIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlR5cGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGVja2VkID0gKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmdldFZpZXdWYWx1ZSgpID09PSBhdHRycy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmFkZFJlbmRlcihyZW5kZXIpO1xuICAgICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3ZhbHVlJywgcmVuZGVyKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudFxuICAgICAgICAgICAgICAgIC5vbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucmVtb3ZlUmVuZGVyKHJlbmRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzO1xuICAgICAgICB2YXIgcGFyZW50U2NvcGUgPSBzY29wZS4kcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgIGRpc2FibGVkID0gZGlzYWJsZWQgfHwgKHBhcmVudFNjb3BlICE9IG51bGwgJiYgcGFyZW50U2NvcGUuZGlzYWJsZWQpO1xuICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlID0gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMgPSBbXTtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmFkZFJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5wdXNoKGZuKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVSZW5kZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMuc3BsaWNlKHRoaXMucmVuZGVyRm5zLmluZGV4T2YoZm4pKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGV2ZW50VHlwZSkge1xuICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRzZXRWaWV3VmFsdWUodmFsdWUsIGV2ZW50VHlwZSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlbmRlckZucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJGbnNbaV0oKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJ107XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xufSkoKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbnZhciBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZEdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXAtdGl0bGVcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgY2xhc3M9XCJtcy1MYWJlbCBpcy1yZXF1aXJlZFwiPlBpY2sgb25lPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGluc3RhbmNlQXR0cmlidXRlcywgY3RybHMpIHtcbiAgICAgICAgdmFyIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBtb2RlbENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUubmdNb2RlbCA9IG1vZGVsQ29udHJvbGxlcjtcbiAgICAgICAgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIuaW5pdCgpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gaW5zdGFuY2VBdHRyaWJ1dGVzO1xuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlID0gQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNob2ljZWZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZE9wdGlvbicsIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZEdyb3VwJywgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQ2hvaWNlZmllbGRUeXBlKSB7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcInJhZGlvXCJdID0gMF0gPSBcInJhZGlvXCI7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcImNoZWNrYm94XCJdID0gMV0gPSBcImNoZWNrYm94XCI7XG59KShleHBvcnRzLkNob2ljZWZpZWxkVHlwZSB8fCAoZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGUgPSB7fSkpO1xudmFyIENob2ljZWZpZWxkVHlwZSA9IGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIE1lbnVJdGVtVHlwZXM7XG4oZnVuY3Rpb24gKE1lbnVJdGVtVHlwZXMpIHtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJsaW5rXCJdID0gMF0gPSBcImxpbmtcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJkaXZpZGVyXCJdID0gMV0gPSBcImRpdmlkZXJcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJoZWFkZXJcIl0gPSAyXSA9IFwiaGVhZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wic3ViTWVudVwiXSA9IDNdID0gXCJzdWJNZW51XCI7XG59KShNZW51SXRlbVR5cGVzIHx8IChNZW51SXRlbVR5cGVzID0ge30pKTtcbmV4cG9ydHMuY29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudUl0ZW0nO1xuZXhwb3J0cy5jb250ZXh0dWFsTWVudURpcmVjdGl2ZU5hbWUgPSAndWlmQ29udGV4dHVhbE1lbnUnO1xudmFyIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZDb250ZXh0dWFsTWVudSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSAkYXR0cnMudWlmVHlwZTtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTWVudUl0ZW1UeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSB1bnN1cHBvcnRlZCBtZW51IHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIGNvbnRleHQgbWVudS4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgTWVudUl0ZW1UeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpc0Rpc2FibGVkOiAnPT91aWZJc0Rpc2FibGVkJyxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICc9P3VpZklzU2VsZWN0ZWQnLFxuICAgICAgICAgICAgb25DbGljazogJyZ1aWZDbGljaycsXG4gICAgICAgICAgICB0ZXh0OiAnPXVpZlRleHQnLFxuICAgICAgICAgICAgdHlwZTogJ0B1aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMuc3ViTWVudV0gPVxuICAgICAgICAgICAgXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtbGluayBtcy1Db250ZXh0dWFsTWVudS1saW5rLS1oYXNNZW51XFxcIlxcbiAgICAgICAgICAgICAgICBuZy1jbGFzcz1cXFwieydpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsICdpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIiBuZy1jbGljaz1cXFwic2VsZWN0SXRlbSgpXFxcIiBocmVmPnt7dGV4dH19PC9hPlxcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtc3ViTWVudUljb24gbXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHRcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29udGVudFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua10gPVxuICAgICAgICAgICAgXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtbGlua1xcXCIgbmctY2xhc3M9XFxcInsnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLCAnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCJcXG4gICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oKVxcXCIgaHJlZj57e3RleHR9fTwvYT5cXG4gICAgICAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5oZWFkZXJdID0gXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW0gbXMtQ29udGV4dHVhbE1lbnUtaXRlbS0taGVhZGVyXFxcIj57e3RleHR9fTwvbGk+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLmRpdmlkZXJdID0gXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW0gbXMtQ29udGV4dHVhbE1lbnUtaXRlbS0tZGl2aWRlclxcXCI+PC9saT5cIjtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGNvbnRleHR1YWxNZW51Q29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuaXNEaXNhYmxlZCAhPT0gJ2Jvb2xlYW4nICYmICRzY29wZS5pc0Rpc2FibGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtICcgK1xuICAgICAgICAgICAgICAgICdpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtZGlzYWJsZWRcXCcuXFxuJyArXG4gICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgJHNjb3BlLmlzRGlzYWJsZWQgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLWRpc2FibGVkXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgJzx1aWYtY29udGV4dHVhbC1tZW51LWl0ZW0gLz4uIFRoZSB2YWxpZCB0eXBlIGlzIGJvb2xlYW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gJ2Jvb2xlYW4nICYmICRzY29wZS5pc1NlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtICcgK1xuICAgICAgICAgICAgICAgICdpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtc2VsZWN0ZWRcXCcuXFxuJyArXG4gICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLXNlbGVjdGVkXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgJzx1aWYtY29udGV4dHVhbC1tZW51LWl0ZW0gLz4uIFRoZSB2YWxpZCB0eXBlIGlzIGJvb2xlYW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAkZWxlbWVudC5maW5kKCdkaXYnKS5yZXBsYWNlV2l0aChjbG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzTXVsdGlTZWxlY3Rpb25NZW51KCkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIub25EZXNlbGVjdEl0ZW1zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoJHNjb3BlLmlzU2VsZWN0ZWQpICYmICEkc2NvcGUuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5pc1Jvb3RNZW51KCkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIub25DbG9zZU1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuaGFzQ2hpbGRNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5vbkNsb3NlTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5vbkRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIub25DbG9zZU1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNoaWxkTWVudUN0cmwub3Blbk1lbnUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmcuaXNVbmRlZmluZWQoJHNjb3BlLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtZGVzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtY2xvc2UnLCBmdW5jdGlvbiAoZXZlbnQsIG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS4kaWQgIT09IG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5jbG9zZU1lbnUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlID0gQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlO1xudmFyIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5zZXRDaGlsZE1lbnUgPSBmdW5jdGlvbiAoY2hpbGRNZW51Q3RybCkge1xuICAgICAgICB0aGlzLiRzY29wZS5oYXNDaGlsZE1lbnUgPSB0cnVlO1xuICAgICAgICB0aGlzLiRzY29wZS5jaGlsZE1lbnVDdHJsID0gY2hpbGRNZW51Q3RybDtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50J107XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG59KSgpO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcjtcbnZhciBDb250ZXh0dWFsTWVudURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IGV4cG9ydHMuY29udGV4dHVhbE1lbnVEaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8dWwgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51XFxcIiBuZy10cmFuc2NsdWRlPjwvdWw+XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzT3BlbjogJz0/dWlmSXNPcGVuJyxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiAnQHVpZk11bHRpc2VsZWN0J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGNvbnRleHR1YWxNZW51Q29udHJvbGxlcikge1xuICAgICAgICB2YXIgcGFyZW50TWVudUl0ZW1DdHJsID0gJGVsZW1lbnQuY29udHJvbGxlcihleHBvcnRzLmNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZU5hbWUpO1xuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKHBhcmVudE1lbnVJdGVtQ3RybCkpIHtcbiAgICAgICAgICAgIHBhcmVudE1lbnVJdGVtQ3RybC5zZXRDaGlsZE1lbnUoY29udGV4dHVhbE1lbnVDb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRzY29wZS5tdWx0aXNlbGVjdCkgJiYgJHNjb3BlLm11bHRpc2VsZWN0LnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ21zLUNvbnRleHR1YWxNZW51LS1tdWx0aXNlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xudmFyIENvbnRleHR1YWxNZW51Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5pc09wZW5DbGFzc05hbWUgPSAnaXMtb3Blbic7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCgkZWxlbWVudC5jb250cm9sbGVyKGV4cG9ydHMuY29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlTmFtZSkpKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXNSb290TWVudSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNPcGVuJywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAnYm9vbGVhbicgJiYgbmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51IC0gaW52YWxpZCBhdHRyaWJ1dGUgdHlwZTogXFwndWlmLWlzLW9wZW5cXCcuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSBcXCcnICsgdHlwZW9mIG5ld1ZhbHVlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGFzIHZhbGlkIHR5cGUgZm9yIFxcJ3VpZi1pcy1vcGVuXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLWNvbnRleHR1YWwtbWVudSAvPi4gVGhlIHZhbGlkIHR5cGUgaXMgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRhbmltYXRlW25ld1ZhbHVlID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKCRlbGVtZW50LCBfdGhpcy5pc09wZW5DbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5vbkRlc2VsZWN0SXRlbXMgPSBmdW5jdGlvbiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICBpZiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3VpZi1tZW51LWRlc2VsZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUub25DbG9zZU1lbnVzID0gZnVuY3Rpb24gKG1lbnVJdGVtVG9Ta2lwLCBjbG9zZVJvb3RNZW51KSB7XG4gICAgICAgIGlmIChjbG9zZVJvb3RNZW51KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgndWlmLW1lbnUtY2xvc2UnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QoJ3VpZi1tZW51LWNsb3NlJywgbWVudUl0ZW1Ub1NraXApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSB0cnVlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc1Jvb3RNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXNSb290TWVudTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNNdWx0aVNlbGVjdGlvbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckYW5pbWF0ZScsICckZWxlbWVudCcsICckbG9nJ107XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbn0pKCk7XG5leHBvcnRzLkNvbnRleHR1YWxNZW51Q29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZShleHBvcnRzLmNvbnRleHR1YWxNZW51RGlyZWN0aXZlTmFtZSwgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoZXhwb3J0cy5jb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50c1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxsaSBjbGFzcz1cIm1zLURyb3Bkb3duLWl0ZW1cIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZEcm9wZG93bic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGRyb3Bkb3duQ29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAoIWRyb3Bkb3duQ29udHJvbGxlcikge1xuICAgICAgICAgICAgdGhyb3cgJ0Ryb3Bkb3duIGNvbnRyb2xsZXIgbm90IGZvdW5kISc7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQ29udHJvbGxlci5zZXRWaWV3VmFsdWUoaW5zdGFuY2VFbGVtZW50LmZpbmQoJ3NwYW4nKS5odG1sKCksIGF0dHJzLnZhbHVlLCBldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd25PcHRpb25EaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5Ecm9wZG93bk9wdGlvbkRpcmVjdGl2ZSA9IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlO1xudmFyIERyb3Bkb3duQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25Db250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB9XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuJHNjb3BlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuaXNPcGVuID0gIXNlbGYuJHNjb3BlLmlzT3BlbjtcbiAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB2YXIgZHJvcGRvd25XaWR0aCA9IGFuZ3VsYXIuZWxlbWVudCh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Ecm9wZG93bicpKVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQodGhpcy5xdWVyeVNlbGVjdG9yKCcubXMtRHJvcGRvd24taXRlbXMnKSlbMF0uc3R5bGUud2lkdGggPSBkcm9wZG93bldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBzZWxmLiRlbGVtZW50LmZpbmQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBvcHRpb24uZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHNlbGYuJHNjb3BlLm5nTW9kZWwuJHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9IGFuZ3VsYXIuZWxlbWVudChvcHRpb24pLmZpbmQoJ3NwYW4nKS5odG1sKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKHRpdGxlLCB2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkVGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHZhbHVlLCBldmVudFR5cGUpO1xuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJ107XG4gICAgcmV0dXJuIERyb3Bkb3duQ29udHJvbGxlcjtcbn0pKCk7XG5leHBvcnRzLkRyb3Bkb3duQ29udHJvbGxlciA9IERyb3Bkb3duQ29udHJvbGxlcjtcbnZhciBEcm9wZG93bkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGljaz1cImRyb3Bkb3duQ2xpY2tcIiAnICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cIntcXCdtcy1Ecm9wZG93blxcJyA6IHRydWUsIFxcJ2lzLW9wZW5cXCc6IGlzT3BlbiwgXFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfVwiIHRhYmluZGV4PVwiMFwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtRHJvcGRvd24tY2FyZXREb3duIG1zLUljb24gbXMtSWNvbi0tY2FyZXREb3duXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRHJvcGRvd24tdGl0bGVcIj57e3NlbGVjdGVkVGl0bGV9fTwvc3Bhbj48dWwgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtc1wiPjxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L3VsPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmRHJvcGRvd24nLCAnP25nTW9kZWwnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEcm9wZG93bkNvbnRyb2xsZXI7XG4gICAgfVxuICAgIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRHJvcGRvd25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERyb3Bkb3duRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgZHJvcGRvd25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBtb2RlbENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUubmdNb2RlbCA9IG1vZGVsQ29udHJvbGxlcjtcbiAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLmluaXQoKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bkRpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLkRyb3Bkb3duRGlyZWN0aXZlID0gRHJvcGRvd25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kcm9wZG93bicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmRHJvcGRvd25PcHRpb24nLCBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRHJvcGRvd24nLCBEcm9wZG93bkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBpY29uRW51bV8xID0gcmVxdWlyZSgnLi9pY29uRW51bScpO1xudmFyIEljb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJY29uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIEljb25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gSWNvbkNvbnRyb2xsZXI7XG59KSgpO1xudmFyIEljb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXt7dWlmVHlwZX19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gSWNvbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ2ljb24nO1xuICAgIH1cbiAgICBJY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSWNvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgSWNvbkRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWxlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGljb25FbnVtXzEuSWNvbkVudW1bbmV3VmFsdWxlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5pY29uIC0gVW5zdXBwb3J0ZWQgaWNvbjogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgaWNvbiAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBJY29uRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuSWNvbkRpcmVjdGl2ZSA9IEljb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5pY29uJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZJY29uJywgSWNvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKEljb25FbnVtKSB7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydFwiXSA9IDBdID0gXCJhbGVydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnQyXCJdID0gMV0gPSBcImFsZXJ0MlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnRPdXRsaW5lXCJdID0gMl0gPSBcImFsZXJ0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duXCJdID0gM10gPSBcImFycm93RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duMlwiXSA9IDRdID0gXCJhcnJvd0Rvd24yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25MZWZ0XCJdID0gNV0gPSBcImFycm93RG93bkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93blJpZ2h0XCJdID0gNl0gPSBcImFycm93RG93blJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0xlZnRcIl0gPSA3XSA9IFwiYXJyb3dMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1JpZ2h0XCJdID0gOF0gPSBcImFycm93UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBcIl0gPSA5XSA9IFwiYXJyb3dVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcDJcIl0gPSAxMF0gPSBcImFycm93VXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwTGVmdFwiXSA9IDExXSA9IFwiYXJyb3dVcExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBSaWdodFwiXSA9IDEyXSA9IFwiYXJyb3dVcFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhc2NlbmRpbmdcIl0gPSAxM10gPSBcImFzY2VuZGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXRcIl0gPSAxNF0gPSBcImF0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhdHRhY2htZW50XCJdID0gMTVdID0gXCJhdHRhY2htZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiYWdcIl0gPSAxNl0gPSBcImJhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmFsbG9vblwiXSA9IDE3XSA9IFwiYmFsbG9vblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmVsbFwiXSA9IDE4XSA9IFwiYmVsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9hcmRzXCJdID0gMTldID0gXCJib2FyZHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvbGRcIl0gPSAyMF0gPSBcImJvbGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvb2ttYXJrXCJdID0gMjFdID0gXCJib29rbWFya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9va3NcIl0gPSAyMl0gPSBcImJvb2tzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJicmllZmNhc2VcIl0gPSAyM10gPSBcImJyaWVmY2FzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYnVuZGxlXCJdID0gMjRdID0gXCJidW5kbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNha2VcIl0gPSAyNV0gPSBcImNha2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyXCJdID0gMjZdID0gXCJjYWxlbmRhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJEYXlcIl0gPSAyN10gPSBcImNhbGVuZGFyRGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhclB1YmxpY1wiXSA9IDI4XSA9IFwiY2FsZW5kYXJQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyV2Vla1wiXSA9IDI5XSA9IFwiY2FsZW5kYXJXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhcldvcmtXZWVrXCJdID0gMzBdID0gXCJjYWxlbmRhcldvcmtXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYW1lcmFcIl0gPSAzMV0gPSBcImNhbWVyYVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyXCJdID0gMzJdID0gXCJjYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93blwiXSA9IDMzXSA9IFwiY2FyZXREb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25MZWZ0XCJdID0gMzRdID0gXCJjYXJldERvd25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25PdXRsaW5lXCJdID0gMzVdID0gXCJjYXJldERvd25PdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25SaWdodFwiXSA9IDM2XSA9IFwiY2FyZXREb3duUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0TGVmdFwiXSA9IDM3XSA9IFwiY2FyZXRMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldExlZnRPdXRsaW5lXCJdID0gMzhdID0gXCJjYXJldExlZnRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0XCJdID0gMzldID0gXCJjYXJldFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0T3V0bGluZVwiXSA9IDQwXSA9IFwiY2FyZXRSaWdodE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBcIl0gPSA0MV0gPSBcImNhcmV0VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBMZWZ0XCJdID0gNDJdID0gXCJjYXJldFVwTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcE91dGxpbmVcIl0gPSA0M10gPSBcImNhcmV0VXBPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwUmlnaHRcIl0gPSA0NF0gPSBcImNhcmV0VXBSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FydFwiXSA9IDQ1XSA9IFwiY2FydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2F0XCJdID0gNDZdID0gXCJjYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXJ0XCJdID0gNDddID0gXCJjaGFydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdFwiXSA9IDQ4XSA9IFwiY2hhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdEFkZFwiXSA9IDQ5XSA9IFwiY2hhdEFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tcIl0gPSA1MF0gPSBcImNoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveFwiXSA9IDUxXSA9IFwiY2hlY2tib3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94Q2hlY2tcIl0gPSA1Ml0gPSBcImNoZWNrYm94Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94RW1wdHlcIl0gPSA1M10gPSBcImNoZWNrYm94RW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94TWl4ZWRcIl0gPSA1NF0gPSBcImNoZWNrYm94TWl4ZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrUGVvcGxlXCJdID0gNTVdID0gXCJjaGVja1Blb3BsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbkRvd25cIl0gPSA1Nl0gPSBcImNoZXZyb25Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uTGVmdFwiXSA9IDU3XSA9IFwiY2hldnJvbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25SaWdodFwiXSA9IDU4XSA9IFwiY2hldnJvblJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc0Rvd25cIl0gPSA1OV0gPSBcImNoZXZyb25zRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNMZWZ0XCJdID0gNjBdID0gXCJjaGV2cm9uc0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zUmlnaHRcIl0gPSA2MV0gPSBcImNoZXZyb25zUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zVXBcIl0gPSA2Ml0gPSBcImNoZXZyb25zVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0Rvd25cIl0gPSA2M10gPSBcImNoZXZyb25UaGlja0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0xlZnRcIl0gPSA2NF0gPSBcImNoZXZyb25UaGlja0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja1JpZ2h0XCJdID0gNjVdID0gXCJjaGV2cm9uVGhpY2tSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrVXBcIl0gPSA2Nl0gPSBcImNoZXZyb25UaGlja1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpbkRvd25cIl0gPSA2N10gPSBcImNoZXZyb25UaGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5MZWZ0XCJdID0gNjhdID0gXCJjaGV2cm9uVGhpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluUmlnaHRcIl0gPSA2OV0gPSBcImNoZXZyb25UaGluUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluVXBcIl0gPSA3MF0gPSBcImNoZXZyb25UaGluVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25VcFwiXSA9IDcxXSA9IFwiY2hldnJvblVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVcIl0gPSA3Ml0gPSBcImNpcmNsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQmFsbFwiXSA9IDczXSA9IFwiY2lyY2xlQmFsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQmFsbG9vbnNcIl0gPSA3NF0gPSBcImNpcmNsZUJhbGxvb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDYXJcIl0gPSA3NV0gPSBcImNpcmNsZUNhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ2F0XCJdID0gNzZdID0gXCJjaXJjbGVDYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNvZmZlZVwiXSA9IDc3XSA9IFwiY2lyY2xlQ29mZmVlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVEb2dcIl0gPSA3OF0gPSBcImNpcmNsZURvZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRW1wdHlcIl0gPSA3OV0gPSBcImNpcmNsZUVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVGaWxsXCJdID0gODBdID0gXCJjaXJjbGVGaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVGaWxsZWRcIl0gPSA4MV0gPSBcImNpcmNsZUZpbGxlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlSGFsZkZpbGxlZFwiXSA9IDgyXSA9IFwiY2lyY2xlSGFsZkZpbGxlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlSW5mb1wiXSA9IDgzXSA9IFwiY2lyY2xlSW5mb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlTGlnaHRuaW5nXCJdID0gODRdID0gXCJjaXJjbGVMaWdodG5pbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBpbGxcIl0gPSA4NV0gPSBcImNpcmNsZVBpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBsYW5lXCJdID0gODZdID0gXCJjaXJjbGVQbGFuZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGx1c1wiXSA9IDg3XSA9IFwiY2lyY2xlUGx1c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUG9vZGxlXCJdID0gODhdID0gXCJjaXJjbGVQb29kbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVVuZmlsbGVkXCJdID0gODldID0gXCJjaXJjbGVVbmZpbGxlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xhc3NOb3RlYm9va1wiXSA9IDkwXSA9IFwiY2xhc3NOb3RlYm9va1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xhc3Nyb29tXCJdID0gOTFdID0gXCJjbGFzc3Jvb21cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsb2NrXCJdID0gOTJdID0gXCJjbG9ja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2x1dHRlclwiXSA9IDkzXSA9IFwiY2x1dHRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29mZmVlXCJdID0gOTRdID0gXCJjb2ZmZWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbGxhcHNlXCJdID0gOTVdID0gXCJjb2xsYXBzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29uZmxpY3RcIl0gPSA5Nl0gPSBcImNvbmZsaWN0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb250YWN0XCJdID0gOTddID0gXCJjb250YWN0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb250YWN0Rm9ybVwiXSA9IDk4XSA9IFwiY29udGFjdEZvcm1cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RQdWJsaWNcIl0gPSA5OV0gPSBcImNvbnRhY3RQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvcHlcIl0gPSAxMDBdID0gXCJjb3B5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjcmVkaXRDYXJkXCJdID0gMTAxXSA9IFwiY3JlZGl0Q2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY3JlZGl0Q2FyZE91dGxpbmVcIl0gPSAxMDJdID0gXCJjcmVkaXRDYXJkT3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGFzaGJvYXJkXCJdID0gMTAzXSA9IFwiZGFzaGJvYXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXNjZW5kaW5nXCJdID0gMTA0XSA9IFwiZGVzY2VuZGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGVza3RvcFwiXSA9IDEwNV0gPSBcImRlc2t0b3BcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRldmljZVdpcGVcIl0gPSAxMDZdID0gXCJkZXZpY2VXaXBlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkaWFscGFkXCJdID0gMTA3XSA9IFwiZGlhbHBhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGlyZWN0aW9uc1wiXSA9IDEwOF0gPSBcImRpcmVjdGlvbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50XCJdID0gMTA5XSA9IFwiZG9jdW1lbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50QWRkXCJdID0gMTEwXSA9IFwiZG9jdW1lbnRBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50Rm9yd2FyZFwiXSA9IDExMV0gPSBcImRvY3VtZW50Rm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRMYW5kc2NhcGVcIl0gPSAxMTJdID0gXCJkb2N1bWVudExhbmRzY2FwZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRQREZcIl0gPSAxMTNdID0gXCJkb2N1bWVudFBERlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRSZXBseVwiXSA9IDExNF0gPSBcImRvY3VtZW50UmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50c1wiXSA9IDExNV0gPSBcImRvY3VtZW50c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRTZWFyY2hcIl0gPSAxMTZdID0gXCJkb2N1bWVudFNlYXJjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9nXCJdID0gMTE3XSA9IFwiZG9nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2dBbHRcIl0gPSAxMThdID0gXCJkb2dBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvdFwiXSA9IDExOV0gPSBcImRvdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG93bmxvYWRcIl0gPSAxMjBdID0gXCJkb3dubG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJtXCJdID0gMTIxXSA9IFwiZHJtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkcm9wXCJdID0gMTIyXSA9IFwiZHJvcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJvcGRvd25cIl0gPSAxMjNdID0gXCJkcm9wZG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZWRpdEJveFwiXSA9IDEyNF0gPSBcImVkaXRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVsbGlwc2lzXCJdID0gMTI1XSA9IFwiZWxsaXBzaXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVtYmVkXCJdID0gMTI2XSA9IFwiZW1iZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50XCJdID0gMTI3XSA9IFwiZXZlbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50Q2FuY2VsXCJdID0gMTI4XSA9IFwiZXZlbnRDYW5jZWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50SW5mb1wiXSA9IDEyOV0gPSBcImV2ZW50SW5mb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRSZWN1cnJpbmdcIl0gPSAxMzBdID0gXCJldmVudFJlY3VycmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRTaGFyZVwiXSA9IDEzMV0gPSBcImV2ZW50U2hhcmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV4Y2xhbWF0aW9uXCJdID0gMTMyXSA9IFwiZXhjbGFtYXRpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV4cGFuZFwiXSA9IDEzM10gPSBcImV4cGFuZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXllXCJdID0gMTM0XSA9IFwiZXllXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmYXZvcml0ZXNcIl0gPSAxMzVdID0gXCJmYXZvcml0ZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZheFwiXSA9IDEzNl0gPSBcImZheFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRNYWlsXCJdID0gMTM3XSA9IFwiZmllbGRNYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZE51bWJlclwiXSA9IDEzOF0gPSBcImZpZWxkTnVtYmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZFRleHRcIl0gPSAxMzldID0gXCJmaWVsZFRleHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkVGV4dEJveFwiXSA9IDE0MF0gPSBcImZpZWxkVGV4dEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZURvY3VtZW50XCJdID0gMTQxXSA9IFwiZmlsZURvY3VtZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlSW1hZ2VcIl0gPSAxNDJdID0gXCJmaWxlSW1hZ2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVQREZcIl0gPSAxNDNdID0gXCJmaWxlUERGXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWx0ZXJcIl0gPSAxNDRdID0gXCJmaWx0ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbHRlckNsZWFyXCJdID0gMTQ1XSA9IFwiZmlsdGVyQ2xlYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpcnN0QWlkXCJdID0gMTQ2XSA9IFwiZmlyc3RBaWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZsYWdcIl0gPSAxNDddID0gXCJmbGFnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJcIl0gPSAxNDhdID0gXCJmb2xkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlck1vdmVcIl0gPSAxNDldID0gXCJmb2xkZXJNb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJQdWJsaWNcIl0gPSAxNTBdID0gXCJmb2xkZXJQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlclNlYXJjaFwiXSA9IDE1MV0gPSBcImZvbGRlclNlYXJjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udENvbG9yXCJdID0gMTUyXSA9IFwiZm9udENvbG9yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250RGVjcmVhc2VcIl0gPSAxNTNdID0gXCJmb250RGVjcmVhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnRJbmNyZWFzZVwiXSA9IDE1NF0gPSBcImZvbnRJbmNyZWFzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZnJvd255XCJdID0gMTU1XSA9IFwiZnJvd255XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmdWxsc2NyZWVuXCJdID0gMTU2XSA9IFwiZnVsbHNjcmVlblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2VhclwiXSA9IDE1N10gPSBcImdlYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdsYXNzZXNcIl0gPSAxNThdID0gXCJnbGFzc2VzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnbG9iZVwiXSA9IDE1OV0gPSBcImdsb2JlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJncmFwaFwiXSA9IDE2MF0gPSBcImdyYXBoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJncm91cFwiXSA9IDE2MV0gPSBcImdyb3VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFkZXJcIl0gPSAxNjJdID0gXCJoZWFkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhlYXJ0XCJdID0gMTYzXSA9IFwiaGVhcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhlYXJ0RW1wdHlcIl0gPSAxNjRdID0gXCJoZWFydEVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoaWRlXCJdID0gMTY1XSA9IFwiaGlkZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaG9tZVwiXSA9IDE2Nl0gPSBcImhvbWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluYm94Q2hlY2tcIl0gPSAxNjddID0gXCJpbmJveENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmZvXCJdID0gMTY4XSA9IFwiaW5mb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5mb0NpcmNsZVwiXSA9IDE2OV0gPSBcImluZm9DaXJjbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIml0YWxpY1wiXSA9IDE3MF0gPSBcIml0YWxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wia2V5XCJdID0gMTcxXSA9IFwia2V5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsYXRlXCJdID0gMTcyXSA9IFwibGF0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlmZXNhdmVyXCJdID0gMTczXSA9IFwibGlmZXNhdmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWZlc2F2ZXJMb2NrXCJdID0gMTc0XSA9IFwibGlmZXNhdmVyTG9ja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlnaHRCdWxiXCJdID0gMTc1XSA9IFwibGlnaHRCdWxiXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWdodG5pbmdcIl0gPSAxNzZdID0gXCJsaWdodG5pbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpbmtcIl0gPSAxNzddID0gXCJsaW5rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaW5rUmVtb3ZlXCJdID0gMTc4XSA9IFwibGlua1JlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdEJ1bGxldHNcIl0gPSAxNzldID0gXCJsaXN0QnVsbGV0c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdENoZWNrXCJdID0gMTgwXSA9IFwibGlzdENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0Q2hlY2tib3hcIl0gPSAxODFdID0gXCJsaXN0Q2hlY2tib3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RHcm91cFwiXSA9IDE4Ml0gPSBcImxpc3RHcm91cFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdEdyb3VwMlwiXSA9IDE4M10gPSBcImxpc3RHcm91cDJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3ROdW1iZXJlZFwiXSA9IDE4NF0gPSBcImxpc3ROdW1iZXJlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibG9ja1wiXSA9IDE4NV0gPSBcImxvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxcIl0gPSAxODZdID0gXCJtYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsQ2hlY2tcIl0gPSAxODddID0gXCJtYWlsQ2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxEb3duXCJdID0gMTg4XSA9IFwibWFpbERvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFZGl0XCJdID0gMTg5XSA9IFwibWFpbEVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFbXB0eVwiXSA9IDE5MF0gPSBcIm1haWxFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbEVycm9yXCJdID0gMTkxXSA9IFwibWFpbEVycm9yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsT3BlblwiXSA9IDE5Ml0gPSBcIm1haWxPcGVuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUGF1c2VcIl0gPSAxOTNdID0gXCJtYWlsUGF1c2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxQdWJsaWNcIl0gPSAxOTRdID0gXCJtYWlsUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUmVhZFwiXSA9IDE5NV0gPSBcIm1haWxSZWFkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsU2VuZFwiXSA9IDE5Nl0gPSBcIm1haWxTZW5kXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsU3luY1wiXSA9IDE5N10gPSBcIm1haWxTeW5jXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsVW5yZWFkXCJdID0gMTk4XSA9IFwibWFpbFVucmVhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFwTWFya2VyXCJdID0gMTk5XSA9IFwibWFwTWFya2VyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZWFsXCJdID0gMjAwXSA9IFwibWVhbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVudVwiXSA9IDIwMV0gPSBcIm1lbnVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lbnUyXCJdID0gMjAyXSA9IFwibWVudTJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lcmdlXCJdID0gMjAzXSA9IFwibWVyZ2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1ldGFkYXRhXCJdID0gMjA0XSA9IFwibWV0YWRhdGFcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pY3JvcGhvbmVcIl0gPSAyMDVdID0gXCJtaWNyb3Bob25lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaW5pYXR1cmVzXCJdID0gMjA2XSA9IFwibWluaWF0dXJlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWludXNcIl0gPSAyMDddID0gXCJtaW51c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW9iaWxlXCJdID0gMjA4XSA9IFwibW9iaWxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtb25leVwiXSA9IDIwOV0gPSBcIm1vbmV5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtb3ZlXCJdID0gMjEwXSA9IFwibW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibXVsdGlDaG9pY2VcIl0gPSAyMTFdID0gXCJtdWx0aUNob2ljZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibXVzaWNcIl0gPSAyMTJdID0gXCJtdXNpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmF2aWdhdGVcIl0gPSAyMTNdID0gXCJuYXZpZ2F0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmV3XCJdID0gMjE0XSA9IFwibmV3XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJuZXdzZmVlZFwiXSA9IDIxNV0gPSBcIm5ld3NmZWVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlXCJdID0gMjE2XSA9IFwibm90ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZWJvb2tcIl0gPSAyMTddID0gXCJub3RlYm9va1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZUVkaXRcIl0gPSAyMThdID0gXCJub3RlRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZUZvcndhcmRcIl0gPSAyMTldID0gXCJub3RlRm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZVJlcGx5XCJdID0gMjIwXSA9IFwibm90ZVJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RSZWN1cnJpbmdcIl0gPSAyMjFdID0gXCJub3RSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9ubGluZUFkZFwiXSA9IDIyMl0gPSBcIm9ubGluZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib25saW5lSm9pblwiXSA9IDIyM10gPSBcIm9ubGluZUpvaW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9vZlJlcGx5XCJdID0gMjI0XSA9IFwib29mUmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9yZ1wiXSA9IDIyNV0gPSBcIm9yZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFnZVwiXSA9IDIyNl0gPSBcInBhZ2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhaW50XCJdID0gMjI3XSA9IFwicGFpbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhbmVsXCJdID0gMjI4XSA9IFwicGFuZWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhcnRuZXJcIl0gPSAyMjldID0gXCJwYXJ0bmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYXVzZVwiXSA9IDIzMF0gPSBcInBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW5jaWxcIl0gPSAyMzFdID0gXCJwZW5jaWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVwiXSA9IDIzMl0gPSBcInBlb3BsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlQWRkXCJdID0gMjMzXSA9IFwicGVvcGxlQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVDaGVja1wiXSA9IDIzNF0gPSBcInBlb3BsZUNoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVFcnJvclwiXSA9IDIzNV0gPSBcInBlb3BsZUVycm9yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVQYXVzZVwiXSA9IDIzNl0gPSBcInBlb3BsZVBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVSZW1vdmVcIl0gPSAyMzddID0gXCJwZW9wbGVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVNlY3VyaXR5XCJdID0gMjM4XSA9IFwicGVvcGxlU2VjdXJpdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVN5bmNcIl0gPSAyMzldID0gXCJwZW9wbGVTeW5jXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25cIl0gPSAyNDBdID0gXCJwZXJzb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvbkFkZFwiXSA9IDI0MV0gPSBcInBlcnNvbkFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uUmVtb3ZlXCJdID0gMjQyXSA9IFwicGVyc29uUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaG9uZVwiXSA9IDI0M10gPSBcInBob25lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaG9uZUFkZFwiXSA9IDI0NF0gPSBcInBob25lQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaG9uZVRyYW5zZmVyXCJdID0gMjQ1XSA9IFwicGhvbmVUcmFuc2ZlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZVwiXSA9IDI0Nl0gPSBcInBpY3R1cmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVBZGRcIl0gPSAyNDddID0gXCJwaWN0dXJlQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlRWRpdFwiXSA9IDI0OF0gPSBcInBpY3R1cmVFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlUmVtb3ZlXCJdID0gMjQ5XSA9IFwicGljdHVyZVJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGlsbFwiXSA9IDI1MF0gPSBcInBpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbkRvd25cIl0gPSAyNTFdID0gXCJwaW5Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaW5MZWZ0XCJdID0gMjUyXSA9IFwicGluTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGxhY2Vob2xkZXJcIl0gPSAyNTNdID0gXCJwbGFjZWhvbGRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGxhbmVcIl0gPSAyNTRdID0gXCJwbGFuZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGxheVwiXSA9IDI1NV0gPSBcInBsYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsdXNcIl0gPSAyNTZdID0gXCJwbHVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbHVzMlwiXSA9IDI1N10gPSBcInBsdXMyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb2ludEl0ZW1cIl0gPSAyNThdID0gXCJwb2ludEl0ZW1cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvcG91dFwiXSA9IDI1OV0gPSBcInBvcG91dFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9zdFwiXSA9IDI2MF0gPSBcInBvc3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInByaW50XCJdID0gMjYxXSA9IFwicHJpbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInByb3RlY3Rpb25DZW50ZXJcIl0gPSAyNjJdID0gXCJwcm90ZWN0aW9uQ2VudGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdWVzdGlvblwiXSA9IDI2M10gPSBcInF1ZXN0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdWVzdGlvblJldmVyc2VcIl0gPSAyNjRdID0gXCJxdWVzdGlvblJldmVyc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInF1b3RlXCJdID0gMjY1XSA9IFwicXVvdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJhZGlvQnV0dG9uXCJdID0gMjY2XSA9IFwicmFkaW9CdXR0b25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlYWN0aXZhdGVcIl0gPSAyNjddID0gXCJyZWFjdGl2YXRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0Q2hlY2tcIl0gPSAyNjhdID0gXCJyZWNlaXB0Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlY2VpcHRGb3J3YXJkXCJdID0gMjY5XSA9IFwicmVjZWlwdEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlY2VpcHRSZXBseVwiXSA9IDI3MF0gPSBcInJlY2VpcHRSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVmcmVzaFwiXSA9IDI3MV0gPSBcInJlZnJlc2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlbG9hZFwiXSA9IDI3Ml0gPSBcInJlbG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlcIl0gPSAyNzNdID0gXCJyZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlBbGxcIl0gPSAyNzRdID0gXCJyZXBseUFsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlBbGxBbHRcIl0gPSAyNzVdID0gXCJyZXBseUFsbEFsdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlBbHRcIl0gPSAyNzZdID0gXCJyZXBseUFsdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmliYm9uXCJdID0gMjc3XSA9IFwicmliYm9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyb29tXCJdID0gMjc4XSA9IFwicm9vbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2F2ZVwiXSA9IDI3OV0gPSBcInNhdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNjaGVkdWxpbmdcIl0gPSAyODBdID0gXCJzY2hlZHVsaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWFyY2hcIl0gPSAyODFdID0gXCJzZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNlY3Rpb25cIl0gPSAyODJdID0gXCJzZWN0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWN0aW9uc1wiXSA9IDI4M10gPSBcInNlY3Rpb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZXR0aW5nc1wiXSA9IDI4NF0gPSBcInNldHRpbmdzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaGFyZVwiXSA9IDI4NV0gPSBcInNoYXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaGllbGRcIl0gPSAyODZdID0gXCJzaGllbGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNpdGVzXCJdID0gMjg3XSA9IFwic2l0ZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNtaWxleVwiXSA9IDI4OF0gPSBcInNtaWxleVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29jY2VyXCJdID0gMjg5XSA9IFwic29jY2VyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb2NpYWxMaXN0ZW5pbmdcIl0gPSAyOTBdID0gXCJzb2NpYWxMaXN0ZW5pbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvcnRcIl0gPSAyOTFdID0gXCJzb3J0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb3J0TGluZXNcIl0gPSAyOTJdID0gXCJzb3J0TGluZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNwbGl0XCJdID0gMjkzXSA9IFwic3BsaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0YXJcIl0gPSAyOTRdID0gXCJzdGFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdGFyRW1wdHlcIl0gPSAyOTVdID0gXCJzdGFyRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0b3B3YXRjaFwiXSA9IDI5Nl0gPSBcInN0b3B3YXRjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RvcnlcIl0gPSAyOTddID0gXCJzdG9yeVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3R5bGVSZW1vdmVcIl0gPSAyOThdID0gXCJzdHlsZVJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3Vic2NyaWJlXCJdID0gMjk5XSA9IFwic3Vic2NyaWJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5cIl0gPSAzMDBdID0gXCJzdW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1bkFkZFwiXSA9IDMwMV0gPSBcInN1bkFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuUXVlc3Rpb25cIl0gPSAzMDJdID0gXCJzdW5RdWVzdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VwcG9ydFwiXSA9IDMwM10gPSBcInN1cHBvcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhYmxlXCJdID0gMzA0XSA9IFwidGFibGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhYmxldFwiXSA9IDMwNV0gPSBcInRhYmxldFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFnXCJdID0gMzA2XSA9IFwidGFnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YXNrUmVjdXJyaW5nXCJdID0gMzA3XSA9IFwidGFza1JlY3VycmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFza3NcIl0gPSAzMDhdID0gXCJ0YXNrc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGVhbXdvcmtcIl0gPSAzMDldID0gXCJ0ZWFtd29ya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGV4dFwiXSA9IDMxMF0gPSBcInRleHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRleHRCb3hcIl0gPSAzMTFdID0gXCJ0ZXh0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0aWxlXCJdID0gMzEyXSA9IFwidGlsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGltZWxpbmVcIl0gPSAzMTNdID0gXCJ0aW1lbGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9kYXlcIl0gPSAzMTRdID0gXCJ0b2RheVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9nZ2xlXCJdID0gMzE1XSA9IFwidG9nZ2xlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b2dnbGVNaWRkbGVcIl0gPSAzMTZdID0gXCJ0b2dnbGVNaWRkbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvdWNoXCJdID0gMzE3XSA9IFwidG91Y2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyYXNoXCJdID0gMzE4XSA9IFwidHJhc2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRG93blwiXSA9IDMxOV0gPSBcInRyaWFuZ2xlRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eURvd25cIl0gPSAzMjBdID0gXCJ0cmlhbmdsZUVtcHR5RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eUxlZnRcIl0gPSAzMjFdID0gXCJ0cmlhbmdsZUVtcHR5TGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eVJpZ2h0XCJdID0gMzIyXSA9IFwidHJpYW5nbGVFbXB0eVJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5VXBcIl0gPSAzMjNdID0gXCJ0cmlhbmdsZUVtcHR5VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlTGVmdFwiXSA9IDMyNF0gPSBcInRyaWFuZ2xlTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVSaWdodFwiXSA9IDMyNV0gPSBcInRyaWFuZ2xlUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlVXBcIl0gPSAzMjZdID0gXCJ0cmlhbmdsZVVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cm9waHlcIl0gPSAzMjddID0gXCJ0cm9waHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVuZGVybGluZVwiXSA9IDMyOF0gPSBcInVuZGVybGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widW5zdWJzY3JpYmVcIl0gPSAzMjldID0gXCJ1bnN1YnNjcmliZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widXBsb2FkXCJdID0gMzMwXSA9IFwidXBsb2FkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2aWRlb1wiXSA9IDMzMV0gPSBcInZpZGVvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxcIl0gPSAzMzJdID0gXCJ2b2ljZW1haWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZvaWNlbWFpbEZvcndhcmRcIl0gPSAzMzNdID0gXCJ2b2ljZW1haWxGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxSZXBseVwiXSA9IDMzNF0gPSBcInZvaWNlbWFpbFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3YWZmbGVcIl0gPSAzMzVdID0gXCJ3YWZmbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIndvcmtcIl0gPSAzMzZdID0gXCJ3b3JrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3cmVuY2hcIl0gPSAzMzddID0gXCJ3cmVuY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInhcIl0gPSAzMzhdID0gXCJ4XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ4Q2lyY2xlXCJdID0gMzM5XSA9IFwieENpcmNsZVwiO1xufSkoZXhwb3J0cy5JY29uRW51bSB8fCAoZXhwb3J0cy5JY29uRW51bSA9IHt9KSk7XG52YXIgSWNvbkVudW0gPSBleHBvcnRzLkljb25FbnVtO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIExhYmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYWJlbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGFiZWwgY2xhc3M9XCJtcy1MYWJlbFwiPjxuZy10cmFuc2NsdWRlLz48L2xhYmVsPic7XG4gICAgfVxuICAgIExhYmVsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExhYmVsRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRyaWJ1dGVzLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2xhYmVsJykuZXEoMCkuYWRkQ2xhc3MoJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRyaWJ1dGVzLnJlcXVpcmVkKSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2xhYmVsJykuZXEoMCkuYWRkQ2xhc3MoJ2lzLXJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMYWJlbERpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLkxhYmVsRGlyZWN0aXZlID0gTGFiZWxEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5sYWJlbCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxhYmVsJywgTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgTGlua0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlua0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8YSBuZy1ocmVmPVwie3sgbmdIcmVmIH19XCIgY2xhc3M9XCJtcy1MaW5rXCIgbmctdHJhbnNjbHVkZT48L2E+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIExpbmtEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaW5rRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlua0RpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLkxpbmtEaXJlY3RpdmUgPSBMaW5rRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGluaycsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGluaycsIExpbmtEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG92ZXJsYXlNb2RlRW51bV90c18xID0gcmVxdWlyZSgnLi9vdmVybGF5TW9kZUVudW0udHMnKTtcbnZhciBPdmVybGF5Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheUNvbnRyb2xsZXIobG9nKSB7XG4gICAgICAgIHRoaXMubG9nID0gbG9nO1xuICAgIH1cbiAgICBPdmVybGF5Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIE92ZXJsYXlDb250cm9sbGVyO1xufSkoKTtcbnZhciBPdmVybGF5RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVybGF5RGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtT3ZlcmxheVwiIG5nLWNsYXNzPVwie1xcJ21zLU92ZXJsYXktLWRhcmtcXCc6IHVpZk1vZGUgPT0gXFwnZGFya1xcJ31cIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZNb2RlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgT3ZlcmxheURpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIE92ZXJsYXlEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uIChsb2cpIHsgcmV0dXJuIG5ldyBPdmVybGF5RGlyZWN0aXZlKGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPdmVybGF5RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmTW9kZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChvdmVybGF5TW9kZUVudW1fdHNfMS5PdmVybGF5TW9kZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIE92ZXJsYXlEaXJlY3RpdmUubG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vdmVybGF5IC0gVW5zdXBwb3J0ZWQgb3ZlcmxheSBtb2RlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBvdmVybGF5IG1vZGUgKFxcJycgKyBzY29wZS51aWZNb2RlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIE92ZXJsYXlEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5PdmVybGF5RGlyZWN0aXZlID0gT3ZlcmxheURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm92ZXJsYXknLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk92ZXJsYXknLCBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3ZlcmxheU1vZGUpIHtcbiAgICBPdmVybGF5TW9kZVtPdmVybGF5TW9kZVtcImxpZ2h0XCJdID0gMF0gPSBcImxpZ2h0XCI7XG4gICAgT3ZlcmxheU1vZGVbT3ZlcmxheU1vZGVbXCJkYXJrXCJdID0gMV0gPSBcImRhcmtcIjtcbn0pKGV4cG9ydHMuT3ZlcmxheU1vZGUgfHwgKGV4cG9ydHMuT3ZlcmxheU1vZGUgPSB7fSkpO1xudmFyIE92ZXJsYXlNb2RlID0gZXhwb3J0cy5PdmVybGF5TW9kZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlNb2RlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3JcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbU5hbWVcIj57e3VpZk5hbWV9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1pdGVtUHJvZ3Jlc3NcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItcHJvZ3Jlc3NUcmFja1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1wcm9ncmVzc0JhclwiIG5nLXN0eWxlPVwie3dpZHRoOiB1aWZQZXJjZW50Q29tcGxldGUrXFwnJVxcJ31cIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbURlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZOYW1lOiAnQCcsXG4gICAgICAgICAgICB1aWZQZXJjZW50Q29tcGxldGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAobG9nKSB7IHJldHVybiBuZXcgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUobG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUGVyY2VudENvbXBsZXRlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwgfHwgbmV3VmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGVyY2VudENvbXBsZXRlID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3UGVyY2VudENvbXBsZXRlID0gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obmV3UGVyY2VudENvbXBsZXRlKSB8fCBuZXdQZXJjZW50Q29tcGxldGUgPCAwIHx8IG5ld1BlcmNlbnRDb21wbGV0ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucHJvZ3Jlc3NpbmRpY2F0b3IgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1BlcmNlbnQgY29tcGxldGUgbXVzdCBiZSBhIHZhbGlkIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMC4nKTtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZQZXJjZW50Q29tcGxldGUgPSBNYXRoLm1heChNYXRoLm1pbihuZXdQZXJjZW50Q29tcGxldGUsIDEwMCksIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5Qcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZSA9IFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucHJvZ3Jlc3NpbmRpY2F0b3InLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlByb2dyZXNzSW5kaWNhdG9yJywgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wcm9ncmVzc2luZGljYXRvci9wcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgU2VhcmNoQm94RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWFyY2hCb3hEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNlYXJjaEJveFwiIG5nLWNsYXNzPVwie1xcJ2lzLWFjdGl2ZVxcJzppc0FjdGl2ZX1cIj4nICtcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJtcy1TZWFyY2hCb3gtZmllbGRcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWJsdXI9XCJpbnB1dEJsdXIoKVwiJyArXG4gICAgICAgICAgICAnIG5nLW1vZGVsPVwidmFsdWVcIiBpZD1cInt7OjpcXCdzZWFyY2hCb3hfXFwnKyRpZH19XCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgY2xhc3M9XCJtcy1TZWFyY2hCb3gtbGFiZWxcIiBmb3I9XCJ7ezo6XFwnc2VhcmNoQm94X1xcJyskaWR9fVwiIG5nLWhpZGU9XCJpc0xhYmVsSGlkZGVuXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1TZWFyY2hCb3gtaWNvbiBtcy1JY29uIG1zLUljb24tLXNlYXJjaFwiID48L2k+IHt7cGxhY2Vob2xkZXJ9fTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm1zLVNlYXJjaEJveC1jbG9zZUJ1dHRvblwiIG5nLW1vdXNlZG93bj1cImJ0bk1vdXNlZG93bigpXCIgdHlwZT1cImJ1dHRvblwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJz0/JyxcbiAgICAgICAgICAgIHZhbHVlOiAnPT8nXG4gICAgICAgIH07XG4gICAgfVxuICAgIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNlYXJjaEJveERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU2VhcmNoQm94RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICBzY29wZS5pc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaW5wdXRGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Qmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5pc0NhbmNlbCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHNjb3BlLnZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2NvcGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmJ0bk1vdXNlZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzQ2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd2YWx1ZScsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICghc2NvcGUuaXNGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdmFsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3BsYWNlaG9sZGVyJywgZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgICAgICAgICAgc2NvcGUucGxhY2Vob2xkZXIgPSBzZWFyY2g7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlYXJjaEJveERpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLlNlYXJjaEJveERpcmVjdGl2ZSA9IFNlYXJjaEJveERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNlYXJjaGJveCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNlYXJjaGJveCcsIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3NlYXJjaGJveC9zZWFyY2hib3hEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHNwaW5uZXJTaXplRW51bV8xID0gcmVxdWlyZSgnLi9zcGlubmVyU2l6ZUVudW0nKTtcbnZhciBTcGlubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGlubmVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1TcGlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gU3Bpbm5lckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAnbmdTaG93JzogJz0nLFxuICAgICAgICAgICAgJ3VpZlNpemUnOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3Bpbm5lckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNwaW5uZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNwaW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZVthdHRycy51aWZTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNwaW5uZXIgLSBVbnN1cHBvcnRlZCBzaXplOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1NwaW5uZXIgc2l6ZSAoXFwnJyArIGF0dHJzLnVpZlNpemUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdID09PSBzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZS5sYXJnZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnbXMtU3Bpbm5lci0tbGFyZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMubmdTaG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnbmdTaG93JywgZnVuY3Rpb24gKG5ld1Zpc2libGUsIG9sZFZpc2libGUsIHNwaW5uZXJTY29wZSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwaW5uZXJTY29wZS5zdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICBpZiAoY2xvbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gbmcuZWxlbWVudCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1TcGlubmVyLWxhYmVsJykuYXBwZW5kKGNsb25lKTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuaW5pdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFNwaW5uZXJEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5TcGlubmVyRGlyZWN0aXZlID0gU3Bpbm5lckRpcmVjdGl2ZTtcbnZhciBTcGlubmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Bpbm5lckNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGludGVydmFsLCAkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGludGVydmFsID0gJGludGVydmFsO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLl9vZmZzZXRTaXplID0gMC4xNzk7XG4gICAgICAgIHRoaXMuX251bUNpcmNsZXMgPSA4O1xuICAgICAgICB0aGlzLl9hbmltYXRpb25TcGVlZCA9IDkwO1xuICAgICAgICB0aGlzLl9jaXJjbGVzID0gW107XG4gICAgICAgICRzY29wZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3BhcmVudFNpemUgPSBzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZVtfdGhpcy4kc2NvcGUudWlmU2l6ZV0gPT09IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplLmxhcmdlID8gMjggOiAyMDtcbiAgICAgICAgICAgIF90aGlzLmNyZWF0ZUNpcmNsZXNBbmRBcnJhbmdlKCk7XG4gICAgICAgICAgICBfdGhpcy5zZXRJbml0aWFsT3BhY2l0eSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fYW5pbWF0aW9uSW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gX3RoaXMuX2NpcmNsZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmFkZUNpcmNsZShfdGhpcy5fY2lyY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgX3RoaXMuX2FuaW1hdGlvblNwZWVkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKF90aGlzLl9hbmltYXRpb25JbnRlcnZhbCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFNwaW5uZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVDaXJjbGVzQW5kQXJyYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gMDtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX3BhcmVudFNpemUgKiB0aGlzLl9vZmZzZXRTaXplO1xuICAgICAgICB2YXIgc3RlcCA9ICgyICogTWF0aC5QSSkgLyB0aGlzLl9udW1DaXJjbGVzO1xuICAgICAgICB2YXIgaSA9IHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHZhciByYWRpdXMgPSAodGhpcy5fcGFyZW50U2l6ZSAtIG9mZnNldCkgKiAwLjU7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHZhciBjaXJjbGUgPSB0aGlzLmNyZWF0ZUNpcmNsZSgpO1xuICAgICAgICAgICAgdmFyIHggPSBNYXRoLnJvdW5kKHRoaXMuX3BhcmVudFNpemUgKiAwLjUgKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSkgLSBjaXJjbGVbMF0uY2xpZW50V2lkdGggKiAwLjUpIC0gb2Zmc2V0ICogMC41O1xuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLnJvdW5kKHRoaXMuX3BhcmVudFNpemUgKiAwLjUgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSkgLSBjaXJjbGVbMF0uY2xpZW50SGVpZ2h0ICogMC41KSAtIG9mZnNldCAqIDAuNTtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKGNpcmNsZSk7XG4gICAgICAgICAgICBjaXJjbGUuY3NzKCdsZWZ0JywgKHggKyAncHgnKSk7XG4gICAgICAgICAgICBjaXJjbGUuY3NzKCd0b3AnLCAoeSArICdweCcpKTtcbiAgICAgICAgICAgIGFuZ2xlICs9IHN0ZXA7XG4gICAgICAgICAgICB2YXIgY2lyY2xlT2JqZWN0ID0gbmV3IENpcmNsZU9iamVjdChjaXJjbGUsIGkpO1xuICAgICAgICAgICAgdGhpcy5fY2lyY2xlcy5wdXNoKGNpcmNsZU9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNwaW5uZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVDaXJjbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaXJjbGUgPSBuZy5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgZG90U2l6ZSA9ICh0aGlzLl9wYXJlbnRTaXplICogdGhpcy5fb2Zmc2V0U2l6ZSkgKyAncHgnO1xuICAgICAgICBjaXJjbGUuYWRkQ2xhc3MoJ21zLVNwaW5uZXItY2lyY2xlJykuY3NzKCd3aWR0aCcsIGRvdFNpemUpLmNzcygnaGVpZ2h0JywgZG90U2l6ZSk7XG4gICAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICA7XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLnNldEluaXRpYWxPcGFjaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3BjYWl0eVRvU2V0O1xuICAgICAgICB0aGlzLl9mYWRlSW5jcmVtZW50ID0gMSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoY2lyY2xlLCBpbmRleCkge1xuICAgICAgICAgICAgb3BjYWl0eVRvU2V0ID0gKF90aGlzLl9mYWRlSW5jcmVtZW50ICogKGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgY2lyY2xlLm9wYWNpdHkgPSBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmZhZGVDaXJjbGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHZhciBuZXdPcGFjaXR5ID0gY2lyY2xlLm9wYWNpdHkgLSB0aGlzLl9mYWRlSW5jcmVtZW50O1xuICAgICAgICBpZiAobmV3T3BhY2l0eSA8PSAwKSB7XG4gICAgICAgICAgICBuZXdPcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG5ld09wYWNpdHk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGludGVydmFsJywgJyRsb2cnXTtcbiAgICByZXR1cm4gU3Bpbm5lckNvbnRyb2xsZXI7XG59KSgpO1xudmFyIENpcmNsZU9iamVjdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2lyY2xlT2JqZWN0KGNpcmNsZUVsZW1lbnQsIGNpcmNsZUluZGV4KSB7XG4gICAgICAgIHRoaXMuY2lyY2xlRWxlbWVudCA9IGNpcmNsZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2lyY2xlSW5kZXggPSBjaXJjbGVJbmRleDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENpcmNsZU9iamVjdC5wcm90b3R5cGUsIFwib3BhY2l0eVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICsodGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAob3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScsIG9wYWNpdHkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQ2lyY2xlT2JqZWN0O1xufSkoKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNwaW5uZXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZTcGlubmVyJywgU3Bpbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFNwaW5uZXJTaXplKSB7XG4gICAgU3Bpbm5lclNpemVbU3Bpbm5lclNpemVbJ3NtYWxsJ10gPSAwXSA9ICdzbWFsbCc7XG4gICAgU3Bpbm5lclNpemVbU3Bpbm5lclNpemVbJ2xhcmdlJ10gPSAxXSA9ICdsYXJnZSc7XG59KShleHBvcnRzLlNwaW5uZXJTaXplIHx8IChleHBvcnRzLlNwaW5uZXJTaXplID0ge30pKTtcbnZhciBTcGlubmVyU2l6ZSA9IGV4cG9ydHMuU3Bpbm5lclNpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMSA9IHJlcXVpcmUoJy4vdGFibGVSb3dTZWxlY3RNb2RlRW51bScpO1xudmFyIFRhYmxlQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVDb250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IG51bGw7XG4gICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQXNjID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kc2NvcGUucm93cyA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckJ5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUub3JkZXJCeTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQnkgPSBwcm9wZXJ0eTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwib3JkZXJBc2NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckFzYztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAob3JkZXJBc2MpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQXNjID0gb3JkZXJBc2M7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInJvd1NlbGVjdE1vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5yb3dTZWxlY3RNb2RlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb3dTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICBpZiAodGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bcm93U2VsZWN0TW9kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIHJvd1NlbGVjdE1vZGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLXJvdy1zZWxlY3QtbW9kZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBub25lfHNpbmdsZXxtdWx0aXBsZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJvd1NlbGVjdE1vZGUgPSByb3dTZWxlY3RNb2RlO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJyb3dzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUucm93cztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocm93cykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUucm93cyA9IHJvd3M7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkSXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvd3NbaV0uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKHRoaXMucm93c1tpXS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVGFibGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIFRhYmxlQ29udHJvbGxlcjtcbn0pKCk7XG52YXIgVGFibGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1UYWJsZVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd0YWJsZSc7XG4gICAgfVxuICAgIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZSb3dTZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmUm93U2VsZWN0TW9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlJvd1NlbGVjdE1vZGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZSb3dTZWxlY3RNb2RlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi1yb3ctc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gYXR0cnMudWlmUm93U2VsZWN0TW9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUucm93U2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZURpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLlRhYmxlRGlyZWN0aXZlID0gVGFibGVEaXJlY3RpdmU7XG52YXIgVGFibGVSb3dDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVSb3dDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXRlbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZVJvd0NvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZVJvd0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVSb3dDb250cm9sbGVyO1xufSkoKTtcbnZhciBUYWJsZVJvd0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVRhYmxlLXJvd1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZUYWJsZSc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpdGVtOiAnPXVpZkl0ZW0nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlUm93Q29udHJvbGxlcjtcbiAgICB9XG4gICAgVGFibGVSb3dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZVJvd0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVSb3dEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZTZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkU3RyaW5nID0gYXR0cnMudWlmU2VsZWN0ZWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyAhPT0gJ3RydWUnICYmIHNlbGVjdGVkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgdGFibGUuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlNlbGVjdGVkICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhYmxlLnJvd3MucHVzaChzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucm93Q2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCB0YWJsZVJvd1Njb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSA9PT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0uc2luZ2xlXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3NbaV0gIT09IHRhYmxlUm93U2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUucm93c1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSAhPT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV0gJiZcbiAgICAgICAgICAgIHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50Lm9uKCdjbGljaycsIHNjb3BlLnJvd0NsaWNrKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSA9PT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV0pIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jc3MoJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZVJvd0RpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLlRhYmxlUm93RGlyZWN0aXZlID0gVGFibGVSb3dEaXJlY3RpdmU7XG52YXIgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtVGFibGUtcm93Q2hlY2tcIj48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWydedWlmVGFibGUnLCAnXnVpZlRhYmxlUm93J107XG4gICAgfVxuICAgIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycykge1xuICAgICAgICBzY29wZS5yb3dTZWxlY3RDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHRhYmxlID0gY29udHJvbGxlcnNbMF07XG4gICAgICAgICAgICB2YXIgcm93ID0gY29udHJvbGxlcnNbMV07XG4gICAgICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSAhPT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubXVsdGlwbGVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJvdy5pdGVtID09PSB1bmRlZmluZWQgfHwgcm93Lml0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2hvdWxkU2VsZWN0QWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzW2ldLnNlbGVjdGVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRTZWxlY3RBbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzW2ldLnNlbGVjdGVkICE9PSBzaG91bGRTZWxlY3RBbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnJvd3NbaV0uc2VsZWN0ZWQgPSBzaG91bGRTZWxlY3RBbGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5vbignY2xpY2snLCBzY29wZS5yb3dTZWxlY3RDbGljayk7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVSb3dTZWxlY3REaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5UYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSA9IFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlO1xudmFyIFRhYmxlQ2VsbERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVDZWxsRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtVGFibGUtY2VsbFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQ2VsbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQ2VsbERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQ2VsbERpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLlRhYmxlQ2VsbERpcmVjdGl2ZSA9IFRhYmxlQ2VsbERpcmVjdGl2ZTtcbnZhciBUYWJsZUhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1UYWJsZS1jZWxsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZUYWJsZSc7XG4gICAgfVxuICAgIFRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlSGVhZGVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCB0YWJsZSkge1xuICAgICAgICBzY29wZS5oZWFkZXJDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKHRhYmxlLm9yZGVyQnkgPT09IGF0dHJzLnVpZk9yZGVyQnkpIHtcbiAgICAgICAgICAgICAgICB0YWJsZS5vcmRlckFzYyA9ICF0YWJsZS5vcmRlckFzYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQnkgPSBhdHRycy51aWZPcmRlckJ5O1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd0YWJsZS5vcmRlckJ5JywgZnVuY3Rpb24gKG5ld09yZGVyQnksIG9sZE9yZGVyQnksIHRhYmxlSGVhZGVyU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChvbGRPcmRlckJ5ICE9PSBuZXdPcmRlckJ5ICYmXG4gICAgICAgICAgICAgICAgbmV3T3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHZhciBjZWxscyA9IGluc3RhbmNlRWxlbWVudC5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxzLmVxKGkpLmNoaWxkcmVuKCkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxscy5lcShpKS5jaGlsZHJlbigpLmVxKDEpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwidWlmLXNvcnQtb3JkZXJcIj4mbmJzcDtcXFxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jYXJldERvd25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9zcGFuPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd0YWJsZS5vcmRlckFzYycsIGZ1bmN0aW9uIChuZXdPcmRlckFzYywgb2xkT3JkZXJBc2MsIHRhYmxlSGVhZGVyU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkQ3NzQ2xhc3MgPSBvbGRPcmRlckFzYyA/ICdtcy1JY29uLS1jYXJldERvd24nIDogJ21zLUljb24tLWNhcmV0VXAnO1xuICAgICAgICAgICAgICAgIHZhciBuZXdDc3NDbGFzcyA9IG5ld09yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMSkuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcyhvbGRDc3NDbGFzcykuYWRkQ2xhc3MobmV3Q3NzQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCd1aWZPcmRlckJ5JyBpbiBhdHRycykge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50Lm9uKCdjbGljaycsIHNjb3BlLmhlYWRlckNsaWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuVGFibGVIZWFkZXJEaXJlY3RpdmUgPSBUYWJsZUhlYWRlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGUnLCBUYWJsZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3cnLCBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3dTZWxlY3QnLCBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVDZWxsJywgVGFibGVDZWxsRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUhlYWRlcicsIFRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChUYWJsZVJvd1NlbGVjdE1vZGVFbnVtKSB7XG4gICAgVGFibGVSb3dTZWxlY3RNb2RlRW51bVtUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1wibm9uZVwiXSA9IDBdID0gXCJub25lXCI7XG4gICAgVGFibGVSb3dTZWxlY3RNb2RlRW51bVtUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMV0gPSBcInNpbmdsZVwiO1xuICAgIFRhYmxlUm93U2VsZWN0TW9kZUVudW1bVGFibGVSb3dTZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMl0gPSBcIm11bHRpcGxlXCI7XG59KShleHBvcnRzLlRhYmxlUm93U2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuVGFibGVSb3dTZWxlY3RNb2RlRW51bSA9IHt9KSk7XG52YXIgVGFibGVSb3dTZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuVGFibGVSb3dTZWxlY3RNb2RlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVJvd1NlbGVjdE1vZGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBUZXh0RmllbGREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRGaWVsZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwie1xcJ2lzLWFjdGl2ZVxcJzogaXNBY3RpdmUsIFxcJ21zLVRleHRGaWVsZFxcJzogdHJ1ZSwgJyArXG4gICAgICAgICAgICAnXFwnbXMtVGV4dEZpZWxkLS11bmRlcmxpbmVkXFwnOiB1aWZVbmRlcmxpbmVkLCBcXCdtcy1UZXh0RmllbGQtLXBsYWNlaG9sZGVyXFwnOiBwbGFjZWhvbGRlcn1cIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgbmctc2hvdz1cImxhYmVsU2hvd25cIiBjbGFzcz1cIm1zLUxhYmVsXCI+e3t1aWZMYWJlbCB8fCBwbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8aW5wdXQgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiIGNsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgLz4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRleHRGaWVsZC1kZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZMYWJlbDogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICc/bmdNb2RlbCc7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgfVxuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRleHRGaWVsZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGV4dEZpZWxkRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBuZ01vZGVsKSB7XG4gICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSB0cnVlO1xuICAgICAgICBzY29wZS51aWZVbmRlcmxpbmVkID0gJ3VpZlVuZGVybGluZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS5pbnB1dEZvY3VzID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUudWlmVW5kZXJsaW5lZCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKHNjb3BlLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5pbnB1dEJsdXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICAgICAgaWYgKHNjb3BlLnBsYWNlaG9sZGVyICYmIGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjb3BlLnVpZlVuZGVybGluZWQpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAobmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBuZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9ICFuZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGV4dEZpZWxkRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuVGV4dEZpZWxkRGlyZWN0aXZlID0gVGV4dEZpZWxkRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGV4dGZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUZXh0ZmllbGQnLCBUZXh0RmllbGREaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBUb2dnbGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRvZ2dsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwidG9nZ2xlQ2xhc3NcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRvZ2dsZS1kZXNjcmlwdGlvblwiPjxuZy10cmFuc2NsdWRlLz48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtaW5wdXRcIiBuZy1tb2RlbD1cIm5nTW9kZWxcIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLVRvZ2dsZS1maWVsZFwiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtTGFiZWwgbXMtTGFiZWwtLW9mZlwiPnt7dWlmTGFiZWxPZmZ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vblwiPnt7dWlmTGFiZWxPbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9PycsXG4gICAgICAgICAgICB1aWZMYWJlbE9mZjogJ0AnLFxuICAgICAgICAgICAgdWlmTGFiZWxPbjogJ0AnLFxuICAgICAgICAgICAgdWlmVGV4dExvY2F0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgVG9nZ2xlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVG9nZ2xlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUb2dnbGVEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLnRvZ2dsZUNsYXNzID0gJ21zLVRvZ2dsZSc7XG4gICAgICAgIGlmIChzY29wZS51aWZUZXh0TG9jYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBsb2MgPSBzY29wZS51aWZUZXh0TG9jYXRpb247XG4gICAgICAgICAgICBsb2MgPSBsb2MuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsb2Muc2xpY2UoMSk7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVDbGFzcyArPSAnIG1zLVRvZ2dsZS0tdGV4dCcgKyBsb2M7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUb2dnbGVEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5Ub2dnbGVEaXJlY3RpdmUgPSBUb2dnbGVEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50b2dnbGUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRvZ2dsZScsIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==