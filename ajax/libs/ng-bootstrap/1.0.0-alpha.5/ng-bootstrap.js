(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Rx"), require("rxjs/add/operator/let"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms", "rxjs/Rx", "rxjs/add/operator/let"], factory);
	else if(typeof exports === 'object')
		exports["ngb"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Rx"), require("rxjs/add/operator/let"));
	else
		root["ngb"] = factory(root["ng"]["core"], root["ng"]["common"], root["ng"]["forms"], root["Rx"], root["Rx"]["Observable"]["prototype"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_72__, __WEBPACK_EXTERNAL_MODULE_89__) {
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
	var core_1 = __webpack_require__(1);
	var accordion_module_1 = __webpack_require__(2);
	var alert_module_1 = __webpack_require__(7);
	var radio_module_1 = __webpack_require__(11);
	var carousel_module_1 = __webpack_require__(14);
	var collapse_module_1 = __webpack_require__(17);
	var datepicker_module_1 = __webpack_require__(19);
	var dropdown_module_1 = __webpack_require__(34);
	var modal_module_1 = __webpack_require__(37);
	var pagination_module_1 = __webpack_require__(45);
	var popover_module_1 = __webpack_require__(48);
	var progressbar_module_1 = __webpack_require__(52);
	var rating_module_1 = __webpack_require__(55);
	var tabset_module_1 = __webpack_require__(58);
	var timepicker_module_1 = __webpack_require__(61);
	var tooltip_module_1 = __webpack_require__(65);
	var typeahead_module_1 = __webpack_require__(68);
	var accordion_module_2 = __webpack_require__(2);
	exports.NgbAccordionConfig = accordion_module_2.NgbAccordionConfig;
	var modal_module_2 = __webpack_require__(37);
	exports.NgbModal = modal_module_2.NgbModal;
	exports.NgbModalRef = modal_module_2.NgbModalRef;
	exports.ModalDismissReasons = modal_module_2.ModalDismissReasons;
	var alert_module_2 = __webpack_require__(7);
	exports.NgbAlertConfig = alert_module_2.NgbAlertConfig;
	exports.NgbSelfClosingAlertConfig = alert_module_2.NgbSelfClosingAlertConfig;
	var carousel_module_2 = __webpack_require__(14);
	exports.NgbCarouselConfig = carousel_module_2.NgbCarouselConfig;
	var datepicker_module_2 = __webpack_require__(19);
	exports.NgbDatepickerI18n = datepicker_module_2.NgbDatepickerI18n;
	exports.NgbDatepickerConfig = datepicker_module_2.NgbDatepickerConfig;
	var dropdown_module_2 = __webpack_require__(34);
	exports.NgbDropdownConfig = dropdown_module_2.NgbDropdownConfig;
	var pagination_module_2 = __webpack_require__(45);
	exports.NgbPaginationConfig = pagination_module_2.NgbPaginationConfig;
	var popover_module_2 = __webpack_require__(48);
	exports.NgbPopoverConfig = popover_module_2.NgbPopoverConfig;
	var progressbar_module_2 = __webpack_require__(52);
	exports.NgbProgressbarConfig = progressbar_module_2.NgbProgressbarConfig;
	var rating_module_2 = __webpack_require__(55);
	exports.NgbRatingConfig = rating_module_2.NgbRatingConfig;
	var timepicker_module_2 = __webpack_require__(61);
	exports.NgbTimepickerConfig = timepicker_module_2.NgbTimepickerConfig;
	var tabset_module_2 = __webpack_require__(58);
	exports.NgbTabsetConfig = tabset_module_2.NgbTabsetConfig;
	var tooltip_module_2 = __webpack_require__(65);
	exports.NgbTooltipConfig = tooltip_module_2.NgbTooltipConfig;
	var typeahead_module_2 = __webpack_require__(68);
	exports.NgbTypeaheadConfig = typeahead_module_2.NgbTypeaheadConfig;
	var NgbModule = (function () {
	    function NgbModule() {
	    }
	    NgbModule = __decorate([
	        core_1.NgModule({
	            exports: [
	                accordion_module_1.NgbAccordionModule, alert_module_1.NgbAlertModule, radio_module_1.NgbButtonsModule, carousel_module_1.NgbCarouselModule, collapse_module_1.NgbCollapseModule, datepicker_module_1.NgbDatepickerModule,
	                dropdown_module_1.NgbDropdownModule, modal_module_1.NgbModalModule, pagination_module_1.NgbPaginationModule, popover_module_1.NgbPopoverModule, progressbar_module_1.NgbProgressbarModule, rating_module_1.NgbRatingModule,
	                tabset_module_1.NgbTabsetModule, timepicker_module_1.NgbTimepickerModule, tooltip_module_1.NgbTooltipModule, typeahead_module_1.NgbTypeaheadModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbModule);
	    return NgbModule;
	}());
	exports.NgbModule = NgbModule;
	
	//# sourceMappingURL=index.js.map


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var accordion_1 = __webpack_require__(4);
	var accordion_config_1 = __webpack_require__(6);
	var accordion_config_2 = __webpack_require__(6);
	exports.NgbAccordionConfig = accordion_config_2.NgbAccordionConfig;
	var NgbAccordionModule = (function () {
	    function NgbAccordionModule() {
	    }
	    NgbAccordionModule = __decorate([
	        core_1.NgModule({
	            declarations: accordion_1.NGB_ACCORDION_DIRECTIVES,
	            exports: accordion_1.NGB_ACCORDION_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            providers: [accordion_config_1.NgbAccordionConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbAccordionModule);
	    return NgbAccordionModule;
	}());
	exports.NgbAccordionModule = NgbAccordionModule;
	
	//# sourceMappingURL=accordion.module.js.map


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

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
	var core_1 = __webpack_require__(1);
	var util_1 = __webpack_require__(5);
	var accordion_config_1 = __webpack_require__(6);
	var nextId = 0;
	/**
	 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
	 */
	var NgbPanelTitle = (function () {
	    function NgbPanelTitle(templateRef) {
	        this.templateRef = templateRef;
	    }
	    NgbPanelTitle = __decorate([
	        core_1.Directive({ selector: 'template[ngbPanelTitle]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef])
	    ], NgbPanelTitle);
	    return NgbPanelTitle;
	}());
	exports.NgbPanelTitle = NgbPanelTitle;
	/**
	 * This directive must be used to wrap accordion panel content.
	 */
	var NgbPanelContent = (function () {
	    function NgbPanelContent(templateRef) {
	        this.templateRef = templateRef;
	    }
	    NgbPanelContent = __decorate([
	        core_1.Directive({ selector: 'template[ngbPanelContent]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef])
	    ], NgbPanelContent);
	    return NgbPanelContent;
	}());
	exports.NgbPanelContent = NgbPanelContent;
	/**
	 * The NgbPanel directive represents an in individual panel with the title and collapsible
	 * content
	 */
	var NgbPanel = (function () {
	    function NgbPanel() {
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
	    }
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
	        __metadata('design:type', String)
	    ], NgbPanel.prototype, "title", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbPanel.prototype, "type", void 0);
	    __decorate([
	        core_1.ContentChild(NgbPanelContent), 
	        __metadata('design:type', NgbPanelContent)
	    ], NgbPanel.prototype, "contentTpl", void 0);
	    __decorate([
	        core_1.ContentChild(NgbPanelTitle), 
	        __metadata('design:type', NgbPanelTitle)
	    ], NgbPanel.prototype, "titleTpl", void 0);
	    NgbPanel = __decorate([
	        core_1.Directive({ selector: 'ngb-panel' }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPanel);
	    return NgbPanel;
	}());
	exports.NgbPanel = NgbPanel;
	/**
	 * The NgbAccordion directive is a collection of panels.
	 * It can assure that only panel can be opened at a time.
	 */
	var NgbAccordion = (function () {
	    function NgbAccordion(config) {
	        /**
	         * An array or comma separated strings of panel identifiers that should be opened
	         */
	        this.activeIds = [];
	        /**
	         * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
	         */
	        this.change = new core_1.EventEmitter();
	        /**
	         * A map that stores each panel state
	         */
	        this._states = new Map();
	        /**
	         * A map that stores references to all panels
	         */
	        this._panelRefs = new Map();
	        this.type = config.type;
	        this.closeOtherPanels = config.closeOthers;
	    }
	    /**
	     * Programmatically toggle a panel with a given id.
	     */
	    NgbAccordion.prototype.toggle = function (panelId) {
	        var panel = this._panelRefs.get(panelId);
	        if (panel && !panel.disabled) {
	            var nextState = !this._states.get(panelId);
	            var defaultPrevented_1 = false;
	            this.change.emit({ panelId: panelId, nextState: nextState, preventDefault: function () { defaultPrevented_1 = true; } });
	            if (!defaultPrevented_1) {
	                this._states.set(panelId, nextState);
	                if (this.closeOtherPanels) {
	                    this._closeOthers(panelId);
	                }
	                this._updateActiveIds();
	            }
	        }
	    };
	    NgbAccordion.prototype.ngAfterContentChecked = function () {
	        // active id updates
	        if (util_1.isString(this.activeIds)) {
	            this.activeIds = this.activeIds.split(/\s*,\s*/);
	        }
	        this._updateStates();
	        // closeOthers updates
	        if (this.activeIds.length > 1 && this.closeOtherPanels) {
	            this._closeOthers(this.activeIds[0]);
	            this._updateActiveIds();
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbAccordion.prototype.isOpen = function (panelId) { return this._states.get(panelId); };
	    NgbAccordion.prototype._closeOthers = function (panelId) {
	        var _this = this;
	        this._states.forEach(function (state, id) {
	            if (id !== panelId) {
	                _this._states.set(id, false);
	            }
	        });
	    };
	    NgbAccordion.prototype._updateActiveIds = function () {
	        var _this = this;
	        this.activeIds =
	            this.panels.toArray().filter(function (panel) { return _this.isOpen(panel.id) && !panel.disabled; }).map(function (panel) { return panel.id; });
	    };
	    NgbAccordion.prototype._updateStates = function () {
	        var _this = this;
	        this._states.clear();
	        this._panelRefs.clear();
	        this.panels.toArray().forEach(function (panel) {
	            _this._states.set(panel.id, _this.activeIds.indexOf(panel.id) > -1 && !panel.disabled);
	            _this._panelRefs.set(panel.id, panel);
	        });
	    };
	    __decorate([
	        core_1.ContentChildren(NgbPanel), 
	        __metadata('design:type', core_1.QueryList)
	    ], NgbAccordion.prototype, "panels", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbAccordion.prototype, "activeIds", void 0);
	    __decorate([
	        core_1.Input('closeOthers'), 
	        __metadata('design:type', Boolean)
	    ], NgbAccordion.prototype, "closeOtherPanels", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbAccordion.prototype, "type", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbAccordion.prototype, "change", void 0);
	    NgbAccordion = __decorate([
	        core_1.Component({
	            selector: 'ngb-accordion',
	            exportAs: 'ngbAccordion',
	            template: "\n  <div class=\"card\">\n    <template ngFor let-panel [ngForOf]=\"panels\">\n      <div [class]=\"'card-header ' + (panel.type ? 'card-'+panel.type: type ? 'card-'+type : '')\" [class.active]=\"isOpen(panel.id)\">\n        <a tabindex=\"0\" href (click)=\"!!toggle(panel.id)\" [class.text-muted]=\"panel.disabled\">\n          {{panel.title}}<template [ngTemplateOutlet]=\"panel.titleTpl?.templateRef\"></template>          \n        </a>\n      </div>\n      <div class=\"card-block\" *ngIf=\"isOpen(panel.id)\">\n        <template [ngTemplateOutlet]=\"panel.contentTpl.templateRef\"></template>\n      </div>\n    </template>\n  </div>\n"
	        }), 
	        __metadata('design:paramtypes', [accordion_config_1.NgbAccordionConfig])
	    ], NgbAccordion);
	    return NgbAccordion;
	}());
	exports.NgbAccordion = NgbAccordion;
	exports.NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent];
	
	//# sourceMappingURL=accordion.js.map


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	function toInteger(value) {
	    return parseInt("" + value, 10);
	}
	exports.toInteger = toInteger;
	function toString(value) {
	    return (value !== undefined && value !== null) ? "" + value : '';
	}
	exports.toString = toString;
	function getValueInRange(value, max, min) {
	    if (min === void 0) { min = 0; }
	    return Math.max(Math.min(value, max), min);
	}
	exports.getValueInRange = getValueInRange;
	function isString(value) {
	    return typeof value === 'string';
	}
	exports.isString = isString;
	function isNumber(value) {
	    return !isNaN(toInteger(value));
	}
	exports.isNumber = isNumber;
	function isDefined(value) {
	    return value !== undefined && value !== null;
	}
	exports.isDefined = isDefined;
	function padNumber(value) {
	    if (isNumber(value)) {
	        return ("0" + value).slice(-2);
	    }
	    else {
	        return '';
	    }
	}
	exports.padNumber = padNumber;
	function regExpEscape(text) {
	    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	}
	exports.regExpEscape = regExpEscape;
	
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbAccordion component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the accordions used in the application.
	 */
	var NgbAccordionConfig = (function () {
	    function NgbAccordionConfig() {
	        this.closeOthers = false;
	    }
	    NgbAccordionConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbAccordionConfig);
	    return NgbAccordionConfig;
	}());
	exports.NgbAccordionConfig = NgbAccordionConfig;
	
	//# sourceMappingURL=accordion-config.js.map


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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var alert_1 = __webpack_require__(8);
	var alert_config_1 = __webpack_require__(10);
	var alert_config_2 = __webpack_require__(10);
	exports.NgbAlertConfig = alert_config_2.NgbAlertConfig;
	exports.NgbSelfClosingAlertConfig = alert_config_2.NgbSelfClosingAlertConfig;
	var NgbAlertModule = (function () {
	    function NgbAlertModule() {
	    }
	    NgbAlertModule = __decorate([
	        core_1.NgModule({
	            declarations: alert_1.NGB_ALERT_DIRECTIVES,
	            exports: alert_1.NGB_ALERT_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            entryComponents: [alert_1.NgbAlert],
	            providers: [alert_config_1.NgbAlertConfig, alert_config_1.NgbSelfClosingAlertConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbAlertModule);
	    return NgbAlertModule;
	}());
	exports.NgbAlertModule = NgbAlertModule;
	
	//# sourceMappingURL=alert.module.js.map


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
	var core_1 = __webpack_require__(1);
	var popup_1 = __webpack_require__(9);
	var alert_config_1 = __webpack_require__(10);
	/**
	 * Alerts can be used to provide feedback messages.
	 */
	var NgbAlert = (function () {
	    function NgbAlert(config) {
	        /**
	         * An event emitted when the close button is clicked. This event has no payload. Only relevant for dismissible alerts.
	         */
	        this.close = new core_1.EventEmitter();
	        this.dismissible = config.dismissible;
	        this.type = config.type;
	    }
	    NgbAlert.prototype.closeHandler = function () { this.close.emit(null); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbAlert.prototype, "dismissible", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
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
	        __metadata('design:paramtypes', [alert_config_1.NgbAlertConfig])
	    ], NgbAlert);
	    return NgbAlert;
	}());
	exports.NgbAlert = NgbAlert;
	/**
	 * Alerts that can be dismissed without any additional code.
	 */
	var NgbSelfClosingAlert = (function () {
	    function NgbSelfClosingAlert(_templateRef, viewContainerRef, injector, componentFactoryResolver, renderer, config) {
	        this._templateRef = _templateRef;
	        /**
	         * An event emitted when the close button is clicked.
	         */
	        this.closeEvent = new core_1.EventEmitter();
	        this._popupService =
	            new popup_1.PopupService(NgbAlert, injector, viewContainerRef, renderer, componentFactoryResolver);
	        this.dismissible = config.dismissible;
	        this.type = config.type;
	        this.dismissOnTimeout = config.dismissOnTimeout;
	    }
	    NgbSelfClosingAlert.prototype.close = function () { this._popupService.close(); };
	    NgbSelfClosingAlert.prototype.ngOnInit = function () {
	        var _this = this;
	        var windowRef = this._popupService.open(this._templateRef);
	        windowRef.instance.type = this.type;
	        windowRef.instance.dismissible = this.dismissible;
	        windowRef.instance.close.subscribe(function ($event) {
	            _this.closeEvent.emit($event);
	            _this.close();
	        });
	        if (this.dismissOnTimeout) {
	            this._timeout = setTimeout(function () { _this.close(); }, this.dismissOnTimeout);
	        }
	    };
	    NgbSelfClosingAlert.prototype.ngOnDestroy = function () { clearTimeout(this._timeout); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbSelfClosingAlert.prototype, "dismissible", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbSelfClosingAlert.prototype, "type", void 0);
	    __decorate([
	        core_1.Output('close'), 
	        __metadata('design:type', Object)
	    ], NgbSelfClosingAlert.prototype, "closeEvent", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbSelfClosingAlert.prototype, "dismissOnTimeout", void 0);
	    NgbSelfClosingAlert = __decorate([
	        core_1.Directive({ selector: 'template[ngbAlert]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, core_1.Injector, core_1.ComponentFactoryResolver, core_1.Renderer, alert_config_1.NgbSelfClosingAlertConfig])
	    ], NgbSelfClosingAlert);
	    return NgbSelfClosingAlert;
	}());
	exports.NgbSelfClosingAlert = NgbSelfClosingAlert;
	exports.NGB_ALERT_DIRECTIVES = [NgbAlert, NgbSelfClosingAlert];
	
	//# sourceMappingURL=alert.js.map


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var PopupService = (function () {
	    function PopupService(type, _injector, _viewContainerRef, _renderer, componentFactoryResolver) {
	        this._injector = _injector;
	        this._viewContainerRef = _viewContainerRef;
	        this._renderer = _renderer;
	        this._windowFactory = componentFactoryResolver.resolveComponentFactory(type);
	    }
	    PopupService.prototype.open = function (content) {
	        if (!this._windowRef) {
	            var nodes = this._getContentNodes(content);
	            this._windowRef = this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, nodes);
	        }
	        return this._windowRef;
	    };
	    PopupService.prototype.close = function () {
	        if (this._windowRef) {
	            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
	            this._windowRef = null;
	        }
	    };
	    PopupService.prototype._getContentNodes = function (content) {
	        if (!content) {
	            return [];
	        }
	        else if (content instanceof core_1.TemplateRef) {
	            return [this._viewContainerRef.createEmbeddedView(content).rootNodes];
	        }
	        else {
	            return [[this._renderer.createText(null, "" + content)]];
	        }
	    };
	    return PopupService;
	}());
	exports.PopupService = PopupService;
	
	//# sourceMappingURL=popup.js.map


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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbAlert component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the alerts used in the application.
	 */
	var NgbAlertConfig = (function () {
	    function NgbAlertConfig() {
	        this.dismissible = true;
	        this.type = 'warning';
	    }
	    NgbAlertConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbAlertConfig);
	    return NgbAlertConfig;
	}());
	exports.NgbAlertConfig = NgbAlertConfig;
	/**
	 * Configuration service for the NgbSelfClosingAlert component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the self-closing alerts used in the application.
	 */
	var NgbSelfClosingAlertConfig = (function () {
	    function NgbSelfClosingAlertConfig() {
	        this.dismissible = false;
	        this.type = 'warning';
	    }
	    NgbSelfClosingAlertConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbSelfClosingAlertConfig);
	    return NgbSelfClosingAlertConfig;
	}());
	exports.NgbSelfClosingAlertConfig = NgbSelfClosingAlertConfig;
	
	//# sourceMappingURL=alert-config.js.map


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
	var core_1 = __webpack_require__(1);
	var radio_1 = __webpack_require__(12);
	var NgbButtonsModule = (function () {
	    function NgbButtonsModule() {
	    }
	    NgbButtonsModule = __decorate([
	        core_1.NgModule({ declarations: radio_1.NGB_RADIO_DIRECTIVES, exports: radio_1.NGB_RADIO_DIRECTIVES }), 
	        __metadata('design:paramtypes', [])
	    ], NgbButtonsModule);
	    return NgbButtonsModule;
	}());
	exports.NgbButtonsModule = NgbButtonsModule;
	
	//# sourceMappingURL=radio.module.js.map


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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(13);
	var NGB_RADIO_VALUE_ACCESSOR = {
	    provide: forms_1.NG_VALUE_ACCESSOR,
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
	            selector: '[ngbRadioGroup]',
	            host: { 'data-toggle': 'buttons', 'class': 'btn-group' },
	            providers: [NGB_RADIO_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbRadioGroup);
	    return NgbRadioGroup;
	}());
	exports.NgbRadioGroup = NgbRadioGroup;
	var NgbActiveLabel = (function () {
	    function NgbActiveLabel(_renderer, _elRef) {
	        this._renderer = _renderer;
	        this._elRef = _elRef;
	    }
	    Object.defineProperty(NgbActiveLabel.prototype, "active", {
	        set: function (isActive) { this._renderer.setElementClass(this._elRef.nativeElement, 'active', isActive); },
	        enumerable: true,
	        configurable: true
	    });
	    NgbActiveLabel = __decorate([
	        core_1.Directive({ selector: 'label.btn' }), 
	        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
	    ], NgbActiveLabel);
	    return NgbActiveLabel;
	}());
	exports.NgbActiveLabel = NgbActiveLabel;
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
	    Object.defineProperty(NgbRadio.prototype, "isChecked", {
	        get: function () { return this._checked; },
	        enumerable: true,
	        configurable: true
	    });
	    NgbRadio.prototype.markChecked = function (value) {
	        this._checked = (this.value === value && value !== null);
	        this._label.active = this._checked;
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
	        core_1.Directive({ selector: 'input[type=radio]', host: { '(change)': 'onChange($event.target.value)', '[checked]': 'isChecked' } }),
	        __param(0, core_1.Optional()),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [NgbRadioGroup, NgbActiveLabel, core_1.Renderer, core_1.ElementRef])
	    ], NgbRadio);
	    return NgbRadio;
	}());
	exports.NgbRadio = NgbRadio;
	exports.NGB_RADIO_DIRECTIVES = [NgbRadio, NgbActiveLabel, NgbRadioGroup];
	
	//# sourceMappingURL=radio.js.map


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var carousel_1 = __webpack_require__(15);
	var carousel_config_1 = __webpack_require__(16);
	var carousel_config_2 = __webpack_require__(16);
	exports.NgbCarouselConfig = carousel_config_2.NgbCarouselConfig;
	var NgbCarouselModule = (function () {
	    function NgbCarouselModule() {
	    }
	    NgbCarouselModule = __decorate([
	        core_1.NgModule({
	            declarations: carousel_1.NGB_CAROUSEL_DIRECTIVES,
	            exports: carousel_1.NGB_CAROUSEL_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            providers: [carousel_config_1.NgbCarouselConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbCarouselModule);
	    return NgbCarouselModule;
	}());
	exports.NgbCarouselModule = NgbCarouselModule;
	
	//# sourceMappingURL=carousel.module.js.map


/***/ },
/* 15 */
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
	var core_1 = __webpack_require__(1);
	var carousel_config_1 = __webpack_require__(16);
	var nextId = 0;
	/**
	 * Represents an individual slide to be used within a carousel.
	 */
	var NgbSlide = (function () {
	    function NgbSlide(tplRef) {
	        this.tplRef = tplRef;
	        /**
	         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
	         * Will be auto-generated if not provided.
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
	    function NgbCarousel(config) {
	        this.interval = config.interval;
	        this.wrap = config.wrap;
	        this.keyboard = config.keyboard;
	    }
	    NgbCarousel.prototype.ngAfterContentChecked = function () {
	        var activeSlide = this._getSlideById(this.activeId);
	        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
	    };
	    NgbCarousel.prototype.ngOnInit = function () { this._startTimer(); };
	    NgbCarousel.prototype.ngOnDestroy = function () { clearInterval(this._slideChangeInterval); };
	    /**
	     * Navigate to a slide with a specified identifier.
	     */
	    NgbCarousel.prototype.select = function (slideIdx) {
	        this.cycleToSelected(slideIdx);
	        this._restartTimer();
	    };
	    /**
	     * Navigate to the next slide.
	     */
	    NgbCarousel.prototype.prev = function () {
	        this.cycleToPrev();
	        this._restartTimer();
	    };
	    /**
	     * Navigate to the next slide.
	     */
	    NgbCarousel.prototype.next = function () {
	        this.cycleToNext();
	        this._restartTimer();
	    };
	    /**
	     * Stops the carousel from cycling through items.
	     */
	    NgbCarousel.prototype.pause = function () { this._stopTimer(); };
	    /**
	     * Restarts cycling through the carousel slides from left to right.
	     */
	    NgbCarousel.prototype.cycle = function () { this._startTimer(); };
	    /**
	     * @internal
	     */
	    NgbCarousel.prototype.cycleToNext = function () { this.cycleToSelected(this._getNextSlide(this.activeId)); };
	    /**
	     * @internal
	     */
	    NgbCarousel.prototype.cycleToPrev = function () { this.cycleToSelected(this._getPrevSlide(this.activeId)); };
	    /**
	     * @internal
	     */
	    NgbCarousel.prototype.cycleToSelected = function (slideIdx) {
	        var selectedSlide = this._getSlideById(slideIdx);
	        if (selectedSlide) {
	            this.activeId = selectedSlide.id;
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbCarousel.prototype.keyPrev = function () {
	        if (this.keyboard) {
	            this.prev();
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbCarousel.prototype.keyNext = function () {
	        if (this.keyboard) {
	            this.next();
	        }
	    };
	    NgbCarousel.prototype._restartTimer = function () {
	        this._stopTimer();
	        this._startTimer();
	    };
	    NgbCarousel.prototype._startTimer = function () {
	        var _this = this;
	        this._slideChangeInterval = setInterval(function () { _this.cycleToNext(); }, this.interval);
	    };
	    NgbCarousel.prototype._stopTimer = function () { clearInterval(this._slideChangeInterval); };
	    NgbCarousel.prototype._getSlideById = function (slideId) {
	        var slideWithId = this.slides.filter(function (slide) { return slide.id === slideId; });
	        return slideWithId.length ? slideWithId[0] : null;
	    };
	    NgbCarousel.prototype._getSlideIdxById = function (slideId) {
	        return this.slides.toArray().indexOf(this._getSlideById(slideId));
	    };
	    NgbCarousel.prototype._getNextSlide = function (currentSlideId) {
	        var slideArr = this.slides.toArray();
	        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
	        var isLastSlide = currentSlideIdx === slideArr.length - 1;
	        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
	            slideArr[currentSlideIdx + 1].id;
	    };
	    NgbCarousel.prototype._getPrevSlide = function (currentSlideId) {
	        var slideArr = this.slides.toArray();
	        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
	        var isFirstSlide = currentSlideIdx === 0;
	        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
	            slideArr[currentSlideIdx - 1].id;
	    };
	    __decorate([
	        core_1.ContentChildren(NgbSlide), 
	        __metadata('design:type', core_1.QueryList)
	    ], NgbCarousel.prototype, "slides", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbCarousel.prototype, "interval", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbCarousel.prototype, "wrap", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
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
	                '(keyup.arrowLeft)': 'keyPrev()',
	                '(keyup.arrowRight)': 'keyNext()'
	            },
	            template: "\n    <ol class=\"carousel-indicators\">\n      <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\" (click)=\"cycleToSelected(slide.id)\"></li>\n    </ol>\n    <div class=\"carousel-inner\" role=\"listbox\">\n      <div *ngFor=\"let slide of slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <template [ngTemplateOutlet]=\"slide.tplRef\"></template>\n      </div>\n    </div>\n    <a class=\"left carousel-control\" role=\"button\" (click)=\"cycleToPrev()\">\n      <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"right carousel-control\" role=\"button\" (click)=\"cycleToNext()\">\n      <span class=\"icon-next\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n    "
	        }), 
	        __metadata('design:paramtypes', [carousel_config_1.NgbCarouselConfig])
	    ], NgbCarousel);
	    return NgbCarousel;
	}());
	exports.NgbCarousel = NgbCarousel;
	exports.NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
	
	//# sourceMappingURL=carousel.js.map


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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbCarousel component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the carousels used in the application.
	 */
	var NgbCarouselConfig = (function () {
	    function NgbCarouselConfig() {
	        this.interval = 5000;
	        this.wrap = true;
	        this.keyboard = true;
	    }
	    NgbCarouselConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbCarouselConfig);
	    return NgbCarouselConfig;
	}());
	exports.NgbCarouselConfig = NgbCarouselConfig;
	
	//# sourceMappingURL=carousel-config.js.map


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
	var core_1 = __webpack_require__(1);
	var collapse_1 = __webpack_require__(18);
	var NgbCollapseModule = (function () {
	    function NgbCollapseModule() {
	    }
	    NgbCollapseModule = __decorate([
	        core_1.NgModule({ declarations: collapse_1.NGB_COLLAPSE_DIRECTIVES, exports: collapse_1.NGB_COLLAPSE_DIRECTIVES }), 
	        __metadata('design:paramtypes', [])
	    ], NgbCollapseModule);
	    return NgbCollapseModule;
	}());
	exports.NgbCollapseModule = NgbCollapseModule;
	
	//# sourceMappingURL=collapse.module.js.map


/***/ },
/* 18 */
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
	var core_1 = __webpack_require__(1);
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
/* 19 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var datepicker_1 = __webpack_require__(20);
	var datepicker_month_view_1 = __webpack_require__(26);
	var datepicker_navigation_1 = __webpack_require__(28);
	var datepicker_input_1 = __webpack_require__(29);
	var forms_1 = __webpack_require__(13);
	var datepicker_day_view_1 = __webpack_require__(32);
	var datepicker_i18n_1 = __webpack_require__(27);
	var ngb_calendar_1 = __webpack_require__(21);
	var ngb_date_parser_formatter_1 = __webpack_require__(30);
	var datepicker_service_1 = __webpack_require__(23);
	var datepicker_navigation_select_1 = __webpack_require__(33);
	var datepicker_config_1 = __webpack_require__(25);
	var datepicker_config_2 = __webpack_require__(25);
	exports.NgbDatepickerConfig = datepicker_config_2.NgbDatepickerConfig;
	var datepicker_i18n_2 = __webpack_require__(27);
	exports.NgbDatepickerI18n = datepicker_i18n_2.NgbDatepickerI18n;
	var NgbDatepickerModule = (function () {
	    function NgbDatepickerModule() {
	    }
	    NgbDatepickerModule = __decorate([
	        core_1.NgModule({
	            declarations: [
	                datepicker_1.NgbDatepicker, datepicker_month_view_1.NgbDatepickerMonthView, datepicker_navigation_1.NgbDatepickerNavigation, datepicker_navigation_select_1.NgbDatepickerNavigationSelect, datepicker_day_view_1.NgbDatepickerDayView,
	                datepicker_input_1.NgbInputDatepicker
	            ],
	            exports: [datepicker_1.NgbDatepicker, datepicker_input_1.NgbInputDatepicker],
	            imports: [common_1.CommonModule, forms_1.FormsModule],
	            entryComponents: [datepicker_1.NgbDatepicker],
	            providers: [
	                { provide: ngb_calendar_1.NgbCalendar, useClass: ngb_calendar_1.NgbCalendarGregorian },
	                { provide: datepicker_i18n_1.NgbDatepickerI18n, useClass: datepicker_i18n_1.NgbDatepickerI18nDefault },
	                { provide: ngb_date_parser_formatter_1.NgbDateParserFormatter, useClass: ngb_date_parser_formatter_1.NgbDateISOParserFormatter }, datepicker_service_1.NgbDatepickerService, datepicker_config_1.NgbDatepickerConfig
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbDatepickerModule);
	    return NgbDatepickerModule;
	}());
	exports.NgbDatepickerModule = NgbDatepickerModule;
	
	//# sourceMappingURL=datepicker.module.js.map


/***/ },
/* 20 */
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
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(13);
	var ngb_calendar_1 = __webpack_require__(21);
	var ngb_date_1 = __webpack_require__(22);
	var datepicker_service_1 = __webpack_require__(23);
	var datepicker_view_model_1 = __webpack_require__(24);
	var util_1 = __webpack_require__(5);
	var datepicker_config_1 = __webpack_require__(25);
	var NGB_DATEPICKER_VALUE_ACCESSOR = {
	    provide: forms_1.NG_VALUE_ACCESSOR,
	    useExisting: core_1.forwardRef(function () { return NgbDatepicker; }),
	    multi: true
	};
	/**
	 * A lightweight and highly configurable datepicker directive
	 */
	var NgbDatepicker = (function () {
	    function NgbDatepicker(_service, _calendar, config) {
	        this._service = _service;
	        this._calendar = _calendar;
	        this.disabled = false;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        this.dayTemplate = config.dayTemplate;
	        this.firstDayOfWeek = config.firstDayOfWeek;
	        this.markDisabled = config.markDisabled;
	        this.minDate = config.minDate;
	        this.maxDate = config.maxDate;
	        this.showNavigation = config.showNavigation;
	        this.showWeekdays = config.showWeekdays;
	        this.showWeekNumbers = config.showWeekNumbers;
	        this.startDate = config.startDate;
	    }
	    /**
	     * Navigates current view to provided date. If nothing provided calendar will open current month.
	     * Use 'startDate' input as an alternative
	     */
	    NgbDatepicker.prototype.navigateTo = function (date) {
	        this._setViewWithinLimits(date ? ngb_date_1.NgbDate.from(date) : this._calendar.getToday());
	        this._updateData();
	    };
	    NgbDatepicker.prototype.ngOnInit = function () {
	        this._setDates();
	        this.navigateTo(this.startDate);
	    };
	    NgbDatepicker.prototype.ngOnChanges = function (changes) {
	        this._setDates();
	        this.navigateTo(this.startDate);
	    };
	    /**
	     * @internal
	     */
	    NgbDatepicker.prototype.onDateSelect = function (date) {
	        this._setViewWithinLimits(date);
	        this.onTouched();
	        this.writeValue(date);
	        this.onChange({ year: date.year, month: date.month, day: date.day });
	        // switch current month
	        if (this._date.month !== this.month.number) {
	            this._updateData();
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbDatepicker.prototype.onNavigateDateSelect = function (date) {
	        this._setViewWithinLimits(date);
	        this._updateData();
	    };
	    /**
	     * @internal
	     */
	    NgbDatepicker.prototype.onNavigateEvent = function (event) {
	        switch (event) {
	            case datepicker_view_model_1.NavigationEvent.PREV:
	                this._setViewWithinLimits(this._calendar.getPrev(this._date, 'm'));
	                break;
	            case datepicker_view_model_1.NavigationEvent.NEXT:
	                this._setViewWithinLimits(this._calendar.getNext(this._date, 'm'));
	                break;
	        }
	        this._updateData();
	    };
	    /**
	     * @internal
	     */
	    NgbDatepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    /**
	     * @internal
	     */
	    NgbDatepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    /**
	     * @internal
	     */
	    NgbDatepicker.prototype.writeValue = function (value) { this.model = value ? new ngb_date_1.NgbDate(value.year, value.month, value.day) : null; };
	    /**
	     * @internal
	     */
	    NgbDatepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
	    NgbDatepicker.prototype._setDates = function () {
	        this._maxDate = ngb_date_1.NgbDate.from(this.maxDate);
	        this._minDate = ngb_date_1.NgbDate.from(this.minDate);
	        this._date = this.startDate ? ngb_date_1.NgbDate.from(this.startDate) : this._calendar.getToday();
	        if (!this._minDate) {
	            this._minDate = this._calendar.getPrev(this._date, 'y', 10);
	        }
	        if (!this._maxDate) {
	            this._maxDate = this._calendar.getNext(this._date, 'y', 11);
	            this._maxDate = this._calendar.getPrev(this._maxDate);
	        }
	        if (this._minDate && this._maxDate && this._maxDate.before(this._minDate)) {
	            throw new Error("'maxDate' " + this._maxDate + " should be greater than 'minDate' " + this._minDate);
	        }
	    };
	    NgbDatepicker.prototype._setViewWithinLimits = function (date) {
	        if (this._minDate && date.before(this._minDate)) {
	            this._date = new ngb_date_1.NgbDate(this._minDate.year, this._minDate.month, 1);
	        }
	        else if (this._maxDate && date.after(this._maxDate)) {
	            this._date = new ngb_date_1.NgbDate(this._maxDate.year, this._maxDate.month, 1);
	        }
	        else {
	            this._date = new ngb_date_1.NgbDate(date.year, date.month, 1);
	        }
	    };
	    NgbDatepicker.prototype._updateData = function () {
	        this.month = this._service.generateMonthViewModel(this._date, this._minDate, this._maxDate, util_1.toInteger(this.firstDayOfWeek), this.markDisabled);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], NgbDatepicker.prototype, "dayTemplate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbDatepicker.prototype, "firstDayOfWeek", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Function)
	    ], NgbDatepicker.prototype, "markDisabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepicker.prototype, "minDate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepicker.prototype, "maxDate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepicker.prototype, "showNavigation", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepicker.prototype, "showWeekdays", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepicker.prototype, "showWeekNumbers", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepicker.prototype, "startDate", void 0);
	    NgbDatepicker = __decorate([
	        core_1.Component({
	            exportAs: 'ngbDatepicker',
	            selector: 'ngb-datepicker',
	            template: "\n    <template #dt let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\" let-disabled=\"disabled\">\n       <div ngbDatepickerDayView [date]=\"date\" [currentMonth]=\"currentMonth\" [selected]=\"selected\" [disabled]=\"disabled\"></div>\n    </template>\n    \n    <table>\n      <tbody *ngIf=\"showNavigation\" ngbDatepickerNavigation\n        [date]=\"_date\"\n        [minDate]=\"_minDate\"\n        [maxDate]=\"_maxDate\"\n        [disabled]=\"disabled\"\n        [showWeekNumbers]=\"showWeekNumbers\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </tbody>\n      \n      <tbody ngbDatepickerMonthView\n        [month]=\"month\"\n        [selectedDate]=\"model\"\n        [dayTemplate]=\"dayTemplate || dt\"\n        [showWeekdays]=\"showWeekdays\"\n        [showWeekNumbers]=\"showWeekNumbers\"\n        [disabled]=\"disabled\"\n        (select)=\"onDateSelect($event)\">\n      </tbody>\n    </table>\n  ",
	            providers: [NGB_DATEPICKER_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [datepicker_service_1.NgbDatepickerService, ngb_calendar_1.NgbCalendar, datepicker_config_1.NgbDatepickerConfig])
	    ], NgbDatepicker);
	    return NgbDatepicker;
	}());
	exports.NgbDatepicker = NgbDatepicker;
	
	//# sourceMappingURL=datepicker.js.map


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var ngb_date_1 = __webpack_require__(22);
	var core_1 = __webpack_require__(1);
	function fromJSDate(jsDate) {
	    return new ngb_date_1.NgbDate(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate());
	}
	function toJSDate(date) {
	    return new Date(date.year, date.month, date.day);
	}
	var NgbCalendar = (function () {
	    function NgbCalendar() {
	    }
	    NgbCalendar = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbCalendar);
	    return NgbCalendar;
	}());
	exports.NgbCalendar = NgbCalendar;
	var NgbCalendarGregorian = (function (_super) {
	    __extends(NgbCalendarGregorian, _super);
	    function NgbCalendarGregorian() {
	        _super.apply(this, arguments);
	    }
	    NgbCalendarGregorian.prototype.getDaysPerWeek = function () { return 7; };
	    NgbCalendarGregorian.prototype.getMonths = function () { return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; };
	    NgbCalendarGregorian.prototype.getWeeksPerMonth = function () { return 6; };
	    NgbCalendarGregorian.prototype.getNext = function (date, period, number) {
	        if (period === void 0) { period = 'd'; }
	        if (number === void 0) { number = 1; }
	        var jsDate = toJSDate(date);
	        switch (period) {
	            case 'y':
	                return new ngb_date_1.NgbDate(date.year + number, 0, 1);
	            case 'm':
	                jsDate = new Date(date.year, date.month + number, 1);
	                break;
	            case 'd':
	                jsDate.setDate(jsDate.getDate() + number);
	                break;
	            default:
	                return date;
	        }
	        return fromJSDate(jsDate);
	    };
	    NgbCalendarGregorian.prototype.getPrev = function (date, period, number) {
	        if (period === void 0) { period = 'd'; }
	        if (number === void 0) { number = 1; }
	        return this.getNext(date, period, -number);
	    };
	    NgbCalendarGregorian.prototype.getWeekday = function (date) {
	        var jsDate = toJSDate(date);
	        return jsDate.getDay();
	    };
	    NgbCalendarGregorian.prototype.getWeekNumber = function (week, firstDayOfWeek) {
	        var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
	        var date = week[thursdayIndex];
	        var jsDate = toJSDate(date);
	        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
	        var time = jsDate.getTime();
	        jsDate.setMonth(0); // Compare with Jan 1
	        jsDate.setDate(1);
	        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
	    };
	    NgbCalendarGregorian.prototype.getToday = function () { return fromJSDate(new Date()); };
	    NgbCalendarGregorian = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbCalendarGregorian);
	    return NgbCalendarGregorian;
	}(NgbCalendar));
	exports.NgbCalendarGregorian = NgbCalendarGregorian;
	
	//# sourceMappingURL=ngb-calendar.js.map


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	var NgbDate = (function () {
	    function NgbDate(year, month, day) {
	        this.year = year;
	        this.month = month;
	        this.day = day;
	    }
	    NgbDate.from = function (date) {
	        return date ? new NgbDate(date.year, date.month, date.day ? date.day : 1) : null;
	    };
	    NgbDate.prototype.equals = function (other) {
	        return other && this.year === other.year && this.month === other.month && this.day === other.day;
	    };
	    NgbDate.prototype.before = function (other) {
	        if (!other) {
	            return false;
	        }
	        if (this.year === other.year) {
	            if (this.month === other.month) {
	                return this.day === other.day ? false : this.day < other.day;
	            }
	            else {
	                return this.month < other.month;
	            }
	        }
	        else {
	            return this.year < other.year;
	        }
	    };
	    NgbDate.prototype.after = function (other) {
	        if (!other) {
	            return false;
	        }
	        if (this.year === other.year) {
	            if (this.month === other.month) {
	                return this.day === other.day ? false : this.day > other.day;
	            }
	            else {
	                return this.month > other.month;
	            }
	        }
	        else {
	            return this.year > other.year;
	        }
	    };
	    NgbDate.prototype.toString = function () { return this.year + "-" + this.month + "-" + this.day; };
	    return NgbDate;
	}());
	exports.NgbDate = NgbDate;
	
	//# sourceMappingURL=ngb-date.js.map


/***/ },
/* 23 */
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
	var ngb_calendar_1 = __webpack_require__(21);
	var ngb_date_1 = __webpack_require__(22);
	var core_1 = __webpack_require__(1);
	var NgbDatepickerService = (function () {
	    function NgbDatepickerService(_calendar) {
	        this._calendar = _calendar;
	    }
	    NgbDatepickerService.prototype.generateMonthViewModel = function (date, minDate, maxDate, firstDayOfWeek, markDisabled) {
	        var month = { number: date.month, year: date.year, weeks: [], weekdays: [] };
	        date = this._getFirstViewDate(date, firstDayOfWeek);
	        // month has weeks
	        for (var w = 0; w < this._calendar.getWeeksPerMonth(); w++) {
	            var days = [];
	            // week has days
	            for (var d = 0; d < this._calendar.getDaysPerWeek(); d++) {
	                if (w === 0) {
	                    month.weekdays.push(this._calendar.getWeekday(date));
	                }
	                var newDate = new ngb_date_1.NgbDate(date.year, date.month, date.day);
	                var disabled = (minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate));
	                if (!disabled && markDisabled) {
	                    disabled = markDisabled(newDate);
	                }
	                days.push({ date: newDate, disabled: disabled });
	                date = this._calendar.getNext(date);
	            }
	            month.weeks.push({ number: this._calendar.getWeekNumber(days.map(function (day) { return ngb_date_1.NgbDate.from(day.date); }), firstDayOfWeek), days: days });
	        }
	        return month;
	    };
	    NgbDatepickerService.prototype._getFirstViewDate = function (date, firstDayOfWeek) {
	        var _this = this;
	        var currentMonth = date.month;
	        var today = new ngb_date_1.NgbDate(date.year, date.month, date.day);
	        var yesterday = this._calendar.getPrev(today);
	        var firstDayOfCurrentMonthIsAlsoFirstDayOfWeek = function () { return today.month !== yesterday.month && firstDayOfWeek === _this._calendar.getWeekday(today); };
	        var reachedTheFirstDayOfTheLastWeekOfPreviousMonth = function () { return today.month !== currentMonth && firstDayOfWeek === _this._calendar.getWeekday(today); };
	        // going back in time
	        while (!reachedTheFirstDayOfTheLastWeekOfPreviousMonth() && !firstDayOfCurrentMonthIsAlsoFirstDayOfWeek()) {
	            today = new ngb_date_1.NgbDate(yesterday.year, yesterday.month, yesterday.day);
	            yesterday = this._calendar.getPrev(yesterday);
	        }
	        return today;
	    };
	    NgbDatepickerService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [ngb_calendar_1.NgbCalendar])
	    ], NgbDatepickerService);
	    return NgbDatepickerService;
	}());
	exports.NgbDatepickerService = NgbDatepickerService;
	
	//# sourceMappingURL=datepicker-service.js.map


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	(function (NavigationEvent) {
	    NavigationEvent[NavigationEvent["PREV"] = 0] = "PREV";
	    NavigationEvent[NavigationEvent["NEXT"] = 1] = "NEXT";
	})(exports.NavigationEvent || (exports.NavigationEvent = {}));
	var NavigationEvent = exports.NavigationEvent;
	
	//# sourceMappingURL=datepicker-view-model.js.map


/***/ },
/* 25 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbDatepicker component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the datepickers used in the application.
	 */
	var NgbDatepickerConfig = (function () {
	    function NgbDatepickerConfig() {
	        this.firstDayOfWeek = 1;
	        this.showNavigation = true;
	        this.showWeekdays = true;
	        this.showWeekNumbers = false;
	    }
	    NgbDatepickerConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbDatepickerConfig);
	    return NgbDatepickerConfig;
	}());
	exports.NgbDatepickerConfig = NgbDatepickerConfig;
	
	//# sourceMappingURL=datepicker-config.js.map


/***/ },
/* 26 */
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
	var core_1 = __webpack_require__(1);
	var ngb_date_1 = __webpack_require__(22);
	var datepicker_i18n_1 = __webpack_require__(27);
	var NgbDatepickerMonthView = (function () {
	    function NgbDatepickerMonthView(i18n) {
	        this.i18n = i18n;
	        this.select = new core_1.EventEmitter();
	    }
	    NgbDatepickerMonthView.prototype.doSelect = function (day) {
	        if (!this.isDisabled(day)) {
	            this.select.emit(ngb_date_1.NgbDate.from(day.date));
	        }
	    };
	    NgbDatepickerMonthView.prototype.isDisabled = function (day) { return this.disabled || day.disabled; };
	    NgbDatepickerMonthView.prototype.isSelected = function (date) { return this.selectedDate && this.selectedDate.equals(date); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], NgbDatepickerMonthView.prototype, "dayTemplate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepickerMonthView.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerMonthView.prototype, "month", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', ngb_date_1.NgbDate)
	    ], NgbDatepickerMonthView.prototype, "selectedDate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerMonthView.prototype, "showWeekdays", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerMonthView.prototype, "showWeekNumbers", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerMonthView.prototype, "select", void 0);
	    NgbDatepickerMonthView = __decorate([
	        core_1.Component({
	            selector: '[ngbDatepickerMonthView]',
	            styles: ["\n    .weekday {\n      padding-bottom: 0.25rem;\n    }\n    .weeknumber {    \n    }\n    .day {\n      padding: 0;\n      height: 100%;\n      cursor: pointer;\n    }\n    .day.disabled {\n      cursor: not-allowed;\n    }\n  "],
	            template: "\n    <tr *ngIf=\"showWeekdays\">\n      <td *ngIf=\"showWeekNumbers\"></td>\n      <td *ngFor=\"let w of month.weekdays\" class=\"weekday text-xs-center font-weight-bold\">{{ i18n.getWeekdayName(w) }}</td>\n    </tr>\n    <tr *ngFor=\"let week of month.weeks\">\n      <td *ngIf=\"showWeekNumbers\" class=\"weeknumber small text-xs-center\">{{ week.number }}</td>\n      <td *ngFor=\"let day of week.days\" (click)=\"doSelect(day)\" class=\"day\" [class.disabled]=\"isDisabled(day)\">\n        <template [ngTemplateOutlet]=\"dayTemplate\" \n        [ngOutletContext]=\"{date: {year: day.date.year, month: day.date.month, day: day.date.day}, \n          currentMonth: month.number, \n          disabled: isDisabled(day), \n          selected: isSelected(day.date)}\">\n        </template>\n      </td>                \n    </tr>\n  "
	        }), 
	        __metadata('design:paramtypes', [datepicker_i18n_1.NgbDatepickerI18n])
	    ], NgbDatepickerMonthView);
	    return NgbDatepickerMonthView;
	}());
	exports.NgbDatepickerMonthView = NgbDatepickerMonthView;
	
	//# sourceMappingURL=datepicker-month-view.js.map


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	/**
	 * Type of the service supplying month and weekday names to to NgbDatepicker component.
	 * See the i18n demo for how to extend this class and define a custom provider for i18n.
	 */
	var NgbDatepickerI18n = (function () {
	    function NgbDatepickerI18n() {
	    }
	    NgbDatepickerI18n = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbDatepickerI18n);
	    return NgbDatepickerI18n;
	}());
	exports.NgbDatepickerI18n = NgbDatepickerI18n;
	var NgbDatepickerI18nDefault = (function (_super) {
	    __extends(NgbDatepickerI18nDefault, _super);
	    function NgbDatepickerI18nDefault() {
	        _super.apply(this, arguments);
	    }
	    NgbDatepickerI18nDefault.prototype.getWeekdayName = function (weekday) { return WEEKDAYS[weekday]; };
	    NgbDatepickerI18nDefault.prototype.getMonthName = function (month) { return MONTHS[month]; };
	    NgbDatepickerI18nDefault = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbDatepickerI18nDefault);
	    return NgbDatepickerI18nDefault;
	}(NgbDatepickerI18n));
	exports.NgbDatepickerI18nDefault = NgbDatepickerI18nDefault;
	
	//# sourceMappingURL=datepicker-i18n.js.map


/***/ },
/* 28 */
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
	var core_1 = __webpack_require__(1);
	var datepicker_view_model_1 = __webpack_require__(24);
	var ngb_date_1 = __webpack_require__(22);
	var datepicker_i18n_1 = __webpack_require__(27);
	var ngb_calendar_1 = __webpack_require__(21);
	var NgbDatepickerNavigation = (function () {
	    function NgbDatepickerNavigation(i18n, _calendar) {
	        this.i18n = i18n;
	        this._calendar = _calendar;
	        this.navigation = datepicker_view_model_1.NavigationEvent;
	        this.type = 'select';
	        this.navigate = new core_1.EventEmitter();
	        this.select = new core_1.EventEmitter();
	    }
	    NgbDatepickerNavigation.prototype.doNavigate = function (event) { this.navigate.emit(event); };
	    NgbDatepickerNavigation.prototype.nextDisabled = function () {
	        return this.disabled || (this.maxDate && this._calendar.getNext(this.date, 'm').after(this.maxDate));
	    };
	    NgbDatepickerNavigation.prototype.prevDisabled = function () {
	        return this.disabled || (this.minDate && this._calendar.getPrev(this.date, 'm').before(this.minDate));
	    };
	    NgbDatepickerNavigation.prototype.selectDate = function (date) { this.select.emit(date); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', ngb_date_1.NgbDate)
	    ], NgbDatepickerNavigation.prototype, "date", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepickerNavigation.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', ngb_date_1.NgbDate)
	    ], NgbDatepickerNavigation.prototype, "maxDate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', ngb_date_1.NgbDate)
	    ], NgbDatepickerNavigation.prototype, "minDate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepickerNavigation.prototype, "showWeekNumbers", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerNavigation.prototype, "type", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerNavigation.prototype, "navigate", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerNavigation.prototype, "select", void 0);
	    NgbDatepickerNavigation = __decorate([
	        core_1.Component({
	            selector: '[ngbDatepickerNavigation]',
	            styles: ["\n    td {\n      text-align: center;\n      padding-bottom: 0.25rem;\n    }\n  "],
	            template: "\n    <tr>\n      <td>\n        <button type=\"button\" (click)=\"doNavigate(navigation.PREV)\" class=\"btn btn-sm btn-secondary btn-block\" \n          [disabled]=\"prevDisabled()\">&lt;</button>\n      </td>\n      <td [attr.colspan]=\"showWeekNumbers ? 6 : 5\">      \n        <ngb-datepicker-navigation-select *ngIf=\"type === 'select'\"\n          [date]=\"date\"\n          [minYear]=\"minDate.year\"\n          [maxYear]=\"maxDate.year\"\n          [disabled] = \"disabled\"\n          (select)=\"selectDate($event)\">\n        </ngb-datepicker-navigation-select>\n      </td>\n      <td>\n        <button type=\"button\" (click)=\"doNavigate(navigation.NEXT)\" class=\"btn btn-sm btn-secondary btn-block\" \n          [disabled]=\"nextDisabled()\">&gt;</button>\n      </td>\n    </tr>\n  "
	        }), 
	        __metadata('design:paramtypes', [datepicker_i18n_1.NgbDatepickerI18n, ngb_calendar_1.NgbCalendar])
	    ], NgbDatepickerNavigation);
	    return NgbDatepickerNavigation;
	}());
	exports.NgbDatepickerNavigation = NgbDatepickerNavigation;
	
	//# sourceMappingURL=datepicker-navigation.js.map


