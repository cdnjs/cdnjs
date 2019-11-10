/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * Angular 1.x directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.12.3
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
	        $scope.adjustVisibleElements = function () {
	            var width = $window.innerWidth;
	            var elementsToShow = (width > BreadcrumbController._breakingWidth) ? 4 : 2;
	            if (elementsToShow !== $scope.visibleElements) {
	                $scope.visibleElements = elementsToShow;
	                $scope.$apply();
	            }
	        };
	        $document.find('html').on('click', function (event) {
	            $scope.overflowMenuOpen = false;
	            $scope.$apply();
	        });
	        windowElement.on('resize', function () {
	            $scope.adjustVisibleElements();
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
	    BreadcrumbDirective.prototype.link = function (scope, instanceElement, attrs, breadcrumbController) {
	        scope.adjustVisibleElements();
	    };
	    ;
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
	            if (!ng.isUndefined($attrs.uifType) && ng.isUndefined(buttonTypeEnum_1.ButtonTypeEnum[$attrs.uifType])) {
	                _this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.button - Unsupported button: ' +
	                    'The button (\'' + $attrs.uifType + '\') is not supported by the Office UI Fabric. ' +
	                    'Supported options are listed here: ' +
	                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/button/buttonTypeEnum.ts');
	            }
	            switch ($attrs.uifType) {
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.primary]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.primaryButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.primaryLink];
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.command]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.commandButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.commandLink];
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.compound]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.compoundButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.compoundLink];
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.hero]:
	                    return ng.isUndefined($attrs.ngHref)
	                        ? _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.heroButton]
	                        : _this.templateOptions[buttonTemplateType_1.ButtonTemplateType.heroLink];
	                default:
	                    return ng.isUndefined($attrs.ngHref)
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
	        if (ng.isUndefined(attrs.uifType) ||
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
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.compound]:
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
	                case buttonTypeEnum_1.ButtonTypeEnum[buttonTypeEnum_1.ButtonTypeEnum.hero]:
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
	exports.module = ng.module('officeuifabric.components.facepile', [
	    'officeuifabric.components'
	])
	    .directive('uifFacepile', FacepileDirective.factory())
	    .directive('uifFacepileAddIcon', FacepileAddIconDirective.factory());


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	exports.module = ng.module('officeuifabric.components.icon', [
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	        this.template = "\n    <div class=\"ms-MessageBanner\" ng-show=\"uifIsVisible\">\n    <div class=\"ms-MessageBanner-content\">\n    <div class=\"ms-MessageBanner-text\">\n    <div class=\"ms-MessageBanner-clipper\"></div>\n    </div>\n    <uif-button type=\"button\" uif-type=\"command\" class=\"ms-MessageBanner-expand\" ng-show=\"!isExpanded\" style=\"height:52px\">\n    <uif-icon uif-type=\"chevronsDown\"></uif-icon>\n    </uif-button>\n    <uif-button type=\"button\" uif-type=\"command\" class=\"ms-MessageBanner-expand\" ng-show=\"isExpanded\" style=\"height:52px\">\n    <uif-icon uif-type=\"chevronsUp\"></uif-icon>\n    </uif-button>\n    <div class=\"ms-MessageBanner-action\">\n    <uif-button type=\"button\" uif-type=\"primary\" class=\"ms-fontColor-neutralLight\" ng-click=\"uifAction()\">{{ uifActionLabel }}</uif-button>\n    </div>\n    </div>\n    <uif-button type=\"button\" uif-type=\"command\" class=\"ms-MessageBanner-close\" ng-click=\"uifOnClose()\" style=\"height:52px\">\n    <uif-icon uif-type=\"x\"></uif-icon>\n    </uif-button>\n    </div>";
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	exports.module = ng.module('officeuifabric.components.messagebar', ['officeuifabric.components'])
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	exports.module = ng.module('officeuifabric.components.overlay', [
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
	var ng = __webpack_require__(2);
	var panelDirectiveEnum_1 = __webpack_require__(36);
	var PanelDirective = (function () {
	    function PanelDirective($log, $animate, $timeout) {
	        this.$log = $log;
	        this.$animate = $animate;
	        this.$timeout = $timeout;
	        this.restrict = 'E';
	        this.template = "<div class=\"ms-Panel\">\n                              <div  class=\"ms-Overlay\"\n                                    ng-click=\"closePanel()\"\n                                    ng-class=\"uifShowOverlay === true ? 'ms-Overlay--dark' : '';\"></div>\n                              <div class=\"ms-Panel-main\">\n                                <div class=\"ms-Panel-commands\">\n                                  <button type=\"button\" ng-if=\"uifShowClose\" class='ms-Panel-closeButton' ng-click=\"closePanel()\">\n                                    <uif-icon uif-type='x'></uif-icon>\n                                  </button>\n                                </div>\n                                <div class=\"ms-Panel-contentInner\">\n                                </div>\n                              </div>\n                             </div>";
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
	exports.module = ng.module('officeuifabric.components.panel', [
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
	var ng = __webpack_require__(2);
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
	var ng = __webpack_require__(2);
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
	var ng = __webpack_require__(2);
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	var ng = __webpack_require__(2);
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
	var ng = __webpack_require__(2);
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
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
	var ng = __webpack_require__(2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNGEzM2E3OTYxZDI1MTM2N2QwYyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVGVtcGxhdGVUeXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9mYWNlcGlsZS9mYWNlcGlsZURpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhci9tZXNzYWdlQmFyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheU1vZGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9wZXJzb25hY2FyZERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9wbGFjZWhvbGRlckVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVN0eWxlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdFNpemVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90VHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQSxnRDs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTBELFFBQVEsY0FBYyxhQUFhO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHNDQUFzQztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsMEpBQXlKLHFEQUFxRDtBQUM5TTtBQUNBLGlIQUFnSCxxREFBcUQ7QUFDcks7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUMsOENBQThDO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCLFVBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHdDQUF3QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDBDQUF5Qyw4R0FBOEc7QUFDdko7QUFDQTtBQUNBLDJFQUEwRSxhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXdFLHVCQUF1QjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx5QkFBd0I7QUFDeEIsbUVBQWtFO0FBQ2xFLDRCQUEyQixRQUFRO0FBQ25DLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBd0QsNEJBQTRCLEtBQUssdUJBQXVCO0FBQ2hIO0FBQ0EsK0JBQThCO0FBQzlCLGdFQUErRDtBQUMvRDtBQUNBLDJCQUEwQixNQUFNLElBQUksTUFBTTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGtDQUFrQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0I7QUFDeEI7QUFDQSxrRUFBaUU7QUFDakUsdUNBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXdFLG9EQUFvRDtBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0RBQXdEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDhFQUE4RTtBQUMvRTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVFQUF1RTtBQUMvRjtBQUNBLGdEQUErQyxlQUFlO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MseUNBQXlDLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQ3pKO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrakJBQWlqQixvQkFBb0IsK0hBQStILGFBQWEsK0VBQStFLGNBQWMsS0FBSyxpQkFBaUIsdVdBQXVXLGlOQUFpTixtQ0FBbUMsc2JBQXNiLGdCQUFnQixHQUFHLGlCQUFpQix5S0FBeUssb0JBQW9CLGlJQUFpSSxhQUFhLGlGQUFpRixjQUFjLEtBQUssaUJBQWlCLDZGQUE2RixvQkFBb0IsbUdBQW1HLHNCQUFzQjtBQUNuaUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd09BQXVPLG9lQUFvZSx5QkFBeUIsNmNBQTZjLCtCQUErQjtBQUNodEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx1REFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDRDQUE0QztBQUM3QztBQUNBOzs7Ozs7O0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkJBQTZCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsVUFBVTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNEJBQTRCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQiwrQkFBK0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLCtC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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywwQ0FBMEM7QUFDL0U7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLDJDQUEyQztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsdUJBQXVCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJuZ09mZmljZVVpRmFicmljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKSA6IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDI0YTMzYTc5NjFkMjUxMzY3ZDBjXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvcmUnLCBbXSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvcmUvY29yZS50c1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBicmVhZGNydW1iTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWJEaXJlY3RpdmUnKTtcbnZhciBidXR0b25Nb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUnKTtcbnZhciBjYWxsb3V0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXREaXJlY3RpdmUnKTtcbnZhciBjaG9pY2VmaWVsZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUnKTtcbnZhciBjb21tYW5kQmFyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUnKTtcbnZhciBjb250ZW50TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb250ZW50L2NvbnRlbnREaXJlY3RpdmUnKTtcbnZhciBjb250ZXh0dWFsTWVudU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUnKTtcbnZhciBkYXRlcGlja2VyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXJEaXJlY3RpdmUnKTtcbnZhciBkaWFsb2dNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dEaXJlY3RpdmUnKTtcbnZhciBkcm9wZG93bk1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd25EaXJlY3RpdmUnKTtcbnZhciBmYWNlcGlsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZmFjZXBpbGUvZmFjZXBpbGVEaXJlY3RpdmUnKTtcbnZhciBpY29uTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUnKTtcbnZhciBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbGFiZWwvbGFiZWxEaXJlY3RpdmUnKTtcbnZhciBsaW5rTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUnKTtcbnZhciBsaXN0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9saXN0L2xpc3REaXJlY3RpdmUnKTtcbnZhciBtZXNzYWdlQmFubmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUnKTtcbnZhciBtZXNzYWdlQmFyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJEaXJlY3RpdmUnKTtcbnZhciBuYXZCYXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUnKTtcbnZhciBvdmVybGF5TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUnKTtcbnZhciBwYW5lbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmUnKTtcbnZhciBwZXJzb25hY2FyZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUnKTtcbnZhciBwZXJzb25hTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wZXJzb25hL3BlcnNvbmFEaXJlY3RpdmUnKTtcbnZhciBwaXZvdE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGl2b3QvcGl2b3REaXJlY3RpdmUnKTtcbnZhciBwcm9ncmVzc0luZGljYXRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUnKTtcbnZhciBzZWFyY2hib3hNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NlYXJjaGJveC9zZWFyY2hib3hEaXJlY3RpdmUnKTtcbnZhciBzcGlubmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUnKTtcbnZhciB0YWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUnKTtcbnZhciB0ZXh0RmllbGRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUnKTtcbnZhciB0b2dnbGVNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUnKTtcbnZhciBvcmdDaGFydE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUnKTtcbnZhciBwZW9wbGVQaWNrZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUnKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJywgW1xuICAgIGJyZWFkY3J1bWJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgYnV0dG9uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNhbGxvdXRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY2hvaWNlZmllbGRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY29tbWFuZEJhck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb250ZW50TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNvbnRleHR1YWxNZW51TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRhdGVwaWNrZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgZGlhbG9nTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRyb3Bkb3duTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGZhY2VwaWxlTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGljb25Nb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGFiZWxNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGlua01vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBsaXN0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG1lc3NhZ2VCYW5uZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbWVzc2FnZUJhck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBuYXZCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgb3ZlcmxheU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwYW5lbE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwZW9wbGVQaWNrZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGVyc29uYWNhcmRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGVyc29uYU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwaXZvdE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwcm9ncmVzc0luZGljYXRvck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBzZWFyY2hib3hNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgc3Bpbm5lck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0YWJsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0ZXh0RmllbGRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdG9nZ2xlTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG9yZ0NoYXJ0TW9kdWxlLm1vZHVsZS5uYW1lXG5dKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9jb21wb25lbnRzLnRzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iTGlua0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZCcmVhZGNydW1iJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICcnICtcbiAgICAgICAgICAgICc8bGkgY2xhc3M9XCJtcy1CcmVhZGNydW1iLWxpc3RJdGVtXCI+JyArXG4gICAgICAgICAgICAnPGEgY2xhc3M9XCJtcy1CcmVhZGNydW1iLWl0ZW1MaW5rXCIgbmctaHJlZj1cInt7bmdIcmVmfX1cIiB0YWJpbmRleD1cInt7dWlmVGFiaW5kZXh9fVwiIG5nLXRyYW5zY2x1ZGU+PC9hPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtQnJlYWRjcnVtYi1jaGV2cm9uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPicgK1xuICAgICAgICAgICAgJzwvbGk+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIHRhYmluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkuY2hpbGRyZW4oKSwgaW5zdGFuY2VFbGVtZW50WzBdKSArIDI7XG4gICAgICAgIHNjb3BlLnVpZlRhYmluZGV4ID0gdGFiaW5kZXg7XG4gICAgfTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iTGlua0RpcmVjdGl2ZSA9IEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlO1xudmFyIEJyZWFkY3J1bWJMaW5rID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iTGluayhocmVmLCBsaW5rVGV4dCkge1xuICAgICAgICB0aGlzLmhyZWYgPSBocmVmO1xuICAgICAgICB0aGlzLmxpbmtUZXh0ID0gbGlua1RleHQ7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZGNydW1iTGluaztcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJMaW5rID0gQnJlYWRjcnVtYkxpbms7XG52YXIgQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJDb250cm9sbGVyKCRzY29wZSwgJGRvY3VtZW50LCAkd2luZG93KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgdmFyIHdpbmRvd0VsZW1lbnQgPSBuZy5lbGVtZW50KCR3aW5kb3cpO1xuICAgICAgICAkc2NvcGUudmlzaWJsZUVsZW1lbnRzID0gNDtcbiAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLmlzT3ZlcmZsb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3ZlcmZsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJmbG93ID0gbmcuaXNEZWZpbmVkKCRzY29wZS51aWZCcmVhZGNydW1iTGlua3MpICYmICRzY29wZS51aWZCcmVhZGNydW1iTGlua3MubGVuZ3RoID4gJHNjb3BlLnZpc2libGVFbGVtZW50cztcbiAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdztcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm92ZXJmbG93RWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzT3ZlcmZsb3coKSA/ICRzY29wZS51aWZCcmVhZGNydW1iTGlua3MubGVuZ3RoIC0gJHNjb3BlLnZpc2libGVFbGVtZW50cyA6IDA7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5vcGVuT3ZlcmZsb3cgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuYWRqdXN0VmlzaWJsZUVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gJHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRzVG9TaG93ID0gKHdpZHRoID4gQnJlYWRjcnVtYkNvbnRyb2xsZXIuX2JyZWFraW5nV2lkdGgpID8gNCA6IDI7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHNUb1Nob3cgIT09ICRzY29wZS52aXNpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudmlzaWJsZUVsZW1lbnRzID0gZWxlbWVudHNUb1Nob3c7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkZG9jdW1lbnQuZmluZCgnaHRtbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvd0VsZW1lbnQub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzY29wZS5hZGp1c3RWaXNpYmxlRWxlbWVudHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEJyZWFkY3J1bWJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZG9jdW1lbnQnLCAnJHdpbmRvdyddO1xuICAgIEJyZWFkY3J1bWJDb250cm9sbGVyLl9icmVha2luZ1dpZHRoID0gNjM5O1xuICAgIHJldHVybiBCcmVhZGNydW1iQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJDb250cm9sbGVyID0gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG52YXIgQnJlYWRjcnVtYkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJlYWRjcnVtYkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICcnICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtQnJlYWRjcnVtYlwiIG5nLWNsYXNzPVwie1xcJ2lzLW92ZXJmbG93XFwnOiBpc092ZXJmbG93KCl9XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLUJyZWFkY3J1bWItb3ZlcmZsb3dcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtQnJlYWRjcnVtYi1vdmVyZmxvd0J1dHRvbiBtcy1JY29uIG1zLUljb24tLWVsbGlwc2lzXCIgbmctY2xpY2s9XCJvcGVuT3ZlcmZsb3coJGV2ZW50KVwiIHRhYmluZGV4PVwiMVwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtQnJlYWRjcnVtYi1jaGV2cm9uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1CcmVhZGNydW1iLW92ZXJmbG93TWVudVwiIG5nLWNsYXNzPVwie1xcJ2lzLW9wZW5cXCc6IG92ZXJmbG93TWVudU9wZW59XCI+JyArXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibXMtQ29udGV4dHVhbE1lbnUgaXMtb3BlblwiPicgK1xuICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cIiAnICtcbiAgICAgICAgICAgICduZy1yZXBlYXQ9XCJsaW5rIGluIHVpZkJyZWFkY3J1bWJMaW5rcyB8IGxpbWl0VG86b3ZlcmZsb3dFbGVtZW50cygpXCI+JyArXG4gICAgICAgICAgICAnPGEgY2xhc3M9XCJtcy1Db250ZXh0dWFsTWVudS1saW5rXCIgbmctaHJlZj1cInt7bGluay5ocmVmfX1cIj57e2xpbmsubGlua1RleHR9fTwvYT4nICtcbiAgICAgICAgICAgICc8L2xpPicgK1xuICAgICAgICAgICAgJzwvdWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibXMtQnJlYWRjcnVtYi1saXN0XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1icmVhZGNydW1iLWxpbmsgbmctcmVwZWF0PVwibGluayBpbiB1aWZCcmVhZGNydW1iTGlua3MgfCBsaW1pdFRvOi12aXNpYmxlRWxlbWVudHNcIiAnICtcbiAgICAgICAgICAgICduZy1ocmVmPVwie3tsaW5rLmhyZWZ9fVwiPnt7bGluay5saW5rVGV4dH19PC91aWYtYnJlYWRjcnVtYi1saW5rPicgK1xuICAgICAgICAgICAgJzwvdWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICd1aWZCcmVhZGNydW1iJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZCcmVhZGNydW1iTGlua3MnOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQnJlYWRjcnVtYkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJyZWFkY3J1bWJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJyZWFkY3J1bWJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGJyZWFkY3J1bWJDb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLmFkanVzdFZpc2libGVFbGVtZW50cygpO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBCcmVhZGNydW1iRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQnJlYWRjcnVtYkRpcmVjdGl2ZSA9IEJyZWFkY3J1bWJEaXJlY3RpdmU7XG47XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5icmVhZGNydW1iJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmQnJlYWRjcnVtYicsIEJyZWFkY3J1bWJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJyZWFkY3J1bWJMaW5rJywgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWJEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgYnV0dG9uVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vYnV0dG9uVHlwZUVudW0nKTtcbnZhciBidXR0b25UZW1wbGF0ZVR5cGVfMSA9IHJlcXVpcmUoJy4vYnV0dG9uVGVtcGxhdGVUeXBlJyk7XG52YXIgQnV0dG9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnV0dG9uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIEJ1dHRvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBCdXR0b25Db250cm9sbGVyO1xufSgpKTtcbnZhciBCdXR0b25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnV0dG9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnYnV0dG9uJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRhdHRycy51aWZUeXBlKSAmJiBuZy5pc1VuZGVmaW5lZChidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtWyRhdHRycy51aWZUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5idXR0b24gLSBVbnN1cHBvcnRlZCBidXR0b246ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGJ1dHRvbiAoXFwnJyArICRhdHRycy51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKCRhdHRycy51aWZUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0ucHJpbWFyeV06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmcuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRMaW5rXTtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kTGlua107XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0uaGVyb106XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25MaW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcG9wdWxhdGVIdG1sVGVtcGxhdGVzKCk7XG4gICAgfVxuICAgIEJ1dHRvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBCdXR0b25EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmssXG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gISFpc0Rpc2FibGVkO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoYXR0cnMudWlmVHlwZSkgfHxcbiAgICAgICAgICAgIGF0dHJzLnVpZlR5cGUgPT09IGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5wcmltYXJ5XSB8fFxuICAgICAgICAgICAgYXR0cnMudWlmVHlwZSA9PT0gYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXSkge1xuICAgICAgICAgICAgdmFyIGljb25FbGVtZW50ID0gZWxlbWVudC5maW5kKCd1aWYtaWNvbicpO1xuICAgICAgICAgICAgaWYgKGljb25FbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbiAtICcgK1xuICAgICAgICAgICAgICAgICAgICAnSWNvbiBub3QgYWxsb3dlZCBpbiBwcmltYXJ5IG9yIGNvbXBvdW5kIGJ1dHRvbnM6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHByaW1hcnkgJiBjb21wb3VuZCBidXR0b24gZG9lcyBub3Qgc3VwcG9ydCBpbmNsdWRpbmcgaWNvbnMgaW4gdGhlIGJvZHkuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGljb24gaGFzIGJlZW4gcmVtb3ZlZCBidXQgbWF5IGNhdXNlIHJlbmRlcmluZyBlcnJvcnMuIENvbnNpZGVyIGJ1dHRvbnMgdGhhdCBzdXBwb3J0IGljb25zIHN1Y2ggYXMgY29tbWFuZCBvciBoZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlcjtcbiAgICAgICAgICAgIHN3aXRjaCAoYXR0cnMudWlmVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1pY29uJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF06XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lICE9PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS5jbGFzc0xpc3RbMF0gPT09ICduZy1zY29wZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZVtpXS5jbGFzc0xpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmhlcm9dOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1pY29uJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLl9wb3B1bGF0ZUh0bWxUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25CdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tcHJpbWFyeVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZExpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbW1hbmRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZEJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21wb3VuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tcG91bmRMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21wb3VuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0taGVyb1xcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWhlcm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQnV0dG9uRGlyZWN0aXZlID0gQnV0dG9uRGlyZWN0aXZlO1xudmFyIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZCdXR0b24nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1CdXR0b24tZGVzY3JpcHRpb25cIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgIH1cbiAgICBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSA9IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b24nLCBCdXR0b25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJ1dHRvbkRlc2NyaXB0aW9uJywgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChCdXR0b25UeXBlRW51bSkge1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wicHJpbWFyeVwiXSA9IDBdID0gXCJwcmltYXJ5XCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJjb21tYW5kXCJdID0gMV0gPSBcImNvbW1hbmRcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImNvbXBvdW5kXCJdID0gMl0gPSBcImNvbXBvdW5kXCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJoZXJvXCJdID0gM10gPSBcImhlcm9cIjtcbn0pKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gfHwgKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gPSB7fSkpO1xudmFyIEJ1dHRvblR5cGVFbnVtID0gZXhwb3J0cy5CdXR0b25UeXBlRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKEJ1dHRvblRlbXBsYXRlVHlwZSkge1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJhY3Rpb25CdXR0b25cIl0gPSAwXSA9IFwiYWN0aW9uQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImFjdGlvbkxpbmtcIl0gPSAxXSA9IFwiYWN0aW9uTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJwcmltYXJ5QnV0dG9uXCJdID0gMl0gPSBcInByaW1hcnlCdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wicHJpbWFyeUxpbmtcIl0gPSAzXSA9IFwicHJpbWFyeUxpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiY29tbWFuZEJ1dHRvblwiXSA9IDRdID0gXCJjb21tYW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbW1hbmRMaW5rXCJdID0gNV0gPSBcImNvbW1hbmRMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kQnV0dG9uXCJdID0gNl0gPSBcImNvbXBvdW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kTGlua1wiXSA9IDddID0gXCJjb21wb3VuZExpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiaGVyb0J1dHRvblwiXSA9IDhdID0gXCJoZXJvQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImhlcm9MaW5rXCJdID0gOV0gPSBcImhlcm9MaW5rXCI7XG59KShleHBvcnRzLkJ1dHRvblRlbXBsYXRlVHlwZSB8fCAoZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGUgPSB7fSkpO1xudmFyIEJ1dHRvblRlbXBsYXRlVHlwZSA9IGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UZW1wbGF0ZVR5cGUudHNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2FsbG91dFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2NhbGxvdXRUeXBlRW51bScpO1xudmFyIGNhbGxvdXRBcnJvd0VudW1fMSA9IHJlcXVpcmUoJy4vY2FsbG91dEFycm93RW51bScpO1xudmFyIENhbGxvdXRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIENhbGxvdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIENhbGxvdXRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dENvbnRyb2xsZXIgPSBDYWxsb3V0Q29udHJvbGxlcjtcbnZhciBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWhlYWRlclwiPjxwIGNsYXNzPVwibXMtQ2FsbG91dC10aXRsZVwiIG5nLXRyYW5zY2x1ZGU+PC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgbWFpbldyYXBwZXIgPSBpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XG4gICAgICAgIGlmICghbmcuaXNVbmRlZmluZWQobWFpbldyYXBwZXIpICYmIG1haW5XcmFwcGVyLmhhc0NsYXNzKCdtcy1DYWxsb3V0LW1haW4nKSkge1xuICAgICAgICAgICAgdmFyIGRldGFjaGVkSGVhZGVyID0gaW5zdGFuY2VFbGVtZW50LmRldGFjaCgpO1xuICAgICAgICAgICAgbWFpbldyYXBwZXIucHJlcGVuZChkZXRhY2hlZEhlYWRlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSA9IENhbGxvdXRIZWFkZXJEaXJlY3RpdmU7XG52YXIgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRDb250ZW50RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWNvbnRlbnRcIj48cCBjbGFzcz1cIm1zLUNhbGxvdXQtc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIENhbGxvdXRDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0Q29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXRDb250ZW50RGlyZWN0aXZlID0gQ2FsbG91dENvbnRlbnREaXJlY3RpdmU7XG52YXIgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWFjdGlvbnNcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeP3VpZkNhbGxvdXQnO1xuICAgIH1cbiAgICBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY2FsbG91dENvbnRyb2xsZXIpIHtcbiAgICAgICAgaWYgKG5nLmlzT2JqZWN0KGNhbGxvdXRDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJHNjb3BlLiR3YXRjaCgnaGFzU2VwYXJhdG9yJywgZnVuY3Rpb24gKGhhc1NlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNoaWxkcmVuID0gaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYnV0dG9uSW5kZXggPSAwOyBidXR0b25JbmRleCA8IGFjdGlvbkNoaWxkcmVuLmxlbmd0aDsgYnV0dG9uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbkNoaWxkcmVuLmVxKGJ1dHRvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hZGRDbGFzcygnbXMtQ2FsbG91dC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFucyA9IGFjdGlvbi5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzcGFuSW5kZXggPSAwOyBzcGFuSW5kZXggPCBhY3Rpb25TcGFucy5sZW5ndGg7IHNwYW5JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvblNwYW4gPSBhY3Rpb25TcGFucy5lcShzcGFuSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24tbGFiZWwnKSB8fCBhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24taWNvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblNwYW4uYWRkQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSA9IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlO1xudmFyIENhbGxvdXREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0IG1zLUNhbGxvdXQtLWFycm93e3thcnJvd0RpcmVjdGlvbn19XCIgJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtQ2FsbG91dC0tYWN0aW9uVGV4dFxcJzogaGFzU2VwYXJhdG9yLCBcXCdtcy1DYWxsb3V0LS1PT0JFXFwnOiB1aWZUeXBlPT1cXCdvb2JlXFwnLCcgK1xuICAgICAgICAgICAgJyBcXCdtcy1DYWxsb3V0LS1QZWVrXFwnOiB1aWZUeXBlPT1cXCdwZWVrXFwnLCBcXCdtcy1DYWxsb3V0LS1jbG9zZVxcJzogY2xvc2VCdXR0b259XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtbWFpblwiPjxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj48L2Rpdj48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkNhbGxvdXQnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nU2hvdzogJz0/JyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDYWxsb3V0Q29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2FsbG91dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENhbGxvdXREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBjYWxsb3V0Q29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndWlmVHlwZScsIGZ1bmN0aW9uIChjYWxsb3V0VHlwZSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGNhbGxvdXRUeXBlRW51bV8xLkNhbGxvdXRUeXBlW2NhbGxvdXRUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgY2FsbG91dFR5cGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlR5cGUuIEl0IHNob3VsZCBiZSBvb2JlIG9yIHBlZWsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghYXR0cnMudWlmQXJyb3cpIHtcbiAgICAgICAgICAgIHNjb3BlLmFycm93RGlyZWN0aW9uID0gJ0xlZnQnO1xuICAgICAgICB9XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCd1aWZBcnJvdycsIGZ1bmN0aW9uIChhdHRyQXJyb3dEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChjYWxsb3V0QXJyb3dFbnVtXzEuQ2FsbG91dEFycm93W2F0dHJBcnJvd0RpcmVjdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJBcnJvd0RpcmVjdGlvbiArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmQXJyb3cuIEl0IHNob3VsZCBiZSBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNhcGl0YWxpemVkRGlyZWN0aW9uID0gKGF0dHJBcnJvd0RpcmVjdGlvbi5jaGFyQXQoMCkpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBjYXBpdGFsaXplZERpcmVjdGlvbiArPSAoYXR0ckFycm93RGlyZWN0aW9uLnNsaWNlKDEpKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgc2NvcGUuYXJyb3dEaXJlY3Rpb24gPSBjYXBpdGFsaXplZERpcmVjdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmhhc1NlcGFyYXRvciA9ICghbmcuaXNVbmRlZmluZWQoYXR0cnMudWlmQWN0aW9uVGV4dCkgfHwgIW5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlNlcGFyYXRvcikpO1xuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNsb3NlKSkge1xuICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uRWxlbWVudCA9IG5nLmVsZW1lbnQoJzxidXR0b24gY2xhc3M9XCJtcy1DYWxsb3V0LWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPicgK1xuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT4nICtcbiAgICAgICAgICAgICAgICAnPC9idXR0b24+Jyk7XG4gICAgICAgICAgICB2YXIgY2FsbG91dERpdiA9IGluc3RhbmNlRWxlbWVudC5maW5kKCdkaXYnKS5lcSgwKTtcbiAgICAgICAgICAgIGNhbGxvdXREaXYuYXBwZW5kKGNsb3NlQnV0dG9uRWxlbWVudCk7XG4gICAgICAgICAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VFbGVtZW50LmJpbmQoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzTW91c2VPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50LmJpbmQoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzTW91c2VPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnbmdTaG93JywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzQ2xvc2luZ0J5QnV0dG9uQ2xpY2sgPSAhbmV3VmFsdWUgJiYgc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkO1xuICAgICAgICAgICAgaWYgKGlzQ2xvc2luZ0J5QnV0dG9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gc2NvcGUuaXNNb3VzZU92ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2lzTW91c2VPdmVyJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgICBpZiAoIW5ld1ZhbCAmJiBvbGRWYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNjb3BlLmNsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXREaXJlY3RpdmUgPSBDYWxsb3V0RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXQnLCBDYWxsb3V0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0SGVhZGVyJywgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dENvbnRlbnQnLCBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEFjdGlvbnMnLCBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQ2FsbG91dFR5cGUpIHtcbiAgICBDYWxsb3V0VHlwZVtDYWxsb3V0VHlwZVtcIm9vYmVcIl0gPSAwXSA9IFwib29iZVwiO1xuICAgIENhbGxvdXRUeXBlW0NhbGxvdXRUeXBlW1wicGVla1wiXSA9IDFdID0gXCJwZWVrXCI7XG59KShleHBvcnRzLkNhbGxvdXRUeXBlIHx8IChleHBvcnRzLkNhbGxvdXRUeXBlID0ge30pKTtcbnZhciBDYWxsb3V0VHlwZSA9IGV4cG9ydHMuQ2FsbG91dFR5cGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0VHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKENhbGxvdXRBcnJvdykge1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJsZWZ0XCJdID0gMF0gPSBcImxlZnRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wicmlnaHRcIl0gPSAxXSA9IFwicmlnaHRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1widG9wXCJdID0gMl0gPSBcInRvcFwiO1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJib3R0b21cIl0gPSAzXSA9IFwiYm90dG9tXCI7XG59KShleHBvcnRzLkNhbGxvdXRBcnJvdyB8fCAoZXhwb3J0cy5DYWxsb3V0QXJyb3cgPSB7fSkpO1xudmFyIENhbGxvdXRBcnJvdyA9IGV4cG9ydHMuQ2FsbG91dEFycm93O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dEFycm93RW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2hvaWNlZmllbGRUeXBlRW51bV8xID0gcmVxdWlyZSgnLi9jaG9pY2VmaWVsZFR5cGVFbnVtJyk7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZFwiPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBpZD1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtQ2hvaWNlRmllbGQtaW5wdXRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIiB2YWx1ZT1cInt7dmFsdWV9fVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiAgJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctdHJ1ZS12YWx1ZT1cInt7bmdUcnVlVmFsdWV9fVwiIG5nLWZhbHNlLXZhbHVlPVwie3tuZ0ZhbHNlVmFsdWV9fVwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtQ2hvaWNlRmllbGQtZmllbGRcIj48c3BhbiBjbGFzcz1cIm1zLUxhYmVsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkNob2ljZWZpZWxkT3B0aW9uJywgJ14/dWlmQ2hvaWNlZmllbGRHcm91cCddO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdGYWxzZVZhbHVlOiAnQCcsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPScsXG4gICAgICAgICAgICBuZ1RydWVWYWx1ZTogJ0AnLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0AnLFxuICAgICAgICAgICAgdmFsdWU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG4gICAgfVxuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgaW5wdXQgPSB0ZW1wbGF0ZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgaWYgKCEoJ25nTW9kZWwnIGluIHRlbXBsYXRlQXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ25nLW1vZGVsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIGNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNob2ljZWZpZWxkVHlwZUVudW1fMS5DaG9pY2VmaWVsZFR5cGVbbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2hvaWNlZmllbGQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmVHlwZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tlZCA9IChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5nZXRWaWV3VmFsdWUoKSA9PT0gYXR0cnMudmFsdWUpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5hZGRSZW5kZXIocmVuZGVyXzEpO1xuICAgICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3ZhbHVlJywgcmVuZGVyXzEpO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAgICAgLm9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5yZW1vdmVSZW5kZXIocmVuZGVyXzEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudFNjb3BlID0gc2NvcGUuJHBhcmVudC4kcGFyZW50O1xuICAgICAgICB2YXIgY2hlY2tEaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycyAmJiBhdHRycy5kaXNhYmxlZDtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gc2NvcGUuZGlzYWJsZWQgfHwgKHBhcmVudFNjb3BlICE9IG51bGwgJiYgcGFyZW50U2NvcGUuZGlzYWJsZWQpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5zdGFuY2VFbGVtZW50LmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGNoZWNrRGlzYWJsZWQoKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyZW50U2NvcGUgPT0gbnVsbCA/ICcnIDogcGFyZW50U2NvcGUuZGlzYWJsZWQ7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgY2hlY2tEaXNhYmxlZCgpOyB9KSk7XG4gICAgICAgIGNoZWNrRGlzYWJsZWQoKTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlID0gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXAtdGl0bGVcIj48bmctdHJhbnNjbHVkZSAvPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbnZhciBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLnJlbmRlckZucyA9IFtdO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuYWRkUmVuZGVyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRm5zLnB1c2goZm4pO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZVJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5zcGxpY2UodGhpcy5yZW5kZXJGbnMuaW5kZXhPZihmbikpO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnNldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldFZpZXdWYWx1ZSh2YWx1ZSwgZXZlbnRUeXBlKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVuZGVyRm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZuc1tpXSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jaG9pY2VmaWVsZCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRPcHRpb24nLCBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRHcm91cCcsIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNob2ljZWZpZWxkR3JvdXBUaXRsZScsIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQ2hvaWNlZmllbGRUeXBlKSB7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcInJhZGlvXCJdID0gMF0gPSBcInJhZGlvXCI7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcImNoZWNrYm94XCJdID0gMV0gPSBcImNoZWNrYm94XCI7XG59KShleHBvcnRzLkNob2ljZWZpZWxkVHlwZSB8fCAoZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGUgPSB7fSkpO1xudmFyIENob2ljZWZpZWxkVHlwZSA9IGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIENvbW1hbmRCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNvbW1hbmRCYXJcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgdWlmU2VhcmNoVGVybTogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbW1hbmRCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICB7XG4gICAgICAgICAgICBzY29wZS5mb2N1c1NlYXJjaElucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmNsZWFyU2VhcmNoVGVybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZTZWFyY2hUZXJtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzY29wZS5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBDb21tYW5kQmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckRpcmVjdGl2ZSA9IENvbW1hbmRCYXJEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaFxcXCIgbmctY2xhc3M9XFxcIiRwYXJlbnQuaXNTZWFyY2hBY3RpdmUgPT0gdHJ1ZSA/ICdpcy1hY3RpdmUnIDogJyc7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyRwYXJlbnQucGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cXFwiMVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1mb2N1cz1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9IHRydWU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWJsdXI9XFxcIiRwYXJlbnQuaXNTZWFyY2hBY3RpdmUgPSBmYWxzZTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XFxcIiRwYXJlbnQudWlmU2VhcmNoVGVybVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWljb25XcmFwcGVyIG1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvblNlYXJjaFdyYXBwZXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCIkcGFyZW50LmZvY3VzU2VhcmNoSW5wdXQoKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwic2VhcmNoXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaC1pY29uV3JhcHBlciBtcy1Db21tYW5kQmFyU2VhcmNoLWljb25DbGVhcldyYXBwZXIgbXMtZm9udC1zXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb3VzZWRvd249XFxcIiRwYXJlbnQuY2xlYXJTZWFyY2hUZXJtKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcInhcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgfVxuICAgIENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUgPSBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlO1xudmFyIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ29tbWFuZEJhci1zaWRlQ29tbWFuZHNcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJTaWRlRGlyZWN0aXZlID0gQ29tbWFuZEJhclNpZGVEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlKCR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhci1tYWluQXJlYVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbmctaWY9XFxcInVpZlNob3dPdmVyZmxvd1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbSBtcy1Db21tYW5kQmFySXRlbS0taWNvbk9ubHkgbXMtQ29tbWFuZEJhckl0ZW0tb3ZlcmZsb3dcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGFzcz1cXFwib3ZlcmZsb3dWaXNpYmxlID09IHRydWUgPyAnaXMtdmlzaWJsZScgOiAnJztcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwib3Blbk92ZXJmbG93TWVudSgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwibXMtQ29tbWFuZEJhckl0ZW0tbGlua1xcXCIgdGFiaW5kZXg9XFxcIjJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJlbGxpcHNpc1xcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29tbWFuZEJhck1haW5Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmU2hvd092ZXJmbG93OiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkdGltZW91dCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJNYWluRGlyZWN0aXZlKCR0aW1lb3V0KTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgICAgICBzY29wZS5vcGVuT3ZlcmZsb3dNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9ICFzY29wZS5vdmVyZmxvd01lbnVPcGVuO1xuICAgICAgICAgICAgdmFyIGNvbnRleHR1YWxNZW51O1xuICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgPSBcIiA8dWlmLWNvbnRleHR1YWwtbWVudSBjbGFzcz1cXFwibXMtQ29tbWFuZEJhci1vdmVyZmxvd01lbnVcXFwiXFxuICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwib3ZlcmZsb3dNZW51T3BlblxcXCJcXG4gICAgICAgICAgICAgIHVpZi1jbG9zZS1vbi1jbGljaz1cXFwiZmFsc2VcXFwiPlwiO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93IC5tcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlciB1bCcpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5oaWRkZW5JdGVtcywgZnVuY3Rpb24gKG1lbnVpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lbnVpdGVtLnN1Ym1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gXCI8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIG5nLW1vZGVsPVxcXCJoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPSdvcGVuT3ZlcmZsb3dJdGVtKGhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udGV4dCdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctc2hvdz0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnZpc2libGUnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJzdWJNZW51XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRleHR1YWwtbWVudT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9J29wZW5PdmVyZmxvd0l0ZW0oc3ViaXRlbSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0nc3ViaXRlbS50ZXh0J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcImxpbmtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInN1Yml0ZW0gaW4gaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnN1Ym1lbnVpdGVtcyB0cmFjayBieSAkaW5kZXhcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9IFwiPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbSBuZy1tb2RlbD1cXFwiaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz0nb3Blbk92ZXJmbG93SXRlbShoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0pJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnRleHQnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXNob3c9J2hpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXS52aXNpYmxlJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGlua1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9ICc8Lzx1aWYtY29udGV4dHVhbC1tZW51Pic7XG4gICAgICAgICAgICB2YXIgbWVudTtcbiAgICAgICAgICAgIG1lbnUgPSBlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdyAubXMtQ29tbWFuZEJhckl0ZW0tbGlua1dyYXBwZXInKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChtZW51KS5hcHBlbmQoY3RybC4kY29tcGlsZShjb250ZXh0dWFsTWVudSkoc2NvcGUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUubG9hZE1lbnVJdGVtcyA9IGZ1bmN0aW9uIChjb21tYW5kSXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbVdpZHRoID0gMDtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbUluZGV4ID0gMDtcbiAgICAgICAgICAgIHNjb3BlLmNvbW1hbmRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbW1hbmRJdGVtcywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmhhc0NsYXNzKCdtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdycpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJdGVtV2lkdGggKz0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29tbWFuZEl0ZW1zLnB1c2goeyBpbmRleDogY29tbWFuZEl0ZW1JbmRleCwgb2Zmc2V0OiBjb21tYW5kSXRlbVdpZHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSXRlbUluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLm9wZW5PdmVyZmxvd0l0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGl0ZW0uc3VibWVudS5jaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Ym1lbnVpdGVtO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS50ZXh0ID0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLm1lbnVUeXBlID0gJ2l0ZW0nO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5jaGlsZGl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5pID0gaXRlbS5zdWJtZW51aXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5wYXJlbnQgPSBpdGVtLmk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zLnB1c2goc3VibWVudWl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3RybC4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkaXRlbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtpdGVtLnBhcmVudF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbnRleHR1YWxNZW51LWl0ZW0nKVtpdGVtLmldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG0pLnRyaWdnZXJIYW5kbGVyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbaXRlbS5pXSkudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZEJhckl0ZW1zO1xuICAgICAgICAgICAgY29tbWFuZEJhckl0ZW1zID0gYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXItbWFpbkFyZWEgLm1zLUNvbW1hbmRCYXJJdGVtJykpO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjQwICYmIHNjb3BlLm1vYmlsZVN3aXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGNvbW1hbmRCYXJJdGVtcyk7XG4gICAgICAgICAgICAgICAgc2NvcGUubW9iaWxlU3dpdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDY0MCAmJiBzY29wZS5tb2JpbGVTd2l0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGNvbW1hbmRCYXJJdGVtcyk7XG4gICAgICAgICAgICAgICAgc2NvcGUubW9iaWxlU3dpdGNoID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuY29tbWFuZEl0ZW1zLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm9mZnNldCA+PSBlbGVtLnByb3AoJ29mZnNldFdpZHRoJykgLSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbZWxlbWVudC5pbmRleF0pLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaGlkZGVuSXRlbXNbZWxlbWVudC5pbmRleF0udmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtlbGVtZW50LmluZGV4XSkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5oaWRkZW5JdGVtc1tlbGVtZW50LmluZGV4XS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3RybC4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJG9uKCd1aWYtY29tbWFuZC1iYXItcmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLiRicm9hZGNhc3QoJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUubG9hZE1lbnVJdGVtcyhhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKSkpO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhck1haW5EaXJlY3RpdmUgPSBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJNYWluQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkY29tcGlsZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kY29tcGlsZSA9ICRjb21waWxlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIENvbW1hbmRCYXJNYWluQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT3ZlcmZsb3dJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5pID0gdGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWRkZW5JdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH07XG4gICAgQ29tbWFuZEJhck1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckY29tcGlsZScsICckdGltZW91dCddO1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG52YXIgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclwiPicgK1xuICAgICAgICAgICAgJyA8YSBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtcIj4nICtcbiAgICAgICAgICAgICcgPC9hPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmQ29tbWFuZEJhck1haW4nO1xuICAgIH1cbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkl0ZW07XG4gICAgICAgICAgICBoaWRkZW5JdGVtID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9uZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5hZGQoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTmFtZS5pbmRleE9mKCdtcy1mb250LScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0LmFkZCgnbXMtZm9udC1tJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0udGV4dCA9IGNsb25lW2ldLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVTCcgJiYgY2xvbmVbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLnN1Ym1lbnUgPSBjbG9uZVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChoaWRkZW5JdGVtLnN1Ym1lbnUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLm1lbnVUeXBlID0gJ2xpbmsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuSXRlbS5tZW51VHlwZSA9ICdzdWJNZW51JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3RybC5hZGRPdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsgPiB1aWYtaWNvbicpKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbScpKS5hZGRDbGFzcygnbXMtQ29tbWFuZEJhckl0ZW0taGFzVGV4dE9ubHknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSBDb21tYW5kQmFySXRlbURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbW1hbmRiYXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXInLCBDb21tYW5kQmFyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyU2VhcmNoJywgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhckl0ZW0nLCBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhck1haW4nLCBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhclNpZGUnLCBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZW50RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPHNwYW4gY2xhc3M9XFxcInVpZi1jb250ZW50XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcbiAgICB9XG4gICAgQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbnRlbnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRlbnREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZW50JztcbiAgICByZXR1cm4gQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRlbnREaXJlY3RpdmUgPSBDb250ZW50RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGVudCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoQ29udGVudERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBNZW51SXRlbVR5cGVzO1xuKGZ1bmN0aW9uIChNZW51SXRlbVR5cGVzKSB7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wibGlua1wiXSA9IDBdID0gXCJsaW5rXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiZGl2aWRlclwiXSA9IDFdID0gXCJkaXZpZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiaGVhZGVyXCJdID0gMl0gPSBcImhlYWRlclwiO1xuICAgIE1lbnVJdGVtVHlwZXNbTWVudUl0ZW1UeXBlc1tcInN1Yk1lbnVcIl0gPSAzXSA9IFwic3ViTWVudVwiO1xufSkoTWVudUl0ZW1UeXBlcyB8fCAoTWVudUl0ZW1UeXBlcyA9IHt9KSk7XG52YXIgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkNvbnRleHR1YWxNZW51JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICc9P3VpZklzU2VsZWN0ZWQnLFxuICAgICAgICAgICAgb25DbGljazogJyZuZ0NsaWNrJyxcbiAgICAgICAgICAgIHRleHQ6ICc9P3VpZlRleHQnLFxuICAgICAgICAgICAgdHlwZTogJ0B1aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNZW51SXRlbVR5cGVzW3R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIHVuc3VwcG9ydGVkIG1lbnUgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgY29udGV4dCBtZW51LicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBNZW51SXRlbVR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gJ2Jvb2xlYW4nICYmICRzY29wZS5pc1NlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2ludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1zZWxlY3RlZFxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLXNlbGVjdGVkXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGF0dHJzLiRvYnNlcnZlKCdkaXNhYmxlZCcsIGZ1bmN0aW9uIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc0Rpc2FibGVkID0gISFkaXNhYmxlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHR1YWxNZW51Q29udHJvbGxlci5pc011bHRpU2VsZWN0aW9uTWVudSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5kZXNlbGVjdEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCgkc2NvcGUuaXNTZWxlY3RlZCkgJiYgISRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmNsb3NlU3ViTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzUm9vdE1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5jbG9zZVN1Yk1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRzY29wZS5vbkNsaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25DbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtZGVzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtY2xvc2UnLCBmdW5jdGlvbiAoZXZlbnQsIG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAkc2NvcGUuJGlkICE9PSBtZW51SXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGlsZE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5zdWJNZW51XSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rIG1zLUNvbnRleHR1YWxNZW51LWxpbmstLWhhc01lbnVcXFwiXFxuICAgICAgICAgIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1zdWJNZW51SWNvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtY29udGV4dC1zdWJtZW51XFxcIj48L2Rpdj5cXG4gICAgICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua10gPVxuICAgICAgICAgICAgXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cXFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rXFxcIiBuZy1jbGFzcz1cXFwieydpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsICdpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIlxcbiAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+PHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5oZWFkZXJdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtIG1zLUNvbnRleHR1YWxNZW51LWl0ZW0tLWhlYWRlclxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMuZGl2aWRlcl0gPSBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbSBtcy1Db250ZXh0dWFsTWVudS1pdGVtLS1kaXZpZGVyXFxcIj48L2xpPlwiO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQgJiYgISRzY29wZS50ZXh0ICYmICEkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS50eXBlICE9PSAnZGl2aWRlcicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtICcgK1xuICAgICAgICAgICAgICAgICAgICAneW91IG5lZWQgdG8gcHJvdmlkZSBhIHRleHQgZm9yIGEgY29udGV4dHVhbCBtZW51IGl0ZW0uXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT4geW91IG5lZWQgdG8gc3BlY2lmeSBlaXRoZXIgXFwndWlmLXRleHRcXCcgYXMgYXR0cmlidXRlIG9yIDx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgIF90aGlzLmluc2VydFN1Yk1lbnUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0SXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1pdGVtLWNvbnRlbnQnKSk7XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+JyArICRzY29wZS50ZXh0ICsgJzwvc3Bhbj4nKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0U3ViTWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLWNvbnRleHQtc3VibWVudScpKS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRleHR1YWxNZW51SXRlbSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Q2hpbGRNZW51ID0gZnVuY3Rpb24gKGNoaWxkTWVudUN0cmwpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGFzQ2hpbGRNZW51ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGRNZW51Q3RybCA9IGNoaWxkTWVudUN0cmw7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuICAgIHJldHVybiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG52YXIgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8dWwgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51XFxcIiBuZy10cmFuc2NsdWRlPjwvdWw+XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGNsb3NlT25DbGljazogJ0B1aWZDbG9zZU9uQ2xpY2snLFxuICAgICAgICAgICAgaXNPcGVuOiAnPT91aWZJc09wZW4nLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6ICdAdWlmTXVsdGlzZWxlY3QnXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBzZXRDbG9zZU9uQ2xpY2sgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xvc2VPbkNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5jbG9zZU9uQ2xpY2sgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0Q2xvc2VPbkNsaWNrKCRzY29wZS5jbG9zZU9uQ2xpY2spO1xuICAgICAgICAkYXR0cnMuJG9ic2VydmUoJ3VpZkNsb3NlT25DbGljaycsIHNldENsb3NlT25DbGljayk7XG4gICAgICAgIHZhciBwYXJlbnRNZW51SXRlbUN0cmwgPSAkZWxlbWVudC5jb250cm9sbGVyKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZChwYXJlbnRNZW51SXRlbUN0cmwpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51SXRlbUN0cmwuc2V0Q2hpbGRNZW51KGNvbnRleHR1YWxNZW51Q29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZCgkc2NvcGUubXVsdGlzZWxlY3QpICYmICRzY29wZS5tdWx0aXNlbGVjdC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdtcy1Db250ZXh0dWFsTWVudS0tbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51Q29udHJvbGxlcigkc2NvcGUsICRhbmltYXRlLCAkZWxlbWVudCwgJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZCA9IFtdO1xuICAgICAgICB0aGlzLmlzT3BlbkNsYXNzTmFtZSA9ICdpcy1vcGVuJztcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKCRlbGVtZW50LmNvbnRyb2xsZXIoQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpKSkge1xuICAgICAgICAgICAgJHNjb3BlLmlzUm9vdE1lbnUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzT3BlbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Jvb2xlYW4nICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIGludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1vcGVuXFwnLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgXFwnJyArIHR5cGVvZiBuZXdWYWx1ZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBhcyB2YWxpZCB0eXBlIGZvciBcXCd1aWYtaXMtb3BlblxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZXh0dWFsLW1lbnUgLz4uIFRoZSB2YWxpZCB0eXBlIGlzIGJvb2xlYW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkYW5pbWF0ZVtuZXdWYWx1ZSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXSgkZWxlbWVudCwgX3RoaXMuaXNPcGVuQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgX3RoaXMuZGVzZWxlY3RJdGVtcyh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kb24oJ3VpZi1tZW51LWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc1Jvb3RNZW51ICYmICRzY29wZS5jbG9zZU9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vblJvb3RNZW51Q2xvc2VkLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmRlc2VsZWN0SXRlbXMgPSBmdW5jdGlvbiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICBpZiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3VpZi1tZW51LWRlc2VsZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VTdWJNZW51cyA9IGZ1bmN0aW9uIChtZW51SXRlbVRvU2tpcCwgY2xvc2VSb290TWVudSkge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1jbG9zZScsIG1lbnVJdGVtVG9Ta2lwKTtcbiAgICAgICAgaWYgKGNsb3NlUm9vdE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1jbG9zZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSB0cnVlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc1Jvb3RNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXNSb290TWVudTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNNdWx0aVNlbGVjdGlvbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc01lbnVPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnXTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVDb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50c1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuaXNQaWNraW5nWWVhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BpY2tpbmdNb250aHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGF0ZUZvcm1hdCA9ICdkIG1tbW0sIHl5eXknO1xuICAgICAgICB0aGlzLmpFbGVtZW50ID0gJCgkZWxlbWVudFswXSk7XG4gICAgICAgIHRoaXMuZGlzcGxheURhdGVGb3JtYXQgPSAkc2NvcGUudWlmRGF0ZUZvcm1hdDtcbiAgICAgICAgJHNjb3BlLmN0cmwgPSB0aGlzO1xuICAgIH1cbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucmFuZ2UgPSBmdW5jdGlvbiAobWluLCBtYXgsIHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgICAgICAgdmFyIGlucHV0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSBtaW47IGkgPD0gbWF4OyBpICs9IHN0ZXApIHtcbiAgICAgICAgICAgIGlucHV0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBpY2tlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLVRleHRGaWVsZC1maWVsZCcpLnBpY2thZGF0ZSgncGlja2VyJyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRQaWNrZXIoKS5zZXQoJ3NlbGVjdCcsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VIaWdobGlnaHRlZERhdGUodmFsdWUuZ2V0RnVsbFllYXIoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RGF0ZSgpKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0RGF0ZXBpY2tlciA9IGZ1bmN0aW9uIChuZ01vZGVsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5qRWxlbWVudC5maW5kKCcubXMtVGV4dEZpZWxkLWZpZWxkJykucGlja2FkYXRlKHtcbiAgICAgICAgICAgIGNsZWFyOiAnJyxcbiAgICAgICAgICAgIGNsb3NlOiAnJyxcbiAgICAgICAgICAgIGZvcm1hdDogc2VsZi5kaXNwbGF5RGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGtsYXNzOiB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiAnbXMtRGF0ZVBpY2tlci1pbnB1dC0tYWN0aXZlJyxcbiAgICAgICAgICAgICAgICBib3g6ICdtcy1EYXRlUGlja2VyLWRheVBpY2tlcicsXG4gICAgICAgICAgICAgICAgZGF5OiAnbXMtRGF0ZVBpY2tlci1kYXknLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnbXMtRGF0ZVBpY2tlci1kYXktLWRpc2FibGVkJyxcbiAgICAgICAgICAgICAgICBmb2N1c2VkOiAnbXMtRGF0ZVBpY2tlci1waWNrZXItLWZvY3VzZWQnLFxuICAgICAgICAgICAgICAgIGZyYW1lOiAnbXMtRGF0ZVBpY2tlci1mcmFtZScsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnbXMtRGF0ZVBpY2tlci1oZWFkZXInLFxuICAgICAgICAgICAgICAgIGhvbGRlcjogJ21zLURhdGVQaWNrZXItaG9sZGVyJyxcbiAgICAgICAgICAgICAgICBpbmZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLWluZm9jdXMnLFxuICAgICAgICAgICAgICAgIGlucHV0OiAnbXMtRGF0ZVBpY2tlci1pbnB1dCcsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdtcy1EYXRlUGlja2VyLW1vbnRoJyxcbiAgICAgICAgICAgICAgICBub3c6ICdtcy1EYXRlUGlja2VyLWRheS0tdG9kYXknLFxuICAgICAgICAgICAgICAgIG9wZW5lZDogJ21zLURhdGVQaWNrZXItcGlja2VyLS1vcGVuZWQnLFxuICAgICAgICAgICAgICAgIG91dGZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLW91dGZvY3VzJyxcbiAgICAgICAgICAgICAgICBwaWNrZXI6ICdtcy1EYXRlUGlja2VyLXBpY2tlcicsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdtcy1EYXRlUGlja2VyLWRheS0tc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgIHRhYmxlOiAnbXMtRGF0ZVBpY2tlci10YWJsZScsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6ICdtcy1EYXRlUGlja2VyLXdlZWtkYXknLFxuICAgICAgICAgICAgICAgIHdyYXA6ICdtcy1EYXRlUGlja2VyLXdyYXAnLFxuICAgICAgICAgICAgICAgIHllYXI6ICdtcy1EYXRlUGlja2VyLXllYXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5pdEN1c3RvbVZpZXcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2RheTogJycsXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIHBpY2tlci5vbih7XG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxVcCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gcGlja2VyLmdldCgnc2VsZWN0JywgJ3l5eXktbW0tZGQnKTtcbiAgICAgICAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0Q3VzdG9tVmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRtb250aENvbnRyb2xzID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1tb250aENvbXBvbmVudHMnKTtcbiAgICAgICAgdmFyICRnb1RvZGF5ID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1nb1RvZGF5Jyk7XG4gICAgICAgIHZhciAkbW9udGhQaWNrZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLW1vbnRoUGlja2VyJyk7XG4gICAgICAgIHZhciAkeWVhclBpY2tlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXIteWVhclBpY2tlcicpO1xuICAgICAgICB2YXIgJHBpY2tlcldyYXBwZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLXdyYXAnKTtcbiAgICAgICAgdmFyICRwaWNrZXIgPSB0aGlzLmdldFBpY2tlcigpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICRtb250aENvbnRyb2xzLmFwcGVuZFRvKCRwaWNrZXJXcmFwcGVyKTtcbiAgICAgICAgJGdvVG9kYXkuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkbW9udGhQaWNrZXIuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkeWVhclBpY2tlci5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtcHJldk1vbnRoJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoIC0gMTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG51bGwsIG5ld01vbnRoLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoQ29udHJvbHMub24oJ2NsaWNrJywgJy5qcy1uZXh0TW9udGgnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykubW9udGggKyAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobnVsbCwgbmV3TW9udGgsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2WWVhcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgLSAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLW5leHRZZWFyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciArIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2RGVjYWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciAtIDEwO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR5ZWFyUGlja2VyLm9uKCdjbGljaycsICcuanMtbmV4dERlY2FkZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgKyAxMDtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkZ29Ub2RheS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICRwaWNrZXIuc2V0KCdzZWxlY3QnLCBub3cpO1xuICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ01vbnRocycpLnJlbW92ZUNsYXNzKCdpcy1waWNraW5nWWVhcnMnKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gY3VycmVudERhdGUueWVhcjtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9ICskKHRoaXMpLmF0dHIoJ2RhdGEtbW9udGgnKTtcbiAgICAgICAgICAgIHZhciBuZXdEYXkgPSBjdXJyZW50RGF0ZS5kYXk7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KTtcbiAgICAgICAgICAgIGlmIChzZWxmLmpFbGVtZW50Lmhhc0NsYXNzKCdpcy1waWNraW5nTW9udGhzJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmpFbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1waWNraW5nTW9udGhzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR5ZWFyUGlja2VyLm9uKCdjbGljaycsICcuanMtY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gKyQodGhpcykuYXR0cignZGF0YS15ZWFyJyk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSBjdXJyZW50RGF0ZS5tb250aDtcbiAgICAgICAgICAgIHZhciBuZXdEYXkgPSBjdXJyZW50RGF0ZS5kYXk7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KTtcbiAgICAgICAgICAgIGlmIChzZWxmLmpFbGVtZW50Lmhhc0NsYXNzKCdpcy1waWNraW5nWWVhcnMnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuakVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhDb250cm9scy5vbignY2xpY2snLCAnLmpzLXNob3dNb250aFBpY2tlcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5pc1BpY2tpbmdNb250aHMgPSAhc2VsZi5pc1BpY2tpbmdNb250aHM7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLXNob3dZZWFyUGlja2VyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmlzUGlja2luZ1llYXJzID0gIXNlbGYuaXNQaWNraW5nWWVhcnM7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuJHNjb3BlLmhpZ2hsaWdodGVkVmFsdWUgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2Nyb2xsVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0aGlzLmpFbGVtZW50Lm9mZnNldCgpLnRvcCB9LCAzNjcpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZSA9IGZ1bmN0aW9uIChuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KSB7XG4gICAgICAgIHZhciBwaWNrZXIgPSB0aGlzLmdldFBpY2tlcigpO1xuICAgICAgICBpZiAobmV3WWVhciA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdZZWFyID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3TW9udGggPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3TW9udGggPSBwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS5tb250aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3RGF5ID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld0RheSA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLmRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcGlja2VyLnNldCgnaGlnaGxpZ2h0JywgW25ld1llYXIsIG5ld01vbnRoLCBuZXdEYXldKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGlnaGxpZ2h0ZWRWYWx1ZSA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJ107XG4gICAgcmV0dXJuIERhdGVwaWNrZXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSBEYXRlcGlja2VyQ29udHJvbGxlcjtcbnZhciBEYXRlcGlja2VyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEYXRlcGlja2VyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlclxcJzogdHJ1ZSwgXFwnaXMtcGlja2luZ1llYXJzXFwnOiBjdHJsLmlzUGlja2luZ1llYXJzLCBcXCdpcy1waWNraW5nTW9udGhzXFwnOiBjdHJsLmlzUGlja2luZ01vbnRoc31cIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtVGV4dEZpZWxkXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWV2ZW50IG1zLUljb24gbXMtSWNvbi0tZXZlbnRcIj48L2k+JyArXG4gICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW1vbnRoQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0TW9udGgganMtbmV4dE1vbnRoXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLXByZXZNb250aCBqcy1wcmV2TW9udGhcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvbkxlZnRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWhlYWRlclRvZ2dsZVZpZXcganMtc2hvd01vbnRoUGlja2VyXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLWdvVG9kYXkganMtZ29Ub2RheVwiPkdvIHRvIHRvZGF5PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW1vbnRoUGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItaGVhZGVyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXIteWVhckNvbXBvbmVudHNcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbmV4dFllYXIganMtbmV4dFllYXJcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldlllYXIganMtcHJldlllYXJcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvbkxlZnRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWN1cnJlbnRZZWFyIGpzLXNob3dZZWFyUGlja2VyXCI+e3toaWdobGlnaHRlZFZhbHVlLnllYXJ9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW9wdGlvbkdyaWRcIiA+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0PVwibW9udGggaW4gbW9udGhzQXJyYXlcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLURhdGVQaWNrZXItbW9udGhPcHRpb24ganMtY2hhbmdlRGF0ZVxcJzogdHJ1ZSwgJyArXG4gICAgICAgICAgICAnXFwnaXMtaGlnaGxpZ2h0ZWRcXCc6IGhpZ2hsaWdodGVkVmFsdWUubW9udGggPT0gJGluZGV4fVwiJyArXG4gICAgICAgICAgICAnZGF0YS1tb250aD1cInt7JGluZGV4fX1cIj4nICtcbiAgICAgICAgICAgICd7e21vbnRofX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXIteWVhclBpY2tlclwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWRlY2FkZUNvbXBvbmVudHNcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbmV4dERlY2FkZSBqcy1uZXh0RGVjYWRlXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLXByZXZEZWNhZGUganMtcHJldkRlY2FkZVwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItY3VycmVudERlY2FkZVwiPnt7aGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyIC0gMTB9fSAtIHt7aGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyfX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1vcHRpb25HcmlkXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlci15ZWFyT3B0aW9uIGpzLWNoYW5nZURhdGVcXCc6IHRydWUsJyArXG4gICAgICAgICAgICAnXFwnaXMtaGlnaGxpZ2h0ZWRcXCc6IGhpZ2hsaWdodGVkVmFsdWUueWVhciA9PSB5ZWFyfVwiICcgK1xuICAgICAgICAgICAgJ25nLXJlcGVhdD1cInllYXIgaW4gY3RybC5yYW5nZShoaWdobGlnaHRlZFZhbHVlLnllYXIgLSAxMCwgaGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyKVwiJyArXG4gICAgICAgICAgICAnZGF0YS15ZWFyPVwie3t5ZWFyfX1cIj57e3llYXJ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEYXRlcGlja2VyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICB1aWZEYXRlRm9ybWF0OiAnQCcsXG4gICAgICAgICAgICB1aWZNb250aHM6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkRhdGVwaWNrZXInLCAnP25nTW9kZWwnXTtcbiAgICB9XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERhdGVwaWNrZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmssXG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uICgkc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICBpZiAoISRzY29wZS51aWZNb250aHMpIHtcbiAgICAgICAgICAgICRzY29wZS51aWZNb250aHMgPSAnSmFuLCBGZWIsIE1hciwgQXByLCBNYXksIEp1biwgSnVsLCBBdWcsIFNlcCwgT2N0LCBOb3YsIERlYyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEkc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICRzY29wZS5wbGFjZWhvbGRlciA9ICdTZWxlY3QgYSBkYXRlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoISRzY29wZS51aWZEYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmRGF0ZUZvcm1hdCA9ICdkIG1tbW0sIHl5eXknO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5tb250aHNBcnJheSA9ICRzY29wZS51aWZNb250aHMuc3BsaXQoJywnKTtcbiAgICAgICAgaWYgKCRzY29wZS5tb250aHNBcnJheS5sZW5ndGggIT09IDEyKSB7XG4gICAgICAgICAgICB0aHJvdyAnTW9udGhzIHNldHRpbmcgc2hvdWxkIGhhdmUgMTIgbW9udGhzLCBzZXBhcmF0ZWQgYnkgYSBjb21tYSc7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VBdHRyaWJ1dGVzLiRvYnNlcnZlKCdkaXNhYmxlZCcsIGZ1bmN0aW9uIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzRGlzYWJsZWQgPSAhIWRpc2FibGVkO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgZGF0ZXBpY2tlckNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG5nTW9kZWwgPSBjdHJsc1sxXTtcbiAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuaW5pdERhdGVwaWNrZXIobmdNb2RlbCk7XG4gICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChuZ01vZGVsLiRtb2RlbFZhbHVlICE9PSAnJyAmJiB0eXBlb2YgbmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5nTW9kZWwuJG1vZGVsVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLnNldFZhbHVlKGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuc2V0VmFsdWUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIERhdGVwaWNrZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EYXRlcGlja2VyRGlyZWN0aXZlID0gRGF0ZXBpY2tlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRhdGVwaWNrZXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRhdGVwaWNrZXInLCBEYXRlcGlja2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBkaWFsb2dFbnVtc18xID0gcmVxdWlyZSgnLi9kaWFsb2dFbnVtcycpO1xudmFyIERpYWxvZ0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0NvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBEaWFsb2dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xudmFyIERpYWxvZ0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2dcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwieyBcXCdtcy1EaWFsb2ctLWNsb3NlXFwnOiB1aWZDbG9zZT09XFwndHJ1ZVxcJycgK1xuICAgICAgICAgICAgJywgXFwnbXMtRGlhbG9nLS1sZ0hlYWRlclxcJzogdWlmVHlwZT09XFwnaGVhZGVyXFwnJyArXG4gICAgICAgICAgICAnLCBcXCdtcy1EaWFsb2ctLW11bHRpbGluZVxcJzogdWlmVHlwZT09XFwnbXVsdGlsaW5lXFwnIH1cIj4nICtcbiAgICAgICAgICAgICc8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XCJ7e3VpZk92ZXJsYXl9fVwiPjwvdWlmLW92ZXJsYXk+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1tYWluXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmQ2xvc2U6ICdAJyxcbiAgICAgICAgICAgIHVpZk92ZXJsYXk6ICdAJyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFsb2dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAobmV3VmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dFbnVtc18xLkRpYWxvZ1R5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nIC0gVW5zdXBwb3J0ZWQgdHlwZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dEaXJlY3RpdmUgPSBEaWFsb2dEaXJlY3RpdmU7XG52YXIgRGlhbG9nSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeXnVpZkRpYWxvZyc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiJHBhcmVudC51aWZDbG9zZVwiIGNsYXNzPVwibXMtRGlhbG9nLWJ1dHRvbiBtcy1EaWFsb2ctYnV0dG9uLS1jbG9zZVwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dIZWFkZXJEaXJlY3RpdmUgPSBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG52YXIgRGlhbG9nQ29udGVudERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQ29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWNvbnRlbnRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRlbnREaXJlY3RpdmUgPSBEaWFsb2dDb250ZW50RGlyZWN0aXZlO1xudmFyIERpYWxvZ0lubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dJbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0lubmVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nSW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dJbm5lckRpcmVjdGl2ZSA9IERpYWxvZ0lubmVyRGlyZWN0aXZlO1xudmFyIERpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ1N1YnRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHAgY2xhc3M9XCJtcy1EaWFsb2ctc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPic7XG4gICAgfVxuICAgIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nU3VidGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlO1xudmFyIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zQ29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xudmFyIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctYWN0aW9uc1wiPjxkaXYgbmctY2xhc3M9XCJ7IFxcJ21zLURpYWxvZy1hY3Rpb25zUmlnaHRcXCc6IHVpZlBvc2l0aW9uPT1cXCdyaWdodFxcJ31cIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlBvc2l0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUG9zaXRpb24nLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChuZXdWYWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZ0VudW1zXzEuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZyAtIFVuc3VwcG9ydGVkIHR5cGU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZQb3NpdGlvbiArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zRGlyZWN0aXZlID0gRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZycsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZycsIERpYWxvZ0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nSGVhZGVyJywgRGlhbG9nSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dDb250ZW50JywgRGlhbG9nQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nSW5uZXInLCBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nU3VidGV4dCcsIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0FjdGlvbnMnLCBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKERpYWxvZ1R5cGVFbnVtKSB7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcImhlYWRlclwiXSA9IDFdID0gXCJoZWFkZXJcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcIm11bHRpbGluZVwiXSA9IDJdID0gXCJtdWx0aWxpbmVcIjtcbn0pKGV4cG9ydHMuRGlhbG9nVHlwZUVudW0gfHwgKGV4cG9ydHMuRGlhbG9nVHlwZUVudW0gPSB7fSkpO1xudmFyIERpYWxvZ1R5cGVFbnVtID0gZXhwb3J0cy5EaWFsb2dUeXBlRW51bTtcbihmdW5jdGlvbiAoRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSkge1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcImxlZnRcIl0gPSAxXSA9IFwibGVmdFwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcInJpZ2h0XCJdID0gMl0gPSBcInJpZ2h0XCI7XG59KShleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gfHwgKGV4cG9ydHMuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSA9IHt9KSk7XG52YXIgRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSA9IGV4cG9ydHMuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmRHJvcGRvd24nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBkcm9wZG93bkNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKCFkcm9wZG93bkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHRocm93ICdEcm9wZG93biBjb250cm9sbGVyIG5vdCBmb3VuZCEnO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudFxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuc2V0Vmlld1ZhbHVlKGluc3RhbmNlRWxlbWVudC5maW5kKCdzcGFuJykuaHRtbCgpLCBhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdmFsdWUgPSAnJyArIGRyb3Bkb3duQ29udHJvbGxlci5nZXRWaWV3VmFsdWUoKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlID09PSBhdHRycy52YWx1ZSkge1xuICAgICAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy50aXRsZSwgYXR0cnMudmFsdWUsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd25PcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ecm9wZG93bk9wdGlvbkRpcmVjdGl2ZSA9IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlO1xudmFyIERyb3Bkb3duQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25Db250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUsICRkb2N1bWVudCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICB9XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi4kc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5pc09wZW4gPSAhc2VsZi4kc2NvcGUuaXNPcGVuO1xuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIHZhciBkcm9wZG93bldpZHRoID0gYW5ndWxhci5lbGVtZW50KHRoaXMucXVlcnlTZWxlY3RvcignLm1zLURyb3Bkb3duJykpWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Ecm9wZG93bi1pdGVtcycpKVswXS5zdHlsZS53aWR0aCA9IGRyb3Bkb3duV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJHNjb3BlLmlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGRvY3VtZW50Lm9uKCdjbGljaycsIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZG9jdW1lbnQub2ZmKCdjbGljaycsIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gc2VsZi4kZWxlbWVudC5maW5kKCdsaScpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gb3B0aW9uLmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzZWxmLiRzY29wZS5uZ01vZGVsLiR2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLnNlbGVjdGVkVGl0bGUgPSBhbmd1bGFyLmVsZW1lbnQob3B0aW9uKS5maW5kKCdzcGFuJykuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodGl0bGUsIHZhbHVlLCBldmVudFR5cGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRzZXRWaWV3VmFsdWUodmFsdWUsIGV2ZW50VHlwZSk7XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5uZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnLCAnJGRvY3VtZW50J107XG4gICAgcmV0dXJuIERyb3Bkb3duQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkRyb3Bkb3duQ29udHJvbGxlciA9IERyb3Bkb3duQ29udHJvbGxlcjtcbnZhciBEcm9wZG93bkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGljaz1cImRyb3Bkb3duQ2xpY2tcIiAnICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cIntcXCdtcy1Ecm9wZG93blxcJyA6IHRydWUsIFxcJ2lzLW9wZW5cXCc6IGlzT3BlbiwgXFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfVwiIHRhYmluZGV4PVwiMFwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtRHJvcGRvd24tY2FyZXREb3duIG1zLUljb24gbXMtSWNvbi0tY2FyZXREb3duXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRHJvcGRvd24tdGl0bGVcIj57e3NlbGVjdGVkVGl0bGV9fTwvc3Bhbj48dWwgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtc1wiPjxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L3VsPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmRHJvcGRvd24nLCAnP25nTW9kZWwnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEcm9wZG93bkNvbnRyb2xsZXI7XG4gICAgfVxuICAgIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRHJvcGRvd25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERyb3Bkb3duRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgZHJvcGRvd25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBtb2RlbENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUubmdNb2RlbCA9IG1vZGVsQ29udHJvbGxlcjtcbiAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLmluaXQoKTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluc3RhbmNlRWxlbWVudC5hdHRyKCdkaXNhYmxlZCcpOyB9LCAoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHNjb3BlLmRpc2FibGVkID0gdHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJzsgfSkpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gaW5zdGFuY2VBdHRyaWJ1dGVzO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRHJvcGRvd25EaXJlY3RpdmUgPSBEcm9wZG93bkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRyb3Bkb3duJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bk9wdGlvbicsIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bicsIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd25EaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIEZhY2VwaWxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGYWNlcGlsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtRmFjZXBpbGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtRmFjZXBpbGUtbWVtYmVyc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIG5nLXJlcGVhdD1cXFwibWVtYmVyIGluIG1lbWJlcnMgdHJhY2sgYnkgJGluZGV4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVxcXCJidXR0b25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWlmID1cXFwiJGluZGV4IDwgdWlmT3ZlcmZsb3dMaW1pdFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLUZhY2VwaWxlLWl0ZW1CdG4gbXMtRmFjZXBpbGUtaXRlbUJ0bi0tbWVtYmVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cXFwie3ttZW1iZXIucHJpbWFyeVRleHR9fVxcXCIgdGFiaW5kZXg9XFxcIjBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYSB1aWYtc3R5bGU9XFxcInJvdW5kXFxcIiB1aWYtc2l6ZT1cXFwieHNtYWxsXFxcIiB1aWYtaW1hZ2UtdXJsPVxcXCJ7e21lbWJlci5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3ttZW1iZXIuY29sb3J9fVxcXCI+e3ttZW1iZXIuaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGVyc29uYT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXNob3c9XFxcInVpZk92ZXJmbG93TGltaXQgPiAwICYmIG1lbWJlcnMubGVuZ3RoID4gdWlmT3ZlcmZsb3dMaW1pdFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwib3ZlcmZsb3dQYW5lbElzT3BlbiA9IHRydWU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1pdGVtQnRuIG1zLUZhY2VwaWxlLWl0ZW1CdG4tLW92ZXJmbG93IGpzLW92ZXJmbG93UGFuZWwgaXMtYWN0aXZlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtRmFjZXBpbGUtb3ZlcmZsb3dUZXh0XFxcIj4re3ttZW1iZXJzLmxlbmd0aCAtIHVpZk92ZXJmbG93TGltaXR9fTwvc3BhblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wYW5lbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibWVkaXVtXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwib3ZlcmZsb3dQYW5lbElzT3BlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNob3ctb3ZlcmxheT1cXFwidHJ1ZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNob3ctY2xvc2U9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBhbmVsLWhlYWRlcj57e21lbWJlcnMubGVuZ3RofX0ge3t1aWZGYWNlcGlsZU5hbWV9fTwvdWlmLXBhbmVsLWhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1jb250ZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJtZW1iZXIgaW4gbWVtYmVycyB0cmFjayBieSAkaW5kZXhcXFwiIHRpdGxlPVxcXCJ7e21lbWJlci5wcmltYXJ5VGV4dH19XFxcIiB0YWJpbmRleD1cXFwiMFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEgdWlmLXN0eWxlPVxcXCJyb3VuZFxcXCIgdWlmLXNpemU9XFxcIm1lZGl1bVxcXCIgdWlmLWltYWdlLXVybD1cXFwie3ttZW1iZXIuaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3ttZW1iZXIuY29sb3J9fVxcXCI+e3ttZW1iZXIuaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3ttZW1iZXIucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3ttZW1iZXIuc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRlbnQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1wYW5lbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG1lbWJlcnM6ICc9bmdNb2RlbCcsXG4gICAgICAgICAgICB1aWZGYWNlcGlsZU5hbWU6ICdAdWlmRmFjZXBpbGVOYW1lJyxcbiAgICAgICAgICAgIHVpZk92ZXJmbG93TGltaXQ6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBGYWNlcGlsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEZhY2VwaWxlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRmFjZXBpbGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5GYWNlcGlsZURpcmVjdGl2ZSA9IEZhY2VwaWxlRGlyZWN0aXZlO1xudmFyIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1pdGVtQnRuIG1zLUZhY2VwaWxlLWl0ZW1CdG4tLWFkZFBlcnNvbiBqcy1hZGRQZXJzb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwicGVvcGxlcGlja2VyUGFuZWxJc09wZW4gPSB0cnVlO1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1hZGRQZXJzb25JY29uIG1zLUljb24gbXMtSWNvbi0tcGVyc29uQWRkXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGFuZWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJsYXJnZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1pcy1vcGVuPVxcXCJwZW9wbGVwaWNrZXJQYW5lbElzT3BlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1zaG93LW92ZXJsYXk9XFxcInRydWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtc2hvdy1jbG9zZT1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wYW5lbC1oZWFkZXI+e3twZW9wbGVQaWNrZXJQbGFjZWhvbGRlcn19PC91aWYtcGFuZWwtaGVhZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtY29udGVudD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtcGVvcGxlPVxcXCJvbkZhY2VQaWxlU2VhcmNoXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XFxcInBhcmVudFNjb3BlLm1lbWJlcnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtc2VhcmNoLWRlbGF5PVxcXCI1MDBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwiZmFjZVBpbGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtc2VsZWN0ZWQtcGVvcGxlLWhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tzZWxlY3RlZEZhY2VQaWxlUGVvcGxlLmxlbmd0aH19IHNlbGVjdGVkIHBlcnNvbihzKVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXNlbGVjdGVkLXBlb3BsZS1oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtc2VhcmNoLW1vcmU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXByaW1hcnktdGV4dCB1aWYtc2VhcmNoLWZvci10ZXh0PVxcXCJZb3UgYXJlIHNlYXJjaGluZyBmb3I6IFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VhcmNoIG9yZ2FuaXphdGlvbiBwZW9wbGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlb3BsZS1zZWFyY2gtbW9yZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGVvcGxlLXBpY2tlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGFuZWw+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvbkZhY2VQaWxlU2VhcmNoOiAnPXVpZlBlb3BsZScsXG4gICAgICAgICAgICBwZW9wbGVQaWNrZXJQbGFjZWhvbGRlcjogJ0BwbGFjZWhvbGRlcidcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIHNjb3BlLnBhcmVudFNjb3BlID0gc2NvcGUuJHBhcmVudC4kcGFyZW50O1xuICAgICAgICB9XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSA9IEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmZhY2VwaWxlJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZGYWNlcGlsZScsIEZhY2VwaWxlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZGYWNlcGlsZUFkZEljb24nLCBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9mYWNlcGlsZS9mYWNlcGlsZURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgaWNvbkVudW1fMSA9IHJlcXVpcmUoJy4vaWNvbkVudW0nKTtcbnZhciBJY29uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSWNvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBJY29uQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIEljb25Db250cm9sbGVyO1xufSgpKTtcbnZhciBJY29uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJY29uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS17e3VpZlR5cGV9fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmVHlwZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IEljb25Db250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICdpY29uJztcbiAgICB9XG4gICAgSWNvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEljb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEljb25EaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGljb25FbnVtXzEuSWNvbkVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmljb24gLSBVbnN1cHBvcnRlZCBpY29uOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBpY29uIChcXCcnICsgc2NvcGUudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIEljb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5JY29uRGlyZWN0aXZlID0gSWNvbkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmljb24nLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkljb24nLCBJY29uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoSWNvbkVudW0pIHtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFsZXJ0XCJdID0gMF0gPSBcImFsZXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydDJcIl0gPSAxXSA9IFwiYWxlcnQyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydE91dGxpbmVcIl0gPSAyXSA9IFwiYWxlcnRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25cIl0gPSAzXSA9IFwiYXJyb3dEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd24yXCJdID0gNF0gPSBcImFycm93RG93bjJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93bkxlZnRcIl0gPSA1XSA9IFwiYXJyb3dEb3duTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duUmlnaHRcIl0gPSA2XSA9IFwiYXJyb3dEb3duUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93TGVmdFwiXSA9IDddID0gXCJhcnJvd0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93UmlnaHRcIl0gPSA4XSA9IFwiYXJyb3dSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcFwiXSA9IDldID0gXCJhcnJvd1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwMlwiXSA9IDEwXSA9IFwiYXJyb3dVcDJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBMZWZ0XCJdID0gMTFdID0gXCJhcnJvd1VwTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcFJpZ2h0XCJdID0gMTJdID0gXCJhcnJvd1VwUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFzY2VuZGluZ1wiXSA9IDEzXSA9IFwiYXNjZW5kaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhdFwiXSA9IDE0XSA9IFwiYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImF0dGFjaG1lbnRcIl0gPSAxNV0gPSBcImF0dGFjaG1lbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJhZ1wiXSA9IDE2XSA9IFwiYmFnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiYWxsb29uXCJdID0gMTddID0gXCJiYWxsb29uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiZWxsXCJdID0gMThdID0gXCJiZWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib2FyZHNcIl0gPSAxOV0gPSBcImJvYXJkc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9sZFwiXSA9IDIwXSA9IFwiYm9sZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9va21hcmtcIl0gPSAyMV0gPSBcImJvb2ttYXJrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib29rc1wiXSA9IDIyXSA9IFwiYm9va3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJyaWVmY2FzZVwiXSA9IDIzXSA9IFwiYnJpZWZjYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJidW5kbGVcIl0gPSAyNF0gPSBcImJ1bmRsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FrZVwiXSA9IDI1XSA9IFwiY2FrZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJcIl0gPSAyNl0gPSBcImNhbGVuZGFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhckRheVwiXSA9IDI3XSA9IFwiY2FsZW5kYXJEYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyUHVibGljXCJdID0gMjhdID0gXCJjYWxlbmRhclB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJXZWVrXCJdID0gMjldID0gXCJjYWxlbmRhcldlZWtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyV29ya1dlZWtcIl0gPSAzMF0gPSBcImNhbGVuZGFyV29ya1dlZWtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbWVyYVwiXSA9IDMxXSA9IFwiY2FtZXJhXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJcIl0gPSAzMl0gPSBcImNhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duXCJdID0gMzNdID0gXCJjYXJldERvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93bkxlZnRcIl0gPSAzNF0gPSBcImNhcmV0RG93bkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93bk91dGxpbmVcIl0gPSAzNV0gPSBcImNhcmV0RG93bk91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93blJpZ2h0XCJdID0gMzZdID0gXCJjYXJldERvd25SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRMZWZ0XCJdID0gMzddID0gXCJjYXJldExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0TGVmdE91dGxpbmVcIl0gPSAzOF0gPSBcImNhcmV0TGVmdE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0UmlnaHRcIl0gPSAzOV0gPSBcImNhcmV0UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0UmlnaHRPdXRsaW5lXCJdID0gNDBdID0gXCJjYXJldFJpZ2h0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcFwiXSA9IDQxXSA9IFwiY2FyZXRVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcExlZnRcIl0gPSA0Ml0gPSBcImNhcmV0VXBMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwT3V0bGluZVwiXSA9IDQzXSA9IFwiY2FyZXRVcE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBSaWdodFwiXSA9IDQ0XSA9IFwiY2FyZXRVcFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJ0XCJdID0gNDVdID0gXCJjYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXRcIl0gPSA0Nl0gPSBcImNhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhcnRcIl0gPSA0N10gPSBcImNoYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGF0XCJdID0gNDhdID0gXCJjaGF0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGF0QWRkXCJdID0gNDldID0gXCJjaGF0QWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja1wiXSA9IDUwXSA9IFwiY2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94XCJdID0gNTFdID0gXCJjaGVja2JveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hDaGVja1wiXSA9IDUyXSA9IFwiY2hlY2tib3hDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hFbXB0eVwiXSA9IDUzXSA9IFwiY2hlY2tib3hFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hNaXhlZFwiXSA9IDU0XSA9IFwiY2hlY2tib3hNaXhlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tQZW9wbGVcIl0gPSA1NV0gPSBcImNoZWNrUGVvcGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uRG93blwiXSA9IDU2XSA9IFwiY2hldnJvbkRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25MZWZ0XCJdID0gNTddID0gXCJjaGV2cm9uTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblJpZ2h0XCJdID0gNThdID0gXCJjaGV2cm9uUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zRG93blwiXSA9IDU5XSA9IFwiY2hldnJvbnNEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc0xlZnRcIl0gPSA2MF0gPSBcImNoZXZyb25zTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNSaWdodFwiXSA9IDYxXSA9IFwiY2hldnJvbnNSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNVcFwiXSA9IDYyXSA9IFwiY2hldnJvbnNVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrRG93blwiXSA9IDYzXSA9IFwiY2hldnJvblRoaWNrRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrTGVmdFwiXSA9IDY0XSA9IFwiY2hldnJvblRoaWNrTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrUmlnaHRcIl0gPSA2NV0gPSBcImNoZXZyb25UaGlja1JpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tVcFwiXSA9IDY2XSA9IFwiY2hldnJvblRoaWNrVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluRG93blwiXSA9IDY3XSA9IFwiY2hldnJvblRoaW5Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpbkxlZnRcIl0gPSA2OF0gPSBcImNoZXZyb25UaGluTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5SaWdodFwiXSA9IDY5XSA9IFwiY2hldnJvblRoaW5SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5VcFwiXSA9IDcwXSA9IFwiY2hldnJvblRoaW5VcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblVwXCJdID0gNzFdID0gXCJjaGV2cm9uVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUJhbGxcIl0gPSA3Ml0gPSBcImNpcmNsZUJhbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUJhbGxvb25zXCJdID0gNzNdID0gXCJjaXJjbGVCYWxsb29uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ2FyXCJdID0gNzRdID0gXCJjaXJjbGVDYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNhdFwiXSA9IDc1XSA9IFwiY2lyY2xlQ2F0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDb2ZmZWVcIl0gPSA3Nl0gPSBcImNpcmNsZUNvZmZlZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRG9nXCJdID0gNzddID0gXCJjaXJjbGVEb2dcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUVtcHR5XCJdID0gNzhdID0gXCJjaXJjbGVFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRmlsbFwiXSA9IDc5XSA9IFwiY2lyY2xlRmlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRmlsbGVkXCJdID0gODBdID0gXCJjaXJjbGVGaWxsZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUhhbGZGaWxsZWRcIl0gPSA4MV0gPSBcImNpcmNsZUhhbGZGaWxsZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUluZm9cIl0gPSA4Ml0gPSBcImNpcmNsZUluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUxpZ2h0bmluZ1wiXSA9IDgzXSA9IFwiY2lyY2xlTGlnaHRuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQaWxsXCJdID0gODRdID0gXCJjaXJjbGVQaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQbGFuZVwiXSA9IDg1XSA9IFwiY2lyY2xlUGxhbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBsdXNcIl0gPSA4Nl0gPSBcImNpcmNsZVBsdXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBvb2RsZVwiXSA9IDg3XSA9IFwiY2lyY2xlUG9vZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVVbmZpbGxlZFwiXSA9IDg4XSA9IFwiY2lyY2xlVW5maWxsZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsYXNzTm90ZWJvb2tcIl0gPSA4OV0gPSBcImNsYXNzTm90ZWJvb2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsYXNzcm9vbVwiXSA9IDkwXSA9IFwiY2xhc3Nyb29tXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbG9ja1wiXSA9IDkxXSA9IFwiY2xvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsdXR0ZXJcIl0gPSA5Ml0gPSBcImNsdXR0ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvZmZlZVwiXSA9IDkzXSA9IFwiY29mZmVlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb2xsYXBzZVwiXSA9IDk0XSA9IFwiY29sbGFwc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbmZsaWN0XCJdID0gOTVdID0gXCJjb25mbGljdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdFwiXSA9IDk2XSA9IFwiY29udGFjdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdEZvcm1cIl0gPSA5N10gPSBcImNvbnRhY3RGb3JtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb250YWN0UHVibGljXCJdID0gOThdID0gXCJjb250YWN0UHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb3B5XCJdID0gOTldID0gXCJjb3B5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjcmVkaXRDYXJkXCJdID0gMTAwXSA9IFwiY3JlZGl0Q2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY3JlZGl0Q2FyZE91dGxpbmVcIl0gPSAxMDFdID0gXCJjcmVkaXRDYXJkT3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGFzaGJvYXJkXCJdID0gMTAyXSA9IFwiZGFzaGJvYXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXNjZW5kaW5nXCJdID0gMTAzXSA9IFwiZGVzY2VuZGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGVza3RvcFwiXSA9IDEwNF0gPSBcImRlc2t0b3BcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRldmljZVdpcGVcIl0gPSAxMDVdID0gXCJkZXZpY2VXaXBlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkaWFscGFkXCJdID0gMTA2XSA9IFwiZGlhbHBhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGlyZWN0aW9uc1wiXSA9IDEwN10gPSBcImRpcmVjdGlvbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50XCJdID0gMTA4XSA9IFwiZG9jdW1lbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50QWRkXCJdID0gMTA5XSA9IFwiZG9jdW1lbnRBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50Rm9yd2FyZFwiXSA9IDExMF0gPSBcImRvY3VtZW50Rm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRMYW5kc2NhcGVcIl0gPSAxMTFdID0gXCJkb2N1bWVudExhbmRzY2FwZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRQREZcIl0gPSAxMTJdID0gXCJkb2N1bWVudFBERlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRSZXBseVwiXSA9IDExM10gPSBcImRvY3VtZW50UmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50c1wiXSA9IDExNF0gPSBcImRvY3VtZW50c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRTZWFyY2hcIl0gPSAxMTVdID0gXCJkb2N1bWVudFNlYXJjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9nXCJdID0gMTE2XSA9IFwiZG9nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2dBbHRcIl0gPSAxMTddID0gXCJkb2dBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvdFwiXSA9IDExOF0gPSBcImRvdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG93bmxvYWRcIl0gPSAxMTldID0gXCJkb3dubG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJtXCJdID0gMTIwXSA9IFwiZHJtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkcm9wXCJdID0gMTIxXSA9IFwiZHJvcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJvcGRvd25cIl0gPSAxMjJdID0gXCJkcm9wZG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZWRpdEJveFwiXSA9IDEyM10gPSBcImVkaXRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVsbGlwc2lzXCJdID0gMTI0XSA9IFwiZWxsaXBzaXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVtYmVkXCJdID0gMTI1XSA9IFwiZW1iZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50XCJdID0gMTI2XSA9IFwiZXZlbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50Q2FuY2VsXCJdID0gMTI3XSA9IFwiZXZlbnRDYW5jZWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50SW5mb1wiXSA9IDEyOF0gPSBcImV2ZW50SW5mb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRSZWN1cnJpbmdcIl0gPSAxMjldID0gXCJldmVudFJlY3VycmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRTaGFyZVwiXSA9IDEzMF0gPSBcImV2ZW50U2hhcmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV4Y2xhbWF0aW9uXCJdID0gMTMxXSA9IFwiZXhjbGFtYXRpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV4cGFuZFwiXSA9IDEzMl0gPSBcImV4cGFuZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXllXCJdID0gMTMzXSA9IFwiZXllXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmYXZvcml0ZXNcIl0gPSAxMzRdID0gXCJmYXZvcml0ZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZheFwiXSA9IDEzNV0gPSBcImZheFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRNYWlsXCJdID0gMTM2XSA9IFwiZmllbGRNYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZE51bWJlclwiXSA9IDEzN10gPSBcImZpZWxkTnVtYmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZFRleHRcIl0gPSAxMzhdID0gXCJmaWVsZFRleHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkVGV4dEJveFwiXSA9IDEzOV0gPSBcImZpZWxkVGV4dEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZURvY3VtZW50XCJdID0gMTQwXSA9IFwiZmlsZURvY3VtZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlSW1hZ2VcIl0gPSAxNDFdID0gXCJmaWxlSW1hZ2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVQREZcIl0gPSAxNDJdID0gXCJmaWxlUERGXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWx0ZXJcIl0gPSAxNDNdID0gXCJmaWx0ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbHRlckNsZWFyXCJdID0gMTQ0XSA9IFwiZmlsdGVyQ2xlYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpcnN0QWlkXCJdID0gMTQ1XSA9IFwiZmlyc3RBaWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZsYWdcIl0gPSAxNDZdID0gXCJmbGFnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJcIl0gPSAxNDddID0gXCJmb2xkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlck1vdmVcIl0gPSAxNDhdID0gXCJmb2xkZXJNb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJQdWJsaWNcIl0gPSAxNDldID0gXCJmb2xkZXJQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlclNlYXJjaFwiXSA9IDE1MF0gPSBcImZvbGRlclNlYXJjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udENvbG9yXCJdID0gMTUxXSA9IFwiZm9udENvbG9yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250RGVjcmVhc2VcIl0gPSAxNTJdID0gXCJmb250RGVjcmVhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnRJbmNyZWFzZVwiXSA9IDE1M10gPSBcImZvbnRJbmNyZWFzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZnJvd255XCJdID0gMTU0XSA9IFwiZnJvd255XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmdWxsc2NyZWVuXCJdID0gMTU1XSA9IFwiZnVsbHNjcmVlblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2VhclwiXSA9IDE1Nl0gPSBcImdlYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdsYXNzZXNcIl0gPSAxNTddID0gXCJnbGFzc2VzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnbG9iZVwiXSA9IDE1OF0gPSBcImdsb2JlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJncmFwaFwiXSA9IDE1OV0gPSBcImdyYXBoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJncm91cFwiXSA9IDE2MF0gPSBcImdyb3VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFkZXJcIl0gPSAxNjFdID0gXCJoZWFkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhlYXJ0XCJdID0gMTYyXSA9IFwiaGVhcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhlYXJ0RW1wdHlcIl0gPSAxNjNdID0gXCJoZWFydEVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoaWRlXCJdID0gMTY0XSA9IFwiaGlkZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaG9tZVwiXSA9IDE2NV0gPSBcImhvbWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluYm94Q2hlY2tcIl0gPSAxNjZdID0gXCJpbmJveENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmZvXCJdID0gMTY3XSA9IFwiaW5mb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5mb0NpcmNsZVwiXSA9IDE2OF0gPSBcImluZm9DaXJjbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIml0YWxpY1wiXSA9IDE2OV0gPSBcIml0YWxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wia2V5XCJdID0gMTcwXSA9IFwia2V5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsYXRlXCJdID0gMTcxXSA9IFwibGF0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlmZXNhdmVyXCJdID0gMTcyXSA9IFwibGlmZXNhdmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWZlc2F2ZXJMb2NrXCJdID0gMTczXSA9IFwibGlmZXNhdmVyTG9ja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlnaHRCdWxiXCJdID0gMTc0XSA9IFwibGlnaHRCdWxiXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWdodG5pbmdcIl0gPSAxNzVdID0gXCJsaWdodG5pbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpbmtcIl0gPSAxNzZdID0gXCJsaW5rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaW5rUmVtb3ZlXCJdID0gMTc3XSA9IFwibGlua1JlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdEJ1bGxldHNcIl0gPSAxNzhdID0gXCJsaXN0QnVsbGV0c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdENoZWNrXCJdID0gMTc5XSA9IFwibGlzdENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0Q2hlY2tib3hcIl0gPSAxODBdID0gXCJsaXN0Q2hlY2tib3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RHcm91cFwiXSA9IDE4MV0gPSBcImxpc3RHcm91cFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdEdyb3VwMlwiXSA9IDE4Ml0gPSBcImxpc3RHcm91cDJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3ROdW1iZXJlZFwiXSA9IDE4M10gPSBcImxpc3ROdW1iZXJlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibG9ja1wiXSA9IDE4NF0gPSBcImxvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxcIl0gPSAxODVdID0gXCJtYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsQ2hlY2tcIl0gPSAxODZdID0gXCJtYWlsQ2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxEb3duXCJdID0gMTg3XSA9IFwibWFpbERvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFZGl0XCJdID0gMTg4XSA9IFwibWFpbEVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFbXB0eVwiXSA9IDE4OV0gPSBcIm1haWxFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbEVycm9yXCJdID0gMTkwXSA9IFwibWFpbEVycm9yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsT3BlblwiXSA9IDE5MV0gPSBcIm1haWxPcGVuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUGF1c2VcIl0gPSAxOTJdID0gXCJtYWlsUGF1c2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxQdWJsaWNcIl0gPSAxOTNdID0gXCJtYWlsUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUmVhZFwiXSA9IDE5NF0gPSBcIm1haWxSZWFkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsU2VuZFwiXSA9IDE5NV0gPSBcIm1haWxTZW5kXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsU3luY1wiXSA9IDE5Nl0gPSBcIm1haWxTeW5jXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsVW5yZWFkXCJdID0gMTk3XSA9IFwibWFpbFVucmVhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFwTWFya2VyXCJdID0gMTk4XSA9IFwibWFwTWFya2VyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZWFsXCJdID0gMTk5XSA9IFwibWVhbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVudVwiXSA9IDIwMF0gPSBcIm1lbnVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lbnUyXCJdID0gMjAxXSA9IFwibWVudTJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lcmdlXCJdID0gMjAyXSA9IFwibWVyZ2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1ldGFkYXRhXCJdID0gMjAzXSA9IFwibWV0YWRhdGFcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pY3JvcGhvbmVcIl0gPSAyMDRdID0gXCJtaWNyb3Bob25lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaW5pYXR1cmVzXCJdID0gMjA1XSA9IFwibWluaWF0dXJlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWludXNcIl0gPSAyMDZdID0gXCJtaW51c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW9iaWxlXCJdID0gMjA3XSA9IFwibW9iaWxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtb25leVwiXSA9IDIwOF0gPSBcIm1vbmV5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtb3ZlXCJdID0gMjA5XSA9IFwibW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibXVsdGlDaG9pY2VcIl0gPSAyMTBdID0gXCJtdWx0aUNob2ljZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibXVzaWNcIl0gPSAyMTFdID0gXCJtdXNpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmF2aWdhdGVcIl0gPSAyMTJdID0gXCJuYXZpZ2F0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmV3XCJdID0gMjEzXSA9IFwibmV3XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJuZXdzZmVlZFwiXSA9IDIxNF0gPSBcIm5ld3NmZWVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlXCJdID0gMjE1XSA9IFwibm90ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZWJvb2tcIl0gPSAyMTZdID0gXCJub3RlYm9va1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZUVkaXRcIl0gPSAyMTddID0gXCJub3RlRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZUZvcndhcmRcIl0gPSAyMThdID0gXCJub3RlRm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZVJlcGx5XCJdID0gMjE5XSA9IFwibm90ZVJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RSZWN1cnJpbmdcIl0gPSAyMjBdID0gXCJub3RSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9uZWRyaXZlXCJdID0gMjIxXSA9IFwib25lZHJpdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9ubGluZUFkZFwiXSA9IDIyMl0gPSBcIm9ubGluZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib25saW5lSm9pblwiXSA9IDIyM10gPSBcIm9ubGluZUpvaW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9vZlJlcGx5XCJdID0gMjI0XSA9IFwib29mUmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9yZ1wiXSA9IDIyNV0gPSBcIm9yZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFnZVwiXSA9IDIyNl0gPSBcInBhZ2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhaW50XCJdID0gMjI3XSA9IFwicGFpbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhbmVsXCJdID0gMjI4XSA9IFwicGFuZWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhcnRuZXJcIl0gPSAyMjldID0gXCJwYXJ0bmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYXVzZVwiXSA9IDIzMF0gPSBcInBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW5jaWxcIl0gPSAyMzFdID0gXCJwZW5jaWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVwiXSA9IDIzMl0gPSBcInBlb3BsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlQWRkXCJdID0gMjMzXSA9IFwicGVvcGxlQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVDaGVja1wiXSA9IDIzNF0gPSBcInBlb3BsZUNoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVFcnJvclwiXSA9IDIzNV0gPSBcInBlb3BsZUVycm9yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVQYXVzZVwiXSA9IDIzNl0gPSBcInBlb3BsZVBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVSZW1vdmVcIl0gPSAyMzddID0gXCJwZW9wbGVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVNlY3VyaXR5XCJdID0gMjM4XSA9IFwicGVvcGxlU2VjdXJpdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVN5bmNcIl0gPSAyMzldID0gXCJwZW9wbGVTeW5jXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25cIl0gPSAyNDBdID0gXCJwZXJzb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvbkFkZFwiXSA9IDI0MV0gPSBcInBlcnNvbkFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uUmVtb3ZlXCJdID0gMjQyXSA9IFwicGVyc29uUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaG9uZVwiXSA9IDI0M10gPSBcInBob25lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaG9uZUFkZFwiXSA9IDI0NF0gPSBcInBob25lQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaG9uZVRyYW5zZmVyXCJdID0gMjQ1XSA9IFwicGhvbmVUcmFuc2ZlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZVwiXSA9IDI0Nl0gPSBcInBpY3R1cmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVBZGRcIl0gPSAyNDddID0gXCJwaWN0dXJlQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlRWRpdFwiXSA9IDI0OF0gPSBcInBpY3R1cmVFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlUmVtb3ZlXCJdID0gMjQ5XSA9IFwicGljdHVyZVJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGlsbFwiXSA9IDI1MF0gPSBcInBpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbkRvd25cIl0gPSAyNTFdID0gXCJwaW5Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaW5MZWZ0XCJdID0gMjUyXSA9IFwicGluTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGxhY2Vob2xkZXJcIl0gPSAyNTNdID0gXCJwbGFjZWhvbGRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGxhbmVcIl0gPSAyNTRdID0gXCJwbGFuZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGxheVwiXSA9IDI1NV0gPSBcInBsYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsdXNcIl0gPSAyNTZdID0gXCJwbHVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbHVzMlwiXSA9IDI1N10gPSBcInBsdXMyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb2ludEl0ZW1cIl0gPSAyNThdID0gXCJwb2ludEl0ZW1cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvcG91dFwiXSA9IDI1OV0gPSBcInBvcG91dFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9zdFwiXSA9IDI2MF0gPSBcInBvc3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInByaW50XCJdID0gMjYxXSA9IFwicHJpbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInByb3RlY3Rpb25DZW50ZXJcIl0gPSAyNjJdID0gXCJwcm90ZWN0aW9uQ2VudGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdWVzdGlvblwiXSA9IDI2M10gPSBcInF1ZXN0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdWVzdGlvblJldmVyc2VcIl0gPSAyNjRdID0gXCJxdWVzdGlvblJldmVyc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInF1b3RlXCJdID0gMjY1XSA9IFwicXVvdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJhZGlvQnV0dG9uXCJdID0gMjY2XSA9IFwicmFkaW9CdXR0b25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlYWN0aXZhdGVcIl0gPSAyNjddID0gXCJyZWFjdGl2YXRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0Q2hlY2tcIl0gPSAyNjhdID0gXCJyZWNlaXB0Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlY2VpcHRGb3J3YXJkXCJdID0gMjY5XSA9IFwicmVjZWlwdEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlY2VpcHRSZXBseVwiXSA9IDI3MF0gPSBcInJlY2VpcHRSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVmcmVzaFwiXSA9IDI3MV0gPSBcInJlZnJlc2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlbG9hZFwiXSA9IDI3Ml0gPSBcInJlbG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlcIl0gPSAyNzNdID0gXCJyZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlBbGxcIl0gPSAyNzRdID0gXCJyZXBseUFsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlBbGxBbHRcIl0gPSAyNzVdID0gXCJyZXBseUFsbEFsdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVwbHlBbHRcIl0gPSAyNzZdID0gXCJyZXBseUFsdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmliYm9uXCJdID0gMjc3XSA9IFwicmliYm9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyb29tXCJdID0gMjc4XSA9IFwicm9vbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2F2ZVwiXSA9IDI3OV0gPSBcInNhdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNjaGVkdWxpbmdcIl0gPSAyODBdID0gXCJzY2hlZHVsaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWFyY2hcIl0gPSAyODFdID0gXCJzZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNlY3Rpb25cIl0gPSAyODJdID0gXCJzZWN0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWN0aW9uc1wiXSA9IDI4M10gPSBcInNlY3Rpb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZXR0aW5nc1wiXSA9IDI4NF0gPSBcInNldHRpbmdzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaGFyZVwiXSA9IDI4NV0gPSBcInNoYXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaGllbGRcIl0gPSAyODZdID0gXCJzaGllbGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNpdGVzXCJdID0gMjg3XSA9IFwic2l0ZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNtaWxleVwiXSA9IDI4OF0gPSBcInNtaWxleVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29jY2VyXCJdID0gMjg5XSA9IFwic29jY2VyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb2NpYWxMaXN0ZW5pbmdcIl0gPSAyOTBdID0gXCJzb2NpYWxMaXN0ZW5pbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvcnRcIl0gPSAyOTFdID0gXCJzb3J0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb3J0TGluZXNcIl0gPSAyOTJdID0gXCJzb3J0TGluZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNwbGl0XCJdID0gMjkzXSA9IFwic3BsaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0YXJcIl0gPSAyOTRdID0gXCJzdGFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdGFyRW1wdHlcIl0gPSAyOTVdID0gXCJzdGFyRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0b3B3YXRjaFwiXSA9IDI5Nl0gPSBcInN0b3B3YXRjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RvcnlcIl0gPSAyOTddID0gXCJzdG9yeVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3R5bGVSZW1vdmVcIl0gPSAyOThdID0gXCJzdHlsZVJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3Vic2NyaWJlXCJdID0gMjk5XSA9IFwic3Vic2NyaWJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5cIl0gPSAzMDBdID0gXCJzdW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1bkFkZFwiXSA9IDMwMV0gPSBcInN1bkFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuUXVlc3Rpb25cIl0gPSAzMDJdID0gXCJzdW5RdWVzdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VwcG9ydFwiXSA9IDMwM10gPSBcInN1cHBvcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhYmxlXCJdID0gMzA0XSA9IFwidGFibGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhYmxldFwiXSA9IDMwNV0gPSBcInRhYmxldFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFnXCJdID0gMzA2XSA9IFwidGFnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YXNrUmVjdXJyaW5nXCJdID0gMzA3XSA9IFwidGFza1JlY3VycmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFza3NcIl0gPSAzMDhdID0gXCJ0YXNrc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGVhbXdvcmtcIl0gPSAzMDldID0gXCJ0ZWFtd29ya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGV4dFwiXSA9IDMxMF0gPSBcInRleHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRleHRCb3hcIl0gPSAzMTFdID0gXCJ0ZXh0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0aWxlXCJdID0gMzEyXSA9IFwidGlsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGltZWxpbmVcIl0gPSAzMTNdID0gXCJ0aW1lbGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9kYXlcIl0gPSAzMTRdID0gXCJ0b2RheVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9nZ2xlXCJdID0gMzE1XSA9IFwidG9nZ2xlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b2dnbGVNaWRkbGVcIl0gPSAzMTZdID0gXCJ0b2dnbGVNaWRkbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvdWNoXCJdID0gMzE3XSA9IFwidG91Y2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyYXNoXCJdID0gMzE4XSA9IFwidHJhc2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRG93blwiXSA9IDMxOV0gPSBcInRyaWFuZ2xlRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eURvd25cIl0gPSAzMjBdID0gXCJ0cmlhbmdsZUVtcHR5RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eUxlZnRcIl0gPSAzMjFdID0gXCJ0cmlhbmdsZUVtcHR5TGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eVJpZ2h0XCJdID0gMzIyXSA9IFwidHJpYW5nbGVFbXB0eVJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5VXBcIl0gPSAzMjNdID0gXCJ0cmlhbmdsZUVtcHR5VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlTGVmdFwiXSA9IDMyNF0gPSBcInRyaWFuZ2xlTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVSaWdodFwiXSA9IDMyNV0gPSBcInRyaWFuZ2xlUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlVXBcIl0gPSAzMjZdID0gXCJ0cmlhbmdsZVVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cm9waHlcIl0gPSAzMjddID0gXCJ0cm9waHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVuZGVybGluZVwiXSA9IDMyOF0gPSBcInVuZGVybGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widW5zdWJzY3JpYmVcIl0gPSAzMjldID0gXCJ1bnN1YnNjcmliZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widXBsb2FkXCJdID0gMzMwXSA9IFwidXBsb2FkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2aWRlb1wiXSA9IDMzMV0gPSBcInZpZGVvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxcIl0gPSAzMzJdID0gXCJ2b2ljZW1haWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZvaWNlbWFpbEZvcndhcmRcIl0gPSAzMzNdID0gXCJ2b2ljZW1haWxGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxSZXBseVwiXSA9IDMzNF0gPSBcInZvaWNlbWFpbFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3YWZmbGVcIl0gPSAzMzVdID0gXCJ3YWZmbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIndvcmtcIl0gPSAzMzZdID0gXCJ3b3JrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3cmVuY2hcIl0gPSAzMzddID0gXCJ3cmVuY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInhcIl0gPSAzMzhdID0gXCJ4XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ4Q2lyY2xlXCJdID0gMzM5XSA9IFwieENpcmNsZVwiO1xufSkoZXhwb3J0cy5JY29uRW51bSB8fCAoZXhwb3J0cy5JY29uRW51bSA9IHt9KSk7XG52YXIgSWNvbkVudW0gPSBleHBvcnRzLkljb25FbnVtO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIExhYmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYWJlbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGFiZWwgY2xhc3M9XCJtcy1MYWJlbFwiPjxuZy10cmFuc2NsdWRlLz48L2xhYmVsPic7XG4gICAgfVxuICAgIExhYmVsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExhYmVsRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRyaWJ1dGVzLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2xhYmVsJykuZXEoMCkuYWRkQ2xhc3MoJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRyaWJ1dGVzLnJlcXVpcmVkKSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2xhYmVsJykuZXEoMCkuYWRkQ2xhc3MoJ2lzLXJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMYWJlbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxhYmVsRGlyZWN0aXZlID0gTGFiZWxEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5sYWJlbCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxhYmVsJywgTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgTGlua0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlua0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8YSBuZy1ocmVmPVwie3sgbmdIcmVmIH19XCIgY2xhc3M9XCJtcy1MaW5rXCIgbmctdHJhbnNjbHVkZT48L2E+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIExpbmtEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaW5rRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlua0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpbmtEaXJlY3RpdmUgPSBMaW5rRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGluaycsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGluaycsIExpbmtEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMSA9IHJlcXVpcmUoJy4vbGlzdEl0ZW1TZWxlY3RNb2RlRW51bScpO1xudmFyIGxpc3RJdGVtVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vbGlzdEl0ZW1UeXBlRW51bScpO1xudmFyIGxpc3RMYXlvdXRFbnVtXzEgPSByZXF1aXJlKCcuL2xpc3RMYXlvdXRFbnVtJyk7XG52YXIgTGlzdENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RDb250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtU2VsZWN0TW9kZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1TZWxlY3RNb2RlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGlzdENvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkSXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGlzdENvbnRyb2xsZXIucHJvdG90eXBlLCBcIml0ZW1zXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIExpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIExpc3RDb250cm9sbGVyO1xufSgpKTtcbnZhciBMaXN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dWwgY2xhc3M9XCJtcy1MaXN0XCIgbmctdHJhbnNjbHVkZT48L3VsPic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IExpc3RDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICdsaXN0JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6ICc9P3VpZlNlbGVjdGVkSXRlbXMnXG4gICAgICAgIH07XG4gICAgfVxuICAgIExpc3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBMaXN0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZMYXlvdXQgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZMYXlvdXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtW2F0dHJzLnVpZkxheW91dF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmTGF5b3V0ICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi1sYXlvdXRcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbGlzdHxncmlkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubGF5b3V0ID0gYXR0cnMudWlmTGF5b3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5sYXlvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NvcGUubGF5b3V0ID0gbGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bVtsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtLmxpc3RdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5sYXlvdXQgPT09IGxpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW1bbGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bS5ncmlkXSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3QtLWdyaWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmSXRlbVNlbGVjdE1vZGUgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZJdGVtU2VsZWN0TW9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZJdGVtU2VsZWN0TW9kZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtaXRlbS1zZWxlY3QtbW9kZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBub25lfHNpbmdsZXxtdWx0aXBsZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1TZWxlY3RNb2RlID0gYXR0cnMudWlmSXRlbVNlbGVjdE1vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW1TZWxlY3RNb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLml0ZW1TZWxlY3RNb2RlID0gbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW1bbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0ubm9uZV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMaXN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdERpcmVjdGl2ZSA9IExpc3REaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBMaXN0SXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gTGlzdEl0ZW1Db250cm9sbGVyO1xufSgpKTtcbnZhciBMaXN0SXRlbURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxsaSBjbGFzcz1cIm1zLUxpc3RJdGVtXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmTGlzdCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpdGVtOiAnPXVpZkl0ZW0nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IExpc3RJdGVtQ29udHJvbGxlcjtcbiAgICB9XG4gICAgTGlzdEl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTGlzdEl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGxpc3QpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRTdHJpbmcgPSBhdHRycy51aWZTZWxlY3RlZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nICE9PSAndHJ1ZScgJiYgc2VsZWN0ZWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICBsaXN0LiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlNlbGVjdGVkICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtICYmIGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0LnNlbGVjdGVkSXRlbXNbaV0gPT09IHNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmVHlwZSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bVthdHRycy51aWZUeXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZUeXBlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi10eXBlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIGl0ZW18aXRlbVdpdGhJbWFnZXxpdGVtV2l0aEljb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS50eXBlID0gbGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW1bYXR0cnMudWlmVHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChzY29wZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSWNvbjpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtTGlzdEl0ZW0tLWRvY3VtZW50Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmZpbmQoJ3VpZi1saXN0LWl0ZW0taWNvbicpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0xpc3QgaXRlbSB0eXBlIGl0ZW1XaXRoSWNvbiByZXF1aXJlcyB0aGUgdWlmLWxpc3QtaXRlbS1pY29uIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgbGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW0uaXRlbVdpdGhJbWFnZTpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtTGlzdEl0ZW0tLWltYWdlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmZpbmQoJ3VpZi1saXN0LWl0ZW0taW1hZ2UnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdMaXN0IGl0ZW0gdHlwZSBpdGVtV2l0aEltYWdlIHJlcXVpcmVzIHRoZSB1aWYtbGlzdC1pdGVtLWltYWdlIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlVucmVhZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZVbnJlYWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciB1bnJlYWRTdHJpbmcgPSBhdHRycy51aWZVbnJlYWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh1bnJlYWRTdHJpbmcgIT09ICd0cnVlJyAmJiB1bnJlYWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICBsaXN0LiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlVucmVhZCArICdcXCcgaXMgbm90IGEgdmFsaWQgYm9vbGVhbiB2YWx1ZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSB0cnVlfGZhbHNlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHVucmVhZFN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnVucmVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZVbnNlZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgYXR0cnMudWlmVW5zZWVuICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgdW5zZWVuU3RyaW5nID0gYXR0cnMudWlmVW5zZWVuLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodW5zZWVuU3RyaW5nICE9PSAndHJ1ZScgJiYgdW5zZWVuU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZVbnNlZW4gKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1bnNlZW5TdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS51bnNlZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsaXN0Lml0ZW1zLnB1c2goc2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLml0ZW1DbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSAhc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0Lml0ZW1TZWxlY3RNb2RlID09PSBsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bS5zaW5nbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QuaXRlbXNbaV0gIT09IGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaXRlbUFscmVhZHlTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5zZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0LnNlbGVjdGVkSXRlbXNbaV0gPT09IGxpc3RJdGVtU2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUFscmVhZHlTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW1BbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zZWxlY3RlZEl0ZW1zLnB1c2gobGlzdEl0ZW1TY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBsaXN0SXRlbVNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndW5yZWFkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgbGlzdEl0ZW1TY29wZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXVucmVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXVucmVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1bnNlZW4nLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtdW5zZWVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtdW5zZWVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGlzdC5pdGVtU2VsZWN0TW9kZSAhPT0gbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW1bbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0ubm9uZV0pIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5vbignY2xpY2snLCBzY29wZS5pdGVtQ2xpY2spO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGFibGUnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1EaXJlY3RpdmUgPSBMaXN0SXRlbURpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tcHJpbWFyeVRleHRcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSA9IExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1MaXN0SXRlbS1zZWNvbmRhcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1MaXN0SXRlbS10ZXJ0aWFyeVRleHRcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tbWV0YVRleHRcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSA9IExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0taW1hZ2VcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbUltYWdlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbUltYWdlRGlyZWN0aXZlID0gTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUljb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtSWNvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0taXRlbUljb25cIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbUljb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbUljb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUljb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbUljb25EaXJlY3RpdmUgPSBMaXN0SXRlbUljb25EaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1MaXN0SXRlbS1zZWxlY3Rpb25UYXJnZXRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSA9IExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1BY3Rpb25zRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1MaXN0SXRlbS1hY3Rpb25zXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1BY3Rpb25zRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1BY3Rpb25zRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1BY3Rpb25zRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1BY3Rpb25zRGlyZWN0aXZlID0gTGlzdEl0ZW1BY3Rpb25zRGlyZWN0aXZlO1xudmFyIExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tYWN0aW9uXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUgPSBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0JywgTGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW0nLCBMaXN0SXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1QcmltYXJ5VGV4dCcsIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtU2Vjb25kYXJ5VGV4dCcsIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1UZXJ0aWFyeVRleHQnLCBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1NZXRhVGV4dCcsIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtSW1hZ2UnLCBMaXN0SXRlbUltYWdlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUljb24nLCBMaXN0SXRlbUljb25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0JywgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtQWN0aW9ucycsIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1BY3Rpb24nLCBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKExpc3RJdGVtU2VsZWN0TW9kZUVudW0pIHtcbiAgICBMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW0xpc3RJdGVtU2VsZWN0TW9kZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW0xpc3RJdGVtU2VsZWN0TW9kZUVudW1bXCJzaW5nbGVcIl0gPSAxXSA9IFwic2luZ2xlXCI7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wibXVsdGlwbGVcIl0gPSAyXSA9IFwibXVsdGlwbGVcIjtcbn0pKGV4cG9ydHMuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bSB8fCAoZXhwb3J0cy5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtID0ge30pKTtcbnZhciBMaXN0SXRlbVNlbGVjdE1vZGVFbnVtID0gZXhwb3J0cy5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKExpc3RJdGVtVHlwZUVudW0pIHtcbiAgICBMaXN0SXRlbVR5cGVFbnVtW0xpc3RJdGVtVHlwZUVudW1bXCJpdGVtXCJdID0gMF0gPSBcIml0ZW1cIjtcbiAgICBMaXN0SXRlbVR5cGVFbnVtW0xpc3RJdGVtVHlwZUVudW1bXCJpdGVtV2l0aEltYWdlXCJdID0gMV0gPSBcIml0ZW1XaXRoSW1hZ2VcIjtcbiAgICBMaXN0SXRlbVR5cGVFbnVtW0xpc3RJdGVtVHlwZUVudW1bXCJpdGVtV2l0aEljb25cIl0gPSAyXSA9IFwiaXRlbVdpdGhJY29uXCI7XG59KShleHBvcnRzLkxpc3RJdGVtVHlwZUVudW0gfHwgKGV4cG9ydHMuTGlzdEl0ZW1UeXBlRW51bSA9IHt9KSk7XG52YXIgTGlzdEl0ZW1UeXBlRW51bSA9IGV4cG9ydHMuTGlzdEl0ZW1UeXBlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChMaXN0TGF5b3V0RW51bSkge1xuICAgIExpc3RMYXlvdXRFbnVtW0xpc3RMYXlvdXRFbnVtW1wibGlzdFwiXSA9IDBdID0gXCJsaXN0XCI7XG4gICAgTGlzdExheW91dEVudW1bTGlzdExheW91dEVudW1bXCJncmlkXCJdID0gMV0gPSBcImdyaWRcIjtcbn0pKGV4cG9ydHMuTGlzdExheW91dEVudW0gfHwgKGV4cG9ydHMuTGlzdExheW91dEVudW0gPSB7fSkpO1xudmFyIExpc3RMYXlvdXRFbnVtID0gZXhwb3J0cy5MaXN0TGF5b3V0RW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RMYXlvdXRFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBNZXNzYWdlQmFubmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nLCAkd2luZG93KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgIH1cbiAgICBNZXNzYWdlQmFubmVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZycsICckd2luZG93J107XG4gICAgcmV0dXJuIE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIgPSBNZXNzYWdlQmFubmVyQ29udHJvbGxlcjtcbnZhciBNZXNzYWdlQmFubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFubmVyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTWVzc2FnZUJhbm5lckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAndWlmTWVzc2FnZUJhbm5lcic7XG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lclxcXCIgbmctc2hvdz1cXFwidWlmSXNWaXNpYmxlXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lci1jb250ZW50XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lci10ZXh0XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lci1jbGlwcGVyXFxcIj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDx1aWYtYnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgdWlmLXR5cGU9XFxcImNvbW1hbmRcXFwiIGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWV4cGFuZFxcXCIgbmctc2hvdz1cXFwiIWlzRXhwYW5kZWRcXFwiIHN0eWxlPVxcXCJoZWlnaHQ6NTJweFxcXCI+XFxuICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiY2hldnJvbnNEb3duXFxcIj48L3VpZi1pY29uPlxcbiAgICA8L3VpZi1idXR0b24+XFxuICAgIDx1aWYtYnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgdWlmLXR5cGU9XFxcImNvbW1hbmRcXFwiIGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWV4cGFuZFxcXCIgbmctc2hvdz1cXFwiaXNFeHBhbmRlZFxcXCIgc3R5bGU9XFxcImhlaWdodDo1MnB4XFxcIj5cXG4gICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJjaGV2cm9uc1VwXFxcIj48L3VpZi1pY29uPlxcbiAgICA8L3VpZi1idXR0b24+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItYWN0aW9uXFxcIj5cXG4gICAgPHVpZi1idXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiB1aWYtdHlwZT1cXFwicHJpbWFyeVxcXCIgY2xhc3M9XFxcIm1zLWZvbnRDb2xvci1uZXV0cmFsTGlnaHRcXFwiIG5nLWNsaWNrPVxcXCJ1aWZBY3Rpb24oKVxcXCI+e3sgdWlmQWN0aW9uTGFiZWwgfX08L3VpZi1idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPHVpZi1idXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiB1aWYtdHlwZT1cXFwiY29tbWFuZFxcXCIgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItY2xvc2VcXFwiIG5nLWNsaWNrPVxcXCJ1aWZPbkNsb3NlKClcXFwiIHN0eWxlPVxcXCJoZWlnaHQ6NTJweFxcXCI+XFxuICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwieFxcXCI+PC91aWYtaWNvbj5cXG4gICAgPC91aWYtYnV0dG9uPlxcbiAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkFjdGlvbjogJyYnLFxuICAgICAgICAgICAgdWlmQWN0aW9uTGFiZWw6ICdAJyxcbiAgICAgICAgICAgIHVpZklzVmlzaWJsZTogJz0/JyxcbiAgICAgICAgICAgIHVpZk9uQ2xvc2U6ICcmPydcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fdGV4dENvbnRhaW5lck1heFdpZHRoID0gNzAwO1xuICAgICAgICB0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoID0gODg7XG4gICAgICAgIHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGhTbWFsbCA9IDM1O1xuICAgICAgICB0aGlzLlNNQUxMX0JSRUFLX1BPSU5UID0gNDgwO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbSwgJGF0dHJzLCAkY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS51aWZBY3Rpb25MYWJlbCA9ICRhdHRycy51aWZBY3Rpb25MYWJlbDtcbiAgICAgICAgICAgICRzY29wZS5pc0V4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICBfdGhpcy5faW5pdExvY2FscygkZWxlbSk7XG4gICAgICAgICAgICBfdGhpcy50cmFuc2NsdWRlQ2hpbGRzKCRzY29wZSwgJGVsZW0sICR0cmFuc2NsdWRlKTtcbiAgICAgICAgICAgIG5nLmVsZW1lbnQoJGNvbnRyb2xsZXIuJHdpbmRvdykuYmluZCgncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9vblJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5nLmVsZW1lbnQoX3RoaXMuX2NoZXZyb25CdXR0b24pLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl90b2dnbGVFeHBhbnNpb24oJHNjb3BlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmcuZWxlbWVudChfdGhpcy5fY2xvc2VCdXR0b24pLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9oaWRlQmFubmVyKCRzY29wZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLl9vblJlc2l6ZSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZywgJHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICA7XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUudHJhbnNjbHVkZUNoaWxkcyA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIHZhciBoYXNDb250ZW50ID0gX3RoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpO1xuICAgICAgICAgICAgaWYgKCFoYXNDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubWVzc2FnZWJhbm5lciAtICcgK1xuICAgICAgICAgICAgICAgICAgICAneW91IG5lZWQgdG8gcHJvdmlkZSBhIHRleHQgZm9yIHRoZSBtZXNzYWdlIGJhbm5lci5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ0ZvciA8dWlmLW1lc3NhZ2UtYmFubmVyPiB5b3UgbmVlZCB0byBzcGVjaWZ5JyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLWNvbnRlbnQ+IGFzIGEgY2hpbGQgZGlyZWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRJdGVtQ29udGVudChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0SXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnRFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1NZXNzYWdlQmFubmVyLWNsaXBwZXInKSk7XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuaGFzSXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5faW5pdExvY2FscyA9IGZ1bmN0aW9uICgkZWxlbSkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlQmFubmVyID0gbmcuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lcicpKTtcbiAgICAgICAgdGhpcy5fY2xpcHBlciA9IG5nLmVsZW1lbnQoJGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlcicpKTtcbiAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvbiA9IG5nLmVsZW1lbnQoJGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLU1lc3NhZ2VCYW5uZXItZXhwYW5kJykpO1xuICAgICAgICB0aGlzLl9hY3Rpb25CdXR0b24gPSBuZy5lbGVtZW50KCRlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1NZXNzYWdlQmFubmVyLWFjdGlvbicpKTtcbiAgICAgICAgdGhpcy5fYnVmZmVyU2l6ZSA9IHRoaXMuX2FjdGlvbkJ1dHRvblswXS5vZmZzZXRXaWR0aCArIHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGg7XG4gICAgICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gbmcuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1jbG9zZScpKTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9vblJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY2xpZW50V2lkdGggPSB0aGlzLl9tZXNzYWdlQmFubmVyWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gdGhpcy5TTUFMTF9CUkVBS19QT0lOVCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplUmVndWxhcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplU21hbGwoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgO1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9yZXNpemVSZWd1bGFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoKHRoaXMuX2NsaWVudFdpZHRoIC0gdGhpcy5fYnVmZmVyU2l6ZSkgPiB0aGlzLl9pbml0VGV4dFdpZHRoICYmIHRoaXMuX2luaXRUZXh0V2lkdGggPCB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9ICdhdXRvJztcbiAgICAgICAgICAgIHRoaXMuX2NoZXZyb25CdXR0b24uYWRkQ2xhc3MoJ21zLU1lc3NhZ2VCYW5uZXItZXhwYW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0V2lkdGggPSBNYXRoLm1pbigodGhpcy5fY2xpZW50V2lkdGggLSB0aGlzLl9idWZmZXJTaXplKSwgdGhpcy5fdGV4dENvbnRhaW5lck1heFdpZHRoKSArICdweCc7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NoZXZyb25CdXR0b24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hldnJvbiA9IG5nLmVsZW1lbnQodGhpcy5fY2hldnJvbkJ1dHRvbltpXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGV2cm9uLmhhc0NsYXNzKCdpcy12aXNpYmxlJykgJiYgIWNoZXZyb24uaGFzQ2xhc3MoJ25nLWhpZGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGV2cm9uLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGV2cm9uLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsaXBwZXJbMF0uc3R5bGUud2lkdGggPSB0aGlzLl90ZXh0V2lkdGg7XG4gICAgfTtcbiAgICA7XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX3Jlc2l6ZVNtYWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fY2xpZW50V2lkdGggLSAodGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aFNtYWxsICsgdGhpcy5fY2xvc2VCdXR0b25bMF0ub2Zmc2V0V2lkdGgpID4gdGhpcy5faW5pdFRleHRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFdpZHRoID0gJ2F1dG8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFdpZHRoID0gKHRoaXMuX2NsaWVudFdpZHRoIC0gKHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGhTbWFsbCArIHRoaXMuX2Nsb3NlQnV0dG9uWzBdLm9mZnNldFdpZHRoKSkgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsaXBwZXJbMF0uc3R5bGUud2lkdGggPSB0aGlzLl90ZXh0V2lkdGg7XG4gICAgfTtcbiAgICA7XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX3RvZ2dsZUV4cGFuc2lvbiA9IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQgPSAhJHNjb3BlLmlzRXhwYW5kZWQ7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIudG9nZ2xlQ2xhc3MoJ2lzLWV4cGFuZGVkJyk7XG4gICAgfTtcbiAgICA7XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX2hpZGVCYW5uZXIgPSBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICgkc2NvcGUudWlmSXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlQmFubmVyLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudWlmSXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9tZXNzYWdlQmFubmVyLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5NZXNzYWdlQmFubmVyRGlyZWN0aXZlID0gTWVzc2FnZUJhbm5lckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYW5uZXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZNZXNzYWdlQmFubmVyJywgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYW5uZXIvbWVzc2FnZUJhbm5lckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgbWVzc2FnZUJhclR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL21lc3NhZ2VCYXJUeXBlRW51bScpO1xudmFyIE1lc3NhZ2VCYXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFyQ29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIE1lc3NhZ2VCYXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIE1lc3NhZ2VCYXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTWVzc2FnZUJhckNvbnRyb2xsZXIgPSBNZXNzYWdlQmFyQ29udHJvbGxlcjtcbnZhciBNZXNzYWdlQmFyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTWVzc2FnZUJhckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAndWlmTWVzc2FnZUJhcic7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnJyArXG4gICAgICAgICAgICAnPGRpdiBuZy1jbGFzcz1cIltcXCdtcy1NZXNzYWdlQmFyXFwnLCBjbGFzc1R5cGVdXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYXItY29udGVudFwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1NZXNzYWdlQmFyLWljb25cIj4nICtcbiAgICAgICAgICAgICc8aSBuZy1jbGFzcz1cIltcXCdtcy1JY29uXFwnLCBpY29uVHlwZV1cIj48L2k+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYXItdGV4dFwiIC8+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1pbmZvQ2lyY2xlJztcbiAgICAgICAgICAgICRzY29wZS5jbGFzc1R5cGUgPSAnJztcbiAgICAgICAgICAgICRzY29wZS51aWZUeXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYXIgLSBVbnN1cHBvcnRlZCB0eXBlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyAkc2NvcGUudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFyLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtZXNzYWdlQmFyVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAnIG1zLU1lc3NhZ2VCYXItLSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2xhc3NUeXBlID0gY2xhc3NOYW1lICsgbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bVtuZXdWYWx1ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5lcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmljb25UeXBlID0gJ21zLUljb24tLXhDaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5yZW1vdmU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1taW51cyBtcy1JY29uLS1jaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5zZXZlcmV3YXJuaW5nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0tYWxlcnQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5zdWNjZXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0tY2hlY2tib3hDaGVjayBtcy1JY29uLS1jaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1lc3NhZ2VCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlQmFyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIDtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSwgJ3VpZi1jb250ZW50Jyk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5NZXNzYWdlQmFyIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgdGhlIG1lc3NhZ2UgYmFyLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbWVzc2FnZS1iYXI+IHlvdSBuZWVkIHRvIHNwZWNpZnknICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudEVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYXItdGV4dCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUsICd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lLCAnbXMtTGluaycpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1MaW5rJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGJyIC8+JykpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTWVzc2FnZUJhckRpcmVjdGl2ZS5wcm90b3R5cGUuaGFzSXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsIHNlbGVjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBNZXNzYWdlQmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTWVzc2FnZUJhckRpcmVjdGl2ZSA9IE1lc3NhZ2VCYXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5tZXNzYWdlYmFyJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmTWVzc2FnZUJhcicsIE1lc3NhZ2VCYXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChNZXNzYWdlQmFyVHlwZUVudW0pIHtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wiZXJyb3JcIl0gPSAwXSA9IFwiZXJyb3JcIjtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wicmVtb3ZlXCJdID0gMV0gPSBcInJlbW92ZVwiO1xuICAgIE1lc3NhZ2VCYXJUeXBlRW51bVtNZXNzYWdlQmFyVHlwZUVudW1bXCJzZXZlcmV3YXJuaW5nXCJdID0gMl0gPSBcInNldmVyZXdhcm5pbmdcIjtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wic3VjY2Vzc1wiXSA9IDNdID0gXCJzdWNjZXNzXCI7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcIndhcm5pbmdcIl0gPSA0XSA9IFwid2FybmluZ1wiO1xufSkoZXhwb3J0cy5NZXNzYWdlQmFyVHlwZUVudW0gfHwgKGV4cG9ydHMuTWVzc2FnZUJhclR5cGVFbnVtID0ge30pKTtcbnZhciBNZXNzYWdlQmFyVHlwZUVudW0gPSBleHBvcnRzLk1lc3NhZ2VCYXJUeXBlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJUeXBlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY29udGV4dHVhbE1lbnVfMSA9IHJlcXVpcmUoJy4vLi4vY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUnKTtcbnZhciBOYXZCYXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUub3Blbk1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtZW51VmlzaWJsZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZVttZW51VmlzaWJsZSA/ICdyZW1vdmVDbGFzcycgOiAnYWRkQ2xhc3MnXSh0aGlzLiRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VNb2JpbGVNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICB0aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKHRoaXMuJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlQWxsQ29udGV4dE1lbnVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF2QmFySXRlbXMgPSB0aGlzLiRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1OYXZCYXItaXRlbScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkJhckl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbmdFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KG5hdkJhckl0ZW1zW2ldKTtcbiAgICAgICAgICAgIHZhciBuYXZCYXJJdGVtQ3RybCA9IG5nRWxlbWVudC5jb250cm9sbGVyKE5hdkJhckl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAobmF2QmFySXRlbUN0cmwpIHtcbiAgICAgICAgICAgICAgICBuYXZCYXJJdGVtQ3RybC5jbG9zZUNvbnRleHR1YWxNZW51KCk7XG4gICAgICAgICAgICAgICAgbmF2QmFySXRlbUN0cmwuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLmhpZGVTZWFyY2hUZXh0Qm94ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF2QmFySXRlbXMgPSB0aGlzLiRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1OYXZCYXItaXRlbS0tc2VhcmNoJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2QmFySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZ0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQobmF2QmFySXRlbXNbaV0pO1xuICAgICAgICAgICAgdmFyIG5hdlNlYXJjaEN0cmwgPSBuZ0VsZW1lbnQuY29udHJvbGxlcihOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAobmF2U2VhcmNoQ3RybCkge1xuICAgICAgICAgICAgICAgIG5hdlNlYXJjaEN0cmwuY2xvc2VTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnLCAnJGxvZyddO1xuICAgIHJldHVybiBOYXZCYXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyQ29udHJvbGxlciA9IE5hdkJhckNvbnRyb2xsZXI7XG52YXIgTmF2QmFyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICduYXYnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhci1vcGVuTWVudSBqcy1vcGVuTWVudVxcXCIgbmctY2xpY2s9XFxcIm5hdi5vcGVuTW9iaWxlTWVudSgpXFxcIj5cXG4gICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIm1lbnVcXFwiPjwvdWlmLWljb24+XFxuICAgIDwvZGl2PlxcbiAgICA8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XFxcInt7b3ZlcmxheX19XFxcIiBuZy1jbGljaz1cXFwibmF2LmNsb3NlTW9iaWxlTWVudSgpXFxcIj48L3VpZi1vdmVybGF5PlxcbiAgICA8dWwgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtc1xcXCI+XFxuICAgICAgPGRpdiBjbGFzcz0ndWlmLW5hdi1pdGVtcyc+PC9kaXY+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG92ZXJsYXk6ICdAP3VpZk92ZXJsYXknXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5hdkJhckNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW1zJykpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoY2xvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE5hdkJhckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTmF2QmFyRGlyZWN0aXZlKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZycsICckYW5pbWF0ZScsICckZG9jdW1lbnQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhcic7XG4gICAgTmF2QmFyRGlyZWN0aXZlLm92ZXJsYXlWYWx1ZXMgPSBbJ2xpZ2h0JywgJ2RhcmsnXTtcbiAgICByZXR1cm4gTmF2QmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyRGlyZWN0aXZlID0gTmF2QmFyRGlyZWN0aXZlO1xudmFyIE5hdkJhckl0ZW1UeXBlcztcbihmdW5jdGlvbiAoTmF2QmFySXRlbVR5cGVzKSB7XG4gICAgTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlc1tcImxpbmtcIl0gPSAwXSA9IFwibGlua1wiO1xuICAgIE5hdkJhckl0ZW1UeXBlc1tOYXZCYXJJdGVtVHlwZXNbXCJtZW51XCJdID0gMV0gPSBcIm1lbnVcIjtcbn0pKE5hdkJhckl0ZW1UeXBlcyB8fCAoTmF2QmFySXRlbVR5cGVzID0ge30pKTtcbnZhciBOYXZCYXJJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFySXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIH1cbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VDb250ZXh0dWFsTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuZGVzZWxlY3RJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgIH07XG4gICAgTmF2QmFySXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50J107XG4gICAgcmV0dXJuIE5hdkJhckl0ZW1Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFySXRlbUNvbnRyb2xsZXIgPSBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbnZhciBOYXZCYXJJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJJdGVtRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFySXRlbUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXlwiICsgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpc0Rpc2FibGVkOiAnQD9kaXNhYmxlZCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ0A/dWlmUG9zaXRpb24nLFxuICAgICAgICAgICAgdGV4dDogJz0/dWlmVGV4dCcsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5hdkJhckl0ZW1UeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubmF2YmFyIC0gdW5zdXBwb3J0ZWQgbmF2IGJhciBpdGVtIHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIG5hdiBiYXIgaXRlbS4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgTmF2QmFySXRlbVR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXY+PC9kaXY+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW05hdkJhckl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5hdkJhckNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmF2QmFyTGlua0VlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1OYXZCYXItbGluaycpKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJMaW5rRWVsZW1lbnQucmVtb3ZlQXR0cignaHJlZicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKCRzY29wZS50eXBlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS50eXBlID0gTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5oYXNDaGlsZE1lbnUgJiYgJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAhJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9wZW5NZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmNsb3NlTW9iaWxlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgJHNjb3BlLnNlbGVjdEl0ZW0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICB2YXIgY29udGV4dE1lbnVDdHJsID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db250ZXh0dWFsTWVudScpKVxuICAgICAgICAgICAgICAgIC5jb250cm9sbGVyKGNvbnRleHR1YWxNZW51XzEuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dE1lbnVDdHJsKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhhc0NoaWxkTWVudSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRleHRNZW51Q3RybCA9IGNvbnRleHRNZW51Q3RybDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9uUm9vdE1lbnVDbG9zZWQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VNb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbVxcXCJcXG4gICAgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkLCAnbXMtTmF2QmFyLWl0ZW0tLXJpZ2h0JzogcG9zaXRpb24gPT09ICdyaWdodCd9XFxcIj5cXG4gICAgICA8YSBjbGFzcz1cXFwibXMtTmF2QmFyLWxpbmtcXFwiIGhyZWY9XFxcIlxcXCI+PHNwYW4gY2xhc3M9J3VpZi1uYXYtaXRlbS1jb250ZW50Jz48L3NwYW4+PC9hPlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLm1lbnVdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0taGFzTWVudVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCI+XFxuICAgICAgPGEgY2xhc3M9XFxcIm1zLU5hdkJhci1saW5rXFxcIiBocmVmPVxcXCJcXFwiPjxzcGFuIGNsYXNzPSd1aWYtbmF2LWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICA8aSBjbGFzcz1cXFwibXMtTmF2QmFyLWNoZXZyb25Eb3duIG1zLUljb24gbXMtSWNvbi0tY2hldnJvbkRvd25cXFwiPjwvaT5cXG4gICAgICA8ZGl2IGNsYXNzPSd1aWYtc3VibWVudSc+PC9kaXY+XFxuICAgIDwvbGk+XCI7XG4gICAgfVxuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgTmF2QmFySXRlbURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCAmJiAhJHNjb3BlLnRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXIgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3lvdSBuZWVkIHRvIHByb3ZpZGUgYSB0ZXh0IGZvciBhIG5hdiBiYXIgbWVudSBpdGVtLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbmF2LWJhci1pdGVtPiB5b3UgbmVlZCB0byBzcGVjaWZ5IGVpdGhlciBcXCd1aWYtdGV4dFxcJyBhcyBhdHRyaWJ1dGUgb3IgPHVpZi1uYXYtaXRlbS1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0TGluayhjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRNZW51KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRMaW5rID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW0tY29udGVudCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoYW5ndWxhci5lbGVtZW50KCc8c3Bhbj4nICsgJHNjb3BlLnRleHQgKyAnPC9zcGFuPicpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0TWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXN1Ym1lbnUnKSkucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhckl0ZW0nO1xuICAgIHJldHVybiBOYXZCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFySXRlbURpcmVjdGl2ZSA9IE5hdkJhckl0ZW1EaXJlY3RpdmU7XG52YXIgTmF2QmFyU2VhcmNoQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyU2VhcmNoQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIE5hdkJhclNlYXJjaENvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlU2VhcmNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMuJHNjb3BlLnNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kYW5pbWF0ZS5yZW1vdmVDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKF90aGlzLiRlbGVtZW50LCAnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2hDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckZG9jdW1lbnQnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICByZXR1cm4gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLk5hdkJhclNlYXJjaENvbnRyb2xsZXIgPSBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xudmFyIE5hdkJhclNlYXJjaCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyU2VhcmNoKCRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyhcIl5cIiArIE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKSwgKFwiXCIgKyBOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSldO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25TZWFyY2hDYWxsYmFjazogJyY/dWlmT25TZWFyY2gnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAP3BsYWNlaG9sZGVyJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0tc2VhcmNoIG1zLXUtaGlkZGVuU21cXFwiIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1UZXh0RmllbGRcXFwiIG5nLWNsaWNrPVxcXCJza2lwT25DbGljaygkZXZlbnQpXFxcIj5cXG4gICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj17e3BsYWNlaG9sZGVyfX0gY2xhc3M9XFxcIm1zLVRleHRGaWVsZC1maWVsZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmcta2V5cHJlc3M9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiIG5nLW1vZGVsPVxcXCJzZWFyY2hUZXh0XFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHMsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGN0cmxzWzFdLmNsb3NlU2VhcmNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5za2lwT25DbGljayA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUNzc0NsYXNzZXMoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub25TZWFyY2ggPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY3RybHNbMF0uY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiAkZXZlbnQud2hpY2ggPT09IDEzICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwbHlDc3NDbGFzc2VzKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBOYXZCYXJTZWFyY2guZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXZCYXJTZWFyY2goJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGRvY3VtZW50JywgJyRhbmltYXRlJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2gucHJvdG90eXBlLmFwcGx5Q3NzQ2xhc3NlcyA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgICBpZiAoISRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGFuaW1hdGUuYWRkQ2xhc3MoJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVRleHRGaWVsZC1maWVsZCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgJGVsZW1lbnQucGFyZW50KCkuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZS5hZGRDbGFzcygkZWxlbWVudCwgJ2lzLXNlbGVjdGVkJyk7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSA9ICd1aWZOYXZCYXJTZWFyY2gnO1xuICAgIHJldHVybiBOYXZCYXJTZWFyY2g7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJTZWFyY2ggPSBOYXZCYXJTZWFyY2g7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBOYXZCYXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBOYXZCYXJJdGVtRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lLCBOYXZCYXJTZWFyY2guZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBvdmVybGF5TW9kZUVudW1fMSA9IHJlcXVpcmUoJy4vb3ZlcmxheU1vZGVFbnVtJyk7XG52YXIgT3ZlcmxheUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZXJsYXlDb250cm9sbGVyKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICB9XG4gICAgT3ZlcmxheUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBPdmVybGF5Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgT3ZlcmxheURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheURpcmVjdGl2ZShsb2cpIHtcbiAgICAgICAgdGhpcy5sb2cgPSBsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU92ZXJsYXlcIiBuZy1jbGFzcz1cIntcXCdtcy1PdmVybGF5LS1kYXJrXFwnOiB1aWZNb2RlID09IFxcJ2RhcmtcXCd9XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmTW9kZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIE92ZXJsYXlEaXJlY3RpdmUubG9nID0gbG9nO1xuICAgIH1cbiAgICBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAobG9nKSB7IHJldHVybiBuZXcgT3ZlcmxheURpcmVjdGl2ZShsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3ZlcmxheURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZk1vZGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAob3ZlcmxheU1vZGVFbnVtXzEuT3ZlcmxheU1vZGVbbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBPdmVybGF5RGlyZWN0aXZlLmxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3ZlcmxheSAtIFVuc3VwcG9ydGVkIG92ZXJsYXkgbW9kZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgb3ZlcmxheSBtb2RlIChcXCcnICsgc2NvcGUudWlmTW9kZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheU1vZGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBPdmVybGF5RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3ZlcmxheURpcmVjdGl2ZSA9IE92ZXJsYXlEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vdmVybGF5JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPdmVybGF5JywgT3ZlcmxheURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKE92ZXJsYXlNb2RlKSB7XG4gICAgT3ZlcmxheU1vZGVbT3ZlcmxheU1vZGVbXCJsaWdodFwiXSA9IDBdID0gXCJsaWdodFwiO1xuICAgIE92ZXJsYXlNb2RlW092ZXJsYXlNb2RlW1wiZGFya1wiXSA9IDFdID0gXCJkYXJrXCI7XG59KShleHBvcnRzLk92ZXJsYXlNb2RlIHx8IChleHBvcnRzLk92ZXJsYXlNb2RlID0ge30pKTtcbnZhciBPdmVybGF5TW9kZSA9IGV4cG9ydHMuT3ZlcmxheU1vZGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHBhbmVsRGlyZWN0aXZlRW51bV8xID0gcmVxdWlyZSgnLi9wYW5lbERpcmVjdGl2ZUVudW0nKTtcbnZhciBQYW5lbERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWxEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAgY2xhc3M9XFxcIm1zLU92ZXJsYXlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcImNsb3NlUGFuZWwoKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGFzcz1cXFwidWlmU2hvd092ZXJsYXkgPT09IHRydWUgPyAnbXMtT3ZlcmxheS0tZGFyaycgOiAnJztcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsLW1haW5cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGFuZWwtY29tbWFuZHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInVpZlNob3dDbG9zZVxcXCIgY2xhc3M9J21zLVBhbmVsLWNsb3NlQnV0dG9uJyBuZy1jbGljaz1cXFwiY2xvc2VQYW5lbCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9J3gnPjwvdWlmLWljb24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbC1jb250ZW50SW5uZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGFuZWxDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmSXNPcGVuOiAnPScsXG4gICAgICAgICAgICB1aWZTaG93Q2xvc2U6ICc9JyxcbiAgICAgICAgICAgIHVpZlNob3dPdmVybGF5OiAnPScsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGFuZWxEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBhbmVsRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgUGFuZWxEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSkuaGFzQ2xhc3MoJ21zLUNvbW1hbmRCYXInKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtY29tbWFuZHMnKSkucHJlcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3BlLnVpZlR5cGUgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtbWFpbicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignZGl2Lm1zLVBhbmVsLWNvbnRlbnRJbm5lcicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmNsb3NlUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS51aWZJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsRGlyZWN0aXZlID0gUGFuZWxEaXJlY3RpdmU7XG52YXIgUGFuZWxDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbENvbnRyb2xsZXIoJHNjb3BlLCAkYW5pbWF0ZSwgJGVsZW1lbnQsICRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnVpZlBhbmVsU2l6ZUNsYXNzZXMgPSAoX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMuc21hbGxdID0gJ21zLVBhbmVsLS1zbScsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLm1lZGl1bV0gPSAnbXMtUGFuZWwtLW1kJyxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMubGFyZ2VdID0gJ21zLVBhbmVsLS1sZycsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmV4dHJhbGFyZ2VdID0gJ21zLVBhbmVsLS14bCcsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmV4dHJhZXh0cmFsYXJnZV0gPSAnbXMtUGFuZWwtLXh4bCcsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmxlZnRdID0gJ21zLVBhbmVsLS1sZWZ0JyxcbiAgICAgICAgICAgIF9hXG4gICAgICAgICk7XG4gICAgICAgIGlmICghJHNjb3BlLnVpZlR5cGUpIHtcbiAgICAgICAgICAgICRzY29wZS51aWZUeXBlID0gJ21lZGl1bSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXNbJHNjb3BlLnVpZlR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGFuZWwgLSB1bnN1cHBvcnRlZCBwYW5lbCB0eXBlOlxcbicgK1xuICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgJHNjb3BlLnVpZlR5cGUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbmctT2ZmaWNlIFVJIEZhYnJpYyBhcyB2YWxpZCB0eXBlIGZvciBwYW5lbHMuJyArXG4gICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgUGFuZWxUeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsLnRzJyk7XG4gICAgICAgICAgICAkc2NvcGUudWlmVHlwZSA9ICdtZWRpdW0nO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaXplID0gcGFuZWxEaXJlY3RpdmVFbnVtXzEuUGFuZWxUeXBlc1skc2NvcGUudWlmVHlwZV07XG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKHRoaXMudWlmUGFuZWxTaXplQ2xhc3Nlc1tzaXplXSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3VpZklzT3BlbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Jvb2xlYW4nICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wYW5lbCAtIGludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1vcGVuXFwnLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgXFwnJyArIHR5cGVvZiBuZXdWYWx1ZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBhcyB2YWxpZCB0eXBlIGZvciBcXCd1aWYtaXMtb3BlblxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1wYW5lbC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuYWRkQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdtcy1QYW5lbC1hbmltYXRlSW4nKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhcicpKS5zY29wZSgpLiRicm9hZGNhc3QoJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYW5pbWF0ZS5hZGRDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ21zLVBhbmVsLWFuaW1hdGVPdXQnKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdtcy1QYW5lbC1hbmltYXRlSW4gbXMtUGFuZWwtYW5pbWF0ZU91dCcpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX2E7XG4gICAgfVxuICAgIFBhbmVsQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnLCAnJGxvZycsICckdGltZW91dCddO1xuICAgIHJldHVybiBQYW5lbENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5QYW5lbENvbnRyb2xsZXIgPSBQYW5lbENvbnRyb2xsZXI7XG52YXIgUGFuZWxIZWFkZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhbmVsSGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxwIGNsYXNzPVwibXMtUGFuZWwtaGVhZGVyVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkhlYWRlclRleHQ6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQYW5lbEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBhbmVsSGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGFuZWxIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QYW5lbEhlYWRlckRpcmVjdGl2ZSA9IFBhbmVsSGVhZGVyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGFuZWwnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBhbmVsJywgUGFuZWxEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBhbmVsSGVhZGVyJywgUGFuZWxIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBhbmVsVHlwZXMpIHtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJzbWFsbFwiXSA9IDBdID0gXCJzbWFsbFwiO1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcIm1lZGl1bVwiXSA9IDFdID0gXCJtZWRpdW1cIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJsYXJnZVwiXSA9IDJdID0gXCJsYXJnZVwiO1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcImV4dHJhbGFyZ2VcIl0gPSAzXSA9IFwiZXh0cmFsYXJnZVwiO1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcImV4dHJhZXh0cmFsYXJnZVwiXSA9IDRdID0gXCJleHRyYWV4dHJhbGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJsZWZ0XCJdID0gNV0gPSBcImxlZnRcIjtcbn0pKGV4cG9ydHMuUGFuZWxUeXBlcyB8fCAoZXhwb3J0cy5QYW5lbFR5cGVzID0ge30pKTtcbnZhciBQYW5lbFR5cGVzID0gZXhwb3J0cy5QYW5lbFR5cGVzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc2l6ZUVudW0nKTtcbnZhciBwbGFjZWhvbGRlckVudW1fMSA9IHJlcXVpcmUoJy4vcGxhY2Vob2xkZXJFbnVtJyk7XG52YXIgcGVyc29uYVN0eWxlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hU3R5bGVFbnVtJyk7XG52YXIgcGVyc29uYVByZXNlbmNlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtJyk7XG52YXIgUGVyc29uYUNhcmREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZlBlcnNvbmFDYXJkJ107XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlcnNvbmFDYXJkQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkXCIgbmctY2xhc3M9XCJnZXRQZXJzb25hQ2FyZENsYXNzZXMoKVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1wZXJzb25hXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIj4nICtcbiAgICAgICAgICAgICc8dWlmLWljb24gdWlmLXR5cGU9XCJwZXJzb25cIj48L3VpZi1pY29uPicgK1xuICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJtcy1QZXJzb25hLWltYWdlXCIgbmctc3JjPVwie3t1aWZJbWFnZVVybH19XCIgbmctaWY9XCJ1aWZJbWFnZVVybFwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByZXNlbmNlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzx1bCBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbnNcIj4nICtcbiAgICAgICAgICAgICc8bGkgbmctcmVwZWF0PVwiYWN0aW9uIGluIHBlcnNvbmFDYXJkQWN0aW9uc1wiIG5nLWNsYXNzPVwiZ2V0QWN0aW9uQ2xhc3NlcyhhY3Rpb24pXCIgbmctY2xpY2s9XCJzZWxlY3RBY3Rpb24oJGV2ZW50LCBhY3Rpb24pXCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPXt7YWN0aW9uLmljb259fSBuZy1pZj1cImFjdGlvbi5wbGFjZWhvbGRlciAhPSBcXCdvdmVyZmxvd1xcJ1wiPjwvdWlmLWljb24+JyArXG4gICAgICAgICAgICAnPC9saT4nICtcbiAgICAgICAgICAgICc8L3VsPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1hY3Rpb25EZXRhaWxCb3hcIj4nICtcbiAgICAgICAgICAgICc8dWwgbmctY2xhc3M9XCJkZXRhaWxDbGFzc1wiPjwvdWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ2FyZENvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgICAgIHZhciBpY29uID0gZWxlbWVudC5maW5kKCd1aWYtaWNvbicpO1xuICAgICAgICAgICAgaWNvbi5hZGRDbGFzcygnbXMtUGVyc29uYS1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlNpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSB4c21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4bGFyZ2UuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTdHlsZSkgJiYgbmcuaXNVbmRlZmluZWQocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlN0eWxlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTdHlsZS4gSXQgc2hvdWxkIGJlIHJvdW5kIG9yIHNxdWFyZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmcuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBuZy5pc1VuZGVmaW5lZChwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEFjdGlvbkNsYXNzZXMgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bYWN0aW9uLnBsYWNlaG9sZGVyXTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnRvcHJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnbXMtUGVyc29uYUNhcmQtb3JnQ2hhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5yZWd1bGFyOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbkNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0gPT09IHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGw6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS14cycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5zbWFsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNtJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tbGcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUueGxhcmdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0teGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWF2YWlsYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hd2F5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYXdheScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5ibG9ja2VkOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYmxvY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5idXN5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYnVzeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5kbmQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1kbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tb2ZmbGluZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hQ2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUuZ2V0UGVyc29uYUNhcmRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0gPT09IHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZSA/ICdtcy1QZXJzb25hQ2FyZC0tc3F1YXJlJyA6ICcnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRldGFpbHNXcmFwcGVyID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uRGV0YWlsc0JveExpc3QgPSBuZy5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsQm94JykpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCd1bCcpLmVxKDApO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zTGlzdCA9IG5nLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb25zJykpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBjbG9uZVtpXS50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtUFJJTUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtU0VDT05EQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1URVJUSUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtT1BUSU9OQUwtVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1dyYXBwZXIuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtQUNUSU9OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZEFjdGlvbiA9IG5nLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHdyYXBwZWRBY3Rpb24uYXR0cigndWlmLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlcl0gPT09IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5vdmVyZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTGlzdC5hcHBlbmQod3JhcHBlZEFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25EZXRhaWxzQm94TGlzdC5hcHBlbmQoX3RoaXMucHJvY2Vzc0FjdGlvbih3cmFwcGVkQWN0aW9uLCBzY29wZSwgcGVyc29uYUNhcmRDb250cm9sbGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5wcm90b3R5cGUucHJvY2Vzc0FjdGlvbiA9IGZ1bmN0aW9uIChjbG9uZSwgc2NvcGUsIHBlcnNvbmFDYXJkQ29udHJvbGxlcikge1xuICAgICAgICB2YXIgY2xhc3NUb0FkZCA9ICcnO1xuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjbG9uZS5hdHRyKCd1aWYtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgdmFyIGljb24gPSBjbG9uZS5hdHRyKCd1aWYtaWNvbicpO1xuICAgICAgICB2YXIgYWN0aW9uVG9BZGQgPSBuZXcgUGVyc29uYUNhcmRBY3Rpb24oaWNvbiwgcGxhY2Vob2xkZXIpO1xuICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ucmVndWxhcl06XG4gICAgICAgICAgICAgICAgY2xhc3NUb0FkZCA9ICdkZXRhaWwtJyArICgrK3Njb3BlLnJlZ3VsYXJBY3Rpb25zQ291bnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnRvcHJpZ2h0XTpcbiAgICAgICAgICAgICAgICBjbGFzc1RvQWRkID0gJ2RldGFpbC01JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2xvbmUuZmluZCgnbGknKS5lcSgwKS5hZGRDbGFzcyhjbGFzc1RvQWRkKTtcbiAgICAgICAgYWN0aW9uVG9BZGQuZGV0YWlsQ2xhc3MgPSBjbGFzc1RvQWRkO1xuICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuYWRkQWN0aW9uKGFjdGlvblRvQWRkKTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGlyZWN0aXZlID0gUGVyc29uYUNhcmREaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZENvbnRyb2xsZXIoJGxvZywgJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLmRldGFpbENzcyA9IHtcbiAgICAgICAgICAgIDE6ICdDaGF0JyxcbiAgICAgICAgICAgIDI6ICdQaG9uZScsXG4gICAgICAgICAgICAzOiAnVmlkZW8nLFxuICAgICAgICAgICAgNDogJ01haWwnLFxuICAgICAgICAgICAgNTogJ09yZydcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAkc2NvcGUucmVndWxhckFjdGlvbnNDb3VudCA9IDA7XG4gICAgICAgICRzY29wZS5kZXRhaWxDbGFzcyA9ICdtcy1QZXJzb25hQ2FyZC1kZXRhaWxDaGF0JztcbiAgICAgICAgJHNjb3BlLnNlbGVjdEFjdGlvbiA9IGZ1bmN0aW9uICgkZXZlbnQsIGFjdGlvbikge1xuICAgICAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFjdGlvbi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgZGV0YWlsTnVtYmVyID0gKyhhY3Rpb24uZGV0YWlsQ2xhc3MuY2hhckF0KGFjdGlvbi5kZXRhaWxDbGFzcy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAkc2NvcGUuZGV0YWlsQ2xhc3MgPSAnbXMtUGVyc29uYUNhcmQtZGV0YWlsJyArIF90aGlzLmRldGFpbENzc1tkZXRhaWxOdW1iZXJdO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZENvbnRyb2xsZXIucHJvdG90eXBlLmFkZEFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb25Ub0FkZCkge1xuICAgICAgICBpZiAodGhpcy4kc2NvcGUucGVyc29uYUNhcmRBY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWN0aW9uVG9BZGQuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5wdXNoKGFjdGlvblRvQWRkKTtcbiAgICB9O1xuICAgIFBlcnNvbmFDYXJkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJyRzY29wZSddO1xuICAgIHJldHVybiBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZENvbnRyb2xsZXIgPSBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG52YXIgUGVyc29uYUNhcmRBY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkQWN0aW9uKGljb24sIHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkQWN0aW9uO1xufSgpKTtcbnZhciBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZShkaXJlY3RpdmVUeXBlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9IGRpcmVjdGl2ZVR5cGU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ2xhc3NlcyA9IHtcbiAgICAgICAgICAgICdwcmltYXJ5JzogJ21zLVBlcnNvbmEtcHJpbWFyeVRleHQnLFxuICAgICAgICAgICAgJ3NlY29uZGFyeSc6ICdtcy1QZXJzb25hLXNlY29uZGFyeVRleHQnLFxuICAgICAgICAgICAgJ3RlcnRpYXJ5JzogJ21zLVBlcnNvbmEtdGVydGlhcnlUZXh0JyxcbiAgICAgICAgICAgICdvcHRpb25hbCc6ICdtcy1QZXJzb25hLW9wdGlvbmFsVGV4dCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aXZlVGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIicgKyBfdGhpcy5hdmFpbGFibGVDbGFzc2VzW190aGlzLmRpcmVjdGl2ZVR5cGVdICsgJ1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmVUZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHRoaXMuYXZhaWxhYmxlQ2xhc3Nlc1t0aGlzLmRpcmVjdGl2ZVR5cGVdKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gJ29wdGlvbmFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlKHR5cGUpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmUGVyc29uYUNhcmQnO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VFbGVtZW50LCBhY3Rpb25BdHRycykge1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcikgJiYgbmcuaXNVbmRlZmluZWQocGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW2FjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyXSkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXIgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlBsYWNlaG9sZGVyLiBJdCBzaG91bGQgYmUgcmVndWxhciwgdG9wcmlnaHQgb3Igb3ZlcmZsb3cuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcl0gPT09IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5vdmVyZmxvdykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPGxpIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtb3ZlcmZsb3dcIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnPGxpIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsc1wiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWRldGFpbExhYmVsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERldGFpbExpbmVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtZGV0YWlsTGluZVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZCcsIFBlcnNvbmFDYXJkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZEFjdGlvbicsIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZERldGFpbExhYmVsJywgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmREZXRhaWxMaW5lJywgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFByaW1hcnlUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3ByaW1hcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFNlY29uZGFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRUZXJ0aWFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZE9wdGlvbmFsVGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCcnKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hU2l6ZSkge1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieHNtYWxsXCJdID0gMF0gPSBcInhzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wic21hbGxcIl0gPSAxXSA9IFwic21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcIm1lZGl1bVwiXSA9IDJdID0gXCJtZWRpdW1cIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcImxhcmdlXCJdID0gM10gPSBcImxhcmdlXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4bGFyZ2VcIl0gPSA0XSA9IFwieGxhcmdlXCI7XG59KShleHBvcnRzLlBlcnNvbmFTaXplIHx8IChleHBvcnRzLlBlcnNvbmFTaXplID0ge30pKTtcbnZhciBQZXJzb25hU2l6ZSA9IGV4cG9ydHMuUGVyc29uYVNpemU7XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvc2l6ZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQbGFjZWhvbGRlckVudW0pIHtcbiAgICBQbGFjZWhvbGRlckVudW1bUGxhY2Vob2xkZXJFbnVtW1wicmVndWxhclwiXSA9IDBdID0gXCJyZWd1bGFyXCI7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcInRvcHJpZ2h0XCJdID0gMV0gPSBcInRvcHJpZ2h0XCI7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcIm92ZXJmbG93XCJdID0gMl0gPSBcIm92ZXJmbG93XCI7XG59KShleHBvcnRzLlBsYWNlaG9sZGVyRW51bSB8fCAoZXhwb3J0cy5QbGFjZWhvbGRlckVudW0gPSB7fSkpO1xudmFyIFBsYWNlaG9sZGVyRW51bSA9IGV4cG9ydHMuUGxhY2Vob2xkZXJFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BsYWNlaG9sZGVyRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFTdHlsZUVudW0pIHtcbiAgICBQZXJzb25hU3R5bGVFbnVtW1BlcnNvbmFTdHlsZUVudW1bXCJyb3VuZFwiXSA9IDBdID0gXCJyb3VuZFwiO1xuICAgIFBlcnNvbmFTdHlsZUVudW1bUGVyc29uYVN0eWxlRW51bVtcInNxdWFyZVwiXSA9IDFdID0gXCJzcXVhcmVcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bSB8fCAoZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtID0ge30pKTtcbnZhciBQZXJzb25hU3R5bGVFbnVtID0gZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb3JlL3BlcnNvbmFTdHlsZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQcmVzZW5jZUVudW0pIHtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYXZhaWxhYmxlXCJdID0gMF0gPSBcImF2YWlsYWJsZVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJhd2F5XCJdID0gMV0gPSBcImF3YXlcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYmxvY2tlZFwiXSA9IDJdID0gXCJibG9ja2VkXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImJ1c3lcIl0gPSAzXSA9IFwiYnVzeVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJkbmRcIl0gPSA0XSA9IFwiZG5kXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcIm9mZmxpbmVcIl0gPSA1XSA9IFwib2ZmbGluZVwiO1xufSkoZXhwb3J0cy5QcmVzZW5jZUVudW0gfHwgKGV4cG9ydHMuUHJlc2VuY2VFbnVtID0ge30pKTtcbnZhciBQcmVzZW5jZUVudW0gPSBleHBvcnRzLlByZXNlbmNlRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW0nKTtcbnZhciBwZXJzb25hUHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFQcmVzZW5jZUVudW0nKTtcbnZhciBwZXJzb25hSW5pdGlhbHNDb2xvckVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtJyk7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc2l6ZUVudW0nKTtcbnZhciBQZXJzb25hVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYVRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAncHJpbWFyeSc6ICdtcy1QZXJzb25hLXByaW1hcnlUZXh0JyxcbiAgICAgICAgICAgICdzZWNvbmRhcnknOiAnbXMtUGVyc29uYS1zZWNvbmRhcnlUZXh0JyxcbiAgICAgICAgICAgICd0ZXJ0aWFyeSc6ICdtcy1QZXJzb25hLXRlcnRpYXJ5VGV4dCcsXG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLmF2YWlsYWJsZUNsYXNzZXNbdGhpcy5kaXJlY3RpdmVUeXBlXSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9ICdvcHRpb25hbCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYVRleHREaXJlY3RpdmUodHlwZSk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFUZXh0RGlyZWN0aXZlO1xudmFyIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWydedWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ3VpZkNvbG9yJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtaW5pdGlhbHMgbXMtUGVyc29uYS1pbml0aWFscy0te3t1aWZDb2xvcn19XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4gJztcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNvbG9yKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZkNvbG9yID0gcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3JbcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3IuYmx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZkNvbG9yJywgZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW25ld0NvbG9yXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYSAtIFwiJyArIG5ld0NvbG9yICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZDb2xvci4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgSXQgc2hvdWxkIGJlIGxpZ2h0Qmx1ZSwgYmx1ZSwgZGFya0JsdWUsIHRlYWwsIGxpZ2h0R3JlZW4sIGdyZWVuLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBkYXJrR3JlZW4sIGxpZ2h0UGluaywgcGluaywgbWFnZW50YSwgcHVycGxlLCBibGFjaywgb3JhbmdlLCByZWQgb3IgZGFya1JlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlID0gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIiBuZy1zaG93PVwiZ2V0SW1hZ2VBcmVhVmlzaWJpbGl0eSgpXCI+JyArXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VcIiBuZy1zcmM9XCJ7e3VpZkltYWdlVXJsfX1cIiBuZy1pZj1cInVpZkltYWdlVXJsXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy51aWZTaXplQ2xhc3NlcyA9IChfYSA9IHt9LFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS50aW55XSA9ICdtcy1QZXJzb25hLS10aW55JyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSA9ICdtcy1QZXJzb25hLS14cycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSA9ICdtcy1QZXJzb25hLS1zbScsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlXSA9ICdtcy1QZXJzb25hLS1sZycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhsYXJnZV0gPSAnbXMtUGVyc29uYS0teGwnLFxuICAgICAgICAgICAgX2FcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy51aWZQcmVzZW5jZUNsYXNzZXMgPSAoX2IgPSB7fSxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXZhaWxhYmxlXSA9ICdtcy1QZXJzb25hLS1hdmFpbGFibGUnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hd2F5XSA9ICdtcy1QZXJzb25hLS1hd2F5JyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYmxvY2tlZF0gPSAnbXMtUGVyc29uYS0tYmxvY2tlZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJ1c3ldID0gJ21zLVBlcnNvbmEtLWJ1c3knLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5kbmRdID0gJ21zLVBlcnNvbmEtLWRuZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmVdID0gJ21zLVBlcnNvbmEtLW9mZmxpbmUnLFxuICAgICAgICAgICAgX2JcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTaXplICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTaXplLiBJdCBzaG91bGQgYmUgdGlueSwgeHNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeGxhcmdlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU3R5bGUpICYmIG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU3R5bGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlN0eWxlLiBJdCBzaG91bGQgYmUgcm91bmQgb3Igc3F1YXJlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpICYmIG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEltYWdlQXJlYVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdICE9PSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnRpbnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlc2VuY2UgPSBuZy5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpID8gcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0gOiBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmU7XG4gICAgICAgICAgICAgICAgaWYgKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2l6ZUNsYXNzID0gX3RoaXMudWlmU2l6ZUNsYXNzZXNbc2l6ZV07XG4gICAgICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChzaXplQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goc2l6ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaChfdGhpcy51aWZQcmVzZW5jZUNsYXNzZXNbcHJlc2VuY2VdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYUNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRldGFpbHNXcmFwcGVyID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VBcmVhID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtaW1hZ2VBcmVhJykpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBjbG9uZVtpXS50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVBSSU1BUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1TRUNPTkRBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1URVJUSUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLU9QVElPTkFMLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNXcmFwcGVyLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1JTklUSUFMUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VBcmVhLnByZXBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgIH1cbiAgICBQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hRGlyZWN0aXZlID0gUGVyc29uYURpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBQZXJzb25hQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIFBlcnNvbmFDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hJywgUGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUluaXRpYWxzJywgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hUHJpbWFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdwcmltYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVNlY29uZGFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdzZWNvbmRhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hVGVydGlhcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hT3B0aW9uYWxUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgnJykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFJbml0aWFsc0NvbG9yKSB7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodEJsdWVcIl0gPSAwXSA9IFwibGlnaHRCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJibHVlXCJdID0gMV0gPSBcImJsdWVcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtCbHVlXCJdID0gMl0gPSBcImRhcmtCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJ0ZWFsXCJdID0gM10gPSBcInRlYWxcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0R3JlZW5cIl0gPSA0XSA9IFwibGlnaHRHcmVlblwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiZ3JlZW5cIl0gPSA1XSA9IFwiZ3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtHcmVlblwiXSA9IDZdID0gXCJkYXJrR3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0UGlua1wiXSA9IDddID0gXCJsaWdodFBpbmtcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcInBpbmtcIl0gPSA4XSA9IFwicGlua1wiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wibWFnZW50YVwiXSA9IDldID0gXCJtYWdlbnRhXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJwdXJwbGVcIl0gPSAxMF0gPSBcInB1cnBsZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiYmxhY2tcIl0gPSAxMV0gPSBcImJsYWNrXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJvcmFuZ2VcIl0gPSAxMl0gPSBcIm9yYW5nZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wicmVkXCJdID0gMTNdID0gXCJyZWRcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtSZWRcIl0gPSAxNF0gPSBcImRhcmtSZWRcIjtcbn0pKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgfHwgKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgPSB7fSkpO1xudmFyIFBlcnNvbmFJbml0aWFsc0NvbG9yID0gZXhwb3J0cy5QZXJzb25hSW5pdGlhbHNDb2xvcjtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hU2l6ZSkge1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1widGlueVwiXSA9IDBdID0gXCJ0aW55XCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4c21hbGxcIl0gPSAxXSA9IFwieHNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJzbWFsbFwiXSA9IDJdID0gXCJzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibWVkaXVtXCJdID0gM10gPSBcIm1lZGl1bVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibGFyZ2VcIl0gPSA0XSA9IFwibGFyZ2VcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhsYXJnZVwiXSA9IDVdID0gXCJ4bGFyZ2VcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVNpemUgfHwgKGV4cG9ydHMuUGVyc29uYVNpemUgPSB7fSkpO1xudmFyIFBlcnNvbmFTaXplID0gZXhwb3J0cy5QZXJzb25hU2l6ZTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3NpemVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwaXZvdFNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3Bpdm90U2l6ZUVudW0nKTtcbnZhciBwaXZvdFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL3Bpdm90VHlwZUVudW0nKTtcbnZhciBQaXZvdENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBpdm90Q29udHJvbGxlcigkbG9nLCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgICRzY29wZS5waXZvdENsaWNrID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmUGl2b3RzLmZvckVhY2goZnVuY3Rpb24gKHBpdm90SXRlbSwgcGl2b3RJbmRleCkge1xuICAgICAgICAgICAgICAgIHBpdm90SXRlbS5zZWxlY3RlZCA9IHBpdm90SW5kZXggPT09IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChwaXZvdEl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVpZlNlbGVjdGVkID0gcGl2b3RJdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQaXZvdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICckc2NvcGUnXTtcbiAgICByZXR1cm4gUGl2b3RDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGl2b3RDb250cm9sbGVyID0gUGl2b3RDb250cm9sbGVyO1xudmFyIFBpdm90SXRlbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGl2b3RJdGVtKHRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB9XG4gICAgcmV0dXJuIFBpdm90SXRlbTtcbn0oKSk7XG5leHBvcnRzLlBpdm90SXRlbSA9IFBpdm90SXRlbTtcbnZhciBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1QaXZvdC1saW5rIG1zLVBpdm90LWxpbmstLW92ZXJmbG93XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPVwiZWxsaXBzaXNcIiBjbGFzcz1cIm1zLVBpdm90LWVsbGlwc2lzXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC9saT4nO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgfVxuICAgIFBpdm90RWxsaXBzaXNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBpdm90RWxsaXBzaXNEaXJlY3RpdmUgPSBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlO1xudmFyIFBpdm90RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBpdm90Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZQaXZvdCddO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx1bCBjbGFzcz1cIm1zLVBpdm90XCIgbmctY2xhc3M9XCJnZXRDbGFzc2VzKClcIiA+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0LXN0YXJ0PVwicGl2b3QgaW4gdWlmUGl2b3RzXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm1zLVBpdm90LWxpbmtcIiBuZy1jbGljaz1cInBpdm90Q2xpY2soJGluZGV4KVwiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ2lzLXNlbGVjdGVkXFwnOiBwaXZvdC5zZWxlY3RlZH1cIj57e3Bpdm90LnRpdGxlfX08L2xpPiAnICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1yZXBlYXQtZW5kPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC91bD4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmUGl2b3RzOiAnPT8nLFxuICAgICAgICAgICAgdWlmU2VsZWN0ZWQ6ICc9PycsXG4gICAgICAgICAgICB1aWZTaXplOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGl2b3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGl2b3REaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGludGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHBpdm90Q29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlNpemUnLCBmdW5jdGlvbiAobmV3U2l6ZSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChuZXdTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChwaXZvdFNpemVFbnVtXzEuUGl2b3RTaXplW25ld1NpemVdKSkge1xuICAgICAgICAgICAgICAgIHBpdm90Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5waXZvdCAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgbmV3U2l6ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU2l6ZS4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIgb3IgbGFyZ2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VHlwZSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChuZXdUeXBlKSAmJiBuZy5pc1VuZGVmaW5lZChwaXZvdFR5cGVFbnVtXzEuUGl2b3RUeXBlW25ld1R5cGVdKSkge1xuICAgICAgICAgICAgICAgIHBpdm90Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5waXZvdCAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgbmV3VHlwZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmVHlwZS4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIgb3IgdGFicy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmU2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmcuaXNEZWZpbmVkKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlBpdm90cy5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyZW50UGl2b3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBpdm90LnNlbGVjdGVkID0gY3VycmVudFBpdm90LnRpdGxlID09PSBuZXdWYWx1ZS50aXRsZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRQaXZvdHMgPSBzY29wZS51aWZQaXZvdHMuZmlsdGVyKGZ1bmN0aW9uIChjdXJyZW50UGl2b3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQaXZvdC5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRQaXZvdHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlbGVjdGVkUGl2b3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFBpdm90c1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuZ2V0Q2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gJyc7XG4gICAgICAgICAgICBjbGFzc2VzICs9IHBpdm90VHlwZUVudW1fMS5QaXZvdFR5cGVbc2NvcGUudWlmVHlwZV0gPT09IHBpdm90VHlwZUVudW1fMS5QaXZvdFR5cGUudGFicyA/ICdtcy1QaXZvdC0tdGFicycgOiAnJztcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gcGl2b3RTaXplRW51bV8xLlBpdm90U2l6ZVtzY29wZS51aWZTaXplXSA9PT0gcGl2b3RTaXplRW51bV8xLlBpdm90U2l6ZS5sYXJnZSA/ICcgbXMtUGl2b3QtLWxhcmdlJyA6ICcnO1xuICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gUGl2b3REaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QaXZvdERpcmVjdGl2ZSA9IFBpdm90RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGl2b3QnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdCcsIFBpdm90RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdEVsbGlwc2lzJywgUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUGl2b3RTaXplKSB7XG4gICAgUGl2b3RTaXplW1Bpdm90U2l6ZVsncmVndWxhciddID0gMF0gPSAncmVndWxhcic7XG4gICAgUGl2b3RTaXplW1Bpdm90U2l6ZVsnbGFyZ2UnXSA9IDFdID0gJ2xhcmdlJztcbn0pKGV4cG9ydHMuUGl2b3RTaXplIHx8IChleHBvcnRzLlBpdm90U2l6ZSA9IHt9KSk7XG52YXIgUGl2b3RTaXplID0gZXhwb3J0cy5QaXZvdFNpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGl2b3QvcGl2b3RTaXplRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBpdm90VHlwZSkge1xuICAgIFBpdm90VHlwZVtQaXZvdFR5cGVbXCJyZWd1bGFyXCJdID0gMF0gPSBcInJlZ3VsYXJcIjtcbiAgICBQaXZvdFR5cGVbUGl2b3RUeXBlW1widGFic1wiXSA9IDFdID0gXCJ0YWJzXCI7XG59KShleHBvcnRzLlBpdm90VHlwZSB8fCAoZXhwb3J0cy5QaXZvdFR5cGUgPSB7fSkpO1xudmFyIFBpdm90VHlwZSA9IGV4cG9ydHMuUGl2b3RUeXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90VHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZShsb2cpIHtcbiAgICAgICAgdGhpcy5sb2cgPSBsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLWl0ZW1OYW1lXCI+e3t1aWZOYW1lfX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbVByb2dyZXNzXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLXByb2dyZXNzVHJhY2tcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItcHJvZ3Jlc3NCYXJcIiBuZy1zdHlsZT1cInt3aWR0aDogdWlmUGVyY2VudENvbXBsZXRlK1xcJyVcXCd9XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLWl0ZW1EZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZEZXNjcmlwdGlvbjogJ0AnLFxuICAgICAgICAgICAgdWlmTmFtZTogJ0AnLFxuICAgICAgICAgICAgdWlmUGVyY2VudENvbXBsZXRlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUubG9nID0gbG9nO1xuICAgIH1cbiAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKGxvZykgeyByZXR1cm4gbmV3IFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlKGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlBlcmNlbnRDb21wbGV0ZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSBudWxsIHx8IG5ld1ZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlBlcmNlbnRDb21wbGV0ZSA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1BlcmNlbnRDb21wbGV0ZSA9IHBhcnNlRmxvYXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG5ld1BlcmNlbnRDb21wbGV0ZSkgfHwgbmV3UGVyY2VudENvbXBsZXRlIDwgMCB8fCBuZXdQZXJjZW50Q29tcGxldGUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5sb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnByb2dyZXNzaW5kaWNhdG9yIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdQZXJjZW50IGNvbXBsZXRlIG11c3QgYmUgYSB2YWxpZCBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMDAuJyk7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGVyY2VudENvbXBsZXRlID0gTWF0aC5tYXgoTWF0aC5taW4obmV3UGVyY2VudENvbXBsZXRlLCAxMDApLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUgPSBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnByb2dyZXNzaW5kaWNhdG9yJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQcm9ncmVzc0luZGljYXRvcicsIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIFNlYXJjaEJveERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VhcmNoQm94RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1TZWFyY2hCb3hcIiBuZy1jbGFzcz1cIntcXCdpcy1hY3RpdmVcXCc6aXNBY3RpdmUsIFxcJ2lzLWRpc2FibGVkXFwnOmlzRGlzYWJsZWR9XCI+JyArXG4gICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwibXMtU2VhcmNoQm94LWZpZWxkXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1ibHVyPVwiaW5wdXRCbHVyKClcIicgK1xuICAgICAgICAgICAgJyBuZy1tb2RlbD1cInZhbHVlXCIgaWQ9XCJ7ezo6XFwnc2VhcmNoQm94X1xcJyskaWR9fVwiIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwibXMtU2VhcmNoQm94LWxhYmVsXCIgZm9yPVwie3s6OlxcJ3NlYXJjaEJveF9cXCcrJGlkfX1cIiBuZy1oaWRlPVwiaXNMYWJlbEhpZGRlblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtU2VhcmNoQm94LWljb24gbXMtSWNvbiBtcy1JY29uLS1zZWFyY2hcIiA+PC9pPiB7e3BsYWNlaG9sZGVyfX08L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJtcy1TZWFyY2hCb3gtY2xvc2VCdXR0b25cIiBuZy1tb3VzZWRvd249XCJidG5Nb3VzZWRvd24oKVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICc9PycsXG4gICAgICAgICAgICB2YWx1ZTogJz0/J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTZWFyY2hCb3hEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWFyY2hCb3hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNlYXJjaEJveERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuaXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pc0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlucHV0Rm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5pc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5pbnB1dEJsdXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuaXNDYW5jZWwpIHtcbiAgICAgICAgICAgICAgICBzY29wZS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChzY29wZS52YWx1ZSkgPT09ICd1bmRlZmluZWQnIHx8IHNjb3BlLnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzRm9jdXMgPSBzY29wZS5pc0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5idG5Nb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5pc0NhbmNlbCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndmFsdWUnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAoIXNjb3BlLmlzRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHZhbCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdwbGFjZWhvbGRlcicsIGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICAgICAgICAgIHNjb3BlLnBsYWNlaG9sZGVyID0gc2VhcmNoO1xuICAgICAgICB9KTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBzY29wZS5pc0Rpc2FibGVkID0gISFkaXNhYmxlZDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2VhcmNoQm94RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU2VhcmNoQm94RGlyZWN0aXZlID0gU2VhcmNoQm94RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc2VhcmNoYm94JywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmU2VhcmNoYm94JywgU2VhcmNoQm94RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgc3Bpbm5lclNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3NwaW5uZXJTaXplRW51bScpO1xudmFyIFNwaW5uZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwaW5uZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBTcGlubmVyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICduZ1Nob3cnOiAnPScsXG4gICAgICAgICAgICAndWlmU2l6ZSc6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3Bpbm5lckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU3Bpbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lciAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3Bpbm5lciBzaXplIChcXCcnICsgYXR0cnMudWlmU2l6ZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemVbYXR0cnMudWlmU2l6ZV0gPT09IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplLmxhcmdlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFkZENsYXNzKCdtcy1TcGlubmVyLS1sYXJnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uZ1Nob3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1Nob3cnLCBmdW5jdGlvbiAobmV3VmlzaWJsZSwgb2xkVmlzaWJsZSwgc3Bpbm5lclNjb3BlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyU2NvcGUuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NvcGUuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIGlmIChjbG9uZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLVNwaW5uZXItbGFiZWwnKS5hcHBlbmQoY2xvbmUpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5pbml0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gU3Bpbm5lckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlNwaW5uZXJEaXJlY3RpdmUgPSBTcGlubmVyRGlyZWN0aXZlO1xudmFyIFNwaW5uZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGlubmVyQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkaW50ZXJ2YWwsICRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kaW50ZXJ2YWwgPSAkaW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuX29mZnNldFNpemUgPSAwLjE3OTtcbiAgICAgICAgdGhpcy5fbnVtQ2lyY2xlcyA9IDg7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblNwZWVkID0gOTA7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMgPSBbXTtcbiAgICAgICAgJHNjb3BlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fcGFyZW50U2l6ZSA9IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW190aGlzLiRzY29wZS51aWZTaXplXSA9PT0gc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemUubGFyZ2UgPyAyOCA6IDIwO1xuICAgICAgICAgICAgX3RoaXMuY3JlYXRlQ2lyY2xlc0FuZEFycmFuZ2UoKTtcbiAgICAgICAgICAgIF90aGlzLnNldEluaXRpYWxPcGFjaXR5KCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9hbmltYXRpb25JbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBfdGhpcy5fY2lyY2xlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWRlQ2lyY2xlKF90aGlzLl9jaXJjbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBfdGhpcy5fYW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoX3RoaXMuX2FuaW1hdGlvbkludGVydmFsKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZXNBbmRBcnJhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5nbGUgPSAwO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fcGFyZW50U2l6ZSAqIHRoaXMuX29mZnNldFNpemU7XG4gICAgICAgIHZhciBzdGVwID0gKDIgKiBNYXRoLlBJKSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHZhciBpID0gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdmFyIHJhZGl1cyA9ICh0aGlzLl9wYXJlbnRTaXplIC0gb2Zmc2V0KSAqIDAuNTtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IHRoaXMuY3JlYXRlQ2lyY2xlKCk7XG4gICAgICAgICAgICB2YXIgeCA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRXaWR0aCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRIZWlnaHQgKiAwLjUpIC0gb2Zmc2V0ICogMC41O1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY2lyY2xlKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ2xlZnQnLCAoeCArICdweCcpKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ3RvcCcsICh5ICsgJ3B4JykpO1xuICAgICAgICAgICAgYW5nbGUgKz0gc3RlcDtcbiAgICAgICAgICAgIHZhciBjaXJjbGVPYmplY3QgPSBuZXcgQ2lyY2xlT2JqZWN0KGNpcmNsZSwgaSk7XG4gICAgICAgICAgICB0aGlzLl9jaXJjbGVzLnB1c2goY2lyY2xlT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNpcmNsZSA9IG5nLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBkb3RTaXplID0gKHRoaXMuX3BhcmVudFNpemUgKiB0aGlzLl9vZmZzZXRTaXplKSArICdweCc7XG4gICAgICAgIGNpcmNsZS5hZGRDbGFzcygnbXMtU3Bpbm5lci1jaXJjbGUnKS5jc3MoJ3dpZHRoJywgZG90U2l6ZSkuY3NzKCdoZWlnaHQnLCBkb3RTaXplKTtcbiAgICAgICAgcmV0dXJuIGNpcmNsZTtcbiAgICB9O1xuICAgIDtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0SW5pdGlhbE9wYWNpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIHRoaXMuX2ZhZGVJbmNyZW1lbnQgPSAxIC8gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdGhpcy5fY2lyY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUsIGluZGV4KSB7XG4gICAgICAgICAgICBvcGNhaXR5VG9TZXQgPSAoX3RoaXMuX2ZhZGVJbmNyZW1lbnQgKiAoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG9wY2FpdHlUb1NldDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuZmFkZUNpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdmFyIG5ld09wYWNpdHkgPSBjaXJjbGUub3BhY2l0eSAtIHRoaXMuX2ZhZGVJbmNyZW1lbnQ7XG4gICAgICAgIGlmIChuZXdPcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICAgIG5ld09wYWNpdHkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNpcmNsZS5vcGFjaXR5ID0gbmV3T3BhY2l0eTtcbiAgICB9O1xuICAgIFNwaW5uZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckaW50ZXJ2YWwnLCAnJGxvZyddO1xuICAgIHJldHVybiBTcGlubmVyQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgQ2lyY2xlT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaXJjbGVPYmplY3QoY2lyY2xlRWxlbWVudCwgY2lyY2xlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50ID0gY2lyY2xlRWxlbWVudDtcbiAgICAgICAgdGhpcy5jaXJjbGVJbmRleCA9IGNpcmNsZUluZGV4O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2lyY2xlT2JqZWN0LnByb3RvdHlwZSwgXCJvcGFjaXR5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKyh0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5JykpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBDaXJjbGVPYmplY3Q7XG59KCkpO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lcicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNwaW5uZXInLCBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoU3Bpbm5lclNpemUpIHtcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVsnc21hbGwnXSA9IDBdID0gJ3NtYWxsJztcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVsnbGFyZ2UnXSA9IDFdID0gJ2xhcmdlJztcbn0pKGV4cG9ydHMuU3Bpbm5lclNpemUgfHwgKGV4cG9ydHMuU3Bpbm5lclNpemUgPSB7fSkpO1xudmFyIFNwaW5uZXJTaXplID0gZXhwb3J0cy5TcGlubmVyU2l6ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJTaXplRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZSgnLi90YWJsZVJvd1NlbGVjdE1vZGVFbnVtJyk7XG52YXIgdGFibGVUeXBlRW51bV8xID0gcmVxdWlyZSgnLi90YWJsZVR5cGVFbnVtJyk7XG52YXIgVGFibGVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5vcmRlckJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gW107XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcIm9yZGVyQnlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckJ5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckFzY1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm9yZGVyQXNjO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcmRlckFzYykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSBvcmRlckFzYztcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwicm93U2VsZWN0TW9kZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnJvd1NlbGVjdE1vZGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHJvd1NlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVtyb3dTZWxlY3RNb2RlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgcm93U2VsZWN0TW9kZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtcm93LXNlbGVjdC1tb2RlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIG5vbmV8c2luZ2xlfG11bHRpcGxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucm93U2VsZWN0TW9kZSA9IHJvd1NlbGVjdE1vZGU7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInJvd3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5yb3dzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb3dzKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gcm93cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm93c1tpXS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2godGhpcy5yb3dzW2ldLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRhYmxlIG5nLWNsYXNzPVwiW1xcJ21zLVRhYmxlXFwnLCB0YWJsZVR5cGVDbGFzc11cIiBuZy10cmFuc2NsdWRlPjwvdGFibGU+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd0YWJsZSc7XG4gICAgfVxuICAgIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZSb3dTZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmUm93U2VsZWN0TW9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlJvd1NlbGVjdE1vZGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZSb3dTZWxlY3RNb2RlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi1yb3ctc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gYXR0cnMudWlmUm93U2VsZWN0TW9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUucm93U2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW2F0dHJzLnVpZlRhYmxlVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlRhYmxlVHlwZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdGFibGUtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBmaXhlZHxmbHVpZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IGF0dHJzLnVpZlRhYmxlVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW3RhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtLmZsdWlkXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bVt0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bS5maXhlZF0pIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZUNsYXNzID0gJ21zLVRhYmxlLS1maXhlZCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlRGlyZWN0aXZlID0gVGFibGVEaXJlY3RpdmU7XG52YXIgVGFibGVSb3dDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVSb3dDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXRlbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZVJvd0NvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZVJvd0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVSb3dDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZVJvd0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRyIG5nLXRyYW5zY2x1ZGU+PC90cj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9dWlmSXRlbSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVSb3dDb250cm9sbGVyO1xuICAgIH1cbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgdGFibGUpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRTdHJpbmcgPSBhdHRycy51aWZTZWxlY3RlZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nICE9PSAndHJ1ZScgJiYgc2VsZWN0ZWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICB0YWJsZS4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFibGUucm93cy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5yb3dDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSAhc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIHRhYmxlUm93U2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5zaW5nbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXSAhPT0gdGFibGVSb3dTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlICE9PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSAmJlxuICAgICAgICAgICAgc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93Q2xpY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dEaXJlY3RpdmUgPSBUYWJsZVJvd0RpcmVjdGl2ZTtcbnZhciBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRkIGNsYXNzPVwibXMtVGFibGUtcm93Q2hlY2tcIj48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnXnVpZlRhYmxlJywgJz9edWlmVGFibGVIZWFkJywgJ151aWZUYWJsZVJvdyddO1xuICAgIH1cbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHRoZWFkID0gY29udHJvbGxlcnNbMV07XG4gICAgICAgIGlmICh0aGVhZCkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LnJlcGxhY2VXaXRoKCc8dGggY2xhc3M9XCJtcy1UYWJsZS1yb3dDaGVja1wiPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucm93U2VsZWN0Q2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciB0YWJsZSA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgdmFyIHJvdyA9IGNvbnRyb2xsZXJzWzJdO1xuICAgICAgICAgICAgaWYgKHRhYmxlLnJvd1NlbGVjdE1vZGUgIT09IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLm11bHRpcGxlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb3cuaXRlbSA9PT0gdW5kZWZpbmVkIHx8IHJvdy5pdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNob3VsZFNlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkU2VsZWN0QWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gc2hvdWxkU2VsZWN0QWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gc2hvdWxkU2VsZWN0QWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93U2VsZWN0Q2xpY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dTZWxlY3REaXJlY3RpdmUgPSBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZTtcbnZhciBUYWJsZUNlbGxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQ2VsbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGQgbmctdHJhbnNjbHVkZT48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQ2VsbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQ2VsbERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQ2VsbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlQ2VsbERpcmVjdGl2ZSA9IFRhYmxlQ2VsbERpcmVjdGl2ZTtcbnZhciBUYWJsZUhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRoIG5nLXRyYW5zY2x1ZGU+PC90aD4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICB9XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIHNjb3BlLmhlYWRlckNsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAodGFibGUub3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gIXRhYmxlLm9yZGVyQXNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJCeSA9IGF0dHJzLnVpZk9yZGVyQnk7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQnknLCBmdW5jdGlvbiAobmV3T3JkZXJCeSwgb2xkT3JkZXJCeSwgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKG9sZE9yZGVyQnkgIT09IG5ld09yZGVyQnkgJiZcbiAgICAgICAgICAgICAgICBuZXdPcmRlckJ5ID09PSBhdHRycy51aWZPcmRlckJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHMuZXEoaSkuY2hpbGRyZW4oKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLmVxKGkpLmNoaWxkcmVuKCkuZXEoMSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ1aWYtc29ydC1vcmRlclwiPiZuYnNwO1xcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQXNjJywgZnVuY3Rpb24gKG5ld09yZGVyQXNjLCBvbGRPcmRlckFzYywgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHZhciBvbGRDc3NDbGFzcyA9IG9sZE9yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nzc0NsYXNzID0gbmV3T3JkZXJBc2MgPyAnbXMtSWNvbi0tY2FyZXREb3duJyA6ICdtcy1JY29uLS1jYXJldFVwJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgxKS5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKG9sZENzc0NsYXNzKS5hZGRDbGFzcyhuZXdDc3NDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJ3VpZk9yZGVyQnknIGluIGF0dHJzKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaGVhZGVyQ2xpY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckRpcmVjdGl2ZSA9IFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xudmFyIFRhYmxlSGVhZENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlSGVhZENvbnRyb2xsZXIoKSB7XG4gICAgfVxuICAgIHJldHVybiBUYWJsZUhlYWRDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZUhlYWREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlSGVhZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGhlYWQgbmctdHJhbnNjbHVkZT48L3RoZWFkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlSGVhZENvbnRyb2xsZXI7XG4gICAgfVxuICAgIFRhYmxlSGVhZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlSGVhZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlSGVhZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlSGVhZERpcmVjdGl2ZSA9IFRhYmxlSGVhZERpcmVjdGl2ZTtcbnZhciBUYWJsZUJvZHlEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQm9keURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGJvZHkgbmctdHJhbnNjbHVkZT48L3Rib2R5Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQm9keURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQm9keURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQm9keURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlQm9keURpcmVjdGl2ZSA9IFRhYmxlQm9keURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGUnLCBUYWJsZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3cnLCBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3dTZWxlY3QnLCBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVDZWxsJywgVGFibGVDZWxsRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUhlYWRlcicsIFRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUhlYWQnLCBUYWJsZUhlYWREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlQm9keScsIFRhYmxlQm9keURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoVGFibGVSb3dTZWxlY3RNb2RlRW51bSkge1xuICAgIFRhYmxlUm93U2VsZWN0TW9kZUVudW1bVGFibGVSb3dTZWxlY3RNb2RlRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIFRhYmxlUm93U2VsZWN0TW9kZUVudW1bVGFibGVSb3dTZWxlY3RNb2RlRW51bVtcInNpbmdsZVwiXSA9IDFdID0gXCJzaW5nbGVcIjtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJtdWx0aXBsZVwiXSA9IDJdID0gXCJtdWx0aXBsZVwiO1xufSkoZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtIHx8IChleHBvcnRzLlRhYmxlUm93U2VsZWN0TW9kZUVudW0gPSB7fSkpO1xudmFyIFRhYmxlUm93U2VsZWN0TW9kZUVudW0gPSBleHBvcnRzLlRhYmxlUm93U2VsZWN0TW9kZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFRhYmxlVHlwZUVudW0pIHtcbiAgICBUYWJsZVR5cGVFbnVtW1RhYmxlVHlwZUVudW1bXCJmbHVpZFwiXSA9IDBdID0gXCJmbHVpZFwiO1xuICAgIFRhYmxlVHlwZUVudW1bVGFibGVUeXBlRW51bVtcImZpeGVkXCJdID0gMV0gPSBcImZpeGVkXCI7XG59KShleHBvcnRzLlRhYmxlVHlwZUVudW0gfHwgKGV4cG9ydHMuVGFibGVUeXBlRW51bSA9IHt9KSk7XG52YXIgVGFibGVUeXBlRW51bSA9IGV4cG9ydHMuVGFibGVUeXBlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciB1aWZUeXBlRW51bV8xID0gcmVxdWlyZSgnLi91aWZUeXBlRW51bScpO1xudmFyIFRleHRGaWVsZENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRGaWVsZENvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBUZXh0RmllbGRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gVGV4dEZpZWxkQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgVGV4dEZpZWxkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXh0RmllbGREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRleHRGaWVsZENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cIntcXCdpcy1hY3RpdmVcXCc6IGlzQWN0aXZlLCBcXCdtcy1UZXh0RmllbGRcXCc6IHRydWUsICcgK1xuICAgICAgICAgICAgJ1xcJ21zLVRleHRGaWVsZC0tdW5kZXJsaW5lZFxcJzogdWlmVW5kZXJsaW5lZCwgXFwnbXMtVGV4dEZpZWxkLS1wbGFjZWhvbGRlclxcJzogcGxhY2Vob2xkZXIsICcgK1xuICAgICAgICAgICAgJ1xcJ2lzLXJlcXVpcmVkXFwnOiByZXF1aXJlZCwgXFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkLCBcXCdtcy1UZXh0RmllbGQtLW11bHRpbGluZVxcJyA6IHVpZk11bHRpbGluZSB9XCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIG5nLXNob3c9XCJsYWJlbFNob3duXCIgY2xhc3M9XCJtcy1MYWJlbFwiIG5nLWNsaWNrPVwibGFiZWxDbGljaygpXCI+e3t1aWZMYWJlbCB8fCBwbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8aW5wdXQgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctY2hhbmdlPVwibmdDaGFuZ2VcIiBuZy1ibHVyPVwiaW5wdXRCbHVyKClcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWNsaWNrPVwiaW5wdXRDbGljaygpXCIgJyArXG4gICAgICAgICAgICAnY2xhc3M9XCJtcy1UZXh0RmllbGQtZmllbGRcIiBuZy1zaG93PVwiIXVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIicgK1xuICAgICAgICAgICAgJ21pbj1cInt7bWlufX1cIiBtYXg9XCJ7e21heH19XCIgc3RlcD1cInt7c3RlcH19XCIgLz4nICtcbiAgICAgICAgICAgICc8dGV4dGFyZWEgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiICcgK1xuICAgICAgICAgICAgJ2NsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgbmctc2hvdz1cInVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIj48L3RleHRhcmVhPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtVGV4dEZpZWxkLWRlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBtYXg6ICdAJyxcbiAgICAgICAgICAgIG1pbjogJ0AnLFxuICAgICAgICAgICAgbmdDaGFuZ2U6ICc9PycsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPT8nLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHN0ZXA6ICdAJyxcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZMYWJlbDogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmVGV4dGZpZWxkJywgJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgfVxuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRleHRGaWVsZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGV4dEZpZWxkRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycykge1xuICAgICAgICB2YXIgY29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICB2YXIgbmdNb2RlbCA9IGNvbnRyb2xsZXJzWzFdO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IHRydWU7XG4gICAgICAgIHNjb3BlLnJlcXVpcmVkID0gJ3JlcXVpcmVkJyBpbiBhdHRycztcbiAgICAgICAgc2NvcGUudWlmTXVsdGlsaW5lID0gYXR0cnMudWlmTXVsdGlsaW5lID09PSAndHJ1ZSc7XG4gICAgICAgIHNjb3BlLnVpZlR5cGUgPSBhdHRycy51aWZUeXBlO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICh1aWZUeXBlRW51bV8xLklucHV0VHlwZUVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50ZXh0ZmllbGQgLSBVbnN1cHBvcnRlZCB0eXBlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC91aWZUeXBlRW51bS50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlR5cGUgPSB1aWZUeXBlRW51bV8xLklucHV0VHlwZUVudW0udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLnVpZlVuZGVybGluZWQgPSAndWlmVW5kZXJsaW5lZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLmlucHV0Rm9jdXMgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRCbHVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBpbnN0YW5jZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlciAmJiBpbnB1dC52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmxhYmVsQ2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHNjb3BlLnVpZk11bHRpbGluZSA/IGluc3RhbmNlRWxlbWVudC5maW5kKCd0ZXh0YXJlYScpXG4gICAgICAgICAgICAgICAgICAgIDogaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgaW5wdXRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gIW5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGV4dEZpZWxkRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGV4dEZpZWxkRGlyZWN0aXZlID0gVGV4dEZpZWxkRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGV4dGZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUZXh0ZmllbGQnLCBUZXh0RmllbGREaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoSW5wdXRUeXBlRW51bSkge1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInRleHRcIl0gPSAwXSA9IFwidGV4dFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInBhc3N3b3JkXCJdID0gMV0gPSBcInBhc3N3b3JkXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wiZW1haWxcIl0gPSAyXSA9IFwiZW1haWxcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJ1cmxcIl0gPSAzXSA9IFwidXJsXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1widGVsXCJdID0gNF0gPSBcInRlbFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInJhbmdlXCJdID0gNV0gPSBcInJhbmdlXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wibnVtYmVyXCJdID0gNl0gPSBcIm51bWJlclwiO1xufSkoZXhwb3J0cy5JbnB1dFR5cGVFbnVtIHx8IChleHBvcnRzLklucHV0VHlwZUVudW0gPSB7fSkpO1xudmFyIElucHV0VHlwZUVudW0gPSBleHBvcnRzLklucHV0VHlwZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBUb2dnbGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRvZ2dsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwiW1xcJ21zLVRvZ2dsZVxcJywgdGV4dExvY2F0aW9uLCB7XFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfV1cIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRvZ2dsZS1kZXNjcmlwdGlvblwiPjxuZy10cmFuc2NsdWRlLz48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtaW5wdXRcIiAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1jaGFuZ2U9XCJuZ0NoYW5nZSgpXCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiICcgK1xuICAgICAgICAgICAgJ25nLWF0dHItbmctdHJ1ZS12YWx1ZT1cInt7bmdUcnVlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiBuZy1hdHRyLW5nLWZhbHNlLXZhbHVlPVwie3tuZ0ZhbHNlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLVRvZ2dsZS1maWVsZFwiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtTGFiZWwgbXMtTGFiZWwtLW9mZlwiPnt7dWlmTGFiZWxPZmZ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vblwiPnt7dWlmTGFiZWxPbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nQ2hhbmdlOiAnJj8nLFxuICAgICAgICAgICAgbmdGYWxzZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgbmdNb2RlbDogJz0/JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgdWlmTGFiZWxPZmY6ICdAJyxcbiAgICAgICAgICAgIHVpZkxhYmVsT246ICdAJyxcbiAgICAgICAgICAgIHVpZlRleHRMb2NhdGlvbjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRvZ2dsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVG9nZ2xlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICBpZiAoc2NvcGUudWlmVGV4dExvY2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbG9jID0gc2NvcGUudWlmVGV4dExvY2F0aW9uO1xuICAgICAgICAgICAgbG9jID0gbG9jLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbG9jLnNsaWNlKDEpO1xuICAgICAgICAgICAgc2NvcGUudGV4dExvY2F0aW9uID0gJyBtcy1Ub2dnbGUtLXRleHQnICsgbG9jO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtLmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgc2NvcGUuZGlzYWJsZWQgPSB0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnOyB9KSk7XG4gICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycztcbiAgICB9O1xuICAgIHJldHVybiBUb2dnbGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ub2dnbGVEaXJlY3RpdmUgPSBUb2dnbGVEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50b2dnbGUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRvZ2dsZScsIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0UHJlc2VuY2VFbnVtJyk7XG52YXIgb3JnQ2hhcnRTdHlsZUVudW1fMSA9IHJlcXVpcmUoJy4vb3JnQ2hhcnRTdHlsZUVudW0nKTtcbnZhciBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0U2VsZWN0TW9kZUVudW0nKTtcbnZhciBPcmdDaGFydENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdE1vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLiRzY29wZS5pdGVtcyA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT3JnQ2hhcnRDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9yZ0NoYXJ0Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPcmdDaGFydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gT3JnQ2hhcnRDb250cm9sbGVyO1xufSgpKTtcbnZhciBPcmdDaGFydERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gT3JnQ2hhcnRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogJz0/dWlmU2VsZWN0ZWRJdGVtcydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlNlbGVjdE1vZGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGU6XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZTpcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RNb2RlID0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bYXR0cnMudWlmU2VsZWN0TW9kZV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVUlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQgLSBVbnN1cHBvcnRlZCBzZWxlY3QtbW9kZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHNlbGVjdC1tb2RlIChcXCcnICsgYXR0cnMudWlmU2VsZWN0TW9kZSArICdcXCkgaXMgbm90IHN1cHBlcnRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBzaW5nbGUsIG11bHRpcGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydERpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cERpcmVjdGl2ZSA9IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwVGl0bGVcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUgPSBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtT3JnQ2hhcnQtbGlzdFwiIG5nLXRyYW5zY2x1ZGUgPjwvdWw+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1PcmdDaGFydC1saXN0SXRlbVwiPjxkaXYgY2xhc3M9XCJtcy1QZXJzb25hXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+PC9saT4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZk9yZ0NoYXJ0JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9P3VpZkl0ZW0nLFxuICAgICAgICAgICAgcHJlc2VuY2U6ICc9P3VpZlByZXNlbmNlJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPT91aWZTZWxlY3RlZCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtLCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnByZXNlbmNlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW1bc2NvcGUucHJlc2VuY2VdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmJ1c3k6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYnVzeScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYXdheTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hd2F5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5ibG9ja2VkOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWJsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmRuZDpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1kbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLm9mZmxpbmU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tb2ZmbGluZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgcHJlc2VuY2U6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmVzZW5jZSAoXFwnJyArIHNjb3BlLnByZXNlbmNlICsgJ1xcJykgaXMgbm90IHN1cHBlcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBhdmFpbGFibGUsIGJ1c3ksIGF3YXksIGJsb2NrZWQsIGRuZCwgb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlN0eWxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U3R5bGVFbnVtXzEuT3JnQ2hhcnRTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnNxdWFyZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnN0YW5kYXJkOiBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgc3R5bGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBzdHlsZSAoXFwnJyArIGF0dHJzLnVpZlN0eWxlICsgJ1xcKSBpcyBub3Qgc3VwcGVydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6IHN0YW5kYXJkKGRlZmF1bHQpLCBzcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLXNlbGVjdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgY3RybC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUgfHwgY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3RybC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXRlbXNbaV0gIT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5wdXNoKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wZXJzb25hQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0cmwuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pdGVtc1tpXSAhPT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGN0cmwuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSB8fCBjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlKSAmJiBzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkub24oJ2NsaWNrJywgc2NvcGUucGVyc29uYUNsaWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEltYWdlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEltYWdlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZUFyZWFcXFwiPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJtcy1QZXJzb25hLXBsYWNlaG9sZGVyIG1zLUljb24gbXMtSWNvbi0tcGVyc29uXFxcIj48L2k+XFxuICAgICAgPGltZyBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZVxcXCIgbmctc3JjPVxcXCJ7e25nU3JjfX1cXFwiIC8+XFxuICAgIDwvZGl2PlxcbiAgICBcIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nU3JjOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmVzZW5jZVwiID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgaWYgKCFzY29wZS4kcGFyZW50LnByZXNlbmNlKSB7XG4gICAgICAgICAgICBlbGVtLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEdyb3VwQnlGaWx0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcigpIHtcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29sbGVjdGlvbiwga2V5KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjb2xsZWN0aW9uW2ldW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cEJ5RmlsdGVyID0gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0JywgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0R3JvdXAnLCBPcmdDaGFydEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEdyb3VwVGl0bGUnLCBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0TGlzdCcsIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQZXJzb25hJywgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEltYWdlJywgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmVzZW5jZScsIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0RGV0YWlscycsIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmltYXJ5VGV4dCcsIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dCcsIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmZpbHRlcigndWlmT3JnQ2hhcnRHcm91cEJ5JywgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3JnQ2hhcnRQcmVzZW5jZUVudW0pIHtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImF2YWlsYWJsZVwiXSA9IDBdID0gXCJhdmFpbGFibGVcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImJ1c3lcIl0gPSAxXSA9IFwiYnVzeVwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYXdheVwiXSA9IDJdID0gXCJhd2F5XCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJibG9ja2VkXCJdID0gM10gPSBcImJsb2NrZWRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImRuZFwiXSA9IDRdID0gXCJkbmRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcIm9mZmxpbmVcIl0gPSA1XSA9IFwib2ZmbGluZVwiO1xufSkoZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRW51bSB8fCAoZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRQcmVzZW5jZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0UHJlc2VuY2VFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3JnQ2hhcnRTdHlsZUVudW0pIHtcbiAgICBPcmdDaGFydFN0eWxlRW51bVtPcmdDaGFydFN0eWxlRW51bVtcInN0YW5kYXJkXCJdID0gMF0gPSBcInN0YW5kYXJkXCI7XG4gICAgT3JnQ2hhcnRTdHlsZUVudW1bT3JnQ2hhcnRTdHlsZUVudW1bXCJzcXVhcmVcIl0gPSAxXSA9IFwic3F1YXJlXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtIHx8IChleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtID0ge30pKTtcbnZhciBPcmdDaGFydFN0eWxlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTdHlsZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA2MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChPcmdDaGFydFNlbGVjdE1vZGVFbnVtKSB7XG4gICAgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtPcmdDaGFydFNlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMF0gPSBcInNpbmdsZVwiO1xuICAgIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMV0gPSBcIm11bHRpcGxlXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFNlbGVjdE1vZGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHBlcnNvbmFTdHlsZUVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYVN0eWxlRW51bScpO1xudmFyIHNpemVFbnVtXzEgPSByZXF1aXJlKCcuLi9wZXJzb25hL3NpemVFbnVtJyk7XG52YXIgaWNvbkVudW1fMSA9IHJlcXVpcmUoJy4uL2ljb24vaWNvbkVudW0nKTtcbnZhciBwZW9wbGVTZWFyY2hFdmVudE5hbWUgPSAndWlmLXBlb3BsZS1zZWFyY2gnO1xudmFyIEdyb3VwZWRQZW9wbGVEYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm91cGVkUGVvcGxlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5wZW9wbGUgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIEdyb3VwZWRQZW9wbGVEYXRhO1xufSgpKTtcbmV4cG9ydHMuR3JvdXBlZFBlb3BsZURhdGEgPSBHcm91cGVkUGVvcGxlRGF0YTtcbnZhciBQZW9wbGVQaWNrZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJDb250cm9sbGVyKCRzY29wZSwgJGZpbHRlciwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGZpbHRlciA9ICRmaWx0ZXI7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRQZXJzb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRQZXJzb25zO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucGlja2VyVHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLiRzY29wZS50eXBlO1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUudHlwZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnNlYXJjaFF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYmluZFBlb3BsZSh0aGlzLiRzY29wZS5zZWFyY2hRdWVyeSk7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QocGVvcGxlU2VhcmNoRXZlbnROYW1lLCB0aGlzLnNlYXJjaFF1ZXJ5KCkpO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuYmluZFBlb3BsZSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IHRoaXMuJHNjb3BlLnBlb3BsZUNhbGxiYWNrKCkocXVlcnkpO1xuICAgICAgICBwZW9wbGVEYXRhID0gcGVvcGxlRGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKHBlb3BsZURhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuZ3JvdXBzID0gdGhpcy5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlKHBlb3BsZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwZW9wbGVEYXRhLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hNb3JlQ3RybF8xID0gYW5ndWxhci5lbGVtZW50KHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpXG4gICAgICAgICAgICAgICAgLmNvbnRyb2xsZXIoXCJcIiArIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoTW9yZUN0cmxfMSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGhhdF8xID0gdGhpcztcbiAgICAgICAgICAgIHBlb3BsZURhdGFcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoYXRfMS4kc2NvcGUuZ3JvdXBzID0gX3RoaXMuY3JlYXRlUGVvcGxlRGF0YVN0cnVjdHVyZShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hNb3JlQ3RybF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlID0gZnVuY3Rpb24gKHBlb3BsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IFtdO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gocGVvcGxlLCBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdHcm91cHMgPSBfdGhpcy4kZmlsdGVyKCdmaWx0ZXInKShwZW9wbGVEYXRhLCB7IGdyb3VwOiBwZXJzb24uZ3JvdXAgfSk7XG4gICAgICAgICAgICB2YXIgaGFzR3JvdXAgPSBleGlzdGluZ0dyb3Vwcy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICBpZiAoIWhhc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Blb3BsZURhdGEgPSBuZXcgR3JvdXBlZFBlb3BsZURhdGEoKTtcbiAgICAgICAgICAgICAgICBuZXdQZW9wbGVEYXRhLmdyb3VwID0gcGVyc29uLmdyb3VwO1xuICAgICAgICAgICAgICAgIG5ld1Blb3BsZURhdGEucGVvcGxlLnB1c2gocGVyc29uKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVEYXRhLnB1c2gobmV3UGVvcGxlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdEYXRhID0gZXhpc3RpbmdHcm91cHNbMF07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEYXRhLnBlb3BsZS5wdXNoKHBlcnNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGVvcGxlRGF0YTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRmaWx0ZXInLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlckNvbnRyb2xsZXIgPSBQZW9wbGVQaWNrZXJDb250cm9sbGVyO1xudmFyIFBlb3BsZVBpY2tlclR5cGVzO1xuKGZ1bmN0aW9uIChQZW9wbGVQaWNrZXJUeXBlcykge1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZ3JvdXBlZFwiXSA9IDBdID0gXCJncm91cGVkXCI7XG4gICAgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbXCJjb21wYWN0XCJdID0gMV0gPSBcImNvbXBhY3RcIjtcbiAgICBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1tcIm1lbWJlckxpc3RcIl0gPSAyXSA9IFwibWVtYmVyTGlzdFwiO1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZmFjZVBpbGVcIl0gPSAzXSA9IFwiZmFjZVBpbGVcIjtcbn0pKFBlb3BsZVBpY2tlclR5cGVzIHx8IChQZW9wbGVQaWNrZXJUeXBlcyA9IHt9KSk7XG52YXIgUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ25nTW9kZWwnLCAoXCJcIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKV07XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlb3BsZVBpY2tlckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBkZWxheTogJ0B1aWZTZWFyY2hEZWxheScsXG4gICAgICAgICAgICBmYWNlUGlsZUhlYWRlcjogJ0A/dWlmRmFjZXBpbGVIZWFkZXInLFxuICAgICAgICAgICAgbmdEaXNhYmxlZDogJz0/JyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG9uU2VsZWN0ZWRQZXJzb25DbGljazogJyY/dWlmU2VsZWN0ZWRQZXJzb25DbGljaycsXG4gICAgICAgICAgICBwZW9wbGVDYWxsYmFjazogJyZ1aWZQZW9wbGUnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAPycsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoUGVvcGxlUGlja2VyVHlwZXNbdHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlb3BsZXBpY2tlciAtIHVuc3VwcG9ydGVkIHBlb3BsZSBwaWNrZXIgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgcGVvcGxlIHBpY2tlci4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgUGVvcGxlUGlja2VyVHlwZXMgZW51bSBoZXJlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvcGVvcGxlcGlja2VyL3Blb3BsZVBpY2tlckRpcmVjdGl2ZS50cycpO1xuICAgICAgICAgICAgICAgIHRocm93ICdbbmdPZmZpY2VVaUZhYnJpY10gLSBFcnJvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIG5nTW9kZWxDdHJsID0gY3RybHNbMF07XG4gICAgICAgICAgICB2YXIgcGVvcGxlUGlja2VyQ3RybCA9IGN0cmxzWzFdO1xuICAgICAgICAgICAgX3RoaXMuaW5pdERpc2FibGVkU3RhdGUoJGVsZW1lbnQsICRzY29wZSwgJGF0dHJzKTtcbiAgICAgICAgICAgICRzY29wZS5mYWNlUGlsZUhlYWRlciA9ICRzY29wZS5mYWNlUGlsZUhlYWRlciB8fCAnU3VnZ2VzdGVkIGNvbnRhY3RzJztcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKCdzZWxlY3RlZFBlcnNvbnMnLCBmdW5jdGlvbiAoZGF0YSwgZGF0YTIsIGRhdGEzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzaXplU2VhcmNoRmllbGQoJGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMgPSBuZ01vZGVsQ3RybC4kdmlld1ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNpemVTZWFyY2hGaWVsZCgkZWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgIHZhciBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5vblNlYXJjaEtleVVwID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VhcmNoTW9yZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUnKSk7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWFyY2hNb3JlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VhcmNoUXVlcnkgPyAkZWxlbWVudC5hZGRDbGFzcygnaXMtc2VhcmNoaW5nJykgOiAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VhcmNoaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWFyY2hRdWVyeSA/ICRzZWFyY2hNb3JlLmFkZENsYXNzKCdpcy1hY3RpdmUnKSA6ICRzZWFyY2hNb3JlLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVNlbGVjdGVkUGVvcGxlKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuZGVsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0LmNhbmNlbChzZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VhcmNoVGltZW91dCA9IF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LCAkc2NvcGUuZGVsYXkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vblBlb3BsZVBpY2tlckFjdGl2ZSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zbW9vdGhTY3JvbGxUbygkZWxlbWVudFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS50eXBlICE9PSBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItcmVzdWx0cycpKTtcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHNbMF0uc3R5bGUud2lkdGggPSAkZWxlbWVudFswXS5jbGllbnRXaWR0aCAtIDIgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkc2NvcGUudHlwZSA9PT0gUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVTZWxlY3RlZFBlb3BsZSgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLmFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RlZFBlcnNvbnMuaW5kZXhPZihwZXJzb24pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMucHVzaChwZXJzb24pO1xuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJHNjb3BlLnNlbGVjdGVkUGVyc29ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLnJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZSA9IGZ1bmN0aW9uIChwZXJzb24sICRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmR4ID0gJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5pbmRleE9mKHBlcnNvbik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5zcGxpY2UoaW5keCwgMSk7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSgkc2NvcGUuc2VsZWN0ZWRQZXJzb25zKTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLnJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzID0gZnVuY3Rpb24gKHBlb3BsZSwgcGVyc29uLCAkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIGluZHggPSBwZW9wbGUuaW5kZXhPZihwZXJzb24pO1xuICAgICAgICAgICAgICAgIHBlb3BsZS5zcGxpY2UoaW5keCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3RoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICgkc2NvcGUudHlwZSA9PT0gUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdKSB7XG4gICAgICAgICAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmluc2VydEZhY2VQaWxlSGVhZGVyKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zZXJ0RmFjZVBpbGVTZWFyY2hNb3JlKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmdyb3VwZWRdID1cbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlcnNvbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtaW1hZ2UtdXJsPVxcXCJ7e3BlcnNvbi5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIG5nLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGUocGVyc29uLCAkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlcnNvbmFSZW1vdmVcXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLnhdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8aW5wdXQgbmctY2xpY2s9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7cGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwic2VhcmNoUXVlcnlcXFwiXFxuICAgICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hGaWVsZFxcXCJcXG4gICAgICAgICAgICBuZy1mb2N1cz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBuZy1rZXl1cD1cXFwib25TZWFyY2hLZXlVcCgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0c1xcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRHcm91cHNcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRHcm91cFxcXCIgbmctcmVwZWF0PVxcXCJncm91cERhdGEgaW4gZ3JvdXBzIHwgb3JkZXJCeTonLW9yZGVyJ1xcXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBUaXRsZVxcXCI+e3tncm91cERhdGEuZ3JvdXAubmFtZX19PC9kaXY+XFxuICAgICAgICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3RcXG4gICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJncm91cERhdGEucGVvcGxlXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5tZWRpdW1dICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSA9XG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLWNvbXBhY3RcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlcnNvbmFcXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVyc29ucyB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtcHJlc2VuY2U9XFxcInt7cGVyc29uLnByZXNlbmNlfX1cXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1pbWFnZS11cmw9XFxcInt7cGVyc29uLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0Pnt7cGVyc29uLnByaW1hcnlUZXh0fX08L3VpZi1wZXJzb25hLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZShwZXJzb24sICRldmVudClcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcGVyc29uYVJlbW92ZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwic2VhcmNoUXVlcnlcXFwiXFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7cGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3Vwc1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwXFxcIiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRHcm91cFRpdGxlXFxcIj57e2dyb3VwRGF0YS5ncm91cC5uYW1lfX08L2Rpdj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdFxcbiAgICAgICAgICAgICAgbmctbW9kZWw9XFxcImdyb3VwRGF0YS5wZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGlja2VyLXR5cGU9XFxcIlwiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuY29tcGFjdF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsb3NlLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VhcmNoUmVzdWx0c1xcXCJcXG4gICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmVdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMubWVtYmVyTGlzdF0gPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLW1lbWJlcnNMaXN0XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3Vwc1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwXFxcIiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdFxcbiAgICAgICAgICAgICAgbmctbW9kZWw9XFxcImdyb3VwRGF0YS5wZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJhZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnJvdW5kXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLm1lZGl1bV0gKyBcIlxcXCI+PC91aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1zZWxlY3RlZCBuZy1tb2RlbD1cXFwic2VsZWN0ZWRQZXJzb25zXFxcIlxcbiAgICAgICAgdWlmLXNlbGVjdGVkLXBlcnNvbi1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKClcXFwiXFxuICAgICAgICB1aWYtcGVyc29uLWNsb3NlPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGVcXFwiPlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICA8L3VpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkPlxcbiAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdID0gXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXIgbXMtUGVvcGxlUGlja2VyLS1GYWNlcGlsZVxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoQm94XFxcIj5cXG4gICAgICAgICAgICA8aW5wdXQgbmctY2xpY2s9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7cGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwic2VhcmNoUXVlcnlcXFwiXFxuICAgICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hGaWVsZFxcXCJcXG4gICAgICAgICAgICBuZy1mb2N1cz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBuZy1rZXl1cD1cXFwib25TZWFyY2hLZXlVcCgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0c1xcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZW9wbGVMaXN0SGVhZGVyXFxcIj5cXG4gICAgICAgICAgICAgIDxzcGFuPnt7ZmFjZVBpbGVIZWFkZXJ9fTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJncm91cERhdGEgaW4gZ3JvdXBzIHwgb3JkZXJCeTonLW9yZGVyJ1xcXCI+XFxuICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcImdyb3VwRGF0YS5wZW9wbGVcXFwiXFxuICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0ucm91bmRdICsgXCJcXFwiXFxuICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWlmLXNlYXJjaC1tb3JlXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkIG5nLW1vZGVsPVxcXCJzZWxlY3RlZFBlcnNvbnNcXFwiXFxuICAgICAgICB1aWYtc2VsZWN0ZWQtcGVyc29uLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2U9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVpZi1wZW9wbGUtaGVhZGVyXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQ+XFxuXFxuICAgICAgPC9kaXY+XCI7XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRkb2N1bWVudCwgJHRpbWVvdXQsICRsb2csICR3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGVvcGxlUGlja2VyRGlyZWN0aXZlKCRkb2N1bWVudCwgJHRpbWVvdXQsICRsb2csICR3aW5kb3cpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGRvY3VtZW50JywgJyR0aW1lb3V0JywgJyRsb2cnLCAnJHdpbmRvdyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbml0RGlzYWJsZWRTdGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJHNjb3BlLCAkYXR0cnMpIHtcbiAgICAgICAgdmFyICRzZWFyY2hGaWVsZCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkJykpO1xuICAgICAgICAkYXR0cnMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAkc2VhcmNoRmllbGQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzZWFyY2hGaWVsZC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuYW5pbWF0ZVNlbGVjdGVkUGVvcGxlID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgICAgIHZhciAkc2VsZWN0ZWRQZW9wbGUgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFBlb3BsZScpKTtcbiAgICAgICAgJHNlbGVjdGVkUGVvcGxlLmFkZENsYXNzKCdtcy11LXNsaWRlRG93bkluMjAnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7ICRzZWxlY3RlZFBlb3BsZS5yZW1vdmVDbGFzcygnbXMtdS1zbGlkZURvd25JbjIwJyk7IH0sIDEwMDApO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5jdXJyZW50WVBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kd2luZG93LnBhZ2VZT2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gYW5ndWxhci5lbGVtZW50KHRoaXMuJGRvY3VtZW50WzBdKS5maW5kKCdib2R5JylbMF07XG4gICAgICAgIGlmIChib2R5LnNjcm9sbFRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5lbG1ZUG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgeSA9IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICB2YXIgbm9kZSA9IGVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChub2RlLm9mZnNldFBhcmVudCAmJiBub2RlLm9mZnNldFBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgbm9kZSA9IChub2RlLm9mZnNldFBhcmVudCk7XG4gICAgICAgICAgICB5ICs9IG5vZGUub2Zmc2V0VG9wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5O1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5zbW9vdGhTY3JvbGxUbyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBzdGFydFkgPSB0aGlzLmN1cnJlbnRZUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHN0b3BZID0gdGhpcy5lbG1ZUG9zaXRpb24oZWxlbWVudCk7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHN0b3BZID4gc3RhcnRZID8gc3RvcFkgLSBzdGFydFkgOiBzdGFydFkgLSBzdG9wWTtcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgMTAwKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc3RvcFkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzcGVlZCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyAzMCk7XG4gICAgICAgIGlmIChzcGVlZCA+PSAyMCkge1xuICAgICAgICAgICAgc3BlZWQgPSAyMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RlcCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyAyNSk7XG4gICAgICAgIHZhciBsZWFwWSA9IHN0b3BZID4gc3RhcnRZID8gc3RhcnRZICsgc3RlcCA6IHN0YXJ0WSAtIHN0ZXA7XG4gICAgICAgIHZhciB0aW1lciA9IDA7XG4gICAgICAgIGlmIChzdG9wWSA+IHN0YXJ0WSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0WTsgaSA8IHN0b3BZOyBpICs9IHN0ZXApIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGxZLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGxZKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdCAqIHNwZWVkKTtcbiAgICAgICAgICAgICAgICB9KShsZWFwWSwgdGltZXIpO1xuICAgICAgICAgICAgICAgIGxlYXBZICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgaWYgKGxlYXBZID4gc3RvcFkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVhcFkgPSBzdG9wWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGltZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRZOyBpID4gc3RvcFk7IGkgLT0gc3RlcCkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIChsWSwgdCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbFkpO1xuICAgICAgICAgICAgICAgIH0sIHQgKiBzcGVlZCk7XG4gICAgICAgICAgICB9KShsZWFwWSwgdGltZXIpO1xuICAgICAgICAgICAgbGVhcFkgLT0gc3RlcDtcbiAgICAgICAgICAgIGlmIChsZWFwWSA8IHN0b3BZKSB7XG4gICAgICAgICAgICAgICAgbGVhcFkgPSBzdG9wWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVyKys7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0RmFjZVBpbGVIZWFkZXIgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1wZW9wbGUtaGVhZGVyJykpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkQ291bnQnKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0RmFjZVBpbGVTZWFyY2hNb3JlID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtc2VhcmNoLW1vcmUnKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZScpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5yZXNpemVTZWFyY2hGaWVsZCA9IGZ1bmN0aW9uICgkcGVvcGxlUGlja2VyKSB7XG4gICAgICAgIHZhciAkc2VhcmNoQm94ID0gYW5ndWxhci5lbGVtZW50KCRwZW9wbGVQaWNrZXJbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3gnKSk7XG4gICAgICAgIHZhciAkc2VhcmNoRmllbGQgPSBhbmd1bGFyLmVsZW1lbnQoJHBlb3BsZVBpY2tlclswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkJykpO1xuICAgICAgICB2YXIgc2VhcmNoQm94TGVmdEVkZ2UgPSAkc2VhcmNoQm94LnByb3AoJ29mZnNldExlZnQnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJveFdpZHRoID0gJHNlYXJjaEJveFswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIHNlYXJjaEJveFJpZ2h0RWRnZSA9IHNlYXJjaEJveExlZnRFZGdlICsgc2VhcmNoQm94V2lkdGg7XG4gICAgICAgIHZhciAkcGVyc29uYU5vZGVzID0gJHNlYXJjaEJveFswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtUGVvcGxlUGlja2VyLXBlcnNvbmEnKTtcbiAgICAgICAgaWYgKCRwZXJzb25hTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyICRsYXN0UGVyc29uYSA9IGFuZ3VsYXIuZWxlbWVudCgkcGVyc29uYU5vZGVzWyRwZXJzb25hTm9kZXMubGVuZ3RoIC0gMV0pO1xuICAgICAgICB2YXIgbGFzdFBlcnNvbmFMZWZ0RWRnZSA9ICRsYXN0UGVyc29uYS5wcm9wKCdvZmZzZXRMZWZ0Jyk7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYVdpZHRoID0gJGxhc3RQZXJzb25hWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgbGFzdFBlcnNvbmFSaWdodEVkZ2UgPSBsYXN0UGVyc29uYUxlZnRFZGdlICsgbGFzdFBlcnNvbmFXaWR0aDtcbiAgICAgICAgdmFyIG5ld0ZpZWxkV2lkdGggPSBzZWFyY2hCb3hSaWdodEVkZ2UgLSBsYXN0UGVyc29uYVJpZ2h0RWRnZSAtIDU7XG4gICAgICAgIGlmIChuZXdGaWVsZFdpZHRoIDwgMTAwKSB7XG4gICAgICAgICAgICBuZXdGaWVsZFdpZHRoID0gJzEwMCUnO1xuICAgICAgICAgICAgJHNlYXJjaEZpZWxkWzBdLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJHNlYXJjaEZpZWxkWzBdLnN0eWxlLndpZHRoID0gbmV3RmllbGRXaWR0aCArICdweCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlBlb3BsZVBpY2tlcic7XG4gICAgcmV0dXJuIFBlb3BsZVBpY2tlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlckRpcmVjdGl2ZSA9IFBlb3BsZVBpY2tlckRpcmVjdGl2ZTtcbnZhciBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDx1bCBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdExpc3RcXFwiPlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRcXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHBlb3BsZSB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgIDxkaXYgcm9sZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEJ0blxcXCJcXG4gICAgICBuZy1jbGFzcz1cXFwieydtcy1QZW9wbGVQaWNrZXItcmVzdWx0QnRuLS1jb21wYWN0JzogcGlja2VyVHlwZSA9PT0gJ2NvbXBhY3QnfVxcXCIgbmctY2xpY2s9XFxcIm9uUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIj5cXG4gICAgICAgIDx1aWYtcGVyc29uYVxcbiAgICAgICAgICB1aWYtc3R5bGU9XFxcInt7cGVyc29uU3R5bGV9fVxcXCJcXG4gICAgICAgICAgdWlmLXNpemU9XFxcInt7cGVyc29uU2l6ZX19XFxcIlxcbiAgICAgICAgICB1aWYtcHJlc2VuY2U9XFxcInt7cGVyc29uLnByZXNlbmNlfX1cXFwiXFxuICAgICAgICAgIHVpZi1pbWFnZS11cmw9XFxcInt7cGVyc29uLmljb259fVxcXCI+XFxuICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICA8dWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0Pnt7cGVyc29uLnByaW1hcnlUZXh0fX08L3VpZi1wZXJzb25hLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgPHVpZi1wZXJzb25hLXNlY29uZGFyeS10ZXh0Pnt7cGVyc29uLnNlY29uZGFyeVRleHR9fTwvdWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+XFxuICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiXFxuICAgICAgICAgIG5nLWlmPVxcXCIhcGVyc29uLmFkZGl0aW9uYWxEYXRhICYmIG9uUGVyc29uQ2xvc2VDbGljaygpXFxcIlxcbiAgICAgICAgICBuZy1jbGljaz1cXFwib25QZXJzb25DbG9zZUNsaWNrKCkocGVvcGxlLCBwZXJzb24sICRldmVudClcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWN0aW9uIGpzLXJlc3VsdFJlbW92ZVxcXCI+XFxuICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiXFxuICAgICAgICAgIG5nLWlmPVxcXCJwZXJzb24uYWRkaXRpb25hbERhdGFcXFwiXFxuICAgICAgICAgIG5nLWNsaWNrPVxcXCJleHBhbmRBZGRpdGlvbmFsRGF0YSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEFjdGlvbiBqcy1yZXN1bHRSZW1vdmVcXFwiPlxcbiAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmNoZXZyb25zRG93bl0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgbmctaWY9XFxcInBlcnNvbi5hZGRpdGlvbmFsRGF0YVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBZGRpdGlvbmFsQ29udGVudFxcXCI+XFxuICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3RcXG4gICAgICAgIG5nLW1vZGVsPVxcXCJwZXJzb24uYWRkaXRpb25hbERhdGFcXFwiXFxuICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJvblBlcnNvbkNsaWNrKClcXFwiXFxuICAgICAgICB1aWYtcGVyc29uLWNsb3NlLWNsaWNrPVxcXCJvblBlcnNvbkNsb3NlQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1waWNrZXItdHlwZT1cXFwie3twaWNrZXJUeXBlfX1cXFwiXFxuICAgICAgICB1aWYtc3R5bGU9XFxcInt7cGVyc29uU3R5bGV9fVxcXCJcXG4gICAgICAgIHVpZi1zaXplPVxcXCJ7e3BlcnNvblNpemV9fVxcXCI+PC91aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdD5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9saT5cXG4gIDwvdWw+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvblBlcnNvbkNsaWNrOiAnJnVpZlBlcnNvbkNsaWNrJyxcbiAgICAgICAgICAgIG9uUGVyc29uQ2xvc2VDbGljazogJyZ1aWZQZXJzb25DbG9zZUNsaWNrJyxcbiAgICAgICAgICAgIHBlb3BsZTogJz1uZ01vZGVsJyxcbiAgICAgICAgICAgIHBlcnNvblNpemU6ICdAdWlmU2l6ZScsXG4gICAgICAgICAgICBwZXJzb25TdHlsZTogJ0B1aWZTdHlsZScsXG4gICAgICAgICAgICBwaWNrZXJUeXBlOiAnQHVpZlBpY2tlclR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBlb3BsZVBpY2tlckN0cmwsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kQWRkaXRpb25hbERhdGEgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciAkYnV0dG9uID0gYW5ndWxhci5lbGVtZW50KCRldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHBhcmVudCA9ICRidXR0b24ucGFyZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdtcy1QZW9wbGVQaWNrZXItcmVzdWx0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQudG9nZ2xlQ2xhc3MoJ2lzLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkYnV0dG9uID0gJHBhcmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlBlb3BsZVBpY2tlclJlc3VsdExpc3QnO1xuICAgIHJldHVybiBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZSA9IFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmU7XG52YXIgUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy5zZWFyY2hDYWxsYmFja3MgPSBbXTtcbiAgICB9XG4gICAgUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzU2VhcmNoaW5nID0gZnVuY3Rpb24gKHNlYXJjaGluZykge1xuICAgICAgICB0aGlzLiRzY29wZS5wcm9jZXNzaW5nID0gc2VhcmNoaW5nO1xuICAgICAgICBzZWFyY2hpbmcgPyB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWFyY2hpbmcnKSA6IHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlYXJjaGluZycpO1xuICAgIH07XG4gICAgUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50J107XG4gICAgcmV0dXJuIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIgPSBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcjtcbnZhciBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBcIl5eXCIgKyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUganMtc2VhcmNoTW9yZVxcXCJcXG4gICAgbmctY2xhc3M9XFxcInsnbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUtLWRpc2Nvbm5lY3RlZCc6IGRpc2Nvbm5lY3RlZH1cXFwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInBpY2tlclR5cGUgPT09ICdcIiArIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmdyb3VwZWRdICsgXCInICYmICFkaXNjb25uZWN0ZWRcXFwiXFxuICAgICAgbmctY2xpY2s9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUJ0blxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVJY29uXFxcIj5cXG4gICAgICAgIDx1aWYtaWNvbiBuZy1pZj1cXFwiIWRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLnNlYXJjaF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgIDx1aWYtaWNvbiBuZy1pZj1cXFwiZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uYWxlcnRdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgPC9idXR0b24+XFxuICAgIDxkaXYgcm9sZT1cXFwiYnV0dG9uXFxcIiBuZy1pZj1cXFwicGlja2VyVHlwZSA9PT0gJ1wiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuY29tcGFjdF0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuIG1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuLS1jb21wYWN0XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJwaWNrZXJUeXBlID09PSAnXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuIG1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuLS1jb21wYWN0XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUJ0blxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVJY29uXFxcIj5cXG4gICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uYWxlcnRdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgPC9kaXY+XFxuICAgIDx1aWYtc3Bpbm5lciBuZy1zaG93PVxcXCJwcm9jZXNzaW5nXFxcIj48L3VpZi1zcGlubmVyPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBkaXNjb25uZWN0ZWQ6ICc9dWlmRGlzY29ubmVjdGVkJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnBpY2tlclR5cGUgPSBwZW9wbGVQaWNrZXJDdHJsLnBpY2tlclR5cGUoKTtcbiAgICAgICAgICAgICRzY29wZS5vblNlYXJjaCA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdChwZW9wbGVTZWFyY2hFdmVudE5hbWUsIHBlb3BsZVBpY2tlckN0cmwuc2VhcmNoUXVlcnkoKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlBlb3BsZVNlYXJjaE1vcmUnO1xuICAgIHJldHVybiBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZSA9IFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmU7XG52YXIgUHJpbWFyeVRleHRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmltYXJ5VGV4dENvbnRyb2xsZXIoJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRzY29wZS4kb24ocGVvcGxlU2VhcmNoRXZlbnROYW1lLCBmdW5jdGlvbiAoJGV2ZW50LCBxdWVyeSkge1xuICAgICAgICAgICAgX3RoaXMuJHNjb3BlLnNlYXJjaFF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQcmltYXJ5VGV4dENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG4gICAgcmV0dXJuIFByaW1hcnlUZXh0Q29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlByaW1hcnlUZXh0Q29udHJvbGxlciA9IFByaW1hcnlUZXh0Q29udHJvbGxlcjtcbnZhciBQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJpbWFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsoXCJeXlwiICsgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKSwgKFwiXl5cIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKV07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFByaW1hcnlUZXh0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQuZGlzY29ubmVjdGVkXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVQcmltYXJ5XFxcIj5cXG4gICAgPGRpdiBuZy1zaG93PVxcXCIkcGFyZW50LiRwYXJlbnQucHJvY2Vzc2luZ1xcXCI+e3tzZWFyY2hpbmdGb3JUZXh0fX0ge3tzZWFyY2hRdWVyeX19PC9kaXY+XFxuICAgIDxuZy10cmFuc2NsdWRlIG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQucHJvY2Vzc2luZ1xcXCI+PC9uZy10cmFuc2NsdWRlPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hpbmdGb3JUZXh0OiAnQD91aWZTZWFyY2hGb3JUZXh0J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJscywgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5zZWFyY2hpbmdGb3JUZXh0ID0gJHNjb3BlLnNlYXJjaGluZ0ZvclRleHQgfHwgJ1NlYXJjaGluZyBmb3InO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQcmltYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlByaW1hcnlUZXh0JztcbiAgICByZXR1cm4gUHJpbWFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QcmltYXJ5VGV4dERpcmVjdGl2ZSA9IFByaW1hcnlUZXh0RGlyZWN0aXZlO1xudmFyIFNlY29uZGFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlY29uZGFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBuZy1zaG93PVxcXCIhJHBhcmVudC4kcGFyZW50LmRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlU2Vjb25kYXJ5XFxcIj5cXG4gICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgIH1cbiAgICBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlNlY29uZGFyeVRleHQnO1xuICAgIHJldHVybiBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiRwYXJlbnQuJHBhcmVudC5kaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZVByaW1hcnlcXFwiPlxcbiAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRydWU7XG4gICAgfVxuICAgIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmRGlzY29ubmVjdGVkVGV4dCc7XG4gICAgcmV0dXJuIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlID0gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZTtcbnZhciBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWFjdGl2ZSc6IHNlbGVjdGVkUGVvcGxlICYmIHNlbGVjdGVkUGVvcGxlLmxlbmd0aCA+IDB9XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZEhlYWRlclxcXCI+XFxuICAgICAgICAgICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8dWwgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxsaSBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVyc29uXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlb3BsZSB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5yb3VuZF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5zbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1pbWFnZS11cmw9XFxcInt7cGVyc29uLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXNlY29uZGFyeS10ZXh0Pnt7cGVyc29uLnNlY29uZGFyeVRleHR9fTwvdWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+XFxuICAgICAgICAgICAgPC91aWYtcGVyc29uYT5cXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGUoKShwZXJzb24sICRldmVudClcXFwiXFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEFjdGlvbiBqcy1yZXN1bHRSZW1vdmVcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICA8L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvblNlbGVjdGVkUGVyc29uQ2xpY2s6ICcmP3VpZlNlbGVjdGVkUGVyc29uQ2xpY2snLFxuICAgICAgICAgICAgcmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlOiAnJnVpZlBlcnNvbkNsb3NlJyxcbiAgICAgICAgICAgIHNlbGVjdGVkUGVvcGxlOiAnPW5nTW9kZWwnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyU2VsZWN0ZWQnO1xuICAgIHJldHVybiBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlID0gUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmU7XG52YXIgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBcIl5eXCIgKyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIjxzcGFuIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRDb3VudFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XCI7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBlb3BsZVBpY2tlckN0cmwsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zID0gcGVvcGxlUGlja2VyQ3RybC5nZXRTZWxlY3RlZFBlcnNvbnMoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZTZWxlY3RlZFBlb3BsZUhlYWRlcic7XG4gICAgcmV0dXJuIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUgPSBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlb3BsZXBpY2tlcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShQcmltYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=