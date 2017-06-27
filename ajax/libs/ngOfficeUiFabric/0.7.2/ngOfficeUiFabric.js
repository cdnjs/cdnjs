/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * Angular 1.x directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.7.2
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
	var navBarModule = __webpack_require__(24);
	var overlayModule = __webpack_require__(25);
	var personacardModule = __webpack_require__(27);
	var personaModule = __webpack_require__(32);
	var progressIndicatorModule = __webpack_require__(35);
	var searchboxModule = __webpack_require__(36);
	var spinnerModule = __webpack_require__(37);
	var tableModule = __webpack_require__(39);
	var textFieldModule = __webpack_require__(41);
	var toggleModule = __webpack_require__(42);
	var orgChartModule = __webpack_require__(43);
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
	    navBarModule.module.name,
	    overlayModule.module.name,
	    personacardModule.module.name,
	    personaModule.module.name,
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
	    }
	    BreadcrumbLinkDirective.factory = function () {
	        var directive = function () { return new BreadcrumbLinkDirective(); };
	        return directive;
	    };
	    return BreadcrumbLinkDirective;
	}());
	exports.BreadcrumbLinkDirective = BreadcrumbLinkDirective;
	var BreadcrumbController = (function () {
	    function BreadcrumbController($compile) {
	        this.$compile = $compile;
	    }
	    BreadcrumbController.$inject = ['$compile'];
	    return BreadcrumbController;
	}());
	exports.BreadcrumbController = BreadcrumbController;
	var BreadcrumbDirective = (function () {
	    function BreadcrumbDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Breadcrumb"></div>';
	        this.controller = BreadcrumbController;
	        this.require = 'uifBreadcrumb';
	    }
	    BreadcrumbDirective.factory = function () {
	        var directive = function () { return new BreadcrumbDirective(); };
	        return directive;
	    };
	    BreadcrumbDirective.prototype.link = function (scope, instanceElement, attributes, ctrl, transclude) {
	        transclude(function (transcludedElement) {
	            var breadcrumbList = angular.element('<ul></ul>');
	            breadcrumbList.addClass('ms-Breadcrumb-list');
	            var tabIndex = 1;
	            var breadcrumbLinks = transcludedElement;
	            for (var bcLinkIndex = 0; bcLinkIndex < transcludedElement.length; bcLinkIndex++) {
	                var link = angular.element(breadcrumbLinks[bcLinkIndex]);
	                if (link[0].nodeName === '#text') {
	                    continue;
	                }
	                var liElement = angular.element('<li></li>');
	                liElement.addClass('ms-Breadcrumb-listItem');
	                var aElement = angular.element('<a></a>');
	                aElement.addClass('ms-Breadcrumb-itemLink');
	                aElement.attr('tabindex', ++tabIndex);
	                aElement.attr('href', link.attr('ng-href'));
	                aElement.append(link[0].innerHTML);
	                liElement.append(aElement);
	                var iconElement = angular.element("<i></i>");
	                iconElement.addClass('ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight');
	                liElement.append(iconElement);
	                breadcrumbList.append(liElement);
	            }
	            var overflowDiv = angular.element('<div></div>');
	            overflowDiv.addClass('ms-Breadcrumb-overflow');
	            var overflowButtonDiv = angular.element('<div></div>');
	            overflowButtonDiv.addClass('ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis');
	            overflowButtonDiv.attr('tabindex', '1');
	            overflowDiv.append(overflowButtonDiv);
	            var iIcon = angular.element('<i></i>');
	            iIcon.addClass('ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight');
	            overflowDiv.append(iIcon);
	            instanceElement.append(overflowDiv);
	            instanceElement.append(breadcrumbList);
	        });
	    };
	    return BreadcrumbDirective;
	}());
	exports.BreadcrumbDirective = BreadcrumbDirective;
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
	        angular.element(window).bind('resize', function () {
	            scope.overflowMenuOpen = false;
	            scope.toggleItemVisibility(elem.prop('offsetWidth'), elem);
	        });
	        angular.element(document).ready(function () {
	            scope.loadMenuItems(angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')));
	            scope.toggleItemVisibility(elem.prop('offsetWidth'), elem);
	        });
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
	        scope.toggleItemVisibility = function (parentWidth, commandBarItem) {
	            if (window.innerWidth < 640 && scope.mobileSwitch === false) {
	                scope.loadMenuItems(angular.element(commandBarItem[0].querySelectorAll('.ms-CommandBarItem')));
	                scope.mobileSwitch = true;
	            }
	            else if (window.innerWidth >= 640 && scope.mobileSwitch === true) {
	                scope.loadMenuItems(angular.element(commandBarItem[0].querySelectorAll('.ms-CommandBarItem')));
	                scope.mobileSwitch = false;
	            }
	            angular.forEach(scope.commandItems, function (element) {
	                if (element.offset >= parentWidth - 200) {
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
	            scope.$apply();
	        };
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
	            isDisabled: '=?disabled',
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
	            '<label class="ms-Label">{{uifLabel}}</label>' +
	            '<i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>' +
	            '<input class="ms-TextField-field" type="text" placeholder="{{placeholder}}">' +
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
	            uifLabel: '@',
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
	        if (!$scope.uifLabel) {
	            $scope.uifLabel = 'Start Date';
	        }
	        if (!$scope.placeholder) {
	            $scope.placeholder = 'Select a date';
	        }
	        $scope.monthsArray = $scope.uifMonths.split(',');
	        if ($scope.monthsArray.length !== 12) {
	            throw 'Months setting should have 12 months, separated by a comma';
	        }
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var overlayModeEnum_ts_1 = __webpack_require__(26);
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
/* 26 */
/***/ function(module, exports) {

	'use strict';
	(function (OverlayMode) {
	    OverlayMode[OverlayMode["light"] = 0] = "light";
	    OverlayMode[OverlayMode["dark"] = 1] = "dark";
	})(exports.OverlayMode || (exports.OverlayMode = {}));
	var OverlayMode = exports.OverlayMode;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var sizeEnum_1 = __webpack_require__(28);
	var placeholderEnum_1 = __webpack_require__(29);
	var personaStyleEnum_1 = __webpack_require__(30);
	var personaPresenceEnum_1 = __webpack_require__(31);
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
	    ;
	    PersonaCardActionDirective.factory = function () {
	        var directive = function ($log) { return new PersonaCardActionDirective($log); };
	        directive.$inject = ['$log'];
	        return directive;
	    };
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
/* 28 */
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
/* 29 */
/***/ function(module, exports) {

	'use strict';
	(function (PlaceholderEnum) {
	    PlaceholderEnum[PlaceholderEnum["regular"] = 0] = "regular";
	    PlaceholderEnum[PlaceholderEnum["topright"] = 1] = "topright";
	    PlaceholderEnum[PlaceholderEnum["overflow"] = 2] = "overflow";
	})(exports.PlaceholderEnum || (exports.PlaceholderEnum = {}));
	var PlaceholderEnum = exports.PlaceholderEnum;


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	(function (PersonaStyleEnum) {
	    PersonaStyleEnum[PersonaStyleEnum["round"] = 0] = "round";
	    PersonaStyleEnum[PersonaStyleEnum["square"] = 1] = "square";
	})(exports.PersonaStyleEnum || (exports.PersonaStyleEnum = {}));
	var PersonaStyleEnum = exports.PersonaStyleEnum;


/***/ },
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var personaStyleEnum_1 = __webpack_require__(30);
	var personaPresenceEnum_1 = __webpack_require__(31);
	var personaInitialsColorEnum_1 = __webpack_require__(33);
	var sizeEnum_1 = __webpack_require__(34);
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
/* 33 */
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
/* 34 */
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
/* 35 */
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
/* 36 */
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
	}());
	exports.SearchBoxDirective = SearchBoxDirective;
	exports.module = ng.module('officeuifabric.components.searchbox', ['officeuifabric.components'])
	    .directive('uifSearchbox', SearchBoxDirective.factory());


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var spinnerSizeEnum_1 = __webpack_require__(38);
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
/* 38 */
/***/ function(module, exports) {

	'use strict';
	(function (SpinnerSize) {
	    SpinnerSize[SpinnerSize['small'] = 0] = 'small';
	    SpinnerSize[SpinnerSize['large'] = 1] = 'large';
	})(exports.SpinnerSize || (exports.SpinnerSize = {}));
	var SpinnerSize = exports.SpinnerSize;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var tableRowSelectModeEnum_1 = __webpack_require__(40);
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
	}());
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
	}());
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
	}());
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
	}());
	exports.TableHeaderDirective = TableHeaderDirective;
	exports.module = ng.module('officeuifabric.components.table', ['officeuifabric.components'])
	    .directive('uifTable', TableDirective.factory())
	    .directive('uifTableRow', TableRowDirective.factory())
	    .directive('uifTableRowSelect', TableRowSelectDirective.factory())
	    .directive('uifTableCell', TableCellDirective.factory())
	    .directive('uifTableHeader', TableHeaderDirective.factory());