/***/ },
/* 29 */
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
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(13);
	var ngb_date_1 = __webpack_require__(22);
	var datepicker_1 = __webpack_require__(20);
	var ngb_date_parser_formatter_1 = __webpack_require__(30);
	var positioning_1 = __webpack_require__(31);
	var NGB_DATEPICKER_VALUE_ACCESSOR = {
	    provide: forms_1.NG_VALUE_ACCESSOR,
	    useExisting: core_1.forwardRef(function () { return NgbInputDatepicker; }),
	    multi: true
	};
	/**
	 * A directive that makes it possible to have datepickers on input fields.
	 * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
	 */
	var NgbInputDatepicker = (function () {
	    function NgbInputDatepicker(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, ngZone) {
	        var _this = this;
	        this._parserFormatter = _parserFormatter;
	        this._elRef = _elRef;
	        this._vcRef = _vcRef;
	        this._renderer = _renderer;
	        this._cfr = _cfr;
	        this._cRef = null;
	        this._onChange = function (_) { };
	        this._onTouched = function () { };
	        this._zoneSubscription = ngZone.onStable.subscribe(function () {
	            if (_this._cRef) {
	                positioning_1.positionElements(_this._elRef.nativeElement, _this._cRef.location.nativeElement, 'bottom-left');
	            }
	        });
	    }
	    /**
	     * @internal
	     */
	    NgbInputDatepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
	    /**
	     * @internal
	     */
	    NgbInputDatepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
	    /**
	     * @internal
	     */
	    NgbInputDatepicker.prototype.writeValue = function (value) {
	        this._model = value ? new ngb_date_1.NgbDate(value.year, value.month, value.day) : null;
	        this._writeModelValue(this._model);
	    };
	    /**
	     * @internal
	     */
	    NgbInputDatepicker.prototype.setDisabledState = function (isDisabled) {
	        this._renderer.setElementProperty(this._elRef.nativeElement, 'disabled', isDisabled);
	        if (this.isOpen()) {
	            this._cRef.instance.setDisabledState(isDisabled);
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbInputDatepicker.prototype.manualDateChange = function (value) {
	        this._model = this._parserFormatter.parse(value);
	        this._onChange(this._model ? { year: this._model.year, month: this._model.month, day: this._model.day } : null);
	        this._writeModelValue(this._model);
	    };
	    NgbInputDatepicker.prototype.isOpen = function () { return !!this._cRef; };
	    /**
	     * Opens the datepicker with the selected date indicated by the ngModel value.
	     */
	    NgbInputDatepicker.prototype.open = function () {
	        var _this = this;
	        if (!this.isOpen()) {
	            var cf = this._cfr.resolveComponentFactory(datepicker_1.NgbDatepicker);
	            this._cRef = this._vcRef.createComponent(cf);
	            this._applyPopupStyling(this._cRef.location.nativeElement);
	            this._cRef.instance.writeValue(this._model);
	            this._applyDatepickerInputs(this._cRef.instance);
	            this._cRef.instance.ngOnInit();
	            // date selection event handling
	            this._cRef.instance.registerOnChange(function (selectedDate) {
	                _this.writeValue(selectedDate);
	                _this._onChange(selectedDate);
	                _this.close();
	            });
	        }
	    };
	    /**
	     * Closes the datepicker popup.
	     */
	    NgbInputDatepicker.prototype.close = function () {
	        if (this.isOpen()) {
	            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
	            this._cRef = null;
	        }
	    };
	    /**
	     * Toggles the datepicker popup (opens when closed and closes when opened).
	     */
	    NgbInputDatepicker.prototype.toggle = function () {
	        if (this.isOpen()) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    };
	    /**
	     * Navigates current view to provided date. If nothing provided calendar will open current month.
	     * Use 'startDate' input as an alternative
	     */
	    NgbInputDatepicker.prototype.navigateTo = function (date) {
	        if (this.isOpen()) {
	            this._cRef.instance.navigateTo(date);
	        }
	    };
	    NgbInputDatepicker.prototype._applyDatepickerInputs = function (datepickerInstance) {
	        var _this = this;
	        ['dayTemplate', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'showNavigation', 'showWeekdays',
	            'showWeekNumbers', 'startDate']
	            .forEach(function (optionName) {
	            if (_this[optionName] !== undefined) {
	                datepickerInstance[optionName] = _this[optionName];
	            }
	        });
	    };
	    NgbInputDatepicker.prototype._applyPopupStyling = function (nativeElement) {
	        this._renderer.setElementClass(nativeElement, 'dropdown-menu', true);
	        this._renderer.setElementStyle(nativeElement, 'display', 'block');
	        this._renderer.setElementStyle(nativeElement, 'padding', '0.40rem');
	    };
	    NgbInputDatepicker.prototype._writeModelValue = function (model) {
	        this._renderer.setElementProperty(this._elRef.nativeElement, 'value', this._parserFormatter.format(model));
	        if (this.isOpen()) {
	            this._cRef.instance.writeValue(model);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], NgbInputDatepicker.prototype, "dayTemplate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbInputDatepicker.prototype, "firstDayOfWeek", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Function)
	    ], NgbInputDatepicker.prototype, "markDisabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbInputDatepicker.prototype, "minDate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbInputDatepicker.prototype, "maxDate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbInputDatepicker.prototype, "showNavigation", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbInputDatepicker.prototype, "showWeekdays", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbInputDatepicker.prototype, "showWeekNumbers", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbInputDatepicker.prototype, "startDate", void 0);
	    NgbInputDatepicker = __decorate([
	        core_1.Directive({
	            selector: 'input[ngbDatepicker]',
	            exportAs: 'ngbDatepicker',
	            host: { '(change)': 'manualDateChange($event.target.value)', '(keyup.esc)': 'close()' },
	            providers: [NGB_DATEPICKER_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [ngb_date_parser_formatter_1.NgbDateParserFormatter, core_1.ElementRef, core_1.ViewContainerRef, core_1.Renderer, core_1.ComponentFactoryResolver, core_1.NgZone])
	    ], NgbInputDatepicker);
	    return NgbInputDatepicker;
	}());
	exports.NgbInputDatepicker = NgbInputDatepicker;
	
	//# sourceMappingURL=datepicker-input.js.map


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ngb_date_1 = __webpack_require__(22);
	var util_1 = __webpack_require__(5);
	var NgbDateParserFormatter = (function () {
	    function NgbDateParserFormatter() {
	    }
	    return NgbDateParserFormatter;
	}());
	exports.NgbDateParserFormatter = NgbDateParserFormatter;
	var NgbDateISOParserFormatter = (function (_super) {
	    __extends(NgbDateISOParserFormatter, _super);
	    function NgbDateISOParserFormatter() {
	        _super.apply(this, arguments);
	    }
	    NgbDateISOParserFormatter.prototype.parse = function (value) {
	        if (value) {
	            var dateParts = value.trim().split('-');
	            if (dateParts.length === 1 && util_1.isNumber(dateParts[0])) {
	                return new ngb_date_1.NgbDate(util_1.toInteger(dateParts[0]), null, null);
	            }
	            else if (dateParts.length === 2 && util_1.isNumber(dateParts[0]) && util_1.isNumber(dateParts[1])) {
	                return new ngb_date_1.NgbDate(util_1.toInteger(dateParts[0]), util_1.toInteger(dateParts[1]) - 1, null);
	            }
	            else if (dateParts.length === 3 && util_1.isNumber(dateParts[0]) && util_1.isNumber(dateParts[1]) && util_1.isNumber(dateParts[2])) {
	                return new ngb_date_1.NgbDate(util_1.toInteger(dateParts[0]), util_1.toInteger(dateParts[1]) - 1, util_1.toInteger(dateParts[2]));
	            }
	        }
	        return null;
	    };
	    NgbDateISOParserFormatter.prototype.format = function (date) {
	        return date ?
	            date.year + "-" + (util_1.isNumber(date.month) ? util_1.padNumber(date.month + 1) : '') + "-" + (util_1.isNumber(date.day) ? util_1.padNumber(date.day) : '') :
	            '';
	    };
	    return NgbDateISOParserFormatter;
	}(NgbDateParserFormatter));
	exports.NgbDateISOParserFormatter = NgbDateISOParserFormatter;
	
	//# sourceMappingURL=ngb-date-parser-formatter.js.map


/***/ },
/* 31 */
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
	    Positioning.prototype.offsetParent = function (element) {
	        var offsetParentEl = element.offsetParent || document.documentElement;
	        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
	            offsetParentEl = offsetParentEl.offsetParent;
	        }
	        return offsetParentEl || document.documentElement;
	    };
	    Positioning.prototype.position = function (element, round) {
	        if (round === void 0) { round = true; }
	        var elPosition;
	        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
	        if (this.getStyle(element, 'position') === 'fixed') {
	            elPosition = element.getBoundingClientRect();
	        }
	        else {
	            var offsetParentEl = this.offsetParent(element);
	            elPosition = this.offset(element, false);
	            if (offsetParentEl !== document.documentElement) {
	                parentOffset = this.offset(offsetParentEl, false);
	            }
	            parentOffset.top += offsetParentEl.clientTop;
	            parentOffset.left += offsetParentEl.clientLeft;
	        }
	        elPosition.top -= parentOffset.top;
	        elPosition.bottom -= parentOffset.top;
	        elPosition.left -= parentOffset.left;
	        elPosition.right -= parentOffset.left;
	        if (round) {
	            elPosition.top = Math.round(elPosition.top);
	            elPosition.bottom = Math.round(elPosition.bottom);
	            elPosition.left = Math.round(elPosition.left);
	            elPosition.right = Math.round(elPosition.right);
	        }
	        return elPosition;
	    };
	    Positioning.prototype.offset = function (element, round) {
	        if (round === void 0) { round = true; }
	        var elBcr = element.getBoundingClientRect();
	        var viewportOffset = {
	            top: window.pageYOffset - document.documentElement.clientTop,
	            left: window.pageXOffset - document.documentElement.clientLeft
	        };
	        var elOffset = {
	            height: elBcr.height || element.offsetHeight,
	            width: elBcr.width || element.offsetWidth,
	            top: elBcr.top + viewportOffset.top,
	            bottom: elBcr.bottom + viewportOffset.top,
	            left: elBcr.left + viewportOffset.left,
	            right: elBcr.right + viewportOffset.left
	        };
	        if (round) {
	            elOffset.height = Math.round(elOffset.height);
	            elOffset.width = Math.round(elOffset.width);
	            elOffset.top = Math.round(elOffset.top);
	            elOffset.bottom = Math.round(elOffset.bottom);
	            elOffset.left = Math.round(elOffset.left);
	            elOffset.right = Math.round(elOffset.right);
	        }
	        return elOffset;
	    };
	    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
	        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
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
	        targetElPosition.top = Math.round(targetElPosition.top);
	        targetElPosition.bottom = Math.round(targetElPosition.bottom);
	        targetElPosition.left = Math.round(targetElPosition.left);
	        targetElPosition.right = Math.round(targetElPosition.right);
	        return targetElPosition;
	    };
	    return Positioning;
	}());
	exports.Positioning = Positioning;
	var positionService = new Positioning();
	function positionElements(hostElement, targetElement, placement, appendToBody) {
	    var pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
	    targetElement.style.top = pos.top + "px";
	    targetElement.style.left = pos.left + "px";
	}
	exports.positionElements = positionElements;
	
	//# sourceMappingURL=positioning.js.map


