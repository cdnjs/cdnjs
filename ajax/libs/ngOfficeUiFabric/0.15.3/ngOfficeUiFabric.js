/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * AngularJS (v1.6.x+) directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.15.3
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3NzJkOTQyNjkyZDkxYTE2MjM5YiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVN0eWxlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25FbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmEvc2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYVByZXNlbmNlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2NvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblRlbXBsYXRlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0QXJyb3dFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZFR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb250ZW50L2NvbnRlbnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0VudW1zLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ZhY2VwaWxlL2ZhY2VwaWxlRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdEl0ZW1TZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0TGF5b3V0RW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFubmVyL21lc3NhZ2VCYW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhci9tZXNzYWdlQmFyRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vcmdjaGFydC9vcmdDaGFydFN0eWxlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWxEaXJlY3RpdmVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Blb3BsZXBpY2tlci9wZW9wbGVQaWNrZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9wZXJzb25hRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BlcnNvbmFjYXJkRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BsYWNlaG9sZGVyRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJzb25hY2FyZC9zaXplRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waXZvdC9waXZvdFNpemVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Bpdm90L3Bpdm90VHlwZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXJEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVSb3dTZWxlY3RNb2RlRW51bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RleHRmaWVsZC90ZXh0RmllbGREaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBLCtDOzs7Ozs7O0FDQUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsK0VBQStFOzs7Ozs7OztBQ05oRjtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHlKQUF5SixxREFBcUQ7QUFDOU07QUFDQSxnSEFBZ0gscURBQXFEO0FBQ3JLO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDhDQUE4QztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL1FBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx1REFBdUQ7Ozs7Ozs7O0FDeFZ4RDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdFQUFnRTs7Ozs7Ozs7QUNWakU7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7Ozs7Ozs7O0FDVnBFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsRUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBOzs7Ozs7OztBQ0hBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3SEFBd0gsUUFBUSxnQkFBZ0IsYUFBYTtBQUM3SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLDRCQUE0QiwyVUFBMlUsNEJBQTRCLHlQQUF5UCxXQUFXLEtBQUssZUFBZSw4T0FBOE8sV0FBVyxLQUFLLGVBQWU7QUFDOStCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxrQ0FBa0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BHQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGtDQUFrQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELHdCQUF3QjtBQUM3RTtBQUNBLGdEQUFnRCx3QkFBd0I7QUFDeEU7QUFDQSx3RUFBd0Usd0JBQXdCO0FBQ2hHO0FBQ0EsbUVBQW1FLHdCQUF3QjtBQUMzRjtBQUNBLHdFQUF3RSx3QkFBd0I7QUFDaEc7QUFDQSxtRUFBbUUsd0JBQXdCO0FBQzNGO0FBQ0EseUVBQXlFLHdCQUF3QjtBQUNqRztBQUNBLG9FQUFvRSx3QkFBd0I7QUFDNUY7QUFDQSxxRUFBcUUsd0JBQXdCO0FBQzdGO0FBQ0EsZ0VBQWdFLHdCQUF3QjtBQUN4RjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMseUNBQXlDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN0xBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxxRkFBcUY7Ozs7Ozs7O0FDZHRGO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx5RUFBeUU7Ozs7Ozs7O0FDUjFFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7Ozs7Ozs7O0FDUnBFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMscUNBQXFDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxnQ0FBZ0M7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywrQkFBK0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFNQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDTmpFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixPQUFPLHVDQUF1QyxTQUFTLFdBQVcsT0FBTztBQUNuRyxpREFBaUQsYUFBYSxvQkFBb0IsY0FBYztBQUNoRywyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlDQUF5QyxFQUFFO0FBQzdFO0FBQ0EsU0FBUztBQUNULGtDQUFrQyx3REFBd0QsRUFBRSx3QkFBd0IsaUJBQWlCLEVBQUU7QUFDdkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5Q0FBeUMsRUFBRSx3QkFBd0Isa0RBQWtELEVBQUU7QUFDeko7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25NQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0RUFBNEU7Ozs7Ozs7O0FDTjdFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsa0NBQWtDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5SEFBeUgscUxBQXFMLHFCQUFxQixxSUFBcUksaUZBQWlGO0FBQ3poQjtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlZQUF5WTtBQUN6WTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDhDQUE4QztBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG9EQUFvRDtBQUNqRztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL1FBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsK0JBQStCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixVQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyx3Q0FBd0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsOEdBQThHO0FBQ3ZKO0FBQ0E7QUFDQSwwRUFBMEUsYUFBYTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSx1QkFBdUI7QUFDL0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLGtFQUFrRTtBQUNsRSwyQkFBMkIsUUFBUTtBQUNuQyxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsNEJBQTRCLEtBQUssdUJBQXVCO0FBQ2hIO0FBQ0EsOEJBQThCO0FBQzlCLCtEQUErRDtBQUMvRDtBQUNBLDBCQUEwQixNQUFNLElBQUksTUFBTTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGtDQUFrQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pTQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLGlFQUFpRTtBQUNqRSxzQ0FBc0MsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0Usb0RBQW9EO0FBQzVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxxQ0FBcUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzSkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx5RUFBeUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEdBQTBHOzs7Ozs7OztBQ2IzRztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1RUFBdUU7QUFDL0Y7QUFDQSwrQ0FBK0MsZUFBZTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlDQUF5QyxFQUFFLHdCQUF3QixrREFBa0QsRUFBRTtBQUN6SjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pJQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlqQkFBaWpCLG9CQUFvQiwrSEFBK0gsYUFBYSwrRUFBK0UsY0FBYyxLQUFLLGlCQUFpQix1V0FBdVcsaU5BQWlOLG1DQUFtQyxzYkFBc2IsZ0JBQWdCLEdBQUcsaUJBQWlCLHlLQUF5SyxvQkFBb0IsaUlBQWlJLGFBQWEsaUZBQWlGLGNBQWMsS0FBSyxpQkFBaUIsNkZBQTZGLG9CQUFvQixtR0FBbUcsc0JBQXNCO0FBQ25pRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1T0FBdU8sb2VBQW9lLHlCQUF5Qiw2Y0FBNmMsK0JBQStCO0FBQ2h0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0Q0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRCQUE0QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNkJBQTZCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtCQUErQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDJDQUEyQztBQUNoRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDZDQUE2QztBQUNsRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtDQUErQztBQUNwRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDamJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsaUdBQWlHOzs7Ozs7OztBQ1BsRztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLCtFQUErRTs7Ozs7Ozs7QUNQaEY7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMseUVBQXlFOzs7Ozs7OztBQ04xRTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1cEJBQXVwQixrQkFBa0I7QUFDenFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvSkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7OztBQ2hJQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxxRkFBcUY7Ozs7Ozs7O0FDVHRGO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1T0FBdU8sU0FBUztBQUNoUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsOERBQThELHVEQUF1RDtBQUNySDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMENBQTBDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSx3R0FBd0cseUVBQXlFO0FBQ2pMLDJIQUEySCwwQkFBMEI7QUFDcko7QUFDQTtBQUNBLHlDQUF5QyxzQ0FBc0M7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1PQUFtTyxhQUFhO0FBQ2hQO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyw0QkFBNEI7QUFDekU7QUFDQTtBQUNBLDZDQUE2Qyw0QkFBNEI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3VEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDBDQUEwQztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsMkNBQTJDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx1QkFBdUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhMQUE4TCxPQUFPO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx1Q0FBdUM7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywyQ0FBMkM7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2Q0FBNkM7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNXQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDJGQUEyRjs7Ozs7Ozs7QUNWNUY7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsaUdBQWlHOzs7Ozs7OztBQ05sRztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrRkFBa0Y7Ozs7Ozs7O0FDTm5GO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCwwQ0FBMEM7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msa0NBQWtDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDTmpFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtTQUFrUztBQUNsUztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQscURBQXFEO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcElBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNkRBQTZEOzs7Ozs7OztBQ1Y5RDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLHNCQUFzQjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4Q0FBOEM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSwyZ0JBQTJnQixpQkFBaUIsc0NBQXNDLGFBQWEseURBQXlELGNBQWMsS0FBSyxpQkFBaUIscUVBQXFFLG9CQUFvQiwrZ0JBQStnQixhQUFhLHVnQkFBdWdCLHNCQUFzQjtBQUM5ekQ7QUFDQSxvaUJBQW9pQixpQkFBaUIsc0NBQXNDLGFBQWEseURBQXlELGNBQWMsS0FBSyxpQkFBaUIscUVBQXFFLG9CQUFvQixxakJBQXFqQixhQUFhLGllQUFpZSxzQkFBc0I7QUFDdjFELCtRQUErUSxhQUFhO0FBQzVSLDBRQUEwUSxhQUFhLG1YQUFtWCxnQkFBZ0I7QUFDMXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbURBQW1ELEVBQUU7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFdBQVc7QUFDM0M7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFdBQVc7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9QQUFvUCwrREFBK0Qsd0ZBQXdGLGFBQWEsMkJBQTJCLFlBQVksK0JBQStCLGlCQUFpQixnQ0FBZ0MsYUFBYSxtREFBbUQsY0FBYyxLQUFLLGlCQUFpQiwrREFBK0Qsb0JBQW9CLHFFQUFxRSxzQkFBc0IsK2hDQUEraEMsWUFBWSwwQkFBMEIsYUFBYSx5QkFBeUIsWUFBWTtBQUN4NUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw4Q0FBOEM7QUFDbkY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNHQUFzRyx5REFBeUQ7QUFDL0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEtBQTRLLGtCQUFrQixHQUFHLGFBQWE7QUFDOU07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYseURBQXlELG9sQkFBb2xCLGlCQUFpQixvQ0FBb0MsYUFBYSx1REFBdUQsY0FBYyxLQUFLLGlCQUFpQixtRUFBbUUsb0JBQW9CLHlFQUF5RSxzQkFBc0I7QUFDbmpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN2hCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsVUFBVTtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVDQUF1QztBQUM1RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsYUFBYTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyTEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGFBQWE7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsYUFBYTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsbUNBQW1DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywyQ0FBMkM7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkNBQTZDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDhDQUE4QztBQUNuRjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvVEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0RUFBNEU7Ozs7Ozs7O0FDUDdFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdFQUFnRTs7Ozs7Ozs7QUNUakU7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUNBQXFDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdDQUFnQyxJQUFJLGFBQWE7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2QkFBNkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLG1DQUFtQywyQkFBMkI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNqSEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMERBQTBEOzs7Ozs7OztBQ04zRDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwREFBMEQ7Ozs7Ozs7O0FDTjNEO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELFNBQVM7QUFDbkU7QUFDQTtBQUNBLHNFQUFzRSxnQ0FBZ0M7QUFDdEc7QUFDQSxpRUFBaUUsZ0JBQWdCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyw0Q0FBNEM7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsbURBQW1EO0FBQ2pIO0FBQ0EsK0RBQStELHNCQUFzQjtBQUNyRixzREFBc0Qsc0JBQXNCO0FBQzVFLDBFQUEwRSxhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM0ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7OztBQ2hKQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDTmpFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkJBQTZCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHVCQUF1QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0NBQWdDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0NBQWdDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9ZQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGlHQUFpRzs7Ozs7Ozs7QUNQbEc7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0VBQXNFOzs7Ozs7OztBQ052RTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsK0dBQStHO0FBQy9HLG9GQUFvRix5QkFBeUI7QUFDN0c7QUFDQSwrRkFBK0YsU0FBUztBQUN4RyxvQkFBb0IsS0FBSyxTQUFTLEtBQUssVUFBVSxNQUFNO0FBQ3ZEO0FBQ0E7QUFDQSxzREFBc0QsZ0JBQWdCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5Q0FBeUMsRUFBRSx3QkFBd0Isa0RBQWtELEVBQUU7QUFDeko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JIQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0VBQXNFOzs7Ozs7OztBQ1h2RTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSwwQkFBMEI7QUFDakc7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRCw0REFBNEQ7QUFDNUQsc0NBQXNDLDBCQUEwQiw0QkFBNEIsMkJBQTJCO0FBQ3ZILDJCQUEyQixPQUFPO0FBQ2xDLG9EQUFvRCxhQUFhO0FBQ2pFLG1EQUFtRCxZQUFZO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsOEJBQThCLEVBQUUsd0JBQXdCLGtEQUFrRCxFQUFFO0FBQzlJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDJGQUEyRiIsImZpbGUiOiJuZ09mZmljZVVpRmFicmljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKSA6IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2Mik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzcyZDk0MjY5MmQ5MWExNjIzOWIiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYW5ndWxhclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBlcnNvbmFTdHlsZUVudW07XG4oZnVuY3Rpb24gKFBlcnNvbmFTdHlsZUVudW0pIHtcbiAgICBQZXJzb25hU3R5bGVFbnVtW1BlcnNvbmFTdHlsZUVudW1bXCJyb3VuZFwiXSA9IDBdID0gXCJyb3VuZFwiO1xuICAgIFBlcnNvbmFTdHlsZUVudW1bUGVyc29uYVN0eWxlRW51bVtcInNxdWFyZVwiXSA9IDFdID0gXCJzcXVhcmVcIjtcbn0pKFBlcnNvbmFTdHlsZUVudW0gPSBleHBvcnRzLlBlcnNvbmFTdHlsZUVudW0gfHwgKGV4cG9ydHMuUGVyc29uYVN0eWxlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL3BlcnNvbmFTdHlsZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIE1lbnVJdGVtVHlwZXM7XG4oZnVuY3Rpb24gKE1lbnVJdGVtVHlwZXMpIHtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJsaW5rXCJdID0gMF0gPSBcImxpbmtcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJkaXZpZGVyXCJdID0gMV0gPSBcImRpdmlkZXJcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJoZWFkZXJcIl0gPSAyXSA9IFwiaGVhZGVyXCI7XG4gICAgTWVudUl0ZW1UeXBlc1tNZW51SXRlbVR5cGVzW1wic3ViTWVudVwiXSA9IDNdID0gXCJzdWJNZW51XCI7XG59KShNZW51SXRlbVR5cGVzIHx8IChNZW51SXRlbVR5cGVzID0ge30pKTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmQ29udGV4dHVhbE1lbnUnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz0/dWlmSXNTZWxlY3RlZCcsXG4gICAgICAgICAgICBvbkNsaWNrOiAnJm5nQ2xpY2snLFxuICAgICAgICAgICAgdGV4dDogJz0/dWlmVGV4dCcsXG4gICAgICAgICAgICB0eXBlOiAnQHVpZlR5cGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlcyA9IHt9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW01lbnVJdGVtVHlwZXMubGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTWVudUl0ZW1UeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSB1bnN1cHBvcnRlZCBtZW51IHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICd0aGUgdHlwZSBcXCcnICsgdHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIGNvbnRleHQgbWVudS4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCB0eXBlcyBjYW4gYmUgZm91bmQgdW5kZXIgTWVudUl0ZW1UeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jb250ZXh0dWFsbWVudS9jb250ZXh0dWFsTWVudS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGNvbnRleHR1YWxNZW51Q29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJHNjb3BlLmlzU2VsZWN0ZWQgIT09ICdib29sZWFuJyAmJiAkc2NvcGUuaXNTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51IC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtc2VsZWN0ZWRcXCcuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSBcXCcnICsgdHlwZW9mICRzY29wZS5pc1NlbGVjdGVkICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGFzIHZhbGlkIHR5cGUgZm9yIFxcJ3VpZi1pcy1zZWxlY3RlZFxcJyBhdHRyaWJ1dGUgZm9yICcgK1xuICAgICAgICAgICAgICAgICAgICAnPHVpZi1jb250ZXh0dWFsLW1lbnUtaXRlbSAvPi4gVGhlIHZhbGlkIHR5cGUgaXMgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNEaXNhYmxlZCA9ICEhZGlzYWJsZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnRyYW5zY2x1ZGVDaGlsZHMoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpO1xuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuaXNNdWx0aVNlbGVjdGlvbk1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuZGVzZWxlY3RJdGVtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNTZWxlY3RlZCkgJiYgISRzY29wZS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gISRzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmNsb3NlU3ViTWVudXMobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmlzUm9vdE1lbnUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHR1YWxNZW51Q29udHJvbGxlci5jbG9zZVN1Yk1lbnVzKCRzY29wZS4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hpbGRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1kZXNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1jbG9zZScsIGZ1bmN0aW9uIChldmVudCwgbWVudUl0ZW1JZCkge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS4kaWQgIT09IG1lbnVJdGVtSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNoaWxkTWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLnN1Yk1lbnVdID1cbiAgICAgICAgICAgIFwiPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtXFxcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmsgbXMtQ29udGV4dHVhbE1lbnUtbGluay0taGFzTWVudVxcXCJcXG4gICAgICAgICAgbmctY2xhc3M9XFxcInsnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLCAnaXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkfVxcXCIgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oJGV2ZW50KVxcXCIgaHJlZj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICAgICAgPGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LXN1Yk1lbnVJY29uIG1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XFxcIj48L2k+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVpZi1jb250ZXh0LXN1Ym1lbnVcXFwiPjwvZGl2PlxcbiAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmtcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiXFxuICAgICAgICAgICAgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oJGV2ZW50KVxcXCIgaHJlZj48c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgICAgIDwvbGk+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLmhlYWRlcl0gPSBcIlxcbiAgICA8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW0gbXMtQ29udGV4dHVhbE1lbnUtaXRlbS0taGVhZGVyXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz0ndWlmLWl0ZW0tY29udGVudCc+PC9zcGFuPlxcbiAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5kaXZpZGVyXSA9IFwiPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtIG1zLUNvbnRleHR1YWxNZW51LWl0ZW0tLWRpdmlkZXJcXFwiPjwvbGk+XCI7XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRsb2cpIHsgcmV0dXJuIG5ldyBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnRyYW5zY2x1ZGVDaGlsZHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICB2YXIgaGFzQ29udGVudCA9IF90aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKTtcbiAgICAgICAgICAgIGlmICghaGFzQ29udGVudCAmJiAhJHNjb3BlLnRleHQgJiYgISRzY29wZS5oYXNDaGlsZE1lbnUgJiYgJHNjb3BlLnR5cGUgIT09ICdkaXZpZGVyJykge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51IC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgYSBjb250ZXh0dWFsIG1lbnUgaXRlbS5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ0ZvciA8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPiB5b3UgbmVlZCB0byBzcGVjaWZ5IGVpdGhlciBcXCd1aWYtdGV4dFxcJyBhcyBhdHRyaWJ1dGUgb3IgPHVpZi1jb250ZW50PiBhcyBhIGNoaWxkIGRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0SXRlbUNvbnRlbnQoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0U3ViTWVudShjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLWl0ZW0tY29udGVudCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoYW5ndWxhci5lbGVtZW50KCc8c3Bhbj4nICsgJHNjb3BlLnRleHQgKyAnPC9zcGFuPicpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRTdWJNZW51ID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtY29udGV4dC1zdWJtZW51JykpLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmhhc0l0ZW1Db250ZW50ID0gZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbn0oKSk7XG5Db250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudUl0ZW0nO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUgPSBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmU7XG52YXIgQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXIucHJvdG90eXBlLnNldENoaWxkTWVudSA9IGZ1bmN0aW9uIChjaGlsZE1lbnVDdHJsKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhhc0NoaWxkTWVudSA9IHRydWU7XG4gICAgICAgIHRoaXMuJHNjb3BlLmNoaWxkTWVudUN0cmwgPSBjaGlsZE1lbnVDdHJsO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG59KCkpO1xuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnXTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG52YXIgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8dWwgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51XFxcIiBuZy10cmFuc2NsdWRlPjwvdWw+XCI7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRleHR1YWxNZW51Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGNsb3NlT25DbGljazogJ0B1aWZDbG9zZU9uQ2xpY2snLFxuICAgICAgICAgICAgaXNPcGVuOiAnPT91aWZJc09wZW4nLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6ICdAdWlmTXVsdGlzZWxlY3QnXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY29udGV4dHVhbE1lbnVDb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBzZXRDbG9zZU9uQ2xpY2sgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jbG9zZU9uQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNsb3NlT25DbGljayA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRDbG9zZU9uQ2xpY2soJHNjb3BlLmNsb3NlT25DbGljayk7XG4gICAgICAgICRhdHRycy4kb2JzZXJ2ZSgndWlmQ2xvc2VPbkNsaWNrJywgc2V0Q2xvc2VPbkNsaWNrKTtcbiAgICAgICAgdmFyIHBhcmVudE1lbnVJdGVtQ3RybCA9ICRlbGVtZW50LmNvbnRyb2xsZXIoQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpO1xuICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQocGFyZW50TWVudUl0ZW1DdHJsKSkge1xuICAgICAgICAgICAgcGFyZW50TWVudUl0ZW1DdHJsLnNldENoaWxkTWVudShjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUubXVsdGlzZWxlY3QpICYmICRzY29wZS5tdWx0aXNlbGVjdC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdtcy1Db250ZXh0dWFsTWVudS0tbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xufSgpKTtcbkNvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmQ29udGV4dHVhbE1lbnUnO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xudmFyIENvbnRleHR1YWxNZW51Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50LCAkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5vblJvb3RNZW51Q2xvc2VkID0gW107XG4gICAgICAgIHRoaXMuaXNPcGVuQ2xhc3NOYW1lID0gJ2lzLW9wZW4nO1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkZWxlbWVudC5jb250cm9sbGVyKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKSkpIHtcbiAgICAgICAgICAgICRzY29wZS5pc1Jvb3RNZW51ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdpc09wZW4nLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICdib29sZWFuJyAmJiBuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUgLSBpbnZhbGlkIGF0dHJpYnV0ZSB0eXBlOiBcXCd1aWYtaXMtb3BlblxcJy5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIFxcJycgKyB0eXBlb2YgbmV3VmFsdWUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYXMgdmFsaWQgdHlwZSBmb3IgXFwndWlmLWlzLW9wZW5cXCcgYXR0cmlidXRlIGZvciAnICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGV4dHVhbC1tZW51IC8+LiBUaGUgdmFsaWQgdHlwZSBpcyBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGFuaW1hdGVbbmV3VmFsdWUgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oJGVsZW1lbnQsIF90aGlzLmlzT3BlbkNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uUm9vdE1lbnVDbG9zZWQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5jbG9zZU1lbnUoKTtcbiAgICAgICAgICAgIF90aGlzLmRlc2VsZWN0SXRlbXModHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJG9uKCd1aWYtbWVudS1jbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNSb290TWVudSAmJiAkc2NvcGUuY2xvc2VPbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Sb290TWVudUNsb3NlZC5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5kZXNlbGVjdEl0ZW1zID0gZnVuY3Rpb24gKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgndWlmLW1lbnUtZGVzZWxlY3QnKTtcbiAgICAgICAgaWYgKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlU3ViTWVudXMgPSBmdW5jdGlvbiAobWVudUl0ZW1Ub1NraXAsIGNsb3NlUm9vdE1lbnUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgndWlmLW1lbnUtY2xvc2UnLCBtZW51SXRlbVRvU2tpcCk7XG4gICAgICAgIGlmIChjbG9zZVJvb3RNZW51KSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgndWlmLW1lbnUtY2xvc2UnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaXNPcGVuID0gdHJ1ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNSb290TWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLmlzUm9vdE1lbnU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmlzTXVsdGlTZWxlY3Rpb25NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0aGlzLiRzY29wZS5tdWx0aXNlbGVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubXVsdGlzZWxlY3QudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5pc01lbnVPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSgpKTtcbkNvbnRleHR1YWxNZW51Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnLCAnJGxvZyddO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudUNvbnRyb2xsZXIgPSBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXI7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNvbnRleHR1YWxtZW51JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY29udGV4dHVhbG1lbnUvY29udGV4dHVhbE1lbnUudHNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSWNvbkVudW07XG4oZnVuY3Rpb24gKEljb25FbnVtKSB7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhbGVydFwiXSA9IDBdID0gXCJhbGVydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnQyXCJdID0gMV0gPSBcImFsZXJ0MlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYWxlcnRPdXRsaW5lXCJdID0gMl0gPSBcImFsZXJ0T3V0bGluZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duXCJdID0gM10gPSBcImFycm93RG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dEb3duMlwiXSA9IDRdID0gXCJhcnJvd0Rvd24yXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0Rvd25MZWZ0XCJdID0gNV0gPSBcImFycm93RG93bkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93RG93blJpZ2h0XCJdID0gNl0gPSBcImFycm93RG93blJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd0xlZnRcIl0gPSA3XSA9IFwiYXJyb3dMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1JpZ2h0XCJdID0gOF0gPSBcImFycm93UmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBcIl0gPSA5XSA9IFwiYXJyb3dVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXJyb3dVcDJcIl0gPSAxMF0gPSBcImFycm93VXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhcnJvd1VwTGVmdFwiXSA9IDExXSA9IFwiYXJyb3dVcExlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImFycm93VXBSaWdodFwiXSA9IDEyXSA9IFwiYXJyb3dVcFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhc2NlbmRpbmdcIl0gPSAxM10gPSBcImFzY2VuZGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYXRcIl0gPSAxNF0gPSBcImF0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJhdHRhY2htZW50XCJdID0gMTVdID0gXCJhdHRhY2htZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJiYWdcIl0gPSAxNl0gPSBcImJhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmFsbG9vblwiXSA9IDE3XSA9IFwiYmFsbG9vblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYmVsbFwiXSA9IDE4XSA9IFwiYmVsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9hcmRzXCJdID0gMTldID0gXCJib2FyZHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvbGRcIl0gPSAyMF0gPSBcImJvbGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImJvb2ttYXJrXCJdID0gMjFdID0gXCJib29rbWFya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYm9va3NcIl0gPSAyMl0gPSBcImJvb2tzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJicmllZmNhc2VcIl0gPSAyM10gPSBcImJyaWVmY2FzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiYnVuZGxlXCJdID0gMjRdID0gXCJidW5kbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNha2VcIl0gPSAyNV0gPSBcImNha2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyXCJdID0gMjZdID0gXCJjYWxlbmRhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FsZW5kYXJEYXlcIl0gPSAyN10gPSBcImNhbGVuZGFyRGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhclB1YmxpY1wiXSA9IDI4XSA9IFwiY2FsZW5kYXJQdWJsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhbGVuZGFyV2Vla1wiXSA9IDI5XSA9IFwiY2FsZW5kYXJXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYWxlbmRhcldvcmtXZWVrXCJdID0gMzBdID0gXCJjYWxlbmRhcldvcmtXZWVrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYW1lcmFcIl0gPSAzMV0gPSBcImNhbWVyYVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyXCJdID0gMzJdID0gXCJjYXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0RG93blwiXSA9IDMzXSA9IFwiY2FyZXREb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25MZWZ0XCJdID0gMzRdID0gXCJjYXJldERvd25MZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25PdXRsaW5lXCJdID0gMzVdID0gXCJjYXJldERvd25PdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldERvd25SaWdodFwiXSA9IDM2XSA9IFwiY2FyZXREb3duUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0TGVmdFwiXSA9IDM3XSA9IFwiY2FyZXRMZWZ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldExlZnRPdXRsaW5lXCJdID0gMzhdID0gXCJjYXJldExlZnRPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0XCJdID0gMzldID0gXCJjYXJldFJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFJpZ2h0T3V0bGluZVwiXSA9IDQwXSA9IFwiY2FyZXRSaWdodE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBcIl0gPSA0MV0gPSBcImNhcmV0VXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNhcmV0VXBMZWZ0XCJdID0gNDJdID0gXCJjYXJldFVwTGVmdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FyZXRVcE91dGxpbmVcIl0gPSA0M10gPSBcImNhcmV0VXBPdXRsaW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjYXJldFVwUmlnaHRcIl0gPSA0NF0gPSBcImNhcmV0VXBSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2FydFwiXSA9IDQ1XSA9IFwiY2FydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2F0XCJdID0gNDZdID0gXCJjYXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoYXJ0XCJdID0gNDddID0gXCJjaGFydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdFwiXSA9IDQ4XSA9IFwiY2hhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hhdEFkZFwiXSA9IDQ5XSA9IFwiY2hhdEFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hlY2tcIl0gPSA1MF0gPSBcImNoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGVja2JveFwiXSA9IDUxXSA9IFwiY2hlY2tib3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94Q2hlY2tcIl0gPSA1Ml0gPSBcImNoZWNrYm94Q2hlY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94RW1wdHlcIl0gPSA1M10gPSBcImNoZWNrYm94RW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrYm94TWl4ZWRcIl0gPSA1NF0gPSBcImNoZWNrYm94TWl4ZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZWNrUGVvcGxlXCJdID0gNTVdID0gXCJjaGVja1Blb3BsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbkRvd25cIl0gPSA1Nl0gPSBcImNoZXZyb25Eb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uTGVmdFwiXSA9IDU3XSA9IFwiY2hldnJvbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25SaWdodFwiXSA9IDU4XSA9IFwiY2hldnJvblJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uc0Rvd25cIl0gPSA1OV0gPSBcImNoZXZyb25zRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvbnNMZWZ0XCJdID0gNjBdID0gXCJjaGV2cm9uc0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zUmlnaHRcIl0gPSA2MV0gPSBcImNoZXZyb25zUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25zVXBcIl0gPSA2Ml0gPSBcImNoZXZyb25zVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0Rvd25cIl0gPSA2M10gPSBcImNoZXZyb25UaGlja0Rvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja0xlZnRcIl0gPSA2NF0gPSBcImNoZXZyb25UaGlja0xlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGlja1JpZ2h0XCJdID0gNjVdID0gXCJjaGV2cm9uVGhpY2tSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaWNrVXBcIl0gPSA2Nl0gPSBcImNoZXZyb25UaGlja1VwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaGV2cm9uVGhpbkRvd25cIl0gPSA2N10gPSBcImNoZXZyb25UaGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2hldnJvblRoaW5MZWZ0XCJdID0gNjhdID0gXCJjaGV2cm9uVGhpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluUmlnaHRcIl0gPSA2OV0gPSBcImNoZXZyb25UaGluUmlnaHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25UaGluVXBcIl0gPSA3MF0gPSBcImNoZXZyb25UaGluVXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNoZXZyb25VcFwiXSA9IDcxXSA9IFwiY2hldnJvblVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsXCJdID0gNzJdID0gXCJjaXJjbGVCYWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVCYWxsb29uc1wiXSA9IDczXSA9IFwiY2lyY2xlQmFsbG9vbnNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUNhclwiXSA9IDc0XSA9IFwiY2lyY2xlQ2FyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVDYXRcIl0gPSA3NV0gPSBcImNpcmNsZUNhdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlQ29mZmVlXCJdID0gNzZdID0gXCJjaXJjbGVDb2ZmZWVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZURvZ1wiXSA9IDc3XSA9IFwiY2lyY2xlRG9nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVFbXB0eVwiXSA9IDc4XSA9IFwiY2lyY2xlRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxcIl0gPSA3OV0gPSBcImNpcmNsZUZpbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNpcmNsZUZpbGxlZFwiXSA9IDgwXSA9IFwiY2lyY2xlRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVIYWxmRmlsbGVkXCJdID0gODFdID0gXCJjaXJjbGVIYWxmRmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVJbmZvXCJdID0gODJdID0gXCJjaXJjbGVJbmZvXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVMaWdodG5pbmdcIl0gPSA4M10gPSBcImNpcmNsZUxpZ2h0bmluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGlsbFwiXSA9IDg0XSA9IFwiY2lyY2xlUGlsbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlUGxhbmVcIl0gPSA4NV0gPSBcImNpcmNsZVBsYW5lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQbHVzXCJdID0gODZdID0gXCJjaXJjbGVQbHVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjaXJjbGVQb29kbGVcIl0gPSA4N10gPSBcImNpcmNsZVBvb2RsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2lyY2xlVW5maWxsZWRcIl0gPSA4OF0gPSBcImNpcmNsZVVuZmlsbGVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc05vdGVib29rXCJdID0gODldID0gXCJjbGFzc05vdGVib29rXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbGFzc3Jvb21cIl0gPSA5MF0gPSBcImNsYXNzcm9vbVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY2xvY2tcIl0gPSA5MV0gPSBcImNsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjbHV0dGVyXCJdID0gOTJdID0gXCJjbHV0dGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb2ZmZWVcIl0gPSA5M10gPSBcImNvZmZlZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29sbGFwc2VcIl0gPSA5NF0gPSBcImNvbGxhcHNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJjb25mbGljdFwiXSA9IDk1XSA9IFwiY29uZmxpY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RcIl0gPSA5Nl0gPSBcImNvbnRhY3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNvbnRhY3RGb3JtXCJdID0gOTddID0gXCJjb250YWN0Rm9ybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29udGFjdFB1YmxpY1wiXSA9IDk4XSA9IFwiY29udGFjdFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY29weVwiXSA9IDk5XSA9IFwiY29weVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiY3JlZGl0Q2FyZFwiXSA9IDEwMF0gPSBcImNyZWRpdENhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImNyZWRpdENhcmRPdXRsaW5lXCJdID0gMTAxXSA9IFwiY3JlZGl0Q2FyZE91dGxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRhc2hib2FyZFwiXSA9IDEwMl0gPSBcImRhc2hib2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGVzY2VuZGluZ1wiXSA9IDEwM10gPSBcImRlc2NlbmRpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRlc2t0b3BcIl0gPSAxMDRdID0gXCJkZXNrdG9wXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkZXZpY2VXaXBlXCJdID0gMTA1XSA9IFwiZGV2aWNlV2lwZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZGlhbHBhZFwiXSA9IDEwNl0gPSBcImRpYWxwYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRpcmVjdGlvbnNcIl0gPSAxMDddID0gXCJkaXJlY3Rpb25zXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudFwiXSA9IDEwOF0gPSBcImRvY3VtZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEFkZFwiXSA9IDEwOV0gPSBcImRvY3VtZW50QWRkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudEZvcndhcmRcIl0gPSAxMTBdID0gXCJkb2N1bWVudEZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50TGFuZHNjYXBlXCJdID0gMTExXSA9IFwiZG9jdW1lbnRMYW5kc2NhcGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UERGXCJdID0gMTEyXSA9IFwiZG9jdW1lbnRQREZcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50UmVwbHlcIl0gPSAxMTNdID0gXCJkb2N1bWVudFJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb2N1bWVudHNcIl0gPSAxMTRdID0gXCJkb2N1bWVudHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvY3VtZW50U2VhcmNoXCJdID0gMTE1XSA9IFwiZG9jdW1lbnRTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvZ1wiXSA9IDExNl0gPSBcImRvZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZG9nQWx0XCJdID0gMTE3XSA9IFwiZG9nQWx0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJkb3RcIl0gPSAxMThdID0gXCJkb3RcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRvd25sb2FkXCJdID0gMTE5XSA9IFwiZG93bmxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRybVwiXSA9IDEyMF0gPSBcImRybVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZHJvcFwiXSA9IDEyMV0gPSBcImRyb3BcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImRyb3Bkb3duXCJdID0gMTIyXSA9IFwiZHJvcGRvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImVkaXRCb3hcIl0gPSAxMjNdID0gXCJlZGl0Qm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbGxpcHNpc1wiXSA9IDEyNF0gPSBcImVsbGlwc2lzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJlbWJlZFwiXSA9IDEyNV0gPSBcImVtYmVkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudFwiXSA9IDEyNl0gPSBcImV2ZW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudENhbmNlbFwiXSA9IDEyN10gPSBcImV2ZW50Q2FuY2VsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJldmVudEluZm9cIl0gPSAxMjhdID0gXCJldmVudEluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50UmVjdXJyaW5nXCJdID0gMTI5XSA9IFwiZXZlbnRSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV2ZW50U2hhcmVcIl0gPSAxMzBdID0gXCJldmVudFNoYXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleGNsYW1hdGlvblwiXSA9IDEzMV0gPSBcImV4Y2xhbWF0aW9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJleHBhbmRcIl0gPSAxMzJdID0gXCJleHBhbmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImV5ZVwiXSA9IDEzM10gPSBcImV5ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmF2b3JpdGVzXCJdID0gMTM0XSA9IFwiZmF2b3JpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmYXhcIl0gPSAxMzVdID0gXCJmYXhcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpZWxkTWFpbFwiXSA9IDEzNl0gPSBcImZpZWxkTWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGROdW1iZXJcIl0gPSAxMzddID0gXCJmaWVsZE51bWJlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmllbGRUZXh0XCJdID0gMTM4XSA9IFwiZmllbGRUZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWVsZFRleHRCb3hcIl0gPSAxMzldID0gXCJmaWVsZFRleHRCb3hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZpbGVEb2N1bWVudFwiXSA9IDE0MF0gPSBcImZpbGVEb2N1bWVudFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsZUltYWdlXCJdID0gMTQxXSA9IFwiZmlsZUltYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWxlUERGXCJdID0gMTQyXSA9IFwiZmlsZVBERlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZmlsdGVyXCJdID0gMTQzXSA9IFwiZmlsdGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaWx0ZXJDbGVhclwiXSA9IDE0NF0gPSBcImZpbHRlckNsZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmaXJzdEFpZFwiXSA9IDE0NV0gPSBcImZpcnN0QWlkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmbGFnXCJdID0gMTQ2XSA9IFwiZmxhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyXCJdID0gMTQ3XSA9IFwiZm9sZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJNb3ZlXCJdID0gMTQ4XSA9IFwiZm9sZGVyTW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9sZGVyUHVibGljXCJdID0gMTQ5XSA9IFwiZm9sZGVyUHVibGljXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb2xkZXJTZWFyY2hcIl0gPSAxNTBdID0gXCJmb2xkZXJTZWFyY2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZvbnRDb2xvclwiXSA9IDE1MV0gPSBcImZvbnRDb2xvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZm9udERlY3JlYXNlXCJdID0gMTUyXSA9IFwiZm9udERlY3JlYXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJmb250SW5jcmVhc2VcIl0gPSAxNTNdID0gXCJmb250SW5jcmVhc2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImZyb3dueVwiXSA9IDE1NF0gPSBcImZyb3dueVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZnVsbHNjcmVlblwiXSA9IDE1NV0gPSBcImZ1bGxzY3JlZW5cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImdlYXJcIl0gPSAxNTZdID0gXCJnZWFyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJnbGFzc2VzXCJdID0gMTU3XSA9IFwiZ2xhc3Nlc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ2xvYmVcIl0gPSAxNThdID0gXCJnbG9iZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JhcGhcIl0gPSAxNTldID0gXCJncmFwaFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiZ3JvdXBcIl0gPSAxNjBdID0gXCJncm91cFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGVhZGVyXCJdID0gMTYxXSA9IFwiaGVhZGVyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydFwiXSA9IDE2Ml0gPSBcImhlYXJ0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJoZWFydEVtcHR5XCJdID0gMTYzXSA9IFwiaGVhcnRFbXB0eVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaGlkZVwiXSA9IDE2NF0gPSBcImhpZGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImhvbWVcIl0gPSAxNjVdID0gXCJob21lXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpbmJveENoZWNrXCJdID0gMTY2XSA9IFwiaW5ib3hDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wiaW5mb1wiXSA9IDE2N10gPSBcImluZm9cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImluZm9DaXJjbGVcIl0gPSAxNjhdID0gXCJpbmZvQ2lyY2xlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJpdGFsaWNcIl0gPSAxNjldID0gXCJpdGFsaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImtleVwiXSA9IDE3MF0gPSBcImtleVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGF0ZVwiXSA9IDE3MV0gPSBcImxhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZmVzYXZlclwiXSA9IDE3Ml0gPSBcImxpZmVzYXZlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlmZXNhdmVyTG9ja1wiXSA9IDE3M10gPSBcImxpZmVzYXZlckxvY2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpZ2h0QnVsYlwiXSA9IDE3NF0gPSBcImxpZ2h0QnVsYlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlnaHRuaW5nXCJdID0gMTc1XSA9IFwibGlnaHRuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaW5rXCJdID0gMTc2XSA9IFwibGlua1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlua1JlbW92ZVwiXSA9IDE3N10gPSBcImxpbmtSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RCdWxsZXRzXCJdID0gMTc4XSA9IFwibGlzdEJ1bGxldHNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RDaGVja1wiXSA9IDE3OV0gPSBcImxpc3RDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibGlzdENoZWNrYm94XCJdID0gMTgwXSA9IFwibGlzdENoZWNrYm94XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0R3JvdXBcIl0gPSAxODFdID0gXCJsaXN0R3JvdXBcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxpc3RHcm91cDJcIl0gPSAxODJdID0gXCJsaXN0R3JvdXAyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJsaXN0TnVtYmVyZWRcIl0gPSAxODNdID0gXCJsaXN0TnVtYmVyZWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcImxvY2tcIl0gPSAxODRdID0gXCJsb2NrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsXCJdID0gMTg1XSA9IFwibWFpbFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbENoZWNrXCJdID0gMTg2XSA9IFwibWFpbENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRG93blwiXSA9IDE4N10gPSBcIm1haWxEb3duXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRWRpdFwiXSA9IDE4OF0gPSBcIm1haWxFZGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsRW1wdHlcIl0gPSAxODldID0gXCJtYWlsRW1wdHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1haWxFcnJvclwiXSA9IDE5MF0gPSBcIm1haWxFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbE9wZW5cIl0gPSAxOTFdID0gXCJtYWlsT3BlblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFBhdXNlXCJdID0gMTkyXSA9IFwibWFpbFBhdXNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtYWlsUHVibGljXCJdID0gMTkzXSA9IFwibWFpbFB1YmxpY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFJlYWRcIl0gPSAxOTRdID0gXCJtYWlsUmVhZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFNlbmRcIl0gPSAxOTVdID0gXCJtYWlsU2VuZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFN5bmNcIl0gPSAxOTZdID0gXCJtYWlsU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWFpbFVucmVhZFwiXSA9IDE5N10gPSBcIm1haWxVbnJlYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1hcE1hcmtlclwiXSA9IDE5OF0gPSBcIm1hcE1hcmtlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWVhbFwiXSA9IDE5OV0gPSBcIm1lYWxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1lbnVcIl0gPSAyMDBdID0gXCJtZW51XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZW51MlwiXSA9IDIwMV0gPSBcIm1lbnUyXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXJnZVwiXSA9IDIwMl0gPSBcIm1lcmdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtZXRhZGF0YVwiXSA9IDIwM10gPSBcIm1ldGFkYXRhXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJtaWNyb3Bob25lXCJdID0gMjA0XSA9IFwibWljcm9waG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibWluaWF0dXJlc1wiXSA9IDIwNV0gPSBcIm1pbmlhdHVyZXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1pbnVzXCJdID0gMjA2XSA9IFwibWludXNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm1vYmlsZVwiXSA9IDIwN10gPSBcIm1vYmlsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW9uZXlcIl0gPSAyMDhdID0gXCJtb25leVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibW92ZVwiXSA9IDIwOV0gPSBcIm1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11bHRpQ2hvaWNlXCJdID0gMjEwXSA9IFwibXVsdGlDaG9pY2VcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm11c2ljXCJdID0gMjExXSA9IFwibXVzaWNcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5hdmlnYXRlXCJdID0gMjEyXSA9IFwibmF2aWdhdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5ld1wiXSA9IDIxM10gPSBcIm5ld1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibmV3c2ZlZWRcIl0gPSAyMTRdID0gXCJuZXdzZmVlZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90ZVwiXSA9IDIxNV0gPSBcIm5vdGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVib29rXCJdID0gMjE2XSA9IFwibm90ZWJvb2tcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVFZGl0XCJdID0gMjE3XSA9IFwibm90ZUVkaXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVGb3J3YXJkXCJdID0gMjE4XSA9IFwibm90ZUZvcndhcmRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm5vdGVSZXBseVwiXSA9IDIxOV0gPSBcIm5vdGVSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wibm90UmVjdXJyaW5nXCJdID0gMjIwXSA9IFwibm90UmVjdXJyaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmVkcml2ZVwiXSA9IDIyMV0gPSBcIm9uZWRyaXZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvbmxpbmVBZGRcIl0gPSAyMjJdID0gXCJvbmxpbmVBZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcIm9ubGluZUpvaW5cIl0gPSAyMjNdID0gXCJvbmxpbmVKb2luXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvb2ZSZXBseVwiXSA9IDIyNF0gPSBcIm9vZlJlcGx5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJvcmdcIl0gPSAyMjVdID0gXCJvcmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBhZ2VcIl0gPSAyMjZdID0gXCJwYWdlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYWludFwiXSA9IDIyN10gPSBcInBhaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYW5lbFwiXSA9IDIyOF0gPSBcInBhbmVsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwYXJ0bmVyXCJdID0gMjI5XSA9IFwicGFydG5lclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGF1c2VcIl0gPSAyMzBdID0gXCJwYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVuY2lsXCJdID0gMjMxXSA9IFwicGVuY2lsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVcIl0gPSAyMzJdID0gXCJwZW9wbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlb3BsZUFkZFwiXSA9IDIzM10gPSBcInBlb3BsZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlQ2hlY2tcIl0gPSAyMzRdID0gXCJwZW9wbGVDaGVja1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlRXJyb3JcIl0gPSAyMzVdID0gXCJwZW9wbGVFcnJvclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUGF1c2VcIl0gPSAyMzZdID0gXCJwZW9wbGVQYXVzZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVvcGxlUmVtb3ZlXCJdID0gMjM3XSA9IFwicGVvcGxlUmVtb3ZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTZWN1cml0eVwiXSA9IDIzOF0gPSBcInBlb3BsZVNlY3VyaXR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZW9wbGVTeW5jXCJdID0gMjM5XSA9IFwicGVvcGxlU3luY1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGVyc29uXCJdID0gMjQwXSA9IFwicGVyc29uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwZXJzb25BZGRcIl0gPSAyNDFdID0gXCJwZXJzb25BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBlcnNvblJlbW92ZVwiXSA9IDI0Ml0gPSBcInBlcnNvblJlbW92ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVcIl0gPSAyNDNdID0gXCJwaG9uZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVBZGRcIl0gPSAyNDRdID0gXCJwaG9uZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGhvbmVUcmFuc2ZlclwiXSA9IDI0NV0gPSBcInBob25lVHJhbnNmZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpY3R1cmVcIl0gPSAyNDZdID0gXCJwaWN0dXJlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaWN0dXJlQWRkXCJdID0gMjQ3XSA9IFwicGljdHVyZUFkZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZUVkaXRcIl0gPSAyNDhdID0gXCJwaWN0dXJlRWRpdFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGljdHVyZVJlbW92ZVwiXSA9IDI0OV0gPSBcInBpY3R1cmVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBpbGxcIl0gPSAyNTBdID0gXCJwaWxsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwaW5Eb3duXCJdID0gMjUxXSA9IFwicGluRG93blwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGluTGVmdFwiXSA9IDI1Ml0gPSBcInBpbkxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYWNlaG9sZGVyXCJdID0gMjUzXSA9IFwicGxhY2Vob2xkZXJcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYW5lXCJdID0gMjU0XSA9IFwicGxhbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBsYXlcIl0gPSAyNTVdID0gXCJwbGF5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwbHVzXCJdID0gMjU2XSA9IFwicGx1c1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicGx1czJcIl0gPSAyNTddID0gXCJwbHVzMlwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicG9pbnRJdGVtXCJdID0gMjU4XSA9IFwicG9pbnRJdGVtXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwb3BvdXRcIl0gPSAyNTldID0gXCJwb3BvdXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInBvc3RcIl0gPSAyNjBdID0gXCJwb3N0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcmludFwiXSA9IDI2MV0gPSBcInByaW50XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJwcm90ZWN0aW9uQ2VudGVyXCJdID0gMjYyXSA9IFwicHJvdGVjdGlvbkNlbnRlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25cIl0gPSAyNjNdID0gXCJxdWVzdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicXVlc3Rpb25SZXZlcnNlXCJdID0gMjY0XSA9IFwicXVlc3Rpb25SZXZlcnNlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJxdW90ZVwiXSA9IDI2NV0gPSBcInF1b3RlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyYWRpb0J1dHRvblwiXSA9IDI2Nl0gPSBcInJhZGlvQnV0dG9uXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWFjdGl2YXRlXCJdID0gMjY3XSA9IFwicmVhY3RpdmF0ZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicmVjZWlwdENoZWNrXCJdID0gMjY4XSA9IFwicmVjZWlwdENoZWNrXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0Rm9yd2FyZFwiXSA9IDI2OV0gPSBcInJlY2VpcHRGb3J3YXJkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWNlaXB0UmVwbHlcIl0gPSAyNzBdID0gXCJyZWNlaXB0UmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlZnJlc2hcIl0gPSAyNzFdID0gXCJyZWZyZXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJyZWxvYWRcIl0gPSAyNzJdID0gXCJyZWxvYWRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5XCJdID0gMjczXSA9IFwicmVwbHlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsXCJdID0gMjc0XSA9IFwicmVwbHlBbGxcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWxsQWx0XCJdID0gMjc1XSA9IFwicmVwbHlBbGxBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJlcGx5QWx0XCJdID0gMjc2XSA9IFwicmVwbHlBbHRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInJpYmJvblwiXSA9IDI3N10gPSBcInJpYmJvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wicm9vbVwiXSA9IDI3OF0gPSBcInJvb21cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNhdmVcIl0gPSAyNzldID0gXCJzYXZlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzY2hlZHVsaW5nXCJdID0gMjgwXSA9IFwic2NoZWR1bGluZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VhcmNoXCJdID0gMjgxXSA9IFwic2VhcmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzZWN0aW9uXCJdID0gMjgyXSA9IFwic2VjdGlvblwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2VjdGlvbnNcIl0gPSAyODNdID0gXCJzZWN0aW9uc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2V0dGluZ3NcIl0gPSAyODRdID0gXCJzZXR0aW5nc1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hhcmVcIl0gPSAyODVdID0gXCJzaGFyZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic2hpZWxkXCJdID0gMjg2XSA9IFwic2hpZWxkXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzaXRlc1wiXSA9IDI4N10gPSBcInNpdGVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzbWlsZXlcIl0gPSAyODhdID0gXCJzbWlsZXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInNvY2NlclwiXSA9IDI4OV0gPSBcInNvY2NlclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29jaWFsTGlzdGVuaW5nXCJdID0gMjkwXSA9IFwic29jaWFsTGlzdGVuaW5nXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzb3J0XCJdID0gMjkxXSA9IFwic29ydFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic29ydExpbmVzXCJdID0gMjkyXSA9IFwic29ydExpbmVzXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzcGxpdFwiXSA9IDI5M10gPSBcInNwbGl0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdGFyXCJdID0gMjk0XSA9IFwic3RhclwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3RhckVtcHR5XCJdID0gMjk1XSA9IFwic3RhckVtcHR5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdG9wd2F0Y2hcIl0gPSAyOTZdID0gXCJzdG9wd2F0Y2hcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0b3J5XCJdID0gMjk3XSA9IFwic3RvcnlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN0eWxlUmVtb3ZlXCJdID0gMjk4XSA9IFwic3R5bGVSZW1vdmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1YnNjcmliZVwiXSA9IDI5OV0gPSBcInN1YnNjcmliZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wic3VuXCJdID0gMzAwXSA9IFwic3VuXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJzdW5BZGRcIl0gPSAzMDFdID0gXCJzdW5BZGRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1blF1ZXN0aW9uXCJdID0gMzAyXSA9IFwic3VuUXVlc3Rpb25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInN1cHBvcnRcIl0gPSAzMDNdID0gXCJzdXBwb3J0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZVwiXSA9IDMwNF0gPSBcInRhYmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0YWJsZXRcIl0gPSAzMDVdID0gXCJ0YWJsZXRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhZ1wiXSA9IDMwNl0gPSBcInRhZ1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGFza1JlY3VycmluZ1wiXSA9IDMwN10gPSBcInRhc2tSZWN1cnJpbmdcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRhc2tzXCJdID0gMzA4XSA9IFwidGFza3NcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRlYW13b3JrXCJdID0gMzA5XSA9IFwidGVhbXdvcmtcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRleHRcIl0gPSAzMTBdID0gXCJ0ZXh0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0ZXh0Qm94XCJdID0gMzExXSA9IFwidGV4dEJveFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widGlsZVwiXSA9IDMxMl0gPSBcInRpbGVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRpbWVsaW5lXCJdID0gMzEzXSA9IFwidGltZWxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZGF5XCJdID0gMzE0XSA9IFwidG9kYXlcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRvZ2dsZVwiXSA9IDMxNV0gPSBcInRvZ2dsZVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widG9nZ2xlTWlkZGxlXCJdID0gMzE2XSA9IFwidG9nZ2xlTWlkZGxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0b3VjaFwiXSA9IDMxN10gPSBcInRvdWNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmFzaFwiXSA9IDMxOF0gPSBcInRyYXNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZURvd25cIl0gPSAzMTldID0gXCJ0cmlhbmdsZURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlEb3duXCJdID0gMzIwXSA9IFwidHJpYW5nbGVFbXB0eURvd25cIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlMZWZ0XCJdID0gMzIxXSA9IFwidHJpYW5nbGVFbXB0eUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlRW1wdHlSaWdodFwiXSA9IDMyMl0gPSBcInRyaWFuZ2xlRW1wdHlSaWdodFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJpYW5nbGVFbXB0eVVwXCJdID0gMzIzXSA9IFwidHJpYW5nbGVFbXB0eVVwXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZUxlZnRcIl0gPSAzMjRdID0gXCJ0cmlhbmdsZUxlZnRcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInRyaWFuZ2xlUmlnaHRcIl0gPSAzMjVdID0gXCJ0cmlhbmdsZVJpZ2h0XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ0cmlhbmdsZVVwXCJdID0gMzI2XSA9IFwidHJpYW5nbGVVcFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widHJvcGh5XCJdID0gMzI3XSA9IFwidHJvcGh5XCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ1bmRlcmxpbmVcIl0gPSAzMjhdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVuc3Vic2NyaWJlXCJdID0gMzI5XSA9IFwidW5zdWJzY3JpYmVcIjtcbiAgICBJY29uRW51bVtJY29uRW51bVtcInVwbG9hZFwiXSA9IDMzMF0gPSBcInVwbG9hZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widmlkZW9cIl0gPSAzMzFdID0gXCJ2aWRlb1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsXCJdID0gMzMyXSA9IFwidm9pY2VtYWlsXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ2b2ljZW1haWxGb3J3YXJkXCJdID0gMzMzXSA9IFwidm9pY2VtYWlsRm9yd2FyZFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1widm9pY2VtYWlsUmVwbHlcIl0gPSAzMzRdID0gXCJ2b2ljZW1haWxSZXBseVwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid2FmZmxlXCJdID0gMzM1XSA9IFwid2FmZmxlXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ3b3JrXCJdID0gMzM2XSA9IFwid29ya1wiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wid3JlbmNoXCJdID0gMzM3XSA9IFwid3JlbmNoXCI7XG4gICAgSWNvbkVudW1bSWNvbkVudW1bXCJ4XCJdID0gMzM4XSA9IFwieFwiO1xuICAgIEljb25FbnVtW0ljb25FbnVtW1wieENpcmNsZVwiXSA9IDMzOV0gPSBcInhDaXJjbGVcIjtcbn0pKEljb25FbnVtID0gZXhwb3J0cy5JY29uRW51bSB8fCAoZXhwb3J0cy5JY29uRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUGVyc29uYVNpemU7XG4oZnVuY3Rpb24gKFBlcnNvbmFTaXplKSB7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ0aW55XCJdID0gMF0gPSBcInRpbnlcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhzbWFsbFwiXSA9IDFdID0gXCJ4c21hbGxcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInNtYWxsXCJdID0gMl0gPSBcInNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJtZWRpdW1cIl0gPSAzXSA9IFwibWVkaXVtXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJsYXJnZVwiXSA9IDRdID0gXCJsYXJnZVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wieGxhcmdlXCJdID0gNV0gPSBcInhsYXJnZVwiO1xufSkoUGVyc29uYVNpemUgPSBleHBvcnRzLlBlcnNvbmFTaXplIHx8IChleHBvcnRzLlBlcnNvbmFTaXplID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9zaXplRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQcmVzZW5jZUVudW07XG4oZnVuY3Rpb24gKFByZXNlbmNlRW51bSkge1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJhdmFpbGFibGVcIl0gPSAwXSA9IFwiYXZhaWxhYmxlXCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImF3YXlcIl0gPSAxXSA9IFwiYXdheVwiO1xuICAgIFByZXNlbmNlRW51bVtQcmVzZW5jZUVudW1bXCJibG9ja2VkXCJdID0gMl0gPSBcImJsb2NrZWRcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wiYnVzeVwiXSA9IDNdID0gXCJidXN5XCI7XG4gICAgUHJlc2VuY2VFbnVtW1ByZXNlbmNlRW51bVtcImRuZFwiXSA9IDRdID0gXCJkbmRcIjtcbiAgICBQcmVzZW5jZUVudW1bUHJlc2VuY2VFbnVtW1wib2ZmbGluZVwiXSA9IDVdID0gXCJvZmZsaW5lXCI7XG59KShQcmVzZW5jZUVudW0gPSBleHBvcnRzLlByZXNlbmNlRW51bSB8fCAoZXhwb3J0cy5QcmVzZW5jZUVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBicmVhZGNydW1iTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iRGlyZWN0aXZlXCIpO1xudmFyIGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmVcIik7XG52YXIgY2FsbG91dE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NhbGxvdXQvY2FsbG91dERpcmVjdGl2ZVwiKTtcbnZhciBjaG9pY2VmaWVsZE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlXCIpO1xudmFyIGNvbW1hbmRCYXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9jb21tYW5kYmFyL2NvbW1hbmRCYXJEaXJlY3RpdmVcIik7XG52YXIgY29udGVudE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NvbnRlbnQvY29udGVudERpcmVjdGl2ZVwiKTtcbnZhciBjb250ZXh0dWFsTWVudU1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51XCIpO1xudmFyIGRhdGVwaWNrZXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXJEaXJlY3RpdmVcIik7XG52YXIgZGlhbG9nTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZVwiKTtcbnZhciBkcm9wZG93bk1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlXCIpO1xudmFyIGZhY2VwaWxlTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZmFjZXBpbGUvZmFjZXBpbGVEaXJlY3RpdmVcIik7XG52YXIgaWNvbk1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZVwiKTtcbnZhciBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2xhYmVsL2xhYmVsRGlyZWN0aXZlXCIpO1xudmFyIGxpbmtNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9saW5rL2xpbmtEaXJlY3RpdmVcIik7XG52YXIgbGlzdE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2xpc3QvbGlzdERpcmVjdGl2ZVwiKTtcbnZhciBtZXNzYWdlQmFubmVyTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbWVzc2FnZWJhbm5lci9tZXNzYWdlQmFubmVyRGlyZWN0aXZlXCIpO1xudmFyIG1lc3NhZ2VCYXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJEaXJlY3RpdmVcIik7XG52YXIgbmF2QmFyTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZVwiKTtcbnZhciBvcmdDaGFydE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0RGlyZWN0aXZlXCIpO1xudmFyIG92ZXJsYXlNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmVcIik7XG52YXIgcGFuZWxNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZVwiKTtcbnZhciBwZW9wbGVQaWNrZXJNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlXCIpO1xudmFyIHBlcnNvbmFjYXJkTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcGVyc29uYWNhcmQvcGVyc29uYWNhcmREaXJlY3RpdmVcIik7XG52YXIgcGVyc29uYU1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3BlcnNvbmEvcGVyc29uYURpcmVjdGl2ZVwiKTtcbnZhciBwaXZvdE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3Bpdm90L3Bpdm90RGlyZWN0aXZlXCIpO1xudmFyIHByb2dyZXNzSW5kaWNhdG9yTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcHJvZ3Jlc3NpbmRpY2F0b3IvcHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmVcIik7XG52YXIgc2VhcmNoYm94TW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZVwiKTtcbnZhciBzcGlubmVyTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlXCIpO1xudmFyIHRhYmxlTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmVcIik7XG52YXIgdGV4dEZpZWxkTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZVwiKTtcbnZhciB0b2dnbGVNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy90b2dnbGUvdG9nZ2xlRGlyZWN0aXZlXCIpO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cycsIFtcbiAgICBicmVhZGNydW1iTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGJ1dHRvbk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjYWxsb3V0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNob2ljZWZpZWxkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGNvbW1hbmRCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgY29udGVudE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBjb250ZXh0dWFsTWVudU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkYXRlcGlja2VyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGRpYWxvZ01vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkcm9wZG93bk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBmYWNlcGlsZU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBpY29uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxhYmVsTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIGxpbmtNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbGlzdE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBtZXNzYWdlQmFubmVyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG1lc3NhZ2VCYXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgbmF2QmFyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG9yZ0NoYXJ0TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIG92ZXJsYXlNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGFuZWxNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGVvcGxlUGlja2VyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFjYXJkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHBlcnNvbmFNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcGl2b3RNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgcHJvZ3Jlc3NJbmRpY2F0b3JNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgc2VhcmNoYm94TW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHNwaW5uZXJNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGFibGVNb2R1bGUubW9kdWxlLm5hbWUsXG4gICAgdGV4dEZpZWxkTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRvZ2dsZU1vZHVsZS5tb2R1bGUubmFtZVxuXSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2NvbXBvbmVudHMudHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29yZScsIFtdKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvY29yZS50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkJyZWFkY3J1bWInO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gIDxsaSBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1saXN0SXRlbVxcXCI+XFxuICAgIDxhIGNsYXNzPVxcXCJtcy1CcmVhZGNydW1iLWl0ZW1MaW5rXFxcIiBuZy1ocmVmPVxcXCJ7e25nSHJlZn19XFxcIiB0YWJpbmRleD1cXFwie3t1aWZUYWJpbmRleH19XFxcIiBuZy10cmFuc2NsdWRlPjwvYT5cXG4gICAgPGkgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItY2hldnJvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgPC9saT5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nSHJlZjogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJpYnV0ZXMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIHRhYmluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChpbnN0YW5jZUVsZW1lbnQucGFyZW50KCkuY2hpbGRyZW4oKSwgaW5zdGFuY2VFbGVtZW50WzBdKSArIDI7XG4gICAgICAgIHNjb3BlLnVpZlRhYmluZGV4ID0gdGFiaW5kZXg7XG4gICAgfTtcbiAgICByZXR1cm4gQnJlYWRjcnVtYkxpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iTGlua0RpcmVjdGl2ZSA9IEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlO1xudmFyIEJyZWFkY3J1bWJMaW5rID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVhZGNydW1iTGluayhocmVmLCBsaW5rVGV4dCkge1xuICAgICAgICB0aGlzLmhyZWYgPSBocmVmO1xuICAgICAgICB0aGlzLmxpbmtUZXh0ID0gbGlua1RleHQ7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZGNydW1iTGluaztcbn0oKSk7XG5leHBvcnRzLkJyZWFkY3J1bWJMaW5rID0gQnJlYWRjcnVtYkxpbms7XG52YXIgQnJlYWRjcnVtYkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJDb250cm9sbGVyKCRzY29wZSwgJGRvY3VtZW50LCAkd2luZG93KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICB9XG4gICAgcmV0dXJuIEJyZWFkY3J1bWJDb250cm9sbGVyO1xufSgpKTtcbkJyZWFkY3J1bWJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZG9jdW1lbnQnLCAnJHdpbmRvdyddO1xuZXhwb3J0cy5CcmVhZGNydW1iQ29udHJvbGxlciA9IEJyZWFkY3J1bWJDb250cm9sbGVyO1xudmFyIEJyZWFkY3J1bWJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyZWFkY3J1bWJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYlxcXCIgbmctY2xhc3M9XFxcInsnaXMtb3ZlcmZsb3cnOiBpc092ZXJmbG93KCl9XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1vdmVyZmxvd1xcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtQnJlYWRjcnVtYi1vdmVyZmxvd0J1dHRvbiBtcy1JY29uIG1zLUljb24tLWVsbGlwc2lzXFxcIlxcbiAgICAgICAgICAgbmctY2xpY2s9XFxcIm9wZW5PdmVyZmxvdygkZXZlbnQpXFxcIiB0YWJpbmRleD1cXFwiMVxcXCI+PC9kaXY+XFxuICAgICAgPGkgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItY2hldnJvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUJyZWFkY3J1bWItb3ZlcmZsb3dNZW51XFxcIiBuZy1jbGFzcz1cXFwieydpcy1vcGVuJzogb3ZlcmZsb3dNZW51T3Blbn1cXFwiPlxcbiAgICAgICAgPHVsIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudSBpcy1vcGVuXFxcIj5cXG4gICAgICAgICAgPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtXFxcIlxcbiAgICAgICAgICAgICAgbmctcmVwZWF0PVxcXCJsaW5rIGluIHVpZkJyZWFkY3J1bWJMaW5rcyB8IGxpbWl0VG86b3ZlcmZsb3dFbGVtZW50cygpXFxcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtbGlua1xcXCIgbmctaHJlZj1cXFwie3tsaW5rLmhyZWZ9fVxcXCI+e3tsaW5rLmxpbmtUZXh0fX08L2E+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPHVsIGNsYXNzPVxcXCJtcy1CcmVhZGNydW1iLWxpc3RcXFwiPlxcbiAgICAgIDx1aWYtYnJlYWRjcnVtYi1saW5rIG5nLXJlcGVhdD1cXFwibGluayBpbiB1aWZCcmVhZGNydW1iTGlua3MgfCBsaW1pdFRvOi12aXNpYmxlRWxlbWVudHNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctaHJlZj1cXFwie3tsaW5rLmhyZWZ9fVxcXCI+e3tsaW5rLmxpbmtUZXh0fX08L3VpZi1icmVhZGNydW1iLWxpbms+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnJlYWRjcnVtYkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICd1aWZCcmVhZGNydW1iJztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZCcmVhZGNydW1iTGlua3MnOiAnPSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5TTUFMTF9CUkVBS19QT0lOVCA9IDYzOTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGluc3RhbmNlRWxlbWVudCwgJGF0dHJzLCAkYnJlYWRjcnVtYkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICRzY29wZS52aXNpYmxlRWxlbWVudHMgPSA0O1xuICAgICAgICAgICAgJHNjb3BlLm92ZXJmbG93TWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5pc092ZXJmbG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvdmVyZmxvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLnVpZkJyZWFkY3J1bWJMaW5rcykgJiYgJHNjb3BlLnVpZkJyZWFkY3J1bWJMaW5rcy5sZW5ndGggPiAkc2NvcGUudmlzaWJsZUVsZW1lbnRzO1xuICAgICAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub3ZlcmZsb3dFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzT3ZlcmZsb3coKSA/ICRzY29wZS51aWZCcmVhZGNydW1iTGlua3MubGVuZ3RoIC0gJHNjb3BlLnZpc2libGVFbGVtZW50cyA6IDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLm9wZW5PdmVyZmxvdyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICRzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGJyZWFkY3J1bWJDb250cm9sbGVyLiR3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub25SZXNpemUoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkYnJlYWRjcnVtYkNvbnRyb2xsZXIuJGRvY3VtZW50LmZpbmQoJ2h0bWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub3ZlcmZsb3dNZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplID0gZnVuY3Rpb24gKGlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXJXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzVG9TaG93ID0gKGlubmVyV2lkdGggPiBfdGhpcy5TTUFMTF9CUkVBS19QT0lOVCkgPyA0IDogMjtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudHNUb1Nob3cgIT09ICRzY29wZS52aXNpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpc2libGVFbGVtZW50cyA9IGVsZW1lbnRzVG9TaG93O1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS5vblJlc2l6ZSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBCcmVhZGNydW1iRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnJlYWRjcnVtYkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIEJyZWFkY3J1bWJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CcmVhZGNydW1iRGlyZWN0aXZlID0gQnJlYWRjcnVtYkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnJlYWRjcnVtYicsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkJyZWFkY3J1bWInLCBCcmVhZGNydW1iRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCcmVhZGNydW1iTGluaycsIEJyZWFkY3J1bWJMaW5rRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYkRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgYnV0dG9uVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL2J1dHRvblR5cGVFbnVtXCIpO1xudmFyIGJ1dHRvblRlbXBsYXRlVHlwZV8xID0gcmVxdWlyZShcIi4vYnV0dG9uVGVtcGxhdGVUeXBlXCIpO1xudmFyIEJ1dHRvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gQnV0dG9uQ29udHJvbGxlcjtcbn0oKSk7XG5CdXR0b25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbnZhciBCdXR0b25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQnV0dG9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnYnV0dG9uJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoJGF0dHJzLnVpZlR5cGUpICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQoYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVskYXR0cnMudWlmVHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuYnV0dG9uIC0gVW5zdXBwb3J0ZWQgYnV0dG9uOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBidXR0b24gKFxcJycgKyAkYXR0cnMudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25UeXBlRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnMudWlmVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLnByaW1hcnldOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLnByaW1hcnlCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbW1hbmRdOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbW1hbmRCdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmNvbXBvdW5kXTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQoJGF0dHJzLm5nSHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZEJ1dHRvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3RoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZExpbmtdO1xuICAgICAgICAgICAgICAgIGNhc2UgYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bVtidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtLmhlcm9dOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1VuZGVmaW5lZCgkYXR0cnMubmdIcmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmhlcm9CdXR0b25dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0xpbmtdO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKCRhdHRycy5uZ0hyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuYWN0aW9uQnV0dG9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZUh0bWxUZW1wbGF0ZXMoKTtcbiAgICB9XG4gICAgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IEJ1dHRvbkRpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGluayxcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCdXR0b25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQnV0dG9uRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZlR5cGUpIHx8XG4gICAgICAgICAgICBhdHRycy51aWZUeXBlID09PSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0ucHJpbWFyeV0gfHxcbiAgICAgICAgICAgIGF0dHJzLnVpZlR5cGUgPT09IGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21wb3VuZF0pIHtcbiAgICAgICAgICAgIHZhciBpY29uRWxlbWVudCA9IGVsZW1lbnQuZmluZCgndWlmLWljb24nKTtcbiAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVycy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5idXR0b24gLSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0ljb24gbm90IGFsbG93ZWQgaW4gcHJpbWFyeSBvciBjb21wb3VuZCBidXR0b25zOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmltYXJ5ICYgY29tcG91bmQgYnV0dG9uIGRvZXMgbm90IHN1cHBvcnQgaW5jbHVkaW5nIGljb25zIGluIHRoZSBib2R5LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBpY29uIGhhcyBiZWVuIHJlbW92ZWQgYnV0IG1heSBjYXVzZSByZW5kZXJpbmcgZXJyb3JzLiBDb25zaWRlciBidXR0b25zIHRoYXQgc3VwcG9ydCBpY29ucyBzdWNoIGFzIGNvbW1hbmQgb3IgaGVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIHdyYXBwZXI7XG4gICAgICAgICAgICBzd2l0Y2ggKGF0dHJzLnVpZlR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGJ1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW1bYnV0dG9uVHlwZUVudW1fMS5CdXR0b25UeXBlRW51bS5jb21tYW5kXTpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9pc1ZhbGlkTGFiZWwoY2xvbmVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1sYWJlbCcpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VJRi1JQ09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24taWNvbicpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0uY29tcG91bmRdOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVbaV0udGFnTmFtZSA9PT0gJ1VJRi1JQ09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9pc1ZhbGlkTGFiZWwoY2xvbmVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLUJ1dHRvbi1sYWJlbCcpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBidXR0b25UeXBlRW51bV8xLkJ1dHRvblR5cGVFbnVtW2J1dHRvblR5cGVFbnVtXzEuQnV0dG9uVHlwZUVudW0uaGVyb106XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5faXNWYWxpZExhYmVsKGNsb25lW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtcy1CdXR0b24tbGFiZWwnKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtQnV0dG9uLWljb24nKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuX2lzVmFsaWRMYWJlbCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICByZXR1cm4gY2xvbmUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIGNsb25lLm5vZGVWYWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIEJ1dHRvbkRpcmVjdGl2ZS5wcm90b3R5cGUuX3BvcHVsYXRlSHRtbFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmFjdGlvbkJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b25cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5hY3Rpb25MaW5rXSA9XG4gICAgICAgICAgICBcIjxhIGNsYXNzPVxcXCJtcy1CdXR0b25cXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5XFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+XFxuICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XFxuICAgICAgIDwvYnV0dG9uPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUucHJpbWFyeUxpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLXByaW1hcnlcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogZGlzYWJsZWR9XFxcIj5cXG4gICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cXG4gICAgICAgPC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuY29tbWFuZEJ1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1jb21tYW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21tYW5kTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0tY29tbWFuZFxcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbYnV0dG9uVGVtcGxhdGVUeXBlXzEuQnV0dG9uVGVtcGxhdGVUeXBlLmNvbXBvdW5kQnV0dG9uXSA9XG4gICAgICAgICAgICBcIjxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbXBvdW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5jb21wb3VuZExpbmtdID1cbiAgICAgICAgICAgIFwiPGEgY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLWNvbXBvdW5kXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9hPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9uc1tidXR0b25UZW1wbGF0ZVR5cGVfMS5CdXR0b25UZW1wbGF0ZVR5cGUuaGVyb0J1dHRvbl0gPVxuICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1oZXJvXFxcIiBuZy1jbGFzcz1cXFwieydpcy1kaXNhYmxlZCc6IGRpc2FibGVkfVxcXCI+PC9idXR0b24+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zW2J1dHRvblRlbXBsYXRlVHlwZV8xLkJ1dHRvblRlbXBsYXRlVHlwZS5oZXJvTGlua10gPVxuICAgICAgICAgICAgXCI8YSBjbGFzcz1cXFwibXMtQnV0dG9uIG1zLUJ1dHRvbi0taGVyb1xcXCIgbmctY2xhc3M9XFxcInsnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZH1cXFwiPjwvYT5cIjtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5CdXR0b25EaXJlY3RpdmUgPSBCdXR0b25EaXJlY3RpdmU7XG52YXIgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkJ1dHRvbic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUJ1dHRvbi1kZXNjcmlwdGlvblwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgfVxuICAgIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b25EZXNjcmlwdGlvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlID0gQnV0dG9uRGVzY3JpcHRpb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmJ1dHRvbicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQnV0dG9uJywgQnV0dG9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZCdXR0b25EZXNjcmlwdGlvbicsIEJ1dHRvbkRlc2NyaXB0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25EaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQnV0dG9uVGVtcGxhdGVUeXBlO1xuKGZ1bmN0aW9uIChCdXR0b25UZW1wbGF0ZVR5cGUpIHtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wiYWN0aW9uQnV0dG9uXCJdID0gMF0gPSBcImFjdGlvbkJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJhY3Rpb25MaW5rXCJdID0gMV0gPSBcImFjdGlvbkxpbmtcIjtcbiAgICBCdXR0b25UZW1wbGF0ZVR5cGVbQnV0dG9uVGVtcGxhdGVUeXBlW1wicHJpbWFyeUJ1dHRvblwiXSA9IDJdID0gXCJwcmltYXJ5QnV0dG9uXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcInByaW1hcnlMaW5rXCJdID0gM10gPSBcInByaW1hcnlMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImNvbW1hbmRCdXR0b25cIl0gPSA0XSA9IFwiY29tbWFuZEJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21tYW5kTGlua1wiXSA9IDVdID0gXCJjb21tYW5kTGlua1wiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21wb3VuZEJ1dHRvblwiXSA9IDZdID0gXCJjb21wb3VuZEJ1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJjb21wb3VuZExpbmtcIl0gPSA3XSA9IFwiY29tcG91bmRMaW5rXCI7XG4gICAgQnV0dG9uVGVtcGxhdGVUeXBlW0J1dHRvblRlbXBsYXRlVHlwZVtcImhlcm9CdXR0b25cIl0gPSA4XSA9IFwiaGVyb0J1dHRvblwiO1xuICAgIEJ1dHRvblRlbXBsYXRlVHlwZVtCdXR0b25UZW1wbGF0ZVR5cGVbXCJoZXJvTGlua1wiXSA9IDldID0gXCJoZXJvTGlua1wiO1xufSkoQnV0dG9uVGVtcGxhdGVUeXBlID0gZXhwb3J0cy5CdXR0b25UZW1wbGF0ZVR5cGUgfHwgKGV4cG9ydHMuQnV0dG9uVGVtcGxhdGVUeXBlID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblRlbXBsYXRlVHlwZS50c1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQnV0dG9uVHlwZUVudW07XG4oZnVuY3Rpb24gKEJ1dHRvblR5cGVFbnVtKSB7XG4gICAgQnV0dG9uVHlwZUVudW1bQnV0dG9uVHlwZUVudW1bXCJwcmltYXJ5XCJdID0gMF0gPSBcInByaW1hcnlcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImNvbW1hbmRcIl0gPSAxXSA9IFwiY29tbWFuZFwiO1xuICAgIEJ1dHRvblR5cGVFbnVtW0J1dHRvblR5cGVFbnVtW1wiY29tcG91bmRcIl0gPSAyXSA9IFwiY29tcG91bmRcIjtcbiAgICBCdXR0b25UeXBlRW51bVtCdXR0b25UeXBlRW51bVtcImhlcm9cIl0gPSAzXSA9IFwiaGVyb1wiO1xufSkoQnV0dG9uVHlwZUVudW0gPSBleHBvcnRzLkJ1dHRvblR5cGVFbnVtIHx8IChleHBvcnRzLkJ1dHRvblR5cGVFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvblR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDYWxsb3V0QXJyb3c7XG4oZnVuY3Rpb24gKENhbGxvdXRBcnJvdykge1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJsZWZ0XCJdID0gMF0gPSBcImxlZnRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1wicmlnaHRcIl0gPSAxXSA9IFwicmlnaHRcIjtcbiAgICBDYWxsb3V0QXJyb3dbQ2FsbG91dEFycm93W1widG9wXCJdID0gMl0gPSBcInRvcFwiO1xuICAgIENhbGxvdXRBcnJvd1tDYWxsb3V0QXJyb3dbXCJib3R0b21cIl0gPSAzXSA9IFwiYm90dG9tXCI7XG59KShDYWxsb3V0QXJyb3cgPSBleHBvcnRzLkNhbGxvdXRBcnJvdyB8fCAoZXhwb3J0cy5DYWxsb3V0QXJyb3cgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRBcnJvd0VudW0udHNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBjYWxsb3V0VHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL2NhbGxvdXRUeXBlRW51bVwiKTtcbnZhciBjYWxsb3V0QXJyb3dFbnVtXzEgPSByZXF1aXJlKFwiLi9jYWxsb3V0QXJyb3dFbnVtXCIpO1xudmFyIENhbGxvdXRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udHJvbGxlcigkc2NvcGUsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIHJldHVybiBDYWxsb3V0Q29udHJvbGxlcjtcbn0oKSk7XG5DYWxsb3V0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xuZXhwb3J0cy5DYWxsb3V0Q29udHJvbGxlciA9IENhbGxvdXRDb250cm9sbGVyO1xudmFyIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNhbGxvdXQtaGVhZGVyXCI+PHAgY2xhc3M9XCJtcy1DYWxsb3V0LXRpdGxlXCIgbmctdHJhbnNjbHVkZT48L3A+PC9kaXY+JztcbiAgICB9XG4gICAgQ2FsbG91dEhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBtYWluV3JhcHBlciA9IGluc3RhbmNlRWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKTtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzVW5kZWZpbmVkKG1haW5XcmFwcGVyKSAmJiBtYWluV3JhcHBlci5oYXNDbGFzcygnbXMtQ2FsbG91dC1tYWluJykpIHtcbiAgICAgICAgICAgIHZhciBkZXRhY2hlZEhlYWRlciA9IGluc3RhbmNlRWxlbWVudC5kZXRhY2goKTtcbiAgICAgICAgICAgIG1haW5XcmFwcGVyLnByZXBlbmQoZGV0YWNoZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNhbGxvdXRIZWFkZXJEaXJlY3RpdmUgPSBDYWxsb3V0SGVhZGVyRGlyZWN0aXZlO1xudmFyIENhbGxvdXRDb250ZW50RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0Q29udGVudERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1jb250ZW50XCI+PHAgY2xhc3M9XCJtcy1DYWxsb3V0LXN1YlRleHRcIiBuZy10cmFuc2NsdWRlPjwvcD48L2Rpdj4nO1xuICAgIH1cbiAgICBDYWxsb3V0Q29udGVudERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENhbGxvdXRDb250ZW50RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dENvbnRlbnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0Q29udGVudERpcmVjdGl2ZSA9IENhbGxvdXRDb250ZW50RGlyZWN0aXZlO1xudmFyIENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1hY3Rpb25zXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXj91aWZDYWxsb3V0JztcbiAgICB9XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNhbGxvdXRDb250cm9sbGVyKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KGNhbGxvdXRDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJHNjb3BlLiR3YXRjaCgnaGFzU2VwYXJhdG9yJywgZnVuY3Rpb24gKGhhc1NlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChoYXNTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNoaWxkcmVuID0gaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYnV0dG9uSW5kZXggPSAwOyBidXR0b25JbmRleCA8IGFjdGlvbkNoaWxkcmVuLmxlbmd0aDsgYnV0dG9uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbkNoaWxkcmVuLmVxKGJ1dHRvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hZGRDbGFzcygnbXMtQ2FsbG91dC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25TcGFucyA9IGFjdGlvbi5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzcGFuSW5kZXggPSAwOyBzcGFuSW5kZXggPCBhY3Rpb25TcGFucy5sZW5ndGg7IHNwYW5JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvblNwYW4gPSBhY3Rpb25TcGFucy5lcShzcGFuSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24tbGFiZWwnKSB8fCBhY3Rpb25TcGFuLmhhc0NsYXNzKCdtcy1CdXR0b24taWNvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblNwYW4uYWRkQ2xhc3MoJ21zLUNhbGxvdXQtYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DYWxsb3V0QWN0aW9uc0RpcmVjdGl2ZSA9IENhbGxvdXRBY3Rpb25zRGlyZWN0aXZlO1xudmFyIENhbGxvdXREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbGxvdXREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0XCIgJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJnZXRDYWxsb3V0Q2xhc3NlcygpXCI+ICcgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1DYWxsb3V0LW1haW5cIj48ZGl2IGNsYXNzPVwibXMtQ2FsbG91dC1pbm5lclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZDYWxsb3V0J107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ1Nob3c6ICc9PycsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gQ2FsbG91dENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudWlmQXJyb3dDbGFzc2VzID0gKF9hID0ge30sXG4gICAgICAgICAgICBfYVtjYWxsb3V0QXJyb3dFbnVtXzEuQ2FsbG91dEFycm93LmJvdHRvbV0gPSAnbXMtQ2FsbG91dC0tYXJyb3dCb3R0b20nLFxuICAgICAgICAgICAgX2FbY2FsbG91dEFycm93RW51bV8xLkNhbGxvdXRBcnJvdy5sZWZ0XSA9ICdtcy1DYWxsb3V0LS1hcnJvd0xlZnQnLFxuICAgICAgICAgICAgX2FbY2FsbG91dEFycm93RW51bV8xLkNhbGxvdXRBcnJvdy5yaWdodF0gPSAnbXMtQ2FsbG91dC0tYXJyb3dSaWdodCcsXG4gICAgICAgICAgICBfYVtjYWxsb3V0QXJyb3dFbnVtXzEuQ2FsbG91dEFycm93LnRvcF0gPSAnbXMtQ2FsbG91dC0tYXJyb3dUb3AnLFxuICAgICAgICAgICAgX2EpO1xuICAgICAgICB0aGlzLnVpZlR5cGVDbGFzc2VzID0gKF9iID0ge30sXG4gICAgICAgICAgICBfYltjYWxsb3V0VHlwZUVudW1fMS5DYWxsb3V0VHlwZS5vb2JlXSA9ICdtcy1DYWxsb3V0LS1PT0JFJyxcbiAgICAgICAgICAgIF9iW2NhbGxvdXRUeXBlRW51bV8xLkNhbGxvdXRUeXBlLnBlZWtdID0gJ21zLUNhbGxvdXQtLVBlZWsnLFxuICAgICAgICAgICAgX2IpO1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgIH1cbiAgICBDYWxsb3V0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2FsbG91dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2FsbG91dERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNhbGxvdXRDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCd1aWZUeXBlJywgZnVuY3Rpb24gKGNhbGxvdXRUeXBlKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChjYWxsb3V0VHlwZUVudW1fMS5DYWxsb3V0VHlwZVtjYWxsb3V0VHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY2FsbG91dCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGNhbGxvdXRUeXBlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiBJdCBzaG91bGQgYmUgb29iZSBvciBwZWVrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndWlmQXJyb3cnLCBmdW5jdGlvbiAoYXR0ckFycm93RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0ckFycm93RGlyZWN0aW9uKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKGNhbGxvdXRBcnJvd0VudW1fMS5DYWxsb3V0QXJyb3dbYXR0ckFycm93RGlyZWN0aW9uXSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jYWxsb3V0IC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ckFycm93RGlyZWN0aW9uICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZBcnJvdy4gSXQgc2hvdWxkIGJlIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5hcnJvd0RpcmVjdGlvbiA9IGF0dHJBcnJvd0RpcmVjdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmhhc1NlcGFyYXRvciA9ICghYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZBY3Rpb25UZXh0KSB8fCAhYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZTZXBhcmF0b3IpKTtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzVW5kZWZpbmVkKGF0dHJzLnVpZkNsb3NlKSkge1xuICAgICAgICAgICAgc2NvcGUuY2xvc2VCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPGJ1dHRvbiBjbGFzcz1cIm1zLUNhbGxvdXQtY2xvc2VcIiB0eXBlPVwiYnV0dG9uXCI+JyArXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS14XCI+PC9pPicgK1xuICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nKTtcbiAgICAgICAgICAgIHZhciBjYWxsb3V0RGl2ID0gaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2RpdicpLmVxKDApO1xuICAgICAgICAgICAgY2FsbG91dERpdi5hcHBlbmQoY2xvc2VCdXR0b25FbGVtZW50KTtcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNjb3BlLmNsb3NlQnV0dG9uQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYmluZCgnbW91c2VlbnRlcicsIGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgc2NvcGUuaXNNb3VzZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYmluZCgnbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgc2NvcGUuaXNNb3VzZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1Nob3cnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaXNDbG9zaW5nQnlCdXR0b25DbGljayA9ICFuZXdWYWx1ZSAmJiBzY29wZS5jbG9zZUJ1dHRvbkNsaWNrZWQ7XG4gICAgICAgICAgICBpZiAoaXNDbG9zaW5nQnlCdXR0b25DbGljaykge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IHNjb3BlLmNsb3NlQnV0dG9uQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmV3VmFsdWUgJiYgYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZDbG9zZSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBzY29wZS5pc01vdXNlT3ZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5nU2hvdyA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc01vdXNlT3ZlcicsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICAgaWYgKCFuZXdWYWwgJiYgb2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY29wZS5jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5uZ1Nob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5nZXRDYWxsb3V0Q2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjYWxsb3V0Q2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGNhbGxvdXRUeXBlID0gY2FsbG91dFR5cGVFbnVtXzEuQ2FsbG91dFR5cGVbc2NvcGUudWlmVHlwZV07XG4gICAgICAgICAgICB2YXIgY2FsbG91dEFycm93ID0gYW5ndWxhci5pc0RlZmluZWQoc2NvcGUuYXJyb3dEaXJlY3Rpb24pID8gY2FsbG91dEFycm93RW51bV8xLkNhbGxvdXRBcnJvd1tzY29wZS5hcnJvd0RpcmVjdGlvbl0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoY2FsbG91dFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENsYXNzZXMucHVzaChfdGhpcy51aWZUeXBlQ2xhc3Nlc1tjYWxsb3V0VHlwZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGNhbGxvdXRBcnJvdykpIHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0Q2xhc3Nlcy5wdXNoKF90aGlzLnVpZkFycm93Q2xhc3Nlc1tjYWxsb3V0QXJyb3ddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY29wZS5jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGNhbGxvdXRDbGFzc2VzLnB1c2goJ21zLUNhbGxvdXQtLWNsb3NlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2NvcGUuaGFzU2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dENsYXNzZXMucHVzaCgnbXMtQ2FsbG91dC0tYWN0aW9uVGV4dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxvdXRDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBDYWxsb3V0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2FsbG91dERpcmVjdGl2ZSA9IENhbGxvdXREaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNhbGxvdXQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDYWxsb3V0JywgQ2FsbG91dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2FsbG91dEhlYWRlcicsIENhbGxvdXRIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRDb250ZW50JywgQ2FsbG91dENvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNhbGxvdXRBY3Rpb25zJywgQ2FsbG91dEFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY2FsbG91dC9jYWxsb3V0RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDYWxsb3V0VHlwZTtcbihmdW5jdGlvbiAoQ2FsbG91dFR5cGUpIHtcbiAgICBDYWxsb3V0VHlwZVtDYWxsb3V0VHlwZVtcIm9vYmVcIl0gPSAwXSA9IFwib29iZVwiO1xuICAgIENhbGxvdXRUeXBlW0NhbGxvdXRUeXBlW1wicGVla1wiXSA9IDFdID0gXCJwZWVrXCI7XG59KShDYWxsb3V0VHlwZSA9IGV4cG9ydHMuQ2FsbG91dFR5cGUgfHwgKGV4cG9ydHMuQ2FsbG91dFR5cGUgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9jYWxsb3V0L2NhbGxvdXRUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIGNob2ljZWZpZWxkVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL2Nob2ljZWZpZWxkVHlwZUVudW1cIik7XG52YXIgQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9pY2VmaWVsZE9wdGlvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gQ2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyO1xufSgpKTtcbkNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5leHBvcnRzLkNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlciA9IENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbnZhciBDaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkXCI+JyArXG4gICAgICAgICAgICAnPGlucHV0IGlkPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZC1pbnB1dFwiIHR5cGU9XCJ7e3VpZlR5cGV9fVwiIHZhbHVlPVwie3t2YWx1ZX19XCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiICAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy10cnVlLXZhbHVlPVwie3tuZ1RydWVWYWx1ZX19XCIgbmctZmFsc2UtdmFsdWU9XCJ7e25nRmFsc2VWYWx1ZX19XCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZC1maWVsZFwiPjxzcGFuIGNsYXNzPVwibXMtTGFiZWxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj48L2xhYmVsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRPcHRpb24nLCAnXj91aWZDaG9pY2VmaWVsZEdyb3VwJ107XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0ZhbHNlVmFsdWU6ICdAJyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG5nVHJ1ZVZhbHVlOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCcsXG4gICAgICAgICAgICB2YWx1ZTogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlcjtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IHRlbXBsYXRlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICBpZiAoISgnbmdNb2RlbCcgaW4gdGVtcGxhdGVBdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignbmctbW9kZWwnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjdHJscywgdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRPcHRpb25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2hvaWNlZmllbGRUeXBlRW51bV8xLkNob2ljZWZpZWxkVHlwZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkT3B0aW9uQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5jaG9pY2VmaWVsZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZUeXBlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9jaG9pY2VmaWVsZC9jaG9pY2VmaWVsZFR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHJlbmRlcl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGVja2VkID0gKGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmdldFZpZXdWYWx1ZSgpID09PSBhdHRycy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLmFkZFJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgndmFsdWUnLCByZW5kZXJfMSk7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAub24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnJlbW92ZVJlbmRlcihyZW5kZXJfMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50U2NvcGUgPSBzY29wZS4kcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgIHZhciBjaGVja0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGF0dHJzICYmIGF0dHJzLmRpc2FibGVkO1xuICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSBzY29wZS5kaXNhYmxlZCB8fCAocGFyZW50U2NvcGUgIT0gbnVsbCAmJiBwYXJlbnRTY29wZS5kaXNhYmxlZCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY2hlY2tEaXNhYmxlZCgpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBwYXJlbnRTY29wZSA9PSBudWxsID8gJycgOiBwYXJlbnRTY29wZS5kaXNhYmxlZDsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBjaGVja0Rpc2FibGVkKCk7IH0pKTtcbiAgICAgICAgY2hlY2tEaXNhYmxlZCgpO1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIuc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5zZXRWaWV3VmFsdWUoYXR0cnMudmFsdWUsIGV2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2hvaWNlZmllbGRPcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZE9wdGlvbkRpcmVjdGl2ZSA9IENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlO1xudmFyIENob2ljZWZpZWxkR3JvdXBUaXRsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1DaG9pY2VGaWVsZEdyb3VwLXRpdGxlXCI+PG5nLXRyYW5zY2x1ZGUgLz48L2Rpdj4nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmUgPSBDaG9pY2VmaWVsZEdyb3VwVGl0bGVEaXJlY3RpdmU7XG52YXIgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMgPSBbXTtcbiAgICB9XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLmFkZFJlbmRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB0aGlzLnJlbmRlckZucy5wdXNoKGZuKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVSZW5kZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdGhpcy5yZW5kZXJGbnMuc3BsaWNlKHRoaXMucmVuZGVyRm5zLmluZGV4T2YoZm4pKTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGV2ZW50VHlwZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Vmlld1ZhbHVlKCkgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0RGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHNldFZpZXdWYWx1ZSh2YWx1ZSwgZXZlbnRUeXBlKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLnByb3RvdHlwZS5zZXRUb3VjaGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuJHNjb3BlLm5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlbmRlckZucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJGbnNbaV0oKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xufSgpKTtcbkNob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRzY29wZSddO1xuZXhwb3J0cy5DaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlciA9IENob2ljZWZpZWxkR3JvdXBDb250cm9sbGVyO1xudmFyIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNob2ljZUZpZWxkR3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZSAvPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmQ2hvaWNlZmllbGRHcm91cCcsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgIH1cbiAgICBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJlOiB0aGlzLnByZUxpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgY2hvaWNlZmllbGRHcm91cENvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBjaG9pY2VmaWVsZEdyb3VwQ29udHJvbGxlci5pbml0KCk7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZUVsZW1lbnQuYXR0cignZGlzYWJsZWQnKTsgfSwgKGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyBzY29wZS5kaXNhYmxlZCA9IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCc7IH0pKTtcbiAgICAgICAgc2NvcGUuZGlzYWJsZWQgPSAnZGlzYWJsZWQnIGluIGluc3RhbmNlQXR0cmlidXRlcztcbiAgICB9O1xuICAgIHJldHVybiBDaG9pY2VmaWVsZEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZSA9IENob2ljZWZpZWxkR3JvdXBEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmNob2ljZWZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZE9wdGlvbicsIENob2ljZWZpZWxkT3B0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDaG9pY2VmaWVsZEdyb3VwJywgQ2hvaWNlZmllbGRHcm91cERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmQ2hvaWNlZmllbGRHcm91cFRpdGxlJywgQ2hvaWNlZmllbGRHcm91cFRpdGxlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2Nob2ljZWZpZWxkL2Nob2ljZWZpZWxkRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDaG9pY2VmaWVsZFR5cGU7XG4oZnVuY3Rpb24gKENob2ljZWZpZWxkVHlwZSkge1xuICAgIENob2ljZWZpZWxkVHlwZVtDaG9pY2VmaWVsZFR5cGVbXCJyYWRpb1wiXSA9IDBdID0gXCJyYWRpb1wiO1xuICAgIENob2ljZWZpZWxkVHlwZVtDaG9pY2VmaWVsZFR5cGVbXCJjaGVja2JveFwiXSA9IDFdID0gXCJjaGVja2JveFwiO1xufSkoQ2hvaWNlZmllbGRUeXBlID0gZXhwb3J0cy5DaG9pY2VmaWVsZFR5cGUgfHwgKGV4cG9ydHMuQ2hvaWNlZmllbGRUeXBlID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY2hvaWNlZmllbGQvY2hvaWNlZmllbGRUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIENvbW1hbmRCYXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUNvbW1hbmRCYXJcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgdWlmU2VhcmNoVGVybTogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbW1hbmRCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICB7XG4gICAgICAgICAgICBzY29wZS5mb2N1c1NlYXJjaElucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhclNlYXJjaC1pbnB1dCcpKVswXS5mb2N1cygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmNsZWFyU2VhcmNoVGVybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZTZWFyY2hUZXJtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzY29wZS5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Db21tYW5kQmFyRGlyZWN0aXZlID0gQ29tbWFuZEJhckRpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoXFxcIiBuZy1jbGFzcz1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9PSB0cnVlID8gJ2lzLWFjdGl2ZScgOiAnJztcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWlucHV0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7JHBhcmVudC5wbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVxcXCIxXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWZvY3VzPVxcXCIkcGFyZW50LmlzU2VhcmNoQWN0aXZlID0gdHJ1ZTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctYmx1cj1cXFwiJHBhcmVudC5pc1NlYXJjaEFjdGl2ZSA9IGZhbHNlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiJHBhcmVudC51aWZTZWFyY2hUZXJtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbldyYXBwZXIgbXMtQ29tbWFuZEJhclNlYXJjaC1pY29uU2VhcmNoV3JhcHBlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcIiRwYXJlbnQuZm9jdXNTZWFyY2hJbnB1dCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJzZWFyY2hcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyU2VhcmNoLWljb25XcmFwcGVyIG1zLUNvbW1hbmRCYXJTZWFyY2gtaWNvbkNsZWFyV3JhcHBlciBtcy1mb250LXNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vdXNlZG93bj1cXFwiJHBhcmVudC5jbGVhclNlYXJjaFRlcm0oKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwieFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNlYXJjaERpcmVjdGl2ZSA9IENvbW1hbmRCYXJTZWFyY2hEaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFyLXNpZGVDb21tYW5kc1wiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhclNpZGVEaXJlY3RpdmUgPSBDb21tYW5kQmFyU2lkZURpcmVjdGl2ZTtcbnZhciBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyLW1haW5BcmVhXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cXFwidWlmU2hvd092ZXJmbG93XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtIG1zLUNvbW1hbmRCYXJJdGVtLS1pY29uT25seSBtcy1Db21tYW5kQmFySXRlbS1vdmVyZmxvd1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJvdmVyZmxvd1Zpc2libGUgPT0gdHJ1ZSA/ICdpcy12aXNpYmxlJyA6ICcnO1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJvcGVuT3ZlcmZsb3dNZW51KClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db21tYW5kQmFySXRlbS1saW5rXFxcIiB0YWJpbmRleD1cXFwiMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcImVsbGlwc2lzXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZTaG93T3ZlcmZsb3c6ICc9J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCR0aW1lb3V0KSB7IHJldHVybiBuZXcgQ29tbWFuZEJhck1haW5EaXJlY3RpdmUoJHRpbWVvdXQpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3N0OiB0aGlzLnBvc3RMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHNjb3BlLm9wZW5PdmVyZmxvd01lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gIXNjb3BlLm92ZXJmbG93TWVudU9wZW47XG4gICAgICAgICAgICB2YXIgY29udGV4dHVhbE1lbnU7XG4gICAgICAgICAgICBjb250ZXh0dWFsTWVudSA9IFwiIDx1aWYtY29udGV4dHVhbC1tZW51IGNsYXNzPVxcXCJtcy1Db21tYW5kQmFyLW92ZXJmbG93TWVudVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1pcy1vcGVuPVxcXCJvdmVyZmxvd01lbnVPcGVuXFxcIlxcbiAgICAgICAgICAgICAgdWlmLWNsb3NlLW9uLWNsaWNrPVxcXCJmYWxzZVxcXCI+XCI7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhckl0ZW0tb3ZlcmZsb3cgLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtXcmFwcGVyIHVsJykpLnJlbW92ZSgpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLmhpZGRlbkl0ZW1zLCBmdW5jdGlvbiAobWVudWl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAobWVudWl0ZW0uc3VibWVudSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudSArPSBcIjx1aWYtY29udGV4dHVhbC1tZW51LWl0ZW0gbmctbW9kZWw9XFxcImhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9J29wZW5PdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdKSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXRleHQ9J2hpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXS50ZXh0J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1zaG93PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udmlzaWJsZSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcInN1Yk1lbnVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtY29udGV4dHVhbC1tZW51PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGljaz0nb3Blbk92ZXJmbG93SXRlbShzdWJpdGVtKSdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdzdWJpdGVtLnRleHQnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGlua1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwic3ViaXRlbSBpbiBoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0uc3VibWVudWl0ZW1zIHRyYWNrIGJ5ICRpbmRleFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gXCI8dWlmLWNvbnRleHR1YWwtbWVudS1pdGVtIG5nLW1vZGVsPVxcXCJoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPSdvcGVuT3ZlcmZsb3dJdGVtKGhpZGRlbkl0ZW1zW1wiICsgbWVudWl0ZW0uaSArIFwiXSknXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10ZXh0PSdoaWRkZW5JdGVtc1tcIiArIG1lbnVpdGVtLmkgKyBcIl0udGV4dCdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctc2hvdz0naGlkZGVuSXRlbXNbXCIgKyBtZW51aXRlbS5pICsgXCJdLnZpc2libGUnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi10eXBlPVxcXCJsaW5rXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLWNvbnRleHR1YWwtbWVudS1pdGVtPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGV4dHVhbE1lbnUgKz0gJzwvPHVpZi1jb250ZXh0dWFsLW1lbnU+JztcbiAgICAgICAgICAgIHZhciBtZW51O1xuICAgICAgICAgICAgbWVudSA9IGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93IC5tcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlcicpO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG1lbnUpLmFwcGVuZChjdHJsLiRjb21waWxlKGNvbnRleHR1YWxNZW51KShzY29wZSkpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zID0gZnVuY3Rpb24gKGNvbW1hbmRJdGVtcykge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRJdGVtV2lkdGggPSAwO1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRJdGVtSW5kZXggPSAwO1xuICAgICAgICAgICAgc2NvcGUuY29tbWFuZEl0ZW1zID0gW107XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY29tbWFuZEl0ZW1zLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuaGFzQ2xhc3MoJ21zLUNvbW1hbmRCYXJJdGVtLW92ZXJmbG93JykgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEl0ZW1XaWR0aCArPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5jb21tYW5kSXRlbXMucHVzaCh7IGluZGV4OiBjb21tYW5kSXRlbUluZGV4LCBvZmZzZXQ6IGNvbW1hbmRJdGVtV2lkdGggfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRJdGVtSW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUub3Blbk92ZXJmbG93SXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zdWJtZW51aXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goaXRlbS5zdWJtZW51LmNoaWxkcmVuLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VibWVudWl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtID0ge307XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLnRleHQgPSBlbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgc3VibWVudWl0ZW0ubWVudVR5cGUgPSAnaXRlbSc7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLmNoaWxkaXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLmkgPSBpdGVtLnN1Ym1lbnVpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnVpdGVtLnBhcmVudCA9IGl0ZW0uaTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdWJtZW51aXRlbXMucHVzaChzdWJtZW51aXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHJsLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRpdGVtID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpW2l0ZW0ucGFyZW50XS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29udGV4dHVhbE1lbnUtaXRlbScpW2l0ZW0uaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQobSkudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtpdGVtLmldKS50cmlnZ2VySGFuZGxlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kQmFySXRlbXM7XG4gICAgICAgICAgICBjb21tYW5kQmFySXRlbXMgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhci1tYWluQXJlYSAubXMtQ29tbWFuZEJhckl0ZW0nKSk7XG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA2NDAgJiYgc2NvcGUubW9iaWxlU3dpdGNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoY29tbWFuZEJhckl0ZW1zKTtcbiAgICAgICAgICAgICAgICBzY29wZS5tb2JpbGVTd2l0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNjQwICYmIHNjb3BlLm1vYmlsZVN3aXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRNZW51SXRlbXMoY29tbWFuZEJhckl0ZW1zKTtcbiAgICAgICAgICAgICAgICBzY29wZS5tb2JpbGVTd2l0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5jb21tYW5kSXRlbXMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0ID49IGVsZW0ucHJvcCgnb2Zmc2V0V2lkdGgnKSAtIDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtQ29tbWFuZEJhckl0ZW0nKVtlbGVtZW50LmluZGV4XSkuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5oaWRkZW5JdGVtc1tlbGVtZW50LmluZGV4XS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpW2VsZW1lbnQuaW5kZXhdKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmhpZGRlbkl0ZW1zW2VsZW1lbnQuaW5kZXhdLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUub3ZlcmZsb3dWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdHJsLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kb24oJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5vdmVyZmxvd01lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KHdpbmRvdykuYmluZCgncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuJGJyb2FkY2FzdCgndWlmLWNvbW1hbmQtYmFyLXJlc2l6ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5sb2FkTWVudUl0ZW1zKGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tcy1Db21tYW5kQmFySXRlbScpKSk7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVJdGVtVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkNvbW1hbmRCYXJNYWluRGlyZWN0aXZlID0gQ29tbWFuZEJhck1haW5EaXJlY3RpdmU7XG52YXIgQ29tbWFuZEJhck1haW5Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGNvbXBpbGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJGNvbXBpbGUgPSAkY29tcGlsZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgIH1cbiAgICBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE92ZXJmbG93SXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLiRzY29wZS5oaWRkZW5JdGVtcyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5oaWRkZW5JdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uaSA9IHRoaXMuJHNjb3BlLmhpZGRlbkl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGlkZGVuSXRlbXMucHVzaChpdGVtKTtcbiAgICB9O1xuICAgIHJldHVybiBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG59KCkpO1xuQ29tbWFuZEJhck1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckY29tcGlsZScsICckdGltZW91dCddO1xuZXhwb3J0cy5Db21tYW5kQmFyTWFpbkNvbnRyb2xsZXIgPSBDb21tYW5kQmFyTWFpbkNvbnRyb2xsZXI7XG52YXIgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1Db21tYW5kQmFySXRlbS1saW5rV3JhcHBlclwiPicgK1xuICAgICAgICAgICAgJyA8YSBjbGFzcz1cIm1zLUNvbW1hbmRCYXJJdGVtLWxpbmtcIj4nICtcbiAgICAgICAgICAgICcgPC9hPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IENvbW1hbmRCYXJNYWluQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ14/dWlmQ29tbWFuZEJhck1haW4nO1xuICAgIH1cbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb21tYW5kQmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCwgdHJhbnNjbHVkZSkge1xuICAgICAgICB0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkl0ZW07XG4gICAgICAgICAgICBoaWRkZW5JdGVtID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVSUYtSUNPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjbG9uZVtpXS50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9uZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2ldLmNsYXNzTGlzdC5hZGQoJ21zLUNvbW1hbmRCYXJJdGVtLWNvbW1hbmRUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLmNsYXNzTmFtZS5pbmRleE9mKCdtcy1mb250LScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0uY2xhc3NMaXN0LmFkZCgnbXMtZm9udC1tJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignYS5tcy1Db21tYW5kQmFySXRlbS1saW5rJykpLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbkl0ZW0udGV4dCA9IGNsb25lW2ldLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb25lW2ldLnRhZ05hbWUgPT09ICdVTCcgJiYgY2xvbmVbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtcy1Db250ZXh0dWFsTWVudScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLnN1Ym1lbnUgPSBjbG9uZVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChoaWRkZW5JdGVtLnN1Ym1lbnUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5JdGVtLm1lbnVUeXBlID0gJ2xpbmsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuSXRlbS5tZW51VHlwZSA9ICdzdWJNZW51JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3RybC5hZGRPdmVyZmxvd0l0ZW0oaGlkZGVuSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLUNvbW1hbmRCYXJJdGVtLWxpbmsgPiB1aWYtaWNvbicpKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtWzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFySXRlbScpKS5hZGRDbGFzcygnbXMtQ29tbWFuZEJhckl0ZW0taGFzVGV4dE9ubHknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuQ29tbWFuZEJhckl0ZW1EaXJlY3RpdmUgPSBDb21tYW5kQmFySXRlbURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29tbWFuZGJhcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmQ29tbWFuZEJhcicsIENvbW1hbmRCYXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkNvbW1hbmRCYXJTZWFyY2gnLCBDb21tYW5kQmFyU2VhcmNoRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFySXRlbScsIENvbW1hbmRCYXJJdGVtRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyTWFpbicsIENvbW1hbmRCYXJNYWluRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZDb21tYW5kQmFyU2lkZScsIENvbW1hbmRCYXJTaWRlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2NvbW1hbmRiYXIvY29tbWFuZEJhckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIENvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRlbnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8c3BhbiBjbGFzcz1cXFwidWlmLWNvbnRlbnRcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlwiO1xuICAgIH1cbiAgICBDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGVudERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRlbnREaXJlY3RpdmU7XG59KCkpO1xuQ29udGVudERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRlbnQnO1xuZXhwb3J0cy5Db250ZW50RGlyZWN0aXZlID0gQ29udGVudERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGVudCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZShDb250ZW50RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIENvbnRlbnREaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvY29udGVudC9jb250ZW50RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgRGF0ZXBpY2tlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuaXNQaWNraW5nWWVhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BpY2tpbmdNb250aHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGF0ZUZvcm1hdCA9ICdkIG1tbW0sIHl5eXknO1xuICAgICAgICB0aGlzLmpFbGVtZW50ID0gJCgkZWxlbWVudFswXSk7XG4gICAgICAgIHRoaXMuZGlzcGxheURhdGVGb3JtYXQgPSAkc2NvcGUudWlmRGF0ZUZvcm1hdDtcbiAgICAgICAgJHNjb3BlLmN0cmwgPSB0aGlzO1xuICAgIH1cbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUucmFuZ2UgPSBmdW5jdGlvbiAobWluLCBtYXgsIHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgICAgICAgdmFyIGlucHV0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSBtaW47IGkgPD0gbWF4OyBpICs9IHN0ZXApIHtcbiAgICAgICAgICAgIGlucHV0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBpY2tlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLVRleHRGaWVsZC1maWVsZCcpLnBpY2thZGF0ZSgncGlja2VyJyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRQaWNrZXIoKS5zZXQoJ3NlbGVjdCcsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VIaWdobGlnaHRlZERhdGUodmFsdWUuZ2V0RnVsbFllYXIoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RGF0ZSgpKTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0RGF0ZXBpY2tlciA9IGZ1bmN0aW9uIChuZ01vZGVsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5qRWxlbWVudC5maW5kKCcubXMtVGV4dEZpZWxkLWZpZWxkJykucGlja2FkYXRlKHtcbiAgICAgICAgICAgIGNsZWFyOiAnJyxcbiAgICAgICAgICAgIGNsb3NlOiAnJyxcbiAgICAgICAgICAgIGZvcm1hdDogc2VsZi5kaXNwbGF5RGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGtsYXNzOiB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiAnbXMtRGF0ZVBpY2tlci1pbnB1dC0tYWN0aXZlJyxcbiAgICAgICAgICAgICAgICBib3g6ICdtcy1EYXRlUGlja2VyLWRheVBpY2tlcicsXG4gICAgICAgICAgICAgICAgZGF5OiAnbXMtRGF0ZVBpY2tlci1kYXknLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnbXMtRGF0ZVBpY2tlci1kYXktLWRpc2FibGVkJyxcbiAgICAgICAgICAgICAgICBmb2N1c2VkOiAnbXMtRGF0ZVBpY2tlci1waWNrZXItLWZvY3VzZWQnLFxuICAgICAgICAgICAgICAgIGZyYW1lOiAnbXMtRGF0ZVBpY2tlci1mcmFtZScsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnbXMtRGF0ZVBpY2tlci1oZWFkZXInLFxuICAgICAgICAgICAgICAgIGhvbGRlcjogJ21zLURhdGVQaWNrZXItaG9sZGVyJyxcbiAgICAgICAgICAgICAgICBpbmZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLWluZm9jdXMnLFxuICAgICAgICAgICAgICAgIGlucHV0OiAnbXMtRGF0ZVBpY2tlci1pbnB1dCcsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdtcy1EYXRlUGlja2VyLW1vbnRoJyxcbiAgICAgICAgICAgICAgICBub3c6ICdtcy1EYXRlUGlja2VyLWRheS0tdG9kYXknLFxuICAgICAgICAgICAgICAgIG9wZW5lZDogJ21zLURhdGVQaWNrZXItcGlja2VyLS1vcGVuZWQnLFxuICAgICAgICAgICAgICAgIG91dGZvY3VzOiAnbXMtRGF0ZVBpY2tlci1kYXktLW91dGZvY3VzJyxcbiAgICAgICAgICAgICAgICBwaWNrZXI6ICdtcy1EYXRlUGlja2VyLXBpY2tlcicsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdtcy1EYXRlUGlja2VyLWRheS0tc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgIHRhYmxlOiAnbXMtRGF0ZVBpY2tlci10YWJsZScsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6ICdtcy1EYXRlUGlja2VyLXdlZWtkYXknLFxuICAgICAgICAgICAgICAgIHdyYXA6ICdtcy1EYXRlUGlja2VyLXdyYXAnLFxuICAgICAgICAgICAgICAgIHllYXI6ICdtcy1EYXRlUGlja2VyLXllYXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5pdEN1c3RvbVZpZXcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2RheTogJycsXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XG4gICAgICAgIHBpY2tlci5vbih7XG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxVcCgpO1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsKSAmJiBuZ01vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBwaWNrZXIuZ2V0KCdzZWxlY3QnLCAneXl5eS1tbS1kZCcpO1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZ01vZGVsKSAmJiBuZ01vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGVwaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbml0Q3VzdG9tVmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRtb250aENvbnRyb2xzID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1tb250aENvbXBvbmVudHMnKTtcbiAgICAgICAgdmFyICRnb1RvZGF5ID0gdGhpcy5qRWxlbWVudC5maW5kKCcubXMtRGF0ZVBpY2tlci1nb1RvZGF5Jyk7XG4gICAgICAgIHZhciAkbW9udGhQaWNrZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLW1vbnRoUGlja2VyJyk7XG4gICAgICAgIHZhciAkeWVhclBpY2tlciA9IHRoaXMuakVsZW1lbnQuZmluZCgnLm1zLURhdGVQaWNrZXIteWVhclBpY2tlcicpO1xuICAgICAgICB2YXIgJHBpY2tlcldyYXBwZXIgPSB0aGlzLmpFbGVtZW50LmZpbmQoJy5tcy1EYXRlUGlja2VyLXdyYXAnKTtcbiAgICAgICAgdmFyICRwaWNrZXIgPSB0aGlzLmdldFBpY2tlcigpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICRtb250aENvbnRyb2xzLmFwcGVuZFRvKCRwaWNrZXJXcmFwcGVyKTtcbiAgICAgICAgJGdvVG9kYXkuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkbW9udGhQaWNrZXIuYXBwZW5kVG8oJHBpY2tlcldyYXBwZXIpO1xuICAgICAgICAkeWVhclBpY2tlci5hcHBlbmRUbygkcGlja2VyV3JhcHBlcik7XG4gICAgICAgICRtb250aENvbnRyb2xzLm9uKCdjbGljaycsICcuanMtcHJldk1vbnRoJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld01vbnRoID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLm1vbnRoIC0gMTtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG51bGwsIG5ld01vbnRoLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoQ29udHJvbHMub24oJ2NsaWNrJywgJy5qcy1uZXh0TW9udGgnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykubW9udGggKyAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobnVsbCwgbmV3TW9udGgsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2WWVhcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgLSAxO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLW5leHRZZWFyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciArIDE7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHllYXJQaWNrZXIub24oJ2NsaWNrJywgJy5qcy1wcmV2RGVjYWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG5ld1llYXIgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhciAtIDEwO1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VIaWdobGlnaHRlZERhdGUobmV3WWVhciwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR5ZWFyUGlja2VyLm9uKCdjbGljaycsICcuanMtbmV4dERlY2FkZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gJHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLnllYXIgKyAxMDtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlSGlnaGxpZ2h0ZWREYXRlKG5ld1llYXIsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkZ29Ub2RheS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICRwaWNrZXIuc2V0KCdzZWxlY3QnLCBub3cpO1xuICAgICAgICAgICAgc2VsZi5qRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtcGlja2luZ01vbnRocycpLnJlbW92ZUNsYXNzKCdpcy1waWNraW5nWWVhcnMnKTtcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1vbnRoUGlja2VyLm9uKCdjbGljaycsICcuanMtY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gY3VycmVudERhdGUueWVhcjtcbiAgICAgICAgICAgIHZhciBuZXdNb250aCA9ICskKHRoaXMpLmF0dHIoJ2RhdGEtbW9udGgnKTtcbiAgICAgICAgICAgIHZhciBuZXdEYXkgPSBjdXJyZW50RGF0ZS5kYXk7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KTtcbiAgICAgICAgICAgIGlmIChzZWxmLmpFbGVtZW50Lmhhc0NsYXNzKCdpcy1waWNraW5nTW9udGhzJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmpFbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1waWNraW5nTW9udGhzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR5ZWFyUGlja2VyLm9uKCdjbGljaycsICcuanMtY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9ICRwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXdZZWFyID0gKyQodGhpcykuYXR0cignZGF0YS15ZWFyJyk7XG4gICAgICAgICAgICB2YXIgbmV3TW9udGggPSBjdXJyZW50RGF0ZS5tb250aDtcbiAgICAgICAgICAgIHZhciBuZXdEYXkgPSBjdXJyZW50RGF0ZS5kYXk7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZShuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KTtcbiAgICAgICAgICAgIGlmIChzZWxmLmpFbGVtZW50Lmhhc0NsYXNzKCdpcy1waWNraW5nWWVhcnMnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuakVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXBpY2tpbmdZZWFycycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkbW9udGhDb250cm9scy5vbignY2xpY2snLCAnLmpzLXNob3dNb250aFBpY2tlcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5pc1BpY2tpbmdNb250aHMgPSAhc2VsZi5pc1BpY2tpbmdNb250aHM7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRtb250aFBpY2tlci5vbignY2xpY2snLCAnLmpzLXNob3dZZWFyUGlja2VyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmlzUGlja2luZ1llYXJzID0gIXNlbGYuaXNQaWNraW5nWWVhcnM7XG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuJHNjb3BlLmhpZ2hsaWdodGVkVmFsdWUgPSAkcGlja2VyLmdldCgnaGlnaGxpZ2h0Jyk7XG4gICAgfTtcbiAgICBEYXRlcGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuc2Nyb2xsVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0aGlzLmpFbGVtZW50Lm9mZnNldCgpLnRvcCB9LCAzNjcpO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmNoYW5nZUhpZ2hsaWdodGVkRGF0ZSA9IGZ1bmN0aW9uIChuZXdZZWFyLCBuZXdNb250aCwgbmV3RGF5KSB7XG4gICAgICAgIHZhciBwaWNrZXIgPSB0aGlzLmdldFBpY2tlcigpO1xuICAgICAgICBpZiAobmV3WWVhciA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdZZWFyID0gcGlja2VyLmdldCgnaGlnaGxpZ2h0JykueWVhcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3TW9udGggPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3TW9udGggPSBwaWNrZXIuZ2V0KCdoaWdobGlnaHQnKS5tb250aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3RGF5ID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld0RheSA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpLmRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcGlja2VyLnNldCgnaGlnaGxpZ2h0JywgW25ld1llYXIsIG5ld01vbnRoLCBuZXdEYXldKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGlnaGxpZ2h0ZWRWYWx1ZSA9IHBpY2tlci5nZXQoJ2hpZ2hsaWdodCcpO1xuICAgIH07XG4gICAgcmV0dXJuIERhdGVwaWNrZXJDb250cm9sbGVyO1xufSgpKTtcbkRhdGVwaWNrZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRzY29wZSddO1xuZXhwb3J0cy5EYXRlcGlja2VyQ29udHJvbGxlciA9IERhdGVwaWNrZXJDb250cm9sbGVyO1xudmFyIERhdGVwaWNrZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVwaWNrZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyXFwnOiB0cnVlLCBcXCdpcy1waWNraW5nWWVhcnNcXCc6IGN0cmwuaXNQaWNraW5nWWVhcnMsIFxcJ2lzLXBpY2tpbmdNb250aHNcXCc6IGN0cmwuaXNQaWNraW5nTW9udGhzfVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1UZXh0RmllbGRcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLURhdGVQaWNrZXItZXZlbnQgbXMtSWNvbiBtcy1JY29uLS1ldmVudFwiPjwvaT4nICtcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJtcy1UZXh0RmllbGQtZmllbGRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCIgbmctZGlzYWJsZWQ9XCJpc0Rpc2FibGVkXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbW9udGhDb21wb25lbnRzXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1EYXRlUGlja2VyLW5leHRNb250aCBqcy1uZXh0TW9udGhcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldk1vbnRoIGpzLXByZXZNb250aFwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItaGVhZGVyVG9nZ2xlVmlldyBqcy1zaG93TW9udGhQaWNrZXJcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItZ29Ub2RheSBqcy1nb1RvZGF5XCI+R28gdG8gdG9kYXk8L3NwYW4+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItbW9udGhQaWNrZXJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1oZWFkZXJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci15ZWFyQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0WWVhciBqcy1uZXh0WWVhclwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uUmlnaHRcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1wcmV2WWVhciBqcy1wcmV2WWVhclwiPjxpIGNsYXNzPVwibXMtSWNvbiBtcy1JY29uLS1jaGV2cm9uTGVmdFwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItY3VycmVudFllYXIganMtc2hvd1llYXJQaWNrZXJcIj57e2hpZ2hsaWdodGVkVmFsdWUueWVhcn19PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItb3B0aW9uR3JpZFwiID4nICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1yZXBlYXQ9XCJtb250aCBpbiBtb250aHNBcnJheVwiJyArXG4gICAgICAgICAgICAnbmctY2xhc3M9XCJ7XFwnbXMtRGF0ZVBpY2tlci1tb250aE9wdGlvbiBqcy1jaGFuZ2VEYXRlXFwnOiB0cnVlLCAnICtcbiAgICAgICAgICAgICdcXCdpcy1oaWdobGlnaHRlZFxcJzogaGlnaGxpZ2h0ZWRWYWx1ZS5tb250aCA9PSAkaW5kZXh9XCInICtcbiAgICAgICAgICAgICdkYXRhLW1vbnRoPVwie3skaW5kZXh9fVwiPicgK1xuICAgICAgICAgICAgJ3t7bW9udGh9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci15ZWFyUGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLURhdGVQaWNrZXItZGVjYWRlQ29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRGF0ZVBpY2tlci1uZXh0RGVjYWRlIGpzLW5leHREZWNhZGVcIj48aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0tY2hldnJvblJpZ2h0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLURhdGVQaWNrZXItcHJldkRlY2FkZSBqcy1wcmV2RGVjYWRlXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNoZXZyb25MZWZ0XCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtRGF0ZVBpY2tlci1jdXJyZW50RGVjYWRlXCI+e3toaWdobGlnaHRlZFZhbHVlLnllYXIgLSAxMH19IC0ge3toaWdobGlnaHRlZFZhbHVlLnllYXJ9fTwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EYXRlUGlja2VyLW9wdGlvbkdyaWRcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBuZy1jbGFzcz1cIntcXCdtcy1EYXRlUGlja2VyLXllYXJPcHRpb24ganMtY2hhbmdlRGF0ZVxcJzogdHJ1ZSwnICtcbiAgICAgICAgICAgICdcXCdpcy1oaWdobGlnaHRlZFxcJzogaGlnaGxpZ2h0ZWRWYWx1ZS55ZWFyID09IHllYXJ9XCIgJyArXG4gICAgICAgICAgICAnbmctcmVwZWF0PVwieWVhciBpbiBjdHJsLnJhbmdlKGhpZ2hsaWdodGVkVmFsdWUueWVhciAtIDEwLCBoaWdobGlnaHRlZFZhbHVlLnllYXIpXCInICtcbiAgICAgICAgICAgICdkYXRhLXllYXI9XCJ7e3llYXJ9fVwiPnt7eWVhcn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERhdGVwaWNrZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHVpZkRhdGVGb3JtYXQ6ICdAJyxcbiAgICAgICAgICAgIHVpZk1vbnRoczogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmRGF0ZXBpY2tlcicsICc/bmdNb2RlbCddO1xuICAgIH1cbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGF0ZXBpY2tlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGluayxcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEYXRlcGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5wcmVMaW5rID0gZnVuY3Rpb24gKCRzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBpbnN0YW5jZUF0dHJpYnV0ZXMsIGN0cmxzKSB7XG4gICAgICAgIGlmICghJHNjb3BlLnVpZk1vbnRocykge1xuICAgICAgICAgICAgJHNjb3BlLnVpZk1vbnRocyA9ICdKYW4sIEZlYiwgTWFyLCBBcHIsIE1heSwgSnVuLCBKdWwsIEF1ZywgU2VwLCBPY3QsIE5vdiwgRGVjJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoISRzY29wZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgJHNjb3BlLnBsYWNlaG9sZGVyID0gJ1NlbGVjdCBhIGRhdGUnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghJHNjb3BlLnVpZkRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICRzY29wZS51aWZEYXRlRm9ybWF0ID0gJ2QgbW1tbSwgeXl5eSc7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLm1vbnRoc0FycmF5ID0gJHNjb3BlLnVpZk1vbnRocy5zcGxpdCgnLCcpO1xuICAgICAgICBpZiAoJHNjb3BlLm1vbnRoc0FycmF5Lmxlbmd0aCAhPT0gMTIpIHtcbiAgICAgICAgICAgIHRocm93ICdNb250aHMgc2V0dGluZyBzaG91bGQgaGF2ZSAxMiBtb250aHMsIHNlcGFyYXRlZCBieSBhIGNvbW1hJztcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZUF0dHJpYnV0ZXMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXNEaXNhYmxlZCA9ICEhZGlzYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0ZXBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUucG9zdExpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgYXR0cnMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBkYXRlcGlja2VyQ29udHJvbGxlciA9IGN0cmxzWzBdO1xuICAgICAgICB2YXIgbmdNb2RlbCA9IGN0cmxzWzFdO1xuICAgICAgICBkYXRlcGlja2VyQ29udHJvbGxlci5pbml0RGF0ZXBpY2tlcihuZ01vZGVsKTtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5nTW9kZWwpICYmIG5nTW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAobmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAmJiBuZ01vZGVsLiRtb2RlbFZhbHVlICE9PSAnJ1xuICAgICAgICAgICAgICAgICAgICAmJiB0eXBlb2YgbmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZ01vZGVsLiRtb2RlbFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShuZ01vZGVsLiRtb2RlbFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJDb250cm9sbGVyLnNldFZhbHVlKGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXBpY2tlckNvbnRyb2xsZXIuc2V0VmFsdWUobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbC4kc2V0UHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRGF0ZXBpY2tlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkRhdGVwaWNrZXJEaXJlY3RpdmUgPSBEYXRlcGlja2VyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5kYXRlcGlja2VyJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEYXRlcGlja2VyJywgRGF0ZXBpY2tlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBkaWFsb2dFbnVtc18xID0gcmVxdWlyZShcIi4vZGlhbG9nRW51bXNcIik7XG52YXIgRGlhbG9nQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQ29udHJvbGxlcigkbG9nKSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgfVxuICAgIHJldHVybiBEaWFsb2dDb250cm9sbGVyO1xufSgpKTtcbkRpYWxvZ0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuZXhwb3J0cy5EaWFsb2dDb250cm9sbGVyID0gRGlhbG9nQ29udHJvbGxlcjtcbnZhciBEaWFsb2dEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gRGlhbG9nQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtRGlhbG9nXCInICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cInsgXFwnbXMtRGlhbG9nLS1jbG9zZVxcJzogdWlmQ2xvc2U9PVxcJ3RydWVcXCcnICtcbiAgICAgICAgICAgICcsIFxcJ21zLURpYWxvZy0tbGdIZWFkZXJcXCc6IHVpZlR5cGU9PVxcJ2hlYWRlclxcJycgK1xuICAgICAgICAgICAgJywgXFwnbXMtRGlhbG9nLS1tdWx0aWxpbmVcXCc6IHVpZlR5cGU9PVxcJ211bHRpbGluZVxcJyB9XCI+JyArXG4gICAgICAgICAgICAnPHVpZi1vdmVybGF5IHVpZi1tb2RlPVwie3t1aWZPdmVybGF5fX1cIj48L3VpZi1vdmVybGF5PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctbWFpblwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZkNsb3NlOiAnQCcsXG4gICAgICAgICAgICB1aWZPdmVybGF5OiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhbG9nRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEaWFsb2dEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG5ld1ZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlhbG9nRW51bXNfMS5EaWFsb2dUeXBlRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZyAtIFVuc3VwcG9ydGVkIHR5cGU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZ09mZmljZVVJRmFicmljL25nLW9mZmljZXVpZmFicmljL2Jsb2IvbWFzdGVyL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2dFbnVtcy50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nRGlyZWN0aXZlID0gRGlhbG9nRGlyZWN0aXZlO1xudmFyIERpYWxvZ0hlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nSGVhZGVyRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXl51aWZEaWFsb2cnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctaGVhZGVyXCI+JyArXG4gICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cIiRwYXJlbnQudWlmQ2xvc2VcIiBjbGFzcz1cIm1zLURpYWxvZy1idXR0b24gbXMtRGlhbG9nLWJ1dHRvbi0tY2xvc2VcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLUljb24gbXMtSWNvbi0teFwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgRGlhbG9nSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nSGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbG9nSGVhZGVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nSGVhZGVyRGlyZWN0aXZlID0gRGlhbG9nSGVhZGVyRGlyZWN0aXZlO1xudmFyIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0NvbnRlbnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1jb250ZW50XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBEaWFsb2dDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nQ29udGVudERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0NvbnRlbnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dDb250ZW50RGlyZWN0aXZlID0gRGlhbG9nQ29udGVudERpcmVjdGl2ZTtcbnZhciBEaWFsb2dJbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nSW5uZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLURpYWxvZy1pbm5lclwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICB9XG4gICAgRGlhbG9nSW5uZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEaWFsb2dJbm5lckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0lubmVyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRGlhbG9nSW5uZXJEaXJlY3RpdmUgPSBEaWFsb2dJbm5lckRpcmVjdGl2ZTtcbnZhciBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxwIGNsYXNzPVwibXMtRGlhbG9nLXN1YlRleHRcIiBuZy10cmFuc2NsdWRlPjwvcD4nO1xuICAgIH1cbiAgICBEaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlhbG9nU3VidGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ1N1YnRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dTdWJ0ZXh0RGlyZWN0aXZlID0gRGlhbG9nU3VidGV4dERpcmVjdGl2ZTtcbnZhciBEaWFsb2dBY3Rpb25zQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXI7XG59KCkpO1xuRGlhbG9nQWN0aW9uc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zQ29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xudmFyIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERpYWxvZ0FjdGlvbnNDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1EaWFsb2ctYWN0aW9uc1wiPjxkaXYgbmctY2xhc3M9XCJ7IFxcJ21zLURpYWxvZy1hY3Rpb25zUmlnaHRcXCc6IHVpZlBvc2l0aW9uPT1cXCdyaWdodFxcJ31cIj4nICtcbiAgICAgICAgICAgICc8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlBvc2l0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmUG9zaXRpb24nLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChuZXdWYWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZ0VudW1zXzEuRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRpYWxvZyAtIFVuc3VwcG9ydGVkIHR5cGU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHR5cGUgKFxcJycgKyBzY29wZS51aWZQb3NpdGlvbiArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5EaWFsb2dBY3Rpb25zRGlyZWN0aXZlID0gRGlhbG9nQWN0aW9uc0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZGlhbG9nJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nJywgRGlhbG9nRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dIZWFkZXInLCBEaWFsb2dIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRpYWxvZ0NvbnRlbnQnLCBEaWFsb2dDb250ZW50RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dJbm5lcicsIERpYWxvZ0lubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZEaWFsb2dTdWJ0ZXh0JywgRGlhbG9nU3VidGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRGlhbG9nQWN0aW9ucycsIERpYWxvZ0FjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZ0RpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRGlhbG9nVHlwZUVudW07XG4oZnVuY3Rpb24gKERpYWxvZ1R5cGVFbnVtKSB7XG4gICAgRGlhbG9nVHlwZUVudW1bRGlhbG9nVHlwZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcImhlYWRlclwiXSA9IDFdID0gXCJoZWFkZXJcIjtcbiAgICBEaWFsb2dUeXBlRW51bVtEaWFsb2dUeXBlRW51bVtcIm11bHRpbGluZVwiXSA9IDJdID0gXCJtdWx0aWxpbmVcIjtcbn0pKERpYWxvZ1R5cGVFbnVtID0gZXhwb3J0cy5EaWFsb2dUeXBlRW51bSB8fCAoZXhwb3J0cy5EaWFsb2dUeXBlRW51bSA9IHt9KSk7XG52YXIgRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bTtcbihmdW5jdGlvbiAoRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bSkge1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcIm5vbmVcIl0gPSAwXSA9IFwibm9uZVwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcImxlZnRcIl0gPSAxXSA9IFwibGVmdFwiO1xuICAgIERpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW1bRGlhbG9nQWN0aW9uc1Bvc2l0aW9uRW51bVtcInJpZ2h0XCJdID0gMl0gPSBcInJpZ2h0XCI7XG59KShEaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtID0gZXhwb3J0cy5EaWFsb2dBY3Rpb25zUG9zaXRpb25FbnVtIHx8IChleHBvcnRzLkRpYWxvZ0FjdGlvbnNQb3NpdGlvbkVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nRW51bXMudHNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25PcHRpb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxpIGNsYXNzPVwibXMtRHJvcGRvd24taXRlbVwiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZkRyb3Bkb3duJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdExpbmtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgZHJvcGRvd25Db250cm9sbGVyLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIGlmICghZHJvcGRvd25Db250cm9sbGVyKSB7XG4gICAgICAgICAgICB0aHJvdyAnRHJvcGRvd24gY29udHJvbGxlciBub3QgZm91bmQhJztcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZUVsZW1lbnRcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLnNldFZpZXdWYWx1ZShpbnN0YW5jZUVsZW1lbnQudGV4dCgpLCBhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdmFsdWUgPSAnJyArIGRyb3Bkb3duQ29udHJvbGxlci5nZXRWaWV3VmFsdWUoKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlID09PSBhdHRycy52YWx1ZSkge1xuICAgICAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLnNldFZpZXdWYWx1ZShhdHRycy50aXRsZSwgYXR0cnMudmFsdWUsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd25PcHRpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ecm9wZG93bk9wdGlvbkRpcmVjdGl2ZSA9IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlO1xudmFyIERyb3Bkb3duQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25Db250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUsICRkb2N1bWVudCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICB9XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi4kc2NvcGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5pc09wZW4gPSAhc2VsZi4kc2NvcGUuaXNPcGVuO1xuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIHZhciBkcm9wZG93bldpZHRoID0gYW5ndWxhci5lbGVtZW50KHRoaXMucXVlcnlTZWxlY3RvcignLm1zLURyb3Bkb3duJykpWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Ecm9wZG93bi1pdGVtcycpKVswXS5zdHlsZS53aWR0aCA9IGRyb3Bkb3duV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJHNjb3BlLmlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2NsaWNrJywgZG9jdW1lbnRDbGlja0hhbmRsZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGRvY3VtZW50Lm9uKCdjbGljaycsIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZG9jdW1lbnQub2ZmKCdjbGljaycsIGRvY3VtZW50Q2xpY2tIYW5kbGVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJHNjb3BlLm5nTW9kZWwgIT09IHVuZGVmaW5lZCAmJiBzZWxmLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUubmdNb2RlbC4kc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBzZWxmLiRlbGVtZW50LmZpbmQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBvcHRpb24uZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHNlbGYuJHNjb3BlLm5nTW9kZWwuJHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9IGFuZ3VsYXIuZWxlbWVudChvcHRpb24pLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Vmlld1ZhbHVlID0gZnVuY3Rpb24gKHRpdGxlLCB2YWx1ZSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkVGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy4kc2NvcGUubmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHZhbHVlLCBldmVudFR5cGUpO1xuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5nZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kc2NvcGUubmdNb2RlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc2NvcGUubmdNb2RlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd25Db250cm9sbGVyO1xufSgpKTtcbkRyb3Bkb3duQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnLCAnJGRvY3VtZW50J107XG5leHBvcnRzLkRyb3Bkb3duQ29udHJvbGxlciA9IERyb3Bkb3duQ29udHJvbGxlcjtcbnZhciBEcm9wZG93bkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGljaz1cImRyb3Bkb3duQ2xpY2tcIiAnICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cIntcXCdtcy1Ecm9wZG93blxcJyA6IHRydWUsIFxcJ2lzLW9wZW5cXCc6IGlzT3BlbiwgXFwnaXMtZGlzYWJsZWRcXCc6IGRpc2FibGVkfVwiIHRhYmluZGV4PVwiMFwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwibXMtRHJvcGRvd24tY2FyZXREb3duIG1zLUljb24gbXMtSWNvbi0tY2FyZXREb3duXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtRHJvcGRvd24tdGl0bGVcIj57e3NlbGVjdGVkVGl0bGV9fTwvc3Bhbj48dWwgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtc1wiPjxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT48L3VsPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmRHJvcGRvd24nLCAnP25nTW9kZWwnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBEcm9wZG93bkNvbnRyb2xsZXI7XG4gICAgfVxuICAgIERyb3Bkb3duRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRHJvcGRvd25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIERyb3Bkb3duRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlRWxlbWVudCwgdGVtcGxhdGVBdHRyaWJ1dGVzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25EaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgaW5zdGFuY2VBdHRyaWJ1dGVzLCBjdHJscykge1xuICAgICAgICB2YXIgZHJvcGRvd25Db250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgIHZhciBtb2RlbENvbnRyb2xsZXIgPSBjdHJsc1sxXTtcbiAgICAgICAgc2NvcGUubmdNb2RlbCA9IG1vZGVsQ29udHJvbGxlcjtcbiAgICAgICAgZHJvcGRvd25Db250cm9sbGVyLmluaXQoKTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluc3RhbmNlRWxlbWVudC5hdHRyKCdkaXNhYmxlZCcpOyB9LCAoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHNjb3BlLmRpc2FibGVkID0gdHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJzsgfSkpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gaW5zdGFuY2VBdHRyaWJ1dGVzO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRHJvcGRvd25EaXJlY3RpdmUgPSBEcm9wZG93bkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZHJvcGRvd24nLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRyb3Bkb3duT3B0aW9uJywgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkRyb3Bkb3duJywgRHJvcGRvd25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd25EaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBGYWNlcGlsZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmFjZXBpbGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9XFxcIm1zLUZhY2VwaWxlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLUZhY2VwaWxlLW1lbWJlcnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICBuZy1yZXBlYXQ9XFxcIm1lbWJlciBpbiBtZW1iZXJzIHRyYWNrIGJ5ICRpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1pZiA9XFxcIiRpbmRleCA8IHVpZk92ZXJmbG93TGltaXRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1GYWNlcGlsZS1pdGVtQnRuIG1zLUZhY2VwaWxlLWl0ZW1CdG4tLW1lbWJlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XFxcInt7bWVtYmVyLnByaW1hcnlUZXh0fX1cXFwiIHRhYmluZGV4PVxcXCIwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEgdWlmLXN0eWxlPVxcXCJyb3VuZFxcXCIgdWlmLXNpemU9XFxcInhzbWFsbFxcXCIgdWlmLWltYWdlLXVybD1cXFwie3ttZW1iZXIuaWNvbn19XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7bWVtYmVyLmNvbG9yfX1cXFwiPnt7bWVtYmVyLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1zaG93PVxcXCJ1aWZPdmVyZmxvd0xpbWl0ID4gMCAmJiBtZW1iZXJzLmxlbmd0aCA+IHVpZk92ZXJmbG93TGltaXRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcIm92ZXJmbG93UGFuZWxJc09wZW4gPSB0cnVlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibXMtRmFjZXBpbGUtaXRlbUJ0biBtcy1GYWNlcGlsZS1pdGVtQnRuLS1vdmVyZmxvdyBqcy1vdmVyZmxvd1BhbmVsIGlzLWFjdGl2ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUZhY2VwaWxlLW92ZXJmbG93VGV4dFxcXCI+K3t7bWVtYmVycy5sZW5ndGggLSB1aWZPdmVyZmxvd0xpbWl0fX08L3NwYW5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGFuZWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcIm1lZGl1bVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLWlzLW9wZW49XFxcIm92ZXJmbG93UGFuZWxJc09wZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1zaG93LW92ZXJsYXk9XFxcInRydWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZi1zaG93LWNsb3NlPVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wYW5lbC1oZWFkZXI+e3ttZW1iZXJzLmxlbmd0aH19IHt7dWlmRmFjZXBpbGVOYW1lfX08L3VpZi1wYW5lbC1oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtY29udGVudD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cXFwibWVtYmVyIGluIG1lbWJlcnMgdHJhY2sgYnkgJGluZGV4XFxcIiB0aXRsZT1cXFwie3ttZW1iZXIucHJpbWFyeVRleHR9fVxcXCIgdGFiaW5kZXg9XFxcIjBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hIHVpZi1zdHlsZT1cXFwicm91bmRcXFwiIHVpZi1zaXplPVxcXCJtZWRpdW1cXFwiIHVpZi1pbWFnZS11cmw9XFxcInt7bWVtYmVyLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7bWVtYmVyLmNvbG9yfX1cXFwiPnt7bWVtYmVyLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0Pnt7bWVtYmVyLnByaW1hcnlUZXh0fX08L3VpZi1wZXJzb25hLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXNlY29uZGFyeS10ZXh0Pnt7bWVtYmVyLnNlY29uZGFyeVRleHR9fTwvdWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1jb250ZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtcGFuZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBtZW1iZXJzOiAnPW5nTW9kZWwnLFxuICAgICAgICAgICAgdWlmRmFjZXBpbGVOYW1lOiAnQHVpZkZhY2VwaWxlTmFtZScsXG4gICAgICAgICAgICB1aWZPdmVyZmxvd0xpbWl0OiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRmFjZXBpbGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBGYWNlcGlsZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIEZhY2VwaWxlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuRmFjZXBpbGVEaXJlY3RpdmUgPSBGYWNlcGlsZURpcmVjdGl2ZTtcbnZhciBGYWNlcGlsZUFkZEljb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibXMtRmFjZXBpbGUtaXRlbUJ0biBtcy1GYWNlcGlsZS1pdGVtQnRuLS1hZGRQZXJzb24ganMtYWRkUGVyc29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInBlb3BsZXBpY2tlclBhbmVsSXNPcGVuID0gdHJ1ZTtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwibXMtRmFjZXBpbGUtYWRkUGVyc29uSWNvbiBtcy1JY29uIG1zLUljb24tLXBlcnNvbkFkZFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXBhbmVsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtdHlwZT1cXFwibGFyZ2VcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtaXMtb3Blbj1cXFwicGVvcGxlcGlja2VyUGFuZWxJc09wZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWYtc2hvdy1vdmVybGF5PVxcXCJ0cnVlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNob3ctY2xvc2U9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGFuZWwtaGVhZGVyPnt7cGVvcGxlUGlja2VyUGxhY2Vob2xkZXJ9fTwvdWlmLXBhbmVsLWhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWNvbnRlbnQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXBlb3BsZT1cXFwib25GYWNlUGlsZVNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJwYXJlbnRTY29wZS5tZW1iZXJzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXNlYXJjaC1kZWxheT1cXFwiNTAwXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlmLXR5cGU9XFxcImZhY2VQaWxlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLXNlbGVjdGVkLXBlb3BsZS1oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7c2VsZWN0ZWRGYWNlUGlsZVBlb3BsZS5sZW5ndGh9fSBzZWxlY3RlZCBwZXJzb24ocylcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1zZWxlY3RlZC1wZW9wbGUtaGVhZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXNlYXJjaC1tb3JlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVpZi1wcmltYXJ5LXRleHQgdWlmLXNlYXJjaC1mb3ItdGV4dD1cXFwiWW91IGFyZSBzZWFyY2hpbmcgZm9yOiBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlYXJjaCBvcmdhbml6YXRpb24gcGVvcGxlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VpZi1wZW9wbGUtc2VhcmNoLW1vcmU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91aWYtY29udGVudD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWlmLXBhbmVsPlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgb25GYWNlUGlsZVNlYXJjaDogJz11aWZQZW9wbGUnLFxuICAgICAgICAgICAgcGVvcGxlUGlja2VyUGxhY2Vob2xkZXI6ICdAcGxhY2Vob2xkZXInXG4gICAgICAgIH07XG4gICAgfVxuICAgIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRmFjZXBpbGVBZGRJY29uRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICB7XG4gICAgICAgICAgICBzY29wZS5wYXJlbnRTY29wZSA9IHNjb3BlLiRwYXJlbnQuJHBhcmVudDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZSA9IEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuZmFjZXBpbGUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkZhY2VwaWxlJywgRmFjZXBpbGVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkZhY2VwaWxlQWRkSWNvbicsIEZhY2VwaWxlQWRkSWNvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9mYWNlcGlsZS9mYWNlcGlsZURpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIGljb25FbnVtXzEgPSByZXF1aXJlKFwiLi9pY29uRW51bVwiKTtcbnZhciBJY29uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSWNvbkNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gSWNvbkNvbnRyb2xsZXI7XG59KCkpO1xuSWNvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xudmFyIEljb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXt7dWlmVHlwZX19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gSWNvbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gJ2ljb24nO1xuICAgIH1cbiAgICBJY29uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSWNvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgSWNvbkRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaWNvbkVudW1fMS5JY29uRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMuaWNvbiAtIFVuc3VwcG9ydGVkIGljb246ICcgK1xuICAgICAgICAgICAgICAgICAgICAnVGhlIGljb24gKFxcJycgKyBzY29wZS51aWZUeXBlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uRW51bS50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJY29uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuSWNvbkRpcmVjdGl2ZSA9IEljb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmljb24nLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkljb24nLCBJY29uRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIExhYmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYWJlbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ1JlcXVpcmVkOiAnPD8nXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxhYmVsIGNsYXNzPVwibXMtTGFiZWxcIj48bmctdHJhbnNjbHVkZS8+PC9sYWJlbD4nO1xuICAgIH1cbiAgICBMYWJlbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExhYmVsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBMYWJlbERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHZhciBsYWJlbCA9IGluc3RhbmNlRWxlbWVudC5maW5kKCdsYWJlbCcpLmVxKDApO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cmlidXRlcy5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgIGxhYmVsLmFkZENsYXNzKCdpcy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRyaWJ1dGVzLnJlcXVpcmVkKSkge1xuICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3MoJ2lzLXJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1JlcXVpcmVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3MoJ2lzLXJlcXVpcmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGxhYmVsLnJlbW92ZUNsYXNzKCdpcy1yZXF1aXJlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBMYWJlbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxhYmVsRGlyZWN0aXZlID0gTGFiZWxEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxhYmVsJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGFiZWwnLCBMYWJlbERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9sYWJlbC9sYWJlbERpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIExpbmtEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGEgbmctaHJlZj1cInt7IG5nSHJlZiB9fVwiIGNsYXNzPVwibXMtTGlua1wiIG5nLXRyYW5zY2x1ZGU+PC9hPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ0hyZWY6ICdAJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgIH1cbiAgICBMaW5rRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlua0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaW5rRGlyZWN0aXZlID0gTGlua0RpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGluaycsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGluaycsIExpbmtEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbGluay9saW5rRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xID0gcmVxdWlyZShcIi4vbGlzdEl0ZW1TZWxlY3RNb2RlRW51bVwiKTtcbnZhciBsaXN0SXRlbVR5cGVFbnVtXzEgPSByZXF1aXJlKFwiLi9saXN0SXRlbVR5cGVFbnVtXCIpO1xudmFyIGxpc3RMYXlvdXRFbnVtXzEgPSByZXF1aXJlKFwiLi9saXN0TGF5b3V0RW51bVwiKTtcbnZhciBMaXN0Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdENvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5pdGVtcyA9IFtdO1xuICAgICAgICBpZiAoIXRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGlzdENvbnRyb2xsZXIucHJvdG90eXBlLCBcIml0ZW1TZWxlY3RNb2RlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXRlbVNlbGVjdE1vZGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIExpc3RDb250cm9sbGVyO1xufSgpKTtcbkxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG52YXIgTGlzdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtTGlzdFwiIG5nLXRyYW5zY2x1ZGU+PC91bD4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnbGlzdCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiAnPT91aWZTZWxlY3RlZEl0ZW1zJyxcbiAgICAgICAgICAgIHVpZkl0ZW1TZWxlY3RNb2RlOiAnQD8nLFxuICAgICAgICAgICAgdWlmTGF5b3V0OiAnQD8nXG4gICAgICAgIH07XG4gICAgfVxuICAgIExpc3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBMaXN0RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmTGF5b3V0JywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdExheW91dEVudW1fMS5MaXN0TGF5b3V0RW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBsYXlvdXQgKFxcJycgKyBuZXdWYWx1ZSArICdcXCcpIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLWxheW91dFxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RMYXlvdXRFbnVtLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYXlvdXQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYXlvdXQgPSBsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtW2xpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW0ubGlzdF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2NvcGUubGF5b3V0ID09PSBsaXN0TGF5b3V0RW51bV8xLkxpc3RMYXlvdXRFbnVtW2xpc3RMYXlvdXRFbnVtXzEuTGlzdExheW91dEVudW0uZ3JpZF0pIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtTGlzdC0tZ3JpZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ21zLUxpc3QtLWdyaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmSXRlbVNlbGVjdE1vZGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBUaGUgc2VsZWN0aW9uIG1vZGUgKFxcJycgKyBuZXdWYWx1ZSArICdcXCcpIGlzIG5vdCBhIHZhbGlkIG9wdGlvbiBmb3IgXFwndWlmLWl0ZW0tc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0SXRlbVNlbGVjdE1vZGVFbnVtLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pdGVtU2VsZWN0TW9kZSA9IGF0dHJzLnVpZkl0ZW1TZWxlY3RNb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY29wZS5pdGVtU2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXRlbVNlbGVjdE1vZGUgPSBsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtsaXN0SXRlbVNlbGVjdE1vZGVFbnVtXzEuTGlzdEl0ZW1TZWxlY3RNb2RlRW51bS5ub25lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyb2xsZXIuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY29wZS4kYnJvYWRjYXN0KCdsaXN0LWl0ZW0tc2VsZWN0LW1vZGUtY2hhbmdlZCcsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3REaXJlY3RpdmUgPSBMaXN0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgcmV0dXJuIExpc3RJdGVtQ29udHJvbGxlcjtcbn0oKSk7XG5MaXN0SXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbnZhciBMaXN0SXRlbURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxsaSBjbGFzcz1cIm1zLUxpc3RJdGVtXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmTGlzdCc7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpdGVtOiAnPXVpZkl0ZW0nLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0A/J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBMaXN0SXRlbUNvbnRyb2xsZXI7XG4gICAgfVxuICAgIExpc3RJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIExpc3RJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBsaXN0KSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRTdHJpbmcgPSBhdHRycy51aWZTZWxlY3RlZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nICE9PSAndHJ1ZScgJiYgc2VsZWN0ZWRTdHJpbmcgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICBsaXN0LiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlNlbGVjdGVkICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5pdGVtICYmIGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0LnNlbGVjdGVkSXRlbXNbaV0gPT09IHNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlR5cGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBsaXN0IGl0ZW0gdHlwZSAoXFwnJyArIG5ld1ZhbHVlICsgJ1xcJykgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnbXMtTGlzdEl0ZW0tLWltYWdlJyk7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnbXMtTGlzdEl0ZW0tLWRvY3VtZW50Jyk7XG4gICAgICAgICAgICBzd2l0Y2ggKGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtW2F0dHJzLnVpZlR5cGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bS5pdGVtV2l0aEljb246XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1MaXN0SXRlbS0tZG9jdW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bS5pdGVtV2l0aEltYWdlOlxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtTGlzdEl0ZW0tLWltYWdlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaXN0SXRlbVR5cGVFbnVtXzEuTGlzdEl0ZW1UeXBlRW51bVthdHRycy51aWZUeXBlXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSWNvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5maW5kKCd1aWYtbGlzdC1pdGVtLWljb24nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmxpc3QuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTGlzdCBpdGVtIHR5cGUgYGl0ZW1XaXRoSWNvbmAgcmVxdWlyZXMgdGhlIGB1aWYtbGlzdC1pdGVtLWljb25gIGRpcmVjdGl2ZS4gV2l0aG91dCB0aGlzIHRoZSBpY29uIHdpbGwgbm90IGFwcGVhci4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGxpc3RJdGVtVHlwZUVudW1fMS5MaXN0SXRlbVR5cGVFbnVtLml0ZW1XaXRoSW1hZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZmluZCgndWlmLWxpc3QtaXRlbS1pbWFnZScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdMaXN0IGl0ZW0gdHlwZSBgaXRlbVdpdGhJbWFnZWAgcmVxdWlyZXMgdGhlIGB1aWYtbGlzdC1pdGVtLWltYWdlYCBkaXJlY3RpdmUuIFdpdGhvdXQgdGhpcyB0aGUgaW1hZ2Ugd2lsbCBub3QgYXBwZWFyLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhdHRycy51aWZVbnJlYWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgYXR0cnMudWlmVW5yZWFkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgdW5yZWFkU3RyaW5nID0gYXR0cnMudWlmVW5yZWFkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodW5yZWFkU3RyaW5nICE9PSAndHJ1ZScgJiYgdW5yZWFkU3RyaW5nICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgbGlzdC4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0LiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZVbnJlYWQgKyAnXFwnIGlzIG5vdCBhIHZhbGlkIGJvb2xlYW4gdmFsdWUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgdHJ1ZXxmYWxzZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1bnJlYWRTdHJpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS51bnJlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMudWlmVW5zZWVuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGF0dHJzLnVpZlVuc2VlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHVuc2VlblN0cmluZyA9IGF0dHJzLnVpZlVuc2Vlbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHVuc2VlblN0cmluZyAhPT0gJ3RydWUnICYmIHVuc2VlblN0cmluZyAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgIGxpc3QuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubGlzdC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgYXR0cnMudWlmVW5zZWVuICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBib29sZWFuIHZhbHVlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIHRydWV8ZmFsc2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodW5zZWVuU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5zZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLml0ZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5pdGVtQ2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlLCBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5pdGVtU2VsZWN0TW9kZSA9PT0gbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW1bbGlzdEl0ZW1TZWxlY3RNb2RlRW51bV8xLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0uc2luZ2xlXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0Lml0ZW1zW2ldICE9PSBsaXN0SXRlbVNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuaXRlbXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3Quc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5zZWxlY3RlZEl0ZW1zW2ldID09PSBsaXN0SXRlbVNjb3BlLml0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc2VsZWN0ZWRJdGVtcy5wdXNoKGxpc3RJdGVtU2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0LnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3Quc2VsZWN0ZWRJdGVtc1tpXSA9PT0gbGlzdEl0ZW1TY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNlbGVjdGVkSXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VucmVhZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIGxpc3RJdGVtU2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKCdpcy11bnJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndW5zZWVuJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgbGlzdEl0ZW1TY29wZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNoaWxkcmVuKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ2lzLXVuc2VlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxpc3QuaXRlbVNlbGVjdE1vZGUgIT09IGxpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtW2xpc3RJdGVtU2VsZWN0TW9kZUVudW1fMS5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtLm5vbmVdKSB7XG4gICAgICAgICAgICB1cGRhdGVJdGVtU2VsZWN0aW9uTW9kZURlY29yYXRpb24obGlzdC5pdGVtU2VsZWN0TW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJG9uKCdsaXN0LWl0ZW0tc2VsZWN0LW1vZGUtY2hhbmdlZCcsIGZ1bmN0aW9uIChldmVudCwgc2VsZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgdXBkYXRlSXRlbVNlbGVjdGlvbk1vZGVEZWNvcmF0aW9uKHNlbGVjdGlvbk1vZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlSXRlbVNlbGVjdGlvbk1vZGVEZWNvcmF0aW9uKHNlbGVjdGlvbk1vZGUpIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25Nb2RlID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0YWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKDApLmhhc0NsYXNzKCdpcy1zZWxlY3RhYmxlJykpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaXRlbUNsaWNrKTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0YWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbURpcmVjdGl2ZSA9IExpc3RJdGVtRGlyZWN0aXZlO1xudmFyIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1MaXN0SXRlbS1wcmltYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtUHJpbWFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlID0gTGlzdEl0ZW1QcmltYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLXNlY29uZGFyeVRleHRcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICB9XG4gICAgTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gTGlzdEl0ZW1TZWNvbmRhcnlUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLUxpc3RJdGVtLXRlcnRpYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbVRlcnRpYXJ5VGV4dERpcmVjdGl2ZSA9IExpc3RJdGVtVGVydGlhcnlUZXh0RGlyZWN0aXZlO1xudmFyIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1MaXN0SXRlbS1tZXRhVGV4dFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtTWV0YVRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlID0gTGlzdEl0ZW1NZXRhVGV4dERpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbUltYWdlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUltYWdlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1MaXN0SXRlbS1pbWFnZVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtSW1hZ2VEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbUltYWdlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtSW1hZ2VEaXJlY3RpdmUgPSBMaXN0SXRlbUltYWdlRGlyZWN0aXZlO1xudmFyIExpc3RJdGVtSWNvbkRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1JY29uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1MaXN0SXRlbS1pdGVtSWNvblwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtSWNvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtSWNvbkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RJdGVtSWNvbkRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtSWNvbkRpcmVjdGl2ZSA9IExpc3RJdGVtSWNvbkRpcmVjdGl2ZTtcbnZhciBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLXNlbGVjdGlvblRhcmdldFwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbVNlbGVjdGlvblRhcmdldERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLkxpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlID0gTGlzdEl0ZW1TZWxlY3Rpb25UYXJnZXREaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1BY3Rpb25zRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLUxpc3RJdGVtLWFjdGlvbnNcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUgPSBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmU7XG52YXIgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1MaXN0SXRlbS1hY3Rpb25cIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBMaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5MaXN0SXRlbUFjdGlvbkRpcmVjdGl2ZSA9IExpc3RJdGVtQWN0aW9uRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5saXN0JywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdCcsIExpc3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtJywgTGlzdEl0ZW1EaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtUHJpbWFyeVRleHQnLCBMaXN0SXRlbVByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbVNlY29uZGFyeVRleHQnLCBMaXN0SXRlbVNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtVGVydGlhcnlUZXh0JywgTGlzdEl0ZW1UZXJ0aWFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtTWV0YVRleHQnLCBMaXN0SXRlbU1ldGFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUltYWdlJywgTGlzdEl0ZW1JbWFnZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmTGlzdEl0ZW1JY29uJywgTGlzdEl0ZW1JY29uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbVNlbGVjdGlvblRhcmdldCcsIExpc3RJdGVtU2VsZWN0aW9uVGFyZ2V0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZMaXN0SXRlbUFjdGlvbnMnLCBMaXN0SXRlbUFjdGlvbnNEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZkxpc3RJdGVtQWN0aW9uJywgTGlzdEl0ZW1BY3Rpb25EaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbGlzdC9saXN0RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaXN0SXRlbVNlbGVjdE1vZGVFbnVtO1xuKGZ1bmN0aW9uIChMaXN0SXRlbVNlbGVjdE1vZGVFbnVtKSB7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wibm9uZVwiXSA9IDBdID0gXCJub25lXCI7XG4gICAgTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtMaXN0SXRlbVNlbGVjdE1vZGVFbnVtW1wic2luZ2xlXCJdID0gMV0gPSBcInNpbmdsZVwiO1xuICAgIExpc3RJdGVtU2VsZWN0TW9kZUVudW1bTGlzdEl0ZW1TZWxlY3RNb2RlRW51bVtcIm11bHRpcGxlXCJdID0gMl0gPSBcIm11bHRpcGxlXCI7XG59KShMaXN0SXRlbVNlbGVjdE1vZGVFbnVtID0gZXhwb3J0cy5MaXN0SXRlbVNlbGVjdE1vZGVFbnVtIHx8IChleHBvcnRzLkxpc3RJdGVtU2VsZWN0TW9kZUVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtU2VsZWN0TW9kZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExpc3RJdGVtVHlwZUVudW07XG4oZnVuY3Rpb24gKExpc3RJdGVtVHlwZUVudW0pIHtcbiAgICBMaXN0SXRlbVR5cGVFbnVtW0xpc3RJdGVtVHlwZUVudW1bXCJpdGVtXCJdID0gMF0gPSBcIml0ZW1cIjtcbiAgICBMaXN0SXRlbVR5cGVFbnVtW0xpc3RJdGVtVHlwZUVudW1bXCJpdGVtV2l0aEltYWdlXCJdID0gMV0gPSBcIml0ZW1XaXRoSW1hZ2VcIjtcbiAgICBMaXN0SXRlbVR5cGVFbnVtW0xpc3RJdGVtVHlwZUVudW1bXCJpdGVtV2l0aEljb25cIl0gPSAyXSA9IFwiaXRlbVdpdGhJY29uXCI7XG59KShMaXN0SXRlbVR5cGVFbnVtID0gZXhwb3J0cy5MaXN0SXRlbVR5cGVFbnVtIHx8IChleHBvcnRzLkxpc3RJdGVtVHlwZUVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9saXN0L2xpc3RJdGVtVHlwZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExpc3RMYXlvdXRFbnVtO1xuKGZ1bmN0aW9uIChMaXN0TGF5b3V0RW51bSkge1xuICAgIExpc3RMYXlvdXRFbnVtW0xpc3RMYXlvdXRFbnVtW1wibGlzdFwiXSA9IDBdID0gXCJsaXN0XCI7XG4gICAgTGlzdExheW91dEVudW1bTGlzdExheW91dEVudW1bXCJncmlkXCJdID0gMV0gPSBcImdyaWRcIjtcbn0pKExpc3RMYXlvdXRFbnVtID0gZXhwb3J0cy5MaXN0TGF5b3V0RW51bSB8fCAoZXhwb3J0cy5MaXN0TGF5b3V0RW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2xpc3QvbGlzdExheW91dEVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBNZXNzYWdlQmFubmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nLCAkd2luZG93KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgIH1cbiAgICByZXR1cm4gTWVzc2FnZUJhbm5lckNvbnRyb2xsZXI7XG59KCkpO1xuTWVzc2FnZUJhbm5lckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnLCAnJHdpbmRvdyddO1xuZXhwb3J0cy5NZXNzYWdlQmFubmVyQ29udHJvbGxlciA9IE1lc3NhZ2VCYW5uZXJDb250cm9sbGVyO1xudmFyIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUoJGxvZywgJHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBNZXNzYWdlQmFubmVyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICd1aWZNZXNzYWdlQmFubmVyJztcbiAgICAgICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyXFxcIiBuZy1zaG93PVxcXCJ1aWZJc1Zpc2libGVcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWNvbnRlbnRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLXRleHRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1NZXNzYWdlQmFubmVyLWNsaXBwZXJcXFwiPjwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPHVpZi1idXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiB1aWYtdHlwZT1cXFwiY29tbWFuZFxcXCIgY2xhc3M9XFxcIm1zLU1lc3NhZ2VCYW5uZXItZXhwYW5kXFxcIj5cXG4gICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJjaGV2cm9uc0Rvd25cXFwiIG5nLXNob3c9XFxcIiFpc0V4cGFuZGVkXFxcIj48L3VpZi1pY29uPlxcbiAgICA8dWlmLWljb24gdWlmLXR5cGU9XFxcImNoZXZyb25zVXBcXFwiIG5nLXNob3c9XFxcImlzRXhwYW5kZWRcXFwiPjwvdWlmLWljb24+XFxuICAgIDwvdWlmLWJ1dHRvbj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lci1hY3Rpb25cXFwiPlxcbiAgICA8dWlmLWJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIHVpZi10eXBlPVxcXCJwcmltYXJ5XFxcIiBjbGFzcz1cXFwibXMtZm9udENvbG9yLW5ldXRyYWxMaWdodFxcXCIgbmctY2xpY2s9XFxcInVpZkFjdGlvbigpXFxcIj57eyB1aWZBY3Rpb25MYWJlbCB9fTwvdWlmLWJ1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8dWlmLWJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIHVpZi10eXBlPVxcXCJjb21tYW5kXFxcIiBjbGFzcz1cXFwibXMtTWVzc2FnZUJhbm5lci1jbG9zZVxcXCIgbmctY2xpY2s9XFxcInVpZk9uQ2xvc2UoKVxcXCIgc3R5bGU9XFxcImhlaWdodDo1MnB4XFxcIj5cXG4gICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJ4XFxcIj48L3VpZi1pY29uPlxcbiAgICA8L3VpZi1idXR0b24+XFxuICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmQWN0aW9uOiAnJicsXG4gICAgICAgICAgICB1aWZBY3Rpb25MYWJlbDogJ0AnLFxuICAgICAgICAgICAgdWlmSXNWaXNpYmxlOiAnPT8nLFxuICAgICAgICAgICAgdWlmT25DbG9zZTogJyY/J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGggPSA3MDA7XG4gICAgICAgIHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGggPSA4ODtcbiAgICAgICAgdGhpcy5fYnVmZmVyRWxlbWVudHNXaWR0aFNtYWxsID0gMzU7XG4gICAgICAgIHRoaXMuU01BTExfQlJFQUtfUE9JTlQgPSA0ODA7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtLCAkYXR0cnMsICRjb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnVpZkFjdGlvbkxhYmVsID0gJGF0dHJzLnVpZkFjdGlvbkxhYmVsO1xuICAgICAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5vblJlc2l6ZSA9IGZ1bmN0aW9uIChpbm5lcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyV2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLl9jbGllbnRXaWR0aCA9IF90aGlzLl9tZXNzYWdlQmFubmVyWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIGlmIChpbm5lcldpZHRoID49IF90aGlzLlNNQUxMX0JSRUFLX1BPSU5UKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9yZXNpemVSZWd1bGFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fcmVzaXplU21hbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3RoaXMuX2luaXRMb2NhbHMoJGVsZW0pO1xuICAgICAgICAgICAgX3RoaXMudHJhbnNjbHVkZUNoaWxkcygkc2NvcGUsICRlbGVtLCAkdHJhbnNjbHVkZSk7XG4gICAgICAgICAgICBfdGhpcy5faW5pdFRleHRXaWR0aCA9IChfdGhpcy5fY2xpcHBlci5jaGlsZHJlbigpLmVxKDApKVswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkY29udHJvbGxlci4kd2luZG93KS5iaW5kKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm9uUmVzaXplKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KF90aGlzLl9jaGV2cm9uQnV0dG9uKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdG9nZ2xlRXhwYW5zaW9uKCRzY29wZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChfdGhpcy5fY2xvc2VCdXR0b24pLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9oaWRlQmFubmVyKCRzY29wZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5vblJlc2l6ZSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZywgJHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5tZXNzYWdlYmFubmVyIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgdGhlIG1lc3NhZ2UgYmFubmVyLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbWVzc2FnZS1iYW5uZXI+IHlvdSBuZWVkIHRvIHNwZWNpZnknICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudEVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlcicpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNZXNzYWdlQmFubmVyRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9pbml0TG9jYWxzID0gZnVuY3Rpb24gKCRlbGVtKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCYW5uZXIgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXInKSk7XG4gICAgICAgIHRoaXMuX2NsaXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1bMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYW5uZXItY2xpcHBlcicpKTtcbiAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtTWVzc2FnZUJhbm5lci1leHBhbmQnKSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbkJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1hY3Rpb24nKSk7XG4gICAgICAgIHRoaXMuX2J1ZmZlclNpemUgPSB0aGlzLl9hY3Rpb25CdXR0b25bMF0ub2Zmc2V0V2lkdGggKyB0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoO1xuICAgICAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcubXMtTWVzc2FnZUJhbm5lci1jbG9zZScpKTtcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9yZXNpemVSZWd1bGFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoKHRoaXMuX2NsaWVudFdpZHRoIC0gdGhpcy5fYnVmZmVyU2l6ZSkgPiB0aGlzLl9pbml0VGV4dFdpZHRoICYmIHRoaXMuX2luaXRUZXh0V2lkdGggPCB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9ICdhdXRvJztcbiAgICAgICAgICAgIHRoaXMuX2NoZXZyb25CdXR0b25bMF0uY2xhc3NOYW1lID0gJ21zLU1lc3NhZ2VCYW5uZXItZXhwYW5kJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9IE1hdGgubWluKCh0aGlzLl9jbGllbnRXaWR0aCAtIHRoaXMuX2J1ZmZlclNpemUpLCB0aGlzLl90ZXh0Q29udGFpbmVyTWF4V2lkdGgpICsgJ3B4JztcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2hldnJvbkJ1dHRvbi5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hldnJvbkJ1dHRvblswXS5jbGFzc05hbWUgKz0gJyBpcy12aXNpYmxlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbGlwcGVyWzBdLnN0eWxlLndpZHRoID0gdGhpcy5fdGV4dFdpZHRoO1xuICAgICAgICB0aGlzLl9jaGV2cm9uQnV0dG9uWzBdLnN0eWxlLmhlaWdodCA9ICc1MnB4JztcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl9yZXNpemVTbWFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NsaWVudFdpZHRoIC0gKHRoaXMuX2J1ZmZlckVsZW1lbnRzV2lkdGhTbWFsbCArIHRoaXMuX2Nsb3NlQnV0dG9uWzBdLm9mZnNldFdpZHRoKSA+IHRoaXMuX2luaXRUZXh0V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9ICdhdXRvJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRXaWR0aCA9ICh0aGlzLl9jbGllbnRXaWR0aCAtICh0aGlzLl9idWZmZXJFbGVtZW50c1dpZHRoU21hbGwgKyB0aGlzLl9jbG9zZUJ1dHRvblswXS5vZmZzZXRXaWR0aCkpICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbGlwcGVyWzBdLnN0eWxlLndpZHRoID0gdGhpcy5fdGV4dFdpZHRoO1xuICAgICAgICB0aGlzLl9jaGV2cm9uQnV0dG9uWzBdLnN0eWxlLmhlaWdodCA9ICc4NXB4JztcbiAgICB9O1xuICAgIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUucHJvdG90eXBlLl90b2dnbGVFeHBhbnNpb24gPSBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5pc0V4cGFuZGVkID0gISRzY29wZS5pc0V4cGFuZGVkO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB0aGlzLl9tZXNzYWdlQmFubmVyLnRvZ2dsZUNsYXNzKCdpcy1leHBhbmRlZCcpO1xuICAgIH07XG4gICAgTWVzc2FnZUJhbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUuX2hpZGVCYW5uZXIgPSBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICgkc2NvcGUudWlmSXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlQmFubmVyLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudWlmSXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9tZXNzYWdlQmFubmVyLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTWVzc2FnZUJhbm5lckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUgPSBNZXNzYWdlQmFubmVyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5tZXNzYWdlYmFubmVyJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmTWVzc2FnZUJhbm5lcicsIE1lc3NhZ2VCYW5uZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhbm5lci9tZXNzYWdlQmFubmVyRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgbWVzc2FnZUJhclR5cGVFbnVtXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlQmFyVHlwZUVudW1cIik7XG52YXIgTWVzc2FnZUJhckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VCYXJDb250cm9sbGVyKCRzY29wZSwgJGxvZykge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB9XG4gICAgcmV0dXJuIE1lc3NhZ2VCYXJDb250cm9sbGVyO1xufSgpKTtcbk1lc3NhZ2VCYXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG5leHBvcnRzLk1lc3NhZ2VCYXJDb250cm9sbGVyID0gTWVzc2FnZUJhckNvbnRyb2xsZXI7XG52YXIgTWVzc2FnZUJhckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZUJhckRpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IE1lc3NhZ2VCYXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gJ3VpZk1lc3NhZ2VCYXInO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJycgK1xuICAgICAgICAgICAgJzxkaXYgbmctY2xhc3M9XCJbXFwnbXMtTWVzc2FnZUJhclxcJywgY2xhc3NUeXBlXVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1NZXNzYWdlQmFyLWNvbnRlbnRcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtTWVzc2FnZUJhci1pY29uXCI+JyArXG4gICAgICAgICAgICAnPGkgbmctY2xhc3M9XCJbXFwnbXMtSWNvblxcJywgaWNvblR5cGVdXCI+PC9pPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1NZXNzYWdlQmFyLXRleHRcIiAvPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0taW5mb0NpcmNsZSc7XG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NUeXBlID0gJyc7XG4gICAgICAgICAgICAkc2NvcGUudWlmVHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZUJhclR5cGVFbnVtXzEuTWVzc2FnZUJhclR5cGVFbnVtW25ld1ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5tZXNzYWdlYmFyIC0gVW5zdXBwb3J0ZWQgdHlwZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIChcXCcnICsgJHNjb3BlLnVpZlR5cGUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlIGxpc3RlZCBoZXJlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvbWVzc2FnZWJhci8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWVzc2FnZUJhclR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJyBtcy1NZXNzYWdlQmFyLS0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNsYXNzVHlwZSA9IGNsYXNzTmFtZSArIG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW1bbmV3VmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW0uZXJyb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pY29uVHlwZSA9ICdtcy1JY29uLS14Q2lyY2xlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW0ucmVtb3ZlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaWNvblR5cGUgPSAnbXMtSWNvbi0tbWludXMgbXMtSWNvbi0tY2lyY2xlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW0uc2V2ZXJld2FybmluZzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmljb25UeXBlID0gJ21zLUljb24tLWFsZXJ0JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBtZXNzYWdlQmFyVHlwZUVudW1fMS5NZXNzYWdlQmFyVHlwZUVudW0uc3VjY2VzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmljb25UeXBlID0gJ21zLUljb24tLWNoZWNrYm94Q2hlY2sgbXMtSWNvbi0tY2lyY2xlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnRyYW5zY2x1ZGVDaGlsZHMoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZywgJHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzc2FnZUJhckRpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCk7XG4gICAgICAgIH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJywgJyR0aW1lb3V0J107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSwgJ3VpZi1jb250ZW50Jyk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5NZXNzYWdlQmFyIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgdGhlIG1lc3NhZ2UgYmFyLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnRm9yIDx1aWYtbWVzc2FnZS1iYXI+IHlvdSBuZWVkIHRvIHNwZWNpZnknICtcbiAgICAgICAgICAgICAgICAgICAgJzx1aWYtY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydEl0ZW1Db250ZW50KGNsb25lLCAkc2NvcGUsICRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNZXNzYWdlQmFyRGlyZWN0aXZlLnByb3RvdHlwZS5pbnNlcnRJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudEVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU1lc3NhZ2VCYXItdGV4dCcpKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzSXRlbUNvbnRlbnQoY2xvbmUsICd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCd1aWYtY29udGVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lLCAnbXMtTGluaycpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1MaW5rJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGJyIC8+JykpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTWVzc2FnZUJhckRpcmVjdGl2ZS5wcm90b3R5cGUuaGFzSXRlbUNvbnRlbnQgPSBmdW5jdGlvbiAoY2xvbmUsIHNlbGVjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBNZXNzYWdlQmFyRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuTWVzc2FnZUJhckRpcmVjdGl2ZSA9IE1lc3NhZ2VCYXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm1lc3NhZ2ViYXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZNZXNzYWdlQmFyJywgTWVzc2FnZUJhckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlYmFyL21lc3NhZ2VCYXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1lc3NhZ2VCYXJUeXBlRW51bTtcbihmdW5jdGlvbiAoTWVzc2FnZUJhclR5cGVFbnVtKSB7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcImVycm9yXCJdID0gMF0gPSBcImVycm9yXCI7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcInJlbW92ZVwiXSA9IDFdID0gXCJyZW1vdmVcIjtcbiAgICBNZXNzYWdlQmFyVHlwZUVudW1bTWVzc2FnZUJhclR5cGVFbnVtW1wic2V2ZXJld2FybmluZ1wiXSA9IDJdID0gXCJzZXZlcmV3YXJuaW5nXCI7XG4gICAgTWVzc2FnZUJhclR5cGVFbnVtW01lc3NhZ2VCYXJUeXBlRW51bVtcInN1Y2Nlc3NcIl0gPSAzXSA9IFwic3VjY2Vzc1wiO1xuICAgIE1lc3NhZ2VCYXJUeXBlRW51bVtNZXNzYWdlQmFyVHlwZUVudW1bXCJ3YXJuaW5nXCJdID0gNF0gPSBcIndhcm5pbmdcIjtcbn0pKE1lc3NhZ2VCYXJUeXBlRW51bSA9IGV4cG9ydHMuTWVzc2FnZUJhclR5cGVFbnVtIHx8IChleHBvcnRzLk1lc3NhZ2VCYXJUeXBlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL21lc3NhZ2ViYXIvbWVzc2FnZUJhclR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgY29udGV4dHVhbE1lbnVfMSA9IHJlcXVpcmUoXCIuLy4uL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51XCIpO1xudmFyIE5hdkJhckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckNvbnRyb2xsZXIoJHNjb3BlLCAkYW5pbWF0ZSwgJGVsZW1lbnQsICRsb2cpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5vcGVuTW9iaWxlTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1lbnVWaXNpYmxlID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0aGlzLiRhbmltYXRlW21lbnVWaXNpYmxlID8gJ3JlbW92ZUNsYXNzJyA6ICdhZGRDbGFzcyddKHRoaXMuJGVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgfTtcbiAgICBOYXZCYXJDb250cm9sbGVyLnByb3RvdHlwZS5jbG9zZU1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGFuaW1hdGUucmVtb3ZlQ2xhc3ModGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VBbGxDb250ZXh0TWVudXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuYXZCYXJJdGVtcyA9IHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLU5hdkJhci1pdGVtJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2QmFySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZ0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQobmF2QmFySXRlbXNbaV0pO1xuICAgICAgICAgICAgdmFyIG5hdkJhckl0ZW1DdHJsID0gbmdFbGVtZW50LmNvbnRyb2xsZXIoTmF2QmFySXRlbURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuYXZCYXJJdGVtQ3RybCkge1xuICAgICAgICAgICAgICAgIG5hdkJhckl0ZW1DdHJsLmNsb3NlQ29udGV4dHVhbE1lbnUoKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJJdGVtQ3RybC5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFyQ29udHJvbGxlci5wcm90b3R5cGUuaGlkZVNlYXJjaFRleHRCb3ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuYXZCYXJJdGVtcyA9IHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1zLU5hdkJhci1pdGVtLS1zZWFyY2gnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZCYXJJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5nRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChuYXZCYXJJdGVtc1tpXSk7XG4gICAgICAgICAgICB2YXIgbmF2U2VhcmNoQ3RybCA9IG5nRWxlbWVudC5jb250cm9sbGVyKE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChuYXZTZWFyY2hDdHJsKSB7XG4gICAgICAgICAgICAgICAgbmF2U2VhcmNoQ3RybC5jbG9zZVNlYXJjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTmF2QmFyQ29udHJvbGxlcjtcbn0oKSk7XG5OYXZCYXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckYW5pbWF0ZScsICckZWxlbWVudCcsICckbG9nJ107XG5leHBvcnRzLk5hdkJhckNvbnRyb2xsZXIgPSBOYXZCYXJDb250cm9sbGVyO1xudmFyIE5hdkJhckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyRGlyZWN0aXZlKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAnbmF2JztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IGNsYXNzPVxcXCJtcy1OYXZCYXJcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1OYXZCYXItb3Blbk1lbnUganMtb3Blbk1lbnVcXFwiIG5nLWNsaWNrPVxcXCJuYXYub3Blbk1vYmlsZU1lbnUoKVxcXCI+XFxuICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJtZW51XFxcIj48L3VpZi1pY29uPlxcbiAgICA8L2Rpdj5cXG4gICAgPHVpZi1vdmVybGF5IHVpZi1tb2RlPVxcXCJ7e292ZXJsYXl9fVxcXCIgbmctY2xpY2s9XFxcIm5hdi5jbG9zZU1vYmlsZU1lbnUoKVxcXCI+PC91aWYtb3ZlcmxheT5cXG4gICAgPHVsIGNsYXNzPVxcXCJtcy1OYXZCYXItaXRlbXNcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9J3VpZi1uYXYtaXRlbXMnPjwvZGl2PlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvdmVybGF5OiAnQD91aWZPdmVybGF5J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuYXZCYXJDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgX3RoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmNsb3NlQWxsQ29udGV4dE1lbnVzKCk7XG4gICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5oaWRlU2VhcmNoVGV4dEJveCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLW5hdi1pdGVtcycpKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGNsb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBOYXZCYXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgkbG9nLCAkYW5pbWF0ZSwgJGRvY3VtZW50KSB7IHJldHVybiBuZXcgTmF2QmFyRGlyZWN0aXZlKCRsb2csICRhbmltYXRlLCAkZG9jdW1lbnQpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZycsICckYW5pbWF0ZScsICckZG9jdW1lbnQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBOYXZCYXJEaXJlY3RpdmU7XG59KCkpO1xuTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmTmF2QmFyJztcbk5hdkJhckRpcmVjdGl2ZS5vdmVybGF5VmFsdWVzID0gWydsaWdodCcsICdkYXJrJ107XG5leHBvcnRzLk5hdkJhckRpcmVjdGl2ZSA9IE5hdkJhckRpcmVjdGl2ZTtcbnZhciBOYXZCYXJJdGVtVHlwZXM7XG4oZnVuY3Rpb24gKE5hdkJhckl0ZW1UeXBlcykge1xuICAgIE5hdkJhckl0ZW1UeXBlc1tOYXZCYXJJdGVtVHlwZXNbXCJsaW5rXCJdID0gMF0gPSBcImxpbmtcIjtcbiAgICBOYXZCYXJJdGVtVHlwZXNbTmF2QmFySXRlbVR5cGVzW1wibWVudVwiXSA9IDFdID0gXCJtZW51XCI7XG59KShOYXZCYXJJdGVtVHlwZXMgfHwgKE5hdkJhckl0ZW1UeXBlcyA9IHt9KSk7XG52YXIgTmF2QmFySXRlbUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdkJhckl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgTmF2QmFySXRlbUNvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlQ29udGV4dHVhbE1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNvbnRleHRNZW51Q3RybC5jbG9zZU1lbnUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmF2QmFySXRlbUNvbnRyb2xsZXIucHJvdG90eXBlLmRlc2VsZWN0SXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICB9O1xuICAgIHJldHVybiBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbn0oKSk7XG5OYXZCYXJJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnXTtcbmV4cG9ydHMuTmF2QmFySXRlbUNvbnRyb2xsZXIgPSBOYXZCYXJJdGVtQ29udHJvbGxlcjtcbnZhciBOYXZCYXJJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJJdGVtRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gTmF2QmFySXRlbUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXlwiICsgTmF2QmFyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpc0Rpc2FibGVkOiAnQD9kaXNhYmxlZCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ0A/dWlmUG9zaXRpb24nLFxuICAgICAgICAgICAgdGV4dDogJz0/dWlmVGV4dCcsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tOYXZCYXJJdGVtVHlwZXMubGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTmF2QmFySXRlbVR5cGVzW3R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5uYXZiYXIgLSB1bnN1cHBvcnRlZCBuYXYgYmFyIGl0ZW0gdHlwZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyB0eXBlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IG5nLU9mZmljZSBVSSBGYWJyaWMgYXMgdmFsaWQgdHlwZSBmb3IgbmF2IGJhciBpdGVtLicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBOYXZCYXJJdGVtVHlwZXMgZW51bSBoZXJlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhckRpcmVjdGl2ZS50cycpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdj48L2Rpdj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTmF2QmFySXRlbVR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmF2QmFyQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHZhciBuYXZCYXJMaW5rRWVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLU5hdkJhci1saW5rJykpO1xuICAgICAgICAgICAgICAgIG5hdkJhckxpbmtFZWxlbWVudC5yZW1vdmVBdHRyKCdocmVmJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUudHlwZSkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudHlwZSA9IE5hdkJhckl0ZW1UeXBlc1tOYXZCYXJJdGVtVHlwZXMubGlua107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50Lmhhc0NsYXNzKCdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCkuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmNsb3NlQWxsQ29udGV4dE1lbnVzKCk7XG4gICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5oaWRlU2VhcmNoVGV4dEJveCgpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuaGFzQ2hpbGRNZW51ICYmICRzY29wZS5jb250ZXh0TWVudUN0cmwuaXNNZW51T3BlbmVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRleHRNZW51Q3RybC5jbG9zZU1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRzY29wZS5oYXNDaGlsZE1lbnUgJiYgISRzY29wZS5jb250ZXh0TWVudUN0cmwuaXNNZW51T3BlbmVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRleHRNZW51Q3RybC5vcGVuTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoISRzY29wZS5oYXNDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2QmFyQ29udHJvbGxlci5jbG9zZU1vYmlsZU1lbnUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICRzY29wZS5zZWxlY3RJdGVtKTtcbiAgICAgICAgICAgIF90aGlzLnRyYW5zY2x1ZGVDaGlsZHMoJHNjb3BlLCAkZWxlbWVudCwgJHRyYW5zY2x1ZGUpO1xuICAgICAgICAgICAgdmFyIGNvbnRleHRNZW51Q3RybCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29udGV4dHVhbE1lbnUnKSlcbiAgICAgICAgICAgICAgICAuY29udHJvbGxlcihjb250ZXh0dWFsTWVudV8xLkNvbnRleHR1YWxNZW51RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHRNZW51Q3RybCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5oYXNDaGlsZE1lbnUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS5jb250ZXh0TWVudUN0cmwgPSBjb250ZXh0TWVudUN0cmw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRleHRNZW51Q3RybC5vblJvb3RNZW51Q2xvc2VkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBuYXZCYXJDb250cm9sbGVyLmNsb3NlTW9iaWxlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW05hdkJhckl0ZW1UeXBlcy5saW5rXSA9IFwiXFxuICAgIDxsaSBjbGFzcz1cXFwibXMtTmF2QmFyLWl0ZW1cXFwiXFxuICAgIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZCwgJ21zLU5hdkJhci1pdGVtLS1yaWdodCc6IHBvc2l0aW9uID09PSAncmlnaHQnfVxcXCI+XFxuICAgICAgPGEgY2xhc3M9XFxcIm1zLU5hdkJhci1saW5rXFxcIiBocmVmPVxcXCJcXFwiPjxzcGFuIGNsYXNzPSd1aWYtbmF2LWl0ZW0tY29udGVudCc+PC9zcGFuPjwvYT5cXG4gICAgPC9saT5cIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzW05hdkJhckl0ZW1UeXBlcy5tZW51XSA9IFwiXFxuICAgIDxsaSBjbGFzcz1cXFwibXMtTmF2QmFyLWl0ZW0gbXMtTmF2QmFyLWl0ZW0tLWhhc01lbnVcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiPlxcbiAgICAgIDxhIGNsYXNzPVxcXCJtcy1OYXZCYXItbGlua1xcXCIgaHJlZj1cXFwiXFxcIj48c3BhbiBjbGFzcz0ndWlmLW5hdi1pdGVtLWNvbnRlbnQnPjwvc3Bhbj48L2E+XFxuICAgICAgPGkgY2xhc3M9XFxcIm1zLU5hdkJhci1jaGV2cm9uRG93biBtcy1JY29uIG1zLUljb24tLWNoZXZyb25Eb3duXFxcIj48L2k+XFxuICAgICAgPGRpdiBjbGFzcz0ndWlmLXN1Ym1lbnUnPjwvZGl2PlxcbiAgICA8L2xpPlwiO1xuICAgIH1cbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IE5hdkJhckl0ZW1EaXJlY3RpdmUoJGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS50cmFuc2NsdWRlQ2hpbGRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgdmFyIGhhc0NvbnRlbnQgPSBfdGhpcy5oYXNJdGVtQ29udGVudChjbG9uZSk7XG4gICAgICAgICAgICBpZiAoIWhhc0NvbnRlbnQgJiYgISRzY29wZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMubmF2YmFyIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICd5b3UgbmVlZCB0byBwcm92aWRlIGEgdGV4dCBmb3IgYSBuYXYgYmFyIG1lbnUgaXRlbS5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgJ0ZvciA8dWlmLW5hdi1iYXItaXRlbT4geW91IG5lZWQgdG8gc3BlY2lmeSBlaXRoZXIgXFwndWlmLXRleHRcXCcgYXMgYXR0cmlidXRlIG9yIDx1aWYtbmF2LWl0ZW0tY29udGVudD4gYXMgYSBjaGlsZCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmluc2VydExpbmsoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgX3RoaXMuaW5zZXJ0TWVudShjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTmF2QmFySXRlbURpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0TGluayA9IGZ1bmN0aW9uIChjbG9uZSwgJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFRvUmVwbGFjZSA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcudWlmLW5hdi1pdGVtLWNvbnRlbnQnKSk7XG4gICAgICAgIGlmICh0aGlzLmhhc0l0ZW1Db250ZW50KGNsb25lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50VG9SZXBsYWNlLnJlcGxhY2VXaXRoKGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4+JyArICRzY29wZS50ZXh0ICsgJzwvc3Bhbj4nKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5hdkJhckl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmluc2VydE1lbnUgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoJ21zLUNvbnRleHR1YWxNZW51JykpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1zdWJtZW51JykpLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOYXZCYXJJdGVtRGlyZWN0aXZlLnByb3RvdHlwZS5oYXNJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygndWlmLWNvbnRlbnQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBOYXZCYXJJdGVtRGlyZWN0aXZlO1xufSgpKTtcbk5hdkJhckl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZOYXZCYXJJdGVtJztcbmV4cG9ydHMuTmF2QmFySXRlbURpcmVjdGl2ZSA9IE5hdkJhckl0ZW1EaXJlY3RpdmU7XG52YXIgTmF2QmFyU2VhcmNoQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2QmFyU2VhcmNoQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkZG9jdW1lbnQsICRhbmltYXRlLCAkdGltZW91dCkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kYW5pbWF0ZSA9ICRhbmltYXRlO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgfVxuICAgIE5hdkJhclNlYXJjaENvbnRyb2xsZXIucHJvdG90eXBlLmNsb3NlU2VhcmNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMuJHNjb3BlLnNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kYW5pbWF0ZS5yZW1vdmVDbGFzcyhfdGhpcy4kZWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLiRhbmltYXRlLnJlbW92ZUNsYXNzKF90aGlzLiRlbGVtZW50LCAnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTmF2QmFyU2VhcmNoQ29udHJvbGxlcjtcbn0oKSk7XG5OYXZCYXJTZWFyY2hDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckZG9jdW1lbnQnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbmV4cG9ydHMuTmF2QmFyU2VhcmNoQ29udHJvbGxlciA9IE5hdkJhclNlYXJjaENvbnRyb2xsZXI7XG52YXIgTmF2QmFyU2VhcmNoID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZCYXJTZWFyY2goJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZCYXJTZWFyY2hDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbXCJeXCIgKyBOYXZCYXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgXCJcIiArIE5hdkJhclNlYXJjaC5kaXJlY3RpdmVOYW1lXTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG9uU2VhcmNoQ2FsbGJhY2s6ICcmP3VpZk9uU2VhcmNoJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQD9wbGFjZWhvbGRlcidcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICAgIDxsaSBjbGFzcz1cXFwibXMtTmF2QmFyLWl0ZW0gbXMtTmF2QmFyLWl0ZW0tLXNlYXJjaCBtcy11LWhpZGRlblNtXFxcIiBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtVGV4dEZpZWxkXFxcIiBuZy1jbGljaz1cXFwic2tpcE9uQ2xpY2soJGV2ZW50KVxcXCI+XFxuICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9e3twbGFjZWhvbGRlcn19IGNsYXNzPVxcXCJtcy1UZXh0RmllbGQtZmllbGRcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5nLWtleXByZXNzPVxcXCJvblNlYXJjaCgkZXZlbnQpXFxcIiBuZy1tb2RlbD1cXFwic2VhcmNoVGV4dFxcXCI+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvbGk+XCI7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgX3RoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjdHJsc1sxXS5jbG9zZVNlYXJjaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUuc2tpcE9uQ2xpY2sgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwbHlDc3NDbGFzc2VzKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGN0cmxzWzBdLmNsb3NlQWxsQ29udGV4dE1lbnVzKCk7XG4gICAgICAgICAgICAgICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQgJiYgJGV2ZW50LndoaWNoID09PSAxMyAmJiAkc2NvcGUub25TZWFyY2hDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25TZWFyY2hDYWxsYmFjayh7IHNlYXJjaDogJHNjb3BlLnNlYXJjaFRleHQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSAmJiAkc2NvcGUub25TZWFyY2hDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25TZWFyY2hDYWxsYmFjayh7IHNlYXJjaDogJHNjb3BlLnNlYXJjaFRleHQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLmFwcGx5Q3NzQ2xhc3NlcygkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTmF2QmFyU2VhcmNoLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGRvY3VtZW50LCAkYW5pbWF0ZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTmF2QmFyU2VhcmNoKCRkb2N1bWVudCwgJGFuaW1hdGUsICR0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRkb2N1bWVudCcsICckYW5pbWF0ZScsICckdGltZW91dCddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgTmF2QmFyU2VhcmNoLnByb3RvdHlwZS5hcHBseUNzc0NsYXNzZXMgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCEkZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICB0aGlzLiRhbmltYXRlLmFkZENsYXNzKCRlbGVtZW50LCAnaXMtb3BlbicpO1xuICAgICAgICAgICAgdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1UZXh0RmllbGQtZmllbGQnKSlbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9XG4gICAgICAgICRlbGVtZW50LnBhcmVudCgpLmZpbmQoJ2xpJykucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUuYWRkQ2xhc3MoJGVsZW1lbnQsICdpcy1zZWxlY3RlZCcpO1xuICAgIH07XG4gICAgcmV0dXJuIE5hdkJhclNlYXJjaDtcbn0oKSk7XG5OYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSA9ICd1aWZOYXZCYXJTZWFyY2gnO1xuZXhwb3J0cy5OYXZCYXJTZWFyY2ggPSBOYXZCYXJTZWFyY2g7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm5hdmJhcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZShOYXZCYXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgTmF2QmFyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKE5hdkJhckl0ZW1EaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgTmF2QmFySXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShOYXZCYXJTZWFyY2guZGlyZWN0aXZlTmFtZSwgTmF2QmFyU2VhcmNoLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXJEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBvcmdDaGFydFByZXNlbmNlRW51bV8xID0gcmVxdWlyZShcIi4vb3JnQ2hhcnRQcmVzZW5jZUVudW1cIik7XG52YXIgb3JnQ2hhcnRTdHlsZUVudW1fMSA9IHJlcXVpcmUoXCIuL29yZ0NoYXJ0U3R5bGVFbnVtXCIpO1xudmFyIG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMSA9IHJlcXVpcmUoXCIuL29yZ0NoYXJ0U2VsZWN0TW9kZUVudW1cIik7XG52YXIgT3JnQ2hhcnRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydENvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RNb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUuaXRlbXMgPSBbXTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9yZ0NoYXJ0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiaXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5pdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPcmdDaGFydENvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkSXRlbXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIE9yZ0NoYXJ0Q29udHJvbGxlcjtcbn0oKSk7XG5PcmdDaGFydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcbnZhciBPcmdDaGFydERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gT3JnQ2hhcnRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogJz0/dWlmU2VsZWN0ZWRJdGVtcydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGlmIChhdHRycy51aWZTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlNlbGVjdE1vZGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGU6XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZTpcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RNb2RlID0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bYXR0cnMudWlmU2VsZWN0TW9kZV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVUlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMub3JnY2hhcnQgLSBVbnN1cHBvcnRlZCBzZWxlY3QtbW9kZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGhlIHNlbGVjdC1tb2RlIChcXCcnICsgYXR0cnMudWlmU2VsZWN0TW9kZSArICdcXCkgaXMgbm90IHN1cHBlcnRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBzaW5nbGUsIG11bHRpcGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydERpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cERpcmVjdGl2ZSA9IE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRHcm91cFRpdGxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLU9yZ0NoYXJ0LWdyb3VwVGl0bGVcIiBuZy10cmFuc2NsdWRlID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5PcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmUgPSBPcmdDaGFydEdyb3VwVGl0bGVEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHVsIGNsYXNzPVwibXMtT3JnQ2hhcnQtbGlzdFwiIG5nLXRyYW5zY2x1ZGUgPjwvdWw+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRMaXN0RGlyZWN0aXZlID0gT3JnQ2hhcnRMaXN0RGlyZWN0aXZlO1xudmFyIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1PcmdDaGFydC1saXN0SXRlbVwiPjxkaXYgY2xhc3M9XCJtcy1QZXJzb25hXCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+PC9saT4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZk9yZ0NoYXJ0JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIGl0ZW06ICc9P3VpZkl0ZW0nLFxuICAgICAgICAgICAgcHJlc2VuY2U6ICc9P3VpZlByZXNlbmNlJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPT91aWZTZWxlY3RlZCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSgkbG9nKTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChlbGVtLCBhdHRycywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgT3JnQ2hhcnRQZXJzb25hRGlyZWN0aXZlLnByb3RvdHlwZS5wb3N0TGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnByZXNlbmNlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW1bc2NvcGUucHJlc2VuY2VdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmJ1c3k6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tYnVzeScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIG9yZ0NoYXJ0UHJlc2VuY2VFbnVtXzEuT3JnQ2hhcnRQcmVzZW5jZUVudW0uYXdheTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1hd2F5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugb3JnQ2hhcnRQcmVzZW5jZUVudW1fMS5PcmdDaGFydFByZXNlbmNlRW51bS5ibG9ja2VkOlxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLWJsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLmRuZDpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1kbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFByZXNlbmNlRW51bV8xLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtLm9mZmxpbmU6XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnbXMtUGVyc29uYS0tb2ZmbGluZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgcHJlc2VuY2U6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBwcmVzZW5jZSAoXFwnJyArIHNjb3BlLnByZXNlbmNlICsgJ1xcJykgaXMgbm90IHN1cHBlcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIG9wdGlvbnMgYXJlOiBhdmFpbGFibGUsIGJ1c3ksIGF3YXksIGJsb2NrZWQsIGRuZCwgb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlN0eWxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9yZ0NoYXJ0U3R5bGVFbnVtXzEuT3JnQ2hhcnRTdHlsZUVudW1bYXR0cnMudWlmU3R5bGVdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnNxdWFyZTpcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdtcy1QZXJzb25hLS1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBvcmdDaGFydFN0eWxlRW51bV8xLk9yZ0NoYXJ0U3R5bGVFbnVtLnN0YW5kYXJkOiBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVJRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLm9yZ2NoYXJ0IC0gVW5zdXBwb3J0ZWQgc3R5bGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSBzdHlsZSAoXFwnJyArIGF0dHJzLnVpZlN0eWxlICsgJ1xcKSBpcyBub3Qgc3VwcGVydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6IHN0YW5kYXJkKGRlZmF1bHQpLCBzcXVhcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ21zLVBlcnNvbmEtLXNlbGVjdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgY3RybC5pdGVtcy5wdXNoKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5zaW5nbGUgfHwgY3RybC5zZWxlY3RNb2RlID09PSBvcmdDaGFydFNlbGVjdE1vZGVFbnVtXzEuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bS5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3RybC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXRlbXNbaV0gIT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcy5wdXNoKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wZXJzb25hQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gIXNjb3BlLnNlbGVjdGVkO1xuICAgICAgICAgICAgaWYgKHNjb3BlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0uc2luZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0cmwuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pdGVtc1tpXSAhPT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5pdGVtc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0TW9kZSA9PT0gb3JnQ2hhcnRTZWxlY3RNb2RlRW51bV8xLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLmVxKDApLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkSXRlbXMucHVzaChzY29wZS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGN0cmwuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHNjb3BlLml0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKChjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLnNpbmdsZSB8fCBjdHJsLnNlbGVjdE1vZGUgPT09IG9yZ0NoYXJ0U2VsZWN0TW9kZUVudW1fMS5PcmdDaGFydFNlbGVjdE1vZGVFbnVtLm11bHRpcGxlKSAmJiBzY29wZS5pdGVtKSB7XG4gICAgICAgICAgICBlbGVtLmNoaWxkcmVuKCkuZXEoMCkub24oJ2NsaWNrJywgc2NvcGUucGVyc29uYUNsaWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UGVyc29uYURpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEltYWdlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydEltYWdlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZUFyZWFcXFwiPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJtcy1QZXJzb25hLXBsYWNlaG9sZGVyIG1zLUljb24gbXMtSWNvbi0tcGVyc29uXFxcIj48L2k+XFxuICAgICAgPGltZyBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZVxcXCIgbmctc3JjPVxcXCJ7e25nU3JjfX1cXFwiIC8+XFxuICAgIDwvZGl2PlxcbiAgICBcIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG5nU3JjOiAnPSdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydEltYWdlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRJbWFnZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0SW1hZ2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1wcmVzZW5jZVwiID48L2Rpdj4nO1xuICAgIH1cbiAgICBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgaWYgKCFzY29wZS4kcGFyZW50LnByZXNlbmNlKSB7XG4gICAgICAgICAgICBlbGVtLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByZXNlbmNlRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJlc2VuY2VEaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydERldGFpbHNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtZGV0YWlsc1wiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZSA9IE9yZ0NoYXJ0RGV0YWlsc0RpcmVjdGl2ZTtcbnZhciBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLXByaW1hcnlUZXh0XCIgbmctdHJhbnNjbHVkZSA+PC9kaXY+JztcbiAgICB9XG4gICAgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBPcmdDaGFydFByaW1hcnlUZXh0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0UHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPcmdDaGFydFNlY29uZGFyeVRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dFwiIG5nLXRyYW5zY2x1ZGUgPjwvZGl2Pic7XG4gICAgfVxuICAgIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IE9yZ0NoYXJ0U2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbnZhciBPcmdDaGFydEdyb3VwQnlGaWx0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9yZ0NoYXJ0R3JvdXBCeUZpbHRlcigpIHtcbiAgICB9XG4gICAgT3JnQ2hhcnRHcm91cEJ5RmlsdGVyLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29sbGVjdGlvbiwga2V5KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjb2xsZWN0aW9uW2ldW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xufSgpKTtcbmV4cG9ydHMuT3JnQ2hhcnRHcm91cEJ5RmlsdGVyID0gT3JnQ2hhcnRHcm91cEJ5RmlsdGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vcmdjaGFydCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnQnLCBPcmdDaGFydERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRHcm91cCcsIE9yZ0NoYXJ0R3JvdXBEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0R3JvdXBUaXRsZScsIE9yZ0NoYXJ0R3JvdXBUaXRsZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRMaXN0JywgT3JnQ2hhcnRMaXN0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydFBlcnNvbmEnLCBPcmdDaGFydFBlcnNvbmFEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZk9yZ0NoYXJ0SW1hZ2UnLCBPcmdDaGFydEltYWdlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydFByZXNlbmNlJywgT3JnQ2hhcnRQcmVzZW5jZURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnREZXRhaWxzJywgT3JnQ2hhcnREZXRhaWxzRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcmdDaGFydFByaW1hcnlUZXh0JywgT3JnQ2hhcnRQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmT3JnQ2hhcnRTZWNvbmRhcnlUZXh0JywgT3JnQ2hhcnRTZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZmlsdGVyKCd1aWZPcmdDaGFydEdyb3VwQnknLCBPcmdDaGFydEdyb3VwQnlGaWx0ZXIuZmFjdG9yeSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0RGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBPcmdDaGFydFByZXNlbmNlRW51bTtcbihmdW5jdGlvbiAoT3JnQ2hhcnRQcmVzZW5jZUVudW0pIHtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImF2YWlsYWJsZVwiXSA9IDBdID0gXCJhdmFpbGFibGVcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImJ1c3lcIl0gPSAxXSA9IFwiYnVzeVwiO1xuICAgIE9yZ0NoYXJ0UHJlc2VuY2VFbnVtW09yZ0NoYXJ0UHJlc2VuY2VFbnVtW1wiYXdheVwiXSA9IDJdID0gXCJhd2F5XCI7XG4gICAgT3JnQ2hhcnRQcmVzZW5jZUVudW1bT3JnQ2hhcnRQcmVzZW5jZUVudW1bXCJibG9ja2VkXCJdID0gM10gPSBcImJsb2NrZWRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcImRuZFwiXSA9IDRdID0gXCJkbmRcIjtcbiAgICBPcmdDaGFydFByZXNlbmNlRW51bVtPcmdDaGFydFByZXNlbmNlRW51bVtcIm9mZmxpbmVcIl0gPSA1XSA9IFwib2ZmbGluZVwiO1xufSkoT3JnQ2hhcnRQcmVzZW5jZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtIHx8IChleHBvcnRzLk9yZ0NoYXJ0UHJlc2VuY2VFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvb3JnY2hhcnQvb3JnQ2hhcnRQcmVzZW5jZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW07XG4oZnVuY3Rpb24gKE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0pIHtcbiAgICBPcmdDaGFydFNlbGVjdE1vZGVFbnVtW09yZ0NoYXJ0U2VsZWN0TW9kZUVudW1bXCJzaW5nbGVcIl0gPSAwXSA9IFwic2luZ2xlXCI7XG4gICAgT3JnQ2hhcnRTZWxlY3RNb2RlRW51bVtPcmdDaGFydFNlbGVjdE1vZGVFbnVtW1wibXVsdGlwbGVcIl0gPSAxXSA9IFwibXVsdGlwbGVcIjtcbn0pKE9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gPSBleHBvcnRzLk9yZ0NoYXJ0U2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuT3JnQ2hhcnRTZWxlY3RNb2RlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0U2VsZWN0TW9kZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE9yZ0NoYXJ0U3R5bGVFbnVtO1xuKGZ1bmN0aW9uIChPcmdDaGFydFN0eWxlRW51bSkge1xuICAgIE9yZ0NoYXJ0U3R5bGVFbnVtW09yZ0NoYXJ0U3R5bGVFbnVtW1wic3RhbmRhcmRcIl0gPSAwXSA9IFwic3RhbmRhcmRcIjtcbiAgICBPcmdDaGFydFN0eWxlRW51bVtPcmdDaGFydFN0eWxlRW51bVtcInNxdWFyZVwiXSA9IDFdID0gXCJzcXVhcmVcIjtcbn0pKE9yZ0NoYXJ0U3R5bGVFbnVtID0gZXhwb3J0cy5PcmdDaGFydFN0eWxlRW51bSB8fCAoZXhwb3J0cy5PcmdDaGFydFN0eWxlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL29yZ2NoYXJ0L29yZ0NoYXJ0U3R5bGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgb3ZlcmxheU1vZGVFbnVtXzEgPSByZXF1aXJlKFwiLi9vdmVybGF5TW9kZUVudW1cIik7XG52YXIgT3ZlcmxheUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZXJsYXlDb250cm9sbGVyKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICB9XG4gICAgcmV0dXJuIE92ZXJsYXlDb250cm9sbGVyO1xufSgpKTtcbk92ZXJsYXlDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbnZhciBPdmVybGF5RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVybGF5RGlyZWN0aXZlKGxvZykge1xuICAgICAgICB0aGlzLmxvZyA9IGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtT3ZlcmxheVwiIG5nLWNsYXNzPVwie1xcJ21zLU92ZXJsYXktLWRhcmtcXCc6IHVpZk1vZGUgPT0gXFwnZGFya1xcJ31cIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZNb2RlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgT3ZlcmxheURpcmVjdGl2ZS5sb2cgPSBsb2c7XG4gICAgfVxuICAgIE92ZXJsYXlEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uIChsb2cpIHsgcmV0dXJuIG5ldyBPdmVybGF5RGlyZWN0aXZlKGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBPdmVybGF5RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmTW9kZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChvdmVybGF5TW9kZUVudW1fMS5PdmVybGF5TW9kZVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIE92ZXJsYXlEaXJlY3RpdmUubG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vdmVybGF5IC0gVW5zdXBwb3J0ZWQgb3ZlcmxheSBtb2RlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBvdmVybGF5IG1vZGUgKFxcJycgKyBzY29wZS51aWZNb2RlICsgJ1xcJykgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgT2ZmaWNlIFVJIEZhYnJpYy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdTdXBwb3J0ZWQgb3B0aW9ucyBhcmUgbGlzdGVkIGhlcmU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gT3ZlcmxheURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLk92ZXJsYXlEaXJlY3RpdmUgPSBPdmVybGF5RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5vdmVybGF5JywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPdmVybGF5JywgT3ZlcmxheURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXlEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE92ZXJsYXlNb2RlO1xuKGZ1bmN0aW9uIChPdmVybGF5TW9kZSkge1xuICAgIE92ZXJsYXlNb2RlW092ZXJsYXlNb2RlW1wibGlnaHRcIl0gPSAwXSA9IFwibGlnaHRcIjtcbiAgICBPdmVybGF5TW9kZVtPdmVybGF5TW9kZVtcImRhcmtcIl0gPSAxXSA9IFwiZGFya1wiO1xufSkoT3ZlcmxheU1vZGUgPSBleHBvcnRzLk92ZXJsYXlNb2RlIHx8IChleHBvcnRzLk92ZXJsYXlNb2RlID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5TW9kZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBwYW5lbERpcmVjdGl2ZUVudW1fMSA9IHJlcXVpcmUoXCIuL3BhbmVsRGlyZWN0aXZlRW51bVwiKTtcbnZhciBQYW5lbERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWxEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJGFuaW1hdGUgPSAkYW5pbWF0ZTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAgY2xhc3M9XFxcIm1zLU92ZXJsYXlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInVpZklzTGlnaHREaXNtaXNzICYmIGNsb3NlUGFuZWwoKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jbGFzcz1cXFwidWlmU2hvd092ZXJsYXkgPT09IHRydWUgPyAnbXMtT3ZlcmxheS0tZGFyaycgOiAnJztcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBhbmVsLW1haW5cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGFuZWwtY29tbWFuZHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInVpZlNob3dDbG9zZVxcXCIgY2xhc3M9J21zLVBhbmVsLWNsb3NlQnV0dG9uJyBuZy1jbGljaz1cXFwiY2xvc2VQYW5lbCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWlmLWljb24gdWlmLXR5cGU9J3gnPjwvdWlmLWljb24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QYW5lbC1jb250ZW50SW5uZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGFuZWxDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmSXNMaWdodERpc21pc3M6ICc9JyxcbiAgICAgICAgICAgIHVpZklzT3BlbjogJz0nLFxuICAgICAgICAgICAgdWlmU2hvd0Nsb3NlOiAnPScsXG4gICAgICAgICAgICB1aWZTaG93T3ZlcmxheTogJz0nLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFBhbmVsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KSB7IHJldHVybiBuZXcgUGFuZWxEaXJlY3RpdmUoJGxvZywgJGFuaW1hdGUsICR0aW1lb3V0KTsgfTtcbiAgICAgICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2cnLCAnJGFuaW1hdGUnLCAnJHRpbWVvdXQnXTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBhbmVsRGlyZWN0aXZlLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmU6IHRoaXMucHJlTGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgUGFuZWxEaXJlY3RpdmUucHJvdG90eXBlLnByZUxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgIHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSkuaGFzQ2xhc3MoJ21zLUNvbW1hbmRCYXInKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtY29tbWFuZHMnKSkucHJlcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3BlLnVpZlR5cGUgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbVswXS5xdWVyeVNlbGVjdG9yKCdkaXYubXMtUGFuZWwtbWFpbicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1bMF0ucXVlcnlTZWxlY3RvcignZGl2Lm1zLVBhbmVsLWNvbnRlbnRJbm5lcicpKS5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmNsb3NlUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS51aWZJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsRGlyZWN0aXZlID0gUGFuZWxEaXJlY3RpdmU7XG52YXIgUGFuZWxDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbENvbnRyb2xsZXIoJHNjb3BlLCAkYW5pbWF0ZSwgJGVsZW1lbnQsICRsb2csICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLnVpZlBhbmVsU2l6ZUNsYXNzZXMgPSAoX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMuc21hbGxdID0gJ21zLVBhbmVsLS1zbScsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLm1lZGl1bV0gPSAnbXMtUGFuZWwtLW1kJyxcbiAgICAgICAgICAgIF9hW3BhbmVsRGlyZWN0aXZlRW51bV8xLlBhbmVsVHlwZXMubGFyZ2VdID0gJ21zLVBhbmVsLS1sZycsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmV4dHJhbGFyZ2VdID0gJ21zLVBhbmVsLS14bCcsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmV4dHJhZXh0cmFsYXJnZV0gPSAnbXMtUGFuZWwtLXh4bCcsXG4gICAgICAgICAgICBfYVtwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzLmxlZnRdID0gJ21zLVBhbmVsLS1sZWZ0JyxcbiAgICAgICAgICAgIF9hKTtcbiAgICAgICAgaWYgKCEkc2NvcGUudWlmVHlwZSkge1xuICAgICAgICAgICAgJHNjb3BlLnVpZlR5cGUgPSAnbWVkaXVtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFuZWxEaXJlY3RpdmVFbnVtXzEuUGFuZWxUeXBlc1skc2NvcGUudWlmVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wYW5lbCAtIHVuc3VwcG9ydGVkIHBhbmVsIHR5cGU6XFxuJyArXG4gICAgICAgICAgICAgICAgJ3RoZSB0eXBlIFxcJycgKyAkc2NvcGUudWlmVHlwZSArICdcXCcgaXMgbm90IHN1cHBvcnRlZCBieSBuZy1PZmZpY2UgVUkgRmFicmljIGFzIHZhbGlkIHR5cGUgZm9yIHBhbmVscy4nICtcbiAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBQYW5lbFR5cGVzIGVudW0gaGVyZTpcXG4nICtcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwudHMnKTtcbiAgICAgICAgICAgICRzY29wZS51aWZUeXBlID0gJ21lZGl1bSc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpemUgPSBwYW5lbERpcmVjdGl2ZUVudW1fMS5QYW5lbFR5cGVzWyRzY29wZS51aWZUeXBlXTtcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy51aWZQYW5lbFNpemVDbGFzc2VzW3NpemVdKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgndWlmSXNPcGVuJywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAnYm9vbGVhbicgJiYgbmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBhbmVsIC0gaW52YWxpZCBhdHRyaWJ1dGUgdHlwZTogXFwndWlmLWlzLW9wZW5cXCcuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdUaGUgdHlwZSBcXCcnICsgdHlwZW9mIG5ld1ZhbHVlICsgJ1xcJyBpcyBub3Qgc3VwcG9ydGVkIGFzIHZhbGlkIHR5cGUgZm9yIFxcJ3VpZi1pcy1vcGVuXFwnIGF0dHJpYnV0ZSBmb3IgJyArXG4gICAgICAgICAgICAgICAgICAgICc8dWlmLXBhbmVsLz4uIFRoZSB2YWxpZCB0eXBlIGlzIGJvb2xlYW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGFuaW1hdGUuYWRkQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdtcy1QYW5lbC1hbmltYXRlSW4nKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1Db21tYW5kQmFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtQ29tbWFuZEJhcicpKS5zY29wZSgpLiRicm9hZGNhc3QoJ3VpZi1jb21tYW5kLWJhci1yZXNpemUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGFuaW1hdGUuYWRkQ2xhc3MoX3RoaXMuJGVsZW1lbnQsICdtcy1QYW5lbC1hbmltYXRlT3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdtcy1QYW5lbC1hbmltYXRlSW4gbXMtUGFuZWwtYW5pbWF0ZU91dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS51aWZJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX2E7XG4gICAgfVxuICAgIHJldHVybiBQYW5lbENvbnRyb2xsZXI7XG59KCkpO1xuUGFuZWxDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckYW5pbWF0ZScsICckZWxlbWVudCcsICckbG9nJywgJyR0aW1lb3V0J107XG5leHBvcnRzLlBhbmVsQ29udHJvbGxlciA9IFBhbmVsQ29udHJvbGxlcjtcbnZhciBQYW5lbEhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWxIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHAgY2xhc3M9XCJtcy1QYW5lbC1oZWFkZXJUZXh0XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgdWlmSGVhZGVyVGV4dDogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFBhbmVsSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGFuZWxIZWFkZXJEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbEhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsSGVhZGVyRGlyZWN0aXZlID0gUGFuZWxIZWFkZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBhbmVsJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQYW5lbCcsIFBhbmVsRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQYW5lbEhlYWRlcicsIFBhbmVsSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3BhbmVsL3BhbmVsRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQYW5lbFR5cGVzO1xuKGZ1bmN0aW9uIChQYW5lbFR5cGVzKSB7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wic21hbGxcIl0gPSAwXSA9IFwic21hbGxcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJtZWRpdW1cIl0gPSAxXSA9IFwibWVkaXVtXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wibGFyZ2VcIl0gPSAyXSA9IFwibGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJleHRyYWxhcmdlXCJdID0gM10gPSBcImV4dHJhbGFyZ2VcIjtcbiAgICBQYW5lbFR5cGVzW1BhbmVsVHlwZXNbXCJleHRyYWV4dHJhbGFyZ2VcIl0gPSA0XSA9IFwiZXh0cmFleHRyYWxhcmdlXCI7XG4gICAgUGFuZWxUeXBlc1tQYW5lbFR5cGVzW1wibGVmdFwiXSA9IDVdID0gXCJsZWZ0XCI7XG59KShQYW5lbFR5cGVzID0gZXhwb3J0cy5QYW5lbFR5cGVzIHx8IChleHBvcnRzLlBhbmVsVHlwZXMgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9wYW5lbC9wYW5lbERpcmVjdGl2ZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBwZXJzb25hU3R5bGVFbnVtXzEgPSByZXF1aXJlKFwiLi4vLi4vY29yZS9wZXJzb25hU3R5bGVFbnVtXCIpO1xudmFyIHNpemVFbnVtXzEgPSByZXF1aXJlKFwiLi4vcGVyc29uYS9zaXplRW51bVwiKTtcbnZhciBpY29uRW51bV8xID0gcmVxdWlyZShcIi4uL2ljb24vaWNvbkVudW1cIik7XG52YXIgcGVvcGxlU2VhcmNoRXZlbnROYW1lID0gJ3VpZi1wZW9wbGUtc2VhcmNoJztcbnZhciBHcm91cGVkUGVvcGxlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3JvdXBlZFBlb3BsZURhdGEoKSB7XG4gICAgICAgIHRoaXMucGVvcGxlID0gW107XG4gICAgfVxuICAgIHJldHVybiBHcm91cGVkUGVvcGxlRGF0YTtcbn0oKSk7XG5leHBvcnRzLkdyb3VwZWRQZW9wbGVEYXRhID0gR3JvdXBlZFBlb3BsZURhdGE7XG52YXIgUGVvcGxlUGlja2VyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlUGlja2VyQ29udHJvbGxlcigkc2NvcGUsICRmaWx0ZXIsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRmaWx0ZXIgPSAkZmlsdGVyO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLmdldFNlbGVjdGVkUGVyc29ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkUGVyc29ucztcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnBpY2tlclR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy4kc2NvcGUudHlwZTtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUudHlwZTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckNvbnRyb2xsZXIucHJvdG90eXBlLnNlYXJjaFF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnk7XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYmluZFBlb3BsZSh0aGlzLiRzY29wZS5zZWFyY2hRdWVyeSk7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QocGVvcGxlU2VhcmNoRXZlbnROYW1lLCB0aGlzLnNlYXJjaFF1ZXJ5KCkpO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyQ29udHJvbGxlci5wcm90b3R5cGUuYmluZFBlb3BsZSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IHRoaXMuJHNjb3BlLnBlb3BsZUNhbGxiYWNrKCkocXVlcnkpO1xuICAgICAgICBwZW9wbGVEYXRhID0gcGVvcGxlRGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKHBlb3BsZURhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuZ3JvdXBzID0gdGhpcy5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlKHBlb3BsZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwZW9wbGVEYXRhLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hNb3JlQ3RybF8xID0gYW5ndWxhci5lbGVtZW50KHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlJykpXG4gICAgICAgICAgICAgICAgLmNvbnRyb2xsZXIoXCJcIiArIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoTW9yZUN0cmxfMSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGhhdF8xID0gdGhpcztcbiAgICAgICAgICAgIHBlb3BsZURhdGFcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoYXRfMS4kc2NvcGUuZ3JvdXBzID0gX3RoaXMuY3JlYXRlUGVvcGxlRGF0YVN0cnVjdHVyZShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hNb3JlQ3RybF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaE1vcmVDdHJsXzEuaXNTZWFyY2hpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQZW9wbGVQaWNrZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVQZW9wbGVEYXRhU3RydWN0dXJlID0gZnVuY3Rpb24gKHBlb3BsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGVvcGxlRGF0YSA9IFtdO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gocGVvcGxlLCBmdW5jdGlvbiAocGVyc29uKSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdHcm91cHMgPSBfdGhpcy4kZmlsdGVyKCdmaWx0ZXInKShwZW9wbGVEYXRhLCB7IGdyb3VwOiBwZXJzb24uZ3JvdXAgfSk7XG4gICAgICAgICAgICB2YXIgaGFzR3JvdXAgPSBleGlzdGluZ0dyb3Vwcy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICBpZiAoIWhhc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Blb3BsZURhdGEgPSBuZXcgR3JvdXBlZFBlb3BsZURhdGEoKTtcbiAgICAgICAgICAgICAgICBuZXdQZW9wbGVEYXRhLmdyb3VwID0gcGVyc29uLmdyb3VwO1xuICAgICAgICAgICAgICAgIG5ld1Blb3BsZURhdGEucGVvcGxlLnB1c2gocGVyc29uKTtcbiAgICAgICAgICAgICAgICBwZW9wbGVEYXRhLnB1c2gobmV3UGVvcGxlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdEYXRhID0gZXhpc3RpbmdHcm91cHNbMF07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEYXRhLnBlb3BsZS5wdXNoKHBlcnNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGVvcGxlRGF0YTtcbiAgICB9O1xuICAgIHJldHVybiBQZW9wbGVQaWNrZXJDb250cm9sbGVyO1xufSgpKTtcblBlb3BsZVBpY2tlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRmaWx0ZXInLCAnJGVsZW1lbnQnXTtcbmV4cG9ydHMuUGVvcGxlUGlja2VyQ29udHJvbGxlciA9IFBlb3BsZVBpY2tlckNvbnRyb2xsZXI7XG52YXIgUGVvcGxlUGlja2VyVHlwZXM7XG4oZnVuY3Rpb24gKFBlb3BsZVBpY2tlclR5cGVzKSB7XG4gICAgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbXCJncm91cGVkXCJdID0gMF0gPSBcImdyb3VwZWRcIjtcbiAgICBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlc1tcImNvbXBhY3RcIl0gPSAxXSA9IFwiY29tcGFjdFwiO1xuICAgIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW1wibWVtYmVyTGlzdFwiXSA9IDJdID0gXCJtZW1iZXJMaXN0XCI7XG4gICAgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXNbXCJmYWNlUGlsZVwiXSA9IDNdID0gXCJmYWNlUGlsZVwiO1xufSkoUGVvcGxlUGlja2VyVHlwZXMgfHwgKFBlb3BsZVBpY2tlclR5cGVzID0ge30pKTtcbnZhciBQZW9wbGVQaWNrZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVBpY2tlckRpcmVjdGl2ZSgkZG9jdW1lbnQsICR0aW1lb3V0LCAkbG9nLCAkd2luZG93KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJGRvY3VtZW50O1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnbmdNb2RlbCcsIFwiXCIgKyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZV07XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFBlb3BsZVBpY2tlckNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBkZWxheTogJ0B1aWZTZWFyY2hEZWxheScsXG4gICAgICAgICAgICBmYWNlUGlsZUhlYWRlcjogJ0A/dWlmRmFjZXBpbGVIZWFkZXInLFxuICAgICAgICAgICAgbmdEaXNhYmxlZDogJz0/JyxcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG9uU2VsZWN0ZWRQZXJzb25DbGljazogJyY/dWlmU2VsZWN0ZWRQZXJzb25DbGljaycsXG4gICAgICAgICAgICBwZW9wbGVDYWxsYmFjazogJyZ1aWZQZW9wbGUnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAPycsXG4gICAgICAgICAgICB0eXBlOiAnQD91aWZUeXBlJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICRhdHRycy51aWZUeXBlO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5ncm91cGVkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChQZW9wbGVQaWNrZXJUeXBlc1t0eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVvcGxlcGlja2VyIC0gdW5zdXBwb3J0ZWQgcGVvcGxlIHBpY2tlciB0eXBlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAndGhlIHR5cGUgXFwnJyArIHR5cGUgKyAnXFwnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbmctT2ZmaWNlIFVJIEZhYnJpYyBhcyB2YWxpZCB0eXBlIGZvciBwZW9wbGUgcGlja2VyLicgK1xuICAgICAgICAgICAgICAgICAgICAnU3VwcG9ydGVkIHR5cGVzIGNhbiBiZSBmb3VuZCB1bmRlciBQZW9wbGVQaWNrZXJUeXBlcyBlbnVtIGhlcmU6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbmdPZmZpY2VVSUZhYnJpYy9uZy1vZmZpY2V1aWZhYnJpYy9ibG9iL21hc3Rlci9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzJyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ1tuZ09mZmljZVVpRmFicmljXSAtIEVycm9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50ZW1wbGF0ZVR5cGVzW1Blb3BsZVBpY2tlclR5cGVzW3R5cGVdXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHMsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICB2YXIgbmdNb2RlbEN0cmwgPSBjdHJsc1swXTtcbiAgICAgICAgICAgIHZhciBwZW9wbGVQaWNrZXJDdHJsID0gY3RybHNbMV07XG4gICAgICAgICAgICBfdGhpcy5pbml0RGlzYWJsZWRTdGF0ZSgkZWxlbWVudCwgJHNjb3BlLCAkYXR0cnMpO1xuICAgICAgICAgICAgJHNjb3BlLmZhY2VQaWxlSGVhZGVyID0gJHNjb3BlLmZhY2VQaWxlSGVhZGVyIHx8ICdTdWdnZXN0ZWQgY29udGFjdHMnO1xuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oJ3NlbGVjdGVkUGVyc29ucycsIGZ1bmN0aW9uIChkYXRhLCBkYXRhMiwgZGF0YTMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNpemVTZWFyY2hGaWVsZCgkZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucyA9IG5nTW9kZWxDdHJsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLnJlc2l6ZVNlYXJjaEZpZWxkKCRlbGVtZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgdmFyIHNlYXJjaFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgJHNjb3BlLm9uU2VhcmNoS2V5VXAgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWFyY2hNb3JlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZScpKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlYXJjaE1vcmUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWFyY2hRdWVyeSA/ICRlbGVtZW50LmFkZENsYXNzKCdpcy1zZWFyY2hpbmcnKSA6ICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWFyY2hpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlYXJjaFF1ZXJ5ID8gJHNlYXJjaE1vcmUuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpIDogJHNlYXJjaE1vcmUucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hbmltYXRlU2VsZWN0ZWRQZW9wbGUoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5kZWxheSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQuY2FuY2VsKHNlYXJjaFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwZW9wbGVQaWNrZXJDdHJsLnNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH0sICRzY29wZS5kZWxheSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLm9uUGVvcGxlUGlja2VyQWN0aXZlID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNtb290aFNjcm9sbFRvKCRlbGVtZW50WzBdKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnR5cGUgIT09IFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmZhY2VQaWxlXSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHJlc3VsdHMgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzJykpO1xuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0c1swXS5zdHlsZS53aWR0aCA9ICRlbGVtZW50WzBdLmNsaWVudFdpZHRoIC0gMiArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRzY29wZS50eXBlID09PSBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVNlbGVjdGVkUGVvcGxlKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUuYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZSA9IGZ1bmN0aW9uIChwZXJzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5pbmRleE9mKHBlcnNvbikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyc29ucy5wdXNoKHBlcnNvbik7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSgkc2NvcGUuc2VsZWN0ZWRQZXJzb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUucmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlID0gZnVuY3Rpb24gKHBlcnNvbiwgJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZHggPSAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zLmluZGV4T2YocGVyc29uKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRQZXJzb25zLnNwbGljZShpbmR4LCAxKTtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKCRzY29wZS5zZWxlY3RlZFBlcnNvbnMpO1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUucmVtb3ZlUGVyc29uRnJvbVNlYXJjaFJlc3VsdHMgPSBmdW5jdGlvbiAocGVvcGxlLCBwZXJzb24sICRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5keCA9IHBlb3BsZS5pbmRleE9mKHBlcnNvbik7XG4gICAgICAgICAgICAgICAgcGVvcGxlLnNwbGljZShpbmR4LCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCRzY29wZS50eXBlID09PSBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0pIHtcbiAgICAgICAgICAgICAgICAkdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zZXJ0RmFjZVBpbGVIZWFkZXIoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnNlcnRGYWNlUGlsZVNlYXJjaE1vcmUoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZ3JvdXBlZF0gPVxuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEJveFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXBlcnNvbmFcXFwiIG5nLXJlcGVhdD1cXFwicGVyc29uIGluIHNlbGVjdGVkUGVyc29ucyB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hIG5nLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKShwZXJzb24pXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtcHJlc2VuY2U9XFxcInt7cGVyc29uLnByZXNlbmNlfX1cXFwiXFxuICAgICAgICAgICAgICAgIHVpZi1pbWFnZS11cmw9XFxcInt7cGVyc29uLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1pbml0aWFscyB1aWYtY29sb3I9XFxcInt7cGVyc29uLmNvbG9yfX1cXFwiPnt7cGVyc29uLmluaXRpYWxzfX08L3VpZi1wZXJzb25hLWluaXRpYWxzPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0Pnt7cGVyc29uLnByaW1hcnlUZXh0fX08L3VpZi1wZXJzb25hLXByaW1hcnktdGV4dD5cXG4gICAgICAgICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICAgICAgICA8YnV0dG9uXFxuICAgICAgICAgICAgICAgIG5nLWlmPVxcXCIhbmdEaXNhYmxlZFxcXCJcXG4gICAgICAgICAgICAgICAgdHlwZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICBuZy1jbGljaz1cXFwicmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlKHBlcnNvbiwgJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hUmVtb3ZlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IG5nLWNsaWNrPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7e3BsYWNlaG9sZGVyfX1cXFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcInNlYXJjaFF1ZXJ5XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoRmllbGRcXFwiXFxuICAgICAgICAgICAgbmctZm9jdXM9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgbmcta2V5dXA9XFxcIm9uU2VhcmNoS2V5VXAoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0R3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwiZ3JvdXBEYXRhIGluIGdyb3VwcyB8IG9yZGVyQnk6Jy1vcmRlcidcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwVGl0bGVcXFwiPnt7Z3JvdXBEYXRhLmdyb3VwLm5hbWV9fTwvZGl2PlxcbiAgICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiZ3JvdXBEYXRhLnBlb3BsZVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsb3NlLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VhcmNoUmVzdWx0c1xcXCJcXG4gICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmVdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUubWVkaXVtXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuY29tcGFjdF0gPVxuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXIgbXMtUGVvcGxlUGlja2VyLS1jb21wYWN0XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZXJzb25hXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlcnNvbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnNxdWFyZV0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgdWlmLXByZXNlbmNlPVxcXCJ7e3BlcnNvbi5wcmVzZW5jZX19XFxcIlxcbiAgICAgICAgICAgICAgICB1aWYtaW1hZ2UtdXJsPVxcXCJ7e3BlcnNvbi5pY29ufX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXByaW1hcnktdGV4dD57e3BlcnNvbi5wcmltYXJ5VGV4dH19PC91aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+XFxuICAgICAgICAgICAgICA8L3VpZi1wZXJzb25hPlxcbiAgICAgICAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICAgICAgICBuZy1pZj1cXFwiIW5nRGlzYWJsZWRcXFwiXFxuICAgICAgICAgICAgICAgIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZShwZXJzb24sICRldmVudClcXFwiXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcGVyc29uYVJlbW92ZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0ueF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwic2VhcmNoUXVlcnlcXFwiXFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7cGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3Vwc1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwXFxcIiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRHcm91cFRpdGxlXFxcIj57e2dyb3VwRGF0YS5ncm91cC5uYW1lfX08L2Rpdj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdFxcbiAgICAgICAgICAgICAgbmctbW9kZWw9XFxcImdyb3VwRGF0YS5wZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGlja2VyLXR5cGU9XFxcIlwiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuY29tcGFjdF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcImFkZFBlcnNvblRvU2VsZWN0ZWRQZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsb3NlLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VhcmNoUmVzdWx0c1xcXCJcXG4gICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5zcXVhcmVdICsgXCJcXFwiXFxuICAgICAgICAgICAgICB1aWYtc2l6ZT1cXFwiXCIgKyBzaXplRW51bV8xLlBlcnNvbmFTaXplW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMubWVtYmVyTGlzdF0gPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlciBtcy1QZW9wbGVQaWNrZXItLW1lbWJlcnNMaXN0XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3hcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuZy1jbGljaz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwie3twbGFjZWhvbGRlcn19XFxcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJzZWFyY2hRdWVyeVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkXFxcIlxcbiAgICAgICAgICAgIG5nLWZvY3VzPVxcXCJvblBlb3BsZVBpY2tlckFjdGl2ZSgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIG5nLWtleXVwPVxcXCJvblNlYXJjaEtleVVwKCRldmVudClcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3Vwc1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEdyb3VwXFxcIiBuZy1yZXBlYXQ9XFxcImdyb3VwRGF0YSBpbiBncm91cHMgfCBvcmRlckJ5Oictb3JkZXInXFxcIj5cXG4gICAgICAgICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdFxcbiAgICAgICAgICAgICAgbmctbW9kZWw9XFxcImdyb3VwRGF0YS5wZW9wbGVcXFwiXFxuICAgICAgICAgICAgICB1aWYtcGVyc29uLWNsaWNrPVxcXCJhZGRQZXJzb25Ub1NlbGVjdGVkUGVvcGxlXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXN0eWxlPVxcXCJcIiArIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW3BlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtLnJvdW5kXSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLm1lZGl1bV0gKyBcIlxcXCI+PC91aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1zZWxlY3RlZCBuZy1tb2RlbD1cXFwic2VsZWN0ZWRQZXJzb25zXFxcIlxcbiAgICAgICAgdWlmLXNlbGVjdGVkLXBlcnNvbi1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKClcXFwiXFxuICAgICAgICB1aWYtcGVyc29uLWNsb3NlPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGVcXFwiPlxcbiAgICAgICAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICAgICAgICA8L3VpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkPlxcbiAgICAgIDwvZGl2PlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuZmFjZVBpbGVdID0gXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXIgbXMtUGVvcGxlUGlja2VyLS1GYWNlcGlsZVxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoQm94XFxcIj5cXG4gICAgICAgICAgICA8aW5wdXQgbmctY2xpY2s9XFxcIm9uUGVvcGxlUGlja2VyQWN0aXZlKCRldmVudClcXFwiXFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInt7cGxhY2Vob2xkZXJ9fVxcXCJcXG4gICAgICAgICAgICBuZy1tb2RlbD1cXFwic2VhcmNoUXVlcnlcXFwiXFxuICAgICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hGaWVsZFxcXCJcXG4gICAgICAgICAgICBuZy1mb2N1cz1cXFwib25QZW9wbGVQaWNrZXJBY3RpdmUoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICBuZy1rZXl1cD1cXFwib25TZWFyY2hLZXlVcCgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0c1xcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1wZW9wbGVMaXN0SGVhZGVyXFxcIj5cXG4gICAgICAgICAgICAgIDxzcGFuPnt7ZmFjZVBpbGVIZWFkZXJ9fTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJncm91cERhdGEgaW4gZ3JvdXBzIHwgb3JkZXJCeTonLW9yZGVyJ1xcXCI+XFxuICAgICAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0XFxuICAgICAgICAgICAgbmctbW9kZWw9XFxcImdyb3VwRGF0YS5wZW9wbGVcXFwiXFxuICAgICAgICAgICAgdWlmLXBlcnNvbi1jbGljaz1cXFwiYWRkUGVyc29uVG9TZWxlY3RlZFBlb3BsZVxcXCJcXG4gICAgICAgICAgICB1aWYtc3R5bGU9XFxcIlwiICsgcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW1bcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0ucm91bmRdICsgXCJcXFwiXFxuICAgICAgICAgICAgdWlmLXNpemU9XFxcIlwiICsgc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSArIFwiXFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWlmLXNlYXJjaC1tb3JlXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHVpZi1wZW9wbGUtcGlja2VyLXNlbGVjdGVkIG5nLW1vZGVsPVxcXCJzZWxlY3RlZFBlcnNvbnNcXFwiXFxuICAgICAgICB1aWYtc2VsZWN0ZWQtcGVyc29uLWNsaWNrPVxcXCJvblNlbGVjdGVkUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2U9XFxcInJlbW92ZVBlcnNvbkZyb21TZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVpZi1wZW9wbGUtaGVhZGVyXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvdWlmLXBlb3BsZS1waWNrZXItc2VsZWN0ZWQ+XFxuXFxuICAgICAgPC9kaXY+XCI7XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCRkb2N1bWVudCwgJHRpbWVvdXQsICRsb2csICR3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGVvcGxlUGlja2VyRGlyZWN0aXZlKCRkb2N1bWVudCwgJHRpbWVvdXQsICRsb2csICR3aW5kb3cpO1xuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGRvY3VtZW50JywgJyR0aW1lb3V0JywgJyRsb2cnLCAnJHdpbmRvdyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5pbml0RGlzYWJsZWRTdGF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudCwgJHNjb3BlLCAkYXR0cnMpIHtcbiAgICAgICAgdmFyICRzZWFyY2hGaWVsZCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkJykpO1xuICAgICAgICAkYXR0cnMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAkc2VhcmNoRmllbGQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzZWFyY2hGaWVsZC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuYW5pbWF0ZVNlbGVjdGVkUGVvcGxlID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgICAgIHZhciAkc2VsZWN0ZWRQZW9wbGUgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFBlb3BsZScpKTtcbiAgICAgICAgJHNlbGVjdGVkUGVvcGxlLmFkZENsYXNzKCdtcy11LXNsaWRlRG93bkluMjAnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7ICRzZWxlY3RlZFBlb3BsZS5yZW1vdmVDbGFzcygnbXMtdS1zbGlkZURvd25JbjIwJyk7IH0sIDEwMDApO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5jdXJyZW50WVBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kd2luZG93LnBhZ2VZT2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gYW5ndWxhci5lbGVtZW50KHRoaXMuJGRvY3VtZW50WzBdKS5maW5kKCdib2R5JylbMF07XG4gICAgICAgIGlmIChib2R5LnNjcm9sbFRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5lbG1ZUG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgeSA9IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICB2YXIgbm9kZSA9IGVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChub2RlLm9mZnNldFBhcmVudCAmJiBub2RlLm9mZnNldFBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgbm9kZSA9IChub2RlLm9mZnNldFBhcmVudCk7XG4gICAgICAgICAgICB5ICs9IG5vZGUub2Zmc2V0VG9wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5O1xuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5zbW9vdGhTY3JvbGxUbyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBzdGFydFkgPSB0aGlzLmN1cnJlbnRZUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHN0b3BZID0gdGhpcy5lbG1ZUG9zaXRpb24oZWxlbWVudCk7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHN0b3BZID4gc3RhcnRZID8gc3RvcFkgLSBzdGFydFkgOiBzdGFydFkgLSBzdG9wWTtcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgMTAwKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc3RvcFkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzcGVlZCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyAzMCk7XG4gICAgICAgIGlmIChzcGVlZCA+PSAyMCkge1xuICAgICAgICAgICAgc3BlZWQgPSAyMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RlcCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyAyNSk7XG4gICAgICAgIHZhciBsZWFwWSA9IHN0b3BZID4gc3RhcnRZID8gc3RhcnRZICsgc3RlcCA6IHN0YXJ0WSAtIHN0ZXA7XG4gICAgICAgIHZhciB0aW1lciA9IDA7XG4gICAgICAgIGlmIChzdG9wWSA+IHN0YXJ0WSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0WTsgaSA8IHN0b3BZOyBpICs9IHN0ZXApIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGxZLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGxZKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdCAqIHNwZWVkKTtcbiAgICAgICAgICAgICAgICB9KShsZWFwWSwgdGltZXIpO1xuICAgICAgICAgICAgICAgIGxlYXBZICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgaWYgKGxlYXBZID4gc3RvcFkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVhcFkgPSBzdG9wWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGltZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRZOyBpID4gc3RvcFk7IGkgLT0gc3RlcCkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIChsWSwgdCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbFkpO1xuICAgICAgICAgICAgICAgIH0sIHQgKiBzcGVlZCk7XG4gICAgICAgICAgICB9KShsZWFwWSwgdGltZXIpO1xuICAgICAgICAgICAgbGVhcFkgLT0gc3RlcDtcbiAgICAgICAgICAgIGlmIChsZWFwWSA8IHN0b3BZKSB7XG4gICAgICAgICAgICAgICAgbGVhcFkgPSBzdG9wWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVyKys7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0RmFjZVBpbGVIZWFkZXIgPSBmdW5jdGlvbiAoY2xvbmUsICRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb1JlcGxhY2UgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnVpZi1wZW9wbGUtaGVhZGVyJykpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjbG9uZVtpXSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkQ291bnQnKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRUb1JlcGxhY2UucmVwbGFjZVdpdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5wcm90b3R5cGUuaW5zZXJ0RmFjZVBpbGVTZWFyY2hNb3JlID0gZnVuY3Rpb24gKGNsb25lLCAkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50VG9SZXBsYWNlID0gYW5ndWxhci5lbGVtZW50KCRlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy51aWYtc2VhcmNoLW1vcmUnKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKCdtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZScpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFRvUmVwbGFjZS5yZXBsYWNlV2l0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGVvcGxlUGlja2VyRGlyZWN0aXZlLnByb3RvdHlwZS5yZXNpemVTZWFyY2hGaWVsZCA9IGZ1bmN0aW9uICgkcGVvcGxlUGlja2VyKSB7XG4gICAgICAgIHZhciAkc2VhcmNoQm94ID0gYW5ndWxhci5lbGVtZW50KCRwZW9wbGVQaWNrZXJbMF0ucXVlcnlTZWxlY3RvcignLm1zLVBlb3BsZVBpY2tlci1zZWFyY2hCb3gnKSk7XG4gICAgICAgIHZhciAkc2VhcmNoRmllbGQgPSBhbmd1bGFyLmVsZW1lbnQoJHBlb3BsZVBpY2tlclswXS5xdWVyeVNlbGVjdG9yKCcubXMtUGVvcGxlUGlja2VyLXNlYXJjaEZpZWxkJykpO1xuICAgICAgICB2YXIgc2VhcmNoQm94TGVmdEVkZ2UgPSAkc2VhcmNoQm94LnByb3AoJ29mZnNldExlZnQnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJveFdpZHRoID0gJHNlYXJjaEJveFswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIHNlYXJjaEJveFJpZ2h0RWRnZSA9IHNlYXJjaEJveExlZnRFZGdlICsgc2VhcmNoQm94V2lkdGg7XG4gICAgICAgIHZhciAkcGVyc29uYU5vZGVzID0gJHNlYXJjaEJveFswXS5xdWVyeVNlbGVjdG9yQWxsKCcubXMtUGVvcGxlUGlja2VyLXBlcnNvbmEnKTtcbiAgICAgICAgaWYgKCRwZXJzb25hTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkc2VhcmNoRmllbGRbMF0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyICRsYXN0UGVyc29uYSA9IGFuZ3VsYXIuZWxlbWVudCgkcGVyc29uYU5vZGVzWyRwZXJzb25hTm9kZXMubGVuZ3RoIC0gMV0pO1xuICAgICAgICB2YXIgbGFzdFBlcnNvbmFMZWZ0RWRnZSA9ICRsYXN0UGVyc29uYS5wcm9wKCdvZmZzZXRMZWZ0Jyk7XG4gICAgICAgIHZhciBsYXN0UGVyc29uYVdpZHRoID0gJGxhc3RQZXJzb25hWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgbGFzdFBlcnNvbmFSaWdodEVkZ2UgPSBsYXN0UGVyc29uYUxlZnRFZGdlICsgbGFzdFBlcnNvbmFXaWR0aDtcbiAgICAgICAgdmFyIG5ld0ZpZWxkV2lkdGggPSBzZWFyY2hCb3hSaWdodEVkZ2UgLSBsYXN0UGVyc29uYVJpZ2h0RWRnZSAtIDU7XG4gICAgICAgIGlmIChuZXdGaWVsZFdpZHRoIDwgMTAwKSB7XG4gICAgICAgICAgICBuZXdGaWVsZFdpZHRoID0gJzEwMCUnO1xuICAgICAgICAgICAgJHNlYXJjaEZpZWxkWzBdLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJHNlYXJjaEZpZWxkWzBdLnN0eWxlLndpZHRoID0gbmV3RmllbGRXaWR0aCArICdweCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQZW9wbGVQaWNrZXJEaXJlY3RpdmU7XG59KCkpO1xuUGVvcGxlUGlja2VyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyJztcbmV4cG9ydHMuUGVvcGxlUGlja2VyRGlyZWN0aXZlID0gUGVvcGxlUGlja2VyRGlyZWN0aXZlO1xudmFyIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPHVsIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0TGlzdFxcXCI+XFxuICAgIDxsaSBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdFxcXCIgbmctcmVwZWF0PVxcXCJwZXJzb24gaW4gcGVvcGxlIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxuICAgICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QnRuXFxcIlxcbiAgICAgIG5nLWNsYXNzPVxcXCJ7J21zLVBlb3BsZVBpY2tlci1yZXN1bHRCdG4tLWNvbXBhY3QnOiBwaWNrZXJUeXBlID09PSAnY29tcGFjdCd9XFxcIiBuZy1jbGljaz1cXFwib25QZXJzb25DbGljaygpKHBlcnNvbilcXFwiPlxcbiAgICAgICAgPHVpZi1wZXJzb25hXFxuICAgICAgICAgIHVpZi1zdHlsZT1cXFwie3twZXJzb25TdHlsZX19XFxcIlxcbiAgICAgICAgICB1aWYtc2l6ZT1cXFwie3twZXJzb25TaXplfX1cXFwiXFxuICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgdWlmLWltYWdlLXVybD1cXFwie3twZXJzb24uaWNvbn19XFxcIj5cXG4gICAgICAgICAgPHVpZi1wZXJzb25hLWluaXRpYWxzIHVpZi1jb2xvcj1cXFwie3twZXJzb24uY29sb3J9fVxcXCI+e3twZXJzb24uaW5pdGlhbHN9fTwvdWlmLXBlcnNvbmEtaW5pdGlhbHM+XFxuICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICA8dWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+e3twZXJzb24uc2Vjb25kYXJ5VGV4dH19PC91aWYtcGVyc29uYS1zZWNvbmRhcnktdGV4dD5cXG4gICAgICAgIDwvdWlmLXBlcnNvbmE+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgbmctaWY9XFxcIiFwZXJzb24uYWRkaXRpb25hbERhdGEgJiYgb25QZXJzb25DbG9zZUNsaWNrKClcXFwiXFxuICAgICAgICAgIG5nLWNsaWNrPVxcXCJvblBlcnNvbkNsb3NlQ2xpY2soKShwZW9wbGUsIHBlcnNvbiwgJGV2ZW50KVxcXCJcXG4gICAgICAgICAgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1yZXN1bHRBY3Rpb24ganMtcmVzdWx0UmVtb3ZlXFxcIj5cXG4gICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgbmctaWY9XFxcInBlcnNvbi5hZGRpdGlvbmFsRGF0YVxcXCJcXG4gICAgICAgICAgbmctY2xpY2s9XFxcImV4cGFuZEFkZGl0aW9uYWxEYXRhKCRldmVudClcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItcmVzdWx0QWN0aW9uIGpzLXJlc3VsdFJlbW92ZVxcXCI+XFxuICAgICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uY2hldnJvbnNEb3duXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBuZy1pZj1cXFwicGVyc29uLmFkZGl0aW9uYWxEYXRhXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEFkZGl0aW9uYWxDb250ZW50XFxcIj5cXG4gICAgICAgIDx1aWYtcGVvcGxlLXBpY2tlci1yZXN1bHQtbGlzdFxcbiAgICAgICAgbmctbW9kZWw9XFxcInBlcnNvbi5hZGRpdGlvbmFsRGF0YVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xpY2s9XFxcIm9uUGVyc29uQ2xpY2soKVxcXCJcXG4gICAgICAgIHVpZi1wZXJzb24tY2xvc2UtY2xpY2s9XFxcIm9uUGVyc29uQ2xvc2VDbGljaygpXFxcIlxcbiAgICAgICAgdWlmLXBpY2tlci10eXBlPVxcXCJ7e3BpY2tlclR5cGV9fVxcXCJcXG4gICAgICAgIHVpZi1zdHlsZT1cXFwie3twZXJzb25TdHlsZX19XFxcIlxcbiAgICAgICAgdWlmLXNpemU9XFxcInt7cGVyc29uU2l6ZX19XFxcIj48L3VpZi1wZW9wbGUtcGlja2VyLXJlc3VsdC1saXN0PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2xpPlxcbiAgPC91bD5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIG9uUGVyc29uQ2xpY2s6ICcmdWlmUGVyc29uQ2xpY2snLFxuICAgICAgICAgICAgb25QZXJzb25DbG9zZUNsaWNrOiAnJnVpZlBlcnNvbkNsb3NlQ2xpY2snLFxuICAgICAgICAgICAgcGVvcGxlOiAnPW5nTW9kZWwnLFxuICAgICAgICAgICAgcGVyc29uU2l6ZTogJ0B1aWZTaXplJyxcbiAgICAgICAgICAgIHBlcnNvblN0eWxlOiAnQHVpZlN0eWxlJyxcbiAgICAgICAgICAgIHBpY2tlclR5cGU6ICdAdWlmUGlja2VyVHlwZSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGVvcGxlUGlja2VyQ3RybCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5leHBhbmRBZGRpdGlvbmFsRGF0YSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyICRidXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoJGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkcGFyZW50ID0gJGJ1dHRvbi5wYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ21zLVBlb3BsZVBpY2tlci1yZXN1bHQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC50b2dnbGVDbGFzcygnaXMtZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRidXR0b24gPSAkcGFyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVvcGxlUGlja2VyUmVzdWx0TGlzdERpcmVjdGl2ZTtcbn0oKSk7XG5QZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmUGVvcGxlUGlja2VyUmVzdWx0TGlzdCc7XG5leHBvcnRzLlBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUgPSBQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlO1xudmFyIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2VhcmNoQ2FsbGJhY2tzID0gW107XG4gICAgfVxuICAgIFBlb3BsZVNlYXJjaE1vcmVDb250cm9sbGVyLnByb3RvdHlwZS5pc1NlYXJjaGluZyA9IGZ1bmN0aW9uIChzZWFyY2hpbmcpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUucHJvY2Vzc2luZyA9IHNlYXJjaGluZztcbiAgICAgICAgc2VhcmNoaW5nID8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtc2VhcmNoaW5nJykgOiB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1zZWFyY2hpbmcnKTtcbiAgICB9O1xuICAgIHJldHVybiBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcjtcbn0oKSk7XG5QZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnXTtcbmV4cG9ydHMuUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXIgPSBQZW9wbGVTZWFyY2hNb3JlQ29udHJvbGxlcjtcbnZhciBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBcIl5eXCIgKyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGVvcGxlU2VhcmNoTW9yZUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUganMtc2VhcmNoTW9yZVxcXCJcXG4gICAgbmctY2xhc3M9XFxcInsnbXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmUtLWRpc2Nvbm5lY3RlZCc6IGRpc2Nvbm5lY3RlZH1cXFwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctaWY9XFxcInBpY2tlclR5cGUgPT09ICdcIiArIFBlb3BsZVBpY2tlclR5cGVzW1Blb3BsZVBpY2tlclR5cGVzLmdyb3VwZWRdICsgXCInICYmICFkaXNjb25uZWN0ZWRcXFwiXFxuICAgICAgbmctY2xpY2s9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUJ0blxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVJY29uXFxcIj5cXG4gICAgICAgIDx1aWYtaWNvbiBuZy1pZj1cXFwiIWRpc2Nvbm5lY3RlZFxcXCIgdWlmLXR5cGU9XFxcIlwiICsgaWNvbkVudW1fMS5JY29uRW51bVtpY29uRW51bV8xLkljb25FbnVtLnNlYXJjaF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICAgIDx1aWYtaWNvbiBuZy1pZj1cXFwiZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uYWxlcnRdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgPC9idXR0b24+XFxuICAgIDxkaXYgcm9sZT1cXFwiYnV0dG9uXFxcIiBuZy1pZj1cXFwicGlja2VyVHlwZSA9PT0gJ1wiICsgUGVvcGxlUGlja2VyVHlwZXNbUGVvcGxlUGlja2VyVHlwZXMuY29tcGFjdF0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuIG1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuLS1jb21wYWN0XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJwaWNrZXJUeXBlID09PSAnXCIgKyBQZW9wbGVQaWNrZXJUeXBlc1tQZW9wbGVQaWNrZXJUeXBlcy5mYWNlUGlsZV0gKyBcIicgJiYgIWRpc2Nvbm5lY3RlZFxcXCJcXG4gICAgICBuZy1jbGljaz1cXFwib25TZWFyY2goJGV2ZW50KVxcXCIgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuIG1zLVBlb3BsZVBpY2tlci1zZWFyY2hNb3JlQnRuLS1jb21wYWN0XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUljb25cXFwiPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCIhZGlzY29ubmVjdGVkXFxcIiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uc2VhcmNoXSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgPHVpZi1pY29uIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS5hbGVydF0gKyBcIlxcXCI+PC91aWYtaWNvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8bmctdHJhbnNjbHVkZSAvPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIG5nLWlmPVxcXCJkaXNjb25uZWN0ZWRcXFwiIGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VhcmNoTW9yZUJ0blxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVJY29uXFxcIj5cXG4gICAgICAgIDx1aWYtaWNvbiB1aWYtdHlwZT1cXFwiXCIgKyBpY29uRW51bV8xLkljb25FbnVtW2ljb25FbnVtXzEuSWNvbkVudW0uYWxlcnRdICsgXCJcXFwiPjwvdWlmLWljb24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPG5nLXRyYW5zY2x1ZGUgLz5cXG4gICAgPC9kaXY+XFxuICAgIDx1aWYtc3Bpbm5lciBuZy1zaG93PVxcXCJwcm9jZXNzaW5nXFxcIj48L3VpZi1zcGlubmVyPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBkaXNjb25uZWN0ZWQ6ICc9dWlmRGlzY29ubmVjdGVkJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwZW9wbGVQaWNrZXJDdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgJHNjb3BlLnBpY2tlclR5cGUgPSBwZW9wbGVQaWNrZXJDdHJsLnBpY2tlclR5cGUoKTtcbiAgICAgICAgICAgICRzY29wZS5vblNlYXJjaCA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgcGVvcGxlUGlja2VyQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdChwZW9wbGVTZWFyY2hFdmVudE5hbWUsIHBlb3BsZVBpY2tlckN0cmwuc2VhcmNoUXVlcnkoKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmU7XG59KCkpO1xuUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlBlb3BsZVNlYXJjaE1vcmUnO1xuZXhwb3J0cy5QZW9wbGVTZWFyY2hNb3JlRGlyZWN0aXZlID0gUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZTtcbnZhciBQcmltYXJ5VGV4dENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByaW1hcnlUZXh0Q29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihwZW9wbGVTZWFyY2hFdmVudE5hbWUsIGZ1bmN0aW9uICgkZXZlbnQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICBfdGhpcy4kc2NvcGUuc2VhcmNoUXVlcnkgPSBxdWVyeTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBQcmltYXJ5VGV4dENvbnRyb2xsZXI7XG59KCkpO1xuUHJpbWFyeVRleHRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuZXhwb3J0cy5QcmltYXJ5VGV4dENvbnRyb2xsZXIgPSBQcmltYXJ5VGV4dENvbnRyb2xsZXI7XG52YXIgUHJpbWFyeVRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByaW1hcnlUZXh0RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbXCJeXlwiICsgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBcIl5eXCIgKyBQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZV07XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFByaW1hcnlUZXh0Q29udHJvbGxlcjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQuZGlzY29ubmVjdGVkXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVQcmltYXJ5XFxcIj5cXG4gICAgPGRpdiBuZy1zaG93PVxcXCIkcGFyZW50LiRwYXJlbnQucHJvY2Vzc2luZ1xcXCI+e3tzZWFyY2hpbmdGb3JUZXh0fX0ge3tzZWFyY2hRdWVyeX19PC9kaXY+XFxuICAgIDxuZy10cmFuc2NsdWRlIG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQucHJvY2Vzc2luZ1xcXCI+PC9uZy10cmFuc2NsdWRlPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hpbmdGb3JUZXh0OiAnQD91aWZTZWFyY2hGb3JUZXh0J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJscywgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5zZWFyY2hpbmdGb3JUZXh0ID0gJHNjb3BlLnNlYXJjaGluZ0ZvclRleHQgfHwgJ1NlYXJjaGluZyBmb3InO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQcmltYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFByaW1hcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUHJpbWFyeVRleHREaXJlY3RpdmU7XG59KCkpO1xuUHJpbWFyeVRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZQcmltYXJ5VGV4dCc7XG5leHBvcnRzLlByaW1hcnlUZXh0RGlyZWN0aXZlID0gUHJpbWFyeVRleHREaXJlY3RpdmU7XG52YXIgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiXFxuICA8ZGl2IG5nLXNob3c9XFxcIiEkcGFyZW50LiRwYXJlbnQuZGlzY29ubmVjdGVkXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVTZWNvbmRhcnlcXFwiPlxcbiAgICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuICA8L2Rpdj5cIjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRydWU7XG4gICAgfVxuICAgIFNlY29uZGFyeVRleHREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5TZWNvbmRhcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUgPSAndWlmU2Vjb25kYXJ5VGV4dCc7XG5leHBvcnRzLlNlY29uZGFyeVRleHREaXJlY3RpdmUgPSBTZWNvbmRhcnlUZXh0RGlyZWN0aXZlO1xudmFyIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgPGRpdiBuZy1zaG93PVxcXCIkcGFyZW50LiRwYXJlbnQuZGlzY29ubmVjdGVkXFxcIiBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlYXJjaE1vcmVQcmltYXJ5XFxcIj5cXG4gICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB0cnVlO1xuICAgIH1cbiAgICBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIERpc2Nvbm5lY3RlZFRleHREaXJlY3RpdmU7XG59KCkpO1xuRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZkRpc2Nvbm5lY3RlZFRleHQnO1xuZXhwb3J0cy5EaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlID0gRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZTtcbnZhciBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBcIlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZW9wbGVQaWNrZXItc2VsZWN0ZWRcXFwiIG5nLWNsYXNzPVxcXCJ7J2lzLWFjdGl2ZSc6IHNlbGVjdGVkUGVvcGxlICYmIHNlbGVjdGVkUGVvcGxlLmxlbmd0aCA+IDB9XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZEhlYWRlclxcXCI+XFxuICAgICAgICAgICAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8dWwgY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZFBlb3BsZVxcXCI+XFxuICAgICAgICAgIDxsaSBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXNlbGVjdGVkUGVyc29uXFxcIiBuZy1yZXBlYXQ9XFxcInBlcnNvbiBpbiBzZWxlY3RlZFBlb3BsZSB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgIDx1aWYtcGVyc29uYSBuZy1jbGljaz1cXFwib25TZWxlY3RlZFBlcnNvbkNsaWNrKCkocGVyc29uKVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zdHlsZT1cXFwiXCIgKyBwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bVtwZXJzb25hU3R5bGVFbnVtXzEuUGVyc29uYVN0eWxlRW51bS5yb3VuZF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1zaXplPVxcXCJcIiArIHNpemVFbnVtXzEuUGVyc29uYVNpemVbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS5zbWFsbF0gKyBcIlxcXCJcXG4gICAgICAgICAgICAgIHVpZi1wcmVzZW5jZT1cXFwie3twZXJzb24ucHJlc2VuY2V9fVxcXCJcXG4gICAgICAgICAgICAgIHVpZi1pbWFnZS11cmw9XFxcInt7cGVyc29uLmljb259fVxcXCI+XFxuICAgICAgICAgICAgICA8dWlmLXBlcnNvbmEtaW5pdGlhbHMgdWlmLWNvbG9yPVxcXCJ7e3BlcnNvbi5jb2xvcn19XFxcIj57e3BlcnNvbi5pbml0aWFsc319PC91aWYtcGVyc29uYS1pbml0aWFscz5cXG4gICAgICAgICAgICAgIDx1aWYtcGVyc29uYS1wcmltYXJ5LXRleHQ+e3twZXJzb24ucHJpbWFyeVRleHR9fTwvdWlmLXBlcnNvbmEtcHJpbWFyeS10ZXh0PlxcbiAgICAgICAgICAgICAgPHVpZi1wZXJzb25hLXNlY29uZGFyeS10ZXh0Pnt7cGVyc29uLnNlY29uZGFyeVRleHR9fTwvdWlmLXBlcnNvbmEtc2Vjb25kYXJ5LXRleHQ+XFxuICAgICAgICAgICAgPC91aWYtcGVyc29uYT5cXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVxcXCJyZW1vdmVQZXJzb25Gcm9tU2VsZWN0ZWRQZW9wbGUoKShwZXJzb24sICRldmVudClcXFwiXFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibXMtUGVvcGxlUGlja2VyLXJlc3VsdEFjdGlvbiBqcy1yZXN1bHRSZW1vdmVcXFwiPlxcbiAgICAgICAgICAgICAgPHVpZi1pY29uIHVpZi10eXBlPVxcXCJcIiArIGljb25FbnVtXzEuSWNvbkVudW1baWNvbkVudW1fMS5JY29uRW51bS54XSArIFwiXFxcIj48L3VpZi1pY29uPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICA8L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgPC9kaXY+XCI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBvblNlbGVjdGVkUGVyc29uQ2xpY2s6ICcmP3VpZlNlbGVjdGVkUGVyc29uQ2xpY2snLFxuICAgICAgICAgICAgcmVtb3ZlUGVyc29uRnJvbVNlbGVjdGVkUGVvcGxlOiAnJnVpZlBlcnNvbkNsb3NlJyxcbiAgICAgICAgICAgIHNlbGVjdGVkUGVvcGxlOiAnPW5nTW9kZWwnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZTtcbn0oKSk7XG5QZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3VpZlBlb3BsZVBpY2tlclNlbGVjdGVkJztcbmV4cG9ydHMuUGVvcGxlUGlja2VyU2VsZWN0ZWREaXJlY3RpdmUgPSBQZW9wbGVQaWNrZXJTZWxlY3RlZERpcmVjdGl2ZTtcbnZhciBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFwiXl5cIiArIFBlb3BsZVBpY2tlckRpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPHNwYW4gY2xhc3M9XFxcIm1zLVBlb3BsZVBpY2tlci1zZWxlY3RlZENvdW50XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcbiAgICAgICAgdGhpcy5saW5rID0gZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGVvcGxlUGlja2VyQ3RybCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFBlcnNvbnMgPSBwZW9wbGVQaWNrZXJDdHJsLmdldFNlbGVjdGVkUGVyc29ucygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTZWxlY3RlZFBlb3BsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmU7XG59KCkpO1xuU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSA9ICd1aWZTZWxlY3RlZFBlb3BsZUhlYWRlcic7XG5leHBvcnRzLlNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlID0gU2VsZWN0ZWRQZW9wbGVIZWFkZXJEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlb3BsZXBpY2tlcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZShQZW9wbGVQaWNrZXJEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlUGlja2VyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFByaW1hcnlUZXh0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFByaW1hcnlUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFNlY29uZGFyeVRleHREaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgU2Vjb25kYXJ5VGV4dERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShQZW9wbGVQaWNrZXJSZXN1bHRMaXN0RGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFBlb3BsZVBpY2tlclJlc3VsdExpc3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoRGlzY29ubmVjdGVkVGV4dERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lLCBEaXNjb25uZWN0ZWRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFBlb3BsZVBpY2tlclNlbGVjdGVkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlLmRpcmVjdGl2ZU5hbWUsIFNlbGVjdGVkUGVvcGxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKFBlb3BsZVNlYXJjaE1vcmVEaXJlY3RpdmUuZGlyZWN0aXZlTmFtZSwgUGVvcGxlU2VhcmNoTW9yZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9wZW9wbGVwaWNrZXIvcGVvcGxlUGlja2VyRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgcGVyc29uYVN0eWxlRW51bV8xID0gcmVxdWlyZShcIi4uLy4uL2NvcmUvcGVyc29uYVN0eWxlRW51bVwiKTtcbnZhciBwZXJzb25hUHJlc2VuY2VFbnVtXzEgPSByZXF1aXJlKFwiLi4vLi4vY29yZS9wZXJzb25hUHJlc2VuY2VFbnVtXCIpO1xudmFyIHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xID0gcmVxdWlyZShcIi4uLy4uL2NvcmUvcGVyc29uYUluaXRpYWxzQ29sb3JFbnVtXCIpO1xudmFyIHNpemVFbnVtXzEgPSByZXF1aXJlKFwiLi9zaXplRW51bVwiKTtcbnZhciBQZXJzb25hVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYVRleHREaXJlY3RpdmUoZGlyZWN0aXZlVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmVUeXBlO1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNsYXNzZXMgPSB7XG4gICAgICAgICAgICAnb3B0aW9uYWwnOiAnbXMtUGVyc29uYS1vcHRpb25hbFRleHQnLFxuICAgICAgICAgICAgJ3ByaW1hcnknOiAnbXMtUGVyc29uYS1wcmltYXJ5VGV4dCcsXG4gICAgICAgICAgICAnc2Vjb25kYXJ5JzogJ21zLVBlcnNvbmEtc2Vjb25kYXJ5VGV4dCcsXG4gICAgICAgICAgICAndGVydGlhcnknOiAnbXMtUGVyc29uYS10ZXJ0aWFyeVRleHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZVRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCInICsgX3RoaXMuYXZhaWxhYmxlQ2xhc3Nlc1tfdGhpcy5kaXJlY3RpdmVUeXBlXSArICdcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHRoaXMuYXZhaWxhYmxlQ2xhc3Nlc1t0aGlzLmRpcmVjdGl2ZVR5cGVdKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gJ29wdGlvbmFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQZXJzb25hVGV4dERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hVGV4dERpcmVjdGl2ZSh0eXBlKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hVGV4dERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFUZXh0RGlyZWN0aXZlID0gUGVyc29uYVRleHREaXJlY3RpdmU7XG52YXIgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hSW5pdGlhbHNEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBbJ151aWZQZXJzb25hJ107XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICAndWlmQ29sb3InOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbml0aWFscyBtcy1QZXJzb25hLWluaXRpYWxzLS17e3VpZkNvbG9yfX1cIiBuZy10cmFuc2NsdWRlPjwvZGl2PiAnO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJscykge1xuICAgICAgICAgICAgdmFyIHBlcnNvbmFDb250cm9sbGVyID0gY3RybHNbMF07XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy51aWZDb2xvcikpIHtcbiAgICAgICAgICAgICAgICBzY29wZS51aWZDb2xvciA9IHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW3BlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yLmJsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZDb2xvcicsIGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFJbml0aWFsc0NvbG9yRW51bV8xLlBlcnNvbmFJbml0aWFsc0NvbG9yW25ld0NvbG9yXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYSAtIFwiJyArIG5ld0NvbG9yICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZDb2xvci4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgSXQgc2hvdWxkIGJlIGxpZ2h0Qmx1ZSwgYmx1ZSwgZGFya0JsdWUsIHRlYWwsIGxpZ2h0R3JlZW4sIGdyZWVuLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBkYXJrR3JlZW4sIGxpZ2h0UGluaywgcGluaywgbWFnZW50YSwgcHVycGxlLCBibGFjaywgb3JhbmdlLCByZWQgb3IgZGFya1JlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlID0gUGVyc29uYUluaXRpYWxzRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGVyc29uYSddO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQZXJzb25hQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICd1aWZJbWFnZVVybCc6ICdAJyxcbiAgICAgICAgICAgICd1aWZQcmVzZW5jZSc6ICdAJyxcbiAgICAgICAgICAgICd1aWZTaXplJzogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDbGFzc2VzKClcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1pbWFnZUFyZWFcIiBuZy1zaG93PVwiZ2V0SW1hZ2VBcmVhVmlzaWJpbGl0eSgpXCI+JyArXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VcIiBuZy1zcmM9XCJ7e3VpZkltYWdlVXJsfX1cIiBuZy1pZj1cInVpZkltYWdlVXJsXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy51aWZTaXplQ2xhc3NlcyA9IChfYSA9IHt9LFxuICAgICAgICAgICAgX2Fbc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS50aW55XSA9ICdtcy1QZXJzb25hLS10aW55JyxcbiAgICAgICAgICAgIF9hW3NpemVFbnVtXzEuUGVyc29uYVNpemUueHNtYWxsXSA9ICdtcy1QZXJzb25hLS14cycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsXSA9ICdtcy1QZXJzb25hLS1zbScsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLmxhcmdlXSA9ICdtcy1QZXJzb25hLS1sZycsXG4gICAgICAgICAgICBfYVtzaXplRW51bV8xLlBlcnNvbmFTaXplLnhsYXJnZV0gPSAnbXMtUGVyc29uYS0teGwnLFxuICAgICAgICAgICAgX2EpO1xuICAgICAgICB0aGlzLnVpZlByZXNlbmNlQ2xhc3NlcyA9IChfYiA9IHt9LFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5hdmFpbGFibGVdID0gJ21zLVBlcnNvbmEtLWF2YWlsYWJsZScsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF3YXldID0gJ21zLVBlcnNvbmEtLWF3YXknLFxuICAgICAgICAgICAgX2JbcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bS5ibG9ja2VkXSA9ICdtcy1QZXJzb25hLS1ibG9ja2VkJyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYnVzeV0gPSAnbXMtUGVyc29uYS0tYnVzeScsXG4gICAgICAgICAgICBfYltwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmRuZF0gPSAnbXMtUGVyc29uYS0tZG5kJyxcbiAgICAgICAgICAgIF9iW3BlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0ub2ZmbGluZV0gPSAnbXMtUGVyc29uYS0tb2ZmbGluZScsXG4gICAgICAgICAgICBfYik7XG4gICAgICAgIHRoaXMubGluayA9IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICB2YXIgcGVyc29uYUNvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aWZTaXplKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHNpemVFbnVtXzEuUGVyc29uYVNpemVbYXR0cnMudWlmU2l6ZV0pKSB7XG4gICAgICAgICAgICAgICAgcGVyc29uYUNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYSAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlNpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSB0aW55LCB4c21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4bGFyZ2UuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlN0eWxlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmU3R5bGUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlN0eWxlLiBJdCBzaG91bGQgYmUgcm91bmQgb3Igc3F1YXJlLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aWZQcmVzZW5jZSkgJiYgYW5ndWxhci5pc1VuZGVmaW5lZChwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hIC0gXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMudWlmUHJlc2VuY2UgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlByZXNlbmNlLiBJdCBzaG91bGQgYmUgYXZhaWxhYmxlLCBhd2F5LCBibG9ja2VkLCBidXN5LCBkbmQgb3Igb2ZmbGluZS4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5nZXRJbWFnZUFyZWFWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoc2l6ZUVudW1fMS5QZXJzb25hU2l6ZVthdHRycy51aWZTaXplXSAhPT0gc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS50aW55KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5nZXRQZXJzb25hQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGVyc29uYUNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IHNpemVFbnVtXzEuUGVyc29uYVNpemVbYXR0cnMudWlmU2l6ZV07XG4gICAgICAgICAgICAgICAgdmFyIHByZXNlbmNlID0gYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmUHJlc2VuY2UpID8gcGVyc29uYVByZXNlbmNlRW51bV8xLlByZXNlbmNlRW51bVthdHRycy51aWZQcmVzZW5jZV0gOiBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLm9mZmxpbmU7XG4gICAgICAgICAgICAgICAgaWYgKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2l6ZUNsYXNzID0gX3RoaXMudWlmU2l6ZUNsYXNzZXNbc2l6ZV07XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNpemVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaChzaXplQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKF90aGlzLnVpZlByZXNlbmNlQ2xhc3Nlc1twcmVzZW5jZV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hQ2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGV0YWlsc1dyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hLWRldGFpbHMnKSk7XG4gICAgICAgICAgICAgICAgdmFyIGltYWdlQXJlYSA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmEtaW1hZ2VBcmVhJykpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBjbG9uZVtpXS50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLVBSSU1BUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1TRUNPTkRBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1URVJUSUFSWS1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VJRi1QRVJTT05BLU9QVElPTkFMLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNXcmFwcGVyLmFwcGVuZChjbG9uZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1JTklUSUFMUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VBcmVhLnByZXBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgIH1cbiAgICBQZXJzb25hRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGVyc29uYURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hRGlyZWN0aXZlID0gUGVyc29uYURpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gUGVyc29uYUNvbnRyb2xsZXI7XG59KCkpO1xuUGVyc29uYUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuZXhwb3J0cy5QZXJzb25hQ29udHJvbGxlciA9IFBlcnNvbmFDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYScsIFBlcnNvbmFEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFJbml0aWFscycsIFBlcnNvbmFJbml0aWFsc0RpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVByaW1hcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgncHJpbWFyeScpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlBlcnNvbmFTZWNvbmRhcnlUZXh0JywgUGVyc29uYVRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYVRlcnRpYXJ5VGV4dCcsIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3RlcnRpYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYU9wdGlvbmFsVGV4dCcsIFBlcnNvbmFUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJycpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGVyc29uYS9wZXJzb25hRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgc2l6ZUVudW1fMSA9IHJlcXVpcmUoXCIuL3NpemVFbnVtXCIpO1xudmFyIHBsYWNlaG9sZGVyRW51bV8xID0gcmVxdWlyZShcIi4vcGxhY2Vob2xkZXJFbnVtXCIpO1xudmFyIHBlcnNvbmFTdHlsZUVudW1fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb3JlL3BlcnNvbmFTdHlsZUVudW1cIik7XG52YXIgcGVyc29uYVByZXNlbmNlRW51bV8xID0gcmVxdWlyZShcIi4uLy4uL2NvcmUvcGVyc29uYVByZXNlbmNlRW51bVwiKTtcbnZhciBQZXJzb25hQ2FyZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmREaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGVyc29uYUNhcmQnXTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gUGVyc29uYUNhcmRDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ3VpZkltYWdlVXJsJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZlByZXNlbmNlJzogJ0AnLFxuICAgICAgICAgICAgJ3VpZlNpemUnOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYUNhcmRcIiBuZy1jbGFzcz1cImdldFBlcnNvbmFDYXJkQ2xhc3NlcygpXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLXBlcnNvbmFcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYVwiIG5nLWNsYXNzPVwiZ2V0UGVyc29uYUNsYXNzZXMoKVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtcy1QZXJzb25hLWltYWdlQXJlYVwiPicgK1xuICAgICAgICAgICAgJzx1aWYtaWNvbiB1aWYtdHlwZT1cInBlcnNvblwiPjwvdWlmLWljb24+JyArXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cIm1zLVBlcnNvbmEtaW1hZ2VcIiBuZy1zcmM9XCJ7e3VpZkltYWdlVXJsfX1cIiBuZy1pZj1cInVpZkltYWdlVXJsXCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmEtcHJlc2VuY2VcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUGVyc29uYS1kZXRhaWxzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibXMtUGVyc29uYUNhcmQtYWN0aW9uc1wiPicgK1xuICAgICAgICAgICAgJzxsaSBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gcGVyc29uYUNhcmRBY3Rpb25zXCIgbmctY2xhc3M9XCJnZXRBY3Rpb25DbGFzc2VzKGFjdGlvbilcIiBuZy1jbGljaz1cInNlbGVjdEFjdGlvbigkZXZlbnQsIGFjdGlvbilcIj4nICtcbiAgICAgICAgICAgICc8dWlmLWljb24gdWlmLXR5cGU9e3thY3Rpb24uaWNvbn19IG5nLWlmPVwiYWN0aW9uLnBsYWNlaG9sZGVyICE9IFxcJ292ZXJmbG93XFwnXCI+PC91aWYtaWNvbj4nICtcbiAgICAgICAgICAgICc8L2xpPicgK1xuICAgICAgICAgICAgJzwvdWw+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWFjdGlvbkRldGFpbEJveFwiPicgK1xuICAgICAgICAgICAgJzx1bCBuZy1jbGFzcz1cImRldGFpbENsYXNzXCI+PC91bD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVycywgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIHBlcnNvbmFDYXJkQ29udHJvbGxlciA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgdmFyIGljb24gPSBlbGVtZW50LmZpbmQoJ3VpZi1pY29uJyk7XG4gICAgICAgICAgICBpY29uLmFkZENsYXNzKCdtcy1QZXJzb25hLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlmU2l6ZSkgJiYgYW5ndWxhci5pc1VuZGVmaW5lZChzaXplRW51bV8xLlBlcnNvbmFTaXplW2F0dHJzLnVpZlNpemVdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlNpemUgKyAnXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHVpZlNpemUuIEl0IHNob3VsZCBiZSB4c21hbGwsIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCB4bGFyZ2UuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlN0eWxlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSkpIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hQ2FyZENvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQgLSBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRycy51aWZTdHlsZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmU3R5bGUuIEl0IHNob3VsZCBiZSByb3VuZCBvciBzcXVhcmUuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlByZXNlbmNlKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW1bYXR0cnMudWlmUHJlc2VuY2VdKSkge1xuICAgICAgICAgICAgICAgIHBlcnNvbmFDYXJkQ29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wZXJzb25hY2FyZCAtIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnVpZlByZXNlbmNlICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZQcmVzZW5jZS4gSXQgc2hvdWxkIGJlIGF2YWlsYWJsZSwgYXdheSwgYmxvY2tlZCwgYnVzeSwgZG5kIG9yIG9mZmxpbmUuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuZ2V0QWN0aW9uQ2xhc3NlcyA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uQ2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bVthY3Rpb24ucGxhY2Vob2xkZXJdO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0udG9wcmlnaHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ21zLVBlcnNvbmFDYXJkLWFjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hQ2FyZC1vcmdDaGFydCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnJlZ3VsYXI6XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ21zLVBlcnNvbmFDYXJkLWFjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc2VzLnB1c2goJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uQ2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUuZ2V0UGVyc29uYUNsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBlcnNvbmFDbGFzc2VzID0gW107XG4gICAgICAgICAgICAgICAgaWYgKHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNpemVFbnVtXzEuUGVyc29uYVNpemVbYXR0cnMudWlmU2l6ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnhzbWFsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLXhzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBzaXplRW51bV8xLlBlcnNvbmFTaXplLnNtYWxsOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tc20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHNpemVFbnVtXzEuUGVyc29uYVNpemUubGFyZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1sZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc2l6ZUVudW1fMS5QZXJzb25hU2l6ZS54bGFyZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS14bCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtW2F0dHJzLnVpZlByZXNlbmNlXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHBlcnNvbmFQcmVzZW5jZUVudW1fMS5QcmVzZW5jZUVudW0uYXZhaWxhYmxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uYUNsYXNzZXMucHVzaCgnbXMtUGVyc29uYS0tYXZhaWxhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmF3YXk6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1hd2F5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJsb2NrZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1ibG9ja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmJ1c3k6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1idXN5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwZXJzb25hUHJlc2VuY2VFbnVtXzEuUHJlc2VuY2VFbnVtLmRuZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFDbGFzc2VzLnB1c2goJ21zLVBlcnNvbmEtLWRuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hQ2xhc3Nlcy5wdXNoKCdtcy1QZXJzb25hLS1vZmZsaW5lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5nZXRQZXJzb25hQ2FyZENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFTdHlsZUVudW1fMS5QZXJzb25hU3R5bGVFbnVtW2F0dHJzLnVpZlN0eWxlXSA9PT0gcGVyc29uYVN0eWxlRW51bV8xLlBlcnNvbmFTdHlsZUVudW0uc3F1YXJlID8gJ21zLVBlcnNvbmFDYXJkLS1zcXVhcmUnIDogJyc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhbnNjbHVkZShmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGV0YWlsc1dyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtcy1QZXJzb25hLWRldGFpbHMnKSk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbkRldGFpbHNCb3hMaXN0ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbXMtUGVyc29uYUNhcmQtYWN0aW9uRGV0YWlsQm94JykpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCd1bCcpLmVxKDApO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zTGlzdCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zLVBlcnNvbmFDYXJkLWFjdGlvbnMnKSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnTmFtZSA9IGNsb25lW2ldLnRhZ05hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1QUklNQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1TRUNPTkRBUlktVEVYVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVSUYtUEVSU09OQS1DQVJELVRFUlRJQVJZLVRFWFQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1PUFRJT05BTC1URVhUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzV3JhcHBlci5hcHBlbmQoY2xvbmVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVUlGLVBFUlNPTkEtQ0FSRC1BQ1RJT04nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQWN0aW9uID0gYW5ndWxhci5lbGVtZW50KGNsb25lW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSB3cmFwcGVkQWN0aW9uLmF0dHIoJ3VpZi1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJdID09PSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW0ub3ZlcmZsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc0xpc3QuYXBwZW5kKHdyYXBwZWRBY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uRGV0YWlsc0JveExpc3QuYXBwZW5kKF90aGlzLnByb2Nlc3NBY3Rpb24od3JhcHBlZEFjdGlvbiwgc2NvcGUsIHBlcnNvbmFDYXJkQ29udHJvbGxlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGVyc29uYUNhcmREaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgUGVyc29uYUNhcmREaXJlY3RpdmUucHJvdG90eXBlLnByb2Nlc3NBY3Rpb24gPSBmdW5jdGlvbiAoY2xvbmUsIHNjb3BlLCBwZXJzb25hQ2FyZENvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIGNsYXNzVG9BZGQgPSAnJztcbiAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gY2xvbmUuYXR0cigndWlmLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgIHZhciBpY29uID0gY2xvbmUuYXR0cigndWlmLWljb24nKTtcbiAgICAgICAgdmFyIGFjdGlvblRvQWRkID0gbmV3IFBlcnNvbmFDYXJkQWN0aW9uKGljb24sIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgc3dpdGNoIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgY2FzZSBwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLnJlZ3VsYXJdOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9BZGQgPSAnZGV0YWlsLScgKyAoKytzY29wZS5yZWd1bGFyQWN0aW9uc0NvdW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW3BsYWNlaG9sZGVyRW51bV8xLlBsYWNlaG9sZGVyRW51bS50b3ByaWdodF06XG4gICAgICAgICAgICAgICAgY2xhc3NUb0FkZCA9ICdkZXRhaWwtNSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNsb25lLmZpbmQoJ2xpJykuZXEoMCkuYWRkQ2xhc3MoY2xhc3NUb0FkZCk7XG4gICAgICAgIGFjdGlvblRvQWRkLmRldGFpbENsYXNzID0gY2xhc3NUb0FkZDtcbiAgICAgICAgcGVyc29uYUNhcmRDb250cm9sbGVyLmFkZEFjdGlvbihhY3Rpb25Ub0FkZCk7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGlyZWN0aXZlID0gUGVyc29uYUNhcmREaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmRDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZENvbnRyb2xsZXIoJGxvZywgJHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLmRldGFpbENzcyA9IHtcbiAgICAgICAgICAgIDE6ICdDaGF0JyxcbiAgICAgICAgICAgIDI6ICdQaG9uZScsXG4gICAgICAgICAgICAzOiAnVmlkZW8nLFxuICAgICAgICAgICAgNDogJ01haWwnLFxuICAgICAgICAgICAgNTogJ09yZydcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAkc2NvcGUucmVndWxhckFjdGlvbnNDb3VudCA9IDA7XG4gICAgICAgICRzY29wZS5kZXRhaWxDbGFzcyA9ICdtcy1QZXJzb25hQ2FyZC1kZXRhaWxDaGF0JztcbiAgICAgICAgJHNjb3BlLnNlbGVjdEFjdGlvbiA9IGZ1bmN0aW9uICgkZXZlbnQsIGFjdGlvbikge1xuICAgICAgICAgICAgJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFjdGlvbi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgZGV0YWlsTnVtYmVyID0gKyhhY3Rpb24uZGV0YWlsQ2xhc3MuY2hhckF0KGFjdGlvbi5kZXRhaWxDbGFzcy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAkc2NvcGUuZGV0YWlsQ2xhc3MgPSAnbXMtUGVyc29uYUNhcmQtZGV0YWlsJyArIF90aGlzLmRldGFpbENzc1tkZXRhaWxOdW1iZXJdO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQZXJzb25hQ2FyZENvbnRyb2xsZXIucHJvdG90eXBlLmFkZEFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb25Ub0FkZCkge1xuICAgICAgICBpZiAodGhpcy4kc2NvcGUucGVyc29uYUNhcmRBY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWN0aW9uVG9BZGQuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHNjb3BlLnBlcnNvbmFDYXJkQWN0aW9ucy5wdXNoKGFjdGlvblRvQWRkKTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZENvbnRyb2xsZXI7XG59KCkpO1xuUGVyc29uYUNhcmRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnLCAnJHNjb3BlJ107XG5leHBvcnRzLlBlcnNvbmFDYXJkQ29udHJvbGxlciA9IFBlcnNvbmFDYXJkQ29udHJvbGxlcjtcbnZhciBQZXJzb25hQ2FyZEFjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRBY3Rpb24oaWNvbiwgcGxhY2Vob2xkZXIpIHtcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gUGVyc29uYUNhcmRBY3Rpb247XG59KCkpO1xudmFyIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlKGRpcmVjdGl2ZVR5cGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVUeXBlID0gZGlyZWN0aXZlVHlwZTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVDbGFzc2VzID0ge1xuICAgICAgICAgICAgJ29wdGlvbmFsJzogJ21zLVBlcnNvbmEtb3B0aW9uYWxUZXh0JyxcbiAgICAgICAgICAgICdwcmltYXJ5JzogJ21zLVBlcnNvbmEtcHJpbWFyeVRleHQnLFxuICAgICAgICAgICAgJ3NlY29uZGFyeSc6ICdtcy1QZXJzb25hLXNlY29uZGFyeVRleHQnLFxuICAgICAgICAgICAgJ3RlcnRpYXJ5JzogJ21zLVBlcnNvbmEtdGVydGlhcnlUZXh0J1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBkaXJlY3RpdmVUZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiJyArIF90aGlzLmF2YWlsYWJsZUNsYXNzZXNbX3RoaXMuZGlyZWN0aXZlVHlwZV0gKyAnXCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZVRlbXBsYXRlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCh0aGlzLmF2YWlsYWJsZUNsYXNzZXNbdGhpcy5kaXJlY3RpdmVUeXBlXSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aXZlVHlwZSA9ICdvcHRpb25hbCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZSh0eXBlKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QZXJzb25hQ2FyZFRleHREaXJlY3RpdmUgPSBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmU7XG52YXIgUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlKCRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdeP3VpZlBlcnNvbmFDYXJkJztcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKGluc3RhbmNlRWxlbWVudCwgYWN0aW9uQXR0cnMpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlcikgJiYgYW5ndWxhci5pc1VuZGVmaW5lZChwbGFjZWhvbGRlckVudW1fMS5QbGFjZWhvbGRlckVudW1bYWN0aW9uQXR0cnMudWlmUGxhY2Vob2xkZXJdKSkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBlcnNvbmFjYXJkIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdcIicgKyBhY3Rpb25BdHRycy51aWZQbGFjZWhvbGRlciArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmUGxhY2Vob2xkZXIuIEl0IHNob3VsZCBiZSByZWd1bGFyLCB0b3ByaWdodCBvciBvdmVyZmxvdy4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtW2FjdGlvbkF0dHJzLnVpZlBsYWNlaG9sZGVyXSA9PT0gcGxhY2Vob2xkZXJFbnVtXzEuUGxhY2Vob2xkZXJFbnVtLm92ZXJmbG93KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8bGkgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1vdmVyZmxvd1wiIG5nLXRyYW5zY2x1ZGU+PC9saT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICc8bGkgY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1hY3Rpb25EZXRhaWxzXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoJGxvZykgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlKCRsb2cpOyB9O1xuICAgICAgICBkaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvZyddO1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuUGVyc29uYUNhcmRBY3Rpb25EaXJlY3RpdmUgPSBQZXJzb25hQ2FyZEFjdGlvbkRpcmVjdGl2ZTtcbnZhciBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1QZXJzb25hQ2FyZC1kZXRhaWxMYWJlbFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPic7XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGV0YWlsTGFiZWxEaXJlY3RpdmUgPSBQZXJzb25hQ2FyZERldGFpbExhYmVsRGlyZWN0aXZlO1xudmFyIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVBlcnNvbmFDYXJkLWRldGFpbExpbmVcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgfVxuICAgIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZSA9IFBlcnNvbmFDYXJkRGV0YWlsTGluZURpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMucGVyc29uYWNhcmQnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZCcsIFBlcnNvbmFDYXJkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZEFjdGlvbicsIFBlcnNvbmFDYXJkQWN0aW9uRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZERldGFpbExhYmVsJywgUGVyc29uYUNhcmREZXRhaWxMYWJlbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmREZXRhaWxMaW5lJywgUGVyc29uYUNhcmREZXRhaWxMaW5lRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFByaW1hcnlUZXh0JywgUGVyc29uYUNhcmRUZXh0RGlyZWN0aXZlLmZhY3RvcnkoJ3ByaW1hcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZFNlY29uZGFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgnc2Vjb25kYXJ5JykpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGVyc29uYUNhcmRUZXJ0aWFyeVRleHQnLCBQZXJzb25hQ2FyZFRleHREaXJlY3RpdmUuZmFjdG9yeSgndGVydGlhcnknKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZQZXJzb25hQ2FyZE9wdGlvbmFsVGV4dCcsIFBlcnNvbmFDYXJkVGV4dERpcmVjdGl2ZS5mYWN0b3J5KCcnKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BlcnNvbmFjYXJkRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQbGFjZWhvbGRlckVudW07XG4oZnVuY3Rpb24gKFBsYWNlaG9sZGVyRW51bSkge1xuICAgIFBsYWNlaG9sZGVyRW51bVtQbGFjZWhvbGRlckVudW1bXCJyZWd1bGFyXCJdID0gMF0gPSBcInJlZ3VsYXJcIjtcbiAgICBQbGFjZWhvbGRlckVudW1bUGxhY2Vob2xkZXJFbnVtW1widG9wcmlnaHRcIl0gPSAxXSA9IFwidG9wcmlnaHRcIjtcbiAgICBQbGFjZWhvbGRlckVudW1bUGxhY2Vob2xkZXJFbnVtW1wib3ZlcmZsb3dcIl0gPSAyXSA9IFwib3ZlcmZsb3dcIjtcbn0pKFBsYWNlaG9sZGVyRW51bSA9IGV4cG9ydHMuUGxhY2Vob2xkZXJFbnVtIHx8IChleHBvcnRzLlBsYWNlaG9sZGVyRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3BsYWNlaG9sZGVyRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUGVyc29uYVNpemU7XG4oZnVuY3Rpb24gKFBlcnNvbmFTaXplKSB7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJ4c21hbGxcIl0gPSAwXSA9IFwieHNtYWxsXCI7XG4gICAgUGVyc29uYVNpemVbUGVyc29uYVNpemVbXCJzbWFsbFwiXSA9IDFdID0gXCJzbWFsbFwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibWVkaXVtXCJdID0gMl0gPSBcIm1lZGl1bVwiO1xuICAgIFBlcnNvbmFTaXplW1BlcnNvbmFTaXplW1wibGFyZ2VcIl0gPSAzXSA9IFwibGFyZ2VcIjtcbiAgICBQZXJzb25hU2l6ZVtQZXJzb25hU2l6ZVtcInhsYXJnZVwiXSA9IDRdID0gXCJ4bGFyZ2VcIjtcbn0pKFBlcnNvbmFTaXplID0gZXhwb3J0cy5QZXJzb25hU2l6ZSB8fCAoZXhwb3J0cy5QZXJzb25hU2l6ZSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3BlcnNvbmFjYXJkL3NpemVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgcGl2b3RTaXplRW51bV8xID0gcmVxdWlyZShcIi4vcGl2b3RTaXplRW51bVwiKTtcbnZhciBwaXZvdFR5cGVFbnVtXzEgPSByZXF1aXJlKFwiLi9waXZvdFR5cGVFbnVtXCIpO1xudmFyIFBpdm90Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGl2b3RDb250cm9sbGVyKCRsb2csICRzY29wZSkge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgJHNjb3BlLnBpdm90Q2xpY2sgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICRzY29wZS51aWZQaXZvdHMuZm9yRWFjaChmdW5jdGlvbiAocGl2b3RJdGVtLCBwaXZvdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgcGl2b3RJdGVtLnNlbGVjdGVkID0gcGl2b3RJbmRleCA9PT0gaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKHBpdm90SXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudWlmU2VsZWN0ZWQgPSBwaXZvdEl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBQaXZvdENvbnRyb2xsZXI7XG59KCkpO1xuUGl2b3RDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnLCAnJHNjb3BlJ107XG5leHBvcnRzLlBpdm90Q29udHJvbGxlciA9IFBpdm90Q29udHJvbGxlcjtcbnZhciBQaXZvdEl0ZW0gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBpdm90SXRlbSh0aXRsZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuICAgIHJldHVybiBQaXZvdEl0ZW07XG59KCkpO1xuZXhwb3J0cy5QaXZvdEl0ZW0gPSBQaXZvdEl0ZW07XG52YXIgUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGxpIGNsYXNzPVwibXMtUGl2b3QtbGluayBtcy1QaXZvdC1saW5rLS1vdmVyZmxvd1wiPicgK1xuICAgICAgICAgICAgJzx1aWYtaWNvbiB1aWYtdHlwZT1cImVsbGlwc2lzXCIgY2xhc3M9XCJtcy1QaXZvdC1lbGxpcHNpc1wiPjwvdWlmLWljb24+JyArXG4gICAgICAgICAgICAnPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPicgK1xuICAgICAgICAgICAgJzwvbGk+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IGZhbHNlO1xuICAgIH1cbiAgICBQaXZvdEVsbGlwc2lzRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFBpdm90RWxsaXBzaXNEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5QaXZvdEVsbGlwc2lzRGlyZWN0aXZlID0gUGl2b3RFbGxpcHNpc0RpcmVjdGl2ZTtcbnZhciBQaXZvdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGl2b3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBQaXZvdENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsndWlmUGl2b3QnXTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dWwgY2xhc3M9XCJtcy1QaXZvdFwiIG5nLWNsYXNzPVwiZ2V0Q2xhc3NlcygpXCIgPicgK1xuICAgICAgICAgICAgJzxzcGFuIG5nLXJlcGVhdC1zdGFydD1cInBpdm90IGluIHVpZlBpdm90c1wiPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8bGkgY2xhc3M9XCJtcy1QaXZvdC1saW5rXCIgbmctY2xpY2s9XCJwaXZvdENsaWNrKCRpbmRleClcIiAnICtcbiAgICAgICAgICAgICduZy1jbGFzcz1cIntcXCdpcy1zZWxlY3RlZFxcJzogcGl2b3Quc2VsZWN0ZWR9XCI+e3twaXZvdC50aXRsZX19PC9saT4gJyArXG4gICAgICAgICAgICAnPHNwYW4gbmctcmVwZWF0LWVuZD48L3NwYW4+JyArXG4gICAgICAgICAgICAnPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPicgK1xuICAgICAgICAgICAgJzwvdWw+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHVpZlBpdm90czogJz0/JyxcbiAgICAgICAgICAgIHVpZlNlbGVjdGVkOiAnPT8nLFxuICAgICAgICAgICAgdWlmU2l6ZTogJ0AnLFxuICAgICAgICAgICAgdWlmVHlwZTogJ0AnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFBpdm90RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGl2b3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFBpdm90RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnRhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHZhciBwaXZvdENvbnRyb2xsZXIgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd1aWZTaXplJywgZnVuY3Rpb24gKG5ld1NpemUpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdTaXplKSAmJiBhbmd1bGFyLmlzVW5kZWZpbmVkKHBpdm90U2l6ZUVudW1fMS5QaXZvdFNpemVbbmV3U2l6ZV0pKSB7XG4gICAgICAgICAgICAgICAgcGl2b3RDb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBpdm90IC0gVW5zdXBwb3J0ZWQgc2l6ZTogJyArXG4gICAgICAgICAgICAgICAgICAgICdcIicgKyBuZXdTaXplICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB1aWZTaXplLiBJdCBzaG91bGQgYmUgcmVndWxhciBvciBsYXJnZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdUeXBlKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmV3VHlwZSkgJiYgYW5ndWxhci5pc1VuZGVmaW5lZChwaXZvdFR5cGVFbnVtXzEuUGl2b3RUeXBlW25ld1R5cGVdKSkge1xuICAgICAgICAgICAgICAgIHBpdm90Q29udHJvbGxlci4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5waXZvdCAtIFVuc3VwcG9ydGVkIHNpemU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCInICsgbmV3VHlwZSArICdcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdWlmVHlwZS4gSXQgc2hvdWxkIGJlIHJlZ3VsYXIgb3IgdGFicy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmU2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGl2b3RzLmZvckVhY2goZnVuY3Rpb24gKGN1cnJlbnRQaXZvdCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGl2b3Quc2VsZWN0ZWQgPSBjdXJyZW50UGl2b3QudGl0bGUgPT09IG5ld1ZhbHVlLnRpdGxlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZFBpdm90cyA9IHNjb3BlLnVpZlBpdm90cy5maWx0ZXIoZnVuY3Rpb24gKGN1cnJlbnRQaXZvdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFBpdm90LnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFBpdm90cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VsZWN0ZWRQaXZvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUGl2b3RzW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5nZXRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSAnJztcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gcGl2b3RUeXBlRW51bV8xLlBpdm90VHlwZVtzY29wZS51aWZUeXBlXSA9PT0gcGl2b3RUeXBlRW51bV8xLlBpdm90VHlwZS50YWJzID8gJ21zLVBpdm90LS10YWJzJyA6ICcnO1xuICAgICAgICAgICAgY2xhc3NlcyArPSBwaXZvdFNpemVFbnVtXzEuUGl2b3RTaXplW3Njb3BlLnVpZlNpemVdID09PSBwaXZvdFNpemVFbnVtXzEuUGl2b3RTaXplLmxhcmdlID8gJyBtcy1QaXZvdC0tbGFyZ2UnIDogJyc7XG4gICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBQaXZvdERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlBpdm90RGlyZWN0aXZlID0gUGl2b3REaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnBpdm90JywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmUGl2b3QnLCBQaXZvdERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmUGl2b3RFbGxpcHNpcycsIFBpdm90RWxsaXBzaXNEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGl2b3QvcGl2b3REaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBpdm90U2l6ZTtcbihmdW5jdGlvbiAoUGl2b3RTaXplKSB7XG4gICAgUGl2b3RTaXplW1Bpdm90U2l6ZVtcInJlZ3VsYXJcIl0gPSAwXSA9IFwicmVndWxhclwiO1xuICAgIFBpdm90U2l6ZVtQaXZvdFNpemVbXCJsYXJnZVwiXSA9IDFdID0gXCJsYXJnZVwiO1xufSkoUGl2b3RTaXplID0gZXhwb3J0cy5QaXZvdFNpemUgfHwgKGV4cG9ydHMuUGl2b3RTaXplID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGl2b3QvcGl2b3RTaXplRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUGl2b3RUeXBlO1xuKGZ1bmN0aW9uIChQaXZvdFR5cGUpIHtcbiAgICBQaXZvdFR5cGVbUGl2b3RUeXBlW1wicmVndWxhclwiXSA9IDBdID0gXCJyZWd1bGFyXCI7XG4gICAgUGl2b3RUeXBlW1Bpdm90VHlwZVtcInRhYnNcIl0gPSAxXSA9IFwidGFic1wiO1xufSkoUGl2b3RUeXBlID0gZXhwb3J0cy5QaXZvdFR5cGUgfHwgKGV4cG9ydHMuUGl2b3RUeXBlID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvcGl2b3QvcGl2b3RUeXBlRW51bS50c1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZShsb2cpIHtcbiAgICAgICAgdGhpcy5sb2cgPSBsb2c7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLWl0ZW1OYW1lXCI+e3t1aWZOYW1lfX08L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItaXRlbVByb2dyZXNzXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLXByb2dyZXNzVHJhY2tcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibXMtUHJvZ3Jlc3NJbmRpY2F0b3ItcHJvZ3Jlc3NCYXJcIiBuZy1zdHlsZT1cInt3aWR0aDogdWlmUGVyY2VudENvbXBsZXRlK1xcJyVcXCd9XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1zLVByb2dyZXNzSW5kaWNhdG9yLWl0ZW1EZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZEZXNjcmlwdGlvbjogJ0AnLFxuICAgICAgICAgICAgdWlmTmFtZTogJ0AnLFxuICAgICAgICAgICAgdWlmUGVyY2VudENvbXBsZXRlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmUubG9nID0gbG9nO1xuICAgIH1cbiAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKGxvZykgeyByZXR1cm4gbmV3IFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlKGxvZyk7IH07XG4gICAgICAgIGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9nJ107XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3VpZlBlcmNlbnRDb21wbGV0ZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSBudWxsIHx8IG5ld1ZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVpZlBlcmNlbnRDb21wbGV0ZSA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1BlcmNlbnRDb21wbGV0ZSA9IHBhcnNlRmxvYXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG5ld1BlcmNlbnRDb21wbGV0ZSkgfHwgbmV3UGVyY2VudENvbXBsZXRlIDwgMCB8fCBuZXdQZXJjZW50Q29tcGxldGUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5sb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnByb2dyZXNzaW5kaWNhdG9yIC0gJyArXG4gICAgICAgICAgICAgICAgICAgICdQZXJjZW50IGNvbXBsZXRlIG11c3QgYmUgYSB2YWxpZCBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMDAuJyk7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmUGVyY2VudENvbXBsZXRlID0gTWF0aC5tYXgoTWF0aC5taW4obmV3UGVyY2VudENvbXBsZXRlLCAxMDApLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUHJvZ3Jlc3NJbmRpY2F0b3JEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Qcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZSA9IFByb2dyZXNzSW5kaWNhdG9yRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5wcm9ncmVzc2luZGljYXRvcicsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmUHJvZ3Jlc3NJbmRpY2F0b3InLCBQcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9wcm9ncmVzc2luZGljYXRvci9wcm9ncmVzc0luZGljYXRvckRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIFNlYXJjaEJveERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VhcmNoQm94RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJtcy1TZWFyY2hCb3hcIiBuZy1jbGFzcz1cIntcXCdpcy1hY3RpdmVcXCc6aXNBY3RpdmUsIFxcJ2lzLWRpc2FibGVkXFwnOmlzRGlzYWJsZWR9XCI+JyArXG4gICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwibXMtU2VhcmNoQm94LWZpZWxkXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1ibHVyPVwiaW5wdXRCbHVyKClcIicgK1xuICAgICAgICAgICAgJyBuZy1tb2RlbD1cInZhbHVlXCIgbmctY2hhbmdlPVwiaW5wdXRDaGFuZ2UoKVwiIGlkPVwie3s6OlxcJ3NlYXJjaEJveF9cXCcrJGlkfX1cIiBuZy1kaXNhYmxlZD1cImlzRGlzYWJsZWRcIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBjbGFzcz1cIm1zLVNlYXJjaEJveC1sYWJlbFwiIGZvcj1cInt7OjpcXCdzZWFyY2hCb3hfXFwnKyRpZH19XCIgbmctaGlkZT1cImlzTGFiZWxIaWRkZW5cIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLVNlYXJjaEJveC1pY29uIG1zLUljb24gbXMtSWNvbi0tc2VhcmNoXCIgPjwvaT4ge3twbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwibXMtU2VhcmNoQm94LWNsb3NlQnV0dG9uXCIgbmctbW91c2Vkb3duPVwiYnRuTW91c2Vkb3duKClcIiB0eXBlPVwiYnV0dG9uXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXhcIj48L2k+PC9idXR0b24+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICc9PycsXG4gICAgICAgICAgICB2YWx1ZTogJz0/bmdNb2RlbCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU2VhcmNoQm94RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU2VhcmNoQm94RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBTZWFyY2hCb3hEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjb250cm9sbGVycykge1xuICAgICAgICB2YXIgbmdNb2RlbEN0cmw7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChjb250cm9sbGVycykgJiYgY29udHJvbGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbmdNb2RlbEN0cmwgPSBjb250cm9sbGVyc1swXTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5pc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaW5wdXRGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Q2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG5nTW9kZWxDdHJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldERpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Qmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5pc0NhbmNlbCkge1xuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsQ3RybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChzY29wZS52YWx1ZSkgPT09ICd1bmRlZmluZWQnIHx8IHNjb3BlLnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmlzRm9jdXMgPSBzY29wZS5pc0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5nTW9kZWxDdHJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuYnRuTW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuaXNDYW5jZWwgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3ZhbHVlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKCFzY29wZS5pc0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB2YWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY29wZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICBpZiAobmdNb2RlbEN0cmwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdwbGFjZWhvbGRlcicsIGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICAgICAgICAgIHNjb3BlLnBsYWNlaG9sZGVyID0gc2VhcmNoO1xuICAgICAgICB9KTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2Rpc2FibGVkJywgZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBzY29wZS5pc0Rpc2FibGVkID0gISFkaXNhYmxlZDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2VhcmNoQm94RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuU2VhcmNoQm94RGlyZWN0aXZlID0gU2VhcmNoQm94RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5zZWFyY2hib3gnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZTZWFyY2hib3gnLCBTZWFyY2hCb3hEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvc2VhcmNoYm94L3NlYXJjaGJveERpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xudmFyIHNwaW5uZXJTaXplRW51bV8xID0gcmVxdWlyZShcIi4vc3Bpbm5lclNpemVFbnVtXCIpO1xudmFyIFNwaW5uZXJEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwaW5uZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1zLVNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBTcGlubmVyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgICduZ1Nob3cnOiAnPScsXG4gICAgICAgICAgICAndWlmU2l6ZSc6ICdAJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3Bpbm5lckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU3Bpbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpZlNpemUpKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZVthdHRycy51aWZTaXplXSkpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNwaW5uZXIgLSBVbnN1cHBvcnRlZCBzaXplOiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1NwaW5uZXIgc2l6ZSAoXFwnJyArIGF0dHJzLnVpZlNpemUgKyAnXFwnKSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBPZmZpY2UgVUkgRmFicmljLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW2F0dHJzLnVpZlNpemVdID09PSBzcGlubmVyU2l6ZUVudW1fMS5TcGlubmVyU2l6ZS5sYXJnZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnbXMtU3Bpbm5lci0tbGFyZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMubmdTaG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnbmdTaG93JywgZnVuY3Rpb24gKG5ld1Zpc2libGUsIG9sZFZpc2libGUsIHNwaW5uZXJTY29wZSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwaW5uZXJTY29wZS5zdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lclNjb3BlLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgJHRyYW5zY2x1ZGUoZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICBpZiAoY2xvbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ21zLVNwaW5uZXItbGFiZWwnKS5hcHBlbmQoY2xvbmUpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5pbml0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gU3Bpbm5lckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlNwaW5uZXJEaXJlY3RpdmUgPSBTcGlubmVyRGlyZWN0aXZlO1xudmFyIFNwaW5uZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGlubmVyQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkaW50ZXJ2YWwsICRsb2cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kaW50ZXJ2YWwgPSAkaW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuX29mZnNldFNpemUgPSAwLjE3OTtcbiAgICAgICAgdGhpcy5fbnVtQ2lyY2xlcyA9IDg7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblNwZWVkID0gOTA7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMgPSBbXTtcbiAgICAgICAgJHNjb3BlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fcGFyZW50U2l6ZSA9IHNwaW5uZXJTaXplRW51bV8xLlNwaW5uZXJTaXplW190aGlzLiRzY29wZS51aWZTaXplXSA9PT0gc3Bpbm5lclNpemVFbnVtXzEuU3Bpbm5lclNpemUubGFyZ2UgPyAyOCA6IDIwO1xuICAgICAgICAgICAgX3RoaXMuY3JlYXRlQ2lyY2xlc0FuZEFycmFuZ2UoKTtcbiAgICAgICAgICAgIF90aGlzLnNldEluaXRpYWxPcGFjaXR5KCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9hbmltYXRpb25JbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBfdGhpcy5fY2lyY2xlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWRlQ2lyY2xlKF90aGlzLl9jaXJjbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBfdGhpcy5fYW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoX3RoaXMuX2FuaW1hdGlvbkludGVydmFsKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZXNBbmRBcnJhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5nbGUgPSAwO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fcGFyZW50U2l6ZSAqIHRoaXMuX29mZnNldFNpemU7XG4gICAgICAgIHZhciBzdGVwID0gKDIgKiBNYXRoLlBJKSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHZhciBpID0gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdmFyIHJhZGl1cyA9ICh0aGlzLl9wYXJlbnRTaXplIC0gb2Zmc2V0KSAqIDAuNTtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IHRoaXMuY3JlYXRlQ2lyY2xlKCk7XG4gICAgICAgICAgICB2YXIgeCA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRXaWR0aCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGgucm91bmQodGhpcy5fcGFyZW50U2l6ZSAqIDAuNSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRIZWlnaHQgKiAwLjUpIC0gb2Zmc2V0ICogMC41O1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY2lyY2xlKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ2xlZnQnLCAoeCArICdweCcpKTtcbiAgICAgICAgICAgIGNpcmNsZS5jc3MoJ3RvcCcsICh5ICsgJ3B4JykpO1xuICAgICAgICAgICAgYW5nbGUgKz0gc3RlcDtcbiAgICAgICAgICAgIHZhciBjaXJjbGVPYmplY3QgPSBuZXcgQ2lyY2xlT2JqZWN0KGNpcmNsZSwgaSk7XG4gICAgICAgICAgICB0aGlzLl9jaXJjbGVzLnB1c2goY2lyY2xlT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUNpcmNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNpcmNsZSA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIGRvdFNpemUgPSAodGhpcy5fcGFyZW50U2l6ZSAqIHRoaXMuX29mZnNldFNpemUpICsgJ3B4JztcbiAgICAgICAgY2lyY2xlLmFkZENsYXNzKCdtcy1TcGlubmVyLWNpcmNsZScpLmNzcygnd2lkdGgnLCBkb3RTaXplKS5jc3MoJ2hlaWdodCcsIGRvdFNpemUpO1xuICAgICAgICByZXR1cm4gY2lyY2xlO1xuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLnNldEluaXRpYWxPcGFjaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3BjYWl0eVRvU2V0O1xuICAgICAgICB0aGlzLl9mYWRlSW5jcmVtZW50ID0gMSAvIHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoY2lyY2xlLCBpbmRleCkge1xuICAgICAgICAgICAgb3BjYWl0eVRvU2V0ID0gKF90aGlzLl9mYWRlSW5jcmVtZW50ICogKGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgY2lyY2xlLm9wYWNpdHkgPSBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3Bpbm5lckNvbnRyb2xsZXIucHJvdG90eXBlLmZhZGVDaXJjbGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHZhciBuZXdPcGFjaXR5ID0gY2lyY2xlLm9wYWNpdHkgLSB0aGlzLl9mYWRlSW5jcmVtZW50O1xuICAgICAgICBpZiAobmV3T3BhY2l0eSA8PSAwKSB7XG4gICAgICAgICAgICBuZXdPcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG5ld09wYWNpdHk7XG4gICAgfTtcbiAgICByZXR1cm4gU3Bpbm5lckNvbnRyb2xsZXI7XG59KCkpO1xuU3Bpbm5lckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRpbnRlcnZhbCcsICckbG9nJ107XG52YXIgQ2lyY2xlT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaXJjbGVPYmplY3QoY2lyY2xlRWxlbWVudCwgY2lyY2xlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50ID0gY2lyY2xlRWxlbWVudDtcbiAgICAgICAgdGhpcy5jaXJjbGVJbmRleCA9IGNpcmNsZUluZGV4O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2lyY2xlT2JqZWN0LnByb3RvdHlwZSwgXCJvcGFjaXR5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKyh0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5JykpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLmNpcmNsZUVsZW1lbnQuY3NzKCdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBDaXJjbGVPYmplY3Q7XG59KCkpO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5zcGlubmVyJywgWydvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ10pXG4gICAgLmRpcmVjdGl2ZSgndWlmU3Bpbm5lcicsIFNwaW5uZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlLnRzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTcGlubmVyU2l6ZTtcbihmdW5jdGlvbiAoU3Bpbm5lclNpemUpIHtcbiAgICBTcGlubmVyU2l6ZVtTcGlubmVyU2l6ZVtcInNtYWxsXCJdID0gMF0gPSBcInNtYWxsXCI7XG4gICAgU3Bpbm5lclNpemVbU3Bpbm5lclNpemVbXCJsYXJnZVwiXSA9IDFdID0gXCJsYXJnZVwiO1xufSkoU3Bpbm5lclNpemUgPSBleHBvcnRzLlNwaW5uZXJTaXplIHx8IChleHBvcnRzLlNwaW5uZXJTaXplID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyU2l6ZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEgPSByZXF1aXJlKFwiLi90YWJsZVJvd1NlbGVjdE1vZGVFbnVtXCIpO1xudmFyIHRhYmxlVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL3RhYmxlVHlwZUVudW1cIik7XG52YXIgVGFibGVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRzY29wZS5vcmRlckJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gW107XG4gICAgICAgIGlmICghdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcIm9yZGVyQnlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckJ5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckFzY1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm9yZGVyQXNjO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcmRlckFzYykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSBvcmRlckFzYztcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwicm93U2VsZWN0TW9kZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnJvd1NlbGVjdE1vZGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHJvd1NlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVtyb3dTZWxlY3RNb2RlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdFcnJvciBbbmdPZmZpY2VVaUZhYnJpY10gb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdcXCcnICsgcm93U2VsZWN0TW9kZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtcm93LXNlbGVjdC1tb2RlXFwnLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbGlkIG9wdGlvbnMgYXJlIG5vbmV8c2luZ2xlfG11bHRpcGxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucm93U2VsZWN0TW9kZSA9IHJvd1NlbGVjdE1vZGU7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcInJvd3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5yb3dzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb3dzKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yb3dzID0gcm93cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhYmxlQ29udHJvbGxlci5wcm90b3R5cGUsIFwic2VsZWN0ZWRJdGVtc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLnNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBUYWJsZUNvbnRyb2xsZXI7XG59KCkpO1xuVGFibGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9nJ107XG52YXIgVGFibGVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0YWJsZSBuZy1jbGFzcz1cIltcXCdtcy1UYWJsZVxcJywgdGFibGVUeXBlQ2xhc3NdXCIgbmctdHJhbnNjbHVkZT48L3RhYmxlPic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndGFibGUnO1xuICAgIH1cbiAgICBUYWJsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICBpZiAoYXR0cnMudWlmU2VsZWN0ZWRJdGVtcyAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlNlbGVjdGVkSXRlbXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEl0ZW1zID0gbnVsbDtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBzY29wZS4kZXZhbChhdHRycy51aWZTZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zID09PSB1bmRlZmluZWQgfHwgc2VsZWN0ZWRJdGVtcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy51aWZSb3dTZWxlY3RNb2RlICE9PSB1bmRlZmluZWQgJiYgYXR0cnMudWlmUm93U2VsZWN0TW9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW2F0dHJzLnVpZlJvd1NlbGVjdE1vZGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZSb3dTZWxlY3RNb2RlICsgJ1xcJyBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFxcJ3VpZi1yb3ctc2VsZWN0LW1vZGVcXCcuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVmFsaWQgb3B0aW9ucyBhcmUgbm9uZXxzaW5nbGV8bXVsdGlwbGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gYXR0cnMudWlmUm93U2VsZWN0TW9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUucm93U2VsZWN0TW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY29wZS5yb3dTZWxlY3RNb2RlID0gdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW1bdGFibGVSb3dTZWxlY3RNb2RlRW51bV8xLlRhYmxlUm93U2VsZWN0TW9kZUVudW0ubm9uZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzLnVpZlRhYmxlVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW2F0dHJzLnVpZlRhYmxlVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJGxvZy5lcnJvcignRXJyb3IgW25nT2ZmaWNlVWlGYWJyaWNdIG9mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUuICcgK1xuICAgICAgICAgICAgICAgICAgICAnXFwnJyArIGF0dHJzLnVpZlRhYmxlVHlwZSArICdcXCcgaXMgbm90IGEgdmFsaWQgb3B0aW9uIGZvciBcXCd1aWYtdGFibGUtdHlwZVxcJy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSBmaXhlZHxmbHVpZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IGF0dHJzLnVpZlRhYmxlVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZSA9IHRhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtW3RhYmxlVHlwZUVudW1fMS5UYWJsZVR5cGVFbnVtLmZsdWlkXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudGFibGVUeXBlID09PSB0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bVt0YWJsZVR5cGVFbnVtXzEuVGFibGVUeXBlRW51bS5maXhlZF0pIHtcbiAgICAgICAgICAgIHNjb3BlLnRhYmxlVHlwZUNsYXNzID0gJ21zLVRhYmxlLS1maXhlZCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZURpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlRGlyZWN0aXZlID0gVGFibGVEaXJlY3RpdmU7XG52YXIgVGFibGVSb3dDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVSb3dDb250cm9sbGVyLnByb3RvdHlwZSwgXCJpdGVtXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuaXRlbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZVJvd0NvbnRyb2xsZXIucHJvdG90eXBlLCBcInNlbGVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGUuc2VsZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gVGFibGVSb3dDb250cm9sbGVyO1xufSgpKTtcblRhYmxlUm93Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvZyddO1xudmFyIFRhYmxlUm93RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dHIgbmctdHJhbnNjbHVkZT48L3RyPic7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmVGFibGUnO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgaXRlbTogJz11aWZJdGVtJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBUYWJsZVJvd0NvbnRyb2xsZXI7XG4gICAgfVxuICAgIFRhYmxlUm93RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVSb3dEaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIFRhYmxlUm93RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCB0YWJsZSkge1xuICAgICAgICBpZiAoYXR0cnMudWlmU2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgYXR0cnMudWlmU2VsZWN0ZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFN0cmluZyA9IGF0dHJzLnVpZlNlbGVjdGVkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdHJpbmcgIT09ICd0cnVlJyAmJiBzZWxlY3RlZFN0cmluZyAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgIHRhYmxlLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRhYmxlLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1xcJycgKyBhdHRycy51aWZTZWxlY3RlZCArICdcXCcgaXMgbm90IGEgdmFsaWQgYm9vbGVhbiB2YWx1ZS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdWYWxpZCBvcHRpb25zIGFyZSB0cnVlfGZhbHNlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0YWJsZS5yb3dzLnB1c2goc2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnJvd0NsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9ICFzY29wZS5zZWxlY3RlZDtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgdGFibGVSb3dTY29wZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd1NlbGVjdE1vZGUgPT09IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLnNpbmdsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzW2ldICE9PSB0YWJsZVJvd1Njb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnJvd3NbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZWxlY3RlZEl0ZW1zLnNwbGljZSgwLCB0YWJsZS5zZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUuc2VsZWN0ZWRJdGVtcy5wdXNoKHRhYmxlUm93U2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1BbHJlYWR5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmxlLnNlbGVjdGVkSXRlbXNbaV0gPT09IHRhYmxlUm93U2NvcGUuaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUFscmVhZHlTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW1BbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGUuc2VsZWN0ZWRJdGVtcy5wdXNoKHRhYmxlUm93U2NvcGUuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUuc2VsZWN0ZWRJdGVtc1tpXSA9PT0gdGFibGVSb3dTY29wZS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZWxlY3RlZEl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlICE9PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSAmJlxuICAgICAgICAgICAgc2NvcGUuaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93Q2xpY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWJsZS5yb3dTZWxlY3RNb2RlID09PSB0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bVt0YWJsZVJvd1NlbGVjdE1vZGVFbnVtXzEuVGFibGVSb3dTZWxlY3RNb2RlRW51bS5ub25lXSkge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dEaXJlY3RpdmUgPSBUYWJsZVJvd0RpcmVjdGl2ZTtcbnZhciBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRkIGNsYXNzPVwibXMtVGFibGUtcm93Q2hlY2tcIj48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9IFsnXnVpZlRhYmxlJywgJz9edWlmVGFibGVIZWFkJywgJ151aWZUYWJsZVJvdyddO1xuICAgIH1cbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY29udHJvbGxlcnMpIHtcbiAgICAgICAgdmFyIHRoZWFkID0gY29udHJvbGxlcnNbMV07XG4gICAgICAgIGlmICh0aGVhZCkge1xuICAgICAgICAgICAgdmFyIG5ld0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzx0aCBjbGFzcz1cIm1zLVRhYmxlLXJvd0NoZWNrXCI+PC90aD4nKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5yZXBsYWNlV2l0aChuZXdFbGVtKTtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudCA9IG5ld0VsZW07XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucm93U2VsZWN0Q2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciB0YWJsZSA9IGNvbnRyb2xsZXJzWzBdO1xuICAgICAgICAgICAgdmFyIHJvdyA9IGNvbnRyb2xsZXJzWzJdO1xuICAgICAgICAgICAgaWYgKHRhYmxlLnJvd1NlbGVjdE1vZGUgIT09IHRhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtW3RhYmxlUm93U2VsZWN0TW9kZUVudW1fMS5UYWJsZVJvd1NlbGVjdE1vZGVFbnVtLm11bHRpcGxlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb3cuaXRlbSA9PT0gdW5kZWZpbmVkIHx8IHJvdy5pdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNob3VsZFNlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkU2VsZWN0QWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFibGUucm93c1tpXS5zZWxlY3RlZCAhPT0gc2hvdWxkU2VsZWN0QWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5yb3dzW2ldLnNlbGVjdGVkID0gc2hvdWxkU2VsZWN0QWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUucm93U2VsZWN0Q2xpY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVSb3dTZWxlY3REaXJlY3RpdmUgPSBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZTtcbnZhciBUYWJsZUNlbGxEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQ2VsbERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8dGQgbmctdHJhbnNjbHVkZT48L3RkPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlQ2VsbERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlQ2VsbERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlQ2VsbERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlQ2VsbERpcmVjdGl2ZSA9IFRhYmxlQ2VsbERpcmVjdGl2ZTtcbnZhciBUYWJsZUhlYWRlckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVIZWFkZXJEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHRoIG5nLXRyYW5zY2x1ZGU+PC90aD4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICB9XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIHNjb3BlLmhlYWRlckNsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAodGFibGUub3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gIXRhYmxlLm9yZGVyQXNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJCeSA9IGF0dHJzLnVpZk9yZGVyQnk7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQnknLCBmdW5jdGlvbiAobmV3T3JkZXJCeSwgb2xkT3JkZXJCeSwgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKG9sZE9yZGVyQnkgIT09IG5ld09yZGVyQnkgJiZcbiAgICAgICAgICAgICAgICBuZXdPcmRlckJ5ID09PSBhdHRycy51aWZPcmRlckJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2NoaWxkcmVuID0gY2VsbHMuZXEoaSkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3NvcnRlciA9IF9jaGlsZHJlbi5lcShfY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3NvcnRlci5oYXNDbGFzcygndWlmLXNvcnQtb3JkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zb3J0ZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ1aWYtc29ydC1vcmRlclwiPiZuYnNwO1xcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQXNjJywgZnVuY3Rpb24gKG5ld09yZGVyQXNjLCBvbGRPcmRlckFzYywgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgX3NvcnRlciA9IGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmVxKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmIChfc29ydGVyLmhhc0NsYXNzKCd1aWYtc29ydC1vcmRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRDc3NDbGFzcyA9IG9sZE9yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDc3NDbGFzcyA9IG5ld09yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgICAgIF9zb3J0ZXIuY2hpbGRyZW4oKS5lcSgwKS5yZW1vdmVDbGFzcyhvbGRDc3NDbGFzcykuYWRkQ2xhc3MobmV3Q3NzQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICgndWlmT3JkZXJCeScgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIGluc3RhbmNlRWxlbWVudC5vbignY2xpY2snLCBzY29wZS5oZWFkZXJDbGljayk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUYWJsZUhlYWRlckRpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyRGlyZWN0aXZlID0gVGFibGVIZWFkZXJEaXJlY3RpdmU7XG52YXIgVGFibGVIZWFkQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVIZWFkQ29udHJvbGxlcigpIHtcbiAgICB9XG4gICAgcmV0dXJuIFRhYmxlSGVhZENvbnRyb2xsZXI7XG59KCkpO1xudmFyIFRhYmxlSGVhZERpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVIZWFkRGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0aGVhZCBuZy10cmFuc2NsdWRlPjwvdGhlYWQ+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGFibGVIZWFkQ29udHJvbGxlcjtcbiAgICB9XG4gICAgVGFibGVIZWFkRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVIZWFkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVIZWFkRGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVIZWFkRGlyZWN0aXZlID0gVGFibGVIZWFkRGlyZWN0aXZlO1xudmFyIFRhYmxlQm9keURpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFibGVCb2R5RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gJzx0Ym9keSBuZy10cmFuc2NsdWRlPjwvdGJvZHk+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICB9XG4gICAgVGFibGVCb2R5RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVCb2R5RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVCb2R5RGlyZWN0aXZlO1xufSgpKTtcbmV4cG9ydHMuVGFibGVCb2R5RGlyZWN0aXZlID0gVGFibGVCb2R5RGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50YWJsZScsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlJywgVGFibGVEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlUm93JywgVGFibGVSb3dEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlUm93U2VsZWN0JywgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlQ2VsbCcsIFRhYmxlQ2VsbERpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVIZWFkZXInLCBUYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmVGFibGVIZWFkJywgVGFibGVIZWFkRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUJvZHknLCBUYWJsZUJvZHlEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGVEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFRhYmxlUm93U2VsZWN0TW9kZUVudW07XG4oZnVuY3Rpb24gKFRhYmxlUm93U2VsZWN0TW9kZUVudW0pIHtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJub25lXCJdID0gMF0gPSBcIm5vbmVcIjtcbiAgICBUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1RhYmxlUm93U2VsZWN0TW9kZUVudW1bXCJzaW5nbGVcIl0gPSAxXSA9IFwic2luZ2xlXCI7XG4gICAgVGFibGVSb3dTZWxlY3RNb2RlRW51bVtUYWJsZVJvd1NlbGVjdE1vZGVFbnVtW1wibXVsdGlwbGVcIl0gPSAyXSA9IFwibXVsdGlwbGVcIjtcbn0pKFRhYmxlUm93U2VsZWN0TW9kZUVudW0gPSBleHBvcnRzLlRhYmxlUm93U2VsZWN0TW9kZUVudW0gfHwgKGV4cG9ydHMuVGFibGVSb3dTZWxlY3RNb2RlRW51bSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlUm93U2VsZWN0TW9kZUVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFRhYmxlVHlwZUVudW07XG4oZnVuY3Rpb24gKFRhYmxlVHlwZUVudW0pIHtcbiAgICBUYWJsZVR5cGVFbnVtW1RhYmxlVHlwZUVudW1bXCJmbHVpZFwiXSA9IDBdID0gXCJmbHVpZFwiO1xuICAgIFRhYmxlVHlwZUVudW1bVGFibGVUeXBlRW51bVtcImZpeGVkXCJdID0gMV0gPSBcImZpeGVkXCI7XG59KShUYWJsZVR5cGVFbnVtID0gZXhwb3J0cy5UYWJsZVR5cGVFbnVtIHx8IChleHBvcnRzLlRhYmxlVHlwZUVudW0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZVR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgdWlmVHlwZUVudW1fMSA9IHJlcXVpcmUoXCIuL3VpZlR5cGVFbnVtXCIpO1xudmFyIFRleHRGaWVsZENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRGaWVsZENvbnRyb2xsZXIoJGxvZykge1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIH1cbiAgICByZXR1cm4gVGV4dEZpZWxkQ29udHJvbGxlcjtcbn0oKSk7XG5UZXh0RmllbGRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcbnZhciBUZXh0RmllbGREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRGaWVsZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gVGV4dEZpZWxkQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwie1xcJ2lzLWFjdGl2ZVxcJzogaXNBY3RpdmUsIFxcJ21zLVRleHRGaWVsZFxcJzogdHJ1ZSwgJyArXG4gICAgICAgICAgICAnXFwnbXMtVGV4dEZpZWxkLS11bmRlcmxpbmVkXFwnOiB1aWZVbmRlcmxpbmVkLCBcXCdtcy1UZXh0RmllbGQtLXBsYWNlaG9sZGVyXFwnOiBwbGFjZWhvbGRlciwgJyArXG4gICAgICAgICAgICAnXFwnaXMtcmVxdWlyZWRcXCc6IHJlcXVpcmVkLCBcXCdpcy1kaXNhYmxlZFxcJzogZGlzYWJsZWQsIFxcJ21zLVRleHRGaWVsZC0tbXVsdGlsaW5lXFwnIDogdWlmTXVsdGlsaW5lIH1cIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgbmctc2hvdz1cImxhYmVsU2hvd25cIiBjbGFzcz1cIm1zLUxhYmVsXCIgbmctY2xpY2s9XCJsYWJlbENsaWNrKClcIj57e3VpZkxhYmVsIHx8IHBsYWNlaG9sZGVyfX08L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBuZy1tb2RlbD1cIm5nTW9kZWxcIiBuZy1jaGFuZ2U9XCJpbnB1dENoYW5nZSgpXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiICcgK1xuICAgICAgICAgICAgJ2NsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgbmctc2hvdz1cIiF1aWZNdWx0aWxpbmVcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVkXCIgdHlwZT1cInt7dWlmVHlwZX19XCInICtcbiAgICAgICAgICAgICdtaW49XCJ7e21pbn19XCIgbWF4PVwie3ttYXh9fVwiIHN0ZXA9XCJ7e3N0ZXB9fVwiIC8+JyArXG4gICAgICAgICAgICAnPHRleHRhcmVhIG5nLW1vZGVsPVwibmdNb2RlbFwiIG5nLWJsdXI9XCJpbnB1dEJsdXIoKVwiIG5nLWZvY3VzPVwiaW5wdXRGb2N1cygpXCIgbmctY2xpY2s9XCJpbnB1dENsaWNrKClcIiAnICtcbiAgICAgICAgICAgICdjbGFzcz1cIm1zLVRleHRGaWVsZC1maWVsZFwiIG5nLXNob3c9XCJ1aWZNdWx0aWxpbmVcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVkXCI+PC90ZXh0YXJlYT4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRleHRGaWVsZC1kZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbWF4OiAnQCcsXG4gICAgICAgICAgICBtaW46ICdAJyxcbiAgICAgICAgICAgIG5nQ2hhbmdlOiAnPT8nLFxuICAgICAgICAgICAgbmdNb2RlbDogJz0/JyxcbiAgICAgICAgICAgIG5nUmVxdWlyZWQ6ICc8PycsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICAgICAgc3RlcDogJ0AnLFxuICAgICAgICAgICAgdWlmRGVzY3JpcHRpb246ICdAJyxcbiAgICAgICAgICAgIHVpZkxhYmVsOiAnQCcsXG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZUZXh0ZmllbGQnLCAnP25nTW9kZWwnXTtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICB9XG4gICAgVGV4dEZpZWxkRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGV4dEZpZWxkRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUZXh0RmllbGREaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHZhciBjb250cm9sbGVyID0gY29udHJvbGxlcnNbMF07XG4gICAgICAgIHZhciBuZ01vZGVsID0gY29udHJvbGxlcnNbMV07XG4gICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycztcbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluc3RhbmNlRWxlbWVudC5hdHRyKCdkaXNhYmxlZCcpOyB9LCAoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHNjb3BlLmRpc2FibGVkID0gdHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJzsgfSkpO1xuICAgICAgICBzY29wZS5sYWJlbFNob3duID0gdHJ1ZTtcbiAgICAgICAgc2NvcGUucmVxdWlyZWQgPSAncmVxdWlyZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS51aWZNdWx0aWxpbmUgPSBhdHRycy51aWZNdWx0aWxpbmUgPT09ICd0cnVlJztcbiAgICAgICAgc2NvcGUudWlmVHlwZSA9IGF0dHJzLnVpZlR5cGU7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgndWlmVHlwZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVpZlR5cGVFbnVtXzEuSW5wdXRUeXBlRW51bVtuZXdWYWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRsb2cuZXJyb3IoJ0Vycm9yIFtuZ09mZmljZVVpRmFicmljXSBvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRleHRmaWVsZCAtIFVuc3VwcG9ydGVkIHR5cGU6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1RoZSB0eXBlIChcXCcnICsgc2NvcGUudWlmVHlwZSArICdcXCcpIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIE9mZmljZSBVSSBGYWJyaWMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1N1cHBvcnRlZCBvcHRpb25zIGFyZSBsaXN0ZWQgaGVyZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25nT2ZmaWNlVUlGYWJyaWMvbmctb2ZmaWNldWlmYWJyaWMvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudWlmVHlwZSA9IHVpZlR5cGVFbnVtXzEuSW5wdXRUeXBlRW51bS50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCduZ1JlcXVpcmVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNjb3BlLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS51aWZVbmRlcmxpbmVkID0gJ3VpZlVuZGVybGluZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS5pbnB1dEZvY3VzID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFNob3duID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Qmx1ciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gaW5zdGFuY2VFbGVtZW50LmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIgJiYgaW5wdXQudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5nTW9kZWwpICYmIG5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUubGFiZWxDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKHNjb3BlLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gc2NvcGUudWlmTXVsdGlsaW5lID8gaW5zdGFuY2VFbGVtZW50LmZpbmQoJ3RleHRhcmVhJylcbiAgICAgICAgICAgICAgICAgICAgOiBpbnN0YW5jZUVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBpbnB1dFswXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5pbnB1dENoYW5nZSA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5nTW9kZWwpICYmIG5nTW9kZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldERpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChuZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9ICFuZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRleHRGaWVsZERpcmVjdGl2ZTtcbn0oKSk7XG5leHBvcnRzLlRleHRGaWVsZERpcmVjdGl2ZSA9IFRleHRGaWVsZERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGV4dGZpZWxkJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUZXh0ZmllbGQnLCBUZXh0RmllbGREaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSW5wdXRUeXBlRW51bTtcbihmdW5jdGlvbiAoSW5wdXRUeXBlRW51bSkge1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInRleHRcIl0gPSAwXSA9IFwidGV4dFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInBhc3N3b3JkXCJdID0gMV0gPSBcInBhc3N3b3JkXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wiZW1haWxcIl0gPSAyXSA9IFwiZW1haWxcIjtcbiAgICBJbnB1dFR5cGVFbnVtW0lucHV0VHlwZUVudW1bXCJ1cmxcIl0gPSAzXSA9IFwidXJsXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1widGVsXCJdID0gNF0gPSBcInRlbFwiO1xuICAgIElucHV0VHlwZUVudW1bSW5wdXRUeXBlRW51bVtcInJhbmdlXCJdID0gNV0gPSBcInJhbmdlXCI7XG4gICAgSW5wdXRUeXBlRW51bVtJbnB1dFR5cGVFbnVtW1wibnVtYmVyXCJdID0gNl0gPSBcIm51bWJlclwiO1xufSkoSW5wdXRUeXBlRW51bSA9IGV4cG9ydHMuSW5wdXRUeXBlRW51bSB8fCAoZXhwb3J0cy5JbnB1dFR5cGVFbnVtID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3VpZlR5cGVFbnVtLnRzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG52YXIgVG9nZ2xlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb2dnbGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cIltcXCdtcy1Ub2dnbGVcXCcsIHRleHRMb2NhdGlvbiwge1xcJ2lzLWRpc2FibGVkXFwnOiBkaXNhYmxlZH1dXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1Ub2dnbGUtZGVzY3JpcHRpb25cIj48bmctdHJhbnNjbHVkZS8+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtVG9nZ2xlLWlucHV0XCIgJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctY2hhbmdlPVwiY2hlY2tib3hDaGFuZ2UoKTtuZ0NoYW5nZSgpXCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZFwiICcgK1xuICAgICAgICAgICAgJ25nLWF0dHItbmctdHJ1ZS12YWx1ZT1cInt7bmdUcnVlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiBuZy1hdHRyLW5nLWZhbHNlLXZhbHVlPVwie3tuZ0ZhbHNlVmFsdWUgfHwgdW5kZWZpbmVkfX1cIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ7ezo6JGlkfX1cIiBjbGFzcz1cIm1zLVRvZ2dsZS1maWVsZFwiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibXMtTGFiZWwgbXMtTGFiZWwtLW9mZlwiPnt7dWlmTGFiZWxPZmZ9fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vblwiPnt7dWlmTGFiZWxPbn19PC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdDaGFuZ2U6ICcmPycsXG4gICAgICAgICAgICBuZ0ZhbHNlVmFsdWU6ICdAPycsXG4gICAgICAgICAgICBuZ01vZGVsOiAnPT8nLFxuICAgICAgICAgICAgbmdUcnVlVmFsdWU6ICdAPycsXG4gICAgICAgICAgICB1aWZMYWJlbE9mZjogJ0AnLFxuICAgICAgICAgICAgdWlmTGFiZWxPbjogJ0AnLFxuICAgICAgICAgICAgdWlmVGV4dExvY2F0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgVG9nZ2xlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVG9nZ2xlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUb2dnbGVEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJscykge1xuICAgICAgICB2YXIgbmdNb2RlbEN0cmw7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChjdHJscykgJiYgY3RybHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbmdNb2RlbEN0cmwgPSBjdHJsc1swXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUudWlmVGV4dExvY2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbG9jID0gc2NvcGUudWlmVGV4dExvY2F0aW9uO1xuICAgICAgICAgICAgbG9jID0gbG9jLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbG9jLnNsaWNlKDEpO1xuICAgICAgICAgICAgc2NvcGUudGV4dExvY2F0aW9uID0gJyBtcy1Ub2dnbGUtLXRleHQnICsgbG9jO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtLmF0dHIoJ2Rpc2FibGVkJyk7IH0sIChmdW5jdGlvbiAobmV3VmFsdWUpIHsgc2NvcGUuZGlzYWJsZWQgPSB0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnOyB9KSk7XG4gICAgICAgIHNjb3BlLmRpc2FibGVkID0gJ2Rpc2FibGVkJyBpbiBhdHRycztcbiAgICAgICAgc2NvcGUuY2hlY2tib3hDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmdNb2RlbEN0cmwpICYmIG5nTW9kZWxDdHJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldERpcnR5KCk7XG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBUb2dnbGVEaXJlY3RpdmU7XG59KCkpO1xuZXhwb3J0cy5Ub2dnbGVEaXJlY3RpdmUgPSBUb2dnbGVEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRvZ2dsZScsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmVG9nZ2xlJywgVG9nZ2xlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBlcnNvbmFJbml0aWFsc0NvbG9yO1xuKGZ1bmN0aW9uIChQZXJzb25hSW5pdGlhbHNDb2xvcikge1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wibGlnaHRCbHVlXCJdID0gMF0gPSBcImxpZ2h0Qmx1ZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wiYmx1ZVwiXSA9IDFdID0gXCJibHVlXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJkYXJrQmx1ZVwiXSA9IDJdID0gXCJkYXJrQmx1ZVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1widGVhbFwiXSA9IDNdID0gXCJ0ZWFsXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodEdyZWVuXCJdID0gNF0gPSBcImxpZ2h0R3JlZW5cIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImdyZWVuXCJdID0gNV0gPSBcImdyZWVuXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJkYXJrR3JlZW5cIl0gPSA2XSA9IFwiZGFya0dyZWVuXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJsaWdodFBpbmtcIl0gPSA3XSA9IFwibGlnaHRQaW5rXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJwaW5rXCJdID0gOF0gPSBcInBpbmtcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcIm1hZ2VudGFcIl0gPSA5XSA9IFwibWFnZW50YVwiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wicHVycGxlXCJdID0gMTBdID0gXCJwdXJwbGVcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcImJsYWNrXCJdID0gMTFdID0gXCJibGFja1wiO1xuICAgIFBlcnNvbmFJbml0aWFsc0NvbG9yW1BlcnNvbmFJbml0aWFsc0NvbG9yW1wib3JhbmdlXCJdID0gMTJdID0gXCJvcmFuZ2VcIjtcbiAgICBQZXJzb25hSW5pdGlhbHNDb2xvcltQZXJzb25hSW5pdGlhbHNDb2xvcltcInJlZFwiXSA9IDEzXSA9IFwicmVkXCI7XG4gICAgUGVyc29uYUluaXRpYWxzQ29sb3JbUGVyc29uYUluaXRpYWxzQ29sb3JbXCJkYXJrUmVkXCJdID0gMTRdID0gXCJkYXJrUmVkXCI7XG59KShQZXJzb25hSW5pdGlhbHNDb2xvciA9IGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgfHwgKGV4cG9ydHMuUGVyc29uYUluaXRpYWxzQ29sb3IgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9wZXJzb25hSW5pdGlhbHNDb2xvckVudW0udHNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=