/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	(function (TableRowSelectModeEnum) {
	    TableRowSelectModeEnum[TableRowSelectModeEnum["none"] = 0] = "none";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["single"] = 1] = "single";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["multiple"] = 2] = "multiple";
	})(exports.TableRowSelectModeEnum || (exports.TableRowSelectModeEnum = {}));
	var TableRowSelectModeEnum = exports.TableRowSelectModeEnum;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var TextFieldDirective = (function () {
	    function TextFieldDirective() {
	        this.template = '<div ng-class="{\'is-active\': isActive, \'ms-TextField\': true, ' +
	            '\'ms-TextField--underlined\': uifUnderlined, \'ms-TextField--placeholder\': placeholder, ' +
	            '\'is-required\': required, \'is-disabled\': disabled}">' +
	            '<label ng-show="labelShown" class="ms-Label">{{uifLabel || placeholder}}</label>' +
	            '<input ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" class="ms-TextField-field" />' +
	            '<span class="ms-TextField-description">{{uifDescription}}</span>' +
	            '</div>';
	        this.scope = {
	            ngModel: '=?',
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
	        scope.required = 'required' in attrs;
	        scope.disabled = 'disabled' in attrs;
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
/* 42 */
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
	}());
	exports.ToggleDirective = ToggleDirective;
	exports.module = ng.module('officeuifabric.components.toggle', [
	    'officeuifabric.components'
	])
	    .directive('uifToggle', ToggleDirective.factory());


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var orgChartPresenceEnum_1 = __webpack_require__(44);
	var orgChartStyleEnum_1 = __webpack_require__(45);
	var orgChartSelectModeEnum_1 = __webpack_require__(46);
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
/* 44 */
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
/* 45 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartStyleEnum) {
	    OrgChartStyleEnum[OrgChartStyleEnum["standard"] = 0] = "standard";
	    OrgChartStyleEnum[OrgChartStyleEnum["square"] = 1] = "square";
	})(exports.OrgChartStyleEnum || (exports.OrgChartStyleEnum = {}));
	var OrgChartStyleEnum = exports.OrgChartStyleEnum;


/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartSelectModeEnum) {
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["single"] = 0] = "single";
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["multiple"] = 1] = "multiple";
	})(exports.OrgChartSelectModeEnum || (exports.OrgChartSelectModeEnum = {}));
	var OrgChartSelectModeEnum = exports.OrgChartSelectModeEnum;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ZTJmMTY2MTM5MWE5ODY1ODk5MCIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVGVtcGxhdGVUeXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvc2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGxhY2Vob2xkZXJFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3BlcnNvbmFTdHlsZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVByZXNlbmNlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3BlcnNvbmFEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvc2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOzs7Ozs7O0FDRkEsZ0Q7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGtDQUFrQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHlDQUF5QztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUMsa0NBQWtDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHNEQUFxRCx3QkFBd0I7QUFDN0U7QUFDQSxpREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0EseUVBQXdFLHdCQUF3QjtBQUNoRztBQUNBLG9FQUFtRSx3QkFBd0I7QUFDM0Y7QUFDQSx5RUFBd0Usd0JBQXdCO0FBQ2hHO0FBQ0Esb0VBQW1FLHdCQUF3QjtBQUMzRjtBQUNBLDBFQUF5RSx3QkFBd0I7QUFDakc7QUFDQSxxRUFBb0Usd0JBQXdCO0FBQzVGO0FBQ0Esc0VBQXFFLHdCQUF3QjtBQUM3RjtBQUNBLGlFQUFnRSx3QkFBd0I7QUFDeEY7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHlDQUF5QztBQUM5RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0RBQXdEO0FBQ3pEO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGdFQUFnRTtBQUNqRTtBQUNBOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxxQ0FBcUM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsZ0RBQStDLGdDQUFnQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW1FLGdCQUFnQjtBQUNuRix5QkFBd0I7QUFDeEIsMkZBQTBGO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGtEQUFrRDtBQUNuRDs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0RBQW9EO0FBQ3JEOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLE9BQU8sdUNBQXVDLFNBQVMsV0FBVyxPQUFPO0FBQ25HLGtEQUFpRCxhQUFhLG9CQUFvQixjQUFjO0FBQ2hHLDRCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2Q0FBNkM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDBEQUEwRDtBQUMzRDtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxrQ0FBa0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEhBQXlILHFMQUFxTCxxQkFBcUIscUlBQXFJLGlGQUFpRjtBQUN6aEI7QUFDQTtBQUNBLHNDQUFxQyx3Q0FBd0M7QUFDN0U7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwWUFBeVk7QUFDelk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2Qyw4Q0FBOEM7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLG9EQUFvRDtBQUNqRztBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsc0NBQXNDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSwwSkFBeUoscURBQXFEO0FBQzlNO0FBQ0EsaUhBQWdILHFEQUFxRDtBQUNySztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5Qyw4Q0FBOEM7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QixVQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxrQ0FBaUMsd0NBQXdDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLDhHQUE4RztBQUN2SjtBQUNBLHdDQUF1QyxVQUFVO0FBQ2pEO0FBQ0EsMkVBQTBFLGFBQWE7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBd0UsdUJBQXVCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBLHlCQUF3QjtBQUN4QixtRUFBa0U7QUFDbEUsNEJBQTJCLFFBQVE7QUFDbkMsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF3RCw0QkFBNEIsS0FBSyx1QkFBdUI7QUFDaEg7QUFDQSwrQkFBOEI7QUFDOUIsZ0VBQStEO0FBQy9EO0FBQ0EsMkJBQTBCLE1BQU0sSUFBSSxNQUFNO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsa0NBQWtDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0I7QUFDeEI7QUFDQSxrRUFBaUU7QUFDakUsdUNBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXdFLG9EQUFvRDtBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0RBQXdEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDhFQUE4RTtBQUMvRTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1RUFBdUU7QUFDL0Y7QUFDQSxnREFBK0MsZUFBZTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsdURBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyw0Q0FBNEM7QUFDN0M7QUFDQTs7Ozs7OztBQ3hWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDZCQUE2QjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLFVBQVU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNEJBQTRCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3T0FBdU8sU0FBUztBQUNoUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDBDQUEwQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLHlHQUF3Ryx5RUFBeUU7QUFDakwsNEhBQTJILDBCQUEwQjtBQUNySjtBQUNBO0FBQ0EsMENBQXlDLHNDQUFzQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb09BQW1PLGFBQWE7QUFDaFA7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLDRCQUE0QjtBQUN6RTtBQUNBO0FBQ0EsOENBQTZDLDRCQUE0QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNEQsMENBQTBDO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLGtDQUFrQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxrREFBa0Q7QUFDbkQ7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQsYUFBYTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxhQUFhO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsMkNBQTJDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUMsNkNBQTZDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhDQUE4QztBQUNuRjtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EO0FBQ0E7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQywwREFBMEQ7QUFDM0Q7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsNERBQTREO0FBQzdEOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0RBQW9EO0FBQ3JEO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBZ0YsVUFBVTtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQsYUFBYTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0VBQW9FO0FBQ3JFO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEwRCxTQUFTO0FBQ25FO0FBQ0E7QUFDQSx1RUFBc0UsZ0NBQWdDO0FBQ3RHO0FBQ0Esa0VBQWlFLGdCQUFnQjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsNENBQTRDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUE4RCx1QkFBdUI7QUFDckY7QUFDQSxzQ0FBcUMsc0JBQXNCO0FBQzNELHVEQUFzRCxzQkFBc0I7QUFDNUUsMkVBQTBFLGFBQWE7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkJBQTZCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLHVCQUF1QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBMkU7QUFDM0U7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyx3RUFBd0U7QUFDekU7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5QztBQUN6QztBQUNBLG1FQUFrRTtBQUNsRSw2REFBNEQseUJBQXlCO0FBQ3JGO0FBQ0EsdURBQXNELGdCQUFnQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLE9BQU87QUFDakQsNEJBQTJCLE9BQU87QUFDbEMscURBQW9ELGFBQWE7QUFDakUsb0RBQW1ELFlBQVk7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDBDQUEwQztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUMsMkNBQTJDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyx1QkFBdUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtMQUE4TCxPQUFPO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx1Q0FBdUM7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywyQ0FBMkM7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2Q0FBNkM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLG9FQUFvRTtBQUNyRTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyw4REFBOEQ7QUFDL0Q7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0VBQXdFO0FBQ3pFIiwiZmlsZSI6Im5nT2ZmaWNlVWlGYWJyaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpIDogZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOGUyZjE2NjEzOTFhOTg2NTg5OTBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29yZScsIFtdKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9jb3JlLnRzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGJyZWFkY3J1bWJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZScpO1xudmFyIGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbkRpcmVjdGl2ZScpO1xudmFyIGNhbGxvdXRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZScpO1xudmFyIGNob2ljZWZpZWxkTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZERpcmVjdGl2ZScpO1xudmFyIGNvbW1hbmRCYXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZScpO1xudmFyIGNvbnRlbnRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbnRlbnQvY29udGVudERpcmVjdGl2ZScpO1xudmFyIGNvbnRleHR1YWxNZW51TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudScpO1xudmFyIGRhdGVwaWNrZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZScpO1xudmFyIGRpYWxvZ01vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZScpO1xudmFyIGRyb3Bkb3duTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZScpO1xudmFyIGljb25Nb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZScpO1xudmFyIGxhYmVsTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZScpO1xudmFyIGxpbmtNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2xpbmsvbGlua0RpcmVjdGl2ZScpO1xudmFyIG5hdkJhck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZScpO1xudmFyIG92ZXJsYXlNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheURpcmVjdGl2ZScpO1xudmFyIHBlcnNvbmFjYXJkTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wZXJzb25hY2FyZC9wZXJzb25hY2FyZERpcmVjdGl2ZScpO1xudmFyIHBlcnNvbmFNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZScpO1xudmFyIHByb2dyZXNzSW5kaWNhdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wcm9ncmVzc2luZGljYXRvci9wcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZScpO1xudmFyIHNlYXJjaGJveE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZScpO1xudmFyIHNwaW5uZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lckRpcmVjdGl2ZScpO1xudmFyIHRhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90YWJsZS90YWJsZURpcmVjdGl2ZScpO1xudmFyIHRleHRGaWVsZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZScpO1xudmFyIHRvZ2dsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdG9nZ2xlL3RvZ2dsZURpcmVjdGl2ZScpO1xudmFyIG9yZ0NoYXJ0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydERpcmVjdGl2ZScpO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnLCBbXG4gICAgYnJlYWRjcnVtYk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBidXR0b25Nb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY2FsbG91dE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjaG9pY2VmaWVsZE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb21tYW5kQmFyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNvbnRlbnRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY29udGV4dHVhbE1lbnVNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgZGF0ZXBpY2tlck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkaWFsb2dNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgZHJvcGRvd25Nb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgaWNvbk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBsYWJlbE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBsaW5rTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG5hdkJhck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBvdmVybGF5TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFjYXJkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcHJvZ3Jlc3NJbmRpY2F0b3JNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgc2VhcmNoYm94TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHNwaW5uZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGFibGVNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGV4dEZpZWxkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRvZ2dsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBvcmdDaGFydE1vZHVsZS5tb2R1bGUubmFtZVxuXSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvcmUvY29tcG9uZW50cy50c1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBCcmVhZGNydW1iTGlua0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmQnJlYWRjcnVtYic7XG4gICAgfVxuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBCcmVhZGNydW1iTGlua0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlID0gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmU7XG52YXIgQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJDb250cm9sbGVyKCRjb21waWxlKSB7XG4gICAgICAgIHRoaXMuJGNvbXBpbGUgPSAkY29tcGlsZTtcbiAgICB9XG4gICAgQnJlYWRjcnVtYkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGNvbXBpbGUnXTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iQ29udHJvbGxlciA9IEJyZWFkY3J1bWJDb250cm9sbGVyO1xudmFyIEJyZWFkY3J1bWJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUJyZWFkY3J1bWJcIj48L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBCcmVhZGNydW1iQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ3VpZkJyZWFkY3J1bWInO1xuICAgIH1cbiAgICBCcmVhZGNydW1iRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQnJlYWRjcnVtYkRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRyaWJ1dGVzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKHRyYW5zY2x1ZGVkRWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGJyZWFkY3J1bWJMaXN0ID0gYW5ndWxhci5lbGVtZW50KCc8dWw+PC91bD4nKTtcbiAgICAgICAgICAgIGJyZWFkY3J1bWJMaXN0LmFkZENsYXNzKCdtcy1CcmVhZGNydW1iLWxpc3QnKTtcbiAgICAgICAgICAgIHZhciB0YWJJbmRleCA9IDE7XG4gICAgICAgICAgICB2YXIgYnJlYWRjcnVtYkxpbmtzID0gdHJhbnNjbHVkZWRFbGVtZW50O1xuICAgICAgICAgICAgZm9yICh2YXIgYmNMaW5rSW5kZXggPSAwOyBiY0xpbmtJbmRleCA8IHRyYW5zY2x1ZGVkRWxlbWVudC5sZW5ndGg7IGJjTGlua0luZGV4KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluayA9IGFuZ3VsYXIuZWxlbWVudChicmVhZGNydW1iTGlua3NbYmNMaW5rSW5kZXhdKTtcbiAgICAgICAgICAgICAgICBpZiAobGlua1swXS5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGxpRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPGxpPjwvbGk+Jyk7XG4gICAgICAgICAgICAgICAgbGlFbGVtZW50LmFkZENsYXNzKCdtcy1CcmVhZGNydW1iLWxpc3RJdGVtJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7XG4gICAgICAgICAgICAgICAgYUVsZW1lbnQuYWRkQ2xhc3MoJ21zLUJyZWFkY3J1bWItaXRlbUxpbmsnKTtcbiAgICAgICAgICAgICAgICBhRWxlbWVudC5hdHRyKCd0YWJpbmRleCcsICsrdGFiSW5kZXgpO1xuICAgICAgICAgICAgICAgIGFFbGVtZW50LmF0dHIoJ2hyZWYnLCBsaW5rLmF0dHIoJ25nLWhyZWYnKSk7XG4gICAgICAgICAgICAgICAgYUVsZW1lbnQuYXBwZW5kKGxpbmtbMF0uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICBsaUVsZW1lbnQuYXBwZW5kKGFFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB2YXIgaWNvbkVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoXCI8aT48L2k+XCIpO1xuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmFkZENsYXNzKCdtcy1CcmVhZGNydW1iLWNoZXZyb24gbXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHQnKTtcbiAgICAgICAgICAgICAgICBsaUVsZW1lbnQuYXBwZW5kKGljb25FbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhZGNydW1iTGlzdC5hcHBlbmQobGlFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvdmVyZmxvd0RpdiA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgIG92ZXJmbG93RGl2LmFkZENsYXNzKCdtcy1CcmVhZGNydW1iLW92ZXJmbG93Jyk7XG4gICAgICAgICAgICB2YXIgb3ZlcmZsb3dCdXR0b25EaXYgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICBvdmVyZmxvd0J1dHRvbkRpdi5hZGRDbGFzcygnbXMtQnJlYWRjcnVtYi1vdmVyZmxvd0J1dHRvbiBtcy1JY29uIG1zLUljb24tLWVsbGlwc2lzJyk7XG4gICAgICAgICAgICBvdmVyZmxvd0J1dHRvbkRpdi5hdHRyKCd0YWJpbmRleCcsICcxJyk7XG4gICAgICAgICAgICBvdmVyZmxvd0Rpdi5hcHBlbmQob3ZlcmZsb3dCdXR0b25EaXYpO1xuICAgICAgICAgICAgdmFyIGlJY29uID0gYW5ndWxhci5lbGVtZW50KCc8aT48L2k+Jyk7XG4gICAgICAgICAgICBpSWNvbi5hZGRDbGFzcygnbXMtQnJlYWRjcnVtYi1jaGV2cm9uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0Jyk7XG4gICAgICAgICAgICBvdmVyZmxvd0Rpdi5hcHBlbmQoaUljb24pO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZChvdmVyZmxvd0Rpdik7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYXBwZW5kKGJyZWFkY3J1bWJMaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJEaXJlY3RpdmUgPSBCcmVhZGNydW1iRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnJlYWRjcnVtYicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJyZWFkY3J1bWInLCBCcmVhZGNydW1iRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCcmVhZGNydW1iTGluaycsIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGJ1dHRvblR5cGVFbnVtX3RzXzEgPSByZXF1aXJlKCcuL2J1dHRvblR5cGVFbnVtLnRzJyk7XG52YXIgYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEgPSByZXF1aXJlKCcuL2J1dHRvblRlbXBsYXRlVHlwZS50cycpO1xudmFyIEJ1dHRvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBCdXR0b25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gQnV0dG9uQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgQnV0dG9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCdXR0b25EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge307XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IEJ1dHRvbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ2J1dHRvbic7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zID0ge307XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZCgkYXR0cnMudWlmVHlwZSkgJiYgbmcuaXNVbmRlZmluZWQoYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVskYXR0cnMudWlmVHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uIC0gVW5zdXBwb3J0ZWQgYnV0dG9uOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBidXR0b24gKFxcJycgKyAkYXR0cnMudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnMudWlmVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLnByaW1hcnldOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmcuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5wcmltYXJ5QnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlMaW5rXTtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5jb21tYW5kXTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5nLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZEJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kTGlua107XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uY29tcG91bmRdOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmcuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZEJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmhlcm9dOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmcuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5oZXJvQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9MaW5rXTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmcuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25CdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uTGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BvcHVsYXRlSHRtbFRlbXBsYXRlcygpO1xuICAgIH1cbiAgICBCdXR0b25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgQnV0dG9uRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rLFxuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBkaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlR5cGUpIHx8XG4gICAgICAgICAgICBhdHRycy51aWZUeXBlID09PSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0ucHJpbWFyeV0gfHxcbiAgICAgICAgICAgIGF0dHJzLnVpZlR5cGUgPT09IGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF0pIHtcbiAgICAgICAgICAgIHZhciBpY29uRWxlbWVudCA9IGVsZW1lbnQuZmluZCgndWlmLWljb24nKTtcbiAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVycy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5idXR0b24gLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0ljb24gbm90IGFsbG93ZWQgaW4gcHJpbWFyeSBvciBjb21wb3VuZCBidXR0b25zOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmltYXJ5ICYgY29tcG91bmQgYnV0dG9uIGRvZXMgbm90IHN1cHBvcnQgaW5jbHVkaW5nIGljb25zIGluIHRoZSBib2R5LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBpY29uIGhhcyBiZWVuIHJlbW92ZWQgYnV0IG1heSBjYXVzZSByZW5kZXJpbmcgZXJyb3JzLiBDb25zaWRlciBidXR0b25zIHRoYXQgc3VwcG9ydCBpY29ucyBzdWNoIGFzIGNvbW1hbmQgb3IgaGVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIHdyYXBwZXI7XG4gICAgICAgICAgICBzd2l0Y2ggKGF0dHJzLnVpZlR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5jb21tYW5kXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdTUEFOJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWxhYmVsJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnVUlGLUlDT04nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24taWNvbicpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uY29tcG91bmRdOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSAhPT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0uY2xhc3NMaXN0WzBdID09PSAnbmctc2NvcGUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWxhYmVsJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5oZXJvXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdTUEFOJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWxhYmVsJykuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnVUlGLUlDT04nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24taWNvbicpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5fcG9wdWxhdGVIdG1sVGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvblxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkxpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvblxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5wcmltYXJ5QnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLXByaW1hcnlcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5wcmltYXJ5TGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tcHJpbWFyeVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbW1hbmRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21tYW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tcG91bmRCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tcG91bmRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tcG91bmRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5oZXJvQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWhlcm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9MaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1oZXJvXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9hPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIEJ1dHRvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkJ1dHRvbkRpcmVjdGl2ZSA9IEJ1dHRvbkRpcmVjdGl2ZTtcbnZhciBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmQnV0dG9uJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtQnV0dG9uLWRlc2NyaXB0aW9uXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICB9XG4gICAgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUgPSBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQnV0dG9uJywgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b25EZXNjcmlwdGlvbicsIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbkRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQnV0dG9uVHlwZUVudW0pIHtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcInByaW1hcnlcIl0gPSAwXSA9IFwicHJpbWFyeVwiO1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wiY29tbWFuZFwiXSA9IDFdID0gXCJjb21tYW5kXCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJjb21wb3VuZFwiXSA9IDJdID0gXCJjb21wb3VuZFwiO1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wiaGVyb1wiXSA9IDNdID0gXCJoZXJvXCI7XG59KShleHBvcnRzLkJ1dHRvblR5cGVFbnVtIHx8IChleHBvcnRzLkJ1dHRvblR5cGVFbnVtID0ge30pKTtcbnZhciBCdXR0b25UeXBlRW51bSA9IGV4cG9ydHMuQnV0dG9uVHlwZUVudW07XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChCdXR0b25UZW1wbGF0ZVR5cGUpIHtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiYWN0aW9uQnV0dG9uXCJdID0gMF0gPSBcImFjdGlvbkJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJhY3Rpb25MaW5rXCJdID0gMV0gPSBcImFjdGlvbkxpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wicHJpbWFyeUJ1dHRvblwiXSA9IDJdID0gXCJwcmltYXJ5QnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcInByaW1hcnlMaW5rXCJdID0gM10gPSBcInByaW1hcnlMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbW1hbmRCdXR0b25cIl0gPSA0XSA9IFwiY29tbWFuZEJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21tYW5kTGlua1wiXSA9IDVdID0gXCJjb21tYW5kTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21wb3VuZEJ1dHRvblwiXSA9IDZdID0gXCJjb21wb3VuZEJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21wb3VuZExpbmtcIl0gPSA3XSA9IFwiY29tcG91bmRMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImhlcm9CdXR0b25cIl0gPSA4XSA9IFwiaGVyb0J1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJoZXJvTGlua1wiXSA9IDldID0gXCJoZXJvTGlua1wiO1xufSkoZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGUgfHwgKGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlID0ge30pKTtcbnZhciBCdXR0b25UZW1wbGF0ZVR5cGUgPSBleHBvcnRzLkJ1dHRvblRlbXBsYXRlVHlwZTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVGVtcGxhdGVUeXBlLnRzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGNhbGxvdXRUeXBlRW51bV8xID0gcmVxdWlyZSgnLi9jYWxsb3V0VHlwZUVudW0nKTtcbnZhciBjYWxsb3V0QXJyb3dFbnVtXzEgPSByZXF1aXJlKCcuL2NhbGxvdXRBcnJvd0VudW0nKTtcbnZhciBDYWxsb3V0Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FsbG91dENvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBDYWxsb3V0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuICAgIHJldHVybiBDYWxsb3V0Q29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXRDb250cm9sbGVyID0gQ2FsbG91dENvbnRyb2xsZXI7XG52YXIgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1oZWFkZXJcIj48cCBjbGFzcz1cIm1zLUNhbGxvdXQtdGl0bGVcIiBuZy10cmFuc2NsdWRlPjwvcD48L2Rpdj4nO1xuICAgIH1cbiAgICBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIG1haW5XcmFwcGVyID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLnBhcmVudCgpO1xuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKG1haW5XcmFwcGVyKSAmJiBtYWluV3JhcHBlci5oYXNDbGFzcygnbXMtQ2FsbG91dC1tYWluJykpIHtcbiAgICAgICAgICAgIHZhciBkZXRhY2hlZEhlYWRlciA9IGluc3RhbmNlRWxlbWVudC5kZXRhY2goKTtcbiAgICAgICAgICAgIG1haW5XcmFwcGVyLnByZXBlbmQoZGV0YWNoZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXRIZWFkZXJEaXJlY3RpdmUgPSBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlO1xudmFyIENhbGxvdXRDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1jb250ZW50XCI+PHAgY2xhc3M9XCJtcy1DYWxsb3V0LXN1YlRleHRcIiBuZy10cmFuc2NsdWRlPjwvcD48L2Rpdj4nO1xuICAgIH1cbiAgICBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dENvbnRlbnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0Q29udGVudERpcmVjdGl2ZSA9IENhbGxvdXRDb250ZW50RGlyZWN0aXZlO1xudmFyIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1hY3Rpb25zXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXj91aWZDYWxsb3V0JztcbiAgICB9XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNhbGxvdXRDb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChuZy5pc09iamVjdChjYWxsb3V0Q29udHJvbGxlcikpIHtcbiAgICAgICAgICAgIGNhbGxvdXRDb250cm9sbGVyLiRzY29wZS4kd2F0Y2goJ2hhc1NlcGFyYXRvcicsIGZ1bmN0aW9uIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzU2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25DaGlsZHJlbiA9IGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGJ1dHRvbkluZGV4ID0gMDsgYnV0dG9uSW5kZXggPCBhY3Rpb25DaGlsZHJlbi5sZW5ndGg7IGJ1dHRvbkluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhY3Rpb25DaGlsZHJlbi5lcShidXR0b25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uYWRkQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uU3BhbnMgPSBhY3Rpb24uZmluZCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgc3BhbkluZGV4ID0gMDsgc3BhbkluZGV4IDwgYWN0aW9uU3BhbnMubGVuZ3RoOyBzcGFuSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFuID0gYWN0aW9uU3BhbnMuZXEoc3BhbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uU3Bhbi5oYXNDbGFzcygnbXMtQnV0dG9uLWxhYmVsJykgfHwgYWN0aW9uU3Bhbi5oYXNDbGFzcygnbXMtQnV0dG9uLWljb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TcGFuLmFkZENsYXNzKCdtcy1DYWxsb3V0LWFjdGlvblRleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUgPSBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZTtcbnZhciBDYWxsb3V0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dCBtcy1DYWxsb3V0LS1hcnJvd3t7YXJyb3dEaXJlY3Rpb259fVwiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLUNhbGxvdXQtLWFjdGlvblRleHRcXCc6IGhhc1NlcGFyYXRvciwgXFwnbXMtQ2FsbG91dC0tT09CRVxcJzogdWlmVHlwZT09XFwnb29iZVxcJywnICtcbiAgICAgICAgICAgICcgXFwnbXMtQ2FsbG91dC0tUGVla1xcJzogdWlmVHlwZT09XFwncGVla1xcJywgXFwnbXMtQ2FsbG91dC0tY2xvc2VcXCc6IGNsb3NlQnV0dG9ufVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LW1haW5cIj48ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1pbm5lclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZDYWxsb3V0J107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ1Nob3c6ICc9PycsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ2FsbG91dENvbnRyb2xsZXI7XG4gICAgfVxuICAgIENhbGxvdXREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgY2FsbG91dENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3VpZlR5cGUnLCBmdW5jdGlvbiAoY2FsbG91dFR5cGUpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChjYWxsb3V0VHlwZUVudW1fMS5DYWxsb3V0VHlwZVtjYWxsb3V0VHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGNhbGxvdXRUeXBlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiBJdCBzaG91bGQgYmUgb29iZSBvciBwZWVrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWF0dHJzLnVpZkFycm93KSB7XG4gICAgICAgICAgICBzY29wZS5hcnJvd0RpcmVjdGlvbiA9ICdMZWZ0JztcbiAgICAgICAgfVxuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndWlmQXJyb3cnLCBmdW5jdGlvbiAoYXR0ckFycm93RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoY2FsbG91dEFycm93RW51bV8xLkNhbGxvdXRBcnJvd1thdHRyQXJyb3dEaXJlY3Rpb25dKSkge1xuICAgICAgICAgICAgICAgIGNhbGxvdXRDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNhbGxvdXQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyQXJyb3dEaXJlY3Rpb24gKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZkFycm93LiBJdCBzaG91bGQgYmUgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjYXBpdGFsaXplZERpcmVjdGlvbiA9IChhdHRyQXJyb3dEaXJlY3Rpb24uY2hhckF0KDApKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY2FwaXRhbGl6ZWREaXJlY3Rpb24gKz0gKGF0dHJBcnJvd0RpcmVjdGlvbi5zbGljZSgxKSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHNjb3BlLmFycm93RGlyZWN0aW9uID0gY2FwaXRhbGl6ZWREaXJlY3Rpb247XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5oYXNTZXBhcmF0b3IgPSAoIW5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkFjdGlvblRleHQpIHx8ICFuZy5pc1VuZGVmaW5lZChhdHRycy51aWZTZXBhcmF0b3IpKTtcbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZChhdHRycy51aWZDbG9zZSkpIHtcbiAgICAgICAgICAgIHNjb3BlLmNsb3NlQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBjbG9zZUJ1dHRvbkVsZW1lbnQgPSBuZy5lbGVtZW50KCc8YnV0dG9uIGNsYXNzPVwibXMtQ2FsbG91dC1jbG9zZVwiIHR5cGU9XCJidXR0b25cIj4nICtcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXhcIj48L2k+JyArXG4gICAgICAgICAgICAgICAgJzwvYnV0dG9uPicpO1xuICAgICAgICAgICAgdmFyIGNhbGxvdXREaXYgPSBpbnN0YW5jZUVsZW1lbnQuZmluZCgnZGl2JykuZXEoMCk7XG4gICAgICAgICAgICBjYWxsb3V0RGl2LmFwcGVuZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgICAgICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5iaW5kKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBzY29wZS5pc01vdXNlT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5iaW5kKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBzY29wZS5pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ25nU2hvdycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpc0Nsb3NpbmdCeUJ1dHRvbkNsaWNrID0gIW5ld1ZhbHVlICYmIHNjb3BlLmNsb3NlQnV0dG9uQ2xpY2tlZDtcbiAgICAgICAgICAgIGlmIChpc0Nsb3NpbmdCeUJ1dHRvbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IHNjb3BlLmlzTW91c2VPdmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc01vdXNlT3ZlcicsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICAgaWYgKCFuZXdWYWwgJiYgb2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29wZS5jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENhbGxvdXREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0RGlyZWN0aXZlID0gQ2FsbG91dERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNhbGxvdXQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0JywgQ2FsbG91dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEhlYWRlcicsIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRDb250ZW50JywgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRBY3Rpb25zJywgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXREaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKENhbGxvdXRUeXBlKSB7XG4gICAgQ2FsbG91dFR5cGVbQ2FsbG91dFR5cGVbXCJvb2JlXCJdID0gMF0gPSBcIm9vYmVcIjtcbiAgICBDYWxsb3V0VHlwZVtDYWxsb3V0VHlwZVtcInBlZWtcIl0gPSAxXSA9IFwicGVla1wiO1xufSkoZXhwb3J0cy5DYWxsb3V0VHlwZSB8fCAoZXhwb3J0cy5DYWxsb3V0VHlwZSA9IHt9KSk7XG52YXIgQ2FsbG91dFR5cGUgPSBleHBvcnRzLkNhbGxvdXRUeXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dFR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChDYWxsb3V0QXJyb3cpIHtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wibGVmdFwiXSA9IDBdID0gXCJsZWZ0XCI7XG4gICAgQ2FsbG91dEFycm93W0NhbGxvdXRBcnJvd1tcInJpZ2h0XCJdID0gMV0gPSBcInJpZ2h0XCI7XG4gICAgQ2FsbG91dEFycm93W0NhbGxvdXRBcnJvd1tcInRvcFwiXSA9IDJdID0gXCJ0b3BcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wiYm90dG9tXCJdID0gM10gPSBcImJvdHRvbVwiO1xufSkoZXhwb3J0cy5DYWxsb3V0QXJyb3cgfHwgKGV4cG9ydHMuQ2FsbG91dEFycm93ID0ge30pKTtcbnZhciBDYWxsb3V0QXJyb3cgPSBleHBvcnRzLkNhbGxvdXRBcnJvdztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGNob2ljZWZpZWxkVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vY2hvaWNlZmllbGRUeXBlRW51bScpO1xudmFyIENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2hvaWNlRmllbGRcIj4nICtcbiAgICAgICAgICAgICc8aW5wdXQgaWQ9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkLWlucHV0XCIgdHlwZT1cInt7dWlmVHlwZX19XCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIiAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy10cnVlLXZhbHVlPVwie3tuZ1RydWVWYWx1ZX19XCIgbmctZmFsc2UtdmFsdWU9XCJ7e25nRmFsc2VWYWx1ZX19XCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZC1maWVsZFwiPjxzcGFuIGNsYXNzPVwibXMtTGFiZWxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj48L2xhYmVsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRPcHRpb24nLCAnXj91aWZDaG9pY2VmaWVsZEdyb3VwJ107XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0ZhbHNlVmFsdWU6ICdAJyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCcsXG4gICAgICAgICAgICB2YWx1ZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IHRlbXBsYXRlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICBpZiAoISgnbmdNb2RlbCcgaW4gdGVtcGxhdGVBdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignbmctbW9kZWwnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2hvaWNlZmllbGRUeXBlRW51bV8xLkNob2ljZWZpZWxkVHlwZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jaG9pY2VmaWVsZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZFR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHJlbmRlcl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGVja2VkID0gKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmdldFZpZXdWYWx1ZSgpID09PSBhdHRycy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmFkZFJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndmFsdWUnLCByZW5kZXJfMSk7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAub24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnJlbW92ZVJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzO1xuICAgICAgICB2YXIgcGFyZW50U2NvcGUgPSBzY29wZS4kcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgIGRpc2FibGVkID0gZGlzYWJsZWQgfHwgKHBhcmVudFNjb3BlICE9IG51bGwgJiYgcGFyZW50U2NvcGUuZGlzYWJsZWQpO1xuICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlID0gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXAtdGl0bGVcIj48bmctdHJhbnNjbHVkZSAvPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbnZhciBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLnJlbmRlckZucyA9IFtdO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuYWRkUmVuZGVyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRm5zLnB1c2goZm4pO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZVJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5zcGxpY2UodGhpcy5yZW5kZXJGbnMuaW5kZXhPZihmbikpO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnNldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldFZpZXdWYWx1ZSh2YWx1ZSwgZXZlbnRUeXBlKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVuZGVyRm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZuc1tpXSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGluc3RhbmNlQXR0cmlidXRlcywgY3RybHMpIHtcbiAgICAgICAgdmFyIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBtb2RlbENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUubmdNb2RlbCA9IG1vZGVsQ29udHJvbGxlcjtcbiAgICAgICAgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIuaW5pdCgpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gaW5zdGFuY2VBdHRyaWJ1dGVzO1xuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlID0gQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNob2ljZWZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZE9wdGlvbicsIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZEdyb3VwJywgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRHcm91cFRpdGxlJywgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChDaG9pY2VmaWVsZFR5cGUpIHtcbiAgICBDaG9pY2VmaWVsZFR5cGVbQ2hvaWNlZmllbGRUeXBlW1wicmFkaW9cIl0gPSAwXSA9IFwicmFkaW9cIjtcbiAgICBDaG9pY2VmaWVsZFR5cGVbQ2hvaWNlZmllbGRUeXBlW1wiY2hlY2tib3hcIl0gPSAxXSA9IFwiY2hlY2tib3hcIjtcbn0pKGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlIHx8IChleHBvcnRzLkNob2ljZWZpZWxkVHlwZSA9IHt9KSk7XG52YXIgQ2hvaWNlZmllbGRUeXBlID0gZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGU7XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgQ29tbWFuZEJhckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ29tbWFuZEJhclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICB1aWZTZWFyY2hUZXJtOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29tbWFuZEJhckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbW1hbmRCYXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIHNjb3BlLmZvY3VzU2VhcmNoSW5wdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFyU2VhcmNoLWlucHV0JykpWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUuY2xlYXJTZWFyY2hUZXJtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlNlYXJjaFRlcm0gPSBudWxsO1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIENvbW1hbmRCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyRGlyZWN0aXZlID0gQ29tbWFuZEJhckRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoXFxcIiBuZy1jbGFzcz1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9PSB0cnVlID8gJ2lzLWFjdGl2ZScgOiAnJztcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWlucHV0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7JHBhcmVudC5wbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVxcXCIxXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWZvY3VzPVxcXCIkcGFyZW50LmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctYmx1cj1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiJHBhcmVudC51aWZTZWFyY2hUZXJtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbldyYXBwZXIgbXMtQ29tbWFuZEJhclNlYXJjaC1pY29uU2VhcmNoV3JhcHBlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcIiRwYXJlbnQuZm9jdXNTZWFyY2hJbnB1dCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJzZWFyY2hcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWljb25XcmFwcGVyIG1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbkNsZWFyV3JhcHBlciBtcy1mb250LXNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vdXNlZG93bj1cXFwiJHBhcmVudC5jbGVhclNlYXJjaFRlcm0oKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwieFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSA9IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFyLXNpZGVDb21tYW5kc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyLW1haW5BcmVhXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cXFwidWlmU2hvd092ZXJmbG93XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtIG1zLUNvbW1hbmRCYXJJdGVtLS1pY29uT25seSBtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvd1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJvdmVyZmxvd1Zpc2libGUgPT0gdHJ1ZSA/ICdpcy12aXNpYmxlJyA6ICcnO1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJvcGVuT3ZlcmZsb3dNZW51KClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbS1saW5rXFxcIiB0YWJpbmRleD1cXFwiMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcImVsbGlwc2lzXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZTaG93T3ZlcmZsb3c6ICc9J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCR0aW1lb3V0KSB7IHJldHVybiBuZXcgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHNjb3BlLnRvZ2dsZUl0ZW1WaXNpYmlsaXR5KGVsZW0ucHJvcCgnb2Zmc2V0V2lkdGgnKSwgZWxlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJykpKTtcbiAgICAgICAgICAgIHNjb3BlLnRvZ2dsZUl0ZW1WaXNpYmlsaXR5KGVsZW0ucHJvcCgnb2Zmc2V0V2lkdGgnKSwgZWxlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5vcGVuT3ZlcmZsb3dNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9ICFzY29wZS5vdmVyZmxvd01lbnVPcGVuO1xuICAgICAgICAgICAgdmFyIGNvbnRleHR1YWxNZW51O1xuICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgPSBcIiA8dWlmLWNvbnRleHR1YWwtbWVudSBjbGFzcz1cXFwibXMtQ29tbWFuZEJhci1vdmVyZmxvd01lbnVcXFwiXFxuICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwib3ZlcmZsb3dNZW51T3BlblxcXCJcXG4gICAgICAgICAgICAgIHVpZi1jbG9zZS1vbi1jbGljaz1cXFwiZmFsc2VcXFwiPlwiO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93IC5tcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlciB1bCcpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5oaWRkZW5JdGVtcywgZnVuY3Rpb24gKG1lbnVpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lbnVpdGVtLnN1Ym1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gXCI8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIG5nLW1vZGVsPVxcXCJoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPSdvcGVuT3ZlcmZsb3dJdGVtKGhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udGV4dCdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctc2hvdz0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnZpc2libGUnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJzdWJNZW51XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRleHR1YWwtbWVudT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9J29wZW5PdmVyZmxvd0l0ZW0oc3ViaXRlbSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0nc3ViaXRlbS50ZXh0J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcImxpbmtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInN1Yml0ZW0gaW4gaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnN1Ym1lbnVpdGVtcyB0cmFjayBieSAkaW5kZXhcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9IFwiPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbSBuZy1tb2RlbD1cXFwiaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz0nb3Blbk92ZXJmbG93SXRlbShoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0pJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnRleHQnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXNob3c9J2hpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXS52aXNpYmxlJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGlua1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9ICc8Lzx1aWYtY29udGV4dHVhbC1tZW51Pic7XG4gICAgICAgICAgICB2YXIgbWVudTtcbiAgICAgICAgICAgIG1lbnUgPSBlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdyAubXMtQ29tbWFuZEJhckl0ZW0tbGlua1dyYXBwZXInKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChtZW51KS5hcHBlbmQoY3RybC4kY29tcGlsZShjb250ZXh0dWFsTWVudSkoc2NvcGUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUubG9hZE1lbnVJdGVtcyA9IGZ1bmN0aW9uIChjb21tYW5kSXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbVdpZHRoID0gMDtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbUluZGV4ID0gMDtcbiAgICAgICAgICAgIHNjb3BlLmNvbW1hbmRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbW1hbmRJdGVtcywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmhhc0NsYXNzKCdtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdycpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJdGVtV2lkdGggKz0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29tbWFuZEl0ZW1zLnB1c2goeyBpbmRleDogY29tbWFuZEl0ZW1JbmRleCwgb2Zmc2V0OiBjb21tYW5kSXRlbVdpZHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSXRlbUluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLm9wZW5PdmVyZmxvd0l0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGl0ZW0uc3VibWVudS5jaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Ym1lbnVpdGVtO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS50ZXh0ID0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLm1lbnVUeXBlID0gJ2l0ZW0nO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5jaGlsZGl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5pID0gaXRlbS5zdWJtZW51aXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5wYXJlbnQgPSBpdGVtLmk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zLnB1c2goc3VibWVudWl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3RybC4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkaXRlbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtpdGVtLnBhcmVudF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbnRleHR1YWxNZW51LWl0ZW0nKVtpdGVtLmldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG0pLnRyaWdnZXJIYW5kbGVyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbaXRlbS5pXSkudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkgPSBmdW5jdGlvbiAocGFyZW50V2lkdGgsIGNvbW1hbmRCYXJJdGVtKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA2NDAgJiYgc2NvcGUubW9iaWxlU3dpdGNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoYW5ndWxhci5lbGVtZW50KGNvbW1hbmRCYXJJdGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpKSk7XG4gICAgICAgICAgICAgICAgc2NvcGUubW9iaWxlU3dpdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDY0MCAmJiBzY29wZS5tb2JpbGVTd2l0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGFuZ3VsYXIuZWxlbWVudChjb21tYW5kQmFySXRlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKSkpO1xuICAgICAgICAgICAgICAgIHNjb3BlLm1vYmlsZVN3aXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLmNvbW1hbmRJdGVtcywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXQgPj0gcGFyZW50V2lkdGggLSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbZWxlbWVudC5pbmRleF0pLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaGlkZGVuSXRlbXNbZWxlbWVudC5pbmRleF0udmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtlbGVtZW50LmluZGV4XSkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5oaWRkZW5JdGVtc1tlbGVtZW50LmluZGV4XS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhck1haW5EaXJlY3RpdmUgPSBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJNYWluQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkY29tcGlsZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kY29tcGlsZSA9ICRjb21waWxlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIENvbW1hbmRCYXJNYWluQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT3ZlcmZsb3dJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5pID0gdGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWRkZW5JdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH07XG4gICAgQ29tbWFuZEJhck1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckY29tcGlsZScsICckdGltZW91dCddO1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG52YXIgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclwiPicgK1xuICAgICAgICAgICAgJyA8YSBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtcIj4nICtcbiAgICAgICAgICAgICcgPC9hPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmQ29tbWFuZEJhck1haW4nO1xuICAgIH1cbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkl0ZW07XG4gICAgICAgICAgICBoaWRkZW5JdGVtID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9uZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5hZGQoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTmFtZS5pbmRleE9mKCdtcy1mb250LScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0LmFkZCgnbXMtZm9udC1tJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0udGV4dCA9IGNsb25lW2ldLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVTCcgJiYgY2xvbmVbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLnN1Ym1lbnUgPSBjbG9uZVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChoaWRkZW5JdGVtLnN1Ym1lbnUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLm1lbnVUeXBlID0gJ2xpbmsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuSXRlbS5tZW51VHlwZSA9ICdzdWJNZW51JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3RybC5hZGRPdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsgPiB1aWYtaWNvbicpKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbScpKS5hZGRDbGFzcygnbXMtQ29tbWFuZEJhckl0ZW0taGFzVGV4dE9ubHknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSBDb21tYW5kQmFySXRlbURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbW1hbmRiYXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXInLCBDb21tYW5kQmFyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyU2VhcmNoJywgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhckl0ZW0nLCBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhck1haW4nLCBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhclNpZGUnLCBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZW50RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPHNwYW4gY2xhc3M9XFxcInVpZi1jb250ZW50XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcbiAgICB9XG4gICAgQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbnRlbnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRlbnREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZW50JztcbiAgICByZXR1cm4gQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRlbnREaXJlY3RpdmUgPSBDb250ZW50RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGVudCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoQ29udGVudERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBNZW51SXRlbVR5cGVzO1xuKGZ1bmN0aW9uIChNZW51SXRlbVR5cGVzKSB7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wibGlua1wiXSA9IDBdID0gXCJsaW5rXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiZGl2aWRlclwiXSA9IDFdID0gXCJkaXZpZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiaGVhZGVyXCJdID0gMl0gPSBcImhlYWRlclwiO1xuICAgIE1lbnVJdGVtVHlwZXNbTWVudUl0ZW1UeXBlc1tcInN1Yk1lbnVcIl0gPSAzXSA9IFwic3ViTWVudVwiO1xufSkoTWVudUl0ZW1UeXBlcyB8fCAoTWVudUl0ZW1UeXBlcyA9IHt9KSk7XG52YXIgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkNvbnRleHR1YWxNZW51JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzRGlzYWJsZWQ6ICc9P2Rpc2FibGVkJyxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICc9P3VpZklzU2VsZWN0ZWQnLFxuICAgICAgICAgICAgb25DbGljazogJyZuZ0NsaWNrJyxcbiAgICAgICAgICAgIHRleHQ6ICc9P3VpZlRleHQnLFxuICAgICAgICAgICAgdHlwZTogJ0B1aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNZW51SXRlbVR5cGVzW3R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIHVuc3VwcG9ydGVkIG1lbnUgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgY29udGV4dCBtZW51LicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBNZW51SXRlbVR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuaXNEaXNhYmxlZCAhPT0gJ2Jvb2xlYW4nICYmICRzY29wZS5pc0Rpc2FibGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2ludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1kaXNhYmxlZFxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgJHNjb3BlLmlzRGlzYWJsZWQgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLWRpc2FibGVkXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gJ2Jvb2xlYW4nICYmICRzY29wZS5pc1NlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2ludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1zZWxlY3RlZFxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLXNlbGVjdGVkXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHR1YWxNZW51Q29udHJvbGxlci5pc011bHRpU2VsZWN0aW9uTWVudSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5kZXNlbGVjdEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCgkc2NvcGUuaXNTZWxlY3RlZCkgJiYgISRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmNsb3NlU3ViTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzUm9vdE1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5jbG9zZVN1Yk1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRzY29wZS5vbkNsaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25DbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtZGVzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtY2xvc2UnLCBmdW5jdGlvbiAoZXZlbnQsIG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAkc2NvcGUuJGlkICE9PSBtZW51SXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGlsZE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5zdWJNZW51XSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rIG1zLUNvbnRleHR1YWxNZW51LWxpbmstLWhhc01lbnVcXFwiXFxuICAgICAgICAgIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1zdWJNZW51SWNvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtY29udGV4dC1zdWJtZW51XFxcIj48L2Rpdj5cXG4gICAgICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua10gPVxuICAgICAgICAgICAgXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cXFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rXFxcIiBuZy1jbGFzcz1cXFwieydpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsICdpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIlxcbiAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+PHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5oZWFkZXJdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtIG1zLUNvbnRleHR1YWxNZW51LWl0ZW0tLWhlYWRlclxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMuZGl2aWRlcl0gPSBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbSBtcy1Db250ZXh0dWFsTWVudS1pdGVtLS1kaXZpZGVyXFxcIj48L2xpPlwiO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQgJiYgISRzY29wZS50ZXh0ICYmICEkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS50eXBlICE9PSAnZGl2aWRlcicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtICcgK1xuICAgICAgICAgICAgICAgICAgICAneW91IG5lZWQgdG8gcHJvdmlkZSBhIHRleHQgZm9yIGEgY29udGV4dHVhbCBtZW51IGl0ZW0uXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT4geW91IG5lZWQgdG8gc3BlY2lmeSBlaXRoZXIgXFwndWlmLXRleHRcXCcgYXMgYXR0cmlidXRlIG9yIDx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgIF90aGlzLmluc2VydFN1Yk1lbnUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0SXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1pdGVtLWNvbnRlbnQnKSk7XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+JyArICRzY29wZS50ZXh0ICsgJzwvc3Bhbj4nKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0U3ViTWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLWNvbnRleHQtc3VibWVudScpKS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRleHR1YWxNZW51SXRlbSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Q2hpbGRNZW51ID0gZnVuY3Rpb24gKGNoaWxkTWVudUN0cmwpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGFzQ2hpbGRNZW51ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGRNZW51Q3RybCA9IGNoaWxkTWVudUN0cmw7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuICAgIHJldHVybiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG52YXIgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8dWwgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51XFxcIiBuZy10cmFuc2NsdWRlPjwvdWw+XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGNsb3NlT25DbGljazogJ0B1aWZDbG9zZU9uQ2xpY2snLFxuICAgICAgICAgICAgaXNPcGVuOiAnPT91aWZJc09wZW4nLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6ICdAdWlmTXVsdGlzZWxlY3QnXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBzZXRDbG9zZU9uQ2xpY2sgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xvc2VPbkNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5jbG9zZU9uQ2xpY2sgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0Q2xvc2VPbkNsaWNrKCRzY29wZS5jbG9zZU9uQ2xpY2spO1xuICAgICAgICAkYXR0cnMuJG9ic2VydmUoJ3VpZkNsb3NlT25DbGljaycsIHNldENsb3NlT25DbGljayk7XG4gICAgICAgIHZhciBwYXJlbnRNZW51SXRlbUN0cmwgPSAkZWxlbWVudC5jb250cm9sbGVyKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZChwYXJlbnRNZW51SXRlbUN0cmwpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51SXRlbUN0cmwuc2V0Q2hpbGRNZW51KGNvbnRleHR1YWxNZW51Q29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZCgkc2NvcGUubXVsdGlzZWxlY3QpICYmICRzY29wZS5tdWx0aXNlbGVjdC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdtcy1Db250ZXh0dWFsTWVudS0tbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51Q29udHJvbGxlcigkc2NvcGUsICRhbmltYXRlLCAkZWxlbWVudCwgJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZCA9IFtdO1xuICAgICAgICB0aGlzLmlzT3BlbkNsYXNzTmFtZSA9ICdpcy1vcGVuJztcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKCRlbGVtZW50LmNvbnRyb2xsZXIoQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpKSkge1xuICAgICAgICAgICAgJHNjb3BlLmlzUm9vdE1lbnUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzT3BlbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Jvb2xlYW4nICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIGludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1vcGVuXFwnLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgXFwnJyArIHR5cGVvZiBuZXdWYWx1ZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBhcyB2YWxpZCB0eXBlIGZvciBcXCd1aWYtaXMtb3BlblxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZXh0dWFsLW1lbnUgLz4uIFRoZSB2YWxpZCB0eXBlIGlzIGJvb2xlYW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkYW5pbWF0ZVtuZXdWYWx1ZSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXSgkZWxlbWVudCwgX3RoaXMuaXNPcGVuQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgX3RoaXMuZGVzZWxlY3RJdGVtcyh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kb24oJ3VpZi1tZW51LWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc1Jvb3RNZW51ICYmICRzY29wZS5jbG9zZU9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vblJvb3RNZW51Q2xvc2VkLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmRlc2VsZWN0SXRlbXMgPSBmdW5jdGlvbiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICBpZiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3VpZi1tZW51LWRlc2VsZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VTdWJNZW51cyA9IGZ1bmN0aW9uIChtZW51SXRlbVRvU2tpcCwgY2xvc2VSb290TWVudSkge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1jbG9zZScsIG1lbnVJdGVtVG9Ta2lwKTtcbiAgICAgICAgaWYgKGNsb3NlUm9vdE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1jbG9zZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSB0cnVlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc1Jvb3RNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXNSb290TWVudTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNNdWx0aVNlbGVjdGlvbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc01lbnVPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnXTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVDb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50c1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuaXNQaWNraW5nWWVhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BpY2tpbmdNb250aHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5qRWxlbWVudCA9ICQoJGVsZW1lbnRbMF0pO1xuICAgICAgICAkc2NvcGUuY3RybCA9IHRoaXM7XG4gICAgfVxuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5yYW5nZSA9IGZ1bmN0aW9uIChtaW4sIG1heCwgc3RlcCkge1xuICAgICAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgICAgICB2YXIgaW5wdXQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IG1pbjsgaSA8PSBtYXg7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgaW5wdXQucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0UGlja2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtVGV4dEZpZWxkLWZpZWxkJykucGlja2FkYXRlKCdwaWNrZXInKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFBpY2tlcigpLnNldCgnc2VsZWN0JywgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZSh2YWx1ZS5nZXRGdWxsWWVhcigpLCB2YWx1ZS5nZXRNb250aCgpLCB2YWx1ZS5nZXREYXRlKCkpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmluaXREYXRlcGlja2VyID0gZnVuY3Rpb24gKG5nTW9kZWwpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1UZXh0RmllbGQtZmllbGQnKS5waWNrYWRhdGUoe1xuICAgICAgICAgICAgY2xlYXI6ICcnLFxuICAgICAgICAgICAgY2xvc2U6ICcnLFxuICAgICAgICAgICAga2xhc3M6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6ICdtcy1EYXRlUGlja2VyLWlucHV0LS1hY3RpdmUnLFxuICAgICAgICAgICAgICAgIGJveDogJ21zLURhdGVQaWNrZXItZGF5UGlja2VyJyxcbiAgICAgICAgICAgICAgICBkYXk6ICdtcy1EYXRlUGlja2VyLWRheScsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdtcy1EYXRlUGlja2VyLWRheS0tZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgIGZvY3VzZWQ6ICdtcy1EYXRlUGlja2VyLXBpY2tlci0tZm9jdXNlZCcsXG4gICAgICAgICAgICAgICAgZnJhbWU6ICdtcy1EYXRlUGlja2VyLWZyYW1lJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdtcy1EYXRlUGlja2VyLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgaG9sZGVyOiAnbXMtRGF0ZVBpY2tlci1ob2xkZXInLFxuICAgICAgICAgICAgICAgIGluZm9jdXM6ICdtcy1EYXRlUGlja2VyLWRheS0taW5mb2N1cycsXG4gICAgICAgICAgICAgICAgaW5wdXQ6ICdtcy1EYXRlUGlja2VyLWlucHV0JyxcbiAgICAgICAgICAgICAgICBtb250aDogJ21zLURhdGVQaWNrZXItbW9udGgnLFxuICAgICAgICAgICAgICAgIG5vdzogJ21zLURhdGVQaWNrZXItZGF5LS10b2RheScsXG4gICAgICAgICAgICAgICAgb3BlbmVkOiAnbXMtRGF0ZVBpY2tlci1waWNrZXItLW9wZW5lZCcsXG4gICAgICAgICAgICAgICAgb3V0Zm9jdXM6ICdtcy1EYXRlUGlja2VyLWRheS0tb3V0Zm9jdXMnLFxuICAgICAgICAgICAgICAgIHBpY2tlcjogJ21zLURhdGVQaWNrZXItcGlja2VyJyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogJ21zLURhdGVQaWNrZXItZGF5LS1zZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgdGFibGU6ICdtcy1EYXRlUGlja2VyLXRhYmxlJyxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5czogJ21zLURhdGVQaWNrZXItd2Vla2RheScsXG4gICAgICAgICAgICAgICAgd3JhcDogJ21zLURhdGVQaWNrZXItd3JhcCcsXG4gICAgICAgICAgICAgICAgeWVhcjogJ21zLURhdGVQaWNrZXIteWVhcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbml0Q3VzdG9tVmlldygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZGF5OiAnJyxcbiAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcGlja2VyID0gdGhpcy5nZXRQaWNrZXIoKTtcbiAgICAgICAgcGlja2VyLm9uKHtcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbFVwKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBwaWNrZXIuZ2V0KCdzZWxlY3QnLCAneXl5eS1tbS1kZCcpO1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRDdXN0b21WaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG1vbnRoQ29udHJvbHMgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLW1vbnRoQ29tcG9uZW50cycpO1xuICAgICAgICB2YXIgJGdvVG9kYXkgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLWdvVG9kYXknKTtcbiAgICAgICAgdmFyICRtb250aFBpY2tlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXItbW9udGhQaWNrZXInKTtcbiAgICAgICAgdmFyICR5ZWFyUGlja2VyID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci15ZWFyUGlja2VyJyk7XG4gICAgICAgIHZhciAkcGlja2VyV3JhcHBlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXItd3JhcCcpO1xuICAgICAgICB2YXIgJHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJG1vbnRoQ29udHJvbHMuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkZ29Ub2RheS5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICRtb250aFBpY2tlci5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICR5ZWFyUGlja2VyLmFwcGVuZFRvKCRwaWNrZXJXcmFwcGVyKTtcbiAgICAgICAgJG1vbnRoQ29udHJvbHMub24oJ2NsaWNrJywgJy5qcy1wcmV2TW9udGgnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykubW9udGggLSAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobnVsbCwgbmV3TW9udGgsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhDb250cm9scy5vbignY2xpY2snLCAnLmpzLW5leHRNb250aCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS5tb250aCArIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShudWxsLCBuZXdNb250aCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLXByZXZZZWFyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciAtIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtbmV4dFllYXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3WWVhciA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyICsgMTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkeWVhclBpY2tlci5vbignY2xpY2snLCAnLmpzLXByZXZEZWNhZGUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3WWVhciA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyIC0gMTA7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1uZXh0RGVjYWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciArIDEwO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRnb1RvZGF5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgJHBpY2tlci5zZXQoJ3NlbGVjdCcsIG5vdyk7XG4gICAgICAgICAgICBzZWxmLmpFbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1waWNraW5nTW9udGhzJykucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1jaGFuZ2VEYXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSBjdXJyZW50RGF0ZS55ZWFyO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gKyQodGhpcykuYXR0cignZGF0YS1tb250aCcpO1xuICAgICAgICAgICAgdmFyIG5ld0RheSA9IGN1cnJlbnREYXRlLmRheTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuakVsZW1lbnQuaGFzQ2xhc3MoJ2lzLXBpY2tpbmdNb250aHMnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuakVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdNb250aHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1jaGFuZ2VEYXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSArJCh0aGlzKS5hdHRyKCdkYXRhLXllYXInKTtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9IGN1cnJlbnREYXRlLm1vbnRoO1xuICAgICAgICAgICAgdmFyIG5ld0RheSA9IGN1cnJlbnREYXRlLmRheTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuakVsZW1lbnQuaGFzQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ1llYXJzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtc2hvd01vbnRoUGlja2VyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmlzUGlja2luZ01vbnRocyA9ICFzZWxmLmlzUGlja2luZ01vbnRocztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtc2hvd1llYXJQaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuaXNQaWNraW5nWWVhcnMgPSAhc2VsZi5pc1BpY2tpbmdZZWFycztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi4kc2NvcGUuaGlnaGxpZ2h0ZWRWYWx1ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zY3JvbGxVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRoaXMuakVsZW1lbnQub2Zmc2V0KCkudG9wIH0sIDM2Nyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlID0gZnVuY3Rpb24gKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpIHtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIGlmIChuZXdZZWFyID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld1llYXIgPSBwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNb250aCA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdNb250aCA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEYXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3RGF5ID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0JykuZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBwaWNrZXIuc2V0KCdoaWdobGlnaHQnLCBbbmV3WWVhciwgbmV3TW9udGgsIG5ld0RheV0pO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWdobGlnaHRlZFZhbHVlID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gRGF0ZXBpY2tlckNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EYXRlcGlja2VyQ29udHJvbGxlciA9IERhdGVwaWNrZXJDb250cm9sbGVyO1xudmFyIERhdGVwaWNrZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyXFwnOiB0cnVlLCBcXCdpcy1waWNraW5nWWVhcnNcXCc6IGN0cmwuaXNQaWNraW5nWWVhcnMsIFxcJ2lzLXBpY2tpbmdNb250aHNcXCc6IGN0cmwuaXNQaWNraW5nTW9udGhzfVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1UZXh0RmllbGRcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgY2xhc3M9XCJtcy1MYWJlbFwiPnt7dWlmTGFiZWx9fTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWV2ZW50IG1zLUljb24gbXMtSWNvbi0tZXZlbnRcIj48L2k+JyArXG4gICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW1vbnRoQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0TW9udGgganMtbmV4dE1vbnRoXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLXByZXZNb250aCBqcy1wcmV2TW9udGhcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvbkxlZnRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWhlYWRlclRvZ2dsZVZpZXcganMtc2hvd01vbnRoUGlja2VyXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLWdvVG9kYXkganMtZ29Ub2RheVwiPkdvIHRvIHRvZGF5PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW1vbnRoUGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItaGVhZGVyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXIteWVhckNvbXBvbmVudHNcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbmV4dFllYXIganMtbmV4dFllYXJcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldlllYXIganMtcHJldlllYXJcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvbkxlZnRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWN1cnJlbnRZZWFyIGpzLXNob3dZZWFyUGlja2VyXCI+e3toaWdobGlnaHRlZFZhbHVlLnllYXJ9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW9wdGlvbkdyaWRcIiA+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0PVwibW9udGggaW4gbW9udGhzQXJyYXlcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLURhdGVQaWNrZXItbW9udGhPcHRpb24ganMtY2hhbmdlRGF0ZVxcJzogdHJ1ZSwgJyArXG4gICAgICAgICAgICAnXFwnaXMtaGlnaGxpZ2h0ZWRcXCc6IGhpZ2hsaWdodGVkVmFsdWUubW9udGggPT0gJGluZGV4fVwiJyArXG4gICAgICAgICAgICAnZGF0YS1tb250aD1cInt7JGluZGV4fX1cIj4nICtcbiAgICAgICAgICAgICd7e21vbnRofX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXIteWVhclBpY2tlclwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWRlY2FkZUNvbXBvbmVudHNcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbmV4dERlY2FkZSBqcy1uZXh0RGVjYWRlXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLXByZXZEZWNhZGUganMtcHJldkRlY2FkZVwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItY3VycmVudERlY2FkZVwiPnt7aGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyIC0gMTB9fSAtIHt7aGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyfX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1vcHRpb25HcmlkXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlci15ZWFyT3B0aW9uIGpzLWNoYW5nZURhdGVcXCc6IHRydWUsJyArXG4gICAgICAgICAgICAnXFwnaXMtaGlnaGxpZ2h0ZWRcXCc6IGhpZ2hsaWdodGVkVmFsdWUueWVhciA9PSB5ZWFyfVwiICcgK1xuICAgICAgICAgICAgJ25nLXJlcGVhdD1cInllYXIgaW4gY3RybC5yYW5nZShoaWdobGlnaHRlZFZhbHVlLnllYXIgLSAxMCwgaGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyKVwiJyArXG4gICAgICAgICAgICAnZGF0YS15ZWFyPVwie3t5ZWFyfX1cIj57e3llYXJ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEYXRlcGlja2VyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICB1aWZMYWJlbDogJ0AnLFxuICAgICAgICAgICAgdWlmTW9udGhzOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZEYXRlcGlja2VyJywgJz9uZ01vZGVsJ107XG4gICAgfVxuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEYXRlcGlja2VyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rLFxuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGluc3RhbmNlQXR0cmlidXRlcywgY3RybHMpIHtcbiAgICAgICAgaWYgKCEkc2NvcGUudWlmTW9udGhzKSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmTW9udGhzID0gJ0phbiwgRmViLCBNYXIsIEFwciwgTWF5LCBKdW4sIEp1bCwgQXVnLCBTZXAsIE9jdCwgTm92LCBEZWMnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghJHNjb3BlLnVpZkxhYmVsKSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmTGFiZWwgPSAnU3RhcnQgRGF0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEkc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICRzY29wZS5wbGFjZWhvbGRlciA9ICdTZWxlY3QgYSBkYXRlJztcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUubW9udGhzQXJyYXkgPSAkc2NvcGUudWlmTW9udGhzLnNwbGl0KCcsJyk7XG4gICAgICAgIGlmICgkc2NvcGUubW9udGhzQXJyYXkubGVuZ3RoICE9PSAxMikge1xuICAgICAgICAgICAgdGhyb3cgJ01vbnRocyBzZXR0aW5nIHNob3VsZCBoYXZlIDEyIG1vbnRocywgc2VwYXJhdGVkIGJ5IGEgY29tbWEnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIGRhdGVwaWNrZXJDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBuZ01vZGVsID0gY3RybHNbMV07XG4gICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLmluaXREYXRlcGlja2VyKG5nTW9kZWwpO1xuICAgICAgICBuZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gJycgJiYgdHlwZW9mIG5nTW9kZWwuJG1vZGVsVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZ01vZGVsLiRtb2RlbFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKG5nTW9kZWwuJG1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkYXRlcGlja2VyQ29udHJvbGxlci5zZXRWYWx1ZShkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLnNldFZhbHVlKG5nTW9kZWwuJG1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBEYXRlcGlja2VyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGF0ZXBpY2tlckRpcmVjdGl2ZSA9IERhdGVwaWNrZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kYXRlcGlja2VyJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEYXRlcGlja2VyJywgRGF0ZXBpY2tlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgZGlhbG9nRW51bXNfdHNfMSA9IHJlcXVpcmUoJy4vZGlhbG9nRW51bXMudHMnKTtcbnZhciBEaWFsb2dDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dDb250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgRGlhbG9nQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIERpYWxvZ0NvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dDb250cm9sbGVyID0gRGlhbG9nQ29udHJvbGxlcjtcbnZhciBEaWFsb2dEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRGlhbG9nQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nXCInICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cInsgXFwnbXMtRGlhbG9nLS1jbG9zZVxcJzogdWlmQ2xvc2U9PVxcJ3RydWVcXCcnICtcbiAgICAgICAgICAgICcsIFxcJ21zLURpYWxvZy0tbGdIZWFkZXJcXCc6IHVpZlR5cGU9PVxcJ2hlYWRlclxcJycgK1xuICAgICAgICAgICAgJywgXFwnbXMtRGlhbG9nLS1tdWx0aWxpbmVcXCc6IHVpZlR5cGU9PVxcJ211bHRpbGluZVxcJyB9XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1vdmVybGF5IHVpZi1tb2RlPVwie3t1aWZPdmVybGF5fX1cIj48L3VpZi1vdmVybGF5PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctbWFpblwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkNsb3NlOiAnQCcsXG4gICAgICAgICAgICB1aWZPdmVybGF5OiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhbG9nRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEaWFsb2dEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG5ld1ZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlhbG9nRW51bXNfdHNfMS5EaWFsb2dUeXBlRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZyAtIFVuc3VwcG9ydGVkIHR5cGU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nRGlyZWN0aXZlID0gRGlhbG9nRGlyZWN0aXZlO1xudmFyIERpYWxvZ0hlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nSGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXl51aWZEaWFsb2cnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctaGVhZGVyXCI+JyArXG4gICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cIiRwYXJlbnQudWlmQ2xvc2VcIiBjbGFzcz1cIm1zLURpYWxvZy1idXR0b24gbXMtRGlhbG9nLWJ1dHRvbi0tY2xvc2VcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgRGlhbG9nSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nSGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nSGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nSGVhZGVyRGlyZWN0aXZlID0gRGlhbG9nSGVhZGVyRGlyZWN0aXZlO1xudmFyIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1jb250ZW50XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nQ29udGVudERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0NvbnRlbnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dDb250ZW50RGlyZWN0aXZlID0gRGlhbG9nQ29udGVudERpcmVjdGl2ZTtcbnZhciBEaWFsb2dJbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nSW5uZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1pbm5lclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgRGlhbG9nSW5uZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dJbm5lckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0lubmVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nSW5uZXJEaXJlY3RpdmUgPSBEaWFsb2dJbm5lckRpcmVjdGl2ZTtcbnZhciBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxwIGNsYXNzPVwibXMtRGlhbG9nLXN1YlRleHRcIiBuZy10cmFuc2NsdWRlPjwvcD4nO1xuICAgIH1cbiAgICBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nU3VidGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ1N1YnRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlID0gRGlhbG9nU3VidGV4dERpcmVjdGl2ZTtcbnZhciBEaWFsb2dBY3Rpb25zQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBEaWFsb2dBY3Rpb25zQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXIgPSBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcjtcbnZhciBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWFjdGlvbnNcIj48ZGl2IG5nLWNsYXNzPVwieyBcXCdtcy1EaWFsb2ctYWN0aW9uc1JpZ2h0XFwnOiB1aWZQb3NpdGlvbj09XFwncmlnaHRcXCd9XCI+JyArXG4gICAgICAgICAgICAnPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPjwvZGl2PjwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZQb3NpdGlvbjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlBvc2l0aW9uJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAobmV3VmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dFbnVtc190c18xLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kaWFsb2cgLSBVbnN1cHBvcnRlZCB0eXBlOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIChcXCcnICsgc2NvcGUudWlmUG9zaXRpb24gKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZSA9IERpYWxvZ0FjdGlvbnNEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kaWFsb2cnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2cnLCBEaWFsb2dEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0hlYWRlcicsIERpYWxvZ0hlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nQ29udGVudCcsIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0lubmVyJywgRGlhbG9nSW5uZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ1N1YnRleHQnLCBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dBY3Rpb25zJywgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChEaWFsb2dUeXBlRW51bSkge1xuICAgIERpYWxvZ1R5cGVFbnVtW0RpYWxvZ1R5cGVFbnVtW1wibm9uZVwiXSA9IDBdID0gXCJub25lXCI7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJoZWFkZXJcIl0gPSAxXSA9IFwiaGVhZGVyXCI7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJtdWx0aWxpbmVcIl0gPSAyXSA9IFwibXVsdGlsaW5lXCI7XG59KShleHBvcnRzLkRpYWxvZ1R5cGVFbnVtIHx8IChleHBvcnRzLkRpYWxvZ1R5cGVFbnVtID0ge30pKTtcbnZhciBEaWFsb2dUeXBlRW51bSA9IGV4cG9ydHMuRGlhbG9nVHlwZUVudW07XG4oZnVuY3Rpb24gKERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0pIHtcbiAgICBEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW0RpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW0RpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bXCJsZWZ0XCJdID0gMV0gPSBcImxlZnRcIjtcbiAgICBEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW0RpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bXCJyaWdodFwiXSA9IDJdID0gXCJyaWdodFwiO1xufSkoZXhwb3J0cy5EaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtIHx8IChleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gPSB7fSkpO1xudmFyIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gPSBleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25PcHRpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxpIGNsYXNzPVwibXMtRHJvcGRvd24taXRlbVwiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkRyb3Bkb3duJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgZHJvcGRvd25Db250cm9sbGVyLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmICghZHJvcGRvd25Db250cm9sbGVyKSB7XG4gICAgICAgICAgICB0aHJvdyAnRHJvcGRvd24gY29udHJvbGxlciBub3QgZm91bmQhJztcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLnNldFZpZXdWYWx1ZShpbnN0YW5jZUVsZW1lbnQuZmluZCgnc3BhbicpLmh0bWwoKSwgYXR0cnMudmFsdWUsIGV2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gRHJvcGRvd25PcHRpb25EaXJlY3RpdmU7XG52YXIgRHJvcGRvd25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bkNvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSwgJGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgIH1cbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLiRzY29wZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmlzT3BlbiA9ICFzZWxmLiRzY29wZS5pc09wZW47XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3duV2lkdGggPSBhbmd1bGFyLmVsZW1lbnQodGhpcy5xdWVyeVNlbGVjdG9yKCcubXMtRHJvcGRvd24nKSlbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KHRoaXMucXVlcnlTZWxlY3RvcignLm1zLURyb3Bkb3duLWl0ZW1zJykpWzBdLnN0eWxlLndpZHRoID0gZHJvcGRvd25XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kc2NvcGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudENsaWNrSGFuZGxlcl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGRvY3VtZW50Lm9mZignY2xpY2snLCBkb2N1bWVudENsaWNrSGFuZGxlcl8xKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZG9jdW1lbnQub24oJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBzZWxmLiRlbGVtZW50LmZpbmQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBvcHRpb24uZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHNlbGYuJHNjb3BlLm5nTW9kZWwuJHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9IGFuZ3VsYXIuZWxlbWVudChvcHRpb24pLmZpbmQoJ3NwYW4nKS5odG1sKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLnNlbGVjdGVkVGl0bGUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLnNldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICh0aXRsZSwgdmFsdWUsIGV2ZW50VHlwZSkge1xuICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldFZpZXdWYWx1ZSh2YWx1ZSwgZXZlbnRUeXBlKTtcbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRzY29wZScsICckZG9jdW1lbnQnXTtcbiAgICByZXR1cm4gRHJvcGRvd25Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuRHJvcGRvd25Db250cm9sbGVyID0gRHJvcGRvd25Db250cm9sbGVyO1xudmFyIERyb3Bkb3duRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsaWNrPVwiZHJvcGRvd25DbGlja1wiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLURyb3Bkb3duXFwnIDogdHJ1ZSwgXFwnaXMtb3BlblxcJzogaXNPcGVuLCBcXCdpcy1kaXNhYmxlZFxcJzogZGlzYWJsZWR9XCIgdGFiaW5kZXg9XCIwXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1jYXJldERvd24gbXMtSWNvbiBtcy1JY29uLS1jYXJldERvd25cIj48L2k+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1Ecm9wZG93bi10aXRsZVwiPnt7c2VsZWN0ZWRUaXRsZX19PC9zcGFuPjx1bCBjbGFzcz1cIm1zLURyb3Bkb3duLWl0ZW1zXCI+PG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPjwvdWw+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZEcm9wZG93bicsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge307XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERyb3Bkb3duQ29udHJvbGxlcjtcbiAgICB9XG4gICAgRHJvcGRvd25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEcm9wZG93bkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRHJvcGRvd25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEcm9wZG93bkRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBpbnN0YW5jZUF0dHJpYnV0ZXMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBkcm9wZG93bkNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuaW5pdCgpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gaW5zdGFuY2VBdHRyaWJ1dGVzO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRHJvcGRvd25EaXJlY3RpdmUgPSBEcm9wZG93bkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRyb3Bkb3duJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bk9wdGlvbicsIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEcm9wZG93bicsIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd25EaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGljb25FbnVtXzEgPSByZXF1aXJlKCcuL2ljb25FbnVtJyk7XG52YXIgSWNvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEljb25Db250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgSWNvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBJY29uQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgSWNvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSWNvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0te3t1aWZUeXBlfX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBJY29uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnaWNvbic7XG4gICAgfVxuICAgIEljb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBJY29uRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1bGUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaWNvbkVudW1fMS5JY29uRW51bVtuZXdWYWx1bGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmljb24gLSBVbnN1cHBvcnRlZCBpY29uOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBpY29uIChcXCcnICsgc2NvcGUudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIEljb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5JY29uRGlyZWN0aXZlID0gSWNvbkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmljb24nLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkljb24nLCBJY29uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoSWNvbkVudW0pIHtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFsZXJ0XCJdID0gMF0gPSBcImFsZXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydDJcIl0gPSAxXSA9IFwiYWxlcnQyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydE91dGxpbmVcIl0gPSAyXSA9IFwiYWxlcnRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25cIl0gPSAzXSA9IFwiYXJyb3dEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd24yXCJdID0gNF0gPSBcImFycm93RG93bjJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93bkxlZnRcIl0gPSA1XSA9IFwiYXJyb3dEb3duTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duUmlnaHRcIl0gPSA2XSA9IFwiYXJyb3dEb3duUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93TGVmdFwiXSA9IDddID0gXCJhcnJvd0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93UmlnaHRcIl0gPSA4XSA9IFwiYXJyb3dSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcFwiXSA9IDldID0gXCJhcnJvd1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwMlwiXSA9IDEwXSA9IFwiYXJyb3dVcDJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBMZWZ0XCJdID0gMTFdID0gXCJhcnJvd1VwTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcFJpZ2h0XCJdID0gMTJdID0gXCJhcnJvd1VwUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFzY2VuZGluZ1wiXSA9IDEzXSA9IFwiYXNjZW5kaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhdFwiXSA9IDE0XSA9IFwiYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImF0dGFjaG1lbnRcIl0gPSAxNV0gPSBcImF0dGFjaG1lbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJhZ1wiXSA9IDE2XSA9IFwiYmFnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiYWxsb29uXCJdID0gMTddID0gXCJiYWxsb29uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiZWxsXCJdID0gMThdID0gXCJiZWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib2FyZHNcIl0gPSAxOV0gPSBcImJvYXJkc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9sZFwiXSA9IDIwXSA9IFwiYm9sZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9va21hcmtcIl0gPSAyMV0gPSBcImJvb2ttYXJrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib29rc1wiXSA9IDIyXSA9IFwiYm9va3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJyaWVmY2FzZVwiXSA9IDIzXSA9IFwiYnJpZWZjYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJidW5kbGVcIl0gPSAyNF0gPSBcImJ1bmRsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FrZVwiXSA9IDI1XSA9IFwiY2FrZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJcIl0gPSAyNl0gPSBcImNhbGVuZGFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhckRheVwiXSA9IDI3XSA9IFwiY2FsZW5kYXJEYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyUHVibGljXCJdID0gMjhdID0gXCJjYWxlbmRhclB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJXZWVrXCJdID0gMjldID0gXCJjYWxlbmRhcldlZWtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyV29ya1dlZWtcIl0gPSAzMF0gPSBcImNhbGVuZGFyV29ya1dlZWtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbWVyYVwiXSA9IDMxXSA9IFwiY2FtZXJhXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJcIl0gPSAzMl0gPSBcImNhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duXCJdID0gMzNdID0gXCJjYXJldERvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93bkxlZnRcIl0gPSAzNF0gPSBcImNhcmV0RG93bkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93bk91dGxpbmVcIl0gPSAzNV0gPSBcImNhcmV0RG93bk91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93blJpZ2h0XCJdID0gMzZdID0gXCJjYXJldERvd25SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRMZWZ0XCJdID0gMzddID0gXCJjYXJldExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0TGVmdE91dGxpbmVcIl0gPSAzOF0gPSBcImNhcmV0TGVmdE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0UmlnaHRcIl0gPSAzOV0gPSBcImNhcmV0UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0UmlnaHRPdXRsaW5lXCJdID0gNDBdID0gXCJjYXJldFJpZ2h0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcFwiXSA9IDQxXSA9IFwiY2FyZXRVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcExlZnRcIl0gPSA0Ml0gPSBcImNhcmV0VXBMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwT3V0bGluZVwiXSA9IDQzXSA9IFwiY2FyZXRVcE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBSaWdodFwiXSA9IDQ0XSA9IFwiY2FyZXRVcFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJ0XCJdID0gNDVdID0gXCJjYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXRcIl0gPSA0Nl0gPSBcImNhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhcnRcIl0gPSA0N10gPSBcImNoYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGF0XCJdID0gNDhdID0gXCJjaGF0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGF0QWRkXCJdID0gNDldID0gXCJjaGF0QWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja1wiXSA9IDUwXSA9IFwiY2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94XCJdID0gNTFdID0gXCJjaGVja2JveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hDaGVja1wiXSA9IDUyXSA9IFwiY2hlY2tib3hDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hFbXB0eVwiXSA9IDUzXSA9IFwiY2hlY2tib3hFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hNaXhlZFwiXSA9IDU0XSA9IFwiY2hlY2tib3hNaXhlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tQZW9wbGVcIl0gPSA1NV0gPSBcImNoZWNrUGVvcGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uRG93blwiXSA9IDU2XSA9IFwiY2hldnJvbkRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25MZWZ0XCJdID0gNTddID0gXCJjaGV2cm9uTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblJpZ2h0XCJdID0gNThdID0gXCJjaGV2cm9uUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zRG93blwiXSA9IDU5XSA9IFwiY2hldnJvbnNEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc0xlZnRcIl0gPSA2MF0gPSBcImNoZXZyb25zTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNSaWdodFwiXSA9IDYxXSA9IFwiY2hldnJvbnNSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNVcFwiXSA9IDYyXSA9IFwiY2hldnJvbnNVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrRG93blwiXSA9IDYzXSA9IFwiY2hldnJvblRoaWNrRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrTGVmdFwiXSA9IDY0XSA9IFwiY2hldnJvblRoaWNrTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrUmlnaHRcIl0gPSA2NV0gPSBcImNoZXZyb25UaGlja1JpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tVcFwiXSA9IDY2XSA9IFwiY2hldnJvblRoaWNrVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluRG93blwiXSA9IDY3XSA9IFwiY2hldnJvblRoaW5Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpbkxlZnRcIl0gPSA2OF0gPSBcImNoZXZyb25UaGluTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5SaWdodFwiXSA9IDY5XSA9IFwiY2hldnJvblRoaW5SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5VcFwiXSA9IDcwXSA9IFwiY2hldnJvblRoaW5VcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblVwXCJdID0gNzFdID0gXCJjaGV2cm9uVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVwiXSA9IDcyXSA9IFwiY2lyY2xlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsXCJdID0gNzNdID0gXCJjaXJjbGVCYWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsb29uc1wiXSA9IDc0XSA9IFwiY2lyY2xlQmFsbG9vbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNhclwiXSA9IDc1XSA9IFwiY2lyY2xlQ2FyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDYXRcIl0gPSA3Nl0gPSBcImNpcmNsZUNhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ29mZmVlXCJdID0gNzddID0gXCJjaXJjbGVDb2ZmZWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZURvZ1wiXSA9IDc4XSA9IFwiY2lyY2xlRG9nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVFbXB0eVwiXSA9IDc5XSA9IFwiY2lyY2xlRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxcIl0gPSA4MF0gPSBcImNpcmNsZUZpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxlZFwiXSA9IDgxXSA9IFwiY2lyY2xlRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVIYWxmRmlsbGVkXCJdID0gODJdID0gXCJjaXJjbGVIYWxmRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVJbmZvXCJdID0gODNdID0gXCJjaXJjbGVJbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVMaWdodG5pbmdcIl0gPSA4NF0gPSBcImNpcmNsZUxpZ2h0bmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGlsbFwiXSA9IDg1XSA9IFwiY2lyY2xlUGlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGxhbmVcIl0gPSA4Nl0gPSBcImNpcmNsZVBsYW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQbHVzXCJdID0gODddID0gXCJjaXJjbGVQbHVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQb29kbGVcIl0gPSA4OF0gPSBcImNpcmNsZVBvb2RsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlVW5maWxsZWRcIl0gPSA4OV0gPSBcImNpcmNsZVVuZmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc05vdGVib29rXCJdID0gOTBdID0gXCJjbGFzc05vdGVib29rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc3Jvb21cIl0gPSA5MV0gPSBcImNsYXNzcm9vbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xvY2tcIl0gPSA5Ml0gPSBcImNsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbHV0dGVyXCJdID0gOTNdID0gXCJjbHV0dGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb2ZmZWVcIl0gPSA5NF0gPSBcImNvZmZlZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29sbGFwc2VcIl0gPSA5NV0gPSBcImNvbGxhcHNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb25mbGljdFwiXSA9IDk2XSA9IFwiY29uZmxpY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RcIl0gPSA5N10gPSBcImNvbnRhY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RGb3JtXCJdID0gOThdID0gXCJjb250YWN0Rm9ybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdFB1YmxpY1wiXSA9IDk5XSA9IFwiY29udGFjdFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29weVwiXSA9IDEwMF0gPSBcImNvcHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNyZWRpdENhcmRcIl0gPSAxMDFdID0gXCJjcmVkaXRDYXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjcmVkaXRDYXJkT3V0bGluZVwiXSA9IDEwMl0gPSBcImNyZWRpdENhcmRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkYXNoYm9hcmRcIl0gPSAxMDNdID0gXCJkYXNoYm9hcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRlc2NlbmRpbmdcIl0gPSAxMDRdID0gXCJkZXNjZW5kaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXNrdG9wXCJdID0gMTA1XSA9IFwiZGVza3RvcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGV2aWNlV2lwZVwiXSA9IDEwNl0gPSBcImRldmljZVdpcGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRpYWxwYWRcIl0gPSAxMDddID0gXCJkaWFscGFkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkaXJlY3Rpb25zXCJdID0gMTA4XSA9IFwiZGlyZWN0aW9uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRcIl0gPSAxMDldID0gXCJkb2N1bWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRBZGRcIl0gPSAxMTBdID0gXCJkb2N1bWVudEFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRGb3J3YXJkXCJdID0gMTExXSA9IFwiZG9jdW1lbnRGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudExhbmRzY2FwZVwiXSA9IDExMl0gPSBcImRvY3VtZW50TGFuZHNjYXBlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFBERlwiXSA9IDExM10gPSBcImRvY3VtZW50UERGXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFJlcGx5XCJdID0gMTE0XSA9IFwiZG9jdW1lbnRSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9jdW1lbnRzXCJdID0gMTE1XSA9IFwiZG9jdW1lbnRzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFNlYXJjaFwiXSA9IDExNl0gPSBcImRvY3VtZW50U2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2dcIl0gPSAxMTddID0gXCJkb2dcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvZ0FsdFwiXSA9IDExOF0gPSBcImRvZ0FsdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG90XCJdID0gMTE5XSA9IFwiZG90XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb3dubG9hZFwiXSA9IDEyMF0gPSBcImRvd25sb2FkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkcm1cIl0gPSAxMjFdID0gXCJkcm1cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRyb3BcIl0gPSAxMjJdID0gXCJkcm9wXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkcm9wZG93blwiXSA9IDEyM10gPSBcImRyb3Bkb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlZGl0Qm94XCJdID0gMTI0XSA9IFwiZWRpdEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZWxsaXBzaXNcIl0gPSAxMjVdID0gXCJlbGxpcHNpc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZW1iZWRcIl0gPSAxMjZdID0gXCJlbWJlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRcIl0gPSAxMjddID0gXCJldmVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRDYW5jZWxcIl0gPSAxMjhdID0gXCJldmVudENhbmNlbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXZlbnRJbmZvXCJdID0gMTI5XSA9IFwiZXZlbnRJbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFJlY3VycmluZ1wiXSA9IDEzMF0gPSBcImV2ZW50UmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFNoYXJlXCJdID0gMTMxXSA9IFwiZXZlbnRTaGFyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXhjbGFtYXRpb25cIl0gPSAxMzJdID0gXCJleGNsYW1hdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZXhwYW5kXCJdID0gMTMzXSA9IFwiZXhwYW5kXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleWVcIl0gPSAxMzRdID0gXCJleWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZhdm9yaXRlc1wiXSA9IDEzNV0gPSBcImZhdm9yaXRlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmF4XCJdID0gMTM2XSA9IFwiZmF4XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZE1haWxcIl0gPSAxMzddID0gXCJmaWVsZE1haWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkTnVtYmVyXCJdID0gMTM4XSA9IFwiZmllbGROdW1iZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkVGV4dFwiXSA9IDEzOV0gPSBcImZpZWxkVGV4dFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRUZXh0Qm94XCJdID0gMTQwXSA9IFwiZmllbGRUZXh0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlRG9jdW1lbnRcIl0gPSAxNDFdID0gXCJmaWxlRG9jdW1lbnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVJbWFnZVwiXSA9IDE0Ml0gPSBcImZpbGVJbWFnZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZVBERlwiXSA9IDE0M10gPSBcImZpbGVQREZcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbHRlclwiXSA9IDE0NF0gPSBcImZpbHRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsdGVyQ2xlYXJcIl0gPSAxNDVdID0gXCJmaWx0ZXJDbGVhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlyc3RBaWRcIl0gPSAxNDZdID0gXCJmaXJzdEFpZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmxhZ1wiXSA9IDE0N10gPSBcImZsYWdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlclwiXSA9IDE0OF0gPSBcImZvbGRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyTW92ZVwiXSA9IDE0OV0gPSBcImZvbGRlck1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbGRlclB1YmxpY1wiXSA9IDE1MF0gPSBcImZvbGRlclB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyU2VhcmNoXCJdID0gMTUxXSA9IFwiZm9sZGVyU2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250Q29sb3JcIl0gPSAxNTJdID0gXCJmb250Q29sb3JcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnREZWNyZWFzZVwiXSA9IDE1M10gPSBcImZvbnREZWNyZWFzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udEluY3JlYXNlXCJdID0gMTU0XSA9IFwiZm9udEluY3JlYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmcm93bnlcIl0gPSAxNTVdID0gXCJmcm93bnlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZ1bGxzY3JlZW5cIl0gPSAxNTZdID0gXCJmdWxsc2NyZWVuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnZWFyXCJdID0gMTU3XSA9IFwiZ2VhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2xhc3Nlc1wiXSA9IDE1OF0gPSBcImdsYXNzZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdsb2JlXCJdID0gMTU5XSA9IFwiZ2xvYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdyYXBoXCJdID0gMTYwXSA9IFwiZ3JhcGhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdyb3VwXCJdID0gMTYxXSA9IFwiZ3JvdXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhlYWRlclwiXSA9IDE2Ml0gPSBcImhlYWRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhcnRcIl0gPSAxNjNdID0gXCJoZWFydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhcnRFbXB0eVwiXSA9IDE2NF0gPSBcImhlYXJ0RW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhpZGVcIl0gPSAxNjVdID0gXCJoaWRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJob21lXCJdID0gMTY2XSA9IFwiaG9tZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5ib3hDaGVja1wiXSA9IDE2N10gPSBcImluYm94Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluZm9cIl0gPSAxNjhdID0gXCJpbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmZvQ2lyY2xlXCJdID0gMTY5XSA9IFwiaW5mb0NpcmNsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaXRhbGljXCJdID0gMTcwXSA9IFwiaXRhbGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJrZXlcIl0gPSAxNzFdID0gXCJrZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxhdGVcIl0gPSAxNzJdID0gXCJsYXRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWZlc2F2ZXJcIl0gPSAxNzNdID0gXCJsaWZlc2F2ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZmVzYXZlckxvY2tcIl0gPSAxNzRdID0gXCJsaWZlc2F2ZXJMb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaWdodEJ1bGJcIl0gPSAxNzVdID0gXCJsaWdodEJ1bGJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZ2h0bmluZ1wiXSA9IDE3Nl0gPSBcImxpZ2h0bmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlua1wiXSA9IDE3N10gPSBcImxpbmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpbmtSZW1vdmVcIl0gPSAxNzhdID0gXCJsaW5rUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0QnVsbGV0c1wiXSA9IDE3OV0gPSBcImxpc3RCdWxsZXRzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0Q2hlY2tcIl0gPSAxODBdID0gXCJsaXN0Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RDaGVja2JveFwiXSA9IDE4MV0gPSBcImxpc3RDaGVja2JveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdEdyb3VwXCJdID0gMTgyXSA9IFwibGlzdEdyb3VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0R3JvdXAyXCJdID0gMTgzXSA9IFwibGlzdEdyb3VwMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdE51bWJlcmVkXCJdID0gMTg0XSA9IFwibGlzdE51bWJlcmVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsb2NrXCJdID0gMTg1XSA9IFwibG9ja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFwiXSA9IDE4Nl0gPSBcIm1haWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxDaGVja1wiXSA9IDE4N10gPSBcIm1haWxDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbERvd25cIl0gPSAxODhdID0gXCJtYWlsRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbEVkaXRcIl0gPSAxODldID0gXCJtYWlsRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbEVtcHR5XCJdID0gMTkwXSA9IFwibWFpbEVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRXJyb3JcIl0gPSAxOTFdID0gXCJtYWlsRXJyb3JcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxPcGVuXCJdID0gMTkyXSA9IFwibWFpbE9wZW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxQYXVzZVwiXSA9IDE5M10gPSBcIm1haWxQYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFB1YmxpY1wiXSA9IDE5NF0gPSBcIm1haWxQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxSZWFkXCJdID0gMTk1XSA9IFwibWFpbFJlYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxTZW5kXCJdID0gMTk2XSA9IFwibWFpbFNlbmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxTeW5jXCJdID0gMTk3XSA9IFwibWFpbFN5bmNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxVbnJlYWRcIl0gPSAxOThdID0gXCJtYWlsVW5yZWFkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYXBNYXJrZXJcIl0gPSAxOTldID0gXCJtYXBNYXJrZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lYWxcIl0gPSAyMDBdID0gXCJtZWFsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZW51XCJdID0gMjAxXSA9IFwibWVudVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVudTJcIl0gPSAyMDJdID0gXCJtZW51MlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVyZ2VcIl0gPSAyMDNdID0gXCJtZXJnZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWV0YWRhdGFcIl0gPSAyMDRdID0gXCJtZXRhZGF0YVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWljcm9waG9uZVwiXSA9IDIwNV0gPSBcIm1pY3JvcGhvbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pbmlhdHVyZXNcIl0gPSAyMDZdID0gXCJtaW5pYXR1cmVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaW51c1wiXSA9IDIwN10gPSBcIm1pbnVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtb2JpbGVcIl0gPSAyMDhdID0gXCJtb2JpbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vbmV5XCJdID0gMjA5XSA9IFwibW9uZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vdmVcIl0gPSAyMTBdID0gXCJtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtdWx0aUNob2ljZVwiXSA9IDIxMV0gPSBcIm11bHRpQ2hvaWNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtdXNpY1wiXSA9IDIxMl0gPSBcIm11c2ljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJuYXZpZ2F0ZVwiXSA9IDIxM10gPSBcIm5hdmlnYXRlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJuZXdcIl0gPSAyMTRdID0gXCJuZXdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5ld3NmZWVkXCJdID0gMjE1XSA9IFwibmV3c2ZlZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVcIl0gPSAyMTZdID0gXCJub3RlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlYm9va1wiXSA9IDIxN10gPSBcIm5vdGVib29rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlRWRpdFwiXSA9IDIxOF0gPSBcIm5vdGVFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlRm9yd2FyZFwiXSA9IDIxOV0gPSBcIm5vdGVGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJub3RlUmVwbHlcIl0gPSAyMjBdID0gXCJub3RlUmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdFJlY3VycmluZ1wiXSA9IDIyMV0gPSBcIm5vdFJlY3VycmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib25saW5lQWRkXCJdID0gMjIyXSA9IFwib25saW5lQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmxpbmVKb2luXCJdID0gMjIzXSA9IFwib25saW5lSm9pblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib29mUmVwbHlcIl0gPSAyMjRdID0gXCJvb2ZSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wib3JnXCJdID0gMjI1XSA9IFwib3JnXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYWdlXCJdID0gMjI2XSA9IFwicGFnZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFpbnRcIl0gPSAyMjddID0gXCJwYWludFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFuZWxcIl0gPSAyMjhdID0gXCJwYW5lbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGFydG5lclwiXSA9IDIyOV0gPSBcInBhcnRuZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhdXNlXCJdID0gMjMwXSA9IFwicGF1c2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlbmNpbFwiXSA9IDIzMV0gPSBcInBlbmNpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlXCJdID0gMjMyXSA9IFwicGVvcGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVBZGRcIl0gPSAyMzNdID0gXCJwZW9wbGVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUNoZWNrXCJdID0gMjM0XSA9IFwicGVvcGxlQ2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUVycm9yXCJdID0gMjM1XSA9IFwicGVvcGxlRXJyb3JcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVBhdXNlXCJdID0gMjM2XSA9IFwicGVvcGxlUGF1c2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZVJlbW92ZVwiXSA9IDIzN10gPSBcInBlb3BsZVJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlU2VjdXJpdHlcIl0gPSAyMzhdID0gXCJwZW9wbGVTZWN1cml0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlU3luY1wiXSA9IDIzOV0gPSBcInBlb3BsZVN5bmNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvblwiXSA9IDI0MF0gPSBcInBlcnNvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uQWRkXCJdID0gMjQxXSA9IFwicGVyc29uQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25SZW1vdmVcIl0gPSAyNDJdID0gXCJwZXJzb25SZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBob25lXCJdID0gMjQzXSA9IFwicGhvbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBob25lQWRkXCJdID0gMjQ0XSA9IFwicGhvbmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBob25lVHJhbnNmZXJcIl0gPSAyNDVdID0gXCJwaG9uZVRyYW5zZmVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlXCJdID0gMjQ2XSA9IFwicGljdHVyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZUFkZFwiXSA9IDI0N10gPSBcInBpY3R1cmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVFZGl0XCJdID0gMjQ4XSA9IFwicGljdHVyZUVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVSZW1vdmVcIl0gPSAyNDldID0gXCJwaWN0dXJlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWxsXCJdID0gMjUwXSA9IFwicGlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGluRG93blwiXSA9IDI1MV0gPSBcInBpbkRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbkxlZnRcIl0gPSAyNTJdID0gXCJwaW5MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbGFjZWhvbGRlclwiXSA9IDI1M10gPSBcInBsYWNlaG9sZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbGFuZVwiXSA9IDI1NF0gPSBcInBsYW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbGF5XCJdID0gMjU1XSA9IFwicGxheVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGx1c1wiXSA9IDI1Nl0gPSBcInBsdXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsdXMyXCJdID0gMjU3XSA9IFwicGx1czJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvaW50SXRlbVwiXSA9IDI1OF0gPSBcInBvaW50SXRlbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9wb3V0XCJdID0gMjU5XSA9IFwicG9wb3V0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb3N0XCJdID0gMjYwXSA9IFwicG9zdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicHJpbnRcIl0gPSAyNjFdID0gXCJwcmludFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicHJvdGVjdGlvbkNlbnRlclwiXSA9IDI2Ml0gPSBcInByb3RlY3Rpb25DZW50ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInF1ZXN0aW9uXCJdID0gMjYzXSA9IFwicXVlc3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInF1ZXN0aW9uUmV2ZXJzZVwiXSA9IDI2NF0gPSBcInF1ZXN0aW9uUmV2ZXJzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVvdGVcIl0gPSAyNjVdID0gXCJxdW90ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmFkaW9CdXR0b25cIl0gPSAyNjZdID0gXCJyYWRpb0J1dHRvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVhY3RpdmF0ZVwiXSA9IDI2N10gPSBcInJlYWN0aXZhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlY2VpcHRDaGVja1wiXSA9IDI2OF0gPSBcInJlY2VpcHRDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdEZvcndhcmRcIl0gPSAyNjldID0gXCJyZWNlaXB0Rm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdFJlcGx5XCJdID0gMjcwXSA9IFwicmVjZWlwdFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWZyZXNoXCJdID0gMjcxXSA9IFwicmVmcmVzaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVsb2FkXCJdID0gMjcyXSA9IFwicmVsb2FkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseVwiXSA9IDI3M10gPSBcInJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseUFsbFwiXSA9IDI3NF0gPSBcInJlcGx5QWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseUFsbEFsdFwiXSA9IDI3NV0gPSBcInJlcGx5QWxsQWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZXBseUFsdFwiXSA9IDI3Nl0gPSBcInJlcGx5QWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyaWJib25cIl0gPSAyNzddID0gXCJyaWJib25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJvb21cIl0gPSAyNzhdID0gXCJyb29tXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzYXZlXCJdID0gMjc5XSA9IFwic2F2ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2NoZWR1bGluZ1wiXSA9IDI4MF0gPSBcInNjaGVkdWxpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNlYXJjaFwiXSA9IDI4MV0gPSBcInNlYXJjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VjdGlvblwiXSA9IDI4Ml0gPSBcInNlY3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNlY3Rpb25zXCJdID0gMjgzXSA9IFwic2VjdGlvbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNldHRpbmdzXCJdID0gMjg0XSA9IFwic2V0dGluZ3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNoYXJlXCJdID0gMjg1XSA9IFwic2hhcmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNoaWVsZFwiXSA9IDI4Nl0gPSBcInNoaWVsZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2l0ZXNcIl0gPSAyODddID0gXCJzaXRlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic21pbGV5XCJdID0gMjg4XSA9IFwic21pbGV5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb2NjZXJcIl0gPSAyODldID0gXCJzb2NjZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvY2lhbExpc3RlbmluZ1wiXSA9IDI5MF0gPSBcInNvY2lhbExpc3RlbmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29ydFwiXSA9IDI5MV0gPSBcInNvcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvcnRMaW5lc1wiXSA9IDI5Ml0gPSBcInNvcnRMaW5lc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3BsaXRcIl0gPSAyOTNdID0gXCJzcGxpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RhclwiXSA9IDI5NF0gPSBcInN0YXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0YXJFbXB0eVwiXSA9IDI5NV0gPSBcInN0YXJFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RvcHdhdGNoXCJdID0gMjk2XSA9IFwic3RvcHdhdGNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdG9yeVwiXSA9IDI5N10gPSBcInN0b3J5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdHlsZVJlbW92ZVwiXSA9IDI5OF0gPSBcInN0eWxlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdWJzY3JpYmVcIl0gPSAyOTldID0gXCJzdWJzY3JpYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1blwiXSA9IDMwMF0gPSBcInN1blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuQWRkXCJdID0gMzAxXSA9IFwic3VuQWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5RdWVzdGlvblwiXSA9IDMwMl0gPSBcInN1blF1ZXN0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdXBwb3J0XCJdID0gMzAzXSA9IFwic3VwcG9ydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFibGVcIl0gPSAzMDRdID0gXCJ0YWJsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFibGV0XCJdID0gMzA1XSA9IFwidGFibGV0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWdcIl0gPSAzMDZdID0gXCJ0YWdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhc2tSZWN1cnJpbmdcIl0gPSAzMDddID0gXCJ0YXNrUmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YXNrc1wiXSA9IDMwOF0gPSBcInRhc2tzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZWFtd29ya1wiXSA9IDMwOV0gPSBcInRlYW13b3JrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZXh0XCJdID0gMzEwXSA9IFwidGV4dFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGV4dEJveFwiXSA9IDMxMV0gPSBcInRleHRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRpbGVcIl0gPSAzMTJdID0gXCJ0aWxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0aW1lbGluZVwiXSA9IDMxM10gPSBcInRpbWVsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b2RheVwiXSA9IDMxNF0gPSBcInRvZGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b2dnbGVcIl0gPSAzMTVdID0gXCJ0b2dnbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZ2dsZU1pZGRsZVwiXSA9IDMxNl0gPSBcInRvZ2dsZU1pZGRsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG91Y2hcIl0gPSAzMTddID0gXCJ0b3VjaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJhc2hcIl0gPSAzMThdID0gXCJ0cmFzaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVEb3duXCJdID0gMzE5XSA9IFwidHJpYW5nbGVEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5RG93blwiXSA9IDMyMF0gPSBcInRyaWFuZ2xlRW1wdHlEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5TGVmdFwiXSA9IDMyMV0gPSBcInRyaWFuZ2xlRW1wdHlMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUVtcHR5UmlnaHRcIl0gPSAzMjJdID0gXCJ0cmlhbmdsZUVtcHR5UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlVcFwiXSA9IDMyM10gPSBcInRyaWFuZ2xlRW1wdHlVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVMZWZ0XCJdID0gMzI0XSA9IFwidHJpYW5nbGVMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZVJpZ2h0XCJdID0gMzI1XSA9IFwidHJpYW5nbGVSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVVcFwiXSA9IDMyNl0gPSBcInRyaWFuZ2xlVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyb3BoeVwiXSA9IDMyN10gPSBcInRyb3BoeVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widW5kZXJsaW5lXCJdID0gMzI4XSA9IFwidW5kZXJsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1bnN1YnNjcmliZVwiXSA9IDMyOV0gPSBcInVuc3Vic2NyaWJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1cGxvYWRcIl0gPSAzMzBdID0gXCJ1cGxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZpZGVvXCJdID0gMzMxXSA9IFwidmlkZW9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZvaWNlbWFpbFwiXSA9IDMzMl0gPSBcInZvaWNlbWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsRm9yd2FyZFwiXSA9IDMzM10gPSBcInZvaWNlbWFpbEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInZvaWNlbWFpbFJlcGx5XCJdID0gMzM0XSA9IFwidm9pY2VtYWlsUmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIndhZmZsZVwiXSA9IDMzNV0gPSBcIndhZmZsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid29ya1wiXSA9IDMzNl0gPSBcIndvcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIndyZW5jaFwiXSA9IDMzN10gPSBcIndyZW5jaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wieFwiXSA9IDMzOF0gPSBcInhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInhDaXJjbGVcIl0gPSAzMzldID0gXCJ4Q2lyY2xlXCI7XG59KShleHBvcnRzLkljb25FbnVtIHx8IChleHBvcnRzLkljb25FbnVtID0ge30pKTtcbnZhciBJY29uRW51bSA9IGV4cG9ydHMuSWNvbkVudW07XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgTGFiZWxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExhYmVsRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxsYWJlbCBjbGFzcz1cIm1zLUxhYmVsXCI+PG5nLXRyYW5zY2x1ZGUvPjwvbGFiZWw+JztcbiAgICB9XG4gICAgTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMYWJlbERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTGFiZWxEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgICBpZiAobmcuaXNEZWZpbmVkKGF0dHJpYnV0ZXMuZGlzYWJsZWQpKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuZmluZCgnbGFiZWwnKS5lcSgwKS5hZGRDbGFzcygnaXMtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmcuaXNEZWZpbmVkKGF0dHJpYnV0ZXMucmVxdWlyZWQpKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuZmluZCgnbGFiZWwnKS5lcSgwKS5hZGRDbGFzcygnaXMtcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExhYmVsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGFiZWxEaXJlY3RpdmUgPSBMYWJlbERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxhYmVsJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGFiZWwnLCBMYWJlbERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2xhYmVsL2xhYmVsRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBMaW5rRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaW5rRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxhIG5nLWhyZWY9XCJ7eyBuZ0hyZWYgfX1cIiBjbGFzcz1cIm1zLUxpbmtcIiBuZy10cmFuc2NsdWRlPjwvYT4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdIcmVmOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICB9XG4gICAgTGlua0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpbmtEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlua0RpcmVjdGl2ZSA9IExpbmtEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saW5rJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaW5rJywgTGlua0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2xpbmsvbGlua0RpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY29udGV4dHVhbE1lbnVfMSA9IHJlcXVpcmUoJy4vLi4vY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUnKTtcbnZhciBOYXZCYXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUub3Blbk1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtZW51VmlzaWJsZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZVttZW51VmlzaWJsZSA/ICdyZW1vdmVDbGFzcycgOiAnYWRkQ2xhc3MnXSh0aGlzLiRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VNb2JpbGVNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICB0aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKHRoaXMuJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlQWxsQ29udGV4dE1lbnVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF2QmFySXRlbXMgPSB0aGlzLiRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1OYXZCYXItaXRlbScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkJhckl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbmdFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KG5hdkJhckl0ZW1zW2ldKTtcbiAgICAgICAgICAgIHZhciBuYXZCYXJJdGVtQ3RybCA9IG5nRWxlbWVudC5jb250cm9sbGVyKE5hdkJhckl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAobmF2QmFySXRlbUN0cmwpIHtcbiAgICAgICAgICAgICAgICBuYXZCYXJJdGVtQ3RybC5jbG9zZUNvbnRleHR1YWxNZW51KCk7XG4gICAgICAgICAgICAgICAgbmF2QmFySXRlbUN0cmwuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLmhpZGVTZWFyY2hUZXh0Qm94ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF2QmFySXRlbXMgPSB0aGlzLiRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1OYXZCYXItaXRlbS0tc2VhcmNoJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2QmFySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZ0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQobmF2QmFySXRlbXNbaV0pO1xuICAgICAgICAgICAgdmFyIG5hdlNlYXJjaEN0cmwgPSBuZ0VsZW1lbnQuY29udHJvbGxlcihOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAobmF2U2VhcmNoQ3RybCkge1xuICAgICAgICAgICAgICAgIG5hdlNlYXJjaEN0cmwuY2xvc2VTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnLCAnJGxvZyddO1xuICAgIHJldHVybiBOYXZCYXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyQ29udHJvbGxlciA9IE5hdkJhckNvbnRyb2xsZXI7XG52YXIgTmF2QmFyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICduYXYnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhci1vcGVuTWVudSBqcy1vcGVuTWVudVxcXCIgbmctY2xpY2s9XFxcIm5hdi5vcGVuTW9iaWxlTWVudSgpXFxcIj5cXG4gICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIm1lbnVcXFwiPjwvdWlmLWljb24+XFxuICAgIDwvZGl2PlxcbiAgICA8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XFxcInt7b3ZlcmxheX19XFxcIiBuZy1jbGljaz1cXFwibmF2LmNsb3NlTW9iaWxlTWVudSgpXFxcIj48L3VpZi1vdmVybGF5PlxcbiAgICA8dWwgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtc1xcXCI+XFxuICAgICAgPGRpdiBjbGFzcz0ndWlmLW5hdi1pdGVtcyc+PC9kaXY+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG92ZXJsYXk6ICdAP3VpZk92ZXJsYXknXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5hdkJhckNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW1zJykpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoY2xvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE5hdkJhckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTmF2QmFyRGlyZWN0aXZlKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZycsICckYW5pbWF0ZScsICckZG9jdW1lbnQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhcic7XG4gICAgTmF2QmFyRGlyZWN0aXZlLm92ZXJsYXlWYWx1ZXMgPSBbJ2xpZ2h0JywgJ2RhcmsnXTtcbiAgICByZXR1cm4gTmF2QmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyRGlyZWN0aXZlID0gTmF2QmFyRGlyZWN0aXZlO1xudmFyIE5hdkJhckl0ZW1UeXBlcztcbihmdW5jdGlvbiAoTmF2QmFySXRlbVR5cGVzKSB7XG4gICAgTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlc1tcImxpbmtcIl0gPSAwXSA9IFwibGlua1wiO1xuICAgIE5hdkJhckl0ZW1UeXBlc1tOYXZCYXJJdGVtVHlwZXNbXCJtZW51XCJdID0gMV0gPSBcIm1lbnVcIjtcbn0pKE5hdkJhckl0ZW1UeXBlcyB8fCAoTmF2QmFySXRlbVR5cGVzID0ge30pKTtcbnZhciBOYXZCYXJJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFySXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIH1cbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VDb250ZXh0dWFsTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuZGVzZWxlY3RJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgIH07XG4gICAgTmF2QmFySXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50J107XG4gICAgcmV0dXJuIE5hdkJhckl0ZW1Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFySXRlbUNvbnRyb2xsZXIgPSBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbnZhciBOYXZCYXJJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJJdGVtRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFySXRlbUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXlwiICsgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpc0Rpc2FibGVkOiAnQD9kaXNhYmxlZCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ0A/dWlmUG9zaXRpb24nLFxuICAgICAgICAgICAgdGV4dDogJz0/dWlmVGV4dCcsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5hdkJhckl0ZW1UeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubmF2YmFyIC0gdW5zdXBwb3J0ZWQgbmF2IGJhciBpdGVtIHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIG5hdiBiYXIgaXRlbS4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgTmF2QmFySXRlbVR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXY+PC9kaXY+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW05hdkJhckl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5hdkJhckNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQoJHNjb3BlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnR5cGUgPSBOYXZCYXJJdGVtVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5oYXNDbGFzcygnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgpLmZpbmQoJ2xpJykucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5jbG9zZUFsbENvbnRleHRNZW51cygpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuaGlkZVNlYXJjaFRleHRCb3goKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAkc2NvcGUuY29udGV4dE1lbnVDdHJsLmlzTWVudU9wZW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXh0TWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICEkc2NvcGUuY29udGV4dE1lbnVDdHJsLmlzTWVudU9wZW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXh0TWVudUN0cmwub3Blbk1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCEkc2NvcGUuaGFzQ2hpbGRNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VNb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAkc2NvcGUuc2VsZWN0SXRlbSk7XG4gICAgICAgICAgICBfdGhpcy50cmFuc2NsdWRlQ2hpbGRzKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKTtcbiAgICAgICAgICAgIHZhciBjb250ZXh0TWVudUN0cmwgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbnRleHR1YWxNZW51JykpXG4gICAgICAgICAgICAgICAgLmNvbnRyb2xsZXIoY29udGV4dHVhbE1lbnVfMS5Db250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0TWVudUN0cmwpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaGFzQ2hpbGRNZW51ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsID0gY29udGV4dE1lbnVDdHJsO1xuICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXh0TWVudUN0cmwub25Sb290TWVudUNsb3NlZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5jbG9zZU1vYmlsZU1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXMubGlua10gPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtXFxcIlxcbiAgICBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWQsICdtcy1OYXZCYXItaXRlbS0tcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ3JpZ2h0J31cXFwiPlxcbiAgICAgIDxhIGNsYXNzPVxcXCJtcy1OYXZCYXItbGlua1xcXCIgaHJlZj1cXFwiXFxcIj48c3BhbiBjbGFzcz0ndWlmLW5hdi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgIDwvbGk+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXMubWVudV0gPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtIG1zLU5hdkJhci1pdGVtLS1oYXNNZW51XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIj5cXG4gICAgICA8YSBjbGFzcz1cXFwibXMtTmF2QmFyLWxpbmtcXFwiIGhyZWY9XFxcIlxcXCI+PHNwYW4gY2xhc3M9J3VpZi1uYXYtaXRlbS1jb250ZW50Jz48L3NwYW4+PC9hPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJtcy1OYXZCYXItY2hldnJvbkRvd24gbXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uRG93blxcXCI+PC9pPlxcbiAgICAgIDxkaXYgY2xhc3M9J3VpZi1zdWJtZW51Jz48L2Rpdj5cXG4gICAgPC9saT5cIjtcbiAgICB9XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBOYXZCYXJJdGVtRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUudHJhbnNjbHVkZUNoaWxkcyA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIHZhciBoYXNDb250ZW50ID0gX3RoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpO1xuICAgICAgICAgICAgaWYgKCFoYXNDb250ZW50ICYmICEkc2NvcGUudGV4dCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhciAtICcgK1xuICAgICAgICAgICAgICAgICAgICAneW91IG5lZWQgdG8gcHJvdmlkZSBhIHRleHQgZm9yIGEgbmF2IGJhciBtZW51IGl0ZW0uXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1uYXYtYmFyLWl0ZW0+IHlvdSBuZWVkIHRvIHNwZWNpZnkgZWl0aGVyIFxcJ3VpZi10ZXh0XFwnIGFzIGF0dHJpYnV0ZSBvciA8dWlmLW5hdi1pdGVtLWNvbnRlbnQ+IGFzIGEgY2hpbGQgZGlyZWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRMaW5rKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgIF90aGlzLmluc2VydE1lbnUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmluc2VydExpbmsgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1uYXYtaXRlbS1jb250ZW50JykpO1xuICAgICAgICBpZiAodGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPicgKyAkc2NvcGUudGV4dCArICc8L3NwYW4+JykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRNZW51ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtc3VibWVudScpKS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaGFzSXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmTmF2QmFySXRlbSc7XG4gICAgcmV0dXJuIE5hdkJhckl0ZW1EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJJdGVtRGlyZWN0aXZlID0gTmF2QmFySXRlbURpcmVjdGl2ZTtcbnZhciBOYXZCYXJTZWFyY2hDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJTZWFyY2hDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICB9XG4gICAgTmF2QmFyU2VhcmNoQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy4kc2NvcGUuc2VhcmNoVGV4dCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKF90aGlzLiRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFuaW1hdGUucmVtb3ZlQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdpcy1zZWxlY3RlZCcpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5hdkJhclNlYXJjaENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRkb2N1bWVudCcsICckYW5pbWF0ZScsICckdGltZW91dCddO1xuICAgIHJldHVybiBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyU2VhcmNoQ29udHJvbGxlciA9IE5hdkJhclNlYXJjaENvbnRyb2xsZXI7XG52YXIgTmF2QmFyU2VhcmNoID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJTZWFyY2goJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbKFwiXlwiICsgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpLCAoXCJcIiArIE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lKV07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvblNlYXJjaENhbGxiYWNrOiAnJj91aWZPblNlYXJjaCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0A/cGxhY2Vob2xkZXInXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtIG1zLU5hdkJhci1pdGVtLS1zZWFyY2ggbXMtdS1oaWRkZW5TbVxcXCIgbmctY2xpY2s9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVRleHRGaWVsZFxcXCIgbmctY2xpY2s9XFxcInNraXBPbkNsaWNrKCRldmVudClcXFwiPlxcbiAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPXt7cGxhY2Vob2xkZXJ9fSBjbGFzcz1cXFwibXMtVGV4dEZpZWxkLWZpZWxkXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1rZXlwcmVzcz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgbmctbW9kZWw9XFxcInNlYXJjaFRleHRcXFwiPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJscywgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIF90aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY3RybHNbMV0uY2xvc2VTZWFyY2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLnNraXBPbkNsaWNrID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmFwcGx5Q3NzQ2xhc3NlcygkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vblNlYXJjaCA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjdHJsc1swXS5jbG9zZUFsbENvbnRleHRNZW51cygpO1xuICAgICAgICAgICAgICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50ICYmICRldmVudC53aGljaCA9PT0gMTMgJiYgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2soeyBzZWFyY2g6ICRzY29wZS5zZWFyY2hUZXh0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmICRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykgJiYgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoQ2FsbGJhY2soeyBzZWFyY2g6ICRzY29wZS5zZWFyY2hUZXh0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUNzc0NsYXNzZXMoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIE5hdkJhclNlYXJjaC5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5hdkJhclNlYXJjaCgkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckZG9jdW1lbnQnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhclNlYXJjaC5wcm90b3R5cGUuYXBwbHlDc3NDbGFzc2VzID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgICAgIGlmICghJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgdGhpcy4kYW5pbWF0ZS5hZGRDbGFzcygkZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtVGV4dEZpZWxkLWZpZWxkJykpWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfVxuICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICB0aGlzLiRhbmltYXRlLmFkZENsYXNzKCRlbGVtZW50LCAnaXMtc2VsZWN0ZWQnKTtcbiAgICB9O1xuICAgIE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhclNlYXJjaCc7XG4gICAgcmV0dXJuIE5hdkJhclNlYXJjaDtcbn0oKSk7XG5leHBvcnRzLk5hdkJhclNlYXJjaCA9IE5hdkJhclNlYXJjaDtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIE5hdkJhckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShOYXZCYXJJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIE5hdkJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFyU2VhcmNoLmRpcmVjdGl2ZU5hbWUsIE5hdkJhclNlYXJjaC5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG92ZXJsYXlNb2RlRW51bV90c18xID0gcmVxdWlyZSgnLi9vdmVybGF5TW9kZUVudW0udHMnKTtcbnZhciBPdmVybGF5Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheUNvbnRyb2xsZXIobG9nKSB7XG4gICAgICAgIHRoaXMubG9nID0gbG9nO1xuICAgIH1cbiAgICBPdmVybGF5Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIE92ZXJsYXlDb250cm9sbGVyO1xufSgpKTtcbnZhciBPdmVybGF5RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVybGF5RGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtT3ZlcmxheVwiIG5nLWNsYXNzPVwie1xcJ21zLU92ZXJsYXktLWRhcmtcXCc6IHVpZk1vZGUgPT0gXFwnZGFya1xcJ31cIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZNb2RlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgT3ZlcmxheURpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIE92ZXJsYXlEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uIChsb2cpIHsgcmV0dXJuIG5ldyBPdmVybGF5RGlyZWN0aXZlKGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPdmVybGF5RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmTW9kZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChvdmVybGF5TW9kZUVudW1fdHNfMS5PdmVybGF5TW9kZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIE92ZXJsYXlEaXJlY3RpdmUubG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vdmVybGF5IC0gVW5zdXBwb3J0ZWQgb3ZlcmxheSBtb2RlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBvdmVybGF5IG1vZGUgKFxcJycgKyBzY29wZS51aWZNb2RlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIE92ZXJsYXlEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PdmVybGF5RGlyZWN0aXZlID0gT3ZlcmxheURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm92ZXJsYXknLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk92ZXJsYXknLCBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3ZlcmxheU1vZGUpIHtcbiAgICBPdmVybGF5TW9kZVtPdmVybGF5TW9kZVtcImxpZ2h0XCJdID0gMF0gPSBcImxpZ2h0XCI7XG4gICAgT3ZlcmxheU1vZGVbT3ZlcmxheU1vZGVbXCJkYXJrXCJdID0gMV0gPSBcImRhcmtcIjtcbn0pKGV4cG9ydHMuT3ZlcmxheU1vZGUgfHwgKGV4cG9ydHMuT3ZlcmxheU1vZGUgPSB7fSkpO1xudmFyIE92ZXJsYXlNb2RlID0gZXhwb3J0cy5PdmVybGF5TW9kZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlNb2RlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc2l6ZUVudW0nKTtcbnZhciBwbGFjZWhvbGRlckVudW1fMSA9IHJlcXVpcmUoJy4vcGxhY2Vob2xkZXJFbnVtJyk7XG52YXIgcGVyc29uYVN0eWxlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hU3R5bGVFbnVtJyk7XG52YXIgcGVyc29uYVByZXNlbmNlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtJyk7XG52YXIgUGVyc29uYUNhcmREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZlBlcnNvbmFDYXJkJ107XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlcnNvbmFDYXJkQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkXCIgbmctY2xhc3M9XCJnZXRQZXJzb25hQ2FyZENsYXNzZXMoKVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1wZXJzb25hXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIj4nICtcbiAgICAgICAgICAgICc8dWlmLWljb24gdWlmLXR5cGU9XCJwZXJzb25cIj48L3VpZi1pY29uPicgK1xuICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJtcy1QZXJzb25hLWltYWdlXCIgbmctc3JjPVwie3t1aWZJbWFnZVVybH19XCIgbmctaWY9XCJ1aWZJbWFnZVVybFwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByZXNlbmNlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzx1bCBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbnNcIj4nICtcbiAgICAgICAgICAgICc8bGkgbmctcmVwZWF0PVwiYWN0aW9uIGluIHBlcnNvbmFDYXJkQWN0aW9uc1wiIG5nLWNsYXNzPVwiZ2V0QWN0aW9uQ2xhc3NlcyhhY3Rpb24pXCIgbmctY2xpY2s9XCJzZWxlY3RBY3Rpb24oJGV2ZW50LCBhY3Rpb24pXCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPXt7YWN0aW9uLmljb259fSBuZy1pZj1cImFjdGlvbi5wbGFjZWhvbGRlciAhPSBcXCdvdmVyZmxvd1xcJ1wiPjwvdWlmLWljb24+JyArXG4gICAgICAgICAgICAnPC9saT4nICtcbiAgICAgICAgICAgICc8L3VsPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1hY3Rpb25EZXRhaWxCb3hcIj4nICtcbiAgICAgICAgICAgICc8dWwgbmctY2xhc3M9XCJkZXRhaWxDbGFzc1wiPjwvdWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ2FyZENvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgICAgIHZhciBpY29uID0gZWxlbWVudC5maW5kKCd1aWYtaWNvbicpO1xuICAgICAgICAgICAgaWNvbi5hZGRDbGFzcygnbXMtUGVyc29uYS1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlNpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSB4c21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4bGFyZ2UuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTdHlsZSkgJiYgbmcuaXNVbmRlZmluZWQocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlN0eWxlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTdHlsZS4gSXQgc2hvdWxkIGJlIHJvdW5kIG9yIHNxdWFyZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmcuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBuZy5pc1VuZGVmaW5lZChwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEFjdGlvbkNsYXNzZXMgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bYWN0aW9uLnBsYWNlaG9sZGVyXTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnRvcHJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnbXMtUGVyc29uYUNhcmQtb3JnQ2hhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5yZWd1bGFyOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbkNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0gPT09IHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGw6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS14cycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5zbWFsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNtJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tbGcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUueGxhcmdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0teGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWF2YWlsYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hd2F5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYXdheScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5ibG9ja2VkOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYmxvY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5idXN5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYnVzeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5kbmQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1kbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tb2ZmbGluZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hQ2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUuZ2V0UGVyc29uYUNhcmRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0gPT09IHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZSA/ICdtcy1QZXJzb25hQ2FyZC0tc3F1YXJlJyA6ICcnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRldGFpbHNXcmFwcGVyID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uRGV0YWlsc0JveExpc3QgPSBuZy5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsQm94JykpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCd1bCcpLmVxKDApO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zTGlzdCA9IG5nLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb25zJykpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBjbG9uZVtpXS50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtUFJJTUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtU0VDT05EQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1URVJUSUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtT1BUSU9OQUwtVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1dyYXBwZXIuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtQUNUSU9OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZEFjdGlvbiA9IG5nLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHdyYXBwZWRBY3Rpb24uYXR0cigndWlmLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlcl0gPT09IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5vdmVyZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTGlzdC5hcHBlbmQod3JhcHBlZEFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25EZXRhaWxzQm94TGlzdC5hcHBlbmQoX3RoaXMucHJvY2Vzc0FjdGlvbih3cmFwcGVkQWN0aW9uLCBzY29wZSwgcGVyc29uYUNhcmRDb250cm9sbGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5wcm90b3R5cGUucHJvY2Vzc0FjdGlvbiA9IGZ1bmN0aW9uIChjbG9uZSwgc2NvcGUsIHBlcnNvbmFDYXJkQ29udHJvbGxlcikge1xuICAgICAgICB2YXIgY2xhc3NUb0FkZCA9ICcnO1xuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjbG9uZS5hdHRyKCd1aWYtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgdmFyIGljb24gPSBjbG9uZS5hdHRyKCd1aWYtaWNvbicpO1xuICAgICAgICB2YXIgYWN0aW9uVG9BZGQgPSBuZXcgUGVyc29uYUNhcmRBY3Rpb24oaWNvbiwgcGxhY2Vob2xkZXIpO1xuICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ucmVndWxhcl06XG4gICAgICAgICAgICAgICAgY2xhc3NUb0FkZCA9ICdkZXRhaWwtJyArICgrK3Njb3BlLnJlZ3VsYXJBY3Rpb25zQ291bnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnRvcHJpZ2h0XTpcbiAgICAgICAgICAgICAgICBjbGFzc1RvQWRkID0gJ2RldGFpbC01JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2xvbmUuZmluZCgnbGknKS5lcSgwKS5hZGRDbGFzcyhjbGFzc1RvQWRkKTtcbiAgICAgICAgYWN0aW9uVG9BZGQuZGV0YWlsQ2xhc3MgPSBjbGFzc1RvQWRkO1xuICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuYWRkQWN0aW9uKGFjdGlvblRvQWRkKTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGlyZWN0aXZlID0gUGVyc29uYUNhcmREaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZENvbnRyb2xsZXIoJGxvZywgJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLmRldGFpbENzcyA9IHtcbiAgICAgICAgICAgIDE6ICdDaGF0JyxcbiAgICAgICAgICAgIDI6ICdQaG9uZScsXG4gICAgICAgICAgICAzOiAnVmlkZW8nLFxuICAgICAgICAgICAgNDogJ01haWwnLFxuICAgICAgICAgICAgNTogJ09yZydcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAkc2NvcGUucmVndWxhckFjdGlvbnNDb3VudCA9IDA7XG4gICAgICAgICRzY29wZS5kZXRhaWxDbGFzcyA9ICdtcy1QZXJzb25hQ2FyZC1kZXRhaWxDaGF0JztcbiAgICAgICAgJHNjb3BlLnNlbGVjdEFjdGlvbiA9IGZ1bmN0aW9uICgkZXZlbnQsIGFjdGlvbikge1xuICAgICAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFjdGlvbi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgZGV0YWlsTnVtYmVyID0gKyhhY3Rpb24uZGV0YWlsQ2xhc3MuY2hhckF0KGFjdGlvbi5kZXRhaWxDbGFzcy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAkc2NvcGUuZGV0YWlsQ2xhc3MgPSAnbXMtUGVyc29uYUNhcmQtZGV0YWlsJyArIF90aGlzLmRldGFpbENzc1tkZXRhaWxOdW1iZXJdO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZENvbnRyb2xsZXIucHJvdG90eXBlLmFkZEFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb25Ub0FkZCkge1xuICAgICAgICBpZiAodGhpcy4kc2NvcGUucGVyc29uYUNhcmRBY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWN0aW9uVG9BZGQuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5wdXNoKGFjdGlvblRvQWRkKTtcbiAgICB9O1xuICAgIFBlcnNvbmFDYXJkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJyRzY29wZSddO1xuICAgIHJldHVybiBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZENvbnRyb2xsZXIgPSBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG52YXIgUGVyc29uYUNhcmRBY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkQWN0aW9uKGljb24sIHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkQWN0aW9uO1xufSgpKTtcbnZhciBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZShkaXJlY3RpdmVUeXBlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9IGRpcmVjdGl2ZVR5cGU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ2xhc3NlcyA9IHtcbiAgICAgICAgICAgICdwcmltYXJ5JzogJ21zLVBlcnNvbmEtcHJpbWFyeVRleHQnLFxuICAgICAgICAgICAgJ3NlY29uZGFyeSc6ICdtcy1QZXJzb25hLXNlY29uZGFyeVRleHQnLFxuICAgICAgICAgICAgJ3RlcnRpYXJ5JzogJ21zLVBlcnNvbmEtdGVydGlhcnlUZXh0JyxcbiAgICAgICAgICAgICdvcHRpb25hbCc6ICdtcy1QZXJzb25hLW9wdGlvbmFsVGV4dCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aXZlVGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIicgKyBfdGhpcy5hdmFpbGFibGVDbGFzc2VzW190aGlzLmRpcmVjdGl2ZVR5cGVdICsgJ1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmVUZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHRoaXMuYXZhaWxhYmxlQ2xhc3Nlc1t0aGlzLmRpcmVjdGl2ZVR5cGVdKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gJ29wdGlvbmFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlKHR5cGUpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmUGVyc29uYUNhcmQnO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VFbGVtZW50LCBhY3Rpb25BdHRycykge1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcikgJiYgbmcuaXNVbmRlZmluZWQocGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW2FjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyXSkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXIgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlBsYWNlaG9sZGVyLiBJdCBzaG91bGQgYmUgcmVndWxhciwgdG9wcmlnaHQgb3Igb3ZlcmZsb3cuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcl0gPT09IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5vdmVyZmxvdykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPGxpIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtb3ZlcmZsb3dcIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnPGxpIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsc1wiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB9O1xuICAgIH1cbiAgICA7XG4gICAgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWRldGFpbExhYmVsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERldGFpbExpbmVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtZGV0YWlsTGluZVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZCcsIFBlcnNvbmFDYXJkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZEFjdGlvbicsIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZERldGFpbExhYmVsJywgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmREZXRhaWxMaW5lJywgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFByaW1hcnlUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3ByaW1hcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFNlY29uZGFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRUZXJ0aWFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZE9wdGlvbmFsVGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCcnKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hU2l6ZSkge1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieHNtYWxsXCJdID0gMF0gPSBcInhzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wic21hbGxcIl0gPSAxXSA9IFwic21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcIm1lZGl1bVwiXSA9IDJdID0gXCJtZWRpdW1cIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcImxhcmdlXCJdID0gM10gPSBcImxhcmdlXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4bGFyZ2VcIl0gPSA0XSA9IFwieGxhcmdlXCI7XG59KShleHBvcnRzLlBlcnNvbmFTaXplIHx8IChleHBvcnRzLlBlcnNvbmFTaXplID0ge30pKTtcbnZhciBQZXJzb25hU2l6ZSA9IGV4cG9ydHMuUGVyc29uYVNpemU7XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvc2l6ZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQbGFjZWhvbGRlckVudW0pIHtcbiAgICBQbGFjZWhvbGRlckVudW1bUGxhY2Vob2xkZXJFbnVtW1wicmVndWxhclwiXSA9IDBdID0gXCJyZWd1bGFyXCI7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcInRvcHJpZ2h0XCJdID0gMV0gPSBcInRvcHJpZ2h0XCI7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcIm92ZXJmbG93XCJdID0gMl0gPSBcIm92ZXJmbG93XCI7XG59KShleHBvcnRzLlBsYWNlaG9sZGVyRW51bSB8fCAoZXhwb3J0cy5QbGFjZWhvbGRlckVudW0gPSB7fSkpO1xudmFyIFBsYWNlaG9sZGVyRW51bSA9IGV4cG9ydHMuUGxhY2Vob2xkZXJFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BsYWNlaG9sZGVyRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFTdHlsZUVudW0pIHtcbiAgICBQZXJzb25hU3R5bGVFbnVtW1BlcnNvbmFTdHlsZUVudW1bXCJyb3VuZFwiXSA9IDBdID0gXCJyb3VuZFwiO1xuICAgIFBlcnNvbmFTdHlsZUVudW1bUGVyc29uYVN0eWxlRW51bVtcInNxdWFyZVwiXSA9IDFdID0gXCJzcXVhcmVcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bSB8fCAoZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtID0ge30pKTtcbnZhciBQZXJzb25hU3R5bGVFbnVtID0gZXhwb3J0cy5QZXJzb25hU3R5bGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb3JlL3BlcnNvbmFTdHlsZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQcmVzZW5jZUVudW0pIHtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYXZhaWxhYmxlXCJdID0gMF0gPSBcImF2YWlsYWJsZVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJhd2F5XCJdID0gMV0gPSBcImF3YXlcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYmxvY2tlZFwiXSA9IDJdID0gXCJibG9ja2VkXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImJ1c3lcIl0gPSAzXSA9IFwiYnVzeVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJkbmRcIl0gPSA0XSA9IFwiZG5kXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcIm9mZmxpbmVcIl0gPSA1XSA9IFwib2ZmbGluZVwiO1xufSkoZXhwb3J0cy5QcmVzZW5jZUVudW0gfHwgKGV4cG9ydHMuUHJlc2VuY2VFbnVtID0ge30pKTtcbnZhciBQcmVzZW5jZUVudW0gPSBleHBvcnRzLlByZXNlbmNlRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW0nKTtcbnZhciBwZXJzb25hUHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFQcmVzZW5jZUVudW0nKTtcbnZhciBwZXJzb25hSW5pdGlhbHNDb2xvckVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtJyk7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoJy4vc2l6ZUVudW0nKTtcbnZhciBQZXJzb25hVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYVRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAncHJpbWFyeSc6ICdtcy1QZXJzb25hLXByaW1hcnlUZXh0JyxcbiAgICAgICAgICAgICdzZWNvbmRhcnknOiAnbXMtUGVyc29uYS1zZWNvbmRhcnlUZXh0JyxcbiAgICAgICAgICAgICd0ZXJ0aWFyeSc6ICdtcy1QZXJzb25hLXRlcnRpYXJ5VGV4dCcsXG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLmF2YWlsYWJsZUNsYXNzZXNbdGhpcy5kaXJlY3RpdmVUeXBlXSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9ICdvcHRpb25hbCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYVRleHREaXJlY3RpdmUodHlwZSk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFUZXh0RGlyZWN0aXZlO1xudmFyIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWydedWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ3VpZkNvbG9yJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtaW5pdGlhbHMgbXMtUGVyc29uYS1pbml0aWFscy0te3t1aWZDb2xvcn19XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4gJztcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNvbG9yKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZkNvbG9yID0gcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3JbcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3IuYmx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZkNvbG9yJywgZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW25ld0NvbG9yXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYSAtIFwiJyArIG5ld0NvbG9yICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZDb2xvci4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgSXQgc2hvdWxkIGJlIGxpZ2h0Qmx1ZSwgYmx1ZSwgZGFya0JsdWUsIHRlYWwsIGxpZ2h0R3JlZW4sIGdyZWVuLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBkYXJrR3JlZW4sIGxpZ2h0UGluaywgcGluaywgbWFnZW50YSwgcHVycGxlLCBibGFjaywgb3JhbmdlLCByZWQgb3IgZGFya1JlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlID0gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIiBuZy1zaG93PVwiZ2V0SW1hZ2VBcmVhVmlzaWJpbGl0eSgpXCI+JyArXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VcIiBuZy1zcmM9XCJ7e3VpZkltYWdlVXJsfX1cIiBuZy1pZj1cInVpZkltYWdlVXJsXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy51aWZTaXplQ2xhc3NlcyA9IChfYSA9IHt9LFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS50aW55XSA9ICdtcy1QZXJzb25hLS10aW55JyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSA9ICdtcy1QZXJzb25hLS14cycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSA9ICdtcy1QZXJzb25hLS1zbScsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlXSA9ICdtcy1QZXJzb25hLS1sZycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhsYXJnZV0gPSAnbXMtUGVyc29uYS0teGwnLFxuICAgICAgICAgICAgX2FcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy51aWZQcmVzZW5jZUNsYXNzZXMgPSAoX2IgPSB7fSxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXZhaWxhYmxlXSA9ICdtcy1QZXJzb25hLS1hdmFpbGFibGUnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hd2F5XSA9ICdtcy1QZXJzb25hLS1hd2F5JyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYmxvY2tlZF0gPSAnbXMtUGVyc29uYS0tYmxvY2tlZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJ1c3ldID0gJ21zLVBlcnNvbmEtLWJ1c3knLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5kbmRdID0gJ21zLVBlcnNvbmEtLWRuZCcsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmVdID0gJ21zLVBlcnNvbmEtLW9mZmxpbmUnLFxuICAgICAgICAgICAgX2JcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBuZy5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTaXplICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTaXplLiBJdCBzaG91bGQgYmUgdGlueSwgeHNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeGxhcmdlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU3R5bGUpICYmIG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU3R5bGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlN0eWxlLiBJdCBzaG91bGQgYmUgcm91bmQgb3Igc3F1YXJlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpICYmIG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEltYWdlQXJlYVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdICE9PSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnRpbnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlc2VuY2UgPSBuZy5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpID8gcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0gOiBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmU7XG4gICAgICAgICAgICAgICAgaWYgKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2l6ZUNsYXNzID0gX3RoaXMudWlmU2l6ZUNsYXNzZXNbc2l6ZV07XG4gICAgICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChzaXplQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goc2l6ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaChfdGhpcy51aWZQcmVzZW5jZUNsYXNzZXNbcHJlc2VuY2VdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYUNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRldGFpbHNXcmFwcGVyID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VBcmVhID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtaW1hZ2VBcmVhJykpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBjbG9uZVtpXS50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVBSSU1BUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1TRUNPTkRBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1URVJUSUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLU9QVElPTkFMLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNXcmFwcGVyLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1JTklUSUFMUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VBcmVhLnByZXBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgIH1cbiAgICBQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hRGlyZWN0aXZlID0gUGVyc29uYURpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBQZXJzb25hQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIFBlcnNvbmFDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hJywgUGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUluaXRpYWxzJywgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hUHJpbWFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdwcmltYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVNlY29uZGFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdzZWNvbmRhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hVGVydGlhcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hT3B0aW9uYWxUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgnJykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFBlcnNvbmFJbml0aWFsc0NvbG9yKSB7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodEJsdWVcIl0gPSAwXSA9IFwibGlnaHRCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJibHVlXCJdID0gMV0gPSBcImJsdWVcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtCbHVlXCJdID0gMl0gPSBcImRhcmtCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJ0ZWFsXCJdID0gM10gPSBcInRlYWxcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0R3JlZW5cIl0gPSA0XSA9IFwibGlnaHRHcmVlblwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiZ3JlZW5cIl0gPSA1XSA9IFwiZ3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtHcmVlblwiXSA9IDZdID0gXCJkYXJrR3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0UGlua1wiXSA9IDddID0gXCJsaWdodFBpbmtcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcInBpbmtcIl0gPSA4XSA9IFwicGlua1wiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wibWFnZW50YVwiXSA9IDldID0gXCJtYWdlbnRhXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJwdXJwbGVcIl0gPSAxMF0gPSBcInB1cnBsZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiYmxhY2tcIl0gPSAxMV0gPSBcImJsYWNrXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJvcmFuZ2VcIl0gPSAxMl0gPSBcIm9yYW5nZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wicmVkXCJdID0gMTNdID0gXCJyZWRcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtSZWRcIl0gPSAxNF0gPSBcImRhcmtSZWRcIjtcbn0pKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgfHwgKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgPSB7fSkpO1xudmFyIFBlcnNvbmFJbml0aWFsc0NvbG9yID0gZXhwb3J0cy5QZXJzb25hSW5pdGlhbHNDb2xvcjtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hU2l6ZSkge1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1widGlueVwiXSA9IDBdID0gXCJ0aW55XCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4c21hbGxcIl0gPSAxXSA9IFwieHNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJzbWFsbFwiXSA9IDJdID0gXCJzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibWVkaXVtXCJdID0gM10gPSBcIm1lZGl1bVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibGFyZ2VcIl0gPSA0XSA9IFwibGFyZ2VcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhsYXJnZVwiXSA9IDVdID0gXCJ4bGFyZ2VcIjtcbn0pKGV4cG9ydHMuUGVyc29uYVNpemUgfHwgKGV4cG9ydHMuUGVyc29uYVNpemUgPSB7fSkpO1xudmFyIFBlcnNvbmFTaXplID0gZXhwb3J0cy5QZXJzb25hU2l6ZTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3NpemVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUobG9nKSB7XG4gICAgICAgIHRoaXMubG9nID0gbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvclwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1pdGVtTmFtZVwiPnt7dWlmTmFtZX19PC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLWl0ZW1Qcm9ncmVzc1wiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1wcm9ncmVzc1RyYWNrXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLXByb2dyZXNzQmFyXCIgbmctc3R5bGU9XCJ7d2lkdGg6IHVpZlBlcmNlbnRDb21wbGV0ZStcXCclXFwnfVwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1pdGVtRGVzY3JpcHRpb25cIj57e3VpZkRlc2NyaXB0aW9ufX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmRGVzY3JpcHRpb246ICdAJyxcbiAgICAgICAgICAgIHVpZk5hbWU6ICdAJyxcbiAgICAgICAgICAgIHVpZlBlcmNlbnRDb21wbGV0ZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmxvZyA9IGxvZztcbiAgICB9XG4gICAgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uIChsb2cpIHsgcmV0dXJuIG5ldyBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZShsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZQZXJjZW50Q29tcGxldGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT0gbnVsbCB8fCBuZXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZQZXJjZW50Q29tcGxldGUgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdQZXJjZW50Q29tcGxldGUgPSBwYXJzZUZsb2F0KG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTihuZXdQZXJjZW50Q29tcGxldGUpIHx8IG5ld1BlcmNlbnRDb21wbGV0ZSA8IDAgfHwgbmV3UGVyY2VudENvbXBsZXRlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUubG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wcm9ncmVzc2luZGljYXRvciAtICcgK1xuICAgICAgICAgICAgICAgICAgICAnUGVyY2VudCBjb21wbGV0ZSBtdXN0IGJlIGEgdmFsaWQgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTAwLicpO1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlBlcmNlbnRDb21wbGV0ZSA9IE1hdGgubWF4KE1hdGgubWluKG5ld1BlcmNlbnRDb21wbGV0ZSwgMTAwKSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlID0gUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wcm9ncmVzc2luZGljYXRvcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmUHJvZ3Jlc3NJbmRpY2F0b3InLCBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3Byb2dyZXNzaW5kaWNhdG9yL3Byb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBTZWFyY2hCb3hEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlYXJjaEJveERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtU2VhcmNoQm94XCIgbmctY2xhc3M9XCJ7XFwnaXMtYWN0aXZlXFwnOmlzQWN0aXZlfVwiPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBjbGFzcz1cIm1zLVNlYXJjaEJveC1maWVsZFwiIG5nLWZvY3VzPVwiaW5wdXRGb2N1cygpXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCInICtcbiAgICAgICAgICAgICcgbmctbW9kZWw9XCJ2YWx1ZVwiIGlkPVwie3s6OlxcJ3NlYXJjaEJveF9cXCcrJGlkfX1cIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBjbGFzcz1cIm1zLVNlYXJjaEJveC1sYWJlbFwiIGZvcj1cInt7OjpcXCdzZWFyY2hCb3hfXFwnKyRpZH19XCIgbmctaGlkZT1cImlzTGFiZWxIaWRkZW5cIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLVNlYXJjaEJveC1pY29uIG1zLUljb24gbXMtSWNvbi0tc2VhcmNoXCIgPjwvaT4ge3twbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwibXMtU2VhcmNoQm94LWNsb3NlQnV0dG9uXCIgbmctbW91c2Vkb3duPVwiYnRuTW91c2Vkb3duKClcIiB0eXBlPVwiYnV0dG9uXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXhcIj48L2k+PC9idXR0b24+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnPT8nLFxuICAgICAgICAgICAgdmFsdWU6ICc9PydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU2VhcmNoQm94RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU2VhcmNoQm94RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTZWFyY2hCb3hEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLmlzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pbnB1dEZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRCbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmlzQ2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc2NvcGUudmFsdWUpID09PSAndW5kZWZpbmVkJyB8fCBzY29wZS52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5pc0ZvY3VzID0gc2NvcGUuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuYnRuTW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuaXNDYW5jZWwgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3ZhbHVlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKCFzY29wZS5pc0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB2YWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY29wZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgncGxhY2Vob2xkZXInLCBmdW5jdGlvbiAoc2VhcmNoKSB7XG4gICAgICAgICAgICBzY29wZS5wbGFjZWhvbGRlciA9IHNlYXJjaDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2VhcmNoQm94RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU2VhcmNoQm94RGlyZWN0aXZlID0gU2VhcmNoQm94RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc2VhcmNoYm94JywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmU2VhcmNoYm94JywgU2VhcmNoQm94RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgc3Bpbm5lclNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3NwaW5uZXJTaXplRW51bScpO1xudmFyIFNwaW5uZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwaW5uZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBTcGlubmVyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICduZ1Nob3cnOiAnPScsXG4gICAgICAgICAgICAndWlmU2l6ZSc6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3Bpbm5lckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU3Bpbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lciAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3Bpbm5lciBzaXplIChcXCcnICsgYXR0cnMudWlmU2l6ZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemVbYXR0cnMudWlmU2l6ZV0gPT09IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplLmxhcmdlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFkZENsYXNzKCdtcy1TcGlubmVyLS1sYXJnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uZ1Nob3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1Nob3cnLCBmdW5jdGlvbiAobmV3VmlzaWJsZSwgb2xkVmlzaWJsZSwgc3Bpbm5lclNjb3BlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyU2NvcGUuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NvcGUuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIGlmIChjbG9uZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLVNwaW5uZXItbGFiZWwnKS5hcHBlbmQoY2xvbmUpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5pbml0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gU3Bpbm5lckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlNwaW5uZXJEaXJlY3RpdmUgPSBTcGlubmVyRGlyZWN0aXZlO1xudmFyIFNwaW5uZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGlubmVyQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkaW50ZXJ2YWwsICRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kaW50ZXJ2YWwgPSAkaW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuX29mZnNldFNpemUgPSAwLjE3OTtcbiAgICAgICAgdGhpcy5fbnVtQ2lyY2xlcyA9IDg7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblNwZWVkID0gOTA7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMgPSBbXTtcbiAgICAgICAgJHNjb3BlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fcGFyZW50U2l6ZSA9IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW190aGlzLiRzY29wZS51aWZTaXplXSA9PT0gc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemUubGFyZ2UgPyAyOCA6IDIwO1xuICAgICAgICAgICAgX3RoaXMuY3JlYXRlQ2lyY2xlc0FuZEFycmFuZ2UoKTtcbiAgICAgICAgICAgIF90aGlzLnNldEluaXRpYWxPcGFjaXR5KCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9hbmltYXRpb25JbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBfdGhpcy5fY2lyY2xlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWRlQ2lyY2xlKF90aGlzLl9jaXJjbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBfdGhpcy5fYW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoX3RoaXMuX2FuaW1hdGlvbkludGVydmFsKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZXNBbmRBcnJhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5nbGUgPSAwO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fcGFyZW50U2l6ZSAqIHRoaXMuX29mZnNldFNpemU7XG4gICAgICAgIHZhciBzdGVwID0gKDIgKiBNYXRoLlBJKSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHZhciBpID0gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdmFyIHJhZGl1cyA9ICh0aGlzLl9wYXJlbnRTaXplIC0gb2Zmc2V0KSAqIDAuNTtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IHRoaXMuY3JlYXRlQ2lyY2xlKCk7XG4gICAgICAgICAgICB2YXIgeCA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRXaWR0aCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRIZWlnaHQgKiAwLjUpIC0gb2Zmc2V0ICogMC41O1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY2lyY2xlKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ2xlZnQnLCAoeCArICdweCcpKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ3RvcCcsICh5ICsgJ3B4JykpO1xuICAgICAgICAgICAgYW5nbGUgKz0gc3RlcDtcbiAgICAgICAgICAgIHZhciBjaXJjbGVPYmplY3QgPSBuZXcgQ2lyY2xlT2JqZWN0KGNpcmNsZSwgaSk7XG4gICAgICAgICAgICB0aGlzLl9jaXJjbGVzLnB1c2goY2lyY2xlT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNpcmNsZSA9IG5nLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBkb3RTaXplID0gKHRoaXMuX3BhcmVudFNpemUgKiB0aGlzLl9vZmZzZXRTaXplKSArICdweCc7XG4gICAgICAgIGNpcmNsZS5hZGRDbGFzcygnbXMtU3Bpbm5lci1jaXJjbGUnKS5jc3MoJ3dpZHRoJywgZG90U2l6ZSkuY3NzKCdoZWlnaHQnLCBkb3RTaXplKTtcbiAgICAgICAgcmV0dXJuIGNpcmNsZTtcbiAgICB9O1xuICAgIDtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0SW5pdGlhbE9wYWNpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIHRoaXMuX2ZhZGVJbmNyZW1lbnQgPSAxIC8gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdGhpcy5fY2lyY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUsIGluZGV4KSB7XG4gICAgICAgICAgICBvcGNhaXR5VG9TZXQgPSAoX3RoaXMuX2ZhZGVJbmNyZW1lbnQgKiAoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG9wY2FpdHlUb1NldDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuZmFkZUNpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdmFyIG5ld09wYWNpdHkgPSBjaXJjbGUub3BhY2l0eSAtIHRoaXMuX2ZhZGVJbmNyZW1lbnQ7XG4gICAgICAgIGlmIChuZXdPcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICAgIG5ld09wYWNpdHkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNpcmNsZS5vcGFjaXR5ID0gbmV3T3BhY2l0eTtcbiAgICB9O1xuICAgIFNwaW5uZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckaW50ZXJ2YWwnLCAnJGxvZyddO1xuICAgIHJldHVybiBTcGlubmVyQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgQ2lyY2xlT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaXJjbGVPYmplY3QoY2lyY2xlRWxlbWVudCwgY2lyY2xlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50ID0gY2lyY2xlRWxlbWVudDtcbiAgICAgICAgdGhpcy5jaXJjbGVJbmRleCA9IGNpcmNsZUluZGV4O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2lyY2xlT2JqZWN0LnByb3RvdHlwZSwgXCJvcGFjaXR5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKyh0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5JykpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBDaXJjbGVPYmplY3Q7XG59KCkpO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lcicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNwaW5uZXInLCBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoU3Bpbm5lclNpemUpIHtcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVsnc21hbGwnXSA9IDBdID0gJ3NtYWxsJztcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVsnbGFyZ2UnXSA9IDFdID0gJ2xhcmdlJztcbn0pKGV4cG9ydHMuU3Bpbm5lclNpemUgfHwgKGV4cG9ydHMuU3Bpbm5lclNpemUgPSB7fSkpO1xudmFyIFNwaW5uZXJTaXplID0gZXhwb3J0cy5TcGlubmVyU2l6ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJTaXplRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZSgnLi90YWJsZVJvd1NlbGVjdE1vZGVFbnVtJyk7XG52YXIgVGFibGVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5vcmRlckJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gW107XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcIm9yZGVyQnlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckJ5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckFzY1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm9yZGVyQXNjO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcmRlckFzYykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSBvcmRlckFzYztcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwicm93U2VsZWN0TW9kZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnJvd1NlbGVjdE1vZGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHJvd1NlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVtyb3dTZWxlY3RNb2RlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgcm93U2VsZWN0TW9kZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtcm93LXNlbGVjdC1tb2RlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIG5vbmV8c2luZ2xlfG11bHRpcGxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucm93U2VsZWN0TW9kZSA9IHJvd1NlbGVjdE1vZGU7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInJvd3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5yb3dzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb3dzKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gcm93cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm93c1tpXS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2godGhpcy5yb3dzW2ldLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBUYWJsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gVGFibGVDb250cm9sbGVyO1xufSgpKTtcbnZhciBUYWJsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVRhYmxlXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBUYWJsZUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ3RhYmxlJztcbiAgICB9XG4gICAgVGFibGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlJvd1NlbGVjdE1vZGUgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZSb3dTZWxlY3RNb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bYXR0cnMudWlmUm93U2VsZWN0TW9kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlJvd1NlbGVjdE1vZGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLXJvdy1zZWxlY3QtbW9kZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBub25lfHNpbmdsZXxtdWx0aXBsZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnJvd1NlbGVjdE1vZGUgPSBhdHRycy51aWZSb3dTZWxlY3RNb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5yb3dTZWxlY3RNb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnJvd1NlbGVjdE1vZGUgPSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVEaXJlY3RpdmUgPSBUYWJsZURpcmVjdGl2ZTtcbnZhciBUYWJsZVJvd0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlUm93Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZVJvd0NvbnRyb2xsZXIucHJvdG90eXBlLCBcIml0ZW1cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5pdGVtID0gaXRlbTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlUm93Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5zZWxlY3RlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFRhYmxlUm93Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuICAgIHJldHVybiBUYWJsZVJvd0NvbnRyb2xsZXI7XG59KCkpO1xudmFyIFRhYmxlUm93RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtVGFibGUtcm93XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9dWlmSXRlbSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVSb3dDb250cm9sbGVyO1xuICAgIH1cbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgdGFibGUpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRTdHJpbmcgPSBhdHRycy51aWZTZWxlY3RlZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nICE9PSAndHJ1ZScgJiYgc2VsZWN0ZWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICB0YWJsZS4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFibGUucm93cy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5yb3dDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSAhc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIHRhYmxlUm93U2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5zaW5nbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXSAhPT0gdGFibGVSb3dTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlICE9PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSAmJlxuICAgICAgICAgICAgc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93Q2xpY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dEaXJlY3RpdmUgPSBUYWJsZVJvd0RpcmVjdGl2ZTtcbnZhciBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1UYWJsZS1yb3dDaGVja1wiPjwvc3Bhbj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ151aWZUYWJsZScsICdedWlmVGFibGVSb3cnXTtcbiAgICB9XG4gICAgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHNjb3BlLnJvd1NlbGVjdENsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgdGFibGUgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgICAgIHZhciByb3cgPSBjb250cm9sbGVyc1sxXTtcbiAgICAgICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlICE9PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5tdWx0aXBsZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocm93Lml0ZW0gPT09IHVuZGVmaW5lZCB8fCByb3cuaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBzaG91bGRTZWxlY3RBbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3NbaV0uc2VsZWN0ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZFNlbGVjdEFsbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3NbaV0uc2VsZWN0ZWQgIT09IHNob3VsZFNlbGVjdEFsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUucm93c1tpXS5zZWxlY3RlZCA9IHNob3VsZFNlbGVjdEFsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50Lm9uKCdjbGljaycsIHNjb3BlLnJvd1NlbGVjdENsaWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlUm93U2VsZWN0RGlyZWN0aXZlID0gVGFibGVSb3dTZWxlY3REaXJlY3RpdmU7XG52YXIgVGFibGVDZWxsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNlbGxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1UYWJsZS1jZWxsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICB9XG4gICAgVGFibGVDZWxsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVDZWxsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVDZWxsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVDZWxsRGlyZWN0aXZlID0gVGFibGVDZWxsRGlyZWN0aXZlO1xudmFyIFRhYmxlSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLVRhYmxlLWNlbGxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICB9XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIHNjb3BlLmhlYWRlckNsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAodGFibGUub3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gIXRhYmxlLm9yZGVyQXNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJCeSA9IGF0dHJzLnVpZk9yZGVyQnk7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQnknLCBmdW5jdGlvbiAobmV3T3JkZXJCeSwgb2xkT3JkZXJCeSwgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKG9sZE9yZGVyQnkgIT09IG5ld09yZGVyQnkgJiZcbiAgICAgICAgICAgICAgICBuZXdPcmRlckJ5ID09PSBhdHRycy51aWZPcmRlckJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHMuZXEoaSkuY2hpbGRyZW4oKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLmVxKGkpLmNoaWxkcmVuKCkuZXEoMSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ1aWYtc29ydC1vcmRlclwiPiZuYnNwO1xcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQXNjJywgZnVuY3Rpb24gKG5ld09yZGVyQXNjLCBvbGRPcmRlckFzYywgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHZhciBvbGRDc3NDbGFzcyA9IG9sZE9yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nzc0NsYXNzID0gbmV3T3JkZXJBc2MgPyAnbXMtSWNvbi0tY2FyZXREb3duJyA6ICdtcy1JY29uLS1jYXJldFVwJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgxKS5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKG9sZENzc0NsYXNzKS5hZGRDbGFzcyhuZXdDc3NDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJ3VpZk9yZGVyQnknIGluIGF0dHJzKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaGVhZGVyQ2xpY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckRpcmVjdGl2ZSA9IFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZScsIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZVJvdycsIFRhYmxlUm93RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZVJvd1NlbGVjdCcsIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUNlbGwnLCBUYWJsZUNlbGxEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlSGVhZGVyJywgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFRhYmxlUm93U2VsZWN0TW9kZUVudW0pIHtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJzaW5nbGVcIl0gPSAxXSA9IFwic2luZ2xlXCI7XG4gICAgVGFibGVSb3dTZWxlY3RNb2RlRW51bVtUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1wibXVsdGlwbGVcIl0gPSAyXSA9IFwibXVsdGlwbGVcIjtcbn0pKGV4cG9ydHMuVGFibGVSb3dTZWxlY3RNb2RlRW51bSB8fCAoZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtID0ge30pKTtcbnZhciBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtID0gZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlUm93U2VsZWN0TW9kZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIFRleHRGaWVsZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGV4dEZpZWxkRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xhc3M9XCJ7XFwnaXMtYWN0aXZlXFwnOiBpc0FjdGl2ZSwgXFwnbXMtVGV4dEZpZWxkXFwnOiB0cnVlLCAnICtcbiAgICAgICAgICAgICdcXCdtcy1UZXh0RmllbGQtLXVuZGVybGluZWRcXCc6IHVpZlVuZGVybGluZWQsIFxcJ21zLVRleHRGaWVsZC0tcGxhY2Vob2xkZXJcXCc6IHBsYWNlaG9sZGVyLCAnICtcbiAgICAgICAgICAgICdcXCdpcy1yZXF1aXJlZFxcJzogcmVxdWlyZWQsIFxcJ2lzLWRpc2FibGVkXFwnOiBkaXNhYmxlZH1cIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgbmctc2hvdz1cImxhYmVsU2hvd25cIiBjbGFzcz1cIm1zLUxhYmVsXCI+e3t1aWZMYWJlbCB8fCBwbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8aW5wdXQgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiIGNsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgLz4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRleHRGaWVsZC1kZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0/JyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICB1aWZEZXNjcmlwdGlvbjogJ0AnLFxuICAgICAgICAgICAgdWlmTGFiZWw6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnP25nTW9kZWwnO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgIH1cbiAgICBUZXh0RmllbGREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUZXh0RmllbGREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgbmdNb2RlbCkge1xuICAgICAgICBzY29wZS5sYWJlbFNob3duID0gdHJ1ZTtcbiAgICAgICAgc2NvcGUucmVxdWlyZWQgPSAncmVxdWlyZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLnVpZlVuZGVybGluZWQgPSAndWlmVW5kZXJsaW5lZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLmlucHV0Rm9jdXMgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS51aWZVbmRlcmxpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5pbnB1dENsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Qmx1ciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIgJiYgaW5wdXQudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2NvcGUudWlmVW5kZXJsaW5lZCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChuZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9ICFuZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRleHRGaWVsZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRleHRGaWVsZERpcmVjdGl2ZSA9IFRleHRGaWVsZERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRleHRmaWVsZCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmVGV4dGZpZWxkJywgVGV4dEZpZWxkRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgVG9nZ2xlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb2dnbGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cInRvZ2dsZUNsYXNzXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1Ub2dnbGUtZGVzY3JpcHRpb25cIj48bmctdHJhbnNjbHVkZS8+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtVG9nZ2xlLWlucHV0XCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtZmllbGRcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vZmZcIj57e3VpZkxhYmVsT2ZmfX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1MYWJlbCBtcy1MYWJlbC0tb25cIj57e3VpZkxhYmVsT259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ01vZGVsOiAnPT8nLFxuICAgICAgICAgICAgdWlmTGFiZWxPZmY6ICdAJyxcbiAgICAgICAgICAgIHVpZkxhYmVsT246ICdAJyxcbiAgICAgICAgICAgIHVpZlRleHRMb2NhdGlvbjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRvZ2dsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVG9nZ2xlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICBzY29wZS50b2dnbGVDbGFzcyA9ICdtcy1Ub2dnbGUnO1xuICAgICAgICBpZiAoc2NvcGUudWlmVGV4dExvY2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbG9jID0gc2NvcGUudWlmVGV4dExvY2F0aW9uO1xuICAgICAgICAgICAgbG9jID0gbG9jLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbG9jLnNsaWNlKDEpO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlQ2xhc3MgKz0gJyBtcy1Ub2dnbGUtLXRleHQnICsgbG9jO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVG9nZ2xlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVG9nZ2xlRGlyZWN0aXZlID0gVG9nZ2xlRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudG9nZ2xlJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUb2dnbGUnLCBUb2dnbGVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90b2dnbGUvdG9nZ2xlRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBvcmdDaGFydFByZXNlbmNlRW51bV8xID0gcmVxdWlyZSgnLi9vcmdDaGFydFByZXNlbmNlRW51bScpO1xudmFyIG9yZ0NoYXJ0U3R5bGVFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0U3R5bGVFbnVtJyk7XG52YXIgb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZSgnLi9vcmdDaGFydFNlbGVjdE1vZGVFbnVtJyk7XG52YXIgT3JnQ2hhcnRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydENvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RNb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBbXTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9yZ0NoYXJ0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPcmdDaGFydENvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkSXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT3JnQ2hhcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIE9yZ0NoYXJ0Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgT3JnQ2hhcnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1PcmdDaGFydFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE9yZ0NoYXJ0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6ICc9P3VpZlNlbGVjdGVkSXRlbXMnXG4gICAgICAgIH07XG4gICAgfVxuICAgIE9yZ0NoYXJ0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgICAgICBpZiAoYXR0cnMudWlmU2VsZWN0TW9kZSkge1xuICAgICAgICAgICAgc3dpdGNoIChvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVthdHRycy51aWZTZWxlY3RNb2RlXSkge1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlOlxuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGU6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0TW9kZSA9IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlNlbGVjdE1vZGVdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgc2VsZWN0LW1vZGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBzZWxlY3QtbW9kZSAoXFwnJyArIGF0dHJzLnVpZlNlbGVjdE1vZGUgKyAnXFwpIGlzIG5vdCBzdXBwZXJ0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZTogc2luZ2xlLCBtdWx0aXBsZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnREaXJlY3RpdmUgPSBPcmdDaGFydERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEdyb3VwRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1PcmdDaGFydC1ncm91cFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEdyb3VwRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUgPSBPcmdDaGFydEdyb3VwRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1PcmdDaGFydC1ncm91cFRpdGxlXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlID0gT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx1bCBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWxpc3RcIiBuZy10cmFuc2NsdWRlID48L3VsPic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0TGlzdERpcmVjdGl2ZSA9IE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxpIGNsYXNzPVwibXMtT3JnQ2hhcnQtbGlzdEl0ZW1cIj48ZGl2IGNsYXNzPVwibXMtUGVyc29uYVwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2PjwvbGk+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZPcmdDaGFydCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpdGVtOiAnPT91aWZJdGVtJyxcbiAgICAgICAgICAgIHByZXNlbmNlOiAnPT91aWZQcmVzZW5jZScsXG4gICAgICAgICAgICBzZWxlY3RlZDogJz0/dWlmU2VsZWN0ZWQnXG4gICAgICAgIH07XG4gICAgfVxuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAoZWxlbSwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmIChzY29wZS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5wcmVzZW5jZSkge1xuICAgICAgICAgICAgc3dpdGNoIChvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtW3Njb3BlLnByZXNlbmNlXSkge1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5hdmFpbGFibGU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYXZhaWxhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5idXN5OlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWJ1c3knKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmF3YXk6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYXdheScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYmxvY2tlZDpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1ibG9ja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5kbmQ6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tZG5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5vZmZsaW5lOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLW9mZmxpbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVSUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vcmdjaGFydCAtIFVuc3VwcG9ydGVkIHByZXNlbmNlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgcHJlc2VuY2UgKFxcJycgKyBzY29wZS5wcmVzZW5jZSArICdcXCcpIGlzIG5vdCBzdXBwZXJ0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZTogYXZhaWxhYmxlLCBidXN5LCBhd2F5LCBibG9ja2VkLCBkbmQsIG9mZmxpbmUuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZTdHlsZSkge1xuICAgICAgICAgICAgc3dpdGNoIChvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkge1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTdHlsZUVudW1fMS5PcmdDaGFydFN0eWxlRW51bS5zcXVhcmU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRTdHlsZUVudW1fMS5PcmdDaGFydFN0eWxlRW51bS5zdGFuZGFyZDogYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVSUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vcmdjaGFydCAtIFVuc3VwcG9ydGVkIHN0eWxlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgc3R5bGUgKFxcJycgKyBhdHRycy51aWZTdHlsZSArICdcXCkgaXMgbm90IHN1cHBlcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBzdGFuZGFyZChkZWZhdWx0KSwgc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1zZWxlY3RhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgIGN0cmwuaXRlbXMucHVzaChzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlIHx8IGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0cmwuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLml0ZW1zW2ldICE9PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucGVyc29uYUNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9ICFzY29wZS5zZWxlY3RlZDtcbiAgICAgICAgICAgIGlmIChzY29wZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdHJsLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXRlbXNbaV0gIT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnB1c2goc2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnB1c2goc2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBjdHJsLnNlbGVjdGVkSXRlbXMuaW5kZXhPZihzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICgoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUgfHwgY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZSkgJiYgc2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLm9uKCdjbGljaycsIHNjb3BlLnBlcnNvbmFDbGljayk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUgPSBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlcnNvbmEtaW1hZ2VBcmVhXFxcIj5cXG4gICAgICA8aSBjbGFzcz1cXFwibXMtUGVyc29uYS1wbGFjZWhvbGRlciBtcy1JY29uIG1zLUljb24tLXBlcnNvblxcXCI+PC9pPlxcbiAgICAgIDxpbWcgY2xhc3M9XFxcIm1zLVBlcnNvbmEtaW1hZ2VcXFwiIG5nLXNyYz1cXFwie3tuZ1NyY319XFxcIiAvPlxcbiAgICA8L2Rpdj5cXG4gICAgXCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ1NyYzogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEltYWdlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUgPSBPcmdDaGFydEltYWdlRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIiA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGlmICghc2NvcGUuJHBhcmVudC5wcmVzZW5jZSkge1xuICAgICAgICAgICAgZWxlbS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUgPSBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWRldGFpbHNcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydERldGFpbHNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydERldGFpbHNEaXJlY3RpdmUgPSBPcmdDaGFydERldGFpbHNEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmltYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUgPSBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXNlY29uZGFyeVRleHRcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUgPSBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwQnlGaWx0ZXIoKSB7XG4gICAgfVxuICAgIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlci5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGtleSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY29sbGVjdGlvbltpXVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcjtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0R3JvdXBCeUZpbHRlciA9IE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcjtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydCcsIE9yZ0NoYXJ0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEdyb3VwJywgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRHcm91cFRpdGxlJywgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydExpc3QnLCBPcmdDaGFydExpc3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0UGVyc29uYScsIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRJbWFnZScsIE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0UHJlc2VuY2UnLCBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydERldGFpbHMnLCBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0UHJpbWFyeVRleHQnLCBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydFNlY29uZGFyeVRleHQnLCBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5maWx0ZXIoJ3VpZk9yZ0NoYXJ0R3JvdXBCeScsIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlci5mYWN0b3J5KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKE9yZ0NoYXJ0UHJlc2VuY2VFbnVtKSB7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJhdmFpbGFibGVcIl0gPSAwXSA9IFwiYXZhaWxhYmxlXCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJidXN5XCJdID0gMV0gPSBcImJ1c3lcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImF3YXlcIl0gPSAyXSA9IFwiYXdheVwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYmxvY2tlZFwiXSA9IDNdID0gXCJibG9ja2VkXCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJkbmRcIl0gPSA0XSA9IFwiZG5kXCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJvZmZsaW5lXCJdID0gNV0gPSBcIm9mZmxpbmVcIjtcbn0pKGV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZUVudW0gfHwgKGV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZUVudW0gPSB7fSkpO1xudmFyIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtID0gZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFByZXNlbmNlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKE9yZ0NoYXJ0U3R5bGVFbnVtKSB7XG4gICAgT3JnQ2hhcnRTdHlsZUVudW1bT3JnQ2hhcnRTdHlsZUVudW1bXCJzdGFuZGFyZFwiXSA9IDBdID0gXCJzdGFuZGFyZFwiO1xuICAgIE9yZ0NoYXJ0U3R5bGVFbnVtW09yZ0NoYXJ0U3R5bGVFbnVtW1wic3F1YXJlXCJdID0gMV0gPSBcInNxdWFyZVwiO1xufSkoZXhwb3J0cy5PcmdDaGFydFN0eWxlRW51bSB8fCAoZXhwb3J0cy5PcmdDaGFydFN0eWxlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRTdHlsZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0U3R5bGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSkge1xuICAgIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtcInNpbmdsZVwiXSA9IDBdID0gXCJzaW5nbGVcIjtcbiAgICBPcmdDaGFydFNlbGVjdE1vZGVFbnVtW09yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bXCJtdWx0aXBsZVwiXSA9IDFdID0gXCJtdWx0aXBsZVwiO1xufSkoZXhwb3J0cy5PcmdDaGFydFNlbGVjdE1vZGVFbnVtIHx8IChleHBvcnRzLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gPSB7fSkpO1xudmFyIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9