/***/ },
/* 32 */
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
	var core_1 = __webpack_require__(1);
	var NgbDatepickerDayView = (function () {
	    function NgbDatepickerDayView() {
	    }
	    NgbDatepickerDayView.prototype.isMuted = function () { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbDatepickerDayView.prototype, "currentMonth", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerDayView.prototype, "date", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepickerDayView.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepickerDayView.prototype, "selected", void 0);
	    NgbDatepickerDayView = __decorate([
	        core_1.Component({
	            selector: '[ngbDatepickerDayView]',
	            styles: ["\n    :host {      \n      text-align: center;\n      padding: 0.185rem 0.25rem;      \n      border-radius: 0.25rem;\n    }\n  "],
	            host: { '[class.bg-primary]': 'selected', '[class.text-muted]': 'isMuted()', '[class.btn-secondary]': '!disabled' },
	            template: "{{ date.day }}"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbDatepickerDayView);
	    return NgbDatepickerDayView;
	}());
	exports.NgbDatepickerDayView = NgbDatepickerDayView;
	
	//# sourceMappingURL=datepicker-day-view.js.map


/***/ },
/* 33 */
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
	var core_1 = __webpack_require__(1);
	var ngb_date_1 = __webpack_require__(22);
	var util_1 = __webpack_require__(5);
	var datepicker_i18n_1 = __webpack_require__(27);
	var ngb_calendar_1 = __webpack_require__(21);
	var NgbDatepickerNavigationSelect = (function () {
	    function NgbDatepickerNavigationSelect(i18n, calendar) {
	        this.i18n = i18n;
	        this.years = [];
	        this.select = new core_1.EventEmitter();
	        this.months = calendar.getMonths();
	    }
	    NgbDatepickerNavigationSelect.prototype.ngOnChanges = function (changes) {
	        if (changes['maxYear'] || changes['minYear']) {
	            this._generateYears();
	        }
	    };
	    NgbDatepickerNavigationSelect.prototype.changeMonth = function (month) { this.select.emit(new ngb_date_1.NgbDate(this.date.year, util_1.toInteger(month), 1)); };
	    NgbDatepickerNavigationSelect.prototype.changeYear = function (year) { this.select.emit(new ngb_date_1.NgbDate(util_1.toInteger(year), this.date.month, 1)); };
	    NgbDatepickerNavigationSelect.prototype._generateYears = function () {
	        var _this = this;
	        this.years = Array.from({ length: this.maxYear - this.minYear + 1 }, function (e, i) { return _this.minYear + i; });
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', ngb_date_1.NgbDate)
	    ], NgbDatepickerNavigationSelect.prototype, "date", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDatepickerNavigationSelect.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbDatepickerNavigationSelect.prototype, "maxYear", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbDatepickerNavigationSelect.prototype, "minYear", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbDatepickerNavigationSelect.prototype, "select", void 0);
	    NgbDatepickerNavigationSelect = __decorate([
	        core_1.Component({
	            selector: 'ngb-datepicker-navigation-select',
	            styles: ["\n    select {\n      /* to align with btn-sm */\n      padding: 0.25rem 0.5rem;\n      font-size: 0.875rem;      \n      line-height: 1.25;\n      width: 50%;\n    }\n  "],
	            template: "\n    <select [disabled]=\"disabled\" class=\"custom-select d-inline-block\" [value]=\"date.month\" (change)=\"changeMonth($event.target.value)\">\n      <option *ngFor=\"let m of months\" [value]=\"m\">{{ i18n.getMonthName(m) }}</option>\n    </select>" +
	                "<select [disabled]=\"disabled\" class=\"custom-select d-inline-block\" [value]=\"date.year\" (change)=\"changeYear($event.target.value)\">\n      <option *ngFor=\"let y of years\" [value]=\"y\">{{ y }}</option>\n    </select> \n  " // template needs to be formatted in a certain way so we don't add empty text nodes
	        }), 
	        __metadata('design:paramtypes', [datepicker_i18n_1.NgbDatepickerI18n, ngb_calendar_1.NgbCalendar])
	    ], NgbDatepickerNavigationSelect);
	    return NgbDatepickerNavigationSelect;
	}());
	exports.NgbDatepickerNavigationSelect = NgbDatepickerNavigationSelect;
	
	//# sourceMappingURL=datepicker-navigation-select.js.map


/***/ },
/* 34 */
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
	var core_1 = __webpack_require__(1);
	var dropdown_1 = __webpack_require__(35);
	var dropdown_config_1 = __webpack_require__(36);
	var dropdown_config_2 = __webpack_require__(36);
	exports.NgbDropdownConfig = dropdown_config_2.NgbDropdownConfig;
	var NgbDropdownModule = (function () {
	    function NgbDropdownModule() {
	    }
	    NgbDropdownModule = __decorate([
	        core_1.NgModule({ declarations: dropdown_1.NGB_DROPDOWN_DIRECTIVES, exports: dropdown_1.NGB_DROPDOWN_DIRECTIVES, providers: [dropdown_config_1.NgbDropdownConfig] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbDropdownModule);
	    return NgbDropdownModule;
	}());
	exports.NgbDropdownModule = NgbDropdownModule;
	
	//# sourceMappingURL=dropdown.module.js.map


/***/ },
/* 35 */
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
	var core_1 = __webpack_require__(1);
	var dropdown_config_1 = __webpack_require__(36);
	/**
	 * Transforms a node into a dropdown.
	 */
	var NgbDropdown = (function () {
	    function NgbDropdown(config) {
	        /**
	         *  Defines whether or not the dropdown-menu is open initially.
	         */
	        this._open = false;
	        /**
	         *  An event fired when the dropdown is opened or closed.
	         *  Event's payload equals whether dropdown is open.
	         */
	        this.openChange = new core_1.EventEmitter();
	        this.up = config.up;
	        this.autoClose = config.autoClose;
	    }
	    /**
	     * Checks if the dropdown menu is open or not.
	     */
	    NgbDropdown.prototype.isOpen = function () { return this._open; };
	    /**
	     * Opens the dropdown menu of a given navbar or tabbed navigation.
	     */
	    NgbDropdown.prototype.open = function () {
	        if (!this._open) {
	            this._open = true;
	            this.openChange.emit(true);
	        }
	    };
	    /**
	     * Closes the dropdown menu of a given navbar or tabbed navigation.
	     */
	    NgbDropdown.prototype.close = function () {
	        if (this._open) {
	            this._open = false;
	            this.openChange.emit(false);
	        }
	    };
	    /**
	     * Toggles the dropdown menu of a given navbar or tabbed navigation.
	     */
	    NgbDropdown.prototype.toggle = function () {
	        if (this.isOpen()) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbDropdown.prototype.closeFromOutside = function () {
	        if (this.autoClose) {
	            this.close();
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbDropdown.prototype, "up", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
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
	                '[class.dropdown]': '!up',
	                '[class.dropup]': 'up',
	                '[class.open]': 'isOpen()',
	                '(keyup.esc)': 'closeFromOutside()',
	                '(document:click)': 'closeFromOutside()'
	            }
	        }), 
	        __metadata('design:paramtypes', [dropdown_config_1.NgbDropdownConfig])
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
/* 36 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbDropdown directive.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the dropdowns used in the application.
	 */
	var NgbDropdownConfig = (function () {
	    function NgbDropdownConfig() {
	        this.up = false;
	        this.autoClose = true;
	    }
	    NgbDropdownConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbDropdownConfig);
	    return NgbDropdownConfig;
	}());
	exports.NgbDropdownConfig = NgbDropdownConfig;
	
	//# sourceMappingURL=dropdown-config.js.map


/***/ },
/* 37 */
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
	var core_1 = __webpack_require__(1);
	var modal_container_1 = __webpack_require__(38);
	var modal_backdrop_1 = __webpack_require__(39);
	var modal_window_1 = __webpack_require__(40);
	var modal_stack_1 = __webpack_require__(42);
	var modal_1 = __webpack_require__(44);
	var modal_2 = __webpack_require__(44);
	exports.NgbModal = modal_2.NgbModal;
	var modal_ref_1 = __webpack_require__(43);
	exports.NgbModalRef = modal_ref_1.NgbModalRef;
	var modal_dismiss_reasons_1 = __webpack_require__(41);
	exports.ModalDismissReasons = modal_dismiss_reasons_1.ModalDismissReasons;
	var NgbModalModule = (function () {
	    function NgbModalModule() {
	    }
	    NgbModalModule = __decorate([
	        core_1.NgModule({
	            declarations: [modal_container_1.NgbModalContainer, modal_backdrop_1.NgbModalBackdrop, modal_window_1.NgbModalWindow],
	            entryComponents: [modal_backdrop_1.NgbModalBackdrop, modal_window_1.NgbModalWindow],
	            exports: [modal_container_1.NgbModalContainer],
	            providers: [modal_1.NgbModal, modal_stack_1.NgbModalStack]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbModalModule);
	    return NgbModalModule;
	}());
	exports.NgbModalModule = NgbModalModule;
	
	//# sourceMappingURL=modal.module.js.map


/***/ },
/* 38 */
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
	var core_1 = __webpack_require__(1);
	var util_1 = __webpack_require__(5);
	var modal_backdrop_1 = __webpack_require__(39);
	var modal_window_1 = __webpack_require__(40);
	var modal_stack_1 = __webpack_require__(42);
	var modal_ref_1 = __webpack_require__(43);
	var ModalContentContext = (function () {
	    function ModalContentContext() {
	    }
	    ModalContentContext.prototype.close = function (result) { };
	    ModalContentContext.prototype.dismiss = function (reason) { };
	    return ModalContentContext;
	}());
	var NgbModalContainer = (function () {
	    function NgbModalContainer(_injector, _renderer, _viewContainerRef, componentFactoryResolver, ngbModalStack) {
	        this._injector = _injector;
	        this._renderer = _renderer;
	        this._viewContainerRef = _viewContainerRef;
	        this._backdropFactory = componentFactoryResolver.resolveComponentFactory(modal_backdrop_1.NgbModalBackdrop);
	        this._windowFactory = componentFactoryResolver.resolveComponentFactory(modal_window_1.NgbModalWindow);
	        ngbModalStack.registerContainer(this);
	    }
	    NgbModalContainer.prototype.open = function (content, options) {
	        var modalContentContext = new ModalContentContext();
	        var nodes = this._getContentNodes(content, modalContentContext);
	        var windowCmptRef = this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, nodes);
	        var backdropCmptRef;
	        var ngbModalRef;
	        if (options.backdrop !== false) {
	            backdropCmptRef = this._viewContainerRef.createComponent(this._backdropFactory, 0, this._injector);
	        }
	        ngbModalRef = new modal_ref_1.NgbModalRef(this._viewContainerRef, windowCmptRef, backdropCmptRef);
	        modalContentContext.close = function (result) { ngbModalRef.close(result); };
	        modalContentContext.dismiss = function (reason) { ngbModalRef.dismiss(reason); };
	        this._applyWindowOptions(windowCmptRef.instance, options);
	        return ngbModalRef;
	    };
	    NgbModalContainer.prototype._applyWindowOptions = function (windowInstance, options) {
	        ['backdrop', 'keyboard', 'size'].forEach(function (optionName) {
	            if (util_1.isDefined(options[optionName])) {
	                windowInstance[optionName] = options[optionName];
	            }
	        });
	    };
	    NgbModalContainer.prototype._getContentNodes = function (content, context) {
	        if (!content) {
	            return [];
	        }
	        else if (content instanceof core_1.TemplateRef) {
	            return [this._viewContainerRef.createEmbeddedView(content, context).rootNodes];
	        }
	        else {
	            return [[this._renderer.createText(null, "" + content)]];
	        }
	    };
	    NgbModalContainer = __decorate([
	        core_1.Directive({ selector: 'template[ngbModalContainer]' }), 
	        __metadata('design:paramtypes', [core_1.Injector, core_1.Renderer, core_1.ViewContainerRef, core_1.ComponentFactoryResolver, modal_stack_1.NgbModalStack])
	    ], NgbModalContainer);
	    return NgbModalContainer;
	}());
	exports.NgbModalContainer = NgbModalContainer;
	
	//# sourceMappingURL=modal-container.js.map


/***/ },
/* 39 */
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
	var core_1 = __webpack_require__(1);
	var NgbModalBackdrop = (function () {
	    function NgbModalBackdrop() {
	    }
	    NgbModalBackdrop = __decorate([
	        core_1.Component({ selector: 'ngb-modal-backdrop', template: '', host: { 'class': 'modal-backdrop fade in' } }), 
	        __metadata('design:paramtypes', [])
	    ], NgbModalBackdrop);
	    return NgbModalBackdrop;
	}());
	exports.NgbModalBackdrop = NgbModalBackdrop;
	
	//# sourceMappingURL=modal-backdrop.js.map


/***/ },
/* 40 */
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
	var core_1 = __webpack_require__(1);
	var modal_dismiss_reasons_1 = __webpack_require__(41);
	var NgbModalWindow = (function () {
	    function NgbModalWindow(_elRef, _renderer) {
	        this._elRef = _elRef;
	        this._renderer = _renderer;
	        this.backdrop = true;
	        this.keyboard = true;
	        this.dismissEvent = new core_1.EventEmitter();
	    }
	    NgbModalWindow.prototype.backdropClick = function () {
	        if (this.backdrop === true) {
	            this.dismiss(modal_dismiss_reasons_1.ModalDismissReasons.BACKDROP_CLICK);
	        }
	    };
	    NgbModalWindow.prototype.escKey = function ($event) {
	        if (this.keyboard && !$event.defaultPrevented) {
	            this.dismiss(modal_dismiss_reasons_1.ModalDismissReasons.ESC);
	        }
	    };
	    NgbModalWindow.prototype.dismiss = function (reason) { this.dismissEvent.emit(reason); };
	    NgbModalWindow.prototype.stopPropagation = function ($event) { $event.stopPropagation(); };
	    NgbModalWindow.prototype.ngOnInit = function () {
	        this._elWithFocus = document.activeElement;
	        this._renderer.setElementClass(document.body, 'modal-open', true);
	    };
	    NgbModalWindow.prototype.ngAfterViewInit = function () {
	        if (!this._isNodeChildOfAnother(this._elRef.nativeElement, document.activeElement)) {
	            this._renderer.invokeElementMethod(this._elRef.nativeElement, 'focus', []);
	        }
	    };
	    NgbModalWindow.prototype.ngOnDestroy = function () {
	        if (this._elWithFocus && this._isNodeChildOfAnother(document.body, this._elWithFocus)) {
	            this._renderer.invokeElementMethod(this._elWithFocus, 'focus', []);
	        }
	        else {
	            this._renderer.invokeElementMethod(document.body, 'focus', []);
	        }
	        this._elWithFocus = null;
	        this._renderer.setElementClass(document.body, 'modal-open', false);
	    };
	    NgbModalWindow.prototype._isNodeChildOfAnother = function (parentNode, potentialChildNode) { return parentNode.contains(potentialChildNode); };
	    __decorate([
	        // element that is focused prior to modal opening
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbModalWindow.prototype, "backdrop", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbModalWindow.prototype, "keyboard", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbModalWindow.prototype, "size", void 0);
	    __decorate([
	        core_1.Output('dismiss'), 
	        __metadata('design:type', Object)
	    ], NgbModalWindow.prototype, "dismissEvent", void 0);
	    NgbModalWindow = __decorate([
	        core_1.Component({
	            selector: 'ngb-modal-window',
	            host: {
	                'class': 'modal fade in',
	                'role': 'dialog',
	                'tabindex': '-1',
	                'style': 'display: block;',
	                '(keyup.esc)': 'escKey($event)',
	                '(click)': 'backdropClick()'
	            },
	            template: "\n    <div [class]=\"'modal-dialog' + (size ? ' modal-' + size : '')\" role=\"document\">\n        <div class=\"modal-content\" (click)=\"stopPropagation($event)\"><ng-content></ng-content></div>\n    </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
	    ], NgbModalWindow);
	    return NgbModalWindow;
	}());
	exports.NgbModalWindow = NgbModalWindow;
	
	//# sourceMappingURL=modal-window.js.map


/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	(function (ModalDismissReasons) {
	    ModalDismissReasons[ModalDismissReasons["BACKDROP_CLICK"] = 0] = "BACKDROP_CLICK";
	    ModalDismissReasons[ModalDismissReasons["ESC"] = 1] = "ESC";
	})(exports.ModalDismissReasons || (exports.ModalDismissReasons = {}));
	var ModalDismissReasons = exports.ModalDismissReasons;
	
	//# sourceMappingURL=modal-dismiss-reasons.js.map


/***/ },
/* 42 */
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
	var core_1 = __webpack_require__(1);
	var NgbModalStack = (function () {
	    function NgbModalStack() {
	    }
	    NgbModalStack.prototype.open = function (content, options) {
	        if (options === void 0) { options = {}; }
	        if (!this.modalContainer) {
	            throw new Error('Missing modal container, add <template ngbModalContainer></template> to one of your application templates.');
	        }
	        return this.modalContainer.open(content, options);
	    };
	    NgbModalStack.prototype.registerContainer = function (modalContainer) { this.modalContainer = modalContainer; };
	    NgbModalStack = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbModalStack);
	    return NgbModalStack;
	}());
	exports.NgbModalStack = NgbModalStack;
	
	//# sourceMappingURL=modal-stack.js.map


/***/ },
/* 43 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * A reference to a newly opened modal.
	 */
	var NgbModalRef = (function () {
	    function NgbModalRef(_viewContainerRef, _windowCmptRef, _backdropCmptRef) {
	        var _this = this;
	        this._viewContainerRef = _viewContainerRef;
	        this._windowCmptRef = _windowCmptRef;
	        this._backdropCmptRef = _backdropCmptRef;
	        _windowCmptRef.instance.dismissEvent.subscribe(function (reason) { _this.dismiss(reason); });
	        this.result = new Promise(function (resolve, reject) {
	            _this._resolve = resolve;
	            _this._reject = reject;
	        });
	    }
	    /**
	     * Can be used to close a modal, passing an optional result.
	     */
	    NgbModalRef.prototype.close = function (result) {
	        if (this._windowCmptRef) {
	            this._resolve(result);
	            this._removeModalElements();
	        }
	    };
	    /**
	     * Can be used to dismiss a modal, passing an optional reason.
	     */
	    NgbModalRef.prototype.dismiss = function (reason) {
	        if (this._windowCmptRef) {
	            this._reject(reason);
	            this._removeModalElements();
	        }
	    };
	    NgbModalRef.prototype._removeModalElements = function () {
	        this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowCmptRef.hostView));
	        if (this._backdropCmptRef) {
	            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._backdropCmptRef.hostView));
	        }
	        this._windowCmptRef = null;
	        this._backdropCmptRef = null;
	    };
	    NgbModalRef = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.ComponentRef, core_1.ComponentRef])
	    ], NgbModalRef);
	    return NgbModalRef;
	}());
	exports.NgbModalRef = NgbModalRef;
	
	//# sourceMappingURL=modal-ref.js.map


