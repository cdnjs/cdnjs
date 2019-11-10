(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Subject"), require("rxjs/add/operator/debounceTime"), require("rxjs/add/operator/map"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms", "rxjs/Subject", "rxjs/add/operator/debounceTime", "rxjs/add/operator/map"], factory);
	else if(typeof exports === 'object')
		exports["ng2-formly"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Subject"), require("rxjs/add/operator/debounceTime"), require("rxjs/add/operator/map"));
	else
		root["ng2-formly"] = factory(root["@angular/core"], root["@angular/common"], root["@angular/forms"], root["rxjs/Subject"], root["rxjs/add/operator/debounceTime"], root["rxjs/add/operator/map"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__) {
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
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(21));


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
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(3);
	var forms_1 = __webpack_require__(4);
	var formly_form_1 = __webpack_require__(5);
	exports.FormlyForm = formly_form_1.FormlyForm;
	var formly_field_1 = __webpack_require__(12);
	exports.FormlyField = formly_field_1.FormlyField;
	var formly_attributes_1 = __webpack_require__(17);
	exports.FormlyAttributes = formly_attributes_1.FormlyAttributes;
	var formly_config_1 = __webpack_require__(7);
	exports.FormlyConfig = formly_config_1.FormlyConfig;
	var formly_form_builder_1 = __webpack_require__(6);
	exports.FormlyFormBuilder = formly_form_builder_1.FormlyFormBuilder;
	var formly_validation_messages_1 = __webpack_require__(19);
	exports.FormlyValidationMessages = formly_validation_messages_1.FormlyValidationMessages;
	var formly_event_emitter_1 = __webpack_require__(13);
	exports.FormlyPubSub = formly_event_emitter_1.FormlyPubSub;
	exports.FormlyEventEmitter = formly_event_emitter_1.FormlyEventEmitter;
	var field_1 = __webpack_require__(10);
	exports.Field = field_1.Field;
	var field_type_1 = __webpack_require__(9);
	exports.FieldType = field_type_1.FieldType;
	var field_wrapper_1 = __webpack_require__(20);
	exports.FieldWrapper = field_wrapper_1.FieldWrapper;
	var formly_group_1 = __webpack_require__(8);
	var formly_single_focus_dispatcher_1 = __webpack_require__(18);
	exports.SingleFocusDispatcher = formly_single_focus_dispatcher_1.SingleFocusDispatcher;
	var FORMLY_DIRECTIVES = [formly_form_1.FormlyForm, formly_field_1.FormlyField, formly_attributes_1.FormlyAttributes, formly_group_1.FormlyGroup];
	var FormlyModule = (function () {
	    function FormlyModule() {
	    }
	    FormlyModule.forRoot = function (config) {
	        if (config === void 0) { config = {}; }
	        return {
	            ngModule: FormlyModule,
	            providers: [
	                formly_form_builder_1.FormlyFormBuilder,
	                formly_config_1.FormlyConfig,
	                formly_event_emitter_1.FormlyPubSub,
	                formly_validation_messages_1.FormlyValidationMessages,
	                { provide: formly_config_1.FORMLY_CONFIG_TOKEN, useValue: config, multi: true },
	                { provide: core_1.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
	            ],
	        };
	    };
	    FormlyModule = __decorate([
	        core_1.NgModule({
	            declarations: FORMLY_DIRECTIVES,
	            entryComponents: [formly_group_1.FormlyGroup],
	            exports: FORMLY_DIRECTIVES,
	            imports: [
	                common_1.CommonModule,
	                forms_1.ReactiveFormsModule,
	            ],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyModule);
	    return FormlyModule;
	}());
	exports.FormlyModule = FormlyModule;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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
	var forms_1 = __webpack_require__(4);
	var formly_form_builder_1 = __webpack_require__(6);
	var utils_1 = __webpack_require__(11);
	var FormlyForm = (function () {
	    function FormlyForm(formlyBuilder) {
	        this.formlyBuilder = formlyBuilder;
	        this.model = {};
	        this.form = new forms_1.FormGroup({});
	        this.fields = [];
	    }
	    FormlyForm.prototype.ngOnChanges = function (changes) {
	        if (changes['fields']) {
	            this.model = this.model || {};
	            this.form = this.form || (new forms_1.FormGroup({}));
	            this.setOptions();
	            this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);
	            this.updateInitialValue();
	        }
	        else if (changes['model'] && this.fields && this.fields.length > 0) {
	            this.form.patchValue(this.model);
	        }
	    };
	    FormlyForm.prototype.fieldModel = function (field) {
	        if (field.key && (field.fieldGroup || field.fieldArray)) {
	            return utils_1.getFieldModel(this.model, field, true);
	        }
	        return this.model;
	    };
	    FormlyForm.prototype.changeModel = function (event) {
	        utils_1.assignModelValue(this.model, event.key, event.value);
	    };
	    FormlyForm.prototype.setOptions = function () {
	        this.options = this.options || {};
	        this.options.resetModel = this.resetModel.bind(this);
	        this.options.updateInitialValue = this.updateInitialValue.bind(this);
	    };
	    FormlyForm.prototype.resetModel = function (model) {
	        model = utils_1.isNullOrUndefined(model) ? this.initialModel : model;
	        this.form.patchValue(model);
	        this.resetFormGroup(model, this.form);
	        this.resetFormModel(model, this.model);
	    };
	    FormlyForm.prototype.resetFormModel = function (model, formModel, path) {
	        if (!utils_1.isObject(model) && !Array.isArray(model)) {
	            return;
	        }
	        for (var key in formModel) {
	            if (!(key in model) || utils_1.isNullOrUndefined(model[key])) {
	                if (!this.form.get((path || []).concat(key))) {
	                    delete formModel[key];
	                }
	            }
	        }
	        for (var key in model) {
	            if (!utils_1.isNullOrUndefined(model[key])) {
	                if (key in formModel) {
	                    this.resetFormModel(model[key], formModel[key], (path || []).concat(key));
	                }
	                else {
	                    formModel[key] = model[key];
	                }
	            }
	        }
	    };
	    FormlyForm.prototype.resetFormGroup = function (model, form, actualKey) {
	        for (var controlKey in form.controls) {
	            var key = utils_1.getKey(controlKey, actualKey);
	            if (form.controls[controlKey] instanceof forms_1.FormGroup) {
	                this.resetFormGroup(model, form.controls[controlKey], key);
	            }
	            if (form.controls[controlKey] instanceof forms_1.FormArray) {
	                this.resetArray(model, form.controls[controlKey], key);
	            }
	            if (form.controls[controlKey] instanceof forms_1.FormControl) {
	                form.controls[controlKey].setValue(utils_1.getValueForKey(model, key));
	            }
	        }
	    };
	    FormlyForm.prototype.resetArray = function (model, formArray, key) {
	        var newValue = utils_1.getValueForKey(model, key);
	        for (var i = formArray.controls.length - 1; i >= 0; i--) {
	            if (formArray.controls[i] instanceof forms_1.FormGroup) {
	                if (newValue && !utils_1.isNullOrUndefined(newValue[i])) {
	                    this.resetFormGroup(newValue[i], formArray.controls[i]);
	                }
	                else {
	                    formArray.removeAt(i);
	                    var value = utils_1.getValueForKey(this.model, key);
	                    if (Array.isArray(value)) {
	                        value.splice(i, 1);
	                    }
	                }
	            }
	        }
	        if (Array.isArray(newValue) && formArray.controls.length < newValue.length) {
	            var remaining = newValue.length - formArray.controls.length;
	            var initialLength = formArray.controls.length;
	            for (var i = 0; i < remaining; i++) {
	                var pos = initialLength + i;
	                utils_1.getValueForKey(this.model, key).push(newValue[pos]);
	                formArray.controls.push(new forms_1.FormGroup({}));
	            }
	        }
	    };
	    FormlyForm.prototype.updateInitialValue = function () {
	        var obj = utils_1.reverseDeepMerge(this.form.value, this.model);
	        this.initialModel = JSON.parse(JSON.stringify(obj));
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyForm.prototype, "model", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', forms_1.FormGroup)
	    ], FormlyForm.prototype, "form", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], FormlyForm.prototype, "fields", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyForm.prototype, "options", void 0);
	    FormlyForm = __decorate([
	        core_1.Component({
	            selector: 'formly-form',
	            template: "\n    <formly-field *ngFor=\"let field of fields\"\n      [hide]=\"field.hideExpression\" [model]=\"fieldModel(field)\"\n      [form]=\"form\" [field]=\"field\" (modelChange)=\"changeModel($event)\"\n      [ngClass]=\"!field.fieldGroup ? field.className: undefined\"\n      [options]=\"options\">\n    </formly-field>\n    <ng-content></ng-content>\n  ",
	        }), 
	        __metadata('design:paramtypes', [formly_form_builder_1.FormlyFormBuilder])
	    ], FormlyForm);
	    return FormlyForm;
	}());
	exports.FormlyForm = FormlyForm;


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
	var forms_1 = __webpack_require__(4);
	var formly_config_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(11);
	var FormlyFormBuilder = (function () {
	    function FormlyFormBuilder(formlyConfig) {
	        this.formlyConfig = formlyConfig;
	        this.validationOpts = ['required', 'pattern', 'minLength', 'maxLength', 'min', 'max'];
	        this.formId = 0;
	    }
	    FormlyFormBuilder.prototype.buildForm = function (form, fields, model, options) {
	        if (fields === void 0) { fields = []; }
	        this.model = model;
	        this.formId++;
	        var fieldTransforms = (options && options.fieldTransform) || this.formlyConfig.extras.fieldTransform;
	        if (!Array.isArray(fieldTransforms)) {
	            fieldTransforms = [fieldTransforms];
	        }
	        fieldTransforms.forEach(function (fieldTransform) {
	            if (fieldTransform) {
	                fields = fieldTransform(fields, model, form, options);
	                if (!fields) {
	                    throw new Error('fieldTransform must return an array of fields');
	                }
	            }
	        });
	        this.registerFormControls(form, fields, model, options);
	    };
	    FormlyFormBuilder.prototype.registerFormControls = function (form, fields, model, options) {
	        var _this = this;
	        fields.map(function (field, index) {
	            field.id = utils_1.getFieldId("formly_" + _this.formId, field, index);
	            if (field.key && field.type) {
	                _this.initFieldTemplateOptions(field);
	                _this.initFieldValidation(field);
	                _this.initFieldAsyncValidation(field);
	                var path = field.key;
	                if (typeof path === 'string') {
	                    if (field.defaultValue) {
	                        _this.defaultPath = path;
	                    }
	                    path = path.split('.');
	                }
	                if (path.length > 1) {
	                    var rootPath = path.shift();
	                    var nestedForm = (form.get(rootPath) ? form.get(rootPath) : new forms_1.FormGroup({}, field.validators ? field.validators.validation : undefined, field.asyncValidators ? field.asyncValidators.validation : undefined));
	                    if (!form.get(rootPath)) {
	                        form.addControl(rootPath, nestedForm);
	                    }
	                    if (!model[rootPath]) {
	                        model[rootPath] = isNaN(rootPath) ? {} : [];
	                    }
	                    var originalKey = field.key;
	                    field.key = path;
	                    _this.buildForm(nestedForm, [field], model[rootPath], {});
	                    field.key = originalKey;
	                }
	                else {
	                    _this.formlyConfig.getMergedField(field);
	                    _this.initFieldExpression(field);
	                    _this.initFieldValidation(field);
	                    _this.initFieldAsyncValidation(field);
	                    _this.addFormControl(form, field, model[path[0]] || field.defaultValue || '');
	                    if (field.defaultValue && !model[path[0]]) {
	                        var path_1 = _this.defaultPath.split('.');
	                        path_1 = path_1.pop();
	                        utils_1.assignModelValue(_this.model, path_1, field.defaultValue);
	                        _this.defaultPath = undefined;
	                    }
	                }
	            }
	            if (field.fieldGroup) {
	                if (field.key) {
	                    var nestedForm = form.get(field.key), nestedModel = model[field.key] || {};
	                    if (!nestedForm) {
	                        nestedForm = new forms_1.FormGroup({}, field.validators ? field.validators.validation : undefined, field.asyncValidators ? field.asyncValidators.validation : undefined);
	                        form.addControl(field.key, nestedForm);
	                    }
	                    _this.buildForm(nestedForm, field.fieldGroup, nestedModel, {});
	                }
	                else {
	                    _this.buildForm(form, field.fieldGroup, model, {});
	                }
	            }
	            if (field.fieldArray && field.key) {
	                if (!(form.get(field.key) instanceof forms_1.FormArray)) {
	                    var arrayForm = new forms_1.FormArray([], field.validators ? field.validators.validation : undefined, field.asyncValidators ? field.asyncValidators.validation : undefined);
	                    form.setControl(field.key, arrayForm);
	                }
	            }
	        });
	    };
	    FormlyFormBuilder.prototype.initFieldExpression = function (field) {
	        if (field.expressionProperties) {
	            for (var key in field.expressionProperties) {
	                if (typeof field.expressionProperties[key] === 'string') {
	                    field.expressionProperties[key] = {
	                        expression: utils_1.evalStringExpression(field.expressionProperties[key], ['model', 'formState']),
	                        expressionValueSetter: utils_1.evalExpressionValueSetter(key, ['expressionValue', 'model', 'templateOptions', 'validation']),
	                    };
	                }
	            }
	        }
	        if (typeof field.hideExpression === 'string') {
	            field.hideExpression = utils_1.evalStringExpression(field.hideExpression, ['model', 'formState']);
	        }
	    };
	    FormlyFormBuilder.prototype.initFieldTemplateOptions = function (field) {
	        field.templateOptions = Object.assign({
	            label: '',
	            placeholder: '',
	            focus: false,
	        }, field.templateOptions);
	    };
	    FormlyFormBuilder.prototype.initFieldAsyncValidation = function (field) {
	        var _this = this;
	        var validators = [];
	        if (field.asyncValidators) {
	            var _loop_1 = function(validatorName) {
	                if (validatorName !== 'validation') {
	                    validators.push(function (control) {
	                        var validator = field.asyncValidators[validatorName];
	                        if (utils_1.isObject(validator)) {
	                            validator = validator.expression;
	                        }
	                        return new Promise(function (resolve) {
	                            return validator(control).then(function (result) {
	                                resolve(result ? null : (_a = {}, _a[validatorName] = true, _a));
	                                var _a;
	                            });
	                        });
	                    });
	                }
	            };
	            for (var validatorName in field.asyncValidators) {
	                _loop_1(validatorName);
	            }
	        }
	        if (field.asyncValidators && Array.isArray(field.asyncValidators.validation)) {
	            field.asyncValidators.validation.map(function (validate) {
	                if (typeof validate === 'string') {
	                    validators.push(_this.formlyConfig.getValidator(validate).validation);
	                }
	                else {
	                    validators.push(validate);
	                }
	            });
	        }
	        if (validators.length) {
	            if (field.asyncValidators && !Array.isArray(field.asyncValidators.validation)) {
	                field.asyncValidators.validation = forms_1.Validators.composeAsync([field.asyncValidators.validation].concat(validators));
	            }
	            else {
	                field.asyncValidators = {
	                    validation: forms_1.Validators.composeAsync(validators),
	                };
	            }
	        }
	    };
	    FormlyFormBuilder.prototype.initFieldValidation = function (field) {
	        var _this = this;
	        var validators = [];
	        this.validationOpts.filter(function (opt) { return field.templateOptions[opt]; }).map(function (opt) {
	            validators.push(_this.getValidation(opt, field.templateOptions[opt]));
	        });
	        if (field.validators) {
	            var _loop_2 = function(validatorName) {
	                if (validatorName !== 'validation') {
	                    validators.push(function (control) {
	                        var validator = field.validators[validatorName];
	                        if (utils_1.isObject(validator)) {
	                            validator = validator.expression;
	                        }
	                        return validator(control) ? null : (_a = {}, _a[validatorName] = true, _a);
	                        var _a;
	                    });
	                }
	            };
	            for (var validatorName in field.validators) {
	                _loop_2(validatorName);
	            }
	        }
	        if (field.validators && Array.isArray(field.validators.validation)) {
	            field.validators.validation.map(function (validate) {
	                if (typeof validate === 'string') {
	                    validators.push(_this.formlyConfig.getValidator(validate).validation);
	                }
	                else {
	                    validators.push(validate);
	                }
	            });
	        }
	        if (validators.length) {
	            if (field.validators && !Array.isArray(field.validators.validation)) {
	                field.validators.validation = forms_1.Validators.compose([field.validators.validation].concat(validators));
	            }
	            else {
	                field.validators = {
	                    validation: forms_1.Validators.compose(validators),
	                };
	            }
	        }
	    };
	    FormlyFormBuilder.prototype.addFormControl = function (form, field, model) {
	        var name = typeof field.key === 'string' ? field.key : field.key[0];
	        if (field.component && field.component.createControl) {
	            form.addControl(name, field.component.createControl(model, field));
	        }
	        else {
	            form.addControl(name, new forms_1.FormControl({ value: model, disabled: field.templateOptions.disabled }, field.validators ? field.validators.validation : undefined, field.asyncValidators ? field.asyncValidators.validation : undefined));
	        }
	        if (field.validation && field.validation.show) {
	            form.get(field.key).markAsTouched();
	        }
	    };
	    FormlyFormBuilder.prototype.getValidation = function (opt, value) {
	        var _this = this;
	        switch (opt) {
	            case this.validationOpts[0]:
	                return forms_1.Validators[opt];
	            case this.validationOpts[1]:
	            case this.validationOpts[2]:
	            case this.validationOpts[3]:
	                return forms_1.Validators[opt](value);
	            case this.validationOpts[4]:
	            case this.validationOpts[5]:
	                return function (changes) {
	                    if (_this.checkMinMax(opt, changes.value, value)) {
	                        return null;
	                    }
	                    else {
	                        return (_a = {}, _a[opt] = true, _a);
	                    }
	                    var _a;
	                };
	        }
	    };
	    FormlyFormBuilder.prototype.checkMinMax = function (opt, changes, value) {
	        if (opt === this.validationOpts[4]) {
	            return parseInt(changes) > value;
	        }
	        else {
	            return parseInt(changes) < value;
	        }
	    };
	    FormlyFormBuilder = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [formly_config_1.FormlyConfig])
	    ], FormlyFormBuilder);
	    return FormlyFormBuilder;
	}());
	exports.FormlyFormBuilder = FormlyFormBuilder;


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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var formly_group_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(11);
	exports.FORMLY_CONFIG_TOKEN = new core_1.OpaqueToken('FORMLY_CONFIG_TOKEN');
	var FormlyConfig = (function () {
	    function FormlyConfig(configs) {
	        var _this = this;
	        if (configs === void 0) { configs = []; }
	        this.types = {
	            'formly-group': {
	                name: 'formly-group',
	                component: formly_group_1.FormlyGroup,
	            },
	        };
	        this.validators = {};
	        this.wrappers = {};
	        this.templateManipulators = {
	            preWrapper: [],
	            postWrapper: [],
	        };
	        this.extras = {
	            fieldTransform: undefined,
	        };
	        configs.map(function (config) {
	            if (config.types) {
	                config.types.map(function (type) { return _this.setType(type); });
	            }
	            if (config.validators) {
	                config.validators.map(function (validator) { return _this.setValidator(validator); });
	            }
	            if (config.wrappers) {
	                config.wrappers.map(function (wrapper) { return _this.setWrapper(wrapper); });
	            }
	            if (config.manipulators) {
	                config.manipulators.map(function (manipulator) { return _this.setManipulator(manipulator); });
	            }
	        });
	    }
	    FormlyConfig.prototype.setType = function (options) {
	        var _this = this;
	        if (Array.isArray(options)) {
	            options.map(function (option) {
	                _this.setType(option);
	            });
	        }
	        else {
	            if (!this.types[options.name]) {
	                this.types[options.name] = {};
	            }
	            this.types[options.name].component = options.component;
	            this.types[options.name].name = options.name;
	            this.types[options.name].extends = options.extends;
	            this.types[options.name].defaultOptions = options.defaultOptions;
	            if (options.wrappers) {
	                options.wrappers.map(function (wrapper) {
	                    _this.setTypeWrapper(options.name, wrapper);
	                });
	            }
	        }
	    };
	    FormlyConfig.prototype.getType = function (name) {
	        if (!this.types[name]) {
	            throw new Error("[Formly Error] There is no type by the name of \"" + name + "\"");
	        }
	        if (!this.types[name].component && this.types[name].extends) {
	            this.types[name].component = this.getType(this.types[name].extends).component;
	        }
	        return this.types[name];
	    };
	    FormlyConfig.prototype.getMergedField = function (field) {
	        var _this = this;
	        if (field === void 0) { field = {}; }
	        var name = field.type;
	        if (!this.types[name]) {
	            throw new Error("[Formly Error] There is no type by the name of \"" + name + "\"");
	        }
	        if (!this.types[name].component && this.types[name].extends) {
	            this.types[name].component = this.getType(this.types[name].extends).component;
	        }
	        if (this.types[name].defaultOptions) {
	            utils_1.reverseDeepMerge(field, this.types[name].defaultOptions);
	        }
	        var extendDefaults = this.types[name].extends && this.getType(this.types[name].extends).defaultOptions;
	        if (extendDefaults) {
	            utils_1.reverseDeepMerge(field, extendDefaults);
	        }
	        if (field && field.optionsTypes) {
	            field.optionsTypes.map(function (option) {
	                var defaultOptions = _this.getType(option).defaultOptions;
	                if (defaultOptions) {
	                    utils_1.reverseDeepMerge(field, defaultOptions);
	                }
	            });
	        }
	        utils_1.reverseDeepMerge(field, this.types[name]);
	    };
	    FormlyConfig.prototype.setWrapper = function (options) {
	        var _this = this;
	        this.wrappers[options.name] = options;
	        if (options.types) {
	            options.types.map(function (type) {
	                _this.setTypeWrapper(type, options.name);
	            });
	        }
	    };
	    FormlyConfig.prototype.getWrapper = function (name) {
	        if (!this.wrappers[name]) {
	            throw new Error("[Formly Error] There is no wrapper by the name of \"" + name + "\"");
	        }
	        return this.wrappers[name];
	    };
	    FormlyConfig.prototype.setTypeWrapper = function (type, name) {
	        if (!this.types[type]) {
	            this.types[type] = {};
	        }
	        if (!this.types[type].wrappers) {
	            this.types[type].wrappers = [];
	        }
	        this.types[type].wrappers.push(name);
	    };
	    FormlyConfig.prototype.setValidator = function (options) {
	        this.validators[options.name] = options;
	    };
	    FormlyConfig.prototype.getValidator = function (name) {
	        if (!this.validators[name]) {
	            throw new Error("[Formly Error] There is no validator by the name of \"" + name + "\"");
	        }
	        return this.validators[name];
	    };
	    FormlyConfig.prototype.setManipulator = function (manipulator) {
	        new manipulator.class()[manipulator.method](this);
	    };
	    FormlyConfig = __decorate([
	        core_1.Injectable(),
	        __param(0, core_1.Inject(exports.FORMLY_CONFIG_TOKEN)), 
	        __metadata('design:paramtypes', [Array])
	    ], FormlyConfig);
	    return FormlyConfig;
	}());
	exports.FormlyConfig = FormlyConfig;


