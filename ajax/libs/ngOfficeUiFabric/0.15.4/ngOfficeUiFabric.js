/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * AngularJS (v1.6.x+) directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.15.4
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PersonaStyleEnum;
(function (PersonaStyleEnum) {
    PersonaStyleEnum[PersonaStyleEnum["round"] = 0] = "round";
    PersonaStyleEnum[PersonaStyleEnum["square"] = 1] = "square";
})(PersonaStyleEnum = exports.PersonaStyleEnum || (exports.PersonaStyleEnum = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
    return ContextualMenuItemDirective;
}());
ContextualMenuItemDirective.directiveName = 'uifContextualMenuItem';
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
    return ContextualMenuItemController;
}());
ContextualMenuItemController.$inject = ['$scope', '$element'];
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
    return ContextualMenuDirective;
}());
ContextualMenuDirective.directiveName = 'uifContextualMenu';
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
    return ContextualMenuController;
}());
ContextualMenuController.$inject = ['$scope', '$animate', '$element', '$log'];
exports.ContextualMenuController = ContextualMenuController;
exports.module = angular.module('officeuifabric.components.contextualmenu', [
    'officeuifabric.components'
])
    .directive(ContextualMenuDirective.directiveName, ContextualMenuDirective.factory())
    .directive(ContextualMenuItemDirective.directiveName, ContextualMenuItemDirective.factory());


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IconEnum;
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
})(IconEnum = exports.IconEnum || (exports.IconEnum = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PersonaSize;
(function (PersonaSize) {
    PersonaSize[PersonaSize["tiny"] = 0] = "tiny";
    PersonaSize[PersonaSize["xsmall"] = 1] = "xsmall";
    PersonaSize[PersonaSize["small"] = 2] = "small";
    PersonaSize[PersonaSize["medium"] = 3] = "medium";
    PersonaSize[PersonaSize["large"] = 4] = "large";
    PersonaSize[PersonaSize["xlarge"] = 5] = "xlarge";
})(PersonaSize = exports.PersonaSize || (exports.PersonaSize = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PresenceEnum;
(function (PresenceEnum) {
    PresenceEnum[PresenceEnum["available"] = 0] = "available";
    PresenceEnum[PresenceEnum["away"] = 1] = "away";
    PresenceEnum[PresenceEnum["blocked"] = 2] = "blocked";
    PresenceEnum[PresenceEnum["busy"] = 3] = "busy";
    PresenceEnum[PresenceEnum["dnd"] = 4] = "dnd";
    PresenceEnum[PresenceEnum["offline"] = 5] = "offline";
})(PresenceEnum = exports.PresenceEnum || (exports.PresenceEnum = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var breadcrumbModule = __webpack_require__(8);
var buttonModule = __webpack_require__(9);
var calloutModule = __webpack_require__(13);
var choicefieldModule = __webpack_require__(15);
var commandBarModule = __webpack_require__(17);
var contentModule = __webpack_require__(18);
var contextualMenuModule = __webpack_require__(2);
var datepickerModule = __webpack_require__(19);
var dialogModule = __webpack_require__(20);
var dropdownModule = __webpack_require__(22);
var facepileModule = __webpack_require__(23);
var iconModule = __webpack_require__(24);
var labelModule = __webpack_require__(25);
var linkModule = __webpack_require__(26);
var listModule = __webpack_require__(27);
var messageBannerModule = __webpack_require__(31);
var messageBarModule = __webpack_require__(32);
var navBarModule = __webpack_require__(34);
var orgChartModule = __webpack_require__(35);
var overlayModule = __webpack_require__(39);
var panelModule = __webpack_require__(41);
var peoplePickerModule = __webpack_require__(43);
var personacardModule = __webpack_require__(45);
var personaModule = __webpack_require__(44);
var pivotModule = __webpack_require__(48);
var progressIndicatorModule = __webpack_require__(51);
var searchboxModule = __webpack_require__(52);
var spinnerModule = __webpack_require__(53);
var tableModule = __webpack_require__(55);
var textFieldModule = __webpack_require__(58);
var toggleModule = __webpack_require__(60);
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
    orgChartModule.module.name,
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
    toggleModule.module.name
]);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
exports.module = angular.module('officeuifabric.core', []);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
    return BreadcrumbController;
}());
BreadcrumbController.$inject = ['$scope', '$document', '$window'];
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var buttonTypeEnum_1 = __webpack_require__(11);
var buttonTemplateType_1 = __webpack_require__(10);
var ButtonController = (function () {
    function ButtonController($log) {
        this.$log = $log;
    }
    return ButtonController;
}());
ButtonController.$inject = ['$log'];
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
        var _this = this;
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
                        if (_this._isValidLabel(clone[i])) {
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
                        if (clone[i].tagName === 'UIF-ICON') {
                            continue;
                        }
                        if (_this._isValidLabel(clone[i])) {
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
                        if (_this._isValidLabel(clone[i])) {
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
    ButtonDirective.prototype._isValidLabel = function (clone) {
        return clone.nodeType === Node.TEXT_NODE && clone.nodeValue.trim().length > 0;
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ButtonTemplateType;
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
})(ButtonTemplateType = exports.ButtonTemplateType || (exports.ButtonTemplateType = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ButtonTypeEnum;
(function (ButtonTypeEnum) {
    ButtonTypeEnum[ButtonTypeEnum["primary"] = 0] = "primary";
    ButtonTypeEnum[ButtonTypeEnum["command"] = 1] = "command";
    ButtonTypeEnum[ButtonTypeEnum["compound"] = 2] = "compound";
    ButtonTypeEnum[ButtonTypeEnum["hero"] = 3] = "hero";
})(ButtonTypeEnum = exports.ButtonTypeEnum || (exports.ButtonTypeEnum = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CalloutArrow;
(function (CalloutArrow) {
    CalloutArrow[CalloutArrow["left"] = 0] = "left";
    CalloutArrow[CalloutArrow["right"] = 1] = "right";
    CalloutArrow[CalloutArrow["top"] = 2] = "top";
    CalloutArrow[CalloutArrow["bottom"] = 3] = "bottom";
})(CalloutArrow = exports.CalloutArrow || (exports.CalloutArrow = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var calloutTypeEnum_1 = __webpack_require__(14);
var calloutArrowEnum_1 = __webpack_require__(12);
var CalloutController = (function () {
    function CalloutController($scope, $log) {
        this.$scope = $scope;
        this.$log = $log;
    }
    return CalloutController;
}());
CalloutController.$inject = ['$scope', '$log'];
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
        this.template = '<div class="ms-Callout" ' +
            'ng-class="getCalloutClasses()"> ' +
            '<div class="ms-Callout-main"><div class="ms-Callout-inner" ng-transclude></div></div></div>';
        this.require = ['uifCallout'];
        this.scope = {
            ngShow: '=?',
            uifType: '@'
        };
        this.controller = CalloutController;
        this.uifArrowClasses = (_a = {},
            _a[calloutArrowEnum_1.CalloutArrow.bottom] = 'ms-Callout--arrowBottom',
            _a[calloutArrowEnum_1.CalloutArrow.left] = 'ms-Callout--arrowLeft',
            _a[calloutArrowEnum_1.CalloutArrow.right] = 'ms-Callout--arrowRight',
            _a[calloutArrowEnum_1.CalloutArrow.top] = 'ms-Callout--arrowTop',
            _a);
        this.uifTypeClasses = (_b = {},
            _b[calloutTypeEnum_1.CalloutType.oobe] = 'ms-Callout--OOBE',
            _b[calloutTypeEnum_1.CalloutType.peek] = 'ms-Callout--Peek',
            _b);
        var _a, _b;
    }
    CalloutDirective.factory = function () {
        var directive = function () { return new CalloutDirective(); };
        return directive;
    };
    CalloutDirective.prototype.link = function (scope, instanceElement, attrs, ctrls) {
        var _this = this;
        var calloutController = ctrls[0];
        attrs.$observe('uifType', function (calloutType) {
            if (angular.isUndefined(calloutTypeEnum_1.CalloutType[calloutType])) {
                calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
                    calloutType + '" is not a valid value for uifType. It should be oobe or peek');
            }
        });
        attrs.$observe('uifArrow', function (attrArrowDirection) {
            if (angular.isDefined(attrArrowDirection) && angular.isUndefined(calloutArrowEnum_1.CalloutArrow[attrArrowDirection])) {
                calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
                    attrArrowDirection + '" is not a valid value for uifArrow. It should be left, right, top, bottom.');
                return;
            }
            scope.arrowDirection = attrArrowDirection;
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
            if (!newValue && angular.isUndefined(attrs.uifClose)) {
                scope.ngShow = scope.isMouseOver;
            }
            else {
                scope.ngShow = newValue;
            }
        });
        scope.$watch('isMouseOver', function (newVal, oldVal) {
            if (!newVal && oldVal) {
                if (!scope.closeButton) {
                    scope.ngShow = false;
                }
            }
        });
        scope.getCalloutClasses = function () {
            var calloutClasses = [];
            var calloutType = calloutTypeEnum_1.CalloutType[scope.uifType];
            var calloutArrow = angular.isDefined(scope.arrowDirection) ? calloutArrowEnum_1.CalloutArrow[scope.arrowDirection] : undefined;
            if (angular.isDefined(calloutType)) {
                calloutClasses.push(_this.uifTypeClasses[calloutType]);
            }
            if (angular.isDefined(calloutArrow)) {
                calloutClasses.push(_this.uifArrowClasses[calloutArrow]);
            }
            if (scope.closeButton) {
                calloutClasses.push('ms-Callout--close');
            }
            if (scope.hasSeparator) {
                calloutClasses.push('ms-Callout--actionText');
            }
            return calloutClasses.join(' ');
        };
    };
    return CalloutDirective;
}());
exports.CalloutDirective = CalloutDirective;
exports.module = angular.module('officeuifabric.components.callout', ['officeuifabric.components'])
    .directive('uifCallout', CalloutDirective.factory())
    .directive('uifCalloutHeader', CalloutHeaderDirective.factory())
    .directive('uifCalloutContent', CalloutContentDirective.factory())
    .directive('uifCalloutActions', CalloutActionsDirective.factory());


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CalloutType;
(function (CalloutType) {
    CalloutType[CalloutType["oobe"] = 0] = "oobe";
    CalloutType[CalloutType["peek"] = 1] = "peek";
})(CalloutType = exports.CalloutType || (exports.CalloutType = {}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var choicefieldTypeEnum_1 = __webpack_require__(16);
var ChoicefieldOptionController = (function () {
    function ChoicefieldOptionController($log) {
        this.$log = $log;
    }
    return ChoicefieldOptionController;
}());
ChoicefieldOptionController.$inject = ['$log'];
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
        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
            if (this.getViewValue() !== value) {
                this.$scope.ngModel.$setDirty();
            }
            this.$scope.ngModel.$setViewValue(value, eventType);
            this.render();
        }
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
    return ChoicefieldGroupController;
}());
ChoicefieldGroupController.$inject = ['$element', '$scope'];
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


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChoicefieldType;
(function (ChoicefieldType) {
    ChoicefieldType[ChoicefieldType["radio"] = 0] = "radio";
    ChoicefieldType[ChoicefieldType["checkbox"] = 1] = "checkbox";
})(ChoicefieldType = exports.ChoicefieldType || (exports.ChoicefieldType = {}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
    return CommandBarMainController;
}());
CommandBarMainController.$inject = ['$scope', '$element', '$compile', '$timeout'];
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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
    return ContentDirective;
}());
ContentDirective.directiveName = 'uifContent';
exports.ContentDirective = ContentDirective;
exports.module = angular.module('officeuifabric.components.content', [
    'officeuifabric.components'
])
    .directive(ContentDirective.directiveName, ContentDirective.factory());


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
            var newDay = currentDate.date;
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
            var newDay = currentDate.date;
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
    return DatepickerController;
}());
DatepickerController.$inject = ['$element', '$scope'];
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


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var dialogEnums_1 = __webpack_require__(21);
var DialogController = (function () {
    function DialogController($log) {
        this.$log = $log;
    }
    return DialogController;
}());
DialogController.$inject = ['$log'];
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
    return DialogActionsController;
}());
DialogActionsController.$inject = ['$log'];
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


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DialogTypeEnum;
(function (DialogTypeEnum) {
    DialogTypeEnum[DialogTypeEnum["none"] = 0] = "none";
    DialogTypeEnum[DialogTypeEnum["header"] = 1] = "header";
    DialogTypeEnum[DialogTypeEnum["multiline"] = 2] = "multiline";
})(DialogTypeEnum = exports.DialogTypeEnum || (exports.DialogTypeEnum = {}));
var DialogActionsPositionEnum;
(function (DialogActionsPositionEnum) {
    DialogActionsPositionEnum[DialogActionsPositionEnum["none"] = 0] = "none";
    DialogActionsPositionEnum[DialogActionsPositionEnum["left"] = 1] = "left";
    DialogActionsPositionEnum[DialogActionsPositionEnum["right"] = 2] = "right";
})(DialogActionsPositionEnum = exports.DialogActionsPositionEnum || (exports.DialogActionsPositionEnum = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
                dropdownController.setViewValue(instanceElement.text(), attrs.value, ev);
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
                        self.$scope.selectedTitle = angular.element(option).text();
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
    return DropdownController;
}());
DropdownController.$inject = ['$element', '$scope', '$document'];
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


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
    return FacepileAddIconDirective;
}());
exports.FacepileAddIconDirective = FacepileAddIconDirective;
exports.module = angular.module('officeuifabric.components.facepile', [
    'officeuifabric.components'
])
    .directive('uifFacepile', FacepileDirective.factory())
    .directive('uifFacepileAddIcon', FacepileAddIconDirective.factory());


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var iconEnum_1 = __webpack_require__(3);
var IconController = (function () {
    function IconController($log) {
        this.$log = $log;
    }
    return IconController;
}());
IconController.$inject = ['$log'];
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
    return IconDirective;
}());
exports.IconDirective = IconDirective;
exports.module = angular.module('officeuifabric.components.icon', [
    'officeuifabric.components'
])
    .directive('uifIcon', IconDirective.factory());


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var LabelDirective = (function () {
    function LabelDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.replace = false;
        this.scope = {
            ngRequired: '<?'
        };
        this.template = '<label class="ms-Label"><ng-transclude/></label>';
    }
    LabelDirective.factory = function () {
        var directive = function () { return new LabelDirective(); };
        return directive;
    };
    LabelDirective.prototype.link = function (scope, instanceElement, attributes) {
        var label = instanceElement.find('label').eq(0);
        if (angular.isDefined(attributes.disabled)) {
            label.addClass('is-disabled');
        }
        if (angular.isDefined(attributes.required)) {
            label.addClass('is-required');
        }
        scope.$watch('ngRequired', function (newValue, oldValue) {
            if (newValue) {
                label.addClass('is-required');
            }
            else if (newValue !== undefined && !newValue) {
                label.removeClass('is-required');
            }
        });
    };
    return LabelDirective;
}());
exports.LabelDirective = LabelDirective;
exports.module = angular.module('officeuifabric.components.label', ['officeuifabric.components'])
    .directive('uifLabel', LabelDirective.factory());


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var listItemSelectModeEnum_1 = __webpack_require__(28);
var listItemTypeEnum_1 = __webpack_require__(29);
var listLayoutEnum_1 = __webpack_require__(30);
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
    return ListController;
}());
ListController.$inject = ['$scope', '$log'];
var ListDirective = (function () {
    function ListDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.replace = false;
        this.template = '<ul class="ms-List" ng-transclude></ul>';
        this.controller = ListController;
        this.controllerAs = 'list';
        this.scope = {
            selectedItems: '=?uifSelectedItems',
            uifItemSelectMode: '@?',
            uifLayout: '@?'
        };
    }
    ListDirective.factory = function () {
        var directive = function () { return new ListDirective(); };
        return directive;
    };
    ListDirective.prototype.link = function (scope, instanceElement, attrs, controller) {
        scope.$watch('uifLayout', function (newValue, oldValue) {
            if (newValue !== undefined && newValue !== null) {
                if (listLayoutEnum_1.ListLayoutEnum[newValue] === undefined) {
                    controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                        'The layout (\'' + newValue + '\') is not a valid option for \'uif-layout\'. ' +
                        'Supported options are listed here: ' +
                        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/list/listLayoutEnum.ts');
                }
                else {
                    scope.layout = newValue;
                }
            }
            if (scope.layout === undefined) {
                scope.layout = listLayoutEnum_1.ListLayoutEnum[listLayoutEnum_1.ListLayoutEnum.list];
            }
            if (scope.layout === listLayoutEnum_1.ListLayoutEnum[listLayoutEnum_1.ListLayoutEnum.grid]) {
                instanceElement.children().eq(0).addClass('ms-List--grid');
            }
            else {
                instanceElement.children().eq(0).removeClass('ms-List--grid');
            }
        });
        scope.$watch('uifItemSelectMode', function (newValue, oldValue) {
            if (newValue !== undefined && newValue !== null) {
                if (listItemSelectModeEnum_1.ListItemSelectModeEnum[newValue] === undefined) {
                    controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                        ' The selection mode (\'' + newValue + '\') is not a valid option for \'uif-item-select-mode\'. ' +
                        'Supported options are listed here: ' +
                        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/list/listItemSelectModeEnum.ts');
                }
                else {
                    scope.itemSelectMode = attrs.uifItemSelectMode;
                }
            }
            if (scope.itemSelectMode === undefined) {
                scope.itemSelectMode = listItemSelectModeEnum_1.ListItemSelectModeEnum[listItemSelectModeEnum_1.ListItemSelectModeEnum.none];
            }
            if (newValue !== oldValue) {
                for (var i = 0; i < controller.items.length; i++) {
                    controller.items[i].selected = false;
                }
                scope.$broadcast('list-item-select-mode-changed', newValue);
            }
        });
    };
    return ListDirective;
}());
exports.ListDirective = ListDirective;
var ListItemController = (function () {
    function ListItemController($scope, $log) {
        this.$scope = $scope;
        this.$log = $log;
    }
    return ListItemController;
}());
ListItemController.$inject = ['$scope', '$log'];
var ListItemDirective = (function () {
    function ListItemDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.replace = false;
        this.template = '<li class="ms-ListItem" ng-transclude></li>';
        this.require = '^uifList';
        this.scope = {
            item: '=uifItem',
            uifType: '@?'
        };
        this.controller = ListItemController;
    }
    ListItemDirective.factory = function () {
        var directive = function () { return new ListItemDirective(); };
        return directive;
    };
    ListItemDirective.prototype.link = function (scope, instanceElement, attrs, list) {
        if (attrs.uifSelected !== undefined && attrs.uifSelected !== null) {
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
        scope.$watch('uifType', function (newValue, oldValue) {
            if (newValue !== undefined && newValue !== null) {
                if (listItemTypeEnum_1.ListItemTypeEnum[newValue] === undefined) {
                    list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                        'The list item type (\'' + newValue + '\') is not a valid option for \'uif-type\'. ' +
                        'Supported options are listed here: ' +
                        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/list/listItemTypeEnum.ts');
                }
            }
            instanceElement.children().eq(0).removeClass('ms-ListItem--image');
            instanceElement.children().eq(0).removeClass('ms-ListItem--document');
            switch (listItemTypeEnum_1.ListItemTypeEnum[attrs.uifType]) {
                case listItemTypeEnum_1.ListItemTypeEnum.itemWithIcon:
                    instanceElement.children().eq(0).addClass('ms-ListItem--document');
                    break;
                case listItemTypeEnum_1.ListItemTypeEnum.itemWithImage:
                    instanceElement.children().eq(0).addClass('ms-ListItem--image');
                    break;
                default:
                    break;
            }
            scope.$evalAsync(function () {
                switch (listItemTypeEnum_1.ListItemTypeEnum[attrs.uifType]) {
                    case listItemTypeEnum_1.ListItemTypeEnum.itemWithIcon:
                        if (instanceElement.children().find('uif-list-item-icon').length === 0) {
                            list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                                'List item type `itemWithIcon` requires the `uif-list-item-icon` directive. Without this the icon will not appear.');
                        }
                        break;
                    case listItemTypeEnum_1.ListItemTypeEnum.itemWithImage:
                        if (instanceElement.children().find('uif-list-item-image').length === 0) {
                            list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                                'List item type `itemWithImage` requires the `uif-list-item-image` directive. Without this the image will not appear.');
                        }
                        break;
                    default:
                        break;
                }
            });
        });
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
            updateItemSelectionModeDecoration(list.itemSelectMode);
        }
        scope.$on('list-item-select-mode-changed', function (event, selectionMode) {
            updateItemSelectionModeDecoration(selectionMode);
        });
        function updateItemSelectionModeDecoration(selectionMode) {
            if (selectionMode === 'none') {
                instanceElement.children().eq(0).removeClass('is-selectable');
            }
            else if (!instanceElement.children().eq(0).hasClass('is-selectable')) {
                instanceElement.on('click', scope.itemClick);
                instanceElement.children().eq(0).addClass('is-selectable');
            }
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


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ListItemSelectModeEnum;
(function (ListItemSelectModeEnum) {
    ListItemSelectModeEnum[ListItemSelectModeEnum["none"] = 0] = "none";
    ListItemSelectModeEnum[ListItemSelectModeEnum["single"] = 1] = "single";
    ListItemSelectModeEnum[ListItemSelectModeEnum["multiple"] = 2] = "multiple";
})(ListItemSelectModeEnum = exports.ListItemSelectModeEnum || (exports.ListItemSelectModeEnum = {}));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ListItemTypeEnum;
(function (ListItemTypeEnum) {
    ListItemTypeEnum[ListItemTypeEnum["item"] = 0] = "item";
    ListItemTypeEnum[ListItemTypeEnum["itemWithImage"] = 1] = "itemWithImage";
    ListItemTypeEnum[ListItemTypeEnum["itemWithIcon"] = 2] = "itemWithIcon";
})(ListItemTypeEnum = exports.ListItemTypeEnum || (exports.ListItemTypeEnum = {}));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ListLayoutEnum;
(function (ListLayoutEnum) {
    ListLayoutEnum[ListLayoutEnum["list"] = 0] = "list";
    ListLayoutEnum[ListLayoutEnum["grid"] = 1] = "grid";
})(ListLayoutEnum = exports.ListLayoutEnum || (exports.ListLayoutEnum = {}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var MessageBannerController = (function () {
    function MessageBannerController($scope, $log, $window) {
        this.$scope = $scope;
        this.$log = $log;
        this.$window = $window;
    }
    return MessageBannerController;
}());
MessageBannerController.$inject = ['$scope', '$log', '$window'];
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
    MessageBannerDirective.prototype._toggleExpansion = function ($scope) {
        $scope.isExpanded = !$scope.isExpanded;
        $scope.$digest();
        this._messageBanner.toggleClass('is-expanded');
    };
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
    return MessageBannerDirective;
}());
exports.MessageBannerDirective = MessageBannerDirective;
exports.module = angular.module('officeuifabric.components.messagebanner', ['officeuifabric.components'])
    .directive('uifMessageBanner', MessageBannerDirective.factory());


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var messageBarTypeEnum_1 = __webpack_require__(33);
var MessageBarController = (function () {
    function MessageBarController($scope, $log) {
        this.$scope = $scope;
        this.$log = $log;
    }
    return MessageBarController;
}());
MessageBarController.$inject = ['$scope', '$log'];
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


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MessageBarTypeEnum;
(function (MessageBarTypeEnum) {
    MessageBarTypeEnum[MessageBarTypeEnum["error"] = 0] = "error";
    MessageBarTypeEnum[MessageBarTypeEnum["remove"] = 1] = "remove";
    MessageBarTypeEnum[MessageBarTypeEnum["severewarning"] = 2] = "severewarning";
    MessageBarTypeEnum[MessageBarTypeEnum["success"] = 3] = "success";
    MessageBarTypeEnum[MessageBarTypeEnum["warning"] = 4] = "warning";
})(MessageBarTypeEnum = exports.MessageBarTypeEnum || (exports.MessageBarTypeEnum = {}));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var contextualMenu_1 = __webpack_require__(2);
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
    return NavBarController;
}());
NavBarController.$inject = ['$scope', '$animate', '$element', '$log'];
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
        var directive = function ($log, $animate, $document) { return new NavBarDirective($log, $animate, $document); };
        directive.$inject = ['$log', '$animate', '$document'];
        return directive;
    };
    return NavBarDirective;
}());
NavBarDirective.directiveName = 'uifNavBar';
NavBarDirective.overlayValues = ['light', 'dark'];
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
    return NavBarItemController;
}());
NavBarItemController.$inject = ['$scope', '$element'];
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
    return NavBarItemDirective;
}());
NavBarItemDirective.directiveName = 'uifNavBarItem';
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
    return NavBarSearchController;
}());
NavBarSearchController.$inject = ['$scope', '$element', '$document', '$animate', '$timeout'];
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
        this.require = ["^" + NavBarDirective.directiveName, "" + NavBarSearch.directiveName];
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
    return NavBarSearch;
}());
NavBarSearch.directiveName = 'uifNavBarSearch';
exports.NavBarSearch = NavBarSearch;
exports.module = angular.module('officeuifabric.components.navbar', [
    'officeuifabric.components'
])
    .directive(NavBarDirective.directiveName, NavBarDirective.factory())
    .directive(NavBarItemDirective.directiveName, NavBarItemDirective.factory())
    .directive(NavBarSearch.directiveName, NavBarSearch.factory());


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var orgChartPresenceEnum_1 = __webpack_require__(36);
var orgChartStyleEnum_1 = __webpack_require__(38);
var orgChartSelectModeEnum_1 = __webpack_require__(37);
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
    return OrgChartController;
}());
OrgChartController.$inject = ['$scope', '$log'];
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


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrgChartPresenceEnum;
(function (OrgChartPresenceEnum) {
    OrgChartPresenceEnum[OrgChartPresenceEnum["available"] = 0] = "available";
    OrgChartPresenceEnum[OrgChartPresenceEnum["busy"] = 1] = "busy";
    OrgChartPresenceEnum[OrgChartPresenceEnum["away"] = 2] = "away";
    OrgChartPresenceEnum[OrgChartPresenceEnum["blocked"] = 3] = "blocked";
    OrgChartPresenceEnum[OrgChartPresenceEnum["dnd"] = 4] = "dnd";
    OrgChartPresenceEnum[OrgChartPresenceEnum["offline"] = 5] = "offline";
})(OrgChartPresenceEnum = exports.OrgChartPresenceEnum || (exports.OrgChartPresenceEnum = {}));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrgChartSelectModeEnum;
(function (OrgChartSelectModeEnum) {
    OrgChartSelectModeEnum[OrgChartSelectModeEnum["single"] = 0] = "single";
    OrgChartSelectModeEnum[OrgChartSelectModeEnum["multiple"] = 1] = "multiple";
})(OrgChartSelectModeEnum = exports.OrgChartSelectModeEnum || (exports.OrgChartSelectModeEnum = {}));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrgChartStyleEnum;
(function (OrgChartStyleEnum) {
    OrgChartStyleEnum[OrgChartStyleEnum["standard"] = 0] = "standard";
    OrgChartStyleEnum[OrgChartStyleEnum["square"] = 1] = "square";
})(OrgChartStyleEnum = exports.OrgChartStyleEnum || (exports.OrgChartStyleEnum = {}));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var overlayModeEnum_1 = __webpack_require__(40);
var OverlayController = (function () {
    function OverlayController(log) {
        this.log = log;
    }
    return OverlayController;
}());
OverlayController.$inject = ['$log'];
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
    return OverlayDirective;
}());
exports.OverlayDirective = OverlayDirective;
exports.module = angular.module('officeuifabric.components.overlay', [
    'officeuifabric.components'
])
    .directive('uifOverlay', OverlayDirective.factory());


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OverlayMode;
(function (OverlayMode) {
    OverlayMode[OverlayMode["light"] = 0] = "light";
    OverlayMode[OverlayMode["dark"] = 1] = "dark";
})(OverlayMode = exports.OverlayMode || (exports.OverlayMode = {}));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var panelDirectiveEnum_1 = __webpack_require__(42);
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
        var directive = function ($log, $animate, $timeout) { return new PanelDirective($log, $animate, $timeout); };
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
            _a);
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
            else {
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
                        $scope.uifIsOpen = false;
                    }, 500);
                }
            }
        });
        var _a;
    }
    return PanelController;
}());
PanelController.$inject = ['$scope', '$animate', '$element', '$log', '$timeout'];
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


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PanelTypes;
(function (PanelTypes) {
    PanelTypes[PanelTypes["small"] = 0] = "small";
    PanelTypes[PanelTypes["medium"] = 1] = "medium";
    PanelTypes[PanelTypes["large"] = 2] = "large";
    PanelTypes[PanelTypes["extralarge"] = 3] = "extralarge";
    PanelTypes[PanelTypes["extraextralarge"] = 4] = "extraextralarge";
    PanelTypes[PanelTypes["left"] = 5] = "left";
})(PanelTypes = exports.PanelTypes || (exports.PanelTypes = {}));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var personaStyleEnum_1 = __webpack_require__(1);
var sizeEnum_1 = __webpack_require__(4);
var iconEnum_1 = __webpack_require__(3);
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
    return PeoplePickerController;
}());
PeoplePickerController.$inject = ['$scope', '$filter', '$element'];
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
        this.require = ['ngModel', "" + PeoplePickerDirective.directiveName];
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
            "<div class=\"ms-PeoplePicker\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <div class=\"ms-PeoplePicker-persona\" ng-repeat=\"person in selectedPersons track by $index\">\n              <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n                uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n                uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"\n                uif-presence=\"{{person.presence}}\"\n                uif-image-url=\"{{person.icon}}\">\n                <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              </uif-persona>\n              <button\n                ng-if=\"!ngDisabled\"\n                type=\"button\"\n                ng-click=\"removePersonFromSelectedPeople(person, $event)\"\n                class=\"ms-PeoplePicker-personaRemove\">\n                <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n              </button>\n            </div>\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            placeholder=\"{{placeholder}}\"\n            ng-model=\"searchQuery\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-resultGroups\">\n            <div class=\"ms-PeoplePicker-resultGroup\" ng-repeat=\"groupData in groups | orderBy:'-order'\">\n              <div class=\"ms-PeoplePicker-resultGroupTitle\">{{groupData.group.name}}</div>\n              <uif-people-picker-result-list\n              ng-model=\"groupData.people\"\n              uif-person-click=\"addPersonToSelectedPeople\"\n              uif-person-close-click=\"removePersonFromSearchResults\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.medium] + "\"></uif-people-picker-result-list>\n            </div>\n          </div>\n          <ng-transclude />\n        </div>\n      </div>";
        this.templateTypes[PeoplePickerTypes.compact] =
            "<div class=\"ms-PeoplePicker ms-PeoplePicker--compact\">\n        <div class=\"ms-PeoplePicker-searchBox\">\n            <div class=\"ms-PeoplePicker-persona\" ng-repeat=\"person in selectedPersons track by $index\">\n              <uif-persona ng-click=\"onSelectedPersonClick()(person)\"\n                uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n                uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"\n                uif-presence=\"{{person.presence}}\"\n                uif-image-url=\"{{person.icon}}\">\n                <uif-persona-initials uif-color=\"{{person.color}}\">{{person.initials}}</uif-persona-initials>\n                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>\n              </uif-persona>\n              <button\n                ng-if=\"!ngDisabled\"\n                type=\"button\"\n                ng-click=\"removePersonFromSelectedPeople(person, $event)\"\n                class=\"ms-PeoplePicker-personaRemove\">\n                <uif-icon uif-type=\"" + iconEnum_1.IconEnum[iconEnum_1.IconEnum.x] + "\"></uif-icon>\n              </button>\n            </div>\n            <input ng-click=\"onPeoplePickerActive($event)\"\n            ng-model=\"searchQuery\"\n            placeholder=\"{{placeholder}}\"\n            class=\"ms-PeoplePicker-searchField\"\n            ng-focus=\"onPeoplePickerActive($event)\"\n            ng-keyup=\"onSearchKeyUp($event)\"\n            type=\"text\">\n        </div>\n        <div class=\"ms-PeoplePicker-results\">\n          <div class=\"ms-PeoplePicker-resultGroups\">\n            <div class=\"ms-PeoplePicker-resultGroup\" ng-repeat=\"groupData in groups | orderBy:'-order'\">\n              <div class=\"ms-PeoplePicker-resultGroupTitle\">{{groupData.group.name}}</div>\n              <uif-people-picker-result-list\n              ng-model=\"groupData.people\"\n              uif-picker-type=\"" + PeoplePickerTypes[PeoplePickerTypes.compact] + "\"\n              uif-person-click=\"addPersonToSelectedPeople\"\n              uif-person-close-click=\"removePersonFromSearchResults\"\n              uif-style=\"" + personaStyleEnum_1.PersonaStyleEnum[personaStyleEnum_1.PersonaStyleEnum.square] + "\"\n              uif-size=\"" + sizeEnum_1.PersonaSize[sizeEnum_1.PersonaSize.xsmall] + "\"></uif-people-picker-result-list>\n            </div>\n          </div>\n          <ng-transclude />\n        </div>\n      </div>";
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
    return PeoplePickerDirective;
}());
PeoplePickerDirective.directiveName = 'uifPeoplePicker';
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
    return PeoplePickerResultListDirective;
}());
PeoplePickerResultListDirective.directiveName = 'uifPeoplePickerResultList';
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
    return PeopleSearchMoreController;
}());
PeopleSearchMoreController.$inject = ['$scope', '$element'];
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
    return PeopleSearchMoreDirective;
}());
PeopleSearchMoreDirective.directiveName = 'uifPeopleSearchMore';
exports.PeopleSearchMoreDirective = PeopleSearchMoreDirective;
var PrimaryTextController = (function () {
    function PrimaryTextController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.$scope.$on(peopleSearchEventName, function ($event, query) {
            _this.$scope.searchQuery = query;
        });
    }
    return PrimaryTextController;
}());
PrimaryTextController.$inject = ['$scope'];
exports.PrimaryTextController = PrimaryTextController;
var PrimaryTextDirective = (function () {
    function PrimaryTextDirective() {
        this.replace = true;
        this.restrict = 'E';
        this.require = ["^^" + PeopleSearchMoreDirective.directiveName, "^^" + PeoplePickerDirective.directiveName];
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
    return PrimaryTextDirective;
}());
PrimaryTextDirective.directiveName = 'uifPrimaryText';
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
    return SecondaryTextDirective;
}());
SecondaryTextDirective.directiveName = 'uifSecondaryText';
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
    return DisconnectedTextDirective;
}());
DisconnectedTextDirective.directiveName = 'uifDisconnectedText';
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
    return PeoplePickerSelectedDirective;
}());
PeoplePickerSelectedDirective.directiveName = 'uifPeoplePickerSelected';
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
    return SelectedPeopleHeaderDirective;
}());
SelectedPeopleHeaderDirective.directiveName = 'uifSelectedPeopleHeader';
exports.SelectedPeopleHeaderDirective = SelectedPeopleHeaderDirective;
exports.module = angular.module('officeuifabric.components.peoplepicker', [
    'officeuifabric.components'
])
    .directive(PeoplePickerDirective.directiveName, PeoplePickerDirective.factory())
    .directive(PrimaryTextDirective.directiveName, PrimaryTextDirective.factory())
    .directive(SecondaryTextDirective.directiveName, SecondaryTextDirective.factory())
    .directive(PeoplePickerResultListDirective.directiveName, PeoplePickerResultListDirective.factory())
    .directive(DisconnectedTextDirective.directiveName, DisconnectedTextDirective.factory())
    .directive(PeoplePickerSelectedDirective.directiveName, PeoplePickerSelectedDirective.factory())
    .directive(SelectedPeopleHeaderDirective.directiveName, SelectedPeopleHeaderDirective.factory())
    .directive(PeopleSearchMoreDirective.directiveName, PeopleSearchMoreDirective.factory());


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var personaStyleEnum_1 = __webpack_require__(1);
var personaPresenceEnum_1 = __webpack_require__(5);
var personaInitialsColorEnum_1 = __webpack_require__(61);
var sizeEnum_1 = __webpack_require__(4);
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
            _a);
        this.uifPresenceClasses = (_b = {},
            _b[personaPresenceEnum_1.PresenceEnum.available] = 'ms-Persona--available',
            _b[personaPresenceEnum_1.PresenceEnum.away] = 'ms-Persona--away',
            _b[personaPresenceEnum_1.PresenceEnum.blocked] = 'ms-Persona--blocked',
            _b[personaPresenceEnum_1.PresenceEnum.busy] = 'ms-Persona--busy',
            _b[personaPresenceEnum_1.PresenceEnum.dnd] = 'ms-Persona--dnd',
            _b[personaPresenceEnum_1.PresenceEnum.offline] = 'ms-Persona--offline',
            _b);
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
    return PersonaController;
}());
PersonaController.$inject = ['$log'];
exports.PersonaController = PersonaController;
exports.module = angular.module('officeuifabric.components.persona', ['officeuifabric.components'])
    .directive('uifPersona', PersonaDirective.factory())
    .directive('uifPersonaInitials', PersonaInitialsDirective.factory())
    .directive('uifPersonaPrimaryText', PersonaTextDirective.factory('primary'))
    .directive('uifPersonaSecondaryText', PersonaTextDirective.factory('secondary'))
    .directive('uifPersonaTertiaryText', PersonaTextDirective.factory('tertiary'))
    .directive('uifPersonaOptionalText', PersonaTextDirective.factory(''));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var sizeEnum_1 = __webpack_require__(47);
var placeholderEnum_1 = __webpack_require__(46);
var personaStyleEnum_1 = __webpack_require__(1);
var personaPresenceEnum_1 = __webpack_require__(5);
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
    return PersonaCardController;
}());
PersonaCardController.$inject = ['$log', '$scope'];
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


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PlaceholderEnum;
(function (PlaceholderEnum) {
    PlaceholderEnum[PlaceholderEnum["regular"] = 0] = "regular";
    PlaceholderEnum[PlaceholderEnum["topright"] = 1] = "topright";
    PlaceholderEnum[PlaceholderEnum["overflow"] = 2] = "overflow";
})(PlaceholderEnum = exports.PlaceholderEnum || (exports.PlaceholderEnum = {}));


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PersonaSize;
(function (PersonaSize) {
    PersonaSize[PersonaSize["xsmall"] = 0] = "xsmall";
    PersonaSize[PersonaSize["small"] = 1] = "small";
    PersonaSize[PersonaSize["medium"] = 2] = "medium";
    PersonaSize[PersonaSize["large"] = 3] = "large";
    PersonaSize[PersonaSize["xlarge"] = 4] = "xlarge";
})(PersonaSize = exports.PersonaSize || (exports.PersonaSize = {}));


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var pivotSizeEnum_1 = __webpack_require__(49);
var pivotTypeEnum_1 = __webpack_require__(50);
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
    return PivotController;
}());
PivotController.$inject = ['$log', '$scope'];
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


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PivotSize;
(function (PivotSize) {
    PivotSize[PivotSize["regular"] = 0] = "regular";
    PivotSize[PivotSize["large"] = 1] = "large";
})(PivotSize = exports.PivotSize || (exports.PivotSize = {}));


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PivotType;
(function (PivotType) {
    PivotType[PivotType["regular"] = 0] = "regular";
    PivotType[PivotType["tabs"] = 1] = "tabs";
})(PivotType = exports.PivotType || (exports.PivotType = {}));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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
    return ProgressIndicatorDirective;
}());
exports.ProgressIndicatorDirective = ProgressIndicatorDirective;
exports.module = angular.module('officeuifabric.components.progressindicator', [
    'officeuifabric.components'
])
    .directive('uifProgressIndicator', ProgressIndicatorDirective.factory());


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var spinnerSizeEnum_1 = __webpack_require__(54);
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
    return SpinnerController;
}());
SpinnerController.$inject = ['$scope', '$element', '$interval', '$log'];
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


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SpinnerSize;
(function (SpinnerSize) {
    SpinnerSize[SpinnerSize["small"] = 0] = "small";
    SpinnerSize[SpinnerSize["large"] = 1] = "large";
})(SpinnerSize = exports.SpinnerSize || (exports.SpinnerSize = {}));


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var tableRowSelectModeEnum_1 = __webpack_require__(56);
var tableTypeEnum_1 = __webpack_require__(57);
var TableController = (function () {
    function TableController($scope, $log) {
        this.$scope = $scope;
        this.$log = $log;
        this.$scope.orderBy = null;
        this.$scope.orderAsc = true;
        this.$scope.rows = [];
        if (!this.$scope.selectedItems) {
            this.$scope.selectedItems = [];
        }
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
            return this.$scope.selectedItems;
        },
        enumerable: true,
        configurable: true
    });
    return TableController;
}());
TableController.$inject = ['$scope', '$log'];
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
        if (attrs.uifSelectedItems !== undefined && attrs.uifSelectedItems !== null) {
            var selectedItems = null;
            selectedItems = scope.$eval(attrs.uifSelectedItems);
            if (selectedItems === undefined || selectedItems === null) {
                selectedItems = [];
            }
            scope.selectedItems = selectedItems;
        }
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
    return TableRowController;
}());
TableRowController.$inject = ['$scope', '$log'];
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
                        table.selectedItems.splice(0, table.selectedItems.length - 1);
                        table.selectedItems.push(tableRowScope.item);
                    }
                }
                var itemAlreadySelected = false;
                for (var i = 0; i < table.selectedItems.length; i++) {
                    if (table.selectedItems[i] === tableRowScope.item) {
                        itemAlreadySelected = true;
                        break;
                    }
                }
                if (!itemAlreadySelected) {
                    table.selectedItems.push(tableRowScope.item);
                }
                instanceElement.addClass('is-selected');
            }
            else {
                for (var i = 0; i < table.selectedItems.length; i++) {
                    if (table.selectedItems[i] === tableRowScope.item) {
                        table.selectedItems.splice(i, 1);
                        break;
                    }
                }
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
                    var _children = cells.eq(i).children();
                    if (_children.length > 0) {
                        var _sorter = _children.eq(_children.length - 1);
                        if (_sorter.hasClass('uif-sort-order')) {
                            _sorter.remove();
                        }
                    }
                }
                instanceElement.append('<span class="uif-sort-order">&nbsp;\
                <i class="ms-Icon ms-Icon--caretDown" aria-hidden="true"></i></span>');
            }
        });
        scope.$watch('table.orderAsc', function (newOrderAsc, oldOrderAsc, tableHeaderScope) {
            if (instanceElement.children().length > 0) {
                var _sorter = instanceElement.children().eq(instanceElement.children().length - 1);
                if (_sorter.hasClass('uif-sort-order')) {
                    var oldCssClass = oldOrderAsc ? 'ms-Icon--caretDown' : 'ms-Icon--caretUp';
                    var newCssClass = newOrderAsc ? 'ms-Icon--caretDown' : 'ms-Icon--caretUp';
                    _sorter.children().eq(0).removeClass(oldCssClass).addClass(newCssClass);
                }
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


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TableRowSelectModeEnum;
(function (TableRowSelectModeEnum) {
    TableRowSelectModeEnum[TableRowSelectModeEnum["none"] = 0] = "none";
    TableRowSelectModeEnum[TableRowSelectModeEnum["single"] = 1] = "single";
    TableRowSelectModeEnum[TableRowSelectModeEnum["multiple"] = 2] = "multiple";
})(TableRowSelectModeEnum = exports.TableRowSelectModeEnum || (exports.TableRowSelectModeEnum = {}));


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TableTypeEnum;
(function (TableTypeEnum) {
    TableTypeEnum[TableTypeEnum["fluid"] = 0] = "fluid";
    TableTypeEnum[TableTypeEnum["fixed"] = 1] = "fixed";
})(TableTypeEnum = exports.TableTypeEnum || (exports.TableTypeEnum = {}));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var uifTypeEnum_1 = __webpack_require__(59);
var TextFieldController = (function () {
    function TextFieldController($log) {
        this.$log = $log;
    }
    return TextFieldController;
}());
TextFieldController.$inject = ['$log'];
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
            ngRequired: '<?',
            placeholder: '@',
            step: '@',
            uifDescription: '@',
            uifLabel: '@',
            uifType: '@'
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
        scope.$watch('ngRequired', function (newValue, oldValue) {
            if (newValue) {
                scope.required = true;
            }
            else if (typeof newValue !== 'undefined') {
                scope.required = false;
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


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputTypeEnum;
(function (InputTypeEnum) {
    InputTypeEnum[InputTypeEnum["text"] = 0] = "text";
    InputTypeEnum[InputTypeEnum["password"] = 1] = "password";
    InputTypeEnum[InputTypeEnum["email"] = 2] = "email";
    InputTypeEnum[InputTypeEnum["url"] = 3] = "url";
    InputTypeEnum[InputTypeEnum["tel"] = 4] = "tel";
    InputTypeEnum[InputTypeEnum["range"] = 5] = "range";
    InputTypeEnum[InputTypeEnum["number"] = 6] = "number";
})(InputTypeEnum = exports.InputTypeEnum || (exports.InputTypeEnum = {}));


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
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


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PersonaInitialsColor;
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
})(PersonaInitialsColor = exports.PersonaInitialsColor || (exports.PersonaInitialsColor = {}));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(6);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwMjIwYTU3YWY0MmExMWFjOWEzZSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVN0eWxlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvc2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVByZXNlbmNlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2NvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblRlbXBsYXRlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0QXJyb3dFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZFR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb250ZW50L2NvbnRlbnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ZhY2VwaWxlL2ZhY2VwaWxlRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhci9tZXNzYWdlQmFyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFN0eWxlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9wZXJzb25hRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BlcnNvbmFjYXJkRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BsYWNlaG9sZGVyRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdFNpemVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90VHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBLCtDOzs7Ozs7O0FDQUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsK0VBQStFOzs7Ozs7OztBQ05oRjtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHlKQUF5SixxREFBcUQ7QUFDOU07QUFDQSxnSEFBZ0gscURBQXFEO0FBQ3JLO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDhDQUE4QztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL1FBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx1REFBdUQ7Ozs7Ozs7O0FDeFZ4RDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdFQUFnRTs7Ozs7Ozs7QUNWakU7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7Ozs7Ozs7O0FDVnBFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsRUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBOzs7Ozs7OztBQ0hBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3SEFBd0gsUUFBUSxnQkFBZ0IsYUFBYTtBQUM3SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLDRCQUE0QiwyVUFBMlUsNEJBQTRCLHlQQUF5UCxXQUFXLEtBQUssZUFBZSw4T0FBOE8sV0FBVyxLQUFLLGVBQWU7QUFDOStCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxrQ0FBa0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BHQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGtDQUFrQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELHdCQUF3QjtBQUM3RTtBQUNBLGdEQUFnRCx3QkFBd0I7QUFDeEU7QUFDQSx3RUFBd0Usd0JBQXdCO0FBQ2hHO0FBQ0EsbUVBQW1FLHdCQUF3QjtBQUMzRjtBQUNBLHdFQUF3RSx3QkFBd0I7QUFDaEc7QUFDQSxtRUFBbUUsd0JBQXdCO0FBQzNGO0FBQ0EseUVBQXlFLHdCQUF3QjtBQUNqRztBQUNBLG9FQUFvRSx3QkFBd0I7QUFDNUY7QUFDQSxxRUFBcUUsd0JBQXdCO0FBQzdGO0FBQ0EsZ0VBQWdFLHdCQUF3QjtBQUN4RjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMseUNBQXlDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN0xBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxxRkFBcUY7Ozs7Ozs7O0FDZHRGO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx5RUFBeUU7Ozs7Ozs7O0FDUjFFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7Ozs7Ozs7O0FDUnBFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMscUNBQXFDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxnQ0FBZ0M7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFNQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDTmpFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixPQUFPLHVDQUF1QyxTQUFTLFdBQVcsT0FBTztBQUNuRyxpREFBaUQsYUFBYSxvQkFBb0IsY0FBYztBQUNoRywyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlDQUF5QyxFQUFFO0FBQzdFO0FBQ0EsU0FBUztBQUNULGtDQUFrQyx3REFBd0QsRUFBRSx3QkFBd0IsaUJBQWlCLEVBQUU7QUFDdkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5Q0FBeUMsRUFBRSx3QkFBd0Isa0RBQWtELEVBQUU7QUFDeko7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25NQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0RUFBNEU7Ozs7Ozs7O0FDTjdFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsa0NBQWtDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5SEFBeUgscUxBQXFMLHFCQUFxQixxSUFBcUksaUZBQWlGO0FBQ3poQjtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlZQUF5WTtBQUN6WTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDhDQUE4QztBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG9EQUFvRDtBQUNqRztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL1FBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixVQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyx3Q0FBd0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsOEdBQThHO0FBQ3ZKO0FBQ0E7QUFDQSwwRUFBMEUsYUFBYTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSx1QkFBdUI7QUFDL0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLGtFQUFrRTtBQUNsRSwyQkFBMkIsUUFBUTtBQUNuQyxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsNEJBQTRCLEtBQUssdUJBQXVCO0FBQ2hIO0FBQ0EsOEJBQThCO0FBQzlCLCtEQUErRDtBQUMvRDtBQUNBLDBCQUEwQixNQUFNLElBQUksTUFBTTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGtDQUFrQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pTQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLGlFQUFpRTtBQUNqRSxzQ0FBc0MsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0Usb0RBQW9EO0FBQzVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzSkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx5RUFBeUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEdBQTBHOzs7Ozs7OztBQ2IzRztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1RUFBdUU7QUFDL0Y7QUFDQSwrQ0FBK0MsZUFBZTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlDQUF5QyxFQUFFLHdCQUF3QixrREFBa0QsRUFBRTtBQUN6SjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pJQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlqQkFBaWpCLG9CQUFvQiwrSEFBK0gsYUFBYSwrRUFBK0UsY0FBYyxLQUFLLGlCQUFpQix1V0FBdVcsaU5BQWlOLG1DQUFtQyxzYkFBc2IsZ0JBQWdCLEdBQUcsaUJBQWlCLHlLQUF5SyxvQkFBb0IsaUlBQWlJLGFBQWEsaUZBQWlGLGNBQWMsS0FBSyxpQkFBaUIsNkZBQTZGLG9CQUFvQixtR0FBbUcsc0JBQXNCO0FBQ25pRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1T0FBdU8sb2VBQW9lLHlCQUF5Qiw2Y0FBNmMsK0JBQStCO0FBQ2h0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0Q0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNkJBQTZCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtCQUErQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDJDQUEyQztBQUNoRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDZDQUE2QztBQUNsRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtDQUErQztBQUNwRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDamJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsaUdBQWlHOzs7Ozs7OztBQ1BsRztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLCtFQUErRTs7Ozs7Ozs7QUNQaEY7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMseUVBQXlFOzs7Ozs7OztBQ04xRTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1cEJBQXVwQixrQkFBa0I7QUFDenFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvSkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7OztBQ2hJQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxxRkFBcUY7Ozs7Ozs7O0FDVHRGO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1T0FBdU8sU0FBUztBQUNoUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsOERBQThELHVEQUF1RDtBQUNySDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMENBQTBDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSx3R0FBd0cseUVBQXlFO0FBQ2pMLDJIQUEySCwwQkFBMEI7QUFDcko7QUFDQTtBQUNBLHlDQUF5QyxzQ0FBc0M7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1PQUFtTyxhQUFhO0FBQ2hQO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyw0QkFBNEI7QUFDekU7QUFDQTtBQUNBLDZDQUE2Qyw0QkFBNEI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3VEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDBDQUEwQztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsMkNBQTJDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx1QkFBdUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhMQUE4TCxPQUFPO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx1Q0FBdUM7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywyQ0FBMkM7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2Q0FBNkM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNXQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDJGQUEyRjs7Ozs7Ozs7QUNWNUY7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsaUdBQWlHOzs7Ozs7OztBQ05sRztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrRkFBa0Y7Ozs7Ozs7O0FDTm5GO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCwwQ0FBMEM7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msa0NBQWtDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDTmpFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtTQUFrUztBQUNsUztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQscURBQXFEO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcElBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNkRBQTZEOzs7Ozs7OztBQ1Y5RDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLHNCQUFzQjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4Q0FBOEM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSwyZ0JBQTJnQixpQkFBaUIsc0NBQXNDLGFBQWEseURBQXlELGNBQWMsS0FBSyxpQkFBaUIscUVBQXFFLG9CQUFvQiwrZ0JBQStnQixhQUFhLHVnQkFBdWdCLHNCQUFzQjtBQUM5ekQ7QUFDQSxvaUJBQW9pQixpQkFBaUIsc0NBQXNDLGFBQWEseURBQXlELGNBQWMsS0FBSyxpQkFBaUIscUVBQXFFLG9CQUFvQixxakJBQXFqQixhQUFhLGllQUFpZSxzQkFBc0I7QUFDdjFELCtRQUErUSxhQUFhO0FBQzVSLDBRQUEwUSxhQUFhLG1YQUFtWCxnQkFBZ0I7QUFDMXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbURBQW1ELEVBQUU7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFdBQVc7QUFDM0M7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFdBQVc7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9QQUFvUCwrREFBK0Qsd0ZBQXdGLGFBQWEsMkJBQTJCLFlBQVksK0JBQStCLGlCQUFpQixnQ0FBZ0MsYUFBYSxtREFBbUQsY0FBYyxLQUFLLGlCQUFpQiwrREFBK0Qsb0JBQW9CLHFFQUFxRSxzQkFBc0IsK2hDQUEraEMsWUFBWSwwQkFBMEIsYUFBYSx5QkFBeUIsWUFBWTtBQUN4NUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw4Q0FBOEM7QUFDbkY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNHQUFzRyx5REFBeUQ7QUFDL0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEtBQTRLLGtCQUFrQixHQUFHLGFBQWE7QUFDOU07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYseURBQXlELG9sQkFBb2xCLGlCQUFpQixvQ0FBb0MsYUFBYSx1REFBdUQsY0FBYyxLQUFLLGlCQUFpQixtRUFBbUUsb0JBQW9CLHlFQUF5RSxzQkFBc0I7QUFDbmpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN2hCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsVUFBVTtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsYUFBYTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyTEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGFBQWE7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsYUFBYTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywyQ0FBMkM7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkNBQTZDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDhDQUE4QztBQUNuRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvVEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0RUFBNEU7Ozs7Ozs7O0FDUDdFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdFQUFnRTs7Ozs7Ozs7QUNUakU7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdDQUFnQyxJQUFJLGFBQWE7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLG1DQUFtQywyQkFBMkI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNqSEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMERBQTBEOzs7Ozs7OztBQ04zRDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwREFBMEQ7Ozs7Ozs7O0FDTjNEO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELFNBQVM7QUFDbkU7QUFDQTtBQUNBLHNFQUFzRSxnQ0FBZ0M7QUFDdEc7QUFDQSxpRUFBaUUsZ0JBQWdCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyw0Q0FBNEM7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsbURBQW1EO0FBQ2pIO0FBQ0EsK0RBQStELHNCQUFzQjtBQUNyRixzREFBc0Qsc0JBQXNCO0FBQzVFLDBFQUEwRSxhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM0ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7OztBQ2hKQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDTmpFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkJBQTZCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHVCQUF1QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0NBQWdDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0NBQWdDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9ZQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGlHQUFpRzs7Ozs7Ozs7QUNQbEc7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0VBQXNFOzs7Ozs7OztBQ052RTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsK0dBQStHO0FBQy9HLG9GQUFvRix5QkFBeUI7QUFDN0c7QUFDQSwrRkFBK0YsU0FBUztBQUN4RyxvQkFBb0IsS0FBSyxTQUFTLEtBQUssVUFBVSxNQUFNO0FBQ3ZEO0FBQ0E7QUFDQSxzREFBc0QsZ0JBQWdCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5Q0FBeUMsRUFBRSx3QkFBd0Isa0RBQWtELEVBQUU7QUFDeko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JIQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0VBQXNFOzs7Ozs7OztBQ1h2RTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSwwQkFBMEI7QUFDakc7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRCw0REFBNEQ7QUFDNUQsc0NBQXNDLDBCQUEwQiw0QkFBNEIsMkJBQTJCO0FBQ3ZILDJCQUEyQixPQUFPO0FBQ2xDLG9EQUFvRCxhQUFhO0FBQ2pFLG1EQUFtRCxZQUFZO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsOEJBQThCLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQzlJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDJGQUEyRiIsImZpbGUiOiJuZ09mZmljZVVpRmFicmljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKSA6IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2Mik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDIyMGE1N2FmNDJhMTFhYzlhM2UiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYW5ndWxhclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBlcnNvbmFTdHlsZUVudW07XG4oZnVuY3Rpb24gKFBlcnNvbmFTdHlsZUVudW0pIHtcbiAgICBQZXJzb25hU3R5bGVFbnVtW1BlcnNvbmFTdHlsZUVudW1bXCJyb3VuZFwiXSA9IDBdID0gXCJyb3VuZFwiO1xuICAgIFBlcnNvbmFTdHlsZUVudW1bUGVyc29uYVN0eWxlRW51bVtcInNxdWFyZVwiXSA9IDFdID0gXCJzcXVhcmVcIjtcbn0pKFBlcnNvbmFTdHlsZUVudW0gPSBleHBvcnRzLlBlcnNvbmFTdHlsZUVudW0gfHwgKGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL3BlcnNvbmFTdHlsZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIE1lbnVJdGVtVHlwZXM7XG4oZnVuY3Rpb24gKE1lbnVJdGVtVHlwZXMpIHtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJsaW5rXCJdID0gMF0gPSBcImxpbmtcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJkaXZpZGVyXCJdID0gMV0gPSBcImRpdmlkZXJcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJoZWFkZXJcIl0gPSAyXSA9IFwiaGVhZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wic3ViTWVudVwiXSA9IDNdID0gXCJzdWJNZW51XCI7XG59KShNZW51SXRlbVR5cGVzIHx8IChNZW51SXRlbVR5cGVzID0ge30pKTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmQ29udGV4dHVhbE1lbnUnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz0/dWlmSXNTZWxlY3RlZCcsXG4gICAgICAgICAgICBvbkNsaWNrOiAnJm5nQ2xpY2snLFxuICAgICAgICAgICAgdGV4dDogJz0/dWlmVGV4dCcsXG4gICAgICAgICAgICB0eXBlOiAnQHVpZlR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlcyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTWVudUl0ZW1UeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSB1bnN1cHBvcnRlZCBtZW51IHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIGNvbnRleHQgbWVudS4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgTWVudUl0ZW1UeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGNvbnRleHR1YWxNZW51Q29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgIT09ICdib29sZWFuJyAmJiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51IC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtc2VsZWN0ZWRcXCcuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSBcXCcnICsgdHlwZW9mICRzY29wZS5pc1NlbGVjdGVkICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGFzIHZhbGlkIHR5cGUgZm9yIFxcJ3VpZi1pcy1zZWxlY3RlZFxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbSAvPi4gVGhlIHZhbGlkIHR5cGUgaXMgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNEaXNhYmxlZCA9ICEhZGlzYWJsZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnRyYW5zY2x1ZGVDaGlsZHMoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpO1xuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuaXNNdWx0aVNlbGVjdGlvbk1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuZGVzZWxlY3RJdGVtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNTZWxlY3RlZCkgJiYgISRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmNsb3NlU3ViTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzUm9vdE1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5jbG9zZVN1Yk1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1kZXNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1jbG9zZScsIGZ1bmN0aW9uIChldmVudCwgbWVudUl0ZW1JZCkge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS4kaWQgIT09IG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNoaWxkTWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLnN1Yk1lbnVdID1cbiAgICAgICAgICAgIFwiPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtXFxcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmsgbXMtQ29udGV4dHVhbE1lbnUtbGluay0taGFzTWVudVxcXCJcXG4gICAgICAgICAgbmctY2xhc3M9XFxcInsnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLCAnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCIgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oJGV2ZW50KVxcXCIgaHJlZj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICAgICAgPGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LXN1Yk1lbnVJY29uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XFxcIj48L2k+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVpZi1jb250ZXh0LXN1Ym1lbnVcXFwiPjwvZGl2PlxcbiAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmtcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiXFxuICAgICAgICAgICAgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oJGV2ZW50KVxcXCIgaHJlZj48c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICAgIDwvbGk+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLmhlYWRlcl0gPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW0gbXMtQ29udGV4dHVhbE1lbnUtaXRlbS0taGVhZGVyXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5kaXZpZGVyXSA9IFwiPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtIG1zLUNvbnRleHR1YWxNZW51LWl0ZW0tLWRpdmlkZXJcXFwiPjwvbGk+XCI7XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCAmJiAhJHNjb3BlLnRleHQgJiYgISRzY29wZS5oYXNDaGlsZE1lbnUgJiYgJHNjb3BlLnR5cGUgIT09ICdkaXZpZGVyJykge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51IC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgYSBjb250ZXh0dWFsIG1lbnUgaXRlbS5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ0ZvciA8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPiB5b3UgbmVlZCB0byBzcGVjaWZ5IGVpdGhlciBcXCd1aWYtdGV4dFxcJyBhcyBhdHRyaWJ1dGUgb3IgPHVpZi1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0SXRlbUNvbnRlbnQoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0U3ViTWVudShjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLWl0ZW0tY29udGVudCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoYW5ndWxhci5lbGVtZW50KCc8c3Bhbj4nICsgJHNjb3BlLnRleHQgKyAnPC9zcGFuPicpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRTdWJNZW51ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtY29udGV4dC1zdWJtZW51JykpLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5Db250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudUl0ZW0nO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUgPSBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmU7XG52YXIgQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIucHJvdG90eXBlLnNldENoaWxkTWVudSA9IGZ1bmN0aW9uIChjaGlsZE1lbnVDdHJsKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhhc0NoaWxkTWVudSA9IHRydWU7XG4gICAgICAgIHRoaXMuJHNjb3BlLmNoaWxkTWVudUN0cmwgPSBjaGlsZE1lbnVDdHJsO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG59KCkpO1xuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnXTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG52YXIgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8dWwgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51XFxcIiBuZy10cmFuc2NsdWRlPjwvdWw+XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGNsb3NlT25DbGljazogJ0B1aWZDbG9zZU9uQ2xpY2snLFxuICAgICAgICAgICAgaXNPcGVuOiAnPT91aWZJc09wZW4nLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6ICdAdWlmTXVsdGlzZWxlY3QnXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBzZXRDbG9zZU9uQ2xpY2sgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jbG9zZU9uQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNsb3NlT25DbGljayA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRDbG9zZU9uQ2xpY2soJHNjb3BlLmNsb3NlT25DbGljayk7XG4gICAgICAgICRhdHRycy4kb2JzZXJ2ZSgndWlmQ2xvc2VPbkNsaWNrJywgc2V0Q2xvc2VPbkNsaWNrKTtcbiAgICAgICAgdmFyIHBhcmVudE1lbnVJdGVtQ3RybCA9ICRlbGVtZW50LmNvbnRyb2xsZXIoQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpO1xuICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQocGFyZW50TWVudUl0ZW1DdHJsKSkge1xuICAgICAgICAgICAgcGFyZW50TWVudUl0ZW1DdHJsLnNldENoaWxkTWVudShjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUubXVsdGlzZWxlY3QpICYmICRzY29wZS5tdWx0aXNlbGVjdC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdtcy1Db250ZXh0dWFsTWVudS0tbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xufSgpKTtcbkNvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmQ29udGV4dHVhbE1lbnUnO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xudmFyIENvbnRleHR1YWxNZW51Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5vblJvb3RNZW51Q2xvc2VkID0gW107XG4gICAgICAgIHRoaXMuaXNPcGVuQ2xhc3NOYW1lID0gJ2lzLW9wZW4nO1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkZWxlbWVudC5jb250cm9sbGVyKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKSkpIHtcbiAgICAgICAgICAgICRzY29wZS5pc1Jvb3RNZW51ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdpc09wZW4nLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICdib29sZWFuJyAmJiBuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSBpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtb3BlblxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgbmV3VmFsdWUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLW9wZW5cXCcgYXR0cmlidXRlIGZvciAnICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGV4dHVhbC1tZW51IC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGFuaW1hdGVbbmV3VmFsdWUgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oJGVsZW1lbnQsIF90aGlzLmlzT3BlbkNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uUm9vdE1lbnVDbG9zZWQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5jbG9zZU1lbnUoKTtcbiAgICAgICAgICAgIF90aGlzLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1jbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNSb290TWVudSAmJiAkc2NvcGUuY2xvc2VPbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Sb290TWVudUNsb3NlZC5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5kZXNlbGVjdEl0ZW1zID0gZnVuY3Rpb24gKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgndWlmLW1lbnUtZGVzZWxlY3QnKTtcbiAgICAgICAgaWYgKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlU3ViTWVudXMgPSBmdW5jdGlvbiAobWVudUl0ZW1Ub1NraXAsIGNsb3NlUm9vdE1lbnUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgndWlmLW1lbnUtY2xvc2UnLCBtZW51SXRlbVRvU2tpcCk7XG4gICAgICAgIGlmIChjbG9zZVJvb3RNZW51KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgndWlmLW1lbnUtY2xvc2UnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaXNPcGVuID0gdHJ1ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNSb290TWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLmlzUm9vdE1lbnU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmlzTXVsdGlTZWxlY3Rpb25NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc01lbnVPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSgpKTtcbkNvbnRleHR1YWxNZW51Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnLCAnJGxvZyddO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudUNvbnRyb2xsZXIgPSBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXI7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUudHNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSWNvbkVudW07XG4oZnVuY3Rpb24gKEljb25FbnVtKSB7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydFwiXSA9IDBdID0gXCJhbGVydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnQyXCJdID0gMV0gPSBcImFsZXJ0MlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnRPdXRsaW5lXCJdID0gMl0gPSBcImFsZXJ0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duXCJdID0gM10gPSBcImFycm93RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duMlwiXSA9IDRdID0gXCJhcnJvd0Rvd24yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25MZWZ0XCJdID0gNV0gPSBcImFycm93RG93bkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93blJpZ2h0XCJdID0gNl0gPSBcImFycm93RG93blJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0xlZnRcIl0gPSA3XSA9IFwiYXJyb3dMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1JpZ2h0XCJdID0gOF0gPSBcImFycm93UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBcIl0gPSA5XSA9IFwiYXJyb3dVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcDJcIl0gPSAxMF0gPSBcImFycm93VXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwTGVmdFwiXSA9IDExXSA9IFwiYXJyb3dVcExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBSaWdodFwiXSA9IDEyXSA9IFwiYXJyb3dVcFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhc2NlbmRpbmdcIl0gPSAxM10gPSBcImFzY2VuZGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXRcIl0gPSAxNF0gPSBcImF0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhdHRhY2htZW50XCJdID0gMTVdID0gXCJhdHRhY2htZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiYWdcIl0gPSAxNl0gPSBcImJhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmFsbG9vblwiXSA9IDE3XSA9IFwiYmFsbG9vblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmVsbFwiXSA9IDE4XSA9IFwiYmVsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9hcmRzXCJdID0gMTldID0gXCJib2FyZHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvbGRcIl0gPSAyMF0gPSBcImJvbGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvb2ttYXJrXCJdID0gMjFdID0gXCJib29rbWFya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9va3NcIl0gPSAyMl0gPSBcImJvb2tzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJicmllZmNhc2VcIl0gPSAyM10gPSBcImJyaWVmY2FzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYnVuZGxlXCJdID0gMjRdID0gXCJidW5kbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNha2VcIl0gPSAyNV0gPSBcImNha2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyXCJdID0gMjZdID0gXCJjYWxlbmRhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJEYXlcIl0gPSAyN10gPSBcImNhbGVuZGFyRGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhclB1YmxpY1wiXSA9IDI4XSA9IFwiY2FsZW5kYXJQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyV2Vla1wiXSA9IDI5XSA9IFwiY2FsZW5kYXJXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhcldvcmtXZWVrXCJdID0gMzBdID0gXCJjYWxlbmRhcldvcmtXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYW1lcmFcIl0gPSAzMV0gPSBcImNhbWVyYVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyXCJdID0gMzJdID0gXCJjYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93blwiXSA9IDMzXSA9IFwiY2FyZXREb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25MZWZ0XCJdID0gMzRdID0gXCJjYXJldERvd25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25PdXRsaW5lXCJdID0gMzVdID0gXCJjYXJldERvd25PdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25SaWdodFwiXSA9IDM2XSA9IFwiY2FyZXREb3duUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0TGVmdFwiXSA9IDM3XSA9IFwiY2FyZXRMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldExlZnRPdXRsaW5lXCJdID0gMzhdID0gXCJjYXJldExlZnRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0XCJdID0gMzldID0gXCJjYXJldFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0T3V0bGluZVwiXSA9IDQwXSA9IFwiY2FyZXRSaWdodE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBcIl0gPSA0MV0gPSBcImNhcmV0VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBMZWZ0XCJdID0gNDJdID0gXCJjYXJldFVwTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcE91dGxpbmVcIl0gPSA0M10gPSBcImNhcmV0VXBPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwUmlnaHRcIl0gPSA0NF0gPSBcImNhcmV0VXBSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FydFwiXSA9IDQ1XSA9IFwiY2FydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2F0XCJdID0gNDZdID0gXCJjYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXJ0XCJdID0gNDddID0gXCJjaGFydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdFwiXSA9IDQ4XSA9IFwiY2hhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdEFkZFwiXSA9IDQ5XSA9IFwiY2hhdEFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tcIl0gPSA1MF0gPSBcImNoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveFwiXSA9IDUxXSA9IFwiY2hlY2tib3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94Q2hlY2tcIl0gPSA1Ml0gPSBcImNoZWNrYm94Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94RW1wdHlcIl0gPSA1M10gPSBcImNoZWNrYm94RW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94TWl4ZWRcIl0gPSA1NF0gPSBcImNoZWNrYm94TWl4ZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrUGVvcGxlXCJdID0gNTVdID0gXCJjaGVja1Blb3BsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbkRvd25cIl0gPSA1Nl0gPSBcImNoZXZyb25Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uTGVmdFwiXSA9IDU3XSA9IFwiY2hldnJvbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25SaWdodFwiXSA9IDU4XSA9IFwiY2hldnJvblJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc0Rvd25cIl0gPSA1OV0gPSBcImNoZXZyb25zRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNMZWZ0XCJdID0gNjBdID0gXCJjaGV2cm9uc0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zUmlnaHRcIl0gPSA2MV0gPSBcImNoZXZyb25zUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zVXBcIl0gPSA2Ml0gPSBcImNoZXZyb25zVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0Rvd25cIl0gPSA2M10gPSBcImNoZXZyb25UaGlja0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0xlZnRcIl0gPSA2NF0gPSBcImNoZXZyb25UaGlja0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja1JpZ2h0XCJdID0gNjVdID0gXCJjaGV2cm9uVGhpY2tSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrVXBcIl0gPSA2Nl0gPSBcImNoZXZyb25UaGlja1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpbkRvd25cIl0gPSA2N10gPSBcImNoZXZyb25UaGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5MZWZ0XCJdID0gNjhdID0gXCJjaGV2cm9uVGhpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluUmlnaHRcIl0gPSA2OV0gPSBcImNoZXZyb25UaGluUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluVXBcIl0gPSA3MF0gPSBcImNoZXZyb25UaGluVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25VcFwiXSA9IDcxXSA9IFwiY2hldnJvblVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsXCJdID0gNzJdID0gXCJjaXJjbGVCYWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsb29uc1wiXSA9IDczXSA9IFwiY2lyY2xlQmFsbG9vbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNhclwiXSA9IDc0XSA9IFwiY2lyY2xlQ2FyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDYXRcIl0gPSA3NV0gPSBcImNpcmNsZUNhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ29mZmVlXCJdID0gNzZdID0gXCJjaXJjbGVDb2ZmZWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZURvZ1wiXSA9IDc3XSA9IFwiY2lyY2xlRG9nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVFbXB0eVwiXSA9IDc4XSA9IFwiY2lyY2xlRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxcIl0gPSA3OV0gPSBcImNpcmNsZUZpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxlZFwiXSA9IDgwXSA9IFwiY2lyY2xlRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVIYWxmRmlsbGVkXCJdID0gODFdID0gXCJjaXJjbGVIYWxmRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVJbmZvXCJdID0gODJdID0gXCJjaXJjbGVJbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVMaWdodG5pbmdcIl0gPSA4M10gPSBcImNpcmNsZUxpZ2h0bmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGlsbFwiXSA9IDg0XSA9IFwiY2lyY2xlUGlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGxhbmVcIl0gPSA4NV0gPSBcImNpcmNsZVBsYW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQbHVzXCJdID0gODZdID0gXCJjaXJjbGVQbHVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQb29kbGVcIl0gPSA4N10gPSBcImNpcmNsZVBvb2RsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlVW5maWxsZWRcIl0gPSA4OF0gPSBcImNpcmNsZVVuZmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc05vdGVib29rXCJdID0gODldID0gXCJjbGFzc05vdGVib29rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc3Jvb21cIl0gPSA5MF0gPSBcImNsYXNzcm9vbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xvY2tcIl0gPSA5MV0gPSBcImNsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbHV0dGVyXCJdID0gOTJdID0gXCJjbHV0dGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb2ZmZWVcIl0gPSA5M10gPSBcImNvZmZlZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29sbGFwc2VcIl0gPSA5NF0gPSBcImNvbGxhcHNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb25mbGljdFwiXSA9IDk1XSA9IFwiY29uZmxpY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RcIl0gPSA5Nl0gPSBcImNvbnRhY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RGb3JtXCJdID0gOTddID0gXCJjb250YWN0Rm9ybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdFB1YmxpY1wiXSA9IDk4XSA9IFwiY29udGFjdFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29weVwiXSA9IDk5XSA9IFwiY29weVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY3JlZGl0Q2FyZFwiXSA9IDEwMF0gPSBcImNyZWRpdENhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNyZWRpdENhcmRPdXRsaW5lXCJdID0gMTAxXSA9IFwiY3JlZGl0Q2FyZE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRhc2hib2FyZFwiXSA9IDEwMl0gPSBcImRhc2hib2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGVzY2VuZGluZ1wiXSA9IDEwM10gPSBcImRlc2NlbmRpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRlc2t0b3BcIl0gPSAxMDRdID0gXCJkZXNrdG9wXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXZpY2VXaXBlXCJdID0gMTA1XSA9IFwiZGV2aWNlV2lwZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGlhbHBhZFwiXSA9IDEwNl0gPSBcImRpYWxwYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRpcmVjdGlvbnNcIl0gPSAxMDddID0gXCJkaXJlY3Rpb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFwiXSA9IDEwOF0gPSBcImRvY3VtZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEFkZFwiXSA9IDEwOV0gPSBcImRvY3VtZW50QWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEZvcndhcmRcIl0gPSAxMTBdID0gXCJkb2N1bWVudEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50TGFuZHNjYXBlXCJdID0gMTExXSA9IFwiZG9jdW1lbnRMYW5kc2NhcGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UERGXCJdID0gMTEyXSA9IFwiZG9jdW1lbnRQREZcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UmVwbHlcIl0gPSAxMTNdID0gXCJkb2N1bWVudFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudHNcIl0gPSAxMTRdID0gXCJkb2N1bWVudHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50U2VhcmNoXCJdID0gMTE1XSA9IFwiZG9jdW1lbnRTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvZ1wiXSA9IDExNl0gPSBcImRvZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9nQWx0XCJdID0gMTE3XSA9IFwiZG9nQWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb3RcIl0gPSAxMThdID0gXCJkb3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvd25sb2FkXCJdID0gMTE5XSA9IFwiZG93bmxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRybVwiXSA9IDEyMF0gPSBcImRybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJvcFwiXSA9IDEyMV0gPSBcImRyb3BcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRyb3Bkb3duXCJdID0gMTIyXSA9IFwiZHJvcGRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVkaXRCb3hcIl0gPSAxMjNdID0gXCJlZGl0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbGxpcHNpc1wiXSA9IDEyNF0gPSBcImVsbGlwc2lzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbWJlZFwiXSA9IDEyNV0gPSBcImVtYmVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFwiXSA9IDEyNl0gPSBcImV2ZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudENhbmNlbFwiXSA9IDEyN10gPSBcImV2ZW50Q2FuY2VsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudEluZm9cIl0gPSAxMjhdID0gXCJldmVudEluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50UmVjdXJyaW5nXCJdID0gMTI5XSA9IFwiZXZlbnRSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50U2hhcmVcIl0gPSAxMzBdID0gXCJldmVudFNoYXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleGNsYW1hdGlvblwiXSA9IDEzMV0gPSBcImV4Y2xhbWF0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleHBhbmRcIl0gPSAxMzJdID0gXCJleHBhbmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV5ZVwiXSA9IDEzM10gPSBcImV5ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmF2b3JpdGVzXCJdID0gMTM0XSA9IFwiZmF2b3JpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmYXhcIl0gPSAxMzVdID0gXCJmYXhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkTWFpbFwiXSA9IDEzNl0gPSBcImZpZWxkTWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGROdW1iZXJcIl0gPSAxMzddID0gXCJmaWVsZE51bWJlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRUZXh0XCJdID0gMTM4XSA9IFwiZmllbGRUZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZFRleHRCb3hcIl0gPSAxMzldID0gXCJmaWVsZFRleHRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVEb2N1bWVudFwiXSA9IDE0MF0gPSBcImZpbGVEb2N1bWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZUltYWdlXCJdID0gMTQxXSA9IFwiZmlsZUltYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlUERGXCJdID0gMTQyXSA9IFwiZmlsZVBERlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsdGVyXCJdID0gMTQzXSA9IFwiZmlsdGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWx0ZXJDbGVhclwiXSA9IDE0NF0gPSBcImZpbHRlckNsZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaXJzdEFpZFwiXSA9IDE0NV0gPSBcImZpcnN0QWlkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmbGFnXCJdID0gMTQ2XSA9IFwiZmxhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyXCJdID0gMTQ3XSA9IFwiZm9sZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJNb3ZlXCJdID0gMTQ4XSA9IFwiZm9sZGVyTW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyUHVibGljXCJdID0gMTQ5XSA9IFwiZm9sZGVyUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJTZWFyY2hcIl0gPSAxNTBdID0gXCJmb2xkZXJTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnRDb2xvclwiXSA9IDE1MV0gPSBcImZvbnRDb2xvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udERlY3JlYXNlXCJdID0gMTUyXSA9IFwiZm9udERlY3JlYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250SW5jcmVhc2VcIl0gPSAxNTNdID0gXCJmb250SW5jcmVhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZyb3dueVwiXSA9IDE1NF0gPSBcImZyb3dueVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZnVsbHNjcmVlblwiXSA9IDE1NV0gPSBcImZ1bGxzY3JlZW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdlYXJcIl0gPSAxNTZdID0gXCJnZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnbGFzc2VzXCJdID0gMTU3XSA9IFwiZ2xhc3Nlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2xvYmVcIl0gPSAxNThdID0gXCJnbG9iZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JhcGhcIl0gPSAxNTldID0gXCJncmFwaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JvdXBcIl0gPSAxNjBdID0gXCJncm91cFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhZGVyXCJdID0gMTYxXSA9IFwiaGVhZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydFwiXSA9IDE2Ml0gPSBcImhlYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydEVtcHR5XCJdID0gMTYzXSA9IFwiaGVhcnRFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGlkZVwiXSA9IDE2NF0gPSBcImhpZGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhvbWVcIl0gPSAxNjVdID0gXCJob21lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmJveENoZWNrXCJdID0gMTY2XSA9IFwiaW5ib3hDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5mb1wiXSA9IDE2N10gPSBcImluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluZm9DaXJjbGVcIl0gPSAxNjhdID0gXCJpbmZvQ2lyY2xlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpdGFsaWNcIl0gPSAxNjldID0gXCJpdGFsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImtleVwiXSA9IDE3MF0gPSBcImtleVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGF0ZVwiXSA9IDE3MV0gPSBcImxhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZmVzYXZlclwiXSA9IDE3Ml0gPSBcImxpZmVzYXZlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlmZXNhdmVyTG9ja1wiXSA9IDE3M10gPSBcImxpZmVzYXZlckxvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZ2h0QnVsYlwiXSA9IDE3NF0gPSBcImxpZ2h0QnVsYlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlnaHRuaW5nXCJdID0gMTc1XSA9IFwibGlnaHRuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaW5rXCJdID0gMTc2XSA9IFwibGlua1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlua1JlbW92ZVwiXSA9IDE3N10gPSBcImxpbmtSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RCdWxsZXRzXCJdID0gMTc4XSA9IFwibGlzdEJ1bGxldHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RDaGVja1wiXSA9IDE3OV0gPSBcImxpc3RDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdENoZWNrYm94XCJdID0gMTgwXSA9IFwibGlzdENoZWNrYm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0R3JvdXBcIl0gPSAxODFdID0gXCJsaXN0R3JvdXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RHcm91cDJcIl0gPSAxODJdID0gXCJsaXN0R3JvdXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0TnVtYmVyZWRcIl0gPSAxODNdID0gXCJsaXN0TnVtYmVyZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxvY2tcIl0gPSAxODRdID0gXCJsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsXCJdID0gMTg1XSA9IFwibWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbENoZWNrXCJdID0gMTg2XSA9IFwibWFpbENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRG93blwiXSA9IDE4N10gPSBcIm1haWxEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRWRpdFwiXSA9IDE4OF0gPSBcIm1haWxFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRW1wdHlcIl0gPSAxODldID0gXCJtYWlsRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFcnJvclwiXSA9IDE5MF0gPSBcIm1haWxFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbE9wZW5cIl0gPSAxOTFdID0gXCJtYWlsT3BlblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFBhdXNlXCJdID0gMTkyXSA9IFwibWFpbFBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUHVibGljXCJdID0gMTkzXSA9IFwibWFpbFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFJlYWRcIl0gPSAxOTRdID0gXCJtYWlsUmVhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFNlbmRcIl0gPSAxOTVdID0gXCJtYWlsU2VuZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFN5bmNcIl0gPSAxOTZdID0gXCJtYWlsU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFVucmVhZFwiXSA9IDE5N10gPSBcIm1haWxVbnJlYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1hcE1hcmtlclwiXSA9IDE5OF0gPSBcIm1hcE1hcmtlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVhbFwiXSA9IDE5OV0gPSBcIm1lYWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lbnVcIl0gPSAyMDBdID0gXCJtZW51XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZW51MlwiXSA9IDIwMV0gPSBcIm1lbnUyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXJnZVwiXSA9IDIwMl0gPSBcIm1lcmdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXRhZGF0YVwiXSA9IDIwM10gPSBcIm1ldGFkYXRhXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaWNyb3Bob25lXCJdID0gMjA0XSA9IFwibWljcm9waG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWluaWF0dXJlc1wiXSA9IDIwNV0gPSBcIm1pbmlhdHVyZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pbnVzXCJdID0gMjA2XSA9IFwibWludXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vYmlsZVwiXSA9IDIwN10gPSBcIm1vYmlsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW9uZXlcIl0gPSAyMDhdID0gXCJtb25leVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW92ZVwiXSA9IDIwOV0gPSBcIm1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11bHRpQ2hvaWNlXCJdID0gMjEwXSA9IFwibXVsdGlDaG9pY2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11c2ljXCJdID0gMjExXSA9IFwibXVzaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5hdmlnYXRlXCJdID0gMjEyXSA9IFwibmF2aWdhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5ld1wiXSA9IDIxM10gPSBcIm5ld1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmV3c2ZlZWRcIl0gPSAyMTRdID0gXCJuZXdzZmVlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZVwiXSA9IDIxNV0gPSBcIm5vdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVib29rXCJdID0gMjE2XSA9IFwibm90ZWJvb2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVFZGl0XCJdID0gMjE3XSA9IFwibm90ZUVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVGb3J3YXJkXCJdID0gMjE4XSA9IFwibm90ZUZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVSZXBseVwiXSA9IDIxOV0gPSBcIm5vdGVSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90UmVjdXJyaW5nXCJdID0gMjIwXSA9IFwibm90UmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmVkcml2ZVwiXSA9IDIyMV0gPSBcIm9uZWRyaXZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmxpbmVBZGRcIl0gPSAyMjJdID0gXCJvbmxpbmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9ubGluZUpvaW5cIl0gPSAyMjNdID0gXCJvbmxpbmVKb2luXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvb2ZSZXBseVwiXSA9IDIyNF0gPSBcIm9vZlJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvcmdcIl0gPSAyMjVdID0gXCJvcmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhZ2VcIl0gPSAyMjZdID0gXCJwYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYWludFwiXSA9IDIyN10gPSBcInBhaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYW5lbFwiXSA9IDIyOF0gPSBcInBhbmVsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYXJ0bmVyXCJdID0gMjI5XSA9IFwicGFydG5lclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGF1c2VcIl0gPSAyMzBdID0gXCJwYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVuY2lsXCJdID0gMjMxXSA9IFwicGVuY2lsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVcIl0gPSAyMzJdID0gXCJwZW9wbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUFkZFwiXSA9IDIzM10gPSBcInBlb3BsZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlQ2hlY2tcIl0gPSAyMzRdID0gXCJwZW9wbGVDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlRXJyb3JcIl0gPSAyMzVdID0gXCJwZW9wbGVFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUGF1c2VcIl0gPSAyMzZdID0gXCJwZW9wbGVQYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUmVtb3ZlXCJdID0gMjM3XSA9IFwicGVvcGxlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTZWN1cml0eVwiXSA9IDIzOF0gPSBcInBlb3BsZVNlY3VyaXR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTeW5jXCJdID0gMjM5XSA9IFwicGVvcGxlU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uXCJdID0gMjQwXSA9IFwicGVyc29uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25BZGRcIl0gPSAyNDFdID0gXCJwZXJzb25BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvblJlbW92ZVwiXSA9IDI0Ml0gPSBcInBlcnNvblJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVcIl0gPSAyNDNdID0gXCJwaG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVBZGRcIl0gPSAyNDRdID0gXCJwaG9uZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVUcmFuc2ZlclwiXSA9IDI0NV0gPSBcInBob25lVHJhbnNmZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVcIl0gPSAyNDZdID0gXCJwaWN0dXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlQWRkXCJdID0gMjQ3XSA9IFwicGljdHVyZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZUVkaXRcIl0gPSAyNDhdID0gXCJwaWN0dXJlRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZVJlbW92ZVwiXSA9IDI0OV0gPSBcInBpY3R1cmVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbGxcIl0gPSAyNTBdID0gXCJwaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaW5Eb3duXCJdID0gMjUxXSA9IFwicGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGluTGVmdFwiXSA9IDI1Ml0gPSBcInBpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYWNlaG9sZGVyXCJdID0gMjUzXSA9IFwicGxhY2Vob2xkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYW5lXCJdID0gMjU0XSA9IFwicGxhbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYXlcIl0gPSAyNTVdID0gXCJwbGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbHVzXCJdID0gMjU2XSA9IFwicGx1c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGx1czJcIl0gPSAyNTddID0gXCJwbHVzMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9pbnRJdGVtXCJdID0gMjU4XSA9IFwicG9pbnRJdGVtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb3BvdXRcIl0gPSAyNTldID0gXCJwb3BvdXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvc3RcIl0gPSAyNjBdID0gXCJwb3N0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcmludFwiXSA9IDI2MV0gPSBcInByaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcm90ZWN0aW9uQ2VudGVyXCJdID0gMjYyXSA9IFwicHJvdGVjdGlvbkNlbnRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25cIl0gPSAyNjNdID0gXCJxdWVzdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25SZXZlcnNlXCJdID0gMjY0XSA9IFwicXVlc3Rpb25SZXZlcnNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdW90ZVwiXSA9IDI2NV0gPSBcInF1b3RlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyYWRpb0J1dHRvblwiXSA9IDI2Nl0gPSBcInJhZGlvQnV0dG9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWFjdGl2YXRlXCJdID0gMjY3XSA9IFwicmVhY3RpdmF0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdENoZWNrXCJdID0gMjY4XSA9IFwicmVjZWlwdENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0Rm9yd2FyZFwiXSA9IDI2OV0gPSBcInJlY2VpcHRGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0UmVwbHlcIl0gPSAyNzBdID0gXCJyZWNlaXB0UmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlZnJlc2hcIl0gPSAyNzFdID0gXCJyZWZyZXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWxvYWRcIl0gPSAyNzJdID0gXCJyZWxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5XCJdID0gMjczXSA9IFwicmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsXCJdID0gMjc0XSA9IFwicmVwbHlBbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsQWx0XCJdID0gMjc1XSA9IFwicmVwbHlBbGxBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWx0XCJdID0gMjc2XSA9IFwicmVwbHlBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJpYmJvblwiXSA9IDI3N10gPSBcInJpYmJvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicm9vbVwiXSA9IDI3OF0gPSBcInJvb21cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNhdmVcIl0gPSAyNzldID0gXCJzYXZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzY2hlZHVsaW5nXCJdID0gMjgwXSA9IFwic2NoZWR1bGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VhcmNoXCJdID0gMjgxXSA9IFwic2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWN0aW9uXCJdID0gMjgyXSA9IFwic2VjdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VjdGlvbnNcIl0gPSAyODNdID0gXCJzZWN0aW9uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2V0dGluZ3NcIl0gPSAyODRdID0gXCJzZXR0aW5nc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hhcmVcIl0gPSAyODVdID0gXCJzaGFyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hpZWxkXCJdID0gMjg2XSA9IFwic2hpZWxkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaXRlc1wiXSA9IDI4N10gPSBcInNpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzbWlsZXlcIl0gPSAyODhdID0gXCJzbWlsZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvY2NlclwiXSA9IDI4OV0gPSBcInNvY2NlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29jaWFsTGlzdGVuaW5nXCJdID0gMjkwXSA9IFwic29jaWFsTGlzdGVuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb3J0XCJdID0gMjkxXSA9IFwic29ydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29ydExpbmVzXCJdID0gMjkyXSA9IFwic29ydExpbmVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzcGxpdFwiXSA9IDI5M10gPSBcInNwbGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdGFyXCJdID0gMjk0XSA9IFwic3RhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RhckVtcHR5XCJdID0gMjk1XSA9IFwic3RhckVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdG9wd2F0Y2hcIl0gPSAyOTZdID0gXCJzdG9wd2F0Y2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0b3J5XCJdID0gMjk3XSA9IFwic3RvcnlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0eWxlUmVtb3ZlXCJdID0gMjk4XSA9IFwic3R5bGVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1YnNjcmliZVwiXSA9IDI5OV0gPSBcInN1YnNjcmliZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuXCJdID0gMzAwXSA9IFwic3VuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5BZGRcIl0gPSAzMDFdID0gXCJzdW5BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1blF1ZXN0aW9uXCJdID0gMzAyXSA9IFwic3VuUXVlc3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1cHBvcnRcIl0gPSAzMDNdID0gXCJzdXBwb3J0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZVwiXSA9IDMwNF0gPSBcInRhYmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZXRcIl0gPSAzMDVdID0gXCJ0YWJsZXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhZ1wiXSA9IDMwNl0gPSBcInRhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFza1JlY3VycmluZ1wiXSA9IDMwN10gPSBcInRhc2tSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhc2tzXCJdID0gMzA4XSA9IFwidGFza3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRlYW13b3JrXCJdID0gMzA5XSA9IFwidGVhbXdvcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRleHRcIl0gPSAzMTBdID0gXCJ0ZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZXh0Qm94XCJdID0gMzExXSA9IFwidGV4dEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGlsZVwiXSA9IDMxMl0gPSBcInRpbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRpbWVsaW5lXCJdID0gMzEzXSA9IFwidGltZWxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZGF5XCJdID0gMzE0XSA9IFwidG9kYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZ2dsZVwiXSA9IDMxNV0gPSBcInRvZ2dsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9nZ2xlTWlkZGxlXCJdID0gMzE2XSA9IFwidG9nZ2xlTWlkZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b3VjaFwiXSA9IDMxN10gPSBcInRvdWNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmFzaFwiXSA9IDMxOF0gPSBcInRyYXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZURvd25cIl0gPSAzMTldID0gXCJ0cmlhbmdsZURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlEb3duXCJdID0gMzIwXSA9IFwidHJpYW5nbGVFbXB0eURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlMZWZ0XCJdID0gMzIxXSA9IFwidHJpYW5nbGVFbXB0eUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlSaWdodFwiXSA9IDMyMl0gPSBcInRyaWFuZ2xlRW1wdHlSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eVVwXCJdID0gMzIzXSA9IFwidHJpYW5nbGVFbXB0eVVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUxlZnRcIl0gPSAzMjRdID0gXCJ0cmlhbmdsZUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlUmlnaHRcIl0gPSAzMjVdID0gXCJ0cmlhbmdsZVJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZVVwXCJdID0gMzI2XSA9IFwidHJpYW5nbGVVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJvcGh5XCJdID0gMzI3XSA9IFwidHJvcGh5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1bmRlcmxpbmVcIl0gPSAzMjhdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVuc3Vic2NyaWJlXCJdID0gMzI5XSA9IFwidW5zdWJzY3JpYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVwbG9hZFwiXSA9IDMzMF0gPSBcInVwbG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widmlkZW9cIl0gPSAzMzFdID0gXCJ2aWRlb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsXCJdID0gMzMyXSA9IFwidm9pY2VtYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxGb3J3YXJkXCJdID0gMzMzXSA9IFwidm9pY2VtYWlsRm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsUmVwbHlcIl0gPSAzMzRdID0gXCJ2b2ljZW1haWxSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid2FmZmxlXCJdID0gMzM1XSA9IFwid2FmZmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3b3JrXCJdID0gMzM2XSA9IFwid29ya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid3JlbmNoXCJdID0gMzM3XSA9IFwid3JlbmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ4XCJdID0gMzM4XSA9IFwieFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wieENpcmNsZVwiXSA9IDMzOV0gPSBcInhDaXJjbGVcIjtcbn0pKEljb25FbnVtID0gZXhwb3J0cy5JY29uRW51bSB8fCAoZXhwb3J0cy5JY29uRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUGVyc29uYVNpemU7XG4oZnVuY3Rpb24gKFBlcnNvbmFTaXplKSB7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ0aW55XCJdID0gMF0gPSBcInRpbnlcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhzbWFsbFwiXSA9IDFdID0gXCJ4c21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInNtYWxsXCJdID0gMl0gPSBcInNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJtZWRpdW1cIl0gPSAzXSA9IFwibWVkaXVtXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJsYXJnZVwiXSA9IDRdID0gXCJsYXJnZVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieGxhcmdlXCJdID0gNV0gPSBcInhsYXJnZVwiO1xufSkoUGVyc29uYVNpemUgPSBleHBvcnRzLlBlcnNvbmFTaXplIHx8IChleHBvcnRzLlBlcnNvbmFTaXplID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9zaXplRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQcmVzZW5jZUVudW07XG4oZnVuY3Rpb24gKFByZXNlbmNlRW51bSkge1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJhdmFpbGFibGVcIl0gPSAwXSA9IFwiYXZhaWxhYmxlXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImF3YXlcIl0gPSAxXSA9IFwiYXdheVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJibG9ja2VkXCJdID0gMl0gPSBcImJsb2NrZWRcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYnVzeVwiXSA9IDNdID0gXCJidXN5XCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImRuZFwiXSA9IDRdID0gXCJkbmRcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wib2ZmbGluZVwiXSA9IDVdID0gXCJvZmZsaW5lXCI7XG59KShQcmVzZW5jZUVudW0gPSBleHBvcnRzLlByZXNlbmNlRW51bSB8fCAoZXhwb3J0cy5QcmVzZW5jZUVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBicmVhZGNydW1iTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iRGlyZWN0aXZlXCIpO1xudmFyIGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmVcIik7XG52YXIgY2FsbG91dE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZVwiKTtcbnZhciBjaG9pY2VmaWVsZE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlXCIpO1xudmFyIGNvbW1hbmRCYXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmVcIik7XG52YXIgY29udGVudE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NvbnRlbnQvY29udGVudERpcmVjdGl2ZVwiKTtcbnZhciBjb250ZXh0dWFsTWVudU1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51XCIpO1xudmFyIGRhdGVwaWNrZXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXJEaXJlY3RpdmVcIik7XG52YXIgZGlhbG9nTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZVwiKTtcbnZhciBkcm9wZG93bk1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlXCIpO1xudmFyIGZhY2VwaWxlTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZmFjZXBpbGUvZmFjZXBpbGVEaXJlY3RpdmVcIik7XG52YXIgaWNvbk1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZVwiKTtcbnZhciBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2xhYmVsL2xhYmVsRGlyZWN0aXZlXCIpO1xudmFyIGxpbmtNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmVcIik7XG52YXIgbGlzdE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2xpc3QvbGlzdERpcmVjdGl2ZVwiKTtcbnZhciBtZXNzYWdlQmFubmVyTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbWVzc2FnZWJhbm5lci9tZXNzYWdlQmFubmVyRGlyZWN0aXZlXCIpO1xudmFyIG1lc3NhZ2VCYXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJEaXJlY3RpdmVcIik7XG52YXIgbmF2QmFyTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZVwiKTtcbnZhciBvcmdDaGFydE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0RGlyZWN0aXZlXCIpO1xudmFyIG92ZXJsYXlNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmVcIik7XG52YXIgcGFuZWxNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZVwiKTtcbnZhciBwZW9wbGVQaWNrZXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlXCIpO1xudmFyIHBlcnNvbmFjYXJkTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmVcIik7XG52YXIgcGVyc29uYU1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZVwiKTtcbnZhciBwaXZvdE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3Bpdm90L3Bpdm90RGlyZWN0aXZlXCIpO1xudmFyIHByb2dyZXNzSW5kaWNhdG9yTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmVcIik7XG52YXIgc2VhcmNoYm94TW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZVwiKTtcbnZhciBzcGlubmVyTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlXCIpO1xudmFyIHRhYmxlTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmVcIik7XG52YXIgdGV4dEZpZWxkTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZVwiKTtcbnZhciB0b2dnbGVNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy90b2dnbGUvdG9nZ2xlRGlyZWN0aXZlXCIpO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cycsIFtcbiAgICBicmVhZGNydW1iTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGJ1dHRvbk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjYWxsb3V0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNob2ljZWZpZWxkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNvbW1hbmRCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY29udGVudE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb250ZXh0dWFsTWVudU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkYXRlcGlja2VyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRpYWxvZ01vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkcm9wZG93bk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBmYWNlcGlsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBpY29uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxhYmVsTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxpbmtNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGlzdE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBtZXNzYWdlQmFubmVyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG1lc3NhZ2VCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbmF2QmFyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG9yZ0NoYXJ0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG92ZXJsYXlNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGFuZWxNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGVvcGxlUGlja2VyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFjYXJkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGl2b3RNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcHJvZ3Jlc3NJbmRpY2F0b3JNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgc2VhcmNoYm94TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHNwaW5uZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGFibGVNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGV4dEZpZWxkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRvZ2dsZU1vZHVsZS5tb2R1bGUubmFtZVxuXSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2NvbXBvbmVudHMudHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29yZScsIFtdKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvY29yZS50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkJyZWFkY3J1bWInO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxsaSBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1saXN0SXRlbVxcXCI+XFxuICAgIDxhIGNsYXNzPVxcXCJtcy1CcmVhZGNydW1iLWl0ZW1MaW5rXFxcIiBuZy1ocmVmPVxcXCJ7e25nSHJlZn19XFxcIiB0YWJpbmRleD1cXFwie3t1aWZUYWJpbmRleH19XFxcIiBuZy10cmFuc2NsdWRlPjwvYT5cXG4gICAgPGkgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItY2hldnJvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgPC9saT5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIHRhYmluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkuY2hpbGRyZW4oKSwgaW5zdGFuY2VFbGVtZW50WzBdKSArIDI7XG4gICAgICAgIHNjb3BlLnVpZlRhYmluZGV4ID0gdGFiaW5kZXg7XG4gICAgfTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iTGlua0RpcmVjdGl2ZSA9IEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlO1xudmFyIEJyZWFkY3J1bWJMaW5rID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iTGluayhocmVmLCBsaW5rVGV4dCkge1xuICAgICAgICB0aGlzLmhyZWYgPSBocmVmO1xuICAgICAgICB0aGlzLmxpbmtUZXh0ID0gbGlua1RleHQ7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZGNydW1iTGluaztcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJMaW5rID0gQnJlYWRjcnVtYkxpbms7XG52YXIgQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJDb250cm9sbGVyKCRzY29wZSwgJGRvY3VtZW50LCAkd2luZG93KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICB9XG4gICAgcmV0dXJuIEJyZWFkY3J1bWJDb250cm9sbGVyO1xufSgpKTtcbkJyZWFkY3J1bWJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZG9jdW1lbnQnLCAnJHdpbmRvdyddO1xuZXhwb3J0cy5CcmVhZGNydW1iQ29udHJvbGxlciA9IEJyZWFkY3J1bWJDb250cm9sbGVyO1xudmFyIEJyZWFkY3J1bWJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYlxcXCIgbmctY2xhc3M9XFxcInsnaXMtb3ZlcmZsb3cnOiBpc092ZXJmbG93KCl9XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1vdmVyZmxvd1xcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1vdmVyZmxvd0J1dHRvbiBtcy1JY29uIG1zLUljb24tLWVsbGlwc2lzXFxcIlxcbiAgICAgICAgICAgbmctY2xpY2s9XFxcIm9wZW5PdmVyZmxvdygkZXZlbnQpXFxcIiB0YWJpbmRleD1cXFwiMVxcXCI+PC9kaXY+XFxuICAgICAgPGkgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItY2hldnJvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItb3ZlcmZsb3dNZW51XFxcIiBuZy1jbGFzcz1cXFwieydpcy1vcGVuJzogb3ZlcmZsb3dNZW51T3Blbn1cXFwiPlxcbiAgICAgICAgPHVsIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudSBpcy1vcGVuXFxcIj5cXG4gICAgICAgICAgPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtXFxcIlxcbiAgICAgICAgICAgICAgbmctcmVwZWF0PVxcXCJsaW5rIGluIHVpZkJyZWFkY3J1bWJMaW5rcyB8IGxpbWl0VG86b3ZlcmZsb3dFbGVtZW50cygpXFxcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtbGlua1xcXCIgbmctaHJlZj1cXFwie3tsaW5rLmhyZWZ9fVxcXCI+e3tsaW5rLmxpbmtUZXh0fX08L2E+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPHVsIGNsYXNzPVxcXCJtcy1CcmVhZGNydW1iLWxpc3RcXFwiPlxcbiAgICAgIDx1aWYtYnJlYWRjcnVtYi1saW5rIG5nLXJlcGVhdD1cXFwibGluayBpbiB1aWZCcmVhZGNydW1iTGlua3MgfCBsaW1pdFRvOi12aXNpYmxlRWxlbWVudHNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctaHJlZj1cXFwie3tsaW5rLmhyZWZ9fVxcXCI+e3tsaW5rLmxpbmtUZXh0fX08L3VpZi1icmVhZGNydW1iLWxpbms+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICd1aWZCcmVhZGNydW1iJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZCcmVhZGNydW1iTGlua3MnOiAnPSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5TTUFMTF9CUkVBS19QT0lOVCA9IDYzOTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGluc3RhbmNlRWxlbWVudCwgJGF0dHJzLCAkYnJlYWRjcnVtYkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICRzY29wZS52aXNpYmxlRWxlbWVudHMgPSA0O1xuICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5pc092ZXJmbG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvdmVyZmxvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLnVpZkJyZWFkY3J1bWJMaW5rcykgJiYgJHNjb3BlLnVpZkJyZWFkY3J1bWJMaW5rcy5sZW5ndGggPiAkc2NvcGUudmlzaWJsZUVsZW1lbnRzO1xuICAgICAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub3ZlcmZsb3dFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzT3ZlcmZsb3coKSA/ICRzY29wZS51aWZCcmVhZGNydW1iTGlua3MubGVuZ3RoIC0gJHNjb3BlLnZpc2libGVFbGVtZW50cyA6IDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLm9wZW5PdmVyZmxvdyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICRzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGJyZWFkY3J1bWJDb250cm9sbGVyLiR3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub25SZXNpemUoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkYnJlYWRjcnVtYkNvbnRyb2xsZXIuJGRvY3VtZW50LmZpbmQoJ2h0bWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplID0gZnVuY3Rpb24gKGlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXJXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzVG9TaG93ID0gKGlubmVyV2lkdGggPiBfdGhpcy5TTUFMTF9CUkVBS19QT0lOVCkgPyA0IDogMjtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudHNUb1Nob3cgIT09ICRzY29wZS52aXNpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpc2libGVFbGVtZW50cyA9IGVsZW1lbnRzVG9TaG93O1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vblJlc2l6ZSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBCcmVhZGNydW1iRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIEJyZWFkY3J1bWJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iRGlyZWN0aXZlID0gQnJlYWRjcnVtYkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnJlYWRjcnVtYicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJyZWFkY3J1bWInLCBCcmVhZGNydW1iRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCcmVhZGNydW1iTGluaycsIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgYnV0dG9uVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL2J1dHRvblR5cGVFbnVtXCIpO1xudmFyIGJ1dHRvblRlbXBsYXRlVHlwZV8xID0gcmVxdWlyZShcIi4vYnV0dG9uVGVtcGxhdGVUeXBlXCIpO1xudmFyIEJ1dHRvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gQnV0dG9uQ29udHJvbGxlcjtcbn0oKSk7XG5CdXR0b25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbnZhciBCdXR0b25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnV0dG9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnYnV0dG9uJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoJGF0dHJzLnVpZlR5cGUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQoYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVskYXR0cnMudWlmVHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uIC0gVW5zdXBwb3J0ZWQgYnV0dG9uOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBidXR0b24gKFxcJycgKyAkYXR0cnMudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnMudWlmVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLnByaW1hcnldOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZEJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmhlcm9dOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZUh0bWxUZW1wbGF0ZXMoKTtcbiAgICB9XG4gICAgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGluayxcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlR5cGUpIHx8XG4gICAgICAgICAgICBhdHRycy51aWZUeXBlID09PSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0ucHJpbWFyeV0gfHxcbiAgICAgICAgICAgIGF0dHJzLnVpZlR5cGUgPT09IGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF0pIHtcbiAgICAgICAgICAgIHZhciBpY29uRWxlbWVudCA9IGVsZW1lbnQuZmluZCgndWlmLWljb24nKTtcbiAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVycy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5idXR0b24gLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0ljb24gbm90IGFsbG93ZWQgaW4gcHJpbWFyeSBvciBjb21wb3VuZCBidXR0b25zOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmltYXJ5ICYgY29tcG91bmQgYnV0dG9uIGRvZXMgbm90IHN1cHBvcnQgaW5jbHVkaW5nIGljb25zIGluIHRoZSBib2R5LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBpY29uIGhhcyBiZWVuIHJlbW92ZWQgYnV0IG1heSBjYXVzZSByZW5kZXJpbmcgZXJyb3JzLiBDb25zaWRlciBidXR0b25zIHRoYXQgc3VwcG9ydCBpY29ucyBzdWNoIGFzIGNvbW1hbmQgb3IgaGVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIHdyYXBwZXI7XG4gICAgICAgICAgICBzd2l0Y2ggKGF0dHJzLnVpZlR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21tYW5kXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9pc1ZhbGlkTGFiZWwoY2xvbmVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1sYWJlbCcpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VJRi1JQ09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24taWNvbicpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0uY29tcG91bmRdOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VJRi1JQ09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9pc1ZhbGlkTGFiZWwoY2xvbmVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1sYWJlbCcpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0uaGVyb106XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5faXNWYWxpZExhYmVsKGNsb25lW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWljb24nKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuX2lzVmFsaWRMYWJlbCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICByZXR1cm4gY2xvbmUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIGNsb25lLm5vZGVWYWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuX3BvcHVsYXRlSHRtbFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b25cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25MaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b25cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLXByaW1hcnlcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZEJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21tYW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbXBvdW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZExpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbXBvdW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0J1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1oZXJvXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5oZXJvTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0taGVyb1xcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CdXR0b25EaXJlY3RpdmUgPSBCdXR0b25EaXJlY3RpdmU7XG52YXIgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkJ1dHRvbic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUJ1dHRvbi1kZXNjcmlwdGlvblwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgfVxuICAgIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlID0gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQnV0dG9uJywgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b25EZXNjcmlwdGlvbicsIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQnV0dG9uVGVtcGxhdGVUeXBlO1xuKGZ1bmN0aW9uIChCdXR0b25UZW1wbGF0ZVR5cGUpIHtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiYWN0aW9uQnV0dG9uXCJdID0gMF0gPSBcImFjdGlvbkJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJhY3Rpb25MaW5rXCJdID0gMV0gPSBcImFjdGlvbkxpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wicHJpbWFyeUJ1dHRvblwiXSA9IDJdID0gXCJwcmltYXJ5QnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcInByaW1hcnlMaW5rXCJdID0gM10gPSBcInByaW1hcnlMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbW1hbmRCdXR0b25cIl0gPSA0XSA9IFwiY29tbWFuZEJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21tYW5kTGlua1wiXSA9IDVdID0gXCJjb21tYW5kTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21wb3VuZEJ1dHRvblwiXSA9IDZdID0gXCJjb21wb3VuZEJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21wb3VuZExpbmtcIl0gPSA3XSA9IFwiY29tcG91bmRMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImhlcm9CdXR0b25cIl0gPSA4XSA9IFwiaGVyb0J1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJoZXJvTGlua1wiXSA9IDldID0gXCJoZXJvTGlua1wiO1xufSkoQnV0dG9uVGVtcGxhdGVUeXBlID0gZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGUgfHwgKGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblRlbXBsYXRlVHlwZS50c1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQnV0dG9uVHlwZUVudW07XG4oZnVuY3Rpb24gKEJ1dHRvblR5cGVFbnVtKSB7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJwcmltYXJ5XCJdID0gMF0gPSBcInByaW1hcnlcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImNvbW1hbmRcIl0gPSAxXSA9IFwiY29tbWFuZFwiO1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wiY29tcG91bmRcIl0gPSAyXSA9IFwiY29tcG91bmRcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImhlcm9cIl0gPSAzXSA9IFwiaGVyb1wiO1xufSkoQnV0dG9uVHlwZUVudW0gPSBleHBvcnRzLkJ1dHRvblR5cGVFbnVtIHx8IChleHBvcnRzLkJ1dHRvblR5cGVFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDYWxsb3V0QXJyb3c7XG4oZnVuY3Rpb24gKENhbGxvdXRBcnJvdykge1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJsZWZ0XCJdID0gMF0gPSBcImxlZnRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wicmlnaHRcIl0gPSAxXSA9IFwicmlnaHRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1widG9wXCJdID0gMl0gPSBcInRvcFwiO1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJib3R0b21cIl0gPSAzXSA9IFwiYm90dG9tXCI7XG59KShDYWxsb3V0QXJyb3cgPSBleHBvcnRzLkNhbGxvdXRBcnJvdyB8fCAoZXhwb3J0cy5DYWxsb3V0QXJyb3cgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBjYWxsb3V0VHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL2NhbGxvdXRUeXBlRW51bVwiKTtcbnZhciBjYWxsb3V0QXJyb3dFbnVtXzEgPSByZXF1aXJlKFwiLi9jYWxsb3V0QXJyb3dFbnVtXCIpO1xudmFyIENhbGxvdXRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIHJldHVybiBDYWxsb3V0Q29udHJvbGxlcjtcbn0oKSk7XG5DYWxsb3V0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuZXhwb3J0cy5DYWxsb3V0Q29udHJvbGxlciA9IENhbGxvdXRDb250cm9sbGVyO1xudmFyIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtaGVhZGVyXCI+PHAgY2xhc3M9XCJtcy1DYWxsb3V0LXRpdGxlXCIgbmctdHJhbnNjbHVkZT48L3A+PC9kaXY+JztcbiAgICB9XG4gICAgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBtYWluV3JhcHBlciA9IGluc3RhbmNlRWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKTtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzVW5kZWZpbmVkKG1haW5XcmFwcGVyKSAmJiBtYWluV3JhcHBlci5oYXNDbGFzcygnbXMtQ2FsbG91dC1tYWluJykpIHtcbiAgICAgICAgICAgIHZhciBkZXRhY2hlZEhlYWRlciA9IGluc3RhbmNlRWxlbWVudC5kZXRhY2goKTtcbiAgICAgICAgICAgIG1haW5XcmFwcGVyLnByZXBlbmQoZGV0YWNoZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXRIZWFkZXJEaXJlY3RpdmUgPSBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlO1xudmFyIENhbGxvdXRDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1jb250ZW50XCI+PHAgY2xhc3M9XCJtcy1DYWxsb3V0LXN1YlRleHRcIiBuZy10cmFuc2NsdWRlPjwvcD48L2Rpdj4nO1xuICAgIH1cbiAgICBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dENvbnRlbnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0Q29udGVudERpcmVjdGl2ZSA9IENhbGxvdXRDb250ZW50RGlyZWN0aXZlO1xudmFyIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1hY3Rpb25zXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXj91aWZDYWxsb3V0JztcbiAgICB9XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNhbGxvdXRDb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KGNhbGxvdXRDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJHNjb3BlLiR3YXRjaCgnaGFzU2VwYXJhdG9yJywgZnVuY3Rpb24gKGhhc1NlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNoaWxkcmVuID0gaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYnV0dG9uSW5kZXggPSAwOyBidXR0b25JbmRleCA8IGFjdGlvbkNoaWxkcmVuLmxlbmd0aDsgYnV0dG9uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbkNoaWxkcmVuLmVxKGJ1dHRvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hZGRDbGFzcygnbXMtQ2FsbG91dC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFucyA9IGFjdGlvbi5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzcGFuSW5kZXggPSAwOyBzcGFuSW5kZXggPCBhY3Rpb25TcGFucy5sZW5ndGg7IHNwYW5JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvblNwYW4gPSBhY3Rpb25TcGFucy5lcShzcGFuSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24tbGFiZWwnKSB8fCBhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24taWNvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblNwYW4uYWRkQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSA9IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlO1xudmFyIENhbGxvdXREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0XCIgJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJnZXRDYWxsb3V0Q2xhc3NlcygpXCI+ICcgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LW1haW5cIj48ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1pbm5lclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZDYWxsb3V0J107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ1Nob3c6ICc9PycsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ2FsbG91dENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudWlmQXJyb3dDbGFzc2VzID0gKF9hID0ge30sXG4gICAgICAgICAgICBfYVtjYWxsb3V0QXJyb3dFbnVtXzEuQ2FsbG91dEFycm93LmJvdHRvbV0gPSAnbXMtQ2FsbG91dC0tYXJyb3dCb3R0b20nLFxuICAgICAgICAgICAgX2FbY2FsbG91dEFycm93RW51bV8xLkNhbGxvdXRBcnJvdy5sZWZ0XSA9ICdtcy1DYWxsb3V0LS1hcnJvd0xlZnQnLFxuICAgICAgICAgICAgX2FbY2FsbG91dEFycm93RW51bV8xLkNhbGxvdXRBcnJvdy5yaWdodF0gPSAnbXMtQ2FsbG91dC0tYXJyb3dSaWdodCcsXG4gICAgICAgICAgICBfYVtjYWxsb3V0QXJyb3dFbnVtXzEuQ2FsbG91dEFycm93LnRvcF0gPSAnbXMtQ2FsbG91dC0tYXJyb3dUb3AnLFxuICAgICAgICAgICAgX2EpO1xuICAgICAgICB0aGlzLnVpZlR5cGVDbGFzc2VzID0gKF9iID0ge30sXG4gICAgICAgICAgICBfYltjYWxsb3V0VHlwZUVudW1fMS5DYWxsb3V0VHlwZS5vb2JlXSA9ICdtcy1DYWxsb3V0LS1PT0JFJyxcbiAgICAgICAgICAgIF9iW2NhbGxvdXRUeXBlRW51bV8xLkNhbGxvdXRUeXBlLnBlZWtdID0gJ21zLUNhbGxvdXQtLVBlZWsnLFxuICAgICAgICAgICAgX2IpO1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgIH1cbiAgICBDYWxsb3V0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNhbGxvdXRDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCd1aWZUeXBlJywgZnVuY3Rpb24gKGNhbGxvdXRUeXBlKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChjYWxsb3V0VHlwZUVudW1fMS5DYWxsb3V0VHlwZVtjYWxsb3V0VHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGNhbGxvdXRUeXBlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiBJdCBzaG91bGQgYmUgb29iZSBvciBwZWVrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndWlmQXJyb3cnLCBmdW5jdGlvbiAoYXR0ckFycm93RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0ckFycm93RGlyZWN0aW9uKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKGNhbGxvdXRBcnJvd0VudW1fMS5DYWxsb3V0QXJyb3dbYXR0ckFycm93RGlyZWN0aW9uXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ckFycm93RGlyZWN0aW9uICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZBcnJvdy4gSXQgc2hvdWxkIGJlIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5hcnJvd0RpcmVjdGlvbiA9IGF0dHJBcnJvd0RpcmVjdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmhhc1NlcGFyYXRvciA9ICghYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZBY3Rpb25UZXh0KSB8fCAhYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZTZXBhcmF0b3IpKTtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNsb3NlKSkge1xuICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPGJ1dHRvbiBjbGFzcz1cIm1zLUNhbGxvdXQtY2xvc2VcIiB0eXBlPVwiYnV0dG9uXCI+JyArXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPicgK1xuICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nKTtcbiAgICAgICAgICAgIHZhciBjYWxsb3V0RGl2ID0gaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2RpdicpLmVxKDApO1xuICAgICAgICAgICAgY2FsbG91dERpdi5hcHBlbmQoY2xvc2VCdXR0b25FbGVtZW50KTtcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNjb3BlLmNsb3NlQnV0dG9uQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYmluZCgnbW91c2VlbnRlcicsIGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgc2NvcGUuaXNNb3VzZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYmluZCgnbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgc2NvcGUuaXNNb3VzZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1Nob3cnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaXNDbG9zaW5nQnlCdXR0b25DbGljayA9ICFuZXdWYWx1ZSAmJiBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQ7XG4gICAgICAgICAgICBpZiAoaXNDbG9zaW5nQnlCdXR0b25DbGljaykge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IHNjb3BlLmNsb3NlQnV0dG9uQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmV3VmFsdWUgJiYgYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZDbG9zZSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBzY29wZS5pc01vdXNlT3ZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc01vdXNlT3ZlcicsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICAgaWYgKCFuZXdWYWwgJiYgb2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29wZS5jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5nZXRDYWxsb3V0Q2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjYWxsb3V0Q2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGNhbGxvdXRUeXBlID0gY2FsbG91dFR5cGVFbnVtXzEuQ2FsbG91dFR5cGVbc2NvcGUudWlmVHlwZV07XG4gICAgICAgICAgICB2YXIgY2FsbG91dEFycm93ID0gYW5ndWxhci5pc0RlZmluZWQoc2NvcGUuYXJyb3dEaXJlY3Rpb24pID8gY2FsbG91dEFycm93RW51bV8xLkNhbGxvdXRBcnJvd1tzY29wZS5hcnJvd0RpcmVjdGlvbl0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoY2FsbG91dFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENsYXNzZXMucHVzaChfdGhpcy51aWZUeXBlQ2xhc3Nlc1tjYWxsb3V0VHlwZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGNhbGxvdXRBcnJvdykpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q2xhc3Nlcy5wdXNoKF90aGlzLnVpZkFycm93Q2xhc3Nlc1tjYWxsb3V0QXJyb3ddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY29wZS5jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGNhbGxvdXRDbGFzc2VzLnB1c2goJ21zLUNhbGxvdXQtLWNsb3NlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2NvcGUuaGFzU2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENsYXNzZXMucHVzaCgnbXMtQ2FsbG91dC0tYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxvdXRDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dERpcmVjdGl2ZSA9IENhbGxvdXREaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNhbGxvdXQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0JywgQ2FsbG91dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEhlYWRlcicsIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRDb250ZW50JywgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRBY3Rpb25zJywgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDYWxsb3V0VHlwZTtcbihmdW5jdGlvbiAoQ2FsbG91dFR5cGUpIHtcbiAgICBDYWxsb3V0VHlwZVtDYWxsb3V0VHlwZVtcIm9vYmVcIl0gPSAwXSA9IFwib29iZVwiO1xuICAgIENhbGxvdXRUeXBlW0NhbGxvdXRUeXBlW1wicGVla1wiXSA9IDFdID0gXCJwZWVrXCI7XG59KShDYWxsb3V0VHlwZSA9IGV4cG9ydHMuQ2FsbG91dFR5cGUgfHwgKGV4cG9ydHMuQ2FsbG91dFR5cGUgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIGNob2ljZWZpZWxkVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL2Nob2ljZWZpZWxkVHlwZUVudW1cIik7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyO1xufSgpKTtcbkNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlciA9IENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbnZhciBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkXCI+JyArXG4gICAgICAgICAgICAnPGlucHV0IGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZC1pbnB1dFwiIHR5cGU9XCJ7e3VpZlR5cGV9fVwiIHZhbHVlPVwie3t2YWx1ZX19XCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiICAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy10cnVlLXZhbHVlPVwie3tuZ1RydWVWYWx1ZX19XCIgbmctZmFsc2UtdmFsdWU9XCJ7e25nRmFsc2VWYWx1ZX19XCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZC1maWVsZFwiPjxzcGFuIGNsYXNzPVwibXMtTGFiZWxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj48L2xhYmVsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRPcHRpb24nLCAnXj91aWZDaG9pY2VmaWVsZEdyb3VwJ107XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0ZhbHNlVmFsdWU6ICdAJyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCcsXG4gICAgICAgICAgICB2YWx1ZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IHRlbXBsYXRlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICBpZiAoISgnbmdNb2RlbCcgaW4gdGVtcGxhdGVBdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignbmctbW9kZWwnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2hvaWNlZmllbGRUeXBlRW51bV8xLkNob2ljZWZpZWxkVHlwZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jaG9pY2VmaWVsZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZFR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHJlbmRlcl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGVja2VkID0gKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmdldFZpZXdWYWx1ZSgpID09PSBhdHRycy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmFkZFJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndmFsdWUnLCByZW5kZXJfMSk7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAub24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnJlbW92ZVJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50U2NvcGUgPSBzY29wZS4kcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgIHZhciBjaGVja0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzICYmIGF0dHJzLmRpc2FibGVkO1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSBzY29wZS5kaXNhYmxlZCB8fCAocGFyZW50U2NvcGUgIT0gbnVsbCAmJiBwYXJlbnRTY29wZS5kaXNhYmxlZCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY2hlY2tEaXNhYmxlZCgpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBwYXJlbnRTY29wZSA9PSBudWxsID8gJycgOiBwYXJlbnRTY29wZS5kaXNhYmxlZDsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBjaGVja0Rpc2FibGVkKCk7IH0pKTtcbiAgICAgICAgY2hlY2tEaXNhYmxlZCgpO1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIuc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5zZXRWaWV3VmFsdWUoYXR0cnMudmFsdWUsIGV2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSA9IENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlO1xudmFyIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZEdyb3VwLXRpdGxlXCI+PG5nLXRyYW5zY2x1ZGUgLz48L2Rpdj4nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUgPSBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMgPSBbXTtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmFkZFJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5wdXNoKGZuKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVSZW5kZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMuc3BsaWNlKHRoaXMucmVuZGVyRm5zLmluZGV4T2YoZm4pKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGV2ZW50VHlwZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Vmlld1ZhbHVlKCkgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0RGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldFZpZXdWYWx1ZSh2YWx1ZSwgZXZlbnRUeXBlKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5zZXRUb3VjaGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlbmRlckZucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJGbnNbaV0oKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xufSgpKTtcbkNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRzY29wZSddO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNob2ljZWZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZE9wdGlvbicsIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZEdyb3VwJywgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRHcm91cFRpdGxlJywgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDaG9pY2VmaWVsZFR5cGU7XG4oZnVuY3Rpb24gKENob2ljZWZpZWxkVHlwZSkge1xuICAgIENob2ljZWZpZWxkVHlwZVtDaG9pY2VmaWVsZFR5cGVbXCJyYWRpb1wiXSA9IDBdID0gXCJyYWRpb1wiO1xuICAgIENob2ljZWZpZWxkVHlwZVtDaG9pY2VmaWVsZFR5cGVbXCJjaGVja2JveFwiXSA9IDFdID0gXCJjaGVja2JveFwiO1xufSkoQ2hvaWNlZmllbGRUeXBlID0gZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGUgfHwgKGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIENvbW1hbmRCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNvbW1hbmRCYXJcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgdWlmU2VhcmNoVGVybTogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbW1hbmRCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICB7XG4gICAgICAgICAgICBzY29wZS5mb2N1c1NlYXJjaElucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmNsZWFyU2VhcmNoVGVybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZTZWFyY2hUZXJtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzY29wZS5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyRGlyZWN0aXZlID0gQ29tbWFuZEJhckRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoXFxcIiBuZy1jbGFzcz1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9PSB0cnVlID8gJ2lzLWFjdGl2ZScgOiAnJztcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWlucHV0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7JHBhcmVudC5wbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVxcXCIxXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWZvY3VzPVxcXCIkcGFyZW50LmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctYmx1cj1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiJHBhcmVudC51aWZTZWFyY2hUZXJtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbldyYXBwZXIgbXMtQ29tbWFuZEJhclNlYXJjaC1pY29uU2VhcmNoV3JhcHBlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcIiRwYXJlbnQuZm9jdXNTZWFyY2hJbnB1dCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJzZWFyY2hcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWljb25XcmFwcGVyIG1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbkNsZWFyV3JhcHBlciBtcy1mb250LXNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vdXNlZG93bj1cXFwiJHBhcmVudC5jbGVhclNlYXJjaFRlcm0oKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwieFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSA9IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFyLXNpZGVDb21tYW5kc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyLW1haW5BcmVhXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cXFwidWlmU2hvd092ZXJmbG93XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtIG1zLUNvbW1hbmRCYXJJdGVtLS1pY29uT25seSBtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvd1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJvdmVyZmxvd1Zpc2libGUgPT0gdHJ1ZSA/ICdpcy12aXNpYmxlJyA6ICcnO1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJvcGVuT3ZlcmZsb3dNZW51KClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbS1saW5rXFxcIiB0YWJpbmRleD1cXFwiMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcImVsbGlwc2lzXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZTaG93T3ZlcmZsb3c6ICc9J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCR0aW1lb3V0KSB7IHJldHVybiBuZXcgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHNjb3BlLm9wZW5PdmVyZmxvd01lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gIXNjb3BlLm92ZXJmbG93TWVudU9wZW47XG4gICAgICAgICAgICB2YXIgY29udGV4dHVhbE1lbnU7XG4gICAgICAgICAgICBjb250ZXh0dWFsTWVudSA9IFwiIDx1aWYtY29udGV4dHVhbC1tZW51IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyLW92ZXJmbG93TWVudVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1pcy1vcGVuPVxcXCJvdmVyZmxvd01lbnVPcGVuXFxcIlxcbiAgICAgICAgICAgICAgdWlmLWNsb3NlLW9uLWNsaWNrPVxcXCJmYWxzZVxcXCI+XCI7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhckl0ZW0tb3ZlcmZsb3cgLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyIHVsJykpLnJlbW92ZSgpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLmhpZGRlbkl0ZW1zLCBmdW5jdGlvbiAobWVudWl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAobWVudWl0ZW0uc3VibWVudSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudSArPSBcIjx1aWYtY29udGV4dHVhbC1tZW51LWl0ZW0gbmctbW9kZWw9XFxcImhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9J29wZW5PdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdKSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXRleHQ9J2hpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXS50ZXh0J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1zaG93PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udmlzaWJsZSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcInN1Yk1lbnVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtY29udGV4dHVhbC1tZW51PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz0nb3Blbk92ZXJmbG93SXRlbShzdWJpdGVtKSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdzdWJpdGVtLnRleHQnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGlua1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwic3ViaXRlbSBpbiBoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0uc3VibWVudWl0ZW1zIHRyYWNrIGJ5ICRpbmRleFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gXCI8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIG5nLW1vZGVsPVxcXCJoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPSdvcGVuT3ZlcmZsb3dJdGVtKGhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udGV4dCdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctc2hvdz0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnZpc2libGUnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJsaW5rXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gJzwvPHVpZi1jb250ZXh0dWFsLW1lbnU+JztcbiAgICAgICAgICAgIHZhciBtZW51O1xuICAgICAgICAgICAgbWVudSA9IGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93IC5tcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlcicpO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG1lbnUpLmFwcGVuZChjdHJsLiRjb21waWxlKGNvbnRleHR1YWxNZW51KShzY29wZSkpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zID0gZnVuY3Rpb24gKGNvbW1hbmRJdGVtcykge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRJdGVtV2lkdGggPSAwO1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRJdGVtSW5kZXggPSAwO1xuICAgICAgICAgICAgc2NvcGUuY29tbWFuZEl0ZW1zID0gW107XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY29tbWFuZEl0ZW1zLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuaGFzQ2xhc3MoJ21zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93JykgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEl0ZW1XaWR0aCArPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5jb21tYW5kSXRlbXMucHVzaCh7IGluZGV4OiBjb21tYW5kSXRlbUluZGV4LCBvZmZzZXQ6IGNvbW1hbmRJdGVtV2lkdGggfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJdGVtSW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUub3Blbk92ZXJmbG93SXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zdWJtZW51aXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goaXRlbS5zdWJtZW51LmNoaWxkcmVuLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VibWVudWl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtID0ge307XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLnRleHQgPSBlbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgc3VibWVudWl0ZW0ubWVudVR5cGUgPSAnaXRlbSc7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLmNoaWxkaXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLmkgPSBpdGVtLnN1Ym1lbnVpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLnBhcmVudCA9IGl0ZW0uaTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdWJtZW51aXRlbXMucHVzaChzdWJtZW51aXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHJsLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRpdGVtID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpW2l0ZW0ucGFyZW50XS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29udGV4dHVhbE1lbnUtaXRlbScpW2l0ZW0uaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQobSkudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtpdGVtLmldKS50cmlnZ2VySGFuZGxlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kQmFySXRlbXM7XG4gICAgICAgICAgICBjb21tYW5kQmFySXRlbXMgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhci1tYWluQXJlYSAubXMtQ29tbWFuZEJhckl0ZW0nKSk7XG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA2NDAgJiYgc2NvcGUubW9iaWxlU3dpdGNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoY29tbWFuZEJhckl0ZW1zKTtcbiAgICAgICAgICAgICAgICBzY29wZS5tb2JpbGVTd2l0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNjQwICYmIHNjb3BlLm1vYmlsZVN3aXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoY29tbWFuZEJhckl0ZW1zKTtcbiAgICAgICAgICAgICAgICBzY29wZS5tb2JpbGVTd2l0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5jb21tYW5kSXRlbXMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0ID49IGVsZW0ucHJvcCgnb2Zmc2V0V2lkdGgnKSAtIDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtlbGVtZW50LmluZGV4XSkuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5oaWRkZW5JdGVtc1tlbGVtZW50LmluZGV4XS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpW2VsZW1lbnQuaW5kZXhdKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmhpZGRlbkl0ZW1zW2VsZW1lbnQuaW5kZXhdLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdHJsLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kb24oJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KHdpbmRvdykuYmluZCgncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuJGJyb2FkY2FzdCgndWlmLWNvbW1hbmQtYmFyLXJlc2l6ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpKSk7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJNYWluRGlyZWN0aXZlID0gQ29tbWFuZEJhck1haW5EaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhck1haW5Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGNvbXBpbGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGNvbXBpbGUgPSAkY29tcGlsZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgIH1cbiAgICBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE92ZXJmbG93SXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLiRzY29wZS5oaWRkZW5JdGVtcyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5oaWRkZW5JdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uaSA9IHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMucHVzaChpdGVtKTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG59KCkpO1xuQ29tbWFuZEJhck1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckY29tcGlsZScsICckdGltZW91dCddO1xuZXhwb3J0cy5Db21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG52YXIgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclwiPicgK1xuICAgICAgICAgICAgJyA8YSBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtcIj4nICtcbiAgICAgICAgICAgICcgPC9hPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmQ29tbWFuZEJhck1haW4nO1xuICAgIH1cbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkl0ZW07XG4gICAgICAgICAgICBoaWRkZW5JdGVtID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9uZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5hZGQoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTmFtZS5pbmRleE9mKCdtcy1mb250LScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0LmFkZCgnbXMtZm9udC1tJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0udGV4dCA9IGNsb25lW2ldLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVTCcgJiYgY2xvbmVbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLnN1Ym1lbnUgPSBjbG9uZVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChoaWRkZW5JdGVtLnN1Ym1lbnUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLm1lbnVUeXBlID0gJ2xpbmsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuSXRlbS5tZW51VHlwZSA9ICdzdWJNZW51JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3RybC5hZGRPdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsgPiB1aWYtaWNvbicpKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbScpKS5hZGRDbGFzcygnbXMtQ29tbWFuZEJhckl0ZW0taGFzVGV4dE9ubHknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSBDb21tYW5kQmFySXRlbURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29tbWFuZGJhcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhcicsIENvbW1hbmRCYXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXJTZWFyY2gnLCBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFySXRlbScsIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyTWFpbicsIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyU2lkZScsIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIENvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRlbnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8c3BhbiBjbGFzcz1cXFwidWlmLWNvbnRlbnRcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlwiO1xuICAgIH1cbiAgICBDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGVudERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRlbnREaXJlY3RpdmU7XG59KCkpO1xuQ29udGVudERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRlbnQnO1xuZXhwb3J0cy5Db250ZW50RGlyZWN0aXZlID0gQ29udGVudERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGVudCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZShDb250ZW50RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuaXNQaWNraW5nWWVhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BpY2tpbmdNb250aHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGF0ZUZvcm1hdCA9ICdkIG1tbW0sIHl5eXknO1xuICAgICAgICB0aGlzLmpFbGVtZW50ID0gJCgkZWxlbWVudFswXSk7XG4gICAgICAgIHRoaXMuZGlzcGxheURhdGVGb3JtYXQgPSAkc2NvcGUudWlmRGF0ZUZvcm1hdDtcbiAgICAgICAgJHNjb3BlLmN0cmwgPSB0aGlzO1xuICAgIH1cbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucmFuZ2UgPSBmdW5jdGlvbiAobWluLCBtYXgsIHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgICAgICAgdmFyIGlucHV0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSBtaW47IGkgPD0gbWF4OyBpICs9IHN0ZXApIHtcbiAgICAgICAgICAgIGlucHV0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBpY2tlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLVRleHRGaWVsZC1maWVsZCcpLnBpY2thZGF0ZSgncGlja2VyJyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRQaWNrZXIoKS5zZXQoJ3NlbGVjdCcsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VIaWdobGlnaHRlZERhdGUodmFsdWUuZ2V0RnVsbFllYXIoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RGF0ZSgpKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0RGF0ZXBpY2tlciA9IGZ1bmN0aW9uIChuZ01vZGVsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5qRWxlbWVudC5maW5kKCcubXMtVGV4dEZpZWxkLWZpZWxkJykucGlja2FkYXRlKHtcbiAgICAgICAgICAgIGNsZWFyOiAnJyxcbiAgICAgICAgICAgIGNsb3NlOiAnJyxcbiAgICAgICAgICAgIGZvcm1hdDogc2VsZi5kaXNwbGF5RGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGtsYXNzOiB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiAnbXMtRGF0ZVBpY2tlci1pbnB1dC0tYWN0aXZlJyxcbiAgICAgICAgICAgICAgICBib3g6ICdtcy1EYXRlUGlja2VyLWRheVBpY2tlcicsXG4gICAgICAgICAgICAgICAgZGF5OiAnbXMtRGF0ZVBpY2tlci1kYXknLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnbXMtRGF0ZVBpY2tlci1kYXktLWRpc2FibGVkJyxcbiAgICAgICAgICAgICAgICBmb2N1c2VkOiAnbXMtRGF0ZVBpY2tlci1waWNrZXItLWZvY3VzZWQnLFxuICAgICAgICAgICAgICAgIGZyYW1lOiAnbXMtRGF0ZVBpY2tlci1mcmFtZScsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnbXMtRGF0ZVBpY2tlci1oZWFkZXInLFxuICAgICAgICAgICAgICAgIGhvbGRlcjogJ21zLURhdGVQaWNrZXItaG9sZGVyJyxcbiAgICAgICAgICAgICAgICBpbmZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLWluZm9jdXMnLFxuICAgICAgICAgICAgICAgIGlucHV0OiAnbXMtRGF0ZVBpY2tlci1pbnB1dCcsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdtcy1EYXRlUGlja2VyLW1vbnRoJyxcbiAgICAgICAgICAgICAgICBub3c6ICdtcy1EYXRlUGlja2VyLWRheS0tdG9kYXknLFxuICAgICAgICAgICAgICAgIG9wZW5lZDogJ21zLURhdGVQaWNrZXItcGlja2VyLS1vcGVuZWQnLFxuICAgICAgICAgICAgICAgIG91dGZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLW91dGZvY3VzJyxcbiAgICAgICAgICAgICAgICBwaWNrZXI6ICdtcy1EYXRlUGlja2VyLXBpY2tlcicsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdtcy1EYXRlUGlja2VyLWRheS0tc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgIHRhYmxlOiAnbXMtRGF0ZVBpY2tlci10YWJsZScsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6ICdtcy1EYXRlUGlja2VyLXdlZWtkYXknLFxuICAgICAgICAgICAgICAgIHdyYXA6ICdtcy1EYXRlUGlja2VyLXdyYXAnLFxuICAgICAgICAgICAgICAgIHllYXI6ICdtcy1EYXRlUGlja2VyLXllYXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5pdEN1c3RvbVZpZXcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2RheTogJycsXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIHBpY2tlci5vbih7XG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxVcCgpO1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsKSAmJiBuZ01vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBwaWNrZXIuZ2V0KCdzZWxlY3QnLCAneXl5eS1tbS1kZCcpO1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsKSAmJiBuZ01vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0Q3VzdG9tVmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRtb250aENvbnRyb2xzID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1tb250aENvbXBvbmVudHMnKTtcbiAgICAgICAgdmFyICRnb1RvZGF5ID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1nb1RvZGF5Jyk7XG4gICAgICAgIHZhciAkbW9udGhQaWNrZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLW1vbnRoUGlja2VyJyk7XG4gICAgICAgIHZhciAkeWVhclBpY2tlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXIteWVhclBpY2tlcicpO1xuICAgICAgICB2YXIgJHBpY2tlcldyYXBwZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLXdyYXAnKTtcbiAgICAgICAgdmFyICRwaWNrZXIgPSB0aGlzLmdldFBpY2tlcigpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICRtb250aENvbnRyb2xzLmFwcGVuZFRvKCRwaWNrZXJXcmFwcGVyKTtcbiAgICAgICAgJGdvVG9kYXkuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkbW9udGhQaWNrZXIuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkeWVhclBpY2tlci5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtcHJldk1vbnRoJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoIC0gMTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG51bGwsIG5ld01vbnRoLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoQ29udHJvbHMub24oJ2NsaWNrJywgJy5qcy1uZXh0TW9udGgnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykubW9udGggKyAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobnVsbCwgbmV3TW9udGgsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2WWVhcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgLSAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLW5leHRZZWFyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciArIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2RGVjYWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciAtIDEwO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR5ZWFyUGlja2VyLm9uKCdjbGljaycsICcuanMtbmV4dERlY2FkZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgKyAxMDtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkZ29Ub2RheS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICRwaWNrZXIuc2V0KCdzZWxlY3QnLCBub3cpO1xuICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ01vbnRocycpLnJlbW92ZUNsYXNzKCdpcy1waWNraW5nWWVhcnMnKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gY3VycmVudERhdGUueWVhcjtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9ICskKHRoaXMpLmF0dHIoJ2RhdGEtbW9udGgnKTtcbiAgICAgICAgICAgIHZhciBuZXdEYXkgPSBjdXJyZW50RGF0ZS5kYXRlO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbmV3TW9udGgsIG5ld0RheSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5qRWxlbWVudC5oYXNDbGFzcygnaXMtcGlja2luZ01vbnRocycpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ01vbnRocycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkeWVhclBpY2tlci5vbignY2xpY2snLCAnLmpzLWNoYW5nZURhdGUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICB2YXIgbmV3WWVhciA9ICskKHRoaXMpLmF0dHIoJ2RhdGEteWVhcicpO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gY3VycmVudERhdGUubW9udGg7XG4gICAgICAgICAgICB2YXIgbmV3RGF5ID0gY3VycmVudERhdGUuZGF0ZTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuakVsZW1lbnQuaGFzQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ1llYXJzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtc2hvd01vbnRoUGlja2VyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmlzUGlja2luZ01vbnRocyA9ICFzZWxmLmlzUGlja2luZ01vbnRocztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtc2hvd1llYXJQaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuaXNQaWNraW5nWWVhcnMgPSAhc2VsZi5pc1BpY2tpbmdZZWFycztcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi4kc2NvcGUuaGlnaGxpZ2h0ZWRWYWx1ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zY3JvbGxVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRoaXMuakVsZW1lbnQub2Zmc2V0KCkudG9wIH0sIDM2Nyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlID0gZnVuY3Rpb24gKG5ld1llYXIsIG5ld01vbnRoLCBuZXdEYXkpIHtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIGlmIChuZXdZZWFyID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld1llYXIgPSBwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS55ZWFyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNb250aCA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdNb250aCA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEYXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3RGF5ID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0JykuZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBwaWNrZXIuc2V0KCdoaWdobGlnaHQnLCBbbmV3WWVhciwgbmV3TW9udGgsIG5ld0RheV0pO1xuICAgICAgICB0aGlzLiRzY29wZS5oaWdobGlnaHRlZFZhbHVlID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgfTtcbiAgICByZXR1cm4gRGF0ZXBpY2tlckNvbnRyb2xsZXI7XG59KCkpO1xuRGF0ZXBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJ107XG5leHBvcnRzLkRhdGVwaWNrZXJDb250cm9sbGVyID0gRGF0ZXBpY2tlckNvbnRyb2xsZXI7XG52YXIgRGF0ZXBpY2tlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGF0ZXBpY2tlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwie1xcJ21zLURhdGVQaWNrZXJcXCc6IHRydWUsIFxcJ2lzLXBpY2tpbmdZZWFyc1xcJzogY3RybC5pc1BpY2tpbmdZZWFycywgXFwnaXMtcGlja2luZ01vbnRoc1xcJzogY3RybC5pc1BpY2tpbmdNb250aHN9XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVRleHRGaWVsZFwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1ldmVudCBtcy1JY29uIG1zLUljb24tLWV2ZW50XCI+PC9pPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBjbGFzcz1cIm1zLVRleHRGaWVsZC1maWVsZFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBuZy1kaXNhYmxlZD1cImlzRGlzYWJsZWRcIj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1tb250aENvbXBvbmVudHNcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbmV4dE1vbnRoIGpzLW5leHRNb250aFwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1wcmV2TW9udGgganMtcHJldk1vbnRoXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25MZWZ0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1oZWFkZXJUb2dnbGVWaWV3IGpzLXNob3dNb250aFBpY2tlclwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1nb1RvZGF5IGpzLWdvVG9kYXlcIj5HbyB0byB0b2RheTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1tb250aFBpY2tlclwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWhlYWRlclwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLXllYXJDb21wb25lbnRzXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLW5leHRZZWFyIGpzLW5leHRZZWFyXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLXByZXZZZWFyIGpzLXByZXZZZWFyXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25MZWZ0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1jdXJyZW50WWVhciBqcy1zaG93WWVhclBpY2tlclwiPnt7aGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyfX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1vcHRpb25HcmlkXCIgPicgK1xuICAgICAgICAgICAgJzxzcGFuIG5nLXJlcGVhdD1cIm1vbnRoIGluIG1vbnRoc0FycmF5XCInICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyLW1vbnRoT3B0aW9uIGpzLWNoYW5nZURhdGVcXCc6IHRydWUsICcgK1xuICAgICAgICAgICAgJ1xcJ2lzLWhpZ2hsaWdodGVkXFwnOiBoaWdobGlnaHRlZFZhbHVlLm1vbnRoID09ICRpbmRleH1cIicgK1xuICAgICAgICAgICAgJ2RhdGEtbW9udGg9XCJ7eyRpbmRleH19XCI+JyArXG4gICAgICAgICAgICAne3ttb250aH19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLXllYXJQaWNrZXJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1kZWNhZGVDb21wb25lbnRzXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLW5leHREZWNhZGUganMtbmV4dERlY2FkZVwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1wcmV2RGVjYWRlIGpzLXByZXZEZWNhZGVcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvbkxlZnRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLWN1cnJlbnREZWNhZGVcIj57e2hpZ2hsaWdodGVkVmFsdWUueWVhciAtIDEwfX0gLSB7e2hpZ2hsaWdodGVkVmFsdWUueWVhcn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItb3B0aW9uR3JpZFwiPicgK1xuICAgICAgICAgICAgJzxzcGFuIG5nLWNsYXNzPVwie1xcJ21zLURhdGVQaWNrZXIteWVhck9wdGlvbiBqcy1jaGFuZ2VEYXRlXFwnOiB0cnVlLCcgK1xuICAgICAgICAgICAgJ1xcJ2lzLWhpZ2hsaWdodGVkXFwnOiBoaWdobGlnaHRlZFZhbHVlLnllYXIgPT0geWVhcn1cIiAnICtcbiAgICAgICAgICAgICduZy1yZXBlYXQ9XCJ5ZWFyIGluIGN0cmwucmFuZ2UoaGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyIC0gMTAsIGhpZ2hsaWdodGVkVmFsdWUueWVhcilcIicgK1xuICAgICAgICAgICAgJ2RhdGEteWVhcj1cInt7eWVhcn19XCI+e3t5ZWFyfX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRGF0ZXBpY2tlckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgdWlmRGF0ZUZvcm1hdDogJ0AnLFxuICAgICAgICAgICAgdWlmTW9udGhzOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZEYXRlcGlja2VyJywgJz9uZ01vZGVsJ107XG4gICAgfVxuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEYXRlcGlja2VyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rLFxuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGluc3RhbmNlQXR0cmlidXRlcywgY3RybHMpIHtcbiAgICAgICAgaWYgKCEkc2NvcGUudWlmTW9udGhzKSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmTW9udGhzID0gJ0phbiwgRmViLCBNYXIsIEFwciwgTWF5LCBKdW4sIEp1bCwgQXVnLCBTZXAsIE9jdCwgTm92LCBEZWMnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghJHNjb3BlLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAkc2NvcGUucGxhY2Vob2xkZXIgPSAnU2VsZWN0IGEgZGF0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEkc2NvcGUudWlmRGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgJHNjb3BlLnVpZkRhdGVGb3JtYXQgPSAnZCBtbW1tLCB5eXl5JztcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUubW9udGhzQXJyYXkgPSAkc2NvcGUudWlmTW9udGhzLnNwbGl0KCcsJyk7XG4gICAgICAgIGlmICgkc2NvcGUubW9udGhzQXJyYXkubGVuZ3RoICE9PSAxMikge1xuICAgICAgICAgICAgdGhyb3cgJ01vbnRocyBzZXR0aW5nIHNob3VsZCBoYXZlIDEyIG1vbnRocywgc2VwYXJhdGVkIGJ5IGEgY29tbWEnO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlQXR0cmlidXRlcy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICRzY29wZS5pc0Rpc2FibGVkID0gISFkaXNhYmxlZDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIGRhdGVwaWNrZXJDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBuZ01vZGVsID0gY3RybHNbMV07XG4gICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLmluaXREYXRlcGlja2VyKG5nTW9kZWwpO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmdNb2RlbCkgJiYgbmdNb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsLiRtb2RlbFZhbHVlICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICYmIG5nTW9kZWwuJG1vZGVsVmFsdWUgIT09ICcnXG4gICAgICAgICAgICAgICAgICAgICYmIHR5cGVvZiBuZ01vZGVsLiRtb2RlbFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5nTW9kZWwuJG1vZGVsVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKG5nTW9kZWwuJG1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuc2V0VmFsdWUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlcGlja2VyQ29udHJvbGxlci5zZXRWYWx1ZShuZ01vZGVsLiRtb2RlbFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsLiRzZXRQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEYXRlcGlja2VyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGF0ZXBpY2tlckRpcmVjdGl2ZSA9IERhdGVwaWNrZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRhdGVwaWNrZXInLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRhdGVwaWNrZXInLCBEYXRlcGlja2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIGRpYWxvZ0VudW1zXzEgPSByZXF1aXJlKFwiLi9kaWFsb2dFbnVtc1wiKTtcbnZhciBEaWFsb2dDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dDb250cm9sbGVyKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgcmV0dXJuIERpYWxvZ0NvbnRyb2xsZXI7XG59KCkpO1xuRGlhbG9nQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5leHBvcnRzLkRpYWxvZ0NvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xudmFyIERpYWxvZ0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEaWFsb2dDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2dcIicgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwieyBcXCdtcy1EaWFsb2ctLWNsb3NlXFwnOiB1aWZDbG9zZT09XFwndHJ1ZVxcJycgK1xuICAgICAgICAgICAgJywgXFwnbXMtRGlhbG9nLS1sZ0hlYWRlclxcJzogdWlmVHlwZT09XFwnaGVhZGVyXFwnJyArXG4gICAgICAgICAgICAnLCBcXCdtcy1EaWFsb2ctLW11bHRpbGluZVxcJzogdWlmVHlwZT09XFwnbXVsdGlsaW5lXFwnIH1cIj4nICtcbiAgICAgICAgICAgICc8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XCJ7e3VpZk92ZXJsYXl9fVwiPjwvdWlmLW92ZXJsYXk+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1tYWluXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmQ2xvc2U6ICdAJyxcbiAgICAgICAgICAgIHVpZk92ZXJsYXk6ICdAJyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFsb2dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAobmV3VmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dFbnVtc18xLkRpYWxvZ1R5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nIC0gVW5zdXBwb3J0ZWQgdHlwZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dEaXJlY3RpdmUgPSBEaWFsb2dEaXJlY3RpdmU7XG52YXIgRGlhbG9nSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeXnVpZkRpYWxvZyc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiJHBhcmVudC51aWZDbG9zZVwiIGNsYXNzPVwibXMtRGlhbG9nLWJ1dHRvbiBtcy1EaWFsb2ctYnV0dG9uLS1jbG9zZVwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dIZWFkZXJEaXJlY3RpdmUgPSBEaWFsb2dIZWFkZXJEaXJlY3RpdmU7XG52YXIgRGlhbG9nQ29udGVudERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQ29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWNvbnRlbnRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nQ29udGVudERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0NvbnRlbnREaXJlY3RpdmUgPSBEaWFsb2dDb250ZW50RGlyZWN0aXZlO1xudmFyIERpYWxvZ0lubmVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dJbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nLWlubmVyXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dJbm5lckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0lubmVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nSW5uZXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dJbm5lckRpcmVjdGl2ZSA9IERpYWxvZ0lubmVyRGlyZWN0aXZlO1xudmFyIERpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ1N1YnRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHAgY2xhc3M9XCJtcy1EaWFsb2ctc3ViVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9wPic7XG4gICAgfVxuICAgIERpYWxvZ1N1YnRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nU3VidGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ1N1YnRleHREaXJlY3RpdmUgPSBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlO1xudmFyIERpYWxvZ0FjdGlvbnNDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIHJldHVybiBEaWFsb2dBY3Rpb25zQ29udHJvbGxlcjtcbn0oKSk7XG5EaWFsb2dBY3Rpb25zQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5leHBvcnRzLkRpYWxvZ0FjdGlvbnNDb250cm9sbGVyID0gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXI7XG52YXIgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1hY3Rpb25zXCI+PGRpdiBuZy1jbGFzcz1cInsgXFwnbXMtRGlhbG9nLWFjdGlvbnNSaWdodFxcJzogdWlmUG9zaXRpb249PVxcJ3JpZ2h0XFwnfVwiPicgK1xuICAgICAgICAgICAgJzxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L2Rpdj48L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmUG9zaXRpb246ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZQb3NpdGlvbicsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG5ld1ZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlhbG9nRW51bXNfMS5EaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nIC0gVW5zdXBwb3J0ZWQgdHlwZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSAoXFwnJyArIHNjb3BlLnVpZlBvc2l0aW9uICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRpYWxvZ0FjdGlvbnNEaXJlY3RpdmUgPSBEaWFsb2dBY3Rpb25zRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kaWFsb2cnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2cnLCBEaWFsb2dEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0hlYWRlcicsIERpYWxvZ0hlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nQ29udGVudCcsIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0lubmVyJywgRGlhbG9nSW5uZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ1N1YnRleHQnLCBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dBY3Rpb25zJywgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBEaWFsb2dUeXBlRW51bTtcbihmdW5jdGlvbiAoRGlhbG9nVHlwZUVudW0pIHtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIERpYWxvZ1R5cGVFbnVtW0RpYWxvZ1R5cGVFbnVtW1wiaGVhZGVyXCJdID0gMV0gPSBcImhlYWRlclwiO1xuICAgIERpYWxvZ1R5cGVFbnVtW0RpYWxvZ1R5cGVFbnVtW1wibXVsdGlsaW5lXCJdID0gMl0gPSBcIm11bHRpbGluZVwiO1xufSkoRGlhbG9nVHlwZUVudW0gPSBleHBvcnRzLkRpYWxvZ1R5cGVFbnVtIHx8IChleHBvcnRzLkRpYWxvZ1R5cGVFbnVtID0ge30pKTtcbnZhciBEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtO1xuKGZ1bmN0aW9uIChEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtKSB7XG4gICAgRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW1wibm9uZVwiXSA9IDBdID0gXCJub25lXCI7XG4gICAgRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW1wibGVmdFwiXSA9IDFdID0gXCJsZWZ0XCI7XG4gICAgRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtW1wicmlnaHRcIl0gPSAyXSA9IFwicmlnaHRcIjtcbn0pKERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gPSBleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gfHwgKGV4cG9ydHMuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50c1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmRHJvcGRvd24nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBkcm9wZG93bkNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKCFkcm9wZG93bkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHRocm93ICdEcm9wZG93biBjb250cm9sbGVyIG5vdCBmb3VuZCEnO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudFxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuc2V0Vmlld1ZhbHVlKGluc3RhbmNlRWxlbWVudC50ZXh0KCksIGF0dHJzLnZhbHVlLCBldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB2YWx1ZSA9ICcnICsgZHJvcGRvd25Db250cm9sbGVyLmdldFZpZXdWYWx1ZSgpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgPT09IGF0dHJzLnZhbHVlKSB7XG4gICAgICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuc2V0Vmlld1ZhbHVlKGF0dHJzLnRpdGxlLCBhdHRycy52YWx1ZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gRHJvcGRvd25PcHRpb25EaXJlY3RpdmU7XG52YXIgRHJvcGRvd25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bkNvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSwgJGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgIH1cbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLiRzY29wZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmlzT3BlbiA9ICFzZWxmLiRzY29wZS5pc09wZW47XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3duV2lkdGggPSBhbmd1bGFyLmVsZW1lbnQodGhpcy5xdWVyeVNlbGVjdG9yKCcubXMtRHJvcGRvd24nKSlbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KHRoaXMucXVlcnlTZWxlY3RvcignLm1zLURyb3Bkb3duLWl0ZW1zJykpWzBdLnN0eWxlLndpZHRoID0gZHJvcGRvd25XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kc2NvcGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudENsaWNrSGFuZGxlcl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGRvY3VtZW50Lm9mZignY2xpY2snLCBkb2N1bWVudENsaWNrSGFuZGxlcl8xKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZG9jdW1lbnQub24oJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kc2NvcGUubmdNb2RlbCAhPT0gdW5kZWZpbmVkICYmIHNlbGYuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5uZ01vZGVsLiRzZXRUb3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHNlbGYuJGVsZW1lbnQuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbi5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc2VsZi4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gYW5ndWxhci5lbGVtZW50KG9wdGlvbikudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodGl0bGUsIHZhbHVlLCBldmVudFR5cGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRzZXRWaWV3VmFsdWUodmFsdWUsIGV2ZW50VHlwZSk7XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5uZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bkNvbnRyb2xsZXI7XG59KCkpO1xuRHJvcGRvd25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRzY29wZScsICckZG9jdW1lbnQnXTtcbmV4cG9ydHMuRHJvcGRvd25Db250cm9sbGVyID0gRHJvcGRvd25Db250cm9sbGVyO1xudmFyIERyb3Bkb3duRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsaWNrPVwiZHJvcGRvd25DbGlja1wiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLURyb3Bkb3duXFwnIDogdHJ1ZSwgXFwnaXMtb3BlblxcJzogaXNPcGVuLCBcXCdpcy1kaXNhYmxlZFxcJzogZGlzYWJsZWR9XCIgdGFiaW5kZXg9XCIwXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1jYXJldERvd24gbXMtSWNvbiBtcy1JY29uLS1jYXJldERvd25cIj48L2k+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1Ecm9wZG93bi10aXRsZVwiPnt7c2VsZWN0ZWRUaXRsZX19PC9zcGFuPjx1bCBjbGFzcz1cIm1zLURyb3Bkb3duLWl0ZW1zXCI+PG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPjwvdWw+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZEcm9wZG93bicsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge307XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERyb3Bkb3duQ29udHJvbGxlcjtcbiAgICB9XG4gICAgRHJvcGRvd25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEcm9wZG93bkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRHJvcGRvd25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEcm9wZG93bkRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBpbnN0YW5jZUF0dHJpYnV0ZXMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBkcm9wZG93bkNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuaW5pdCgpO1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5zdGFuY2VFbGVtZW50LmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgc2NvcGUuZGlzYWJsZWQgPSB0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnOyB9KSk7XG4gICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBpbnN0YW5jZUF0dHJpYnV0ZXM7XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ecm9wZG93bkRpcmVjdGl2ZSA9IERyb3Bkb3duRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kcm9wZG93bicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmRHJvcGRvd25PcHRpb24nLCBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRHJvcGRvd24nLCBEcm9wZG93bkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bkRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIEZhY2VwaWxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGYWNlcGlsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz1cXFwibXMtRmFjZXBpbGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtRmFjZXBpbGUtbWVtYmVyc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIG5nLXJlcGVhdD1cXFwibWVtYmVyIGluIG1lbWJlcnMgdHJhY2sgYnkgJGluZGV4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVxcXCJidXR0b25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWlmID1cXFwiJGluZGV4IDwgdWlmT3ZlcmZsb3dMaW1pdFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLUZhY2VwaWxlLWl0ZW1CdG4gbXMtRmFjZXBpbGUtaXRlbUJ0bi0tbWVtYmVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cXFwie3ttZW1iZXIucHJpbWFyeVRleHR9fVxcXCIgdGFiaW5kZXg9XFxcIjBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYSB1aWYtc3R5bGU9XFxcInJvdW5kXFxcIiB1aWYtc2l6ZT1cXFwieHNtYWxsXFxcIiB1aWYtaW1hZ2UtdXJsPVxcXCJ7e21lbWJlci5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3ttZW1iZXIuY29sb3J9fVxcXCI+e3ttZW1iZXIuaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGVyc29uYT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXNob3c9XFxcInVpZk92ZXJmbG93TGltaXQgPiAwICYmIG1lbWJlcnMubGVuZ3RoID4gdWlmT3ZlcmZsb3dMaW1pdFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwib3ZlcmZsb3dQYW5lbElzT3BlbiA9IHRydWU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1pdGVtQnRuIG1zLUZhY2VwaWxlLWl0ZW1CdG4tLW92ZXJmbG93IGpzLW92ZXJmbG93UGFuZWwgaXMtYWN0aXZlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtRmFjZXBpbGUtb3ZlcmZsb3dUZXh0XFxcIj4re3ttZW1iZXJzLmxlbmd0aCAtIHVpZk92ZXJmbG93TGltaXR9fTwvc3BhblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wYW5lbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibWVkaXVtXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwib3ZlcmZsb3dQYW5lbElzT3BlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNob3ctb3ZlcmxheT1cXFwidHJ1ZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNob3ctY2xvc2U9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBhbmVsLWhlYWRlcj57e21lbWJlcnMubGVuZ3RofX0ge3t1aWZGYWNlcGlsZU5hbWV9fTwvdWlmLXBhbmVsLWhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1jb250ZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJtZW1iZXIgaW4gbWVtYmVycyB0cmFjayBieSAkaW5kZXhcXFwiIHRpdGxlPVxcXCJ7e21lbWJlci5wcmltYXJ5VGV4dH19XFxcIiB0YWJpbmRleD1cXFwiMFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEgdWlmLXN0eWxlPVxcXCJyb3VuZFxcXCIgdWlmLXNpemU9XFxcIm1lZGl1bVxcXCIgdWlmLWltYWdlLXVybD1cXFwie3ttZW1iZXIuaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3ttZW1iZXIuY29sb3J9fVxcXCI+e3ttZW1iZXIuaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3ttZW1iZXIucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3ttZW1iZXIuc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRlbnQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1wYW5lbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG1lbWJlcnM6ICc9bmdNb2RlbCcsXG4gICAgICAgICAgICB1aWZGYWNlcGlsZU5hbWU6ICdAdWlmRmFjZXBpbGVOYW1lJyxcbiAgICAgICAgICAgIHVpZk92ZXJmbG93TGltaXQ6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBGYWNlcGlsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEZhY2VwaWxlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRmFjZXBpbGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5GYWNlcGlsZURpcmVjdGl2ZSA9IEZhY2VwaWxlRGlyZWN0aXZlO1xudmFyIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1pdGVtQnRuIG1zLUZhY2VwaWxlLWl0ZW1CdG4tLWFkZFBlcnNvbiBqcy1hZGRQZXJzb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwicGVvcGxlcGlja2VyUGFuZWxJc09wZW4gPSB0cnVlO1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1hZGRQZXJzb25JY29uIG1zLUljb24gbXMtSWNvbi0tcGVyc29uQWRkXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGFuZWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJsYXJnZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1pcy1vcGVuPVxcXCJwZW9wbGVwaWNrZXJQYW5lbElzT3BlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1zaG93LW92ZXJsYXk9XFxcInRydWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtc2hvdy1jbG9zZT1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wYW5lbC1oZWFkZXI+e3twZW9wbGVQaWNrZXJQbGFjZWhvbGRlcn19PC91aWYtcGFuZWwtaGVhZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtY29udGVudD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtcGVvcGxlPVxcXCJvbkZhY2VQaWxlU2VhcmNoXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XFxcInBhcmVudFNjb3BlLm1lbWJlcnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtc2VhcmNoLWRlbGF5PVxcXCI1MDBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwiZmFjZVBpbGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtc2VsZWN0ZWQtcGVvcGxlLWhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tzZWxlY3RlZEZhY2VQaWxlUGVvcGxlLmxlbmd0aH19IHNlbGVjdGVkIHBlcnNvbihzKVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXNlbGVjdGVkLXBlb3BsZS1oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtc2VhcmNoLW1vcmU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXByaW1hcnktdGV4dCB1aWYtc2VhcmNoLWZvci10ZXh0PVxcXCJZb3UgYXJlIHNlYXJjaGluZyBmb3I6IFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VhcmNoIG9yZ2FuaXphdGlvbiBwZW9wbGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlb3BsZS1zZWFyY2gtbW9yZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGVvcGxlLXBpY2tlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGFuZWw+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvbkZhY2VQaWxlU2VhcmNoOiAnPXVpZlBlb3BsZScsXG4gICAgICAgICAgICBwZW9wbGVQaWNrZXJQbGFjZWhvbGRlcjogJ0BwbGFjZWhvbGRlcidcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIHNjb3BlLnBhcmVudFNjb3BlID0gc2NvcGUuJHBhcmVudC4kcGFyZW50O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlID0gRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5mYWNlcGlsZScsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmRmFjZXBpbGUnLCBGYWNlcGlsZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRmFjZXBpbGVBZGRJY29uJywgRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2ZhY2VwaWxlL2ZhY2VwaWxlRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgaWNvbkVudW1fMSA9IHJlcXVpcmUoXCIuL2ljb25FbnVtXCIpO1xudmFyIEljb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJY29uQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIHJldHVybiBJY29uQ29udHJvbGxlcjtcbn0oKSk7XG5JY29uQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG52YXIgSWNvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSWNvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0te3t1aWZUeXBlfX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBJY29uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnaWNvbic7XG4gICAgfVxuICAgIEljb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBJY29uRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpY29uRW51bV8xLkljb25FbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5pY29uIC0gVW5zdXBwb3J0ZWQgaWNvbjogJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgaWNvbiAoXFwnJyArIHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEljb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5JY29uRGlyZWN0aXZlID0gSWNvbkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuaWNvbicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmSWNvbicsIEljb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgTGFiZWxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExhYmVsRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nUmVxdWlyZWQ6ICc8PydcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGFiZWwgY2xhc3M9XCJtcy1MYWJlbFwiPjxuZy10cmFuc2NsdWRlLz48L2xhYmVsPic7XG4gICAgfVxuICAgIExhYmVsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExhYmVsRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGxhYmVsID0gaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2xhYmVsJykuZXEoMCk7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRyaWJ1dGVzLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3MoJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJpYnV0ZXMucmVxdWlyZWQpKSB7XG4gICAgICAgICAgICBsYWJlbC5hZGRDbGFzcygnaXMtcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ25nUmVxdWlyZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsYWJlbC5hZGRDbGFzcygnaXMtcmVxdWlyZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQgJiYgIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwucmVtb3ZlQ2xhc3MoJ2lzLXJlcXVpcmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIExhYmVsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGFiZWxEaXJlY3RpdmUgPSBMYWJlbERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGFiZWwnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMYWJlbCcsIExhYmVsRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2xhYmVsL2xhYmVsRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgTGlua0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlua0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8YSBuZy1ocmVmPVwie3sgbmdIcmVmIH19XCIgY2xhc3M9XCJtcy1MaW5rXCIgbmctdHJhbnNjbHVkZT48L2E+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIExpbmtEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaW5rRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlua0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpbmtEaXJlY3RpdmUgPSBMaW5rRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saW5rJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaW5rJywgTGlua0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKFwiLi9saXN0SXRlbVNlbGVjdE1vZGVFbnVtXCIpO1xudmFyIGxpc3RJdGVtVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL2xpc3RJdGVtVHlwZUVudW1cIik7XG52YXIgbGlzdExheW91dEVudW1fMSA9IHJlcXVpcmUoXCIuL2xpc3RMYXlvdXRFbnVtXCIpO1xudmFyIExpc3RDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLml0ZW1zID0gW107XG4gICAgICAgIGlmICghdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbVNlbGVjdE1vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtU2VsZWN0TW9kZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJzZWxlY3RlZEl0ZW1zXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gTGlzdENvbnRyb2xsZXI7XG59KCkpO1xuTGlzdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbnZhciBMaXN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dWwgY2xhc3M9XCJtcy1MaXN0XCIgbmctdHJhbnNjbHVkZT48L3VsPic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IExpc3RDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICdsaXN0JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6ICc9P3VpZlNlbGVjdGVkSXRlbXMnLFxuICAgICAgICAgICAgdWlmSXRlbVNlbGVjdE1vZGU6ICdAPycsXG4gICAgICAgICAgICB1aWZMYXlvdXQ6ICdAPydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTGlzdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExpc3REaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZMYXlvdXQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIGxheW91dCAoXFwnJyArIG5ld1ZhbHVlICsgJ1xcJykgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtbGF5b3V0XFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdExheW91dEVudW0udHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY29wZS5sYXlvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxheW91dCA9IGxpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW1bbGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bS5saXN0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY29wZS5sYXlvdXQgPT09IGxpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW1bbGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bS5ncmlkXSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1MaXN0LS1ncmlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnbXMtTGlzdC0tZ3JpZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZJdGVtU2VsZWN0TW9kZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIFRoZSBzZWxlY3Rpb24gbW9kZSAoXFwnJyArIG5ld1ZhbHVlICsgJ1xcJykgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtaXRlbS1zZWxlY3QtbW9kZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtU2VsZWN0TW9kZUVudW0udHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1TZWxlY3RNb2RlID0gYXR0cnMudWlmSXRlbVNlbGVjdE1vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjb3BlLml0ZW1TZWxlY3RNb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJvbGxlci5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLml0ZW1zW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLiRicm9hZGNhc3QoJ2xpc3QtaXRlbS1zZWxlY3QtbW9kZS1jaGFuZ2VkJywgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdERpcmVjdGl2ZSA9IExpc3REaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gTGlzdEl0ZW1Db250cm9sbGVyO1xufSgpKTtcbkxpc3RJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xudmFyIExpc3RJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxpIGNsYXNzPVwibXMtTGlzdEl0ZW1cIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZMaXN0JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9dWlmSXRlbScsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQD8nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IExpc3RJdGVtQ29udHJvbGxlcjtcbiAgICB9XG4gICAgTGlzdEl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTGlzdEl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGxpc3QpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmU2VsZWN0ZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFN0cmluZyA9IGF0dHJzLnVpZlNlbGVjdGVkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdHJpbmcgIT09ICd0cnVlJyAmJiBzZWxlY3RlZFN0cmluZyAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmU2VsZWN0ZWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gJiYgbGlzdC5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5zZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3Quc2VsZWN0ZWRJdGVtc1tpXSA9PT0gc2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIGxpc3QgaXRlbSB0eXBlIChcXCcnICsgbmV3VmFsdWUgKyAnXFwnKSBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi10eXBlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1UeXBlRW51bS50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdtcy1MaXN0SXRlbS0taW1hZ2UnKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdtcy1MaXN0SXRlbS0tZG9jdW1lbnQnKTtcbiAgICAgICAgICAgIHN3aXRjaCAobGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW1bYXR0cnMudWlmVHlwZV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSWNvbjpcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLUxpc3RJdGVtLS1kb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSW1hZ2U6XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1MaXN0SXRlbS0taW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtW2F0dHJzLnVpZlR5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgbGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW0uaXRlbVdpdGhJY29uOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmZpbmQoJ3VpZi1saXN0LWl0ZW0taWNvbicpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdMaXN0IGl0ZW0gdHlwZSBgaXRlbVdpdGhJY29uYCByZXF1aXJlcyB0aGUgYHVpZi1saXN0LWl0ZW0taWNvbmAgZGlyZWN0aXZlLiBXaXRob3V0IHRoaXMgdGhlIGljb24gd2lsbCBub3QgYXBwZWFyLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgbGlzdEl0ZW1UeXBlRW51bV8xLkxpc3RJdGVtVHlwZUVudW0uaXRlbVdpdGhJbWFnZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWltYWdlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0xpc3QgaXRlbSB0eXBlIGBpdGVtV2l0aEltYWdlYCByZXF1aXJlcyB0aGUgYHVpZi1saXN0LWl0ZW0taW1hZ2VgIGRpcmVjdGl2ZS4gV2l0aG91dCB0aGlzIHRoZSBpbWFnZSB3aWxsIG5vdCBhcHBlYXIuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlVucmVhZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZVbnJlYWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciB1bnJlYWRTdHJpbmcgPSBhdHRycy51aWZVbnJlYWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh1bnJlYWRTdHJpbmcgIT09ICd0cnVlJyAmJiB1bnJlYWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICBsaXN0LiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlVucmVhZCArICdcXCcgaXMgbm90IGEgdmFsaWQgYm9vbGVhbiB2YWx1ZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSB0cnVlfGZhbHNlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHVucmVhZFN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnVucmVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZVbnNlZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgYXR0cnMudWlmVW5zZWVuICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgdW5zZWVuU3RyaW5nID0gYXR0cnMudWlmVW5zZWVuLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodW5zZWVuU3RyaW5nICE9PSAndHJ1ZScgJiYgdW5zZWVuU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZVbnNlZW4gKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1bnNlZW5TdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS51bnNlZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsaXN0Lml0ZW1zLnB1c2goc2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLml0ZW1DbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSAhc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0Lml0ZW1TZWxlY3RNb2RlID09PSBsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bS5zaW5nbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QuaXRlbXNbaV0gIT09IGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaXRlbUFscmVhZHlTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5zZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0LnNlbGVjdGVkSXRlbXNbaV0gPT09IGxpc3RJdGVtU2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUFscmVhZHlTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW1BbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zZWxlY3RlZEl0ZW1zLnB1c2gobGlzdEl0ZW1TY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBsaXN0SXRlbVNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndW5yZWFkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgbGlzdEl0ZW1TY29wZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXVucmVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXVucmVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1bnNlZW4nLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtdW5zZWVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtdW5zZWVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGlzdC5pdGVtU2VsZWN0TW9kZSAhPT0gbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW1bbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0ubm9uZV0pIHtcbiAgICAgICAgICAgIHVwZGF0ZUl0ZW1TZWxlY3Rpb25Nb2RlRGVjb3JhdGlvbihsaXN0Lml0ZW1TZWxlY3RNb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kb24oJ2xpc3QtaXRlbS1zZWxlY3QtbW9kZS1jaGFuZ2VkJywgZnVuY3Rpb24gKGV2ZW50LCBzZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICB1cGRhdGVJdGVtU2VsZWN0aW9uTW9kZURlY29yYXRpb24oc2VsZWN0aW9uTW9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiB1cGRhdGVJdGVtU2VsZWN0aW9uTW9kZURlY29yYXRpb24oc2VsZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbk1vZGUgPT09ICdub25lJykge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuaGFzQ2xhc3MoJ2lzLXNlbGVjdGFibGUnKSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5vbignY2xpY2snLCBzY29wZS5pdGVtQ2xpY2spO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtRGlyZWN0aXZlID0gTGlzdEl0ZW1EaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwibXMtTGlzdEl0ZW0tdGVydGlhcnlUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlID0gTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLW1ldGFUZXh0XCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUgPSBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWltYWdlXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZSA9IExpc3RJdGVtSW1hZ2VEaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWl0ZW1JY29uXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1JY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1JY29uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1JY29uRGlyZWN0aXZlID0gTGlzdEl0ZW1JY29uRGlyZWN0aXZlO1xudmFyIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tc2VsZWN0aW9uVGFyZ2V0XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUgPSBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtTGlzdEl0ZW0tYWN0aW9uc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZSA9IExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWFjdGlvblwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtQWN0aW9uRGlyZWN0aXZlID0gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0JywgTGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW0nLCBMaXN0SXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1QcmltYXJ5VGV4dCcsIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtU2Vjb25kYXJ5VGV4dCcsIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1UZXJ0aWFyeVRleHQnLCBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1NZXRhVGV4dCcsIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtSW1hZ2UnLCBMaXN0SXRlbUltYWdlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUljb24nLCBMaXN0SXRlbUljb25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0JywgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtQWN0aW9ucycsIExpc3RJdGVtQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1BY3Rpb24nLCBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3REaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExpc3RJdGVtU2VsZWN0TW9kZUVudW07XG4oZnVuY3Rpb24gKExpc3RJdGVtU2VsZWN0TW9kZUVudW0pIHtcbiAgICBMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW0xpc3RJdGVtU2VsZWN0TW9kZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW0xpc3RJdGVtU2VsZWN0TW9kZUVudW1bXCJzaW5nbGVcIl0gPSAxXSA9IFwic2luZ2xlXCI7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wibXVsdGlwbGVcIl0gPSAyXSA9IFwibXVsdGlwbGVcIjtcbn0pKExpc3RJdGVtU2VsZWN0TW9kZUVudW0gPSBleHBvcnRzLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTGlzdEl0ZW1UeXBlRW51bTtcbihmdW5jdGlvbiAoTGlzdEl0ZW1UeXBlRW51bSkge1xuICAgIExpc3RJdGVtVHlwZUVudW1bTGlzdEl0ZW1UeXBlRW51bVtcIml0ZW1cIl0gPSAwXSA9IFwiaXRlbVwiO1xuICAgIExpc3RJdGVtVHlwZUVudW1bTGlzdEl0ZW1UeXBlRW51bVtcIml0ZW1XaXRoSW1hZ2VcIl0gPSAxXSA9IFwiaXRlbVdpdGhJbWFnZVwiO1xuICAgIExpc3RJdGVtVHlwZUVudW1bTGlzdEl0ZW1UeXBlRW51bVtcIml0ZW1XaXRoSWNvblwiXSA9IDJdID0gXCJpdGVtV2l0aEljb25cIjtcbn0pKExpc3RJdGVtVHlwZUVudW0gPSBleHBvcnRzLkxpc3RJdGVtVHlwZUVudW0gfHwgKGV4cG9ydHMuTGlzdEl0ZW1UeXBlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1UeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTGlzdExheW91dEVudW07XG4oZnVuY3Rpb24gKExpc3RMYXlvdXRFbnVtKSB7XG4gICAgTGlzdExheW91dEVudW1bTGlzdExheW91dEVudW1bXCJsaXN0XCJdID0gMF0gPSBcImxpc3RcIjtcbiAgICBMaXN0TGF5b3V0RW51bVtMaXN0TGF5b3V0RW51bVtcImdyaWRcIl0gPSAxXSA9IFwiZ3JpZFwiO1xufSkoTGlzdExheW91dEVudW0gPSBleHBvcnRzLkxpc3RMYXlvdXRFbnVtIHx8IChleHBvcnRzLkxpc3RMYXlvdXRFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50c1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFubmVyQ29udHJvbGxlcigkc2NvcGUsICRsb2csICR3aW5kb3cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgfVxuICAgIHJldHVybiBNZXNzYWdlQmFubmVyQ29udHJvbGxlcjtcbn0oKSk7XG5NZXNzYWdlQmFubmVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZycsICckd2luZG93J107XG5leHBvcnRzLk1lc3NhZ2VCYW5uZXJDb250cm9sbGVyID0gTWVzc2FnZUJhbm5lckNvbnRyb2xsZXI7XG52YXIgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ3VpZk1lc3NhZ2VCYW5uZXInO1xuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXJcXFwiIG5nLXNob3c9XFxcInVpZklzVmlzaWJsZVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItY29udGVudFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItdGV4dFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlclxcXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8dWlmLWJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIHVpZi10eXBlPVxcXCJjb21tYW5kXFxcIiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lci1leHBhbmRcXFwiPlxcbiAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcImNoZXZyb25zRG93blxcXCIgbmctc2hvdz1cXFwiIWlzRXhwYW5kZWRcXFwiPjwvdWlmLWljb24+XFxuICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiY2hldnJvbnNVcFxcXCIgbmctc2hvdz1cXFwiaXNFeHBhbmRlZFxcXCI+PC91aWYtaWNvbj5cXG4gICAgPC91aWYtYnV0dG9uPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWFjdGlvblxcXCI+XFxuICAgIDx1aWYtYnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgdWlmLXR5cGU9XFxcInByaW1hcnlcXFwiIGNsYXNzPVxcXCJtcy1mb250Q29sb3ItbmV1dHJhbExpZ2h0XFxcIiBuZy1jbGljaz1cXFwidWlmQWN0aW9uKClcXFwiPnt7IHVpZkFjdGlvbkxhYmVsIH19PC91aWYtYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDx1aWYtYnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgdWlmLXR5cGU9XFxcImNvbW1hbmRcXFwiIGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWNsb3NlXFxcIiBuZy1jbGljaz1cXFwidWlmT25DbG9zZSgpXFxcIiBzdHlsZT1cXFwiaGVpZ2h0OjUycHhcXFwiPlxcbiAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcInhcXFwiPjwvdWlmLWljb24+XFxuICAgIDwvdWlmLWJ1dHRvbj5cXG4gICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZBY3Rpb246ICcmJyxcbiAgICAgICAgICAgIHVpZkFjdGlvbkxhYmVsOiAnQCcsXG4gICAgICAgICAgICB1aWZJc1Zpc2libGU6ICc9PycsXG4gICAgICAgICAgICB1aWZPbkNsb3NlOiAnJj8nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3RleHRDb250YWluZXJNYXhXaWR0aCA9IDcwMDtcbiAgICAgICAgdGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aCA9IDg4O1xuICAgICAgICB0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoU21hbGwgPSAzNTtcbiAgICAgICAgdGhpcy5TTUFMTF9CUkVBS19QT0lOVCA9IDQ4MDtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW0sICRhdHRycywgJGNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmQWN0aW9uTGFiZWwgPSAkYXR0cnMudWlmQWN0aW9uTGFiZWw7XG4gICAgICAgICAgICAkc2NvcGUuaXNFeHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplID0gZnVuY3Rpb24gKGlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXJXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuX2NsaWVudFdpZHRoID0gX3RoaXMuX21lc3NhZ2VCYW5uZXJbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyV2lkdGggPj0gX3RoaXMuU01BTExfQlJFQUtfUE9JTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3Jlc2l6ZVJlZ3VsYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9yZXNpemVTbWFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy5faW5pdExvY2FscygkZWxlbSk7XG4gICAgICAgICAgICBfdGhpcy50cmFuc2NsdWRlQ2hpbGRzKCRzY29wZSwgJGVsZW0sICR0cmFuc2NsdWRlKTtcbiAgICAgICAgICAgIF90aGlzLl9pbml0VGV4dFdpZHRoID0gKF90aGlzLl9jbGlwcGVyLmNoaWxkcmVuKCkuZXEoMCkpWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRjb250cm9sbGVyLiR3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub25SZXNpemUoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoX3RoaXMuX2NoZXZyb25CdXR0b24pLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl90b2dnbGVFeHBhbnNpb24oJHNjb3BlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KF90aGlzLl9jbG9zZUJ1dHRvbikuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2hpZGVCYW5uZXIoJHNjb3BlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlQmFubmVyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYW5uZXIgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3lvdSBuZWVkIHRvIHByb3ZpZGUgYSB0ZXh0IGZvciB0aGUgbWVzc2FnZSBiYW5uZXIuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1tZXNzYWdlLWJhbm5lcj4geW91IG5lZWQgdG8gc3BlY2lmeScgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0SXRlbUNvbnRlbnQoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLmluc2VydEl0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50RWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1jbGlwcGVyJykpO1xuICAgICAgICBpZiAodGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX2luaXRMb2NhbHMgPSBmdW5jdGlvbiAoJGVsZW0pIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZUJhbm5lciA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lcicpKTtcbiAgICAgICAgdGhpcy5fY2xpcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1jbGlwcGVyJykpO1xuICAgICAgICB0aGlzLl9jaGV2cm9uQnV0dG9uID0gYW5ndWxhci5lbGVtZW50KCRlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1NZXNzYWdlQmFubmVyLWV4cGFuZCcpKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uQnV0dG9uID0gYW5ndWxhci5lbGVtZW50KCRlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1NZXNzYWdlQmFubmVyLWFjdGlvbicpKTtcbiAgICAgICAgdGhpcy5fYnVmZmVyU2l6ZSA9IHRoaXMuX2FjdGlvbkJ1dHRvblswXS5vZmZzZXRXaWR0aCArIHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGg7XG4gICAgICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gYW5ndWxhci5lbGVtZW50KCRlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1NZXNzYWdlQmFubmVyLWNsb3NlJykpO1xuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX3Jlc2l6ZVJlZ3VsYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgodGhpcy5fY2xpZW50V2lkdGggLSB0aGlzLl9idWZmZXJTaXplKSA+IHRoaXMuX2luaXRUZXh0V2lkdGggJiYgdGhpcy5faW5pdFRleHRXaWR0aCA8IHRoaXMuX3RleHRDb250YWluZXJNYXhXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFdpZHRoID0gJ2F1dG8nO1xuICAgICAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvblswXS5jbGFzc05hbWUgPSAnbXMtTWVzc2FnZUJhbm5lci1leHBhbmQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFdpZHRoID0gTWF0aC5taW4oKHRoaXMuX2NsaWVudFdpZHRoIC0gdGhpcy5fYnVmZmVyU2l6ZSksIHRoaXMuX3RleHRDb250YWluZXJNYXhXaWR0aCkgKyAncHgnO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jaGV2cm9uQnV0dG9uLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGV2cm9uQnV0dG9uWzBdLmNsYXNzTmFtZSArPSAnIGlzLXZpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsaXBwZXJbMF0uc3R5bGUud2lkdGggPSB0aGlzLl90ZXh0V2lkdGg7XG4gICAgICAgIHRoaXMuX2NoZXZyb25CdXR0b25bMF0uc3R5bGUuaGVpZ2h0ID0gJzUycHgnO1xuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX3Jlc2l6ZVNtYWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fY2xpZW50V2lkdGggLSAodGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aFNtYWxsICsgdGhpcy5fY2xvc2VCdXR0b25bMF0ub2Zmc2V0V2lkdGgpID4gdGhpcy5faW5pdFRleHRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFdpZHRoID0gJ2F1dG8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFdpZHRoID0gKHRoaXMuX2NsaWVudFdpZHRoIC0gKHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGhTbWFsbCArIHRoaXMuX2Nsb3NlQnV0dG9uWzBdLm9mZnNldFdpZHRoKSkgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsaXBwZXJbMF0uc3R5bGUud2lkdGggPSB0aGlzLl90ZXh0V2lkdGg7XG4gICAgICAgIHRoaXMuX2NoZXZyb25CdXR0b25bMF0uc3R5bGUuaGVpZ2h0ID0gJzg1cHgnO1xuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX3RvZ2dsZUV4cGFuc2lvbiA9IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQgPSAhJHNjb3BlLmlzRXhwYW5kZWQ7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIudG9nZ2xlQ2xhc3MoJ2lzLWV4cGFuZGVkJyk7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5faGlkZUJhbm5lciA9IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCRzY29wZS51aWZJc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS51aWZJc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21lc3NhZ2VCYW5uZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBNZXNzYWdlQmFubmVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSA9IE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYW5uZXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZNZXNzYWdlQmFubmVyJywgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBtZXNzYWdlQmFyVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VCYXJUeXBlRW51bVwiKTtcbnZhciBNZXNzYWdlQmFyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZUJhckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gTWVzc2FnZUJhckNvbnRyb2xsZXI7XG59KCkpO1xuTWVzc2FnZUJhckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbmV4cG9ydHMuTWVzc2FnZUJhckNvbnRyb2xsZXIgPSBNZXNzYWdlQmFyQ29udHJvbGxlcjtcbnZhciBNZXNzYWdlQmFyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTWVzc2FnZUJhckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAndWlmTWVzc2FnZUJhcic7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnJyArXG4gICAgICAgICAgICAnPGRpdiBuZy1jbGFzcz1cIltcXCdtcy1NZXNzYWdlQmFyXFwnLCBjbGFzc1R5cGVdXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYXItY29udGVudFwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1NZXNzYWdlQmFyLWljb25cIj4nICtcbiAgICAgICAgICAgICc8aSBuZy1jbGFzcz1cIltcXCdtcy1JY29uXFwnLCBpY29uVHlwZV1cIj48L2k+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLU1lc3NhZ2VCYXItdGV4dFwiIC8+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1pbmZvQ2lyY2xlJztcbiAgICAgICAgICAgICRzY29wZS5jbGFzc1R5cGUgPSAnJztcbiAgICAgICAgICAgICRzY29wZS51aWZUeXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW1bbmV3VmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYXIgLSBVbnN1cHBvcnRlZCB0eXBlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyAkc2NvcGUudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFyLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtZXNzYWdlQmFyVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAnIG1zLU1lc3NhZ2VCYXItLSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2xhc3NUeXBlID0gY2xhc3NOYW1lICsgbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bVtuZXdWYWx1ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5lcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmljb25UeXBlID0gJ21zLUljb24tLXhDaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5yZW1vdmU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS1taW51cyBtcy1JY29uLS1jaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5zZXZlcmV3YXJuaW5nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0tYWxlcnQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1lc3NhZ2VCYXJUeXBlRW51bV8xLk1lc3NhZ2VCYXJUeXBlRW51bS5zdWNjZXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0tY2hlY2tib3hDaGVjayBtcy1JY29uLS1jaXJjbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1lc3NhZ2VCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlQmFyRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYXJEaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lLCAndWlmLWNvbnRlbnQnKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLk1lc3NhZ2VCYXIgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3lvdSBuZWVkIHRvIHByb3ZpZGUgYSB0ZXh0IGZvciB0aGUgbWVzc2FnZSBiYXIuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgPHVpZi1tZXNzYWdlLWJhcj4geW91IG5lZWQgdG8gc3BlY2lmeScgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0SXRlbUNvbnRlbnQoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYXJEaXJlY3RpdmUucHJvdG90eXBlLmluc2VydEl0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50RWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhci10ZXh0JykpO1xuICAgICAgICBpZiAodGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSwgJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ3VpZi1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUsICdtcy1MaW5rJykpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ21zLUxpbmsnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8YnIgLz4nKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3Moc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIE1lc3NhZ2VCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5NZXNzYWdlQmFyRGlyZWN0aXZlID0gTWVzc2FnZUJhckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubWVzc2FnZWJhcicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk1lc3NhZ2VCYXInLCBNZXNzYWdlQmFyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTWVzc2FnZUJhclR5cGVFbnVtO1xuKGZ1bmN0aW9uIChNZXNzYWdlQmFyVHlwZUVudW0pIHtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wiZXJyb3JcIl0gPSAwXSA9IFwiZXJyb3JcIjtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wicmVtb3ZlXCJdID0gMV0gPSBcInJlbW92ZVwiO1xuICAgIE1lc3NhZ2VCYXJUeXBlRW51bVtNZXNzYWdlQmFyVHlwZUVudW1bXCJzZXZlcmV3YXJuaW5nXCJdID0gMl0gPSBcInNldmVyZXdhcm5pbmdcIjtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wic3VjY2Vzc1wiXSA9IDNdID0gXCJzdWNjZXNzXCI7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcIndhcm5pbmdcIl0gPSA0XSA9IFwid2FybmluZ1wiO1xufSkoTWVzc2FnZUJhclR5cGVFbnVtID0gZXhwb3J0cy5NZXNzYWdlQmFyVHlwZUVudW0gfHwgKGV4cG9ydHMuTWVzc2FnZUJhclR5cGVFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhci9tZXNzYWdlQmFyVHlwZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBjb250ZXh0dWFsTWVudV8xID0gcmVxdWlyZShcIi4vLi4vY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnVcIik7XG52YXIgTmF2QmFyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyQ29udHJvbGxlcigkc2NvcGUsICRhbmltYXRlLCAkZWxlbWVudCwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLm9wZW5Nb2JpbGVNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWVudVZpc2libGUgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIHRoaXMuJGFuaW1hdGVbbWVudVZpc2libGUgPyAncmVtb3ZlQ2xhc3MnIDogJ2FkZENsYXNzJ10odGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICB9O1xuICAgIE5hdkJhckNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlTW9iaWxlTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgdGhpcy4kYW5pbWF0ZS5yZW1vdmVDbGFzcyh0aGlzLiRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZUFsbENvbnRleHRNZW51cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5hdkJhckl0ZW1zID0gdGhpcy4kZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtTmF2QmFyLWl0ZW0nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZCYXJJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5nRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChuYXZCYXJJdGVtc1tpXSk7XG4gICAgICAgICAgICB2YXIgbmF2QmFySXRlbUN0cmwgPSBuZ0VsZW1lbnQuY29udHJvbGxlcihOYXZCYXJJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpO1xuICAgICAgICAgICAgaWYgKG5hdkJhckl0ZW1DdHJsKSB7XG4gICAgICAgICAgICAgICAgbmF2QmFySXRlbUN0cmwuY2xvc2VDb250ZXh0dWFsTWVudSgpO1xuICAgICAgICAgICAgICAgIG5hdkJhckl0ZW1DdHJsLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5oaWRlU2VhcmNoVGV4dEJveCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5hdkJhckl0ZW1zID0gdGhpcy4kZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtTmF2QmFyLWl0ZW0tLXNlYXJjaCcpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkJhckl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbmdFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KG5hdkJhckl0ZW1zW2ldKTtcbiAgICAgICAgICAgIHZhciBuYXZTZWFyY2hDdHJsID0gbmdFbGVtZW50LmNvbnRyb2xsZXIoTmF2QmFyU2VhcmNoLmRpcmVjdGl2ZU5hbWUpO1xuICAgICAgICAgICAgaWYgKG5hdlNlYXJjaEN0cmwpIHtcbiAgICAgICAgICAgICAgICBuYXZTZWFyY2hDdHJsLmNsb3NlU2VhcmNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBOYXZCYXJDb250cm9sbGVyO1xufSgpKTtcbk5hdkJhckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnXTtcbmV4cG9ydHMuTmF2QmFyQ29udHJvbGxlciA9IE5hdkJhckNvbnRyb2xsZXI7XG52YXIgTmF2QmFyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICduYXYnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLU5hdkJhci1vcGVuTWVudSBqcy1vcGVuTWVudVxcXCIgbmctY2xpY2s9XFxcIm5hdi5vcGVuTW9iaWxlTWVudSgpXFxcIj5cXG4gICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIm1lbnVcXFwiPjwvdWlmLWljb24+XFxuICAgIDwvZGl2PlxcbiAgICA8dWlmLW92ZXJsYXkgdWlmLW1vZGU9XFxcInt7b3ZlcmxheX19XFxcIiBuZy1jbGljaz1cXFwibmF2LmNsb3NlTW9iaWxlTWVudSgpXFxcIj48L3VpZi1vdmVybGF5PlxcbiAgICA8dWwgY2xhc3M9XFxcIm1zLU5hdkJhci1pdGVtc1xcXCI+XFxuICAgICAgPGRpdiBjbGFzcz0ndWlmLW5hdi1pdGVtcyc+PC9kaXY+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG92ZXJsYXk6ICdAP3VpZk92ZXJsYXknXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5hdkJhckNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW1zJykpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoY2xvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE5hdkJhckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpIHsgcmV0dXJuIG5ldyBOYXZCYXJEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICRkb2N1bWVudCk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJywgJyRhbmltYXRlJywgJyRkb2N1bWVudCddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE5hdkJhckRpcmVjdGl2ZTtcbn0oKSk7XG5OYXZCYXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZOYXZCYXInO1xuTmF2QmFyRGlyZWN0aXZlLm92ZXJsYXlWYWx1ZXMgPSBbJ2xpZ2h0JywgJ2RhcmsnXTtcbmV4cG9ydHMuTmF2QmFyRGlyZWN0aXZlID0gTmF2QmFyRGlyZWN0aXZlO1xudmFyIE5hdkJhckl0ZW1UeXBlcztcbihmdW5jdGlvbiAoTmF2QmFySXRlbVR5cGVzKSB7XG4gICAgTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlc1tcImxpbmtcIl0gPSAwXSA9IFwibGlua1wiO1xuICAgIE5hdkJhckl0ZW1UeXBlc1tOYXZCYXJJdGVtVHlwZXNbXCJtZW51XCJdID0gMV0gPSBcIm1lbnVcIjtcbn0pKE5hdkJhckl0ZW1UeXBlcyB8fCAoTmF2QmFySXRlbVR5cGVzID0ge30pKTtcbnZhciBOYXZCYXJJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFySXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIH1cbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VDb250ZXh0dWFsTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuZGVzZWxlY3RJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgIH07XG4gICAgcmV0dXJuIE5hdkJhckl0ZW1Db250cm9sbGVyO1xufSgpKTtcbk5hdkJhckl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuZXhwb3J0cy5OYXZCYXJJdGVtQ29udHJvbGxlciA9IE5hdkJhckl0ZW1Db250cm9sbGVyO1xudmFyIE5hdkJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckl0ZW1EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXCIgKyBOYXZCYXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGlzRGlzYWJsZWQ6ICdAP2Rpc2FibGVkJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnQD91aWZQb3NpdGlvbicsXG4gICAgICAgICAgICB0ZXh0OiAnPT91aWZUZXh0JyxcbiAgICAgICAgICAgIHR5cGU6ICdAP3VpZlR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlcyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW05hdkJhckl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOYXZCYXJJdGVtVHlwZXNbdHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhciAtIHVuc3VwcG9ydGVkIG5hdiBiYXIgaXRlbSB0eXBlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAndGhlIHR5cGUgXFwnJyArIHR5cGUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbmctT2ZmaWNlIFVJIEZhYnJpYyBhcyB2YWxpZCB0eXBlIGZvciBuYXYgYmFyIGl0ZW0uJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgdHlwZXMgY2FuIGJlIGZvdW5kIHVuZGVyIE5hdkJhckl0ZW1UeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyRGlyZWN0aXZlLnRzJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2PjwvZGl2Pic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXNbdHlwZV1dO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuYXZCYXJDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hdkJhckxpbmtFZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtTmF2QmFyLWxpbmsnKSk7XG4gICAgICAgICAgICAgICAgbmF2QmFyTGlua0VlbGVtZW50LnJlbW92ZUF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS50eXBlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS50eXBlID0gTmF2QmFySXRlbVR5cGVzW05hdkJhckl0ZW1UeXBlcy5saW5rXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmhpZGVTZWFyY2hUZXh0Qm94KCk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5oYXNDaGlsZE1lbnUgJiYgJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAhJHNjb3BlLmNvbnRleHRNZW51Q3RybC5pc01lbnVPcGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9wZW5NZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmNsb3NlTW9iaWxlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgJHNjb3BlLnNlbGVjdEl0ZW0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtZW50LCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICB2YXIgY29udGV4dE1lbnVDdHJsID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db250ZXh0dWFsTWVudScpKVxuICAgICAgICAgICAgICAgIC5jb250cm9sbGVyKGNvbnRleHR1YWxNZW51XzEuQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dE1lbnVDdHJsKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhhc0NoaWxkTWVudSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRleHRNZW51Q3RybCA9IGNvbnRleHRNZW51Q3RybDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29udGV4dE1lbnVDdHJsLm9uUm9vdE1lbnVDbG9zZWQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdkJhckNvbnRyb2xsZXIuY2xvc2VNb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLmxpbmtdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbVxcXCJcXG4gICAgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkLCAnbXMtTmF2QmFyLWl0ZW0tLXJpZ2h0JzogcG9zaXRpb24gPT09ICdyaWdodCd9XFxcIj5cXG4gICAgICA8YSBjbGFzcz1cXFwibXMtTmF2QmFyLWxpbmtcXFwiIGhyZWY9XFxcIlxcXCI+PHNwYW4gY2xhc3M9J3VpZi1uYXYtaXRlbS1jb250ZW50Jz48L3NwYW4+PC9hPlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzLm1lbnVdID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0taGFzTWVudVxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCI+XFxuICAgICAgPGEgY2xhc3M9XFxcIm1zLU5hdkJhci1saW5rXFxcIiBocmVmPVxcXCJcXFwiPjxzcGFuIGNsYXNzPSd1aWYtbmF2LWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICA8aSBjbGFzcz1cXFwibXMtTmF2QmFyLWNoZXZyb25Eb3duIG1zLUljb24gbXMtSWNvbi0tY2hldnJvbkRvd25cXFwiPjwvaT5cXG4gICAgICA8ZGl2IGNsYXNzPSd1aWYtc3VibWVudSc+PC9kaXY+XFxuICAgIDwvbGk+XCI7XG4gICAgfVxuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgTmF2QmFySXRlbURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCAmJiAhJHNjb3BlLnRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXIgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3lvdSBuZWVkIHRvIHByb3ZpZGUgYSB0ZXh0IGZvciBhIG5hdiBiYXIgbWVudSBpdGVtLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbmF2LWJhci1pdGVtPiB5b3UgbmVlZCB0byBzcGVjaWZ5IGVpdGhlciBcXCd1aWYtdGV4dFxcJyBhcyBhdHRyaWJ1dGUgb3IgPHVpZi1uYXYtaXRlbS1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0TGluayhjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRNZW51KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRMaW5rID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtbmF2LWl0ZW0tY29udGVudCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoYW5ndWxhci5lbGVtZW50KCc8c3Bhbj4nICsgJHNjb3BlLnRleHQgKyAnPC9zcGFuPicpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0TWVudSA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtQ29udGV4dHVhbE1lbnUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXN1Ym1lbnUnKSkucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIE5hdkJhckl0ZW1EaXJlY3RpdmU7XG59KCkpO1xuTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhckl0ZW0nO1xuZXhwb3J0cy5OYXZCYXJJdGVtRGlyZWN0aXZlID0gTmF2QmFySXRlbURpcmVjdGl2ZTtcbnZhciBOYXZCYXJTZWFyY2hDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJTZWFyY2hDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICB9XG4gICAgTmF2QmFyU2VhcmNoQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy4kc2NvcGUuc2VhcmNoVGV4dCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKF90aGlzLiRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFuaW1hdGUucmVtb3ZlQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdpcy1zZWxlY3RlZCcpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xufSgpKTtcbk5hdkJhclNlYXJjaENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRkb2N1bWVudCcsICckYW5pbWF0ZScsICckdGltZW91dCddO1xuZXhwb3J0cy5OYXZCYXJTZWFyY2hDb250cm9sbGVyID0gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbnZhciBOYXZCYXJTZWFyY2ggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhclNlYXJjaCgkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE5hdkJhclNlYXJjaENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFtcIl5cIiArIE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBcIlwiICsgTmF2QmFyU2VhcmNoLmRpcmVjdGl2ZU5hbWVdO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25TZWFyY2hDYWxsYmFjazogJyY/dWlmT25TZWFyY2gnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAP3BsYWNlaG9sZGVyJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbSBtcy1OYXZCYXItaXRlbS0tc2VhcmNoIG1zLXUtaGlkZGVuU21cXFwiIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1UZXh0RmllbGRcXFwiIG5nLWNsaWNrPVxcXCJza2lwT25DbGljaygkZXZlbnQpXFxcIj5cXG4gICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj17e3BsYWNlaG9sZGVyfX0gY2xhc3M9XFxcIm1zLVRleHRGaWVsZC1maWVsZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmcta2V5cHJlc3M9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiIG5nLW1vZGVsPVxcXCJzZWFyY2hUZXh0XFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHMsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGN0cmxzWzFdLmNsb3NlU2VhcmNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5za2lwT25DbGljayA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUNzc0NsYXNzZXMoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub25TZWFyY2ggPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY3RybHNbMF0uY2xvc2VBbGxDb250ZXh0TWVudXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiAkZXZlbnQud2hpY2ggPT09IDEzICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpICYmICRzY29wZS5vblNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vblNlYXJjaENhbGxiYWNrKHsgc2VhcmNoOiAkc2NvcGUuc2VhcmNoVGV4dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwbHlDc3NDbGFzc2VzKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBOYXZCYXJTZWFyY2guZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXZCYXJTZWFyY2goJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGRvY3VtZW50JywgJyRhbmltYXRlJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBOYXZCYXJTZWFyY2gucHJvdG90eXBlLmFwcGx5Q3NzQ2xhc3NlcyA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgICBpZiAoISRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGFuaW1hdGUuYWRkQ2xhc3MoJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVRleHRGaWVsZC1maWVsZCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgJGVsZW1lbnQucGFyZW50KCkuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZS5hZGRDbGFzcygkZWxlbWVudCwgJ2lzLXNlbGVjdGVkJyk7XG4gICAgfTtcbiAgICByZXR1cm4gTmF2QmFyU2VhcmNoO1xufSgpKTtcbk5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lID0gJ3VpZk5hdkJhclNlYXJjaCc7XG5leHBvcnRzLk5hdkJhclNlYXJjaCA9IE5hdkJhclNlYXJjaDtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubmF2YmFyJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKE5hdkJhckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBOYXZCYXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBOYXZCYXJJdGVtRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lLCBOYXZCYXJTZWFyY2guZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKFwiLi9vcmdDaGFydFByZXNlbmNlRW51bVwiKTtcbnZhciBvcmdDaGFydFN0eWxlRW51bV8xID0gcmVxdWlyZShcIi4vb3JnQ2hhcnRTdHlsZUVudW1cIik7XG52YXIgb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZShcIi4vb3JnQ2hhcnRTZWxlY3RNb2RlRW51bVwiKTtcbnZhciBPcmdDaGFydENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdE1vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLiRzY29wZS5pdGVtcyA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT3JnQ2hhcnRDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9yZ0NoYXJ0Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gT3JnQ2hhcnRDb250cm9sbGVyO1xufSgpKTtcbk9yZ0NoYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xudmFyIE9yZ0NoYXJ0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtT3JnQ2hhcnRcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBPcmdDaGFydENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiAnPT91aWZTZWxlY3RlZEl0ZW1zJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBPcmdDaGFydERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPcmdDaGFydERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bYXR0cnMudWlmU2VsZWN0TW9kZV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZTpcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlOlxuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdE1vZGUgPSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVthdHRycy51aWZTZWxlY3RNb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVSUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vcmdjaGFydCAtIFVuc3VwcG9ydGVkIHNlbGVjdC1tb2RlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdUaGUgc2VsZWN0LW1vZGUgKFxcJycgKyBhdHRycy51aWZTZWxlY3RNb2RlICsgJ1xcKSBpcyBub3Qgc3VwcGVydGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6IHNpbmdsZSwgbXVsdGlwbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0RGlyZWN0aXZlID0gT3JnQ2hhcnREaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRHcm91cERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtT3JnQ2hhcnQtZ3JvdXBcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydEdyb3VwRGlyZWN0aXZlID0gT3JnQ2hhcnRHcm91cERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtT3JnQ2hhcnQtZ3JvdXBUaXRsZVwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZTtcbnZhciBPcmdDaGFydExpc3REaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0TGlzdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dWwgY2xhc3M9XCJtcy1PcmdDaGFydC1saXN0XCIgbmctdHJhbnNjbHVkZSA+PC91bD4nO1xuICAgIH1cbiAgICBPcmdDaGFydExpc3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydExpc3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydExpc3REaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydExpc3REaXJlY3RpdmUgPSBPcmdDaGFydExpc3REaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxsaSBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWxpc3RJdGVtXCI+PGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy10cmFuc2NsdWRlID48L2Rpdj48L2xpPic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmT3JnQ2hhcnQnO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXRlbTogJz0/dWlmSXRlbScsXG4gICAgICAgICAgICBwcmVzZW5jZTogJz0/dWlmUHJlc2VuY2UnLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9P3VpZlNlbGVjdGVkJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW0sIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAoc2NvcGUuc2VsZWN0ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUucHJlc2VuY2UpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bVtzY29wZS5wcmVzZW5jZV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYXZhaWxhYmxlOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWF2YWlsYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYnVzeTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1idXN5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5hd2F5OlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWF3YXknKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmJsb2NrZWQ6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYmxvY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uZG5kOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWRuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0ub2ZmbGluZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1vZmZsaW5lJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVUlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQgLSBVbnN1cHBvcnRlZCBwcmVzZW5jZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHByZXNlbmNlIChcXCcnICsgc2NvcGUucHJlc2VuY2UgKyAnXFwnKSBpcyBub3Qgc3VwcGVydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6IGF2YWlsYWJsZSwgYnVzeSwgYXdheSwgYmxvY2tlZCwgZG5kLCBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmU3R5bGUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3JnQ2hhcnRTdHlsZUVudW1fMS5PcmdDaGFydFN0eWxlRW51bVthdHRycy51aWZTdHlsZV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0U3R5bGVFbnVtXzEuT3JnQ2hhcnRTdHlsZUVudW0uc3F1YXJlOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0U3R5bGVFbnVtXzEuT3JnQ2hhcnRTdHlsZUVudW0uc3RhbmRhcmQ6IGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVUlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQgLSBVbnN1cHBvcnRlZCBzdHlsZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHN0eWxlIChcXCcnICsgYXR0cnMudWlmU3R5bGUgKyAnXFwpIGlzIG5vdCBzdXBwZXJ0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZTogc3RhbmRhcmQoZGVmYXVsdCksIHNxdWFyZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tc2VsZWN0YWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICBjdHJsLml0ZW1zLnB1c2goc2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSB8fCBjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdHJsLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pdGVtc1tpXSAhPT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLml0ZW1zW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnB1c2goc2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnBlcnNvbmFDbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSAhc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBpZiAoc2NvcGUuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3RybC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLml0ZW1zW2ldICE9PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLml0ZW1zW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5wdXNoKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5wdXNoKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gY3RybC5zZWxlY3RlZEl0ZW1zLmluZGV4T2Yoc2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlIHx8IGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGUpICYmIHNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5vbignY2xpY2snLCBzY29wZS5wZXJzb25hQ2xpY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlID0gT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZXJzb25hLWltYWdlQXJlYVxcXCI+XFxuICAgICAgPGkgY2xhc3M9XFxcIm1zLVBlcnNvbmEtcGxhY2Vob2xkZXIgbXMtSWNvbiBtcy1JY29uLS1wZXJzb25cXFwiPjwvaT5cXG4gICAgICA8aW1nIGNsYXNzPVxcXCJtcy1QZXJzb25hLWltYWdlXFxcIiBuZy1zcmM9XFxcInt7bmdTcmN9fVxcXCIgLz5cXG4gICAgPC9kaXY+XFxuICAgIFwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdTcmM6ICc9J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBPcmdDaGFydEltYWdlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydEltYWdlRGlyZWN0aXZlID0gT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByZXNlbmNlXCIgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgICAgICBpZiAoIXNjb3BlLiRwYXJlbnQucHJlc2VuY2UpIHtcbiAgICAgICAgICAgIGVsZW0uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlID0gT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZTtcbnZhciBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlID0gT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJpbWFyeVRleHRcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlID0gT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1zZWNvbmRhcnlUZXh0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyKCkge1xuICAgIH1cbiAgICBPcmdDaGFydEdyb3VwQnlGaWx0ZXIuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGlmICghY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbGxlY3Rpb25baV1ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwQnlGaWx0ZXI7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydEdyb3VwQnlGaWx0ZXIgPSBPcmdDaGFydEdyb3VwQnlGaWx0ZXI7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydCcsIE9yZ0NoYXJ0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydEdyb3VwJywgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRHcm91cFRpdGxlJywgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydExpc3QnLCBPcmdDaGFydExpc3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0UGVyc29uYScsIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRJbWFnZScsIE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0UHJlc2VuY2UnLCBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydERldGFpbHMnLCBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0UHJpbWFyeVRleHQnLCBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydFNlY29uZGFyeVRleHQnLCBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5maWx0ZXIoJ3VpZk9yZ0NoYXJ0R3JvdXBCeScsIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlci5mYWN0b3J5KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtO1xuKGZ1bmN0aW9uIChPcmdDaGFydFByZXNlbmNlRW51bSkge1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYXZhaWxhYmxlXCJdID0gMF0gPSBcImF2YWlsYWJsZVwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYnVzeVwiXSA9IDFdID0gXCJidXN5XCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJhd2F5XCJdID0gMl0gPSBcImF3YXlcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImJsb2NrZWRcIl0gPSAzXSA9IFwiYmxvY2tlZFwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiZG5kXCJdID0gNF0gPSBcImRuZFwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wib2ZmbGluZVwiXSA9IDVdID0gXCJvZmZsaW5lXCI7XG59KShPcmdDaGFydFByZXNlbmNlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZUVudW0gfHwgKGV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZUVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFByZXNlbmNlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bTtcbihmdW5jdGlvbiAoT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSkge1xuICAgIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtcInNpbmdsZVwiXSA9IDBdID0gXCJzaW5nbGVcIjtcbiAgICBPcmdDaGFydFNlbGVjdE1vZGVFbnVtW09yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bXCJtdWx0aXBsZVwiXSA9IDFdID0gXCJtdWx0aXBsZVwiO1xufSkoT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSB8fCAoZXhwb3J0cy5PcmdDaGFydFNlbGVjdE1vZGVFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgT3JnQ2hhcnRTdHlsZUVudW07XG4oZnVuY3Rpb24gKE9yZ0NoYXJ0U3R5bGVFbnVtKSB7XG4gICAgT3JnQ2hhcnRTdHlsZUVudW1bT3JnQ2hhcnRTdHlsZUVudW1bXCJzdGFuZGFyZFwiXSA9IDBdID0gXCJzdGFuZGFyZFwiO1xuICAgIE9yZ0NoYXJ0U3R5bGVFbnVtW09yZ0NoYXJ0U3R5bGVFbnVtW1wic3F1YXJlXCJdID0gMV0gPSBcInNxdWFyZVwiO1xufSkoT3JnQ2hhcnRTdHlsZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtIHx8IChleHBvcnRzLk9yZ0NoYXJ0U3R5bGVFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTdHlsZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBvdmVybGF5TW9kZUVudW1fMSA9IHJlcXVpcmUoXCIuL292ZXJsYXlNb2RlRW51bVwiKTtcbnZhciBPdmVybGF5Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheUNvbnRyb2xsZXIobG9nKSB7XG4gICAgICAgIHRoaXMubG9nID0gbG9nO1xuICAgIH1cbiAgICByZXR1cm4gT3ZlcmxheUNvbnRyb2xsZXI7XG59KCkpO1xuT3ZlcmxheUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xudmFyIE92ZXJsYXlEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZXJsYXlEaXJlY3RpdmUobG9nKSB7XG4gICAgICAgIHRoaXMubG9nID0gbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1PdmVybGF5XCIgbmctY2xhc3M9XCJ7XFwnbXMtT3ZlcmxheS0tZGFya1xcJzogdWlmTW9kZSA9PSBcXCdkYXJrXFwnfVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZk1vZGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICBPdmVybGF5RGlyZWN0aXZlLmxvZyA9IGxvZztcbiAgICB9XG4gICAgT3ZlcmxheURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKGxvZykgeyByZXR1cm4gbmV3IE92ZXJsYXlEaXJlY3RpdmUobG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE92ZXJsYXlEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZNb2RlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG92ZXJsYXlNb2RlRW51bV8xLk92ZXJsYXlNb2RlW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgT3ZlcmxheURpcmVjdGl2ZS5sb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm92ZXJsYXkgLSBVbnN1cHBvcnRlZCBvdmVybGF5IG1vZGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIG92ZXJsYXkgbW9kZSAoXFwnJyArIHNjb3BlLnVpZk1vZGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlNb2RlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBPdmVybGF5RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3ZlcmxheURpcmVjdGl2ZSA9IE92ZXJsYXlEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm92ZXJsYXknLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk92ZXJsYXknLCBPdmVybGF5RGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheURpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgT3ZlcmxheU1vZGU7XG4oZnVuY3Rpb24gKE92ZXJsYXlNb2RlKSB7XG4gICAgT3ZlcmxheU1vZGVbT3ZlcmxheU1vZGVbXCJsaWdodFwiXSA9IDBdID0gXCJsaWdodFwiO1xuICAgIE92ZXJsYXlNb2RlW092ZXJsYXlNb2RlW1wiZGFya1wiXSA9IDFdID0gXCJkYXJrXCI7XG59KShPdmVybGF5TW9kZSA9IGV4cG9ydHMuT3ZlcmxheU1vZGUgfHwgKGV4cG9ydHMuT3ZlcmxheU1vZGUgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlNb2RlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIHBhbmVsRGlyZWN0aXZlRW51bV8xID0gcmVxdWlyZShcIi4vcGFuZWxEaXJlY3RpdmVFbnVtXCIpO1xudmFyIFBhbmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbERpcmVjdGl2ZSgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzcz1cXFwibXMtT3ZlcmxheVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwidWlmSXNMaWdodERpc21pc3MgJiYgY2xvc2VQYW5lbCgpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJ1aWZTaG93T3ZlcmxheSA9PT0gdHJ1ZSA/ICdtcy1PdmVybGF5LS1kYXJrJyA6ICcnO1xcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGFuZWwtbWFpblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbC1jb21tYW5kc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1pZj1cXFwidWlmU2hvd0Nsb3NlXFxcIiBjbGFzcz0nbXMtUGFuZWwtY2xvc2VCdXR0b24nIG5nLWNsaWNrPVxcXCJjbG9zZVBhbmVsKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT0neCc+PC91aWYtaWNvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsLWNvbnRlbnRJbm5lclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQYW5lbENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZJc0xpZ2h0RGlzbWlzczogJz0nLFxuICAgICAgICAgICAgdWlmSXNPcGVuOiAnPScsXG4gICAgICAgICAgICB1aWZTaG93Q2xvc2U6ICc9JyxcbiAgICAgICAgICAgIHVpZlNob3dPdmVybGF5OiAnPScsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHsgcmV0dXJuIG5ldyBQYW5lbERpcmVjdGl2ZSgkbG9nLCAkYW5pbWF0ZSwgJHRpbWVvdXQpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZycsICckYW5pbWF0ZScsICckdGltZW91dCddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGFuZWxEaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBQYW5lbERpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKS5oYXNDbGFzcygnbXMtQ29tbWFuZEJhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tcy1QYW5lbC1jb21tYW5kcycpKS5wcmVwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NvcGUudWlmVHlwZSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tcy1QYW5lbC1tYWluJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtY29udGVudElubmVyJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuY2xvc2VQYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLnVpZklzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFBhbmVsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGFuZWxEaXJlY3RpdmUgPSBQYW5lbERpcmVjdGl2ZTtcbnZhciBQYW5lbENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhbmVsQ29udHJvbGxlcigkc2NvcGUsICRhbmltYXRlLCAkZWxlbWVudCwgJGxvZywgJHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMudWlmUGFuZWxTaXplQ2xhc3NlcyA9IChfYSA9IHt9LFxuICAgICAgICAgICAgX2FbcGFuZWxEaXJlY3RpdmVFbnVtXzEuUGFuZWxUeXBlcy5zbWFsbF0gPSAnbXMtUGFuZWwtLXNtJyxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMubWVkaXVtXSA9ICdtcy1QYW5lbC0tbWQnLFxuICAgICAgICAgICAgX2FbcGFuZWxEaXJlY3RpdmVFbnVtXzEuUGFuZWxUeXBlcy5sYXJnZV0gPSAnbXMtUGFuZWwtLWxnJyxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMuZXh0cmFsYXJnZV0gPSAnbXMtUGFuZWwtLXhsJyxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMuZXh0cmFleHRyYWxhcmdlXSA9ICdtcy1QYW5lbC0teHhsJyxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMubGVmdF0gPSAnbXMtUGFuZWwtLWxlZnQnLFxuICAgICAgICAgICAgX2EpO1xuICAgICAgICBpZiAoISRzY29wZS51aWZUeXBlKSB7XG4gICAgICAgICAgICAkc2NvcGUudWlmVHlwZSA9ICdtZWRpdW0nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzWyRzY29wZS51aWZUeXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBhbmVsIC0gdW5zdXBwb3J0ZWQgcGFuZWwgdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAndGhlIHR5cGUgXFwnJyArICRzY29wZS51aWZUeXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgcGFuZWxzLicgK1xuICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgdHlwZXMgY2FuIGJlIGZvdW5kIHVuZGVyIFBhbmVsVHlwZXMgZW51bSBoZXJlOlxcbicgK1xuICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbC50cycpO1xuICAgICAgICAgICAgJHNjb3BlLnVpZlR5cGUgPSAnbWVkaXVtJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2l6ZSA9IHBhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXNbJHNjb3BlLnVpZlR5cGVdO1xuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcyh0aGlzLnVpZlBhbmVsU2l6ZUNsYXNzZXNbc2l6ZV0pO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCd1aWZJc09wZW4nLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICdib29sZWFuJyAmJiBuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGFuZWwgLSBpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtb3BlblxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgbmV3VmFsdWUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLW9wZW5cXCcgYXR0cmlidXRlIGZvciAnICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtcGFuZWwvPi4gVGhlIHZhbGlkIHR5cGUgaXMgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkYW5pbWF0ZS5hZGRDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ21zLVBhbmVsLWFuaW1hdGVJbicpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFyJykpLnNjb3BlKCkuJGJyb2FkY2FzdCgndWlmLWNvbW1hbmQtYmFyLXJlc2l6ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkYW5pbWF0ZS5hZGRDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ21zLVBhbmVsLWFuaW1hdGVPdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ21zLVBhbmVsLWFuaW1hdGVJbiBtcy1QYW5lbC1hbmltYXRlT3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVpZklzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBfYTtcbiAgICB9XG4gICAgcmV0dXJuIFBhbmVsQ29udHJvbGxlcjtcbn0oKSk7XG5QYW5lbENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRhbmltYXRlJywgJyRlbGVtZW50JywgJyRsb2cnLCAnJHRpbWVvdXQnXTtcbmV4cG9ydHMuUGFuZWxDb250cm9sbGVyID0gUGFuZWxDb250cm9sbGVyO1xudmFyIFBhbmVsSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbEhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8cCBjbGFzcz1cIm1zLVBhbmVsLWhlYWRlclRleHRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZIZWFkZXJUZXh0OiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWxIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQYW5lbEhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBhbmVsSGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGFuZWxIZWFkZXJEaXJlY3RpdmUgPSBQYW5lbEhlYWRlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGFuZWwnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBhbmVsJywgUGFuZWxEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBhbmVsSGVhZGVyJywgUGFuZWxIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBhbmVsVHlwZXM7XG4oZnVuY3Rpb24gKFBhbmVsVHlwZXMpIHtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJzbWFsbFwiXSA9IDBdID0gXCJzbWFsbFwiO1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcIm1lZGl1bVwiXSA9IDFdID0gXCJtZWRpdW1cIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJsYXJnZVwiXSA9IDJdID0gXCJsYXJnZVwiO1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcImV4dHJhbGFyZ2VcIl0gPSAzXSA9IFwiZXh0cmFsYXJnZVwiO1xuICAgIFBhbmVsVHlwZXNbUGFuZWxUeXBlc1tcImV4dHJhZXh0cmFsYXJnZVwiXSA9IDRdID0gXCJleHRyYWV4dHJhbGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJsZWZ0XCJdID0gNV0gPSBcImxlZnRcIjtcbn0pKFBhbmVsVHlwZXMgPSBleHBvcnRzLlBhbmVsVHlwZXMgfHwgKGV4cG9ydHMuUGFuZWxUeXBlcyA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIHBlcnNvbmFTdHlsZUVudW1fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW1cIik7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoXCIuLi9wZXJzb25hL3NpemVFbnVtXCIpO1xudmFyIGljb25FbnVtXzEgPSByZXF1aXJlKFwiLi4vaWNvbi9pY29uRW51bVwiKTtcbnZhciBwZW9wbGVTZWFyY2hFdmVudE5hbWUgPSAndWlmLXBlb3BsZS1zZWFyY2gnO1xudmFyIEdyb3VwZWRQZW9wbGVEYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm91cGVkUGVvcGxlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5wZW9wbGUgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIEdyb3VwZWRQZW9wbGVEYXRhO1xufSgpKTtcbmV4cG9ydHMuR3JvdXBlZFBlb3BsZURhdGEgPSBHcm91cGVkUGVvcGxlRGF0YTtcbnZhciBQZW9wbGVQaWNrZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJDb250cm9sbGVyKCRzY29wZSwgJGZpbHRlciwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGZpbHRlciA9ICRmaWx0ZXI7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRQZXJzb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRQZXJzb25zO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucGlja2VyVHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLiRzY29wZS50eXBlO1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmdyb3VwZWRdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRzY29wZS50eXBlO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2VhcmNoUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5zZWFyY2hRdWVyeTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5iaW5kUGVvcGxlKHRoaXMuJHNjb3BlLnNlYXJjaFF1ZXJ5KTtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdChwZW9wbGVTZWFyY2hFdmVudE5hbWUsIHRoaXMuc2VhcmNoUXVlcnkoKSk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5iaW5kUGVvcGxlID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwZW9wbGVEYXRhID0gdGhpcy4kc2NvcGUucGVvcGxlQ2FsbGJhY2soKShxdWVyeSk7XG4gICAgICAgIHBlb3BsZURhdGEgPSBwZW9wbGVEYXRhIHx8IFtdO1xuICAgICAgICBpZiAocGVvcGxlRGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5ncm91cHMgPSB0aGlzLmNyZWF0ZVBlb3BsZURhdGFTdHJ1Y3R1cmUocGVvcGxlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHBlb3BsZURhdGEudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIHNlYXJjaE1vcmVDdHJsXzEgPSBhbmd1bGFyLmVsZW1lbnQodGhpcy4kZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUnKSlcbiAgICAgICAgICAgICAgICAuY29udHJvbGxlcihcIlwiICsgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hNb3JlQ3RybF8xKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoTW9yZUN0cmxfMS5pc1NlYXJjaGluZyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0aGF0XzEgPSB0aGlzO1xuICAgICAgICAgICAgcGVvcGxlRGF0YVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhhdF8xLiRzY29wZS5ncm91cHMgPSBfdGhpcy5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlKGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaE1vcmVDdHJsXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoTW9yZUN0cmxfMS5pc1NlYXJjaGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZVBlb3BsZURhdGFTdHJ1Y3R1cmUgPSBmdW5jdGlvbiAocGVvcGxlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwZW9wbGVEYXRhID0gW107XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChwZW9wbGUsIGZ1bmN0aW9uIChwZXJzb24pIHtcbiAgICAgICAgICAgIHZhciBleGlzdGluZ0dyb3VwcyA9IF90aGlzLiRmaWx0ZXIoJ2ZpbHRlcicpKHBlb3BsZURhdGEsIHsgZ3JvdXA6IHBlcnNvbi5ncm91cCB9KTtcbiAgICAgICAgICAgIHZhciBoYXNHcm91cCA9IGV4aXN0aW5nR3JvdXBzLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIGlmICghaGFzR3JvdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UGVvcGxlRGF0YSA9IG5ldyBHcm91cGVkUGVvcGxlRGF0YSgpO1xuICAgICAgICAgICAgICAgIG5ld1Blb3BsZURhdGEuZ3JvdXAgPSBwZXJzb24uZ3JvdXA7XG4gICAgICAgICAgICAgICAgbmV3UGVvcGxlRGF0YS5wZW9wbGUucHVzaChwZXJzb24pO1xuICAgICAgICAgICAgICAgIHBlb3BsZURhdGEucHVzaChuZXdQZW9wbGVEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ0RhdGEgPSBleGlzdGluZ0dyb3Vwc1swXTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0RhdGEucGVvcGxlLnB1c2gocGVyc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwZW9wbGVEYXRhO1xuICAgIH07XG4gICAgcmV0dXJuIFBlb3BsZVBpY2tlckNvbnRyb2xsZXI7XG59KCkpO1xuUGVvcGxlUGlja2VyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGZpbHRlcicsICckZWxlbWVudCddO1xuZXhwb3J0cy5QZW9wbGVQaWNrZXJDb250cm9sbGVyID0gUGVvcGxlUGlja2VyQ29udHJvbGxlcjtcbnZhciBQZW9wbGVQaWNrZXJUeXBlcztcbihmdW5jdGlvbiAoUGVvcGxlUGlja2VyVHlwZXMpIHtcbiAgICBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1tcImdyb3VwZWRcIl0gPSAwXSA9IFwiZ3JvdXBlZFwiO1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wiY29tcGFjdFwiXSA9IDFdID0gXCJjb21wYWN0XCI7XG4gICAgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbXCJtZW1iZXJMaXN0XCJdID0gMl0gPSBcIm1lbWJlckxpc3RcIjtcbiAgICBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1tcImZhY2VQaWxlXCJdID0gM10gPSBcImZhY2VQaWxlXCI7XG59KShQZW9wbGVQaWNrZXJUeXBlcyB8fCAoUGVvcGxlUGlja2VyVHlwZXMgPSB7fSkpO1xudmFyIFBlb3BsZVBpY2tlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlUGlja2VyRGlyZWN0aXZlKCRkb2N1bWVudCwgJHRpbWVvdXQsICRsb2csICR3aW5kb3cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyduZ01vZGVsJywgXCJcIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lXTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGVvcGxlUGlja2VyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGRlbGF5OiAnQHVpZlNlYXJjaERlbGF5JyxcbiAgICAgICAgICAgIGZhY2VQaWxlSGVhZGVyOiAnQD91aWZGYWNlcGlsZUhlYWRlcicsXG4gICAgICAgICAgICBuZ0Rpc2FibGVkOiAnPT8nLFxuICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgb25TZWxlY3RlZFBlcnNvbkNsaWNrOiAnJj91aWZTZWxlY3RlZFBlcnNvbkNsaWNrJyxcbiAgICAgICAgICAgIHBlb3BsZUNhbGxiYWNrOiAnJnVpZlBlb3BsZScsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0A/JyxcbiAgICAgICAgICAgIHR5cGU6ICdAP3VpZlR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlcyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmdyb3VwZWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFBlb3BsZVBpY2tlclR5cGVzW3R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZW9wbGVwaWNrZXIgLSB1bnN1cHBvcnRlZCBwZW9wbGUgcGlja2VyIHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIHBlb3BsZSBwaWNrZXIuJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgdHlwZXMgY2FuIGJlIGZvdW5kIHVuZGVyIFBlb3BsZVBpY2tlclR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUudHMnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyAnW25nT2ZmaWNlVWlGYWJyaWNdIC0gRXJyb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbdHlwZV1dO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJscywgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBuZ01vZGVsQ3RybCA9IGN0cmxzWzBdO1xuICAgICAgICAgICAgdmFyIHBlb3BsZVBpY2tlckN0cmwgPSBjdHJsc1sxXTtcbiAgICAgICAgICAgIF90aGlzLmluaXREaXNhYmxlZFN0YXRlKCRlbGVtZW50LCAkc2NvcGUsICRhdHRycyk7XG4gICAgICAgICAgICAkc2NvcGUuZmFjZVBpbGVIZWFkZXIgPSAkc2NvcGUuZmFjZVBpbGVIZWFkZXIgfHwgJ1N1Z2dlc3RlZCBjb250YWN0cyc7XG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbignc2VsZWN0ZWRQZXJzb25zJywgZnVuY3Rpb24gKGRhdGEsIGRhdGEyLCBkYXRhMykge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlc2l6ZVNlYXJjaEZpZWxkKCRlbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zID0gbmdNb2RlbEN0cmwuJHZpZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzaXplU2VhcmNoRmllbGQoJGVsZW1lbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBlb3BsZVBpY2tlckN0cmwuc2VhcmNoKCk7XG4gICAgICAgICAgICB2YXIgc2VhcmNoVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUub25TZWFyY2hLZXlVcCA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlYXJjaE1vcmUgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpO1xuICAgICAgICAgICAgICAgIGlmICgkc2VhcmNoTW9yZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlYXJjaFF1ZXJ5ID8gJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLXNlYXJjaGluZycpIDogJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlYXJjaGluZycpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VhcmNoUXVlcnkgPyAkc2VhcmNoTW9yZS5hZGRDbGFzcygnaXMtYWN0aXZlJykgOiAkc2VhcmNoTW9yZS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVTZWxlY3RlZFBlb3BsZSgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghJHNjb3BlLmRlbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaFRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dC5jYW5jZWwoc2VhcmNoVGltZW91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlYXJjaFRpbWVvdXQgPSBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlb3BsZVBpY2tlckN0cmwuc2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfSwgJHNjb3BlLmRlbGF5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub25QZW9wbGVQaWNrZXJBY3RpdmUgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc21vb3RoU2Nyb2xsVG8oJGVsZW1lbnRbMF0pO1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHlwZSAhPT0gUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkcmVzdWx0cyA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXJlc3VsdHMnKSk7XG4gICAgICAgICAgICAgICAgICAgICRyZXN1bHRzWzBdLnN0eWxlLndpZHRoID0gJGVsZW1lbnRbMF0uY2xpZW50V2lkdGggLSAyICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJHNjb3BlLnR5cGUgPT09IFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hbmltYXRlU2VsZWN0ZWRQZW9wbGUoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5hZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlID0gZnVuY3Rpb24gKHBlcnNvbikge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRQZXJzb25zLmluZGV4T2YocGVyc29uKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zLnB1c2gocGVyc29uKTtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKCRzY29wZS5zZWxlY3RlZFBlcnNvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5yZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAocGVyc29uLCAkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5keCA9ICRzY29wZS5zZWxlY3RlZFBlcnNvbnMuaW5kZXhPZihwZXJzb24pO1xuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMuc3BsaWNlKGluZHgsIDEpO1xuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJHNjb3BlLnNlbGVjdGVkUGVyc29ucyk7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5yZW1vdmVQZXJzb25Gcm9tU2VhcmNoUmVzdWx0cyA9IGZ1bmN0aW9uIChwZW9wbGUsIHBlcnNvbiwgJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBpbmR4ID0gcGVvcGxlLmluZGV4T2YocGVyc29uKTtcbiAgICAgICAgICAgICAgICBwZW9wbGUuc3BsaWNlKGluZHgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF90aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLnR5cGUgPT09IFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSkge1xuICAgICAgICAgICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnNlcnRGYWNlUGlsZUhlYWRlcihjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmluc2VydEZhY2VQaWxlU2VhcmNoTW9yZShjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXSA9XG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlclxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoQm94XFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcGVyc29uYVxcXCIgbmctcmVwZWF0PVxcXCJwZXJzb24gaW4gc2VsZWN0ZWRQZXJzb25zIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEgbmctY2xpY2s9XFxcIm9uU2VsZWN0ZWRQZXJzb25DbGljaygpKHBlcnNvbilcXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmVdICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGxdICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3twZXJzb24uY29sb3J9fVxcXCI+e3twZXJzb24uaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgPC91aWYtcGVyc29uYT5cXG4gICAgICAgICAgICAgIDxidXR0b25cXG4gICAgICAgICAgICAgICAgbmctaWY9XFxcIiFuZ0Rpc2FibGVkXFxcIlxcbiAgICAgICAgICAgICAgICB0eXBlPVxcXCJidXR0b25cXFwiXFxuICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGUocGVyc29uLCAkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlcnNvbmFSZW1vdmVcXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLnhdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8aW5wdXQgbmctY2xpY2s9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7cGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwic2VhcmNoUXVlcnlcXFwiXFxuICAgICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hGaWVsZFxcXCJcXG4gICAgICAgICAgICBuZy1mb2N1cz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBuZy1rZXl1cD1cXFwib25TZWFyY2hLZXlVcCgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0c1xcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRHcm91cHNcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRHcm91cFxcXCIgbmctcmVwZWF0PVxcXCJncm91cERhdGEgaW4gZ3JvdXBzIHwgb3JkZXJCeTonLW9yZGVyJ1xcXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBUaXRsZVxcXCI+e3tncm91cERhdGEuZ3JvdXAubmFtZX19PC9kaXY+XFxuICAgICAgICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3RcXG4gICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJncm91cERhdGEucGVvcGxlXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5tZWRpdW1dICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSA9XG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLWNvbXBhY3RcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlcnNvbmFcXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVyc29ucyB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtcHJlc2VuY2U9XFxcInt7cGVyc29uLnByZXNlbmNlfX1cXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1pbWFnZS11cmw9XFxcInt7cGVyc29uLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0Pnt7cGVyc29uLnByaW1hcnlUZXh0fX08L3VpZi1wZXJzb25hLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICA8YnV0dG9uXFxuICAgICAgICAgICAgICAgIG5nLWlmPVxcXCIhbmdEaXNhYmxlZFxcXCJcXG4gICAgICAgICAgICAgICAgdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlKHBlcnNvbiwgJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hUmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwVGl0bGVcXFwiPnt7Z3JvdXBEYXRhLmdyb3VwLm5hbWV9fTwvZGl2PlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1waWNrZXItdHlwZT1cXFwiXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWFyY2hSZXN1bHRzXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5tZW1iZXJMaXN0XSA9IFwiXFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyIG1zLVBlb3BsZVBpY2tlci0tbWVtYmVyc0xpc3RcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7e3BsYWNlaG9sZGVyfX1cXFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcInNlYXJjaFF1ZXJ5XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0ucm91bmRdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUubWVkaXVtXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkIG5nLW1vZGVsPVxcXCJzZWxlY3RlZFBlcnNvbnNcXFwiXFxuICAgICAgICB1aWYtc2VsZWN0ZWQtcGVyc29uLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2U9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQ+XFxuICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0gPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLUZhY2VwaWxlXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlb3BsZUxpc3RIZWFkZXJcXFwiPlxcbiAgICAgICAgICAgICAgPHNwYW4+e3tmYWNlUGlsZUhlYWRlcn19PC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3RcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJhZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlXFxcIlxcbiAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5yb3VuZF0gKyBcIlxcXCJcXG4gICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUuc21hbGxdICsgXCJcXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1aWYtc2VhcmNoLW1vcmVcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8dWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQgbmctbW9kZWw9XFxcInNlbGVjdGVkUGVyc29uc1xcXCJcXG4gICAgICAgIHVpZi1zZWxlY3RlZC1wZXJzb24tY2xpY2s9XFxcIm9uU2VsZWN0ZWRQZXJzb25DbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbG9zZT1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWlmLXBlb3BsZS1oZWFkZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgPC91aWYtcGVvcGxlLXBpY2tlci1zZWxlY3RlZD5cXG5cXG4gICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUoJGRvY3VtZW50LCAkdGltZW91dCwgJGxvZywgJHdpbmRvdyk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckZG9jdW1lbnQnLCAnJHRpbWVvdXQnLCAnJGxvZycsICckd2luZG93J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmluaXREaXNhYmxlZFN0YXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkc2NvcGUsICRhdHRycykge1xuICAgICAgICB2YXIgJHNlYXJjaEZpZWxkID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgICRhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICRzZWFyY2hGaWVsZC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNlYXJjaEZpZWxkLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5hbmltYXRlU2VsZWN0ZWRQZW9wbGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRzZWxlY3RlZFBlb3BsZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlJykpO1xuICAgICAgICAkc2VsZWN0ZWRQZW9wbGUuYWRkQ2xhc3MoJ21zLXUtc2xpZGVEb3duSW4yMCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgJHNlbGVjdGVkUGVvcGxlLnJlbW92ZUNsYXNzKCdtcy11LXNsaWRlRG93bkluMjAnKTsgfSwgMTAwMCk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmN1cnJlbnRZUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiR3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQodGhpcy4kZG9jdW1lbnRbMF0pLmZpbmQoJ2JvZHknKVswXTtcbiAgICAgICAgaWYgKGJvZHkuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLmVsbVlQb3NpdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciB5ID0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgIHZhciBub2RlID0gZWxlbWVudDtcbiAgICAgICAgd2hpbGUgKG5vZGUub2Zmc2V0UGFyZW50ICYmIG5vZGUub2Zmc2V0UGFyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBub2RlID0gKG5vZGUub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICAgIHkgKz0gbm9kZS5vZmZzZXRUb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnNtb290aFNjcm9sbFRvID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHN0YXJ0WSA9IHRoaXMuY3VycmVudFlQb3NpdGlvbigpO1xuICAgICAgICB2YXIgc3RvcFkgPSB0aGlzLmVsbVlQb3NpdGlvbihlbGVtZW50KTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gc3RvcFkgPiBzdGFydFkgPyBzdG9wWSAtIHN0YXJ0WSA6IHN0YXJ0WSAtIHN0b3BZO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCAxMDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdG9wWSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNwZWVkID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDMwKTtcbiAgICAgICAgaWYgKHNwZWVkID49IDIwKSB7XG4gICAgICAgICAgICBzcGVlZCA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGVwID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDI1KTtcbiAgICAgICAgdmFyIGxlYXBZID0gc3RvcFkgPiBzdGFydFkgPyBzdGFydFkgKyBzdGVwIDogc3RhcnRZIC0gc3RlcDtcbiAgICAgICAgdmFyIHRpbWVyID0gMDtcbiAgICAgICAgaWYgKHN0b3BZID4gc3RhcnRZKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRZOyBpIDwgc3RvcFk7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiAobFksIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbFkpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0ICogc3BlZWQpO1xuICAgICAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICAgICAgbGVhcFkgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAobGVhcFkgPiBzdG9wWSkge1xuICAgICAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydFk7IGkgPiBzdG9wWTsgaSAtPSBzdGVwKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKGxZLCB0KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBsWSk7XG4gICAgICAgICAgICAgICAgfSwgdCAqIHNwZWVkKTtcbiAgICAgICAgICAgIH0pKGxlYXBZLCB0aW1lcik7XG4gICAgICAgICAgICBsZWFwWSAtPSBzdGVwO1xuICAgICAgICAgICAgaWYgKGxlYXBZIDwgc3RvcFkpIHtcbiAgICAgICAgICAgICAgICBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXIrKztcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZUhlYWRlciA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLXBlb3BsZS1oZWFkZXInKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRDb3VudCcpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRGYWNlUGlsZVNlYXJjaE1vcmUgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1zZWFyY2gtbW9yZScpKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ21zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJEaXJlY3RpdmUucHJvdG90eXBlLnJlc2l6ZVNlYXJjaEZpZWxkID0gZnVuY3Rpb24gKCRwZW9wbGVQaWNrZXIpIHtcbiAgICAgICAgdmFyICRzZWFyY2hCb3ggPSBhbmd1bGFyLmVsZW1lbnQoJHBlb3BsZVBpY2tlclswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveCcpKTtcbiAgICAgICAgdmFyICRzZWFyY2hGaWVsZCA9IGFuZ3VsYXIuZWxlbWVudCgkcGVvcGxlUGlja2VyWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGQnKSk7XG4gICAgICAgIHZhciBzZWFyY2hCb3hMZWZ0RWRnZSA9ICRzZWFyY2hCb3gucHJvcCgnb2Zmc2V0TGVmdCcpO1xuICAgICAgICB2YXIgc2VhcmNoQm94V2lkdGggPSAkc2VhcmNoQm94WzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgc2VhcmNoQm94UmlnaHRFZGdlID0gc2VhcmNoQm94TGVmdEVkZ2UgKyBzZWFyY2hCb3hXaWR0aDtcbiAgICAgICAgdmFyICRwZXJzb25hTm9kZXMgPSAkc2VhcmNoQm94WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1QZW9wbGVQaWNrZXItcGVyc29uYScpO1xuICAgICAgICBpZiAoJHBlcnNvbmFOb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRzZWFyY2hGaWVsZFswXS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGxhc3RQZXJzb25hID0gYW5ndWxhci5lbGVtZW50KCRwZXJzb25hTm9kZXNbJHBlcnNvbmFOb2Rlcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYUxlZnRFZGdlID0gJGxhc3RQZXJzb25hLnByb3AoJ29mZnNldExlZnQnKTtcbiAgICAgICAgdmFyIGxhc3RQZXJzb25hV2lkdGggPSAkbGFzdFBlcnNvbmFbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYVJpZ2h0RWRnZSA9IGxhc3RQZXJzb25hTGVmdEVkZ2UgKyBsYXN0UGVyc29uYVdpZHRoO1xuICAgICAgICB2YXIgbmV3RmllbGRXaWR0aCA9IHNlYXJjaEJveFJpZ2h0RWRnZSAtIGxhc3RQZXJzb25hUmlnaHRFZGdlIC0gNTtcbiAgICAgICAgaWYgKG5ld0ZpZWxkV2lkdGggPCAxMDApIHtcbiAgICAgICAgICAgIG5ld0ZpZWxkV2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSBuZXdGaWVsZFdpZHRoICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFBlb3BsZVBpY2tlckRpcmVjdGl2ZTtcbn0oKSk7XG5QZW9wbGVQaWNrZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZQZW9wbGVQaWNrZXInO1xuZXhwb3J0cy5QZW9wbGVQaWNrZXJEaXJlY3RpdmUgPSBQZW9wbGVQaWNrZXJEaXJlY3RpdmU7XG52YXIgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8dWwgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRMaXN0XFxcIj5cXG4gICAgPGxpIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0XFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBwZW9wbGUgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRCdG5cXFwiXFxuICAgICAgbmctY2xhc3M9XFxcInsnbXMtUGVvcGxlUGlja2VyLXJlc3VsdEJ0bi0tY29tcGFjdCc6IHBpY2tlclR5cGUgPT09ICdjb21wYWN0J31cXFwiIG5nLWNsaWNrPVxcXCJvblBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCI+XFxuICAgICAgICA8dWlmLXBlcnNvbmFcXG4gICAgICAgICAgdWlmLXN0eWxlPVxcXCJ7e3BlcnNvblN0eWxlfX1cXFwiXFxuICAgICAgICAgIHVpZi1zaXplPVxcXCJ7e3BlcnNvblNpemV9fVxcXCJcXG4gICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICB1aWYtaW1hZ2UtdXJsPVxcXCJ7e3BlcnNvbi5pY29ufX1cXFwiPlxcbiAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgIDx1aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD57e3BlcnNvbi5zZWNvbmRhcnlUZXh0fX08L3VpZi1wZXJzb25hLXNlY29uZGFyeS10ZXh0PlxcbiAgICAgICAgPC91aWYtcGVyc29uYT5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICBuZy1pZj1cXFwiIXBlcnNvbi5hZGRpdGlvbmFsRGF0YSAmJiBvblBlcnNvbkNsb3NlQ2xpY2soKVxcXCJcXG4gICAgICAgICAgbmctY2xpY2s9XFxcIm9uUGVyc29uQ2xvc2VDbGljaygpKHBlb3BsZSwgcGVyc29uLCAkZXZlbnQpXFxcIlxcbiAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEFjdGlvbiBqcy1yZXN1bHRSZW1vdmVcXFwiPlxcbiAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLnhdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICBuZy1pZj1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIlxcbiAgICAgICAgICBuZy1jbGljaz1cXFwiZXhwYW5kQWRkaXRpb25hbERhdGEoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBY3Rpb24ganMtcmVzdWx0UmVtb3ZlXFxcIj5cXG4gICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5jaGV2cm9uc0Rvd25dICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IG5nLWlmPVxcXCJwZXJzb24uYWRkaXRpb25hbERhdGFcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWRkaXRpb25hbENvbnRlbnRcXFwiPlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICBuZy1tb2RlbD1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwib25QZXJzb25DbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBlcnNvbi1jbG9zZS1jbGljaz1cXFwib25QZXJzb25DbG9zZUNsaWNrKClcXFwiXFxuICAgICAgICB1aWYtcGlja2VyLXR5cGU9XFxcInt7cGlja2VyVHlwZX19XFxcIlxcbiAgICAgICAgdWlmLXN0eWxlPVxcXCJ7e3BlcnNvblN0eWxlfX1cXFwiXFxuICAgICAgICB1aWYtc2l6ZT1cXFwie3twZXJzb25TaXplfX1cXFwiPjwvdWlmLXBlb3BsZS1waWNrZXItcmVzdWx0LWxpc3Q+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvbGk+XFxuICA8L3VsPlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25QZXJzb25DbGljazogJyZ1aWZQZXJzb25DbGljaycsXG4gICAgICAgICAgICBvblBlcnNvbkNsb3NlQ2xpY2s6ICcmdWlmUGVyc29uQ2xvc2VDbGljaycsXG4gICAgICAgICAgICBwZW9wbGU6ICc9bmdNb2RlbCcsXG4gICAgICAgICAgICBwZXJzb25TaXplOiAnQHVpZlNpemUnLFxuICAgICAgICAgICAgcGVyc29uU3R5bGU6ICdAdWlmU3R5bGUnLFxuICAgICAgICAgICAgcGlja2VyVHlwZTogJ0B1aWZQaWNrZXJUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLmV4cGFuZEFkZGl0aW9uYWxEYXRhID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkYnV0dG9uLnBhcmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnbXMtUGVvcGxlUGlja2VyLXJlc3VsdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnRvZ2dsZUNsYXNzKCdpcy1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbiA9ICRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlO1xufSgpKTtcblBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZQZW9wbGVQaWNrZXJSZXN1bHRMaXN0JztcbmV4cG9ydHMuUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZSA9IFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmU7XG52YXIgUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy5zZWFyY2hDYWxsYmFja3MgPSBbXTtcbiAgICB9XG4gICAgUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzU2VhcmNoaW5nID0gZnVuY3Rpb24gKHNlYXJjaGluZykge1xuICAgICAgICB0aGlzLiRzY29wZS5wcm9jZXNzaW5nID0gc2VhcmNoaW5nO1xuICAgICAgICBzZWFyY2hpbmcgPyB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWFyY2hpbmcnKSA6IHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlYXJjaGluZycpO1xuICAgIH07XG4gICAgcmV0dXJuIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyO1xufSgpKTtcblBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuZXhwb3J0cy5QZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlciA9IFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyO1xudmFyIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXl5cIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZSBqcy1zZWFyY2hNb3JlXFxcIlxcbiAgICBuZy1jbGFzcz1cXFwieydtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZS0tZGlzY29ubmVjdGVkJzogZGlzY29ubmVjdGVkfVxcXCI+XFxuICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1pZj1cXFwicGlja2VyVHlwZSA9PT0gJ1wiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJwaWNrZXJUeXBlID09PSAnXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5jb21wYWN0XSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInBpY2tlclR5cGUgPT09ICdcIiArIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSArIFwiJyAmJiAhZGlzY29ubmVjdGVkXFxcIlxcbiAgICAgIG5nLWNsaWNrPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4gbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVCdG4tLWNvbXBhY3RcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlSWNvblxcXCI+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcIiFkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5zZWFyY2hdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICA8dWlmLWljb24gbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLmFsZXJ0XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxuZy10cmFuc2NsdWRlIC8+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IHJvbGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcImRpc2Nvbm5lY3RlZFxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPHVpZi1zcGlubmVyIG5nLXNob3c9XFxcInByb2Nlc3NpbmdcXFwiPjwvdWlmLXNwaW5uZXI+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGRpc2Nvbm5lY3RlZDogJz11aWZEaXNjb25uZWN0ZWQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBlb3BsZVBpY2tlckN0cmwsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUucGlja2VyVHlwZSA9IHBlb3BsZVBpY2tlckN0cmwucGlja2VyVHlwZSgpO1xuICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYnJvYWRjYXN0KHBlb3BsZVNlYXJjaEV2ZW50TmFtZSwgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2hRdWVyeSgpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZTtcbn0oKSk7XG5QZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlU2VhcmNoTW9yZSc7XG5leHBvcnRzLlBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUgPSBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlO1xudmFyIFByaW1hcnlUZXh0Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJpbWFyeVRleHRDb250cm9sbGVyKCRzY29wZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKHBlb3BsZVNlYXJjaEV2ZW50TmFtZSwgZnVuY3Rpb24gKCRldmVudCwgcXVlcnkpIHtcbiAgICAgICAgICAgIF90aGlzLiRzY29wZS5zZWFyY2hRdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByaW1hcnlUZXh0Q29udHJvbGxlcjtcbn0oKSk7XG5QcmltYXJ5VGV4dENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG5leHBvcnRzLlByaW1hcnlUZXh0Q29udHJvbGxlciA9IFByaW1hcnlUZXh0Q29udHJvbGxlcjtcbnZhciBQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJpbWFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFtcIl5eXCIgKyBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFwiXl5cIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lXTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUHJpbWFyeVRleHRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5kaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZVByaW1hcnlcXFwiPlxcbiAgICA8ZGl2IG5nLXNob3c9XFxcIiRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj57e3NlYXJjaGluZ0ZvclRleHR9fSB7e3NlYXJjaFF1ZXJ5fX08L2Rpdj5cXG4gICAgPG5nLXRyYW5zY2x1ZGUgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5wcm9jZXNzaW5nXFxcIj48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaGluZ0ZvclRleHQ6ICdAP3VpZlNlYXJjaEZvclRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaGluZ0ZvclRleHQgPSAkc2NvcGUuc2VhcmNoaW5nRm9yVGV4dCB8fCAnU2VhcmNoaW5nIGZvcic7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5QcmltYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlByaW1hcnlUZXh0JztcbmV4cG9ydHMuUHJpbWFyeVRleHREaXJlY3RpdmUgPSBQcmltYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxkaXYgbmctc2hvdz1cXFwiISRwYXJlbnQuJHBhcmVudC5kaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZVNlY29uZGFyeVxcXCI+XFxuICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICB9XG4gICAgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNlY29uZGFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcblNlY29uZGFyeVRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZTZWNvbmRhcnlUZXh0JztcbmV4cG9ydHMuU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IFNlY29uZGFyeVRleHREaXJlY3RpdmU7XG52YXIgRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiRwYXJlbnQuJHBhcmVudC5kaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZVByaW1hcnlcXFwiPlxcbiAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRydWU7XG4gICAgfVxuICAgIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5EaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmRGlzY29ubmVjdGVkVGV4dCc7XG5leHBvcnRzLkRpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUgPSBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtYWN0aXZlJzogc2VsZWN0ZWRQZW9wbGUgJiYgc2VsZWN0ZWRQZW9wbGUubGVuZ3RoID4gMH1cXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkSGVhZGVyXFxcIj5cXG4gICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDx1bCBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVvcGxlXFxcIj5cXG4gICAgICAgICAgPGxpIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRQZXJzb25cXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnJvdW5kXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZSgpKHBlcnNvbiwgJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWN0aW9uIGpzLXJlc3VsdFJlbW92ZVxcXCI+XFxuICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLnhdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG9uU2VsZWN0ZWRQZXJzb25DbGljazogJyY/dWlmU2VsZWN0ZWRQZXJzb25DbGljaycsXG4gICAgICAgICAgICByZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGU6ICcmdWlmUGVyc29uQ2xvc2UnLFxuICAgICAgICAgICAgc2VsZWN0ZWRQZW9wbGU6ICc9bmdNb2RlbCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlO1xufSgpKTtcblBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyU2VsZWN0ZWQnO1xuZXhwb3J0cy5QZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSA9IFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlO1xudmFyIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gXCJeXlwiICsgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8c3BhbiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkQ291bnRcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlwiO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IHBlb3BsZVBpY2tlckN0cmwuZ2V0U2VsZWN0ZWRQZXJzb25zKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5TZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlNlbGVjdGVkUGVvcGxlSGVhZGVyJztcbmV4cG9ydHMuU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUgPSBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVvcGxlcGlja2VyJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUHJpbWFyeVRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUHJpbWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKFwiLi4vLi4vY29yZS9wZXJzb25hU3R5bGVFbnVtXCIpO1xudmFyIHBlcnNvbmFQcmVzZW5jZUVudW1fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb3JlL3BlcnNvbmFQcmVzZW5jZUVudW1cIik7XG52YXIgcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEgPSByZXF1aXJlKFwiLi4vLi4vY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW1cIik7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoXCIuL3NpemVFbnVtXCIpO1xudmFyIFBlcnNvbmFUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hVGV4dERpcmVjdGl2ZShkaXJlY3RpdmVUeXBlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9IGRpcmVjdGl2ZVR5cGU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ2xhc3NlcyA9IHtcbiAgICAgICAgICAgICdvcHRpb25hbCc6ICdtcy1QZXJzb25hLW9wdGlvbmFsVGV4dCcsXG4gICAgICAgICAgICAncHJpbWFyeSc6ICdtcy1QZXJzb25hLXByaW1hcnlUZXh0JyxcbiAgICAgICAgICAgICdzZWNvbmRhcnknOiAnbXMtUGVyc29uYS1zZWNvbmRhcnlUZXh0JyxcbiAgICAgICAgICAgICd0ZXJ0aWFyeSc6ICdtcy1QZXJzb25hLXRlcnRpYXJ5VGV4dCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aXZlVGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIicgKyBfdGhpcy5hdmFpbGFibGVDbGFzc2VzW190aGlzLmRpcmVjdGl2ZVR5cGVdICsgJ1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmVUZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodGhpcy5hdmFpbGFibGVDbGFzc2VzW3RoaXMuZGlyZWN0aXZlVHlwZV0pKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSAnb3B0aW9uYWwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFUZXh0RGlyZWN0aXZlKHR5cGUpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYVRleHREaXJlY3RpdmUgPSBQZXJzb25hVGV4dERpcmVjdGl2ZTtcbnZhciBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnXnVpZlBlcnNvbmEnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZDb2xvcic6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWluaXRpYWxzIG1zLVBlcnNvbmEtaW5pdGlhbHMtLXt7dWlmQ29sb3J9fVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+ICc7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgICAgICB2YXIgcGVyc29uYUNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNvbG9yKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZkNvbG9yID0gcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3JbcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3IuYmx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZkNvbG9yJywgZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQocGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXzEuUGVyc29uYUluaXRpYWxzQ29sb3JbbmV3Q29sb3JdKSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICsgbmV3Q29sb3IgKyAnXCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZkNvbG9yLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBJdCBzaG91bGQgYmUgbGlnaHRCbHVlLCBibHVlLCBkYXJrQmx1ZSwgdGVhbCwgbGlnaHRHcmVlbiwgZ3JlZW4sJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGRhcmtHcmVlbiwgbGlnaHRQaW5rLCBwaW5rLCBtYWdlbnRhLCBwdXJwbGUsIGJsYWNrLCBvcmFuZ2UsIHJlZCBvciBkYXJrUmVkLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hSW5pdGlhbHNEaXJlY3RpdmUgPSBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmU7XG52YXIgUGVyc29uYURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZQZXJzb25hJ107XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlcnNvbmFDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZlByZXNlbmNlJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZlNpemUnOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYVwiIG5nLWNsYXNzPVwiZ2V0UGVyc29uYUNsYXNzZXMoKVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWltYWdlQXJlYVwiIG5nLXNob3c9XCJnZXRJbWFnZUFyZWFWaXNpYmlsaXR5KClcIj4nICtcbiAgICAgICAgICAgICc8aW1nIGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZVwiIG5nLXNyYz1cInt7dWlmSW1hZ2VVcmx9fVwiIG5nLWlmPVwidWlmSW1hZ2VVcmxcIj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmVzZW5jZVwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWRldGFpbHNcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnVpZlNpemVDbGFzc2VzID0gKF9hID0ge30sXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnRpbnldID0gJ21zLVBlcnNvbmEtLXRpbnknLFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54c21hbGxdID0gJ21zLVBlcnNvbmEtLXhzJyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUuc21hbGxdID0gJ21zLVBlcnNvbmEtLXNtJyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUubGFyZ2VdID0gJ21zLVBlcnNvbmEtLWxnJyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUueGxhcmdlXSA9ICdtcy1QZXJzb25hLS14bCcsXG4gICAgICAgICAgICBfYSk7XG4gICAgICAgIHRoaXMudWlmUHJlc2VuY2VDbGFzc2VzID0gKF9iID0ge30sXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF2YWlsYWJsZV0gPSAnbXMtUGVyc29uYS0tYXZhaWxhYmxlJyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXdheV0gPSAnbXMtUGVyc29uYS0tYXdheScsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJsb2NrZWRdID0gJ21zLVBlcnNvbmEtLWJsb2NrZWQnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5idXN5XSA9ICdtcy1QZXJzb25hLS1idXN5JyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uZG5kXSA9ICdtcy1QZXJzb25hLS1kbmQnLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5vZmZsaW5lXSA9ICdtcy1QZXJzb25hLS1vZmZsaW5lJyxcbiAgICAgICAgICAgIF9iKTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hQ29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlNpemUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU2l6ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU2l6ZS4gSXQgc2hvdWxkIGJlIHRpbnksIHhzbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHhsYXJnZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmU3R5bGUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTdHlsZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU3R5bGUuIEl0IHNob3VsZCBiZSByb3VuZCBvciBzcXVhcmUuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZQcmVzZW5jZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUHJlc2VuY2UuIEl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGF3YXksIGJsb2NrZWQsIGJ1c3ksIGRuZCBvciBvZmZsaW5lLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmdldEltYWdlQXJlYVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdICE9PSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnRpbnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJzb25hQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlc2VuY2UgPSBhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aWZQcmVzZW5jZSkgPyBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSA6IHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0ub2ZmbGluZTtcbiAgICAgICAgICAgICAgICBpZiAocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdID09PSBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaXplQ2xhc3MgPSBfdGhpcy51aWZTaXplQ2xhc3Nlc1tzaXplXTtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc2l6ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKHNpemVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goX3RoaXMudWlmUHJlc2VuY2VDbGFzc2VzW3ByZXNlbmNlXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXRhaWxzV3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VBcmVhID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYS1pbWFnZUFyZWEnKSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnTmFtZSA9IGNsb25lW2ldLnRhZ05hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtUFJJTUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVNFQ09OREFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVRFUlRJQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtT1BUSU9OQUwtVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1dyYXBwZXIuYXBwZW5kKGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUlOSVRJQUxTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUFyZWEucHJlcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgfVxuICAgIFBlcnNvbmFEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFEaXJlY3RpdmUgPSBQZXJzb25hRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIHJldHVybiBQZXJzb25hQ29udHJvbGxlcjtcbn0oKSk7XG5QZXJzb25hQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5leHBvcnRzLlBlcnNvbmFDb250cm9sbGVyID0gUGVyc29uYUNvbnRyb2xsZXI7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmEnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hJywgUGVyc29uYURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUluaXRpYWxzJywgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hUHJpbWFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdwcmltYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVNlY29uZGFyeVRleHQnLCBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdzZWNvbmRhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hVGVydGlhcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hT3B0aW9uYWxUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgnJykpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9wZXJzb25hL3BlcnNvbmFEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBzaXplRW51bV8xID0gcmVxdWlyZShcIi4vc2l6ZUVudW1cIik7XG52YXIgcGxhY2Vob2xkZXJFbnVtXzEgPSByZXF1aXJlKFwiLi9wbGFjZWhvbGRlckVudW1cIik7XG52YXIgcGVyc29uYVN0eWxlRW51bV8xID0gcmVxdWlyZShcIi4uLy4uL2NvcmUvcGVyc29uYVN0eWxlRW51bVwiKTtcbnZhciBwZXJzb25hUHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKFwiLi4vLi4vY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtXCIpO1xudmFyIFBlcnNvbmFDYXJkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZQZXJzb25hQ2FyZCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAndWlmSW1hZ2VVcmwnOiAnQCcsXG4gICAgICAgICAgICAndWlmUHJlc2VuY2UnOiAnQCcsXG4gICAgICAgICAgICAndWlmU2l6ZSc6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZFwiIG5nLWNsYXNzPVwiZ2V0UGVyc29uYUNhcmRDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtcGVyc29uYVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hXCIgbmctY2xhc3M9XCJnZXRQZXJzb25hQ2xhc3NlcygpXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VBcmVhXCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPVwicGVyc29uXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8aW1nIGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZVwiIG5nLXNyYz1cInt7dWlmSW1hZ2VVcmx9fVwiIG5nLWlmPVwidWlmSW1hZ2VVcmxcIj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmVzZW5jZVwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWRldGFpbHNcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8dWwgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1hY3Rpb25zXCI+JyArXG4gICAgICAgICAgICAnPGxpIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBwZXJzb25hQ2FyZEFjdGlvbnNcIiBuZy1jbGFzcz1cImdldEFjdGlvbkNsYXNzZXMoYWN0aW9uKVwiIG5nLWNsaWNrPVwic2VsZWN0QWN0aW9uKCRldmVudCwgYWN0aW9uKVwiPicgK1xuICAgICAgICAgICAgJzx1aWYtaWNvbiB1aWYtdHlwZT17e2FjdGlvbi5pY29ufX0gbmctaWY9XCJhY3Rpb24ucGxhY2Vob2xkZXIgIT0gXFwnb3ZlcmZsb3dcXCdcIj48L3VpZi1pY29uPicgK1xuICAgICAgICAgICAgJzwvbGk+JyArXG4gICAgICAgICAgICAnPC91bD4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsQm94XCI+JyArXG4gICAgICAgICAgICAnPHVsIG5nLWNsYXNzPVwiZGV0YWlsQ2xhc3NcIj48L3VsPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICB2YXIgcGVyc29uYUNhcmRDb250cm9sbGVyID0gY29udHJvbGxlcnNbMF07XG4gICAgICAgICAgICB2YXIgaWNvbiA9IGVsZW1lbnQuZmluZCgndWlmLWljb24nKTtcbiAgICAgICAgICAgIGljb24uYWRkQ2xhc3MoJ21zLVBlcnNvbmEtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHNpemVFbnVtXzEuUGVyc29uYVNpemVbYXR0cnMudWlmU2l6ZV0pKSB7XG4gICAgICAgICAgICAgICAgcGVyc29uYUNhcmRDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmFjYXJkIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU2l6ZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU2l6ZS4gSXQgc2hvdWxkIGJlIHhzbWFsbCwgc21hbGwsIG1lZGl1bSwgbGFyZ2UsIHhsYXJnZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmU3R5bGUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlN0eWxlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTdHlsZS4gSXQgc2hvdWxkIGJlIHJvdW5kIG9yIHNxdWFyZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQocGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0pKSB7XG4gICAgICAgICAgICAgICAgcGVyc29uYUNhcmRDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmFjYXJkIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmUHJlc2VuY2UgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlByZXNlbmNlLiBJdCBzaG91bGQgYmUgYXZhaWxhYmxlLCBhd2F5LCBibG9ja2VkLCBidXN5LCBkbmQgb3Igb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5nZXRBY3Rpb25DbGFzc2VzID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25DbGFzc2VzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW2FjdGlvbi5wbGFjZWhvbGRlcl07XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS50b3ByaWdodDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnbXMtUGVyc29uYUNhcmQtYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ21zLVBlcnNvbmFDYXJkLW9yZ0NoYXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ucmVndWxhcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnbXMtUGVyc29uYUNhcmQtYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkNsYXNzZXMucHVzaCgnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25DbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5nZXRQZXJzb25hQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGVyc29uYUNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAocGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdID09PSBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0teHMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUuc21hbGw6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1zbScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5sYXJnZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWxnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnhsYXJnZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXhsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hdmFpbGFibGU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXdheTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWF3YXknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYmxvY2tlZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWJsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYnVzeTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWJ1c3knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uZG5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tZG5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLW9mZmxpbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYUNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmdldFBlcnNvbmFDYXJkQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdID09PSBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmUgPyAnbXMtUGVyc29uYUNhcmQtLXNxdWFyZScgOiAnJztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXRhaWxzV3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtZGV0YWlscycpKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uRGV0YWlsc0JveExpc3QgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hQ2FyZC1hY3Rpb25EZXRhaWxCb3gnKSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3VsJykuZXEoMCk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnNMaXN0ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYUNhcmQtYWN0aW9ucycpKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdOYW1lID0gY2xvbmVbaV0udGFnTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELVBSSU1BUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELVNFQ09OREFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLUNBUkQtVEVSVElBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELU9QVElPTkFMLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNXcmFwcGVyLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELUFDVElPTic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRBY3Rpb24gPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHdyYXBwZWRBY3Rpb24uYXR0cigndWlmLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlcl0gPT09IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS5vdmVyZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTGlzdC5hcHBlbmQod3JhcHBlZEFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25EZXRhaWxzQm94TGlzdC5hcHBlbmQoX3RoaXMucHJvY2Vzc0FjdGlvbih3cmFwcGVkQWN0aW9uLCBzY29wZSwgcGVyc29uYUNhcmRDb250cm9sbGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQZXJzb25hQ2FyZERpcmVjdGl2ZS5wcm90b3R5cGUucHJvY2Vzc0FjdGlvbiA9IGZ1bmN0aW9uIChjbG9uZSwgc2NvcGUsIHBlcnNvbmFDYXJkQ29udHJvbGxlcikge1xuICAgICAgICB2YXIgY2xhc3NUb0FkZCA9ICcnO1xuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjbG9uZS5hdHRyKCd1aWYtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgdmFyIGljb24gPSBjbG9uZS5hdHRyKCd1aWYtaWNvbicpO1xuICAgICAgICB2YXIgYWN0aW9uVG9BZGQgPSBuZXcgUGVyc29uYUNhcmRBY3Rpb24oaWNvbiwgcGxhY2Vob2xkZXIpO1xuICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBjYXNlIHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVtwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ucmVndWxhcl06XG4gICAgICAgICAgICAgICAgY2xhc3NUb0FkZCA9ICdkZXRhaWwtJyArICgrK3Njb3BlLnJlZ3VsYXJBY3Rpb25zQ291bnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnRvcHJpZ2h0XTpcbiAgICAgICAgICAgICAgICBjbGFzc1RvQWRkID0gJ2RldGFpbC01JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2xvbmUuZmluZCgnbGknKS5lcSgwKS5hZGRDbGFzcyhjbGFzc1RvQWRkKTtcbiAgICAgICAgYWN0aW9uVG9BZGQuZGV0YWlsQ2xhc3MgPSBjbGFzc1RvQWRkO1xuICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuYWRkQWN0aW9uKGFjdGlvblRvQWRkKTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREaXJlY3RpdmUgPSBQZXJzb25hQ2FyZERpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkQ29udHJvbGxlcigkbG9nLCAkc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuZGV0YWlsQ3NzID0ge1xuICAgICAgICAgICAgMTogJ0NoYXQnLFxuICAgICAgICAgICAgMjogJ1Bob25lJyxcbiAgICAgICAgICAgIDM6ICdWaWRlbycsXG4gICAgICAgICAgICA0OiAnTWFpbCcsXG4gICAgICAgICAgICA1OiAnT3JnJ1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUucGVyc29uYUNhcmRBY3Rpb25zID0gbmV3IEFycmF5KCk7XG4gICAgICAgICRzY29wZS5yZWd1bGFyQWN0aW9uc0NvdW50ID0gMDtcbiAgICAgICAgJHNjb3BlLmRldGFpbENsYXNzID0gJ21zLVBlcnNvbmFDYXJkLWRldGFpbENoYXQnO1xuICAgICAgICAkc2NvcGUuc2VsZWN0QWN0aW9uID0gZnVuY3Rpb24gKCRldmVudCwgYWN0aW9uKSB7XG4gICAgICAgICAgICAkc2NvcGUucGVyc29uYUNhcmRBY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWN0aW9uLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBkZXRhaWxOdW1iZXIgPSArKGFjdGlvbi5kZXRhaWxDbGFzcy5jaGFyQXQoYWN0aW9uLmRldGFpbENsYXNzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICRzY29wZS5kZXRhaWxDbGFzcyA9ICdtcy1QZXJzb25hQ2FyZC1kZXRhaWwnICsgX3RoaXMuZGV0YWlsQ3NzW2RldGFpbE51bWJlcl07XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkQ29udHJvbGxlci5wcm90b3R5cGUuYWRkQWN0aW9uID0gZnVuY3Rpb24gKGFjdGlvblRvQWRkKSB7XG4gICAgICAgIGlmICh0aGlzLiRzY29wZS5wZXJzb25hQ2FyZEFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhY3Rpb25Ub0FkZC5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kc2NvcGUucGVyc29uYUNhcmRBY3Rpb25zLnB1c2goYWN0aW9uVG9BZGQpO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkQ29udHJvbGxlcjtcbn0oKSk7XG5QZXJzb25hQ2FyZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICckc2NvcGUnXTtcbmV4cG9ydHMuUGVyc29uYUNhcmRDb250cm9sbGVyID0gUGVyc29uYUNhcmRDb250cm9sbGVyO1xudmFyIFBlcnNvbmFDYXJkQWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZEFjdGlvbihpY29uLCBwbGFjZWhvbGRlcikge1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIHJldHVybiBQZXJzb25hQ2FyZEFjdGlvbjtcbn0oKSk7XG52YXIgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnLFxuICAgICAgICAgICAgJ3ByaW1hcnknOiAnbXMtUGVyc29uYS1wcmltYXJ5VGV4dCcsXG4gICAgICAgICAgICAnc2Vjb25kYXJ5JzogJ21zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dCcsXG4gICAgICAgICAgICAndGVydGlhcnknOiAnbXMtUGVyc29uYS10ZXJ0aWFyeVRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHRoaXMuYXZhaWxhYmxlQ2xhc3Nlc1t0aGlzLmRpcmVjdGl2ZVR5cGVdKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gJ29wdGlvbmFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlKHR5cGUpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmUGVyc29uYUNhcmQnO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VFbGVtZW50LCBhY3Rpb25BdHRycykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGFjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcl0pKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiJyArIGFjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZQbGFjZWhvbGRlci4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIsIHRvcHJpZ2h0IG9yIG92ZXJmbG93LicpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXJdID09PSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ub3ZlcmZsb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxsaSBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLW92ZXJmbG93XCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJzxsaSBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbkRldGFpbHNcIiBuZy10cmFuc2NsdWRlPjwvbGk+JztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWRldGFpbExhYmVsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERldGFpbExpbmVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmQtZGV0YWlsTGluZVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlID0gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkJywgUGVyc29uYUNhcmREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkQWN0aW9uJywgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkRGV0YWlsTGFiZWwnLCBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZERldGFpbExpbmUnLCBQZXJzb25hQ2FyZERldGFpbExpbmVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkUHJpbWFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgncHJpbWFyeScpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkU2Vjb25kYXJ5VGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCdzZWNvbmRhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFRlcnRpYXJ5VGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCd0ZXJ0aWFyeScpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFDYXJkT3B0aW9uYWxUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJycpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBsYWNlaG9sZGVyRW51bTtcbihmdW5jdGlvbiAoUGxhY2Vob2xkZXJFbnVtKSB7XG4gICAgUGxhY2Vob2xkZXJFbnVtW1BsYWNlaG9sZGVyRW51bVtcInJlZ3VsYXJcIl0gPSAwXSA9IFwicmVndWxhclwiO1xuICAgIFBsYWNlaG9sZGVyRW51bVtQbGFjZWhvbGRlckVudW1bXCJ0b3ByaWdodFwiXSA9IDFdID0gXCJ0b3ByaWdodFwiO1xuICAgIFBsYWNlaG9sZGVyRW51bVtQbGFjZWhvbGRlckVudW1bXCJvdmVyZmxvd1wiXSA9IDJdID0gXCJvdmVyZmxvd1wiO1xufSkoUGxhY2Vob2xkZXJFbnVtID0gZXhwb3J0cy5QbGFjZWhvbGRlckVudW0gfHwgKGV4cG9ydHMuUGxhY2Vob2xkZXJFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGxhY2Vob2xkZXJFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQZXJzb25hU2l6ZTtcbihmdW5jdGlvbiAoUGVyc29uYVNpemUpIHtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhzbWFsbFwiXSA9IDBdID0gXCJ4c21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInNtYWxsXCJdID0gMV0gPSBcInNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJtZWRpdW1cIl0gPSAyXSA9IFwibWVkaXVtXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJsYXJnZVwiXSA9IDNdID0gXCJsYXJnZVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieGxhcmdlXCJdID0gNF0gPSBcInhsYXJnZVwiO1xufSkoUGVyc29uYVNpemUgPSBleHBvcnRzLlBlcnNvbmFTaXplIHx8IChleHBvcnRzLlBlcnNvbmFTaXplID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvc2l6ZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBwaXZvdFNpemVFbnVtXzEgPSByZXF1aXJlKFwiLi9waXZvdFNpemVFbnVtXCIpO1xudmFyIHBpdm90VHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL3Bpdm90VHlwZUVudW1cIik7XG52YXIgUGl2b3RDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdENvbnRyb2xsZXIoJGxvZywgJHNjb3BlKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICAkc2NvcGUucGl2b3RDbGljayA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLnVpZlBpdm90cy5mb3JFYWNoKGZ1bmN0aW9uIChwaXZvdEl0ZW0sIHBpdm90SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBwaXZvdEl0ZW0uc2VsZWN0ZWQgPSBwaXZvdEluZGV4ID09PSBpbmRleDtcbiAgICAgICAgICAgICAgICBpZiAocGl2b3RJdGVtLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51aWZTZWxlY3RlZCA9IHBpdm90SXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIFBpdm90Q29udHJvbGxlcjtcbn0oKSk7XG5QaXZvdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICckc2NvcGUnXTtcbmV4cG9ydHMuUGl2b3RDb250cm9sbGVyID0gUGl2b3RDb250cm9sbGVyO1xudmFyIFBpdm90SXRlbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGl2b3RJdGVtKHRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB9XG4gICAgcmV0dXJuIFBpdm90SXRlbTtcbn0oKSk7XG5leHBvcnRzLlBpdm90SXRlbSA9IFBpdm90SXRlbTtcbnZhciBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1QaXZvdC1saW5rIG1zLVBpdm90LWxpbmstLW92ZXJmbG93XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1pY29uIHVpZi10eXBlPVwiZWxsaXBzaXNcIiBjbGFzcz1cIm1zLVBpdm90LWVsbGlwc2lzXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC9saT4nO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgfVxuICAgIFBpdm90RWxsaXBzaXNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBpdm90RWxsaXBzaXNEaXJlY3RpdmUgPSBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlO1xudmFyIFBpdm90RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQaXZvdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBpdm90Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZQaXZvdCddO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx1bCBjbGFzcz1cIm1zLVBpdm90XCIgbmctY2xhc3M9XCJnZXRDbGFzc2VzKClcIiA+JyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0LXN0YXJ0PVwicGl2b3QgaW4gdWlmUGl2b3RzXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm1zLVBpdm90LWxpbmtcIiBuZy1jbGljaz1cInBpdm90Q2xpY2soJGluZGV4KVwiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ2lzLXNlbGVjdGVkXFwnOiBwaXZvdC5zZWxlY3RlZH1cIj57e3Bpdm90LnRpdGxlfX08L2xpPiAnICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1yZXBlYXQtZW5kPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+JyArXG4gICAgICAgICAgICAnPC91bD4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmUGl2b3RzOiAnPT8nLFxuICAgICAgICAgICAgdWlmU2VsZWN0ZWQ6ICc9PycsXG4gICAgICAgICAgICB1aWZTaXplOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGl2b3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQaXZvdERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGl2b3REaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGludGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHBpdm90Q29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlNpemUnLCBmdW5jdGlvbiAobmV3U2l6ZSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1NpemUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQocGl2b3RTaXplRW51bV8xLlBpdm90U2l6ZVtuZXdTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBwaXZvdENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGl2b3QgLSBVbnN1cHBvcnRlZCBzaXplOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiJyArIG5ld1NpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSByZWd1bGFyIG9yIGxhcmdlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1R5cGUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdUeXBlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBpdm90VHlwZUVudW1fMS5QaXZvdFR5cGVbbmV3VHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgcGl2b3RDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBpdm90IC0gVW5zdXBwb3J0ZWQgc2l6ZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdcIicgKyBuZXdUeXBlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiBJdCBzaG91bGQgYmUgcmVndWxhciBvciB0YWJzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZTZWxlY3RlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZQaXZvdHMuZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudFBpdm90KSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQaXZvdC5zZWxlY3RlZCA9IGN1cnJlbnRQaXZvdC50aXRsZSA9PT0gbmV3VmFsdWUudGl0bGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkUGl2b3RzID0gc2NvcGUudWlmUGl2b3RzLmZpbHRlcihmdW5jdGlvbiAoY3VycmVudFBpdm90KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGl2b3Quc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUGl2b3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWxlY3RlZFBpdm90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRQaXZvdHNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmdldENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9ICcnO1xuICAgICAgICAgICAgY2xhc3NlcyArPSBwaXZvdFR5cGVFbnVtXzEuUGl2b3RUeXBlW3Njb3BlLnVpZlR5cGVdID09PSBwaXZvdFR5cGVFbnVtXzEuUGl2b3RUeXBlLnRhYnMgPyAnbXMtUGl2b3QtLXRhYnMnIDogJyc7XG4gICAgICAgICAgICBjbGFzc2VzICs9IHBpdm90U2l6ZUVudW1fMS5QaXZvdFNpemVbc2NvcGUudWlmU2l6ZV0gPT09IHBpdm90U2l6ZUVudW1fMS5QaXZvdFNpemUubGFyZ2UgPyAnIG1zLVBpdm90LS1sYXJnZScgOiAnJztcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFBpdm90RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGl2b3REaXJlY3RpdmUgPSBQaXZvdERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGl2b3QnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdCcsIFBpdm90RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQaXZvdEVsbGlwc2lzJywgUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUGl2b3RTaXplO1xuKGZ1bmN0aW9uIChQaXZvdFNpemUpIHtcbiAgICBQaXZvdFNpemVbUGl2b3RTaXplW1wicmVndWxhclwiXSA9IDBdID0gXCJyZWd1bGFyXCI7XG4gICAgUGl2b3RTaXplW1Bpdm90U2l6ZVtcImxhcmdlXCJdID0gMV0gPSBcImxhcmdlXCI7XG59KShQaXZvdFNpemUgPSBleHBvcnRzLlBpdm90U2l6ZSB8fCAoZXhwb3J0cy5QaXZvdFNpemUgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdFNpemVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQaXZvdFR5cGU7XG4oZnVuY3Rpb24gKFBpdm90VHlwZSkge1xuICAgIFBpdm90VHlwZVtQaXZvdFR5cGVbXCJyZWd1bGFyXCJdID0gMF0gPSBcInJlZ3VsYXJcIjtcbiAgICBQaXZvdFR5cGVbUGl2b3RUeXBlW1widGFic1wiXSA9IDFdID0gXCJ0YWJzXCI7XG59KShQaXZvdFR5cGUgPSBleHBvcnRzLlBpdm90VHlwZSB8fCAoZXhwb3J0cy5QaXZvdFR5cGUgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdFR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3JcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbU5hbWVcIj57e3VpZk5hbWV9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1pdGVtUHJvZ3Jlc3NcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItcHJvZ3Jlc3NUcmFja1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Qcm9ncmVzc0luZGljYXRvci1wcm9ncmVzc0JhclwiIG5nLXN0eWxlPVwie3dpZHRoOiB1aWZQZXJjZW50Q29tcGxldGUrXFwnJVxcJ31cIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbURlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZOYW1lOiAnQCcsXG4gICAgICAgICAgICB1aWZQZXJjZW50Q29tcGxldGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAobG9nKSB7IHJldHVybiBuZXcgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUobG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUGVyY2VudENvbXBsZXRlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwgfHwgbmV3VmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGVyY2VudENvbXBsZXRlID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3UGVyY2VudENvbXBsZXRlID0gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obmV3UGVyY2VudENvbXBsZXRlKSB8fCBuZXdQZXJjZW50Q29tcGxldGUgPCAwIHx8IG5ld1BlcmNlbnRDb21wbGV0ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucHJvZ3Jlc3NpbmRpY2F0b3IgLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1BlcmNlbnQgY29tcGxldGUgbXVzdCBiZSBhIHZhbGlkIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMC4nKTtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZQZXJjZW50Q29tcGxldGUgPSBNYXRoLm1heChNYXRoLm1pbihuZXdQZXJjZW50Q29tcGxldGUsIDEwMCksIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlID0gUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnByb2dyZXNzaW5kaWNhdG9yJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQcm9ncmVzc0luZGljYXRvcicsIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3Byb2dyZXNzaW5kaWNhdG9yL3Byb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgU2VhcmNoQm94RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZWFyY2hCb3hEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNlYXJjaEJveFwiIG5nLWNsYXNzPVwie1xcJ2lzLWFjdGl2ZVxcJzppc0FjdGl2ZSwgXFwnaXMtZGlzYWJsZWRcXCc6aXNEaXNhYmxlZH1cIj4nICtcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJtcy1TZWFyY2hCb3gtZmllbGRcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWJsdXI9XCJpbnB1dEJsdXIoKVwiJyArXG4gICAgICAgICAgICAnIG5nLW1vZGVsPVwidmFsdWVcIiBuZy1jaGFuZ2U9XCJpbnB1dENoYW5nZSgpXCIgaWQ9XCJ7ezo6XFwnc2VhcmNoQm94X1xcJyskaWR9fVwiIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwibXMtU2VhcmNoQm94LWxhYmVsXCIgZm9yPVwie3s6OlxcJ3NlYXJjaEJveF9cXCcrJGlkfX1cIiBuZy1oaWRlPVwiaXNMYWJlbEhpZGRlblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtU2VhcmNoQm94LWljb24gbXMtSWNvbiBtcy1JY29uLS1zZWFyY2hcIiA+PC9pPiB7e3BsYWNlaG9sZGVyfX08L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJtcy1TZWFyY2hCb3gtY2xvc2VCdXR0b25cIiBuZy1tb3VzZWRvd249XCJidG5Nb3VzZWRvd24oKVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJz0/JyxcbiAgICAgICAgICAgIHZhbHVlOiAnPT9uZ01vZGVsJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTZWFyY2hCb3hEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWFyY2hCb3hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFNlYXJjaEJveERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHZhciBuZ01vZGVsQ3RybDtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGNvbnRyb2xsZXJzKSAmJiBjb250cm9sbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBuZ01vZGVsQ3RybCA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLmlzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzY29wZS5pbnB1dEZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobmdNb2RlbEN0cmwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0RGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRCbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmlzQ2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nTW9kZWxDdHJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHNjb3BlLnZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2NvcGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmdNb2RlbEN0cmwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5idG5Nb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5pc0NhbmNlbCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndmFsdWUnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAoIXNjb3BlLmlzRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHZhbCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsQ3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3BsYWNlaG9sZGVyJywgZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgICAgICAgICAgc2NvcGUucGxhY2Vob2xkZXIgPSBzZWFyY2g7XG4gICAgICAgIH0pO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzRGlzYWJsZWQgPSAhIWRpc2FibGVkO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTZWFyY2hCb3hEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5TZWFyY2hCb3hEaXJlY3RpdmUgPSBTZWFyY2hCb3hEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNlYXJjaGJveCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNlYXJjaGJveCcsIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9zZWFyY2hib3gvc2VhcmNoYm94RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgc3Bpbm5lclNpemVFbnVtXzEgPSByZXF1aXJlKFwiLi9zcGlubmVyU2l6ZUVudW1cIik7XG52YXIgU3Bpbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Bpbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtU3Bpbm5lclwiPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFNwaW5uZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ25nU2hvdyc6ICc9JyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFNwaW5uZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTcGlubmVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTcGlubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuc3Bpbm5lciAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3Bpbm5lciBzaXplIChcXCcnICsgYXR0cnMudWlmU2l6ZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemVbYXR0cnMudWlmU2l6ZV0gPT09IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplLmxhcmdlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFkZENsYXNzKCdtcy1TcGlubmVyLS1sYXJnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uZ1Nob3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1Nob3cnLCBmdW5jdGlvbiAobmV3VmlzaWJsZSwgb2xkVmlzaWJsZSwgc3Bpbm5lclNjb3BlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyU2NvcGUuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NvcGUuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgIGlmIChjbG9uZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtU3Bpbm5lci1sYWJlbCcpLmFwcGVuZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmluaXQoKTtcbiAgICB9O1xuICAgIHJldHVybiBTcGlubmVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU3Bpbm5lckRpcmVjdGl2ZSA9IFNwaW5uZXJEaXJlY3RpdmU7XG52YXIgU3Bpbm5lckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwaW5uZXJDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRpbnRlcnZhbCwgJGxvZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRpbnRlcnZhbCA9ICRpbnRlcnZhbDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5fb2Zmc2V0U2l6ZSA9IDAuMTc5O1xuICAgICAgICB0aGlzLl9udW1DaXJjbGVzID0gODtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uU3BlZWQgPSA5MDtcbiAgICAgICAgdGhpcy5fY2lyY2xlcyA9IFtdO1xuICAgICAgICAkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9wYXJlbnRTaXplID0gc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemVbX3RoaXMuJHNjb3BlLnVpZlNpemVdID09PSBzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZS5sYXJnZSA/IDI4IDogMjA7XG4gICAgICAgICAgICBfdGhpcy5jcmVhdGVDaXJjbGVzQW5kQXJyYW5nZSgpO1xuICAgICAgICAgICAgX3RoaXMuc2V0SW5pdGlhbE9wYWNpdHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX2FuaW1hdGlvbkludGVydmFsID0gJGludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IF90aGlzLl9jaXJjbGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZhZGVDaXJjbGUoX3RoaXMuX2NpcmNsZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIF90aGlzLl9hbmltYXRpb25TcGVlZCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChfdGhpcy5fYW5pbWF0aW9uSW50ZXJ2YWwpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuY3JlYXRlQ2lyY2xlc0FuZEFycmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbmdsZSA9IDA7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9wYXJlbnRTaXplICogdGhpcy5fb2Zmc2V0U2l6ZTtcbiAgICAgICAgdmFyIHN0ZXAgPSAoMiAqIE1hdGguUEkpIC8gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdmFyIGkgPSB0aGlzLl9udW1DaXJjbGVzO1xuICAgICAgICB2YXIgcmFkaXVzID0gKHRoaXMuX3BhcmVudFNpemUgLSBvZmZzZXQpICogMC41O1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgY2lyY2xlID0gdGhpcy5jcmVhdGVDaXJjbGUoKTtcbiAgICAgICAgICAgIHZhciB4ID0gTWF0aC5yb3VuZCh0aGlzLl9wYXJlbnRTaXplICogMC41ICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpIC0gY2lyY2xlWzBdLmNsaWVudFdpZHRoICogMC41KSAtIG9mZnNldCAqIDAuNTtcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5yb3VuZCh0aGlzLl9wYXJlbnRTaXplICogMC41ICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpIC0gY2lyY2xlWzBdLmNsaWVudEhlaWdodCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjaXJjbGUpO1xuICAgICAgICAgICAgY2lyY2xlLmNzcygnbGVmdCcsICh4ICsgJ3B4JykpO1xuICAgICAgICAgICAgY2lyY2xlLmNzcygndG9wJywgKHkgKyAncHgnKSk7XG4gICAgICAgICAgICBhbmdsZSArPSBzdGVwO1xuICAgICAgICAgICAgdmFyIGNpcmNsZU9iamVjdCA9IG5ldyBDaXJjbGVPYmplY3QoY2lyY2xlLCBpKTtcbiAgICAgICAgICAgIHRoaXMuX2NpcmNsZXMucHVzaChjaXJjbGVPYmplY3QpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuY3JlYXRlQ2lyY2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2lyY2xlID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgZG90U2l6ZSA9ICh0aGlzLl9wYXJlbnRTaXplICogdGhpcy5fb2Zmc2V0U2l6ZSkgKyAncHgnO1xuICAgICAgICBjaXJjbGUuYWRkQ2xhc3MoJ21zLVNwaW5uZXItY2lyY2xlJykuY3NzKCd3aWR0aCcsIGRvdFNpemUpLmNzcygnaGVpZ2h0JywgZG90U2l6ZSk7XG4gICAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0SW5pdGlhbE9wYWNpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIHRoaXMuX2ZhZGVJbmNyZW1lbnQgPSAxIC8gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdGhpcy5fY2lyY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUsIGluZGV4KSB7XG4gICAgICAgICAgICBvcGNhaXR5VG9TZXQgPSAoX3RoaXMuX2ZhZGVJbmNyZW1lbnQgKiAoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG9wY2FpdHlUb1NldDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuZmFkZUNpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdmFyIG5ld09wYWNpdHkgPSBjaXJjbGUub3BhY2l0eSAtIHRoaXMuX2ZhZGVJbmNyZW1lbnQ7XG4gICAgICAgIGlmIChuZXdPcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICAgIG5ld09wYWNpdHkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNpcmNsZS5vcGFjaXR5ID0gbmV3T3BhY2l0eTtcbiAgICB9O1xuICAgIHJldHVybiBTcGlubmVyQ29udHJvbGxlcjtcbn0oKSk7XG5TcGlubmVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGludGVydmFsJywgJyRsb2cnXTtcbnZhciBDaXJjbGVPYmplY3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENpcmNsZU9iamVjdChjaXJjbGVFbGVtZW50LCBjaXJjbGVJbmRleCkge1xuICAgICAgICB0aGlzLmNpcmNsZUVsZW1lbnQgPSBjaXJjbGVFbGVtZW50O1xuICAgICAgICB0aGlzLmNpcmNsZUluZGV4ID0gY2lyY2xlSW5kZXg7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaXJjbGVPYmplY3QucHJvdG90eXBlLCBcIm9wYWNpdHlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiArKHRoaXMuY2lyY2xlRWxlbWVudC5jc3MoJ29wYWNpdHknKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG9wYWNpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlRWxlbWVudC5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIENpcmNsZU9iamVjdDtcbn0oKSk7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNwaW5uZXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZTcGlubmVyJywgU3Bpbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFNwaW5uZXJTaXplO1xuKGZ1bmN0aW9uIChTcGlubmVyU2l6ZSkge1xuICAgIFNwaW5uZXJTaXplW1NwaW5uZXJTaXplW1wic21hbGxcIl0gPSAwXSA9IFwic21hbGxcIjtcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVtcImxhcmdlXCJdID0gMV0gPSBcImxhcmdlXCI7XG59KShTcGlubmVyU2l6ZSA9IGV4cG9ydHMuU3Bpbm5lclNpemUgfHwgKGV4cG9ydHMuU3Bpbm5lclNpemUgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJTaXplRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMSA9IHJlcXVpcmUoXCIuL3RhYmxlUm93U2VsZWN0TW9kZUVudW1cIik7XG52YXIgdGFibGVUeXBlRW51bV8xID0gcmVxdWlyZShcIi4vdGFibGVUeXBlRW51bVwiKTtcbnZhciBUYWJsZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQ29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQnkgPSBudWxsO1xuICAgICAgICB0aGlzLiRzY29wZS5vcmRlckFzYyA9IHRydWU7XG4gICAgICAgIHRoaXMuJHNjb3BlLnJvd3MgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwib3JkZXJCeVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm9yZGVyQnk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5vcmRlckJ5ID0gcHJvcGVydHk7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcIm9yZGVyQXNjXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUub3JkZXJBc2M7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG9yZGVyQXNjKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5vcmRlckFzYyA9IG9yZGVyQXNjO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJyb3dTZWxlY3RNb2RlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUucm93U2VsZWN0TW9kZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocm93U2VsZWN0TW9kZSkge1xuICAgICAgICAgICAgaWYgKHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3Jvd1NlbGVjdE1vZGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyByb3dTZWxlY3RNb2RlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi1yb3ctc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yb3dTZWxlY3RNb2RlID0gcm93U2VsZWN0TW9kZTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwicm93c1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnJvd3M7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJvd3MgPSByb3dzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJzZWxlY3RlZEl0ZW1zXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIFRhYmxlQ29udHJvbGxlcjtcbn0oKSk7XG5UYWJsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbnZhciBUYWJsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRhYmxlIG5nLWNsYXNzPVwiW1xcJ21zLVRhYmxlXFwnLCB0YWJsZVR5cGVDbGFzc11cIiBuZy10cmFuc2NsdWRlPjwvdGFibGU+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVDb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9ICd0YWJsZSc7XG4gICAgfVxuICAgIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZEl0ZW1zICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmU2VsZWN0ZWRJdGVtcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSXRlbXMgPSBudWxsO1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IHNjb3BlLiRldmFsKGF0dHJzLnVpZlNlbGVjdGVkSXRlbXMpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgPT09IHVuZGVmaW5lZCB8fCBzZWxlY3RlZEl0ZW1zID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWRJdGVtcyA9IHNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlJvd1NlbGVjdE1vZGUgIT09IHVuZGVmaW5lZCAmJiBhdHRycy51aWZSb3dTZWxlY3RNb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bYXR0cnMudWlmUm93U2VsZWN0TW9kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlJvd1NlbGVjdE1vZGUgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLXJvdy1zZWxlY3QtbW9kZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBub25lfHNpbmdsZXxtdWx0aXBsZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnJvd1NlbGVjdE1vZGUgPSBhdHRycy51aWZSb3dTZWxlY3RNb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5yb3dTZWxlY3RNb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnJvd1NlbGVjdE1vZGUgPSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmVGFibGVUeXBlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmVGFibGVUeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGFibGVUeXBlRW51bV8xLlRhYmxlVHlwZUVudW1bYXR0cnMudWlmVGFibGVUeXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVGFibGVUeXBlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi10YWJsZS10eXBlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIGZpeGVkfGZsdWlkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudGFibGVUeXBlID0gYXR0cnMudWlmVGFibGVUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS50YWJsZVR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NvcGUudGFibGVUeXBlID0gdGFibGVUeXBlRW51bV8xLlRhYmxlVHlwZUVudW1bdGFibGVUeXBlRW51bV8xLlRhYmxlVHlwZUVudW0uZmx1aWRdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS50YWJsZVR5cGUgPT09IHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW3RhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtLmZpeGVkXSkge1xuICAgICAgICAgICAgc2NvcGUudGFibGVUeXBlQ2xhc3MgPSAnbXMtVGFibGUtLWZpeGVkJztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVEaXJlY3RpdmUgPSBUYWJsZURpcmVjdGl2ZTtcbnZhciBUYWJsZVJvd0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlUm93Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZVJvd0NvbnRyb2xsZXIucHJvdG90eXBlLCBcIml0ZW1cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5pdGVtID0gaXRlbTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlUm93Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5zZWxlY3RlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBUYWJsZVJvd0NvbnRyb2xsZXI7XG59KCkpO1xuVGFibGVSb3dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG52YXIgVGFibGVSb3dEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlUm93RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0ciBuZy10cmFuc2NsdWRlPjwvdHI+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ151aWZUYWJsZSc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpdGVtOiAnPXVpZkl0ZW0nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlUm93Q29udHJvbGxlcjtcbiAgICB9XG4gICAgVGFibGVSb3dEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZVJvd0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVSb3dEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBhdHRycy51aWZTZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkU3RyaW5nID0gYXR0cnMudWlmU2VsZWN0ZWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0cmluZyAhPT0gJ3RydWUnICYmIHNlbGVjdGVkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgdGFibGUuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlNlbGVjdGVkICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhYmxlLnJvd3MucHVzaChzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucm93Q2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCB0YWJsZVJvd1Njb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSA9PT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0uc2luZ2xlXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3NbaV0gIT09IHRhYmxlUm93U2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUucm93c1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnNlbGVjdGVkSXRlbXMuc3BsaWNlKDAsIHRhYmxlLnNlbGVjdGVkSXRlbXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZWxlY3RlZEl0ZW1zLnB1c2godGFibGVSb3dTY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaXRlbUFscmVhZHlTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUuc2VsZWN0ZWRJdGVtc1tpXSA9PT0gdGFibGVSb3dTY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtQWxyZWFkeVNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaXRlbUFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZWxlY3RlZEl0ZW1zLnB1c2godGFibGVSb3dTY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5zZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5zZWxlY3RlZEl0ZW1zW2ldID09PSB0YWJsZVJvd1Njb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRhYmxlLnJvd1NlbGVjdE1vZGUgIT09IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLm5vbmVdICYmXG4gICAgICAgICAgICBzY29wZS5pdGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5vbignY2xpY2snLCBzY29wZS5yb3dDbGljayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhYmxlLnJvd1NlbGVjdE1vZGUgPT09IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLm5vbmVdKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY3NzKCdjdXJzb3InLCAnZGVmYXVsdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVSb3dEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZVJvd0RpcmVjdGl2ZSA9IFRhYmxlUm93RGlyZWN0aXZlO1xudmFyIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGQgY2xhc3M9XCJtcy1UYWJsZS1yb3dDaGVja1wiPjwvdGQ+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWydedWlmVGFibGUnLCAnP151aWZUYWJsZUhlYWQnLCAnXnVpZlRhYmxlUm93J107XG4gICAgfVxuICAgIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycykge1xuICAgICAgICB2YXIgdGhlYWQgPSBjb250cm9sbGVyc1sxXTtcbiAgICAgICAgaWYgKHRoZWFkKSB7XG4gICAgICAgICAgICB2YXIgbmV3RWxlbSA9IGFuZ3VsYXIuZWxlbWVudCgnPHRoIGNsYXNzPVwibXMtVGFibGUtcm93Q2hlY2tcIj48L3RoPicpO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LnJlcGxhY2VXaXRoKG5ld0VsZW0pO1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50ID0gbmV3RWxlbTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5yb3dTZWxlY3RDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHRhYmxlID0gY29udHJvbGxlcnNbMF07XG4gICAgICAgICAgICB2YXIgcm93ID0gY29udHJvbGxlcnNbMl07XG4gICAgICAgICAgICBpZiAodGFibGUucm93U2VsZWN0TW9kZSAhPT0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubXVsdGlwbGVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJvdy5pdGVtID09PSB1bmRlZmluZWQgfHwgcm93Lml0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2hvdWxkU2VsZWN0QWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzW2ldLnNlbGVjdGVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRTZWxlY3RBbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzW2ldLnNlbGVjdGVkICE9PSBzaG91bGRTZWxlY3RBbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnJvd3NbaV0uc2VsZWN0ZWQgPSBzaG91bGRTZWxlY3RBbGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGluc3RhbmNlRWxlbWVudC5vbignY2xpY2snLCBzY29wZS5yb3dTZWxlY3RDbGljayk7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVSb3dTZWxlY3REaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSA9IFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlO1xudmFyIFRhYmxlQ2VsbERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVDZWxsRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0ZCBuZy10cmFuc2NsdWRlPjwvdGQ+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICB9XG4gICAgVGFibGVDZWxsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVDZWxsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVDZWxsRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVDZWxsRGlyZWN0aXZlID0gVGFibGVDZWxsRGlyZWN0aXZlO1xudmFyIFRhYmxlSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGggbmctdHJhbnNjbHVkZT48L3RoPic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmVGFibGUnO1xuICAgIH1cbiAgICBUYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlSGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZUhlYWRlckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgdGFibGUpIHtcbiAgICAgICAgc2NvcGUuaGVhZGVyQ2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZS5vcmRlckJ5ID09PSBhdHRycy51aWZPcmRlckJ5KSB7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJBc2MgPSAhdGFibGUub3JkZXJBc2M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJsZS5vcmRlckJ5ID0gYXR0cnMudWlmT3JkZXJCeTtcbiAgICAgICAgICAgICAgICB0YWJsZS5vcmRlckFzYyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndGFibGUub3JkZXJCeScsIGZ1bmN0aW9uIChuZXdPcmRlckJ5LCBvbGRPcmRlckJ5LCB0YWJsZUhlYWRlclNjb3BlKSB7XG4gICAgICAgICAgICBpZiAob2xkT3JkZXJCeSAhPT0gbmV3T3JkZXJCeSAmJlxuICAgICAgICAgICAgICAgIG5ld09yZGVyQnkgPT09IGF0dHJzLnVpZk9yZGVyQnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2VsbHMgPSBpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2hpbGRyZW4gPSBjZWxscy5lcShpKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2NoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfc29ydGVyID0gX2NoaWxkcmVuLmVxKF9jaGlsZHJlbi5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfc29ydGVyLmhhc0NsYXNzKCd1aWYtc29ydC1vcmRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NvcnRlci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInVpZi1zb3J0LW9yZGVyXCI+Jm5ic3A7XFxcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2FyZXREb3duXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndGFibGUub3JkZXJBc2MnLCBmdW5jdGlvbiAobmV3T3JkZXJBc2MsIG9sZE9yZGVyQXNjLCB0YWJsZUhlYWRlclNjb3BlKSB7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBfc29ydGVyID0gaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKF9zb3J0ZXIuaGFzQ2xhc3MoJ3VpZi1zb3J0LW9yZGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZENzc0NsYXNzID0gb2xkT3JkZXJBc2MgPyAnbXMtSWNvbi0tY2FyZXREb3duJyA6ICdtcy1JY29uLS1jYXJldFVwJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0Nzc0NsYXNzID0gbmV3T3JkZXJBc2MgPyAnbXMtSWNvbi0tY2FyZXREb3duJyA6ICdtcy1JY29uLS1jYXJldFVwJztcbiAgICAgICAgICAgICAgICAgICAgX3NvcnRlci5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKG9sZENzc0NsYXNzKS5hZGRDbGFzcyhuZXdDc3NDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCd1aWZPcmRlckJ5JyBpbiBhdHRycykge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50Lm9uKCdjbGljaycsIHNjb3BlLmhlYWRlckNsaWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVIZWFkZXJEaXJlY3RpdmUgPSBUYWJsZUhlYWRlckRpcmVjdGl2ZTtcbnZhciBUYWJsZUhlYWRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUhlYWRDb250cm9sbGVyKCkge1xuICAgIH1cbiAgICByZXR1cm4gVGFibGVIZWFkQ29udHJvbGxlcjtcbn0oKSk7XG52YXIgVGFibGVIZWFkRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUhlYWREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRoZWFkIG5nLXRyYW5zY2x1ZGU+PC90aGVhZD4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBUYWJsZUhlYWRDb250cm9sbGVyO1xuICAgIH1cbiAgICBUYWJsZUhlYWREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZUhlYWREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUhlYWREaXJlY3RpdmUgPSBUYWJsZUhlYWREaXJlY3RpdmU7XG52YXIgVGFibGVCb2R5RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUJvZHlEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRib2R5IG5nLXRyYW5zY2x1ZGU+PC90Ym9keT4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgIH1cbiAgICBUYWJsZUJvZHlEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUJvZHlEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZUJvZHlEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5UYWJsZUJvZHlEaXJlY3RpdmUgPSBUYWJsZUJvZHlEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGUnLCBUYWJsZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3cnLCBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVSb3dTZWxlY3QnLCBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVDZWxsJywgVGFibGVDZWxsRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUhlYWRlcicsIFRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUhlYWQnLCBUYWJsZUhlYWREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlQm9keScsIFRhYmxlQm9keURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZURpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVGFibGVSb3dTZWxlY3RNb2RlRW51bTtcbihmdW5jdGlvbiAoVGFibGVSb3dTZWxlY3RNb2RlRW51bSkge1xuICAgIFRhYmxlUm93U2VsZWN0TW9kZUVudW1bVGFibGVSb3dTZWxlY3RNb2RlRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIFRhYmxlUm93U2VsZWN0TW9kZUVudW1bVGFibGVSb3dTZWxlY3RNb2RlRW51bVtcInNpbmdsZVwiXSA9IDFdID0gXCJzaW5nbGVcIjtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJtdWx0aXBsZVwiXSA9IDJdID0gXCJtdWx0aXBsZVwiO1xufSkoVGFibGVSb3dTZWxlY3RNb2RlRW51bSA9IGV4cG9ydHMuVGFibGVSb3dTZWxlY3RNb2RlRW51bSB8fCAoZXhwb3J0cy5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVGFibGVUeXBlRW51bTtcbihmdW5jdGlvbiAoVGFibGVUeXBlRW51bSkge1xuICAgIFRhYmxlVHlwZUVudW1bVGFibGVUeXBlRW51bVtcImZsdWlkXCJdID0gMF0gPSBcImZsdWlkXCI7XG4gICAgVGFibGVUeXBlRW51bVtUYWJsZVR5cGVFbnVtW1wiZml4ZWRcIl0gPSAxXSA9IFwiZml4ZWRcIjtcbn0pKFRhYmxlVHlwZUVudW0gPSBleHBvcnRzLlRhYmxlVHlwZUVudW0gfHwgKGV4cG9ydHMuVGFibGVUeXBlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlVHlwZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciB1aWZUeXBlRW51bV8xID0gcmVxdWlyZShcIi4vdWlmVHlwZUVudW1cIik7XG52YXIgVGV4dEZpZWxkQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGV4dEZpZWxkQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIHJldHVybiBUZXh0RmllbGRDb250cm9sbGVyO1xufSgpKTtcblRleHRGaWVsZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xudmFyIFRleHRGaWVsZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGV4dEZpZWxkRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBUZXh0RmllbGRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgbmctY2xhc3M9XCJ7XFwnaXMtYWN0aXZlXFwnOiBpc0FjdGl2ZSwgXFwnbXMtVGV4dEZpZWxkXFwnOiB0cnVlLCAnICtcbiAgICAgICAgICAgICdcXCdtcy1UZXh0RmllbGQtLXVuZGVybGluZWRcXCc6IHVpZlVuZGVybGluZWQsIFxcJ21zLVRleHRGaWVsZC0tcGxhY2Vob2xkZXJcXCc6IHBsYWNlaG9sZGVyLCAnICtcbiAgICAgICAgICAgICdcXCdpcy1yZXF1aXJlZFxcJzogcmVxdWlyZWQsIFxcJ2lzLWRpc2FibGVkXFwnOiBkaXNhYmxlZCwgXFwnbXMtVGV4dEZpZWxkLS1tdWx0aWxpbmVcXCcgOiB1aWZNdWx0aWxpbmUgfVwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBuZy1zaG93PVwibGFiZWxTaG93blwiIGNsYXNzPVwibXMtTGFiZWxcIiBuZy1jbGljaz1cImxhYmVsQ2xpY2soKVwiPnt7dWlmTGFiZWwgfHwgcGxhY2Vob2xkZXJ9fTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGlucHV0IG5nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWNoYW5nZT1cImlucHV0Q2hhbmdlKClcIiBuZy1ibHVyPVwiaW5wdXRCbHVyKClcIiBuZy1mb2N1cz1cImlucHV0Rm9jdXMoKVwiIG5nLWNsaWNrPVwiaW5wdXRDbGljaygpXCIgJyArXG4gICAgICAgICAgICAnY2xhc3M9XCJtcy1UZXh0RmllbGQtZmllbGRcIiBuZy1zaG93PVwiIXVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIiB0eXBlPVwie3t1aWZUeXBlfX1cIicgK1xuICAgICAgICAgICAgJ21pbj1cInt7bWlufX1cIiBtYXg9XCJ7e21heH19XCIgc3RlcD1cInt7c3RlcH19XCIgLz4nICtcbiAgICAgICAgICAgICc8dGV4dGFyZWEgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiICcgK1xuICAgICAgICAgICAgJ2NsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgbmctc2hvdz1cInVpZk11bHRpbGluZVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWRcIj48L3RleHRhcmVhPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtVGV4dEZpZWxkLWRlc2NyaXB0aW9uXCI+e3t1aWZEZXNjcmlwdGlvbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBtYXg6ICdAJyxcbiAgICAgICAgICAgIG1pbjogJ0AnLFxuICAgICAgICAgICAgbmdDaGFuZ2U6ICc9PycsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPT8nLFxuICAgICAgICAgICAgbmdSZXF1aXJlZDogJzw/JyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCcsXG4gICAgICAgICAgICBzdGVwOiAnQCcsXG4gICAgICAgICAgICB1aWZEZXNjcmlwdGlvbjogJ0AnLFxuICAgICAgICAgICAgdWlmTGFiZWw6ICdAJyxcbiAgICAgICAgICAgIHVpZlR5cGU6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ3VpZlRleHRmaWVsZCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgIH1cbiAgICBUZXh0RmllbGREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUZXh0RmllbGREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgdmFyIG5nTW9kZWwgPSBjb250cm9sbGVyc1sxXTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5zdGFuY2VFbGVtZW50LmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgc2NvcGUuZGlzYWJsZWQgPSB0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnOyB9KSk7XG4gICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSB0cnVlO1xuICAgICAgICBzY29wZS5yZXF1aXJlZCA9ICdyZXF1aXJlZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLnVpZk11bHRpbGluZSA9IGF0dHJzLnVpZk11bHRpbGluZSA9PT0gJ3RydWUnO1xuICAgICAgICBzY29wZS51aWZUeXBlID0gYXR0cnMudWlmVHlwZTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZUeXBlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodWlmVHlwZUVudW1fMS5JbnB1dFR5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGV4dGZpZWxkIC0gVW5zdXBwb3J0ZWQgdHlwZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdWlmVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZUeXBlID0gdWlmVHlwZUVudW1fMS5JbnB1dFR5cGVFbnVtLnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ25nUmVxdWlyZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLnVpZlVuZGVybGluZWQgPSAndWlmVW5kZXJsaW5lZCcgaW4gYXR0cnM7XG4gICAgICAgIHNjb3BlLmlucHV0Rm9jdXMgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRCbHVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBpbnN0YW5jZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlciAmJiBpbnB1dC52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmdNb2RlbCkgJiYgbmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5sYWJlbENsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBzY29wZS51aWZNdWx0aWxpbmUgPyBpbnN0YW5jZUVsZW1lbnQuZmluZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgICAgICAgICA6IGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIGlucHV0WzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Q2hhbmdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmdNb2RlbCkgJiYgbmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbC4kc2V0RGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gIW5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGV4dEZpZWxkRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGV4dEZpZWxkRGlyZWN0aXZlID0gVGV4dEZpZWxkRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50ZXh0ZmllbGQnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRleHRmaWVsZCcsIFRleHRGaWVsZERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBJbnB1dFR5cGVFbnVtO1xuKGZ1bmN0aW9uIChJbnB1dFR5cGVFbnVtKSB7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1widGV4dFwiXSA9IDBdID0gXCJ0ZXh0XCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wicGFzc3dvcmRcIl0gPSAxXSA9IFwicGFzc3dvcmRcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJlbWFpbFwiXSA9IDJdID0gXCJlbWFpbFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInVybFwiXSA9IDNdID0gXCJ1cmxcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJ0ZWxcIl0gPSA0XSA9IFwidGVsXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wicmFuZ2VcIl0gPSA1XSA9IFwicmFuZ2VcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJudW1iZXJcIl0gPSA2XSA9IFwibnVtYmVyXCI7XG59KShJbnB1dFR5cGVFbnVtID0gZXhwb3J0cy5JbnB1dFR5cGVFbnVtIHx8IChleHBvcnRzLklucHV0VHlwZUVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdWlmVHlwZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBUb2dnbGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRvZ2dsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwiW1xcJ21zLVRvZ2dsZVxcJywgdGV4dExvY2F0aW9uLCB7XFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfV1cIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRvZ2dsZS1kZXNjcmlwdGlvblwiPjxuZy10cmFuc2NsdWRlLz48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtaW5wdXRcIiAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1jaGFuZ2U9XCJjaGVja2JveENoYW5nZSgpO25nQ2hhbmdlKClcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVkXCIgJyArXG4gICAgICAgICAgICAnbmctYXR0ci1uZy10cnVlLXZhbHVlPVwie3tuZ1RydWVWYWx1ZSB8fCB1bmRlZmluZWR9fVwiIG5nLWF0dHItbmctZmFsc2UtdmFsdWU9XCJ7e25nRmFsc2VWYWx1ZSB8fCB1bmRlZmluZWR9fVwiIC8+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtVG9nZ2xlLWZpZWxkXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1MYWJlbCBtcy1MYWJlbC0tb2ZmXCI+e3t1aWZMYWJlbE9mZn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtTGFiZWwgbXMtTGFiZWwtLW9uXCI+e3t1aWZMYWJlbE9ufX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJz9uZ01vZGVsJ107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0NoYW5nZTogJyY/JyxcbiAgICAgICAgICAgIG5nRmFsc2VWYWx1ZTogJ0A/JyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9PycsXG4gICAgICAgICAgICBuZ1RydWVWYWx1ZTogJ0A/JyxcbiAgICAgICAgICAgIHVpZkxhYmVsT2ZmOiAnQCcsXG4gICAgICAgICAgICB1aWZMYWJlbE9uOiAnQCcsXG4gICAgICAgICAgICB1aWZUZXh0TG9jYXRpb246ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBUb2dnbGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUb2dnbGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRvZ2dsZURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBuZ01vZGVsQ3RybDtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGN0cmxzKSAmJiBjdHJscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBuZ01vZGVsQ3RybCA9IGN0cmxzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS51aWZUZXh0TG9jYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBsb2MgPSBzY29wZS51aWZUZXh0TG9jYXRpb247XG4gICAgICAgICAgICBsb2MgPSBsb2MuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsb2Muc2xpY2UoMSk7XG4gICAgICAgICAgICBzY29wZS50ZXh0TG9jYXRpb24gPSAnIG1zLVRvZ2dsZS0tdGV4dCcgKyBsb2M7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVsZW0uYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS5jaGVja2JveENoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsQ3RybCkgJiYgbmdNb2RlbEN0cmwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0RGlydHkoKTtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFRvZ2dsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRvZ2dsZURpcmVjdGl2ZSA9IFRvZ2dsZURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudG9nZ2xlJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUb2dnbGUnLCBUb2dnbGVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvdG9nZ2xlL3RvZ2dsZURpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUGVyc29uYUluaXRpYWxzQ29sb3I7XG4oZnVuY3Rpb24gKFBlcnNvbmFJbml0aWFsc0NvbG9yKSB7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodEJsdWVcIl0gPSAwXSA9IFwibGlnaHRCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJibHVlXCJdID0gMV0gPSBcImJsdWVcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtCbHVlXCJdID0gMl0gPSBcImRhcmtCbHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJ0ZWFsXCJdID0gM10gPSBcInRlYWxcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0R3JlZW5cIl0gPSA0XSA9IFwibGlnaHRHcmVlblwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiZ3JlZW5cIl0gPSA1XSA9IFwiZ3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtHcmVlblwiXSA9IDZdID0gXCJkYXJrR3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImxpZ2h0UGlua1wiXSA9IDddID0gXCJsaWdodFBpbmtcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcInBpbmtcIl0gPSA4XSA9IFwicGlua1wiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wibWFnZW50YVwiXSA9IDldID0gXCJtYWdlbnRhXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJwdXJwbGVcIl0gPSAxMF0gPSBcInB1cnBsZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiYmxhY2tcIl0gPSAxMV0gPSBcImJsYWNrXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJvcmFuZ2VcIl0gPSAxMl0gPSBcIm9yYW5nZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wicmVkXCJdID0gMTNdID0gXCJyZWRcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImRhcmtSZWRcIl0gPSAxNF0gPSBcImRhcmtSZWRcIjtcbn0pKFBlcnNvbmFJbml0aWFsc0NvbG9yID0gZXhwb3J0cy5QZXJzb25hSW5pdGlhbHNDb2xvciB8fCAoZXhwb3J0cy5QZXJzb25hSW5pdGlhbHNDb2xvciA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL3BlcnNvbmFJbml0aWFsc0NvbG9yRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==