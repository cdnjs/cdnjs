(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Rx"), require("rxjs/add/operator/let"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms", "rxjs/Rx", "rxjs/add/operator/let"], factory);
	else if(typeof exports === 'object')
		exports["ngb"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Rx"), require("rxjs/add/operator/let"));
	else
		root["ngb"] = factory(root["ng"]["core"], root["ng"]["common"], root["ng"]["forms"], root["Rx"], root["Rx"]["Observable"]["prototype"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_39__, __WEBPACK_EXTERNAL_MODULE_40__) {
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
	var accordion_1 = __webpack_require__(2);
	var alert_1 = __webpack_require__(6);
	var buttons_1 = __webpack_require__(9);
	var carousel_1 = __webpack_require__(12);
	var collapse_1 = __webpack_require__(14);
	var dropdown_1 = __webpack_require__(16);
	var pagination_1 = __webpack_require__(18);
	var popover_1 = __webpack_require__(20);
	var progressbar_1 = __webpack_require__(24);
	var rating_1 = __webpack_require__(26);
	var tabset_1 = __webpack_require__(28);
	var timepicker_1 = __webpack_require__(30);
	var tooltip_1 = __webpack_require__(33);
	var typeahead_1 = __webpack_require__(35);
	var NgbModule = (function () {
	    function NgbModule() {
	    }
	    NgbModule = __decorate([
	        core_1.NgModule({
	            exports: [
	                accordion_1.NgbAccordionModule, alert_1.NgbAlertModule, buttons_1.NgbButtonsModule, carousel_1.NgbCarouselModule, collapse_1.NgbCollapseModule, dropdown_1.NgbDropdownModule,
	                pagination_1.NgbPaginationModule, popover_1.NgbPopoverModule, progressbar_1.NgbProgressbarModule, rating_1.NgbRatingModule, tabset_1.NgbTabsetModule, timepicker_1.NgbTimepickerModule,
	                tooltip_1.NgbTooltipModule, typeahead_1.NgbTypeaheadModule
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
	var NgbAccordionModule = (function () {
	    function NgbAccordionModule() {
	    }
	    NgbAccordionModule = __decorate([
	        core_1.NgModule({ declarations: accordion_1.NGB_ACCORDION_DIRECTIVES, exports: accordion_1.NGB_ACCORDION_DIRECTIVES, imports: [common_1.CommonModule] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbAccordionModule);
	    return NgbAccordionModule;
	}());
	exports.NgbAccordionModule = NgbAccordionModule;
	
	//# sourceMappingURL=index.js.map


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
	    function NgbAccordion() {
	        /**
	         * An array or comma separated strings of panel identifiers that should be opened
	         */
	        this.activeIds = [];
	        /**
	         *  Whether the other panels should be closed when a panel is opened
	         */
	        this.closeOtherPanels = false;
	        /**
	         * A panel change event fired right before the panel toggle happens. The event object has three properties:
	         * 'panelId', the id of panel that id toggled, 'nextState' whether panel will be opened (true) or closed (false),
	         * and a function, 'preventDefault()' which, when executed, will prevent the panel toggle from occurring.
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
	    NgbAccordion.prototype._closeOthers = function (panelId) {
	        var _this = this;
	        this._states.forEach(function (state, id) {
	            if (id !== panelId) {
	                _this._states.set(id, false);
	            }
	        });
	    };
	    NgbAccordion.prototype._isOpen = function (panelId) { return this._states.get(panelId); };
	    NgbAccordion.prototype._updateActiveIds = function () {
	        var _this = this;
	        this.activeIds =
	            this._panels.toArray().filter(function (panel) { return _this._isOpen(panel.id) && !panel.disabled; }).map(function (panel) { return panel.id; });
	    };
	    NgbAccordion.prototype._updateStates = function () {
	        var _this = this;
	        this._states.clear();
	        this._panelRefs.clear();
	        this._panels.toArray().forEach(function (panel) {
	            _this._states.set(panel.id, _this.activeIds.indexOf(panel.id) > -1 && !panel.disabled);
	            _this._panelRefs.set(panel.id, panel);
	        });
	    };
	    __decorate([
	        core_1.ContentChildren(NgbPanel), 
	        __metadata('design:type', core_1.QueryList)
	    ], NgbAccordion.prototype, "_panels", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbAccordion.prototype, "activeIds", void 0);
	    __decorate([
	        core_1.Input('closeOthers'), 
	        __metadata('design:type', Object)
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
	            template: "\n  <div class=\"card\">\n    <template ngFor let-panel [ngForOf]=\"_panels\">\n      <div [class]=\"'card-header ' + (panel.type ? 'card-'+panel.type: type ? 'card-'+type : '')\" [class.active]=\"_isOpen(panel.id)\">\n        <a tabindex=\"0\" href (click)=\"!!toggle(panel.id)\" [class.text-muted]=\"panel.disabled\">\n          {{panel.title}}<template [ngTemplateOutlet]=\"panel.titleTpl?.templateRef\"></template>          \n        </a>\n      </div>\n      <div class=\"card-block\" *ngIf=\"_isOpen(panel.id)\">\n        <template [ngTemplateOutlet]=\"panel.contentTpl.templateRef\"></template>\n      </div>\n    </template>\n  </div>\n"
	        }), 
	        __metadata('design:paramtypes', [])
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
	var common_1 = __webpack_require__(3);
	var alert_1 = __webpack_require__(7);
	var NgbAlertModule = (function () {
	    function NgbAlertModule() {
	    }
	    NgbAlertModule = __decorate([
	        core_1.NgModule({
	            declarations: alert_1.NGB_ALERT_DIRECTIVES,
	            exports: alert_1.NGB_ALERT_DIRECTIVES,
	            imports: [common_1.CommonModule],
	            entryComponents: [alert_1.NgbAlert]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbAlertModule);
	    return NgbAlertModule;
	}());
	exports.NgbAlertModule = NgbAlertModule;
	
	//# sourceMappingURL=index.js.map


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
	var popup_1 = __webpack_require__(8);
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
	    function NgbDismissibleAlert(_templateRef, viewContainerRef, injector, componentFactoryResolver, renderer) {
	        this._templateRef = _templateRef;
	        /**
	         * Alert type (CSS class). Bootstrap 4 recognizes the following types: "success", "info", "warning" and "danger".
	         */
	        this.type = 'warning';
	        /**
	         * An event emitted when the close button is clicked.
	         */
	        this.closeEvent = new core_1.EventEmitter();
	        this._popupService =
	            new popup_1.PopupService(NgbAlert, injector, viewContainerRef, renderer, componentFactoryResolver);
	    }
	    NgbDismissibleAlert.prototype.close = function () { this._popupService.close(); };
	    NgbDismissibleAlert.prototype.ngOnInit = function () {
	        var _this = this;
	        this._windowRef = this._popupService.open(this._templateRef);
	        this._windowRef.instance.type = this.type;
	        this._windowRef.instance.close.subscribe(function ($event) {
	            _this.closeEvent.emit($event);
	            _this.close();
	        });
	        if (this.dismissOnTimeout) {
	            this._timeout = setTimeout(function () { _this.close(); }, this.dismissOnTimeout);
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
	        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, core_1.Injector, core_1.ComponentFactoryResolver, core_1.Renderer])
	    ], NgbDismissibleAlert);
	    return NgbDismissibleAlert;
	}());
	exports.NgbDismissibleAlert = NgbDismissibleAlert;
	exports.NGB_ALERT_DIRECTIVES = [NgbAlert, NgbDismissibleAlert];
	
	//# sourceMappingURL=alert.js.map


/***/ },
/* 8 */
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
	var core_1 = __webpack_require__(1);
	var radio_1 = __webpack_require__(10);
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
	
	//# sourceMappingURL=index.js.map


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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(11);
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
	        core_1.Directive({ selector: 'input[type=radio]', host: { '(change)': 'onChange($event.target.value)', '[checked]': '_checked' } }),
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
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

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
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(3);
	var carousel_1 = __webpack_require__(13);
	var NgbCarouselModule = (function () {
	    function NgbCarouselModule() {
	    }
	    NgbCarouselModule = __decorate([
	        core_1.NgModule({ declarations: carousel_1.NGB_CAROUSEL_DIRECTIVES, exports: carousel_1.NGB_CAROUSEL_DIRECTIVES, imports: [common_1.CommonModule] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbCarouselModule);
	    return NgbCarouselModule;
	}());
	exports.NgbCarouselModule = NgbCarouselModule;
	
	//# sourceMappingURL=index.js.map


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
	var core_1 = __webpack_require__(1);
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
	    /**
	     * Navigate to a slide with a specified identifier.
	     */
	    NgbCarousel.prototype.select = function (slideIdx) {
	        this._cycleToSelected(slideIdx);
	        this._restartTimer();
	    };
	    /**
	     * Navigate to the next slide.
	     */
	    NgbCarousel.prototype.prev = function () {
	        this._cycleToPrev();
	        this._restartTimer();
	    };
	    /**
	     * Navigate to the next slide.
	     */
	    NgbCarousel.prototype.next = function () {
	        this._cycleToNext();
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
	var collapse_1 = __webpack_require__(15);
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
	
	//# sourceMappingURL=index.js.map


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
	var dropdown_1 = __webpack_require__(17);
	var NgbDropdownModule = (function () {
	    function NgbDropdownModule() {
	    }
	    NgbDropdownModule = __decorate([
	        core_1.NgModule({ declarations: dropdown_1.NGB_DROPDOWN_DIRECTIVES, exports: dropdown_1.NGB_DROPDOWN_DIRECTIVES }), 
	        __metadata('design:paramtypes', [])
	    ], NgbDropdownModule);
	    return NgbDropdownModule;
	}());
	exports.NgbDropdownModule = NgbDropdownModule;
	
	//# sourceMappingURL=index.js.map


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
	    /**
	     * Checks if the dropdown menu is open or not.
	     */
	    NgbDropdown.prototype.isOpen = function () { return this._open; };
	    /**
	     * Opens the dropdown menu of a given navbar or tabbed navigation.
	     */
	    NgbDropdown.prototype.open = function () {
	        this._open = true;
	        this.openChange.emit(true);
	    };
	    /**
	     * Closes the dropdown menu of a given navbar or tabbed navigation.
	     */
	    NgbDropdown.prototype.close = function () {
	        this._open = false;
	        this.openChange.emit(false);
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
	var common_1 = __webpack_require__(3);
	var pagination_1 = __webpack_require__(19);
	var NgbPaginationModule = (function () {
	    function NgbPaginationModule() {
	    }
	    NgbPaginationModule = __decorate([
	        core_1.NgModule({ declarations: pagination_1.NGB_PAGINATION_DIRECTIVES, exports: pagination_1.NGB_PAGINATION_DIRECTIVES, imports: [common_1.CommonModule] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPaginationModule);
	    return NgbPaginationModule;
	}());
	exports.NgbPaginationModule = NgbPaginationModule;
	
	//# sourceMappingURL=index.js.map


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
	var util_1 = __webpack_require__(5);
	/**
	 * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
	 */
	var NgbPagination = (function () {
	    function NgbPagination() {
	        this._pageCount = 0;
	        this.pages = [];
	        /**
	         *  Whether to show the "First" and "Last" page links
	         */
	        this.boundaryLinks = false;
	        /**
	         *  Whether to show the "Next" and "Previous" page links
	         */
	        this.directionLinks = true;
	        /**
	         *  Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
	         */
	        this.ellipses = true;
	        /**
	         *  Whether to rotate pages when maxSize > number of pages.
	         *  Current page will be in the middle
	         */
	        this.rotate = false;
	        /**
	         *  Maximum number of pages to display.
	         */
	        this.maxSize = 0;
	        /**
	         *  Current page.
	         */
	        this.page = 0;
	        /**
	         *  Number of items per page.
	         */
	        this.pageSize = 10;
	        /**
	         *  An event fired when the page is changed.
	         *  Event's payload equals the current page.
	         */
	        this.pageChange = new core_1.EventEmitter();
	    }
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
	    NgbPagination.prototype._isEllipsis = function (pageNumber) { return pageNumber === -1; };
	    NgbPagination.prototype._getPageNoInRange = function (newPageNo) { return util_1.getValueInRange(newPageNo, this._pageCount, 1); };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "boundaryLinks", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "directionLinks", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "ellipses", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "rotate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], NgbPagination.prototype, "collectionSize", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "maxSize", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbPagination.prototype, "page", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
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
	            template: "\n    <nav>\n      <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n        <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasPrevious()\">\n          <a aria-label=\"First\" class=\"page-link\" href (click)=\"!!selectPage(1)\">\n            <span aria-hidden=\"true\">&laquo;&laquo;</span>\n            <span class=\"sr-only\">First</span>\n          </a>                \n        </li>\n      \n        <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasPrevious()\">\n          <a aria-label=\"Previous\" class=\"page-link\" href (click)=\"!!selectPage(page-1)\">\n            <span aria-hidden=\"true\">&laquo;</span>\n            <span class=\"sr-only\">Previous</span>\n          </a>\n        </li>\n\n        <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\" \n          [class.disabled]=\"_isEllipsis(pageNumber)\">\n          <a *ngIf=\"_isEllipsis(pageNumber)\" class=\"page-link\">...</a>\n          <a *ngIf=\"!_isEllipsis(pageNumber)\" class=\"page-link\" href (click)=\"!!selectPage(pageNumber)\">{{pageNumber}}</a>\n        </li>\n\n        <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasNext()\">\n          <a aria-label=\"Next\" class=\"page-link\" href (click)=\"!!selectPage(page+1)\">\n            <span aria-hidden=\"true\">&raquo;</span>\n            <span class=\"sr-only\">Next</span>\n          </a>\n        </li>\n        \n        <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasNext()\">\n          <a aria-label=\"Last\" class=\"page-link\" href (click)=\"!!selectPage(_pageCount)\">\n            <span aria-hidden=\"true\">&raquo;&raquo;</span>\n            <span class=\"sr-only\">Last</span>\n          </a>                \n        </li>        \n      </ul>\n    </nav>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPagination);
	    return NgbPagination;
	}());
	exports.NgbPagination = NgbPagination;
	exports.NGB_PAGINATION_DIRECTIVES = [NgbPagination];
	
	//# sourceMappingURL=pagination.js.map


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
	var popover_1 = __webpack_require__(21);
	var NgbPopoverModule = (function () {
	    function NgbPopoverModule() {
	    }
	    NgbPopoverModule = __decorate([
	        core_1.NgModule({ declarations: popover_1.NGB_POPOVER_DIRECTIVES, exports: popover_1.NGB_POPOVER_DIRECTIVES, entryComponents: [popover_1.NgbPopoverWindow] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbPopoverModule);
	    return NgbPopoverModule;
	}());
	exports.NgbPopoverModule = NgbPopoverModule;
	
	//# sourceMappingURL=index.js.map


/***/ },
/* 21 */
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
	var triggers_1 = __webpack_require__(22);
	var positioning_1 = __webpack_require__(23);
	var popup_1 = __webpack_require__(8);
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
	    function NgbPopover(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef) {
	        this._elementRef = _elementRef;
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
	        this._popupService = new popup_1.PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
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
	    NgbPopover.prototype.ngAfterViewChecked = function () {
	        if (this._windowRef) {
	            var targetPosition = this._positioning.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, false);
	            var targetStyle = this._windowRef.location.nativeElement.style;
	            targetStyle.top = targetPosition.top + "px";
	            targetStyle.left = targetPosition.left + "px";
	        }
	    };
	    NgbPopover.prototype.ngOnDestroy = function () { this._unregisterListenersFn(); };
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
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.Injector, core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
	    ], NgbPopover);
	    return NgbPopover;
	}());
	exports.NgbPopover = NgbPopover;
	exports.NGB_POPOVER_DIRECTIVES = [NgbPopover, NgbPopoverWindow];
	
	//# sourceMappingURL=popover.js.map


/***/ },
/* 22 */
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
/* 23 */
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
	            elPosition.height = Math.round(elPosition.height);
	            elPosition.width = Math.round(elPosition.width);
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
	        targetElPosition.height = Math.round(targetElPosition.height);
	        targetElPosition.width = Math.round(targetElPosition.width);
	        targetElPosition.top = Math.round(targetElPosition.top);
	        targetElPosition.bottom = Math.round(targetElPosition.bottom);
	        targetElPosition.left = Math.round(targetElPosition.left);
	        targetElPosition.right = Math.round(targetElPosition.right);
	        return targetElPosition;
	    };
	    return Positioning;
	}());
	exports.Positioning = Positioning;
	
	//# sourceMappingURL=positioning.js.map


/***/ },
/* 24 */
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
	var progressbar_1 = __webpack_require__(25);
	var NgbProgressbarModule = (function () {
	    function NgbProgressbarModule() {
	    }
	    NgbProgressbarModule = __decorate([
	        core_1.NgModule({ declarations: progressbar_1.NGB_PROGRESSBAR_DIRECTIVES, exports: progressbar_1.NGB_PROGRESSBAR_DIRECTIVES }), 
	        __metadata('design:paramtypes', [])
	    ], NgbProgressbarModule);
	    return NgbProgressbarModule;
	}());
	exports.NgbProgressbarModule = NgbProgressbarModule;
	
	//# sourceMappingURL=index.js.map


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
	            template: "\n    <progress class=\"progress {{type ? 'progress-' + type : ''}}\" \n      [class.progress-animated]=\"animated\" \n      [class.progress-striped]=\"striped\"\n      [max]=\"max\" [value]=\"getValue()\">\n      <div class=\"progress\">\n        <span class=\"progress-bar\" [style.width.%]=\"getPercentValue()\"><ng-content></ng-content></span>\n      </div>\n    </progress>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbProgressbar);
	    return NgbProgressbar;
	}());
	exports.NgbProgressbar = NgbProgressbar;
	exports.NGB_PROGRESSBAR_DIRECTIVES = [NgbProgressbar];
	
	//# sourceMappingURL=progressbar.js.map


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
	var common_1 = __webpack_require__(3);
	var rating_1 = __webpack_require__(27);
	var NgbRatingModule = (function () {
	    function NgbRatingModule() {
	    }
	    NgbRatingModule = __decorate([
	        core_1.NgModule({ declarations: rating_1.NGB_RATING_DIRECTIVES, exports: rating_1.NGB_RATING_DIRECTIVES, imports: [common_1.CommonModule] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbRatingModule);
	    return NgbRatingModule;
	}());
	exports.NgbRatingModule = NgbRatingModule;
	
	//# sourceMappingURL=index.js.map


/***/ },
/* 27 */
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
	        __metadata('design:type', Object)
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
	            template: "\n    <span tabindex=\"0\" (mouseleave)=\"reset()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"rate\">\n      <template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\n        <span class=\"sr-only\">({{ index < rate ? '*' : ' ' }})</span>\n        <span (mouseenter)=\"enter(index + 1)\" (click)=\"update(index + 1)\" [title]=\"r.title\" \n        [attr.aria-valuetext]=\"r.title\" \n        [style.cursor]=\"readonly ? 'not-allowed' : 'pointer'\">{{ index < rate ? '&#9733;' : '&#9734;' }}</span>\n      </template>\n    </span>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbRating);
	    return NgbRating;
	}());
	exports.NgbRating = NgbRating;
	exports.NGB_RATING_DIRECTIVES = [NgbRating];
	
	//# sourceMappingURL=rating.js.map


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
	var common_1 = __webpack_require__(3);
	var tabset_1 = __webpack_require__(29);
	var NgbTabsetModule = (function () {
	    function NgbTabsetModule() {
	    }
	    NgbTabsetModule = __decorate([
	        core_1.NgModule({ declarations: tabset_1.NGB_TABSET_DIRECTIVES, exports: tabset_1.NGB_TABSET_DIRECTIVES, imports: [common_1.CommonModule] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTabsetModule);
	    return NgbTabsetModule;
	}());
	exports.NgbTabsetModule = NgbTabsetModule;
	
	//# sourceMappingURL=index.js.map


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
	    /**
	     * Selects the given tab and shows its associated pane.
	     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
	     */
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
	        __metadata('design:paramtypes', [])
	    ], NgbTabset);
	    return NgbTabset;
	}());
	exports.NgbTabset = NgbTabset;
	exports.NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle];
	
	//# sourceMappingURL=tabset.js.map


/***/ },
/* 30 */
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
	var timepicker_1 = __webpack_require__(31);
	var NgbTimepickerModule = (function () {
	    function NgbTimepickerModule() {
	    }
	    NgbTimepickerModule = __decorate([
	        core_1.NgModule({ declarations: timepicker_1.NGB_TIMEPICKER_DIRECTIVES, exports: timepicker_1.NGB_TIMEPICKER_DIRECTIVES, imports: [common_1.CommonModule] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTimepickerModule);
	    return NgbTimepickerModule;
	}());
	exports.NgbTimepickerModule = NgbTimepickerModule;
	
	//# sourceMappingURL=index.js.map


/***/ },
/* 31 */
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
	var forms_1 = __webpack_require__(11);
	var util_1 = __webpack_require__(5);
	var ngb_time_1 = __webpack_require__(32);
	var NGB_TIMEPICKER_VALUE_ACCESSOR = {
	    provide: forms_1.NG_VALUE_ACCESSOR,
	    useExisting: core_1.forwardRef(function () { return NgbTimepicker; }),
	    multi: true
	};
	/**
	 * A lightweight & configurable timepicker directive.
	 */
	var NgbTimepicker = (function () {
	    function NgbTimepicker() {
	        /**
	         * Whether to display 12H or 24H mode.
	         */
	        this.meridian = false;
	        /**
	         * Whether to display the spinners above and below the inputs.
	         */
	        this.spinners = true;
	        /**
	         * Whether to display seconds input.
	         */
	        this.seconds = false;
	        /**
	         * Number of hours to increase or decrease when using a button.
	         */
	        this.hourStep = 1;
	        /**
	         * Number of minutes to increase or decrease when using a button.
	         */
	        this.minuteStep = 1;
	        /**
	         * Number of seconds to increase or decrease when using a button.
	         */
	        this.secondStep = 1;
	        /**
	         * To disable timepicker
	         */
	        this.disabled = false;
	        /**
	         * To make timepicker readonly
	         */
	        this.readonlyInputs = false;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	    }
	    NgbTimepicker.prototype.writeValue = function (value) { this.model = value ? new ngb_time_1.NgbTime(value.hour, value.minute, value.second) : new ngb_time_1.NgbTime(); };
	    NgbTimepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    NgbTimepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    NgbTimepicker.prototype.changeHour = function (step) {
	        this.model.changeHour(step);
	        this.propagateModelChange();
	    };
	    NgbTimepicker.prototype.changeMinute = function (step) {
	        this.model.changeMinute(step);
	        this.propagateModelChange();
	    };
	    NgbTimepicker.prototype.changeSecond = function (step) {
	        this.model.changeSecond(step);
	        this.propagateModelChange();
	    };
	    NgbTimepicker.prototype.updateHour = function (newVal) {
	        this.model.updateHour(util_1.toInteger(newVal));
	        this.propagateModelChange();
	    };
	    NgbTimepicker.prototype.updateMinute = function (newVal) {
	        this.model.updateMinute(util_1.toInteger(newVal));
	        this.propagateModelChange();
	    };
	    NgbTimepicker.prototype.updateSecond = function (newVal) {
	        this.model.updateSecond(util_1.toInteger(newVal));
	        this.propagateModelChange();
	    };
	    NgbTimepicker.prototype.toggleMeridian = function () {
	        if (this.meridian) {
	            this.changeHour(12);
	        }
	    };
	    NgbTimepicker.prototype.formatHour = function (value) { return util_1.padNumber(util_1.isNumber(value) ? (value % (this.meridian ? 12 : 24)) : NaN); };
	    NgbTimepicker.prototype.formatMinSec = function (value) { return util_1.padNumber(value); };
	    NgbTimepicker.prototype.propagateModelChange = function () {
	        this.onTouched();
	        if (this.model.isValid(this.seconds)) {
	            this.onChange({ hour: this.model.hour, minute: this.model.minute, second: this.model.second });
	        }
	        else {
	            this.onChange(null);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "meridian", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "spinners", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "seconds", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "hourStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "minuteStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "secondStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NgbTimepicker.prototype, "readonlyInputs", void 0);
	    NgbTimepicker = __decorate([
	        core_1.Component({
	            selector: 'ngb-timepicker',
	            styles: ["\n    .chevron::before {\n      border-style: solid;\n      border-width: 0.29em 0.29em 0 0;\n      content: '';\n      display: inline-block;\n      height: 0.69em;\n      left: 0.05em;\n      position: relative;\n      top: 0.15em;\n      transform: rotate(-45deg);\n      vertical-align: middle;\n      width: 0.71em;\n    }\n    \n    .chevron.bottom:before {\n      top: -.3em;\n      transform: rotate(135deg);\n    }\n    \n    .btn-link {\n      outline: 0;\n    }\n\n    .btn-link.disabled {\n      cursor: not-allowed;\n      opacity: .65;\n    }\n  "],
	            template: "\n     <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <table>\n        <tr *ngIf=\"spinners\">\n          <td class=\"text-xs-center\">\n            <button class=\"btn-link\" (click)=\"changeHour(hourStep)\"\n              [class.disabled]=\"disabled\">\n              <span class=\"chevron\"></span>\n            </button>\n          </td>\n          <td>&nbsp;</td>\n          <td class=\"text-xs-center\">\n            <button class=\"btn-link\" (click)=\"changeMinute(minuteStep)\"\n              [class.disabled]=\"disabled\">\n                <span class=\"chevron\"></span>\n            </button>\n          </td>\n          <template [ngIf]=\"seconds\">\n            <td>&nbsp;</td>\n            <td class=\"text-xs-center\">\n              <button class=\"btn-link\" (click)=\"changeSecond(secondStep)\"\n                [class.disabled]=\"disabled\">\n                <span class=\"chevron\"></span>\n              </button>\n            </td>\n          </template>\n          <template [ngIf]=\"meridian\">\n            <td>&nbsp;</td>\n            <td>&nbsp;</td>\n          </template>\n        </tr>\n        <tr>\n          <td>\n            <input type=\"text\" class=\"form-control\" maxlength=\"2\" size=\"2\" placeholder=\"HH\"\n              [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($event.target.value)\" \n              [readonly]=\"readonlyInputs\">\n          </td>\n          <td>&nbsp;:&nbsp;</td>\n          <td>\n            <input type=\"text\" class=\"form-control\" maxlength=\"2\" size=\"2\" placeholder=\"MM\"\n              [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($event.target.value)\" \n              [readonly]=\"readonlyInputs\">\n          </td>\n          <template [ngIf]=\"seconds\">\n            <td>&nbsp;:&nbsp;</td>\n            <input type=\"text\" class=\"form-control\" maxlength=\"2\" size=\"2\" placeholder=\"SS\"\n              [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($event.target.value)\" \n              [readonly]=\"readonlyInputs\">\n          </template>\n          <template [ngIf]=\"meridian\">\n            <td>&nbsp;&nbsp;</td>\n            <td>\n              <button class=\"btn btn-outline-primary\" (click)=\"toggleMeridian()\">{{model.hour > 12 ? 'PM' : 'AM'}}</button>\n            </td>\n          </template>\n        </tr>\n        <tr *ngIf=\"spinners\">\n          <td class=\"text-xs-center\">\n            <button class=\"btn-link\" (click)=\"changeHour(-hourStep)\" \n              [class.disabled]=\"disabled\">\n              <span class=\"chevron bottom\"></span>\n            </button>\n          </td>\n          <td>&nbsp;</td>\n          <td class=\"text-xs-center\">\n            <button class=\"btn-link\" (click)=\"changeMinute(-minuteStep)\"\n              [class.disabled]=\"disabled\">\n              <span class=\"chevron bottom\"></span>\n            </button>\n          </td>\n          <template [ngIf]=\"seconds\">\n            <td>&nbsp;</td>\n            <td class=\"text-xs-center\">\n              <button class=\"btn-link\" (click)=\"changeSecond(-secondStep)\"\n                [class.disabled]=\"disabled\">\n                <span class=\"chevron bottom\"></span>\n              </button>\n            </td>\n          </template>\n          <template [ngIf]=\"meridian\">\n            <td>&nbsp;</td>\n            <td>&nbsp;</td>\n          </template>\n        </tr>\n      </table>\n    </fieldset>\n  ",
	            providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTimepicker);
	    return NgbTimepicker;
	}());
	exports.NgbTimepicker = NgbTimepicker;
	exports.NGB_TIMEPICKER_DIRECTIVES = [NgbTimepicker];
	
	//# sourceMappingURL=timepicker.js.map


/***/ },
/* 32 */
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
	var tooltip_1 = __webpack_require__(34);
	var NgbTooltipModule = (function () {
	    function NgbTooltipModule() {
	    }
	    NgbTooltipModule = __decorate([
	        core_1.NgModule({ declarations: [tooltip_1.NgbTooltip, tooltip_1.NgbTooltipWindow], exports: [tooltip_1.NgbTooltip], entryComponents: [tooltip_1.NgbTooltipWindow] }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTooltipModule);
	    return NgbTooltipModule;
	}());
	exports.NgbTooltipModule = NgbTooltipModule;
	
	//# sourceMappingURL=index.js.map


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
	var triggers_1 = __webpack_require__(22);
	var positioning_1 = __webpack_require__(23);
	var popup_1 = __webpack_require__(8);
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
	    function NgbTooltip(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef) {
	        this._elementRef = _elementRef;
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
	        this._popupService = new popup_1.PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
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
	    NgbTooltip.prototype.ngAfterViewChecked = function () {
	        if (this._windowRef) {
	            var targetPosition = this._positioning.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, false);
	            var targetStyle = this._windowRef.location.nativeElement.style;
	            targetStyle.top = targetPosition.top + "px";
	            targetStyle.left = targetPosition.left + "px";
	        }
	    };
	    NgbTooltip.prototype.ngOnDestroy = function () { this._unregisterListenersFn(); };
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
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.Injector, core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
	    ], NgbTooltip);
	    return NgbTooltip;
	}());
	exports.NgbTooltip = NgbTooltip;
	
	//# sourceMappingURL=tooltip.js.map


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
	var common_1 = __webpack_require__(3);
	var highlight_1 = __webpack_require__(36);
	var typeahead_window_1 = __webpack_require__(37);
	var typeahead_1 = __webpack_require__(38);
	var NgbTypeaheadModule = (function () {
	    function NgbTypeaheadModule() {
	    }
	    NgbTypeaheadModule = __decorate([
	        core_1.NgModule({
	            declarations: [typeahead_1.NgbTypeahead, highlight_1.NgbHighlight, typeahead_window_1.NgbTypeaheadWindow],
	            exports: [typeahead_1.NgbTypeahead],
	            imports: [common_1.CommonModule],
	            entryComponents: [typeahead_window_1.NgbTypeaheadWindow]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTypeaheadModule);
	    return NgbTypeaheadModule;
	}());
	exports.NgbTypeaheadModule = NgbTypeaheadModule;
	
	//# sourceMappingURL=index.js.map


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
	            this._parts = resultLC.split(new RegExp("(" + util_1.regExpEscape(termLC) + ")")).map(function (part) {
	                var originalPart = resultStr.substr(currentIdx, part.length);
	                currentIdx += part.length;
	                return originalPart;
	            });
	        }
	        else {
	            this._parts = [resultStr];
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
	            template: "<template ngFor [ngForOf]=\"_parts\" let-part let-isOdd=\"odd\">" +
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
	var highlight_1 = __webpack_require__(36);
	var util_1 = __webpack_require__(5);
	var NgbTypeaheadWindow = (function () {
	    function NgbTypeaheadWindow() {
	        this._activeIdx = 0;
	        /**
	         * A function used to format a given result before display. This function should return a formated string without any
	         * HTML markup.
	         */
	        this.formatter = util_1.toString;
	        /**
	         * Event raised when users selects a particular result row.
	         */
	        this.selectEvent = new core_1.EventEmitter();
	    }
	    NgbTypeaheadWindow.prototype.getActive = function () { return this.results[this._activeIdx]; };
	    NgbTypeaheadWindow.prototype.markActive = function (_activeIdx) { this._activeIdx = _activeIdx; };
	    NgbTypeaheadWindow.prototype.next = function () { this._activeIdx = (this._activeIdx + 1) % this.results.length; };
	    NgbTypeaheadWindow.prototype.prev = function () { this._activeIdx = (this._activeIdx === 0 ? this.results.length - 1 : this._activeIdx - 1); };
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
	            template: "\n    <template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </template>\n    <template ngFor [ngForOf]=\"results\" let-result let-idx=\"index\">\n      <button class=\"dropdown-item\" [class.active]=\"idx === _activeIdx\" \n        (mouseenter)=\"markActive(idx)\" \n        (click)=\"select(result)\">\n          <template [ngTemplateOutlet]=\"resultTemplate || rt\" \n          [ngOutletContext]=\"{result: result, term: term, formatter: formatter}\"></template>\n      </button>\n    </template>\n  ",
	            directives: [highlight_1.NgbHighlight]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NgbTypeaheadWindow);
	    return NgbTypeaheadWindow;
	}());
	exports.NgbTypeaheadWindow = NgbTypeaheadWindow;
	
	//# sourceMappingURL=typeahead-window.js.map


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
	var forms_1 = __webpack_require__(11);
	var Rx_1 = __webpack_require__(39);
	__webpack_require__(40);
	var positioning_1 = __webpack_require__(23);
	var typeahead_window_1 = __webpack_require__(37);
	var popup_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(5);
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
	    function NgbTypeahead(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver) {
	        var _this = this;
	        this._elementRef = _elementRef;
	        this._viewContainerRef = _viewContainerRef;
	        this._renderer = _renderer;
	        this._injector = _injector;
	        this._positioning = new positioning_1.Positioning();
	        this._valueChanges = new Rx_1.Subject();
	        this.onChange = function (value) {
	            _this._onChangeNoEmit(value);
	            _this._valueChanges.next(value);
	        };
	        this.onTouched = function () { };
	        this._popupService = new popup_1.PopupService(typeahead_window_1.NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
	        this._onChangeNoEmit = function (_) { };
	    }
	    NgbTypeahead.prototype.ngAfterViewChecked = function () {
	        if (this._windowRef) {
	            var targetPosition = this._positioning.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, 'bottom-left', false);
	            var targetStyle = this._windowRef.location.nativeElement.style;
	            targetStyle.top = targetPosition.top + "px";
	            targetStyle.left = targetPosition.left + "px";
	        }
	    };
	    NgbTypeahead.prototype.ngOnInit = function () {
	        var _this = this;
	        this._valueChanges.let(this.ngbTypeahead).subscribe(function (results) {
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
	            }
	        });
	    };
	    NgbTypeahead.prototype.registerOnChange = function (fn) { this._onChangeNoEmit = fn; };
	    NgbTypeahead.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    NgbTypeahead.prototype.writeValue = function (value) {
	        var formattedValue = value && this.inputFormatter ? this.inputFormatter(value) : util_1.toString(value);
	        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', formattedValue);
	    };
	    NgbTypeahead.prototype._closePopup = function () {
	        this._popupService.close();
	        this._windowRef = null;
	    };
	    NgbTypeahead.prototype._handleKeyDown = function (event) {
	        if (!this._windowRef) {
	            return;
	        }
	        if (Key[util_1.toString(event.which)]) {
	            event.preventDefault();
	            switch (event.which) {
	                case Key.ArrowDown:
	                    this._windowRef.instance.next();
	                    break;
	                case Key.ArrowUp:
	                    this._windowRef.instance.prev();
	                    break;
	                case Key.Enter:
	                case Key.Tab:
	                    var result = this._windowRef.instance.getActive();
	                    this._selectResult(result);
	                    break;
	                case Key.Escape:
	                    this._closePopup();
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
	    NgbTypeahead.prototype._selectResult = function (result) {
	        this.writeValue(result);
	        this._onChangeNoEmit(result);
	        this._closePopup();
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
	    NgbTypeahead = __decorate([
	        core_1.Directive({
	            selector: 'input[ngbTypeahead]',
	            host: {
	                '(blur)': 'onTouched()',
	                '[class.open]': '_windowRef !== null',
	                '(document:click)': '_closePopup()',
	                '(input)': 'onChange($event.target.value)',
	                '(keydown)': '_handleKeyDown($event)',
	                'autocomplete': 'off',
	                'autocapitalize': 'off',
	                'autocorrect': 'off'
	            },
	            providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.Renderer, core_1.Injector, core_1.ComponentFactoryResolver])
	    ], NgbTypeahead);
	    return NgbTypeahead;
	}());
	exports.NgbTypeahead = NgbTypeahead;
	exports.NGB_TYPEAHEAD_DIRECTIVES = [NgbTypeahead];
	
	//# sourceMappingURL=typeahead.js.map


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng-bootstrap.js.map