/***/ },
/* 44 */
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
	var core_1 = __webpack_require__(1);
	var modal_stack_1 = __webpack_require__(42);
	/**
	 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
	 * the "open" method!
	 */
	var NgbModal = (function () {
	    function NgbModal(_modalStack) {
	        this._modalStack = _modalStack;
	    }
	    /**
	     * Opens a new modal window with the specified content and using supplied options.
	     */
	    NgbModal.prototype.open = function (content, options) {
	        if (options === void 0) { options = {}; }
	        return this._modalStack.open(content, options);
	    };
	    NgbModal = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [modal_stack_1.NgbModalStack])
	    ], NgbModal);
	    return NgbModal;
	}());
	exports.NgbModal = NgbModal;
	
	//# sourceMappingURL=modal.js.map


/***/ },
/* 45 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var pagination_1 = __webpack_require__(46);
	var pagination_config_1 = __webpack_require__(47);
	var pagination_config_2 = __webpack_require__(47);
	exports.NgbPaginationConfig = pagination_config_2.NgbPaginationConfig;
	var NgbPaginationModule = (function () {
	    function NgbPaginationModule() {
	    }
	    NgbPaginationModule = __decorate([
	        core_1.NgModule({
	            declarations: pagination_1.NGB_PAGINATION_DIRECTIVES,
	            exports: pagination_1.NGB_PAGINATION_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            providers: [pagination_config_1.NgbPaginationConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPaginationModule);
	    return NgbPaginationModule;
	}());
	exports.NgbPaginationModule = NgbPaginationModule;
	
	//# sourceMappingURL=pagination.module.js.map


/***/ },
/* 46 */
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
	var core_1 = __webpack_require__(1);
	var util_1 = __webpack_require__(5);
	var pagination_config_1 = __webpack_require__(47);
	/**
	 * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
	 */
	var NgbPagination = (function () {
	    function NgbPagination(config) {
	        this._pageCount = 0;
	        this.pages = [];
	        /**
	         *  Current page.
	         */
	        this.page = 0;
	        /**
	         *  An event fired when the page is changed.
	         *  Event's payload equals the current page.
	         */
	        this.pageChange = new core_1.EventEmitter();
	        this.boundaryLinks = config.boundaryLinks;
	        this.directionLinks = config.directionLinks;
	        this.ellipses = config.ellipses;
	        this.maxSize = config.maxSize;
	        this.pageSize = config.pageSize;
	        this.rotate = config.rotate;
	        this.size = config.size;
	    }
	    Object.defineProperty(NgbPagination.prototype, "pageCount", {
	        get: function () { return this._pageCount; },
	        enumerable: true,
	        configurable: true
	    });
	    NgbPagination.prototype.hasPrevious = function () { return this.page > 1; };
	    NgbPagination.prototype.hasNext = function () { return this.page < this._pageCount; };
	    NgbPagination.prototype.selectPage = function (pageNumber) {
	        var prevPageNo = this.page;
	        this.page = this._getPageNoInRange(pageNumber);
	        if (this.page !== prevPageNo) {
	            this.pageChange.emit(this.page);
	        }
	        this.ngOnChanges();
	    };
	    NgbPagination.prototype.ngOnChanges = function () {
	        // re-calculate new length of pages
	        this._pageCount = Math.ceil(this.collectionSize / this.pageSize);
	        // fill-in model needed to render pages
	        this.pages.length = 0;
	        for (var i = 1; i <= this._pageCount; i++) {
	            this.pages.push(i);
	        }
	        // get selected page
	        this.page = this._getPageNoInRange(this.page);
	        // apply maxSize if necessary
	        if (this.maxSize > 0 && this._pageCount > this.maxSize) {
	            var start = 0;
	            var end = this._pageCount;
	            // either paginating or rotating page numbers
	            if (this.rotate) {
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
	     * @internal
	     */
	    NgbPagination.prototype.isEllipsis = function (pageNumber) { return pageNumber === -1; };
	    /**
	     * Appends ellipses and first/last page number to the displayed pages
	     */
	    NgbPagination.prototype._applyEllipses = function (start, end) {
	        if (this.ellipses) {
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
	        var leftOffset = Math.floor(this.maxSize / 2);
	        var rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
	        if (this.page <= leftOffset) {
	            // very beginning, no rotation -> [0..maxSize]
	            end = this.maxSize;
	        }
	        else if (this._pageCount - this.page < leftOffset) {
	            // very end, no rotation -> [len-maxSize..len]
	            start = this._pageCount - this.maxSize;
	        }
	        else {
	            // rotate
	            start = this.page - leftOffset - 1;
	            end = this.page + rightOffset;
	        }
	        return [start, end];
	    };
	    /**
	     * Paginates page numbers based on maxSize items per page
	     */
	    NgbPagination.prototype._applyPagination = function () {
	        var page = Math.ceil(this.page / this.maxSize) - 1;
	        var start = page * this.maxSize;
	        var end = start + this.maxSize;
	        return [start, end];
	    };
	    NgbPagination.prototype._getPageNoInRange = function (newPageNo) { return util_1.getValueInRange(newPageNo, this._pageCount, 1); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbPagination.prototype, "boundaryLinks", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbPagination.prototype, "directionLinks", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbPagination.prototype, "ellipses", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbPagination.prototype, "rotate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbPagination.prototype, "collectionSize", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbPagination.prototype, "maxSize", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "page", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbPagination.prototype, "pageSize", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "pageChange", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "size", void 0);
	    NgbPagination = __decorate([
	        core_1.Component({
	            selector: 'ngb-pagination',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            template: "\n    <nav>\n      <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n        <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasPrevious()\">\n          <a aria-label=\"First\" class=\"page-link\" href (click)=\"!!selectPage(1)\">\n            <span aria-hidden=\"true\">&laquo;&laquo;</span>\n            <span class=\"sr-only\">First</span>\n          </a>                \n        </li>\n      \n        <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasPrevious()\">\n          <a aria-label=\"Previous\" class=\"page-link\" href (click)=\"!!selectPage(page-1)\">\n            <span aria-hidden=\"true\">&laquo;</span>\n            <span class=\"sr-only\">Previous</span>\n          </a>\n        </li>\n\n        <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\" \n          [class.disabled]=\"isEllipsis(pageNumber)\">\n          <a *ngIf=\"isEllipsis(pageNumber)\" class=\"page-link\">...</a>\n          <a *ngIf=\"!isEllipsis(pageNumber)\" class=\"page-link\" href (click)=\"!!selectPage(pageNumber)\">{{pageNumber}}</a>\n        </li>\n\n        <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasNext()\">\n          <a aria-label=\"Next\" class=\"page-link\" href (click)=\"!!selectPage(page+1)\">\n            <span aria-hidden=\"true\">&raquo;</span>\n            <span class=\"sr-only\">Next</span>\n          </a>\n        </li>\n        \n        <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasNext()\">\n          <a aria-label=\"Last\" class=\"page-link\" href (click)=\"!!selectPage(pageCount)\">\n            <span aria-hidden=\"true\">&raquo;&raquo;</span>\n            <span class=\"sr-only\">Last</span>\n          </a>                \n        </li>        \n      </ul>\n    </nav>\n  "
	        }), 
	        __metadata('design:paramtypes', [pagination_config_1.NgbPaginationConfig])
	    ], NgbPagination);
	    return NgbPagination;
	}());
	exports.NgbPagination = NgbPagination;
	exports.NGB_PAGINATION_DIRECTIVES = [NgbPagination];
	
	//# sourceMappingURL=pagination.js.map


/***/ },
/* 47 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbPagination component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the paginations used in the application.
	 */
	var NgbPaginationConfig = (function () {
	    function NgbPaginationConfig() {
	        this.boundaryLinks = false;
	        this.directionLinks = true;
	        this.ellipses = true;
	        this.maxSize = 0;
	        this.pageSize = 10;
	        this.rotate = false;
	    }
	    NgbPaginationConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbPaginationConfig);
	    return NgbPaginationConfig;
	}());
	exports.NgbPaginationConfig = NgbPaginationConfig;
	
	//# sourceMappingURL=pagination-config.js.map


/***/ },
/* 48 */
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
	var core_1 = __webpack_require__(1);
	var popover_1 = __webpack_require__(49);
	var popover_config_1 = __webpack_require__(51);
	var popover_config_2 = __webpack_require__(51);
	exports.NgbPopoverConfig = popover_config_2.NgbPopoverConfig;
	var NgbPopoverModule = (function () {
	    function NgbPopoverModule() {
	    }
	    NgbPopoverModule = __decorate([
	        core_1.NgModule({
	            declarations: popover_1.NGB_POPOVER_DIRECTIVES,
	            exports: popover_1.NGB_POPOVER_DIRECTIVES,
	            entryComponents: [popover_1.NgbPopoverWindow],
	            providers: [popover_config_1.NgbPopoverConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPopoverModule);
	    return NgbPopoverModule;
	}());
	exports.NgbPopoverModule = NgbPopoverModule;
	
	//# sourceMappingURL=popover.module.js.map


/***/ },
/* 49 */
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
	var core_1 = __webpack_require__(1);
	var triggers_1 = __webpack_require__(50);
	var positioning_1 = __webpack_require__(31);
	var popup_1 = __webpack_require__(9);
	var popover_config_1 = __webpack_require__(51);
	var NgbPopoverWindow = (function () {
	    function NgbPopoverWindow() {
	        this.placement = 'top';
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
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
	    function NgbPopover(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, ngZone) {
	        var _this = this;
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this.placement = config.placement;
	        this.triggers = config.triggers;
	        this._popupService = new popup_1.PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
	        this._zoneSubscription = ngZone.onStable.subscribe(function () {
	            if (_this._windowRef) {
	                positioning_1.positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement);
	            }
	        });
	    }
	    /**
	     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
	     */
	    NgbPopover.prototype.open = function () {
	        if (!this._windowRef) {
	            this._windowRef = this._popupService.open(this.ngbPopover);
	            this._windowRef.instance.placement = this.placement;
	            this._windowRef.instance.title = this.title;
	        }
	    };
	    /**
	     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
	     */
	    NgbPopover.prototype.close = function () {
	        this._popupService.close();
	        this._windowRef = null;
	    };
	    /**
	     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
	     */
	    NgbPopover.prototype.toggle = function () {
	        if (this._windowRef) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    };
	    NgbPopover.prototype.ngOnInit = function () {
	        this._unregisterListenersFn = triggers_1.listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
	    };
	    NgbPopover.prototype.ngOnDestroy = function () {
	        this._unregisterListenersFn();
	        this._zoneSubscription.unsubscribe();
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
	        __metadata('design:type', String)
	    ], NgbPopover.prototype, "triggers", void 0);
	    NgbPopover = __decorate([
	        core_1.Directive({ selector: '[ngbPopover]', exportAs: 'ngbPopover' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.Injector, core_1.ComponentFactoryResolver, core_1.ViewContainerRef, popover_config_1.NgbPopoverConfig, core_1.NgZone])
	    ], NgbPopover);
	    return NgbPopover;
	}());
	exports.NgbPopover = NgbPopover;
	exports.NGB_POPOVER_DIRECTIVES = [NgbPopover, NgbPopoverWindow];
	
	//# sourceMappingURL=popover.js.map


/***/ },
/* 50 */
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
	var noopFn = function () { };
	function listenToTriggers(renderer, nativeElement, triggers, openFn, closeFn, toggleFn) {
	    var parsedTriggers = parseTriggers(triggers);
	    var listeners = [];
	    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
	        return noopFn;
	    }
	    parsedTriggers.forEach(function (trigger) {
	        if (trigger.open === trigger.close) {
	            listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
	        }
	        else {
	            listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
	        }
	    });
	    return function () { listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); }); };
	}
	exports.listenToTriggers = listenToTriggers;
	
	//# sourceMappingURL=triggers.js.map


