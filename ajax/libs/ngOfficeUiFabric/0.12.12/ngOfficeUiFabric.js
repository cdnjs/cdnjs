/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * Angular 1.x directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.12.12
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
	var angular = __webpack_require__(2);
	exports.module = angular.module('officeuifabric.core', []);


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var breadcrumbModule = __webpack_require__(4);
	var buttonModule = __webpack_require__(5);
	var calloutModule = __webpack_require__(8);
	var choicefieldModule = __webpack_require__(11);
	var commandBarModule = __webpack_require__(13);
	var contentModule = __webpack_require__(14);
	var contextualMenuModule = __webpack_require__(15);
	var datepickerModule = __webpack_require__(16);
	var dialogModule = __webpack_require__(17);
	var dropdownModule = __webpack_require__(19);
	var facepileModule = __webpack_require__(20);
	var iconModule = __webpack_require__(21);
	var labelModule = __webpack_require__(23);
	var linkModule = __webpack_require__(24);
	var listModule = __webpack_require__(25);
	var messageBannerModule = __webpack_require__(29);
	var messageBarModule = __webpack_require__(30);
	var navBarModule = __webpack_require__(32);
	var overlayModule = __webpack_require__(33);
	var panelModule = __webpack_require__(35);
	var personacardModule = __webpack_require__(37);
	var personaModule = __webpack_require__(42);
	var pivotModule = __webpack_require__(45);
	var progressIndicatorModule = __webpack_require__(48);
	var searchboxModule = __webpack_require__(49);
	var spinnerModule = __webpack_require__(50);
	var tableModule = __webpack_require__(52);
	var textFieldModule = __webpack_require__(55);
	var toggleModule = __webpack_require__(57);
	var orgChartModule = __webpack_require__(58);
	var peoplePickerModule = __webpack_require__(62);
	exports.module = angular.module('officeuifabric.components', [
	    breadcrumbModule.module.name,
	    buttonModule.module.name,
	    calloutModule.module.name,
	    choicefieldModule.module.name,
	    commandBarModule.module.name,
	    contentModule.module.name,
	    contextualMenuModule.module.name,
	    datepickerModule.module.name,
	    dialogModule.module.name,
	    dropdownModule.module.name,
	    facepileModule.module.name,
	    iconModule.module.name,
	    labelModule.module.name,
	    linkModule.module.name,
	    listModule.module.name,
	    messageBannerModule.module.name,
	    messageBarModule.module.name,
	    navBarModule.module.name,
	    overlayModule.module.name,
	    panelModule.module.name,
	    peoplePickerModule.module.name,
	    personacardModule.module.name,
	    personaModule.module.name,
	    pivotModule.module.name,
	    progressIndicatorModule.module.name,
	    searchboxModule.module.name,
	    spinnerModule.module.name,
	    tableModule.module.name,
	    textFieldModule.module.name,
	    toggleModule.module.name,
	    orgChartModule.module.name
	]);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var BreadcrumbLinkDirective = (function () {
	    function BreadcrumbLinkDirective() {
	        this.restrict = 'E';
	        this.require = '^uifBreadcrumb';
	        this.transclude = true;
	        this.replace = true;
	        this.template = "\n  <li class=\"ms-Breadcrumb-listItem\">\n    <a class=\"ms-Breadcrumb-itemLink\" ng-href=\"{{ngHref}}\" tabindex=\"{{uifTabindex}}\" ng-transclude></a>\n    <i class=\"ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight\"></i>\n  </li>";
	        this.scope = {
	            ngHref: '@'
	        };
	    }
	    BreadcrumbLinkDirective.factory = function () {
	        var directive = function () { return new BreadcrumbLinkDirective(); };
	        return directive;
	    };
	    BreadcrumbLinkDirective.prototype.link = function (scope, instanceElement, attributes, ctrl, transclude) {
	        var tabindex = Array.prototype.indexOf.call(instanceElement.parent().children(), instanceElement[0]) + 2;
	        scope.uifTabindex = tabindex;
	    };
	    return BreadcrumbLinkDirective;
	}());
	exports.BreadcrumbLinkDirective = BreadcrumbLinkDirective;
	var BreadcrumbLink = (function () {
	    function BreadcrumbLink(href, linkText) {
	        this.href = href;
	        this.linkText = linkText;
	    }
	    return BreadcrumbLink;
	}());
	exports.BreadcrumbLink = BreadcrumbLink;
	var BreadcrumbController = (function () {
	    function BreadcrumbController($scope, $document, $window) {
	        this.$scope = $scope;
	        this.$document = $document;
	        this.$window = $window;
	    }
	    BreadcrumbController.$inject = ['$scope', '$document', '$window'];
	    return BreadcrumbController;
	}());
	exports.BreadcrumbController = BreadcrumbController;
	var BreadcrumbDirective = (function () {
	    function BreadcrumbDirective() {
	        var _this = this;
	        this.restrict = 'E';
	        this.replace = true;
	        this.template = "\n  <div class=\"ms-Breadcrumb\" ng-class=\"{'is-overflow': isOverflow()}\">\n    <div class=\"ms-Breadcrumb-overflow\">\n      <div class=\"ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis\"\n           ng-click=\"openOverflow($event)\" tabindex=\"1\"></div>\n      <i class=\"ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight\"></i>\n      <div class=\"ms-Breadcrumb-overflowMenu\" ng-class=\"{'is-open': overflowMenuOpen}\">\n        <ul class=\"ms-ContextualMenu is-open\">\n          <li class=\"ms-ContextualMenu-item\"\n              ng-repeat=\"link in uifBreadcrumbLinks | limitTo:overflowElements()\">\n            <a class=\"ms-ContextualMenu-link\" ng-href=\"{{link.href}}\">{{link.linkText}}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <ul class=\"ms-Breadcrumb-list\">\n      <uif-breadcrumb-link ng-repeat=\"link in uifBreadcrumbLinks | limitTo:-visibleElements\"\n                           ng-href=\"{{link.href}}\">{{link.linkText}}</uif-breadcrumb-link>\n    </ul>\n  </div>";
	        this.controller = BreadcrumbController;
	        this.require = 'uifBreadcrumb';
	        this.scope = {
	            'uifBreadcrumbLinks': '='
	        };
	        this.SMALL_BREAK_POINT = 639;
	        this.link = function ($scope, $instanceElement, $attrs, $breadcrumbController) {
	            $scope.visibleElements = 4;
	            $scope.overflowMenuOpen = false;
	            $scope.isOverflow = function () {
	                var overflow = false;
	                overflow = angular.isDefined($scope.uifBreadcrumbLinks) && $scope.uifBreadcrumbLinks.length > $scope.visibleElements;
	                return overflow;
	            };
	            $scope.overflowElements = function () {
	                return $scope.isOverflow() ? $scope.uifBreadcrumbLinks.length - $scope.visibleElements : 0;
	            };
	            $scope.openOverflow = function (event) {
	                event.stopPropagation();
	                $scope.overflowMenuOpen = true;
	            };
	            angular.element($breadcrumbController.$window).bind('resize', function () {
	                $scope.onResize();
	                $scope.$digest();
	            });
	            $breadcrumbController.$document.find('html').on('click', function (event) {
	                $scope.overflowMenuOpen = false;
	                $scope.$apply();
	            });
	            $scope.onResize = function (innerWidth) {
	                if (innerWidth === undefined) {
	                    innerWidth = window.innerWidth;
	                }
	                var elementsToShow = (innerWidth > _this.SMALL_BREAK_POINT) ? 4 : 2;
	                if (elementsToShow !== $scope.visibleElements) {
	                    $scope.visibleElements = elementsToShow;
	                    $scope.$apply();
	                }
	            };
	            $scope.onResize();
	        };
	    }
	    BreadcrumbDirective.factory = function () {
	        var directive = function () { return new BreadcrumbDirective(); };
	        return directive;
	    };
	    return BreadcrumbDirective;
	}());
	exports.BreadcrumbDirective = BreadcrumbDirective;
	exports.module = angular.module('officeuifabric.components.breadcrumb', ['officeuifabric.components'])
	    .directive('uifBreadcrumb', BreadcrumbDirective.factory())
	    .directive('uifBreadcrumbLink', BreadcrumbLinkDirective.factory());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var buttonTypeEnum_1 = __webpack_require__(6);
	var buttonTemplateType_1 = __webpack_require__(7);
	var ButtonController = (function () {
	    function ButtonController($log) {
	        this.$log = $log;
	    }
	    ButtonController.$inject = ['$log'];
	    return ButtonController;
	}());
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
	        this.templateOptions = {};
	        this.template = function ($element, $attrs) {
	            if (!angular.isUndefined($attrs.uifType) && angular.isUndefined(buttonTypeEnum_1.ButtonTypeEnum[$attrs.uifType])) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.button - Unsupported button: ' +
	                    'The button (\'' + $attrs.uifType + '\') is not supported by the Office UI Fabric. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/button/buttonTypeEnum.ts');
	            }
	            switch ($attrs.uifType) {
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.primary]:
	                    return angular.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.primaryButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.primaryLink];
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.command]:
	                    return angular.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.commandButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.commandLink];
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.compound]:
	                    return angular.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.compoundButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.compoundLink];
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.hero]:
	                    return angular.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.heroButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.heroLink];
	                default:
	                    return angular.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.actionButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.actionLink];
	            }
	        };
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
	        attrs.$observe('disabled', function (isDisabled) {
	            scope.disabled = !!isDisabled;
	        });
	        element.on('click', function (e) {
	            if (scope.disabled) {
	                e.preventDefault();
	            }
	        });
	    };
	    ButtonDirective.prototype.postLink = function (scope, element, attrs, controllers, transclude) {
	        if (angular.isUndefined(attrs.uifType) ||
	            attrs.uifType === buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.primary] ||
	            attrs.uifType === buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.compound]) {
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
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.command]:
	                    for (var i = 0; i < clone.length; i++) {
	                        if (clone[i].tagName === 'SPAN') {
	                            wrapper = angular.element('<span></span>');
	                            wrapper.addClass('ms-Button-label').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                        if (clone[i].tagName === 'UIF-ICON') {
	                            wrapper = angular.element('<span></span>');
	                            wrapper.addClass('ms-Button-icon').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                    }
	                    break;
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.compound]:
	                    for (var i = 0; i < clone.length; i++) {
	                        if (clone[i].tagName !== 'SPAN') {
	                            continue;
	                        }
	                        if (clone[i].classList[0] === 'ng-scope' &&
	                            clone[i].classList.length === 1) {
	                            wrapper = angular.element('<span></span>');
	                            wrapper.addClass('ms-Button-label').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                        else {
	                            element.append(clone[i]);
	                        }
	                    }
	                    break;
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.hero]:
	                    for (var i = 0; i < clone.length; i++) {
	                        if (clone[i].tagName === 'SPAN') {
	                            wrapper = angular.element('<span></span>');
	                            wrapper.addClass('ms-Button-label').append(clone[i]);
	                            element.append(wrapper);
	                        }
	                        if (clone[i].tagName === 'UIF-ICON') {
	                            wrapper = angular.element('<span></span>');
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
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.actionButton] =
	            "<button class=\"ms-Button\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </button>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.actionLink] =
	            "<a class=\"ms-Button\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </a>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.primaryButton] =
	            "<button class=\"ms-Button ms-Button--primary\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </button>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.primaryLink] =
	            "<a class=\"ms-Button ms-Button--primary\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </a>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.commandButton] =
	            "<button class=\"ms-Button ms-Button--command\" ng-class=\"{'is-disabled': disabled}\"></button>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.commandLink] =
	            "<a class=\"ms-Button ms-Button--command\" ng-class=\"{'is-disabled': disabled}\"></a>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.compoundButton] =
	            "<button class=\"ms-Button ms-Button--compound\" ng-class=\"{'is-disabled': disabled}\"></button>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.compoundLink] =
	            "<a class=\"ms-Button ms-Button--compound\" ng-class=\"{'is-disabled': disabled}\"></a>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.heroButton] =
	            "<button class=\"ms-Button ms-Button--hero\" ng-class=\"{'is-disabled': disabled}\"></button>";
	        this.templateOptions[buttonTemplateType_1.ButtonTemplateType.heroLink] =
	            "<a class=\"ms-Button ms-Button--hero\" ng-class=\"{'is-disabled': disabled}\"></a>";
	    };
	    return ButtonDirective;
	}());
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
	}());
	exports.ButtonDescriptionDirective = ButtonDescriptionDirective;
	exports.module = angular.module('officeuifabric.components.button', [
	    'officeuifabric.components'
	])
	    .directive('uifButton', ButtonDirective.factory())
	    .directive('uifButtonDescription', ButtonDescriptionDirective.factory());


/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var calloutTypeEnum_1 = __webpack_require__(9);
	var calloutArrowEnum_1 = __webpack_require__(10);
	var CalloutController = (function () {
	    function CalloutController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	    }
	    CalloutController.$inject = ['$scope', '$log'];
	    return CalloutController;
	}());
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
	        if (!angular.isUndefined(mainWrapper) && mainWrapper.hasClass('ms-Callout-main')) {
	            var detachedHeader = instanceElement.detach();
	            mainWrapper.prepend(detachedHeader);
	        }
	    };
	    return CalloutHeaderDirective;
	}());
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
	}());
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
	        if (angular.isObject(calloutController)) {
	            calloutController.$scope.$watch('hasSeparator', function (hasSeparator) {
	                if (hasSeparator) {
	                    var actionChildren = instanceElement.children().eq(0).children();
	                    for (var buttonIndex = 0; buttonIndex < actionChildren.length; buttonIndex++) {
	                        var action = actionChildren.eq(buttonIndex);
	                        action.addClass('ms-Callout-action');
	                        var actionSpans = action.find('span');
	                        for (var spanIndex = 0; spanIndex < actionSpans.length; spanIndex++) {
	                            var actionSpan = actionSpans.eq(spanIndex);
	                            if (actionSpan.hasClass('ms-Button-label') || actionSpan.hasClass('ms-Button-icon')) {
	                                actionSpan.addClass('ms-Callout-actionText');
	                            }
	                        }
	                    }
	                }
	            });
	        }
	    };
	    return CalloutActionsDirective;
	}());
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
	            if (angular.isUndefined(calloutTypeEnum_1.CalloutType[calloutType])) {
	                calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
	                    calloutType + '" is not a valid value for uifType. It should be oobe or peek');
	            }
	        });
	        if (!attrs.uifArrow) {
	            scope.arrowDirection = 'Left';
	        }
	        attrs.$observe('uifArrow', function (attrArrowDirection) {
	            if (angular.isUndefined(calloutArrowEnum_1.CalloutArrow[attrArrowDirection])) {
	                calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
	                    attrArrowDirection + '" is not a valid value for uifArrow. It should be left, right, top, bottom.');
	                return;
	            }
	            var capitalizedDirection = (attrArrowDirection.charAt(0)).toUpperCase();
	            capitalizedDirection += (attrArrowDirection.slice(1)).toLowerCase();
	            scope.arrowDirection = capitalizedDirection;
	        });
	        scope.hasSeparator = (!angular.isUndefined(attrs.uifActionText) || !angular.isUndefined(attrs.uifSeparator));
	        if (!angular.isUndefined(attrs.uifClose)) {
	            scope.closeButton = true;
	            var closeButtonElement = angular.element('<button class="ms-Callout-close" type="button">' +
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
	}());
	exports.CalloutDirective = CalloutDirective;
	exports.module = angular.module('officeuifabric.components.callout', ['officeuifabric.components'])
	    .directive('uifCallout', CalloutDirective.factory())
	    .directive('uifCalloutHeader', CalloutHeaderDirective.factory())
	    .directive('uifCalloutContent', CalloutContentDirective.factory())
	    .directive('uifCalloutActions', CalloutActionsDirective.factory());


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	(function (CalloutType) {
	    CalloutType[CalloutType["oobe"] = 0] = "oobe";
	    CalloutType[CalloutType["peek"] = 1] = "peek";
	})(exports.CalloutType || (exports.CalloutType = {}));
	var CalloutType = exports.CalloutType;


/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var choicefieldTypeEnum_1 = __webpack_require__(12);
	var ChoicefieldOptionController = (function () {
	    function ChoicefieldOptionController($log) {
	        this.$log = $log;
	    }
	    ChoicefieldOptionController.$inject = ['$log'];
	    return ChoicefieldOptionController;
	}());
	exports.ChoicefieldOptionController = ChoicefieldOptionController;
	var ChoicefieldOptionDirective = (function () {
	    function ChoicefieldOptionDirective() {
	        this.template = '<div class="ms-ChoiceField">' +
	            '<input id="{{::$id}}" class="ms-ChoiceField-input" type="{{uifType}}" value="{{value}}" ng-disabled="disabled"  ' +
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
	            var render_1 = function () {
	                var checked = (choicefieldGroupController.getViewValue() === attrs.value);
	                instanceElement.find('input').prop('checked', checked);
	            };
	            choicefieldGroupController.addRender(render_1);
	            attrs.$observe('value', render_1);
	            instanceElement
	                .on('$destroy', function () {
	                choicefieldGroupController.removeRender(render_1);
	            });
	        }
	        var parentScope = scope.$parent.$parent;
	        var checkDisabled = function () {
	            scope.disabled = 'disabled' in attrs && attrs.disabled;
	            scope.disabled = scope.disabled || (parentScope != null && parentScope.disabled);
	        };
	        scope.$watch(function () { return instanceElement.attr('disabled'); }, (function (newValue) {
	            checkDisabled();
	        }));
	        scope.$watch(function () { return parentScope == null ? '' : parentScope.disabled; }, (function (newValue) { checkDisabled(); }));
	        checkDisabled();
	        instanceElement
	            .on('click', function (ev) {
	            if (scope.disabled) {
	                return;
	            }
	            if (choicefieldGroupController != null) {
	                choicefieldGroupController.setTouched();
	            }
	            scope.$apply(function () {
	                if (choicefieldGroupController != null) {
	                    choicefieldGroupController.setViewValue(attrs.value, ev);
	                }
	            });
	        });
	    };
	    return ChoicefieldOptionDirective;
	}());
	exports.ChoicefieldOptionDirective = ChoicefieldOptionDirective;
	var ChoicefieldGroupTitleDirective = (function () {
	    function ChoicefieldGroupTitleDirective() {
	        this.template = '<div class="ms-ChoiceFieldGroup-title"><ng-transclude /></div>';
	        this.transclude = true;
	    }
	    ChoicefieldGroupTitleDirective.factory = function () {
	        var directive = function () { return new ChoicefieldGroupTitleDirective(); };
	        return directive;
	    };
	    return ChoicefieldGroupTitleDirective;
	}());
	exports.ChoicefieldGroupTitleDirective = ChoicefieldGroupTitleDirective;
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
	        if (this.getViewValue() !== value) {
	            this.$scope.ngModel.$setDirty();
	        }
	        this.$scope.ngModel.$setViewValue(value, eventType);
	        this.render();
	    };
	    ChoicefieldGroupController.prototype.setTouched = function () {
	        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
	            this.$scope.ngModel.$setTouched();
	        }
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
	}());
	exports.ChoicefieldGroupController = ChoicefieldGroupController;
	var ChoicefieldGroupDirective = (function () {
	    function ChoicefieldGroupDirective() {
	        this.template = '<div class="ms-ChoiceFieldGroup">' +
	            '<ng-transclude />' +
	            '</div>';
	        this.restrict = 'E';
	        this.transclude = true;
	        this.require = ['uifChoicefieldGroup', '?ngModel'];
	        this.controller = ChoicefieldGroupController;
	        this.scope = {};
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
	        scope.$watch(function () { return instanceElement.attr('disabled'); }, (function (newValue) { scope.disabled = typeof newValue !== 'undefined'; }));
	        scope.disabled = 'disabled' in instanceAttributes;
	    };
	    return ChoicefieldGroupDirective;
	}());
	exports.ChoicefieldGroupDirective = ChoicefieldGroupDirective;
	exports.module = angular.module('officeuifabric.components.choicefield', [
	    'officeuifabric.components'
	])
	    .directive('uifChoicefieldOption', ChoicefieldOptionDirective.factory())
	    .directive('uifChoicefieldGroup', ChoicefieldGroupDirective.factory())
	    .directive('uifChoicefieldGroupTitle', ChoicefieldGroupTitleDirective.factory());


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	(function (ChoicefieldType) {
	    ChoicefieldType[ChoicefieldType["radio"] = 0] = "radio";
	    ChoicefieldType[ChoicefieldType["checkbox"] = 1] = "checkbox";
	})(exports.ChoicefieldType || (exports.ChoicefieldType = {}));
	var ChoicefieldType = exports.ChoicefieldType;
	;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var CommandBarDirective = (function () {
	    function CommandBarDirective() {
	        this.restrict = 'E';
	        this.template = '<div class="ms-CommandBar" ng-transclude></div>';
	        this.transclude = true;
	        this.replace = true;
	        this.scope = {
	            placeholder: '@',
	            uifSearchTerm: '='
	        };
	    }
	    CommandBarDirective.factory = function () {
	        var directive = function () { return new CommandBarDirective(); };
	        return directive;
	    };
	    CommandBarDirective.prototype.link = function (scope, elem, attrs) {
	        {
	            scope.focusSearchInput = function () {
	                scope.isSearchActive = true;
	                angular.element(elem[0].querySelector('.ms-CommandBarSearch-input'))[0].focus();
	            };
	            scope.clearSearchTerm = function () {
	                scope.uifSearchTerm = null;
	                scope.isSearchActive = false;
	            };
	        }
	    };
	    ;
	    return CommandBarDirective;
	}());
	exports.CommandBarDirective = CommandBarDirective;
	var CommandBarSearchDirective = (function () {
	    function CommandBarSearchDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.transclude = true;
	        this.template = "<div class=\"ms-CommandBarSearch\" ng-class=\"$parent.isSearchActive == true ? 'is-active' : '';\">\n                             <input class=\"ms-CommandBarSearch-input\"\n                                    type=\"text\"\n                                    placeholder=\"{{$parent.placeholder}}\"\n                                    tabindex=\"1\"\n                                    ng-focus=\"$parent.isSearchActive = true;\"\n                                    ng-blur=\"$parent.isSearchActive = false;\"\n                                    ng-model=\"$parent.uifSearchTerm\">\n                             <div class=\"ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconSearchWrapper\"\n                                  ng-click=\"$parent.focusSearchInput()\">\n                                  <uif-icon uif-type=\"search\" />\n                              </div>\n                             <div class=\"ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconClearWrapper ms-font-s\"\n                                  ng-mousedown=\"$parent.clearSearchTerm()\">\n                                  <uif-icon uif-type=\"x\"/>\n                              </div>\n                            </div>";
	    }
	    CommandBarSearchDirective.factory = function () {
	        var directive = function () { return new CommandBarSearchDirective(); };
	        return directive;
	    };
	    return CommandBarSearchDirective;
	}());
	exports.CommandBarSearchDirective = CommandBarSearchDirective;
	var CommandBarSideDirective = (function () {
	    function CommandBarSideDirective() {
	        this.restrict = 'E';
	        this.template = '<div class="ms-CommandBar-sideCommands" ng-transclude></div>';
	        this.replace = true;
	        this.transclude = true;
	    }
	    CommandBarSideDirective.factory = function () {
	        var directive = function () { return new CommandBarSideDirective(); };
	        return directive;
	    };
	    return CommandBarSideDirective;
	}());
	exports.CommandBarSideDirective = CommandBarSideDirective;
	var CommandBarMainDirective = (function () {
	    function CommandBarMainDirective($timeout) {
	        this.$timeout = $timeout;
	        this.restrict = 'E';
	        this.template = "<div class=\"ms-CommandBar-mainArea\">\n                              <ng-transclude></ng-transclude>\n                              <div ng-if=\"uifShowOverflow\"\n                                class=\"ms-CommandBarItem ms-CommandBarItem--iconOnly ms-CommandBarItem-overflow\"\n                                ng-class=\"overflowVisible == true ? 'is-visible' : '';\">\n                                  <div class=\"ms-CommandBarItem-linkWrapper\"\n                                    ng-click=\"openOverflowMenu()\">\n                                    <a class=\"ms-CommandBarItem-link\" tabindex=\"2\">\n                                      <uif-icon uif-type=\"ellipsis\" />\n                                      </a>\n                                    </div>\n                                  </div>\n                                </div>";
	        this.replace = true;
	        this.transclude = true;
	        this.controller = CommandBarMainController;
	        this.scope = {
	            uifShowOverflow: '='
	        };
	    }
	    CommandBarMainDirective.factory = function () {
	        var directive = function ($timeout) { return new CommandBarMainDirective($timeout); };
	        directive.$inject = ['$timeout'];
	        return directive;
	    };
	    CommandBarMainDirective.prototype.compile = function (element, attrs, transclude) {
	        return {
	            post: this.postLink
	        };
	    };
	    CommandBarMainDirective.prototype.postLink = function (scope, elem, attrs, ctrl) {
	        scope.openOverflowMenu = function () {
	            scope.overflowMenuOpen = !scope.overflowMenuOpen;
	            var contextualMenu;
	            contextualMenu = " <uif-contextual-menu class=\"ms-CommandBar-overflowMenu\"\n              uif-is-open=\"overflowMenuOpen\"\n              uif-close-on-click=\"false\">";
	            angular.element(elem[0].querySelector('.ms-CommandBarItem-overflow .ms-CommandBarItem-linkWrapper ul')).remove();
	            angular.forEach(scope.hiddenItems, function (menuitem) {
	                if (menuitem.submenu) {
	                    contextualMenu += "<uif-contextual-menu-item ng-model=\"hiddenItems[" + menuitem.i + "]\"\n                                        ng-click='openOverflowItem(hiddenItems[" + menuitem.i + "])'\n                                        uif-text='hiddenItems[" + menuitem.i + "].text'\n                                        ng-show='hiddenItems[" + menuitem.i + "].visible'\n                                        uif-type=\"subMenu\">\n                                          <uif-contextual-menu>\n                                              <uif-contextual-menu-item\n                                               ng-click='openOverflowItem(subitem)'\n                                               uif-text='subitem.text'\n                                               uif-type=\"link\"\n                                               ng-repeat=\"subitem in hiddenItems[" + menuitem.i + "].submenuitems track by $index\"/>\n                                          </uif-contextual-menu>\n                                      </uif-contextual-menu-item>";
	                }
	                else {
	                    contextualMenu += "<uif-contextual-menu-item ng-model=\"hiddenItems[" + menuitem.i + "]\"\n                                        ng-click='openOverflowItem(hiddenItems[" + menuitem.i + "])'\n                                        uif-text='hiddenItems[" + menuitem.i + "].text'\n                                        ng-show='hiddenItems[" + menuitem.i + "].visible'\n                                        uif-type=\"link\">\n                                      </uif-contextual-menu-item>";
	                }
	            });
	            contextualMenu += '</<uif-contextual-menu>';
	            var menu;
	            menu = elem[0].querySelector('.ms-CommandBarItem-overflow .ms-CommandBarItem-linkWrapper');
	            angular.element(menu).append(ctrl.$compile(contextualMenu)(scope));
	        };
	        scope.loadMenuItems = function (commandItems) {
	            var commandItemWidth = 0;
	            var commandItemIndex = 0;
	            scope.commandItems = [];
	            angular.forEach(commandItems, function (element) {
	                if (angular.element(element).hasClass('ms-CommandBarItem-overflow') !== true) {
	                    commandItemWidth += element.offsetWidth;
	                    scope.commandItems.push({ index: commandItemIndex, offset: commandItemWidth });
	                    commandItemIndex++;
	                }
	            });
	        };
	        scope.openOverflowItem = function (item) {
	            if (item.submenu) {
	                item.submenuitems = [];
	                angular.forEach(item.submenu.children, function (element) {
	                    var submenuitem;
	                    submenuitem = {};
	                    submenuitem.text = element.innerText;
	                    submenuitem.menuType = 'item';
	                    submenuitem.childitem = true;
	                    submenuitem.i = item.submenuitems.length;
	                    submenuitem.parent = item.i;
	                    item.submenuitems.push(submenuitem);
	                });
	            }
	            else {
	                ctrl.$timeout(function () {
	                    if (item.childitem === true) {
	                        var m = void 0;
	                        m = elem[0].querySelectorAll('.ms-CommandBarItem')[item.parent].querySelectorAll('.ms-ContextualMenu-item')[item.i];
	                        angular.element(m).triggerHandler('click');
	                    }
	                    else {
	                        angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')[item.i]).triggerHandler('click');
	                    }
	                }, 1);
	            }
	        };
	        scope.toggleItemVisibility = function () {
	            var commandBarItems;
	            commandBarItems = angular.element(elem[0].querySelectorAll('.ms-CommandBar-mainArea .ms-CommandBarItem'));
	            if (window.innerWidth < 640 && scope.mobileSwitch === false) {
	                scope.loadMenuItems(commandBarItems);
	                scope.mobileSwitch = true;
	            }
	            else if (window.innerWidth >= 640 && scope.mobileSwitch === true) {
	                scope.loadMenuItems(commandBarItems);
	                scope.mobileSwitch = false;
	            }
	            angular.forEach(scope.commandItems, function (element) {
	                if (element.offset >= elem.prop('offsetWidth') - 200) {
	                    angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')[element.index]).addClass('is-hidden');
	                    scope.hiddenItems[element.index].visible = true;
	                    scope.overflowVisible = true;
	                }
	                else {
	                    angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')[element.index]).removeClass('is-hidden');
	                    scope.hiddenItems[element.index].visible = false;
	                    scope.overflowVisible = false;
	                }
	            });
	            ctrl.$timeout(function () {
	                scope.$apply();
	            }, 1);
	        };
	        scope.$on('uif-command-bar-resize', function () {
	            scope.overflowMenuOpen = false;
	            scope.toggleItemVisibility();
	        });
	        angular.element(window).bind('resize', function () {
	            scope.$broadcast('uif-command-bar-resize');
	        });
	        angular.element(document).ready(function () {
	            scope.loadMenuItems(angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')));
	            scope.toggleItemVisibility();
	        });
	    };
	    ;
	    return CommandBarMainDirective;
	}());
	exports.CommandBarMainDirective = CommandBarMainDirective;
	var CommandBarMainController = (function () {
	    function CommandBarMainController($scope, $element, $compile, $timeout) {
	        this.$scope = $scope;
	        this.$element = $element;
	        this.$compile = $compile;
	        this.$timeout = $timeout;
	    }
	    CommandBarMainController.prototype.addOverflowItem = function (item) {
	        if (this.$scope.hiddenItems == null) {
	            this.$scope.hiddenItems = [];
	        }
	        item.i = this.$scope.hiddenItems.length;
	        this.$scope.hiddenItems.push(item);
	    };
	    CommandBarMainController.$inject = ['$scope', '$element', '$compile', '$timeout'];
	    return CommandBarMainController;
	}());
	exports.CommandBarMainController = CommandBarMainController;
	var CommandBarItemDirective = (function () {
	    function CommandBarItemDirective() {
	        this.restrict = 'E';
	        this.template = '<div class="ms-CommandBarItem">' +
	            '<div class="ms-CommandBarItem-linkWrapper">' +
	            ' <a class="ms-CommandBarItem-link">' +
	            ' </a>' +
	            '</div>' +
	            '</div>';
	        this.transclude = true;
	        this.replace = true;
	        this.controller = CommandBarMainController;
	        this.require = '^?uifCommandBarMain';
	    }
	    CommandBarItemDirective.factory = function () {
	        var directive = function () { return new CommandBarItemDirective(); };
	        return directive;
	    };
	    CommandBarItemDirective.prototype.compile = function (element, attrs, transclude) {
	        return {
	            post: this.postLink
	        };
	    };
	    CommandBarItemDirective.prototype.postLink = function (scope, elem, attrs, ctrl, transclude) {
	        transclude(function (clone) {
	            var hiddenItem;
	            hiddenItem = {};
	            for (var i = 0; i < clone.length; i++) {
	                if (clone[i].tagName === 'UIF-ICON') {
	                    angular.element(elem[0].querySelector('a.ms-CommandBarItem-link')).append(clone[i]);
	                }
	                if (clone[i].tagName === 'SPAN') {
	                    if (!clone[i].classList.contains('ms-CommandBarItem-commandText')) {
	                        clone[i].classList.add('ms-CommandBarItem-commandText');
	                    }
	                    if (clone[i].className.indexOf('ms-font-') === -1) {
	                        clone[i].classList.add('ms-font-m');
	                    }
	                    angular.element(elem[0].querySelector('a.ms-CommandBarItem-link')).append(clone[i]);
	                    hiddenItem.text = clone[i].innerText;
	                }
	                if (clone[i].tagName === 'UL' && clone[i].classList.contains('ms-ContextualMenu')) {
	                    angular.element(elem).append(clone[i]);
	                    hiddenItem.submenu = clone[i];
	                }
	            }
	            if (ctrl !== null) {
	                if (hiddenItem.submenu == null) {
	                    hiddenItem.menuType = 'link';
	                }
	                else {
	                    hiddenItem.menuType = 'subMenu';
	                }
	                ctrl.addOverflowItem(hiddenItem);
	            }
	        });
	        if (angular.element(elem[0].querySelector('.ms-CommandBarItem-link > uif-icon')).length === 0) {
	            angular.element(elem[0].querySelector('.ms-CommandBarItem')).addClass('ms-CommandBarItem-hasTextOnly');
	        }
	    };
	    return CommandBarItemDirective;
	}());
	exports.CommandBarItemDirective = CommandBarItemDirective;
	exports.module = angular.module('officeuifabric.components.commandbar', [
	    'officeuifabric.components'
	])
	    .directive('uifCommandBar', CommandBarDirective.factory())
	    .directive('uifCommandBarSearch', CommandBarSearchDirective.factory())
	    .directive('uifCommandBarItem', CommandBarItemDirective.factory())
	    .directive('uifCommandBarMain', CommandBarMainDirective.factory())
	    .directive('uifCommandBarSide', CommandBarSideDirective.factory());


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var ContentDirective = (function () {
	    function ContentDirective() {
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.scope = true;
	        this.template = "<span class=\"uif-content\" ng-transclude></span>";
	    }
	    ContentDirective.factory = function () {
	        var directive = function () { return new ContentDirective(); };
	        return directive;
	    };
	    ContentDirective.directiveName = 'uifContent';
	    return ContentDirective;
	}());
	exports.ContentDirective = ContentDirective;
	exports.module = angular.module('officeuifabric.components.content', [
	    'officeuifabric.components'])
	    .directive(ContentDirective.directiveName, ContentDirective.factory());


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var MenuItemTypes;
	(function (MenuItemTypes) {
	    MenuItemTypes[MenuItemTypes["link"] = 0] = "link";
	    MenuItemTypes[MenuItemTypes["divider"] = 1] = "divider";
	    MenuItemTypes[MenuItemTypes["header"] = 2] = "header";
	    MenuItemTypes[MenuItemTypes["subMenu"] = 3] = "subMenu";
	})(MenuItemTypes || (MenuItemTypes = {}));
	var ContextualMenuItemDirective = (function () {
	    function ContextualMenuItemDirective($log) {
	        var _this = this;
	        this.$log = $log;
	        this.restrict = 'E';
	        this.require = '^uifContextualMenu';
	        this.transclude = true;
	        this.controller = ContextualMenuItemController;
	        this.replace = true;
	        this.scope = {
	            isSelected: '=?uifIsSelected',
	            onClick: '&ngClick',
	            text: '=?uifText',
	            type: '@uifType'
	        };
	        this.templateTypes = {};
	        this.template = function ($element, $attrs) {
	            var type = $attrs.uifType;
	            if (angular.isUndefined(type)) {
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
	        this.link = function ($scope, $element, $attrs, contextualMenuController, $transclude) {
	            if (typeof $scope.isSelected !== 'boolean' && $scope.isSelected !== undefined) {
	                contextualMenuController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - ' +
	                    'invalid attribute type: \'uif-is-selected\'.\n' +
	                    'The type \'' + typeof $scope.isSelected + '\' is not supported as valid type for \'uif-is-selected\' attribute for ' +
	                    '<uif-contextual-menu-item />. The valid type is boolean.');
	            }
	            $attrs.$observe('disabled', function (disabled) {
	                $scope.isDisabled = !!disabled;
	            });
	            _this.transcludeChilds($scope, $element, $transclude);
	            $scope.selectItem = function ($event) {
	                if (!contextualMenuController.isMultiSelectionMenu()) {
	                    contextualMenuController.deselectItems();
	                }
	                if (angular.isUndefined($scope.isSelected) && !$scope.isDisabled) {
	                    $scope.isSelected = true;
	                }
	                else {
	                    $scope.isSelected = !$scope.isSelected;
	                }
	                if (!$scope.hasChildMenu) {
	                    contextualMenuController.closeSubMenus(null, true);
	                    if (!contextualMenuController.isRootMenu()) {
	                        contextualMenuController.deselectItems(true);
	                    }
	                }
	                else {
	                    contextualMenuController.closeSubMenus($scope.$id);
	                }
	                if ($scope.hasChildMenu) {
	                    $scope.childMenuCtrl.openMenu();
	                }
	                if (!angular.isUndefined($scope.onClick)) {
	                    $scope.onClick();
	                }
	                $event.stopPropagation();
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
	        this.templateTypes[MenuItemTypes.subMenu] =
	            "<li class=\"ms-ContextualMenu-item\">\n          <a class=\"ms-ContextualMenu-link ms-ContextualMenu-link--hasMenu\"\n          ng-class=\"{'is-selected': isSelected, 'is-disabled': isDisabled}\" ng-click=\"selectItem($event)\" href>\n            <span class='uif-item-content'></span></a>\n          <i class=\"ms-ContextualMenu-subMenuIcon ms-Icon ms-Icon--chevronRight\"></i>\n          <div class=\"uif-context-submenu\"></div>\n       </li>";
	        this.templateTypes[MenuItemTypes.link] =
	            "<li class=\"ms-ContextualMenu-item\">\n            <a class=\"ms-ContextualMenu-link\" ng-class=\"{'is-selected': isSelected, 'is-disabled': isDisabled}\"\n            ng-click=\"selectItem($event)\" href><span class='uif-item-content'></span></a>\n        </li>";
	        this.templateTypes[MenuItemTypes.header] = "\n    <li class=\"ms-ContextualMenu-item ms-ContextualMenu-item--header\">\n      <span class='uif-item-content'></span>\n    </li>";
	        this.templateTypes[MenuItemTypes.divider] = "<li class=\"ms-ContextualMenu-item ms-ContextualMenu-item--divider\"></li>";
	    }
	    ContextualMenuItemDirective.factory = function () {
	        var directive = function ($log) { return new ContextualMenuItemDirective($log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    ContextualMenuItemDirective.prototype.transcludeChilds = function ($scope, $element, $transclude) {
	        var _this = this;
	        $transclude(function (clone) {
	            var hasContent = _this.hasItemContent(clone);
	            if (!hasContent && !$scope.text && !$scope.hasChildMenu && $scope.type !== 'divider') {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - ' +
	                    'you need to provide a text for a contextual menu item.\n' +
	                    'For <uif-contextual-menu-item> you need to specify either \'uif-text\' as attribute or <uif-content> as a child directive');
	            }
	            _this.insertItemContent(clone, $scope, $element);
	            _this.insertSubMenu(clone, $scope, $element);
	        });
	    };
	    ContextualMenuItemDirective.prototype.insertItemContent = function (clone, $scope, $element) {
	        var elementToReplace = angular.element($element[0].querySelector('.uif-item-content'));
	        if (this.hasItemContent(clone)) {
	            for (var i = 0; i < clone.length; i++) {
	                var element = angular.element(clone[i]);
	                if (element.hasClass('uif-content')) {
	                    elementToReplace.replaceWith(element);
	                    break;
	                }
	            }
	        }
	        else {
	            elementToReplace.replaceWith(angular.element('<span>' + $scope.text + '</span>'));
	        }
	    };
	    ContextualMenuItemDirective.prototype.insertSubMenu = function (clone, $scope, $element) {
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass('ms-ContextualMenu')) {
	                angular.element($element[0].querySelector('.uif-context-submenu')).replaceWith(element);
	            }
	        }
	    };
	    ContextualMenuItemDirective.prototype.hasItemContent = function (clone) {
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass('uif-content')) {
	                return true;
	            }
	        }
	        return false;
	    };
	    ContextualMenuItemDirective.directiveName = 'uifContextualMenuItem';
	    return ContextualMenuItemDirective;
	}());
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
	}());
	exports.ContextualMenuItemController = ContextualMenuItemController;
	var ContextualMenuDirective = (function () {
	    function ContextualMenuDirective() {
	        this.restrict = 'E';
	        this.require = ContextualMenuDirective.directiveName;
	        this.transclude = true;
	        this.template = "<ul class=\"ms-ContextualMenu\" ng-transclude></ul>";
	        this.replace = true;
	        this.controller = ContextualMenuController;
	        this.scope = {
	            closeOnClick: '@uifCloseOnClick',
	            isOpen: '=?uifIsOpen',
	            multiselect: '@uifMultiselect'
	        };
	    }
	    ContextualMenuDirective.factory = function () {
	        var directive = function () { return new ContextualMenuDirective(); };
	        return directive;
	    };
	    ContextualMenuDirective.prototype.link = function ($scope, $element, $attrs, contextualMenuController) {
	        var setCloseOnClick = function (value) {
	            if (angular.isUndefined(value)) {
	                $scope.closeOnClick = true;
	            }
	            else {
	                $scope.closeOnClick = value.toString().toLowerCase() === 'true';
	            }
	        };
	        setCloseOnClick($scope.closeOnClick);
	        $attrs.$observe('uifCloseOnClick', setCloseOnClick);
	        var parentMenuItemCtrl = $element.controller(ContextualMenuItemDirective.directiveName);
	        if (!angular.isUndefined(parentMenuItemCtrl)) {
	            parentMenuItemCtrl.setChildMenu(contextualMenuController);
	        }
	        if (!angular.isUndefined($scope.multiselect) && $scope.multiselect.toLowerCase() === 'true') {
	            $element.addClass('ms-ContextualMenu--multiselect');
	        }
	    };
	    ContextualMenuDirective.directiveName = 'uifContextualMenu';
	    return ContextualMenuDirective;
	}());
	exports.ContextualMenuDirective = ContextualMenuDirective;
	var ContextualMenuController = (function () {
	    function ContextualMenuController($scope, $animate, $element, $log) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$animate = $animate;
	        this.$element = $element;
	        this.$log = $log;
	        this.onRootMenuClosed = [];
	        this.isOpenClassName = 'is-open';
	        if (angular.isUndefined($element.controller(ContextualMenuItemDirective.directiveName))) {
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
	        this.onRootMenuClosed.push(function () {
	            _this.closeMenu();
	            _this.deselectItems(true);
	        });
	        $scope.$on('uif-menu-close', function () {
	            if ($scope.isRootMenu && $scope.closeOnClick) {
	                _this.onRootMenuClosed.forEach(function (callback) {
	                    callback();
	                });
	            }
	        });
	    }
	    ContextualMenuController.prototype.deselectItems = function (deselectParentMenus) {
	        this.$scope.$broadcast('uif-menu-deselect');
	        if (deselectParentMenus) {
	            this.$scope.$emit('uif-menu-deselect');
	        }
	    };
	    ContextualMenuController.prototype.closeSubMenus = function (menuItemToSkip, closeRootMenu) {
	        this.$scope.$broadcast('uif-menu-close', menuItemToSkip);
	        if (closeRootMenu) {
	            this.$scope.$emit('uif-menu-close');
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
	        if (angular.isUndefined(this.$scope.multiselect)) {
	            return false;
	        }
	        return this.$scope.multiselect.toLowerCase() === 'true';
	    };
	    ContextualMenuController.prototype.isMenuOpened = function () {
	        return this.$element.hasClass('is-open');
	    };
	    ContextualMenuController.$inject = ['$scope', '$animate', '$element', '$log'];
	    return ContextualMenuController;
	}());
	exports.ContextualMenuController = ContextualMenuController;
	exports.module = angular.module('officeuifabric.components.contextualmenu', [
	    'officeuifabric.components'])
	    .directive(ContextualMenuDirective.directiveName, ContextualMenuDirective.factory())
	    .directive(ContextualMenuItemDirective.directiveName, ContextualMenuItemDirective.factory());


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var DatepickerController = (function () {
	    function DatepickerController($element, $scope) {
	        this.$scope = $scope;
	        this.isPickingYears = false;
	        this.isPickingMonths = false;
	        this.displayDateFormat = 'd mmmm, yyyy';
	        this.jElement = $($element[0]);
	        this.displayDateFormat = $scope.uifDateFormat;
	        $scope.ctrl = this;
	    }
	    DatepickerController.prototype.range = function (min, max, step) {
	        step = step || 1;
	        var input = [];
	        for (var i = min; i <= max; i += step) {
	            input.push(i);
	        }
	        return input;
	    };
	    DatepickerController.prototype.getPicker = function () {
	        return this.jElement.find('.ms-TextField-field').pickadate('picker');
	    };
	    DatepickerController.prototype.setValue = function (value) {
	        this.getPicker().set('select', value);
	        this.changeHighlightedDate(value.getFullYear(), value.getMonth(), value.getDate());
	    };
	    DatepickerController.prototype.initDatepicker = function (ngModel) {
	        var self = this;
	        this.jElement.find('.ms-TextField-field').pickadate({
	            clear: '',
	            close: '',
	            format: self.displayDateFormat,
	            klass: {
	                active: 'ms-DatePicker-input--active',
	                box: 'ms-DatePicker-dayPicker',
	                day: 'ms-DatePicker-day',
	                disabled: 'ms-DatePicker-day--disabled',
	                focused: 'ms-DatePicker-picker--focused',
	                frame: 'ms-DatePicker-frame',
	                header: 'ms-DatePicker-header',
	                holder: 'ms-DatePicker-holder',
	                infocus: 'ms-DatePicker-day--infocus',
	                input: 'ms-DatePicker-input',
	                month: 'ms-DatePicker-month',
	                now: 'ms-DatePicker-day--today',
	                opened: 'ms-DatePicker-picker--opened',
	                outfocus: 'ms-DatePicker-day--outfocus',
	                picker: 'ms-DatePicker-picker',
	                selected: 'ms-DatePicker-day--selected',
	                table: 'ms-DatePicker-table',
	                weekdays: 'ms-DatePicker-weekday',
	                wrap: 'ms-DatePicker-wrap',
	                year: 'ms-DatePicker-year'
	            },
	            onStart: function () {
	                self.initCustomView();
	            },
	            today: '',
	            weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	        });
	        var picker = this.getPicker();
	        picker.on({
	            open: function () {
	                self.scrollUp();
	                if (angular.isDefined(ngModel) && ngModel !== null) {
	                    ngModel.$setTouched();
	                }
	                self.$scope.$apply();
	            },
	            set: function (value) {
	                var formattedValue = picker.get('select', 'yyyy-mm-dd');
	                if (angular.isDefined(ngModel) && ngModel !== null) {
	                    ngModel.$setViewValue(formattedValue);
	                }
	            }
	        });
	    };
	    DatepickerController.prototype.initCustomView = function () {
	        var $monthControls = this.jElement.find('.ms-DatePicker-monthComponents');
	        var $goToday = this.jElement.find('.ms-DatePicker-goToday');
	        var $monthPicker = this.jElement.find('.ms-DatePicker-monthPicker');
	        var $yearPicker = this.jElement.find('.ms-DatePicker-yearPicker');
	        var $pickerWrapper = this.jElement.find('.ms-DatePicker-wrap');
	        var $picker = this.getPicker();
	        var self = this;
	        $monthControls.appendTo($pickerWrapper);
	        $goToday.appendTo($pickerWrapper);
	        $monthPicker.appendTo($pickerWrapper);
	        $yearPicker.appendTo($pickerWrapper);
	        $monthControls.on('click', '.js-prevMonth', function (event) {
	            event.preventDefault();
	            var newMonth = $picker.get('highlight').month - 1;
	            self.changeHighlightedDate(null, newMonth, null);
	            self.$scope.$apply();
	        });
	        $monthControls.on('click', '.js-nextMonth', function (event) {
	            event.preventDefault();
	            var newMonth = $picker.get('highlight').month + 1;
	            self.changeHighlightedDate(null, newMonth, null);
	            self.$scope.$apply();
	        });
	        $monthPicker.on('click', '.js-prevYear', function (event) {
	            event.preventDefault();
	            var newYear = $picker.get('highlight').year - 1;
	            self.changeHighlightedDate(newYear, null, null);
	            self.$scope.$apply();
	        });
	        $monthPicker.on('click', '.js-nextYear', function (event) {
	            event.preventDefault();
	            var newYear = $picker.get('highlight').year + 1;
	            self.changeHighlightedDate(newYear, null, null);
	            self.$scope.$apply();
	        });
	        $yearPicker.on('click', '.js-prevDecade', function (event) {
	            event.preventDefault();
	            var newYear = $picker.get('highlight').year - 10;
	            self.changeHighlightedDate(newYear, null, null);
	            self.$scope.$apply();
	        });
	        $yearPicker.on('click', '.js-nextDecade', function (event) {
	            event.preventDefault();
	            var newYear = $picker.get('highlight').year + 10;
	            self.changeHighlightedDate(newYear, null, null);
	            self.$scope.$apply();
	        });
	        $goToday.on('click', function (event) {
	            event.preventDefault();
	            var now = new Date();
	            $picker.set('select', now);
	            self.jElement.removeClass('is-pickingMonths').removeClass('is-pickingYears');
	            self.$scope.$apply();
	        });
	        $monthPicker.on('click', '.js-changeDate', function (event) {
	            event.preventDefault();
	            var currentDate = $picker.get('highlight');
	            var newYear = currentDate.year;
	            var newMonth = +$(this).attr('data-month');
	            var newDay = currentDate.day;
	            self.changeHighlightedDate(newYear, newMonth, newDay);
	            if (self.jElement.hasClass('is-pickingMonths')) {
	                self.jElement.removeClass('is-pickingMonths');
	            }
	            self.$scope.$apply();
	        });
	        $yearPicker.on('click', '.js-changeDate', function (event) {
	            event.preventDefault();
	            var currentDate = $picker.get('highlight');
	            var newYear = +$(this).attr('data-year');
	            var newMonth = currentDate.month;
	            var newDay = currentDate.day;
	            self.changeHighlightedDate(newYear, newMonth, newDay);
	            if (self.jElement.hasClass('is-pickingYears')) {
	                self.jElement.removeClass('is-pickingYears');
	            }
	            self.$scope.$apply();
	        });
	        $monthControls.on('click', '.js-showMonthPicker', function (event) {
	            self.isPickingMonths = !self.isPickingMonths;
	            self.$scope.$apply();
	        });
	        $monthPicker.on('click', '.js-showYearPicker', function (event) {
	            self.isPickingYears = !self.isPickingYears;
	            self.$scope.$apply();
	        });
	        self.$scope.highlightedValue = $picker.get('highlight');
	    };
	    DatepickerController.prototype.scrollUp = function () {
	        $('html, body').animate({ scrollTop: this.jElement.offset().top }, 367);
	    };
	    DatepickerController.prototype.changeHighlightedDate = function (newYear, newMonth, newDay) {
	        var picker = this.getPicker();
	        if (newYear == null) {
	            newYear = picker.get('highlight').year;
	        }
	        if (newMonth == null) {
	            newMonth = picker.get('highlight').month;
	        }
	        if (newDay == null) {
	            newDay = picker.get('highlight').date;
	        }
	        picker.set('highlight', [newYear, newMonth, newDay]);
	        this.$scope.highlightedValue = picker.get('highlight');
	    };
	    DatepickerController.$inject = ['$element', '$scope'];
	    return DatepickerController;
	}());
	exports.DatepickerController = DatepickerController;
	var DatepickerDirective = (function () {
	    function DatepickerDirective() {
	        this.template = '<div ng-class="{\'ms-DatePicker\': true, \'is-pickingYears\': ctrl.isPickingYears, \'is-pickingMonths\': ctrl.isPickingMonths}">' +
	            '<div class="ms-TextField">' +
	            '<i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>' +
	            '<input class="ms-TextField-field" type="text" placeholder="{{placeholder}}" ng-disabled="isDisabled">' +
	            '</div>' +
	            '<div class="ms-DatePicker-monthComponents">' +
	            '<span class="ms-DatePicker-nextMonth js-nextMonth"><i class="ms-Icon ms-Icon--chevronRight"></i></span>' +
	            '<span class="ms-DatePicker-prevMonth js-prevMonth"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>' +
	            '<div class="ms-DatePicker-headerToggleView js-showMonthPicker"></div>' +
	            '</div>' +
	            '<span class="ms-DatePicker-goToday js-goToday">Go to today</span>' +
	            '<div class="ms-DatePicker-monthPicker">' +
	            '<div class="ms-DatePicker-header">' +
	            '<div class="ms-DatePicker-yearComponents">' +
	            '<span class="ms-DatePicker-nextYear js-nextYear"><i class="ms-Icon ms-Icon--chevronRight"></i></span>' +
	            '<span class="ms-DatePicker-prevYear js-prevYear"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>' +
	            '</div>' +
	            '<div class="ms-DatePicker-currentYear js-showYearPicker">{{highlightedValue.year}}</div>' +
	            '</div>' +
	            '<div class="ms-DatePicker-optionGrid" >' +
	            '<span ng-repeat="month in monthsArray"' +
	            'ng-class="{\'ms-DatePicker-monthOption js-changeDate\': true, ' +
	            '\'is-highlighted\': highlightedValue.month == $index}"' +
	            'data-month="{{$index}}">' +
	            '{{month}}</span>' +
	            '</div>' +
	            '</div>' +
	            '<div class="ms-DatePicker-yearPicker">' +
	            '<div class="ms-DatePicker-decadeComponents">' +
	            '<span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--chevronRight"></i></span>' +
	            '<span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>' +
	            '</div>' +
	            '<div class="ms-DatePicker-currentDecade">{{highlightedValue.year - 10}} - {{highlightedValue.year}}</div>' +
	            '<div class="ms-DatePicker-optionGrid">' +
	            '<span ng-class="{\'ms-DatePicker-yearOption js-changeDate\': true,' +
	            '\'is-highlighted\': highlightedValue.year == year}" ' +
	            'ng-repeat="year in ctrl.range(highlightedValue.year - 10, highlightedValue.year)"' +
	            'data-year="{{year}}">{{year}}</span>' +
	            '</div>' +
	            '</div>' +
	            '</div>';
	        this.controller = DatepickerController;
	        this.restrict = 'E';
	        this.replace = true;
	        this.scope = {
	            placeholder: '@',
	            uifDateFormat: '@',
	            uifMonths: '@'
	        };
	        this.require = ['uifDatepicker', '?ngModel'];
	    }
	    DatepickerDirective.factory = function () {
	        var directive = function () { return new DatepickerDirective(); };
	        return directive;
	    };
	    DatepickerDirective.prototype.compile = function (templateElement, templateAttributes, transclude) {
	        return {
	            post: this.postLink,
	            pre: this.preLink
	        };
	    };
	    DatepickerDirective.prototype.preLink = function ($scope, instanceElement, instanceAttributes, ctrls) {
	        if (!$scope.uifMonths) {
	            $scope.uifMonths = 'Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec';
	        }
	        if (!$scope.placeholder) {
	            $scope.placeholder = 'Select a date';
	        }
	        if (!$scope.uifDateFormat) {
	            $scope.uifDateFormat = 'd mmmm, yyyy';
	        }
	        $scope.monthsArray = $scope.uifMonths.split(',');
	        if ($scope.monthsArray.length !== 12) {
	            throw 'Months setting should have 12 months, separated by a comma';
	        }
	        instanceAttributes.$observe('disabled', function (disabled) {
	            $scope.isDisabled = !!disabled;
	        });
	    };
	    DatepickerDirective.prototype.postLink = function ($scope, $element, attrs, ctrls) {
	        var datepickerController = ctrls[0];
	        var ngModel = ctrls[1];
	        datepickerController.initDatepicker(ngModel);
	        if (angular.isDefined(ngModel) && ngModel !== null) {
	            ngModel.$render = function () {
	                if (ngModel.$modelValue !== null
	                    && ngModel.$modelValue !== ''
	                    && typeof ngModel.$modelValue !== 'undefined') {
	                    if (typeof ngModel.$modelValue === 'string') {
	                        var date = new Date(ngModel.$modelValue);
	                        datepickerController.setValue(date);
	                    }
	                    else {
	                        datepickerController.setValue(ngModel.$modelValue);
	                    }
	                    ngModel.$setPristine();
	                }
	            };
	        }
	    };
	    return DatepickerDirective;
	}());
	exports.DatepickerDirective = DatepickerDirective;
	exports.module = angular.module('officeuifabric.components.datepicker', [
	    'officeuifabric.components'
	])
	    .directive('uifDatepicker', DatepickerDirective.factory());


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var dialogEnums_1 = __webpack_require__(18);
	var DialogController = (function () {
	    function DialogController($log) {
	        this.$log = $log;
	    }
	    DialogController.$inject = ['$log'];
	    return DialogController;
	}());
	exports.DialogController = DialogController;
	var DialogDirective = (function () {
	    function DialogDirective() {
	        this.restrict = 'E';
	        this.controller = DialogController;
	        this.replace = true;
	        this.transclude = true;
	        this.template = '<div class="ms-Dialog"' +
	            'ng-class="{ \'ms-Dialog--close\': uifClose==\'true\'' +
	            ', \'ms-Dialog--lgHeader\': uifType==\'header\'' +
	            ', \'ms-Dialog--multiline\': uifType==\'multiline\' }">' +
	            '<uif-overlay uif-mode="{{uifOverlay}}"></uif-overlay>' +
	            '<div class="ms-Dialog-main" ng-transclude></div>' +
	            '</div>';
	        this.scope = {
	            uifClose: '@',
	            uifOverlay: '@',
	            uifType: '@'
	        };
	    }
	    DialogDirective.factory = function () {
	        var directive = function () { return new DialogDirective(); };
	        return directive;
	    };
	    DialogDirective.prototype.link = function (scope, element, attrs, controller) {
	        scope.$watch('uifType', function (newValue, oldValue) {
	            if (typeof (newValue) !== 'undefined') {
	                if (dialogEnums_1.DialogTypeEnum[newValue] === undefined) {
	                    controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.dialog - Unsupported type:' +
	                        'The type (\'' + scope.uifType + '\') is not supported by the Office UI Fabric.' +
	                        'Supported options are listed here: ' +
	                        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/dialog/dialogEnums.ts');
	                }
	            }
	        });
	    };
	    return DialogDirective;
	}());
	exports.DialogDirective = DialogDirective;
	var DialogHeaderDirective = (function () {
	    function DialogHeaderDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.transclude = true;
	        this.require = '^^uifDialog';
	        this.template = '<div class="ms-Dialog-header">' +
	            '<button ng-if="$parent.uifClose" class="ms-Dialog-button ms-Dialog-button--close">' +
	            '<i class="ms-Icon ms-Icon--x"></i></button>' +
	            '<ng-transclude></ng-transclude></div>';
	    }
	    DialogHeaderDirective.factory = function () {
	        var directive = function () { return new DialogHeaderDirective(); };
	        return directive;
	    };
	    return DialogHeaderDirective;
	}());
	exports.DialogHeaderDirective = DialogHeaderDirective;
	var DialogContentDirective = (function () {
	    function DialogContentDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.transclude = true;
	        this.template = '<div class="ms-Dialog-content" ng-transclude></div>';
	    }
	    DialogContentDirective.factory = function () {
	        var directive = function () { return new DialogContentDirective(); };
	        return directive;
	    };
	    return DialogContentDirective;
	}());
	exports.DialogContentDirective = DialogContentDirective;
	var DialogInnerDirective = (function () {
	    function DialogInnerDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.transclude = true;
	        this.template = '<div class="ms-Dialog-inner" ng-transclude></div>';
	    }
	    DialogInnerDirective.factory = function () {
	        var directive = function () { return new DialogInnerDirective(); };
	        return directive;
	    };
	    return DialogInnerDirective;
	}());
	exports.DialogInnerDirective = DialogInnerDirective;
	var DialogSubtextDirective = (function () {
	    function DialogSubtextDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.transclude = true;
	        this.template = '<p class="ms-Dialog-subText" ng-transclude></p>';
	    }
	    DialogSubtextDirective.factory = function () {
	        var directive = function () { return new DialogSubtextDirective(); };
	        return directive;
	    };
	    return DialogSubtextDirective;
	}());
	exports.DialogSubtextDirective = DialogSubtextDirective;
	var DialogActionsController = (function () {
	    function DialogActionsController($log) {
	        this.$log = $log;
	    }
	    DialogActionsController.$inject = ['$log'];
	    return DialogActionsController;
	}());
	exports.DialogActionsController = DialogActionsController;
	var DialogActionsDirective = (function () {
	    function DialogActionsDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.transclude = true;
	        this.controller = DialogActionsController;
	        this.template = '<div class="ms-Dialog-actions"><div ng-class="{ \'ms-Dialog-actionsRight\': uifPosition==\'right\'}">' +
	            '<ng-transclude></ng-transclude></div></div>';
	        this.scope = {
	            uifPosition: '@'
	        };
	    }
	    DialogActionsDirective.factory = function () {
	        var directive = function () { return new DialogActionsDirective(); };
	        return directive;
	    };
	    DialogActionsDirective.prototype.link = function (scope, element, attrs, controller) {
	        scope.$watch('uifPosition', function (newValue, oldValue) {
	            if (typeof (newValue) !== 'undefined') {
	                if (dialogEnums_1.DialogActionsPositionEnum[newValue] === undefined) {
	                    controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.dialog - Unsupported type:' +
	                        'The type (\'' + scope.uifPosition + '\') is not supported by the Office UI Fabric.' +
	                        'Supported options are listed here: ' +
	                        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/dialog/dialogEnums.ts');
	                }
	            }
	        });
	    };
	    return DialogActionsDirective;
	}());
	exports.DialogActionsDirective = DialogActionsDirective;
	exports.module = angular.module('officeuifabric.components.dialog', ['officeuifabric.components'])
	    .directive('uifDialog', DialogDirective.factory())
	    .directive('uifDialogHeader', DialogHeaderDirective.factory())
	    .directive('uifDialogContent', DialogContentDirective.factory())
	    .directive('uifDialogInner', DialogInnerDirective.factory())
	    .directive('uifDialogSubtext', DialogSubtextDirective.factory())
	    .directive('uifDialogActions', DialogActionsDirective.factory());


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	(function (DialogTypeEnum) {
	    DialogTypeEnum[DialogTypeEnum["none"] = 0] = "none";
	    DialogTypeEnum[DialogTypeEnum["header"] = 1] = "header";
	    DialogTypeEnum[DialogTypeEnum["multiline"] = 2] = "multiline";
	})(exports.DialogTypeEnum || (exports.DialogTypeEnum = {}));
	var DialogTypeEnum = exports.DialogTypeEnum;
	(function (DialogActionsPositionEnum) {
	    DialogActionsPositionEnum[DialogActionsPositionEnum["none"] = 0] = "none";
	    DialogActionsPositionEnum[DialogActionsPositionEnum["left"] = 1] = "left";
	    DialogActionsPositionEnum[DialogActionsPositionEnum["right"] = 2] = "right";
	})(exports.DialogActionsPositionEnum || (exports.DialogActionsPositionEnum = {}));
	var DialogActionsPositionEnum = exports.DialogActionsPositionEnum;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
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
	        var value = '' + dropdownController.getViewValue();
	        if (value && value === attrs.value) {
	            dropdownController.setViewValue(attrs.title, attrs.value, null);
	        }
	    };
	    return DropdownOptionDirective;
	}());
	exports.DropdownOptionDirective = DropdownOptionDirective;
	var DropdownController = (function () {
	    function DropdownController($element, $scope, $document) {
	        this.$element = $element;
	        this.$scope = $scope;
	        this.$document = $document;
	    }
	    DropdownController.prototype.init = function () {
	        var self = this;
	        this.$element.on('click', function (e) {
	            if (!self.$scope.disabled) {
	                self.$scope.isOpen = !self.$scope.isOpen;
	                self.$scope.$apply();
	                var dropdownWidth = angular.element(this.querySelector('.ms-Dropdown'))[0].clientWidth;
	                angular.element(this.querySelector('.ms-Dropdown-items'))[0].style.width = dropdownWidth + 'px';
	                e.stopPropagation();
	                if (self.$scope.isOpen) {
	                    var documentClickHandler_1 = function () {
	                        self.$scope.isOpen = false;
	                        self.$scope.$apply();
	                        self.$document.off('click', documentClickHandler_1);
	                    };
	                    self.$document.on('click', documentClickHandler_1);
	                    self.$scope.$on('$destroy', function () {
	                        self.$document.off('click', documentClickHandler_1);
	                    });
	                }
	                if (self.$scope.ngModel !== undefined && self.$scope.ngModel != null) {
	                    self.$scope.ngModel.$setTouched();
	                }
	            }
	        });
	        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
	            this.$scope.ngModel.$render = function () {
	                var found = false;
	                var options = self.$element.find('li');
	                for (var i = 0; i < options.length; i++) {
	                    var option = options[i];
	                    var value = option.getAttribute('value');
	                    if (value === self.$scope.ngModel.$viewValue) {
	                        self.$scope.selectedTitle = angular.element(option).find('span').html();
	                        found = true;
	                        break;
	                    }
	                }
	                if (!found) {
	                    self.$scope.selectedTitle = '';
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
	    DropdownController.$inject = ['$element', '$scope', '$document'];
	    return DropdownController;
	}());
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
	        scope.$watch(function () { return instanceElement.attr('disabled'); }, (function (newValue) { scope.disabled = typeof newValue !== 'undefined'; }));
	        scope.disabled = 'disabled' in instanceAttributes;
	    };
	    return DropdownDirective;
	}());
	exports.DropdownDirective = DropdownDirective;
	exports.module = angular.module('officeuifabric.components.dropdown', [
	    'officeuifabric.components'
	])
	    .directive('uifDropdownOption', DropdownOptionDirective.factory())
	    .directive('uifDropdown', DropdownDirective.factory());


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var FacepileDirective = (function () {
	    function FacepileDirective() {
	        this.transclude = true;
	        this.replace = true;
	        this.restrict = 'E';
	        this.template = "<div class=\"ms-Facepile\">\n                                <ng-transclude></ng-transclude>\n                                <div class=\"ms-Facepile-members\">\n                                  <div  ng-repeat=\"member in members track by $index\"\n                                        role=\"button\"\n                                        ng-if =\"$index < uifOverflowLimit\"\n                                        class=\"ms-Facepile-itemBtn ms-Facepile-itemBtn--member\"\n                                        title=\"{{member.primaryText}}\" tabindex=\"0\">\n                                    <uif-persona uif-style=\"round\" uif-size=\"xsmall\" uif-image-url=\"{{member.icon}}\">\n                                      <uif-persona-initials uif-color=\"{{member.color}}\">{{member.initials}}</uif-persona-initials>\n                                    </uif-persona>\n                                  </div>\n                                  <button type=\"button\"\n                                    ng-show=\"uifOverflowLimit > 0 && members.length > uifOverflowLimit\"\n                                    ng-click=\"overflowPanelIsOpen = true;\"\n                                    class=\"ms-Facepile-itemBtn ms-Facepile-itemBtn--overflow js-overflowPanel is-active\">\n                                    <span class=\"ms-Facepile-overflowText\">+{{members.length - uifOverflowLimit}}</span\n                                  </button>\n                                </div>\n                                <uif-panel\n                                  uif-type=\"medium\"\n                                  uif-is-open=\"overflowPanelIsOpen\"\n                                  uif-show-overlay=\"true\"\n                                  uif-show-close=\"true\">\n                                  <uif-panel-header>{{members.length}} {{uifFacepileName}}</uif-panel-header>\n                                  <uif-content>\n                                    <div ng-repeat=\"member in members track by $index\" title=\"{{member.primaryText}}\" tabindex=\"0\">\n                                      <uif-persona uif-style=\"round\" uif-size=\"medium\" uif-image-url=\"{{member.icon}}\">\n                                        <uif-persona-initials uif-color=\"{{member.color}}\">{{member.initials}}</uif-persona-initials>\n                                        <uif-persona-primary-text>{{member.primaryText}}</uif-persona-primary-text>\n                                        <uif-persona-secondary-text>{{member.secondaryText}}</uif-persona-secondary-text>\n                                      </uif-persona>\n                                    </div>\n                                  </uif-content>\n                                </uif-panel>\n                              </div>";
	        this.scope = {
	            members: '=ngModel',
	            uifFacepileName: '@uifFacepileName',
	            uifOverflowLimit: '@'
	        };
	    }
	    FacepileDirective.factory = function () {
	        var directive = function () { return new FacepileDirective(); };
	        return directive;
	    };
	    return FacepileDirective;
	}());
	exports.FacepileDirective = FacepileDirective;
	var FacepileAddIconDirective = (function () {
	    function FacepileAddIconDirective() {
	        this.transclude = true;
	        this.restrict = 'E';
	        this.template = "<button type=\"button\"\n                                class=\"ms-Facepile-itemBtn ms-Facepile-itemBtn--addPerson js-addPerson\"\n                                ng-click=\"peoplepickerPanelIsOpen = true;\">\n                                  <i class=\"ms-Facepile-addPersonIcon ms-Icon ms-Icon--personAdd\"></i>\n                             </button>\n                             <uif-panel\n                                uif-type=\"large\"\n                                uif-is-open=\"peoplepickerPanelIsOpen\"\n                                uif-show-overlay=\"true\"\n                                uif-show-close=\"true\">\n                              <uif-panel-header>{{peoplePickerPlaceholder}}</uif-panel-header>\n                              <uif-content>\n                               <uif-people-picker\n                                uif-people=\"onFacePileSearch\"\n                                ng-model=\"parentScope.members\"\n                                uif-search-delay=\"500\"\n                                uif-type=\"facePile\">\n                                 <uif-selected-people-header>\n                                  {{selectedFacePilePeople.length}} selected person(s)\n                                 </uif-selected-people-header>\n                                 <uif-people-search-more>\n                                   <uif-primary-text uif-search-for-text=\"You are searching for: \">\n                                    Search organization people\n                                  </uif-primary-text>\n                                 </uif-people-search-more>\n                               </uif-people-picker>\n                              </uif-content>\n                             </uif-panel>";
	        this.scope = {
	            onFacePileSearch: '=uifPeople',
	            peoplePickerPlaceholder: '@placeholder'
	        };
	    }
	    FacepileAddIconDirective.factory = function () {
	        var directive = function () { return new FacepileAddIconDirective(); };
	        return directive;
	    };
	    FacepileAddIconDirective.prototype.link = function (scope, elem, attrs) {
	        {
	            scope.parentScope = scope.$parent.$parent;
	        }
	    };
	    ;
	    return FacepileAddIconDirective;
	}());
	exports.FacepileAddIconDirective = FacepileAddIconDirective;
	exports.module = angular.module('officeuifabric.components.facepile', [
	    'officeuifabric.components'
	])
	    .directive('uifFacepile', FacepileDirective.factory())
	    .directive('uifFacepileAddIcon', FacepileAddIconDirective.factory());


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var iconEnum_1 = __webpack_require__(22);
	var IconController = (function () {
	    function IconController($log) {
	        this.$log = $log;
	    }
	    IconController.$inject = ['$log'];
	    return IconController;
	}());
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
	        scope.$watch('uifType', function (newValue, oldValue) {
	            if (iconEnum_1.IconEnum[newValue] === undefined) {
	                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.icon - Unsupported icon: ' +
	                    'The icon (\'' + scope.uifType + '\') is not supported by the Office UI Fabric. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/icon/iconEnum.ts');
	            }
	        });
	    };
	    ;
	    return IconDirective;
	}());
	exports.IconDirective = IconDirective;
	exports.module = angular.module('officeuifabric.components.icon', [
	    'officeuifabric.components'
	])
	    .directive('uifIcon', IconDirective.factory());


/***/ },
/* 22 */
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
	    IconEnum[IconEnum["circleBall"] = 72] = "circleBall";
	    IconEnum[IconEnum["circleBalloons"] = 73] = "circleBalloons";
	    IconEnum[IconEnum["circleCar"] = 74] = "circleCar";
	    IconEnum[IconEnum["circleCat"] = 75] = "circleCat";
	    IconEnum[IconEnum["circleCoffee"] = 76] = "circleCoffee";
	    IconEnum[IconEnum["circleDog"] = 77] = "circleDog";
	    IconEnum[IconEnum["circleEmpty"] = 78] = "circleEmpty";
	    IconEnum[IconEnum["circleFill"] = 79] = "circleFill";
	    IconEnum[IconEnum["circleFilled"] = 80] = "circleFilled";
	    IconEnum[IconEnum["circleHalfFilled"] = 81] = "circleHalfFilled";
	    IconEnum[IconEnum["circleInfo"] = 82] = "circleInfo";
	    IconEnum[IconEnum["circleLightning"] = 83] = "circleLightning";
	    IconEnum[IconEnum["circlePill"] = 84] = "circlePill";
	    IconEnum[IconEnum["circlePlane"] = 85] = "circlePlane";
	    IconEnum[IconEnum["circlePlus"] = 86] = "circlePlus";
	    IconEnum[IconEnum["circlePoodle"] = 87] = "circlePoodle";
	    IconEnum[IconEnum["circleUnfilled"] = 88] = "circleUnfilled";
	    IconEnum[IconEnum["classNotebook"] = 89] = "classNotebook";
	    IconEnum[IconEnum["classroom"] = 90] = "classroom";
	    IconEnum[IconEnum["clock"] = 91] = "clock";
	    IconEnum[IconEnum["clutter"] = 92] = "clutter";
	    IconEnum[IconEnum["coffee"] = 93] = "coffee";
	    IconEnum[IconEnum["collapse"] = 94] = "collapse";
	    IconEnum[IconEnum["conflict"] = 95] = "conflict";
	    IconEnum[IconEnum["contact"] = 96] = "contact";
	    IconEnum[IconEnum["contactForm"] = 97] = "contactForm";
	    IconEnum[IconEnum["contactPublic"] = 98] = "contactPublic";
	    IconEnum[IconEnum["copy"] = 99] = "copy";
	    IconEnum[IconEnum["creditCard"] = 100] = "creditCard";
	    IconEnum[IconEnum["creditCardOutline"] = 101] = "creditCardOutline";
	    IconEnum[IconEnum["dashboard"] = 102] = "dashboard";
	    IconEnum[IconEnum["descending"] = 103] = "descending";
	    IconEnum[IconEnum["desktop"] = 104] = "desktop";
	    IconEnum[IconEnum["deviceWipe"] = 105] = "deviceWipe";
	    IconEnum[IconEnum["dialpad"] = 106] = "dialpad";
	    IconEnum[IconEnum["directions"] = 107] = "directions";
	    IconEnum[IconEnum["document"] = 108] = "document";
	    IconEnum[IconEnum["documentAdd"] = 109] = "documentAdd";
	    IconEnum[IconEnum["documentForward"] = 110] = "documentForward";
	    IconEnum[IconEnum["documentLandscape"] = 111] = "documentLandscape";
	    IconEnum[IconEnum["documentPDF"] = 112] = "documentPDF";
	    IconEnum[IconEnum["documentReply"] = 113] = "documentReply";
	    IconEnum[IconEnum["documents"] = 114] = "documents";
	    IconEnum[IconEnum["documentSearch"] = 115] = "documentSearch";
	    IconEnum[IconEnum["dog"] = 116] = "dog";
	    IconEnum[IconEnum["dogAlt"] = 117] = "dogAlt";
	    IconEnum[IconEnum["dot"] = 118] = "dot";
	    IconEnum[IconEnum["download"] = 119] = "download";
	    IconEnum[IconEnum["drm"] = 120] = "drm";
	    IconEnum[IconEnum["drop"] = 121] = "drop";
	    IconEnum[IconEnum["dropdown"] = 122] = "dropdown";
	    IconEnum[IconEnum["editBox"] = 123] = "editBox";
	    IconEnum[IconEnum["ellipsis"] = 124] = "ellipsis";
	    IconEnum[IconEnum["embed"] = 125] = "embed";
	    IconEnum[IconEnum["event"] = 126] = "event";
	    IconEnum[IconEnum["eventCancel"] = 127] = "eventCancel";
	    IconEnum[IconEnum["eventInfo"] = 128] = "eventInfo";
	    IconEnum[IconEnum["eventRecurring"] = 129] = "eventRecurring";
	    IconEnum[IconEnum["eventShare"] = 130] = "eventShare";
	    IconEnum[IconEnum["exclamation"] = 131] = "exclamation";
	    IconEnum[IconEnum["expand"] = 132] = "expand";
	    IconEnum[IconEnum["eye"] = 133] = "eye";
	    IconEnum[IconEnum["favorites"] = 134] = "favorites";
	    IconEnum[IconEnum["fax"] = 135] = "fax";
	    IconEnum[IconEnum["fieldMail"] = 136] = "fieldMail";
	    IconEnum[IconEnum["fieldNumber"] = 137] = "fieldNumber";
	    IconEnum[IconEnum["fieldText"] = 138] = "fieldText";
	    IconEnum[IconEnum["fieldTextBox"] = 139] = "fieldTextBox";
	    IconEnum[IconEnum["fileDocument"] = 140] = "fileDocument";
	    IconEnum[IconEnum["fileImage"] = 141] = "fileImage";
	    IconEnum[IconEnum["filePDF"] = 142] = "filePDF";
	    IconEnum[IconEnum["filter"] = 143] = "filter";
	    IconEnum[IconEnum["filterClear"] = 144] = "filterClear";
	    IconEnum[IconEnum["firstAid"] = 145] = "firstAid";
	    IconEnum[IconEnum["flag"] = 146] = "flag";
	    IconEnum[IconEnum["folder"] = 147] = "folder";
	    IconEnum[IconEnum["folderMove"] = 148] = "folderMove";
	    IconEnum[IconEnum["folderPublic"] = 149] = "folderPublic";
	    IconEnum[IconEnum["folderSearch"] = 150] = "folderSearch";
	    IconEnum[IconEnum["fontColor"] = 151] = "fontColor";
	    IconEnum[IconEnum["fontDecrease"] = 152] = "fontDecrease";
	    IconEnum[IconEnum["fontIncrease"] = 153] = "fontIncrease";
	    IconEnum[IconEnum["frowny"] = 154] = "frowny";
	    IconEnum[IconEnum["fullscreen"] = 155] = "fullscreen";
	    IconEnum[IconEnum["gear"] = 156] = "gear";
	    IconEnum[IconEnum["glasses"] = 157] = "glasses";
	    IconEnum[IconEnum["globe"] = 158] = "globe";
	    IconEnum[IconEnum["graph"] = 159] = "graph";
	    IconEnum[IconEnum["group"] = 160] = "group";
	    IconEnum[IconEnum["header"] = 161] = "header";
	    IconEnum[IconEnum["heart"] = 162] = "heart";
	    IconEnum[IconEnum["heartEmpty"] = 163] = "heartEmpty";
	    IconEnum[IconEnum["hide"] = 164] = "hide";
	    IconEnum[IconEnum["home"] = 165] = "home";
	    IconEnum[IconEnum["inboxCheck"] = 166] = "inboxCheck";
	    IconEnum[IconEnum["info"] = 167] = "info";
	    IconEnum[IconEnum["infoCircle"] = 168] = "infoCircle";
	    IconEnum[IconEnum["italic"] = 169] = "italic";
	    IconEnum[IconEnum["key"] = 170] = "key";
	    IconEnum[IconEnum["late"] = 171] = "late";
	    IconEnum[IconEnum["lifesaver"] = 172] = "lifesaver";
	    IconEnum[IconEnum["lifesaverLock"] = 173] = "lifesaverLock";
	    IconEnum[IconEnum["lightBulb"] = 174] = "lightBulb";
	    IconEnum[IconEnum["lightning"] = 175] = "lightning";
	    IconEnum[IconEnum["link"] = 176] = "link";
	    IconEnum[IconEnum["linkRemove"] = 177] = "linkRemove";
	    IconEnum[IconEnum["listBullets"] = 178] = "listBullets";
	    IconEnum[IconEnum["listCheck"] = 179] = "listCheck";
	    IconEnum[IconEnum["listCheckbox"] = 180] = "listCheckbox";
	    IconEnum[IconEnum["listGroup"] = 181] = "listGroup";
	    IconEnum[IconEnum["listGroup2"] = 182] = "listGroup2";
	    IconEnum[IconEnum["listNumbered"] = 183] = "listNumbered";
	    IconEnum[IconEnum["lock"] = 184] = "lock";
	    IconEnum[IconEnum["mail"] = 185] = "mail";
	    IconEnum[IconEnum["mailCheck"] = 186] = "mailCheck";
	    IconEnum[IconEnum["mailDown"] = 187] = "mailDown";
	    IconEnum[IconEnum["mailEdit"] = 188] = "mailEdit";
	    IconEnum[IconEnum["mailEmpty"] = 189] = "mailEmpty";
	    IconEnum[IconEnum["mailError"] = 190] = "mailError";
	    IconEnum[IconEnum["mailOpen"] = 191] = "mailOpen";
	    IconEnum[IconEnum["mailPause"] = 192] = "mailPause";
	    IconEnum[IconEnum["mailPublic"] = 193] = "mailPublic";
	    IconEnum[IconEnum["mailRead"] = 194] = "mailRead";
	    IconEnum[IconEnum["mailSend"] = 195] = "mailSend";
	    IconEnum[IconEnum["mailSync"] = 196] = "mailSync";
	    IconEnum[IconEnum["mailUnread"] = 197] = "mailUnread";
	    IconEnum[IconEnum["mapMarker"] = 198] = "mapMarker";
	    IconEnum[IconEnum["meal"] = 199] = "meal";
	    IconEnum[IconEnum["menu"] = 200] = "menu";
	    IconEnum[IconEnum["menu2"] = 201] = "menu2";
	    IconEnum[IconEnum["merge"] = 202] = "merge";
	    IconEnum[IconEnum["metadata"] = 203] = "metadata";
	    IconEnum[IconEnum["microphone"] = 204] = "microphone";
	    IconEnum[IconEnum["miniatures"] = 205] = "miniatures";
	    IconEnum[IconEnum["minus"] = 206] = "minus";
	    IconEnum[IconEnum["mobile"] = 207] = "mobile";
	    IconEnum[IconEnum["money"] = 208] = "money";
	    IconEnum[IconEnum["move"] = 209] = "move";
	    IconEnum[IconEnum["multiChoice"] = 210] = "multiChoice";
	    IconEnum[IconEnum["music"] = 211] = "music";
	    IconEnum[IconEnum["navigate"] = 212] = "navigate";
	    IconEnum[IconEnum["new"] = 213] = "new";
	    IconEnum[IconEnum["newsfeed"] = 214] = "newsfeed";
	    IconEnum[IconEnum["note"] = 215] = "note";
	    IconEnum[IconEnum["notebook"] = 216] = "notebook";
	    IconEnum[IconEnum["noteEdit"] = 217] = "noteEdit";
	    IconEnum[IconEnum["noteForward"] = 218] = "noteForward";
	    IconEnum[IconEnum["noteReply"] = 219] = "noteReply";
	    IconEnum[IconEnum["notRecurring"] = 220] = "notRecurring";
	    IconEnum[IconEnum["onedrive"] = 221] = "onedrive";
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
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
	        if (angular.isDefined(attributes.disabled)) {
	            instanceElement.find('label').eq(0).addClass('is-disabled');
	        }
	        if (angular.isDefined(attributes.required)) {
	            instanceElement.find('label').eq(0).addClass('is-required');
	        }
	    };
	    return LabelDirective;
	}());
	exports.LabelDirective = LabelDirective;
	exports.module = angular.module('officeuifabric.components.label', ['officeuifabric.components'])
	    .directive('uifLabel', LabelDirective.factory());


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
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
	}());
	exports.LinkDirective = LinkDirective;
	exports.module = angular.module('officeuifabric.components.link', [
	    'officeuifabric.components'
	])
	    .directive('uifLink', LinkDirective.factory());


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var listItemSelectModeEnum_1 = __webpack_require__(26);
	var listItemTypeEnum_1 = __webpack_require__(27);
	var listLayoutEnum_1 = __webpack_require__(28);
	var ListController = (function () {
	    function ListController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	        this.$scope.items = [];
	        if (!this.$scope.selectedItems) {
	            this.$scope.selectedItems = [];
	        }
	    }
	    Object.defineProperty(ListController.prototype, "itemSelectMode", {
	        get: function () {
	            return this.$scope.itemSelectMode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ListController.prototype, "selectedItems", {
	        get: function () {
	            return this.$scope.selectedItems;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ListController.prototype, "items", {
	        get: function () {
	            return this.$scope.items;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ListController.$inject = ['$scope', '$log'];
	    return ListController;
	}());
	var ListDirective = (function () {
	    function ListDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.template = '<ul class="ms-List" ng-transclude></ul>';
	        this.controller = ListController;
	        this.controllerAs = 'list';
	        this.scope = {
	            selectedItems: '=?uifSelectedItems'
	        };
	    }
	    ListDirective.factory = function () {
	        var directive = function () { return new ListDirective(); };
	        return directive;
	    };
	    ListDirective.prototype.link = function (scope, instanceElement, attrs, controller) {
	        if (attrs.uifLayout !== undefined && attrs.uifLayout !== null) {
	            if (listLayoutEnum_1.ListLayoutEnum[attrs.uifLayout] === undefined) {
	                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                    '\'' + attrs.uifLayout + '\' is not a valid option for \'uif-layout\'. ' +
	                    'Valid options are list|grid.');
	            }
	            else {
	                scope.layout = attrs.uifLayout;
	            }
	        }
	        if (scope.layout === undefined) {
	            scope.layout = listLayoutEnum_1.ListLayoutEnum[listLayoutEnum_1.ListLayoutEnum.list];
	        }
	        if (scope.layout === listLayoutEnum_1.ListLayoutEnum[listLayoutEnum_1.ListLayoutEnum.grid]) {
	            instanceElement.children().eq(0).addClass('ms-List--grid');
	        }
	        if (attrs.uifItemSelectMode !== undefined && attrs.uifItemSelectMode !== null) {
	            if (listItemSelectModeEnum_1.ListItemSelectModeEnum[attrs.uifItemSelectMode] === undefined) {
	                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                    '\'' + attrs.uifItemSelectMode + '\' is not a valid option for \'uif-item-select-mode\'. ' +
	                    'Valid options are none|single|multiple.');
	            }
	            else {
	                scope.itemSelectMode = attrs.uifItemSelectMode;
	            }
	        }
	        if (scope.itemSelectMode === undefined) {
	            scope.itemSelectMode = listItemSelectModeEnum_1.ListItemSelectModeEnum[listItemSelectModeEnum_1.ListItemSelectModeEnum.none];
	        }
	    };
	    return ListDirective;
	}());
	exports.ListDirective = ListDirective;
	var ListItemController = (function () {
	    function ListItemController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	    }
	    ListItemController.$inject = ['$scope', '$log'];
	    return ListItemController;
	}());
	var ListItemDirective = (function () {
	    function ListItemDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.template = '<li class="ms-ListItem" ng-transclude></li>';
	        this.require = '^uifList';
	        this.scope = {
	            item: '=uifItem'
	        };
	        this.controller = ListItemController;
	    }
	    ListItemDirective.factory = function () {
	        var directive = function () { return new ListItemDirective(); };
	        return directive;
	    };
	    ListItemDirective.prototype.link = function (scope, instanceElement, attrs, list) {
	        if (attrs.uifSelected !== undefined &&
	            attrs.uifSelected !== null) {
	            var selectedString = attrs.uifSelected.toLowerCase();
	            if (selectedString !== 'true' && selectedString !== 'false') {
	                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                    '\'' + attrs.uifSelected + '\' is not a valid boolean value. ' +
	                    'Valid options are true|false.');
	            }
	            else {
	                if (selectedString === 'true') {
	                    scope.selected = true;
	                }
	            }
	        }
	        if (scope.item && list.selectedItems.length > 0) {
	            for (var i = 0; i < list.selectedItems.length; i++) {
	                if (list.selectedItems[i] === scope.item) {
	                    scope.selected = true;
	                }
	            }
	        }
	        if (attrs.uifType !== undefined && attrs.uifType !== null) {
	            if (listItemTypeEnum_1.ListItemTypeEnum[attrs.uifType] === undefined) {
	                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                    '\'' + attrs.uifType + '\' is not a valid option for \'uif-type\'. ' +
	                    'Valid options are item|itemWithImage|itemWithIcon.');
	            }
	            else {
	                scope.type = listItemTypeEnum_1.ListItemTypeEnum[attrs.uifType];
	            }
	        }
	        switch (scope.type) {
	            case listItemTypeEnum_1.ListItemTypeEnum.itemWithIcon:
	                instanceElement.children().eq(0).addClass('ms-ListItem--document');
	                if (instanceElement.children().find('uif-list-item-icon').length === 0) {
	                    list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                        'List item type itemWithIcon requires the uif-list-item-icon directive');
	                }
	                break;
	            case listItemTypeEnum_1.ListItemTypeEnum.itemWithImage:
	                instanceElement.children().eq(0).addClass('ms-ListItem--image');
	                if (instanceElement.children().find('uif-list-item-image').length === 0) {
	                    list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                        'List item type itemWithImage requires the uif-list-item-image directive');
	                }
	                break;
	            default:
	                break;
	        }
	        if (attrs.uifUnread !== undefined &&
	            attrs.uifUnread !== null) {
	            var unreadString = attrs.uifUnread.toLowerCase();
	            if (unreadString !== 'true' && unreadString !== 'false') {
	                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                    '\'' + attrs.uifUnread + '\' is not a valid boolean value. ' +
	                    'Valid options are true|false.');
	            }
	            else {
	                if (unreadString === 'true') {
	                    scope.unread = true;
	                }
	            }
	        }
	        if (attrs.uifUnseen !== undefined &&
	            attrs.uifUnseen !== null) {
	            var unseenString = attrs.uifUnseen.toLowerCase();
	            if (unseenString !== 'true' && unseenString !== 'false') {
	                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
	                    '\'' + attrs.uifUnseen + '\' is not a valid boolean value. ' +
	                    'Valid options are true|false.');
	            }
	            else {
	                if (unseenString === 'true') {
	                    scope.unseen = true;
	                }
	            }
	        }
	        if (scope.item !== undefined) {
	            list.items.push(scope);
	        }
	        scope.itemClick = function (ev) {
	            scope.selected = !scope.selected;
	            scope.$apply();
	        };
	        scope.$watch('selected', function (newValue, oldValue, listItemScope) {
	            if (newValue === true) {
	                if (list.itemSelectMode === listItemSelectModeEnum_1.ListItemSelectModeEnum[listItemSelectModeEnum_1.ListItemSelectModeEnum.single]) {
	                    list.selectedItems.length = 0;
	                    if (list.items) {
	                        for (var i = 0; i < list.items.length; i++) {
	                            if (list.items[i] !== listItemScope) {
	                                list.items[i].selected = false;
	                            }
	                        }
	                    }
	                }
	                var itemAlreadySelected = false;
	                for (var i = 0; i < list.selectedItems.length; i++) {
	                    if (list.selectedItems[i] === listItemScope.item) {
	                        itemAlreadySelected = true;
	                        break;
	                    }
	                }
	                if (!itemAlreadySelected) {
	                    list.selectedItems.push(listItemScope.item);
	                }
	                instanceElement.children().eq(0).addClass('is-selected');
	            }
	            else {
	                for (var i = 0; i < list.selectedItems.length; i++) {
	                    if (list.selectedItems[i] === listItemScope.item) {
	                        list.selectedItems.splice(i, 1);
	                        break;
	                    }
	                }
	                instanceElement.children().eq(0).removeClass('is-selected');
	            }
	        });
	        scope.$watch('unread', function (newValue, oldValue, listItemScope) {
	            if (newValue === true) {
	                instanceElement.children().eq(0).addClass('is-unread');
	            }
	            else {
	                instanceElement.children().eq(0).removeClass('is-unread');
	            }
	        });
	        scope.$watch('unseen', function (newValue, oldValue, listItemScope) {
	            if (newValue === true) {
	                instanceElement.children().eq(0).addClass('is-unseen');
	            }
	            else {
	                instanceElement.children().eq(0).removeClass('is-unseen');
	            }
	        });
	        if (list.itemSelectMode !== listItemSelectModeEnum_1.ListItemSelectModeEnum[listItemSelectModeEnum_1.ListItemSelectModeEnum.none]) {
	            instanceElement.on('click', scope.itemClick);
	            instanceElement.children().eq(0).addClass('is-selectable');
	        }
	    };
	    return ListItemDirective;
	}());
	exports.ListItemDirective = ListItemDirective;
	var ListItemPrimaryTextDirective = (function () {
	    function ListItemPrimaryTextDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<span class="ms-ListItem-primaryText" ng-transclude></span>';
	        this.replace = false;
	    }
	    ListItemPrimaryTextDirective.factory = function () {
	        var directive = function () { return new ListItemPrimaryTextDirective(); };
	        return directive;
	    };
	    return ListItemPrimaryTextDirective;
	}());
	exports.ListItemPrimaryTextDirective = ListItemPrimaryTextDirective;
	var ListItemSecondaryTextDirective = (function () {
	    function ListItemSecondaryTextDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<span class="ms-ListItem-secondaryText" ng-transclude></span>';
	        this.replace = false;
	    }
	    ListItemSecondaryTextDirective.factory = function () {
	        var directive = function () { return new ListItemSecondaryTextDirective(); };
	        return directive;
	    };
	    return ListItemSecondaryTextDirective;
	}());
	exports.ListItemSecondaryTextDirective = ListItemSecondaryTextDirective;
	var ListItemTertiaryTextDirective = (function () {
	    function ListItemTertiaryTextDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<span class="ms-ListItem-tertiaryText" ng-transclude></span>';
	        this.replace = false;
	    }
	    ListItemTertiaryTextDirective.factory = function () {
	        var directive = function () { return new ListItemTertiaryTextDirective(); };
	        return directive;
	    };
	    return ListItemTertiaryTextDirective;
	}());
	exports.ListItemTertiaryTextDirective = ListItemTertiaryTextDirective;
	var ListItemMetaTextDirective = (function () {
	    function ListItemMetaTextDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<span class="ms-ListItem-metaText" ng-transclude></span>';
	        this.replace = false;
	    }
	    ListItemMetaTextDirective.factory = function () {
	        var directive = function () { return new ListItemMetaTextDirective(); };
	        return directive;
	    };
	    return ListItemMetaTextDirective;
	}());
	exports.ListItemMetaTextDirective = ListItemMetaTextDirective;
	var ListItemImageDirective = (function () {
	    function ListItemImageDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<div class="ms-ListItem-image" ng-transclude></div>';
	        this.replace = false;
	    }
	    ListItemImageDirective.factory = function () {
	        var directive = function () { return new ListItemImageDirective(); };
	        return directive;
	    };
	    return ListItemImageDirective;
	}());
	exports.ListItemImageDirective = ListItemImageDirective;
	var ListItemIconDirective = (function () {
	    function ListItemIconDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<div class="ms-ListItem-itemIcon" ng-transclude></div>';
	        this.replace = false;
	    }
	    ListItemIconDirective.factory = function () {
	        var directive = function () { return new ListItemIconDirective(); };
	        return directive;
	    };
	    return ListItemIconDirective;
	}());
	exports.ListItemIconDirective = ListItemIconDirective;
	var ListItemSelectionTargetDirective = (function () {
	    function ListItemSelectionTargetDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<div class="ms-ListItem-selectionTarget" ng-transclude></div>';
	        this.replace = false;
	    }
	    ListItemSelectionTargetDirective.factory = function () {
	        var directive = function () { return new ListItemSelectionTargetDirective(); };
	        return directive;
	    };
	    return ListItemSelectionTargetDirective;
	}());
	exports.ListItemSelectionTargetDirective = ListItemSelectionTargetDirective;
	var ListItemActionsDirective = (function () {
	    function ListItemActionsDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<div class="ms-ListItem-actions" ng-transclude></div>';
	        this.replace = false;
	    }
	    ListItemActionsDirective.factory = function () {
	        var directive = function () { return new ListItemActionsDirective(); };
	        return directive;
	    };
	    return ListItemActionsDirective;
	}());
	exports.ListItemActionsDirective = ListItemActionsDirective;
	var ListItemActionDirective = (function () {
	    function ListItemActionDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<div class="ms-ListItem-action" ng-transclude></div>';
	        this.replace = false;
	    }
	    ListItemActionDirective.factory = function () {
	        var directive = function () { return new ListItemActionDirective(); };
	        return directive;
	    };
	    return ListItemActionDirective;
	}());
	exports.ListItemActionDirective = ListItemActionDirective;
	exports.module = angular.module('officeuifabric.components.list', ['officeuifabric.components'])
	    .directive('uifList', ListDirective.factory())
	    .directive('uifListItem', ListItemDirective.factory())
	    .directive('uifListItemPrimaryText', ListItemPrimaryTextDirective.factory())
	    .directive('uifListItemSecondaryText', ListItemSecondaryTextDirective.factory())
	    .directive('uifListItemTertiaryText', ListItemTertiaryTextDirective.factory())
	    .directive('uifListItemMetaText', ListItemMetaTextDirective.factory())
	    .directive('uifListItemImage', ListItemImageDirective.factory())
	    .directive('uifListItemIcon', ListItemIconDirective.factory())
	    .directive('uifListItemSelectionTarget', ListItemSelectionTargetDirective.factory())
	    .directive('uifListItemActions', ListItemActionsDirective.factory())
	    .directive('uifListItemAction', ListItemActionDirective.factory());


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	(function (ListItemSelectModeEnum) {
	    ListItemSelectModeEnum[ListItemSelectModeEnum["none"] = 0] = "none";
	    ListItemSelectModeEnum[ListItemSelectModeEnum["single"] = 1] = "single";
	    ListItemSelectModeEnum[ListItemSelectModeEnum["multiple"] = 2] = "multiple";
	})(exports.ListItemSelectModeEnum || (exports.ListItemSelectModeEnum = {}));
	var ListItemSelectModeEnum = exports.ListItemSelectModeEnum;


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	(function (ListItemTypeEnum) {
	    ListItemTypeEnum[ListItemTypeEnum["item"] = 0] = "item";
	    ListItemTypeEnum[ListItemTypeEnum["itemWithImage"] = 1] = "itemWithImage";
	    ListItemTypeEnum[ListItemTypeEnum["itemWithIcon"] = 2] = "itemWithIcon";
	})(exports.ListItemTypeEnum || (exports.ListItemTypeEnum = {}));
	var ListItemTypeEnum = exports.ListItemTypeEnum;


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	(function (ListLayoutEnum) {
	    ListLayoutEnum[ListLayoutEnum["list"] = 0] = "list";
	    ListLayoutEnum[ListLayoutEnum["grid"] = 1] = "grid";
	})(exports.ListLayoutEnum || (exports.ListLayoutEnum = {}));
	var ListLayoutEnum = exports.ListLayoutEnum;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var MessageBannerController = (function () {
	    function MessageBannerController($scope, $log, $window) {
	        this.$scope = $scope;
	        this.$log = $log;
	        this.$window = $window;
	    }
	    MessageBannerController.$inject = ['$scope', '$log', '$window'];
	    return MessageBannerController;
	}());
	exports.MessageBannerController = MessageBannerController;
	var MessageBannerDirective = (function () {
	    function MessageBannerDirective($log, $timeout) {
	        var _this = this;
	        this.$log = $log;
	        this.$timeout = $timeout;
	        this.controller = MessageBannerController;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.require = 'uifMessageBanner';
	        this.isExpanded = false;
	        this.template = "\n    <div class=\"ms-MessageBanner\" ng-show=\"uifIsVisible\">\n    <div class=\"ms-MessageBanner-content\">\n    <div class=\"ms-MessageBanner-text\">\n    <div class=\"ms-MessageBanner-clipper\"></div>\n    </div>\n    <uif-button type=\"button\" uif-type=\"command\" class=\"ms-MessageBanner-expand\">\n    <uif-icon uif-type=\"chevronsDown\" ng-show=\"!isExpanded\"></uif-icon>\n    <uif-icon uif-type=\"chevronsUp\" ng-show=\"isExpanded\"></uif-icon>\n    </uif-button>\n    <div class=\"ms-MessageBanner-action\">\n    <uif-button type=\"button\" uif-type=\"primary\" class=\"ms-fontColor-neutralLight\" ng-click=\"uifAction()\">{{ uifActionLabel }}</uif-button>\n    </div>\n    </div>\n    <uif-button type=\"button\" uif-type=\"command\" class=\"ms-MessageBanner-close\" ng-click=\"uifOnClose()\" style=\"height:52px\">\n    <uif-icon uif-type=\"x\"></uif-icon>\n    </uif-button>\n    </div>";
	        this.scope = {
	            uifAction: '&',
	            uifActionLabel: '@',
	            uifIsVisible: '=?',
	            uifOnClose: '&?'
	        };
	        this._textContainerMaxWidth = 700;
	        this._bufferElementsWidth = 88;
	        this._bufferElementsWidthSmall = 35;
	        this.SMALL_BREAK_POINT = 480;
	        this.link = function ($scope, $elem, $attrs, $controller, $transclude) {
	            $scope.uifActionLabel = $attrs.uifActionLabel;
	            $scope.isExpanded = false;
	            $scope.onResize = function (innerWidth) {
	                if (innerWidth === undefined) {
	                    innerWidth = window.innerWidth;
	                }
	                _this._clientWidth = _this._messageBanner[0].offsetWidth;
	                if (innerWidth >= _this.SMALL_BREAK_POINT) {
	                    _this._resizeRegular();
	                }
	                else {
	                    _this._resizeSmall();
	                }
	            };
	            _this._initLocals($elem);
	            _this.transcludeChilds($scope, $elem, $transclude);
	            _this._initTextWidth = (_this._clipper.children().eq(0))[0].offsetWidth;
	            angular.element($controller.$window).bind('resize', function () {
	                $scope.onResize();
	                $scope.$digest();
	            });
	            angular.element(_this._chevronButton).bind('click', function () {
	                _this._toggleExpansion($scope);
	            });
	            angular.element(_this._closeButton).bind('click', function () {
	                _this._hideBanner($scope);
	            });
	            $scope.onResize();
	        };
	    }
	    MessageBannerDirective.factory = function () {
	        var directive = function ($log, $timeout) {
	            return new MessageBannerDirective($log, $timeout);
	        };
	        directive.$inject = ['$log', '$timeout'];
	        return directive;
	    };
	    ;
	    MessageBannerDirective.prototype.transcludeChilds = function ($scope, $element, $transclude) {
	        var _this = this;
	        $transclude(function (clone) {
	            var hasContent = _this.hasItemContent(clone);
	            if (!hasContent) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.messagebanner - ' +
	                    'you need to provide a text for the message banner.\n' +
	                    'For <uif-message-banner> you need to specify' +
	                    '<uif-content> as a child directive');
	            }
	            _this.insertItemContent(clone, $scope, $element);
	        });
	    };
	    MessageBannerDirective.prototype.insertItemContent = function (clone, $scope, $element) {
	        var contentElement = angular.element($element[0].querySelector('.ms-MessageBanner-clipper'));
	        if (this.hasItemContent(clone)) {
	            for (var i = 0; i < clone.length; i++) {
	                var element = angular.element(clone[i]);
	                if (element.hasClass('uif-content')) {
	                    contentElement.append(element);
	                    break;
	                }
	            }
	        }
	    };
	    MessageBannerDirective.prototype.hasItemContent = function (clone) {
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass('uif-content')) {
	                return true;
	            }
	        }
	        return false;
	    };
	    MessageBannerDirective.prototype._initLocals = function ($elem) {
	        this._messageBanner = angular.element($elem[0].querySelector('.ms-MessageBanner'));
	        this._clipper = angular.element($elem[0].querySelector('.ms-MessageBanner-clipper'));
	        this._chevronButton = angular.element($elem[0].querySelectorAll('.ms-MessageBanner-expand'));
	        this._actionButton = angular.element($elem[0].querySelector('.ms-MessageBanner-action'));
	        this._bufferSize = this._actionButton[0].offsetWidth + this._bufferElementsWidth;
	        this._closeButton = angular.element($elem[0].querySelector('.ms-MessageBanner-close'));
	    };
	    MessageBannerDirective.prototype._resizeRegular = function () {
	        if ((this._clientWidth - this._bufferSize) > this._initTextWidth && this._initTextWidth < this._textContainerMaxWidth) {
	            this._textWidth = 'auto';
	            this._chevronButton[0].className = 'ms-MessageBanner-expand';
	        }
	        else {
	            this._textWidth = Math.min((this._clientWidth - this._bufferSize), this._textContainerMaxWidth) + 'px';
	            if (!this._chevronButton.hasClass('is-visible')) {
	                this._chevronButton[0].className += ' is-visible';
	            }
	        }
	        this._clipper[0].style.width = this._textWidth;
	        this._chevronButton[0].style.height = '52px';
	    };
	    ;
	    MessageBannerDirective.prototype._resizeSmall = function () {
	        if (this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton[0].offsetWidth) > this._initTextWidth) {
	            this._textWidth = 'auto';
	        }
	        else {
	            this._textWidth = (this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton[0].offsetWidth)) + 'px';
	        }
	        this._clipper[0].style.width = this._textWidth;
	        this._chevronButton[0].style.height = '85px';
	    };
	    ;
	    MessageBannerDirective.prototype._toggleExpansion = function ($scope) {
	        $scope.isExpanded = !$scope.isExpanded;
	        $scope.$digest();
	        this._messageBanner.toggleClass('is-expanded');
	    };
	    ;
	    MessageBannerDirective.prototype._hideBanner = function ($scope) {
	        var _this = this;
	        if ($scope.uifIsVisible) {
	            this._messageBanner.addClass('hide');
	            this.$timeout(function () {
	                $scope.uifIsVisible = false;
	                $scope.$apply();
	                _this._messageBanner.removeClass('hide');
	            }, 500);
	        }
	    };
	    ;
	    return MessageBannerDirective;
	}());
	exports.MessageBannerDirective = MessageBannerDirective;
	exports.module = angular.module('officeuifabric.components.messagebanner', ['officeuifabric.components'])
	    .directive('uifMessageBanner', MessageBannerDirective.factory());


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var messageBarTypeEnum_1 = __webpack_require__(31);
	var MessageBarController = (function () {
	    function MessageBarController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	    }
	    MessageBarController.$inject = ['$scope', '$log'];
	    return MessageBarController;
	}());
	exports.MessageBarController = MessageBarController;
	var MessageBarDirective = (function () {
	    function MessageBarDirective($log, $timeout) {
	        var _this = this;
	        this.$log = $log;
	        this.$timeout = $timeout;
	        this.controller = MessageBarController;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.require = 'uifMessageBar';
	        this.template = '' +
	            '<div ng-class="[\'ms-MessageBar\', classType]">' +
	            '<div class="ms-MessageBar-content">' +
	            '<div class="ms-MessageBar-icon">' +
	            '<i ng-class="[\'ms-Icon\', iconType]"></i>' +
	            '</div>' +
	            '<div class="ms-MessageBar-text" />' +
	            '</div>' +
	            '</div>';
	        this.scope = {
	            uifType: '@'
	        };
	        this.link = function ($scope, $element, $attrs, $controller, $transclude) {
	            $scope.iconType = 'ms-Icon--infoCircle';
	            $scope.classType = '';
	            $scope.uifType = $attrs.uifType;
	            $scope.$watch('uifType', function (newValue, oldValue) {
	                if (typeof newValue !== 'undefined') {
	                    if (messageBarTypeEnum_1.MessageBarTypeEnum[newValue] === undefined) {
	                        $controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.messagebar - Unsupported type: ' +
	                            'The type (\'' + $scope.uifType + '\') is not supported by the Office UI Fabric. ' +
	                            'Supported options are listed here: ' +
	                            'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/messagebar/' +
	                            'messageBarTypeEnum.ts');
	                    }
	                    else {
	                        var className = ' ms-MessageBar--';
	                        $scope.classType = className + newValue;
	                        switch (messageBarTypeEnum_1.MessageBarTypeEnum[newValue]) {
	                            case messageBarTypeEnum_1.MessageBarTypeEnum.error:
	                                $scope.iconType = 'ms-Icon--xCircle';
	                                break;
	                            case messageBarTypeEnum_1.MessageBarTypeEnum.remove:
	                                $scope.iconType = 'ms-Icon--minus ms-Icon--circle';
	                                break;
	                            case messageBarTypeEnum_1.MessageBarTypeEnum.severewarning:
	                                $scope.iconType = 'ms-Icon--alert';
	                                break;
	                            case messageBarTypeEnum_1.MessageBarTypeEnum.success:
	                                $scope.iconType = 'ms-Icon--checkboxCheck ms-Icon--circle';
	                                break;
	                            default:
	                                break;
	                        }
	                    }
	                }
	            });
	            _this.transcludeChilds($scope, $element, $transclude);
	        };
	    }
	    MessageBarDirective.factory = function () {
	        var directive = function ($log, $timeout) {
	            return new MessageBarDirective($log, $timeout);
	        };
	        directive.$inject = ['$log', '$timeout'];
	        return directive;
	    };
	    ;
	    MessageBarDirective.prototype.transcludeChilds = function ($scope, $element, $transclude) {
	        var _this = this;
	        $transclude(function (clone) {
	            var hasContent = _this.hasItemContent(clone, 'uif-content');
	            if (!hasContent) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.MessageBar - ' +
	                    'you need to provide a text for the message bar.\n' +
	                    'For <uif-message-bar> you need to specify' +
	                    '<uif-content> as a child directive');
	            }
	            _this.insertItemContent(clone, $scope, $element);
	        });
	    };
	    MessageBarDirective.prototype.insertItemContent = function (clone, $scope, $element) {
	        var contentElement = angular.element($element[0].querySelector('.ms-MessageBar-text'));
	        if (this.hasItemContent(clone, 'uif-content')) {
	            for (var i = 0; i < clone.length; i++) {
	                var element = angular.element(clone[i]);
	                if (element.hasClass('uif-content')) {
	                    contentElement.append(element);
	                    break;
	                }
	            }
	        }
	        if (this.hasItemContent(clone, 'ms-Link')) {
	            for (var i = 0; i < clone.length; i++) {
	                var element = angular.element(clone[i]);
	                if (element.hasClass('ms-Link')) {
	                    contentElement.append(angular.element('<br />'));
	                    contentElement.append(element);
	                    break;
	                }
	            }
	        }
	    };
	    MessageBarDirective.prototype.hasItemContent = function (clone, selector) {
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass(selector)) {
	                return true;
	            }
	        }
	        return false;
	    };
	    return MessageBarDirective;
	}());
	exports.MessageBarDirective = MessageBarDirective;
	exports.module = angular.module('officeuifabric.components.messagebar', ['officeuifabric.components'])
	    .directive('uifMessageBar', MessageBarDirective.factory());


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	(function (MessageBarTypeEnum) {
	    MessageBarTypeEnum[MessageBarTypeEnum["error"] = 0] = "error";
	    MessageBarTypeEnum[MessageBarTypeEnum["remove"] = 1] = "remove";
	    MessageBarTypeEnum[MessageBarTypeEnum["severewarning"] = 2] = "severewarning";
	    MessageBarTypeEnum[MessageBarTypeEnum["success"] = 3] = "success";
	    MessageBarTypeEnum[MessageBarTypeEnum["warning"] = 4] = "warning";
	})(exports.MessageBarTypeEnum || (exports.MessageBarTypeEnum = {}));
	var MessageBarTypeEnum = exports.MessageBarTypeEnum;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var contextualMenu_1 = __webpack_require__(15);
	var NavBarController = (function () {
	    function NavBarController($scope, $animate, $element, $log) {
	        this.$scope = $scope;
	        this.$animate = $animate;
	        this.$element = $element;
	        this.$log = $log;
	    }
	    NavBarController.prototype.openMobileMenu = function () {
	        var menuVisible = this.$element.hasClass('is-open');
	        this.$animate[menuVisible ? 'removeClass' : 'addClass'](this.$element, 'is-open');
	    };
	    NavBarController.prototype.closeMobileMenu = function () {
	        if (this.$element.hasClass('is-open')) {
	            this.$animate.removeClass(this.$element, 'is-open');
	        }
	    };
	    NavBarController.prototype.closeAllContextMenus = function () {
	        var navBarItems = this.$element[0].querySelectorAll('.ms-NavBar-item');
	        for (var i = 0; i < navBarItems.length; i++) {
	            var ngElement = angular.element(navBarItems[i]);
	            var navBarItemCtrl = ngElement.controller(NavBarItemDirective.directiveName);
	            if (navBarItemCtrl) {
	                navBarItemCtrl.closeContextualMenu();
	                navBarItemCtrl.deselectItem();
	            }
	        }
	    };
	    NavBarController.prototype.hideSearchTextBox = function () {
	        var navBarItems = this.$element[0].querySelectorAll('.ms-NavBar-item--search');
	        for (var i = 0; i < navBarItems.length; i++) {
	            var ngElement = angular.element(navBarItems[i]);
	            var navSearchCtrl = ngElement.controller(NavBarSearch.directiveName);
	            if (navSearchCtrl) {
	                navSearchCtrl.closeSearch();
	            }
	        }
	    };
	    NavBarController.$inject = ['$scope', '$animate', '$element', '$log'];
	    return NavBarController;
	}());
	exports.NavBarController = NavBarController;
	var NavBarDirective = (function () {
	    function NavBarDirective($log, $animate, $document) {
	        var _this = this;
	        this.$log = $log;
	        this.$animate = $animate;
	        this.$document = $document;
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.controller = NavBarController;
	        this.controllerAs = 'nav';
	        this.template = "\n  <div class=\"ms-NavBar\">\n    <div class=\"ms-NavBar-openMenu js-openMenu\" ng-click=\"nav.openMobileMenu()\">\n      <uif-icon uif-type=\"menu\"></uif-icon>\n    </div>\n    <uif-overlay uif-mode=\"{{overlay}}\" ng-click=\"nav.closeMobileMenu()\"></uif-overlay>\n    <ul class=\"ms-NavBar-items\">\n      <div class='uif-nav-items'></div>\n    </ul>\n  </div>";
	        this.scope = {
	            overlay: '@?uifOverlay'
	        };
	        this.link = function ($scope, $element, $attrs, navBarController, $transclude) {
	            _this.$document.on('click', function () {
	                navBarController.closeAllContextMenus();
	                navBarController.hideSearchTextBox();
	            });
	            $transclude(function (clone) {
	                var elementToReplace = angular.element($element[0].querySelector('.uif-nav-items'));
	                elementToReplace.replaceWith(clone);
	            });
	        };
	    }
	    NavBarDirective.factory = function () {
	        var directive = function ($log, $animate, $document) {
	            return new NavBarDirective($log, $animate, $document);
	        };
	        directive.$inject = ['$log', '$animate', '$document'];
	        return directive;
	    };
	    NavBarDirective.directiveName = 'uifNavBar';
	    NavBarDirective.overlayValues = ['light', 'dark'];
	    return NavBarDirective;
	}());
	exports.NavBarDirective = NavBarDirective;
	var NavBarItemTypes;
	(function (NavBarItemTypes) {
	    NavBarItemTypes[NavBarItemTypes["link"] = 0] = "link";
	    NavBarItemTypes[NavBarItemTypes["menu"] = 1] = "menu";
	})(NavBarItemTypes || (NavBarItemTypes = {}));
	var NavBarItemController = (function () {
	    function NavBarItemController($scope, $element) {
	        this.$scope = $scope;
	        this.$element = $element;
	    }
	    NavBarItemController.prototype.closeContextualMenu = function () {
	        if (this.$scope.hasChildMenu) {
	            this.$scope.contextMenuCtrl.closeMenu();
	        }
	    };
	    NavBarItemController.prototype.deselectItem = function () {
	        this.$element.removeClass('is-selected');
	    };
	    NavBarItemController.$inject = ['$scope', '$element'];
	    return NavBarItemController;
	}());
	exports.NavBarItemController = NavBarItemController;
	var NavBarItemDirective = (function () {
	    function NavBarItemDirective($log) {
	        var _this = this;
	        this.$log = $log;
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.controller = NavBarItemController;
	        this.require = "^" + NavBarDirective.directiveName;
	        this.scope = {
	            isDisabled: '@?disabled',
	            position: '@?uifPosition',
	            text: '=?uifText',
	            type: '@?uifType'
	        };
	        this.templateTypes = {};
	        this.template = function ($element, $attrs) {
	            var type = $attrs.uifType;
	            if (angular.isUndefined(type)) {
	                return _this.templateTypes[NavBarItemTypes.link];
	            }
	            if (NavBarItemTypes[type] === undefined) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.navbar - unsupported nav bar item type:\n' +
	                    'the type \'' + type + '\' is not supported by ng-Office UI Fabric as valid type for nav bar item.' +
	                    'Supported types can be found under NavBarItemTypes enum here:\n' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/navbar/navbarDirective.ts');
	                return '<div></div>';
	            }
	            return _this.templateTypes[NavBarItemTypes[type]];
	        };
	        this.link = function ($scope, $element, $attrs, navBarController, $transclude) {
	            if ($scope.isDisabled) {
	                var navBarLinkEelement = angular.element($element[0].querySelector('.ms-NavBar-link'));
	                navBarLinkEelement.removeAttr('href');
	            }
	            if (angular.isUndefined($scope.type)) {
	                $scope.type = NavBarItemTypes[NavBarItemTypes.link];
	            }
	            $scope.selectItem = function ($event) {
	                $event.stopPropagation();
	                if ($element.hasClass('is-disabled')) {
	                    return;
	                }
	                $element.parent().find('li').removeClass('is-selected');
	                navBarController.closeAllContextMenus();
	                navBarController.hideSearchTextBox();
	                $element.toggleClass('is-selected');
	                if ($scope.hasChildMenu && $scope.contextMenuCtrl.isMenuOpened()) {
	                    $scope.contextMenuCtrl.closeMenu();
	                    $element.removeClass('is-selected');
	                }
	                else if ($scope.hasChildMenu && !$scope.contextMenuCtrl.isMenuOpened()) {
	                    $scope.contextMenuCtrl.openMenu();
	                    $element.addClass('is-selected');
	                }
	                else if (!$scope.hasChildMenu) {
	                    navBarController.closeMobileMenu();
	                }
	                $scope.$apply();
	            };
	            $element.on('click', $scope.selectItem);
	            _this.transcludeChilds($scope, $element, $transclude);
	            var contextMenuCtrl = angular.element($element[0].querySelector('.ms-ContextualMenu'))
	                .controller(contextualMenu_1.ContextualMenuDirective.directiveName);
	            if (contextMenuCtrl) {
	                $scope.hasChildMenu = true;
	                $scope.contextMenuCtrl = contextMenuCtrl;
	                $scope.contextMenuCtrl.onRootMenuClosed.push(function () {
	                    navBarController.closeMobileMenu();
	                    $element.removeClass('is-selected');
	                });
	            }
	        };
	        this.templateTypes[NavBarItemTypes.link] = "\n    <li class=\"ms-NavBar-item\"\n    ng-class=\"{'is-disabled': isDisabled, 'ms-NavBar-item--right': position === 'right'}\">\n      <a class=\"ms-NavBar-link\" href=\"\"><span class='uif-nav-item-content'></span></a>\n    </li>";
	        this.templateTypes[NavBarItemTypes.menu] = "\n    <li class=\"ms-NavBar-item ms-NavBar-item--hasMenu\" ng-class=\"{'is-disabled': isDisabled}\">\n      <a class=\"ms-NavBar-link\" href=\"\"><span class='uif-nav-item-content'></span></a>\n      <i class=\"ms-NavBar-chevronDown ms-Icon ms-Icon--chevronDown\"></i>\n      <div class='uif-submenu'></div>\n    </li>";
	    }
	    NavBarItemDirective.factory = function () {
	        var directive = function ($log) { return new NavBarItemDirective($log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    NavBarItemDirective.prototype.transcludeChilds = function ($scope, $element, $transclude) {
	        var _this = this;
	        $transclude(function (clone) {
	            var hasContent = _this.hasItemContent(clone);
	            if (!hasContent && !$scope.text) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.navbar - ' +
	                    'you need to provide a text for a nav bar menu item.\n' +
	                    'For <uif-nav-bar-item> you need to specify either \'uif-text\' as attribute or <uif-nav-item-content> as a child directive');
	            }
	            _this.insertLink(clone, $scope, $element);
	            _this.insertMenu(clone, $scope, $element);
	        });
	    };
	    NavBarItemDirective.prototype.insertLink = function (clone, $scope, $element) {
	        var elementToReplace = angular.element($element[0].querySelector('.uif-nav-item-content'));
	        if (this.hasItemContent(clone)) {
	            for (var i = 0; i < clone.length; i++) {
	                var element = angular.element(clone[i]);
	                if (element.hasClass('uif-content')) {
	                    elementToReplace.replaceWith(element);
	                    break;
	                }
	            }
	        }
	        else {
	            elementToReplace.replaceWith(angular.element('<span>' + $scope.text + '</span>'));
	        }
	    };
	    NavBarItemDirective.prototype.insertMenu = function (clone, $scope, $element) {
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass('ms-ContextualMenu')) {
	                angular.element($element[0].querySelector('.uif-submenu')).replaceWith(element);
	            }
	        }
	    };
	    NavBarItemDirective.prototype.hasItemContent = function (clone) {
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass('uif-content')) {
	                return true;
	            }
	        }
	        return false;
	    };
	    NavBarItemDirective.directiveName = 'uifNavBarItem';
	    return NavBarItemDirective;
	}());
	exports.NavBarItemDirective = NavBarItemDirective;
	var NavBarSearchController = (function () {
	    function NavBarSearchController($scope, $element, $document, $animate, $timeout) {
	        this.$scope = $scope;
	        this.$element = $element;
	        this.$document = $document;
	        this.$animate = $animate;
	        this.$timeout = $timeout;
	    }
	    NavBarSearchController.prototype.closeSearch = function () {
	        var _this = this;
	        this.$timeout(function () {
	            if (!_this.$scope.searchText) {
	                _this.$animate.removeClass(_this.$element, 'is-open');
	            }
	            _this.$animate.removeClass(_this.$element, 'is-selected');
	        });
	    };
	    NavBarSearchController.$inject = ['$scope', '$element', '$document', '$animate', '$timeout'];
	    return NavBarSearchController;
	}());
	exports.NavBarSearchController = NavBarSearchController;
	var NavBarSearch = (function () {
	    function NavBarSearch($document, $animate, $timeout) {
	        var _this = this;
	        this.$document = $document;
	        this.$animate = $animate;
	        this.$timeout = $timeout;
	        this.replace = true;
	        this.restrict = 'E';
	        this.controller = NavBarSearchController;
	        this.require = [("^" + NavBarDirective.directiveName), ("" + NavBarSearch.directiveName)];
	        this.transclude = true;
	        this.scope = {
	            onSearchCallback: '&?uifOnSearch',
	            placeholder: '@?placeholder'
	        };
	        this.template = "\n    <li class=\"ms-NavBar-item ms-NavBar-item--search ms-u-hiddenSm\" ng-click=\"onSearch($event)\">\n      <div class=\"ms-TextField\" ng-click=\"skipOnClick($event)\">\n        <input placeholder={{placeholder}} class=\"ms-TextField-field\" type=\"text\" ng-keypress=\"onSearch($event)\" ng-model=\"searchText\">\n      </div>\n    </li>";
	        this.link = function ($scope, $element, $attrs, ctrls, $transclude) {
	            _this.$document.on('click', function () {
	                ctrls[1].closeSearch();
	            });
	            $scope.skipOnClick = function ($event) {
	                _this.applyCssClasses($element);
	                $event.stopPropagation();
	            };
	            $scope.onSearch = function ($event) {
	                ctrls[0].closeAllContextMenus();
	                if ($event instanceof KeyboardEvent && $event.which === 13 && $scope.onSearchCallback) {
	                    $scope.onSearchCallback({ search: $scope.searchText });
	                }
	                else if ($event instanceof MouseEvent && $element.hasClass('is-open') && $scope.onSearchCallback) {
	                    $scope.onSearchCallback({ search: $scope.searchText });
	                }
	                _this.applyCssClasses($element);
	                $event.stopPropagation();
	            };
	        };
	    }
	    NavBarSearch.factory = function () {
	        var directive = function ($document, $animate, $timeout) {
	            return new NavBarSearch($document, $animate, $timeout);
	        };
	        directive.$inject = ['$document', '$animate', '$timeout'];
	        return directive;
	    };
	    NavBarSearch.prototype.applyCssClasses = function ($element) {
	        if (!$element.hasClass('is-open')) {
	            this.$animate.addClass($element, 'is-open');
	            this.$timeout(function () {
	                angular.element($element[0].querySelector('.ms-TextField-field'))[0].focus();
	            }, 1);
	        }
	        $element.parent().find('li').removeClass('is-selected');
	        this.$animate.addClass($element, 'is-selected');
	    };
	    NavBarSearch.directiveName = 'uifNavBarSearch';
	    return NavBarSearch;
	}());
	exports.NavBarSearch = NavBarSearch;
	exports.module = angular.module('officeuifabric.components.navbar', [
	    'officeuifabric.components'])
	    .directive(NavBarDirective.directiveName, NavBarDirective.factory())
	    .directive(NavBarItemDirective.directiveName, NavBarItemDirective.factory())
	    .directive(NavBarSearch.directiveName, NavBarSearch.factory());


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var overlayModeEnum_1 = __webpack_require__(34);
	var OverlayController = (function () {
	    function OverlayController(log) {
	        this.log = log;
	    }
	    OverlayController.$inject = ['$log'];
	    return OverlayController;
	}());
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
	            if (overlayModeEnum_1.OverlayMode[newValue] === undefined) {
	                OverlayDirective.log.error('Error [ngOfficeUiFabric] officeuifabric.components.overlay - Unsupported overlay mode: ' +
	                    'The overlay mode (\'' + scope.uifMode + '\') is not supported by the Office UI Fabric. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/overlay/overlayModeEnum.ts');
	            }
	        });
	    };
	    ;
	    return OverlayDirective;
	}());
	exports.OverlayDirective = OverlayDirective;
	exports.module = angular.module('officeuifabric.components.overlay', [
	    'officeuifabric.components'
	])
	    .directive('uifOverlay', OverlayDirective.factory());


/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	(function (OverlayMode) {
	    OverlayMode[OverlayMode["light"] = 0] = "light";
	    OverlayMode[OverlayMode["dark"] = 1] = "dark";
	})(exports.OverlayMode || (exports.OverlayMode = {}));
	var OverlayMode = exports.OverlayMode;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var panelDirectiveEnum_1 = __webpack_require__(36);
	var PanelDirective = (function () {
	    function PanelDirective($log, $animate, $timeout) {
	        this.$log = $log;
	        this.$animate = $animate;
	        this.$timeout = $timeout;
	        this.restrict = 'E';
	        this.template = "<div class=\"ms-Panel\">\n                              <div  class=\"ms-Overlay\"\n                                    ng-click=\"uifIsLightDismiss && closePanel()\"\n                                    ng-class=\"uifShowOverlay === true ? 'ms-Overlay--dark' : '';\"></div>\n                              <div class=\"ms-Panel-main\">\n                                <div class=\"ms-Panel-commands\">\n                                  <button type=\"button\" ng-if=\"uifShowClose\" class='ms-Panel-closeButton' ng-click=\"closePanel()\">\n                                    <uif-icon uif-type='x'></uif-icon>\n                                  </button>\n                                </div>\n                                <div class=\"ms-Panel-contentInner\">\n                                </div>\n                              </div>\n                             </div>";
	        this.transclude = true;
	        this.replace = true;
	        this.controller = PanelController;
	        this.scope = {
	            uifIsLightDismiss: '=',
	            uifIsOpen: '=',
	            uifShowClose: '=',
	            uifShowOverlay: '=',
	            uifType: '@'
	        };
	    }
	    PanelDirective.factory = function () {
	        var directive = function ($log, $animate, $timeout) {
	            return new PanelDirective($log, $animate, $timeout);
	        };
	        directive.$inject = ['$log', '$animate', '$timeout'];
	        return directive;
	    };
	    PanelDirective.prototype.compile = function (element, attrs, transclude) {
	        return {
	            pre: this.preLink
	        };
	    };
	    PanelDirective.prototype.preLink = function (scope, elem, attrs, ctrl, transclude) {
	        transclude(function (clone) {
	            for (var i = 0; i < clone.length; i++) {
	                if (angular.element(clone[i]).hasClass('ms-CommandBar')) {
	                    angular.element(elem[0].querySelector('div.ms-Panel-commands')).prepend(clone[i]);
	                }
	                else if (scope.uifType === 'left') {
	                    angular.element(elem[0].querySelector('div.ms-Panel-main')).append(clone[i]);
	                }
	                else {
	                    angular.element(elem[0].querySelector('div.ms-Panel-contentInner')).append(clone[i]);
	                }
	            }
	        });
	        scope.closePanel = function () {
	            scope.uifIsOpen = false;
	        };
	    };
	    return PanelDirective;
	}());
	exports.PanelDirective = PanelDirective;
	var PanelController = (function () {
	    function PanelController($scope, $animate, $element, $log, $timeout) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$animate = $animate;
	        this.$element = $element;
	        this.$log = $log;
	        this.$timeout = $timeout;
	        this.uifPanelSizeClasses = (_a = {},
	            _a[panelDirectiveEnum_1.PanelTypes.small] = 'ms-Panel--sm',
	            _a[panelDirectiveEnum_1.PanelTypes.medium] = 'ms-Panel--md',
	            _a[panelDirectiveEnum_1.PanelTypes.large] = 'ms-Panel--lg',
	            _a[panelDirectiveEnum_1.PanelTypes.extralarge] = 'ms-Panel--xl',
	            _a[panelDirectiveEnum_1.PanelTypes.extraextralarge] = 'ms-Panel--xxl',
	            _a[panelDirectiveEnum_1.PanelTypes.left] = 'ms-Panel--left',
	            _a
	        );
	        if (!$scope.uifType) {
	            $scope.uifType = 'medium';
	        }
	        if (panelDirectiveEnum_1.PanelTypes[$scope.uifType] === undefined) {
	            this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.panel - unsupported panel type:\n' +
	                'the type \'' + $scope.uifType + '\' is not supported by ng-Office UI Fabric as valid type for panels.' +
	                'Supported types can be found under PanelTypes enum here:\n' +
	                'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/panel/panel.ts');
	            $scope.uifType = 'medium';
	        }
	        var size = panelDirectiveEnum_1.PanelTypes[$scope.uifType];
	        $element.addClass(this.uifPanelSizeClasses[size]);
	        $scope.$watch('uifIsOpen', function (newValue) {
	            if (typeof newValue !== 'boolean' && newValue !== undefined) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.panel - invalid attribute type: \'uif-is-open\'.\n' +
	                    'The type \'' + typeof newValue + '\' is not supported as valid type for \'uif-is-open\' attribute for ' +
	                    '<uif-panel/>. The valid type is boolean.');
	            }
	            if (newValue === true) {
	                $animate.addClass(_this.$element, 'ms-Panel-animateIn');
	                $element.addClass('is-open');
	                if ($element[0].querySelector('.ms-CommandBar')) {
	                    angular.element($element[0].querySelector('.ms-CommandBar')).scope().$broadcast('uif-command-bar-resize');
	                }
	            }
	            else {
	                $animate.addClass(_this.$element, 'ms-Panel-animateOut');
	                $timeout(function () {
	                    $element.removeClass('ms-Panel-animateIn ms-Panel-animateOut');
	                    $element.removeClass('is-open');
	                }, 500);
	            }
	        });
	        var _a;
	    }
	    PanelController.$inject = ['$scope', '$animate', '$element', '$log', '$timeout'];
	    return PanelController;
	}());
	exports.PanelController = PanelController;
	var PanelHeaderDirective = (function () {
	    function PanelHeaderDirective() {
	        this.restrict = 'E';
	        this.template = '<p class="ms-Panel-headerText" ng-transclude></div>';
	        this.transclude = true;
	        this.replace = true;
	        this.scope = {
	            uifHeaderText: '@'
	        };
	    }
	    PanelHeaderDirective.factory = function () {
	        var directive = function () { return new PanelHeaderDirective(); };
	        return directive;
	    };
	    return PanelHeaderDirective;
	}());
	exports.PanelHeaderDirective = PanelHeaderDirective;
	exports.module = angular.module('officeuifabric.components.panel', [
	    'officeuifabric.components'
	])
	    .directive('uifPanel', PanelDirective.factory())
	    .directive('uifPanelHeader', PanelHeaderDirective.factory());


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	(function (PanelTypes) {
	    PanelTypes[PanelTypes["small"] = 0] = "small";
	    PanelTypes[PanelTypes["medium"] = 1] = "medium";
	    PanelTypes[PanelTypes["large"] = 2] = "large";
	    PanelTypes[PanelTypes["extralarge"] = 3] = "extralarge";
	    PanelTypes[PanelTypes["extraextralarge"] = 4] = "extraextralarge";
	    PanelTypes[PanelTypes["left"] = 5] = "left";
	})(exports.PanelTypes || (exports.PanelTypes = {}));
	var PanelTypes = exports.PanelTypes;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var sizeEnum_1 = __webpack_require__(38);
	var placeholderEnum_1 = __webpack_require__(39);
	var personaStyleEnum_1 = __webpack_require__(40);
	var personaPresenceEnum_1 = __webpack_require__(41);
	var PersonaCardDirective = (function () {
	    function PersonaCardDirective() {
	        var _this = this;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.require = ['uifPersonaCard'];
	        this.controller = PersonaCardController;
	        this.scope = {
	            'uifImageUrl': '@',
	            'uifPresence': '@',
	            'uifSize': '@'
	        };
	        this.template = '<div class="ms-PersonaCard" ng-class="getPersonaCardClasses()">' +
	            '<div class="ms-PersonaCard-persona">' +
	            '<div class="ms-Persona" ng-class="getPersonaClasses()">' +
	            '<div class="ms-Persona-imageArea">' +
	            '<uif-icon uif-type="person"></uif-icon>' +
	            '<img class="ms-Persona-image" ng-src="{{uifImageUrl}}" ng-if="uifImageUrl">' +
	            '</div>' +
	            '<div class="ms-Persona-presence"></div>' +
	            '<div class="ms-Persona-details"></div>' +
	            '</div>' +
	            '</div>' +
	            '<ul class="ms-PersonaCard-actions">' +
	            '<li ng-repeat="action in personaCardActions" ng-class="getActionClasses(action)" ng-click="selectAction($event, action)">' +
	            '<uif-icon uif-type={{action.icon}} ng-if="action.placeholder != \'overflow\'"></uif-icon>' +
	            '</li>' +
	            '</ul>' +
	            '<div class="ms-PersonaCard-actionDetailBox">' +
	            '<ul ng-class="detailClass"></ul>' +
	            '</div>' +
	            '</div>';
	        this.link = function (scope, element, attrs, controllers, transclude) {
	            var personaCardController = controllers[0];
	            var icon = element.find('uif-icon');
	            icon.addClass('ms-Persona-placeholder');
	            if (angular.isDefined(attrs.uifSize) && angular.isUndefined(sizeEnum_1.PersonaSize[attrs.uifSize])) {
	                personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
	                    attrs.uifSize + '" is not a valid value for uifSize. It should be xsmall, small, medium, large, xlarge.');
	                return;
	            }
	            if (angular.isDefined(attrs.uifStyle) && angular.isUndefined(personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle])) {
	                personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
	                    attrs.uifStyle + '" is not a valid value for uifStyle. It should be round or square.');
	                return;
	            }
	            if (angular.isDefined(attrs.uifPresence) && angular.isUndefined(personaPresenceEnum_1.PresenceEnum[attrs.uifPresence])) {
	                personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
	                    attrs.uifPresence + '" is not a valid value for uifPresence. It should be available, away, blocked, busy, dnd or offline.');
	                return;
	            }
	            scope.getActionClasses = function (action) {
	                var actionClasses = [];
	                var placeholder = placeholderEnum_1.PlaceholderEnum[action.placeholder];
	                switch (placeholder) {
	                    case placeholderEnum_1.PlaceholderEnum.topright:
	                        actionClasses.push('ms-PersonaCard-action');
	                        actionClasses.push('ms-PersonaCard-orgChart');
	                        break;
	                    case placeholderEnum_1.PlaceholderEnum.regular:
	                        actionClasses.push('ms-PersonaCard-action');
	                        break;
	                    default:
	                        break;
	                }
	                if (action.isActive) {
	                    actionClasses.push('is-active');
	                }
	                return actionClasses.join(' ');
	            };
	            scope.getPersonaClasses = function () {
	                var personaClasses = [];
	                if (personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle] === personaStyleEnum_1.PersonaStyleEnum.square) {
	                    personaClasses.push('ms-Persona--square');
	                }
	                switch (sizeEnum_1.PersonaSize[attrs.uifSize]) {
	                    case sizeEnum_1.PersonaSize.xsmall:
	                        personaClasses.push('ms-Persona--xs');
	                        break;
	                    case sizeEnum_1.PersonaSize.small:
	                        personaClasses.push('ms-Persona--sm');
	                        break;
	                    case sizeEnum_1.PersonaSize.large:
	                        personaClasses.push('ms-Persona--lg');
	                        break;
	                    case sizeEnum_1.PersonaSize.xlarge:
	                        personaClasses.push('ms-Persona--xl');
	                        break;
	                    default:
	                        break;
	                }
	                switch (personaPresenceEnum_1.PresenceEnum[attrs.uifPresence]) {
	                    case personaPresenceEnum_1.PresenceEnum.available:
	                        personaClasses.push('ms-Persona--available');
	                        break;
	                    case personaPresenceEnum_1.PresenceEnum.away:
	                        personaClasses.push('ms-Persona--away');
	                        break;
	                    case personaPresenceEnum_1.PresenceEnum.blocked:
	                        personaClasses.push('ms-Persona--blocked');
	                        break;
	                    case personaPresenceEnum_1.PresenceEnum.busy:
	                        personaClasses.push('ms-Persona--busy');
	                        break;
	                    case personaPresenceEnum_1.PresenceEnum.dnd:
	                        personaClasses.push('ms-Persona--dnd');
	                        break;
	                    default:
	                        personaClasses.push('ms-Persona--offline');
	                        break;
	                }
	                return personaClasses.join(' ');
	            };
	            scope.getPersonaCardClasses = function () {
	                return personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle] === personaStyleEnum_1.PersonaStyleEnum.square ? 'ms-PersonaCard--square' : '';
	            };
	            transclude(function (clone) {
	                var detailsWrapper = angular.element(element[0].getElementsByClassName('ms-Persona-details'));
	                var actionDetailsBoxList = angular.element(element[0].getElementsByClassName('ms-PersonaCard-actionDetailBox'))
	                    .find('ul').eq(0);
	                var actionsList = angular.element(element[0].getElementsByClassName('ms-PersonaCard-actions'));
	                for (var i = 0; i < clone.length; i++) {
	                    var tagName = clone[i].tagName;
	                    switch (tagName) {
	                        case 'UIF-PERSONA-CARD-PRIMARY-TEXT':
	                        case 'UIF-PERSONA-CARD-SECONDARY-TEXT':
	                        case 'UIF-PERSONA-CARD-TERTIARY-TEXT':
	                        case 'UIF-PERSONA-CARD-OPTIONAL-TEXT':
	                            detailsWrapper.append(clone[i]);
	                            break;
	                        case 'UIF-PERSONA-CARD-ACTION':
	                            var wrappedAction = angular.element(clone[i]);
	                            var placeholder = wrappedAction.attr('uif-placeholder');
	                            if (placeholderEnum_1.PlaceholderEnum[placeholder] === placeholderEnum_1.PlaceholderEnum.overflow) {
	                                actionsList.append(wrappedAction);
	                            }
	                            else {
	                                actionDetailsBoxList.append(_this.processAction(wrappedAction, scope, personaCardController));
	                            }
	                            break;
	                        default:
	                            break;
	                    }
	                }
	            });
	        };
	    }
	    PersonaCardDirective.factory = function () {
	        var directive = function () { return new PersonaCardDirective(); };
	        return directive;
	    };
	    PersonaCardDirective.prototype.processAction = function (clone, scope, personaCardController) {
	        var classToAdd = '';
	        var placeholder = clone.attr('uif-placeholder');
	        var icon = clone.attr('uif-icon');
	        var actionToAdd = new PersonaCardAction(icon, placeholder);
	        switch (placeholder) {
	            case placeholderEnum_1.PlaceholderEnum[placeholderEnum_1.PlaceholderEnum.regular]:
	                classToAdd = 'detail-' + (++scope.regularActionsCount);
	                break;
	            case placeholderEnum_1.PlaceholderEnum[placeholderEnum_1.PlaceholderEnum.topright]:
	                classToAdd = 'detail-5';
	                break;
	            default:
	                break;
	        }
	        clone.find('li').eq(0).addClass(classToAdd);
	        actionToAdd.detailClass = classToAdd;
	        personaCardController.addAction(actionToAdd);
	        return clone;
	    };
	    ;
	    return PersonaCardDirective;
	}());
	exports.PersonaCardDirective = PersonaCardDirective;
	var PersonaCardController = (function () {
	    function PersonaCardController($log, $scope) {
	        var _this = this;
	        this.$log = $log;
	        this.$scope = $scope;
	        this.detailCss = {
	            1: 'Chat',
	            2: 'Phone',
	            3: 'Video',
	            4: 'Mail',
	            5: 'Org'
	        };
	        $scope.personaCardActions = new Array();
	        $scope.regularActionsCount = 0;
	        $scope.detailClass = 'ms-PersonaCard-detailChat';
	        $scope.selectAction = function ($event, action) {
	            $scope.personaCardActions.forEach(function (value) {
	                value.isActive = false;
	            });
	            action.isActive = true;
	            var detailNumber = +(action.detailClass.charAt(action.detailClass.length - 1));
	            $scope.detailClass = 'ms-PersonaCard-detail' + _this.detailCss[detailNumber];
	        };
	    }
	    PersonaCardController.prototype.addAction = function (actionToAdd) {
	        if (this.$scope.personaCardActions.length === 0) {
	            actionToAdd.isActive = true;
	        }
	        this.$scope.personaCardActions.push(actionToAdd);
	    };
	    PersonaCardController.$inject = ['$log', '$scope'];
	    return PersonaCardController;
	}());
	exports.PersonaCardController = PersonaCardController;
	var PersonaCardAction = (function () {
	    function PersonaCardAction(icon, placeholder) {
	        this.icon = icon;
	        this.placeholder = placeholder;
	    }
	    return PersonaCardAction;
	}());
	var PersonaCardTextDirective = (function () {
	    function PersonaCardTextDirective(directiveType) {
	        var _this = this;
	        this.directiveType = directiveType;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.scope = false;
	        this.availableClasses = {
	            'optional': 'ms-Persona-optionalText',
	            'primary': 'ms-Persona-primaryText',
	            'secondary': 'ms-Persona-secondaryText',
	            'tertiary': 'ms-Persona-tertiaryText'
	        };
	        this.template = function ($element, $attrs) {
	            var directiveTemplate = '<div class="' + _this.availableClasses[_this.directiveType] + '" ng-transclude></div>';
	            return directiveTemplate;
	        };
	        if (angular.isUndefined(this.availableClasses[this.directiveType])) {
	            this.directiveType = 'optional';
	        }
	    }
	    PersonaCardTextDirective.factory = function (type) {
	        var directive = function () { return new PersonaCardTextDirective(type); };
	        return directive;
	    };
	    return PersonaCardTextDirective;
	}());
	exports.PersonaCardTextDirective = PersonaCardTextDirective;
	var PersonaCardActionDirective = (function () {
	    function PersonaCardActionDirective($log) {
	        var _this = this;
	        this.$log = $log;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.require = '^?uifPersonaCard';
	        this.scope = false;
	        this.template = function (instanceElement, actionAttrs) {
	            if (angular.isDefined(actionAttrs.uifPlaceholder) && angular.isUndefined(placeholderEnum_1.PlaceholderEnum[actionAttrs.uifPlaceholder])) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - ' +
	                    '"' + actionAttrs.uifPlaceholder + '" is not a valid value for uifPlaceholder. It should be regular, topright or overflow.');
	                return '';
	            }
	            if (placeholderEnum_1.PlaceholderEnum[actionAttrs.uifPlaceholder] === placeholderEnum_1.PlaceholderEnum.overflow) {
	                return '<li class="ms-PersonaCard-overflow" ng-transclude></li>';
	            }
	            return '<li class="ms-PersonaCard-actionDetails" ng-transclude></li>';
	        };
	    }
	    PersonaCardActionDirective.factory = function () {
	        var directive = function ($log) { return new PersonaCardActionDirective($log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    ;
	    return PersonaCardActionDirective;
	}());
	exports.PersonaCardActionDirective = PersonaCardActionDirective;
	var PersonaCardDetailLabelDirective = (function () {
	    function PersonaCardDetailLabelDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.scope = false;
	        this.template = '<span class="ms-PersonaCard-detailLabel" ng-transclude></span>';
	    }
	    PersonaCardDetailLabelDirective.factory = function () {
	        var directive = function () { return new PersonaCardDetailLabelDirective(); };
	        return directive;
	    };
	    return PersonaCardDetailLabelDirective;
	}());
	exports.PersonaCardDetailLabelDirective = PersonaCardDetailLabelDirective;
	var PersonaCardDetailLineDirective = (function () {
	    function PersonaCardDetailLineDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.scope = false;
	        this.template = '<div class="ms-PersonaCard-detailLine" ng-transclude></div>';
	    }
	    PersonaCardDetailLineDirective.factory = function () {
	        var directive = function () { return new PersonaCardDetailLineDirective(); };
	        return directive;
	    };
	    return PersonaCardDetailLineDirective;
	}());
	exports.PersonaCardDetailLineDirective = PersonaCardDetailLineDirective;
	exports.module = angular.module('officeuifabric.components.personacard', ['officeuifabric.components'])
	    .directive('uifPersonaCard', PersonaCardDirective.factory())
	    .directive('uifPersonaCardAction', PersonaCardActionDirective.factory())
	    .directive('uifPersonaCardDetailLabel', PersonaCardDetailLabelDirective.factory())
	    .directive('uifPersonaCardDetailLine', PersonaCardDetailLineDirective.factory())
	    .directive('uifPersonaCardPrimaryText', PersonaCardTextDirective.factory('primary'))
	    .directive('uifPersonaCardSecondaryText', PersonaCardTextDirective.factory('secondary'))
	    .directive('uifPersonaCardTertiaryText', PersonaCardTextDirective.factory('tertiary'))
	    .directive('uifPersonaCardOptionalText', PersonaCardTextDirective.factory(''));


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	(function (PersonaSize) {
	    PersonaSize[PersonaSize["xsmall"] = 0] = "xsmall";
	    PersonaSize[PersonaSize["small"] = 1] = "small";
	    PersonaSize[PersonaSize["medium"] = 2] = "medium";
	    PersonaSize[PersonaSize["large"] = 3] = "large";
	    PersonaSize[PersonaSize["xlarge"] = 4] = "xlarge";
	})(exports.PersonaSize || (exports.PersonaSize = {}));
	var PersonaSize = exports.PersonaSize;
	;


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	(function (PlaceholderEnum) {
	    PlaceholderEnum[PlaceholderEnum["regular"] = 0] = "regular";
	    PlaceholderEnum[PlaceholderEnum["topright"] = 1] = "topright";
	    PlaceholderEnum[PlaceholderEnum["overflow"] = 2] = "overflow";
	})(exports.PlaceholderEnum || (exports.PlaceholderEnum = {}));
	var PlaceholderEnum = exports.PlaceholderEnum;


/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	(function (PersonaStyleEnum) {
	    PersonaStyleEnum[PersonaStyleEnum["round"] = 0] = "round";
	    PersonaStyleEnum[PersonaStyleEnum["square"] = 1] = "square";
	})(exports.PersonaStyleEnum || (exports.PersonaStyleEnum = {}));
	var PersonaStyleEnum = exports.PersonaStyleEnum;


/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	(function (PresenceEnum) {
	    PresenceEnum[PresenceEnum["available"] = 0] = "available";
	    PresenceEnum[PresenceEnum["away"] = 1] = "away";
	    PresenceEnum[PresenceEnum["blocked"] = 2] = "blocked";
	    PresenceEnum[PresenceEnum["busy"] = 3] = "busy";
	    PresenceEnum[PresenceEnum["dnd"] = 4] = "dnd";
	    PresenceEnum[PresenceEnum["offline"] = 5] = "offline";
	})(exports.PresenceEnum || (exports.PresenceEnum = {}));
	var PresenceEnum = exports.PresenceEnum;
	;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var personaStyleEnum_1 = __webpack_require__(40);
	var personaPresenceEnum_1 = __webpack_require__(41);
	var personaInitialsColorEnum_1 = __webpack_require__(43);
	var sizeEnum_1 = __webpack_require__(44);
	var PersonaTextDirective = (function () {
	    function PersonaTextDirective(directiveType) {
	        var _this = this;
	        this.directiveType = directiveType;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.scope = false;
	        this.availableClasses = {
	            'optional': 'ms-Persona-optionalText',
	            'primary': 'ms-Persona-primaryText',
	            'secondary': 'ms-Persona-secondaryText',
	            'tertiary': 'ms-Persona-tertiaryText'
	        };
	        this.template = function ($element, $attrs) {
	            var directiveTemplate = '<div class="' + _this.availableClasses[_this.directiveType] + '" ng-transclude></div>';
	            return directiveTemplate;
	        };
	        if (angular.isUndefined(this.availableClasses[this.directiveType])) {
	            this.directiveType = 'optional';
	        }
	    }
	    PersonaTextDirective.factory = function (type) {
	        var directive = function () { return new PersonaTextDirective(type); };
	        return directive;
	    };
	    return PersonaTextDirective;
	}());
	exports.PersonaTextDirective = PersonaTextDirective;
	var PersonaInitialsDirective = (function () {
	    function PersonaInitialsDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.require = ['^uifPersona'];
	        this.scope = {
	            'uifColor': '@'
	        };
	        this.template = '<div class="ms-Persona-initials ms-Persona-initials--{{uifColor}}" ng-transclude></div> ';
	        this.link = function (scope, element, attrs, ctrls) {
	            var personaController = ctrls[0];
	            if (angular.isUndefined(attrs.uifColor)) {
	                scope.uifColor = personaInitialsColorEnum_1.PersonaInitialsColor[personaInitialsColorEnum_1.PersonaInitialsColor.blue];
	            }
	            scope.$watch('uifColor', function (newColor) {
	                if (angular.isUndefined(personaInitialsColorEnum_1.PersonaInitialsColor[newColor])) {
	                    personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' + newColor + '"' +
	                        ' is not a valid value for uifColor.' +
	                        ' It should be lightBlue, blue, darkBlue, teal, lightGreen, green,' +
	                        ' darkGreen, lightPink, pink, magenta, purple, black, orange, red or darkRed.');
	                }
	            });
	        };
	    }
	    PersonaInitialsDirective.factory = function () {
	        var directive = function () { return new PersonaInitialsDirective(); };
	        return directive;
	    };
	    return PersonaInitialsDirective;
	}());
	exports.PersonaInitialsDirective = PersonaInitialsDirective;
	var PersonaDirective = (function () {
	    function PersonaDirective() {
	        var _this = this;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.require = ['uifPersona'];
	        this.controller = PersonaController;
	        this.scope = {
	            'uifImageUrl': '@',
	            'uifPresence': '@',
	            'uifSize': '@'
	        };
	        this.template = '<div class="ms-Persona" ng-class="getPersonaClasses()">' +
	            '<div class="ms-Persona-imageArea" ng-show="getImageAreaVisibility()">' +
	            '<img class="ms-Persona-image" ng-src="{{uifImageUrl}}" ng-if="uifImageUrl">' +
	            '</div>' +
	            '<div class="ms-Persona-presence"></div>' +
	            '<div class="ms-Persona-details"></div>' +
	            '</div>';
	        this.uifSizeClasses = (_a = {},
	            _a[sizeEnum_1.PersonaSize.tiny] = 'ms-Persona--tiny',
	            _a[sizeEnum_1.PersonaSize.xsmall] = 'ms-Persona--xs',
	            _a[sizeEnum_1.PersonaSize.small] = 'ms-Persona--sm',
	            _a[sizeEnum_1.PersonaSize.large] = 'ms-Persona--lg',
	            _a[sizeEnum_1.PersonaSize.xlarge] = 'ms-Persona--xl',
	            _a
	        );
	        this.uifPresenceClasses = (_b = {},
	            _b[personaPresenceEnum_1.PresenceEnum.available] = 'ms-Persona--available',
	            _b[personaPresenceEnum_1.PresenceEnum.away] = 'ms-Persona--away',
	            _b[personaPresenceEnum_1.PresenceEnum.blocked] = 'ms-Persona--blocked',
	            _b[personaPresenceEnum_1.PresenceEnum.busy] = 'ms-Persona--busy',
	            _b[personaPresenceEnum_1.PresenceEnum.dnd] = 'ms-Persona--dnd',
	            _b[personaPresenceEnum_1.PresenceEnum.offline] = 'ms-Persona--offline',
	            _b
	        );
	        this.link = function (scope, element, attrs, controllers, transclude) {
	            var personaController = controllers[0];
	            if (angular.isDefined(attrs.uifSize) && angular.isUndefined(sizeEnum_1.PersonaSize[attrs.uifSize])) {
	                personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
	                    attrs.uifSize + '" is not a valid value for uifSize. It should be tiny, xsmall, small, medium, large, xlarge.');
	                return;
	            }
	            if (angular.isDefined(attrs.uifStyle) && angular.isUndefined(personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle])) {
	                personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
	                    attrs.uifStyle + '" is not a valid value for uifStyle. It should be round or square.');
	                return;
	            }
	            if (angular.isDefined(attrs.uifPresence) && angular.isUndefined(personaPresenceEnum_1.PresenceEnum[attrs.uifPresence])) {
	                personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
	                    attrs.uifPresence + '" is not a valid value for uifPresence. It should be available, away, blocked, busy, dnd or offline.');
	                return;
	            }
	            scope.getImageAreaVisibility = function () {
	                return (sizeEnum_1.PersonaSize[attrs.uifSize] !== sizeEnum_1.PersonaSize.tiny);
	            };
	            scope.getPersonaClasses = function () {
	                var personaClasses = [];
	                var size = sizeEnum_1.PersonaSize[attrs.uifSize];
	                var presence = angular.isDefined(attrs.uifPresence) ? personaPresenceEnum_1.PresenceEnum[attrs.uifPresence] : personaPresenceEnum_1.PresenceEnum.offline;
	                if (personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle] === personaStyleEnum_1.PersonaStyleEnum.square) {
	                    personaClasses.push('ms-Persona--square');
	                }
	                var sizeClass = _this.uifSizeClasses[size];
	                if (angular.isDefined(sizeClass)) {
	                    personaClasses.push(sizeClass);
	                }
	                personaClasses.push(_this.uifPresenceClasses[presence]);
	                return personaClasses.join(' ');
	            };
	            transclude(function (clone) {
	                var detailsWrapper = angular.element(element[0].getElementsByClassName('ms-Persona-details'));
	                var imageArea = angular.element(element[0].getElementsByClassName('ms-Persona-imageArea'));
	                for (var i = 0; i < clone.length; i++) {
	                    var tagName = clone[i].tagName;
	                    switch (tagName) {
	                        case 'UIF-PERSONA-PRIMARY-TEXT':
	                        case 'UIF-PERSONA-SECONDARY-TEXT':
	                        case 'UIF-PERSONA-TERTIARY-TEXT':
	                        case 'UIF-PERSONA-OPTIONAL-TEXT':
	                            detailsWrapper.append(clone[i]);
	                            break;
	                        case 'UIF-PERSONA-INITIALS':
	                            imageArea.prepend(clone[i]);
	                            break;
	                        default:
	                            break;
	                    }
	                }
	            });
	        };
	        var _a, _b;
	    }
	    PersonaDirective.factory = function () {
	        var directive = function () { return new PersonaDirective(); };
	        return directive;
	    };
	    return PersonaDirective;
	}());
	exports.PersonaDirective = PersonaDirective;
	var PersonaController = (function () {
	    function PersonaController($log) {
	        this.$log = $log;
	    }
	    PersonaController.$inject = ['$log'];
	    return PersonaController;
	}());
	exports.PersonaController = PersonaController;
	exports.module = angular.module('officeuifabric.components.persona', ['officeuifabric.components'])
	    .directive('uifPersona', PersonaDirective.factory())
	    .directive('uifPersonaInitials', PersonaInitialsDirective.factory())
	    .directive('uifPersonaPrimaryText', PersonaTextDirective.factory('primary'))
	    .directive('uifPersonaSecondaryText', PersonaTextDirective.factory('secondary'))
	    .directive('uifPersonaTertiaryText', PersonaTextDirective.factory('tertiary'))
	    .directive('uifPersonaOptionalText', PersonaTextDirective.factory(''));


/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	(function (PersonaInitialsColor) {
	    PersonaInitialsColor[PersonaInitialsColor["lightBlue"] = 0] = "lightBlue";
	    PersonaInitialsColor[PersonaInitialsColor["blue"] = 1] = "blue";
	    PersonaInitialsColor[PersonaInitialsColor["darkBlue"] = 2] = "darkBlue";
	    PersonaInitialsColor[PersonaInitialsColor["teal"] = 3] = "teal";
	    PersonaInitialsColor[PersonaInitialsColor["lightGreen"] = 4] = "lightGreen";
	    PersonaInitialsColor[PersonaInitialsColor["green"] = 5] = "green";
	    PersonaInitialsColor[PersonaInitialsColor["darkGreen"] = 6] = "darkGreen";
	    PersonaInitialsColor[PersonaInitialsColor["lightPink"] = 7] = "lightPink";
	    PersonaInitialsColor[PersonaInitialsColor["pink"] = 8] = "pink";
	    PersonaInitialsColor[PersonaInitialsColor["magenta"] = 9] = "magenta";
	    PersonaInitialsColor[PersonaInitialsColor["purple"] = 10] = "purple";
	    PersonaInitialsColor[PersonaInitialsColor["black"] = 11] = "black";
	    PersonaInitialsColor[PersonaInitialsColor["orange"] = 12] = "orange";
	    PersonaInitialsColor[PersonaInitialsColor["red"] = 13] = "red";
	    PersonaInitialsColor[PersonaInitialsColor["darkRed"] = 14] = "darkRed";
	})(exports.PersonaInitialsColor || (exports.PersonaInitialsColor = {}));
	var PersonaInitialsColor = exports.PersonaInitialsColor;
	;


/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	(function (PersonaSize) {
	    PersonaSize[PersonaSize["tiny"] = 0] = "tiny";
	    PersonaSize[PersonaSize["xsmall"] = 1] = "xsmall";
	    PersonaSize[PersonaSize["small"] = 2] = "small";
	    PersonaSize[PersonaSize["medium"] = 3] = "medium";
	    PersonaSize[PersonaSize["large"] = 4] = "large";
	    PersonaSize[PersonaSize["xlarge"] = 5] = "xlarge";
	})(exports.PersonaSize || (exports.PersonaSize = {}));
	var PersonaSize = exports.PersonaSize;
	;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var pivotSizeEnum_1 = __webpack_require__(46);
	var pivotTypeEnum_1 = __webpack_require__(47);
	var PivotController = (function () {
	    function PivotController($log, $scope) {
	        this.$log = $log;
	        this.$scope = $scope;
	        $scope.pivotClick = function (index) {
	            $scope.uifPivots.forEach(function (pivotItem, pivotIndex) {
	                pivotItem.selected = pivotIndex === index;
	                if (pivotItem.selected) {
	                    $scope.uifSelected = pivotItem;
	                }
	            });
	        };
	    }
	    PivotController.$inject = ['$log', '$scope'];
	    return PivotController;
	}());
	exports.PivotController = PivotController;
	var PivotItem = (function () {
	    function PivotItem(title) {
	        this.title = title;
	    }
	    return PivotItem;
	}());
	exports.PivotItem = PivotItem;
	var PivotEllipsisDirective = (function () {
	    function PivotEllipsisDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.template = '<li class="ms-Pivot-link ms-Pivot-link--overflow">' +
	            '<uif-icon uif-type="ellipsis" class="ms-Pivot-ellipsis"></uif-icon>' +
	            '<ng-transclude></ng-transclude>' +
	            '</li>';
	        this.scope = false;
	    }
	    PivotEllipsisDirective.factory = function () {
	        var directive = function () { return new PivotEllipsisDirective(); };
	        return directive;
	    };
	    return PivotEllipsisDirective;
	}());
	exports.PivotEllipsisDirective = PivotEllipsisDirective;
	var PivotDirective = (function () {
	    function PivotDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.controller = PivotController;
	        this.require = ['uifPivot'];
	        this.template = '<ul class="ms-Pivot" ng-class="getClasses()" >' +
	            '<span ng-repeat-start="pivot in uifPivots"></span>' +
	            '<li class="ms-Pivot-link" ng-click="pivotClick($index)" ' +
	            'ng-class="{\'is-selected\': pivot.selected}">{{pivot.title}}</li> ' +
	            '<span ng-repeat-end></span>' +
	            '<ng-transclude></ng-transclude>' +
	            '</ul>';
	        this.scope = {
	            uifPivots: '=?',
	            uifSelected: '=?',
	            uifSize: '@',
	            uifType: '@'
	        };
	    }
	    PivotDirective.factory = function () {
	        var directive = function () { return new PivotDirective(); };
	        return directive;
	    };
	    PivotDirective.prototype.link = function (scope, intanceElement, attrs, controllers) {
	        var pivotController = controllers[0];
	        scope.$watch('uifSize', function (newSize) {
	            if (angular.isDefined(newSize) && angular.isUndefined(pivotSizeEnum_1.PivotSize[newSize])) {
	                pivotController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
	                    '"' + newSize + '" is not a valid value for uifSize. It should be regular or large.');
	            }
	        });
	        scope.$watch('uifType', function (newType) {
	            if (angular.isDefined(newType) && angular.isUndefined(pivotTypeEnum_1.PivotType[newType])) {
	                pivotController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
	                    '"' + newType + '" is not a valid value for uifType. It should be regular or tabs.');
	            }
	        });
	        scope.$watch('uifSelected', function (newValue, oldValue) {
	            if (angular.isDefined(newValue)) {
	                scope.uifPivots.forEach(function (currentPivot) {
	                    currentPivot.selected = currentPivot.title === newValue.title;
	                });
	                var selectedPivots = scope.uifPivots.filter(function (currentPivot) {
	                    return currentPivot.selected;
	                });
	                if (selectedPivots.length > 1) {
	                    for (var i = 1; i < selectedPivots.length; i++) {
	                        selectedPivots[i].selected = false;
	                    }
	                }
	            }
	        });
	        scope.getClasses = function () {
	            var classes = '';
	            classes += pivotTypeEnum_1.PivotType[scope.uifType] === pivotTypeEnum_1.PivotType.tabs ? 'ms-Pivot--tabs' : '';
	            classes += pivotSizeEnum_1.PivotSize[scope.uifSize] === pivotSizeEnum_1.PivotSize.large ? ' ms-Pivot--large' : '';
	            return classes;
	        };
	    };
	    return PivotDirective;
	}());
	exports.PivotDirective = PivotDirective;
	exports.module = angular.module('officeuifabric.components.pivot', ['officeuifabric.components'])
	    .directive('uifPivot', PivotDirective.factory())
	    .directive('uifPivotEllipsis', PivotEllipsisDirective.factory());


/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	(function (PivotSize) {
	    PivotSize[PivotSize['regular'] = 0] = 'regular';
	    PivotSize[PivotSize['large'] = 1] = 'large';
	})(exports.PivotSize || (exports.PivotSize = {}));
	var PivotSize = exports.PivotSize;


/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	(function (PivotType) {
	    PivotType[PivotType["regular"] = 0] = "regular";
	    PivotType[PivotType["tabs"] = 1] = "tabs";
	})(exports.PivotType || (exports.PivotType = {}));
	var PivotType = exports.PivotType;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
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
	}());
	exports.ProgressIndicatorDirective = ProgressIndicatorDirective;
	exports.module = angular.module('officeuifabric.components.progressindicator', [
	    'officeuifabric.components'
	])
	    .directive('uifProgressIndicator', ProgressIndicatorDirective.factory());


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var SearchBoxDirective = (function () {
	    function SearchBoxDirective() {
	        this.template = '<div class="ms-SearchBox" ng-class="{\'is-active\':isActive, \'is-disabled\':isDisabled}">' +
	            '<input class="ms-SearchBox-field" ng-focus="inputFocus()" ng-blur="inputBlur()"' +
	            ' ng-model="value" ng-change="inputChange()" id="{{::\'searchBox_\'+$id}}" ng-disabled="isDisabled" />' +
	            '<label class="ms-SearchBox-label" for="{{::\'searchBox_\'+$id}}" ng-hide="isLabelHidden">' +
	            '<i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i> {{placeholder}}</label>' +
	            '<button class="ms-SearchBox-closeButton" ng-mousedown="btnMousedown()" type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
	            '</div>';
	        this.require = ['?ngModel'];
	        this.scope = {
	            placeholder: '=?',
	            value: '=?ngModel'
	        };
	    }
	    SearchBoxDirective.factory = function () {
	        var directive = function () { return new SearchBoxDirective(); };
	        return directive;
	    };
	    SearchBoxDirective.prototype.link = function (scope, elem, attrs, controllers) {
	        var ngModelCtrl;
	        if (angular.isDefined(controllers) && controllers.length > 0) {
	            ngModelCtrl = controllers[0];
	        }
	        scope.isFocus = false;
	        scope.isCancel = false;
	        scope.isLabelHidden = false;
	        scope.isActive = false;
	        scope.inputFocus = function () {
	            scope.isFocus = true;
	            scope.isLabelHidden = true;
	            scope.isActive = true;
	        };
	        scope.inputChange = function () {
	            if (ngModelCtrl !== null) {
	                ngModelCtrl.$setDirty();
	            }
	        };
	        scope.inputBlur = function () {
	            if (scope.isCancel) {
	                if (ngModelCtrl !== null) {
	                    ngModelCtrl.$setViewValue('');
	                }
	                else {
	                    scope.value = '';
	                }
	                scope.isLabelHidden = false;
	            }
	            scope.isActive = false;
	            if (typeof (scope.value) === 'undefined' || scope.value === '') {
	                scope.isLabelHidden = false;
	            }
	            scope.isFocus = scope.isCancel = false;
	            if (ngModelCtrl !== null) {
	                ngModelCtrl.$setTouched();
	            }
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
	                if (ngModelCtrl !== null) {
	                    ngModelCtrl.$setViewValue(val);
	                }
	                else {
	                    scope.value = val;
	                }
	            }
	        });
	        scope.$watch('placeholder', function (search) {
	            scope.placeholder = search;
	        });
	        attrs.$observe('disabled', function (disabled) {
	            scope.isDisabled = !!disabled;
	        });
	    };
	    return SearchBoxDirective;
	}());
	exports.SearchBoxDirective = SearchBoxDirective;
	exports.module = angular.module('officeuifabric.components.searchbox', ['officeuifabric.components'])
	    .directive('uifSearchbox', SearchBoxDirective.factory());


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var spinnerSizeEnum_1 = __webpack_require__(51);
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
	        if (angular.isDefined(attrs.uifSize)) {
	            if (angular.isUndefined(spinnerSizeEnum_1.SpinnerSize[attrs.uifSize])) {
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
	                var wrapper = angular.element('<div></div>');
	                wrapper.addClass('ms-Spinner-label').append(clone);
	                instanceElement.append(wrapper);
	            }
	        });
	        scope.init();
	    };
	    return SpinnerDirective;
	}());
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
	        var circle = angular.element('<div></div>');
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
	}());
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
	}());
	exports.module = angular.module('officeuifabric.components.spinner', ['officeuifabric.components'])
	    .directive('uifSpinner', SpinnerDirective.factory());


/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	(function (SpinnerSize) {
	    SpinnerSize[SpinnerSize['small'] = 0] = 'small';
	    SpinnerSize[SpinnerSize['large'] = 1] = 'large';
	})(exports.SpinnerSize || (exports.SpinnerSize = {}));
	var SpinnerSize = exports.SpinnerSize;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var tableRowSelectModeEnum_1 = __webpack_require__(53);
	var tableTypeEnum_1 = __webpack_require__(54);
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
	}());
	var TableDirective = (function () {
	    function TableDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<table ng-class="[\'ms-Table\', tableTypeClass]" ng-transclude></table>';
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
	        if (attrs.uifTableType !== undefined && attrs.uifTableType !== null) {
	            if (tableTypeEnum_1.TableTypeEnum[attrs.uifTableType] === undefined) {
	                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
	                    '\'' + attrs.uifTableType + '\' is not a valid option for \'uif-table-type\'. ' +
	                    'Valid options are fixed|fluid.');
	            }
	            else {
	                scope.tableType = attrs.uifTableType;
	            }
	        }
	        if (scope.tableType === undefined) {
	            scope.tableType = tableTypeEnum_1.TableTypeEnum[tableTypeEnum_1.TableTypeEnum.fluid];
	        }
	        if (scope.tableType === tableTypeEnum_1.TableTypeEnum[tableTypeEnum_1.TableTypeEnum.fixed]) {
	            scope.tableTypeClass = 'ms-Table--fixed';
	        }
	    };
	    return TableDirective;
	}());
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
	}());
	var TableRowDirective = (function () {
	    function TableRowDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<tr ng-transclude></tr>';
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
	}());
	exports.TableRowDirective = TableRowDirective;
	var TableRowSelectDirective = (function () {
	    function TableRowSelectDirective() {
	        this.restrict = 'E';
	        this.template = '<td class="ms-Table-rowCheck"></td>';
	        this.replace = true;
	        this.require = ['^uifTable', '?^uifTableHead', '^uifTableRow'];
	    }
	    TableRowSelectDirective.factory = function () {
	        var directive = function () { return new TableRowSelectDirective(); };
	        return directive;
	    };
	    TableRowSelectDirective.prototype.link = function (scope, instanceElement, attrs, controllers) {
	        var thead = controllers[1];
	        if (thead) {
	            var newElem = angular.element('<th class="ms-Table-rowCheck"></th>');
	            instanceElement.replaceWith(newElem);
	            instanceElement = newElem;
	        }
	        scope.rowSelectClick = function (ev) {
	            var table = controllers[0];
	            var row = controllers[2];
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
	}());
	exports.TableRowSelectDirective = TableRowSelectDirective;
	var TableCellDirective = (function () {
	    function TableCellDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<td ng-transclude></td>';
	        this.replace = true;
	    }
	    TableCellDirective.factory = function () {
	        var directive = function () { return new TableCellDirective(); };
	        return directive;
	    };
	    return TableCellDirective;
	}());
	exports.TableCellDirective = TableCellDirective;
	var TableHeaderDirective = (function () {
	    function TableHeaderDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<th ng-transclude></th>';
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
	}());
	exports.TableHeaderDirective = TableHeaderDirective;
	var TableHeadController = (function () {
	    function TableHeadController() {
	    }
	    return TableHeadController;
	}());
	var TableHeadDirective = (function () {
	    function TableHeadDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<thead ng-transclude></thead>';
	        this.replace = true;
	        this.controller = TableHeadController;
	    }
	    TableHeadDirective.factory = function () {
	        var directive = function () { return new TableHeadDirective(); };
	        return directive;
	    };
	    return TableHeadDirective;
	}());
	exports.TableHeadDirective = TableHeadDirective;
	var TableBodyDirective = (function () {
	    function TableBodyDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = '<tbody ng-transclude></tbody>';
	        this.replace = true;
	    }
	    TableBodyDirective.factory = function () {
	        var directive = function () { return new TableBodyDirective(); };
	        return directive;
	    };
	    return TableBodyDirective;
	}());
	exports.TableBodyDirective = TableBodyDirective;
	exports.module = angular.module('officeuifabric.components.table', ['officeuifabric.components'])
	    .directive('uifTable', TableDirective.factory())
	    .directive('uifTableRow', TableRowDirective.factory())
	    .directive('uifTableRowSelect', TableRowSelectDirective.factory())
	    .directive('uifTableCell', TableCellDirective.factory())
	    .directive('uifTableHeader', TableHeaderDirective.factory())
	    .directive('uifTableHead', TableHeadDirective.factory())
	    .directive('uifTableBody', TableBodyDirective.factory());


/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	(function (TableRowSelectModeEnum) {
	    TableRowSelectModeEnum[TableRowSelectModeEnum["none"] = 0] = "none";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["single"] = 1] = "single";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["multiple"] = 2] = "multiple";
	})(exports.TableRowSelectModeEnum || (exports.TableRowSelectModeEnum = {}));
	var TableRowSelectModeEnum = exports.TableRowSelectModeEnum;


/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';
	(function (TableTypeEnum) {
	    TableTypeEnum[TableTypeEnum["fluid"] = 0] = "fluid";
	    TableTypeEnum[TableTypeEnum["fixed"] = 1] = "fixed";
	})(exports.TableTypeEnum || (exports.TableTypeEnum = {}));
	var TableTypeEnum = exports.TableTypeEnum;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var uifTypeEnum_1 = __webpack_require__(56);
	var TextFieldController = (function () {
	    function TextFieldController($log) {
	        this.$log = $log;
	    }
	    TextFieldController.$inject = ['$log'];
	    return TextFieldController;
	}());
	var TextFieldDirective = (function () {
	    function TextFieldDirective() {
	        this.controller = TextFieldController;
	        this.template = '<div ng-class="{\'is-active\': isActive, \'ms-TextField\': true, ' +
	            '\'ms-TextField--underlined\': uifUnderlined, \'ms-TextField--placeholder\': placeholder, ' +
	            '\'is-required\': required, \'is-disabled\': disabled, \'ms-TextField--multiline\' : uifMultiline }">' +
	            '<label ng-show="labelShown" class="ms-Label" ng-click="labelClick()">{{uifLabel || placeholder}}</label>' +
	            '<input ng-model="ngModel" ng-change="inputChange()" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
	            'class="ms-TextField-field" ng-show="!uifMultiline" ng-disabled="disabled" type="{{uifType}}"' +
	            'min="{{min}}" max="{{max}}" step="{{step}}" />' +
	            '<textarea ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
	            'class="ms-TextField-field" ng-show="uifMultiline" ng-disabled="disabled"></textarea>' +
	            '<span class="ms-TextField-description">{{uifDescription}}</span>' +
	            '</div>';
	        this.scope = {
	            max: '@',
	            min: '@',
	            ngChange: '=?',
	            ngModel: '=?',
	            placeholder: '@',
	            step: '@',
	            uifDescription: '@',
	            uifLabel: '@'
	        };
	        this.require = ['uifTextfield', '?ngModel'];
	        this.restrict = 'E';
	    }
	    TextFieldDirective.factory = function () {
	        var directive = function () { return new TextFieldDirective(); };
	        return directive;
	    };
	    TextFieldDirective.prototype.link = function (scope, instanceElement, attrs, controllers) {
	        var controller = controllers[0];
	        var ngModel = controllers[1];
	        scope.disabled = 'disabled' in attrs;
	        scope.$watch(function () { return instanceElement.attr('disabled'); }, (function (newValue) { scope.disabled = typeof newValue !== 'undefined'; }));
	        scope.labelShown = true;
	        scope.required = 'required' in attrs;
	        scope.uifMultiline = attrs.uifMultiline === 'true';
	        scope.uifType = attrs.uifType;
	        scope.$watch('uifType', function (newValue, oldValue) {
	            if (typeof newValue !== 'undefined') {
	                if (uifTypeEnum_1.InputTypeEnum[newValue] === undefined) {
	                    controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.textfield - Unsupported type: ' +
	                        'The type (\'' + scope.uifType + '\') is not supported by the Office UI Fabric. ' +
	                        'Supported options are listed here: ' +
	                        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/textfield/uifTypeEnum.ts');
	                }
	            }
	            else {
	                scope.uifType = uifTypeEnum_1.InputTypeEnum.text;
	            }
	        });
	        scope.uifUnderlined = 'uifUnderlined' in attrs;
	        scope.inputFocus = function (ev) {
	            if (scope.placeholder) {
	                scope.labelShown = false;
	            }
	            scope.isActive = true;
	        };
	        scope.inputBlur = function (ev) {
	            var input = instanceElement.find('input');
	            if (scope.placeholder && input.val().length === 0) {
	                scope.labelShown = true;
	            }
	            scope.isActive = false;
	            if (angular.isDefined(ngModel) && ngModel != null) {
	                ngModel.$setTouched();
	            }
	        };
	        scope.labelClick = function (ev) {
	            if (scope.placeholder) {
	                var input = scope.uifMultiline ? instanceElement.find('textarea')
	                    : instanceElement.find('input');
	                input[0].focus();
	            }
	        };
	        scope.inputChange = function (ev) {
	            if (angular.isDefined(ngModel) && ngModel != null) {
	                ngModel.$setDirty();
	            }
	        };
	        if (ngModel != null) {
	            ngModel.$render = function () {
	                if (scope.placeholder) {
	                    scope.labelShown = !ngModel.$viewValue;
	                }
	            };
	        }
	    };
	    return TextFieldDirective;
	}());
	exports.TextFieldDirective = TextFieldDirective;
	exports.module = angular.module('officeuifabric.components.textfield', [
	    'officeuifabric.components'
	])
	    .directive('uifTextfield', TextFieldDirective.factory());


/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';
	(function (InputTypeEnum) {
	    InputTypeEnum[InputTypeEnum["text"] = 0] = "text";
	    InputTypeEnum[InputTypeEnum["password"] = 1] = "password";
	    InputTypeEnum[InputTypeEnum["email"] = 2] = "email";
	    InputTypeEnum[InputTypeEnum["url"] = 3] = "url";
	    InputTypeEnum[InputTypeEnum["tel"] = 4] = "tel";
	    InputTypeEnum[InputTypeEnum["range"] = 5] = "range";
	    InputTypeEnum[InputTypeEnum["number"] = 6] = "number";
	})(exports.InputTypeEnum || (exports.InputTypeEnum = {}));
	var InputTypeEnum = exports.InputTypeEnum;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var ToggleDirective = (function () {
	    function ToggleDirective() {
	        this.template = '<div ng-class="[\'ms-Toggle\', textLocation, {\'is-disabled\': disabled}]">' +
	            '<span class="ms-Toggle-description"><ng-transclude/></span>' +
	            '<input type="checkbox" id="{{::$id}}" class="ms-Toggle-input" ' +
	            'ng-model="ngModel" ng-change="checkboxChange();ngChange()" ng-disabled="disabled" ' +
	            'ng-attr-ng-true-value="{{ngTrueValue || undefined}}" ng-attr-ng-false-value="{{ngFalseValue || undefined}}" />' +
	            '<label for="{{::$id}}" class="ms-Toggle-field">' +
	            '<span class="ms-Label ms-Label--off">{{uifLabelOff}}</span>' +
	            '<span class="ms-Label ms-Label--on">{{uifLabelOn}}</span>' +
	            '</label>' +
	            '</div>';
	        this.restrict = 'E';
	        this.transclude = true;
	        this.require = ['?ngModel'];
	        this.scope = {
	            ngChange: '&?',
	            ngFalseValue: '@?',
	            ngModel: '=?',
	            ngTrueValue: '@?',
	            uifLabelOff: '@',
	            uifLabelOn: '@',
	            uifTextLocation: '@'
	        };
	    }
	    ToggleDirective.factory = function () {
	        var directive = function () { return new ToggleDirective(); };
	        return directive;
	    };
	    ToggleDirective.prototype.link = function (scope, elem, attrs, ctrls) {
	        var ngModelCtrl;
	        if (angular.isDefined(ctrls) && ctrls.length > 0) {
	            ngModelCtrl = ctrls[0];
	        }
	        if (scope.uifTextLocation) {
	            var loc = scope.uifTextLocation;
	            loc = loc.charAt(0).toUpperCase() + loc.slice(1);
	            scope.textLocation = ' ms-Toggle--text' + loc;
	        }
	        scope.$watch(function () { return elem.attr('disabled'); }, (function (newValue) { scope.disabled = typeof newValue !== 'undefined'; }));
	        scope.disabled = 'disabled' in attrs;
	        scope.checkboxChange = function () {
	            if (angular.isDefined(ngModelCtrl) && ngModelCtrl !== null) {
	                ngModelCtrl.$setDirty();
	                ngModelCtrl.$setTouched();
	            }
	        };
	    };
	    return ToggleDirective;
	}());
	exports.ToggleDirective = ToggleDirective;
	exports.module = angular.module('officeuifabric.components.toggle', [
	    'officeuifabric.components'
	])
	    .directive('uifToggle', ToggleDirective.factory());


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(2);
	var orgChartPresenceEnum_1 = __webpack_require__(59);
	var orgChartStyleEnum_1 = __webpack_require__(60);
	var orgChartSelectModeEnum_1 = __webpack_require__(61);
	var OrgChartController = (function () {
	    function OrgChartController($scope, $log) {
	        this.$scope = $scope;
	        this.$log = $log;
	        this.$scope.selectMode = null;
	        this.$scope.items = [];
	    }
	    Object.defineProperty(OrgChartController.prototype, "items", {
	        get: function () {
	            return this.$scope.items;
	        },
	        set: function (items) {
	            this.$scope.items = items;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(OrgChartController.prototype, "selectedItems", {
	        get: function () {
	            return this.$scope.selectedItems;
	        },
	        set: function (selectedItems) {
	            this.$scope.selectedItems = selectedItems;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    OrgChartController.$inject = ['$scope', '$log'];
	    return OrgChartController;
	}());
	var OrgChartDirective = (function () {
	    function OrgChartDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-OrgChart" ng-transclude ></div>';
	        this.controller = OrgChartController;
	        this.scope = {
	            selectedItems: '=?uifSelectedItems'
	        };
	    }
	    OrgChartDirective.factory = function () {
	        var directive = function () { return new OrgChartDirective(); };
	        return directive;
	    };
	    OrgChartDirective.prototype.link = function (scope, elem, attrs, ctrl) {
	        if (attrs.uifSelectMode) {
	            switch (orgChartSelectModeEnum_1.OrgChartSelectModeEnum[attrs.uifSelectMode]) {
	                case orgChartSelectModeEnum_1.OrgChartSelectModeEnum.single:
	                case orgChartSelectModeEnum_1.OrgChartSelectModeEnum.multiple:
	                    ctrl.selectMode = orgChartSelectModeEnum_1.OrgChartSelectModeEnum[attrs.uifSelectMode];
	                    break;
	                default:
	                    ctrl.$log.error('Error [ngOfficeUIFabric] officeuifabric.components.orgchart - Unsupported select-mode: ' +
	                        'The select-mode (\'' + attrs.uifSelectMode + '\) is not supperted. ' +
	                        'Supported options are: single, multiple');
	                    break;
	            }
	        }
	    };
	    return OrgChartDirective;
	}());
	exports.OrgChartDirective = OrgChartDirective;
	var OrgChartGroupDirective = (function () {
	    function OrgChartGroupDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-OrgChart-group" ng-transclude ></div>';
	    }
	    OrgChartGroupDirective.factory = function () {
	        var directive = function () { return new OrgChartGroupDirective(); };
	        return directive;
	    };
	    return OrgChartGroupDirective;
	}());
	exports.OrgChartGroupDirective = OrgChartGroupDirective;
	var OrgChartGroupTitleDirective = (function () {
	    function OrgChartGroupTitleDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-OrgChart-groupTitle" ng-transclude ></div>';
	    }
	    OrgChartGroupTitleDirective.factory = function () {
	        var directive = function () { return new OrgChartGroupTitleDirective(); };
	        return directive;
	    };
	    return OrgChartGroupTitleDirective;
	}());
	exports.OrgChartGroupTitleDirective = OrgChartGroupTitleDirective;
	var OrgChartListDirective = (function () {
	    function OrgChartListDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<ul class="ms-OrgChart-list" ng-transclude ></ul>';
	    }
	    OrgChartListDirective.factory = function () {
	        var directive = function () { return new OrgChartListDirective(); };
	        return directive;
	    };
	    return OrgChartListDirective;
	}());
	exports.OrgChartListDirective = OrgChartListDirective;
	var OrgChartPersonaDirective = (function () {
	    function OrgChartPersonaDirective($log) {
	        this.$log = $log;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<li class="ms-OrgChart-listItem"><div class="ms-Persona" ng-transclude ></div></li>';
	        this.require = '^uifOrgChart';
	        this.scope = {
	            item: '=?uifItem',
	            presence: '=?uifPresence',
	            selected: '=?uifSelected'
	        };
	    }
	    OrgChartPersonaDirective.factory = function () {
	        var directive = function ($log) { return new OrgChartPersonaDirective($log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
	    OrgChartPersonaDirective.prototype.compile = function (elem, attrs, transclude) {
	        return {
	            post: this.postLink
	        };
	    };
	    OrgChartPersonaDirective.prototype.postLink = function (scope, elem, attrs, ctrl, transclude) {
	        if (scope.selected === undefined) {
	            scope.selected = false;
	        }
	        if (scope.presence) {
	            switch (orgChartPresenceEnum_1.OrgChartPresenceEnum[scope.presence]) {
	                case orgChartPresenceEnum_1.OrgChartPresenceEnum.available:
	                    elem.children().eq(0).addClass('ms-Persona--available');
	                    break;
	                case orgChartPresenceEnum_1.OrgChartPresenceEnum.busy:
	                    elem.children().eq(0).addClass('ms-Persona--busy');
	                    break;
	                case orgChartPresenceEnum_1.OrgChartPresenceEnum.away:
	                    elem.children().eq(0).addClass('ms-Persona--away');
	                    break;
	                case orgChartPresenceEnum_1.OrgChartPresenceEnum.blocked:
	                    elem.children().eq(0).addClass('ms-Persona--blocked');
	                    break;
	                case orgChartPresenceEnum_1.OrgChartPresenceEnum.dnd:
	                    elem.children().eq(0).addClass('ms-Persona--dnd');
	                    break;
	                case orgChartPresenceEnum_1.OrgChartPresenceEnum.offline:
	                    elem.children().eq(0).addClass('ms-Persona--offline');
	                    break;
	                default:
	                    ctrl.$log.error('Error [ngOfficeUIFabric] officeuifabric.components.orgchart - Unsupported presence: ' +
	                        'The presence (\'' + scope.presence + '\') is not supperted by the Office UI Fabric. ' +
	                        'Supported options are: available, busy, away, blocked, dnd, offline.');
	                    break;
	            }
	        }
	        if (attrs.uifStyle) {
	            switch (orgChartStyleEnum_1.OrgChartStyleEnum[attrs.uifStyle]) {
	                case orgChartStyleEnum_1.OrgChartStyleEnum.square:
	                    elem.children().eq(0).addClass('ms-Persona--square');
	                    break;
	                case orgChartStyleEnum_1.OrgChartStyleEnum.standard: break;
	                default:
	                    ctrl.$log.error('Error [ngOfficeUIFabric] officeuifabric.components.orgchart - Unsupported style: ' +
	                        'The style (\'' + attrs.uifStyle + '\) is not supperted by the Office UI Fabric. ' +
	                        'Supported options are: standard(default), square');
	                    break;
	            }
	        }
	        if (ctrl.selectMode !== undefined) {
	            elem.children().eq(0).addClass('ms-Persona--selectable');
	        }
	        scope.$watch('selected', function (newValue, oldValue) {
	            if (ctrl.selectMode !== undefined) {
	                if (newValue === true) {
	                    elem.children().eq(0).addClass('is-selected');
	                }
	                else {
	                    elem.children().eq(0).removeClass('is-selected');
	                }
	            }
	        });
	        if (scope.item) {
	            ctrl.items.push(scope);
	        }
	        if (ctrl.selectMode === orgChartSelectModeEnum_1.OrgChartSelectModeEnum.single || ctrl.selectMode === orgChartSelectModeEnum_1.OrgChartSelectModeEnum.multiple) {
	            if (scope.selected) {
	                if (ctrl.selectMode === orgChartSelectModeEnum_1.OrgChartSelectModeEnum.single) {
	                    if (ctrl.selectedItems) {
	                        ctrl.selectedItems = [];
	                    }
	                    for (var i = 0; i < ctrl.items.length; i++) {
	                        if (ctrl.items[i] !== scope) {
	                            ctrl.items[i].selected = false;
	                        }
	                    }
	                }
	                elem.children().eq(0).addClass('is-selected');
	                if (ctrl.selectedItems) {
	                    ctrl.selectedItems.push(scope.item);
	                }
	            }
	        }
	        scope.personaClick = function (event) {
	            scope.selected = !scope.selected;
	            if (scope.selected) {
	                if (ctrl.selectMode === orgChartSelectModeEnum_1.OrgChartSelectModeEnum.single) {
	                    if (ctrl.items) {
	                        for (var i = 0; i < ctrl.items.length; i++) {
	                            if (ctrl.items[i] !== scope) {
	                                ctrl.items[i].selected = false;
	                            }
	                        }
	                    }
	                    elem.children().eq(0).addClass('is-selected');
	                    ctrl.selectedItems = [];
	                    ctrl.selectedItems.push(scope.item);
	                }
	                if (ctrl.selectMode === orgChartSelectModeEnum_1.OrgChartSelectModeEnum.multiple) {
	                    elem.children().eq(0).addClass('is-selected');
	                    if (ctrl.selectedItems) {
	                        ctrl.selectedItems.push(scope.item);
	                    }
	                }
	            }
	            else {
	                elem.children().eq(0).removeClass('is-selected');
	                if (ctrl.selectedItems) {
	                    var index = ctrl.selectedItems.indexOf(scope.item);
	                    if (index > -1) {
	                        ctrl.selectedItems.splice(index, 1);
	                    }
	                }
	            }
	            scope.$apply();
	        };
	        if ((ctrl.selectMode === orgChartSelectModeEnum_1.OrgChartSelectModeEnum.single || ctrl.selectMode === orgChartSelectModeEnum_1.OrgChartSelectModeEnum.multiple) && scope.item) {
	            elem.children().eq(0).on('click', scope.personaClick);
	        }
	    };
	    return OrgChartPersonaDirective;
	}());
	exports.OrgChartPersonaDirective = OrgChartPersonaDirective;
	var OrgChartImageDirective = (function () {
	    function OrgChartImageDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.template = "\n    <div class=\"ms-Persona-imageArea\">\n      <i class=\"ms-Persona-placeholder ms-Icon ms-Icon--person\"></i>\n      <img class=\"ms-Persona-image\" ng-src=\"{{ngSrc}}\" />\n    </div>\n    ";
	        this.scope = {
	            ngSrc: '='
	        };
	    }
	    OrgChartImageDirective.factory = function () {
	        var directive = function () { return new OrgChartImageDirective(); };
	        return directive;
	    };
	    return OrgChartImageDirective;
	}());
	exports.OrgChartImageDirective = OrgChartImageDirective;
	var OrgChartPresenceDirective = (function () {
	    function OrgChartPresenceDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.template = '<div class="ms-Persona-presence" ></div>';
	    }
	    OrgChartPresenceDirective.factory = function () {
	        var directive = function () { return new OrgChartPresenceDirective(); };
	        return directive;
	    };
	    OrgChartPresenceDirective.prototype.link = function (scope, elem, attrs, ctrl) {
	        if (!scope.$parent.presence) {
	            elem.css('display', 'none');
	        }
	    };
	    return OrgChartPresenceDirective;
	}());
	exports.OrgChartPresenceDirective = OrgChartPresenceDirective;
	var OrgChartDetailsDirective = (function () {
	    function OrgChartDetailsDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Persona-details" ng-transclude ></div>';
	    }
	    OrgChartDetailsDirective.factory = function () {
	        var directive = function () { return new OrgChartDetailsDirective(); };
	        return directive;
	    };
	    return OrgChartDetailsDirective;
	}());
	exports.OrgChartDetailsDirective = OrgChartDetailsDirective;
	var OrgChartPrimaryTextDirective = (function () {
	    function OrgChartPrimaryTextDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Persona-primaryText" ng-transclude ></div>';
	    }
	    OrgChartPrimaryTextDirective.factory = function () {
	        var directive = function () { return new OrgChartPrimaryTextDirective(); };
	        return directive;
	    };
	    return OrgChartPrimaryTextDirective;
	}());
	exports.OrgChartPrimaryTextDirective = OrgChartPrimaryTextDirective;
	var OrgChartSecondaryTextDirective = (function () {
	    function OrgChartSecondaryTextDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Persona-secondaryText" ng-transclude ></div>';
	    }
	    OrgChartSecondaryTextDirective.factory = function () {
	        var directive = function () { return new OrgChartSecondaryTextDirective(); };
	        return directive;
	    };
	    return OrgChartSecondaryTextDirective;
	}());
	exports.OrgChartSecondaryTextDirective = OrgChartSecondaryTextDirective;
	var OrgChartGroupByFilter = (function () {
	    function OrgChartGroupByFilter() {
	    }
	    OrgChartGroupByFilter.factory = function () {
	        return function (collection, key) {
	            var result = [];
	            if (!collection) {
	                return;
	            }
	            for (var i = 0; i < collection.length; i++) {
	                var value = collection[i][key];
	                if (result.indexOf(value) === -1) {
	                    result.push(value);
	                }
	            }
	            return result;
	        };
	    };
	    return OrgChartGroupByFilter;
	}());
	exports.OrgChartGroupByFilter = OrgChartGroupByFilter;
	exports.module = angular.module('officeuifabric.components.orgchart', [
	    'officeuifabric.components'
	])
	    .directive('uifOrgChart', OrgChartDirective.factory())
	    .directive('uifOrgChartGroup', OrgChartGroupDirective.factory())
	    .directive('uifOrgChartGroupTitle', OrgChartGroupTitleDirective.factory())
	    .directive('uifOrgChartList', OrgChartListDirective.factory())
	    .directive('uifOrgChartPersona', OrgChartPersonaDirective.factory())
	    .directive('uifOrgChartImage', OrgChartImageDirective.factory())
	    .directive('uifOrgChartPresence', OrgChartPresenceDirective.factory())
	    .directive('uifOrgChartDetails', OrgChartDetailsDirective.factory())
	    .directive('uifOrgChartPrimaryText', OrgChartPrimaryTextDirective.factory())
	    .directive('uifOrgChartSecondaryText', OrgChartSecondaryTextDirective.factory())
	    .filter('uifOrgChartGroupBy', OrgChartGroupByFilter.factory);


/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartPresenceEnum) {
	    OrgChartPresenceEnum[OrgChartPresenceEnum["available"] = 0] = "available";
	    OrgChartPresenceEnum[OrgChartPresenceEnum["busy"] = 1] = "busy";
	    OrgChartPresenceEnum[OrgChartPresenceEnum["away"] = 2] = "away";
	    OrgChartPresenceEnum[OrgChartPresenceEnum["blocked"] = 3] = "blocked";
	    OrgChartPresenceEnum[OrgChartPresenceEnum["dnd"] = 4] = "dnd";
	    OrgChartPresenceEnum[OrgChartPresenceEnum["offline"] = 5] = "offline";
	})(exports.OrgChartPresenceEnum || (exports.OrgChartPresenceEnum = {}));
	var OrgChartPresenceEnum = exports.OrgChartPresenceEnum;


/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartStyleEnum) {
	    OrgChartStyleEnum[OrgChartStyleEnum["standard"] = 0] = "standard";
	    OrgChartStyleEnum[OrgChartStyleEnum["square"] = 1] = "square";
	})(exports.OrgChartStyleEnum || (exports.OrgChartStyleEnum = {}));
	var OrgChartStyleEnum = exports.OrgChartStyleEnum;


/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartSelectModeEnum) {
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["single"] = 0] = "single";
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["multiple"] = 1] = "multiple";
	})(exports.OrgChartSelectModeEnum || (exports.OrgChartSelectModeEnum = {}));
	var OrgChartSelectModeEnum = exports.OrgChartSelectModeEnum;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var personaStyleEnum_1 = __webpack_require__(40);
	var sizeEnum_1 = __webpack_require__(44);
	var iconEnum_1 = __webpack_require__(22);
	var peopleSearchEventName = 'uif-people-search';
	var GroupedPeopleData = (function () {
	    function GroupedPeopleData() {
	        this.people = [];
	    }
	    return GroupedPeopleData;
	}());
	exports.GroupedPeopleData = GroupedPeopleData;
	var PeoplePickerController = (function () {
	    function PeoplePickerController($scope, $filter, $element) {
	        this.$scope = $scope;
	        this.$filter = $filter;
	        this.$element = $element;
	    }
	    PeoplePickerController.prototype.getSelectedPersons = function () {
	        return this.$scope.selectedPersons;
	    };
	    PeoplePickerController.prototype.pickerType = function () {
	        var type = this.$scope.type;
	        if (angular.isUndefined(type)) {
	            return PeoplePickerTypes[PeoplePickerTypes.grouped];
	        }
	        return this.$scope.type;
	    };
	    PeoplePickerController.prototype.searchQuery = function () {
	        return this.$scope.searchQuery;
	    };
	    PeoplePickerController.prototype.search = function () {
	        this.bindPeople(this.$scope.searchQuery);
	        this.$scope.$broadcast(peopleSearchEventName, this.searchQuery());
	    };
	    PeoplePickerController.prototype.bindPeople = function (query) {
	        var _this = this;
	        var peopleData = this.$scope.peopleCallback()(query);
	        peopleData = peopleData || [];
	        if (peopleData instanceof Array) {
	            this.$scope.groups = this.createPeopleDataStructure(peopleData);
	        }
	        else if (typeof peopleData.then === 'function') {
	            var searchMoreCtrl_1 = angular.element(this.$element[0].querySelector('.ms-PeoplePicker-searchMore'))
	                .controller("" + PeopleSearchMoreDirective.directiveName);
	            if (searchMoreCtrl_1) {
	                searchMoreCtrl_1.isSearching(true);
	            }
	            var that_1 = this;
	            peopleData
	                .then(function (data) {
	                that_1.$scope.groups = _this.createPeopleDataStructure(data);
	            })
	                .finally(function () {
	                if (searchMoreCtrl_1) {
	                    searchMoreCtrl_1.isSearching(false);
	                }
	            });
	        }
	    };
	    PeoplePickerController.prototype.createPeopleDataStructure = function (people) {
	        var _this = this;
	        var peopleData = [];
	        angular.forEach(people, function (person) {
	            var existingGroups = _this.$filter('filter')(peopleData, { group: person.group });
	            var hasGroup = existingGroups.length === 1;
	            if (!hasGroup) {
	                var newPeopleData = new GroupedPeopleData();
	                newPeopleData.group = person.group;
	                newPeopleData.people.push(person);
	                peopleData.push(newPeopleData);
	            }
	            else {
	                var existingData = existingGroups[0];
	                existingData.people.push(person);
	            }
	        });
	        return peopleData;
	    };
	    PeoplePickerController.$inject = ['$scope', '$filter', '$element'];
	    return PeoplePickerController;
	}());
	exports.PeoplePickerController = PeoplePickerController;
	var PeoplePickerTypes;
	(function (PeoplePickerTypes) {
	    PeoplePickerTypes[PeoplePickerTypes["grouped"] = 0] = "grouped";
	    PeoplePickerTypes[PeoplePickerTypes["compact"] = 1] = "compact";
	    PeoplePickerTypes[PeoplePickerTypes["memberList"] = 2] = "memberList";
	    PeoplePickerTypes[PeoplePickerTypes["facePile"] = 3] = "facePile";
	})(PeoplePickerTypes || (PeoplePickerTypes = {}));
	var PeoplePickerDirective = (function () {
	    function PeoplePickerDirective($document, $timeout, $log, $window) {
	        var _this = this;
	        this.$document = $document;
	        this.$timeout = $timeout;
	        this.$log = $log;
	        this.$window = $window;
	        this.replace = true;
	        this.require = ['ngModel', ("" + PeoplePickerDirective.directiveName)];
	        this.restrict = 'E';
	        this.transclude = true;
	        this.controller = PeoplePickerController;
	        this.scope = {
	            delay: '@uifSearchDelay',
	            facePileHeader: '@?uifFacepileHeader',
	            ngDisabled: '=?',
	            ngModel: '=',
	            onSelectedPersonClick: '&?uifSelectedPersonClick',
	            peopleCallback: '&uifPeople',
	            placeholder: '@?',
	            type: '@?uifType'
	        };
	        this.templateTypes = {};
	        this.template = function ($element, $attrs) {
	            var type = $attrs.uifType;
	            if (angular.isUndefined(type)) {
	                return _this.templateTypes[PeoplePickerTypes.grouped];
	            }
	            if (PeoplePickerTypes[type] === undefined) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.peoplepicker - unsupported people picker type:\n' +
	                    'the type \'' + type + '\' is not supported by ng-Office UI Fabric as valid type for people picker.' +
	                    'Supported types can be found under PeoplePickerTypes enum here:\n' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/peoplepicker/peoplePickerDirective.ts');
	                throw '[ngOfficeUiFabric] - Error';
	            }
	            return _this.templateTypes[PeoplePickerTypes[type]];
	        };
	        this.link = function ($scope, $element, $attrs, ctrls, $transclude) {
	            var ngModelCtrl = ctrls[0];
	            var peoplePickerCtrl = ctrls[1];
	            _this.initDisabledState($element, $scope, $attrs);
	            $scope.facePileHeader = $scope.facePileHeader || 'Suggested contacts';
	            $scope.$watchCollection('selectedPersons', function (data, data2, data3) {
	                _this.resizeSearchField($element);
	            });
	            ngModelCtrl.$render = function () {
	                if (ngModelCtrl.$viewValue) {
	                    $scope.selectedPersons = ngModelCtrl.$viewValue;
	                }
	                else {
	                    $scope.selectedPersons = [];
	                }
	                _this.resizeSearchField($element);
	            };
	            peoplePickerCtrl.search();
	            var searchTimeout = null;
	            $scope.onSearchKeyUp = function ($event) {
	                var $searchMore = angular.element($element[0].querySelector('.ms-PeoplePicker-searchMore'));
	                if ($searchMore.length !== 0) {
	                    $scope.searchQuery ? $element.addClass('is-searching') : $element.removeClass('is-searching');
	                    $scope.searchQuery ? $searchMore.addClass('is-active') : $searchMore.removeClass('is-active');
	                    _this.animateSelectedPeople($element);
	                }
	                if (!$scope.delay) {
	                    return;
	                }
	                if (searchTimeout != null) {
	                    _this.$timeout.cancel(searchTimeout);
	                }
	                searchTimeout = _this.$timeout(function () {
	                    peoplePickerCtrl.search();
	                }, $scope.delay);
	            };
	            $scope.onPeoplePickerActive = function ($event) {
	                _this.smoothScrollTo($element[0]);
	                if ($scope.type !== PeoplePickerTypes[PeoplePickerTypes.facePile]) {
	                    var $results = angular.element($element[0].querySelector('.ms-PeoplePicker-results'));
	                    $results[0].style.width = $element[0].clientWidth - 2 + 'px';
	                }
	                else if ($scope.type === PeoplePickerTypes[PeoplePickerTypes.facePile]) {
	                    _this.animateSelectedPeople($element);
	                }
	                $event.stopPropagation();
	                $element.addClass('is-active');
	            };
	            $scope.addPersonToSelectedPeople = function (person) {
	                if ($scope.selectedPersons.indexOf(person) !== -1) {
	                    return;
	                }
	                $scope.selectedPersons.push(person);
	                ngModelCtrl.$setViewValue($scope.selectedPersons);
	            };
	            $scope.removePersonFromSelectedPeople = function (person, $event) {
	                var indx = $scope.selectedPersons.indexOf(person);
	                $scope.selectedPersons.splice(indx, 1);
	                ngModelCtrl.$setViewValue($scope.selectedPersons);
	                $event.stopPropagation();
	            };
	            $scope.removePersonFromSearchResults = function (people, person, $event) {
	                $event.stopPropagation();
	                var indx = people.indexOf(person);
	                people.splice(indx, 1);
	            };
	            _this.$document.on('click', function () {
	                $element.removeClass('is-active');
	            });
	            if ($scope.type === PeoplePickerTypes[PeoplePickerTypes.facePile]) {
	                $transclude(function (clone) {
	                    _this.insertFacePileHeader(clone, $scope, $element);
	                    _this.insertFacePileSearchMore(clone, $scope, $element);
	                });
	            }
	        };
	        this.templateTypes[PeoplePickerTypes.grouped] =
	            "<div class=\"ms-PeoplePicker\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <div class=\"ms-PeoplePicker-persona\" ng-repeat=\"person in selectedPersons track by $index\">\n              <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n                uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n                uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"\n                uif-presence=\"{{person.presence}}\"\n                uif-image-url=\"{{person.icon}}\">\n                <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              </uif-persona>\n              <button type=\"button\" ng-click=\"removePersonFromSelectedPeople(person, $event)\" class=\"ms-PeoplePicker-personaRemove\">\n                <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n              </button>\n            </div>\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            placeholder=\"{{placeholder}}\"\n            ng-model=\"searchQuery\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-resultGroups\">\n            <div class=\"ms-PeoplePicker-resultGroup\" ng-repeat=\"groupData in groups | orderBy:'-order'\">\n              <div class=\"ms-PeoplePicker-resultGroupTitle\">{{groupData.group.name}}</div>\n              <uif-people-picker-result-list\n              ng-model=\"groupData.people\"\n              uif-person-click=\"addPersonToSelectedPeople\"\n              uif-person-close-click=\"removePersonFromSearchResults\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.medium] + "\"></uif-people-picker-result-list>\n            </div>\n          </div>\n          <ng-transclude />\n        </div>\n      </div>";
	        this.templateTypes[PeoplePickerTypes.compact] =
	            "<div class=\"ms-PeoplePicker ms-PeoplePicker--compact\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <div class=\"ms-PeoplePicker-persona\" ng-repeat=\"person in selectedPersons track by $index\">\n              <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n                uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n                uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"\n                uif-presence=\"{{person.presence}}\"\n                uif-image-url=\"{{person.icon}}\">\n                <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              </uif-persona>\n              <button type=\"button\" ng-click=\"removePersonFromSelectedPeople(person, $event)\" class=\"ms-PeoplePicker-personaRemove\">\n                <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n              </button>\n            </div>\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            ng-model=\"searchQuery\"\n            placeholder=\"{{placeholder}}\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-resultGroups\">\n            <div class=\"ms-PeoplePicker-resultGroup\" ng-repeat=\"groupData in groups | orderBy:'-order'\">\n              <div class=\"ms-PeoplePicker-resultGroupTitle\">{{groupData.group.name}}</div>\n              <uif-people-picker-result-list\n              ng-model=\"groupData.people\"\n              uif-picker-type=\"" + PeoplePickerTypes[PeoplePickerTypes.compact] + "\"\n              uif-person-click=\"addPersonToSelectedPeople\"\n              uif-person-close-click=\"removePersonFromSearchResults\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"></uif-people-picker-result-list>\n            </div>\n          </div>\n          <ng-transclude />\n        </div>\n      </div>";
	        this.templateTypes[PeoplePickerTypes.memberList] = "\n      <div class=\"ms-PeoplePicker ms-PeoplePicker--membersList\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            placeholder=\"{{placeholder}}\"\n            ng-model=\"searchQuery\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-resultGroups\">\n            <div class=\"ms-PeoplePicker-resultGroup\" ng-repeat=\"groupData in groups | orderBy:'-order'\">\n              <uif-people-picker-result-list\n              ng-model=\"groupData.people\"\n              uif-person-click=\"addPersonToSelectedPeople\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.round] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.medium] + "\"></uif-people-picker-result-list>\n            </div>\n          </div>\n        </div>\n        <uif-people-picker-selected ng-model=\"selectedPersons\"\n        uif-selected-person-click=\"onSelectedPersonClick()\"\n        uif-person-close=\"removePersonFromSelectedPeople\">\n          <ng-transclude></ng-transclude>\n        </uif-people-picker-selected>\n      </div>";
	        this.templateTypes[PeoplePickerTypes.facePile] = "\n      <div class=\"ms-PeoplePicker ms-PeoplePicker--Facepile\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            placeholder=\"{{placeholder}}\"\n            ng-model=\"searchQuery\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-peopleListHeader\">\n              <span>{{facePileHeader}}</span>\n          </div>\n          <div ng-repeat=\"groupData in groups | orderBy:'-order'\">\n            <uif-people-picker-result-list\n            ng-model=\"groupData.people\"\n            uif-person-click=\"addPersonToSelectedPeople\"\n            uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.round] + "\"\n            uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.small] + "\"></uif-people-picker-result-list>\n          </div>\n          <div class=\"uif-search-more\"></div>\n        </div>\n        <uif-people-picker-selected ng-model=\"selectedPersons\"\n        uif-selected-person-click=\"onSelectedPersonClick()\"\n        uif-person-close=\"removePersonFromSelectedPeople\">\n          <div class=\"uif-people-header\"></div>\n        </uif-people-picker-selected>\n\n      </div>";
	    }
	    PeoplePickerDirective.factory = function () {
	        var directive = function ($document, $timeout, $log, $window) {
	            return new PeoplePickerDirective($document, $timeout, $log, $window);
	        };
	        directive.$inject = ['$document', '$timeout', '$log', '$window'];
	        return directive;
	    };
	    PeoplePickerDirective.prototype.initDisabledState = function ($element, $scope, $attrs) {
	        var $searchField = angular.element($element[0].querySelector('.ms-PeoplePicker-searchField'));
	        $attrs.$observe('disabled', function (disabled) {
	            if (disabled) {
	                $searchField.attr('disabled', 'disabled');
	            }
	            else {
	                $searchField.removeAttr('disabled');
	            }
	        });
	    };
	    PeoplePickerDirective.prototype.animateSelectedPeople = function ($element) {
	        var $selectedPeople = angular.element($element[0].querySelector('.ms-PeoplePicker-selectedPeople'));
	        $selectedPeople.addClass('ms-u-slideDownIn20');
	        setTimeout(function () { $selectedPeople.removeClass('ms-u-slideDownIn20'); }, 1000);
	    };
	    PeoplePickerDirective.prototype.currentYPosition = function () {
	        if (this.$window.pageYOffset) {
	            return this.$window.pageYOffset;
	        }
	        var body = angular.element(this.$document[0]).find('body')[0];
	        if (body.scrollTop) {
	            return body.scrollTop;
	        }
	        return 0;
	    };
	    PeoplePickerDirective.prototype.elmYPosition = function (element) {
	        var y = element.offsetTop;
	        var node = element;
	        while (node.offsetParent && node.offsetParent !== document.body) {
	            node = (node.offsetParent);
	            y += node.offsetTop;
	        }
	        return y;
	    };
	    PeoplePickerDirective.prototype.smoothScrollTo = function (element) {
	        var startY = this.currentYPosition();
	        var stopY = this.elmYPosition(element);
	        var distance = stopY > startY ? stopY - startY : startY - stopY;
	        if (distance < 100) {
	            window.scrollTo(0, stopY);
	            return;
	        }
	        var speed = Math.round(distance / 30);
	        if (speed >= 20) {
	            speed = 20;
	        }
	        var step = Math.round(distance / 25);
	        var leapY = stopY > startY ? startY + step : startY - step;
	        var timer = 0;
	        if (stopY > startY) {
	            for (var i = startY; i < stopY; i += step) {
	                (function (lY, t) {
	                    setTimeout(function () {
	                        window.scrollTo(0, lY);
	                    }, t * speed);
	                })(leapY, timer);
	                leapY += step;
	                if (leapY > stopY) {
	                    leapY = stopY;
	                }
	                timer++;
	            }
	            return;
	        }
	        for (var i = startY; i > stopY; i -= step) {
	            (function (lY, t) {
	                setTimeout(function () {
	                    window.scrollTo(0, lY);
	                }, t * speed);
	            })(leapY, timer);
	            leapY -= step;
	            if (leapY < stopY) {
	                leapY = stopY;
	            }
	            timer++;
	        }
	    };
	    PeoplePickerDirective.prototype.insertFacePileHeader = function (clone, $scope, $element) {
	        var elementToReplace = angular.element($element[0].querySelector('.uif-people-header'));
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass('ms-PeoplePicker-selectedCount')) {
	                elementToReplace.replaceWith(element);
	                break;
	            }
	        }
	    };
	    PeoplePickerDirective.prototype.insertFacePileSearchMore = function (clone, $scope, $element) {
	        var elementToReplace = angular.element($element[0].querySelector('.uif-search-more'));
	        for (var i = 0; i < clone.length; i++) {
	            var element = angular.element(clone[i]);
	            if (element.hasClass('ms-PeoplePicker-searchMore')) {
	                elementToReplace.replaceWith(element);
	                break;
	            }
	        }
	    };
	    PeoplePickerDirective.prototype.resizeSearchField = function ($peoplePicker) {
	        var $searchBox = angular.element($peoplePicker[0].querySelector('.ms-PeoplePicker-searchBox'));
	        var $searchField = angular.element($peoplePicker[0].querySelector('.ms-PeoplePicker-searchField'));
	        var searchBoxLeftEdge = $searchBox.prop('offsetLeft');
	        var searchBoxWidth = $searchBox[0].clientWidth;
	        var searchBoxRightEdge = searchBoxLeftEdge + searchBoxWidth;
	        var $personaNodes = $searchBox[0].querySelectorAll('.ms-PeoplePicker-persona');
	        if ($personaNodes.length === 0) {
	            $searchField[0].style.width = '100%';
	            return;
	        }
	        var $lastPersona = angular.element($personaNodes[$personaNodes.length - 1]);
	        var lastPersonaLeftEdge = $lastPersona.prop('offsetLeft');
	        var lastPersonaWidth = $lastPersona[0].clientWidth;
	        var lastPersonaRightEdge = lastPersonaLeftEdge + lastPersonaWidth;
	        var newFieldWidth = searchBoxRightEdge - lastPersonaRightEdge - 5;
	        if (newFieldWidth < 100) {
	            newFieldWidth = '100%';
	            $searchField[0].style.width = '100%';
	        }
	        else {
	            $searchField[0].style.width = newFieldWidth + 'px';
	        }
	    };
	    PeoplePickerDirective.directiveName = 'uifPeoplePicker';
	    return PeoplePickerDirective;
	}());
	exports.PeoplePickerDirective = PeoplePickerDirective;
	var PeoplePickerResultListDirective = (function () {
	    function PeoplePickerResultListDirective() {
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = "\n  <ul class=\"ms-PeoplePicker-resultList\">\n    <li class=\"ms-PeoplePicker-result\" ng-repeat=\"person in people track by $index\">\n      <div role=\"button\" class=\"ms-PeoplePicker-resultBtn\"\n      ng-class=\"{'ms-PeoplePicker-resultBtn--compact': pickerType === 'compact'}\" ng-click=\"onPersonClick()(person)\">\n        <uif-persona\n          uif-style=\"{{personStyle}}\"\n          uif-size=\"{{personSize}}\"\n          uif-presence=\"{{person.presence}}\"\n          uif-image-url=\"{{person.icon}}\">\n          <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n          <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n          <uif-persona-secondary-text>{{person.secondaryText}}</uif-persona-secondary-text>\n        </uif-persona>\n        <button type=\"button\"\n          ng-if=\"!person.additionalData && onPersonCloseClick()\"\n          ng-click=\"onPersonCloseClick()(people, person, $event)\"\n          class=\"ms-PeoplePicker-resultAction js-resultRemove\">\n          <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n        </button>\n        <button type=\"button\"\n          ng-if=\"person.additionalData\"\n          ng-click=\"expandAdditionalData($event)\"\n          class=\"ms-PeoplePicker-resultAction js-resultRemove\">\n          <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.chevronsDown] + "\"></uif-icon>\n        </button>\n      </div>\n      <div ng-if=\"person.additionalData\" class=\"ms-PeoplePicker-resultAdditionalContent\">\n        <uif-people-picker-result-list\n        ng-model=\"person.additionalData\"\n        uif-person-click=\"onPersonClick()\"\n        uif-person-close-click=\"onPersonCloseClick()\"\n        uif-picker-type=\"{{pickerType}}\"\n        uif-style=\"{{personStyle}}\"\n        uif-size=\"{{personSize}}\"></uif-people-picker-result-list>\n      </div>\n    </li>\n  </ul>";
	        this.scope = {
	            onPersonClick: '&uifPersonClick',
	            onPersonCloseClick: '&uifPersonCloseClick',
	            people: '=ngModel',
	            personSize: '@uifSize',
	            personStyle: '@uifStyle',
	            pickerType: '@uifPickerType'
	        };
	        this.link = function ($scope, $element, $attrs, peoplePickerCtrl, $transclude) {
	            $scope.expandAdditionalData = function ($event) {
	                $event.stopPropagation();
	                var $button = angular.element($event.target);
	                for (var i = 0; i < 10; i++) {
	                    var $parent = $button.parent();
	                    if ($parent.hasClass('ms-PeoplePicker-result')) {
	                        $parent.toggleClass('is-expanded');
	                        break;
	                    }
	                    $button = $parent;
	                }
	            };
	        };
	    }
	    PeoplePickerResultListDirective.factory = function () {
	        var directive = function () { return new PeoplePickerResultListDirective(); };
	        return directive;
	    };
	    PeoplePickerResultListDirective.directiveName = 'uifPeoplePickerResultList';
	    return PeoplePickerResultListDirective;
	}());
	exports.PeoplePickerResultListDirective = PeoplePickerResultListDirective;
	var PeopleSearchMoreController = (function () {
	    function PeopleSearchMoreController($scope, $element) {
	        this.$scope = $scope;
	        this.$element = $element;
	        this.searchCallbacks = [];
	    }
	    PeopleSearchMoreController.prototype.isSearching = function (searching) {
	        this.$scope.processing = searching;
	        searching ? this.$element.addClass('is-searching') : this.$element.removeClass('is-searching');
	    };
	    PeopleSearchMoreController.$inject = ['$scope', '$element'];
	    return PeopleSearchMoreController;
	}());
	exports.PeopleSearchMoreController = PeopleSearchMoreController;
	var PeopleSearchMoreDirective = (function () {
	    function PeopleSearchMoreDirective() {
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.require = "^^" + PeoplePickerDirective.directiveName;
	        this.controller = PeopleSearchMoreController;
	        this.template = "\n  <div class=\"ms-PeoplePicker-searchMore js-searchMore\"\n    ng-class=\"{'ms-PeoplePicker-searchMore--disconnected': disconnected}\">\n    <button type=\"button\" ng-if=\"pickerType === '" + PeoplePickerTypes[PeoplePickerTypes.grouped] + "' && !disconnected\"\n      ng-click=\"onSearch($event)\" class=\"ms-PeoplePicker-searchMoreBtn\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon ng-if=\"!disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.search] + "\"></uif-icon>\n        <uif-icon ng-if=\"disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </button>\n    <div role=\"button\" ng-if=\"pickerType === '" + PeoplePickerTypes[PeoplePickerTypes.compact] + "' && !disconnected\"\n      ng-click=\"onSearch($event)\" class=\"ms-PeoplePicker-searchMoreBtn ms-PeoplePicker-searchMoreBtn--compact\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon ng-if=\"!disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.search] + "\"></uif-icon>\n        <uif-icon ng-if=\"disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </div>\n    <div role=\"button\" ng-if=\"pickerType === '" + PeoplePickerTypes[PeoplePickerTypes.facePile] + "' && !disconnected\"\n      ng-click=\"onSearch($event)\" class=\"ms-PeoplePicker-searchMoreBtn ms-PeoplePicker-searchMoreBtn--compact\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon ng-if=\"!disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.search] + "\"></uif-icon>\n        <uif-icon ng-if=\"disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </div>\n    <div role=\"button\" ng-if=\"disconnected\" class=\"ms-PeoplePicker-searchMoreBtn\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </div>\n    <uif-spinner ng-show=\"processing\"></uif-spinner>\n  </div>";
	        this.scope = {
	            disconnected: '=uifDisconnected'
	        };
	        this.link = function ($scope, $element, $attrs, peoplePickerCtrl, $transclude) {
	            $scope.pickerType = peoplePickerCtrl.pickerType();
	            $scope.onSearch = function ($event) {
	                $event.stopPropagation();
	                peoplePickerCtrl.search();
	                $scope.$broadcast(peopleSearchEventName, peoplePickerCtrl.searchQuery());
	            };
	        };
	    }
	    PeopleSearchMoreDirective.factory = function () {
	        var directive = function () { return new PeopleSearchMoreDirective(); };
	        return directive;
	    };
	    PeopleSearchMoreDirective.directiveName = 'uifPeopleSearchMore';
	    return PeopleSearchMoreDirective;
	}());
	exports.PeopleSearchMoreDirective = PeopleSearchMoreDirective;
	var PrimaryTextController = (function () {
	    function PrimaryTextController($scope) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$scope.$on(peopleSearchEventName, function ($event, query) {
	            _this.$scope.searchQuery = query;
	        });
	    }
	    PrimaryTextController.$inject = ['$scope'];
	    return PrimaryTextController;
	}());
	exports.PrimaryTextController = PrimaryTextController;
	var PrimaryTextDirective = (function () {
	    function PrimaryTextDirective() {
	        this.replace = true;
	        this.restrict = 'E';
	        this.require = [("^^" + PeopleSearchMoreDirective.directiveName), ("^^" + PeoplePickerDirective.directiveName)];
	        this.transclude = true;
	        this.controller = PrimaryTextController;
	        this.template = "\n  <div ng-show=\"!$parent.$parent.disconnected\" class=\"ms-PeoplePicker-searchMorePrimary\">\n    <div ng-show=\"$parent.$parent.processing\">{{searchingForText}} {{searchQuery}}</div>\n    <ng-transclude ng-show=\"!$parent.$parent.processing\"></ng-transclude>\n  </div>";
	        this.scope = {
	            searchingForText: '@?uifSearchForText'
	        };
	        this.link = function ($scope, $element, $attrs, ctrls, $transclude) {
	            $scope.searchingForText = $scope.searchingForText || 'Searching for';
	        };
	    }
	    PrimaryTextDirective.factory = function () {
	        var directive = function () { return new PrimaryTextDirective(); };
	        return directive;
	    };
	    PrimaryTextDirective.directiveName = 'uifPrimaryText';
	    return PrimaryTextDirective;
	}());
	exports.PrimaryTextDirective = PrimaryTextDirective;
	var SecondaryTextDirective = (function () {
	    function SecondaryTextDirective() {
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = "\n  <div ng-show=\"!$parent.$parent.disconnected\" class=\"ms-PeoplePicker-searchMoreSecondary\">\n    <ng-transclude></ng-transclude>\n  </div>";
	        this.scope = true;
	    }
	    SecondaryTextDirective.factory = function () {
	        var directive = function () { return new SecondaryTextDirective(); };
	        return directive;
	    };
	    SecondaryTextDirective.directiveName = 'uifSecondaryText';
	    return SecondaryTextDirective;
	}());
	exports.SecondaryTextDirective = SecondaryTextDirective;
	var DisconnectedTextDirective = (function () {
	    function DisconnectedTextDirective() {
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = "\n  <div ng-show=\"$parent.$parent.disconnected\" class=\"ms-PeoplePicker-searchMorePrimary\">\n    <ng-transclude></ng-transclude>\n  </div>";
	        this.scope = true;
	    }
	    DisconnectedTextDirective.factory = function () {
	        var directive = function () { return new DisconnectedTextDirective(); };
	        return directive;
	    };
	    DisconnectedTextDirective.directiveName = 'uifDisconnectedText';
	    return DisconnectedTextDirective;
	}());
	exports.DisconnectedTextDirective = DisconnectedTextDirective;
	var PeoplePickerSelectedDirective = (function () {
	    function PeoplePickerSelectedDirective() {
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.template = "\n    <div class=\"ms-PeoplePicker-selected\" ng-class=\"{'is-active': selectedPeople && selectedPeople.length > 0}\">\n        <div class=\"ms-PeoplePicker-selectedHeader\">\n            <ng-transclude></ng-transclude>\n        </div>\n        <ul class=\"ms-PeoplePicker-selectedPeople\">\n          <li class=\"ms-PeoplePicker-selectedPerson\" ng-repeat=\"person in selectedPeople track by $index\">\n            <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.round] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.small] + "\"\n              uif-presence=\"{{person.presence}}\"\n              uif-image-url=\"{{person.icon}}\">\n              <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n              <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              <uif-persona-secondary-text>{{person.secondaryText}}</uif-persona-secondary-text>\n            </uif-persona>\n            <button type=\"button\"\n                    ng-click=\"removePersonFromSelectedPeople()(person, $event)\"\n                    class=\"ms-PeoplePicker-resultAction js-resultRemove\">\n              <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n            </button>\n          </li>\n        </ul>\n    </div>";
	        this.scope = {
	            onSelectedPersonClick: '&?uifSelectedPersonClick',
	            removePersonFromSelectedPeople: '&uifPersonClose',
	            selectedPeople: '=ngModel'
	        };
	    }
	    PeoplePickerSelectedDirective.factory = function () {
	        var directive = function () { return new PeoplePickerSelectedDirective(); };
	        return directive;
	    };
	    PeoplePickerSelectedDirective.directiveName = 'uifPeoplePickerSelected';
	    return PeoplePickerSelectedDirective;
	}());
	exports.PeoplePickerSelectedDirective = PeoplePickerSelectedDirective;
	var SelectedPeopleHeaderDirective = (function () {
	    function SelectedPeopleHeaderDirective() {
	        this.require = "^^" + PeoplePickerDirective.directiveName;
	        this.replace = true;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.scope = true;
	        this.template = "<span class=\"ms-PeoplePicker-selectedCount\" ng-transclude></span>";
	        this.link = function ($scope, $element, $attrs, peoplePickerCtrl, $transclude) {
	            $scope.selectedPersons = peoplePickerCtrl.getSelectedPersons();
	        };
	    }
	    SelectedPeopleHeaderDirective.factory = function () {
	        var directive = function () { return new SelectedPeopleHeaderDirective(); };
	        return directive;
	    };
	    SelectedPeopleHeaderDirective.directiveName = 'uifSelectedPeopleHeader';
	    return SelectedPeopleHeaderDirective;
	}());
	exports.SelectedPeopleHeaderDirective = SelectedPeopleHeaderDirective;
	exports.module = angular.module('officeuifabric.components.peoplepicker', [
	    'officeuifabric.components'])
	    .directive(PeoplePickerDirective.directiveName, PeoplePickerDirective.factory())
	    .directive(PrimaryTextDirective.directiveName, PrimaryTextDirective.factory())
	    .directive(SecondaryTextDirective.directiveName, SecondaryTextDirective.factory())
	    .directive(PeoplePickerResultListDirective.directiveName, PeoplePickerResultListDirective.factory())
	    .directive(DisconnectedTextDirective.directiveName, DisconnectedTextDirective.factory())
	    .directive(PeoplePickerSelectedDirective.directiveName, PeoplePickerSelectedDirective.factory())
	    .directive(SelectedPeopleHeaderDirective.directiveName, SelectedPeopleHeaderDirective.factory())
	    .directive(PeopleSearchMoreDirective.directiveName, PeopleSearchMoreDirective.factory());


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyODE0MjdhZDkxYjBiNDU0Mzc5ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVGVtcGxhdGVUeXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9mYWNlcGlsZS9mYWNlcGlsZURpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhci9tZXNzYWdlQmFyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheU1vZGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9wZXJzb25hY2FyZERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9wbGFjZWhvbGRlckVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVN0eWxlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdFNpemVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90VHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQSxnRDs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5SEFBd0gsUUFBUSxnQkFBZ0IsYUFBYTtBQUM3SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsc0NBQXNDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSwwSkFBeUoscURBQXFEO0FBQzlNO0FBQ0EsaUhBQWdILHFEQUFxRDtBQUNySztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5Qyw4Q0FBOEM7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUIsVUFBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx1REFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDRDQUE0QztBQUM3QztBQUNBOzs7Ozs7O0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkJBQTZCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsVUFBVTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNEJBQTRCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQiwrQkFBK0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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a0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7OztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0Es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QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDBDQUEwQztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUMsMkNBQTJDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyx1QkFBdUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtMQUE4TCxPQUFPO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx1Q0FBdUM7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywyQ0FBMkM7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBbUYseURBQXlELG9sQkFBb2xCLGlCQUFpQixvQ0FBb0MsYUFBYSx1REFBdUQsY0FBYyxLQUFLLGlCQUFpQixtRUFBbUUsb0JBQW9CLHlFQUF5RSxzQkFBc0I7QUFDbmpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im5nT2ZmaWNlVWlGYWJyaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpIDogZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyODE0MjdhZDkxYjBiNDU0Mzc5ZiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29yZScsIFtdKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvY29yZS50c1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYW5ndWxhclwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGJyZWFkY3J1bWJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZScpO1xudmFyIGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbkRpcmVjdGl2ZScpO1xudmFyIGNhbGxvdXRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZScpO1xudmFyIGNob2ljZWZpZWxkTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZERpcmVjdGl2ZScpO1xudmFyIGNvbW1hbmRCYXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZScpO1xudmFyIGNvbnRlbnRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbnRlbnQvY29udGVudERpcmVjdGl2ZScpO1xudmFyIGNvbnRleHR1YWxNZW51TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudScpO1xudmFyIGRhdGVwaWNrZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZScpO1xudmFyIGRpYWxvZ01vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZScpO1xudmFyIGRyb3Bkb3duTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZScpO1xudmFyIGZhY2VwaWxlTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9mYWNlcGlsZS9mYWNlcGlsZURpcmVjdGl2ZScpO1xudmFyIGljb25Nb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZScpO1xudmFyIGxhYmVsTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZScpO1xudmFyIGxpbmtNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2xpbmsvbGlua0RpcmVjdGl2ZScpO1xudmFyIGxpc3RNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2xpc3QvbGlzdERpcmVjdGl2ZScpO1xudmFyIG1lc3NhZ2VCYW5uZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL21lc3NhZ2ViYW5uZXIvbWVzc2FnZUJhbm5lckRpcmVjdGl2ZScpO1xudmFyIG1lc3NhZ2VCYXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhckRpcmVjdGl2ZScpO1xudmFyIG5hdkJhck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZScpO1xudmFyIG92ZXJsYXlNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheURpcmVjdGl2ZScpO1xudmFyIHBhbmVsTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZScpO1xudmFyIHBlcnNvbmFjYXJkTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wZXJzb25hY2FyZC9wZXJzb25hY2FyZERpcmVjdGl2ZScpO1xudmFyIHBlcnNvbmFNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZScpO1xudmFyIHBpdm90TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZScpO1xudmFyIHByb2dyZXNzSW5kaWNhdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wcm9ncmVzc2luZGljYXRvci9wcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZScpO1xudmFyIHNlYXJjaGJveE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZScpO1xudmFyIHNwaW5uZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lckRpcmVjdGl2ZScpO1xudmFyIHRhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90YWJsZS90YWJsZURpcmVjdGl2ZScpO1xudmFyIHRleHRGaWVsZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZScpO1xudmFyIHRvZ2dsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdG9nZ2xlL3RvZ2dsZURpcmVjdGl2ZScpO1xudmFyIG9yZ0NoYXJ0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydERpcmVjdGl2ZScpO1xudmFyIHBlb3BsZVBpY2tlck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGVvcGxlcGlja2VyL3Blb3BsZVBpY2tlckRpcmVjdGl2ZScpO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cycsIFtcbiAgICBicmVhZGNydW1iTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGJ1dHRvbk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjYWxsb3V0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNob2ljZWZpZWxkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNvbW1hbmRCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY29udGVudE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb250ZXh0dWFsTWVudU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkYXRlcGlja2VyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRpYWxvZ01vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkcm9wZG93bk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBmYWNlcGlsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBpY29uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxhYmVsTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxpbmtNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGlzdE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBtZXNzYWdlQmFubmVyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG1lc3NhZ2VCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbmF2QmFyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG92ZXJsYXlNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGFuZWxNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGVvcGxlUGlja2VyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFjYXJkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGl2b3RNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcHJvZ3Jlc3NJbmRpY2F0b3JNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgc2VhcmNoYm94TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHNwaW5uZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGFibGVNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGV4dEZpZWxkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRvZ2dsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBvcmdDaGFydE1vZHVsZS5tb2R1bGUubmFtZVxuXSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2NvbXBvbmVudHMudHNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkJyZWFkY3J1bWInO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxsaSBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1saXN0SXRlbVxcXCI+XFxuICAgIDxhIGNsYXNzPVxcXCJtcy1CcmVhZGNydW1iLWl0ZW1MaW5rXFxcIiBuZy1ocmVmPVxcXCJ7e25nSHJlZn19XFxcIiB0YWJpbmRleD1cXFwie3t1aWZUYWJpbmRleH19XFxcIiBuZy10cmFuc2NsdWRlPjwvYT5cXG4gICAgPGkgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItY2hldnJvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgPC9saT5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIHRhYmluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkuY2hpbGRyZW4oKSwgaW5zdGFuY2VFbGVtZW50WzBdKSArIDI7XG4gICAgICAgIHNjb3BlLnVpZlRhYmluZGV4ID0gdGFiaW5kZXg7XG4gICAgfTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iTGlua0RpcmVjdGl2ZSA9IEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlO1xudmFyIEJyZWFkY3J1bWJMaW5rID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iTGluayhocmVmLCBsaW5rVGV4dCkge1xuICAgICAgICB0aGlzLmhyZWYgPSBocmVmO1xuICAgICAgICB0aGlzLmxpbmtUZXh0ID0gbGlua1RleHQ7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZGNydW1iTGluaztcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJMaW5rID0gQnJlYWRjcnVtYkxpbms7XG52YXIgQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJDb250cm9sbGVyKCRzY29wZSwgJGRvY3VtZW50LCAkd2luZG93KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICB9XG4gICAgQnJlYWRjcnVtYkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRkb2N1bWVudCcsICckd2luZG93J107XG4gICAgcmV0dXJuIEJyZWFkY3J1bWJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSBCcmVhZGNydW1iQ29udHJvbGxlcjtcbnZhciBCcmVhZGNydW1iRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWJcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLW92ZXJmbG93JzogaXNPdmVyZmxvdygpfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItb3ZlcmZsb3dcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItb3ZlcmZsb3dCdXR0b24gbXMtSWNvbiBtcy1JY29uLS1lbGxpcHNpc1xcXCJcXG4gICAgICAgICAgIG5nLWNsaWNrPVxcXCJvcGVuT3ZlcmZsb3coJGV2ZW50KVxcXCIgdGFiaW5kZXg9XFxcIjFcXFwiPjwvZGl2PlxcbiAgICAgIDxpIGNsYXNzPVxcXCJtcy1CcmVhZGNydW1iLWNoZXZyb24gbXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHRcXFwiPjwvaT5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1CcmVhZGNydW1iLW92ZXJmbG93TWVudVxcXCIgbmctY2xhc3M9XFxcInsnaXMtb3Blbic6IG92ZXJmbG93TWVudU9wZW59XFxcIj5cXG4gICAgICAgIDx1bCBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUgaXMtb3BlblxcXCI+XFxuICAgICAgICAgIDxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCJcXG4gICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwibGluayBpbiB1aWZCcmVhZGNydW1iTGlua3MgfCBsaW1pdFRvOm92ZXJmbG93RWxlbWVudHMoKVxcXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmtcXFwiIG5nLWhyZWY9XFxcInt7bGluay5ocmVmfX1cXFwiPnt7bGluay5saW5rVGV4dH19PC9hPlxcbiAgICAgICAgICA8L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDx1bCBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1saXN0XFxcIj5cXG4gICAgICA8dWlmLWJyZWFkY3J1bWItbGluayBuZy1yZXBlYXQ9XFxcImxpbmsgaW4gdWlmQnJlYWRjcnVtYkxpbmtzIHwgbGltaXRUbzotdmlzaWJsZUVsZW1lbnRzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWhyZWY9XFxcInt7bGluay5ocmVmfX1cXFwiPnt7bGluay5saW5rVGV4dH19PC91aWYtYnJlYWRjcnVtYi1saW5rPlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IEJyZWFkY3J1bWJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAndWlmQnJlYWRjcnVtYic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAndWlmQnJlYWRjcnVtYkxpbmtzJzogJz0nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuU01BTExfQlJFQUtfUE9JTlQgPSA2Mzk7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRpbnN0YW5jZUVsZW1lbnQsICRhdHRycywgJGJyZWFkY3J1bWJDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAkc2NvcGUudmlzaWJsZUVsZW1lbnRzID0gNDtcbiAgICAgICAgICAgICRzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAkc2NvcGUuaXNPdmVyZmxvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcmZsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS51aWZCcmVhZGNydW1iTGlua3MpICYmICRzY29wZS51aWZCcmVhZGNydW1iTGlua3MubGVuZ3RoID4gJHNjb3BlLnZpc2libGVFbGVtZW50cztcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3c7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93RWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5pc092ZXJmbG93KCkgPyAkc2NvcGUudWlmQnJlYWRjcnVtYkxpbmtzLmxlbmd0aCAtICRzY29wZS52aXNpYmxlRWxlbWVudHMgOiAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vcGVuT3ZlcmZsb3cgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRicmVhZGNydW1iQ29udHJvbGxlci4kd2luZG93KS5iaW5kKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGJyZWFkY3J1bWJDb250cm9sbGVyLiRkb2N1bWVudC5maW5kKCdodG1sJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5vblJlc2l6ZSA9IGZ1bmN0aW9uIChpbm5lcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyV2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50c1RvU2hvdyA9IChpbm5lcldpZHRoID4gX3RoaXMuU01BTExfQlJFQUtfUE9JTlQpID8gNCA6IDI7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzVG9TaG93ICE9PSAkc2NvcGUudmlzaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS52aXNpYmxlRWxlbWVudHMgPSBlbGVtZW50c1RvU2hvdztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub25SZXNpemUoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQnJlYWRjcnVtYkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJyZWFkY3J1bWJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBCcmVhZGNydW1iRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQnJlYWRjcnVtYkRpcmVjdGl2ZSA9IEJyZWFkY3J1bWJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJyZWFkY3J1bWInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCcmVhZGNydW1iJywgQnJlYWRjcnVtYkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQnJlYWRjcnVtYkxpbmsnLCBCcmVhZGNydW1iTGlua0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgYnV0dG9uVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vYnV0dG9uVHlwZUVudW0nKTtcbnZhciBidXR0b25UZW1wbGF0ZVR5cGVfMSA9IHJlcXVpcmUoJy4vYnV0dG9uVGVtcGxhdGVUeXBlJyk7XG52YXIgQnV0dG9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnV0dG9uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIEJ1dHRvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBCdXR0b25Db250cm9sbGVyO1xufSgpKTtcbnZhciBCdXR0b25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnV0dG9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnYnV0dG9uJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoJGF0dHJzLnVpZlR5cGUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQoYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVskYXR0cnMudWlmVHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uIC0gVW5zdXBwb3J0ZWQgYnV0dG9uOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBidXR0b24gKFxcJycgKyAkYXR0cnMudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnMudWlmVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLnByaW1hcnldOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZEJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmhlcm9dOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZUh0bWxUZW1wbGF0ZXMoKTtcbiAgICB9XG4gICAgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGluayxcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlR5cGUpIHx8XG4gICAgICAgICAgICBhdHRycy51aWZUeXBlID09PSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0ucHJpbWFyeV0gfHxcbiAgICAgICAgICAgIGF0dHJzLnVpZlR5cGUgPT09IGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF0pIHtcbiAgICAgICAgICAgIHZhciBpY29uRWxlbWVudCA9IGVsZW1lbnQuZmluZCgndWlmLWljb24nKTtcbiAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVycy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5idXR0b24gLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0ljb24gbm90IGFsbG93ZWQgaW4gcHJpbWFyeSBvciBjb21wb3VuZCBidXR0b25zOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmltYXJ5ICYgY29tcG91bmQgYnV0dG9uIGRvZXMgbm90IHN1cHBvcnQgaW5jbHVkaW5nIGljb25zIGluIHRoZSBib2R5LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBpY29uIGhhcyBiZWVuIHJlbW92ZWQgYnV0IG1heSBjYXVzZSByZW5kZXJpbmcgZXJyb3JzLiBDb25zaWRlciBidXR0b25zIHRoYXQgc3VwcG9ydCBpY29ucyBzdWNoIGFzIGNvbW1hbmQgb3IgaGVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIHdyYXBwZXI7XG4gICAgICAgICAgICBzd2l0Y2ggKGF0dHJzLnVpZlR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21tYW5kXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdTUEFOJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWljb24nKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgIT09ICdTUEFOJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTGlzdFswXSA9PT0gJ25nLXNjb3BlJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWxhYmVsJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5oZXJvXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdTUEFOJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWljb24nKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuX3BvcHVsYXRlSHRtbFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b25cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25MaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b25cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLXByaW1hcnlcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZEJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21tYW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbXBvdW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZExpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbXBvdW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0J1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1oZXJvXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5oZXJvTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0taGVyb1xcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CdXR0b25EaXJlY3RpdmUgPSBCdXR0b25EaXJlY3RpdmU7XG52YXIgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkJ1dHRvbic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUJ1dHRvbi1kZXNjcmlwdGlvblwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgfVxuICAgIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlID0gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQnV0dG9uJywgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b25EZXNjcmlwdGlvbicsIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChCdXR0b25UeXBlRW51bSkge1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wicHJpbWFyeVwiXSA9IDBdID0gXCJwcmltYXJ5XCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJjb21tYW5kXCJdID0gMV0gPSBcImNvbW1hbmRcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImNvbXBvdW5kXCJdID0gMl0gPSBcImNvbXBvdW5kXCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJoZXJvXCJdID0gM10gPSBcImhlcm9cIjtcbn0pKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gfHwgKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gPSB7fSkpO1xudmFyIEJ1dHRvblR5cGVFbnVtID0gZXhwb3J0cy5CdXR0b25UeXBlRW51bTtcbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQnV0dG9uVGVtcGxhdGVUeXBlKSB7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImFjdGlvbkJ1dHRvblwiXSA9IDBdID0gXCJhY3Rpb25CdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiYWN0aW9uTGlua1wiXSA9IDFdID0gXCJhY3Rpb25MaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcInByaW1hcnlCdXR0b25cIl0gPSAyXSA9IFwicHJpbWFyeUJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJwcmltYXJ5TGlua1wiXSA9IDNdID0gXCJwcmltYXJ5TGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21tYW5kQnV0dG9uXCJdID0gNF0gPSBcImNvbW1hbmRCdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiY29tbWFuZExpbmtcIl0gPSA1XSA9IFwiY29tbWFuZExpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiY29tcG91bmRCdXR0b25cIl0gPSA2XSA9IFwiY29tcG91bmRCdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiY29tcG91bmRMaW5rXCJdID0gN10gPSBcImNvbXBvdW5kTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJoZXJvQnV0dG9uXCJdID0gOF0gPSBcImhlcm9CdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiaGVyb0xpbmtcIl0gPSA5XSA9IFwiaGVyb0xpbmtcIjtcbn0pKGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlIHx8IChleHBvcnRzLkJ1dHRvblRlbXBsYXRlVHlwZSA9IHt9KSk7XG52YXIgQnV0dG9uVGVtcGxhdGVUeXBlID0gZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGU7XG47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UZW1wbGF0ZVR5cGUudHNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2FsbG91dFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2NhbGxvdXRUeXBlRW51bScpO1xudmFyIGNhbGxvdXRBcnJvd0VudW1fMSA9IHJlcXVpcmUoJy4vY2FsbG91dEFycm93RW51bScpO1xudmFyIENhbGxvdXRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIENhbGxvdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIENhbGxvdXRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dENvbnRyb2xsZXIgPSBDYWxsb3V0Q29udHJvbGxlcjtcbnZhciBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWhlYWRlclwiPjxwIGNsYXNzPVwibXMtQ2FsbG91dC10aXRsZVwiIG5nLXRyYW5zY2x1ZGU+PC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgbWFpbldyYXBwZXIgPSBpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XG4gICAgICAgIGlmICghYW5ndWxhci5pc1VuZGVmaW5lZChtYWluV3JhcHBlcikgJiYgbWFpbldyYXBwZXIuaGFzQ2xhc3MoJ21zLUNhbGxvdXQtbWFpbicpKSB7XG4gICAgICAgICAgICB2YXIgZGV0YWNoZWRIZWFkZXIgPSBpbnN0YW5jZUVsZW1lbnQuZGV0YWNoKCk7XG4gICAgICAgICAgICBtYWluV3JhcHBlci5wcmVwZW5kKGRldGFjaGVkSGVhZGVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENhbGxvdXRIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0SGVhZGVyRGlyZWN0aXZlID0gQ2FsbG91dEhlYWRlckRpcmVjdGl2ZTtcbnZhciBDYWxsb3V0Q29udGVudERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FsbG91dENvbnRlbnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtY29udGVudFwiPjxwIGNsYXNzPVwibXMtQ2FsbG91dC1zdWJUZXh0XCIgbmctdHJhbnNjbHVkZT48L3A+PC9kaXY+JztcbiAgICB9XG4gICAgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0Q29udGVudERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENhbGxvdXRDb250ZW50RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dENvbnRlbnREaXJlY3RpdmUgPSBDYWxsb3V0Q29udGVudERpcmVjdGl2ZTtcbnZhciBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtYWN0aW9uc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmQ2FsbG91dCc7XG4gICAgfVxuICAgIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjYWxsb3V0Q29udHJvbGxlcikge1xuICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdChjYWxsb3V0Q29udHJvbGxlcikpIHtcbiAgICAgICAgICAgIGNhbGxvdXRDb250cm9sbGVyLiRzY29wZS4kd2F0Y2goJ2hhc1NlcGFyYXRvcicsIGZ1bmN0aW9uIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzU2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25DaGlsZHJlbiA9IGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGJ1dHRvbkluZGV4ID0gMDsgYnV0dG9uSW5kZXggPCBhY3Rpb25DaGlsZHJlbi5sZW5ndGg7IGJ1dHRvbkluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhY3Rpb25DaGlsZHJlbi5lcShidXR0b25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uYWRkQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uU3BhbnMgPSBhY3Rpb24uZmluZCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgc3BhbkluZGV4ID0gMDsgc3BhbkluZGV4IDwgYWN0aW9uU3BhbnMubGVuZ3RoOyBzcGFuSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFuID0gYWN0aW9uU3BhbnMuZXEoc3BhbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uU3Bhbi5oYXNDbGFzcygnbXMtQnV0dG9uLWxhYmVsJykgfHwgYWN0aW9uU3Bhbi5oYXNDbGFzcygnbXMtQnV0dG9uLWljb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TcGFuLmFkZENsYXNzKCdtcy1DYWxsb3V0LWFjdGlvblRleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUgPSBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZTtcbnZhciBDYWxsb3V0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dCBtcy1DYWxsb3V0LS1hcnJvd3t7YXJyb3dEaXJlY3Rpb259fVwiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLUNhbGxvdXQtLWFjdGlvblRleHRcXCc6IGhhc1NlcGFyYXRvciwgXFwnbXMtQ2FsbG91dC0tT09CRVxcJzogdWlmVHlwZT09XFwnb29iZVxcJywnICtcbiAgICAgICAgICAgICcgXFwnbXMtQ2FsbG91dC0tUGVla1xcJzogdWlmVHlwZT09XFwncGVla1xcJywgXFwnbXMtQ2FsbG91dC0tY2xvc2VcXCc6IGNsb3NlQnV0dG9ufVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LW1haW5cIj48ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1pbm5lclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZDYWxsb3V0J107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ1Nob3c6ICc9PycsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ2FsbG91dENvbnRyb2xsZXI7XG4gICAgfVxuICAgIENhbGxvdXREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgY2FsbG91dENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3VpZlR5cGUnLCBmdW5jdGlvbiAoY2FsbG91dFR5cGUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGNhbGxvdXRUeXBlRW51bV8xLkNhbGxvdXRUeXBlW2NhbGxvdXRUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgY2FsbG91dFR5cGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlR5cGUuIEl0IHNob3VsZCBiZSBvb2JlIG9yIHBlZWsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghYXR0cnMudWlmQXJyb3cpIHtcbiAgICAgICAgICAgIHNjb3BlLmFycm93RGlyZWN0aW9uID0gJ0xlZnQnO1xuICAgICAgICB9XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCd1aWZBcnJvdycsIGZ1bmN0aW9uIChhdHRyQXJyb3dEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGNhbGxvdXRBcnJvd0VudW1fMS5DYWxsb3V0QXJyb3dbYXR0ckFycm93RGlyZWN0aW9uXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ckFycm93RGlyZWN0aW9uICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZBcnJvdy4gSXQgc2hvdWxkIGJlIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FwaXRhbGl6ZWREaXJlY3Rpb24gPSAoYXR0ckFycm93RGlyZWN0aW9uLmNoYXJBdCgwKSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNhcGl0YWxpemVkRGlyZWN0aW9uICs9IChhdHRyQXJyb3dEaXJlY3Rpb24uc2xpY2UoMSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBzY29wZS5hcnJvd0RpcmVjdGlvbiA9IGNhcGl0YWxpemVkRGlyZWN0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuaGFzU2VwYXJhdG9yID0gKCFhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkFjdGlvblRleHQpIHx8ICFhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlNlcGFyYXRvcikpO1xuICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoYXR0cnMudWlmQ2xvc2UpKSB7XG4gICAgICAgICAgICBzY29wZS5jbG9zZUJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCc8YnV0dG9uIGNsYXNzPVwibXMtQ2FsbG91dC1jbG9zZVwiIHR5cGU9XCJidXR0b25cIj4nICtcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXhcIj48L2k+JyArXG4gICAgICAgICAgICAgICAgJzwvYnV0dG9uPicpO1xuICAgICAgICAgICAgdmFyIGNhbGxvdXREaXYgPSBpbnN0YW5jZUVsZW1lbnQuZmluZCgnZGl2JykuZXEoMCk7XG4gICAgICAgICAgICBjYWxsb3V0RGl2LmFwcGVuZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgICAgICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5iaW5kKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBzY29wZS5pc01vdXNlT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5iaW5kKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBzY29wZS5pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ25nU2hvdycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpc0Nsb3NpbmdCeUJ1dHRvbkNsaWNrID0gIW5ld1ZhbHVlICYmIHNjb3BlLmNsb3NlQnV0dG9uQ2xpY2tlZDtcbiAgICAgICAgICAgIGlmIChpc0Nsb3NpbmdCeUJ1dHRvbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IHNjb3BlLmlzTW91c2VPdmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc01vdXNlT3ZlcicsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICAgaWYgKCFuZXdWYWwgJiYgb2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29wZS5jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENhbGxvdXREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0RGlyZWN0aXZlID0gQ2FsbG91dERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXQnLCBDYWxsb3V0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0SGVhZGVyJywgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dENvbnRlbnQnLCBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEFjdGlvbnMnLCBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXREaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChDYWxsb3V0VHlwZSkge1xuICAgIENhbGxvdXRUeXBlW0NhbGxvdXRUeXBlW1wib29iZVwiXSA9IDBdID0gXCJvb2JlXCI7XG4gICAgQ2FsbG91dFR5cGVbQ2FsbG91dFR5cGVbXCJwZWVrXCJdID0gMV0gPSBcInBlZWtcIjtcbn0pKGV4cG9ydHMuQ2FsbG91dFR5cGUgfHwgKGV4cG9ydHMuQ2FsbG91dFR5cGUgPSB7fSkpO1xudmFyIENhbGxvdXRUeXBlID0gZXhwb3J0cy5DYWxsb3V0VHlwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0VHlwZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChDYWxsb3V0QXJyb3cpIHtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wibGVmdFwiXSA9IDBdID0gXCJsZWZ0XCI7XG4gICAgQ2FsbG91dEFycm93W0NhbGxvdXRBcnJvd1tcInJpZ2h0XCJdID0gMV0gPSBcInJpZ2h0XCI7XG4gICAgQ2FsbG91dEFycm93W0NhbGxvdXRBcnJvd1tcInRvcFwiXSA9IDJdID0gXCJ0b3BcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wiYm90dG9tXCJdID0gM10gPSBcImJvdHRvbVwiO1xufSkoZXhwb3J0cy5DYWxsb3V0QXJyb3cgfHwgKGV4cG9ydHMuQ2FsbG91dEFycm93ID0ge30pKTtcbnZhciBDYWxsb3V0QXJyb3cgPSBleHBvcnRzLkNhbGxvdXRBcnJvdztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0QXJyb3dFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBjaG9pY2VmaWVsZFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2Nob2ljZWZpZWxkVHlwZUVudW0nKTtcbnZhciBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlciA9IENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbnZhciBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkXCI+JyArXG4gICAgICAgICAgICAnPGlucHV0IGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZC1pbnB1dFwiIHR5cGU9XCJ7e3VpZlR5cGV9fVwiIHZhbHVlPVwie3t2YWx1ZX19XCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiICAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy10cnVlLXZhbHVlPVwie3tuZ1RydWVWYWx1ZX19XCIgbmctZmFsc2UtdmFsdWU9XCJ7e25nRmFsc2VWYWx1ZX19XCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZC1maWVsZFwiPjxzcGFuIGNsYXNzPVwibXMtTGFiZWxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj48L2xhYmVsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRPcHRpb24nLCAnXj91aWZDaG9pY2VmaWVsZEdyb3VwJ107XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0ZhbHNlVmFsdWU6ICdAJyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCcsXG4gICAgICAgICAgICB2YWx1ZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IHRlbXBsYXRlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICBpZiAoISgnbmdNb2RlbCcgaW4gdGVtcGxhdGVBdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignbmctbW9kZWwnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2hvaWNlZmllbGRUeXBlRW51bV8xLkNob2ljZWZpZWxkVHlwZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jaG9pY2VmaWVsZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZFR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHJlbmRlcl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGVja2VkID0gKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmdldFZpZXdWYWx1ZSgpID09PSBhdHRycy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmFkZFJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndmFsdWUnLCByZW5kZXJfMSk7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAub24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnJlbW92ZVJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50U2NvcGUgPSBzY29wZS4kcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgIHZhciBjaGVja0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzICYmIGF0dHJzLmRpc2FibGVkO1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSBzY29wZS5kaXNhYmxlZCB8fCAocGFyZW50U2NvcGUgIT0gbnVsbCAmJiBwYXJlbnRTY29wZS5kaXNhYmxlZCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY2hlY2tEaXNhYmxlZCgpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBwYXJlbnRTY29wZSA9PSBudWxsID8gJycgOiBwYXJlbnRTY29wZS5kaXNhYmxlZDsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBjaGVja0Rpc2FibGVkKCk7IH0pKTtcbiAgICAgICAgY2hlY2tEaXNhYmxlZCgpO1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIuc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5zZXRWaWV3VmFsdWUoYXR0cnMudmFsdWUsIGV2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSA9IENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlO1xudmFyIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZEdyb3VwLXRpdGxlXCI+PG5nLXRyYW5zY2x1ZGUgLz48L2Rpdj4nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUgPSBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMgPSBbXTtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmFkZFJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5wdXNoKGZuKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVSZW5kZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMuc3BsaWNlKHRoaXMucmVuZGVyRm5zLmluZGV4T2YoZm4pKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGV2ZW50VHlwZSkge1xuICAgICAgICBpZiAodGhpcy5nZXRWaWV3VmFsdWUoKSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldERpcnR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHZhbHVlLCBldmVudFR5cGUpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnNldFRvdWNoZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRzZXRUb3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVuZGVyRm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZuc1tpXSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNob2ljZWZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZE9wdGlvbicsIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZEdyb3VwJywgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRHcm91cFRpdGxlJywgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKENob2ljZWZpZWxkVHlwZSkge1xuICAgIENob2ljZWZpZWxkVHlwZVtDaG9pY2VmaWVsZFR5cGVbXCJyYWRpb1wiXSA9IDBdID0gXCJyYWRpb1wiO1xuICAgIENob2ljZWZpZWxkVHlwZVtDaG9pY2VmaWVsZFR5cGVbXCJjaGVja2JveFwiXSA9IDFdID0gXCJjaGVja2JveFwiO1xufSkoZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGUgfHwgKGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlID0ge30pKTtcbnZhciBDaG9pY2VmaWVsZFR5cGUgPSBleHBvcnRzLkNob2ljZWZpZWxkVHlwZTtcbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgQ29tbWFuZEJhckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ29tbWFuZEJhclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICB1aWZTZWFyY2hUZXJtOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29tbWFuZEJhckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbW1hbmRCYXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIHNjb3BlLmZvY3VzU2VhcmNoSW5wdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFyU2VhcmNoLWlucHV0JykpWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUuY2xlYXJTZWFyY2hUZXJtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlNlYXJjaFRlcm0gPSBudWxsO1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIENvbW1hbmRCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyRGlyZWN0aXZlID0gQ29tbWFuZEJhckRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoXFxcIiBuZy1jbGFzcz1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9PSB0cnVlID8gJ2lzLWFjdGl2ZScgOiAnJztcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWlucHV0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7JHBhcmVudC5wbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVxcXCIxXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWZvY3VzPVxcXCIkcGFyZW50LmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctYmx1cj1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiJHBhcmVudC51aWZTZWFyY2hUZXJtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbldyYXBwZXIgbXMtQ29tbWFuZEJhclNlYXJjaC1pY29uU2VhcmNoV3JhcHBlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcIiRwYXJlbnQuZm9jdXNTZWFyY2hJbnB1dCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJzZWFyY2hcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWljb25XcmFwcGVyIG1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbkNsZWFyV3JhcHBlciBtcy1mb250LXNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vdXNlZG93bj1cXFwiJHBhcmVudC5jbGVhclNlYXJjaFRlcm0oKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwieFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSA9IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFyLXNpZGVDb21tYW5kc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyLW1haW5BcmVhXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cXFwidWlmU2hvd092ZXJmbG93XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtIG1zLUNvbW1hbmRCYXJJdGVtLS1pY29uT25seSBtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvd1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJvdmVyZmxvd1Zpc2libGUgPT0gdHJ1ZSA/ICdpcy12aXNpYmxlJyA6ICcnO1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJvcGVuT3ZlcmZsb3dNZW51KClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbS1saW5rXFxcIiB0YWJpbmRleD1cXFwiMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcImVsbGlwc2lzXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZTaG93T3ZlcmZsb3c6ICc9J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCR0aW1lb3V0KSB7IHJldHVybiBuZXcgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHNjb3BlLm9wZW5PdmVyZmxvd01lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gIXNjb3BlLm92ZXJmbG93TWVudU9wZW47XG4gICAgICAgICAgICB2YXIgY29udGV4dHVhbE1lbnU7XG4gICAgICAgICAgICBjb250ZXh0dWFsTWVudSA9IFwiIDx1aWYtY29udGV4dHVhbC1tZW51IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyLW92ZXJmbG93TWVudVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1pcy1vcGVuPVxcXCJvdmVyZmxvd01lbnVPcGVuXFxcIlxcbiAgICAgICAgICAgICAgdWlmLWNsb3NlLW9uLWNsaWNrPVxcXCJmYWxzZVxcXCI+XCI7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhckl0ZW0tb3ZlcmZsb3cgLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyIHVsJykpLnJlbW92ZSgpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLmhpZGRlbkl0ZW1zLCBmdW5jdGlvbiAobWVudWl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAobWVudWl0ZW0uc3VibWVudSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudSArPSBcIjx1aWYtY29udGV4dHVhbC1tZW51LWl0ZW0gbmctbW9kZWw9XFxcImhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9J29wZW5PdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdKSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXRleHQ9J2hpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXS50ZXh0J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1zaG93PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udmlzaWJsZSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcInN1Yk1lbnVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtY29udGV4dHVhbC1tZW51PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz0nb3Blbk92ZXJmbG93SXRlbShzdWJpdGVtKSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdzdWJpdGVtLnRleHQnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGlua1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwic3ViaXRlbSBpbiBoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0uc3VibWVudWl0ZW1zIHRyYWNrIGJ5ICRpbmRleFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gXCI8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIG5nLW1vZGVsPVxcXCJoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPSdvcGVuT3ZlcmZsb3dJdGVtKGhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udGV4dCdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctc2hvdz0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnZpc2libGUnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJsaW5rXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gJzwvPHVpZi1jb250ZXh0dWFsLW1lbnU+JztcbiAgICAgICAgICAgIHZhciBtZW51O1xuICAgICAgICAgICAgbWVudSA9IGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93IC5tcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlcicpO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG1lbnUpLmFwcGVuZChjdHJsLiRjb21waWxlKGNvbnRleHR1YWxNZW51KShzY29wZSkpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zID0gZnVuY3Rpb24gKGNvbW1hbmRJdGVtcykge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRJdGVtV2lkdGggPSAwO1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRJdGVtSW5kZXggPSAwO1xuICAgICAgICAgICAgc2NvcGUuY29tbWFuZEl0ZW1zID0gW107XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY29tbWFuZEl0ZW1zLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuaGFzQ2xhc3MoJ21zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93JykgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEl0ZW1XaWR0aCArPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5jb21tYW5kSXRlbXMucHVzaCh7IGluZGV4OiBjb21tYW5kSXRlbUluZGV4LCBvZmZzZXQ6IGNvbW1hbmRJdGVtV2lkdGggfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJdGVtSW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUub3Blbk92ZXJmbG93SXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zdWJtZW51aXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goaXRlbS5zdWJtZW51LmNoaWxkcmVuLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VibWVudWl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtID0ge307XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLnRleHQgPSBlbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgc3VibWVudWl0ZW0ubWVudVR5cGUgPSAnaXRlbSc7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLmNoaWxkaXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLmkgPSBpdGVtLnN1Ym1lbnVpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLnBhcmVudCA9IGl0ZW0uaTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdWJtZW51aXRlbXMucHVzaChzdWJtZW51aXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHJsLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRpdGVtID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpW2l0ZW0ucGFyZW50XS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29udGV4dHVhbE1lbnUtaXRlbScpW2l0ZW0uaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQobSkudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtpdGVtLmldKS50cmlnZ2VySGFuZGxlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kQmFySXRlbXM7XG4gICAgICAgICAgICBjb21tYW5kQmFySXRlbXMgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhci1tYWluQXJlYSAubXMtQ29tbWFuZEJhckl0ZW0nKSk7XG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA2NDAgJiYgc2NvcGUubW9iaWxlU3dpdGNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoY29tbWFuZEJhckl0ZW1zKTtcbiAgICAgICAgICAgICAgICBzY29wZS5tb2JpbGVTd2l0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNjQwICYmIHNjb3BlLm1vYmlsZVN3aXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoY29tbWFuZEJhckl0ZW1zKTtcbiAgICAgICAgICAgICAgICBzY29wZS5tb2JpbGVTd2l0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5jb21tYW5kSXRlbXMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0ID49IGVsZW0ucHJvcCgnb2Zmc2V0V2lkdGgnKSAtIDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtlbGVtZW50LmluZGV4XSkuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5oaWRkZW5JdGVtc1tlbGVtZW50LmluZGV4XS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpW2VsZW1lbnQuaW5kZXhdKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmhpZGRlbkl0ZW1zW2VsZW1lbnQuaW5kZXhdLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdHJsLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kb24oJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KHdpbmRvdykuYmluZCgncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuJGJyb2FkY2FzdCgndWlmLWNvbW1hbmQtYmFyLXJlc2l6ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpKSk7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gQ29tbWFuZEJhck1haW5EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyTWFpbkRpcmVjdGl2ZSA9IENvbW1hbmRCYXJNYWluRGlyZWN0aXZlO1xudmFyIENvbW1hbmRCYXJNYWluQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhck1haW5Db250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRjb21waWxlLCAkdGltZW91dCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRjb21waWxlID0gJGNvbXBpbGU7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICB9XG4gICAgQ29tbWFuZEJhck1haW5Db250cm9sbGVyLnByb3RvdHlwZS5hZGRPdmVyZmxvd0l0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAodGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmkgPSB0aGlzLiRzY29wZS5oaWRkZW5JdGVtcy5sZW5ndGg7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRjb21waWxlJywgJyR0aW1lb3V0J107XG4gICAgcmV0dXJuIENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJNYWluQ29udHJvbGxlciA9IENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbnZhciBDb21tYW5kQmFySXRlbURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyXCI+JyArXG4gICAgICAgICAgICAnIDxhIGNsYXNzPVwibXMtQ29tbWFuZEJhckl0ZW0tbGlua1wiPicgK1xuICAgICAgICAgICAgJyA8L2E+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29tbWFuZEJhck1haW5Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXj91aWZDb21tYW5kQmFyTWFpbic7XG4gICAgfVxuICAgIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGlkZGVuSXRlbTtcbiAgICAgICAgICAgIGhpZGRlbkl0ZW0gPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VJRi1JQ09OJykge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdhLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsnKSkuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdTUEFOJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb25lW2ldLmNsYXNzTGlzdC5jb250YWlucygnbXMtQ29tbWFuZEJhckl0ZW0tY29tbWFuZFRleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0LmFkZCgnbXMtQ29tbWFuZEJhckl0ZW0tY29tbWFuZFRleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0uY2xhc3NOYW1lLmluZGV4T2YoJ21zLWZvbnQtJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZVtpXS5jbGFzc0xpc3QuYWRkKCdtcy1mb250LW0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdhLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsnKSkuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuSXRlbS50ZXh0ID0gY2xvbmVbaV0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VMJyAmJiBjbG9uZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21zLUNvbnRleHR1YWxNZW51JykpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW0pLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0uc3VibWVudSA9IGNsb25lW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdHJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhpZGRlbkl0ZW0uc3VibWVudSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0ubWVudVR5cGUgPSAnbGluayc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLm1lbnVUeXBlID0gJ3N1Yk1lbnUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdHJsLmFkZE92ZXJmbG93SXRlbShoaWRkZW5JdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhckl0ZW0tbGluayA+IHVpZi1pY29uJykpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtJykpLmFkZENsYXNzKCdtcy1Db21tYW5kQmFySXRlbS1oYXNUZXh0T25seScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFySXRlbURpcmVjdGl2ZSA9IENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb21tYW5kYmFyJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyJywgQ29tbWFuZEJhckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhclNlYXJjaCcsIENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXJJdGVtJywgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXJNYWluJywgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXJTaWRlJywgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY29tbWFuZGJhci9jb21tYW5kQmFyRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIENvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRlbnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8c3BhbiBjbGFzcz1cXFwidWlmLWNvbnRlbnRcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlwiO1xuICAgIH1cbiAgICBDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGVudERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ29udGVudERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRlbnQnO1xuICAgIHJldHVybiBDb250ZW50RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29udGVudERpcmVjdGl2ZSA9IENvbnRlbnREaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRlbnQnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKENvbnRlbnREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9jb250ZW50L2NvbnRlbnREaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIE1lbnVJdGVtVHlwZXM7XG4oZnVuY3Rpb24gKE1lbnVJdGVtVHlwZXMpIHtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJsaW5rXCJdID0gMF0gPSBcImxpbmtcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJkaXZpZGVyXCJdID0gMV0gPSBcImRpdmlkZXJcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJoZWFkZXJcIl0gPSAyXSA9IFwiaGVhZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wic3ViTWVudVwiXSA9IDNdID0gXCJzdWJNZW51XCI7XG59KShNZW51SXRlbVR5cGVzIHx8IChNZW51SXRlbVR5cGVzID0ge30pKTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmQ29udGV4dHVhbE1lbnUnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz0/dWlmSXNTZWxlY3RlZCcsXG4gICAgICAgICAgICBvbkNsaWNrOiAnJm5nQ2xpY2snLFxuICAgICAgICAgICAgdGV4dDogJz0/dWlmVGV4dCcsXG4gICAgICAgICAgICB0eXBlOiAnQHVpZlR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlcyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTWVudUl0ZW1UeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSB1bnN1cHBvcnRlZCBtZW51IHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIGNvbnRleHQgbWVudS4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgTWVudUl0ZW1UeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGNvbnRleHR1YWxNZW51Q29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgIT09ICdib29sZWFuJyAmJiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51IC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtc2VsZWN0ZWRcXCcuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSBcXCcnICsgdHlwZW9mICRzY29wZS5pc1NlbGVjdGVkICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGFzIHZhbGlkIHR5cGUgZm9yIFxcJ3VpZi1pcy1zZWxlY3RlZFxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbSAvPi4gVGhlIHZhbGlkIHR5cGUgaXMgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNEaXNhYmxlZCA9ICEhZGlzYWJsZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnRyYW5zY2x1ZGVDaGlsZHMoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpO1xuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuaXNNdWx0aVNlbGVjdGlvbk1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuZGVzZWxlY3RJdGVtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNTZWxlY3RlZCkgJiYgISRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmNsb3NlU3ViTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzUm9vdE1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5jbG9zZVN1Yk1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1kZXNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1jbG9zZScsIGZ1bmN0aW9uIChldmVudCwgbWVudUl0ZW1JZCkge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS4kaWQgIT09IG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNoaWxkTWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLnN1Yk1lbnVdID1cbiAgICAgICAgICAgIFwiPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtXFxcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmsgbXMtQ29udGV4dHVhbE1lbnUtbGluay0taGFzTWVudVxcXCJcXG4gICAgICAgICAgbmctY2xhc3M9XFxcInsnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLCAnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCIgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oJGV2ZW50KVxcXCIgaHJlZj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICAgICAgPGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LXN1Yk1lbnVJY29uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XFxcIj48L2k+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVpZi1jb250ZXh0LXN1Ym1lbnVcXFwiPjwvZGl2PlxcbiAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmtcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiXFxuICAgICAgICAgICAgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oJGV2ZW50KVxcXCIgaHJlZj48c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICAgIDwvbGk+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLmhlYWRlcl0gPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW0gbXMtQ29udGV4dHVhbE1lbnUtaXRlbS0taGVhZGVyXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5kaXZpZGVyXSA9IFwiPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtIG1zLUNvbnRleHR1YWxNZW51LWl0ZW0tLWRpdmlkZXJcXFwiPjwvbGk+XCI7XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCAmJiAhJHNjb3BlLnRleHQgJiYgISRzY29wZS5oYXNDaGlsZE1lbnUgJiYgJHNjb3BlLnR5cGUgIT09ICdkaXZpZGVyJykge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51IC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgYSBjb250ZXh0dWFsIG1lbnUgaXRlbS5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ0ZvciA8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPiB5b3UgbmVlZCB0byBzcGVjaWZ5IGVpdGhlciBcXCd1aWYtdGV4dFxcJyBhcyBhdHRyaWJ1dGUgb3IgPHVpZi1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0SXRlbUNvbnRlbnQoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0U3ViTWVudShjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLWl0ZW0tY29udGVudCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoYW5ndWxhci5lbGVtZW50KCc8c3Bhbj4nICsgJHNjb3BlLnRleHQgKyAnPC9zcGFuPicpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRTdWJNZW51ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtY29udGV4dC1zdWJtZW51JykpLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmQ29udGV4dHVhbE1lbnVJdGVtJztcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlID0gQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlO1xudmFyIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5zZXRDaGlsZE1lbnUgPSBmdW5jdGlvbiAoY2hpbGRNZW51Q3RybCkge1xuICAgICAgICB0aGlzLiRzY29wZS5oYXNDaGlsZE1lbnUgPSB0cnVlO1xuICAgICAgICB0aGlzLiRzY29wZS5jaGlsZE1lbnVDdHJsID0gY2hpbGRNZW51Q3RybDtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50J107XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcjtcbnZhciBDb250ZXh0dWFsTWVudURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIjx1bCBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnVcXFwiIG5nLXRyYW5zY2x1ZGU+PC91bD5cIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgY2xvc2VPbkNsaWNrOiAnQHVpZkNsb3NlT25DbGljaycsXG4gICAgICAgICAgICBpc09wZW46ICc9P3VpZklzT3BlbicsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogJ0B1aWZNdWx0aXNlbGVjdCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb250ZXh0dWFsTWVudURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIHNldENsb3NlT25DbGljayA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNsb3NlT25DbGljayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xvc2VPbkNsaWNrID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNldENsb3NlT25DbGljaygkc2NvcGUuY2xvc2VPbkNsaWNrKTtcbiAgICAgICAgJGF0dHJzLiRvYnNlcnZlKCd1aWZDbG9zZU9uQ2xpY2snLCBzZXRDbG9zZU9uQ2xpY2spO1xuICAgICAgICB2YXIgcGFyZW50TWVudUl0ZW1DdHJsID0gJGVsZW1lbnQuY29udHJvbGxlcihDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgIGlmICghYW5ndWxhci5pc1VuZGVmaW5lZChwYXJlbnRNZW51SXRlbUN0cmwpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51SXRlbUN0cmwuc2V0Q2hpbGRNZW51KGNvbnRleHR1YWxNZW51Q29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5tdWx0aXNlbGVjdCkgJiYgJHNjb3BlLm11bHRpc2VsZWN0LnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ21zLUNvbnRleHR1YWxNZW51LS1tdWx0aXNlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRleHR1YWxNZW51JztcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xudmFyIENvbnRleHR1YWxNZW51Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5vblJvb3RNZW51Q2xvc2VkID0gW107XG4gICAgICAgIHRoaXMuaXNPcGVuQ2xhc3NOYW1lID0gJ2lzLW9wZW4nO1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkZWxlbWVudC5jb250cm9sbGVyKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKSkpIHtcbiAgICAgICAgICAgICRzY29wZS5pc1Jvb3RNZW51ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdpc09wZW4nLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICdib29sZWFuJyAmJiBuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSBpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtb3BlblxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgbmV3VmFsdWUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLW9wZW5cXCcgYXR0cmlidXRlIGZvciAnICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGV4dHVhbC1tZW51IC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGFuaW1hdGVbbmV3VmFsdWUgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oJGVsZW1lbnQsIF90aGlzLmlzT3BlbkNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uUm9vdE1lbnVDbG9zZWQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5jbG9zZU1lbnUoKTtcbiAgICAgICAgICAgIF90aGlzLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1jbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNSb290TWVudSAmJiAkc2NvcGUuY2xvc2VPbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Sb290TWVudUNsb3NlZC5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5kZXNlbGVjdEl0ZW1zID0gZnVuY3Rpb24gKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgndWlmLW1lbnUtZGVzZWxlY3QnKTtcbiAgICAgICAgaWYgKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlU3ViTWVudXMgPSBmdW5jdGlvbiAobWVudUl0ZW1Ub1NraXAsIGNsb3NlUm9vdE1lbnUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgndWlmLW1lbnUtY2xvc2UnLCBtZW51SXRlbVRvU2tpcCk7XG4gICAgICAgIGlmIChjbG9zZVJvb3RNZW51KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgndWlmLW1lbnUtY2xvc2UnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaXNPcGVuID0gdHJ1ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNSb290TWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLmlzUm9vdE1lbnU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmlzTXVsdGlTZWxlY3Rpb25NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc01lbnVPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnXTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVDb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudScsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50c1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuaXNQaWNraW5nWWVhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BpY2tpbmdNb250aHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGF0ZUZvcm1hdCA9ICdkIG1tbW0sIHl5eXknO1xuICAgICAgICB0aGlzLmpFbGVtZW50ID0gJCgkZWxlbWVudFswXSk7XG4gICAgICAgIHRoaXMuZGlzcGxheURhdGVGb3JtYXQgPSAkc2NvcGUudWlmRGF0ZUZvcm1hdDtcbiAgICAgICAgJHNjb3BlLmN0cmwgPSB0aGlzO1xuICAgIH1cbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucmFuZ2UgPSBmdW5jdGlvbiAobWluLCBtYXgsIHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgICAgICAgdmFyIGlucHV0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSBtaW47IGkgPD0gbWF4OyBpICs9IHN0ZXApIHtcbiAgICAgICAgICAgIGlucHV0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBpY2tlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLVRleHRGaWVsZC1maWVsZCcpLnBpY2thZGF0ZSgncGlja2VyJyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRQaWNrZXIoKS5zZXQoJ3NlbGVjdCcsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VIaWdobGlnaHRlZERhdGUodmFsdWUuZ2V0RnVsbFllYXIoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RGF0ZSgpKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0RGF0ZXBpY2tlciA9IGZ1bmN0aW9uIChuZ01vZGVsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5qRWxlbWVudC5maW5kKCcubXMtVGV4dEZpZWxkLWZpZWxkJykucGlja2FkYXRlKHtcbiAgICAgICAgICAgIGNsZWFyOiAnJyxcbiAgICAgICAgICAgIGNsb3NlOiAnJyxcbiAgICAgICAgICAgIGZvcm1hdDogc2VsZi5kaXNwbGF5RGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGtsYXNzOiB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiAnbXMtRGF0ZVBpY2tlci1pbnB1dC0tYWN0aXZlJyxcbiAgICAgICAgICAgICAgICBib3g6ICdtcy1EYXRlUGlja2VyLWRheVBpY2tlcicsXG4gICAgICAgICAgICAgICAgZGF5OiAnbXMtRGF0ZVBpY2tlci1kYXknLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnbXMtRGF0ZVBpY2tlci1kYXktLWRpc2FibGVkJyxcbiAgICAgICAgICAgICAgICBmb2N1c2VkOiAnbXMtRGF0ZVBpY2tlci1waWNrZXItLWZvY3VzZWQnLFxuICAgICAgICAgICAgICAgIGZyYW1lOiAnbXMtRGF0ZVBpY2tlci1mcmFtZScsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnbXMtRGF0ZVBpY2tlci1oZWFkZXInLFxuICAgICAgICAgICAgICAgIGhvbGRlcjogJ21zLURhdGVQaWNrZXItaG9sZGVyJyxcbiAgICAgICAgICAgICAgICBpbmZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLWluZm9jdXMnLFxuICAgICAgICAgICAgICAgIGlucHV0OiAnbXMtRGF0ZVBpY2tlci1pbnB1dCcsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdtcy1EYXRlUGlja2VyLW1vbnRoJyxcbiAgICAgICAgICAgICAgICBub3c6ICdtcy1EYXRlUGlja2VyLWRheS0tdG9kYXknLFxuICAgICAgICAgICAgICAgIG9wZW5lZDogJ21zLURhdGVQaWNrZXItcGlja2VyLS1vcGVuZWQnLFxuICAgICAgICAgICAgICAgIG91dGZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLW91dGZvY3VzJyxcbiAgICAgICAgICAgICAgICBwaWNrZXI6ICdtcy1EYXRlUGlja2VyLXBpY2tlcicsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdtcy1EYXRlUGlja2VyLWRheS0tc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgIHRhYmxlOiAnbXMtRGF0ZVBpY2tlci10YWJsZScsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6ICdtcy1EYXRlUGlja2VyLXdlZWtkYXknLFxuICAgICAgICAgICAgICAgIHdyYXA6ICdtcy1EYXRlUGlja2VyLXdyYXAnLFxuICAgICAgICAgICAgICAgIHllYXI6ICdtcy1EYXRlUGlja2VyLXllYXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5pdEN1c3RvbVZpZXcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2RheTogJycsXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIHBpY2tlci5vbih7XG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxVcCgpO1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsKSAmJiBuZ01vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBwaWNrZXIuZ2V0KCdzZWxlY3QnLCAneXl5eS1tbS1kZCcpO1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsKSAmJiBuZ01vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0Q3VzdG9tVmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRtb250aENvbnRyb2xzID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1tb250aENvbXBvbmVudHMnKTtcbiAgICAgICAgdmFyICRnb1RvZGF5ID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1nb1RvZGF5Jyk7XG4gICAgICAgIHZhciAkbW9udGhQaWNrZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLW1vbnRoUGlja2VyJyk7XG4gICAgICAgIHZhciAkeWVhclBpY2tlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXIteWVhclBpY2tlcicpO1xuICAgICAgICB2YXIgJHBpY2tlcldyYXBwZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLXdyYXAnKTtcbiAgICAgICAgdmFyICRwaWNrZXIgPSB0aGlzLmdldFBpY2tlcigpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICRtb250aENvbnRyb2xzLmFwcGVuZFRvKCRwaWNrZXJXcmFwcGVyKTtcbiAgICAgICAgJGdvVG9kYXkuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkbW9udGhQaWNrZXIuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkeWVhclBpY2tlci5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtcHJldk1vbnRoJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoIC0gMTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG51bGwsIG5ld01vbnRoLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoQ29udHJvbHMub24oJ2NsaWNrJywgJy5qcy1uZXh0TW9udGgnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykubW9udGggKyAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobnVsbCwgbmV3TW9udGgsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2WWVhcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgLSAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLW5leHRZZWFyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciArIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2RGVjYWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciAtIDEwO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR5ZWFyUGlja2VyLm9uKCdjbGljaycsICcuanMtbmV4dERlY2FkZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgKyAxMDtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkZ29Ub2RheS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICRwaWNrZXIuc2V0KCdzZWxlY3QnLCBub3cpO1xuICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ01vbnRocycpLnJlbW92ZUNsYXNzKCdpcy1waWNraW5nWWVhcnMnKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gY3VycmVudERhdGUueWVhcjtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9ICskKHRoaXMpLmF0dHIoJ2RhdGEtbW9udGgnKTtcbiAgICAgICAgICAgIHZhciBuZXdEYXkgPSBjdXJyZW50RGF0ZS5kYXk7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KTtcbiAgICAgICAgICAgIGlmIChzZWxmLmpFbGVtZW50Lmhhc0NsYXNzKCdpcy1waWNraW5nTW9udGhzJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmpFbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1waWNraW5nTW9udGhzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR5ZWFyUGlja2VyLm9uKCdjbGljaycsICcuanMtY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gKyQodGhpcykuYXR0cignZGF0YS15ZWFyJyk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSBjdXJyZW50RGF0ZS5tb250aDtcbiAgICAgICAgICAgIHZhciBuZXdEYXkgPSBjdXJyZW50RGF0ZS5kYXk7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KTtcbiAgICAgICAgICAgIGlmIChzZWxmLmpFbGVtZW50Lmhhc0NsYXNzKCdpcy1waWNraW5nWWVhcnMnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuakVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhDb250cm9scy5vbignY2xpY2snLCAnLmpzLXNob3dNb250aFBpY2tlcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5pc1BpY2tpbmdNb250aHMgPSAhc2VsZi5pc1BpY2tpbmdNb250aHM7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLXNob3dZZWFyUGlja2VyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmlzUGlja2luZ1llYXJzID0gIXNlbGYuaXNQaWNraW5nWWVhcnM7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuJHNjb3BlLmhpZ2hsaWdodGVkVmFsdWUgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2Nyb2xsVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0aGlzLmpFbGVtZW50Lm9mZnNldCgpLnRvcCB9LCAzNjcpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZSA9IGZ1bmN0aW9uIChuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KSB7XG4gICAgICAgIHZhciBwaWNrZXIgPSB0aGlzLmdldFBpY2tlcigpO1xuICAgICAgICBpZiAobmV3WWVhciA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdZZWFyID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3TW9udGggPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3TW9udGggPSBwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS5tb250aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3RGF5ID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld0RheSA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLmRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcGlja2VyLnNldCgnaGlnaGxpZ2h0JywgW25ld1llYXIsIG5ld01vbnRoLCBuZXdEYXldKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGlnaGxpZ2h0ZWRWYWx1ZSA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJ107XG4gICAgcmV0dXJuIERhdGVwaWNrZXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSBEYXRlcGlja2VyQ29udHJvbGxlcjtcbnZhciBEYXRlcGlja2VyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEYXRlcGlja2VyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlclxcJzogdHJ1ZSwgXFwnaXMtcGlja2luZ1llYXJzXFwnOiBjdHJsLmlzUGlja2luZ1llYXJzLCBcXCdpcy1waWNraW5nTW9udGhzXFwnOiBjdHJsLmlzUGlja2luZ01vbnRoc31cIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtVGV4dEZpZWxkXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWV2ZW50IG1zLUljb24gbXMtSWNvbi0tZXZlbnRcIj48L2k+JyArXG4gICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW1vbnRoQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0TW9udGgganMtbmV4dE1vbnRoXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLXByZXZNb250aCBqcy1wcmV2TW9udGhcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvbkxlZnRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWhlYWRlclRvZ2dsZVZpZXcganMtc2hvd01vbnRoUGlja2VyXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLWdvVG9kYXkganMtZ29Ub2RheVwiPkdvIHRvIHRvZGF5PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW1vbnRoUGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItaGVhZGVyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXIteWVhckNvbXBvbmVudHNcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbmV4dFllYXIganMtbmV4dFllYXJcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldlllYXIganMtcHJldlllYXJcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvbkxlZnRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWN1cnJlbnRZZWFyIGpzLXNob3dZZWFyUGlja2VyXCI+e3toaWdobGlnaHRlZFZhbHVlLnllYXJ9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW9wdGlvbkdyaWRcIiA+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0PVwibW9udGggaW4gbW9udGhzQXJyYXlcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLURhdGVQaWNrZXItbW9udGhPcHRpb24ganMtY2hhbmdlRGF0ZVxcJzogdHJ1ZSwgJyArXG4gICAgICAgICAgICAnXFwnaXMtaGlnaGxpZ2h0ZWRcXCc6IGhpZ2hsaWdodGVkVmFsdWUubW9udGggPT0gJGluZGV4fVwiJyArXG4gICAgICAgICAgICAnZGF0YS1tb250aD1cInt7JGluZGV4fX1cIj4nICtcbiAgICAgICAgICAgICd7e21vbnRofX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXIteWVhclBpY2tlclwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWRlY2FkZUNvbXBvbmVudHNcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbmV4dERlY2FkZSBqcy1uZXh0RGVjYWRlXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLXByZXZEZWNhZGUganMtcHJldkRlY2FkZVwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItY3VycmVudERlY2FkZVwiPnt7aGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyIC0gMTB9fSAtIHt7aGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyfX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1vcHRpb25HcmlkXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlci15ZWFyT3B0aW9uIGpzLWNoYW5nZURhdGVcXCc6IHRydWUsJyArXG4gICAgICAgICAgICAnXFwnaXMtaGlnaGxpZ2h0ZWRcXCc6IGhpZ2hsaWdodGVkVmFsdWUueWVhciA9PSB5ZWFyfVwiICcgK1xuICAgICAgICAgICAgJ25nLXJlcGVhdD1cInllYXIgaW4gY3RybC5yYW5nZShoaWdobGlnaHRlZFZhbHVlLnllYXIgLSAxMCwgaGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyKVwiJyArXG4gICAgICAgICAgICAnZGF0YS15ZWFyPVwie3t5ZWFyfX1cIj57e3llYXJ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEYXRlcGlja2VyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICB1aWZEYXRlRm9ybWF0OiAnQCcsXG4gICAgICAgICAgICB1aWZNb250aHM6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkRhdGVwaWNrZXInLCAnP25nTW9kZWwnXTtcbiAgICB9XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERhdGVwaWNrZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmssXG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uICgkc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICBpZiAoISRzY29wZS51aWZNb250aHMpIHtcbiAgICAgICAgICAgICRzY29wZS51aWZNb250aHMgPSAnSmFuLCBGZWIsIE1hciwgQXByLCBNYXksIEp1biwgSnVsLCBBdWcsIFNlcCwgT2N0LCBOb3YsIERlYyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEkc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICRzY29wZS5wbGFjZWhvbGRlciA9ICdTZWxlY3QgYSBkYXRlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoISRzY29wZS51aWZEYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmRGF0ZUZvcm1hdCA9ICdkIG1tbW0sIHl5eXknO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5tb250aHNBcnJheSA9ICRzY29wZS51aWZNb250aHMuc3BsaXQoJywnKTtcbiAgICAgICAgaWYgKCRzY29wZS5tb250aHNBcnJheS5sZW5ndGggIT09IDEyKSB7XG4gICAgICAgICAgICB0aHJvdyAnTW9udGhzIHNldHRpbmcgc2hvdWxkIGhhdmUgMTIgbW9udGhzLCBzZXBhcmF0ZWQgYnkgYSBjb21tYSc7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VBdHRyaWJ1dGVzLiRvYnNlcnZlKCdkaXNhYmxlZCcsIGZ1bmN0aW9uIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzRGlzYWJsZWQgPSAhIWRpc2FibGVkO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgZGF0ZXBpY2tlckNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG5nTW9kZWwgPSBjdHJsc1sxXTtcbiAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuaW5pdERhdGVwaWNrZXIobmdNb2RlbCk7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsKSAmJiBuZ01vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICBuZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nTW9kZWwuJG1vZGVsVmFsdWUgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgJiYgbmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gJydcbiAgICAgICAgICAgICAgICAgICAgJiYgdHlwZW9mIG5nTW9kZWwuJG1vZGVsVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmdNb2RlbC4kbW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlcGlja2VyQ29udHJvbGxlci5zZXRWYWx1ZShkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLnNldFZhbHVlKG5nTW9kZWwuJG1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERhdGVwaWNrZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EYXRlcGlja2VyRGlyZWN0aXZlID0gRGF0ZXBpY2tlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGF0ZXBpY2tlcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmRGF0ZXBpY2tlcicsIERhdGVwaWNrZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBkaWFsb2dFbnVtc18xID0gcmVxdWlyZSgnLi9kaWFsb2dFbnVtcycpO1xudmFyIERpYWxvZ0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0NvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBEaWFsb2dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xudmFyIERpYWxvZ0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2dcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwieyBcXCdtcy1EaWFsb2ctLWNsb3NlXFwnOiB1aWZDbG9zZT09XFwndHJ1ZVxcJycgK1xuICAgICAgICAgICAgJywgXFwnbXMtRGlhbG9nLS1sZ0hlYWRlclxcJzogdWlmVHlwZT09XFwnaGVhZGVyXFwnJyArXG4gICAgICAgICAgICAnLCBcXCdtcy1EaWFsb2ctLW11bHRpbGluZVxcJzogdWlmVHlwZT09XFwnbXVsdGlsaW5lXFwnIH1cIj4nICtcbiAgICAgICAgICAgICc8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XCJ7e3VpZk92ZXJsYXl9fVwiPjwvdWlmLW92ZXJsYXk+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1tYWluXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmQ2xvc2U6ICdAJyxcbiAgICAgICAgICAgIHVpZk92ZXJsYXk6ICdAJyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFsb2dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAobmV3VmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dFbnVtc18xLkRpYWxvZ1R5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nIC0gVW5zdXBwb3J0ZWQgdHlwZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dEaXJlY3RpdmUgPSBEaWFsb2dEaXJlY3RpdmU7XG52YXIgRGlhbG9nSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeXnVpZkRpYWxvZyc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiJHBhcmVudC51aWZDbG9zZVwiIGNsYXNzPVwibXMtRGlhbG9nLWJ1dHRvbiBtcy1EaWFsb2ctYnV0dG9uLS1jbG9zZVwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dIZWFkZXJEaXJlY3RpdmUgPSBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG52YXIgRGlhbG9nQ29udGVudERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQ29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWNvbnRlbnRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRlbnREaXJlY3RpdmUgPSBEaWFsb2dDb250ZW50RGlyZWN0aXZlO1xudmFyIERpYWxvZ0lubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dJbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0lubmVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nSW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dJbm5lckRpcmVjdGl2ZSA9IERpYWxvZ0lubmVyRGlyZWN0aXZlO1xudmFyIERpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ1N1YnRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHAgY2xhc3M9XCJtcy1EaWFsb2ctc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPic7XG4gICAgfVxuICAgIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nU3VidGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlO1xudmFyIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zQ29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xudmFyIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctYWN0aW9uc1wiPjxkaXYgbmctY2xhc3M9XCJ7IFxcJ21zLURpYWxvZy1hY3Rpb25zUmlnaHRcXCc6IHVpZlBvc2l0aW9uPT1cXCdyaWdodFxcJ31cIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlBvc2l0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUG9zaXRpb24nLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChuZXdWYWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZ0VudW1zXzEuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZyAtIFVuc3VwcG9ydGVkIHR5cGU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZQb3NpdGlvbiArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zRGlyZWN0aXZlID0gRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nJywgRGlhbG9nRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dIZWFkZXInLCBEaWFsb2dIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0NvbnRlbnQnLCBEaWFsb2dDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dJbm5lcicsIERpYWxvZ0lubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dTdWJ0ZXh0JywgRGlhbG9nU3VidGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nQWN0aW9ucycsIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChEaWFsb2dUeXBlRW51bSkge1xuICAgIERpYWxvZ1R5cGVFbnVtW0RpYWxvZ1R5cGVFbnVtW1wibm9uZVwiXSA9IDBdID0gXCJub25lXCI7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJoZWFkZXJcIl0gPSAxXSA9IFwiaGVhZGVyXCI7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJtdWx0aWxpbmVcIl0gPSAyXSA9IFwibXVsdGlsaW5lXCI7XG59KShleHBvcnRzLkRpYWxvZ1R5cGVFbnVtIHx8IChleHBvcnRzLkRpYWxvZ1R5cGVFbnVtID0ge30pKTtcbnZhciBEaWFsb2dUeXBlRW51bSA9IGV4cG9ydHMuRGlhbG9nVHlwZUVudW07XG4oZnVuY3Rpb24gKERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0pIHtcbiAgICBEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW0RpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW0RpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bXCJsZWZ0XCJdID0gMV0gPSBcImxlZnRcIjtcbiAgICBEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW0RpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bXCJyaWdodFwiXSA9IDJdID0gXCJyaWdodFwiO1xufSkoZXhwb3J0cy5EaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtIHx8IChleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gPSB7fSkpO1xudmFyIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gPSBleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50c1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxsaSBjbGFzcz1cIm1zLURyb3Bkb3duLWl0ZW1cIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZEcm9wZG93bic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGRyb3Bkb3duQ29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAoIWRyb3Bkb3duQ29udHJvbGxlcikge1xuICAgICAgICAgICAgdGhyb3cgJ0Ryb3Bkb3duIGNvbnRyb2xsZXIgbm90IGZvdW5kISc7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQ29udHJvbGxlci5zZXRWaWV3VmFsdWUoaW5zdGFuY2VFbGVtZW50LmZpbmQoJ3NwYW4nKS5odG1sKCksIGF0dHJzLnZhbHVlLCBldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB2YWx1ZSA9ICcnICsgZHJvcGRvd25Db250cm9sbGVyLmdldFZpZXdWYWx1ZSgpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgPT09IGF0dHJzLnZhbHVlKSB7XG4gICAgICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuc2V0Vmlld1ZhbHVlKGF0dHJzLnRpdGxlLCBhdHRycy52YWx1ZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gRHJvcGRvd25PcHRpb25EaXJlY3RpdmU7XG52YXIgRHJvcGRvd25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bkNvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSwgJGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgIH1cbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLiRzY29wZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmlzT3BlbiA9ICFzZWxmLiRzY29wZS5pc09wZW47XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3duV2lkdGggPSBhbmd1bGFyLmVsZW1lbnQodGhpcy5xdWVyeVNlbGVjdG9yKCcubXMtRHJvcGRvd24nKSlbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KHRoaXMucXVlcnlTZWxlY3RvcignLm1zLURyb3Bkb3duLWl0ZW1zJykpWzBdLnN0eWxlLndpZHRoID0gZHJvcGRvd25XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kc2NvcGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudENsaWNrSGFuZGxlcl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGRvY3VtZW50Lm9mZignY2xpY2snLCBkb2N1bWVudENsaWNrSGFuZGxlcl8xKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZG9jdW1lbnQub24oJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kc2NvcGUubmdNb2RlbCAhPT0gdW5kZWZpbmVkICYmIHNlbGYuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5uZ01vZGVsLiRzZXRUb3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHNlbGYuJGVsZW1lbnQuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbi5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc2VsZi4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gYW5ndWxhci5lbGVtZW50KG9wdGlvbikuZmluZCgnc3BhbicpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKHRpdGxlLCB2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkVGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHZhbHVlLCBldmVudFR5cGUpO1xuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJywgJyRkb2N1bWVudCddO1xuICAgIHJldHVybiBEcm9wZG93bkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5Ecm9wZG93bkNvbnRyb2xsZXIgPSBEcm9wZG93bkNvbnRyb2xsZXI7XG52YXIgRHJvcGRvd25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xpY2s9XCJkcm9wZG93bkNsaWNrXCIgJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtRHJvcGRvd25cXCcgOiB0cnVlLCBcXCdpcy1vcGVuXFwnOiBpc09wZW4sIFxcJ2lzLWRpc2FibGVkXFwnOiBkaXNhYmxlZH1cIiB0YWJpbmRleD1cIjBcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLURyb3Bkb3duLWNhcmV0RG93biBtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiPjwvaT4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURyb3Bkb3duLXRpdGxlXCI+e3tzZWxlY3RlZFRpdGxlfX08L3NwYW4+PHVsIGNsYXNzPVwibXMtRHJvcGRvd24taXRlbXNcIj48bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC91bD48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkRyb3Bkb3duJywgJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRHJvcGRvd25Db250cm9sbGVyO1xuICAgIH1cbiAgICBEcm9wZG93bkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERyb3Bkb3duRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEcm9wZG93bkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERyb3Bkb3duRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGluc3RhbmNlQXR0cmlidXRlcywgY3RybHMpIHtcbiAgICAgICAgdmFyIGRyb3Bkb3duQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICB2YXIgbW9kZWxDb250cm9sbGVyID0gY3RybHNbMV07XG4gICAgICAgIHNjb3BlLm5nTW9kZWwgPSBtb2RlbENvbnRyb2xsZXI7XG4gICAgICAgIGRyb3Bkb3duQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRyb3Bkb3duRGlyZWN0aXZlID0gRHJvcGRvd25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRyb3Bkb3duJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bk9wdGlvbicsIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bicsIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBGYWNlcGlsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmFjZXBpbGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9XFxcIm1zLUZhY2VwaWxlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUZhY2VwaWxlLW1lbWJlcnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICBuZy1yZXBlYXQ9XFxcIm1lbWJlciBpbiBtZW1iZXJzIHRyYWNrIGJ5ICRpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1pZiA9XFxcIiRpbmRleCA8IHVpZk92ZXJmbG93TGltaXRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1pdGVtQnRuIG1zLUZhY2VwaWxlLWl0ZW1CdG4tLW1lbWJlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XFxcInt7bWVtYmVyLnByaW1hcnlUZXh0fX1cXFwiIHRhYmluZGV4PVxcXCIwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEgdWlmLXN0eWxlPVxcXCJyb3VuZFxcXCIgdWlmLXNpemU9XFxcInhzbWFsbFxcXCIgdWlmLWltYWdlLXVybD1cXFwie3ttZW1iZXIuaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7bWVtYmVyLmNvbG9yfX1cXFwiPnt7bWVtYmVyLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1zaG93PVxcXCJ1aWZPdmVyZmxvd0xpbWl0ID4gMCAmJiBtZW1iZXJzLmxlbmd0aCA+IHVpZk92ZXJmbG93TGltaXRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcIm92ZXJmbG93UGFuZWxJc09wZW4gPSB0cnVlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibXMtRmFjZXBpbGUtaXRlbUJ0biBtcy1GYWNlcGlsZS1pdGVtQnRuLS1vdmVyZmxvdyBqcy1vdmVyZmxvd1BhbmVsIGlzLWFjdGl2ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUZhY2VwaWxlLW92ZXJmbG93VGV4dFxcXCI+K3t7bWVtYmVycy5sZW5ndGggLSB1aWZPdmVyZmxvd0xpbWl0fX08L3NwYW5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGFuZWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcIm1lZGl1bVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLWlzLW9wZW49XFxcIm92ZXJmbG93UGFuZWxJc09wZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1zaG93LW92ZXJsYXk9XFxcInRydWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1zaG93LWNsb3NlPVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wYW5lbC1oZWFkZXI+e3ttZW1iZXJzLmxlbmd0aH19IHt7dWlmRmFjZXBpbGVOYW1lfX08L3VpZi1wYW5lbC1oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtY29udGVudD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cXFwibWVtYmVyIGluIG1lbWJlcnMgdHJhY2sgYnkgJGluZGV4XFxcIiB0aXRsZT1cXFwie3ttZW1iZXIucHJpbWFyeVRleHR9fVxcXCIgdGFiaW5kZXg9XFxcIjBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hIHVpZi1zdHlsZT1cXFwicm91bmRcXFwiIHVpZi1zaXplPVxcXCJtZWRpdW1cXFwiIHVpZi1pbWFnZS11cmw9XFxcInt7bWVtYmVyLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7bWVtYmVyLmNvbG9yfX1cXFwiPnt7bWVtYmVyLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0Pnt7bWVtYmVyLnByaW1hcnlUZXh0fX08L3VpZi1wZXJzb25hLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXNlY29uZGFyeS10ZXh0Pnt7bWVtYmVyLnNlY29uZGFyeVRleHR9fTwvdWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGFuZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBtZW1iZXJzOiAnPW5nTW9kZWwnLFxuICAgICAgICAgICAgdWlmRmFjZXBpbGVOYW1lOiAnQHVpZkZhY2VwaWxlTmFtZScsXG4gICAgICAgICAgICB1aWZPdmVyZmxvd0xpbWl0OiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRmFjZXBpbGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBGYWNlcGlsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIEZhY2VwaWxlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRmFjZXBpbGVEaXJlY3RpdmUgPSBGYWNlcGlsZURpcmVjdGl2ZTtcbnZhciBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibXMtRmFjZXBpbGUtaXRlbUJ0biBtcy1GYWNlcGlsZS1pdGVtQnRuLS1hZGRQZXJzb24ganMtYWRkUGVyc29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInBlb3BsZXBpY2tlclBhbmVsSXNPcGVuID0gdHJ1ZTtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwibXMtRmFjZXBpbGUtYWRkUGVyc29uSWNvbiBtcy1JY29uIG1zLUljb24tLXBlcnNvbkFkZFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBhbmVsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGFyZ2VcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwicGVvcGxlcGlja2VyUGFuZWxJc09wZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtc2hvdy1vdmVybGF5PVxcXCJ0cnVlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNob3ctY2xvc2U9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGFuZWwtaGVhZGVyPnt7cGVvcGxlUGlja2VyUGxhY2Vob2xkZXJ9fTwvdWlmLXBhbmVsLWhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRlbnQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXBlb3BsZT1cXFwib25GYWNlUGlsZVNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJwYXJlbnRTY29wZS5tZW1iZXJzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNlYXJjaC1kZWxheT1cXFwiNTAwXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcImZhY2VQaWxlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXNlbGVjdGVkLXBlb3BsZS1oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7c2VsZWN0ZWRGYWNlUGlsZVBlb3BsZS5sZW5ndGh9fSBzZWxlY3RlZCBwZXJzb24ocylcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1zZWxlY3RlZC1wZW9wbGUtaGVhZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXNlYXJjaC1tb3JlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wcmltYXJ5LXRleHQgdWlmLXNlYXJjaC1mb3ItdGV4dD1cXFwiWW91IGFyZSBzZWFyY2hpbmcgZm9yOiBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlYXJjaCBvcmdhbml6YXRpb24gcGVvcGxlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1wZW9wbGUtc2VhcmNoLW1vcmU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtY29udGVudD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBhbmVsPlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25GYWNlUGlsZVNlYXJjaDogJz11aWZQZW9wbGUnLFxuICAgICAgICAgICAgcGVvcGxlUGlja2VyUGxhY2Vob2xkZXI6ICdAcGxhY2Vob2xkZXInXG4gICAgICAgIH07XG4gICAgfVxuICAgIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICB7XG4gICAgICAgICAgICBzY29wZS5wYXJlbnRTY29wZSA9IHNjb3BlLiRwYXJlbnQuJHBhcmVudDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5GYWNlcGlsZUFkZEljb25EaXJlY3RpdmUgPSBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmZhY2VwaWxlJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZGYWNlcGlsZScsIEZhY2VwaWxlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZGYWNlcGlsZUFkZEljb24nLCBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvZmFjZXBpbGUvZmFjZXBpbGVEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGljb25FbnVtXzEgPSByZXF1aXJlKCcuL2ljb25FbnVtJyk7XG52YXIgSWNvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEljb25Db250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgSWNvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBJY29uQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgSWNvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSWNvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0te3t1aWZUeXBlfX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBJY29uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnaWNvbic7XG4gICAgfVxuICAgIEljb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBJY29uRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpY29uRW51bV8xLkljb25FbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5pY29uIC0gVW5zdXBwb3J0ZWQgaWNvbjogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgaWNvbiAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBJY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuSWNvbkRpcmVjdGl2ZSA9IEljb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmljb24nLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkljb24nLCBJY29uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChJY29uRW51bSkge1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnRcIl0gPSAwXSA9IFwiYWxlcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFsZXJ0MlwiXSA9IDFdID0gXCJhbGVydDJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFsZXJ0T3V0bGluZVwiXSA9IDJdID0gXCJhbGVydE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93blwiXSA9IDNdID0gXCJhcnJvd0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93bjJcIl0gPSA0XSA9IFwiYXJyb3dEb3duMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duTGVmdFwiXSA9IDVdID0gXCJhcnJvd0Rvd25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25SaWdodFwiXSA9IDZdID0gXCJhcnJvd0Rvd25SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dMZWZ0XCJdID0gN10gPSBcImFycm93TGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dSaWdodFwiXSA9IDhdID0gXCJhcnJvd1JpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwXCJdID0gOV0gPSBcImFycm93VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXAyXCJdID0gMTBdID0gXCJhcnJvd1VwMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcExlZnRcIl0gPSAxMV0gPSBcImFycm93VXBMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwUmlnaHRcIl0gPSAxMl0gPSBcImFycm93VXBSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXNjZW5kaW5nXCJdID0gMTNdID0gXCJhc2NlbmRpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImF0XCJdID0gMTRdID0gXCJhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXR0YWNobWVudFwiXSA9IDE1XSA9IFwiYXR0YWNobWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmFnXCJdID0gMTZdID0gXCJiYWdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJhbGxvb25cIl0gPSAxN10gPSBcImJhbGxvb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJlbGxcIl0gPSAxOF0gPSBcImJlbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvYXJkc1wiXSA9IDE5XSA9IFwiYm9hcmRzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib2xkXCJdID0gMjBdID0gXCJib2xkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib29rbWFya1wiXSA9IDIxXSA9IFwiYm9va21hcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvb2tzXCJdID0gMjJdID0gXCJib29rc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYnJpZWZjYXNlXCJdID0gMjNdID0gXCJicmllZmNhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJ1bmRsZVwiXSA9IDI0XSA9IFwiYnVuZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWtlXCJdID0gMjVdID0gXCJjYWtlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhclwiXSA9IDI2XSA9IFwiY2FsZW5kYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyRGF5XCJdID0gMjddID0gXCJjYWxlbmRhckRheVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJQdWJsaWNcIl0gPSAyOF0gPSBcImNhbGVuZGFyUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhcldlZWtcIl0gPSAyOV0gPSBcImNhbGVuZGFyV2Vla1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJXb3JrV2Vla1wiXSA9IDMwXSA9IFwiY2FsZW5kYXJXb3JrV2Vla1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FtZXJhXCJdID0gMzFdID0gXCJjYW1lcmFcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhclwiXSA9IDMyXSA9IFwiY2FyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25cIl0gPSAzM10gPSBcImNhcmV0RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duTGVmdFwiXSA9IDM0XSA9IFwiY2FyZXREb3duTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duT3V0bGluZVwiXSA9IDM1XSA9IFwiY2FyZXREb3duT3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duUmlnaHRcIl0gPSAzNl0gPSBcImNhcmV0RG93blJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldExlZnRcIl0gPSAzN10gPSBcImNhcmV0TGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRMZWZ0T3V0bGluZVwiXSA9IDM4XSA9IFwiY2FyZXRMZWZ0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRSaWdodFwiXSA9IDM5XSA9IFwiY2FyZXRSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRSaWdodE91dGxpbmVcIl0gPSA0MF0gPSBcImNhcmV0UmlnaHRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwXCJdID0gNDFdID0gXCJjYXJldFVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwTGVmdFwiXSA9IDQyXSA9IFwiY2FyZXRVcExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBPdXRsaW5lXCJdID0gNDNdID0gXCJjYXJldFVwT3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcFJpZ2h0XCJdID0gNDRdID0gXCJjYXJldFVwUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcnRcIl0gPSA0NV0gPSBcImNhcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhdFwiXSA9IDQ2XSA9IFwiY2F0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGFydFwiXSA9IDQ3XSA9IFwiY2hhcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXRcIl0gPSA0OF0gPSBcImNoYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXRBZGRcIl0gPSA0OV0gPSBcImNoYXRBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrXCJdID0gNTBdID0gXCJjaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hcIl0gPSA1MV0gPSBcImNoZWNrYm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveENoZWNrXCJdID0gNTJdID0gXCJjaGVja2JveENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveEVtcHR5XCJdID0gNTNdID0gXCJjaGVja2JveEVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveE1peGVkXCJdID0gNTRdID0gXCJjaGVja2JveE1peGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja1Blb3BsZVwiXSA9IDU1XSA9IFwiY2hlY2tQZW9wbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25Eb3duXCJdID0gNTZdID0gXCJjaGV2cm9uRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbkxlZnRcIl0gPSA1N10gPSBcImNoZXZyb25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uUmlnaHRcIl0gPSA1OF0gPSBcImNoZXZyb25SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNEb3duXCJdID0gNTldID0gXCJjaGV2cm9uc0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zTGVmdFwiXSA9IDYwXSA9IFwiY2hldnJvbnNMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc1JpZ2h0XCJdID0gNjFdID0gXCJjaGV2cm9uc1JpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc1VwXCJdID0gNjJdID0gXCJjaGV2cm9uc1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tEb3duXCJdID0gNjNdID0gXCJjaGV2cm9uVGhpY2tEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tMZWZ0XCJdID0gNjRdID0gXCJjaGV2cm9uVGhpY2tMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tSaWdodFwiXSA9IDY1XSA9IFwiY2hldnJvblRoaWNrUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja1VwXCJdID0gNjZdID0gXCJjaGV2cm9uVGhpY2tVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5Eb3duXCJdID0gNjddID0gXCJjaGV2cm9uVGhpbkRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluTGVmdFwiXSA9IDY4XSA9IFwiY2hldnJvblRoaW5MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpblJpZ2h0XCJdID0gNjldID0gXCJjaGV2cm9uVGhpblJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpblVwXCJdID0gNzBdID0gXCJjaGV2cm9uVGhpblVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVXBcIl0gPSA3MV0gPSBcImNoZXZyb25VcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQmFsbFwiXSA9IDcyXSA9IFwiY2lyY2xlQmFsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQmFsbG9vbnNcIl0gPSA3M10gPSBcImNpcmNsZUJhbGxvb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDYXJcIl0gPSA3NF0gPSBcImNpcmNsZUNhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ2F0XCJdID0gNzVdID0gXCJjaXJjbGVDYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNvZmZlZVwiXSA9IDc2XSA9IFwiY2lyY2xlQ29mZmVlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVEb2dcIl0gPSA3N10gPSBcImNpcmNsZURvZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRW1wdHlcIl0gPSA3OF0gPSBcImNpcmNsZUVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVGaWxsXCJdID0gNzldID0gXCJjaXJjbGVGaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVGaWxsZWRcIl0gPSA4MF0gPSBcImNpcmNsZUZpbGxlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlSGFsZkZpbGxlZFwiXSA9IDgxXSA9IFwiY2lyY2xlSGFsZkZpbGxlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlSW5mb1wiXSA9IDgyXSA9IFwiY2lyY2xlSW5mb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlTGlnaHRuaW5nXCJdID0gODNdID0gXCJjaXJjbGVMaWdodG5pbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBpbGxcIl0gPSA4NF0gPSBcImNpcmNsZVBpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBsYW5lXCJdID0gODVdID0gXCJjaXJjbGVQbGFuZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGx1c1wiXSA9IDg2XSA9IFwiY2lyY2xlUGx1c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUG9vZGxlXCJdID0gODddID0gXCJjaXJjbGVQb29kbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVVuZmlsbGVkXCJdID0gODhdID0gXCJjaXJjbGVVbmZpbGxlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xhc3NOb3RlYm9va1wiXSA9IDg5XSA9IFwiY2xhc3NOb3RlYm9va1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xhc3Nyb29tXCJdID0gOTBdID0gXCJjbGFzc3Jvb21cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsb2NrXCJdID0gOTFdID0gXCJjbG9ja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2x1dHRlclwiXSA9IDkyXSA9IFwiY2x1dHRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29mZmVlXCJdID0gOTNdID0gXCJjb2ZmZWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbGxhcHNlXCJdID0gOTRdID0gXCJjb2xsYXBzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29uZmxpY3RcIl0gPSA5NV0gPSBcImNvbmZsaWN0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb250YWN0XCJdID0gOTZdID0gXCJjb250YWN0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb250YWN0Rm9ybVwiXSA9IDk3XSA9IFwiY29udGFjdEZvcm1cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RQdWJsaWNcIl0gPSA5OF0gPSBcImNvbnRhY3RQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvcHlcIl0gPSA5OV0gPSBcImNvcHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNyZWRpdENhcmRcIl0gPSAxMDBdID0gXCJjcmVkaXRDYXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjcmVkaXRDYXJkT3V0bGluZVwiXSA9IDEwMV0gPSBcImNyZWRpdENhcmRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkYXNoYm9hcmRcIl0gPSAxMDJdID0gXCJkYXNoYm9hcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRlc2NlbmRpbmdcIl0gPSAxMDNdID0gXCJkZXNjZW5kaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXNrdG9wXCJdID0gMTA0XSA9IFwiZGVza3RvcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGV2aWNlV2lwZVwiXSA9IDEwNV0gPSBcImRldmljZVdpcGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRpYWxwYWRcIl0gPSAxMDZdID0gXCJkaWFscGFkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkaXJlY3Rpb25zXCJdID0gMTA3XSA9IFwiZGlyZWN0aW9uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRcIl0gPSAxMDhdID0gXCJkb2N1bWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRBZGRcIl0gPSAxMDldID0gXCJkb2N1bWVudEFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRGb3J3YXJkXCJdID0gMTEwXSA9IFwiZG9jdW1lbnRGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudExhbmRzY2FwZVwiXSA9IDExMV0gPSBcImRvY3VtZW50TGFuZHNjYXBlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFBERlwiXSA9IDExMl0gPSBcImRvY3VtZW50UERGXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFJlcGx5XCJdID0gMTEzXSA9IFwiZG9jdW1lbnRSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRzXCJdID0gMTE0XSA9IFwiZG9jdW1lbnRzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFNlYXJjaFwiXSA9IDExNV0gPSBcImRvY3VtZW50U2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2dcIl0gPSAxMTZdID0gXCJkb2dcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvZ0FsdFwiXSA9IDExN10gPSBcImRvZ0FsdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG90XCJdID0gMTE4XSA9IFwiZG90XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb3dubG9hZFwiXSA9IDExOV0gPSBcImRvd25sb2FkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkcm1cIl0gPSAxMjBdID0gXCJkcm1cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRyb3BcIl0gPSAxMjFdID0gXCJkcm9wXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkcm9wZG93blwiXSA9IDEyMl0gPSBcImRyb3Bkb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlZGl0Qm94XCJdID0gMTIzXSA9IFwiZWRpdEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZWxsaXBzaXNcIl0gPSAxMjRdID0gXCJlbGxpcHNpc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZW1iZWRcIl0gPSAxMjVdID0gXCJlbWJlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRcIl0gPSAxMjZdID0gXCJldmVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRDYW5jZWxcIl0gPSAxMjddID0gXCJldmVudENhbmNlbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRJbmZvXCJdID0gMTI4XSA9IFwiZXZlbnRJbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFJlY3VycmluZ1wiXSA9IDEyOV0gPSBcImV2ZW50UmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFNoYXJlXCJdID0gMTMwXSA9IFwiZXZlbnRTaGFyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXhjbGFtYXRpb25cIl0gPSAxMzFdID0gXCJleGNsYW1hdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXhwYW5kXCJdID0gMTMyXSA9IFwiZXhwYW5kXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleWVcIl0gPSAxMzNdID0gXCJleWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZhdm9yaXRlc1wiXSA9IDEzNF0gPSBcImZhdm9yaXRlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmF4XCJdID0gMTM1XSA9IFwiZmF4XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZE1haWxcIl0gPSAxMzZdID0gXCJmaWVsZE1haWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkTnVtYmVyXCJdID0gMTM3XSA9IFwiZmllbGROdW1iZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkVGV4dFwiXSA9IDEzOF0gPSBcImZpZWxkVGV4dFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRUZXh0Qm94XCJdID0gMTM5XSA9IFwiZmllbGRUZXh0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlRG9jdW1lbnRcIl0gPSAxNDBdID0gXCJmaWxlRG9jdW1lbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVJbWFnZVwiXSA9IDE0MV0gPSBcImZpbGVJbWFnZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZVBERlwiXSA9IDE0Ml0gPSBcImZpbGVQREZcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbHRlclwiXSA9IDE0M10gPSBcImZpbHRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsdGVyQ2xlYXJcIl0gPSAxNDRdID0gXCJmaWx0ZXJDbGVhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlyc3RBaWRcIl0gPSAxNDVdID0gXCJmaXJzdEFpZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmxhZ1wiXSA9IDE0Nl0gPSBcImZsYWdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlclwiXSA9IDE0N10gPSBcImZvbGRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyTW92ZVwiXSA9IDE0OF0gPSBcImZvbGRlck1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlclB1YmxpY1wiXSA9IDE0OV0gPSBcImZvbGRlclB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyU2VhcmNoXCJdID0gMTUwXSA9IFwiZm9sZGVyU2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250Q29sb3JcIl0gPSAxNTFdID0gXCJmb250Q29sb3JcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnREZWNyZWFzZVwiXSA9IDE1Ml0gPSBcImZvbnREZWNyZWFzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udEluY3JlYXNlXCJdID0gMTUzXSA9IFwiZm9udEluY3JlYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmcm93bnlcIl0gPSAxNTRdID0gXCJmcm93bnlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZ1bGxzY3JlZW5cIl0gPSAxNTVdID0gXCJmdWxsc2NyZWVuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnZWFyXCJdID0gMTU2XSA9IFwiZ2VhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2xhc3Nlc1wiXSA9IDE1N10gPSBcImdsYXNzZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdsb2JlXCJdID0gMTU4XSA9IFwiZ2xvYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdyYXBoXCJdID0gMTU5XSA9IFwiZ3JhcGhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdyb3VwXCJdID0gMTYwXSA9IFwiZ3JvdXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhlYWRlclwiXSA9IDE2MV0gPSBcImhlYWRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhcnRcIl0gPSAxNjJdID0gXCJoZWFydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhcnRFbXB0eVwiXSA9IDE2M10gPSBcImhlYXJ0RW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhpZGVcIl0gPSAxNjRdID0gXCJoaWRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJob21lXCJdID0gMTY1XSA9IFwiaG9tZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5ib3hDaGVja1wiXSA9IDE2Nl0gPSBcImluYm94Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluZm9cIl0gPSAxNjddID0gXCJpbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmZvQ2lyY2xlXCJdID0gMTY4XSA9IFwiaW5mb0NpcmNsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaXRhbGljXCJdID0gMTY5XSA9IFwiaXRhbGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJrZXlcIl0gPSAxNzBdID0gXCJrZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxhdGVcIl0gPSAxNzFdID0gXCJsYXRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWZlc2F2ZXJcIl0gPSAxNzJdID0gXCJsaWZlc2F2ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZmVzYXZlckxvY2tcIl0gPSAxNzNdID0gXCJsaWZlc2F2ZXJMb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWdodEJ1bGJcIl0gPSAxNzRdID0gXCJsaWdodEJ1bGJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZ2h0bmluZ1wiXSA9IDE3NV0gPSBcImxpZ2h0bmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlua1wiXSA9IDE3Nl0gPSBcImxpbmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpbmtSZW1vdmVcIl0gPSAxNzddID0gXCJsaW5rUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0QnVsbGV0c1wiXSA9IDE3OF0gPSBcImxpc3RCdWxsZXRzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0Q2hlY2tcIl0gPSAxNzldID0gXCJsaXN0Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RDaGVja2JveFwiXSA9IDE4MF0gPSBcImxpc3RDaGVja2JveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdEdyb3VwXCJdID0gMTgxXSA9IFwibGlzdEdyb3VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0R3JvdXAyXCJdID0gMTgyXSA9IFwibGlzdEdyb3VwMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdE51bWJlcmVkXCJdID0gMTgzXSA9IFwibGlzdE51bWJlcmVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsb2NrXCJdID0gMTg0XSA9IFwibG9ja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFwiXSA9IDE4NV0gPSBcIm1haWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxDaGVja1wiXSA9IDE4Nl0gPSBcIm1haWxDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbERvd25cIl0gPSAxODddID0gXCJtYWlsRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbEVkaXRcIl0gPSAxODhdID0gXCJtYWlsRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbEVtcHR5XCJdID0gMTg5XSA9IFwibWFpbEVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRXJyb3JcIl0gPSAxOTBdID0gXCJtYWlsRXJyb3JcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxPcGVuXCJdID0gMTkxXSA9IFwibWFpbE9wZW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxQYXVzZVwiXSA9IDE5Ml0gPSBcIm1haWxQYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFB1YmxpY1wiXSA9IDE5M10gPSBcIm1haWxQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxSZWFkXCJdID0gMTk0XSA9IFwibWFpbFJlYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxTZW5kXCJdID0gMTk1XSA9IFwibWFpbFNlbmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxTeW5jXCJdID0gMTk2XSA9IFwibWFpbFN5bmNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxVbnJlYWRcIl0gPSAxOTddID0gXCJtYWlsVW5yZWFkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYXBNYXJrZXJcIl0gPSAxOThdID0gXCJtYXBNYXJrZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lYWxcIl0gPSAxOTldID0gXCJtZWFsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZW51XCJdID0gMjAwXSA9IFwibWVudVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVudTJcIl0gPSAyMDFdID0gXCJtZW51MlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVyZ2VcIl0gPSAyMDJdID0gXCJtZXJnZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWV0YWRhdGFcIl0gPSAyMDNdID0gXCJtZXRhZGF0YVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWljcm9waG9uZVwiXSA9IDIwNF0gPSBcIm1pY3JvcGhvbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pbmlhdHVyZXNcIl0gPSAyMDVdID0gXCJtaW5pYXR1cmVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaW51c1wiXSA9IDIwNl0gPSBcIm1pbnVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtb2JpbGVcIl0gPSAyMDddID0gXCJtb2JpbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vbmV5XCJdID0gMjA4XSA9IFwibW9uZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vdmVcIl0gPSAyMDldID0gXCJtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtdWx0aUNob2ljZVwiXSA9IDIxMF0gPSBcIm11bHRpQ2hvaWNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtdXNpY1wiXSA9IDIxMV0gPSBcIm11c2ljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJuYXZpZ2F0ZVwiXSA9IDIxMl0gPSBcIm5hdmlnYXRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJuZXdcIl0gPSAyMTNdID0gXCJuZXdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5ld3NmZWVkXCJdID0gMjE0XSA9IFwibmV3c2ZlZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVcIl0gPSAyMTVdID0gXCJub3RlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlYm9va1wiXSA9IDIxNl0gPSBcIm5vdGVib29rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlRWRpdFwiXSA9IDIxN10gPSBcIm5vdGVFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlRm9yd2FyZFwiXSA9IDIxOF0gPSBcIm5vdGVGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlUmVwbHlcIl0gPSAyMTldID0gXCJub3RlUmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdFJlY3VycmluZ1wiXSA9IDIyMF0gPSBcIm5vdFJlY3VycmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib25lZHJpdmVcIl0gPSAyMjFdID0gXCJvbmVkcml2ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib25saW5lQWRkXCJdID0gMjIyXSA9IFwib25saW5lQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmxpbmVKb2luXCJdID0gMjIzXSA9IFwib25saW5lSm9pblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib29mUmVwbHlcIl0gPSAyMjRdID0gXCJvb2ZSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib3JnXCJdID0gMjI1XSA9IFwib3JnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYWdlXCJdID0gMjI2XSA9IFwicGFnZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFpbnRcIl0gPSAyMjddID0gXCJwYWludFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFuZWxcIl0gPSAyMjhdID0gXCJwYW5lbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFydG5lclwiXSA9IDIyOV0gPSBcInBhcnRuZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhdXNlXCJdID0gMjMwXSA9IFwicGF1c2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlbmNpbFwiXSA9IDIzMV0gPSBcInBlbmNpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlXCJdID0gMjMyXSA9IFwicGVvcGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVBZGRcIl0gPSAyMzNdID0gXCJwZW9wbGVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUNoZWNrXCJdID0gMjM0XSA9IFwicGVvcGxlQ2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUVycm9yXCJdID0gMjM1XSA9IFwicGVvcGxlRXJyb3JcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVBhdXNlXCJdID0gMjM2XSA9IFwicGVvcGxlUGF1c2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVJlbW92ZVwiXSA9IDIzN10gPSBcInBlb3BsZVJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlU2VjdXJpdHlcIl0gPSAyMzhdID0gXCJwZW9wbGVTZWN1cml0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlU3luY1wiXSA9IDIzOV0gPSBcInBlb3BsZVN5bmNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvblwiXSA9IDI0MF0gPSBcInBlcnNvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uQWRkXCJdID0gMjQxXSA9IFwicGVyc29uQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25SZW1vdmVcIl0gPSAyNDJdID0gXCJwZXJzb25SZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBob25lXCJdID0gMjQzXSA9IFwicGhvbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBob25lQWRkXCJdID0gMjQ0XSA9IFwicGhvbmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBob25lVHJhbnNmZXJcIl0gPSAyNDVdID0gXCJwaG9uZVRyYW5zZmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlXCJdID0gMjQ2XSA9IFwicGljdHVyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZUFkZFwiXSA9IDI0N10gPSBcInBpY3R1cmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVFZGl0XCJdID0gMjQ4XSA9IFwicGljdHVyZUVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVSZW1vdmVcIl0gPSAyNDldID0gXCJwaWN0dXJlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWxsXCJdID0gMjUwXSA9IFwicGlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGluRG93blwiXSA9IDI1MV0gPSBcInBpbkRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbkxlZnRcIl0gPSAyNTJdID0gXCJwaW5MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbGFjZWhvbGRlclwiXSA9IDI1M10gPSBcInBsYWNlaG9sZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbGFuZVwiXSA9IDI1NF0gPSBcInBsYW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbGF5XCJdID0gMjU1XSA9IFwicGxheVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGx1c1wiXSA9IDI1Nl0gPSBcInBsdXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsdXMyXCJdID0gMjU3XSA9IFwicGx1czJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvaW50SXRlbVwiXSA9IDI1OF0gPSBcInBvaW50SXRlbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9wb3V0XCJdID0gMjU5XSA9IFwicG9wb3V0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb3N0XCJdID0gMjYwXSA9IFwicG9zdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicHJpbnRcIl0gPSAyNjFdID0gXCJwcmludFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicHJvdGVjdGlvbkNlbnRlclwiXSA9IDI2Ml0gPSBcInByb3RlY3Rpb25DZW50ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInF1ZXN0aW9uXCJdID0gMjYzXSA9IFwicXVlc3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInF1ZXN0aW9uUmV2ZXJzZVwiXSA9IDI2NF0gPSBcInF1ZXN0aW9uUmV2ZXJzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVvdGVcIl0gPSAyNjVdID0gXCJxdW90ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmFkaW9CdXR0b25cIl0gPSAyNjZdID0gXCJyYWRpb0J1dHRvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVhY3RpdmF0ZVwiXSA9IDI2N10gPSBcInJlYWN0aXZhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlY2VpcHRDaGVja1wiXSA9IDI2OF0gPSBcInJlY2VpcHRDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdEZvcndhcmRcIl0gPSAyNjldID0gXCJyZWNlaXB0Rm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdFJlcGx5XCJdID0gMjcwXSA9IFwicmVjZWlwdFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWZyZXNoXCJdID0gMjcxXSA9IFwicmVmcmVzaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVsb2FkXCJdID0gMjcyXSA9IFwicmVsb2FkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseVwiXSA9IDI3M10gPSBcInJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseUFsbFwiXSA9IDI3NF0gPSBcInJlcGx5QWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseUFsbEFsdFwiXSA9IDI3NV0gPSBcInJlcGx5QWxsQWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseUFsdFwiXSA9IDI3Nl0gPSBcInJlcGx5QWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyaWJib25cIl0gPSAyNzddID0gXCJyaWJib25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJvb21cIl0gPSAyNzhdID0gXCJyb29tXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzYXZlXCJdID0gMjc5XSA9IFwic2F2ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2NoZWR1bGluZ1wiXSA9IDI4MF0gPSBcInNjaGVkdWxpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNlYXJjaFwiXSA9IDI4MV0gPSBcInNlYXJjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VjdGlvblwiXSA9IDI4Ml0gPSBcInNlY3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNlY3Rpb25zXCJdID0gMjgzXSA9IFwic2VjdGlvbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNldHRpbmdzXCJdID0gMjg0XSA9IFwic2V0dGluZ3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNoYXJlXCJdID0gMjg1XSA9IFwic2hhcmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNoaWVsZFwiXSA9IDI4Nl0gPSBcInNoaWVsZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2l0ZXNcIl0gPSAyODddID0gXCJzaXRlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic21pbGV5XCJdID0gMjg4XSA9IFwic21pbGV5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb2NjZXJcIl0gPSAyODldID0gXCJzb2NjZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvY2lhbExpc3RlbmluZ1wiXSA9IDI5MF0gPSBcInNvY2lhbExpc3RlbmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29ydFwiXSA9IDI5MV0gPSBcInNvcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvcnRMaW5lc1wiXSA9IDI5Ml0gPSBcInNvcnRMaW5lc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3BsaXRcIl0gPSAyOTNdID0gXCJzcGxpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RhclwiXSA9IDI5NF0gPSBcInN0YXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0YXJFbXB0eVwiXSA9IDI5NV0gPSBcInN0YXJFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RvcHdhdGNoXCJdID0gMjk2XSA9IFwic3RvcHdhdGNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdG9yeVwiXSA9IDI5N10gPSBcInN0b3J5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdHlsZVJlbW92ZVwiXSA9IDI5OF0gPSBcInN0eWxlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdWJzY3JpYmVcIl0gPSAyOTldID0gXCJzdWJzY3JpYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1blwiXSA9IDMwMF0gPSBcInN1blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuQWRkXCJdID0gMzAxXSA9IFwic3VuQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5RdWVzdGlvblwiXSA9IDMwMl0gPSBcInN1blF1ZXN0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdXBwb3J0XCJdID0gMzAzXSA9IFwic3VwcG9ydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFibGVcIl0gPSAzMDRdID0gXCJ0YWJsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFibGV0XCJdID0gMzA1XSA9IFwidGFibGV0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWdcIl0gPSAzMDZdID0gXCJ0YWdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhc2tSZWN1cnJpbmdcIl0gPSAzMDddID0gXCJ0YXNrUmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YXNrc1wiXSA9IDMwOF0gPSBcInRhc2tzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZWFtd29ya1wiXSA9IDMwOV0gPSBcInRlYW13b3JrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZXh0XCJdID0gMzEwXSA9IFwidGV4dFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGV4dEJveFwiXSA9IDMxMV0gPSBcInRleHRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRpbGVcIl0gPSAzMTJdID0gXCJ0aWxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0aW1lbGluZVwiXSA9IDMxM10gPSBcInRpbWVsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b2RheVwiXSA9IDMxNF0gPSBcInRvZGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b2dnbGVcIl0gPSAzMTVdID0gXCJ0b2dnbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZ2dsZU1pZGRsZVwiXSA9IDMxNl0gPSBcInRvZ2dsZU1pZGRsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG91Y2hcIl0gPSAzMTddID0gXCJ0b3VjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJhc2hcIl0gPSAzMThdID0gXCJ0cmFzaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVEb3duXCJdID0gMzE5XSA9IFwidHJpYW5nbGVEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5RG93blwiXSA9IDMyMF0gPSBcInRyaWFuZ2xlRW1wdHlEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5TGVmdFwiXSA9IDMyMV0gPSBcInRyaWFuZ2xlRW1wdHlMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5UmlnaHRcIl0gPSAzMjJdID0gXCJ0cmlhbmdsZUVtcHR5UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlVcFwiXSA9IDMyM10gPSBcInRyaWFuZ2xlRW1wdHlVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVMZWZ0XCJdID0gMzI0XSA9IFwidHJpYW5nbGVMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZVJpZ2h0XCJdID0gMzI1XSA9IFwidHJpYW5nbGVSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVVcFwiXSA9IDMyNl0gPSBcInRyaWFuZ2xlVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyb3BoeVwiXSA9IDMyN10gPSBcInRyb3BoeVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widW5kZXJsaW5lXCJdID0gMzI4XSA9IFwidW5kZXJsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1bnN1YnNjcmliZVwiXSA9IDMyOV0gPSBcInVuc3Vic2NyaWJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1cGxvYWRcIl0gPSAzMzBdID0gXCJ1cGxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZpZGVvXCJdID0gMzMxXSA9IFwidmlkZW9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZvaWNlbWFpbFwiXSA9IDMzMl0gPSBcInZvaWNlbWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsRm9yd2FyZFwiXSA9IDMzM10gPSBcInZvaWNlbWFpbEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZvaWNlbWFpbFJlcGx5XCJdID0gMzM0XSA9IFwidm9pY2VtYWlsUmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIndhZmZsZVwiXSA9IDMzNV0gPSBcIndhZmZsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid29ya1wiXSA9IDMzNl0gPSBcIndvcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIndyZW5jaFwiXSA9IDMzN10gPSBcIndyZW5jaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wieFwiXSA9IDMzOF0gPSBcInhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInhDaXJjbGVcIl0gPSAzMzldID0gXCJ4Q2lyY2xlXCI7XG59KShleHBvcnRzLkljb25FbnVtIHx8IChleHBvcnRzLkljb25FbnVtID0ge30pKTtcbnZhciBJY29uRW51bSA9IGV4cG9ydHMuSWNvbkVudW07XG47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIExhYmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYWJlbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGFiZWwgY2xhc3M9XCJtcy1MYWJlbFwiPjxuZy10cmFuc2NsdWRlLz48L2xhYmVsPic7XG4gICAgfVxuICAgIExhYmVsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExhYmVsRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJpYnV0ZXMuZGlzYWJsZWQpKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuZmluZCgnbGFiZWwnKS5lcSgwKS5hZGRDbGFzcygnaXMtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cmlidXRlcy5yZXF1aXJlZCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdsYWJlbCcpLmVxKDApLmFkZENsYXNzKCdpcy1yZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGFiZWxEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MYWJlbERpcmVjdGl2ZSA9IExhYmVsRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5sYWJlbCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxhYmVsJywgTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbGFiZWwvbGFiZWxEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIExpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGEgbmctaHJlZj1cInt7IG5nSHJlZiB9fVwiIGNsYXNzPVwibXMtTGlua1wiIG5nLXRyYW5zY2x1ZGU+PC9hPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0hyZWY6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgIH1cbiAgICBMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlua0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaW5rRGlyZWN0aXZlID0gTGlua0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGluaycsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGluaycsIExpbmtEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbGluay9saW5rRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKCcuL2xpc3RJdGVtU2VsZWN0TW9kZUVudW0nKTtcbnZhciBsaXN0SXRlbVR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2xpc3RJdGVtVHlwZUVudW0nKTtcbnZhciBsaXN0TGF5b3V0RW51bV8xID0gcmVxdWlyZSgnLi9saXN0TGF5b3V0RW51bScpO1xudmFyIExpc3RDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLml0ZW1zID0gW107XG4gICAgICAgIGlmICghdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbVNlbGVjdE1vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtU2VsZWN0TW9kZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJzZWxlY3RlZEl0ZW1zXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBMaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuICAgIHJldHVybiBMaXN0Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgTGlzdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtTGlzdFwiIG5nLXRyYW5zY2x1ZGU+PC91bD4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnbGlzdCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiAnPT91aWZTZWxlY3RlZEl0ZW1zJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTGlzdERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBpZiAoYXR0cnMudWlmTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmTGF5b3V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bVthdHRycy51aWZMYXlvdXRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZkxheW91dCArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtbGF5b3V0XFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIGxpc3R8Z3JpZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IGF0dHJzLnVpZkxheW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IGxpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW1bbGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bS5saXN0XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSBsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtW2xpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW0uZ3JpZF0pIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1MaXN0LS1ncmlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmSXRlbVNlbGVjdE1vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVthdHRycy51aWZJdGVtU2VsZWN0TW9kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmSXRlbVNlbGVjdE1vZGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLWl0ZW0tc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGF0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtU2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3REaXJlY3RpdmUgPSBMaXN0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgTGlzdEl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIExpc3RJdGVtQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgTGlzdEl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1MaXN0SXRlbVwiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkxpc3QnO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXRlbTogJz11aWZJdGVtJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0SXRlbUNvbnRyb2xsZXI7XG4gICAgfVxuICAgIExpc3RJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExpc3RJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBsaXN0KSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZTZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkU3RyaW5nID0gYXR0cnMudWlmU2VsZWN0ZWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyAhPT0gJ3RydWUnICYmIHNlbGVjdGVkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZTZWxlY3RlZCArICdcXCcgaXMgbm90IGEgdmFsaWQgYm9vbGVhbiB2YWx1ZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSB0cnVlfGZhbHNlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUuaXRlbSAmJiBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlR5cGUgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZUeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW1bYXR0cnMudWlmVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVHlwZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBpdGVtfGl0ZW1XaXRoSW1hZ2V8aXRlbVdpdGhJY29uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudHlwZSA9IGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtW2F0dHJzLnVpZlR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoc2NvcGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bS5pdGVtV2l0aEljb246XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3RJdGVtLS1kb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWljb24nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdMaXN0IGl0ZW0gdHlwZSBpdGVtV2l0aEljb24gcmVxdWlyZXMgdGhlIHVpZi1saXN0LWl0ZW0taWNvbiBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSW1hZ2U6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3RJdGVtLS1pbWFnZScpO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWltYWdlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnTGlzdCBpdGVtIHR5cGUgaXRlbVdpdGhJbWFnZSByZXF1aXJlcyB0aGUgdWlmLWxpc3QtaXRlbS1pbWFnZSBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZVbnJlYWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgYXR0cnMudWlmVW5yZWFkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgdW5yZWFkU3RyaW5nID0gYXR0cnMudWlmVW5yZWFkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodW5yZWFkU3RyaW5nICE9PSAndHJ1ZScgJiYgdW5yZWFkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZVbnJlYWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1bnJlYWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS51bnJlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmVW5zZWVuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlVuc2VlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHVuc2VlblN0cmluZyA9IGF0dHJzLnVpZlVuc2Vlbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHVuc2VlblN0cmluZyAhPT0gJ3RydWUnICYmIHVuc2VlblN0cmluZyAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVW5zZWVuICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodW5zZWVuU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5zZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5pdGVtQ2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5pdGVtU2VsZWN0TW9kZSA9PT0gbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW1bbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0uc2luZ2xlXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0Lml0ZW1zW2ldICE9PSBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBsaXN0SXRlbVNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5wdXNoKGxpc3RJdGVtU2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3Quc2VsZWN0ZWRJdGVtc1tpXSA9PT0gbGlzdEl0ZW1TY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VucmVhZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndW5zZWVuJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgbGlzdEl0ZW1TY29wZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxpc3QuaXRlbVNlbGVjdE1vZGUgIT09IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaXRlbUNsaWNrKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RhYmxlJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtRGlyZWN0aXZlID0gTGlzdEl0ZW1EaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tdGVydGlhcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlID0gTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLW1ldGFUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWltYWdlXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZSA9IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWl0ZW1JY29uXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1JY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tc2VsZWN0aW9uVGFyZ2V0XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUgPSBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tYWN0aW9uc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSA9IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWFjdGlvblwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uRGlyZWN0aXZlID0gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0JywgTGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW0nLCBMaXN0SXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1QcmltYXJ5VGV4dCcsIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtU2Vjb25kYXJ5VGV4dCcsIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1UZXJ0aWFyeVRleHQnLCBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1NZXRhVGV4dCcsIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtSW1hZ2UnLCBMaXN0SXRlbUltYWdlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUljb24nLCBMaXN0SXRlbUljb25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0JywgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtQWN0aW9ucycsIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1BY3Rpb24nLCBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3REaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoTGlzdEl0ZW1TZWxlY3RNb2RlRW51bSkge1xuICAgIExpc3RJdGVtU2VsZWN0TW9kZUVudW1bTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIExpc3RJdGVtU2VsZWN0TW9kZUVudW1bTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtcInNpbmdsZVwiXSA9IDFdID0gXCJzaW5nbGVcIjtcbiAgICBMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW0xpc3RJdGVtU2VsZWN0TW9kZUVudW1bXCJtdWx0aXBsZVwiXSA9IDJdID0gXCJtdWx0aXBsZVwiO1xufSkoZXhwb3J0cy5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtIHx8IChleHBvcnRzLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0gPSB7fSkpO1xudmFyIExpc3RJdGVtU2VsZWN0TW9kZUVudW0gPSBleHBvcnRzLkxpc3RJdGVtU2VsZWN0TW9kZUVudW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChMaXN0SXRlbVR5cGVFbnVtKSB7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVwiXSA9IDBdID0gXCJpdGVtXCI7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVdpdGhJbWFnZVwiXSA9IDFdID0gXCJpdGVtV2l0aEltYWdlXCI7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVdpdGhJY29uXCJdID0gMl0gPSBcIml0ZW1XaXRoSWNvblwiO1xufSkoZXhwb3J0cy5MaXN0SXRlbVR5cGVFbnVtIHx8IChleHBvcnRzLkxpc3RJdGVtVHlwZUVudW0gPSB7fSkpO1xudmFyIExpc3RJdGVtVHlwZUVudW0gPSBleHBvcnRzLkxpc3RJdGVtVHlwZUVudW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1UeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChMaXN0TGF5b3V0RW51bSkge1xuICAgIExpc3RMYXlvdXRFbnVtW0xpc3RMYXlvdXRFbnVtW1wibGlzdFwiXSA9IDBdID0gXCJsaXN0XCI7XG4gICAgTGlzdExheW91dEVudW1bTGlzdExheW91dEVudW1bXCJncmlkXCJdID0gMV0gPSBcImdyaWRcIjtcbn0pKGV4cG9ydHMuTGlzdExheW91dEVudW0gfHwgKGV4cG9ydHMuTGlzdExheW91dEVudW0gPSB7fSkpO1xudmFyIExpc3RMYXlvdXRFbnVtID0gZXhwb3J0cy5MaXN0TGF5b3V0RW51bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50c1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyKCRzY29wZSwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICB9XG4gICAgTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnLCAnJHdpbmRvdyddO1xuICAgIHJldHVybiBNZXNzYWdlQmFubmVyQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLk1lc3NhZ2VCYW5uZXJDb250cm9sbGVyID0gTWVzc2FnZUJhbm5lckNvbnRyb2xsZXI7XG52YXIgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ3VpZk1lc3NhZ2VCYW5uZXInO1xuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXJcXFwiIG5nLXNob3c9XFxcInVpZklzVmlzaWJsZVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItY29udGVudFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItdGV4dFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlclxcXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8dWlmLWJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIHVpZi10eXBlPVxcXCJjb21tYW5kXFxcIiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lci1leHBhbmRcXFwiPlxcbiAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcImNoZXZyb25zRG93blxcXCIgbmctc2hvdz1cXFwiIWlzRXhwYW5kZWRcXFwiPjwvdWlmLWljb24+XFxuICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiY2hldnJvbnNVcFxcXCIgbmctc2hvdz1cXFwiaXNFeHBhbmRlZFxcXCI+PC91aWYtaWNvbj5cXG4gICAgPC91aWYtYnV0dG9uPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWFjdGlvblxcXCI+XFxuICAgIDx1aWYtYnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgdWlmLXR5cGU9XFxcInByaW1hcnlcXFwiIGNsYXNzPVxcXCJtcy1mb250Q29sb3ItbmV1dHJhbExpZ2h0XFxcIiBuZy1jbGljaz1cXFwidWlmQWN0aW9uKClcXFwiPnt7IHVpZkFjdGlvbkxhYmVsIH19PC91aWYtYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDx1aWYtYnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgdWlmLXR5cGU9XFxcImNvbW1hbmRcXFwiIGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWNsb3NlXFxcIiBuZy1jbGljaz1cXFwidWlmT25DbG9zZSgpXFxcIiBzdHlsZT1cXFwiaGVpZ2h0OjUycHhcXFwiPlxcbiAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcInhcXFwiPjwvdWlmLWljb24+XFxuICAgIDwvdWlmLWJ1dHRvbj5cXG4gICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZBY3Rpb246ICcmJyxcbiAgICAgICAgICAgIHVpZkFjdGlvbkxhYmVsOiAnQCcsXG4gICAgICAgICAgICB1aWZJc1Zpc2libGU6ICc9PycsXG4gICAgICAgICAgICB1aWZPbkNsb3NlOiAnJj8nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3RleHRDb250YWluZXJNYXhXaWR0aCA9IDcwMDtcbiAgICAgICAgdGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aCA9IDg4O1xuICAgICAgICB0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoU21hbGwgPSAzNTtcbiAgICAgICAgdGhpcy5TTUFMTF9CUkVBS19QT0lOVCA9IDQ4MDtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW0sICRhdHRycywgJGNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmQWN0aW9uTGFiZWwgPSAkYXR0cnMudWlmQWN0aW9uTGFiZWw7XG4gICAgICAgICAgICAkc2NvcGUuaXNFeHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplID0gZnVuY3Rpb24gKGlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXJXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuX2NsaWVudFdpZHRoID0gX3RoaXMuX21lc3NhZ2VCYW5uZXJbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyV2lkdGggPj0gX3RoaXMuU01BTExfQlJFQUtfUE9JTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3Jlc2l6ZVJlZ3VsYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9yZXNpemVTbWFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy5faW5pdExvY2FscygkZWxlbSk7XG4gICAgICAgICAgICBfdGhpcy50cmFuc2NsdWRlQ2hpbGRzKCRzY29wZSwgJGVsZW0sICR0cmFuc2NsdWRlKTtcbiAgICAgICAgICAgIF90aGlzLl9pbml0VGV4dFdpZHRoID0gKF90aGlzLl9jbGlwcGVyLmNoaWxkcmVuKCkuZXEoMCkpWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRjb250cm9sbGVyLiR3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub25SZXNpemUoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoX3RoaXMuX2NoZXZyb25CdXR0b24pLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl90b2dnbGVFeHBhbnNpb24oJHNjb3BlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KF90aGlzLl9jbG9zZUJ1dHRvbikuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2hpZGVCYW5uZXIoJHNjb3BlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlQmFubmVyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5tZXNzYWdlYmFubmVyIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgdGhlIG1lc3NhZ2UgYmFubmVyLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbWVzc2FnZS1iYW5uZXI+IHlvdSBuZWVkIHRvIHNwZWNpZnknICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudEVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlcicpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9pbml0TG9jYWxzID0gZnVuY3Rpb24gKCRlbGVtKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXInKSk7XG4gICAgICAgIHRoaXMuX2NsaXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlcicpKTtcbiAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtTWVzc2FnZUJhbm5lci1leHBhbmQnKSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbkJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1hY3Rpb24nKSk7XG4gICAgICAgIHRoaXMuX2J1ZmZlclNpemUgPSB0aGlzLl9hY3Rpb25CdXR0b25bMF0ub2Zmc2V0V2lkdGggKyB0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoO1xuICAgICAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1jbG9zZScpKTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9yZXNpemVSZWd1bGFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoKHRoaXMuX2NsaWVudFdpZHRoIC0gdGhpcy5fYnVmZmVyU2l6ZSkgPiB0aGlzLl9pbml0VGV4dFdpZHRoICYmIHRoaXMuX2luaXRUZXh0V2lkdGggPCB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9ICdhdXRvJztcbiAgICAgICAgICAgIHRoaXMuX2NoZXZyb25CdXR0b25bMF0uY2xhc3NOYW1lID0gJ21zLU1lc3NhZ2VCYW5uZXItZXhwYW5kJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9IE1hdGgubWluKCh0aGlzLl9jbGllbnRXaWR0aCAtIHRoaXMuX2J1ZmZlclNpemUpLCB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGgpICsgJ3B4JztcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2hldnJvbkJ1dHRvbi5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvblswXS5jbGFzc05hbWUgKz0gJyBpcy12aXNpYmxlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbGlwcGVyWzBdLnN0eWxlLndpZHRoID0gdGhpcy5fdGV4dFdpZHRoO1xuICAgICAgICB0aGlzLl9jaGV2cm9uQnV0dG9uWzBdLnN0eWxlLmhlaWdodCA9ICc1MnB4JztcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5fcmVzaXplU21hbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jbGllbnRXaWR0aCAtICh0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoU21hbGwgKyB0aGlzLl9jbG9zZUJ1dHRvblswXS5vZmZzZXRXaWR0aCkgPiB0aGlzLl9pbml0VGV4dFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0V2lkdGggPSAnYXV0byc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0V2lkdGggPSAodGhpcy5fY2xpZW50V2lkdGggLSAodGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aFNtYWxsICsgdGhpcy5fY2xvc2VCdXR0b25bMF0ub2Zmc2V0V2lkdGgpKSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xpcHBlclswXS5zdHlsZS53aWR0aCA9IHRoaXMuX3RleHRXaWR0aDtcbiAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvblswXS5zdHlsZS5oZWlnaHQgPSAnODVweCc7XG4gICAgfTtcbiAgICA7XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX3RvZ2dsZUV4cGFuc2lvbiA9IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQgPSAhJHNjb3BlLmlzRXhwYW5kZWQ7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIudG9nZ2xlQ2xhc3MoJ2lzLWV4cGFuZGVkJyk7XG4gICAgfTtcbiAgICA7XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX2hpZGVCYW5uZXIgPSBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICgkc2NvcGUudWlmSXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlQmFubmVyLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudWlmSXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9tZXNzYWdlQmFubmVyLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5NZXNzYWdlQmFubmVyRGlyZWN0aXZlID0gTWVzc2FnZUJhbm5lckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubWVzc2FnZWJhbm5lcicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk1lc3NhZ2VCYW5uZXInLCBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYW5uZXIvbWVzc2FnZUJhbm5lckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgbWVzc2FnZUJhclR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL21lc3NhZ2VCYXJUeXBlRW51bScpO1xudmFyIE1lc3NhZ2VCYXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFyQ29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIE1lc3NhZ2VCYXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIE1lc3NhZ2VCYXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTWVzc2FnZUJhckNvbnRyb2xsZXIgPSBNZXNzYWdlQmFyQ29udHJvbGxlcjtcbnZhciBNZXNzYWdlQmFyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTWVzc2FnZUJhckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAndWlmTWVzc2FnZUJhcic7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnJyArXG4gICAgICAgICAgICAnPGRpdiBuZy1jbGFzcz1cIltcXCdtcy1NZXNzYWdlQmFyXFwnLCBjbGFzc1R5cGVdXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYXItY29udGVudFwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1NZXNzYWdlQmFyLWljb25cIj4nICtcbiAgICAgICAgICAgICc8aSBuZy1jbGFzcz1cIltcXCdtcy1JY29uXFwnLCBpY29uVHlwZV1cIj48L2k+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYXItdGV4dFwiIC8+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1pbmZvQ2lyY2xlJztcbiAgICAgICAgICAgICRzY29wZS5jbGFzc1R5cGUgPSAnJztcbiAgICAgICAgICAgICRzY29wZS51aWZUeXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYXIgLSBVbnN1cHBvcnRlZCB0eXBlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyAkc2NvcGUudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFyLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtZXNzYWdlQmFyVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAnIG1zLU1lc3NhZ2VCYXItLSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2xhc3NUeXBlID0gY2xhc3NOYW1lICsgbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bVtuZXdWYWx1ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5lcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmljb25UeXBlID0gJ21zLUljb24tLXhDaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5yZW1vdmU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1taW51cyBtcy1JY29uLS1jaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5zZXZlcmV3YXJuaW5nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0tYWxlcnQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5zdWNjZXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0tY2hlY2tib3hDaGVjayBtcy1JY29uLS1jaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1lc3NhZ2VCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlQmFyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSwgJ3VpZi1jb250ZW50Jyk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5NZXNzYWdlQmFyIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgdGhlIG1lc3NhZ2UgYmFyLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbWVzc2FnZS1iYXI+IHlvdSBuZWVkIHRvIHNwZWNpZnknICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudEVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYXItdGV4dCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUsICd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lLCAnbXMtTGluaycpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1MaW5rJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGJyIC8+JykpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTWVzc2FnZUJhckRpcmVjdGl2ZS5wcm90b3R5cGUuaGFzSXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsIHNlbGVjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBNZXNzYWdlQmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTWVzc2FnZUJhckRpcmVjdGl2ZSA9IE1lc3NhZ2VCYXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZNZXNzYWdlQmFyJywgTWVzc2FnZUJhckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoTWVzc2FnZUJhclR5cGVFbnVtKSB7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcImVycm9yXCJdID0gMF0gPSBcImVycm9yXCI7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcInJlbW92ZVwiXSA9IDFdID0gXCJyZW1vdmVcIjtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wic2V2ZXJld2FybmluZ1wiXSA9IDJdID0gXCJzZXZlcmV3YXJuaW5nXCI7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcInN1Y2Nlc3NcIl0gPSAzXSA9IFwic3VjY2Vzc1wiO1xuICAgIE1lc3NhZ2VCYXJUeXBlRW51bVtNZXNzYWdlQmFyVHlwZUVudW1bXCJ3YXJuaW5nXCJdID0gNF0gPSBcIndhcm5pbmdcIjtcbn0pKGV4cG9ydHMuTWVzc2FnZUJhclR5cGVFbnVtIHx8IChleHBvcnRzLk1lc3NhZ2VCYXJUeXBlRW51bSA9IHt9KSk7XG52YXIgTWVzc2FnZUJhclR5cGVFbnVtID0gZXhwb3J0cy5NZXNzYWdlQmFyVHlwZUVudW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBjb250ZXh0dWFsTWVudV8xID0gcmVxdWlyZSgnLi8uLi9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudScpO1xudmFyIE5hdkJhckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckNvbnRyb2xsZXIoJHNjb3BlLCAkYW5pbWF0ZSwgJGVsZW1lbnQsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5vcGVuTW9iaWxlTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1lbnVWaXNpYmxlID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0aGlzLiRhbmltYXRlW21lbnVWaXNpYmxlID8gJ3JlbW92ZUNsYXNzJyA6ICdhZGRDbGFzcyddKHRoaXMuJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGFuaW1hdGUucmVtb3ZlQ2xhc3ModGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VBbGxDb250ZXh0TWVudXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuYXZCYXJJdGVtcyA9IHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLU5hdkJhci1pdGVtJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2QmFySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZ0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQobmF2QmFySXRlbXNbaV0pO1xuICAgICAgICAgICAgdmFyIG5hdkJhckl0ZW1DdHJsID0gbmdFbGVtZW50LmNvbnRyb2xsZXIoTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuYXZCYXJJdGVtQ3RybCkge1xuICAgICAgICAgICAgICAgIG5hdkJhckl0ZW1DdHJsLmNsb3NlQ29udGV4dHVhbE1lbnUoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJJdGVtQ3RybC5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuaGlkZVNlYXJjaFRleHRCb3ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuYXZCYXJJdGVtcyA9IHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLU5hdkJhci1pdGVtLS1zZWFyY2gnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZCYXJJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5nRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChuYXZCYXJJdGVtc1tpXSk7XG4gICAgICAgICAgICB2YXIgbmF2U2VhcmNoQ3RybCA9IG5nRWxlbWVudC5jb250cm9sbGVyKE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuYXZTZWFyY2hDdHJsKSB7XG4gICAgICAgICAgICAgICAgbmF2U2VhcmNoQ3RybC5jbG9zZVNlYXJjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckYW5pbWF0ZScsICckZWxlbWVudCcsICckbG9nJ107XG4gICAgcmV0dXJuIE5hdkJhckNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJDb250cm9sbGVyID0gTmF2QmFyQ29udHJvbGxlcjtcbnZhciBOYXZCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckRpcmVjdGl2ZSgkbG9nLCAkYW5pbWF0ZSwgJGRvY3VtZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE5hdkJhckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ25hdic7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwibXMtTmF2QmFyXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtTmF2QmFyLW9wZW5NZW51IGpzLW9wZW5NZW51XFxcIiBuZy1jbGljaz1cXFwibmF2Lm9wZW5Nb2JpbGVNZW51KClcXFwiPlxcbiAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwibWVudVxcXCI+PC91aWYtaWNvbj5cXG4gICAgPC9kaXY+XFxuICAgIDx1aWYtb3ZlcmxheSB1aWYtbW9kZT1cXFwie3tvdmVybGF5fX1cXFwiIG5nLWNsaWNrPVxcXCJuYXYuY2xvc2VNb2JpbGVNZW51KClcXFwiPjwvdWlmLW92ZXJsYXk+XFxuICAgIDx1bCBjbGFzcz1cXFwibXMtTmF2QmFyLWl0ZW1zXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPSd1aWYtbmF2LWl0ZW1zJz48L2Rpdj5cXG4gICAgPC91bD5cXG4gIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb3ZlcmxheTogJ0A/dWlmT3ZlcmxheSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmF2QmFyQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIF90aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5jbG9zZUFsbENvbnRleHRNZW51cygpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuaGlkZVNlYXJjaFRleHRCb3goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1uYXYtaXRlbXMnKSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChjbG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTmF2QmFyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXZCYXJEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJywgJyRhbmltYXRlJywgJyRkb2N1bWVudCddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmTmF2QmFyJztcbiAgICBOYXZCYXJEaXJlY3RpdmUub3ZlcmxheVZhbHVlcyA9IFsnbGlnaHQnLCAnZGFyayddO1xuICAgIHJldHVybiBOYXZCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJEaXJlY3RpdmUgPSBOYXZCYXJEaXJlY3RpdmU7XG52YXIgTmF2QmFySXRlbVR5cGVzO1xuKGZ1bmN0aW9uIChOYXZCYXJJdGVtVHlwZXMpIHtcbiAgICBOYXZCYXJJdGVtVHlwZXNbTmF2QmFySXRlbVR5cGVzW1wibGlua1wiXSA9IDBdID0gXCJsaW5rXCI7XG4gICAgTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlc1tcIm1lbnVcIl0gPSAxXSA9IFwibWVudVwiO1xufSkoTmF2QmFySXRlbVR5cGVzIHx8IChOYXZCYXJJdGVtVHlwZXMgPSB7fSkpO1xudmFyIE5hdkJhckl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJJdGVtQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgfVxuICAgIE5hdkJhckl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5jbG9zZUNvbnRleHR1YWxNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kc2NvcGUuaGFzQ2hpbGRNZW51KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5jb250ZXh0TWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5kZXNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gTmF2QmFySXRlbUNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJJdGVtQ29udHJvbGxlciA9IE5hdkJhckl0ZW1Db250cm9sbGVyO1xudmFyIE5hdkJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckl0ZW1EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXCIgKyBOYXZCYXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzRGlzYWJsZWQ6ICdAP2Rpc2FibGVkJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnQD91aWZQb3NpdGlvbicsXG4gICAgICAgICAgICB0ZXh0OiAnPT91aWZUZXh0JyxcbiAgICAgICAgICAgIHR5cGU6ICdAP3VpZlR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlcyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW05hdkJhckl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOYXZCYXJJdGVtVHlwZXNbdHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhciAtIHVuc3VwcG9ydGVkIG5hdiBiYXIgaXRlbSB0eXBlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAndGhlIHR5cGUgXFwnJyArIHR5cGUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbmctT2ZmaWNlIFVJIEZhYnJpYyBhcyB2YWxpZCB0eXBlIGZvciBuYXYgYmFyIGl0ZW0uJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgdHlwZXMgY2FuIGJlIGZvdW5kIHVuZGVyIE5hdkJhckl0ZW1UeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyRGlyZWN0aXZlLnRzJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2PjwvZGl2Pic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXNbdHlwZV1dO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuYXZCYXJDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hdkJhckxpbmtFZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtTmF2QmFyLWxpbmsnKSk7XG4gICAgICAgICAgICAgICAgbmF2QmFyTGlua0VlbGVtZW50LnJlbW92ZUF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS50eXBlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS50eXBlID0gTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5oYXNDaGlsZE1lbnUgJiYgJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAhJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9wZW5NZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmNsb3NlTW9iaWxlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgJHNjb3BlLnNlbGVjdEl0ZW0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICB2YXIgY29udGV4dE1lbnVDdHJsID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db250ZXh0dWFsTWVudScpKVxuICAgICAgICAgICAgICAgIC5jb250cm9sbGVyKGNvbnRleHR1YWxNZW51XzEuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dE1lbnVDdHJsKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhhc0NoaWxkTWVudSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRleHRNZW51Q3RybCA9IGNvbnRleHRNZW51Q3RybDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9uUm9vdE1lbnVDbG9zZWQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VNb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbVxcXCJcXG4gICAgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkLCAnbXMtTmF2QmFyLWl0ZW0tLXJpZ2h0JzogcG9zaXRpb24gPT09ICdyaWdodCd9XFxcIj5cXG4gICAgICA8YSBjbGFzcz1cXFwibXMtTmF2QmFyLWxpbmtcXFwiIGhyZWY9XFxcIlxcXCI+PHNwYW4gY2xhc3M9J3VpZi1uYXYtaXRlbS1jb250ZW50Jz48L3NwYW4+PC9hPlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLm1lbnVdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0taGFzTWVudVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCI+XFxuICAgICAgPGEgY2xhc3M9XFxcIm1zLU5hdkJhci1saW5rXFxcIiBocmVmPVxcXCJcXFwiPjxzcGFuIGNsYXNzPSd1aWYtbmF2LWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICA8aSBjbGFzcz1cXFwibXMtTmF2QmFyLWNoZXZyb25Eb3duIG1zLUljb24gbXMtSWNvbi0tY2hldnJvbkRvd25cXFwiPjwvaT5cXG4gICAgICA8ZGl2IGNsYXNzPSd1aWYtc3VibWVudSc+PC9kaXY+XFxuICAgIDwvbGk+XCI7XG4gICAgfVxuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgTmF2QmFySXRlbURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCAmJiAhJHNjb3BlLnRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXIgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3lvdSBuZWVkIHRvIHByb3ZpZGUgYSB0ZXh0IGZvciBhIG5hdiBiYXIgbWVudSBpdGVtLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbmF2LWJhci1pdGVtPiB5b3UgbmVlZCB0byBzcGVjaWZ5IGVpdGhlciBcXCd1aWYtdGV4dFxcJyBhcyBhdHRyaWJ1dGUgb3IgPHVpZi1uYXYtaXRlbS1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0TGluayhjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRNZW51KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRMaW5rID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW0tY29udGVudCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoYW5ndWxhci5lbGVtZW50KCc8c3Bhbj4nICsgJHNjb3BlLnRleHQgKyAnPC9zcGFuPicpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0TWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXN1Ym1lbnUnKSkucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhckl0ZW0nO1xuICAgIHJldHVybiBOYXZCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFySXRlbURpcmVjdGl2ZSA9IE5hdkJhckl0ZW1EaXJlY3RpdmU7XG52YXIgTmF2QmFyU2VhcmNoQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyU2VhcmNoQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIE5hdkJhclNlYXJjaENvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlU2VhcmNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMuJHNjb3BlLnNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kYW5pbWF0ZS5yZW1vdmVDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKF90aGlzLiRlbGVtZW50LCAnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2hDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckZG9jdW1lbnQnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICByZXR1cm4gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLk5hdkJhclNlYXJjaENvbnRyb2xsZXIgPSBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xudmFyIE5hdkJhclNlYXJjaCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyU2VhcmNoKCRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyhcIl5cIiArIE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKSwgKFwiXCIgKyBOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSldO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25TZWFyY2hDYWxsYmFjazogJyY/dWlmT25TZWFyY2gnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAP3BsYWNlaG9sZGVyJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0tc2VhcmNoIG1zLXUtaGlkZGVuU21cXFwiIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1UZXh0RmllbGRcXFwiIG5nLWNsaWNrPVxcXCJza2lwT25DbGljaygkZXZlbnQpXFxcIj5cXG4gICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj17e3BsYWNlaG9sZGVyfX0gY2xhc3M9XFxcIm1zLVRleHRGaWVsZC1maWVsZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmcta2V5cHJlc3M9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiIG5nLW1vZGVsPVxcXCJzZWFyY2hUZXh0XFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHMsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGN0cmxzWzFdLmNsb3NlU2VhcmNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5za2lwT25DbGljayA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUNzc0NsYXNzZXMoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub25TZWFyY2ggPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY3RybHNbMF0uY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiAkZXZlbnQud2hpY2ggPT09IDEzICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwbHlDc3NDbGFzc2VzKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBOYXZCYXJTZWFyY2guZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXZCYXJTZWFyY2goJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGRvY3VtZW50JywgJyRhbmltYXRlJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2gucHJvdG90eXBlLmFwcGx5Q3NzQ2xhc3NlcyA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgICBpZiAoISRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGFuaW1hdGUuYWRkQ2xhc3MoJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVRleHRGaWVsZC1maWVsZCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgJGVsZW1lbnQucGFyZW50KCkuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZS5hZGRDbGFzcygkZWxlbWVudCwgJ2lzLXNlbGVjdGVkJyk7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSA9ICd1aWZOYXZCYXJTZWFyY2gnO1xuICAgIHJldHVybiBOYXZCYXJTZWFyY2g7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJTZWFyY2ggPSBOYXZCYXJTZWFyY2g7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIE5hdkJhckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShOYXZCYXJJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIE5hdkJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFyU2VhcmNoLmRpcmVjdGl2ZU5hbWUsIE5hdkJhclNlYXJjaC5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBvdmVybGF5TW9kZUVudW1fMSA9IHJlcXVpcmUoJy4vb3ZlcmxheU1vZGVFbnVtJyk7XG52YXIgT3ZlcmxheUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZXJsYXlDb250cm9sbGVyKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICB9XG4gICAgT3ZlcmxheUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBPdmVybGF5Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgT3ZlcmxheURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheURpcmVjdGl2ZShsb2cpIHtcbiAgICAgICAgdGhpcy5sb2cgPSBsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU92ZXJsYXlcIiBuZy1jbGFzcz1cIntcXCdtcy1PdmVybGF5LS1kYXJrXFwnOiB1aWZNb2RlID09IFxcJ2RhcmtcXCd9XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmTW9kZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIE92ZXJsYXlEaXJlY3RpdmUubG9nID0gbG9nO1xuICAgIH1cbiAgICBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAobG9nKSB7IHJldHVybiBuZXcgT3ZlcmxheURpcmVjdGl2ZShsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3ZlcmxheURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZk1vZGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAob3ZlcmxheU1vZGVFbnVtXzEuT3ZlcmxheU1vZGVbbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBPdmVybGF5RGlyZWN0aXZlLmxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3ZlcmxheSAtIFVuc3VwcG9ydGVkIG92ZXJsYXkgbW9kZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgb3ZlcmxheSBtb2RlIChcXCcnICsgc2NvcGUudWlmTW9kZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheU1vZGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBPdmVybGF5RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3ZlcmxheURpcmVjdGl2ZSA9IE92ZXJsYXlEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm92ZXJsYXknLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk92ZXJsYXknLCBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheURpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChPdmVybGF5TW9kZSkge1xuICAgIE92ZXJsYXlNb2RlW092ZXJsYXlNb2RlW1wibGlnaHRcIl0gPSAwXSA9IFwibGlnaHRcIjtcbiAgICBPdmVybGF5TW9kZVtPdmVybGF5TW9kZVtcImRhcmtcIl0gPSAxXSA9IFwiZGFya1wiO1xufSkoZXhwb3J0cy5PdmVybGF5TW9kZSB8fCAoZXhwb3J0cy5PdmVybGF5TW9kZSA9IHt9KSk7XG52YXIgT3ZlcmxheU1vZGUgPSBleHBvcnRzLk92ZXJsYXlNb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlNb2RlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgcGFuZWxEaXJlY3RpdmVFbnVtXzEgPSByZXF1aXJlKCcuL3BhbmVsRGlyZWN0aXZlRW51bScpO1xudmFyIFBhbmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbERpcmVjdGl2ZSgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzcz1cXFwibXMtT3ZlcmxheVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwidWlmSXNMaWdodERpc21pc3MgJiYgY2xvc2VQYW5lbCgpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJ1aWZTaG93T3ZlcmxheSA9PT0gdHJ1ZSA/ICdtcy1PdmVybGF5LS1kYXJrJyA6ICcnO1xcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGFuZWwtbWFpblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbC1jb21tYW5kc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1pZj1cXFwidWlmU2hvd0Nsb3NlXFxcIiBjbGFzcz0nbXMtUGFuZWwtY2xvc2VCdXR0b24nIG5nLWNsaWNrPVxcXCJjbG9zZVBhbmVsKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT0neCc+PC91aWYtaWNvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsLWNvbnRlbnRJbm5lclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQYW5lbENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZJc0xpZ2h0RGlzbWlzczogJz0nLFxuICAgICAgICAgICAgdWlmSXNPcGVuOiAnPScsXG4gICAgICAgICAgICB1aWZTaG93Q2xvc2U6ICc9JyxcbiAgICAgICAgICAgIHVpZlNob3dPdmVybGF5OiAnPScsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGFuZWxEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBhbmVsRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgUGFuZWxEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSkuaGFzQ2xhc3MoJ21zLUNvbW1hbmRCYXInKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtY29tbWFuZHMnKSkucHJlcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3BlLnVpZlR5cGUgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtbWFpbicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignZGl2Lm1zLVBhbmVsLWNvbnRlbnRJbm5lcicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmNsb3NlUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS51aWZJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsRGlyZWN0aXZlID0gUGFuZWxEaXJlY3RpdmU7XG52YXIgUGFuZWxDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbENvbnRyb2xsZXIoJHNjb3BlLCAkYW5pbWF0ZSwgJGVsZW1lbnQsICRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnVpZlBhbmVsU2l6ZUNsYXNzZXMgPSAoX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMuc21hbGxdID0gJ21zLVBhbmVsLS1zbScsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLm1lZGl1bV0gPSAnbXMtUGFuZWwtLW1kJyxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMubGFyZ2VdID0gJ21zLVBhbmVsLS1sZycsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmV4dHJhbGFyZ2VdID0gJ21zLVBhbmVsLS14bCcsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmV4dHJhZXh0cmFsYXJnZV0gPSAnbXMtUGFuZWwtLXh4bCcsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmxlZnRdID0gJ21zLVBhbmVsLS1sZWZ0JyxcbiAgICAgICAgICAgIF9hXG4gICAgICAgICk7XG4gICAgICAgIGlmICghJHNjb3BlLnVpZlR5cGUpIHtcbiAgICAgICAgICAgICRzY29wZS51aWZUeXBlID0gJ21lZGl1bSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXNbJHNjb3BlLnVpZlR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGFuZWwgLSB1bnN1cHBvcnRlZCBwYW5lbCB0eXBlOlxcbicgK1xuICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgJHNjb3BlLnVpZlR5cGUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbmctT2ZmaWNlIFVJIEZhYnJpYyBhcyB2YWxpZCB0eXBlIGZvciBwYW5lbHMuJyArXG4gICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgUGFuZWxUeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsLnRzJyk7XG4gICAgICAgICAgICAkc2NvcGUudWlmVHlwZSA9ICdtZWRpdW0nO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaXplID0gcGFuZWxEaXJlY3RpdmVFbnVtXzEuUGFuZWxUeXBlc1skc2NvcGUudWlmVHlwZV07XG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKHRoaXMudWlmUGFuZWxTaXplQ2xhc3Nlc1tzaXplXSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3VpZklzT3BlbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Jvb2xlYW4nICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wYW5lbCAtIGludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1vcGVuXFwnLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgXFwnJyArIHR5cGVvZiBuZXdWYWx1ZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBhcyB2YWxpZCB0eXBlIGZvciBcXCd1aWYtaXMtb3BlblxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1wYW5lbC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuYWRkQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdtcy1QYW5lbC1hbmltYXRlSW4nKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhcicpKS5zY29wZSgpLiRicm9hZGNhc3QoJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYW5pbWF0ZS5hZGRDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ21zLVBhbmVsLWFuaW1hdGVPdXQnKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdtcy1QYW5lbC1hbmltYXRlSW4gbXMtUGFuZWwtYW5pbWF0ZU91dCcpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX2E7XG4gICAgfVxuICAgIFBhbmVsQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnLCAnJGxvZycsICckdGltZW91dCddO1xuICAgIHJldHVybiBQYW5lbENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5QYW5lbENvbnRyb2xsZXIgPSBQYW5lbENvbnRyb2xsZXI7XG52YXIgUGFuZWxIZWFkZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhbmVsSGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxwIGNsYXNzPVwibXMtUGFuZWwtaGVhZGVyVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkhlYWRlclRleHQ6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQYW5lbEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBhbmVsSGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGFuZWxIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QYW5lbEhlYWRlckRpcmVjdGl2ZSA9IFBhbmVsSGVhZGVyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wYW5lbCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmUGFuZWwnLCBQYW5lbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGFuZWxIZWFkZXInLCBQYW5lbEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQYW5lbFR5cGVzKSB7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wic21hbGxcIl0gPSAwXSA9IFwic21hbGxcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJtZWRpdW1cIl0gPSAxXSA9IFwibWVkaXVtXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wibGFyZ2VcIl0gPSAyXSA9IFwibGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJleHRyYWxhcmdlXCJdID0gM10gPSBcImV4dHJhbGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJleHRyYWV4dHJhbGFyZ2VcIl0gPSA0XSA9IFwiZXh0cmFleHRyYWxhcmdlXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wibGVmdFwiXSA9IDVdID0gXCJsZWZ0XCI7XG59KShleHBvcnRzLlBhbmVsVHlwZXMgfHwgKGV4cG9ydHMuUGFuZWxUeXBlcyA9IHt9KSk7XG52YXIgUGFuZWxUeXBlcyA9IGV4cG9ydHMuUGFuZWxUeXBlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBzaXplRW51bV8xID0gcmVxdWlyZSgnLi9zaXplRW51bScpO1xudmFyIHBsYWNlaG9sZGVyRW51bV8xID0gcmVxdWlyZSgnLi9wbGFjZWhvbGRlckVudW0nKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW0nKTtcbnZhciBwZXJzb25hUHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFQcmVzZW5jZUVudW0nKTtcbnZhciBQZXJzb25hQ2FyZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmREaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGVyc29uYUNhcmQnXTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGVyc29uYUNhcmRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZlByZXNlbmNlJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZlNpemUnOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmRcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDYXJkQ2xhc3NlcygpXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLXBlcnNvbmFcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYVwiIG5nLWNsYXNzPVwiZ2V0UGVyc29uYUNsYXNzZXMoKVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWltYWdlQXJlYVwiPicgK1xuICAgICAgICAgICAgJzx1aWYtaWNvbiB1aWYtdHlwZT1cInBlcnNvblwiPjwvdWlmLWljb24+JyArXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VcIiBuZy1zcmM9XCJ7e3VpZkltYWdlVXJsfX1cIiBuZy1pZj1cInVpZkltYWdlVXJsXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtYWN0aW9uc1wiPicgK1xuICAgICAgICAgICAgJzxsaSBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gcGVyc29uYUNhcmRBY3Rpb25zXCIgbmctY2xhc3M9XCJnZXRBY3Rpb25DbGFzc2VzKGFjdGlvbilcIiBuZy1jbGljaz1cInNlbGVjdEFjdGlvbigkZXZlbnQsIGFjdGlvbilcIj4nICtcbiAgICAgICAgICAgICc8dWlmLWljb24gdWlmLXR5cGU9e3thY3Rpb24uaWNvbn19IG5nLWlmPVwiYWN0aW9uLnBsYWNlaG9sZGVyICE9IFxcJ292ZXJmbG93XFwnXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8L2xpPicgK1xuICAgICAgICAgICAgJzwvdWw+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbkRldGFpbEJveFwiPicgK1xuICAgICAgICAgICAgJzx1bCBuZy1jbGFzcz1cImRldGFpbENsYXNzXCI+PC91bD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIHBlcnNvbmFDYXJkQ29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgdmFyIGljb24gPSBlbGVtZW50LmZpbmQoJ3VpZi1pY29uJyk7XG4gICAgICAgICAgICBpY29uLmFkZENsYXNzKCdtcy1QZXJzb25hLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkgJiYgYW5ndWxhci5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlNpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSB4c21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4bGFyZ2UuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlN0eWxlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTdHlsZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU3R5bGUuIEl0IHNob3VsZCBiZSByb3VuZCBvciBzcXVhcmUuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlByZXNlbmNlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZQcmVzZW5jZS4gSXQgc2hvdWxkIGJlIGF2YWlsYWJsZSwgYXdheSwgYmxvY2tlZCwgYnVzeSwgZG5kIG9yIG9mZmxpbmUuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuZ2V0QWN0aW9uQ2xhc3NlcyA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb24ucGxhY2Vob2xkZXJdO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0udG9wcmlnaHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ21zLVBlcnNvbmFDYXJkLWFjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1vcmdDaGFydCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnJlZ3VsYXI6XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ21zLVBlcnNvbmFDYXJkLWFjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uQ2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUuZ2V0UGVyc29uYUNsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBlcnNvbmFDbGFzc2VzID0gW107XG4gICAgICAgICAgICAgICAgaWYgKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNpemVFbnVtXzEuUGVyc29uYVNpemVbYXR0cnMudWlmU2l6ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXhzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tc20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUubGFyZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1sZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54bGFyZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS14bCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXZhaWxhYmxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYXZhaWxhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF3YXk6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1hd2F5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJsb2NrZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1ibG9ja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJ1c3k6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1idXN5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmRuZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWRuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1vZmZsaW5lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5nZXRQZXJzb25hQ2FyZENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlID8gJ21zLVBlcnNvbmFDYXJkLS1zcXVhcmUnIDogJyc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGV0YWlsc1dyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hLWRldGFpbHMnKSk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbkRldGFpbHNCb3hMaXN0ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsQm94JykpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCd1bCcpLmVxKDApO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zTGlzdCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmFDYXJkLWFjdGlvbnMnKSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnTmFtZSA9IGNsb25lW2ldLnRhZ05hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1QUklNQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1TRUNPTkRBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELVRFUlRJQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1PUFRJT05BTC1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzV3JhcHBlci5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1BQ1RJT04nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQWN0aW9uID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSB3cmFwcGVkQWN0aW9uLmF0dHIoJ3VpZi1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJdID09PSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ub3ZlcmZsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc0xpc3QuYXBwZW5kKHdyYXBwZWRBY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uRGV0YWlsc0JveExpc3QuYXBwZW5kKF90aGlzLnByb2Nlc3NBY3Rpb24od3JhcHBlZEFjdGlvbiwgc2NvcGUsIHBlcnNvbmFDYXJkQ29udHJvbGxlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUNhcmREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVyc29uYUNhcmREaXJlY3RpdmUucHJvdG90eXBlLnByb2Nlc3NBY3Rpb24gPSBmdW5jdGlvbiAoY2xvbmUsIHNjb3BlLCBwZXJzb25hQ2FyZENvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIGNsYXNzVG9BZGQgPSAnJztcbiAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gY2xvbmUuYXR0cigndWlmLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgIHZhciBpY29uID0gY2xvbmUuYXR0cigndWlmLWljb24nKTtcbiAgICAgICAgdmFyIGFjdGlvblRvQWRkID0gbmV3IFBlcnNvbmFDYXJkQWN0aW9uKGljb24sIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgc3dpdGNoIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnJlZ3VsYXJdOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9BZGQgPSAnZGV0YWlsLScgKyAoKytzY29wZS5yZWd1bGFyQWN0aW9uc0NvdW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW3BsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS50b3ByaWdodF06XG4gICAgICAgICAgICAgICAgY2xhc3NUb0FkZCA9ICdkZXRhaWwtNSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNsb25lLmZpbmQoJ2xpJykuZXEoMCkuYWRkQ2xhc3MoY2xhc3NUb0FkZCk7XG4gICAgICAgIGFjdGlvblRvQWRkLmRldGFpbENsYXNzID0gY2xhc3NUb0FkZDtcbiAgICAgICAgcGVyc29uYUNhcmRDb250cm9sbGVyLmFkZEFjdGlvbihhY3Rpb25Ub0FkZCk7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRDb250cm9sbGVyKCRsb2csICRzY29wZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5kZXRhaWxDc3MgPSB7XG4gICAgICAgICAgICAxOiAnQ2hhdCcsXG4gICAgICAgICAgICAyOiAnUGhvbmUnLFxuICAgICAgICAgICAgMzogJ1ZpZGVvJyxcbiAgICAgICAgICAgIDQ6ICdNYWlsJyxcbiAgICAgICAgICAgIDU6ICdPcmcnXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5wZXJzb25hQ2FyZEFjdGlvbnMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgJHNjb3BlLnJlZ3VsYXJBY3Rpb25zQ291bnQgPSAwO1xuICAgICAgICAkc2NvcGUuZGV0YWlsQ2xhc3MgPSAnbXMtUGVyc29uYUNhcmQtZGV0YWlsQ2hhdCc7XG4gICAgICAgICRzY29wZS5zZWxlY3RBY3Rpb24gPSBmdW5jdGlvbiAoJGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgICAgICRzY29wZS5wZXJzb25hQ2FyZEFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhY3Rpb24uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGRldGFpbE51bWJlciA9ICsoYWN0aW9uLmRldGFpbENsYXNzLmNoYXJBdChhY3Rpb24uZGV0YWlsQ2xhc3MubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgJHNjb3BlLmRldGFpbENsYXNzID0gJ21zLVBlcnNvbmFDYXJkLWRldGFpbCcgKyBfdGhpcy5kZXRhaWxDc3NbZGV0YWlsTnVtYmVyXTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUNhcmRDb250cm9sbGVyLnByb3RvdHlwZS5hZGRBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uVG9BZGQpIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFjdGlvblRvQWRkLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRzY29wZS5wZXJzb25hQ2FyZEFjdGlvbnMucHVzaChhY3Rpb25Ub0FkZCk7XG4gICAgfTtcbiAgICBQZXJzb25hQ2FyZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICckc2NvcGUnXTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmRDb250cm9sbGVyID0gUGVyc29uYUNhcmRDb250cm9sbGVyO1xudmFyIFBlcnNvbmFDYXJkQWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZEFjdGlvbihpY29uLCBwbGFjZWhvbGRlcikge1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIHJldHVybiBQZXJzb25hQ2FyZEFjdGlvbjtcbn0oKSk7XG52YXIgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnLFxuICAgICAgICAgICAgJ3ByaW1hcnknOiAnbXMtUGVyc29uYS1wcmltYXJ5VGV4dCcsXG4gICAgICAgICAgICAnc2Vjb25kYXJ5JzogJ21zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dCcsXG4gICAgICAgICAgICAndGVydGlhcnknOiAnbXMtUGVyc29uYS10ZXJ0aWFyeVRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHRoaXMuYXZhaWxhYmxlQ2xhc3Nlc1t0aGlzLmRpcmVjdGl2ZVR5cGVdKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gJ29wdGlvbmFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlKHR5cGUpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmUGVyc29uYUNhcmQnO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VFbGVtZW50LCBhY3Rpb25BdHRycykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGFjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcl0pKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiJyArIGFjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZQbGFjZWhvbGRlci4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIsIHRvcHJpZ2h0IG9yIG92ZXJmbG93LicpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXJdID09PSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ub3ZlcmZsb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxsaSBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLW92ZXJmbG93XCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJzxsaSBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbkRldGFpbHNcIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUgPSBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1kZXRhaWxMYWJlbFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUgPSBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWRldGFpbExpbmVcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZCcsIFBlcnNvbmFDYXJkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZEFjdGlvbicsIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZERldGFpbExhYmVsJywgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmREZXRhaWxMaW5lJywgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFByaW1hcnlUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3ByaW1hcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFNlY29uZGFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRUZXJ0aWFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZE9wdGlvbmFsVGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCcnKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BlcnNvbmFjYXJkRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFTaXplKSB7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4c21hbGxcIl0gPSAwXSA9IFwieHNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJzbWFsbFwiXSA9IDFdID0gXCJzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibWVkaXVtXCJdID0gMl0gPSBcIm1lZGl1bVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibGFyZ2VcIl0gPSAzXSA9IFwibGFyZ2VcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhsYXJnZVwiXSA9IDRdID0gXCJ4bGFyZ2VcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVNpemUgfHwgKGV4cG9ydHMuUGVyc29uYVNpemUgPSB7fSkpO1xudmFyIFBlcnNvbmFTaXplID0gZXhwb3J0cy5QZXJzb25hU2l6ZTtcbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvc2l6ZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUGxhY2Vob2xkZXJFbnVtKSB7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcInJlZ3VsYXJcIl0gPSAwXSA9IFwicmVndWxhclwiO1xuICAgIFBsYWNlaG9sZGVyRW51bVtQbGFjZWhvbGRlckVudW1bXCJ0b3ByaWdodFwiXSA9IDFdID0gXCJ0b3ByaWdodFwiO1xuICAgIFBsYWNlaG9sZGVyRW51bVtQbGFjZWhvbGRlckVudW1bXCJvdmVyZmxvd1wiXSA9IDJdID0gXCJvdmVyZmxvd1wiO1xufSkoZXhwb3J0cy5QbGFjZWhvbGRlckVudW0gfHwgKGV4cG9ydHMuUGxhY2Vob2xkZXJFbnVtID0ge30pKTtcbnZhciBQbGFjZWhvbGRlckVudW0gPSBleHBvcnRzLlBsYWNlaG9sZGVyRW51bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGxhY2Vob2xkZXJFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFTdHlsZUVudW0pIHtcbiAgICBQZXJzb25hU3R5bGVFbnVtW1BlcnNvbmFTdHlsZUVudW1bXCJyb3VuZFwiXSA9IDBdID0gXCJyb3VuZFwiO1xuICAgIFBlcnNvbmFTdHlsZUVudW1bUGVyc29uYVN0eWxlRW51bVtcInNxdWFyZVwiXSA9IDFdID0gXCJzcXVhcmVcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bSB8fCAoZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtID0ge30pKTtcbnZhciBQZXJzb25hU3R5bGVFbnVtID0gZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9wZXJzb25hU3R5bGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFByZXNlbmNlRW51bSkge1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJhdmFpbGFibGVcIl0gPSAwXSA9IFwiYXZhaWxhYmxlXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImF3YXlcIl0gPSAxXSA9IFwiYXdheVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJibG9ja2VkXCJdID0gMl0gPSBcImJsb2NrZWRcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYnVzeVwiXSA9IDNdID0gXCJidXN5XCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImRuZFwiXSA9IDRdID0gXCJkbmRcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wib2ZmbGluZVwiXSA9IDVdID0gXCJvZmZsaW5lXCI7XG59KShleHBvcnRzLlByZXNlbmNlRW51bSB8fCAoZXhwb3J0cy5QcmVzZW5jZUVudW0gPSB7fSkpO1xudmFyIFByZXNlbmNlRW51bSA9IGV4cG9ydHMuUHJlc2VuY2VFbnVtO1xuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW0nKTtcbnZhciBwZXJzb25hUHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFQcmVzZW5jZUVudW0nKTtcbnZhciBwZXJzb25hSW5pdGlhbHNDb2xvckVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtJyk7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc2l6ZUVudW0nKTtcbnZhciBQZXJzb25hVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYVRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnLFxuICAgICAgICAgICAgJ3ByaW1hcnknOiAnbXMtUGVyc29uYS1wcmltYXJ5VGV4dCcsXG4gICAgICAgICAgICAnc2Vjb25kYXJ5JzogJ21zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dCcsXG4gICAgICAgICAgICAndGVydGlhcnknOiAnbXMtUGVyc29uYS10ZXJ0aWFyeVRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHRoaXMuYXZhaWxhYmxlQ2xhc3Nlc1t0aGlzLmRpcmVjdGl2ZVR5cGVdKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gJ29wdGlvbmFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hVGV4dERpcmVjdGl2ZSh0eXBlKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFUZXh0RGlyZWN0aXZlID0gUGVyc29uYVRleHREaXJlY3RpdmU7XG52YXIgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ151aWZQZXJzb25hJ107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAndWlmQ29sb3InOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbml0aWFscyBtcy1QZXJzb25hLWluaXRpYWxzLS17e3VpZkNvbG9yfX1cIiBuZy10cmFuc2NsdWRlPjwvZGl2PiAnO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICAgICAgdmFyIHBlcnNvbmFDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZDb2xvcikpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZDb2xvciA9IHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW3BlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yLmJsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZDb2xvcicsIGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW25ld0NvbG9yXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYSAtIFwiJyArIG5ld0NvbG9yICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZDb2xvci4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgSXQgc2hvdWxkIGJlIGxpZ2h0Qmx1ZSwgYmx1ZSwgZGFya0JsdWUsIHRlYWwsIGxpZ2h0R3JlZW4sIGdyZWVuLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBkYXJrR3JlZW4sIGxpZ2h0UGluaywgcGluaywgbWFnZW50YSwgcHVycGxlLCBibGFjaywgb3JhbmdlLCByZWQgb3IgZGFya1JlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlID0gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZJbWFnZVVybCc6ICdAJyxcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIiBuZy1zaG93PVwiZ2V0SW1hZ2VBcmVhVmlzaWJpbGl0eSgpXCI+JyArXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VcIiBuZy1zcmM9XCJ7e3VpZkltYWdlVXJsfX1cIiBuZy1pZj1cInVpZkltYWdlVXJsXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy51aWZTaXplQ2xhc3NlcyA9IChfYSA9IHt9LFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS50aW55XSA9ICdtcy1QZXJzb25hLS10aW55JyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSA9ICdtcy1QZXJzb25hLS14cycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSA9ICdtcy1QZXJzb25hLS1zbScsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlXSA9ICdtcy1QZXJzb25hLS1sZycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhsYXJnZV0gPSAnbXMtUGVyc29uYS0teGwnLFxuICAgICAgICAgICAgX2FcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy51aWZQcmVzZW5jZUNsYXNzZXMgPSAoX2IgPSB7fSxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXZhaWxhYmxlXSA9ICdtcy1QZXJzb25hLS1hdmFpbGFibGUnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hd2F5XSA9ICdtcy1QZXJzb25hLS1hd2F5JyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYmxvY2tlZF0gPSAnbXMtUGVyc29uYS0tYmxvY2tlZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJ1c3ldID0gJ21zLVBlcnNvbmEtLWJ1c3knLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5kbmRdID0gJ21zLVBlcnNvbmEtLWRuZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmVdID0gJ21zLVBlcnNvbmEtLW9mZmxpbmUnLFxuICAgICAgICAgICAgX2JcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlNpemUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU2l6ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU2l6ZS4gSXQgc2hvdWxkIGJlIHRpbnksIHhzbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHhsYXJnZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmU3R5bGUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTdHlsZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU3R5bGUuIEl0IHNob3VsZCBiZSByb3VuZCBvciBzcXVhcmUuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEltYWdlQXJlYVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdICE9PSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnRpbnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlc2VuY2UgPSBhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aWZQcmVzZW5jZSkgPyBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSA6IHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0ub2ZmbGluZTtcbiAgICAgICAgICAgICAgICBpZiAocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdID09PSBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaXplQ2xhc3MgPSBfdGhpcy51aWZTaXplQ2xhc3Nlc1tzaXplXTtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc2l6ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKHNpemVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goX3RoaXMudWlmUHJlc2VuY2VDbGFzc2VzW3ByZXNlbmNlXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXRhaWxzV3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VBcmVhID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYS1pbWFnZUFyZWEnKSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnTmFtZSA9IGNsb25lW2ldLnRhZ05hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtUFJJTUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVNFQ09OREFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVRFUlRJQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtT1BUSU9OQUwtVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1dyYXBwZXIuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUlOSVRJQUxTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUFyZWEucHJlcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgfVxuICAgIFBlcnNvbmFEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFEaXJlY3RpdmUgPSBQZXJzb25hRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIFBlcnNvbmFDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gUGVyc29uYUNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ29udHJvbGxlciA9IFBlcnNvbmFDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYScsIFBlcnNvbmFEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFJbml0aWFscycsIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVByaW1hcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgncHJpbWFyeScpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFTZWNvbmRhcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVRlcnRpYXJ5VGV4dCcsIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3RlcnRpYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYU9wdGlvbmFsVGV4dCcsIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJycpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9wZXJzb25hRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFJbml0aWFsc0NvbG9yKSB7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodEJsdWVcIl0gPSAwXSA9IFwibGlnaHRCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJibHVlXCJdID0gMV0gPSBcImJsdWVcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtCbHVlXCJdID0gMl0gPSBcImRhcmtCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJ0ZWFsXCJdID0gM10gPSBcInRlYWxcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0R3JlZW5cIl0gPSA0XSA9IFwibGlnaHRHcmVlblwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiZ3JlZW5cIl0gPSA1XSA9IFwiZ3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtHcmVlblwiXSA9IDZdID0gXCJkYXJrR3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0UGlua1wiXSA9IDddID0gXCJsaWdodFBpbmtcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcInBpbmtcIl0gPSA4XSA9IFwicGlua1wiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wibWFnZW50YVwiXSA9IDldID0gXCJtYWdlbnRhXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJwdXJwbGVcIl0gPSAxMF0gPSBcInB1cnBsZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiYmxhY2tcIl0gPSAxMV0gPSBcImJsYWNrXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJvcmFuZ2VcIl0gPSAxMl0gPSBcIm9yYW5nZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wicmVkXCJdID0gMTNdID0gXCJyZWRcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtSZWRcIl0gPSAxNF0gPSBcImRhcmtSZWRcIjtcbn0pKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgfHwgKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgPSB7fSkpO1xudmFyIFBlcnNvbmFJbml0aWFsc0NvbG9yID0gZXhwb3J0cy5QZXJzb25hSW5pdGlhbHNDb2xvcjtcbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFTaXplKSB7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ0aW55XCJdID0gMF0gPSBcInRpbnlcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhzbWFsbFwiXSA9IDFdID0gXCJ4c21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInNtYWxsXCJdID0gMl0gPSBcInNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJtZWRpdW1cIl0gPSAzXSA9IFwibWVkaXVtXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJsYXJnZVwiXSA9IDRdID0gXCJsYXJnZVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieGxhcmdlXCJdID0gNV0gPSBcInhsYXJnZVwiO1xufSkoZXhwb3J0cy5QZXJzb25hU2l6ZSB8fCAoZXhwb3J0cy5QZXJzb25hU2l6ZSA9IHt9KSk7XG52YXIgUGVyc29uYVNpemUgPSBleHBvcnRzLlBlcnNvbmFTaXplO1xuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3NpemVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwaXZvdFNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3Bpdm90U2l6ZUVudW0nKTtcbnZhciBwaXZvdFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL3Bpdm90VHlwZUVudW0nKTtcbnZhciBQaXZvdENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBpdm90Q29udHJvbGxlcigkbG9nLCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgICRzY29wZS5waXZvdENsaWNrID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmUGl2b3RzLmZvckVhY2goZnVuY3Rpb24gKHBpdm90SXRlbSwgcGl2b3RJbmRleCkge1xuICAgICAgICAgICAgICAgIHBpdm90SXRlbS5zZWxlY3RlZCA9IHBpdm90SW5kZXggPT09IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChwaXZvdEl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVpZlNlbGVjdGVkID0gcGl2b3RJdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQaXZvdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICckc2NvcGUnXTtcbiAgICByZXR1cm4gUGl2b3RDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGl2b3RDb250cm9sbGVyID0gUGl2b3RDb250cm9sbGVyO1xudmFyIFBpdm90SXRlbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGl2b3RJdGVtKHRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB9XG4gICAgcmV0dXJuIFBpdm90SXRlbTtcbn0oKSk7XG5leHBvcnRzLlBpdm90SXRlbSA9IFBpdm90SXRlbTtcbnZhciBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1QaXZvdC1saW5rIG1zLVBpdm90LWxpbmstLW92ZXJmbG93XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPVwiZWxsaXBzaXNcIiBjbGFzcz1cIm1zLVBpdm90LWVsbGlwc2lzXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC9saT4nO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgfVxuICAgIFBpdm90RWxsaXBzaXNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBpdm90RWxsaXBzaXNEaXJlY3RpdmUgPSBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlO1xudmFyIFBpdm90RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBpdm90Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZQaXZvdCddO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx1bCBjbGFzcz1cIm1zLVBpdm90XCIgbmctY2xhc3M9XCJnZXRDbGFzc2VzKClcIiA+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0LXN0YXJ0PVwicGl2b3QgaW4gdWlmUGl2b3RzXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm1zLVBpdm90LWxpbmtcIiBuZy1jbGljaz1cInBpdm90Q2xpY2soJGluZGV4KVwiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ2lzLXNlbGVjdGVkXFwnOiBwaXZvdC5zZWxlY3RlZH1cIj57e3Bpdm90LnRpdGxlfX08L2xpPiAnICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1yZXBlYXQtZW5kPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC91bD4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmUGl2b3RzOiAnPT8nLFxuICAgICAgICAgICAgdWlmU2VsZWN0ZWQ6ICc9PycsXG4gICAgICAgICAgICB1aWZTaXplOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGl2b3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGl2b3REaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGludGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHBpdm90Q29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlNpemUnLCBmdW5jdGlvbiAobmV3U2l6ZSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1NpemUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQocGl2b3RTaXplRW51bV8xLlBpdm90U2l6ZVtuZXdTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBwaXZvdENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGl2b3QgLSBVbnN1cHBvcnRlZCBzaXplOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiJyArIG5ld1NpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSByZWd1bGFyIG9yIGxhcmdlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1R5cGUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdUeXBlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBpdm90VHlwZUVudW1fMS5QaXZvdFR5cGVbbmV3VHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgcGl2b3RDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBpdm90IC0gVW5zdXBwb3J0ZWQgc2l6ZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdcIicgKyBuZXdUeXBlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiBJdCBzaG91bGQgYmUgcmVndWxhciBvciB0YWJzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZTZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZQaXZvdHMuZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudFBpdm90KSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQaXZvdC5zZWxlY3RlZCA9IGN1cnJlbnRQaXZvdC50aXRsZSA9PT0gbmV3VmFsdWUudGl0bGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkUGl2b3RzID0gc2NvcGUudWlmUGl2b3RzLmZpbHRlcihmdW5jdGlvbiAoY3VycmVudFBpdm90KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGl2b3Quc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUGl2b3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWxlY3RlZFBpdm90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRQaXZvdHNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmdldENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9ICcnO1xuICAgICAgICAgICAgY2xhc3NlcyArPSBwaXZvdFR5cGVFbnVtXzEuUGl2b3RUeXBlW3Njb3BlLnVpZlR5cGVdID09PSBwaXZvdFR5cGVFbnVtXzEuUGl2b3RUeXBlLnRhYnMgPyAnbXMtUGl2b3QtLXRhYnMnIDogJyc7XG4gICAgICAgICAgICBjbGFzc2VzICs9IHBpdm90U2l6ZUVudW1fMS5QaXZvdFNpemVbc2NvcGUudWlmU2l6ZV0gPT09IHBpdm90U2l6ZUVudW1fMS5QaXZvdFNpemUubGFyZ2UgPyAnIG1zLVBpdm90LS1sYXJnZScgOiAnJztcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFBpdm90RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGl2b3REaXJlY3RpdmUgPSBQaXZvdERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGl2b3QnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdCcsIFBpdm90RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdEVsbGlwc2lzJywgUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQaXZvdFNpemUpIHtcbiAgICBQaXZvdFNpemVbUGl2b3RTaXplWydyZWd1bGFyJ10gPSAwXSA9ICdyZWd1bGFyJztcbiAgICBQaXZvdFNpemVbUGl2b3RTaXplWydsYXJnZSddID0gMV0gPSAnbGFyZ2UnO1xufSkoZXhwb3J0cy5QaXZvdFNpemUgfHwgKGV4cG9ydHMuUGl2b3RTaXplID0ge30pKTtcbnZhciBQaXZvdFNpemUgPSBleHBvcnRzLlBpdm90U2l6ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGl2b3QvcGl2b3RTaXplRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQaXZvdFR5cGUpIHtcbiAgICBQaXZvdFR5cGVbUGl2b3RUeXBlW1wicmVndWxhclwiXSA9IDBdID0gXCJyZWd1bGFyXCI7XG4gICAgUGl2b3RUeXBlW1Bpdm90VHlwZVtcInRhYnNcIl0gPSAxXSA9IFwidGFic1wiO1xufSkoZXhwb3J0cy5QaXZvdFR5cGUgfHwgKGV4cG9ydHMuUGl2b3RUeXBlID0ge30pKTtcbnZhciBQaXZvdFR5cGUgPSBleHBvcnRzLlBpdm90VHlwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGl2b3QvcGl2b3RUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3JcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbU5hbWVcIj57e3VpZk5hbWV9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1pdGVtUHJvZ3Jlc3NcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItcHJvZ3Jlc3NUcmFja1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1wcm9ncmVzc0JhclwiIG5nLXN0eWxlPVwie3dpZHRoOiB1aWZQZXJjZW50Q29tcGxldGUrXFwnJVxcJ31cIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbURlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZOYW1lOiAnQCcsXG4gICAgICAgICAgICB1aWZQZXJjZW50Q29tcGxldGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAobG9nKSB7IHJldHVybiBuZXcgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUobG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUGVyY2VudENvbXBsZXRlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwgfHwgbmV3VmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGVyY2VudENvbXBsZXRlID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3UGVyY2VudENvbXBsZXRlID0gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obmV3UGVyY2VudENvbXBsZXRlKSB8fCBuZXdQZXJjZW50Q29tcGxldGUgPCAwIHx8IG5ld1BlcmNlbnRDb21wbGV0ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucHJvZ3Jlc3NpbmRpY2F0b3IgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1BlcmNlbnQgY29tcGxldGUgbXVzdCBiZSBhIHZhbGlkIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMC4nKTtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZQZXJjZW50Q29tcGxldGUgPSBNYXRoLm1heChNYXRoLm1pbihuZXdQZXJjZW50Q29tcGxldGUsIDEwMCksIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Qcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZSA9IFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wcm9ncmVzc2luZGljYXRvcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmUHJvZ3Jlc3NJbmRpY2F0b3InLCBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9wcm9ncmVzc2luZGljYXRvci9wcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgU2VhcmNoQm94RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWFyY2hCb3hEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNlYXJjaEJveFwiIG5nLWNsYXNzPVwie1xcJ2lzLWFjdGl2ZVxcJzppc0FjdGl2ZSwgXFwnaXMtZGlzYWJsZWRcXCc6aXNEaXNhYmxlZH1cIj4nICtcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJtcy1TZWFyY2hCb3gtZmllbGRcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWJsdXI9XCJpbnB1dEJsdXIoKVwiJyArXG4gICAgICAgICAgICAnIG5nLW1vZGVsPVwidmFsdWVcIiBuZy1jaGFuZ2U9XCJpbnB1dENoYW5nZSgpXCIgaWQ9XCJ7ezo6XFwnc2VhcmNoQm94X1xcJyskaWR9fVwiIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwibXMtU2VhcmNoQm94LWxhYmVsXCIgZm9yPVwie3s6OlxcJ3NlYXJjaEJveF9cXCcrJGlkfX1cIiBuZy1oaWRlPVwiaXNMYWJlbEhpZGRlblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtU2VhcmNoQm94LWljb24gbXMtSWNvbiBtcy1JY29uLS1zZWFyY2hcIiA+PC9pPiB7e3BsYWNlaG9sZGVyfX08L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJtcy1TZWFyY2hCb3gtY2xvc2VCdXR0b25cIiBuZy1tb3VzZWRvd249XCJidG5Nb3VzZWRvd24oKVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJz0/JyxcbiAgICAgICAgICAgIHZhbHVlOiAnPT9uZ01vZGVsJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTZWFyY2hCb3hEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWFyY2hCb3hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNlYXJjaEJveERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHZhciBuZ01vZGVsQ3RybDtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGNvbnRyb2xsZXJzKSAmJiBjb250cm9sbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBuZ01vZGVsQ3RybCA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLmlzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pbnB1dEZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobmdNb2RlbEN0cmwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0RGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRCbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmlzQ2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nTW9kZWxDdHJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHNjb3BlLnZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2NvcGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmdNb2RlbEN0cmwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5idG5Nb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5pc0NhbmNlbCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndmFsdWUnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAoIXNjb3BlLmlzRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHZhbCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsQ3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3BsYWNlaG9sZGVyJywgZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgICAgICAgICAgc2NvcGUucGxhY2Vob2xkZXIgPSBzZWFyY2g7XG4gICAgICAgIH0pO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzRGlzYWJsZWQgPSAhIWRpc2FibGVkO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTZWFyY2hCb3hEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5TZWFyY2hCb3hEaXJlY3RpdmUgPSBTZWFyY2hCb3hEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNlYXJjaGJveCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNlYXJjaGJveCcsIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9zZWFyY2hib3gvc2VhcmNoYm94RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBzcGlubmVyU2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc3Bpbm5lclNpemVFbnVtJyk7XG52YXIgU3Bpbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Bpbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtU3Bpbm5lclwiPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFNwaW5uZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ25nU2hvdyc6ICc9JyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFNwaW5uZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTcGlubmVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTcGlubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lciAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3Bpbm5lciBzaXplIChcXCcnICsgYXR0cnMudWlmU2l6ZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemVbYXR0cnMudWlmU2l6ZV0gPT09IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplLmxhcmdlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFkZENsYXNzKCdtcy1TcGlubmVyLS1sYXJnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uZ1Nob3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1Nob3cnLCBmdW5jdGlvbiAobmV3VmlzaWJsZSwgb2xkVmlzaWJsZSwgc3Bpbm5lclNjb3BlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyU2NvcGUuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NvcGUuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIGlmIChjbG9uZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtU3Bpbm5lci1sYWJlbCcpLmFwcGVuZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmluaXQoKTtcbiAgICB9O1xuICAgIHJldHVybiBTcGlubmVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU3Bpbm5lckRpcmVjdGl2ZSA9IFNwaW5uZXJEaXJlY3RpdmU7XG52YXIgU3Bpbm5lckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwaW5uZXJDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRpbnRlcnZhbCwgJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRpbnRlcnZhbCA9ICRpbnRlcnZhbDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5fb2Zmc2V0U2l6ZSA9IDAuMTc5O1xuICAgICAgICB0aGlzLl9udW1DaXJjbGVzID0gODtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uU3BlZWQgPSA5MDtcbiAgICAgICAgdGhpcy5fY2lyY2xlcyA9IFtdO1xuICAgICAgICAkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9wYXJlbnRTaXplID0gc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemVbX3RoaXMuJHNjb3BlLnVpZlNpemVdID09PSBzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZS5sYXJnZSA/IDI4IDogMjA7XG4gICAgICAgICAgICBfdGhpcy5jcmVhdGVDaXJjbGVzQW5kQXJyYW5nZSgpO1xuICAgICAgICAgICAgX3RoaXMuc2V0SW5pdGlhbE9wYWNpdHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX2FuaW1hdGlvbkludGVydmFsID0gJGludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IF90aGlzLl9jaXJjbGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZhZGVDaXJjbGUoX3RoaXMuX2NpcmNsZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIF90aGlzLl9hbmltYXRpb25TcGVlZCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChfdGhpcy5fYW5pbWF0aW9uSW50ZXJ2YWwpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuY3JlYXRlQ2lyY2xlc0FuZEFycmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbmdsZSA9IDA7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9wYXJlbnRTaXplICogdGhpcy5fb2Zmc2V0U2l6ZTtcbiAgICAgICAgdmFyIHN0ZXAgPSAoMiAqIE1hdGguUEkpIC8gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdmFyIGkgPSB0aGlzLl9udW1DaXJjbGVzO1xuICAgICAgICB2YXIgcmFkaXVzID0gKHRoaXMuX3BhcmVudFNpemUgLSBvZmZzZXQpICogMC41O1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgY2lyY2xlID0gdGhpcy5jcmVhdGVDaXJjbGUoKTtcbiAgICAgICAgICAgIHZhciB4ID0gTWF0aC5yb3VuZCh0aGlzLl9wYXJlbnRTaXplICogMC41ICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpIC0gY2lyY2xlWzBdLmNsaWVudFdpZHRoICogMC41KSAtIG9mZnNldCAqIDAuNTtcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5yb3VuZCh0aGlzLl9wYXJlbnRTaXplICogMC41ICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpIC0gY2lyY2xlWzBdLmNsaWVudEhlaWdodCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjaXJjbGUpO1xuICAgICAgICAgICAgY2lyY2xlLmNzcygnbGVmdCcsICh4ICsgJ3B4JykpO1xuICAgICAgICAgICAgY2lyY2xlLmNzcygndG9wJywgKHkgKyAncHgnKSk7XG4gICAgICAgICAgICBhbmdsZSArPSBzdGVwO1xuICAgICAgICAgICAgdmFyIGNpcmNsZU9iamVjdCA9IG5ldyBDaXJjbGVPYmplY3QoY2lyY2xlLCBpKTtcbiAgICAgICAgICAgIHRoaXMuX2NpcmNsZXMucHVzaChjaXJjbGVPYmplY3QpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuY3JlYXRlQ2lyY2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2lyY2xlID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgZG90U2l6ZSA9ICh0aGlzLl9wYXJlbnRTaXplICogdGhpcy5fb2Zmc2V0U2l6ZSkgKyAncHgnO1xuICAgICAgICBjaXJjbGUuYWRkQ2xhc3MoJ21zLVNwaW5uZXItY2lyY2xlJykuY3NzKCd3aWR0aCcsIGRvdFNpemUpLmNzcygnaGVpZ2h0JywgZG90U2l6ZSk7XG4gICAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICA7XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLnNldEluaXRpYWxPcGFjaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3BjYWl0eVRvU2V0O1xuICAgICAgICB0aGlzLl9mYWRlSW5jcmVtZW50ID0gMSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoY2lyY2xlLCBpbmRleCkge1xuICAgICAgICAgICAgb3BjYWl0eVRvU2V0ID0gKF90aGlzLl9mYWRlSW5jcmVtZW50ICogKGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgY2lyY2xlLm9wYWNpdHkgPSBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmZhZGVDaXJjbGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHZhciBuZXdPcGFjaXR5ID0gY2lyY2xlLm9wYWNpdHkgLSB0aGlzLl9mYWRlSW5jcmVtZW50O1xuICAgICAgICBpZiAobmV3T3BhY2l0eSA8PSAwKSB7XG4gICAgICAgICAgICBuZXdPcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG5ld09wYWNpdHk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGludGVydmFsJywgJyRsb2cnXTtcbiAgICByZXR1cm4gU3Bpbm5lckNvbnRyb2xsZXI7XG59KCkpO1xudmFyIENpcmNsZU9iamVjdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2lyY2xlT2JqZWN0KGNpcmNsZUVsZW1lbnQsIGNpcmNsZUluZGV4KSB7XG4gICAgICAgIHRoaXMuY2lyY2xlRWxlbWVudCA9IGNpcmNsZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2lyY2xlSW5kZXggPSBjaXJjbGVJbmRleDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENpcmNsZU9iamVjdC5wcm90b3R5cGUsIFwib3BhY2l0eVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICsodGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAob3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScsIG9wYWNpdHkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQ2lyY2xlT2JqZWN0O1xufSgpKTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lcicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNwaW5uZXInLCBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChTcGlubmVyU2l6ZSkge1xuICAgIFNwaW5uZXJTaXplW1NwaW5uZXJTaXplWydzbWFsbCddID0gMF0gPSAnc21hbGwnO1xuICAgIFNwaW5uZXJTaXplW1NwaW5uZXJTaXplWydsYXJnZSddID0gMV0gPSAnbGFyZ2UnO1xufSkoZXhwb3J0cy5TcGlubmVyU2l6ZSB8fCAoZXhwb3J0cy5TcGlubmVyU2l6ZSA9IHt9KSk7XG52YXIgU3Bpbm5lclNpemUgPSBleHBvcnRzLlNwaW5uZXJTaXplO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJTaXplRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZSgnLi90YWJsZVJvd1NlbGVjdE1vZGVFbnVtJyk7XG52YXIgdGFibGVUeXBlRW51bV8xID0gcmVxdWlyZSgnLi90YWJsZVR5cGVFbnVtJyk7XG52YXIgVGFibGVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5vcmRlckJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gW107XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcIm9yZGVyQnlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckJ5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckFzY1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm9yZGVyQXNjO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcmRlckFzYykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSBvcmRlckFzYztcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwicm93U2VsZWN0TW9kZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnJvd1NlbGVjdE1vZGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHJvd1NlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVtyb3dTZWxlY3RNb2RlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgcm93U2VsZWN0TW9kZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtcm93LXNlbGVjdC1tb2RlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIG5vbmV8c2luZ2xlfG11bHRpcGxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucm93U2VsZWN0TW9kZSA9IHJvd1NlbGVjdE1vZGU7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInJvd3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5yb3dzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb3dzKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gcm93cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm93c1tpXS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2godGhpcy5yb3dzW2ldLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRhYmxlIG5nLWNsYXNzPVwiW1xcJ21zLVRhYmxlXFwnLCB0YWJsZVR5cGVDbGFzc11cIiBuZy10cmFuc2NsdWRlPjwvdGFibGU+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd0YWJsZSc7XG4gICAgfVxuICAgIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZSb3dTZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmUm93U2VsZWN0TW9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlJvd1NlbGVjdE1vZGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZSb3dTZWxlY3RNb2RlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi1yb3ctc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gYXR0cnMudWlmUm93U2VsZWN0TW9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUucm93U2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW2F0dHJzLnVpZlRhYmxlVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlRhYmxlVHlwZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdGFibGUtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBmaXhlZHxmbHVpZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IGF0dHJzLnVpZlRhYmxlVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW3RhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtLmZsdWlkXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bVt0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bS5maXhlZF0pIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZUNsYXNzID0gJ21zLVRhYmxlLS1maXhlZCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlRGlyZWN0aXZlID0gVGFibGVEaXJlY3RpdmU7XG52YXIgVGFibGVSb3dDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVSb3dDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXRlbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZVJvd0NvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZVJvd0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVSb3dDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZVJvd0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRyIG5nLXRyYW5zY2x1ZGU+PC90cj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9dWlmSXRlbSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVSb3dDb250cm9sbGVyO1xuICAgIH1cbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgdGFibGUpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRTdHJpbmcgPSBhdHRycy51aWZTZWxlY3RlZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nICE9PSAndHJ1ZScgJiYgc2VsZWN0ZWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICB0YWJsZS4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFibGUucm93cy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5yb3dDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSAhc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIHRhYmxlUm93U2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5zaW5nbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXSAhPT0gdGFibGVSb3dTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlICE9PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSAmJlxuICAgICAgICAgICAgc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93Q2xpY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dEaXJlY3RpdmUgPSBUYWJsZVJvd0RpcmVjdGl2ZTtcbnZhciBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRkIGNsYXNzPVwibXMtVGFibGUtcm93Q2hlY2tcIj48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnXnVpZlRhYmxlJywgJz9edWlmVGFibGVIZWFkJywgJ151aWZUYWJsZVJvdyddO1xuICAgIH1cbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHRoZWFkID0gY29udHJvbGxlcnNbMV07XG4gICAgICAgIGlmICh0aGVhZCkge1xuICAgICAgICAgICAgdmFyIG5ld0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzx0aCBjbGFzcz1cIm1zLVRhYmxlLXJvd0NoZWNrXCI+PC90aD4nKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZXBsYWNlV2l0aChuZXdFbGVtKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudCA9IG5ld0VsZW07XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucm93U2VsZWN0Q2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciB0YWJsZSA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgdmFyIHJvdyA9IGNvbnRyb2xsZXJzWzJdO1xuICAgICAgICAgICAgaWYgKHRhYmxlLnJvd1NlbGVjdE1vZGUgIT09IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLm11bHRpcGxlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb3cuaXRlbSA9PT0gdW5kZWZpbmVkIHx8IHJvdy5pdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNob3VsZFNlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkU2VsZWN0QWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gc2hvdWxkU2VsZWN0QWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gc2hvdWxkU2VsZWN0QWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93U2VsZWN0Q2xpY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dTZWxlY3REaXJlY3RpdmUgPSBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZTtcbnZhciBUYWJsZUNlbGxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQ2VsbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGQgbmctdHJhbnNjbHVkZT48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQ2VsbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQ2VsbERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQ2VsbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlQ2VsbERpcmVjdGl2ZSA9IFRhYmxlQ2VsbERpcmVjdGl2ZTtcbnZhciBUYWJsZUhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRoIG5nLXRyYW5zY2x1ZGU+PC90aD4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICB9XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIHNjb3BlLmhlYWRlckNsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAodGFibGUub3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gIXRhYmxlLm9yZGVyQXNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJCeSA9IGF0dHJzLnVpZk9yZGVyQnk7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQnknLCBmdW5jdGlvbiAobmV3T3JkZXJCeSwgb2xkT3JkZXJCeSwgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKG9sZE9yZGVyQnkgIT09IG5ld09yZGVyQnkgJiZcbiAgICAgICAgICAgICAgICBuZXdPcmRlckJ5ID09PSBhdHRycy51aWZPcmRlckJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHMuZXEoaSkuY2hpbGRyZW4oKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLmVxKGkpLmNoaWxkcmVuKCkuZXEoMSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ1aWYtc29ydC1vcmRlclwiPiZuYnNwO1xcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQXNjJywgZnVuY3Rpb24gKG5ld09yZGVyQXNjLCBvbGRPcmRlckFzYywgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHZhciBvbGRDc3NDbGFzcyA9IG9sZE9yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nzc0NsYXNzID0gbmV3T3JkZXJBc2MgPyAnbXMtSWNvbi0tY2FyZXREb3duJyA6ICdtcy1JY29uLS1jYXJldFVwJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgxKS5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKG9sZENzc0NsYXNzKS5hZGRDbGFzcyhuZXdDc3NDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJ3VpZk9yZGVyQnknIGluIGF0dHJzKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaGVhZGVyQ2xpY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckRpcmVjdGl2ZSA9IFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xudmFyIFRhYmxlSGVhZENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlSGVhZENvbnRyb2xsZXIoKSB7XG4gICAgfVxuICAgIHJldHVybiBUYWJsZUhlYWRDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZUhlYWREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlSGVhZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGhlYWQgbmctdHJhbnNjbHVkZT48L3RoZWFkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlSGVhZENvbnRyb2xsZXI7XG4gICAgfVxuICAgIFRhYmxlSGVhZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlSGVhZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlSGVhZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlSGVhZERpcmVjdGl2ZSA9IFRhYmxlSGVhZERpcmVjdGl2ZTtcbnZhciBUYWJsZUJvZHlEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQm9keURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGJvZHkgbmctdHJhbnNjbHVkZT48L3Rib2R5Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQm9keURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQm9keURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQm9keURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlQm9keURpcmVjdGl2ZSA9IFRhYmxlQm9keURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZScsIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZVJvdycsIFRhYmxlUm93RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZVJvd1NlbGVjdCcsIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUNlbGwnLCBUYWJsZUNlbGxEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlSGVhZGVyJywgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlSGVhZCcsIFRhYmxlSGVhZERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVCb2R5JywgVGFibGVCb2R5RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFRhYmxlUm93U2VsZWN0TW9kZUVudW0pIHtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJzaW5nbGVcIl0gPSAxXSA9IFwic2luZ2xlXCI7XG4gICAgVGFibGVSb3dTZWxlY3RNb2RlRW51bVtUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1wibXVsdGlwbGVcIl0gPSAyXSA9IFwibXVsdGlwbGVcIjtcbn0pKGV4cG9ydHMuVGFibGVSb3dTZWxlY3RNb2RlRW51bSB8fCAoZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtID0ge30pKTtcbnZhciBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtID0gZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVJvd1NlbGVjdE1vZGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFRhYmxlVHlwZUVudW0pIHtcbiAgICBUYWJsZVR5cGVFbnVtW1RhYmxlVHlwZUVudW1bXCJmbHVpZFwiXSA9IDBdID0gXCJmbHVpZFwiO1xuICAgIFRhYmxlVHlwZUVudW1bVGFibGVUeXBlRW51bVtcImZpeGVkXCJdID0gMV0gPSBcImZpeGVkXCI7XG59KShleHBvcnRzLlRhYmxlVHlwZUVudW0gfHwgKGV4cG9ydHMuVGFibGVUeXBlRW51bSA9IHt9KSk7XG52YXIgVGFibGVUeXBlRW51bSA9IGV4cG9ydHMuVGFibGVUeXBlRW51bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgdWlmVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vdWlmVHlwZUVudW0nKTtcbnZhciBUZXh0RmllbGRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXh0RmllbGRDb250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgVGV4dEZpZWxkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIFRleHRGaWVsZENvbnRyb2xsZXI7XG59KCkpO1xudmFyIFRleHRGaWVsZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGV4dEZpZWxkRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBUZXh0RmllbGRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xhc3M9XCJ7XFwnaXMtYWN0aXZlXFwnOiBpc0FjdGl2ZSwgXFwnbXMtVGV4dEZpZWxkXFwnOiB0cnVlLCAnICtcbiAgICAgICAgICAgICdcXCdtcy1UZXh0RmllbGQtLXVuZGVybGluZWRcXCc6IHVpZlVuZGVybGluZWQsIFxcJ21zLVRleHRGaWVsZC0tcGxhY2Vob2xkZXJcXCc6IHBsYWNlaG9sZGVyLCAnICtcbiAgICAgICAgICAgICdcXCdpcy1yZXF1aXJlZFxcJzogcmVxdWlyZWQsIFxcJ2lzLWRpc2FibGVkXFwnOiBkaXNhYmxlZCwgXFwnbXMtVGV4dEZpZWxkLS1tdWx0aWxpbmVcXCcgOiB1aWZNdWx0aWxpbmUgfVwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBuZy1zaG93PVwibGFiZWxTaG93blwiIGNsYXNzPVwibXMtTGFiZWxcIiBuZy1jbGljaz1cImxhYmVsQ2xpY2soKVwiPnt7dWlmTGFiZWwgfHwgcGxhY2Vob2xkZXJ9fTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGlucHV0IG5nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWNoYW5nZT1cImlucHV0Q2hhbmdlKClcIiBuZy1ibHVyPVwiaW5wdXRCbHVyKClcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWNsaWNrPVwiaW5wdXRDbGljaygpXCIgJyArXG4gICAgICAgICAgICAnY2xhc3M9XCJtcy1UZXh0RmllbGQtZmllbGRcIiBuZy1zaG93PVwiIXVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIicgK1xuICAgICAgICAgICAgJ21pbj1cInt7bWlufX1cIiBtYXg9XCJ7e21heH19XCIgc3RlcD1cInt7c3RlcH19XCIgLz4nICtcbiAgICAgICAgICAgICc8dGV4dGFyZWEgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiICcgK1xuICAgICAgICAgICAgJ2NsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgbmctc2hvdz1cInVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIj48L3RleHRhcmVhPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtVGV4dEZpZWxkLWRlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBtYXg6ICdAJyxcbiAgICAgICAgICAgIG1pbjogJ0AnLFxuICAgICAgICAgICAgbmdDaGFuZ2U6ICc9PycsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPT8nLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHN0ZXA6ICdAJyxcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZMYWJlbDogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmVGV4dGZpZWxkJywgJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgfVxuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRleHRGaWVsZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGV4dEZpZWxkRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycykge1xuICAgICAgICB2YXIgY29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICB2YXIgbmdNb2RlbCA9IGNvbnRyb2xsZXJzWzFdO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IHRydWU7XG4gICAgICAgIHNjb3BlLnJlcXVpcmVkID0gJ3JlcXVpcmVkJyBpbiBhdHRycztcbiAgICAgICAgc2NvcGUudWlmTXVsdGlsaW5lID0gYXR0cnMudWlmTXVsdGlsaW5lID09PSAndHJ1ZSc7XG4gICAgICAgIHNjb3BlLnVpZlR5cGUgPSBhdHRycy51aWZUeXBlO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICh1aWZUeXBlRW51bV8xLklucHV0VHlwZUVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50ZXh0ZmllbGQgLSBVbnN1cHBvcnRlZCB0eXBlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC91aWZUeXBlRW51bS50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlR5cGUgPSB1aWZUeXBlRW51bV8xLklucHV0VHlwZUVudW0udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLnVpZlVuZGVybGluZWQgPSAndWlmVW5kZXJsaW5lZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLmlucHV0Rm9jdXMgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRCbHVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBpbnN0YW5jZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlciAmJiBpbnB1dC52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmdNb2RlbCkgJiYgbmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5sYWJlbENsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBzY29wZS51aWZNdWx0aWxpbmUgPyBpbnN0YW5jZUVsZW1lbnQuZmluZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgICAgICAgICA6IGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIGlucHV0WzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Q2hhbmdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmdNb2RlbCkgJiYgbmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbC4kc2V0RGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gIW5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGV4dEZpZWxkRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGV4dEZpZWxkRGlyZWN0aXZlID0gVGV4dEZpZWxkRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50ZXh0ZmllbGQnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRleHRmaWVsZCcsIFRleHRGaWVsZERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKElucHV0VHlwZUVudW0pIHtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJ0ZXh0XCJdID0gMF0gPSBcInRleHRcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJwYXNzd29yZFwiXSA9IDFdID0gXCJwYXNzd29yZFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcImVtYWlsXCJdID0gMl0gPSBcImVtYWlsXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1widXJsXCJdID0gM10gPSBcInVybFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInRlbFwiXSA9IDRdID0gXCJ0ZWxcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJyYW5nZVwiXSA9IDVdID0gXCJyYW5nZVwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcIm51bWJlclwiXSA9IDZdID0gXCJudW1iZXJcIjtcbn0pKGV4cG9ydHMuSW5wdXRUeXBlRW51bSB8fCAoZXhwb3J0cy5JbnB1dFR5cGVFbnVtID0ge30pKTtcbnZhciBJbnB1dFR5cGVFbnVtID0gZXhwb3J0cy5JbnB1dFR5cGVFbnVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdWlmVHlwZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIFRvZ2dsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVG9nZ2xlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xhc3M9XCJbXFwnbXMtVG9nZ2xlXFwnLCB0ZXh0TG9jYXRpb24sIHtcXCdpcy1kaXNhYmxlZFxcJzogZGlzYWJsZWR9XVwiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtVG9nZ2xlLWRlc2NyaXB0aW9uXCI+PG5nLXRyYW5zY2x1ZGUvPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLVRvZ2dsZS1pbnB1dFwiICcgK1xuICAgICAgICAgICAgJ25nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWNoYW5nZT1cImNoZWNrYm94Q2hhbmdlKCk7bmdDaGFuZ2UoKVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiAnICtcbiAgICAgICAgICAgICduZy1hdHRyLW5nLXRydWUtdmFsdWU9XCJ7e25nVHJ1ZVZhbHVlIHx8IHVuZGVmaW5lZH19XCIgbmctYXR0ci1uZy1mYWxzZS12YWx1ZT1cInt7bmdGYWxzZVZhbHVlIHx8IHVuZGVmaW5lZH19XCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtZmllbGRcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vZmZcIj57e3VpZkxhYmVsT2ZmfX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1MYWJlbCBtcy1MYWJlbC0tb25cIj57e3VpZkxhYmVsT259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnP25nTW9kZWwnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nQ2hhbmdlOiAnJj8nLFxuICAgICAgICAgICAgbmdGYWxzZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgbmdNb2RlbDogJz0/JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgdWlmTGFiZWxPZmY6ICdAJyxcbiAgICAgICAgICAgIHVpZkxhYmVsT246ICdAJyxcbiAgICAgICAgICAgIHVpZlRleHRMb2NhdGlvbjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRvZ2dsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVG9nZ2xlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIG5nTW9kZWxDdHJsO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoY3RybHMpICYmIGN0cmxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG5nTW9kZWxDdHJsID0gY3RybHNbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnVpZlRleHRMb2NhdGlvbikge1xuICAgICAgICAgICAgdmFyIGxvYyA9IHNjb3BlLnVpZlRleHRMb2NhdGlvbjtcbiAgICAgICAgICAgIGxvYyA9IGxvYy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxvYy5zbGljZSgxKTtcbiAgICAgICAgICAgIHNjb3BlLnRleHRMb2NhdGlvbiA9ICcgbXMtVG9nZ2xlLS10ZXh0JyArIGxvYztcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbS5hdHRyKCdkaXNhYmxlZCcpOyB9LCAoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHNjb3BlLmRpc2FibGVkID0gdHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJzsgfSkpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLmNoZWNrYm94Q2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5nTW9kZWxDdHJsKSAmJiBuZ01vZGVsQ3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXREaXJ0eSgpO1xuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gVG9nZ2xlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVG9nZ2xlRGlyZWN0aXZlID0gVG9nZ2xlRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50b2dnbGUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRvZ2dsZScsIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90b2dnbGUvdG9nZ2xlRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBvcmdDaGFydFByZXNlbmNlRW51bV8xID0gcmVxdWlyZSgnLi9vcmdDaGFydFByZXNlbmNlRW51bScpO1xudmFyIG9yZ0NoYXJ0U3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0U3R5bGVFbnVtJyk7XG52YXIgb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZSgnLi9vcmdDaGFydFNlbGVjdE1vZGVFbnVtJyk7XG52YXIgT3JnQ2hhcnRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydENvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RNb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBbXTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9yZ0NoYXJ0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPcmdDaGFydENvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkSXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT3JnQ2hhcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIE9yZ0NoYXJ0Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgT3JnQ2hhcnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1PcmdDaGFydFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE9yZ0NoYXJ0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6ICc9P3VpZlNlbGVjdGVkSXRlbXMnXG4gICAgICAgIH07XG4gICAgfVxuICAgIE9yZ0NoYXJ0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgICAgICBpZiAoYXR0cnMudWlmU2VsZWN0TW9kZSkge1xuICAgICAgICAgICAgc3dpdGNoIChvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVthdHRycy51aWZTZWxlY3RNb2RlXSkge1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlOlxuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGU6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0TW9kZSA9IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlNlbGVjdE1vZGVdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgc2VsZWN0LW1vZGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBzZWxlY3QtbW9kZSAoXFwnJyArIGF0dHJzLnVpZlNlbGVjdE1vZGUgKyAnXFwpIGlzIG5vdCBzdXBwZXJ0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZTogc2luZ2xlLCBtdWx0aXBsZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnREaXJlY3RpdmUgPSBPcmdDaGFydERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEdyb3VwRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1PcmdDaGFydC1ncm91cFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEdyb3VwRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUgPSBPcmdDaGFydEdyb3VwRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1PcmdDaGFydC1ncm91cFRpdGxlXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlID0gT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx1bCBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWxpc3RcIiBuZy10cmFuc2NsdWRlID48L3VsPic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0TGlzdERpcmVjdGl2ZSA9IE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxpIGNsYXNzPVwibXMtT3JnQ2hhcnQtbGlzdEl0ZW1cIj48ZGl2IGNsYXNzPVwibXMtUGVyc29uYVwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2PjwvbGk+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZPcmdDaGFydCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpdGVtOiAnPT91aWZJdGVtJyxcbiAgICAgICAgICAgIHByZXNlbmNlOiAnPT91aWZQcmVzZW5jZScsXG4gICAgICAgICAgICBzZWxlY3RlZDogJz0/dWlmU2VsZWN0ZWQnXG4gICAgICAgIH07XG4gICAgfVxuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAoZWxlbSwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmIChzY29wZS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5wcmVzZW5jZSkge1xuICAgICAgICAgICAgc3dpdGNoIChvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtW3Njb3BlLnByZXNlbmNlXSkge1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5hdmFpbGFibGU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYXZhaWxhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5idXN5OlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWJ1c3knKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmF3YXk6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYXdheScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYmxvY2tlZDpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1ibG9ja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5kbmQ6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tZG5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5vZmZsaW5lOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLW9mZmxpbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVSUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vcmdjaGFydCAtIFVuc3VwcG9ydGVkIHByZXNlbmNlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgcHJlc2VuY2UgKFxcJycgKyBzY29wZS5wcmVzZW5jZSArICdcXCcpIGlzIG5vdCBzdXBwZXJ0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZTogYXZhaWxhYmxlLCBidXN5LCBhd2F5LCBibG9ja2VkLCBkbmQsIG9mZmxpbmUuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZTdHlsZSkge1xuICAgICAgICAgICAgc3dpdGNoIChvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkge1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTdHlsZUVudW1fMS5PcmdDaGFydFN0eWxlRW51bS5zcXVhcmU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTdHlsZUVudW1fMS5PcmdDaGFydFN0eWxlRW51bS5zdGFuZGFyZDogYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVSUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vcmdjaGFydCAtIFVuc3VwcG9ydGVkIHN0eWxlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgc3R5bGUgKFxcJycgKyBhdHRycy51aWZTdHlsZSArICdcXCkgaXMgbm90IHN1cHBlcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBzdGFuZGFyZChkZWZhdWx0KSwgc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1zZWxlY3RhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgIGN0cmwuaXRlbXMucHVzaChzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlIHx8IGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0cmwuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLml0ZW1zW2ldICE9PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucGVyc29uYUNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9ICFzY29wZS5zZWxlY3RlZDtcbiAgICAgICAgICAgIGlmIChzY29wZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdHJsLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXRlbXNbaV0gIT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnB1c2goc2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnB1c2goc2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBjdHJsLnNlbGVjdGVkSXRlbXMuaW5kZXhPZihzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICgoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUgfHwgY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZSkgJiYgc2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLm9uKCdjbGljaycsIHNjb3BlLnBlcnNvbmFDbGljayk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUgPSBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlcnNvbmEtaW1hZ2VBcmVhXFxcIj5cXG4gICAgICA8aSBjbGFzcz1cXFwibXMtUGVyc29uYS1wbGFjZWhvbGRlciBtcy1JY29uIG1zLUljb24tLXBlcnNvblxcXCI+PC9pPlxcbiAgICAgIDxpbWcgY2xhc3M9XFxcIm1zLVBlcnNvbmEtaW1hZ2VcXFwiIG5nLXNyYz1cXFwie3tuZ1NyY319XFxcIiAvPlxcbiAgICA8L2Rpdj5cXG4gICAgXCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ1NyYzogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEltYWdlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUgPSBPcmdDaGFydEltYWdlRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIiA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGlmICghc2NvcGUuJHBhcmVudC5wcmVzZW5jZSkge1xuICAgICAgICAgICAgZWxlbS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUgPSBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWRldGFpbHNcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydERldGFpbHNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydERldGFpbHNEaXJlY3RpdmUgPSBPcmdDaGFydERldGFpbHNEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmltYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUgPSBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXNlY29uZGFyeVRleHRcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUgPSBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwQnlGaWx0ZXIoKSB7XG4gICAgfVxuICAgIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlci5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGtleSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY29sbGVjdGlvbltpXVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcjtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0R3JvdXBCeUZpbHRlciA9IE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcjtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0JywgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0R3JvdXAnLCBPcmdDaGFydEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEdyb3VwVGl0bGUnLCBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0TGlzdCcsIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQZXJzb25hJywgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEltYWdlJywgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmVzZW5jZScsIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0RGV0YWlscycsIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmltYXJ5VGV4dCcsIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dCcsIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmZpbHRlcigndWlmT3JnQ2hhcnRHcm91cEJ5JywgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydERpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChPcmdDaGFydFByZXNlbmNlRW51bSkge1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYXZhaWxhYmxlXCJdID0gMF0gPSBcImF2YWlsYWJsZVwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYnVzeVwiXSA9IDFdID0gXCJidXN5XCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJhd2F5XCJdID0gMl0gPSBcImF3YXlcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImJsb2NrZWRcIl0gPSAzXSA9IFwiYmxvY2tlZFwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiZG5kXCJdID0gNF0gPSBcImRuZFwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wib2ZmbGluZVwiXSA9IDVdID0gXCJvZmZsaW5lXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtIHx8IChleHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtID0ge30pKTtcbnZhciBPcmdDaGFydFByZXNlbmNlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZUVudW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0UHJlc2VuY2VFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKE9yZ0NoYXJ0U3R5bGVFbnVtKSB7XG4gICAgT3JnQ2hhcnRTdHlsZUVudW1bT3JnQ2hhcnRTdHlsZUVudW1bXCJzdGFuZGFyZFwiXSA9IDBdID0gXCJzdGFuZGFyZFwiO1xuICAgIE9yZ0NoYXJ0U3R5bGVFbnVtW09yZ0NoYXJ0U3R5bGVFbnVtW1wic3F1YXJlXCJdID0gMV0gPSBcInNxdWFyZVwiO1xufSkoZXhwb3J0cy5PcmdDaGFydFN0eWxlRW51bSB8fCAoZXhwb3J0cy5PcmdDaGFydFN0eWxlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRTdHlsZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFN0eWxlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChPcmdDaGFydFNlbGVjdE1vZGVFbnVtKSB7XG4gICAgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtPcmdDaGFydFNlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMF0gPSBcInNpbmdsZVwiO1xuICAgIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMV0gPSBcIm11bHRpcGxlXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW0nKTtcbnZhciBzaXplRW51bV8xID0gcmVxdWlyZSgnLi4vcGVyc29uYS9zaXplRW51bScpO1xudmFyIGljb25FbnVtXzEgPSByZXF1aXJlKCcuLi9pY29uL2ljb25FbnVtJyk7XG52YXIgcGVvcGxlU2VhcmNoRXZlbnROYW1lID0gJ3VpZi1wZW9wbGUtc2VhcmNoJztcbnZhciBHcm91cGVkUGVvcGxlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3JvdXBlZFBlb3BsZURhdGEoKSB7XG4gICAgICAgIHRoaXMucGVvcGxlID0gW107XG4gICAgfVxuICAgIHJldHVybiBHcm91cGVkUGVvcGxlRGF0YTtcbn0oKSk7XG5leHBvcnRzLkdyb3VwZWRQZW9wbGVEYXRhID0gR3JvdXBlZFBlb3BsZURhdGE7XG52YXIgUGVvcGxlUGlja2VyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlUGlja2VyQ29udHJvbGxlcigkc2NvcGUsICRmaWx0ZXIsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRmaWx0ZXIgPSAkZmlsdGVyO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmdldFNlbGVjdGVkUGVyc29ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkUGVyc29ucztcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnBpY2tlclR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy4kc2NvcGUudHlwZTtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUudHlwZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnNlYXJjaFF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYmluZFBlb3BsZSh0aGlzLiRzY29wZS5zZWFyY2hRdWVyeSk7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QocGVvcGxlU2VhcmNoRXZlbnROYW1lLCB0aGlzLnNlYXJjaFF1ZXJ5KCkpO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuYmluZFBlb3BsZSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IHRoaXMuJHNjb3BlLnBlb3BsZUNhbGxiYWNrKCkocXVlcnkpO1xuICAgICAgICBwZW9wbGVEYXRhID0gcGVvcGxlRGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKHBlb3BsZURhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuZ3JvdXBzID0gdGhpcy5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlKHBlb3BsZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwZW9wbGVEYXRhLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hNb3JlQ3RybF8xID0gYW5ndWxhci5lbGVtZW50KHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpXG4gICAgICAgICAgICAgICAgLmNvbnRyb2xsZXIoXCJcIiArIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoTW9yZUN0cmxfMSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGhhdF8xID0gdGhpcztcbiAgICAgICAgICAgIHBlb3BsZURhdGFcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoYXRfMS4kc2NvcGUuZ3JvdXBzID0gX3RoaXMuY3JlYXRlUGVvcGxlRGF0YVN0cnVjdHVyZShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hNb3JlQ3RybF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlID0gZnVuY3Rpb24gKHBlb3BsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IFtdO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gocGVvcGxlLCBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdHcm91cHMgPSBfdGhpcy4kZmlsdGVyKCdmaWx0ZXInKShwZW9wbGVEYXRhLCB7IGdyb3VwOiBwZXJzb24uZ3JvdXAgfSk7XG4gICAgICAgICAgICB2YXIgaGFzR3JvdXAgPSBleGlzdGluZ0dyb3Vwcy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICBpZiAoIWhhc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Blb3BsZURhdGEgPSBuZXcgR3JvdXBlZFBlb3BsZURhdGEoKTtcbiAgICAgICAgICAgICAgICBuZXdQZW9wbGVEYXRhLmdyb3VwID0gcGVyc29uLmdyb3VwO1xuICAgICAgICAgICAgICAgIG5ld1Blb3BsZURhdGEucGVvcGxlLnB1c2gocGVyc29uKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVEYXRhLnB1c2gobmV3UGVvcGxlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdEYXRhID0gZXhpc3RpbmdHcm91cHNbMF07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEYXRhLnBlb3BsZS5wdXNoKHBlcnNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGVvcGxlRGF0YTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRmaWx0ZXInLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlckNvbnRyb2xsZXIgPSBQZW9wbGVQaWNrZXJDb250cm9sbGVyO1xudmFyIFBlb3BsZVBpY2tlclR5cGVzO1xuKGZ1bmN0aW9uIChQZW9wbGVQaWNrZXJUeXBlcykge1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZ3JvdXBlZFwiXSA9IDBdID0gXCJncm91cGVkXCI7XG4gICAgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbXCJjb21wYWN0XCJdID0gMV0gPSBcImNvbXBhY3RcIjtcbiAgICBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1tcIm1lbWJlckxpc3RcIl0gPSAyXSA9IFwibWVtYmVyTGlzdFwiO1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZmFjZVBpbGVcIl0gPSAzXSA9IFwiZmFjZVBpbGVcIjtcbn0pKFBlb3BsZVBpY2tlclR5cGVzIHx8IChQZW9wbGVQaWNrZXJUeXBlcyA9IHt9KSk7XG52YXIgUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ25nTW9kZWwnLCAoXCJcIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKV07XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlb3BsZVBpY2tlckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBkZWxheTogJ0B1aWZTZWFyY2hEZWxheScsXG4gICAgICAgICAgICBmYWNlUGlsZUhlYWRlcjogJ0A/dWlmRmFjZXBpbGVIZWFkZXInLFxuICAgICAgICAgICAgbmdEaXNhYmxlZDogJz0/JyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG9uU2VsZWN0ZWRQZXJzb25DbGljazogJyY/dWlmU2VsZWN0ZWRQZXJzb25DbGljaycsXG4gICAgICAgICAgICBwZW9wbGVDYWxsYmFjazogJyZ1aWZQZW9wbGUnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAPycsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChQZW9wbGVQaWNrZXJUeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVvcGxlcGlja2VyIC0gdW5zdXBwb3J0ZWQgcGVvcGxlIHBpY2tlciB0eXBlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAndGhlIHR5cGUgXFwnJyArIHR5cGUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbmctT2ZmaWNlIFVJIEZhYnJpYyBhcyB2YWxpZCB0eXBlIGZvciBwZW9wbGUgcGlja2VyLicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBQZW9wbGVQaWNrZXJUeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzJyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ1tuZ09mZmljZVVpRmFicmljXSAtIEVycm9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHMsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICB2YXIgbmdNb2RlbEN0cmwgPSBjdHJsc1swXTtcbiAgICAgICAgICAgIHZhciBwZW9wbGVQaWNrZXJDdHJsID0gY3RybHNbMV07XG4gICAgICAgICAgICBfdGhpcy5pbml0RGlzYWJsZWRTdGF0ZSgkZWxlbWVudCwgJHNjb3BlLCAkYXR0cnMpO1xuICAgICAgICAgICAgJHNjb3BlLmZhY2VQaWxlSGVhZGVyID0gJHNjb3BlLmZhY2VQaWxlSGVhZGVyIHx8ICdTdWdnZXN0ZWQgY29udGFjdHMnO1xuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oJ3NlbGVjdGVkUGVyc29ucycsIGZ1bmN0aW9uIChkYXRhLCBkYXRhMiwgZGF0YTMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNpemVTZWFyY2hGaWVsZCgkZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IG5nTW9kZWxDdHJsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLnJlc2l6ZVNlYXJjaEZpZWxkKCRlbGVtZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgdmFyIHNlYXJjaFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoS2V5VXAgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWFyY2hNb3JlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZScpKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlYXJjaE1vcmUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWFyY2hRdWVyeSA/ICRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWFyY2hpbmcnKSA6ICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWFyY2hpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlYXJjaFF1ZXJ5ID8gJHNlYXJjaE1vcmUuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpIDogJHNlYXJjaE1vcmUucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hbmltYXRlU2VsZWN0ZWRQZW9wbGUoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5kZWxheSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQuY2FuY2VsKHNlYXJjaFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH0sICRzY29wZS5kZWxheSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLm9uUGVvcGxlUGlja2VyQWN0aXZlID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNtb290aFNjcm9sbFRvKCRlbGVtZW50WzBdKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnR5cGUgIT09IFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHJlc3VsdHMgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzJykpO1xuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0c1swXS5zdHlsZS53aWR0aCA9ICRlbGVtZW50WzBdLmNsaWVudFdpZHRoIC0gMiArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRzY29wZS50eXBlID09PSBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVNlbGVjdGVkUGVvcGxlKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUuYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZSA9IGZ1bmN0aW9uIChwZXJzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5pbmRleE9mKHBlcnNvbikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5wdXNoKHBlcnNvbik7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSgkc2NvcGUuc2VsZWN0ZWRQZXJzb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUucmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlID0gZnVuY3Rpb24gKHBlcnNvbiwgJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZHggPSAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zLmluZGV4T2YocGVyc29uKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zLnNwbGljZShpbmR4LCAxKTtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKCRzY29wZS5zZWxlY3RlZFBlcnNvbnMpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUucmVtb3ZlUGVyc29uRnJvbVNlYXJjaFJlc3VsdHMgPSBmdW5jdGlvbiAocGVvcGxlLCBwZXJzb24sICRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5keCA9IHBlb3BsZS5pbmRleE9mKHBlcnNvbik7XG4gICAgICAgICAgICAgICAgcGVvcGxlLnNwbGljZShpbmR4LCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCRzY29wZS50eXBlID09PSBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0pIHtcbiAgICAgICAgICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zZXJ0RmFjZVBpbGVIZWFkZXIoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnNlcnRGYWNlUGlsZVNlYXJjaE1vcmUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF0gPVxuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlcnNvbmFcXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVyc29ucyB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtcHJlc2VuY2U9XFxcInt7cGVyc29uLnByZXNlbmNlfX1cXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1pbWFnZS11cmw9XFxcInt7cGVyc29uLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0Pnt7cGVyc29uLnByaW1hcnlUZXh0fX08L3VpZi1wZXJzb25hLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZShwZXJzb24sICRldmVudClcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcGVyc29uYVJlbW92ZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3Vwc1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwXFxcIiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRHcm91cFRpdGxlXFxcIj57e2dyb3VwRGF0YS5ncm91cC5uYW1lfX08L2Rpdj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdFxcbiAgICAgICAgICAgICAgbmctbW9kZWw9XFxcImdyb3VwRGF0YS5wZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJhZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXBlcnNvbi1jbG9zZS1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlYXJjaFJlc3VsdHNcXFwiXFxuICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLm1lZGl1bV0gKyBcIlxcXCI+PC91aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmNvbXBhY3RdID1cbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyIG1zLVBlb3BsZVBpY2tlci0tY29tcGFjdFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoQm94XFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcGVyc29uYVxcXCIgbmctcmVwZWF0PVxcXCJwZXJzb24gaW4gc2VsZWN0ZWRQZXJzb25zIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEgbmctY2xpY2s9XFxcIm9uU2VsZWN0ZWRQZXJzb25DbGljaygpKHBlcnNvbilcXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmVdICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGxdICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3twZXJzb24uY29sb3J9fVxcXCI+e3twZXJzb24uaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgPC91aWYtcGVyc29uYT5cXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlKHBlcnNvbiwgJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hUmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwVGl0bGVcXFwiPnt7Z3JvdXBEYXRhLmdyb3VwLm5hbWV9fTwvZGl2PlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1waWNrZXItdHlwZT1cXFwiXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5tZW1iZXJMaXN0XSA9IFwiXFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyIG1zLVBlb3BsZVBpY2tlci0tbWVtYmVyc0xpc3RcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7e3BsYWNlaG9sZGVyfX1cXFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcInNlYXJjaFF1ZXJ5XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0ucm91bmRdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUubWVkaXVtXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkIG5nLW1vZGVsPVxcXCJzZWxlY3RlZFBlcnNvbnNcXFwiXFxuICAgICAgICB1aWYtc2VsZWN0ZWQtcGVyc29uLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2U9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQ+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0gPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLUZhY2VwaWxlXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlb3BsZUxpc3RIZWFkZXJcXFwiPlxcbiAgICAgICAgICAgICAgPHNwYW4+e3tmYWNlUGlsZUhlYWRlcn19PC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3RcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJhZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlXFxcIlxcbiAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5yb3VuZF0gKyBcIlxcXCJcXG4gICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUuc21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtc2VhcmNoLW1vcmVcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQgbmctbW9kZWw9XFxcInNlbGVjdGVkUGVyc29uc1xcXCJcXG4gICAgICAgIHVpZi1zZWxlY3RlZC1wZXJzb24tY2xpY2s9XFxcIm9uU2VsZWN0ZWRQZXJzb25DbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbG9zZT1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWlmLXBlb3BsZS1oZWFkZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgPC91aWYtcGVvcGxlLXBpY2tlci1zZWxlY3RlZD5cXG5cXG4gICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdyk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckZG9jdW1lbnQnLCAnJHRpbWVvdXQnLCAnJGxvZycsICckd2luZG93J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmluaXREaXNhYmxlZFN0YXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkc2NvcGUsICRhdHRycykge1xuICAgICAgICB2YXIgJHNlYXJjaEZpZWxkID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgICRhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzZWFyY2hGaWVsZC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNlYXJjaEZpZWxkLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5hbmltYXRlU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRzZWxlY3RlZFBlb3BsZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlJykpO1xuICAgICAgICAkc2VsZWN0ZWRQZW9wbGUuYWRkQ2xhc3MoJ21zLXUtc2xpZGVEb3duSW4yMCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgJHNlbGVjdGVkUGVvcGxlLnJlbW92ZUNsYXNzKCdtcy11LXNsaWRlRG93bkluMjAnKTsgfSwgMTAwMCk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmN1cnJlbnRZUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQodGhpcy4kZG9jdW1lbnRbMF0pLmZpbmQoJ2JvZHknKVswXTtcbiAgICAgICAgaWYgKGJvZHkuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmVsbVlQb3NpdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciB5ID0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgIHZhciBub2RlID0gZWxlbWVudDtcbiAgICAgICAgd2hpbGUgKG5vZGUub2Zmc2V0UGFyZW50ICYmIG5vZGUub2Zmc2V0UGFyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBub2RlID0gKG5vZGUub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICAgIHkgKz0gbm9kZS5vZmZzZXRUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnNtb290aFNjcm9sbFRvID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHN0YXJ0WSA9IHRoaXMuY3VycmVudFlQb3NpdGlvbigpO1xuICAgICAgICB2YXIgc3RvcFkgPSB0aGlzLmVsbVlQb3NpdGlvbihlbGVtZW50KTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gc3RvcFkgPiBzdGFydFkgPyBzdG9wWSAtIHN0YXJ0WSA6IHN0YXJ0WSAtIHN0b3BZO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCAxMDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdG9wWSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNwZWVkID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDMwKTtcbiAgICAgICAgaWYgKHNwZWVkID49IDIwKSB7XG4gICAgICAgICAgICBzcGVlZCA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGVwID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDI1KTtcbiAgICAgICAgdmFyIGxlYXBZID0gc3RvcFkgPiBzdGFydFkgPyBzdGFydFkgKyBzdGVwIDogc3RhcnRZIC0gc3RlcDtcbiAgICAgICAgdmFyIHRpbWVyID0gMDtcbiAgICAgICAgaWYgKHN0b3BZID4gc3RhcnRZKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRZOyBpIDwgc3RvcFk7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiAobFksIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbFkpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0ICogc3BlZWQpO1xuICAgICAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICAgICAgbGVhcFkgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAobGVhcFkgPiBzdG9wWSkge1xuICAgICAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydFk7IGkgPiBzdG9wWTsgaSAtPSBzdGVwKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKGxZLCB0KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBsWSk7XG4gICAgICAgICAgICAgICAgfSwgdCAqIHNwZWVkKTtcbiAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICBsZWFwWSAtPSBzdGVwO1xuICAgICAgICAgICAgaWYgKGxlYXBZIDwgc3RvcFkpIHtcbiAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXIrKztcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZUhlYWRlciA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXBlb3BsZS1oZWFkZXInKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRDb3VudCcpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZVNlYXJjaE1vcmUgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1zZWFyY2gtbW9yZScpKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ21zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnJlc2l6ZVNlYXJjaEZpZWxkID0gZnVuY3Rpb24gKCRwZW9wbGVQaWNrZXIpIHtcbiAgICAgICAgdmFyICRzZWFyY2hCb3ggPSBhbmd1bGFyLmVsZW1lbnQoJHBlb3BsZVBpY2tlclswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveCcpKTtcbiAgICAgICAgdmFyICRzZWFyY2hGaWVsZCA9IGFuZ3VsYXIuZWxlbWVudCgkcGVvcGxlUGlja2VyWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgIHZhciBzZWFyY2hCb3hMZWZ0RWRnZSA9ICRzZWFyY2hCb3gucHJvcCgnb2Zmc2V0TGVmdCcpO1xuICAgICAgICB2YXIgc2VhcmNoQm94V2lkdGggPSAkc2VhcmNoQm94WzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgc2VhcmNoQm94UmlnaHRFZGdlID0gc2VhcmNoQm94TGVmdEVkZ2UgKyBzZWFyY2hCb3hXaWR0aDtcbiAgICAgICAgdmFyICRwZXJzb25hTm9kZXMgPSAkc2VhcmNoQm94WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1QZW9wbGVQaWNrZXItcGVyc29uYScpO1xuICAgICAgICBpZiAoJHBlcnNvbmFOb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRzZWFyY2hGaWVsZFswXS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGxhc3RQZXJzb25hID0gYW5ndWxhci5lbGVtZW50KCRwZXJzb25hTm9kZXNbJHBlcnNvbmFOb2Rlcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYUxlZnRFZGdlID0gJGxhc3RQZXJzb25hLnByb3AoJ29mZnNldExlZnQnKTtcbiAgICAgICAgdmFyIGxhc3RQZXJzb25hV2lkdGggPSAkbGFzdFBlcnNvbmFbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYVJpZ2h0RWRnZSA9IGxhc3RQZXJzb25hTGVmdEVkZ2UgKyBsYXN0UGVyc29uYVdpZHRoO1xuICAgICAgICB2YXIgbmV3RmllbGRXaWR0aCA9IHNlYXJjaEJveFJpZ2h0RWRnZSAtIGxhc3RQZXJzb25hUmlnaHRFZGdlIC0gNTtcbiAgICAgICAgaWYgKG5ld0ZpZWxkV2lkdGggPCAxMDApIHtcbiAgICAgICAgICAgIG5ld0ZpZWxkV2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSBuZXdGaWVsZFdpZHRoICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyJztcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gUGVvcGxlUGlja2VyRGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPHVsIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0TGlzdFxcXCI+XFxuICAgIDxsaSBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdFxcXCIgbmctcmVwZWF0PVxcXCJwZXJzb24gaW4gcGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QnRuXFxcIlxcbiAgICAgIG5nLWNsYXNzPVxcXCJ7J21zLVBlb3BsZVBpY2tlci1yZXN1bHRCdG4tLWNvbXBhY3QnOiBwaWNrZXJUeXBlID09PSAnY29tcGFjdCd9XFxcIiBuZy1jbGljaz1cXFwib25QZXJzb25DbGljaygpKHBlcnNvbilcXFwiPlxcbiAgICAgICAgPHVpZi1wZXJzb25hXFxuICAgICAgICAgIHVpZi1zdHlsZT1cXFwie3twZXJzb25TdHlsZX19XFxcIlxcbiAgICAgICAgICB1aWYtc2l6ZT1cXFwie3twZXJzb25TaXplfX1cXFwiXFxuICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3twZXJzb24uY29sb3J9fVxcXCI+e3twZXJzb24uaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgbmctaWY9XFxcIiFwZXJzb24uYWRkaXRpb25hbERhdGEgJiYgb25QZXJzb25DbG9zZUNsaWNrKClcXFwiXFxuICAgICAgICAgIG5nLWNsaWNrPVxcXCJvblBlcnNvbkNsb3NlQ2xpY2soKShwZW9wbGUsIHBlcnNvbiwgJGV2ZW50KVxcXCJcXG4gICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBY3Rpb24ganMtcmVzdWx0UmVtb3ZlXFxcIj5cXG4gICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgbmctaWY9XFxcInBlcnNvbi5hZGRpdGlvbmFsRGF0YVxcXCJcXG4gICAgICAgICAgbmctY2xpY2s9XFxcImV4cGFuZEFkZGl0aW9uYWxEYXRhKCRldmVudClcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWN0aW9uIGpzLXJlc3VsdFJlbW92ZVxcXCI+XFxuICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uY2hldnJvbnNEb3duXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBuZy1pZj1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEFkZGl0aW9uYWxDb250ZW50XFxcIj5cXG4gICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdFxcbiAgICAgICAgbmctbW9kZWw9XFxcInBlcnNvbi5hZGRpdGlvbmFsRGF0YVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcIm9uUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcIm9uUGVyc29uQ2xvc2VDbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBpY2tlci10eXBlPVxcXCJ7e3BpY2tlclR5cGV9fVxcXCJcXG4gICAgICAgIHVpZi1zdHlsZT1cXFwie3twZXJzb25TdHlsZX19XFxcIlxcbiAgICAgICAgdWlmLXNpemU9XFxcInt7cGVyc29uU2l6ZX19XFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2xpPlxcbiAgPC91bD5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG9uUGVyc29uQ2xpY2s6ICcmdWlmUGVyc29uQ2xpY2snLFxuICAgICAgICAgICAgb25QZXJzb25DbG9zZUNsaWNrOiAnJnVpZlBlcnNvbkNsb3NlQ2xpY2snLFxuICAgICAgICAgICAgcGVvcGxlOiAnPW5nTW9kZWwnLFxuICAgICAgICAgICAgcGVyc29uU2l6ZTogJ0B1aWZTaXplJyxcbiAgICAgICAgICAgIHBlcnNvblN0eWxlOiAnQHVpZlN0eWxlJyxcbiAgICAgICAgICAgIHBpY2tlclR5cGU6ICdAdWlmUGlja2VyVHlwZSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGVvcGxlUGlja2VyQ3RybCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5leHBhbmRBZGRpdGlvbmFsRGF0YSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyICRidXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoJGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkcGFyZW50ID0gJGJ1dHRvbi5wYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ21zLVBlb3BsZVBpY2tlci1yZXN1bHQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC50b2dnbGVDbGFzcygnaXMtZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRidXR0b24gPSAkcGFyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyUmVzdWx0TGlzdCc7XG4gICAgcmV0dXJuIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlID0gUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZTtcbnZhciBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLnNlYXJjaENhbGxiYWNrcyA9IFtdO1xuICAgIH1cbiAgICBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlci5wcm90b3R5cGUuaXNTZWFyY2hpbmcgPSBmdW5jdGlvbiAoc2VhcmNoaW5nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLnByb2Nlc3NpbmcgPSBzZWFyY2hpbmc7XG4gICAgICAgIHNlYXJjaGluZyA/IHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLXNlYXJjaGluZycpIDogdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VhcmNoaW5nJyk7XG4gICAgfTtcbiAgICBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5QZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlciA9IFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyO1xudmFyIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXl5cIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZSBqcy1zZWFyY2hNb3JlXFxcIlxcbiAgICBuZy1jbGFzcz1cXFwieydtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZS0tZGlzY29ubmVjdGVkJzogZGlzY29ubmVjdGVkfVxcXCI+XFxuICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1pZj1cXFwicGlja2VyVHlwZSA9PT0gJ1wiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJwaWNrZXJUeXBlID09PSAnXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInBpY2tlclR5cGUgPT09ICdcIiArIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPHVpZi1zcGlubmVyIG5nLXNob3c9XFxcInByb2Nlc3NpbmdcXFwiPjwvdWlmLXNwaW5uZXI+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGRpc2Nvbm5lY3RlZDogJz11aWZEaXNjb25uZWN0ZWQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBlb3BsZVBpY2tlckN0cmwsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUucGlja2VyVHlwZSA9IHBlb3BsZVBpY2tlckN0cmwucGlja2VyVHlwZSgpO1xuICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYnJvYWRjYXN0KHBlb3BsZVNlYXJjaEV2ZW50TmFtZSwgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2hRdWVyeSgpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlU2VhcmNoTW9yZSc7XG4gICAgcmV0dXJuIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlID0gUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZTtcbnZhciBQcmltYXJ5VGV4dENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByaW1hcnlUZXh0Q29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihwZW9wbGVTZWFyY2hFdmVudE5hbWUsIGZ1bmN0aW9uICgkZXZlbnQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICBfdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnkgPSBxdWVyeTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaW1hcnlUZXh0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbiAgICByZXR1cm4gUHJpbWFyeVRleHRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUHJpbWFyeVRleHRDb250cm9sbGVyID0gUHJpbWFyeVRleHRDb250cm9sbGVyO1xudmFyIFByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyhcIl5eXCIgKyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpLCAoXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpXTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUHJpbWFyeVRleHRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5kaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZVByaW1hcnlcXFwiPlxcbiAgICA8ZGl2IG5nLXNob3c9XFxcIiRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj57e3NlYXJjaGluZ0ZvclRleHR9fSB7e3NlYXJjaFF1ZXJ5fX08L2Rpdj5cXG4gICAgPG5nLXRyYW5zY2x1ZGUgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaGluZ0ZvclRleHQ6ICdAP3VpZlNlYXJjaEZvclRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaGluZ0ZvclRleHQgPSAkc2NvcGUuc2VhcmNoaW5nRm9yVGV4dCB8fCAnU2VhcmNoaW5nIGZvcic7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFByaW1hcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUHJpbWFyeVRleHQnO1xuICAgIHJldHVybiBQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlByaW1hcnlUZXh0RGlyZWN0aXZlID0gUHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQuZGlzY29ubmVjdGVkXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVTZWNvbmRhcnlcXFwiPlxcbiAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRydWU7XG4gICAgfVxuICAgIFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmU2Vjb25kYXJ5VGV4dCc7XG4gICAgcmV0dXJuIFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5TZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiJHBhcmVudC4kcGFyZW50LmRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlUHJpbWFyeVxcXCI+XFxuICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICB9XG4gICAgRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZEaXNjb25uZWN0ZWRUZXh0JztcbiAgICByZXR1cm4gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUgPSBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtYWN0aXZlJzogc2VsZWN0ZWRQZW9wbGUgJiYgc2VsZWN0ZWRQZW9wbGUubGVuZ3RoID4gMH1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkSGVhZGVyXFxcIj5cXG4gICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDx1bCBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGxpIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRQZXJzb25cXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnJvdW5kXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZSgpKHBlcnNvbiwgJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWN0aW9uIGpzLXJlc3VsdFJlbW92ZVxcXCI+XFxuICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLnhdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG9uU2VsZWN0ZWRQZXJzb25DbGljazogJyY/dWlmU2VsZWN0ZWRQZXJzb25DbGljaycsXG4gICAgICAgICAgICByZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGU6ICcmdWlmUGVyc29uQ2xvc2UnLFxuICAgICAgICAgICAgc2VsZWN0ZWRQZW9wbGU6ICc9bmdNb2RlbCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZQZW9wbGVQaWNrZXJTZWxlY3RlZCc7XG4gICAgcmV0dXJuIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUgPSBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZTtcbnZhciBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXl5cIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPHNwYW4gY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZENvdW50XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGVvcGxlUGlja2VyQ3RybCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMgPSBwZW9wbGVQaWNrZXJDdHJsLmdldFNlbGVjdGVkUGVyc29ucygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlNlbGVjdGVkUGVvcGxlSGVhZGVyJztcbiAgICByZXR1cm4gU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5TZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZSA9IFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZW9wbGVwaWNrZXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUHJpbWFyeVRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=