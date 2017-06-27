/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * Angular 1.x directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.11.0
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
	var iconModule = __webpack_require__(20);
	var labelModule = __webpack_require__(22);
	var linkModule = __webpack_require__(23);
	var listModule = __webpack_require__(24);
	var messageBannerModule = __webpack_require__(28);
	var messageBarModule = __webpack_require__(29);
	var navBarModule = __webpack_require__(31);
	var overlayModule = __webpack_require__(32);
	var panelModule = __webpack_require__(34);
	var personacardModule = __webpack_require__(36);
	var personaModule = __webpack_require__(41);
	var pivotModule = __webpack_require__(44);
	var progressIndicatorModule = __webpack_require__(47);
	var searchboxModule = __webpack_require__(48);
	var spinnerModule = __webpack_require__(49);
	var tableModule = __webpack_require__(51);
	var textFieldModule = __webpack_require__(54);
	var toggleModule = __webpack_require__(56);
	var orgChartModule = __webpack_require__(57);
	var peoplePickerModule = __webpack_require__(61);
	exports.module = ng.module('officeuifabric.components', [
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
	var ng = __webpack_require__(2);
	var BreadcrumbLinkDirective = (function () {
	    function BreadcrumbLinkDirective() {
	        this.restrict = 'E';
	        this.require = '^uifBreadcrumb';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '' +
	            '<li class="ms-Breadcrumb-listItem">' +
	            '<a class="ms-Breadcrumb-itemLink" ng-href="{{ngHref}}" tabindex="{{uifTabindex}}" ng-transclude></a>' +
	            '<i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight"></i>' +
	            '</li>';
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
	        var windowElement = ng.element($window);
	        $scope.visibleElements = 4;
	        $scope.overflowMenuOpen = false;
	        $scope.isOverflow = function () {
	            var overflow = false;
	            overflow = ng.isDefined($scope.uifBreadcrumbLinks) && $scope.uifBreadcrumbLinks.length > $scope.visibleElements;
	            return overflow;
	        };
	        $scope.overflowElements = function () {
	            return $scope.isOverflow() ? $scope.uifBreadcrumbLinks.length - $scope.visibleElements : 0;
	        };
	        $scope.openOverflow = function (event) {
	            event.stopPropagation();
	            $scope.overflowMenuOpen = true;
	        };
	        $document.find('html').on('click', function (event) {
	            $scope.overflowMenuOpen = false;
	            $scope.$apply();
	        });
	        windowElement.on('resize', function () {
	            var width = $window.innerWidth;
	            var elementsToShow = (width > BreadcrumbController._breakingWidth) ? 4 : 2;
	            if (elementsToShow !== $scope.visibleElements) {
	                $scope.visibleElements = elementsToShow;
	                $scope.$apply();
	            }
	        });
	    }
	    BreadcrumbController.$inject = ['$scope', '$document', '$window'];
	    BreadcrumbController._breakingWidth = 639;
	    return BreadcrumbController;
	}());
	exports.BreadcrumbController = BreadcrumbController;
	var BreadcrumbDirective = (function () {
	    function BreadcrumbDirective() {
	        this.restrict = 'E';
	        this.replace = true;
	        this.template = '' +
	            '<div class="ms-Breadcrumb" ng-class="{\'is-overflow\': isOverflow()}">' +
	            '<div class="ms-Breadcrumb-overflow">' +
	            '<div class="ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis" ng-click="openOverflow($event)" tabindex="1">' +
	            '</div>' +
	            '<i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight"></i>' +
	            '<div class="ms-Breadcrumb-overflowMenu" ng-class="{\'is-open\': overflowMenuOpen}">' +
	            '<ul class="ms-ContextualMenu is-open">' +
	            '<li class="ms-ContextualMenu-item" ' +
	            'ng-repeat="link in uifBreadcrumbLinks | limitTo:overflowElements()">' +
	            '<a class="ms-ContextualMenu-link" ng-href="{{link.href}}">{{link.linkText}}</a>' +
	            '</li>' +
	            '</ul>' +
	            '</div>' +
	            '</div>' +
	            '<ul class="ms-Breadcrumb-list">' +
	            '<uif-breadcrumb-link ng-repeat="link in uifBreadcrumbLinks | limitTo:-visibleElements" ' +
	            'ng-href="{{link.href}}">{{link.linkText}}</uif-breadcrumb-link>' +
	            '</ul>' +
	            '</div>';
	        this.controller = BreadcrumbController;
	        this.require = 'uifBreadcrumb';
	        this.scope = {
	            'uifBreadcrumbLinks': '='
	        };
	    }
	    BreadcrumbDirective.factory = function () {
	        var directive = function () { return new BreadcrumbDirective(); };
	        return directive;
	    };
	    return BreadcrumbDirective;
	}());
	exports.BreadcrumbDirective = BreadcrumbDirective;
	;
	exports.module = ng.module('officeuifabric.components.breadcrumb', ['officeuifabric.components'])
	    .directive('uifBreadcrumb', BreadcrumbDirective.factory())
	    .directive('uifBreadcrumbLink', BreadcrumbLinkDirective.factory());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var buttonTypeEnum_ts_1 = __webpack_require__(6);
	var buttonTemplateType_ts_1 = __webpack_require__(7);
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
	exports.module = ng.module('officeuifabric.components.button', [
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
	var ng = __webpack_require__(2);
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
	        if (!ng.isUndefined(mainWrapper) && mainWrapper.hasClass('ms-Callout-main')) {
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
	        if (ng.isObject(calloutController)) {
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
	            var closeButtonElement = ng.element('<button class="ms-Callout-close" type="button">' +
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
	exports.module = ng.module('officeuifabric.components.callout', ['officeuifabric.components'])
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
	var ng = __webpack_require__(2);
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
	exports.module = ng.module('officeuifabric.components.choicefield', [
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
	var ng = __webpack_require__(2);
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
	exports.module = ng.module('officeuifabric.components.commandbar', [
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
	var ng = __webpack_require__(2);
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
	exports.module = ng.module('officeuifabric.components.content', [
	    'officeuifabric.components'])
	    .directive(ContentDirective.directiveName, ContentDirective.factory());


/***/ },
/* 15 */
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
	                if (ng.isUndefined($scope.isSelected) && !$scope.isDisabled) {
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
	                if (!ng.isUndefined($scope.onClick)) {
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
	            if (ng.isUndefined(value)) {
	                $scope.closeOnClick = true;
	            }
	            else {
	                $scope.closeOnClick = value.toString().toLowerCase() === 'true';
	            }
	        };
	        setCloseOnClick($scope.closeOnClick);
	        $attrs.$observe('uifCloseOnClick', setCloseOnClick);
	        var parentMenuItemCtrl = $element.controller(ContextualMenuItemDirective.directiveName);
	        if (!ng.isUndefined(parentMenuItemCtrl)) {
	            parentMenuItemCtrl.setChildMenu(contextualMenuController);
	        }
	        if (!ng.isUndefined($scope.multiselect) && $scope.multiselect.toLowerCase() === 'true') {
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
	        if (ng.isUndefined($element.controller(ContextualMenuItemDirective.directiveName))) {
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
	        if (ng.isUndefined(this.$scope.multiselect)) {
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
	exports.module = ng.module('officeuifabric.components.contextualmenu', [
	    'officeuifabric.components'])
	    .directive(ContextualMenuDirective.directiveName, ContextualMenuDirective.factory())
	    .directive(ContextualMenuItemDirective.directiveName, ContextualMenuItemDirective.factory());


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var DatepickerController = (function () {
	    function DatepickerController($element, $scope) {
	        this.$scope = $scope;
	        this.isPickingYears = false;
	        this.isPickingMonths = false;
	        this.jElement = $($element[0]);
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
	            },
	            set: function (value) {
	                var formattedValue = picker.get('select', 'yyyy-mm-dd');
	                ngModel.$setViewValue(formattedValue);
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
	        ngModel.$render = function () {
	            if (ngModel.$modelValue !== '' && typeof ngModel.$modelValue !== 'undefined') {
	                if (typeof ngModel.$modelValue === 'string') {
	                    var date = new Date(ngModel.$modelValue);
	                    datepickerController.setValue(date);
	                }
	                else {
	                    datepickerController.setValue(ngModel.$modelValue);
	                }
	            }
	        };
	    };
	    return DatepickerDirective;
	}());
	exports.DatepickerDirective = DatepickerDirective;
	exports.module = ng.module('officeuifabric.components.datepicker', [
	    'officeuifabric.components'
	])
	    .directive('uifDatepicker', DatepickerDirective.factory());


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var dialogEnums_ts_1 = __webpack_require__(18);
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
	                if (dialogEnums_ts_1.DialogTypeEnum[newValue] === undefined) {
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
	                if (dialogEnums_ts_1.DialogActionsPositionEnum[newValue] === undefined) {
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
	exports.module = ng.module('officeuifabric.components.dialog', ['officeuifabric.components'])
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
	exports.module = ng.module('officeuifabric.components.dropdown', [
	    'officeuifabric.components'
	])
	    .directive('uifDropdownOption', DropdownOptionDirective.factory())
	    .directive('uifDropdown', DropdownDirective.factory());


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var iconEnum_1 = __webpack_require__(21);
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
	exports.module = ng.module('officeuifabric.components.icon', [
	    'officeuifabric.components'
	])
	    .directive('uifIcon', IconDirective.factory());


/***/ },
/* 21 */
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
/* 22 */
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
	}());
	exports.LabelDirective = LabelDirective;
	exports.module = ng.module('officeuifabric.components.label', ['officeuifabric.components'])
	    .directive('uifLabel', LabelDirective.factory());


/***/ },
/* 23 */
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
	}());
	exports.LinkDirective = LinkDirective;
	exports.module = ng.module('officeuifabric.components.link', [
	    'officeuifabric.components'
	])
	    .directive('uifLink', LinkDirective.factory());


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var listItemSelectModeEnum_1 = __webpack_require__(25);
	var listItemTypeEnum_1 = __webpack_require__(26);
	var listLayoutEnum_1 = __webpack_require__(27);
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
	exports.module = ng.module('officeuifabric.components.list', ['officeuifabric.components'])
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
/* 25 */
/***/ function(module, exports) {

	'use strict';
	(function (ListItemSelectModeEnum) {
	    ListItemSelectModeEnum[ListItemSelectModeEnum["none"] = 0] = "none";
	    ListItemSelectModeEnum[ListItemSelectModeEnum["single"] = 1] = "single";
	    ListItemSelectModeEnum[ListItemSelectModeEnum["multiple"] = 2] = "multiple";
	})(exports.ListItemSelectModeEnum || (exports.ListItemSelectModeEnum = {}));
	var ListItemSelectModeEnum = exports.ListItemSelectModeEnum;


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	(function (ListItemTypeEnum) {
	    ListItemTypeEnum[ListItemTypeEnum["item"] = 0] = "item";
	    ListItemTypeEnum[ListItemTypeEnum["itemWithImage"] = 1] = "itemWithImage";
	    ListItemTypeEnum[ListItemTypeEnum["itemWithIcon"] = 2] = "itemWithIcon";
	})(exports.ListItemTypeEnum || (exports.ListItemTypeEnum = {}));
	var ListItemTypeEnum = exports.ListItemTypeEnum;


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	(function (ListLayoutEnum) {
	    ListLayoutEnum[ListLayoutEnum["list"] = 0] = "list";
	    ListLayoutEnum[ListLayoutEnum["grid"] = 1] = "grid";
	})(exports.ListLayoutEnum || (exports.ListLayoutEnum = {}));
	var ListLayoutEnum = exports.ListLayoutEnum;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	        this.template = '' +
	            '<div class="ms-MessageBanner" ng-show="uifIsVisible">' +
	            '<div class="ms-MessageBanner-content">' +
	            '<div class="ms-MessageBanner-text">' +
	            '<div class="ms-MessageBanner-clipper"></div>' +
	            '</div>' +
	            '<uif-button uif-type="command" class="ms-MessageBanner-expand" ng-show="!isExpanded" style="height:52px">' +
	            '<uif-icon uif-type="chevronsDown"></uif-icon>' +
	            '</uif-button>' +
	            '<uif-button uif-type="command" class="ms-MessageBanner-expand" ng-show="isExpanded" style="height:52px">' +
	            '<uif-icon uif-type="chevronsUp"></uif-icon>' +
	            '</uif-button>' +
	            '<div class="ms-MessageBanner-action">' +
	            '<uif-button uif-type="primary" class="ms-fontColor-neutralLight" ng-click="uifAction()">{{ uifActionLabel }}</uif-button>' +
	            '</div>' +
	            '</div>' +
	            '<uif-button uif-type="command" class="ms-MessageBanner-close" ng-click="uifOnClose()" style="height:52px">' +
	            '<uif-icon uif-type="x"></uif-icon>' +
	            '</uif-button>' +
	            '</div>';
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
	            _this._initLocals($elem);
	            _this.transcludeChilds($scope, $elem, $transclude);
	            ng.element($controller.$window).bind('resize', function () {
	                _this._onResize();
	                $scope.$digest();
	            });
	            ng.element(_this._chevronButton).bind('click', function () {
	                _this._toggleExpansion($scope);
	            });
	            ng.element(_this._closeButton).bind('click', function () {
	                _this._hideBanner($scope);
	            });
	            _this._onResize();
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
	        this._messageBanner = ng.element($elem[0].querySelector('.ms-MessageBanner'));
	        this._clipper = ng.element($elem[0].querySelector('.ms-MessageBanner-clipper'));
	        this._chevronButton = ng.element($elem[0].querySelectorAll('.ms-MessageBanner-expand'));
	        this._actionButton = ng.element($elem[0].querySelector('.ms-MessageBanner-action'));
	        this._bufferSize = this._actionButton[0].offsetWidth + this._bufferElementsWidth;
	        this._closeButton = ng.element($elem[0].querySelector('.ms-MessageBanner-close'));
	    };
	    MessageBannerDirective.prototype._onResize = function () {
	        this._clientWidth = this._messageBanner[0].offsetWidth;
	        if (window.innerWidth >= this.SMALL_BREAK_POINT) {
	            this._resizeRegular();
	        }
	        else {
	            this._resizeSmall();
	        }
	    };
	    ;
	    MessageBannerDirective.prototype._resizeRegular = function () {
	        if ((this._clientWidth - this._bufferSize) > this._initTextWidth && this._initTextWidth < this._textContainerMaxWidth) {
	            this._textWidth = 'auto';
	            this._chevronButton.addClass('ms-MessageBanner-expand');
	        }
	        else {
	            this._textWidth = Math.min((this._clientWidth - this._bufferSize), this._textContainerMaxWidth) + 'px';
	            for (var i = 0; i < this._chevronButton.length; i++) {
	                var chevron = ng.element(this._chevronButton[i]);
	                if (!chevron.hasClass('is-visible') && !chevron.hasClass('ng-hide')) {
	                    chevron.addClass('is-visible');
	                }
	                else {
	                    chevron.removeClass('is-visible');
	                }
	            }
	        }
	        this._clipper[0].style.width = this._textWidth;
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
	exports.module = ng.module('officeuifabric.components.messagebanner', ['officeuifabric.components'])
	    .directive('uifMessageBanner', MessageBannerDirective.factory());


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var messageBarTypeEnum_1 = __webpack_require__(30);
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
	            uifType: '&'
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
	exports.module = ng.module('officeuifabric.components.messagebar', ['officeuifabric.components'])
	    .directive('uifMessageBar', MessageBarDirective.factory());


/***/ },
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	            if (ng.isUndefined(type)) {
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
	            if (ng.isUndefined($scope.type)) {
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
	exports.module = ng.module('officeuifabric.components.navbar', [
	    'officeuifabric.components'])
	    .directive(NavBarDirective.directiveName, NavBarDirective.factory())
	    .directive(NavBarItemDirective.directiveName, NavBarItemDirective.factory())
	    .directive(NavBarSearch.directiveName, NavBarSearch.factory());


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var overlayModeEnum_ts_1 = __webpack_require__(33);
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
	}());
	exports.OverlayDirective = OverlayDirective;
	exports.module = ng.module('officeuifabric.components.overlay', [
	    'officeuifabric.components'
	])
	    .directive('uifOverlay', OverlayDirective.factory());


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	(function (OverlayMode) {
	    OverlayMode[OverlayMode["light"] = 0] = "light";
	    OverlayMode[OverlayMode["dark"] = 1] = "dark";
	})(exports.OverlayMode || (exports.OverlayMode = {}));
	var OverlayMode = exports.OverlayMode;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var panelDirectiveEnum_1 = __webpack_require__(35);
	var PanelDirective = (function () {
	    function PanelDirective($log, $animate, $timeout) {
	        this.$log = $log;
	        this.$animate = $animate;
	        this.$timeout = $timeout;
	        this.restrict = 'E';
	        this.template = "<div class=\"ms-Panel\">\n                              <div  class=\"ms-Overlay\"\n                                    ng-click=\"closePanel()\"\n                                    ng-class=\"uifShowOverlay === true ? 'ms-Overlay--dark' : '';\"></div>\n                              <div class=\"ms-Panel-main\">\n                                <div class=\"ms-Panel-commands\">\n                                  <button ng-if=\"uifShowClose\" class='ms-Panel-closeButton' ng-click=\"closePanel()\">\n                                    <uif-icon uif-type='x'></uif-icon>\n                                  </button>\n                                </div>\n                                <div class=\"ms-Panel-contentInner\">\n                                </div>\n                              </div>\n                             </div>";
	        this.transclude = true;
	        this.replace = true;
	        this.controller = PanelController;
	        this.scope = {
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
	        $element.addClass('ms-Panel--' + $scope.uifType);
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
	exports.module = ng.module('officeuifabric.components.panel', [
	    'officeuifabric.components'
	])
	    .directive('uifPanel', PanelDirective.factory())
	    .directive('uifPanelHeader', PanelHeaderDirective.factory());


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	(function (PanelTypes) {
	    PanelTypes[PanelTypes["small"] = 0] = "small";
	    PanelTypes[PanelTypes["medium"] = 1] = "medium";
	    PanelTypes[PanelTypes["large"] = 2] = "large";
	    PanelTypes[PanelTypes["extralarge"] = 3] = "extralarge";
	    PanelTypes[PanelTypes["left"] = 4] = "left";
	})(exports.PanelTypes || (exports.PanelTypes = {}));
	var PanelTypes = exports.PanelTypes;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var sizeEnum_1 = __webpack_require__(37);
	var placeholderEnum_1 = __webpack_require__(38);
	var personaStyleEnum_1 = __webpack_require__(39);
	var personaPresenceEnum_1 = __webpack_require__(40);
	var PersonaCardDirective = (function () {
	    function PersonaCardDirective() {
	        var _this = this;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.require = ['uifPersonaCard'];
	        this.controller = PersonaCardController;
	        this.scope = {
	            'uifPresence': '@',
	            'uifSize': '@',
	            'uifImageUrl': '@'
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
	            if (ng.isDefined(attrs.uifSize) && ng.isUndefined(sizeEnum_1.PersonaSize[attrs.uifSize])) {
	                personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
	                    attrs.uifSize + '" is not a valid value for uifSize. It should be xsmall, small, medium, large, xlarge.');
	                return;
	            }
	            if (ng.isDefined(attrs.uifStyle) && ng.isUndefined(personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle])) {
	                personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
	                    attrs.uifStyle + '" is not a valid value for uifStyle. It should be round or square.');
	                return;
	            }
	            if (ng.isDefined(attrs.uifPresence) && ng.isUndefined(personaPresenceEnum_1.PresenceEnum[attrs.uifPresence])) {
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
	                var detailsWrapper = ng.element(element[0].getElementsByClassName('ms-Persona-details'));
	                var actionDetailsBoxList = ng.element(element[0].getElementsByClassName('ms-PersonaCard-actionDetailBox'))
	                    .find('ul').eq(0);
	                var actionsList = ng.element(element[0].getElementsByClassName('ms-PersonaCard-actions'));
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
	                            var wrappedAction = ng.element(clone[i]);
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
	            'primary': 'ms-Persona-primaryText',
	            'secondary': 'ms-Persona-secondaryText',
	            'tertiary': 'ms-Persona-tertiaryText',
	            'optional': 'ms-Persona-optionalText'
	        };
	        this.template = function ($element, $attrs) {
	            var directiveTemplate = '<div class="' + _this.availableClasses[_this.directiveType] + '" ng-transclude></div>';
	            return directiveTemplate;
	        };
	        if (ng.isUndefined(this.availableClasses[this.directiveType])) {
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
	            if (ng.isDefined(actionAttrs.uifPlaceholder) && ng.isUndefined(placeholderEnum_1.PlaceholderEnum[actionAttrs.uifPlaceholder])) {
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
	exports.module = ng.module('officeuifabric.components.personacard', ['officeuifabric.components'])
	    .directive('uifPersonaCard', PersonaCardDirective.factory())
	    .directive('uifPersonaCardAction', PersonaCardActionDirective.factory())
	    .directive('uifPersonaCardDetailLabel', PersonaCardDetailLabelDirective.factory())
	    .directive('uifPersonaCardDetailLine', PersonaCardDetailLineDirective.factory())
	    .directive('uifPersonaCardPrimaryText', PersonaCardTextDirective.factory('primary'))
	    .directive('uifPersonaCardSecondaryText', PersonaCardTextDirective.factory('secondary'))
	    .directive('uifPersonaCardTertiaryText', PersonaCardTextDirective.factory('tertiary'))
	    .directive('uifPersonaCardOptionalText', PersonaCardTextDirective.factory(''));


/***/ },
/* 37 */
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
/* 38 */
/***/ function(module, exports) {

	'use strict';
	(function (PlaceholderEnum) {
	    PlaceholderEnum[PlaceholderEnum["regular"] = 0] = "regular";
	    PlaceholderEnum[PlaceholderEnum["topright"] = 1] = "topright";
	    PlaceholderEnum[PlaceholderEnum["overflow"] = 2] = "overflow";
	})(exports.PlaceholderEnum || (exports.PlaceholderEnum = {}));
	var PlaceholderEnum = exports.PlaceholderEnum;


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	(function (PersonaStyleEnum) {
	    PersonaStyleEnum[PersonaStyleEnum["round"] = 0] = "round";
	    PersonaStyleEnum[PersonaStyleEnum["square"] = 1] = "square";
	})(exports.PersonaStyleEnum || (exports.PersonaStyleEnum = {}));
	var PersonaStyleEnum = exports.PersonaStyleEnum;


/***/ },
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var personaStyleEnum_1 = __webpack_require__(39);
	var personaPresenceEnum_1 = __webpack_require__(40);
	var personaInitialsColorEnum_1 = __webpack_require__(42);
	var sizeEnum_1 = __webpack_require__(43);
	var PersonaTextDirective = (function () {
	    function PersonaTextDirective(directiveType) {
	        var _this = this;
	        this.directiveType = directiveType;
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = false;
	        this.scope = false;
	        this.availableClasses = {
	            'primary': 'ms-Persona-primaryText',
	            'secondary': 'ms-Persona-secondaryText',
	            'tertiary': 'ms-Persona-tertiaryText',
	            'optional': 'ms-Persona-optionalText'
	        };
	        this.template = function ($element, $attrs) {
	            var directiveTemplate = '<div class="' + _this.availableClasses[_this.directiveType] + '" ng-transclude></div>';
	            return directiveTemplate;
	        };
	        if (ng.isUndefined(this.availableClasses[this.directiveType])) {
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
	            if (ng.isUndefined(attrs.uifColor)) {
	                scope.uifColor = personaInitialsColorEnum_1.PersonaInitialsColor[personaInitialsColorEnum_1.PersonaInitialsColor.blue];
	            }
	            scope.$watch('uifColor', function (newColor) {
	                if (ng.isUndefined(personaInitialsColorEnum_1.PersonaInitialsColor[newColor])) {
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
	            'uifPresence': '@',
	            'uifSize': '@',
	            'uifImageUrl': '@'
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
	            if (ng.isDefined(attrs.uifSize) && ng.isUndefined(sizeEnum_1.PersonaSize[attrs.uifSize])) {
	                personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
	                    attrs.uifSize + '" is not a valid value for uifSize. It should be tiny, xsmall, small, medium, large, xlarge.');
	                return;
	            }
	            if (ng.isDefined(attrs.uifStyle) && ng.isUndefined(personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle])) {
	                personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
	                    attrs.uifStyle + '" is not a valid value for uifStyle. It should be round or square.');
	                return;
	            }
	            if (ng.isDefined(attrs.uifPresence) && ng.isUndefined(personaPresenceEnum_1.PresenceEnum[attrs.uifPresence])) {
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
	                var presence = ng.isDefined(attrs.uifPresence) ? personaPresenceEnum_1.PresenceEnum[attrs.uifPresence] : personaPresenceEnum_1.PresenceEnum.offline;
	                if (personaStyleEnum_1.PersonaStyleEnum[attrs.uifStyle] === personaStyleEnum_1.PersonaStyleEnum.square) {
	                    personaClasses.push('ms-Persona--square');
	                }
	                var sizeClass = _this.uifSizeClasses[size];
	                if (ng.isDefined(sizeClass)) {
	                    personaClasses.push(sizeClass);
	                }
	                personaClasses.push(_this.uifPresenceClasses[presence]);
	                return personaClasses.join(' ');
	            };
	            transclude(function (clone) {
	                var detailsWrapper = ng.element(element[0].getElementsByClassName('ms-Persona-details'));
	                var imageArea = ng.element(element[0].getElementsByClassName('ms-Persona-imageArea'));
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
	exports.module = ng.module('officeuifabric.components.persona', ['officeuifabric.components'])
	    .directive('uifPersona', PersonaDirective.factory())
	    .directive('uifPersonaInitials', PersonaInitialsDirective.factory())
	    .directive('uifPersonaPrimaryText', PersonaTextDirective.factory('primary'))
	    .directive('uifPersonaSecondaryText', PersonaTextDirective.factory('secondary'))
	    .directive('uifPersonaTertiaryText', PersonaTextDirective.factory('tertiary'))
	    .directive('uifPersonaOptionalText', PersonaTextDirective.factory(''));


/***/ },
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var pivotSizeEnum_1 = __webpack_require__(45);
	var pivotTypeEnum_1 = __webpack_require__(46);
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
	            if (ng.isDefined(newSize) && ng.isUndefined(pivotSizeEnum_1.PivotSize[newSize])) {
	                pivotController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
	                    '"' + newSize + '" is not a valid value for uifSize. It should be regular or large.');
	            }
	        });
	        scope.$watch('uifType', function (newType) {
	            if (ng.isDefined(newType) && ng.isUndefined(pivotTypeEnum_1.PivotType[newType])) {
	                pivotController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
	                    '"' + newType + '" is not a valid value for uifType. It should be regular or tabs.');
	            }
	        });
	        scope.$watch('uifSelected', function (newValue, oldValue) {
	            if (ng.isDefined(newValue)) {
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
	exports.module = ng.module('officeuifabric.components.pivot', ['officeuifabric.components'])
	    .directive('uifPivot', PivotDirective.factory())
	    .directive('uifPivotEllipsis', PivotEllipsisDirective.factory());


/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	(function (PivotSize) {
	    PivotSize[PivotSize['regular'] = 0] = 'regular';
	    PivotSize[PivotSize['large'] = 1] = 'large';
	})(exports.PivotSize || (exports.PivotSize = {}));
	var PivotSize = exports.PivotSize;


/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	(function (PivotType) {
	    PivotType[PivotType["regular"] = 0] = "regular";
	    PivotType[PivotType["tabs"] = 1] = "tabs";
	})(exports.PivotType || (exports.PivotType = {}));
	var PivotType = exports.PivotType;


/***/ },
/* 47 */
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
	}());
	exports.ProgressIndicatorDirective = ProgressIndicatorDirective;
	exports.module = ng.module('officeuifabric.components.progressindicator', [
	    'officeuifabric.components'
	])
	    .directive('uifProgressIndicator', ProgressIndicatorDirective.factory());


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var SearchBoxDirective = (function () {
	    function SearchBoxDirective() {
	        this.template = '<div class="ms-SearchBox" ng-class="{\'is-active\':isActive, \'is-disabled\':isDisabled}">' +
	            '<input class="ms-SearchBox-field" ng-focus="inputFocus()" ng-blur="inputBlur()"' +
	            ' ng-model="value" id="{{::\'searchBox_\'+$id}}" ng-disabled="isDisabled" />' +
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
	        attrs.$observe('disabled', function (disabled) {
	            scope.isDisabled = !!disabled;
	        });
	    };
	    return SearchBoxDirective;
	}());
	exports.SearchBoxDirective = SearchBoxDirective;
	exports.module = ng.module('officeuifabric.components.searchbox', ['officeuifabric.components'])
	    .directive('uifSearchbox', SearchBoxDirective.factory());


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var spinnerSizeEnum_1 = __webpack_require__(50);
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
	exports.module = ng.module('officeuifabric.components.spinner', ['officeuifabric.components'])
	    .directive('uifSpinner', SpinnerDirective.factory());


/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	(function (SpinnerSize) {
	    SpinnerSize[SpinnerSize['small'] = 0] = 'small';
	    SpinnerSize[SpinnerSize['large'] = 1] = 'large';
	})(exports.SpinnerSize || (exports.SpinnerSize = {}));
	var SpinnerSize = exports.SpinnerSize;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var tableRowSelectModeEnum_1 = __webpack_require__(52);
	var tableTypeEnum_1 = __webpack_require__(53);
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
	            instanceElement.replaceWith('<th class="ms-Table-rowCheck"></th>');
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
	exports.module = ng.module('officeuifabric.components.table', ['officeuifabric.components'])
	    .directive('uifTable', TableDirective.factory())
	    .directive('uifTableRow', TableRowDirective.factory())
	    .directive('uifTableRowSelect', TableRowSelectDirective.factory())
	    .directive('uifTableCell', TableCellDirective.factory())
	    .directive('uifTableHeader', TableHeaderDirective.factory())
	    .directive('uifTableHead', TableHeadDirective.factory())
	    .directive('uifTableBody', TableBodyDirective.factory());


/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	(function (TableRowSelectModeEnum) {
	    TableRowSelectModeEnum[TableRowSelectModeEnum["none"] = 0] = "none";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["single"] = 1] = "single";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["multiple"] = 2] = "multiple";
	})(exports.TableRowSelectModeEnum || (exports.TableRowSelectModeEnum = {}));
	var TableRowSelectModeEnum = exports.TableRowSelectModeEnum;


/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	(function (TableTypeEnum) {
	    TableTypeEnum[TableTypeEnum["fluid"] = 0] = "fluid";
	    TableTypeEnum[TableTypeEnum["fixed"] = 1] = "fixed";
	})(exports.TableTypeEnum || (exports.TableTypeEnum = {}));
	var TableTypeEnum = exports.TableTypeEnum;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var uifTypeEnum_1 = __webpack_require__(55);
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
	            '<input ng-model="ngModel" ng-change="ngChange" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
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
	        };
	        scope.labelClick = function (ev) {
	            if (scope.placeholder) {
	                var input = scope.uifMultiline ? instanceElement.find('textarea')
	                    : instanceElement.find('input');
	                input[0].focus();
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
	exports.module = ng.module('officeuifabric.components.textfield', [
	    'officeuifabric.components'
	])
	    .directive('uifTextfield', TextFieldDirective.factory());


/***/ },
/* 55 */
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var ToggleDirective = (function () {
	    function ToggleDirective() {
	        this.template = '<div ng-class="[\'ms-Toggle\', textLocation, {\'is-disabled\': disabled}]">' +
	            '<span class="ms-Toggle-description"><ng-transclude/></span>' +
	            '<input type="checkbox" id="{{::$id}}" class="ms-Toggle-input" ' +
	            'ng-model="ngModel" ng-change="ngChange()" ng-disabled="disabled" ' +
	            'ng-attr-ng-true-value="{{ngTrueValue || undefined}}" ng-attr-ng-false-value="{{ngFalseValue || undefined}}" />' +
	            '<label for="{{::$id}}" class="ms-Toggle-field">' +
	            '<span class="ms-Label ms-Label--off">{{uifLabelOff}}</span>' +
	            '<span class="ms-Label ms-Label--on">{{uifLabelOn}}</span>' +
	            '</label>' +
	            '</div>';
	        this.restrict = 'E';
	        this.transclude = true;
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
	    ToggleDirective.prototype.link = function (scope, elem, attrs) {
	        if (scope.uifTextLocation) {
	            var loc = scope.uifTextLocation;
	            loc = loc.charAt(0).toUpperCase() + loc.slice(1);
	            scope.textLocation = ' ms-Toggle--text' + loc;
	        }
	        scope.$watch(function () { return elem.attr('disabled'); }, (function (newValue) { scope.disabled = typeof newValue !== 'undefined'; }));
	        scope.disabled = 'disabled' in attrs;
	    };
	    return ToggleDirective;
	}());
	exports.ToggleDirective = ToggleDirective;
	exports.module = ng.module('officeuifabric.components.toggle', [
	    'officeuifabric.components'
	])
	    .directive('uifToggle', ToggleDirective.factory());


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var orgChartPresenceEnum_1 = __webpack_require__(58);
	var orgChartStyleEnum_1 = __webpack_require__(59);
	var orgChartSelectModeEnum_1 = __webpack_require__(60);
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
	exports.module = ng.module('officeuifabric.components.orgchart', [
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
/* 58 */
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
/* 59 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartStyleEnum) {
	    OrgChartStyleEnum[OrgChartStyleEnum["standard"] = 0] = "standard";
	    OrgChartStyleEnum[OrgChartStyleEnum["square"] = 1] = "square";
	})(exports.OrgChartStyleEnum || (exports.OrgChartStyleEnum = {}));
	var OrgChartStyleEnum = exports.OrgChartStyleEnum;


/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartSelectModeEnum) {
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["single"] = 0] = "single";
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["multiple"] = 1] = "multiple";
	})(exports.OrgChartSelectModeEnum || (exports.OrgChartSelectModeEnum = {}));
	var OrgChartSelectModeEnum = exports.OrgChartSelectModeEnum;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ng = __webpack_require__(2);
	var personaStyleEnum_1 = __webpack_require__(39);
	var sizeEnum_1 = __webpack_require__(43);
	var iconEnum_1 = __webpack_require__(21);
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
	        if (ng.isUndefined(type)) {
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
	            if (ng.isUndefined(type)) {
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
	            "<div class=\"ms-PeoplePicker\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <div class=\"ms-PeoplePicker-persona\" ng-repeat=\"person in selectedPersons track by $index\">\n              <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n                uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n                uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"\n                uif-presence=\"{{person.presence}}\"\n                uif-image-url=\"{{person.icon}}\">\n                <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              </uif-persona>\n              <button ng-click=\"removePersonFromSelectedPeople(person, $event)\" class=\"ms-PeoplePicker-personaRemove\">\n                <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n              </button>\n            </div>\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            placeholder=\"{{placeholder}}\"\n            ng-model=\"searchQuery\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-resultGroups\">\n            <div class=\"ms-PeoplePicker-resultGroup\" ng-repeat=\"groupData in groups | orderBy:'-order'\">\n              <div class=\"ms-PeoplePicker-resultGroupTitle\">{{groupData.group.name}}</div>\n              <uif-people-picker-result-list\n              ng-model=\"groupData.people\"\n              uif-person-click=\"addPersonToSelectedPeople\"\n              uif-person-close-click=\"removePersonFromSearchResults\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.medium] + "\"></uif-people-picker-result-list>\n            </div>\n          </div>\n          <ng-transclude />\n        </div>\n      </div>";
	        this.templateTypes[PeoplePickerTypes.compact] =
	            "<div class=\"ms-PeoplePicker ms-PeoplePicker--compact\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <div class=\"ms-PeoplePicker-persona\" ng-repeat=\"person in selectedPersons track by $index\">\n              <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n                uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n                uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"\n                uif-presence=\"{{person.presence}}\"\n                uif-image-url=\"{{person.icon}}\">\n                <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              </uif-persona>\n              <button ng-click=\"removePersonFromSelectedPeople(person, $event)\" class=\"ms-PeoplePicker-personaRemove\">\n                <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n              </button>\n            </div>\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            ng-model=\"searchQuery\"\n            placeholder=\"{{placeholder}}\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-resultGroups\">\n            <div class=\"ms-PeoplePicker-resultGroup\" ng-repeat=\"groupData in groups | orderBy:'-order'\">\n              <div class=\"ms-PeoplePicker-resultGroupTitle\">{{groupData.group.name}}</div>\n              <uif-people-picker-result-list\n              ng-model=\"groupData.people\"\n              uif-picker-type=\"" + PeoplePickerTypes[PeoplePickerTypes.compact] + "\"\n              uif-person-click=\"addPersonToSelectedPeople\"\n              uif-person-close-click=\"removePersonFromSearchResults\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"></uif-people-picker-result-list>\n            </div>\n          </div>\n          <ng-transclude />\n        </div>\n      </div>";
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
	        this.template = "\n  <ul class=\"ms-PeoplePicker-resultList\">\n    <li class=\"ms-PeoplePicker-result\" ng-repeat=\"person in people track by $index\">\n      <div role=\"button\" class=\"ms-PeoplePicker-resultBtn\"\n      ng-class=\"{'ms-PeoplePicker-resultBtn--compact': pickerType === 'compact'}\" ng-click=\"onPersonClick()(person)\">\n        <uif-persona\n          uif-style=\"{{personStyle}}\"\n          uif-size=\"{{personSize}}\"\n          uif-presence=\"{{person.presence}}\"\n          uif-image-url=\"{{person.icon}}\">\n          <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n          <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n          <uif-persona-secondary-text>{{person.secondaryText}}</uif-persona-secondary-text>\n        </uif-persona>\n        <button\n          ng-if=\"!person.additionalData && onPersonCloseClick()\"\n          ng-click=\"onPersonCloseClick()(people, person, $event)\"\n          class=\"ms-PeoplePicker-resultAction js-resultRemove\">\n          <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n        </button>\n        <button\n          ng-if=\"person.additionalData\"\n          ng-click=\"expandAdditionalData($event)\"\n          class=\"ms-PeoplePicker-resultAction js-resultRemove\">\n          <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.chevronsDown] + "\"></uif-icon>\n        </button>\n      </div>\n      <div ng-if=\"person.additionalData\" class=\"ms-PeoplePicker-resultAdditionalContent\">\n        <uif-people-picker-result-list\n        ng-model=\"person.additionalData\"\n        uif-person-click=\"onPersonClick()\"\n        uif-person-close-click=\"onPersonCloseClick()\"\n        uif-picker-type=\"{{pickerType}}\"\n        uif-style=\"{{personStyle}}\"\n        uif-size=\"{{personSize}}\"></uif-people-picker-result-list>\n      </div>\n    </li>\n  </ul>";
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
	        this.template = "\n  <div class=\"ms-PeoplePicker-searchMore js-searchMore\"\n    ng-class=\"{'ms-PeoplePicker-searchMore--disconnected': disconnected}\">\n    <button ng-if=\"pickerType === '" + PeoplePickerTypes[PeoplePickerTypes.grouped] + "' && !disconnected\"\n      ng-click=\"onSearch($event)\" class=\"ms-PeoplePicker-searchMoreBtn\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon ng-if=\"!disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.search] + "\"></uif-icon>\n        <uif-icon ng-if=\"disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </button>\n    <div role=\"button\" ng-if=\"pickerType === '" + PeoplePickerTypes[PeoplePickerTypes.compact] + "' && !disconnected\"\n      ng-click=\"onSearch($event)\" class=\"ms-PeoplePicker-searchMoreBtn ms-PeoplePicker-searchMoreBtn--compact\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon ng-if=\"!disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.search] + "\"></uif-icon>\n        <uif-icon ng-if=\"disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </div>\n    <div role=\"button\" ng-if=\"pickerType === '" + PeoplePickerTypes[PeoplePickerTypes.facePile] + "' && !disconnected\"\n      ng-click=\"onSearch($event)\" class=\"ms-PeoplePicker-searchMoreBtn ms-PeoplePicker-searchMoreBtn--compact\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon ng-if=\"!disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.search] + "\"></uif-icon>\n        <uif-icon ng-if=\"disconnected\" uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </div>\n    <div role=\"button\" ng-if=\"disconnected\" class=\"ms-PeoplePicker-searchMoreBtn\">\n      <div class=\"ms-PeoplePicker-searchMoreIcon\">\n        <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.alert] + "\"></uif-icon>\n      </div>\n      <ng-transclude />\n    </div>\n    <uif-spinner ng-show=\"processing\"></uif-spinner>\n  </div>";
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
	        this.template = "\n    <div class=\"ms-PeoplePicker-selected\" ng-class=\"{'is-active': selectedPeople && selectedPeople.length > 0}\">\n        <div class=\"ms-PeoplePicker-selectedHeader\">\n            <ng-transclude></ng-transclude>\n        </div>\n        <ul class=\"ms-PeoplePicker-selectedPeople\">\n          <li class=\"ms-PeoplePicker-selectedPerson\" ng-repeat=\"person in selectedPeople track by $index\">\n            <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.round] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.small] + "\"\n              uif-presence=\"{{person.presence}}\"\n              uif-image-url=\"{{person.icon}}\">\n              <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n              <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              <uif-persona-secondary-text>{{person.secondaryText}}</uif-persona-secondary-text>\n            </uif-persona>\n            <button ng-click=\"removePersonFromSelectedPeople()(person, $event)\" class=\"ms-PeoplePicker-resultAction js-resultRemove\">\n              <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n            </button>\n          </li>\n        </ul>\n    </div>";
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
	exports.module = ng.module('officeuifabric.components.peoplepicker', [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNzA5YmNhM2NmNzU2ODg4ODFiZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVGVtcGxhdGVUeXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhci9tZXNzYWdlQmFyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheU1vZGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9wZXJzb25hY2FyZERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9wbGFjZWhvbGRlckVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVN0eWxlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdFNpemVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90VHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQSxnRDs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMEQsUUFBUSxjQUFjLGFBQWE7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsOEJBQThCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWdFLDhCQUE4QjtBQUM5RjtBQUNBO0FBQ0E7QUFDQSwyREFBMEQsV0FBVyxJQUFJLGVBQWU7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLFdBQVcsSUFBSSxlQUFlO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxrQ0FBa0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5QyxrQ0FBa0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHNEQUFxRCx3QkFBd0I7QUFDN0U7QUFDQSxpREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0EseUVBQXdFLHdCQUF3QjtBQUNoRztBQUNBLG9FQUFtRSx3QkFBd0I7QUFDM0Y7QUFDQSx5RUFBd0Usd0JBQXdCO0FBQ2hHO0FBQ0Esb0VBQW1FLHdCQUF3QjtBQUMzRjtBQUNBLDBFQUF5RSx3QkFBd0I7QUFDakc7QUFDQSxxRUFBb0Usd0JBQXdCO0FBQzVGO0FBQ0Esc0VBQXFFLHdCQUF3QjtBQUM3RjtBQUNBLGlFQUFnRSx3QkFBd0I7QUFDeEY7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHlDQUF5QztBQUM5RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0RBQXdEO0FBQ3pEO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGdFQUFnRTtBQUNqRTtBQUNBOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxxQ0FBcUM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsZ0RBQStDLGdDQUFnQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW1FLGdCQUFnQjtBQUNuRix5QkFBd0I7QUFDeEIsMkZBQTBGO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGtEQUFrRDtBQUNuRDs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0RBQW9EO0FBQ3JEOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLE9BQU8sdUNBQXVDLFNBQVMsV0FBVyxPQUFPO0FBQ25HLGtEQUFpRCxhQUFhLG9CQUFvQixjQUFjO0FBQ2hHLDRCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MseUNBQXlDLEVBQUU7QUFDN0U7QUFDQSxVQUFTO0FBQ1QsbUNBQWtDLHdEQUF3RCxFQUFFLHdCQUF3QixpQkFBaUIsRUFBRTtBQUN2STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2Q0FBNkM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyx5Q0FBeUMsRUFBRSx3QkFBd0Isa0RBQWtELEVBQUU7QUFDeko7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQywwREFBMEQ7QUFDM0Q7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsa0NBQWtDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBIQUF5SCxxTEFBcUwscUJBQXFCLHFJQUFxSSxpRkFBaUY7QUFDemhCO0FBQ0E7QUFDQSxzQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMFlBQXlZO0FBQ3pZO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsOENBQThDO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsb0RBQW9EO0FBQ2pHO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHNDQUFzQztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsMEpBQXlKLHFEQUFxRDtBQUM5TTtBQUNBLGlIQUFnSCxxREFBcUQ7QUFDcks7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUMsOENBQThDO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUIsVUFBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHdDQUF3QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDBDQUF5Qyw4R0FBOEc7QUFDdko7QUFDQTtBQUNBLDJFQUEwRSxhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXdFLHVCQUF1QjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx5QkFBd0I7QUFDeEIsbUVBQWtFO0FBQ2xFLDRCQUEyQixRQUFRO0FBQ25DLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBd0QsNEJBQTRCLEtBQUssdUJBQXVCO0FBQ2hIO0FBQ0EsK0JBQThCO0FBQzlCLGdFQUErRDtBQUMvRDtBQUNBLDJCQUEwQixNQUFNLElBQUksTUFBTTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxrQ0FBa0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCO0FBQ3hCO0FBQ0Esa0VBQWlFO0FBQ2pFLHVDQUFzQyxZQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw4QkFBOEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsb0NBQW9DO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF3RSxvREFBb0Q7QUFDNUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHdEQUF3RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyw4RUFBOEU7QUFDL0U7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1RUFBdUU7QUFDL0Y7QUFDQSxnREFBK0MsZUFBZTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLHlDQUF5QyxFQUFFLHdCQUF3QixrREFBa0QsRUFBRTtBQUN6SjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx1REFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDRDQUE0QztBQUM3QztBQUNBOzs7Ozs7O0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkJBQTZCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsVUFBVTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNEJBQTRCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQiwrQkFBK0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDJDQUEyQztBQUNoRjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDZDQUE2QztBQUNsRjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLCtDQUErQztBQUNwRjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0VBQXdFO0FBQ3pFOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsNERBQTREO0FBQzdEOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHdEQUF3RDtBQUN6RDs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0dBQXVHLGtCQUFrQjtBQUN6SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsZ0NBQWdDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGdFQUFnRTtBQUNqRTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3T0FBdU8sU0FBUztBQUNoUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDBDQUEwQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0EseUdBQXdHLHlFQUF5RTtBQUNqTCw0SEFBMkgsMEJBQTBCO0FBQ3JKO0FBQ0E7QUFDQSwwQ0FBeUMsc0NBQXNDO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvT0FBbU8sYUFBYTtBQUNoUDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsNEJBQTRCO0FBQ3pFO0FBQ0E7QUFDQSw4Q0FBNkMsNEJBQTRCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE0RCwwQ0FBMEM7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0Msa0NBQWtDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGtEQUFrRDtBQUNuRDs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhRQUE2UTtBQUM3UTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxnREFBZ0Q7QUFDakQ7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQsYUFBYTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxhQUFhO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsMkNBQTJDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLDZDQUE2QztBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhDQUE4QztBQUNuRjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EO0FBQ0E7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQywwREFBMEQ7QUFDM0Q7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsNERBQTREO0FBQzdEOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0RBQW9EO0FBQ3JEO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBZ0YsVUFBVTtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQsYUFBYTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0VBQW9FO0FBQ3JFO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsZ0NBQWdDLElBQUksYUFBYTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDZCQUE2QjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esb0NBQW1DLDJCQUEyQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyw4Q0FBOEM7QUFDL0M7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsOENBQThDO0FBQy9DOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMEQsU0FBUztBQUNuRTtBQUNBO0FBQ0EsdUVBQXNFLGdDQUFnQztBQUN0RztBQUNBLGtFQUFpRSxnQkFBZ0I7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLDRDQUE0QztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBOEQsbURBQW1EO0FBQ2pIO0FBQ0Esc0NBQXFDLHNCQUFzQjtBQUMzRCx1REFBc0Qsc0JBQXNCO0FBQzVFLDJFQUEwRSxhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1Qyx1QkFBdUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBMkU7QUFDM0U7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyx3RUFBd0U7QUFDekU7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsc0RBQXNEO0FBQ3ZEOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDBDQUF5QztBQUN6QztBQUNBLGdIQUErRztBQUMvRyxxRkFBb0YseUJBQXlCO0FBQzdHO0FBQ0EsZ0dBQStGLFNBQVM7QUFDeEcscUJBQW9CLEtBQUssU0FBUyxLQUFLLFVBQVUsTUFBTTtBQUN2RDtBQUNBO0FBQ0EsdURBQXNELGdCQUFnQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyx5Q0FBeUMsRUFBRSx3QkFBd0Isa0RBQWtELEVBQUU7QUFDeko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxzREFBc0Q7QUFDdkQ7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF1RSwwQkFBMEI7QUFDakc7QUFDQSwyQ0FBMEMsT0FBTztBQUNqRDtBQUNBLHVDQUFzQywwQkFBMEIsNEJBQTRCLDJCQUEyQjtBQUN2SCw0QkFBMkIsT0FBTztBQUNsQyxxREFBb0QsYUFBYTtBQUNqRSxvREFBbUQsWUFBWTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsOEJBQThCLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQzlJO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywwQ0FBMEM7QUFDL0U7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLDJDQUEyQztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsdUJBQXVCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLHVCQUF1QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrTEFBOEwsT0FBTztBQUNyTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx3Q0FBd0M7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsMkNBQTJDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvRUFBb0U7QUFDckU7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsOERBQThEO0FBQy9EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHdFQUF3RTtBQUN6RTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBc0Usc0JBQXNCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDhDQUE4QztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDRnQkFBMmdCLGlCQUFpQixzQ0FBc0MsYUFBYSx5REFBeUQsY0FBYyxLQUFLLGlCQUFpQixxRUFBcUUsb0JBQW9CLHFhQUFxYSxhQUFhLHVnQkFBdWdCLHNCQUFzQjtBQUNwdEQ7QUFDQSxxaUJBQW9pQixpQkFBaUIsc0NBQXNDLGFBQWEseURBQXlELGNBQWMsS0FBSyxpQkFBaUIscUVBQXFFLG9CQUFvQiwyY0FBMmMsYUFBYSxpZUFBaWUsc0JBQXNCO0FBQzd1RCxnUkFBK1EsYUFBYTtBQUM1UiwyUUFBMFEsYUFBYSxtWEFBbVgsZ0JBQWdCO0FBQzFwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLG1EQUFtRCxFQUFFO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQyxXQUFXO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQixrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxUEFBb1AsK0RBQStELHdGQUF3RixhQUFhLDJCQUEyQixZQUFZLCtCQUErQixpQkFBaUIsZ0NBQWdDLGFBQWEsbURBQW1ELGNBQWMsS0FBSyxpQkFBaUIsK0RBQStELG9CQUFvQixxRUFBcUUsc0JBQXNCLCsvQkFBKy9CLFlBQVksMEJBQTBCLGFBQWEseUJBQXlCLFlBQVk7QUFDeDNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsOENBQThDO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1R0FBc0cseURBQXlEO0FBQy9KO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZLQUE0SyxrQkFBa0IsR0FBRyxhQUFhO0FBQzlNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx3Q0FBd0M7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW1GLHlEQUF5RCxvbEJBQW9sQixpQkFBaUIsb0NBQW9DLGFBQWEsdURBQXVELGNBQWMsS0FBSyxpQkFBaUIsbUVBQW1FLG9CQUFvQix5RUFBeUUsc0JBQXNCO0FBQ25qQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJuZ09mZmljZVVpRmFicmljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKSA6IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGY3MDliY2EzY2Y3NTY4ODg4MWJlXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvcmUnLCBbXSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvcmUvY29yZS50c1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBicmVhZGNydW1iTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWJEaXJlY3RpdmUnKTtcbnZhciBidXR0b25Nb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUnKTtcbnZhciBjYWxsb3V0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXREaXJlY3RpdmUnKTtcbnZhciBjaG9pY2VmaWVsZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUnKTtcbnZhciBjb21tYW5kQmFyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUnKTtcbnZhciBjb250ZW50TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb250ZW50L2NvbnRlbnREaXJlY3RpdmUnKTtcbnZhciBjb250ZXh0dWFsTWVudU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUnKTtcbnZhciBkYXRlcGlja2VyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXJEaXJlY3RpdmUnKTtcbnZhciBkaWFsb2dNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dEaXJlY3RpdmUnKTtcbnZhciBkcm9wZG93bk1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd25EaXJlY3RpdmUnKTtcbnZhciBpY29uTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUnKTtcbnZhciBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbGFiZWwvbGFiZWxEaXJlY3RpdmUnKTtcbnZhciBsaW5rTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUnKTtcbnZhciBsaXN0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9saXN0L2xpc3REaXJlY3RpdmUnKTtcbnZhciBtZXNzYWdlQmFubmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUnKTtcbnZhciBtZXNzYWdlQmFyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJEaXJlY3RpdmUnKTtcbnZhciBuYXZCYXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUnKTtcbnZhciBvdmVybGF5TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUnKTtcbnZhciBwYW5lbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmUnKTtcbnZhciBwZXJzb25hY2FyZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUnKTtcbnZhciBwZXJzb25hTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wZXJzb25hL3BlcnNvbmFEaXJlY3RpdmUnKTtcbnZhciBwaXZvdE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGl2b3QvcGl2b3REaXJlY3RpdmUnKTtcbnZhciBwcm9ncmVzc0luZGljYXRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUnKTtcbnZhciBzZWFyY2hib3hNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NlYXJjaGJveC9zZWFyY2hib3hEaXJlY3RpdmUnKTtcbnZhciBzcGlubmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUnKTtcbnZhciB0YWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUnKTtcbnZhciB0ZXh0RmllbGRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUnKTtcbnZhciB0b2dnbGVNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUnKTtcbnZhciBvcmdDaGFydE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUnKTtcbnZhciBwZW9wbGVQaWNrZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUnKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJywgW1xuICAgIGJyZWFkY3J1bWJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgYnV0dG9uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNhbGxvdXRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY2hvaWNlZmllbGRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY29tbWFuZEJhck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb250ZW50TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNvbnRleHR1YWxNZW51TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRhdGVwaWNrZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgZGlhbG9nTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRyb3Bkb3duTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGljb25Nb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGFiZWxNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGlua01vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBsaXN0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG1lc3NhZ2VCYW5uZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbWVzc2FnZUJhck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBuYXZCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgb3ZlcmxheU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwYW5lbE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwZW9wbGVQaWNrZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGVyc29uYWNhcmRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGVyc29uYU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwaXZvdE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwcm9ncmVzc0luZGljYXRvck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBzZWFyY2hib3hNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgc3Bpbm5lck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0YWJsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0ZXh0RmllbGRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdG9nZ2xlTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG9yZ0NoYXJ0TW9kdWxlLm1vZHVsZS5uYW1lXG5dKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9jb21wb25lbnRzLnRzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iTGlua0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZCcmVhZGNydW1iJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICcnICtcbiAgICAgICAgICAgICc8bGkgY2xhc3M9XCJtcy1CcmVhZGNydW1iLWxpc3RJdGVtXCI+JyArXG4gICAgICAgICAgICAnPGEgY2xhc3M9XCJtcy1CcmVhZGNydW1iLWl0ZW1MaW5rXCIgbmctaHJlZj1cInt7bmdIcmVmfX1cIiB0YWJpbmRleD1cInt7dWlmVGFiaW5kZXh9fVwiIG5nLXRyYW5zY2x1ZGU+PC9hPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtQnJlYWRjcnVtYi1jaGV2cm9uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPicgK1xuICAgICAgICAgICAgJzwvbGk+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIHRhYmluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkuY2hpbGRyZW4oKSwgaW5zdGFuY2VFbGVtZW50WzBdKSArIDI7XG4gICAgICAgIHNjb3BlLnVpZlRhYmluZGV4ID0gdGFiaW5kZXg7XG4gICAgfTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iTGlua0RpcmVjdGl2ZSA9IEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlO1xudmFyIEJyZWFkY3J1bWJMaW5rID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iTGluayhocmVmLCBsaW5rVGV4dCkge1xuICAgICAgICB0aGlzLmhyZWYgPSBocmVmO1xuICAgICAgICB0aGlzLmxpbmtUZXh0ID0gbGlua1RleHQ7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZGNydW1iTGluaztcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJMaW5rID0gQnJlYWRjcnVtYkxpbms7XG52YXIgQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJDb250cm9sbGVyKCRzY29wZSwgJGRvY3VtZW50LCAkd2luZG93KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgdmFyIHdpbmRvd0VsZW1lbnQgPSBuZy5lbGVtZW50KCR3aW5kb3cpO1xuICAgICAgICAkc2NvcGUudmlzaWJsZUVsZW1lbnRzID0gNDtcbiAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLmlzT3ZlcmZsb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3ZlcmZsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJmbG93ID0gbmcuaXNEZWZpbmVkKCRzY29wZS51aWZCcmVhZGNydW1iTGlua3MpICYmICRzY29wZS51aWZCcmVhZGNydW1iTGlua3MubGVuZ3RoID4gJHNjb3BlLnZpc2libGVFbGVtZW50cztcbiAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdztcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm92ZXJmbG93RWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzT3ZlcmZsb3coKSA/ICRzY29wZS51aWZCcmVhZGNydW1iTGlua3MubGVuZ3RoIC0gJHNjb3BlLnZpc2libGVFbGVtZW50cyA6IDA7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5vcGVuT3ZlcmZsb3cgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICAkZG9jdW1lbnQuZmluZCgnaHRtbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvd0VsZW1lbnQub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9ICR3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgIHZhciBlbGVtZW50c1RvU2hvdyA9ICh3aWR0aCA+IEJyZWFkY3J1bWJDb250cm9sbGVyLl9icmVha2luZ1dpZHRoKSA/IDQgOiAyO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRzVG9TaG93ICE9PSAkc2NvcGUudmlzaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpc2libGVFbGVtZW50cyA9IGVsZW1lbnRzVG9TaG93O1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEJyZWFkY3J1bWJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZG9jdW1lbnQnLCAnJHdpbmRvdyddO1xuICAgIEJyZWFkY3J1bWJDb250cm9sbGVyLl9icmVha2luZ1dpZHRoID0gNjM5O1xuICAgIHJldHVybiBCcmVhZGNydW1iQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJDb250cm9sbGVyID0gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG52YXIgQnJlYWRjcnVtYkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJlYWRjcnVtYkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICcnICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtQnJlYWRjcnVtYlwiIG5nLWNsYXNzPVwie1xcJ2lzLW92ZXJmbG93XFwnOiBpc092ZXJmbG93KCl9XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLUJyZWFkY3J1bWItb3ZlcmZsb3dcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtQnJlYWRjcnVtYi1vdmVyZmxvd0J1dHRvbiBtcy1JY29uIG1zLUljb24tLWVsbGlwc2lzXCIgbmctY2xpY2s9XCJvcGVuT3ZlcmZsb3coJGV2ZW50KVwiIHRhYmluZGV4PVwiMVwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtQnJlYWRjcnVtYi1jaGV2cm9uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1CcmVhZGNydW1iLW92ZXJmbG93TWVudVwiIG5nLWNsYXNzPVwie1xcJ2lzLW9wZW5cXCc6IG92ZXJmbG93TWVudU9wZW59XCI+JyArXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibXMtQ29udGV4dHVhbE1lbnUgaXMtb3BlblwiPicgK1xuICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cIiAnICtcbiAgICAgICAgICAgICduZy1yZXBlYXQ9XCJsaW5rIGluIHVpZkJyZWFkY3J1bWJMaW5rcyB8IGxpbWl0VG86b3ZlcmZsb3dFbGVtZW50cygpXCI+JyArXG4gICAgICAgICAgICAnPGEgY2xhc3M9XCJtcy1Db250ZXh0dWFsTWVudS1saW5rXCIgbmctaHJlZj1cInt7bGluay5ocmVmfX1cIj57e2xpbmsubGlua1RleHR9fTwvYT4nICtcbiAgICAgICAgICAgICc8L2xpPicgK1xuICAgICAgICAgICAgJzwvdWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibXMtQnJlYWRjcnVtYi1saXN0XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1icmVhZGNydW1iLWxpbmsgbmctcmVwZWF0PVwibGluayBpbiB1aWZCcmVhZGNydW1iTGlua3MgfCBsaW1pdFRvOi12aXNpYmxlRWxlbWVudHNcIiAnICtcbiAgICAgICAgICAgICduZy1ocmVmPVwie3tsaW5rLmhyZWZ9fVwiPnt7bGluay5saW5rVGV4dH19PC91aWYtYnJlYWRjcnVtYi1saW5rPicgK1xuICAgICAgICAgICAgJzwvdWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICd1aWZCcmVhZGNydW1iJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZCcmVhZGNydW1iTGlua3MnOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQnJlYWRjcnVtYkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJyZWFkY3J1bWJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBCcmVhZGNydW1iRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQnJlYWRjcnVtYkRpcmVjdGl2ZSA9IEJyZWFkY3J1bWJEaXJlY3RpdmU7XG47XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5icmVhZGNydW1iJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmQnJlYWRjcnVtYicsIEJyZWFkY3J1bWJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJyZWFkY3J1bWJMaW5rJywgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWJEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgYnV0dG9uVHlwZUVudW1fdHNfMSA9IHJlcXVpcmUoJy4vYnV0dG9uVHlwZUVudW0udHMnKTtcbnZhciBidXR0b25UZW1wbGF0ZVR5cGVfdHNfMSA9IHJlcXVpcmUoJy4vYnV0dG9uVGVtcGxhdGVUeXBlLnRzJyk7XG52YXIgQnV0dG9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnV0dG9uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIEJ1dHRvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBCdXR0b25Db250cm9sbGVyO1xufSgpKTtcbnZhciBCdXR0b25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnV0dG9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnYnV0dG9uJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRhdHRycy51aWZUeXBlKSAmJiBuZy5pc1VuZGVmaW5lZChidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtWyRhdHRycy51aWZUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5idXR0b24gLSBVbnN1cHBvcnRlZCBidXR0b246ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGJ1dHRvbiAoXFwnJyArICRhdHRycy51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKCRhdHRycy51aWZUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0ucHJpbWFyeV06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmcuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRMaW5rXTtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kTGlua107XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uaGVyb106XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25MaW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcG9wdWxhdGVIdG1sVGVtcGxhdGVzKCk7XG4gICAgfVxuICAgIEJ1dHRvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBCdXR0b25EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmssXG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gISFpc0Rpc2FibGVkO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoYXR0cnMudWlmVHlwZSkgfHxcbiAgICAgICAgICAgIGF0dHJzLnVpZlR5cGUgPT09IGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5wcmltYXJ5XSB8fFxuICAgICAgICAgICAgYXR0cnMudWlmVHlwZSA9PT0gYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXSkge1xuICAgICAgICAgICAgdmFyIGljb25FbGVtZW50ID0gZWxlbWVudC5maW5kKCd1aWYtaWNvbicpO1xuICAgICAgICAgICAgaWYgKGljb25FbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbiAtICcgK1xuICAgICAgICAgICAgICAgICAgICAnSWNvbiBub3QgYWxsb3dlZCBpbiBwcmltYXJ5IG9yIGNvbXBvdW5kIGJ1dHRvbnM6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHByaW1hcnkgJiBjb21wb3VuZCBidXR0b24gZG9lcyBub3Qgc3VwcG9ydCBpbmNsdWRpbmcgaWNvbnMgaW4gdGhlIGJvZHkuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGljb24gaGFzIGJlZW4gcmVtb3ZlZCBidXQgbWF5IGNhdXNlIHJlbmRlcmluZyBlcnJvcnMuIENvbnNpZGVyIGJ1dHRvbnMgdGhhdCBzdXBwb3J0IGljb25zIHN1Y2ggYXMgY29tbWFuZCBvciBoZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlcjtcbiAgICAgICAgICAgIHN3aXRjaCAoYXR0cnMudWlmVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1pY29uJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF06XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lICE9PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS5jbGFzc0xpc3RbMF0gPT09ICduZy1zY29wZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZVtpXS5jbGFzc0xpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmhlcm9dOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1pY29uJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLl9wb3B1bGF0ZUh0bWxUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25CdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tcHJpbWFyeVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZExpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbW1hbmRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZEJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21wb3VuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tcG91bmRMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21wb3VuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0taGVyb1xcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWhlcm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQnV0dG9uRGlyZWN0aXZlID0gQnV0dG9uRGlyZWN0aXZlO1xudmFyIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZCdXR0b24nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1CdXR0b24tZGVzY3JpcHRpb25cIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgIH1cbiAgICBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSA9IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b24nLCBCdXR0b25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJ1dHRvbkRlc2NyaXB0aW9uJywgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChCdXR0b25UeXBlRW51bSkge1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wicHJpbWFyeVwiXSA9IDBdID0gXCJwcmltYXJ5XCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJjb21tYW5kXCJdID0gMV0gPSBcImNvbW1hbmRcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImNvbXBvdW5kXCJdID0gMl0gPSBcImNvbXBvdW5kXCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJoZXJvXCJdID0gM10gPSBcImhlcm9cIjtcbn0pKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gfHwgKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gPSB7fSkpO1xudmFyIEJ1dHRvblR5cGVFbnVtID0gZXhwb3J0cy5CdXR0b25UeXBlRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKEJ1dHRvblRlbXBsYXRlVHlwZSkge1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJhY3Rpb25CdXR0b25cIl0gPSAwXSA9IFwiYWN0aW9uQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImFjdGlvbkxpbmtcIl0gPSAxXSA9IFwiYWN0aW9uTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJwcmltYXJ5QnV0dG9uXCJdID0gMl0gPSBcInByaW1hcnlCdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wicHJpbWFyeUxpbmtcIl0gPSAzXSA9IFwicHJpbWFyeUxpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiY29tbWFuZEJ1dHRvblwiXSA9IDRdID0gXCJjb21tYW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbW1hbmRMaW5rXCJdID0gNV0gPSBcImNvbW1hbmRMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kQnV0dG9uXCJdID0gNl0gPSBcImNvbXBvdW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kTGlua1wiXSA9IDddID0gXCJjb21wb3VuZExpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiaGVyb0J1dHRvblwiXSA9IDhdID0gXCJoZXJvQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImhlcm9MaW5rXCJdID0gOV0gPSBcImhlcm9MaW5rXCI7XG59KShleHBvcnRzLkJ1dHRvblRlbXBsYXRlVHlwZSB8fCAoZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGUgPSB7fSkpO1xudmFyIEJ1dHRvblRlbXBsYXRlVHlwZSA9IGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UZW1wbGF0ZVR5cGUudHNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2FsbG91dFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2NhbGxvdXRUeXBlRW51bScpO1xudmFyIGNhbGxvdXRBcnJvd0VudW1fMSA9IHJlcXVpcmUoJy4vY2FsbG91dEFycm93RW51bScpO1xudmFyIENhbGxvdXRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIENhbGxvdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIENhbGxvdXRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dENvbnRyb2xsZXIgPSBDYWxsb3V0Q29udHJvbGxlcjtcbnZhciBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWhlYWRlclwiPjxwIGNsYXNzPVwibXMtQ2FsbG91dC10aXRsZVwiIG5nLXRyYW5zY2x1ZGU+PC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgbWFpbldyYXBwZXIgPSBpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XG4gICAgICAgIGlmICghbmcuaXNVbmRlZmluZWQobWFpbldyYXBwZXIpICYmIG1haW5XcmFwcGVyLmhhc0NsYXNzKCdtcy1DYWxsb3V0LW1haW4nKSkge1xuICAgICAgICAgICAgdmFyIGRldGFjaGVkSGVhZGVyID0gaW5zdGFuY2VFbGVtZW50LmRldGFjaCgpO1xuICAgICAgICAgICAgbWFpbldyYXBwZXIucHJlcGVuZChkZXRhY2hlZEhlYWRlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSA9IENhbGxvdXRIZWFkZXJEaXJlY3RpdmU7XG52YXIgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRDb250ZW50RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWNvbnRlbnRcIj48cCBjbGFzcz1cIm1zLUNhbGxvdXQtc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIENhbGxvdXRDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0Q29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXRDb250ZW50RGlyZWN0aXZlID0gQ2FsbG91dENvbnRlbnREaXJlY3RpdmU7XG52YXIgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWFjdGlvbnNcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeP3VpZkNhbGxvdXQnO1xuICAgIH1cbiAgICBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY2FsbG91dENvbnRyb2xsZXIpIHtcbiAgICAgICAgaWYgKG5nLmlzT2JqZWN0KGNhbGxvdXRDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJHNjb3BlLiR3YXRjaCgnaGFzU2VwYXJhdG9yJywgZnVuY3Rpb24gKGhhc1NlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNoaWxkcmVuID0gaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYnV0dG9uSW5kZXggPSAwOyBidXR0b25JbmRleCA8IGFjdGlvbkNoaWxkcmVuLmxlbmd0aDsgYnV0dG9uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbkNoaWxkcmVuLmVxKGJ1dHRvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hZGRDbGFzcygnbXMtQ2FsbG91dC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFucyA9IGFjdGlvbi5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzcGFuSW5kZXggPSAwOyBzcGFuSW5kZXggPCBhY3Rpb25TcGFucy5sZW5ndGg7IHNwYW5JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvblNwYW4gPSBhY3Rpb25TcGFucy5lcShzcGFuSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24tbGFiZWwnKSB8fCBhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24taWNvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblNwYW4uYWRkQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSA9IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlO1xudmFyIENhbGxvdXREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0IG1zLUNhbGxvdXQtLWFycm93e3thcnJvd0RpcmVjdGlvbn19XCIgJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtQ2FsbG91dC0tYWN0aW9uVGV4dFxcJzogaGFzU2VwYXJhdG9yLCBcXCdtcy1DYWxsb3V0LS1PT0JFXFwnOiB1aWZUeXBlPT1cXCdvb2JlXFwnLCcgK1xuICAgICAgICAgICAgJyBcXCdtcy1DYWxsb3V0LS1QZWVrXFwnOiB1aWZUeXBlPT1cXCdwZWVrXFwnLCBcXCdtcy1DYWxsb3V0LS1jbG9zZVxcJzogY2xvc2VCdXR0b259XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtbWFpblwiPjxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj48L2Rpdj48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkNhbGxvdXQnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nU2hvdzogJz0/JyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDYWxsb3V0Q29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2FsbG91dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENhbGxvdXREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBjYWxsb3V0Q29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndWlmVHlwZScsIGZ1bmN0aW9uIChjYWxsb3V0VHlwZSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGNhbGxvdXRUeXBlRW51bV8xLkNhbGxvdXRUeXBlW2NhbGxvdXRUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgY2FsbG91dFR5cGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlR5cGUuIEl0IHNob3VsZCBiZSBvb2JlIG9yIHBlZWsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghYXR0cnMudWlmQXJyb3cpIHtcbiAgICAgICAgICAgIHNjb3BlLmFycm93RGlyZWN0aW9uID0gJ0xlZnQnO1xuICAgICAgICB9XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCd1aWZBcnJvdycsIGZ1bmN0aW9uIChhdHRyQXJyb3dEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChjYWxsb3V0QXJyb3dFbnVtXzEuQ2FsbG91dEFycm93W2F0dHJBcnJvd0RpcmVjdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJBcnJvd0RpcmVjdGlvbiArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmQXJyb3cuIEl0IHNob3VsZCBiZSBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNhcGl0YWxpemVkRGlyZWN0aW9uID0gKGF0dHJBcnJvd0RpcmVjdGlvbi5jaGFyQXQoMCkpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBjYXBpdGFsaXplZERpcmVjdGlvbiArPSAoYXR0ckFycm93RGlyZWN0aW9uLnNsaWNlKDEpKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgc2NvcGUuYXJyb3dEaXJlY3Rpb24gPSBjYXBpdGFsaXplZERpcmVjdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmhhc1NlcGFyYXRvciA9ICghbmcuaXNVbmRlZmluZWQoYXR0cnMudWlmQWN0aW9uVGV4dCkgfHwgIW5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlNlcGFyYXRvcikpO1xuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNsb3NlKSkge1xuICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uRWxlbWVudCA9IG5nLmVsZW1lbnQoJzxidXR0b24gY2xhc3M9XCJtcy1DYWxsb3V0LWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPicgK1xuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT4nICtcbiAgICAgICAgICAgICAgICAnPC9idXR0b24+Jyk7XG4gICAgICAgICAgICB2YXIgY2FsbG91dERpdiA9IGluc3RhbmNlRWxlbWVudC5maW5kKCdkaXYnKS5lcSgwKTtcbiAgICAgICAgICAgIGNhbGxvdXREaXYuYXBwZW5kKGNsb3NlQnV0dG9uRWxlbWVudCk7XG4gICAgICAgICAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VFbGVtZW50LmJpbmQoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzTW91c2VPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50LmJpbmQoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzTW91c2VPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnbmdTaG93JywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzQ2xvc2luZ0J5QnV0dG9uQ2xpY2sgPSAhbmV3VmFsdWUgJiYgc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkO1xuICAgICAgICAgICAgaWYgKGlzQ2xvc2luZ0J5QnV0dG9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gc2NvcGUuaXNNb3VzZU92ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2lzTW91c2VPdmVyJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgICBpZiAoIW5ld1ZhbCAmJiBvbGRWYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNjb3BlLmNsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXREaXJlY3RpdmUgPSBDYWxsb3V0RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXQnLCBDYWxsb3V0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0SGVhZGVyJywgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dENvbnRlbnQnLCBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEFjdGlvbnMnLCBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQ2FsbG91dFR5cGUpIHtcbiAgICBDYWxsb3V0VHlwZVtDYWxsb3V0VHlwZVtcIm9vYmVcIl0gPSAwXSA9IFwib29iZVwiO1xuICAgIENhbGxvdXRUeXBlW0NhbGxvdXRUeXBlW1wicGVla1wiXSA9IDFdID0gXCJwZWVrXCI7XG59KShleHBvcnRzLkNhbGxvdXRUeXBlIHx8IChleHBvcnRzLkNhbGxvdXRUeXBlID0ge30pKTtcbnZhciBDYWxsb3V0VHlwZSA9IGV4cG9ydHMuQ2FsbG91dFR5cGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0VHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKENhbGxvdXRBcnJvdykge1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJsZWZ0XCJdID0gMF0gPSBcImxlZnRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wicmlnaHRcIl0gPSAxXSA9IFwicmlnaHRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1widG9wXCJdID0gMl0gPSBcInRvcFwiO1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJib3R0b21cIl0gPSAzXSA9IFwiYm90dG9tXCI7XG59KShleHBvcnRzLkNhbGxvdXRBcnJvdyB8fCAoZXhwb3J0cy5DYWxsb3V0QXJyb3cgPSB7fSkpO1xudmFyIENhbGxvdXRBcnJvdyA9IGV4cG9ydHMuQ2FsbG91dEFycm93O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dEFycm93RW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2hvaWNlZmllbGRUeXBlRW51bV8xID0gcmVxdWlyZSgnLi9jaG9pY2VmaWVsZFR5cGVFbnVtJyk7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZFwiPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBpZD1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtQ2hvaWNlRmllbGQtaW5wdXRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIiB2YWx1ZT1cInt7dmFsdWV9fVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiAgJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctdHJ1ZS12YWx1ZT1cInt7bmdUcnVlVmFsdWV9fVwiIG5nLWZhbHNlLXZhbHVlPVwie3tuZ0ZhbHNlVmFsdWV9fVwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtQ2hvaWNlRmllbGQtZmllbGRcIj48c3BhbiBjbGFzcz1cIm1zLUxhYmVsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkNob2ljZWZpZWxkT3B0aW9uJywgJ14/dWlmQ2hvaWNlZmllbGRHcm91cCddO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdGYWxzZVZhbHVlOiAnQCcsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPScsXG4gICAgICAgICAgICBuZ1RydWVWYWx1ZTogJ0AnLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0AnLFxuICAgICAgICAgICAgdmFsdWU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG4gICAgfVxuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgaW5wdXQgPSB0ZW1wbGF0ZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgaWYgKCEoJ25nTW9kZWwnIGluIHRlbXBsYXRlQXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ25nLW1vZGVsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIGNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNob2ljZWZpZWxkVHlwZUVudW1fMS5DaG9pY2VmaWVsZFR5cGVbbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2hvaWNlZmllbGQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmVHlwZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tlZCA9IChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5nZXRWaWV3VmFsdWUoKSA9PT0gYXR0cnMudmFsdWUpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5hZGRSZW5kZXIocmVuZGVyXzEpO1xuICAgICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3ZhbHVlJywgcmVuZGVyXzEpO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAgICAgLm9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5yZW1vdmVSZW5kZXIocmVuZGVyXzEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudFNjb3BlID0gc2NvcGUuJHBhcmVudC4kcGFyZW50O1xuICAgICAgICB2YXIgY2hlY2tEaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycyAmJiBhdHRycy5kaXNhYmxlZDtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gc2NvcGUuZGlzYWJsZWQgfHwgKHBhcmVudFNjb3BlICE9IG51bGwgJiYgcGFyZW50U2NvcGUuZGlzYWJsZWQpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5zdGFuY2VFbGVtZW50LmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGNoZWNrRGlzYWJsZWQoKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyZW50U2NvcGUgPT0gbnVsbCA/ICcnIDogcGFyZW50U2NvcGUuZGlzYWJsZWQ7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgY2hlY2tEaXNhYmxlZCgpOyB9KSk7XG4gICAgICAgIGNoZWNrRGlzYWJsZWQoKTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlID0gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXAtdGl0bGVcIj48bmctdHJhbnNjbHVkZSAvPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbnZhciBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLnJlbmRlckZucyA9IFtdO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuYWRkUmVuZGVyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRm5zLnB1c2goZm4pO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZVJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5zcGxpY2UodGhpcy5yZW5kZXJGbnMuaW5kZXhPZihmbikpO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnNldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldFZpZXdWYWx1ZSh2YWx1ZSwgZXZlbnRUeXBlKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVuZGVyRm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZuc1tpXSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jaG9pY2VmaWVsZCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRPcHRpb24nLCBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRHcm91cCcsIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNob2ljZWZpZWxkR3JvdXBUaXRsZScsIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQ2hvaWNlZmllbGRUeXBlKSB7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcInJhZGlvXCJdID0gMF0gPSBcInJhZGlvXCI7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcImNoZWNrYm94XCJdID0gMV0gPSBcImNoZWNrYm94XCI7XG59KShleHBvcnRzLkNob2ljZWZpZWxkVHlwZSB8fCAoZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGUgPSB7fSkpO1xudmFyIENob2ljZWZpZWxkVHlwZSA9IGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIENvbW1hbmRCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNvbW1hbmRCYXJcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgdWlmU2VhcmNoVGVybTogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbW1hbmRCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICB7XG4gICAgICAgICAgICBzY29wZS5mb2N1c1NlYXJjaElucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmNsZWFyU2VhcmNoVGVybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZTZWFyY2hUZXJtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzY29wZS5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBDb21tYW5kQmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckRpcmVjdGl2ZSA9IENvbW1hbmRCYXJEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaFxcXCIgbmctY2xhc3M9XFxcIiRwYXJlbnQuaXNTZWFyY2hBY3RpdmUgPT0gdHJ1ZSA/ICdpcy1hY3RpdmUnIDogJyc7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyRwYXJlbnQucGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cXFwiMVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1mb2N1cz1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9IHRydWU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWJsdXI9XFxcIiRwYXJlbnQuaXNTZWFyY2hBY3RpdmUgPSBmYWxzZTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XFxcIiRwYXJlbnQudWlmU2VhcmNoVGVybVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWljb25XcmFwcGVyIG1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvblNlYXJjaFdyYXBwZXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCIkcGFyZW50LmZvY3VzU2VhcmNoSW5wdXQoKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwic2VhcmNoXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaC1pY29uV3JhcHBlciBtcy1Db21tYW5kQmFyU2VhcmNoLWljb25DbGVhcldyYXBwZXIgbXMtZm9udC1zXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb3VzZWRvd249XFxcIiRwYXJlbnQuY2xlYXJTZWFyY2hUZXJtKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcInhcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgfVxuICAgIENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUgPSBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlO1xudmFyIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ29tbWFuZEJhci1zaWRlQ29tbWFuZHNcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJTaWRlRGlyZWN0aXZlID0gQ29tbWFuZEJhclNpZGVEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlKCR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhci1tYWluQXJlYVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbmctaWY9XFxcInVpZlNob3dPdmVyZmxvd1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbSBtcy1Db21tYW5kQmFySXRlbS0taWNvbk9ubHkgbXMtQ29tbWFuZEJhckl0ZW0tb3ZlcmZsb3dcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGFzcz1cXFwib3ZlcmZsb3dWaXNpYmxlID09IHRydWUgPyAnaXMtdmlzaWJsZScgOiAnJztcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwib3Blbk92ZXJmbG93TWVudSgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwibXMtQ29tbWFuZEJhckl0ZW0tbGlua1xcXCIgdGFiaW5kZXg9XFxcIjJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJlbGxpcHNpc1xcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29tbWFuZEJhck1haW5Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmU2hvd092ZXJmbG93OiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkdGltZW91dCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJNYWluRGlyZWN0aXZlKCR0aW1lb3V0KTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgICAgICBzY29wZS5vcGVuT3ZlcmZsb3dNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9ICFzY29wZS5vdmVyZmxvd01lbnVPcGVuO1xuICAgICAgICAgICAgdmFyIGNvbnRleHR1YWxNZW51O1xuICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgPSBcIiA8dWlmLWNvbnRleHR1YWwtbWVudSBjbGFzcz1cXFwibXMtQ29tbWFuZEJhci1vdmVyZmxvd01lbnVcXFwiXFxuICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwib3ZlcmZsb3dNZW51T3BlblxcXCJcXG4gICAgICAgICAgICAgIHVpZi1jbG9zZS1vbi1jbGljaz1cXFwiZmFsc2VcXFwiPlwiO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93IC5tcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlciB1bCcpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5oaWRkZW5JdGVtcywgZnVuY3Rpb24gKG1lbnVpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lbnVpdGVtLnN1Ym1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gXCI8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIG5nLW1vZGVsPVxcXCJoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPSdvcGVuT3ZlcmZsb3dJdGVtKGhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udGV4dCdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctc2hvdz0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnZpc2libGUnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJzdWJNZW51XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRleHR1YWwtbWVudT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9J29wZW5PdmVyZmxvd0l0ZW0oc3ViaXRlbSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0nc3ViaXRlbS50ZXh0J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcImxpbmtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInN1Yml0ZW0gaW4gaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnN1Ym1lbnVpdGVtcyB0cmFjayBieSAkaW5kZXhcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9IFwiPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbSBuZy1tb2RlbD1cXFwiaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz0nb3Blbk92ZXJmbG93SXRlbShoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0pJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnRleHQnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXNob3c9J2hpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXS52aXNpYmxlJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGlua1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9ICc8Lzx1aWYtY29udGV4dHVhbC1tZW51Pic7XG4gICAgICAgICAgICB2YXIgbWVudTtcbiAgICAgICAgICAgIG1lbnUgPSBlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdyAubXMtQ29tbWFuZEJhckl0ZW0tbGlua1dyYXBwZXInKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChtZW51KS5hcHBlbmQoY3RybC4kY29tcGlsZShjb250ZXh0dWFsTWVudSkoc2NvcGUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUubG9hZE1lbnVJdGVtcyA9IGZ1bmN0aW9uIChjb21tYW5kSXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbVdpZHRoID0gMDtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbUluZGV4ID0gMDtcbiAgICAgICAgICAgIHNjb3BlLmNvbW1hbmRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbW1hbmRJdGVtcywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmhhc0NsYXNzKCdtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdycpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJdGVtV2lkdGggKz0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29tbWFuZEl0ZW1zLnB1c2goeyBpbmRleDogY29tbWFuZEl0ZW1JbmRleCwgb2Zmc2V0OiBjb21tYW5kSXRlbVdpZHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSXRlbUluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLm9wZW5PdmVyZmxvd0l0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGl0ZW0uc3VibWVudS5jaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Ym1lbnVpdGVtO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS50ZXh0ID0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLm1lbnVUeXBlID0gJ2l0ZW0nO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5jaGlsZGl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5pID0gaXRlbS5zdWJtZW51aXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5wYXJlbnQgPSBpdGVtLmk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zLnB1c2goc3VibWVudWl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3RybC4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkaXRlbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtpdGVtLnBhcmVudF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbnRleHR1YWxNZW51LWl0ZW0nKVtpdGVtLmldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG0pLnRyaWdnZXJIYW5kbGVyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbaXRlbS5pXSkudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZEJhckl0ZW1zO1xuICAgICAgICAgICAgY29tbWFuZEJhckl0ZW1zID0gYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXItbWFpbkFyZWEgLm1zLUNvbW1hbmRCYXJJdGVtJykpO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjQwICYmIHNjb3BlLm1vYmlsZVN3aXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGNvbW1hbmRCYXJJdGVtcyk7XG4gICAgICAgICAgICAgICAgc2NvcGUubW9iaWxlU3dpdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDY0MCAmJiBzY29wZS5tb2JpbGVTd2l0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGNvbW1hbmRCYXJJdGVtcyk7XG4gICAgICAgICAgICAgICAgc2NvcGUubW9iaWxlU3dpdGNoID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuY29tbWFuZEl0ZW1zLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm9mZnNldCA+PSBlbGVtLnByb3AoJ29mZnNldFdpZHRoJykgLSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbZWxlbWVudC5pbmRleF0pLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaGlkZGVuSXRlbXNbZWxlbWVudC5pbmRleF0udmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtlbGVtZW50LmluZGV4XSkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5oaWRkZW5JdGVtc1tlbGVtZW50LmluZGV4XS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3RybC4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJG9uKCd1aWYtY29tbWFuZC1iYXItcmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLiRicm9hZGNhc3QoJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUubG9hZE1lbnVJdGVtcyhhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKSkpO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhck1haW5EaXJlY3RpdmUgPSBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJNYWluQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkY29tcGlsZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kY29tcGlsZSA9ICRjb21waWxlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIENvbW1hbmRCYXJNYWluQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT3ZlcmZsb3dJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5pID0gdGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWRkZW5JdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH07XG4gICAgQ29tbWFuZEJhck1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckY29tcGlsZScsICckdGltZW91dCddO1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG52YXIgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclwiPicgK1xuICAgICAgICAgICAgJyA8YSBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtcIj4nICtcbiAgICAgICAgICAgICcgPC9hPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmQ29tbWFuZEJhck1haW4nO1xuICAgIH1cbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkl0ZW07XG4gICAgICAgICAgICBoaWRkZW5JdGVtID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9uZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5hZGQoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTmFtZS5pbmRleE9mKCdtcy1mb250LScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0LmFkZCgnbXMtZm9udC1tJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0udGV4dCA9IGNsb25lW2ldLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVTCcgJiYgY2xvbmVbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLnN1Ym1lbnUgPSBjbG9uZVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChoaWRkZW5JdGVtLnN1Ym1lbnUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLm1lbnVUeXBlID0gJ2xpbmsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuSXRlbS5tZW51VHlwZSA9ICdzdWJNZW51JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3RybC5hZGRPdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsgPiB1aWYtaWNvbicpKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbScpKS5hZGRDbGFzcygnbXMtQ29tbWFuZEJhckl0ZW0taGFzVGV4dE9ubHknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSBDb21tYW5kQmFySXRlbURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbW1hbmRiYXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXInLCBDb21tYW5kQmFyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyU2VhcmNoJywgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhckl0ZW0nLCBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhck1haW4nLCBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhclNpZGUnLCBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZW50RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPHNwYW4gY2xhc3M9XFxcInVpZi1jb250ZW50XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcbiAgICB9XG4gICAgQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbnRlbnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRlbnREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZW50JztcbiAgICByZXR1cm4gQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRlbnREaXJlY3RpdmUgPSBDb250ZW50RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGVudCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoQ29udGVudERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBNZW51SXRlbVR5cGVzO1xuKGZ1bmN0aW9uIChNZW51SXRlbVR5cGVzKSB7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wibGlua1wiXSA9IDBdID0gXCJsaW5rXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiZGl2aWRlclwiXSA9IDFdID0gXCJkaXZpZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiaGVhZGVyXCJdID0gMl0gPSBcImhlYWRlclwiO1xuICAgIE1lbnVJdGVtVHlwZXNbTWVudUl0ZW1UeXBlc1tcInN1Yk1lbnVcIl0gPSAzXSA9IFwic3ViTWVudVwiO1xufSkoTWVudUl0ZW1UeXBlcyB8fCAoTWVudUl0ZW1UeXBlcyA9IHt9KSk7XG52YXIgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkNvbnRleHR1YWxNZW51JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICc9P3VpZklzU2VsZWN0ZWQnLFxuICAgICAgICAgICAgb25DbGljazogJyZuZ0NsaWNrJyxcbiAgICAgICAgICAgIHRleHQ6ICc9P3VpZlRleHQnLFxuICAgICAgICAgICAgdHlwZTogJ0B1aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNZW51SXRlbVR5cGVzW3R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIHVuc3VwcG9ydGVkIG1lbnUgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgY29udGV4dCBtZW51LicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBNZW51SXRlbVR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gJ2Jvb2xlYW4nICYmICRzY29wZS5pc1NlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2ludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1zZWxlY3RlZFxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLXNlbGVjdGVkXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGF0dHJzLiRvYnNlcnZlKCdkaXNhYmxlZCcsIGZ1bmN0aW9uIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc0Rpc2FibGVkID0gISFkaXNhYmxlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHR1YWxNZW51Q29udHJvbGxlci5pc011bHRpU2VsZWN0aW9uTWVudSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5kZXNlbGVjdEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCgkc2NvcGUuaXNTZWxlY3RlZCkgJiYgISRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmNsb3NlU3ViTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzUm9vdE1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5jbG9zZVN1Yk1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRzY29wZS5vbkNsaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25DbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtZGVzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtY2xvc2UnLCBmdW5jdGlvbiAoZXZlbnQsIG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAkc2NvcGUuJGlkICE9PSBtZW51SXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGlsZE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5zdWJNZW51XSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rIG1zLUNvbnRleHR1YWxNZW51LWxpbmstLWhhc01lbnVcXFwiXFxuICAgICAgICAgIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1zdWJNZW51SWNvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtY29udGV4dC1zdWJtZW51XFxcIj48L2Rpdj5cXG4gICAgICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua10gPVxuICAgICAgICAgICAgXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cXFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rXFxcIiBuZy1jbGFzcz1cXFwieydpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsICdpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIlxcbiAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+PHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5oZWFkZXJdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtIG1zLUNvbnRleHR1YWxNZW51LWl0ZW0tLWhlYWRlclxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMuZGl2aWRlcl0gPSBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbSBtcy1Db250ZXh0dWFsTWVudS1pdGVtLS1kaXZpZGVyXFxcIj48L2xpPlwiO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQgJiYgISRzY29wZS50ZXh0ICYmICEkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS50eXBlICE9PSAnZGl2aWRlcicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtICcgK1xuICAgICAgICAgICAgICAgICAgICAneW91IG5lZWQgdG8gcHJvdmlkZSBhIHRleHQgZm9yIGEgY29udGV4dHVhbCBtZW51IGl0ZW0uXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT4geW91IG5lZWQgdG8gc3BlY2lmeSBlaXRoZXIgXFwndWlmLXRleHRcXCcgYXMgYXR0cmlidXRlIG9yIDx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgIF90aGlzLmluc2VydFN1Yk1lbnUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0SXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1pdGVtLWNvbnRlbnQnKSk7XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+JyArICRzY29wZS50ZXh0ICsgJzwvc3Bhbj4nKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0U3ViTWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLWNvbnRleHQtc3VibWVudScpKS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRleHR1YWxNZW51SXRlbSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Q2hpbGRNZW51ID0gZnVuY3Rpb24gKGNoaWxkTWVudUN0cmwpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGFzQ2hpbGRNZW51ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGRNZW51Q3RybCA9IGNoaWxkTWVudUN0cmw7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuICAgIHJldHVybiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG52YXIgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8dWwgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51XFxcIiBuZy10cmFuc2NsdWRlPjwvdWw+XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGNsb3NlT25DbGljazogJ0B1aWZDbG9zZU9uQ2xpY2snLFxuICAgICAgICAgICAgaXNPcGVuOiAnPT91aWZJc09wZW4nLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6ICdAdWlmTXVsdGlzZWxlY3QnXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBzZXRDbG9zZU9uQ2xpY2sgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xvc2VPbkNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5jbG9zZU9uQ2xpY2sgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0Q2xvc2VPbkNsaWNrKCRzY29wZS5jbG9zZU9uQ2xpY2spO1xuICAgICAgICAkYXR0cnMuJG9ic2VydmUoJ3VpZkNsb3NlT25DbGljaycsIHNldENsb3NlT25DbGljayk7XG4gICAgICAgIHZhciBwYXJlbnRNZW51SXRlbUN0cmwgPSAkZWxlbWVudC5jb250cm9sbGVyKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZChwYXJlbnRNZW51SXRlbUN0cmwpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51SXRlbUN0cmwuc2V0Q2hpbGRNZW51KGNvbnRleHR1YWxNZW51Q29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZCgkc2NvcGUubXVsdGlzZWxlY3QpICYmICRzY29wZS5tdWx0aXNlbGVjdC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdtcy1Db250ZXh0dWFsTWVudS0tbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51Q29udHJvbGxlcigkc2NvcGUsICRhbmltYXRlLCAkZWxlbWVudCwgJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZCA9IFtdO1xuICAgICAgICB0aGlzLmlzT3BlbkNsYXNzTmFtZSA9ICdpcy1vcGVuJztcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKCRlbGVtZW50LmNvbnRyb2xsZXIoQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpKSkge1xuICAgICAgICAgICAgJHNjb3BlLmlzUm9vdE1lbnUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzT3BlbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Jvb2xlYW4nICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIGludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1vcGVuXFwnLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgXFwnJyArIHR5cGVvZiBuZXdWYWx1ZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBhcyB2YWxpZCB0eXBlIGZvciBcXCd1aWYtaXMtb3BlblxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZXh0dWFsLW1lbnUgLz4uIFRoZSB2YWxpZCB0eXBlIGlzIGJvb2xlYW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkYW5pbWF0ZVtuZXdWYWx1ZSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXSgkZWxlbWVudCwgX3RoaXMuaXNPcGVuQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgX3RoaXMuZGVzZWxlY3RJdGVtcyh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kb24oJ3VpZi1tZW51LWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc1Jvb3RNZW51ICYmICRzY29wZS5jbG9zZU9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vblJvb3RNZW51Q2xvc2VkLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmRlc2VsZWN0SXRlbXMgPSBmdW5jdGlvbiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICBpZiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3VpZi1tZW51LWRlc2VsZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VTdWJNZW51cyA9IGZ1bmN0aW9uIChtZW51SXRlbVRvU2tpcCwgY2xvc2VSb290TWVudSkge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1jbG9zZScsIG1lbnVJdGVtVG9Ta2lwKTtcbiAgICAgICAgaWYgKGNsb3NlUm9vdE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1jbG9zZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSB0cnVlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc1Jvb3RNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXNSb290TWVudTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNNdWx0aVNlbGVjdGlvbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc01lbnVPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnXTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVDb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50c1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuaXNQaWNraW5nWWVhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BpY2tpbmdNb250aHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5qRWxlbWVudCA9ICQoJGVsZW1lbnRbMF0pO1xuICAgICAgICAkc2NvcGUuY3RybCA9IHRoaXM7XG4gICAgfVxuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5yYW5nZSA9IGZ1bmN0aW9uIChtaW4sIG1heCwgc3RlcCkge1xuICAgICAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgICAgICB2YXIgaW5wdXQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IG1pbjsgaSA8PSBtYXg7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgaW5wdXQucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0UGlja2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtVGV4dEZpZWxkLWZpZWxkJykucGlja2FkYXRlKCdwaWNrZXInKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFBpY2tlcigpLnNldCgnc2VsZWN0JywgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZSh2YWx1ZS5nZXRGdWxsWWVhcigpLCB2YWx1ZS5nZXRNb250aCgpLCB2YWx1ZS5nZXREYXRlKCkpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmluaXREYXRlcGlja2VyID0gZnVuY3Rpb24gKG5nTW9kZWwpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1UZXh0RmllbGQtZmllbGQnKS5waWNrYWRhdGUoe1xuICAgICAgICAgICAgY2xlYXI6ICcnLFxuICAgICAgICAgICAgY2xvc2U6ICcnLFxuICAgICAgICAgICAga2xhc3M6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6ICdtcy1EYXRlUGlja2VyLWlucHV0LS1hY3RpdmUnLFxuICAgICAgICAgICAgICAgIGJveDogJ21zLURhdGVQaWNrZXItZGF5UGlja2VyJyxcbiAgICAgICAgICAgICAgICBkYXk6ICdtcy1EYXRlUGlja2VyLWRheScsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdtcy1EYXRlUGlja2VyLWRheS0tZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgIGZvY3VzZWQ6ICdtcy1EYXRlUGlja2VyLXBpY2tlci0tZm9jdXNlZCcsXG4gICAgICAgICAgICAgICAgZnJhbWU6ICdtcy1EYXRlUGlja2VyLWZyYW1lJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdtcy1EYXRlUGlja2VyLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgaG9sZGVyOiAnbXMtRGF0ZVBpY2tlci1ob2xkZXInLFxuICAgICAgICAgICAgICAgIGluZm9jdXM6ICdtcy1EYXRlUGlja2VyLWRheS0taW5mb2N1cycsXG4gICAgICAgICAgICAgICAgaW5wdXQ6ICdtcy1EYXRlUGlja2VyLWlucHV0JyxcbiAgICAgICAgICAgICAgICBtb250aDogJ21zLURhdGVQaWNrZXItbW9udGgnLFxuICAgICAgICAgICAgICAgIG5vdzogJ21zLURhdGVQaWNrZXItZGF5LS10b2RheScsXG4gICAgICAgICAgICAgICAgb3BlbmVkOiAnbXMtRGF0ZVBpY2tlci1waWNrZXItLW9wZW5lZCcsXG4gICAgICAgICAgICAgICAgb3V0Zm9jdXM6ICdtcy1EYXRlUGlja2VyLWRheS0tb3V0Zm9jdXMnLFxuICAgICAgICAgICAgICAgIHBpY2tlcjogJ21zLURhdGVQaWNrZXItcGlja2VyJyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogJ21zLURhdGVQaWNrZXItZGF5LS1zZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgdGFibGU6ICdtcy1EYXRlUGlja2VyLXRhYmxlJyxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5czogJ21zLURhdGVQaWNrZXItd2Vla2RheScsXG4gICAgICAgICAgICAgICAgd3JhcDogJ21zLURhdGVQaWNrZXItd3JhcCcsXG4gICAgICAgICAgICAgICAgeWVhcjogJ21zLURhdGVQaWNrZXIteWVhcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbml0Q3VzdG9tVmlldygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZGF5OiAnJyxcbiAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcGlja2VyID0gdGhpcy5nZXRQaWNrZXIoKTtcbiAgICAgICAgcGlja2VyLm9uKHtcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbFVwKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBwaWNrZXIuZ2V0KCdzZWxlY3QnLCAneXl5eS1tbS1kZCcpO1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRDdXN0b21WaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG1vbnRoQ29udHJvbHMgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLW1vbnRoQ29tcG9uZW50cycpO1xuICAgICAgICB2YXIgJGdvVG9kYXkgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLWdvVG9kYXknKTtcbiAgICAgICAgdmFyICRtb250aFBpY2tlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXItbW9udGhQaWNrZXInKTtcbiAgICAgICAgdmFyICR5ZWFyUGlja2VyID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci15ZWFyUGlja2VyJyk7XG4gICAgICAgIHZhciAkcGlja2VyV3JhcHBlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXItd3JhcCcpO1xuICAgICAgICB2YXIgJHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJG1vbnRoQ29udHJvbHMuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkZ29Ub2RheS5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICRtb250aFBpY2tlci5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICR5ZWFyUGlja2VyLmFwcGVuZFRvKCRwaWNrZXJXcmFwcGVyKTtcbiAgICAgICAgJG1vbnRoQ29udHJvbHMub24oJ2NsaWNrJywgJy5qcy1wcmV2TW9udGgnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykubW9udGggLSAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobnVsbCwgbmV3TW9udGgsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhDb250cm9scy5vbignY2xpY2snLCAnLmpzLW5leHRNb250aCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS5tb250aCArIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShudWxsLCBuZXdNb250aCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLXByZXZZZWFyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciAtIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtbmV4dFllYXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3WWVhciA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyICsgMTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkeWVhclBpY2tlci5vbignY2xpY2snLCAnLmpzLXByZXZEZWNhZGUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3WWVhciA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyIC0gMTA7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1uZXh0RGVjYWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciArIDEwO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRnb1RvZGF5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgJHBpY2tlci5zZXQoJ3NlbGVjdCcsIG5vdyk7XG4gICAgICAgICAgICBzZWxmLmpFbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1waWNraW5nTW9udGhzJykucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1jaGFuZ2VEYXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSBjdXJyZW50RGF0ZS55ZWFyO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gKyQodGhpcykuYXR0cignZGF0YS1tb250aCcpO1xuICAgICAgICAgICAgdmFyIG5ld0RheSA9IGN1cnJlbnREYXRlLmRheTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuakVsZW1lbnQuaGFzQ2xhc3MoJ2lzLXBpY2tpbmdNb250aHMnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuakVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdNb250aHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1jaGFuZ2VEYXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSArJCh0aGlzKS5hdHRyKCdkYXRhLXllYXInKTtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9IGN1cnJlbnREYXRlLm1vbnRoO1xuICAgICAgICAgICAgdmFyIG5ld0RheSA9IGN1cnJlbnREYXRlLmRheTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuakVsZW1lbnQuaGFzQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ1llYXJzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtc2hvd01vbnRoUGlja2VyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmlzUGlja2luZ01vbnRocyA9ICFzZWxmLmlzUGlja2luZ01vbnRocztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtc2hvd1llYXJQaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuaXNQaWNraW5nWWVhcnMgPSAhc2VsZi5pc1BpY2tpbmdZZWFycztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi4kc2NvcGUuaGlnaGxpZ2h0ZWRWYWx1ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zY3JvbGxVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRoaXMuakVsZW1lbnQub2Zmc2V0KCkudG9wIH0sIDM2Nyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlID0gZnVuY3Rpb24gKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpIHtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIGlmIChuZXdZZWFyID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld1llYXIgPSBwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNb250aCA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdNb250aCA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEYXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3RGF5ID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0JykuZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBwaWNrZXIuc2V0KCdoaWdobGlnaHQnLCBbbmV3WWVhciwgbmV3TW9udGgsIG5ld0RheV0pO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWdobGlnaHRlZFZhbHVlID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gRGF0ZXBpY2tlckNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EYXRlcGlja2VyQ29udHJvbGxlciA9IERhdGVwaWNrZXJDb250cm9sbGVyO1xudmFyIERhdGVwaWNrZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyXFwnOiB0cnVlLCBcXCdpcy1waWNraW5nWWVhcnNcXCc6IGN0cmwuaXNQaWNraW5nWWVhcnMsIFxcJ2lzLXBpY2tpbmdNb250aHNcXCc6IGN0cmwuaXNQaWNraW5nTW9udGhzfVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1UZXh0RmllbGRcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLURhdGVQaWNrZXItZXZlbnQgbXMtSWNvbiBtcy1JY29uLS1ldmVudFwiPjwvaT4nICtcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJtcy1UZXh0RmllbGQtZmllbGRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctZGlzYWJsZWQ9XCJpc0Rpc2FibGVkXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbW9udGhDb21wb25lbnRzXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLW5leHRNb250aCBqcy1uZXh0TW9udGhcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldk1vbnRoIGpzLXByZXZNb250aFwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItaGVhZGVyVG9nZ2xlVmlldyBqcy1zaG93TW9udGhQaWNrZXJcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItZ29Ub2RheSBqcy1nb1RvZGF5XCI+R28gdG8gdG9kYXk8L3NwYW4+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbW9udGhQaWNrZXJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci15ZWFyQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0WWVhciBqcy1uZXh0WWVhclwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1wcmV2WWVhciBqcy1wcmV2WWVhclwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItY3VycmVudFllYXIganMtc2hvd1llYXJQaWNrZXJcIj57e2hpZ2hsaWdodGVkVmFsdWUueWVhcn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItb3B0aW9uR3JpZFwiID4nICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1yZXBlYXQ9XCJtb250aCBpbiBtb250aHNBcnJheVwiJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlci1tb250aE9wdGlvbiBqcy1jaGFuZ2VEYXRlXFwnOiB0cnVlLCAnICtcbiAgICAgICAgICAgICdcXCdpcy1oaWdobGlnaHRlZFxcJzogaGlnaGxpZ2h0ZWRWYWx1ZS5tb250aCA9PSAkaW5kZXh9XCInICtcbiAgICAgICAgICAgICdkYXRhLW1vbnRoPVwie3skaW5kZXh9fVwiPicgK1xuICAgICAgICAgICAgJ3t7bW9udGh9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci15ZWFyUGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItZGVjYWRlQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0RGVjYWRlIGpzLW5leHREZWNhZGVcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldkRlY2FkZSBqcy1wcmV2RGVjYWRlXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25MZWZ0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1jdXJyZW50RGVjYWRlXCI+e3toaWdobGlnaHRlZFZhbHVlLnllYXIgLSAxMH19IC0ge3toaWdobGlnaHRlZFZhbHVlLnllYXJ9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW9wdGlvbkdyaWRcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyLXllYXJPcHRpb24ganMtY2hhbmdlRGF0ZVxcJzogdHJ1ZSwnICtcbiAgICAgICAgICAgICdcXCdpcy1oaWdobGlnaHRlZFxcJzogaGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyID09IHllYXJ9XCIgJyArXG4gICAgICAgICAgICAnbmctcmVwZWF0PVwieWVhciBpbiBjdHJsLnJhbmdlKGhpZ2hsaWdodGVkVmFsdWUueWVhciAtIDEwLCBoaWdobGlnaHRlZFZhbHVlLnllYXIpXCInICtcbiAgICAgICAgICAgICdkYXRhLXllYXI9XCJ7e3llYXJ9fVwiPnt7eWVhcn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERhdGVwaWNrZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHVpZk1vbnRoczogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmRGF0ZXBpY2tlcicsICc/bmdNb2RlbCddO1xuICAgIH1cbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGF0ZXBpY2tlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGluayxcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKCRzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBpbnN0YW5jZUF0dHJpYnV0ZXMsIGN0cmxzKSB7XG4gICAgICAgIGlmICghJHNjb3BlLnVpZk1vbnRocykge1xuICAgICAgICAgICAgJHNjb3BlLnVpZk1vbnRocyA9ICdKYW4sIEZlYiwgTWFyLCBBcHIsIE1heSwgSnVuLCBKdWwsIEF1ZywgU2VwLCBPY3QsIE5vdiwgRGVjJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoISRzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgJHNjb3BlLnBsYWNlaG9sZGVyID0gJ1NlbGVjdCBhIGRhdGUnO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5tb250aHNBcnJheSA9ICRzY29wZS51aWZNb250aHMuc3BsaXQoJywnKTtcbiAgICAgICAgaWYgKCRzY29wZS5tb250aHNBcnJheS5sZW5ndGggIT09IDEyKSB7XG4gICAgICAgICAgICB0aHJvdyAnTW9udGhzIHNldHRpbmcgc2hvdWxkIGhhdmUgMTIgbW9udGhzLCBzZXBhcmF0ZWQgYnkgYSBjb21tYSc7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VBdHRyaWJ1dGVzLiRvYnNlcnZlKCdkaXNhYmxlZCcsIGZ1bmN0aW9uIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzRGlzYWJsZWQgPSAhIWRpc2FibGVkO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgZGF0ZXBpY2tlckNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG5nTW9kZWwgPSBjdHJsc1sxXTtcbiAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuaW5pdERhdGVwaWNrZXIobmdNb2RlbCk7XG4gICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChuZ01vZGVsLiRtb2RlbFZhbHVlICE9PSAnJyAmJiB0eXBlb2YgbmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5nTW9kZWwuJG1vZGVsVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLnNldFZhbHVlKGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuc2V0VmFsdWUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIERhdGVwaWNrZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EYXRlcGlja2VyRGlyZWN0aXZlID0gRGF0ZXBpY2tlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRhdGVwaWNrZXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRhdGVwaWNrZXInLCBEYXRlcGlja2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBkaWFsb2dFbnVtc190c18xID0gcmVxdWlyZSgnLi9kaWFsb2dFbnVtcy50cycpO1xudmFyIERpYWxvZ0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0NvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBEaWFsb2dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xudmFyIERpYWxvZ0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2dcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwieyBcXCdtcy1EaWFsb2ctLWNsb3NlXFwnOiB1aWZDbG9zZT09XFwndHJ1ZVxcJycgK1xuICAgICAgICAgICAgJywgXFwnbXMtRGlhbG9nLS1sZ0hlYWRlclxcJzogdWlmVHlwZT09XFwnaGVhZGVyXFwnJyArXG4gICAgICAgICAgICAnLCBcXCdtcy1EaWFsb2ctLW11bHRpbGluZVxcJzogdWlmVHlwZT09XFwnbXVsdGlsaW5lXFwnIH1cIj4nICtcbiAgICAgICAgICAgICc8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XCJ7e3VpZk92ZXJsYXl9fVwiPjwvdWlmLW92ZXJsYXk+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1tYWluXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmQ2xvc2U6ICdAJyxcbiAgICAgICAgICAgIHVpZk92ZXJsYXk6ICdAJyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFsb2dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAobmV3VmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dFbnVtc190c18xLkRpYWxvZ1R5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nIC0gVW5zdXBwb3J0ZWQgdHlwZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dEaXJlY3RpdmUgPSBEaWFsb2dEaXJlY3RpdmU7XG52YXIgRGlhbG9nSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeXnVpZkRpYWxvZyc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiJHBhcmVudC51aWZDbG9zZVwiIGNsYXNzPVwibXMtRGlhbG9nLWJ1dHRvbiBtcy1EaWFsb2ctYnV0dG9uLS1jbG9zZVwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dIZWFkZXJEaXJlY3RpdmUgPSBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG52YXIgRGlhbG9nQ29udGVudERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQ29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWNvbnRlbnRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRlbnREaXJlY3RpdmUgPSBEaWFsb2dDb250ZW50RGlyZWN0aXZlO1xudmFyIERpYWxvZ0lubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dJbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0lubmVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nSW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dJbm5lckRpcmVjdGl2ZSA9IERpYWxvZ0lubmVyRGlyZWN0aXZlO1xudmFyIERpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ1N1YnRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHAgY2xhc3M9XCJtcy1EaWFsb2ctc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPic7XG4gICAgfVxuICAgIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nU3VidGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlO1xudmFyIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zQ29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xudmFyIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctYWN0aW9uc1wiPjxkaXYgbmctY2xhc3M9XCJ7IFxcJ21zLURpYWxvZy1hY3Rpb25zUmlnaHRcXCc6IHVpZlBvc2l0aW9uPT1cXCdyaWdodFxcJ31cIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlBvc2l0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUG9zaXRpb24nLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChuZXdWYWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZ0VudW1zX3RzXzEuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZyAtIFVuc3VwcG9ydGVkIHR5cGU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZQb3NpdGlvbiArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zRGlyZWN0aXZlID0gRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZycsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZycsIERpYWxvZ0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nSGVhZGVyJywgRGlhbG9nSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dDb250ZW50JywgRGlhbG9nQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nSW5uZXInLCBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nU3VidGV4dCcsIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0FjdGlvbnMnLCBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKERpYWxvZ1R5cGVFbnVtKSB7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcImhlYWRlclwiXSA9IDFdID0gXCJoZWFkZXJcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcIm11bHRpbGluZVwiXSA9IDJdID0gXCJtdWx0aWxpbmVcIjtcbn0pKGV4cG9ydHMuRGlhbG9nVHlwZUVudW0gfHwgKGV4cG9ydHMuRGlhbG9nVHlwZUVudW0gPSB7fSkpO1xudmFyIERpYWxvZ1R5cGVFbnVtID0gZXhwb3J0cy5EaWFsb2dUeXBlRW51bTtcbihmdW5jdGlvbiAoRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSkge1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcImxlZnRcIl0gPSAxXSA9IFwibGVmdFwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcInJpZ2h0XCJdID0gMl0gPSBcInJpZ2h0XCI7XG59KShleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gfHwgKGV4cG9ydHMuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSA9IHt9KSk7XG52YXIgRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSA9IGV4cG9ydHMuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmRHJvcGRvd24nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBkcm9wZG93bkNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKCFkcm9wZG93bkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHRocm93ICdEcm9wZG93biBjb250cm9sbGVyIG5vdCBmb3VuZCEnO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudFxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuc2V0Vmlld1ZhbHVlKGluc3RhbmNlRWxlbWVudC5maW5kKCdzcGFuJykuaHRtbCgpLCBhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdmFsdWUgPSAnJyArIGRyb3Bkb3duQ29udHJvbGxlci5nZXRWaWV3VmFsdWUoKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlID09PSBhdHRycy52YWx1ZSkge1xuICAgICAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy50aXRsZSwgYXR0cnMudmFsdWUsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd25PcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ecm9wZG93bk9wdGlvbkRpcmVjdGl2ZSA9IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlO1xudmFyIERyb3Bkb3duQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25Db250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUsICRkb2N1bWVudCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICB9XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi4kc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5pc09wZW4gPSAhc2VsZi4kc2NvcGUuaXNPcGVuO1xuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIHZhciBkcm9wZG93bldpZHRoID0gYW5ndWxhci5lbGVtZW50KHRoaXMucXVlcnlTZWxlY3RvcignLm1zLURyb3Bkb3duJykpWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Ecm9wZG93bi1pdGVtcycpKVswXS5zdHlsZS53aWR0aCA9IGRyb3Bkb3duV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJHNjb3BlLmlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGRvY3VtZW50Lm9uKCdjbGljaycsIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZG9jdW1lbnQub2ZmKCdjbGljaycsIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gc2VsZi4kZWxlbWVudC5maW5kKCdsaScpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gb3B0aW9uLmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzZWxmLiRzY29wZS5uZ01vZGVsLiR2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLnNlbGVjdGVkVGl0bGUgPSBhbmd1bGFyLmVsZW1lbnQob3B0aW9uKS5maW5kKCdzcGFuJykuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodGl0bGUsIHZhbHVlLCBldmVudFR5cGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRzZXRWaWV3VmFsdWUodmFsdWUsIGV2ZW50VHlwZSk7XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5uZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnLCAnJGRvY3VtZW50J107XG4gICAgcmV0dXJuIERyb3Bkb3duQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkRyb3Bkb3duQ29udHJvbGxlciA9IERyb3Bkb3duQ29udHJvbGxlcjtcbnZhciBEcm9wZG93bkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGljaz1cImRyb3Bkb3duQ2xpY2tcIiAnICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cIntcXCdtcy1Ecm9wZG93blxcJyA6IHRydWUsIFxcJ2lzLW9wZW5cXCc6IGlzT3BlbiwgXFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfVwiIHRhYmluZGV4PVwiMFwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtRHJvcGRvd24tY2FyZXREb3duIG1zLUljb24gbXMtSWNvbi0tY2FyZXREb3duXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRHJvcGRvd24tdGl0bGVcIj57e3NlbGVjdGVkVGl0bGV9fTwvc3Bhbj48dWwgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtc1wiPjxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L3VsPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmRHJvcGRvd24nLCAnP25nTW9kZWwnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEcm9wZG93bkNvbnRyb2xsZXI7XG4gICAgfVxuICAgIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRHJvcGRvd25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERyb3Bkb3duRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgZHJvcGRvd25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBtb2RlbENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUubmdNb2RlbCA9IG1vZGVsQ29udHJvbGxlcjtcbiAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLmluaXQoKTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluc3RhbmNlRWxlbWVudC5hdHRyKCdkaXNhYmxlZCcpOyB9LCAoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHNjb3BlLmRpc2FibGVkID0gdHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJzsgfSkpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gaW5zdGFuY2VBdHRyaWJ1dGVzO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRHJvcGRvd25EaXJlY3RpdmUgPSBEcm9wZG93bkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRyb3Bkb3duJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bk9wdGlvbicsIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bicsIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd25EaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGljb25FbnVtXzEgPSByZXF1aXJlKCcuL2ljb25FbnVtJyk7XG52YXIgSWNvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEljb25Db250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgSWNvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBJY29uQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgSWNvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSWNvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0te3t1aWZUeXBlfX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBJY29uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnaWNvbic7XG4gICAgfVxuICAgIEljb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBJY29uRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpY29uRW51bV8xLkljb25FbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5pY29uIC0gVW5zdXBwb3J0ZWQgaWNvbjogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgaWNvbiAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBJY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuSWNvbkRpcmVjdGl2ZSA9IEljb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5pY29uJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZJY29uJywgSWNvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKEljb25FbnVtKSB7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydFwiXSA9IDBdID0gXCJhbGVydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnQyXCJdID0gMV0gPSBcImFsZXJ0MlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnRPdXRsaW5lXCJdID0gMl0gPSBcImFsZXJ0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duXCJdID0gM10gPSBcImFycm93RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duMlwiXSA9IDRdID0gXCJhcnJvd0Rvd24yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25MZWZ0XCJdID0gNV0gPSBcImFycm93RG93bkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93blJpZ2h0XCJdID0gNl0gPSBcImFycm93RG93blJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0xlZnRcIl0gPSA3XSA9IFwiYXJyb3dMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1JpZ2h0XCJdID0gOF0gPSBcImFycm93UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBcIl0gPSA5XSA9IFwiYXJyb3dVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcDJcIl0gPSAxMF0gPSBcImFycm93VXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwTGVmdFwiXSA9IDExXSA9IFwiYXJyb3dVcExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBSaWdodFwiXSA9IDEyXSA9IFwiYXJyb3dVcFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhc2NlbmRpbmdcIl0gPSAxM10gPSBcImFzY2VuZGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXRcIl0gPSAxNF0gPSBcImF0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhdHRhY2htZW50XCJdID0gMTVdID0gXCJhdHRhY2htZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiYWdcIl0gPSAxNl0gPSBcImJhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmFsbG9vblwiXSA9IDE3XSA9IFwiYmFsbG9vblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmVsbFwiXSA9IDE4XSA9IFwiYmVsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9hcmRzXCJdID0gMTldID0gXCJib2FyZHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvbGRcIl0gPSAyMF0gPSBcImJvbGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvb2ttYXJrXCJdID0gMjFdID0gXCJib29rbWFya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9va3NcIl0gPSAyMl0gPSBcImJvb2tzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJicmllZmNhc2VcIl0gPSAyM10gPSBcImJyaWVmY2FzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYnVuZGxlXCJdID0gMjRdID0gXCJidW5kbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNha2VcIl0gPSAyNV0gPSBcImNha2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyXCJdID0gMjZdID0gXCJjYWxlbmRhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJEYXlcIl0gPSAyN10gPSBcImNhbGVuZGFyRGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhclB1YmxpY1wiXSA9IDI4XSA9IFwiY2FsZW5kYXJQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyV2Vla1wiXSA9IDI5XSA9IFwiY2FsZW5kYXJXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhcldvcmtXZWVrXCJdID0gMzBdID0gXCJjYWxlbmRhcldvcmtXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYW1lcmFcIl0gPSAzMV0gPSBcImNhbWVyYVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyXCJdID0gMzJdID0gXCJjYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93blwiXSA9IDMzXSA9IFwiY2FyZXREb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25MZWZ0XCJdID0gMzRdID0gXCJjYXJldERvd25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25PdXRsaW5lXCJdID0gMzVdID0gXCJjYXJldERvd25PdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25SaWdodFwiXSA9IDM2XSA9IFwiY2FyZXREb3duUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0TGVmdFwiXSA9IDM3XSA9IFwiY2FyZXRMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldExlZnRPdXRsaW5lXCJdID0gMzhdID0gXCJjYXJldExlZnRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0XCJdID0gMzldID0gXCJjYXJldFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0T3V0bGluZVwiXSA9IDQwXSA9IFwiY2FyZXRSaWdodE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBcIl0gPSA0MV0gPSBcImNhcmV0VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBMZWZ0XCJdID0gNDJdID0gXCJjYXJldFVwTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcE91dGxpbmVcIl0gPSA0M10gPSBcImNhcmV0VXBPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwUmlnaHRcIl0gPSA0NF0gPSBcImNhcmV0VXBSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FydFwiXSA9IDQ1XSA9IFwiY2FydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2F0XCJdID0gNDZdID0gXCJjYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXJ0XCJdID0gNDddID0gXCJjaGFydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdFwiXSA9IDQ4XSA9IFwiY2hhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdEFkZFwiXSA9IDQ5XSA9IFwiY2hhdEFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tcIl0gPSA1MF0gPSBcImNoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveFwiXSA9IDUxXSA9IFwiY2hlY2tib3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94Q2hlY2tcIl0gPSA1Ml0gPSBcImNoZWNrYm94Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94RW1wdHlcIl0gPSA1M10gPSBcImNoZWNrYm94RW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94TWl4ZWRcIl0gPSA1NF0gPSBcImNoZWNrYm94TWl4ZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrUGVvcGxlXCJdID0gNTVdID0gXCJjaGVja1Blb3BsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbkRvd25cIl0gPSA1Nl0gPSBcImNoZXZyb25Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uTGVmdFwiXSA9IDU3XSA9IFwiY2hldnJvbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25SaWdodFwiXSA9IDU4XSA9IFwiY2hldnJvblJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc0Rvd25cIl0gPSA1OV0gPSBcImNoZXZyb25zRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNMZWZ0XCJdID0gNjBdID0gXCJjaGV2cm9uc0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zUmlnaHRcIl0gPSA2MV0gPSBcImNoZXZyb25zUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zVXBcIl0gPSA2Ml0gPSBcImNoZXZyb25zVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0Rvd25cIl0gPSA2M10gPSBcImNoZXZyb25UaGlja0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0xlZnRcIl0gPSA2NF0gPSBcImNoZXZyb25UaGlja0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja1JpZ2h0XCJdID0gNjVdID0gXCJjaGV2cm9uVGhpY2tSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrVXBcIl0gPSA2Nl0gPSBcImNoZXZyb25UaGlja1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpbkRvd25cIl0gPSA2N10gPSBcImNoZXZyb25UaGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5MZWZ0XCJdID0gNjhdID0gXCJjaGV2cm9uVGhpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluUmlnaHRcIl0gPSA2OV0gPSBcImNoZXZyb25UaGluUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluVXBcIl0gPSA3MF0gPSBcImNoZXZyb25UaGluVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25VcFwiXSA9IDcxXSA9IFwiY2hldnJvblVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsXCJdID0gNzJdID0gXCJjaXJjbGVCYWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsb29uc1wiXSA9IDczXSA9IFwiY2lyY2xlQmFsbG9vbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNhclwiXSA9IDc0XSA9IFwiY2lyY2xlQ2FyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDYXRcIl0gPSA3NV0gPSBcImNpcmNsZUNhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ29mZmVlXCJdID0gNzZdID0gXCJjaXJjbGVDb2ZmZWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZURvZ1wiXSA9IDc3XSA9IFwiY2lyY2xlRG9nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVFbXB0eVwiXSA9IDc4XSA9IFwiY2lyY2xlRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxcIl0gPSA3OV0gPSBcImNpcmNsZUZpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxlZFwiXSA9IDgwXSA9IFwiY2lyY2xlRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVIYWxmRmlsbGVkXCJdID0gODFdID0gXCJjaXJjbGVIYWxmRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVJbmZvXCJdID0gODJdID0gXCJjaXJjbGVJbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVMaWdodG5pbmdcIl0gPSA4M10gPSBcImNpcmNsZUxpZ2h0bmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGlsbFwiXSA9IDg0XSA9IFwiY2lyY2xlUGlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGxhbmVcIl0gPSA4NV0gPSBcImNpcmNsZVBsYW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQbHVzXCJdID0gODZdID0gXCJjaXJjbGVQbHVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQb29kbGVcIl0gPSA4N10gPSBcImNpcmNsZVBvb2RsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlVW5maWxsZWRcIl0gPSA4OF0gPSBcImNpcmNsZVVuZmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc05vdGVib29rXCJdID0gODldID0gXCJjbGFzc05vdGVib29rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc3Jvb21cIl0gPSA5MF0gPSBcImNsYXNzcm9vbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xvY2tcIl0gPSA5MV0gPSBcImNsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbHV0dGVyXCJdID0gOTJdID0gXCJjbHV0dGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb2ZmZWVcIl0gPSA5M10gPSBcImNvZmZlZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29sbGFwc2VcIl0gPSA5NF0gPSBcImNvbGxhcHNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb25mbGljdFwiXSA9IDk1XSA9IFwiY29uZmxpY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RcIl0gPSA5Nl0gPSBcImNvbnRhY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RGb3JtXCJdID0gOTddID0gXCJjb250YWN0Rm9ybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdFB1YmxpY1wiXSA9IDk4XSA9IFwiY29udGFjdFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29weVwiXSA9IDk5XSA9IFwiY29weVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY3JlZGl0Q2FyZFwiXSA9IDEwMF0gPSBcImNyZWRpdENhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNyZWRpdENhcmRPdXRsaW5lXCJdID0gMTAxXSA9IFwiY3JlZGl0Q2FyZE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRhc2hib2FyZFwiXSA9IDEwMl0gPSBcImRhc2hib2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGVzY2VuZGluZ1wiXSA9IDEwM10gPSBcImRlc2NlbmRpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRlc2t0b3BcIl0gPSAxMDRdID0gXCJkZXNrdG9wXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXZpY2VXaXBlXCJdID0gMTA1XSA9IFwiZGV2aWNlV2lwZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGlhbHBhZFwiXSA9IDEwNl0gPSBcImRpYWxwYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRpcmVjdGlvbnNcIl0gPSAxMDddID0gXCJkaXJlY3Rpb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFwiXSA9IDEwOF0gPSBcImRvY3VtZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEFkZFwiXSA9IDEwOV0gPSBcImRvY3VtZW50QWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEZvcndhcmRcIl0gPSAxMTBdID0gXCJkb2N1bWVudEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50TGFuZHNjYXBlXCJdID0gMTExXSA9IFwiZG9jdW1lbnRMYW5kc2NhcGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UERGXCJdID0gMTEyXSA9IFwiZG9jdW1lbnRQREZcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UmVwbHlcIl0gPSAxMTNdID0gXCJkb2N1bWVudFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudHNcIl0gPSAxMTRdID0gXCJkb2N1bWVudHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50U2VhcmNoXCJdID0gMTE1XSA9IFwiZG9jdW1lbnRTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvZ1wiXSA9IDExNl0gPSBcImRvZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9nQWx0XCJdID0gMTE3XSA9IFwiZG9nQWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb3RcIl0gPSAxMThdID0gXCJkb3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvd25sb2FkXCJdID0gMTE5XSA9IFwiZG93bmxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRybVwiXSA9IDEyMF0gPSBcImRybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJvcFwiXSA9IDEyMV0gPSBcImRyb3BcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRyb3Bkb3duXCJdID0gMTIyXSA9IFwiZHJvcGRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVkaXRCb3hcIl0gPSAxMjNdID0gXCJlZGl0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbGxpcHNpc1wiXSA9IDEyNF0gPSBcImVsbGlwc2lzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbWJlZFwiXSA9IDEyNV0gPSBcImVtYmVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFwiXSA9IDEyNl0gPSBcImV2ZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudENhbmNlbFwiXSA9IDEyN10gPSBcImV2ZW50Q2FuY2VsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudEluZm9cIl0gPSAxMjhdID0gXCJldmVudEluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50UmVjdXJyaW5nXCJdID0gMTI5XSA9IFwiZXZlbnRSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50U2hhcmVcIl0gPSAxMzBdID0gXCJldmVudFNoYXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleGNsYW1hdGlvblwiXSA9IDEzMV0gPSBcImV4Y2xhbWF0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleHBhbmRcIl0gPSAxMzJdID0gXCJleHBhbmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV5ZVwiXSA9IDEzM10gPSBcImV5ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmF2b3JpdGVzXCJdID0gMTM0XSA9IFwiZmF2b3JpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmYXhcIl0gPSAxMzVdID0gXCJmYXhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkTWFpbFwiXSA9IDEzNl0gPSBcImZpZWxkTWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGROdW1iZXJcIl0gPSAxMzddID0gXCJmaWVsZE51bWJlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRUZXh0XCJdID0gMTM4XSA9IFwiZmllbGRUZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZFRleHRCb3hcIl0gPSAxMzldID0gXCJmaWVsZFRleHRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVEb2N1bWVudFwiXSA9IDE0MF0gPSBcImZpbGVEb2N1bWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZUltYWdlXCJdID0gMTQxXSA9IFwiZmlsZUltYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlUERGXCJdID0gMTQyXSA9IFwiZmlsZVBERlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsdGVyXCJdID0gMTQzXSA9IFwiZmlsdGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWx0ZXJDbGVhclwiXSA9IDE0NF0gPSBcImZpbHRlckNsZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaXJzdEFpZFwiXSA9IDE0NV0gPSBcImZpcnN0QWlkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmbGFnXCJdID0gMTQ2XSA9IFwiZmxhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyXCJdID0gMTQ3XSA9IFwiZm9sZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJNb3ZlXCJdID0gMTQ4XSA9IFwiZm9sZGVyTW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyUHVibGljXCJdID0gMTQ5XSA9IFwiZm9sZGVyUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJTZWFyY2hcIl0gPSAxNTBdID0gXCJmb2xkZXJTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnRDb2xvclwiXSA9IDE1MV0gPSBcImZvbnRDb2xvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udERlY3JlYXNlXCJdID0gMTUyXSA9IFwiZm9udERlY3JlYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250SW5jcmVhc2VcIl0gPSAxNTNdID0gXCJmb250SW5jcmVhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZyb3dueVwiXSA9IDE1NF0gPSBcImZyb3dueVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZnVsbHNjcmVlblwiXSA9IDE1NV0gPSBcImZ1bGxzY3JlZW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdlYXJcIl0gPSAxNTZdID0gXCJnZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnbGFzc2VzXCJdID0gMTU3XSA9IFwiZ2xhc3Nlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2xvYmVcIl0gPSAxNThdID0gXCJnbG9iZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JhcGhcIl0gPSAxNTldID0gXCJncmFwaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JvdXBcIl0gPSAxNjBdID0gXCJncm91cFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhZGVyXCJdID0gMTYxXSA9IFwiaGVhZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydFwiXSA9IDE2Ml0gPSBcImhlYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydEVtcHR5XCJdID0gMTYzXSA9IFwiaGVhcnRFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGlkZVwiXSA9IDE2NF0gPSBcImhpZGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhvbWVcIl0gPSAxNjVdID0gXCJob21lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmJveENoZWNrXCJdID0gMTY2XSA9IFwiaW5ib3hDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5mb1wiXSA9IDE2N10gPSBcImluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluZm9DaXJjbGVcIl0gPSAxNjhdID0gXCJpbmZvQ2lyY2xlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpdGFsaWNcIl0gPSAxNjldID0gXCJpdGFsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImtleVwiXSA9IDE3MF0gPSBcImtleVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGF0ZVwiXSA9IDE3MV0gPSBcImxhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZmVzYXZlclwiXSA9IDE3Ml0gPSBcImxpZmVzYXZlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlmZXNhdmVyTG9ja1wiXSA9IDE3M10gPSBcImxpZmVzYXZlckxvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZ2h0QnVsYlwiXSA9IDE3NF0gPSBcImxpZ2h0QnVsYlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlnaHRuaW5nXCJdID0gMTc1XSA9IFwibGlnaHRuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaW5rXCJdID0gMTc2XSA9IFwibGlua1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlua1JlbW92ZVwiXSA9IDE3N10gPSBcImxpbmtSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RCdWxsZXRzXCJdID0gMTc4XSA9IFwibGlzdEJ1bGxldHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RDaGVja1wiXSA9IDE3OV0gPSBcImxpc3RDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdENoZWNrYm94XCJdID0gMTgwXSA9IFwibGlzdENoZWNrYm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0R3JvdXBcIl0gPSAxODFdID0gXCJsaXN0R3JvdXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RHcm91cDJcIl0gPSAxODJdID0gXCJsaXN0R3JvdXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0TnVtYmVyZWRcIl0gPSAxODNdID0gXCJsaXN0TnVtYmVyZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxvY2tcIl0gPSAxODRdID0gXCJsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsXCJdID0gMTg1XSA9IFwibWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbENoZWNrXCJdID0gMTg2XSA9IFwibWFpbENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRG93blwiXSA9IDE4N10gPSBcIm1haWxEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRWRpdFwiXSA9IDE4OF0gPSBcIm1haWxFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRW1wdHlcIl0gPSAxODldID0gXCJtYWlsRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFcnJvclwiXSA9IDE5MF0gPSBcIm1haWxFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbE9wZW5cIl0gPSAxOTFdID0gXCJtYWlsT3BlblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFBhdXNlXCJdID0gMTkyXSA9IFwibWFpbFBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUHVibGljXCJdID0gMTkzXSA9IFwibWFpbFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFJlYWRcIl0gPSAxOTRdID0gXCJtYWlsUmVhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFNlbmRcIl0gPSAxOTVdID0gXCJtYWlsU2VuZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFN5bmNcIl0gPSAxOTZdID0gXCJtYWlsU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFVucmVhZFwiXSA9IDE5N10gPSBcIm1haWxVbnJlYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1hcE1hcmtlclwiXSA9IDE5OF0gPSBcIm1hcE1hcmtlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVhbFwiXSA9IDE5OV0gPSBcIm1lYWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lbnVcIl0gPSAyMDBdID0gXCJtZW51XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZW51MlwiXSA9IDIwMV0gPSBcIm1lbnUyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXJnZVwiXSA9IDIwMl0gPSBcIm1lcmdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXRhZGF0YVwiXSA9IDIwM10gPSBcIm1ldGFkYXRhXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaWNyb3Bob25lXCJdID0gMjA0XSA9IFwibWljcm9waG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWluaWF0dXJlc1wiXSA9IDIwNV0gPSBcIm1pbmlhdHVyZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pbnVzXCJdID0gMjA2XSA9IFwibWludXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vYmlsZVwiXSA9IDIwN10gPSBcIm1vYmlsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW9uZXlcIl0gPSAyMDhdID0gXCJtb25leVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW92ZVwiXSA9IDIwOV0gPSBcIm1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11bHRpQ2hvaWNlXCJdID0gMjEwXSA9IFwibXVsdGlDaG9pY2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11c2ljXCJdID0gMjExXSA9IFwibXVzaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5hdmlnYXRlXCJdID0gMjEyXSA9IFwibmF2aWdhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5ld1wiXSA9IDIxM10gPSBcIm5ld1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmV3c2ZlZWRcIl0gPSAyMTRdID0gXCJuZXdzZmVlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZVwiXSA9IDIxNV0gPSBcIm5vdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVib29rXCJdID0gMjE2XSA9IFwibm90ZWJvb2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVFZGl0XCJdID0gMjE3XSA9IFwibm90ZUVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVGb3J3YXJkXCJdID0gMjE4XSA9IFwibm90ZUZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVSZXBseVwiXSA9IDIxOV0gPSBcIm5vdGVSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90UmVjdXJyaW5nXCJdID0gMjIwXSA9IFwibm90UmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmVkcml2ZVwiXSA9IDIyMV0gPSBcIm9uZWRyaXZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmxpbmVBZGRcIl0gPSAyMjJdID0gXCJvbmxpbmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9ubGluZUpvaW5cIl0gPSAyMjNdID0gXCJvbmxpbmVKb2luXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvb2ZSZXBseVwiXSA9IDIyNF0gPSBcIm9vZlJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvcmdcIl0gPSAyMjVdID0gXCJvcmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhZ2VcIl0gPSAyMjZdID0gXCJwYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYWludFwiXSA9IDIyN10gPSBcInBhaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYW5lbFwiXSA9IDIyOF0gPSBcInBhbmVsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYXJ0bmVyXCJdID0gMjI5XSA9IFwicGFydG5lclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGF1c2VcIl0gPSAyMzBdID0gXCJwYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVuY2lsXCJdID0gMjMxXSA9IFwicGVuY2lsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVcIl0gPSAyMzJdID0gXCJwZW9wbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUFkZFwiXSA9IDIzM10gPSBcInBlb3BsZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlQ2hlY2tcIl0gPSAyMzRdID0gXCJwZW9wbGVDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlRXJyb3JcIl0gPSAyMzVdID0gXCJwZW9wbGVFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUGF1c2VcIl0gPSAyMzZdID0gXCJwZW9wbGVQYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUmVtb3ZlXCJdID0gMjM3XSA9IFwicGVvcGxlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTZWN1cml0eVwiXSA9IDIzOF0gPSBcInBlb3BsZVNlY3VyaXR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTeW5jXCJdID0gMjM5XSA9IFwicGVvcGxlU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uXCJdID0gMjQwXSA9IFwicGVyc29uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25BZGRcIl0gPSAyNDFdID0gXCJwZXJzb25BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvblJlbW92ZVwiXSA9IDI0Ml0gPSBcInBlcnNvblJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVcIl0gPSAyNDNdID0gXCJwaG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVBZGRcIl0gPSAyNDRdID0gXCJwaG9uZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVUcmFuc2ZlclwiXSA9IDI0NV0gPSBcInBob25lVHJhbnNmZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVcIl0gPSAyNDZdID0gXCJwaWN0dXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlQWRkXCJdID0gMjQ3XSA9IFwicGljdHVyZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZUVkaXRcIl0gPSAyNDhdID0gXCJwaWN0dXJlRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZVJlbW92ZVwiXSA9IDI0OV0gPSBcInBpY3R1cmVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbGxcIl0gPSAyNTBdID0gXCJwaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaW5Eb3duXCJdID0gMjUxXSA9IFwicGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGluTGVmdFwiXSA9IDI1Ml0gPSBcInBpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYWNlaG9sZGVyXCJdID0gMjUzXSA9IFwicGxhY2Vob2xkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYW5lXCJdID0gMjU0XSA9IFwicGxhbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYXlcIl0gPSAyNTVdID0gXCJwbGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbHVzXCJdID0gMjU2XSA9IFwicGx1c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGx1czJcIl0gPSAyNTddID0gXCJwbHVzMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9pbnRJdGVtXCJdID0gMjU4XSA9IFwicG9pbnRJdGVtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb3BvdXRcIl0gPSAyNTldID0gXCJwb3BvdXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvc3RcIl0gPSAyNjBdID0gXCJwb3N0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcmludFwiXSA9IDI2MV0gPSBcInByaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcm90ZWN0aW9uQ2VudGVyXCJdID0gMjYyXSA9IFwicHJvdGVjdGlvbkNlbnRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25cIl0gPSAyNjNdID0gXCJxdWVzdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25SZXZlcnNlXCJdID0gMjY0XSA9IFwicXVlc3Rpb25SZXZlcnNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdW90ZVwiXSA9IDI2NV0gPSBcInF1b3RlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyYWRpb0J1dHRvblwiXSA9IDI2Nl0gPSBcInJhZGlvQnV0dG9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWFjdGl2YXRlXCJdID0gMjY3XSA9IFwicmVhY3RpdmF0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdENoZWNrXCJdID0gMjY4XSA9IFwicmVjZWlwdENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0Rm9yd2FyZFwiXSA9IDI2OV0gPSBcInJlY2VpcHRGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0UmVwbHlcIl0gPSAyNzBdID0gXCJyZWNlaXB0UmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlZnJlc2hcIl0gPSAyNzFdID0gXCJyZWZyZXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWxvYWRcIl0gPSAyNzJdID0gXCJyZWxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5XCJdID0gMjczXSA9IFwicmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsXCJdID0gMjc0XSA9IFwicmVwbHlBbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsQWx0XCJdID0gMjc1XSA9IFwicmVwbHlBbGxBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWx0XCJdID0gMjc2XSA9IFwicmVwbHlBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJpYmJvblwiXSA9IDI3N10gPSBcInJpYmJvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicm9vbVwiXSA9IDI3OF0gPSBcInJvb21cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNhdmVcIl0gPSAyNzldID0gXCJzYXZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzY2hlZHVsaW5nXCJdID0gMjgwXSA9IFwic2NoZWR1bGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VhcmNoXCJdID0gMjgxXSA9IFwic2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWN0aW9uXCJdID0gMjgyXSA9IFwic2VjdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VjdGlvbnNcIl0gPSAyODNdID0gXCJzZWN0aW9uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2V0dGluZ3NcIl0gPSAyODRdID0gXCJzZXR0aW5nc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hhcmVcIl0gPSAyODVdID0gXCJzaGFyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hpZWxkXCJdID0gMjg2XSA9IFwic2hpZWxkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaXRlc1wiXSA9IDI4N10gPSBcInNpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzbWlsZXlcIl0gPSAyODhdID0gXCJzbWlsZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvY2NlclwiXSA9IDI4OV0gPSBcInNvY2NlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29jaWFsTGlzdGVuaW5nXCJdID0gMjkwXSA9IFwic29jaWFsTGlzdGVuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb3J0XCJdID0gMjkxXSA9IFwic29ydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29ydExpbmVzXCJdID0gMjkyXSA9IFwic29ydExpbmVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzcGxpdFwiXSA9IDI5M10gPSBcInNwbGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdGFyXCJdID0gMjk0XSA9IFwic3RhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RhckVtcHR5XCJdID0gMjk1XSA9IFwic3RhckVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdG9wd2F0Y2hcIl0gPSAyOTZdID0gXCJzdG9wd2F0Y2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0b3J5XCJdID0gMjk3XSA9IFwic3RvcnlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0eWxlUmVtb3ZlXCJdID0gMjk4XSA9IFwic3R5bGVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1YnNjcmliZVwiXSA9IDI5OV0gPSBcInN1YnNjcmliZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuXCJdID0gMzAwXSA9IFwic3VuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5BZGRcIl0gPSAzMDFdID0gXCJzdW5BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1blF1ZXN0aW9uXCJdID0gMzAyXSA9IFwic3VuUXVlc3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1cHBvcnRcIl0gPSAzMDNdID0gXCJzdXBwb3J0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZVwiXSA9IDMwNF0gPSBcInRhYmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZXRcIl0gPSAzMDVdID0gXCJ0YWJsZXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhZ1wiXSA9IDMwNl0gPSBcInRhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFza1JlY3VycmluZ1wiXSA9IDMwN10gPSBcInRhc2tSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhc2tzXCJdID0gMzA4XSA9IFwidGFza3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRlYW13b3JrXCJdID0gMzA5XSA9IFwidGVhbXdvcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRleHRcIl0gPSAzMTBdID0gXCJ0ZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZXh0Qm94XCJdID0gMzExXSA9IFwidGV4dEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGlsZVwiXSA9IDMxMl0gPSBcInRpbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRpbWVsaW5lXCJdID0gMzEzXSA9IFwidGltZWxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZGF5XCJdID0gMzE0XSA9IFwidG9kYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZ2dsZVwiXSA9IDMxNV0gPSBcInRvZ2dsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9nZ2xlTWlkZGxlXCJdID0gMzE2XSA9IFwidG9nZ2xlTWlkZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b3VjaFwiXSA9IDMxN10gPSBcInRvdWNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmFzaFwiXSA9IDMxOF0gPSBcInRyYXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZURvd25cIl0gPSAzMTldID0gXCJ0cmlhbmdsZURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlEb3duXCJdID0gMzIwXSA9IFwidHJpYW5nbGVFbXB0eURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlMZWZ0XCJdID0gMzIxXSA9IFwidHJpYW5nbGVFbXB0eUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlSaWdodFwiXSA9IDMyMl0gPSBcInRyaWFuZ2xlRW1wdHlSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eVVwXCJdID0gMzIzXSA9IFwidHJpYW5nbGVFbXB0eVVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUxlZnRcIl0gPSAzMjRdID0gXCJ0cmlhbmdsZUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlUmlnaHRcIl0gPSAzMjVdID0gXCJ0cmlhbmdsZVJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZVVwXCJdID0gMzI2XSA9IFwidHJpYW5nbGVVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJvcGh5XCJdID0gMzI3XSA9IFwidHJvcGh5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1bmRlcmxpbmVcIl0gPSAzMjhdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVuc3Vic2NyaWJlXCJdID0gMzI5XSA9IFwidW5zdWJzY3JpYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVwbG9hZFwiXSA9IDMzMF0gPSBcInVwbG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widmlkZW9cIl0gPSAzMzFdID0gXCJ2aWRlb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsXCJdID0gMzMyXSA9IFwidm9pY2VtYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxGb3J3YXJkXCJdID0gMzMzXSA9IFwidm9pY2VtYWlsRm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsUmVwbHlcIl0gPSAzMzRdID0gXCJ2b2ljZW1haWxSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid2FmZmxlXCJdID0gMzM1XSA9IFwid2FmZmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3b3JrXCJdID0gMzM2XSA9IFwid29ya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid3JlbmNoXCJdID0gMzM3XSA9IFwid3JlbmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ4XCJdID0gMzM4XSA9IFwieFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wieENpcmNsZVwiXSA9IDMzOV0gPSBcInhDaXJjbGVcIjtcbn0pKGV4cG9ydHMuSWNvbkVudW0gfHwgKGV4cG9ydHMuSWNvbkVudW0gPSB7fSkpO1xudmFyIEljb25FbnVtID0gZXhwb3J0cy5JY29uRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBMYWJlbERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGFiZWxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxhYmVsIGNsYXNzPVwibXMtTGFiZWxcIj48bmctdHJhbnNjbHVkZS8+PC9sYWJlbD4nO1xuICAgIH1cbiAgICBMYWJlbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExhYmVsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBMYWJlbERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cmlidXRlcy5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdsYWJlbCcpLmVxKDApLmFkZENsYXNzKCdpcy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cmlidXRlcy5yZXF1aXJlZCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdsYWJlbCcpLmVxKDApLmFkZENsYXNzKCdpcy1yZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGFiZWxEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MYWJlbERpcmVjdGl2ZSA9IExhYmVsRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGFiZWwnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMYWJlbCcsIExhYmVsRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGFiZWwvbGFiZWxEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIExpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGEgbmctaHJlZj1cInt7IG5nSHJlZiB9fVwiIGNsYXNzPVwibXMtTGlua1wiIG5nLXRyYW5zY2x1ZGU+PC9hPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0hyZWY6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgIH1cbiAgICBMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlua0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaW5rRGlyZWN0aXZlID0gTGlua0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpbmsnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpbmsnLCBMaW5rRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGluay9saW5rRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKCcuL2xpc3RJdGVtU2VsZWN0TW9kZUVudW0nKTtcbnZhciBsaXN0SXRlbVR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2xpc3RJdGVtVHlwZUVudW0nKTtcbnZhciBsaXN0TGF5b3V0RW51bV8xID0gcmVxdWlyZSgnLi9saXN0TGF5b3V0RW51bScpO1xudmFyIExpc3RDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLml0ZW1zID0gW107XG4gICAgICAgIGlmICghdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbVNlbGVjdE1vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtU2VsZWN0TW9kZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJzZWxlY3RlZEl0ZW1zXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBMaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuICAgIHJldHVybiBMaXN0Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgTGlzdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtTGlzdFwiIG5nLXRyYW5zY2x1ZGU+PC91bD4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnbGlzdCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiAnPT91aWZTZWxlY3RlZEl0ZW1zJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTGlzdERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBpZiAoYXR0cnMudWlmTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmTGF5b3V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bVthdHRycy51aWZMYXlvdXRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZkxheW91dCArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtbGF5b3V0XFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIGxpc3R8Z3JpZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IGF0dHJzLnVpZkxheW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IGxpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW1bbGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bS5saXN0XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSBsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtW2xpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW0uZ3JpZF0pIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1MaXN0LS1ncmlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmSXRlbVNlbGVjdE1vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVthdHRycy51aWZJdGVtU2VsZWN0TW9kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmSXRlbVNlbGVjdE1vZGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLWl0ZW0tc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGF0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtU2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3REaXJlY3RpdmUgPSBMaXN0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgTGlzdEl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIExpc3RJdGVtQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgTGlzdEl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1MaXN0SXRlbVwiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkxpc3QnO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXRlbTogJz11aWZJdGVtJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0SXRlbUNvbnRyb2xsZXI7XG4gICAgfVxuICAgIExpc3RJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExpc3RJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBsaXN0KSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZTZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkU3RyaW5nID0gYXR0cnMudWlmU2VsZWN0ZWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyAhPT0gJ3RydWUnICYmIHNlbGVjdGVkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZTZWxlY3RlZCArICdcXCcgaXMgbm90IGEgdmFsaWQgYm9vbGVhbiB2YWx1ZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSB0cnVlfGZhbHNlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUuaXRlbSAmJiBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlR5cGUgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZUeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW1bYXR0cnMudWlmVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVHlwZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBpdGVtfGl0ZW1XaXRoSW1hZ2V8aXRlbVdpdGhJY29uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudHlwZSA9IGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtW2F0dHJzLnVpZlR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoc2NvcGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bS5pdGVtV2l0aEljb246XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3RJdGVtLS1kb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWljb24nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdMaXN0IGl0ZW0gdHlwZSBpdGVtV2l0aEljb24gcmVxdWlyZXMgdGhlIHVpZi1saXN0LWl0ZW0taWNvbiBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSW1hZ2U6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3RJdGVtLS1pbWFnZScpO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWltYWdlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnTGlzdCBpdGVtIHR5cGUgaXRlbVdpdGhJbWFnZSByZXF1aXJlcyB0aGUgdWlmLWxpc3QtaXRlbS1pbWFnZSBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZVbnJlYWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgYXR0cnMudWlmVW5yZWFkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgdW5yZWFkU3RyaW5nID0gYXR0cnMudWlmVW5yZWFkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodW5yZWFkU3RyaW5nICE9PSAndHJ1ZScgJiYgdW5yZWFkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZVbnJlYWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1bnJlYWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS51bnJlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmVW5zZWVuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlVuc2VlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHVuc2VlblN0cmluZyA9IGF0dHJzLnVpZlVuc2Vlbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHVuc2VlblN0cmluZyAhPT0gJ3RydWUnICYmIHVuc2VlblN0cmluZyAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVW5zZWVuICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodW5zZWVuU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5zZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5pdGVtQ2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5pdGVtU2VsZWN0TW9kZSA9PT0gbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW1bbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0uc2luZ2xlXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0Lml0ZW1zW2ldICE9PSBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBsaXN0SXRlbVNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5wdXNoKGxpc3RJdGVtU2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3Quc2VsZWN0ZWRJdGVtc1tpXSA9PT0gbGlzdEl0ZW1TY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VucmVhZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndW5zZWVuJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgbGlzdEl0ZW1TY29wZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxpc3QuaXRlbVNlbGVjdE1vZGUgIT09IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaXRlbUNsaWNrKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RhYmxlJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtRGlyZWN0aXZlID0gTGlzdEl0ZW1EaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tdGVydGlhcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlID0gTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLW1ldGFUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWltYWdlXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZSA9IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWl0ZW1JY29uXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1JY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tc2VsZWN0aW9uVGFyZ2V0XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUgPSBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tYWN0aW9uc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSA9IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWFjdGlvblwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uRGlyZWN0aXZlID0gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0JywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdCcsIExpc3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtJywgTGlzdEl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtUHJpbWFyeVRleHQnLCBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbVNlY29uZGFyeVRleHQnLCBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtVGVydGlhcnlUZXh0JywgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtTWV0YVRleHQnLCBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUltYWdlJywgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1JY29uJywgTGlzdEl0ZW1JY29uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbVNlbGVjdGlvblRhcmdldCcsIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUFjdGlvbnMnLCBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtQWN0aW9uJywgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3REaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChMaXN0SXRlbVNlbGVjdE1vZGVFbnVtKSB7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wibm9uZVwiXSA9IDBdID0gXCJub25lXCI7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMV0gPSBcInNpbmdsZVwiO1xuICAgIExpc3RJdGVtU2VsZWN0TW9kZUVudW1bTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMl0gPSBcIm11bHRpcGxlXCI7XG59KShleHBvcnRzLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bSA9IHt9KSk7XG52YXIgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtU2VsZWN0TW9kZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChMaXN0SXRlbVR5cGVFbnVtKSB7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVwiXSA9IDBdID0gXCJpdGVtXCI7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVdpdGhJbWFnZVwiXSA9IDFdID0gXCJpdGVtV2l0aEltYWdlXCI7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVdpdGhJY29uXCJdID0gMl0gPSBcIml0ZW1XaXRoSWNvblwiO1xufSkoZXhwb3J0cy5MaXN0SXRlbVR5cGVFbnVtIHx8IChleHBvcnRzLkxpc3RJdGVtVHlwZUVudW0gPSB7fSkpO1xudmFyIExpc3RJdGVtVHlwZUVudW0gPSBleHBvcnRzLkxpc3RJdGVtVHlwZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0SXRlbVR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoTGlzdExheW91dEVudW0pIHtcbiAgICBMaXN0TGF5b3V0RW51bVtMaXN0TGF5b3V0RW51bVtcImxpc3RcIl0gPSAwXSA9IFwibGlzdFwiO1xuICAgIExpc3RMYXlvdXRFbnVtW0xpc3RMYXlvdXRFbnVtW1wiZ3JpZFwiXSA9IDFdID0gXCJncmlkXCI7XG59KShleHBvcnRzLkxpc3RMYXlvdXRFbnVtIHx8IChleHBvcnRzLkxpc3RMYXlvdXRFbnVtID0ge30pKTtcbnZhciBMaXN0TGF5b3V0RW51bSA9IGV4cG9ydHMuTGlzdExheW91dEVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyKCRzY29wZSwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICB9XG4gICAgTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnLCAnJHdpbmRvdyddO1xuICAgIHJldHVybiBNZXNzYWdlQmFubmVyQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLk1lc3NhZ2VCYW5uZXJDb250cm9sbGVyID0gTWVzc2FnZUJhbm5lckNvbnRyb2xsZXI7XG52YXIgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ3VpZk1lc3NhZ2VCYW5uZXInO1xuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICcnICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtTWVzc2FnZUJhbm5lclwiIG5nLXNob3c9XCJ1aWZJc1Zpc2libGVcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtTWVzc2FnZUJhbm5lci1jb250ZW50XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYW5uZXItdGV4dFwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1NZXNzYWdlQmFubmVyLWNsaXBwZXJcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8dWlmLWJ1dHRvbiB1aWYtdHlwZT1cImNvbW1hbmRcIiBjbGFzcz1cIm1zLU1lc3NhZ2VCYW5uZXItZXhwYW5kXCIgbmctc2hvdz1cIiFpc0V4cGFuZGVkXCIgc3R5bGU9XCJoZWlnaHQ6NTJweFwiPicgK1xuICAgICAgICAgICAgJzx1aWYtaWNvbiB1aWYtdHlwZT1cImNoZXZyb25zRG93blwiPjwvdWlmLWljb24+JyArXG4gICAgICAgICAgICAnPC91aWYtYnV0dG9uPicgK1xuICAgICAgICAgICAgJzx1aWYtYnV0dG9uIHVpZi10eXBlPVwiY29tbWFuZFwiIGNsYXNzPVwibXMtTWVzc2FnZUJhbm5lci1leHBhbmRcIiBuZy1zaG93PVwiaXNFeHBhbmRlZFwiIHN0eWxlPVwiaGVpZ2h0OjUycHhcIj4nICtcbiAgICAgICAgICAgICc8dWlmLWljb24gdWlmLXR5cGU9XCJjaGV2cm9uc1VwXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8L3VpZi1idXR0b24+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYW5uZXItYWN0aW9uXCI+JyArXG4gICAgICAgICAgICAnPHVpZi1idXR0b24gdWlmLXR5cGU9XCJwcmltYXJ5XCIgY2xhc3M9XCJtcy1mb250Q29sb3ItbmV1dHJhbExpZ2h0XCIgbmctY2xpY2s9XCJ1aWZBY3Rpb24oKVwiPnt7IHVpZkFjdGlvbkxhYmVsIH19PC91aWYtYnV0dG9uPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzx1aWYtYnV0dG9uIHVpZi10eXBlPVwiY29tbWFuZFwiIGNsYXNzPVwibXMtTWVzc2FnZUJhbm5lci1jbG9zZVwiIG5nLWNsaWNrPVwidWlmT25DbG9zZSgpXCIgc3R5bGU9XCJoZWlnaHQ6NTJweFwiPicgK1xuICAgICAgICAgICAgJzx1aWYtaWNvbiB1aWYtdHlwZT1cInhcIj48L3VpZi1pY29uPicgK1xuICAgICAgICAgICAgJzwvdWlmLWJ1dHRvbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmQWN0aW9uOiAnJicsXG4gICAgICAgICAgICB1aWZBY3Rpb25MYWJlbDogJ0AnLFxuICAgICAgICAgICAgdWlmSXNWaXNpYmxlOiAnPT8nLFxuICAgICAgICAgICAgdWlmT25DbG9zZTogJyY/J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGggPSA3MDA7XG4gICAgICAgIHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGggPSA4ODtcbiAgICAgICAgdGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aFNtYWxsID0gMzU7XG4gICAgICAgIHRoaXMuU01BTExfQlJFQUtfUE9JTlQgPSA0ODA7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtLCAkYXR0cnMsICRjb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnVpZkFjdGlvbkxhYmVsID0gJGF0dHJzLnVpZkFjdGlvbkxhYmVsO1xuICAgICAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF90aGlzLl9pbml0TG9jYWxzKCRlbGVtKTtcbiAgICAgICAgICAgIF90aGlzLnRyYW5zY2x1ZGVDaGlsZHMoJHNjb3BlLCAkZWxlbSwgJHRyYW5zY2x1ZGUpO1xuICAgICAgICAgICAgbmcuZWxlbWVudCgkY29udHJvbGxlci4kd2luZG93KS5iaW5kKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX29uUmVzaXplKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmcuZWxlbWVudChfdGhpcy5fY2hldnJvbkJ1dHRvbikuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RvZ2dsZUV4cGFuc2lvbigkc2NvcGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZy5lbGVtZW50KF90aGlzLl9jbG9zZUJ1dHRvbikuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2hpZGVCYW5uZXIoJHNjb3BlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuX29uUmVzaXplKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlQmFubmVyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5tZXNzYWdlYmFubmVyIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgdGhlIG1lc3NhZ2UgYmFubmVyLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbWVzc2FnZS1iYW5uZXI+IHlvdSBuZWVkIHRvIHNwZWNpZnknICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudEVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlcicpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9pbml0TG9jYWxzID0gZnVuY3Rpb24gKCRlbGVtKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIgPSBuZy5lbGVtZW50KCRlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1NZXNzYWdlQmFubmVyJykpO1xuICAgICAgICB0aGlzLl9jbGlwcGVyID0gbmcuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1jbGlwcGVyJykpO1xuICAgICAgICB0aGlzLl9jaGV2cm9uQnV0dG9uID0gbmcuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtTWVzc2FnZUJhbm5lci1leHBhbmQnKSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbkJ1dHRvbiA9IG5nLmVsZW1lbnQoJGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXItYWN0aW9uJykpO1xuICAgICAgICB0aGlzLl9idWZmZXJTaXplID0gdGhpcy5fYWN0aW9uQnV0dG9uWzBdLm9mZnNldFdpZHRoICsgdGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aDtcbiAgICAgICAgdGhpcy5fY2xvc2VCdXR0b24gPSBuZy5lbGVtZW50KCRlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1NZXNzYWdlQmFubmVyLWNsb3NlJykpO1xuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX29uUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jbGllbnRXaWR0aCA9IHRoaXMuX21lc3NhZ2VCYW5uZXJbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSB0aGlzLlNNQUxMX0JSRUFLX1BPSU5UKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVSZWd1bGFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVTbWFsbCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICA7XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX3Jlc2l6ZVJlZ3VsYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgodGhpcy5fY2xpZW50V2lkdGggLSB0aGlzLl9idWZmZXJTaXplKSA+IHRoaXMuX2luaXRUZXh0V2lkdGggJiYgdGhpcy5faW5pdFRleHRXaWR0aCA8IHRoaXMuX3RleHRDb250YWluZXJNYXhXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFdpZHRoID0gJ2F1dG8nO1xuICAgICAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvbi5hZGRDbGFzcygnbXMtTWVzc2FnZUJhbm5lci1leHBhbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9IE1hdGgubWluKCh0aGlzLl9jbGllbnRXaWR0aCAtIHRoaXMuX2J1ZmZlclNpemUpLCB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGgpICsgJ3B4JztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY2hldnJvbkJ1dHRvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjaGV2cm9uID0gbmcuZWxlbWVudCh0aGlzLl9jaGV2cm9uQnV0dG9uW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNoZXZyb24uaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSAmJiAhY2hldnJvbi5oYXNDbGFzcygnbmctaGlkZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZXZyb24uYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZXZyb24ucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xpcHBlclswXS5zdHlsZS53aWR0aCA9IHRoaXMuX3RleHRXaWR0aDtcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5fcmVzaXplU21hbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jbGllbnRXaWR0aCAtICh0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoU21hbGwgKyB0aGlzLl9jbG9zZUJ1dHRvblswXS5vZmZzZXRXaWR0aCkgPiB0aGlzLl9pbml0VGV4dFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0V2lkdGggPSAnYXV0byc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0V2lkdGggPSAodGhpcy5fY2xpZW50V2lkdGggLSAodGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aFNtYWxsICsgdGhpcy5fY2xvc2VCdXR0b25bMF0ub2Zmc2V0V2lkdGgpKSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xpcHBlclswXS5zdHlsZS53aWR0aCA9IHRoaXMuX3RleHRXaWR0aDtcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5fdG9nZ2xlRXhwYW5zaW9uID0gZnVuY3Rpb24gKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuaXNFeHBhbmRlZCA9ICEkc2NvcGUuaXNFeHBhbmRlZDtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZUJhbm5lci50b2dnbGVDbGFzcygnaXMtZXhwYW5kZWQnKTtcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5faGlkZUJhbm5lciA9IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCRzY29wZS51aWZJc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS51aWZJc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21lc3NhZ2VCYW5uZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gTWVzc2FnZUJhbm5lckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUgPSBNZXNzYWdlQmFubmVyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubWVzc2FnZWJhbm5lcicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk1lc3NhZ2VCYW5uZXInLCBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhbm5lci9tZXNzYWdlQmFubmVyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBtZXNzYWdlQmFyVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vbWVzc2FnZUJhclR5cGVFbnVtJyk7XG52YXIgTWVzc2FnZUJhckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VCYXJDb250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgTWVzc2FnZUJhckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gTWVzc2FnZUJhckNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5NZXNzYWdlQmFyQ29udHJvbGxlciA9IE1lc3NhZ2VCYXJDb250cm9sbGVyO1xudmFyIE1lc3NhZ2VCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VCYXJEaXJlY3RpdmUoJGxvZywgJHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBNZXNzYWdlQmFyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICd1aWZNZXNzYWdlQmFyJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICcnICtcbiAgICAgICAgICAgICc8ZGl2IG5nLWNsYXNzPVwiW1xcJ21zLU1lc3NhZ2VCYXJcXCcsIGNsYXNzVHlwZV1cIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtTWVzc2FnZUJhci1jb250ZW50XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYXItaWNvblwiPicgK1xuICAgICAgICAgICAgJzxpIG5nLWNsYXNzPVwiW1xcJ21zLUljb25cXCcsIGljb25UeXBlXVwiPjwvaT4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtTWVzc2FnZUJhci10ZXh0XCIgLz4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmVHlwZTogJyYnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLmljb25UeXBlID0gJ21zLUljb24tLWluZm9DaXJjbGUnO1xuICAgICAgICAgICAgJHNjb3BlLmNsYXNzVHlwZSA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLnVpZlR5cGUgPSAkYXR0cnMudWlmVHlwZTtcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubWVzc2FnZWJhciAtIFVuc3VwcG9ydGVkIHR5cGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArICRzY29wZS51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21lc3NhZ2VCYXJUeXBlRW51bS50cycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICcgbXMtTWVzc2FnZUJhci0tJztcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jbGFzc1R5cGUgPSBjbGFzc05hbWUgKyBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobWVzc2FnZUJhclR5cGVFbnVtXzEuTWVzc2FnZUJhclR5cGVFbnVtW25ld1ZhbHVlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgbWVzc2FnZUJhclR5cGVFbnVtXzEuTWVzc2FnZUJhclR5cGVFbnVtLmVycm9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0teENpcmNsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgbWVzc2FnZUJhclR5cGVFbnVtXzEuTWVzc2FnZUJhclR5cGVFbnVtLnJlbW92ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmljb25UeXBlID0gJ21zLUljb24tLW1pbnVzIG1zLUljb24tLWNpcmNsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgbWVzc2FnZUJhclR5cGVFbnVtXzEuTWVzc2FnZUJhclR5cGVFbnVtLnNldmVyZXdhcm5pbmc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1hbGVydCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgbWVzc2FnZUJhclR5cGVFbnVtXzEuTWVzc2FnZUJhclR5cGVFbnVtLnN1Y2Nlc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1jaGVja2JveENoZWNrIG1zLUljb24tLWNpcmNsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy50cmFuc2NsdWRlQ2hpbGRzKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTWVzc2FnZUJhckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2VCYXJEaXJlY3RpdmUoJGxvZywgJHRpbWVvdXQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZycsICckdGltZW91dCddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgO1xuICAgIE1lc3NhZ2VCYXJEaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lLCAndWlmLWNvbnRlbnQnKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLk1lc3NhZ2VCYXIgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3lvdSBuZWVkIHRvIHByb3ZpZGUgYSB0ZXh0IGZvciB0aGUgbWVzc2FnZSBiYXIuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1tZXNzYWdlLWJhcj4geW91IG5lZWQgdG8gc3BlY2lmeScgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0SXRlbUNvbnRlbnQoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYXJEaXJlY3RpdmUucHJvdG90eXBlLmluc2VydEl0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50RWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhci10ZXh0JykpO1xuICAgICAgICBpZiAodGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSwgJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUsICdtcy1MaW5rJykpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ21zLUxpbmsnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8YnIgLz4nKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3Moc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIE1lc3NhZ2VCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5NZXNzYWdlQmFyRGlyZWN0aXZlID0gTWVzc2FnZUJhckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZNZXNzYWdlQmFyJywgTWVzc2FnZUJhckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKE1lc3NhZ2VCYXJUeXBlRW51bSkge1xuICAgIE1lc3NhZ2VCYXJUeXBlRW51bVtNZXNzYWdlQmFyVHlwZUVudW1bXCJlcnJvclwiXSA9IDBdID0gXCJlcnJvclwiO1xuICAgIE1lc3NhZ2VCYXJUeXBlRW51bVtNZXNzYWdlQmFyVHlwZUVudW1bXCJyZW1vdmVcIl0gPSAxXSA9IFwicmVtb3ZlXCI7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcInNldmVyZXdhcm5pbmdcIl0gPSAyXSA9IFwic2V2ZXJld2FybmluZ1wiO1xuICAgIE1lc3NhZ2VCYXJUeXBlRW51bVtNZXNzYWdlQmFyVHlwZUVudW1bXCJzdWNjZXNzXCJdID0gM10gPSBcInN1Y2Nlc3NcIjtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wid2FybmluZ1wiXSA9IDRdID0gXCJ3YXJuaW5nXCI7XG59KShleHBvcnRzLk1lc3NhZ2VCYXJUeXBlRW51bSB8fCAoZXhwb3J0cy5NZXNzYWdlQmFyVHlwZUVudW0gPSB7fSkpO1xudmFyIE1lc3NhZ2VCYXJUeXBlRW51bSA9IGV4cG9ydHMuTWVzc2FnZUJhclR5cGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBjb250ZXh0dWFsTWVudV8xID0gcmVxdWlyZSgnLi8uLi9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudScpO1xudmFyIE5hdkJhckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckNvbnRyb2xsZXIoJHNjb3BlLCAkYW5pbWF0ZSwgJGVsZW1lbnQsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5vcGVuTW9iaWxlTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1lbnVWaXNpYmxlID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0aGlzLiRhbmltYXRlW21lbnVWaXNpYmxlID8gJ3JlbW92ZUNsYXNzJyA6ICdhZGRDbGFzcyddKHRoaXMuJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGFuaW1hdGUucmVtb3ZlQ2xhc3ModGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VBbGxDb250ZXh0TWVudXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuYXZCYXJJdGVtcyA9IHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLU5hdkJhci1pdGVtJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2QmFySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZ0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQobmF2QmFySXRlbXNbaV0pO1xuICAgICAgICAgICAgdmFyIG5hdkJhckl0ZW1DdHJsID0gbmdFbGVtZW50LmNvbnRyb2xsZXIoTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuYXZCYXJJdGVtQ3RybCkge1xuICAgICAgICAgICAgICAgIG5hdkJhckl0ZW1DdHJsLmNsb3NlQ29udGV4dHVhbE1lbnUoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJJdGVtQ3RybC5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuaGlkZVNlYXJjaFRleHRCb3ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuYXZCYXJJdGVtcyA9IHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLU5hdkJhci1pdGVtLS1zZWFyY2gnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZCYXJJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5nRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChuYXZCYXJJdGVtc1tpXSk7XG4gICAgICAgICAgICB2YXIgbmF2U2VhcmNoQ3RybCA9IG5nRWxlbWVudC5jb250cm9sbGVyKE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuYXZTZWFyY2hDdHJsKSB7XG4gICAgICAgICAgICAgICAgbmF2U2VhcmNoQ3RybC5jbG9zZVNlYXJjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckYW5pbWF0ZScsICckZWxlbWVudCcsICckbG9nJ107XG4gICAgcmV0dXJuIE5hdkJhckNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJDb250cm9sbGVyID0gTmF2QmFyQ29udHJvbGxlcjtcbnZhciBOYXZCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckRpcmVjdGl2ZSgkbG9nLCAkYW5pbWF0ZSwgJGRvY3VtZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE5hdkJhckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ25hdic7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwibXMtTmF2QmFyXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtTmF2QmFyLW9wZW5NZW51IGpzLW9wZW5NZW51XFxcIiBuZy1jbGljaz1cXFwibmF2Lm9wZW5Nb2JpbGVNZW51KClcXFwiPlxcbiAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwibWVudVxcXCI+PC91aWYtaWNvbj5cXG4gICAgPC9kaXY+XFxuICAgIDx1aWYtb3ZlcmxheSB1aWYtbW9kZT1cXFwie3tvdmVybGF5fX1cXFwiIG5nLWNsaWNrPVxcXCJuYXYuY2xvc2VNb2JpbGVNZW51KClcXFwiPjwvdWlmLW92ZXJsYXk+XFxuICAgIDx1bCBjbGFzcz1cXFwibXMtTmF2QmFyLWl0ZW1zXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPSd1aWYtbmF2LWl0ZW1zJz48L2Rpdj5cXG4gICAgPC91bD5cXG4gIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb3ZlcmxheTogJ0A/dWlmT3ZlcmxheSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmF2QmFyQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIF90aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5jbG9zZUFsbENvbnRleHRNZW51cygpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuaGlkZVNlYXJjaFRleHRCb3goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1uYXYtaXRlbXMnKSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChjbG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTmF2QmFyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXZCYXJEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJywgJyRhbmltYXRlJywgJyRkb2N1bWVudCddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmTmF2QmFyJztcbiAgICBOYXZCYXJEaXJlY3RpdmUub3ZlcmxheVZhbHVlcyA9IFsnbGlnaHQnLCAnZGFyayddO1xuICAgIHJldHVybiBOYXZCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJEaXJlY3RpdmUgPSBOYXZCYXJEaXJlY3RpdmU7XG52YXIgTmF2QmFySXRlbVR5cGVzO1xuKGZ1bmN0aW9uIChOYXZCYXJJdGVtVHlwZXMpIHtcbiAgICBOYXZCYXJJdGVtVHlwZXNbTmF2QmFySXRlbVR5cGVzW1wibGlua1wiXSA9IDBdID0gXCJsaW5rXCI7XG4gICAgTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlc1tcIm1lbnVcIl0gPSAxXSA9IFwibWVudVwiO1xufSkoTmF2QmFySXRlbVR5cGVzIHx8IChOYXZCYXJJdGVtVHlwZXMgPSB7fSkpO1xudmFyIE5hdkJhckl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJJdGVtQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgfVxuICAgIE5hdkJhckl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5jbG9zZUNvbnRleHR1YWxNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kc2NvcGUuaGFzQ2hpbGRNZW51KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5jb250ZXh0TWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5kZXNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gTmF2QmFySXRlbUNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJJdGVtQ29udHJvbGxlciA9IE5hdkJhckl0ZW1Db250cm9sbGVyO1xudmFyIE5hdkJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckl0ZW1EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXCIgKyBOYXZCYXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzRGlzYWJsZWQ6ICdAP2Rpc2FibGVkJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnQD91aWZQb3NpdGlvbicsXG4gICAgICAgICAgICB0ZXh0OiAnPT91aWZUZXh0JyxcbiAgICAgICAgICAgIHR5cGU6ICdAP3VpZlR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlcyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXMubGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTmF2QmFySXRlbVR5cGVzW3R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXIgLSB1bnN1cHBvcnRlZCBuYXYgYmFyIGl0ZW0gdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgbmF2IGJhciBpdGVtLicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBOYXZCYXJJdGVtVHlwZXMgZW51bSBoZXJlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZS50cycpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdj48L2Rpdj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmF2QmFyQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHZhciBuYXZCYXJMaW5rRWVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU5hdkJhci1saW5rJykpO1xuICAgICAgICAgICAgICAgIG5hdkJhckxpbmtFZWxlbWVudC5yZW1vdmVBdHRyKCdocmVmJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoJHNjb3BlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnR5cGUgPSBOYXZCYXJJdGVtVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5oYXNDbGFzcygnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgpLmZpbmQoJ2xpJykucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5jbG9zZUFsbENvbnRleHRNZW51cygpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuaGlkZVNlYXJjaFRleHRCb3goKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAkc2NvcGUuY29udGV4dE1lbnVDdHJsLmlzTWVudU9wZW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXh0TWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICEkc2NvcGUuY29udGV4dE1lbnVDdHJsLmlzTWVudU9wZW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXh0TWVudUN0cmwub3Blbk1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCEkc2NvcGUuaGFzQ2hpbGRNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VNb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAkc2NvcGUuc2VsZWN0SXRlbSk7XG4gICAgICAgICAgICBfdGhpcy50cmFuc2NsdWRlQ2hpbGRzKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKTtcbiAgICAgICAgICAgIHZhciBjb250ZXh0TWVudUN0cmwgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbnRleHR1YWxNZW51JykpXG4gICAgICAgICAgICAgICAgLmNvbnRyb2xsZXIoY29udGV4dHVhbE1lbnVfMS5Db250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0TWVudUN0cmwpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaGFzQ2hpbGRNZW51ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsID0gY29udGV4dE1lbnVDdHJsO1xuICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXh0TWVudUN0cmwub25Sb290TWVudUNsb3NlZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5jbG9zZU1vYmlsZU1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXMubGlua10gPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtXFxcIlxcbiAgICBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWQsICdtcy1OYXZCYXItaXRlbS0tcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ3JpZ2h0J31cXFwiPlxcbiAgICAgIDxhIGNsYXNzPVxcXCJtcy1OYXZCYXItbGlua1xcXCIgaHJlZj1cXFwiXFxcIj48c3BhbiBjbGFzcz0ndWlmLW5hdi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgIDwvbGk+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXMubWVudV0gPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtIG1zLU5hdkJhci1pdGVtLS1oYXNNZW51XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIj5cXG4gICAgICA8YSBjbGFzcz1cXFwibXMtTmF2QmFyLWxpbmtcXFwiIGhyZWY9XFxcIlxcXCI+PHNwYW4gY2xhc3M9J3VpZi1uYXYtaXRlbS1jb250ZW50Jz48L3NwYW4+PC9hPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJtcy1OYXZCYXItY2hldnJvbkRvd24gbXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uRG93blxcXCI+PC9pPlxcbiAgICAgIDxkaXYgY2xhc3M9J3VpZi1zdWJtZW51Jz48L2Rpdj5cXG4gICAgPC9saT5cIjtcbiAgICB9XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBOYXZCYXJJdGVtRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUudHJhbnNjbHVkZUNoaWxkcyA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIHZhciBoYXNDb250ZW50ID0gX3RoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpO1xuICAgICAgICAgICAgaWYgKCFoYXNDb250ZW50ICYmICEkc2NvcGUudGV4dCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhciAtICcgK1xuICAgICAgICAgICAgICAgICAgICAneW91IG5lZWQgdG8gcHJvdmlkZSBhIHRleHQgZm9yIGEgbmF2IGJhciBtZW51IGl0ZW0uXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1uYXYtYmFyLWl0ZW0+IHlvdSBuZWVkIHRvIHNwZWNpZnkgZWl0aGVyIFxcJ3VpZi10ZXh0XFwnIGFzIGF0dHJpYnV0ZSBvciA8dWlmLW5hdi1pdGVtLWNvbnRlbnQ+IGFzIGEgY2hpbGQgZGlyZWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRMaW5rKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgIF90aGlzLmluc2VydE1lbnUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmluc2VydExpbmsgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1uYXYtaXRlbS1jb250ZW50JykpO1xuICAgICAgICBpZiAodGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPicgKyAkc2NvcGUudGV4dCArICc8L3NwYW4+JykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRNZW51ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtc3VibWVudScpKS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaGFzSXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmTmF2QmFySXRlbSc7XG4gICAgcmV0dXJuIE5hdkJhckl0ZW1EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJJdGVtRGlyZWN0aXZlID0gTmF2QmFySXRlbURpcmVjdGl2ZTtcbnZhciBOYXZCYXJTZWFyY2hDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJTZWFyY2hDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICB9XG4gICAgTmF2QmFyU2VhcmNoQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy4kc2NvcGUuc2VhcmNoVGV4dCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKF90aGlzLiRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFuaW1hdGUucmVtb3ZlQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdpcy1zZWxlY3RlZCcpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5hdkJhclNlYXJjaENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRkb2N1bWVudCcsICckYW5pbWF0ZScsICckdGltZW91dCddO1xuICAgIHJldHVybiBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyU2VhcmNoQ29udHJvbGxlciA9IE5hdkJhclNlYXJjaENvbnRyb2xsZXI7XG52YXIgTmF2QmFyU2VhcmNoID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJTZWFyY2goJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbKFwiXlwiICsgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpLCAoXCJcIiArIE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lKV07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvblNlYXJjaENhbGxiYWNrOiAnJj91aWZPblNlYXJjaCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0A/cGxhY2Vob2xkZXInXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtIG1zLU5hdkJhci1pdGVtLS1zZWFyY2ggbXMtdS1oaWRkZW5TbVxcXCIgbmctY2xpY2s9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVRleHRGaWVsZFxcXCIgbmctY2xpY2s9XFxcInNraXBPbkNsaWNrKCRldmVudClcXFwiPlxcbiAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPXt7cGxhY2Vob2xkZXJ9fSBjbGFzcz1cXFwibXMtVGV4dEZpZWxkLWZpZWxkXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1rZXlwcmVzcz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgbmctbW9kZWw9XFxcInNlYXJjaFRleHRcXFwiPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJscywgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIF90aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY3RybHNbMV0uY2xvc2VTZWFyY2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLnNraXBPbkNsaWNrID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmFwcGx5Q3NzQ2xhc3NlcygkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vblNlYXJjaCA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjdHJsc1swXS5jbG9zZUFsbENvbnRleHRNZW51cygpO1xuICAgICAgICAgICAgICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50ICYmICRldmVudC53aGljaCA9PT0gMTMgJiYgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2soeyBzZWFyY2g6ICRzY29wZS5zZWFyY2hUZXh0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmICRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykgJiYgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2soeyBzZWFyY2g6ICRzY29wZS5zZWFyY2hUZXh0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUNzc0NsYXNzZXMoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIE5hdkJhclNlYXJjaC5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5hdkJhclNlYXJjaCgkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckZG9jdW1lbnQnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhclNlYXJjaC5wcm90b3R5cGUuYXBwbHlDc3NDbGFzc2VzID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgICAgIGlmICghJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgdGhpcy4kYW5pbWF0ZS5hZGRDbGFzcygkZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtVGV4dEZpZWxkLWZpZWxkJykpWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfVxuICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICB0aGlzLiRhbmltYXRlLmFkZENsYXNzKCRlbGVtZW50LCAnaXMtc2VsZWN0ZWQnKTtcbiAgICB9O1xuICAgIE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhclNlYXJjaCc7XG4gICAgcmV0dXJuIE5hdkJhclNlYXJjaDtcbn0oKSk7XG5leHBvcnRzLk5hdkJhclNlYXJjaCA9IE5hdkJhclNlYXJjaDtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIE5hdkJhckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShOYXZCYXJJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIE5hdkJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFyU2VhcmNoLmRpcmVjdGl2ZU5hbWUsIE5hdkJhclNlYXJjaC5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG92ZXJsYXlNb2RlRW51bV90c18xID0gcmVxdWlyZSgnLi9vdmVybGF5TW9kZUVudW0udHMnKTtcbnZhciBPdmVybGF5Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheUNvbnRyb2xsZXIobG9nKSB7XG4gICAgICAgIHRoaXMubG9nID0gbG9nO1xuICAgIH1cbiAgICBPdmVybGF5Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIE92ZXJsYXlDb250cm9sbGVyO1xufSgpKTtcbnZhciBPdmVybGF5RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVybGF5RGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtT3ZlcmxheVwiIG5nLWNsYXNzPVwie1xcJ21zLU92ZXJsYXktLWRhcmtcXCc6IHVpZk1vZGUgPT0gXFwnZGFya1xcJ31cIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZNb2RlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgT3ZlcmxheURpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIE92ZXJsYXlEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uIChsb2cpIHsgcmV0dXJuIG5ldyBPdmVybGF5RGlyZWN0aXZlKGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPdmVybGF5RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmTW9kZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChvdmVybGF5TW9kZUVudW1fdHNfMS5PdmVybGF5TW9kZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIE92ZXJsYXlEaXJlY3RpdmUubG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vdmVybGF5IC0gVW5zdXBwb3J0ZWQgb3ZlcmxheSBtb2RlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBvdmVybGF5IG1vZGUgKFxcJycgKyBzY29wZS51aWZNb2RlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIE92ZXJsYXlEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PdmVybGF5RGlyZWN0aXZlID0gT3ZlcmxheURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm92ZXJsYXknLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk92ZXJsYXknLCBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3ZlcmxheU1vZGUpIHtcbiAgICBPdmVybGF5TW9kZVtPdmVybGF5TW9kZVtcImxpZ2h0XCJdID0gMF0gPSBcImxpZ2h0XCI7XG4gICAgT3ZlcmxheU1vZGVbT3ZlcmxheU1vZGVbXCJkYXJrXCJdID0gMV0gPSBcImRhcmtcIjtcbn0pKGV4cG9ydHMuT3ZlcmxheU1vZGUgfHwgKGV4cG9ydHMuT3ZlcmxheU1vZGUgPSB7fSkpO1xudmFyIE92ZXJsYXlNb2RlID0gZXhwb3J0cy5PdmVybGF5TW9kZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlNb2RlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgcGFuZWxEaXJlY3RpdmVFbnVtXzEgPSByZXF1aXJlKCcuL3BhbmVsRGlyZWN0aXZlRW51bScpO1xudmFyIFBhbmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbERpcmVjdGl2ZSgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzcz1cXFwibXMtT3ZlcmxheVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwiY2xvc2VQYW5lbCgpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJ1aWZTaG93T3ZlcmxheSA9PT0gdHJ1ZSA/ICdtcy1PdmVybGF5LS1kYXJrJyA6ICcnO1xcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGFuZWwtbWFpblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbC1jb21tYW5kc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbmctaWY9XFxcInVpZlNob3dDbG9zZVxcXCIgY2xhc3M9J21zLVBhbmVsLWNsb3NlQnV0dG9uJyBuZy1jbGljaz1cXFwiY2xvc2VQYW5lbCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9J3gnPjwvdWlmLWljb24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbC1jb250ZW50SW5uZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGFuZWxDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmSXNPcGVuOiAnPScsXG4gICAgICAgICAgICB1aWZTaG93Q2xvc2U6ICc9JyxcbiAgICAgICAgICAgIHVpZlNob3dPdmVybGF5OiAnPScsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGFuZWxEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBhbmVsRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgUGFuZWxEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSkuaGFzQ2xhc3MoJ21zLUNvbW1hbmRCYXInKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtY29tbWFuZHMnKSkucHJlcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3BlLnVpZlR5cGUgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtbWFpbicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignZGl2Lm1zLVBhbmVsLWNvbnRlbnRJbm5lcicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmNsb3NlUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS51aWZJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsRGlyZWN0aXZlID0gUGFuZWxEaXJlY3RpdmU7XG52YXIgUGFuZWxDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbENvbnRyb2xsZXIoJHNjb3BlLCAkYW5pbWF0ZSwgJGVsZW1lbnQsICRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICBpZiAoISRzY29wZS51aWZUeXBlKSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmVHlwZSA9ICdtZWRpdW0nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzWyRzY29wZS51aWZUeXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBhbmVsIC0gdW5zdXBwb3J0ZWQgcGFuZWwgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAndGhlIHR5cGUgXFwnJyArICRzY29wZS51aWZUeXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgcGFuZWxzLicgK1xuICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgdHlwZXMgY2FuIGJlIGZvdW5kIHVuZGVyIFBhbmVsVHlwZXMgZW51bSBoZXJlOlxcbicgK1xuICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbC50cycpO1xuICAgICAgICAgICAgJHNjb3BlLnVpZlR5cGUgPSAnbWVkaXVtJztcbiAgICAgICAgfVxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnbXMtUGFuZWwtLScgKyAkc2NvcGUudWlmVHlwZSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3VpZklzT3BlbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Jvb2xlYW4nICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wYW5lbCAtIGludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1vcGVuXFwnLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgXFwnJyArIHR5cGVvZiBuZXdWYWx1ZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBhcyB2YWxpZCB0eXBlIGZvciBcXCd1aWYtaXMtb3BlblxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1wYW5lbC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuYWRkQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdtcy1QYW5lbC1hbmltYXRlSW4nKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhcicpKS5zY29wZSgpLiRicm9hZGNhc3QoJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYW5pbWF0ZS5hZGRDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ21zLVBhbmVsLWFuaW1hdGVPdXQnKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdtcy1QYW5lbC1hbmltYXRlSW4gbXMtUGFuZWwtYW5pbWF0ZU91dCcpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQYW5lbENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnLCAnJHRpbWVvdXQnXTtcbiAgICByZXR1cm4gUGFuZWxDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGFuZWxDb250cm9sbGVyID0gUGFuZWxDb250cm9sbGVyO1xudmFyIFBhbmVsSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbEhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8cCBjbGFzcz1cIm1zLVBhbmVsLWhlYWRlclRleHRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZIZWFkZXJUZXh0OiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWxIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQYW5lbEhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBhbmVsSGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGFuZWxIZWFkZXJEaXJlY3RpdmUgPSBQYW5lbEhlYWRlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBhbmVsJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQYW5lbCcsIFBhbmVsRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQYW5lbEhlYWRlcicsIFBhbmVsSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQYW5lbFR5cGVzKSB7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wic21hbGxcIl0gPSAwXSA9IFwic21hbGxcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJtZWRpdW1cIl0gPSAxXSA9IFwibWVkaXVtXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wibGFyZ2VcIl0gPSAyXSA9IFwibGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJleHRyYWxhcmdlXCJdID0gM10gPSBcImV4dHJhbGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJsZWZ0XCJdID0gNF0gPSBcImxlZnRcIjtcbn0pKGV4cG9ydHMuUGFuZWxUeXBlcyB8fCAoZXhwb3J0cy5QYW5lbFR5cGVzID0ge30pKTtcbnZhciBQYW5lbFR5cGVzID0gZXhwb3J0cy5QYW5lbFR5cGVzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc2l6ZUVudW0nKTtcbnZhciBwbGFjZWhvbGRlckVudW1fMSA9IHJlcXVpcmUoJy4vcGxhY2Vob2xkZXJFbnVtJyk7XG52YXIgcGVyc29uYVN0eWxlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hU3R5bGVFbnVtJyk7XG52YXIgcGVyc29uYVByZXNlbmNlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtJyk7XG52YXIgUGVyc29uYUNhcmREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZlBlcnNvbmFDYXJkJ107XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlcnNvbmFDYXJkQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkXCIgbmctY2xhc3M9XCJnZXRQZXJzb25hQ2FyZENsYXNzZXMoKVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1wZXJzb25hXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIj4nICtcbiAgICAgICAgICAgICc8dWlmLWljb24gdWlmLXR5cGU9XCJwZXJzb25cIj48L3VpZi1pY29uPicgK1xuICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJtcy1QZXJzb25hLWltYWdlXCIgbmctc3JjPVwie3t1aWZJbWFnZVVybH19XCIgbmctaWY9XCJ1aWZJbWFnZVVybFwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByZXNlbmNlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzx1bCBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbnNcIj4nICtcbiAgICAgICAgICAgICc8bGkgbmctcmVwZWF0PVwiYWN0aW9uIGluIHBlcnNvbmFDYXJkQWN0aW9uc1wiIG5nLWNsYXNzPVwiZ2V0QWN0aW9uQ2xhc3NlcyhhY3Rpb24pXCIgbmctY2xpY2s9XCJzZWxlY3RBY3Rpb24oJGV2ZW50LCBhY3Rpb24pXCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPXt7YWN0aW9uLmljb259fSBuZy1pZj1cImFjdGlvbi5wbGFjZWhvbGRlciAhPSBcXCdvdmVyZmxvd1xcJ1wiPjwvdWlmLWljb24+JyArXG4gICAgICAgICAgICAnPC9saT4nICtcbiAgICAgICAgICAgICc8L3VsPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1hY3Rpb25EZXRhaWxCb3hcIj4nICtcbiAgICAgICAgICAgICc8dWwgbmctY2xhc3M9XCJkZXRhaWxDbGFzc1wiPjwvdWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ2FyZENvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgICAgIHZhciBpY29uID0gZWxlbWVudC5maW5kKCd1aWYtaWNvbicpO1xuICAgICAgICAgICAgaWNvbi5hZGRDbGFzcygnbXMtUGVyc29uYS1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlNpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSB4c21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4bGFyZ2UuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTdHlsZSkgJiYgbmcuaXNVbmRlZmluZWQocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlN0eWxlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTdHlsZS4gSXQgc2hvdWxkIGJlIHJvdW5kIG9yIHNxdWFyZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmcuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBuZy5pc1VuZGVmaW5lZChwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEFjdGlvbkNsYXNzZXMgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bYWN0aW9uLnBsYWNlaG9sZGVyXTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnRvcHJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnbXMtUGVyc29uYUNhcmQtb3JnQ2hhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5yZWd1bGFyOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbkNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0gPT09IHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGw6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS14cycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5zbWFsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNtJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tbGcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUueGxhcmdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0teGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWF2YWlsYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hd2F5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYXdheScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5ibG9ja2VkOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYmxvY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5idXN5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYnVzeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5kbmQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1kbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tb2ZmbGluZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hQ2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUuZ2V0UGVyc29uYUNhcmRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0gPT09IHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZSA/ICdtcy1QZXJzb25hQ2FyZC0tc3F1YXJlJyA6ICcnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRldGFpbHNXcmFwcGVyID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uRGV0YWlsc0JveExpc3QgPSBuZy5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsQm94JykpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCd1bCcpLmVxKDApO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zTGlzdCA9IG5nLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb25zJykpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBjbG9uZVtpXS50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtUFJJTUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtU0VDT05EQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1URVJUSUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtT1BUSU9OQUwtVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1dyYXBwZXIuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtQUNUSU9OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZEFjdGlvbiA9IG5nLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHdyYXBwZWRBY3Rpb24uYXR0cigndWlmLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlcl0gPT09IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5vdmVyZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTGlzdC5hcHBlbmQod3JhcHBlZEFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25EZXRhaWxzQm94TGlzdC5hcHBlbmQoX3RoaXMucHJvY2Vzc0FjdGlvbih3cmFwcGVkQWN0aW9uLCBzY29wZSwgcGVyc29uYUNhcmRDb250cm9sbGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5wcm90b3R5cGUucHJvY2Vzc0FjdGlvbiA9IGZ1bmN0aW9uIChjbG9uZSwgc2NvcGUsIHBlcnNvbmFDYXJkQ29udHJvbGxlcikge1xuICAgICAgICB2YXIgY2xhc3NUb0FkZCA9ICcnO1xuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjbG9uZS5hdHRyKCd1aWYtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgdmFyIGljb24gPSBjbG9uZS5hdHRyKCd1aWYtaWNvbicpO1xuICAgICAgICB2YXIgYWN0aW9uVG9BZGQgPSBuZXcgUGVyc29uYUNhcmRBY3Rpb24oaWNvbiwgcGxhY2Vob2xkZXIpO1xuICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ucmVndWxhcl06XG4gICAgICAgICAgICAgICAgY2xhc3NUb0FkZCA9ICdkZXRhaWwtJyArICgrK3Njb3BlLnJlZ3VsYXJBY3Rpb25zQ291bnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnRvcHJpZ2h0XTpcbiAgICAgICAgICAgICAgICBjbGFzc1RvQWRkID0gJ2RldGFpbC01JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2xvbmUuZmluZCgnbGknKS5lcSgwKS5hZGRDbGFzcyhjbGFzc1RvQWRkKTtcbiAgICAgICAgYWN0aW9uVG9BZGQuZGV0YWlsQ2xhc3MgPSBjbGFzc1RvQWRkO1xuICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuYWRkQWN0aW9uKGFjdGlvblRvQWRkKTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGlyZWN0aXZlID0gUGVyc29uYUNhcmREaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZENvbnRyb2xsZXIoJGxvZywgJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLmRldGFpbENzcyA9IHtcbiAgICAgICAgICAgIDE6ICdDaGF0JyxcbiAgICAgICAgICAgIDI6ICdQaG9uZScsXG4gICAgICAgICAgICAzOiAnVmlkZW8nLFxuICAgICAgICAgICAgNDogJ01haWwnLFxuICAgICAgICAgICAgNTogJ09yZydcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAkc2NvcGUucmVndWxhckFjdGlvbnNDb3VudCA9IDA7XG4gICAgICAgICRzY29wZS5kZXRhaWxDbGFzcyA9ICdtcy1QZXJzb25hQ2FyZC1kZXRhaWxDaGF0JztcbiAgICAgICAgJHNjb3BlLnNlbGVjdEFjdGlvbiA9IGZ1bmN0aW9uICgkZXZlbnQsIGFjdGlvbikge1xuICAgICAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFjdGlvbi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgZGV0YWlsTnVtYmVyID0gKyhhY3Rpb24uZGV0YWlsQ2xhc3MuY2hhckF0KGFjdGlvbi5kZXRhaWxDbGFzcy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAkc2NvcGUuZGV0YWlsQ2xhc3MgPSAnbXMtUGVyc29uYUNhcmQtZGV0YWlsJyArIF90aGlzLmRldGFpbENzc1tkZXRhaWxOdW1iZXJdO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZENvbnRyb2xsZXIucHJvdG90eXBlLmFkZEFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb25Ub0FkZCkge1xuICAgICAgICBpZiAodGhpcy4kc2NvcGUucGVyc29uYUNhcmRBY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWN0aW9uVG9BZGQuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5wdXNoKGFjdGlvblRvQWRkKTtcbiAgICB9O1xuICAgIFBlcnNvbmFDYXJkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJyRzY29wZSddO1xuICAgIHJldHVybiBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZENvbnRyb2xsZXIgPSBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG52YXIgUGVyc29uYUNhcmRBY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkQWN0aW9uKGljb24sIHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkQWN0aW9uO1xufSgpKTtcbnZhciBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZShkaXJlY3RpdmVUeXBlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9IGRpcmVjdGl2ZVR5cGU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ2xhc3NlcyA9IHtcbiAgICAgICAgICAgICdwcmltYXJ5JzogJ21zLVBlcnNvbmEtcHJpbWFyeVRleHQnLFxuICAgICAgICAgICAgJ3NlY29uZGFyeSc6ICdtcy1QZXJzb25hLXNlY29uZGFyeVRleHQnLFxuICAgICAgICAgICAgJ3RlcnRpYXJ5JzogJ21zLVBlcnNvbmEtdGVydGlhcnlUZXh0JyxcbiAgICAgICAgICAgICdvcHRpb25hbCc6ICdtcy1QZXJzb25hLW9wdGlvbmFsVGV4dCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aXZlVGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIicgKyBfdGhpcy5hdmFpbGFibGVDbGFzc2VzW190aGlzLmRpcmVjdGl2ZVR5cGVdICsgJ1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmVUZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHRoaXMuYXZhaWxhYmxlQ2xhc3Nlc1t0aGlzLmRpcmVjdGl2ZVR5cGVdKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gJ29wdGlvbmFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlKHR5cGUpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmUGVyc29uYUNhcmQnO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VFbGVtZW50LCBhY3Rpb25BdHRycykge1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcikgJiYgbmcuaXNVbmRlZmluZWQocGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW2FjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyXSkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXIgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlBsYWNlaG9sZGVyLiBJdCBzaG91bGQgYmUgcmVndWxhciwgdG9wcmlnaHQgb3Igb3ZlcmZsb3cuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcl0gPT09IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5vdmVyZmxvdykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPGxpIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtb3ZlcmZsb3dcIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnPGxpIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsc1wiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWRldGFpbExhYmVsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERldGFpbExpbmVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtZGV0YWlsTGluZVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZCcsIFBlcnNvbmFDYXJkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZEFjdGlvbicsIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZERldGFpbExhYmVsJywgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmREZXRhaWxMaW5lJywgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFByaW1hcnlUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3ByaW1hcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFNlY29uZGFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRUZXJ0aWFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZE9wdGlvbmFsVGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCcnKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hU2l6ZSkge1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieHNtYWxsXCJdID0gMF0gPSBcInhzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wic21hbGxcIl0gPSAxXSA9IFwic21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcIm1lZGl1bVwiXSA9IDJdID0gXCJtZWRpdW1cIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcImxhcmdlXCJdID0gM10gPSBcImxhcmdlXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4bGFyZ2VcIl0gPSA0XSA9IFwieGxhcmdlXCI7XG59KShleHBvcnRzLlBlcnNvbmFTaXplIHx8IChleHBvcnRzLlBlcnNvbmFTaXplID0ge30pKTtcbnZhciBQZXJzb25hU2l6ZSA9IGV4cG9ydHMuUGVyc29uYVNpemU7XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvc2l6ZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQbGFjZWhvbGRlckVudW0pIHtcbiAgICBQbGFjZWhvbGRlckVudW1bUGxhY2Vob2xkZXJFbnVtW1wicmVndWxhclwiXSA9IDBdID0gXCJyZWd1bGFyXCI7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcInRvcHJpZ2h0XCJdID0gMV0gPSBcInRvcHJpZ2h0XCI7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcIm92ZXJmbG93XCJdID0gMl0gPSBcIm92ZXJmbG93XCI7XG59KShleHBvcnRzLlBsYWNlaG9sZGVyRW51bSB8fCAoZXhwb3J0cy5QbGFjZWhvbGRlckVudW0gPSB7fSkpO1xudmFyIFBsYWNlaG9sZGVyRW51bSA9IGV4cG9ydHMuUGxhY2Vob2xkZXJFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BsYWNlaG9sZGVyRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFTdHlsZUVudW0pIHtcbiAgICBQZXJzb25hU3R5bGVFbnVtW1BlcnNvbmFTdHlsZUVudW1bXCJyb3VuZFwiXSA9IDBdID0gXCJyb3VuZFwiO1xuICAgIFBlcnNvbmFTdHlsZUVudW1bUGVyc29uYVN0eWxlRW51bVtcInNxdWFyZVwiXSA9IDFdID0gXCJzcXVhcmVcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bSB8fCAoZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtID0ge30pKTtcbnZhciBQZXJzb25hU3R5bGVFbnVtID0gZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb3JlL3BlcnNvbmFTdHlsZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQcmVzZW5jZUVudW0pIHtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYXZhaWxhYmxlXCJdID0gMF0gPSBcImF2YWlsYWJsZVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJhd2F5XCJdID0gMV0gPSBcImF3YXlcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYmxvY2tlZFwiXSA9IDJdID0gXCJibG9ja2VkXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImJ1c3lcIl0gPSAzXSA9IFwiYnVzeVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJkbmRcIl0gPSA0XSA9IFwiZG5kXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcIm9mZmxpbmVcIl0gPSA1XSA9IFwib2ZmbGluZVwiO1xufSkoZXhwb3J0cy5QcmVzZW5jZUVudW0gfHwgKGV4cG9ydHMuUHJlc2VuY2VFbnVtID0ge30pKTtcbnZhciBQcmVzZW5jZUVudW0gPSBleHBvcnRzLlByZXNlbmNlRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW0nKTtcbnZhciBwZXJzb25hUHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFQcmVzZW5jZUVudW0nKTtcbnZhciBwZXJzb25hSW5pdGlhbHNDb2xvckVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtJyk7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc2l6ZUVudW0nKTtcbnZhciBQZXJzb25hVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYVRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAncHJpbWFyeSc6ICdtcy1QZXJzb25hLXByaW1hcnlUZXh0JyxcbiAgICAgICAgICAgICdzZWNvbmRhcnknOiAnbXMtUGVyc29uYS1zZWNvbmRhcnlUZXh0JyxcbiAgICAgICAgICAgICd0ZXJ0aWFyeSc6ICdtcy1QZXJzb25hLXRlcnRpYXJ5VGV4dCcsXG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLmF2YWlsYWJsZUNsYXNzZXNbdGhpcy5kaXJlY3RpdmVUeXBlXSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9ICdvcHRpb25hbCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYVRleHREaXJlY3RpdmUodHlwZSk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFUZXh0RGlyZWN0aXZlO1xudmFyIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWydedWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ3VpZkNvbG9yJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtaW5pdGlhbHMgbXMtUGVyc29uYS1pbml0aWFscy0te3t1aWZDb2xvcn19XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4gJztcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNvbG9yKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZkNvbG9yID0gcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3JbcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3IuYmx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZkNvbG9yJywgZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW25ld0NvbG9yXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYSAtIFwiJyArIG5ld0NvbG9yICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZDb2xvci4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgSXQgc2hvdWxkIGJlIGxpZ2h0Qmx1ZSwgYmx1ZSwgZGFya0JsdWUsIHRlYWwsIGxpZ2h0R3JlZW4sIGdyZWVuLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBkYXJrR3JlZW4sIGxpZ2h0UGluaywgcGluaywgbWFnZW50YSwgcHVycGxlLCBibGFjaywgb3JhbmdlLCByZWQgb3IgZGFya1JlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlID0gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIiBuZy1zaG93PVwiZ2V0SW1hZ2VBcmVhVmlzaWJpbGl0eSgpXCI+JyArXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VcIiBuZy1zcmM9XCJ7e3VpZkltYWdlVXJsfX1cIiBuZy1pZj1cInVpZkltYWdlVXJsXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy51aWZTaXplQ2xhc3NlcyA9IChfYSA9IHt9LFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS50aW55XSA9ICdtcy1QZXJzb25hLS10aW55JyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSA9ICdtcy1QZXJzb25hLS14cycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSA9ICdtcy1QZXJzb25hLS1zbScsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlXSA9ICdtcy1QZXJzb25hLS1sZycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhsYXJnZV0gPSAnbXMtUGVyc29uYS0teGwnLFxuICAgICAgICAgICAgX2FcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy51aWZQcmVzZW5jZUNsYXNzZXMgPSAoX2IgPSB7fSxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXZhaWxhYmxlXSA9ICdtcy1QZXJzb25hLS1hdmFpbGFibGUnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hd2F5XSA9ICdtcy1QZXJzb25hLS1hd2F5JyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYmxvY2tlZF0gPSAnbXMtUGVyc29uYS0tYmxvY2tlZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJ1c3ldID0gJ21zLVBlcnNvbmEtLWJ1c3knLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5kbmRdID0gJ21zLVBlcnNvbmEtLWRuZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmVdID0gJ21zLVBlcnNvbmEtLW9mZmxpbmUnLFxuICAgICAgICAgICAgX2JcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTaXplICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTaXplLiBJdCBzaG91bGQgYmUgdGlueSwgeHNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeGxhcmdlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU3R5bGUpICYmIG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU3R5bGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlN0eWxlLiBJdCBzaG91bGQgYmUgcm91bmQgb3Igc3F1YXJlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpICYmIG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEltYWdlQXJlYVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdICE9PSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnRpbnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlc2VuY2UgPSBuZy5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpID8gcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0gOiBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmU7XG4gICAgICAgICAgICAgICAgaWYgKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2l6ZUNsYXNzID0gX3RoaXMudWlmU2l6ZUNsYXNzZXNbc2l6ZV07XG4gICAgICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChzaXplQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goc2l6ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaChfdGhpcy51aWZQcmVzZW5jZUNsYXNzZXNbcHJlc2VuY2VdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYUNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRldGFpbHNXcmFwcGVyID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VBcmVhID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtaW1hZ2VBcmVhJykpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBjbG9uZVtpXS50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVBSSU1BUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1TRUNPTkRBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1URVJUSUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLU9QVElPTkFMLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNXcmFwcGVyLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1JTklUSUFMUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VBcmVhLnByZXBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgIH1cbiAgICBQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hRGlyZWN0aXZlID0gUGVyc29uYURpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBQZXJzb25hQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIFBlcnNvbmFDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hJywgUGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUluaXRpYWxzJywgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hUHJpbWFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdwcmltYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVNlY29uZGFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdzZWNvbmRhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hVGVydGlhcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hT3B0aW9uYWxUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgnJykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFJbml0aWFsc0NvbG9yKSB7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodEJsdWVcIl0gPSAwXSA9IFwibGlnaHRCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJibHVlXCJdID0gMV0gPSBcImJsdWVcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtCbHVlXCJdID0gMl0gPSBcImRhcmtCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJ0ZWFsXCJdID0gM10gPSBcInRlYWxcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0R3JlZW5cIl0gPSA0XSA9IFwibGlnaHRHcmVlblwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiZ3JlZW5cIl0gPSA1XSA9IFwiZ3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtHcmVlblwiXSA9IDZdID0gXCJkYXJrR3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0UGlua1wiXSA9IDddID0gXCJsaWdodFBpbmtcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcInBpbmtcIl0gPSA4XSA9IFwicGlua1wiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wibWFnZW50YVwiXSA9IDldID0gXCJtYWdlbnRhXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJwdXJwbGVcIl0gPSAxMF0gPSBcInB1cnBsZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiYmxhY2tcIl0gPSAxMV0gPSBcImJsYWNrXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJvcmFuZ2VcIl0gPSAxMl0gPSBcIm9yYW5nZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wicmVkXCJdID0gMTNdID0gXCJyZWRcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtSZWRcIl0gPSAxNF0gPSBcImRhcmtSZWRcIjtcbn0pKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgfHwgKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgPSB7fSkpO1xudmFyIFBlcnNvbmFJbml0aWFsc0NvbG9yID0gZXhwb3J0cy5QZXJzb25hSW5pdGlhbHNDb2xvcjtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hU2l6ZSkge1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1widGlueVwiXSA9IDBdID0gXCJ0aW55XCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4c21hbGxcIl0gPSAxXSA9IFwieHNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJzbWFsbFwiXSA9IDJdID0gXCJzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibWVkaXVtXCJdID0gM10gPSBcIm1lZGl1bVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibGFyZ2VcIl0gPSA0XSA9IFwibGFyZ2VcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhsYXJnZVwiXSA9IDVdID0gXCJ4bGFyZ2VcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVNpemUgfHwgKGV4cG9ydHMuUGVyc29uYVNpemUgPSB7fSkpO1xudmFyIFBlcnNvbmFTaXplID0gZXhwb3J0cy5QZXJzb25hU2l6ZTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3NpemVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwaXZvdFNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3Bpdm90U2l6ZUVudW0nKTtcbnZhciBwaXZvdFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL3Bpdm90VHlwZUVudW0nKTtcbnZhciBQaXZvdENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBpdm90Q29udHJvbGxlcigkbG9nLCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgICRzY29wZS5waXZvdENsaWNrID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmUGl2b3RzLmZvckVhY2goZnVuY3Rpb24gKHBpdm90SXRlbSwgcGl2b3RJbmRleCkge1xuICAgICAgICAgICAgICAgIHBpdm90SXRlbS5zZWxlY3RlZCA9IHBpdm90SW5kZXggPT09IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChwaXZvdEl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVpZlNlbGVjdGVkID0gcGl2b3RJdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQaXZvdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICckc2NvcGUnXTtcbiAgICByZXR1cm4gUGl2b3RDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGl2b3RDb250cm9sbGVyID0gUGl2b3RDb250cm9sbGVyO1xudmFyIFBpdm90SXRlbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGl2b3RJdGVtKHRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB9XG4gICAgcmV0dXJuIFBpdm90SXRlbTtcbn0oKSk7XG5leHBvcnRzLlBpdm90SXRlbSA9IFBpdm90SXRlbTtcbnZhciBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1QaXZvdC1saW5rIG1zLVBpdm90LWxpbmstLW92ZXJmbG93XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPVwiZWxsaXBzaXNcIiBjbGFzcz1cIm1zLVBpdm90LWVsbGlwc2lzXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC9saT4nO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgfVxuICAgIFBpdm90RWxsaXBzaXNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBpdm90RWxsaXBzaXNEaXJlY3RpdmUgPSBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlO1xudmFyIFBpdm90RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBpdm90Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZQaXZvdCddO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx1bCBjbGFzcz1cIm1zLVBpdm90XCIgbmctY2xhc3M9XCJnZXRDbGFzc2VzKClcIiA+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0LXN0YXJ0PVwicGl2b3QgaW4gdWlmUGl2b3RzXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm1zLVBpdm90LWxpbmtcIiBuZy1jbGljaz1cInBpdm90Q2xpY2soJGluZGV4KVwiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ2lzLXNlbGVjdGVkXFwnOiBwaXZvdC5zZWxlY3RlZH1cIj57e3Bpdm90LnRpdGxlfX08L2xpPiAnICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1yZXBlYXQtZW5kPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC91bD4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmUGl2b3RzOiAnPT8nLFxuICAgICAgICAgICAgdWlmU2VsZWN0ZWQ6ICc9PycsXG4gICAgICAgICAgICB1aWZTaXplOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGl2b3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGl2b3REaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGludGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHBpdm90Q29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlNpemUnLCBmdW5jdGlvbiAobmV3U2l6ZSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChuZXdTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChwaXZvdFNpemVFbnVtXzEuUGl2b3RTaXplW25ld1NpemVdKSkge1xuICAgICAgICAgICAgICAgIHBpdm90Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5waXZvdCAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgbmV3U2l6ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU2l6ZS4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIgb3IgbGFyZ2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VHlwZSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChuZXdUeXBlKSAmJiBuZy5pc1VuZGVmaW5lZChwaXZvdFR5cGVFbnVtXzEuUGl2b3RUeXBlW25ld1R5cGVdKSkge1xuICAgICAgICAgICAgICAgIHBpdm90Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5waXZvdCAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgbmV3VHlwZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmVHlwZS4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIgb3IgdGFicy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmU2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmcuaXNEZWZpbmVkKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlBpdm90cy5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyZW50UGl2b3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBpdm90LnNlbGVjdGVkID0gY3VycmVudFBpdm90LnRpdGxlID09PSBuZXdWYWx1ZS50aXRsZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRQaXZvdHMgPSBzY29wZS51aWZQaXZvdHMuZmlsdGVyKGZ1bmN0aW9uIChjdXJyZW50UGl2b3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQaXZvdC5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRQaXZvdHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlbGVjdGVkUGl2b3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFBpdm90c1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuZ2V0Q2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gJyc7XG4gICAgICAgICAgICBjbGFzc2VzICs9IHBpdm90VHlwZUVudW1fMS5QaXZvdFR5cGVbc2NvcGUudWlmVHlwZV0gPT09IHBpdm90VHlwZUVudW1fMS5QaXZvdFR5cGUudGFicyA/ICdtcy1QaXZvdC0tdGFicycgOiAnJztcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gcGl2b3RTaXplRW51bV8xLlBpdm90U2l6ZVtzY29wZS51aWZTaXplXSA9PT0gcGl2b3RTaXplRW51bV8xLlBpdm90U2l6ZS5sYXJnZSA/ICcgbXMtUGl2b3QtLWxhcmdlJyA6ICcnO1xuICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gUGl2b3REaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QaXZvdERpcmVjdGl2ZSA9IFBpdm90RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGl2b3QnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdCcsIFBpdm90RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdEVsbGlwc2lzJywgUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUGl2b3RTaXplKSB7XG4gICAgUGl2b3RTaXplW1Bpdm90U2l6ZVsncmVndWxhciddID0gMF0gPSAncmVndWxhcic7XG4gICAgUGl2b3RTaXplW1Bpdm90U2l6ZVsnbGFyZ2UnXSA9IDFdID0gJ2xhcmdlJztcbn0pKGV4cG9ydHMuUGl2b3RTaXplIHx8IChleHBvcnRzLlBpdm90U2l6ZSA9IHt9KSk7XG52YXIgUGl2b3RTaXplID0gZXhwb3J0cy5QaXZvdFNpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGl2b3QvcGl2b3RTaXplRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBpdm90VHlwZSkge1xuICAgIFBpdm90VHlwZVtQaXZvdFR5cGVbXCJyZWd1bGFyXCJdID0gMF0gPSBcInJlZ3VsYXJcIjtcbiAgICBQaXZvdFR5cGVbUGl2b3RUeXBlW1widGFic1wiXSA9IDFdID0gXCJ0YWJzXCI7XG59KShleHBvcnRzLlBpdm90VHlwZSB8fCAoZXhwb3J0cy5QaXZvdFR5cGUgPSB7fSkpO1xudmFyIFBpdm90VHlwZSA9IGV4cG9ydHMuUGl2b3RUeXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90VHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZShsb2cpIHtcbiAgICAgICAgdGhpcy5sb2cgPSBsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLWl0ZW1OYW1lXCI+e3t1aWZOYW1lfX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbVByb2dyZXNzXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLXByb2dyZXNzVHJhY2tcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItcHJvZ3Jlc3NCYXJcIiBuZy1zdHlsZT1cInt3aWR0aDogdWlmUGVyY2VudENvbXBsZXRlK1xcJyVcXCd9XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLWl0ZW1EZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZEZXNjcmlwdGlvbjogJ0AnLFxuICAgICAgICAgICAgdWlmTmFtZTogJ0AnLFxuICAgICAgICAgICAgdWlmUGVyY2VudENvbXBsZXRlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUubG9nID0gbG9nO1xuICAgIH1cbiAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKGxvZykgeyByZXR1cm4gbmV3IFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlKGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlBlcmNlbnRDb21wbGV0ZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSBudWxsIHx8IG5ld1ZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlBlcmNlbnRDb21wbGV0ZSA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1BlcmNlbnRDb21wbGV0ZSA9IHBhcnNlRmxvYXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG5ld1BlcmNlbnRDb21wbGV0ZSkgfHwgbmV3UGVyY2VudENvbXBsZXRlIDwgMCB8fCBuZXdQZXJjZW50Q29tcGxldGUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5sb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnByb2dyZXNzaW5kaWNhdG9yIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdQZXJjZW50IGNvbXBsZXRlIG11c3QgYmUgYSB2YWxpZCBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMDAuJyk7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGVyY2VudENvbXBsZXRlID0gTWF0aC5tYXgoTWF0aC5taW4obmV3UGVyY2VudENvbXBsZXRlLCAxMDApLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUgPSBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnByb2dyZXNzaW5kaWNhdG9yJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQcm9ncmVzc0luZGljYXRvcicsIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIFNlYXJjaEJveERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VhcmNoQm94RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1TZWFyY2hCb3hcIiBuZy1jbGFzcz1cIntcXCdpcy1hY3RpdmVcXCc6aXNBY3RpdmUsIFxcJ2lzLWRpc2FibGVkXFwnOmlzRGlzYWJsZWR9XCI+JyArXG4gICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwibXMtU2VhcmNoQm94LWZpZWxkXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1ibHVyPVwiaW5wdXRCbHVyKClcIicgK1xuICAgICAgICAgICAgJyBuZy1tb2RlbD1cInZhbHVlXCIgaWQ9XCJ7ezo6XFwnc2VhcmNoQm94X1xcJyskaWR9fVwiIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwibXMtU2VhcmNoQm94LWxhYmVsXCIgZm9yPVwie3s6OlxcJ3NlYXJjaEJveF9cXCcrJGlkfX1cIiBuZy1oaWRlPVwiaXNMYWJlbEhpZGRlblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtU2VhcmNoQm94LWljb24gbXMtSWNvbiBtcy1JY29uLS1zZWFyY2hcIiA+PC9pPiB7e3BsYWNlaG9sZGVyfX08L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJtcy1TZWFyY2hCb3gtY2xvc2VCdXR0b25cIiBuZy1tb3VzZWRvd249XCJidG5Nb3VzZWRvd24oKVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICc9PycsXG4gICAgICAgICAgICB2YWx1ZTogJz0/J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTZWFyY2hCb3hEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWFyY2hCb3hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNlYXJjaEJveERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuaXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pc0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlucHV0Rm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5pc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5pbnB1dEJsdXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuaXNDYW5jZWwpIHtcbiAgICAgICAgICAgICAgICBzY29wZS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChzY29wZS52YWx1ZSkgPT09ICd1bmRlZmluZWQnIHx8IHNjb3BlLnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzRm9jdXMgPSBzY29wZS5pc0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5idG5Nb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5pc0NhbmNlbCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndmFsdWUnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAoIXNjb3BlLmlzRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHZhbCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdwbGFjZWhvbGRlcicsIGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICAgICAgICAgIHNjb3BlLnBsYWNlaG9sZGVyID0gc2VhcmNoO1xuICAgICAgICB9KTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBzY29wZS5pc0Rpc2FibGVkID0gISFkaXNhYmxlZDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2VhcmNoQm94RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU2VhcmNoQm94RGlyZWN0aXZlID0gU2VhcmNoQm94RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc2VhcmNoYm94JywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmU2VhcmNoYm94JywgU2VhcmNoQm94RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgc3Bpbm5lclNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3NwaW5uZXJTaXplRW51bScpO1xudmFyIFNwaW5uZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwaW5uZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBTcGlubmVyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICduZ1Nob3cnOiAnPScsXG4gICAgICAgICAgICAndWlmU2l6ZSc6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3Bpbm5lckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU3Bpbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lciAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3Bpbm5lciBzaXplIChcXCcnICsgYXR0cnMudWlmU2l6ZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemVbYXR0cnMudWlmU2l6ZV0gPT09IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplLmxhcmdlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFkZENsYXNzKCdtcy1TcGlubmVyLS1sYXJnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uZ1Nob3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1Nob3cnLCBmdW5jdGlvbiAobmV3VmlzaWJsZSwgb2xkVmlzaWJsZSwgc3Bpbm5lclNjb3BlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyU2NvcGUuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NvcGUuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIGlmIChjbG9uZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLVNwaW5uZXItbGFiZWwnKS5hcHBlbmQoY2xvbmUpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5pbml0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gU3Bpbm5lckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlNwaW5uZXJEaXJlY3RpdmUgPSBTcGlubmVyRGlyZWN0aXZlO1xudmFyIFNwaW5uZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGlubmVyQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkaW50ZXJ2YWwsICRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kaW50ZXJ2YWwgPSAkaW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuX29mZnNldFNpemUgPSAwLjE3OTtcbiAgICAgICAgdGhpcy5fbnVtQ2lyY2xlcyA9IDg7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblNwZWVkID0gOTA7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMgPSBbXTtcbiAgICAgICAgJHNjb3BlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fcGFyZW50U2l6ZSA9IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW190aGlzLiRzY29wZS51aWZTaXplXSA9PT0gc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemUubGFyZ2UgPyAyOCA6IDIwO1xuICAgICAgICAgICAgX3RoaXMuY3JlYXRlQ2lyY2xlc0FuZEFycmFuZ2UoKTtcbiAgICAgICAgICAgIF90aGlzLnNldEluaXRpYWxPcGFjaXR5KCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9hbmltYXRpb25JbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBfdGhpcy5fY2lyY2xlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWRlQ2lyY2xlKF90aGlzLl9jaXJjbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBfdGhpcy5fYW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoX3RoaXMuX2FuaW1hdGlvbkludGVydmFsKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZXNBbmRBcnJhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5nbGUgPSAwO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fcGFyZW50U2l6ZSAqIHRoaXMuX29mZnNldFNpemU7XG4gICAgICAgIHZhciBzdGVwID0gKDIgKiBNYXRoLlBJKSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHZhciBpID0gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdmFyIHJhZGl1cyA9ICh0aGlzLl9wYXJlbnRTaXplIC0gb2Zmc2V0KSAqIDAuNTtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IHRoaXMuY3JlYXRlQ2lyY2xlKCk7XG4gICAgICAgICAgICB2YXIgeCA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRXaWR0aCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRIZWlnaHQgKiAwLjUpIC0gb2Zmc2V0ICogMC41O1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY2lyY2xlKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ2xlZnQnLCAoeCArICdweCcpKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ3RvcCcsICh5ICsgJ3B4JykpO1xuICAgICAgICAgICAgYW5nbGUgKz0gc3RlcDtcbiAgICAgICAgICAgIHZhciBjaXJjbGVPYmplY3QgPSBuZXcgQ2lyY2xlT2JqZWN0KGNpcmNsZSwgaSk7XG4gICAgICAgICAgICB0aGlzLl9jaXJjbGVzLnB1c2goY2lyY2xlT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNpcmNsZSA9IG5nLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBkb3RTaXplID0gKHRoaXMuX3BhcmVudFNpemUgKiB0aGlzLl9vZmZzZXRTaXplKSArICdweCc7XG4gICAgICAgIGNpcmNsZS5hZGRDbGFzcygnbXMtU3Bpbm5lci1jaXJjbGUnKS5jc3MoJ3dpZHRoJywgZG90U2l6ZSkuY3NzKCdoZWlnaHQnLCBkb3RTaXplKTtcbiAgICAgICAgcmV0dXJuIGNpcmNsZTtcbiAgICB9O1xuICAgIDtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0SW5pdGlhbE9wYWNpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIHRoaXMuX2ZhZGVJbmNyZW1lbnQgPSAxIC8gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdGhpcy5fY2lyY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUsIGluZGV4KSB7XG4gICAgICAgICAgICBvcGNhaXR5VG9TZXQgPSAoX3RoaXMuX2ZhZGVJbmNyZW1lbnQgKiAoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG9wY2FpdHlUb1NldDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuZmFkZUNpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdmFyIG5ld09wYWNpdHkgPSBjaXJjbGUub3BhY2l0eSAtIHRoaXMuX2ZhZGVJbmNyZW1lbnQ7XG4gICAgICAgIGlmIChuZXdPcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICAgIG5ld09wYWNpdHkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNpcmNsZS5vcGFjaXR5ID0gbmV3T3BhY2l0eTtcbiAgICB9O1xuICAgIFNwaW5uZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckaW50ZXJ2YWwnLCAnJGxvZyddO1xuICAgIHJldHVybiBTcGlubmVyQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgQ2lyY2xlT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaXJjbGVPYmplY3QoY2lyY2xlRWxlbWVudCwgY2lyY2xlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50ID0gY2lyY2xlRWxlbWVudDtcbiAgICAgICAgdGhpcy5jaXJjbGVJbmRleCA9IGNpcmNsZUluZGV4O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2lyY2xlT2JqZWN0LnByb3RvdHlwZSwgXCJvcGFjaXR5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKyh0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5JykpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBDaXJjbGVPYmplY3Q7XG59KCkpO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lcicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNwaW5uZXInLCBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoU3Bpbm5lclNpemUpIHtcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVsnc21hbGwnXSA9IDBdID0gJ3NtYWxsJztcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVsnbGFyZ2UnXSA9IDFdID0gJ2xhcmdlJztcbn0pKGV4cG9ydHMuU3Bpbm5lclNpemUgfHwgKGV4cG9ydHMuU3Bpbm5lclNpemUgPSB7fSkpO1xudmFyIFNwaW5uZXJTaXplID0gZXhwb3J0cy5TcGlubmVyU2l6ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJTaXplRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZSgnLi90YWJsZVJvd1NlbGVjdE1vZGVFbnVtJyk7XG52YXIgdGFibGVUeXBlRW51bV8xID0gcmVxdWlyZSgnLi90YWJsZVR5cGVFbnVtJyk7XG52YXIgVGFibGVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5vcmRlckJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gW107XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcIm9yZGVyQnlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckJ5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckFzY1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm9yZGVyQXNjO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcmRlckFzYykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSBvcmRlckFzYztcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwicm93U2VsZWN0TW9kZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnJvd1NlbGVjdE1vZGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHJvd1NlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVtyb3dTZWxlY3RNb2RlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgcm93U2VsZWN0TW9kZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtcm93LXNlbGVjdC1tb2RlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIG5vbmV8c2luZ2xlfG11bHRpcGxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucm93U2VsZWN0TW9kZSA9IHJvd1NlbGVjdE1vZGU7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInJvd3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5yb3dzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb3dzKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gcm93cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm93c1tpXS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2godGhpcy5yb3dzW2ldLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRhYmxlIG5nLWNsYXNzPVwiW1xcJ21zLVRhYmxlXFwnLCB0YWJsZVR5cGVDbGFzc11cIiBuZy10cmFuc2NsdWRlPjwvdGFibGU+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd0YWJsZSc7XG4gICAgfVxuICAgIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZSb3dTZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmUm93U2VsZWN0TW9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlJvd1NlbGVjdE1vZGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZSb3dTZWxlY3RNb2RlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi1yb3ctc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gYXR0cnMudWlmUm93U2VsZWN0TW9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUucm93U2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW2F0dHJzLnVpZlRhYmxlVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlRhYmxlVHlwZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdGFibGUtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBmaXhlZHxmbHVpZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IGF0dHJzLnVpZlRhYmxlVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW3RhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtLmZsdWlkXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bVt0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bS5maXhlZF0pIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZUNsYXNzID0gJ21zLVRhYmxlLS1maXhlZCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlRGlyZWN0aXZlID0gVGFibGVEaXJlY3RpdmU7XG52YXIgVGFibGVSb3dDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVSb3dDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXRlbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZVJvd0NvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZVJvd0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVSb3dDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZVJvd0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRyIG5nLXRyYW5zY2x1ZGU+PC90cj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9dWlmSXRlbSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVSb3dDb250cm9sbGVyO1xuICAgIH1cbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgdGFibGUpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRTdHJpbmcgPSBhdHRycy51aWZTZWxlY3RlZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nICE9PSAndHJ1ZScgJiYgc2VsZWN0ZWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICB0YWJsZS4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFibGUucm93cy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5yb3dDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSAhc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIHRhYmxlUm93U2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5zaW5nbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXSAhPT0gdGFibGVSb3dTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlICE9PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSAmJlxuICAgICAgICAgICAgc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93Q2xpY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dEaXJlY3RpdmUgPSBUYWJsZVJvd0RpcmVjdGl2ZTtcbnZhciBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRkIGNsYXNzPVwibXMtVGFibGUtcm93Q2hlY2tcIj48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnXnVpZlRhYmxlJywgJz9edWlmVGFibGVIZWFkJywgJ151aWZUYWJsZVJvdyddO1xuICAgIH1cbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHRoZWFkID0gY29udHJvbGxlcnNbMV07XG4gICAgICAgIGlmICh0aGVhZCkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LnJlcGxhY2VXaXRoKCc8dGggY2xhc3M9XCJtcy1UYWJsZS1yb3dDaGVja1wiPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucm93U2VsZWN0Q2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciB0YWJsZSA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgdmFyIHJvdyA9IGNvbnRyb2xsZXJzWzJdO1xuICAgICAgICAgICAgaWYgKHRhYmxlLnJvd1NlbGVjdE1vZGUgIT09IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLm11bHRpcGxlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb3cuaXRlbSA9PT0gdW5kZWZpbmVkIHx8IHJvdy5pdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNob3VsZFNlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkU2VsZWN0QWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gc2hvdWxkU2VsZWN0QWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gc2hvdWxkU2VsZWN0QWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93U2VsZWN0Q2xpY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dTZWxlY3REaXJlY3RpdmUgPSBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZTtcbnZhciBUYWJsZUNlbGxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQ2VsbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGQgbmctdHJhbnNjbHVkZT48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQ2VsbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQ2VsbERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQ2VsbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlQ2VsbERpcmVjdGl2ZSA9IFRhYmxlQ2VsbERpcmVjdGl2ZTtcbnZhciBUYWJsZUhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRoIG5nLXRyYW5zY2x1ZGU+PC90aD4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICB9XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIHNjb3BlLmhlYWRlckNsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAodGFibGUub3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gIXRhYmxlLm9yZGVyQXNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJCeSA9IGF0dHJzLnVpZk9yZGVyQnk7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQnknLCBmdW5jdGlvbiAobmV3T3JkZXJCeSwgb2xkT3JkZXJCeSwgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKG9sZE9yZGVyQnkgIT09IG5ld09yZGVyQnkgJiZcbiAgICAgICAgICAgICAgICBuZXdPcmRlckJ5ID09PSBhdHRycy51aWZPcmRlckJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHMuZXEoaSkuY2hpbGRyZW4oKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLmVxKGkpLmNoaWxkcmVuKCkuZXEoMSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ1aWYtc29ydC1vcmRlclwiPiZuYnNwO1xcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQXNjJywgZnVuY3Rpb24gKG5ld09yZGVyQXNjLCBvbGRPcmRlckFzYywgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHZhciBvbGRDc3NDbGFzcyA9IG9sZE9yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nzc0NsYXNzID0gbmV3T3JkZXJBc2MgPyAnbXMtSWNvbi0tY2FyZXREb3duJyA6ICdtcy1JY29uLS1jYXJldFVwJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgxKS5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKG9sZENzc0NsYXNzKS5hZGRDbGFzcyhuZXdDc3NDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJ3VpZk9yZGVyQnknIGluIGF0dHJzKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaGVhZGVyQ2xpY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckRpcmVjdGl2ZSA9IFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xudmFyIFRhYmxlSGVhZENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlSGVhZENvbnRyb2xsZXIoKSB7XG4gICAgfVxuICAgIHJldHVybiBUYWJsZUhlYWRDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZUhlYWREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlSGVhZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGhlYWQgbmctdHJhbnNjbHVkZT48L3RoZWFkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlSGVhZENvbnRyb2xsZXI7XG4gICAgfVxuICAgIFRhYmxlSGVhZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlSGVhZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlSGVhZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlSGVhZERpcmVjdGl2ZSA9IFRhYmxlSGVhZERpcmVjdGl2ZTtcbnZhciBUYWJsZUJvZHlEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQm9keURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGJvZHkgbmctdHJhbnNjbHVkZT48L3Rib2R5Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQm9keURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQm9keURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQm9keURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlQm9keURpcmVjdGl2ZSA9IFRhYmxlQm9keURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGUnLCBUYWJsZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3cnLCBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3dTZWxlY3QnLCBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVDZWxsJywgVGFibGVDZWxsRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUhlYWRlcicsIFRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUhlYWQnLCBUYWJsZUhlYWREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlQm9keScsIFRhYmxlQm9keURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoVGFibGVSb3dTZWxlY3RNb2RlRW51bSkge1xuICAgIFRhYmxlUm93U2VsZWN0TW9kZUVudW1bVGFibGVSb3dTZWxlY3RNb2RlRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIFRhYmxlUm93U2VsZWN0TW9kZUVudW1bVGFibGVSb3dTZWxlY3RNb2RlRW51bVtcInNpbmdsZVwiXSA9IDFdID0gXCJzaW5nbGVcIjtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJtdWx0aXBsZVwiXSA9IDJdID0gXCJtdWx0aXBsZVwiO1xufSkoZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtIHx8IChleHBvcnRzLlRhYmxlUm93U2VsZWN0TW9kZUVudW0gPSB7fSkpO1xudmFyIFRhYmxlUm93U2VsZWN0TW9kZUVudW0gPSBleHBvcnRzLlRhYmxlUm93U2VsZWN0TW9kZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFRhYmxlVHlwZUVudW0pIHtcbiAgICBUYWJsZVR5cGVFbnVtW1RhYmxlVHlwZUVudW1bXCJmbHVpZFwiXSA9IDBdID0gXCJmbHVpZFwiO1xuICAgIFRhYmxlVHlwZUVudW1bVGFibGVUeXBlRW51bVtcImZpeGVkXCJdID0gMV0gPSBcImZpeGVkXCI7XG59KShleHBvcnRzLlRhYmxlVHlwZUVudW0gfHwgKGV4cG9ydHMuVGFibGVUeXBlRW51bSA9IHt9KSk7XG52YXIgVGFibGVUeXBlRW51bSA9IGV4cG9ydHMuVGFibGVUeXBlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciB1aWZUeXBlRW51bV8xID0gcmVxdWlyZSgnLi91aWZUeXBlRW51bScpO1xudmFyIFRleHRGaWVsZENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRGaWVsZENvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBUZXh0RmllbGRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gVGV4dEZpZWxkQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgVGV4dEZpZWxkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXh0RmllbGREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRleHRGaWVsZENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cIntcXCdpcy1hY3RpdmVcXCc6IGlzQWN0aXZlLCBcXCdtcy1UZXh0RmllbGRcXCc6IHRydWUsICcgK1xuICAgICAgICAgICAgJ1xcJ21zLVRleHRGaWVsZC0tdW5kZXJsaW5lZFxcJzogdWlmVW5kZXJsaW5lZCwgXFwnbXMtVGV4dEZpZWxkLS1wbGFjZWhvbGRlclxcJzogcGxhY2Vob2xkZXIsICcgK1xuICAgICAgICAgICAgJ1xcJ2lzLXJlcXVpcmVkXFwnOiByZXF1aXJlZCwgXFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkLCBcXCdtcy1UZXh0RmllbGQtLW11bHRpbGluZVxcJyA6IHVpZk11bHRpbGluZSB9XCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIG5nLXNob3c9XCJsYWJlbFNob3duXCIgY2xhc3M9XCJtcy1MYWJlbFwiIG5nLWNsaWNrPVwibGFiZWxDbGljaygpXCI+e3t1aWZMYWJlbCB8fCBwbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8aW5wdXQgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctY2hhbmdlPVwibmdDaGFuZ2VcIiBuZy1ibHVyPVwiaW5wdXRCbHVyKClcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWNsaWNrPVwiaW5wdXRDbGljaygpXCIgJyArXG4gICAgICAgICAgICAnY2xhc3M9XCJtcy1UZXh0RmllbGQtZmllbGRcIiBuZy1zaG93PVwiIXVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIicgK1xuICAgICAgICAgICAgJ21pbj1cInt7bWlufX1cIiBtYXg9XCJ7e21heH19XCIgc3RlcD1cInt7c3RlcH19XCIgLz4nICtcbiAgICAgICAgICAgICc8dGV4dGFyZWEgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiICcgK1xuICAgICAgICAgICAgJ2NsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgbmctc2hvdz1cInVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIj48L3RleHRhcmVhPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtVGV4dEZpZWxkLWRlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBtYXg6ICdAJyxcbiAgICAgICAgICAgIG1pbjogJ0AnLFxuICAgICAgICAgICAgbmdDaGFuZ2U6ICc9PycsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPT8nLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHN0ZXA6ICdAJyxcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZMYWJlbDogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmVGV4dGZpZWxkJywgJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgfVxuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRleHRGaWVsZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGV4dEZpZWxkRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycykge1xuICAgICAgICB2YXIgY29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICB2YXIgbmdNb2RlbCA9IGNvbnRyb2xsZXJzWzFdO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IHRydWU7XG4gICAgICAgIHNjb3BlLnJlcXVpcmVkID0gJ3JlcXVpcmVkJyBpbiBhdHRycztcbiAgICAgICAgc2NvcGUudWlmTXVsdGlsaW5lID0gYXR0cnMudWlmTXVsdGlsaW5lID09PSAndHJ1ZSc7XG4gICAgICAgIHNjb3BlLnVpZlR5cGUgPSBhdHRycy51aWZUeXBlO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICh1aWZUeXBlRW51bV8xLklucHV0VHlwZUVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50ZXh0ZmllbGQgLSBVbnN1cHBvcnRlZCB0eXBlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC91aWZUeXBlRW51bS50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlR5cGUgPSB1aWZUeXBlRW51bV8xLklucHV0VHlwZUVudW0udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLnVpZlVuZGVybGluZWQgPSAndWlmVW5kZXJsaW5lZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLmlucHV0Rm9jdXMgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRCbHVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBpbnN0YW5jZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlciAmJiBpbnB1dC52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmxhYmVsQ2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHNjb3BlLnVpZk11bHRpbGluZSA/IGluc3RhbmNlRWxlbWVudC5maW5kKCd0ZXh0YXJlYScpXG4gICAgICAgICAgICAgICAgICAgIDogaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgaW5wdXRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gIW5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGV4dEZpZWxkRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGV4dEZpZWxkRGlyZWN0aXZlID0gVGV4dEZpZWxkRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGV4dGZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUZXh0ZmllbGQnLCBUZXh0RmllbGREaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoSW5wdXRUeXBlRW51bSkge1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInRleHRcIl0gPSAwXSA9IFwidGV4dFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInBhc3N3b3JkXCJdID0gMV0gPSBcInBhc3N3b3JkXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wiZW1haWxcIl0gPSAyXSA9IFwiZW1haWxcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJ1cmxcIl0gPSAzXSA9IFwidXJsXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1widGVsXCJdID0gNF0gPSBcInRlbFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInJhbmdlXCJdID0gNV0gPSBcInJhbmdlXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wibnVtYmVyXCJdID0gNl0gPSBcIm51bWJlclwiO1xufSkoZXhwb3J0cy5JbnB1dFR5cGVFbnVtIHx8IChleHBvcnRzLklucHV0VHlwZUVudW0gPSB7fSkpO1xudmFyIElucHV0VHlwZUVudW0gPSBleHBvcnRzLklucHV0VHlwZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBUb2dnbGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRvZ2dsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwiW1xcJ21zLVRvZ2dsZVxcJywgdGV4dExvY2F0aW9uLCB7XFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfV1cIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRvZ2dsZS1kZXNjcmlwdGlvblwiPjxuZy10cmFuc2NsdWRlLz48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtaW5wdXRcIiAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1jaGFuZ2U9XCJuZ0NoYW5nZSgpXCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiICcgK1xuICAgICAgICAgICAgJ25nLWF0dHItbmctdHJ1ZS12YWx1ZT1cInt7bmdUcnVlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiBuZy1hdHRyLW5nLWZhbHNlLXZhbHVlPVwie3tuZ0ZhbHNlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLVRvZ2dsZS1maWVsZFwiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtTGFiZWwgbXMtTGFiZWwtLW9mZlwiPnt7dWlmTGFiZWxPZmZ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vblwiPnt7dWlmTGFiZWxPbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nQ2hhbmdlOiAnJj8nLFxuICAgICAgICAgICAgbmdGYWxzZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgbmdNb2RlbDogJz0/JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgdWlmTGFiZWxPZmY6ICdAJyxcbiAgICAgICAgICAgIHVpZkxhYmVsT246ICdAJyxcbiAgICAgICAgICAgIHVpZlRleHRMb2NhdGlvbjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRvZ2dsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVG9nZ2xlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICBpZiAoc2NvcGUudWlmVGV4dExvY2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbG9jID0gc2NvcGUudWlmVGV4dExvY2F0aW9uO1xuICAgICAgICAgICAgbG9jID0gbG9jLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbG9jLnNsaWNlKDEpO1xuICAgICAgICAgICAgc2NvcGUudGV4dExvY2F0aW9uID0gJyBtcy1Ub2dnbGUtLXRleHQnICsgbG9jO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtLmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgc2NvcGUuZGlzYWJsZWQgPSB0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnOyB9KSk7XG4gICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycztcbiAgICB9O1xuICAgIHJldHVybiBUb2dnbGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ub2dnbGVEaXJlY3RpdmUgPSBUb2dnbGVEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50b2dnbGUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRvZ2dsZScsIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0UHJlc2VuY2VFbnVtJyk7XG52YXIgb3JnQ2hhcnRTdHlsZUVudW1fMSA9IHJlcXVpcmUoJy4vb3JnQ2hhcnRTdHlsZUVudW0nKTtcbnZhciBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0U2VsZWN0TW9kZUVudW0nKTtcbnZhciBPcmdDaGFydENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdE1vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLiRzY29wZS5pdGVtcyA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT3JnQ2hhcnRDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9yZ0NoYXJ0Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPcmdDaGFydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gT3JnQ2hhcnRDb250cm9sbGVyO1xufSgpKTtcbnZhciBPcmdDaGFydERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gT3JnQ2hhcnRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogJz0/dWlmU2VsZWN0ZWRJdGVtcydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlNlbGVjdE1vZGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGU6XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZTpcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RNb2RlID0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bYXR0cnMudWlmU2VsZWN0TW9kZV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVUlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQgLSBVbnN1cHBvcnRlZCBzZWxlY3QtbW9kZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHNlbGVjdC1tb2RlIChcXCcnICsgYXR0cnMudWlmU2VsZWN0TW9kZSArICdcXCkgaXMgbm90IHN1cHBlcnRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBzaW5nbGUsIG11bHRpcGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydERpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cERpcmVjdGl2ZSA9IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwVGl0bGVcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUgPSBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtT3JnQ2hhcnQtbGlzdFwiIG5nLXRyYW5zY2x1ZGUgPjwvdWw+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1PcmdDaGFydC1saXN0SXRlbVwiPjxkaXYgY2xhc3M9XCJtcy1QZXJzb25hXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+PC9saT4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZk9yZ0NoYXJ0JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9P3VpZkl0ZW0nLFxuICAgICAgICAgICAgcHJlc2VuY2U6ICc9P3VpZlByZXNlbmNlJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPT91aWZTZWxlY3RlZCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtLCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnByZXNlbmNlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW1bc2NvcGUucHJlc2VuY2VdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmJ1c3k6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYnVzeScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYXdheTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hd2F5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5ibG9ja2VkOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWJsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmRuZDpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1kbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLm9mZmxpbmU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tb2ZmbGluZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgcHJlc2VuY2U6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmVzZW5jZSAoXFwnJyArIHNjb3BlLnByZXNlbmNlICsgJ1xcJykgaXMgbm90IHN1cHBlcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBhdmFpbGFibGUsIGJ1c3ksIGF3YXksIGJsb2NrZWQsIGRuZCwgb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlN0eWxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U3R5bGVFbnVtXzEuT3JnQ2hhcnRTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnNxdWFyZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnN0YW5kYXJkOiBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgc3R5bGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBzdHlsZSAoXFwnJyArIGF0dHJzLnVpZlN0eWxlICsgJ1xcKSBpcyBub3Qgc3VwcGVydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6IHN0YW5kYXJkKGRlZmF1bHQpLCBzcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLXNlbGVjdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgY3RybC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUgfHwgY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3RybC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXRlbXNbaV0gIT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5wdXNoKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wZXJzb25hQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0cmwuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pdGVtc1tpXSAhPT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGN0cmwuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSB8fCBjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlKSAmJiBzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkub24oJ2NsaWNrJywgc2NvcGUucGVyc29uYUNsaWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEltYWdlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEltYWdlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZUFyZWFcXFwiPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJtcy1QZXJzb25hLXBsYWNlaG9sZGVyIG1zLUljb24gbXMtSWNvbi0tcGVyc29uXFxcIj48L2k+XFxuICAgICAgPGltZyBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZVxcXCIgbmctc3JjPVxcXCJ7e25nU3JjfX1cXFwiIC8+XFxuICAgIDwvZGl2PlxcbiAgICBcIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nU3JjOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmVzZW5jZVwiID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgaWYgKCFzY29wZS4kcGFyZW50LnByZXNlbmNlKSB7XG4gICAgICAgICAgICBlbGVtLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEdyb3VwQnlGaWx0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcigpIHtcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29sbGVjdGlvbiwga2V5KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjb2xsZWN0aW9uW2ldW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cEJ5RmlsdGVyID0gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0JywgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0R3JvdXAnLCBPcmdDaGFydEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEdyb3VwVGl0bGUnLCBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0TGlzdCcsIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQZXJzb25hJywgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEltYWdlJywgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmVzZW5jZScsIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0RGV0YWlscycsIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmltYXJ5VGV4dCcsIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dCcsIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmZpbHRlcigndWlmT3JnQ2hhcnRHcm91cEJ5JywgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3JnQ2hhcnRQcmVzZW5jZUVudW0pIHtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImF2YWlsYWJsZVwiXSA9IDBdID0gXCJhdmFpbGFibGVcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImJ1c3lcIl0gPSAxXSA9IFwiYnVzeVwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYXdheVwiXSA9IDJdID0gXCJhd2F5XCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJibG9ja2VkXCJdID0gM10gPSBcImJsb2NrZWRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImRuZFwiXSA9IDRdID0gXCJkbmRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcIm9mZmxpbmVcIl0gPSA1XSA9IFwib2ZmbGluZVwiO1xufSkoZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRW51bSB8fCAoZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRQcmVzZW5jZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0UHJlc2VuY2VFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3JnQ2hhcnRTdHlsZUVudW0pIHtcbiAgICBPcmdDaGFydFN0eWxlRW51bVtPcmdDaGFydFN0eWxlRW51bVtcInN0YW5kYXJkXCJdID0gMF0gPSBcInN0YW5kYXJkXCI7XG4gICAgT3JnQ2hhcnRTdHlsZUVudW1bT3JnQ2hhcnRTdHlsZUVudW1bXCJzcXVhcmVcIl0gPSAxXSA9IFwic3F1YXJlXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtIHx8IChleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtID0ge30pKTtcbnZhciBPcmdDaGFydFN0eWxlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTdHlsZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChPcmdDaGFydFNlbGVjdE1vZGVFbnVtKSB7XG4gICAgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtPcmdDaGFydFNlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMF0gPSBcInNpbmdsZVwiO1xuICAgIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMV0gPSBcIm11bHRpcGxlXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFNlbGVjdE1vZGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHBlcnNvbmFTdHlsZUVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYVN0eWxlRW51bScpO1xudmFyIHNpemVFbnVtXzEgPSByZXF1aXJlKCcuLi9wZXJzb25hL3NpemVFbnVtJyk7XG52YXIgaWNvbkVudW1fMSA9IHJlcXVpcmUoJy4uL2ljb24vaWNvbkVudW0nKTtcbnZhciBwZW9wbGVTZWFyY2hFdmVudE5hbWUgPSAndWlmLXBlb3BsZS1zZWFyY2gnO1xudmFyIEdyb3VwZWRQZW9wbGVEYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm91cGVkUGVvcGxlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5wZW9wbGUgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIEdyb3VwZWRQZW9wbGVEYXRhO1xufSgpKTtcbmV4cG9ydHMuR3JvdXBlZFBlb3BsZURhdGEgPSBHcm91cGVkUGVvcGxlRGF0YTtcbnZhciBQZW9wbGVQaWNrZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJDb250cm9sbGVyKCRzY29wZSwgJGZpbHRlciwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGZpbHRlciA9ICRmaWx0ZXI7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRQZXJzb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRQZXJzb25zO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucGlja2VyVHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLiRzY29wZS50eXBlO1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUudHlwZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnNlYXJjaFF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYmluZFBlb3BsZSh0aGlzLiRzY29wZS5zZWFyY2hRdWVyeSk7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QocGVvcGxlU2VhcmNoRXZlbnROYW1lLCB0aGlzLnNlYXJjaFF1ZXJ5KCkpO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuYmluZFBlb3BsZSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IHRoaXMuJHNjb3BlLnBlb3BsZUNhbGxiYWNrKCkocXVlcnkpO1xuICAgICAgICBwZW9wbGVEYXRhID0gcGVvcGxlRGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKHBlb3BsZURhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuZ3JvdXBzID0gdGhpcy5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlKHBlb3BsZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwZW9wbGVEYXRhLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hNb3JlQ3RybF8xID0gYW5ndWxhci5lbGVtZW50KHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpXG4gICAgICAgICAgICAgICAgLmNvbnRyb2xsZXIoXCJcIiArIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoTW9yZUN0cmxfMSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGhhdF8xID0gdGhpcztcbiAgICAgICAgICAgIHBlb3BsZURhdGFcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoYXRfMS4kc2NvcGUuZ3JvdXBzID0gX3RoaXMuY3JlYXRlUGVvcGxlRGF0YVN0cnVjdHVyZShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hNb3JlQ3RybF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlID0gZnVuY3Rpb24gKHBlb3BsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IFtdO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gocGVvcGxlLCBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdHcm91cHMgPSBfdGhpcy4kZmlsdGVyKCdmaWx0ZXInKShwZW9wbGVEYXRhLCB7IGdyb3VwOiBwZXJzb24uZ3JvdXAgfSk7XG4gICAgICAgICAgICB2YXIgaGFzR3JvdXAgPSBleGlzdGluZ0dyb3Vwcy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICBpZiAoIWhhc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Blb3BsZURhdGEgPSBuZXcgR3JvdXBlZFBlb3BsZURhdGEoKTtcbiAgICAgICAgICAgICAgICBuZXdQZW9wbGVEYXRhLmdyb3VwID0gcGVyc29uLmdyb3VwO1xuICAgICAgICAgICAgICAgIG5ld1Blb3BsZURhdGEucGVvcGxlLnB1c2gocGVyc29uKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVEYXRhLnB1c2gobmV3UGVvcGxlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdEYXRhID0gZXhpc3RpbmdHcm91cHNbMF07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEYXRhLnBlb3BsZS5wdXNoKHBlcnNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGVvcGxlRGF0YTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRmaWx0ZXInLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlckNvbnRyb2xsZXIgPSBQZW9wbGVQaWNrZXJDb250cm9sbGVyO1xudmFyIFBlb3BsZVBpY2tlclR5cGVzO1xuKGZ1bmN0aW9uIChQZW9wbGVQaWNrZXJUeXBlcykge1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZ3JvdXBlZFwiXSA9IDBdID0gXCJncm91cGVkXCI7XG4gICAgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbXCJjb21wYWN0XCJdID0gMV0gPSBcImNvbXBhY3RcIjtcbiAgICBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1tcIm1lbWJlckxpc3RcIl0gPSAyXSA9IFwibWVtYmVyTGlzdFwiO1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZmFjZVBpbGVcIl0gPSAzXSA9IFwiZmFjZVBpbGVcIjtcbn0pKFBlb3BsZVBpY2tlclR5cGVzIHx8IChQZW9wbGVQaWNrZXJUeXBlcyA9IHt9KSk7XG52YXIgUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ25nTW9kZWwnLCAoXCJcIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKV07XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlb3BsZVBpY2tlckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBkZWxheTogJ0B1aWZTZWFyY2hEZWxheScsXG4gICAgICAgICAgICBmYWNlUGlsZUhlYWRlcjogJ0A/dWlmRmFjZXBpbGVIZWFkZXInLFxuICAgICAgICAgICAgbmdEaXNhYmxlZDogJz0/JyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG9uU2VsZWN0ZWRQZXJzb25DbGljazogJyY/dWlmU2VsZWN0ZWRQZXJzb25DbGljaycsXG4gICAgICAgICAgICBwZW9wbGVDYWxsYmFjazogJyZ1aWZQZW9wbGUnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAPycsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoUGVvcGxlUGlja2VyVHlwZXNbdHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlb3BsZXBpY2tlciAtIHVuc3VwcG9ydGVkIHBlb3BsZSBwaWNrZXIgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgcGVvcGxlIHBpY2tlci4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgUGVvcGxlUGlja2VyVHlwZXMgZW51bSBoZXJlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvcGVvcGxlcGlja2VyL3Blb3BsZVBpY2tlckRpcmVjdGl2ZS50cycpO1xuICAgICAgICAgICAgICAgIHRocm93ICdbbmdPZmZpY2VVaUZhYnJpY10gLSBFcnJvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIG5nTW9kZWxDdHJsID0gY3RybHNbMF07XG4gICAgICAgICAgICB2YXIgcGVvcGxlUGlja2VyQ3RybCA9IGN0cmxzWzFdO1xuICAgICAgICAgICAgX3RoaXMuaW5pdERpc2FibGVkU3RhdGUoJGVsZW1lbnQsICRzY29wZSwgJGF0dHJzKTtcbiAgICAgICAgICAgICRzY29wZS5mYWNlUGlsZUhlYWRlciA9ICRzY29wZS5mYWNlUGlsZUhlYWRlciB8fCAnU3VnZ2VzdGVkIGNvbnRhY3RzJztcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKCdzZWxlY3RlZFBlcnNvbnMnLCBmdW5jdGlvbiAoZGF0YSwgZGF0YTIsIGRhdGEzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzaXplU2VhcmNoRmllbGQoJGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMgPSBuZ01vZGVsQ3RybC4kdmlld1ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNpemVTZWFyY2hGaWVsZCgkZWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgIHZhciBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5vblNlYXJjaEtleVVwID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VhcmNoTW9yZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUnKSk7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWFyY2hNb3JlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VhcmNoUXVlcnkgPyAkZWxlbWVudC5hZGRDbGFzcygnaXMtc2VhcmNoaW5nJykgOiAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VhcmNoaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWFyY2hRdWVyeSA/ICRzZWFyY2hNb3JlLmFkZENsYXNzKCdpcy1hY3RpdmUnKSA6ICRzZWFyY2hNb3JlLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVNlbGVjdGVkUGVvcGxlKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuZGVsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0LmNhbmNlbChzZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VhcmNoVGltZW91dCA9IF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LCAkc2NvcGUuZGVsYXkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vblBlb3BsZVBpY2tlckFjdGl2ZSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zbW9vdGhTY3JvbGxUbygkZWxlbWVudFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS50eXBlICE9PSBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItcmVzdWx0cycpKTtcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHNbMF0uc3R5bGUud2lkdGggPSAkZWxlbWVudFswXS5jbGllbnRXaWR0aCAtIDIgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkc2NvcGUudHlwZSA9PT0gUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVTZWxlY3RlZFBlb3BsZSgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLmFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RlZFBlcnNvbnMuaW5kZXhPZihwZXJzb24pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMucHVzaChwZXJzb24pO1xuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJHNjb3BlLnNlbGVjdGVkUGVyc29ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLnJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZSA9IGZ1bmN0aW9uIChwZXJzb24sICRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmR4ID0gJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5pbmRleE9mKHBlcnNvbik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5zcGxpY2UoaW5keCwgMSk7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSgkc2NvcGUuc2VsZWN0ZWRQZXJzb25zKTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLnJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzID0gZnVuY3Rpb24gKHBlb3BsZSwgcGVyc29uLCAkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIGluZHggPSBwZW9wbGUuaW5kZXhPZihwZXJzb24pO1xuICAgICAgICAgICAgICAgIHBlb3BsZS5zcGxpY2UoaW5keCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3RoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICgkc2NvcGUudHlwZSA9PT0gUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdKSB7XG4gICAgICAgICAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmluc2VydEZhY2VQaWxlSGVhZGVyKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zZXJ0RmFjZVBpbGVTZWFyY2hNb3JlKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmdyb3VwZWRdID1cbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlcnNvbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtaW1hZ2UtdXJsPVxcXCJ7e3BlcnNvbi5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlKHBlcnNvbiwgJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hUmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7e3BsYWNlaG9sZGVyfX1cXFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcInNlYXJjaFF1ZXJ5XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwVGl0bGVcXFwiPnt7Z3JvdXBEYXRhLmdyb3VwLm5hbWV9fTwvZGl2PlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsb3NlLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VhcmNoUmVzdWx0c1xcXCJcXG4gICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmVdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUubWVkaXVtXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuY29tcGFjdF0gPVxuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXIgbXMtUGVvcGxlUGlja2VyLS1jb21wYWN0XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlcnNvbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtaW1hZ2UtdXJsPVxcXCJ7e3BlcnNvbi5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlKHBlcnNvbiwgJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hUmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwVGl0bGVcXFwiPnt7Z3JvdXBEYXRhLmdyb3VwLm5hbWV9fTwvZGl2PlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1waWNrZXItdHlwZT1cXFwiXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5tZW1iZXJMaXN0XSA9IFwiXFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyIG1zLVBlb3BsZVBpY2tlci0tbWVtYmVyc0xpc3RcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7e3BsYWNlaG9sZGVyfX1cXFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcInNlYXJjaFF1ZXJ5XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0ucm91bmRdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUubWVkaXVtXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkIG5nLW1vZGVsPVxcXCJzZWxlY3RlZFBlcnNvbnNcXFwiXFxuICAgICAgICB1aWYtc2VsZWN0ZWQtcGVyc29uLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2U9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQ+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0gPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLUZhY2VwaWxlXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlb3BsZUxpc3RIZWFkZXJcXFwiPlxcbiAgICAgICAgICAgICAgPHNwYW4+e3tmYWNlUGlsZUhlYWRlcn19PC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3RcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJhZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlXFxcIlxcbiAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5yb3VuZF0gKyBcIlxcXCJcXG4gICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUuc21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtc2VhcmNoLW1vcmVcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQgbmctbW9kZWw9XFxcInNlbGVjdGVkUGVyc29uc1xcXCJcXG4gICAgICAgIHVpZi1zZWxlY3RlZC1wZXJzb24tY2xpY2s9XFxcIm9uU2VsZWN0ZWRQZXJzb25DbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbG9zZT1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWlmLXBlb3BsZS1oZWFkZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgPC91aWYtcGVvcGxlLXBpY2tlci1zZWxlY3RlZD5cXG5cXG4gICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdyk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckZG9jdW1lbnQnLCAnJHRpbWVvdXQnLCAnJGxvZycsICckd2luZG93J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmluaXREaXNhYmxlZFN0YXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkc2NvcGUsICRhdHRycykge1xuICAgICAgICB2YXIgJHNlYXJjaEZpZWxkID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgICRhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzZWFyY2hGaWVsZC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNlYXJjaEZpZWxkLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5hbmltYXRlU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRzZWxlY3RlZFBlb3BsZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlJykpO1xuICAgICAgICAkc2VsZWN0ZWRQZW9wbGUuYWRkQ2xhc3MoJ21zLXUtc2xpZGVEb3duSW4yMCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgJHNlbGVjdGVkUGVvcGxlLnJlbW92ZUNsYXNzKCdtcy11LXNsaWRlRG93bkluMjAnKTsgfSwgMTAwMCk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmN1cnJlbnRZUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQodGhpcy4kZG9jdW1lbnRbMF0pLmZpbmQoJ2JvZHknKVswXTtcbiAgICAgICAgaWYgKGJvZHkuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmVsbVlQb3NpdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciB5ID0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgIHZhciBub2RlID0gZWxlbWVudDtcbiAgICAgICAgd2hpbGUgKG5vZGUub2Zmc2V0UGFyZW50ICYmIG5vZGUub2Zmc2V0UGFyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBub2RlID0gKG5vZGUub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICAgIHkgKz0gbm9kZS5vZmZzZXRUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnNtb290aFNjcm9sbFRvID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHN0YXJ0WSA9IHRoaXMuY3VycmVudFlQb3NpdGlvbigpO1xuICAgICAgICB2YXIgc3RvcFkgPSB0aGlzLmVsbVlQb3NpdGlvbihlbGVtZW50KTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gc3RvcFkgPiBzdGFydFkgPyBzdG9wWSAtIHN0YXJ0WSA6IHN0YXJ0WSAtIHN0b3BZO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCAxMDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdG9wWSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNwZWVkID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDMwKTtcbiAgICAgICAgaWYgKHNwZWVkID49IDIwKSB7XG4gICAgICAgICAgICBzcGVlZCA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGVwID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDI1KTtcbiAgICAgICAgdmFyIGxlYXBZID0gc3RvcFkgPiBzdGFydFkgPyBzdGFydFkgKyBzdGVwIDogc3RhcnRZIC0gc3RlcDtcbiAgICAgICAgdmFyIHRpbWVyID0gMDtcbiAgICAgICAgaWYgKHN0b3BZID4gc3RhcnRZKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRZOyBpIDwgc3RvcFk7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiAobFksIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbFkpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0ICogc3BlZWQpO1xuICAgICAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICAgICAgbGVhcFkgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAobGVhcFkgPiBzdG9wWSkge1xuICAgICAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydFk7IGkgPiBzdG9wWTsgaSAtPSBzdGVwKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKGxZLCB0KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBsWSk7XG4gICAgICAgICAgICAgICAgfSwgdCAqIHNwZWVkKTtcbiAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICBsZWFwWSAtPSBzdGVwO1xuICAgICAgICAgICAgaWYgKGxlYXBZIDwgc3RvcFkpIHtcbiAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXIrKztcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZUhlYWRlciA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXBlb3BsZS1oZWFkZXInKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRDb3VudCcpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZVNlYXJjaE1vcmUgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1zZWFyY2gtbW9yZScpKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ21zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnJlc2l6ZVNlYXJjaEZpZWxkID0gZnVuY3Rpb24gKCRwZW9wbGVQaWNrZXIpIHtcbiAgICAgICAgdmFyICRzZWFyY2hCb3ggPSBhbmd1bGFyLmVsZW1lbnQoJHBlb3BsZVBpY2tlclswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveCcpKTtcbiAgICAgICAgdmFyICRzZWFyY2hGaWVsZCA9IGFuZ3VsYXIuZWxlbWVudCgkcGVvcGxlUGlja2VyWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgIHZhciBzZWFyY2hCb3hMZWZ0RWRnZSA9ICRzZWFyY2hCb3gucHJvcCgnb2Zmc2V0TGVmdCcpO1xuICAgICAgICB2YXIgc2VhcmNoQm94V2lkdGggPSAkc2VhcmNoQm94WzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgc2VhcmNoQm94UmlnaHRFZGdlID0gc2VhcmNoQm94TGVmdEVkZ2UgKyBzZWFyY2hCb3hXaWR0aDtcbiAgICAgICAgdmFyICRwZXJzb25hTm9kZXMgPSAkc2VhcmNoQm94WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1QZW9wbGVQaWNrZXItcGVyc29uYScpO1xuICAgICAgICBpZiAoJHBlcnNvbmFOb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRzZWFyY2hGaWVsZFswXS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGxhc3RQZXJzb25hID0gYW5ndWxhci5lbGVtZW50KCRwZXJzb25hTm9kZXNbJHBlcnNvbmFOb2Rlcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYUxlZnRFZGdlID0gJGxhc3RQZXJzb25hLnByb3AoJ29mZnNldExlZnQnKTtcbiAgICAgICAgdmFyIGxhc3RQZXJzb25hV2lkdGggPSAkbGFzdFBlcnNvbmFbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYVJpZ2h0RWRnZSA9IGxhc3RQZXJzb25hTGVmdEVkZ2UgKyBsYXN0UGVyc29uYVdpZHRoO1xuICAgICAgICB2YXIgbmV3RmllbGRXaWR0aCA9IHNlYXJjaEJveFJpZ2h0RWRnZSAtIGxhc3RQZXJzb25hUmlnaHRFZGdlIC0gNTtcbiAgICAgICAgaWYgKG5ld0ZpZWxkV2lkdGggPCAxMDApIHtcbiAgICAgICAgICAgIG5ld0ZpZWxkV2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSBuZXdGaWVsZFdpZHRoICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyJztcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gUGVvcGxlUGlja2VyRGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPHVsIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0TGlzdFxcXCI+XFxuICAgIDxsaSBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdFxcXCIgbmctcmVwZWF0PVxcXCJwZXJzb24gaW4gcGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QnRuXFxcIlxcbiAgICAgIG5nLWNsYXNzPVxcXCJ7J21zLVBlb3BsZVBpY2tlci1yZXN1bHRCdG4tLWNvbXBhY3QnOiBwaWNrZXJUeXBlID09PSAnY29tcGFjdCd9XFxcIiBuZy1jbGljaz1cXFwib25QZXJzb25DbGljaygpKHBlcnNvbilcXFwiPlxcbiAgICAgICAgPHVpZi1wZXJzb25hXFxuICAgICAgICAgIHVpZi1zdHlsZT1cXFwie3twZXJzb25TdHlsZX19XFxcIlxcbiAgICAgICAgICB1aWYtc2l6ZT1cXFwie3twZXJzb25TaXplfX1cXFwiXFxuICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3twZXJzb24uY29sb3J9fVxcXCI+e3twZXJzb24uaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICA8YnV0dG9uXFxuICAgICAgICAgIG5nLWlmPVxcXCIhcGVyc29uLmFkZGl0aW9uYWxEYXRhICYmIG9uUGVyc29uQ2xvc2VDbGljaygpXFxcIlxcbiAgICAgICAgICBuZy1jbGljaz1cXFwib25QZXJzb25DbG9zZUNsaWNrKCkocGVvcGxlLCBwZXJzb24sICRldmVudClcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWN0aW9uIGpzLXJlc3VsdFJlbW92ZVxcXCI+XFxuICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICBuZy1pZj1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIlxcbiAgICAgICAgICBuZy1jbGljaz1cXFwiZXhwYW5kQWRkaXRpb25hbERhdGEoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBY3Rpb24ganMtcmVzdWx0UmVtb3ZlXFxcIj5cXG4gICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5jaGV2cm9uc0Rvd25dICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IG5nLWlmPVxcXCJwZXJzb24uYWRkaXRpb25hbERhdGFcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWRkaXRpb25hbENvbnRlbnRcXFwiPlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICBuZy1tb2RlbD1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwib25QZXJzb25DbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbG9zZS1jbGljaz1cXFwib25QZXJzb25DbG9zZUNsaWNrKClcXFwiXFxuICAgICAgICB1aWYtcGlja2VyLXR5cGU9XFxcInt7cGlja2VyVHlwZX19XFxcIlxcbiAgICAgICAgdWlmLXN0eWxlPVxcXCJ7e3BlcnNvblN0eWxlfX1cXFwiXFxuICAgICAgICB1aWYtc2l6ZT1cXFwie3twZXJzb25TaXplfX1cXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvbGk+XFxuICA8L3VsPlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25QZXJzb25DbGljazogJyZ1aWZQZXJzb25DbGljaycsXG4gICAgICAgICAgICBvblBlcnNvbkNsb3NlQ2xpY2s6ICcmdWlmUGVyc29uQ2xvc2VDbGljaycsXG4gICAgICAgICAgICBwZW9wbGU6ICc9bmdNb2RlbCcsXG4gICAgICAgICAgICBwZXJzb25TaXplOiAnQHVpZlNpemUnLFxuICAgICAgICAgICAgcGVyc29uU3R5bGU6ICdAdWlmU3R5bGUnLFxuICAgICAgICAgICAgcGlja2VyVHlwZTogJ0B1aWZQaWNrZXJUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLmV4cGFuZEFkZGl0aW9uYWxEYXRhID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkYnV0dG9uLnBhcmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnbXMtUGVvcGxlUGlja2VyLXJlc3VsdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnRvZ2dsZUNsYXNzKCdpcy1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbiA9ICRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZQZW9wbGVQaWNrZXJSZXN1bHRMaXN0JztcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUgPSBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlO1xudmFyIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2VhcmNoQ2FsbGJhY2tzID0gW107XG4gICAgfVxuICAgIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyLnByb3RvdHlwZS5pc1NlYXJjaGluZyA9IGZ1bmN0aW9uIChzZWFyY2hpbmcpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUucHJvY2Vzc2luZyA9IHNlYXJjaGluZztcbiAgICAgICAgc2VhcmNoaW5nID8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtc2VhcmNoaW5nJykgOiB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWFyY2hpbmcnKTtcbiAgICB9O1xuICAgIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuICAgIHJldHVybiBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyID0gUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXI7XG52YXIgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlIGpzLXNlYXJjaE1vcmVcXFwiXFxuICAgIG5nLWNsYXNzPVxcXCJ7J21zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlLS1kaXNjb25uZWN0ZWQnOiBkaXNjb25uZWN0ZWR9XFxcIj5cXG4gICAgPGJ1dHRvbiBuZy1pZj1cXFwicGlja2VyVHlwZSA9PT0gJ1wiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJwaWNrZXJUeXBlID09PSAnXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInBpY2tlclR5cGUgPT09ICdcIiArIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPHVpZi1zcGlubmVyIG5nLXNob3c9XFxcInByb2Nlc3NpbmdcXFwiPjwvdWlmLXNwaW5uZXI+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGRpc2Nvbm5lY3RlZDogJz11aWZEaXNjb25uZWN0ZWQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBlb3BsZVBpY2tlckN0cmwsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUucGlja2VyVHlwZSA9IHBlb3BsZVBpY2tlckN0cmwucGlja2VyVHlwZSgpO1xuICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYnJvYWRjYXN0KHBlb3BsZVNlYXJjaEV2ZW50TmFtZSwgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2hRdWVyeSgpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlU2VhcmNoTW9yZSc7XG4gICAgcmV0dXJuIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlID0gUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZTtcbnZhciBQcmltYXJ5VGV4dENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByaW1hcnlUZXh0Q29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihwZW9wbGVTZWFyY2hFdmVudE5hbWUsIGZ1bmN0aW9uICgkZXZlbnQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICBfdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnkgPSBxdWVyeTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaW1hcnlUZXh0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbiAgICByZXR1cm4gUHJpbWFyeVRleHRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUHJpbWFyeVRleHRDb250cm9sbGVyID0gUHJpbWFyeVRleHRDb250cm9sbGVyO1xudmFyIFByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyhcIl5eXCIgKyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpLCAoXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpXTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUHJpbWFyeVRleHRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5kaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZVByaW1hcnlcXFwiPlxcbiAgICA8ZGl2IG5nLXNob3c9XFxcIiRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj57e3NlYXJjaGluZ0ZvclRleHR9fSB7e3NlYXJjaFF1ZXJ5fX08L2Rpdj5cXG4gICAgPG5nLXRyYW5zY2x1ZGUgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaGluZ0ZvclRleHQ6ICdAP3VpZlNlYXJjaEZvclRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaGluZ0ZvclRleHQgPSAkc2NvcGUuc2VhcmNoaW5nRm9yVGV4dCB8fCAnU2VhcmNoaW5nIGZvcic7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFByaW1hcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUHJpbWFyeVRleHQnO1xuICAgIHJldHVybiBQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlByaW1hcnlUZXh0RGlyZWN0aXZlID0gUHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQuZGlzY29ubmVjdGVkXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVTZWNvbmRhcnlcXFwiPlxcbiAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRydWU7XG4gICAgfVxuICAgIFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmU2Vjb25kYXJ5VGV4dCc7XG4gICAgcmV0dXJuIFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5TZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiJHBhcmVudC4kcGFyZW50LmRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlUHJpbWFyeVxcXCI+XFxuICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICB9XG4gICAgRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZEaXNjb25uZWN0ZWRUZXh0JztcbiAgICByZXR1cm4gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUgPSBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtYWN0aXZlJzogc2VsZWN0ZWRQZW9wbGUgJiYgc2VsZWN0ZWRQZW9wbGUubGVuZ3RoID4gMH1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkSGVhZGVyXFxcIj5cXG4gICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDx1bCBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGxpIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRQZXJzb25cXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnJvdW5kXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZSgpKHBlcnNvbiwgJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBY3Rpb24ganMtcmVzdWx0UmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgPC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25TZWxlY3RlZFBlcnNvbkNsaWNrOiAnJj91aWZTZWxlY3RlZFBlcnNvbkNsaWNrJyxcbiAgICAgICAgICAgIHJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZTogJyZ1aWZQZXJzb25DbG9zZScsXG4gICAgICAgICAgICBzZWxlY3RlZFBlb3BsZTogJz1uZ01vZGVsJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlBlb3BsZVBpY2tlclNlbGVjdGVkJztcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSA9IFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlO1xudmFyIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8c3BhbiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkQ291bnRcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlwiO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IHBlb3BsZVBpY2tlckN0cmwuZ2V0U2VsZWN0ZWRQZXJzb25zKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmU2VsZWN0ZWRQZW9wbGVIZWFkZXInO1xuICAgIHJldHVybiBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlID0gU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZW9wbGVwaWNrZXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUHJpbWFyeVRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVvcGxlcGlja2VyL3Blb3BsZVBpY2tlckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9