/***/ },
/* 51 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbPopover directive.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the popovers used in the application.
	 */
	var NgbPopoverConfig = (function () {
	    function NgbPopoverConfig() {
	        this.placement = 'top';
	        this.triggers = 'click';
	    }
	    NgbPopoverConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbPopoverConfig);
	    return NgbPopoverConfig;
	}());
	exports.NgbPopoverConfig = NgbPopoverConfig;
	
	//# sourceMappingURL=popover-config.js.map


/***/ },
/* 52 */
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
	var core_1 = __webpack_require__(1);
	var progressbar_1 = __webpack_require__(53);
	var progressbar_config_1 = __webpack_require__(54);
	var progressbar_config_2 = __webpack_require__(54);
	exports.NgbProgressbarConfig = progressbar_config_2.NgbProgressbarConfig;
	var NgbProgressbarModule = (function () {
	    function NgbProgressbarModule() {
	    }
	    NgbProgressbarModule = __decorate([
	        core_1.NgModule({ declarations: progressbar_1.NGB_PROGRESSBAR_DIRECTIVES, exports: progressbar_1.NGB_PROGRESSBAR_DIRECTIVES, providers: [progressbar_config_1.NgbProgressbarConfig] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbProgressbarModule);
	    return NgbProgressbarModule;
	}());
	exports.NgbProgressbarModule = NgbProgressbarModule;
	
	//# sourceMappingURL=progressbar.module.js.map


/***/ },
/* 53 */
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
	var core_1 = __webpack_require__(1);
	var util_1 = __webpack_require__(5);
	var progressbar_config_1 = __webpack_require__(54);
	/**
	 * Directive that can be used to provide feedback on the progress of a workflow or an action.
	 */
	var NgbProgressbar = (function () {
	    function NgbProgressbar(config) {
	        /**
	         * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
	         */
	        this.value = 0;
	        this.max = config.max;
	        this.animated = config.animated;
	        this.striped = config.striped;
	        this.type = config.type;
	    }
	    NgbProgressbar.prototype.getValue = function () { return util_1.getValueInRange(this.value, this.max); };
	    NgbProgressbar.prototype.getPercentValue = function () { return 100 * this.getValue() / this.max; };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbProgressbar.prototype, "max", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbProgressbar.prototype, "animated", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
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
	            template: "\n    <progress class=\"progress {{type ? 'progress-' + type : ''}}\" \n      [class.progress-animated]=\"animated\" \n      [class.progress-striped]=\"striped\"\n      [max]=\"max\" [value]=\"getValue()\">\n      <div class=\"progress\">\n        <span class=\"progress-bar\" [style.width.%]=\"getPercentValue()\"><ng-content></ng-content></span>\n      </div>\n    </progress>\n  "
	        }), 
	        __metadata('design:paramtypes', [progressbar_config_1.NgbProgressbarConfig])
	    ], NgbProgressbar);
	    return NgbProgressbar;
	}());
	exports.NgbProgressbar = NgbProgressbar;
	exports.NGB_PROGRESSBAR_DIRECTIVES = [NgbProgressbar];
	
	//# sourceMappingURL=progressbar.js.map