/***/ },
/* 8 */
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
	var core_1 = __webpack_require__(2);
	var field_type_1 = __webpack_require__(9);
	var utils_1 = __webpack_require__(11);
	var FormlyGroup = (function (_super) {
	    __extends(FormlyGroup, _super);
	    function FormlyGroup() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(FormlyGroup.prototype, "newOptions", {
	        get: function () {
	            return utils_1.clone(this.options);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FormlyGroup.prototype, "formlyGroup", {
	        get: function () {
	            if (this.field.key) {
	                return this.form.get(this.field.key);
	            }
	            else {
	                return this.form;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FormlyGroup = __decorate([
	        core_1.Component({
	            selector: 'formly-group',
	            template: "\n    <formly-form [fields]=\"field.fieldGroup\" [model]=\"model\" [form]=\"formlyGroup\" [options]=\"newOptions\" [ngClass]=\"field.className\"></formly-form>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyGroup);
	    return FormlyGroup;
	}(field_type_1.FieldType));
	exports.FormlyGroup = FormlyGroup;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var field_1 = __webpack_require__(10);
	var FieldType = (function (_super) {
	    __extends(FieldType, _super);
	    function FieldType() {
	        _super.apply(this, arguments);
	    }
	    FieldType.prototype.ngOnInit = function () {
	        this.lifeCycleHooks('onInit');
	    };
	    FieldType.prototype.ngOnChanges = function (changes) {
	        this.lifeCycleHooks('onChanges');
	    };
	    FieldType.prototype.ngDoCheck = function () {
	        this.lifeCycleHooks('doCheck');
	    };
	    FieldType.prototype.ngAfterContentInit = function () {
	        this.lifeCycleHooks('afterContentInit');
	    };
	    FieldType.prototype.ngAfterContentChecked = function () {
	        this.lifeCycleHooks('afterContentChecked');
	    };
	    FieldType.prototype.ngAfterViewInit = function () {
	        this.lifeCycleHooks('afterViewInit');
	    };
	    FieldType.prototype.ngAfterViewChecked = function () {
	        this.lifeCycleHooks('afterViewChecked');
	    };
	    FieldType.prototype.ngOnDestroy = function () {
	        this.lifeCycleHooks('onDestroy');
	    };
	    Object.defineProperty(FieldType.prototype, "lifecycle", {
	        get: function () {
	            return this.field.lifecycle;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FieldType.prototype.lifeCycleHooks = function (type) {
	        if (this.lifecycle && this.lifecycle[type]) {
	            this.lifecycle[type].bind(this)(this.form, this.field, this.model, this.options);
	        }
	    };
	    return FieldType;
	}(field_1.Field));
	exports.FieldType = FieldType;


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
	var forms_1 = __webpack_require__(4);
	var Field = (function () {
	    function Field() {
	    }
	    Object.defineProperty(Field.prototype, "key", {
	        get: function () { return this.field.key; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "formControl", {
	        get: function () { return this.form.get(this.key); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "templateOptions", {
	        get: function () {
	            console.warn(this.constructor['name'] + ": 'templateOptions' is deprecated. Use 'to' instead.");
	            return this.to;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "to", {
	        get: function () { return this.field.templateOptions; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "valid", {
	        get: function () { return this.formControl.touched && !this.formControl.valid; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "id", {
	        get: function () { return this.field.id; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "formState", {
	        get: function () { return this.options.formState || {}; },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', forms_1.FormGroup)
	    ], Field.prototype, "form", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Field.prototype, "field", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Field.prototype, "model", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Field.prototype, "options", void 0);
	    return Field;
	}());
	exports.Field = Field;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	function getFieldId(formId, options, index) {
	    if (options.id)
	        return options.id;
	    var type = options.type;
	    if (!type && options.template)
	        type = 'template';
	    return [formId, type, options.key, index].join('_');
	}
	exports.getFieldId = getFieldId;
	function getKeyPath(field) {
	    if (field['_formlyKeyPath'] !== undefined) {
	        return field['_formlyKeyPath'];
	    }
	    var keyPath = [];
	    if (field.key) {
	        var pathElements = typeof field.key === 'string' ? field.key.split('.') : field.key;
	        for (var _i = 0, pathElements_1 = pathElements; _i < pathElements_1.length; _i++) {
	            var pathElement = pathElements_1[_i];
	            if (typeof pathElement === 'string') {
	                pathElement = pathElement.replace(/\[(\w+)\]/g, '.$1');
	                keyPath = keyPath.concat(pathElement.split('.'));
	            }
	            else {
	                keyPath.push(pathElement);
	            }
	        }
	        for (var i = 0; i < keyPath.length; i++) {
	            var pathElement = keyPath[i];
	            if (typeof pathElement === 'string' && stringIsInteger(pathElement)) {
	                keyPath[i] = parseInt(pathElement);
	            }
	        }
	    }
	    field['_formlyKeyPath'] = keyPath;
	    return keyPath;
	}
	exports.getKeyPath = getKeyPath;
	function stringIsInteger(str) {
	    return !isNullOrUndefined(str) && /^\d+$/.test(str);
	}
	function getFieldModel(model, field, constructEmptyObjects) {
	    var keyPath = getKeyPath(field);
	    var value = model;
	    for (var i = 0; i < keyPath.length; i++) {
	        var path = keyPath[i];
	        var pathValue = value[path];
	        if (isNullOrUndefined(pathValue) && constructEmptyObjects) {
	            if (i < keyPath.length - 1) {
	                value[path] = typeof keyPath[i + 1] === 'number' ? [] : {};
	            }
	            else if (field.fieldGroup) {
	                value[path] = {};
	            }
	            else if (field.fieldArray) {
	                value[path] = [];
	            }
	        }
	        value = value[path];
	        if (!value) {
	            break;
	        }
	    }
	    return value;
	}
	exports.getFieldModel = getFieldModel;
	function assignModelValue(model, path, value) {
	    if (typeof path === 'string') {
	        path = path.split('.');
	    }
	    if (path.length > 1) {
	        var e = path.shift();
	        if (!model[e]) {
	            model[e] = isNaN(path[0]) ? {} : [];
	        }
	        assignModelValue(model[e], path, value);
	    }
	    else {
	        model[path[0]] = value;
	    }
	}
	exports.assignModelValue = assignModelValue;
	function getValueForKey(model, path) {
	    if (typeof path === 'string') {
	        path = path.split('.');
	    }
	    if (path.length > 1) {
	        var e = path.shift();
	        if (!model[e]) {
	            model[e] = isNaN(path[0]) ? {} : [];
	        }
	        return getValueForKey(model[e], path);
	    }
	    else {
	        return model[path[0]];
	    }
	}
	exports.getValueForKey = getValueForKey;
	function getKey(controlKey, actualKey) {
	    return actualKey ? actualKey + '.' + controlKey : controlKey;
	}
	exports.getKey = getKey;
	function reverseDeepMerge(dest, source) {
	    if (source === void 0) { source = undefined; }
	    var args = Array.prototype.slice.call(arguments);
	    if (!args[1]) {
	        return dest;
	    }
	    args.forEach(function (src, index) {
	        if (!index) {
	            return;
	        }
	        for (var srcArg in src) {
	            if (isNullOrUndefined(dest[srcArg]) || isBlankString(dest[srcArg])) {
	                if (isFunction(src[srcArg])) {
	                    dest[srcArg] = src[srcArg];
	                }
	                else {
	                    dest[srcArg] = clone(src[srcArg]);
	                }
	            }
	            else if (objAndSameType(dest[srcArg], src[srcArg])) {
	                reverseDeepMerge(dest[srcArg], src[srcArg]);
	            }
	        }
	    });
	    return dest;
	}
	exports.reverseDeepMerge = reverseDeepMerge;
	function isNullOrUndefined(value) {
	    return value === undefined || value === null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	function isBlankString(value) {
	    return value === '';
	}
	exports.isBlankString = isBlankString;
	function isFunction(value) {
	    return typeof (value) === 'function';
	}
	exports.isFunction = isFunction;
	function objAndSameType(obj1, obj2) {
	    return isObject(obj1) && isObject(obj2) &&
	        Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
	}
	exports.objAndSameType = objAndSameType;
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	function clone(value) {
	    if (!isObject(value)) {
	        return value;
	    }
	    return Array.isArray(value) ? value.slice(0) : Object.assign({}, value);
	}
	exports.clone = clone;
	function evalStringExpression(expression, argNames) {
	    try {
	        return Function.bind.apply(Function, [void 0].concat(argNames.concat("return " + expression + ";")))();
	    }
	    catch (error) {
	        console.error(error);
	    }
	}
	exports.evalStringExpression = evalStringExpression;
	function evalExpressionValueSetter(expression, argNames) {
	    try {
	        return Function.bind
	            .apply(Function, [void 0].concat(argNames.concat(expression + " = expressionValue;")))();
	    }
	    catch (error) {
	        console.error(error);
	    }
	}
	exports.evalExpressionValueSetter = evalExpressionValueSetter;
	function evalExpression(expression, thisArg, argVal) {
	    if (expression instanceof Function) {
	        return expression.apply(thisArg, argVal);
	    }
	    else {
	        return expression ? true : false;
	    }
	}
	exports.evalExpression = evalExpression;


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
	var forms_1 = __webpack_require__(4);
	var formly_event_emitter_1 = __webpack_require__(13);
	var formly_config_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(11);
	__webpack_require__(15);
	__webpack_require__(16);
	var FormlyField = (function () {
	    function FormlyField(elementRef, formlyPubSub, renderer, formlyConfig, componentFactoryResolver) {
	        this.elementRef = elementRef;
	        this.formlyPubSub = formlyPubSub;
	        this.renderer = renderer;
	        this.formlyConfig = formlyConfig;
	        this.componentFactoryResolver = componentFactoryResolver;
	        this.options = {};
	        this.modelChange = new core_1.EventEmitter();
	    }
	    Object.defineProperty(FormlyField.prototype, "hide", {
	        get: function () { return this._hide; },
	        set: function (value) {
	            this._hide = value;
	            this.renderer.setElementStyle(this.elementRef.nativeElement, 'display', value ? 'none' : '');
	            if (this.field.fieldGroup) {
	                for (var i = 0; i < this.field.fieldGroup.length; i++) {
	                    this.psEmit(this.field.fieldGroup[i].key, 'hidden', this._hide);
	                }
	            }
	            else {
	                this.psEmit(this.field.key, 'hidden', this._hide);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FormlyField.prototype.ngDoCheck = function () {
	        this.checkExpressionChange();
	        this.checkVisibilityChange();
	    };
	    FormlyField.prototype.ngOnInit = function () {
	        this.createFieldComponents();
	    };
	    FormlyField.prototype.changeModel = function (event) {
	        this.modelChange.emit(event);
	    };
	    FormlyField.prototype.createFieldComponents = function () {
	        var _this = this;
	        if (this.field && !this.field.template && !this.field.fieldGroup && !this.field.fieldArray) {
	            var debounce = 0;
	            if (this.field.modelOptions && this.field.modelOptions.debounce && this.field.modelOptions.debounce.default) {
	                debounce = this.field.modelOptions.debounce.default;
	            }
	            var fieldComponentRef = this.createFieldComponent();
	            if (this.field.key) {
	                var valueChanges_1 = fieldComponentRef.instance.formControl.valueChanges;
	                if (debounce > 0) {
	                    valueChanges_1 = valueChanges_1.debounceTime(debounce);
	                }
	                if (this.field.parsers && this.field.parsers.length > 0) {
	                    this.field.parsers.map(function (parserFn) {
	                        valueChanges_1 = valueChanges_1.map(parserFn);
	                    });
	                }
	                valueChanges_1.subscribe(function (event) { return _this
	                    .changeModel(new formly_event_emitter_1.FormlyValueChangeEvent(_this.field.key, event)); });
	            }
	            var update = new formly_event_emitter_1.FormlyEventEmitter();
	            update.subscribe(function (option) {
	                _this.field.templateOptions[option.key] = option.value;
	            });
	            this.formlyPubSub.setEmitter(this.field.key, update);
	        }
	        else if (this.field.fieldGroup || this.field.fieldArray) {
	            this.createFieldComponent();
	        }
	        this.hide = this.field.hideExpression ? true : false;
	    };
	    FormlyField.prototype.createFieldComponent = function () {
	        var _this = this;
	        if (this.field.fieldGroup) {
	            this.field.type = this.field.type || 'formly-group';
	        }
	        var type = this.formlyConfig.getType(this.field.type);
	        var fieldComponent = this.fieldComponent;
	        var fieldManipulators = this.getManipulators(this.field.templateOptions);
	        var preWrappers = this.runManipulators(fieldManipulators.preWrapper, this.field);
	        var postWrappers = this.runManipulators(fieldManipulators.postWrapper, this.field);
	        if (!type.wrappers)
	            type.wrappers = [];
	        if (!this.field.wrappers)
	            this.field.wrappers = [];
	        var wrappers = preWrappers.concat(this.field.wrappers, postWrappers);
	        wrappers.map(function (wrapperName) {
	            var wrapperRef = _this.createComponent(fieldComponent, _this.formlyConfig.getWrapper(wrapperName).component);
	            fieldComponent = wrapperRef.instance.fieldComponent;
	        });
	        return this.createComponent(fieldComponent, type.component);
	    };
	    FormlyField.prototype.createComponent = function (fieldComponent, component) {
	        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
	        var ref = fieldComponent.createComponent(componentFactory);
	        Object.assign(ref.instance, {
	            model: this.model,
	            form: this.form,
	            field: this.field,
	            options: this.options,
	        });
	        return ref;
	    };
	    FormlyField.prototype.psEmit = function (fieldKey, eventKey, value) {
	        if (this.formlyPubSub && this.formlyPubSub.getEmitter(fieldKey) && this.formlyPubSub.getEmitter(fieldKey).emit) {
	            this.formlyPubSub.getEmitter(fieldKey).emit(new formly_event_emitter_1.FormlyValueChangeEvent(eventKey, value));
	        }
	    };
	    FormlyField.prototype.getManipulators = function (options) {
	        var preWrapper = [];
	        var postWrapper = [];
	        if (options && options.templateManipulators) {
	            addManipulators(options.templateManipulators);
	        }
	        addManipulators(this.formlyConfig.templateManipulators);
	        return { preWrapper: preWrapper, postWrapper: postWrapper };
	        function addManipulators(manipulators) {
	            var _a = (manipulators || {}), _b = _a.preWrapper, pre = _b === void 0 ? [] : _b, _c = _a.postWrapper, post = _c === void 0 ? [] : _c;
	            preWrapper = preWrapper.concat(pre);
	            postWrapper = postWrapper.concat(post);
	        }
	    };
	    FormlyField.prototype.runManipulators = function (manipulators, field) {
	        var wrappers = [];
	        if (manipulators) {
	            manipulators.map(function (manipulator) {
	                if (manipulator(field)) {
	                    wrappers.push(manipulator(field));
	                }
	            });
	            return wrappers;
	        }
	    };
	    FormlyField.prototype.checkVisibilityChange = function () {
	        if (this.field && this.field.hideExpression !== undefined && this.field.hideExpression) {
	            var hideExpressionResult = utils_1.evalExpression(this.field.hideExpression, this, [this.model, this.options.formState]);
	            if (hideExpressionResult !== this.hide) {
	                this.hide = hideExpressionResult;
	            }
	        }
	    };
	    FormlyField.prototype.checkExpressionChange = function () {
	        if (this.field && this.field.expressionProperties !== undefined) {
	            var expressionProperties = this.field.expressionProperties;
	            if (expressionProperties) {
	                for (var key in expressionProperties) {
	                    var expressionValue = utils_1.evalExpression(expressionProperties[key].expression, this, [this.model, this.options.formState]);
	                    utils_1.evalExpression(expressionProperties[key].expressionValueSetter, this, [expressionValue, this.model, this.field.templateOptions, this.field.validation]);
	                }
	                var formControl = this.form.get(this.field.key), field = this.field;
	                if (formControl) {
	                    if (formControl.status === 'DISABLED' && !field.templateOptions.disabled) {
	                        formControl.enable();
	                    }
	                    if (formControl.status !== 'DISABLED' && field.templateOptions.disabled) {
	                        formControl.disable();
	                    }
	                    if (!formControl.dirty && formControl.invalid && field.validation && !field.validation.show) {
	                        formControl.markAsUntouched();
	                    }
	                    if (!formControl.dirty && formControl.invalid && field.validation && field.validation.show) {
	                        formControl.markAsTouched();
	                    }
	                }
	            }
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyField.prototype, "model", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', forms_1.FormGroup)
	    ], FormlyField.prototype, "form", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyField.prototype, "field", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyField.prototype, "options", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyField.prototype, "hide", null);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], FormlyField.prototype, "modelChange", void 0);
	    __decorate([
	        core_1.ViewChild('fieldComponent', { read: core_1.ViewContainerRef }), 
	        __metadata('design:type', core_1.ViewContainerRef)
	    ], FormlyField.prototype, "fieldComponent", void 0);
	    FormlyField = __decorate([
	        core_1.Component({
	            selector: 'formly-field',
	            template: "\n    <template #fieldComponent></template>\n    <div *ngIf=\"field.template && !field.fieldGroup\" [innerHtml]=\"field.template\"></div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, formly_event_emitter_1.FormlyPubSub, core_1.Renderer, formly_config_1.FormlyConfig, core_1.ComponentFactoryResolver])
	    ], FormlyField);
	    return FormlyField;
	}());
	exports.FormlyField = FormlyField;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(14);
	var FormlyValueChangeEvent = (function () {
	    function FormlyValueChangeEvent(key, value) {
	        this.key = key;
	        this.value = value;
	    }
	    return FormlyValueChangeEvent;
	}());
	exports.FormlyValueChangeEvent = FormlyValueChangeEvent;
	var FormlyEventEmitter = (function (_super) {
	    __extends(FormlyEventEmitter, _super);
	    function FormlyEventEmitter() {
	        _super.apply(this, arguments);
	    }
	    FormlyEventEmitter.prototype.emit = function (value) {
	        _super.prototype.next.call(this, value);
	    };
	    return FormlyEventEmitter;
	}(Subject_1.Subject));
	exports.FormlyEventEmitter = FormlyEventEmitter;
	var FormlyPubSub = (function () {
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
	exports.FormlyPubSub = FormlyPubSub;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

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
	var core_1 = __webpack_require__(2);
	var formly_single_focus_dispatcher_1 = __webpack_require__(18);
	var FormlyAttributes = (function () {
	    function FormlyAttributes(renderer, elementRef, focusDispatcher) {
	        this.renderer = renderer;
	        this.elementRef = elementRef;
	        this.focusDispatcher = focusDispatcher;
	        this.attributes = ['placeholder', 'tabindex', 'step', 'aria-describedby'];
	        this.statements = ['change', 'keydown', 'keyup', 'keypress', 'click', 'focus', 'blur'];
	    }
	    FormlyAttributes.prototype.onFocus = function () {
	        if (!this.field.focus) {
	            this.focusDispatcher.notify(this.field.key);
	        }
	    };
	    FormlyAttributes.prototype.ngOnInit = function () {
	        var _this = this;
	        this.focusDispatcher.listen(function (key) {
	            return _this.field.focus = _this.field.key === key;
	        });
	    };
	    FormlyAttributes.prototype.ngOnChanges = function (changes) {
	        var _this = this;
	        if (changes['field']) {
	            var previousOptions_1 = changes['field'].previousValue.templateOptions || {}, templateOptions_1 = this.field.templateOptions;
	            this.attributes
	                .filter(function (attribute) { return templateOptions_1[attribute] !== '' || templateOptions_1[attribute] !== undefined; })
	                .map(function (attribute) {
	                if (attribute === 'aria-describedby') {
	                    _this.renderer.setElementAttribute(_this.elementRef.nativeElement, attribute, _this.field.id + '-message');
	                }
	                else if (previousOptions_1[attribute] !== templateOptions_1[attribute]) {
	                    _this.renderer.setElementAttribute(_this.elementRef.nativeElement, attribute, templateOptions_1[attribute]);
	                }
	            });
	            this.statements
	                .filter(function (statement) {
	                if (previousOptions_1[statement] !== templateOptions_1[statement]) {
	                    if (typeof templateOptions_1[statement] === 'function') {
	                        _this.renderer.listen(_this.elementRef.nativeElement, statement, function () {
	                            templateOptions_1[statement](_this.field, _this.formControl);
	                        });
	                    }
	                }
	            });
	            if (this.field.focus || (changes['field'].previousValue.focus !== undefined && changes['field'].previousValue.focus !== this.field.focus)) {
	                this.renderer.invokeElementMethod(this.elementRef.nativeElement, this.field.focus ? 'focus' : 'blur', []);
	                if (this.field.focus) {
	                    this.focusDispatcher.notify(this.field.key);
	                }
	            }
	        }
	    };
	    __decorate([
	        core_1.Input('formlyAttributes'), 
	        __metadata('design:type', Object)
	    ], FormlyAttributes.prototype, "field", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyAttributes.prototype, "formControl", void 0);
	    __decorate([
	        core_1.HostListener('focus'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], FormlyAttributes.prototype, "onFocus", null);
	    FormlyAttributes = __decorate([
	        core_1.Directive({
	            selector: '[formlyAttributes]',
	            providers: [formly_single_focus_dispatcher_1.SingleFocusDispatcher],
	        }), 
	        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, formly_single_focus_dispatcher_1.SingleFocusDispatcher])
	    ], FormlyAttributes);
	    return FormlyAttributes;
	}());
	exports.FormlyAttributes = FormlyAttributes;


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
	var core_1 = __webpack_require__(2);
	var SingleFocusDispatcher = (function () {
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], SingleFocusDispatcher);
	    return SingleFocusDispatcher;
	}());
	exports.SingleFocusDispatcher = SingleFocusDispatcher;


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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var formly_config_1 = __webpack_require__(7);
	var FormlyValidationMessages = (function () {
	    function FormlyValidationMessages(configs) {
	        var _this = this;
	        if (configs === void 0) { configs = []; }
	        this.messages = {};
	        configs.map(function (config) {
	            if (config.validationMessages) {
	                config.validationMessages.map(function (validation) { return _this.addStringMessage(validation.name, validation.message); });
	            }
	        });
	    }
	    FormlyValidationMessages.prototype.addStringMessage = function (validator, message) {
	        this.messages[validator] = message;
	    };
	    FormlyValidationMessages.prototype.getMessages = function () {
	        return this.messages;
	    };
	    FormlyValidationMessages.prototype.getValidatorErrorMessage = function (prop) {
	        return this.messages[prop];
	    };
	    FormlyValidationMessages = __decorate([
	        core_1.Injectable(),
	        __param(0, core_1.Inject(formly_config_1.FORMLY_CONFIG_TOKEN)), 
	        __metadata('design:paramtypes', [Object])
	    ], FormlyValidationMessages);
	    return FormlyValidationMessages;
	}());
	exports.FormlyValidationMessages = FormlyValidationMessages;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var field_1 = __webpack_require__(10);
	var FieldWrapper = (function (_super) {
	    __extends(FieldWrapper, _super);
	    function FieldWrapper() {
	        _super.apply(this, arguments);
	    }
	    return FieldWrapper;
	}(field_1.Field));
	exports.FieldWrapper = FieldWrapper;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(22));
	__export(__webpack_require__(29));
	var formly_validation_message_1 = __webpack_require__(34);
	exports.FormlyValidationMessage = formly_validation_message_1.FormlyValidationMessage;
	var ui_bootstrap_module_1 = __webpack_require__(35);
	exports.FormlyBootstrapModule = ui_bootstrap_module_1.FormlyBootstrapModule;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var checkbox_1 = __webpack_require__(23);
	exports.FormlyFieldCheckbox = checkbox_1.FormlyFieldCheckbox;
	var multicheckbox_1 = __webpack_require__(24);
	exports.FormlyFieldMultiCheckbox = multicheckbox_1.FormlyFieldMultiCheckbox;
	var input_1 = __webpack_require__(25);
	exports.FormlyFieldInput = input_1.FormlyFieldInput;
	var radio_1 = __webpack_require__(26);
	exports.FormlyFieldRadio = radio_1.FormlyFieldRadio;
	var textarea_1 = __webpack_require__(27);
	exports.FormlyFieldTextArea = textarea_1.FormlyFieldTextArea;
	var select_1 = __webpack_require__(28);
	exports.FormlyFieldSelect = select_1.FormlyFieldSelect;


/***/ },
/* 23 */
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
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(4);
	var core_2 = __webpack_require__(1);
	var FormlyFieldCheckbox = (function (_super) {
	    __extends(FormlyFieldCheckbox, _super);
	    function FormlyFieldCheckbox() {
	        _super.apply(this, arguments);
	    }
	    FormlyFieldCheckbox.createControl = function (model, field) {
	        return new forms_1.FormControl({ value: model ? 'on' : undefined, disabled: field.templateOptions.disabled }, field.validators ? field.validators.validation : undefined, field.asyncValidators ? field.asyncValidators.validation : undefined);
	    };
	    FormlyFieldCheckbox = __decorate([
	        core_1.Component({
	            selector: 'formly-field-checkbox',
	            template: "\n    <label class=\"custom-control custom-checkbox\">\n      <input [id]=\"id\" type=\"checkbox\" [formControl]=\"formControl\"\n        *ngIf=\"!to.hidden\" value=\"on\"\n        [formlyAttributes]=\"field\" class=\"custom-control-input\">\n        {{to.label}}\n        <span class=\"custom-control-indicator\"></span>\n    </label>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyFieldCheckbox);
	    return FormlyFieldCheckbox;
	}(core_2.FieldType));
	exports.FormlyFieldCheckbox = FormlyFieldCheckbox;


/***/ },
/* 24 */
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
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(4);
	var core_2 = __webpack_require__(1);
	var FormlyFieldMultiCheckbox = (function (_super) {
	    __extends(FormlyFieldMultiCheckbox, _super);
	    function FormlyFieldMultiCheckbox() {
	        _super.apply(this, arguments);
	    }
	    FormlyFieldMultiCheckbox.createControl = function (model, field) {
	        var controlGroupConfig = field.templateOptions.options.reduce(function (previous, option) {
	            previous[option.key] = new forms_1.FormControl(model ? model[option.key] : undefined);
	            return previous;
	        }, {});
	        return new forms_1.FormGroup(controlGroupConfig);
	    };
	    FormlyFieldMultiCheckbox = __decorate([
	        core_1.Component({
	            selector: 'formly-field-multicheckbox',
	            template: "\n    <div *ngFor=\"let option of to.options\" class=\"checkbox\">\n        <label class=\"custom-control custom-checkbox\">\n            <input [id]=\"id\" type=\"checkbox\" [value]=\"option.value\" [formControl]=\"formControl.get(option.key)\"\n            [formlyAttributes]=\"field\" class=\"custom-control-input\">\n            {{option.value}}\n            <span class=\"custom-control-indicator\"></span>\n        </label>\n    </div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyFieldMultiCheckbox);
	    return FormlyFieldMultiCheckbox;
	}(core_2.FieldType));
	exports.FormlyFieldMultiCheckbox = FormlyFieldMultiCheckbox;


/***/ },
/* 25 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyFieldInput = (function (_super) {
	    __extends(FormlyFieldInput, _super);
	    function FormlyFieldInput() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(FormlyFieldInput.prototype, "type", {
	        get: function () {
	            return this.to.type || 'text';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FormlyFieldInput = __decorate([
	        core_1.Component({
	            selector: 'formly-field-input',
	            template: "\n    <input [type]=\"type\" [formControl]=\"formControl\" class=\"form-control\" [id]=\"id\"\n      [formlyAttributes]=\"field\" [ngClass]=\"{'form-control-danger': valid}\">\n    ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyFieldInput);
	    return FormlyFieldInput;
	}(core_2.FieldType));
	exports.FormlyFieldInput = FormlyFieldInput;


/***/ },
/* 26 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyFieldRadio = (function (_super) {
	    __extends(FormlyFieldRadio, _super);
	    function FormlyFieldRadio() {
	        _super.apply(this, arguments);
	    }
	    FormlyFieldRadio = __decorate([
	        core_1.Component({
	            selector: 'formly-field-radio',
	            template: "\n    <div [formGroup]=\"form\">\n      <div *ngFor=\"let option of to.options\" class=\"radio\">\n        <label class=\"custom-control custom-radio\">\n          <input [id]=\"id\" [name]=\"id\" type=\"radio\" [value]=\"option.key\" [formControl]=\"formControl\"\n          [formlyAttributes]=\"field\" class=\"custom-control-input\">\n          {{option.value}}\n          <span class=\"custom-control-indicator\"></span>\n        </label>\n      </div>\n    </div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyFieldRadio);
	    return FormlyFieldRadio;
	}(core_2.FieldType));
	exports.FormlyFieldRadio = FormlyFieldRadio;


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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyFieldTextArea = (function (_super) {
	    __extends(FormlyFieldTextArea, _super);
	    function FormlyFieldTextArea() {
	        _super.apply(this, arguments);
	    }
	    FormlyFieldTextArea = __decorate([
	        core_1.Component({
	            selector: 'formly-field-textarea',
	            template: "\n    <textarea [id]=\"id\" [name]=\"key\" [formControl]=\"formControl\" [cols]=\"to.cols\"\n      [rows]=\"to.rows\" class=\"form-control\"\n      [formlyAttributes]=\"field\">\n    </textarea>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyFieldTextArea);
	    return FormlyFieldTextArea;
	}(core_2.FieldType));
	exports.FormlyFieldTextArea = FormlyFieldTextArea;


/***/ },
/* 28 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var SelectOption = (function () {
	    function SelectOption(label, value, children) {
	        this.label = label;
	        this.value = value;
	        this.group = children;
	    }
	    return SelectOption;
	}());
	exports.SelectOption = SelectOption;
	var FormlyFieldSelect = (function (_super) {
	    __extends(FormlyFieldSelect, _super);
	    function FormlyFieldSelect() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(FormlyFieldSelect.prototype, "labelProp", {
	        get: function () { return this.to['labelProp'] || 'label'; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FormlyFieldSelect.prototype, "valueProp", {
	        get: function () { return this.to['valueProp'] || 'value'; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FormlyFieldSelect.prototype, "groupProp", {
	        get: function () { return this.to['groupProp'] || 'group'; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FormlyFieldSelect.prototype, "selectOptions", {
	        get: function () {
	            var _this = this;
	            var options = [];
	            this.to.options.map(function (option) {
	                if (!option[_this.groupProp]) {
	                    options.push(option);
	                }
	                else {
	                    var filteredOption = options.filter(function (filteredOption) {
	                        return filteredOption.label === option[_this.groupProp];
	                    });
	                    if (filteredOption[0]) {
	                        filteredOption[0].group.push({
	                            label: option[_this.labelProp],
	                            value: option[_this.valueProp],
	                        });
	                    }
	                    else {
	                        options.push({
	                            label: option[_this.groupProp],
	                            group: [{ value: option[_this.valueProp], label: option[_this.labelProp] }],
	                        });
	                    }
	                }
	            });
	            return options;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FormlyFieldSelect = __decorate([
	        core_1.Component({
	            selector: 'formly-field-select',
	            template: "\n    <select [id]=\"id\" [formControl]=\"formControl\" class=\"form-control\" [formlyAttributes]=\"field\">\n      <option value=\"\" *ngIf=\"to.placeholder\">{{to.placeholder}}</option>\n      <template ngFor let-item [ngForOf]=\"selectOptions\">\n       <optgroup *ngIf=\"item.group\" label=\"{{item.label}}\">\n         <option *ngFor=\"let child of item.group\" [value]=\"child.value\">\n           {{child.label}}\n         </option>\n       </optgroup>\n       <option *ngIf=\"!item.group\" [value]=\"item.value\">{{item.label}}</option>\n    </template>\n    </select>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyFieldSelect);
	    return FormlyFieldSelect;
	}(core_2.FieldType));
	exports.FormlyFieldSelect = FormlyFieldSelect;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fieldset_1 = __webpack_require__(30);
	exports.FormlyWrapperFieldset = fieldset_1.FormlyWrapperFieldset;
	var label_1 = __webpack_require__(31);
	exports.FormlyWrapperLabel = label_1.FormlyWrapperLabel;
	var description_1 = __webpack_require__(32);
	exports.FormlyWrapperDescription = description_1.FormlyWrapperDescription;
	var message_validation_1 = __webpack_require__(33);
	exports.FormlyWrapperValidationMessages = message_validation_1.FormlyWrapperValidationMessages;


/***/ },
/* 30 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyWrapperFieldset = (function (_super) {
	    __extends(FormlyWrapperFieldset, _super);
	    function FormlyWrapperFieldset() {
	        _super.apply(this, arguments);
	    }
	    __decorate([
	        core_1.ViewChild('fieldComponent', { read: core_1.ViewContainerRef }), 
	        __metadata('design:type', core_1.ViewContainerRef)
	    ], FormlyWrapperFieldset.prototype, "fieldComponent", void 0);
	    FormlyWrapperFieldset = __decorate([
	        core_1.Component({
	            selector: 'formly-wrapper-fieldset',
	            template: "\n    <div class=\"form-group\" [ngClass]=\"{'has-danger': valid}\">\n      <template #fieldComponent></template>\n    </div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyWrapperFieldset);
	    return FormlyWrapperFieldset;
	}(core_2.FieldWrapper));
	exports.FormlyWrapperFieldset = FormlyWrapperFieldset;


/***/ },
/* 31 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyWrapperLabel = (function (_super) {
	    __extends(FormlyWrapperLabel, _super);
	    function FormlyWrapperLabel() {
	        _super.apply(this, arguments);
	    }
	    __decorate([
	        core_1.ViewChild('fieldComponent', { read: core_1.ViewContainerRef }), 
	        __metadata('design:type', core_1.ViewContainerRef)
	    ], FormlyWrapperLabel.prototype, "fieldComponent", void 0);
	    FormlyWrapperLabel = __decorate([
	        core_1.Component({
	            selector: 'formly-wrapper-label',
	            template: "\n    <label [attr.for]=\"id\" class=\"form-control-label\">{{to.label}}</label>\n    <template #fieldComponent></template>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyWrapperLabel);
	    return FormlyWrapperLabel;
	}(core_2.FieldWrapper));
	exports.FormlyWrapperLabel = FormlyWrapperLabel;


/***/ },
/* 32 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyWrapperDescription = (function (_super) {
	    __extends(FormlyWrapperDescription, _super);
	    function FormlyWrapperDescription() {
	        _super.apply(this, arguments);
	    }
	    __decorate([
	        core_1.ViewChild('fieldComponent', { read: core_1.ViewContainerRef }), 
	        __metadata('design:type', core_1.ViewContainerRef)
	    ], FormlyWrapperDescription.prototype, "fieldComponent", void 0);
	    FormlyWrapperDescription = __decorate([
	        core_1.Component({
	            selector: 'formly-wrapper-description',
	            template: "\n    <template #fieldComponent></template>\n    <div>\n      <small class=\"text-muted\">{{to.description}}</small>\n    </div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyWrapperDescription);
	    return FormlyWrapperDescription;
	}(core_2.FieldWrapper));
	exports.FormlyWrapperDescription = FormlyWrapperDescription;


/***/ },
/* 33 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyWrapperValidationMessages = (function (_super) {
	    __extends(FormlyWrapperValidationMessages, _super);
	    function FormlyWrapperValidationMessages() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(FormlyWrapperValidationMessages.prototype, "validationId", {
	        get: function () {
	            return this.field.id + '-message';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.ViewChild('fieldComponent', { read: core_1.ViewContainerRef }), 
	        __metadata('design:type', core_1.ViewContainerRef)
	    ], FormlyWrapperValidationMessages.prototype, "fieldComponent", void 0);
	    FormlyWrapperValidationMessages = __decorate([
	        core_1.Component({
	            selector: 'formly-wrapper-validation-messages',
	            template: "\n    <template #fieldComponent></template>\n    <div>\n      <small class=\"text-muted text-danger\" *ngIf=\"valid\" role=\"alert\" [id]=\"validationId\"><formly-validation-message [fieldForm]=\"formControl\" [field]=\"field\"></formly-validation-message></small>\n    </div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyWrapperValidationMessages);
	    return FormlyWrapperValidationMessages;
	}(core_2.FieldWrapper));
	exports.FormlyWrapperValidationMessages = FormlyWrapperValidationMessages;


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
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(4);
	var core_2 = __webpack_require__(1);
	var FormlyValidationMessage = (function () {
	    function FormlyValidationMessage(formlyMessages) {
	        this.formlyMessages = formlyMessages;
	    }
	    Object.defineProperty(FormlyValidationMessage.prototype, "errorMessage", {
	        get: function () {
	            var _this = this;
	            var _loop_1 = function(error) {
	                if (this_1.fieldForm.errors.hasOwnProperty(error)) {
	                    var message_1 = this_1.formlyMessages.getValidatorErrorMessage(error);
	                    ['validators', 'asyncValidators'].map(function (validators) {
	                        if (_this.field[validators] && _this.field[validators][error] && _this.field[validators][error].message) {
	                            message_1 = _this.field.validators[error].message;
	                        }
	                    });
	                    if (typeof message_1 === 'function') {
	                        return { value: message_1(this_1.fieldForm.errors[error], this_1.field) };
	                    }
	                    return { value: message_1 };
	                }
	            };
	            var this_1 = this;
	            for (var error in this.fieldForm.errors) {
	                var state_1 = _loop_1(error);
	                if (typeof state_1 === "object") return state_1.value;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', forms_1.FormControl)
	    ], FormlyValidationMessage.prototype, "fieldForm", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FormlyValidationMessage.prototype, "field", void 0);
	    FormlyValidationMessage = __decorate([
	        core_1.Component({
	            selector: 'formly-validation-message',
	            template: "{{errorMessage}}",
	        }), 
	        __metadata('design:paramtypes', [core_2.FormlyValidationMessages])
	    ], FormlyValidationMessage);
	    return FormlyValidationMessage;
	}());
	exports.FormlyValidationMessage = FormlyValidationMessage;


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
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(3);
	var forms_1 = __webpack_require__(4);
	var core_2 = __webpack_require__(1);
	var ui_bootstrap_config_1 = __webpack_require__(36);
	var formly_validation_message_1 = __webpack_require__(34);
	var FormlyBootstrapModule = (function () {
	    function FormlyBootstrapModule() {
	    }
	    FormlyBootstrapModule = __decorate([
	        core_1.NgModule({
	            declarations: ui_bootstrap_config_1.FIELD_TYPE_COMPONENTS.concat([formly_validation_message_1.FormlyValidationMessage]),
	            imports: [
	                common_1.CommonModule,
	                forms_1.ReactiveFormsModule,
	                core_2.FormlyModule.forRoot(ui_bootstrap_config_1.BOOTSTRAP_FORMLY_CONFIG),
	            ],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyBootstrapModule);
	    return FormlyBootstrapModule;
	}());
	exports.FormlyBootstrapModule = FormlyBootstrapModule;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var addons_1 = __webpack_require__(37);
	var description_1 = __webpack_require__(38);
	var validation_1 = __webpack_require__(39);
	var addon_1 = __webpack_require__(40);
	var types_1 = __webpack_require__(22);
	var wrappers_1 = __webpack_require__(29);
	exports.FIELD_TYPE_COMPONENTS = [
	    types_1.FormlyFieldInput,
	    types_1.FormlyFieldCheckbox,
	    types_1.FormlyFieldRadio,
	    types_1.FormlyFieldSelect,
	    types_1.FormlyFieldTextArea,
	    types_1.FormlyFieldMultiCheckbox,
	    wrappers_1.FormlyWrapperLabel,
	    wrappers_1.FormlyWrapperDescription,
	    wrappers_1.FormlyWrapperValidationMessages,
	    wrappers_1.FormlyWrapperFieldset,
	    addons_1.FormlyWrapperAddons,
	];
	exports.BOOTSTRAP_FORMLY_CONFIG = {
	    types: [
	        {
	            name: 'input',
	            component: types_1.FormlyFieldInput,
	            wrappers: ['fieldset', 'label'],
	        },
	        {
	            name: 'checkbox',
	            component: types_1.FormlyFieldCheckbox,
	            wrappers: ['fieldset'],
	        },
	        {
	            name: 'radio',
	            component: types_1.FormlyFieldRadio,
	            wrappers: ['fieldset', 'label'],
	        },
	        {
	            name: 'select',
	            component: types_1.FormlyFieldSelect,
	            wrappers: ['fieldset', 'label'],
	        },
	        {
	            name: 'textarea',
	            component: types_1.FormlyFieldTextArea,
	            wrappers: ['fieldset', 'label'],
	        },
	        {
	            name: 'multicheckbox',
	            component: types_1.FormlyFieldMultiCheckbox,
	            wrappers: ['fieldset', 'label'],
	        },
	    ],
	    wrappers: [
	        { name: 'label', component: wrappers_1.FormlyWrapperLabel },
	        { name: 'description', component: wrappers_1.FormlyWrapperDescription },
	        { name: 'validation-message', component: wrappers_1.FormlyWrapperValidationMessages },
	        { name: 'fieldset', component: wrappers_1.FormlyWrapperFieldset },
	        { name: 'addons', component: addons_1.FormlyWrapperAddons },
	    ],
	    manipulators: [
	        { class: description_1.TemplateDescription, method: 'run' },
	        { class: validation_1.TemplateValidation, method: 'run' },
	        { class: addon_1.TemplateAddons, method: 'run' },
	    ],
	};


/***/ },
/* 37 */
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
	var core_1 = __webpack_require__(2);
	var core_2 = __webpack_require__(1);
	var FormlyWrapperAddons = (function (_super) {
	    __extends(FormlyWrapperAddons, _super);
	    function FormlyWrapperAddons() {
	        _super.apply(this, arguments);
	    }
	    FormlyWrapperAddons.prototype.addonRightClick = function ($event) {
	        if (this.to['addonRight'].onClick) {
	            this.to['addonRight'].onClick(this.to, this, $event);
	        }
	    };
	    FormlyWrapperAddons.prototype.addonLeftClick = function ($event) {
	        if (this.to['addonLeft'].onClick) {
	            this.to['addonLeft'].onClick(this.to, this, $event);
	        }
	    };
	    __decorate([
	        core_1.ViewChild('fieldComponent', { read: core_1.ViewContainerRef }), 
	        __metadata('design:type', core_1.ViewContainerRef)
	    ], FormlyWrapperAddons.prototype, "fieldComponent", void 0);
	    FormlyWrapperAddons = __decorate([
	        core_1.Component({
	            selector: 'formly-wrapper-addons',
	            template: "\n    <div class=\"input-group\">\n    <div class=\"input-group-addon\"\n         *ngIf=\"to.addonLeft\"\n         [ngStyle]=\"{cursor: to.addonLeft.onClick ? 'pointer' : 'inherit'}\"\n         (click)=\"addonLeftClick($event)\">\n        <i [ngClass]=\"to.addonLeft.class\" *ngIf=\"to.addonLeft.class\"></i>\n        <span *ngIf=\"to.addonLeft.text\">{{to.addonLeft.text}}</span>\n    </div>\n    <template #fieldComponent></template>\n    <div class=\"input-group-addon\"\n         *ngIf=\"to.addonRight\"\n         [ngStyle]=\"{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}\"\n         (click)=\"addonRightClick($event)\">\n        <i [ngClass]=\"to.addonRight.class\" *ngIf=\"to.addonRight.class\"></i>\n        <span *ngIf=\"to.addonRight.text\">{{to.addonRight.text}}</span>\n    </div>\n</div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormlyWrapperAddons);
	    return FormlyWrapperAddons;
	}(core_2.FieldWrapper));
	exports.FormlyWrapperAddons = FormlyWrapperAddons;


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	var TemplateDescription = (function () {
	    function TemplateDescription() {
	    }
	    TemplateDescription.prototype.run = function (fc) {
	        fc.templateManipulators.postWrapper.push(function (field) {
	            if (field && field.templateOptions && field.templateOptions.description) {
	                return 'description';
	            }
	        });
	    };
	    return TemplateDescription;
	}());
	exports.TemplateDescription = TemplateDescription;


/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	var TemplateValidation = (function () {
	    function TemplateValidation() {
	    }
	    TemplateValidation.prototype.run = function (fc) {
	        fc.templateManipulators.postWrapper.push(function (field) {
	            if (field && field.validators) {
	                return 'validation-message';
	            }
	        });
	    };
	    return TemplateValidation;
	}());
	exports.TemplateValidation = TemplateValidation;


/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";
	var TemplateAddons = (function () {
	    function TemplateAddons() {
	    }
	    TemplateAddons.prototype.run = function (fc) {
	        fc.templateManipulators.postWrapper.push(function (field) {
	            if (field && field.templateOptions && (field.templateOptions.addonLeft || field.templateOptions.addonRight)) {
	                return 'addons';
	            }
	        });
	    };
	    return TemplateAddons;
	}());
	exports.TemplateAddons = TemplateAddons;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng2-formly.umd.js.map