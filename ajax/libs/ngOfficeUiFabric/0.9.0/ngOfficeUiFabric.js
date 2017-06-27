/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * Angular 1.x directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.9.0
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
	var navBarModule = __webpack_require__(28);
	var overlayModule = __webpack_require__(29);
	var panelModule = __webpack_require__(31);
	var personacardModule = __webpack_require__(33);
	var personaModule = __webpack_require__(38);
	var progressIndicatorModule = __webpack_require__(41);
	var searchboxModule = __webpack_require__(42);
	var spinnerModule = __webpack_require__(43);
	var tableModule = __webpack_require__(45);
	var textFieldModule = __webpack_require__(48);
	var toggleModule = __webpack_require__(50);
	var orgChartModule = __webpack_require__(51);
	var peoplePickerModule = __webpack_require__(55);
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
	    navBarModule.module.name,
	    overlayModule.module.name,
	    panelModule.module.name,
	    peoplePickerModule.module.name,
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
	        scope.$watch(function () { return element.attr('disabled'); }, (function (newValue) { scope.disabled = typeof newValue !== 'undefined'; }));
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
	            "<button class=\"ms-Button\" ng-class=\"{'is-disabled': disabled}\" ng-disabled=\"disabled\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.actionLink] =
	            "<a class=\"ms-Button\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.primaryButton] =
	            "<button class=\"ms-Button ms-Button--primary\" ng-class=\"{'is-disabled': disabled}\" ng-disabled=\"disabled\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.primaryLink] =
	            "<a class=\"ms-Button ms-Button--primary\" ng-class=\"{'is-disabled': disabled}\">\n         <span class=\"ms-Button-label\" ng-transclude></span>\n       </a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.commandButton] =
	            "<button class=\"ms-Button ms-Button--command\" ng-class=\"{'is-disabled': disabled}\" ng-disabled=\"disabled\"></button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.commandLink] =
	            "<a class=\"ms-Button ms-Button--command\" ng-class=\"{'is-disabled': disabled}\"></a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.compoundButton] =
	            "<button class=\"ms-Button ms-Button--compound\" ng-class=\"{'is-disabled': disabled}\" ng-disabled=\"disabled\"></button>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.compoundLink] =
	            "<a class=\"ms-Button ms-Button--compound\" ng-class=\"{'is-disabled': disabled}\"></a>";
	        this.templateOptions[buttonTemplateType_ts_1.ButtonTemplateType.heroButton] =
	            "<button class=\"ms-Button ms-Button--hero\" ng-class=\"{'is-disabled': disabled}\" ng-disabled=\"disabled\"></button>";
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
	        var value = dropdownController.getViewValue();
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var overlayModeEnum_ts_1 = __webpack_require__(30);
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
/* 30 */
/***/ function(module, exports) {

	'use strict';
	(function (OverlayMode) {
	    OverlayMode[OverlayMode["light"] = 0] = "light";
	    OverlayMode[OverlayMode["dark"] = 1] = "dark";
	})(exports.OverlayMode || (exports.OverlayMode = {}));
	var OverlayMode = exports.OverlayMode;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var panelDirectiveEnum_1 = __webpack_require__(32);
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var sizeEnum_1 = __webpack_require__(34);
	var placeholderEnum_1 = __webpack_require__(35);
	var personaStyleEnum_1 = __webpack_require__(36);
	var personaPresenceEnum_1 = __webpack_require__(37);
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
/* 34 */
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
/* 35 */
/***/ function(module, exports) {

	'use strict';
	(function (PlaceholderEnum) {
	    PlaceholderEnum[PlaceholderEnum["regular"] = 0] = "regular";
	    PlaceholderEnum[PlaceholderEnum["topright"] = 1] = "topright";
	    PlaceholderEnum[PlaceholderEnum["overflow"] = 2] = "overflow";
	})(exports.PlaceholderEnum || (exports.PlaceholderEnum = {}));
	var PlaceholderEnum = exports.PlaceholderEnum;


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	(function (PersonaStyleEnum) {
	    PersonaStyleEnum[PersonaStyleEnum["round"] = 0] = "round";
	    PersonaStyleEnum[PersonaStyleEnum["square"] = 1] = "square";
	})(exports.PersonaStyleEnum || (exports.PersonaStyleEnum = {}));
	var PersonaStyleEnum = exports.PersonaStyleEnum;


/***/ },
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var personaStyleEnum_1 = __webpack_require__(36);
	var personaPresenceEnum_1 = __webpack_require__(37);
	var personaInitialsColorEnum_1 = __webpack_require__(39);
	var sizeEnum_1 = __webpack_require__(40);
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var spinnerSizeEnum_1 = __webpack_require__(44);
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
/* 44 */
/***/ function(module, exports) {

	'use strict';
	(function (SpinnerSize) {
	    SpinnerSize[SpinnerSize['small'] = 0] = 'small';
	    SpinnerSize[SpinnerSize['large'] = 1] = 'large';
	})(exports.SpinnerSize || (exports.SpinnerSize = {}));
	var SpinnerSize = exports.SpinnerSize;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var tableRowSelectModeEnum_1 = __webpack_require__(46);
	var tableTypeEnum_1 = __webpack_require__(47);
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
/* 46 */
/***/ function(module, exports) {

	'use strict';
	(function (TableRowSelectModeEnum) {
	    TableRowSelectModeEnum[TableRowSelectModeEnum["none"] = 0] = "none";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["single"] = 1] = "single";
	    TableRowSelectModeEnum[TableRowSelectModeEnum["multiple"] = 2] = "multiple";
	})(exports.TableRowSelectModeEnum || (exports.TableRowSelectModeEnum = {}));
	var TableRowSelectModeEnum = exports.TableRowSelectModeEnum;


/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	(function (TableTypeEnum) {
	    TableTypeEnum[TableTypeEnum["fluid"] = 0] = "fluid";
	    TableTypeEnum[TableTypeEnum["fixed"] = 1] = "fixed";
	})(exports.TableTypeEnum || (exports.TableTypeEnum = {}));
	var TableTypeEnum = exports.TableTypeEnum;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var uifTypeEnum_1 = __webpack_require__(49);
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
	            '<input ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
	            'class="ms-TextField-field" ng-show="!uifMultiline" ng-disabled="disabled" type="{{uifType}}" />' +
	            '<textarea ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
	            'class="ms-TextField-field" ng-show="uifMultiline" ng-disabled="disabled"></textarea>' +
	            '<span class="ms-TextField-description">{{uifDescription}}</span>' +
	            '</div>';
	        this.scope = {
	            ngModel: '=?',
	            placeholder: '@',
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
/* 49 */
/***/ function(module, exports) {

	'use strict';
	(function (InputTypeEnum) {
	    InputTypeEnum[InputTypeEnum["text"] = 0] = "text";
	    InputTypeEnum[InputTypeEnum["password"] = 1] = "password";
	})(exports.InputTypeEnum || (exports.InputTypeEnum = {}));
	var InputTypeEnum = exports.InputTypeEnum;


/***/ },
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var orgChartPresenceEnum_1 = __webpack_require__(52);
	var orgChartStyleEnum_1 = __webpack_require__(53);
	var orgChartSelectModeEnum_1 = __webpack_require__(54);
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
/* 52 */
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
/* 53 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartStyleEnum) {
	    OrgChartStyleEnum[OrgChartStyleEnum["standard"] = 0] = "standard";
	    OrgChartStyleEnum[OrgChartStyleEnum["square"] = 1] = "square";
	})(exports.OrgChartStyleEnum || (exports.OrgChartStyleEnum = {}));
	var OrgChartStyleEnum = exports.OrgChartStyleEnum;


/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';
	(function (OrgChartSelectModeEnum) {
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["single"] = 0] = "single";
	    OrgChartSelectModeEnum[OrgChartSelectModeEnum["multiple"] = 1] = "multiple";
	})(exports.OrgChartSelectModeEnum || (exports.OrgChartSelectModeEnum = {}));
	var OrgChartSelectModeEnum = exports.OrgChartSelectModeEnum;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ng = __webpack_require__(2);
	var personaStyleEnum_1 = __webpack_require__(36);
	var sizeEnum_1 = __webpack_require__(40);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNzE0NGIzNmFiNzExOWJlMTc2NiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVGVtcGxhdGVUeXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheURpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvc2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGxhY2Vob2xkZXJFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3BlcnNvbmFTdHlsZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVByZXNlbmNlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3BlcnNvbmFEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvc2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQSxnRDs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsa0NBQWtDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMseUNBQXlDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5QyxrQ0FBa0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLGlDQUFpQyxFQUFFLHdCQUF3QixrREFBa0QsRUFBRTtBQUNqSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxzREFBcUQsd0JBQXdCO0FBQzdFO0FBQ0EsaURBQWdELHdCQUF3QjtBQUN4RTtBQUNBLHlFQUF3RSx3QkFBd0I7QUFDaEc7QUFDQSxvRUFBbUUsd0JBQXdCO0FBQzNGO0FBQ0EseUVBQXdFLHdCQUF3QjtBQUNoRztBQUNBLG9FQUFtRSx3QkFBd0I7QUFDM0Y7QUFDQSwwRUFBeUUsd0JBQXdCO0FBQ2pHO0FBQ0EscUVBQW9FLHdCQUF3QjtBQUM1RjtBQUNBLHNFQUFxRSx3QkFBd0I7QUFDN0Y7QUFDQSxpRUFBZ0Usd0JBQXdCO0FBQ3hGO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx5Q0FBeUM7QUFDOUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHdEQUF3RDtBQUN6RDtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxnRUFBZ0U7QUFDakU7QUFDQTs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMscUNBQXFDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLGdEQUErQyxnQ0FBZ0M7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFtRSxnQkFBZ0I7QUFDbkYseUJBQXdCO0FBQ3hCLDJGQUEwRjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxrREFBa0Q7QUFDbkQ7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLG9EQUFvRDtBQUNyRDs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQixPQUFPLHVDQUF1QyxTQUFTLFdBQVcsT0FBTztBQUNuRyxrREFBaUQsYUFBYSxvQkFBb0IsY0FBYztBQUNoRyw0QkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLHlDQUF5QyxFQUFFO0FBQzdFO0FBQ0EsVUFBUztBQUNULG1DQUFrQyx3REFBd0QsRUFBRSx3QkFBd0IsaUJBQWlCLEVBQUU7QUFDdkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLDJCQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MseUNBQXlDLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQ3pKO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsMERBQTBEO0FBQzNEO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGtDQUFrQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwSEFBeUgscUxBQXFMLHFCQUFxQixxSUFBcUksaUZBQWlGO0FBQ3poQjtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBZQUF5WTtBQUN6WTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLDhDQUE4QztBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLG9EQUFvRDtBQUNqRztBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxzQ0FBc0M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLDBKQUF5SixxREFBcUQ7QUFDOU07QUFDQSxpSEFBZ0gscURBQXFEO0FBQ3JLO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLDhDQUE4QztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCLFVBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQyx3Q0FBd0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUMsOEdBQThHO0FBQ3ZKO0FBQ0E7QUFDQSwyRUFBMEUsYUFBYTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF3RSx1QkFBdUI7QUFDL0Y7QUFDQTtBQUNBO0FBQ0EseUJBQXdCO0FBQ3hCLG1FQUFrRTtBQUNsRSw0QkFBMkIsUUFBUTtBQUNuQyxnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXdELDRCQUE0QixLQUFLLHVCQUF1QjtBQUNoSDtBQUNBLCtCQUE4QjtBQUM5QixnRUFBK0Q7QUFDL0Q7QUFDQSwyQkFBMEIsTUFBTSxJQUFJLE1BQU07QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsa0NBQWtDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0I7QUFDeEI7QUFDQSxrRUFBaUU7QUFDakUsdUNBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXdFLG9EQUFvRDtBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0RBQXdEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDhFQUE4RTtBQUMvRTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVFQUF1RTtBQUMvRjtBQUNBLGdEQUErQyxlQUFlO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MseUNBQXlDLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQ3pKO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxTQUFTO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNEJBQTRCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsNENBQTRDO0FBQzdDO0FBQ0E7Ozs7Ozs7QUN4VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLCtCQUErQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1Qyx1QkFBdUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsK0JBQStCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsK0JBQStCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsMkNBQTJDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNENBQTRDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsb0NBQW9DO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsK0NBQStDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyx3RUFBd0U7QUFDekU7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyw0REFBNEQ7QUFDN0Q7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsd0RBQXdEO0FBQ3pEOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdPQUF1TyxTQUFTO0FBQ2hQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsMENBQTBDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSx5R0FBd0cseUVBQXlFO0FBQ2pMLDRIQUEySCwwQkFBMEI7QUFDcko7QUFDQTtBQUNBLDBDQUF5QyxzQ0FBc0M7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9PQUFtTyxhQUFhO0FBQ2hQO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2Qyw0QkFBNEI7QUFDekU7QUFDQTtBQUNBLDhDQUE2Qyw0QkFBNEI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTRELDBDQUEwQztBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxrQ0FBa0M7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsa0RBQWtEO0FBQ25EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOFFBQTZRO0FBQzdRO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGdEQUFnRDtBQUNqRDs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFxRCxhQUFhO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLGFBQWE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywyQ0FBMkM7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5Qyw2Q0FBNkM7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsOENBQThDO0FBQ25GO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw2Q0FBNkM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxrREFBa0Q7QUFDbkQ7QUFDQTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDBEQUEwRDtBQUMzRDs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyw0REFBNEQ7QUFDN0Q7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvREFBb0Q7QUFDckQ7QUFDQTs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFnRixVQUFVO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFxRCxhQUFhO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvRUFBb0U7QUFDckU7QUFDQTs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxrREFBa0Q7QUFDbkQ7QUFDQTs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTBELFNBQVM7QUFDbkU7QUFDQTtBQUNBLHVFQUFzRSxnQ0FBZ0M7QUFDdEc7QUFDQSxrRUFBaUUsZ0JBQWdCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3Qyw0Q0FBNEM7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQThELHVCQUF1QjtBQUNyRjtBQUNBLHNDQUFxQyxzQkFBc0I7QUFDM0QsdURBQXNELHNCQUFzQjtBQUM1RSwyRUFBMEUsYUFBYTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRDtBQUNBOzs7Ozs7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxrREFBa0Q7QUFDbkQ7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDZCQUE2QjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLHVCQUF1QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQix1QkFBdUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQix1QkFBdUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUEyRTtBQUMzRTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHdFQUF3RTtBQUN6RTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxzREFBc0Q7QUFDdkQ7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsMENBQXlDO0FBQ3pDO0FBQ0EsZ0hBQStHO0FBQy9HLHFGQUFvRix5QkFBeUI7QUFDN0c7QUFDQSxnR0FBK0YsU0FBUztBQUN4RztBQUNBO0FBQ0EsdURBQXNELGdCQUFnQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MseUNBQXlDLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQ3pKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxzREFBc0Q7QUFDdkQ7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF1RSwwQkFBMEI7QUFDakc7QUFDQSwyQ0FBMEMsT0FBTztBQUNqRDtBQUNBLHVDQUFzQywwQkFBMEIsNEJBQTRCLDJCQUEyQjtBQUN2SCw0QkFBMkIsT0FBTztBQUNsQyxxREFBb0QsYUFBYTtBQUNqRSxvREFBbUQsWUFBWTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsOEJBQThCLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQzlJO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywwQ0FBMEM7QUFDL0U7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLDJDQUEyQztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsdUJBQXVCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLHVCQUF1QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrTEFBOEwsT0FBTztBQUNyTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx3Q0FBd0M7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsMkNBQTJDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvRUFBb0U7QUFDckU7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsOERBQThEO0FBQy9EOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHdFQUF3RTtBQUN6RTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBc0Usc0JBQXNCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDhDQUE4QztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDRnQkFBMmdCLGlCQUFpQixzQ0FBc0MsYUFBYSx5REFBeUQsY0FBYyxLQUFLLGlCQUFpQixxRUFBcUUsb0JBQW9CLHFhQUFxYSxhQUFhLHVnQkFBdWdCLHNCQUFzQjtBQUNwdEQ7QUFDQSxxaUJBQW9pQixpQkFBaUIsc0NBQXNDLGFBQWEseURBQXlELGNBQWMsS0FBSyxpQkFBaUIscUVBQXFFLG9CQUFvQiwyY0FBMmMsYUFBYSxpZUFBaWUsc0JBQXNCO0FBQzd1RCxnUkFBK1EsYUFBYTtBQUM1UiwyUUFBMFEsYUFBYSxtWEFBbVgsZ0JBQWdCO0FBQzFwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLG1EQUFtRCxFQUFFO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQyxXQUFXO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQixrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxUEFBb1AsK0RBQStELHdGQUF3RixhQUFhLDJCQUEyQixZQUFZLCtCQUErQixpQkFBaUIsZ0NBQWdDLGFBQWEsbURBQW1ELGNBQWMsS0FBSyxpQkFBaUIsK0RBQStELG9CQUFvQixxRUFBcUUsc0JBQXNCLCsvQkFBKy9CLFlBQVksMEJBQTBCLGFBQWEseUJBQXlCLFlBQVk7QUFDeDNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsOENBQThDO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1R0FBc0cseURBQXlEO0FBQy9KO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZLQUE0SyxrQkFBa0IsR0FBRyxhQUFhO0FBQzlNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyx3Q0FBd0M7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW1GLHlEQUF5RCxvbEJBQW9sQixpQkFBaUIsb0NBQW9DLGFBQWEsdURBQXVELGNBQWMsS0FBSyxpQkFBaUIsbUVBQW1FLG9CQUFvQix5RUFBeUUsc0JBQXNCO0FBQ25qQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJuZ09mZmljZVVpRmFicmljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKSA6IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDA3MTQ0YjM2YWI3MTE5YmUxNzY2XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvcmUnLCBbXSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvcmUvY29yZS50c1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBicmVhZGNydW1iTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWJEaXJlY3RpdmUnKTtcbnZhciBidXR0b25Nb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUnKTtcbnZhciBjYWxsb3V0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXREaXJlY3RpdmUnKTtcbnZhciBjaG9pY2VmaWVsZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGREaXJlY3RpdmUnKTtcbnZhciBjb21tYW5kQmFyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmUnKTtcbnZhciBjb250ZW50TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb250ZW50L2NvbnRlbnREaXJlY3RpdmUnKTtcbnZhciBjb250ZXh0dWFsTWVudU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUnKTtcbnZhciBkYXRlcGlja2VyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXJEaXJlY3RpdmUnKTtcbnZhciBkaWFsb2dNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dEaXJlY3RpdmUnKTtcbnZhciBkcm9wZG93bk1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd25EaXJlY3RpdmUnKTtcbnZhciBpY29uTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUnKTtcbnZhciBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbGFiZWwvbGFiZWxEaXJlY3RpdmUnKTtcbnZhciBsaW5rTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUnKTtcbnZhciBsaXN0TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9saXN0L2xpc3REaXJlY3RpdmUnKTtcbnZhciBuYXZCYXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUnKTtcbnZhciBvdmVybGF5TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUnKTtcbnZhciBwYW5lbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmUnKTtcbnZhciBwZXJzb25hY2FyZE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUnKTtcbnZhciBwZXJzb25hTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wZXJzb25hL3BlcnNvbmFEaXJlY3RpdmUnKTtcbnZhciBwcm9ncmVzc0luZGljYXRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUnKTtcbnZhciBzZWFyY2hib3hNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NlYXJjaGJveC9zZWFyY2hib3hEaXJlY3RpdmUnKTtcbnZhciBzcGlubmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUnKTtcbnZhciB0YWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUnKTtcbnZhciB0ZXh0RmllbGRNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUnKTtcbnZhciB0b2dnbGVNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUnKTtcbnZhciBvcmdDaGFydE1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUnKTtcbnZhciBwZW9wbGVQaWNrZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUnKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJywgW1xuICAgIGJyZWFkY3J1bWJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgYnV0dG9uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNhbGxvdXRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY2hvaWNlZmllbGRNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY29tbWFuZEJhck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb250ZW50TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNvbnRleHR1YWxNZW51TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRhdGVwaWNrZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgZGlhbG9nTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRyb3Bkb3duTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGljb25Nb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGFiZWxNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGlua01vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBsaXN0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG5hdkJhck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBvdmVybGF5TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBhbmVsTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlb3BsZVBpY2tlck1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwZXJzb25hY2FyZE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBwZXJzb25hTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHByb2dyZXNzSW5kaWNhdG9yTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHNlYXJjaGJveE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBzcGlubmVyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRhYmxlTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRleHRGaWVsZE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0b2dnbGVNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgb3JnQ2hhcnRNb2R1bGUubW9kdWxlLm5hbWVcbl0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb3JlL2NvbXBvbmVudHMudHNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkJyZWFkY3J1bWInO1xuICAgIH1cbiAgICBCcmVhZGNydW1iTGlua0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iTGlua0RpcmVjdGl2ZSA9IEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlO1xudmFyIEJyZWFkY3J1bWJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iQ29udHJvbGxlcigkY29tcGlsZSkge1xuICAgICAgICB0aGlzLiRjb21waWxlID0gJGNvbXBpbGU7XG4gICAgfVxuICAgIEJyZWFkY3J1bWJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRjb21waWxlJ107XG4gICAgcmV0dXJuIEJyZWFkY3J1bWJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSBCcmVhZGNydW1iQ29udHJvbGxlcjtcbnZhciBCcmVhZGNydW1iRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1CcmVhZGNydW1iXCI+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICd1aWZCcmVhZGNydW1iJztcbiAgICB9XG4gICAgQnJlYWRjcnVtYkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJyZWFkY3J1bWJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJyZWFkY3J1bWJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cmlidXRlcywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uICh0cmFuc2NsdWRlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBicmVhZGNydW1iTGlzdCA9IGFuZ3VsYXIuZWxlbWVudCgnPHVsPjwvdWw+Jyk7XG4gICAgICAgICAgICBicmVhZGNydW1iTGlzdC5hZGRDbGFzcygnbXMtQnJlYWRjcnVtYi1saXN0Jyk7XG4gICAgICAgICAgICB2YXIgdGFiSW5kZXggPSAxO1xuICAgICAgICAgICAgdmFyIGJyZWFkY3J1bWJMaW5rcyA9IHRyYW5zY2x1ZGVkRWxlbWVudDtcbiAgICAgICAgICAgIGZvciAodmFyIGJjTGlua0luZGV4ID0gMDsgYmNMaW5rSW5kZXggPCB0cmFuc2NsdWRlZEVsZW1lbnQubGVuZ3RoOyBiY0xpbmtJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmsgPSBhbmd1bGFyLmVsZW1lbnQoYnJlYWRjcnVtYkxpbmtzW2JjTGlua0luZGV4XSk7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmtbMF0ubm9kZU5hbWUgPT09ICcjdGV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBsaUVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJzxsaT48L2xpPicpO1xuICAgICAgICAgICAgICAgIGxpRWxlbWVudC5hZGRDbGFzcygnbXMtQnJlYWRjcnVtYi1saXN0SXRlbScpO1xuICAgICAgICAgICAgICAgIHZhciBhRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPGE+PC9hPicpO1xuICAgICAgICAgICAgICAgIGFFbGVtZW50LmFkZENsYXNzKCdtcy1CcmVhZGNydW1iLWl0ZW1MaW5rJyk7XG4gICAgICAgICAgICAgICAgYUVsZW1lbnQuYXR0cigndGFiaW5kZXgnLCArK3RhYkluZGV4KTtcbiAgICAgICAgICAgICAgICBhRWxlbWVudC5hdHRyKCdocmVmJywgbGluay5hdHRyKCduZy1ocmVmJykpO1xuICAgICAgICAgICAgICAgIGFFbGVtZW50LmFwcGVuZChsaW5rWzBdLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgbGlFbGVtZW50LmFwcGVuZChhRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdmFyIGljb25FbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KFwiPGk+PC9pPlwiKTtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5hZGRDbGFzcygnbXMtQnJlYWRjcnVtYi1jaGV2cm9uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgbGlFbGVtZW50LmFwcGVuZChpY29uRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWRjcnVtYkxpc3QuYXBwZW5kKGxpRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3ZlcmZsb3dEaXYgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICBvdmVyZmxvd0Rpdi5hZGRDbGFzcygnbXMtQnJlYWRjcnVtYi1vdmVyZmxvdycpO1xuICAgICAgICAgICAgdmFyIG92ZXJmbG93QnV0dG9uRGl2ID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgb3ZlcmZsb3dCdXR0b25EaXYuYWRkQ2xhc3MoJ21zLUJyZWFkY3J1bWItb3ZlcmZsb3dCdXR0b24gbXMtSWNvbiBtcy1JY29uLS1lbGxpcHNpcycpO1xuICAgICAgICAgICAgb3ZlcmZsb3dCdXR0b25EaXYuYXR0cigndGFiaW5kZXgnLCAnMScpO1xuICAgICAgICAgICAgb3ZlcmZsb3dEaXYuYXBwZW5kKG92ZXJmbG93QnV0dG9uRGl2KTtcbiAgICAgICAgICAgIHZhciBpSWNvbiA9IGFuZ3VsYXIuZWxlbWVudCgnPGk+PC9pPicpO1xuICAgICAgICAgICAgaUljb24uYWRkQ2xhc3MoJ21zLUJyZWFkY3J1bWItY2hldnJvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodCcpO1xuICAgICAgICAgICAgb3ZlcmZsb3dEaXYuYXBwZW5kKGlJY29uKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hcHBlbmQob3ZlcmZsb3dEaXYpO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZChicmVhZGNydW1iTGlzdCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEJyZWFkY3J1bWJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iRGlyZWN0aXZlID0gQnJlYWRjcnVtYkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJyZWFkY3J1bWInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCcmVhZGNydW1iJywgQnJlYWRjcnVtYkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQnJlYWRjcnVtYkxpbmsnLCBCcmVhZGNydW1iTGlua0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBidXR0b25UeXBlRW51bV90c18xID0gcmVxdWlyZSgnLi9idXR0b25UeXBlRW51bS50cycpO1xudmFyIGJ1dHRvblRlbXBsYXRlVHlwZV90c18xID0gcmVxdWlyZSgnLi9idXR0b25UZW1wbGF0ZVR5cGUudHMnKTtcbnZhciBCdXR0b25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCdXR0b25Db250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgQnV0dG9uQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIEJ1dHRvbkNvbnRyb2xsZXI7XG59KCkpO1xudmFyIEJ1dHRvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnV0dG9uRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBCdXR0b25Db250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICdidXR0b24nO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIGlmICghbmcuaXNVbmRlZmluZWQoJGF0dHJzLnVpZlR5cGUpICYmIG5nLmlzVW5kZWZpbmVkKGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bJGF0dHJzLnVpZlR5cGVdKSkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbiAtIFVuc3VwcG9ydGVkIGJ1dHRvbjogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgYnV0dG9uIChcXCcnICsgJGF0dHJzLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoJGF0dHJzLnVpZlR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5wcmltYXJ5XTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5nLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5wcmltYXJ5TGlua107XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uY29tbWFuZF06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZy5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5nLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tcG91bmRCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tcG91bmRMaW5rXTtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bS5oZXJvXTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5nLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0J1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5oZXJvTGlua107XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5nLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZUh0bWxUZW1wbGF0ZXMoKTtcbiAgICB9XG4gICAgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGluayxcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbWVudC5hdHRyKCdkaXNhYmxlZCcpOyB9LCAoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHNjb3BlLmRpc2FibGVkID0gdHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJzsgfSkpO1xuICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChhdHRycy51aWZUeXBlKSB8fFxuICAgICAgICAgICAgYXR0cnMudWlmVHlwZSA9PT0gYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLnByaW1hcnldIHx8XG4gICAgICAgICAgICBhdHRycy51aWZUeXBlID09PSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uY29tcG91bmRdKSB7XG4gICAgICAgICAgICB2YXIgaWNvbkVsZW1lbnQgPSBlbGVtZW50LmZpbmQoJ3VpZi1pY29uJyk7XG4gICAgICAgICAgICBpZiAoaWNvbkVsZW1lbnQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcnMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdJY29uIG5vdCBhbGxvd2VkIGluIHByaW1hcnkgb3IgY29tcG91bmQgYnV0dG9uczogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgcHJpbWFyeSAmIGNvbXBvdW5kIGJ1dHRvbiBkb2VzIG5vdCBzdXBwb3J0IGluY2x1ZGluZyBpY29ucyBpbiB0aGUgYm9keS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgaWNvbiBoYXMgYmVlbiByZW1vdmVkIGJ1dCBtYXkgY2F1c2UgcmVuZGVyaW5nIGVycm9ycy4gQ29uc2lkZXIgYnV0dG9ucyB0aGF0IHN1cHBvcnQgaWNvbnMgc3VjaCBhcyBjb21tYW5kIG9yIGhlcm8uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVyO1xuICAgICAgICAgICAgc3dpdGNoIChhdHRycy51aWZUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uY29tbWFuZF06XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1sYWJlbCcpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VJRi1JQ09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWljb24nKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fdHNfMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgIT09ICdTUEFOJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTGlzdFswXSA9PT0gJ25nLXNjb3BlJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1sYWJlbCcpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV90c18xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtX3RzXzEuQnV0dG9uVHlwZUVudW0uaGVyb106XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gbmcuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1sYWJlbCcpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VJRi1JQ09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBuZy5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWljb24nKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuX3BvcHVsYXRlSHRtbFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b25cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIiBuZy1kaXNhYmxlZD1cXFwiZGlzYWJsZWRcXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkxpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvblxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5wcmltYXJ5QnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLXByaW1hcnlcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIiBuZy1kaXNhYmxlZD1cXFwiZGlzYWJsZWRcXFwiPlxcbiAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtcy1CdXR0b24tbGFiZWxcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxcbiAgICAgICA8L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlMaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dID1cbiAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiIG5nLWRpc2FibGVkPVxcXCJkaXNhYmxlZFxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbXBvdW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCIgbmctZGlzYWJsZWQ9XFxcImRpc2FibGVkXFxcIj48L2J1dHRvbj5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlX3RzXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tcG91bmRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV90c18xLkJ1dHRvblRlbXBsYXRlVHlwZS5oZXJvQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWhlcm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIiBuZy1kaXNhYmxlZD1cXFwiZGlzYWJsZWRcXFwiPjwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfdHNfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWhlcm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj48L2E+XCI7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQnV0dG9uRGlyZWN0aXZlID0gQnV0dG9uRGlyZWN0aXZlO1xudmFyIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZCdXR0b24nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1CdXR0b24tZGVzY3JpcHRpb25cIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgIH1cbiAgICBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZSA9IEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b24nLCBCdXR0b25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJ1dHRvbkRlc2NyaXB0aW9uJywgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChCdXR0b25UeXBlRW51bSkge1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wicHJpbWFyeVwiXSA9IDBdID0gXCJwcmltYXJ5XCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJjb21tYW5kXCJdID0gMV0gPSBcImNvbW1hbmRcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImNvbXBvdW5kXCJdID0gMl0gPSBcImNvbXBvdW5kXCI7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJoZXJvXCJdID0gM10gPSBcImhlcm9cIjtcbn0pKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gfHwgKGV4cG9ydHMuQnV0dG9uVHlwZUVudW0gPSB7fSkpO1xudmFyIEJ1dHRvblR5cGVFbnVtID0gZXhwb3J0cy5CdXR0b25UeXBlRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKEJ1dHRvblRlbXBsYXRlVHlwZSkge1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJhY3Rpb25CdXR0b25cIl0gPSAwXSA9IFwiYWN0aW9uQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImFjdGlvbkxpbmtcIl0gPSAxXSA9IFwiYWN0aW9uTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJwcmltYXJ5QnV0dG9uXCJdID0gMl0gPSBcInByaW1hcnlCdXR0b25cIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wicHJpbWFyeUxpbmtcIl0gPSAzXSA9IFwicHJpbWFyeUxpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiY29tbWFuZEJ1dHRvblwiXSA9IDRdID0gXCJjb21tYW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbW1hbmRMaW5rXCJdID0gNV0gPSBcImNvbW1hbmRMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kQnV0dG9uXCJdID0gNl0gPSBcImNvbXBvdW5kQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbXBvdW5kTGlua1wiXSA9IDddID0gXCJjb21wb3VuZExpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiaGVyb0J1dHRvblwiXSA9IDhdID0gXCJoZXJvQnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImhlcm9MaW5rXCJdID0gOV0gPSBcImhlcm9MaW5rXCI7XG59KShleHBvcnRzLkJ1dHRvblRlbXBsYXRlVHlwZSB8fCAoZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGUgPSB7fSkpO1xudmFyIEJ1dHRvblRlbXBsYXRlVHlwZSA9IGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UZW1wbGF0ZVR5cGUudHNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2FsbG91dFR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2NhbGxvdXRUeXBlRW51bScpO1xudmFyIGNhbGxvdXRBcnJvd0VudW1fMSA9IHJlcXVpcmUoJy4vY2FsbG91dEFycm93RW51bScpO1xudmFyIENhbGxvdXRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIENhbGxvdXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIENhbGxvdXRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dENvbnRyb2xsZXIgPSBDYWxsb3V0Q29udHJvbGxlcjtcbnZhciBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWhlYWRlclwiPjxwIGNsYXNzPVwibXMtQ2FsbG91dC10aXRsZVwiIG5nLXRyYW5zY2x1ZGU+PC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgbWFpbldyYXBwZXIgPSBpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XG4gICAgICAgIGlmICghbmcuaXNVbmRlZmluZWQobWFpbldyYXBwZXIpICYmIG1haW5XcmFwcGVyLmhhc0NsYXNzKCdtcy1DYWxsb3V0LW1haW4nKSkge1xuICAgICAgICAgICAgdmFyIGRldGFjaGVkSGVhZGVyID0gaW5zdGFuY2VFbGVtZW50LmRldGFjaCgpO1xuICAgICAgICAgICAgbWFpbldyYXBwZXIucHJlcGVuZChkZXRhY2hlZEhlYWRlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dEhlYWRlckRpcmVjdGl2ZSA9IENhbGxvdXRIZWFkZXJEaXJlY3RpdmU7XG52YXIgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRDb250ZW50RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWNvbnRlbnRcIj48cCBjbGFzcz1cIm1zLUNhbGxvdXQtc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIENhbGxvdXRDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0Q29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXRDb250ZW50RGlyZWN0aXZlID0gQ2FsbG91dENvbnRlbnREaXJlY3RpdmU7XG52YXIgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWFjdGlvbnNcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeP3VpZkNhbGxvdXQnO1xuICAgIH1cbiAgICBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY2FsbG91dENvbnRyb2xsZXIpIHtcbiAgICAgICAgaWYgKG5nLmlzT2JqZWN0KGNhbGxvdXRDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJHNjb3BlLiR3YXRjaCgnaGFzU2VwYXJhdG9yJywgZnVuY3Rpb24gKGhhc1NlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNoaWxkcmVuID0gaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYnV0dG9uSW5kZXggPSAwOyBidXR0b25JbmRleCA8IGFjdGlvbkNoaWxkcmVuLmxlbmd0aDsgYnV0dG9uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbkNoaWxkcmVuLmVxKGJ1dHRvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hZGRDbGFzcygnbXMtQ2FsbG91dC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFucyA9IGFjdGlvbi5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzcGFuSW5kZXggPSAwOyBzcGFuSW5kZXggPCBhY3Rpb25TcGFucy5sZW5ndGg7IHNwYW5JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvblNwYW4gPSBhY3Rpb25TcGFucy5lcShzcGFuSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24tbGFiZWwnKSB8fCBhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24taWNvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblNwYW4uYWRkQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSA9IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlO1xudmFyIENhbGxvdXREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0IG1zLUNhbGxvdXQtLWFycm93e3thcnJvd0RpcmVjdGlvbn19XCIgJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtQ2FsbG91dC0tYWN0aW9uVGV4dFxcJzogaGFzU2VwYXJhdG9yLCBcXCdtcy1DYWxsb3V0LS1PT0JFXFwnOiB1aWZUeXBlPT1cXCdvb2JlXFwnLCcgK1xuICAgICAgICAgICAgJyBcXCdtcy1DYWxsb3V0LS1QZWVrXFwnOiB1aWZUeXBlPT1cXCdwZWVrXFwnLCBcXCdtcy1DYWxsb3V0LS1jbG9zZVxcJzogY2xvc2VCdXR0b259XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtbWFpblwiPjxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj48L2Rpdj48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkNhbGxvdXQnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nU2hvdzogJz0/JyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDYWxsb3V0Q29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2FsbG91dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENhbGxvdXREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBjYWxsb3V0Q29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndWlmVHlwZScsIGZ1bmN0aW9uIChjYWxsb3V0VHlwZSkge1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKGNhbGxvdXRUeXBlRW51bV8xLkNhbGxvdXRUeXBlW2NhbGxvdXRUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgY2FsbG91dFR5cGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlR5cGUuIEl0IHNob3VsZCBiZSBvb2JlIG9yIHBlZWsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghYXR0cnMudWlmQXJyb3cpIHtcbiAgICAgICAgICAgIHNjb3BlLmFycm93RGlyZWN0aW9uID0gJ0xlZnQnO1xuICAgICAgICB9XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCd1aWZBcnJvdycsIGZ1bmN0aW9uIChhdHRyQXJyb3dEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChjYWxsb3V0QXJyb3dFbnVtXzEuQ2FsbG91dEFycm93W2F0dHJBcnJvd0RpcmVjdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJBcnJvd0RpcmVjdGlvbiArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmQXJyb3cuIEl0IHNob3VsZCBiZSBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNhcGl0YWxpemVkRGlyZWN0aW9uID0gKGF0dHJBcnJvd0RpcmVjdGlvbi5jaGFyQXQoMCkpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBjYXBpdGFsaXplZERpcmVjdGlvbiArPSAoYXR0ckFycm93RGlyZWN0aW9uLnNsaWNlKDEpKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgc2NvcGUuYXJyb3dEaXJlY3Rpb24gPSBjYXBpdGFsaXplZERpcmVjdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmhhc1NlcGFyYXRvciA9ICghbmcuaXNVbmRlZmluZWQoYXR0cnMudWlmQWN0aW9uVGV4dCkgfHwgIW5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlNlcGFyYXRvcikpO1xuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNsb3NlKSkge1xuICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uRWxlbWVudCA9IG5nLmVsZW1lbnQoJzxidXR0b24gY2xhc3M9XCJtcy1DYWxsb3V0LWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPicgK1xuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT4nICtcbiAgICAgICAgICAgICAgICAnPC9idXR0b24+Jyk7XG4gICAgICAgICAgICB2YXIgY2FsbG91dERpdiA9IGluc3RhbmNlRWxlbWVudC5maW5kKCdkaXYnKS5lcSgwKTtcbiAgICAgICAgICAgIGNhbGxvdXREaXYuYXBwZW5kKGNsb3NlQnV0dG9uRWxlbWVudCk7XG4gICAgICAgICAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VFbGVtZW50LmJpbmQoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzTW91c2VPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50LmJpbmQoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzTW91c2VPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnbmdTaG93JywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzQ2xvc2luZ0J5QnV0dG9uQ2xpY2sgPSAhbmV3VmFsdWUgJiYgc2NvcGUuY2xvc2VCdXR0b25DbGlja2VkO1xuICAgICAgICAgICAgaWYgKGlzQ2xvc2luZ0J5QnV0dG9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubmdTaG93ID0gc2NvcGUuaXNNb3VzZU92ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2lzTW91c2VPdmVyJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgICBpZiAoIW5ld1ZhbCAmJiBvbGRWYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNjb3BlLmNsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXREaXJlY3RpdmUgPSBDYWxsb3V0RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXQnLCBDYWxsb3V0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0SGVhZGVyJywgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dENvbnRlbnQnLCBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEFjdGlvbnMnLCBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQ2FsbG91dFR5cGUpIHtcbiAgICBDYWxsb3V0VHlwZVtDYWxsb3V0VHlwZVtcIm9vYmVcIl0gPSAwXSA9IFwib29iZVwiO1xuICAgIENhbGxvdXRUeXBlW0NhbGxvdXRUeXBlW1wicGVla1wiXSA9IDFdID0gXCJwZWVrXCI7XG59KShleHBvcnRzLkNhbGxvdXRUeXBlIHx8IChleHBvcnRzLkNhbGxvdXRUeXBlID0ge30pKTtcbnZhciBDYWxsb3V0VHlwZSA9IGV4cG9ydHMuQ2FsbG91dFR5cGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0VHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKENhbGxvdXRBcnJvdykge1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJsZWZ0XCJdID0gMF0gPSBcImxlZnRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wicmlnaHRcIl0gPSAxXSA9IFwicmlnaHRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1widG9wXCJdID0gMl0gPSBcInRvcFwiO1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJib3R0b21cIl0gPSAzXSA9IFwiYm90dG9tXCI7XG59KShleHBvcnRzLkNhbGxvdXRBcnJvdyB8fCAoZXhwb3J0cy5DYWxsb3V0QXJyb3cgPSB7fSkpO1xudmFyIENhbGxvdXRBcnJvdyA9IGV4cG9ydHMuQ2FsbG91dEFycm93O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dEFycm93RW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY2hvaWNlZmllbGRUeXBlRW51bV8xID0gcmVxdWlyZSgnLi9jaG9pY2VmaWVsZFR5cGVFbnVtJyk7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZFwiPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBpZD1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtQ2hvaWNlRmllbGQtaW5wdXRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIiB2YWx1ZT1cInt7dmFsdWV9fVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiAgJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctdHJ1ZS12YWx1ZT1cInt7bmdUcnVlVmFsdWV9fVwiIG5nLWZhbHNlLXZhbHVlPVwie3tuZ0ZhbHNlVmFsdWV9fVwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtQ2hvaWNlRmllbGQtZmllbGRcIj48c3BhbiBjbGFzcz1cIm1zLUxhYmVsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkNob2ljZWZpZWxkT3B0aW9uJywgJ14/dWlmQ2hvaWNlZmllbGRHcm91cCddO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdGYWxzZVZhbHVlOiAnQCcsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPScsXG4gICAgICAgICAgICBuZ1RydWVWYWx1ZTogJ0AnLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0AnLFxuICAgICAgICAgICAgdmFsdWU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXI7XG4gICAgfVxuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgaW5wdXQgPSB0ZW1wbGF0ZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgaWYgKCEoJ25nTW9kZWwnIGluIHRlbXBsYXRlQXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ25nLW1vZGVsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIGNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNob2ljZWZpZWxkVHlwZUVudW1fMS5DaG9pY2VmaWVsZFR5cGVbbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2hvaWNlZmllbGQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmVHlwZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tlZCA9IChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5nZXRWaWV3VmFsdWUoKSA9PT0gYXR0cnMudmFsdWUpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5hZGRSZW5kZXIocmVuZGVyXzEpO1xuICAgICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3ZhbHVlJywgcmVuZGVyXzEpO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAgICAgLm9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5yZW1vdmVSZW5kZXIocmVuZGVyXzEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudFNjb3BlID0gc2NvcGUuJHBhcmVudC4kcGFyZW50O1xuICAgICAgICB2YXIgY2hlY2tEaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycyAmJiBhdHRycy5kaXNhYmxlZDtcbiAgICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gc2NvcGUuZGlzYWJsZWQgfHwgKHBhcmVudFNjb3BlICE9IG51bGwgJiYgcGFyZW50U2NvcGUuZGlzYWJsZWQpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5zdGFuY2VFbGVtZW50LmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGNoZWNrRGlzYWJsZWQoKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyZW50U2NvcGUgPT0gbnVsbCA/ICcnIDogcGFyZW50U2NvcGUuZGlzYWJsZWQ7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgY2hlY2tEaXNhYmxlZCgpOyB9KSk7XG4gICAgICAgIGNoZWNrRGlzYWJsZWQoKTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlID0gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXAtdGl0bGVcIj48bmctdHJhbnNjbHVkZSAvPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZTtcbnZhciBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLnJlbmRlckZucyA9IFtdO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuYWRkUmVuZGVyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRm5zLnB1c2goZm4pO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZVJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5zcGxpY2UodGhpcy5yZW5kZXJGbnMuaW5kZXhPZihmbikpO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnNldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldFZpZXdWYWx1ZSh2YWx1ZSwgZXZlbnRUeXBlKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVuZGVyRm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZuc1tpXSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jaG9pY2VmaWVsZCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRPcHRpb24nLCBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRHcm91cCcsIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNob2ljZWZpZWxkR3JvdXBUaXRsZScsIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoQ2hvaWNlZmllbGRUeXBlKSB7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcInJhZGlvXCJdID0gMF0gPSBcInJhZGlvXCI7XG4gICAgQ2hvaWNlZmllbGRUeXBlW0Nob2ljZWZpZWxkVHlwZVtcImNoZWNrYm94XCJdID0gMV0gPSBcImNoZWNrYm94XCI7XG59KShleHBvcnRzLkNob2ljZWZpZWxkVHlwZSB8fCAoZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGUgPSB7fSkpO1xudmFyIENob2ljZWZpZWxkVHlwZSA9IGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkVHlwZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIENvbW1hbmRCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNvbW1hbmRCYXJcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgdWlmU2VhcmNoVGVybTogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbW1hbmRCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICB7XG4gICAgICAgICAgICBzY29wZS5mb2N1c1NlYXJjaElucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmNsZWFyU2VhcmNoVGVybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZTZWFyY2hUZXJtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzY29wZS5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBDb21tYW5kQmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckRpcmVjdGl2ZSA9IENvbW1hbmRCYXJEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaFxcXCIgbmctY2xhc3M9XFxcIiRwYXJlbnQuaXNTZWFyY2hBY3RpdmUgPT0gdHJ1ZSA/ICdpcy1hY3RpdmUnIDogJyc7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyRwYXJlbnQucGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cXFwiMVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1mb2N1cz1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9IHRydWU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWJsdXI9XFxcIiRwYXJlbnQuaXNTZWFyY2hBY3RpdmUgPSBmYWxzZTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XFxcIiRwYXJlbnQudWlmU2VhcmNoVGVybVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWljb25XcmFwcGVyIG1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvblNlYXJjaFdyYXBwZXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCIkcGFyZW50LmZvY3VzU2VhcmNoSW5wdXQoKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwic2VhcmNoXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhclNlYXJjaC1pY29uV3JhcHBlciBtcy1Db21tYW5kQmFyU2VhcmNoLWljb25DbGVhcldyYXBwZXIgbXMtZm9udC1zXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb3VzZWRvd249XFxcIiRwYXJlbnQuY2xlYXJTZWFyY2hUZXJtKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcInhcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgfVxuICAgIENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUgPSBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlO1xudmFyIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ29tbWFuZEJhci1zaWRlQ29tbWFuZHNcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgfVxuICAgIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJTaWRlRGlyZWN0aXZlID0gQ29tbWFuZEJhclNpZGVEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlKCR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtQ29tbWFuZEJhci1tYWluQXJlYVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbmctaWY9XFxcInVpZlNob3dPdmVyZmxvd1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbSBtcy1Db21tYW5kQmFySXRlbS0taWNvbk9ubHkgbXMtQ29tbWFuZEJhckl0ZW0tb3ZlcmZsb3dcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGFzcz1cXFwib3ZlcmZsb3dWaXNpYmxlID09IHRydWUgPyAnaXMtdmlzaWJsZScgOiAnJztcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwib3Blbk92ZXJmbG93TWVudSgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwibXMtQ29tbWFuZEJhckl0ZW0tbGlua1xcXCIgdGFiaW5kZXg9XFxcIjJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJlbGxpcHNpc1xcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29tbWFuZEJhck1haW5Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmU2hvd092ZXJmbG93OiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkdGltZW91dCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJNYWluRGlyZWN0aXZlKCR0aW1lb3V0KTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgICAgICBzY29wZS5vcGVuT3ZlcmZsb3dNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9ICFzY29wZS5vdmVyZmxvd01lbnVPcGVuO1xuICAgICAgICAgICAgdmFyIGNvbnRleHR1YWxNZW51O1xuICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgPSBcIiA8dWlmLWNvbnRleHR1YWwtbWVudSBjbGFzcz1cXFwibXMtQ29tbWFuZEJhci1vdmVyZmxvd01lbnVcXFwiXFxuICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwib3ZlcmZsb3dNZW51T3BlblxcXCJcXG4gICAgICAgICAgICAgIHVpZi1jbG9zZS1vbi1jbGljaz1cXFwiZmFsc2VcXFwiPlwiO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93IC5tcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlciB1bCcpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5oaWRkZW5JdGVtcywgZnVuY3Rpb24gKG1lbnVpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lbnVpdGVtLnN1Ym1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gXCI8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIG5nLW1vZGVsPVxcXCJoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPSdvcGVuT3ZlcmZsb3dJdGVtKGhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udGV4dCdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctc2hvdz0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnZpc2libGUnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJzdWJNZW51XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRleHR1YWwtbWVudT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9J29wZW5PdmVyZmxvd0l0ZW0oc3ViaXRlbSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0nc3ViaXRlbS50ZXh0J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcImxpbmtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInN1Yml0ZW0gaW4gaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnN1Ym1lbnVpdGVtcyB0cmFjayBieSAkaW5kZXhcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9IFwiPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbSBuZy1tb2RlbD1cXFwiaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz0nb3Blbk92ZXJmbG93SXRlbShoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0pJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdGV4dD0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnRleHQnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXNob3c9J2hpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXS52aXNpYmxlJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGlua1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRleHR1YWxNZW51ICs9ICc8Lzx1aWYtY29udGV4dHVhbC1tZW51Pic7XG4gICAgICAgICAgICB2YXIgbWVudTtcbiAgICAgICAgICAgIG1lbnUgPSBlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdyAubXMtQ29tbWFuZEJhckl0ZW0tbGlua1dyYXBwZXInKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChtZW51KS5hcHBlbmQoY3RybC4kY29tcGlsZShjb250ZXh0dWFsTWVudSkoc2NvcGUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUubG9hZE1lbnVJdGVtcyA9IGZ1bmN0aW9uIChjb21tYW5kSXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbVdpZHRoID0gMDtcbiAgICAgICAgICAgIHZhciBjb21tYW5kSXRlbUluZGV4ID0gMDtcbiAgICAgICAgICAgIHNjb3BlLmNvbW1hbmRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbW1hbmRJdGVtcywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmhhc0NsYXNzKCdtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvdycpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJdGVtV2lkdGggKz0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29tbWFuZEl0ZW1zLnB1c2goeyBpbmRleDogY29tbWFuZEl0ZW1JbmRleCwgb2Zmc2V0OiBjb21tYW5kSXRlbVdpZHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSXRlbUluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLm9wZW5PdmVyZmxvd0l0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGl0ZW0uc3VibWVudS5jaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Ym1lbnVpdGVtO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS50ZXh0ID0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLm1lbnVUeXBlID0gJ2l0ZW0nO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5jaGlsZGl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5pID0gaXRlbS5zdWJtZW51aXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51aXRlbS5wYXJlbnQgPSBpdGVtLmk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3VibWVudWl0ZW1zLnB1c2goc3VibWVudWl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3RybC4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkaXRlbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtpdGVtLnBhcmVudF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbnRleHR1YWxNZW51LWl0ZW0nKVtpdGVtLmldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG0pLnRyaWdnZXJIYW5kbGVyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbaXRlbS5pXSkudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZEJhckl0ZW1zO1xuICAgICAgICAgICAgY29tbWFuZEJhckl0ZW1zID0gYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXItbWFpbkFyZWEgLm1zLUNvbW1hbmRCYXJJdGVtJykpO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjQwICYmIHNjb3BlLm1vYmlsZVN3aXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGNvbW1hbmRCYXJJdGVtcyk7XG4gICAgICAgICAgICAgICAgc2NvcGUubW9iaWxlU3dpdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDY0MCAmJiBzY29wZS5tb2JpbGVTd2l0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGNvbW1hbmRCYXJJdGVtcyk7XG4gICAgICAgICAgICAgICAgc2NvcGUubW9iaWxlU3dpdGNoID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuY29tbWFuZEl0ZW1zLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm9mZnNldCA+PSBlbGVtLnByb3AoJ29mZnNldFdpZHRoJykgLSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLUNvbW1hbmRCYXJJdGVtJylbZWxlbWVudC5pbmRleF0pLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaGlkZGVuSXRlbXNbZWxlbWVudC5pbmRleF0udmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtlbGVtZW50LmluZGV4XSkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5oaWRkZW5JdGVtc1tlbGVtZW50LmluZGV4XS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm92ZXJmbG93VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3RybC4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJG9uKCd1aWYtY29tbWFuZC1iYXItcmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLiRicm9hZGNhc3QoJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUubG9hZE1lbnVJdGVtcyhhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKSkpO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlSXRlbVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICA7XG4gICAgcmV0dXJuIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhck1haW5EaXJlY3RpdmUgPSBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJNYWluQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkY29tcGlsZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kY29tcGlsZSA9ICRjb21waWxlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIENvbW1hbmRCYXJNYWluQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT3ZlcmZsb3dJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5pID0gdGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWRkZW5JdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH07XG4gICAgQ29tbWFuZEJhck1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckY29tcGlsZScsICckdGltZW91dCddO1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG52YXIgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclwiPicgK1xuICAgICAgICAgICAgJyA8YSBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtcIj4nICtcbiAgICAgICAgICAgICcgPC9hPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmQ29tbWFuZEJhck1haW4nO1xuICAgIH1cbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkl0ZW07XG4gICAgICAgICAgICBoaWRkZW5JdGVtID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9uZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5hZGQoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTmFtZS5pbmRleE9mKCdtcy1mb250LScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0LmFkZCgnbXMtZm9udC1tJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0udGV4dCA9IGNsb25lW2ldLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVTCcgJiYgY2xvbmVbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLnN1Ym1lbnUgPSBjbG9uZVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChoaWRkZW5JdGVtLnN1Ym1lbnUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLm1lbnVUeXBlID0gJ2xpbmsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuSXRlbS5tZW51VHlwZSA9ICdzdWJNZW51JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3RybC5hZGRPdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsgPiB1aWYtaWNvbicpKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbScpKS5hZGRDbGFzcygnbXMtQ29tbWFuZEJhckl0ZW0taGFzVGV4dE9ubHknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSBDb21tYW5kQmFySXRlbURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbW1hbmRiYXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXInLCBDb21tYW5kQmFyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyU2VhcmNoJywgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhckl0ZW0nLCBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhck1haW4nLCBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhclNpZGUnLCBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZW50RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPHNwYW4gY2xhc3M9XFxcInVpZi1jb250ZW50XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcbiAgICB9XG4gICAgQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbnRlbnREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRlbnREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZW50JztcbiAgICByZXR1cm4gQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRlbnREaXJlY3RpdmUgPSBDb250ZW50RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGVudCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoQ29udGVudERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBNZW51SXRlbVR5cGVzO1xuKGZ1bmN0aW9uIChNZW51SXRlbVR5cGVzKSB7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wibGlua1wiXSA9IDBdID0gXCJsaW5rXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiZGl2aWRlclwiXSA9IDFdID0gXCJkaXZpZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wiaGVhZGVyXCJdID0gMl0gPSBcImhlYWRlclwiO1xuICAgIE1lbnVJdGVtVHlwZXNbTWVudUl0ZW1UeXBlc1tcInN1Yk1lbnVcIl0gPSAzXSA9IFwic3ViTWVudVwiO1xufSkoTWVudUl0ZW1UeXBlcyB8fCAoTWVudUl0ZW1UeXBlcyA9IHt9KSk7XG52YXIgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkNvbnRleHR1YWxNZW51JztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICc9P3VpZklzU2VsZWN0ZWQnLFxuICAgICAgICAgICAgb25DbGljazogJyZuZ0NsaWNrJyxcbiAgICAgICAgICAgIHRleHQ6ICc9P3VpZlRleHQnLFxuICAgICAgICAgICAgdHlwZTogJ0B1aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNZW51SXRlbVR5cGVzW3R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIHVuc3VwcG9ydGVkIG1lbnUgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgY29udGV4dCBtZW51LicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBNZW51SXRlbVR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gJ2Jvb2xlYW4nICYmICRzY29wZS5pc1NlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2ludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1zZWxlY3RlZFxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLXNlbGVjdGVkXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGF0dHJzLiRvYnNlcnZlKCdkaXNhYmxlZCcsIGZ1bmN0aW9uIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc0Rpc2FibGVkID0gISFkaXNhYmxlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHR1YWxNZW51Q29udHJvbGxlci5pc011bHRpU2VsZWN0aW9uTWVudSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5kZXNlbGVjdEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCgkc2NvcGUuaXNTZWxlY3RlZCkgJiYgISRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmNsb3NlU3ViTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzUm9vdE1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5jbG9zZVN1Yk1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRzY29wZS5vbkNsaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25DbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtZGVzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRvbigndWlmLW1lbnUtY2xvc2UnLCBmdW5jdGlvbiAoZXZlbnQsIG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAkc2NvcGUuJGlkICE9PSBtZW51SXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGlsZE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5zdWJNZW51XSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rIG1zLUNvbnRleHR1YWxNZW51LWxpbmstLWhhc01lbnVcXFwiXFxuICAgICAgICAgIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1zdWJNZW51SWNvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtY29udGV4dC1zdWJtZW51XFxcIj48L2Rpdj5cXG4gICAgICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua10gPVxuICAgICAgICAgICAgXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW1cXFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rXFxcIiBuZy1jbGFzcz1cXFwieydpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsICdpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIlxcbiAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKCRldmVudClcXFwiIGhyZWY+PHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5oZWFkZXJdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtIG1zLUNvbnRleHR1YWxNZW51LWl0ZW0tLWhlYWRlclxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9J3VpZi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMuZGl2aWRlcl0gPSBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbSBtcy1Db250ZXh0dWFsTWVudS1pdGVtLS1kaXZpZGVyXFxcIj48L2xpPlwiO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQgJiYgISRzY29wZS50ZXh0ICYmICEkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS50eXBlICE9PSAnZGl2aWRlcicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtICcgK1xuICAgICAgICAgICAgICAgICAgICAneW91IG5lZWQgdG8gcHJvdmlkZSBhIHRleHQgZm9yIGEgY29udGV4dHVhbCBtZW51IGl0ZW0uXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbT4geW91IG5lZWQgdG8gc3BlY2lmeSBlaXRoZXIgXFwndWlmLXRleHRcXCcgYXMgYXR0cmlidXRlIG9yIDx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgIF90aGlzLmluc2VydFN1Yk1lbnUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0SXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1pdGVtLWNvbnRlbnQnKSk7XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+JyArICRzY29wZS50ZXh0ICsgJzwvc3Bhbj4nKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0U3ViTWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLWNvbnRleHQtc3VibWVudScpKS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRleHR1YWxNZW51SXRlbSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Q2hpbGRNZW51ID0gZnVuY3Rpb24gKGNoaWxkTWVudUN0cmwpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGFzQ2hpbGRNZW51ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGRNZW51Q3RybCA9IGNoaWxkTWVudUN0cmw7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuICAgIHJldHVybiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG52YXIgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8dWwgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51XFxcIiBuZy10cmFuc2NsdWRlPjwvdWw+XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGNsb3NlT25DbGljazogJ0B1aWZDbG9zZU9uQ2xpY2snLFxuICAgICAgICAgICAgaXNPcGVuOiAnPT91aWZJc09wZW4nLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6ICdAdWlmTXVsdGlzZWxlY3QnXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBzZXRDbG9zZU9uQ2xpY2sgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xvc2VPbkNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5jbG9zZU9uQ2xpY2sgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0Q2xvc2VPbkNsaWNrKCRzY29wZS5jbG9zZU9uQ2xpY2spO1xuICAgICAgICAkYXR0cnMuJG9ic2VydmUoJ3VpZkNsb3NlT25DbGljaycsIHNldENsb3NlT25DbGljayk7XG4gICAgICAgIHZhciBwYXJlbnRNZW51SXRlbUN0cmwgPSAkZWxlbWVudC5jb250cm9sbGVyKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZChwYXJlbnRNZW51SXRlbUN0cmwpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51SXRlbUN0cmwuc2V0Q2hpbGRNZW51KGNvbnRleHR1YWxNZW51Q29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFuZy5pc1VuZGVmaW5lZCgkc2NvcGUubXVsdGlzZWxlY3QpICYmICRzY29wZS5tdWx0aXNlbGVjdC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdtcy1Db250ZXh0dWFsTWVudS0tbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudSc7XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51Q29udHJvbGxlcigkc2NvcGUsICRhbmltYXRlLCAkZWxlbWVudCwgJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZCA9IFtdO1xuICAgICAgICB0aGlzLmlzT3BlbkNsYXNzTmFtZSA9ICdpcy1vcGVuJztcbiAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKCRlbGVtZW50LmNvbnRyb2xsZXIoQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpKSkge1xuICAgICAgICAgICAgJHNjb3BlLmlzUm9vdE1lbnUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzT3BlbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Jvb2xlYW4nICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jb250ZXh0dWFsbWVudSAtIGludmFsaWQgYXR0cmlidXRlIHR5cGU6IFxcJ3VpZi1pcy1vcGVuXFwnLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgXFwnJyArIHR5cGVvZiBuZXdWYWx1ZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBhcyB2YWxpZCB0eXBlIGZvciBcXCd1aWYtaXMtb3BlblxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZXh0dWFsLW1lbnUgLz4uIFRoZSB2YWxpZCB0eXBlIGlzIGJvb2xlYW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkYW5pbWF0ZVtuZXdWYWx1ZSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXSgkZWxlbWVudCwgX3RoaXMuaXNPcGVuQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Sb290TWVudUNsb3NlZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgX3RoaXMuZGVzZWxlY3RJdGVtcyh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kb24oJ3VpZi1tZW51LWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc1Jvb3RNZW51ICYmICRzY29wZS5jbG9zZU9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vblJvb3RNZW51Q2xvc2VkLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmRlc2VsZWN0SXRlbXMgPSBmdW5jdGlvbiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICBpZiAoZGVzZWxlY3RQYXJlbnRNZW51cykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3VpZi1tZW51LWRlc2VsZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VTdWJNZW51cyA9IGZ1bmN0aW9uIChtZW51SXRlbVRvU2tpcCwgY2xvc2VSb290TWVudSkge1xuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1jbG9zZScsIG1lbnVJdGVtVG9Ta2lwKTtcbiAgICAgICAgaWYgKGNsb3NlUm9vdE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1jbG9zZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSB0cnVlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc1Jvb3RNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXNSb290TWVudTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNNdWx0aVNlbGVjdGlvbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc01lbnVPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnXTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVDb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50c1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuaXNQaWNraW5nWWVhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BpY2tpbmdNb250aHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5qRWxlbWVudCA9ICQoJGVsZW1lbnRbMF0pO1xuICAgICAgICAkc2NvcGUuY3RybCA9IHRoaXM7XG4gICAgfVxuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5yYW5nZSA9IGZ1bmN0aW9uIChtaW4sIG1heCwgc3RlcCkge1xuICAgICAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgICAgICB2YXIgaW5wdXQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IG1pbjsgaSA8PSBtYXg7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgaW5wdXQucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0UGlja2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtVGV4dEZpZWxkLWZpZWxkJykucGlja2FkYXRlKCdwaWNrZXInKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFBpY2tlcigpLnNldCgnc2VsZWN0JywgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZSh2YWx1ZS5nZXRGdWxsWWVhcigpLCB2YWx1ZS5nZXRNb250aCgpLCB2YWx1ZS5nZXREYXRlKCkpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmluaXREYXRlcGlja2VyID0gZnVuY3Rpb24gKG5nTW9kZWwpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1UZXh0RmllbGQtZmllbGQnKS5waWNrYWRhdGUoe1xuICAgICAgICAgICAgY2xlYXI6ICcnLFxuICAgICAgICAgICAgY2xvc2U6ICcnLFxuICAgICAgICAgICAga2xhc3M6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6ICdtcy1EYXRlUGlja2VyLWlucHV0LS1hY3RpdmUnLFxuICAgICAgICAgICAgICAgIGJveDogJ21zLURhdGVQaWNrZXItZGF5UGlja2VyJyxcbiAgICAgICAgICAgICAgICBkYXk6ICdtcy1EYXRlUGlja2VyLWRheScsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdtcy1EYXRlUGlja2VyLWRheS0tZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgIGZvY3VzZWQ6ICdtcy1EYXRlUGlja2VyLXBpY2tlci0tZm9jdXNlZCcsXG4gICAgICAgICAgICAgICAgZnJhbWU6ICdtcy1EYXRlUGlja2VyLWZyYW1lJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdtcy1EYXRlUGlja2VyLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgaG9sZGVyOiAnbXMtRGF0ZVBpY2tlci1ob2xkZXInLFxuICAgICAgICAgICAgICAgIGluZm9jdXM6ICdtcy1EYXRlUGlja2VyLWRheS0taW5mb2N1cycsXG4gICAgICAgICAgICAgICAgaW5wdXQ6ICdtcy1EYXRlUGlja2VyLWlucHV0JyxcbiAgICAgICAgICAgICAgICBtb250aDogJ21zLURhdGVQaWNrZXItbW9udGgnLFxuICAgICAgICAgICAgICAgIG5vdzogJ21zLURhdGVQaWNrZXItZGF5LS10b2RheScsXG4gICAgICAgICAgICAgICAgb3BlbmVkOiAnbXMtRGF0ZVBpY2tlci1waWNrZXItLW9wZW5lZCcsXG4gICAgICAgICAgICAgICAgb3V0Zm9jdXM6ICdtcy1EYXRlUGlja2VyLWRheS0tb3V0Zm9jdXMnLFxuICAgICAgICAgICAgICAgIHBpY2tlcjogJ21zLURhdGVQaWNrZXItcGlja2VyJyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogJ21zLURhdGVQaWNrZXItZGF5LS1zZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgdGFibGU6ICdtcy1EYXRlUGlja2VyLXRhYmxlJyxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5czogJ21zLURhdGVQaWNrZXItd2Vla2RheScsXG4gICAgICAgICAgICAgICAgd3JhcDogJ21zLURhdGVQaWNrZXItd3JhcCcsXG4gICAgICAgICAgICAgICAgeWVhcjogJ21zLURhdGVQaWNrZXIteWVhcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbml0Q3VzdG9tVmlldygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZGF5OiAnJyxcbiAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcGlja2VyID0gdGhpcy5nZXRQaWNrZXIoKTtcbiAgICAgICAgcGlja2VyLm9uKHtcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbFVwKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBwaWNrZXIuZ2V0KCdzZWxlY3QnLCAneXl5eS1tbS1kZCcpO1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRDdXN0b21WaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG1vbnRoQ29udHJvbHMgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLW1vbnRoQ29tcG9uZW50cycpO1xuICAgICAgICB2YXIgJGdvVG9kYXkgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLWdvVG9kYXknKTtcbiAgICAgICAgdmFyICRtb250aFBpY2tlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXItbW9udGhQaWNrZXInKTtcbiAgICAgICAgdmFyICR5ZWFyUGlja2VyID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci15ZWFyUGlja2VyJyk7XG4gICAgICAgIHZhciAkcGlja2VyV3JhcHBlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXItd3JhcCcpO1xuICAgICAgICB2YXIgJHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJG1vbnRoQ29udHJvbHMuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkZ29Ub2RheS5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICRtb250aFBpY2tlci5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICR5ZWFyUGlja2VyLmFwcGVuZFRvKCRwaWNrZXJXcmFwcGVyKTtcbiAgICAgICAgJG1vbnRoQ29udHJvbHMub24oJ2NsaWNrJywgJy5qcy1wcmV2TW9udGgnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykubW9udGggLSAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobnVsbCwgbmV3TW9udGgsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhDb250cm9scy5vbignY2xpY2snLCAnLmpzLW5leHRNb250aCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS5tb250aCArIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShudWxsLCBuZXdNb250aCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLXByZXZZZWFyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciAtIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtbmV4dFllYXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3WWVhciA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyICsgMTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkeWVhclBpY2tlci5vbignY2xpY2snLCAnLmpzLXByZXZEZWNhZGUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3WWVhciA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyIC0gMTA7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1uZXh0RGVjYWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciArIDEwO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRnb1RvZGF5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgJHBpY2tlci5zZXQoJ3NlbGVjdCcsIG5vdyk7XG4gICAgICAgICAgICBzZWxmLmpFbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1waWNraW5nTW9udGhzJykucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1jaGFuZ2VEYXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSBjdXJyZW50RGF0ZS55ZWFyO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gKyQodGhpcykuYXR0cignZGF0YS1tb250aCcpO1xuICAgICAgICAgICAgdmFyIG5ld0RheSA9IGN1cnJlbnREYXRlLmRheTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuakVsZW1lbnQuaGFzQ2xhc3MoJ2lzLXBpY2tpbmdNb250aHMnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuakVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdNb250aHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1jaGFuZ2VEYXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSArJCh0aGlzKS5hdHRyKCdkYXRhLXllYXInKTtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9IGN1cnJlbnREYXRlLm1vbnRoO1xuICAgICAgICAgICAgdmFyIG5ld0RheSA9IGN1cnJlbnREYXRlLmRheTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuakVsZW1lbnQuaGFzQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ1llYXJzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtc2hvd01vbnRoUGlja2VyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmlzUGlja2luZ01vbnRocyA9ICFzZWxmLmlzUGlja2luZ01vbnRocztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtc2hvd1llYXJQaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuaXNQaWNraW5nWWVhcnMgPSAhc2VsZi5pc1BpY2tpbmdZZWFycztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi4kc2NvcGUuaGlnaGxpZ2h0ZWRWYWx1ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zY3JvbGxVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRoaXMuakVsZW1lbnQub2Zmc2V0KCkudG9wIH0sIDM2Nyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlID0gZnVuY3Rpb24gKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpIHtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIGlmIChuZXdZZWFyID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld1llYXIgPSBwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNb250aCA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdNb250aCA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEYXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3RGF5ID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0JykuZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBwaWNrZXIuc2V0KCdoaWdobGlnaHQnLCBbbmV3WWVhciwgbmV3TW9udGgsIG5ld0RheV0pO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWdobGlnaHRlZFZhbHVlID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gRGF0ZXBpY2tlckNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EYXRlcGlja2VyQ29udHJvbGxlciA9IERhdGVwaWNrZXJDb250cm9sbGVyO1xudmFyIERhdGVwaWNrZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyXFwnOiB0cnVlLCBcXCdpcy1waWNraW5nWWVhcnNcXCc6IGN0cmwuaXNQaWNraW5nWWVhcnMsIFxcJ2lzLXBpY2tpbmdNb250aHNcXCc6IGN0cmwuaXNQaWNraW5nTW9udGhzfVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1UZXh0RmllbGRcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLURhdGVQaWNrZXItZXZlbnQgbXMtSWNvbiBtcy1JY29uLS1ldmVudFwiPjwvaT4nICtcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJtcy1UZXh0RmllbGQtZmllbGRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbW9udGhDb21wb25lbnRzXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLW5leHRNb250aCBqcy1uZXh0TW9udGhcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldk1vbnRoIGpzLXByZXZNb250aFwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItaGVhZGVyVG9nZ2xlVmlldyBqcy1zaG93TW9udGhQaWNrZXJcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItZ29Ub2RheSBqcy1nb1RvZGF5XCI+R28gdG8gdG9kYXk8L3NwYW4+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbW9udGhQaWNrZXJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci15ZWFyQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0WWVhciBqcy1uZXh0WWVhclwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1wcmV2WWVhciBqcy1wcmV2WWVhclwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItY3VycmVudFllYXIganMtc2hvd1llYXJQaWNrZXJcIj57e2hpZ2hsaWdodGVkVmFsdWUueWVhcn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItb3B0aW9uR3JpZFwiID4nICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1yZXBlYXQ9XCJtb250aCBpbiBtb250aHNBcnJheVwiJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlci1tb250aE9wdGlvbiBqcy1jaGFuZ2VEYXRlXFwnOiB0cnVlLCAnICtcbiAgICAgICAgICAgICdcXCdpcy1oaWdobGlnaHRlZFxcJzogaGlnaGxpZ2h0ZWRWYWx1ZS5tb250aCA9PSAkaW5kZXh9XCInICtcbiAgICAgICAgICAgICdkYXRhLW1vbnRoPVwie3skaW5kZXh9fVwiPicgK1xuICAgICAgICAgICAgJ3t7bW9udGh9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci15ZWFyUGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItZGVjYWRlQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0RGVjYWRlIGpzLW5leHREZWNhZGVcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldkRlY2FkZSBqcy1wcmV2RGVjYWRlXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25MZWZ0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1jdXJyZW50RGVjYWRlXCI+e3toaWdobGlnaHRlZFZhbHVlLnllYXIgLSAxMH19IC0ge3toaWdobGlnaHRlZFZhbHVlLnllYXJ9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW9wdGlvbkdyaWRcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyLXllYXJPcHRpb24ganMtY2hhbmdlRGF0ZVxcJzogdHJ1ZSwnICtcbiAgICAgICAgICAgICdcXCdpcy1oaWdobGlnaHRlZFxcJzogaGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyID09IHllYXJ9XCIgJyArXG4gICAgICAgICAgICAnbmctcmVwZWF0PVwieWVhciBpbiBjdHJsLnJhbmdlKGhpZ2hsaWdodGVkVmFsdWUueWVhciAtIDEwLCBoaWdobGlnaHRlZFZhbHVlLnllYXIpXCInICtcbiAgICAgICAgICAgICdkYXRhLXllYXI9XCJ7e3llYXJ9fVwiPnt7eWVhcn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERhdGVwaWNrZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHVpZk1vbnRoczogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmRGF0ZXBpY2tlcicsICc/bmdNb2RlbCddO1xuICAgIH1cbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGF0ZXBpY2tlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGluayxcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKCRzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBpbnN0YW5jZUF0dHJpYnV0ZXMsIGN0cmxzKSB7XG4gICAgICAgIGlmICghJHNjb3BlLnVpZk1vbnRocykge1xuICAgICAgICAgICAgJHNjb3BlLnVpZk1vbnRocyA9ICdKYW4sIEZlYiwgTWFyLCBBcHIsIE1heSwgSnVuLCBKdWwsIEF1ZywgU2VwLCBPY3QsIE5vdiwgRGVjJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoISRzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgJHNjb3BlLnBsYWNlaG9sZGVyID0gJ1NlbGVjdCBhIGRhdGUnO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5tb250aHNBcnJheSA9ICRzY29wZS51aWZNb250aHMuc3BsaXQoJywnKTtcbiAgICAgICAgaWYgKCRzY29wZS5tb250aHNBcnJheS5sZW5ndGggIT09IDEyKSB7XG4gICAgICAgICAgICB0aHJvdyAnTW9udGhzIHNldHRpbmcgc2hvdWxkIGhhdmUgMTIgbW9udGhzLCBzZXBhcmF0ZWQgYnkgYSBjb21tYSc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgZGF0ZXBpY2tlckNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG5nTW9kZWwgPSBjdHJsc1sxXTtcbiAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuaW5pdERhdGVwaWNrZXIobmdNb2RlbCk7XG4gICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChuZ01vZGVsLiRtb2RlbFZhbHVlICE9PSAnJyAmJiB0eXBlb2YgbmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5nTW9kZWwuJG1vZGVsVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLnNldFZhbHVlKGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuc2V0VmFsdWUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIERhdGVwaWNrZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EYXRlcGlja2VyRGlyZWN0aXZlID0gRGF0ZXBpY2tlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRhdGVwaWNrZXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRhdGVwaWNrZXInLCBEYXRlcGlja2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBkaWFsb2dFbnVtc190c18xID0gcmVxdWlyZSgnLi9kaWFsb2dFbnVtcy50cycpO1xudmFyIERpYWxvZ0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0NvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBEaWFsb2dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xudmFyIERpYWxvZ0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2dcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwieyBcXCdtcy1EaWFsb2ctLWNsb3NlXFwnOiB1aWZDbG9zZT09XFwndHJ1ZVxcJycgK1xuICAgICAgICAgICAgJywgXFwnbXMtRGlhbG9nLS1sZ0hlYWRlclxcJzogdWlmVHlwZT09XFwnaGVhZGVyXFwnJyArXG4gICAgICAgICAgICAnLCBcXCdtcy1EaWFsb2ctLW11bHRpbGluZVxcJzogdWlmVHlwZT09XFwnbXVsdGlsaW5lXFwnIH1cIj4nICtcbiAgICAgICAgICAgICc8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XCJ7e3VpZk92ZXJsYXl9fVwiPjwvdWlmLW92ZXJsYXk+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1tYWluXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmQ2xvc2U6ICdAJyxcbiAgICAgICAgICAgIHVpZk92ZXJsYXk6ICdAJyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFsb2dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAobmV3VmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dFbnVtc190c18xLkRpYWxvZ1R5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nIC0gVW5zdXBwb3J0ZWQgdHlwZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dEaXJlY3RpdmUgPSBEaWFsb2dEaXJlY3RpdmU7XG52YXIgRGlhbG9nSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeXnVpZkRpYWxvZyc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiJHBhcmVudC51aWZDbG9zZVwiIGNsYXNzPVwibXMtRGlhbG9nLWJ1dHRvbiBtcy1EaWFsb2ctYnV0dG9uLS1jbG9zZVwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dIZWFkZXJEaXJlY3RpdmUgPSBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG52YXIgRGlhbG9nQ29udGVudERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQ29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWNvbnRlbnRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRlbnREaXJlY3RpdmUgPSBEaWFsb2dDb250ZW50RGlyZWN0aXZlO1xudmFyIERpYWxvZ0lubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dJbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0lubmVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nSW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dJbm5lckRpcmVjdGl2ZSA9IERpYWxvZ0lubmVyRGlyZWN0aXZlO1xudmFyIERpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ1N1YnRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHAgY2xhc3M9XCJtcy1EaWFsb2ctc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPic7XG4gICAgfVxuICAgIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nU3VidGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlO1xudmFyIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zQ29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xudmFyIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctYWN0aW9uc1wiPjxkaXYgbmctY2xhc3M9XCJ7IFxcJ21zLURpYWxvZy1hY3Rpb25zUmlnaHRcXCc6IHVpZlBvc2l0aW9uPT1cXCdyaWdodFxcJ31cIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlBvc2l0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUG9zaXRpb24nLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChuZXdWYWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZ0VudW1zX3RzXzEuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZyAtIFVuc3VwcG9ydGVkIHR5cGU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZQb3NpdGlvbiArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zRGlyZWN0aXZlID0gRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZycsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZycsIERpYWxvZ0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nSGVhZGVyJywgRGlhbG9nSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dDb250ZW50JywgRGlhbG9nQ29udGVudERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nSW5uZXInLCBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nU3VidGV4dCcsIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0FjdGlvbnMnLCBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKERpYWxvZ1R5cGVFbnVtKSB7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcImhlYWRlclwiXSA9IDFdID0gXCJoZWFkZXJcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcIm11bHRpbGluZVwiXSA9IDJdID0gXCJtdWx0aWxpbmVcIjtcbn0pKGV4cG9ydHMuRGlhbG9nVHlwZUVudW0gfHwgKGV4cG9ydHMuRGlhbG9nVHlwZUVudW0gPSB7fSkpO1xudmFyIERpYWxvZ1R5cGVFbnVtID0gZXhwb3J0cy5EaWFsb2dUeXBlRW51bTtcbihmdW5jdGlvbiAoRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSkge1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcImxlZnRcIl0gPSAxXSA9IFwibGVmdFwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcInJpZ2h0XCJdID0gMl0gPSBcInJpZ2h0XCI7XG59KShleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gfHwgKGV4cG9ydHMuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSA9IHt9KSk7XG52YXIgRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSA9IGV4cG9ydHMuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmRHJvcGRvd24nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBkcm9wZG93bkNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKCFkcm9wZG93bkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHRocm93ICdEcm9wZG93biBjb250cm9sbGVyIG5vdCBmb3VuZCEnO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudFxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuc2V0Vmlld1ZhbHVlKGluc3RhbmNlRWxlbWVudC5maW5kKCdzcGFuJykuaHRtbCgpLCBhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdmFsdWUgPSBkcm9wZG93bkNvbnRyb2xsZXIuZ2V0Vmlld1ZhbHVlKCk7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSA9PT0gYXR0cnMudmFsdWUpIHtcbiAgICAgICAgICAgIGRyb3Bkb3duQ29udHJvbGxlci5zZXRWaWV3VmFsdWUoYXR0cnMudGl0bGUsIGF0dHJzLnZhbHVlLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRHJvcGRvd25PcHRpb25EaXJlY3RpdmUgPSBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZTtcbnZhciBEcm9wZG93bkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duQ29udHJvbGxlcigkZWxlbWVudCwgJHNjb3BlLCAkZG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkZG9jdW1lbnQ7XG4gICAgfVxuICAgIERyb3Bkb3duQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuJHNjb3BlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuaXNPcGVuID0gIXNlbGYuJHNjb3BlLmlzT3BlbjtcbiAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB2YXIgZHJvcGRvd25XaWR0aCA9IGFuZ3VsYXIuZWxlbWVudCh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Ecm9wZG93bicpKVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQodGhpcy5xdWVyeVNlbGVjdG9yKCcubXMtRHJvcGRvd24taXRlbXMnKSlbMF0uc3R5bGUud2lkdGggPSBkcm9wZG93bldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLiRzY29wZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZG9jdW1lbnQub2ZmKCdjbGljaycsIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRkb2N1bWVudC5vbignY2xpY2snLCBkb2N1bWVudENsaWNrSGFuZGxlcl8xKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGRvY3VtZW50Lm9mZignY2xpY2snLCBkb2N1bWVudENsaWNrSGFuZGxlcl8xKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHNlbGYuJGVsZW1lbnQuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbi5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc2VsZi4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gYW5ndWxhci5lbGVtZW50KG9wdGlvbikuZmluZCgnc3BhbicpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKHRpdGxlLCB2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkVGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHZhbHVlLCBldmVudFR5cGUpO1xuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJywgJyRkb2N1bWVudCddO1xuICAgIHJldHVybiBEcm9wZG93bkNvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0cy5Ecm9wZG93bkNvbnRyb2xsZXIgPSBEcm9wZG93bkNvbnRyb2xsZXI7XG52YXIgRHJvcGRvd25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xpY2s9XCJkcm9wZG93bkNsaWNrXCIgJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtRHJvcGRvd25cXCcgOiB0cnVlLCBcXCdpcy1vcGVuXFwnOiBpc09wZW4sIFxcJ2lzLWRpc2FibGVkXFwnOiBkaXNhYmxlZH1cIiB0YWJpbmRleD1cIjBcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLURyb3Bkb3duLWNhcmV0RG93biBtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiPjwvaT4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURyb3Bkb3duLXRpdGxlXCI+e3tzZWxlY3RlZFRpdGxlfX08L3NwYW4+PHVsIGNsYXNzPVwibXMtRHJvcGRvd24taXRlbXNcIj48bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC91bD48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZkRyb3Bkb3duJywgJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRHJvcGRvd25Db250cm9sbGVyO1xuICAgIH1cbiAgICBEcm9wZG93bkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERyb3Bkb3duRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEcm9wZG93bkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERyb3Bkb3duRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGluc3RhbmNlQXR0cmlidXRlcywgY3RybHMpIHtcbiAgICAgICAgdmFyIGRyb3Bkb3duQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICB2YXIgbW9kZWxDb250cm9sbGVyID0gY3RybHNbMV07XG4gICAgICAgIHNjb3BlLm5nTW9kZWwgPSBtb2RlbENvbnRyb2xsZXI7XG4gICAgICAgIGRyb3Bkb3duQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRyb3Bkb3duRGlyZWN0aXZlID0gRHJvcGRvd25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kcm9wZG93bicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmRHJvcGRvd25PcHRpb24nLCBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRHJvcGRvd24nLCBEcm9wZG93bkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBpY29uRW51bV8xID0gcmVxdWlyZSgnLi9pY29uRW51bScpO1xudmFyIEljb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJY29uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIEljb25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICByZXR1cm4gSWNvbkNvbnRyb2xsZXI7XG59KCkpO1xudmFyIEljb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXt7dWlmVHlwZX19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gSWNvbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ2ljb24nO1xuICAgIH1cbiAgICBJY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSWNvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgSWNvbkRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaWNvbkVudW1fMS5JY29uRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuaWNvbiAtIFVuc3VwcG9ydGVkIGljb246ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGljb24gKFxcJycgKyBzY29wZS51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gSWNvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkljb25EaXJlY3RpdmUgPSBJY29uRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuaWNvbicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmSWNvbicsIEljb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25EaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChJY29uRW51bSkge1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnRcIl0gPSAwXSA9IFwiYWxlcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFsZXJ0MlwiXSA9IDFdID0gXCJhbGVydDJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFsZXJ0T3V0bGluZVwiXSA9IDJdID0gXCJhbGVydE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93blwiXSA9IDNdID0gXCJhcnJvd0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93bjJcIl0gPSA0XSA9IFwiYXJyb3dEb3duMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duTGVmdFwiXSA9IDVdID0gXCJhcnJvd0Rvd25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25SaWdodFwiXSA9IDZdID0gXCJhcnJvd0Rvd25SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dMZWZ0XCJdID0gN10gPSBcImFycm93TGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dSaWdodFwiXSA9IDhdID0gXCJhcnJvd1JpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwXCJdID0gOV0gPSBcImFycm93VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXAyXCJdID0gMTBdID0gXCJhcnJvd1VwMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcExlZnRcIl0gPSAxMV0gPSBcImFycm93VXBMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwUmlnaHRcIl0gPSAxMl0gPSBcImFycm93VXBSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXNjZW5kaW5nXCJdID0gMTNdID0gXCJhc2NlbmRpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImF0XCJdID0gMTRdID0gXCJhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXR0YWNobWVudFwiXSA9IDE1XSA9IFwiYXR0YWNobWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmFnXCJdID0gMTZdID0gXCJiYWdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJhbGxvb25cIl0gPSAxN10gPSBcImJhbGxvb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJlbGxcIl0gPSAxOF0gPSBcImJlbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvYXJkc1wiXSA9IDE5XSA9IFwiYm9hcmRzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib2xkXCJdID0gMjBdID0gXCJib2xkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJib29rbWFya1wiXSA9IDIxXSA9IFwiYm9va21hcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvb2tzXCJdID0gMjJdID0gXCJib29rc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYnJpZWZjYXNlXCJdID0gMjNdID0gXCJicmllZmNhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJ1bmRsZVwiXSA9IDI0XSA9IFwiYnVuZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWtlXCJdID0gMjVdID0gXCJjYWtlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhclwiXSA9IDI2XSA9IFwiY2FsZW5kYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyRGF5XCJdID0gMjddID0gXCJjYWxlbmRhckRheVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJQdWJsaWNcIl0gPSAyOF0gPSBcImNhbGVuZGFyUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhcldlZWtcIl0gPSAyOV0gPSBcImNhbGVuZGFyV2Vla1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJXb3JrV2Vla1wiXSA9IDMwXSA9IFwiY2FsZW5kYXJXb3JrV2Vla1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FtZXJhXCJdID0gMzFdID0gXCJjYW1lcmFcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhclwiXSA9IDMyXSA9IFwiY2FyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25cIl0gPSAzM10gPSBcImNhcmV0RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duTGVmdFwiXSA9IDM0XSA9IFwiY2FyZXREb3duTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duT3V0bGluZVwiXSA9IDM1XSA9IFwiY2FyZXREb3duT3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXREb3duUmlnaHRcIl0gPSAzNl0gPSBcImNhcmV0RG93blJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldExlZnRcIl0gPSAzN10gPSBcImNhcmV0TGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRMZWZ0T3V0bGluZVwiXSA9IDM4XSA9IFwiY2FyZXRMZWZ0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRSaWdodFwiXSA9IDM5XSA9IFwiY2FyZXRSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRSaWdodE91dGxpbmVcIl0gPSA0MF0gPSBcImNhcmV0UmlnaHRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwXCJdID0gNDFdID0gXCJjYXJldFVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwTGVmdFwiXSA9IDQyXSA9IFwiY2FyZXRVcExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBPdXRsaW5lXCJdID0gNDNdID0gXCJjYXJldFVwT3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcFJpZ2h0XCJdID0gNDRdID0gXCJjYXJldFVwUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcnRcIl0gPSA0NV0gPSBcImNhcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhdFwiXSA9IDQ2XSA9IFwiY2F0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGFydFwiXSA9IDQ3XSA9IFwiY2hhcnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXRcIl0gPSA0OF0gPSBcImNoYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXRBZGRcIl0gPSA0OV0gPSBcImNoYXRBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrXCJdID0gNTBdID0gXCJjaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tib3hcIl0gPSA1MV0gPSBcImNoZWNrYm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveENoZWNrXCJdID0gNTJdID0gXCJjaGVja2JveENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveEVtcHR5XCJdID0gNTNdID0gXCJjaGVja2JveEVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveE1peGVkXCJdID0gNTRdID0gXCJjaGVja2JveE1peGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja1Blb3BsZVwiXSA9IDU1XSA9IFwiY2hlY2tQZW9wbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25Eb3duXCJdID0gNTZdID0gXCJjaGV2cm9uRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbkxlZnRcIl0gPSA1N10gPSBcImNoZXZyb25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uUmlnaHRcIl0gPSA1OF0gPSBcImNoZXZyb25SaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNEb3duXCJdID0gNTldID0gXCJjaGV2cm9uc0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zTGVmdFwiXSA9IDYwXSA9IFwiY2hldnJvbnNMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc1JpZ2h0XCJdID0gNjFdID0gXCJjaGV2cm9uc1JpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc1VwXCJdID0gNjJdID0gXCJjaGV2cm9uc1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tEb3duXCJdID0gNjNdID0gXCJjaGV2cm9uVGhpY2tEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tMZWZ0XCJdID0gNjRdID0gXCJjaGV2cm9uVGhpY2tMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpY2tSaWdodFwiXSA9IDY1XSA9IFwiY2hldnJvblRoaWNrUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja1VwXCJdID0gNjZdID0gXCJjaGV2cm9uVGhpY2tVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5Eb3duXCJdID0gNjddID0gXCJjaGV2cm9uVGhpbkRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluTGVmdFwiXSA9IDY4XSA9IFwiY2hldnJvblRoaW5MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpblJpZ2h0XCJdID0gNjldID0gXCJjaGV2cm9uVGhpblJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpblVwXCJdID0gNzBdID0gXCJjaGV2cm9uVGhpblVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVXBcIl0gPSA3MV0gPSBcImNoZXZyb25VcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlXCJdID0gNzJdID0gXCJjaXJjbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUJhbGxcIl0gPSA3M10gPSBcImNpcmNsZUJhbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUJhbGxvb25zXCJdID0gNzRdID0gXCJjaXJjbGVCYWxsb29uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ2FyXCJdID0gNzVdID0gXCJjaXJjbGVDYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNhdFwiXSA9IDc2XSA9IFwiY2lyY2xlQ2F0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDb2ZmZWVcIl0gPSA3N10gPSBcImNpcmNsZUNvZmZlZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRG9nXCJdID0gNzhdID0gXCJjaXJjbGVEb2dcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUVtcHR5XCJdID0gNzldID0gXCJjaXJjbGVFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRmlsbFwiXSA9IDgwXSA9IFwiY2lyY2xlRmlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlRmlsbGVkXCJdID0gODFdID0gXCJjaXJjbGVGaWxsZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUhhbGZGaWxsZWRcIl0gPSA4Ml0gPSBcImNpcmNsZUhhbGZGaWxsZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUluZm9cIl0gPSA4M10gPSBcImNpcmNsZUluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUxpZ2h0bmluZ1wiXSA9IDg0XSA9IFwiY2lyY2xlTGlnaHRuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQaWxsXCJdID0gODVdID0gXCJjaXJjbGVQaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQbGFuZVwiXSA9IDg2XSA9IFwiY2lyY2xlUGxhbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBsdXNcIl0gPSA4N10gPSBcImNpcmNsZVBsdXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZVBvb2RsZVwiXSA9IDg4XSA9IFwiY2lyY2xlUG9vZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVVbmZpbGxlZFwiXSA9IDg5XSA9IFwiY2lyY2xlVW5maWxsZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsYXNzTm90ZWJvb2tcIl0gPSA5MF0gPSBcImNsYXNzTm90ZWJvb2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsYXNzcm9vbVwiXSA9IDkxXSA9IFwiY2xhc3Nyb29tXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbG9ja1wiXSA9IDkyXSA9IFwiY2xvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNsdXR0ZXJcIl0gPSA5M10gPSBcImNsdXR0ZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvZmZlZVwiXSA9IDk0XSA9IFwiY29mZmVlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb2xsYXBzZVwiXSA9IDk1XSA9IFwiY29sbGFwc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbmZsaWN0XCJdID0gOTZdID0gXCJjb25mbGljdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdFwiXSA9IDk3XSA9IFwiY29udGFjdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdEZvcm1cIl0gPSA5OF0gPSBcImNvbnRhY3RGb3JtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb250YWN0UHVibGljXCJdID0gOTldID0gXCJjb250YWN0UHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb3B5XCJdID0gMTAwXSA9IFwiY29weVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY3JlZGl0Q2FyZFwiXSA9IDEwMV0gPSBcImNyZWRpdENhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNyZWRpdENhcmRPdXRsaW5lXCJdID0gMTAyXSA9IFwiY3JlZGl0Q2FyZE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRhc2hib2FyZFwiXSA9IDEwM10gPSBcImRhc2hib2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGVzY2VuZGluZ1wiXSA9IDEwNF0gPSBcImRlc2NlbmRpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRlc2t0b3BcIl0gPSAxMDVdID0gXCJkZXNrdG9wXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXZpY2VXaXBlXCJdID0gMTA2XSA9IFwiZGV2aWNlV2lwZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGlhbHBhZFwiXSA9IDEwN10gPSBcImRpYWxwYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRpcmVjdGlvbnNcIl0gPSAxMDhdID0gXCJkaXJlY3Rpb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFwiXSA9IDEwOV0gPSBcImRvY3VtZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEFkZFwiXSA9IDExMF0gPSBcImRvY3VtZW50QWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEZvcndhcmRcIl0gPSAxMTFdID0gXCJkb2N1bWVudEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50TGFuZHNjYXBlXCJdID0gMTEyXSA9IFwiZG9jdW1lbnRMYW5kc2NhcGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UERGXCJdID0gMTEzXSA9IFwiZG9jdW1lbnRQREZcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UmVwbHlcIl0gPSAxMTRdID0gXCJkb2N1bWVudFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudHNcIl0gPSAxMTVdID0gXCJkb2N1bWVudHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50U2VhcmNoXCJdID0gMTE2XSA9IFwiZG9jdW1lbnRTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvZ1wiXSA9IDExN10gPSBcImRvZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9nQWx0XCJdID0gMTE4XSA9IFwiZG9nQWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb3RcIl0gPSAxMTldID0gXCJkb3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvd25sb2FkXCJdID0gMTIwXSA9IFwiZG93bmxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRybVwiXSA9IDEyMV0gPSBcImRybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJvcFwiXSA9IDEyMl0gPSBcImRyb3BcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRyb3Bkb3duXCJdID0gMTIzXSA9IFwiZHJvcGRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVkaXRCb3hcIl0gPSAxMjRdID0gXCJlZGl0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbGxpcHNpc1wiXSA9IDEyNV0gPSBcImVsbGlwc2lzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbWJlZFwiXSA9IDEyNl0gPSBcImVtYmVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFwiXSA9IDEyN10gPSBcImV2ZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudENhbmNlbFwiXSA9IDEyOF0gPSBcImV2ZW50Q2FuY2VsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudEluZm9cIl0gPSAxMjldID0gXCJldmVudEluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50UmVjdXJyaW5nXCJdID0gMTMwXSA9IFwiZXZlbnRSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50U2hhcmVcIl0gPSAxMzFdID0gXCJldmVudFNoYXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleGNsYW1hdGlvblwiXSA9IDEzMl0gPSBcImV4Y2xhbWF0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleHBhbmRcIl0gPSAxMzNdID0gXCJleHBhbmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV5ZVwiXSA9IDEzNF0gPSBcImV5ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmF2b3JpdGVzXCJdID0gMTM1XSA9IFwiZmF2b3JpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmYXhcIl0gPSAxMzZdID0gXCJmYXhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkTWFpbFwiXSA9IDEzN10gPSBcImZpZWxkTWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGROdW1iZXJcIl0gPSAxMzhdID0gXCJmaWVsZE51bWJlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRUZXh0XCJdID0gMTM5XSA9IFwiZmllbGRUZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZFRleHRCb3hcIl0gPSAxNDBdID0gXCJmaWVsZFRleHRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVEb2N1bWVudFwiXSA9IDE0MV0gPSBcImZpbGVEb2N1bWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZUltYWdlXCJdID0gMTQyXSA9IFwiZmlsZUltYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlUERGXCJdID0gMTQzXSA9IFwiZmlsZVBERlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsdGVyXCJdID0gMTQ0XSA9IFwiZmlsdGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWx0ZXJDbGVhclwiXSA9IDE0NV0gPSBcImZpbHRlckNsZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaXJzdEFpZFwiXSA9IDE0Nl0gPSBcImZpcnN0QWlkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmbGFnXCJdID0gMTQ3XSA9IFwiZmxhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyXCJdID0gMTQ4XSA9IFwiZm9sZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJNb3ZlXCJdID0gMTQ5XSA9IFwiZm9sZGVyTW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyUHVibGljXCJdID0gMTUwXSA9IFwiZm9sZGVyUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJTZWFyY2hcIl0gPSAxNTFdID0gXCJmb2xkZXJTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnRDb2xvclwiXSA9IDE1Ml0gPSBcImZvbnRDb2xvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udERlY3JlYXNlXCJdID0gMTUzXSA9IFwiZm9udERlY3JlYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250SW5jcmVhc2VcIl0gPSAxNTRdID0gXCJmb250SW5jcmVhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZyb3dueVwiXSA9IDE1NV0gPSBcImZyb3dueVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZnVsbHNjcmVlblwiXSA9IDE1Nl0gPSBcImZ1bGxzY3JlZW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdlYXJcIl0gPSAxNTddID0gXCJnZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnbGFzc2VzXCJdID0gMTU4XSA9IFwiZ2xhc3Nlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2xvYmVcIl0gPSAxNTldID0gXCJnbG9iZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JhcGhcIl0gPSAxNjBdID0gXCJncmFwaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JvdXBcIl0gPSAxNjFdID0gXCJncm91cFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhZGVyXCJdID0gMTYyXSA9IFwiaGVhZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydFwiXSA9IDE2M10gPSBcImhlYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydEVtcHR5XCJdID0gMTY0XSA9IFwiaGVhcnRFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGlkZVwiXSA9IDE2NV0gPSBcImhpZGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhvbWVcIl0gPSAxNjZdID0gXCJob21lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmJveENoZWNrXCJdID0gMTY3XSA9IFwiaW5ib3hDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5mb1wiXSA9IDE2OF0gPSBcImluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluZm9DaXJjbGVcIl0gPSAxNjldID0gXCJpbmZvQ2lyY2xlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpdGFsaWNcIl0gPSAxNzBdID0gXCJpdGFsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImtleVwiXSA9IDE3MV0gPSBcImtleVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGF0ZVwiXSA9IDE3Ml0gPSBcImxhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZmVzYXZlclwiXSA9IDE3M10gPSBcImxpZmVzYXZlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlmZXNhdmVyTG9ja1wiXSA9IDE3NF0gPSBcImxpZmVzYXZlckxvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZ2h0QnVsYlwiXSA9IDE3NV0gPSBcImxpZ2h0QnVsYlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlnaHRuaW5nXCJdID0gMTc2XSA9IFwibGlnaHRuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaW5rXCJdID0gMTc3XSA9IFwibGlua1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlua1JlbW92ZVwiXSA9IDE3OF0gPSBcImxpbmtSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RCdWxsZXRzXCJdID0gMTc5XSA9IFwibGlzdEJ1bGxldHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RDaGVja1wiXSA9IDE4MF0gPSBcImxpc3RDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdENoZWNrYm94XCJdID0gMTgxXSA9IFwibGlzdENoZWNrYm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0R3JvdXBcIl0gPSAxODJdID0gXCJsaXN0R3JvdXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RHcm91cDJcIl0gPSAxODNdID0gXCJsaXN0R3JvdXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0TnVtYmVyZWRcIl0gPSAxODRdID0gXCJsaXN0TnVtYmVyZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxvY2tcIl0gPSAxODVdID0gXCJsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsXCJdID0gMTg2XSA9IFwibWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbENoZWNrXCJdID0gMTg3XSA9IFwibWFpbENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRG93blwiXSA9IDE4OF0gPSBcIm1haWxEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRWRpdFwiXSA9IDE4OV0gPSBcIm1haWxFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRW1wdHlcIl0gPSAxOTBdID0gXCJtYWlsRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFcnJvclwiXSA9IDE5MV0gPSBcIm1haWxFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbE9wZW5cIl0gPSAxOTJdID0gXCJtYWlsT3BlblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFBhdXNlXCJdID0gMTkzXSA9IFwibWFpbFBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUHVibGljXCJdID0gMTk0XSA9IFwibWFpbFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFJlYWRcIl0gPSAxOTVdID0gXCJtYWlsUmVhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFNlbmRcIl0gPSAxOTZdID0gXCJtYWlsU2VuZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFN5bmNcIl0gPSAxOTddID0gXCJtYWlsU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFVucmVhZFwiXSA9IDE5OF0gPSBcIm1haWxVbnJlYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1hcE1hcmtlclwiXSA9IDE5OV0gPSBcIm1hcE1hcmtlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVhbFwiXSA9IDIwMF0gPSBcIm1lYWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lbnVcIl0gPSAyMDFdID0gXCJtZW51XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZW51MlwiXSA9IDIwMl0gPSBcIm1lbnUyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXJnZVwiXSA9IDIwM10gPSBcIm1lcmdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXRhZGF0YVwiXSA9IDIwNF0gPSBcIm1ldGFkYXRhXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaWNyb3Bob25lXCJdID0gMjA1XSA9IFwibWljcm9waG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWluaWF0dXJlc1wiXSA9IDIwNl0gPSBcIm1pbmlhdHVyZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pbnVzXCJdID0gMjA3XSA9IFwibWludXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vYmlsZVwiXSA9IDIwOF0gPSBcIm1vYmlsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW9uZXlcIl0gPSAyMDldID0gXCJtb25leVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW92ZVwiXSA9IDIxMF0gPSBcIm1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11bHRpQ2hvaWNlXCJdID0gMjExXSA9IFwibXVsdGlDaG9pY2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11c2ljXCJdID0gMjEyXSA9IFwibXVzaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5hdmlnYXRlXCJdID0gMjEzXSA9IFwibmF2aWdhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5ld1wiXSA9IDIxNF0gPSBcIm5ld1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmV3c2ZlZWRcIl0gPSAyMTVdID0gXCJuZXdzZmVlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZVwiXSA9IDIxNl0gPSBcIm5vdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVib29rXCJdID0gMjE3XSA9IFwibm90ZWJvb2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVFZGl0XCJdID0gMjE4XSA9IFwibm90ZUVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVGb3J3YXJkXCJdID0gMjE5XSA9IFwibm90ZUZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVSZXBseVwiXSA9IDIyMF0gPSBcIm5vdGVSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90UmVjdXJyaW5nXCJdID0gMjIxXSA9IFwibm90UmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmxpbmVBZGRcIl0gPSAyMjJdID0gXCJvbmxpbmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9ubGluZUpvaW5cIl0gPSAyMjNdID0gXCJvbmxpbmVKb2luXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvb2ZSZXBseVwiXSA9IDIyNF0gPSBcIm9vZlJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvcmdcIl0gPSAyMjVdID0gXCJvcmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhZ2VcIl0gPSAyMjZdID0gXCJwYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYWludFwiXSA9IDIyN10gPSBcInBhaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYW5lbFwiXSA9IDIyOF0gPSBcInBhbmVsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYXJ0bmVyXCJdID0gMjI5XSA9IFwicGFydG5lclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGF1c2VcIl0gPSAyMzBdID0gXCJwYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVuY2lsXCJdID0gMjMxXSA9IFwicGVuY2lsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVcIl0gPSAyMzJdID0gXCJwZW9wbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUFkZFwiXSA9IDIzM10gPSBcInBlb3BsZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlQ2hlY2tcIl0gPSAyMzRdID0gXCJwZW9wbGVDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlRXJyb3JcIl0gPSAyMzVdID0gXCJwZW9wbGVFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUGF1c2VcIl0gPSAyMzZdID0gXCJwZW9wbGVQYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUmVtb3ZlXCJdID0gMjM3XSA9IFwicGVvcGxlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTZWN1cml0eVwiXSA9IDIzOF0gPSBcInBlb3BsZVNlY3VyaXR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTeW5jXCJdID0gMjM5XSA9IFwicGVvcGxlU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uXCJdID0gMjQwXSA9IFwicGVyc29uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25BZGRcIl0gPSAyNDFdID0gXCJwZXJzb25BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvblJlbW92ZVwiXSA9IDI0Ml0gPSBcInBlcnNvblJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVcIl0gPSAyNDNdID0gXCJwaG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVBZGRcIl0gPSAyNDRdID0gXCJwaG9uZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVUcmFuc2ZlclwiXSA9IDI0NV0gPSBcInBob25lVHJhbnNmZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVcIl0gPSAyNDZdID0gXCJwaWN0dXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlQWRkXCJdID0gMjQ3XSA9IFwicGljdHVyZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZUVkaXRcIl0gPSAyNDhdID0gXCJwaWN0dXJlRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZVJlbW92ZVwiXSA9IDI0OV0gPSBcInBpY3R1cmVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbGxcIl0gPSAyNTBdID0gXCJwaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaW5Eb3duXCJdID0gMjUxXSA9IFwicGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGluTGVmdFwiXSA9IDI1Ml0gPSBcInBpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYWNlaG9sZGVyXCJdID0gMjUzXSA9IFwicGxhY2Vob2xkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYW5lXCJdID0gMjU0XSA9IFwicGxhbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYXlcIl0gPSAyNTVdID0gXCJwbGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbHVzXCJdID0gMjU2XSA9IFwicGx1c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGx1czJcIl0gPSAyNTddID0gXCJwbHVzMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9pbnRJdGVtXCJdID0gMjU4XSA9IFwicG9pbnRJdGVtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb3BvdXRcIl0gPSAyNTldID0gXCJwb3BvdXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvc3RcIl0gPSAyNjBdID0gXCJwb3N0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcmludFwiXSA9IDI2MV0gPSBcInByaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcm90ZWN0aW9uQ2VudGVyXCJdID0gMjYyXSA9IFwicHJvdGVjdGlvbkNlbnRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25cIl0gPSAyNjNdID0gXCJxdWVzdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25SZXZlcnNlXCJdID0gMjY0XSA9IFwicXVlc3Rpb25SZXZlcnNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdW90ZVwiXSA9IDI2NV0gPSBcInF1b3RlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyYWRpb0J1dHRvblwiXSA9IDI2Nl0gPSBcInJhZGlvQnV0dG9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWFjdGl2YXRlXCJdID0gMjY3XSA9IFwicmVhY3RpdmF0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdENoZWNrXCJdID0gMjY4XSA9IFwicmVjZWlwdENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0Rm9yd2FyZFwiXSA9IDI2OV0gPSBcInJlY2VpcHRGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0UmVwbHlcIl0gPSAyNzBdID0gXCJyZWNlaXB0UmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlZnJlc2hcIl0gPSAyNzFdID0gXCJyZWZyZXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWxvYWRcIl0gPSAyNzJdID0gXCJyZWxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5XCJdID0gMjczXSA9IFwicmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsXCJdID0gMjc0XSA9IFwicmVwbHlBbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsQWx0XCJdID0gMjc1XSA9IFwicmVwbHlBbGxBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWx0XCJdID0gMjc2XSA9IFwicmVwbHlBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJpYmJvblwiXSA9IDI3N10gPSBcInJpYmJvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicm9vbVwiXSA9IDI3OF0gPSBcInJvb21cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNhdmVcIl0gPSAyNzldID0gXCJzYXZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzY2hlZHVsaW5nXCJdID0gMjgwXSA9IFwic2NoZWR1bGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VhcmNoXCJdID0gMjgxXSA9IFwic2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWN0aW9uXCJdID0gMjgyXSA9IFwic2VjdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VjdGlvbnNcIl0gPSAyODNdID0gXCJzZWN0aW9uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2V0dGluZ3NcIl0gPSAyODRdID0gXCJzZXR0aW5nc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hhcmVcIl0gPSAyODVdID0gXCJzaGFyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hpZWxkXCJdID0gMjg2XSA9IFwic2hpZWxkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaXRlc1wiXSA9IDI4N10gPSBcInNpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzbWlsZXlcIl0gPSAyODhdID0gXCJzbWlsZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvY2NlclwiXSA9IDI4OV0gPSBcInNvY2NlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29jaWFsTGlzdGVuaW5nXCJdID0gMjkwXSA9IFwic29jaWFsTGlzdGVuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb3J0XCJdID0gMjkxXSA9IFwic29ydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29ydExpbmVzXCJdID0gMjkyXSA9IFwic29ydExpbmVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzcGxpdFwiXSA9IDI5M10gPSBcInNwbGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdGFyXCJdID0gMjk0XSA9IFwic3RhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RhckVtcHR5XCJdID0gMjk1XSA9IFwic3RhckVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdG9wd2F0Y2hcIl0gPSAyOTZdID0gXCJzdG9wd2F0Y2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0b3J5XCJdID0gMjk3XSA9IFwic3RvcnlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0eWxlUmVtb3ZlXCJdID0gMjk4XSA9IFwic3R5bGVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1YnNjcmliZVwiXSA9IDI5OV0gPSBcInN1YnNjcmliZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuXCJdID0gMzAwXSA9IFwic3VuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5BZGRcIl0gPSAzMDFdID0gXCJzdW5BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1blF1ZXN0aW9uXCJdID0gMzAyXSA9IFwic3VuUXVlc3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1cHBvcnRcIl0gPSAzMDNdID0gXCJzdXBwb3J0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZVwiXSA9IDMwNF0gPSBcInRhYmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZXRcIl0gPSAzMDVdID0gXCJ0YWJsZXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhZ1wiXSA9IDMwNl0gPSBcInRhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFza1JlY3VycmluZ1wiXSA9IDMwN10gPSBcInRhc2tSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhc2tzXCJdID0gMzA4XSA9IFwidGFza3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRlYW13b3JrXCJdID0gMzA5XSA9IFwidGVhbXdvcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRleHRcIl0gPSAzMTBdID0gXCJ0ZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZXh0Qm94XCJdID0gMzExXSA9IFwidGV4dEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGlsZVwiXSA9IDMxMl0gPSBcInRpbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRpbWVsaW5lXCJdID0gMzEzXSA9IFwidGltZWxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZGF5XCJdID0gMzE0XSA9IFwidG9kYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZ2dsZVwiXSA9IDMxNV0gPSBcInRvZ2dsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9nZ2xlTWlkZGxlXCJdID0gMzE2XSA9IFwidG9nZ2xlTWlkZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b3VjaFwiXSA9IDMxN10gPSBcInRvdWNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmFzaFwiXSA9IDMxOF0gPSBcInRyYXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZURvd25cIl0gPSAzMTldID0gXCJ0cmlhbmdsZURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlEb3duXCJdID0gMzIwXSA9IFwidHJpYW5nbGVFbXB0eURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlMZWZ0XCJdID0gMzIxXSA9IFwidHJpYW5nbGVFbXB0eUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlSaWdodFwiXSA9IDMyMl0gPSBcInRyaWFuZ2xlRW1wdHlSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eVVwXCJdID0gMzIzXSA9IFwidHJpYW5nbGVFbXB0eVVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUxlZnRcIl0gPSAzMjRdID0gXCJ0cmlhbmdsZUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlUmlnaHRcIl0gPSAzMjVdID0gXCJ0cmlhbmdsZVJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZVVwXCJdID0gMzI2XSA9IFwidHJpYW5nbGVVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJvcGh5XCJdID0gMzI3XSA9IFwidHJvcGh5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1bmRlcmxpbmVcIl0gPSAzMjhdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVuc3Vic2NyaWJlXCJdID0gMzI5XSA9IFwidW5zdWJzY3JpYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVwbG9hZFwiXSA9IDMzMF0gPSBcInVwbG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widmlkZW9cIl0gPSAzMzFdID0gXCJ2aWRlb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsXCJdID0gMzMyXSA9IFwidm9pY2VtYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxGb3J3YXJkXCJdID0gMzMzXSA9IFwidm9pY2VtYWlsRm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsUmVwbHlcIl0gPSAzMzRdID0gXCJ2b2ljZW1haWxSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid2FmZmxlXCJdID0gMzM1XSA9IFwid2FmZmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3b3JrXCJdID0gMzM2XSA9IFwid29ya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid3JlbmNoXCJdID0gMzM3XSA9IFwid3JlbmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ4XCJdID0gMzM4XSA9IFwieFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wieENpcmNsZVwiXSA9IDMzOV0gPSBcInhDaXJjbGVcIjtcbn0pKGV4cG9ydHMuSWNvbkVudW0gfHwgKGV4cG9ydHMuSWNvbkVudW0gPSB7fSkpO1xudmFyIEljb25FbnVtID0gZXhwb3J0cy5JY29uRW51bTtcbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBMYWJlbERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGFiZWxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxhYmVsIGNsYXNzPVwibXMtTGFiZWxcIj48bmctdHJhbnNjbHVkZS8+PC9sYWJlbD4nO1xuICAgIH1cbiAgICBMYWJlbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExhYmVsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBMYWJlbERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cmlidXRlcy5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdsYWJlbCcpLmVxKDApLmFkZENsYXNzKCdpcy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cmlidXRlcy5yZXF1aXJlZCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5maW5kKCdsYWJlbCcpLmVxKDApLmFkZENsYXNzKCdpcy1yZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGFiZWxEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MYWJlbERpcmVjdGl2ZSA9IExhYmVsRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGFiZWwnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMYWJlbCcsIExhYmVsRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGFiZWwvbGFiZWxEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIExpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGEgbmctaHJlZj1cInt7IG5nSHJlZiB9fVwiIGNsYXNzPVwibXMtTGlua1wiIG5nLXRyYW5zY2x1ZGU+PC9hPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0hyZWY6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgIH1cbiAgICBMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlua0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaW5rRGlyZWN0aXZlID0gTGlua0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpbmsnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpbmsnLCBMaW5rRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGluay9saW5rRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKCcuL2xpc3RJdGVtU2VsZWN0TW9kZUVudW0nKTtcbnZhciBsaXN0SXRlbVR5cGVFbnVtXzEgPSByZXF1aXJlKCcuL2xpc3RJdGVtVHlwZUVudW0nKTtcbnZhciBsaXN0TGF5b3V0RW51bV8xID0gcmVxdWlyZSgnLi9saXN0TGF5b3V0RW51bScpO1xudmFyIExpc3RDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLml0ZW1zID0gW107XG4gICAgICAgIGlmICghdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbVNlbGVjdE1vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtU2VsZWN0TW9kZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJzZWxlY3RlZEl0ZW1zXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBMaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuICAgIHJldHVybiBMaXN0Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgTGlzdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtTGlzdFwiIG5nLXRyYW5zY2x1ZGU+PC91bD4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnbGlzdCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiAnPT91aWZTZWxlY3RlZEl0ZW1zJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTGlzdERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBpZiAoYXR0cnMudWlmTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmTGF5b3V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bVthdHRycy51aWZMYXlvdXRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZkxheW91dCArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtbGF5b3V0XFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIGxpc3R8Z3JpZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IGF0dHJzLnVpZkxheW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IGxpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW1bbGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bS5saXN0XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSBsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtW2xpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW0uZ3JpZF0pIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1MaXN0LS1ncmlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmSXRlbVNlbGVjdE1vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVthdHRycy51aWZJdGVtU2VsZWN0TW9kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmSXRlbVNlbGVjdE1vZGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLWl0ZW0tc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGF0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtU2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3REaXJlY3RpdmUgPSBMaXN0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgTGlzdEl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIExpc3RJdGVtQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgTGlzdEl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1MaXN0SXRlbVwiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkxpc3QnO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXRlbTogJz11aWZJdGVtJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0SXRlbUNvbnRyb2xsZXI7XG4gICAgfVxuICAgIExpc3RJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExpc3RJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBsaXN0KSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZTZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkU3RyaW5nID0gYXR0cnMudWlmU2VsZWN0ZWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyAhPT0gJ3RydWUnICYmIHNlbGVjdGVkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZTZWxlY3RlZCArICdcXCcgaXMgbm90IGEgdmFsaWQgYm9vbGVhbiB2YWx1ZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSB0cnVlfGZhbHNlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUuaXRlbSAmJiBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlR5cGUgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZUeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW1bYXR0cnMudWlmVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVHlwZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBpdGVtfGl0ZW1XaXRoSW1hZ2V8aXRlbVdpdGhJY29uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudHlwZSA9IGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtW2F0dHJzLnVpZlR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoc2NvcGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bS5pdGVtV2l0aEljb246XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3RJdGVtLS1kb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWljb24nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdMaXN0IGl0ZW0gdHlwZSBpdGVtV2l0aEljb24gcmVxdWlyZXMgdGhlIHVpZi1saXN0LWl0ZW0taWNvbiBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSW1hZ2U6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3RJdGVtLS1pbWFnZScpO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWltYWdlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnTGlzdCBpdGVtIHR5cGUgaXRlbVdpdGhJbWFnZSByZXF1aXJlcyB0aGUgdWlmLWxpc3QtaXRlbS1pbWFnZSBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZVbnJlYWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgYXR0cnMudWlmVW5yZWFkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgdW5yZWFkU3RyaW5nID0gYXR0cnMudWlmVW5yZWFkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodW5yZWFkU3RyaW5nICE9PSAndHJ1ZScgJiYgdW5yZWFkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZVbnJlYWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1bnJlYWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS51bnJlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmVW5zZWVuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlVuc2VlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHVuc2VlblN0cmluZyA9IGF0dHJzLnVpZlVuc2Vlbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHVuc2VlblN0cmluZyAhPT0gJ3RydWUnICYmIHVuc2VlblN0cmluZyAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVW5zZWVuICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodW5zZWVuU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5zZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5pdGVtQ2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5pdGVtU2VsZWN0TW9kZSA9PT0gbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW1bbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0uc2luZ2xlXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0Lml0ZW1zW2ldICE9PSBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBsaXN0SXRlbVNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5wdXNoKGxpc3RJdGVtU2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3Quc2VsZWN0ZWRJdGVtc1tpXSA9PT0gbGlzdEl0ZW1TY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VucmVhZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndW5zZWVuJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgbGlzdEl0ZW1TY29wZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxpc3QuaXRlbVNlbGVjdE1vZGUgIT09IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaXRlbUNsaWNrKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RhYmxlJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtRGlyZWN0aXZlID0gTGlzdEl0ZW1EaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tdGVydGlhcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlID0gTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLW1ldGFUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWltYWdlXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZSA9IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWl0ZW1JY29uXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1JY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tc2VsZWN0aW9uVGFyZ2V0XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUgPSBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tYWN0aW9uc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSA9IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWFjdGlvblwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uRGlyZWN0aXZlID0gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0JywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdCcsIExpc3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtJywgTGlzdEl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtUHJpbWFyeVRleHQnLCBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbVNlY29uZGFyeVRleHQnLCBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtVGVydGlhcnlUZXh0JywgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtTWV0YVRleHQnLCBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUltYWdlJywgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1JY29uJywgTGlzdEl0ZW1JY29uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbVNlbGVjdGlvblRhcmdldCcsIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUFjdGlvbnMnLCBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtQWN0aW9uJywgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3REaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChMaXN0SXRlbVNlbGVjdE1vZGVFbnVtKSB7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wibm9uZVwiXSA9IDBdID0gXCJub25lXCI7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMV0gPSBcInNpbmdsZVwiO1xuICAgIExpc3RJdGVtU2VsZWN0TW9kZUVudW1bTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMl0gPSBcIm11bHRpcGxlXCI7XG59KShleHBvcnRzLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bSA9IHt9KSk7XG52YXIgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtU2VsZWN0TW9kZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChMaXN0SXRlbVR5cGVFbnVtKSB7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVwiXSA9IDBdID0gXCJpdGVtXCI7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVdpdGhJbWFnZVwiXSA9IDFdID0gXCJpdGVtV2l0aEltYWdlXCI7XG4gICAgTGlzdEl0ZW1UeXBlRW51bVtMaXN0SXRlbVR5cGVFbnVtW1wiaXRlbVdpdGhJY29uXCJdID0gMl0gPSBcIml0ZW1XaXRoSWNvblwiO1xufSkoZXhwb3J0cy5MaXN0SXRlbVR5cGVFbnVtIHx8IChleHBvcnRzLkxpc3RJdGVtVHlwZUVudW0gPSB7fSkpO1xudmFyIExpc3RJdGVtVHlwZUVudW0gPSBleHBvcnRzLkxpc3RJdGVtVHlwZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0SXRlbVR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoTGlzdExheW91dEVudW0pIHtcbiAgICBMaXN0TGF5b3V0RW51bVtMaXN0TGF5b3V0RW51bVtcImxpc3RcIl0gPSAwXSA9IFwibGlzdFwiO1xuICAgIExpc3RMYXlvdXRFbnVtW0xpc3RMYXlvdXRFbnVtW1wiZ3JpZFwiXSA9IDFdID0gXCJncmlkXCI7XG59KShleHBvcnRzLkxpc3RMYXlvdXRFbnVtIHx8IChleHBvcnRzLkxpc3RMYXlvdXRFbnVtID0ge30pKTtcbnZhciBMaXN0TGF5b3V0RW51bSA9IGV4cG9ydHMuTGlzdExheW91dEVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY29udGV4dHVhbE1lbnVfMSA9IHJlcXVpcmUoJy4vLi4vY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUnKTtcbnZhciBOYXZCYXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUub3Blbk1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtZW51VmlzaWJsZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZVttZW51VmlzaWJsZSA/ICdyZW1vdmVDbGFzcycgOiAnYWRkQ2xhc3MnXSh0aGlzLiRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VNb2JpbGVNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICB0aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKHRoaXMuJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlQWxsQ29udGV4dE1lbnVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF2QmFySXRlbXMgPSB0aGlzLiRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1OYXZCYXItaXRlbScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkJhckl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbmdFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KG5hdkJhckl0ZW1zW2ldKTtcbiAgICAgICAgICAgIHZhciBuYXZCYXJJdGVtQ3RybCA9IG5nRWxlbWVudC5jb250cm9sbGVyKE5hdkJhckl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAobmF2QmFySXRlbUN0cmwpIHtcbiAgICAgICAgICAgICAgICBuYXZCYXJJdGVtQ3RybC5jbG9zZUNvbnRleHR1YWxNZW51KCk7XG4gICAgICAgICAgICAgICAgbmF2QmFySXRlbUN0cmwuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLmhpZGVTZWFyY2hUZXh0Qm94ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF2QmFySXRlbXMgPSB0aGlzLiRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1OYXZCYXItaXRlbS0tc2VhcmNoJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2QmFySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZ0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQobmF2QmFySXRlbXNbaV0pO1xuICAgICAgICAgICAgdmFyIG5hdlNlYXJjaEN0cmwgPSBuZ0VsZW1lbnQuY29udHJvbGxlcihOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAobmF2U2VhcmNoQ3RybCkge1xuICAgICAgICAgICAgICAgIG5hdlNlYXJjaEN0cmwuY2xvc2VTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnLCAnJGxvZyddO1xuICAgIHJldHVybiBOYXZCYXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyQ29udHJvbGxlciA9IE5hdkJhckNvbnRyb2xsZXI7XG52YXIgTmF2QmFyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICduYXYnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhci1vcGVuTWVudSBqcy1vcGVuTWVudVxcXCIgbmctY2xpY2s9XFxcIm5hdi5vcGVuTW9iaWxlTWVudSgpXFxcIj5cXG4gICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIm1lbnVcXFwiPjwvdWlmLWljb24+XFxuICAgIDwvZGl2PlxcbiAgICA8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XFxcInt7b3ZlcmxheX19XFxcIiBuZy1jbGljaz1cXFwibmF2LmNsb3NlTW9iaWxlTWVudSgpXFxcIj48L3VpZi1vdmVybGF5PlxcbiAgICA8dWwgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtc1xcXCI+XFxuICAgICAgPGRpdiBjbGFzcz0ndWlmLW5hdi1pdGVtcyc+PC9kaXY+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG92ZXJsYXk6ICdAP3VpZk92ZXJsYXknXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5hdkJhckNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW1zJykpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoY2xvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE5hdkJhckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTmF2QmFyRGlyZWN0aXZlKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZycsICckYW5pbWF0ZScsICckZG9jdW1lbnQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhcic7XG4gICAgTmF2QmFyRGlyZWN0aXZlLm92ZXJsYXlWYWx1ZXMgPSBbJ2xpZ2h0JywgJ2RhcmsnXTtcbiAgICByZXR1cm4gTmF2QmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFyRGlyZWN0aXZlID0gTmF2QmFyRGlyZWN0aXZlO1xudmFyIE5hdkJhckl0ZW1UeXBlcztcbihmdW5jdGlvbiAoTmF2QmFySXRlbVR5cGVzKSB7XG4gICAgTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlc1tcImxpbmtcIl0gPSAwXSA9IFwibGlua1wiO1xuICAgIE5hdkJhckl0ZW1UeXBlc1tOYXZCYXJJdGVtVHlwZXNbXCJtZW51XCJdID0gMV0gPSBcIm1lbnVcIjtcbn0pKE5hdkJhckl0ZW1UeXBlcyB8fCAoTmF2QmFySXRlbVR5cGVzID0ge30pKTtcbnZhciBOYXZCYXJJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFySXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIH1cbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VDb250ZXh0dWFsTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuZGVzZWxlY3RJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgIH07XG4gICAgTmF2QmFySXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50J107XG4gICAgcmV0dXJuIE5hdkJhckl0ZW1Db250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFySXRlbUNvbnRyb2xsZXIgPSBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbnZhciBOYXZCYXJJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJJdGVtRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFySXRlbUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXlwiICsgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpc0Rpc2FibGVkOiAnQD9kaXNhYmxlZCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ0A/dWlmUG9zaXRpb24nLFxuICAgICAgICAgICAgdGV4dDogJz0/dWlmVGV4dCcsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5hdkJhckl0ZW1UeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubmF2YmFyIC0gdW5zdXBwb3J0ZWQgbmF2IGJhciBpdGVtIHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIG5hdiBiYXIgaXRlbS4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgTmF2QmFySXRlbVR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXY+PC9kaXY+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW05hdkJhckl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5hdkJhckNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmF2QmFyTGlua0VlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1OYXZCYXItbGluaycpKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJMaW5rRWVsZW1lbnQucmVtb3ZlQXR0cignaHJlZicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKCRzY29wZS50eXBlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS50eXBlID0gTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5oYXNDaGlsZE1lbnUgJiYgJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAhJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9wZW5NZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmNsb3NlTW9iaWxlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgJHNjb3BlLnNlbGVjdEl0ZW0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICB2YXIgY29udGV4dE1lbnVDdHJsID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db250ZXh0dWFsTWVudScpKVxuICAgICAgICAgICAgICAgIC5jb250cm9sbGVyKGNvbnRleHR1YWxNZW51XzEuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dE1lbnVDdHJsKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhhc0NoaWxkTWVudSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRleHRNZW51Q3RybCA9IGNvbnRleHRNZW51Q3RybDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9uUm9vdE1lbnVDbG9zZWQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VNb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbVxcXCJcXG4gICAgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkLCAnbXMtTmF2QmFyLWl0ZW0tLXJpZ2h0JzogcG9zaXRpb24gPT09ICdyaWdodCd9XFxcIj5cXG4gICAgICA8YSBjbGFzcz1cXFwibXMtTmF2QmFyLWxpbmtcXFwiIGhyZWY9XFxcIlxcXCI+PHNwYW4gY2xhc3M9J3VpZi1uYXYtaXRlbS1jb250ZW50Jz48L3NwYW4+PC9hPlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLm1lbnVdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0taGFzTWVudVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCI+XFxuICAgICAgPGEgY2xhc3M9XFxcIm1zLU5hdkJhci1saW5rXFxcIiBocmVmPVxcXCJcXFwiPjxzcGFuIGNsYXNzPSd1aWYtbmF2LWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICA8aSBjbGFzcz1cXFwibXMtTmF2QmFyLWNoZXZyb25Eb3duIG1zLUljb24gbXMtSWNvbi0tY2hldnJvbkRvd25cXFwiPjwvaT5cXG4gICAgICA8ZGl2IGNsYXNzPSd1aWYtc3VibWVudSc+PC9kaXY+XFxuICAgIDwvbGk+XCI7XG4gICAgfVxuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgTmF2QmFySXRlbURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCAmJiAhJHNjb3BlLnRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXIgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3lvdSBuZWVkIHRvIHByb3ZpZGUgYSB0ZXh0IGZvciBhIG5hdiBiYXIgbWVudSBpdGVtLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbmF2LWJhci1pdGVtPiB5b3UgbmVlZCB0byBzcGVjaWZ5IGVpdGhlciBcXCd1aWYtdGV4dFxcJyBhcyBhdHRyaWJ1dGUgb3IgPHVpZi1uYXYtaXRlbS1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0TGluayhjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRNZW51KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRMaW5rID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW0tY29udGVudCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoYW5ndWxhci5lbGVtZW50KCc8c3Bhbj4nICsgJHNjb3BlLnRleHQgKyAnPC9zcGFuPicpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0TWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXN1Ym1lbnUnKSkucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhckl0ZW0nO1xuICAgIHJldHVybiBOYXZCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTmF2QmFySXRlbURpcmVjdGl2ZSA9IE5hdkJhckl0ZW1EaXJlY3RpdmU7XG52YXIgTmF2QmFyU2VhcmNoQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyU2VhcmNoQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIE5hdkJhclNlYXJjaENvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlU2VhcmNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMuJHNjb3BlLnNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kYW5pbWF0ZS5yZW1vdmVDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKF90aGlzLiRlbGVtZW50LCAnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2hDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckZG9jdW1lbnQnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICByZXR1cm4gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLk5hdkJhclNlYXJjaENvbnRyb2xsZXIgPSBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xudmFyIE5hdkJhclNlYXJjaCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyU2VhcmNoKCRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyhcIl5cIiArIE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKSwgKFwiXCIgKyBOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSldO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25TZWFyY2hDYWxsYmFjazogJyY/dWlmT25TZWFyY2gnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAP3BsYWNlaG9sZGVyJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0tc2VhcmNoIG1zLXUtaGlkZGVuU21cXFwiIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1UZXh0RmllbGRcXFwiIG5nLWNsaWNrPVxcXCJza2lwT25DbGljaygkZXZlbnQpXFxcIj5cXG4gICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj17e3BsYWNlaG9sZGVyfX0gY2xhc3M9XFxcIm1zLVRleHRGaWVsZC1maWVsZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmcta2V5cHJlc3M9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiIG5nLW1vZGVsPVxcXCJzZWFyY2hUZXh0XFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHMsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGN0cmxzWzFdLmNsb3NlU2VhcmNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5za2lwT25DbGljayA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUNzc0NsYXNzZXMoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub25TZWFyY2ggPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY3RybHNbMF0uY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiAkZXZlbnQud2hpY2ggPT09IDEzICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwbHlDc3NDbGFzc2VzKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBOYXZCYXJTZWFyY2guZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXZCYXJTZWFyY2goJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGRvY3VtZW50JywgJyRhbmltYXRlJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2gucHJvdG90eXBlLmFwcGx5Q3NzQ2xhc3NlcyA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgICBpZiAoISRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGFuaW1hdGUuYWRkQ2xhc3MoJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVRleHRGaWVsZC1maWVsZCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgJGVsZW1lbnQucGFyZW50KCkuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZS5hZGRDbGFzcygkZWxlbWVudCwgJ2lzLXNlbGVjdGVkJyk7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSA9ICd1aWZOYXZCYXJTZWFyY2gnO1xuICAgIHJldHVybiBOYXZCYXJTZWFyY2g7XG59KCkpO1xuZXhwb3J0cy5OYXZCYXJTZWFyY2ggPSBOYXZCYXJTZWFyY2g7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBOYXZCYXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBOYXZCYXJJdGVtRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lLCBOYXZCYXJTZWFyY2guZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBvdmVybGF5TW9kZUVudW1fdHNfMSA9IHJlcXVpcmUoJy4vb3ZlcmxheU1vZGVFbnVtLnRzJyk7XG52YXIgT3ZlcmxheUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZXJsYXlDb250cm9sbGVyKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICB9XG4gICAgT3ZlcmxheUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBPdmVybGF5Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgT3ZlcmxheURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheURpcmVjdGl2ZShsb2cpIHtcbiAgICAgICAgdGhpcy5sb2cgPSBsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU92ZXJsYXlcIiBuZy1jbGFzcz1cIntcXCdtcy1PdmVybGF5LS1kYXJrXFwnOiB1aWZNb2RlID09IFxcJ2RhcmtcXCd9XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmTW9kZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIE92ZXJsYXlEaXJlY3RpdmUubG9nID0gbG9nO1xuICAgIH1cbiAgICBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAobG9nKSB7IHJldHVybiBuZXcgT3ZlcmxheURpcmVjdGl2ZShsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3ZlcmxheURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZk1vZGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAob3ZlcmxheU1vZGVFbnVtX3RzXzEuT3ZlcmxheU1vZGVbbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBPdmVybGF5RGlyZWN0aXZlLmxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3ZlcmxheSAtIFVuc3VwcG9ydGVkIG92ZXJsYXkgbW9kZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgb3ZlcmxheSBtb2RlIChcXCcnICsgc2NvcGUudWlmTW9kZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheU1vZGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgO1xuICAgIHJldHVybiBPdmVybGF5RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3ZlcmxheURpcmVjdGl2ZSA9IE92ZXJsYXlEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vdmVybGF5JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPdmVybGF5JywgT3ZlcmxheURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKE92ZXJsYXlNb2RlKSB7XG4gICAgT3ZlcmxheU1vZGVbT3ZlcmxheU1vZGVbXCJsaWdodFwiXSA9IDBdID0gXCJsaWdodFwiO1xuICAgIE92ZXJsYXlNb2RlW092ZXJsYXlNb2RlW1wiZGFya1wiXSA9IDFdID0gXCJkYXJrXCI7XG59KShleHBvcnRzLk92ZXJsYXlNb2RlIHx8IChleHBvcnRzLk92ZXJsYXlNb2RlID0ge30pKTtcbnZhciBPdmVybGF5TW9kZSA9IGV4cG9ydHMuT3ZlcmxheU1vZGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHBhbmVsRGlyZWN0aXZlRW51bV8xID0gcmVxdWlyZSgnLi9wYW5lbERpcmVjdGl2ZUVudW0nKTtcbnZhciBQYW5lbERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWxEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAgY2xhc3M9XFxcIm1zLU92ZXJsYXlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcImNsb3NlUGFuZWwoKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGFzcz1cXFwidWlmU2hvd092ZXJsYXkgPT09IHRydWUgPyAnbXMtT3ZlcmxheS0tZGFyaycgOiAnJztcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsLW1haW5cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGFuZWwtY29tbWFuZHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG5nLWlmPVxcXCJ1aWZTaG93Q2xvc2VcXFwiIGNsYXNzPSdtcy1QYW5lbC1jbG9zZUJ1dHRvbicgbmctY2xpY2s9XFxcImNsb3NlUGFuZWwoKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPSd4Jz48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGFuZWwtY29udGVudElubmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBhbmVsQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZklzT3BlbjogJz0nLFxuICAgICAgICAgICAgdWlmU2hvd0Nsb3NlOiAnPScsXG4gICAgICAgICAgICB1aWZTaG93T3ZlcmxheTogJz0nLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFBhbmVsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBhbmVsRGlyZWN0aXZlKCRsb2csICRhbmltYXRlLCAkdGltZW91dCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJywgJyRhbmltYXRlJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQYW5lbERpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFBhbmVsRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pLmhhc0NsYXNzKCdtcy1Db21tYW5kQmFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignZGl2Lm1zLVBhbmVsLWNvbW1hbmRzJykpLnByZXBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY29wZS51aWZUeXBlID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignZGl2Lm1zLVBhbmVsLW1haW4nKSkuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tcy1QYW5lbC1jb250ZW50SW5uZXInKSkuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5jbG9zZVBhbmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUudWlmSXNPcGVuID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gUGFuZWxEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QYW5lbERpcmVjdGl2ZSA9IFBhbmVsRGlyZWN0aXZlO1xudmFyIFBhbmVsQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWxDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nLCAkdGltZW91dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgaWYgKCEkc2NvcGUudWlmVHlwZSkge1xuICAgICAgICAgICAgJHNjb3BlLnVpZlR5cGUgPSAnbWVkaXVtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFuZWxEaXJlY3RpdmVFbnVtXzEuUGFuZWxUeXBlc1skc2NvcGUudWlmVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wYW5lbCAtIHVuc3VwcG9ydGVkIHBhbmVsIHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyAkc2NvcGUudWlmVHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIHBhbmVscy4nICtcbiAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBQYW5lbFR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwudHMnKTtcbiAgICAgICAgICAgICRzY29wZS51aWZUeXBlID0gJ21lZGl1bSc7XG4gICAgICAgIH1cbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ21zLVBhbmVsLS0nICsgJHNjb3BlLnVpZlR5cGUpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCd1aWZJc09wZW4nLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICdib29sZWFuJyAmJiBuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGFuZWwgLSBpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtb3BlblxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgbmV3VmFsdWUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLW9wZW5cXCcgYXR0cmlidXRlIGZvciAnICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtcGFuZWwvPi4gVGhlIHZhbGlkIHR5cGUgaXMgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICRhbmltYXRlLmFkZENsYXNzKF90aGlzLiRlbGVtZW50LCAnbXMtUGFuZWwtYW5pbWF0ZUluJyk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXInKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXInKSkuc2NvcGUoKS4kYnJvYWRjYXN0KCd1aWYtY29tbWFuZC1iYXItcmVzaXplJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuYWRkQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdtcy1QYW5lbC1hbmltYXRlT3V0Jyk7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnbXMtUGFuZWwtYW5pbWF0ZUluIG1zLVBhbmVsLWFuaW1hdGVPdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgUGFuZWxDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckYW5pbWF0ZScsICckZWxlbWVudCcsICckbG9nJywgJyR0aW1lb3V0J107XG4gICAgcmV0dXJuIFBhbmVsQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBhbmVsQ29udHJvbGxlciA9IFBhbmVsQ29udHJvbGxlcjtcbnZhciBQYW5lbEhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWxIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHAgY2xhc3M9XCJtcy1QYW5lbC1oZWFkZXJUZXh0XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmSGVhZGVyVGV4dDogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFBhbmVsSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGFuZWxIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbEhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsSGVhZGVyRGlyZWN0aXZlID0gUGFuZWxIZWFkZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wYW5lbCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmUGFuZWwnLCBQYW5lbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGFuZWxIZWFkZXInLCBQYW5lbEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUGFuZWxUeXBlcykge1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcInNtYWxsXCJdID0gMF0gPSBcInNtYWxsXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wibWVkaXVtXCJdID0gMV0gPSBcIm1lZGl1bVwiO1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcImxhcmdlXCJdID0gMl0gPSBcImxhcmdlXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wiZXh0cmFsYXJnZVwiXSA9IDNdID0gXCJleHRyYWxhcmdlXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wibGVmdFwiXSA9IDRdID0gXCJsZWZ0XCI7XG59KShleHBvcnRzLlBhbmVsVHlwZXMgfHwgKGV4cG9ydHMuUGFuZWxUeXBlcyA9IHt9KSk7XG52YXIgUGFuZWxUeXBlcyA9IGV4cG9ydHMuUGFuZWxUeXBlcztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3NpemVFbnVtJyk7XG52YXIgcGxhY2Vob2xkZXJFbnVtXzEgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyRW51bScpO1xudmFyIHBlcnNvbmFTdHlsZUVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYVN0eWxlRW51bScpO1xudmFyIHBlcnNvbmFQcmVzZW5jZUVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYVByZXNlbmNlRW51bScpO1xudmFyIFBlcnNvbmFDYXJkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZQZXJzb25hQ2FyZCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAndWlmUHJlc2VuY2UnOiAnQCcsXG4gICAgICAgICAgICAndWlmU2l6ZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZJbWFnZVVybCc6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZFwiIG5nLWNsYXNzPVwiZ2V0UGVyc29uYUNhcmRDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtcGVyc29uYVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hXCIgbmctY2xhc3M9XCJnZXRQZXJzb25hQ2xhc3NlcygpXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VBcmVhXCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPVwicGVyc29uXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8aW1nIGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZVwiIG5nLXNyYz1cInt7dWlmSW1hZ2VVcmx9fVwiIG5nLWlmPVwidWlmSW1hZ2VVcmxcIj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmVzZW5jZVwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWRldGFpbHNcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8dWwgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1hY3Rpb25zXCI+JyArXG4gICAgICAgICAgICAnPGxpIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBwZXJzb25hQ2FyZEFjdGlvbnNcIiBuZy1jbGFzcz1cImdldEFjdGlvbkNsYXNzZXMoYWN0aW9uKVwiIG5nLWNsaWNrPVwic2VsZWN0QWN0aW9uKCRldmVudCwgYWN0aW9uKVwiPicgK1xuICAgICAgICAgICAgJzx1aWYtaWNvbiB1aWYtdHlwZT17e2FjdGlvbi5pY29ufX0gbmctaWY9XCJhY3Rpb24ucGxhY2Vob2xkZXIgIT0gXFwnb3ZlcmZsb3dcXCdcIj48L3VpZi1pY29uPicgK1xuICAgICAgICAgICAgJzwvbGk+JyArXG4gICAgICAgICAgICAnPC91bD4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsQm94XCI+JyArXG4gICAgICAgICAgICAnPHVsIG5nLWNsYXNzPVwiZGV0YWlsQ2xhc3NcIj48L3VsPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICB2YXIgcGVyc29uYUNhcmRDb250cm9sbGVyID0gY29udHJvbGxlcnNbMF07XG4gICAgICAgICAgICB2YXIgaWNvbiA9IGVsZW1lbnQuZmluZCgndWlmLWljb24nKTtcbiAgICAgICAgICAgIGljb24uYWRkQ2xhc3MoJ21zLVBlcnNvbmEtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkgJiYgbmcuaXNVbmRlZmluZWQoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTaXplICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTaXplLiBJdCBzaG91bGQgYmUgeHNtYWxsLCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgeGxhcmdlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU3R5bGUpICYmIG5nLmlzVW5kZWZpbmVkKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTdHlsZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU3R5bGUuIEl0IHNob3VsZCBiZSByb3VuZCBvciBzcXVhcmUuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5nLmlzRGVmaW5lZChhdHRycy51aWZQcmVzZW5jZSkgJiYgbmcuaXNVbmRlZmluZWQocGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0pKSB7XG4gICAgICAgICAgICAgICAgcGVyc29uYUNhcmRDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmFjYXJkIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmUHJlc2VuY2UgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlByZXNlbmNlLiBJdCBzaG91bGQgYmUgYXZhaWxhYmxlLCBhd2F5LCBibG9ja2VkLCBidXN5LCBkbmQgb3Igb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5nZXRBY3Rpb25DbGFzc2VzID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25DbGFzc2VzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW2FjdGlvbi5wbGFjZWhvbGRlcl07XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS50b3ByaWdodDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnbXMtUGVyc29uYUNhcmQtYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ21zLVBlcnNvbmFDYXJkLW9yZ0NoYXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ucmVndWxhcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnbXMtUGVyc29uYUNhcmQtYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25DbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5nZXRQZXJzb25hQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGVyc29uYUNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdID09PSBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0teHMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUuc21hbGw6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1zbScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5sYXJnZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWxnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnhsYXJnZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXhsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hdmFpbGFibGU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXdheTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWF3YXknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYmxvY2tlZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWJsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYnVzeTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWJ1c3knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uZG5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tZG5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLW9mZmxpbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYUNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDYXJkQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdID09PSBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmUgPyAnbXMtUGVyc29uYUNhcmQtLXNxdWFyZScgOiAnJztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXRhaWxzV3JhcHBlciA9IG5nLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hLWRldGFpbHMnKSk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbkRldGFpbHNCb3hMaXN0ID0gbmcuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmFDYXJkLWFjdGlvbkRldGFpbEJveCcpKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgndWwnKS5lcSgwKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uc0xpc3QgPSBuZy5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYUNhcmQtYWN0aW9ucycpKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdOYW1lID0gY2xvbmVbaV0udGFnTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELVBSSU1BUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELVNFQ09OREFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtVEVSVElBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELU9QVElPTkFMLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNXcmFwcGVyLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELUFDVElPTic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRBY3Rpb24gPSBuZy5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSB3cmFwcGVkQWN0aW9uLmF0dHIoJ3VpZi1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJdID09PSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ub3ZlcmZsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc0xpc3QuYXBwZW5kKHdyYXBwZWRBY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uRGV0YWlsc0JveExpc3QuYXBwZW5kKF90aGlzLnByb2Nlc3NBY3Rpb24od3JhcHBlZEFjdGlvbiwgc2NvcGUsIHBlcnNvbmFDYXJkQ29udHJvbGxlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUNhcmREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVyc29uYUNhcmREaXJlY3RpdmUucHJvdG90eXBlLnByb2Nlc3NBY3Rpb24gPSBmdW5jdGlvbiAoY2xvbmUsIHNjb3BlLCBwZXJzb25hQ2FyZENvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIGNsYXNzVG9BZGQgPSAnJztcbiAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gY2xvbmUuYXR0cigndWlmLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgIHZhciBpY29uID0gY2xvbmUuYXR0cigndWlmLWljb24nKTtcbiAgICAgICAgdmFyIGFjdGlvblRvQWRkID0gbmV3IFBlcnNvbmFDYXJkQWN0aW9uKGljb24sIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgc3dpdGNoIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnJlZ3VsYXJdOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9BZGQgPSAnZGV0YWlsLScgKyAoKytzY29wZS5yZWd1bGFyQWN0aW9uc0NvdW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW3BsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS50b3ByaWdodF06XG4gICAgICAgICAgICAgICAgY2xhc3NUb0FkZCA9ICdkZXRhaWwtNSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNsb25lLmZpbmQoJ2xpJykuZXEoMCkuYWRkQ2xhc3MoY2xhc3NUb0FkZCk7XG4gICAgICAgIGFjdGlvblRvQWRkLmRldGFpbENsYXNzID0gY2xhc3NUb0FkZDtcbiAgICAgICAgcGVyc29uYUNhcmRDb250cm9sbGVyLmFkZEFjdGlvbihhY3Rpb25Ub0FkZCk7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRDb250cm9sbGVyKCRsb2csICRzY29wZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5kZXRhaWxDc3MgPSB7XG4gICAgICAgICAgICAxOiAnQ2hhdCcsXG4gICAgICAgICAgICAyOiAnUGhvbmUnLFxuICAgICAgICAgICAgMzogJ1ZpZGVvJyxcbiAgICAgICAgICAgIDQ6ICdNYWlsJyxcbiAgICAgICAgICAgIDU6ICdPcmcnXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5wZXJzb25hQ2FyZEFjdGlvbnMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgJHNjb3BlLnJlZ3VsYXJBY3Rpb25zQ291bnQgPSAwO1xuICAgICAgICAkc2NvcGUuZGV0YWlsQ2xhc3MgPSAnbXMtUGVyc29uYUNhcmQtZGV0YWlsQ2hhdCc7XG4gICAgICAgICRzY29wZS5zZWxlY3RBY3Rpb24gPSBmdW5jdGlvbiAoJGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgICAgICRzY29wZS5wZXJzb25hQ2FyZEFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhY3Rpb24uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGRldGFpbE51bWJlciA9ICsoYWN0aW9uLmRldGFpbENsYXNzLmNoYXJBdChhY3Rpb24uZGV0YWlsQ2xhc3MubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgJHNjb3BlLmRldGFpbENsYXNzID0gJ21zLVBlcnNvbmFDYXJkLWRldGFpbCcgKyBfdGhpcy5kZXRhaWxDc3NbZGV0YWlsTnVtYmVyXTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUNhcmRDb250cm9sbGVyLnByb3RvdHlwZS5hZGRBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uVG9BZGQpIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFjdGlvblRvQWRkLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRzY29wZS5wZXJzb25hQ2FyZEFjdGlvbnMucHVzaChhY3Rpb25Ub0FkZCk7XG4gICAgfTtcbiAgICBQZXJzb25hQ2FyZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICckc2NvcGUnXTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmRDb250cm9sbGVyID0gUGVyc29uYUNhcmRDb250cm9sbGVyO1xudmFyIFBlcnNvbmFDYXJkQWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZEFjdGlvbihpY29uLCBwbGFjZWhvbGRlcikge1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIHJldHVybiBQZXJzb25hQ2FyZEFjdGlvbjtcbn0oKSk7XG52YXIgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAncHJpbWFyeSc6ICdtcy1QZXJzb25hLXByaW1hcnlUZXh0JyxcbiAgICAgICAgICAgICdzZWNvbmRhcnknOiAnbXMtUGVyc29uYS1zZWNvbmRhcnlUZXh0JyxcbiAgICAgICAgICAgICd0ZXJ0aWFyeSc6ICdtcy1QZXJzb25hLXRlcnRpYXJ5VGV4dCcsXG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCh0aGlzLmF2YWlsYWJsZUNsYXNzZXNbdGhpcy5kaXJlY3RpdmVUeXBlXSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9ICdvcHRpb25hbCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSh0eXBlKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZFRleHREaXJlY3RpdmUgPSBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeP3VpZlBlcnNvbmFDYXJkJztcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKGluc3RhbmNlRWxlbWVudCwgYWN0aW9uQXR0cnMpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXIpICYmIG5nLmlzVW5kZWZpbmVkKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcl0pKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiJyArIGFjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZQbGFjZWhvbGRlci4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIsIHRvcHJpZ2h0IG9yIG92ZXJmbG93LicpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXJdID09PSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ub3ZlcmZsb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxsaSBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLW92ZXJmbG93XCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJzxsaSBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbkRldGFpbHNcIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgO1xuICAgIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUgPSBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1kZXRhaWxMYWJlbFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUgPSBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWRldGFpbExpbmVcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmFjYXJkJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmQnLCBQZXJzb25hQ2FyZERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRBY3Rpb24nLCBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmREZXRhaWxMYWJlbCcsIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkRGV0YWlsTGluZScsIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRQcmltYXJ5VGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdwcmltYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRTZWNvbmRhcnlUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3NlY29uZGFyeScpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkVGVydGlhcnlUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3RlcnRpYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRPcHRpb25hbFRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgnJykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BlcnNvbmFjYXJkRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUGVyc29uYVNpemUpIHtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhzbWFsbFwiXSA9IDBdID0gXCJ4c21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInNtYWxsXCJdID0gMV0gPSBcInNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJtZWRpdW1cIl0gPSAyXSA9IFwibWVkaXVtXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJsYXJnZVwiXSA9IDNdID0gXCJsYXJnZVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieGxhcmdlXCJdID0gNF0gPSBcInhsYXJnZVwiO1xufSkoZXhwb3J0cy5QZXJzb25hU2l6ZSB8fCAoZXhwb3J0cy5QZXJzb25hU2l6ZSA9IHt9KSk7XG52YXIgUGVyc29uYVNpemUgPSBleHBvcnRzLlBlcnNvbmFTaXplO1xuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3NpemVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUGxhY2Vob2xkZXJFbnVtKSB7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcInJlZ3VsYXJcIl0gPSAwXSA9IFwicmVndWxhclwiO1xuICAgIFBsYWNlaG9sZGVyRW51bVtQbGFjZWhvbGRlckVudW1bXCJ0b3ByaWdodFwiXSA9IDFdID0gXCJ0b3ByaWdodFwiO1xuICAgIFBsYWNlaG9sZGVyRW51bVtQbGFjZWhvbGRlckVudW1bXCJvdmVyZmxvd1wiXSA9IDJdID0gXCJvdmVyZmxvd1wiO1xufSkoZXhwb3J0cy5QbGFjZWhvbGRlckVudW0gfHwgKGV4cG9ydHMuUGxhY2Vob2xkZXJFbnVtID0ge30pKTtcbnZhciBQbGFjZWhvbGRlckVudW0gPSBleHBvcnRzLlBsYWNlaG9sZGVyRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9wbGFjZWhvbGRlckVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hU3R5bGVFbnVtKSB7XG4gICAgUGVyc29uYVN0eWxlRW51bVtQZXJzb25hU3R5bGVFbnVtW1wicm91bmRcIl0gPSAwXSA9IFwicm91bmRcIjtcbiAgICBQZXJzb25hU3R5bGVFbnVtW1BlcnNvbmFTdHlsZUVudW1bXCJzcXVhcmVcIl0gPSAxXSA9IFwic3F1YXJlXCI7XG59KShleHBvcnRzLlBlcnNvbmFTdHlsZUVudW0gfHwgKGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bSA9IHt9KSk7XG52YXIgUGVyc29uYVN0eWxlRW51bSA9IGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29yZS9wZXJzb25hU3R5bGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUHJlc2VuY2VFbnVtKSB7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImF2YWlsYWJsZVwiXSA9IDBdID0gXCJhdmFpbGFibGVcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYXdheVwiXSA9IDFdID0gXCJhd2F5XCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImJsb2NrZWRcIl0gPSAyXSA9IFwiYmxvY2tlZFwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJidXN5XCJdID0gM10gPSBcImJ1c3lcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiZG5kXCJdID0gNF0gPSBcImRuZFwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJvZmZsaW5lXCJdID0gNV0gPSBcIm9mZmxpbmVcIjtcbn0pKGV4cG9ydHMuUHJlc2VuY2VFbnVtIHx8IChleHBvcnRzLlByZXNlbmNlRW51bSA9IHt9KSk7XG52YXIgUHJlc2VuY2VFbnVtID0gZXhwb3J0cy5QcmVzZW5jZUVudW07XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvcmUvcGVyc29uYVByZXNlbmNlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgcGVyc29uYVN0eWxlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hU3R5bGVFbnVtJyk7XG52YXIgcGVyc29uYVByZXNlbmNlRW51bV8xID0gcmVxdWlyZSgnLi4vLi4vY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtJyk7XG52YXIgcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEgPSByZXF1aXJlKCcuLi8uLi9jb3JlL3BlcnNvbmFJbml0aWFsc0NvbG9yRW51bScpO1xudmFyIHNpemVFbnVtXzEgPSByZXF1aXJlKCcuL3NpemVFbnVtJyk7XG52YXIgUGVyc29uYVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFUZXh0RGlyZWN0aXZlKGRpcmVjdGl2ZVR5cGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gZGlyZWN0aXZlVHlwZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVDbGFzc2VzID0ge1xuICAgICAgICAgICAgJ3ByaW1hcnknOiAnbXMtUGVyc29uYS1wcmltYXJ5VGV4dCcsXG4gICAgICAgICAgICAnc2Vjb25kYXJ5JzogJ21zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dCcsXG4gICAgICAgICAgICAndGVydGlhcnknOiAnbXMtUGVyc29uYS10ZXJ0aWFyeVRleHQnLFxuICAgICAgICAgICAgJ29wdGlvbmFsJzogJ21zLVBlcnNvbmEtb3B0aW9uYWxUZXh0J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBkaXJlY3RpdmVUZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiJyArIF90aGlzLmF2YWlsYWJsZUNsYXNzZXNbX3RoaXMuZGlyZWN0aXZlVHlwZV0gKyAnXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZVRlbXBsYXRlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQodGhpcy5hdmFpbGFibGVDbGFzc2VzW3RoaXMuZGlyZWN0aXZlVHlwZV0pKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSAnb3B0aW9uYWwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFUZXh0RGlyZWN0aXZlKHR5cGUpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYVRleHREaXJlY3RpdmUgPSBQZXJzb25hVGV4dERpcmVjdGl2ZTtcbnZhciBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnXnVpZlBlcnNvbmEnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZDb2xvcic6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWluaXRpYWxzIG1zLVBlcnNvbmEtaW5pdGlhbHMtLXt7dWlmQ29sb3J9fVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+ICc7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgICAgICB2YXIgcGVyc29uYUNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChhdHRycy51aWZDb2xvcikpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZDb2xvciA9IHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW3BlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yLmJsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZDb2xvcicsIGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChwZXJzb25hSW5pdGlhbHNDb2xvckVudW1fMS5QZXJzb25hSW5pdGlhbHNDb2xvcltuZXdDb2xvcl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgKyBuZXdDb2xvciArICdcIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmQ29sb3IuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIEl0IHNob3VsZCBiZSBsaWdodEJsdWUsIGJsdWUsIGRhcmtCbHVlLCB0ZWFsLCBsaWdodEdyZWVuLCBncmVlbiwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgZGFya0dyZWVuLCBsaWdodFBpbmssIHBpbmssIG1hZ2VudGEsIHB1cnBsZSwgYmxhY2ssIG9yYW5nZSwgcmVkIG9yIGRhcmtSZWQuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZSA9IFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZTtcbnZhciBQZXJzb25hRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZlBlcnNvbmEnXTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGVyc29uYUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAndWlmUHJlc2VuY2UnOiAnQCcsXG4gICAgICAgICAgICAndWlmU2l6ZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZJbWFnZVVybCc6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hXCIgbmctY2xhc3M9XCJnZXRQZXJzb25hQ2xhc3NlcygpXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VBcmVhXCIgbmctc2hvdz1cImdldEltYWdlQXJlYVZpc2liaWxpdHkoKVwiPicgK1xuICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJtcy1QZXJzb25hLWltYWdlXCIgbmctc3JjPVwie3t1aWZJbWFnZVVybH19XCIgbmctaWY9XCJ1aWZJbWFnZVVybFwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByZXNlbmNlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMudWlmU2l6ZUNsYXNzZXMgPSAoX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUudGlueV0gPSAnbXMtUGVyc29uYS0tdGlueScsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbF0gPSAnbXMtUGVyc29uYS0teHMnLFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5zbWFsbF0gPSAnbXMtUGVyc29uYS0tc20nLFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5sYXJnZV0gPSAnbXMtUGVyc29uYS0tbGcnLFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54bGFyZ2VdID0gJ21zLVBlcnNvbmEtLXhsJyxcbiAgICAgICAgICAgIF9hXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudWlmUHJlc2VuY2VDbGFzc2VzID0gKF9iID0ge30sXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF2YWlsYWJsZV0gPSAnbXMtUGVyc29uYS0tYXZhaWxhYmxlJyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXdheV0gPSAnbXMtUGVyc29uYS0tYXdheScsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJsb2NrZWRdID0gJ21zLVBlcnNvbmEtLWJsb2NrZWQnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5idXN5XSA9ICdtcy1QZXJzb25hLS1idXN5JyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uZG5kXSA9ICdtcy1QZXJzb25hLS1kbmQnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5vZmZsaW5lXSA9ICdtcy1QZXJzb25hLS1vZmZsaW5lJyxcbiAgICAgICAgICAgIF9iXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICB2YXIgcGVyc29uYUNvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkgJiYgbmcuaXNVbmRlZmluZWQoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU2l6ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU2l6ZS4gSXQgc2hvdWxkIGJlIHRpbnksIHhzbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHhsYXJnZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmcuaXNEZWZpbmVkKGF0dHJzLnVpZlN0eWxlKSAmJiBuZy5pc1VuZGVmaW5lZChwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0pKSB7XG4gICAgICAgICAgICAgICAgcGVyc29uYUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYSAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlN0eWxlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTdHlsZS4gSXQgc2hvdWxkIGJlIHJvdW5kIG9yIHNxdWFyZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmcuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBuZy5pc1VuZGVmaW5lZChwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmUHJlc2VuY2UgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlByZXNlbmNlLiBJdCBzaG91bGQgYmUgYXZhaWxhYmxlLCBhd2F5LCBibG9ja2VkLCBidXN5LCBkbmQgb3Igb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5nZXRJbWFnZUFyZWFWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSAhPT0gc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS50aW55KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5nZXRQZXJzb25hQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGVyc29uYUNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IHNpemVFbnVtXzEuUGVyc29uYVNpemVbYXR0cnMudWlmU2l6ZV07XG4gICAgICAgICAgICAgICAgdmFyIHByZXNlbmNlID0gbmcuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSA/IHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdIDogcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5vZmZsaW5lO1xuICAgICAgICAgICAgICAgIGlmIChwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVthdHRycy51aWZTdHlsZV0gPT09IHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpemVDbGFzcyA9IF90aGlzLnVpZlNpemVDbGFzc2VzW3NpemVdO1xuICAgICAgICAgICAgICAgIGlmIChuZy5pc0RlZmluZWQoc2l6ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKHNpemVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goX3RoaXMudWlmUHJlc2VuY2VDbGFzc2VzW3ByZXNlbmNlXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXRhaWxzV3JhcHBlciA9IG5nLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hLWRldGFpbHMnKSk7XG4gICAgICAgICAgICAgICAgdmFyIGltYWdlQXJlYSA9IG5nLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hLWltYWdlQXJlYScpKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdOYW1lID0gY2xvbmVbaV0udGFnTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1QUklNQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtU0VDT05EQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtVEVSVElBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1PUFRJT05BTC1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzV3JhcHBlci5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtSU5JVElBTFMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlQXJlYS5wcmVwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICB9XG4gICAgUGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYURpcmVjdGl2ZSA9IFBlcnNvbmFEaXJlY3RpdmU7XG52YXIgUGVyc29uYUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDb250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgUGVyc29uYUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuICAgIHJldHVybiBQZXJzb25hQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDb250cm9sbGVyID0gUGVyc29uYUNvbnRyb2xsZXI7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYScsIFBlcnNvbmFEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFJbml0aWFscycsIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVByaW1hcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgncHJpbWFyeScpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFTZWNvbmRhcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVRlcnRpYXJ5VGV4dCcsIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3RlcnRpYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYU9wdGlvbmFsVGV4dCcsIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJycpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3BlcnNvbmFEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChQZXJzb25hSW5pdGlhbHNDb2xvcikge1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wibGlnaHRCbHVlXCJdID0gMF0gPSBcImxpZ2h0Qmx1ZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiYmx1ZVwiXSA9IDFdID0gXCJibHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJkYXJrQmx1ZVwiXSA9IDJdID0gXCJkYXJrQmx1ZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1widGVhbFwiXSA9IDNdID0gXCJ0ZWFsXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodEdyZWVuXCJdID0gNF0gPSBcImxpZ2h0R3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImdyZWVuXCJdID0gNV0gPSBcImdyZWVuXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJkYXJrR3JlZW5cIl0gPSA2XSA9IFwiZGFya0dyZWVuXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodFBpbmtcIl0gPSA3XSA9IFwibGlnaHRQaW5rXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJwaW5rXCJdID0gOF0gPSBcInBpbmtcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcIm1hZ2VudGFcIl0gPSA5XSA9IFwibWFnZW50YVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wicHVycGxlXCJdID0gMTBdID0gXCJwdXJwbGVcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImJsYWNrXCJdID0gMTFdID0gXCJibGFja1wiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wib3JhbmdlXCJdID0gMTJdID0gXCJvcmFuZ2VcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcInJlZFwiXSA9IDEzXSA9IFwicmVkXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJkYXJrUmVkXCJdID0gMTRdID0gXCJkYXJrUmVkXCI7XG59KShleHBvcnRzLlBlcnNvbmFJbml0aWFsc0NvbG9yIHx8IChleHBvcnRzLlBlcnNvbmFJbml0aWFsc0NvbG9yID0ge30pKTtcbnZhciBQZXJzb25hSW5pdGlhbHNDb2xvciA9IGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3I7XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoUGVyc29uYVNpemUpIHtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInRpbnlcIl0gPSAwXSA9IFwidGlueVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieHNtYWxsXCJdID0gMV0gPSBcInhzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wic21hbGxcIl0gPSAyXSA9IFwic21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcIm1lZGl1bVwiXSA9IDNdID0gXCJtZWRpdW1cIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcImxhcmdlXCJdID0gNF0gPSBcImxhcmdlXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4bGFyZ2VcIl0gPSA1XSA9IFwieGxhcmdlXCI7XG59KShleHBvcnRzLlBlcnNvbmFTaXplIHx8IChleHBvcnRzLlBlcnNvbmFTaXplID0ge30pKTtcbnZhciBQZXJzb25hU2l6ZSA9IGV4cG9ydHMuUGVyc29uYVNpemU7XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9zaXplRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3JcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbU5hbWVcIj57e3VpZk5hbWV9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1pdGVtUHJvZ3Jlc3NcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItcHJvZ3Jlc3NUcmFja1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1wcm9ncmVzc0JhclwiIG5nLXN0eWxlPVwie3dpZHRoOiB1aWZQZXJjZW50Q29tcGxldGUrXFwnJVxcJ31cIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbURlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZOYW1lOiAnQCcsXG4gICAgICAgICAgICB1aWZQZXJjZW50Q29tcGxldGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAobG9nKSB7IHJldHVybiBuZXcgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUobG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUGVyY2VudENvbXBsZXRlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwgfHwgbmV3VmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGVyY2VudENvbXBsZXRlID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3UGVyY2VudENvbXBsZXRlID0gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obmV3UGVyY2VudENvbXBsZXRlKSB8fCBuZXdQZXJjZW50Q29tcGxldGUgPCAwIHx8IG5ld1BlcmNlbnRDb21wbGV0ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucHJvZ3Jlc3NpbmRpY2F0b3IgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1BlcmNlbnQgY29tcGxldGUgbXVzdCBiZSBhIHZhbGlkIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMC4nKTtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZQZXJjZW50Q29tcGxldGUgPSBNYXRoLm1heChNYXRoLm1pbihuZXdQZXJjZW50Q29tcGxldGUsIDEwMCksIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIDtcbiAgICByZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Qcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZSA9IFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucHJvZ3Jlc3NpbmRpY2F0b3InLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlByb2dyZXNzSW5kaWNhdG9yJywgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9wcm9ncmVzc2luZGljYXRvci9wcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgU2VhcmNoQm94RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWFyY2hCb3hEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNlYXJjaEJveFwiIG5nLWNsYXNzPVwie1xcJ2lzLWFjdGl2ZVxcJzppc0FjdGl2ZX1cIj4nICtcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJtcy1TZWFyY2hCb3gtZmllbGRcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWJsdXI9XCJpbnB1dEJsdXIoKVwiJyArXG4gICAgICAgICAgICAnIG5nLW1vZGVsPVwidmFsdWVcIiBpZD1cInt7OjpcXCdzZWFyY2hCb3hfXFwnKyRpZH19XCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgY2xhc3M9XCJtcy1TZWFyY2hCb3gtbGFiZWxcIiBmb3I9XCJ7ezo6XFwnc2VhcmNoQm94X1xcJyskaWR9fVwiIG5nLWhpZGU9XCJpc0xhYmVsSGlkZGVuXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1TZWFyY2hCb3gtaWNvbiBtcy1JY29uIG1zLUljb24tLXNlYXJjaFwiID48L2k+IHt7cGxhY2Vob2xkZXJ9fTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm1zLVNlYXJjaEJveC1jbG9zZUJ1dHRvblwiIG5nLW1vdXNlZG93bj1cImJ0bk1vdXNlZG93bigpXCIgdHlwZT1cImJ1dHRvblwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJz0/JyxcbiAgICAgICAgICAgIHZhbHVlOiAnPT8nXG4gICAgICAgIH07XG4gICAgfVxuICAgIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNlYXJjaEJveERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU2VhcmNoQm94RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICBzY29wZS5pc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaW5wdXRGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Qmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5pc0NhbmNlbCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHNjb3BlLnZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2NvcGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmJ0bk1vdXNlZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzQ2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd2YWx1ZScsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICghc2NvcGUuaXNGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdmFsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3BsYWNlaG9sZGVyJywgZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgICAgICAgICAgc2NvcGUucGxhY2Vob2xkZXIgPSBzZWFyY2g7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlYXJjaEJveERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlNlYXJjaEJveERpcmVjdGl2ZSA9IFNlYXJjaEJveERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNlYXJjaGJveCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNlYXJjaGJveCcsIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3NlYXJjaGJveC9zZWFyY2hib3hEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHNwaW5uZXJTaXplRW51bV8xID0gcmVxdWlyZSgnLi9zcGlubmVyU2l6ZUVudW0nKTtcbnZhciBTcGlubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGlubmVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1TcGlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gU3Bpbm5lckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAnbmdTaG93JzogJz0nLFxuICAgICAgICAgICAgJ3VpZlNpemUnOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3Bpbm5lckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNwaW5uZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNwaW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmIChuZy5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkpIHtcbiAgICAgICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZChzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZVthdHRycy51aWZTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNwaW5uZXIgLSBVbnN1cHBvcnRlZCBzaXplOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1NwaW5uZXIgc2l6ZSAoXFwnJyArIGF0dHJzLnVpZlNpemUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdID09PSBzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZS5sYXJnZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnbXMtU3Bpbm5lci0tbGFyZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMubmdTaG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnbmdTaG93JywgZnVuY3Rpb24gKG5ld1Zpc2libGUsIG9sZFZpc2libGUsIHNwaW5uZXJTY29wZSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwaW5uZXJTY29wZS5zdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICBpZiAoY2xvbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gbmcuZWxlbWVudCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1TcGlubmVyLWxhYmVsJykuYXBwZW5kKGNsb25lKTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuaW5pdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFNwaW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5TcGlubmVyRGlyZWN0aXZlID0gU3Bpbm5lckRpcmVjdGl2ZTtcbnZhciBTcGlubmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Bpbm5lckNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGludGVydmFsLCAkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGludGVydmFsID0gJGludGVydmFsO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLl9vZmZzZXRTaXplID0gMC4xNzk7XG4gICAgICAgIHRoaXMuX251bUNpcmNsZXMgPSA4O1xuICAgICAgICB0aGlzLl9hbmltYXRpb25TcGVlZCA9IDkwO1xuICAgICAgICB0aGlzLl9jaXJjbGVzID0gW107XG4gICAgICAgICRzY29wZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3BhcmVudFNpemUgPSBzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZVtfdGhpcy4kc2NvcGUudWlmU2l6ZV0gPT09IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplLmxhcmdlID8gMjggOiAyMDtcbiAgICAgICAgICAgIF90aGlzLmNyZWF0ZUNpcmNsZXNBbmRBcnJhbmdlKCk7XG4gICAgICAgICAgICBfdGhpcy5zZXRJbml0aWFsT3BhY2l0eSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fYW5pbWF0aW9uSW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gX3RoaXMuX2NpcmNsZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmFkZUNpcmNsZShfdGhpcy5fY2lyY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgX3RoaXMuX2FuaW1hdGlvblNwZWVkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKF90aGlzLl9hbmltYXRpb25JbnRlcnZhbCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFNwaW5uZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVDaXJjbGVzQW5kQXJyYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gMDtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX3BhcmVudFNpemUgKiB0aGlzLl9vZmZzZXRTaXplO1xuICAgICAgICB2YXIgc3RlcCA9ICgyICogTWF0aC5QSSkgLyB0aGlzLl9udW1DaXJjbGVzO1xuICAgICAgICB2YXIgaSA9IHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHZhciByYWRpdXMgPSAodGhpcy5fcGFyZW50U2l6ZSAtIG9mZnNldCkgKiAwLjU7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHZhciBjaXJjbGUgPSB0aGlzLmNyZWF0ZUNpcmNsZSgpO1xuICAgICAgICAgICAgdmFyIHggPSBNYXRoLnJvdW5kKHRoaXMuX3BhcmVudFNpemUgKiAwLjUgKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSkgLSBjaXJjbGVbMF0uY2xpZW50V2lkdGggKiAwLjUpIC0gb2Zmc2V0ICogMC41O1xuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLnJvdW5kKHRoaXMuX3BhcmVudFNpemUgKiAwLjUgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSkgLSBjaXJjbGVbMF0uY2xpZW50SGVpZ2h0ICogMC41KSAtIG9mZnNldCAqIDAuNTtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKGNpcmNsZSk7XG4gICAgICAgICAgICBjaXJjbGUuY3NzKCdsZWZ0JywgKHggKyAncHgnKSk7XG4gICAgICAgICAgICBjaXJjbGUuY3NzKCd0b3AnLCAoeSArICdweCcpKTtcbiAgICAgICAgICAgIGFuZ2xlICs9IHN0ZXA7XG4gICAgICAgICAgICB2YXIgY2lyY2xlT2JqZWN0ID0gbmV3IENpcmNsZU9iamVjdChjaXJjbGUsIGkpO1xuICAgICAgICAgICAgdGhpcy5fY2lyY2xlcy5wdXNoKGNpcmNsZU9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNwaW5uZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVDaXJjbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaXJjbGUgPSBuZy5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgZG90U2l6ZSA9ICh0aGlzLl9wYXJlbnRTaXplICogdGhpcy5fb2Zmc2V0U2l6ZSkgKyAncHgnO1xuICAgICAgICBjaXJjbGUuYWRkQ2xhc3MoJ21zLVNwaW5uZXItY2lyY2xlJykuY3NzKCd3aWR0aCcsIGRvdFNpemUpLmNzcygnaGVpZ2h0JywgZG90U2l6ZSk7XG4gICAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICA7XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLnNldEluaXRpYWxPcGFjaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3BjYWl0eVRvU2V0O1xuICAgICAgICB0aGlzLl9mYWRlSW5jcmVtZW50ID0gMSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoY2lyY2xlLCBpbmRleCkge1xuICAgICAgICAgICAgb3BjYWl0eVRvU2V0ID0gKF90aGlzLl9mYWRlSW5jcmVtZW50ICogKGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgY2lyY2xlLm9wYWNpdHkgPSBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmZhZGVDaXJjbGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHZhciBuZXdPcGFjaXR5ID0gY2lyY2xlLm9wYWNpdHkgLSB0aGlzLl9mYWRlSW5jcmVtZW50O1xuICAgICAgICBpZiAobmV3T3BhY2l0eSA8PSAwKSB7XG4gICAgICAgICAgICBuZXdPcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG5ld09wYWNpdHk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGludGVydmFsJywgJyRsb2cnXTtcbiAgICByZXR1cm4gU3Bpbm5lckNvbnRyb2xsZXI7XG59KCkpO1xudmFyIENpcmNsZU9iamVjdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2lyY2xlT2JqZWN0KGNpcmNsZUVsZW1lbnQsIGNpcmNsZUluZGV4KSB7XG4gICAgICAgIHRoaXMuY2lyY2xlRWxlbWVudCA9IGNpcmNsZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2lyY2xlSW5kZXggPSBjaXJjbGVJbmRleDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENpcmNsZU9iamVjdC5wcm90b3R5cGUsIFwib3BhY2l0eVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICsodGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAob3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScsIG9wYWNpdHkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQ2lyY2xlT2JqZWN0O1xufSgpKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNwaW5uZXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZTcGlubmVyJywgU3Bpbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFNwaW5uZXJTaXplKSB7XG4gICAgU3Bpbm5lclNpemVbU3Bpbm5lclNpemVbJ3NtYWxsJ10gPSAwXSA9ICdzbWFsbCc7XG4gICAgU3Bpbm5lclNpemVbU3Bpbm5lclNpemVbJ2xhcmdlJ10gPSAxXSA9ICdsYXJnZSc7XG59KShleHBvcnRzLlNwaW5uZXJTaXplIHx8IChleHBvcnRzLlNwaW5uZXJTaXplID0ge30pKTtcbnZhciBTcGlubmVyU2l6ZSA9IGV4cG9ydHMuU3Bpbm5lclNpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMSA9IHJlcXVpcmUoJy4vdGFibGVSb3dTZWxlY3RNb2RlRW51bScpO1xudmFyIHRhYmxlVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vdGFibGVUeXBlRW51bScpO1xudmFyIFRhYmxlQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVDb250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IG51bGw7XG4gICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQXNjID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kc2NvcGUucm93cyA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckJ5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUub3JkZXJCeTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQnkgPSBwcm9wZXJ0eTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwib3JkZXJBc2NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckFzYztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAob3JkZXJBc2MpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQXNjID0gb3JkZXJBc2M7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInJvd1NlbGVjdE1vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5yb3dTZWxlY3RNb2RlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb3dTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICBpZiAodGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bcm93U2VsZWN0TW9kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIHJvd1NlbGVjdE1vZGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLXJvdy1zZWxlY3QtbW9kZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBub25lfHNpbmdsZXxtdWx0aXBsZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJvd1NlbGVjdE1vZGUgPSByb3dTZWxlY3RNb2RlO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJyb3dzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUucm93cztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocm93cykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUucm93cyA9IHJvd3M7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkSXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvd3NbaV0uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKHRoaXMucm93c1tpXS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVGFibGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIFRhYmxlQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgVGFibGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0YWJsZSBuZy1jbGFzcz1cIltcXCdtcy1UYWJsZVxcJywgdGFibGVUeXBlQ2xhc3NdXCIgbmctdHJhbnNjbHVkZT48L3RhYmxlPic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndGFibGUnO1xuICAgIH1cbiAgICBUYWJsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBpZiAoYXR0cnMudWlmUm93U2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlJvd1NlbGVjdE1vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVthdHRycy51aWZSb3dTZWxlY3RNb2RlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmUm93U2VsZWN0TW9kZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtcm93LXNlbGVjdC1tb2RlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIG5vbmV8c2luZ2xlfG11bHRpcGxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcGUucm93U2VsZWN0TW9kZSA9IGF0dHJzLnVpZlJvd1NlbGVjdE1vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnJvd1NlbGVjdE1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NvcGUucm93U2VsZWN0TW9kZSA9IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLm5vbmVdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZUYWJsZVR5cGUgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZUYWJsZVR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bVthdHRycy51aWZUYWJsZVR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZUYWJsZVR5cGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLXRhYmxlLXR5cGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgZml4ZWR8Zmx1aWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS50YWJsZVR5cGUgPSBhdHRycy51aWZUYWJsZVR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnRhYmxlVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS50YWJsZVR5cGUgPSB0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bVt0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bS5mbHVpZF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnRhYmxlVHlwZSA9PT0gdGFibGVUeXBlRW51bV8xLlRhYmxlVHlwZUVudW1bdGFibGVUeXBlRW51bV8xLlRhYmxlVHlwZUVudW0uZml4ZWRdKSB7XG4gICAgICAgICAgICBzY29wZS50YWJsZVR5cGVDbGFzcyA9ICdtcy1UYWJsZS0tZml4ZWQnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZURpcmVjdGl2ZSA9IFRhYmxlRGlyZWN0aXZlO1xudmFyIFRhYmxlUm93Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dDb250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlUm93Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLml0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVSb3dDb250cm9sbGVyLnByb3RvdHlwZSwgXCJzZWxlY3RlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVGFibGVSb3dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG4gICAgcmV0dXJuIFRhYmxlUm93Q29udHJvbGxlcjtcbn0oKSk7XG52YXIgVGFibGVSb3dEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlUm93RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0ciBuZy10cmFuc2NsdWRlPjwvdHI+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZUYWJsZSc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpdGVtOiAnPXVpZkl0ZW0nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlUm93Q29udHJvbGxlcjtcbiAgICB9XG4gICAgVGFibGVSb3dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZVJvd0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVSb3dEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZTZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkU3RyaW5nID0gYXR0cnMudWlmU2VsZWN0ZWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyAhPT0gJ3RydWUnICYmIHNlbGVjdGVkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgdGFibGUuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlNlbGVjdGVkICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhYmxlLnJvd3MucHVzaChzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucm93Q2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCB0YWJsZVJvd1Njb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSA9PT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0uc2luZ2xlXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3NbaV0gIT09IHRhYmxlUm93U2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUucm93c1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSAhPT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV0gJiZcbiAgICAgICAgICAgIHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50Lm9uKCdjbGljaycsIHNjb3BlLnJvd0NsaWNrKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSA9PT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV0pIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jc3MoJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZVJvd0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlUm93RGlyZWN0aXZlID0gVGFibGVSb3dEaXJlY3RpdmU7XG52YXIgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0ZCBjbGFzcz1cIm1zLVRhYmxlLXJvd0NoZWNrXCI+PC90ZD4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ151aWZUYWJsZScsICc/XnVpZlRhYmxlSGVhZCcsICdedWlmVGFibGVSb3cnXTtcbiAgICB9XG4gICAgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHZhciB0aGVhZCA9IGNvbnRyb2xsZXJzWzFdO1xuICAgICAgICBpZiAodGhlYWQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZXBsYWNlV2l0aCgnPHRoIGNsYXNzPVwibXMtVGFibGUtcm93Q2hlY2tcIj48L3RoPicpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnJvd1NlbGVjdENsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgdGFibGUgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgICAgIHZhciByb3cgPSBjb250cm9sbGVyc1syXTtcbiAgICAgICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlICE9PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5tdWx0aXBsZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocm93Lml0ZW0gPT09IHVuZGVmaW5lZCB8fCByb3cuaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBzaG91bGRTZWxlY3RBbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3NbaV0uc2VsZWN0ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZFNlbGVjdEFsbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3NbaV0uc2VsZWN0ZWQgIT09IHNob3VsZFNlbGVjdEFsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUucm93c1tpXS5zZWxlY3RlZCA9IHNob3VsZFNlbGVjdEFsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaW5zdGFuY2VFbGVtZW50Lm9uKCdjbGljaycsIHNjb3BlLnJvd1NlbGVjdENsaWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlUm93U2VsZWN0RGlyZWN0aXZlID0gVGFibGVSb3dTZWxlY3REaXJlY3RpdmU7XG52YXIgVGFibGVDZWxsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNlbGxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRkIG5nLXRyYW5zY2x1ZGU+PC90ZD4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgIH1cbiAgICBUYWJsZUNlbGxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUNlbGxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZUNlbGxEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUNlbGxEaXJlY3RpdmUgPSBUYWJsZUNlbGxEaXJlY3RpdmU7XG52YXIgVGFibGVIZWFkZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlSGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0aCBuZy10cmFuc2NsdWRlPjwvdGg+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZUYWJsZSc7XG4gICAgfVxuICAgIFRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlSGVhZGVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCB0YWJsZSkge1xuICAgICAgICBzY29wZS5oZWFkZXJDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKHRhYmxlLm9yZGVyQnkgPT09IGF0dHJzLnVpZk9yZGVyQnkpIHtcbiAgICAgICAgICAgICAgICB0YWJsZS5vcmRlckFzYyA9ICF0YWJsZS5vcmRlckFzYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQnkgPSBhdHRycy51aWZPcmRlckJ5O1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd0YWJsZS5vcmRlckJ5JywgZnVuY3Rpb24gKG5ld09yZGVyQnksIG9sZE9yZGVyQnksIHRhYmxlSGVhZGVyU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChvbGRPcmRlckJ5ICE9PSBuZXdPcmRlckJ5ICYmXG4gICAgICAgICAgICAgICAgbmV3T3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHZhciBjZWxscyA9IGluc3RhbmNlRWxlbWVudC5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxzLmVxKGkpLmNoaWxkcmVuKCkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxscy5lcShpKS5jaGlsZHJlbigpLmVxKDEpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwidWlmLXNvcnQtb3JkZXJcIj4mbmJzcDtcXFxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jYXJldERvd25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9zcGFuPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd0YWJsZS5vcmRlckFzYycsIGZ1bmN0aW9uIChuZXdPcmRlckFzYywgb2xkT3JkZXJBc2MsIHRhYmxlSGVhZGVyU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkQ3NzQ2xhc3MgPSBvbGRPcmRlckFzYyA/ICdtcy1JY29uLS1jYXJldERvd24nIDogJ21zLUljb24tLWNhcmV0VXAnO1xuICAgICAgICAgICAgICAgIHZhciBuZXdDc3NDbGFzcyA9IG5ld09yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMSkuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcyhvbGRDc3NDbGFzcykuYWRkQ2xhc3MobmV3Q3NzQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCd1aWZPcmRlckJ5JyBpbiBhdHRycykge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50Lm9uKCdjbGljaycsIHNjb3BlLmhlYWRlckNsaWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVIZWFkZXJEaXJlY3RpdmUgPSBUYWJsZUhlYWRlckRpcmVjdGl2ZTtcbnZhciBUYWJsZUhlYWRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUhlYWRDb250cm9sbGVyKCkge1xuICAgIH1cbiAgICByZXR1cm4gVGFibGVIZWFkQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgVGFibGVIZWFkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUhlYWREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRoZWFkIG5nLXRyYW5zY2x1ZGU+PC90aGVhZD4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBUYWJsZUhlYWRDb250cm9sbGVyO1xuICAgIH1cbiAgICBUYWJsZUhlYWREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZUhlYWREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUhlYWREaXJlY3RpdmUgPSBUYWJsZUhlYWREaXJlY3RpdmU7XG52YXIgVGFibGVCb2R5RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUJvZHlEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRib2R5IG5nLXRyYW5zY2x1ZGU+PC90Ym9keT4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgIH1cbiAgICBUYWJsZUJvZHlEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUJvZHlEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZUJvZHlEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUJvZHlEaXJlY3RpdmUgPSBUYWJsZUJvZHlEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZScsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlJywgVGFibGVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlUm93JywgVGFibGVSb3dEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlUm93U2VsZWN0JywgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlQ2VsbCcsIFRhYmxlQ2VsbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVIZWFkZXInLCBUYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVIZWFkJywgVGFibGVIZWFkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUJvZHknLCBUYWJsZUJvZHlEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKFRhYmxlUm93U2VsZWN0TW9kZUVudW0pIHtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJzaW5nbGVcIl0gPSAxXSA9IFwic2luZ2xlXCI7XG4gICAgVGFibGVSb3dTZWxlY3RNb2RlRW51bVtUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1wibXVsdGlwbGVcIl0gPSAyXSA9IFwibXVsdGlwbGVcIjtcbn0pKGV4cG9ydHMuVGFibGVSb3dTZWxlY3RNb2RlRW51bSB8fCAoZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtID0ge30pKTtcbnZhciBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtID0gZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlUm93U2VsZWN0TW9kZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChUYWJsZVR5cGVFbnVtKSB7XG4gICAgVGFibGVUeXBlRW51bVtUYWJsZVR5cGVFbnVtW1wiZmx1aWRcIl0gPSAwXSA9IFwiZmx1aWRcIjtcbiAgICBUYWJsZVR5cGVFbnVtW1RhYmxlVHlwZUVudW1bXCJmaXhlZFwiXSA9IDFdID0gXCJmaXhlZFwiO1xufSkoZXhwb3J0cy5UYWJsZVR5cGVFbnVtIHx8IChleHBvcnRzLlRhYmxlVHlwZUVudW0gPSB7fSkpO1xudmFyIFRhYmxlVHlwZUVudW0gPSBleHBvcnRzLlRhYmxlVHlwZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVUeXBlRW51bS50c1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgdWlmVHlwZUVudW1fMSA9IHJlcXVpcmUoJy4vdWlmVHlwZUVudW0nKTtcbnZhciBUZXh0RmllbGRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXh0RmllbGRDb250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgVGV4dEZpZWxkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgcmV0dXJuIFRleHRGaWVsZENvbnRyb2xsZXI7XG59KCkpO1xudmFyIFRleHRGaWVsZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGV4dEZpZWxkRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBUZXh0RmllbGRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xhc3M9XCJ7XFwnaXMtYWN0aXZlXFwnOiBpc0FjdGl2ZSwgXFwnbXMtVGV4dEZpZWxkXFwnOiB0cnVlLCAnICtcbiAgICAgICAgICAgICdcXCdtcy1UZXh0RmllbGQtLXVuZGVybGluZWRcXCc6IHVpZlVuZGVybGluZWQsIFxcJ21zLVRleHRGaWVsZC0tcGxhY2Vob2xkZXJcXCc6IHBsYWNlaG9sZGVyLCAnICtcbiAgICAgICAgICAgICdcXCdpcy1yZXF1aXJlZFxcJzogcmVxdWlyZWQsIFxcJ2lzLWRpc2FibGVkXFwnOiBkaXNhYmxlZCwgXFwnbXMtVGV4dEZpZWxkLS1tdWx0aWxpbmVcXCcgOiB1aWZNdWx0aWxpbmUgfVwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBuZy1zaG93PVwibGFiZWxTaG93blwiIGNsYXNzPVwibXMtTGFiZWxcIiBuZy1jbGljaz1cImxhYmVsQ2xpY2soKVwiPnt7dWlmTGFiZWwgfHwgcGxhY2Vob2xkZXJ9fTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGlucHV0IG5nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWJsdXI9XCJpbnB1dEJsdXIoKVwiIG5nLWZvY3VzPVwiaW5wdXRGb2N1cygpXCIgbmctY2xpY2s9XCJpbnB1dENsaWNrKClcIiAnICtcbiAgICAgICAgICAgICdjbGFzcz1cIm1zLVRleHRGaWVsZC1maWVsZFwiIG5nLXNob3c9XCIhdWlmTXVsdGlsaW5lXCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIHR5cGU9XCJ7e3VpZlR5cGV9fVwiIC8+JyArXG4gICAgICAgICAgICAnPHRleHRhcmVhIG5nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWJsdXI9XCJpbnB1dEJsdXIoKVwiIG5nLWZvY3VzPVwiaW5wdXRGb2N1cygpXCIgbmctY2xpY2s9XCJpbnB1dENsaWNrKClcIiAnICtcbiAgICAgICAgICAgICdjbGFzcz1cIm1zLVRleHRGaWVsZC1maWVsZFwiIG5nLXNob3c9XCJ1aWZNdWx0aWxpbmVcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVkXCI+PC90ZXh0YXJlYT4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRleHRGaWVsZC1kZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0/JyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICB1aWZEZXNjcmlwdGlvbjogJ0AnLFxuICAgICAgICAgICAgdWlmTGFiZWw6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZlRleHRmaWVsZCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgIH1cbiAgICBUZXh0RmllbGREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUZXh0RmllbGREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgdmFyIG5nTW9kZWwgPSBjb250cm9sbGVyc1sxXTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5zdGFuY2VFbGVtZW50LmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgc2NvcGUuZGlzYWJsZWQgPSB0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnOyB9KSk7XG4gICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSB0cnVlO1xuICAgICAgICBzY29wZS5yZXF1aXJlZCA9ICdyZXF1aXJlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLnVpZk11bHRpbGluZSA9IGF0dHJzLnVpZk11bHRpbGluZSA9PT0gJ3RydWUnO1xuICAgICAgICBzY29wZS51aWZUeXBlID0gYXR0cnMudWlmVHlwZTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodWlmVHlwZUVudW1fMS5JbnB1dFR5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGV4dGZpZWxkIC0gVW5zdXBwb3J0ZWQgdHlwZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdWlmVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZUeXBlID0gdWlmVHlwZUVudW1fMS5JbnB1dFR5cGVFbnVtLnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS51aWZVbmRlcmxpbmVkID0gJ3VpZlVuZGVybGluZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS5pbnB1dEZvY3VzID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Qmx1ciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIgJiYgaW5wdXQudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5sYWJlbENsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBzY29wZS51aWZNdWx0aWxpbmUgPyBpbnN0YW5jZUVsZW1lbnQuZmluZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgICAgICAgICA6IGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIGlucHV0WzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChuZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9ICFuZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRleHRGaWVsZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRleHRGaWVsZERpcmVjdGl2ZSA9IFRleHRGaWVsZERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRleHRmaWVsZCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmVGV4dGZpZWxkJywgVGV4dEZpZWxkRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKElucHV0VHlwZUVudW0pIHtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJ0ZXh0XCJdID0gMF0gPSBcInRleHRcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJwYXNzd29yZFwiXSA9IDFdID0gXCJwYXNzd29yZFwiO1xufSkoZXhwb3J0cy5JbnB1dFR5cGVFbnVtIHx8IChleHBvcnRzLklucHV0VHlwZUVudW0gPSB7fSkpO1xudmFyIElucHV0VHlwZUVudW0gPSBleHBvcnRzLklucHV0VHlwZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBUb2dnbGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRvZ2dsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwiW1xcJ21zLVRvZ2dsZVxcJywgdGV4dExvY2F0aW9uLCB7XFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfV1cIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRvZ2dsZS1kZXNjcmlwdGlvblwiPjxuZy10cmFuc2NsdWRlLz48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtaW5wdXRcIiAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1jaGFuZ2U9XCJuZ0NoYW5nZSgpXCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiICcgK1xuICAgICAgICAgICAgJ25nLWF0dHItbmctdHJ1ZS12YWx1ZT1cInt7bmdUcnVlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiBuZy1hdHRyLW5nLWZhbHNlLXZhbHVlPVwie3tuZ0ZhbHNlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLVRvZ2dsZS1maWVsZFwiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtTGFiZWwgbXMtTGFiZWwtLW9mZlwiPnt7dWlmTGFiZWxPZmZ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vblwiPnt7dWlmTGFiZWxPbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nQ2hhbmdlOiAnJj8nLFxuICAgICAgICAgICAgbmdGYWxzZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgbmdNb2RlbDogJz0/JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQD8nLFxuICAgICAgICAgICAgdWlmTGFiZWxPZmY6ICdAJyxcbiAgICAgICAgICAgIHVpZkxhYmVsT246ICdAJyxcbiAgICAgICAgICAgIHVpZlRleHRMb2NhdGlvbjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRvZ2dsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVG9nZ2xlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICBpZiAoc2NvcGUudWlmVGV4dExvY2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbG9jID0gc2NvcGUudWlmVGV4dExvY2F0aW9uO1xuICAgICAgICAgICAgbG9jID0gbG9jLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbG9jLnNsaWNlKDEpO1xuICAgICAgICAgICAgc2NvcGUudGV4dExvY2F0aW9uID0gJyBtcy1Ub2dnbGUtLXRleHQnICsgbG9jO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtLmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgc2NvcGUuZGlzYWJsZWQgPSB0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnOyB9KSk7XG4gICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycztcbiAgICB9O1xuICAgIHJldHVybiBUb2dnbGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ub2dnbGVEaXJlY3RpdmUgPSBUb2dnbGVEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50b2dnbGUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRvZ2dsZScsIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0UHJlc2VuY2VFbnVtJyk7XG52YXIgb3JnQ2hhcnRTdHlsZUVudW1fMSA9IHJlcXVpcmUoJy4vb3JnQ2hhcnRTdHlsZUVudW0nKTtcbnZhciBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKCcuL29yZ0NoYXJ0U2VsZWN0TW9kZUVudW0nKTtcbnZhciBPcmdDaGFydENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdE1vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLiRzY29wZS5pdGVtcyA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT3JnQ2hhcnRDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9yZ0NoYXJ0Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPcmdDaGFydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbiAgICByZXR1cm4gT3JnQ2hhcnRDb250cm9sbGVyO1xufSgpKTtcbnZhciBPcmdDaGFydERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gT3JnQ2hhcnRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogJz0/dWlmU2VsZWN0ZWRJdGVtcydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlNlbGVjdE1vZGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGU6XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZTpcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RNb2RlID0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bYXR0cnMudWlmU2VsZWN0TW9kZV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVUlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQgLSBVbnN1cHBvcnRlZCBzZWxlY3QtbW9kZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHNlbGVjdC1tb2RlIChcXCcnICsgYXR0cnMudWlmU2VsZWN0TW9kZSArICdcXCkgaXMgbm90IHN1cHBlcnRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBzaW5nbGUsIG11bHRpcGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydERpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cERpcmVjdGl2ZSA9IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwVGl0bGVcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUgPSBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtT3JnQ2hhcnQtbGlzdFwiIG5nLXRyYW5zY2x1ZGUgPjwvdWw+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1PcmdDaGFydC1saXN0SXRlbVwiPjxkaXYgY2xhc3M9XCJtcy1QZXJzb25hXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+PC9saT4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZk9yZ0NoYXJ0JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9P3VpZkl0ZW0nLFxuICAgICAgICAgICAgcHJlc2VuY2U6ICc9P3VpZlByZXNlbmNlJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPT91aWZTZWxlY3RlZCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtLCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnByZXNlbmNlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW1bc2NvcGUucHJlc2VuY2VdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmJ1c3k6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYnVzeScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYXdheTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hd2F5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5ibG9ja2VkOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWJsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmRuZDpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1kbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLm9mZmxpbmU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tb2ZmbGluZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgcHJlc2VuY2U6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmVzZW5jZSAoXFwnJyArIHNjb3BlLnByZXNlbmNlICsgJ1xcJykgaXMgbm90IHN1cHBlcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBhdmFpbGFibGUsIGJ1c3ksIGF3YXksIGJsb2NrZWQsIGRuZCwgb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlN0eWxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U3R5bGVFbnVtXzEuT3JnQ2hhcnRTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnNxdWFyZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnN0YW5kYXJkOiBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgc3R5bGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBzdHlsZSAoXFwnJyArIGF0dHJzLnVpZlN0eWxlICsgJ1xcKSBpcyBub3Qgc3VwcGVydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6IHN0YW5kYXJkKGRlZmF1bHQpLCBzcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLXNlbGVjdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgY3RybC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUgfHwgY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3RybC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXRlbXNbaV0gIT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5wdXNoKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wZXJzb25hQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0cmwuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pdGVtc1tpXSAhPT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGN0cmwuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSB8fCBjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlKSAmJiBzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkub24oJ2NsaWNrJywgc2NvcGUucGVyc29uYUNsaWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEltYWdlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEltYWdlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZUFyZWFcXFwiPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJtcy1QZXJzb25hLXBsYWNlaG9sZGVyIG1zLUljb24gbXMtSWNvbi0tcGVyc29uXFxcIj48L2k+XFxuICAgICAgPGltZyBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZVxcXCIgbmctc3JjPVxcXCJ7e25nU3JjfX1cXFwiIC8+XFxuICAgIDwvZGl2PlxcbiAgICBcIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nU3JjOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmVzZW5jZVwiID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgaWYgKCFzY29wZS4kcGFyZW50LnByZXNlbmNlKSB7XG4gICAgICAgICAgICBlbGVtLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEdyb3VwQnlGaWx0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcigpIHtcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29sbGVjdGlvbiwga2V5KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjb2xsZWN0aW9uW2ldW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cEJ5RmlsdGVyID0gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0JywgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0R3JvdXAnLCBPcmdDaGFydEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEdyb3VwVGl0bGUnLCBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0TGlzdCcsIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQZXJzb25hJywgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEltYWdlJywgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmVzZW5jZScsIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0RGV0YWlscycsIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRQcmltYXJ5VGV4dCcsIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dCcsIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmZpbHRlcigndWlmT3JnQ2hhcnRHcm91cEJ5JywgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0RGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3JnQ2hhcnRQcmVzZW5jZUVudW0pIHtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImF2YWlsYWJsZVwiXSA9IDBdID0gXCJhdmFpbGFibGVcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImJ1c3lcIl0gPSAxXSA9IFwiYnVzeVwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYXdheVwiXSA9IDJdID0gXCJhd2F5XCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJibG9ja2VkXCJdID0gM10gPSBcImJsb2NrZWRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImRuZFwiXSA9IDRdID0gXCJkbmRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcIm9mZmxpbmVcIl0gPSA1XSA9IFwib2ZmbGluZVwiO1xufSkoZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRW51bSB8fCAoZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRQcmVzZW5jZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0UHJlc2VuY2VFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoT3JnQ2hhcnRTdHlsZUVudW0pIHtcbiAgICBPcmdDaGFydFN0eWxlRW51bVtPcmdDaGFydFN0eWxlRW51bVtcInN0YW5kYXJkXCJdID0gMF0gPSBcInN0YW5kYXJkXCI7XG4gICAgT3JnQ2hhcnRTdHlsZUVudW1bT3JnQ2hhcnRTdHlsZUVudW1bXCJzcXVhcmVcIl0gPSAxXSA9IFwic3F1YXJlXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtIHx8IChleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtID0ge30pKTtcbnZhciBPcmdDaGFydFN0eWxlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTdHlsZUVudW07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uIChPcmdDaGFydFNlbGVjdE1vZGVFbnVtKSB7XG4gICAgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtPcmdDaGFydFNlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMF0gPSBcInNpbmdsZVwiO1xuICAgIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMV0gPSBcIm11bHRpcGxlXCI7XG59KShleHBvcnRzLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IHt9KSk7XG52YXIgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFNlbGVjdE1vZGVFbnVtLnRzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHBlcnNvbmFTdHlsZUVudW1fMSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvcGVyc29uYVN0eWxlRW51bScpO1xudmFyIHNpemVFbnVtXzEgPSByZXF1aXJlKCcuLi9wZXJzb25hL3NpemVFbnVtJyk7XG52YXIgaWNvbkVudW1fMSA9IHJlcXVpcmUoJy4uL2ljb24vaWNvbkVudW0nKTtcbnZhciBwZW9wbGVTZWFyY2hFdmVudE5hbWUgPSAndWlmLXBlb3BsZS1zZWFyY2gnO1xudmFyIEdyb3VwZWRQZW9wbGVEYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm91cGVkUGVvcGxlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5wZW9wbGUgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIEdyb3VwZWRQZW9wbGVEYXRhO1xufSgpKTtcbmV4cG9ydHMuR3JvdXBlZFBlb3BsZURhdGEgPSBHcm91cGVkUGVvcGxlRGF0YTtcbnZhciBQZW9wbGVQaWNrZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJDb250cm9sbGVyKCRzY29wZSwgJGZpbHRlciwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGZpbHRlciA9ICRmaWx0ZXI7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRQZXJzb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRQZXJzb25zO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucGlja2VyVHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLiRzY29wZS50eXBlO1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUudHlwZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnNlYXJjaFF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYmluZFBlb3BsZSh0aGlzLiRzY29wZS5zZWFyY2hRdWVyeSk7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QocGVvcGxlU2VhcmNoRXZlbnROYW1lLCB0aGlzLnNlYXJjaFF1ZXJ5KCkpO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuYmluZFBlb3BsZSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IHRoaXMuJHNjb3BlLnBlb3BsZUNhbGxiYWNrKCkocXVlcnkpO1xuICAgICAgICBwZW9wbGVEYXRhID0gcGVvcGxlRGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKHBlb3BsZURhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuZ3JvdXBzID0gdGhpcy5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlKHBlb3BsZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwZW9wbGVEYXRhLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hNb3JlQ3RybF8xID0gYW5ndWxhci5lbGVtZW50KHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpXG4gICAgICAgICAgICAgICAgLmNvbnRyb2xsZXIoXCJcIiArIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoTW9yZUN0cmxfMSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGhhdF8xID0gdGhpcztcbiAgICAgICAgICAgIHBlb3BsZURhdGFcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoYXRfMS4kc2NvcGUuZ3JvdXBzID0gX3RoaXMuY3JlYXRlUGVvcGxlRGF0YVN0cnVjdHVyZShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hNb3JlQ3RybF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlID0gZnVuY3Rpb24gKHBlb3BsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IFtdO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gocGVvcGxlLCBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdHcm91cHMgPSBfdGhpcy4kZmlsdGVyKCdmaWx0ZXInKShwZW9wbGVEYXRhLCB7IGdyb3VwOiBwZXJzb24uZ3JvdXAgfSk7XG4gICAgICAgICAgICB2YXIgaGFzR3JvdXAgPSBleGlzdGluZ0dyb3Vwcy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICBpZiAoIWhhc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Blb3BsZURhdGEgPSBuZXcgR3JvdXBlZFBlb3BsZURhdGEoKTtcbiAgICAgICAgICAgICAgICBuZXdQZW9wbGVEYXRhLmdyb3VwID0gcGVyc29uLmdyb3VwO1xuICAgICAgICAgICAgICAgIG5ld1Blb3BsZURhdGEucGVvcGxlLnB1c2gocGVyc29uKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVEYXRhLnB1c2gobmV3UGVvcGxlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdEYXRhID0gZXhpc3RpbmdHcm91cHNbMF07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEYXRhLnBlb3BsZS5wdXNoKHBlcnNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGVvcGxlRGF0YTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRmaWx0ZXInLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlckNvbnRyb2xsZXIgPSBQZW9wbGVQaWNrZXJDb250cm9sbGVyO1xudmFyIFBlb3BsZVBpY2tlclR5cGVzO1xuKGZ1bmN0aW9uIChQZW9wbGVQaWNrZXJUeXBlcykge1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZ3JvdXBlZFwiXSA9IDBdID0gXCJncm91cGVkXCI7XG4gICAgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbXCJjb21wYWN0XCJdID0gMV0gPSBcImNvbXBhY3RcIjtcbiAgICBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1tcIm1lbWJlckxpc3RcIl0gPSAyXSA9IFwibWVtYmVyTGlzdFwiO1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiZmFjZVBpbGVcIl0gPSAzXSA9IFwiZmFjZVBpbGVcIjtcbn0pKFBlb3BsZVBpY2tlclR5cGVzIHx8IChQZW9wbGVQaWNrZXJUeXBlcyA9IHt9KSk7XG52YXIgUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ25nTW9kZWwnLCAoXCJcIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKV07XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlb3BsZVBpY2tlckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBkZWxheTogJ0B1aWZTZWFyY2hEZWxheScsXG4gICAgICAgICAgICBmYWNlUGlsZUhlYWRlcjogJ0A/dWlmRmFjZXBpbGVIZWFkZXInLFxuICAgICAgICAgICAgbmdEaXNhYmxlZDogJz0/JyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG9uU2VsZWN0ZWRQZXJzb25DbGljazogJyY/dWlmU2VsZWN0ZWRQZXJzb25DbGljaycsXG4gICAgICAgICAgICBwZW9wbGVDYWxsYmFjazogJyZ1aWZQZW9wbGUnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAPycsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoUGVvcGxlUGlja2VyVHlwZXNbdHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlb3BsZXBpY2tlciAtIHVuc3VwcG9ydGVkIHBlb3BsZSBwaWNrZXIgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgcGVvcGxlIHBpY2tlci4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgUGVvcGxlUGlja2VyVHlwZXMgZW51bSBoZXJlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvcGVvcGxlcGlja2VyL3Blb3BsZVBpY2tlckRpcmVjdGl2ZS50cycpO1xuICAgICAgICAgICAgICAgIHRocm93ICdbbmdPZmZpY2VVaUZhYnJpY10gLSBFcnJvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIG5nTW9kZWxDdHJsID0gY3RybHNbMF07XG4gICAgICAgICAgICB2YXIgcGVvcGxlUGlja2VyQ3RybCA9IGN0cmxzWzFdO1xuICAgICAgICAgICAgX3RoaXMuaW5pdERpc2FibGVkU3RhdGUoJGVsZW1lbnQsICRzY29wZSwgJGF0dHJzKTtcbiAgICAgICAgICAgICRzY29wZS5mYWNlUGlsZUhlYWRlciA9ICRzY29wZS5mYWNlUGlsZUhlYWRlciB8fCAnU3VnZ2VzdGVkIGNvbnRhY3RzJztcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKCdzZWxlY3RlZFBlcnNvbnMnLCBmdW5jdGlvbiAoZGF0YSwgZGF0YTIsIGRhdGEzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzaXplU2VhcmNoRmllbGQoJGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMgPSBuZ01vZGVsQ3RybC4kdmlld1ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNpemVTZWFyY2hGaWVsZCgkZWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgIHZhciBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICRzY29wZS5vblNlYXJjaEtleVVwID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VhcmNoTW9yZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUnKSk7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWFyY2hNb3JlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VhcmNoUXVlcnkgPyAkZWxlbWVudC5hZGRDbGFzcygnaXMtc2VhcmNoaW5nJykgOiAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VhcmNoaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWFyY2hRdWVyeSA/ICRzZWFyY2hNb3JlLmFkZENsYXNzKCdpcy1hY3RpdmUnKSA6ICRzZWFyY2hNb3JlLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVNlbGVjdGVkUGVvcGxlKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuZGVsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0LmNhbmNlbChzZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VhcmNoVGltZW91dCA9IF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LCAkc2NvcGUuZGVsYXkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vblBlb3BsZVBpY2tlckFjdGl2ZSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zbW9vdGhTY3JvbGxUbygkZWxlbWVudFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS50eXBlICE9PSBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItcmVzdWx0cycpKTtcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHNbMF0uc3R5bGUud2lkdGggPSAkZWxlbWVudFswXS5jbGllbnRXaWR0aCAtIDIgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkc2NvcGUudHlwZSA9PT0gUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVTZWxlY3RlZFBlb3BsZSgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLmFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RlZFBlcnNvbnMuaW5kZXhPZihwZXJzb24pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMucHVzaChwZXJzb24pO1xuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJHNjb3BlLnNlbGVjdGVkUGVyc29ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLnJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZSA9IGZ1bmN0aW9uIChwZXJzb24sICRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmR4ID0gJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5pbmRleE9mKHBlcnNvbik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5zcGxpY2UoaW5keCwgMSk7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSgkc2NvcGUuc2VsZWN0ZWRQZXJzb25zKTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLnJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzID0gZnVuY3Rpb24gKHBlb3BsZSwgcGVyc29uLCAkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIGluZHggPSBwZW9wbGUuaW5kZXhPZihwZXJzb24pO1xuICAgICAgICAgICAgICAgIHBlb3BsZS5zcGxpY2UoaW5keCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3RoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICgkc2NvcGUudHlwZSA9PT0gUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdKSB7XG4gICAgICAgICAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmluc2VydEZhY2VQaWxlSGVhZGVyKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zZXJ0RmFjZVBpbGVTZWFyY2hNb3JlKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmdyb3VwZWRdID1cbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlcnNvbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtaW1hZ2UtdXJsPVxcXCJ7e3BlcnNvbi5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlKHBlcnNvbiwgJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hUmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7e3BsYWNlaG9sZGVyfX1cXFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcInNlYXJjaFF1ZXJ5XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwVGl0bGVcXFwiPnt7Z3JvdXBEYXRhLmdyb3VwLm5hbWV9fTwvZGl2PlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsb3NlLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VhcmNoUmVzdWx0c1xcXCJcXG4gICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmVdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUubWVkaXVtXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuY29tcGFjdF0gPVxuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXIgbXMtUGVvcGxlUGlja2VyLS1jb21wYWN0XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlcnNvbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtaW1hZ2UtdXJsPVxcXCJ7e3BlcnNvbi5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlKHBlcnNvbiwgJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hUmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwVGl0bGVcXFwiPnt7Z3JvdXBEYXRhLmdyb3VwLm5hbWV9fTwvZGl2PlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1waWNrZXItdHlwZT1cXFwiXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5tZW1iZXJMaXN0XSA9IFwiXFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyIG1zLVBlb3BsZVBpY2tlci0tbWVtYmVyc0xpc3RcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7e3BsYWNlaG9sZGVyfX1cXFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcInNlYXJjaFF1ZXJ5XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0ucm91bmRdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUubWVkaXVtXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkIG5nLW1vZGVsPVxcXCJzZWxlY3RlZFBlcnNvbnNcXFwiXFxuICAgICAgICB1aWYtc2VsZWN0ZWQtcGVyc29uLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2U9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQ+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0gPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLUZhY2VwaWxlXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlb3BsZUxpc3RIZWFkZXJcXFwiPlxcbiAgICAgICAgICAgICAgPHNwYW4+e3tmYWNlUGlsZUhlYWRlcn19PC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3RcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJhZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlXFxcIlxcbiAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5yb3VuZF0gKyBcIlxcXCJcXG4gICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUuc21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtc2VhcmNoLW1vcmVcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQgbmctbW9kZWw9XFxcInNlbGVjdGVkUGVyc29uc1xcXCJcXG4gICAgICAgIHVpZi1zZWxlY3RlZC1wZXJzb24tY2xpY2s9XFxcIm9uU2VsZWN0ZWRQZXJzb25DbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbG9zZT1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWlmLXBlb3BsZS1oZWFkZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgPC91aWYtcGVvcGxlLXBpY2tlci1zZWxlY3RlZD5cXG5cXG4gICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdyk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckZG9jdW1lbnQnLCAnJHRpbWVvdXQnLCAnJGxvZycsICckd2luZG93J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmluaXREaXNhYmxlZFN0YXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkc2NvcGUsICRhdHRycykge1xuICAgICAgICB2YXIgJHNlYXJjaEZpZWxkID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgICRhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzZWFyY2hGaWVsZC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNlYXJjaEZpZWxkLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5hbmltYXRlU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRzZWxlY3RlZFBlb3BsZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlJykpO1xuICAgICAgICAkc2VsZWN0ZWRQZW9wbGUuYWRkQ2xhc3MoJ21zLXUtc2xpZGVEb3duSW4yMCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgJHNlbGVjdGVkUGVvcGxlLnJlbW92ZUNsYXNzKCdtcy11LXNsaWRlRG93bkluMjAnKTsgfSwgMTAwMCk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmN1cnJlbnRZUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQodGhpcy4kZG9jdW1lbnRbMF0pLmZpbmQoJ2JvZHknKVswXTtcbiAgICAgICAgaWYgKGJvZHkuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmVsbVlQb3NpdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciB5ID0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgIHZhciBub2RlID0gZWxlbWVudDtcbiAgICAgICAgd2hpbGUgKG5vZGUub2Zmc2V0UGFyZW50ICYmIG5vZGUub2Zmc2V0UGFyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBub2RlID0gKG5vZGUub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICAgIHkgKz0gbm9kZS5vZmZzZXRUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnNtb290aFNjcm9sbFRvID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHN0YXJ0WSA9IHRoaXMuY3VycmVudFlQb3NpdGlvbigpO1xuICAgICAgICB2YXIgc3RvcFkgPSB0aGlzLmVsbVlQb3NpdGlvbihlbGVtZW50KTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gc3RvcFkgPiBzdGFydFkgPyBzdG9wWSAtIHN0YXJ0WSA6IHN0YXJ0WSAtIHN0b3BZO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCAxMDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdG9wWSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNwZWVkID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDMwKTtcbiAgICAgICAgaWYgKHNwZWVkID49IDIwKSB7XG4gICAgICAgICAgICBzcGVlZCA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGVwID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDI1KTtcbiAgICAgICAgdmFyIGxlYXBZID0gc3RvcFkgPiBzdGFydFkgPyBzdGFydFkgKyBzdGVwIDogc3RhcnRZIC0gc3RlcDtcbiAgICAgICAgdmFyIHRpbWVyID0gMDtcbiAgICAgICAgaWYgKHN0b3BZID4gc3RhcnRZKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRZOyBpIDwgc3RvcFk7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiAobFksIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbFkpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0ICogc3BlZWQpO1xuICAgICAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICAgICAgbGVhcFkgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAobGVhcFkgPiBzdG9wWSkge1xuICAgICAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydFk7IGkgPiBzdG9wWTsgaSAtPSBzdGVwKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKGxZLCB0KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBsWSk7XG4gICAgICAgICAgICAgICAgfSwgdCAqIHNwZWVkKTtcbiAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICBsZWFwWSAtPSBzdGVwO1xuICAgICAgICAgICAgaWYgKGxlYXBZIDwgc3RvcFkpIHtcbiAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXIrKztcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZUhlYWRlciA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXBlb3BsZS1oZWFkZXInKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRDb3VudCcpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZVNlYXJjaE1vcmUgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1zZWFyY2gtbW9yZScpKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ21zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnJlc2l6ZVNlYXJjaEZpZWxkID0gZnVuY3Rpb24gKCRwZW9wbGVQaWNrZXIpIHtcbiAgICAgICAgdmFyICRzZWFyY2hCb3ggPSBhbmd1bGFyLmVsZW1lbnQoJHBlb3BsZVBpY2tlclswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveCcpKTtcbiAgICAgICAgdmFyICRzZWFyY2hGaWVsZCA9IGFuZ3VsYXIuZWxlbWVudCgkcGVvcGxlUGlja2VyWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgIHZhciBzZWFyY2hCb3hMZWZ0RWRnZSA9ICRzZWFyY2hCb3gucHJvcCgnb2Zmc2V0TGVmdCcpO1xuICAgICAgICB2YXIgc2VhcmNoQm94V2lkdGggPSAkc2VhcmNoQm94WzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgc2VhcmNoQm94UmlnaHRFZGdlID0gc2VhcmNoQm94TGVmdEVkZ2UgKyBzZWFyY2hCb3hXaWR0aDtcbiAgICAgICAgdmFyICRwZXJzb25hTm9kZXMgPSAkc2VhcmNoQm94WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1QZW9wbGVQaWNrZXItcGVyc29uYScpO1xuICAgICAgICBpZiAoJHBlcnNvbmFOb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRzZWFyY2hGaWVsZFswXS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGxhc3RQZXJzb25hID0gYW5ndWxhci5lbGVtZW50KCRwZXJzb25hTm9kZXNbJHBlcnNvbmFOb2Rlcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYUxlZnRFZGdlID0gJGxhc3RQZXJzb25hLnByb3AoJ29mZnNldExlZnQnKTtcbiAgICAgICAgdmFyIGxhc3RQZXJzb25hV2lkdGggPSAkbGFzdFBlcnNvbmFbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYVJpZ2h0RWRnZSA9IGxhc3RQZXJzb25hTGVmdEVkZ2UgKyBsYXN0UGVyc29uYVdpZHRoO1xuICAgICAgICB2YXIgbmV3RmllbGRXaWR0aCA9IHNlYXJjaEJveFJpZ2h0RWRnZSAtIGxhc3RQZXJzb25hUmlnaHRFZGdlIC0gNTtcbiAgICAgICAgaWYgKG5ld0ZpZWxkV2lkdGggPCAxMDApIHtcbiAgICAgICAgICAgIG5ld0ZpZWxkV2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSBuZXdGaWVsZFdpZHRoICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyJztcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gUGVvcGxlUGlja2VyRGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPHVsIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0TGlzdFxcXCI+XFxuICAgIDxsaSBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdFxcXCIgbmctcmVwZWF0PVxcXCJwZXJzb24gaW4gcGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QnRuXFxcIlxcbiAgICAgIG5nLWNsYXNzPVxcXCJ7J21zLVBlb3BsZVBpY2tlci1yZXN1bHRCdG4tLWNvbXBhY3QnOiBwaWNrZXJUeXBlID09PSAnY29tcGFjdCd9XFxcIiBuZy1jbGljaz1cXFwib25QZXJzb25DbGljaygpKHBlcnNvbilcXFwiPlxcbiAgICAgICAgPHVpZi1wZXJzb25hXFxuICAgICAgICAgIHVpZi1zdHlsZT1cXFwie3twZXJzb25TdHlsZX19XFxcIlxcbiAgICAgICAgICB1aWYtc2l6ZT1cXFwie3twZXJzb25TaXplfX1cXFwiXFxuICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3twZXJzb24uY29sb3J9fVxcXCI+e3twZXJzb24uaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICA8YnV0dG9uXFxuICAgICAgICAgIG5nLWlmPVxcXCIhcGVyc29uLmFkZGl0aW9uYWxEYXRhICYmIG9uUGVyc29uQ2xvc2VDbGljaygpXFxcIlxcbiAgICAgICAgICBuZy1jbGljaz1cXFwib25QZXJzb25DbG9zZUNsaWNrKCkocGVvcGxlLCBwZXJzb24sICRldmVudClcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWN0aW9uIGpzLXJlc3VsdFJlbW92ZVxcXCI+XFxuICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICBuZy1pZj1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIlxcbiAgICAgICAgICBuZy1jbGljaz1cXFwiZXhwYW5kQWRkaXRpb25hbERhdGEoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBY3Rpb24ganMtcmVzdWx0UmVtb3ZlXFxcIj5cXG4gICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5jaGV2cm9uc0Rvd25dICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IG5nLWlmPVxcXCJwZXJzb24uYWRkaXRpb25hbERhdGFcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWRkaXRpb25hbENvbnRlbnRcXFwiPlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICBuZy1tb2RlbD1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwib25QZXJzb25DbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbG9zZS1jbGljaz1cXFwib25QZXJzb25DbG9zZUNsaWNrKClcXFwiXFxuICAgICAgICB1aWYtcGlja2VyLXR5cGU9XFxcInt7cGlja2VyVHlwZX19XFxcIlxcbiAgICAgICAgdWlmLXN0eWxlPVxcXCJ7e3BlcnNvblN0eWxlfX1cXFwiXFxuICAgICAgICB1aWYtc2l6ZT1cXFwie3twZXJzb25TaXplfX1cXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvbGk+XFxuICA8L3VsPlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25QZXJzb25DbGljazogJyZ1aWZQZXJzb25DbGljaycsXG4gICAgICAgICAgICBvblBlcnNvbkNsb3NlQ2xpY2s6ICcmdWlmUGVyc29uQ2xvc2VDbGljaycsXG4gICAgICAgICAgICBwZW9wbGU6ICc9bmdNb2RlbCcsXG4gICAgICAgICAgICBwZXJzb25TaXplOiAnQHVpZlNpemUnLFxuICAgICAgICAgICAgcGVyc29uU3R5bGU6ICdAdWlmU3R5bGUnLFxuICAgICAgICAgICAgcGlja2VyVHlwZTogJ0B1aWZQaWNrZXJUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLmV4cGFuZEFkZGl0aW9uYWxEYXRhID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkYnV0dG9uLnBhcmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnbXMtUGVvcGxlUGlja2VyLXJlc3VsdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnRvZ2dsZUNsYXNzKCdpcy1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbiA9ICRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZQZW9wbGVQaWNrZXJSZXN1bHRMaXN0JztcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUgPSBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlO1xudmFyIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2VhcmNoQ2FsbGJhY2tzID0gW107XG4gICAgfVxuICAgIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyLnByb3RvdHlwZS5pc1NlYXJjaGluZyA9IGZ1bmN0aW9uIChzZWFyY2hpbmcpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUucHJvY2Vzc2luZyA9IHNlYXJjaGluZztcbiAgICAgICAgc2VhcmNoaW5nID8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtc2VhcmNoaW5nJykgOiB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWFyY2hpbmcnKTtcbiAgICB9O1xuICAgIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuICAgIHJldHVybiBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnRzLlBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyID0gUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXI7XG52YXIgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlIGpzLXNlYXJjaE1vcmVcXFwiXFxuICAgIG5nLWNsYXNzPVxcXCJ7J21zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlLS1kaXNjb25uZWN0ZWQnOiBkaXNjb25uZWN0ZWR9XFxcIj5cXG4gICAgPGJ1dHRvbiBuZy1pZj1cXFwicGlja2VyVHlwZSA9PT0gJ1wiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJwaWNrZXJUeXBlID09PSAnXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInBpY2tlclR5cGUgPT09ICdcIiArIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPHVpZi1zcGlubmVyIG5nLXNob3c9XFxcInByb2Nlc3NpbmdcXFwiPjwvdWlmLXNwaW5uZXI+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGRpc2Nvbm5lY3RlZDogJz11aWZEaXNjb25uZWN0ZWQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBlb3BsZVBpY2tlckN0cmwsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUucGlja2VyVHlwZSA9IHBlb3BsZVBpY2tlckN0cmwucGlja2VyVHlwZSgpO1xuICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYnJvYWRjYXN0KHBlb3BsZVNlYXJjaEV2ZW50TmFtZSwgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2hRdWVyeSgpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlU2VhcmNoTW9yZSc7XG4gICAgcmV0dXJuIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlID0gUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZTtcbnZhciBQcmltYXJ5VGV4dENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByaW1hcnlUZXh0Q29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihwZW9wbGVTZWFyY2hFdmVudE5hbWUsIGZ1bmN0aW9uICgkZXZlbnQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICBfdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnkgPSBxdWVyeTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaW1hcnlUZXh0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbiAgICByZXR1cm4gUHJpbWFyeVRleHRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuUHJpbWFyeVRleHRDb250cm9sbGVyID0gUHJpbWFyeVRleHRDb250cm9sbGVyO1xudmFyIFByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyhcIl5eXCIgKyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpLCAoXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpXTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUHJpbWFyeVRleHRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5kaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZVByaW1hcnlcXFwiPlxcbiAgICA8ZGl2IG5nLXNob3c9XFxcIiRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj57e3NlYXJjaGluZ0ZvclRleHR9fSB7e3NlYXJjaFF1ZXJ5fX08L2Rpdj5cXG4gICAgPG5nLXRyYW5zY2x1ZGUgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaGluZ0ZvclRleHQ6ICdAP3VpZlNlYXJjaEZvclRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaGluZ0ZvclRleHQgPSAkc2NvcGUuc2VhcmNoaW5nRm9yVGV4dCB8fCAnU2VhcmNoaW5nIGZvcic7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFByaW1hcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUHJpbWFyeVRleHQnO1xuICAgIHJldHVybiBQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlByaW1hcnlUZXh0RGlyZWN0aXZlID0gUHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQuZGlzY29ubmVjdGVkXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVTZWNvbmRhcnlcXFwiPlxcbiAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRydWU7XG4gICAgfVxuICAgIFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmU2Vjb25kYXJ5VGV4dCc7XG4gICAgcmV0dXJuIFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5TZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiJHBhcmVudC4kcGFyZW50LmRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlUHJpbWFyeVxcXCI+XFxuICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICB9XG4gICAgRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZEaXNjb25uZWN0ZWRUZXh0JztcbiAgICByZXR1cm4gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUgPSBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtYWN0aXZlJzogc2VsZWN0ZWRQZW9wbGUgJiYgc2VsZWN0ZWRQZW9wbGUubGVuZ3RoID4gMH1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkSGVhZGVyXFxcIj5cXG4gICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDx1bCBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGxpIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRQZXJzb25cXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnJvdW5kXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZSgpKHBlcnNvbiwgJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBY3Rpb24ganMtcmVzdWx0UmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgPC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25TZWxlY3RlZFBlcnNvbkNsaWNrOiAnJj91aWZTZWxlY3RlZFBlcnNvbkNsaWNrJyxcbiAgICAgICAgICAgIHJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZTogJyZ1aWZQZXJzb25DbG9zZScsXG4gICAgICAgICAgICBzZWxlY3RlZFBlb3BsZTogJz1uZ01vZGVsJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlBlb3BsZVBpY2tlclNlbGVjdGVkJztcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSA9IFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlO1xudmFyIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8c3BhbiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkQ291bnRcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlwiO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IHBlb3BsZVBpY2tlckN0cmwuZ2V0U2VsZWN0ZWRQZXJzb25zKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmU2VsZWN0ZWRQZW9wbGVIZWFkZXInO1xuICAgIHJldHVybiBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlID0gU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZW9wbGVwaWNrZXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUHJpbWFyeVRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvcGVvcGxlcGlja2VyL3Blb3BsZVBpY2tlckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9