/***/ },
/* 54 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbProgressbar component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the progress bars used in the application.
	 */
	var NgbProgressbarConfig = (function () {
	    function NgbProgressbarConfig() {
	        this.max = 100;
	        this.animated = false;
	        this.striped = false;
	    }
	    NgbProgressbarConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbProgressbarConfig);
	    return NgbProgressbarConfig;
	}());
	exports.NgbProgressbarConfig = NgbProgressbarConfig;
	
	//# sourceMappingURL=progressbar-config.js.map


/***/ },
/* 55 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var rating_config_1 = __webpack_require__(56);
	var rating_1 = __webpack_require__(57);
	var rating_config_2 = __webpack_require__(56);
	exports.NgbRatingConfig = rating_config_2.NgbRatingConfig;
	var NgbRatingModule = (function () {
	    function NgbRatingModule() {
	    }
	    NgbRatingModule = __decorate([
	        core_1.NgModule({
	            declarations: rating_1.NGB_RATING_DIRECTIVES,
	            exports: rating_1.NGB_RATING_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            providers: [rating_config_1.NgbRatingConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbRatingModule);
	    return NgbRatingModule;
	}());
	exports.NgbRatingModule = NgbRatingModule;
	
	//# sourceMappingURL=rating.module.js.map


/***/ },
/* 56 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbRating component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the ratings used in the application.
	 */
	var NgbRatingConfig = (function () {
	    function NgbRatingConfig() {
	        this.max = 10;
	        this.readonly = false;
	    }
	    NgbRatingConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbRatingConfig);
	    return NgbRatingConfig;
	}());
	exports.NgbRatingConfig = NgbRatingConfig;
	
	//# sourceMappingURL=rating-config.js.map


