System.registerDynamic("ng2-bootstrap/components/accordion/accordion.component", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var AccordionComponent = (function() {
    function AccordionComponent() {
      this.addClass = true;
      this.groups = [];
    }
    AccordionComponent.prototype.closeOtherPanels = function(openGroup) {
      if (!this.closeOthers) {
        return;
      }
      this.groups.forEach(function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    };
    AccordionComponent.prototype.addGroup = function(group) {
      this.groups.push(group);
    };
    AccordionComponent.prototype.removeGroup = function(group) {
      var index = this.groups.indexOf(group);
      if (index !== -1) {
        this.groups.splice(index, 1);
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionComponent.prototype, "closeOthers", void 0);
    __decorate([core_1.HostBinding('class.panel-group'), __metadata('design:type', Boolean)], AccordionComponent.prototype, "addClass", void 0);
    AccordionComponent = __decorate([core_1.Component({
      selector: 'accordion',
      template: "<ng-content></ng-content>"
    }), __metadata('design:paramtypes', [])], AccordionComponent);
    return AccordionComponent;
  }());
  exports.AccordionComponent = AccordionComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/accordion/accordion-group.component", ["@angular/core", "@angular/common", "../collapse", "./accordion.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var collapse_1 = $__require('../collapse');
  var accordion_component_1 = $__require('./accordion.component');
  var AccordionPanelComponent = (function() {
    function AccordionPanelComponent(accordion) {
      this.accordion = accordion;
    }
    Object.defineProperty(AccordionPanelComponent.prototype, "isOpen", {
      get: function() {
        return this._isOpen;
      },
      set: function(value) {
        this._isOpen = value;
        if (value) {
          this.accordion.closeOtherPanels(this);
        }
      },
      enumerable: true,
      configurable: true
    });
    AccordionPanelComponent.prototype.ngOnInit = function() {
      this.panelClass = this.panelClass || 'panel-default';
      this.accordion.addGroup(this);
    };
    AccordionPanelComponent.prototype.ngOnDestroy = function() {
      this.accordion.removeGroup(this);
    };
    AccordionPanelComponent.prototype.toggleOpen = function(event) {
      event.preventDefault();
      if (!this.isDisabled) {
        this.isOpen = !this.isOpen;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], AccordionPanelComponent.prototype, "heading", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], AccordionPanelComponent.prototype, "panelClass", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionPanelComponent.prototype, "isDisabled", void 0);
    __decorate([core_1.HostBinding('class.panel-open'), core_1.Input(), __metadata('design:type', Boolean)], AccordionPanelComponent.prototype, "isOpen", null);
    AccordionPanelComponent = __decorate([core_1.Component({
      selector: 'accordion-group, accordion-panel',
      directives: [collapse_1.CollapseDirective, common_1.NgClass],
      template: "\n    <div class=\"panel\" [ngClass]=\"panelClass\">\n      <div class=\"panel-heading\" (click)=\"toggleOpen($event)\">\n        <h4 class=\"panel-title\">\n          <a href tabindex=\"0\" class=\"accordion-toggle\">\n            <span *ngIf=\"heading\" [ngClass]=\"{'text-muted': isDisabled}\">{{heading}}</span>\n            <ng-content select=\"[accordion-heading]\"></ng-content>\n          </a>\n        </h4>\n      </div>\n      <div class=\"panel-collapse collapse\" [collapse]=\"!isOpen\">\n        <div class=\"panel-body\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  "
    }), __param(0, core_1.Inject(accordion_component_1.AccordionComponent)), __metadata('design:paramtypes', [accordion_component_1.AccordionComponent])], AccordionPanelComponent);
    return AccordionPanelComponent;
  }());
  exports.AccordionPanelComponent = AccordionPanelComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/accordion", ["./accordion/accordion.component", "./accordion/accordion-group.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var accordion_component_1 = $__require('./accordion/accordion.component');
  var accordion_group_component_1 = $__require('./accordion/accordion-group.component');
  var accordion_component_2 = $__require('./accordion/accordion.component');
  exports.AccordionComponent = accordion_component_2.AccordionComponent;
  var accordion_group_component_2 = $__require('./accordion/accordion-group.component');
  exports.AccordionPanelComponent = accordion_group_component_2.AccordionPanelComponent;
  exports.ACCORDION_DIRECTIVES = [accordion_component_1.AccordionComponent, accordion_group_component_1.AccordionPanelComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/alert/alert.component", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var ALERT_TEMPLATE = "\n  <div class=\"alert\" role=\"alert\" [ngClass]=\"classes\" *ngIf=\"!closed\">\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" (click)=\"onClose()\" (touch)=\"onClose()\">\n      <span aria-hidden=\"true\">&times;</span>\n      <span class=\"sr-only\">Close</span>\n    </button>\n    <ng-content></ng-content>\n  </div>\n  ";
  var AlertComponent = (function() {
    function AlertComponent() {
      this.type = 'warning';
      this.close = new core_1.EventEmitter(false);
      this.classes = [];
    }
    AlertComponent.prototype.ngOnInit = function() {
      var _this = this;
      this.classes[0] = "alert-" + this.type;
      if (this.dismissible) {
        this.classes[1] = 'alert-dismissible';
      } else {
        this.classes.length = 1;
      }
      if (this.dismissOnTimeout) {
        setTimeout(function() {
          return _this.onClose();
        }, this.dismissOnTimeout);
      }
    };
    AlertComponent.prototype.onClose = function() {
      this.closed = true;
      this.close.emit(this);
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], AlertComponent.prototype, "type", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AlertComponent.prototype, "dismissible", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], AlertComponent.prototype, "dismissOnTimeout", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], AlertComponent.prototype, "close", void 0);
    AlertComponent = __decorate([core_1.Component({
      selector: 'alert',
      directives: [common_1.NgIf, common_1.NgClass],
      template: ALERT_TEMPLATE
    }), __metadata('design:paramtypes', [])], AlertComponent);
    return AlertComponent;
  }());
  exports.AlertComponent = AlertComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/alert", ["./alert/alert.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var alert_component_1 = $__require('./alert/alert.component');
  exports.AlertComponent = alert_component_1.AlertComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/buttons/button-checkbox.directive", ["@angular/core", "@angular/forms"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var forms_1 = $__require('@angular/forms');
  var ButtonCheckboxDirective = (function() {
    function ButtonCheckboxDirective(cd) {
      this.state = false;
      this.onChange = Function.prototype;
      this.onTouched = Function.prototype;
      this.cd = cd;
      cd.valueAccessor = this;
    }
    ButtonCheckboxDirective.prototype.onClick = function() {
      this.toggle(!this.state);
      this.cd.viewToModelUpdate(this.value);
    };
    ButtonCheckboxDirective.prototype.ngOnInit = function() {
      this.toggle(this.trueValue === this.value);
    };
    Object.defineProperty(ButtonCheckboxDirective.prototype, "trueValue", {
      get: function() {
        return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ButtonCheckboxDirective.prototype, "falseValue", {
      get: function() {
        return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
      },
      enumerable: true,
      configurable: true
    });
    ButtonCheckboxDirective.prototype.toggle = function(state) {
      this.state = state;
      this.value = this.state ? this.trueValue : this.falseValue;
    };
    ButtonCheckboxDirective.prototype.writeValue = function(value) {
      this.state = this.trueValue === value;
      this.value = value;
    };
    ButtonCheckboxDirective.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    ButtonCheckboxDirective.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    __decorate([core_1.Input(), __metadata('design:type', Object)], ButtonCheckboxDirective.prototype, "btnCheckboxTrue", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], ButtonCheckboxDirective.prototype, "btnCheckboxFalse", void 0);
    __decorate([core_1.HostBinding('class.active'), __metadata('design:type', Boolean)], ButtonCheckboxDirective.prototype, "state", void 0);
    __decorate([core_1.HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], ButtonCheckboxDirective.prototype, "onClick", null);
    ButtonCheckboxDirective = __decorate([core_1.Directive({selector: '[btnCheckbox][ngModel]'}), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel])], ButtonCheckboxDirective);
    return ButtonCheckboxDirective;
  }());
  exports.ButtonCheckboxDirective = ButtonCheckboxDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/buttons/button-radio.directive", ["@angular/core", "@angular/forms"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var forms_1 = $__require('@angular/forms');
  var ButtonRadioDirective = (function() {
    function ButtonRadioDirective(cd, el) {
      this.onChange = Function.prototype;
      this.onTouched = Function.prototype;
      this.cd = cd;
      this.el = el;
      cd.valueAccessor = this;
    }
    Object.defineProperty(ButtonRadioDirective.prototype, "isActive", {
      get: function() {
        return this.btnRadio === this.value;
      },
      enumerable: true,
      configurable: true
    });
    ButtonRadioDirective.prototype.onClick = function() {
      if (this.uncheckable && this.btnRadio === this.value) {
        return this.cd.viewToModelUpdate(void 0);
      }
      this.cd.viewToModelUpdate(this.btnRadio);
    };
    ButtonRadioDirective.prototype.ngOnInit = function() {
      this.uncheckable = typeof this.uncheckable !== 'undefined';
    };
    Object.defineProperty(ButtonRadioDirective.prototype, "value", {
      get: function() {
        return this.cd.viewModel;
      },
      set: function(value) {
        this.cd.viewModel = value;
      },
      enumerable: true,
      configurable: true
    });
    ButtonRadioDirective.prototype.writeValue = function(value) {
      this.value = value;
    };
    ButtonRadioDirective.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    ButtonRadioDirective.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], ButtonRadioDirective.prototype, "btnRadio", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], ButtonRadioDirective.prototype, "uncheckable", void 0);
    __decorate([core_1.HostBinding('class.active'), __metadata('design:type', Boolean)], ButtonRadioDirective.prototype, "isActive", null);
    __decorate([core_1.HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], ButtonRadioDirective.prototype, "onClick", null);
    ButtonRadioDirective = __decorate([core_1.Directive({selector: '[btnRadio][ngModel]'}), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel, core_1.ElementRef])], ButtonRadioDirective);
    return ButtonRadioDirective;
  }());
  exports.ButtonRadioDirective = ButtonRadioDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/buttons", ["./buttons/button-checkbox.directive", "./buttons/button-radio.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var button_checkbox_directive_1 = $__require('./buttons/button-checkbox.directive');
  var button_radio_directive_1 = $__require('./buttons/button-radio.directive');
  var button_checkbox_directive_2 = $__require('./buttons/button-checkbox.directive');
  exports.ButtonCheckboxDirective = button_checkbox_directive_2.ButtonCheckboxDirective;
  var button_radio_directive_2 = $__require('./buttons/button-radio.directive');
  exports.ButtonRadioDirective = button_radio_directive_2.ButtonRadioDirective;
  exports.BUTTON_DIRECTIVES = [button_checkbox_directive_1.ButtonCheckboxDirective, button_radio_directive_1.ButtonRadioDirective];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/carousel/slide.component", ["@angular/core", "./carousel.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var carousel_component_1 = $__require('./carousel.component');
  var SlideComponent = (function() {
    function SlideComponent(carousel) {
      this.addClass = true;
      this.carousel = carousel;
    }
    SlideComponent.prototype.ngOnInit = function() {
      this.carousel.addSlide(this);
    };
    SlideComponent.prototype.ngOnDestroy = function() {
      this.carousel.removeSlide(this);
    };
    __decorate([core_1.Input(), __metadata('design:type', Number)], SlideComponent.prototype, "index", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], SlideComponent.prototype, "direction", void 0);
    __decorate([core_1.HostBinding('class.active'), core_1.Input(), __metadata('design:type', Boolean)], SlideComponent.prototype, "active", void 0);
    __decorate([core_1.HostBinding('class.item'), core_1.HostBinding('class.carousel-item'), __metadata('design:type', Boolean)], SlideComponent.prototype, "addClass", void 0);
    SlideComponent = __decorate([core_1.Component({
      selector: 'slide',
      template: "\n    <div [class.active]=\"active\" class=\"item text-center\">\n      <ng-content></ng-content>\n    </div>\n  "
    }), __metadata('design:paramtypes', [carousel_component_1.CarouselComponent])], SlideComponent);
    return SlideComponent;
  }());
  exports.SlideComponent = SlideComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/carousel/carousel.component", ["@angular/core", "@angular/common", "../ng2-bootstrap-config"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var ng2_bootstrap_config_1 = $__require('../ng2-bootstrap-config');
  (function(Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
  })(exports.Direction || (exports.Direction = {}));
  var Direction = exports.Direction;
  var NAVIGATION = (_a = {}, _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n    <a class=\"left carousel-control\" (click)=\"prev()\" *ngIf=\"slides.length\">\n      <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"right carousel-control\" (click)=\"next()\" *ngIf=\"slides.length\">\n      <span class=\"icon-next\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n  ", _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n    <a class=\"left carousel-control\" (click)=\"prev()\" *ngIf=\"slides.length\">\n      <span class=\"glyphicon glyphicon-chevron-left\"></span>\n    </a>\n    <a class=\"right carousel-control\" (click)=\"next()\" *ngIf=\"slides.length\">\n      <span class=\"glyphicon glyphicon-chevron-right\"></span>\n    </a>\n  ", _a);
  var CarouselComponent = (function() {
    function CarouselComponent() {
      this.slides = [];
      this.destroyed = false;
    }
    Object.defineProperty(CarouselComponent.prototype, "interval", {
      get: function() {
        return this._interval;
      },
      set: function(value) {
        this._interval = value;
        this.restartTimer();
      },
      enumerable: true,
      configurable: true
    });
    CarouselComponent.prototype.ngOnDestroy = function() {
      this.destroyed = true;
    };
    CarouselComponent.prototype.select = function(nextSlide, direction) {
      if (direction === void 0) {
        direction = Direction.UNKNOWN;
      }
      var nextIndex = nextSlide.index;
      if (direction === Direction.UNKNOWN) {
        direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
      }
      if (nextSlide && nextSlide !== this.currentSlide) {
        this.goNext(nextSlide, direction);
      }
    };
    CarouselComponent.prototype.play = function() {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.restartTimer();
      }
    };
    CarouselComponent.prototype.pause = function() {
      if (!this.noPause) {
        this.isPlaying = false;
        this.resetTimer();
      }
    };
    CarouselComponent.prototype.next = function() {
      var newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
      if (newIndex === 0 && this.noWrap) {
        this.pause();
        return;
      }
      return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
    };
    CarouselComponent.prototype.prev = function() {
      var newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;
      if (this.noWrap && newIndex === this.slides.length - 1) {
        this.pause();
        return;
      }
      return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
    };
    CarouselComponent.prototype.addSlide = function(slide) {
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
    CarouselComponent.prototype.removeSlide = function(slide) {
      this.slides.splice(slide.index, 1);
      if (this.slides.length === 0) {
        this.currentSlide = void 0;
        return;
      }
      for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].index = i;
      }
    };
    CarouselComponent.prototype.goNext = function(slide, direction) {
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
      this.restartTimer();
    };
    CarouselComponent.prototype.getSlideByIndex = function(index) {
      var len = this.slides.length;
      for (var i = 0; i < len; ++i) {
        if (this.slides[i].index === index) {
          return this.slides[i];
        }
      }
      return void 0;
    };
    CarouselComponent.prototype.getCurrentIndex = function() {
      return !this.currentSlide ? 0 : this.currentSlide.index;
    };
    CarouselComponent.prototype.restartTimer = function() {
      var _this = this;
      this.resetTimer();
      var interval = +this.interval;
      if (!isNaN(interval) && interval > 0) {
        this.currentInterval = setInterval(function() {
          var nInterval = +_this.interval;
          if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
            _this.next();
          } else {
            _this.pause();
          }
        }, interval);
      }
    };
    CarouselComponent.prototype.resetTimer = function() {
      if (this.currentInterval) {
        clearInterval(this.currentInterval);
        this.currentInterval = void 0;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], CarouselComponent.prototype, "noWrap", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], CarouselComponent.prototype, "noPause", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], CarouselComponent.prototype, "noTransition", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], CarouselComponent.prototype, "interval", null);
    CarouselComponent = __decorate([core_1.Component({
      selector: 'carousel',
      directives: [common_1.NgFor],
      template: "\n    <div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" class=\"carousel slide\">\n      <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1\">\n         <li *ngFor=\"let slidez of slides\" [class.active]=\"slidez.active === true\" (click)=\"select(slidez)\"></li>\n      </ol>\n      <div class=\"carousel-inner\"><ng-content></ng-content></div>\n      " + NAVIGATION[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] + "\n    </div>\n  "
    }), __metadata('design:paramtypes', [])], CarouselComponent);
    return CarouselComponent;
  }());
  exports.CarouselComponent = CarouselComponent;
  var _a;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/carousel", ["./carousel/slide.component", "./carousel/carousel.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var slide_component_1 = $__require('./carousel/slide.component');
  var carousel_component_1 = $__require('./carousel/carousel.component');
  var slide_component_2 = $__require('./carousel/slide.component');
  exports.SlideComponent = slide_component_2.SlideComponent;
  var carousel_component_2 = $__require('./carousel/carousel.component');
  exports.CarouselComponent = carousel_component_2.CarouselComponent;
  exports.CAROUSEL_DIRECTIVES = [carousel_component_1.CarouselComponent, slide_component_1.SlideComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/collapse/collapse.directive", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var CollapseDirective = (function() {
    function CollapseDirective(_el, _renderer) {
      this.isExpanded = true;
      this.isCollapsed = false;
      this.isCollapse = true;
      this.isCollapsing = false;
      this._el = _el;
      this._renderer = _renderer;
    }
    Object.defineProperty(CollapseDirective.prototype, "collapse", {
      get: function() {
        return this.isExpanded;
      },
      set: function(value) {
        this.isExpanded = value;
        this.toggle();
      },
      enumerable: true,
      configurable: true
    });
    CollapseDirective.prototype.ngOnInit = function() {};
    CollapseDirective.prototype.toggle = function() {
      if (this.isExpanded) {
        this.hide();
      } else {
        this.show();
      }
    };
    CollapseDirective.prototype.hide = function() {
      this.isCollapse = false;
      this.isCollapsing = true;
      this.isExpanded = false;
      this.isCollapsed = true;
      this.isCollapse = true;
      this.isCollapsing = false;
      this.display = 'none';
    };
    CollapseDirective.prototype.show = function() {
      this.isCollapse = false;
      this.isCollapsing = true;
      this.isExpanded = true;
      this.isCollapsed = false;
      this.display = 'block';
      this.isCollapse = true;
      this.isCollapsing = false;
      this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
      this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
    };
    __decorate([core_1.HostBinding('style.display'), __metadata('design:type', String)], CollapseDirective.prototype, "display", void 0);
    __decorate([core_1.HostBinding('class.in'), core_1.HostBinding('attr.aria-expanded'), __metadata('design:type', Boolean)], CollapseDirective.prototype, "isExpanded", void 0);
    __decorate([core_1.HostBinding('attr.aria-hidden'), __metadata('design:type', Boolean)], CollapseDirective.prototype, "isCollapsed", void 0);
    __decorate([core_1.HostBinding('class.collapse'), __metadata('design:type', Boolean)], CollapseDirective.prototype, "isCollapse", void 0);
    __decorate([core_1.HostBinding('class.collapsing'), __metadata('design:type', Boolean)], CollapseDirective.prototype, "isCollapsing", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], CollapseDirective.prototype, "collapse", null);
    CollapseDirective = __decorate([core_1.Directive({selector: '[collapse]'}), __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])], CollapseDirective);
    return CollapseDirective;
  }());
  exports.CollapseDirective = CollapseDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/collapse", ["./collapse/collapse.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var collapse_directive_1 = $__require('./collapse/collapse.directive');
  exports.CollapseDirective = collapse_directive_1.CollapseDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker/datepicker-popup.component", ["@angular/core", "@angular/common", "@angular/forms", "../position", "./datepicker.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var position_1 = $__require('../position');
  var datepicker_component_1 = $__require('./datepicker.component');
  var PopupOptions = (function() {
    function PopupOptions(options) {
      Object.assign(this, options);
    }
    return PopupOptions;
  }());
  var datePickerPopupConfig = {
    datepickerPopup: 'YYYY-MM-dd',
    currentText: 'Today',
    clearText: 'Clear',
    closeText: 'Done',
    closeOnDateSelection: true,
    showButtonBar: true,
    onOpenFocus: true
  };
  var PopupContainerComponent = (function() {
    function PopupContainerComponent(element, options) {
      this.showButtonBar = true;
      this.update1 = new core_1.EventEmitter(false);
      this.element = element;
      Object.assign(this, options);
      this.classMap = {'in': false};
      this.classMap[options.placement] = true;
    }
    PopupContainerComponent.prototype.onUpdate = function($event) {
      console.log('update', $event);
      if ($event) {
        if ($event.toString() !== '[object Date]') {
          $event = new Date($event);
        }
        this.popupComp.activeDate = $event;
      }
    };
    PopupContainerComponent.prototype.position = function(hostEl) {
      this.display = 'block';
      this.top = '0px';
      this.left = '0px';
      var p = position_1.positionService.positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
      this.top = p.top + 'px';
    };
    PopupContainerComponent.prototype.getText = function(key) {
      return this[key + 'Text'] || datePickerPopupConfig[key + 'Text'];
    };
    PopupContainerComponent.prototype.isDisabled = function() {
      return false;
    };
    PopupContainerComponent = __decorate([core_1.Component({
      selector: 'popup-container',
      events: ['update1'],
      template: "\n    <ul class=\"dropdown-menu\"\n        style=\"display: block\"\n        [ngStyle]=\"{top: top, left: left, display: display}\"\n        [ngClass]=\"classMap\">\n        <li>\n             <datepicker (cupdate)=\"onUpdate($event)\" *ngIf=\"popupComp\" [(ngModel)]=\"popupComp.cd.model\" [show-weeks]=\"true\"></datepicker>\n        </li>\n        <li *ngIf=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n            <span class=\"btn-group pull-left\">\n                 <button type=\"button\" class=\"btn btn-sm btn-info\" (click)=\"select('today')\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n                 <button type=\"button\" class=\"btn btn-sm btn-danger\" (click)=\"select(null)\">{{ getText('clear') }}</button>\n            </span>\n            <button type=\"button\" class=\"btn btn-sm btn-success pull-right\" (click)=\"close()\">{{ getText('close') }}</button>\n        </li>\n    </ul>",
      directives: [common_1.NgClass, common_1.NgStyle, datepicker_component_1.DatePickerComponent, forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES],
      encapsulation: core_1.ViewEncapsulation.None
    }), __metadata('design:paramtypes', [core_1.ElementRef, PopupOptions])], PopupContainerComponent);
    return PopupContainerComponent;
  }());
  var DatePickerPopupDirective = (function() {
    function DatePickerPopupDirective(cd, viewContainerRef, renderer, loader) {
      this._isOpen = false;
      this.placement = 'bottom';
      this.cd = cd;
      this.viewContainerRef = viewContainerRef;
      this.renderer = renderer;
      this.loader = loader;
      this.activeDate = cd.model;
    }
    Object.defineProperty(DatePickerPopupDirective.prototype, "activeDate", {
      get: function() {
        return this._activeDate;
      },
      set: function(value) {
        this._activeDate = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePickerPopupDirective.prototype, "isOpen", {
      get: function() {
        return this._isOpen;
      },
      set: function(value) {
        var _this = this;
        var fn = function() {
          _this._isOpen = value;
        };
        if (value === true) {
          this.show(fn);
        }
        if (value === false) {
          this.hide(fn);
        }
      },
      enumerable: true,
      configurable: true
    });
    DatePickerPopupDirective.prototype.hide = function(cb) {
      if (this.popup) {
        this.popup.then(function(componentRef) {
          componentRef.destroy();
          cb();
          return componentRef;
        });
      } else {
        cb();
      }
    };
    DatePickerPopupDirective.prototype.show = function(cb) {
      var _this = this;
      var options = new PopupOptions({placement: this.placement});
      var binding = core_1.ReflectiveInjector.resolve([core_1.provide(PopupOptions, {useValue: options})]);
      this.popup = this.loader.loadNextToLocation(PopupContainerComponent, this.viewContainerRef, binding).then(function(componentRef) {
        componentRef.instance.position(_this.viewContainerRef);
        componentRef.instance.popupComp = _this;
        cb();
        return componentRef;
      });
    };
    DatePickerPopupDirective = __decorate([core_1.Directive({
      selector: '[datepickerPopup][ngModel]',
      properties: ['datepickerPopup', 'isOpen']
    }), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel, core_1.ViewContainerRef, core_1.Renderer, core_1.DynamicComponentLoader])], DatePickerPopupDirective);
    return DatePickerPopupDirective;
  }());
  exports.DatePickerPopupDirective = DatePickerPopupDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker/daypicker.component", ["@angular/core", "@angular/common", "@angular/forms", "../ng2-bootstrap-config", "./datepicker-inner.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var ng2_bootstrap_config_1 = $__require('../ng2-bootstrap-config');
  var datepicker_inner_component_1 = $__require('./datepicker-inner.component');
  var TEMPLATE_OPTIONS = (_a = {}, _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = {
    DAY_TITLE: "\n        <th *ngFor=\"let labelz of labels\" class=\"text-xs-center\"><small aria-label=\"labelz.full\"><b>{{labelz.abbr}}</b></small></th>\n    ",
    WEEK_ROW: "\n        <td *ngIf=\"datePicker.showWeeks\" class=\"text-xs-center h6\"><em>{{ weekNumbers[index] }}</em></td>\n        <td *ngFor=\"let dtz of rowz\" class=\"text-xs-center\" role=\"gridcell\" [id]=\"dtz.uid\">\n          <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-sm {{dtz.customClass}}\"\n                  *ngIf=\"!(datePicker.onlyCurrentMonth && dtz.secondary)\"\n                  [ngClass]=\"{'btn-secondary': !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected, disabled: dtz.disabled}\"\n                  [disabled]=\"dtz.disabled\"\n                  (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n            <span [ngClass]=\"{'text-muted': dtz.secondary || dtz.current}\">{{dtz.label}}</span>\n          </button>\n        </td>\n    ",
    ARROW_LEFT: '&lt;',
    ARROW_RIGHT: '&gt;'
  }, _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = {
    DAY_TITLE: "\n        <th *ngFor=\"let labelz of labels\" class=\"text-center\"><small aria-label=\"labelz.full\"><b>{{labelz.abbr}}</b></small></th>\n    ",
    WEEK_ROW: "\n        <td *ngIf=\"datePicker.showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[index] }}</em></td>\n        <td *ngFor=\"let dtz of rowz\" class=\"text-center\" role=\"gridcell\" [id]=\"dtz.uid\">\n          <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default btn-sm {{dtz.customClass}}\"\n                  *ngIf=\"!(datePicker.onlyCurrentMonth && dtz.secondary)\"\n                  [ngClass]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                  [disabled]=\"dtz.disabled\"\n                  (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n            <span [ngClass]=\"{'text-muted': dtz.secondary, 'text-info': dtz.current}\">{{dtz.label}}</span>\n          </button>\n        </td>\n    ",
    ARROW_LEFT: "\n    <i class=\"glyphicon glyphicon-chevron-left\"></i>\n    ",
    ARROW_RIGHT: "\n    <i class=\"glyphicon glyphicon-chevron-right\"></i>\n    "
  }, _a);
  var CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme || ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3];
  var DayPickerComponent = (function() {
    function DayPickerComponent(datePicker) {
      this.labels = [];
      this.rows = [];
      this.weekNumbers = [];
      this.datePicker = datePicker;
    }
    DayPickerComponent.prototype.ngOnInit = function() {
      var self = this;
      this.datePicker.stepDay = {months: 1};
      this.datePicker.setRefreshViewHandler(function() {
        var year = this.activeDate.getFullYear();
        var month = this.activeDate.getMonth();
        var firstDayOfMonth = new Date(year, month, 1);
        var difference = this.startingDay - firstDayOfMonth.getDay();
        var numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference;
        var firstDate = new Date(firstDayOfMonth.getTime());
        if (numDisplayedFromPreviousMonth > 0) {
          firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }
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
      this.datePicker.setCompareHandler(function(date1, date2) {
        var d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        var d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        return d1.getTime() - d2.getTime();
      }, 'day');
      this.datePicker.refreshView();
    };
    DayPickerComponent.prototype.getDates = function(startDate, n) {
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
    DayPickerComponent.prototype.getISO8601WeekNumber = function(date) {
      var checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      var time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };
    DayPickerComponent = __decorate([core_1.Component({
      selector: 'daypicker',
      template: "\n<table *ngIf=\"datePicker.datepickerMode==='day'\" role=\"grid\" aria-labelledby=\"uniqueId+'-title'\" aria-activedescendant=\"activeDateId\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-secondary btn-sm pull-left\" (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n        " + CURRENT_THEME_TEMPLATE.ARROW_LEFT + "\n        </button>\n      </th>\n      <th [attr.colspan]=\"5 + datePicker.showWeeks\">\n        <button [id]=\"datePicker.uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-secondary btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === datePicker.maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === datePicker.maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-secondary btn-sm pull-right\" (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n        " + CURRENT_THEME_TEMPLATE.ARROW_RIGHT + "\n        </button>\n      </th>\n    </tr>\n    <tr>\n      <th *ngIf=\"datePicker.showWeeks\"></th>\n      " + CURRENT_THEME_TEMPLATE.DAY_TITLE + "\n    </tr>\n  </thead>\n  <tbody>\n    <template ngFor [ngForOf]=\"rows\" let-rowz=\"$implicit\" let-index=\"index\">\n      <tr *ngIf=\"!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)\">\n        " + CURRENT_THEME_TEMPLATE.WEEK_ROW + "\n      </tr>\n    </template>\n  </tbody>\n</table>\n  ",
      directives: [forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgClass]
    }), __metadata('design:paramtypes', [datepicker_inner_component_1.DatePickerInnerComponent])], DayPickerComponent);
    return DayPickerComponent;
  }());
  exports.DayPickerComponent = DayPickerComponent;
  var _a;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker/monthpicker.component", ["@angular/core", "@angular/common", "@angular/forms", "./datepicker-inner.component", "../ng2-bootstrap-config"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var datepicker_inner_component_1 = $__require('./datepicker-inner.component');
  var ng2_bootstrap_config_1 = $__require('../ng2-bootstrap-config');
  var TEMPLATE_OPTIONS = {
    bs4: {MONTH_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-info': dtz.selected, 'btn-link': !dtz.selected && !datePicker.isActive(dtz), 'btn-info': !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\"><span [ngClass]=\"{'text-success': dtz.current}\">{{dtz.label}}</span></button>\n    "},
    bs3: {MONTH_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\"><span [ngClass]=\"{'text-info': dtz.current}\">{{dtz.label}}</span></button>\n    "}
  };
  var CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] || TEMPLATE_OPTIONS.bs3;
  var MonthPickerComponent = (function() {
    function MonthPickerComponent(datePicker) {
      this.rows = [];
      this.datePicker = datePicker;
    }
    MonthPickerComponent.prototype.ngOnInit = function() {
      var self = this;
      this.datePicker.stepMonth = {years: 1};
      this.datePicker.setRefreshViewHandler(function() {
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
        self.rows = this.split(months, 3);
      }, 'month');
      this.datePicker.setCompareHandler(function(date1, date2) {
        var d1 = new Date(date1.getFullYear(), date1.getMonth());
        var d2 = new Date(date2.getFullYear(), date2.getMonth());
        return d1.getTime() - d2.getTime();
      }, 'month');
      this.datePicker.refreshView();
    };
    MonthPickerComponent = __decorate([core_1.Component({
      selector: 'monthpicker',
      template: "\n<table *ngIf=\"datePicker.datepickerMode==='month'\" role=\"grid\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-left\"\n                (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-left\"></i>\n        </button></th>\n      <th>\n        <button [id]=\"uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n                (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-right\"></i>\n        </button>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let rowz of rows\">\n      <td *ngFor=\"let dtz of rowz\" class=\"text-center\" role=\"gridcell\" id=\"{{dtz.uid}}\" [ngClass]=\"dtz.customClass\">\n        " + CURRENT_THEME_TEMPLATE.MONTH_BUTTON + "\n      </td>\n    </tr>\n  </tbody>\n</table>\n  ",
      directives: [forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgClass]
    }), __metadata('design:paramtypes', [datepicker_inner_component_1.DatePickerInnerComponent])], MonthPickerComponent);
    return MonthPickerComponent;
  }());
  exports.MonthPickerComponent = MonthPickerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker/date-formatter", ["moment"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var moment = $__require('moment');
  var DateFormatter = (function() {
    function DateFormatter() {}
    DateFormatter.prototype.format = function(date, format) {
      return moment(date.getTime()).format(format);
    };
    return DateFormatter;
  }());
  exports.DateFormatter = DateFormatter;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker/datepicker-inner.component", ["@angular/core", "@angular/common", "@angular/forms", "./date-formatter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var date_formatter_1 = $__require('./date-formatter');
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
  var SHORTCUT_PROPAGATION = false;
  var DatePickerInnerComponent = (function() {
    function DatePickerInnerComponent() {
      this.selectionDone = new core_1.EventEmitter(undefined);
      this.stepDay = {};
      this.stepMonth = {};
      this.stepYear = {};
      this.modes = ['day', 'month', 'year'];
      this.dateFormatter = new date_formatter_1.DateFormatter();
      this.update = new core_1.EventEmitter(false);
    }
    Object.defineProperty(DatePickerInnerComponent.prototype, "activeDate", {
      get: function() {
        return this._activeDate;
      },
      set: function(value) {
        this._activeDate = value;
      },
      enumerable: true,
      configurable: true
    });
    DatePickerInnerComponent.prototype.ngOnInit = function() {
      this.formatDay = this.formatDay || FORMAT_DAY;
      this.formatMonth = this.formatMonth || FORMAT_MONTH;
      this.formatYear = this.formatYear || FORMAT_YEAR;
      this.formatDayHeader = this.formatDayHeader || FORMAT_DAY_HEADER;
      this.formatDayTitle = this.formatDayTitle || FORMAT_DAY_TITLE;
      this.formatMonthTitle = this.formatMonthTitle || FORMAT_MONTH_TITLE;
      this.showWeeks = (this.showWeeks === undefined ? SHOW_WEEKS : this.showWeeks);
      this.onlyCurrentMonth = (this.onlyCurrentMonth === undefined ? ONLY_CURRENT_MONTH : this.onlyCurrentMonth);
      this.startingDay = this.startingDay || STARTING_DAY;
      this.yearRange = this.yearRange || YEAR_RANGE;
      this.shortcutPropagation = this.shortcutPropagation || SHORTCUT_PROPAGATION;
      this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
      this.minMode = this.minMode || MIN_MODE;
      this.maxMode = this.maxMode || MAX_MODE;
      this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);
      if (this.initDate) {
        this.activeDate = this.initDate;
        this.selectedDate = new Date(this.activeDate.valueOf());
        this.update.emit(this.activeDate);
      } else if (this.activeDate === undefined) {
        this.activeDate = new Date();
      }
    };
    DatePickerInnerComponent.prototype.ngOnChanges = function() {
      this.refreshView();
    };
    DatePickerInnerComponent.prototype.setCompareHandler = function(handler, type) {
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
    DatePickerInnerComponent.prototype.compare = function(date1, date2) {
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
    DatePickerInnerComponent.prototype.setRefreshViewHandler = function(handler, type) {
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
    DatePickerInnerComponent.prototype.refreshView = function() {
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
    DatePickerInnerComponent.prototype.dateFilter = function(date, format) {
      return this.dateFormatter.format(date, format);
    };
    DatePickerInnerComponent.prototype.isActive = function(dateObject) {
      if (this.compare(dateObject.date, this.activeDate) === 0) {
        this.activeDateId = dateObject.uid;
        return true;
      }
      return false;
    };
    DatePickerInnerComponent.prototype.createDateObject = function(date, format) {
      var dateObject = {};
      dateObject.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      dateObject.label = this.dateFilter(date, format);
      dateObject.selected = this.compare(date, this.selectedDate) === 0;
      dateObject.disabled = this.isDisabled(date);
      dateObject.current = this.compare(date, new Date()) === 0;
      dateObject.customClass = this.getCustomClassForDate(dateObject.date);
      return dateObject;
    };
    DatePickerInnerComponent.prototype.split = function(arr, size) {
      var arrays = [];
      while (arr.length > 0) {
        arrays.push(arr.splice(0, size));
      }
      return arrays;
    };
    DatePickerInnerComponent.prototype.fixTimeZone = function(date) {
      var hours = date.getHours();
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours === 23 ? hours + 2 : 0);
    };
    DatePickerInnerComponent.prototype.select = function(date) {
      if (this.datepickerMode === this.minMode) {
        if (!this.activeDate) {
          this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
        }
        this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.selectionDone.emit(this.activeDate);
      } else {
        this.activeDate = date;
        this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
      }
      this.selectedDate = new Date(this.activeDate.valueOf());
      this.update.emit(this.activeDate);
      this.refreshView();
    };
    DatePickerInnerComponent.prototype.move = function(direction) {
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
    DatePickerInnerComponent.prototype.toggleMode = function(direction) {
      direction = direction || 1;
      if ((this.datepickerMode === this.maxMode && direction === 1) || (this.datepickerMode === this.minMode && direction === -1)) {
        return;
      }
      this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
      this.refreshView();
    };
    DatePickerInnerComponent.prototype.getCustomClassForDate = function(date) {
      var _this = this;
      if (!this.customClass) {
        return '';
      }
      var customClassObject = this.customClass.find(function(customClass) {
        return customClass.date.valueOf() === date.valueOf() && customClass.mode === _this.datepickerMode;
      }, this);
      return customClassObject === undefined ? '' : customClassObject.clazz;
    };
    DatePickerInnerComponent.prototype.isDisabled = function(date) {
      return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0));
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "datepickerMode", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], DatePickerInnerComponent.prototype, "startingDay", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], DatePickerInnerComponent.prototype, "yearRange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerInnerComponent.prototype, "minDate", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerInnerComponent.prototype, "maxDate", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "minMode", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "maxMode", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DatePickerInnerComponent.prototype, "showWeeks", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "formatDay", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "formatMonth", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "formatYear", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "formatDayHeader", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "formatDayTitle", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerInnerComponent.prototype, "formatMonthTitle", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DatePickerInnerComponent.prototype, "onlyCurrentMonth", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DatePickerInnerComponent.prototype, "shortcutPropagation", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], DatePickerInnerComponent.prototype, "customClass", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], DatePickerInnerComponent.prototype, "dateDisabled", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerInnerComponent.prototype, "initDate", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], DatePickerInnerComponent.prototype, "selectionDone", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerInnerComponent.prototype, "activeDate", null);
    DatePickerInnerComponent = __decorate([core_1.Component({
      selector: 'datepicker-inner',
      events: ['update'],
      template: "\n    <div *ngIf=\"datepickerMode\" class=\"well well-sm bg-faded p-a card\" role=\"application\" ><!--&lt;!&ndash;ng-keydown=\"keydown($event)\"&ndash;&gt;-->\n      <ng-content></ng-content>\n    </div>\n  ",
      directives: [forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgClass, forms_1.NgModel]
    }), __metadata('design:paramtypes', [])], DatePickerInnerComponent);
    return DatePickerInnerComponent;
  }());
  exports.DatePickerInnerComponent = DatePickerInnerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker/yearpicker.component", ["@angular/core", "@angular/common", "@angular/forms", "../ng2-bootstrap-config", "./datepicker-inner.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var ng2_bootstrap_config_1 = $__require('../ng2-bootstrap-config');
  var datepicker_inner_component_1 = $__require('./datepicker-inner.component');
  var TEMPLATE_OPTIONS = {
    bs4: {YEAR_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-info': dtz.selected, 'btn-link': !dtz.selected && !datePicker.isActive(dtz), 'btn-info': !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ngClass]=\"{'text-success': dtz.current}\">{{dtz.label}}</span>\n        </button>\n    "},
    bs3: {YEAR_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ngClass]=\"{'text-info': dtz.current}\">{{dtz.label}}</span>\n        </button>\n    "}
  };
  var CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] || TEMPLATE_OPTIONS.bs3;
  var YearPickerComponent = (function() {
    function YearPickerComponent(datePicker) {
      this.rows = [];
      this.datePicker = datePicker;
    }
    YearPickerComponent.prototype.ngOnInit = function() {
      var self = this;
      this.datePicker.stepYear = {years: this.datePicker.yearRange};
      this.datePicker.setRefreshViewHandler(function() {
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
        self.rows = this.split(years, 5);
      }, 'year');
      this.datePicker.setCompareHandler(function(date1, date2) {
        return date1.getFullYear() - date2.getFullYear();
      }, 'year');
      this.datePicker.refreshView();
    };
    YearPickerComponent.prototype.getStartingYear = function(year) {
      return ((year - 1) / this.datePicker.yearRange) * this.datePicker.yearRange + 1;
    };
    YearPickerComponent = __decorate([core_1.Component({
      selector: 'yearpicker',
      template: "\n<table *ngIf=\"datePicker.datepickerMode==='year'\" role=\"grid\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-left\"\n                (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-left\"></i>\n        </button>\n      </th>\n      <th colspan=\"3\">\n        <button [id]=\"uniqueId + '-title'\" role=\"heading\"\n                type=\"button\" class=\"btn btn-default btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === datePicker.maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === datePicker.maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n                (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-right\"></i>\n        </button>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let rowz of rows\">\n      <td *ngFor=\"let dtz of rowz\" class=\"text-center\" role=\"gridcell\">\n      " + CURRENT_THEME_TEMPLATE.YEAR_BUTTON + "\n      </td>\n    </tr>\n  </tbody>\n</table>\n  ",
      directives: [forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgClass]
    }), __metadata('design:paramtypes', [datepicker_inner_component_1.DatePickerInnerComponent])], YearPickerComponent);
    return YearPickerComponent;
  }());
  exports.YearPickerComponent = YearPickerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker/datepicker.component", ["@angular/core", "@angular/common", "@angular/forms", "./datepicker-inner.component", "./daypicker.component", "./monthpicker.component", "./yearpicker.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var datepicker_inner_component_1 = $__require('./datepicker-inner.component');
  var daypicker_component_1 = $__require('./daypicker.component');
  var monthpicker_component_1 = $__require('./monthpicker.component');
  var yearpicker_component_1 = $__require('./yearpicker.component');
  var DatePickerComponent = (function() {
    function DatePickerComponent(cd) {
      this.selectionDone = new core_1.EventEmitter(undefined);
      this.onChange = Function.prototype;
      this.onTouched = Function.prototype;
      this._now = new Date();
      this.cd = cd;
      cd.valueAccessor = this;
    }
    Object.defineProperty(DatePickerComponent.prototype, "activeDate", {
      get: function() {
        return this._activeDate || this._now;
      },
      set: function(value) {
        this._activeDate = value;
      },
      enumerable: true,
      configurable: true
    });
    DatePickerComponent.prototype.onUpdate = function(event) {
      this.writeValue(event);
      this.cd.viewToModelUpdate(event);
    };
    DatePickerComponent.prototype.onSelectionDone = function(event) {
      this.selectionDone.emit(event);
    };
    DatePickerComponent.prototype.writeValue = function(value) {
      if (value === this._activeDate) {
        return;
      }
      if (value && value instanceof Date) {
        this.activeDate = value;
        return;
      }
      this.activeDate = value ? new Date(value) : void 0;
    };
    DatePickerComponent.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    DatePickerComponent.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "datepickerMode", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerComponent.prototype, "initDate", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerComponent.prototype, "minDate", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerComponent.prototype, "maxDate", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "minMode", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "maxMode", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DatePickerComponent.prototype, "showWeeks", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "formatDay", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "formatMonth", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "formatYear", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "formatDayHeader", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "formatDayTitle", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DatePickerComponent.prototype, "formatMonthTitle", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], DatePickerComponent.prototype, "startingDay", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], DatePickerComponent.prototype, "yearRange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DatePickerComponent.prototype, "onlyCurrentMonth", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DatePickerComponent.prototype, "shortcutPropagation", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], DatePickerComponent.prototype, "customClass", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], DatePickerComponent.prototype, "dateDisabled", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], DatePickerComponent.prototype, "selectionDone", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], DatePickerComponent.prototype, "activeDate", null);
    DatePickerComponent = __decorate([core_1.Component({
      selector: 'datepicker[ngModel]',
      template: "\n    <datepicker-inner [activeDate]=\"activeDate\"\n                      (update)=\"onUpdate($event)\"\n                      [datepickerMode]=\"datepickerMode\"\n                      [initDate]=\"initDate\"\n                      [minDate]=\"minDate\"\n                      [maxDate]=\"maxDate\"\n                      [minMode]=\"minMode\"\n                      [maxMode]=\"maxMode\"\n                      [showWeeks]=\"showWeeks\"\n                      [formatDay]=\"formatDay\"\n                      [formatMonth]=\"formatMonth\"\n                      [formatYear]=\"formatYear\"\n                      [formatDayHeader]=\"formatDayHeader\"\n                      [formatDayTitle]=\"formatDayTitle\"\n                      [formatMonthTitle]=\"formatMonthTitle\"\n                      [startingDay]=\"startingDay\"\n                      [yearRange]=\"yearRange\"\n                      [customClass]=\"customClass\"\n                      [dateDisabled]=\"dateDisabled\"\n                      [templateUrl]=\"templateUrl\"\n                      [onlyCurrentMonth]=\"onlyCurrentMonth\"\n                      [shortcutPropagation]=\"shortcutPropagation\"\n                      (selectionDone)=\"onSelectionDone($event)\">\n      <daypicker tabindex=\"0\"></daypicker>\n      <monthpicker tabindex=\"0\"></monthpicker>\n      <yearpicker tabindex=\"0\"></yearpicker>\n    </datepicker-inner>\n    ",
      directives: [datepicker_inner_component_1.DatePickerInnerComponent, daypicker_component_1.DayPickerComponent, monthpicker_component_1.MonthPickerComponent, yearpicker_component_1.YearPickerComponent, forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
    }), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel])], DatePickerComponent);
    return DatePickerComponent;
  }());
  exports.DatePickerComponent = DatePickerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/datepicker", ["./datepicker/datepicker-popup.component", "./datepicker/datepicker.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var datepicker_popup_component_1 = $__require('./datepicker/datepicker-popup.component');
  var datepicker_component_1 = $__require('./datepicker/datepicker.component');
  var datepicker_popup_component_2 = $__require('./datepicker/datepicker-popup.component');
  exports.DatePickerPopupDirective = datepicker_popup_component_2.DatePickerPopupDirective;
  var datepicker_component_2 = $__require('./datepicker/datepicker.component');
  exports.DatePickerComponent = datepicker_component_2.DatePickerComponent;
  exports.DATEPICKER_DIRECTIVES = [datepicker_component_1.DatePickerComponent, datepicker_popup_component_1.DatePickerPopupDirective];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/dropdown/dropdown-menu.directive", ["@angular/core", "./dropdown.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var dropdown_directive_1 = $__require('./dropdown.directive');
  var DropdownMenuDirective = (function() {
    function DropdownMenuDirective(dropdown, el) {
      this.addClass = true;
      this.dropdown = dropdown;
      this.el = el;
    }
    DropdownMenuDirective.prototype.ngOnInit = function() {
      this.dropdown.dropDownMenu = this;
    };
    __decorate([core_1.HostBinding('class.dropdown-menu'), __metadata('design:type', Boolean)], DropdownMenuDirective.prototype, "addClass", void 0);
    DropdownMenuDirective = __decorate([core_1.Directive({selector: '[dropdownMenu]'}), __param(0, core_1.Host()), __metadata('design:paramtypes', [dropdown_directive_1.DropdownDirective, core_1.ElementRef])], DropdownMenuDirective);
    return DropdownMenuDirective;
  }());
  exports.DropdownMenuDirective = DropdownMenuDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/dropdown/dropdown.service", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.ALWAYS = 'always';
  exports.DISABLED = 'disabled';
  exports.OUTSIDECLICK = 'outsideClick';
  exports.NONINPUT = 'nonInput';
  var DropdownService = (function() {
    function DropdownService() {
      this.closeDropdownBind = this.closeDropdown.bind(this);
      this.keybindFilterBind = this.keybindFilter.bind(this);
    }
    DropdownService.prototype.open = function(dropdownScope) {
      if (!this.openScope) {
        window.document.addEventListener('click', this.closeDropdownBind, true);
        window.document.addEventListener('keydown', this.keybindFilterBind);
      }
      if (this.openScope && this.openScope !== dropdownScope) {
        this.openScope.isOpen = false;
      }
      this.openScope = dropdownScope;
    };
    DropdownService.prototype.close = function(dropdownScope) {
      if (this.openScope !== dropdownScope) {
        return;
      }
      this.openScope = void 0;
      window.document.removeEventListener('click', this.closeDropdownBind, true);
      window.document.removeEventListener('keydown', this.keybindFilterBind);
    };
    DropdownService.prototype.closeDropdown = function(event) {
      if (!this.openScope) {
        return;
      }
      if (event && this.openScope.autoClose === exports.DISABLED) {
        return;
      }
      if (event && this.openScope.toggleEl && this.openScope.toggleEl.nativeElement === event.target) {
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
    DropdownService.prototype.keybindFilter = function(event) {
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
  }());
  exports.DropdownService = DropdownService;
  exports.dropdownService = new DropdownService();
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/dropdown/dropdown.directive", ["@angular/core", "./dropdown.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var dropdown_service_1 = $__require('./dropdown.service');
  var DropdownDirective = (function() {
    function DropdownDirective(el, ref) {
      this.onToggle = new core_1.EventEmitter(false);
      this.isOpenChange = new core_1.EventEmitter(false);
      this.addClass = true;
      this.el = el;
      this._changeDetector = ref;
    }
    Object.defineProperty(DropdownDirective.prototype, "isOpen", {
      get: function() {
        return this._isOpen;
      },
      set: function(value) {
        this._isOpen = !!value;
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
      },
      enumerable: true,
      configurable: true
    });
    DropdownDirective.prototype.ngOnInit = function() {
      this.autoClose = this.autoClose || dropdown_service_1.NONINPUT;
      if (this.isOpen) {}
    };
    DropdownDirective.prototype.ngOnDestroy = function() {
      if (this.appendToBody && this.menuEl) {
        this.menuEl.nativeElement.remove();
      }
    };
    Object.defineProperty(DropdownDirective.prototype, "dropDownMenu", {
      set: function(dropdownMenu) {
        this.menuEl = dropdownMenu.el;
        if (this.appendToBody) {
          window.document.body.appendChild(this.menuEl.nativeElement);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DropdownDirective.prototype, "dropDownToggle", {
      set: function(dropdownToggle) {
        this.toggleEl = dropdownToggle.el;
      },
      enumerable: true,
      configurable: true
    });
    DropdownDirective.prototype.toggle = function(open) {
      return this.isOpen = arguments.length ? !!open : !this.isOpen;
    };
    DropdownDirective.prototype.focusDropdownEntry = function(keyCode) {
      var hostEl = this.menuEl ? this.menuEl.nativeElement : this.el.nativeElement.getElementsByTagName('ul')[0];
      if (!hostEl) {
        return;
      }
      var elems = hostEl.getElementsByTagName('a');
      if (!elems || !elems.length) {
        return;
      }
      switch (keyCode) {
        case (40):
          if (typeof this.selectedOption !== 'number') {
            this.selectedOption = 0;
            break;
          }
          if (this.selectedOption === elems.length - 1) {
            break;
          }
          this.selectedOption++;
          break;
        case (38):
          if (typeof this.selectedOption !== 'number') {
            return;
          }
          if (this.selectedOption === 0) {
            break;
          }
          this.selectedOption--;
          break;
        default:
          break;
      }
      elems[this.selectedOption].focus();
    };
    DropdownDirective.prototype.focusToggleElement = function() {
      if (this.toggleEl) {
        this.toggleEl.nativeElement.focus();
      }
    };
    __decorate([core_1.HostBinding('class.open'), core_1.Input(), __metadata('design:type', Boolean)], DropdownDirective.prototype, "isOpen", null);
    __decorate([core_1.Input(), __metadata('design:type', String)], DropdownDirective.prototype, "autoClose", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DropdownDirective.prototype, "keyboardNav", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DropdownDirective.prototype, "appendToBody", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], DropdownDirective.prototype, "onToggle", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], DropdownDirective.prototype, "isOpenChange", void 0);
    __decorate([core_1.HostBinding('class.dropdown'), __metadata('design:type', Boolean)], DropdownDirective.prototype, "addClass", void 0);
    DropdownDirective = __decorate([core_1.Directive({selector: '[dropdown]'}), __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef])], DropdownDirective);
    return DropdownDirective;
  }());
  exports.DropdownDirective = DropdownDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/dropdown/dropdown-toggle.directive", ["@angular/core", "./dropdown.directive", "@angular/core/src/facade/lang"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var dropdown_directive_1 = $__require('./dropdown.directive');
  var lang_1 = $__require('@angular/core/src/facade/lang');
  var MouseEvent = lang_1.global.MouseEvent;
  var DropdownToggleDirective = (function() {
    function DropdownToggleDirective(dropdown, el) {
      this.isDisabled = false;
      this.addClass = true;
      this.dropdown = dropdown;
      this.el = el;
    }
    DropdownToggleDirective.prototype.ngOnInit = function() {
      this.dropdown.dropDownToggle = this;
    };
    Object.defineProperty(DropdownToggleDirective.prototype, "isOpen", {
      get: function() {
        return this.dropdown.isOpen;
      },
      enumerable: true,
      configurable: true
    });
    DropdownToggleDirective.prototype.toggleDropdown = function(event) {
      event.stopPropagation();
      if (!this.isDisabled) {
        this.dropdown.toggle();
      }
      return false;
    };
    __decorate([core_1.HostBinding('class.disabled'), core_1.Input(), __metadata('design:type', Boolean)], DropdownToggleDirective.prototype, "isDisabled", void 0);
    __decorate([core_1.HostBinding('class.dropdown-toggle'), core_1.HostBinding('attr.aria-haspopup'), __metadata('design:type', Boolean)], DropdownToggleDirective.prototype, "addClass", void 0);
    __decorate([core_1.HostBinding('attr.aria-expanded'), __metadata('design:type', Boolean)], DropdownToggleDirective.prototype, "isOpen", null);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', Boolean)], DropdownToggleDirective.prototype, "toggleDropdown", null);
    DropdownToggleDirective = __decorate([core_1.Directive({selector: '[dropdownToggle]'}), __param(0, core_1.Host()), __metadata('design:paramtypes', [dropdown_directive_1.DropdownDirective, core_1.ElementRef])], DropdownToggleDirective);
    return DropdownToggleDirective;
  }());
  exports.DropdownToggleDirective = DropdownToggleDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/dropdown", ["./dropdown/dropdown.directive", "./dropdown/dropdown-menu.directive", "./dropdown/dropdown-toggle.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var dropdown_directive_1 = $__require('./dropdown/dropdown.directive');
  var dropdown_menu_directive_1 = $__require('./dropdown/dropdown-menu.directive');
  var dropdown_toggle_directive_1 = $__require('./dropdown/dropdown-toggle.directive');
  var dropdown_directive_2 = $__require('./dropdown/dropdown.directive');
  exports.DropdownDirective = dropdown_directive_2.DropdownDirective;
  var dropdown_menu_directive_2 = $__require('./dropdown/dropdown-menu.directive');
  exports.DropdownMenuDirective = dropdown_menu_directive_2.DropdownMenuDirective;
  var dropdown_toggle_directive_2 = $__require('./dropdown/dropdown-toggle.directive');
  exports.DropdownToggleDirective = dropdown_toggle_directive_2.DropdownToggleDirective;
  exports.DROPDOWN_DIRECTIVES = [dropdown_directive_1.DropdownDirective, dropdown_toggle_directive_1.DropdownToggleDirective, dropdown_menu_directive_1.DropdownMenuDirective];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/modal/modal-backdrop.component", ["@angular/core", "./modal-options.class"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var modal_options_class_1 = $__require('./modal-options.class');
  var ModalBackdropOptions = (function() {
    function ModalBackdropOptions(options) {
      this.animate = true;
      Object.assign(this, options);
    }
    return ModalBackdropOptions;
  }());
  exports.ModalBackdropOptions = ModalBackdropOptions;
  var ModalBackdropComponent = (function() {
    function ModalBackdropComponent(options, element, renderer) {
      this._isShown = false;
      this.element = element;
      this.renderer = renderer;
      this.isAnimated = options.animate !== false;
    }
    Object.defineProperty(ModalBackdropComponent.prototype, "isAnimated", {
      get: function() {
        return this._isAnimated;
      },
      set: function(value) {
        this._isAnimated = value;
        this.renderer.setElementClass(this.element.nativeElement, "" + modal_options_class_1.ClassName.FADE, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ModalBackdropComponent.prototype, "isShown", {
      get: function() {
        return this._isShown;
      },
      set: function(value) {
        this._isShown = value;
        this.renderer.setElementClass(this.element.nativeElement, "" + modal_options_class_1.ClassName.IN, value);
      },
      enumerable: true,
      configurable: true
    });
    ModalBackdropComponent = __decorate([core_1.Component({
      selector: 'bs-modal-backdrop',
      template: '',
      host: {'class': "" + modal_options_class_1.ClassName.BACKDROP}
    }), __metadata('design:paramtypes', [ModalBackdropOptions, core_1.ElementRef, core_1.Renderer])], ModalBackdropComponent);
    return ModalBackdropComponent;
  }());
  exports.ModalBackdropComponent = ModalBackdropComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/modal/modal-options.class", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
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

System.registerDynamic("ng2-bootstrap/components/utils/utils.class", ["@angular/core/src/facade/lang"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('@angular/core/src/facade/lang');
  var Utils = (function() {
    function Utils() {}
    Utils.reflow = function(element) {
      new Function('bs', 'return bs')(element.offsetHeight);
    };
    Utils.getStyles = function(elem) {
      var view = elem.ownerDocument.defaultView;
      if (!view || !view.opener) {
        view = lang_1.global;
      }
      return view.getComputedStyle(elem);
    };
    return Utils;
  }());
  exports.Utils = Utils;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/modal/modal.component", ["@angular/core", "@angular/core/src/facade/lang", "./modal-backdrop.component", "./modal-options.class", "../utils/components-helper.service", "../utils/utils.class"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var lang_1 = $__require('@angular/core/src/facade/lang');
  var modal_backdrop_component_1 = $__require('./modal-backdrop.component');
  var modal_options_class_1 = $__require('./modal-options.class');
  var components_helper_service_1 = $__require('../utils/components-helper.service');
  var utils_class_1 = $__require('../utils/utils.class');
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ModalDirective = (function() {
    function ModalDirective(element, renderer, componentsHelper) {
      this.onShow = new core_1.EventEmitter();
      this.onShown = new core_1.EventEmitter();
      this.onHide = new core_1.EventEmitter();
      this.onHidden = new core_1.EventEmitter();
      this.isAnimated = true;
      this._isShown = false;
      this.isBodyOverflowing = false;
      this.originalBodyPadding = 0;
      this.scrollbarWidth = 0;
      this.element = element;
      this.renderer = renderer;
      this.componentsHelper = componentsHelper;
    }
    Object.defineProperty(ModalDirective.prototype, "config", {
      get: function() {
        return this._config;
      },
      set: function(conf) {
        this._config = this.getConfig(conf);
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ModalDirective.prototype, "isShown", {
      get: function() {
        return this._isShown;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ModalDirective.prototype, "document", {
      get: function() {
        return this.componentsHelper.getDocument();
      },
      enumerable: true,
      configurable: true
    });
    ;
    ModalDirective.prototype.onClick = function(event) {
      if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this.element.nativeElement) {
        return;
      }
      this.hide(event);
    };
    ModalDirective.prototype.onEsc = function() {
      if (this.config.keyboard) {
        this.hide();
      }
    };
    ModalDirective.prototype.ngOnDestroy = function() {
      this.config = void 0;
      this._isShown = void 0;
      this.isBodyOverflowing = void 0;
      this.originalBodyPadding = void 0;
      this.scrollbarWidth = void 0;
    };
    ModalDirective.prototype.ngAfterViewInit = function() {
      this._config = this._config || this.getConfig();
    };
    ModalDirective.prototype.toggle = function() {
      return this._isShown ? this.hide() : this.show();
    };
    ModalDirective.prototype.show = function() {
      var _this = this;
      this.onShow.emit(this);
      if (this._isShown) {
        return;
      }
      this._isShown = true;
      this.checkScrollbar();
      this.setScrollbar();
      if (this.document && this.document.body) {
        this.renderer.setElementClass(this.document.body, modal_options_class_1.ClassName.OPEN, true);
      }
      this.showBackdrop(function() {
        _this.showElement();
      });
    };
    ModalDirective.prototype.hide = function(event) {
      var _this = this;
      if (event) {
        event.preventDefault();
      }
      this.onHide.emit(this);
      if (!this._isShown) {
        return;
      }
      this._isShown = false;
      this.renderer.setElementClass(this.element.nativeElement, modal_options_class_1.ClassName.IN, false);
      if (this.isAnimated) {
        setTimeout(function() {
          return _this.hideModal();
        }, TRANSITION_DURATION);
      } else {
        this.hideModal();
      }
    };
    ModalDirective.prototype.getConfig = function(config) {
      return Object.assign({}, modal_options_class_1.modalConfigDefaults, config);
    };
    ModalDirective.prototype.showElement = function() {
      var _this = this;
      if (!this.element.nativeElement.parentNode || (this.element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE)) {
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
      this.renderer.setElementClass(this.element.nativeElement, modal_options_class_1.ClassName.IN, true);
      this.onShown.emit(this);
      var transitionComplete = function() {
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
    ModalDirective.prototype.hideModal = function() {
      var _this = this;
      this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'true');
      this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
      this.showBackdrop(function() {
        if (_this.document && _this.document.body) {
          _this.renderer.setElementClass(_this.document.body, modal_options_class_1.ClassName.OPEN, false);
        }
        _this.resetAdjustments();
        _this.resetScrollbar();
        _this.onHidden.emit(_this);
      });
    };
    ModalDirective.prototype.showBackdrop = function(callback) {
      var _this = this;
      if (this._isShown && this.config.backdrop) {
        this.backdrop = this.componentsHelper.appendNextToRoot(modal_backdrop_component_1.ModalBackdropComponent, modal_backdrop_component_1.ModalBackdropOptions, new modal_backdrop_component_1.ModalBackdropOptions({animate: false}));
        this.backdrop.then(function(backdrop) {
          if (_this.isAnimated) {
            backdrop.instance.isAnimated = _this.isAnimated;
            utils_class_1.Utils.reflow(backdrop.instance.element.nativeElement);
          }
          backdrop.instance.isShown = true;
          if (!callback) {
            return;
          }
          if (!_this.isAnimated) {
            callback();
            return;
          }
          setTimeout(callback, BACKDROP_TRANSITION_DURATION);
        });
      } else if (!this._isShown && this.backdrop) {
        this.backdrop.then(function(backdrop) {
          backdrop.instance.isShown = false;
          var callbackRemove = function() {
            _this.removeBackdrop();
            if (callback) {
              callback();
            }
          };
          if (backdrop.instance.isAnimated) {
            setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        });
      } else if (callback) {
        callback();
      }
    };
    ModalDirective.prototype.removeBackdrop = function() {
      var _this = this;
      if (this.backdrop) {
        this.backdrop.then(function(backdrop) {
          backdrop.destroy();
          _this.backdrop = void 0;
        });
      }
    };
    ModalDirective.prototype.resetAdjustments = function() {
      this.renderer.setElementStyle(this.element.nativeElement, 'paddingLeft', '');
      this.renderer.setElementStyle(this.element.nativeElement, 'paddingRight', '');
    };
    ModalDirective.prototype.checkScrollbar = function() {
      this.isBodyOverflowing = this.document.body.clientWidth < lang_1.global.innerWidth;
      this.scrollbarWidth = this.getScrollbarWidth();
    };
    ModalDirective.prototype.setScrollbar = function() {
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
        this.document.body.style.paddingRight = (bodyPadding + this.scrollbarWidth) + "px";
      }
    };
    ModalDirective.prototype.resetScrollbar = function() {
      this.document.body.style.paddingRight = this.originalBodyPadding;
    };
    ModalDirective.prototype.getScrollbarWidth = function() {
      var scrollDiv = this.renderer.createElement(this.document.body, 'div', void 0);
      scrollDiv.className = modal_options_class_1.ClassName.SCROLLBAR_MEASURER;
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      this.document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], ModalDirective.prototype, "config", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], ModalDirective.prototype, "onShow", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], ModalDirective.prototype, "onShown", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], ModalDirective.prototype, "onHide", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], ModalDirective.prototype, "onHidden", void 0);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], ModalDirective.prototype, "onClick", null);
    __decorate([core_1.HostListener('keydown.esc'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], ModalDirective.prototype, "onEsc", null);
    ModalDirective = __decorate([core_1.Directive({
      selector: '[bsModal]',
      exportAs: 'bs-modal'
    }), __param(2, core_1.Inject(components_helper_service_1.ComponentsHelper)), __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, components_helper_service_1.ComponentsHelper])], ModalDirective);
    return ModalDirective;
  }());
  exports.ModalDirective = ModalDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/modal", ["./modal/modal-backdrop.component", "./modal/modal-options.class", "./modal/modal.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./modal/modal-backdrop.component'));
  __export($__require('./modal/modal-options.class'));
  __export($__require('./modal/modal.component'));
  var modal_backdrop_component_2 = $__require('./modal/modal-backdrop.component');
  var modal_component_2 = $__require('./modal/modal.component');
  exports.MODAL_DIRECTIVES = [modal_component_2.ModalDirective, modal_backdrop_component_2.ModalBackdropComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/pagination/pagination.component", ["@angular/core", "@angular/common", "@angular/forms"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var paginationConfig = {
    maxSize: void 0,
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: true
  };
  var PAGINATION_TEMPLATE = "\n  <ul class=\"pagination\" [ngClass]=\"classMap\">\n    <li class=\"pagination-first page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(1, $event)\" [innerHTML]=\"getText('first')\"></a>\n    </li>\n\n    <li class=\"pagination-prev page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\" [innerHTML]=\"getText('previous')\"></a>\n      </li>\n\n    <li *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.active\"\n        [class.disabled]=\"disabled&&!pg.active\"\n        class=\"pagination-page page-item\">\n      <a class=\"page-link\" href (click)=\"selectPage(pg.number, $event)\" [innerHTML]=\"pg.text\"></a>\n    </li>\n\n    <li class=\"pagination-next page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noNext()\">\n      <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\" [innerHTML]=\"getText('next')\"></a></li>\n\n    <li class=\"pagination-last page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noNext()\">\n      <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\" [innerHTML]=\"getText('last')\"></a></li>\n  </ul>\n  ";
  var PaginationComponent = (function() {
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
      get: function() {
        return this._itemsPerPage;
      },
      set: function(v) {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
      get: function() {
        return this._totalItems;
      },
      set: function(v) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalPages", {
      get: function() {
        return this._totalPages;
      },
      set: function(v) {
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
      get: function() {
        return this._page;
      },
      set: function(value) {
        var _previous = this._page;
        this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
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
    PaginationComponent.prototype.ngOnInit = function() {
      this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
      this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
      this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
      this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
      this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
      this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
      this.totalPages = this.calculateTotalPages();
      this.pages = this.getPages(this.page, this.totalPages);
      this.page = this.cd.value;
      this.inited = true;
    };
    PaginationComponent.prototype.writeValue = function(value) {
      this.page = value;
      this.pages = this.getPages(this.page, this.totalPages);
    };
    PaginationComponent.prototype.getText = function(key) {
      return this[key + 'Text'] || paginationConfig[key + 'Text'];
    };
    PaginationComponent.prototype.noPrevious = function() {
      return this.page === 1;
    };
    PaginationComponent.prototype.noNext = function() {
      return this.page === this.totalPages;
    };
    PaginationComponent.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    PaginationComponent.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    PaginationComponent.prototype.selectPage = function(page, event) {
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
    PaginationComponent.prototype.makePage = function(num, text, isActive) {
      return {
        number: num,
        text: text,
        active: isActive
      };
    };
    PaginationComponent.prototype.getPages = function(currentPage, totalPages) {
      var pages = [];
      var startPage = 1;
      var endPage = totalPages;
      var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
      if (isMaxSized) {
        if (this.rotate) {
          startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
          endPage = startPage + this.maxSize - 1;
          if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - this.maxSize + 1;
          }
        } else {
          startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
          endPage = Math.min(startPage + this.maxSize - 1, totalPages);
        }
      }
      for (var num = startPage; num <= endPage; num++) {
        var page = this.makePage(num, num.toString(), num === currentPage);
        pages.push(page);
      }
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
    PaginationComponent.prototype.calculateTotalPages = function() {
      var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
      return Math.max(totalPages || 0, 1);
    };
    __decorate([core_1.Input(), __metadata('design:type', Number)], PaginationComponent.prototype, "maxSize", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], PaginationComponent.prototype, "boundaryLinks", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], PaginationComponent.prototype, "directionLinks", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], PaginationComponent.prototype, "firstText", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], PaginationComponent.prototype, "previousText", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], PaginationComponent.prototype, "nextText", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], PaginationComponent.prototype, "lastText", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], PaginationComponent.prototype, "rotate", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], PaginationComponent.prototype, "disabled", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], PaginationComponent.prototype, "numPages", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], PaginationComponent.prototype, "pageChanged", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], PaginationComponent.prototype, "itemsPerPage", null);
    __decorate([core_1.Input(), __metadata('design:type', Number)], PaginationComponent.prototype, "totalItems", null);
    PaginationComponent = __decorate([core_1.Component({
      selector: 'pagination[ngModel]',
      template: PAGINATION_TEMPLATE,
      directives: [common_1.NgFor, common_1.NgIf]
    }), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel, core_1.Renderer, core_1.ElementRef])], PaginationComponent);
    return PaginationComponent;
  }());
  exports.PaginationComponent = PaginationComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/pagination/pager.component", ["@angular/core", "@angular/common", "@angular/forms", "./pagination.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var pagination_component_1 = $__require('./pagination.component');
  var pagerConfig = {
    itemsPerPage: 10,
    previousText: '« Previous',
    nextText: 'Next »',
    align: true
  };
  var PAGER_TEMPLATE = "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.disabled]=\"noNext()\" [class.next]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
  var PagerComponent = (function(_super) {
    __extends(PagerComponent, _super);
    function PagerComponent(cd, renderer, elementRef) {
      _super.call(this, cd, renderer, elementRef);
      this.config = pagerConfig;
    }
    PagerComponent = __decorate([core_1.Component({
      selector: 'pager[ngModel]',
      template: PAGER_TEMPLATE,
      directives: [common_1.NgClass],
      inputs: ['align', 'totalItems', 'itemsPerPage', 'previousText', 'nextText']
    }), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel, core_1.Renderer, core_1.ElementRef])], PagerComponent);
    return PagerComponent;
  }(pagination_component_1.PaginationComponent));
  exports.PagerComponent = PagerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/pagination", ["./pagination/pagination.component", "./pagination/pager.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var pagination_component_1 = $__require('./pagination/pagination.component');
  var pager_component_1 = $__require('./pagination/pager.component');
  var pagination_component_2 = $__require('./pagination/pagination.component');
  exports.PaginationComponent = pagination_component_2.PaginationComponent;
  var pager_component_2 = $__require('./pagination/pager.component');
  exports.PagerComponent = pager_component_2.PagerComponent;
  exports.PAGINATION_DIRECTIVES = [pagination_component_1.PaginationComponent, pager_component_1.PagerComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/progressbar/progress.directive", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var progressConfig = {
    animate: true,
    max: 100
  };
  var ProgressDirective = (function() {
    function ProgressDirective() {
      this.addClass = true;
      this.bars = [];
    }
    Object.defineProperty(ProgressDirective.prototype, "max", {
      get: function() {
        return this._max;
      },
      set: function(v) {
        this._max = v;
        this.bars.forEach(function(bar) {
          bar.recalculatePercentage();
        });
      },
      enumerable: true,
      configurable: true
    });
    ProgressDirective.prototype.ngOnInit = function() {
      this.animate = this.animate !== false;
      this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
    };
    ProgressDirective.prototype.addBar = function(bar) {
      if (!this.animate) {
        bar.transition = 'none';
      }
      this.bars.push(bar);
    };
    ProgressDirective.prototype.removeBar = function(bar) {
      this.bars.splice(this.bars.indexOf(bar), 1);
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], ProgressDirective.prototype, "animate", void 0);
    __decorate([core_1.HostBinding('attr.max'), core_1.Input(), __metadata('design:type', Number)], ProgressDirective.prototype, "max", null);
    __decorate([core_1.HostBinding('class.progress'), __metadata('design:type', Boolean)], ProgressDirective.prototype, "addClass", void 0);
    ProgressDirective = __decorate([core_1.Directive({selector: 'bs-progress, [progress]'}), __metadata('design:paramtypes', [])], ProgressDirective);
    return ProgressDirective;
  }());
  exports.ProgressDirective = ProgressDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/progressbar/bar.component", ["@angular/core", "@angular/common", "./progress.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var progress_directive_1 = $__require('./progress.directive');
  var BarComponent = (function() {
    function BarComponent(progress) {
      this.percent = 0;
      this.progress = progress;
    }
    Object.defineProperty(BarComponent.prototype, "value", {
      get: function() {
        return this._value;
      },
      set: function(v) {
        if (!v && v !== 0) {
          return;
        }
        this._value = v;
        this.recalculatePercentage();
      },
      enumerable: true,
      configurable: true
    });
    BarComponent.prototype.ngOnInit = function() {
      this.progress.addBar(this);
    };
    BarComponent.prototype.ngOnDestroy = function() {
      this.progress.removeBar(this);
    };
    BarComponent.prototype.recalculatePercentage = function() {
      this.percent = +(100 * this.value / this.progress.max).toFixed(2);
      var totalPercentage = this.progress.bars.reduce(function(total, bar) {
        return total + bar.percent;
      }, 0);
      if (totalPercentage > 100) {
        this.percent -= totalPercentage - 100;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], BarComponent.prototype, "type", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], BarComponent.prototype, "value", null);
    BarComponent = __decorate([core_1.Component({
      selector: 'bar',
      directives: [common_1.NgClass, common_1.NgStyle],
      template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ngClass]=\"type && 'progress-bar-' + type\"\n    [ngStyle]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"><ng-content></ng-content></div>\n"
    }), __param(0, core_1.Host()), __metadata('design:paramtypes', [progress_directive_1.ProgressDirective])], BarComponent);
    return BarComponent;
  }());
  exports.BarComponent = BarComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/progressbar/progressbar.component", ["@angular/core", "./progress.directive", "./bar.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var progress_directive_1 = $__require('./progress.directive');
  var bar_component_1 = $__require('./bar.component');
  var ProgressbarComponent = (function() {
    function ProgressbarComponent() {}
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], ProgressbarComponent.prototype, "animate", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], ProgressbarComponent.prototype, "max", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], ProgressbarComponent.prototype, "type", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], ProgressbarComponent.prototype, "value", void 0);
    ProgressbarComponent = __decorate([core_1.Component({
      selector: 'progressbar',
      directives: [progress_directive_1.ProgressDirective, bar_component_1.BarComponent],
      template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  "
    }), __metadata('design:paramtypes', [])], ProgressbarComponent);
    return ProgressbarComponent;
  }());
  exports.ProgressbarComponent = ProgressbarComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/progressbar", ["./progressbar/progress.directive", "./progressbar/bar.component", "./progressbar/progressbar.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var progress_directive_1 = $__require('./progressbar/progress.directive');
  var bar_component_1 = $__require('./progressbar/bar.component');
  var progressbar_component_1 = $__require('./progressbar/progressbar.component');
  var progress_directive_2 = $__require('./progressbar/progress.directive');
  exports.ProgressDirective = progress_directive_2.ProgressDirective;
  var bar_component_2 = $__require('./progressbar/bar.component');
  exports.BarComponent = bar_component_2.BarComponent;
  var progressbar_component_2 = $__require('./progressbar/progressbar.component');
  exports.ProgressbarComponent = progressbar_component_2.ProgressbarComponent;
  exports.PROGRESSBAR_DIRECTIVES = [progress_directive_1.ProgressDirective, bar_component_1.BarComponent, progressbar_component_1.ProgressbarComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/rating/rating.component", ["@angular/core", "@angular/common", "@angular/forms", "@angular/core/src/facade/lang"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var lang_1 = $__require('@angular/core/src/facade/lang');
  var KeyboardEvent = lang_1.global.KeyboardEvent;
  var RatingComponent = (function() {
    function RatingComponent(cd) {
      this.onHover = new core_1.EventEmitter(false);
      this.onLeave = new core_1.EventEmitter(false);
      this.onChange = Function.prototype;
      this.onTouched = Function.prototype;
      this.cd = cd;
      cd.valueAccessor = this;
    }
    RatingComponent.prototype.onKeydown = function(event) {
      if ([37, 38, 39, 40].indexOf(event.which) === -1) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      var sign = event.which === 38 || event.which === 39 ? 1 : -1;
      this.rate(this.value + sign);
    };
    RatingComponent.prototype.ngOnInit = function() {
      this.max = typeof this.max !== 'undefined' ? this.max : 5;
      this.readonly = this.readonly === true;
      this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'glyphicon-star';
      this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'glyphicon-star-empty';
      this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
      this.range = this.buildTemplateObjects(this.ratingStates, this.max);
    };
    RatingComponent.prototype.writeValue = function(value) {
      if (value % 1 !== value) {
        this.value = Math.round(value);
        this.preValue = value;
        return;
      }
      this.preValue = value;
      this.value = value;
    };
    RatingComponent.prototype.enter = function(value) {
      if (!this.readonly) {
        this.value = value;
        this.onHover.emit(value);
      }
    };
    RatingComponent.prototype.reset = function() {
      this.value = this.preValue;
      this.onLeave.emit(this.value);
    };
    RatingComponent.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    RatingComponent.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    RatingComponent.prototype.buildTemplateObjects = function(ratingStates, max) {
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
    RatingComponent.prototype.rate = function(value) {
      if (!this.readonly && value >= 0 && value <= this.range.length) {
        this.writeValue(value);
        this.cd.viewToModelUpdate(value);
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Number)], RatingComponent.prototype, "max", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], RatingComponent.prototype, "stateOn", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], RatingComponent.prototype, "stateOff", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], RatingComponent.prototype, "readonly", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], RatingComponent.prototype, "titles", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], RatingComponent.prototype, "ratingStates", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], RatingComponent.prototype, "onHover", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], RatingComponent.prototype, "onLeave", void 0);
    __decorate([core_1.HostListener('keydown', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RatingComponent.prototype, "onKeydown", null);
    RatingComponent = __decorate([core_1.Component({
      selector: 'rating[ngModel]',
      directives: [common_1.NgFor],
      template: "\n    <span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\">\n      <template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\n        <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span>\n        <i (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" class=\"glyphicon\" [ngClass]=\"index < value ? r.stateOn : r.stateOff\" [title]=\"r.title\" ></i>\n      </template>\n    </span>\n  "
    }), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel])], RatingComponent);
    return RatingComponent;
  }());
  exports.RatingComponent = RatingComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/rating", ["./rating/rating.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var rating_component_1 = $__require('./rating/rating.component');
  exports.RatingComponent = rating_component_1.RatingComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tabs/tabset.component", ["@angular/core", "@angular/common", "../common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var common_2 = $__require('../common');
  var TabsetComponent = (function() {
    function TabsetComponent() {
      this.clazz = true;
      this.tabs = [];
      this.classMap = {};
    }
    Object.defineProperty(TabsetComponent.prototype, "vertical", {
      get: function() {
        return this._vertical;
      },
      set: function(value) {
        this._vertical = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(TabsetComponent.prototype, "justified", {
      get: function() {
        return this._justified;
      },
      set: function(value) {
        this._justified = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(TabsetComponent.prototype, "type", {
      get: function() {
        return this._type;
      },
      set: function(value) {
        this._type = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    TabsetComponent.prototype.ngOnInit = function() {
      this.type = this.type !== 'undefined' ? this.type : 'tabs';
    };
    TabsetComponent.prototype.ngOnDestroy = function() {
      this.isDestroyed = true;
    };
    TabsetComponent.prototype.addTab = function(tab) {
      this.tabs.push(tab);
      tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabsetComponent.prototype.removeTab = function(tab) {
      var index = this.tabs.indexOf(tab);
      if (index === -1 || this.isDestroyed) {
        return;
      }
      if (tab.active && this.hasAvailableTabs(index)) {
        var newActiveIndex = this.getClosestTabIndex(index);
        this.tabs[newActiveIndex].active = true;
      }
      tab.removed.emit(tab);
      this.tabs.splice(index, 1);
    };
    TabsetComponent.prototype.getClosestTabIndex = function(index) {
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
    TabsetComponent.prototype.hasAvailableTabs = function(index) {
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
    TabsetComponent.prototype.setClassMap = function() {
      this.classMap = (_a = {
        'nav-stacked': this.vertical,
        'nav-justified': this.justified
      }, _a['nav-' + (this.type || 'tabs')] = true, _a);
      var _a;
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TabsetComponent.prototype, "vertical", null);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TabsetComponent.prototype, "justified", null);
    __decorate([core_1.Input(), __metadata('design:type', String)], TabsetComponent.prototype, "type", null);
    __decorate([core_1.HostBinding('class.tab-container'), __metadata('design:type', Boolean)], TabsetComponent.prototype, "clazz", void 0);
    TabsetComponent = __decorate([core_1.Component({
      selector: 'tabset',
      directives: [common_1.NgClass, common_2.NgTranscludeDirective],
      template: "\n    <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"let tabz of tabs\" class=\"nav-item\"\n          [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\">\n          <a href class=\"nav-link\"\n            [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\"\n            (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"glyphicon glyphicon-remove-circle\"></span>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
    }), __metadata('design:paramtypes', [])], TabsetComponent);
    return TabsetComponent;
  }());
  exports.TabsetComponent = TabsetComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tabs/tab.directive", ["@angular/core", "./tabset.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var tabset_component_1 = $__require('./tabset.component');
  var TabDirective = (function() {
    function TabDirective(tabset) {
      this.select = new core_1.EventEmitter(false);
      this.deselect = new core_1.EventEmitter(false);
      this.removed = new core_1.EventEmitter(false);
      this.addClass = true;
      this.tabset = tabset;
      this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
      get: function() {
        return this._active;
      },
      set: function(active) {
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
        this.tabset.tabs.forEach(function(tab) {
          if (tab !== _this) {
            tab.active = false;
          }
        });
      },
      enumerable: true,
      configurable: true
    });
    TabDirective.prototype.ngOnInit = function() {
      this.removable = !!this.removable;
    };
    TabDirective.prototype.ngOnDestroy = function() {
      this.tabset.removeTab(this);
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], TabDirective.prototype, "heading", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TabDirective.prototype, "disabled", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TabDirective.prototype, "removable", void 0);
    __decorate([core_1.HostBinding('class.active'), core_1.Input(), __metadata('design:type', Boolean)], TabDirective.prototype, "active", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TabDirective.prototype, "select", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TabDirective.prototype, "deselect", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TabDirective.prototype, "removed", void 0);
    __decorate([core_1.HostBinding('class.tab-pane'), __metadata('design:type', Boolean)], TabDirective.prototype, "addClass", void 0);
    TabDirective = __decorate([core_1.Directive({selector: 'tab, [tab]'}), __metadata('design:paramtypes', [tabset_component_1.TabsetComponent])], TabDirective);
    return TabDirective;
  }());
  exports.TabDirective = TabDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tabs/tab-heading.directive", ["@angular/core", "./tab.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var tab_directive_1 = $__require('./tab.directive');
  var TabHeadingDirective = (function() {
    function TabHeadingDirective(templateRef, tab) {
      tab.headingRef = templateRef;
    }
    TabHeadingDirective = __decorate([core_1.Directive({selector: '[tabHeading]'}), __metadata('design:paramtypes', [core_1.TemplateRef, tab_directive_1.TabDirective])], TabHeadingDirective);
    return TabHeadingDirective;
  }());
  exports.TabHeadingDirective = TabHeadingDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tabs", ["./tabs/tab.directive", "./tabs/tabset.component", "./tabs/tab-heading.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var tab_directive_1 = $__require('./tabs/tab.directive');
  var tabset_component_1 = $__require('./tabs/tabset.component');
  var tab_heading_directive_1 = $__require('./tabs/tab-heading.directive');
  var tab_directive_2 = $__require('./tabs/tab.directive');
  exports.TabDirective = tab_directive_2.TabDirective;
  var tabset_component_2 = $__require('./tabs/tabset.component');
  exports.TabsetComponent = tabset_component_2.TabsetComponent;
  var tab_heading_directive_2 = $__require('./tabs/tab-heading.directive');
  exports.TabHeadingDirective = tab_heading_directive_2.TabHeadingDirective;
  exports.TAB_DIRECTIVES = [tab_directive_1.TabDirective, tab_heading_directive_1.TabHeadingDirective, tabset_component_1.TabsetComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/timepicker/timepicker.component", ["@angular/core", "@angular/common", "@angular/forms"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
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
  var TimepickerComponent = (function() {
    function TimepickerComponent(cd) {
      this.meridians = ['AM', 'PM'];
      this.onChange = Function.prototype;
      this.onTouched = Function.prototype;
      this._selected = new Date();
      this.cd = cd;
      cd.valueAccessor = this;
    }
    Object.defineProperty(TimepickerComponent.prototype, "showMeridian", {
      get: function() {
        return this._showMeridian;
      },
      set: function(value) {
        this._showMeridian = value;
        this.updateTemplate();
        return;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(TimepickerComponent.prototype, "selected", {
      get: function() {
        return this._selected;
      },
      set: function(v) {
        if (v) {
          this._selected = v;
          this.updateTemplate();
          this.cd.viewToModelUpdate(this.selected);
        }
      },
      enumerable: true,
      configurable: true
    });
    TimepickerComponent.prototype.ngOnInit = function() {
      this.meridians = def(this.meridians, isDefined, exports.timepickerConfig.meridians) || ['AM', 'PM'];
      this.mousewheel = def(this.mousewheel, isDefined, exports.timepickerConfig.mousewheel);
      if (this.mousewheel) {}
      this.arrowkeys = def(this.arrowkeys, isDefined, exports.timepickerConfig.arrowkeys);
      if (this.arrowkeys) {}
      this.readonlyInput = def(this.readonlyInput, isDefined, exports.timepickerConfig.readonlyInput);
      this.hourStep = def(this.hourStep, isDefined, exports.timepickerConfig.hourStep);
      this.minuteStep = def(this.minuteStep, isDefined, exports.timepickerConfig.minuteStep);
      this.min = def(this.min, isDefined, exports.timepickerConfig.min);
      this.max = def(this.max, isDefined, exports.timepickerConfig.max);
      this.showMeridian = def(this.showMeridian, isDefined, exports.timepickerConfig.showMeridian);
      this.showSpinners = def(this.showSpinners, isDefined, exports.timepickerConfig.showSpinners);
    };
    TimepickerComponent.prototype.writeValue = function(v) {
      if (v === this.selected) {
        return;
      }
      if (v && v instanceof Date) {
        this.selected = v;
        return;
      }
      this.selected = v ? new Date(v) : void 0;
    };
    TimepickerComponent.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    TimepickerComponent.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    TimepickerComponent.prototype.updateHours = function() {
      if (this.readonlyInput) {
        return;
      }
      var hours = this.getHoursFromTemplate();
      var minutes = this.getMinutesFromTemplate();
      this.invalidHours = !isDefined(hours);
      this.invalidMinutes = !isDefined(minutes);
      if (this.invalidHours || this.invalidMinutes) {
        return;
      }
      this.selected.setHours(hours);
      this.invalidHours = (this.selected < this.min || this.selected > this.max);
      if (this.invalidHours) {
        return;
      } else {
        this.refresh();
      }
    };
    TimepickerComponent.prototype.hoursOnBlur = function() {
      if (this.readonlyInput) {
        return;
      }
      if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
        this.hours = this.pad(this.hours);
      }
    };
    TimepickerComponent.prototype.updateMinutes = function() {
      if (this.readonlyInput) {
        return;
      }
      var minutes = this.getMinutesFromTemplate();
      var hours = this.getHoursFromTemplate();
      this.invalidMinutes = !isDefined(minutes);
      this.invalidHours = !isDefined(hours);
      if (this.invalidMinutes || this.invalidHours) {
        return;
      }
      this.selected.setMinutes(minutes);
      this.invalidMinutes = (this.selected < this.min || this.selected > this.max);
      if (this.invalidMinutes) {
        return;
      } else {
        this.refresh();
      }
    };
    TimepickerComponent.prototype.minutesOnBlur = function() {
      if (this.readonlyInput) {
        return;
      }
      if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
        this.minutes = this.pad(this.minutes);
      }
    };
    TimepickerComponent.prototype.incrementHours = function() {
      if (!this.noIncrementHours()) {
        this.addMinutesToSelected(this.hourStep * 60);
      }
    };
    TimepickerComponent.prototype.decrementHours = function() {
      if (!this.noDecrementHours()) {
        this.addMinutesToSelected(-this.hourStep * 60);
      }
    };
    TimepickerComponent.prototype.incrementMinutes = function() {
      if (!this.noIncrementMinutes()) {
        this.addMinutesToSelected(this.minuteStep);
      }
    };
    TimepickerComponent.prototype.decrementMinutes = function() {
      if (!this.noDecrementMinutes()) {
        this.addMinutesToSelected(-this.minuteStep);
      }
    };
    TimepickerComponent.prototype.toggleMeridian = function() {
      if (!this.noToggleMeridian()) {
        var sign = this.selected.getHours() < 12 ? 1 : -1;
        this.addMinutesToSelected(12 * 60 * sign);
      }
    };
    TimepickerComponent.prototype.refresh = function() {
      this.updateTemplate();
      this.cd.viewToModelUpdate(this.selected);
    };
    TimepickerComponent.prototype.updateTemplate = function() {
      var hours = this.selected.getHours();
      var minutes = this.selected.getMinutes();
      if (this.showMeridian) {
        hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
      }
      this.hours = this.pad(hours);
      this.minutes = this.pad(minutes);
      this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
    };
    TimepickerComponent.prototype.getHoursFromTemplate = function() {
      var hours = parseInt(this.hours, 10);
      var valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
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
    TimepickerComponent.prototype.getMinutesFromTemplate = function() {
      var minutes = parseInt(this.minutes, 10);
      return (minutes >= 0 && minutes < 60) ? minutes : undefined;
    };
    TimepickerComponent.prototype.pad = function(value) {
      return (isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
    };
    TimepickerComponent.prototype.noIncrementHours = function() {
      var incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
      return incrementedSelected > this.max || (incrementedSelected < this.selected && incrementedSelected < this.min);
    };
    TimepickerComponent.prototype.noDecrementHours = function() {
      var decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
      return decrementedSelected < this.min || (decrementedSelected > this.selected && decrementedSelected > this.max);
    };
    TimepickerComponent.prototype.noIncrementMinutes = function() {
      var incrementedSelected = addMinutes(this.selected, this.minuteStep);
      return incrementedSelected > this.max || (incrementedSelected < this.selected && incrementedSelected < this.min);
    };
    TimepickerComponent.prototype.noDecrementMinutes = function() {
      var decrementedSelected = addMinutes(this.selected, -this.minuteStep);
      return decrementedSelected < this.min || (decrementedSelected > this.selected && decrementedSelected > this.max);
    };
    TimepickerComponent.prototype.addMinutesToSelected = function(minutes) {
      this.selected = addMinutes(this.selected, minutes);
      this.refresh();
    };
    TimepickerComponent.prototype.noToggleMeridian = function() {
      if (this.selected.getHours() < 13) {
        return addMinutes(this.selected, 12 * 60) > this.max;
      } else {
        return addMinutes(this.selected, -12 * 60) < this.min;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimepickerComponent.prototype, "hourStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimepickerComponent.prototype, "minuteStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimepickerComponent.prototype, "readonlyInput", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimepickerComponent.prototype, "mousewheel", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimepickerComponent.prototype, "arrowkeys", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimepickerComponent.prototype, "showSpinners", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimepickerComponent.prototype, "min", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimepickerComponent.prototype, "max", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], TimepickerComponent.prototype, "meridians", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimepickerComponent.prototype, "showMeridian", null);
    TimepickerComponent = __decorate([core_1.Component({
      selector: 'timepicker[ngModel]',
      directives: [common_1.NgClass],
      template: "\n    <table>\n      <tbody>\n        <tr class=\"text-center\" [ngClass]=\"{hidden: !showSpinners}\">\n          <td><a (click)=\"incrementHours()\" [ngClass]=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"incrementMinutes()\" [ngClass]=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" *ngIf=\"showMeridian\"></td>\n        </tr>\n        <tr>\n          <td class=\"form-group\" [ngClass]=\"{'has-error': invalidHours}\">\n            <input style=\"width:50px;\" type=\"text\" [(ngModel)]=\"hours\" (change)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"hoursOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td>:</td>\n          <td class=\"form-group\" [ngClass]=\"{'has-error': invalidMinutes}\">\n            <input style=\"width:50px;\" type=\"text\" [(ngModel)]=\"minutes\" (change)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"minutesOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" *ngIf=\"showMeridian\"><button type=\"button\" [ngClass]=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n        </tr>\n        <tr class=\"text-center\" [ngClass]=\"{hidden: !showSpinners}\">\n          <td><a (click)=\"decrementHours()\" [ngClass]=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"decrementMinutes()\" [ngClass]=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" *ngIf=\"showMeridian\"></td>\n        </tr>\n      </tbody>\n    </table>\n  "
    }), __param(0, core_1.Self()), __metadata('design:paramtypes', [forms_1.NgModel])], TimepickerComponent);
    return TimepickerComponent;
  }());
  exports.TimepickerComponent = TimepickerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/timepicker", ["./timepicker/timepicker.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var timepicker_component_1 = $__require('./timepicker/timepicker.component');
  exports.TimepickerComponent = timepicker_component_1.TimepickerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tooltip/tooltip.directive", ["@angular/core", "./tooltip-options.class", "./tooltip-container.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var tooltip_options_class_1 = $__require('./tooltip-options.class');
  var tooltip_container_component_1 = $__require('./tooltip-container.component');
  var TooltipDirective = (function() {
    function TooltipDirective(viewContainerRef, loader) {
      this.placement = 'top';
      this.enable = true;
      this.animation = true;
      this.visible = false;
      this.viewContainerRef = viewContainerRef;
      this.loader = loader;
    }
    TooltipDirective.prototype.show = function() {
      if (this.visible || !this.enable) {
        return;
      }
      this.visible = true;
      var options = new tooltip_options_class_1.TooltipOptions({
        content: this.content,
        htmlContent: this.htmlContent,
        placement: this.placement,
        animation: this.animation,
        hostEl: this.viewContainerRef.element,
        popupClass: this.popupClass
      });
      var binding = core_1.ReflectiveInjector.resolve([new core_1.Provider(tooltip_options_class_1.TooltipOptions, {useValue: options})]);
      this.tooltip = this.loader.loadNextToLocation(tooltip_container_component_1.TooltipContainerComponent, this.viewContainerRef, binding).then(function(componentRef) {
        return componentRef;
      });
    };
    TooltipDirective.prototype.hide = function() {
      if (!this.visible) {
        return;
      }
      this.visible = false;
      this.tooltip.then(function(componentRef) {
        componentRef.destroy();
        return componentRef;
      });
    };
    __decorate([core_1.Input('tooltip'), __metadata('design:type', String)], TooltipDirective.prototype, "content", void 0);
    __decorate([core_1.Input('tooltipHtml'), __metadata('design:type', String)], TooltipDirective.prototype, "htmlContent", void 0);
    __decorate([core_1.Input('tooltipPlacement'), __metadata('design:type', String)], TooltipDirective.prototype, "placement", void 0);
    __decorate([core_1.Input('tooltipIsOpen'), __metadata('design:type', Boolean)], TooltipDirective.prototype, "isOpen", void 0);
    __decorate([core_1.Input('tooltipEnable'), __metadata('design:type', Boolean)], TooltipDirective.prototype, "enable", void 0);
    __decorate([core_1.Input('tooltipAnimation'), __metadata('design:type', Boolean)], TooltipDirective.prototype, "animation", void 0);
    __decorate([core_1.Input('tooltipAppendToBody'), __metadata('design:type', Boolean)], TooltipDirective.prototype, "appendToBody", void 0);
    __decorate([core_1.Input('tooltipClass'), __metadata('design:type', String)], TooltipDirective.prototype, "popupClass", void 0);
    __decorate([core_1.HostListener('focusin', ['$event', '$target']), core_1.HostListener('mouseenter', ['$event', '$target']), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], TooltipDirective.prototype, "show", null);
    __decorate([core_1.HostListener('focusout', ['$event', '$target']), core_1.HostListener('mouseleave', ['$event', '$target']), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], TooltipDirective.prototype, "hide", null);
    TooltipDirective = __decorate([core_1.Directive({selector: '[tooltip], [tooltipHtml]'}), __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.DynamicComponentLoader])], TooltipDirective);
    return TooltipDirective;
  }());
  exports.TooltipDirective = TooltipDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tooltip/tooltip-options.class", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var TooltipOptions = (function() {
    function TooltipOptions(options) {
      Object.assign(this, options);
    }
    TooltipOptions = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [Object])], TooltipOptions);
    return TooltipOptions;
  }());
  exports.TooltipOptions = TooltipOptions;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tooltip/tooltip-container.component", ["@angular/core", "@angular/common", "../position", "./tooltip-options.class"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var position_1 = $__require('../position');
  var tooltip_options_class_1 = $__require('./tooltip-options.class');
  var TooltipContainerComponent = (function() {
    function TooltipContainerComponent(element, cdr, options) {
      this.top = '-1000px';
      this.left = '-1000px';
      this.display = 'block';
      this.element = element;
      this.cdr = cdr;
      Object.assign(this, options);
      this.classMap = {
        'in': false,
        'fade': false
      };
      this.classMap[options.placement] = true;
      this.classMap['tooltip-' + options.placement] = true;
    }
    TooltipContainerComponent.prototype.ngAfterViewInit = function() {
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
    TooltipContainerComponent = __decorate([core_1.Component({
      selector: 'tooltip-container',
      directives: [common_1.NgClass, common_1.NgStyle],
      template: "<div class=\"tooltip\" role=\"tooltip\"\n     [ngStyle]=\"{top: top, left: left, display: display}\"\n     [ngClass]=\"classMap\">\n      <div class=\"tooltip-arrow\"></div>\n      <div class=\"tooltip-inner\"\n           *ngIf=\"htmlContent\" \n           innerHtml=\"{{htmlContent}}\">\n      </div>\n      <div class=\"tooltip-inner\"\n           *ngIf=\"content\">\n        {{content}}\n      </div>\n    </div>"
    }), __param(2, core_1.Inject(tooltip_options_class_1.TooltipOptions)), __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef, tooltip_options_class_1.TooltipOptions])], TooltipContainerComponent);
    return TooltipContainerComponent;
  }());
  exports.TooltipContainerComponent = TooltipContainerComponent;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/tooltip", ["./tooltip/tooltip.directive", "./tooltip/tooltip-container.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var tooltip_directive_1 = $__require('./tooltip/tooltip.directive');
  var tooltip_container_component_1 = $__require('./tooltip/tooltip-container.component');
  var tooltip_directive_2 = $__require('./tooltip/tooltip.directive');
  exports.TooltipDirective = tooltip_directive_2.TooltipDirective;
  var tooltip_container_component_2 = $__require('./tooltip/tooltip-container.component');
  exports.TooltipContainerComponent = tooltip_container_component_2.TooltipContainerComponent;
  exports.TOOLTIP_DIRECTIVES = [tooltip_directive_1.TooltipDirective, tooltip_container_component_1.TooltipContainerComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/typeahead/typeahead.directive", ["@angular/core", "@angular/forms", "./typeahead-utils", "./typeahead-container.component", "./typeahead-options.class", "rxjs/Observable", "rxjs/add/observable/from", "rxjs/add/operator/debounceTime", "rxjs/add/operator/filter", "rxjs/add/operator/map", "rxjs/add/operator/mergeMap", "rxjs/add/operator/toArray", "@angular/core/src/facade/lang"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var forms_1 = $__require('@angular/forms');
  var typeahead_utils_1 = $__require('./typeahead-utils');
  var typeahead_container_component_1 = $__require('./typeahead-container.component');
  var typeahead_options_class_1 = $__require('./typeahead-options.class');
  var Observable_1 = $__require('rxjs/Observable');
  $__require('rxjs/add/observable/from');
  $__require('rxjs/add/operator/debounceTime');
  $__require('rxjs/add/operator/filter');
  $__require('rxjs/add/operator/map');
  $__require('rxjs/add/operator/mergeMap');
  $__require('rxjs/add/operator/toArray');
  var lang_1 = $__require('@angular/core/src/facade/lang');
  var KeyboardEvent = lang_1.global.KeyboardEvent;
  var TypeaheadDirective = (function() {
    function TypeaheadDirective(control, viewContainerRef, element, renderer, loader) {
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
      this.loader = loader;
    }
    TypeaheadDirective.prototype.onChange = function(e) {
      if (this.container) {
        if (e.keyCode === 27) {
          this.hide();
          return;
        }
        if (e.keyCode === 38) {
          this.container.prevActiveMatch();
          return;
        }
        if (e.keyCode === 40) {
          this.container.nextActiveMatch();
          return;
        }
        if (e.keyCode === 13) {
          this.container.selectActiveMatch();
          return;
        }
      }
      if (e.target.value.trim().length >= this.typeaheadMinLength) {
        this.typeaheadLoading.emit(true);
        this.keyUpEventEmitter.emit(e.target.value);
      } else {
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(false);
        this.hide();
      }
    };
    TypeaheadDirective.prototype.onFocus = function() {
      if (this.typeaheadMinLength === 0) {
        this.typeaheadLoading.emit(true);
        this.keyUpEventEmitter.emit('');
      }
    };
    TypeaheadDirective.prototype.onBlur = function() {
      if (this.container && !this.container.isFocused) {
        this.hide();
      }
    };
    TypeaheadDirective.prototype.onKeydown = function(e) {
      if (!this.container) {
        return;
      }
      if (e.keyCode === 13) {
        e.preventDefault();
        return;
      }
      if (e.keyCode === 9) {
        this.hide();
        return;
      }
    };
    TypeaheadDirective.prototype.ngOnInit = function() {
      this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
      this.typeaheadMinLength = this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
      this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
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
    TypeaheadDirective.prototype.changeModel = function(value) {
      var valueStr = ((typeof value === 'object' && this.typeaheadOptionField) ? value[this.typeaheadOptionField] : value).toString();
      this.ngControl.viewToModelUpdate(valueStr);
      this.ngControl.control.updateValue(valueStr);
      this.hide();
    };
    Object.defineProperty(TypeaheadDirective.prototype, "matches", {
      get: function() {
        return this._matches;
      },
      enumerable: true,
      configurable: true
    });
    TypeaheadDirective.prototype.show = function(matches) {
      var _this = this;
      var options = new typeahead_options_class_1.TypeaheadOptions({
        typeaheadRef: this,
        placement: this.placement,
        animation: false
      });
      var binding = core_1.ReflectiveInjector.resolve([core_1.provide(typeahead_options_class_1.TypeaheadOptions, {useValue: options})]);
      this.popup = this.loader.loadNextToLocation(typeahead_container_component_1.TypeaheadContainerComponent, this.viewContainerRef, binding).then(function(componentRef) {
        componentRef.instance.position(_this.viewContainerRef.element);
        _this.container = componentRef.instance;
        _this.container.parent = _this;
        var normalizedQuery = (_this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(_this.ngControl.control.value) : _this.ngControl.control.value).toString().toLowerCase();
        _this.container.query = _this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, _this.typeaheadWordDelimiters, _this.typeaheadPhraseDelimiters) : normalizedQuery;
        _this.container.matches = matches;
        _this.container.field = _this.typeaheadOptionField;
        _this.element.nativeElement.focus();
        return componentRef;
      });
    };
    TypeaheadDirective.prototype.hide = function() {
      var _this = this;
      if (this.container) {
        this.popup.then(function(componentRef) {
          componentRef.destroy();
          _this.container = void 0;
          return componentRef;
        });
      }
    };
    TypeaheadDirective.prototype.asyncActions = function() {
      var _this = this;
      this.keyUpEventEmitter.debounceTime(this.typeaheadWaitMs).mergeMap(function() {
        return _this.typeahead;
      }).subscribe(function(matches) {
        _this._matches = matches.slice(0, _this.typeaheadOptionsLimit);
        _this.finalizeAsyncCall();
      }, function(err) {
        console.error(err);
      });
    };
    TypeaheadDirective.prototype.syncActions = function() {
      var _this = this;
      this.keyUpEventEmitter.debounceTime(this.typeaheadWaitMs).mergeMap(function(value) {
        var normalizedQuery = _this.normalizeQuery(value);
        return Observable_1.Observable.from(_this.typeahead).filter(function(option) {
          return option && _this.testMatch(_this.prepareOption(option).toLowerCase(), normalizedQuery);
        }).toArray();
      }).subscribe(function(matches) {
        _this._matches = matches.slice(0, _this.typeaheadOptionsLimit);
        _this.finalizeAsyncCall();
      }, function(err) {
        console.error(err);
      });
    };
    TypeaheadDirective.prototype.prepareOption = function(option) {
      var match;
      if (typeof option === 'object' && option[this.typeaheadOptionField]) {
        match = this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(option[this.typeaheadOptionField].toString()) : option[this.typeaheadOptionField].toString();
      }
      if (typeof option === 'string') {
        match = this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(option.toString()) : option.toString();
      }
      return match;
    };
    TypeaheadDirective.prototype.normalizeQuery = function(value) {
      var normalizedQuery = (this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(value) : value).toString().toLowerCase();
      normalizedQuery = this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
      return normalizedQuery;
    };
    TypeaheadDirective.prototype.testMatch = function(match, test) {
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
    TypeaheadDirective.prototype.finalizeAsyncCall = function() {
      this.typeaheadLoading.emit(false);
      this.typeaheadNoResults.emit(this.matches.length <= 0);
      if (this._matches.length <= 0) {
        this.hide();
        return;
      }
      if (this.container && this._matches.length > 0) {
        var normalizedQuery = (this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.ngControl.control.value) : this.ngControl.control.value).toString().toLowerCase();
        this.container.query = this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
        this.container.matches = this._matches;
      }
      if (!this.container && this._matches.length > 0) {
        this.show(this._matches);
      }
    };
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TypeaheadDirective.prototype, "typeaheadLoading", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TypeaheadDirective.prototype, "typeaheadNoResults", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TypeaheadDirective.prototype, "typeaheadOnSelect", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], TypeaheadDirective.prototype, "typeahead", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TypeaheadDirective.prototype, "typeaheadMinLength", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TypeaheadDirective.prototype, "typeaheadWaitMs", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TypeaheadDirective.prototype, "typeaheadOptionsLimit", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TypeaheadDirective.prototype, "typeaheadOptionField", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TypeaheadDirective.prototype, "typeaheadAsync", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TypeaheadDirective.prototype, "typeaheadLatinize", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TypeaheadDirective.prototype, "typeaheadSingleWords", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TypeaheadDirective.prototype, "typeaheadWordDelimiters", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TypeaheadDirective.prototype, "typeaheadPhraseDelimiters", void 0);
    __decorate([core_1.HostListener('keyup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], TypeaheadDirective.prototype, "onChange", null);
    __decorate([core_1.HostListener('focus', ['$event.target']), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], TypeaheadDirective.prototype, "onFocus", null);
    __decorate([core_1.HostListener('blur'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], TypeaheadDirective.prototype, "onBlur", null);
    __decorate([core_1.HostListener('keydown', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], TypeaheadDirective.prototype, "onKeydown", null);
    TypeaheadDirective = __decorate([core_1.Directive({selector: '[typeahead][ngModel],[typeahead][formControlName]'}), __metadata('design:paramtypes', [forms_1.NgControl, core_1.ViewContainerRef, core_1.ElementRef, core_1.Renderer, core_1.DynamicComponentLoader])], TypeaheadDirective);
    return TypeaheadDirective;
  }());
  exports.TypeaheadDirective = TypeaheadDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/typeahead/latin-map", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
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

System.registerDynamic("ng2-bootstrap/components/typeahead/typeahead-utils", ["./latin-map"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var latin_map_1 = $__require('./latin-map');
  var TypeaheadUtils = (function() {
    function TypeaheadUtils() {}
    TypeaheadUtils.latinize = function(str) {
      if (!str) {
        return '';
      }
      return str.replace(/[^A-Za-z0-9\[\] ]/g, function(a) {
        return TypeaheadUtils.latinMap[a] || a;
      });
    };
    TypeaheadUtils.escapeRegexp = function(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    TypeaheadUtils.tokenize = function(str, wordRegexDelimiters, phraseRegexDelimiters) {
      if (wordRegexDelimiters === void 0) {
        wordRegexDelimiters = ' ';
      }
      if (phraseRegexDelimiters === void 0) {
        phraseRegexDelimiters = '';
      }
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
    TypeaheadUtils.latinMap = latin_map_1.latinMap;
    return TypeaheadUtils;
  }());
  exports.TypeaheadUtils = TypeaheadUtils;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/typeahead/typeahead-container.component", ["@angular/core", "@angular/common", "./typeahead-utils", "./typeahead-options.class", "../position", "../ng2-bootstrap-config"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var typeahead_utils_1 = $__require('./typeahead-utils');
  var typeahead_options_class_1 = $__require('./typeahead-options.class');
  var position_1 = $__require('../position');
  var ng2_bootstrap_config_1 = $__require('../ng2-bootstrap-config');
  var TEMPLATE = (_a = {}, _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n  <div class=\"dropdown-menu\"\n       style=\"display: block\"\n      [ngStyle]=\"{top: top, left: left, display: display}\"\n      (mouseleave)=\"focusLost()\">\n      <a href=\"#\"\n         *ngFor=\"let match of matches\"\n         class=\"dropdown-item\"\n         (click)=\"selectMatch(match, $event)\"\n         (mouseenter)=\"selectActive(match)\"\n         [class.active]=\"isActive(match)\"\n         [innerHtml]=\"hightlight(match, query)\"></a>\n  </div>\n  ", _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n  <ul class=\"dropdown-menu\"\n      style=\"display: block\"\n      [ngStyle]=\"{top: top, left: left, display: display}\"\n      (mouseleave)=\"focusLost()\">\n    <li *ngFor=\"let match of matches\"\n        [class.active]=\"isActive(match)\"\n        (mouseenter)=\"selectActive(match)\">\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\" [innerHtml]=\"hightlight(match, query)\"></a>\n    </li>\n  </ul>\n  ", _a);
  var TypeaheadContainerComponent = (function() {
    function TypeaheadContainerComponent(element, options) {
      this.isFocused = false;
      this._matches = [];
      this.element = element;
      Object.assign(this, options);
    }
    Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
      get: function() {
        return this._matches;
      },
      set: function(value) {
        this._matches = value;
        if (this._matches.length > 0) {
          this._active = this._matches[0];
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "field", {
      set: function(value) {
        this._field = value;
      },
      enumerable: true,
      configurable: true
    });
    TypeaheadContainerComponent.prototype.position = function(hostEl) {
      this.display = 'block';
      this.top = '0px';
      this.left = '0px';
      var p = position_1.positionService.positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
      this.top = p.top + 'px';
      this.left = p.left + 'px';
    };
    TypeaheadContainerComponent.prototype.selectActiveMatch = function() {
      this.selectMatch(this._active);
    };
    TypeaheadContainerComponent.prototype.prevActiveMatch = function() {
      var index = this.matches.indexOf(this._active);
      this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
    };
    TypeaheadContainerComponent.prototype.nextActiveMatch = function() {
      var index = this.matches.indexOf(this._active);
      this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
    };
    TypeaheadContainerComponent.prototype.selectActive = function(value) {
      this.isFocused = true;
      this._active = value;
    };
    TypeaheadContainerComponent.prototype.hightlight = function(item, query) {
      var itemStr = (typeof item === 'object' && this._field ? item[this._field] : item).toString();
      var itemStrHelper = (this.parent.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(itemStr) : itemStr).toLowerCase();
      var startIdx;
      var tokenLen;
      if (typeof query === 'object') {
        var queryLen = query.length;
        for (var i = 0; i < queryLen; i += 1) {
          startIdx = itemStrHelper.indexOf(query[i]);
          tokenLen = query[i].length;
          if (startIdx >= 0 && tokenLen > 0) {
            itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
            itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
          }
        }
      } else if (query) {
        startIdx = itemStrHelper.indexOf(query);
        tokenLen = query.length;
        if (startIdx >= 0 && tokenLen > 0) {
          itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
        }
      }
      return itemStr;
    };
    TypeaheadContainerComponent.prototype.focusLost = function() {
      this.isFocused = false;
    };
    TypeaheadContainerComponent.prototype.isActive = function(value) {
      return this._active === value;
    };
    TypeaheadContainerComponent.prototype.selectMatch = function(value, e) {
      var _this = this;
      if (e === void 0) {
        e = void 0;
      }
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      this.parent.changeModel(value);
      setTimeout(function() {
        return _this.parent.typeaheadOnSelect.emit({item: value});
      }, 0);
      return false;
    };
    TypeaheadContainerComponent = __decorate([core_1.Component({
      selector: 'typeahead-container',
      directives: [common_1.CORE_DIRECTIVES],
      template: TEMPLATE[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme],
      encapsulation: core_1.ViewEncapsulation.None
    }), __metadata('design:paramtypes', [core_1.ElementRef, typeahead_options_class_1.TypeaheadOptions])], TypeaheadContainerComponent);
    return TypeaheadContainerComponent;
  }());
  exports.TypeaheadContainerComponent = TypeaheadContainerComponent;
  var _a;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/typeahead/typeahead-options.class", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var TypeaheadOptions = (function() {
    function TypeaheadOptions(options) {
      Object.assign(this, options);
    }
    return TypeaheadOptions;
  }());
  exports.TypeaheadOptions = TypeaheadOptions;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/typeahead", ["./typeahead/typeahead.directive", "./typeahead/typeahead-container.component", "./typeahead/typeahead-options.class"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var typeahead_directive_1 = $__require('./typeahead/typeahead.directive');
  var typeahead_container_component_1 = $__require('./typeahead/typeahead-container.component');
  var typeahead_directive_2 = $__require('./typeahead/typeahead.directive');
  exports.TypeaheadDirective = typeahead_directive_2.TypeaheadDirective;
  var typeahead_container_component_2 = $__require('./typeahead/typeahead-container.component');
  exports.TypeaheadContainerComponent = typeahead_container_component_2.TypeaheadContainerComponent;
  var typeahead_options_class_1 = $__require('./typeahead/typeahead-options.class');
  exports.TypeaheadOptions = typeahead_options_class_1.TypeaheadOptions;
  exports.TYPEAHEAD_DIRECTIVES = [typeahead_directive_1.TypeaheadDirective, typeahead_container_component_1.TypeaheadContainerComponent];
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/utils/components-helper.service", ["@angular/core", "@angular/platform-browser"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var platform_browser_1 = $__require('@angular/platform-browser');
  var ComponentsHelper = (function() {
    function ComponentsHelper(applicationRef, componentResolver, injector) {
      this.applicationRef = applicationRef;
      this.componentResolver = componentResolver;
      this.injector = injector;
    }
    ComponentsHelper.prototype.getDocument = function() {
      return this.injector.get(platform_browser_1.DOCUMENT);
    };
    ComponentsHelper.prototype.getRootViewContainerRef = function() {
      var classOfRootComponent = this.applicationRef.componentTypes[0];
      var appInstance = this.injector.get(classOfRootComponent);
      return appInstance.viewContainerRef;
    };
    ComponentsHelper.prototype.appendNextToRoot = function(ComponentClass, ComponentOptionsClass, options, _viewContainerRef) {
      var _this = this;
      return this.componentResolver.resolveComponent(ComponentClass).then(function(componentFactory) {
        var viewContainerRef = _viewContainerRef || _this.getRootViewContainerRef();
        var bindings = core_1.ReflectiveInjector.resolve([new core_1.Provider(ComponentOptionsClass, {useValue: options})]);
        var ctxInjector = viewContainerRef.parentInjector;
        var childInjector = Array.isArray(bindings) && bindings.length > 0 ? core_1.ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
        return viewContainerRef.createComponent(componentFactory, viewContainerRef.length, childInjector);
      });
    };
    ComponentsHelper = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [core_1.ApplicationRef, core_1.ComponentResolver, core_1.Injector])], ComponentsHelper);
    return ComponentsHelper;
  }());
  exports.ComponentsHelper = ComponentsHelper;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/position", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var PositionService = (function() {
    function PositionService() {}
    PositionService.prototype.position = function(nativeEl) {
      var elBCR = this.offset(nativeEl);
      var offsetParentBCR = {
        top: 0,
        left: 0
      };
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
    PositionService.prototype.offset = function(nativeEl) {
      var boundingClientRect = nativeEl.getBoundingClientRect();
      return {
        width: boundingClientRect.width || nativeEl.offsetWidth,
        height: boundingClientRect.height || nativeEl.offsetHeight,
        top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
        left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
      };
    };
    PositionService.prototype.positionElements = function(hostEl, targetEl, positionStr, appendToBody) {
      var positionStrParts = positionStr.split('-');
      var pos0 = positionStrParts[0];
      var pos1 = positionStrParts[1] || 'center';
      var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
      var targetElWidth = targetEl.offsetWidth;
      var targetElHeight = targetEl.offsetHeight;
      var shiftWidth = {
        center: function() {
          return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
        },
        left: function() {
          return hostElPos.left;
        },
        right: function() {
          return hostElPos.left + hostElPos.width;
        }
      };
      var shiftHeight = {
        center: function() {
          return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
        },
        top: function() {
          return hostElPos.top;
        },
        bottom: function() {
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
      get: function() {
        return window;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PositionService.prototype, "document", {
      get: function() {
        return window.document;
      },
      enumerable: true,
      configurable: true
    });
    PositionService.prototype.getStyle = function(nativeEl, cssProp) {
      if (nativeEl.currentStyle) {
        return nativeEl.currentStyle[cssProp];
      }
      if (this.window.getComputedStyle) {
        return this.window.getComputedStyle(nativeEl)[cssProp];
      }
      return nativeEl.style[cssProp];
    };
    PositionService.prototype.isStaticPositioned = function(nativeEl) {
      return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    };
    PositionService.prototype.parentOffsetEl = function(nativeEl) {
      var offsetParent = nativeEl.offsetParent || this.document;
      while (offsetParent && offsetParent !== this.document && this.isStaticPositioned(offsetParent)) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || this.document;
    };
    ;
    return PositionService;
  }());
  exports.PositionService = PositionService;
  exports.positionService = new PositionService();
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/common", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var NgTranscludeDirective = (function() {
    function NgTranscludeDirective(_viewRef) {
      this.viewRef = _viewRef;
    }
    Object.defineProperty(NgTranscludeDirective.prototype, "ngTransclude", {
      get: function() {
        return this._ngTransclude;
      },
      set: function(templateRef) {
        this._ngTransclude = templateRef;
        if (templateRef) {
          this.viewRef.createEmbeddedView(templateRef);
        }
      },
      enumerable: true,
      configurable: true
    });
    NgTranscludeDirective = __decorate([core_1.Directive({
      selector: '[ngTransclude]',
      properties: ['ngTransclude']
    }), __param(0, core_1.Inject(core_1.ViewContainerRef)), __metadata('design:paramtypes', [core_1.ViewContainerRef])], NgTranscludeDirective);
    return NgTranscludeDirective;
  }());
  exports.NgTranscludeDirective = NgTranscludeDirective;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/components/ng2-bootstrap-config", ["@angular/core/src/facade/lang"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('@angular/core/src/facade/lang');
  (function(Ng2BootstrapTheme) {
    Ng2BootstrapTheme[Ng2BootstrapTheme["BS3"] = 1] = "BS3";
    Ng2BootstrapTheme[Ng2BootstrapTheme["BS4"] = 2] = "BS4";
  })(exports.Ng2BootstrapTheme || (exports.Ng2BootstrapTheme = {}));
  var Ng2BootstrapTheme = exports.Ng2BootstrapTheme;
  var Ng2BootstrapConfig = (function() {
    function Ng2BootstrapConfig() {}
    Object.defineProperty(Ng2BootstrapConfig, "theme", {
      get: function() {
        if (lang_1.global && lang_1.global.__theme === 'bs4') {
          return Ng2BootstrapTheme.BS4;
        }
        return (this._theme || Ng2BootstrapTheme.BS3);
      },
      set: function(v) {
        this._theme = v;
      },
      enumerable: true,
      configurable: true
    });
    return Ng2BootstrapConfig;
  }());
  exports.Ng2BootstrapConfig = Ng2BootstrapConfig;
  return module.exports;
});

System.registerDynamic("ng2-bootstrap/ng2-bootstrap", ["./components/accordion", "./components/alert", "./components/buttons", "./components/carousel", "./components/collapse", "./components/datepicker", "./components/dropdown", "./components/modal", "./components/pagination", "./components/progressbar", "./components/rating", "./components/tabs", "./components/timepicker", "./components/tooltip", "./components/typeahead", "./components/utils/components-helper.service", "./components/position", "./components/common", "./components/ng2-bootstrap-config"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var accordion_1 = $__require('./components/accordion');
  var alert_1 = $__require('./components/alert');
  var buttons_1 = $__require('./components/buttons');
  var carousel_1 = $__require('./components/carousel');
  var collapse_1 = $__require('./components/collapse');
  var datepicker_1 = $__require('./components/datepicker');
  var dropdown_1 = $__require('./components/dropdown');
  var modal_1 = $__require('./components/modal');
  var pagination_1 = $__require('./components/pagination');
  var progressbar_1 = $__require('./components/progressbar');
  var rating_1 = $__require('./components/rating');
  var tabs_1 = $__require('./components/tabs');
  var timepicker_1 = $__require('./components/timepicker');
  var tooltip_1 = $__require('./components/tooltip');
  var typeahead_1 = $__require('./components/typeahead');
  var components_helper_service_1 = $__require('./components/utils/components-helper.service');
  __export($__require('./components/accordion'));
  __export($__require('./components/alert'));
  __export($__require('./components/buttons'));
  __export($__require('./components/carousel'));
  __export($__require('./components/collapse'));
  __export($__require('./components/datepicker'));
  __export($__require('./components/modal'));
  __export($__require('./components/dropdown'));
  __export($__require('./components/pagination'));
  __export($__require('./components/progressbar'));
  __export($__require('./components/rating'));
  __export($__require('./components/tabs'));
  __export($__require('./components/timepicker'));
  __export($__require('./components/tooltip'));
  __export($__require('./components/typeahead'));
  __export($__require('./components/position'));
  __export($__require('./components/common'));
  __export($__require('./components/ng2-bootstrap-config'));
  exports.BS_VIEW_PROVIDERS = [{
    provide: components_helper_service_1.ComponentsHelper,
    useClass: components_helper_service_1.ComponentsHelper
  }];
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    directives: [alert_1.AlertComponent, accordion_1.ACCORDION_DIRECTIVES, buttons_1.BUTTON_DIRECTIVES, carousel_1.CAROUSEL_DIRECTIVES, collapse_1.CollapseDirective, datepicker_1.DATEPICKER_DIRECTIVES, dropdown_1.DROPDOWN_DIRECTIVES, modal_1.MODAL_DIRECTIVES, pagination_1.PAGINATION_DIRECTIVES, progressbar_1.PROGRESSBAR_DIRECTIVES, rating_1.RatingComponent, tabs_1.TAB_DIRECTIVES, timepicker_1.TimepickerComponent, tooltip_1.TOOLTIP_DIRECTIVES, typeahead_1.TYPEAHEAD_DIRECTIVES],
    providers: [components_helper_service_1.ComponentsHelper]
  };
  return module.exports;
});

//# sourceMappingURL=ng2-bootstrap.js.map