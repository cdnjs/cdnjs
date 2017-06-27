!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], ["4a","46","45","47","59","52","53","54","55","56","57","58"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('2', ['3', '4', '5'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var accordion_group_component_1 = $__require('3');
  exports.AccordionPanelComponent = accordion_group_component_1.AccordionPanelComponent;
  var accordion_component_1 = $__require('4');
  exports.AccordionComponent = accordion_component_1.AccordionComponent;
  var accordion_module_1 = $__require('5');
  exports.AccordionModule = accordion_module_1.AccordionModule;
  return module.exports;
});
$__System.registerDynamic('6', ['7', '8'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var alert_component_1 = $__require('7');
  exports.AlertComponent = alert_component_1.AlertComponent;
  var alert_module_1 = $__require('8');
  exports.AlertModule = alert_module_1.AlertModule;
  return module.exports;
});
$__System.registerDynamic('9', ['a', 'b', 'c'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var button_checkbox_directive_1 = $__require('a');
  exports.ButtonCheckboxDirective = button_checkbox_directive_1.ButtonCheckboxDirective;
  var button_radio_directive_1 = $__require('b');
  exports.ButtonRadioDirective = button_radio_directive_1.ButtonRadioDirective;
  var buttons_module_1 = $__require('c');
  exports.ButtonsModule = buttons_module_1.ButtonsModule;
  return module.exports;
});
$__System.registerDynamic('d', ['e', 'f', '10'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var carousel_component_1 = $__require('e');
  exports.CarouselComponent = carousel_component_1.CarouselComponent;
  var carousel_module_1 = $__require('f');
  exports.CarouselModule = carousel_module_1.CarouselModule;
  var slide_component_1 = $__require('10');
  exports.SlideComponent = slide_component_1.SlideComponent;
  return module.exports;
});
$__System.registerDynamic('11', ['12', '13'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var collapse_directive_1 = $__require('12');
  exports.CollapseDirective = collapse_directive_1.CollapseDirective;
  var collapse_module_1 = $__require('13');
  exports.CollapseModule = collapse_module_1.CollapseModule;
  return module.exports;
});
$__System.registerDynamic('14', ['15', '16', '17', '18', '19', '1a'], true, function ($__require, exports, module) {
  "use strict";
  /*
   todo: general:
   1. Popup
   2. Keyboard support
   3. custom-class attribute support
   4. date-disabled attribute support
   5. template-url attribute support
   */

  var define,
      global = this || self,
      GLOBAL = global;
  var datepicker_component_1 = $__require('15');
  exports.DatePickerComponent = datepicker_component_1.DatePickerComponent;
  var datepicker_module_1 = $__require('16');
  exports.DatepickerModule = datepicker_module_1.DatepickerModule;
  var daypicker_component_1 = $__require('17');
  exports.DayPickerComponent = daypicker_component_1.DayPickerComponent;
  var monthpicker_component_1 = $__require('18');
  exports.MonthPickerComponent = monthpicker_component_1.MonthPickerComponent;
  var yearpicker_component_1 = $__require('19');
  exports.YearPickerComponent = yearpicker_component_1.YearPickerComponent;
  var date_formatter_1 = $__require('1a');
  exports.DateFormatter = date_formatter_1.DateFormatter;
  return module.exports;
});
$__System.registerDynamic('1b', ['1c', '1d', '1e', '1f'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export($__require('1c'));
    __export($__require('1d'));
    __export($__require('1e'));
    var modal_module_1 = $__require('1f');
    exports.ModalModule = modal_module_1.ModalModule;
    return module.exports;
});
$__System.registerDynamic('20', ['21', '22', '23', '24', '25'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var dropdown_menu_directive_1 = $__require('21');
  exports.DropdownMenuDirective = dropdown_menu_directive_1.DropdownMenuDirective;
  var dropdown_toggle_directive_1 = $__require('22');
  exports.DropdownToggleDirective = dropdown_toggle_directive_1.DropdownToggleDirective;
  var dropdown_directive_1 = $__require('23');
  exports.DropdownDirective = dropdown_directive_1.DropdownDirective;
  var dropdown_service_1 = $__require('24');
  exports.DropdownService = dropdown_service_1.DropdownService;
  var dropdown_module_1 = $__require('25');
  exports.DropdownModule = dropdown_module_1.DropdownModule;
  return module.exports;
});
$__System.registerDynamic('26', ['27', '28', '29'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var pager_component_1 = $__require('27');
  exports.PagerComponent = pager_component_1.PagerComponent;
  var pagination_component_1 = $__require('28');
  exports.PaginationComponent = pagination_component_1.PaginationComponent;
  var pagination_module_1 = $__require('29');
  exports.PaginationModule = pagination_module_1.PaginationModule;
  return module.exports;
});
$__System.registerDynamic('2a', ['2b', '2c', '2d', '2e'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var bar_component_1 = $__require('2b');
  exports.BarComponent = bar_component_1.BarComponent;
  var progress_directive_1 = $__require('2c');
  exports.ProgressDirective = progress_directive_1.ProgressDirective;
  var progressbar_component_1 = $__require('2d');
  exports.ProgressbarComponent = progressbar_component_1.ProgressbarComponent;
  var progressbar_module_1 = $__require('2e');
  exports.ProgressbarModule = progressbar_module_1.ProgressbarModule;
  return module.exports;
});
$__System.registerDynamic('2f', ['30', '31'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var rating_component_1 = $__require('30');
  exports.RatingComponent = rating_component_1.RatingComponent;
  var rating_module_1 = $__require('31');
  exports.RatingModule = rating_module_1.RatingModule;
  return module.exports;
});
$__System.registerDynamic('32', ['33', '34', '35', '36'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var tab_heading_directive_1 = $__require('33');
  exports.TabHeadingDirective = tab_heading_directive_1.TabHeadingDirective;
  var tabset_component_1 = $__require('34');
  exports.TabsetComponent = tabset_component_1.TabsetComponent;
  var tab_directive_1 = $__require('35');
  exports.TabDirective = tab_directive_1.TabDirective;
  var tabs_module_1 = $__require('36');
  exports.TabsModule = tabs_module_1.TabsModule;
  return module.exports;
});
$__System.registerDynamic('37', ['38', '39'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var timepicker_component_1 = $__require('38');
  exports.TimepickerComponent = timepicker_component_1.TimepickerComponent;
  var timepicker_module_1 = $__require('39');
  exports.TimepickerModule = timepicker_module_1.TimepickerModule;
  return module.exports;
});
$__System.registerDynamic('3a', ['3b', '3c', '3d'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var tooltip_container_component_1 = $__require('3b');
  exports.TooltipContainerComponent = tooltip_container_component_1.TooltipContainerComponent;
  var tooltip_directive_1 = $__require('3c');
  exports.TooltipDirective = tooltip_directive_1.TooltipDirective;
  var tooltip_module_1 = $__require('3d');
  exports.TooltipModule = tooltip_module_1.TooltipModule;
  return module.exports;
});
$__System.registerDynamic('3e', ['3f', '40', '41', '42', '43', '44'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var typeahead_match_class_1 = $__require('3f');
  exports.TypeaheadMatch = typeahead_match_class_1.TypeaheadMatch;
  var typeahead_options_class_1 = $__require('40');
  exports.TypeaheadOptions = typeahead_options_class_1.TypeaheadOptions;
  var typeahead_utils_1 = $__require('41');
  exports.TypeaheadUtils = typeahead_utils_1.TypeaheadUtils;
  var typeahead_container_component_1 = $__require('42');
  exports.TypeaheadContainerComponent = typeahead_container_component_1.TypeaheadContainerComponent;
  var typeahead_directive_1 = $__require('43');
  exports.TypeaheadDirective = typeahead_directive_1.TypeaheadDirective;
  var typeahead_module_1 = $__require('44');
  exports.TypeaheadModule = typeahead_module_1.TypeaheadModule;
  return module.exports;
});
$__System.registerDynamic('3', ['45', '4'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var accordion_component_1 = $__require('4');
    /* tslint:disable-next-line */
    var MouseEvent = global.MouseEvent;
    /* tslint:disable:component-selector-name */
    var AccordionPanelComponent = function () {
        function AccordionPanelComponent(accordion) {
            this.accordion = accordion;
        }
        Object.defineProperty(AccordionPanelComponent.prototype, "isOpen", {
            // Questionable, maybe .panel-open should be on child div.panel element?
            get: function () {
                return this._isOpen;
            },
            set: function (value) {
                this._isOpen = value;
                if (value) {
                    this.accordion.closeOtherPanels(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        AccordionPanelComponent.prototype.ngOnInit = function () {
            this.panelClass = this.panelClass || 'panel-default';
            this.accordion.addGroup(this);
        };
        AccordionPanelComponent.prototype.ngOnDestroy = function () {
            this.accordion.removeGroup(this);
        };
        AccordionPanelComponent.prototype.toggleOpen = function (event) {
            event.preventDefault();
            if (!this.isDisabled) {
                this.isOpen = !this.isOpen;
            }
        };
        AccordionPanelComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'accordion-group, accordion-panel',
                template: "\n    <div class=\"panel\" [ngClass]=\"panelClass\">\n      <div class=\"panel-heading\" (click)=\"toggleOpen($event)\">\n        <h4 class=\"panel-title\">\n          <a href tabindex=\"0\" class=\"accordion-toggle\">\n            <span *ngIf=\"heading\" [ngClass]=\"{'text-muted': isDisabled}\">{{heading}}</span>\n            <ng-content select=\"[accordion-heading]\"></ng-content>\n          </a>\n        </h4>\n      </div>\n      <div class=\"panel-collapse collapse\" [collapse]=\"!isOpen\">\n        <div class=\"panel-body\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  "
            }] }];
        /** @nocollapse */
        AccordionPanelComponent.ctorParameters = [{ type: accordion_component_1.AccordionComponent, decorators: [{ type: core_1.Inject, args: [accordion_component_1.AccordionComponent] }] }];
        AccordionPanelComponent.propDecorators = {
            'heading': [{ type: core_1.Input }],
            'panelClass': [{ type: core_1.Input }],
            'isDisabled': [{ type: core_1.Input }],
            'isOpen': [{ type: core_1.HostBinding, args: ['class.panel-open'] }, { type: core_1.Input }]
        };
        return AccordionPanelComponent;
    }();
    exports.AccordionPanelComponent = AccordionPanelComponent;
    return module.exports;
});
$__System.registerDynamic('4', ['45'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    // todo: support template url
    var AccordionComponent = function () {
        function AccordionComponent() {
            /* tslint:disable:no-unused-variable */
            this.addClass = true;
            /* tslint:enable:no-unused-variable */
            this.groups = [];
        }
        AccordionComponent.prototype.closeOtherPanels = function (openGroup) {
            if (!this.closeOthers) {
                return;
            }
            this.groups.forEach(function (group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        };
        AccordionComponent.prototype.addGroup = function (group) {
            this.groups.push(group);
        };
        AccordionComponent.prototype.removeGroup = function (group) {
            var index = this.groups.indexOf(group);
            if (index !== -1) {
                this.groups.splice(index, 1);
            }
        };
        AccordionComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'accordion',
                template: "<ng-content></ng-content>"
            }] }];
        /** @nocollapse */
        AccordionComponent.ctorParameters = [];
        AccordionComponent.propDecorators = {
            'closeOthers': [{ type: core_1.Input }],
            'addClass': [{ type: core_1.HostBinding, args: ['class.panel-group'] }]
        };
        return AccordionComponent;
    }();
    exports.AccordionComponent = AccordionComponent;
    return module.exports;
});
$__System.registerDynamic('5', ['46', '45', '13', '3', '4'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var collapse_module_1 = $__require('13');
    var accordion_group_component_1 = $__require('3');
    var accordion_component_1 = $__require('4');
    var AccordionModule = function () {
        function AccordionModule() {}
        AccordionModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, collapse_module_1.CollapseModule],
                declarations: [accordion_component_1.AccordionComponent, accordion_group_component_1.AccordionPanelComponent],
                exports: [accordion_component_1.AccordionComponent, accordion_group_component_1.AccordionPanelComponent]
            }] }];
        /** @nocollapse */
        AccordionModule.ctorParameters = [];
        return AccordionModule;
    }();
    exports.AccordionModule = AccordionModule;
    return module.exports;
});
$__System.registerDynamic("7", ["45"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("45");
    var ALERT_TEMPLATE = "\n  <div class=\"alert\" role=\"alert\" [ngClass]=\"classes\" *ngIf=\"!closed\">\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" (click)=\"onClose()\" (touch)=\"onClose()\">\n      <span aria-hidden=\"true\">&times;</span>\n      <span class=\"sr-only\">Close</span>\n    </button>\n    <ng-content></ng-content>\n  </div>\n  ";
    // TODO: templateUrl
    var AlertComponent = function () {
        function AlertComponent() {
            this.type = 'warning';
            this.close = new core_1.EventEmitter(false);
            this.classes = [];
        }
        AlertComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.classes[0] = "alert-" + this.type;
            if (this.dismissible) {
                this.classes[1] = 'alert-dismissible';
            } else {
                this.classes.length = 1;
            }
            if (this.dismissOnTimeout) {
                setTimeout(function () {
                    return _this.onClose();
                }, this.dismissOnTimeout);
            }
        };
        // todo: mouse event + touch + pointer
        AlertComponent.prototype.onClose = function () {
            this.closed = true;
            this.close.emit(this);
        };
        AlertComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'alert',
                template: ALERT_TEMPLATE
            }] }];
        /** @nocollapse */
        AlertComponent.ctorParameters = [];
        AlertComponent.propDecorators = {
            'type': [{ type: core_1.Input }],
            'dismissible': [{ type: core_1.Input }],
            'dismissOnTimeout': [{ type: core_1.Input }],
            'close': [{ type: core_1.Output }]
        };
        return AlertComponent;
    }();
    exports.AlertComponent = AlertComponent;
    return module.exports;
});
$__System.registerDynamic('8', ['46', '45', '7'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var alert_component_1 = $__require('7');
    var AlertModule = function () {
        function AlertModule() {}
        AlertModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [alert_component_1.AlertComponent],
                exports: [alert_component_1.AlertComponent]
            }] }];
        /** @nocollapse */
        AlertModule.ctorParameters = [];
        return AlertModule;
    }();
    exports.AlertModule = AlertModule;
    return module.exports;
});
$__System.registerDynamic('a', ['45', '47'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    // TODO: config: activeClass - Class to apply to the checked buttons.
    var ButtonCheckboxDirective = function () {
        function ButtonCheckboxDirective(cd) {
            this.state = false;
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
            this.cd = cd;
            // hack !
            cd.valueAccessor = this;
        }
        // view -> model
        ButtonCheckboxDirective.prototype.onClick = function () {
            this.toggle(!this.state);
            this.cd.viewToModelUpdate(this.value);
        };
        ButtonCheckboxDirective.prototype.ngOnInit = function () {
            this.toggle(this.trueValue === this.value);
        };
        Object.defineProperty(ButtonCheckboxDirective.prototype, "trueValue", {
            get: function () {
                return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonCheckboxDirective.prototype, "falseValue", {
            get: function () {
                return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
            },
            enumerable: true,
            configurable: true
        });
        ButtonCheckboxDirective.prototype.toggle = function (state) {
            this.state = state;
            this.value = this.state ? this.trueValue : this.falseValue;
        };
        // ControlValueAccessor
        // model -> view
        ButtonCheckboxDirective.prototype.writeValue = function (value) {
            this.state = this.trueValue === value;
            this.value = value;
        };
        ButtonCheckboxDirective.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        ButtonCheckboxDirective.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        ButtonCheckboxDirective.decorators = [{ type: core_1.Directive, args: [{ selector: '[btnCheckbox][ngModel]' }] }];
        /** @nocollapse */
        ButtonCheckboxDirective.ctorParameters = [{ type: forms_1.NgModel, decorators: [{ type: core_1.Self }] }];
        ButtonCheckboxDirective.propDecorators = {
            'btnCheckboxTrue': [{ type: core_1.Input }],
            'btnCheckboxFalse': [{ type: core_1.Input }],
            'state': [{ type: core_1.HostBinding, args: ['class.active'] }],
            'onClick': [{ type: core_1.HostListener, args: ['click'] }]
        };
        return ButtonCheckboxDirective;
    }();
    exports.ButtonCheckboxDirective = ButtonCheckboxDirective;
    return module.exports;
});
$__System.registerDynamic('b', ['45', '47'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    /* tslint:disable */
    exports.RADIO_CONTROL_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () {
            return ButtonRadioDirective;
        }),
        multi: true
    };
    /* tslint:enable */
    var ButtonRadioDirective = function () {
        function ButtonRadioDirective(el) {
            this.el = el;
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
        }
        Object.defineProperty(ButtonRadioDirective.prototype, "isActive", {
            get: function () {
                return this.btnRadio === this.value;
            },
            enumerable: true,
            configurable: true
        });
        ButtonRadioDirective.prototype.onClick = function () {
            if (this.el.nativeElement.attributes.disabled) {
                return;
            }
            if (this.uncheckable && this.btnRadio === this.value) {
                this.value = undefined;
            } else {
                this.value = this.btnRadio;
            }
            this.onTouched();
            this.onChange(this.value);
        };
        ButtonRadioDirective.prototype.ngOnInit = function () {
            this.uncheckable = typeof this.uncheckable !== 'undefined';
        };
        ButtonRadioDirective.prototype.onBlur = function () {
            this.onTouched();
        };
        // ControlValueAccessor
        // model -> view
        ButtonRadioDirective.prototype.writeValue = function (value) {
            this.value = value;
        };
        ButtonRadioDirective.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        ButtonRadioDirective.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        ButtonRadioDirective.decorators = [{ type: core_1.Directive, args: [{ selector: '[btnRadio]', providers: [exports.RADIO_CONTROL_VALUE_ACCESSOR] }] }];
        /** @nocollapse */
        ButtonRadioDirective.ctorParameters = [{ type: core_1.ElementRef }];
        ButtonRadioDirective.propDecorators = {
            'btnRadio': [{ type: core_1.Input }],
            'uncheckable': [{ type: core_1.Input }],
            'value': [{ type: core_1.Input }],
            'isActive': [{ type: core_1.HostBinding, args: ['class.active'] }],
            'onClick': [{ type: core_1.HostListener, args: ['click'] }]
        };
        return ButtonRadioDirective;
    }();
    exports.ButtonRadioDirective = ButtonRadioDirective;
    return module.exports;
});
$__System.registerDynamic('c', ['45', '47', 'a', 'b'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var button_checkbox_directive_1 = $__require('a');
    var button_radio_directive_1 = $__require('b');
    var ButtonsModule = function () {
        function ButtonsModule() {}
        ButtonsModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [forms_1.FormsModule],
                declarations: [button_checkbox_directive_1.ButtonCheckboxDirective, button_radio_directive_1.ButtonRadioDirective],
                exports: [button_checkbox_directive_1.ButtonCheckboxDirective, button_radio_directive_1.ButtonRadioDirective, forms_1.FormsModule]
            }] }];
        /** @nocollapse */
        ButtonsModule.ctorParameters = [];
        return ButtonsModule;
    }();
    exports.ButtonsModule = ButtonsModule;
    return module.exports;
});
$__System.registerDynamic('e', ['45', '48'], true, function ($__require, exports, module) {
    // todo: add animate
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var ng2_bootstrap_config_1 = $__require('48');
    (function (Direction) {
        Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
        Direction[Direction["NEXT"] = 1] = "NEXT";
        Direction[Direction["PREV"] = 2] = "PREV";
    })(exports.Direction || (exports.Direction = {}));
    var Direction = exports.Direction;
    // todo:
    // (ng-swipe-right)="prev()" (ng-swipe-left)="next()"
    /**
     * Problems:
     * 1) if we set an active slide via model changes, .active class remains on a current slide.
     * 2) if we have only one slide, we shouldn't show prev/next nav buttons
     * 3) if first or last slide is active and noWrap is true, there should be "disabled" class on the nav buttons.
     * 4) default interval should be equal 5000
     */
    var CarouselComponent = function () {
        function CarouselComponent() {
            this.slides = [];
            this.destroyed = false;
        }
        Object.defineProperty(CarouselComponent.prototype, "interval", {
            get: function () {
                return this._interval;
            },
            set: function (value) {
                this._interval = value;
                this.restartTimer();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CarouselComponent.prototype, "isBS4", {
            get: function () {
                return ng2_bootstrap_config_1.Ng2BootstrapConfig.theme === ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4;
            },
            enumerable: true,
            configurable: true
        });
        CarouselComponent.prototype.ngOnDestroy = function () {
            this.destroyed = true;
        };
        CarouselComponent.prototype.select = function (nextSlide, direction) {
            if (direction === void 0) {
                direction = Direction.UNKNOWN;
            }
            var nextIndex = nextSlide.index;
            if (direction === Direction.UNKNOWN) {
                direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
            }
            // Prevent this user-triggered transition from occurring if there is
            // already one in progress
            if (nextSlide && nextSlide !== this.currentSlide) {
                this.goNext(nextSlide, direction);
            }
        };
        CarouselComponent.prototype.play = function () {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.restartTimer();
            }
        };
        CarouselComponent.prototype.pause = function () {
            if (!this.noPause) {
                this.isPlaying = false;
                this.resetTimer();
            }
        };
        CarouselComponent.prototype.next = function () {
            var newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
            if (newIndex === 0 && this.noWrap) {
                this.pause();
                return;
            }
            return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
        };
        CarouselComponent.prototype.prev = function () {
            var newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;
            if (this.noWrap && newIndex === this.slides.length - 1) {
                this.pause();
                return;
            }
            return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
        };
        CarouselComponent.prototype.addSlide = function (slide) {
            slide.index = this.slides.length;
            this.slides.push(slide);
            if (this.slides.length === 1 || slide.active) {
                this.select(this.slides[this.slides.length - 1]);
                if (this.slides.length === 1) {
                    this.play();
                }
            } else {
                slide.active = false;
            }
        };
        CarouselComponent.prototype.removeSlide = function (slide) {
            this.slides.splice(slide.index, 1);
            if (this.slides.length === 0) {
                this.currentSlide = void 0;
                return;
            }
            for (var i = 0; i < this.slides.length; i++) {
                this.slides[i].index = i;
            }
        };
        CarouselComponent.prototype.goNext = function (slide, direction) {
            if (this.destroyed) {
                return;
            }
            slide.direction = direction;
            slide.active = true;
            if (this.currentSlide) {
                this.currentSlide.direction = direction;
                this.currentSlide.active = false;
            }
            this.currentSlide = slide;
            // every time you change slides, reset the timer
            this.restartTimer();
        };
        CarouselComponent.prototype.getSlideByIndex = function (index) {
            var len = this.slides.length;
            for (var i = 0; i < len; ++i) {
                if (this.slides[i].index === index) {
                    return this.slides[i];
                }
            }
            return void 0;
        };
        CarouselComponent.prototype.getCurrentIndex = function () {
            return !this.currentSlide ? 0 : this.currentSlide.index;
        };
        CarouselComponent.prototype.restartTimer = function () {
            var _this = this;
            this.resetTimer();
            var interval = +this.interval;
            if (!isNaN(interval) && interval > 0) {
                this.currentInterval = setInterval(function () {
                    var nInterval = +_this.interval;
                    if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
                        _this.next();
                    } else {
                        _this.pause();
                    }
                }, interval);
            }
        };
        CarouselComponent.prototype.resetTimer = function () {
            if (this.currentInterval) {
                clearInterval(this.currentInterval);
                this.currentInterval = void 0;
            }
        };
        CarouselComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'carousel',
                template: "\n    <div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" class=\"carousel slide\">\n      <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1\">\n         <li *ngFor=\"let slidez of slides\" [class.active]=\"slidez.active === true\" (click)=\"select(slidez)\"></li>\n      </ol>\n      <div class=\"carousel-inner\"><ng-content></ng-content></div>\n      <a class=\"left carousel-control\" (click)=\"prev()\" *ngIf=\"slides.length\">\n        <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n        <span *ngIf=\"isBS4\" class=\"sr-only\">Previous</span>\n      </a>\n      <a class=\"right carousel-control\" (click)=\"next()\" *ngIf=\"slides.length\">\n        <span class=\"icon-next\" aria-hidden=\"true\"></span>\n        <span *ngIf=\"isBS4\" class=\"sr-only\">Next</span>\n      </a>\n    </div>\n  "
            }] }];
        /** @nocollapse */
        CarouselComponent.ctorParameters = [];
        CarouselComponent.propDecorators = {
            'noWrap': [{ type: core_1.Input }],
            'noPause': [{ type: core_1.Input }],
            'noTransition': [{ type: core_1.Input }],
            'interval': [{ type: core_1.Input }]
        };
        return CarouselComponent;
    }();
    exports.CarouselComponent = CarouselComponent;
    return module.exports;
});
$__System.registerDynamic('10', ['45', 'e'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var carousel_component_1 = $__require('e');
    var SlideComponent = function () {
        function SlideComponent(carousel) {
            this.addClass = true;
            this.carousel = carousel;
        }
        SlideComponent.prototype.ngOnInit = function () {
            this.carousel.addSlide(this);
        };
        SlideComponent.prototype.ngOnDestroy = function () {
            this.carousel.removeSlide(this);
        };
        SlideComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'slide',
                template: "\n    <div [class.active]=\"active\" class=\"item\">\n      <ng-content></ng-content>\n    </div>\n  "
            }] }];
        /** @nocollapse */
        SlideComponent.ctorParameters = [{ type: carousel_component_1.CarouselComponent }];
        SlideComponent.propDecorators = {
            'index': [{ type: core_1.Input }],
            'direction': [{ type: core_1.Input }],
            'active': [{ type: core_1.HostBinding, args: ['class.active'] }, { type: core_1.Input }],
            'addClass': [{ type: core_1.HostBinding, args: ['class.item'] }, { type: core_1.HostBinding, args: ['class.carousel-item'] }]
        };
        return SlideComponent;
    }();
    exports.SlideComponent = SlideComponent;
    return module.exports;
});
$__System.registerDynamic('f', ['46', '45', 'e', '10'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var carousel_component_1 = $__require('e');
    var slide_component_1 = $__require('10');
    var CarouselModule = function () {
        function CarouselModule() {}
        CarouselModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [slide_component_1.SlideComponent, carousel_component_1.CarouselComponent],
                exports: [slide_component_1.SlideComponent, carousel_component_1.CarouselComponent]
            }] }];
        /** @nocollapse */
        CarouselModule.ctorParameters = [];
        return CarouselModule;
    }();
    exports.CarouselModule = CarouselModule;
    return module.exports;
});
$__System.registerDynamic("12", ["45"], true, function ($__require, exports, module) {
    "use strict";
    // FIX: in order to update to rc.1 had to disable animation, sorry

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("45");
    // import {AnimationBuilder} from '@angular/platform-browser/src/animate/animation_builder';
    // import {animate, animation, state, style, transition} from '@angular/core';
    /*@Directive({
     selector: '[collapse]',
     // templateUrl: 'app/panel.html',
     // styleUrls: ['app/panel.css'],
     animations: [
     animation('active', [
     state('void', style({ height: 0 })),
     state('closed', style({ height: 0 })),
     state('open', style({ height: '*' })),
     transition('void => closed', [ animate(0) ]),
     transition('closed => open', [ animate('350ms ease-out') ]),
     transition('open => closed', [ animate('350ms ease-out') ])
     ])
     ]
     })*/
    // fix: replace with // '@angular/animate';
    // when https://github.com/angular/angular/issues/5984 will be fixed
    // TODO: remove ElementRef
    // TODO: add on change
    // TODO: #576 add callbacks: expanding, collapsing after adding animation
    var CollapseDirective = function () {
        function CollapseDirective( /*_ab:AnimationBuilder, */_el, _renderer) {
            // private animation:any;
            this.collapsed = new core_1.EventEmitter(false);
            this.expanded = new core_1.EventEmitter(false);
            // shown
            this.isExpanded = true;
            // hidden
            this.isCollapsed = false;
            // stale state
            this.isCollapse = true;
            // animation state
            this.isCollapsing = false;
            // this._ab = _ab;
            this._el = _el;
            this._renderer = _renderer;
        }
        Object.defineProperty(CollapseDirective.prototype, "collapse", {
            get: function () {
                return this.isExpanded;
            },
            // @Input() private transitionDuration:number = 500; // Duration in ms
            set: function (value) {
                this.isExpanded = value;
                this.toggle();
            },
            enumerable: true,
            configurable: true
        });
        CollapseDirective.prototype.ngOnInit = function () {
            // this.animation = this._ab.css();
            // this.animation.setDuration(this.transitionDuration);
        };
        CollapseDirective.prototype.toggle = function () {
            // this.open = !this.open;
            if (this.isExpanded) {
                this.hide();
            } else {
                this.show();
            }
        };
        CollapseDirective.prototype.hide = function () {
            this.isCollapse = false;
            this.isCollapsing = true;
            this.isExpanded = false;
            this.isCollapsed = true;
            this.isCollapse = true;
            this.isCollapsing = false;
            this.display = 'none';
            this.collapsed.emit(this);
            /*  setTimeout(() => {
             // this.height = '0';
             // this.isCollapse = true;
             // this.isCollapsing = false;
             this.animation
             .setFromStyles({
             height: this._el.nativeElement.scrollHeight + 'px'
             })
             .setToStyles({
             height: '0',
             overflow: 'hidden'
             });
                  this.animation.start(this._el.nativeElement)
             .onComplete(() => {
             if (this._el.nativeElement.offsetHeight === 0) {
             this.display = 'none';
             }
                  this.isCollapse = true;
             this.isCollapsing = false;
             });
             }, 4);*/
        };
        CollapseDirective.prototype.show = function () {
            this.isCollapse = false;
            this.isCollapsing = true;
            this.isExpanded = true;
            this.isCollapsed = false;
            this.display = 'block';
            // this.height = 'auto';
            this.isCollapse = true;
            this.isCollapsing = false;
            this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
            this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
            this.expanded.emit(this);
            /*setTimeout(() => {
             // this.height = 'auto';
             // this.isCollapse = true;
             // this.isCollapsing = false;
             this.animation
             .setFromStyles({
             height: this._el.nativeElement.offsetHeight,
             overflow: 'hidden'
             })
             .setToStyles({
             height: this._el.nativeElement.scrollHeight + 'px'
             });
                  this.animation.start(this._el.nativeElement)
             .onComplete(() => {
             this.isCollapse = true;
             this.isCollapsing = false;
             this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
             this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
             });
             }, 4);*/
        };
        CollapseDirective.decorators = [{ type: core_1.Directive, args: [{ selector: '[collapse]' }] }];
        /** @nocollapse */
        CollapseDirective.ctorParameters = [{ type: core_1.ElementRef }, { type: core_1.Renderer }];
        CollapseDirective.propDecorators = {
            'collapsed': [{ type: core_1.Output }],
            'expanded': [{ type: core_1.Output }],
            'display': [{ type: core_1.HostBinding, args: ['style.display'] }],
            'isExpanded': [{ type: core_1.HostBinding, args: ['class.in'] }, { type: core_1.HostBinding, args: ['attr.aria-expanded'] }],
            'isCollapsed': [{ type: core_1.HostBinding, args: ['attr.aria-hidden'] }],
            'isCollapse': [{ type: core_1.HostBinding, args: ['class.collapse'] }],
            'isCollapsing': [{ type: core_1.HostBinding, args: ['class.collapsing'] }],
            'collapse': [{ type: core_1.Input }]
        };
        return CollapseDirective;
    }();
    exports.CollapseDirective = CollapseDirective;
    return module.exports;
});
$__System.registerDynamic('13', ['45', '12'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var collapse_directive_1 = $__require('12');
    var CollapseModule = function () {
        function CollapseModule() {}
        CollapseModule.decorators = [{ type: core_1.NgModule, args: [{
                declarations: [collapse_directive_1.CollapseDirective],
                exports: [collapse_directive_1.CollapseDirective]
            }] }];
        /** @nocollapse */
        CollapseModule.ctorParameters = [];
        return CollapseModule;
    }();
    exports.CollapseModule = CollapseModule;
    return module.exports;
});
$__System.registerDynamic('15', ['45', '49', '47'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var datepicker_inner_component_1 = $__require('49');
    var forms_1 = $__require('47');
    /* tslint:disable:component-selector-name component-selector-type */
    /* tslint:enable:component-selector-name component-selector-type */
    var DatePickerComponent = function () {
        function DatePickerComponent(cd) {
            this.selectionDone = new core_1.EventEmitter(undefined);
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
            this._now = new Date();
            this.cd = cd;
            // hack
            cd.valueAccessor = this;
        }
        Object.defineProperty(DatePickerComponent.prototype, "activeDate", {
            get: function () {
                return this._activeDate || this._now;
            },
            set: function (value) {
                this._activeDate = value;
            },
            enumerable: true,
            configurable: true
        });
        DatePickerComponent.prototype.onUpdate = function (event) {
            this.cd.viewToModelUpdate(event);
        };
        DatePickerComponent.prototype.onSelectionDone = function (event) {
            this.selectionDone.emit(event);
        };
        // todo: support null value
        DatePickerComponent.prototype.writeValue = function (value) {
            if (this._datePicker.compare(value, this._activeDate) === 0) {
                return;
            }
            if (value && value instanceof Date) {
                this.activeDate = value;
                this._datePicker.select(value, false);
                return;
            }
            this.activeDate = value ? new Date(value) : void 0;
        };
        DatePickerComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        DatePickerComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        DatePickerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'datepicker[ngModel]',
                template: "\n    <datepicker-inner [activeDate]=\"activeDate\"\n                      (update)=\"onUpdate($event)\"\n                      [datepickerMode]=\"datepickerMode\"\n                      [initDate]=\"initDate\"\n                      [minDate]=\"minDate\"\n                      [maxDate]=\"maxDate\"\n                      [minMode]=\"minMode\"\n                      [maxMode]=\"maxMode\"\n                      [showWeeks]=\"showWeeks\"\n                      [formatDay]=\"formatDay\"\n                      [formatMonth]=\"formatMonth\"\n                      [formatYear]=\"formatYear\"\n                      [formatDayHeader]=\"formatDayHeader\"\n                      [formatDayTitle]=\"formatDayTitle\"\n                      [formatMonthTitle]=\"formatMonthTitle\"\n                      [startingDay]=\"startingDay\"\n                      [yearRange]=\"yearRange\"\n                      [customClass]=\"customClass\"\n                      [dateDisabled]=\"dateDisabled\"\n                      [onlyCurrentMonth]=\"onlyCurrentMonth\"\n                      [shortcutPropagation]=\"shortcutPropagation\"\n                      [monthColLimit]=\"monthColLimit\"\n                      [yearColLimit]=\"yearColLimit\"\n                      (selectionDone)=\"onSelectionDone($event)\">\n      <daypicker tabindex=\"0\"></daypicker>\n      <monthpicker tabindex=\"0\"></monthpicker>\n      <yearpicker tabindex=\"0\"></yearpicker>\n    </datepicker-inner>\n    ",
                providers: [forms_1.NgModel]
            }] }];
        /** @nocollapse */
        DatePickerComponent.ctorParameters = [{ type: forms_1.NgModel, decorators: [{ type: core_1.Self }] }];
        DatePickerComponent.propDecorators = {
            'datepickerMode': [{ type: core_1.Input }],
            'initDate': [{ type: core_1.Input }],
            'minDate': [{ type: core_1.Input }],
            'maxDate': [{ type: core_1.Input }],
            'minMode': [{ type: core_1.Input }],
            'maxMode': [{ type: core_1.Input }],
            'showWeeks': [{ type: core_1.Input }],
            'formatDay': [{ type: core_1.Input }],
            'formatMonth': [{ type: core_1.Input }],
            'formatYear': [{ type: core_1.Input }],
            'formatDayHeader': [{ type: core_1.Input }],
            'formatDayTitle': [{ type: core_1.Input }],
            'formatMonthTitle': [{ type: core_1.Input }],
            'startingDay': [{ type: core_1.Input }],
            'yearRange': [{ type: core_1.Input }],
            'onlyCurrentMonth': [{ type: core_1.Input }],
            'shortcutPropagation': [{ type: core_1.Input }],
            'customClass': [{ type: core_1.Input }],
            'monthColLimit': [{ type: core_1.Input }],
            'yearColLimit': [{ type: core_1.Input }],
            'dateDisabled': [{ type: core_1.Input }],
            'selectionDone': [{ type: core_1.Output }],
            '_datePicker': [{ type: core_1.ViewChild, args: [datepicker_inner_component_1.DatePickerInnerComponent] }],
            'activeDate': [{ type: core_1.Input }]
        };
        return DatePickerComponent;
    }();
    exports.DatePickerComponent = DatePickerComponent;
    return module.exports;
});
$__System.registerDynamic('17', ['45', '48', '49'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var ng2_bootstrap_config_1 = $__require('48');
    var datepicker_inner_component_1 = $__require('49');
    // write an interface for template options
    var TEMPLATE_OPTIONS = (_a = {}, _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = {
        ARROW_LEFT: '&lt;',
        ARROW_RIGHT: '&gt;'
    }, _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = {
        ARROW_LEFT: "\n    <i class=\"glyphicon glyphicon-chevron-left\"></i>\n    ",
        ARROW_RIGHT: "\n    <i class=\"glyphicon glyphicon-chevron-right\"></i>\n    "
    }, _a);
    var DayPickerComponent = function () {
        function DayPickerComponent(datePicker) {
            this.labels = [];
            this.rows = [];
            this.weekNumbers = [];
            this.CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme || ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3];
            this.datePicker = datePicker;
        }
        Object.defineProperty(DayPickerComponent.prototype, "isBS4", {
            get: function () {
                return ng2_bootstrap_config_1.Ng2BootstrapConfig.theme === ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4;
            },
            enumerable: true,
            configurable: true
        });
        /*private getDaysInMonth(year:number, month:number) {
         return ((month === 1) && (year % 4 === 0) &&
         ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
         }*/
        DayPickerComponent.prototype.ngOnInit = function () {
            var self = this;
            this.datePicker.stepDay = { months: 1 };
            this.datePicker.setRefreshViewHandler(function () {
                var year = this.activeDate.getFullYear();
                var month = this.activeDate.getMonth();
                var firstDayOfMonth = new Date(year, month, 1);
                var difference = this.startingDay - firstDayOfMonth.getDay();
                var numDisplayedFromPreviousMonth = difference > 0 ? 7 - difference : -difference;
                var firstDate = new Date(firstDayOfMonth.getTime());
                if (numDisplayedFromPreviousMonth > 0) {
                    firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                }
                // 42 is the number of days on a six-week calendar
                var _days = self.getDates(firstDate, 42);
                var days = [];
                for (var i = 0; i < 42; i++) {
                    var _dateObject = this.createDateObject(_days[i], this.formatDay);
                    _dateObject.secondary = _days[i].getMonth() !== month;
                    _dateObject.uid = this.uniqueId + '-' + i;
                    days[i] = _dateObject;
                }
                self.labels = [];
                for (var j = 0; j < 7; j++) {
                    self.labels[j] = {};
                    self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
                    self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
                }
                self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
                self.rows = this.split(days, 7);
                if (this.showWeeks) {
                    self.weekNumbers = [];
                    var thursdayIndex = (4 + 7 - this.startingDay) % 7;
                    var numWeeks = self.rows.length;
                    for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
                        self.weekNumbers.push(self.getISO8601WeekNumber(self.rows[curWeek][thursdayIndex].date));
                    }
                }
            }, 'day');
            this.datePicker.setCompareHandler(function (date1, date2) {
                var d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
                var d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
                return d1.getTime() - d2.getTime();
            }, 'day');
            this.datePicker.refreshView();
        };
        DayPickerComponent.prototype.getDates = function (startDate, n) {
            var dates = new Array(n);
            var current = new Date(startDate.getTime());
            var i = 0;
            var date;
            while (i < n) {
                date = new Date(current.getTime());
                date = this.datePicker.fixTimeZone(date);
                dates[i++] = date;
                current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
            }
            return dates;
        };
        DayPickerComponent.prototype.getISO8601WeekNumber = function (date) {
            var checkDate = new Date(date.getTime());
            // Thursday
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            // Compare with Jan 1
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
        };
        // todo: key events implementation
        DayPickerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'daypicker',
                template: "\n<table *ngIf=\"datePicker.datepickerMode==='day'\" role=\"grid\" [attr.aria-labelledby]=\"datePicker.uniqueId+'-title'\" aria-activedescendant=\"activeDateId\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" \n                class=\"btn btn-default btn-secondary btn-sm pull-left\" \n                (click)=\"datePicker.move(-1)\" \n                tabindex=\"-1\"\n                [innerHTML]=\"CURRENT_THEME_TEMPLATE.ARROW_LEFT\">\n        </button>\n      </th>\n      <th [attr.colspan]=\"5 + (datePicker.showWeeks ? 1 : 0)\">\n        <button [id]=\"datePicker.uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-secondary btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === datePicker.maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === datePicker.maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" \n                class=\"btn btn-default btn-secondary btn-sm pull-right\" \n                (click)=\"datePicker.move(1)\" \n                tabindex=\"-1\"\n                [innerHTML]=\"CURRENT_THEME_TEMPLATE.ARROW_RIGHT\">\n        </button>\n      </th>\n    </tr>\n    <tr>\n      <th *ngIf=\"datePicker.showWeeks\"></th>\n      <th *ngFor=\"let labelz of labels\" [ngClass]=\"{'text-xs-center':isBS4, 'text-center': !isBS4}\">\n        <small aria-label=\"labelz.full\"><b>{{labelz.abbr}}</b></small>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <template ngFor [ngForOf]=\"rows\" let-rowz=\"$implicit\" let-index=\"index\">\n      <tr *ngIf=\"!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)\">\n        <td *ngIf=\"datePicker.showWeeks\" class=\"h6\" [ngClass]=\"{'text-xs-center':isBS4, 'text-center': !isBS4}\">\n          <em>{{ weekNumbers[index] }}</em>\n        </td>\n        <td *ngFor=\"let dtz of rowz\" [ngClass]=\"{'text-xs-center':isBS4, 'text-center': !isBS4}\" role=\"gridcell\" [id]=\"dtz.uid\">\n          <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-sm {{dtz.customClass}}\"\n                  *ngIf=\"!(datePicker.onlyCurrentMonth && dtz.secondary)\"\n                  [ngClass]=\"{'btn-secondary': isBS4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected, disabled: dtz.disabled, active: !isBS4 && datePicker.isActive(dtz), 'btn-default': !isBS4}\"\n                  [disabled]=\"dtz.disabled\"\n                  (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n            <span [ngClass]=\"{'text-muted': dtz.secondary || dtz.current, 'text-info': !isBS4 && dtz.current}\">{{dtz.label}}</span>\n          </button>\n        </td>\n      </tr>\n    </template>\n  </tbody>\n</table>\n  "
            }] }];
        /** @nocollapse */
        DayPickerComponent.ctorParameters = [{ type: datepicker_inner_component_1.DatePickerInnerComponent }];
        return DayPickerComponent;
    }();
    exports.DayPickerComponent = DayPickerComponent;
    var _a;
    return module.exports;
});
$__System.registerDynamic('18', ['45', '48', '49'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var ng2_bootstrap_config_1 = $__require('48');
    var datepicker_inner_component_1 = $__require('49');
    var MonthPickerComponent = function () {
        function MonthPickerComponent(datePicker) {
            this.rows = [];
            this.datePicker = datePicker;
        }
        Object.defineProperty(MonthPickerComponent.prototype, "isBS4", {
            get: function () {
                return ng2_bootstrap_config_1.Ng2BootstrapConfig.theme === ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4;
            },
            enumerable: true,
            configurable: true
        });
        MonthPickerComponent.prototype.ngOnInit = function () {
            var self = this;
            this.datePicker.stepMonth = { years: 1 };
            this.datePicker.setRefreshViewHandler(function () {
                var months = new Array(12);
                var year = this.activeDate.getFullYear();
                var date;
                for (var i = 0; i < 12; i++) {
                    date = new Date(year, i, 1);
                    date = this.fixTimeZone(date);
                    months[i] = this.createDateObject(date, this.formatMonth);
                    months[i].uid = this.uniqueId + '-' + i;
                }
                self.title = this.dateFilter(this.activeDate, this.formatMonthTitle);
                self.rows = this.split(months, self.datePicker.monthColLimit);
            }, 'month');
            this.datePicker.setCompareHandler(function (date1, date2) {
                var d1 = new Date(date1.getFullYear(), date1.getMonth());
                var d2 = new Date(date2.getFullYear(), date2.getMonth());
                return d1.getTime() - d2.getTime();
            }, 'month');
            this.datePicker.refreshView();
        };
        // todo: key events implementation
        MonthPickerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'monthpicker',
                template: "\n<table *ngIf=\"datePicker.datepickerMode==='month'\" role=\"grid\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-left\"\n                (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-left\"></i>\n        </button></th>\n      <th [attr.colspan]=\"((datePicker.monthColLimit - 2) <= 0) ? 1 : datePicker.monthColLimit - 2\">\n        <button [id]=\"datePicker.uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n                (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-right\"></i>\n        </button>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let rowz of rows\">\n      <td *ngFor=\"let dtz of rowz\" class=\"text-center\" role=\"gridcell\" id=\"{{dtz.uid}}\" [ngClass]=\"dtz.customClass\">\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-link': isBS4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected || (isBS4 && !dtz.selected && datePicker.isActive(dtz)), disabled: dtz.disabled, active: !isBS4 && datePicker.isActive(dtz)}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ngClass]=\"{'text-success': isBS4 && dtz.current, 'text-info': !isBS4 && dtz.current}\">{{dtz.label}}</span>\n        </button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n  "
            }] }];
        /** @nocollapse */
        MonthPickerComponent.ctorParameters = [{ type: datepicker_inner_component_1.DatePickerInnerComponent }];
        return MonthPickerComponent;
    }();
    exports.MonthPickerComponent = MonthPickerComponent;
    return module.exports;
});
$__System.registerDynamic("1a", ["4a"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var moment = $__require("4a");
    var DateFormatter = function () {
        function DateFormatter() {}
        DateFormatter.prototype.format = function (date, format) {
            return moment(date.getTime()).format(format);
        };
        return DateFormatter;
    }();
    exports.DateFormatter = DateFormatter;
    return module.exports;
});
$__System.registerDynamic('49', ['45', '1a'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var date_formatter_1 = $__require('1a');
    var FORMAT_DAY = 'DD';
    var FORMAT_MONTH = 'MMMM';
    var FORMAT_YEAR = 'YYYY';
    var FORMAT_DAY_HEADER = 'dd';
    var FORMAT_DAY_TITLE = 'MMMM YYYY';
    var FORMAT_MONTH_TITLE = 'YYYY';
    var DATEPICKER_MODE = 'day';
    var MIN_MODE = 'day';
    var MAX_MODE = 'year';
    var SHOW_WEEKS = true;
    var ONLY_CURRENT_MONTH = false;
    var STARTING_DAY = 0;
    var YEAR_RANGE = 20;
    var MONTH_COL_LIMIT = 3;
    var YEAR_COL_LIMIT = 5;
    // const MIN_DATE:Date = void 0;
    // const MAX_DATE:Date = void 0;
    var SHORTCUT_PROPAGATION = false;
    // const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    /*
     const KEYS = {
     13: 'enter',
     32: 'space',
     33: 'pageup',
     34: 'pagedown',
     35: 'end',
     36: 'home',
     37: 'left',
     38: 'up',
     39: 'right',
     40: 'down'
     };
     */
    var DatePickerInnerComponent = function () {
        function DatePickerInnerComponent() {
            this.selectionDone = new core_1.EventEmitter(undefined);
            this.update = new core_1.EventEmitter(false);
            this.stepDay = {};
            this.stepMonth = {};
            this.stepYear = {};
            this.modes = ['day', 'month', 'year'];
            this.dateFormatter = new date_formatter_1.DateFormatter();
        }
        Object.defineProperty(DatePickerInnerComponent.prototype, "activeDate", {
            get: function () {
                return this._activeDate;
            },
            set: function (value) {
                this._activeDate = value;
            },
            enumerable: true,
            configurable: true
        });
        // todo: add formatter value to Date object
        DatePickerInnerComponent.prototype.ngOnInit = function () {
            this.formatDay = this.formatDay || FORMAT_DAY;
            this.formatMonth = this.formatMonth || FORMAT_MONTH;
            this.formatYear = this.formatYear || FORMAT_YEAR;
            this.formatDayHeader = this.formatDayHeader || FORMAT_DAY_HEADER;
            this.formatDayTitle = this.formatDayTitle || FORMAT_DAY_TITLE;
            this.formatMonthTitle = this.formatMonthTitle || FORMAT_MONTH_TITLE;
            this.showWeeks = this.showWeeks === undefined ? SHOW_WEEKS : this.showWeeks;
            this.onlyCurrentMonth = this.onlyCurrentMonth === undefined ? ONLY_CURRENT_MONTH : this.onlyCurrentMonth;
            this.startingDay = this.startingDay || STARTING_DAY;
            this.yearRange = this.yearRange || YEAR_RANGE;
            this.shortcutPropagation = this.shortcutPropagation || SHORTCUT_PROPAGATION;
            this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
            this.minMode = this.minMode || MIN_MODE;
            this.maxMode = this.maxMode || MAX_MODE;
            this.monthColLimit = this.monthColLimit || MONTH_COL_LIMIT;
            this.yearColLimit = this.yearColLimit || YEAR_COL_LIMIT;
            // todo: use date for unique value
            this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);
            if (this.initDate) {
                this.activeDate = this.initDate;
                this.selectedDate = new Date(this.activeDate.valueOf());
                this.update.emit(this.activeDate);
            } else if (this.activeDate === undefined) {
                this.activeDate = new Date();
            }
        };
        // this.refreshView should be called here to reflect the changes on the fly
        // tslint:disable-next-line:no-unused-variable
        DatePickerInnerComponent.prototype.ngOnChanges = function (changes) {
            this.refreshView();
        };
        DatePickerInnerComponent.prototype.setCompareHandler = function (handler, type) {
            if (type === 'day') {
                this.compareHandlerDay = handler;
            }
            if (type === 'month') {
                this.compareHandlerMonth = handler;
            }
            if (type === 'year') {
                this.compareHandlerYear = handler;
            }
        };
        DatePickerInnerComponent.prototype.compare = function (date1, date2) {
            if (date1 === undefined || date2 === undefined) {
                return undefined;
            }
            if (this.datepickerMode === 'day' && this.compareHandlerDay) {
                return this.compareHandlerDay(date1, date2);
            }
            if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
                return this.compareHandlerMonth(date1, date2);
            }
            if (this.datepickerMode === 'year' && this.compareHandlerYear) {
                return this.compareHandlerYear(date1, date2);
            }
            return void 0;
        };
        DatePickerInnerComponent.prototype.setRefreshViewHandler = function (handler, type) {
            if (type === 'day') {
                this.refreshViewHandlerDay = handler;
            }
            if (type === 'month') {
                this.refreshViewHandlerMonth = handler;
            }
            if (type === 'year') {
                this.refreshViewHandlerYear = handler;
            }
        };
        DatePickerInnerComponent.prototype.refreshView = function () {
            if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
                this.refreshViewHandlerDay();
            }
            if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
                this.refreshViewHandlerMonth();
            }
            if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
                this.refreshViewHandlerYear();
            }
        };
        DatePickerInnerComponent.prototype.dateFilter = function (date, format) {
            return this.dateFormatter.format(date, format);
        };
        DatePickerInnerComponent.prototype.isActive = function (dateObject) {
            if (this.compare(dateObject.date, this.activeDate) === 0) {
                this.activeDateId = dateObject.uid;
                return true;
            }
            return false;
        };
        DatePickerInnerComponent.prototype.createDateObject = function (date, format) {
            var dateObject = {};
            dateObject.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            dateObject.label = this.dateFilter(date, format);
            dateObject.selected = this.compare(date, this.selectedDate) === 0;
            dateObject.disabled = this.isDisabled(date);
            dateObject.current = this.compare(date, new Date()) === 0;
            dateObject.customClass = this.getCustomClassForDate(dateObject.date);
            return dateObject;
        };
        DatePickerInnerComponent.prototype.split = function (arr, size) {
            var arrays = [];
            while (arr.length > 0) {
                arrays.push(arr.splice(0, size));
            }
            return arrays;
        };
        // Fix a hard-reproducible bug with timezones
        // The bug depends on OS, browser, current timezone and current date
        // i.e.
        // var date = new Date(2014, 0, 1);
        // console.log(date.getFullYear(), date.getMonth(), date.getDate(),
        // date.getHours()); can result in "2013 11 31 23" because of the bug.
        DatePickerInnerComponent.prototype.fixTimeZone = function (date) {
            var hours = date.getHours();
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours === 23 ? hours + 2 : 0);
        };
        DatePickerInnerComponent.prototype.select = function (date, isManual) {
            if (isManual === void 0) {
                isManual = true;
            }
            if (this.datepickerMode === this.minMode) {
                if (!this.activeDate) {
                    this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
                }
                this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                if (isManual) {
                    this.selectionDone.emit(this.activeDate);
                }
            } else {
                this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
            }
            this.selectedDate = new Date(this.activeDate.valueOf());
            this.update.emit(this.activeDate);
            this.refreshView();
        };
        DatePickerInnerComponent.prototype.move = function (direction) {
            var expectedStep;
            if (this.datepickerMode === 'day') {
                expectedStep = this.stepDay;
            }
            if (this.datepickerMode === 'month') {
                expectedStep = this.stepMonth;
            }
            if (this.datepickerMode === 'year') {
                expectedStep = this.stepYear;
            }
            if (expectedStep) {
                var year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
                var month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
                this.activeDate = new Date(year, month, 1);
                this.refreshView();
            }
        };
        DatePickerInnerComponent.prototype.toggleMode = function (direction) {
            direction = direction || 1;
            if (this.datepickerMode === this.maxMode && direction === 1 || this.datepickerMode === this.minMode && direction === -1) {
                return;
            }
            this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
            this.refreshView();
        };
        DatePickerInnerComponent.prototype.getCustomClassForDate = function (date) {
            var _this = this;
            if (!this.customClass) {
                return '';
            }
            // todo: build a hash of custom classes, it will work faster
            var customClassObject = this.customClass.find(function (customClass) {
                return customClass.date.valueOf() === date.valueOf() && customClass.mode === _this.datepickerMode;
            }, this);
            return customClassObject === undefined ? '' : customClassObject.clazz;
        };
        DatePickerInnerComponent.prototype.isDisabled = function (date) {
            // todo: implement dateDisabled attribute
            return this.minDate && this.compare(date, this.minDate) < 0 || this.maxDate && this.compare(date, this.maxDate) > 0;
        };
        DatePickerInnerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'datepicker-inner',
                template: "\n    <div *ngIf=\"datepickerMode\" class=\"well well-sm bg-faded p-a card\" role=\"application\" ><!--&lt;!&ndash;ng-keydown=\"keydown($event)\"&ndash;&gt;-->\n      <ng-content></ng-content>\n    </div>\n  "
            }] }];
        /** @nocollapse */
        DatePickerInnerComponent.ctorParameters = [];
        DatePickerInnerComponent.propDecorators = {
            'datepickerMode': [{ type: core_1.Input }],
            'startingDay': [{ type: core_1.Input }],
            'yearRange': [{ type: core_1.Input }],
            'minDate': [{ type: core_1.Input }],
            'maxDate': [{ type: core_1.Input }],
            'minMode': [{ type: core_1.Input }],
            'maxMode': [{ type: core_1.Input }],
            'showWeeks': [{ type: core_1.Input }],
            'formatDay': [{ type: core_1.Input }],
            'formatMonth': [{ type: core_1.Input }],
            'formatYear': [{ type: core_1.Input }],
            'formatDayHeader': [{ type: core_1.Input }],
            'formatDayTitle': [{ type: core_1.Input }],
            'formatMonthTitle': [{ type: core_1.Input }],
            'onlyCurrentMonth': [{ type: core_1.Input }],
            'shortcutPropagation': [{ type: core_1.Input }],
            'customClass': [{ type: core_1.Input }],
            'monthColLimit': [{ type: core_1.Input }],
            'yearColLimit': [{ type: core_1.Input }],
            'dateDisabled': [{ type: core_1.Input }],
            'initDate': [{ type: core_1.Input }],
            'selectionDone': [{ type: core_1.Output }],
            'update': [{ type: core_1.Output }],
            'activeDate': [{ type: core_1.Input }]
        };
        return DatePickerInnerComponent;
    }();
    exports.DatePickerInnerComponent = DatePickerInnerComponent;
    return module.exports;
});
$__System.registerDynamic('19', ['45', '48', '49'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var ng2_bootstrap_config_1 = $__require('48');
    var datepicker_inner_component_1 = $__require('49');
    var YearPickerComponent = function () {
        function YearPickerComponent(datePicker) {
            this.rows = [];
            this.datePicker = datePicker;
        }
        Object.defineProperty(YearPickerComponent.prototype, "isBS4", {
            get: function () {
                return ng2_bootstrap_config_1.Ng2BootstrapConfig.theme === ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4;
            },
            enumerable: true,
            configurable: true
        });
        YearPickerComponent.prototype.ngOnInit = function () {
            var self = this;
            this.datePicker.stepYear = { years: this.datePicker.yearRange };
            this.datePicker.setRefreshViewHandler(function () {
                var years = new Array(this.yearRange);
                var date;
                var start = self.getStartingYear(this.activeDate.getFullYear());
                for (var i = 0; i < this.yearRange; i++) {
                    date = new Date(start + i, 0, 1);
                    date = this.fixTimeZone(date);
                    years[i] = this.createDateObject(date, this.formatYear);
                    years[i].uid = this.uniqueId + '-' + i;
                }
                self.title = [years[0].label, years[this.yearRange - 1].label].join(' - ');
                self.rows = this.split(years, self.datePicker.yearColLimit);
            }, 'year');
            this.datePicker.setCompareHandler(function (date1, date2) {
                return date1.getFullYear() - date2.getFullYear();
            }, 'year');
            this.datePicker.refreshView();
        };
        YearPickerComponent.prototype.getStartingYear = function (year) {
            // todo: parseInt
            return (year - 1) / this.datePicker.yearRange * this.datePicker.yearRange + 1;
        };
        YearPickerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'yearpicker',
                template: "\n<table *ngIf=\"datePicker.datepickerMode==='year'\" role=\"grid\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-left\"\n                (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-left\"></i>\n        </button>\n      </th>\n      <th [attr.colspan]=\"((datePicker.yearColLimit - 2) <= 0) ? 1 : datePicker.yearColLimit - 2\">\n        <button [id]=\"datePicker.uniqueId + '-title'\" role=\"heading\"\n                type=\"button\" class=\"btn btn-default btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === datePicker.maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === datePicker.maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n                (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-right\"></i>\n        </button>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let rowz of rows\">\n      <td *ngFor=\"let dtz of rowz\" class=\"text-center\" role=\"gridcell\">\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-link': isBS4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected || (isBS4 && !dtz.selected && datePicker.isActive(dtz)), disabled: dtz.disabled, active: !isBS4 && datePicker.isActive(dtz)}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ngClass]=\"{'text-success': isBS4 && dtz.current, 'text-info': !isBS4 && dtz.current}\">{{dtz.label}}</span>\n        </button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n  "
            }] }];
        /** @nocollapse */
        YearPickerComponent.ctorParameters = [{ type: datepicker_inner_component_1.DatePickerInnerComponent }];
        return YearPickerComponent;
    }();
    exports.YearPickerComponent = YearPickerComponent;
    return module.exports;
});
$__System.registerDynamic('16', ['46', '45', '47', '49', '15', '17', '18', '19', '4b'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var datepicker_inner_component_1 = $__require('49');
    var datepicker_component_1 = $__require('15');
    var daypicker_component_1 = $__require('17');
    var monthpicker_component_1 = $__require('18');
    var yearpicker_component_1 = $__require('19');
    var components_helper_service_1 = $__require('4b');
    var DatepickerModule = function () {
        function DatepickerModule() {}
        DatepickerModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [datepicker_component_1.DatePickerComponent, datepicker_inner_component_1.DatePickerInnerComponent, daypicker_component_1.DayPickerComponent, monthpicker_component_1.MonthPickerComponent, yearpicker_component_1.YearPickerComponent],
                exports: [datepicker_component_1.DatePickerComponent, datepicker_inner_component_1.DatePickerInnerComponent, daypicker_component_1.DayPickerComponent, forms_1.FormsModule, monthpicker_component_1.MonthPickerComponent, yearpicker_component_1.YearPickerComponent],
                providers: [components_helper_service_1.ComponentsHelper]
            }] }];
        /** @nocollapse */
        DatepickerModule.ctorParameters = [];
        return DatepickerModule;
    }();
    exports.DatepickerModule = DatepickerModule;
    return module.exports;
});
$__System.registerDynamic('21', ['45', '23'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var dropdown_directive_1 = $__require('23');
    var DropdownMenuDirective = function () {
        /* tslint:enable:no-unused-variable */
        function DropdownMenuDirective(dropdown, el) {
            /* tslint:disable:no-unused-variable */
            this.addClass = true;
            this.dropdown = dropdown;
            this.el = el;
        }
        DropdownMenuDirective.prototype.ngOnInit = function () {
            this.dropdown.dropDownMenu = this;
        };
        DropdownMenuDirective.decorators = [{ type: core_1.Directive, args: [{
                selector: '[dropdownMenu]',
                exportAs: 'bs-dropdown-menu'
            }] }];
        /** @nocollapse */
        DropdownMenuDirective.ctorParameters = [{ type: dropdown_directive_1.DropdownDirective, decorators: [{ type: core_1.Host }] }, { type: core_1.ElementRef }];
        DropdownMenuDirective.propDecorators = {
            'addClass': [{ type: core_1.HostBinding, args: ['class.dropdown-menu'] }]
        };
        return DropdownMenuDirective;
    }();
    exports.DropdownMenuDirective = DropdownMenuDirective;
    return module.exports;
});
$__System.registerDynamic('22', ['45', '23'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var dropdown_directive_1 = $__require('23');
    /* tslint:disable-next-line */
    var MouseEvent = global.MouseEvent;
    var DropdownToggleDirective = function () {
        function DropdownToggleDirective(dropdown, el) {
            this.isDisabled = false;
            this.addToggleClass = true;
            this.addClass = true;
            this.dropdown = dropdown;
            this.el = el;
        }
        DropdownToggleDirective.prototype.ngOnInit = function () {
            this.dropdown.dropDownToggle = this;
        };
        Object.defineProperty(DropdownToggleDirective.prototype, "isOpen", {
            get: function () {
                return this.dropdown.isOpen;
            },
            enumerable: true,
            configurable: true
        });
        DropdownToggleDirective.prototype.toggleDropdown = function (event) {
            event.stopPropagation();
            if (!this.isDisabled) {
                this.dropdown.toggle();
            }
            return false;
        };
        DropdownToggleDirective.decorators = [{ type: core_1.Directive, args: [{
                selector: '[dropdownToggle]',
                exportAs: 'bs-dropdown-toggle'
            }] }];
        /** @nocollapse */
        DropdownToggleDirective.ctorParameters = [{ type: dropdown_directive_1.DropdownDirective, decorators: [{ type: core_1.Host }] }, { type: core_1.ElementRef }];
        DropdownToggleDirective.propDecorators = {
            'isDisabled': [{ type: core_1.HostBinding, args: ['class.disabled'] }, { type: core_1.Input }],
            'addToggleClass': [{ type: core_1.HostBinding, args: ['class.dropdown-toggle'] }, { type: core_1.Input }],
            'addClass': [{ type: core_1.HostBinding, args: ['attr.aria-haspopup'] }],
            'isOpen': [{ type: core_1.HostBinding, args: ['attr.aria-expanded'] }],
            'toggleDropdown': [{ type: core_1.HostListener, args: ['click', ['$event']] }]
        };
        return DropdownToggleDirective;
    }();
    exports.DropdownToggleDirective = DropdownToggleDirective;
    return module.exports;
});
$__System.registerDynamic('24', [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    exports.ALWAYS = 'always';
    exports.DISABLED = 'disabled';
    exports.OUTSIDECLICK = 'outsideClick';
    exports.NONINPUT = 'nonInput';
    /* tslint:disable-next-line */
    var KeyboardEvent = global.KeyboardEvent;
    /* tslint:disable-next-line */
    var MouseEvent = global.MouseEvent;
    var DropdownService = function () {
        function DropdownService() {
            this.closeDropdownBind = this.closeDropdown.bind(this);
            this.keybindFilterBind = this.keybindFilter.bind(this);
        }
        DropdownService.prototype.open = function (dropdownScope) {
            if (!this.openScope) {
                window.document.addEventListener('click', this.closeDropdownBind, true);
                window.document.addEventListener('keydown', this.keybindFilterBind);
            }
            if (this.openScope && this.openScope !== dropdownScope) {
                this.openScope.isOpen = false;
            }
            this.openScope = dropdownScope;
        };
        DropdownService.prototype.close = function (dropdownScope) {
            if (this.openScope !== dropdownScope) {
                return;
            }
            this.openScope = void 0;
            window.document.removeEventListener('click', this.closeDropdownBind, true);
            window.document.removeEventListener('keydown', this.keybindFilterBind);
        };
        DropdownService.prototype.closeDropdown = function (event) {
            if (!this.openScope) {
                return;
            }
            if (event && this.openScope.autoClose === exports.DISABLED) {
                return;
            }
            if (event && this.openScope.toggleEl && this.openScope.toggleEl.nativeElement.contains(event.target)) {
                return;
            }
            if (event && this.openScope.autoClose === exports.NONINPUT && this.openScope.menuEl && /input|textarea/i.test(event.target.tagName) && this.openScope.menuEl.nativeElement.contains(event.target)) {
                return;
            }
            if (event && this.openScope.autoClose === exports.OUTSIDECLICK && this.openScope.menuEl && this.openScope.menuEl.nativeElement.contains(event.target)) {
                return;
            }
            this.openScope.isOpen = false;
        };
        DropdownService.prototype.keybindFilter = function (event) {
            if (event.which === 27) {
                this.openScope.focusToggleElement();
                this.closeDropdown(void 0);
                return;
            }
            if (this.openScope.keyboardNav && this.openScope.isOpen && (event.which === 38 || event.which === 40)) {
                event.preventDefault();
                event.stopPropagation();
                this.openScope.focusDropdownEntry(event.which);
            }
        };
        return DropdownService;
    }();
    exports.DropdownService = DropdownService;
    exports.dropdownService = new DropdownService();
    return module.exports;
});
$__System.registerDynamic('23', ['45', '24'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var dropdown_service_1 = $__require('24');
    var DropdownDirective = function () {
        function DropdownDirective(el, ref) {
            this.onToggle = new core_1.EventEmitter(false);
            this.isOpenChange = new core_1.EventEmitter(false);
            this.addClass = true;
            // @Query('dropdownMenu', {descendants: false})
            // dropdownMenuList:QueryList<ElementRef>) {
            this.el = el;
            this._changeDetector = ref;
            // todo: bind to route change event
        }
        Object.defineProperty(DropdownDirective.prototype, "isOpen", {
            get: function () {
                return this._isOpen;
            },
            set: function (value) {
                this._isOpen = !!value;
                // todo: implement after porting position
                // if (this.appendToBody && this.menuEl) {
                //
                // }
                // todo: $animate open<->close transitions, as soon as ng2Animate will be
                // ready
                if (this.isOpen) {
                    this.focusToggleElement();
                    dropdown_service_1.dropdownService.open(this);
                } else {
                    dropdown_service_1.dropdownService.close(this);
                    this.selectedOption = void 0;
                }
                this.onToggle.emit(this.isOpen);
                this.isOpenChange.emit(this.isOpen);
                this._changeDetector.markForCheck();
                // todo: implement call to setIsOpen if set and function
            },
            enumerable: true,
            configurable: true
        });
        DropdownDirective.prototype.ngOnInit = function () {
            this.autoClose = this.autoClose || dropdown_service_1.NONINPUT;
            if (this.isOpen) {}
        };
        DropdownDirective.prototype.ngOnDestroy = function () {
            if (this.appendToBody && this.menuEl) {
                this.menuEl.nativeElement.remove();
            }
        };
        Object.defineProperty(DropdownDirective.prototype, "dropDownMenu", {
            set: function (dropdownMenu) {
                // init drop down menu
                this.menuEl = dropdownMenu.el;
                if (this.appendToBody) {
                    window.document.body.appendChild(this.menuEl.nativeElement);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownDirective.prototype, "dropDownToggle", {
            set: function (dropdownToggle) {
                // init toggle element
                this.toggleEl = dropdownToggle.el;
            },
            enumerable: true,
            configurable: true
        });
        DropdownDirective.prototype.toggle = function (open) {
            return this.isOpen = arguments.length ? !!open : !this.isOpen;
        };
        DropdownDirective.prototype.focusDropdownEntry = function (keyCode) {
            // If append to body is used.
            var hostEl = this.menuEl ? this.menuEl.nativeElement : this.el.nativeElement.getElementsByTagName('ul')[0];
            if (!hostEl) {
                // todo: throw exception?
                return;
            }
            var elems = hostEl.getElementsByTagName('a');
            if (!elems || !elems.length) {
                // todo: throw exception?
                return;
            }
            // todo: use parseInt to detect isNumber?
            // todo: or implement selectedOption as a get\set pair with parseInt on set
            switch (keyCode) {
                case 40:
                    if (typeof this.selectedOption !== 'number') {
                        this.selectedOption = 0;
                        break;
                    }
                    if (this.selectedOption === elems.length - 1) {
                        break;
                    }
                    this.selectedOption++;
                    break;
                case 38:
                    if (typeof this.selectedOption !== 'number') {
                        return;
                    }
                    if (this.selectedOption === 0) {
                        // todo: return?
                        break;
                    }
                    this.selectedOption--;
                    break;
                default:
                    break;
            }
            elems[this.selectedOption].focus();
        };
        DropdownDirective.prototype.focusToggleElement = function () {
            if (this.toggleEl) {
                this.toggleEl.nativeElement.focus();
            }
        };
        DropdownDirective.decorators = [{ type: core_1.Directive, args: [{
                selector: '[dropdown]',
                exportAs: 'bs-dropdown'
            }] }];
        /** @nocollapse */
        DropdownDirective.ctorParameters = [{ type: core_1.ElementRef }, { type: core_1.ChangeDetectorRef }];
        DropdownDirective.propDecorators = {
            'isOpen': [{ type: core_1.HostBinding, args: ['class.open'] }, { type: core_1.Input }],
            'autoClose': [{ type: core_1.Input }],
            'keyboardNav': [{ type: core_1.Input }],
            'appendToBody': [{ type: core_1.Input }],
            'onToggle': [{ type: core_1.Output }],
            'isOpenChange': [{ type: core_1.Output }],
            'addClass': [{ type: core_1.HostBinding, args: ['class.dropdown'] }]
        };
        return DropdownDirective;
    }();
    exports.DropdownDirective = DropdownDirective;
    return module.exports;
});
$__System.registerDynamic('25', ['45', '21', '22', '23'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var dropdown_menu_directive_1 = $__require('21');
    var dropdown_toggle_directive_1 = $__require('22');
    var dropdown_directive_1 = $__require('23');
    var DropdownModule = function () {
        function DropdownModule() {}
        DropdownModule.decorators = [{ type: core_1.NgModule, args: [{
                declarations: [dropdown_directive_1.DropdownDirective, dropdown_menu_directive_1.DropdownMenuDirective, dropdown_toggle_directive_1.DropdownToggleDirective],
                exports: [dropdown_directive_1.DropdownDirective, dropdown_menu_directive_1.DropdownMenuDirective, dropdown_toggle_directive_1.DropdownToggleDirective]
            }] }];
        /** @nocollapse */
        DropdownModule.ctorParameters = [];
        return DropdownModule;
    }();
    exports.DropdownModule = DropdownModule;
    return module.exports;
});
$__System.registerDynamic('4c', ['4d'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var browser_1 = $__require('4d');
    var Utils = function () {
        function Utils() {}
        Utils.reflow = function (element) {
            new Function('bs', 'return bs')(element.offsetHeight);
        };
        // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
        Utils.getStyles = function (elem) {
            // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = browser_1.window;
            }
            return view.getComputedStyle(elem);
        };
        return Utils;
    }();
    exports.Utils = Utils;
    return module.exports;
});
$__System.registerDynamic('1c', ['45', '1d'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var modal_options_class_1 = $__require('1d');
    var ModalBackdropOptions = function () {
        function ModalBackdropOptions(options) {
            this.animate = true;
            Object.assign(this, options);
        }
        return ModalBackdropOptions;
    }();
    exports.ModalBackdropOptions = ModalBackdropOptions;
    var ModalBackdropComponent = function () {
        function ModalBackdropComponent(options, element, renderer) {
            this._isShown = false;
            this.element = element;
            this.renderer = renderer;
            this.isAnimated = options.animate !== false;
        }
        Object.defineProperty(ModalBackdropComponent.prototype, "isAnimated", {
            get: function () {
                return this._isAnimated;
            },
            set: function (value) {
                this._isAnimated = value;
                this.renderer.setElementClass(this.element.nativeElement, "" + modal_options_class_1.ClassName.FADE, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModalBackdropComponent.prototype, "isShown", {
            get: function () {
                return this._isShown;
            },
            set: function (value) {
                this._isShown = value;
                this.renderer.setElementClass(this.element.nativeElement, "" + modal_options_class_1.ClassName.IN, value);
            },
            enumerable: true,
            configurable: true
        });
        ModalBackdropComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'bs-modal-backdrop',
                template: '',
                host: { 'class': modal_options_class_1.ClassName.BACKDROP }
            }] }];
        /** @nocollapse */
        ModalBackdropComponent.ctorParameters = [{ type: ModalBackdropOptions }, { type: core_1.ElementRef }, { type: core_1.Renderer }];
        return ModalBackdropComponent;
    }();
    exports.ModalBackdropComponent = ModalBackdropComponent;
    return module.exports;
});
$__System.registerDynamic('1d', [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    exports.modalConfigDefaults = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true,
        ignoreBackdropClick: false
    };
    exports.ClassName = {
        SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
        BACKDROP: 'modal-backdrop',
        OPEN: 'modal-open',
        FADE: 'fade',
        IN: 'in'
    };
    exports.Selector = {
        DIALOG: '.modal-dialog',
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
    };
    return module.exports;
});
$__System.registerDynamic('1e', ['45', '4b', '4c', '1c', '1d', '4d'], true, function ($__require, exports, module) {
    // todo: should we support enforce focus in?
    // todo: in original bs there are was a way to prevent modal from showing
    // todo: original modal had resize events
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var components_helper_service_1 = $__require('4b');
    var utils_class_1 = $__require('4c');
    var modal_backdrop_component_1 = $__require('1c');
    var modal_options_class_1 = $__require('1d');
    var browser_1 = $__require('4d');
    var TRANSITION_DURATION = 300;
    var BACKDROP_TRANSITION_DURATION = 150;
    var ModalDirective = function () {
        function ModalDirective(element, renderer, componentsHelper) {
            this.element = element;
            this.renderer = renderer;
            this.componentsHelper = componentsHelper;
            this.onShow = new core_1.EventEmitter();
            this.onShown = new core_1.EventEmitter();
            this.onHide = new core_1.EventEmitter();
            this.onHidden = new core_1.EventEmitter();
            // seems like an Options
            this.isAnimated = true;
            this._isShown = false;
            this.isBodyOverflowing = false;
            this.originalBodyPadding = 0;
            this.scrollbarWidth = 0;
            this.timerHideModal = 0;
            this.timerRmBackDrop = 0;
        }
        Object.defineProperty(ModalDirective.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (conf) {
                this._config = this.getConfig(conf);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ModalDirective.prototype, "isShown", {
            get: function () {
                return this._isShown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModalDirective.prototype, "document", {
            get: function () {
                return this.componentsHelper.getDocument();
            },
            enumerable: true,
            configurable: true
        });
        ;
        /** Host element manipulations */
        // @HostBinding(`class.${ClassName.IN}`) private _addClassIn:boolean;
        ModalDirective.prototype.onClick = function (event) {
            if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this.element.nativeElement) {
                return;
            }
            this.hide(event);
        };
        // todo: consider preventing default and stopping propagation
        ModalDirective.prototype.onEsc = function () {
            if (this.config.keyboard) {
                this.hide();
            }
        };
        ModalDirective.prototype.ngOnDestroy = function () {
            this.config = void 0;
            // this._element             = null
            // this._dialog              = null
            // this._backdrop            = null
            if (this._isShown) {
                this._isShown = false;
                this.hideModal();
            }
            this._isShown = void 0;
            this.isBodyOverflowing = void 0;
            this.originalBodyPadding = void 0;
            this.scrollbarWidth = void 0;
            this.timerHideModal = void 0;
            this.timerRmBackDrop = void 0;
        };
        ModalDirective.prototype.ngAfterViewInit = function () {
            this._config = this._config || this.getConfig();
        };
        /** Public methods */
        ModalDirective.prototype.toggle = function () {
            return this._isShown ? this.hide() : this.show();
        };
        ModalDirective.prototype.show = function () {
            var _this = this;
            this.onShow.emit(this);
            if (this._isShown) {
                return;
            }
            clearTimeout(this.timerHideModal);
            clearTimeout(this.timerRmBackDrop);
            this._isShown = true;
            this.checkScrollbar();
            this.setScrollbar();
            if (this.document && this.document.body) {
                this.renderer.setElementClass(this.document.body, modal_options_class_1.ClassName.OPEN, true);
            }
            this.showBackdrop(function () {
                _this.showElement();
            });
        };
        ModalDirective.prototype.hide = function (event) {
            var _this = this;
            if (event) {
                event.preventDefault();
            }
            this.onHide.emit(this);
            // todo: add an option to prevent hiding
            if (!this._isShown) {
                return;
            }
            clearTimeout(this.timerHideModal);
            clearTimeout(this.timerRmBackDrop);
            this._isShown = false;
            this.renderer.setElementClass(this.element.nativeElement, modal_options_class_1.ClassName.IN, false);
            // this._addClassIn = false;
            if (this.isAnimated) {
                this.timerHideModal = setTimeout(function () {
                    return _this.hideModal();
                }, TRANSITION_DURATION);
            } else {
                this.hideModal();
            }
        };
        /** Private methods */
        ModalDirective.prototype.getConfig = function (config) {
            return Object.assign({}, modal_options_class_1.modalConfigDefaults, config);
        };
        /**
         *  Show dialog
         */
        ModalDirective.prototype.showElement = function () {
            var _this = this;
            // todo: replace this with component helper usage `add to root`
            if (!this.element.nativeElement.parentNode || this.element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE) {
                // don't move modals dom position
                if (this.document && this.document.body) {
                    this.document.body.appendChild(this.element.nativeElement);
                }
            }
            this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'false');
            this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
            this.renderer.setElementProperty(this.element.nativeElement, 'scrollTop', 0);
            if (this.isAnimated) {
                utils_class_1.Utils.reflow(this.element.nativeElement);
            }
            // this._addClassIn = true;
            this.renderer.setElementClass(this.element.nativeElement, modal_options_class_1.ClassName.IN, true);
            var transitionComplete = function () {
                if (_this._config.focus) {
                    _this.element.nativeElement.focus();
                }
                _this.onShown.emit(_this);
            };
            if (this.isAnimated) {
                setTimeout(transitionComplete, TRANSITION_DURATION);
            } else {
                transitionComplete();
            }
        };
        ModalDirective.prototype.hideModal = function () {
            var _this = this;
            this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'true');
            this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
            this.showBackdrop(function () {
                if (_this.document && _this.document.body) {
                    _this.renderer.setElementClass(_this.document.body, modal_options_class_1.ClassName.OPEN, false);
                }
                _this.resetAdjustments();
                _this.resetScrollbar();
                _this.onHidden.emit(_this);
            });
        };
        // todo: original show was calling a callback when done, but we can use promise
        ModalDirective.prototype.showBackdrop = function (callback) {
            var _this = this;
            if (this._isShown && this.config.backdrop && (!this.backdrop || !this.backdrop.instance.isShown)) {
                this.removeBackdrop();
                this.backdrop = this.componentsHelper.appendNextToRoot(modal_backdrop_component_1.ModalBackdropComponent, modal_backdrop_component_1.ModalBackdropOptions, new modal_backdrop_component_1.ModalBackdropOptions({ animate: false }));
                if (this.isAnimated) {
                    this.backdrop.instance.isAnimated = this.isAnimated;
                    utils_class_1.Utils.reflow(this.backdrop.instance.element.nativeElement);
                }
                this.backdrop.instance.isShown = true;
                if (!callback) {
                    return;
                }
                if (!this.isAnimated) {
                    callback();
                    return;
                }
                setTimeout(callback, BACKDROP_TRANSITION_DURATION);
            } else if (!this._isShown && this.backdrop) {
                this.backdrop.instance.isShown = false;
                var callbackRemove = function () {
                    _this.removeBackdrop();
                    if (callback) {
                        callback();
                    }
                };
                if (this.backdrop.instance.isAnimated) {
                    this.timerRmBackDrop = setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
                } else {
                    callbackRemove();
                }
            } else if (callback) {
                callback();
            }
        };
        ModalDirective.prototype.removeBackdrop = function () {
            if (this.backdrop) {
                this.backdrop.destroy();
                this.backdrop = void 0;
            }
        };
        /** Events tricks */
        // no need for it
        // private setEscapeEvent():void {
        //   if (this._isShown && this._config.keyboard) {
        //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
        //       if (event.which === 27) {
        //         this.hide()
        //       }
        //     })
        //
        //   } else if (!this._isShown) {
        //     $(this._element).off(Event.KEYDOWN_DISMISS)
        //   }
        // }
        // private setResizeEvent():void {
        // console.log(this.renderer.listenGlobal('', Event.RESIZE));
        // if (this._isShown) {
        //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
        // } else {
        //   $(window).off(Event.RESIZE)
        // }
        // }
        ModalDirective.prototype.resetAdjustments = function () {
            this.renderer.setElementStyle(this.element.nativeElement, 'paddingLeft', '');
            this.renderer.setElementStyle(this.element.nativeElement, 'paddingRight', '');
        };
        /** Scroll bar tricks */
        ModalDirective.prototype.checkScrollbar = function () {
            this.isBodyOverflowing = this.document.body.clientWidth < browser_1.window.innerWidth;
            this.scrollbarWidth = this.getScrollbarWidth();
        };
        ModalDirective.prototype.setScrollbar = function () {
            if (!this.document) {
                return;
            }
            var fixedEl = this.document.querySelector(modal_options_class_1.Selector.FIXED_CONTENT);
            if (!fixedEl) {
                return;
            }
            var bodyPadding = parseInt(utils_class_1.Utils.getStyles(fixedEl).paddingRight || 0, 10);
            this.originalBodyPadding = parseInt(this.document.body.style.paddingRight || 0, 10);
            if (this.isBodyOverflowing) {
                this.document.body.style.paddingRight = bodyPadding + this.scrollbarWidth + "px";
            }
        };
        ModalDirective.prototype.resetScrollbar = function () {
            this.document.body.style.paddingRight = this.originalBodyPadding;
        };
        // thx d.walsh
        ModalDirective.prototype.getScrollbarWidth = function () {
            var scrollDiv = this.renderer.createElement(this.document.body, 'div', void 0);
            scrollDiv.className = modal_options_class_1.ClassName.SCROLLBAR_MEASURER;
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.document.body.removeChild(scrollDiv);
            return scrollbarWidth;
        };
        ModalDirective.decorators = [{ type: core_1.Directive, args: [{
                selector: '[bsModal]',
                exportAs: 'bs-modal'
            }] }];
        /** @nocollapse */
        ModalDirective.ctorParameters = [{ type: core_1.ElementRef }, { type: core_1.Renderer }, { type: components_helper_service_1.ComponentsHelper }];
        ModalDirective.propDecorators = {
            'config': [{ type: core_1.Input }],
            'onShow': [{ type: core_1.Output }],
            'onShown': [{ type: core_1.Output }],
            'onHide': [{ type: core_1.Output }],
            'onHidden': [{ type: core_1.Output }],
            'onClick': [{ type: core_1.HostListener, args: ['click', ['$event']] }],
            'onEsc': [{ type: core_1.HostListener, args: ['keydown.esc'] }]
        };
        return ModalDirective;
    }();
    exports.ModalDirective = ModalDirective;
    return module.exports;
});
$__System.registerDynamic('1f', ['45', '1c', '1e', '4b'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var modal_backdrop_component_1 = $__require('1c');
    var modal_component_1 = $__require('1e');
    var components_helper_service_1 = $__require('4b');
    var ModalModule = function () {
        function ModalModule() {}
        ModalModule.decorators = [{ type: core_1.NgModule, args: [{
                declarations: [modal_backdrop_component_1.ModalBackdropComponent, modal_component_1.ModalDirective],
                exports: [modal_backdrop_component_1.ModalBackdropComponent, modal_component_1.ModalDirective],
                entryComponents: [modal_backdrop_component_1.ModalBackdropComponent],
                providers: [components_helper_service_1.ComponentsHelper]
            }] }];
        /** @nocollapse */
        ModalModule.ctorParameters = [];
        return ModalModule;
    }();
    exports.ModalModule = ModalModule;
    return module.exports;
});
$__System.registerDynamic('27', ['45', '47', '28'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var pagination_component_1 = $__require('28');
    var pagerConfig = {
        itemsPerPage: 10,
        previousText: '« Previous',
        nextText: 'Next »',
        pageBtnClass: '',
        align: true
    };
    var PAGER_TEMPLATE = "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.disabled]=\"noNext()\" [class.next]=\"align\" [ngClass]=\"{'pull-right': align}\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
    /* tslint:disable */
    /* tslint:enable */
    var PagerComponent = function (_super) {
        __extends(PagerComponent, _super);
        function PagerComponent(cd, renderer, elementRef) {
            _super.call(this, cd, renderer, elementRef);
            this.config = pagerConfig;
        }
        PagerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'pager[ngModel]',
                template: PAGER_TEMPLATE,
                providers: [forms_1.NgModel]
            }] }];
        /** @nocollapse */
        PagerComponent.ctorParameters = [{ type: forms_1.NgModel, decorators: [{ type: core_1.Self }] }, { type: core_1.Renderer }, { type: core_1.ElementRef }];
        return PagerComponent;
    }(pagination_component_1.PaginationComponent);
    exports.PagerComponent = PagerComponent;
    return module.exports;
});
$__System.registerDynamic('28', ['45', '47'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    /* tslint:disable-next-line */
    var MouseEvent = global.MouseEvent;
    var paginationConfig = {
        maxSize: void 0,
        itemsPerPage: 10,
        boundaryLinks: false,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        pageBtnClass: '',
        rotate: true
    };
    var PAGINATION_TEMPLATE = "\n  <ul class=\"pagination\" [ngClass]=\"classMap\">\n    <li class=\"pagination-first page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(1, $event)\" [innerHTML]=\"getText('first')\"></a>\n    </li>\n\n    <li class=\"pagination-prev page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\" [innerHTML]=\"getText('previous')\"></a>\n      </li>\n\n    <li *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.active\"\n        [class.disabled]=\"disabled&&!pg.active\"\n        class=\"pagination-page page-item\">\n      <a class=\"page-link\" href (click)=\"selectPage(pg.number, $event)\" [innerHTML]=\"pg.text\"></a>\n    </li>\n\n    <li class=\"pagination-next page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noNext()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\" [innerHTML]=\"getText('next')\"></a></li>\n\n    <li class=\"pagination-last page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noNext()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\" [innerHTML]=\"getText('last')\"></a></li>\n  </ul>\n  ";
    /* tslint:disable */
    /* tslint:enable */
    var PaginationComponent = function () {
        function PaginationComponent(cd, renderer, elementRef) {
            this.numPages = new core_1.EventEmitter(false);
            this.pageChanged = new core_1.EventEmitter(false);
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
            this.inited = false;
            this.cd = cd;
            this.renderer = renderer;
            this.elementRef = elementRef;
            cd.valueAccessor = this;
            this.config = this.config || paginationConfig;
        }
        Object.defineProperty(PaginationComponent.prototype, "itemsPerPage", {
            get: function () {
                return this._itemsPerPage;
            },
            set: function (v) {
                this._itemsPerPage = v;
                this.totalPages = this.calculateTotalPages();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaginationComponent.prototype, "totalItems", {
            get: function () {
                return this._totalItems;
            },
            set: function (v) {
                this._totalItems = v;
                this.totalPages = this.calculateTotalPages();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaginationComponent.prototype, "totalPages", {
            get: function () {
                return this._totalPages;
            },
            set: function (v) {
                this._totalPages = v;
                this.numPages.emit(v);
                if (this.inited) {
                    this.selectPage(this.page);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaginationComponent.prototype, "page", {
            get: function () {
                return this._page;
            },
            set: function (value) {
                var _previous = this._page;
                this._page = value > this.totalPages ? this.totalPages : value || 1;
                if (_previous === this._page || typeof _previous === 'undefined') {
                    return;
                }
                this.pageChanged.emit({
                    page: this._page,
                    itemsPerPage: this.itemsPerPage
                });
            },
            enumerable: true,
            configurable: true
        });
        PaginationComponent.prototype.ngOnInit = function () {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
            // watch for maxSize
            this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
            this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
            this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
            this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
            this.pageBtnClass = typeof this.pageBtnClass !== 'undefined' ? this.pageBtnClass : paginationConfig.pageBtnClass;
            // base class
            this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
            this.totalPages = this.calculateTotalPages();
            // this class
            this.pages = this.getPages(this.page, this.totalPages);
            this.page = this.cd.value;
            this.inited = true;
        };
        PaginationComponent.prototype.writeValue = function (value) {
            this.page = value;
            this.pages = this.getPages(this.page, this.totalPages);
        };
        PaginationComponent.prototype.getText = function (key) {
            return this[key + 'Text'] || paginationConfig[key + 'Text'];
        };
        PaginationComponent.prototype.noPrevious = function () {
            return this.page === 1;
        };
        PaginationComponent.prototype.noNext = function () {
            return this.page === this.totalPages;
        };
        PaginationComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        PaginationComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        PaginationComponent.prototype.selectPage = function (page, event) {
            if (event) {
                event.preventDefault();
            }
            if (!this.disabled) {
                if (event && event.target) {
                    var target = event.target;
                    target.blur();
                }
                this.writeValue(page);
                this.cd.viewToModelUpdate(this.page);
            }
        };
        // Create page object used in template
        PaginationComponent.prototype.makePage = function (num, text, isActive) {
            return {
                number: num,
                text: text,
                active: isActive
            };
        };
        PaginationComponent.prototype.getPages = function (currentPage, totalPages) {
            var pages = [];
            // Default page limits
            var startPage = 1;
            var endPage = totalPages;
            var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
            // recompute if maxSize
            if (isMaxSized) {
                if (this.rotate) {
                    // Current page is displayed in the middle of the visible ones
                    startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                    endPage = startPage + this.maxSize - 1;
                    // Adjust if limit is exceeded
                    if (endPage > totalPages) {
                        endPage = totalPages;
                        startPage = endPage - this.maxSize + 1;
                    }
                } else {
                    // Visible pages are paginated with maxSize
                    startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
                    // Adjust last page if limit is exceeded
                    endPage = Math.min(startPage + this.maxSize - 1, totalPages);
                }
            }
            // Add page number links
            for (var num = startPage; num <= endPage; num++) {
                var page = this.makePage(num, num.toString(), num === currentPage);
                pages.push(page);
            }
            // Add links to move between page sets
            if (isMaxSized && !this.rotate) {
                if (startPage > 1) {
                    var previousPageSet = this.makePage(startPage - 1, '...', false);
                    pages.unshift(previousPageSet);
                }
                if (endPage < totalPages) {
                    var nextPageSet = this.makePage(endPage + 1, '...', false);
                    pages.push(nextPageSet);
                }
            }
            return pages;
        };
        // base class
        PaginationComponent.prototype.calculateTotalPages = function () {
            var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
            return Math.max(totalPages || 0, 1);
        };
        PaginationComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'pagination[ngModel]',
                template: PAGINATION_TEMPLATE,
                providers: [forms_1.NgModel]
            }] }];
        /** @nocollapse */
        PaginationComponent.ctorParameters = [{ type: forms_1.NgModel, decorators: [{ type: core_1.Self }] }, { type: core_1.Renderer }, { type: core_1.ElementRef }];
        PaginationComponent.propDecorators = {
            'align': [{ type: core_1.Input }],
            'maxSize': [{ type: core_1.Input }],
            'boundaryLinks': [{ type: core_1.Input }],
            'directionLinks': [{ type: core_1.Input }],
            'firstText': [{ type: core_1.Input }],
            'previousText': [{ type: core_1.Input }],
            'nextText': [{ type: core_1.Input }],
            'lastText': [{ type: core_1.Input }],
            'rotate': [{ type: core_1.Input }],
            'pageBtnClass': [{ type: core_1.Input }],
            'disabled': [{ type: core_1.Input }],
            'numPages': [{ type: core_1.Output }],
            'pageChanged': [{ type: core_1.Output }],
            'itemsPerPage': [{ type: core_1.Input }],
            'totalItems': [{ type: core_1.Input }]
        };
        return PaginationComponent;
    }();
    exports.PaginationComponent = PaginationComponent;
    return module.exports;
});
$__System.registerDynamic('29', ['46', '45', '47', '27', '28'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var pager_component_1 = $__require('27');
    var pagination_component_1 = $__require('28');
    var PaginationModule = function () {
        function PaginationModule() {}
        PaginationModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [pager_component_1.PagerComponent, pagination_component_1.PaginationComponent],
                exports: [forms_1.FormsModule, pager_component_1.PagerComponent, pagination_component_1.PaginationComponent]
            }] }];
        /** @nocollapse */
        PaginationModule.ctorParameters = [];
        return PaginationModule;
    }();
    exports.PaginationModule = PaginationModule;
    return module.exports;
});
$__System.registerDynamic('2b', ['45', '2c'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var progress_directive_1 = $__require('2c');
    // todo: number pipe
    // todo: use query from progress?
    var BarComponent = function () {
        function BarComponent(progress) {
            this.percent = 0;
            this.progress = progress;
        }
        Object.defineProperty(BarComponent.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (v) {
                if (!v && v !== 0) {
                    return;
                }
                this._value = v;
                this.recalculatePercentage();
            },
            enumerable: true,
            configurable: true
        });
        BarComponent.prototype.ngOnInit = function () {
            this.progress.addBar(this);
        };
        BarComponent.prototype.ngOnDestroy = function () {
            this.progress.removeBar(this);
        };
        BarComponent.prototype.recalculatePercentage = function () {
            this.percent = +(100 * this.value / this.progress.max).toFixed(2);
            var totalPercentage = this.progress.bars.reduce(function (total, bar) {
                return total + bar.percent;
            }, 0);
            if (totalPercentage > 100) {
                this.percent -= totalPercentage - 100;
            }
        };
        BarComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'bar',
                template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ngClass]=\"type && 'progress-bar-' + type\"\n    [ngStyle]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"><ng-content></ng-content></div>\n"
            }] }];
        /** @nocollapse */
        BarComponent.ctorParameters = [{ type: progress_directive_1.ProgressDirective, decorators: [{ type: core_1.Host }] }];
        BarComponent.propDecorators = {
            'type': [{ type: core_1.Input }],
            'value': [{ type: core_1.Input }]
        };
        return BarComponent;
    }();
    exports.BarComponent = BarComponent;
    return module.exports;
});
$__System.registerDynamic("2c", ["45"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("45");
    var progressConfig = {
        animate: true,
        max: 100
    };
    // todo: progress element conflict with bootstrap.css
    // todo: need hack: replace host element with div
    /* tslint:disable */
    /* tslint:enable */
    var ProgressDirective = function () {
        function ProgressDirective() {
            this.addClass = true;
            this.bars = [];
        }
        Object.defineProperty(ProgressDirective.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (v) {
                this._max = v;
                this.bars.forEach(function (bar) {
                    bar.recalculatePercentage();
                });
            },
            enumerable: true,
            configurable: true
        });
        ProgressDirective.prototype.ngOnInit = function () {
            this.animate = this.animate !== false;
            this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
        };
        ProgressDirective.prototype.addBar = function (bar) {
            if (!this.animate) {
                bar.transition = 'none';
            }
            this.bars.push(bar);
        };
        ProgressDirective.prototype.removeBar = function (bar) {
            this.bars.splice(this.bars.indexOf(bar), 1);
        };
        ProgressDirective.decorators = [{ type: core_1.Directive, args: [{ selector: 'bs-progress, [progress]' }] }];
        /** @nocollapse */
        ProgressDirective.ctorParameters = [];
        ProgressDirective.propDecorators = {
            'animate': [{ type: core_1.Input }],
            'max': [{ type: core_1.HostBinding, args: ['attr.max'] }, { type: core_1.Input }],
            'addClass': [{ type: core_1.HostBinding, args: ['class.progress'] }]
        };
        return ProgressDirective;
    }();
    exports.ProgressDirective = ProgressDirective;
    return module.exports;
});
$__System.registerDynamic('2d', ['45'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var ProgressbarComponent = function () {
        function ProgressbarComponent() {}
        ProgressbarComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'progressbar',
                template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  "
            }] }];
        /** @nocollapse */
        ProgressbarComponent.ctorParameters = [];
        ProgressbarComponent.propDecorators = {
            'animate': [{ type: core_1.Input }],
            'max': [{ type: core_1.Input }],
            'type': [{ type: core_1.Input }],
            'value': [{ type: core_1.Input }]
        };
        return ProgressbarComponent;
    }();
    exports.ProgressbarComponent = ProgressbarComponent;
    return module.exports;
});
$__System.registerDynamic('2e', ['46', '45', '2b', '2c', '2d'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var bar_component_1 = $__require('2b');
    var progress_directive_1 = $__require('2c');
    var progressbar_component_1 = $__require('2d');
    var ProgressbarModule = function () {
        function ProgressbarModule() {}
        ProgressbarModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [progress_directive_1.ProgressDirective, bar_component_1.BarComponent, progressbar_component_1.ProgressbarComponent],
                exports: [progress_directive_1.ProgressDirective, bar_component_1.BarComponent, progressbar_component_1.ProgressbarComponent]
            }] }];
        /** @nocollapse */
        ProgressbarModule.ctorParameters = [];
        return ProgressbarModule;
    }();
    exports.ProgressbarModule = ProgressbarModule;
    return module.exports;
});
$__System.registerDynamic('30', ['45', '47'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    /* tslint:disable-next-line */
    var KeyboardEvent = global.KeyboardEvent;
    var RatingComponent = function () {
        function RatingComponent(cd) {
            this.onHover = new core_1.EventEmitter(false);
            this.onLeave = new core_1.EventEmitter(false);
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
            this.cd = cd;
            cd.valueAccessor = this;
        }
        RatingComponent.prototype.onKeydown = function (event) {
            if ([37, 38, 39, 40].indexOf(event.which) === -1) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            var sign = event.which === 38 || event.which === 39 ? 1 : -1;
            this.rate(this.value + sign);
        };
        RatingComponent.prototype.ngOnInit = function () {
            this.max = typeof this.max !== 'undefined' ? this.max : 5;
            this.readonly = this.readonly === true;
            this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'glyphicon-star';
            this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'glyphicon-star-empty';
            this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
            this.range = this.buildTemplateObjects(this.ratingStates, this.max);
        };
        // model -> view
        RatingComponent.prototype.writeValue = function (value) {
            if (value % 1 !== value) {
                this.value = Math.round(value);
                this.preValue = value;
                return;
            }
            this.preValue = value;
            this.value = value;
        };
        RatingComponent.prototype.enter = function (value) {
            if (!this.readonly) {
                this.value = value;
                this.onHover.emit(value);
            }
        };
        RatingComponent.prototype.reset = function () {
            this.value = this.preValue;
            this.onLeave.emit(this.value);
        };
        RatingComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        RatingComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        RatingComponent.prototype.buildTemplateObjects = function (ratingStates, max) {
            ratingStates = ratingStates || [];
            var count = ratingStates.length || max;
            var result = [];
            for (var i = 0; i < count; i++) {
                result.push(Object.assign({
                    index: i,
                    stateOn: this.stateOn,
                    stateOff: this.stateOff,
                    title: this.titles[i] || i + 1
                }, ratingStates[i] || {}));
            }
            return result;
        };
        RatingComponent.prototype.rate = function (value) {
            if (!this.readonly && value >= 0 && value <= this.range.length) {
                this.writeValue(value);
                this.cd.viewToModelUpdate(value);
            }
        };
        RatingComponent.decorators = [{ type: core_1.Component, args: [{
                /* tslint:disable */
                selector: 'rating[ngModel]',
                /* tslint:enable */
                template: "\n    <span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\">\n      <template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\n        <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span>\n        <i (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" class=\"glyphicon\" [ngClass]=\"index < value ? r.stateOn : r.stateOff\" [title]=\"r.title\" ></i>\n      </template>\n    </span>\n  ",
                providers: [forms_1.NgModel]
            }] }];
        /** @nocollapse */
        RatingComponent.ctorParameters = [{ type: forms_1.NgModel, decorators: [{ type: core_1.Self }] }];
        RatingComponent.propDecorators = {
            'max': [{ type: core_1.Input }],
            'stateOn': [{ type: core_1.Input }],
            'stateOff': [{ type: core_1.Input }],
            'readonly': [{ type: core_1.Input }],
            'titles': [{ type: core_1.Input }],
            'ratingStates': [{ type: core_1.Input }],
            'onHover': [{ type: core_1.Output }],
            'onLeave': [{ type: core_1.Output }],
            'onKeydown': [{ type: core_1.HostListener, args: ['keydown', ['$event']] }]
        };
        return RatingComponent;
    }();
    exports.RatingComponent = RatingComponent;
    return module.exports;
});
$__System.registerDynamic('31', ['46', '45', '47', '30'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var rating_component_1 = $__require('30');
    var RatingModule = function () {
        function RatingModule() {}
        RatingModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [rating_component_1.RatingComponent],
                exports: [forms_1.FormsModule, rating_component_1.RatingComponent]
            }] }];
        /** @nocollapse */
        RatingModule.ctorParameters = [];
        return RatingModule;
    }();
    exports.RatingModule = RatingModule;
    return module.exports;
});
$__System.registerDynamic("4e", ["45"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("45");
    var NgTranscludeDirective = function () {
        function NgTranscludeDirective(_viewRef) {
            this._viewRef = _viewRef;
            this.viewRef = _viewRef;
        }
        Object.defineProperty(NgTranscludeDirective.prototype, "ngTransclude", {
            get: function () {
                return this._ngTransclude;
            },
            set: function (templateRef) {
                this._ngTransclude = templateRef;
                if (templateRef) {
                    this.viewRef.createEmbeddedView(templateRef);
                }
            },
            enumerable: true,
            configurable: true
        });
        NgTranscludeDirective.decorators = [{ type: core_1.Directive, args: [{
                selector: '[ngTransclude]'
            }] }];
        /** @nocollapse */
        NgTranscludeDirective.ctorParameters = [{ type: core_1.ViewContainerRef }];
        NgTranscludeDirective.propDecorators = {
            'ngTransclude': [{ type: core_1.Input }]
        };
        return NgTranscludeDirective;
    }();
    exports.NgTranscludeDirective = NgTranscludeDirective;
    return module.exports;
});
$__System.registerDynamic('33', ['45', '35'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var tab_directive_1 = $__require('35');
    var TabHeadingDirective = function () {
        function TabHeadingDirective(templateRef, tab) {
            tab.headingRef = templateRef;
        }
        TabHeadingDirective.decorators = [{ type: core_1.Directive, args: [{ selector: '[tabHeading]' }] }];
        /** @nocollapse */
        TabHeadingDirective.ctorParameters = [{ type: core_1.TemplateRef }, { type: tab_directive_1.TabDirective }];
        return TabHeadingDirective;
    }();
    exports.TabHeadingDirective = TabHeadingDirective;
    return module.exports;
});
$__System.registerDynamic('35', ['45', '34'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var tabset_component_1 = $__require('34');
    /* tslint:disable */
    /* tslint:enable */
    var TabDirective = function () {
        function TabDirective(tabset) {
            this.select = new core_1.EventEmitter(false);
            this.deselect = new core_1.EventEmitter(false);
            this.removed = new core_1.EventEmitter(false);
            this.addClass = true;
            this.tabset = tabset;
            this.tabset.addTab(this);
        }
        Object.defineProperty(TabDirective.prototype, "active", {
            /** tab active state toggle */
            get: function () {
                return this._active;
            },
            set: function (active) {
                var _this = this;
                if (this.disabled && active || !active) {
                    if (!active) {
                        this._active = active;
                    }
                    this.deselect.emit(this);
                    return;
                }
                this._active = active;
                this.select.emit(this);
                this.tabset.tabs.forEach(function (tab) {
                    if (tab !== _this) {
                        tab.active = false;
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        TabDirective.prototype.ngOnInit = function () {
            this.removable = !!this.removable;
        };
        TabDirective.prototype.ngOnDestroy = function () {
            this.tabset.removeTab(this);
        };
        TabDirective.decorators = [{ type: core_1.Directive, args: [{ selector: 'tab, [tab]' }] }];
        /** @nocollapse */
        TabDirective.ctorParameters = [{ type: tabset_component_1.TabsetComponent }];
        TabDirective.propDecorators = {
            'heading': [{ type: core_1.Input }],
            'disabled': [{ type: core_1.Input }],
            'removable': [{ type: core_1.Input }],
            'customClass': [{ type: core_1.Input }],
            'active': [{ type: core_1.HostBinding, args: ['class.active'] }, { type: core_1.Input }],
            'select': [{ type: core_1.Output }],
            'deselect': [{ type: core_1.Output }],
            'removed': [{ type: core_1.Output }],
            'addClass': [{ type: core_1.HostBinding, args: ['class.tab-pane'] }]
        };
        return TabDirective;
    }();
    exports.TabDirective = TabDirective;
    return module.exports;
});
$__System.registerDynamic("34", ["45"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("45");
    // todo: add active event to tab
    // todo: fix? mixing static and dynamic tabs position tabs in order of creation
    var TabsetComponent = function () {
        function TabsetComponent() {
            this.clazz = true;
            this.tabs = [];
            this.classMap = {};
        }
        Object.defineProperty(TabsetComponent.prototype, "vertical", {
            get: function () {
                return this._vertical;
            },
            set: function (value) {
                this._vertical = value;
                this.setClassMap();
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(TabsetComponent.prototype, "justified", {
            get: function () {
                return this._justified;
            },
            set: function (value) {
                this._justified = value;
                this.setClassMap();
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(TabsetComponent.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
                this.setClassMap();
            },
            enumerable: true,
            configurable: true
        });
        ;
        TabsetComponent.prototype.ngOnInit = function () {
            this.type = this.type !== 'undefined' ? this.type : 'tabs';
        };
        TabsetComponent.prototype.ngOnDestroy = function () {
            this.isDestroyed = true;
        };
        TabsetComponent.prototype.addTab = function (tab) {
            this.tabs.push(tab);
            tab.active = this.tabs.length === 1 && tab.active !== false;
        };
        TabsetComponent.prototype.removeTab = function (tab) {
            var index = this.tabs.indexOf(tab);
            if (index === -1 || this.isDestroyed) {
                return;
            }
            // Select a new tab if the tab to be removed is selected and not destroyed
            if (tab.active && this.hasAvailableTabs(index)) {
                var newActiveIndex = this.getClosestTabIndex(index);
                this.tabs[newActiveIndex].active = true;
            }
            tab.removed.emit(tab);
            this.tabs.splice(index, 1);
        };
        TabsetComponent.prototype.getClosestTabIndex = function (index) {
            var tabsLength = this.tabs.length;
            if (!tabsLength) {
                return -1;
            }
            for (var step = 1; step <= tabsLength; step += 1) {
                var prevIndex = index - step;
                var nextIndex = index + step;
                if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                    return prevIndex;
                }
                if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                    return nextIndex;
                }
            }
            return -1;
        };
        TabsetComponent.prototype.hasAvailableTabs = function (index) {
            var tabsLength = this.tabs.length;
            if (!tabsLength) {
                return false;
            }
            for (var i = 0; i < tabsLength; i += 1) {
                if (!this.tabs[i].disabled && i !== index) {
                    return true;
                }
            }
            return false;
        };
        TabsetComponent.prototype.setClassMap = function () {
            this.classMap = (_a = {
                'nav-stacked': this.vertical,
                'nav-justified': this.justified
            }, _a['nav-' + (this.type || 'tabs')] = true, _a);
            var _a;
        };
        TabsetComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'tabset',
                template: "\n    <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"let tabz of tabs\" class=\"nav-item {{tabz.customClass}}\"\n          [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\">\n          <a href=\"javascript:void(0);\" class=\"nav-link\"\n            [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\"\n            (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"glyphicon glyphicon-remove-circle\"></span>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
            }] }];
        /** @nocollapse */
        TabsetComponent.ctorParameters = [];
        TabsetComponent.propDecorators = {
            'vertical': [{ type: core_1.Input }],
            'justified': [{ type: core_1.Input }],
            'type': [{ type: core_1.Input }],
            'clazz': [{ type: core_1.HostBinding, args: ['class.tab-container'] }]
        };
        return TabsetComponent;
    }();
    exports.TabsetComponent = TabsetComponent;
    return module.exports;
});
$__System.registerDynamic('36', ['46', '45', '4e', '33', '35', '34'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var common_2 = $__require('4e');
    var tab_heading_directive_1 = $__require('33');
    var tab_directive_1 = $__require('35');
    var tabset_component_1 = $__require('34');
    var TabsModule = function () {
        function TabsModule() {}
        TabsModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [common_2.NgTranscludeDirective, tab_directive_1.TabDirective, tabset_component_1.TabsetComponent, tab_heading_directive_1.TabHeadingDirective],
                exports: [tab_directive_1.TabDirective, tabset_component_1.TabsetComponent, tab_heading_directive_1.TabHeadingDirective]
            }] }];
        /** @nocollapse */
        TabsModule.ctorParameters = [];
        return TabsModule;
    }();
    exports.TabsModule = TabsModule;
    return module.exports;
});
$__System.registerDynamic('38', ['45', '47'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    // todo: implement global configuration via DI
    // todo: refactor directive has to many functions! (extract to stateless helper)
    // todo: use moment js?
    // todo: implement `time` validator
    // todo: replace increment/decrement blockers with getters, or extract
    // todo: unify work with selected
    exports.timepickerConfig = {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: true,
        meridians: void 0,
        readonlyInput: false,
        mousewheel: true,
        arrowkeys: true,
        showSpinners: true,
        min: void 0,
        max: void 0
    };
    function isDefined(value) {
        return typeof value !== 'undefined';
    }
    function def(value, fn, defaultValue) {
        return fn(value) ? value : defaultValue;
    }
    function addMinutes(date, minutes) {
        var dt = new Date(date.getTime() + minutes * 60000);
        var newDate = new Date(date);
        newDate.setHours(dt.getHours(), dt.getMinutes());
        return newDate;
    }
    var TimepickerComponent = function () {
        function TimepickerComponent(cd) {
            this.meridians = ['AM', 'PM']; // ??
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
            // result value
            this._selected = new Date();
            this.cd = cd;
            cd.valueAccessor = this;
        }
        Object.defineProperty(TimepickerComponent.prototype, "showMeridian", {
            get: function () {
                return this._showMeridian;
            },
            set: function (value) {
                this._showMeridian = value;
                // || !this.$error.time
                // if (true) {
                this.updateTemplate();
                return;
                // }
                // Evaluate from template
                /*let hours = this.getHoursFromTemplate();
                 let minutes = this.getMinutesFromTemplate();
                 if (isDefined(hours) && isDefined(minutes)) {
                 this.selected.setHours(hours);
                 this.refresh();
                 }*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimepickerComponent.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (v) {
                if (v) {
                    this._selected = v;
                    this.updateTemplate();
                    this.cd.viewToModelUpdate(this.selected);
                }
            },
            enumerable: true,
            configurable: true
        });
        // todo: add formatter value to Date object
        TimepickerComponent.prototype.ngOnInit = function () {
            // todo: take in account $locale.DATETIME_FORMATS.AMPMS;
            this.meridians = def(this.meridians, isDefined, exports.timepickerConfig.meridians) || ['AM', 'PM'];
            this.mousewheel = def(this.mousewheel, isDefined, exports.timepickerConfig.mousewheel);
            if (this.mousewheel) {}
            this.arrowkeys = def(this.arrowkeys, isDefined, exports.timepickerConfig.arrowkeys);
            if (this.arrowkeys) {}
            this.readonlyInput = def(this.readonlyInput, isDefined, exports.timepickerConfig.readonlyInput);
            // this.setupInputEvents();
            this.hourStep = def(this.hourStep, isDefined, exports.timepickerConfig.hourStep);
            this.minuteStep = def(this.minuteStep, isDefined, exports.timepickerConfig.minuteStep);
            this.min = def(this.min, isDefined, exports.timepickerConfig.min);
            this.max = def(this.max, isDefined, exports.timepickerConfig.max);
            // 12H / 24H mode
            this.showMeridian = def(this.showMeridian, isDefined, exports.timepickerConfig.showMeridian);
            this.showSpinners = def(this.showSpinners, isDefined, exports.timepickerConfig.showSpinners);
        };
        TimepickerComponent.prototype.writeValue = function (v) {
            if (v === this.selected) {
                return;
            }
            if (v && v instanceof Date) {
                this.selected = v;
                return;
            }
            this.selected = v ? new Date(v) : void 0;
        };
        TimepickerComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        TimepickerComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        TimepickerComponent.prototype.setDisabledState = function (isDisabled) {
            this.readonlyInput = isDisabled;
        };
        TimepickerComponent.prototype.updateHours = function () {
            if (this.readonlyInput) {
                return;
            }
            var hours = this.getHoursFromTemplate();
            var minutes = this.getMinutesFromTemplate();
            this.invalidHours = !isDefined(hours);
            this.invalidMinutes = !isDefined(minutes);
            if (this.invalidHours || this.invalidMinutes) {
                // TODO: needed a validation functionality.
                return;
            }
            this.selected.setHours(hours);
            this.invalidHours = this.selected < this.min || this.selected > this.max;
            if (this.invalidHours) {
                // todo: validation?
                // invalidate(true);
                return;
            } else {
                this.refresh();
            }
        };
        // tslint:disable-next-line:no-unused-variable
        TimepickerComponent.prototype.hoursOnBlur = function (event) {
            if (this.readonlyInput) {
                return;
            }
            // todo: binded with validation
            if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
                this.hours = this.pad(this.hours);
            }
        };
        TimepickerComponent.prototype.updateMinutes = function () {
            if (this.readonlyInput) {
                return;
            }
            var minutes = this.getMinutesFromTemplate();
            var hours = this.getHoursFromTemplate();
            this.invalidMinutes = !isDefined(minutes);
            this.invalidHours = !isDefined(hours);
            if (this.invalidMinutes || this.invalidHours) {
                // TODO: needed a validation functionality.
                return;
            }
            this.selected.setMinutes(minutes);
            this.invalidMinutes = this.selected < this.min || this.selected > this.max;
            if (this.invalidMinutes) {
                // todo: validation
                // invalidate(undefined, true);
                return;
            } else {
                this.refresh();
            }
        };
        // tslint:disable-next-line:no-unused-variable
        TimepickerComponent.prototype.minutesOnBlur = function (event) {
            if (this.readonlyInput) {
                return;
            }
            if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
                this.minutes = this.pad(this.minutes);
            }
        };
        TimepickerComponent.prototype.incrementHours = function () {
            if (!this.noIncrementHours()) {
                this.addMinutesToSelected(this.hourStep * 60);
            }
        };
        TimepickerComponent.prototype.decrementHours = function () {
            if (!this.noDecrementHours()) {
                this.addMinutesToSelected(-this.hourStep * 60);
            }
        };
        TimepickerComponent.prototype.incrementMinutes = function () {
            if (!this.noIncrementMinutes()) {
                this.addMinutesToSelected(this.minuteStep);
            }
        };
        TimepickerComponent.prototype.decrementMinutes = function () {
            if (!this.noDecrementMinutes()) {
                this.addMinutesToSelected(-this.minuteStep);
            }
        };
        TimepickerComponent.prototype.noIncrementHours = function () {
            var incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
            return incrementedSelected > this.max || incrementedSelected < this.selected && incrementedSelected < this.min;
        };
        TimepickerComponent.prototype.noDecrementHours = function () {
            var decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
            return decrementedSelected < this.min || decrementedSelected > this.selected && decrementedSelected > this.max;
        };
        TimepickerComponent.prototype.noIncrementMinutes = function () {
            var incrementedSelected = addMinutes(this.selected, this.minuteStep);
            return incrementedSelected > this.max || incrementedSelected < this.selected && incrementedSelected < this.min;
        };
        TimepickerComponent.prototype.noDecrementMinutes = function () {
            var decrementedSelected = addMinutes(this.selected, -this.minuteStep);
            return decrementedSelected < this.min || decrementedSelected > this.selected && decrementedSelected > this.max;
        };
        TimepickerComponent.prototype.toggleMeridian = function () {
            if (!this.noToggleMeridian()) {
                var sign = this.selected.getHours() < 12 ? 1 : -1;
                this.addMinutesToSelected(12 * 60 * sign);
            }
        };
        TimepickerComponent.prototype.refresh = function () {
            // this.makeValid();
            this.updateTemplate();
            this.cd.viewToModelUpdate(this.selected);
        };
        TimepickerComponent.prototype.updateTemplate = function () {
            var hours = this.selected.getHours();
            var minutes = this.selected.getMinutes();
            if (this.showMeridian) {
                // Convert 24 to 12 hour system
                hours = hours === 0 || hours === 12 ? 12 : hours % 12;
            }
            // this.hours = keyboardChange === 'h' ? hours : this.pad(hours);
            // if (keyboardChange !== 'm') {
            //  this.minutes = this.pad(minutes);
            // }
            this.hours = this.pad(hours);
            this.minutes = this.pad(minutes);
            this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
        };
        TimepickerComponent.prototype.getHoursFromTemplate = function () {
            var hours = parseInt(this.hours, 10);
            var valid = this.showMeridian ? hours > 0 && hours < 13 : hours >= 0 && hours < 24;
            if (!valid) {
                return void 0;
            }
            if (this.showMeridian) {
                if (hours === 12) {
                    hours = 0;
                }
                if (this.meridian === this.meridians[1]) {
                    hours = hours + 12;
                }
            }
            return hours;
        };
        TimepickerComponent.prototype.getMinutesFromTemplate = function () {
            var minutes = parseInt(this.minutes, 10);
            return minutes >= 0 && minutes < 60 ? minutes : undefined;
        };
        TimepickerComponent.prototype.pad = function (value) {
            return isDefined(value) && value.toString().length < 2 ? '0' + value : value.toString();
        };
        TimepickerComponent.prototype.addMinutesToSelected = function (minutes) {
            this.selected = addMinutes(this.selected, minutes);
            this.refresh();
        };
        TimepickerComponent.prototype.noToggleMeridian = function () {
            if (this.readonlyInput) {
                return true;
            }
            if (this.selected.getHours() < 13) {
                return addMinutes(this.selected, 12 * 60) > this.max;
            } else {
                return addMinutes(this.selected, -12 * 60) < this.min;
            }
        };
        TimepickerComponent.decorators = [{ type: core_1.Component, args: [{
                /* tslint:disable */
                selector: 'timepicker[ngModel]',
                /* tslint:enable */
                template: "\n    <table>\n      <tbody>\n        <tr class=\"text-center\" [ngClass]=\"{hidden: !showSpinners || readonlyInput}\">\n          <td><a (click)=\"incrementHours()\" [ngClass]=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"incrementMinutes()\" [ngClass]=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" *ngIf=\"showMeridian\"></td>\n        </tr>\n        <tr>\n          <td class=\"form-group\" [ngClass]=\"{'has-error': invalidHours}\">\n            <input style=\"width:50px;\" type=\"text\" [(ngModel)]=\"hours\" (change)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"hoursOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td>:</td>\n          <td class=\"form-group\" [ngClass]=\"{'has-error': invalidMinutes}\">\n            <input style=\"width:50px;\" type=\"text\" [(ngModel)]=\"minutes\" (change)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"minutesOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" *ngIf=\"showMeridian\"><button type=\"button\" [ngClass]=\"{disabled: noToggleMeridian() || readonlyInput}\" class=\"btn btn-default text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n        </tr>\n        <tr class=\"text-center\" [ngClass]=\"{hidden: !showSpinners || readonlyInput}\">\n          <td><a (click)=\"decrementHours()\" [ngClass]=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"decrementMinutes()\" [ngClass]=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" *ngIf=\"showMeridian\"></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
                providers: [forms_1.NgModel]
            }] }];
        /** @nocollapse */
        TimepickerComponent.ctorParameters = [{ type: forms_1.NgModel, decorators: [{ type: core_1.Self }] }];
        TimepickerComponent.propDecorators = {
            'hourStep': [{ type: core_1.Input }],
            'minuteStep': [{ type: core_1.Input }],
            'readonlyInput': [{ type: core_1.Input }],
            'mousewheel': [{ type: core_1.Input }],
            'arrowkeys': [{ type: core_1.Input }],
            'showSpinners': [{ type: core_1.Input }],
            'min': [{ type: core_1.Input }],
            'max': [{ type: core_1.Input }],
            'meridians': [{ type: core_1.Input }],
            'showMeridian': [{ type: core_1.Input }]
        };
        return TimepickerComponent;
    }();
    exports.TimepickerComponent = TimepickerComponent;
    return module.exports;
});
$__System.registerDynamic('39', ['46', '45', '47', '38'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var timepicker_component_1 = $__require('38');
    var TimepickerModule = function () {
        function TimepickerModule() {}
        TimepickerModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [timepicker_component_1.TimepickerComponent],
                exports: [forms_1.FormsModule, timepicker_component_1.TimepickerComponent]
            }] }];
        /** @nocollapse */
        TimepickerModule.ctorParameters = [];
        return TimepickerModule;
    }();
    exports.TimepickerModule = TimepickerModule;
    return module.exports;
});
$__System.registerDynamic('3b', ['45', '4f', '50'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var position_1 = $__require('4f');
    var tooltip_options_class_1 = $__require('50');
    var TooltipContainerComponent = function () {
        function TooltipContainerComponent(element, cdr, options) {
            this.top = '-1000px';
            this.left = '-1000px';
            this.display = 'block';
            this.element = element;
            this.cdr = cdr;
            Object.assign(this, options);
            this.classMap = { 'in': false, 'fade': false };
            this.classMap[options.placement] = true;
            this.classMap['tooltip-' + options.placement] = true;
        }
        TooltipContainerComponent.prototype.ngAfterViewInit = function () {
            var p = position_1.positionService.positionElements(this.hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, this.appendToBody);
            this.top = p.top + 'px';
            this.left = p.left + 'px';
            this.classMap.in = true;
            if (this.animation) {
                this.classMap.fade = true;
            }
            if (this.popupClass) {
                this.classMap[this.popupClass] = true;
            }
            this.cdr.detectChanges();
        };
        Object.defineProperty(TooltipContainerComponent.prototype, "isTemplate", {
            get: function () {
                return this.htmlContent instanceof core_1.TemplateRef;
            },
            enumerable: true,
            configurable: true
        });
        TooltipContainerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'tooltip-container',
                // changeDetection: ChangeDetectionStrategy.OnPush,
                template: "<div class=\"tooltip\" role=\"tooltip\"\n     [ngStyle]=\"{top: top, left: left, display: display}\"\n     [ngClass]=\"classMap\">\n      <div class=\"tooltip-arrow\"></div>\n      <div class=\"tooltip-inner\"\n           *ngIf=\"htmlContent && !isTemplate\" \n           innerHtml=\"{{htmlContent}}\">\n      </div>\n      <div class=\"tooltip-inner\"\n           *ngIf=\"htmlContent && isTemplate\">\n        <template [ngTemplateOutlet]=\"htmlContent\"\n                  [ngOutletContext]=\"{model: context}\">\n        </template>\n      </div>\n      <div class=\"tooltip-inner\"\n           *ngIf=\"content\">\n        {{content}}\n      </div>\n    </div>"
            }] }];
        /** @nocollapse */
        TooltipContainerComponent.ctorParameters = [{ type: core_1.ElementRef }, { type: core_1.ChangeDetectorRef }, { type: tooltip_options_class_1.TooltipOptions, decorators: [{ type: core_1.Inject, args: [tooltip_options_class_1.TooltipOptions] }] }];
        return TooltipContainerComponent;
    }();
    exports.TooltipContainerComponent = TooltipContainerComponent;
    return module.exports;
});
$__System.registerDynamic("50", ["45"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("45");
    var TooltipOptions = function () {
        function TooltipOptions(options) {
            Object.assign(this, options);
        }
        TooltipOptions.decorators = [{ type: core_1.Injectable }];
        /** @nocollapse */
        TooltipOptions.ctorParameters = [{ type: Object }];
        return TooltipOptions;
    }();
    exports.TooltipOptions = TooltipOptions;
    return module.exports;
});
$__System.registerDynamic('3c', ['45', '3b', '50', '4b'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var tooltip_container_component_1 = $__require('3b');
    var tooltip_options_class_1 = $__require('50');
    var components_helper_service_1 = $__require('4b');
    /* tslint:disable */
    /* tslint:enable */
    var TooltipDirective = function () {
        function TooltipDirective(viewContainerRef, componentsHelper, changeDetectorRef) {
            this.placement = 'top';
            this.enable = true;
            this.animation = true;
            this.appendToBody = false;
            this.delay = 0;
            /* tslint:enable */
            this.tooltipStateChanged = new core_1.EventEmitter();
            this.visible = false;
            this.viewContainerRef = viewContainerRef;
            this.componentsHelper = componentsHelper;
            this.changeDetectorRef = changeDetectorRef;
        }
        // todo: filter triggers
        // params: event, target
        TooltipDirective.prototype.show = function () {
            var _this = this;
            if (this.visible || !this.enable || this.delayTimeoutId) {
                return;
            }
            var showTooltip = function () {
                _this.visible = true;
                var options = new tooltip_options_class_1.TooltipOptions({
                    content: _this.content,
                    htmlContent: _this.htmlContent,
                    placement: _this.placement,
                    animation: _this.animation,
                    appendToBody: _this.appendToBody,
                    hostEl: _this.viewContainerRef.element,
                    popupClass: _this.popupClass,
                    context: _this.tooltipContext
                });
                if (_this.appendToBody) {
                    _this.tooltip = _this.componentsHelper.appendNextToRoot(tooltip_container_component_1.TooltipContainerComponent, tooltip_options_class_1.TooltipOptions, options);
                } else {
                    var binding = core_1.ReflectiveInjector.resolve([{ provide: tooltip_options_class_1.TooltipOptions, useValue: options }]);
                    _this.tooltip = _this.componentsHelper.appendNextToLocation(tooltip_container_component_1.TooltipContainerComponent, _this.viewContainerRef, binding);
                }
                _this.changeDetectorRef.markForCheck();
                _this.triggerStateChanged();
            };
            if (this.delay) {
                this.delayTimeoutId = setTimeout(function () {
                    showTooltip();
                }, this.delay);
            } else {
                showTooltip();
            }
        };
        // params event, target
        TooltipDirective.prototype.hide = function () {
            if (this.delayTimeoutId) {
                clearTimeout(this.delayTimeoutId);
                this.delayTimeoutId = undefined;
            }
            if (!this.visible) {
                return;
            }
            this.visible = false;
            this.tooltip.destroy();
            this.triggerStateChanged();
        };
        TooltipDirective.prototype.triggerStateChanged = function () {
            this.tooltipStateChanged.emit(this.visible);
        };
        TooltipDirective.decorators = [{ type: core_1.Directive, args: [{
                selector: '[tooltip], [tooltipHtml]',
                exportAs: 'bs-tooltip'
            }] }];
        /** @nocollapse */
        TooltipDirective.ctorParameters = [{ type: core_1.ViewContainerRef }, { type: components_helper_service_1.ComponentsHelper }, { type: core_1.ChangeDetectorRef }];
        TooltipDirective.propDecorators = {
            'content': [{ type: core_1.Input, args: ['tooltip'] }],
            'htmlContent': [{ type: core_1.Input, args: ['tooltipHtml'] }],
            'placement': [{ type: core_1.Input, args: ['tooltipPlacement'] }],
            'isOpen': [{ type: core_1.Input, args: ['tooltipIsOpen'] }],
            'enable': [{ type: core_1.Input, args: ['tooltipEnable'] }],
            'animation': [{ type: core_1.Input, args: ['tooltipAnimation'] }],
            'appendToBody': [{ type: core_1.Input, args: ['tooltipAppendToBody'] }],
            'popupClass': [{ type: core_1.Input, args: ['tooltipClass'] }],
            'tooltipContext': [{ type: core_1.Input, args: ['tooltipContext'] }],
            'delay': [{ type: core_1.Input, args: ['tooltipPopupDelay'] }],
            'tooltipStateChanged': [{ type: core_1.Output }],
            'show': [{ type: core_1.HostListener, args: ['focusin'] }, { type: core_1.HostListener, args: ['mouseenter'] }],
            'hide': [{ type: core_1.HostListener, args: ['focusout'] }, { type: core_1.HostListener, args: ['mouseleave'] }]
        };
        return TooltipDirective;
    }();
    exports.TooltipDirective = TooltipDirective;
    return module.exports;
});
$__System.registerDynamic('3d', ['46', '45', '3b', '3c', '4b'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var tooltip_container_component_1 = $__require('3b');
    var tooltip_directive_1 = $__require('3c');
    var components_helper_service_1 = $__require('4b');
    var TooltipModule = function () {
        function TooltipModule() {}
        TooltipModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [tooltip_directive_1.TooltipDirective, tooltip_container_component_1.TooltipContainerComponent],
                exports: [tooltip_directive_1.TooltipDirective, tooltip_container_component_1.TooltipContainerComponent],
                providers: [components_helper_service_1.ComponentsHelper],
                entryComponents: [tooltip_container_component_1.TooltipContainerComponent]
            }] }];
        /** @nocollapse */
        TooltipModule.ctorParameters = [];
        return TooltipModule;
    }();
    exports.TooltipModule = TooltipModule;
    return module.exports;
});
$__System.registerDynamic('4d', [], true, function ($__require, exports, module) {
  /*tslint:disable */
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  "use strict";
  /**
   * JS version of browser APIs. This library can only run in the browser.
   */

  var define,
      global = this || self,
      GLOBAL = global;
  var win = typeof window !== 'undefined' && window || {};
  exports.window = win;
  exports.document = win.document;
  exports.location = win.location;
  exports.gc = win['gc'] ? function () {
    return win['gc']();
  } : function () {
    return null;
  };
  exports.performance = win['performance'] ? win['performance'] : null;
  exports.Event = win['Event'];
  exports.MouseEvent = win['MouseEvent'];
  exports.KeyboardEvent = win['KeyboardEvent'];
  exports.EventTarget = win['EventTarget'];
  exports.History = win['History'];
  exports.Location = win['Location'];
  exports.EventListener = win['EventListener'];
  return module.exports;
});
$__System.registerDynamic("48", ["4d"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var browser_1 = $__require("4d");
    (function (Ng2BootstrapTheme) {
        Ng2BootstrapTheme[Ng2BootstrapTheme["BS3"] = 1] = "BS3";
        Ng2BootstrapTheme[Ng2BootstrapTheme["BS4"] = 2] = "BS4";
    })(exports.Ng2BootstrapTheme || (exports.Ng2BootstrapTheme = {}));
    var Ng2BootstrapTheme = exports.Ng2BootstrapTheme;
    var Ng2BootstrapConfig = function () {
        function Ng2BootstrapConfig() {}
        Object.defineProperty(Ng2BootstrapConfig, "theme", {
            get: function () {
                // hack as for now
                if (browser_1.window.__theme === 'bs4') {
                    return Ng2BootstrapTheme.BS4;
                }
                return this._theme || Ng2BootstrapTheme.BS3;
            },
            set: function (v) {
                this._theme = v;
            },
            enumerable: true,
            configurable: true
        });
        return Ng2BootstrapConfig;
    }();
    exports.Ng2BootstrapConfig = Ng2BootstrapConfig;
    return module.exports;
});
$__System.registerDynamic('4f', [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var PositionService = function () {
        function PositionService() {}
        /**
         * Provides read-only equivalent of jQuery's position function:
         * http://api.jquery.com/position/
         */
        PositionService.prototype.position = function (nativeEl) {
            var elBCR = this.offset(nativeEl);
            var offsetParentBCR = { top: 0, left: 0 };
            var offsetParentEl = this.parentOffsetEl(nativeEl);
            if (offsetParentEl !== this.document) {
                offsetParentBCR = this.offset(offsetParentEl);
                offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
            }
            var boundingClientRect = nativeEl.getBoundingClientRect();
            return {
                width: boundingClientRect.width || nativeEl.offsetWidth,
                height: boundingClientRect.height || nativeEl.offsetHeight,
                top: elBCR.top - offsetParentBCR.top,
                left: elBCR.left - offsetParentBCR.left
            };
        };
        /**
         * Provides read-only equivalent of jQuery's offset function:
         * http://api.jquery.com/offset/
         */
        PositionService.prototype.offset = function (nativeEl) {
            var boundingClientRect = nativeEl.getBoundingClientRect();
            return {
                width: boundingClientRect.width || nativeEl.offsetWidth,
                height: boundingClientRect.height || nativeEl.offsetHeight,
                top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
                left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
            };
        };
        /**
         * Provides coordinates for the targetEl in relation to hostEl
         */
        PositionService.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
            var positionStrParts = positionStr.split('-');
            var pos0 = positionStrParts[0];
            var pos1 = positionStrParts[1] || 'center';
            var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
            var targetElWidth = targetEl.offsetWidth;
            var targetElHeight = targetEl.offsetHeight;
            var shiftWidth = {
                center: function () {
                    return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
                },
                left: function () {
                    return hostElPos.left;
                },
                right: function () {
                    return hostElPos.left + hostElPos.width;
                }
            };
            var shiftHeight = {
                center: function () {
                    return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
                },
                top: function () {
                    return hostElPos.top;
                },
                bottom: function () {
                    return hostElPos.top + hostElPos.height;
                }
            };
            var targetElPos;
            switch (pos0) {
                case 'right':
                    targetElPos = {
                        top: shiftHeight[pos1](),
                        left: shiftWidth[pos0]()
                    };
                    break;
                case 'left':
                    targetElPos = {
                        top: shiftHeight[pos1](),
                        left: hostElPos.left - targetElWidth
                    };
                    break;
                case 'bottom':
                    targetElPos = {
                        top: shiftHeight[pos0](),
                        left: shiftWidth[pos1]()
                    };
                    break;
                default:
                    targetElPos = {
                        top: hostElPos.top - targetElHeight,
                        left: shiftWidth[pos1]()
                    };
                    break;
            }
            return targetElPos;
        };
        Object.defineProperty(PositionService.prototype, "window", {
            get: function () {
                return window;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PositionService.prototype, "document", {
            get: function () {
                return window.document;
            },
            enumerable: true,
            configurable: true
        });
        PositionService.prototype.getStyle = function (nativeEl, cssProp) {
            // IE
            if (nativeEl.currentStyle) {
                return nativeEl.currentStyle[cssProp];
            }
            if (this.window.getComputedStyle) {
                return this.window.getComputedStyle(nativeEl)[cssProp];
            }
            // finally try and get inline style
            return nativeEl.style[cssProp];
        };
        /**
         * Checks if a given element is statically positioned
         * @param nativeEl - raw DOM element
         */
        PositionService.prototype.isStaticPositioned = function (nativeEl) {
            return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
        };
        /**
         * returns the closest, non-statically positioned parentOffset of a given
         * element
         * @param nativeEl
         */
        PositionService.prototype.parentOffsetEl = function (nativeEl) {
            var offsetParent = nativeEl.offsetParent || this.document;
            while (offsetParent && offsetParent !== this.document && this.isStaticPositioned(offsetParent)) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || this.document;
        };
        ;
        return PositionService;
    }();
    exports.PositionService = PositionService;
    exports.positionService = new PositionService();
    return module.exports;
});
$__System.registerDynamic('42', ['45', '48', '4f', '40', '41'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var ng2_bootstrap_config_1 = $__require('48');
    var position_1 = $__require('4f');
    var typeahead_options_class_1 = $__require('40');
    var typeahead_utils_1 = $__require('41');
    var bs4 = "\n  <div class=\"dropdown-menu\"\n       [ngStyle]=\"{top: top, left: left, display: 'block'}\"\n       (mouseleave)=\"focusLost()\">\n    <template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n       <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{match}}</h6>\n       <div *ngIf=\"!match.isHeader() && !itemTemplate\">\n          <a href=\"#\"\n            class=\"dropdown-item\"\n            (click)=\"selectMatch(match, $event)\"\n            (mouseenter)=\"selectActive(match)\"\n            [class.active]=\"isActive(match)\"\n            [innerHtml]=\"hightlight(match, query)\"></a>\n      </div>\n      <div *ngIf=\"!match.isHeader() && itemTemplate\">\n        <a href=\"#\"\n         class=\"dropdown-item\"\n         (click)=\"selectMatch(match, $event)\"\n         (mouseenter)=\"selectActive(match)\"\n         [class.active]=\"isActive(match)\">\n          <template [ngTemplateOutlet]=\"itemTemplate\"\n                    [ngOutletContext]=\"{item: match.item, index: i}\">\n          </template>\n         </a>\n      </div>\n    </template>\n  </div>\n";
    var bs3 = "\n  <ul class=\"dropdown-menu\"\n      [ngStyle]=\"{top: top, left: left, display: 'block'}\"\n      (mouseleave)=\"focusLost()\">\n    <template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n      <li *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{match}}</li>\n      <li *ngIf=\"!match.isHeader()\"\n        [class.active]=\"isActive(match)\"\n        (mouseenter)=\"selectActive(match)\">\n        <a href=\"#\"\n           *ngIf=\"!itemTemplate\"\n           (click)=\"selectMatch(match, $event)\"\n           tabindex=\"-1\"\n           [innerHtml]=\"hightlight(match, query)\"></a>\n        <a href=\"#\"\n           *ngIf=\"itemTemplate\"\n           (click)=\"selectMatch(match, $event)\"\n           tabindex=\"-1\">\n            <template [ngTemplateOutlet]=\"itemTemplate\"\n                      [ngOutletContext]=\"{item: match.item, index: i}\">\n            </template>\n        </a>\n      </li>\n    </template>\n  </ul>\n";
    var isBS4 = ng2_bootstrap_config_1.Ng2BootstrapConfig.theme === ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4;
    var TypeaheadContainerComponent = function () {
        function TypeaheadContainerComponent(element, options) {
            this.isFocused = false;
            this._matches = [];
            this.element = element;
            Object.assign(this, options);
        }
        Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
            get: function () {
                return this._matches;
            },
            set: function (value) {
                this._matches = value;
                if (this._matches.length > 0) {
                    this._active = this._matches[0];
                    if (this._active.isHeader()) {
                        this.nextActiveMatch();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadContainerComponent.prototype, "itemTemplate", {
            get: function () {
                return this.parent ? this.parent.typeaheadItemTemplate : undefined;
            },
            enumerable: true,
            configurable: true
        });
        TypeaheadContainerComponent.prototype.position = function (hostEl) {
            this.top = '0px';
            this.left = '0px';
            var p = position_1.positionService.positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
            this.top = p.top + 'px';
            this.left = p.left + 'px';
        };
        TypeaheadContainerComponent.prototype.selectActiveMatch = function () {
            this.selectMatch(this._active);
        };
        TypeaheadContainerComponent.prototype.prevActiveMatch = function () {
            var index = this.matches.indexOf(this._active);
            this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
            if (this._active.isHeader()) {
                this.prevActiveMatch();
            }
        };
        TypeaheadContainerComponent.prototype.nextActiveMatch = function () {
            var index = this.matches.indexOf(this._active);
            this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
            if (this._active.isHeader()) {
                this.nextActiveMatch();
            }
        };
        TypeaheadContainerComponent.prototype.selectActive = function (value) {
            this.isFocused = true;
            this._active = value;
        };
        TypeaheadContainerComponent.prototype.hightlight = function (match, query) {
            var itemStr = match.value;
            var itemStrHelper = (this.parent && this.parent.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(itemStr) : itemStr).toLowerCase();
            var startIdx;
            var tokenLen;
            // Replaces the capture string with the same string inside of a "strong" tag
            if (typeof query === 'object') {
                var queryLen = query.length;
                for (var i = 0; i < queryLen; i += 1) {
                    // query[i] is already latinized and lower case
                    startIdx = itemStrHelper.indexOf(query[i]);
                    tokenLen = query[i].length;
                    if (startIdx >= 0 && tokenLen > 0) {
                        itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                        itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
                    }
                }
            } else if (query) {
                // query is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query);
                tokenLen = query.length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                }
            }
            return itemStr;
        };
        TypeaheadContainerComponent.prototype.focusLost = function () {
            this.isFocused = false;
        };
        TypeaheadContainerComponent.prototype.isActive = function (value) {
            return this._active === value;
        };
        TypeaheadContainerComponent.prototype.selectMatch = function (value, e) {
            var _this = this;
            if (e === void 0) {
                e = void 0;
            }
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            this.parent.changeModel(value);
            setTimeout(function () {
                return _this.parent.typeaheadOnSelect.emit(value);
            }, 0);
            return false;
        };
        TypeaheadContainerComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'typeahead-container',
                template: isBS4 ? bs4 : bs3,
                encapsulation: core_1.ViewEncapsulation.None
            }] }];
        /** @nocollapse */
        TypeaheadContainerComponent.ctorParameters = [{ type: core_1.ElementRef }, { type: typeahead_options_class_1.TypeaheadOptions }];
        return TypeaheadContainerComponent;
    }();
    exports.TypeaheadContainerComponent = TypeaheadContainerComponent;
    return module.exports;
});
$__System.registerDynamic("40", [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var TypeaheadOptions = function () {
        function TypeaheadOptions(options) {
            Object.assign(this, options);
        }
        return TypeaheadOptions;
    }();
    exports.TypeaheadOptions = TypeaheadOptions;
    return module.exports;
});
$__System.registerDynamic('51', [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    exports.latinMap = {
        'Á': 'A',
        'Ă': 'A',
        'Ắ': 'A',
        'Ặ': 'A',
        'Ằ': 'A',
        'Ẳ': 'A',
        'Ẵ': 'A',
        'Ǎ': 'A',
        'Â': 'A',
        'Ấ': 'A',
        'Ậ': 'A',
        'Ầ': 'A',
        'Ẩ': 'A',
        'Ẫ': 'A',
        'Ä': 'A',
        'Ǟ': 'A',
        'Ȧ': 'A',
        'Ǡ': 'A',
        'Ạ': 'A',
        'Ȁ': 'A',
        'À': 'A',
        'Ả': 'A',
        'Ȃ': 'A',
        'Ā': 'A',
        'Ą': 'A',
        'Å': 'A',
        'Ǻ': 'A',
        'Ḁ': 'A',
        'Ⱥ': 'A',
        'Ã': 'A',
        'Ꜳ': 'AA',
        'Æ': 'AE',
        'Ǽ': 'AE',
        'Ǣ': 'AE',
        'Ꜵ': 'AO',
        'Ꜷ': 'AU',
        'Ꜹ': 'AV',
        'Ꜻ': 'AV',
        'Ꜽ': 'AY',
        'Ḃ': 'B',
        'Ḅ': 'B',
        'Ɓ': 'B',
        'Ḇ': 'B',
        'Ƀ': 'B',
        'Ƃ': 'B',
        'Ć': 'C',
        'Č': 'C',
        'Ç': 'C',
        'Ḉ': 'C',
        'Ĉ': 'C',
        'Ċ': 'C',
        'Ƈ': 'C',
        'Ȼ': 'C',
        'Ď': 'D',
        'Ḑ': 'D',
        'Ḓ': 'D',
        'Ḋ': 'D',
        'Ḍ': 'D',
        'Ɗ': 'D',
        'Ḏ': 'D',
        'ǲ': 'D',
        'ǅ': 'D',
        'Đ': 'D',
        'Ƌ': 'D',
        'Ǳ': 'DZ',
        'Ǆ': 'DZ',
        'É': 'E',
        'Ĕ': 'E',
        'Ě': 'E',
        'Ȩ': 'E',
        'Ḝ': 'E',
        'Ê': 'E',
        'Ế': 'E',
        'Ệ': 'E',
        'Ề': 'E',
        'Ể': 'E',
        'Ễ': 'E',
        'Ḙ': 'E',
        'Ë': 'E',
        'Ė': 'E',
        'Ẹ': 'E',
        'Ȅ': 'E',
        'È': 'E',
        'Ẻ': 'E',
        'Ȇ': 'E',
        'Ē': 'E',
        'Ḗ': 'E',
        'Ḕ': 'E',
        'Ę': 'E',
        'Ɇ': 'E',
        'Ẽ': 'E',
        'Ḛ': 'E',
        'Ꝫ': 'ET',
        'Ḟ': 'F',
        'Ƒ': 'F',
        'Ǵ': 'G',
        'Ğ': 'G',
        'Ǧ': 'G',
        'Ģ': 'G',
        'Ĝ': 'G',
        'Ġ': 'G',
        'Ɠ': 'G',
        'Ḡ': 'G',
        'Ǥ': 'G',
        'Ḫ': 'H',
        'Ȟ': 'H',
        'Ḩ': 'H',
        'Ĥ': 'H',
        'Ⱨ': 'H',
        'Ḧ': 'H',
        'Ḣ': 'H',
        'Ḥ': 'H',
        'Ħ': 'H',
        'Í': 'I',
        'Ĭ': 'I',
        'Ǐ': 'I',
        'Î': 'I',
        'Ï': 'I',
        'Ḯ': 'I',
        'İ': 'I',
        'Ị': 'I',
        'Ȉ': 'I',
        'Ì': 'I',
        'Ỉ': 'I',
        'Ȋ': 'I',
        'Ī': 'I',
        'Į': 'I',
        'Ɨ': 'I',
        'Ĩ': 'I',
        'Ḭ': 'I',
        'Ꝺ': 'D',
        'Ꝼ': 'F',
        'Ᵹ': 'G',
        'Ꞃ': 'R',
        'Ꞅ': 'S',
        'Ꞇ': 'T',
        'Ꝭ': 'IS',
        'Ĵ': 'J',
        'Ɉ': 'J',
        'Ḱ': 'K',
        'Ǩ': 'K',
        'Ķ': 'K',
        'Ⱪ': 'K',
        'Ꝃ': 'K',
        'Ḳ': 'K',
        'Ƙ': 'K',
        'Ḵ': 'K',
        'Ꝁ': 'K',
        'Ꝅ': 'K',
        'Ĺ': 'L',
        'Ƚ': 'L',
        'Ľ': 'L',
        'Ļ': 'L',
        'Ḽ': 'L',
        'Ḷ': 'L',
        'Ḹ': 'L',
        'Ⱡ': 'L',
        'Ꝉ': 'L',
        'Ḻ': 'L',
        'Ŀ': 'L',
        'Ɫ': 'L',
        'ǈ': 'L',
        'Ł': 'L',
        'Ǉ': 'LJ',
        'Ḿ': 'M',
        'Ṁ': 'M',
        'Ṃ': 'M',
        'Ɱ': 'M',
        'Ń': 'N',
        'Ň': 'N',
        'Ņ': 'N',
        'Ṋ': 'N',
        'Ṅ': 'N',
        'Ṇ': 'N',
        'Ǹ': 'N',
        'Ɲ': 'N',
        'Ṉ': 'N',
        'Ƞ': 'N',
        'ǋ': 'N',
        'Ñ': 'N',
        'Ǌ': 'NJ',
        'Ó': 'O',
        'Ŏ': 'O',
        'Ǒ': 'O',
        'Ô': 'O',
        'Ố': 'O',
        'Ộ': 'O',
        'Ồ': 'O',
        'Ổ': 'O',
        'Ỗ': 'O',
        'Ö': 'O',
        'Ȫ': 'O',
        'Ȯ': 'O',
        'Ȱ': 'O',
        'Ọ': 'O',
        'Ő': 'O',
        'Ȍ': 'O',
        'Ò': 'O',
        'Ỏ': 'O',
        'Ơ': 'O',
        'Ớ': 'O',
        'Ợ': 'O',
        'Ờ': 'O',
        'Ở': 'O',
        'Ỡ': 'O',
        'Ȏ': 'O',
        'Ꝋ': 'O',
        'Ꝍ': 'O',
        'Ō': 'O',
        'Ṓ': 'O',
        'Ṑ': 'O',
        'Ɵ': 'O',
        'Ǫ': 'O',
        'Ǭ': 'O',
        'Ø': 'O',
        'Ǿ': 'O',
        'Õ': 'O',
        'Ṍ': 'O',
        'Ṏ': 'O',
        'Ȭ': 'O',
        'Ƣ': 'OI',
        'Ꝏ': 'OO',
        'Ɛ': 'E',
        'Ɔ': 'O',
        'Ȣ': 'OU',
        'Ṕ': 'P',
        'Ṗ': 'P',
        'Ꝓ': 'P',
        'Ƥ': 'P',
        'Ꝕ': 'P',
        'Ᵽ': 'P',
        'Ꝑ': 'P',
        'Ꝙ': 'Q',
        'Ꝗ': 'Q',
        'Ŕ': 'R',
        'Ř': 'R',
        'Ŗ': 'R',
        'Ṙ': 'R',
        'Ṛ': 'R',
        'Ṝ': 'R',
        'Ȑ': 'R',
        'Ȓ': 'R',
        'Ṟ': 'R',
        'Ɍ': 'R',
        'Ɽ': 'R',
        'Ꜿ': 'C',
        'Ǝ': 'E',
        'Ś': 'S',
        'Ṥ': 'S',
        'Š': 'S',
        'Ṧ': 'S',
        'Ş': 'S',
        'Ŝ': 'S',
        'Ș': 'S',
        'Ṡ': 'S',
        'Ṣ': 'S',
        'Ṩ': 'S',
        'Ť': 'T',
        'Ţ': 'T',
        'Ṱ': 'T',
        'Ț': 'T',
        'Ⱦ': 'T',
        'Ṫ': 'T',
        'Ṭ': 'T',
        'Ƭ': 'T',
        'Ṯ': 'T',
        'Ʈ': 'T',
        'Ŧ': 'T',
        'Ɐ': 'A',
        'Ꞁ': 'L',
        'Ɯ': 'M',
        'Ʌ': 'V',
        'Ꜩ': 'TZ',
        'Ú': 'U',
        'Ŭ': 'U',
        'Ǔ': 'U',
        'Û': 'U',
        'Ṷ': 'U',
        'Ü': 'U',
        'Ǘ': 'U',
        'Ǚ': 'U',
        'Ǜ': 'U',
        'Ǖ': 'U',
        'Ṳ': 'U',
        'Ụ': 'U',
        'Ű': 'U',
        'Ȕ': 'U',
        'Ù': 'U',
        'Ủ': 'U',
        'Ư': 'U',
        'Ứ': 'U',
        'Ự': 'U',
        'Ừ': 'U',
        'Ử': 'U',
        'Ữ': 'U',
        'Ȗ': 'U',
        'Ū': 'U',
        'Ṻ': 'U',
        'Ų': 'U',
        'Ů': 'U',
        'Ũ': 'U',
        'Ṹ': 'U',
        'Ṵ': 'U',
        'Ꝟ': 'V',
        'Ṿ': 'V',
        'Ʋ': 'V',
        'Ṽ': 'V',
        'Ꝡ': 'VY',
        'Ẃ': 'W',
        'Ŵ': 'W',
        'Ẅ': 'W',
        'Ẇ': 'W',
        'Ẉ': 'W',
        'Ẁ': 'W',
        'Ⱳ': 'W',
        'Ẍ': 'X',
        'Ẋ': 'X',
        'Ý': 'Y',
        'Ŷ': 'Y',
        'Ÿ': 'Y',
        'Ẏ': 'Y',
        'Ỵ': 'Y',
        'Ỳ': 'Y',
        'Ƴ': 'Y',
        'Ỷ': 'Y',
        'Ỿ': 'Y',
        'Ȳ': 'Y',
        'Ɏ': 'Y',
        'Ỹ': 'Y',
        'Ź': 'Z',
        'Ž': 'Z',
        'Ẑ': 'Z',
        'Ⱬ': 'Z',
        'Ż': 'Z',
        'Ẓ': 'Z',
        'Ȥ': 'Z',
        'Ẕ': 'Z',
        'Ƶ': 'Z',
        'Ĳ': 'IJ',
        'Œ': 'OE',
        'ᴀ': 'A',
        'ᴁ': 'AE',
        'ʙ': 'B',
        'ᴃ': 'B',
        'ᴄ': 'C',
        'ᴅ': 'D',
        'ᴇ': 'E',
        'ꜰ': 'F',
        'ɢ': 'G',
        'ʛ': 'G',
        'ʜ': 'H',
        'ɪ': 'I',
        'ʁ': 'R',
        'ᴊ': 'J',
        'ᴋ': 'K',
        'ʟ': 'L',
        'ᴌ': 'L',
        'ᴍ': 'M',
        'ɴ': 'N',
        'ᴏ': 'O',
        'ɶ': 'OE',
        'ᴐ': 'O',
        'ᴕ': 'OU',
        'ᴘ': 'P',
        'ʀ': 'R',
        'ᴎ': 'N',
        'ᴙ': 'R',
        'ꜱ': 'S',
        'ᴛ': 'T',
        'ⱻ': 'E',
        'ᴚ': 'R',
        'ᴜ': 'U',
        'ᴠ': 'V',
        'ᴡ': 'W',
        'ʏ': 'Y',
        'ᴢ': 'Z',
        'á': 'a',
        'ă': 'a',
        'ắ': 'a',
        'ặ': 'a',
        'ằ': 'a',
        'ẳ': 'a',
        'ẵ': 'a',
        'ǎ': 'a',
        'â': 'a',
        'ấ': 'a',
        'ậ': 'a',
        'ầ': 'a',
        'ẩ': 'a',
        'ẫ': 'a',
        'ä': 'a',
        'ǟ': 'a',
        'ȧ': 'a',
        'ǡ': 'a',
        'ạ': 'a',
        'ȁ': 'a',
        'à': 'a',
        'ả': 'a',
        'ȃ': 'a',
        'ā': 'a',
        'ą': 'a',
        'ᶏ': 'a',
        'ẚ': 'a',
        'å': 'a',
        'ǻ': 'a',
        'ḁ': 'a',
        'ⱥ': 'a',
        'ã': 'a',
        'ꜳ': 'aa',
        'æ': 'ae',
        'ǽ': 'ae',
        'ǣ': 'ae',
        'ꜵ': 'ao',
        'ꜷ': 'au',
        'ꜹ': 'av',
        'ꜻ': 'av',
        'ꜽ': 'ay',
        'ḃ': 'b',
        'ḅ': 'b',
        'ɓ': 'b',
        'ḇ': 'b',
        'ᵬ': 'b',
        'ᶀ': 'b',
        'ƀ': 'b',
        'ƃ': 'b',
        'ɵ': 'o',
        'ć': 'c',
        'č': 'c',
        'ç': 'c',
        'ḉ': 'c',
        'ĉ': 'c',
        'ɕ': 'c',
        'ċ': 'c',
        'ƈ': 'c',
        'ȼ': 'c',
        'ď': 'd',
        'ḑ': 'd',
        'ḓ': 'd',
        'ȡ': 'd',
        'ḋ': 'd',
        'ḍ': 'd',
        'ɗ': 'd',
        'ᶑ': 'd',
        'ḏ': 'd',
        'ᵭ': 'd',
        'ᶁ': 'd',
        'đ': 'd',
        'ɖ': 'd',
        'ƌ': 'd',
        'ı': 'i',
        'ȷ': 'j',
        'ɟ': 'j',
        'ʄ': 'j',
        'ǳ': 'dz',
        'ǆ': 'dz',
        'é': 'e',
        'ĕ': 'e',
        'ě': 'e',
        'ȩ': 'e',
        'ḝ': 'e',
        'ê': 'e',
        'ế': 'e',
        'ệ': 'e',
        'ề': 'e',
        'ể': 'e',
        'ễ': 'e',
        'ḙ': 'e',
        'ë': 'e',
        'ė': 'e',
        'ẹ': 'e',
        'ȅ': 'e',
        'è': 'e',
        'ẻ': 'e',
        'ȇ': 'e',
        'ē': 'e',
        'ḗ': 'e',
        'ḕ': 'e',
        'ⱸ': 'e',
        'ę': 'e',
        'ᶒ': 'e',
        'ɇ': 'e',
        'ẽ': 'e',
        'ḛ': 'e',
        'ꝫ': 'et',
        'ḟ': 'f',
        'ƒ': 'f',
        'ᵮ': 'f',
        'ᶂ': 'f',
        'ǵ': 'g',
        'ğ': 'g',
        'ǧ': 'g',
        'ģ': 'g',
        'ĝ': 'g',
        'ġ': 'g',
        'ɠ': 'g',
        'ḡ': 'g',
        'ᶃ': 'g',
        'ǥ': 'g',
        'ḫ': 'h',
        'ȟ': 'h',
        'ḩ': 'h',
        'ĥ': 'h',
        'ⱨ': 'h',
        'ḧ': 'h',
        'ḣ': 'h',
        'ḥ': 'h',
        'ɦ': 'h',
        'ẖ': 'h',
        'ħ': 'h',
        'ƕ': 'hv',
        'í': 'i',
        'ĭ': 'i',
        'ǐ': 'i',
        'î': 'i',
        'ï': 'i',
        'ḯ': 'i',
        'ị': 'i',
        'ȉ': 'i',
        'ì': 'i',
        'ỉ': 'i',
        'ȋ': 'i',
        'ī': 'i',
        'į': 'i',
        'ᶖ': 'i',
        'ɨ': 'i',
        'ĩ': 'i',
        'ḭ': 'i',
        'ꝺ': 'd',
        'ꝼ': 'f',
        'ᵹ': 'g',
        'ꞃ': 'r',
        'ꞅ': 's',
        'ꞇ': 't',
        'ꝭ': 'is',
        'ǰ': 'j',
        'ĵ': 'j',
        'ʝ': 'j',
        'ɉ': 'j',
        'ḱ': 'k',
        'ǩ': 'k',
        'ķ': 'k',
        'ⱪ': 'k',
        'ꝃ': 'k',
        'ḳ': 'k',
        'ƙ': 'k',
        'ḵ': 'k',
        'ᶄ': 'k',
        'ꝁ': 'k',
        'ꝅ': 'k',
        'ĺ': 'l',
        'ƚ': 'l',
        'ɬ': 'l',
        'ľ': 'l',
        'ļ': 'l',
        'ḽ': 'l',
        'ȴ': 'l',
        'ḷ': 'l',
        'ḹ': 'l',
        'ⱡ': 'l',
        'ꝉ': 'l',
        'ḻ': 'l',
        'ŀ': 'l',
        'ɫ': 'l',
        'ᶅ': 'l',
        'ɭ': 'l',
        'ł': 'l',
        'ǉ': 'lj',
        'ſ': 's',
        'ẜ': 's',
        'ẛ': 's',
        'ẝ': 's',
        'ḿ': 'm',
        'ṁ': 'm',
        'ṃ': 'm',
        'ɱ': 'm',
        'ᵯ': 'm',
        'ᶆ': 'm',
        'ń': 'n',
        'ň': 'n',
        'ņ': 'n',
        'ṋ': 'n',
        'ȵ': 'n',
        'ṅ': 'n',
        'ṇ': 'n',
        'ǹ': 'n',
        'ɲ': 'n',
        'ṉ': 'n',
        'ƞ': 'n',
        'ᵰ': 'n',
        'ᶇ': 'n',
        'ɳ': 'n',
        'ñ': 'n',
        'ǌ': 'nj',
        'ó': 'o',
        'ŏ': 'o',
        'ǒ': 'o',
        'ô': 'o',
        'ố': 'o',
        'ộ': 'o',
        'ồ': 'o',
        'ổ': 'o',
        'ỗ': 'o',
        'ö': 'o',
        'ȫ': 'o',
        'ȯ': 'o',
        'ȱ': 'o',
        'ọ': 'o',
        'ő': 'o',
        'ȍ': 'o',
        'ò': 'o',
        'ỏ': 'o',
        'ơ': 'o',
        'ớ': 'o',
        'ợ': 'o',
        'ờ': 'o',
        'ở': 'o',
        'ỡ': 'o',
        'ȏ': 'o',
        'ꝋ': 'o',
        'ꝍ': 'o',
        'ⱺ': 'o',
        'ō': 'o',
        'ṓ': 'o',
        'ṑ': 'o',
        'ǫ': 'o',
        'ǭ': 'o',
        'ø': 'o',
        'ǿ': 'o',
        'õ': 'o',
        'ṍ': 'o',
        'ṏ': 'o',
        'ȭ': 'o',
        'ƣ': 'oi',
        'ꝏ': 'oo',
        'ɛ': 'e',
        'ᶓ': 'e',
        'ɔ': 'o',
        'ᶗ': 'o',
        'ȣ': 'ou',
        'ṕ': 'p',
        'ṗ': 'p',
        'ꝓ': 'p',
        'ƥ': 'p',
        'ᵱ': 'p',
        'ᶈ': 'p',
        'ꝕ': 'p',
        'ᵽ': 'p',
        'ꝑ': 'p',
        'ꝙ': 'q',
        'ʠ': 'q',
        'ɋ': 'q',
        'ꝗ': 'q',
        'ŕ': 'r',
        'ř': 'r',
        'ŗ': 'r',
        'ṙ': 'r',
        'ṛ': 'r',
        'ṝ': 'r',
        'ȑ': 'r',
        'ɾ': 'r',
        'ᵳ': 'r',
        'ȓ': 'r',
        'ṟ': 'r',
        'ɼ': 'r',
        'ᵲ': 'r',
        'ᶉ': 'r',
        'ɍ': 'r',
        'ɽ': 'r',
        'ↄ': 'c',
        'ꜿ': 'c',
        'ɘ': 'e',
        'ɿ': 'r',
        'ś': 's',
        'ṥ': 's',
        'š': 's',
        'ṧ': 's',
        'ş': 's',
        'ŝ': 's',
        'ș': 's',
        'ṡ': 's',
        'ṣ': 's',
        'ṩ': 's',
        'ʂ': 's',
        'ᵴ': 's',
        'ᶊ': 's',
        'ȿ': 's',
        'ɡ': 'g',
        'ᴑ': 'o',
        'ᴓ': 'o',
        'ᴝ': 'u',
        'ť': 't',
        'ţ': 't',
        'ṱ': 't',
        'ț': 't',
        'ȶ': 't',
        'ẗ': 't',
        'ⱦ': 't',
        'ṫ': 't',
        'ṭ': 't',
        'ƭ': 't',
        'ṯ': 't',
        'ᵵ': 't',
        'ƫ': 't',
        'ʈ': 't',
        'ŧ': 't',
        'ᵺ': 'th',
        'ɐ': 'a',
        'ᴂ': 'ae',
        'ǝ': 'e',
        'ᵷ': 'g',
        'ɥ': 'h',
        'ʮ': 'h',
        'ʯ': 'h',
        'ᴉ': 'i',
        'ʞ': 'k',
        'ꞁ': 'l',
        'ɯ': 'm',
        'ɰ': 'm',
        'ᴔ': 'oe',
        'ɹ': 'r',
        'ɻ': 'r',
        'ɺ': 'r',
        'ⱹ': 'r',
        'ʇ': 't',
        'ʌ': 'v',
        'ʍ': 'w',
        'ʎ': 'y',
        'ꜩ': 'tz',
        'ú': 'u',
        'ŭ': 'u',
        'ǔ': 'u',
        'û': 'u',
        'ṷ': 'u',
        'ü': 'u',
        'ǘ': 'u',
        'ǚ': 'u',
        'ǜ': 'u',
        'ǖ': 'u',
        'ṳ': 'u',
        'ụ': 'u',
        'ű': 'u',
        'ȕ': 'u',
        'ù': 'u',
        'ủ': 'u',
        'ư': 'u',
        'ứ': 'u',
        'ự': 'u',
        'ừ': 'u',
        'ử': 'u',
        'ữ': 'u',
        'ȗ': 'u',
        'ū': 'u',
        'ṻ': 'u',
        'ų': 'u',
        'ᶙ': 'u',
        'ů': 'u',
        'ũ': 'u',
        'ṹ': 'u',
        'ṵ': 'u',
        'ᵫ': 'ue',
        'ꝸ': 'um',
        'ⱴ': 'v',
        'ꝟ': 'v',
        'ṿ': 'v',
        'ʋ': 'v',
        'ᶌ': 'v',
        'ⱱ': 'v',
        'ṽ': 'v',
        'ꝡ': 'vy',
        'ẃ': 'w',
        'ŵ': 'w',
        'ẅ': 'w',
        'ẇ': 'w',
        'ẉ': 'w',
        'ẁ': 'w',
        'ⱳ': 'w',
        'ẘ': 'w',
        'ẍ': 'x',
        'ẋ': 'x',
        'ᶍ': 'x',
        'ý': 'y',
        'ŷ': 'y',
        'ÿ': 'y',
        'ẏ': 'y',
        'ỵ': 'y',
        'ỳ': 'y',
        'ƴ': 'y',
        'ỷ': 'y',
        'ỿ': 'y',
        'ȳ': 'y',
        'ẙ': 'y',
        'ɏ': 'y',
        'ỹ': 'y',
        'ź': 'z',
        'ž': 'z',
        'ẑ': 'z',
        'ʑ': 'z',
        'ⱬ': 'z',
        'ż': 'z',
        'ẓ': 'z',
        'ȥ': 'z',
        'ẕ': 'z',
        'ᵶ': 'z',
        'ᶎ': 'z',
        'ʐ': 'z',
        'ƶ': 'z',
        'ɀ': 'z',
        'ﬀ': 'ff',
        'ﬃ': 'ffi',
        'ﬄ': 'ffl',
        'ﬁ': 'fi',
        'ﬂ': 'fl',
        'ĳ': 'ij',
        'œ': 'oe',
        'ﬆ': 'st',
        'ₐ': 'a',
        'ₑ': 'e',
        'ᵢ': 'i',
        'ⱼ': 'j',
        'ₒ': 'o',
        'ᵣ': 'r',
        'ᵤ': 'u',
        'ᵥ': 'v',
        'ₓ': 'x'
    };
    return module.exports;
});
$__System.registerDynamic('41', ['51'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var latin_map_1 = $__require('51');
    var TypeaheadUtils = function () {
        function TypeaheadUtils() {}
        TypeaheadUtils.latinize = function (str) {
            if (!str) {
                return '';
            }
            return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
                return TypeaheadUtils.latinMap[a] || a;
            });
        };
        TypeaheadUtils.escapeRegexp = function (queryToEscape) {
            // Regex: capture the whole query string and replace it with the string
            // that will be used to match the results, for example if the capture is
            // 'a' the result will be \a
            return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        };
        /* tslint:disable */
        TypeaheadUtils.tokenize = function (str, wordRegexDelimiters, phraseRegexDelimiters) {
            if (wordRegexDelimiters === void 0) {
                wordRegexDelimiters = ' ';
            }
            if (phraseRegexDelimiters === void 0) {
                phraseRegexDelimiters = '';
            }
            /* tslint:enable */
            var regexStr = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
            var preTokenized = str.split(new RegExp(regexStr, 'g'));
            var result = [];
            var preTokenizedLength = preTokenized.length;
            var token;
            var replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');
            for (var i = 0; i < preTokenizedLength; i += 1) {
                token = preTokenized[i];
                if (token && token.length && token !== wordRegexDelimiters) {
                    result.push(token.replace(replacePhraseDelimiters, ''));
                }
            }
            return result;
        };
        TypeaheadUtils.getValueFromObject = function (object, option) {
            if (!option || typeof object !== 'object') {
                return object.toString();
            }
            if (option.endsWith('()')) {
                var functionName = option.slice(0, option.length - 2);
                return object[functionName]().toString();
            }
            var properties = option.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
            var propertiesArray = properties.split('.');
            for (var _i = 0, propertiesArray_1 = propertiesArray; _i < propertiesArray_1.length; _i++) {
                var property = propertiesArray_1[_i];
                if (property in object) {
                    object = object[property];
                }
            }
            return object.toString();
        };
        TypeaheadUtils.latinMap = latin_map_1.latinMap;
        return TypeaheadUtils;
    }();
    exports.TypeaheadUtils = TypeaheadUtils;
    return module.exports;
});
$__System.registerDynamic("3f", [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var TypeaheadMatch = function () {
        function TypeaheadMatch(item, value, header) {
            if (value === void 0) {
                value = item;
            }
            if (header === void 0) {
                header = false;
            }
            this.item = item;
            this.value = value;
            this.header = header;
        }
        TypeaheadMatch.prototype.isHeader = function () {
            return this.header;
        };
        TypeaheadMatch.prototype.toString = function () {
            return this.value;
        };
        return TypeaheadMatch;
    }();
    exports.TypeaheadMatch = TypeaheadMatch;
    return module.exports;
});
$__System.registerDynamic('43', ['45', '47', '42', '40', '41', '52', '53', '54', '55', '56', '57', '58', '4b', '3f'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var typeahead_container_component_1 = $__require('42');
    var typeahead_options_class_1 = $__require('40');
    var typeahead_utils_1 = $__require('41');
    var Observable_1 = $__require('52');
    $__require('53');
    $__require('54');
    $__require('55');
    $__require('56');
    $__require('57');
    $__require('58');
    var components_helper_service_1 = $__require('4b');
    var typeahead_match_class_1 = $__require('3f');
    /* tslint:disable-next-line */
    var KeyboardEvent = global.KeyboardEvent;
    var TypeaheadDirective = function () {
        function TypeaheadDirective(control, viewContainerRef, element, renderer, componentsHelper) {
            this.typeaheadLoading = new core_1.EventEmitter(false);
            this.typeaheadNoResults = new core_1.EventEmitter(false);
            this.typeaheadOnSelect = new core_1.EventEmitter(false);
            this.typeaheadMinLength = void 0;
            this.typeaheadAsync = void 0;
            this.typeaheadLatinize = true;
            this.typeaheadSingleWords = true;
            this.typeaheadWordDelimiters = ' ';
            this.typeaheadPhraseDelimiters = '\'"';
            this.isTypeaheadOptionsListActive = false;
            this.keyUpEventEmitter = new core_1.EventEmitter();
            this.placement = 'bottom-left';
            this.element = element;
            this.ngControl = control;
            this.viewContainerRef = viewContainerRef;
            this.renderer = renderer;
            this.componentsHelper = componentsHelper;
        }
        TypeaheadDirective.prototype.onChange = function (e) {
            if (this.container) {
                // esc
                if (e.keyCode === 27) {
                    this.hide();
                    return;
                }
                // up
                if (e.keyCode === 38) {
                    this.container.prevActiveMatch();
                    return;
                }
                // down
                if (e.keyCode === 40) {
                    this.container.nextActiveMatch();
                    return;
                }
                // enter
                if (e.keyCode === 13) {
                    this.container.selectActiveMatch();
                    return;
                }
            }
            // For `<input>`s, use the `value` property. For others that don't have a
            // `value` (such as `<span contenteditable="true">`, use `innerText`.
            var value = e.target.value !== undefined ? e.target.value : e.target.innerText;
            if (value.trim().length >= this.typeaheadMinLength) {
                this.typeaheadLoading.emit(true);
                this.keyUpEventEmitter.emit(e.target.value);
            } else {
                this.typeaheadLoading.emit(false);
                this.typeaheadNoResults.emit(false);
                this.hide();
            }
        };
        TypeaheadDirective.prototype.onFocus = function () {
            if (this.typeaheadMinLength === 0) {
                this.typeaheadLoading.emit(true);
                this.keyUpEventEmitter.emit('');
            }
        };
        TypeaheadDirective.prototype.onBlur = function () {
            if (this.container && !this.container.isFocused) {
                this.hide();
            }
        };
        TypeaheadDirective.prototype.onKeydown = function (e) {
            // no container - no problems
            if (!this.container) {
                return;
            }
            // if items is visible - prevent form submition
            if (e.keyCode === 13) {
                e.preventDefault();
                return;
            }
            // if tab default browser behavior will select next input field, and therefore we should close the items list
            if (e.keyCode === 9) {
                this.hide();
                return;
            }
        };
        TypeaheadDirective.prototype.ngOnInit = function () {
            this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
            this.typeaheadMinLength = this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
            this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
            // async should be false in case of array
            if (this.typeaheadAsync === undefined && !(this.typeahead instanceof Observable_1.Observable)) {
                this.typeaheadAsync = false;
            }
            if (this.typeahead instanceof Observable_1.Observable) {
                this.typeaheadAsync = true;
            }
            if (this.typeaheadAsync) {
                this.asyncActions();
            } else {
                this.syncActions();
            }
        };
        TypeaheadDirective.prototype.changeModel = function (match) {
            var valueStr = match.value;
            this.ngControl.viewToModelUpdate(valueStr);
            this.ngControl.control.setValue(valueStr);
            this.hide();
        };
        Object.defineProperty(TypeaheadDirective.prototype, "matches", {
            get: function () {
                return this._matches;
            },
            enumerable: true,
            configurable: true
        });
        TypeaheadDirective.prototype.show = function () {
            var options = new typeahead_options_class_1.TypeaheadOptions({
                typeaheadRef: this,
                placement: this.placement,
                animation: false
            });
            var binding = core_1.ReflectiveInjector.resolve([{ provide: typeahead_options_class_1.TypeaheadOptions, useValue: options }]);
            this.popup = this.componentsHelper.appendNextToLocation(typeahead_container_component_1.TypeaheadContainerComponent, this.viewContainerRef, binding);
            this.popup.instance.position(this.viewContainerRef.element);
            this.container = this.popup.instance;
            this.container.parent = this;
            // This improves the speed as it won't have to be done for each list item
            var normalizedQuery = (this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.ngControl.control.value) : this.ngControl.control.value).toString().toLowerCase();
            this.container.query = this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
            this.container.matches = this._matches;
            this.element.nativeElement.focus();
        };
        TypeaheadDirective.prototype.hide = function () {
            if (this.container) {
                this.popup.destroy();
                this.container = void 0;
            }
        };
        TypeaheadDirective.prototype.asyncActions = function () {
            var _this = this;
            this.keyUpEventEmitter.debounceTime(this.typeaheadWaitMs).mergeMap(function () {
                return _this.typeahead;
            }).subscribe(function (matches) {
                _this.finalizeAsyncCall(matches);
            }, function (err) {
                console.error(err);
            });
        };
        TypeaheadDirective.prototype.syncActions = function () {
            var _this = this;
            this.keyUpEventEmitter.debounceTime(this.typeaheadWaitMs).mergeMap(function (value) {
                var normalizedQuery = _this.normalizeQuery(value);
                return Observable_1.Observable.from(_this.typeahead).filter(function (option) {
                    return option && _this.testMatch(_this.normalizeOption(option), normalizedQuery);
                }).toArray();
            }).subscribe(function (matches) {
                _this.finalizeAsyncCall(matches);
            }, function (err) {
                console.error(err);
            });
        };
        TypeaheadDirective.prototype.normalizeOption = function (option) {
            var optionValue = typeahead_utils_1.TypeaheadUtils.getValueFromObject(option, this.typeaheadOptionField);
            var normalizedOption = this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(optionValue) : optionValue;
            return normalizedOption.toLowerCase();
        };
        TypeaheadDirective.prototype.normalizeQuery = function (value) {
            // If singleWords, break model here to not be doing extra work on each iteration
            var normalizedQuery = (this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(value) : value).toString().toLowerCase();
            normalizedQuery = this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
            return normalizedQuery;
        };
        TypeaheadDirective.prototype.testMatch = function (match, test) {
            var spaceLength;
            if (typeof test === 'object') {
                spaceLength = test.length;
                for (var i = 0; i < spaceLength; i += 1) {
                    if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                        return false;
                    }
                }
                return true;
            } else {
                return match.indexOf(test) >= 0;
            }
        };
        TypeaheadDirective.prototype.finalizeAsyncCall = function (matches) {
            this.prepareMatches(matches);
            this.typeaheadLoading.emit(false);
            this.typeaheadNoResults.emit(!this.hasMatches());
            if (!this.hasMatches()) {
                this.hide();
                return;
            }
            if (this.container) {
                // This improves the speed as it won't have to be done for each list item
                var normalizedQuery = (this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.ngControl.control.value) : this.ngControl.control.value).toString().toLowerCase();
                this.container.query = this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
                this.container.matches = this._matches;
            } else {
                this.show();
            }
        };
        TypeaheadDirective.prototype.prepareMatches = function (options) {
            var _this = this;
            var limited = options.slice(0, this.typeaheadOptionsLimit);
            if (this.typeaheadGroupField) {
                var matches_1 = [];
                // extract all group names
                var groups = limited.map(function (option) {
                    return typeahead_utils_1.TypeaheadUtils.getValueFromObject(option, _this.typeaheadGroupField);
                }).filter(function (v, i, a) {
                    return a.indexOf(v) === i;
                });
                groups.forEach(function (group) {
                    // add group header to array of matches
                    matches_1.push(new typeahead_match_class_1.TypeaheadMatch(group, group, true));
                    // add each item of group to array of matches
                    matches_1 = matches_1.concat(limited.filter(function (option) {
                        return typeahead_utils_1.TypeaheadUtils.getValueFromObject(option, _this.typeaheadGroupField) === group;
                    }).map(function (option) {
                        return new typeahead_match_class_1.TypeaheadMatch(option, typeahead_utils_1.TypeaheadUtils.getValueFromObject(option, _this.typeaheadOptionField));
                    }));
                });
                this._matches = matches_1;
            } else {
                this._matches = limited.map(function (option) {
                    return new typeahead_match_class_1.TypeaheadMatch(option, typeahead_utils_1.TypeaheadUtils.getValueFromObject(option, _this.typeaheadOptionField));
                });
            }
        };
        TypeaheadDirective.prototype.hasMatches = function () {
            return this._matches.length > 0;
        };
        TypeaheadDirective.decorators = [{ type: core_1.Directive, args: [{
                /* tslint:disable */
                selector: '[typeahead][ngModel],[typeahead][formControlName]'
            }] }];
        /** @nocollapse */
        TypeaheadDirective.ctorParameters = [{ type: forms_1.NgControl }, { type: core_1.ViewContainerRef }, { type: core_1.ElementRef }, { type: core_1.Renderer }, { type: components_helper_service_1.ComponentsHelper }];
        TypeaheadDirective.propDecorators = {
            'typeaheadLoading': [{ type: core_1.Output }],
            'typeaheadNoResults': [{ type: core_1.Output }],
            'typeaheadOnSelect': [{ type: core_1.Output }],
            'typeahead': [{ type: core_1.Input }],
            'typeaheadMinLength': [{ type: core_1.Input }],
            'typeaheadWaitMs': [{ type: core_1.Input }],
            'typeaheadOptionsLimit': [{ type: core_1.Input }],
            'typeaheadOptionField': [{ type: core_1.Input }],
            'typeaheadGroupField': [{ type: core_1.Input }],
            'typeaheadAsync': [{ type: core_1.Input }],
            'typeaheadLatinize': [{ type: core_1.Input }],
            'typeaheadSingleWords': [{ type: core_1.Input }],
            'typeaheadWordDelimiters': [{ type: core_1.Input }],
            'typeaheadPhraseDelimiters': [{ type: core_1.Input }],
            'typeaheadItemTemplate': [{ type: core_1.Input }],
            'onChange': [{ type: core_1.HostListener, args: ['keyup', ['$event']] }],
            'onFocus': [{ type: core_1.HostListener, args: ['focus'] }],
            'onBlur': [{ type: core_1.HostListener, args: ['blur'] }],
            'onKeydown': [{ type: core_1.HostListener, args: ['keydown', ['$event']] }]
        };
        return TypeaheadDirective;
    }();
    exports.TypeaheadDirective = TypeaheadDirective;
    return module.exports;
});
$__System.registerDynamic('44', ['46', '45', '47', '42', '43', '4b'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var common_1 = $__require('46');
    var core_1 = $__require('45');
    var forms_1 = $__require('47');
    var typeahead_container_component_1 = $__require('42');
    var typeahead_directive_1 = $__require('43');
    var components_helper_service_1 = $__require('4b');
    var TypeaheadModule = function () {
        function TypeaheadModule() {}
        TypeaheadModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [typeahead_container_component_1.TypeaheadContainerComponent, typeahead_directive_1.TypeaheadDirective],
                exports: [forms_1.FormsModule, typeahead_container_component_1.TypeaheadContainerComponent, typeahead_directive_1.TypeaheadDirective],
                providers: [components_helper_service_1.ComponentsHelper],
                entryComponents: [typeahead_container_component_1.TypeaheadContainerComponent]
            }] }];
        /** @nocollapse */
        TypeaheadModule.ctorParameters = [];
        return TypeaheadModule;
    }();
    exports.TypeaheadModule = TypeaheadModule;
    return module.exports;
});
$__System.registerDynamic('4b', ['45', '59'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var platform_browser_1 = $__require('59');
    /**
     * Components helper class to easily work with
     * allows to:
     * - get application root view container ref
     */
    var ComponentsHelper = function () {
        function ComponentsHelper(applicationRef, componentFactoryResolver, injector) {
            this.applicationRef = applicationRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
        }
        ComponentsHelper.prototype.getDocument = function () {
            return this.injector.get(platform_browser_1.DOCUMENT);
        };
        /**
         * In some cases, like using ngUpgrate,
         * you need to explicitly set view container ref
         * to made this method working you need to add:
         * ```typescript
         *  @Component({
         *   selector: 'my-app',
         *   ...
         *   })
         *  export class MyApp {
         *    constructor(componentsHelper:ComponentsHelper, viewContainerRef: ViewContainerRef) {
         *        // A Default view container ref, usually the app root container ref.
         *        // Has to be set manually until we can find a way to get it automatically.
         *        componentsHelper.setRootViewContainerRef(viewContainerRef)
         *      }
         *  }
         * ```
         */
        ComponentsHelper.prototype.setRootViewContainerRef = function (value) {
            this.root = value;
        };
        /**
         * This is a name conventional class to get application root view component ref
         * @returns {ViewContainerRef} - application root view component ref
         */
        ComponentsHelper.prototype.getRootViewContainerRef = function () {
            // https://github.com/angular/angular/issues/9293
            if (this.root) {
                return this.root;
            }
            var comps = this.applicationRef.components;
            if (!comps.length) {
                throw new Error("ApplicationRef instance not found");
            }
            try {
                /* one more ugly hack, read issue above for details */
                var rootComponent = this.applicationRef._rootComponents[0];
                this.root = rootComponent._hostElement.vcRef;
                return this.root;
            } catch (e) {
                throw new Error("ApplicationRef instance not found");
            }
        };
        /**
         * Creates an instance of a Component and attaches it to the View Container found at the
         * `location` specified as {@link ViewContainerRef}.
         *
         * You can optionally provide `providers` to configure the {@link Injector} provisioned for this
         * Component Instance.
         *
         * Returns {@link ComponentRef} representing the newly created Component.
         * @param ComponentClass - @Component class
         * @param location - reference to the location
         * @param providers - optional array of providers
         * @returns {ComponentRef<T>} - returns ComponentRef<T>
         */
        ComponentsHelper.prototype.appendNextToLocation = function (ComponentClass, location, providers) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
            var parentInjector = location.parentInjector;
            var childInjector = parentInjector;
            if (providers && providers.length > 0) {
                childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
            }
            return location.createComponent(componentFactory, location.length, childInjector);
        };
        /**
         * Helper methods to add ComponentClass(like modal backdrop) with options
         * of type ComponentOptionsClass to element next to application root
         * or next to provided instance of view container
         * @param ComponentClass - @Component class
         * @param ComponentOptionsClass - options class
         * @param options - instance of options
         * @returns {ComponentRef<T>} - returns ComponentRef<T>
         */
        ComponentsHelper.prototype.appendNextToRoot = function (ComponentClass, ComponentOptionsClass, options) {
            var location = this.getRootViewContainerRef();
            var providers = core_1.ReflectiveInjector.resolve([{ provide: ComponentOptionsClass, useValue: options }]);
            return this.appendNextToLocation(ComponentClass, location, providers);
        };
        ComponentsHelper.decorators = [{ type: core_1.Injectable }];
        /** @nocollapse */
        ComponentsHelper.ctorParameters = [{ type: core_1.ApplicationRef }, { type: core_1.ComponentFactoryResolver }, { type: core_1.Injector }];
        return ComponentsHelper;
    }();
    exports.ComponentsHelper = ComponentsHelper;
    return module.exports;
});
$__System.registerDynamic('5a', ['45', '5', '8', 'c', 'f', '13', '16', '25', '1f', '29', '2e', '31', '36', '39', '3d', '44', '4b'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('45');
    var accordion_module_1 = $__require('5');
    var alert_module_1 = $__require('8');
    var buttons_module_1 = $__require('c');
    var carousel_module_1 = $__require('f');
    var collapse_module_1 = $__require('13');
    var datepicker_module_1 = $__require('16');
    var dropdown_module_1 = $__require('25');
    var modal_module_1 = $__require('1f');
    var pagination_module_1 = $__require('29');
    var progressbar_module_1 = $__require('2e');
    var rating_module_1 = $__require('31');
    var tabs_module_1 = $__require('36');
    var timepicker_module_1 = $__require('39');
    var tooltip_module_1 = $__require('3d');
    var typeahead_module_1 = $__require('44');
    var components_helper_service_1 = $__require('4b');
    var Ng2BootstrapModule = function () {
        function Ng2BootstrapModule() {}
        Ng2BootstrapModule.decorators = [{ type: core_1.NgModule, args: [{
                exports: [accordion_module_1.AccordionModule, alert_module_1.AlertModule, buttons_module_1.ButtonsModule, carousel_module_1.CarouselModule, collapse_module_1.CollapseModule, datepicker_module_1.DatepickerModule, dropdown_module_1.DropdownModule, modal_module_1.ModalModule, pagination_module_1.PaginationModule, progressbar_module_1.ProgressbarModule, rating_module_1.RatingModule, tabs_module_1.TabsModule, timepicker_module_1.TimepickerModule, tooltip_module_1.TooltipModule, typeahead_module_1.TypeaheadModule],
                providers: [{ provide: components_helper_service_1.ComponentsHelper, useClass: components_helper_service_1.ComponentsHelper }]
            }] }];
        /** @nocollapse */
        Ng2BootstrapModule.ctorParameters = [];
        return Ng2BootstrapModule;
    }();
    exports.Ng2BootstrapModule = Ng2BootstrapModule;
    return module.exports;
});
$__System.registerDynamic('1', ['2', '6', '9', 'd', '11', '14', '1b', '20', '26', '2a', '2f', '32', '37', '3a', '3e', '4f', '4e', '48', '5', '8', 'c', 'f', '13', '16', '25', '1f', '29', '2e', '31', '36', '39', '3d', '44', '4b', '5a'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export($__require('2'));
    __export($__require('6'));
    __export($__require('9'));
    __export($__require('d'));
    __export($__require('11'));
    __export($__require('14'));
    __export($__require('1b'));
    __export($__require('20'));
    __export($__require('26'));
    __export($__require('2a'));
    __export($__require('2f'));
    __export($__require('32'));
    __export($__require('37'));
    __export($__require('3a'));
    __export($__require('3e'));
    __export($__require('4f'));
    __export($__require('4e'));
    __export($__require('48'));
    var accordion_module_1 = $__require('5');
    exports.AccordionModule = accordion_module_1.AccordionModule;
    var alert_module_1 = $__require('8');
    exports.AlertModule = alert_module_1.AlertModule;
    var buttons_module_1 = $__require('c');
    exports.ButtonsModule = buttons_module_1.ButtonsModule;
    var carousel_module_1 = $__require('f');
    exports.CarouselModule = carousel_module_1.CarouselModule;
    var collapse_module_1 = $__require('13');
    exports.CollapseModule = collapse_module_1.CollapseModule;
    var datepicker_module_1 = $__require('16');
    exports.DatepickerModule = datepicker_module_1.DatepickerModule;
    var dropdown_module_1 = $__require('25');
    exports.DropdownModule = dropdown_module_1.DropdownModule;
    var modal_module_1 = $__require('1f');
    exports.ModalModule = modal_module_1.ModalModule;
    var pagination_module_1 = $__require('29');
    exports.PaginationModule = pagination_module_1.PaginationModule;
    var progressbar_module_1 = $__require('2e');
    exports.ProgressbarModule = progressbar_module_1.ProgressbarModule;
    var rating_module_1 = $__require('31');
    exports.RatingModule = rating_module_1.RatingModule;
    var tabs_module_1 = $__require('36');
    exports.TabsModule = tabs_module_1.TabsModule;
    var timepicker_module_1 = $__require('39');
    exports.TimepickerModule = timepicker_module_1.TimepickerModule;
    var tooltip_module_1 = $__require('3d');
    exports.TooltipModule = tooltip_module_1.TooltipModule;
    var typeahead_module_1 = $__require('44');
    exports.TypeaheadModule = typeahead_module_1.TypeaheadModule;
    var components_helper_service_1 = $__require('4b');
    exports.ComponentsHelper = components_helper_service_1.ComponentsHelper;
    var index_1 = $__require('5a');
    exports.Ng2BootstrapModule = index_1.Ng2BootstrapModule;
    return module.exports;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["moment","@angular/common","@angular/core","@angular/forms","@angular/platform-browser","rxjs/Observable","rxjs/add/observable/from","rxjs/add/operator/debounceTime","rxjs/add/operator/filter","rxjs/add/operator/map","rxjs/add/operator/mergeMap","rxjs/add/operator/toArray"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("moment"), require("@angular/common"), require("@angular/core"), require("@angular/forms"), require("@angular/platform-browser"), require("rxjs/Observable"), require("rxjs/add/observable/from"), require("rxjs/add/operator/debounceTime"), require("rxjs/add/operator/filter"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"), require("rxjs/add/operator/toArray"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});