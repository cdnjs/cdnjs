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
System.register("services/formly.event.emitter", ["rxjs/Subject"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1;
    var FormlyValueChangeEvent, FormlyEventEmitter, FormlyPubSub;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            FormlyValueChangeEvent = (function () {
                function FormlyValueChangeEvent(key, value) {
                    this.key = key;
                    this.value = value;
                }
                return FormlyValueChangeEvent;
            }());
            exports_1("FormlyValueChangeEvent", FormlyValueChangeEvent);
            FormlyEventEmitter = (function (_super) {
                __extends(FormlyEventEmitter, _super);
                function FormlyEventEmitter() {
                    _super.apply(this, arguments);
                }
                FormlyEventEmitter.prototype.emit = function (value) {
                    _super.prototype.next.call(this, value);
                };
                return FormlyEventEmitter;
            }(Subject_1.Subject));
            exports_1("FormlyEventEmitter", FormlyEventEmitter);
            FormlyPubSub = (function () {
                function FormlyPubSub() {
                    this.emitters = {};
                }
                FormlyPubSub.prototype.setEmitter = function (key, emitter) {
                    this.emitters[key] = emitter;
                };
                FormlyPubSub.prototype.getEmitter = function (key) {
                    return this.emitters[key];
                };
                return FormlyPubSub;
            }());
            exports_1("FormlyPubSub", FormlyPubSub);
        }
    }
});
System.register("components/formly.field.config", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("services/formly.config", ["@angular/core"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1;
    var FormlyConfig;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FormlyConfig = (function () {
                function FormlyConfig() {
                    this.types = {};
                    this.validators = {};
                }
                FormlyConfig.prototype.setType = function (options) {
                    this.types[options.name] = options;
                };
                FormlyConfig.prototype.getType = function (name) {
                    return this.types[name];
                };
                FormlyConfig.prototype.setValidator = function (options) {
                    this.validators[options.name] = options;
                };
                FormlyConfig.prototype.getValidator = function (name) {
                    return this.validators[name];
                };
                FormlyConfig = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FormlyConfig);
                return FormlyConfig;
            }());
            exports_3("FormlyConfig", FormlyConfig);
        }
    }
});
System.register("services/formly.expression", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function evalExpression(expression, thisArg, argNames, argVal) {
        try {
            return Function.bind.apply(Function, [void 0].concat(argNames.concat("return " + expression + ";")))().apply(thisArg, argVal);
        }
        catch (error) {
            console.error(error);
        }
    }
    exports_4("evalExpression", evalExpression);
    function expressionValueSetter(expression, expressionValue, thisArg, argNames, argVal) {
        try {
            return Function.bind
                .apply(Function, [void 0].concat(["expressionValue"].concat(argNames.concat(expression + "= expressionValue;"))))()
                .apply(thisArg, [expressionValue].concat(argVal));
        }
        catch (error) {
            console.error(error);
        }
    }
    exports_4("expressionValueSetter", expressionValueSetter);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("services/formly.field.delegates", ["services/formly.expression"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var formly_expression_1;
    var FormlyFieldVisibilityDelegate, FormlyFieldExpressionDelegate;
    return {
        setters:[
            function (formly_expression_1_1) {
                formly_expression_1 = formly_expression_1_1;
            }],
        execute: function() {
            FormlyFieldVisibilityDelegate = (function () {
                function FormlyFieldVisibilityDelegate(formlyCommon) {
                    this.formlyCommon = formlyCommon;
                }
                FormlyFieldVisibilityDelegate.prototype.eval = function (expression) {
                    if (expression instanceof Function) {
                        return expression();
                    }
                    else if (typeof expression === "string") {
                        return formly_expression_1.evalExpression(expression, this.formlyCommon, ["model", "fieldModel"], [this.formlyCommon.formModel, this.formlyCommon.model]);
                    }
                    else {
                        return expression ? true : false;
                    }
                };
                FormlyFieldVisibilityDelegate.prototype.hasHideExpression = function () {
                    return (this.formlyCommon.field && this.formlyCommon.field.hideExpression !== undefined) && this.formlyCommon.field.hideExpression ? true : false;
                };
                FormlyFieldVisibilityDelegate.prototype.checkVisibilityChange = function () {
                    if (this.hasHideExpression()) {
                        var hideExpressionResult = this.eval(this.formlyCommon.field.hideExpression);
                        if (hideExpressionResult !== this.formlyCommon.hide) {
                            this.formlyCommon.hide = hideExpressionResult;
                        }
                    }
                };
                return FormlyFieldVisibilityDelegate;
            }());
            exports_5("FormlyFieldVisibilityDelegate", FormlyFieldVisibilityDelegate);
            FormlyFieldExpressionDelegate = (function () {
                function FormlyFieldExpressionDelegate(formlyCommon) {
                    this.formlyCommon = formlyCommon;
                }
                FormlyFieldExpressionDelegate.prototype.hasExpression = function () {
                    return (this.formlyCommon.field && this.formlyCommon.field.expressionProperties !== undefined);
                };
                FormlyFieldExpressionDelegate.prototype.checkExpressionChange = function () {
                    if (this.hasExpression()) {
                        var expressionProperties = this.formlyCommon.field.expressionProperties;
                        if (expressionProperties) {
                            for (var key in expressionProperties) {
                                var expressionValue = formly_expression_1.evalExpression(expressionProperties[key], this.formlyCommon, ["model", "fieldValue"], [this.formlyCommon.formModel, this.formlyCommon.model]);
                                formly_expression_1.expressionValueSetter(key, expressionValue, this.formlyCommon, ["model", "fieldModel", "templateOptions"], [this.formlyCommon.formModel, this.formlyCommon.model, this.formlyCommon.field.templateOptions]);
                            }
                            var formControl = this.formlyCommon.form.get(this.formlyCommon.field.key);
                            if (formControl) {
                                if (formControl.status === "DISABLED" && !this.formlyCommon.field.templateOptions.disabled) {
                                    formControl.enable();
                                }
                                if (formControl.status !== "DISABLED" && this.formlyCommon.field.templateOptions.disabled) {
                                    formControl.disable();
                                }
                            }
                        }
                    }
                };
                return FormlyFieldExpressionDelegate;
            }());
            exports_5("FormlyFieldExpressionDelegate", FormlyFieldExpressionDelegate);
        }
    }
});
System.register("components/formly.common.component", ["services/formly.field.delegates", "services/formly.event.emitter"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var formly_field_delegates_1, formly_event_emitter_1;
    var FormlyCommon;
    return {
        setters:[
            function (formly_field_delegates_1_1) {
                formly_field_delegates_1 = formly_field_delegates_1_1;
            },
            function (formly_event_emitter_1_1) {
                formly_event_emitter_1 = formly_event_emitter_1_1;
            }],
        execute: function() {
            FormlyCommon = (function () {
                function FormlyCommon(elementRef, formlyPubSub, renderer) {
                    this.elementRef = elementRef;
                    this.formlyPubSub = formlyPubSub;
                    this.renderer = renderer;
                    this.visibilityDelegate = new formly_field_delegates_1.FormlyFieldVisibilityDelegate(this);
                    this.expressionDelegate = new formly_field_delegates_1.FormlyFieldExpressionDelegate(this);
                }
                FormlyCommon.prototype.ngDoCheck = function () {
                    this.visibilityDelegate.checkVisibilityChange();
                    this.expressionDelegate.checkExpressionChange();
                };
                Object.defineProperty(FormlyCommon.prototype, "hide", {
                    get: function () {
                        return this._hide;
                    },
                    set: function (value) {
                        this._hide = value;
                        this.renderer.setElementStyle(this.elementRef.nativeElement, "display", value ? "none" : "");
                        if (this.field.fieldGroup) {
                            for (var i = 0; i < this.field.fieldGroup.length; i++) {
                                this.psEmit(this.field.fieldGroup[i].key, "hidden", this._hide);
                            }
                        }
                        else {
                            this.psEmit(this.field.key, "hidden", this._hide);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                FormlyCommon.prototype.psEmit = function (fieldKey, eventKey, value) {
                    if (this.formlyPubSub && this.formlyPubSub.getEmitter(fieldKey) && this.formlyPubSub.getEmitter(fieldKey).emit) {
                        this.formlyPubSub.getEmitter(fieldKey).emit(new formly_event_emitter_1.FormlyValueChangeEvent(eventKey, value));
                    }
                };
                return FormlyCommon;
            }());
            exports_6("FormlyCommon", FormlyCommon);
        }
    }
});
System.register("templates/field", ["@angular/core", "@angular/forms", "services/formly.event.emitter"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_2, forms_1, formly_event_emitter_2;
    var Field;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (formly_event_emitter_2_1) {
                formly_event_emitter_2 = formly_event_emitter_2_1;
            }],
        execute: function() {
            Field = (function () {
                function Field() {
                }
                Field.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.update) {
                        this.update.subscribe(function (option) {
                            _this.templateOptions[option.key] = option.value;
                        });
                    }
                };
                Object.defineProperty(Field.prototype, "formControl", {
                    get: function () {
                        if (!this._control) {
                            this.createControl();
                        }
                        return this._control;
                    },
                    enumerable: true,
                    configurable: true
                });
                Field.prototype.createControl = function () {
                    this._control = new forms_1.FormControl({ value: this.model || "", disabled: this.templateOptions.disabled }, this.field.validation);
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', forms_1.FormGroup)
                ], Field.prototype, "form", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', formly_event_emitter_2.FormlyEventEmitter)
                ], Field.prototype, "update", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "templateOptions", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], Field.prototype, "key", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "field", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "formModel", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "model", void 0);
                return Field;
            }());
            exports_7("Field", Field);
        }
    }
});
System.register("components/formly.field", ["@angular/core", "@angular/forms", "components/formly.common.component", "services/formly.event.emitter", "services/formly.field.builder", "services/formly.config"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_3, forms_2, formly_common_component_1, formly_event_emitter_3, formly_field_builder_1, formly_config_1;
    var FormlyField;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (forms_2_1) {
                forms_2 = forms_2_1;
            },
            function (formly_common_component_1_1) {
                formly_common_component_1 = formly_common_component_1_1;
            },
            function (formly_event_emitter_3_1) {
                formly_event_emitter_3 = formly_event_emitter_3_1;
            },
            function (formly_field_builder_1_1) {
                formly_field_builder_1 = formly_field_builder_1_1;
            },
            function (formly_config_1_1) {
                formly_config_1 = formly_config_1_1;
            }],
        execute: function() {
            FormlyField = (function (_super) {
                __extends(FormlyField, _super);
                function FormlyField(elementRef, formlyPubSub, renderer, formlyConfig, formlyFieldBuilder) {
                    _super.call(this, elementRef, formlyPubSub, renderer);
                    this.formlyConfig = formlyConfig;
                    this.formlyFieldBuilder = formlyFieldBuilder;
                    this.modelChange = new core_3.EventEmitter();
                }
                FormlyField.prototype.ngOnInit = function () {
                    var _this = this;
                    setTimeout(function () { return _this.createChildFields(); });
                };
                FormlyField.prototype.createChildFields = function () {
                    var _this = this;
                    if (this.field && !this.field.template && !this.field.fieldGroup) {
                        if (Array.isArray(this.field.validation)) {
                            var validators_1 = [];
                            this.field.validation.map(function (validate) {
                                validators_1.push(_this.formlyConfig.getValidator(validate).validation);
                            });
                            this.field.validation = forms_2.Validators.compose(validators_1);
                        }
                        this.update = new formly_event_emitter_3.FormlyEventEmitter();
                        this.fieldComponentRef = this.formlyFieldBuilder.createChildFields(this.field, this, this.formlyConfig);
                        this.fieldComponentRef.instance.formControl.valueChanges.subscribe(function (event) {
                            _this.changeModel(new formly_event_emitter_3.FormlyValueChangeEvent(_this.field.key, event));
                        });
                        this.formlyPubSub.setEmitter(this.field.key, this.update);
                    }
                };
                FormlyField.prototype.changeModel = function (event) {
                    if (this.field.key && this.field.key !== event.key) {
                        if (!this.model) {
                            this.model = {};
                        }
                        this.model[event.key] = event.value;
                        event = new formly_event_emitter_3.FormlyValueChangeEvent(this.field.key, this.model);
                    }
                    this.modelChange.emit(event);
                };
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', core_3.EventEmitter)
                ], FormlyField.prototype, "modelChange", void 0);
                __decorate([
                    core_3.ViewChild("fieldComponent", { read: core_3.ViewContainerRef }), 
                    __metadata('design:type', core_3.ViewContainerRef)
                ], FormlyField.prototype, "fieldComponent", void 0);
                FormlyField = __decorate([
                    core_3.Component({
                        selector: "formly-field",
                        template: "\n    <template #fieldComponent></template>\n    <div *ngIf=\"field.template && !field.fieldGroup\" [innerHtml]=\"field.template\"></div>\n\n    <formly-field *ngFor=\"let f of field.fieldGroup\"\n      [hide]=\"f.hideExpression\"\n      [model]=\"model?(f.key ? model[f.key]: model):''\"\n      [form]=\"form\" [field]=\"f\" [formModel]=\"formModel\"\n      (modelChange)=\"changeModel($event)\"\n      [ngClass]=\"f.className\">\n    </formly-field>\n  ",
                        inputs: ["field", "formModel", "form", "hide", "model", "key"],
                    }), 
                    __metadata('design:paramtypes', [core_3.ElementRef, formly_event_emitter_3.FormlyPubSub, core_3.Renderer, formly_config_1.FormlyConfig, formly_field_builder_1.FormlyFieldBuilder])
                ], FormlyField);
                return FormlyField;
            }(formly_common_component_1.FormlyCommon));
            exports_8("FormlyField", FormlyField);
        }
    }
});
System.register("services/formly.field.builder", ["@angular/core"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_4;
    var FormlyFieldBuilder;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            }],
        execute: function() {
            FormlyFieldBuilder = (function () {
                function FormlyFieldBuilder(componentFactoryResolver) {
                    this.componentFactoryResolver = componentFactoryResolver;
                }
                FormlyFieldBuilder.prototype.createChildFields = function (fieldConfig, formlyField, formlyConfig) {
                    formlyField.hide = fieldConfig.hideExpression ? true : false;
                    var type = formlyConfig.getType(fieldConfig.type);
                    var componentFactory = this.componentFactoryResolver.resolveComponentFactory(type.component);
                    var ref = formlyField.fieldComponent.createComponent(componentFactory);
                    Object.assign(ref.instance, {
                        model: formlyField.model,
                        templateOptions: fieldConfig.templateOptions,
                        key: formlyField.field.key,
                        form: formlyField.form,
                        update: formlyField.update,
                        field: fieldConfig,
                        formModel: formlyField.formModel,
                    });
                    formlyField.form.addControl(formlyField.field.key, ref.instance.formControl);
                    return ref;
                };
                FormlyFieldBuilder = __decorate([
                    core_4.Injectable(), 
                    __metadata('design:paramtypes', [core_4.ComponentFactoryResolver])
                ], FormlyFieldBuilder);
                return FormlyFieldBuilder;
            }());
            exports_9("FormlyFieldBuilder", FormlyFieldBuilder);
        }
    }
});
System.register("services/formly.single.focus.dispatcher", ["@angular/core"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_5;
    var SingleFocusDispatcher;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            }],
        execute: function() {
            SingleFocusDispatcher = (function () {
                function SingleFocusDispatcher() {
                    this._listeners = [];
                }
                SingleFocusDispatcher.prototype.notify = function (key) {
                    for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
                        var listener = _a[_i];
                        listener(key);
                    }
                };
                SingleFocusDispatcher.prototype.listen = function (listener) {
                    this._listeners.push(listener);
                };
                SingleFocusDispatcher = __decorate([
                    core_5.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SingleFocusDispatcher);
                return SingleFocusDispatcher;
            }());
            exports_10("SingleFocusDispatcher", SingleFocusDispatcher);
        }
    }
});
System.register("components/formly.form", ["@angular/core", "@angular/forms", "services/formly.event.emitter", "services/formly.field.builder", "services/formly.single.focus.dispatcher", "components/formly.common.component"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_6, forms_3, formly_event_emitter_4, formly_field_builder_2, formly_single_focus_dispatcher_1, formly_common_component_2;
    var FormlyForm;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (forms_3_1) {
                forms_3 = forms_3_1;
            },
            function (formly_event_emitter_4_1) {
                formly_event_emitter_4 = formly_event_emitter_4_1;
            },
            function (formly_field_builder_2_1) {
                formly_field_builder_2 = formly_field_builder_2_1;
            },
            function (formly_single_focus_dispatcher_1_1) {
                formly_single_focus_dispatcher_1 = formly_single_focus_dispatcher_1_1;
            },
            function (formly_common_component_2_1) {
                formly_common_component_2 = formly_common_component_2_1;
            }],
        execute: function() {
            FormlyForm = (function (_super) {
                __extends(FormlyForm, _super);
                function FormlyForm(elementRef, formlyPubSub, renderer, formBuilder) {
                    _super.call(this, elementRef, formlyPubSub, renderer);
                    this.formBuilder = formBuilder;
                }
                FormlyForm.prototype.ngOnInit = function () {
                    if (!this.model) {
                        this.model = {};
                    }
                    if (!this.formModel) {
                        this.formModel = this.model;
                    }
                    if (!this.form) {
                        this.form = this.formBuilder.group({});
                    }
                };
                FormlyForm.prototype.changeModel = function (event) {
                    this.model[event.key] = event.value;
                };
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Array)
                ], FormlyForm.prototype, "fields", void 0);
                FormlyForm = __decorate([
                    core_6.Component({
                        selector: "formly-form",
                        template: "\n    <formly-field *ngFor=\"let field of fields\"\n      [hide]=\"field.hideExpression\" [model]=\"field.key?model[field.key]:model\"\n      [key]=\"field.key\" [form]=\"form\" [field]=\"field\" [formModel]=\"model\"\n      (modelChange)=\"changeModel($event)\"\n      [ngClass]=\"field.className\">\n    </formly-field>\n    <ng-content></ng-content>\n  ",
                        providers: [formly_event_emitter_4.FormlyPubSub, formly_single_focus_dispatcher_1.SingleFocusDispatcher, formly_field_builder_2.FormlyFieldBuilder],
                        inputs: ["field", "formModel", "form", "hide", "model"]
                    }), 
                    __metadata('design:paramtypes', [core_6.ElementRef, formly_event_emitter_4.FormlyPubSub, core_6.Renderer, forms_3.FormBuilder])
                ], FormlyForm);
                return FormlyForm;
            }(formly_common_component_2.FormlyCommon));
            exports_11("FormlyForm", FormlyForm);
        }
    }
});
System.register("components/formly.field.focus", ["@angular/core", "services/formly.single.focus.dispatcher"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_7, formly_single_focus_dispatcher_2;
    var FormlyNgFocus;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (formly_single_focus_dispatcher_2_1) {
                formly_single_focus_dispatcher_2 = formly_single_focus_dispatcher_2_1;
            }],
        execute: function() {
            FormlyNgFocus = (function () {
                function FormlyNgFocus(renderer, elementRef, focusDispatcher) {
                    var _this = this;
                    this.renderer = renderer;
                    this.elementRef = elementRef;
                    this.focusDispatcher = focusDispatcher;
                    focusDispatcher.listen(function (key) {
                        if (_this.formControlName !== key) {
                            _this.focus = false;
                        }
                    });
                }
                Object.defineProperty(FormlyNgFocus.prototype, "focus", {
                    set: function (val) {
                        if (!this._focus && val) {
                            this.renderer.invokeElementMethod(this.elementRef.nativeElement, "focus", []);
                            this.focusDispatcher.notify(this.formControlName);
                        }
                        if (this._focus && !val) {
                            this.renderer.invokeElementMethod(this.elementRef.nativeElement, "blur", []);
                        }
                        this._focus = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                FormlyNgFocus.prototype.onFocus = function () {
                    if (!this._focus) {
                        this.focusDispatcher.notify(this.formControlName);
                        this._focus = true;
                    }
                };
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Object)
                ], FormlyNgFocus.prototype, "formControlName", void 0);
                __decorate([
                    core_7.Input("formlyNgFocus"), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], FormlyNgFocus.prototype, "focus", null);
                __decorate([
                    core_7.HostListener("focus"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], FormlyNgFocus.prototype, "onFocus", null);
                FormlyNgFocus = __decorate([
                    core_7.Directive({ selector: "[formlyNgFocus]" }), 
                    __metadata('design:paramtypes', [core_7.Renderer, core_7.ElementRef, formly_single_focus_dispatcher_2.SingleFocusDispatcher])
                ], FormlyNgFocus);
                return FormlyNgFocus;
            }());
            exports_12("FormlyNgFocus", FormlyNgFocus);
        }
    }
});
System.register("services/formly.messages", ["@angular/core", "@angular/forms"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_8, forms_4;
    var FormlyMessages, FormlyMessage;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (forms_4_1) {
                forms_4 = forms_4_1;
            }],
        execute: function() {
            FormlyMessages = (function () {
                function FormlyMessages() {
                    this.messages = {};
                }
                FormlyMessages.prototype.addStringMessage = function (validator, message) {
                    this.messages[validator] = message;
                };
                FormlyMessages.prototype.getMessages = function () {
                    return this.messages;
                };
                FormlyMessages.prototype.getValidatorErrorMessage = function (prop) {
                    return this.messages[prop];
                };
                FormlyMessages = __decorate([
                    core_8.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FormlyMessages);
                return FormlyMessages;
            }());
            exports_13("FormlyMessages", FormlyMessages);
            FormlyMessage = (function () {
                function FormlyMessage(formlyMessages) {
                    this.formlyMessages = formlyMessages;
                }
                Object.defineProperty(FormlyMessage.prototype, "errorMessage", {
                    get: function () {
                        var formControl = this.form.get(this.controlName);
                        for (var propertyName in formControl.errors) {
                            if (formControl.errors.hasOwnProperty(propertyName)) {
                                return this.formlyMessages.getValidatorErrorMessage(propertyName);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', String)
                ], FormlyMessage.prototype, "controlName", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', forms_4.FormGroup)
                ], FormlyMessage.prototype, "form", void 0);
                FormlyMessage = __decorate([
                    core_8.Component({
                        selector: "formly-message",
                        template: "<div *ngIf=\"errorMessage\">{{errorMessage}}</div>"
                    }), 
                    __metadata('design:paramtypes', [FormlyMessages])
                ], FormlyMessage);
                return FormlyMessage;
            }());
            exports_13("FormlyMessage", FormlyMessage);
        }
    }
});
System.register("services/formly.providers", ["services/formly.event.emitter", "services/formly.messages"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var formly_event_emitter_5, formly_messages_1;
    var FormlyProviders;
    return {
        setters:[
            function (formly_event_emitter_5_1) {
                formly_event_emitter_5 = formly_event_emitter_5_1;
            },
            function (formly_messages_1_1) {
                formly_messages_1 = formly_messages_1_1;
            }],
        execute: function() {
            exports_14("FormlyProviders", FormlyProviders = [
                formly_event_emitter_5.FormlyPubSub,
                formly_messages_1.FormlyMessages
            ]);
        }
    }
});
System.register("core", ["@angular/core", "@angular/platform-browser", "@angular/forms", "components/formly.form", "components/formly.field", "components/formly.field.focus", "services/formly.config", "services/formly.messages", "services/formly.providers", "components/formly.common.component", "services/formly.event.emitter", "services/formly.field.delegates"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_9, platform_browser_1, forms_5, formly_form_1, formly_field_1, formly_field_focus_1, formly_config_2, formly_messages_2, formly_providers_1;
    var FORMLY_DIRECTIVES, FormlyModule;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_5_1) {
                forms_5 = forms_5_1;
            },
            function (formly_form_1_1) {
                formly_form_1 = formly_form_1_1;
                exports_15({
                    "FormlyForm": formly_form_1_1["FormlyForm"]
                });
            },
            function (formly_field_1_1) {
                formly_field_1 = formly_field_1_1;
                exports_15({
                    "FormlyField": formly_field_1_1["FormlyField"]
                });
            },
            function (formly_field_focus_1_1) {
                formly_field_focus_1 = formly_field_focus_1_1;
            },
            function (formly_config_2_1) {
                formly_config_2 = formly_config_2_1;
                exports_15({
                    "FormlyConfig": formly_config_2_1["FormlyConfig"]
                });
            },
            function (formly_messages_2_1) {
                formly_messages_2 = formly_messages_2_1;
                exports_15({
                    "FormlyMessage": formly_messages_2_1["FormlyMessage"],
                    "FormlyMessages": formly_messages_2_1["FormlyMessages"]
                });
            },
            function (formly_providers_1_1) {
                formly_providers_1 = formly_providers_1_1;
                exports_15({
                    "FormlyProviders": formly_providers_1_1["FormlyProviders"]
                });
            },
            function (formly_common_component_3_1) {
                exports_15({
                    "FormlyCommon": formly_common_component_3_1["FormlyCommon"]
                });
            },
            function (formly_event_emitter_6_1) {
                exports_15({
                    "FormlyPubSub": formly_event_emitter_6_1["FormlyPubSub"],
                    "FormlyEventEmitter": formly_event_emitter_6_1["FormlyEventEmitter"]
                });
            },
            function (formly_field_delegates_2_1) {
                exports_15({
                    "FormlyFieldVisibilityDelegate": formly_field_delegates_2_1["FormlyFieldVisibilityDelegate"]
                });
            }],
        execute: function() {
            exports_15("FORMLY_DIRECTIVES", FORMLY_DIRECTIVES = [formly_form_1.FormlyForm, formly_field_1.FormlyField, formly_messages_2.FormlyMessage, formly_field_focus_1.FormlyNgFocus]);
            FormlyModule = (function () {
                function FormlyModule() {
                }
                FormlyModule = __decorate([
                    core_9.NgModule({
                        declarations: FORMLY_DIRECTIVES,
                        exports: FORMLY_DIRECTIVES,
                        providers: [formly_config_2.FormlyConfig, formly_providers_1.FormlyProviders],
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_5.ReactiveFormsModule
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormlyModule);
                return FormlyModule;
            }());
            exports_15("FormlyModule", FormlyModule);
        }
    }
});
System.register("templates/formlyfield.checkbox", ["@angular/core", "@angular/forms", "templates/field"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_10, forms_6, field_1;
    var FormlyFieldCheckbox;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (forms_6_1) {
                forms_6 = forms_6_1;
            },
            function (field_1_1) {
                field_1 = field_1_1;
            }],
        execute: function() {
            FormlyFieldCheckbox = (function (_super) {
                __extends(FormlyFieldCheckbox, _super);
                function FormlyFieldCheckbox(formBuilder) {
                    _super.call(this);
                    this.formBuilder = formBuilder;
                }
                FormlyFieldCheckbox.prototype.createControl = function () {
                    return this._control = this.formBuilder.control(this.model ? "on" : undefined);
                };
                FormlyFieldCheckbox = __decorate([
                    core_10.Component({
                        selector: "formly-field-checkbox",
                        template: "\n    <div class=\"form-group\">\n      <div [formGroup]=\"form\" class=\"checkbox\">\n        <label class=\"custom-control custom-checkbox\">\n          <input type=\"checkbox\" [formControlName]=\"key\"\n            *ngIf=\"!templateOptions.hidden\" value=\"on\"\n            class=\"custom-control-input\">\n            {{templateOptions.label}}\n            <span class=\"custom-control-indicator\"></span>\n          </label>\n      </div>\n      <small class=\"text-muted\">{{templateOptions.description}}</small>\n    </div>\n  ",
                    }), 
                    __metadata('design:paramtypes', [forms_6.FormBuilder])
                ], FormlyFieldCheckbox);
                return FormlyFieldCheckbox;
            }(field_1.Field));
            exports_16("FormlyFieldCheckbox", FormlyFieldCheckbox);
        }
    }
});
System.register("templates/formlyfield.multicheckbox", ["@angular/core", "@angular/forms", "templates/field"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_11, forms_7, field_2;
    var FormlyFieldMultiCheckbox;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (forms_7_1) {
                forms_7 = forms_7_1;
            },
            function (field_2_1) {
                field_2 = field_2_1;
            }],
        execute: function() {
            FormlyFieldMultiCheckbox = (function (_super) {
                __extends(FormlyFieldMultiCheckbox, _super);
                function FormlyFieldMultiCheckbox(formBuilder) {
                    _super.call(this);
                    this.formBuilder = formBuilder;
                }
                FormlyFieldMultiCheckbox.prototype.createControl = function () {
                    var _this = this;
                    var controlGroupConfig = this.templateOptions.options.reduce(function (previous, option) {
                        previous[option.key] = [_this.model ? _this.model[option.key] : undefined];
                        return previous;
                    }, {});
                    return this._control = this.formBuilder.group(controlGroupConfig);
                };
                FormlyFieldMultiCheckbox = __decorate([
                    core_11.Component({
                        selector: "formly-field-multicheckbox",
                        template: "\n        <div [formGroup]=\"form\">\n            <div [formGroupName]=\"key\" class=\"form-group\">\n                <label class=\"form-control-label\" for=\"\">{{templateOptions.label}}</label>\n                <div *ngFor=\"let option of templateOptions.options\" class=\"checkbox\">\n                    <label class=\"custom-control custom-checkbox\">\n                        <input type=\"checkbox\" name=\"choose\" value=\"{{option.value}}\" [formControlName]=\"option.key\"\n                        class=\"custom-control-input\">\n                        {{option.value}}\n                        <span class=\"custom-control-indicator\"></span>\n                    </label>\n                </div>\n                <small class=\"text-muted\">{{templateOptions.description}}</small>\n            </div>\n        </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [forms_7.FormBuilder])
                ], FormlyFieldMultiCheckbox);
                return FormlyFieldMultiCheckbox;
            }(field_2.Field));
            exports_17("FormlyFieldMultiCheckbox", FormlyFieldMultiCheckbox);
        }
    }
});
System.register("templates/formlyfield.input", ["@angular/core", "templates/field"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_12, field_3;
    var FormlyFieldInput;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (field_3_1) {
                field_3 = field_3_1;
            }],
        execute: function() {
            FormlyFieldInput = (function (_super) {
                __extends(FormlyFieldInput, _super);
                function FormlyFieldInput() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(FormlyFieldInput.prototype, "valid", {
                    get: function () {
                        return this.formControl.touched && !this.formControl.valid;
                    },
                    enumerable: true,
                    configurable: true
                });
                FormlyFieldInput = __decorate([
                    core_12.Component({
                        selector: "formly-field-input",
                        template: "\n    <div class=\"form-group\" [formGroup]=\"form\" [ngClass]=\"{'has-danger': valid}\" *ngIf=\"!templateOptions.hidden\">\n      <label attr.for=\"{{key}}\" class=\"form-control-label\">{{templateOptions.label}}</label>\n        <input [type]=\"templateOptions.type\" [formControlName]=\"key\" class=\"form-control\" id=\"{{key}}\"\n          [placeholder]=\"templateOptions.placeholder\"\n          [formlyNgFocus]=\"templateOptions.focus\" [ngClass]=\"{'form-control-danger': valid}\">\n        <small class=\"text-muted\">{{templateOptions.description}}</small>\n        <small class=\"text-muted text-danger\" *ngIf=\"valid\"><formly-message [form]=\"form\" [controlName]=\"key\"></formly-message></small>\n      </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormlyFieldInput);
                return FormlyFieldInput;
            }(field_3.Field));
            exports_18("FormlyFieldInput", FormlyFieldInput);
        }
    }
});
System.register("templates/formlyfield.radio", ["@angular/core", "templates/field"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_13, field_4;
    var FormlyFieldRadio;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (field_4_1) {
                field_4 = field_4_1;
            }],
        execute: function() {
            FormlyFieldRadio = (function (_super) {
                __extends(FormlyFieldRadio, _super);
                function FormlyFieldRadio() {
                    _super.apply(this, arguments);
                }
                FormlyFieldRadio = __decorate([
                    core_13.Component({
                        selector: "formly-field-radio",
                        template: "\n    <div [formGroup]=\"form\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\" for=\"\">{{templateOptions.label}}</label>\n        <div *ngFor=\"let option of templateOptions.options\" class=\"radio\">\n          <label class=\"custom-control custom-radio\">\n            <input type=\"radio\" [value]=\"option.key\" [formControlName]=\"key\"\n            [formlyNgFocus]=\"templateOptions.focus\" class=\"custom-control-input\">\n            {{option.value}}\n            <span class=\"custom-control-indicator\"></span>\n          </label>\n        </div>\n        <small class=\"text-muted\">{{templateOptions.description}}</small>\n      </div>\n    </div>",
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormlyFieldRadio);
                return FormlyFieldRadio;
            }(field_4.Field));
            exports_19("FormlyFieldRadio", FormlyFieldRadio);
        }
    }
});
System.register("templates/formlyfield.textarea", ["@angular/core", "templates/field"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_14, field_5;
    var FormlyFieldTextArea;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (field_5_1) {
                field_5 = field_5_1;
            }],
        execute: function() {
            FormlyFieldTextArea = (function (_super) {
                __extends(FormlyFieldTextArea, _super);
                function FormlyFieldTextArea() {
                    _super.apply(this, arguments);
                }
                FormlyFieldTextArea = __decorate([
                    core_14.Component({
                        selector: "formly-field-textarea",
                        template: "\n    <fieldset class=\"form-group\" [formGroup]=\"form\" *ngIf=\"!templateOptions.hidden\">\n      <label attr.for=\"{{key}}\" class=\"form-control-label\">{{templateOptions.label}}</label>\n      <textarea name=\"{{key}}\" [formControlName]=\"key\" id=\"{{key}}\" cols=\"{{templateOptions.cols}}\"\n        rows=\"{{templateOptions.rows}}\" [placeholder]=\"templateOptions.placeholder\" class=\"form-control\"\n        [formlyNgFocus]=\"templateOptions.focus\">\n      </textarea>\n      <small class=\"text-muted\">{{templateOptions.description}}</small>\n    </fieldset>",
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormlyFieldTextArea);
                return FormlyFieldTextArea;
            }(field_5.Field));
            exports_20("FormlyFieldTextArea", FormlyFieldTextArea);
        }
    }
});
System.register("templates/formlyfield.select", ["@angular/core", "templates/field"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_15, field_6;
    var FormlyFieldSelect;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (field_6_1) {
                field_6 = field_6_1;
            }],
        execute: function() {
            FormlyFieldSelect = (function (_super) {
                __extends(FormlyFieldSelect, _super);
                function FormlyFieldSelect() {
                    _super.apply(this, arguments);
                }
                FormlyFieldSelect = __decorate([
                    core_15.Component({
                        selector: "formly-field-select",
                        template: "\n        <div class=\"select form-group\" [formGroup]=\"form\">\n          <label for=\"\" class=\"form-control-label\">{{templateOptions.label}}</label>\n          <select [id]=\"key\" [formControlName]=\"key\" class=\"form-control\" [formlyNgFocus]=\"templateOptions.focus\">\n            <option value=\"\" *ngIf=\"templateOptions.placeholder\">{{templateOptions.placeholder}}</option>\n            <option *ngFor=\"let opt of templateOptions.options\" [value]=\"opt.value\">{{opt.label}}</option>\n          </select>\n          <small class=\"text-muted\">{{templateOptions.description}}</small>\n        </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormlyFieldSelect);
                return FormlyFieldSelect;
            }(field_6.Field));
            exports_21("FormlyFieldSelect", FormlyFieldSelect);
        }
    }
});
System.register("templates/templates", ["templates/formlyfield.input", "templates/formlyfield.checkbox", "templates/formlyfield.radio", "templates/formlyfield.select", "templates/formlyfield.textarea", "templates/formlyfield.multicheckbox"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var formlyfield_input_1, formlyfield_checkbox_1, formlyfield_radio_1, formlyfield_select_1, formlyfield_textarea_1, formlyfield_multicheckbox_1;
    var TemplateDirectives;
    return {
        setters:[
            function (formlyfield_input_1_1) {
                formlyfield_input_1 = formlyfield_input_1_1;
            },
            function (formlyfield_checkbox_1_1) {
                formlyfield_checkbox_1 = formlyfield_checkbox_1_1;
            },
            function (formlyfield_radio_1_1) {
                formlyfield_radio_1 = formlyfield_radio_1_1;
            },
            function (formlyfield_select_1_1) {
                formlyfield_select_1 = formlyfield_select_1_1;
            },
            function (formlyfield_textarea_1_1) {
                formlyfield_textarea_1 = formlyfield_textarea_1_1;
            },
            function (formlyfield_multicheckbox_1_1) {
                formlyfield_multicheckbox_1 = formlyfield_multicheckbox_1_1;
            }],
        execute: function() {
            exports_22("TemplateDirectives", TemplateDirectives = [
                {
                    name: "input",
                    component: formlyfield_input_1.FormlyFieldInput
                },
                {
                    name: "checkbox",
                    component: formlyfield_checkbox_1.FormlyFieldCheckbox,
                },
                {
                    name: "radio",
                    component: formlyfield_radio_1.FormlyFieldRadio,
                },
                {
                    name: "select",
                    component: formlyfield_select_1.FormlyFieldSelect,
                },
                {
                    name: "textarea",
                    component: formlyfield_textarea_1.FormlyFieldTextArea,
                },
                {
                    name: "multicheckbox",
                    component: formlyfield_multicheckbox_1.FormlyFieldMultiCheckbox
                }
            ]);
        }
    }
});
System.register("templates/formlyBootstrap", ["@angular/core", "@angular/platform-browser", "@angular/forms", "services/formly.config", "core", "services/formly.messages", "templates/templates"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_16, platform_browser_2, forms_8, formly_config_4, core_17, formly_messages_4, templates_1, core_18;
    var FormlyBootstrap, FormlyBootstrapModule;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
                core_18 = core_16_1;
            },
            function (platform_browser_2_1) {
                platform_browser_2 = platform_browser_2_1;
            },
            function (forms_8_1) {
                forms_8 = forms_8_1;
            },
            function (formly_config_4_1) {
                formly_config_4 = formly_config_4_1;
            },
            function (core_17_1) {
                core_17 = core_17_1;
            },
            function (formly_messages_4_1) {
                formly_messages_4 = formly_messages_4_1;
            },
            function (templates_1_1) {
                templates_1 = templates_1_1;
            }],
        execute: function() {
            FormlyBootstrap = (function () {
                function FormlyBootstrap(fc, fm) {
                    fm.addStringMessage("required", "This field is required.");
                    fm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
                    fm.addStringMessage("maxlength", "Maximum Length Exceeded.");
                    fm.addStringMessage("minlength", "Should have atleast 2 Characters");
                    templates_1.TemplateDirectives.map(function (type) { return fc.setType(type); });
                }
                FormlyBootstrap = __decorate([
                    core_18.Injectable(), 
                    __metadata('design:paramtypes', [formly_config_4.FormlyConfig, formly_messages_4.FormlyMessages])
                ], FormlyBootstrap);
                return FormlyBootstrap;
            }());
            exports_23("FormlyBootstrap", FormlyBootstrap);
            FormlyBootstrapModule = (function () {
                function FormlyBootstrapModule() {
                }
                FormlyBootstrapModule = __decorate([
                    core_16.NgModule({
                        declarations: templates_1.TemplateDirectives.map(function (type) { return type.component; }),
                        entryComponents: templates_1.TemplateDirectives.map(function (type) { return type.component; }),
                        providers: [
                            FormlyBootstrap,
                        ],
                        imports: [
                            platform_browser_2.BrowserModule,
                            forms_8.ReactiveFormsModule,
                            core_17.FormlyModule,
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormlyBootstrapModule);
                return FormlyBootstrapModule;
            }());
            exports_23("FormlyBootstrapModule", FormlyBootstrapModule);
        }
    }
});
System.register("templates", ["templates/formlyfield.checkbox", "templates/formlyfield.multicheckbox", "templates/formlyfield.input", "templates/formlyfield.radio", "templates/formlyfield.textarea", "templates/formlyfield.select", "templates/field", "templates/templates", "templates/formlyBootstrap", "services/formly.single.focus.dispatcher"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    return {
        setters:[
            function (formlyfield_checkbox_2_1) {
                exports_24({
                    "FormlyFieldCheckbox": formlyfield_checkbox_2_1["FormlyFieldCheckbox"]
                });
            },
            function (formlyfield_multicheckbox_2_1) {
                exports_24({
                    "FormlyFieldMultiCheckbox": formlyfield_multicheckbox_2_1["FormlyFieldMultiCheckbox"]
                });
            },
            function (formlyfield_input_2_1) {
                exports_24({
                    "FormlyFieldInput": formlyfield_input_2_1["FormlyFieldInput"]
                });
            },
            function (formlyfield_radio_2_1) {
                exports_24({
                    "FormlyFieldRadio": formlyfield_radio_2_1["FormlyFieldRadio"]
                });
            },
            function (formlyfield_textarea_2_1) {
                exports_24({
                    "FormlyFieldTextArea": formlyfield_textarea_2_1["FormlyFieldTextArea"]
                });
            },
            function (formlyfield_select_2_1) {
                exports_24({
                    "FormlyFieldSelect": formlyfield_select_2_1["FormlyFieldSelect"]
                });
            },
            function (field_7_1) {
                exports_24({
                    "Field": field_7_1["Field"]
                });
            },
            function (templates_2_1) {
                exports_24({
                    "TemplateDirectives": templates_2_1["TemplateDirectives"]
                });
            },
            function (formlyBootstrap_1_1) {
                exports_24({
                    "FormlyBootstrap": formlyBootstrap_1_1["FormlyBootstrap"]
                });
            },
            function (formly_single_focus_dispatcher_3_1) {
                exports_24({
                    "SingleFocusDispatcher": formly_single_focus_dispatcher_3_1["SingleFocusDispatcher"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("index", ["core", "templates"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_25(exports);
    }
    return {
        setters:[
            function (core_19_1) {
                exportStar_1(core_19_1);
            },
            function (templates_3_1) {
                exportStar_1(templates_3_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=ng2-formly.js.map