/***/ },
/* 57 */
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
	var core_1 = __webpack_require__(1);
	var rating_config_1 = __webpack_require__(56);
	/**
	 * Rating directive that will take care of visualising a star rating bar.
	 */
	var NgbRating = (function () {
	    function NgbRating(config) {
	        this.range = [];
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
	        this.max = config.max;
	        this.readonly = config.readonly;
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
	        __metadata('design:type', Boolean)
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
	            template: "\n    <span tabindex=\"0\" (mouseleave)=\"reset()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"rate\">\n      <template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\n        <span class=\"sr-only\">({{ index < rate ? '*' : ' ' }})</span>\n        <span (mouseenter)=\"enter(index + 1)\" (click)=\"update(index + 1)\" [title]=\"r.title\" \n        [attr.aria-valuetext]=\"r.title\" \n        [style.cursor]=\"readonly ? 'not-allowed' : 'pointer'\">{{ index < rate ? '&#9733;' : '&#9734;' }}</span>\n      </template>\n    </span>\n  "
	        }), 
	        __metadata('design:paramtypes', [rating_config_1.NgbRatingConfig])
	    ], NgbRating);
	    return NgbRating;
	}());
	exports.NgbRating = NgbRating;
	exports.NGB_RATING_DIRECTIVES = [NgbRating];
	
	//# sourceMappingURL=rating.js.map


/***/ },
/* 58 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var tabset_1 = __webpack_require__(59);
	var tabset_config_1 = __webpack_require__(60);
	var tabset_config_2 = __webpack_require__(60);
	exports.NgbTabsetConfig = tabset_config_2.NgbTabsetConfig;
	var NgbTabsetModule = (function () {
	    function NgbTabsetModule() {
	    }
	    NgbTabsetModule = __decorate([
	        core_1.NgModule({
	            declarations: tabset_1.NGB_TABSET_DIRECTIVES,
	            exports: tabset_1.NGB_TABSET_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            providers: [tabset_config_1.NgbTabsetConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTabsetModule);
	    return NgbTabsetModule;
	}());
	exports.NgbTabsetModule = NgbTabsetModule;
	
	//# sourceMappingURL=tabset.module.js.map


/***/ },
/* 59 */
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
	var core_1 = __webpack_require__(1);
	var tabset_config_1 = __webpack_require__(60);
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
	        __metadata('design:type', Object)
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
	    function NgbTabset(config) {
	        /**
	         * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
	         */
	        this.change = new core_1.EventEmitter();
	        this.type = config.type;
	    }
	    /**
	     * Selects the tab with the given id and shows its associated pane.
	     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
	     */
	    NgbTabset.prototype.select = function (tabId) {
	        var selectedTab = this._getTabById(tabId);
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
	        __metadata('design:type', Object)
	    ], NgbTabset.prototype, "type", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbTabset.prototype, "change", void 0);
	    NgbTabset = __decorate([
	        core_1.Component({
	            selector: 'ngb-tabset',
	            exportAs: 'ngbTabset',
	            template: "\n    <ul [class]=\"'nav nav-' + type\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\" \n          href (click)=\"!!select(tab.id)\">\n          {{tab.title}}<template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <template ngFor let-tab [ngForOf]=\"tabs\">\n        <div class=\"tab-pane active\" *ngIf=\"tab.id === activeId\" role=\"tabpanel\" [attr.aria-labelledby]=\"tab.id\">\n          <template [ngTemplateOutlet]=\"tab.contentTpl.templateRef\"></template>\n        </div>\n      </template>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [tabset_config_1.NgbTabsetConfig])
	    ], NgbTabset);
	    return NgbTabset;
	}());
	exports.NgbTabset = NgbTabset;
	exports.NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle];
	
	//# sourceMappingURL=tabset.js.map


/***/ },
/* 60 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbTabset component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the tabsets used in the application.
	 */
	var NgbTabsetConfig = (function () {
	    function NgbTabsetConfig() {
	        this.type = 'tabs';
	    }
	    NgbTabsetConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbTabsetConfig);
	    return NgbTabsetConfig;
	}());
	exports.NgbTabsetConfig = NgbTabsetConfig;
	
	//# sourceMappingURL=tabset-config.js.map


