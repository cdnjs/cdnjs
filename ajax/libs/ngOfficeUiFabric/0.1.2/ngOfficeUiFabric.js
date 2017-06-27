/*!
 * ngOfficeUIFabric
 * http://ngofficeuifabric.com
 * Angular 1.x directives for Microsoft's Office UI Fabric
 * https://angularjs.org & https://dev.office.com/fabric
 * v0.1.1
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
	var contextualMenuModule = __webpack_require__(4);
	var dropdownModule = __webpack_require__(5);
	var iconModule = __webpack_require__(6);
	var searchboxModule = __webpack_require__(7);
	var spinnerModule = __webpack_require__(8);
	var tableModule = __webpack_require__(9);
	var textFieldModule = __webpack_require__(10);
	var toggleModule = __webpack_require__(11);
	exports.module = ng.module('officeuifabric.components', [
	    contextualMenuModule.module.name,
	    dropdownModule.module.name,
	    iconModule.module.name,
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
	var MenuItemTypes;
	(function (MenuItemTypes) {
	    MenuItemTypes[MenuItemTypes["link"] = 0] = "link";
	    MenuItemTypes[MenuItemTypes["divider"] = 1] = "divider";
	    MenuItemTypes[MenuItemTypes["header"] = 2] = "header";
	    MenuItemTypes[MenuItemTypes["subMenu"] = 3] = "subMenu";
	})(MenuItemTypes || (MenuItemTypes = {}));
	exports.contextualMenuItemDirectiveName = 'uifContextualMenuItem';
	var ContextualMenuItemDirective = (function () {
	    function ContextualMenuItemDirective() {
	        var _this = this;
	        this.restrict = 'E';
	        this.require = '^uifContextualMenu';
	        this.transclude = true;
	        this.controller = ContextualMenuItemController;
	        this.template = function ($element, $attrs) {
	            var type = $attrs.uifType;
	            if (ng.isUndefined(type)) {
	                return _this.templateTypes[MenuItemTypes.link];
	            }
	            return _this.templateTypes[MenuItemTypes[type]];
	        };
	        this.replace = true;
	        this.scope = {
	            isDisabled: '=uifIsDisabled',
	            isSelected: '=uifIsSelected',
	            onClick: '&uifClick',
	            text: '=uifText',
	            type: '@uifType'
	        };
	        this.templateTypes = {};
	        this.templateTypes[MenuItemTypes.subMenu] =
	            "<li class=\"ms-ContextualMenu-item\">\n                <a class=\"ms-ContextualMenu-link ms-ContextualMenu-link--hasMenu\" \n                ng-class=\"{'is-selected': isSelected, 'is-disabled': isDisabled}\" ng-click=\"selectItem()\" href>{{text}}</a>\n                <i class=\"ms-ContextualMenu-subMenuIcon ms-Icon ms-Icon--chevronRight\"></i>\n                <div class=\"content\"></div>\n            </li>";
	        this.templateTypes[MenuItemTypes.link] =
	            "<li class=\"ms-ContextualMenu-item\">\n                <a class=\"ms-ContextualMenu-link\" ng-class=\"{'is-selected': isSelected, 'is-disabled': isDisabled}\" \n                ng-click=\"selectItem()\" href>{{text}}</a>\n            </li>";
	        this.templateTypes[MenuItemTypes.header] = "<li class=\"ms-ContextualMenu-item ms-ContextualMenu-item--header\">{{text}}</li>";
	        this.templateTypes[MenuItemTypes.divider] = "<li class=\"ms-ContextualMenu-item ms-ContextualMenu-item--divider\"></li>";
	    }
	    ContextualMenuItemDirective.factory = function () {
	        var directive = function () { return new ContextualMenuItemDirective(); };
	        return directive;
	    };
	    ContextualMenuItemDirective.prototype.link = function ($scope, $element, $attrs, contextualMenuController, $transclude) {
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
	exports.contextualMenuDirectiveName = 'uifContextualMenu';
	var ContextualMenuDirective = (function () {
	    function ContextualMenuDirective() {
	        this.restrict = 'E';
	        this.require = exports.contextualMenuDirectiveName;
	        this.transclude = true;
	        this.template = "<ul class=\"ms-ContextualMenu\" ng-transclude></ul>";
	        this.replace = true;
	        this.controller = ContextualMenuController;
	        this.scope = {
	            isOpen: '=uifIsOpen',
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
	    function ContextualMenuController($scope, $animate, $element) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$animate = $animate;
	        this.$element = $element;
	        this.isOpenClassName = 'is-open';
	        if (ng.isUndefined($element.controller(exports.contextualMenuItemDirectiveName))) {
	            $scope.isRootMenu = true;
	        }
	        $scope.$watch('isOpen', function (newValue) {
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
	    ContextualMenuController.$inject = ['$scope', '$animate', '$element'];
	    return ContextualMenuController;
	})();
	exports.ContextualMenuController = ContextualMenuController;
	exports.module = ng.module('officeuifabric.components.contextualmenu', [
	    'officeuifabric.components'])
	    .directive(exports.contextualMenuDirectiveName, ContextualMenuDirective.factory())
	    .directive(exports.contextualMenuItemDirectiveName, ContextualMenuItemDirective.factory());


/***/ },
/* 5 */
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
	                var dropdownWidth = self.$element.find('.ms-Dropdown').width();
	                self.$element.find('.ms-Dropdown-items').css('width', dropdownWidth + 'px');
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
	    .directive('uifOption', DropdownOptionDirective.factory())
	    .directive('uifDropdown', DropdownDirective.factory());


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var IconDirective = (function () {
	    function IconDirective() {
	        this.restrict = 'E';
	        this.template = '<i class="ms-Icon ms-Icon--{{uifType}}" aria-hidden="true"></i>';
	        this.scope = {
	            uifType: '@'
	        };
	        this.transclude = true;
	    }
	    IconDirective.factory = function () {
	        var directive = function () { return new IconDirective(); };
	        return directive;
	    };
	    return IconDirective;
	})();
	exports.IconDirective = IconDirective;
	exports.module = ng.module('officeuifabric.components.icon', [
	    'officeuifabric.components'
	])
	    .directive('uifIcon', IconDirective.factory());


