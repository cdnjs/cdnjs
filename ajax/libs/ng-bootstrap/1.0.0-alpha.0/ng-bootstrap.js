(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["ngb"] = factory(require("@angular/core"), require("@angular/common"));
	else
		root["ngb"] = factory(root["ng"]["core"], root["ng"]["common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_18__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var accordion_1 = __webpack_require__(1);
	var alert_1 = __webpack_require__(4);
	var carousel_1 = __webpack_require__(6);
	var collapse_1 = __webpack_require__(3);
	var dropdown_1 = __webpack_require__(7);
	var pager_1 = __webpack_require__(8);
	var pagination_1 = __webpack_require__(9);
	var progressbar_1 = __webpack_require__(10);
	var rating_1 = __webpack_require__(11);
	var tabset_1 = __webpack_require__(12);
	var tooltip_1 = __webpack_require__(13);
	var popover_1 = __webpack_require__(16);
	var radio_1 = __webpack_require__(17);
	var accordion_2 = __webpack_require__(1);
	exports.NgbAccordion = accordion_2.NgbAccordion;
	exports.NgbPanel = accordion_2.NgbPanel;
	exports.NGB_ACCORDION_DIRECTIVES = accordion_2.NGB_ACCORDION_DIRECTIVES;
	var alert_2 = __webpack_require__(4);
	exports.NgbAlert = alert_2.NgbAlert;
	exports.NgbDismissibleAlert = alert_2.NgbDismissibleAlert;
	exports.NGB_ALERT_DIRECTIVES = alert_2.NGB_ALERT_DIRECTIVES;
	var carousel_2 = __webpack_require__(6);
	exports.NgbCarousel = carousel_2.NgbCarousel;
	exports.NgbSlide = carousel_2.NgbSlide;
	exports.NGB_CAROUSEL_DIRECTIVES = carousel_2.NGB_CAROUSEL_DIRECTIVES;
	var collapse_2 = __webpack_require__(3);
	exports.NgbCollapse = collapse_2.NgbCollapse;
	exports.NGB_COLLAPSE_DIRECTIVES = collapse_2.NGB_COLLAPSE_DIRECTIVES;
	var dropdown_2 = __webpack_require__(7);
	exports.NgbDropdown = dropdown_2.NgbDropdown;
	exports.NgbDropdownToggle = dropdown_2.NgbDropdownToggle;
	exports.NGB_DROPDOWN_DIRECTIVES = dropdown_2.NGB_DROPDOWN_DIRECTIVES;
	var pager_2 = __webpack_require__(8);
	exports.NgbPager = pager_2.NgbPager;
	exports.NGB_PAGER_DIRECTIVES = pager_2.NGB_PAGER_DIRECTIVES;
	var pagination_2 = __webpack_require__(9);
	exports.NgbPagination = pagination_2.NgbPagination;
	exports.NGB_PAGINATION_DIRECTIVES = pagination_2.NGB_PAGINATION_DIRECTIVES;
	var progressbar_2 = __webpack_require__(10);
	exports.NgbProgressbar = progressbar_2.NgbProgressbar;
	exports.NGB_PROGRESSBAR_DIRECTIVES = progressbar_2.NGB_PROGRESSBAR_DIRECTIVES;
	var rating_2 = __webpack_require__(11);
	exports.NgbRating = rating_2.NgbRating;
	exports.NGB_RATING_DIRECTIVES = rating_2.NGB_RATING_DIRECTIVES;
	var tabset_2 = __webpack_require__(12);
	exports.NgbTabset = tabset_2.NgbTabset;
	exports.NgbTab = tabset_2.NgbTab;
	exports.NgbTabContent = tabset_2.NgbTabContent;
	exports.NgbTabTitle = tabset_2.NgbTabTitle;
	exports.NGB_TABSET_DIRECTIVES = tabset_2.NGB_TABSET_DIRECTIVES;
	var tooltip_2 = __webpack_require__(13);
	exports.NgbTooltip = tooltip_2.NgbTooltip;
	exports.NgbTooltipWindow = tooltip_2.NgbTooltipWindow;
	exports.NGB_TOOLTIP_DIRECTIVES = tooltip_2.NGB_TOOLTIP_DIRECTIVES;
	var popover_2 = __webpack_require__(16);
	exports.NgbPopover = popover_2.NgbPopover;
	exports.NgbPopoverWindow = popover_2.NgbPopoverWindow;
	exports.NGB_POPOVER_DIRECTIVES = popover_2.NGB_POPOVER_DIRECTIVES;
	var radio_2 = __webpack_require__(17);
	exports.NgbRadioGroup = radio_2.NgbRadioGroup;
	exports.NgbRadioLabel = radio_2.NgbRadioLabel;
	exports.NgbRadio = radio_2.NgbRadio;
	exports.NGB_RADIO_DIRECTIVES = radio_2.NGB_RADIO_DIRECTIVES;
	exports.NGB_DIRECTIVES = [
	    accordion_1.NGB_ACCORDION_DIRECTIVES, alert_1.NGB_ALERT_DIRECTIVES, carousel_1.NGB_CAROUSEL_DIRECTIVES, collapse_1.NGB_COLLAPSE_DIRECTIVES,
	    dropdown_1.NGB_DROPDOWN_DIRECTIVES, pager_1.NGB_PAGER_DIRECTIVES, pagination_1.NGB_PAGINATION_DIRECTIVES, progressbar_1.NGB_PROGRESSBAR_DIRECTIVES,
	    rating_1.NGB_RATING_DIRECTIVES, tabset_1.NGB_TABSET_DIRECTIVES, tooltip_1.NGB_TOOLTIP_DIRECTIVES, popover_1.NGB_POPOVER_DIRECTIVES, radio_1.NGB_RADIO_DIRECTIVES
	];
	exports.NGB_PRECOMPILE = [alert_1.NgbAlert, popover_1.NgbPopoverWindow, tooltip_1.NgbTooltipWindow];

	//# sourceMappingURL=index.js.map


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var collapse_1 = __webpack_require__(3);
	var nextId = 0;
	/**
	 * The NgbPanel directive builds on top of the NgbCollapse directive to provide a panel with collapsible body that can
	 * collapsed or expanded by clicking on the panel's header.
	 */
	var NgbPanel = (function () {
	    function NgbPanel(accordion) {
	        this.accordion = accordion;
	        /**
	         *  A flag determining whether the panel is disabled or not.
	         *  When disabled, the panel cannot be toggled.
	         */
	        this.disabled = false;
	        /**
	         *  An optional id for the panel. The id should be unique.
	         *  If not provided, it will be auto-generated.
	         */
	        this.id = "ngb-panel-" + nextId++;
	        /**
	         *  Defines whether the panel should be open initially.
	         */
	        this.open = false;
	    }
	    NgbPanel.prototype.toggleOpen = function (event) {
	        event.preventDefault();
	        if (!this.disabled) {
	            this.open = !this.open;
	            if (this.open && this.accordion) {
	                this.accordion.closeOthers(this);
	            }
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPanel.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPanel.prototype, "id", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPanel.prototype, "open", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbPanel.prototype, "title", void 0);
	    NgbPanel = __decorate([
	        core_1.Component({
	            selector: 'ngb-panel',
	            exportAs: 'ngbPanel',
	            template: "\n    <div class=\"panel panel-default\" [class.panel-open]=\"open\">\n      <div class=\"panel-heading\" role=\"tab\" [id]=\"id\">\n        <h4 class=\"panel-title\">\n          <a tabindex=\"0\" (click)=\"toggleOpen($event)\"><span [class.text-muted]=\"disabled\">{{title}}</span></a>\n        </h4>\n      </div>\n      <div class=\"panel-collapse\" [ngbCollapse]=\"!open\" [attr.aria-labelledby]=\"id\" role=\"tabpanel\">\n        <div class=\"panel-body\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
	            directives: [collapse_1.NgbCollapse]
	        }),
	        __param(0, core_1.Optional()),
	        __param(0, core_1.Inject(core_1.forwardRef(function () { return NgbAccordion; }))), 
	        __metadata('design:paramtypes', [NgbAccordion])
	    ], NgbPanel);
	    return NgbPanel;
	}());
	exports.NgbPanel = NgbPanel;
	/**
	 * The NgbAccordion directive is a collection of panels.
	 * NgbAccordion can assure that only panel can be opened at a time.
	 */
	var NgbAccordion = (function () {
	    function NgbAccordion() {
	    }
	    NgbAccordion.prototype.closeOthers = function (openPanel) {
	        if (this.closeOtherPanels) {
	            this._panels.forEach(function (panel) {
	                if (panel !== openPanel) {
	                    panel.open = false;
	                }
	            });
	        }
	    };
	    NgbAccordion.prototype.ngAfterContentChecked = function () {
	        var openPanels = this._panels.toArray().filter(function (panel) { return panel.open; });
	        if (openPanels.length > 1) {
	            this.closeOthers(openPanels[0]);
	        }
	    };
	    __decorate([
	        core_1.ContentChildren(NgbPanel), 
	        __metadata('design:type', core_1.QueryList)
	    ], NgbAccordion.prototype, "_panels", void 0);
	    __decorate([
	        core_1.Input('closeOthers'), 
	        __metadata('design:type', Boolean)
	    ], NgbAccordion.prototype, "closeOtherPanels", void 0);
	    NgbAccordion = __decorate([
	        core_1.Component({
	            selector: 'ngb-accordion',
	            host: { 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
	            template: "<ng-content></ng-content>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbAccordion);
	    return NgbAccordion;
	}());
	exports.NgbAccordion = NgbAccordion;
	exports.NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel];

	//# sourceMappingURL=accordion.js.map


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	/**
	 * The NgbCollapse directive provides a simple way to hide and show an element with animations.
	 */
	var NgbCollapse = (function () {
	    function NgbCollapse() {
	        /**
	         * A flag indicating collapsed (true) or open (false) state.
	         */
	        this.collapsed = false;
	    }
	    __decorate([
	        core_1.Input('ngbCollapse'), 
	        __metadata('design:type', Object)
	    ], NgbCollapse.prototype, "collapsed", void 0);
	    NgbCollapse = __decorate([
	        core_1.Directive({
	            selector: '[ngbCollapse]',
	            exportAs: 'ngbCollapse',
	            host: { '[class.collapse]': 'true', '[class.in]': '!collapsed', '[attr.aria-expanded]': '!collapsed' }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbCollapse);
	    return NgbCollapse;
	}());
	exports.NgbCollapse = NgbCollapse;
	exports.NGB_COLLAPSE_DIRECTIVES = [NgbCollapse];

	//# sourceMappingURL=collapse.js.map


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var util_1 = __webpack_require__(5);
	/**
	 * Alerts can be used to provide feedback messages.
	 */
	var NgbAlert = (function () {
	    function NgbAlert() {
	        /**
	         * A flag indicating if a given alert can be dismissed (closed) by a user. If this flag is set, a close button (in a
	         * form of a cross) will be displayed.
	         */
	        this.dismissible = true;
	        /**
	         * Alert type (CSS class). Bootstrap 4 recognizes the following types: "success", "info", "warning" and "danger".
	         */
	        this.type = 'warning';
	        /**
	         * An event emitted when the close button is clicked. This event has no payload. Only relevant for dismissible alerts.
	         */
	        this.close = new core_1.EventEmitter();
	    }
	    NgbAlert.prototype.closeHandler = function () { this.close.emit(null); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbAlert.prototype, "dismissible", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbAlert.prototype, "type", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbAlert.prototype, "close", void 0);
	    NgbAlert = __decorate([
	        core_1.Component({
	            selector: 'ngb-alert',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            template: "\n    <div [class]=\"'alert alert-' + type\" role=\"alert\">\n      <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"closeHandler()\">\n            <span aria-hidden=\"true\">&times;</span>\n      </button>\n      <ng-content></ng-content>\n    </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbAlert);
	    return NgbAlert;
	}());
	exports.NgbAlert = NgbAlert;
	/**
	 * Alerts that can be dismissed without any additional code.
	 */
	var NgbDismissibleAlert = (function () {
	    function NgbDismissibleAlert(_templateRef, _viewContainerRef, _injector, componentFactoryResolver) {
	        this._templateRef = _templateRef;
	        this._viewContainerRef = _viewContainerRef;
	        this._injector = _injector;
	        /**
	         * Alert type (CSS class). Bootstrap 4 recognizes the following types: "success", "info", "warning" and "danger".
	         */
	        this.type = 'warning';
	        /**
	         * An event emitted when the close button is clicked.
	         */
	        this.closeEvent = new core_1.EventEmitter();
	        this._windowFactory = componentFactoryResolver.resolveComponentFactory(NgbAlert);
	    }
	    NgbDismissibleAlert.prototype.close = function () {
	        if (this._windowRef) {
	            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
	            this._windowRef = null;
	        }
	    };
	    NgbDismissibleAlert.prototype.ngOnInit = function () {
	        var _this = this;
	        var nodes = [this._viewContainerRef.createEmbeddedView(this._templateRef).rootNodes];
	        this._windowRef = this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, nodes);
	        this._windowRef.instance.type = this.type;
	        this._windowRef.instance.close.subscribe(function ($event) {
	            _this.closeEvent.emit($event);
	            _this.close();
	        });
	        if (this.dismissOnTimeout) {
	            this._timeout = setTimeout(function () { _this.close(); }, util_1.toInteger(this.dismissOnTimeout));
	        }
	    };
	    NgbDismissibleAlert.prototype.ngOnDestroy = function () { clearTimeout(this._timeout); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDismissibleAlert.prototype, "type", void 0);
	    __decorate([
	        core_1.Output('close'), 
	        __metadata('design:type', Object)
	    ], NgbDismissibleAlert.prototype, "closeEvent", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbDismissibleAlert.prototype, "dismissOnTimeout", void 0);
	    NgbDismissibleAlert = __decorate([
	        core_1.Directive({ selector: 'template[ngbAlert]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, core_1.Injector, core_1.ComponentFactoryResolver])
	    ], NgbDismissibleAlert);
	    return NgbDismissibleAlert;
	}());
	exports.NgbDismissibleAlert = NgbDismissibleAlert;
	exports.NGB_ALERT_DIRECTIVES = [NgbAlert, NgbDismissibleAlert];

	//# sourceMappingURL=alert.js.map


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	function toBoolean(value) {
	    return value === '' ? true : !!value;
	}
	exports.toBoolean = toBoolean;
	function toInteger(value) {
	    return parseInt("" + value, 10);
	}
	exports.toInteger = toInteger;
	function getValueInRange(value, max, min) {
	    if (min === void 0) { min = 0; }
	    return Math.max(Math.min(value, max), min);
	}
	exports.getValueInRange = getValueInRange;

	//# sourceMappingURL=util.js.map


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var nextId = 0;
	/**
	 * Represents an individual slide to be used within a carousel.
	 */
	var NgbSlide = (function () {
	    function NgbSlide(tplRef) {
	        this.tplRef = tplRef;
	        /**
	         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
	         * Will be auto-generated if not provided by a user.
	         */
	        this.id = "ngb-slide-" + nextId++;
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbSlide.prototype, "id", void 0);
	    NgbSlide = __decorate([
	        core_1.Directive({ selector: 'template[ngbSlide]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef])
	    ], NgbSlide);
	    return NgbSlide;
	}());
	exports.NgbSlide = NgbSlide;
	/**
	 * Directive to easily create carousels based on Bootstrap's markup.
	 */
	var NgbCarousel = (function () {
	    function NgbCarousel() {
	        /**
	         *  Amount of time in milliseconds before next slide is shown.
	         */
	        this.interval = 5000;
	        /**
	         *  Whether can wrap from the last to the first slide.
	         */
	        this.wrap = true;
	        /**
	         *  A flag for allowing navigation via keyboard
	         */
	        this.keyboard = true;
	    }
	    NgbCarousel.prototype.ngAfterContentChecked = function () {
	        var activeSlide = this._getSlideById(this.activeId);
	        this.activeId = activeSlide ? activeSlide.id : (this._slides.length ? this._slides.first.id : null);
	    };
	    NgbCarousel.prototype.ngOnInit = function () { this._startTimer(); };
	    NgbCarousel.prototype.ngOnDestroy = function () { clearInterval(this._slideChangeInterval); };
	    NgbCarousel.prototype.select = function (slideIdx) {
	        this._cycleToSelected(slideIdx);
	        this._restartTimer();
	    };
	    NgbCarousel.prototype.prev = function () {
	        this._cycleToPrev();
	        this._restartTimer();
	    };
	    NgbCarousel.prototype.next = function () {
	        this._cycleToNext();
	        this._restartTimer();
	    };
	    NgbCarousel.prototype.pause = function () { this._stopTimer(); };
	    NgbCarousel.prototype.cycle = function () { this._startTimer(); };
	    NgbCarousel.prototype._keyPrev = function () {
	        if (this.keyboard) {
	            this.prev();
	        }
	    };
	    NgbCarousel.prototype._keyNext = function () {
	        if (this.keyboard) {
	            this.next();
	        }
	    };
	    NgbCarousel.prototype._cycleToNext = function () {
	        var selectedId = this._getNextSlide(this.activeId);
	        this._cycleToSelected(selectedId);
	    };
	    NgbCarousel.prototype._cycleToPrev = function () {
	        var selectedId = this._getPrevSlide(this.activeId);
	        this._cycleToSelected(selectedId);
	    };
	    NgbCarousel.prototype._cycleToSelected = function (slideIdx) {
	        var selectedSlide = this._getSlideById(slideIdx);
	        if (selectedSlide) {
	            this.activeId = selectedSlide.id;
	        }
	    };
	    NgbCarousel.prototype._restartTimer = function () {
	        this._stopTimer();
	        this._startTimer();
	    };
	    NgbCarousel.prototype._startTimer = function () {
	        var _this = this;
	        this._slideChangeInterval = setInterval(function () { _this._cycleToNext(); }, this.interval);
	    };
	    NgbCarousel.prototype._stopTimer = function () { clearInterval(this._slideChangeInterval); };
	    NgbCarousel.prototype._getSlideById = function (slideIdx) {
	        var slideWithId = this._slides.filter(function (slide) { return slide.id === slideIdx; });
	        return slideWithId.length ? slideWithId[0] : null;
	    };
	    NgbCarousel.prototype._getNextSlide = function (id) {
	        var _this = this;
	        var nextSlideId = id;
	        var slideArr = this._slides.toArray();
	        slideArr.forEach(function (slide, idx) {
	            if (slide.id === id) {
	                var lastSlide = (idx === (slideArr.length - 1));
	                nextSlideId =
	                    lastSlide ? (_this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) : slideArr[idx + 1].id;
	            }
	        });
	        return nextSlideId;
	    };
	    NgbCarousel.prototype._getPrevSlide = function (id) {
	        var _this = this;
	        var prevSlideId = id;
	        var slideArr = this._slides.toArray();
	        slideArr.forEach(function (slide, idx) {
	            if (slide.id === id) {
	                prevSlideId =
	                    idx === 0 ? (_this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) : slideArr[idx - 1].id;
	            }
	        });
	        return prevSlideId;
	    };
	    __decorate([
	        core_1.ContentChildren(NgbSlide), 
	        __metadata('design:type', core_1.QueryList)
	    ], NgbCarousel.prototype, "_slides", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbCarousel.prototype, "interval", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbCarousel.prototype, "wrap", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbCarousel.prototype, "keyboard", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbCarousel.prototype, "activeId", void 0);
	    NgbCarousel = __decorate([
	        core_1.Component({
	            selector: 'ngb-carousel',
	            exportAs: 'ngbCarousel',
	            host: {
	                'class': 'carousel slide',
	                '[style.display]': '"block"',
	                'tabIndex': '0',
	                '(mouseenter)': 'pause()',
	                '(mouseleave)': 'cycle()',
	                '(keyup.arrowLeft)': '_keyPrev()',
	                '(keyup.arrowRight)': '_keyNext()'
	            },
	            template: "\n    <ol class=\"carousel-indicators\">\n      <li *ngFor=\"let slide of _slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\" (click)=\"_cycleToSelected(slide.id)\"></li>\n    </ol>\n    <div class=\"carousel-inner\" role=\"listbox\">\n      <div *ngFor=\"let slide of _slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <template [ngTemplateOutlet]=\"slide.tplRef\"></template>\n      </div>\n    </div>\n    <a class=\"left carousel-control\" role=\"button\" (click)=\"_cycleToPrev()\">\n      <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"right carousel-control\" role=\"button\" (click)=\"_cycleToNext()\">\n      <span class=\"icon-next\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbCarousel);
	    return NgbCarousel;
	}());
	exports.NgbCarousel = NgbCarousel;
	exports.NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];

	//# sourceMappingURL=carousel.js.map


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	/**
	 * Transforms a node into a dropdown.
	 */
	var NgbDropdown = (function () {
	    function NgbDropdown() {
	        /**
	         * Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
	         */
	        this.autoClose = true;
	        /**
	         *  Defines whether or not the dropdown-menu is open initially.
	         */
	        this._open = false;
	        /**
	         *  An event fired when the dropdown is opened or closed.
	         *  Event's payload equals whether dropdown is open.
	         */
	        this.openChange = new core_1.EventEmitter();
	    }
	    NgbDropdown.prototype.isOpen = function () { return this._open; };
	    NgbDropdown.prototype.open = function () {
	        this._open = true;
	        this.openChange.emit(true);
	    };
	    NgbDropdown.prototype.close = function () {
	        this._open = false;
	        this.openChange.emit(false);
	    };
	    NgbDropdown.prototype.toggle = function () {
	        if (this.isOpen()) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    };
	    NgbDropdown.prototype._closeFromOutside = function () {
	        if (this.autoClose) {
	            this.close();
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDropdown.prototype, "autoClose", void 0);
	    __decorate([
	        core_1.Input('open'), 
	        __metadata('design:type', Object)
	    ], NgbDropdown.prototype, "_open", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbDropdown.prototype, "openChange", void 0);
	    NgbDropdown = __decorate([
	        core_1.Directive({
	            selector: '[ngbDropdown]',
	            exportAs: 'ngbDropdown',
	            host: {
	                'class': 'dropdown',
	                '[class.open]': '_open',
	                '(keyup.esc)': '_closeFromOutside()',
	                '(document:click)': '_closeFromOutside()'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbDropdown);
	    return NgbDropdown;
	}());
	exports.NgbDropdown = NgbDropdown;
	/**
	 * Allows the dropdown to be toggled via click. This directive is optional.
	 */
	var NgbDropdownToggle = (function () {
	    function NgbDropdownToggle(_dropdown) {
	        this._dropdown = _dropdown;
	    }
	    NgbDropdownToggle.prototype.toggleOpen = function ($event) {
	        $event.stopPropagation();
	        this._dropdown.toggle();
	    };
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], NgbDropdownToggle.prototype, "toggleOpen", null);
	    NgbDropdownToggle = __decorate([
	        core_1.Directive({
	            selector: '[ngbDropdownToggle]',
	            host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': '_dropdown.isOpen()' }
	        }), 
	        __metadata('design:paramtypes', [NgbDropdown])
	    ], NgbDropdownToggle);
	    return NgbDropdownToggle;
	}());
	exports.NgbDropdownToggle = NgbDropdownToggle;
	exports.NGB_DROPDOWN_DIRECTIVES = [NgbDropdownToggle, NgbDropdown];

	//# sourceMappingURL=dropdown.js.map


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	/**
	 * A lightweight pager directive that is focused on providing previous/next paging functionality.
	 */
	var NgbPager = (function () {
	    function NgbPager() {
	        this._currentPage = 0; // internal state
	        /**
	         *  A flag for determining whether links need to be aligned.
	         */
	        this.alignLinks = false;
	        /**
	         *  An event fired when the page is changed.
	         *  Event's payload equals the current page.
	         */
	        this.pageChange = new core_1.EventEmitter();
	    }
	    NgbPager.prototype.prev = function () {
	        if (this.hasPrev()) {
	            this.pageChange.emit(--this._currentPage);
	        }
	    };
	    NgbPager.prototype.next = function () {
	        if (this.hasNext()) {
	            this.pageChange.emit(++this._currentPage);
	        }
	    };
	    NgbPager.prototype.hasPrev = function () { return this._currentPage > 0; };
	    NgbPager.prototype.hasNext = function () { return this._currentPage < this.noOfPages - 1; };
	    NgbPager.prototype.ngOnChanges = function () { this._currentPage = Math.max(Math.min(this.page, this.noOfPages - 1), 0); };
	    __decorate([
	        // internal state
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbPager.prototype, "noOfPages", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbPager.prototype, "page", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPager.prototype, "alignLinks", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbPager.prototype, "pageChange", void 0);
	    NgbPager = __decorate([
	        core_1.Component({
	            selector: 'ngb-pager',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            template: "\n    <nav>\n      <ul class=\"pager\">\n        <li [class.disabled]=\"!hasPrev()\" [class.pager-prev]=\"alignLinks\"><a (click)=\"prev()\">Previous</a></li>\n        <li [class.disabled]=\"!hasNext()\" [class.pager-next]=\"alignLinks\"><a (click)=\"next()\">Next</a></li>\n      </ul>\n    </nav>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPager);
	    return NgbPager;
	}());
	exports.NgbPager = NgbPager;
	exports.NGB_PAGER_DIRECTIVES = [NgbPager];

	//# sourceMappingURL=pager.js.map


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var util_1 = __webpack_require__(5);
	/**
	 * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
	 */
	var NgbPagination = (function () {
	    function NgbPagination() {
	        this._boundaryLinks = false;
	        this._directionLinks = true;
	        this._ellipses = true;
	        this._maxSize = 0;
	        this._page = 0;
	        this._pageCount = 0;
	        this._pageSize = 10;
	        this._rotate = false;
	        this.pages = [];
	        /**
	         *  An event fired when the page is changed.
	         *  Event's payload equals the current page.
	         */
	        this.pageChange = new core_1.EventEmitter();
	    }
	    Object.defineProperty(NgbPagination.prototype, "boundaryLinks", {
	        get: function () { return this._boundaryLinks; },
	        /**
	         *  Whether to show the "First" and "Last" page links
	         */
	        set: function (value) {
	            this._boundaryLinks = util_1.toBoolean(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NgbPagination.prototype, "directionLinks", {
	        get: function () { return this._directionLinks; },
	        /**
	         *  Whether to show the "Next" and "Previous" page links
	         */
	        set: function (value) {
	            this._directionLinks = util_1.toBoolean(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NgbPagination.prototype, "ellipses", {
	        get: function () { return this._ellipses; },
	        /**
	         *  Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
	         */
	        set: function (value) {
	            this._ellipses = util_1.toBoolean(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NgbPagination.prototype, "collectionSize", {
	        get: function () { return this._collectionSize; },
	        /**
	         *  Number of items in collection.
	         */
	        set: function (value) {
	            this._collectionSize = util_1.toInteger(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NgbPagination.prototype, "maxSize", {
	        get: function () { return this._maxSize; },
	        /**
	         *  Maximum page numbers to be displayed
	         */
	        set: function (value) {
	            this._maxSize = util_1.toInteger(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NgbPagination.prototype, "page", {
	        get: function () { return this._page; },
	        /**
	         *  Current page.
	         */
	        set: function (value) {
	            this._page = parseInt("" + value, 10);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NgbPagination.prototype, "pageSize", {
	        get: function () { return this._pageSize; },
	        /**
	         *  Number of items per page.
	         */
	        set: function (value) {
	            this._pageSize = util_1.toInteger(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NgbPagination.prototype, "rotate", {
	        get: function () { return this._rotate; },
	        /**
	         *  Whether to rotate pages when maxSize > number of pages.
	         *  Current page will be in the middle
	         */
	        set: function (value) {
	            this._rotate = util_1.toBoolean(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NgbPagination.prototype.hasPrevious = function () { return this.page > 1; };
	    NgbPagination.prototype.hasNext = function () { return this.page < this._pageCount; };
	    NgbPagination.prototype.selectPage = function (pageNumber) {
	        var prevPageNo = this.page;
	        this._page = this._getPageNoInRange(pageNumber);
	        if (this.page !== prevPageNo) {
	            this.pageChange.emit(this.page);
	        }
	        this.ngOnChanges();
	    };
	    NgbPagination.prototype.ngOnChanges = function () {
	        // re-calculate new length of pages
	        this._pageCount = Math.ceil(this._collectionSize / this._pageSize);
	        // fill-in model needed to render pages
	        this.pages.length = 0;
	        for (var i = 1; i <= this._pageCount; i++) {
	            this.pages.push(i);
	        }
	        // get selected page
	        this._page = this._getPageNoInRange(this.page);
	        // apply maxSize if necessary
	        if (this._maxSize > 0 && this._pageCount > this._maxSize) {
	            var start = 0;
	            var end = this._pageCount;
	            // either paginating or rotating page numbers
	            if (this._rotate) {
	                _a = this._applyRotation(), start = _a[0], end = _a[1];
	            }
	            else {
	                _b = this._applyPagination(), start = _b[0], end = _b[1];
	            }
	            this.pages = this.pages.slice(start, end);
	            // adding ellipses
	            this._applyEllipses(start, end);
	        }
	        var _a, _b;
	    };
	    /**
	     * Appends ellipses and first/last page number to the displayed pages
	     */
	    NgbPagination.prototype._applyEllipses = function (start, end) {
	        if (this._ellipses) {
	            if (start > 0) {
	                this.pages.unshift(-1);
	                this.pages.unshift(1);
	            }
	            if (end < this._pageCount) {
	                this.pages.push(-1);
	                this.pages.push(this._pageCount);
	            }
	        }
	    };
	    /**
	     * Rotates page numbers based on maxSize items visible.
	     * Currently selected page stays in the middle:
	     *
	     * Ex. for selected page = 6:
	     * [5,*6*,7] for maxSize = 3
	     * [4,5,*6*,7] for maxSize = 4
	     */
	    NgbPagination.prototype._applyRotation = function () {
	        var start = 0;
	        var end = this._pageCount;
	        var leftOffset = Math.floor(this._maxSize / 2);
	        var rightOffset = this._maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
	        if (this._page <= leftOffset) {
	            // very beginning, no rotation -> [0..maxSize]
	            end = this._maxSize;
	        }
	        else if (this._pageCount - this._page < leftOffset) {
	            // very end, no rotation -> [len-maxSize..len]
	            start = this._pageCount - this._maxSize;
	        }
	        else {
	            // rotate
	            start = this._page - leftOffset - 1;
	            end = this._page + rightOffset;
	        }
	        return [start, end];
	    };
	    /**
	     * Paginates page numbers based on maxSize items per page
	     */
	    NgbPagination.prototype._applyPagination = function () {
	        var page = Math.ceil(this._page / this._maxSize) - 1;
	        var start = page * this._maxSize;
	        var end = start + this._maxSize;
	        return [start, end];
	    };
	    NgbPagination.prototype._isEllipsis = function (pageNumber) { return pageNumber === -1; };
	    NgbPagination.prototype._getPageNoInRange = function (newPageNo) { return util_1.getValueInRange(newPageNo, this._pageCount, 1); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean), 
	        __metadata('design:paramtypes', [Boolean])
	    ], NgbPagination.prototype, "boundaryLinks", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean), 
	        __metadata('design:paramtypes', [Boolean])
	    ], NgbPagination.prototype, "directionLinks", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean), 
	        __metadata('design:paramtypes', [Boolean])
	    ], NgbPagination.prototype, "ellipses", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], NgbPagination.prototype, "collectionSize", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], NgbPagination.prototype, "maxSize", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], NgbPagination.prototype, "page", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], NgbPagination.prototype, "pageSize", null);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "pageChange", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean), 
	        __metadata('design:paramtypes', [Boolean])
	    ], NgbPagination.prototype, "rotate", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "size", void 0);
	    NgbPagination = __decorate([
	        core_1.Component({
	            selector: 'ngb-pagination',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            template: "\n    <nav>\n      <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n        <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasPrevious()\">\n          <a aria-label=\"First\" class=\"page-link\" (click)=\"selectPage(1)\">\n            <span aria-hidden=\"true\">&laquo;&laquo;</span>\n            <span class=\"sr-only\">First</span>\n          </a>                \n        </li>\n      \n        <li *ngIf=\"directionLinks\"class=\"page-item\" [class.disabled]=\"!hasPrevious()\">\n          <a aria-label=\"Previous\" class=\"page-link\" (click)=\"selectPage(page-1)\">\n            <span aria-hidden=\"true\">&laquo;</span>\n            <span class=\"sr-only\">Previous</span>\n          </a>\n        </li>\n\n        <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\" \n          [class.disabled]=\"_isEllipsis(pageNumber)\">\n          <a *ngIf=\"_isEllipsis(pageNumber)\" class=\"page-link\">...</a>\n          <a *ngIf=\"!_isEllipsis(pageNumber)\" class=\"page-link\" (click)=\"selectPage(pageNumber)\">{{pageNumber}}</a>\n        </li>\n\n        <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasNext()\">\n          <a aria-label=\"Next\" class=\"page-link\" (click)=\"selectPage(page+1)\">\n            <span aria-hidden=\"true\">&raquo;</span>\n            <span class=\"sr-only\">Next</span>\n          </a>\n        </li>\n        \n        <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasNext()\">\n          <a aria-label=\"Last\" class=\"page-link\" (click)=\"selectPage(_pageCount)\">\n            <span aria-hidden=\"true\">&raquo;&raquo;</span>\n            <span class=\"sr-only\">Last</span>\n          </a>                \n        </li>        \n      </ul>\n    </nav>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPagination);
	    return NgbPagination;
	}());
	exports.NgbPagination = NgbPagination;
	exports.NGB_PAGINATION_DIRECTIVES = [NgbPagination];

	//# sourceMappingURL=pagination.js.map


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var util_1 = __webpack_require__(5);
	/**
	 * Directive that can be used to provide feedback on the progress of a workflow or an action.
	 */
	var NgbProgressbar = (function () {
	    function NgbProgressbar() {
	        /**
	         * Maximal value to be displayed in the progressbar.
	         */
	        this.max = 100;
	        /**
	         * A flag indicating if a progress bar should be animated when the value changes. Takes effect only for browsers
	         * supporting CSS3 animations.
	         */
	        this.animated = false;
	        /**
	         * A flag indicating if a progress bar should be displayed as striped.
	         */
	        this.striped = false;
	        /**
	         * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
	         */
	        this.value = 0;
	    }
	    NgbProgressbar.prototype.isAnimated = function () { return util_1.toBoolean(this.animated); };
	    NgbProgressbar.prototype.isStriped = function () { return util_1.toBoolean(this.striped); };
	    NgbProgressbar.prototype.getValue = function () { return util_1.getValueInRange(this.value, this.max); };
	    NgbProgressbar.prototype.getPercentValue = function () { return 100 * this.getValue() / this.max; };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbProgressbar.prototype, "max", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbProgressbar.prototype, "animated", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbProgressbar.prototype, "striped", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbProgressbar.prototype, "type", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbProgressbar.prototype, "value", void 0);
	    NgbProgressbar = __decorate([
	        core_1.Component({
	            selector: 'ngb-progressbar',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            template: "\n    <progress class=\"progress {{isAnimated() && 'progress-animated'}} {{isStriped() && 'progress-striped'}} {{type && 'progress-' + type}}\"\n      [value]=\"getValue()\" [max]=\"max\">\n      <div class=\"progress\">\n        <span class=\"progress-bar\" [style.width.%]=\"getPercentValue()\"><ng-content></ng-content></span>\n      </div>\n    </progress>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbProgressbar);
	    return NgbProgressbar;
	}());
	exports.NgbProgressbar = NgbProgressbar;
	exports.NGB_PROGRESSBAR_DIRECTIVES = [NgbProgressbar];

	//# sourceMappingURL=progressbar.js.map


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	/**
	 * Rating directive that will take care of visualising a star rating bar.
	 */
	var NgbRating = (function () {
	    function NgbRating() {
	        this.range = [];
	        /**
	         * Maximal rating that can be given using this widget.
	         */
	        this.max = 10;
	        /**
	         * A flag indicating if rating can be updated.
	         */
	        this.readonly = false;
	        /**
	         * An event fired when a user is hovering over a given rating.
	         * Event's payload equals to the rating being hovered over.
	         */
	        this.hover = new core_1.EventEmitter();
	        /**
	         * An event fired when a user stops hovering over a given rating.
	         * Event's payload equals to the rating of the last item being hovered over.
	         */
	        this.leave = new core_1.EventEmitter();
	        /**
	         * An event fired when a user selects a new rating.
	         * Event's payload equals to the newly selected rating.
	         */
	        this.rateChange = new core_1.EventEmitter();
	    }
	    NgbRating.prototype.enter = function (value) {
	        if (!this.readonly) {
	            this.rate = value;
	        }
	        this.hover.emit(value);
	    };
	    NgbRating.prototype.ngOnInit = function () {
	        this._oldRate = this.rate;
	        this.range = this._buildTemplateObjects();
	    };
	    NgbRating.prototype.reset = function () {
	        this.leave.emit(this.rate);
	        this.rate = this._oldRate;
	    };
	    NgbRating.prototype.update = function (value) {
	        if (!this.readonly) {
	            this._oldRate = value;
	            this.rate = value;
	            this.rateChange.emit(value);
	        }
	    };
	    NgbRating.prototype._buildTemplateObjects = function () {
	        var range = [];
	        for (var i = 1; i <= this.max; i++) {
	            range.push({ title: i });
	        }
	        return range;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbRating.prototype, "max", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbRating.prototype, "rate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbRating.prototype, "readonly", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbRating.prototype, "hover", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbRating.prototype, "leave", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbRating.prototype, "rateChange", void 0);
	    NgbRating = __decorate([
	        core_1.Component({
	            selector: 'ngb-rating',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            template: "\n    <span tabindex=\"0\" (mouseleave)=\"reset()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"rate\">\n      <template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\n        <span class=\"sr-only\">({{ index < rate ? '*' : ' ' }})</span>\n        <span (mouseenter)=\"enter(index + 1)\" (click)=\"update(index + 1)\" [title]=\"r.title\" \n        [attr.aria-valuetext]=\"r.title\">{{ index < rate ? '&#9733;' : '&#9734;' }}</span>\n      </template>\n    </span>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbRating);
	    return NgbRating;
	}());
	exports.NgbRating = NgbRating;
	exports.NGB_RATING_DIRECTIVES = [NgbRating];

	//# sourceMappingURL=rating.js.map


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var nextId = 0;
	/**
	 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
	 */
	var NgbTabTitle = (function () {
	    function NgbTabTitle(templateRef) {
	        this.templateRef = templateRef;
	    }
	    NgbTabTitle = __decorate([
	        core_1.Directive({ selector: 'template[ngbTabTitle]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef])
	    ], NgbTabTitle);
	    return NgbTabTitle;
	}());
	exports.NgbTabTitle = NgbTabTitle;
	/**
	 * This directive must be used to wrap content to be displayed in a tab.
	 */
	var NgbTabContent = (function () {
	    function NgbTabContent(templateRef) {
	        this.templateRef = templateRef;
	    }
	    NgbTabContent = __decorate([
	        core_1.Directive({ selector: 'template[ngbTabContent]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef])
	    ], NgbTabContent);
	    return NgbTabContent;
	}());
	exports.NgbTabContent = NgbTabContent;
	/**
	 * A directive representing an individual tab.
	 */
	var NgbTab = (function () {
	    function NgbTab() {
	        /**
	         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
	         */
	        this.id = "ngb-tab-" + nextId++;
	        /**
	         * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
	         */
	        this.disabled = false;
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbTab.prototype, "id", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbTab.prototype, "title", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbTab.prototype, "disabled", void 0);
	    __decorate([
	        core_1.ContentChild(NgbTabContent), 
	        __metadata('design:type', NgbTabContent)
	    ], NgbTab.prototype, "contentTpl", void 0);
	    __decorate([
	        core_1.ContentChild(NgbTabTitle), 
	        __metadata('design:type', NgbTabTitle)
	    ], NgbTab.prototype, "titleTpl", void 0);
	    NgbTab = __decorate([
	        core_1.Directive({ selector: 'ngb-tab' }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTab);
	    return NgbTab;
	}());
	exports.NgbTab = NgbTab;
	/**
	 * A component that makes it easy to create tabbed interface.
	 */
	var NgbTabset = (function () {
	    function NgbTabset() {
	        /**
	         * Type of navigation to be used for tabs. Can be one of 'tabs' or 'pills'.
	         */
	        this.type = 'tabs';
	        /**
	         * A tab change event fired right before the tab selection happens.  The event object has three properties:
	         * 'activeId', the id of the currently active tab, 'nextId' the id of the newly selected tab, and a function,
	         * 'preventDefault()' which, when executed, will prevent the tab change from occurring.
	         */
	        this.change = new core_1.EventEmitter();
	    }
	    NgbTabset.prototype.select = function (tabIdx) {
	        var selectedTab = this._getTabById(tabIdx);
	        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
	            var defaultPrevented_1 = false;
	            this.change.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: function () { defaultPrevented_1 = true; } });
	            if (!defaultPrevented_1) {
	                this.activeId = selectedTab.id;
	            }
	        }
	    };
	    NgbTabset.prototype.ngAfterContentChecked = function () {
	        // auto-correct activeId that might have been set incorrectly as input
	        var activeTab = this._getTabById(this.activeId);
	        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
	    };
	    NgbTabset.prototype._getTabById = function (id) {
	        var tabsWithId = this.tabs.filter(function (tab) { return tab.id === id; });
	        return tabsWithId.length ? tabsWithId[0] : null;
	    };
	    __decorate([
	        core_1.ContentChildren(NgbTab), 
	        __metadata('design:type', core_1.QueryList)
	    ], NgbTabset.prototype, "tabs", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbTabset.prototype, "activeId", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbTabset.prototype, "type", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbTabset.prototype, "change", void 0);
	    NgbTabset = __decorate([
	        core_1.Component({
	            selector: 'ngb-tabset',
	            exportAs: 'ngbTabset',
	            template: "\n    <ul [class]=\"'nav nav-' + type\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\" (click)=\"select(tab.id)\">\n          {{tab.title}}<template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <div *ngFor=\"let tab of tabs\" class=\"tab-pane\" [class.active]=\"tab.id === activeId\" role=\"tabpanel\" [attr.aria-labelledby]=\"tab.id\">\n        <template [ngTemplateOutlet]=\"tab.contentTpl.templateRef\"></template>\n      </div>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTabset);
	    return NgbTabset;
	}());
	exports.NgbTabset = NgbTabset;
	exports.NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle];

	//# sourceMappingURL=tabset.js.map


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var triggers_1 = __webpack_require__(14);
	var positioning_1 = __webpack_require__(15);
	var NgbTooltipWindow = (function () {
	    function NgbTooltipWindow() {
	        this.placement = 'top';
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbTooltipWindow.prototype, "placement", void 0);
	    NgbTooltipWindow = __decorate([
	        core_1.Component({
	            selector: 'ngb-tooltip-window',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            host: { '[class]': '"tooltip in tooltip-" + placement', 'role': 'tooltip' },
	            template: "\n    <div class=\"tooltip-arrow\"></div>\n    <div class=\"tooltip-inner\"><ng-content></ng-content></div>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTooltipWindow);
	    return NgbTooltipWindow;
	}());
	exports.NgbTooltipWindow = NgbTooltipWindow;
	/**
	 * A lightweight, extensible directive for fancy tooltip creation.
	 */
	var NgbTooltip = (function () {
	    function NgbTooltip(_elementRef, _viewContainerRef, _injector, _renderer, componentFactoryResolver) {
	        this._elementRef = _elementRef;
	        this._viewContainerRef = _viewContainerRef;
	        this._injector = _injector;
	        this._renderer = _renderer;
	        /**
	         * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
	         */
	        this.placement = 'top';
	        /**
	         * Specifies events that should trigger. Supports a space separated list of event names.
	         */
	        this.triggers = 'hover';
	        this._positioning = new positioning_1.Positioning();
	        this._windowFactory = componentFactoryResolver.resolveComponentFactory(NgbTooltipWindow);
	    }
	    NgbTooltip.prototype.open = function () {
	        if (!this._windowRef) {
	            var nodes = this._getContentNodes();
	            this._windowRef = this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, nodes);
	            this._windowRef.instance.placement = this.placement;
	        }
	    };
	    NgbTooltip.prototype.close = function () {
	        if (this._windowRef) {
	            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
	            this._windowRef = null;
	        }
	    };
	    NgbTooltip.prototype.toggle = function () {
	        if (this._windowRef) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    };
	    NgbTooltip.prototype.ngOnInit = function () {
	        var _this = this;
	        var triggers = triggers_1.parseTriggers(this.triggers);
	        if (triggers.length === 1 && triggers[0].isManual()) {
	            return;
	        }
	        triggers.forEach(function (trigger) {
	            if (trigger.open === trigger.close) {
	                _this._renderer.listen(_this._elementRef.nativeElement, trigger.open, function () { _this.toggle(); });
	            }
	            else {
	                _this._renderer.listen(_this._elementRef.nativeElement, trigger.open, function () { _this.open(); });
	                _this._renderer.listen(_this._elementRef.nativeElement, trigger.close, function () { _this.close(); });
	            }
	        });
	    };
	    NgbTooltip.prototype.ngAfterViewChecked = function () {
	        if (this._windowRef) {
	            var targetPosition = this._positioning.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, false);
	            var targetStyle = this._windowRef.location.nativeElement.style;
	            targetStyle.top = targetPosition.top + "px";
	            targetStyle.left = targetPosition.left + "px";
	        }
	    };
	    NgbTooltip.prototype._getContentNodes = function () {
	        if (this.ngbTooltip instanceof core_1.TemplateRef) {
	            return [this._viewContainerRef.createEmbeddedView(this.ngbTooltip).rootNodes];
	        }
	        else {
	            return [[this._renderer.createText(null, "" + this.ngbTooltip)]];
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTooltip.prototype, "ngbTooltip", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTooltip.prototype, "placement", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTooltip.prototype, "triggers", void 0);
	    NgbTooltip = __decorate([
	        core_1.Directive({ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.Injector, core_1.Renderer, core_1.ComponentFactoryResolver])
	    ], NgbTooltip);
	    return NgbTooltip;
	}());
	exports.NgbTooltip = NgbTooltip;
	exports.NGB_TOOLTIP_DIRECTIVES = [NgbTooltip];

	//# sourceMappingURL=tooltip.js.map


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var Trigger = (function () {
	    function Trigger(open, close) {
	        this.open = open;
	        this.close = close;
	        if (!close) {
	            this.close = open;
	        }
	    }
	    Trigger.prototype.isManual = function () { return this.open === 'manual' || this.close === 'manual'; };
	    return Trigger;
	}());
	exports.Trigger = Trigger;
	var DEFAULT_ALIASES = {
	    hover: ['mouseenter', 'mouseleave']
	};
	function parseTriggers(triggers, aliases) {
	    if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
	    var trimmedTriggers = (triggers || '').trim();
	    if (trimmedTriggers.length === 0) {
	        return [];
	    }
	    var parsedTriggers = trimmedTriggers.split(/\s+/).map(function (trigger) { return trigger.split(':'); }).map(function (triggerPair) {
	        var alias = aliases[triggerPair[0]] || triggerPair;
	        return new Trigger(alias[0], alias[1]);
	    });
	    var manualTriggers = parsedTriggers.filter(function (triggerPair) { return triggerPair.isManual(); });
	    if (manualTriggers.length > 1) {
	        throw 'Triggers parse error: only one manual trigger is allowed';
	    }
	    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
	        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
	    }
	    return parsedTriggers;
	}
	exports.parseTriggers = parseTriggers;

	//# sourceMappingURL=triggers.js.map


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	// previous version:
	// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
	var Positioning = (function () {
	    function Positioning() {
	    }
	    Positioning.prototype.getStyle = function (element, prop) { return window.getComputedStyle(element)[prop]; };
	    Positioning.prototype.isStaticPositioned = function (element) {
	        return (this.getStyle(element, 'position') || 'static') === 'static';
	    };
	    Positioning.prototype.parentOffsetElement = function (element) {
	        var offsetParentEl = element.offsetParent || document.documentElement;
	        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
	            offsetParentEl = offsetParentEl.offsetParent;
	        }
	        return offsetParentEl || document.documentElement;
	    };
	    Positioning.prototype.position = function (element) {
	        var elOffset = this.offset(element);
	        var offsetParentEl = this.parentOffsetElement(element);
	        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
	        if (offsetParentEl !== document.documentElement) {
	            parentOffset = this.offset(offsetParentEl);
	            parentOffset.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
	            parentOffset.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
	        }
	        return {
	            height: elOffset.height,
	            width: elOffset.width,
	            top: elOffset.top - parentOffset.top,
	            bottom: elOffset.bottom - parentOffset.top,
	            left: elOffset.left - parentOffset.left,
	            right: elOffset.right - parentOffset.left
	        };
	    };
	    Positioning.prototype.offset = function (element) {
	        var elBcr = element.getBoundingClientRect();
	        return {
	            height: elBcr.height || element.offsetHeight,
	            width: elBcr.width || element.offsetWidth,
	            top: elBcr.top + (window.pageYOffset || document.documentElement.scrollTop),
	            bottom: elBcr.bottom + (window.pageYOffset || document.documentElement.scrollTop),
	            left: elBcr.left + (window.pageXOffset || document.documentElement.scrollLeft),
	            right: elBcr.right + (window.pageXOffset || document.documentElement.scrollLeft)
	        };
	    };
	    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
	        var hostElPosition = appendToBody ? this.offset(hostElement) : this.position(hostElement);
	        var shiftWidth = {
	            left: hostElPosition.left,
	            center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
	            right: hostElPosition.left + hostElPosition.width
	        };
	        var shiftHeight = {
	            top: hostElPosition.top,
	            center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
	            bottom: hostElPosition.top + hostElPosition.height
	        };
	        var targetElBCR = targetElement.getBoundingClientRect();
	        var placementPrimary = placement.split('-')[0] || 'top';
	        var placementSecondary = placement.split('-')[1] || 'center';
	        var targetElPosition = {
	            height: targetElBCR.height || targetElement.offsetHeight,
	            width: targetElBCR.width || targetElement.offsetWidth,
	            top: 0,
	            bottom: targetElBCR.height || targetElement.offsetHeight,
	            left: 0,
	            right: targetElBCR.width || targetElement.offsetWidth
	        };
	        switch (placementPrimary) {
	            case 'top':
	                targetElPosition.top = hostElPosition.top - targetElement.offsetHeight;
	                targetElPosition.bottom += hostElPosition.top - targetElement.offsetHeight;
	                targetElPosition.left = shiftWidth[placementSecondary];
	                targetElPosition.right += shiftWidth[placementSecondary];
	                break;
	            case 'bottom':
	                targetElPosition.top = shiftHeight[placementPrimary];
	                targetElPosition.bottom += shiftHeight[placementPrimary];
	                targetElPosition.left = shiftWidth[placementSecondary];
	                targetElPosition.right += shiftWidth[placementSecondary];
	                break;
	            case 'left':
	                targetElPosition.top = shiftHeight[placementSecondary];
	                targetElPosition.bottom += shiftHeight[placementSecondary];
	                targetElPosition.left = hostElPosition.left - targetElement.offsetWidth;
	                targetElPosition.right += hostElPosition.left - targetElement.offsetWidth;
	                break;
	            case 'right':
	                targetElPosition.top = shiftHeight[placementSecondary];
	                targetElPosition.bottom += shiftHeight[placementSecondary];
	                targetElPosition.left = shiftWidth[placementPrimary];
	                targetElPosition.right += shiftWidth[placementPrimary];
	                break;
	        }
	        return targetElPosition;
	    };
	    return Positioning;
	}());
	exports.Positioning = Positioning;

	//# sourceMappingURL=positioning.js.map


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var triggers_1 = __webpack_require__(14);
	var positioning_1 = __webpack_require__(15);
	var NgbPopoverWindow = (function () {
	    function NgbPopoverWindow() {
	        this.placement = 'top';
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbPopoverWindow.prototype, "placement", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbPopoverWindow.prototype, "title", void 0);
	    NgbPopoverWindow = __decorate([
	        core_1.Component({
	            selector: 'ngb-popover-window',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            host: { '[class]': '"popover in popover-" + placement', 'role': 'tooltip' },
	            template: "\n    <div class=\"popover-arrow\"></div>\n    <h3 class=\"popover-title\">{{title}}</h3><div class=\"popover-content\"><ng-content></ng-content></div>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPopoverWindow);
	    return NgbPopoverWindow;
	}());
	exports.NgbPopoverWindow = NgbPopoverWindow;
	/**
	 * A lightweight, extensible directive for fancy popover creation.
	 */
	var NgbPopover = (function () {
	    function NgbPopover(_elementRef, _viewContainerRef, _injector, _renderer, componentFactoryResolver) {
	        this._elementRef = _elementRef;
	        this._viewContainerRef = _viewContainerRef;
	        this._injector = _injector;
	        this._renderer = _renderer;
	        /**
	         * Placement of a popover. Accepts: "top", "bottom", "left", "right"
	         */
	        this.placement = 'top';
	        /**
	         * Specifies events that should trigger. Supports a space separated list of event names.
	         */
	        this.triggers = 'click';
	        this._positioning = new positioning_1.Positioning();
	        this._windowFactory = componentFactoryResolver.resolveComponentFactory(NgbPopoverWindow);
	    }
	    NgbPopover.prototype.open = function () {
	        if (!this._windowRef) {
	            var nodes = this._getContentNodes();
	            this._windowRef = this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, nodes);
	            this._windowRef.instance.placement = this.placement;
	            this._windowRef.instance.title = this.title;
	        }
	    };
	    NgbPopover.prototype.close = function () {
	        if (this._windowRef) {
	            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
	            this._windowRef = null;
	        }
	    };
	    NgbPopover.prototype.toggle = function () {
	        if (this._windowRef) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    };
	    NgbPopover.prototype.ngOnInit = function () {
	        var _this = this;
	        var triggers = triggers_1.parseTriggers(this.triggers);
	        if (triggers.length === 1 && triggers[0].isManual()) {
	            return;
	        }
	        triggers.forEach(function (trigger) {
	            if (trigger.open === trigger.close) {
	                _this._renderer.listen(_this._elementRef.nativeElement, trigger.open, function () { _this.toggle(); });
	            }
	            else {
	                _this._renderer.listen(_this._elementRef.nativeElement, trigger.open, function () { _this.open(); });
	                _this._renderer.listen(_this._elementRef.nativeElement, trigger.close, function () { _this.close(); });
	            }
	        });
	    };
	    NgbPopover.prototype.ngAfterViewChecked = function () {
	        if (this._windowRef) {
	            var targetPosition = this._positioning.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, false);
	            var targetStyle = this._windowRef.location.nativeElement.style;
	            targetStyle.top = targetPosition.top + "px";
	            targetStyle.left = targetPosition.left + "px";
	        }
	    };
	    NgbPopover.prototype._getContentNodes = function () {
	        if (this.ngbPopover instanceof core_1.TemplateRef) {
	            return [this._viewContainerRef.createEmbeddedView(this.ngbPopover).rootNodes];
	        }
	        else {
	            return [[this._renderer.createText(null, "" + this.ngbPopover)]];
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPopover.prototype, "ngbPopover", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbPopover.prototype, "title", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPopover.prototype, "placement", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPopover.prototype, "triggers", void 0);
	    NgbPopover = __decorate([
	        core_1.Directive({ selector: '[ngbPopover]', exportAs: 'ngbPopover' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.Injector, core_1.Renderer, core_1.ComponentFactoryResolver])
	    ], NgbPopover);
	    return NgbPopover;
	}());
	exports.NgbPopover = NgbPopover;
	exports.NGB_POPOVER_DIRECTIVES = [NgbPopover];

	//# sourceMappingURL=popover.js.map


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(18);
	var NGB_RADIO_VALUE_ACCESSOR = {
	    provide: common_1.NG_VALUE_ACCESSOR,
	    useExisting: core_1.forwardRef(function () { return NgbRadioGroup; }),
	    multi: true
	};
	/**
	 * Easily create Bootstrap-style radio buttons. A value of a selected button is bound to a variable
	 * specified via ngModel.
	 */
	var NgbRadioGroup = (function () {
	    function NgbRadioGroup() {
	        this._radios = new Set();
	        this._value = null;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	    }
	    NgbRadioGroup.prototype.onRadioChange = function (radio) {
	        this.writeValue(radio.value);
	        this.onChange(radio.value);
	    };
	    NgbRadioGroup.prototype.onRadioValueUpdate = function () { this._updateRadios(); };
	    NgbRadioGroup.prototype.register = function (radio) { this._radios.add(radio); };
	    NgbRadioGroup.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    NgbRadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    NgbRadioGroup.prototype.unregister = function (radio) { this._radios.delete(radio); };
	    NgbRadioGroup.prototype.writeValue = function (value) {
	        this._value = value;
	        this._updateRadios();
	    };
	    NgbRadioGroup.prototype._updateRadios = function () {
	        var _this = this;
	        this._radios.forEach(function (radio) { return radio.markChecked(_this._value); });
	    };
	    NgbRadioGroup = __decorate([
	        core_1.Directive({
	            selector: '[ngbRadioGroup][ngModel]',
	            host: { 'data-toggle': 'buttons', 'class': 'btn-group' },
	            providers: [NGB_RADIO_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbRadioGroup);
	    return NgbRadioGroup;
	}());
	exports.NgbRadioGroup = NgbRadioGroup;
	var NgbRadioLabel = (function () {
	    function NgbRadioLabel() {
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbRadioLabel.prototype, "checked", void 0);
	    NgbRadioLabel = __decorate([
	        core_1.Directive({ selector: 'label.btn', host: { '[class.active]': 'checked' } }), 
	        __metadata('design:paramtypes', [])
	    ], NgbRadioLabel);
	    return NgbRadioLabel;
	}());
	exports.NgbRadioLabel = NgbRadioLabel;
	/**
	 * Marks an input of type "radio" as part of the NgbRadioGroup.
	 */
	var NgbRadio = (function () {
	    function NgbRadio(_group, _label, _renderer, _element) {
	        this._group = _group;
	        this._label = _label;
	        this._renderer = _renderer;
	        this._element = _element;
	        this._value = null;
	        if (this._group) {
	            this._group.register(this);
	        }
	    }
	    Object.defineProperty(NgbRadio.prototype, "value", {
	        get: function () { return this._value; },
	        /**
	         * You can specify model value of a given radio by binding to the value property.
	        */
	        set: function (value) {
	            this._value = value;
	            var stringValue = value ? value.toString() : '';
	            this._renderer.setElementProperty(this._element.nativeElement, 'value', stringValue);
	            if (this._group) {
	                this._group.onRadioValueUpdate();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NgbRadio.prototype.markChecked = function (value) {
	        this._checked = (this.value === value && value !== null);
	        this._label.checked = this._checked;
	    };
	    NgbRadio.prototype.ngOnDestroy = function () {
	        if (this._group) {
	            this._group.unregister(this);
	        }
	    };
	    NgbRadio.prototype.onChange = function () {
	        if (this._group) {
	            this._group.onRadioChange(this);
	        }
	    };
	    __decorate([
	        core_1.Input('value'), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], NgbRadio.prototype, "value", null);
	    NgbRadio = __decorate([
	        core_1.Directive({ selector: 'input[type=radio]', host: { '(change)': 'onChange($event.target.value)', '[checked]': '_checked' } }),
	        __param(0, core_1.Optional()),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [NgbRadioGroup, NgbRadioLabel, core_1.Renderer, core_1.ElementRef])
	    ], NgbRadio);
	    return NgbRadio;
	}());
	exports.NgbRadio = NgbRadio;
	exports.NGB_RADIO_DIRECTIVES = [NgbRadio, NgbRadioLabel, NgbRadioGroup];

	//# sourceMappingURL=radio.js.map


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }
/******/ ])
});
;