/***/ },
/* 61 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var timepicker_1 = __webpack_require__(62);
	var timepicker_config_1 = __webpack_require__(64);
	var timepicker_config_2 = __webpack_require__(64);
	exports.NgbTimepickerConfig = timepicker_config_2.NgbTimepickerConfig;
	var NgbTimepickerModule = (function () {
	    function NgbTimepickerModule() {
	    }
	    NgbTimepickerModule = __decorate([
	        core_1.NgModule({
	            declarations: timepicker_1.NGB_TIMEPICKER_DIRECTIVES,
	            exports: timepicker_1.NGB_TIMEPICKER_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            providers: [timepicker_config_1.NgbTimepickerConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTimepickerModule);
	    return NgbTimepickerModule;
	}());
	exports.NgbTimepickerModule = NgbTimepickerModule;
	
	//# sourceMappingURL=timepicker.module.js.map


/***/ },
/* 62 */
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
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(13);
	var util_1 = __webpack_require__(5);
	var ngb_time_1 = __webpack_require__(63);
	var timepicker_config_1 = __webpack_require__(64);
	var NGB_TIMEPICKER_VALUE_ACCESSOR = {
	    provide: forms_1.NG_VALUE_ACCESSOR,
	    useExisting: core_1.forwardRef(function () { return NgbTimepicker; }),
	    multi: true
	};
	/**
	 * A lightweight & configurable timepicker directive.
	 */
	var NgbTimepicker = (function () {
	    function NgbTimepicker(config) {
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        this.meridian = config.meridian;
	        this.spinners = config.spinners;
	        this.seconds = config.seconds;
	        this.hourStep = config.hourStep;
	        this.minuteStep = config.minuteStep;
	        this.secondStep = config.secondStep;
	        this.disabled = config.disabled;
	        this.readonlyInputs = config.readonlyInputs;
	    }
	    NgbTimepicker.prototype.writeValue = function (value) {
	        this.model = value ? new ngb_time_1.NgbTime(value.hour, value.minute, value.second) : new ngb_time_1.NgbTime();
	        if (!this.seconds && (!value || !util_1.isNumber(value.second))) {
	            this.model.second = 0;
	        }
	    };
	    NgbTimepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    NgbTimepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    NgbTimepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.changeHour = function (step) {
	        this.model.changeHour(step);
	        this.propagateModelChange();
	    };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.changeMinute = function (step) {
	        this.model.changeMinute(step);
	        this.propagateModelChange();
	    };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.changeSecond = function (step) {
	        this.model.changeSecond(step);
	        this.propagateModelChange();
	    };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.updateHour = function (newVal) {
	        this.model.updateHour(util_1.toInteger(newVal));
	        this.propagateModelChange();
	    };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.updateMinute = function (newVal) {
	        this.model.updateMinute(util_1.toInteger(newVal));
	        this.propagateModelChange();
	    };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.updateSecond = function (newVal) {
	        this.model.updateSecond(util_1.toInteger(newVal));
	        this.propagateModelChange();
	    };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.toggleMeridian = function () {
	        if (this.meridian) {
	            this.changeHour(12);
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.formatHour = function (value) { return util_1.padNumber(util_1.isNumber(value) ? (value % (this.meridian ? 12 : 24)) : NaN); };
	    /**
	     * @internal
	     */
	    NgbTimepicker.prototype.formatMinSec = function (value) { return util_1.padNumber(value); };
	    NgbTimepicker.prototype.ngOnChanges = function (changes) {
	        if (changes['seconds'] && !this.seconds && this.model && !util_1.isNumber(this.model.second)) {
	            this.model.second = 0;
	            this.propagateModelChange(false);
	        }
	    };
	    NgbTimepicker.prototype.propagateModelChange = function (touched) {
	        if (touched === void 0) { touched = true; }
	        if (touched) {
	            this.onTouched();
	        }
	        if (this.model.isValid(this.seconds)) {
	            this.onChange({ hour: this.model.hour, minute: this.model.minute, second: this.model.second });
	        }
	        else {
	            this.onChange(null);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbTimepicker.prototype, "meridian", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbTimepicker.prototype, "spinners", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbTimepicker.prototype, "seconds", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbTimepicker.prototype, "hourStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbTimepicker.prototype, "minuteStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbTimepicker.prototype, "secondStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbTimepicker.prototype, "readonlyInputs", void 0);
	    NgbTimepicker = __decorate([
	        core_1.Component({
	            selector: 'ngb-timepicker',
	            styles: ["\n    .chevron::before {\n      border-style: solid;\n      border-width: 0.29em 0.29em 0 0;\n      content: '';\n      display: inline-block;\n      height: 0.69em;\n      left: 0.05em;\n      position: relative;\n      top: 0.15em;\n      transform: rotate(-45deg);\n      vertical-align: middle;\n      width: 0.71em;\n    }\n    \n    .chevron.bottom:before {\n      top: -.3em;\n      transform: rotate(135deg);\n    }\n    \n    .btn-link {\n      outline: 0;\n    }\n\n    .btn-link.disabled {\n      cursor: not-allowed;\n      opacity: .65;\n    }\n  "],
	            template: "\n     <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <table>\n        <tr *ngIf=\"spinners\">\n          <td class=\"text-xs-center\">\n            <button type=\"button\" class=\"btn-link\" (click)=\"changeHour(hourStep)\"\n              [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n              <span class=\"chevron\"></span>\n            </button>\n          </td>\n          <td>&nbsp;</td>\n          <td class=\"text-xs-center\">\n            <button type=\"button\" class=\"btn-link\" (click)=\"changeMinute(minuteStep)\"\n              [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n                <span class=\"chevron\"></span>\n            </button>\n          </td>\n          <template [ngIf]=\"seconds\">\n            <td>&nbsp;</td>\n            <td class=\"text-xs-center\">\n              <button type=\"button\" class=\"btn-link\" (click)=\"changeSecond(secondStep)\"\n                [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n                <span class=\"chevron\"></span>\n              </button>\n            </td>\n          </template>\n          <template [ngIf]=\"meridian\">\n            <td>&nbsp;</td>\n            <td>&nbsp;</td>\n          </template>\n        </tr>\n        <tr>\n          <td>\n            <input type=\"text\" class=\"form-control\" maxlength=\"2\" size=\"2\" placeholder=\"HH\"\n              [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($event.target.value)\" \n              [readonly]=\"readonlyInputs\" [disabled]=\"disabled\">\n          </td>\n          <td>&nbsp;:&nbsp;</td>\n          <td>\n            <input type=\"text\" class=\"form-control\" maxlength=\"2\" size=\"2\" placeholder=\"MM\"\n              [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($event.target.value)\" \n              [readonly]=\"readonlyInputs\" [disabled]=\"disabled\">\n          </td>\n          <template [ngIf]=\"seconds\">\n            <td>&nbsp;:&nbsp;</td>\n            <input type=\"text\" class=\"form-control\" maxlength=\"2\" size=\"2\" placeholder=\"SS\"\n              [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($event.target.value)\" \n              [readonly]=\"readonlyInputs\" [disabled]=\"disabled\">\n          </template>\n          <template [ngIf]=\"meridian\">\n            <td>&nbsp;&nbsp;</td>\n            <td>\n              <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"toggleMeridian()\">{{model.hour > 12 ? 'PM' : 'AM'}}</button>\n            </td>\n          </template>\n        </tr>\n        <tr *ngIf=\"spinners\">\n          <td class=\"text-xs-center\">\n            <button type=\"button\" class=\"btn-link\" (click)=\"changeHour(-hourStep)\" \n              [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n              <span class=\"chevron bottom\"></span>\n            </button>\n          </td>\n          <td>&nbsp;</td>\n          <td class=\"text-xs-center\">\n            <button type=\"button\" class=\"btn-link\" (click)=\"changeMinute(-minuteStep)\"\n              [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n              <span class=\"chevron bottom\"></span>\n            </button>\n          </td>\n          <template [ngIf]=\"seconds\">\n            <td>&nbsp;</td>\n            <td class=\"text-xs-center\">\n              <button type=\"button\" class=\"btn-link\" (click)=\"changeSecond(-secondStep)\"\n                [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n                <span class=\"chevron bottom\"></span>\n              </button>\n            </td>\n          </template>\n          <template [ngIf]=\"meridian\">\n            <td>&nbsp;</td>\n            <td>&nbsp;</td>\n          </template>\n        </tr>\n      </table>\n    </fieldset>\n  ",
	            providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [timepicker_config_1.NgbTimepickerConfig])
	    ], NgbTimepicker);
	    return NgbTimepicker;
	}());
	exports.NgbTimepicker = NgbTimepicker;
	exports.NGB_TIMEPICKER_DIRECTIVES = [NgbTimepicker];
	
	//# sourceMappingURL=timepicker.js.map


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(5);
	var NgbTime = (function () {
	    function NgbTime(hour, minute, second) {
	        this.hour = util_1.toInteger(hour);
	        this.minute = util_1.toInteger(minute);
	        this.second = util_1.toInteger(second);
	    }
	    NgbTime.prototype.changeHour = function (step) {
	        if (step === void 0) { step = 1; }
	        this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
	    };
	    NgbTime.prototype.updateHour = function (hour) {
	        if (util_1.isNumber(hour)) {
	            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
	        }
	        else {
	            this.hour = NaN;
	        }
	    };
	    NgbTime.prototype.changeMinute = function (step) {
	        if (step === void 0) { step = 1; }
	        this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
	    };
	    NgbTime.prototype.updateMinute = function (minute) {
	        if (util_1.isNumber(minute)) {
	            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
	            this.changeHour(Math.floor(minute / 60));
	        }
	        else {
	            this.minute = NaN;
	        }
	    };
	    NgbTime.prototype.changeSecond = function (step) {
	        if (step === void 0) { step = 1; }
	        this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
	    };
	    NgbTime.prototype.updateSecond = function (second) {
	        if (util_1.isNumber(second)) {
	            this.second = second < 0 ? 60 + second % 60 : second % 60;
	            this.changeMinute(Math.floor(second / 60));
	        }
	        else {
	            this.second = NaN;
	        }
	    };
	    NgbTime.prototype.isValid = function (checkSecs) {
	        if (checkSecs === void 0) { checkSecs = true; }
	        return util_1.isNumber(this.hour) && util_1.isNumber(this.minute) && (checkSecs ? util_1.isNumber(this.second) : true);
	    };
	    NgbTime.prototype.toString = function () { return (this.hour || 0) + ":" + (this.minute || 0) + ":" + (this.second || 0); };
	    return NgbTime;
	}());
	exports.NgbTime = NgbTime;
	
	//# sourceMappingURL=ngb-time.js.map


/***/ },
/* 64 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbTimepicker component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the timepickers used in the application.
	 */
	var NgbTimepickerConfig = (function () {
	    function NgbTimepickerConfig() {
	        this.meridian = false;
	        this.spinners = true;
	        this.seconds = false;
	        this.hourStep = 1;
	        this.minuteStep = 1;
	        this.secondStep = 1;
	        this.disabled = false;
	        this.readonlyInputs = false;
	    }
	    NgbTimepickerConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbTimepickerConfig);
	    return NgbTimepickerConfig;
	}());
	exports.NgbTimepickerConfig = NgbTimepickerConfig;
	
	//# sourceMappingURL=timepicker-config.js.map


/***/ },
/* 65 */
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
	var core_1 = __webpack_require__(1);
	var tooltip_1 = __webpack_require__(66);
	var tooltip_config_1 = __webpack_require__(67);
	var tooltip_config_2 = __webpack_require__(67);
	exports.NgbTooltipConfig = tooltip_config_2.NgbTooltipConfig;
	var NgbTooltipModule = (function () {
	    function NgbTooltipModule() {
	    }
	    NgbTooltipModule = __decorate([
	        core_1.NgModule({
	            declarations: [tooltip_1.NgbTooltip, tooltip_1.NgbTooltipWindow],
	            exports: [tooltip_1.NgbTooltip],
	            entryComponents: [tooltip_1.NgbTooltipWindow],
	            providers: [tooltip_config_1.NgbTooltipConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTooltipModule);
	    return NgbTooltipModule;
	}());
	exports.NgbTooltipModule = NgbTooltipModule;
	
	//# sourceMappingURL=tooltip.module.js.map


/***/ },
/* 66 */
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
	var core_1 = __webpack_require__(1);
	var triggers_1 = __webpack_require__(50);
	var positioning_1 = __webpack_require__(31);
	var popup_1 = __webpack_require__(9);
	var tooltip_config_1 = __webpack_require__(67);
	var NgbTooltipWindow = (function () {
	    function NgbTooltipWindow() {
	        this.placement = 'top';
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
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
	    function NgbTooltip(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, ngZone) {
	        var _this = this;
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this.placement = config.placement;
	        this.triggers = config.triggers;
	        this._popupService = new popup_1.PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
	        this._zoneSubscription = ngZone.onStable.subscribe(function () {
	            if (_this._windowRef) {
	                positioning_1.positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement);
	            }
	        });
	    }
	    /**
	     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
	     */
	    NgbTooltip.prototype.open = function () {
	        if (!this._windowRef) {
	            this._windowRef = this._popupService.open(this.ngbTooltip);
	            this._windowRef.instance.placement = this.placement;
	        }
	    };
	    /**
	     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
	     */
	    NgbTooltip.prototype.close = function () {
	        this._popupService.close();
	        this._windowRef = null;
	    };
	    /**
	     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
	     */
	    NgbTooltip.prototype.toggle = function () {
	        if (this._windowRef) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    };
	    NgbTooltip.prototype.ngOnInit = function () {
	        this._unregisterListenersFn = triggers_1.listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
	    };
	    NgbTooltip.prototype.ngOnDestroy = function () {
	        this._unregisterListenersFn();
	        this._zoneSubscription.unsubscribe();
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
	        __metadata('design:type', String)
	    ], NgbTooltip.prototype, "triggers", void 0);
	    NgbTooltip = __decorate([
	        core_1.Directive({ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.Injector, core_1.ComponentFactoryResolver, core_1.ViewContainerRef, tooltip_config_1.NgbTooltipConfig, core_1.NgZone])
	    ], NgbTooltip);
	    return NgbTooltip;
	}());
	exports.NgbTooltip = NgbTooltip;
	
	//# sourceMappingURL=tooltip.js.map


/***/ },
/* 67 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbTooltip directive.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the tooltips used in the application.
	 */
	var NgbTooltipConfig = (function () {
	    function NgbTooltipConfig() {
	        this.placement = 'top';
	        this.triggers = 'hover';
	    }
	    NgbTooltipConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbTooltipConfig);
	    return NgbTooltipConfig;
	}());
	exports.NgbTooltipConfig = NgbTooltipConfig;
	
	//# sourceMappingURL=tooltip-config.js.map


/***/ },
/* 68 */
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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var highlight_1 = __webpack_require__(69);
	var typeahead_window_1 = __webpack_require__(70);
	var typeahead_1 = __webpack_require__(71);
	var typeahead_config_1 = __webpack_require__(90);
	var typeahead_config_2 = __webpack_require__(90);
	exports.NgbTypeaheadConfig = typeahead_config_2.NgbTypeaheadConfig;
	var NgbTypeaheadModule = (function () {
	    function NgbTypeaheadModule() {
	    }
	    NgbTypeaheadModule = __decorate([
	        core_1.NgModule({
	            declarations: [typeahead_1.NgbTypeahead, highlight_1.NgbHighlight, typeahead_window_1.NgbTypeaheadWindow],
	            exports: [typeahead_1.NgbTypeahead],
	            imports: [common_1.CommonModule],
	            entryComponents: [typeahead_window_1.NgbTypeaheadWindow],
	            providers: [typeahead_config_1.NgbTypeaheadConfig]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTypeaheadModule);
	    return NgbTypeaheadModule;
	}());
	exports.NgbTypeaheadModule = NgbTypeaheadModule;
	
	//# sourceMappingURL=typeahead.module.js.map


/***/ },
/* 69 */
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
	var core_1 = __webpack_require__(1);
	var util_1 = __webpack_require__(5);
	var NgbHighlight = (function () {
	    function NgbHighlight() {
	        this.highlightClass = 'ngb-highlight';
	    }
	    NgbHighlight.prototype.ngOnChanges = function () {
	        var resultStr = util_1.toString(this.result);
	        var resultLC = resultStr.toLowerCase();
	        var termLC = util_1.toString(this.term).toLowerCase();
	        var currentIdx = 0;
	        if (termLC.length > 0) {
	            this.parts = resultLC.split(new RegExp("(" + util_1.regExpEscape(termLC) + ")")).map(function (part) {
	                var originalPart = resultStr.substr(currentIdx, part.length);
	                currentIdx += part.length;
	                return originalPart;
	            });
	        }
	        else {
	            this.parts = [resultStr];
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbHighlight.prototype, "highlightClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbHighlight.prototype, "result", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbHighlight.prototype, "term", void 0);
	    NgbHighlight = __decorate([
	        core_1.Component({
	            selector: 'ngb-highlight',
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            template: "<template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\">" +
	                "<span *ngIf=\"isOdd\" class=\"{{highlightClass}}\">{{part}}</span><template [ngIf]=\"!isOdd\">{{part}}</template>" +
	                "</template>",
	            styles: ["\n    .ngb-highlight {\n      font-weight: bold;\n    }\n  "]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbHighlight);
	    return NgbHighlight;
	}());
	exports.NgbHighlight = NgbHighlight;
	
	//# sourceMappingURL=highlight.js.map


/***/ },
/* 70 */
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
	var core_1 = __webpack_require__(1);
	var util_1 = __webpack_require__(5);
	var NgbTypeaheadWindow = (function () {
	    function NgbTypeaheadWindow() {
	        this.activeIdx = 0;
	        /**
	         * A function used to format a given result before display. This function should return a formatted string without any
	         * HTML markup
	         */
	        this.formatter = util_1.toString;
	        /**
	         * Event raised when user selects a particular result row
	         */
	        this.selectEvent = new core_1.EventEmitter();
	    }
	    NgbTypeaheadWindow.prototype.getActive = function () { return this.results[this.activeIdx]; };
	    /**
	     * @internal
	     */
	    NgbTypeaheadWindow.prototype.markActive = function (activeIdx) { this.activeIdx = activeIdx; };
	    NgbTypeaheadWindow.prototype.next = function () { this.activeIdx = (this.activeIdx + 1) % this.results.length; };
	    NgbTypeaheadWindow.prototype.prev = function () { this.activeIdx = (this.activeIdx === 0 ? this.results.length - 1 : this.activeIdx - 1); };
	    /**
	     * @internal
	     */
	    NgbTypeaheadWindow.prototype.select = function (item) { this.selectEvent.emit(item); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTypeaheadWindow.prototype, "results", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NgbTypeaheadWindow.prototype, "term", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTypeaheadWindow.prototype, "formatter", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], NgbTypeaheadWindow.prototype, "resultTemplate", void 0);
	    __decorate([
	        core_1.Output('select'), 
	        __metadata('design:type', Object)
	    ], NgbTypeaheadWindow.prototype, "selectEvent", void 0);
	    NgbTypeaheadWindow = __decorate([
	        core_1.Component({
	            selector: 'ngb-typeahead-window',
	            exportAs: 'ngbTypeaheadWindow',
	            host: { 'class': 'dropdown-menu', 'style': 'display: block' },
	            template: "\n    <template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </template>\n    <template ngFor [ngForOf]=\"results\" let-result let-idx=\"index\">\n      <button type=\"button\" class=\"dropdown-item\" [class.active]=\"idx === activeIdx\" \n        (mouseenter)=\"markActive(idx)\" \n        (click)=\"select(result)\">\n          <template [ngTemplateOutlet]=\"resultTemplate || rt\" \n          [ngOutletContext]=\"{result: result, term: term, formatter: formatter}\"></template>\n      </button>\n    </template>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTypeaheadWindow);
	    return NgbTypeaheadWindow;
	}());
	exports.NgbTypeaheadWindow = NgbTypeaheadWindow;
	
	//# sourceMappingURL=typeahead-window.js.map


/***/ },
/* 71 */
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
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(13);
	var Rx_1 = __webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(89);
	var positioning_1 = __webpack_require__(31);
	var typeahead_window_1 = __webpack_require__(70);
	var popup_1 = __webpack_require__(9);
	var util_1 = __webpack_require__(5);
	var typeahead_config_1 = __webpack_require__(90);
	var Key;
	(function (Key) {
	    Key[Key["Tab"] = 9] = "Tab";
	    Key[Key["Enter"] = 13] = "Enter";
	    Key[Key["Escape"] = 27] = "Escape";
	    Key[Key["ArrowUp"] = 38] = "ArrowUp";
	    Key[Key["ArrowDown"] = 40] = "ArrowDown";
	})(Key || (Key = {}));
	var NGB_TYPEAHEAD_VALUE_ACCESSOR = {
	    provide: forms_1.NG_VALUE_ACCESSOR,
	    useExisting: core_1.forwardRef(function () { return NgbTypeahead; }),
	    multi: true
	};
	/**
	 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
	 */
	var NgbTypeahead = (function () {
	    function NgbTypeahead(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone) {
	        var _this = this;
	        this._elementRef = _elementRef;
	        this._viewContainerRef = _viewContainerRef;
	        this._renderer = _renderer;
	        this._injector = _injector;
	        this._valueChanges = new Rx_1.Subject();
	        /**
	         * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
	         */
	        this.selectItem = new core_1.EventEmitter();
	        this.onChange = function (value) {
	            _this._onChangeNoEmit(value);
	            _this._valueChanges.next(value);
	        };
	        this.onTouched = function () { };
	        this.showHint = config.showHint;
	        this._popupService = new popup_1.PopupService(typeahead_window_1.NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
	        this._onChangeNoEmit = function (_) { };
	        this._zoneSubscription = ngZone.onStable.subscribe(function () {
	            if (_this._windowRef) {
	                positioning_1.positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, 'bottom-left');
	            }
	        });
	    }
	    NgbTypeahead.prototype.ngOnDestroy = function () {
	        this._subscription.unsubscribe();
	        this._zoneSubscription.unsubscribe();
	    };
	    NgbTypeahead.prototype.ngOnInit = function () {
	        var _this = this;
	        this._subscription =
	            this._valueChanges.do(function (value) { return _this._userInput = value; }).let(this.ngbTypeahead).subscribe(function (results) {
	                if (!results || results.length === 0) {
	                    _this._closePopup();
	                }
	                else {
	                    _this._openPopup();
	                    _this._windowRef.instance.results = results;
	                    _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
	                    if (_this.resultFormatter) {
	                        _this._windowRef.instance.formatter = _this.resultFormatter;
	                    }
	                    if (_this.resultTemplate) {
	                        _this._windowRef.instance.resultTemplate = _this.resultTemplate;
	                    }
	                    _this._showHint();
	                }
	            });
	    };
	    NgbTypeahead.prototype.registerOnChange = function (fn) { this._onChangeNoEmit = fn; };
	    NgbTypeahead.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    NgbTypeahead.prototype.writeValue = function (value) { this._writeInputValue(this._formatItemForInput(value)); };
	    NgbTypeahead.prototype.setDisabledState = function (isDisabled) {
	        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	    };
	    /**
	     * @internal
	     */
	    NgbTypeahead.prototype.dismissPopup = function () {
	        if (this.isPopupOpen()) {
	            this._closePopup();
	            this._writeInputValue(this._userInput);
	        }
	    };
	    /**
	     * @internal
	     */
	    NgbTypeahead.prototype.isPopupOpen = function () { return this._windowRef != null; };
	    /**
	     * @internal
	     */
	    NgbTypeahead.prototype.handleKeyDown = function (event) {
	        if (!this._windowRef) {
	            return;
	        }
	        if (Key[util_1.toString(event.which)]) {
	            event.preventDefault();
	            switch (event.which) {
	                case Key.ArrowDown:
	                    this._windowRef.instance.next();
	                    this._showHint();
	                    break;
	                case Key.ArrowUp:
	                    this._windowRef.instance.prev();
	                    this._showHint();
	                    break;
	                case Key.Enter:
	                case Key.Tab:
	                    var result = this._windowRef.instance.getActive();
	                    this._selectResult(result);
	                    break;
	                case Key.Escape:
	                    this.dismissPopup();
	                    break;
	            }
	        }
	    };
	    NgbTypeahead.prototype._openPopup = function () {
	        var _this = this;
	        if (!this._windowRef) {
	            this._windowRef = this._popupService.open();
	            this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResult(result); });
	        }
	    };
	    NgbTypeahead.prototype._closePopup = function () {
	        this._popupService.close();
	        this._windowRef = null;
	    };
	    NgbTypeahead.prototype._selectResult = function (result) {
	        var defaultPrevented = false;
	        this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
	        if (!defaultPrevented) {
	            this.writeValue(result);
	            this._onChangeNoEmit(result);
	        }
	        this._closePopup();
	    };
	    NgbTypeahead.prototype._showHint = function () {
	        if (this.showHint) {
	            var userInputLowerCase = this._userInput.toLowerCase();
	            var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
	            if (userInputLowerCase === formattedVal.substr(0, this._userInput.length).toLowerCase()) {
	                this._writeInputValue(this._userInput + formattedVal.substr(this._userInput.length));
	                this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'setSelectionRange', [this._userInput.length, formattedVal.length]);
	            }
	            else {
	                this.writeValue(this._windowRef.instance.getActive());
	            }
	        }
	    };
	    NgbTypeahead.prototype._formatItemForInput = function (item) {
	        return item && this.inputFormatter ? this.inputFormatter(item) : util_1.toString(item);
	    };
	    NgbTypeahead.prototype._writeInputValue = function (value) {
	        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Function)
	    ], NgbTypeahead.prototype, "inputFormatter", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Function)
	    ], NgbTypeahead.prototype, "ngbTypeahead", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Function)
	    ], NgbTypeahead.prototype, "resultFormatter", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], NgbTypeahead.prototype, "resultTemplate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NgbTypeahead.prototype, "showHint", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], NgbTypeahead.prototype, "selectItem", void 0);
	    NgbTypeahead = __decorate([
	        core_1.Directive({
	            selector: 'input[ngbTypeahead]',
	            host: {
	                '(blur)': 'onTouched()',
	                '[class.open]': 'isPopupOpen()',
	                '(document:click)': 'dismissPopup()',
	                '(input)': 'onChange($event.target.value)',
	                '(keydown)': 'handleKeyDown($event)',
	                'autocomplete': 'off',
	                'autocapitalize': 'off',
	                'autocorrect': 'off'
	            },
	            providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.Renderer, core_1.Injector, core_1.ComponentFactoryResolver, typeahead_config_1.NgbTypeaheadConfig, core_1.NgZone])
	    ], NgbTypeahead);
	    return NgbTypeahead;
	}());
	exports.NgbTypeahead = NgbTypeahead;
	
	//# sourceMappingURL=typeahead.js.map


/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_72__;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(74);
	var do_1 = __webpack_require__(88);
	Observable_1.Observable.prototype.do = do_1._do;
	Observable_1.Observable.prototype._do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(75);
	var toSubscriber_1 = __webpack_require__(76);
	var observable_1 = __webpack_require__(87);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * Registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     * @method subscribe
	     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 75 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(77);
	var rxSubscriber_1 = __webpack_require__(86);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber();
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(78);
	var Subscription_1 = __webpack_require__(79);
	var Observer_1 = __webpack_require__(85);
	var rxSubscriber_1 = __webpack_require__(86);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 78 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(80);
	var isObject_1 = __webpack_require__(81);
	var isFunction_1 = __webpack_require__(78);
	var tryCatch_1 = __webpack_require__(82);
	var errorObject_1 = __webpack_require__(83);
	var UnsubscriptionError_1 = __webpack_require__(84);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.closed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.closed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 81 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(83);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 85 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(75);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(75);
	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.$$observable = getSymbolObservable(root_1.root);
	//# sourceMappingURL=observable.js.map

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(77);
	/**
	 * Perform a side effect for every emission on the source Observable, but return
	 * an Observable that is identical to the source.
	 *
	 * <span class="informal">Intercepts each emission on the source and runs a
	 * function, but returns an output which is identical to the source.</span>
	 *
	 * <img src="./img/do.png" width="100%">
	 *
	 * Returns a mirrored Observable of the source Observable, but modified so that
	 * the provided Observer is called to perform a side effect for every value,
	 * error, and completion emitted by the source. Any errors that are thrown in
	 * the aforementioned Observer or handlers are safely sent down the error path
	 * of the output Observable.
	 *
	 * This operator is useful for debugging your Observables for the correct values
	 * or performing other side effects.
	 *
	 * Note: this is different to a `subscribe` on the Observable. If the Observable
	 * returned by `do` is not subscribed, the side effects specified by the
	 * Observer will never happen. `do` therefore simply spies on existing
	 * execution, it does not trigger an execution to happen like `subscribe` does.
	 *
	 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks
	 *   .do(ev => console.log(ev))
	 *   .map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 * @see {@link subscribe}
	 *
	 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
	 * callback for `next`.
	 * @param {function} [error] Callback for errors in the source.
	 * @param {function} [complete] Callback for the completion of the source.
	 * @return {Observable} An Observable identical to the source, but runs the
	 * specified Observer or callback(s) for each item.
	 * @method do
	 * @name do
	 * @owner Observable
	 */
	function _do(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	exports._do = _do;
	var DoOperator = (function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = (function (_super) {
	    __extends(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=do.js.map

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_89__;

/***/ },
/* 90 */
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
	var core_1 = __webpack_require__(1);
	/**
	 * Configuration service for the NgbTypeahead component.
	 * You can inject this service, typically in your root component, and customize the values of its properties in
	 * order to provide default values for all the typeaheads used in the application.
	 */
	var NgbTypeaheadConfig = (function () {
	    function NgbTypeaheadConfig() {
	        this.showHint = false;
	    }
	    NgbTypeaheadConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NgbTypeaheadConfig);
	    return NgbTypeaheadConfig;
	}());
	exports.NgbTypeaheadConfig = NgbTypeaheadConfig;
	
	//# sourceMappingURL=typeahead-config.js.map


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng-bootstrap.js.map