/***/ },
/* 7 */
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
	            placeholder: '=',
	            value: '='
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var SpinnerDirective = (function () {
	    function SpinnerDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Spinner"></div>';
	        this.controller = SpinnerController;
	        this.scope = {
	            'ngShow': '='
	        };
	    }
	    SpinnerDirective.factory = function () {
	        var directive = function () { return new SpinnerDirective(); };
	        return directive;
	    };
	    SpinnerDirective.prototype.link = function (scope, instanceElement, attrs, ctrl, $transclude) {
	        if (attrs.uifSpinnersize === 'large') {
	            instanceElement.addClass('ms-Spinner--large');
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
	    function SpinnerController($scope, $element, $interval) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$element = $element;
	        this.$interval = $interval;
	        this._offsetSize = 0.179;
	        this._numCircles = 8;
	        this._animationSpeed = 90;
	        this._circles = [];
	        $scope.init = function () {
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
	        var width = this.$element[0].clientWidth;
	        var height = this.$element[0].clientHeight;
	        var angle = 0;
	        var offset = width * this._offsetSize;
	        var step = (2 * Math.PI) / this._numCircles;
	        var i = this._numCircles;
	        var radius = (width - offset) * 0.5;
	        while (i--) {
	            var circle = this.createCircle();
	            var x = Math.round(width * 0.5 + radius * Math.cos(angle) - circle[0].clientWidth * 0.5) - offset * 0.5;
	            var y = Math.round(height * 0.5 + radius * Math.sin(angle) - circle[0].clientHeight * 0.5) - offset * 0.5;
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
	        var parentWidth = this.$element[0].clientWidth;
	        var dotSize = (parentWidth * this._offsetSize) + 'px';
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
	    SpinnerController.$inject = ['$scope', '$element', '$interval'];
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(2);
	var TableController = (function () {
	    function TableController($scope) {
	        this.$scope = $scope;
	        this.$scope.orderBy = null;
	        this.$scope.orderAsc = true;
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
	    TableController.$inject = ['$scope'];
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
	    return TableDirective;
	})();
	exports.TableDirective = TableDirective;
	var TableRowDirective = (function () {
	    function TableRowDirective() {
	        this.restrict = 'E';
	        this.transclude = true;
	        this.replace = true;
	        this.template = '<div class="ms-Table-row" ng-transclude></div>';
	    }
	    TableRowDirective.factory = function () {
	        var directive = function () { return new TableRowDirective(); };
	        return directive;
	    };
	    TableRowDirective.prototype.link = function (scope, instanceElement, attrs) {
	        if (attrs.uifSelected === 'true') {
	            instanceElement.addClass('is-selected');
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
	    }
	    TableRowSelectDirective.factory = function () {
	        var directive = function () { return new TableRowSelectDirective(); };
	        return directive;
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
/* 10 */
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
	    };
	    return TextFieldDirective;
	})();
	exports.TextFieldDirective = TextFieldDirective;
	exports.module = ng.module('officeuifabric.components.textfield', [
	    'officeuifabric.components'
	])
	    .directive('uifTextfield', TextFieldDirective.factory());


/***/ },
/* 11 */
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
	            ngModel: '=',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NGMxYmU5YWE0MGFkOTVkNWRjYyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zZWFyY2hib3gvc2VhcmNoYm94RGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lckRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZURpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBLGdEOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHNDQUFzQztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVLQUFzSyxxREFBcUQsb0NBQW9DLE1BQU07QUFDclE7QUFDQSxxSEFBb0gscURBQXFELHNEQUFzRCxNQUFNO0FBQ3JPLDJIQUEwSCxNQUFNO0FBQ2hJO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQywwQ0FBMEM7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHNDQUFzQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVFQUF1RTtBQUMvRjtBQUNBLGdEQUErQyxlQUFlO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNEJBQTRCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQThELHVCQUF1QjtBQUNyRjtBQUNBLHNDQUFxQyxzQkFBc0I7QUFDM0QsdURBQXNELHNCQUFzQjtBQUM1RSwyRUFBMEUsYUFBYTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLCtCQUErQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7Ozs7OztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDZCQUE2QjtBQUNsRTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsc0NBQXNDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTJFO0FBQzNFO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUM7QUFDekMsc0dBQXFHO0FBQ3JHLDZEQUE0RCx5QkFBeUI7QUFDckY7QUFDQSx1REFBc0QsZ0JBQWdCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLE9BQU87QUFDakQsNEJBQTJCLE9BQU87QUFDbEMscURBQW9ELGFBQWE7QUFDakUsb0RBQW1ELFlBQVk7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibmdPZmZpY2VVaUZhYnJpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSkgOiBmYWN0b3J5KHJvb3RbXCJhbmd1bGFyXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NGMxYmU5YWE0MGFkOTVkNWRjY1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb3JlJywgW10pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb3JlL2NvcmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgY29udGV4dHVhbE1lbnVNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51Jyk7XG52YXIgZHJvcGRvd25Nb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlJyk7XG52YXIgaWNvbk1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaWNvbi9pY29uRGlyZWN0aXZlJyk7XG52YXIgc2VhcmNoYm94TW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zZWFyY2hib3gvc2VhcmNoYm94RGlyZWN0aXZlJyk7XG52YXIgc3Bpbm5lck1vZHVsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyRGlyZWN0aXZlJyk7XG52YXIgdGFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RhYmxlL3RhYmxlRGlyZWN0aXZlJyk7XG52YXIgdGV4dEZpZWxkTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90ZXh0ZmllbGQvdGV4dEZpZWxkRGlyZWN0aXZlJyk7XG52YXIgdG9nZ2xlTW9kdWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90b2dnbGUvdG9nZ2xlRGlyZWN0aXZlJyk7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cycsIFtcbiAgICBjb250ZXh0dWFsTWVudU1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBkcm9wZG93bk1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBpY29uTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHNlYXJjaGJveE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICBzcGlubmVyTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRhYmxlTW9kdWxlLm1vZHVsZS5uYW1lLFxuICAgIHRleHRGaWVsZE1vZHVsZS5tb2R1bGUubmFtZSxcbiAgICB0b2dnbGVNb2R1bGUubW9kdWxlLm5hbWVcbl0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb3JlL2NvbXBvbmVudHMudHNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgTWVudUl0ZW1UeXBlcztcbihmdW5jdGlvbiAoTWVudUl0ZW1UeXBlcykge1xuICAgIE1lbnVJdGVtVHlwZXNbTWVudUl0ZW1UeXBlc1tcImxpbmtcIl0gPSAwXSA9IFwibGlua1wiO1xuICAgIE1lbnVJdGVtVHlwZXNbTWVudUl0ZW1UeXBlc1tcImRpdmlkZXJcIl0gPSAxXSA9IFwiZGl2aWRlclwiO1xuICAgIE1lbnVJdGVtVHlwZXNbTWVudUl0ZW1UeXBlc1tcImhlYWRlclwiXSA9IDJdID0gXCJoZWFkZXJcIjtcbiAgICBNZW51SXRlbVR5cGVzW01lbnVJdGVtVHlwZXNbXCJzdWJNZW51XCJdID0gM10gPSBcInN1Yk1lbnVcIjtcbn0pKE1lbnVJdGVtVHlwZXMgfHwgKE1lbnVJdGVtVHlwZXMgPSB7fSkpO1xuZXhwb3J0cy5jb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmVOYW1lID0gJ3VpZkNvbnRleHR1YWxNZW51SXRlbSc7XG52YXIgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmQ29udGV4dHVhbE1lbnUnO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gJGF0dHJzLnVpZlR5cGU7XG4gICAgICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQodHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLmxpbmtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlc1t0eXBlXV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpc0Rpc2FibGVkOiAnPXVpZklzRGlzYWJsZWQnLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz11aWZJc1NlbGVjdGVkJyxcbiAgICAgICAgICAgIG9uQ2xpY2s6ICcmdWlmQ2xpY2snLFxuICAgICAgICAgICAgdGV4dDogJz11aWZUZXh0JyxcbiAgICAgICAgICAgIHR5cGU6ICdAdWlmVHlwZSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGVzID0ge307XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLnN1Yk1lbnVdID1cbiAgICAgICAgICAgIFwiPGxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1pdGVtXFxcIj5cXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWxpbmsgbXMtQ29udGV4dHVhbE1lbnUtbGluay0taGFzTWVudVxcXCIgXFxuICAgICAgICAgICAgICAgIG5nLWNsYXNzPVxcXCJ7J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCwgJ2lzLWRpc2FibGVkJzogaXNEaXNhYmxlZH1cXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3RJdGVtKClcXFwiIGhyZWY+e3t0ZXh0fX08L2E+XFxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1zdWJNZW51SWNvbiBtcy1JY29uIG1zLUljb24tLWNoZXZyb25SaWdodFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb250ZW50XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5saW5rXSA9XG4gICAgICAgICAgICBcIjxsaSBjbGFzcz1cXFwibXMtQ29udGV4dHVhbE1lbnUtaXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudS1saW5rXFxcIiBuZy1jbGFzcz1cXFwieydpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsICdpcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWR9XFxcIiBcXG4gICAgICAgICAgICAgICAgbmctY2xpY2s9XFxcInNlbGVjdEl0ZW0oKVxcXCIgaHJlZj57e3RleHR9fTwvYT5cXG4gICAgICAgICAgICA8L2xpPlwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZXNbTWVudUl0ZW1UeXBlcy5oZWFkZXJdID0gXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW0gbXMtQ29udGV4dHVhbE1lbnUtaXRlbS0taGVhZGVyXFxcIj57e3RleHR9fTwvbGk+XCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGVUeXBlc1tNZW51SXRlbVR5cGVzLmRpdmlkZXJdID0gXCI8bGkgY2xhc3M9XFxcIm1zLUNvbnRleHR1YWxNZW51LWl0ZW0gbXMtQ29udGV4dHVhbE1lbnUtaXRlbS0tZGl2aWRlclxcXCI+PC9saT5cIjtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQ29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1EaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSB7XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgnZGl2JykucmVwbGFjZVdpdGgoY2xvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNvbnRleHR1YWxNZW51Q29udHJvbGxlci5pc011bHRpU2VsZWN0aW9uTWVudSgpKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLm9uRGVzZWxlY3RJdGVtcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5nLmlzVW5kZWZpbmVkKCRzY29wZS5pc1NlbGVjdGVkKSAmJiAhJHNjb3BlLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZCA9ICEkc2NvcGUuaXNTZWxlY3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIuaXNSb290TWVudSgpKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLm9uQ2xvc2VNZW51cygkc2NvcGUuJGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIub25DbG9zZU1lbnVzKG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0dWFsTWVudUNvbnRyb2xsZXIub25EZXNlbGVjdEl0ZW1zKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dHVhbE1lbnVDb250cm9sbGVyLm9uQ2xvc2VNZW51cygkc2NvcGUuJGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jaGlsZE1lbnVDdHJsLm9wZW5NZW51KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRzY29wZS5vbkNsaWNrKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5vbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kb24oJ3VpZi1tZW51LWRlc2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kb24oJ3VpZi1tZW51LWNsb3NlJywgZnVuY3Rpb24gKGV2ZW50LCBtZW51SXRlbUlkKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmhhc0NoaWxkTWVudSAmJiAkc2NvcGUuJGlkICE9PSBtZW51SXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNoaWxkTWVudUN0cmwuY2xvc2VNZW51KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLkNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZTtcbnZhciBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB9XG4gICAgQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuc2V0Q2hpbGRNZW51ID0gZnVuY3Rpb24gKGNoaWxkTWVudUN0cmwpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGFzQ2hpbGRNZW51ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGRNZW51Q3RybCA9IGNoaWxkTWVudUN0cmw7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xuICAgIHJldHVybiBDb250ZXh0dWFsTWVudUl0ZW1Db250cm9sbGVyO1xufSkoKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVJdGVtQ29udHJvbGxlciA9IENvbnRleHR1YWxNZW51SXRlbUNvbnRyb2xsZXI7XG5leHBvcnRzLmNvbnRleHR1YWxNZW51RGlyZWN0aXZlTmFtZSA9ICd1aWZDb250ZXh0dWFsTWVudSc7XG52YXIgQ29udGV4dHVhbE1lbnVEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCkge1xuICAgICAgICB0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSBleHBvcnRzLmNvbnRleHR1YWxNZW51RGlyZWN0aXZlTmFtZTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IFwiPHVsIGNsYXNzPVxcXCJtcy1Db250ZXh0dWFsTWVudVxcXCIgbmctdHJhbnNjbHVkZT48L3VsPlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBpc09wZW46ICc9dWlmSXNPcGVuJyxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiAnQHVpZk11bHRpc2VsZWN0J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENvbnRleHR1YWxNZW51RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGNvbnRleHR1YWxNZW51Q29udHJvbGxlcikge1xuICAgICAgICB2YXIgcGFyZW50TWVudUl0ZW1DdHJsID0gJGVsZW1lbnQuY29udHJvbGxlcihleHBvcnRzLmNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZU5hbWUpO1xuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKHBhcmVudE1lbnVJdGVtQ3RybCkpIHtcbiAgICAgICAgICAgIHBhcmVudE1lbnVJdGVtQ3RybC5zZXRDaGlsZE1lbnUoY29udGV4dHVhbE1lbnVDb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5nLmlzVW5kZWZpbmVkKCRzY29wZS5tdWx0aXNlbGVjdCkgJiYgJHNjb3BlLm11bHRpc2VsZWN0LnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ21zLUNvbnRleHR1YWxNZW51LS1tdWx0aXNlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5Db250ZXh0dWFsTWVudURpcmVjdGl2ZSA9IENvbnRleHR1YWxNZW51RGlyZWN0aXZlO1xudmFyIENvbnRleHR1YWxNZW51Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyKCRzY29wZSwgJGFuaW1hdGUsICRlbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRhbmltYXRlID0gJGFuaW1hdGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy5pc09wZW5DbGFzc05hbWUgPSAnaXMtb3Blbic7XG4gICAgICAgIGlmIChuZy5pc1VuZGVmaW5lZCgkZWxlbWVudC5jb250cm9sbGVyKGV4cG9ydHMuY29udGV4dHVhbE1lbnVJdGVtRGlyZWN0aXZlTmFtZSkpKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXNSb290TWVudSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNPcGVuJywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAkYW5pbWF0ZVtuZXdWYWx1ZSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXSgkZWxlbWVudCwgX3RoaXMuaXNPcGVuQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUub25EZXNlbGVjdEl0ZW1zID0gZnVuY3Rpb24gKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgndWlmLW1lbnUtZGVzZWxlY3QnKTtcbiAgICAgICAgaWYgKGRlc2VsZWN0UGFyZW50TWVudXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCd1aWYtbWVudS1kZXNlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2xvc2VNZW51cyA9IGZ1bmN0aW9uIChtZW51SXRlbVRvU2tpcCwgY2xvc2VSb290TWVudSkge1xuICAgICAgICBpZiAoY2xvc2VSb290TWVudSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3VpZi1tZW51LWNsb3NlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCd1aWYtbWVudS1jbG9zZScsIG1lbnVJdGVtVG9Ta2lwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dHVhbE1lbnVDb250cm9sbGVyLnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuaXNPcGVuID0gdHJ1ZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzY29wZS5pc09wZW4gPSBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci5wcm90b3R5cGUuaXNSb290TWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLmlzUm9vdE1lbnU7XG4gICAgfTtcbiAgICBDb250ZXh0dWFsTWVudUNvbnRyb2xsZXIucHJvdG90eXBlLmlzTXVsdGlTZWxlY3Rpb25NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobmcuaXNVbmRlZmluZWQodGhpcy4kc2NvcGUubXVsdGlzZWxlY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm11bHRpc2VsZWN0LnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICB9O1xuICAgIENvbnRleHR1YWxNZW51Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGFuaW1hdGUnLCAnJGVsZW1lbnQnXTtcbiAgICByZXR1cm4gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xufSkoKTtcbmV4cG9ydHMuQ29udGV4dHVhbE1lbnVDb250cm9sbGVyID0gQ29udGV4dHVhbE1lbnVDb250cm9sbGVyO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMuY29udGV4dHVhbG1lbnUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKGV4cG9ydHMuY29udGV4dHVhbE1lbnVEaXJlY3RpdmVOYW1lLCBDb250ZXh0dWFsTWVudURpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZShleHBvcnRzLmNvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZU5hbWUsIENvbnRleHR1YWxNZW51SXRlbURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2NvbnRleHR1YWxtZW51L2NvbnRleHR1YWxNZW51LnRzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8bGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1pdGVtXCIgbmctdHJhbnNjbHVkZT48L2xpPic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMucmVxdWlyZSA9ICdedWlmRHJvcGRvd24nO1xuICAgICAgICB0aGlzLnJlcGxhY2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYW5zY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZUVsZW1lbnQsIHRlbXBsYXRlQXR0cmlidXRlcywgdHJhbnNjbHVkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdDogdGhpcy5wb3N0TGlua1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRHJvcGRvd25PcHRpb25EaXJlY3RpdmUucHJvdG90eXBlLnBvc3RMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBkcm9wZG93bkNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKCFkcm9wZG93bkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHRocm93ICdEcm9wZG93biBjb250cm9sbGVyIG5vdCBmb3VuZCEnO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlRWxlbWVudFxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuc2V0Vmlld1ZhbHVlKGluc3RhbmNlRWxlbWVudC5maW5kKCdzcGFuJykuaHRtbCgpLCBhdHRycy52YWx1ZSwgZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duT3B0aW9uRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuRHJvcGRvd25PcHRpb25EaXJlY3RpdmUgPSBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZTtcbnZhciBEcm9wZG93bkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duQ29udHJvbGxlcigkZWxlbWVudCwgJHNjb3BlKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgfVxuICAgIERyb3Bkb3duQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiRlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLiRzY29wZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmlzT3BlbiA9ICFzZWxmLiRzY29wZS5pc09wZW47XG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3duV2lkdGggPSBzZWxmLiRlbGVtZW50LmZpbmQoJy5tcy1Ecm9wZG93bicpLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbWVudC5maW5kKCcubXMtRHJvcGRvd24taXRlbXMnKS5jc3MoJ3dpZHRoJywgZHJvcGRvd25XaWR0aCArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLm5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHNlbGYuJGVsZW1lbnQuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbi5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc2VsZi4kc2NvcGUubmdNb2RlbC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5zZWxlY3RlZFRpdGxlID0gYW5ndWxhci5lbGVtZW50KG9wdGlvbikuZmluZCgnc3BhbicpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd25Db250cm9sbGVyLnByb3RvdHlwZS5zZXRWaWV3VmFsdWUgPSBmdW5jdGlvbiAodGl0bGUsIHZhbHVlLCBldmVudFR5cGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUuc2VsZWN0ZWRUaXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLiRzY29wZS5uZ01vZGVsLiRzZXRWaWV3VmFsdWUodmFsdWUsIGV2ZW50VHlwZSk7XG4gICAgfTtcbiAgICBEcm9wZG93bkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFZpZXdWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRzY29wZS5uZ01vZGVsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLiRzY29wZS5uZ01vZGVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5uZ01vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnXTtcbiAgICByZXR1cm4gRHJvcGRvd25Db250cm9sbGVyO1xufSkoKTtcbmV4cG9ydHMuRHJvcGRvd25Db250cm9sbGVyID0gRHJvcGRvd25Db250cm9sbGVyO1xudmFyIERyb3Bkb3duRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bkRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsaWNrPVwiZHJvcGRvd25DbGlja1wiICcgK1xuICAgICAgICAgICAgJ25nLWNsYXNzPVwie1xcJ21zLURyb3Bkb3duXFwnIDogdHJ1ZSwgXFwnaXMtb3BlblxcJzogaXNPcGVuLCBcXCdpcy1kaXNhYmxlZFxcJzogZGlzYWJsZWR9XCIgdGFiaW5kZXg9XCIwXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJtcy1Ecm9wZG93bi1jYXJldERvd24gbXMtSWNvbiBtcy1JY29uLS1jYXJldERvd25cIj48L2k+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1Ecm9wZG93bi10aXRsZVwiPnt7c2VsZWN0ZWRUaXRsZX19PC9zcGFuPjx1bCBjbGFzcz1cIm1zLURyb3Bkb3duLWl0ZW1zXCI+PG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPjwvdWw+PC9kaXY+JztcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlID0gWyd1aWZEcm9wZG93bicsICc/bmdNb2RlbCddO1xuICAgICAgICB0aGlzLnNjb3BlID0ge307XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IERyb3Bkb3duQ29udHJvbGxlcjtcbiAgICB9XG4gICAgRHJvcGRvd25EaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEcm9wZG93bkRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgRHJvcGRvd25EaXJlY3RpdmUucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGVFbGVtZW50LCB0ZW1wbGF0ZUF0dHJpYnV0ZXMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZTogdGhpcy5wcmVMaW5rXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEcm9wZG93bkRpcmVjdGl2ZS5wcm90b3R5cGUucHJlTGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBpbnN0YW5jZUF0dHJpYnV0ZXMsIGN0cmxzKSB7XG4gICAgICAgIHZhciBkcm9wZG93bkNvbnRyb2xsZXIgPSBjdHJsc1swXTtcbiAgICAgICAgdmFyIG1vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xuICAgICAgICBzY29wZS5uZ01vZGVsID0gbW9kZWxDb250cm9sbGVyO1xuICAgICAgICBkcm9wZG93bkNvbnRyb2xsZXIuaW5pdCgpO1xuICAgICAgICBzY29wZS5kaXNhYmxlZCA9ICdkaXNhYmxlZCcgaW4gaW5zdGFuY2VBdHRyaWJ1dGVzO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuRHJvcGRvd25EaXJlY3RpdmUgPSBEcm9wZG93bkRpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLmRyb3Bkb3duJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZPcHRpb24nLCBEcm9wZG93bk9wdGlvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpXG4gICAgLmRpcmVjdGl2ZSgndWlmRHJvcGRvd24nLCBEcm9wZG93bkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duRGlyZWN0aXZlLnRzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIEljb25EaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEljb25EaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXt7dWlmVHlwZX19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPic7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICB1aWZUeXBlOiAnQCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgSWNvbkRpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEljb25EaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBJY29uRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuSWNvbkRpcmVjdGl2ZSA9IEljb25EaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy5pY29uJywgW1xuICAgICdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzJ1xuXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZJY29uJywgSWNvbkRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL2ljb24vaWNvbkRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBTZWFyY2hCb3hEaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlYXJjaEJveERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtU2VhcmNoQm94XCIgbmctY2xhc3M9XCJ7XFwnaXMtYWN0aXZlXFwnOmlzQWN0aXZlfVwiPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBjbGFzcz1cIm1zLVNlYXJjaEJveC1maWVsZFwiIG5nLWZvY3VzPVwiaW5wdXRGb2N1cygpXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCInICtcbiAgICAgICAgICAgICcgbmctbW9kZWw9XCJ2YWx1ZVwiIGlkPVwie3s6OlxcJ3NlYXJjaEJveF9cXCcrJGlkfX1cIiAvPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBjbGFzcz1cIm1zLVNlYXJjaEJveC1sYWJlbFwiIGZvcj1cInt7OjpcXCdzZWFyY2hCb3hfXFwnKyRpZH19XCIgbmctaGlkZT1cImlzTGFiZWxIaWRkZW5cIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm1zLVNlYXJjaEJveC1pY29uIG1zLUljb24gbXMtSWNvbi0tc2VhcmNoXCIgPjwvaT4ge3twbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwibXMtU2VhcmNoQm94LWNsb3NlQnV0dG9uXCIgbmctbW91c2Vkb3duPVwiYnRuTW91c2Vkb3duKClcIiB0eXBlPVwiYnV0dG9uXCI+PGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLXhcIj48L2k+PC9idXR0b24+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdGhpcy5zY29wZSA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnPScsXG4gICAgICAgICAgICB2YWx1ZTogJz0nXG4gICAgICAgIH07XG4gICAgfVxuICAgIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFNlYXJjaEJveERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU2VhcmNoQm94RGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICBzY29wZS5pc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuaW5wdXRGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmlucHV0Qmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5pc0NhbmNlbCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHNjb3BlLnZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2NvcGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuaXNGb2N1cyA9IHNjb3BlLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmJ0bk1vdXNlZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLmlzQ2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd2YWx1ZScsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICghc2NvcGUuaXNGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdmFsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5pc0xhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3BsYWNlaG9sZGVyJywgZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgICAgICAgICAgc2NvcGUucGxhY2Vob2xkZXIgPSBzZWFyY2g7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlYXJjaEJveERpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLlNlYXJjaEJveERpcmVjdGl2ZSA9IFNlYXJjaEJveERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNlYXJjaGJveCcsIFsnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cyddKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlNlYXJjaGJveCcsIFNlYXJjaEJveERpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3NlYXJjaGJveC9zZWFyY2hib3hEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgU3Bpbm5lckRpcmVjdGl2ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Bpbm5lckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtU3Bpbm5lclwiPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFNwaW5uZXJDb250cm9sbGVyO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgJ25nU2hvdyc6ICc9J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3Bpbm5lckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgU3Bpbm5lckRpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycywgY3RybCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgaWYgKGF0dHJzLnVpZlNwaW5uZXJzaXplID09PSAnbGFyZ2UnKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuYWRkQ2xhc3MoJ21zLVNwaW5uZXItLWxhcmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLm5nU2hvdyAhPSBudWxsKSB7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ25nU2hvdycsIGZ1bmN0aW9uIChuZXdWaXNpYmxlLCBvbGRWaXNpYmxlLCBzcGlubmVyU2NvcGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyU2NvcGUuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNwaW5uZXJTY29wZS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY29wZS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgICR0cmFuc2NsdWRlKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICAgICAgaWYgKGNsb25lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlciA9IG5nLmVsZW1lbnQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbXMtU3Bpbm5lci1sYWJlbCcpLmFwcGVuZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmluaXQoKTtcbiAgICB9O1xuICAgIHJldHVybiBTcGlubmVyRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuU3Bpbm5lckRpcmVjdGl2ZSA9IFNwaW5uZXJEaXJlY3RpdmU7XG52YXIgU3Bpbm5lckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwaW5uZXJDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRpbnRlcnZhbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiRpbnRlcnZhbCA9ICRpbnRlcnZhbDtcbiAgICAgICAgdGhpcy5fb2Zmc2V0U2l6ZSA9IDAuMTc5O1xuICAgICAgICB0aGlzLl9udW1DaXJjbGVzID0gODtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uU3BlZWQgPSA5MDtcbiAgICAgICAgdGhpcy5fY2lyY2xlcyA9IFtdO1xuICAgICAgICAkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmNyZWF0ZUNpcmNsZXNBbmRBcnJhbmdlKCk7XG4gICAgICAgICAgICBfdGhpcy5zZXRJbml0aWFsT3BhY2l0eSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fYW5pbWF0aW9uSW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gX3RoaXMuX2NpcmNsZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmFkZUNpcmNsZShfdGhpcy5fY2lyY2xlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgX3RoaXMuX2FuaW1hdGlvblNwZWVkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKF90aGlzLl9hbmltYXRpb25JbnRlcnZhbCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFNwaW5uZXJDb250cm9sbGVyLnByb3RvdHlwZS5jcmVhdGVDaXJjbGVzQW5kQXJyYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy4kZWxlbWVudFswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuJGVsZW1lbnRbMF0uY2xpZW50SGVpZ2h0O1xuICAgICAgICB2YXIgYW5nbGUgPSAwO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gd2lkdGggKiB0aGlzLl9vZmZzZXRTaXplO1xuICAgICAgICB2YXIgc3RlcCA9ICgyICogTWF0aC5QSSkgLyB0aGlzLl9udW1DaXJjbGVzO1xuICAgICAgICB2YXIgaSA9IHRoaXMuX251bUNpcmNsZXM7XG4gICAgICAgIHZhciByYWRpdXMgPSAod2lkdGggLSBvZmZzZXQpICogMC41O1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgY2lyY2xlID0gdGhpcy5jcmVhdGVDaXJjbGUoKTtcbiAgICAgICAgICAgIHZhciB4ID0gTWF0aC5yb3VuZCh3aWR0aCAqIDAuNSArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSAtIGNpcmNsZVswXS5jbGllbnRXaWR0aCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGgucm91bmQoaGVpZ2h0ICogMC41ICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpIC0gY2lyY2xlWzBdLmNsaWVudEhlaWdodCAqIDAuNSkgLSBvZmZzZXQgKiAwLjU7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjaXJjbGUpO1xuICAgICAgICAgICAgY2lyY2xlLmNzcygnbGVmdCcsICh4ICsgJ3B4JykpO1xuICAgICAgICAgICAgY2lyY2xlLmNzcygndG9wJywgKHkgKyAncHgnKSk7XG4gICAgICAgICAgICBhbmdsZSArPSBzdGVwO1xuICAgICAgICAgICAgdmFyIGNpcmNsZU9iamVjdCA9IG5ldyBDaXJjbGVPYmplY3QoY2lyY2xlLCBpKTtcbiAgICAgICAgICAgIHRoaXMuX2NpcmNsZXMucHVzaChjaXJjbGVPYmplY3QpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuY3JlYXRlQ2lyY2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2lyY2xlID0gbmcuZWxlbWVudCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIHBhcmVudFdpZHRoID0gdGhpcy4kZWxlbWVudFswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGRvdFNpemUgPSAocGFyZW50V2lkdGggKiB0aGlzLl9vZmZzZXRTaXplKSArICdweCc7XG4gICAgICAgIGNpcmNsZS5hZGRDbGFzcygnbXMtU3Bpbm5lci1jaXJjbGUnKS5jc3MoJ3dpZHRoJywgZG90U2l6ZSkuY3NzKCdoZWlnaHQnLCBkb3RTaXplKTtcbiAgICAgICAgcmV0dXJuIGNpcmNsZTtcbiAgICB9O1xuICAgIDtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0SW5pdGlhbE9wYWNpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcGNhaXR5VG9TZXQ7XG4gICAgICAgIHRoaXMuX2ZhZGVJbmNyZW1lbnQgPSAxIC8gdGhpcy5fbnVtQ2lyY2xlcztcbiAgICAgICAgdGhpcy5fY2lyY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUsIGluZGV4KSB7XG4gICAgICAgICAgICBvcGNhaXR5VG9TZXQgPSAoX3RoaXMuX2ZhZGVJbmNyZW1lbnQgKiAoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBjaXJjbGUub3BhY2l0eSA9IG9wY2FpdHlUb1NldDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTcGlubmVyQ29udHJvbGxlci5wcm90b3R5cGUuZmFkZUNpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdmFyIG5ld09wYWNpdHkgPSBjaXJjbGUub3BhY2l0eSAtIHRoaXMuX2ZhZGVJbmNyZW1lbnQ7XG4gICAgICAgIGlmIChuZXdPcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICAgIG5ld09wYWNpdHkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNpcmNsZS5vcGFjaXR5ID0gbmV3T3BhY2l0eTtcbiAgICB9O1xuICAgIFNwaW5uZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckaW50ZXJ2YWwnXTtcbiAgICByZXR1cm4gU3Bpbm5lckNvbnRyb2xsZXI7XG59KSgpO1xudmFyIENpcmNsZU9iamVjdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2lyY2xlT2JqZWN0KGNpcmNsZUVsZW1lbnQsIGNpcmNsZUluZGV4KSB7XG4gICAgICAgIHRoaXMuY2lyY2xlRWxlbWVudCA9IGNpcmNsZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2lyY2xlSW5kZXggPSBjaXJjbGVJbmRleDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENpcmNsZU9iamVjdC5wcm90b3R5cGUsIFwib3BhY2l0eVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICsodGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAob3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVFbGVtZW50LmNzcygnb3BhY2l0eScsIG9wYWNpdHkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQ2lyY2xlT2JqZWN0O1xufSkoKTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnNwaW5uZXInLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZTcGlubmVyJywgU3Bpbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lckRpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBUYWJsZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlQ29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJHNjb3BlLm9yZGVyQnkgPSBudWxsO1xuICAgICAgICB0aGlzLiRzY29wZS5vcmRlckFzYyA9IHRydWU7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYWJsZUNvbnRyb2xsZXIucHJvdG90eXBlLCBcIm9yZGVyQnlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY29wZS5vcmRlckJ5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJCeSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFibGVDb250cm9sbGVyLnByb3RvdHlwZSwgXCJvcmRlckFzY1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLm9yZGVyQXNjO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChvcmRlckFzYykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUub3JkZXJBc2MgPSBvcmRlckFzYztcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVGFibGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuICAgIHJldHVybiBUYWJsZUNvbnRyb2xsZXI7XG59KSgpO1xudmFyIFRhYmxlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtVGFibGVcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IFRhYmxlQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSAndGFibGUnO1xuICAgIH1cbiAgICBUYWJsZURpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5UYWJsZURpcmVjdGl2ZSA9IFRhYmxlRGlyZWN0aXZlO1xudmFyIFRhYmxlUm93RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd0RpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibXMtVGFibGUtcm93XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nO1xuICAgIH1cbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRhYmxlUm93RGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUYWJsZVJvd0RpcmVjdGl2ZS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uIChzY29wZSwgaW5zdGFuY2VFbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoYXR0cnMudWlmU2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVSb3dEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5UYWJsZVJvd0RpcmVjdGl2ZSA9IFRhYmxlUm93RGlyZWN0aXZlO1xudmFyIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLVRhYmxlLXJvd0NoZWNrXCI+PC9zcGFuPic7XG4gICAgICAgIHRoaXMucmVwbGFjZSA9IHRydWU7XG4gICAgfVxuICAgIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVSb3dTZWxlY3REaXJlY3RpdmUoKTsgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZVJvd1NlbGVjdERpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLlRhYmxlUm93U2VsZWN0RGlyZWN0aXZlID0gVGFibGVSb3dTZWxlY3REaXJlY3RpdmU7XG52YXIgVGFibGVDZWxsRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUNlbGxEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJtcy1UYWJsZS1jZWxsXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+JztcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICB9XG4gICAgVGFibGVDZWxsRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGFibGVDZWxsRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVDZWxsRGlyZWN0aXZlO1xufSkoKTtcbmV4cG9ydHMuVGFibGVDZWxsRGlyZWN0aXZlID0gVGFibGVDZWxsRGlyZWN0aXZlO1xudmFyIFRhYmxlSGVhZGVyRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXN0cmljdCA9ICdFJztcbiAgICAgICAgdGhpcy50cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cIm1zLVRhYmxlLWNlbGxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4nO1xuICAgICAgICB0aGlzLnJlcXVpcmUgPSAnXnVpZlRhYmxlJztcbiAgICB9XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGluc3RhbmNlRWxlbWVudCwgYXR0cnMsIHRhYmxlKSB7XG4gICAgICAgIHNjb3BlLmhlYWRlckNsaWNrID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAodGFibGUub3JkZXJCeSA9PT0gYXR0cnMudWlmT3JkZXJCeSkge1xuICAgICAgICAgICAgICAgIHRhYmxlLm9yZGVyQXNjID0gIXRhYmxlLm9yZGVyQXNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJCeSA9IGF0dHJzLnVpZk9yZGVyQnk7XG4gICAgICAgICAgICAgICAgdGFibGUub3JkZXJBc2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQnknLCBmdW5jdGlvbiAobmV3T3JkZXJCeSwgb2xkT3JkZXJCeSwgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKG9sZE9yZGVyQnkgIT09IG5ld09yZGVyQnkgJiZcbiAgICAgICAgICAgICAgICBuZXdPcmRlckJ5ID09PSBhdHRycy51aWZPcmRlckJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gaW5zdGFuY2VFbGVtZW50LnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHMuZXEoaSkuY2hpbGRyZW4oKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLmVxKGkpLmNoaWxkcmVuKCkuZXEoMSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VFbGVtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ1aWYtc29ydC1vcmRlclwiPiZuYnNwO1xcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtcy1JY29uIG1zLUljb24tLWNhcmV0RG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ3RhYmxlLm9yZGVyQXNjJywgZnVuY3Rpb24gKG5ld09yZGVyQXNjLCBvbGRPcmRlckFzYywgdGFibGVIZWFkZXJTY29wZSkge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlRWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHZhciBvbGRDc3NDbGFzcyA9IG9sZE9yZGVyQXNjID8gJ21zLUljb24tLWNhcmV0RG93bicgOiAnbXMtSWNvbi0tY2FyZXRVcCc7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nzc0NsYXNzID0gbmV3T3JkZXJBc2MgPyAnbXMtSWNvbi0tY2FyZXREb3duJyA6ICdtcy1JY29uLS1jYXJldFVwJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQuY2hpbGRyZW4oKS5lcSgxKS5jaGlsZHJlbigpLmVxKDApLnJlbW92ZUNsYXNzKG9sZENzc0NsYXNzKS5hZGRDbGFzcyhuZXdDc3NDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJ3VpZk9yZGVyQnknIGluIGF0dHJzKSB7XG4gICAgICAgICAgICBpbnN0YW5jZUVsZW1lbnQub24oJ2NsaWNrJywgc2NvcGUuaGVhZGVyQ2xpY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVIZWFkZXJEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckRpcmVjdGl2ZSA9IFRhYmxlSGVhZGVyRGlyZWN0aXZlO1xuZXhwb3J0cy5tb2R1bGUgPSBuZy5tb2R1bGUoJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMudGFibGUnLCBbJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZScsIFRhYmxlRGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZVJvdycsIFRhYmxlUm93RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZVJvd1NlbGVjdCcsIFRhYmxlUm93U2VsZWN0RGlyZWN0aXZlLmZhY3RvcnkoKSlcbiAgICAuZGlyZWN0aXZlKCd1aWZUYWJsZUNlbGwnLCBUYWJsZUNlbGxEaXJlY3RpdmUuZmFjdG9yeSgpKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRhYmxlSGVhZGVyJywgVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZURpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBUZXh0RmllbGREaXJlY3RpdmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRGaWVsZERpcmVjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9ICc8ZGl2IG5nLWNsYXNzPVwie1xcJ2lzLWFjdGl2ZVxcJzogaXNBY3RpdmUsIFxcJ21zLVRleHRGaWVsZFxcJzogdHJ1ZSwgJyArXG4gICAgICAgICAgICAnXFwnbXMtVGV4dEZpZWxkLS11bmRlcmxpbmVkXFwnOiB1aWZVbmRlcmxpbmVkLCBcXCdtcy1UZXh0RmllbGQtLXBsYWNlaG9sZGVyXFwnOiBwbGFjZWhvbGRlcn1cIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgbmctc2hvdz1cImxhYmVsU2hvd25cIiBjbGFzcz1cIm1zLUxhYmVsXCI+e3t1aWZMYWJlbCB8fCBwbGFjZWhvbGRlcn19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8aW5wdXQgbmctbW9kZWw9XCJuZ01vZGVsXCIgbmctYmx1cj1cImlucHV0Qmx1cigpXCIgbmctZm9jdXM9XCJpbnB1dEZvY3VzKClcIiBuZy1jbGljaz1cImlucHV0Q2xpY2soKVwiIGNsYXNzPVwibXMtVGV4dEZpZWxkLWZpZWxkXCIgLz4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLVRleHRGaWVsZC1kZXNjcmlwdGlvblwiPnt7dWlmRGVzY3JpcHRpb259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnNjb3BlID0ge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJyxcbiAgICAgICAgICAgIHVpZkRlc2NyaXB0aW9uOiAnQCcsXG4gICAgICAgICAgICB1aWZMYWJlbDogJ0AnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgfVxuICAgIFRleHRGaWVsZERpcmVjdGl2ZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRleHRGaWVsZERpcmVjdGl2ZSgpOyB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH07XG4gICAgVGV4dEZpZWxkRGlyZWN0aXZlLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKHNjb3BlLCBpbnN0YW5jZUVsZW1lbnQsIGF0dHJzLCBuZ01vZGVsKSB7XG4gICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSB0cnVlO1xuICAgICAgICBzY29wZS51aWZVbmRlcmxpbmVkID0gJ3VpZlVuZGVybGluZWQnIGluIGF0dHJzO1xuICAgICAgICBzY29wZS5pbnB1dEZvY3VzID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUudWlmVW5kZXJsaW5lZCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuaW5wdXRDbGljayA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKHNjb3BlLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubGFiZWxTaG93biA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS5pbnB1dEJsdXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IGluc3RhbmNlRWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICAgICAgaWYgKHNjb3BlLnBsYWNlaG9sZGVyICYmIGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsU2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjb3BlLnVpZlVuZGVybGluZWQpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFRleHRGaWVsZERpcmVjdGl2ZTtcbn0pKCk7XG5leHBvcnRzLlRleHRGaWVsZERpcmVjdGl2ZSA9IFRleHRGaWVsZERpcmVjdGl2ZTtcbmV4cG9ydHMubW9kdWxlID0gbmcubW9kdWxlKCdvZmZpY2V1aWZhYnJpYy5jb21wb25lbnRzLnRleHRmaWVsZCcsIFtcbiAgICAnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cydcbl0pXG4gICAgLmRpcmVjdGl2ZSgndWlmVGV4dGZpZWxkJywgVGV4dEZpZWxkRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkL3RleHRGaWVsZERpcmVjdGl2ZS50c1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgVG9nZ2xlRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb2dnbGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSAnPGRpdiBuZy1jbGFzcz1cInRvZ2dsZUNsYXNzXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1Ub2dnbGUtZGVzY3JpcHRpb25cIj48bmctdHJhbnNjbHVkZS8+PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInt7OjokaWR9fVwiIGNsYXNzPVwibXMtVG9nZ2xlLWlucHV0XCIgbmctbW9kZWw9XCJuZ01vZGVsXCIgLz4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwie3s6OiRpZH19XCIgY2xhc3M9XCJtcy1Ub2dnbGUtZmllbGRcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1zLUxhYmVsIG1zLUxhYmVsLS1vZmZcIj57e3VpZkxhYmVsT2ZmfX08L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtcy1MYWJlbCBtcy1MYWJlbC0tb25cIj57e3VpZkxhYmVsT259fTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRoaXMucmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHRoaXMudHJhbnNjbHVkZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICAgICAgICBuZ01vZGVsOiAnPScsXG4gICAgICAgICAgICB1aWZMYWJlbE9mZjogJ0AnLFxuICAgICAgICAgICAgdWlmTGFiZWxPbjogJ0AnLFxuICAgICAgICAgICAgdWlmVGV4dExvY2F0aW9uOiAnQCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgVG9nZ2xlRGlyZWN0aXZlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVG9nZ2xlRGlyZWN0aXZlKCk7IH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfTtcbiAgICBUb2dnbGVEaXJlY3RpdmUucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLnRvZ2dsZUNsYXNzID0gJ21zLVRvZ2dsZSc7XG4gICAgICAgIGlmIChzY29wZS51aWZUZXh0TG9jYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBsb2MgPSBzY29wZS51aWZUZXh0TG9jYXRpb247XG4gICAgICAgICAgICBsb2MgPSBsb2MuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsb2Muc2xpY2UoMSk7XG4gICAgICAgICAgICBzY29wZS50b2dnbGVDbGFzcyArPSAnIG1zLVRvZ2dsZS0tdGV4dCcgKyBsb2M7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUb2dnbGVEaXJlY3RpdmU7XG59KSgpO1xuZXhwb3J0cy5Ub2dnbGVEaXJlY3RpdmUgPSBUb2dnbGVEaXJlY3RpdmU7XG5leHBvcnRzLm1vZHVsZSA9IG5nLm1vZHVsZSgnb2ZmaWNldWlmYWJyaWMuY29tcG9uZW50cy50b2dnbGUnLCBbXG4gICAgJ29mZmljZXVpZmFicmljLmNvbXBvbmVudHMnXG5dKVxuICAgIC5kaXJlY3RpdmUoJ3VpZlRvZ2dsZScsIFRvZ2dsZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS90b2dnbGVEaXJlY3RpdmUudHNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==