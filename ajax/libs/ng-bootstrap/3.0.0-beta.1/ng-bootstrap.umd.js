(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngb', ['exports', '@angular/core', '@angular/common', '@angular/forms', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.ngb = {}),global.ng.core,global.ng.common,global.ng.forms,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,common,forms,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @param {?} value
     * @return {?}
     */
    function toInteger(value) {
        return parseInt("" + value, 10);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function toString(value) {
        return (value !== undefined && value !== null) ? "" + value : '';
    }
    /**
     * @param {?} value
     * @param {?} max
     * @param {?=} min
     * @return {?}
     */
    function getValueInRange(value, max, min) {
        if (min === void 0) {
            min = 0;
        }
        return Math.max(Math.min(value, max), min);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isString(value) {
        return typeof value === 'string';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isNumber(value) {
        return !isNaN(toInteger(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isInteger(value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isDefined(value) {
        return value !== undefined && value !== null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function padNumber(value) {
        if (isNumber(value)) {
            return ("0" + value).slice(-2);
        }
        else {
            return '';
        }
    }
    /**
     * @param {?} text
     * @return {?}
     */
    function regExpEscape(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbAccordion component.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the accordions used in the application.
     */
    var NgbAccordionConfig = (function () {
        function NgbAccordionConfig() {
            this.closeOthers = false;
        }
        NgbAccordionConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbAccordionConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextId = 0;
    /**
     * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
     */
    var NgbPanelTitle = (function () {
        function NgbPanelTitle(templateRef) {
            this.templateRef = templateRef;
        }
        NgbPanelTitle.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[ngbPanelTitle]' },] },
        ];
        /** @nocollapse */
        NgbPanelTitle.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        return NgbPanelTitle;
    }());
    /**
     * This directive must be used to wrap accordion panel content.
     */
    var NgbPanelContent = (function () {
        function NgbPanelContent(templateRef) {
            this.templateRef = templateRef;
        }
        NgbPanelContent.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[ngbPanelContent]' },] },
        ];
        /** @nocollapse */
        NgbPanelContent.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        return NgbPanelContent;
    }());
    /**
     * The NgbPanel directive represents an individual panel with the title and collapsible
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
            /**
             * A flag telling if the panel is currently open
             */
            this.isOpen = false;
        }
        /**
         * @return {?}
         */
        NgbPanel.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
            function () {
                // We are using @ContentChildren instead of @ContantChild as in the Angular version being used
                // only @ContentChildren allows us to specify the {descendants: false} option.
                // Without {descendants: false} we are hitting bugs described in:
                // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
                this.titleTpl = this.titleTpls.first;
                this.contentTpl = this.contentTpls.first;
            };
        NgbPanel.decorators = [
            { type: core.Directive, args: [{ selector: 'ngb-panel' },] },
        ];
        NgbPanel.propDecorators = {
            disabled: [{ type: core.Input }],
            id: [{ type: core.Input }],
            title: [{ type: core.Input }],
            type: [{ type: core.Input }],
            titleTpls: [{ type: core.ContentChildren, args: [NgbPanelTitle, { descendants: false },] }],
            contentTpls: [{ type: core.ContentChildren, args: [NgbPanelContent, { descendants: false },] }]
        };
        return NgbPanel;
    }());
    /**
     * The NgbAccordion directive is a collection of panels.
     * It can assure that only one panel can be opened at a time.
     */
    var NgbAccordion = (function () {
        function NgbAccordion(config) {
            /**
             * An array or comma separated strings of panel identifiers that should be opened
             */
            this.activeIds = [];
            /**
             * Whether the closed panels should be hidden without destroying them
             */
            this.destroyOnHide = true;
            /**
             * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
             */
            this.panelChange = new core.EventEmitter();
            this.type = config.type;
            this.closeOtherPanels = config.closeOthers;
        }
        /**
         * Programmatically toggle a panel with a given id.
         */
        /**
         * Programmatically toggle a panel with a given id.
         * @param {?} panelId
         * @return {?}
         */
        NgbAccordion.prototype.toggle = /**
         * Programmatically toggle a panel with a given id.
         * @param {?} panelId
         * @return {?}
         */
            function (panelId) {
                /** @type {?} */
                var panel = this.panels.find(function (p) { return p.id === panelId; });
                if (panel && !panel.disabled) {
                    /** @type {?} */
                    var defaultPrevented_1 = false;
                    this.panelChange.emit({ panelId: panelId, nextState: !panel.isOpen, preventDefault: function () { defaultPrevented_1 = true; } });
                    if (!defaultPrevented_1) {
                        panel.isOpen = !panel.isOpen;
                        if (this.closeOtherPanels) {
                            this._closeOthers(panelId);
                        }
                        this._updateActiveIds();
                    }
                }
            };
        /**
         * @return {?}
         */
        NgbAccordion.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // active id updates
                if (isString(this.activeIds)) {
                    this.activeIds = this.activeIds.split(/\s*,\s*/);
                }
                // update panels open states
                this.panels.forEach(function (panel) { return panel.isOpen = !panel.disabled && _this.activeIds.indexOf(panel.id) > -1; });
                // closeOthers updates
                if (this.activeIds.length > 1 && this.closeOtherPanels) {
                    this._closeOthers(this.activeIds[0]);
                    this._updateActiveIds();
                }
            };
        /**
         * @param {?} panelId
         * @return {?}
         */
        NgbAccordion.prototype._closeOthers = /**
         * @param {?} panelId
         * @return {?}
         */
            function (panelId) {
                this.panels.forEach(function (panel) {
                    if (panel.id !== panelId) {
                        panel.isOpen = false;
                    }
                });
            };
        /**
         * @return {?}
         */
        NgbAccordion.prototype._updateActiveIds = /**
         * @return {?}
         */
            function () {
                this.activeIds = this.panels.filter(function (panel) { return panel.isOpen && !panel.disabled; }).map(function (panel) { return panel.id; });
            };
        NgbAccordion.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-accordion',
                        exportAs: 'ngbAccordion',
                        host: { 'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
                        template: "\n    <ng-template ngFor let-panel [ngForOf]=\"panels\">\n      <div class=\"card\">\n        <div role=\"tab\" id=\"{{panel.id}}-header\" [class]=\"'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')\">\n          <h5 class=\"mb-0\">\n            <button class=\"btn btn-link\" (click)=\"!!toggle(panel.id)\" [disabled]=\"panel.disabled\" [class.collapsed]=\"panel.isOpen\"\n              [attr.aria-expanded]=\"panel.isOpen\" [attr.aria-controls]=\"panel.id\">\n              {{panel.title}}<ng-template [ngTemplateOutlet]=\"panel.titleTpl?.templateRef\"></ng-template>\n            </button>\n          </h5>\n        </div>\n        <div id=\"{{panel.id}}\" role=\"tabpanel\" [attr.aria-labelledby]=\"panel.id + '-header'\"\n             class=\"card-body collapse\" [class.show]=\"panel.isOpen\" *ngIf=\"!destroyOnHide || panel.isOpen\">\n             <ng-template [ngTemplateOutlet]=\"panel.contentTpl?.templateRef\"></ng-template>\n        </div>\n      </div>\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        NgbAccordion.ctorParameters = function () {
            return [
                { type: NgbAccordionConfig }
            ];
        };
        NgbAccordion.propDecorators = {
            panels: [{ type: core.ContentChildren, args: [NgbPanel,] }],
            activeIds: [{ type: core.Input }],
            closeOtherPanels: [{ type: core.Input, args: ['closeOthers',] }],
            destroyOnHide: [{ type: core.Input }],
            type: [{ type: core.Input }],
            panelChange: [{ type: core.Output }]
        };
        return NgbAccordion;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent];
    var NgbAccordionModule = (function () {
        function NgbAccordionModule() {
        }
        /**
         * @return {?}
         */
        NgbAccordionModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbAccordionModule, providers: [NgbAccordionConfig] }; };
        NgbAccordionModule.decorators = [
            { type: core.NgModule, args: [{ declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [common.CommonModule] },] },
        ];
        return NgbAccordionModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
        NgbAlertConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbAlertConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Alerts can be used to provide feedback messages.
     */
    var NgbAlert = (function () {
        function NgbAlert(config) {
            /**
             * An event emitted when the close button is clicked. This event has no payload. Only relevant for dismissible alerts.
             */
            this.close = new core.EventEmitter();
            this.dismissible = config.dismissible;
            this.type = config.type;
        }
        /**
         * @return {?}
         */
        NgbAlert.prototype.closeHandler = /**
         * @return {?}
         */
            function () { this.close.emit(null); };
        NgbAlert.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-alert',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <div [class]=\"'alert alert-' + type + (dismissible ? ' alert-dismissible' : '')\" role=\"alert\">\n      <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.alert.close\"\n        (click)=\"closeHandler()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n      <ng-content></ng-content>\n    </div>\n    "
                    },] },
        ];
        /** @nocollapse */
        NgbAlert.ctorParameters = function () {
            return [
                { type: NgbAlertConfig }
            ];
        };
        NgbAlert.propDecorators = {
            dismissible: [{ type: core.Input }],
            type: [{ type: core.Input }],
            close: [{ type: core.Output }]
        };
        return NgbAlert;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbAlertModule = (function () {
        function NgbAlertModule() {
        }
        /**
         * @return {?}
         */
        NgbAlertModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbAlertModule, providers: [NgbAlertConfig] }; };
        NgbAlertModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbAlert], exports: [NgbAlert], imports: [common.CommonModule], entryComponents: [NgbAlert] },] },
        ];
        return NgbAlertModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbButtonLabel = (function () {
        function NgbButtonLabel() {
        }
        NgbButtonLabel.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbButtonLabel]',
                        host: { '[class.btn]': 'true', '[class.active]': 'active', '[class.disabled]': 'disabled', '[class.focus]': 'focused' }
                    },] },
        ];
        return NgbButtonLabel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_CHECKBOX_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgbCheckBox; }),
        multi: true
    };
    /**
     * Easily create Bootstrap-style checkbox buttons. A value of a checked button is bound to a variable
     * specified via ngModel.
     */
    var NgbCheckBox = (function () {
        function NgbCheckBox(_label) {
            this._label = _label;
            /**
             * A flag indicating if a given checkbox button is disabled.
             */
            this.disabled = false;
            /**
             * Value to be propagated as model when the checkbox is checked.
             */
            this.valueChecked = true;
            /**
             * Value to be propagated as model when the checkbox is unchecked.
             */
            this.valueUnChecked = false;
            this.onChange = function (_) { };
            this.onTouched = function () { };
        }
        Object.defineProperty(NgbCheckBox.prototype, "focused", {
            set: /**
             * @param {?} isFocused
             * @return {?}
             */ function (isFocused) {
                this._label.focused = isFocused;
                if (!isFocused) {
                    this.onTouched();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbCheckBox.prototype.onInputChange = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                /** @type {?} */
                var modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
                this.onChange(modelToPropagate);
                this.onTouched();
                this.writeValue(modelToPropagate);
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbCheckBox.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onChange = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbCheckBox.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onTouched = fn; };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgbCheckBox.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) {
                this.disabled = isDisabled;
                this._label.disabled = isDisabled;
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbCheckBox.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.checked = value === this.valueChecked;
                this._label.active = this.checked;
            };
        NgbCheckBox.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbButton][type=checkbox]',
                        host: {
                            'autocomplete': 'off',
                            '[checked]': 'checked',
                            '[disabled]': 'disabled',
                            '(change)': 'onInputChange($event)',
                            '(focus)': 'focused = true',
                            '(blur)': 'focused = false'
                        },
                        providers: [NGB_CHECKBOX_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        NgbCheckBox.ctorParameters = function () {
            return [
                { type: NgbButtonLabel }
            ];
        };
        NgbCheckBox.propDecorators = {
            disabled: [{ type: core.Input }],
            valueChecked: [{ type: core.Input }],
            valueUnChecked: [{ type: core.Input }]
        };
        return NgbCheckBox;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_RADIO_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgbRadioGroup; }),
        multi: true
    };
    /** @type {?} */
    var nextId$1 = 0;
    /**
     * Easily create Bootstrap-style radio buttons. A value of a selected button is bound to a variable
     * specified via ngModel.
     */
    var NgbRadioGroup = (function () {
        function NgbRadioGroup() {
            this._radios = new Set();
            this._value = null;
            /**
             * The name of the group. Unless enclosed inputs specify a name, this name is used as the name of the
             * enclosed inputs. If not specified, a name is generated automatically.
             */
            this.name = "ngb-radio-" + nextId$1++;
            this.onChange = function (_) { };
            this.onTouched = function () { };
        }
        Object.defineProperty(NgbRadioGroup.prototype, "disabled", {
            get: /**
             * @return {?}
             */ function () { return this._disabled; },
            set: /**
             * @param {?} isDisabled
             * @return {?}
             */ function (isDisabled) { this.setDisabledState(isDisabled); },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} radio
         * @return {?}
         */
        NgbRadioGroup.prototype.onRadioChange = /**
         * @param {?} radio
         * @return {?}
         */
            function (radio) {
                this.writeValue(radio.value);
                this.onChange(radio.value);
            };
        /**
         * @return {?}
         */
        NgbRadioGroup.prototype.onRadioValueUpdate = /**
         * @return {?}
         */
            function () { this._updateRadiosValue(); };
        /**
         * @param {?} radio
         * @return {?}
         */
        NgbRadioGroup.prototype.register = /**
         * @param {?} radio
         * @return {?}
         */
            function (radio) { this._radios.add(radio); };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbRadioGroup.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onChange = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbRadioGroup.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onTouched = fn; };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgbRadioGroup.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) {
                this._disabled = isDisabled;
                this._updateRadiosDisabled();
            };
        /**
         * @param {?} radio
         * @return {?}
         */
        NgbRadioGroup.prototype.unregister = /**
         * @param {?} radio
         * @return {?}
         */
            function (radio) { this._radios.delete(radio); };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbRadioGroup.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this._value = value;
                this._updateRadiosValue();
            };
        /**
         * @return {?}
         */
        NgbRadioGroup.prototype._updateRadiosValue = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._radios.forEach(function (radio) { return radio.updateValue(_this._value); });
            };
        /**
         * @return {?}
         */
        NgbRadioGroup.prototype._updateRadiosDisabled = /**
         * @return {?}
         */
            function () { this._radios.forEach(function (radio) { return radio.updateDisabled(); }); };
        NgbRadioGroup.decorators = [
            { type: core.Directive, args: [{ selector: '[ngbRadioGroup]', host: { 'role': 'group' }, providers: [NGB_RADIO_VALUE_ACCESSOR] },] },
        ];
        NgbRadioGroup.propDecorators = {
            name: [{ type: core.Input }]
        };
        return NgbRadioGroup;
    }());
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
            this._group.register(this);
        }
        Object.defineProperty(NgbRadio.prototype, "value", {
            get: /**
             * @return {?}
             */ function () { return this._value; },
            /**
             * You can specify model value of a given radio by binding to the value property.
             */
            set: /**
             * You can specify model value of a given radio by binding to the value property.
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._value = value;
                /** @type {?} */
                var stringValue = value ? value.toString() : '';
                this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
                this._group.onRadioValueUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "disabled", {
            get: /**
             * @return {?}
             */ function () { return this._group.disabled || this._disabled; },
            /**
             * A flag indicating if a given radio button is disabled.
             */
            set: /**
             * A flag indicating if a given radio button is disabled.
             * @param {?} isDisabled
             * @return {?}
             */ function (isDisabled) {
                this._disabled = isDisabled !== false;
                this.updateDisabled();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "focused", {
            set: /**
             * @param {?} isFocused
             * @return {?}
             */ function (isFocused) {
                if (this._label) {
                    this._label.focused = isFocused;
                }
                if (!isFocused) {
                    this._group.onTouched();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "checked", {
            get: /**
             * @return {?}
             */ function () { return this._checked; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "nameAttr", {
            get: /**
             * @return {?}
             */ function () { return this.name || this._group.name; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgbRadio.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () { this._group.unregister(this); };
        /**
         * @return {?}
         */
        NgbRadio.prototype.onChange = /**
         * @return {?}
         */
            function () { this._group.onRadioChange(this); };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbRadio.prototype.updateValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this._checked = this.value === value;
                this._label.active = this._checked;
            };
        /**
         * @return {?}
         */
        NgbRadio.prototype.updateDisabled = /**
         * @return {?}
         */
            function () { this._label.disabled = this.disabled; };
        NgbRadio.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbButton][type=radio]',
                        host: {
                            '[checked]': 'checked',
                            '[disabled]': 'disabled',
                            '[name]': 'nameAttr',
                            '(change)': 'onChange()',
                            '(focus)': 'focused = true',
                            '(blur)': 'focused = false'
                        }
                    },] },
        ];
        /** @nocollapse */
        NgbRadio.ctorParameters = function () {
            return [
                { type: NgbRadioGroup },
                { type: NgbButtonLabel },
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        NgbRadio.propDecorators = {
            name: [{ type: core.Input }],
            value: [{ type: core.Input, args: ['value',] }],
            disabled: [{ type: core.Input, args: ['disabled',] }]
        };
        return NgbRadio;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_BUTTON_DIRECTIVES = [NgbButtonLabel, NgbCheckBox, NgbRadioGroup, NgbRadio];
    var NgbButtonsModule = (function () {
        function NgbButtonsModule() {
        }
        /**
         * @return {?}
         */
        NgbButtonsModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbButtonsModule, providers: [] }; };
        NgbButtonsModule.decorators = [
            { type: core.NgModule, args: [{ declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES },] },
        ];
        return NgbButtonsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.pauseOnHover = true;
            this.showNavigationArrows = true;
            this.showNavigationIndicators = true;
        }
        NgbCarouselConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbCarouselConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextId$2 = 0;
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
            this.id = "ngb-slide-" + nextId$2++;
        }
        NgbSlide.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[ngbSlide]' },] },
        ];
        /** @nocollapse */
        NgbSlide.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        NgbSlide.propDecorators = {
            id: [{ type: core.Input }]
        };
        return NgbSlide;
    }());
    /**
     * Directive to easily create carousels based on Bootstrap's markup.
     */
    var NgbCarousel = (function () {
        function NgbCarousel(config) {
            /**
             * A carousel slide event fired when the slide transition is completed.
             * See NgbSlideEvent for payload details
             */
            this.slide = new core.EventEmitter();
            this.interval = config.interval;
            this.wrap = config.wrap;
            this.keyboard = config.keyboard;
            this.pauseOnHover = config.pauseOnHover;
            this.showNavigationArrows = config.showNavigationArrows;
            this.showNavigationIndicators = config.showNavigationIndicators;
        }
        /**
         * @return {?}
         */
        NgbCarousel.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var activeSlide = this._getSlideById(this.activeId);
                this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { this._startTimer(); };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbCarousel.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if ('interval' in changes && !changes['interval'].isFirstChange()) {
                    this._restartTimer();
                }
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () { clearInterval(this._slideChangeInterval); };
        /**
         * Navigate to a slide with the specified identifier.
         */
        /**
         * Navigate to a slide with the specified identifier.
         * @param {?} slideId
         * @return {?}
         */
        NgbCarousel.prototype.select = /**
         * Navigate to a slide with the specified identifier.
         * @param {?} slideId
         * @return {?}
         */
            function (slideId) {
                this.cycleToSelected(slideId, this.getSlideEventDirection(this.activeId, slideId));
                this._restartTimer();
            };
        /**
         * Navigate to the next slide.
         */
        /**
         * Navigate to the next slide.
         * @return {?}
         */
        NgbCarousel.prototype.prev = /**
         * Navigate to the next slide.
         * @return {?}
         */
            function () {
                this.cycleToPrev();
                this._restartTimer();
            };
        /**
         * Navigate to the next slide.
         */
        /**
         * Navigate to the next slide.
         * @return {?}
         */
        NgbCarousel.prototype.next = /**
         * Navigate to the next slide.
         * @return {?}
         */
            function () {
                this.cycleToNext();
                this._restartTimer();
            };
        /**
         * Stops the carousel from cycling through items.
         */
        /**
         * Stops the carousel from cycling through items.
         * @return {?}
         */
        NgbCarousel.prototype.pause = /**
         * Stops the carousel from cycling through items.
         * @return {?}
         */
            function () { this._stopTimer(); };
        /**
         * Restarts cycling through the carousel slides from left to right.
         */
        /**
         * Restarts cycling through the carousel slides from left to right.
         * @return {?}
         */
        NgbCarousel.prototype.cycle = /**
         * Restarts cycling through the carousel slides from left to right.
         * @return {?}
         */
            function () { this._startTimer(); };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.cycleToNext = /**
         * @return {?}
         */
            function () { this.cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT); };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.cycleToPrev = /**
         * @return {?}
         */
            function () { this.cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT); };
        /**
         * @param {?} slideIdx
         * @param {?} direction
         * @return {?}
         */
        NgbCarousel.prototype.cycleToSelected = /**
         * @param {?} slideIdx
         * @param {?} direction
         * @return {?}
         */
            function (slideIdx, direction) {
                /** @type {?} */
                var selectedSlide = this._getSlideById(slideIdx);
                if (selectedSlide) {
                    if (selectedSlide.id !== this.activeId) {
                        this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction });
                    }
                    this.activeId = selectedSlide.id;
                }
            };
        /**
         * @param {?} currentActiveSlideId
         * @param {?} nextActiveSlideId
         * @return {?}
         */
        NgbCarousel.prototype.getSlideEventDirection = /**
         * @param {?} currentActiveSlideId
         * @param {?} nextActiveSlideId
         * @return {?}
         */
            function (currentActiveSlideId, nextActiveSlideId) {
                /** @type {?} */
                var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
                /** @type {?} */
                var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
                return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.keyPrev = /**
         * @return {?}
         */
            function () {
                if (this.keyboard) {
                    this.prev();
                }
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.keyNext = /**
         * @return {?}
         */
            function () {
                if (this.keyboard) {
                    this.next();
                }
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.onMouseEnter = /**
         * @return {?}
         */
            function () {
                if (this.pauseOnHover) {
                    this.pause();
                }
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype.onMouseLeave = /**
         * @return {?}
         */
            function () {
                if (this.pauseOnHover) {
                    this.cycle();
                }
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype._restartTimer = /**
         * @return {?}
         */
            function () {
                this._stopTimer();
                this._startTimer();
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype._startTimer = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.interval > 0) {
                    this._slideChangeInterval = setInterval(function () { _this.cycleToNext(); }, this.interval);
                }
            };
        /**
         * @return {?}
         */
        NgbCarousel.prototype._stopTimer = /**
         * @return {?}
         */
            function () { clearInterval(this._slideChangeInterval); };
        /**
         * @param {?} slideId
         * @return {?}
         */
        NgbCarousel.prototype._getSlideById = /**
         * @param {?} slideId
         * @return {?}
         */
            function (slideId) {
                /** @type {?} */
                var slideWithId = this.slides.filter(function (slide) { return slide.id === slideId; });
                return slideWithId.length ? slideWithId[0] : null;
            };
        /**
         * @param {?} slideId
         * @return {?}
         */
        NgbCarousel.prototype._getSlideIdxById = /**
         * @param {?} slideId
         * @return {?}
         */
            function (slideId) {
                return this.slides.toArray().indexOf(this._getSlideById(slideId));
            };
        /**
         * @param {?} currentSlideId
         * @return {?}
         */
        NgbCarousel.prototype._getNextSlide = /**
         * @param {?} currentSlideId
         * @return {?}
         */
            function (currentSlideId) {
                /** @type {?} */
                var slideArr = this.slides.toArray();
                /** @type {?} */
                var currentSlideIdx = this._getSlideIdxById(currentSlideId);
                /** @type {?} */
                var isLastSlide = currentSlideIdx === slideArr.length - 1;
                return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
                    slideArr[currentSlideIdx + 1].id;
            };
        /**
         * @param {?} currentSlideId
         * @return {?}
         */
        NgbCarousel.prototype._getPrevSlide = /**
         * @param {?} currentSlideId
         * @return {?}
         */
            function (currentSlideId) {
                /** @type {?} */
                var slideArr = this.slides.toArray();
                /** @type {?} */
                var currentSlideIdx = this._getSlideIdxById(currentSlideId);
                /** @type {?} */
                var isFirstSlide = currentSlideIdx === 0;
                return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
                    slideArr[currentSlideIdx - 1].id;
            };
        NgbCarousel.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-carousel',
                        exportAs: 'ngbCarousel',
                        host: {
                            'class': 'carousel slide',
                            '[style.display]': '"block"',
                            'tabIndex': '0',
                            '(mouseenter)': 'onMouseEnter()',
                            '(mouseleave)': 'onMouseLeave()',
                            '(keydown.arrowLeft)': 'keyPrev()',
                            '(keydown.arrowRight)': 'keyNext()'
                        },
                        template: "\n    <ol class=\"carousel-indicators\" *ngIf=\"showNavigationIndicators\">\n      <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\"\n          (click)=\"cycleToSelected(slide.id, getSlideEventDirection(activeId, slide.id))\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div *ngFor=\"let slide of slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" role=\"button\" (click)=\"cycleToPrev()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.previous\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" role=\"button\" (click)=\"cycleToNext()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.next\">Next</span>\n    </a>\n    "
                    },] },
        ];
        /** @nocollapse */
        NgbCarousel.ctorParameters = function () {
            return [
                { type: NgbCarouselConfig }
            ];
        };
        NgbCarousel.propDecorators = {
            slides: [{ type: core.ContentChildren, args: [NgbSlide,] }],
            activeId: [{ type: core.Input }],
            interval: [{ type: core.Input }],
            wrap: [{ type: core.Input }],
            keyboard: [{ type: core.Input }],
            pauseOnHover: [{ type: core.Input }],
            showNavigationArrows: [{ type: core.Input }],
            showNavigationIndicators: [{ type: core.Input }],
            slide: [{ type: core.Output }]
        };
        return NgbCarousel;
    }());
    /** @enum {string} */
    var NgbSlideEventDirection = {
        LEFT: /** @type {?} */ ('left'),
        RIGHT: /** @type {?} */ ('right'),
    };
    /** @type {?} */
    var NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbCarouselModule = (function () {
        function NgbCarouselModule() {
        }
        /**
         * @return {?}
         */
        NgbCarouselModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbCarouselModule, providers: [NgbCarouselConfig] }; };
        NgbCarouselModule.decorators = [
            { type: core.NgModule, args: [{ declarations: NGB_CAROUSEL_DIRECTIVES, exports: NGB_CAROUSEL_DIRECTIVES, imports: [common.CommonModule] },] },
        ];
        return NgbCarouselModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
        NgbCollapse.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbCollapse]',
                        exportAs: 'ngbCollapse',
                        host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
                    },] },
        ];
        NgbCollapse.propDecorators = {
            collapsed: [{ type: core.Input, args: ['ngbCollapse',] }]
        };
        return NgbCollapse;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbCollapseModule = (function () {
        function NgbCollapseModule() {
        }
        /**
         * @return {?}
         */
        NgbCollapseModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbCollapseModule, providers: [] }; };
        NgbCollapseModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbCollapse], exports: [NgbCollapse] },] },
        ];
        return NgbCollapseModule;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDate = (function () {
        function NgbDate(year, month, day) {
            this.year = year;
            this.month = month;
            this.day = day;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDate.from = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                return date ? new NgbDate(date.year, date.month, date.day ? date.day : 1) : null;
            };
        /**
         * @param {?} other
         * @return {?}
         */
        NgbDate.prototype.equals = /**
         * @param {?} other
         * @return {?}
         */
            function (other) {
                return other && this.year === other.year && this.month === other.month && this.day === other.day;
            };
        /**
         * @param {?} other
         * @return {?}
         */
        NgbDate.prototype.before = /**
         * @param {?} other
         * @return {?}
         */
            function (other) {
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
        /**
         * @param {?} other
         * @return {?}
         */
        NgbDate.prototype.after = /**
         * @param {?} other
         * @return {?}
         */
            function (other) {
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
        /**
         * @return {?}
         */
        NgbDate.prototype.toStruct = /**
         * @return {?}
         */
            function () { return { year: this.year, month: this.month, day: this.day }; };
        /**
         * @return {?}
         */
        NgbDate.prototype.toString = /**
         * @return {?}
         */
            function () { return this.year + "-" + this.month + "-" + this.day; };
        return NgbDate;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @param {?} jsDate
     * @return {?}
     */
    function fromJSDate(jsDate) {
        return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
    }
    /**
     * @param {?} date
     * @return {?}
     */
    function toJSDate(date) {
        /** @type {?} */
        var jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // this is done avoid 30 -> 1930 conversion
        if (!isNaN(jsDate.getTime())) {
            jsDate.setFullYear(date.year);
        }
        return jsDate;
    }
    /**
     * @abstract
     */
    var NgbCalendar = (function () {
        function NgbCalendar() {
        }
        NgbCalendar.decorators = [
            { type: core.Injectable },
        ];
        return NgbCalendar;
    }());
    var NgbCalendarGregorian = (function (_super) {
        __extends(NgbCalendarGregorian, _super);
        function NgbCalendarGregorian() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getDaysPerWeek = /**
         * @return {?}
         */
            function () { return 7; };
        /**
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getMonths = /**
         * @return {?}
         */
            function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
        /**
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getWeeksPerMonth = /**
         * @return {?}
         */
            function () { return 6; };
        /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getNext = /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
            function (date, period, number) {
                if (period === void 0) {
                    period = 'd';
                }
                if (number === void 0) {
                    number = 1;
                }
                /** @type {?} */
                var jsDate = toJSDate(date);
                switch (period) {
                    case 'y':
                        return new NgbDate(date.year + number, 1, 1);
                    case 'm':
                        jsDate = new Date(date.year, date.month + number - 1, 1, 12);
                        break;
                    case 'd':
                        jsDate.setDate(jsDate.getDate() + number);
                        break;
                    default:
                        return date;
                }
                return fromJSDate(jsDate);
            };
        /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getPrev = /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
            function (date, period, number) {
                if (period === void 0) {
                    period = 'd';
                }
                if (number === void 0) {
                    number = 1;
                }
                return this.getNext(date, period, -number);
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getWeekday = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                /** @type {?} */
                var jsDate = toJSDate(date);
                /** @type {?} */
                var day = jsDate.getDay();
                // in JS Date Sun=0, in ISO 8601 Sun=7
                return day === 0 ? 7 : day;
            };
        /**
         * @param {?} week
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getWeekNumber = /**
         * @param {?} week
         * @param {?} firstDayOfWeek
         * @return {?}
         */
            function (week, firstDayOfWeek) {
                // in JS Date Sun=0, in ISO 8601 Sun=7
                if (firstDayOfWeek === 7) {
                    firstDayOfWeek = 0;
                }
                /** @type {?} */
                var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
                /** @type {?} */
                var date = week[thursdayIndex];
                /** @type {?} */
                var jsDate = toJSDate(date);
                jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
                /** @type {?} */
                var time = jsDate.getTime();
                jsDate.setMonth(0); // Compare with Jan 1
                jsDate.setDate(1);
                return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
            };
        /**
         * @return {?}
         */
        NgbCalendarGregorian.prototype.getToday = /**
         * @return {?}
         */
            function () { return fromJSDate(new Date()); };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbCalendarGregorian.prototype.isValid = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
                    return false;
                }
                /** @type {?} */
                var jsDate = toJSDate(date);
                return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
                    jsDate.getDate() === date.day;
            };
        NgbCalendarGregorian.decorators = [
            { type: core.Injectable },
        ];
        return NgbCalendarGregorian;
    }(NgbCalendar));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @param {?} prev
     * @param {?} next
     * @return {?}
     */
    function isChangedDate(prev, next) {
        return !dateComparator(prev, next);
    }
    /**
     * @param {?} prev
     * @param {?} next
     * @return {?}
     */
    function dateComparator(prev, next) {
        return (!prev && !next) || (!!prev && !!next && prev.equals(next));
    }
    /**
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function checkMinBeforeMax(minDate, maxDate) {
        if (maxDate && minDate && maxDate.before(minDate)) {
            throw new Error("'maxDate' " + maxDate + " should be greater than 'minDate' " + minDate);
        }
    }
    /**
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function checkDateInRange(date, minDate, maxDate) {
        if (date && minDate && date.before(minDate)) {
            return NgbDate.from(minDate);
        }
        if (date && maxDate && date.after(maxDate)) {
            return NgbDate.from(maxDate);
        }
        return date;
    }
    /**
     * @param {?} date
     * @param {?} state
     * @return {?}
     */
    function isDateSelectable(date, state) {
        var minDate = state.minDate, maxDate = state.maxDate, disabled = state.disabled, markDisabled = state.markDisabled;
        // clang-format off
        return !(!isDefined(date) ||
            disabled ||
            (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
            (minDate && date.before(minDate)) ||
            (maxDate && date.after(maxDate)));
        // clang-format on
    }
    /**
     * @param {?} calendar
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
        if (!date) {
            return [];
        }
        /** @type {?} */
        var months = calendar.getMonths();
        if (minDate && date.year === minDate.year) {
            /** @type {?} */
            var index = months.findIndex(function (month) { return month === minDate.month; });
            months = months.slice(index);
        }
        if (maxDate && date.year === maxDate.year) {
            /** @type {?} */
            var index = months.findIndex(function (month) { return month === maxDate.month; });
            months = months.slice(0, index + 1);
        }
        return months;
    }
    /**
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function generateSelectBoxYears(date, minDate, maxDate) {
        if (!date) {
            return [];
        }
        /** @type {?} */
        var start = minDate && minDate.year || date.year - 10;
        /** @type {?} */
        var end = maxDate && maxDate.year || date.year + 10;
        return Array.from({ length: end - start + 1 }, function (e, i) { return start + i; });
    }
    /**
     * @param {?} calendar
     * @param {?} date
     * @param {?} maxDate
     * @return {?}
     */
    function nextMonthDisabled(calendar, date, maxDate) {
        return maxDate && calendar.getNext(date, 'm').after(maxDate);
    }
    /**
     * @param {?} calendar
     * @param {?} date
     * @param {?} minDate
     * @return {?}
     */
    function prevMonthDisabled(calendar, date, minDate) {
        /** @type {?} */
        var prevDate = calendar.getPrev(date, 'm');
        return minDate && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
            prevDate.year < minDate.year && minDate.month === 1);
    }
    /**
     * @param {?} calendar
     * @param {?} date
     * @param {?} state
     * @param {?} i18n
     * @param {?} force
     * @return {?}
     */
    function buildMonths(calendar, date, state, i18n, force) {
        var displayMonths = state.displayMonths, months = state.months;
        /** @type {?} */
        var monthsToReuse = months.splice(0, months.length);
        /** @type {?} */
        var firstDates = Array.from({ length: displayMonths }, function (_, i) {
            /** @type {?} */
            var firstDate = calendar.getNext(date, 'm', i);
            months[i] = null;
            if (!force) {
                /** @type {?} */
                var reusedIndex = monthsToReuse.findIndex(function (month) { return month.firstDate.equals(firstDate); });
                // move reused month back to months
                if (reusedIndex !== -1) {
                    months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
                }
            }
            return firstDate;
        });
        // rebuild nullified months
        firstDates.forEach(function (firstDate, i) {
            if (months[i] === null) {
                months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || /** @type {?} */ ({}));
            }
        });
        return months;
    }
    /**
     * @param {?} calendar
     * @param {?} date
     * @param {?} state
     * @param {?} i18n
     * @param {?=} month
     * @return {?}
     */
    function buildMonth(calendar, date, state, i18n, month) {
        if (month === void 0) {
            month = /** @type {?} */ ({});
        }
        var minDate = state.minDate, maxDate = state.maxDate, firstDayOfWeek = state.firstDayOfWeek, markDisabled = state.markDisabled, outsideDays = state.outsideDays;
        month.firstDate = null;
        month.lastDate = null;
        month.number = date.month;
        month.year = date.year;
        month.weeks = month.weeks || [];
        month.weekdays = month.weekdays || [];
        date = getFirstViewDate(calendar, date, firstDayOfWeek);
        // month has weeks
        for (var week = 0; week < calendar.getWeeksPerMonth(); week++) {
            /** @type {?} */
            var weekObject = month.weeks[week];
            if (!weekObject) {
                weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
            }
            /** @type {?} */
            var days = weekObject.days;
            // week has days
            for (var day = 0; day < calendar.getDaysPerWeek(); day++) {
                if (week === 0) {
                    month.weekdays[day] = calendar.getWeekday(date);
                }
                /** @type {?} */
                var newDate = new NgbDate(date.year, date.month, date.day);
                /** @type {?} */
                var nextDate = calendar.getNext(newDate);
                /** @type {?} */
                var ariaLabel = i18n.getDayAriaLabel(newDate);
                /** @type {?} */
                var disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
                if (!disabled && markDisabled) {
                    disabled = markDisabled(newDate, { month: month.number, year: month.year });
                }
                // saving first date of the month
                if (month.firstDate === null && newDate.month === month.number) {
                    month.firstDate = newDate;
                }
                // saving last date of the month
                if (newDate.month === month.number && nextDate.month !== month.number) {
                    month.lastDate = newDate;
                }
                /** @type {?} */
                var dayObject = days[day];
                if (!dayObject) {
                    dayObject = days[day] = /** @type {?} */ ({});
                }
                dayObject.date = newDate;
                dayObject.context = Object.assign(dayObject.context || {}, {
                    date: { year: newDate.year, month: newDate.month, day: newDate.day },
                    currentMonth: month.number, disabled: disabled,
                    focused: false,
                    selected: false
                });
                dayObject.tabindex = -1;
                dayObject.ariaLabel = ariaLabel;
                dayObject.hidden = false;
                date = nextDate;
            }
            weekObject.number = calendar.getWeekNumber(days.map(function (day) { return NgbDate.from(day.date); }), firstDayOfWeek);
            // marking week as collapsed
            weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
                days[days.length - 1].date.month !== month.number;
        }
        return month;
    }
    /**
     * @param {?} calendar
     * @param {?} date
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function getFirstViewDate(calendar, date, firstDayOfWeek) {
        /** @type {?} */
        var daysPerWeek = calendar.getDaysPerWeek();
        /** @type {?} */
        var firstMonthDate = new NgbDate(date.year, date.month, 1);
        /** @type {?} */
        var dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
        return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Type of the service supplying month and weekday names to to NgbDatepicker component.
     * The default implementation of this service honors the Angular locale, and uses the registered locale data,
     * as explained in the Angular i18n guide.
     * See the i18n demo for how to extend this class and define a custom provider for i18n.
     * @abstract
     */
    var NgbDatepickerI18n = (function () {
        function NgbDatepickerI18n() {
        }
        NgbDatepickerI18n.decorators = [
            { type: core.Injectable },
        ];
        return NgbDatepickerI18n;
    }());
    var NgbDatepickerI18nDefault = (function (_super) {
        __extends(NgbDatepickerI18nDefault, _super);
        function NgbDatepickerI18nDefault(_locale, _datePipe) {
            var _this = _super.call(this) || this;
            _this._locale = _locale;
            _this._datePipe = _datePipe;
            /** @type {?} */
            var weekdaysStartingOnSunday = common.getLocaleDayNames(_locale, common.FormStyle.Standalone, common.TranslationWidth.Short);
            _this._weekdaysShort = weekdaysStartingOnSunday.map(function (day, index) { return weekdaysStartingOnSunday[(index + 1) % 7]; });
            _this._monthsShort = common.getLocaleMonthNames(_locale, common.FormStyle.Standalone, common.TranslationWidth.Abbreviated);
            _this._monthsFull = common.getLocaleMonthNames(_locale, common.FormStyle.Standalone, common.TranslationWidth.Wide);
            return _this;
        }
        /**
         * @param {?} weekday
         * @return {?}
         */
        NgbDatepickerI18nDefault.prototype.getWeekdayShortName = /**
         * @param {?} weekday
         * @return {?}
         */
            function (weekday) { return this._weekdaysShort[weekday - 1]; };
        /**
         * @param {?} month
         * @return {?}
         */
        NgbDatepickerI18nDefault.prototype.getMonthShortName = /**
         * @param {?} month
         * @return {?}
         */
            function (month) { return this._monthsShort[month - 1]; };
        /**
         * @param {?} month
         * @return {?}
         */
        NgbDatepickerI18nDefault.prototype.getMonthFullName = /**
         * @param {?} month
         * @return {?}
         */
            function (month) { return this._monthsFull[month - 1]; };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDatepickerI18nDefault.prototype.getDayAriaLabel = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                /** @type {?} */
                var jsDate = new Date(date.year, date.month - 1, date.day);
                return this._datePipe.transform(jsDate, 'fullDate', null, this._locale);
            };
        NgbDatepickerI18nDefault.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgbDatepickerI18nDefault.ctorParameters = function () {
            return [
                { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] },
                { type: common.DatePipe }
            ];
        };
        return NgbDatepickerI18nDefault;
    }(NgbDatepickerI18n));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDatepickerService = (function () {
        function NgbDatepickerService(_calendar, _i18n) {
            this._calendar = _calendar;
            this._i18n = _i18n;
            this._model$ = new rxjs.Subject();
            this._select$ = new rxjs.Subject();
            this._state = {
                disabled: false,
                displayMonths: 1,
                firstDayOfWeek: 1,
                focusVisible: false,
                months: [],
                navigation: 'select',
                outsideDays: 'visible',
                prevDisabled: false,
                nextDisabled: false,
                selectBoxes: { years: [], months: [] },
                selectedDate: null
            };
        }
        Object.defineProperty(NgbDatepickerService.prototype, "model$", {
            get: /**
             * @return {?}
             */ function () { return this._model$.pipe(operators.filter(function (model) { return model.months.length > 0; })); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "select$", {
            get: /**
             * @return {?}
             */ function () { return this._select$.pipe(operators.filter(function (date) { return date !== null; })); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "disabled", {
            set: /**
             * @param {?} disabled
             * @return {?}
             */ function (disabled) {
                if (this._state.disabled !== disabled) {
                    this._nextState({ disabled: disabled });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "displayMonths", {
            set: /**
             * @param {?} displayMonths
             * @return {?}
             */ function (displayMonths) {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                    this._nextState({ displayMonths: displayMonths });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "firstDayOfWeek", {
            set: /**
             * @param {?} firstDayOfWeek
             * @return {?}
             */ function (firstDayOfWeek) {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                    this._nextState({ firstDayOfWeek: firstDayOfWeek });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "focusVisible", {
            set: /**
             * @param {?} focusVisible
             * @return {?}
             */ function (focusVisible) {
                if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                    this._nextState({ focusVisible: focusVisible });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "maxDate", {
            set: /**
             * @param {?} date
             * @return {?}
             */ function (date) {
                /** @type {?} */
                var maxDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.maxDate, maxDate)) {
                    this._nextState({ maxDate: maxDate });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "markDisabled", {
            set: /**
             * @param {?} markDisabled
             * @return {?}
             */ function (markDisabled) {
                if (this._state.markDisabled !== markDisabled) {
                    this._nextState({ markDisabled: markDisabled });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "minDate", {
            set: /**
             * @param {?} date
             * @return {?}
             */ function (date) {
                /** @type {?} */
                var minDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.minDate, minDate)) {
                    this._nextState({ minDate: minDate });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "navigation", {
            set: /**
             * @param {?} navigation
             * @return {?}
             */ function (navigation) {
                if (this._state.navigation !== navigation) {
                    this._nextState({ navigation: navigation });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "outsideDays", {
            set: /**
             * @param {?} outsideDays
             * @return {?}
             */ function (outsideDays) {
                if (this._state.outsideDays !== outsideDays) {
                    this._nextState({ outsideDays: outsideDays });
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDatepickerService.prototype.focus = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
                    this._nextState({ focusDate: date });
                }
            };
        /**
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
        NgbDatepickerService.prototype.focusMove = /**
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
            function (period, number) {
                this.focus(this._calendar.getNext(this._state.focusDate, period, number));
            };
        /**
         * @return {?}
         */
        NgbDatepickerService.prototype.focusSelect = /**
         * @return {?}
         */
            function () {
                if (isDateSelectable(this._state.focusDate, this._state)) {
                    this.select(this._state.focusDate, { emitEvent: true });
                }
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDatepickerService.prototype.open = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                /** @type {?} */
                var firstDate = this.toValidDate(date, this._calendar.getToday());
                if (!this._state.disabled) {
                    this._nextState({ firstDate: firstDate });
                }
            };
        /**
         * @param {?} date
         * @param {?=} options
         * @return {?}
         */
        NgbDatepickerService.prototype.select = /**
         * @param {?} date
         * @param {?=} options
         * @return {?}
         */
            function (date, options) {
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var selectedDate = this.toValidDate(date, null);
                if (!this._state.disabled) {
                    if (isChangedDate(this._state.selectedDate, selectedDate)) {
                        this._nextState({ selectedDate: selectedDate });
                    }
                    if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                        this._select$.next(selectedDate);
                    }
                }
            };
        /**
         * @param {?} date
         * @param {?=} defaultValue
         * @return {?}
         */
        NgbDatepickerService.prototype.toValidDate = /**
         * @param {?} date
         * @param {?=} defaultValue
         * @return {?}
         */
            function (date, defaultValue) {
                /** @type {?} */
                var ngbDate = NgbDate.from(date);
                if (defaultValue === undefined) {
                    defaultValue = this._calendar.getToday();
                }
                return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
            };
        /**
         * @param {?} patch
         * @return {?}
         */
        NgbDatepickerService.prototype._nextState = /**
         * @param {?} patch
         * @return {?}
         */
            function (patch) {
                /** @type {?} */
                var newState = this._updateState(patch);
                this._patchContexts(newState);
                this._state = newState;
                this._model$.next(this._state);
            };
        /**
         * @param {?} state
         * @return {?}
         */
        NgbDatepickerService.prototype._patchContexts = /**
         * @param {?} state
         * @return {?}
         */
            function (state) {
                var months = state.months, displayMonths = state.displayMonths, selectedDate = state.selectedDate, focusDate = state.focusDate, focusVisible = state.focusVisible, disabled = state.disabled, outsideDays = state.outsideDays;
                state.months.forEach(function (month) {
                    month.weeks.forEach(function (week) {
                        week.days.forEach(function (day) {
                            // patch focus flag
                            if (focusDate) {
                                day.context.focused = focusDate.equals(day.date) && focusVisible;
                            }
                            // calculating tabindex
                            day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                            // override context disabled
                            if (disabled === true) {
                                day.context.disabled = true;
                            }
                            // patch selection flag
                            if (selectedDate !== undefined) {
                                day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                            }
                            // visibility
                            if (month.number !== day.date.month) {
                                day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                                    (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                        day.date.before(months[displayMonths - 1].lastDate));
                            }
                        });
                    });
                });
            };
        /**
         * @param {?} patch
         * @return {?}
         */
        NgbDatepickerService.prototype._updateState = /**
         * @param {?} patch
         * @return {?}
         */
            function (patch) {
                /** @type {?} */
                var state = Object.assign({}, this._state, patch);
                /** @type {?} */
                var startDate = state.firstDate;
                // min/max dates changed
                if ('minDate' in patch || 'maxDate' in patch) {
                    checkMinBeforeMax(state.minDate, state.maxDate);
                    state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
                    state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
                    startDate = state.focusDate;
                }
                // disabled
                if ('disabled' in patch) {
                    state.focusVisible = false;
                }
                // initial rebuild via 'select()'
                if ('selectedDate' in patch && this._state.months.length === 0) {
                    startDate = state.selectedDate;
                }
                // focus date changed
                if ('focusDate' in patch) {
                    state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
                    startDate = state.focusDate;
                    // nothing to rebuild if only focus changed and it is still visible
                    if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                        !state.focusDate.after(state.lastDate)) {
                        return state;
                    }
                }
                // first date changed
                if ('firstDate' in patch) {
                    state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
                    startDate = state.firstDate;
                }
                // rebuilding months
                if (startDate) {
                    /** @type {?} */
                    var forceRebuild = 'firstDayOfWeek' in patch || 'markDisabled' in patch || 'minDate' in patch ||
                        'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
                    /** @type {?} */
                    var months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
                    // updating months and boundary dates
                    state.months = months;
                    state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
                    state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
                    // reset selected date if 'markDisabled' returns true
                    if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                        state.selectedDate = null;
                    }
                    // adjusting focus after months were built
                    if ('firstDate' in patch) {
                        if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                            state.focusDate.after(state.lastDate)) {
                            state.focusDate = startDate;
                        }
                    }
                    /** @type {?} */
                    var yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
                    /** @type {?} */
                    var monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
                    if (state.navigation === 'select') {
                        // years ->  boundaries (min/max were changed)
                        if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                            state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                        }
                        // months -> when current year or boundaries change
                        if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                            state.selectBoxes.months =
                                generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                        }
                    }
                    else {
                        state.selectBoxes = { years: [], months: [] };
                    }
                    // updating navigation arrows -> boundaries change (min/max) or month/year changes
                    if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                        (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                        state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                        state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
                    }
                }
                return state;
            };
        NgbDatepickerService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgbDatepickerService.ctorParameters = function () {
            return [
                { type: NgbCalendar },
                { type: NgbDatepickerI18n }
            ];
        };
        return NgbDatepickerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var Key = {
        Tab: 9,
        Enter: 13,
        Escape: 27,
        Space: 32,
        PageUp: 33,
        PageDown: 34,
        End: 35,
        Home: 36,
        ArrowLeft: 37,
        ArrowUp: 38,
        ArrowRight: 39,
        ArrowDown: 40,
    };
    Key[Key.Tab] = 'Tab';
    Key[Key.Enter] = 'Enter';
    Key[Key.Escape] = 'Escape';
    Key[Key.Space] = 'Space';
    Key[Key.PageUp] = 'PageUp';
    Key[Key.PageDown] = 'PageDown';
    Key[Key.End] = 'End';
    Key[Key.Home] = 'Home';
    Key[Key.ArrowLeft] = 'ArrowLeft';
    Key[Key.ArrowUp] = 'ArrowUp';
    Key[Key.ArrowRight] = 'ArrowRight';
    Key[Key.ArrowDown] = 'ArrowDown';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDatepickerKeyMapService = (function () {
        function NgbDatepickerKeyMapService(_service, _calendar) {
            var _this = this;
            this._service = _service;
            this._calendar = _calendar;
            _service.model$.subscribe(function (model) {
                _this._minDate = model.minDate;
                _this._maxDate = model.maxDate;
                _this._firstViewDate = model.firstDate;
                _this._lastViewDate = model.lastDate;
            });
        }
        /**
         * @param {?} event
         * @return {?}
         */
        NgbDatepickerKeyMapService.prototype.processKey = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (Key[toString(event.which)]) {
                    switch (event.which) {
                        case Key.PageUp:
                            this._service.focusMove(event.shiftKey ? 'y' : 'm', -1);
                            break;
                        case Key.PageDown:
                            this._service.focusMove(event.shiftKey ? 'y' : 'm', 1);
                            break;
                        case Key.End:
                            this._service.focus(event.shiftKey ? this._maxDate : this._lastViewDate);
                            break;
                        case Key.Home:
                            this._service.focus(event.shiftKey ? this._minDate : this._firstViewDate);
                            break;
                        case Key.ArrowLeft:
                            this._service.focusMove('d', -1);
                            break;
                        case Key.ArrowUp:
                            this._service.focusMove('d', -this._calendar.getDaysPerWeek());
                            break;
                        case Key.ArrowRight:
                            this._service.focusMove('d', 1);
                            break;
                        case Key.ArrowDown:
                            this._service.focusMove('d', this._calendar.getDaysPerWeek());
                            break;
                        case Key.Enter:
                        case Key.Space:
                            this._service.focusSelect();
                            break;
                        default:
                            return;
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
        NgbDatepickerKeyMapService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgbDatepickerKeyMapService.ctorParameters = function () {
            return [
                { type: NgbDatepickerService },
                { type: NgbCalendar }
            ];
        };
        return NgbDatepickerKeyMapService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var NavigationEvent = {
        PREV: 0,
        NEXT: 1,
    };
    NavigationEvent[NavigationEvent.PREV] = 'PREV';
    NavigationEvent[NavigationEvent.NEXT] = 'NEXT';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbDatepicker component.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the datepickers used in the application.
     */
    var NgbDatepickerConfig = (function () {
        function NgbDatepickerConfig() {
            this.displayMonths = 1;
            this.firstDayOfWeek = 1;
            this.navigation = 'select';
            this.outsideDays = 'visible';
            this.showWeekdays = true;
            this.showWeekNumbers = false;
        }
        NgbDatepickerConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbDatepickerConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract type serving as a DI token for the service converting from your application Date model to internal
     * NgbDateStruct model.
     * A default implementation converting from and to NgbDateStruct is provided for retro-compatibility,
     * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
     * @abstract
     * @template T
     */
    var NgbDateAdapter = (function () {
        function NgbDateAdapter() {
        }
        NgbDateAdapter.decorators = [
            { type: core.Injectable },
        ];
        return NgbDateAdapter;
    }());
    var NgbDateStructAdapter = (function (_super) {
        __extends(NgbDateStructAdapter, _super);
        function NgbDateStructAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         */
        /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         * @param {?} date
         * @return {?}
         */
        NgbDateStructAdapter.prototype.fromModel = /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         * @param {?} date
         * @return {?}
         */
            function (date) {
                return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
            };
        /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         */
        /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         * @param {?} date
         * @return {?}
         */
        NgbDateStructAdapter.prototype.toModel = /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         * @param {?} date
         * @return {?}
         */
            function (date) {
                return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
            };
        NgbDateStructAdapter.decorators = [
            { type: core.Injectable },
        ];
        return NgbDateStructAdapter;
    }(NgbDateAdapter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_DATEPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgbDatepicker; }),
        multi: true
    };
    /**
     * A lightweight and highly configurable datepicker directive
     */
    var NgbDatepicker = (function () {
        function NgbDatepicker(_keyMapService, _service, _calendar, i18n, config, _cd, _elementRef, _ngbDateAdapter, _ngZone) {
            var _this = this;
            this._keyMapService = _keyMapService;
            this._service = _service;
            this._calendar = _calendar;
            this.i18n = i18n;
            this._cd = _cd;
            this._elementRef = _elementRef;
            this._ngbDateAdapter = _ngbDateAdapter;
            this._ngZone = _ngZone;
            /**
             * An event fired when navigation happens and currently displayed month changes.
             * See NgbDatepickerNavigateEvent for the payload info.
             */
            this.navigate = new core.EventEmitter();
            /**
             * An event fired when user selects a date using keyboard or mouse.
             * The payload of the event is currently selected NgbDateStruct.
             */
            this.select = new core.EventEmitter();
            this.onChange = function (_) { };
            this.onTouched = function () { };
            ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
                'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
                .forEach(function (input) { return _this[input] = config[input]; });
            this._selectSubscription = _service.select$.subscribe(function (date) { _this.select.emit(date.toStruct()); });
            this._subscription = _service.model$.subscribe(function (model) {
                /** @type {?} */
                var newDate = model.firstDate;
                /** @type {?} */
                var oldDate = _this.model ? _this.model.firstDate : null;
                /** @type {?} */
                var newSelectedDate = model.selectedDate;
                /** @type {?} */
                var oldSelectedDate = _this.model ? _this.model.selectedDate : null;
                /** @type {?} */
                var newFocusedDate = model.focusDate;
                /** @type {?} */
                var oldFocusedDate = _this.model ? _this.model.focusDate : null;
                _this.model = model;
                // handling selection change
                if (isChangedDate(newSelectedDate, oldSelectedDate)) {
                    _this.onTouched();
                    _this.onChange(_this._ngbDateAdapter.toModel(newSelectedDate));
                }
                // handling focus change
                if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                    _this.focus();
                }
                // emitting navigation event if the first month changes
                if (!newDate.equals(oldDate)) {
                    _this.navigate.emit({
                        current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                        next: { year: newDate.year, month: newDate.month }
                    });
                }
                _cd.markForCheck();
            });
        }
        /**
         * Manually focus the focusable day in the datepicker
         */
        /**
         * Manually focus the focusable day in the datepicker
         * @return {?}
         */
        NgbDatepicker.prototype.focus = /**
         * Manually focus the focusable day in the datepicker
         * @return {?}
         */
            function () {
                var _this = this;
                this._ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                    /** @type {?} */
                    var elementToFocus = _this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
                    if (elementToFocus) {
                        elementToFocus.focus();
                    }
                });
            };
        /**
         * Navigates current view to provided date.
         * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         * Use 'startDate' input as an alternative
         */
        /**
         * Navigates current view to provided date.
         * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         * Use 'startDate' input as an alternative
         * @param {?=} date
         * @return {?}
         */
        NgbDatepicker.prototype.navigateTo = /**
         * Navigates current view to provided date.
         * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         * Use 'startDate' input as an alternative
         * @param {?=} date
         * @return {?}
         */
            function (date) { this._service.open(NgbDate.from(date)); };
        /**
         * @return {?}
         */
        NgbDatepicker.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this._subscription.unsubscribe();
                this._selectSubscription.unsubscribe();
            };
        /**
         * @return {?}
         */
        NgbDatepicker.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.model === undefined) {
                    ['displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate', 'outsideDays'].forEach(function (input) { return _this._service[input] = _this[input]; });
                    this.navigateTo(this.startDate);
                }
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbDatepicker.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                var _this = this;
                ['displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate', 'outsideDays']
                    .filter(function (input) { return input in changes; })
                    .forEach(function (input) { return _this._service[input] = _this[input]; });
                if ('startDate' in changes) {
                    this.navigateTo(this.startDate);
                }
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDatepicker.prototype.onDateSelect = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                this._service.focus(date);
                this._service.select(date, { emitEvent: true });
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgbDatepicker.prototype.onKeyDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) { this._keyMapService.processKey(event); };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDatepicker.prototype.onNavigateDateSelect = /**
         * @param {?} date
         * @return {?}
         */
            function (date) { this._service.open(date); };
        /**
         * @param {?} event
         * @return {?}
         */
        NgbDatepicker.prototype.onNavigateEvent = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                switch (event) {
                    case NavigationEvent.PREV:
                        this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                        break;
                    case NavigationEvent.NEXT:
                        this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                        break;
                }
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbDatepicker.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onChange = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbDatepicker.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onTouched = fn; };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgbDatepicker.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) { this._service.disabled = isDisabled; };
        /**
         * @param {?} focusVisible
         * @return {?}
         */
        NgbDatepicker.prototype.showFocus = /**
         * @param {?} focusVisible
         * @return {?}
         */
            function (focusVisible) { this._service.focusVisible = focusVisible; };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbDatepicker.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) { this._service.select(NgbDate.from(this._ngbDateAdapter.fromModel(value))); };
        NgbDatepicker.decorators = [
            { type: core.Component, args: [{
                        exportAs: 'ngbDatepicker',
                        selector: 'ngb-datepicker',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n    :host {\n      border: 1px solid #dfdfdf;\n      border-radius: 0.25rem;\n      display: inline-block;\n    }\n    .ngb-dp-month {\n      pointer-events: none;\n    }\n    .ngb-dp-header {\n      border-bottom: 0;\n      border-radius: 0.25rem 0.25rem 0 0;\n      padding-top: 0.25rem;\n    }\n    ngb-datepicker-month-view {\n      pointer-events: auto;\n    }\n    .ngb-dp-month-name {\n      font-size: larger;\n      height: 2rem;\n      line-height: 2rem;\n      text-align: center;\n    }\n    /deep/ .ngb-dp-month + .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week {\n      padding-left: 1rem;\n    }\n    /deep/ .ngb-dp-month + .ngb-dp-month > .ngb-dp-month-name {\n      padding-left: 1rem;\n    }\n    /deep/ .ngb-dp-month:last-child .ngb-dp-week {\n      padding-right: .25rem;\n    }\n    /deep/ .ngb-dp-month:first-child .ngb-dp-week {\n      padding-left: .25rem;\n    }\n    /deep/ .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week:last-child {\n      padding-bottom: .25rem;\n    }\n    .ngb-dp-months {\n      display: -ms-flexbox;\n      display: flex;\n    }\n  "],
                        template: "\n    <ng-template #dt let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\" let-disabled=\"disabled\" let-focused=\"focused\">\n      <div ngbDatepickerDayView\n        [date]=\"date\"\n        [currentMonth]=\"currentMonth\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        [focused]=\"focused\">\n      </div>\n    </ng-template>\n\n    <div class=\"ngb-dp-header bg-light\">\n      <ngb-datepicker-navigation *ngIf=\"navigation !== 'none'\"\n        [date]=\"model.firstDate\"\n        [months]=\"model.months\"\n        [disabled]=\"model.disabled\"\n        [showSelect]=\"model.navigation === 'select'\"\n        [prevDisabled]=\"model.prevDisabled\"\n        [nextDisabled]=\"model.nextDisabled\"\n        [selectBoxes]=\"model.selectBoxes\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </ngb-datepicker-navigation>\n    </div>\n\n    <div class=\"ngb-dp-months\" (keydown)=\"onKeyDown($event)\" (focusin)=\"showFocus(true)\" (focusout)=\"showFocus(false)\">\n      <ng-template ngFor let-month [ngForOf]=\"model.months\" let-i=\"index\">\n        <div class=\"ngb-dp-month\">\n          <div *ngIf=\"navigation === 'none' || (displayMonths > 1 && navigation === 'select')\"\n                class=\"ngb-dp-month-name bg-light\">\n            {{ i18n.getMonthFullName(month.number) }} {{ month.year }}\n          </div>\n          <ngb-datepicker-month-view\n            [month]=\"month\"\n            [dayTemplate]=\"dayTemplate || dt\"\n            [showWeekdays]=\"showWeekdays\"\n            [showWeekNumbers]=\"showWeekNumbers\"\n            (select)=\"onDateSelect($event)\">\n          </ngb-datepicker-month-view>\n        </div>\n      </ng-template>\n    </div>\n  ",
                        providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService, NgbDatepickerKeyMapService]
                    },] },
        ];
        /** @nocollapse */
        NgbDatepicker.ctorParameters = function () {
            return [
                { type: NgbDatepickerKeyMapService },
                { type: NgbDatepickerService },
                { type: NgbCalendar },
                { type: NgbDatepickerI18n },
                { type: NgbDatepickerConfig },
                { type: core.ChangeDetectorRef },
                { type: core.ElementRef },
                { type: NgbDateAdapter },
                { type: core.NgZone }
            ];
        };
        NgbDatepicker.propDecorators = {
            dayTemplate: [{ type: core.Input }],
            displayMonths: [{ type: core.Input }],
            firstDayOfWeek: [{ type: core.Input }],
            markDisabled: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            navigation: [{ type: core.Input }],
            outsideDays: [{ type: core.Input }],
            showWeekdays: [{ type: core.Input }],
            showWeekNumbers: [{ type: core.Input }],
            startDate: [{ type: core.Input }],
            navigate: [{ type: core.Output }],
            select: [{ type: core.Output }]
        };
        return NgbDatepicker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDatepickerMonthView = (function () {
        function NgbDatepickerMonthView(i18n) {
            this.i18n = i18n;
            this.select = new core.EventEmitter();
        }
        /**
         * @param {?} day
         * @return {?}
         */
        NgbDatepickerMonthView.prototype.doSelect = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                if (!day.context.disabled && !day.hidden) {
                    this.select.emit(NgbDate.from(day.date));
                }
            };
        NgbDatepickerMonthView.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-datepicker-month-view',
                        host: { 'role': 'grid' },
                        styles: ["\n    :host {\n      display: block;\n    }\n    .ngb-dp-weekday, .ngb-dp-week-number {\n      line-height: 2rem;\n      text-align: center;\n      font-style: italic;\n    }\n    .ngb-dp-weekday {\n      color: #5bc0de;\n      color: var(--info);\n    }\n    .ngb-dp-week {\n      border-radius: 0.25rem;\n      display: -ms-flexbox;\n      display: flex;\n    }\n    .ngb-dp-weekdays {\n      border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n      border-radius: 0;\n    }\n    .ngb-dp-day, .ngb-dp-weekday, .ngb-dp-week-number {\n      width: 2rem;\n      height: 2rem;\n    }\n    .ngb-dp-day {\n      cursor: pointer;\n    }\n    .ngb-dp-day.disabled, .ngb-dp-day.hidden {\n      cursor: default;\n    }\n  "],
                        template: "\n    <div *ngIf=\"showWeekdays\" class=\"ngb-dp-week ngb-dp-weekdays bg-light\">\n      <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-weekday ngb-dp-showweek\"></div>\n      <div *ngFor=\"let w of month.weekdays\" class=\"ngb-dp-weekday small\">\n        {{ i18n.getWeekdayShortName(w) }}\n      </div>\n    </div>\n    <ng-template ngFor let-week [ngForOf]=\"month.weeks\">\n      <div *ngIf=\"!week.collapsed\" class=\"ngb-dp-week\" role=\"row\">\n        <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-week-number small text-muted\">{{ week.number }}</div>\n        <div *ngFor=\"let day of week.days\" (click)=\"doSelect(day)\" class=\"ngb-dp-day\" role=\"gridcell\"\n          [class.disabled]=\"day.context.disabled\"\n          [tabindex]=\"day.tabindex\"\n          [class.hidden]=\"day.hidden\"\n          [attr.aria-label]=\"day.ariaLabel\">\n          <ng-template [ngIf]=\"!day.hidden\">\n            <ng-template [ngTemplateOutlet]=\"dayTemplate\" [ngTemplateOutletContext]=\"day.context\"></ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        NgbDatepickerMonthView.ctorParameters = function () {
            return [
                { type: NgbDatepickerI18n }
            ];
        };
        NgbDatepickerMonthView.propDecorators = {
            dayTemplate: [{ type: core.Input }],
            month: [{ type: core.Input }],
            showWeekdays: [{ type: core.Input }],
            showWeekNumbers: [{ type: core.Input }],
            select: [{ type: core.Output }]
        };
        return NgbDatepickerMonthView;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDatepickerNavigation = (function () {
        function NgbDatepickerNavigation(i18n) {
            this.i18n = i18n;
            this.navigation = NavigationEvent;
            this.months = [];
            this.navigate = new core.EventEmitter();
            this.select = new core.EventEmitter();
        }
        NgbDatepickerNavigation.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-datepicker-navigation',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n    :host {\n      display: -ms-flexbox;\n      display: flex;\n      align-items: center;\n    }\n    .ngb-dp-navigation-chevron {\n      border-style: solid;\n      border-width: 0.2em 0.2em 0 0;\n      display: inline-block;\n      width: 0.75em;\n      height: 0.75em;\n      margin-left: 0.25em;\n      margin-right: 0.15em;\n      transform: rotate(-135deg);\n      -ms-transform: rotate(-135deg);\n    }\n    .right .ngb-dp-navigation-chevron {\n      -ms-transform: rotate(45deg);\n      transform: rotate(45deg);\n      margin-left: 0.15em;\n      margin-right: 0.25em;\n    }\n    .ngb-dp-arrow {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1 1 auto;\n      flex-grow: 1;\n      padding-right: 0;\n      padding-left: 0;\n      margin: 0;\n      width: 2rem;\n      height: 2rem;\n    }\n    .ngb-dp-arrow.right {\n      -ms-flex-pack: end;\n      justify-content: flex-end;\n    }\n    .ngb-dp-arrow-btn {\n      padding: 0 0.25rem;\n      margin: 0 0.5rem;\n      border: none;\n      background-color: transparent;\n      z-index: 1;\n    }\n    .ngb-dp-arrow-btn:focus {\n      outline: auto 1px;\n    }\n    .ngb-dp-month-name {\n      font-size: larger;\n      height: 2rem;\n      line-height: 2rem;\n      text-align: center;\n    }\n    .ngb-dp-navigation-select {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1 1 9rem;\n      flex-grow: 1;\n      flex-basis: 9rem;\n    }\n  "],
                        template: "\n    <div class=\"ngb-dp-arrow\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"!!navigate.emit(navigation.PREV)\" [disabled]=\"prevDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.previous-month\" aria-label=\"Previous month\"\n              i18n-title=\"@@ngb.datepicker.previous-month\" title=\"Previous month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    <ngb-datepicker-navigation-select *ngIf=\"showSelect\" class=\"ngb-dp-navigation-select\"\n      [date]=\"date\"\n      [disabled] = \"disabled\"\n      [months]=\"selectBoxes.months\"\n      [years]=\"selectBoxes.years\"\n      (select)=\"select.emit($event)\">\n    </ngb-datepicker-navigation-select>\n\n    <ng-template *ngIf=\"!showSelect\" ngFor let-month [ngForOf]=\"months\" let-i=\"index\">\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i > 0\"></div>\n      <div class=\"ngb-dp-month-name\">\n        {{ i18n.getMonthFullName(month.number) }} {{ month.year }}\n      </div>\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i !== months.length - 1\"></div>\n    </ng-template>\n    <div class=\"ngb-dp-arrow right\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"!!navigate.emit(navigation.NEXT)\" [disabled]=\"nextDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.next-month\" aria-label=\"Next month\"\n              i18n-title=\"@@ngb.datepicker.next-month\" title=\"Next month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    "
                    },] },
        ];
        /** @nocollapse */
        NgbDatepickerNavigation.ctorParameters = function () {
            return [
                { type: NgbDatepickerI18n }
            ];
        };
        NgbDatepickerNavigation.propDecorators = {
            date: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            months: [{ type: core.Input }],
            showSelect: [{ type: core.Input }],
            prevDisabled: [{ type: core.Input }],
            nextDisabled: [{ type: core.Input }],
            selectBoxes: [{ type: core.Input }],
            navigate: [{ type: core.Output }],
            select: [{ type: core.Output }]
        };
        return NgbDatepickerNavigation;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
     * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
     * to use an alternative format.
     * @abstract
     */
    var /**
     * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
     * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
     * to use an alternative format.
     * @abstract
     */ NgbDateParserFormatter = (function () {
        function NgbDateParserFormatter() {
        }
        return NgbDateParserFormatter;
    }());
    var NgbDateISOParserFormatter = (function (_super) {
        __extends(NgbDateISOParserFormatter, _super);
        function NgbDateISOParserFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        NgbDateISOParserFormatter.prototype.parse = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (value) {
                    /** @type {?} */
                    var dateParts = value.trim().split('-');
                    if (dateParts.length === 1 && isNumber(dateParts[0])) {
                        return { year: toInteger(dateParts[0]), month: null, day: null };
                    }
                    else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                        return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
                    }
                    else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                        return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
                    }
                }
                return null;
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDateISOParserFormatter.prototype.format = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                return date ?
                    date.year + "-" + (isNumber(date.month) ? padNumber(date.month) : '') + "-" + (isNumber(date.day) ? padNumber(date.day) : '') :
                    '';
            };
        return NgbDateISOParserFormatter;
    }(NgbDateParserFormatter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Positioning = (function () {
        function Positioning() {
        }
        /**
         * @param {?} element
         * @return {?}
         */
        Positioning.prototype.getAllStyles = /**
         * @param {?} element
         * @return {?}
         */
            function (element) { return window.getComputedStyle(element); };
        /**
         * @param {?} element
         * @param {?} prop
         * @return {?}
         */
        Positioning.prototype.getStyle = /**
         * @param {?} element
         * @param {?} prop
         * @return {?}
         */
            function (element, prop) { return this.getAllStyles(element)[prop]; };
        /**
         * @param {?} element
         * @return {?}
         */
        Positioning.prototype.isStaticPositioned = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                return (this.getStyle(element, 'position') || 'static') === 'static';
            };
        /**
         * @param {?} element
         * @return {?}
         */
        Positioning.prototype.offsetParent = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                /** @type {?} */
                var offsetParentEl = (element.offsetParent) || document.documentElement;
                while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
                    offsetParentEl = /** @type {?} */ (offsetParentEl.offsetParent);
                }
                return offsetParentEl || document.documentElement;
            };
        /**
         * @param {?} element
         * @param {?=} round
         * @return {?}
         */
        Positioning.prototype.position = /**
         * @param {?} element
         * @param {?=} round
         * @return {?}
         */
            function (element, round) {
                if (round === void 0) {
                    round = true;
                }
                /** @type {?} */
                var elPosition;
                /** @type {?} */
                var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
                if (this.getStyle(element, 'position') === 'fixed') {
                    elPosition = element.getBoundingClientRect();
                }
                else {
                    /** @type {?} */
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
        /**
         * @param {?} element
         * @param {?=} round
         * @return {?}
         */
        Positioning.prototype.offset = /**
         * @param {?} element
         * @param {?=} round
         * @return {?}
         */
            function (element, round) {
                if (round === void 0) {
                    round = true;
                }
                /** @type {?} */
                var elBcr = element.getBoundingClientRect();
                /** @type {?} */
                var viewportOffset = {
                    top: window.pageYOffset - document.documentElement.clientTop,
                    left: window.pageXOffset - document.documentElement.clientLeft
                };
                /** @type {?} */
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
        /**
         * @param {?} hostElement
         * @param {?} targetElement
         * @param {?} placement
         * @param {?=} appendToBody
         * @return {?}
         */
        Positioning.prototype.positionElements = /**
         * @param {?} hostElement
         * @param {?} targetElement
         * @param {?} placement
         * @param {?=} appendToBody
         * @return {?}
         */
            function (hostElement, targetElement, placement, appendToBody) {
                /** @type {?} */
                var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
                /** @type {?} */
                var targetElStyles = this.getAllStyles(targetElement);
                /** @type {?} */
                var targetElBCR = targetElement.getBoundingClientRect();
                /** @type {?} */
                var placementPrimary = placement.split('-')[0] || 'top';
                /** @type {?} */
                var placementSecondary = placement.split('-')[1] || 'center';
                /** @type {?} */
                var targetElPosition = {
                    'height': targetElBCR.height || targetElement.offsetHeight,
                    'width': targetElBCR.width || targetElement.offsetWidth,
                    'top': 0,
                    'bottom': targetElBCR.height || targetElement.offsetHeight,
                    'left': 0,
                    'right': targetElBCR.width || targetElement.offsetWidth
                };
                switch (placementPrimary) {
                    case 'top':
                        targetElPosition.top =
                            hostElPosition.top - (targetElement.offsetHeight + parseFloat(targetElStyles.marginBottom));
                        break;
                    case 'bottom':
                        targetElPosition.top = hostElPosition.top + hostElPosition.height;
                        break;
                    case 'left':
                        targetElPosition.left =
                            hostElPosition.left - (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
                        break;
                    case 'right':
                        targetElPosition.left = hostElPosition.left + hostElPosition.width;
                        break;
                }
                switch (placementSecondary) {
                    case 'top':
                        targetElPosition.top = hostElPosition.top;
                        break;
                    case 'bottom':
                        targetElPosition.top = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                        break;
                    case 'left':
                        targetElPosition.left = hostElPosition.left;
                        break;
                    case 'right':
                        targetElPosition.left = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                        break;
                    case 'center':
                        if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                            targetElPosition.left = hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2;
                        }
                        else {
                            targetElPosition.top = hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2;
                        }
                        break;
                }
                targetElPosition.top = Math.round(targetElPosition.top);
                targetElPosition.bottom = Math.round(targetElPosition.bottom);
                targetElPosition.left = Math.round(targetElPosition.left);
                targetElPosition.right = Math.round(targetElPosition.right);
                return targetElPosition;
            };
        // get the availble placements of the target element in the viewport dependeing on the host element
        /**
         * @param {?} hostElement
         * @param {?} targetElement
         * @return {?}
         */
        Positioning.prototype.getAvailablePlacements = /**
         * @param {?} hostElement
         * @param {?} targetElement
         * @return {?}
         */
            function (hostElement, targetElement) {
                /** @type {?} */
                var availablePlacements = [];
                /** @type {?} */
                var hostElemClientRect = hostElement.getBoundingClientRect();
                /** @type {?} */
                var targetElemClientRect = targetElement.getBoundingClientRect();
                /** @type {?} */
                var html = document.documentElement;
                /** @type {?} */
                var windowHeight = window.innerHeight || html.clientHeight;
                /** @type {?} */
                var windowWidth = window.innerWidth || html.clientWidth;
                /** @type {?} */
                var hostElemClientRectHorCenter = hostElemClientRect.left + hostElemClientRect.width / 2;
                /** @type {?} */
                var hostElemClientRectVerCenter = hostElemClientRect.top + hostElemClientRect.height / 2;
                // left: check if target width can be placed between host left and viewport start and also height of target is
                // inside viewport
                if (targetElemClientRect.width < hostElemClientRect.left) {
                    // check for left only
                    if (hostElemClientRectVerCenter > targetElemClientRect.height / 2 &&
                        windowHeight - hostElemClientRectVerCenter > targetElemClientRect.height / 2) {
                        availablePlacements.splice(availablePlacements.length, 1, 'left');
                    }
                    // check for left-top and left-bottom
                    this.setSecondaryPlacementForLeftRight(hostElemClientRect, targetElemClientRect, 'left', availablePlacements);
                }
                // top: target height is less than host top
                if (targetElemClientRect.height < hostElemClientRect.top) {
                    if (hostElemClientRectHorCenter > targetElemClientRect.width / 2 &&
                        windowWidth - hostElemClientRectHorCenter > targetElemClientRect.width / 2) {
                        availablePlacements.splice(availablePlacements.length, 1, 'top');
                    }
                    this.setSecondaryPlacementForTopBottom(hostElemClientRect, targetElemClientRect, 'top', availablePlacements);
                }
                // right: check if target width can be placed between host right and viewport end and also height of target is
                // inside viewport
                if (windowWidth - hostElemClientRect.right > targetElemClientRect.width) {
                    // check for right only
                    if (hostElemClientRectVerCenter > targetElemClientRect.height / 2 &&
                        windowHeight - hostElemClientRectVerCenter > targetElemClientRect.height / 2) {
                        availablePlacements.splice(availablePlacements.length, 1, 'right');
                    }
                    // check for right-top and right-bottom
                    this.setSecondaryPlacementForLeftRight(hostElemClientRect, targetElemClientRect, 'right', availablePlacements);
                }
                // bottom: check if there is enough space between host bottom and viewport end for target height
                if (windowHeight - hostElemClientRect.bottom > targetElemClientRect.height) {
                    if (hostElemClientRectHorCenter > targetElemClientRect.width / 2 &&
                        windowWidth - hostElemClientRectHorCenter > targetElemClientRect.width / 2) {
                        availablePlacements.splice(availablePlacements.length, 1, 'bottom');
                    }
                    this.setSecondaryPlacementForTopBottom(hostElemClientRect, targetElemClientRect, 'bottom', availablePlacements);
                }
                return availablePlacements;
            };
        /**
         * check if secondary placement for left and right are available i.e. left-top, left-bottom, right-top, right-bottom
         * primaryplacement: left|right
         * availablePlacementArr: array in which available placemets to be set
         * @param {?} hostElemClientRect
         * @param {?} targetElemClientRect
         * @param {?} primaryPlacement
         * @param {?} availablePlacementArr
         * @return {?}
         */
        Positioning.prototype.setSecondaryPlacementForLeftRight = /**
         * check if secondary placement for left and right are available i.e. left-top, left-bottom, right-top, right-bottom
         * primaryplacement: left|right
         * availablePlacementArr: array in which available placemets to be set
         * @param {?} hostElemClientRect
         * @param {?} targetElemClientRect
         * @param {?} primaryPlacement
         * @param {?} availablePlacementArr
         * @return {?}
         */
            function (hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
                /** @type {?} */
                var html = document.documentElement;
                // check for left-bottom
                if (targetElemClientRect.height <= hostElemClientRect.bottom) {
                    availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-bottom');
                }
                if ((window.innerHeight || html.clientHeight) - hostElemClientRect.top >= targetElemClientRect.height) {
                    availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-top');
                }
            };
        /**
         * check if secondary placement for top and bottom are available i.e. top-left, top-right, bottom-left, bottom-right
         * primaryplacement: top|bottom
         * availablePlacementArr: array in which available placemets to be set
         * @param {?} hostElemClientRect
         * @param {?} targetElemClientRect
         * @param {?} primaryPlacement
         * @param {?} availablePlacementArr
         * @return {?}
         */
        Positioning.prototype.setSecondaryPlacementForTopBottom = /**
         * check if secondary placement for top and bottom are available i.e. top-left, top-right, bottom-left, bottom-right
         * primaryplacement: top|bottom
         * availablePlacementArr: array in which available placemets to be set
         * @param {?} hostElemClientRect
         * @param {?} targetElemClientRect
         * @param {?} primaryPlacement
         * @param {?} availablePlacementArr
         * @return {?}
         */
            function (hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
                /** @type {?} */
                var html = document.documentElement;
                // check for left-bottom
                if ((window.innerWidth || html.clientWidth) - hostElemClientRect.left >= targetElemClientRect.width) {
                    availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-left');
                }
                if (targetElemClientRect.width <= hostElemClientRect.right) {
                    availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-right');
                }
            };
        return Positioning;
    }());
    /** @type {?} */
    var positionService = new Positioning();
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    function positionElements(hostElement, targetElement, placement, appendToBody) {
        /** @type {?} */
        var placementVals = Array.isArray(placement) ? placement : [/** @type {?} */ (placement)];
        /** @type {?} */
        var hasAuto = placementVals.findIndex(function (val) { return val === 'auto'; });
        if (hasAuto >= 0) {
            ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top',
                'left-bottom', 'right-top', 'right-bottom',
            ].forEach(function (obj) {
                if (placementVals.find(function (val) { return val.search('^' + obj) !== -1; }) == null) {
                    placementVals.splice(hasAuto++, 1, /** @type {?} */ (obj));
                }
            });
        }
        /** @type {?} */
        var topVal = 0;
        /** @type {?} */
        var leftVal = 0;
        /** @type {?} */
        var appliedPlacement;
        /** @type {?} */
        var availablePlacements = positionService.getAvailablePlacements(hostElement, targetElement);
        var _loop_1 = function (item, index) {
            // check if passed placement is present in the available placement or otherwise apply the last placement in the
            // passed placement list
            if ((availablePlacements.find(function (val) { return val === item; }) != null) || (placementVals.length === index + 1)) {
                appliedPlacement = /** @type {?} */ (item);
                /** @type {?} */
                var pos = positionService.positionElements(hostElement, targetElement, item, appendToBody);
                topVal = pos.top;
                leftVal = pos.left;
                return "break";
            }
        };
        try {
            // iterate over all the passed placements
            for (var _a = __values(toItemIndexes(placementVals)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = _b.value, item = _c.item, index = _c.index;
                var state_1 = _loop_1(item, index);
                if (state_1 === "break")
                    break;
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return))
                    _d.call(_a);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
        targetElement.style.top = topVal + "px";
        targetElement.style.left = leftVal + "px";
        return appliedPlacement;
        var e_1, _d;
    }
    /**
     * @template T
     * @param {?} a
     * @return {?}
     */
    function toItemIndexes(a) {
        return a.map(function (item, index) { return ({ item: item, index: index }); });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FOCUSABLE_ELEMENTS_SELECTOR = [
        'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
        'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    /**
     * Returns first and last focusable elements inside of a given element based on specific CSS selector
     * @param {?} element
     * @return {?}
     */
    function getFocusableBoundaryElements(element) {
        /** @type {?} */
        var list = element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
        return [list[0], list[list.length - 1]];
    }
    /** *
     * Function that enforces browser focus to be trapped inside a DOM element.
     *
     * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
     *
     * \@param element The element around which focus will be trapped inside
     * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
     * and free internal resources
      @type {?} */
    var ngbFocusTrap = function (element, stopFocusTrap$) {
        /** @type {?} */
        var lastFocusedElement$ = rxjs.fromEvent(element, 'focusin').pipe(operators.takeUntil(stopFocusTrap$), operators.map(function (e) { return e.target; }));
        // 'tab' / 'shift+tab' stream
        rxjs.fromEvent(element, 'keydown')
            .pipe(operators.takeUntil(stopFocusTrap$), operators.filter(function (e) { return e.which === Key.Tab; }), operators.withLatestFrom(lastFocusedElement$))
            .subscribe(function (_a) {
            var _b = __read(_a, 2), tabEvent = _b[0], focusedElement = _b[1];
            var _c = __read(getFocusableBoundaryElements(element), 2), first = _c[0], last = _c[1];
            if (focusedElement === first && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }
            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        });
        // inside click
        rxjs.fromEvent(element, 'click')
            .pipe(operators.takeUntil(stopFocusTrap$), operators.withLatestFrom(lastFocusedElement$), operators.map(function (arr) { return (arr[1]); }))
            .subscribe(function (lastFocusedElement) { return lastFocusedElement.focus(); });
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_DATEPICKER_VALUE_ACCESSOR$1 = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgbInputDatepicker; }),
        multi: true
    };
    /** @type {?} */
    var NGB_DATEPICKER_VALIDATOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return NgbInputDatepicker; }),
        multi: true
    };
    /**
     * A directive that makes it possible to have datepickers on input fields.
     * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
     */
    var NgbInputDatepicker = (function () {
        function NgbInputDatepicker(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, ngZone, _service, _calendar, _ngbDateAdapter, _document) {
            var _this = this;
            this._parserFormatter = _parserFormatter;
            this._elRef = _elRef;
            this._vcRef = _vcRef;
            this._renderer = _renderer;
            this._cfr = _cfr;
            this._service = _service;
            this._calendar = _calendar;
            this._ngbDateAdapter = _ngbDateAdapter;
            this._document = _document;
            this._clickableElements = new Set();
            this._closed$ = new rxjs.Subject();
            this._cRef = null;
            this._disabled = false;
            /**
             * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
             *
             * By default the popup will close on both date selection and outside click. If the value is 'false' the popup has to
             * be closed manually via '.close()' or '.toggle()' methods. If the value is set to 'inside' the popup will close on
             * date selection only. For the 'outside' the popup will close only on the outside click.
             *
             * \@since 3.0.0
             */
            this.autoClose = true;
            /**
             * Placement of a datepicker popup accepts:
             *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
             *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
             * and array of above values.
             */
            this.placement = 'bottom-left';
            /**
             * An event fired when user selects a date using keyboard or mouse.
             * The payload of the event is currently selected NgbDateStruct.
             *
             * \@since 1.1.1
             */
            this.dateSelect = new core.EventEmitter();
            /**
             * An event fired when navigation happens and currently displayed month changes.
             * See NgbDatepickerNavigateEvent for the payload info.
             */
            this.navigate = new core.EventEmitter();
            this._onChange = function (_) { };
            this._onTouched = function () { };
            this._validatorChange = function () { };
            this._zoneSubscription = ngZone.onStable.subscribe(function () {
                if (_this._cRef) {
                    positionElements(_this._elRef.nativeElement, _this._cRef.location.nativeElement, _this.placement, _this.container === 'body');
                }
            });
        }
        Object.defineProperty(NgbInputDatepicker.prototype, "disabled", {
            get: /**
             * @return {?}
             */ function () {
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._disabled = value === '' || (value && value !== 'false');
                if (this.isOpen()) {
                    this._cRef.instance.setDisabledState(this._disabled);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbInputDatepicker.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this._onChange = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbInputDatepicker.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this._onTouched = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbInputDatepicker.prototype.registerOnValidatorChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this._validatorChange = fn; };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgbInputDatepicker.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) { this.disabled = isDisabled; };
        /**
         * @param {?} c
         * @return {?}
         */
        NgbInputDatepicker.prototype.validate = /**
         * @param {?} c
         * @return {?}
         */
            function (c) {
                /** @type {?} */
                var value = c.value;
                if (value === null || value === undefined) {
                    return null;
                }
                /** @type {?} */
                var ngbDate = this._fromDateStruct(this._ngbDateAdapter.fromModel(value));
                if (!this._calendar.isValid(ngbDate)) {
                    return { 'ngbDate': { invalid: c.value } };
                }
                if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
                    return { 'ngbDate': { requiredBefore: this.minDate } };
                }
                if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
                    return { 'ngbDate': { requiredAfter: this.maxDate } };
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbInputDatepicker.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this._model = this._fromDateStruct(this._ngbDateAdapter.fromModel(value));
                this._writeModelValue(this._model);
            };
        /**
         * @param {?} value
         * @param {?=} updateView
         * @return {?}
         */
        NgbInputDatepicker.prototype.manualDateChange = /**
         * @param {?} value
         * @param {?=} updateView
         * @return {?}
         */
            function (value, updateView) {
                if (updateView === void 0) {
                    updateView = false;
                }
                this._model = this._fromDateStruct(this._parserFormatter.parse(value));
                this._onChange(this._model ? this._ngbDateAdapter.toModel(this._model) : (value === '' ? null : value));
                if (updateView && this._model) {
                    this._writeModelValue(this._model);
                }
            };
        /**
         * @return {?}
         */
        NgbInputDatepicker.prototype.isOpen = /**
         * @return {?}
         */
            function () { return !!this._cRef; };
        /**
         * Opens the datepicker with the selected date indicated by the ngModel value.
         */
        /**
         * Opens the datepicker with the selected date indicated by the ngModel value.
         * @return {?}
         */
        NgbInputDatepicker.prototype.open = /**
         * Opens the datepicker with the selected date indicated by the ngModel value.
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.isOpen()) {
                    /** @type {?} */
                    var cf = this._cfr.resolveComponentFactory(NgbDatepicker);
                    this._cRef = this._vcRef.createComponent(cf);
                    this._applyPopupStyling(this._cRef.location.nativeElement);
                    this._applyDatepickerInputs(this._cRef.instance);
                    this._subscribeForDatepickerOutputs(this._cRef.instance);
                    this._cRef.instance.ngOnInit();
                    this._cRef.instance.writeValue(this._ngbDateAdapter.toModel(this._model));
                    // date selection event handling
                    this._cRef.instance.registerOnChange(function (selectedDate) {
                        _this.writeValue(selectedDate);
                        _this._onChange(selectedDate);
                    });
                    this._cRef.changeDetectorRef.detectChanges();
                    this._cRef.instance.setDisabledState(this.disabled);
                    if (this.container === 'body') {
                        window.document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
                    }
                    // focus handling
                    ngbFocusTrap(this._cRef.location.nativeElement, this._closed$);
                    this._cRef.instance.focus();
                    /** @type {?} */
                    var escapes$ = rxjs.fromEvent(this._document, 'keyup')
                        .pipe(operators.takeUntil(this._closed$), operators.filter(function (e) { return e.which === Key.Escape; }));
                    /** @type {?} */
                    var outsideClicks$ = this.autoClose === true || this.autoClose === 'outside' ?
                        rxjs.fromEvent(this._document, 'click')
                            .pipe(operators.takeUntil(this._closed$), operators.filter(function (e) {
                            /** @type {?} */
                            var clickableElements = __spread([
                                _this._elRef.nativeElement,
                                _this._cRef.location.nativeElement
                            ], Array.from(_this._clickableElements));
                            return !clickableElements.some(function (el) { return el && el.contains(e.target); });
                        })) : null;
                    // clang-format on
                    rxjs.race([escapes$, outsideClicks$]).pipe(operators.take(1)).subscribe(function () { return _this.close(); });
                }
            };
        /**
         * Closes the datepicker popup.
         */
        /**
         * Closes the datepicker popup.
         * @return {?}
         */
        NgbInputDatepicker.prototype.close = /**
         * Closes the datepicker popup.
         * @return {?}
         */
            function () {
                if (this.isOpen()) {
                    this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
                    this._cRef = null;
                    this._closed$.next();
                }
            };
        /**
         * Toggles the datepicker popup (opens when closed and closes when opened).
         */
        /**
         * Toggles the datepicker popup (opens when closed and closes when opened).
         * @return {?}
         */
        NgbInputDatepicker.prototype.toggle = /**
         * Toggles the datepicker popup (opens when closed and closes when opened).
         * @return {?}
         */
            function () {
                if (this.isOpen()) {
                    this.close();
                }
                else {
                    this.open();
                }
            };
        /**
         * Registers an html element outside of the datepicker popup as clickable.
         * Clicking on this element will not close the datepicker popup
         *
         * @since 3.0.0
         */
        /**
         * Registers an html element outside of the datepicker popup as clickable.
         * Clicking on this element will not close the datepicker popup
         *
         * \@since 3.0.0
         * @param {?} element
         * @return {?}
         */
        NgbInputDatepicker.prototype.registerClickableElement = /**
         * Registers an html element outside of the datepicker popup as clickable.
         * Clicking on this element will not close the datepicker popup
         *
         * \@since 3.0.0
         * @param {?} element
         * @return {?}
         */
            function (element) {
                if (element) {
                    this._clickableElements.add(element);
                }
            };
        /**
         * Navigates current view to provided date.
         * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         * Use 'startDate' input as an alternative
         */
        /**
         * Navigates current view to provided date.
         * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         * Use 'startDate' input as an alternative
         * @param {?=} date
         * @return {?}
         */
        NgbInputDatepicker.prototype.navigateTo = /**
         * Navigates current view to provided date.
         * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         * Use 'startDate' input as an alternative
         * @param {?=} date
         * @return {?}
         */
            function (date) {
                if (this.isOpen()) {
                    this._cRef.instance.navigateTo(date);
                }
            };
        /**
         * @return {?}
         */
        NgbInputDatepicker.prototype.onBlur = /**
         * @return {?}
         */
            function () { this._onTouched(); };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbInputDatepicker.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes['minDate'] || changes['maxDate']) {
                    this._validatorChange();
                }
            };
        /**
         * @return {?}
         */
        NgbInputDatepicker.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.close();
                this._zoneSubscription.unsubscribe();
            };
        /**
         * @param {?} datepickerInstance
         * @return {?}
         */
        NgbInputDatepicker.prototype._applyDatepickerInputs = /**
         * @param {?} datepickerInstance
         * @return {?}
         */
            function (datepickerInstance) {
                var _this = this;
                ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
                    'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
                    .forEach(function (optionName) {
                    if (_this[optionName] !== undefined) {
                        datepickerInstance[optionName] = _this[optionName];
                    }
                });
                datepickerInstance.startDate = this.startDate || this._model;
            };
        /**
         * @param {?} nativeElement
         * @return {?}
         */
        NgbInputDatepicker.prototype._applyPopupStyling = /**
         * @param {?} nativeElement
         * @return {?}
         */
            function (nativeElement) {
                this._renderer.addClass(nativeElement, 'dropdown-menu');
                this._renderer.setStyle(nativeElement, 'padding', '0');
                this._renderer.addClass(nativeElement, 'show');
            };
        /**
         * @param {?} datepickerInstance
         * @return {?}
         */
        NgbInputDatepicker.prototype._subscribeForDatepickerOutputs = /**
         * @param {?} datepickerInstance
         * @return {?}
         */
            function (datepickerInstance) {
                var _this = this;
                datepickerInstance.navigate.subscribe(function (date) { return _this.navigate.emit(date); });
                datepickerInstance.select.subscribe(function (date) {
                    _this.dateSelect.emit(date);
                    if (_this.autoClose === true || _this.autoClose === 'inside') {
                        _this.close();
                    }
                });
            };
        /**
         * @param {?} model
         * @return {?}
         */
        NgbInputDatepicker.prototype._writeModelValue = /**
         * @param {?} model
         * @return {?}
         */
            function (model) {
                this._renderer.setProperty(this._elRef.nativeElement, 'value', this._parserFormatter.format(model));
                if (this.isOpen()) {
                    this._cRef.instance.writeValue(this._ngbDateAdapter.toModel(model));
                    this._onTouched();
                }
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbInputDatepicker.prototype._fromDateStruct = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                /** @type {?} */
                var ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
                return this._calendar.isValid(ngbDate) ? ngbDate : null;
            };
        NgbInputDatepicker.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[ngbDatepicker]',
                        exportAs: 'ngbDatepicker',
                        host: {
                            '(input)': 'manualDateChange($event.target.value)',
                            '(change)': 'manualDateChange($event.target.value, true)',
                            '(blur)': 'onBlur()',
                            '[disabled]': 'disabled'
                        },
                        providers: [NGB_DATEPICKER_VALUE_ACCESSOR$1, NGB_DATEPICKER_VALIDATOR, NgbDatepickerService]
                    },] },
        ];
        /** @nocollapse */
        NgbInputDatepicker.ctorParameters = function () {
            return [
                { type: NgbDateParserFormatter },
                { type: core.ElementRef },
                { type: core.ViewContainerRef },
                { type: core.Renderer2 },
                { type: core.ComponentFactoryResolver },
                { type: core.NgZone },
                { type: NgbDatepickerService },
                { type: NgbCalendar },
                { type: NgbDateAdapter },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
            ];
        };
        NgbInputDatepicker.propDecorators = {
            autoClose: [{ type: core.Input }],
            dayTemplate: [{ type: core.Input }],
            displayMonths: [{ type: core.Input }],
            firstDayOfWeek: [{ type: core.Input }],
            markDisabled: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            navigation: [{ type: core.Input }],
            outsideDays: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            showWeekdays: [{ type: core.Input }],
            showWeekNumbers: [{ type: core.Input }],
            startDate: [{ type: core.Input }],
            container: [{ type: core.Input }],
            dateSelect: [{ type: core.Output }],
            navigate: [{ type: core.Output }],
            disabled: [{ type: core.Input }]
        };
        return NgbInputDatepicker;
    }());

    /**
     * A directive to mark an element that triggers the datepicker popup opening and closing
     *
     * \@since 3.0.0
     */
    var NgbDatepickerToggle = (function () {
        function NgbDatepickerToggle(_element) {
            this._element = _element;
        }
        Object.defineProperty(NgbDatepickerToggle.prototype, "ngbDatepickerToggle", {
            /**
             * A reference to the `NgbInputDatepicker` instance
             */
            set: /**
             * A reference to the `NgbInputDatepicker` instance
             * @param {?} datepicker
             * @return {?}
             */ function (datepicker) {
                datepicker.registerClickableElement(this._element.nativeElement);
            },
            enumerable: true,
            configurable: true
        });
        NgbDatepickerToggle.decorators = [
            { type: core.Directive, args: [{ selector: '[ngbDatepickerToggle]' },] },
        ];
        /** @nocollapse */
        NgbDatepickerToggle.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        NgbDatepickerToggle.propDecorators = {
            ngbDatepickerToggle: [{ type: core.Input }]
        };
        return NgbDatepickerToggle;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDatepickerDayView = (function () {
        function NgbDatepickerDayView() {
        }
        /**
         * @return {?}
         */
        NgbDatepickerDayView.prototype.isMuted = /**
         * @return {?}
         */
            function () { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); };
        NgbDatepickerDayView.decorators = [
            { type: core.Component, args: [{
                        selector: '[ngbDatepickerDayView]',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n    :host {\n      text-align: center;\n      width: 2rem;\n      height: 2rem;\n      line-height: 2rem;\n      border-radius: 0.25rem;\n      background: transparent;\n    }\n    :host.outside {\n      opacity: 0.5;\n    }\n  "],
                        host: {
                            'class': 'btn-light',
                            '[class.bg-primary]': 'selected',
                            '[class.text-white]': 'selected',
                            '[class.text-muted]': 'isMuted()',
                            '[class.outside]': 'isMuted()',
                            '[class.active]': 'focused'
                        },
                        template: "{{ date.day }}"
                    },] },
        ];
        NgbDatepickerDayView.propDecorators = {
            currentMonth: [{ type: core.Input }],
            date: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            focused: [{ type: core.Input }],
            selected: [{ type: core.Input }]
        };
        return NgbDatepickerDayView;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDatepickerNavigationSelect = (function () {
        function NgbDatepickerNavigationSelect(i18n) {
            this.i18n = i18n;
            this.select = new core.EventEmitter();
        }
        /**
         * @param {?} month
         * @return {?}
         */
        NgbDatepickerNavigationSelect.prototype.changeMonth = /**
         * @param {?} month
         * @return {?}
         */
            function (month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); };
        /**
         * @param {?} year
         * @return {?}
         */
        NgbDatepickerNavigationSelect.prototype.changeYear = /**
         * @param {?} year
         * @return {?}
         */
            function (year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); };
        NgbDatepickerNavigationSelect.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-datepicker-navigation-select',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n    :host>select {\n      display: flex;\n      display: -ms-flexbox;\n      -ms-flex: 1 1 auto;\n      width: 100%;\n      padding: 0 0.5rem;\n      font-size: 0.875rem;\n      height: 1.85rem;\n    }\n  "],
                        template: "\n    <select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.month\"\n      (change)=\"changeMonth($event.target.value)\">\n        <option *ngFor=\"let m of months\" [attr.aria-label]=\"i18n.getMonthFullName(m)\" [value]=\"m\">{{ i18n.getMonthShortName(m) }}</option>\n    </select><select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.year\"\n      (change)=\"changeYear($event.target.value)\">\n        <option *ngFor=\"let y of years\" [value]=\"y\">{{ y }}</option>\n    </select>\n  "
                    },] },
        ];
        /** @nocollapse */
        NgbDatepickerNavigationSelect.ctorParameters = function () {
            return [
                { type: NgbDatepickerI18n }
            ];
        };
        NgbDatepickerNavigationSelect.propDecorators = {
            date: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            months: [{ type: core.Input }],
            years: [{ type: core.Input }],
            select: [{ type: core.Output }]
        };
        return NgbDatepickerNavigationSelect;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var NgbCalendarHijri = (function (_super) {
        __extends(NgbCalendarHijri, _super);
        function NgbCalendarHijri() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        NgbCalendarHijri.prototype.getDaysPerWeek = /**
         * @return {?}
         */
            function () { return 7; };
        /**
         * @return {?}
         */
        NgbCalendarHijri.prototype.getMonths = /**
         * @return {?}
         */
            function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
        /**
         * @return {?}
         */
        NgbCalendarHijri.prototype.getWeeksPerMonth = /**
         * @return {?}
         */
            function () { return 6; };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbCalendarHijri.prototype.isValid = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
                    !isNaN(this.toGregorian(date).getTime());
            };
        /**
         * @param {?} date
         * @param {?} day
         * @return {?}
         */
        NgbCalendarHijri.prototype.setDay = /**
         * @param {?} date
         * @param {?} day
         * @return {?}
         */
            function (date, day) {
                day = +day;
                /** @type {?} */
                var mDays = this.getDaysInIslamicMonth(date.month, date.year);
                if (day <= 0) {
                    while (day <= 0) {
                        date = this.setMonth(date, date.month - 1);
                        mDays = this.getDaysInIslamicMonth(date.month, date.year);
                        day += mDays;
                    }
                }
                else if (day > mDays) {
                    while (day > mDays) {
                        day -= mDays;
                        date = this.setMonth(date, date.month + 1);
                        mDays = this.getDaysInIslamicMonth(date.month, date.year);
                    }
                }
                date.day = day;
                return date;
            };
        /**
         * @param {?} date
         * @param {?} month
         * @return {?}
         */
        NgbCalendarHijri.prototype.setMonth = /**
         * @param {?} date
         * @param {?} month
         * @return {?}
         */
            function (date, month) {
                month = +month;
                date.year = date.year + Math.floor((month - 1) / 12);
                date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
                return date;
            };
        /**
         * @param {?} date
         * @param {?} yearValue
         * @return {?}
         */
        NgbCalendarHijri.prototype.setYear = /**
         * @param {?} date
         * @param {?} yearValue
         * @return {?}
         */
            function (date, yearValue) {
                date.year = +yearValue;
                return date;
            };
        /**
         * @param {?} year
         * @return {?}
         */
        NgbCalendarHijri.prototype._isIslamicLeapYear = /**
         * @param {?} year
         * @return {?}
         */
            function (year) { return (14 + 11 * year) % 30 < 11; };
        /**
         * Returns the start of Hijri Month.
         * `month` is 0 for Muharram, 1 for Safar, etc.
         * `year` is any Hijri year.
         */
        /**
         * Returns the start of Hijri Month.
         * `month` is 0 for Muharram, 1 for Safar, etc.
         * `year` is any Hijri year.
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        NgbCalendarHijri.prototype._getMonthStart = /**
         * Returns the start of Hijri Month.
         * `month` is 0 for Muharram, 1 for Safar, etc.
         * `year` is any Hijri year.
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
            function (year, month) {
                return Math.ceil(29.5 * month) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
            };
        /**
         * Returns the start of Hijri year.
         * `year` is any Hijri year.
         */
        /**
         * Returns the start of Hijri year.
         * `year` is any Hijri year.
         * @param {?} year
         * @return {?}
         */
        NgbCalendarHijri.prototype._getYearStart = /**
         * Returns the start of Hijri year.
         * `year` is any Hijri year.
         * @param {?} year
         * @return {?}
         */
            function (year) { return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0); };
        NgbCalendarHijri.decorators = [
            { type: core.Injectable },
        ];
        return NgbCalendarHijri;
    }(NgbCalendar));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @param {?} date
     * @return {?}
     */
    function isGregorianLeapYear(date) {
        /** @type {?} */
        var year = date.getFullYear();
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function mod(a, b) {
        return a - b * Math.floor(a / b);
    }
    /** *
     * The civil calendar is one type of Hijri calendars used in islamic countries.
     * Uses a fixed cycle of alternating 29- and 30-day months,
     * with a leap day added to the last month of 11 out of every 30 years.
     * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
     * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
     * Dershowitz.
      @type {?} */
    var GREGORIAN_EPOCH = 1721425.5;
    /** @type {?} */
    var ISLAMIC_EPOCH = 1948439.5;
    var NgbCalendarIslamicCivil = (function (_super) {
        __extends(NgbCalendarIslamicCivil, _super);
        function NgbCalendarIslamicCivil() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
         * `gdate` is a JS Date to be converted to Hijri.
         */
        /**
         * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
         * `gdate` is a JS Date to be converted to Hijri.
         * @param {?} gdate
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.fromGregorian = /**
         * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
         * `gdate` is a JS Date to be converted to Hijri.
         * @param {?} gdate
         * @return {?}
         */
            function (gdate) {
                /** @type {?} */
                var date = new Date(gdate);
                /** @type {?} */
                var gYear = date.getFullYear();
                /** @type {?} */
                var gMonth = date.getMonth();
                /** @type {?} */
                var gDay = date.getDate();
                /** @type {?} */
                var julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
                    -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
                    Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(date) ? -1 : -2) + gDay);
                julianDay = Math.floor(julianDay) + 0.5;
                /** @type {?} */
                var days = julianDay - ISLAMIC_EPOCH;
                /** @type {?} */
                var hYear = Math.floor((30 * days + 10646) / 10631.0);
                /** @type {?} */
                var hMonth = Math.ceil((days - 29 - this._getYearStart(hYear)) / 29.5);
                hMonth = Math.min(hMonth, 11);
                /** @type {?} */
                var hDay = Math.ceil(days - this._getMonthStart(hYear, hMonth)) + 1;
                return new NgbDate(hYear, hMonth + 1, hDay);
            };
        /**
         * Returns the equivalent JS date value for a give input islamic(civil) date.
         * `hijriDate` is an islamic(civil) date to be converted to Gregorian.
         */
        /**
         * Returns the equivalent JS date value for a give input islamic(civil) date.
         * `hijriDate` is an islamic(civil) date to be converted to Gregorian.
         * @param {?} hijriDate
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.toGregorian = /**
         * Returns the equivalent JS date value for a give input islamic(civil) date.
         * `hijriDate` is an islamic(civil) date to be converted to Gregorian.
         * @param {?} hijriDate
         * @return {?}
         */
            function (hijriDate) {
                /** @type {?} */
                var hYear = hijriDate.year;
                /** @type {?} */
                var hMonth = hijriDate.month - 1;
                /** @type {?} */
                var hDate = hijriDate.day;
                /** @type {?} */
                var julianDay = hDate + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
                /** @type {?} */
                var wjd = Math.floor(julianDay - 0.5) + 0.5;
                /** @type {?} */
                var depoch = wjd - GREGORIAN_EPOCH;
                /** @type {?} */
                var quadricent = Math.floor(depoch / 146097);
                /** @type {?} */
                var dqc = mod(depoch, 146097);
                /** @type {?} */
                var cent = Math.floor(dqc / 36524);
                /** @type {?} */
                var dcent = mod(dqc, 36524);
                /** @type {?} */
                var quad = Math.floor(dcent / 1461);
                /** @type {?} */
                var dquad = mod(dcent, 1461);
                /** @type {?} */
                var yindex = Math.floor(dquad / 365);
                /** @type {?} */
                var year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
                if (!(cent === 4 || yindex === 4)) {
                    year++;
                }
                /** @type {?} */
                var gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
                    Math.floor((year - 1) / 400);
                /** @type {?} */
                var yearday = wjd - gYearStart;
                /** @type {?} */
                var tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
                    Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
                /** @type {?} */
                var leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
                /** @type {?} */
                var month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
                /** @type {?} */
                var tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
                    Math.floor((year - 1) / 400) +
                    Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                        1);
                /** @type {?} */
                var day = wjd - tjd2 + 1;
                return new Date(year, month - 1, day);
            };
        /**
         * Returns the number of days in a specific Hijri month.
         * `month` is 1 for Muharram, 2 for Safar, etc.
         * `year` is any Hijri year.
         */
        /**
         * Returns the number of days in a specific Hijri month.
         * `month` is 1 for Muharram, 2 for Safar, etc.
         * `year` is any Hijri year.
         * @param {?} month
         * @param {?} year
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.getDaysInIslamicMonth = /**
         * Returns the number of days in a specific Hijri month.
         * `month` is 1 for Muharram, 2 for Safar, etc.
         * `year` is any Hijri year.
         * @param {?} month
         * @param {?} year
         * @return {?}
         */
            function (month, year) {
                year = year + Math.floor(month / 13);
                month = ((month - 1) % 12) + 1;
                /** @type {?} */
                var length = 29 + month % 2;
                if (month === 12 && this._isIslamicLeapYear(year)) {
                    length++;
                }
                return length;
            };
        /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.getNext = /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
            function (date, period, number) {
                if (period === void 0) {
                    period = 'd';
                }
                if (number === void 0) {
                    number = 1;
                }
                date = NgbDate.from(date);
                switch (period) {
                    case 'y':
                        date = this.setYear(date, date.year + number);
                        date.month = 1;
                        date.day = 1;
                        return date;
                    case 'm':
                        date = this.setMonth(date, date.month + number);
                        date.day = 1;
                        return date;
                    case 'd':
                        return this.setDay(date, date.day + number);
                    default:
                        return date;
                }
            };
        /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.getPrev = /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
            function (date, period, number) {
                if (period === void 0) {
                    period = 'd';
                }
                if (number === void 0) {
                    number = 1;
                }
                return this.getNext(date, period, -number);
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.getWeekday = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                /** @type {?} */
                var day = this.toGregorian(date).getDay();
                // in JS Date Sun=0, in ISO 8601 Sun=7
                return day === 0 ? 7 : day;
            };
        /**
         * @param {?} week
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.getWeekNumber = /**
         * @param {?} week
         * @param {?} firstDayOfWeek
         * @return {?}
         */
            function (week, firstDayOfWeek) {
                // in JS Date Sun=0, in ISO 8601 Sun=7
                if (firstDayOfWeek === 7) {
                    firstDayOfWeek = 0;
                }
                /** @type {?} */
                var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
                /** @type {?} */
                var date = week[thursdayIndex];
                /** @type {?} */
                var jsDate = this.toGregorian(date);
                jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
                /** @type {?} */
                var time = jsDate.getTime();
                /** @type {?} */
                var MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1)); // Compare with Muharram 1
                return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
            };
        /**
         * @return {?}
         */
        NgbCalendarIslamicCivil.prototype.getToday = /**
         * @return {?}
         */
            function () { return this.fromGregorian(new Date()); };
        NgbCalendarIslamicCivil.decorators = [
            { type: core.Injectable },
        ];
        return NgbCalendarIslamicCivil;
    }(NgbCalendarHijri));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Umalqura calendar is one type of Hijri calendars used in islamic countries.
     * This Calendar is used by Saudi Arabia for administrative purpose.
     * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
     * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
      @type {?} */
    var GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
    /** @type {?} */
    var GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
    /** @type {?} */
    var HIJRI_BEGIN = 1300;
    /** @type {?} */
    var HIJRI_END = 1600;
    /** @type {?} */
    var ONE_DAY = 1000 * 60 * 60 * 24;
    /** @type {?} */
    var ISLAMIC_CIVIL = new NgbCalendarIslamicCivil();
    /** @type {?} */
    var MONTH_LENGTH = [
        '101010101010', '110101010100', '111011001001', '011011010100', '011011101010',
        '001101101100', '101010101101', '010101010101', '011010101001', '011110010010',
        '101110101001', '010111010100', '101011011010', '010101011100', '110100101101',
        '011010010101', '011101001010', '101101010100', '101101101010', '010110101101',
        '010010101110', '101001001111', '010100010111', '011010001011', '011010100101',
        '101011010101', '001011010110', '100101011011', '010010011101', '101001001101',
        '110100100110', '110110010101', '010110101100', '100110110110', '001010111010',
        '101001011011', '010100101011', '101010010101', '011011001010', '101011101001',
        '001011110100', '100101110110', '001010110110', '100101010110', '101011001010',
        '101110100100', '101111010010', '010111011001', '001011011100', '100101101101',
        '010101001101', '101010100101', '101101010010', '101110100101', '010110110100',
        '100110110110', '010101010111', '001010010111', '010101001011', '011010100011',
        '011101010010', '101101100101', '010101101010', '101010101011', '010100101011',
        '110010010101', '110101001010', '110110100101', '010111001010', '101011010110',
        '100101010111', '010010101011', '100101001011', '101010100101', '101101010010',
        '101101101010', '010101110101', '001001110110', '100010110111', '010001011011',
        '010101010101', '010110101001', '010110110100', '100111011010', '010011011101',
        '001001101110', '100100110110', '101010101010', '110101010100', '110110110010',
        '010111010101', '001011011010', '100101011011', '010010101011', '101001010101',
        '101101001001', '101101100100', '101101110001', '010110110100', '101010110101',
        '101001010101', '110100100101', '111010010010', '111011001001', '011011010100',
        '101011101001', '100101101011', '010010101011', '101010010011', '110101001001',
        '110110100100', '110110110010', '101010111001', '010010111010', '101001011011',
        '010100101011', '101010010101', '101100101010', '101101010101', '010101011100',
        '010010111101', '001000111101', '100100011101', '101010010101', '101101001010',
        '101101011010', '010101101101', '001010110110', '100100111011', '010010011011',
        '011001010101', '011010101001', '011101010100', '101101101010', '010101101100',
        '101010101101', '010101010101', '101100101001', '101110010010', '101110101001',
        '010111010100', '101011011010', '010101011010', '101010101011', '010110010101',
        '011101001001', '011101100100', '101110101010', '010110110101', '001010110110',
        '101001010110', '111001001101', '101100100101', '101101010010', '101101101010',
        '010110101101', '001010101110', '100100101111', '010010010111', '011001001011',
        '011010100101', '011010101100', '101011010110', '010101011101', '010010011101',
        '101001001101', '110100010110', '110110010101', '010110101010', '010110110101',
        '001011011010', '100101011011', '010010101101', '010110010101', '011011001010',
        '011011100100', '101011101010', '010011110101', '001010110110', '100101010110',
        '101010101010', '101101010100', '101111010010', '010111011001', '001011101010',
        '100101101101', '010010101101', '101010010101', '101101001010', '101110100101',
        '010110110010', '100110110101', '010011010110', '101010010111', '010101000111',
        '011010010011', '011101001001', '101101010101', '010101101010', '101001101011',
        '010100101011', '101010001011', '110101000110', '110110100011', '010111001010',
        '101011010110', '010011011011', '001001101011', '100101001011', '101010100101',
        '101101010010', '101101101001', '010101110101', '000101110110', '100010110111',
        '001001011011', '010100101011', '010101100101', '010110110100', '100111011010',
        '010011101101', '000101101101', '100010110110', '101010100110', '110101010010',
        '110110101001', '010111010100', '101011011010', '100101011011', '010010101011',
        '011001010011', '011100101001', '011101100010', '101110101001', '010110110010',
        '101010110101', '010101010101', '101100100101', '110110010010', '111011001001',
        '011011010010', '101011101001', '010101101011', '010010101011', '101001010101',
        '110100101001', '110101010100', '110110101010', '100110110101', '010010111010',
        '101000111011', '010010011011', '101001001101', '101010101010', '101011010101',
        '001011011010', '100101011101', '010001011110', '101000101110', '110010011010',
        '110101010101', '011010110010', '011010111001', '010010111010', '101001011101',
        '010100101101', '101010010101', '101101010010', '101110101000', '101110110100',
        '010110111001', '001011011010', '100101011010', '101101001010', '110110100100',
        '111011010001', '011011101000', '101101101010', '010101101101', '010100110101',
        '011010010101', '110101001010', '110110101000', '110111010100', '011011011010',
        '010101011011', '001010011101', '011000101011', '101100010101', '101101001010',
        '101110010101', '010110101010', '101010101110', '100100101110', '110010001111',
        '010100100111', '011010010101', '011010101010', '101011010110', '010101011101',
        '001010011101'
    ];
    /**
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function getDaysDiff(date1, date2) {
        /** @type {?} */
        var diff = Math.abs(date1.getTime() - date2.getTime());
        return Math.round(diff / ONE_DAY);
    }
    var NgbCalendarIslamicUmalqura = (function (_super) {
        __extends(NgbCalendarIslamicUmalqura, _super);
        function NgbCalendarIslamicUmalqura() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
        * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
        * `gdate` is s JS Date to be converted to Hijri.
        */
        /**
         * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
         * `gdate` is s JS Date to be converted to Hijri.
         * @param {?} gDate
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.fromGregorian = /**
         * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
         * `gdate` is s JS Date to be converted to Hijri.
         * @param {?} gDate
         * @return {?}
         */
            function (gDate) {
                /** @type {?} */
                var hDay = 1;
                /** @type {?} */
                var hMonth = 0;
                /** @type {?} */
                var hYear = 1300;
                /** @type {?} */
                var daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
                if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
                    /** @type {?} */
                    var year = 1300;
                    for (var i = 0; i < MONTH_LENGTH.length; i++, year++) {
                        for (var j = 0; j < 12; j++) {
                            /** @type {?} */
                            var numOfDays = +MONTH_LENGTH[i][j] + 29;
                            if (daysDiff <= numOfDays) {
                                hDay = daysDiff + 1;
                                if (hDay > numOfDays) {
                                    hDay = 1;
                                    j++;
                                }
                                if (j > 11) {
                                    j = 0;
                                    year++;
                                }
                                hMonth = j;
                                hYear = year;
                                return new NgbDate(hYear, hMonth + 1, hDay);
                            }
                            daysDiff = daysDiff - numOfDays;
                        }
                    }
                }
                else {
                    return ISLAMIC_CIVIL.fromGregorian(gDate);
                }
            };
        /**
        * Converts the current Hijri date to Gregorian.
        */
        /**
         * Converts the current Hijri date to Gregorian.
         * @param {?} hijriDate
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.toGregorian = /**
         * Converts the current Hijri date to Gregorian.
         * @param {?} hijriDate
         * @return {?}
         */
            function (hijriDate) {
                /** @type {?} */
                var hYear = hijriDate.year;
                /** @type {?} */
                var hMonth = hijriDate.month - 1;
                /** @type {?} */
                var hDay = hijriDate.day;
                /** @type {?} */
                var gDate = new Date(GREGORIAN_FIRST_DATE);
                /** @type {?} */
                var dayDiff = hDay - 1;
                if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
                    for (var y = 0; y < hYear - HIJRI_BEGIN; y++) {
                        for (var m = 0; m < 12; m++) {
                            dayDiff += +MONTH_LENGTH[y][m] + 29;
                        }
                    }
                    for (var m = 0; m < hMonth; m++) {
                        dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
                    }
                    gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
                }
                else {
                    gDate = ISLAMIC_CIVIL.toGregorian(hijriDate);
                }
                return gDate;
            };
        /**
        * Returns the number of days in a specific Hijri month.
        * `month` is 1 for Muharram, 2 for Safar, etc.
        * `year` is any Hijri year.
        */
        /**
         * Returns the number of days in a specific Hijri month.
         * `month` is 1 for Muharram, 2 for Safar, etc.
         * `year` is any Hijri year.
         * @param {?} month
         * @param {?} year
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.getDaysInIslamicMonth = /**
         * Returns the number of days in a specific Hijri month.
         * `month` is 1 for Muharram, 2 for Safar, etc.
         * `year` is any Hijri year.
         * @param {?} month
         * @param {?} year
         * @return {?}
         */
            function (month, year) {
                if (year >= HIJRI_BEGIN && year <= HIJRI_END) {
                    /** @type {?} */
                    var pos = year - HIJRI_BEGIN;
                    return MONTH_LENGTH[pos].charAt(month - 1) === '1' ? 30 : 29;
                }
                return ISLAMIC_CIVIL.getDaysInIslamicMonth(month, year);
            };
        /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.getNext = /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
            function (date, period, number) {
                if (period === void 0) {
                    period = 'd';
                }
                if (number === void 0) {
                    number = 1;
                }
                date = NgbDate.from(date);
                switch (period) {
                    case 'y':
                        date = this.setYear(date, date.year + number);
                        date.month = 1;
                        date.day = 1;
                        return date;
                    case 'm':
                        date = this.setMonth(date, date.month + number);
                        date.day = 1;
                        return date;
                    case 'd':
                        return this.setDay(date, date.day + number);
                    default:
                        return date;
                }
            };
        /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.getPrev = /**
         * @param {?} date
         * @param {?=} period
         * @param {?=} number
         * @return {?}
         */
            function (date, period, number) {
                if (period === void 0) {
                    period = 'd';
                }
                if (number === void 0) {
                    number = 1;
                }
                return this.getNext(date, period, -number);
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.getWeekday = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                /** @type {?} */
                var day = this.toGregorian(date).getDay();
                // in JS Date Sun=0, in ISO 8601 Sun=7
                return day === 0 ? 7 : day;
            };
        /**
         * @param {?} week
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.getWeekNumber = /**
         * @param {?} week
         * @param {?} firstDayOfWeek
         * @return {?}
         */
            function (week, firstDayOfWeek) {
                // in JS Date Sun=0, in ISO 8601 Sun=7
                if (firstDayOfWeek === 7) {
                    firstDayOfWeek = 0;
                }
                /** @type {?} */
                var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
                /** @type {?} */
                var date = week[thursdayIndex];
                /** @type {?} */
                var jsDate = this.toGregorian(date);
                jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
                /** @type {?} */
                var time = jsDate.getTime();
                /** @type {?} */
                var MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1)); // Compare with Muharram 1
                return Math.floor(Math.round((time - MuhDate.getTime()) / ONE_DAY) / 7) + 1;
            };
        /**
         * @return {?}
         */
        NgbCalendarIslamicUmalqura.prototype.getToday = /**
         * @return {?}
         */
            function () { return this.fromGregorian(new Date()); };
        NgbCalendarIslamicUmalqura.decorators = [
            { type: core.Injectable },
        ];
        return NgbCalendarIslamicUmalqura;
    }(NgbCalendarHijri));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDateNativeAdapter = (function (_super) {
        __extends(NgbDateNativeAdapter, _super);
        function NgbDateNativeAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDateNativeAdapter.prototype.fromModel = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                return (date && date.getFullYear) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } :
                    null;
            };
        /**
         * @param {?} date
         * @return {?}
         */
        NgbDateNativeAdapter.prototype.toModel = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                return date && date.year && date.month ? new Date(date.year, date.month - 1, date.day) : null;
            };
        NgbDateNativeAdapter.decorators = [
            { type: core.Injectable },
        ];
        return NgbDateNativeAdapter;
    }(NgbDateAdapter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbDatepickerModule = (function () {
        function NgbDatepickerModule() {
        }
        /**
         * @return {?}
         */
        NgbDatepickerModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgbDatepickerModule,
                    providers: [
                        { provide: NgbCalendar, useClass: NgbCalendarGregorian },
                        { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nDefault },
                        { provide: NgbDateParserFormatter, useClass: NgbDateISOParserFormatter },
                        { provide: NgbDateAdapter, useClass: NgbDateStructAdapter }, NgbDatepickerConfig, common.DatePipe
                    ]
                };
            };
        NgbDatepickerModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NgbDatepicker, NgbDatepickerMonthView, NgbDatepickerNavigation, NgbDatepickerNavigationSelect, NgbDatepickerDayView,
                            NgbInputDatepicker, NgbDatepickerToggle
                        ],
                        exports: [NgbDatepicker, NgbInputDatepicker, NgbDatepickerToggle],
                        imports: [common.CommonModule, forms.FormsModule],
                        entryComponents: [NgbDatepicker]
                    },] },
        ];
        return NgbDatepickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbDropdown directive.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the dropdowns used in the application.
     */
    var NgbDropdownConfig = (function () {
        function NgbDropdownConfig() {
            this.autoClose = true;
            this.placement = 'bottom-left';
        }
        NgbDropdownConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbDropdownConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     *
     */
    var NgbDropdownMenu = (function () {
        function NgbDropdownMenu(dropdown, _elementRef, _renderer) {
            this.dropdown = dropdown;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this.placement = 'bottom';
            this.isOpen = false;
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbDropdownMenu.prototype.isEventFrom = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) { return this._elementRef.nativeElement.contains($event.target); };
        /**
         * @param {?} triggerEl
         * @param {?} placement
         * @return {?}
         */
        NgbDropdownMenu.prototype.position = /**
         * @param {?} triggerEl
         * @param {?} placement
         * @return {?}
         */
            function (triggerEl, placement) {
                this.applyPlacement(positionElements(triggerEl, this._elementRef.nativeElement, placement));
            };
        /**
         * @param {?} _placement
         * @return {?}
         */
        NgbDropdownMenu.prototype.applyPlacement = /**
         * @param {?} _placement
         * @return {?}
         */
            function (_placement) {
                // remove the current placement classes
                this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropup');
                this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropdown');
                this.placement = _placement;
                /**
                     * apply the new placement
                     * in case of top use up-arrow or down-arrow otherwise
                     */
                if (_placement.search('^top') !== -1) {
                    this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropup');
                }
                else {
                    this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropdown');
                }
            };
        NgbDropdownMenu.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbDropdownMenu]',
                        host: { '[class.dropdown-menu]': 'true', '[class.show]': 'dropdown.isOpen()', '[attr.x-placement]': 'placement' }
                    },] },
        ];
        /** @nocollapse */
        NgbDropdownMenu.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgbDropdown; }),] }] },
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        return NgbDropdownMenu;
    }());
    /**
     * Marks an element to which dropdown menu will be anchored. This is a simple version
     * of the NgbDropdownToggle directive. It plays the same role as NgbDropdownToggle but
     * doesn't listen to click events to toggle dropdown menu thus enabling support for
     * events other than click.
     *
     * \@since 1.1.0
     */
    var NgbDropdownAnchor = (function () {
        function NgbDropdownAnchor(dropdown, _elementRef) {
            this.dropdown = dropdown;
            this._elementRef = _elementRef;
            this.anchorEl = _elementRef.nativeElement;
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbDropdownAnchor.prototype.isEventFrom = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) { return this._elementRef.nativeElement.contains($event.target); };
        NgbDropdownAnchor.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbDropdownAnchor]',
                        host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
                    },] },
        ];
        /** @nocollapse */
        NgbDropdownAnchor.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgbDropdown; }),] }] },
                { type: core.ElementRef }
            ];
        };
        return NgbDropdownAnchor;
    }());
    /**
     * Allows the dropdown to be toggled via click. This directive is optional: you can use NgbDropdownAnchor as an
     * alternative.
     */
    var NgbDropdownToggle = (function (_super) {
        __extends(NgbDropdownToggle, _super);
        function NgbDropdownToggle(dropdown, elementRef) {
            return _super.call(this, dropdown, elementRef) || this;
        }
        /**
         * @return {?}
         */
        NgbDropdownToggle.prototype.toggleOpen = /**
         * @return {?}
         */
            function () { this.dropdown.toggle(); };
        NgbDropdownToggle.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbDropdownToggle]',
                        host: {
                            'class': 'dropdown-toggle',
                            'aria-haspopup': 'true',
                            '[attr.aria-expanded]': 'dropdown.isOpen()',
                            '(click)': 'toggleOpen()'
                        },
                        providers: [{ provide: NgbDropdownAnchor, useExisting: core.forwardRef(function () { return NgbDropdownToggle; }) }]
                    },] },
        ];
        /** @nocollapse */
        NgbDropdownToggle.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgbDropdown; }),] }] },
                { type: core.ElementRef }
            ];
        };
        return NgbDropdownToggle;
    }(NgbDropdownAnchor));
    /**
     * Transforms a node into a dropdown.
     */
    var NgbDropdown = (function () {
        function NgbDropdown(_changeDetector, config, _document, _ngZone) {
            var _this = this;
            this._changeDetector = _changeDetector;
            this._document = _document;
            this._ngZone = _ngZone;
            /**
             *  Defines whether or not the dropdown-menu is open initially.
             */
            this._open = false;
            /**
             *  An event fired when the dropdown is opened or closed.
             *  Event's payload equals whether dropdown is open.
             */
            this.openChange = new core.EventEmitter();
            this.placement = config.placement;
            this.autoClose = config.autoClose;
            this._zoneSubscription = _ngZone.onStable.subscribe(function () { _this._positionMenu(); });
        }
        /**
         * @return {?}
         */
        NgbDropdown.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (this._menu) {
                    this._menu.applyPlacement(Array.isArray(this.placement) ? (this.placement[0]) : /** @type {?} */ (this.placement));
                }
            };
        /**
         * Checks if the dropdown menu is open or not.
         */
        /**
         * Checks if the dropdown menu is open or not.
         * @return {?}
         */
        NgbDropdown.prototype.isOpen = /**
         * Checks if the dropdown menu is open or not.
         * @return {?}
         */
            function () { return this._open; };
        /**
         * Opens the dropdown menu of a given navbar or tabbed navigation.
         */
        /**
         * Opens the dropdown menu of a given navbar or tabbed navigation.
         * @return {?}
         */
        NgbDropdown.prototype.open = /**
         * Opens the dropdown menu of a given navbar or tabbed navigation.
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this._open) {
                    this._open = true;
                    this._positionMenu();
                    this.openChange.emit(true);
                    this._ngZone.runOutsideAngular(function () {
                        return rxjs.fromEvent(_this._document, 'keyup')
                            .pipe(operators.takeUntil(_this.openChange.pipe(operators.filter(function (open) { return open === false; }))), operators.filter(function (event) { return event.which === Key.Escape; }))
                            .subscribe(function () {
                            _this.closeFromOutsideEsc();
                            _this._changeDetector.detectChanges();
                        });
                    });
                }
            };
        /**
         * Closes the dropdown menu of a given navbar or tabbed navigation.
         */
        /**
         * Closes the dropdown menu of a given navbar or tabbed navigation.
         * @return {?}
         */
        NgbDropdown.prototype.close = /**
         * Closes the dropdown menu of a given navbar or tabbed navigation.
         * @return {?}
         */
            function () {
                if (this._open) {
                    this._open = false;
                    this.openChange.emit(false);
                }
            };
        /**
         * Toggles the dropdown menu of a given navbar or tabbed navigation.
         */
        /**
         * Toggles the dropdown menu of a given navbar or tabbed navigation.
         * @return {?}
         */
        NgbDropdown.prototype.toggle = /**
         * Toggles the dropdown menu of a given navbar or tabbed navigation.
         * @return {?}
         */
            function () {
                if (this.isOpen()) {
                    this.close();
                }
                else {
                    this.open();
                }
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbDropdown.prototype.closeFromClick = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                if (this.autoClose && $event.button !== 2 && !this._isEventFromToggle($event)) {
                    if (this.autoClose === true) {
                        this.close();
                    }
                    else if (this.autoClose === 'inside' && this._isEventFromMenu($event)) {
                        this.close();
                    }
                    else if (this.autoClose === 'outside' && !this._isEventFromMenu($event)) {
                        this.close();
                    }
                }
            };
        /**
         * @return {?}
         */
        NgbDropdown.prototype.closeFromOutsideEsc = /**
         * @return {?}
         */
            function () {
                if (this.autoClose) {
                    this.close();
                }
            };
        /**
         * @return {?}
         */
        NgbDropdown.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () { this._zoneSubscription.unsubscribe(); };
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbDropdown.prototype._isEventFromToggle = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) { return this._anchor.isEventFrom($event); };
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbDropdown.prototype._isEventFromMenu = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) { return this._menu ? this._menu.isEventFrom($event) : false; };
        /**
         * @return {?}
         */
        NgbDropdown.prototype._positionMenu = /**
         * @return {?}
         */
            function () {
                if (this.isOpen() && this._menu) {
                    this._menu.position(this._anchor.anchorEl, this.placement);
                }
            };
        NgbDropdown.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngbDropdown]',
                        exportAs: 'ngbDropdown',
                        host: { '[class.show]': 'isOpen()', '(document:click)': 'closeFromClick($event)' }
                    },] },
        ];
        /** @nocollapse */
        NgbDropdown.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef },
                { type: NgbDropdownConfig },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
                { type: core.NgZone }
            ];
        };
        NgbDropdown.propDecorators = {
            _menu: [{ type: core.ContentChild, args: [NgbDropdownMenu,] }],
            _anchor: [{ type: core.ContentChild, args: [NgbDropdownAnchor,] }],
            autoClose: [{ type: core.Input }],
            _open: [{ type: core.Input, args: ['open',] }],
            placement: [{ type: core.Input }],
            openChange: [{ type: core.Output }]
        };
        return NgbDropdown;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu];
    var NgbDropdownModule = (function () {
        function NgbDropdownModule() {
        }
        /**
         * @return {?}
         */
        NgbDropdownModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbDropdownModule, providers: [NgbDropdownConfig] }; };
        NgbDropdownModule.decorators = [
            { type: core.NgModule, args: [{ declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES },] },
        ];
        return NgbDropdownModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbModalBackdrop = (function () {
        function NgbModalBackdrop() {
        }
        NgbModalBackdrop.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-modal-backdrop',
                        template: '',
                        host: { '[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")' }
                    },] },
        ];
        NgbModalBackdrop.propDecorators = {
            backdropClass: [{ type: core.Input }]
        };
        return NgbModalBackdrop;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ModalDismissReasons = {
        BACKDROP_CLICK: 0,
        ESC: 1,
    };
    ModalDismissReasons[ModalDismissReasons.BACKDROP_CLICK] = 'BACKDROP_CLICK';
    ModalDismissReasons[ModalDismissReasons.ESC] = 'ESC';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbModalWindow = (function () {
        function NgbModalWindow(document, _elRef, _renderer) {
            this._elRef = _elRef;
            this._renderer = _renderer;
            this.backdrop = true;
            this.keyboard = true;
            this.dismissEvent = new core.EventEmitter();
            this._document = document;
            ngbFocusTrap(this._elRef.nativeElement, this.dismissEvent);
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbModalWindow.prototype.backdropClick = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
                    this.dismiss(ModalDismissReasons.BACKDROP_CLICK);
                }
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        NgbModalWindow.prototype.escKey = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                if (this.keyboard && !$event.defaultPrevented) {
                    this.dismiss(ModalDismissReasons.ESC);
                }
            };
        /**
         * @param {?} reason
         * @return {?}
         */
        NgbModalWindow.prototype.dismiss = /**
         * @param {?} reason
         * @return {?}
         */
            function (reason) { this.dismissEvent.emit(reason); };
        /**
         * @return {?}
         */
        NgbModalWindow.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this._elWithFocus = this._document.activeElement;
                this._renderer.addClass(this._document.body, 'modal-open');
            };
        /**
         * @return {?}
         */
        NgbModalWindow.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                if (!this._elRef.nativeElement.contains(document.activeElement)) {
                    this._elRef.nativeElement['focus'].apply(this._elRef.nativeElement, []);
                }
            };
        /**
         * @return {?}
         */
        NgbModalWindow.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var body = this._document.body;
                /** @type {?} */
                var elWithFocus = this._elWithFocus;
                /** @type {?} */
                var elementToFocus;
                if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
                    elementToFocus = elWithFocus;
                }
                else {
                    elementToFocus = body;
                }
                elementToFocus['focus'].apply(elementToFocus, []);
                this._elWithFocus = null;
                this._renderer.removeClass(body, 'modal-open');
            };
        NgbModalWindow.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-modal-window',
                        host: {
                            '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                            'role': 'dialog',
                            'tabindex': '-1',
                            '(keyup.esc)': 'escKey($event)',
                            '(click)': 'backdropClick($event)',
                            '[attr.aria-labelledby]': 'ariaLabelledBy',
                        },
                        template: "\n    <div [class]=\"'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '')\" role=\"document\">\n        <div class=\"modal-content\"><ng-content></ng-content></div>\n    </div>\n    "
                    },] },
        ];
        /** @nocollapse */
        NgbModalWindow.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        NgbModalWindow.propDecorators = {
            ariaLabelledBy: [{ type: core.Input }],
            backdrop: [{ type: core.Input }],
            centered: [{ type: core.Input }],
            keyboard: [{ type: core.Input }],
            size: [{ type: core.Input }],
            windowClass: [{ type: core.Input }],
            dismissEvent: [{ type: core.Output, args: ['dismiss',] }]
        };
        return NgbModalWindow;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContentRef = (function () {
        function ContentRef(nodes, viewRef, componentRef) {
            this.nodes = nodes;
            this.viewRef = viewRef;
            this.componentRef = componentRef;
        }
        return ContentRef;
    }());
    /**
     * @template T
     */
    var /**
     * @template T
     */ PopupService = (function () {
        function PopupService(_type, _injector, _viewContainerRef, _renderer, _componentFactoryResolver) {
            this._type = _type;
            this._injector = _injector;
            this._viewContainerRef = _viewContainerRef;
            this._renderer = _renderer;
            this._componentFactoryResolver = _componentFactoryResolver;
        }
        /**
         * @param {?=} content
         * @param {?=} context
         * @return {?}
         */
        PopupService.prototype.open = /**
         * @param {?=} content
         * @param {?=} context
         * @return {?}
         */
            function (content, context) {
                if (!this._windowRef) {
                    this._contentRef = this._getContentRef(content, context);
                    this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), 0, this._injector, this._contentRef.nodes);
                }
                return this._windowRef;
            };
        /**
         * @return {?}
         */
        PopupService.prototype.close = /**
         * @return {?}
         */
            function () {
                if (this._windowRef) {
                    this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
                    this._windowRef = null;
                    if (this._contentRef.viewRef) {
                        this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                        this._contentRef = null;
                    }
                }
            };
        /**
         * @param {?} content
         * @param {?=} context
         * @return {?}
         */
        PopupService.prototype._getContentRef = /**
         * @param {?} content
         * @param {?=} context
         * @return {?}
         */
            function (content, context) {
                if (!content) {
                    return new ContentRef([]);
                }
                else if (content instanceof core.TemplateRef) {
                    /** @type {?} */
                    var viewRef = this._viewContainerRef.createEmbeddedView(/** @type {?} */ (content), context);
                    return new ContentRef([viewRef.rootNodes], viewRef);
                }
                else {
                    return new ContentRef([[this._renderer.createText("" + content)]]);
                }
            };
        return PopupService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * A reference to an active (currently opened) modal. Instances of this class
     * can be injected into components passed as modal content.
     */
    var /**
     * A reference to an active (currently opened) modal. Instances of this class
     * can be injected into components passed as modal content.
     */ NgbActiveModal = (function () {
        function NgbActiveModal() {
        }
        /**
         * Can be used to close a modal, passing an optional result.
         */
        /**
         * Can be used to close a modal, passing an optional result.
         * @param {?=} result
         * @return {?}
         */
        NgbActiveModal.prototype.close = /**
         * Can be used to close a modal, passing an optional result.
         * @param {?=} result
         * @return {?}
         */
            function (result) { };
        /**
         * Can be used to dismiss a modal, passing an optional reason.
         */
        /**
         * Can be used to dismiss a modal, passing an optional reason.
         * @param {?=} reason
         * @return {?}
         */
        NgbActiveModal.prototype.dismiss = /**
         * Can be used to dismiss a modal, passing an optional reason.
         * @param {?=} reason
         * @return {?}
         */
            function (reason) { };
        return NgbActiveModal;
    }());
    /**
     * A reference to a newly opened modal.
     */
    var /**
     * A reference to a newly opened modal.
     */ NgbModalRef = (function () {
        function NgbModalRef(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
            var _this = this;
            this._windowCmptRef = _windowCmptRef;
            this._contentRef = _contentRef;
            this._backdropCmptRef = _backdropCmptRef;
            this._beforeDismiss = _beforeDismiss;
            _windowCmptRef.instance.dismissEvent.subscribe(function (reason) { _this.dismiss(reason); });
            this.result = new Promise(function (resolve, reject) {
                _this._resolve = resolve;
                _this._reject = reject;
            });
            this.result.then(null, function () { });
        }
        Object.defineProperty(NgbModalRef.prototype, "componentInstance", {
            /**
             * The instance of component used as modal's content.
             * Undefined when a TemplateRef is used as modal's content.
             */
            get: /**
             * The instance of component used as modal's content.
             * Undefined when a TemplateRef is used as modal's content.
             * @return {?}
             */ function () {
                if (this._contentRef.componentRef) {
                    return this._contentRef.componentRef.instance;
                }
            },
            // only needed to keep TS1.8 compatibility
            set: /**
             * @param {?} instance
             * @return {?}
             */ function (instance) { },
            enumerable: true,
            configurable: true
        });
        /**
         * Can be used to close a modal, passing an optional result.
         */
        /**
         * Can be used to close a modal, passing an optional result.
         * @param {?=} result
         * @return {?}
         */
        NgbModalRef.prototype.close = /**
         * Can be used to close a modal, passing an optional result.
         * @param {?=} result
         * @return {?}
         */
            function (result) {
                if (this._windowCmptRef) {
                    this._resolve(result);
                    this._removeModalElements();
                }
            };
        /**
         * @param {?=} reason
         * @return {?}
         */
        NgbModalRef.prototype._dismiss = /**
         * @param {?=} reason
         * @return {?}
         */
            function (reason) {
                this._reject(reason);
                this._removeModalElements();
            };
        /**
         * Can be used to dismiss a modal, passing an optional reason.
         */
        /**
         * Can be used to dismiss a modal, passing an optional reason.
         * @param {?=} reason
         * @return {?}
         */
        NgbModalRef.prototype.dismiss = /**
         * Can be used to dismiss a modal, passing an optional reason.
         * @param {?=} reason
         * @return {?}
         */
            function (reason) {
                var _this = this;
                if (this._windowCmptRef) {
                    if (!this._beforeDismiss) {
                        this._dismiss(reason);
                    }
                    else {
                        /** @type {?} */
                        var dismiss = this._beforeDismiss();
                        if (dismiss && dismiss.then) {
                            dismiss.then(function (result) {
                                if (result !== false) {
                                    _this._dismiss(reason);
                                }
                            }, function () { });
                        }
                        else if (dismiss !== false) {
                            this._dismiss(reason);
                        }
                    }
                }
            };
        /**
         * @return {?}
         */
        NgbModalRef.prototype._removeModalElements = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var windowNativeEl = this._windowCmptRef.location.nativeElement;
                windowNativeEl.parentNode.removeChild(windowNativeEl);
                this._windowCmptRef.destroy();
                if (this._backdropCmptRef) {
                    /** @type {?} */
                    var backdropNativeEl = this._backdropCmptRef.location.nativeElement;
                    backdropNativeEl.parentNode.removeChild(backdropNativeEl);
                    this._backdropCmptRef.destroy();
                }
                if (this._contentRef && this._contentRef.viewRef) {
                    this._contentRef.viewRef.destroy();
                }
                this._windowCmptRef = null;
                this._backdropCmptRef = null;
                this._contentRef = null;
            };
        return NgbModalRef;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbModalStack = (function () {
        function NgbModalStack(_applicationRef, _injector, _componentFactoryResolver, document) {
            this._applicationRef = _applicationRef;
            this._injector = _injector;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'size', 'windowClass'];
            this._backdropAttributes = ['backdropClass'];
            this._document = document;
        }
        /**
         * @param {?} moduleCFR
         * @param {?} contentInjector
         * @param {?} content
         * @param {?} options
         * @return {?}
         */
        NgbModalStack.prototype.open = /**
         * @param {?} moduleCFR
         * @param {?} contentInjector
         * @param {?} content
         * @param {?} options
         * @return {?}
         */
            function (moduleCFR, contentInjector, content, options) {
                /** @type {?} */
                var containerEl = isDefined(options.container) ? this._document.querySelector(options.container) : this._document.body;
                if (!containerEl) {
                    throw new Error("The specified modal container \"" + (options.container || 'body') + "\" was not found in the DOM.");
                }
                /** @type {?} */
                var activeModal = new NgbActiveModal();
                /** @type {?} */
                var contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);
                /** @type {?} */
                var backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(containerEl) : null;
                /** @type {?} */
                var windowCmptRef = this._attachWindowComponent(containerEl, contentRef);
                /** @type {?} */
                var ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
                activeModal.close = function (result) { ngbModalRef.close(result); };
                activeModal.dismiss = function (reason) { ngbModalRef.dismiss(reason); };
                this._applyWindowOptions(windowCmptRef.instance, options);
                if (backdropCmptRef && backdropCmptRef.instance) {
                    this._applyBackdropOptions(backdropCmptRef.instance, options);
                }
                return ngbModalRef;
            };
        /**
         * @param {?} containerEl
         * @return {?}
         */
        NgbModalStack.prototype._attachBackdrop = /**
         * @param {?} containerEl
         * @return {?}
         */
            function (containerEl) {
                /** @type {?} */
                var backdropFactory = this._componentFactoryResolver.resolveComponentFactory(NgbModalBackdrop);
                /** @type {?} */
                var backdropCmptRef = backdropFactory.create(this._injector);
                this._applicationRef.attachView(backdropCmptRef.hostView);
                containerEl.appendChild(backdropCmptRef.location.nativeElement);
                return backdropCmptRef;
            };
        /**
         * @param {?} containerEl
         * @param {?} contentRef
         * @return {?}
         */
        NgbModalStack.prototype._attachWindowComponent = /**
         * @param {?} containerEl
         * @param {?} contentRef
         * @return {?}
         */
            function (containerEl, contentRef) {
                /** @type {?} */
                var windowFactory = this._componentFactoryResolver.resolveComponentFactory(NgbModalWindow);
                /** @type {?} */
                var windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
                this._applicationRef.attachView(windowCmptRef.hostView);
                containerEl.appendChild(windowCmptRef.location.nativeElement);
                return windowCmptRef;
            };
        /**
         * @param {?} windowInstance
         * @param {?} options
         * @return {?}
         */
        NgbModalStack.prototype._applyWindowOptions = /**
         * @param {?} windowInstance
         * @param {?} options
         * @return {?}
         */
            function (windowInstance, options) {
                this._windowAttributes.forEach(function (optionName) {
                    if (isDefined(options[optionName])) {
                        windowInstance[optionName] = options[optionName];
                    }
                });
            };
        /**
         * @param {?} backdropInstance
         * @param {?} options
         * @return {?}
         */
        NgbModalStack.prototype._applyBackdropOptions = /**
         * @param {?} backdropInstance
         * @param {?} options
         * @return {?}
         */
            function (backdropInstance, options) {
                this._backdropAttributes.forEach(function (optionName) {
                    if (isDefined(options[optionName])) {
                        backdropInstance[optionName] = options[optionName];
                    }
                });
            };
        /**
         * @param {?} moduleCFR
         * @param {?} contentInjector
         * @param {?} content
         * @param {?} context
         * @return {?}
         */
        NgbModalStack.prototype._getContentRef = /**
         * @param {?} moduleCFR
         * @param {?} contentInjector
         * @param {?} content
         * @param {?} context
         * @return {?}
         */
            function (moduleCFR, contentInjector, content, context) {
                if (!content) {
                    return new ContentRef([]);
                }
                else if (content instanceof core.TemplateRef) {
                    return this._createFromTemplateRef(content, context);
                }
                else if (isString(content)) {
                    return this._createFromString(content);
                }
                else {
                    return this._createFromComponent(moduleCFR, contentInjector, content, context);
                }
            };
        /**
         * @param {?} content
         * @param {?} context
         * @return {?}
         */
        NgbModalStack.prototype._createFromTemplateRef = /**
         * @param {?} content
         * @param {?} context
         * @return {?}
         */
            function (content, context) {
                /** @type {?} */
                var viewRef = content.createEmbeddedView(context);
                this._applicationRef.attachView(viewRef);
                return new ContentRef([viewRef.rootNodes], viewRef);
            };
        /**
         * @param {?} content
         * @return {?}
         */
        NgbModalStack.prototype._createFromString = /**
         * @param {?} content
         * @return {?}
         */
            function (content) {
                /** @type {?} */
                var component = this._document.createTextNode("" + content);
                return new ContentRef([[component]]);
            };
        /**
         * @param {?} moduleCFR
         * @param {?} contentInjector
         * @param {?} content
         * @param {?} context
         * @return {?}
         */
        NgbModalStack.prototype._createFromComponent = /**
         * @param {?} moduleCFR
         * @param {?} contentInjector
         * @param {?} content
         * @param {?} context
         * @return {?}
         */
            function (moduleCFR, contentInjector, content, context) {
                /** @type {?} */
                var contentCmptFactory = moduleCFR.resolveComponentFactory(content);
                /** @type {?} */
                var modalContentInjector = core.Injector.create([{ provide: NgbActiveModal, useValue: context }], contentInjector);
                /** @type {?} */
                var componentRef = contentCmptFactory.create(modalContentInjector);
                this._applicationRef.attachView(componentRef.hostView);
                return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
            };
        NgbModalStack.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgbModalStack.ctorParameters = function () {
            return [
                { type: core.ApplicationRef },
                { type: core.Injector },
                { type: core.ComponentFactoryResolver },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
            ];
        };
        return NgbModalStack;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
     * the "open" method!
     */
    var NgbModal = (function () {
        function NgbModal(_moduleCFR, _injector, _modalStack) {
            this._moduleCFR = _moduleCFR;
            this._injector = _injector;
            this._modalStack = _modalStack;
        }
        /**
         * Opens a new modal window with the specified content and using supplied options. Content can be provided
         * as a TemplateRef or a component type. If you pass a component type as content than instances of those
         * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
         * NgbActiveModal class to close / dismiss modals from "inside" of a component.
         */
        /**
         * Opens a new modal window with the specified content and using supplied options. Content can be provided
         * as a TemplateRef or a component type. If you pass a component type as content than instances of those
         * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
         * NgbActiveModal class to close / dismiss modals from "inside" of a component.
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NgbModal.prototype.open = /**
         * Opens a new modal window with the specified content and using supplied options. Content can be provided
         * as a TemplateRef or a component type. If you pass a component type as content than instances of those
         * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
         * NgbActiveModal class to close / dismiss modals from "inside" of a component.
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
            function (content, options) {
                if (options === void 0) {
                    options = {};
                }
                return this._modalStack.open(this._moduleCFR, this._injector, content, options);
            };
        NgbModal.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgbModal.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.Injector },
                { type: NgbModalStack }
            ];
        };
        return NgbModal;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbModalModule = (function () {
        function NgbModalModule() {
        }
        /**
         * @return {?}
         */
        NgbModalModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbModalModule, providers: [NgbModal, NgbModalStack] }; };
        NgbModalModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgbModalBackdrop, NgbModalWindow],
                        entryComponents: [NgbModalBackdrop, NgbModalWindow],
                        providers: [NgbModal]
                    },] },
        ];
        return NgbModalModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbPagination component.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the paginations used in the application.
     */
    var NgbPaginationConfig = (function () {
        function NgbPaginationConfig() {
            this.disabled = false;
            this.boundaryLinks = false;
            this.directionLinks = true;
            this.ellipses = true;
            this.maxSize = 0;
            this.pageSize = 10;
            this.rotate = false;
        }
        NgbPaginationConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbPaginationConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
     */
    var NgbPagination = (function () {
        function NgbPagination(config) {
            this.pageCount = 0;
            this.pages = [];
            /**
             *  Current page. Page numbers start with 1
             */
            this.page = 1;
            /**
             *  An event fired when the page is changed.
             *  Event's payload equals to the newly selected page.
             *  Will fire only if collection size is set and all values are valid.
             *  Page numbers start with 1
             */
            this.pageChange = new core.EventEmitter(true);
            this.disabled = config.disabled;
            this.boundaryLinks = config.boundaryLinks;
            this.directionLinks = config.directionLinks;
            this.ellipses = config.ellipses;
            this.maxSize = config.maxSize;
            this.pageSize = config.pageSize;
            this.rotate = config.rotate;
            this.size = config.size;
        }
        /**
         * @return {?}
         */
        NgbPagination.prototype.hasPrevious = /**
         * @return {?}
         */
            function () { return this.page > 1; };
        /**
         * @return {?}
         */
        NgbPagination.prototype.hasNext = /**
         * @return {?}
         */
            function () { return this.page < this.pageCount; };
        /**
         * @param {?} pageNumber
         * @return {?}
         */
        NgbPagination.prototype.selectPage = /**
         * @param {?} pageNumber
         * @return {?}
         */
            function (pageNumber) { this._updatePages(pageNumber); };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbPagination.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) { this._updatePages(this.page); };
        /**
         * @param {?} pageNumber
         * @return {?}
         */
        NgbPagination.prototype.isEllipsis = /**
         * @param {?} pageNumber
         * @return {?}
         */
            function (pageNumber) { return pageNumber === -1; };
        /**
         * Appends ellipses and first/last page number to the displayed pages
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        NgbPagination.prototype._applyEllipses = /**
         * Appends ellipses and first/last page number to the displayed pages
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
            function (start, end) {
                if (this.ellipses) {
                    if (start > 0) {
                        if (start > 1) {
                            this.pages.unshift(-1);
                        }
                        this.pages.unshift(1);
                    }
                    if (end < this.pageCount) {
                        if (end < (this.pageCount - 1)) {
                            this.pages.push(-1);
                        }
                        this.pages.push(this.pageCount);
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
         * @return {?}
         */
        NgbPagination.prototype._applyRotation = /**
         * Rotates page numbers based on maxSize items visible.
         * Currently selected page stays in the middle:
         *
         * Ex. for selected page = 6:
         * [5,*6*,7] for maxSize = 3
         * [4,5,*6*,7] for maxSize = 4
         * @return {?}
         */
            function () {
                /** @type {?} */
                var start = 0;
                /** @type {?} */
                var end = this.pageCount;
                /** @type {?} */
                var leftOffset = Math.floor(this.maxSize / 2);
                /** @type {?} */
                var rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
                if (this.page <= leftOffset) {
                    // very beginning, no rotation -> [0..maxSize]
                    end = this.maxSize;
                }
                else if (this.pageCount - this.page < leftOffset) {
                    // very end, no rotation -> [len-maxSize..len]
                    start = this.pageCount - this.maxSize;
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
         * @return {?}
         */
        NgbPagination.prototype._applyPagination = /**
         * Paginates page numbers based on maxSize items per page
         * @return {?}
         */
            function () {
                /** @type {?} */
                var page = Math.ceil(this.page / this.maxSize) - 1;
                /** @type {?} */
                var start = page * this.maxSize;
                /** @type {?} */
                var end = start + this.maxSize;
                return [start, end];
            };
        /**
         * @param {?} newPageNo
         * @return {?}
         */
        NgbPagination.prototype._setPageInRange = /**
         * @param {?} newPageNo
         * @return {?}
         */
            function (newPageNo) {
                /** @type {?} */
                var prevPageNo = this.page;
                this.page = getValueInRange(newPageNo, this.pageCount, 1);
                if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
                    this.pageChange.emit(this.page);
                }
            };
        /**
         * @param {?} newPage
         * @return {?}
         */
        NgbPagination.prototype._updatePages = /**
         * @param {?} newPage
         * @return {?}
         */
            function (newPage) {
                this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
                if (!isNumber(this.pageCount)) {
                    this.pageCount = 0;
                }
                // fill-in model needed to render pages
                this.pages.length = 0;
                for (var i = 1; i <= this.pageCount; i++) {
                    this.pages.push(i);
                }
                // set page within 1..max range
                this._setPageInRange(newPage);
                // apply maxSize if necessary
                if (this.maxSize > 0 && this.pageCount > this.maxSize) {
                    /** @type {?} */
                    var start = 0;
                    /** @type {?} */
                    var end = this.pageCount;
                    // either paginating or rotating page numbers
                    if (this.rotate) {
                        _a = __read(this._applyRotation(), 2), start = _a[0], end = _a[1];
                    }
                    else {
                        _b = __read(this._applyPagination(), 2), start = _b[0], end = _b[1];
                    }
                    this.pages = this.pages.slice(start, end);
                    // adding ellipses
                    this._applyEllipses(start, end);
                }
                var _a, _b;
            };
        NgbPagination.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-pagination',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: { 'role': 'navigation' },
                        template: "\n    <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\"\n        [class.disabled]=\"!hasPrevious() || disabled\">\n        <a aria-label=\"First\" i18n-aria-label=\"@@ngb.pagination.first-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(1)\" [attr.tabindex]=\"(hasPrevious() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.first\">&laquo;&laquo;</span>\n        </a>\n      </li>\n\n      <li *ngIf=\"directionLinks\" class=\"page-item\"\n        [class.disabled]=\"!hasPrevious() || disabled\">\n        <a aria-label=\"Previous\" i18n-aria-label=\"@@ngb.pagination.previous-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(page-1)\" [attr.tabindex]=\"(hasPrevious() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.previous\">&laquo;</span>\n        </a>\n      </li>\n      <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\"\n        [class.disabled]=\"isEllipsis(pageNumber) || disabled\">\n        <a *ngIf=\"isEllipsis(pageNumber)\" class=\"page-link\">...</a>\n        <a *ngIf=\"!isEllipsis(pageNumber)\" class=\"page-link\" href (click)=\"!!selectPage(pageNumber)\">\n          {{pageNumber}}\n          <span *ngIf=\"pageNumber === page\" class=\"sr-only\">(current)</span>\n        </a>\n      </li>\n      <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasNext() || disabled\">\n        <a aria-label=\"Next\" i18n-aria-label=\"@@ngb.pagination.next-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(page+1)\" [attr.tabindex]=\"(hasNext() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.next\">&raquo;</span>\n        </a>\n      </li>\n\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasNext() || disabled\">\n        <a aria-label=\"Last\" i18n-aria-label=\"@@ngb.pagination.last-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(pageCount)\" [attr.tabindex]=\"(hasNext() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.last\">&raquo;&raquo;</span>\n        </a>\n      </li>\n    </ul>\n  "
                    },] },
        ];
        /** @nocollapse */
        NgbPagination.ctorParameters = function () {
            return [
                { type: NgbPaginationConfig }
            ];
        };
        NgbPagination.propDecorators = {
            disabled: [{ type: core.Input }],
            boundaryLinks: [{ type: core.Input }],
            directionLinks: [{ type: core.Input }],
            ellipses: [{ type: core.Input }],
            rotate: [{ type: core.Input }],
            collectionSize: [{ type: core.Input }],
            maxSize: [{ type: core.Input }],
            page: [{ type: core.Input }],
            pageSize: [{ type: core.Input }],
            pageChange: [{ type: core.Output }],
            size: [{ type: core.Input }]
        };
        return NgbPagination;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbPaginationModule = (function () {
        function NgbPaginationModule() {
        }
        /**
         * @return {?}
         */
        NgbPaginationModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbPaginationModule, providers: [NgbPaginationConfig] }; };
        NgbPaginationModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbPagination], exports: [NgbPagination], imports: [common.CommonModule] },] },
        ];
        return NgbPaginationModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Trigger = (function () {
        function Trigger(open, close) {
            this.open = open;
            this.close = close;
            if (!close) {
                this.close = open;
            }
        }
        /**
         * @return {?}
         */
        Trigger.prototype.isManual = /**
         * @return {?}
         */
            function () { return this.open === 'manual' || this.close === 'manual'; };
        return Trigger;
    }());
    /** @type {?} */
    var DEFAULT_ALIASES = {
        'hover': ['mouseenter', 'mouseleave']
    };
    /**
     * @param {?} triggers
     * @param {?=} aliases
     * @return {?}
     */
    function parseTriggers(triggers, aliases) {
        if (aliases === void 0) {
            aliases = DEFAULT_ALIASES;
        }
        /** @type {?} */
        var trimmedTriggers = (triggers || '').trim();
        if (trimmedTriggers.length === 0) {
            return [];
        }
        /** @type {?} */
        var parsedTriggers = trimmedTriggers.split(/\s+/).map(function (trigger) { return trigger.split(':'); }).map(function (triggerPair) {
            /** @type {?} */
            var alias = aliases[triggerPair[0]] || triggerPair;
            return new Trigger(alias[0], alias[1]);
        });
        /** @type {?} */
        var manualTriggers = parsedTriggers.filter(function (triggerPair) { return triggerPair.isManual(); });
        if (manualTriggers.length > 1) {
            throw 'Triggers parse error: only one manual trigger is allowed';
        }
        if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
            throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
        }
        return parsedTriggers;
    }
    /** @type {?} */
    var noopFn = function () { };
    /**
     * @param {?} renderer
     * @param {?} nativeElement
     * @param {?} triggers
     * @param {?} openFn
     * @param {?} closeFn
     * @param {?} toggleFn
     * @return {?}
     */
    function listenToTriggers(renderer, nativeElement, triggers, openFn, closeFn, toggleFn) {
        /** @type {?} */
        var parsedTriggers = parseTriggers(triggers);
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbPopover directive.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the popovers used in the application.
     */
    var NgbPopoverConfig = (function () {
        function NgbPopoverConfig() {
            this.placement = 'top';
            this.triggers = 'click';
            this.disablePopover = false;
        }
        NgbPopoverConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbPopoverConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextId$3 = 0;
    var NgbPopoverWindow = (function () {
        function NgbPopoverWindow(_element, _renderer) {
            this._element = _element;
            this._renderer = _renderer;
            this.placement = 'top';
        }
        /**
         * @param {?} _placement
         * @return {?}
         */
        NgbPopoverWindow.prototype.applyPlacement = /**
         * @param {?} _placement
         * @return {?}
         */
            function (_placement) {
                // remove the current placement classes
                this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
                this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
                // set the new placement classes
                this.placement = _placement;
                // apply the new placement
                this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
                this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
            };
        NgbPopoverWindow.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-popover-window',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class]': '"popover bs-popover-" + placement.split("-")[0]+" bs-popover-" + placement + (popoverClass ? " " + popoverClass : "")',
                            'role': 'tooltip',
                            '[id]': 'id'
                        },
                        template: "\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-header\">{{title}}</h3><div class=\"popover-body\"><ng-content></ng-content></div>",
                        styles: ["\n    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {\n      left: 50%;\n      margin-left: -5px;\n    }\n\n    :host.bs-popover-top-left .arrow, :host.bs-popover-bottom-left .arrow {\n      left: 2em;\n    }\n\n    :host.bs-popover-top-right .arrow, :host.bs-popover-bottom-right .arrow {\n      left: auto;\n      right: 2em;\n    }\n\n    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {\n      top: 50%;\n      margin-top: -5px;\n    }\n\n    :host.bs-popover-left-top .arrow, :host.bs-popover-right-top .arrow {\n      top: 0.7em;\n    }\n\n    :host.bs-popover-left-bottom .arrow, :host.bs-popover-right-bottom .arrow {\n      top: auto;\n      bottom: 0.7em;\n    }\n  "]
                    },] },
        ];
        /** @nocollapse */
        NgbPopoverWindow.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        NgbPopoverWindow.propDecorators = {
            placement: [{ type: core.Input }],
            title: [{ type: core.Input }],
            id: [{ type: core.Input }],
            popoverClass: [{ type: core.Input }]
        };
        return NgbPopoverWindow;
    }());
    /**
     * A lightweight, extensible directive for fancy popover creation.
     */
    var NgbPopover = (function () {
        function NgbPopover(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, ngZone) {
            var _this = this;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            /**
             * Emits an event when the popover is shown
             */
            this.shown = new core.EventEmitter();
            /**
             * Emits an event when the popover is hidden
             */
            this.hidden = new core.EventEmitter();
            this._ngbPopoverWindowId = "ngb-popover-" + nextId$3++;
            this.placement = config.placement;
            this.triggers = config.triggers;
            this.container = config.container;
            this.disablePopover = config.disablePopover;
            this.popoverClass = config.popoverClass;
            this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
            this._zoneSubscription = ngZone.onStable.subscribe(function () {
                if (_this._windowRef) {
                    _this._windowRef.instance.applyPlacement(positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body'));
                }
            });
        }
        /**
         * @return {?}
         */
        NgbPopover.prototype._isDisabled = /**
         * @return {?}
         */
            function () {
                if (this.disablePopover) {
                    return true;
                }
                if (!this.ngbPopover && !this.popoverTitle) {
                    return true;
                }
                return false;
            };
        /**
         * Opens an element’s popover. This is considered a “manual” triggering of the popover.
         * The context is an optional value to be injected into the popover template when it is created.
         */
        /**
         * Opens an element’s popover. This is considered a “manual” triggering of the popover.
         * The context is an optional value to be injected into the popover template when it is created.
         * @param {?=} context
         * @return {?}
         */
        NgbPopover.prototype.open = /**
         * Opens an element’s popover. This is considered a “manual” triggering of the popover.
         * The context is an optional value to be injected into the popover template when it is created.
         * @param {?=} context
         * @return {?}
         */
            function (context) {
                if (!this._windowRef && !this._isDisabled()) {
                    this._windowRef = this._popupService.open(this.ngbPopover, context);
                    this._windowRef.instance.title = this.popoverTitle;
                    this._windowRef.instance.popoverClass = this.popoverClass;
                    this._windowRef.instance.id = this._ngbPopoverWindowId;
                    this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
                    if (this.container === 'body') {
                        window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
                    }
                    // apply styling to set basic css-classes on target element, before going for positioning
                    this._windowRef.changeDetectorRef.detectChanges();
                    this._windowRef.changeDetectorRef.markForCheck();
                    // position popover along the element
                    this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
                    this.shown.emit();
                }
            };
        /**
         * Closes an element’s popover. This is considered a “manual” triggering of the popover.
         */
        /**
         * Closes an element’s popover. This is considered a “manual” triggering of the popover.
         * @return {?}
         */
        NgbPopover.prototype.close = /**
         * Closes an element’s popover. This is considered a “manual” triggering of the popover.
         * @return {?}
         */
            function () {
                if (this._windowRef) {
                    this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
                    this._popupService.close();
                    this._windowRef = null;
                    this.hidden.emit();
                }
            };
        /**
         * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
         */
        /**
         * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
         * @return {?}
         */
        NgbPopover.prototype.toggle = /**
         * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
         * @return {?}
         */
            function () {
                if (this._windowRef) {
                    this.close();
                }
                else {
                    this.open();
                }
            };
        /**
         * Returns whether or not the popover is currently being shown
         */
        /**
         * Returns whether or not the popover is currently being shown
         * @return {?}
         */
        NgbPopover.prototype.isOpen = /**
         * Returns whether or not the popover is currently being shown
         * @return {?}
         */
            function () { return this._windowRef != null; };
        /**
         * @return {?}
         */
        NgbPopover.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbPopover.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                // close popover if title and content become empty, or disablePopover set to true
                if ((changes['ngbPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
                    this.close();
                }
            };
        /**
         * @return {?}
         */
        NgbPopover.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.close();
                this._unregisterListenersFn();
                this._zoneSubscription.unsubscribe();
            };
        NgbPopover.decorators = [
            { type: core.Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] },
        ];
        /** @nocollapse */
        NgbPopover.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.Injector },
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef },
                { type: NgbPopoverConfig },
                { type: core.NgZone }
            ];
        };
        NgbPopover.propDecorators = {
            ngbPopover: [{ type: core.Input }],
            popoverTitle: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            triggers: [{ type: core.Input }],
            container: [{ type: core.Input }],
            disablePopover: [{ type: core.Input }],
            popoverClass: [{ type: core.Input }],
            shown: [{ type: core.Output }],
            hidden: [{ type: core.Output }]
        };
        return NgbPopover;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbPopoverModule = (function () {
        function NgbPopoverModule() {
        }
        /**
         * @return {?}
         */
        NgbPopoverModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbPopoverModule, providers: [NgbPopoverConfig] }; };
        NgbPopoverModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbPopover, NgbPopoverWindow], exports: [NgbPopover], entryComponents: [NgbPopoverWindow] },] },
        ];
        return NgbPopoverModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.showValue = false;
        }
        NgbProgressbarConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbProgressbarConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.showValue = config.showValue;
            this.height = config.height;
        }
        /**
         * @return {?}
         */
        NgbProgressbar.prototype.getValue = /**
         * @return {?}
         */
            function () { return getValueInRange(this.value, this.max); };
        /**
         * @return {?}
         */
        NgbProgressbar.prototype.getPercentValue = /**
         * @return {?}
         */
            function () { return 100 * this.getValue() / this.max; };
        NgbProgressbar.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-progressbar',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <div class=\"progress\" [style.height]=\"height\">\n      <div class=\"progress-bar{{type ? ' bg-' + type : ''}}{{animated ? ' progress-bar-animated' : ''}}{{striped ?\n    ' progress-bar-striped' : ''}}\" role=\"progressbar\" [style.width.%]=\"getPercentValue()\"\n    [attr.aria-valuenow]=\"getValue()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\">\n        <span *ngIf=\"showValue\" i18n=\"@@ngb.progressbar.value\">{{getPercentValue()}}%</span><ng-content></ng-content>\n      </div>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        NgbProgressbar.ctorParameters = function () {
            return [
                { type: NgbProgressbarConfig }
            ];
        };
        NgbProgressbar.propDecorators = {
            max: [{ type: core.Input }],
            animated: [{ type: core.Input }],
            striped: [{ type: core.Input }],
            showValue: [{ type: core.Input }],
            type: [{ type: core.Input }],
            value: [{ type: core.Input }],
            height: [{ type: core.Input }]
        };
        return NgbProgressbar;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbProgressbarModule = (function () {
        function NgbProgressbarModule() {
        }
        /**
         * @return {?}
         */
        NgbProgressbarModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbProgressbarModule, providers: [NgbProgressbarConfig] }; };
        NgbProgressbarModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbProgressbar], exports: [NgbProgressbar], imports: [common.CommonModule] },] },
        ];
        return NgbProgressbarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbRating component.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the ratings used in the application.
     */
    var NgbRatingConfig = (function () {
        function NgbRatingConfig() {
            this.max = 10;
            this.readonly = false;
            this.resettable = false;
        }
        NgbRatingConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbRatingConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_RATING_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgbRating; }),
        multi: true
    };
    /**
     * Rating directive that will take care of visualising a star rating bar.
     */
    var NgbRating = (function () {
        function NgbRating(config, _changeDetectorRef) {
            this._changeDetectorRef = _changeDetectorRef;
            this.contexts = [];
            this.disabled = false;
            /**
             * An event fired when a user is hovering over a given rating.
             * Event's payload equals to the rating being hovered over.
             */
            this.hover = new core.EventEmitter();
            /**
             * An event fired when a user stops hovering over a given rating.
             * Event's payload equals to the rating of the last item being hovered over.
             */
            this.leave = new core.EventEmitter();
            /**
             * An event fired when a user selects a new rating.
             * Event's payload equals to the newly selected rating.
             */
            this.rateChange = new core.EventEmitter(true);
            this.onChange = function (_) { };
            this.onTouched = function () { };
            this.max = config.max;
            this.readonly = config.readonly;
        }
        /**
         * @return {?}
         */
        NgbRating.prototype.ariaValueText = /**
         * @return {?}
         */
            function () { return this.nextRate + " out of " + this.max; };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbRating.prototype.enter = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (!this.readonly && !this.disabled) {
                    this._updateState(value);
                }
                this.hover.emit(value);
            };
        /**
         * @return {?}
         */
        NgbRating.prototype.handleBlur = /**
         * @return {?}
         */
            function () { this.onTouched(); };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbRating.prototype.handleClick = /**
         * @param {?} value
         * @return {?}
         */
            function (value) { this.update(this.resettable && this.rate === value ? 0 : value); };
        /**
         * @param {?} event
         * @return {?}
         */
        NgbRating.prototype.handleKeyDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (Key[toString(event.which)]) {
                    event.preventDefault();
                    switch (event.which) {
                        case Key.ArrowDown:
                        case Key.ArrowLeft:
                            this.update(this.rate - 1);
                            break;
                        case Key.ArrowUp:
                        case Key.ArrowRight:
                            this.update(this.rate + 1);
                            break;
                        case Key.Home:
                            this.update(0);
                            break;
                        case Key.End:
                            this.update(this.max);
                            break;
                    }
                }
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbRating.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes['rate']) {
                    this.update(this.rate);
                }
            };
        /**
         * @return {?}
         */
        NgbRating.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.contexts = Array.from({ length: this.max }, function (v, k) { return ({ fill: 0, index: k }); });
                this._updateState(this.rate);
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbRating.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onChange = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbRating.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onTouched = fn; };
        /**
         * @return {?}
         */
        NgbRating.prototype.reset = /**
         * @return {?}
         */
            function () {
                this.leave.emit(this.nextRate);
                this._updateState(this.rate);
            };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgbRating.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) { this.disabled = isDisabled; };
        /**
         * @param {?} value
         * @param {?=} internalChange
         * @return {?}
         */
        NgbRating.prototype.update = /**
         * @param {?} value
         * @param {?=} internalChange
         * @return {?}
         */
            function (value, internalChange) {
                if (internalChange === void 0) {
                    internalChange = true;
                }
                /** @type {?} */
                var newRate = getValueInRange(value, this.max, 0);
                if (!this.readonly && !this.disabled && this.rate !== newRate) {
                    this.rate = newRate;
                    this.rateChange.emit(this.rate);
                }
                if (internalChange) {
                    this.onChange(this.rate);
                    this.onTouched();
                }
                this._updateState(this.rate);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbRating.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.update(value, false);
                this._changeDetectorRef.markForCheck();
            };
        /**
         * @param {?} index
         * @return {?}
         */
        NgbRating.prototype._getFillValue = /**
         * @param {?} index
         * @return {?}
         */
            function (index) {
                /** @type {?} */
                var diff = this.nextRate - index;
                if (diff >= 1) {
                    return 100;
                }
                if (diff < 1 && diff > 0) {
                    return Number.parseInt((diff * 100).toFixed(2));
                }
                return 0;
            };
        /**
         * @param {?} nextValue
         * @return {?}
         */
        NgbRating.prototype._updateState = /**
         * @param {?} nextValue
         * @return {?}
         */
            function (nextValue) {
                var _this = this;
                this.nextRate = nextValue;
                this.contexts.forEach(function (context, index) { return context.fill = _this._getFillValue(index); });
            };
        NgbRating.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-rating',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'd-inline-flex',
                            'tabindex': '0',
                            'role': 'slider',
                            'aria-valuemin': '0',
                            '[attr.aria-valuemax]': 'max',
                            '[attr.aria-valuenow]': 'nextRate',
                            '[attr.aria-valuetext]': 'ariaValueText()',
                            '[attr.aria-disabled]': 'readonly ? true : null',
                            '(blur)': 'handleBlur()',
                            '(keydown)': 'handleKeyDown($event)',
                            '(mouseleave)': 'reset()'
                        },
                        template: "\n    <ng-template #t let-fill=\"fill\">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>\n    <ng-template ngFor [ngForOf]=\"contexts\" let-index=\"index\">\n      <span class=\"sr-only\">({{ index < nextRate ? '*' : ' ' }})</span>\n      <span (mouseenter)=\"enter(index + 1)\" (click)=\"handleClick(index + 1)\" [style.cursor]=\"readonly || disabled ? 'default' : 'pointer'\">\n        <ng-template [ngTemplateOutlet]=\"starTemplate || t\" [ngTemplateOutletContext]=\"contexts[index]\"></ng-template>\n      </span>\n    </ng-template>\n  ",
                        providers: [NGB_RATING_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        NgbRating.ctorParameters = function () {
            return [
                { type: NgbRatingConfig },
                { type: core.ChangeDetectorRef }
            ];
        };
        NgbRating.propDecorators = {
            max: [{ type: core.Input }],
            rate: [{ type: core.Input }],
            readonly: [{ type: core.Input }],
            resettable: [{ type: core.Input }],
            starTemplate: [{ type: core.Input }, { type: core.ContentChild, args: [core.TemplateRef,] }],
            hover: [{ type: core.Output }],
            leave: [{ type: core.Output }],
            rateChange: [{ type: core.Output }]
        };
        return NgbRating;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbRatingModule = (function () {
        function NgbRatingModule() {
        }
        /**
         * @return {?}
         */
        NgbRatingModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbRatingModule, providers: [NgbRatingConfig] }; };
        NgbRatingModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbRating], exports: [NgbRating], imports: [common.CommonModule] },] },
        ];
        return NgbRatingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbTabset component.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the tabsets used in the application.
     */
    var NgbTabsetConfig = (function () {
        function NgbTabsetConfig() {
            this.justify = 'start';
            this.orientation = 'horizontal';
            this.type = 'tabs';
        }
        NgbTabsetConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbTabsetConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextId$4 = 0;
    /**
     * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
     */
    var NgbTabTitle = (function () {
        function NgbTabTitle(templateRef) {
            this.templateRef = templateRef;
        }
        NgbTabTitle.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[ngbTabTitle]' },] },
        ];
        /** @nocollapse */
        NgbTabTitle.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        return NgbTabTitle;
    }());
    /**
     * This directive must be used to wrap content to be displayed in a tab.
     */
    var NgbTabContent = (function () {
        function NgbTabContent(templateRef) {
            this.templateRef = templateRef;
        }
        NgbTabContent.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[ngbTabContent]' },] },
        ];
        /** @nocollapse */
        NgbTabContent.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        return NgbTabContent;
    }());
    /**
     * A directive representing an individual tab.
     */
    var NgbTab = (function () {
        function NgbTab() {
            /**
             * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
             */
            this.id = "ngb-tab-" + nextId$4++;
            /**
             * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
             */
            this.disabled = false;
        }
        /**
         * @return {?}
         */
        NgbTab.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
            function () {
                // We are using @ContentChildren instead of @ContantChild as in the Angular version being used
                // only @ContentChildren allows us to specify the {descendants: false} option.
                // Without {descendants: false} we are hitting bugs described in:
                // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
                this.titleTpl = this.titleTpls.first;
                this.contentTpl = this.contentTpls.first;
            };
        NgbTab.decorators = [
            { type: core.Directive, args: [{ selector: 'ngb-tab' },] },
        ];
        NgbTab.propDecorators = {
            id: [{ type: core.Input }],
            title: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            titleTpls: [{ type: core.ContentChildren, args: [NgbTabTitle, { descendants: false },] }],
            contentTpls: [{ type: core.ContentChildren, args: [NgbTabContent, { descendants: false },] }]
        };
        return NgbTab;
    }());
    /**
     * A component that makes it easy to create tabbed interface.
     */
    var NgbTabset = (function () {
        function NgbTabset(config) {
            /**
             * Whether the closed tabs should be hidden without destroying them
             */
            this.destroyOnHide = true;
            /**
             * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
             */
            this.tabChange = new core.EventEmitter();
            this.type = config.type;
            this.justify = config.justify;
            this.orientation = config.orientation;
        }
        Object.defineProperty(NgbTabset.prototype, "justify", {
            /**
             * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill' or
             * 'justified'
             * The default value is 'start'.
             */
            set: /**
             * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill' or
             * 'justified'
             * The default value is 'start'.
             * @param {?} className
             * @return {?}
             */ function (className) {
                if (className === 'fill' || className === 'justified') {
                    this.justifyClass = "nav-" + className;
                }
                else {
                    this.justifyClass = "justify-content-" + className;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Selects the tab with the given id and shows its associated pane.
         * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
         */
        /**
         * Selects the tab with the given id and shows its associated pane.
         * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
         * @param {?} tabId
         * @return {?}
         */
        NgbTabset.prototype.select = /**
         * Selects the tab with the given id and shows its associated pane.
         * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
         * @param {?} tabId
         * @return {?}
         */
            function (tabId) {
                /** @type {?} */
                var selectedTab = this._getTabById(tabId);
                if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
                    /** @type {?} */
                    var defaultPrevented_1 = false;
                    this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: function () { defaultPrevented_1 = true; } });
                    if (!defaultPrevented_1) {
                        this.activeId = selectedTab.id;
                    }
                }
            };
        /**
         * @return {?}
         */
        NgbTabset.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var activeTab = this._getTabById(this.activeId);
                this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        NgbTabset.prototype._getTabById = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var tabsWithId = this.tabs.filter(function (tab) { return tab.id === id; });
                return tabsWithId.length ? tabsWithId[0] : null;
            };
        NgbTabset.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-tabset',
                        exportAs: 'ngbTabset',
                        template: "\n    <ul [class]=\"'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\"\n          href (click)=\"!!select(tab.id)\" role=\"tab\" [attr.tabindex]=\"(tab.disabled ? '-1': undefined)\"\n          [attr.aria-controls]=\"(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)\"\n          [attr.aria-expanded]=\"tab.id === activeId\" [attr.aria-disabled]=\"tab.disabled\">\n          {{tab.title}}<ng-template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></ng-template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n        <div\n          class=\"tab-pane {{tab.id === activeId ? 'active' : null}}\"\n          *ngIf=\"!destroyOnHide || tab.id === activeId\"\n          role=\"tabpanel\"\n          [attr.aria-labelledby]=\"tab.id\" id=\"{{tab.id}}-panel\"\n          [attr.aria-expanded]=\"tab.id === activeId\">\n          <ng-template [ngTemplateOutlet]=\"tab.contentTpl?.templateRef\"></ng-template>\n        </div>\n      </ng-template>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        NgbTabset.ctorParameters = function () {
            return [
                { type: NgbTabsetConfig }
            ];
        };
        NgbTabset.propDecorators = {
            tabs: [{ type: core.ContentChildren, args: [NgbTab,] }],
            activeId: [{ type: core.Input }],
            destroyOnHide: [{ type: core.Input }],
            justify: [{ type: core.Input }],
            orientation: [{ type: core.Input }],
            type: [{ type: core.Input }],
            tabChange: [{ type: core.Output }]
        };
        return NgbTabset;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle];
    var NgbTabsetModule = (function () {
        function NgbTabsetModule() {
        }
        /**
         * @return {?}
         */
        NgbTabsetModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbTabsetModule, providers: [NgbTabsetConfig] }; };
        NgbTabsetModule.decorators = [
            { type: core.NgModule, args: [{ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [common.CommonModule] },] },
        ];
        return NgbTabsetModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbTime = (function () {
        function NgbTime(hour, minute, second) {
            this.hour = toInteger(hour);
            this.minute = toInteger(minute);
            this.second = toInteger(second);
        }
        /**
         * @param {?=} step
         * @return {?}
         */
        NgbTime.prototype.changeHour = /**
         * @param {?=} step
         * @return {?}
         */
            function (step) {
                if (step === void 0) {
                    step = 1;
                }
                this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
            };
        /**
         * @param {?} hour
         * @return {?}
         */
        NgbTime.prototype.updateHour = /**
         * @param {?} hour
         * @return {?}
         */
            function (hour) {
                if (isNumber(hour)) {
                    this.hour = (hour < 0 ? 24 + hour : hour) % 24;
                }
                else {
                    this.hour = NaN;
                }
            };
        /**
         * @param {?=} step
         * @return {?}
         */
        NgbTime.prototype.changeMinute = /**
         * @param {?=} step
         * @return {?}
         */
            function (step) {
                if (step === void 0) {
                    step = 1;
                }
                this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
            };
        /**
         * @param {?} minute
         * @return {?}
         */
        NgbTime.prototype.updateMinute = /**
         * @param {?} minute
         * @return {?}
         */
            function (minute) {
                if (isNumber(minute)) {
                    this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
                    this.changeHour(Math.floor(minute / 60));
                }
                else {
                    this.minute = NaN;
                }
            };
        /**
         * @param {?=} step
         * @return {?}
         */
        NgbTime.prototype.changeSecond = /**
         * @param {?=} step
         * @return {?}
         */
            function (step) {
                if (step === void 0) {
                    step = 1;
                }
                this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
            };
        /**
         * @param {?} second
         * @return {?}
         */
        NgbTime.prototype.updateSecond = /**
         * @param {?} second
         * @return {?}
         */
            function (second) {
                if (isNumber(second)) {
                    this.second = second < 0 ? 60 + second % 60 : second % 60;
                    this.changeMinute(Math.floor(second / 60));
                }
                else {
                    this.second = NaN;
                }
            };
        /**
         * @param {?=} checkSecs
         * @return {?}
         */
        NgbTime.prototype.isValid = /**
         * @param {?=} checkSecs
         * @return {?}
         */
            function (checkSecs) {
                if (checkSecs === void 0) {
                    checkSecs = true;
                }
                return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
            };
        /**
         * @return {?}
         */
        NgbTime.prototype.toString = /**
         * @return {?}
         */
            function () { return (this.hour || 0) + ":" + (this.minute || 0) + ":" + (this.second || 0); };
        return NgbTime;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.size = 'medium';
        }
        NgbTimepickerConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbTimepickerConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract type serving as a DI token for the service converting from your application Time model to internal
     * NgbTimeStruct model.
     * A default implementation converting from and to NgbTimeStruct is provided for retro-compatibility,
     * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
     *
     * \@since 2.2.0
     * @abstract
     * @template T
     */
    var NgbTimeAdapter = (function () {
        function NgbTimeAdapter() {
        }
        NgbTimeAdapter.decorators = [
            { type: core.Injectable },
        ];
        return NgbTimeAdapter;
    }());
    var NgbTimeStructAdapter = (function (_super) {
        __extends(NgbTimeStructAdapter, _super);
        function NgbTimeStructAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         */
        /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         * @param {?} time
         * @return {?}
         */
        NgbTimeStructAdapter.prototype.fromModel = /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         * @param {?} time
         * @return {?}
         */
            function (time) {
                return (time && isInteger(time.hour) && isInteger(time.minute)) ?
                    { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
                    null;
            };
        /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         */
        /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         * @param {?} time
         * @return {?}
         */
        NgbTimeStructAdapter.prototype.toModel = /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         * @param {?} time
         * @return {?}
         */
            function (time) {
                return (time && isInteger(time.hour) && isInteger(time.minute)) ?
                    { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
                    null;
            };
        NgbTimeStructAdapter.decorators = [
            { type: core.Injectable },
        ];
        return NgbTimeStructAdapter;
    }(NgbTimeAdapter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_TIMEPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgbTimepicker; }),
        multi: true
    };
    /**
     * A lightweight & configurable timepicker directive.
     */
    var NgbTimepicker = (function () {
        function NgbTimepicker(config, _ngbTimeAdapter) {
            this._ngbTimeAdapter = _ngbTimeAdapter;
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
            this.size = config.size;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        NgbTimepicker.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                /** @type {?} */
                var structValue = this._ngbTimeAdapter.fromModel(value);
                this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
                if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
                    this.model.second = 0;
                }
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbTimepicker.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onChange = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbTimepicker.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this.onTouched = fn; };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgbTimepicker.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) { this.disabled = isDisabled; };
        /**
         * @param {?} step
         * @return {?}
         */
        NgbTimepicker.prototype.changeHour = /**
         * @param {?} step
         * @return {?}
         */
            function (step) {
                this.model.changeHour(step);
                this.propagateModelChange();
            };
        /**
         * @param {?} step
         * @return {?}
         */
        NgbTimepicker.prototype.changeMinute = /**
         * @param {?} step
         * @return {?}
         */
            function (step) {
                this.model.changeMinute(step);
                this.propagateModelChange();
            };
        /**
         * @param {?} step
         * @return {?}
         */
        NgbTimepicker.prototype.changeSecond = /**
         * @param {?} step
         * @return {?}
         */
            function (step) {
                this.model.changeSecond(step);
                this.propagateModelChange();
            };
        /**
         * @param {?} newVal
         * @return {?}
         */
        NgbTimepicker.prototype.updateHour = /**
         * @param {?} newVal
         * @return {?}
         */
            function (newVal) {
                /** @type {?} */
                var isPM = this.model.hour >= 12;
                /** @type {?} */
                var enteredHour = toInteger(newVal);
                if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
                    this.model.updateHour(enteredHour + 12);
                }
                else {
                    this.model.updateHour(enteredHour);
                }
                this.propagateModelChange();
            };
        /**
         * @param {?} newVal
         * @return {?}
         */
        NgbTimepicker.prototype.updateMinute = /**
         * @param {?} newVal
         * @return {?}
         */
            function (newVal) {
                this.model.updateMinute(toInteger(newVal));
                this.propagateModelChange();
            };
        /**
         * @param {?} newVal
         * @return {?}
         */
        NgbTimepicker.prototype.updateSecond = /**
         * @param {?} newVal
         * @return {?}
         */
            function (newVal) {
                this.model.updateSecond(toInteger(newVal));
                this.propagateModelChange();
            };
        /**
         * @return {?}
         */
        NgbTimepicker.prototype.toggleMeridian = /**
         * @return {?}
         */
            function () {
                if (this.meridian) {
                    this.changeHour(12);
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbTimepicker.prototype.formatHour = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (isNumber(value)) {
                    if (this.meridian) {
                        return padNumber(value % 12 === 0 ? 12 : value % 12);
                    }
                    else {
                        return padNumber(value % 24);
                    }
                }
                else {
                    return padNumber(NaN);
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbTimepicker.prototype.formatMinSec = /**
         * @param {?} value
         * @return {?}
         */
            function (value) { return padNumber(value); };
        /**
         * @return {?}
         */
        NgbTimepicker.prototype.setFormControlSize = /**
         * @return {?}
         */
            function () { return { 'form-control-sm': this.size === 'small', 'form-control-lg': this.size === 'large' }; };
        /**
         * @return {?}
         */
        NgbTimepicker.prototype.setButtonSize = /**
         * @return {?}
         */
            function () { return { 'btn-sm': this.size === 'small', 'btn-lg': this.size === 'large' }; };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbTimepicker.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
                    this.model.second = 0;
                    this.propagateModelChange(false);
                }
            };
        /**
         * @param {?=} touched
         * @return {?}
         */
        NgbTimepicker.prototype.propagateModelChange = /**
         * @param {?=} touched
         * @return {?}
         */
            function (touched) {
                if (touched === void 0) {
                    touched = true;
                }
                if (touched) {
                    this.onTouched();
                }
                if (this.model.isValid(this.seconds)) {
                    this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
                }
                else {
                    this.onChange(this._ngbTimeAdapter.toModel(null));
                }
            };
        NgbTimepicker.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-timepicker',
                        styles: ["\n\n    :host {\n      font-size: 1rem;\n    }\n\n    .ngb-tp {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n    }\n\n    .ngb-tp-input-container {\n      width: 4em;\n    }\n\n    .ngb-tp-hour, .ngb-tp-minute, .ngb-tp-second, .ngb-tp-meridian {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: distribute;\n      justify-content: space-around;\n    }\n\n    .ngb-tp-spacer {\n      width: 1em;\n      text-align: center;\n    }\n\n    .chevron::before {\n      border-style: solid;\n      border-width: 0.29em 0.29em 0 0;\n      content: '';\n      display: inline-block;\n      height: 0.69em;\n      left: 0.05em;\n      position: relative;\n      top: 0.15em;\n      transform: rotate(-45deg);\n      -webkit-transform: rotate(-45deg);\n      -ms-transform: rotate(-45deg);\n      vertical-align: middle;\n      width: 0.71em;\n    }\n\n    .chevron.bottom:before {\n      top: -.3em;\n      -webkit-transform: rotate(135deg);\n      -ms-transform: rotate(135deg);\n      transform: rotate(135deg);\n    }\n\n    input {\n      text-align: center;\n    }\n  "],
                        template: "\n    <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <div class=\"ngb-tp\">\n        <div class=\"ngb-tp-input-container ngb-tp-hour\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeHour(hourStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-hours\">Increment hours</span>\n          </button>\n          <input type=\"text\" class=\"form-control\" [ngClass]=\"setFormControlSize()\" maxlength=\"2\"\n            placeholder=\"HH\" i18n-placeholder=\"@@ngb.timepicker.HH\"\n            [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Hours\" i18n-aria-label=\"@@ngb.timepicker.hours\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeHour(-hourStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-hours\">Decrement hours</span>\n          </button>\n        </div>\n        <div class=\"ngb-tp-spacer\">:</div>\n        <div class=\"ngb-tp-input-container ngb-tp-minute\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeMinute(minuteStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-minutes\">Increment minutes</span>\n          </button>\n          <input type=\"text\" class=\"form-control\" [ngClass]=\"setFormControlSize()\" maxlength=\"2\"\n            placeholder=\"MM\" i18n-placeholder=\"@@ngb.timepicker.MM\"\n            [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Minutes\" i18n-aria-label=\"@@ngb.timepicker.minutes\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeMinute(-minuteStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron bottom\"></span>\n            <span class=\"sr-only\"  i18n=\"@@ngb.timepicker.decrement-minutes\">Decrement minutes</span>\n          </button>\n        </div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-spacer\">:</div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-input-container ngb-tp-second\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeSecond(secondStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-seconds\">Increment seconds</span>\n          </button>\n          <input type=\"text\" class=\"form-control\" [ngClass]=\"setFormControlSize()\" maxlength=\"2\"\n            placeholder=\"SS\" i18n-placeholder=\"@@ngb.timepicker.SS\"\n            [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Seconds\" i18n-aria-label=\"@@ngb.timepicker.seconds\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeSecond(-secondStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-seconds\">Decrement seconds</span>\n          </button>\n        </div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-spacer\"></div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-meridian\">\n          <button type=\"button\" class=\"btn btn-outline-primary\" [ngClass]=\"setButtonSize()\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\"\n                  (click)=\"toggleMeridian()\">\n            <ng-container *ngIf=\"model?.hour >= 12; else am\" i18n=\"@@ngb.timepicker.PM\">PM</ng-container>\n            <ng-template #am i18n=\"@@ngb.timepicker.AM\">AM</ng-template>\n          </button>\n        </div>\n      </div>\n    </fieldset>\n  ",
                        providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        NgbTimepicker.ctorParameters = function () {
            return [
                { type: NgbTimepickerConfig },
                { type: NgbTimeAdapter }
            ];
        };
        NgbTimepicker.propDecorators = {
            meridian: [{ type: core.Input }],
            spinners: [{ type: core.Input }],
            seconds: [{ type: core.Input }],
            hourStep: [{ type: core.Input }],
            minuteStep: [{ type: core.Input }],
            secondStep: [{ type: core.Input }],
            readonlyInputs: [{ type: core.Input }],
            size: [{ type: core.Input }]
        };
        return NgbTimepicker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbTimepickerModule = (function () {
        function NgbTimepickerModule() {
        }
        /**
         * @return {?}
         */
        NgbTimepickerModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgbTimepickerModule,
                    providers: [NgbTimepickerConfig, { provide: NgbTimeAdapter, useClass: NgbTimeStructAdapter }]
                };
            };
        NgbTimepickerModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbTimepicker], exports: [NgbTimepicker], imports: [common.CommonModule] },] },
        ];
        return NgbTimepickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbTooltip directive.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the tooltips used in the application.
     */
    var NgbTooltipConfig = (function () {
        function NgbTooltipConfig() {
            this.placement = 'top';
            this.triggers = 'hover';
            this.disableTooltip = false;
        }
        NgbTooltipConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbTooltipConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextId$5 = 0;
    var NgbTooltipWindow = (function () {
        function NgbTooltipWindow(_element, _renderer) {
            this._element = _element;
            this._renderer = _renderer;
            this.placement = 'top';
        }
        /**
         * @param {?} _placement
         * @return {?}
         */
        NgbTooltipWindow.prototype.applyPlacement = /**
         * @param {?} _placement
         * @return {?}
         */
            function (_placement) {
                // remove the current placement classes
                this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
                this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
                // set the new placement classes
                this.placement = _placement;
                // apply the new placement
                this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
                this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
            };
        NgbTooltipWindow.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-tooltip-window',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class]': '"tooltip show bs-tooltip-" + placement.split("-")[0]+" bs-tooltip-" + placement',
                            'role': 'tooltip',
                            '[id]': 'id'
                        },
                        template: "<div class=\"arrow\"></div><div class=\"tooltip-inner\"><ng-content></ng-content></div>",
                        styles: ["\n    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {\n      left: calc(50% - 0.4rem);\n    }\n\n    :host.bs-tooltip-top-left .arrow, :host.bs-tooltip-bottom-left .arrow {\n      left: 1em;\n    }\n\n    :host.bs-tooltip-top-right .arrow, :host.bs-tooltip-bottom-right .arrow {\n      left: auto;\n      right: 0.8rem;\n    }\n\n    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {\n      top: calc(50% - 0.4rem);\n    }\n\n    :host.bs-tooltip-left-top .arrow, :host.bs-tooltip-right-top .arrow {\n      top: 0.4rem;\n    }\n\n    :host.bs-tooltip-left-bottom .arrow, :host.bs-tooltip-right-bottom .arrow {\n      top: auto;\n      bottom: 0.4rem;\n    }\n  "]
                    },] },
        ];
        /** @nocollapse */
        NgbTooltipWindow.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        NgbTooltipWindow.propDecorators = {
            placement: [{ type: core.Input }],
            id: [{ type: core.Input }]
        };
        return NgbTooltipWindow;
    }());
    /**
     * A lightweight, extensible directive for fancy tooltip creation.
     */
    var NgbTooltip = (function () {
        function NgbTooltip(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, ngZone) {
            var _this = this;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            /**
             * Emits an event when the tooltip is shown
             */
            this.shown = new core.EventEmitter();
            /**
             * Emits an event when the tooltip is hidden
             */
            this.hidden = new core.EventEmitter();
            this._ngbTooltipWindowId = "ngb-tooltip-" + nextId$5++;
            this.placement = config.placement;
            this.triggers = config.triggers;
            this.container = config.container;
            this.disableTooltip = config.disableTooltip;
            this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
            this._zoneSubscription = ngZone.onStable.subscribe(function () {
                if (_this._windowRef) {
                    _this._windowRef.instance.applyPlacement(positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body'));
                }
            });
        }
        Object.defineProperty(NgbTooltip.prototype, "ngbTooltip", {
            get: /**
             * @return {?}
             */ function () { return this._ngbTooltip; },
            /**
             * Content to be displayed as tooltip. If falsy, the tooltip won't open.
             */
            set: /**
             * Content to be displayed as tooltip. If falsy, the tooltip won't open.
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._ngbTooltip = value;
                if (!value && this._windowRef) {
                    this.close();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         * The context is an optional value to be injected into the tooltip template when it is created.
         */
        /**
         * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         * The context is an optional value to be injected into the tooltip template when it is created.
         * @param {?=} context
         * @return {?}
         */
        NgbTooltip.prototype.open = /**
         * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         * The context is an optional value to be injected into the tooltip template when it is created.
         * @param {?=} context
         * @return {?}
         */
            function (context) {
                if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
                    this._windowRef = this._popupService.open(this._ngbTooltip, context);
                    this._windowRef.instance.id = this._ngbTooltipWindowId;
                    this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
                    if (this.container === 'body') {
                        window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
                    }
                    this._windowRef.instance.placement = Array.isArray(this.placement) ? this.placement[0] : this.placement;
                    // apply styling to set basic css-classes on target element, before going for positioning
                    this._windowRef.changeDetectorRef.detectChanges();
                    this._windowRef.changeDetectorRef.markForCheck();
                    // position tooltip along the element
                    this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
                    this.shown.emit();
                }
            };
        /**
         * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         */
        /**
         * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         * @return {?}
         */
        NgbTooltip.prototype.close = /**
         * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         * @return {?}
         */
            function () {
                if (this._windowRef != null) {
                    this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
                    this._popupService.close();
                    this._windowRef = null;
                    this.hidden.emit();
                }
            };
        /**
         * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         */
        /**
         * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         * @return {?}
         */
        NgbTooltip.prototype.toggle = /**
         * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
         * @return {?}
         */
            function () {
                if (this._windowRef) {
                    this.close();
                }
                else {
                    this.open();
                }
            };
        /**
         * Returns whether or not the tooltip is currently being shown
         */
        /**
         * Returns whether or not the tooltip is currently being shown
         * @return {?}
         */
        NgbTooltip.prototype.isOpen = /**
         * Returns whether or not the tooltip is currently being shown
         * @return {?}
         */
            function () { return this._windowRef != null; };
        /**
         * @return {?}
         */
        NgbTooltip.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
            };
        /**
         * @return {?}
         */
        NgbTooltip.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.close();
                // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
                // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
                if (this._unregisterListenersFn) {
                    this._unregisterListenersFn();
                }
                this._zoneSubscription.unsubscribe();
            };
        NgbTooltip.decorators = [
            { type: core.Directive, args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' },] },
        ];
        /** @nocollapse */
        NgbTooltip.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.Injector },
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef },
                { type: NgbTooltipConfig },
                { type: core.NgZone }
            ];
        };
        NgbTooltip.propDecorators = {
            placement: [{ type: core.Input }],
            triggers: [{ type: core.Input }],
            container: [{ type: core.Input }],
            disableTooltip: [{ type: core.Input }],
            shown: [{ type: core.Output }],
            hidden: [{ type: core.Output }],
            ngbTooltip: [{ type: core.Input }]
        };
        return NgbTooltip;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbTooltipModule = (function () {
        function NgbTooltipModule() {
        }
        /**
         * @return {?}
         */
        NgbTooltipModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbTooltipModule, providers: [NgbTooltipConfig] }; };
        NgbTooltipModule.decorators = [
            { type: core.NgModule, args: [{ declarations: [NgbTooltip, NgbTooltipWindow], exports: [NgbTooltip], entryComponents: [NgbTooltipWindow] },] },
        ];
        return NgbTooltipModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbHighlight = (function () {
        function NgbHighlight() {
            this.highlightClass = 'ngb-highlight';
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NgbHighlight.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                /** @type {?} */
                var resultStr = toString(this.result);
                /** @type {?} */
                var resultLC = resultStr.toLowerCase();
                /** @type {?} */
                var termLC = toString(this.term).toLowerCase();
                /** @type {?} */
                var currentIdx = 0;
                if (termLC.length > 0) {
                    this.parts = resultLC.split(new RegExp("(" + regExpEscape(termLC) + ")")).map(function (part) {
                        /** @type {?} */
                        var originalPart = resultStr.substr(currentIdx, part.length);
                        currentIdx += part.length;
                        return originalPart;
                    });
                }
                else {
                    this.parts = [resultStr];
                }
            };
        NgbHighlight.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-highlight',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "<ng-template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\">" +
                            "<span *ngIf=\"isOdd\" class=\"{{highlightClass}}\">{{part}}</span><ng-template [ngIf]=\"!isOdd\">{{part}}</ng-template>" +
                            "</ng-template>",
                        // template needs to be formatted in a certain way so we don't add empty text nodes
                        styles: ["\n    .ngb-highlight {\n      font-weight: bold;\n    }\n  "]
                    },] },
        ];
        NgbHighlight.propDecorators = {
            highlightClass: [{ type: core.Input }],
            result: [{ type: core.Input }],
            term: [{ type: core.Input }]
        };
        return NgbHighlight;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbTypeaheadWindow = (function () {
        function NgbTypeaheadWindow() {
            this.activeIdx = 0;
            /**
             * Flag indicating if the first row should be active initially
             */
            this.focusFirst = true;
            /**
             * A function used to format a given result before display. This function should return a formatted string without any
             * HTML markup
             */
            this.formatter = toString;
            /**
             * Event raised when user selects a particular result row
             */
            this.selectEvent = new core.EventEmitter();
            this.activeChangeEvent = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.hasActive = /**
         * @return {?}
         */
            function () { return this.activeIdx > -1 && this.activeIdx < this.results.length; };
        /**
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.getActive = /**
         * @return {?}
         */
            function () { return this.results[this.activeIdx]; };
        /**
         * @param {?} activeIdx
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.markActive = /**
         * @param {?} activeIdx
         * @return {?}
         */
            function (activeIdx) {
                this.activeIdx = activeIdx;
                this._activeChanged();
            };
        /**
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.next = /**
         * @return {?}
         */
            function () {
                if (this.activeIdx === this.results.length - 1) {
                    this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
                }
                else {
                    this.activeIdx++;
                }
                this._activeChanged();
            };
        /**
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.prev = /**
         * @return {?}
         */
            function () {
                if (this.activeIdx < 0) {
                    this.activeIdx = this.results.length - 1;
                }
                else if (this.activeIdx === 0) {
                    this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
                }
                else {
                    this.activeIdx--;
                }
                this._activeChanged();
            };
        /**
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.resetActive = /**
         * @return {?}
         */
            function () {
                this.activeIdx = this.focusFirst ? 0 : -1;
                this._activeChanged();
            };
        /**
         * @param {?} item
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.select = /**
         * @param {?} item
         * @return {?}
         */
            function (item) { this.selectEvent.emit(item); };
        /**
         * @return {?}
         */
        NgbTypeaheadWindow.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { this.resetActive(); };
        /**
         * @return {?}
         */
        NgbTypeaheadWindow.prototype._activeChanged = /**
         * @return {?}
         */
            function () {
                this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
            };
        NgbTypeaheadWindow.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngb-typeahead-window',
                        exportAs: 'ngbTypeaheadWindow',
                        host: { 'class': 'dropdown-menu show', 'role': 'listbox', '[id]': 'id' },
                        template: "\n    <ng-template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </ng-template>\n    <ng-template ngFor [ngForOf]=\"results\" let-result let-idx=\"index\">\n      <button type=\"button\" class=\"dropdown-item\" role=\"option\"\n        [id]=\"id + '-' + idx\"\n        [class.active]=\"idx === activeIdx\"\n        (mouseenter)=\"markActive(idx)\"\n        (click)=\"select(result)\">\n          <ng-template [ngTemplateOutlet]=\"resultTemplate || rt\"\n          [ngTemplateOutletContext]=\"{result: result, term: term, formatter: formatter}\"></ng-template>\n      </button>\n    </ng-template>\n  "
                    },] },
        ];
        NgbTypeaheadWindow.propDecorators = {
            id: [{ type: core.Input }],
            focusFirst: [{ type: core.Input }],
            results: [{ type: core.Input }],
            term: [{ type: core.Input }],
            formatter: [{ type: core.Input }],
            resultTemplate: [{ type: core.Input }],
            selectEvent: [{ type: core.Output, args: ['select',] }],
            activeChangeEvent: [{ type: core.Output, args: ['activeChange',] }]
        };
        return NgbTypeaheadWindow;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ARIA_LIVE_DELAY = new core.InjectionToken('live announcer delay');
    /** @type {?} */
    var DEFAULT_ARIA_LIVE_DELAY = 100;
    /**
     * @param {?} document
     * @param {?=} lazyCreate
     * @return {?}
     */
    function getLiveElement(document, lazyCreate) {
        if (lazyCreate === void 0) {
            lazyCreate = false;
        }
        /** @type {?} */
        var element = (document.body.querySelector('#ngb-live'));
        if (element == null && lazyCreate) {
            element = document.createElement('div');
            element.setAttribute('id', 'ngb-live');
            element.setAttribute('aria-live', 'polite');
            element.setAttribute('aria-atomic', 'true');
            element.classList.add('sr-only');
            document.body.appendChild(element);
        }
        return element;
    }
    var Live = (function () {
        function Live(_document, _delay) {
            this._document = _document;
            this._delay = _delay;
        }
        /**
         * @return {?}
         */
        Live.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var element = getLiveElement(this._document);
                if (element) {
                    element.parentElement.removeChild(element);
                }
            };
        /**
         * @param {?} message
         * @return {?}
         */
        Live.prototype.say = /**
         * @param {?} message
         * @return {?}
         */
            function (message) {
                /** @type {?} */
                var element = getLiveElement(this._document, true);
                /** @type {?} */
                var delay = this._delay;
                element.textContent = '';
                /** @type {?} */
                var setText = function () { return element.textContent = message; };
                if (delay === null) {
                    setText();
                }
                else {
                    setTimeout(setText, delay);
                }
            };
        Live.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Live.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
                { type: undefined, decorators: [{ type: core.Inject, args: [ARIA_LIVE_DELAY,] }] }
            ];
        };
        return Live;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Configuration service for the NgbTypeahead component.
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the typeaheads used in the application.
     */
    var NgbTypeaheadConfig = (function () {
        function NgbTypeaheadConfig() {
            this.editable = true;
            this.focusFirst = true;
            this.showHint = false;
            this.placement = 'bottom-left';
        }
        NgbTypeaheadConfig.decorators = [
            { type: core.Injectable },
        ];
        return NgbTypeaheadConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_TYPEAHEAD_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NgbTypeahead; }),
        multi: true
    };
    /** @type {?} */
    var nextWindowId = 0;
    /**
     * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
     */
    var NgbTypeahead = (function () {
        function NgbTypeahead(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone, _live) {
            var _this = this;
            this._elementRef = _elementRef;
            this._viewContainerRef = _viewContainerRef;
            this._renderer = _renderer;
            this._injector = _injector;
            this._live = _live;
            /**
             * Value for the configurable autocomplete attribute.
             * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
             * to be always correctly taken into account.
             *
             * \@since 2.1.0
             */
            this.autocomplete = 'off';
            /**
             * Placement of a typeahead accepts:
             *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
             *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
             * and array of above values.
             */
            this.placement = 'bottom-left';
            /**
             * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
             */
            this.selectItem = new core.EventEmitter();
            this.popupId = "ngb-typeahead-" + nextWindowId++;
            this._onTouched = function () { };
            this._onChange = function (_) { };
            this.container = config.container;
            this.editable = config.editable;
            this.focusFirst = config.focusFirst;
            this.showHint = config.showHint;
            this.placement = config.placement;
            this._valueChanges = rxjs.fromEvent(_elementRef.nativeElement, 'input')
                .pipe(operators.map(function ($event) { return (($event.target)).value; }));
            this._resubscribeTypeahead = new rxjs.BehaviorSubject(null);
            this._popupService = new PopupService(NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
            this._zoneSubscription = ngZone.onStable.subscribe(function () {
                if (_this.isPopupOpen()) {
                    positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body');
                }
            });
        }
        /**
         * @return {?}
         */
        NgbTypeahead.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var inputValues$ = this._valueChanges.pipe(operators.tap(function (value) {
                    _this._inputValueBackup = value;
                    if (_this.editable) {
                        _this._onChange(value);
                    }
                }));
                /** @type {?} */
                var results$ = inputValues$.pipe(this.ngbTypeahead);
                /** @type {?} */
                var processedResults$ = results$.pipe(operators.tap(function () {
                    if (!_this.editable) {
                        _this._onChange(undefined);
                    }
                }));
                /** @type {?} */
                var userInput$ = this._resubscribeTypeahead.pipe(operators.switchMap(function () { return processedResults$; }));
                this._subscription = this._subscribeToUserInput(userInput$);
            };
        /**
         * @return {?}
         */
        NgbTypeahead.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this._closePopup();
                this._unsubscribeFromUserInput();
                this._zoneSubscription.unsubscribe();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbTypeahead.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this._onChange = fn; };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgbTypeahead.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) { this._onTouched = fn; };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbTypeahead.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) { this._writeInputValue(this._formatItemForInput(value)); };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgbTypeahead.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgbTypeahead.prototype.onDocumentClick = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event.target !== this._elementRef.nativeElement) {
                    this.dismissPopup();
                }
            };
        /**
         * Dismisses typeahead popup window
         */
        /**
         * Dismisses typeahead popup window
         * @return {?}
         */
        NgbTypeahead.prototype.dismissPopup = /**
         * Dismisses typeahead popup window
         * @return {?}
         */
            function () {
                if (this.isPopupOpen()) {
                    this._closePopup();
                    this._writeInputValue(this._inputValueBackup);
                }
            };
        /**
         * Returns true if the typeahead popup window is displayed
         */
        /**
         * Returns true if the typeahead popup window is displayed
         * @return {?}
         */
        NgbTypeahead.prototype.isPopupOpen = /**
         * Returns true if the typeahead popup window is displayed
         * @return {?}
         */
            function () { return this._windowRef != null; };
        /**
         * @return {?}
         */
        NgbTypeahead.prototype.handleBlur = /**
         * @return {?}
         */
            function () {
                this._resubscribeTypeahead.next(null);
                this._onTouched();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgbTypeahead.prototype.handleKeyDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (!this.isPopupOpen()) {
                    return;
                }
                if (Key[toString(event.which)]) {
                    switch (event.which) {
                        case Key.ArrowDown:
                            event.preventDefault();
                            this._windowRef.instance.next();
                            this._showHint();
                            break;
                        case Key.ArrowUp:
                            event.preventDefault();
                            this._windowRef.instance.prev();
                            this._showHint();
                            break;
                        case Key.Enter:
                        case Key.Tab:
                            /** @type {?} */
                            var result = this._windowRef.instance.getActive();
                            if (isDefined(result)) {
                                event.preventDefault();
                                event.stopPropagation();
                                this._selectResult(result);
                            }
                            this._closePopup();
                            break;
                        case Key.Escape:
                            event.preventDefault();
                            this._resubscribeTypeahead.next(null);
                            this.dismissPopup();
                            break;
                    }
                }
            };
        /**
         * @return {?}
         */
        NgbTypeahead.prototype._openPopup = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.isPopupOpen()) {
                    this._inputValueBackup = this._elementRef.nativeElement.value;
                    this._windowRef = this._popupService.open();
                    this._windowRef.instance.id = this.popupId;
                    this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResultClosePopup(result); });
                    this._windowRef.instance.activeChangeEvent.subscribe(function (activeId) { return _this.activeDescendant = activeId; });
                    if (this.container === 'body') {
                        window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
                    }
                }
            };
        /**
         * @return {?}
         */
        NgbTypeahead.prototype._closePopup = /**
         * @return {?}
         */
            function () {
                this._popupService.close();
                this._windowRef = null;
                this.activeDescendant = undefined;
            };
        /**
         * @param {?} result
         * @return {?}
         */
        NgbTypeahead.prototype._selectResult = /**
         * @param {?} result
         * @return {?}
         */
            function (result) {
                /** @type {?} */
                var defaultPrevented = false;
                this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
                this._resubscribeTypeahead.next(null);
                if (!defaultPrevented) {
                    this.writeValue(result);
                    this._onChange(result);
                }
            };
        /**
         * @param {?} result
         * @return {?}
         */
        NgbTypeahead.prototype._selectResultClosePopup = /**
         * @param {?} result
         * @return {?}
         */
            function (result) {
                this._selectResult(result);
                this._closePopup();
            };
        /**
         * @return {?}
         */
        NgbTypeahead.prototype._showHint = /**
         * @return {?}
         */
            function () {
                if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
                    /** @type {?} */
                    var userInputLowerCase = this._inputValueBackup.toLowerCase();
                    /** @type {?} */
                    var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
                    if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                        this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                        this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
                    }
                    else {
                        this.writeValue(this._windowRef.instance.getActive());
                    }
                }
            };
        /**
         * @param {?} item
         * @return {?}
         */
        NgbTypeahead.prototype._formatItemForInput = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgbTypeahead.prototype._writeInputValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
            };
        /**
         * @param {?} userInput$
         * @return {?}
         */
        NgbTypeahead.prototype._subscribeToUserInput = /**
         * @param {?} userInput$
         * @return {?}
         */
            function (userInput$) {
                var _this = this;
                return userInput$.subscribe(function (results) {
                    if (!results || results.length === 0) {
                        _this._closePopup();
                    }
                    else {
                        _this._openPopup();
                        _this._windowRef.instance.focusFirst = _this.focusFirst;
                        _this._windowRef.instance.results = results;
                        _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
                        if (_this.resultFormatter) {
                            _this._windowRef.instance.formatter = _this.resultFormatter;
                        }
                        if (_this.resultTemplate) {
                            _this._windowRef.instance.resultTemplate = _this.resultTemplate;
                        }
                        _this._windowRef.instance.resetActive();
                        // The observable stream we are subscribing to might have async steps
                        // and if a component containing typeahead is using the OnPush strategy
                        // the change detection turn wouldn't be invoked automatically.
                        // The observable stream we are subscribing to might have async steps
                        // and if a component containing typeahead is using the OnPush strategy
                        // the change detection turn wouldn't be invoked automatically.
                        _this._windowRef.changeDetectorRef.detectChanges();
                        _this._showHint();
                    }
                    /** @type {?} */
                    var count = results.length;
                    _this._live.say(count === 0 ? 'No results available' : count + " result" + (count === 1 ? '' : 's') + " available");
                });
            };
        /**
         * @return {?}
         */
        NgbTypeahead.prototype._unsubscribeFromUserInput = /**
         * @return {?}
         */
            function () {
                if (this._subscription) {
                    this._subscription.unsubscribe();
                }
                this._subscription = null;
            };
        NgbTypeahead.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[ngbTypeahead]',
                        exportAs: 'ngbTypeahead',
                        host: {
                            '(blur)': 'handleBlur()',
                            '[class.open]': 'isPopupOpen()',
                            '(document:click)': 'onDocumentClick($event)',
                            '(keydown)': 'handleKeyDown($event)',
                            '[autocomplete]': 'autocomplete',
                            'autocapitalize': 'off',
                            'autocorrect': 'off',
                            'role': 'combobox',
                            'aria-multiline': 'false',
                            '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                            '[attr.aria-activedescendant]': 'activeDescendant',
                            '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                            '[attr.aria-expanded]': 'isPopupOpen()'
                        },
                        providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        NgbTypeahead.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.ViewContainerRef },
                { type: core.Renderer2 },
                { type: core.Injector },
                { type: core.ComponentFactoryResolver },
                { type: NgbTypeaheadConfig },
                { type: core.NgZone },
                { type: Live }
            ];
        };
        NgbTypeahead.propDecorators = {
            autocomplete: [{ type: core.Input }],
            container: [{ type: core.Input }],
            editable: [{ type: core.Input }],
            focusFirst: [{ type: core.Input }],
            inputFormatter: [{ type: core.Input }],
            ngbTypeahead: [{ type: core.Input }],
            resultFormatter: [{ type: core.Input }],
            resultTemplate: [{ type: core.Input }],
            showHint: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            selectItem: [{ type: core.Output }]
        };
        return NgbTypeahead;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgbTypeaheadModule = (function () {
        function NgbTypeaheadModule() {
        }
        /**
         * @return {?}
         */
        NgbTypeaheadModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgbTypeaheadModule,
                    providers: [Live, NgbTypeaheadConfig, { provide: ARIA_LIVE_DELAY, useValue: DEFAULT_ARIA_LIVE_DELAY }]
                };
            };
        NgbTypeaheadModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                        exports: [NgbTypeahead, NgbHighlight],
                        imports: [common.CommonModule],
                        entryComponents: [NgbTypeaheadWindow]
                    },] },
        ];
        return NgbTypeaheadModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NGB_MODULES = [
        NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
        NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbRatingModule,
        NgbTabsetModule, NgbTimepickerModule, NgbTooltipModule, NgbTypeaheadModule
    ];
    var NgbRootModule = (function () {
        function NgbRootModule() {
        }
        NgbRootModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            NgbAlertModule.forRoot(), NgbButtonsModule.forRoot(), NgbCollapseModule.forRoot(), NgbProgressbarModule.forRoot(),
                            NgbTooltipModule.forRoot(), NgbTypeaheadModule.forRoot(), NgbAccordionModule.forRoot(), NgbCarouselModule.forRoot(),
                            NgbDatepickerModule.forRoot(), NgbDropdownModule.forRoot(), NgbModalModule.forRoot(), NgbPaginationModule.forRoot(),
                            NgbPopoverModule.forRoot(), NgbProgressbarModule.forRoot(), NgbRatingModule.forRoot(), NgbTabsetModule.forRoot(),
                            NgbTimepickerModule.forRoot(), NgbTooltipModule.forRoot()
                        ],
                        exports: NGB_MODULES
                    },] },
        ];
        return NgbRootModule;
    }());
    var NgbModule = (function () {
        function NgbModule() {
        }
        /**
         * @return {?}
         */
        NgbModule.forRoot = /**
         * @return {?}
         */
            function () { return { ngModule: NgbRootModule }; };
        NgbModule.decorators = [
            { type: core.NgModule, args: [{ imports: NGB_MODULES, exports: NGB_MODULES },] },
        ];
        return NgbModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgbAccordionModule = NgbAccordionModule;
    exports.NgbAccordionConfig = NgbAccordionConfig;
    exports.NgbAccordion = NgbAccordion;
    exports.NgbPanel = NgbPanel;
    exports.NgbPanelTitle = NgbPanelTitle;
    exports.NgbPanelContent = NgbPanelContent;
    exports.NgbAlertModule = NgbAlertModule;
    exports.NgbAlertConfig = NgbAlertConfig;
    exports.NgbAlert = NgbAlert;
    exports.NgbButtonsModule = NgbButtonsModule;
    exports.NgbCheckBox = NgbCheckBox;
    exports.NgbRadioGroup = NgbRadioGroup;
    exports.NgbCarouselModule = NgbCarouselModule;
    exports.NgbCarouselConfig = NgbCarouselConfig;
    exports.NgbCarousel = NgbCarousel;
    exports.NgbSlide = NgbSlide;
    exports.NgbCollapseModule = NgbCollapseModule;
    exports.NgbCollapse = NgbCollapse;
    exports.NgbCalendar = NgbCalendar;
    exports.NgbCalendarIslamicCivil = NgbCalendarIslamicCivil;
    exports.NgbCalendarIslamicUmalqura = NgbCalendarIslamicUmalqura;
    exports.NgbDatepickerModule = NgbDatepickerModule;
    exports.NgbDatepickerI18n = NgbDatepickerI18n;
    exports.NgbDatepickerConfig = NgbDatepickerConfig;
    exports.NgbDateParserFormatter = NgbDateParserFormatter;
    exports.NgbDateAdapter = NgbDateAdapter;
    exports.NgbDateNativeAdapter = NgbDateNativeAdapter;
    exports.NgbDatepicker = NgbDatepicker;
    exports.NgbInputDatepicker = NgbInputDatepicker;
    exports.NgbDatepickerToggle = NgbDatepickerToggle;
    exports.NgbDropdownModule = NgbDropdownModule;
    exports.NgbDropdownConfig = NgbDropdownConfig;
    exports.NgbDropdown = NgbDropdown;
    exports.NgbModalModule = NgbModalModule;
    exports.NgbModal = NgbModal;
    exports.NgbActiveModal = NgbActiveModal;
    exports.NgbModalRef = NgbModalRef;
    exports.ModalDismissReasons = ModalDismissReasons;
    exports.NgbPaginationModule = NgbPaginationModule;
    exports.NgbPaginationConfig = NgbPaginationConfig;
    exports.NgbPagination = NgbPagination;
    exports.NgbPopoverModule = NgbPopoverModule;
    exports.NgbPopoverConfig = NgbPopoverConfig;
    exports.NgbPopover = NgbPopover;
    exports.NgbProgressbarModule = NgbProgressbarModule;
    exports.NgbProgressbarConfig = NgbProgressbarConfig;
    exports.NgbProgressbar = NgbProgressbar;
    exports.NgbRatingModule = NgbRatingModule;
    exports.NgbRatingConfig = NgbRatingConfig;
    exports.NgbRating = NgbRating;
    exports.NgbTabsetModule = NgbTabsetModule;
    exports.NgbTabsetConfig = NgbTabsetConfig;
    exports.NgbTabset = NgbTabset;
    exports.NgbTab = NgbTab;
    exports.NgbTabContent = NgbTabContent;
    exports.NgbTabTitle = NgbTabTitle;
    exports.NgbTimepickerModule = NgbTimepickerModule;
    exports.NgbTimepickerConfig = NgbTimepickerConfig;
    exports.NgbTimepicker = NgbTimepicker;
    exports.NgbTimeAdapter = NgbTimeAdapter;
    exports.NgbTooltipModule = NgbTooltipModule;
    exports.NgbTooltipConfig = NgbTooltipConfig;
    exports.NgbTooltip = NgbTooltip;
    exports.NgbHighlight = NgbHighlight;
    exports.NgbTypeaheadModule = NgbTypeaheadModule;
    exports.NgbTypeaheadConfig = NgbTypeaheadConfig;
    exports.NgbTypeahead = NgbTypeahead;
    exports.NgbRootModule = NgbRootModule;
    exports.NgbModule = NgbModule;
    exports.ɵa = NgbButtonLabel;
    exports.ɵb = NgbRadio;
    exports.ɵc = NGB_CAROUSEL_DIRECTIVES;
    exports.ɵj = NgbDateStructAdapter;
    exports.ɵf = NgbDatepickerDayView;
    exports.ɵi = NgbDatepickerI18nDefault;
    exports.ɵw = NgbDatepickerKeyMapService;
    exports.ɵe = NgbDatepickerMonthView;
    exports.ɵg = NgbDatepickerNavigation;
    exports.ɵh = NgbDatepickerNavigationSelect;
    exports.ɵv = NgbDatepickerService;
    exports.ɵba = NgbCalendarHijri;
    exports.ɵd = NgbCalendarGregorian;
    exports.ɵk = NgbDateISOParserFormatter;
    exports.ɵm = NgbDropdownAnchor;
    exports.ɵl = NgbDropdownMenu;
    exports.ɵn = NgbDropdownToggle;
    exports.ɵx = NgbModalBackdrop;
    exports.ɵz = NgbModalStack;
    exports.ɵy = NgbModalWindow;
    exports.ɵo = NgbPopoverWindow;
    exports.ɵp = NgbTimeStructAdapter;
    exports.ɵq = NgbTooltipWindow;
    exports.ɵr = NgbTypeaheadWindow;
    exports.ɵs = ARIA_LIVE_DELAY;
    exports.ɵt = DEFAULT_ARIA_LIVE_DELAY;
    exports.ɵu = Live;
    exports.ɵbb = ContentRef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYm9vdHN0cmFwLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC91dGlsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hY2NvcmRpb24vYWNjb3JkaW9uLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWNjb3JkaW9uL2FjY29yZGlvbi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWNjb3JkaW9uL2FjY29yZGlvbi5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2FsZXJ0L2FsZXJ0LWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWxlcnQvYWxlcnQudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2FsZXJ0L2FsZXJ0Lm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYnV0dG9ucy9sYWJlbC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYnV0dG9ucy9jaGVja2JveC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYnV0dG9ucy9yYWRpby50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYnV0dG9ucy9idXR0b25zLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvY2Fyb3VzZWwvY2Fyb3VzZWwtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jb2xsYXBzZS9jb2xsYXBzZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvY29sbGFwc2UvY29sbGFwc2UubW9kdWxlLnRzIixudWxsLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWNhbGVuZGFyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItdG9vbHMudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1pMThuLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9rZXkudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLXZpZXctbW9kZWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgtdmlldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24udHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9wb3NpdGlvbmluZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9mb2N1cy10cmFwLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItaW5wdXQudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci10b2dnbGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1kYXktdmlldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2hpanJpL25nYi1jYWxlbmRhci1oaWpyaS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy11bWFscXVyYS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1uYXRpdmUtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZHJvcGRvd24vZHJvcGRvd24tY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kcm9wZG93bi9kcm9wZG93bi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC1iYWNrZHJvcC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtZGlzbWlzcy1yZWFzb25zLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC13aW5kb3cudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3V0aWwvcG9wdXAudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLXJlZi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtc3RhY2sudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC90cmlnZ2Vycy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wb3BvdmVyL3BvcG92ZXIubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3JhdGluZy9yYXRpbmctY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9yYXRpbmcvcmF0aW5nLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9yYXRpbmcvcmF0aW5nLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGFic2V0L3RhYnNldC1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RhYnNldC90YWJzZXQudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RhYnNldC90YWJzZXQubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL25nYi10aW1lLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL3RpbWVwaWNrZXItY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL25nYi10aW1lLWFkYXB0ZXIudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RpbWVwaWNrZXIvdGltZXBpY2tlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90b29sdGlwL3Rvb2x0aXAubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLXdpbmRvdy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3R5cGVhaGVhZC90eXBlYWhlYWQtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZTogYW55KTogbnVtYmVyIHtcbiAgcmV0dXJuIHBhcnNlSW50KGAke3ZhbHVlfWAsIDEwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICByZXR1cm4gKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpID8gYCR7dmFsdWV9YCA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVJblJhbmdlKHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyLCBtaW4gPSAwKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCBtYXgpLCBtaW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IGFueSk6IHZhbHVlIGlzIHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IGFueSk6IHZhbHVlIGlzIG51bWJlciB7XG4gIHJldHVybiAhaXNOYU4odG9JbnRlZ2VyKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IGFueSk6IHZhbHVlIGlzIG51bWJlciB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZE51bWJlcih2YWx1ZTogbnVtYmVyKSB7XG4gIGlmIChpc051bWJlcih2YWx1ZSkpIHtcbiAgICByZXR1cm4gYDAke3ZhbHVlfWAuc2xpY2UoLTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnRXhwRXNjYXBlKHRleHQpIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiQWNjb3JkaW9uIGNvbXBvbmVudC5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBhY2NvcmRpb25zIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQ29uZmlnIHtcbiAgY2xvc2VPdGhlcnMgPSBmYWxzZTtcbiAgdHlwZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5pbXBvcnQge05nYkFjY29yZGlvbkNvbmZpZ30gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgc2hvdWxkIGJlIHVzZWQgdG8gd3JhcCBhY2NvcmRpb24gcGFuZWwgdGl0bGVzIHRoYXQgbmVlZCB0byBjb250YWluIEhUTUwgbWFya3VwIG9yIG90aGVyIGRpcmVjdGl2ZXMuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbFRpdGxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIG11c3QgYmUgdXNlZCB0byB3cmFwIGFjY29yZGlvbiBwYW5lbCBjb250ZW50LlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsQ29udGVudF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbENvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogVGhlIE5nYlBhbmVsIGRpcmVjdGl2ZSByZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgcGFuZWwgd2l0aCB0aGUgdGl0bGUgYW5kIGNvbGxhcHNpYmxlXG4gKiBjb250ZW50XG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdiLXBhbmVsJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgLyoqXG4gICAqICBBIGZsYWcgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgcGFuZWwgaXMgZGlzYWJsZWQgb3Igbm90LlxuICAgKiAgV2hlbiBkaXNhYmxlZCwgdGhlIHBhbmVsIGNhbm5vdCBiZSB0b2dnbGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIEFuIG9wdGlvbmFsIGlkIGZvciB0aGUgcGFuZWwuIFRoZSBpZCBzaG91bGQgYmUgdW5pcXVlLlxuICAgKiAgSWYgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXBhbmVsLSR7bmV4dElkKyt9YDtcblxuICAvKipcbiAgICogQSBmbGFnIHRlbGxpbmcgaWYgdGhlIHBhbmVsIGlzIGN1cnJlbnRseSBvcGVuXG4gICAqL1xuICBpc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogIFRoZSB0aXRsZSBmb3IgdGhlIHBhbmVsLlxuICAgKi9cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAvKipcbiAgICogIEFjY29yZGlvbidzIHR5cGVzIG9mIHBhbmVscyB0byBiZSBhcHBsaWVkIHBlciBwYW5lbCBiYXNpcy5cbiAgICogIEJvb3RzdHJhcCByZWNvZ25pemVzIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFwicHJpbWFyeVwiLCBcInNlY29uZGFyeVwiLCBcInN1Y2Nlc3NcIiwgXCJkYW5nZXJcIiwgXCJ3YXJuaW5nXCIsIFwiaW5mb1wiLCBcImxpZ2h0XCJcbiAgICogYW5kIFwiZGFya1wiXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgdGl0bGVUcGw6IE5nYlBhbmVsVGl0bGUgfCBudWxsO1xuICBjb250ZW50VHBsOiBOZ2JQYW5lbENvbnRlbnQgfCBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxUaXRsZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIHRpdGxlVHBsczogUXVlcnlMaXN0PE5nYlBhbmVsVGl0bGU+O1xuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsQ29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxDb250ZW50PjtcblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGFudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRvZ2dsaW5nIGFuIGFjY29yZGlvbiBwYW5lbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhbmVsQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogSWQgb2YgdGhlIGFjY29yZGlvbiBwYW5lbCB0aGF0IGlzIHRvZ2dsZWRcbiAgICovXG4gIHBhbmVsSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgcGFuZWwgd2lsbCBiZSBvcGVuZWQgKHRydWUpIG9yIGNsb3NlZCAoZmFsc2UpXG4gICAqL1xuICBuZXh0U3RhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IHBhbmVsIHRvZ2dsaW5nIGlmIGNhbGxlZFxuICAgKi9cbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogVGhlIE5nYkFjY29yZGlvbiBkaXJlY3RpdmUgaXMgYSBjb2xsZWN0aW9uIG9mIHBhbmVscy5cbiAqIEl0IGNhbiBhc3N1cmUgdGhhdCBvbmx5IG9uZSBwYW5lbCBjYW4gYmUgb3BlbmVkIGF0IGEgdGltZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWFjY29yZGlvbicsXG4gIGV4cG9ydEFzOiAnbmdiQWNjb3JkaW9uJyxcbiAgaG9zdDogeydjbGFzcyc6ICdhY2NvcmRpb24nLCAncm9sZSc6ICd0YWJsaXN0JywgJ1thdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlXSc6ICchY2xvc2VPdGhlclBhbmVscyd9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcGFuZWwgW25nRm9yT2ZdPVwicGFuZWxzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8ZGl2IHJvbGU9XCJ0YWJcIiBpZD1cInt7cGFuZWwuaWR9fS1oZWFkZXJcIiBbY2xhc3NdPVwiJ2NhcmQtaGVhZGVyICcgKyAocGFuZWwudHlwZSA/ICdiZy0nK3BhbmVsLnR5cGU6IHR5cGUgPyAnYmctJyt0eXBlIDogJycpXCI+XG4gICAgICAgICAgPGg1IGNsYXNzPVwibWItMFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGlua1wiIChjbGljayk9XCIhIXRvZ2dsZShwYW5lbC5pZClcIiBbZGlzYWJsZWRdPVwicGFuZWwuZGlzYWJsZWRcIiBbY2xhc3MuY29sbGFwc2VkXT1cInBhbmVsLmlzT3BlblwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwicGFuZWwuaXNPcGVuXCIgW2F0dHIuYXJpYS1jb250cm9sc109XCJwYW5lbC5pZFwiPlxuICAgICAgICAgICAgICB7e3BhbmVsLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvaDU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwie3twYW5lbC5pZH19XCIgcm9sZT1cInRhYnBhbmVsXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cInBhbmVsLmlkICsgJy1oZWFkZXInXCJcbiAgICAgICAgICAgICBjbGFzcz1cImNhcmQtYm9keSBjb2xsYXBzZVwiIFtjbGFzcy5zaG93XT1cInBhbmVsLmlzT3BlblwiICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgcGFuZWwuaXNPcGVuXCI+XG4gICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhbmVsLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsKSBwYW5lbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbD47XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9yIGNvbW1hIHNlcGFyYXRlZCBzdHJpbmdzIG9mIHBhbmVsIGlkZW50aWZpZXJzIHRoYXQgc2hvdWxkIGJlIG9wZW5lZFxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWRzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiAgV2hldGhlciB0aGUgb3RoZXIgcGFuZWxzIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBhIHBhbmVsIGlzIG9wZW5lZFxuICAgKi9cbiAgQElucHV0KCdjbG9zZU90aGVycycpIGNsb3NlT3RoZXJQYW5lbHM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNsb3NlZCBwYW5lbHMgc2hvdWxkIGJlIGhpZGRlbiB3aXRob3V0IGRlc3Ryb3lpbmcgdGhlbVxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqICBBY2NvcmRpb24ncyB0eXBlcyBvZiBwYW5lbHMgdG8gYmUgYXBwbGllZCBnbG9iYWxseS5cbiAgICogIEJvb3RzdHJhcCByZWNvZ25pemVzIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFwicHJpbWFyeVwiLCBcInNlY29uZGFyeVwiLCBcInN1Y2Nlc3NcIiwgXCJkYW5nZXJcIiwgXCJ3YXJuaW5nXCIsIFwiaW5mb1wiLCBcImxpZ2h0XCJcbiAgICogYW5kIFwiZGFya1xuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHBhbmVsIGNoYW5nZSBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdGhlIHBhbmVsIHRvZ2dsZSBoYXBwZW5zLiBTZWUgTmdiUGFuZWxDaGFuZ2VFdmVudCBmb3IgcGF5bG9hZCBkZXRhaWxzXG4gICAqL1xuICBAT3V0cHV0KCkgcGFuZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlBhbmVsQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JBY2NvcmRpb25Db25maWcpIHtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgICB0aGlzLmNsb3NlT3RoZXJQYW5lbHMgPSBjb25maWcuY2xvc2VPdGhlcnM7XG4gIH1cblxuICAvKipcbiAgICogUHJvZ3JhbW1hdGljYWxseSB0b2dnbGUgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQuXG4gICAqL1xuICB0b2dnbGUocGFuZWxJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnBhbmVscy5maW5kKHAgPT4gcC5pZCA9PT0gcGFuZWxJZCk7XG5cbiAgICBpZiAocGFuZWwgJiYgIXBhbmVsLmRpc2FibGVkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnBhbmVsQ2hhbmdlLmVtaXQoXG4gICAgICAgICAge3BhbmVsSWQ6IHBhbmVsSWQsIG5leHRTdGF0ZTogIXBhbmVsLmlzT3BlbiwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHBhbmVsLmlzT3BlbiA9ICFwYW5lbC5pc09wZW47XG5cbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPdGhlclBhbmVscykge1xuICAgICAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHBhbmVsSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBhY3RpdmUgaWQgdXBkYXRlc1xuICAgIGlmIChpc1N0cmluZyh0aGlzLmFjdGl2ZUlkcykpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5hY3RpdmVJZHMuc3BsaXQoL1xccyosXFxzKi8pO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBwYW5lbHMgb3BlbiBzdGF0ZXNcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHBhbmVsLmlzT3BlbiA9ICFwYW5lbC5kaXNhYmxlZCAmJiB0aGlzLmFjdGl2ZUlkcy5pbmRleE9mKHBhbmVsLmlkKSA+IC0xKTtcblxuICAgIC8vIGNsb3NlT3RoZXJzIHVwZGF0ZXNcbiAgICBpZiAodGhpcy5hY3RpdmVJZHMubGVuZ3RoID4gMSAmJiB0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcbiAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHRoaXMuYWN0aXZlSWRzWzBdKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlT3RoZXJzKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMucGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgaWYgKHBhbmVsLmlkICE9PSBwYW5lbElkKSB7XG4gICAgICAgIHBhbmVsLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlSWRzKCkge1xuICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5wYW5lbHMuZmlsdGVyKHBhbmVsID0+IHBhbmVsLmlzT3BlbiAmJiAhcGFuZWwuZGlzYWJsZWQpLm1hcChwYW5lbCA9PiBwYW5lbC5pZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiQWNjb3JkaW9uLCBOZ2JQYW5lbCwgTmdiUGFuZWxUaXRsZSwgTmdiUGFuZWxDb250ZW50LCBOZ2JQYW5lbENoYW5nZUV2ZW50fSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQge05nYkFjY29yZGlvbkNvbmZpZ30gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcblxuZXhwb3J0IHtOZ2JBY2NvcmRpb24sIE5nYlBhbmVsLCBOZ2JQYW5lbFRpdGxlLCBOZ2JQYW5lbENvbnRlbnQsIE5nYlBhbmVsQ2hhbmdlRXZlbnR9IGZyb20gJy4vYWNjb3JkaW9uJztcbmV4cG9ydCB7TmdiQWNjb3JkaW9uQ29uZmlnfSBmcm9tICcuL2FjY29yZGlvbi1jb25maWcnO1xuXG5jb25zdCBOR0JfQUNDT1JESU9OX0RJUkVDVElWRVMgPSBbTmdiQWNjb3JkaW9uLCBOZ2JQYW5lbCwgTmdiUGFuZWxUaXRsZSwgTmdiUGFuZWxDb250ZW50XTtcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IE5HQl9BQ0NPUkRJT05fRElSRUNUSVZFUywgZXhwb3J0czogTkdCX0FDQ09SRElPTl9ESVJFQ1RJVkVTLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkFjY29yZGlvbk1vZHVsZSwgcHJvdmlkZXJzOiBbTmdiQWNjb3JkaW9uQ29uZmlnXX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiQWxlcnQgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGFsZXJ0cyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0Q29uZmlnIHtcbiAgZGlzbWlzc2libGUgPSB0cnVlO1xuICB0eXBlID0gJ3dhcm5pbmcnO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnLi9hbGVydC1jb25maWcnO1xuXG4vKipcbiAqIEFsZXJ0cyBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGZlZWRiYWNrIG1lc3NhZ2VzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItYWxlcnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCInYWxlcnQgYWxlcnQtJyArIHR5cGUgKyAoZGlzbWlzc2libGUgPyAnIGFsZXJ0LWRpc21pc3NpYmxlJyA6ICcnKVwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cImRpc21pc3NpYmxlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5hbGVydC5jbG9zZVwiXG4gICAgICAgIChjbGljayk9XCJjbG9zZUhhbmRsZXIoKVwiPlxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydCB7XG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBhIGdpdmVuIGFsZXJ0IGNhbiBiZSBkaXNtaXNzZWQgKGNsb3NlZCkgYnkgYSB1c2VyLiBJZiB0aGlzIGZsYWcgaXMgc2V0LCBhIGNsb3NlIGJ1dHRvbiAoaW4gYVxuICAgKiBmb3JtIG9mIGFuIMODwpcpIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzbWlzc2libGU6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbGVydCB0eXBlIChDU1MgY2xhc3MpLiBCb290c3RyYXAgNCByZWNvZ25pemVzIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFwic3VjY2Vzc1wiLCBcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZGFuZ2VyXCIsXG4gICAqIFwicHJpbWFyeVwiLCBcInNlY29uZGFyeVwiLCBcImxpZ2h0XCIsIFwiZGFya1wiLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjbG9zZSBidXR0b24gaXMgY2xpY2tlZC4gVGhpcyBldmVudCBoYXMgbm8gcGF5bG9hZC4gT25seSByZWxldmFudCBmb3IgZGlzbWlzc2libGUgYWxlcnRzLlxuICAgKi9cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiQWxlcnRDb25maWcpIHtcbiAgICB0aGlzLmRpc21pc3NpYmxlID0gY29uZmlnLmRpc21pc3NpYmxlO1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICB9XG5cbiAgY2xvc2VIYW5kbGVyKCkgeyB0aGlzLmNsb3NlLmVtaXQobnVsbCk7IH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiQWxlcnR9IGZyb20gJy4vYWxlcnQnO1xuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnLi9hbGVydC1jb25maWcnO1xuXG5leHBvcnQge05nYkFsZXJ0fSBmcm9tICcuL2FsZXJ0JztcbmV4cG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJy4vYWxlcnQtY29uZmlnJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JBbGVydF0sIGV4cG9ydHM6IFtOZ2JBbGVydF0sIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLCBlbnRyeUNvbXBvbmVudHM6IFtOZ2JBbGVydF19KVxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkFsZXJ0TW9kdWxlLCBwcm92aWRlcnM6IFtOZ2JBbGVydENvbmZpZ119OyB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25MYWJlbF0nLFxuICBob3N0OlxuICAgICAgeydbY2xhc3MuYnRuXSc6ICd0cnVlJywgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJywgJ1tjbGFzcy5mb2N1c10nOiAnZm9jdXNlZCd9XG59KVxuZXhwb3J0IGNsYXNzIE5nYkJ1dHRvbkxhYmVsIHtcbiAgYWN0aXZlOiBib29sZWFuO1xuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgZm9jdXNlZDogYm9vbGVhbjtcbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcblxuY29uc3QgTkdCX0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiQ2hlY2tCb3gpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuXG4vKipcbiAqIEVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIGNoZWNrYm94IGJ1dHRvbnMuIEEgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlXG4gKiBzcGVjaWZpZWQgdmlhIG5nTW9kZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9Y2hlY2tib3hdJyxcbiAgaG9zdDoge1xuICAgICdhdXRvY29tcGxldGUnOiAnb2ZmJyxcbiAgICAnW2NoZWNrZWRdJzogJ2NoZWNrZWQnLFxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnKGNoYW5nZSknOiAnb25JbnB1dENoYW5nZSgkZXZlbnQpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXG4gIH0sXG4gIHByb3ZpZGVyczogW05HQl9DSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiQ2hlY2tCb3ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIGNoZWNrZWQ7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gY2hlY2tib3ggYnV0dG9uIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCBhcyBtb2RlbCB3aGVuIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLlxuICAgKi9cbiAgQElucHV0KCkgdmFsdWVDaGVja2VkID0gdHJ1ZTtcblxuICAvKipcbiAgICogVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCBhcyBtb2RlbCB3aGVuIHRoZSBjaGVja2JveCBpcyB1bmNoZWNrZWQuXG4gICAqL1xuICBASW5wdXQoKSB2YWx1ZVVuQ2hlY2tlZCA9IGZhbHNlO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2xhYmVsLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGFiZWw6IE5nYkJ1dHRvbkxhYmVsKSB7fVxuXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgbW9kZWxUb1Byb3BhZ2F0ZSA9ICRldmVudC50YXJnZXQuY2hlY2tlZCA/IHRoaXMudmFsdWVDaGVja2VkIDogdGhpcy52YWx1ZVVuQ2hlY2tlZDtcbiAgICB0aGlzLm9uQ2hhbmdlKG1vZGVsVG9Qcm9wYWdhdGUpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgdGhpcy53cml0ZVZhbHVlKG1vZGVsVG9Qcm9wYWdhdGUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9sYWJlbC5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5jaGVja2VkID0gdmFsdWUgPT09IHRoaXMudmFsdWVDaGVja2VkO1xuICAgIHRoaXMuX2xhYmVsLmFjdGl2ZSA9IHRoaXMuY2hlY2tlZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIGZvcndhcmRSZWYsIElucHV0LCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcblxuY29uc3QgTkdCX1JBRElPX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiUmFkaW9Hcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBFYXNpbHkgY3JlYXRlIEJvb3RzdHJhcC1zdHlsZSByYWRpbyBidXR0b25zLiBBIHZhbHVlIG9mIGEgc2VsZWN0ZWQgYnV0dG9uIGlzIGJvdW5kIHRvIGEgdmFyaWFibGVcbiAqIHNwZWNpZmllZCB2aWEgbmdNb2RlbC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiUmFkaW9Hcm91cF0nLCBob3N0OiB7J3JvbGUnOiAnZ3JvdXAnfSwgcHJvdmlkZXJzOiBbTkdCX1JBRElPX1ZBTFVFX0FDQ0VTU09SXX0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW9Hcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHJpdmF0ZSBfcmFkaW9zOiBTZXQ8TmdiUmFkaW8+ID0gbmV3IFNldDxOZ2JSYWRpbz4oKTtcbiAgcHJpdmF0ZSBfdmFsdWUgPSBudWxsO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBnZXQgZGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLnNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZCk7IH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGdyb3VwLiBVbmxlc3MgZW5jbG9zZWQgaW5wdXRzIHNwZWNpZnkgYSBuYW1lLCB0aGlzIG5hbWUgaXMgdXNlZCBhcyB0aGUgbmFtZSBvZiB0aGVcbiAgICogZW5jbG9zZWQgaW5wdXRzLiBJZiBub3Qgc3BlY2lmaWVkLCBhIG5hbWUgaXMgZ2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBASW5wdXQoKSBuYW1lID0gYG5nYi1yYWRpby0ke25leHRJZCsrfWA7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgb25SYWRpb0NoYW5nZShyYWRpbzogTmdiUmFkaW8pIHtcbiAgICB0aGlzLndyaXRlVmFsdWUocmFkaW8udmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UocmFkaW8udmFsdWUpO1xuICB9XG5cbiAgb25SYWRpb1ZhbHVlVXBkYXRlKCkgeyB0aGlzLl91cGRhdGVSYWRpb3NWYWx1ZSgpOyB9XG5cbiAgcmVnaXN0ZXIocmFkaW86IE5nYlJhZGlvKSB7IHRoaXMuX3JhZGlvcy5hZGQocmFkaW8pOyB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fdXBkYXRlUmFkaW9zRGlzYWJsZWQoKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXIocmFkaW86IE5nYlJhZGlvKSB7IHRoaXMuX3JhZGlvcy5kZWxldGUocmFkaW8pOyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmFkaW9zVmFsdWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVJhZGlvc1ZhbHVlKCkgeyB0aGlzLl9yYWRpb3MuZm9yRWFjaCgocmFkaW8pID0+IHJhZGlvLnVwZGF0ZVZhbHVlKHRoaXMuX3ZhbHVlKSk7IH1cbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9zRGlzYWJsZWQoKSB7IHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4gcmFkaW8udXBkYXRlRGlzYWJsZWQoKSk7IH1cbn1cblxuXG4vKipcbiAqIE1hcmtzIGFuIGlucHV0IG9mIHR5cGUgXCJyYWRpb1wiIGFzIHBhcnQgb2YgdGhlIE5nYlJhZGlvR3JvdXAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9cmFkaW9dJyxcbiAgaG9zdDoge1xuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbbmFtZV0nOiAnbmFtZUF0dHInLFxuICAgICcoY2hhbmdlKSc6ICdvbkNoYW5nZSgpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW8gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBpbnB1dC4gQWxsIGlucHV0cyBvZiBhIGdyb3VwIHNob3VsZCBoYXZlIHRoZSBzYW1lIG5hbWUuIElmIG5vdCBzcGVjaWZpZWQsXG4gICAqIHRoZSBuYW1lIG9mIHRoZSBlbmNsb3NpbmcgZ3JvdXAgaXMgdXNlZC5cbiAgICovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogWW91IGNhbiBzcGVjaWZ5IG1vZGVsIHZhbHVlIG9mIGEgZ2l2ZW4gcmFkaW8gYnkgYmluZGluZyB0byB0aGUgdmFsdWUgcHJvcGVydHkuXG4gICAqL1xuICBASW5wdXQoJ3ZhbHVlJylcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogJyc7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBzdHJpbmdWYWx1ZSk7XG4gICAgdGhpcy5fZ3JvdXAub25SYWRpb1ZhbHVlVXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiByYWRpbyBidXR0b24gaXMgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgc2V0IGRpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQgIT09IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICB9XG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2dyb3VwLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkKCkgeyByZXR1cm4gdGhpcy5fY2hlY2tlZDsgfVxuXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2dyb3VwLmRpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVkOyB9XG5cbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cblxuICBnZXQgbmFtZUF0dHIoKSB7IHJldHVybiB0aGlzLm5hbWUgfHwgdGhpcy5fZ3JvdXAubmFtZTsgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZ3JvdXA6IE5nYlJhZGlvR3JvdXAsIHByaXZhdGUgX2xhYmVsOiBOZ2JCdXR0b25MYWJlbCwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4pIHtcbiAgICB0aGlzLl9ncm91cC5yZWdpc3Rlcih0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9ncm91cC51bnJlZ2lzdGVyKHRoaXMpOyB9XG5cbiAgb25DaGFuZ2UoKSB7IHRoaXMuX2dyb3VwLm9uUmFkaW9DaGFuZ2UodGhpcyk7IH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2NoZWNrZWQgPSB0aGlzLnZhbHVlID09PSB2YWx1ZTtcbiAgICB0aGlzLl9sYWJlbC5hY3RpdmUgPSB0aGlzLl9jaGVja2VkO1xuICB9XG5cbiAgdXBkYXRlRGlzYWJsZWQoKSB7IHRoaXMuX2xhYmVsLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDsgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcbmltcG9ydCB7TmdiQ2hlY2tCb3h9IGZyb20gJy4vY2hlY2tib3gnO1xuaW1wb3J0IHtOZ2JSYWRpbywgTmdiUmFkaW9Hcm91cH0gZnJvbSAnLi9yYWRpbyc7XG5cbmV4cG9ydCB7TmdiQnV0dG9uTGFiZWx9IGZyb20gJy4vbGFiZWwnO1xuZXhwb3J0IHtOZ2JDaGVja0JveH0gZnJvbSAnLi9jaGVja2JveCc7XG5leHBvcnQge05nYlJhZGlvLCBOZ2JSYWRpb0dyb3VwfSBmcm9tICcuL3JhZGlvJztcblxuXG5jb25zdCBOR0JfQlVUVE9OX0RJUkVDVElWRVMgPSBbTmdiQnV0dG9uTGFiZWwsIE5nYkNoZWNrQm94LCBOZ2JSYWRpb0dyb3VwLCBOZ2JSYWRpb107XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfQlVUVE9OX0RJUkVDVElWRVMsIGV4cG9ydHM6IE5HQl9CVVRUT05fRElSRUNUSVZFU30pXG5leHBvcnQgY2xhc3MgTmdiQnV0dG9uc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JCdXR0b25zTW9kdWxlLCBwcm92aWRlcnM6IFtdfTsgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JDYXJvdXNlbCBjb21wb25lbnQuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgY2Fyb3VzZWxzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWxDb25maWcge1xuICBpbnRlcnZhbCA9IDUwMDA7XG4gIHdyYXAgPSB0cnVlO1xuICBrZXlib2FyZCA9IHRydWU7XG4gIHBhdXNlT25Ib3ZlciA9IHRydWU7XG4gIHNob3dOYXZpZ2F0aW9uQXJyb3dzID0gdHJ1ZTtcbiAgc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gdHJ1ZTtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBUZW1wbGF0ZVJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIElucHV0LFxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbmRpdmlkdWFsIHNsaWRlIHRvIGJlIHVzZWQgd2l0aGluIGEgY2Fyb3VzZWwuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiU2xpZGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiU2xpZGUge1xuICAvKipcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxuICAgKiBXaWxsIGJlIGF1dG8tZ2VuZXJhdGVkIGlmIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG5nYi1zbGlkZS0ke25leHRJZCsrfWA7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGVhc2lseSBjcmVhdGUgY2Fyb3VzZWxzIGJhc2VkIG9uIEJvb3RzdHJhcCdzIG1hcmt1cC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWNhcm91c2VsJyxcbiAgZXhwb3J0QXM6ICduZ2JDYXJvdXNlbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2Fyb3VzZWwgc2xpZGUnLFxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcbiAgICAndGFiSW5kZXgnOiAnMCcsXG4gICAgJyhtb3VzZWVudGVyKSc6ICdvbk1vdXNlRW50ZXIoKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdvbk1vdXNlTGVhdmUoKScsXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAna2V5UHJldigpJyxcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5TmV4dCgpJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yc1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBbaWRdPVwic2xpZGUuaWRcIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgKGNsaWNrKT1cImN5Y2xlVG9TZWxlY3RlZChzbGlkZS5pZCwgZ2V0U2xpZGVFdmVudERpcmVjdGlvbihhY3RpdmVJZCwgc2xpZGUuaWQpKVwiPjwvbGk+XG4gICAgPC9vbD5cbiAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtaW5uZXJcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc1wiIGNsYXNzPVwiY2Fyb3VzZWwtaXRlbVwiIFtjbGFzcy5hY3RpdmVdPVwic2xpZGUuaWQgPT09IGFjdGl2ZUlkXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXZcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImN5Y2xlVG9QcmV2KClcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uQXJyb3dzXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLmNhcm91c2VsLnByZXZpb3VzXCI+UHJldmlvdXM8L3NwYW4+XG4gICAgPC9hPlxuICAgIDxhIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1uZXh0XCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJjeWNsZVRvTmV4dCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5uZXh0XCI+TmV4dDwvc3Bhbj5cbiAgICA8L2E+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiU2xpZGUpIHNsaWRlczogUXVlcnlMaXN0PE5nYlNsaWRlPjtcbiAgcHJpdmF0ZSBfc2xpZGVDaGFuZ2VJbnRlcnZhbDtcblxuICAvKipcbiAgICogVGhlIGFjdGl2ZSBzbGlkZSBpZC5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cblxuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSBuZXh0IHNsaWRlIGlzIHNob3duLlxuICAgKi9cbiAgQElucHV0KCkgaW50ZXJ2YWw6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hldGhlciBjYW4gd3JhcCBmcm9tIHRoZSBsYXN0IHRvIHRoZSBmaXJzdCBzbGlkZS5cbiAgICovXG4gIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBmb3IgYWxsb3dpbmcgbmF2aWdhdGlvbiB2aWEga2V5Ym9hcmRcbiAgICovXG4gIEBJbnB1dCgpIGtleWJvYXJkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdG8gZW5hYmxlIHNsaWRlIGN5Y2xpbmcgcGF1c2UvcmVzdW1lIG9uIG1vdXNlb3Zlci5cbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBwYXVzZU9uSG92ZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0byBzaG93IC8gaGlkZSBuYXZpZ2F0aW9uIGFycm93cy5cbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkFycm93czogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIHRvIHNob3cgLyBoaWRlIG5hdmlnYXRpb24gaW5kaWNhdG9ycy5cbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkluZGljYXRvcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgY2Fyb3VzZWwgc2xpZGUgZXZlbnQgZmlyZWQgd2hlbiB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXG4gICAqIFNlZSBOZ2JTbGlkZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcbiAgICovXG4gIEBPdXRwdXQoKSBzbGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiU2xpZGVFdmVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYkNhcm91c2VsQ29uZmlnKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IGNvbmZpZy5pbnRlcnZhbDtcbiAgICB0aGlzLndyYXAgPSBjb25maWcud3JhcDtcbiAgICB0aGlzLmtleWJvYXJkID0gY29uZmlnLmtleWJvYXJkO1xuICAgIHRoaXMucGF1c2VPbkhvdmVyID0gY29uZmlnLnBhdXNlT25Ib3ZlcjtcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uQXJyb3dzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uQXJyb3dzO1xuICAgIHRoaXMuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycztcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBsZXQgYWN0aXZlU2xpZGUgPSB0aGlzLl9nZXRTbGlkZUJ5SWQodGhpcy5hY3RpdmVJZCk7XG4gICAgdGhpcy5hY3RpdmVJZCA9IGFjdGl2ZVNsaWRlID8gYWN0aXZlU2xpZGUuaWQgOiAodGhpcy5zbGlkZXMubGVuZ3RoID8gdGhpcy5zbGlkZXMuZmlyc3QuaWQgOiBudWxsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9zdGFydFRpbWVyKCk7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgaWYgKCdpbnRlcnZhbCcgaW4gY2hhbmdlcyAmJiAhY2hhbmdlc1snaW50ZXJ2YWwnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuX3Jlc3RhcnRUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyBjbGVhckludGVydmFsKHRoaXMuX3NsaWRlQ2hhbmdlSW50ZXJ2YWwpOyB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIGEgc2xpZGUgd2l0aCB0aGUgc3BlY2lmaWVkIGlkZW50aWZpZXIuXG4gICAqL1xuICBzZWxlY3Qoc2xpZGVJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZCwgdGhpcy5nZXRTbGlkZUV2ZW50RGlyZWN0aW9uKHRoaXMuYWN0aXZlSWQsIHNsaWRlSWQpKTtcbiAgICB0aGlzLl9yZXN0YXJ0VGltZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBzbGlkZS5cbiAgICovXG4gIHByZXYoKSB7XG4gICAgdGhpcy5jeWNsZVRvUHJldigpO1xuICAgIHRoaXMuX3Jlc3RhcnRUaW1lcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHNsaWRlLlxuICAgKi9cbiAgbmV4dCgpIHtcbiAgICB0aGlzLmN5Y2xlVG9OZXh0KCk7XG4gICAgdGhpcy5fcmVzdGFydFRpbWVyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgdGhlIGNhcm91c2VsIGZyb20gY3ljbGluZyB0aHJvdWdoIGl0ZW1zLlxuICAgKi9cbiAgcGF1c2UoKSB7IHRoaXMuX3N0b3BUaW1lcigpOyB9XG5cbiAgLyoqXG4gICAqIFJlc3RhcnRzIGN5Y2xpbmcgdGhyb3VnaCB0aGUgY2Fyb3VzZWwgc2xpZGVzIGZyb20gbGVmdCB0byByaWdodC5cbiAgICovXG4gIGN5Y2xlKCkgeyB0aGlzLl9zdGFydFRpbWVyKCk7IH1cblxuICBjeWNsZVRvTmV4dCgpIHsgdGhpcy5jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0TmV4dFNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQpOyB9XG5cbiAgY3ljbGVUb1ByZXYoKSB7IHRoaXMuY3ljbGVUb1NlbGVjdGVkKHRoaXMuX2dldFByZXZTbGlkZSh0aGlzLmFjdGl2ZUlkKSwgTmdiU2xpZGVFdmVudERpcmVjdGlvbi5SSUdIVCk7IH1cblxuICBjeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZHg6IHN0cmluZywgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uKSB7XG4gICAgbGV0IHNlbGVjdGVkU2xpZGUgPSB0aGlzLl9nZXRTbGlkZUJ5SWQoc2xpZGVJZHgpO1xuICAgIGlmIChzZWxlY3RlZFNsaWRlKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRTbGlkZS5pZCAhPT0gdGhpcy5hY3RpdmVJZCkge1xuICAgICAgICB0aGlzLnNsaWRlLmVtaXQoe3ByZXY6IHRoaXMuYWN0aXZlSWQsIGN1cnJlbnQ6IHNlbGVjdGVkU2xpZGUuaWQsIGRpcmVjdGlvbjogZGlyZWN0aW9ufSk7XG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2ZUlkID0gc2VsZWN0ZWRTbGlkZS5pZDtcbiAgICB9XG4gIH1cblxuICBnZXRTbGlkZUV2ZW50RGlyZWN0aW9uKGN1cnJlbnRBY3RpdmVTbGlkZUlkOiBzdHJpbmcsIG5leHRBY3RpdmVTbGlkZUlkOiBzdHJpbmcpOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uIHtcbiAgICBjb25zdCBjdXJyZW50QWN0aXZlU2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudEFjdGl2ZVNsaWRlSWQpO1xuICAgIGNvbnN0IG5leHRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChuZXh0QWN0aXZlU2xpZGVJZCk7XG5cbiAgICByZXR1cm4gY3VycmVudEFjdGl2ZVNsaWRlSWR4ID4gbmV4dEFjdGl2ZVNsaWRlSWR4ID8gTmdiU2xpZGVFdmVudERpcmVjdGlvbi5SSUdIVCA6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVDtcbiAgfVxuXG4gIGtleVByZXYoKSB7XG4gICAgaWYgKHRoaXMua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMucHJldigpO1xuICAgIH1cbiAgfVxuXG4gIGtleU5leHQoKSB7XG4gICAgaWYgKHRoaXMua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VFbnRlcigpIHtcbiAgICBpZiAodGhpcy5wYXVzZU9uSG92ZXIpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKHRoaXMucGF1c2VPbkhvdmVyKSB7XG4gICAgICB0aGlzLmN5Y2xlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVzdGFydFRpbWVyKCkge1xuICAgIHRoaXMuX3N0b3BUaW1lcigpO1xuICAgIHRoaXMuX3N0YXJ0VGltZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0YXJ0VGltZXIoKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwgPiAwKSB7XG4gICAgICB0aGlzLl9zbGlkZUNoYW5nZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLmN5Y2xlVG9OZXh0KCk7IH0sIHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N0b3BUaW1lcigpIHsgY2xlYXJJbnRlcnZhbCh0aGlzLl9zbGlkZUNoYW5nZUludGVydmFsKTsgfVxuXG4gIHByaXZhdGUgX2dldFNsaWRlQnlJZChzbGlkZUlkOiBzdHJpbmcpOiBOZ2JTbGlkZSB7XG4gICAgbGV0IHNsaWRlV2l0aElkOiBOZ2JTbGlkZVtdID0gdGhpcy5zbGlkZXMuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlkID09PSBzbGlkZUlkKTtcbiAgICByZXR1cm4gc2xpZGVXaXRoSWQubGVuZ3RoID8gc2xpZGVXaXRoSWRbMF0gOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVJZHhCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXROZXh0U2xpZGUoY3VycmVudFNsaWRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICBjb25zdCBpc0xhc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gc2xpZGVBcnIubGVuZ3RoIC0gMTtcblxuICAgIHJldHVybiBpc0xhc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFyclswXS5pZCA6IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVBcnJbY3VycmVudFNsaWRlSWR4ICsgMV0uaWQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcmV2U2xpZGUoY3VycmVudFNsaWRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICBjb25zdCBpc0ZpcnN0U2xpZGUgPSBjdXJyZW50U2xpZGVJZHggPT09IDA7XG5cbiAgICByZXR1cm4gaXNGaXJzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkIDogc2xpZGVBcnJbMF0uaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVBcnJbY3VycmVudFNsaWRlSWR4IC0gMV0uaWQ7XG4gIH1cbn1cblxuLyoqXG4qIFRoZSBwYXlsb2FkIG9mIHRoZSBzbGlkZSBldmVudCBmaXJlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZFxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiU2xpZGVFdmVudCB7XG4gIC8qKlxuICAgKiBQcmV2aW91cyBzbGlkZSBpZFxuICAgKi9cbiAgcHJldjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBOZXcgc2xpZGUgaWRzXG4gICAqL1xuICBjdXJyZW50OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNsaWRlIGV2ZW50IGRpcmVjdGlvblxuICAgKi9cbiAgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uO1xufVxuXG4vKipcbiAqIEVudW0gdG8gZGVmaW5lIHRoZSBjYXJvdXNlbCBzbGlkZSBldmVudCBkaXJlY3Rpb25cbiAqL1xuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XG4gIExFRlQgPSA8YW55PidsZWZ0JyxcbiAgUklHSFQgPSA8YW55PidyaWdodCdcbn1cblxuZXhwb3J0IGNvbnN0IE5HQl9DQVJPVVNFTF9ESVJFQ1RJVkVTID0gW05nYkNhcm91c2VsLCBOZ2JTbGlkZV07XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05HQl9DQVJPVVNFTF9ESVJFQ1RJVkVTLCBOZ2JTbGlkZUV2ZW50fSBmcm9tICcuL2Nhcm91c2VsJztcbmltcG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcblxuZXhwb3J0IHtOZ2JDYXJvdXNlbCwgTmdiU2xpZGUsIE5nYlNsaWRlRXZlbnR9IGZyb20gJy4vY2Fyb3VzZWwnO1xuZXhwb3J0IHtOZ2JDYXJvdXNlbENvbmZpZ30gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogTkdCX0NBUk9VU0VMX0RJUkVDVElWRVMsIGV4cG9ydHM6IE5HQl9DQVJPVVNFTF9ESVJFQ1RJVkVTLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWxNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQ2Fyb3VzZWxNb2R1bGUsIHByb3ZpZGVyczogW05nYkNhcm91c2VsQ29uZmlnXX07IH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIE5nYkNvbGxhcHNlIGRpcmVjdGl2ZSBwcm92aWRlcyBhIHNpbXBsZSB3YXkgdG8gaGlkZSBhbmQgc2hvdyBhbiBlbGVtZW50IHdpdGggYW5pbWF0aW9ucy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nYkNvbGxhcHNlXScsXG4gIGV4cG9ydEFzOiAnbmdiQ29sbGFwc2UnLFxuICBob3N0OiB7J1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnIWNvbGxhcHNlZCd9XG59KVxuZXhwb3J0IGNsYXNzIE5nYkNvbGxhcHNlIHtcbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGNvbGxhcHNlZCAodHJ1ZSkgb3Igb3BlbiAoZmFsc2UpIHN0YXRlLlxuICAgKi9cbiAgQElucHV0KCduZ2JDb2xsYXBzZScpIGNvbGxhcHNlZCA9IGZhbHNlO1xufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkNvbGxhcHNlfSBmcm9tICcuL2NvbGxhcHNlJztcblxuZXhwb3J0IHtOZ2JDb2xsYXBzZX0gZnJvbSAnLi9jb2xsYXBzZSc7XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiQ29sbGFwc2VdLCBleHBvcnRzOiBbTmdiQ29sbGFwc2VdfSlcbmV4cG9ydCBjbGFzcyBOZ2JDb2xsYXBzZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JDb2xsYXBzZU1vZHVsZSwgcHJvdmlkZXJzOiBbXX07IH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIE5nYkRhdGUge1xuICBzdGF0aWMgZnJvbShkYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9KSB7XG4gICAgcmV0dXJuIGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5ID8gZGF0ZS5kYXkgOiAxKSA6IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgeWVhcjogbnVtYmVyLCBwdWJsaWMgbW9udGg6IG51bWJlciwgcHVibGljIGRheTogbnVtYmVyKSB7fVxuXG4gIGVxdWFscyhvdGhlcjogTmdiRGF0ZSkge1xuICAgIHJldHVybiBvdGhlciAmJiB0aGlzLnllYXIgPT09IG90aGVyLnllYXIgJiYgdGhpcy5tb250aCA9PT0gb3RoZXIubW9udGggJiYgdGhpcy5kYXkgPT09IG90aGVyLmRheTtcbiAgfVxuXG4gIGJlZm9yZShvdGhlcjogTmdiRGF0ZSkge1xuICAgIGlmICghb3RoZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XG4gICAgICBpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5ID09PSBvdGhlci5kYXkgPyBmYWxzZSA6IHRoaXMuZGF5IDwgb3RoZXIuZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGggPCBvdGhlci5tb250aDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMueWVhciA8IG90aGVyLnllYXI7XG4gICAgfVxuICB9XG5cbiAgYWZ0ZXIob3RoZXI6IE5nYkRhdGUpIHtcbiAgICBpZiAoIW90aGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLnllYXIgPT09IG90aGVyLnllYXIpIHtcbiAgICAgIGlmICh0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXkgPT09IG90aGVyLmRheSA/IGZhbHNlIDogdGhpcy5kYXkgPiBvdGhlci5kYXk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aCA+IG90aGVyLm1vbnRoO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy55ZWFyID4gb3RoZXIueWVhcjtcbiAgICB9XG4gIH1cblxuICB0b1N0cnVjdCgpIHsgcmV0dXJuIHt5ZWFyOiB0aGlzLnllYXIsIG1vbnRoOiB0aGlzLm1vbnRoLCBkYXk6IHRoaXMuZGF5fTsgfVxuXG4gIHRvU3RyaW5nKCkgeyByZXR1cm4gYCR7dGhpcy55ZWFyfS0ke3RoaXMubW9udGh9LSR7dGhpcy5kYXl9YDsgfVxufVxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuZnVuY3Rpb24gZnJvbUpTRGF0ZShqc0RhdGU6IERhdGUpIHtcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGpzRGF0ZS5nZXRGdWxsWWVhcigpLCBqc0RhdGUuZ2V0TW9udGgoKSArIDEsIGpzRGF0ZS5nZXREYXRlKCkpO1xufVxuZnVuY3Rpb24gdG9KU0RhdGUoZGF0ZTogTmdiRGF0ZSkge1xuICBjb25zdCBqc0RhdGUgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSwgMTIpO1xuICAvLyB0aGlzIGlzIGRvbmUgYXZvaWQgMzAgLT4gMTkzMCBjb252ZXJzaW9uXG4gIGlmICghaXNOYU4oanNEYXRlLmdldFRpbWUoKSkpIHtcbiAgICBqc0RhdGUuc2V0RnVsbFllYXIoZGF0ZS55ZWFyKTtcbiAgfVxuICByZXR1cm4ganNEYXRlO1xufVxuXG5leHBvcnQgdHlwZSBOZ2JQZXJpb2QgPSAneScgfCAnbScgfCAnZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhciB7XG4gIGFic3RyYWN0IGdldERheXNQZXJXZWVrKCk6IG51bWJlcjtcbiAgYWJzdHJhY3QgZ2V0TW9udGhzKCk6IG51bWJlcltdO1xuICBhYnN0cmFjdCBnZXRXZWVrc1Blck1vbnRoKCk6IG51bWJlcjtcbiAgYWJzdHJhY3QgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKTogbnVtYmVyO1xuXG4gIGFic3RyYWN0IGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuICBhYnN0cmFjdCBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZD86IE5nYlBlcmlvZCwgbnVtYmVyPzogbnVtYmVyKTogTmdiRGF0ZTtcblxuICBhYnN0cmFjdCBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcik6IG51bWJlcjtcblxuICBhYnN0cmFjdCBnZXRUb2RheSgpOiBOZ2JEYXRlO1xuXG4gIGFic3RyYWN0IGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckdyZWdvcmlhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XG5cbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XG5cbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cblxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG4gICAgbGV0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyICsgbnVtYmVyLCAxLCAxKTtcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBqc0RhdGUgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggKyBudW1iZXIgLSAxLCAxLCAxMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyBudW1iZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIHJldHVybiBmcm9tSlNEYXRlKGpzRGF0ZSk7XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcbiAgICBsZXQgZGF5ID0ganNEYXRlLmdldERheSgpO1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgcmV0dXJuIGRheSA9PT0gMCA/IDcgOiBkYXk7XG4gIH1cblxuICBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XG4gICAgICBmaXJzdERheU9mV2VlayA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgdGh1cnNkYXlJbmRleCA9ICg0ICsgNyAtIGZpcnN0RGF5T2ZXZWVrKSAlIDc7XG4gICAgbGV0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xuXG4gICAgY29uc3QganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XG4gICAgY29uc3QgdGltZSA9IGpzRGF0ZS5nZXRUaW1lKCk7XG4gICAganNEYXRlLnNldE1vbnRoKDApOyAgLy8gQ29tcGFyZSB3aXRoIEphbiAxXG4gICAganNEYXRlLnNldERhdGUoMSk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIGpzRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xuICB9XG5cbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tSlNEYXRlKG5ldyBEYXRlKCkpOyB9XG5cbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFkYXRlIHx8ICFpc0ludGVnZXIoZGF0ZS55ZWFyKSB8fCAhaXNJbnRlZ2VyKGRhdGUubW9udGgpIHx8ICFpc0ludGVnZXIoZGF0ZS5kYXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XG5cbiAgICByZXR1cm4gIWlzTmFOKGpzRGF0ZS5nZXRUaW1lKCkpICYmIGpzRGF0ZS5nZXRGdWxsWWVhcigpID09PSBkYXRlLnllYXIgJiYganNEYXRlLmdldE1vbnRoKCkgKyAxID09PSBkYXRlLm1vbnRoICYmXG4gICAgICAgIGpzRGF0ZS5nZXREYXRlKCkgPT09IGRhdGUuZGF5O1xuICB9XG59XG4iLCJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBEYXlWaWV3TW9kZWwsIE1vbnRoVmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhbmdlZERhdGUocHJldjogTmdiRGF0ZSwgbmV4dDogTmdiRGF0ZSkge1xuICByZXR1cm4gIWRhdGVDb21wYXJhdG9yKHByZXYsIG5leHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUNvbXBhcmF0b3IocHJldjogTmdiRGF0ZSwgbmV4dDogTmdiRGF0ZSkge1xuICByZXR1cm4gKCFwcmV2ICYmICFuZXh0KSB8fCAoISFwcmV2ICYmICEhbmV4dCAmJiBwcmV2LmVxdWFscyhuZXh0KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja01pbkJlZm9yZU1heChtaW5EYXRlOiBOZ2JEYXRlLCBtYXhEYXRlOiBOZ2JEYXRlKSB7XG4gIGlmIChtYXhEYXRlICYmIG1pbkRhdGUgJiYgbWF4RGF0ZS5iZWZvcmUobWluRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCdtYXhEYXRlJyAke21heERhdGV9IHNob3VsZCBiZSBncmVhdGVyIHRoYW4gJ21pbkRhdGUnICR7bWluRGF0ZX1gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tEYXRlSW5SYW5nZShkYXRlOiBOZ2JEYXRlLCBtaW5EYXRlOiBOZ2JEYXRlLCBtYXhEYXRlOiBOZ2JEYXRlKTogTmdiRGF0ZSB7XG4gIGlmIChkYXRlICYmIG1pbkRhdGUgJiYgZGF0ZS5iZWZvcmUobWluRGF0ZSkpIHtcbiAgICByZXR1cm4gTmdiRGF0ZS5mcm9tKG1pbkRhdGUpO1xuICB9XG4gIGlmIChkYXRlICYmIG1heERhdGUgJiYgZGF0ZS5hZnRlcihtYXhEYXRlKSkge1xuICAgIHJldHVybiBOZ2JEYXRlLmZyb20obWF4RGF0ZSk7XG4gIH1cblxuICByZXR1cm4gZGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZVNlbGVjdGFibGUoZGF0ZTogTmdiRGF0ZSwgc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwpIHtcbiAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIGRpc2FibGVkLCBtYXJrRGlzYWJsZWR9ID0gc3RhdGU7XG4gIC8vIGNsYW5nLWZvcm1hdCBvZmZcbiAgcmV0dXJuICEoXG4gICAgIWlzRGVmaW5lZChkYXRlKSB8fFxuICAgIGRpc2FibGVkIHx8XG4gICAgKG1hcmtEaXNhYmxlZCAmJiBtYXJrRGlzYWJsZWQoZGF0ZSwge3llYXI6IGRhdGUueWVhciwgbW9udGg6IGRhdGUubW9udGh9KSkgfHxcbiAgICAobWluRGF0ZSAmJiBkYXRlLmJlZm9yZShtaW5EYXRlKSkgfHxcbiAgICAobWF4RGF0ZSAmJiBkYXRlLmFmdGVyKG1heERhdGUpKVxuICApO1xuICAvLyBjbGFuZy1mb3JtYXQgb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzKGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSkge1xuICBpZiAoIWRhdGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBsZXQgbW9udGhzID0gY2FsZW5kYXIuZ2V0TW9udGhzKCk7XG5cbiAgaWYgKG1pbkRhdGUgJiYgZGF0ZS55ZWFyID09PSBtaW5EYXRlLnllYXIpIHtcbiAgICBjb25zdCBpbmRleCA9IG1vbnRocy5maW5kSW5kZXgobW9udGggPT4gbW9udGggPT09IG1pbkRhdGUubW9udGgpO1xuICAgIG1vbnRocyA9IG1vbnRocy5zbGljZShpbmRleCk7XG4gIH1cblxuICBpZiAobWF4RGF0ZSAmJiBkYXRlLnllYXIgPT09IG1heERhdGUueWVhcikge1xuICAgIGNvbnN0IGluZGV4ID0gbW9udGhzLmZpbmRJbmRleChtb250aCA9PiBtb250aCA9PT0gbWF4RGF0ZS5tb250aCk7XG4gICAgbW9udGhzID0gbW9udGhzLnNsaWNlKDAsIGluZGV4ICsgMSk7XG4gIH1cblxuICByZXR1cm4gbW9udGhzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyhkYXRlOiBOZ2JEYXRlLCBtaW5EYXRlOiBOZ2JEYXRlLCBtYXhEYXRlOiBOZ2JEYXRlKSB7XG4gIGlmICghZGF0ZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHN0YXJ0ID0gbWluRGF0ZSAmJiBtaW5EYXRlLnllYXIgfHwgZGF0ZS55ZWFyIC0gMTA7XG4gIGNvbnN0IGVuZCA9IG1heERhdGUgJiYgbWF4RGF0ZS55ZWFyIHx8IGRhdGUueWVhciArIDEwO1xuXG4gIHJldHVybiBBcnJheS5mcm9tKHtsZW5ndGg6IGVuZCAtIHN0YXJ0ICsgMX0sIChlLCBpKSA9PiBzdGFydCArIGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dE1vbnRoRGlzYWJsZWQoY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBtYXhEYXRlOiBOZ2JEYXRlKSB7XG4gIHJldHVybiBtYXhEYXRlICYmIGNhbGVuZGFyLmdldE5leHQoZGF0ZSwgJ20nKS5hZnRlcihtYXhEYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZNb250aERpc2FibGVkKGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSkge1xuICBjb25zdCBwcmV2RGF0ZSA9IGNhbGVuZGFyLmdldFByZXYoZGF0ZSwgJ20nKTtcbiAgcmV0dXJuIG1pbkRhdGUgJiYgKHByZXZEYXRlLnllYXIgPT09IG1pbkRhdGUueWVhciAmJiBwcmV2RGF0ZS5tb250aCA8IG1pbkRhdGUubW9udGggfHxcbiAgICAgICAgICAgICAgICAgICAgIHByZXZEYXRlLnllYXIgPCBtaW5EYXRlLnllYXIgJiYgbWluRGF0ZS5tb250aCA9PT0gMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vbnRocyhcbiAgICBjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsLCBpMThuOiBOZ2JEYXRlcGlja2VySTE4bixcbiAgICBmb3JjZTogYm9vbGVhbik6IE1vbnRoVmlld01vZGVsW10ge1xuICBjb25zdCB7ZGlzcGxheU1vbnRocywgbW9udGhzfSA9IHN0YXRlO1xuICAvLyBtb3ZlIG9sZCBtb250aHMgdG8gYSB0ZW1wb3JhcnkgYXJyYXlcbiAgY29uc3QgbW9udGhzVG9SZXVzZSA9IG1vbnRocy5zcGxpY2UoMCwgbW9udGhzLmxlbmd0aCk7XG5cbiAgLy8gZ2VuZXJhdGUgbmV3IGZpcnN0IGRhdGVzLCBudWxsaWZ5IG9yIHJldXNlIG1vbnRoc1xuICBjb25zdCBmaXJzdERhdGVzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiBkaXNwbGF5TW9udGhzfSwgKF8sIGkpID0+IHtcbiAgICBjb25zdCBmaXJzdERhdGUgPSBjYWxlbmRhci5nZXROZXh0KGRhdGUsICdtJywgaSk7XG4gICAgbW9udGhzW2ldID0gbnVsbDtcblxuICAgIGlmICghZm9yY2UpIHtcbiAgICAgIGNvbnN0IHJldXNlZEluZGV4ID0gbW9udGhzVG9SZXVzZS5maW5kSW5kZXgobW9udGggPT4gbW9udGguZmlyc3REYXRlLmVxdWFscyhmaXJzdERhdGUpKTtcbiAgICAgIC8vIG1vdmUgcmV1c2VkIG1vbnRoIGJhY2sgdG8gbW9udGhzXG4gICAgICBpZiAocmV1c2VkSW5kZXggIT09IC0xKSB7XG4gICAgICAgIG1vbnRoc1tpXSA9IG1vbnRoc1RvUmV1c2Uuc3BsaWNlKHJldXNlZEluZGV4LCAxKVswXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlyc3REYXRlO1xuICB9KTtcblxuICAvLyByZWJ1aWxkIG51bGxpZmllZCBtb250aHNcbiAgZmlyc3REYXRlcy5mb3JFYWNoKChmaXJzdERhdGUsIGkpID0+IHtcbiAgICBpZiAobW9udGhzW2ldID09PSBudWxsKSB7XG4gICAgICBtb250aHNbaV0gPSBidWlsZE1vbnRoKGNhbGVuZGFyLCBmaXJzdERhdGUsIHN0YXRlLCBpMThuLCBtb250aHNUb1JldXNlLnNoaWZ0KCkgfHwge30gYXMgTW9udGhWaWV3TW9kZWwpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1vbnRocztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9udGgoXG4gICAgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCwgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXG4gICAgbW9udGg6IE1vbnRoVmlld01vZGVsID0ge30gYXMgTW9udGhWaWV3TW9kZWwpOiBNb250aFZpZXdNb2RlbCB7XG4gIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBmaXJzdERheU9mV2VlaywgbWFya0Rpc2FibGVkLCBvdXRzaWRlRGF5c30gPSBzdGF0ZTtcblxuICBtb250aC5maXJzdERhdGUgPSBudWxsO1xuICBtb250aC5sYXN0RGF0ZSA9IG51bGw7XG4gIG1vbnRoLm51bWJlciA9IGRhdGUubW9udGg7XG4gIG1vbnRoLnllYXIgPSBkYXRlLnllYXI7XG4gIG1vbnRoLndlZWtzID0gbW9udGgud2Vla3MgfHwgW107XG4gIG1vbnRoLndlZWtkYXlzID0gbW9udGgud2Vla2RheXMgfHwgW107XG5cbiAgZGF0ZSA9IGdldEZpcnN0Vmlld0RhdGUoY2FsZW5kYXIsIGRhdGUsIGZpcnN0RGF5T2ZXZWVrKTtcblxuICAvLyBtb250aCBoYXMgd2Vla3NcbiAgZm9yIChsZXQgd2VlayA9IDA7IHdlZWsgPCBjYWxlbmRhci5nZXRXZWVrc1Blck1vbnRoKCk7IHdlZWsrKykge1xuICAgIGxldCB3ZWVrT2JqZWN0ID0gbW9udGgud2Vla3Nbd2Vla107XG4gICAgaWYgKCF3ZWVrT2JqZWN0KSB7XG4gICAgICB3ZWVrT2JqZWN0ID0gbW9udGgud2Vla3Nbd2Vla10gPSB7bnVtYmVyOiAwLCBkYXlzOiBbXSwgY29sbGFwc2VkOiB0cnVlfTtcbiAgICB9XG4gICAgY29uc3QgZGF5cyA9IHdlZWtPYmplY3QuZGF5cztcblxuICAgIC8vIHdlZWsgaGFzIGRheXNcbiAgICBmb3IgKGxldCBkYXkgPSAwOyBkYXkgPCBjYWxlbmRhci5nZXREYXlzUGVyV2VlaygpOyBkYXkrKykge1xuICAgICAgaWYgKHdlZWsgPT09IDApIHtcbiAgICAgICAgbW9udGgud2Vla2RheXNbZGF5XSA9IGNhbGVuZGFyLmdldFdlZWtkYXkoZGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld0RhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcbiAgICAgIGNvbnN0IG5leHREYXRlID0gY2FsZW5kYXIuZ2V0TmV4dChuZXdEYXRlKTtcblxuICAgICAgY29uc3QgYXJpYUxhYmVsID0gaTE4bi5nZXREYXlBcmlhTGFiZWwobmV3RGF0ZSk7XG5cbiAgICAgIC8vIG1hcmtpbmcgZGF0ZSBhcyBkaXNhYmxlZFxuICAgICAgbGV0IGRpc2FibGVkID0gISEoKG1pbkRhdGUgJiYgbmV3RGF0ZS5iZWZvcmUobWluRGF0ZSkpIHx8IChtYXhEYXRlICYmIG5ld0RhdGUuYWZ0ZXIobWF4RGF0ZSkpKTtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgbWFya0Rpc2FibGVkKSB7XG4gICAgICAgIGRpc2FibGVkID0gbWFya0Rpc2FibGVkKG5ld0RhdGUsIHttb250aDogbW9udGgubnVtYmVyLCB5ZWFyOiBtb250aC55ZWFyfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNhdmluZyBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxuICAgICAgaWYgKG1vbnRoLmZpcnN0RGF0ZSA9PT0gbnVsbCAmJiBuZXdEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIpIHtcbiAgICAgICAgbW9udGguZmlyc3REYXRlID0gbmV3RGF0ZTtcbiAgICAgIH1cblxuICAgICAgLy8gc2F2aW5nIGxhc3QgZGF0ZSBvZiB0aGUgbW9udGhcbiAgICAgIGlmIChuZXdEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIgJiYgbmV4dERhdGUubW9udGggIT09IG1vbnRoLm51bWJlcikge1xuICAgICAgICBtb250aC5sYXN0RGF0ZSA9IG5ld0RhdGU7XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXlPYmplY3QgPSBkYXlzW2RheV07XG4gICAgICBpZiAoIWRheU9iamVjdCkge1xuICAgICAgICBkYXlPYmplY3QgPSBkYXlzW2RheV0gPSB7fSBhcyBEYXlWaWV3TW9kZWw7XG4gICAgICB9XG4gICAgICBkYXlPYmplY3QuZGF0ZSA9IG5ld0RhdGU7XG4gICAgICBkYXlPYmplY3QuY29udGV4dCA9IE9iamVjdC5hc3NpZ24oZGF5T2JqZWN0LmNvbnRleHQgfHwge30sIHtcbiAgICAgICAgZGF0ZToge3llYXI6IG5ld0RhdGUueWVhciwgbW9udGg6IG5ld0RhdGUubW9udGgsIGRheTogbmV3RGF0ZS5kYXl9LFxuICAgICAgICBjdXJyZW50TW9udGg6IG1vbnRoLm51bWJlciwgZGlzYWJsZWQsXG4gICAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgZGF5T2JqZWN0LnRhYmluZGV4ID0gLTE7XG4gICAgICBkYXlPYmplY3QuYXJpYUxhYmVsID0gYXJpYUxhYmVsO1xuICAgICAgZGF5T2JqZWN0LmhpZGRlbiA9IGZhbHNlO1xuXG4gICAgICBkYXRlID0gbmV4dERhdGU7XG4gICAgfVxuXG4gICAgd2Vla09iamVjdC5udW1iZXIgPSBjYWxlbmRhci5nZXRXZWVrTnVtYmVyKGRheXMubWFwKGRheSA9PiBOZ2JEYXRlLmZyb20oZGF5LmRhdGUpKSwgZmlyc3REYXlPZldlZWspO1xuXG4gICAgLy8gbWFya2luZyB3ZWVrIGFzIGNvbGxhcHNlZFxuICAgIHdlZWtPYmplY3QuY29sbGFwc2VkID0gb3V0c2lkZURheXMgPT09ICdjb2xsYXBzZWQnICYmIGRheXNbMF0uZGF0ZS5tb250aCAhPT0gbW9udGgubnVtYmVyICYmXG4gICAgICAgIGRheXNbZGF5cy5sZW5ndGggLSAxXS5kYXRlLm1vbnRoICE9PSBtb250aC5udW1iZXI7XG4gIH1cblxuICByZXR1cm4gbW9udGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdFZpZXdEYXRlKGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgZmlyc3REYXlPZldlZWs6IG51bWJlcik6IE5nYkRhdGUge1xuICBjb25zdCBkYXlzUGVyV2VlayA9IGNhbGVuZGFyLmdldERheXNQZXJXZWVrKCk7XG4gIGNvbnN0IGZpcnN0TW9udGhEYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCAxKTtcbiAgY29uc3QgZGF5T2ZXZWVrID0gY2FsZW5kYXIuZ2V0V2Vla2RheShmaXJzdE1vbnRoRGF0ZSkgJSBkYXlzUGVyV2VlaztcbiAgcmV0dXJuIGNhbGVuZGFyLmdldFByZXYoZmlyc3RNb250aERhdGUsICdkJywgKGRheXNQZXJXZWVrICsgZGF5T2ZXZWVrIC0gZmlyc3REYXlPZldlZWspICUgZGF5c1BlcldlZWspO1xufVxuIiwiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIExPQ0FMRV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1TdHlsZSwgZ2V0TG9jYWxlRGF5TmFtZXMsIGdldExvY2FsZU1vbnRoTmFtZXMsIFRyYW5zbGF0aW9uV2lkdGh9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgc2VydmljZSBzdXBwbHlpbmcgbW9udGggYW5kIHdlZWtkYXkgbmFtZXMgdG8gdG8gTmdiRGF0ZXBpY2tlciBjb21wb25lbnQuXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHNlcnZpY2UgaG9ub3JzIHRoZSBBbmd1bGFyIGxvY2FsZSwgYW5kIHVzZXMgdGhlIHJlZ2lzdGVyZWQgbG9jYWxlIGRhdGEsXG4gKiBhcyBleHBsYWluZWQgaW4gdGhlIEFuZ3VsYXIgaTE4biBndWlkZS5cbiAqIFNlZSB0aGUgaTE4biBkZW1vIGZvciBob3cgdG8gZXh0ZW5kIHRoaXMgY2xhc3MgYW5kIGRlZmluZSBhIGN1c3RvbSBwcm92aWRlciBmb3IgaTE4bi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkRhdGVwaWNrZXJJMThuIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNob3J0IHdlZWtkYXkgbmFtZSB0byBkaXNwbGF5IGluIHRoZSBoZWFkaW5nIG9mIHRoZSBtb250aCB2aWV3LlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRXZWVrZGF5U2hvcnROYW1lKHdlZWtkYXk6IG51bWJlcik6IHN0cmluZztcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2hvcnQgbW9udGggbmFtZSB0byBkaXNwbGF5IGluIHRoZSBkYXRlIHBpY2tlciBuYXZpZ2F0aW9uLlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWNcbiAgICovXG4gIGFic3RyYWN0IGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZ1bGwgbW9udGggbmFtZSB0byBkaXNwbGF5IGluIHRoZSBkYXRlIHBpY2tlciBuYXZpZ2F0aW9uLlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFudWFyeSAuLi4gMTI9RGVjZW1iZXJcbiAgICovXG4gIGFic3RyYWN0IGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlcik6IHN0cmluZztcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlICdhcmlhLWxhYmVsJyBhdHRyaWJ1dGUgZm9yIGEgc3BlY2lmaWMgZGF0ZVxuICAgKlxuICAgKiBAc2luY2UgMi4wLjBcbiAgICovXG4gIGFic3RyYWN0IGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0IGV4dGVuZHMgTmdiRGF0ZXBpY2tlckkxOG4ge1xuICBwcml2YXRlIF93ZWVrZGF5c1Nob3J0OiBBcnJheTxzdHJpbmc+O1xuICBwcml2YXRlIF9tb250aHNTaG9ydDogQXJyYXk8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbW9udGhzRnVsbDogQXJyYXk8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcsIHByaXZhdGUgX2RhdGVQaXBlOiBEYXRlUGlwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXkgPSBnZXRMb2NhbGVEYXlOYW1lcyhfbG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5TaG9ydCk7XG4gICAgdGhpcy5fd2Vla2RheXNTaG9ydCA9IHdlZWtkYXlzU3RhcnRpbmdPblN1bmRheS5tYXAoKGRheSwgaW5kZXgpID0+IHdlZWtkYXlzU3RhcnRpbmdPblN1bmRheVsoaW5kZXggKyAxKSAlIDddKTtcblxuICAgIHRoaXMuX21vbnRoc1Nob3J0ID0gZ2V0TG9jYWxlTW9udGhOYW1lcyhfbG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZCk7XG4gICAgdGhpcy5fbW9udGhzRnVsbCA9IGdldExvY2FsZU1vbnRoTmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguV2lkZSk7XG4gIH1cblxuICBnZXRXZWVrZGF5U2hvcnROYW1lKHdlZWtkYXk6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0W3dlZWtkYXkgLSAxXTsgfVxuXG4gIGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRbbW9udGggLSAxXTsgfVxuXG4gIGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLl9tb250aHNGdWxsW21vbnRoIC0gMV07IH1cblxuICBnZXREYXlBcmlhTGFiZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XG4gICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXkpO1xuICAgIHJldHVybiB0aGlzLl9kYXRlUGlwZS50cmFuc2Zvcm0oanNEYXRlLCAnZnVsbERhdGUnLCBudWxsLCB0aGlzLl9sb2NhbGUpO1xuICB9XG59XG4iLCJpbXBvcnQge05nYkNhbGVuZGFyLCBOZ2JQZXJpb2R9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmdiTWFya0Rpc2FibGVkfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc0ludGVnZXIsIHRvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBidWlsZE1vbnRocyxcbiAgY2hlY2tEYXRlSW5SYW5nZSxcbiAgY2hlY2tNaW5CZWZvcmVNYXgsXG4gIGlzQ2hhbmdlZERhdGUsXG4gIGlzRGF0ZVNlbGVjdGFibGUsXG4gIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMsXG4gIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzLFxuICBwcmV2TW9udGhEaXNhYmxlZCxcbiAgbmV4dE1vbnRoRGlzYWJsZWRcbn0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcblxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbW9kZWwkID0gbmV3IFN1YmplY3Q8RGF0ZXBpY2tlclZpZXdNb2RlbD4oKTtcblxuICBwcml2YXRlIF9zZWxlY3QkID0gbmV3IFN1YmplY3Q8TmdiRGF0ZT4oKTtcblxuICBwcml2YXRlIF9zdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZGlzcGxheU1vbnRoczogMSxcbiAgICBmaXJzdERheU9mV2VlazogMSxcbiAgICBmb2N1c1Zpc2libGU6IGZhbHNlLFxuICAgIG1vbnRoczogW10sXG4gICAgbmF2aWdhdGlvbjogJ3NlbGVjdCcsXG4gICAgb3V0c2lkZURheXM6ICd2aXNpYmxlJyxcbiAgICBwcmV2RGlzYWJsZWQ6IGZhbHNlLFxuICAgIG5leHREaXNhYmxlZDogZmFsc2UsXG4gICAgc2VsZWN0Qm94ZXM6IHt5ZWFyczogW10sIG1vbnRoczogW119LFxuICAgIHNlbGVjdGVkRGF0ZTogbnVsbFxuICB9O1xuXG4gIGdldCBtb2RlbCQoKTogT2JzZXJ2YWJsZTxEYXRlcGlja2VyVmlld01vZGVsPiB7IHJldHVybiB0aGlzLl9tb2RlbCQucGlwZShmaWx0ZXIobW9kZWwgPT4gbW9kZWwubW9udGhzLmxlbmd0aCA+IDApKTsgfVxuXG4gIGdldCBzZWxlY3QkKCk6IE9ic2VydmFibGU8TmdiRGF0ZT4geyByZXR1cm4gdGhpcy5fc2VsZWN0JC5waXBlKGZpbHRlcihkYXRlID0+IGRhdGUgIT09IG51bGwpKTsgfVxuXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7ZGlzYWJsZWR9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgZGlzcGxheU1vbnRocyhkaXNwbGF5TW9udGhzOiBudW1iZXIpIHtcbiAgICBkaXNwbGF5TW9udGhzID0gdG9JbnRlZ2VyKGRpc3BsYXlNb250aHMpO1xuICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtkaXNwbGF5TW9udGhzfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IGZpcnN0RGF5T2ZXZWVrKGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICBmaXJzdERheU9mV2VlayA9IHRvSW50ZWdlcihmaXJzdERheU9mV2Vlayk7XG4gICAgaWYgKGlzSW50ZWdlcihmaXJzdERheU9mV2VlaykgJiYgZmlyc3REYXlPZldlZWsgPj0gMCAmJiB0aGlzLl9zdGF0ZS5maXJzdERheU9mV2VlayAhPT0gZmlyc3REYXlPZldlZWspIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zmlyc3REYXlPZldlZWt9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgZm9jdXNWaXNpYmxlKGZvY3VzVmlzaWJsZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5mb2N1c1Zpc2libGUgIT09IGZvY3VzVmlzaWJsZSAmJiAhdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zm9jdXNWaXNpYmxlfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG1heERhdGUoZGF0ZTogTmdiRGF0ZVN0cnVjdCkge1xuICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLm1heERhdGUsIG1heERhdGUpKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21heERhdGV9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgbWFya0Rpc2FibGVkKG1hcmtEaXNhYmxlZDogTmdiTWFya0Rpc2FibGVkKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLm1hcmtEaXNhYmxlZCAhPT0gbWFya0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21hcmtEaXNhYmxlZH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBtaW5EYXRlKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpIHtcbiAgICBjb25zdCBtaW5EYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcbiAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5taW5EYXRlLCBtaW5EYXRlKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHttaW5EYXRlfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG5hdmlnYXRpb24obmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJykge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe25hdmlnYXRpb259KTtcbiAgICB9XG4gIH1cblxuICBzZXQgb3V0c2lkZURheXMob3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbicpIHtcbiAgICBpZiAodGhpcy5fc3RhdGUub3V0c2lkZURheXMgIT09IG91dHNpZGVEYXlzKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe291dHNpZGVEYXlzfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwcml2YXRlIF9pMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuICBmb2N1cyhkYXRlOiBOZ2JEYXRlKSB7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCAmJiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKGRhdGUpICYmIGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBkYXRlKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c0RhdGU6IGRhdGV9KTtcbiAgICB9XG4gIH1cblxuICBmb2N1c01vdmUocGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpIHtcbiAgICB0aGlzLmZvY3VzKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBwZXJpb2QsIG51bWJlcikpO1xuICB9XG5cbiAgZm9jdXNTZWxlY3QoKSB7XG4gICAgaWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKSk7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmaXJzdERhdGV9KTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QoZGF0ZTogTmdiRGF0ZSwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmICghdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICB0aGlzLl9uZXh0U3RhdGUoe3NlbGVjdGVkRGF0ZX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5lbWl0RXZlbnQgJiYgaXNEYXRlU2VsZWN0YWJsZShzZWxlY3RlZERhdGUsIHRoaXMuX3N0YXRlKSkge1xuICAgICAgICB0aGlzLl9zZWxlY3QkLm5leHQoc2VsZWN0ZWREYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b1ZhbGlkRGF0ZShkYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9LCBkZWZhdWx0VmFsdWU/OiBOZ2JEYXRlKTogTmdiRGF0ZSB7XG4gICAgY29uc3QgbmdiRGF0ZSA9IE5nYkRhdGUuZnJvbShkYXRlKTtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuX2NhbGVuZGFyLmdldFRvZGF5KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPikge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUocGF0Y2gpO1xuICAgIHRoaXMuX3BhdGNoQ29udGV4dHMobmV3U3RhdGUpO1xuICAgIHRoaXMuX3N0YXRlID0gbmV3U3RhdGU7XG4gICAgdGhpcy5fbW9kZWwkLm5leHQodGhpcy5fc3RhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGF0Y2hDb250ZXh0cyhzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkge1xuICAgIGNvbnN0IHttb250aHMsIGRpc3BsYXlNb250aHMsIHNlbGVjdGVkRGF0ZSwgZm9jdXNEYXRlLCBmb2N1c1Zpc2libGUsIGRpc2FibGVkLCBvdXRzaWRlRGF5c30gPSBzdGF0ZTtcbiAgICBzdGF0ZS5tb250aHMuZm9yRWFjaChtb250aCA9PiB7XG4gICAgICBtb250aC53ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xuICAgICAgICB3ZWVrLmRheXMuZm9yRWFjaChkYXkgPT4ge1xuXG4gICAgICAgICAgLy8gcGF0Y2ggZm9jdXMgZmxhZ1xuICAgICAgICAgIGlmIChmb2N1c0RhdGUpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LmZvY3VzZWQgPSBmb2N1c0RhdGUuZXF1YWxzKGRheS5kYXRlKSAmJiBmb2N1c1Zpc2libGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2FsY3VsYXRpbmcgdGFiaW5kZXhcbiAgICAgICAgICBkYXkudGFiaW5kZXggPSAhZGlzYWJsZWQgJiYgZGF5LmRhdGUuZXF1YWxzKGZvY3VzRGF0ZSkgJiYgZm9jdXNEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIgPyAwIDogLTE7XG5cbiAgICAgICAgICAvLyBvdmVycmlkZSBjb250ZXh0IGRpc2FibGVkXG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcGF0Y2ggc2VsZWN0aW9uIGZsYWdcbiAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LnNlbGVjdGVkID0gc2VsZWN0ZWREYXRlICE9PSBudWxsICYmIHNlbGVjdGVkRGF0ZS5lcXVhbHMoZGF5LmRhdGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHZpc2liaWxpdHlcbiAgICAgICAgICBpZiAobW9udGgubnVtYmVyICE9PSBkYXkuZGF0ZS5tb250aCkge1xuICAgICAgICAgICAgZGF5LmhpZGRlbiA9IG91dHNpZGVEYXlzID09PSAnaGlkZGVuJyB8fCBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgfHxcbiAgICAgICAgICAgICAgICAoZGlzcGxheU1vbnRocyA+IDEgJiYgZGF5LmRhdGUuYWZ0ZXIobW9udGhzWzBdLmZpcnN0RGF0ZSkgJiZcbiAgICAgICAgICAgICAgICAgZGF5LmRhdGUuYmVmb3JlKG1vbnRoc1tkaXNwbGF5TW9udGhzIC0gMV0ubGFzdERhdGUpKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN0YXRlKHBhdGNoOiBQYXJ0aWFsPERhdGVwaWNrZXJWaWV3TW9kZWw+KTogRGF0ZXBpY2tlclZpZXdNb2RlbCB7XG4gICAgLy8gcGF0Y2hpbmcgZmllbGRzXG4gICAgY29uc3Qgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9zdGF0ZSwgcGF0Y2gpO1xuXG4gICAgbGV0IHN0YXJ0RGF0ZSA9IHN0YXRlLmZpcnN0RGF0ZTtcblxuICAgIC8vIG1pbi9tYXggZGF0ZXMgY2hhbmdlZFxuICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoKSB7XG4gICAgICBjaGVja01pbkJlZm9yZU1heChzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIHN0YXRlLmZvY3VzRGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZm9jdXNEYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZvY3VzRGF0ZTtcbiAgICB9XG5cbiAgICAvLyBkaXNhYmxlZFxuICAgIGlmICgnZGlzYWJsZWQnIGluIHBhdGNoKSB7XG4gICAgICBzdGF0ZS5mb2N1c1Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsIHJlYnVpbGQgdmlhICdzZWxlY3QoKSdcbiAgICBpZiAoJ3NlbGVjdGVkRGF0ZScgaW4gcGF0Y2ggJiYgdGhpcy5fc3RhdGUubW9udGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuc2VsZWN0ZWREYXRlO1xuICAgIH1cblxuICAgIC8vIGZvY3VzIGRhdGUgY2hhbmdlZFxuICAgIGlmICgnZm9jdXNEYXRlJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZm9jdXNEYXRlO1xuXG4gICAgICAvLyBub3RoaW5nIHRvIHJlYnVpbGQgaWYgb25seSBmb2N1cyBjaGFuZ2VkIGFuZCBpdCBpcyBzdGlsbCB2aXNpYmxlXG4gICAgICBpZiAoc3RhdGUubW9udGhzLmxlbmd0aCAhPT0gMCAmJiAhc3RhdGUuZm9jdXNEYXRlLmJlZm9yZShzdGF0ZS5maXJzdERhdGUpICYmXG4gICAgICAgICAgIXN0YXRlLmZvY3VzRGF0ZS5hZnRlcihzdGF0ZS5sYXN0RGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpcnN0IGRhdGUgY2hhbmdlZFxuICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xuICAgIH1cblxuICAgIC8vIHJlYnVpbGRpbmcgbW9udGhzXG4gICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgY29uc3QgZm9yY2VSZWJ1aWxkID0gJ2ZpcnN0RGF5T2ZXZWVrJyBpbiBwYXRjaCB8fCAnbWFya0Rpc2FibGVkJyBpbiBwYXRjaCB8fCAnbWluRGF0ZScgaW4gcGF0Y2ggfHxcbiAgICAgICAgICAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCB8fCAnb3V0c2lkZURheXMnIGluIHBhdGNoO1xuXG4gICAgICBjb25zdCBtb250aHMgPSBidWlsZE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhcnREYXRlLCBzdGF0ZSwgdGhpcy5faTE4biwgZm9yY2VSZWJ1aWxkKTtcblxuICAgICAgLy8gdXBkYXRpbmcgbW9udGhzIGFuZCBib3VuZGFyeSBkYXRlc1xuICAgICAgc3RhdGUubW9udGhzID0gbW9udGhzO1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gbW9udGhzLmxlbmd0aCA+IDAgPyBtb250aHNbMF0uZmlyc3REYXRlIDogdW5kZWZpbmVkO1xuICAgICAgc3RhdGUubGFzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1ttb250aHMubGVuZ3RoIC0gMV0ubGFzdERhdGUgOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIHJlc2V0IHNlbGVjdGVkIGRhdGUgaWYgJ21hcmtEaXNhYmxlZCcgcmV0dXJucyB0cnVlXG4gICAgICBpZiAoJ3NlbGVjdGVkRGF0ZScgaW4gcGF0Y2ggJiYgIWlzRGF0ZVNlbGVjdGFibGUoc3RhdGUuc2VsZWN0ZWREYXRlLCBzdGF0ZSkpIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0ZWREYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gYWRqdXN0aW5nIGZvY3VzIGFmdGVyIG1vbnRocyB3ZXJlIGJ1aWx0XG4gICAgICBpZiAoJ2ZpcnN0RGF0ZScgaW4gcGF0Y2gpIHtcbiAgICAgICAgaWYgKHN0YXRlLmZvY3VzRGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSB8fFxuICAgICAgICAgICAgc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xuICAgICAgICAgIHN0YXRlLmZvY3VzRGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhZGp1c3RpbmcgbW9udGhzL3llYXJzIGZvciB0aGUgc2VsZWN0IGJveCBuYXZpZ2F0aW9uXG4gICAgICBjb25zdCB5ZWFyQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLnllYXIgIT09IHN0YXRlLmZpcnN0RGF0ZS55ZWFyO1xuICAgICAgY29uc3QgbW9udGhDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUubW9udGggIT09IHN0YXRlLmZpcnN0RGF0ZS5tb250aDtcbiAgICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0Jykge1xuICAgICAgICAvLyB5ZWFycyAtPiAgYm91bmRhcmllcyAobWluL21heCB3ZXJlIGNoYW5nZWQpXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLnllYXJzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLnllYXJzID0gZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyhzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9udGhzIC0+IHdoZW4gY3VycmVudCB5ZWFyIG9yIGJvdW5kYXJpZXMgY2hhbmdlXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcy5tb250aHMgPVxuICAgICAgICAgICAgICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMgPSB7eWVhcnM6IFtdLCBtb250aHM6IFtdfTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRpbmcgbmF2aWdhdGlvbiBhcnJvd3MgLT4gYm91bmRhcmllcyBjaGFuZ2UgKG1pbi9tYXgpIG9yIG1vbnRoL3llYXIgY2hhbmdlc1xuICAgICAgaWYgKChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnYXJyb3dzJyB8fCBzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0JykgJiZcbiAgICAgICAgICAobW9udGhDaGFuZ2VkIHx8IHllYXJDaGFuZ2VkIHx8ICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCkpIHtcbiAgICAgICAgc3RhdGUucHJldkRpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgcHJldk1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSk7XG4gICAgICAgIHN0YXRlLm5leHREaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IG5leHRNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5sYXN0RGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iLCJleHBvcnQgZW51bSBLZXkge1xuICBUYWIgPSA5LFxuICBFbnRlciA9IDEzLFxuICBFc2NhcGUgPSAyNyxcbiAgU3BhY2UgPSAzMixcbiAgUGFnZVVwID0gMzMsXG4gIFBhZ2VEb3duID0gMzQsXG4gIEVuZCA9IDM1LFxuICBIb21lID0gMzYsXG4gIEFycm93TGVmdCA9IDM3LFxuICBBcnJvd1VwID0gMzgsXG4gIEFycm93UmlnaHQgPSAzOSxcbiAgQXJyb3dEb3duID0gNDBcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge3RvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSB7XG4gIHByaXZhdGUgX21pbkRhdGU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX21heERhdGU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX2ZpcnN0Vmlld0RhdGU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX2xhc3RWaWV3RGF0ZTogTmdiRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyKSB7XG4gICAgX3NlcnZpY2UubW9kZWwkLnN1YnNjcmliZShtb2RlbCA9PiB7XG4gICAgICB0aGlzLl9taW5EYXRlID0gbW9kZWwubWluRGF0ZTtcbiAgICAgIHRoaXMuX21heERhdGUgPSBtb2RlbC5tYXhEYXRlO1xuICAgICAgdGhpcy5fZmlyc3RWaWV3RGF0ZSA9IG1vZGVsLmZpcnN0RGF0ZTtcbiAgICAgIHRoaXMuX2xhc3RWaWV3RGF0ZSA9IG1vZGVsLmxhc3REYXRlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc0tleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChLZXlbdG9TdHJpbmcoZXZlbnQud2hpY2gpXSkge1xuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIEtleS5QYWdlVXA6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoZXZlbnQuc2hpZnRLZXkgPyAneScgOiAnbScsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuUGFnZURvd246XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoZXZlbnQuc2hpZnRLZXkgPyAneScgOiAnbScsIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5FbmQ6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMuX21heERhdGUgOiB0aGlzLl9sYXN0Vmlld0RhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5Ib21lOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXMoZXZlbnQuc2hpZnRLZXkgPyB0aGlzLl9taW5EYXRlIDogdGhpcy5fZmlyc3RWaWV3RGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIC10aGlzLl9jYWxlbmRhci5nZXREYXlzUGVyV2VlaygpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoJ2QnLCB0aGlzLl9jYWxlbmRhci5nZXREYXlzUGVyV2VlaygpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICAgIGNhc2UgS2V5LlNwYWNlOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNTZWxlY3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuXG5leHBvcnQgdHlwZSBOZ2JNYXJrRGlzYWJsZWQgPSAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XG5cbmV4cG9ydCB0eXBlIERheVZpZXdNb2RlbCA9IHtcbiAgZGF0ZTogTmdiRGF0ZSxcbiAgY29udGV4dDogRGF5VGVtcGxhdGVDb250ZXh0LFxuICB0YWJpbmRleDogbnVtYmVyLFxuICBhcmlhTGFiZWw6IHN0cmluZyxcbiAgaGlkZGVuOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIFdlZWtWaWV3TW9kZWwgPSB7XG4gIG51bWJlcjogbnVtYmVyLFxuICBkYXlzOiBEYXlWaWV3TW9kZWxbXSxcbiAgY29sbGFwc2VkOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIE1vbnRoVmlld01vZGVsID0ge1xuICBmaXJzdERhdGU6IE5nYkRhdGUsXG4gIGxhc3REYXRlOiBOZ2JEYXRlLFxuICBudW1iZXI6IG51bWJlcixcbiAgeWVhcjogbnVtYmVyLFxuICB3ZWVrczogV2Vla1ZpZXdNb2RlbFtdLFxuICB3ZWVrZGF5czogbnVtYmVyW11cbn07XG5cbi8vIGNsYW5nLWZvcm1hdCBvZmZcbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJWaWV3TW9kZWwgPSB7XG4gIGRpc2FibGVkOiBib29sZWFuLFxuICBkaXNwbGF5TW9udGhzOiBudW1iZXIsXG4gIGZpcnN0RGF0ZT86IE5nYkRhdGUsXG4gIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIsXG4gIGZvY3VzRGF0ZT86IE5nYkRhdGUsXG4gIGZvY3VzVmlzaWJsZTogYm9vbGVhbixcbiAgbGFzdERhdGU/OiBOZ2JEYXRlLFxuICBtYXJrRGlzYWJsZWQ/OiBOZ2JNYXJrRGlzYWJsZWQsXG4gIG1heERhdGU/OiBOZ2JEYXRlLFxuICBtaW5EYXRlPzogTmdiRGF0ZSxcbiAgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdLFxuICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnLFxuICBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyxcbiAgcHJldkRpc2FibGVkOiBib29sZWFuLFxuICBuZXh0RGlzYWJsZWQ6IGJvb2xlYW4sXG4gIHNlbGVjdEJveGVzOiB7XG4gICAgeWVhcnM6IG51bWJlcltdLFxuICAgIG1vbnRoczogbnVtYmVyW11cbiAgfSxcbiAgc2VsZWN0ZWREYXRlOiBOZ2JEYXRlXG59XG4vLyBjbGFuZy1mb3JtYXQgb25cblxuZXhwb3J0IGVudW0gTmF2aWdhdGlvbkV2ZW50IHtcbiAgUFJFVixcbiAgTkVYVFxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYkRhdGVwaWNrZXIgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGRhdGVwaWNrZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckNvbmZpZyB7XG4gIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xuICBkaXNwbGF5TW9udGhzID0gMTtcbiAgZmlyc3REYXlPZldlZWsgPSAxO1xuICBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlU3RydWN0LCBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYm9vbGVhbjtcbiAgbWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcbiAgbWF4RGF0ZTogTmdiRGF0ZVN0cnVjdDtcbiAgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJyA9ICdzZWxlY3QnO1xuICBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyA9ICd2aXNpYmxlJztcbiAgc2hvd1dlZWtkYXlzID0gdHJ1ZTtcbiAgc2hvd1dlZWtOdW1iZXJzID0gZmFsc2U7XG4gIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG4vKipcbiAqIEFic3RyYWN0IHR5cGUgc2VydmluZyBhcyBhIERJIHRva2VuIGZvciB0aGUgc2VydmljZSBjb252ZXJ0aW5nIGZyb20geW91ciBhcHBsaWNhdGlvbiBEYXRlIG1vZGVsIHRvIGludGVybmFsXG4gKiBOZ2JEYXRlU3RydWN0IG1vZGVsLlxuICogQSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGNvbnZlcnRpbmcgZnJvbSBhbmQgdG8gTmdiRGF0ZVN0cnVjdCBpcyBwcm92aWRlZCBmb3IgcmV0cm8tY29tcGF0aWJpbGl0eSxcbiAqIGJ1dCB5b3UgY2FuIHByb3ZpZGUgYW5vdGhlciBpbXBsZW1lbnRhdGlvbiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0LCBpZSBmb3IgdXNpbmcgd2l0aCBuYXRpdmUgRGF0ZSBPYmplY3QuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlQWRhcHRlcjxUPiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0cyB1c2VyLW1vZGVsIGRhdGUgaW50byBhbiBOZ2JEYXRlU3RydWN0IGZvciBpbnRlcm5hbCB1c2UgaW4gdGhlIGxpYnJhcnlcbiAgICovXG4gIGFic3RyYWN0IGZyb21Nb2RlbCh2YWx1ZTogVCk6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGludGVybmFsIGRhdGUgdmFsdWUgTmdiRGF0ZVN0cnVjdCB0byB1c2VyLW1vZGVsIGRhdGVcbiAgICogVGhlIHJldHVybmVkIHR5cGUgaXMgc3Vwb3NlZCB0byBiZSBvZiB0aGUgc2FtZSB0eXBlIGFzIGZyb21Nb2RlbCgpIGlucHV0LXZhbHVlIHBhcmFtXG4gICAqL1xuICBhYnN0cmFjdCB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBUO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIgZXh0ZW5kcyBOZ2JEYXRlQWRhcHRlcjxOZ2JEYXRlU3RydWN0PiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXG4gICAqL1xuICBmcm9tTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIHJldHVybiAoZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCAmJiBkYXRlLmRheSkgPyB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheX0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTmdiRGF0ZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYkRhdGVTdHJ1Y3QgdmFsdWVcbiAgICovXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIHJldHVybiAoZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCAmJiBkYXRlLmRheSkgPyB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheX0gOiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgZm9yd2FyZFJlZixcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlclNlcnZpY2V9IGZyb20gJy4vZGF0ZXBpY2tlci1zZXJ2aWNlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlcktleU1hcFNlcnZpY2V9IGZyb20gJy4vZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZSc7XG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5hdmlnYXRpb25FdmVudH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJDb25maWd9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25maWcnO1xuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHtpc0NoYW5nZWREYXRlfSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xuXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgZGF0ZXBpY2tlciBuYXZpZ2F0aW9uIGV2ZW50XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQge1xuICAvKipcbiAgICogQ3VycmVudGx5IGRpc3BsYXllZCBtb250aFxuICAgKi9cbiAgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XG5cbiAgLyoqXG4gICAqIE1vbnRoIHdlJ3JlIG5hdmlnYXRpbmcgdG9cbiAgICovXG4gIG5leHQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xufVxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGhpZ2hseSBjb25maWd1cmFibGUgZGF0ZXBpY2tlciBkaXJlY3RpdmVcbiAqL1xuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZmRmZGY7XG4gICAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICAubmdiLWRwLW1vbnRoIHtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cbiAgICAubmdiLWRwLWhlYWRlciB7XG4gICAgICBib3JkZXItYm90dG9tOiAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbSAwLjI1cmVtIDAgMDtcbiAgICAgIHBhZGRpbmctdG9wOiAwLjI1cmVtO1xuICAgIH1cbiAgICBuZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3IHtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgIH1cbiAgICAubmdiLWRwLW1vbnRoLW5hbWUge1xuICAgICAgZm9udC1zaXplOiBsYXJnZXI7XG4gICAgICBoZWlnaHQ6IDJyZW07XG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgL2RlZXAvIC5uZ2ItZHAtbW9udGggKyAubmdiLWRwLW1vbnRoID4gbmdiLWRhdGVwaWNrZXItbW9udGgtdmlldyA+IC5uZ2ItZHAtd2VlayB7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gICAgfVxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoICsgLm5nYi1kcC1tb250aCA+IC5uZ2ItZHAtbW9udGgtbmFtZSB7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gICAgfVxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoOmxhc3QtY2hpbGQgLm5nYi1kcC13ZWVrIHtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IC4yNXJlbTtcbiAgICB9XG4gICAgL2RlZXAvIC5uZ2ItZHAtbW9udGg6Zmlyc3QtY2hpbGQgLm5nYi1kcC13ZWVrIHtcbiAgICAgIHBhZGRpbmctbGVmdDogLjI1cmVtO1xuICAgIH1cbiAgICAvZGVlcC8gLm5nYi1kcC1tb250aCA+IG5nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXcgPiAubmdiLWRwLXdlZWs6bGFzdC1jaGlsZCB7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogLjI1cmVtO1xuICAgIH1cbiAgICAubmdiLWRwLW1vbnRocyB7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICBgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2R0IGxldC1kYXRlPVwiZGF0ZVwiIGxldC1jdXJyZW50TW9udGg9XCJjdXJyZW50TW9udGhcIiBsZXQtc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiIGxldC1kaXNhYmxlZD1cImRpc2FibGVkXCIgbGV0LWZvY3VzZWQ9XCJmb2N1c2VkXCI+XG4gICAgICA8ZGl2IG5nYkRhdGVwaWNrZXJEYXlWaWV3XG4gICAgICAgIFtkYXRlXT1cImRhdGVcIlxuICAgICAgICBbY3VycmVudE1vbnRoXT1cImN1cnJlbnRNb250aFwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFtmb2N1c2VkXT1cImZvY3VzZWRcIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWhlYWRlciBiZy1saWdodFwiPlxuICAgICAgPG5nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24gKm5nSWY9XCJuYXZpZ2F0aW9uICE9PSAnbm9uZSdcIlxuICAgICAgICBbZGF0ZV09XCJtb2RlbC5maXJzdERhdGVcIlxuICAgICAgICBbbW9udGhzXT1cIm1vZGVsLm1vbnRoc1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJtb2RlbC5kaXNhYmxlZFwiXG4gICAgICAgIFtzaG93U2VsZWN0XT1cIm1vZGVsLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnXCJcbiAgICAgICAgW3ByZXZEaXNhYmxlZF09XCJtb2RlbC5wcmV2RGlzYWJsZWRcIlxuICAgICAgICBbbmV4dERpc2FibGVkXT1cIm1vZGVsLm5leHREaXNhYmxlZFwiXG4gICAgICAgIFtzZWxlY3RCb3hlc109XCJtb2RlbC5zZWxlY3RCb3hlc1wiXG4gICAgICAgIChuYXZpZ2F0ZSk9XCJvbk5hdmlnYXRlRXZlbnQoJGV2ZW50KVwiXG4gICAgICAgIChzZWxlY3QpPVwib25OYXZpZ2F0ZURhdGVTZWxlY3QoJGV2ZW50KVwiPlxuICAgICAgPC9uZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1tb250aHNcIiAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiIChmb2N1c2luKT1cInNob3dGb2N1cyh0cnVlKVwiIChmb2N1c291dCk9XCJzaG93Rm9jdXMoZmFsc2UpXCI+XG4gICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW1vbnRoIFtuZ0Zvck9mXT1cIm1vZGVsLm1vbnRoc1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1tb250aFwiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJuYXZpZ2F0aW9uID09PSAnbm9uZScgfHwgKGRpc3BsYXlNb250aHMgPiAxICYmIG5hdmlnYXRpb24gPT09ICdzZWxlY3QnKVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZSBiZy1saWdodFwiPlxuICAgICAgICAgICAge3sgaTE4bi5nZXRNb250aEZ1bGxOYW1lKG1vbnRoLm51bWJlcikgfX0ge3sgbW9udGgueWVhciB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxuZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3XG4gICAgICAgICAgICBbbW9udGhdPVwibW9udGhcIlxuICAgICAgICAgICAgW2RheVRlbXBsYXRlXT1cImRheVRlbXBsYXRlIHx8IGR0XCJcbiAgICAgICAgICAgIFtzaG93V2Vla2RheXNdPVwic2hvd1dlZWtkYXlzXCJcbiAgICAgICAgICAgIFtzaG93V2Vla051bWJlcnNdPVwic2hvd1dlZWtOdW1iZXJzXCJcbiAgICAgICAgICAgIChzZWxlY3QpPVwib25EYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgICA8L25nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsIE5nYkRhdGVwaWNrZXJTZXJ2aWNlLCBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uRGVzdHJveSxcbiAgICBPbkNoYW5nZXMsIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBtb2RlbDogRGF0ZXBpY2tlclZpZXdNb2RlbDtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfc2VsZWN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgZm9yIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXkgZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheU1vbnRoczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBGaXJzdCBkYXkgb2YgdGhlIHdlZWsuIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW5cbiAgICovXG4gIEBJbnB1dCgpIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIG1hcmsgYSBnaXZlbiBkYXRlIGFzIGRpc2FibGVkLlxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBNYXggZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGFmdGVyIGN1cnJlbnQgbW9udGhcbiAgICovXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE1pbiBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYmVmb3JlIGN1cnJlbnQgbW9udGhcbiAgICovXG4gIEBJbnB1dCgpIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gdHlwZTogYHNlbGVjdGAgKGRlZmF1bHQgd2l0aCBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCB5ZWFyKSwgYGFycm93c2BcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxuICAgKi9cbiAgQElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuICAvKipcbiAgICogVGhlIHdheSB0byBkaXNwbGF5IGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gY3VycmVudCBtb250aDogYHZpc2libGVgIChkZWZhdWx0KSxcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxuICAgKi9cbiAgQElucHV0KCkgb3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbic7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSBkYXlzIG9mIHRoZSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBzaG93V2Vla2RheXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSB3ZWVrIG51bWJlcnNcbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQsIGNhbGVuZGFyIHdpbGwgb3BlbiB3aXRoIGN1cnJlbnQgbW9udGguXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXG4gICAqIFNlZSBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCBmb3IgdGhlIHBheWxvYWQgaW5mby5cbiAgICovXG4gIEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3RzIGEgZGF0ZSB1c2luZyBrZXlib2FyZCBvciBtb3VzZS5cbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlU3RydWN0LlxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZVN0cnVjdD4oKTtcblxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2tleU1hcFNlcnZpY2U6IE5nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlLCBwdWJsaWMgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sIGNvbmZpZzogTmdiRGF0ZXBpY2tlckNvbmZpZyxcbiAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcml2YXRlIF9uZ2JEYXRlQWRhcHRlcjogTmdiRGF0ZUFkYXB0ZXI8YW55PiwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcbiAgICBbJ2RheVRlbXBsYXRlJywgJ2Rpc3BsYXlNb250aHMnLCAnZmlyc3REYXlPZldlZWsnLCAnbWFya0Rpc2FibGVkJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsICduYXZpZ2F0aW9uJyxcbiAgICAgJ291dHNpZGVEYXlzJywgJ3Nob3dXZWVrZGF5cycsICdzaG93V2Vla051bWJlcnMnLCAnc3RhcnREYXRlJ11cbiAgICAgICAgLmZvckVhY2goaW5wdXQgPT4gdGhpc1tpbnB1dF0gPSBjb25maWdbaW5wdXRdKTtcblxuICAgIHRoaXMuX3NlbGVjdFN1YnNjcmlwdGlvbiA9IF9zZXJ2aWNlLnNlbGVjdCQuc3Vic2NyaWJlKGRhdGUgPT4geyB0aGlzLnNlbGVjdC5lbWl0KGRhdGUudG9TdHJ1Y3QoKSk7IH0pO1xuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gX3NlcnZpY2UubW9kZWwkLnN1YnNjcmliZShtb2RlbCA9PiB7XG4gICAgICBjb25zdCBuZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xuICAgICAgY29uc3Qgb2xkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZpcnN0RGF0ZSA6IG51bGw7XG4gICAgICBjb25zdCBuZXdTZWxlY3RlZERhdGUgPSBtb2RlbC5zZWxlY3RlZERhdGU7XG4gICAgICBjb25zdCBvbGRTZWxlY3RlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5zZWxlY3RlZERhdGUgOiBudWxsO1xuICAgICAgY29uc3QgbmV3Rm9jdXNlZERhdGUgPSBtb2RlbC5mb2N1c0RhdGU7XG4gICAgICBjb25zdCBvbGRGb2N1c2VkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZvY3VzRGF0ZSA6IG51bGw7XG5cbiAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgLy8gaGFuZGxpbmcgc2VsZWN0aW9uIGNoYW5nZVxuICAgICAgaWYgKGlzQ2hhbmdlZERhdGUobmV3U2VsZWN0ZWREYXRlLCBvbGRTZWxlY3RlZERhdGUpKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChuZXdTZWxlY3RlZERhdGUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxpbmcgZm9jdXMgY2hhbmdlXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdGb2N1c2VkRGF0ZSwgb2xkRm9jdXNlZERhdGUpICYmIG9sZEZvY3VzZWREYXRlICYmIG1vZGVsLmZvY3VzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXR0aW5nIG5hdmlnYXRpb24gZXZlbnQgaWYgdGhlIGZpcnN0IG1vbnRoIGNoYW5nZXNcbiAgICAgIGlmICghbmV3RGF0ZS5lcXVhbHMob2xkRGF0ZSkpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHtcbiAgICAgICAgICBjdXJyZW50OiBvbGREYXRlID8ge3llYXI6IG9sZERhdGUueWVhciwgbW9udGg6IG9sZERhdGUubW9udGh9IDogbnVsbCxcbiAgICAgICAgICBuZXh0OiB7eWVhcjogbmV3RGF0ZS55ZWFyLCBtb250aDogbmV3RGF0ZS5tb250aH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBfY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgZm9jdXMgdGhlIGZvY3VzYWJsZSBkYXkgaW4gdGhlIGRhdGVwaWNrZXJcbiAgICovXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTERpdkVsZW1lbnQ+KCdkaXYubmdiLWRwLWRheVt0YWJpbmRleD1cIjBcIl0nKTtcbiAgICAgIGlmIChlbGVtZW50VG9Gb2N1cykge1xuICAgICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyBjdXJyZW50IHZpZXcgdG8gcHJvdmlkZWQgZGF0ZS5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxuICAgKiBJZiBub3RoaW5nIG9yIGludmFsaWQgZGF0ZSBwcm92aWRlZCBjYWxlbmRhciB3aWxsIG9wZW4gY3VycmVudCBtb250aC5cbiAgICogVXNlICdzdGFydERhdGUnIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlXG4gICAqL1xuICBuYXZpZ2F0ZVRvKGRhdGU/OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgeyB0aGlzLl9zZXJ2aWNlLm9wZW4oTmdiRGF0ZS5mcm9tKGRhdGUpKTsgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlbGVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgWydkaXNwbGF5TW9udGhzJywgJ21hcmtEaXNhYmxlZCcsICdmaXJzdERheU9mV2VlaycsICduYXZpZ2F0aW9uJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsICdvdXRzaWRlRGF5cyddLmZvckVhY2goXG4gICAgICAgICAgaW5wdXQgPT4gdGhpcy5fc2VydmljZVtpbnB1dF0gPSB0aGlzW2lucHV0XSk7XG4gICAgICB0aGlzLm5hdmlnYXRlVG8odGhpcy5zdGFydERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBbJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJywgJ291dHNpZGVEYXlzJ11cbiAgICAgICAgLmZpbHRlcihpbnB1dCA9PiBpbnB1dCBpbiBjaGFuZ2VzKVxuICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiB0aGlzLl9zZXJ2aWNlW2lucHV0XSA9IHRoaXNbaW5wdXRdKTtcblxuICAgIGlmICgnc3RhcnREYXRlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLm5hdmlnYXRlVG8odGhpcy5zdGFydERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGF0ZVNlbGVjdChkYXRlOiBOZ2JEYXRlKSB7XG4gICAgdGhpcy5fc2VydmljZS5mb2N1cyhkYXRlKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNlbGVjdChkYXRlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHsgdGhpcy5fa2V5TWFwU2VydmljZS5wcm9jZXNzS2V5KGV2ZW50KTsgfVxuXG4gIG9uTmF2aWdhdGVEYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHsgdGhpcy5fc2VydmljZS5vcGVuKGRhdGUpOyB9XG5cbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICBjYXNlIE5hdmlnYXRpb25FdmVudC5QUkVWOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOYXZpZ2F0aW9uRXZlbnQuTkVYVDpcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5tb2RlbC5maXJzdERhdGUsICdtJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLl9zZXJ2aWNlLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxuXG4gIHNob3dGb2N1cyhmb2N1c1Zpc2libGU6IGJvb2xlYW4pIHsgdGhpcy5fc2VydmljZS5mb2N1c1Zpc2libGUgPSBmb2N1c1Zpc2libGU7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7IHRoaXMuX3NlcnZpY2Uuc2VsZWN0KE5nYkRhdGUuZnJvbSh0aGlzLl9uZ2JEYXRlQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpKSk7IH1cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TW9udGhWaWV3TW9kZWwsIERheVZpZXdNb2RlbH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3JyxcbiAgaG9zdDogeydyb2xlJzogJ2dyaWQnfSxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICAubmdiLWRwLXdlZWtkYXksIC5uZ2ItZHAtd2Vlay1udW1iZXIge1xuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIC5uZ2ItZHAtd2Vla2RheSB7XG4gICAgICBjb2xvcjogIzViYzBkZTtcbiAgICAgIGNvbG9yOiB2YXIoLS1pbmZvKTtcbiAgICB9XG4gICAgLm5nYi1kcC13ZWVrIHtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIC5uZ2ItZHAtd2Vla2RheXMge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMjUpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICB9XG4gICAgLm5nYi1kcC1kYXksIC5uZ2ItZHAtd2Vla2RheSwgLm5nYi1kcC13ZWVrLW51bWJlciB7XG4gICAgICB3aWR0aDogMnJlbTtcbiAgICAgIGhlaWdodDogMnJlbTtcbiAgICB9XG4gICAgLm5nYi1kcC1kYXkge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbiAgICAubmdiLWRwLWRheS5kaXNhYmxlZCwgLm5nYi1kcC1kYXkuaGlkZGVuIHtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICB9XG4gIGBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla2RheXNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrIG5nYi1kcC13ZWVrZGF5cyBiZy1saWdodFwiPlxuICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrTnVtYmVyc1wiIGNsYXNzPVwibmdiLWRwLXdlZWtkYXkgbmdiLWRwLXNob3d3ZWVrXCI+PC9kaXY+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB3IG9mIG1vbnRoLndlZWtkYXlzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla2RheSBzbWFsbFwiPlxuICAgICAgICB7eyBpMThuLmdldFdlZWtkYXlTaG9ydE5hbWUodykgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtd2VlayBbbmdGb3JPZl09XCJtb250aC53ZWVrc1wiPlxuICAgICAgPGRpdiAqbmdJZj1cIiF3ZWVrLmNvbGxhcHNlZFwiIGNsYXNzPVwibmdiLWRwLXdlZWtcIiByb2xlPVwicm93XCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrLW51bWJlciBzbWFsbCB0ZXh0LW11dGVkXCI+e3sgd2Vlay5udW1iZXIgfX08L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiIChjbGljayk9XCJkb1NlbGVjdChkYXkpXCIgY2xhc3M9XCJuZ2ItZHAtZGF5XCIgcm9sZT1cImdyaWRjZWxsXCJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGF5LmNvbnRleHQuZGlzYWJsZWRcIlxuICAgICAgICAgIFt0YWJpbmRleF09XCJkYXkudGFiaW5kZXhcIlxuICAgICAgICAgIFtjbGFzcy5oaWRkZW5dPVwiZGF5LmhpZGRlblwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJkYXkuYXJpYUxhYmVsXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFkYXkuaGlkZGVuXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGF5VGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF5LmNvbnRleHRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTW9udGhWaWV3IHtcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG4gIEBJbnB1dCgpIG1vbnRoOiBNb250aFZpZXdNb2RlbDtcbiAgQElucHV0KCkgc2hvd1dlZWtkYXlzO1xuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnM7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XG5cbiAgZG9TZWxlY3QoZGF5OiBEYXlWaWV3TW9kZWwpIHtcbiAgICBpZiAoIWRheS5jb250ZXh0LmRpc2FibGVkICYmICFkYXkuaGlkZGVuKSB7XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KE5nYkRhdGUuZnJvbShkYXkuZGF0ZSkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uRXZlbnQsIE1vbnRoVmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG4vLyBUaGUgLW1zLSBhbmQgLXdlYmtpdC0gZWxlbWVudCBmb3IgdGhlIENTUyBjYW4gYmUgcmVtb3ZlZCBpZiB3ZSBhcmUgZ2VuZXJhdGluZyB0aGUgQ1NTIHVzaW5nIFNBU1MuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICAubmdiLWRwLW5hdmlnYXRpb24tY2hldnJvbiB7XG4gICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgYm9yZGVyLXdpZHRoOiAwLjJlbSAwLjJlbSAwIDA7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB3aWR0aDogMC43NWVtO1xuICAgICAgaGVpZ2h0OiAwLjc1ZW07XG4gICAgICBtYXJnaW4tbGVmdDogMC4yNWVtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjE1ZW07XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTM1ZGVnKTtcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtMTM1ZGVnKTtcbiAgICB9XG4gICAgLnJpZ2h0IC5uZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uIHtcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICBtYXJnaW4tbGVmdDogMC4xNWVtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjI1ZW07XG4gICAgfVxuICAgIC5uZ2ItZHAtYXJyb3cge1xuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgLW1zLWZsZXg6IDEgMSBhdXRvO1xuICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIHdpZHRoOiAycmVtO1xuICAgICAgaGVpZ2h0OiAycmVtO1xuICAgIH1cbiAgICAubmdiLWRwLWFycm93LnJpZ2h0IHtcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGVuZDtcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgfVxuICAgIC5uZ2ItZHAtYXJyb3ctYnRuIHtcbiAgICAgIHBhZGRpbmc6IDAgMC4yNXJlbTtcbiAgICAgIG1hcmdpbjogMCAwLjVyZW07XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIHotaW5kZXg6IDE7XG4gICAgfVxuICAgIC5uZ2ItZHAtYXJyb3ctYnRuOmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IGF1dG8gMXB4O1xuICAgIH1cbiAgICAubmdiLWRwLW1vbnRoLW5hbWUge1xuICAgICAgZm9udC1zaXplOiBsYXJnZXI7XG4gICAgICBoZWlnaHQ6IDJyZW07XG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgLm5nYi1kcC1uYXZpZ2F0aW9uLXNlbGVjdCB7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAtbXMtZmxleDogMSAxIDlyZW07XG4gICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICBmbGV4LWJhc2lzOiA5cmVtO1xuICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCIhIW5hdmlnYXRlLmVtaXQobmF2aWdhdGlvbi5QUkVWKVwiIFtkaXNhYmxlZF09XCJwcmV2RGlzYWJsZWRcIlxuICAgICAgICAgICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIucHJldmlvdXMtbW9udGhcIiB0aXRsZT1cIlByZXZpb3VzIG1vbnRoXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCAqbmdJZj1cInNob3dTZWxlY3RcIiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLXNlbGVjdFwiXG4gICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgIFtkaXNhYmxlZF0gPSBcImRpc2FibGVkXCJcbiAgICAgIFttb250aHNdPVwic2VsZWN0Qm94ZXMubW9udGhzXCJcbiAgICAgIFt5ZWFyc109XCJzZWxlY3RCb3hlcy55ZWFyc1wiXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIj5cbiAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0PlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiIXNob3dTZWxlY3RcIiBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSA+IDBcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxuICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyKSB9fSB7eyBtb250aC55ZWFyIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIiAqbmdJZj1cImkgIT09IG1vbnRocy5sZW5ndGggLSAxXCI+PC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93IHJpZ2h0XCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBuZ2ItZHAtYXJyb3ctYnRuXCIgKGNsaWNrKT1cIiEhbmF2aWdhdGUuZW1pdChuYXZpZ2F0aW9uLk5FWFQpXCIgW2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIHRpdGxlPVwiTmV4dCBtb250aFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uIHtcbiAgbmF2aWdhdGlvbiA9IE5hdmlnYXRpb25FdmVudDtcblxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdID0gW107XG4gIEBJbnB1dCgpIHNob3dTZWxlY3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHByZXZEaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RCb3hlczoge3llYXJzOiBudW1iZXJbXSwgbW9udGhzOiBudW1iZXJbXX07XG5cbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxufVxuIiwiaW1wb3J0IHtwYWROdW1iZXIsIHRvSW50ZWdlciwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcblxuLyoqXG4gKiBBYnN0cmFjdCB0eXBlIHNlcnZpbmcgYXMgYSBESSB0b2tlbiBmb3IgdGhlIHNlcnZpY2UgcGFyc2luZyBhbmQgZm9ybWF0dGluZyBkYXRlcyBmb3IgdGhlIE5nYklucHV0RGF0ZXBpY2tlclxuICogZGlyZWN0aXZlLiBBIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNpbmcgdGhlIElTTyA4NjAxIGZvcm1hdCBpcyBwcm92aWRlZCwgYnV0IHlvdSBjYW4gcHJvdmlkZSBhbm90aGVyIGltcGxlbWVudGF0aW9uXG4gKiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiRGF0ZVBhcnNlckZvcm1hdHRlciB7XG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHZhbHVlIHRvIGFuIE5nYkRhdGVTdHJ1Y3QuIEltcGxlbWVudGF0aW9ucyBzaG91bGQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHJlc3VsdCwgZXZlblxuICAgKiBwYXJ0aWFsLiBUaGV5IG11c3QgcmV0dXJuIG51bGwgaWYgdGhlIHZhbHVlIGNhbid0IGJlIHBhcnNlZC5cbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byBwYXJzZVxuICAgKi9cbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgdGhlIGdpdmVuIGRhdGUgdG8gYSBzdHJpbmcuIEltcGxlbWVudGF0aW9ucyBzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBudWxsLFxuICAgKiBhbmQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHBhcnRpYWwgcmVzdWx0IGlmIHRoZSBnaXZlbiBkYXRlIGlzIGluY29tcGxldGUgb3IgaW52YWxpZC5cbiAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gZm9ybWF0IGFzIGEgc3RyaW5nXG4gICAqL1xuICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE5nYkRhdGVJU09QYXJzZXJGb3JtYXR0ZXIgZXh0ZW5kcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcbiAgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgZGF0ZVBhcnRzID0gdmFsdWUudHJpbSgpLnNwbGl0KCctJyk7XG4gICAgICBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMSAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pKSB7XG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiBudWxsLCBkYXk6IG51bGx9O1xuICAgICAgfSBlbHNlIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAyICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzFdKSkge1xuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogdG9JbnRlZ2VyKGRhdGVQYXJ0c1sxXSksIGRheTogbnVsbH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDMgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1syXSkpIHtcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IHRvSW50ZWdlcihkYXRlUGFydHNbMV0pLCBkYXk6IHRvSW50ZWdlcihkYXRlUGFydHNbMl0pfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGUgP1xuICAgICAgICBgJHtkYXRlLnllYXJ9LSR7aXNOdW1iZXIoZGF0ZS5tb250aCkgPyBwYWROdW1iZXIoZGF0ZS5tb250aCkgOiAnJ30tJHtpc051bWJlcihkYXRlLmRheSkgPyBwYWROdW1iZXIoZGF0ZS5kYXkpIDogJyd9YCA6XG4gICAgICAgICcnO1xuICB9XG59XG4iLCIvLyBwcmV2aW91cyB2ZXJzaW9uOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvYm9vdHN0cmFwL2Jsb2IvMDdjMzFkMDczMWY3Y2IwNjhhMTkzMmI4ZTAxZDIzMTJiNzk2YjRlYy9zcmMvcG9zaXRpb24vcG9zaXRpb24uanNcbmV4cG9ydCBjbGFzcyBQb3NpdGlvbmluZyB7XG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7IHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxuXG4gIHByaXZhdGUgZ2V0U3R5bGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIHByb3A6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldEFsbFN0eWxlcyhlbGVtZW50KVtwcm9wXTsgfVxuXG4gIHByaXZhdGUgaXNTdGF0aWNQb3NpdGlvbmVkKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpIHx8ICdzdGF0aWMnKSA9PT0gJ3N0YXRpYyc7XG4gIH1cblxuICBwcml2YXRlIG9mZnNldFBhcmVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBsZXQgb2Zmc2V0UGFyZW50RWwgPSA8SFRNTEVsZW1lbnQ+ZWxlbWVudC5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKG9mZnNldFBhcmVudEVsICYmIG9mZnNldFBhcmVudEVsICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgdGhpcy5pc1N0YXRpY1Bvc2l0aW9uZWQob2Zmc2V0UGFyZW50RWwpKSB7XG4gICAgICBvZmZzZXRQYXJlbnRFbCA9IDxIVE1MRWxlbWVudD5vZmZzZXRQYXJlbnRFbC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudEVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIHBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBDbGllbnRSZWN0IHtcbiAgICBsZXQgZWxQb3NpdGlvbjogQ2xpZW50UmVjdDtcbiAgICBsZXQgcGFyZW50T2Zmc2V0OiBDbGllbnRSZWN0ID0ge3dpZHRoOiAwLCBoZWlnaHQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwLCByaWdodDogMH07XG5cbiAgICBpZiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuICAgICAgZWxQb3NpdGlvbiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9mZnNldFBhcmVudEVsID0gdGhpcy5vZmZzZXRQYXJlbnQoZWxlbWVudCk7XG5cbiAgICAgIGVsUG9zaXRpb24gPSB0aGlzLm9mZnNldChlbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIGlmIChvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIHBhcmVudE9mZnNldCA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudE9mZnNldC50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wO1xuICAgICAgcGFyZW50T2Zmc2V0LmxlZnQgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50TGVmdDtcbiAgICB9XG5cbiAgICBlbFBvc2l0aW9uLnRvcCAtPSBwYXJlbnRPZmZzZXQudG9wO1xuICAgIGVsUG9zaXRpb24uYm90dG9tIC09IHBhcmVudE9mZnNldC50b3A7XG4gICAgZWxQb3NpdGlvbi5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0O1xuICAgIGVsUG9zaXRpb24ucmlnaHQgLT0gcGFyZW50T2Zmc2V0LmxlZnQ7XG5cbiAgICBpZiAocm91bmQpIHtcbiAgICAgIGVsUG9zaXRpb24udG9wID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnRvcCk7XG4gICAgICBlbFBvc2l0aW9uLmJvdHRvbSA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi5ib3R0b20pO1xuICAgICAgZWxQb3NpdGlvbi5sZWZ0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmxlZnQpO1xuICAgICAgZWxQb3NpdGlvbi5yaWdodCA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi5yaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsUG9zaXRpb247XG4gIH1cblxuICBvZmZzZXQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHJvdW5kID0gdHJ1ZSk6IENsaWVudFJlY3Qge1xuICAgIGNvbnN0IGVsQmNyID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9IHtcbiAgICAgIHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCxcbiAgICAgIGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0XG4gICAgfTtcblxuICAgIGxldCBlbE9mZnNldCA9IHtcbiAgICAgIGhlaWdodDogZWxCY3IuaGVpZ2h0IHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgd2lkdGg6IGVsQmNyLndpZHRoIHx8IGVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICB0b3A6IGVsQmNyLnRvcCArIHZpZXdwb3J0T2Zmc2V0LnRvcCxcbiAgICAgIGJvdHRvbTogZWxCY3IuYm90dG9tICsgdmlld3BvcnRPZmZzZXQudG9wLFxuICAgICAgbGVmdDogZWxCY3IubGVmdCArIHZpZXdwb3J0T2Zmc2V0LmxlZnQsXG4gICAgICByaWdodDogZWxCY3IucmlnaHQgKyB2aWV3cG9ydE9mZnNldC5sZWZ0XG4gICAgfTtcblxuICAgIGlmIChyb3VuZCkge1xuICAgICAgZWxPZmZzZXQuaGVpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5oZWlnaHQpO1xuICAgICAgZWxPZmZzZXQud2lkdGggPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LndpZHRoKTtcbiAgICAgIGVsT2Zmc2V0LnRvcCA9IE1hdGgucm91bmQoZWxPZmZzZXQudG9wKTtcbiAgICAgIGVsT2Zmc2V0LmJvdHRvbSA9IE1hdGgucm91bmQoZWxPZmZzZXQuYm90dG9tKTtcbiAgICAgIGVsT2Zmc2V0LmxlZnQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LmxlZnQpO1xuICAgICAgZWxPZmZzZXQucmlnaHQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxPZmZzZXQ7XG4gIH1cblxuICBwb3NpdGlvbkVsZW1lbnRzKGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nLCBhcHBlbmRUb0JvZHk/OiBib29sZWFuKTpcbiAgICAgIENsaWVudFJlY3Qge1xuICAgIGNvbnN0IGhvc3RFbFBvc2l0aW9uID0gYXBwZW5kVG9Cb2R5ID8gdGhpcy5vZmZzZXQoaG9zdEVsZW1lbnQsIGZhbHNlKSA6IHRoaXMucG9zaXRpb24oaG9zdEVsZW1lbnQsIGZhbHNlKTtcbiAgICBjb25zdCB0YXJnZXRFbFN0eWxlcyA9IHRoaXMuZ2V0QWxsU3R5bGVzKHRhcmdldEVsZW1lbnQpO1xuICAgIGNvbnN0IHRhcmdldEVsQkNSID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwbGFjZW1lbnRQcmltYXJ5ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF0gfHwgJ3RvcCc7XG4gICAgY29uc3QgcGxhY2VtZW50U2Vjb25kYXJ5ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMV0gfHwgJ2NlbnRlcic7XG5cbiAgICBsZXQgdGFyZ2V0RWxQb3NpdGlvbjogQ2xpZW50UmVjdCA9IHtcbiAgICAgICdoZWlnaHQnOiB0YXJnZXRFbEJDUi5oZWlnaHQgfHwgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAnd2lkdGgnOiB0YXJnZXRFbEJDUi53aWR0aCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgJ3RvcCc6IDAsXG4gICAgICAnYm90dG9tJzogdGFyZ2V0RWxCQ1IuaGVpZ2h0IHx8IHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgJ2xlZnQnOiAwLFxuICAgICAgJ3JpZ2h0JzogdGFyZ2V0RWxCQ1Iud2lkdGggfHwgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aFxuICAgIH07XG5cbiAgICBzd2l0Y2ggKHBsYWNlbWVudFByaW1hcnkpIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24udG9wID1cbiAgICAgICAgICAgIGhvc3RFbFBvc2l0aW9uLnRvcCAtICh0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCArIHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luQm90dG9tKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24ubGVmdCA9XG4gICAgICAgICAgICBob3N0RWxQb3NpdGlvbi5sZWZ0IC0gKHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggKyBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpblJpZ2h0KSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAocGxhY2VtZW50U2Vjb25kYXJ5KSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLnRvcCA9IGhvc3RFbFBvc2l0aW9uLnRvcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLnRvcCA9IGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBob3N0RWxQb3NpdGlvbi5sZWZ0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID0gaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBpZiAocGxhY2VtZW50UHJpbWFyeSA9PT0gJ3RvcCcgfHwgcGxhY2VtZW50UHJpbWFyeSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGggLyAyIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCAvIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLyAyIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRhcmdldEVsUG9zaXRpb24udG9wID0gTWF0aC5yb3VuZCh0YXJnZXRFbFBvc2l0aW9uLnRvcCk7XG4gICAgdGFyZ2V0RWxQb3NpdGlvbi5ib3R0b20gPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24uYm90dG9tKTtcbiAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24ubGVmdCk7XG4gICAgdGFyZ2V0RWxQb3NpdGlvbi5yaWdodCA9IE1hdGgucm91bmQodGFyZ2V0RWxQb3NpdGlvbi5yaWdodCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0RWxQb3NpdGlvbjtcbiAgfVxuXG4gIC8vIGdldCB0aGUgYXZhaWxibGUgcGxhY2VtZW50cyBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaW4gdGhlIHZpZXdwb3J0IGRlcGVuZGVpbmcgb24gdGhlIGhvc3QgZWxlbWVudFxuICBnZXRBdmFpbGFibGVQbGFjZW1lbnRzKGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmdbXSB7XG4gICAgbGV0IGF2YWlsYWJsZVBsYWNlbWVudHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0ID0gaG9zdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IHRhcmdldEVsZW1DbGllbnRSZWN0ID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0O1xuICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGh0bWwuY2xpZW50V2lkdGg7XG4gICAgbGV0IGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA9IGhvc3RFbGVtQ2xpZW50UmVjdC5sZWZ0ICsgaG9zdEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMjtcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID0gaG9zdEVsZW1DbGllbnRSZWN0LnRvcCArIGhvc3RFbGVtQ2xpZW50UmVjdC5oZWlnaHQgLyAyO1xuXG4gICAgLy8gbGVmdDogY2hlY2sgaWYgdGFyZ2V0IHdpZHRoIGNhbiBiZSBwbGFjZWQgYmV0d2VlbiBob3N0IGxlZnQgYW5kIHZpZXdwb3J0IHN0YXJ0IGFuZCBhbHNvIGhlaWdodCBvZiB0YXJnZXQgaXNcbiAgICAvLyBpbnNpZGUgdmlld3BvcnRcbiAgICBpZiAodGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGggPCBob3N0RWxlbUNsaWVudFJlY3QubGVmdCkge1xuICAgICAgLy8gY2hlY2sgZm9yIGxlZnQgb25seVxuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIgJiZcbiAgICAgICAgICB3aW5kb3dIZWlnaHQgLSBob3N0RWxlbUNsaWVudFJlY3RWZXJDZW50ZXIgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC5oZWlnaHQgLyAyKSB7XG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAnbGVmdCcpO1xuICAgICAgfVxuICAgICAgLy8gY2hlY2sgZm9yIGxlZnQtdG9wIGFuZCBsZWZ0LWJvdHRvbVxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JMZWZ0UmlnaHQoaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ2xlZnQnLCBhdmFpbGFibGVQbGFjZW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyB0b3A6IHRhcmdldCBoZWlnaHQgaXMgbGVzcyB0aGFuIGhvc3QgdG9wXG4gICAgaWYgKHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCA8IGhvc3RFbGVtQ2xpZW50UmVjdC50b3ApIHtcbiAgICAgIGlmIChob3N0RWxlbUNsaWVudFJlY3RIb3JDZW50ZXIgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCAvIDIgJiZcbiAgICAgICAgICB3aW5kb3dXaWR0aCAtIGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMikge1xuICAgICAgICBhdmFpbGFibGVQbGFjZW1lbnRzLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRzLmxlbmd0aCwgMSwgJ3RvcCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JUb3BCb3R0b20oaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ3RvcCcsIGF2YWlsYWJsZVBsYWNlbWVudHMpO1xuICAgIH1cblxuICAgIC8vIHJpZ2h0OiBjaGVjayBpZiB0YXJnZXQgd2lkdGggY2FuIGJlIHBsYWNlZCBiZXR3ZWVuIGhvc3QgcmlnaHQgYW5kIHZpZXdwb3J0IGVuZCBhbmQgYWxzbyBoZWlnaHQgb2YgdGFyZ2V0IGlzXG4gICAgLy8gaW5zaWRlIHZpZXdwb3J0XG4gICAgaWYgKHdpbmRvd1dpZHRoIC0gaG9zdEVsZW1DbGllbnRSZWN0LnJpZ2h0ID4gdGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGgpIHtcbiAgICAgIC8vIGNoZWNrIGZvciByaWdodCBvbmx5XG4gICAgICBpZiAoaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IC8gMiAmJlxuICAgICAgICAgIHdpbmRvd0hlaWdodCAtIGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIpIHtcbiAgICAgICAgYXZhaWxhYmxlUGxhY2VtZW50cy5zcGxpY2UoYXZhaWxhYmxlUGxhY2VtZW50cy5sZW5ndGgsIDEsICdyaWdodCcpO1xuICAgICAgfVxuICAgICAgLy8gY2hlY2sgZm9yIHJpZ2h0LXRvcCBhbmQgcmlnaHQtYm90dG9tXG4gICAgICB0aGlzLnNldFNlY29uZGFyeVBsYWNlbWVudEZvckxlZnRSaWdodChob3N0RWxlbUNsaWVudFJlY3QsIHRhcmdldEVsZW1DbGllbnRSZWN0LCAncmlnaHQnLCBhdmFpbGFibGVQbGFjZW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBib3R0b206IGNoZWNrIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZSBiZXR3ZWVuIGhvc3QgYm90dG9tIGFuZCB2aWV3cG9ydCBlbmQgZm9yIHRhcmdldCBoZWlnaHRcbiAgICBpZiAod2luZG93SGVpZ2h0IC0gaG9zdEVsZW1DbGllbnRSZWN0LmJvdHRvbSA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCkge1xuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMiAmJlxuICAgICAgICAgIHdpbmRvd1dpZHRoIC0gaG9zdEVsZW1DbGllbnRSZWN0SG9yQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGggLyAyKSB7XG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAnYm90dG9tJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFNlY29uZGFyeVBsYWNlbWVudEZvclRvcEJvdHRvbShob3N0RWxlbUNsaWVudFJlY3QsIHRhcmdldEVsZW1DbGllbnRSZWN0LCAnYm90dG9tJywgYXZhaWxhYmxlUGxhY2VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2YWlsYWJsZVBsYWNlbWVudHM7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgaWYgc2Vjb25kYXJ5IHBsYWNlbWVudCBmb3IgbGVmdCBhbmQgcmlnaHQgYXJlIGF2YWlsYWJsZSBpLmUuIGxlZnQtdG9wLCBsZWZ0LWJvdHRvbSwgcmlnaHQtdG9wLCByaWdodC1ib3R0b21cbiAgICogcHJpbWFyeXBsYWNlbWVudDogbGVmdHxyaWdodFxuICAgKiBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IGFycmF5IGluIHdoaWNoIGF2YWlsYWJsZSBwbGFjZW1ldHMgdG8gYmUgc2V0XG4gICAqL1xuICBwcml2YXRlIHNldFNlY29uZGFyeVBsYWNlbWVudEZvckxlZnRSaWdodChcbiAgICAgIGhvc3RFbGVtQ2xpZW50UmVjdDogQ2xpZW50UmVjdCwgdGFyZ2V0RWxlbUNsaWVudFJlY3Q6IENsaWVudFJlY3QsIHByaW1hcnlQbGFjZW1lbnQ6IHN0cmluZyxcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFycjogQXJyYXk8c3RyaW5nPikge1xuICAgIGxldCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIC8vIGNoZWNrIGZvciBsZWZ0LWJvdHRvbVxuICAgIGlmICh0YXJnZXRFbGVtQ2xpZW50UmVjdC5oZWlnaHQgPD0gaG9zdEVsZW1DbGllbnRSZWN0LmJvdHRvbSkge1xuICAgICAgYXZhaWxhYmxlUGxhY2VtZW50QXJyLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRBcnIubGVuZ3RoLCAxLCBwcmltYXJ5UGxhY2VtZW50ICsgJy1ib3R0b20nKTtcbiAgICB9XG4gICAgaWYgKCh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgaHRtbC5jbGllbnRIZWlnaHQpIC0gaG9zdEVsZW1DbGllbnRSZWN0LnRvcCA+PSB0YXJnZXRFbGVtQ2xpZW50UmVjdC5oZWlnaHQpIHtcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFyci5zcGxpY2UoYXZhaWxhYmxlUGxhY2VtZW50QXJyLmxlbmd0aCwgMSwgcHJpbWFyeVBsYWNlbWVudCArICctdG9wJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGlmIHNlY29uZGFyeSBwbGFjZW1lbnQgZm9yIHRvcCBhbmQgYm90dG9tIGFyZSBhdmFpbGFibGUgaS5lLiB0b3AtbGVmdCwgdG9wLXJpZ2h0LCBib3R0b20tbGVmdCwgYm90dG9tLXJpZ2h0XG4gICAqIHByaW1hcnlwbGFjZW1lbnQ6IHRvcHxib3R0b21cbiAgICogYXZhaWxhYmxlUGxhY2VtZW50QXJyOiBhcnJheSBpbiB3aGljaCBhdmFpbGFibGUgcGxhY2VtZXRzIHRvIGJlIHNldFxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JUb3BCb3R0b20oXG4gICAgICBob3N0RWxlbUNsaWVudFJlY3Q6IENsaWVudFJlY3QsIHRhcmdldEVsZW1DbGllbnRSZWN0OiBDbGllbnRSZWN0LCBwcmltYXJ5UGxhY2VtZW50OiBzdHJpbmcsXG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IEFycmF5PHN0cmluZz4pIHtcbiAgICBsZXQgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAvLyBjaGVjayBmb3IgbGVmdC1ib3R0b21cbiAgICBpZiAoKHdpbmRvdy5pbm5lcldpZHRoIHx8IGh0bWwuY2xpZW50V2lkdGgpIC0gaG9zdEVsZW1DbGllbnRSZWN0LmxlZnQgPj0gdGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGgpIHtcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFyci5zcGxpY2UoYXZhaWxhYmxlUGxhY2VtZW50QXJyLmxlbmd0aCwgMSwgcHJpbWFyeVBsYWNlbWVudCArICctbGVmdCcpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGggPD0gaG9zdEVsZW1DbGllbnRSZWN0LnJpZ2h0KSB7XG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnIuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudEFyci5sZW5ndGgsIDEsIHByaW1hcnlQbGFjZW1lbnQgKyAnLXJpZ2h0Jyk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHBvc2l0aW9uU2VydmljZSA9IG5ldyBQb3NpdGlvbmluZygpO1xuXG4vKlxuICogQWNjZXB0IHRoZSBwbGFjZW1lbnQgYXJyYXkgYW5kIGFwcGxpZXMgdGhlIGFwcHJvcHJpYXRlIHBsYWNlbWVudCBkZXBlbmRlbnQgb24gdGhlIHZpZXdwb3J0LlxuICogUmV0dXJucyB0aGUgYXBwbGllZCBwbGFjZW1lbnQuXG4gKiBJbiBjYXNlIG9mIGF1dG8gcGxhY2VtZW50LCBwbGFjZW1lbnRzIGFyZSBzZWxlY3RlZCBpbiBvcmRlclxuICogICAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JyxcbiAqICAgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCcsXG4gKiAgICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLFxuICogICAnbGVmdC10b3AnLCAnbGVmdC1ib3R0b20nLFxuICogICAncmlnaHQtdG9wJywgJ3JpZ2h0LWJvdHRvbScuXG4gKiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uRWxlbWVudHMoXG4gICAgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCwgcGxhY2VtZW50OiBzdHJpbmcgfCBQbGFjZW1lbnQgfCBQbGFjZW1lbnRBcnJheSxcbiAgICBhcHBlbmRUb0JvZHk/OiBib29sZWFuKTogUGxhY2VtZW50IHtcbiAgbGV0IHBsYWNlbWVudFZhbHM6IEFycmF5PFBsYWNlbWVudD4gPSBBcnJheS5pc0FycmF5KHBsYWNlbWVudCkgPyBwbGFjZW1lbnQgOiBbcGxhY2VtZW50IGFzIFBsYWNlbWVudF07XG5cbiAgLy8gcmVwbGFjZSBhdXRvIHBsYWNlbWVudCB3aXRoIG90aGVyIHBsYWNlbWVudHNcbiAgbGV0IGhhc0F1dG8gPSBwbGFjZW1lbnRWYWxzLmZpbmRJbmRleCh2YWwgPT4gdmFsID09PSAnYXV0bycpO1xuICBpZiAoaGFzQXV0byA+PSAwKSB7XG4gICAgWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICdsZWZ0LXRvcCcsXG4gICAgICdsZWZ0LWJvdHRvbScsICdyaWdodC10b3AnLCAncmlnaHQtYm90dG9tJyxcbiAgICBdLmZvckVhY2goZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAocGxhY2VtZW50VmFscy5maW5kKHZhbCA9PiB2YWwuc2VhcmNoKCdeJyArIG9iaikgIT09IC0xKSA9PSBudWxsKSB7XG4gICAgICAgIHBsYWNlbWVudFZhbHMuc3BsaWNlKGhhc0F1dG8rKywgMSwgb2JqIGFzIFBsYWNlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBjb29yZGluYXRlcyB3aGVyZSB0byBwb3NpdGlvblxuICBsZXQgdG9wVmFsID0gMCwgbGVmdFZhbCA9IDA7XG4gIGxldCBhcHBsaWVkUGxhY2VtZW50OiBQbGFjZW1lbnQ7XG4gIC8vIGdldCBhdmFpbGFibGUgcGxhY2VtZW50c1xuICBsZXQgYXZhaWxhYmxlUGxhY2VtZW50cyA9IHBvc2l0aW9uU2VydmljZS5nZXRBdmFpbGFibGVQbGFjZW1lbnRzKGhvc3RFbGVtZW50LCB0YXJnZXRFbGVtZW50KTtcbiAgLy8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgcGFzc2VkIHBsYWNlbWVudHNcbiAgZm9yIChsZXQgeyBpdGVtLCBpbmRleCB9IG9mIHRvSXRlbUluZGV4ZXMocGxhY2VtZW50VmFscykpIHtcbiAgICAvLyBjaGVjayBpZiBwYXNzZWQgcGxhY2VtZW50IGlzIHByZXNlbnQgaW4gdGhlIGF2YWlsYWJsZSBwbGFjZW1lbnQgb3Igb3RoZXJ3aXNlIGFwcGx5IHRoZSBsYXN0IHBsYWNlbWVudCBpbiB0aGVcbiAgICAvLyBwYXNzZWQgcGxhY2VtZW50IGxpc3RcbiAgICBpZiAoKGF2YWlsYWJsZVBsYWNlbWVudHMuZmluZCh2YWwgPT4gdmFsID09PSBpdGVtKSAhPSBudWxsKSB8fCAocGxhY2VtZW50VmFscy5sZW5ndGggPT09IGluZGV4ICsgMSkpIHtcbiAgICAgIGFwcGxpZWRQbGFjZW1lbnQgPSA8UGxhY2VtZW50Pml0ZW07XG4gICAgICBjb25zdCBwb3MgPSBwb3NpdGlvblNlcnZpY2UucG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudCwgdGFyZ2V0RWxlbWVudCwgaXRlbSwgYXBwZW5kVG9Cb2R5KTtcbiAgICAgIHRvcFZhbCA9IHBvcy50b3A7XG4gICAgICBsZWZ0VmFsID0gcG9zLmxlZnQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgdGFyZ2V0RWxlbWVudC5zdHlsZS50b3AgPSBgJHt0b3BWYWx9cHhgO1xuICB0YXJnZXRFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0VmFsfXB4YDtcbiAgcmV0dXJuIGFwcGxpZWRQbGFjZW1lbnQ7XG59XG5cbi8vIGZ1bmN0aW9uIHRvIGdldCBpbmRleCBhbmQgaXRlbSBvZiBhbiBhcnJheVxuZnVuY3Rpb24gdG9JdGVtSW5kZXhlczxUPihhOiBUW10pIHtcbiAgcmV0dXJuIGEubWFwKChpdGVtLCBpbmRleCkgPT4gKHtpdGVtLCBpbmRleH0pKTtcbn1cblxuZXhwb3J0IHR5cGUgUGxhY2VtZW50ID0gJ2F1dG8nIHwgJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHxcbiAgICAnYm90dG9tLXJpZ2h0JyB8ICdsZWZ0LXRvcCcgfCAnbGVmdC1ib3R0b20nIHwgJ3JpZ2h0LXRvcCcgfCAncmlnaHQtYm90dG9tJztcblxuZXhwb3J0IHR5cGUgUGxhY2VtZW50QXJyYXkgPSBQbGFjZW1lbnQgfCBBcnJheTxQbGFjZW1lbnQ+O1xuIiwiaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcblxuY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xuICAnYVtocmVmXScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxuICAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSdcbl0uam9pbignLCAnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgb2YgYSBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIHNwZWNpZmljIENTUyBzZWxlY3RvclxuICovXG5mdW5jdGlvbiBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRbXSB7XG4gIGNvbnN0IGxpc3Q6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUik7XG4gIHJldHVybiBbbGlzdFswXSwgbGlzdFtsaXN0Lmxlbmd0aCAtIDFdXTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IGVuZm9yY2VzIGJyb3dzZXIgZm9jdXMgdG8gYmUgdHJhcHBlZCBpbnNpZGUgYSBET00gZWxlbWVudC5cbiAqXG4gKiBXb3JrcyBvbmx5IGZvciBjbGlja3MgaW5zaWRlIHRoZSBlbGVtZW50IGFuZCBuYXZpZ2F0aW9uIHdpdGggJ1RhYicsIGlnbm9yaW5nIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgYXJvdW5kIHdoaWNoIGZvY3VzIHdpbGwgYmUgdHJhcHBlZCBpbnNpZGVcbiAqIEBwYXJhbSBzdG9wRm9jdXNUcmFwJCBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0uIFdoZW4gY29tcGxldGVkIHRoZSBmb2N1cyB0cmFwIHdpbGwgY2xlYW4gdXAgbGlzdGVuZXJzXG4gKiBhbmQgZnJlZSBpbnRlcm5hbCByZXNvdXJjZXNcbiAqL1xuZXhwb3J0IGNvbnN0IG5nYkZvY3VzVHJhcCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55PikgPT4ge1xuICAvLyBsYXN0IGZvY3VzZWQgZWxlbWVudFxuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnQkID1cbiAgICAgIGZyb21FdmVudDxGb2N1c0V2ZW50PihlbGVtZW50LCAnZm9jdXNpbicpLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgbWFwKGUgPT4gZS50YXJnZXQpKTtcblxuICAvLyAndGFiJyAvICdzaGlmdCt0YWInIHN0cmVhbVxuICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZWxlbWVudCwgJ2tleWRvd24nKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgZmlsdGVyKGUgPT4gZS53aGljaCA9PT0gS2V5LlRhYiksIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpKVxuICAgICAgLnN1YnNjcmliZSgoW3RhYkV2ZW50LCBmb2N1c2VkRWxlbWVudF0pID0+IHtcbiAgICAgICAgY29uc3RbZmlyc3QsIGxhc3RdID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50KTtcblxuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGZpcnN0ICYmIHRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgbGFzdC5mb2N1cygpO1xuICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QgJiYgIXRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAvLyBpbnNpZGUgY2xpY2tcbiAgZnJvbUV2ZW50KGVsZW1lbnQsICdjbGljaycpXG4gICAgICAucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSwgbWFwKGFyciA9PiBhcnJbMV0gYXMgSFRNTEVsZW1lbnQpKVxuICAgICAgLnN1YnNjcmliZShsYXN0Rm9jdXNlZEVsZW1lbnQgPT4gbGFzdEZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xufTtcbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgUmVuZGVyZXIyLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIE5nWm9uZSxcbiAgVGVtcGxhdGVSZWYsXG4gIGZvcndhcmRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyLCBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudH0gZnJvbSAnLi9kYXRlcGlja2VyJztcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xuXG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlclNlcnZpY2V9IGZyb20gJy4vZGF0ZXBpY2tlci1zZXJ2aWNlJztcblxuaW1wb3J0IHtTdWJqZWN0LCBmcm9tRXZlbnQsIHJhY2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHRha2UsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYklucHV0RGF0ZXBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxJREFUT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYklucHV0RGF0ZXBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbWFrZXMgaXQgcG9zc2libGUgdG8gaGF2ZSBkYXRlcGlja2VycyBvbiBpbnB1dCBmaWVsZHMuXG4gKiBNYW5hZ2VzIGludGVncmF0aW9uIHdpdGggdGhlIGlucHV0IGZpZWxkIGl0c2VsZiAoZGF0YSBlbnRyeSkgYW5kIG5nTW9kZWwgKHZhbGlkYXRpb24gZXRjLikuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W25nYkRhdGVwaWNrZXJdJyxcbiAgZXhwb3J0QXM6ICduZ2JEYXRlcGlja2VyJyxcbiAgaG9zdDoge1xuICAgICcoaW5wdXQpJzogJ21hbnVhbERhdGVDaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxuICAgICcoY2hhbmdlKSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUsIHRydWUpJyxcbiAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsIE5HQl9EQVRFUElDS0VSX1ZBTElEQVRPUiwgTmdiRGF0ZXBpY2tlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5nYklucHV0RGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuICBwcml2YXRlIF9jbGlja2FibGVFbGVtZW50cyA9IG5ldyBTZXQ8SFRNTEVsZW1lbnQ+KCk7XG4gIHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIF9jUmVmOiBDb21wb25lbnRSZWY8TmdiRGF0ZXBpY2tlcj4gPSBudWxsO1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9tb2RlbDogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZGF0ZXBpY2tlciBwb3B1cCBzaG91bGQgYmUgY2xvc2VkIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgZGF0ZSBzZWxlY3Rpb24gLyBvdXRzaWRlIGNsaWNrIG9yIG5vdC5cbiAgICpcbiAgICogQnkgZGVmYXVsdCB0aGUgcG9wdXAgd2lsbCBjbG9zZSBvbiBib3RoIGRhdGUgc2VsZWN0aW9uIGFuZCBvdXRzaWRlIGNsaWNrLiBJZiB0aGUgdmFsdWUgaXMgJ2ZhbHNlJyB0aGUgcG9wdXAgaGFzIHRvXG4gICAqIGJlIGNsb3NlZCBtYW51YWxseSB2aWEgJy5jbG9zZSgpJyBvciAnLnRvZ2dsZSgpJyBtZXRob2RzLiBJZiB0aGUgdmFsdWUgaXMgc2V0IHRvICdpbnNpZGUnIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9uXG4gICAqIGRhdGUgc2VsZWN0aW9uIG9ubHkuIEZvciB0aGUgJ291dHNpZGUnIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2suXG4gICAqXG4gICAqIEBzaW5jZSAzLjAuMFxuICAgKi9cbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgZm9yIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXkgZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheU1vbnRoczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBGaXJzdCBkYXkgb2YgdGhlIHdlZWsuIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6IDE9TW9uIC4uLiA3PVN1blxuICAgKi9cbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gbWFyayBhIGdpdmVuIGRhdGUgYXMgZGlzYWJsZWQuXG4gICAqICdDdXJyZW50JyBjb250YWlucyB0aGUgbW9udGggdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE1pbiBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkIHdpbGwgYmUgMTAgeWVhcnMgYmVmb3JlIHRvZGF5IG9yIGBzdGFydERhdGVgXG4gICAqL1xuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xuXG4gIC8qKlxuICAgKiBNYXggZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCB3aWxsIGJlIDEwIHllYXJzIGZyb20gdG9kYXkgb3IgYHN0YXJ0RGF0ZWBcbiAgICovXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gdHlwZTogYHNlbGVjdGAgKGRlZmF1bHQgd2l0aCBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCB5ZWFyKSwgYGFycm93c2BcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxuICAgKi9cbiAgQElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuICAvKipcbiAgICogVGhlIHdheSB0byBkaXNwbGF5IGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gY3VycmVudCBtb250aDogYHZpc2libGVgIChkZWZhdWx0KSxcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxuICAgKi9cbiAgQElucHV0KCkgb3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbic7XG5cbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIGRhdGVwaWNrZXIgcG9wdXAgYWNjZXB0czpcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXG4gICAqICAgIFwibGVmdFwiLCBcImxlZnQtdG9wXCIsIFwibGVmdC1ib3R0b21cIiwgXCJyaWdodFwiLCBcInJpZ2h0LXRvcFwiLCBcInJpZ2h0LWJvdHRvbVwiXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2JvdHRvbS1sZWZ0JztcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IGRheXMgb2YgdGhlIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xuICAgKi9cbiAgQElucHV0KCkgc2hvd1dlZWtOdW1iZXJzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEYXRlIHRvIG9wZW4gY2FsZW5kYXIgd2l0aC5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxuICAgKiBJZiBub3RoaW5nIG9yIGludmFsaWQgZGF0ZSBwcm92aWRlZCwgY2FsZW5kYXIgd2lsbCBvcGVuIHdpdGggY3VycmVudCBtb250aC5cbiAgICogVXNlICduYXZpZ2F0ZVRvKGRhdGUpJyBhcyBhbiBhbHRlcm5hdGl2ZVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcblxuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBkYXRlcGlja2VyIHBvcHVwIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBkYXRlIHVzaW5nIGtleWJvYXJkIG9yIG1vdXNlLlxuICAgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkIE5nYkRhdGVTdHJ1Y3QuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMVxuICAgKi9cbiAgQE91dHB1dCgpIGRhdGVTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVTdHJ1Y3Q+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXG4gICAqIFNlZSBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCBmb3IgdGhlIHBheWxvYWQgaW5mby5cbiAgICovXG4gIEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWUgPT09ICcnIHx8ICh2YWx1ZSAmJiB2YWx1ZSAhPT0gJ2ZhbHNlJyk7XG5cbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5zZXREaXNhYmxlZFN0YXRlKHRoaXMuX2Rpc2FibGVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcbiAgcHJpdmF0ZSBfdmFsaWRhdG9yQ2hhbmdlID0gKCkgPT4ge307XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3BhcnNlckZvcm1hdHRlcjogTmdiRGF0ZVBhcnNlckZvcm1hdHRlciwgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgICBwcml2YXRlIF92Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfc2VydmljZTogTmdiRGF0ZXBpY2tlclNlcnZpY2UsIHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhcixcbiAgICAgIHByaXZhdGUgX25nYkRhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NSZWYpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fdmFsaWRhdG9yQ2hhbmdlID0gZm47IH07XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7IHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XG5cbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGNvbnN0IHZhbHVlID0gYy52YWx1ZTtcblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBuZ2JEYXRlID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fbmdiRGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XG5cbiAgICBpZiAoIXRoaXMuX2NhbGVuZGFyLmlzVmFsaWQobmdiRGF0ZSkpIHtcbiAgICAgIHJldHVybiB7J25nYkRhdGUnOiB7aW52YWxpZDogYy52YWx1ZX19O1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgbmdiRGF0ZS5iZWZvcmUoTmdiRGF0ZS5mcm9tKHRoaXMubWluRGF0ZSkpKSB7XG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge3JlcXVpcmVkQmVmb3JlOiB0aGlzLm1pbkRhdGV9fTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXhEYXRlICYmIG5nYkRhdGUuYWZ0ZXIoTmdiRGF0ZS5mcm9tKHRoaXMubWF4RGF0ZSkpKSB7XG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge3JlcXVpcmVkQWZ0ZXI6IHRoaXMubWF4RGF0ZX19O1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX25nYkRhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xuICAgIHRoaXMuX3dyaXRlTW9kZWxWYWx1ZSh0aGlzLl9tb2RlbCk7XG4gIH1cblxuICBtYW51YWxEYXRlQ2hhbmdlKHZhbHVlOiBzdHJpbmcsIHVwZGF0ZVZpZXcgPSBmYWxzZSkge1xuICAgIHRoaXMuX21vZGVsID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fcGFyc2VyRm9ybWF0dGVyLnBhcnNlKHZhbHVlKSk7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5fbW9kZWwgPyB0aGlzLl9uZ2JEYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSA6ICh2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWUpKTtcbiAgICBpZiAodXBkYXRlVmlldyAmJiB0aGlzLl9tb2RlbCkge1xuICAgICAgdGhpcy5fd3JpdGVNb2RlbFZhbHVlKHRoaXMuX21vZGVsKTtcbiAgICB9XG4gIH1cblxuICBpc09wZW4oKSB7IHJldHVybiAhIXRoaXMuX2NSZWY7IH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGRhdGVwaWNrZXIgd2l0aCB0aGUgc2VsZWN0ZWQgZGF0ZSBpbmRpY2F0ZWQgYnkgdGhlIG5nTW9kZWwgdmFsdWUuXG4gICAqL1xuICBvcGVuKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xuICAgICAgY29uc3QgY2YgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiRGF0ZXBpY2tlcik7XG4gICAgICB0aGlzLl9jUmVmID0gdGhpcy5fdmNSZWYuY3JlYXRlQ29tcG9uZW50KGNmKTtcblxuICAgICAgdGhpcy5fYXBwbHlQb3B1cFN0eWxpbmcodGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuX2FwcGx5RGF0ZXBpY2tlcklucHV0cyh0aGlzLl9jUmVmLmluc3RhbmNlKTtcbiAgICAgIHRoaXMuX3N1YnNjcmliZUZvckRhdGVwaWNrZXJPdXRwdXRzKHRoaXMuX2NSZWYuaW5zdGFuY2UpO1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5uZ09uSW5pdCgpO1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS53cml0ZVZhbHVlKHRoaXMuX25nYkRhdGVBZGFwdGVyLnRvTW9kZWwodGhpcy5fbW9kZWwpKTtcblxuICAgICAgLy8gZGF0ZSBzZWxlY3Rpb24gZXZlbnQgaGFuZGxpbmdcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UucmVnaXN0ZXJPbkNoYW5nZSgoc2VsZWN0ZWREYXRlKSA9PiB7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGUpO1xuICAgICAgICB0aGlzLl9vbkNoYW5nZShzZWxlY3RlZERhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2NSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5kaXNhYmxlZCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBmb2N1cyBoYW5kbGluZ1xuICAgICAgbmdiRm9jdXNUcmFwKHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5fY2xvc2VkJCk7XG5cbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UuZm9jdXMoKTtcblxuICAgICAgLy8gY2xvc2luZyBvbiBFU0NcbiAgICAgIC8vIGNsYW5nLWZvcm1hdCBvZmZcbiAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksXG4gICAgICAgICAgZmlsdGVyKGUgPT4gZS53aGljaCA9PT0gS2V5LkVzY2FwZSlcbiAgICAgICAgKTtcblxuICAgICAgLy8gY2xvc2luZyBvbiBvdXRzaWRlIGNsaWNrc1xuICAgICAgY29uc3Qgb3V0c2lkZUNsaWNrcyQgPSB0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnID9cbiAgICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAnY2xpY2snKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLFxuICAgICAgICAgICAgZmlsdGVyKGUgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjbGlja2FibGVFbGVtZW50cyA9IFtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgIHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAuLi5BcnJheS5mcm9tKHRoaXMuX2NsaWNrYWJsZUVsZW1lbnRzKVxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICByZXR1cm4gIWNsaWNrYWJsZUVsZW1lbnRzLnNvbWUoZWwgPT4gZWwgJiYgZWwuY29udGFpbnMoZS50YXJnZXQpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApIDogbnVsbDtcbiAgICAgIC8vIGNsYW5nLWZvcm1hdCBvblxuXG4gICAgICByYWNlPEV2ZW50PihbZXNjYXBlcyQsIG91dHNpZGVDbGlja3MkXSkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuX3ZjUmVmLnJlbW92ZSh0aGlzLl92Y1JlZi5pbmRleE9mKHRoaXMuX2NSZWYuaG9zdFZpZXcpKTtcbiAgICAgIHRoaXMuX2NSZWYgPSBudWxsO1xuICAgICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGRhdGVwaWNrZXIgcG9wdXAgKG9wZW5zIHdoZW4gY2xvc2VkIGFuZCBjbG9zZXMgd2hlbiBvcGVuZWQpLlxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gaHRtbCBlbGVtZW50IG91dHNpZGUgb2YgdGhlIGRhdGVwaWNrZXIgcG9wdXAgYXMgY2xpY2thYmxlLlxuICAgKiBDbGlja2luZyBvbiB0aGlzIGVsZW1lbnQgd2lsbCBub3QgY2xvc2UgdGhlIGRhdGVwaWNrZXIgcG9wdXBcbiAgICpcbiAgICogQHNpbmNlIDMuMC4wXG4gICAqL1xuICByZWdpc3RlckNsaWNrYWJsZUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgdGhpcy5fY2xpY2thYmxlRWxlbWVudHMuYWRkKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgY3VycmVudCB2aWV3IHRvIHByb3ZpZGVkIGRhdGUuXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXG4gICAqIFVzZSAnc3RhcnREYXRlJyBpbnB1dCBhcyBhbiBhbHRlcm5hdGl2ZVxuICAgKi9cbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5uYXZpZ2F0ZVRvKGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uQmx1cigpIHsgdGhpcy5fb25Ub3VjaGVkKCk7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ21pbkRhdGUnXSB8fCBjaGFuZ2VzWydtYXhEYXRlJ10pIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRvckNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseURhdGVwaWNrZXJJbnB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKTogdm9pZCB7XG4gICAgWydkYXlUZW1wbGF0ZScsICdkaXNwbGF5TW9udGhzJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ21hcmtEaXNhYmxlZCcsICdtaW5EYXRlJywgJ21heERhdGUnLCAnbmF2aWdhdGlvbicsXG4gICAgICdvdXRzaWRlRGF5cycsICdzaG93TmF2aWdhdGlvbicsICdzaG93V2Vla2RheXMnLCAnc2hvd1dlZWtOdW1iZXJzJ11cbiAgICAgICAgLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzW29wdGlvbk5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRhdGVwaWNrZXJJbnN0YW5jZVtvcHRpb25OYW1lXSA9IHRoaXNbb3B0aW9uTmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBkYXRlcGlja2VySW5zdGFuY2Uuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUgfHwgdGhpcy5fbW9kZWw7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVBvcHVwU3R5bGluZyhuYXRpdmVFbGVtZW50OiBhbnkpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnZHJvcGRvd24tbWVudScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsICdwYWRkaW5nJywgJzAnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnc2hvdycpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKSB7XG4gICAgZGF0ZXBpY2tlckluc3RhbmNlLm5hdmlnYXRlLnN1YnNjcmliZShkYXRlID0+IHRoaXMubmF2aWdhdGUuZW1pdChkYXRlKSk7XG4gICAgZGF0ZXBpY2tlckluc3RhbmNlLnNlbGVjdC5zdWJzY3JpYmUoZGF0ZSA9PiB7XG4gICAgICB0aGlzLmRhdGVTZWxlY3QuZW1pdChkYXRlKTtcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfd3JpdGVNb2RlbFZhbHVlKG1vZGVsOiBOZ2JEYXRlKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGhpcy5fcGFyc2VyRm9ybWF0dGVyLmZvcm1hdChtb2RlbCkpO1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLndyaXRlVmFsdWUodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChtb2RlbCkpO1xuICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZnJvbURhdGVTdHJ1Y3QoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGUge1xuICAgIGNvbnN0IG5nYkRhdGUgPSBkYXRlID8gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSkgOiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdiSW5wdXREYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIGFuIGVsZW1lbnQgdGhhdCB0cmlnZ2VycyB0aGUgZGF0ZXBpY2tlciBwb3B1cCBvcGVuaW5nIGFuZCBjbG9zaW5nXG4gKlxuICogQHNpbmNlIDMuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYkRhdGVwaWNrZXJUb2dnbGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlclRvZ2dsZSB7XG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYE5nYklucHV0RGF0ZXBpY2tlcmAgaW5zdGFuY2VcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBuZ2JEYXRlcGlja2VyVG9nZ2xlKGRhdGVwaWNrZXI6IE5nYklucHV0RGF0ZXBpY2tlcikge1xuICAgIGRhdGVwaWNrZXIucmVnaXN0ZXJDbGlja2FibGVFbGVtZW50KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG59XG4iLCJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbmdiRGF0ZXBpY2tlckRheVZpZXddJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB3aWR0aDogMnJlbTtcbiAgICAgIGhlaWdodDogMnJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xuICAgICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICA6aG9zdC5vdXRzaWRlIHtcbiAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICB9XG4gIGBdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2J0bi1saWdodCcsXG4gICAgJ1tjbGFzcy5iZy1wcmltYXJ5XSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LW11dGVkXSc6ICdpc011dGVkKCknLFxuICAgICdbY2xhc3Mub3V0c2lkZV0nOiAnaXNNdXRlZCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcbiAgfSxcbiAgdGVtcGxhdGU6IGB7eyBkYXRlLmRheSB9fWBcbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckRheVZpZXcge1xuICBASW5wdXQoKSBjdXJyZW50TW9udGg6IG51bWJlcjtcbiAgQElucHV0KCkgZGF0ZTogTmdiRGF0ZVN0cnVjdDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIGlzTXV0ZWQoKSB7IHJldHVybiAhdGhpcy5zZWxlY3RlZCAmJiAodGhpcy5kYXRlLm1vbnRoICE9PSB0aGlzLmN1cnJlbnRNb250aCB8fCB0aGlzLmRpc2FibGVkKTsgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7dG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3Q+c2VsZWN0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIC1tcy1mbGV4OiAxIDEgYXV0bztcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgcGFkZGluZzogMCAwLjVyZW07XG4gICAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICAgICAgaGVpZ2h0OiAxLjg1cmVtO1xuICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlbGVjdFxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXG4gICAgICBbdmFsdWVdPVwiZGF0ZT8ubW9udGhcIlxuICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VNb250aCgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBtIG9mIG1vbnRoc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiaTE4bi5nZXRNb250aEZ1bGxOYW1lKG0pXCIgW3ZhbHVlXT1cIm1cIj57eyBpMThuLmdldE1vbnRoU2hvcnROYW1lKG0pIH19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+PHNlbGVjdFxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXG4gICAgICBbdmFsdWVdPVwiZGF0ZT8ueWVhclwiXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZVllYXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgeSBvZiB5ZWFyc1wiIFt2YWx1ZV09XCJ5XCI+e3sgeSB9fTwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0IHtcbiAgQElucHV0KCkgZGF0ZTogTmdiRGF0ZTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1vbnRoczogbnVtYmVyW107XG4gIEBJbnB1dCgpIHllYXJzOiBudW1iZXJbXTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuICBjaGFuZ2VNb250aChtb250aDogc3RyaW5nKSB7IHRoaXMuc2VsZWN0LmVtaXQobmV3IE5nYkRhdGUodGhpcy5kYXRlLnllYXIsIHRvSW50ZWdlcihtb250aCksIDEpKTsgfVxuXG4gIGNoYW5nZVllYXIoeWVhcjogc3RyaW5nKSB7IHRoaXMuc2VsZWN0LmVtaXQobmV3IE5nYkRhdGUodG9JbnRlZ2VyKHllYXIpLCB0aGlzLmRhdGUubW9udGgsIDEpKTsgfVxufVxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYlBlcmlvZCwgTmdiQ2FsZW5kYXJ9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc051bWJlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkNhbGVuZGFySGlqcmkgZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxuXG4gIGdldE1vbnRocygpIHsgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgfVxuXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XG5cbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRhdGUgJiYgaXNOdW1iZXIoZGF0ZS55ZWFyKSAmJiBpc051bWJlcihkYXRlLm1vbnRoKSAmJiBpc051bWJlcihkYXRlLmRheSkgJiZcbiAgICAgICAgIWlzTmFOKHRoaXMudG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIHNldERheShkYXRlOiBOZ2JEYXRlLCBkYXk6IG51bWJlcik6IE5nYkRhdGUge1xuICAgIGRheSA9ICtkYXk7XG4gICAgbGV0IG1EYXlzID0gdGhpcy5nZXREYXlzSW5Jc2xhbWljTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICBpZiAoZGF5IDw9IDApIHtcbiAgICAgIHdoaWxlIChkYXkgPD0gMCkge1xuICAgICAgICBkYXRlID0gdGhpcy5zZXRNb250aChkYXRlLCBkYXRlLm1vbnRoIC0gMSk7XG4gICAgICAgIG1EYXlzID0gdGhpcy5nZXREYXlzSW5Jc2xhbWljTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICAgICAgZGF5ICs9IG1EYXlzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF5ID4gbURheXMpIHtcbiAgICAgIHdoaWxlIChkYXkgPiBtRGF5cykge1xuICAgICAgICBkYXkgLT0gbURheXM7XG4gICAgICAgIGRhdGUgPSB0aGlzLnNldE1vbnRoKGRhdGUsIGRhdGUubW9udGggKyAxKTtcbiAgICAgICAgbURheXMgPSB0aGlzLmdldERheXNJbklzbGFtaWNNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuICAgICAgfVxuICAgIH1cbiAgICBkYXRlLmRheSA9IGRheTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHNldE1vbnRoKGRhdGU6IE5nYkRhdGUsIG1vbnRoOiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgICBtb250aCA9ICttb250aDtcbiAgICBkYXRlLnllYXIgPSBkYXRlLnllYXIgKyBNYXRoLmZsb29yKChtb250aCAtIDEpIC8gMTIpO1xuICAgIGRhdGUubW9udGggPSBNYXRoLmZsb29yKCgobW9udGggLSAxKSAlIDEyICsgMTIpICUgMTIpICsgMTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHNldFllYXIoZGF0ZTogTmdiRGF0ZSwgeWVhclZhbHVlOiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgICBkYXRlLnllYXIgPSAreWVhclZhbHVlO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgYWJzdHJhY3QgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKTogbnVtYmVyO1xuXG4gIGFic3RyYWN0IGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuXG4gIGFic3RyYWN0IGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuXG4gIGFic3RyYWN0IGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKTogbnVtYmVyO1xuXG4gIGFic3RyYWN0IGdldFRvZGF5KCk6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSGlqcmkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxuICAgKiBgZ0RhdGVgIGlzIHMgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXG4gICAqL1xuICBhYnN0cmFjdCBmcm9tR3JlZ29yaWFuKGdEYXRlOiBEYXRlKTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIGN1cnJlbnQgSGlqcmkgZGF0ZSB0byBHcmVnb3JpYW4uXG4gICAqL1xuICBhYnN0cmFjdCB0b0dyZWdvcmlhbihoaWpyaURhdGU6IE5nYkRhdGUpOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhpanJpIG1vbnRoLlxuICAgKiBgbW9udGhgIGlzIDEgZm9yIE11aGFycmFtLCAyIGZvciBTYWZhciwgZXRjLlxuICAgKiBgeWVhcmAgaXMgYW55IEhpanJpIHllYXIuXG4gICAqL1xuICBhYnN0cmFjdCBnZXREYXlzSW5Jc2xhbWljTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyO1xuXG4gIHByb3RlY3RlZCBfaXNJc2xhbWljTGVhcFllYXIoeWVhcjogbnVtYmVyKTogYm9vbGVhbiB7IHJldHVybiAoMTQgKyAxMSAqIHllYXIpICUgMzAgPCAxMTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdGFydCBvZiBIaWpyaSBNb250aC5cbiAgICogYG1vbnRoYCBpcyAwIGZvciBNdWhhcnJhbSwgMSBmb3IgU2FmYXIsIGV0Yy5cbiAgICogYHllYXJgIGlzIGFueSBIaWpyaSB5ZWFyLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRNb250aFN0YXJ0KHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCgyOS41ICogbW9udGgpICsgKHllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIHllYXIpIC8gMzAuMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhcnQgb2YgSGlqcmkgeWVhci5cbiAgICogYHllYXJgIGlzIGFueSBIaWpyaSB5ZWFyLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRZZWFyU3RhcnQoeWVhcjogbnVtYmVyKTogbnVtYmVyIHsgcmV0dXJuICh5ZWFyIC0gMSkgKiAzNTQgKyBNYXRoLmZsb29yKCgzICsgMTEgKiB5ZWFyKSAvIDMwLjApOyB9XG59XG4iLCJpbXBvcnQge05nYkNhbGVuZGFySGlqcml9IGZyb20gJy4vbmdiLWNhbGVuZGFyLWhpanJpJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JQZXJpb2R9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5mdW5jdGlvbiBpc0dyZWdvcmlhbkxlYXBZZWFyKGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMDtcbn1cblxuZnVuY3Rpb24gbW9kKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIGEgLSBiICogTWF0aC5mbG9vcihhIC8gYik7XG59XG5cbi8qKlxuICogVGhlIGNpdmlsIGNhbGVuZGFyIGlzIG9uZSB0eXBlIG9mIEhpanJpIGNhbGVuZGFycyB1c2VkIGluIGlzbGFtaWMgY291bnRyaWVzLlxuICogVXNlcyBhIGZpeGVkIGN5Y2xlIG9mIGFsdGVybmF0aW5nIDI5LSBhbmQgMzAtZGF5IG1vbnRocyxcbiAqIHdpdGggYSBsZWFwIGRheSBhZGRlZCB0byB0aGUgbGFzdCBtb250aCBvZiAxMSBvdXQgb2YgZXZlcnkgMzAgeWVhcnMuXG4gKiBodHRwOi8vY2xkci51bmljb2RlLm9yZy9kZXZlbG9wbWVudC9kZXZlbG9wbWVudC1wcm9jZXNzL2Rlc2lnbi1wcm9wb3NhbHMvaXNsYW1pYy1jYWxlbmRhci10eXBlc1xuICogQWxsIHRoZSBjYWxjdWxhdGlvbnMgaGVyZSBhcmUgYmFzZWQgb24gdGhlIGVxdWF0aW9ucyBmcm9tIFwiQ2FsZW5kcmljYWwgQ2FsY3VsYXRpb25zXCIgQnkgRWR3YXJkIE0uIFJlaW5nb2xkLCBOYWNodW1cbiAqIERlcnNob3dpdHouXG4gKi9cblxuY29uc3QgR1JFR09SSUFOX0VQT0NIID0gMTcyMTQyNS41O1xuY29uc3QgSVNMQU1JQ19FUE9DSCA9IDE5NDg0MzkuNTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFySXNsYW1pY0NpdmlsIGV4dGVuZHMgTmdiQ2FsZW5kYXJIaWpyaSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IGlzbGFtaWMoY2l2aWwpIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cbiAgICogYGdkYXRlYCBpcyBhIEpTIERhdGUgdG8gYmUgY29udmVydGVkIHRvIEhpanJpLlxuICAgKi9cbiAgZnJvbUdyZWdvcmlhbihnZGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShnZGF0ZSk7XG4gICAgY29uc3QgZ1llYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksIGdNb250aCA9IGRhdGUuZ2V0TW9udGgoKSwgZ0RheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgbGV0IGp1bGlhbkRheSA9IEdSRUdPUklBTl9FUE9DSCAtIDEgKyAzNjUgKiAoZ1llYXIgLSAxKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0KSArXG4gICAgICAgIC1NYXRoLmZsb29yKChnWWVhciAtIDEpIC8gMTAwKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0MDApICtcbiAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICgzNjcgKiAoZ01vbnRoICsgMSkgLSAzNjIpIC8gMTIgKyAoZ01vbnRoICsgMSA8PSAyID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIoZGF0ZSkgPyAtMSA6IC0yKSArIGdEYXkpO1xuICAgIGp1bGlhbkRheSA9IE1hdGguZmxvb3IoanVsaWFuRGF5KSArIDAuNTtcblxuICAgIGNvbnN0IGRheXMgPSBqdWxpYW5EYXkgLSBJU0xBTUlDX0VQT0NIO1xuICAgIGNvbnN0IGhZZWFyID0gTWF0aC5mbG9vcigoMzAgKiBkYXlzICsgMTA2NDYpIC8gMTA2MzEuMCk7XG4gICAgbGV0IGhNb250aCA9IE1hdGguY2VpbCgoZGF5cyAtIDI5IC0gdGhpcy5fZ2V0WWVhclN0YXJ0KGhZZWFyKSkgLyAyOS41KTtcbiAgICBoTW9udGggPSBNYXRoLm1pbihoTW9udGgsIDExKTtcbiAgICBjb25zdCBoRGF5ID0gTWF0aC5jZWlsKGRheXMgLSB0aGlzLl9nZXRNb250aFN0YXJ0KGhZZWFyLCBoTW9udGgpKSArIDE7XG4gICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGggKyAxLCBoRGF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IEpTIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBpc2xhbWljKGNpdmlsKSBkYXRlLlxuICAgKiBgaGlqcmlEYXRlYCBpcyBhbiBpc2xhbWljKGNpdmlsKSBkYXRlIHRvIGJlIGNvbnZlcnRlZCB0byBHcmVnb3JpYW4uXG4gICAqL1xuICB0b0dyZWdvcmlhbihoaWpyaURhdGU6IE5nYkRhdGUpOiBEYXRlIHtcbiAgICBjb25zdCBoWWVhciA9IGhpanJpRGF0ZS55ZWFyO1xuICAgIGNvbnN0IGhNb250aCA9IGhpanJpRGF0ZS5tb250aCAtIDE7XG4gICAgY29uc3QgaERhdGUgPSBoaWpyaURhdGUuZGF5O1xuICAgIGNvbnN0IGp1bGlhbkRheSA9XG4gICAgICAgIGhEYXRlICsgTWF0aC5jZWlsKDI5LjUgKiBoTW9udGgpICsgKGhZZWFyIC0gMSkgKiAzNTQgKyBNYXRoLmZsb29yKCgzICsgMTEgKiBoWWVhcikgLyAzMCkgKyBJU0xBTUlDX0VQT0NIIC0gMTtcblxuICAgIGNvbnN0IHdqZCA9IE1hdGguZmxvb3IoanVsaWFuRGF5IC0gMC41KSArIDAuNSwgZGVwb2NoID0gd2pkIC0gR1JFR09SSUFOX0VQT0NILFxuICAgICAgICAgIHF1YWRyaWNlbnQgPSBNYXRoLmZsb29yKGRlcG9jaCAvIDE0NjA5NyksIGRxYyA9IG1vZChkZXBvY2gsIDE0NjA5NyksIGNlbnQgPSBNYXRoLmZsb29yKGRxYyAvIDM2NTI0KSxcbiAgICAgICAgICBkY2VudCA9IG1vZChkcWMsIDM2NTI0KSwgcXVhZCA9IE1hdGguZmxvb3IoZGNlbnQgLyAxNDYxKSwgZHF1YWQgPSBtb2QoZGNlbnQsIDE0NjEpLFxuICAgICAgICAgIHlpbmRleCA9IE1hdGguZmxvb3IoZHF1YWQgLyAzNjUpO1xuICAgIGxldCB5ZWFyID0gcXVhZHJpY2VudCAqIDQwMCArIGNlbnQgKiAxMDAgKyBxdWFkICogNCArIHlpbmRleDtcbiAgICBpZiAoIShjZW50ID09PSA0IHx8IHlpbmRleCA9PT0gNCkpIHtcbiAgICAgIHllYXIrKztcbiAgICB9XG5cbiAgICBjb25zdCBnWWVhclN0YXJ0ID0gR1JFR09SSUFOX0VQT0NIICsgMzY1ICogKHllYXIgLSAxKSArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpIC0gTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSArXG4gICAgICAgIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQwMCk7XG5cbiAgICBjb25zdCB5ZWFyZGF5ID0gd2pkIC0gZ1llYXJTdGFydDtcblxuICAgIGNvbnN0IHRqZCA9IEdSRUdPUklBTl9FUE9DSCAtIDEgKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcbiAgICAgICAgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKSArIE1hdGguZmxvb3IoNzM5IC8gMTIgKyAoaXNHcmVnb3JpYW5MZWFwWWVhcihuZXcgRGF0ZSh5ZWFyLCAzLCAxKSkgPyAtMSA6IC0yKSArIDEpO1xuXG4gICAgY29uc3QgbGVhcGFkaiA9IHdqZCA8IHRqZCA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIDMsIDEpKSA/IDEgOiAyO1xuXG4gICAgY29uc3QgbW9udGggPSBNYXRoLmZsb29yKCgoeWVhcmRheSArIGxlYXBhZGopICogMTIgKyAzNzMpIC8gMzY3KTtcbiAgICBjb25zdCB0amQyID0gR1JFR09SSUFOX0VQT0NIIC0gMSArIDM2NSAqICh5ZWFyIC0gMSkgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0KSAtIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDEwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApICtcbiAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICgzNjcgKiBtb250aCAtIDM2MikgLyAxMiArIChtb250aCA8PSAyID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCAxKSkgPyAtMSA6IC0yKSArXG4gICAgICAgICAgICAxKTtcblxuICAgIGNvbnN0IGRheSA9IHdqZCAtIHRqZDIgKyAxO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhpanJpIG1vbnRoLlxuICAgKiBgbW9udGhgIGlzIDEgZm9yIE11aGFycmFtLCAyIGZvciBTYWZhciwgZXRjLlxuICAgKiBgeWVhcmAgaXMgYW55IEhpanJpIHllYXIuXG4gICAqL1xuICBnZXREYXlzSW5Jc2xhbWljTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICB5ZWFyID0geWVhciArIE1hdGguZmxvb3IobW9udGggLyAxMyk7XG4gICAgbW9udGggPSAoKG1vbnRoIC0gMSkgJSAxMikgKyAxO1xuICAgIGxldCBsZW5ndGggPSAyOSArIG1vbnRoICUgMjtcbiAgICBpZiAobW9udGggPT09IDEyICYmIHRoaXMuX2lzSXNsYW1pY0xlYXBZZWFyKHllYXIpKSB7XG4gICAgICBsZW5ndGgrKztcbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfVxuXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcbiAgICBkYXRlID0gTmdiRGF0ZS5mcm9tKGRhdGUpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBkYXRlID0gdGhpcy5zZXRZZWFyKGRhdGUsIGRhdGUueWVhciArIG51bWJlcik7XG4gICAgICAgIGRhdGUubW9udGggPSAxO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIGRhdGUgPSB0aGlzLnNldE1vbnRoKGRhdGUsIGRhdGUubW9udGggKyBudW1iZXIpO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIHJldHVybiB0aGlzLnNldERheShkYXRlLCBkYXRlLmRheSArIG51bWJlcik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGRheSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSkuZ2V0RGF5KCk7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcbiAgfVxuXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcbiAgICAgIGZpcnN0RGF5T2ZXZWVrID0gMDtcbiAgICB9XG5cbiAgICBjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcbiAgICBjb25zdCBkYXRlID0gd2Vla1t0aHVyc2RheUluZGV4XTtcblxuICAgIGNvbnN0IGpzRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSk7XG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XG4gICAgY29uc3QgdGltZSA9IGpzRGF0ZS5nZXRUaW1lKCk7XG4gICAgY29uc3QgTXVoRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4obmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCAxLCAxKSk7ICAvLyBDb21wYXJlIHdpdGggTXVoYXJyYW0gMVxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQoKHRpbWUgLSBNdWhEYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XG4gIH1cblxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIHRoaXMuZnJvbUdyZWdvcmlhbihuZXcgRGF0ZSgpKTsgfVxufVxuIiwiaW1wb3J0IHtOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbH0gZnJvbSAnLi9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbCc7XG5pbXBvcnQge05nYkNhbGVuZGFySGlqcml9IGZyb20gJy4vbmdiLWNhbGVuZGFyLWhpanJpJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JQZXJpb2R9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFVtYWxxdXJhIGNhbGVuZGFyIGlzIG9uZSB0eXBlIG9mIEhpanJpIGNhbGVuZGFycyB1c2VkIGluIGlzbGFtaWMgY291bnRyaWVzLlxuICogVGhpcyBDYWxlbmRhciBpcyB1c2VkIGJ5IFNhdWRpIEFyYWJpYSBmb3IgYWRtaW5pc3RyYXRpdmUgcHVycG9zZS5cbiAqIFVubGlrZSB0YWJ1bGFyIGNhbGVuZGFycywgdGhlIGFsZ29yaXRobSBpbnZvbHZlcyBhc3Ryb25vbWljYWwgY2FsY3VsYXRpb24sIGJ1dCBpdCdzIHN0aWxsIGRldGVybWluaXN0aWMuXG4gKiBodHRwOi8vY2xkci51bmljb2RlLm9yZy9kZXZlbG9wbWVudC9kZXZlbG9wbWVudC1wcm9jZXNzL2Rlc2lnbi1wcm9wb3NhbHMvaXNsYW1pYy1jYWxlbmRhci10eXBlc1xuICovXG5cbmNvbnN0IEdSRUdPUklBTl9GSVJTVF9EQVRFID0gbmV3IERhdGUoMTg4MiwgMTAsIDEyKTtcbmNvbnN0IEdSRUdPUklBTl9MQVNUX0RBVEUgPSBuZXcgRGF0ZSgyMTc0LCAxMCwgMjUpO1xuY29uc3QgSElKUklfQkVHSU4gPSAxMzAwO1xuY29uc3QgSElKUklfRU5EID0gMTYwMDtcbmNvbnN0IE9ORV9EQVkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuY29uc3QgSVNMQU1JQ19DSVZJTCA9IG5ldyBOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbCgpO1xuXG5jb25zdCBNT05USF9MRU5HVEggPSBbXG4gIC8vIDEzMDAtMTMwNFxuICAnMTAxMDEwMTAxMDEwJywgJzExMDEwMTAxMDEwMCcsICcxMTEwMTEwMDEwMDEnLCAnMDExMDExMDEwMTAwJywgJzAxMTAxMTEwMTAxMCcsXG4gIC8vIDEzMDUtMTMwOVxuICAnMDAxMTAxMTAxMTAwJywgJzEwMTAxMDEwMTEwMScsICcwMTAxMDEwMTAxMDEnLCAnMDExMDEwMTAxMDAxJywgJzAxMTExMDAxMDAxMCcsXG4gIC8vIDEzMTAtMTMxNFxuICAnMTAxMTEwMTAxMDAxJywgJzAxMDExMTAxMDEwMCcsICcxMDEwMTEwMTEwMTAnLCAnMDEwMTAxMDExMTAwJywgJzExMDEwMDEwMTEwMScsXG4gIC8vIDEzMTUtMTMxOVxuICAnMDExMDEwMDEwMTAxJywgJzAxMTEwMTAwMTAxMCcsICcxMDExMDEwMTAxMDAnLCAnMTAxMTAxMTAxMDEwJywgJzAxMDExMDEwMTEwMScsXG4gIC8vIDEzMjAtMTMyNFxuICAnMDEwMDEwMTAxMTEwJywgJzEwMTAwMTAwMTExMScsICcwMTAxMDAwMTAxMTEnLCAnMDExMDEwMDAxMDExJywgJzAxMTAxMDEwMDEwMScsXG4gIC8vIDEzMjUtMTMyOVxuICAnMTAxMDExMDEwMTAxJywgJzAwMTAxMTAxMDExMCcsICcxMDAxMDEwMTEwMTEnLCAnMDEwMDEwMDExMTAxJywgJzEwMTAwMTAwMTEwMScsXG4gIC8vIDEzMzAtMTMzNFxuICAnMTEwMTAwMTAwMTEwJywgJzExMDExMDAxMDEwMScsICcwMTAxMTAxMDExMDAnLCAnMTAwMTEwMTEwMTEwJywgJzAwMTAxMDExMTAxMCcsXG4gIC8vIDEzMzUtMTMzOVxuICAnMTAxMDAxMDExMDExJywgJzAxMDEwMDEwMTAxMScsICcxMDEwMTAwMTAxMDEnLCAnMDExMDExMDAxMDEwJywgJzEwMTAxMTEwMTAwMScsXG4gIC8vIDEzNDAtMTM0NFxuICAnMDAxMDExMTEwMTAwJywgJzEwMDEwMTExMDExMCcsICcwMDEwMTAxMTAxMTAnLCAnMTAwMTAxMDEwMTEwJywgJzEwMTAxMTAwMTAxMCcsXG4gIC8vIDEzNDUtMTM0OVxuICAnMTAxMTEwMTAwMTAwJywgJzEwMTExMTAxMDAxMCcsICcwMTAxMTEwMTEwMDEnLCAnMDAxMDExMDExMTAwJywgJzEwMDEwMTEwMTEwMScsXG4gIC8vIDEzNTAtMTM1NFxuICAnMDEwMTAxMDAxMTAxJywgJzEwMTAxMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLCAnMTAxMTEwMTAwMTAxJywgJzAxMDExMDExMDEwMCcsXG4gIC8vIDEzNTUtMTM1OVxuICAnMTAwMTEwMTEwMTEwJywgJzAxMDEwMTAxMDExMScsICcwMDEwMTAwMTAxMTEnLCAnMDEwMTAxMDAxMDExJywgJzAxMTAxMDEwMDAxMScsXG4gIC8vIDEzNjAtMTM2NFxuICAnMDExMTAxMDEwMDEwJywgJzEwMTEwMTEwMDEwMScsICcwMTAxMDExMDEwMTAnLCAnMTAxMDEwMTAxMDExJywgJzAxMDEwMDEwMTAxMScsXG4gIC8vIDEzNjUtMTM2OVxuICAnMTEwMDEwMDEwMTAxJywgJzExMDEwMTAwMTAxMCcsICcxMTAxMTAxMDAxMDEnLCAnMDEwMTExMDAxMDEwJywgJzEwMTAxMTAxMDExMCcsXG4gIC8vIDEzNzAtMTM3NFxuICAnMTAwMTAxMDEwMTExJywgJzAxMDAxMDEwMTAxMScsICcxMDAxMDEwMDEwMTEnLCAnMTAxMDEwMTAwMTAxJywgJzEwMTEwMTAxMDAxMCcsXG4gIC8vIDEzNzUtMTM3OVxuICAnMTAxMTAxMTAxMDEwJywgJzAxMDEwMTExMDEwMScsICcwMDEwMDExMTAxMTAnLCAnMTAwMDEwMTEwMTExJywgJzAxMDAwMTAxMTAxMScsXG4gIC8vIDEzODAtMTM4NFxuICAnMDEwMTAxMDEwMTAxJywgJzAxMDExMDEwMTAwMScsICcwMTAxMTAxMTAxMDAnLCAnMTAwMTExMDExMDEwJywgJzAxMDAxMTAxMTEwMScsXG4gIC8vIDEzODUtMTM4OVxuICAnMDAxMDAxMTAxMTEwJywgJzEwMDEwMDExMDExMCcsICcxMDEwMTAxMDEwMTAnLCAnMTEwMTAxMDEwMTAwJywgJzExMDExMDExMDAxMCcsXG4gIC8vIDEzOTAtMTM5NFxuICAnMDEwMTExMDEwMTAxJywgJzAwMTAxMTAxMTAxMCcsICcxMDAxMDEwMTEwMTEnLCAnMDEwMDEwMTAxMDExJywgJzEwMTAwMTAxMDEwMScsXG4gIC8vIDEzOTUtMTM5OVxuICAnMTAxMTAxMDAxMDAxJywgJzEwMTEwMTEwMDEwMCcsICcxMDExMDExMTAwMDEnLCAnMDEwMTEwMTEwMTAwJywgJzEwMTAxMDExMDEwMScsXG4gIC8vIDE0MDAtMTQwNFxuICAnMTAxMDAxMDEwMTAxJywgJzExMDEwMDEwMDEwMScsICcxMTEwMTAwMTAwMTAnLCAnMTExMDExMDAxMDAxJywgJzAxMTAxMTAxMDEwMCcsXG4gIC8vIDE0MDUtMTQwOVxuICAnMTAxMDExMTAxMDAxJywgJzEwMDEwMTEwMTAxMScsICcwMTAwMTAxMDEwMTEnLCAnMTAxMDEwMDEwMDExJywgJzExMDEwMTAwMTAwMScsXG4gIC8vIDE0MTAtMTQxNFxuICAnMTEwMTEwMTAwMTAwJywgJzExMDExMDExMDAxMCcsICcxMDEwMTAxMTEwMDEnLCAnMDEwMDEwMTExMDEwJywgJzEwMTAwMTAxMTAxMScsXG4gIC8vIDE0MTUtMTQxOVxuICAnMDEwMTAwMTAxMDExJywgJzEwMTAxMDAxMDEwMScsICcxMDExMDAxMDEwMTAnLCAnMTAxMTAxMDEwMTAxJywgJzAxMDEwMTAxMTEwMCcsXG4gIC8vIDE0MjAtMTQyNFxuICAnMDEwMDEwMTExMTAxJywgJzAwMTAwMDExMTEwMScsICcxMDAxMDAwMTExMDEnLCAnMTAxMDEwMDEwMTAxJywgJzEwMTEwMTAwMTAxMCcsXG4gIC8vIDE0MjUtMTQyOVxuICAnMTAxMTAxMDExMDEwJywgJzAxMDEwMTEwMTEwMScsICcwMDEwMTAxMTAxMTAnLCAnMTAwMTAwMTExMDExJywgJzAxMDAxMDAxMTAxMScsXG4gIC8vIDE0MzAtMTQzNFxuICAnMDExMDAxMDEwMTAxJywgJzAxMTAxMDEwMTAwMScsICcwMTExMDEwMTAxMDAnLCAnMTAxMTAxMTAxMDEwJywgJzAxMDEwMTEwMTEwMCcsXG4gIC8vIDE0MzUtMTQzOVxuICAnMTAxMDEwMTAxMTAxJywgJzAxMDEwMTAxMDEwMScsICcxMDExMDAxMDEwMDEnLCAnMTAxMTEwMDEwMDEwJywgJzEwMTExMDEwMTAwMScsXG4gIC8vIDE0NDAtMTQ0NFxuICAnMDEwMTExMDEwMTAwJywgJzEwMTAxMTAxMTAxMCcsICcwMTAxMDEwMTEwMTAnLCAnMTAxMDEwMTAxMDExJywgJzAxMDExMDAxMDEwMScsXG4gIC8vIDE0NDUtMTQ0OVxuICAnMDExMTAxMDAxMDAxJywgJzAxMTEwMTEwMDEwMCcsICcxMDExMTAxMDEwMTAnLCAnMDEwMTEwMTEwMTAxJywgJzAwMTAxMDExMDExMCcsXG4gIC8vIDE0NTAtMTQ1NFxuICAnMTAxMDAxMDEwMTEwJywgJzExMTAwMTAwMTEwMScsICcxMDExMDAxMDAxMDEnLCAnMTAxMTAxMDEwMDEwJywgJzEwMTEwMTEwMTAxMCcsXG4gIC8vIDE0NTUtMTQ1OVxuICAnMDEwMTEwMTAxMTAxJywgJzAwMTAxMDEwMTExMCcsICcxMDAxMDAxMDExMTEnLCAnMDEwMDEwMDEwMTExJywgJzAxMTAwMTAwMTAxMScsXG4gIC8vIDE0NjAtMTQ2NFxuICAnMDExMDEwMTAwMTAxJywgJzAxMTAxMDEwMTEwMCcsICcxMDEwMTEwMTAxMTAnLCAnMDEwMTAxMDExMTAxJywgJzAxMDAxMDAxMTEwMScsXG4gIC8vIDE0NjUtMTQ2OVxuICAnMTAxMDAxMDAxMTAxJywgJzExMDEwMDAxMDExMCcsICcxMTAxMTAwMTAxMDEnLCAnMDEwMTEwMTAxMDEwJywgJzAxMDExMDExMDEwMScsXG4gIC8vIDE0NzAtMTQ3NFxuICAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAxMDExMDEnLCAnMDEwMTEwMDEwMTAxJywgJzAxMTAxMTAwMTAxMCcsXG4gIC8vIDE0NzUtMTQ3OVxuICAnMDExMDExMTAwMTAwJywgJzEwMTAxMTEwMTAxMCcsICcwMTAwMTExMTAxMDEnLCAnMDAxMDEwMTEwMTEwJywgJzEwMDEwMTAxMDExMCcsXG4gIC8vIDE0ODAtMTQ4NFxuICAnMTAxMDEwMTAxMDEwJywgJzEwMTEwMTAxMDEwMCcsICcxMDExMTEwMTAwMTAnLCAnMDEwMTExMDExMDAxJywgJzAwMTAxMTEwMTAxMCcsXG4gIC8vIDE0ODUtMTQ4OVxuICAnMTAwMTAxMTAxMTAxJywgJzAxMDAxMDEwMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJywgJzEwMTExMDEwMDEwMScsXG4gIC8vIDE0OTAtMTQ5NFxuICAnMDEwMTEwMTEwMDEwJywgJzEwMDExMDExMDEwMScsICcwMTAwMTEwMTAxMTAnLCAnMTAxMDEwMDEwMTExJywgJzAxMDEwMTAwMDExMScsXG4gIC8vIDE0OTUtMTQ5OVxuICAnMDExMDEwMDEwMDExJywgJzAxMTEwMTAwMTAwMScsICcxMDExMDEwMTAxMDEnLCAnMDEwMTAxMTAxMDEwJywgJzEwMTAwMTEwMTAxMScsXG4gIC8vIDE1MDAtMTUwNFxuICAnMDEwMTAwMTAxMDExJywgJzEwMTAxMDAwMTAxMScsICcxMTAxMDEwMDAxMTAnLCAnMTEwMTEwMTAwMDExJywgJzAxMDExMTAwMTAxMCcsXG4gIC8vIDE1MDUtMTUwOVxuICAnMTAxMDExMDEwMTEwJywgJzAxMDAxMTAxMTAxMScsICcwMDEwMDExMDEwMTEnLCAnMTAwMTAxMDAxMDExJywgJzEwMTAxMDEwMDEwMScsXG4gIC8vIDE1MTAtMTUxNFxuICAnMTAxMTAxMDEwMDEwJywgJzEwMTEwMTEwMTAwMScsICcwMTAxMDExMTAxMDEnLCAnMDAwMTAxMTEwMTEwJywgJzEwMDAxMDExMDExMScsXG4gIC8vIDE1MTUtMTUxOVxuICAnMDAxMDAxMDExMDExJywgJzAxMDEwMDEwMTAxMScsICcwMTAxMDExMDAxMDEnLCAnMDEwMTEwMTEwMTAwJywgJzEwMDExMTAxMTAxMCcsXG4gIC8vIDE1MjAtMTUyNFxuICAnMDEwMDExMTAxMTAxJywgJzAwMDEwMTEwMTEwMScsICcxMDAwMTAxMTAxMTAnLCAnMTAxMDEwMTAwMTEwJywgJzExMDEwMTAxMDAxMCcsXG4gIC8vIDE1MjUtMTUyOVxuICAnMTEwMTEwMTAxMDAxJywgJzAxMDExMTAxMDEwMCcsICcxMDEwMTEwMTEwMTAnLCAnMTAwMTAxMDExMDExJywgJzAxMDAxMDEwMTAxMScsXG4gIC8vIDE1MzAtMTUzNFxuICAnMDExMDAxMDEwMDExJywgJzAxMTEwMDEwMTAwMScsICcwMTExMDExMDAwMTAnLCAnMTAxMTEwMTAxMDAxJywgJzAxMDExMDExMDAxMCcsXG4gIC8vIDE1MzUtMTUzOVxuICAnMTAxMDEwMTEwMTAxJywgJzAxMDEwMTAxMDEwMScsICcxMDExMDAxMDAxMDEnLCAnMTEwMTEwMDEwMDEwJywgJzExMTAxMTAwMTAwMScsXG4gIC8vIDE1NDAtMTU0NFxuICAnMDExMDExMDEwMDEwJywgJzEwMTAxMTEwMTAwMScsICcwMTAxMDExMDEwMTEnLCAnMDEwMDEwMTAxMDExJywgJzEwMTAwMTAxMDEwMScsXG4gIC8vIDE1NDUtMTU0OVxuICAnMTEwMTAwMTAxMDAxJywgJzExMDEwMTAxMDEwMCcsICcxMTAxMTAxMDEwMTAnLCAnMTAwMTEwMTEwMTAxJywgJzAxMDAxMDExMTAxMCcsXG4gIC8vIDE1NTAtMTU1NFxuICAnMTAxMDAwMTExMDExJywgJzAxMDAxMDAxMTAxMScsICcxMDEwMDEwMDExMDEnLCAnMTAxMDEwMTAxMDEwJywgJzEwMTAxMTAxMDEwMScsXG4gIC8vIDE1NTUtMTU1OVxuICAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTEwMScsICcwMTAwMDEwMTExMTAnLCAnMTAxMDAwMTAxMTEwJywgJzExMDAxMDAxMTAxMCcsXG4gIC8vIDE1NjAtMTU2NFxuICAnMTEwMTAxMDEwMTAxJywgJzAxMTAxMDExMDAxMCcsICcwMTEwMTAxMTEwMDEnLCAnMDEwMDEwMTExMDEwJywgJzEwMTAwMTAxMTEwMScsXG4gIC8vIDE1NjUtMTU2OVxuICAnMDEwMTAwMTAxMTAxJywgJzEwMTAxMDAxMDEwMScsICcxMDExMDEwMTAwMTAnLCAnMTAxMTEwMTAxMDAwJywgJzEwMTExMDExMDEwMCcsXG4gIC8vIDE1NzAtMTU3NFxuICAnMDEwMTEwMTExMDAxJywgJzAwMTAxMTAxMTAxMCcsICcxMDAxMDEwMTEwMTAnLCAnMTAxMTAxMDAxMDEwJywgJzExMDExMDEwMDEwMCcsXG4gIC8vIDE1NzUtMTU3OVxuICAnMTExMDExMDEwMDAxJywgJzAxMTAxMTEwMTAwMCcsICcxMDExMDExMDEwMTAnLCAnMDEwMTAxMTAxMTAxJywgJzAxMDEwMDExMDEwMScsXG4gIC8vIDE1ODAtMTU4NFxuICAnMDExMDEwMDEwMTAxJywgJzExMDEwMTAwMTAxMCcsICcxMTAxMTAxMDEwMDAnLCAnMTEwMTExMDEwMTAwJywgJzAxMTAxMTAxMTAxMCcsXG4gIC8vIDE1ODUtMTU4OVxuICAnMDEwMTAxMDExMDExJywgJzAwMTAxMDAxMTEwMScsICcwMTEwMDAxMDEwMTEnLCAnMTAxMTAwMDEwMTAxJywgJzEwMTEwMTAwMTAxMCcsXG4gIC8vIDE1OTAtMTU5NFxuICAnMTAxMTEwMDEwMTAxJywgJzAxMDExMDEwMTAxMCcsICcxMDEwMTAxMDExMTAnLCAnMTAwMTAwMTAxMTEwJywgJzExMDAxMDAwMTExMScsXG4gIC8vIDE1OTUtMTU5OVxuICAnMDEwMTAwMTAwMTExJywgJzAxMTAxMDAxMDEwMScsICcwMTEwMTAxMDEwMTAnLCAnMTAxMDExMDEwMTEwJywgJzAxMDEwMTAxMTEwMScsXG4gIC8vIDE2MDBcbiAgJzAwMTAxMDAxMTEwMSdcbl07XG5cbmZ1bmN0aW9uIGdldERheXNEaWZmKGRhdGUxOiBEYXRlLCBkYXRlMjogRGF0ZSk6IG51bWJlciB7XG4gIGNvbnN0IGRpZmYgPSBNYXRoLmFicyhkYXRlMS5nZXRUaW1lKCkgLSBkYXRlMi5nZXRUaW1lKCkpO1xuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gT05FX0RBWSk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhcklzbGFtaWNVbWFscXVyYSBleHRlbmRzIE5nYkNhbGVuZGFySGlqcmkge1xuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IGlzbGFtaWMoVW1hbHF1cmEpIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cbiAgKiBgZ2RhdGVgIGlzIHMgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXG4gICovXG4gIGZyb21HcmVnb3JpYW4oZ0RhdGU6IERhdGUpOiBOZ2JEYXRlIHtcbiAgICBsZXQgaERheSA9IDEsIGhNb250aCA9IDAsIGhZZWFyID0gMTMwMDtcbiAgICBsZXQgZGF5c0RpZmYgPSBnZXREYXlzRGlmZihnRGF0ZSwgR1JFR09SSUFOX0ZJUlNUX0RBVEUpO1xuICAgIGlmIChnRGF0ZS5nZXRUaW1lKCkgLSBHUkVHT1JJQU5fRklSU1RfREFURS5nZXRUaW1lKCkgPj0gMCAmJiBnRGF0ZS5nZXRUaW1lKCkgLSBHUkVHT1JJQU5fTEFTVF9EQVRFLmdldFRpbWUoKSA8PSAwKSB7XG4gICAgICBsZXQgeWVhciA9IDEzMDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1PTlRIX0xFTkdUSC5sZW5ndGg7IGkrKywgeWVhcisrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTI7IGorKykge1xuICAgICAgICAgIGxldCBudW1PZkRheXMgPSArTU9OVEhfTEVOR1RIW2ldW2pdICsgMjk7XG4gICAgICAgICAgaWYgKGRheXNEaWZmIDw9IG51bU9mRGF5cykge1xuICAgICAgICAgICAgaERheSA9IGRheXNEaWZmICsgMTtcbiAgICAgICAgICAgIGlmIChoRGF5ID4gbnVtT2ZEYXlzKSB7XG4gICAgICAgICAgICAgIGhEYXkgPSAxO1xuICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaiA+IDExKSB7XG4gICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICB5ZWFyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoTW9udGggPSBqO1xuICAgICAgICAgICAgaFllYXIgPSB5ZWFyO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGggKyAxLCBoRGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF5c0RpZmYgPSBkYXlzRGlmZiAtIG51bU9mRGF5cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gSVNMQU1JQ19DSVZJTC5mcm9tR3JlZ29yaWFuKGdEYXRlKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICogQ29udmVydHMgdGhlIGN1cnJlbnQgSGlqcmkgZGF0ZSB0byBHcmVnb3JpYW4uXG4gICovXG4gIHRvR3JlZ29yaWFuKGhpanJpRGF0ZTogTmdiRGF0ZSk6IERhdGUge1xuICAgIGNvbnN0IGhZZWFyID0gaGlqcmlEYXRlLnllYXI7XG4gICAgY29uc3QgaE1vbnRoID0gaGlqcmlEYXRlLm1vbnRoIC0gMTtcbiAgICBjb25zdCBoRGF5ID0gaGlqcmlEYXRlLmRheTtcbiAgICBsZXQgZ0RhdGUgPSBuZXcgRGF0ZShHUkVHT1JJQU5fRklSU1RfREFURSk7XG4gICAgbGV0IGRheURpZmYgPSBoRGF5IC0gMTtcbiAgICBpZiAoaFllYXIgPj0gSElKUklfQkVHSU4gJiYgaFllYXIgPD0gSElKUklfRU5EKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhZZWFyIC0gSElKUklfQkVHSU47IHkrKykge1xuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDEyOyBtKyspIHtcbiAgICAgICAgICBkYXlEaWZmICs9ICtNT05USF9MRU5HVEhbeV1bbV0gKyAyOTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCBoTW9udGg7IG0rKykge1xuICAgICAgICBkYXlEaWZmICs9ICtNT05USF9MRU5HVEhbaFllYXIgLSBISUpSSV9CRUdJTl1bbV0gKyAyOTtcbiAgICAgIH1cbiAgICAgIGdEYXRlLnNldERhdGUoR1JFR09SSUFOX0ZJUlNUX0RBVEUuZ2V0RGF0ZSgpICsgZGF5RGlmZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdEYXRlID0gSVNMQU1JQ19DSVZJTC50b0dyZWdvcmlhbihoaWpyaURhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ0RhdGU7XG4gIH1cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBzcGVjaWZpYyBIaWpyaSBtb250aC5cbiAgKiBgbW9udGhgIGlzIDEgZm9yIE11aGFycmFtLCAyIGZvciBTYWZhciwgZXRjLlxuICAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cbiAgKi9cbiAgZ2V0RGF5c0luSXNsYW1pY01vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHllYXIgPj0gSElKUklfQkVHSU4gJiYgeWVhciA8PSBISUpSSV9FTkQpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHllYXIgLSBISUpSSV9CRUdJTjtcbiAgICAgIHJldHVybiBNT05USF9MRU5HVEhbcG9zXS5jaGFyQXQobW9udGggLSAxKSA9PT0gJzEnID8gMzAgOiAyOTtcbiAgICB9XG4gICAgcmV0dXJuIElTTEFNSUNfQ0lWSUwuZ2V0RGF5c0luSXNsYW1pY01vbnRoKG1vbnRoLCB5ZWFyKTtcbiAgfVxuXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcbiAgICBkYXRlID0gTmdiRGF0ZS5mcm9tKGRhdGUpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBkYXRlID0gdGhpcy5zZXRZZWFyKGRhdGUsIGRhdGUueWVhciArIG51bWJlcik7XG4gICAgICAgIGRhdGUubW9udGggPSAxO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIGRhdGUgPSB0aGlzLnNldE1vbnRoKGRhdGUsIGRhdGUubW9udGggKyBudW1iZXIpO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIHJldHVybiB0aGlzLnNldERheShkYXRlLCBkYXRlLmRheSArIG51bWJlcik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGRheSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSkuZ2V0RGF5KCk7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcbiAgfVxuXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcbiAgICAgIGZpcnN0RGF5T2ZXZWVrID0gMDtcbiAgICB9XG5cbiAgICBjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcbiAgICBjb25zdCBkYXRlID0gd2Vla1t0aHVyc2RheUluZGV4XTtcblxuICAgIGNvbnN0IGpzRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSk7XG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XG4gICAgY29uc3QgdGltZSA9IGpzRGF0ZS5nZXRUaW1lKCk7XG4gICAgY29uc3QgTXVoRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4obmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCAxLCAxKSk7ICAvLyBDb21wYXJlIHdpdGggTXVoYXJyYW0gMVxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQoKHRpbWUgLSBNdWhEYXRlLmdldFRpbWUoKSkgLyBPTkVfREFZKSAvIDcpICsgMTtcbiAgfVxuXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gdGhpcy5mcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8RGF0ZT4ge1xuICBmcm9tTW9kZWwoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIHJldHVybiAoZGF0ZSAmJiBkYXRlLmdldEZ1bGxZZWFyKSA/IHt5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgfVxuXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IERhdGUge1xuICAgIHJldHVybiBkYXRlICYmIGRhdGUueWVhciAmJiBkYXRlLm1vbnRoID8gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXkpIDogbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgRGF0ZVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXInO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTW9udGhWaWV3fSBmcm9tICcuL2RhdGVwaWNrZXItbW9udGgtdmlldyc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJOYXZpZ2F0aW9ufSBmcm9tICcuL2RhdGVwaWNrZXItbmF2aWdhdGlvbic7XG5pbXBvcnQge05nYklucHV0RGF0ZXBpY2tlcn0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlclRvZ2dsZX0gZnJvbSAnLi9kYXRlcGlja2VyLXRvZ2dsZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJEYXlWaWV3fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXZpZXcnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4biwgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0fSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5pbXBvcnQge05nYkNhbGVuZGFyLCBOZ2JDYWxlbmRhckdyZWdvcmlhbn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbH0gZnJvbSAnLi9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbCc7XG5pbXBvcnQge05nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhfSBmcm9tICcuL2hpanJpL25nYi1jYWxlbmRhci1pc2xhbWljLXVtYWxxdXJhJztcbmltcG9ydCB7TmdiRGF0ZVBhcnNlckZvcm1hdHRlciwgTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyJztcbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXIsIE5nYkRhdGVTdHJ1Y3RBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvblNlbGVjdH0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XG5cbmV4cG9ydCB7TmdiRGF0ZXBpY2tlciwgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnR9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5leHBvcnQge05nYklucHV0RGF0ZXBpY2tlcn0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0JztcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlclRvZ2dsZX0gZnJvbSAnLi9kYXRlcGlja2VyLXRvZ2dsZSc7XG5leHBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5leHBvcnQge05nYkNhbGVuZGFySXNsYW1pY0NpdmlsfSBmcm9tICcuL2hpanJpL25nYi1jYWxlbmRhci1pc2xhbWljLWNpdmlsJztcbmV4cG9ydCB7TmdiQ2FsZW5kYXJJc2xhbWljVW1hbHF1cmF9IGZyb20gJy4vaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtdW1hbHF1cmEnO1xuZXhwb3J0IHtOZ2JEYXRlcGlja2VyTW9udGhWaWV3fSBmcm9tICcuL2RhdGVwaWNrZXItbW9udGgtdmlldyc7XG5leHBvcnQge05nYkRhdGVwaWNrZXJEYXlWaWV3fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXZpZXcnO1xuZXhwb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbn0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24nO1xuZXhwb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvblNlbGVjdH0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0JztcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XG5leHBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5leHBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmV4cG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XG5leHBvcnQge05nYkRhdGVOYXRpdmVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS1hZGFwdGVyJztcbmV4cG9ydCB7TmdiRGF0ZVBhcnNlckZvcm1hdHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmdiRGF0ZXBpY2tlciwgTmdiRGF0ZXBpY2tlck1vbnRoVmlldywgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb24sIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0LCBOZ2JEYXRlcGlja2VyRGF5VmlldyxcbiAgICBOZ2JJbnB1dERhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJUb2dnbGVcbiAgXSxcbiAgZXhwb3J0czogW05nYkRhdGVwaWNrZXIsIE5nYklucHV0RGF0ZXBpY2tlciwgTmdiRGF0ZXBpY2tlclRvZ2dsZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiRGF0ZXBpY2tlcl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmdiRGF0ZXBpY2tlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogTmdiQ2FsZW5kYXIsIHVzZUNsYXNzOiBOZ2JDYWxlbmRhckdyZWdvcmlhbn0sXG4gICAgICAgIHtwcm92aWRlOiBOZ2JEYXRlcGlja2VySTE4biwgdXNlQ2xhc3M6IE5nYkRhdGVwaWNrZXJJMThuRGVmYXVsdH0sXG4gICAgICAgIHtwcm92aWRlOiBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLCB1c2VDbGFzczogTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlcn0sXG4gICAgICAgIHtwcm92aWRlOiBOZ2JEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE5nYkRhdGVTdHJ1Y3RBZGFwdGVyfSwgTmdiRGF0ZXBpY2tlckNvbmZpZywgRGF0ZVBpcGVcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiRHJvcGRvd24gZGlyZWN0aXZlLlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGRyb3Bkb3ducyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duQ29uZmlnIHtcbiAgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZScgPSB0cnVlO1xuICBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2JvdHRvbS1sZWZ0Jztcbn1cbiIsImltcG9ydCB7XG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgTmdab25lLFxuICBSZW5kZXJlcjIsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge2Zyb21FdmVudH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge05nYkRyb3Bkb3duQ29uZmlnfSBmcm9tICcuL2Ryb3Bkb3duLWNvbmZpZyc7XG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudEFycmF5LCBQbGFjZW1lbnR9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcblxuLyoqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bk1lbnVdJyxcbiAgaG9zdDogeydbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnZHJvcGRvd24uaXNPcGVuKCknLCAnW2F0dHIueC1wbGFjZW1lbnRdJzogJ3BsYWNlbWVudCd9XG59KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTWVudSB7XG4gIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ2JvdHRvbSc7XG4gIGlzT3BlbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgaXNFdmVudEZyb20oJGV2ZW50KSB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoJGV2ZW50LnRhcmdldCk7IH1cblxuICBwb3NpdGlvbih0cmlnZ2VyRWwsIHBsYWNlbWVudCkge1xuICAgIHRoaXMuYXBwbHlQbGFjZW1lbnQocG9zaXRpb25FbGVtZW50cyh0cmlnZ2VyRWwsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcGxhY2VtZW50KSk7XG4gIH1cblxuICBhcHBseVBsYWNlbWVudChfcGxhY2VtZW50OiBQbGFjZW1lbnQpIHtcbiAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgcGxhY2VtZW50IGNsYXNzZXNcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgJ2Ryb3B1cCcpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcGRvd24nKTtcbiAgICB0aGlzLnBsYWNlbWVudCA9IF9wbGFjZW1lbnQ7XG4gICAgLyoqXG4gICAgICogYXBwbHkgdGhlIG5ldyBwbGFjZW1lbnRcbiAgICAgKiBpbiBjYXNlIG9mIHRvcCB1c2UgdXAtYXJyb3cgb3IgZG93bi1hcnJvdyBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpZiAoX3BsYWNlbWVudC5zZWFyY2goJ150b3AnKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcHVwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcGRvd24nKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrcyBhbiBlbGVtZW50IHRvIHdoaWNoIGRyb3Bkb3duIG1lbnUgd2lsbCBiZSBhbmNob3JlZC4gVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uXG4gKiBvZiB0aGUgTmdiRHJvcGRvd25Ub2dnbGUgZGlyZWN0aXZlLiBJdCBwbGF5cyB0aGUgc2FtZSByb2xlIGFzIE5nYkRyb3Bkb3duVG9nZ2xlIGJ1dFxuICogZG9lc24ndCBsaXN0ZW4gdG8gY2xpY2sgZXZlbnRzIHRvIHRvZ2dsZSBkcm9wZG93biBtZW51IHRodXMgZW5hYmxpbmcgc3VwcG9ydCBmb3JcbiAqIGV2ZW50cyBvdGhlciB0aGFuIGNsaWNrLlxuICpcbiAqIEBzaW5jZSAxLjEuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25BbmNob3JdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLCAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJywgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25BbmNob3Ige1xuICBhbmNob3JFbDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgdGhpcy5hbmNob3JFbCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBpc0V2ZW50RnJvbSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucygkZXZlbnQudGFyZ2V0KTsgfVxufVxuXG4vKipcbiAqIEFsbG93cyB0aGUgZHJvcGRvd24gdG8gYmUgdG9nZ2xlZCB2aWEgY2xpY2suIFRoaXMgZGlyZWN0aXZlIGlzIG9wdGlvbmFsOiB5b3UgY2FuIHVzZSBOZ2JEcm9wZG93bkFuY2hvciBhcyBhblxuICogYWx0ZXJuYXRpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93blRvZ2dsZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyxcbiAgICAnKGNsaWNrKSc6ICd0b2dnbGVPcGVuKCknXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBOZ2JEcm9wZG93bkFuY2hvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd25Ub2dnbGUpfV1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Ub2dnbGUgZXh0ZW5kcyBOZ2JEcm9wZG93bkFuY2hvciB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHN1cGVyKGRyb3Bkb3duLCBlbGVtZW50UmVmKTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oKSB7IHRoaXMuZHJvcGRvd24udG9nZ2xlKCk7IH1cbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgbm9kZSBpbnRvIGEgZHJvcGRvd24uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bl0nLFxuICBleHBvcnRBczogJ25nYkRyb3Bkb3duJyxcbiAgaG9zdDogeydbY2xhc3Muc2hvd10nOiAnaXNPcGVuKCknLCAnKGRvY3VtZW50OmNsaWNrKSc6ICdjbG9zZUZyb21DbGljaygkZXZlbnQpJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd24gaW1wbGVtZW50cyBPbkluaXQsXG4gICAgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51KSBwcml2YXRlIF9tZW51OiBOZ2JEcm9wZG93bk1lbnU7XG5cbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bkFuY2hvcikgcHJpdmF0ZSBfYW5jaG9yOiBOZ2JEcm9wZG93bkFuY2hvcjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgZHJvcGRvd24gc2hvdWxkIGJlIGNsb3NlZCB3aGVuIHNlbGVjdGluZyBvbmUgb2YgZHJvcGRvd24gaXRlbXMgKGNsaWNrKSBvciBwcmVzc2luZyBFU0MuXG4gICAqIFdoZW4gaXQgaXMgdHJ1ZSAoZGVmYXVsdCkgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IGNsb3NlZCBvbiBib3RoIG91dHNpZGUgYW5kIGluc2lkZSAobWVudSkgY2xpY2tzLlxuICAgKiBXaGVuIGl0IGlzIGZhbHNlIGRyb3Bkb3ducyBhcmUgbmV2ZXIgYXV0b21hdGljYWxseSBjbG9zZWQuXG4gICAqIFdoZW4gaXQgaXMgJ291dHNpZGUnIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBjbG9zZWQgb24gb3V0c2lkZSBjbGlja3MgYnV0IG5vdCBvbiBtZW51IGNsaWNrcy5cbiAgICogV2hlbiBpdCBpcyAnaW5zaWRlJyBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgb24gbWVudSBjbGlja3MgYnV0IG5vdCBvbiBvdXRzaWRlIGNsaWNrcy5cbiAgICovXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdvdXRzaWRlJyB8ICdpbnNpZGUnO1xuXG4gIC8qKlxuICAgKiAgRGVmaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZHJvcGRvd24tbWVudSBpcyBvcGVuIGluaXRpYWxseS5cbiAgICovXG4gIEBJbnB1dCgnb3BlbicpIF9vcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIgYWNjZXB0czpcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXG4gICAqICAgIFwibGVmdFwiLCBcImxlZnQtdG9wXCIsIFwibGVmdC1ib3R0b21cIiwgXCJyaWdodFwiLCBcInJpZ2h0LXRvcFwiLCBcInJpZ2h0LWJvdHRvbVwiXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuXG4gIC8qKlxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkIG9yIGNsb3NlZC5cbiAgICogIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgd2hldGhlciBkcm9wZG93biBpcyBvcGVuLlxuICAgKi9cbiAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbmZpZzogTmdiRHJvcGRvd25Db25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcbiAgICB0aGlzLmF1dG9DbG9zZSA9IGNvbmZpZy5hdXRvQ2xvc2U7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5fcG9zaXRpb25NZW51KCk7IH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuX21lbnUpIHtcbiAgICAgIHRoaXMuX21lbnUuYXBwbHlQbGFjZW1lbnQoQXJyYXkuaXNBcnJheSh0aGlzLnBsYWNlbWVudCkgPyAodGhpcy5wbGFjZW1lbnRbMF0pIDogdGhpcy5wbGFjZW1lbnQgYXMgUGxhY2VtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBkcm9wZG93biBtZW51IGlzIG9wZW4gb3Igbm90LlxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fb3BlbjsgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cbiAgICovXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uTWVudSgpO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAgICAgKCkgPT4gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLm9wZW5DaGFuZ2UucGlwZShmaWx0ZXIob3BlbiA9PiBvcGVuID09PSBmYWxzZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudC53aGljaCA9PT0gS2V5LkVzY2FwZSkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VGcm9tT3V0c2lkZUVzYygpO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxuICAgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlRnJvbUNsaWNrKCRldmVudCkge1xuICAgIGlmICh0aGlzLmF1dG9DbG9zZSAmJiAkZXZlbnQuYnV0dG9uICE9PSAyICYmICF0aGlzLl9pc0V2ZW50RnJvbVRvZ2dsZSgkZXZlbnQpKSB7XG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2UgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScgJiYgdGhpcy5faXNFdmVudEZyb21NZW51KCRldmVudCkpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmICF0aGlzLl9pc0V2ZW50RnJvbU1lbnUoJGV2ZW50KSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvc2VGcm9tT3V0c2lkZUVzYygpIHtcbiAgICBpZiAodGhpcy5hdXRvQ2xvc2UpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpOyB9XG5cbiAgcHJpdmF0ZSBfaXNFdmVudEZyb21Ub2dnbGUoJGV2ZW50KSB7IHJldHVybiB0aGlzLl9hbmNob3IuaXNFdmVudEZyb20oJGV2ZW50KTsgfVxuXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tTWVudSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX21lbnUgPyB0aGlzLl9tZW51LmlzRXZlbnRGcm9tKCRldmVudCkgOiBmYWxzZTsgfVxuXG4gIHByaXZhdGUgX3Bvc2l0aW9uTWVudSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSAmJiB0aGlzLl9tZW51KSB7XG4gICAgICB0aGlzLl9tZW51LnBvc2l0aW9uKHRoaXMuX2FuY2hvci5hbmNob3JFbCwgdGhpcy5wbGFjZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRyb3Bkb3duLCBOZ2JEcm9wZG93bkFuY2hvciwgTmdiRHJvcGRvd25Ub2dnbGUsIE5nYkRyb3Bkb3duTWVudX0gZnJvbSAnLi9kcm9wZG93bic7XG5pbXBvcnQge05nYkRyb3Bkb3duQ29uZmlnfSBmcm9tICcuL2Ryb3Bkb3duLWNvbmZpZyc7XG5cbmV4cG9ydCB7TmdiRHJvcGRvd24sIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnV9IGZyb20gJy4vZHJvcGRvd24nO1xuZXhwb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xuXG5jb25zdCBOR0JfRFJPUERPV05fRElSRUNUSVZFUyA9IFtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnVdO1xuXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogTkdCX0RST1BET1dOX0RJUkVDVElWRVMsIGV4cG9ydHM6IE5HQl9EUk9QRE9XTl9ESVJFQ1RJVkVTfSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bk1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JEcm9wZG93bk1vZHVsZSwgcHJvdmlkZXJzOiBbTmdiRHJvcGRvd25Db25maWddfTsgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLW1vZGFsLWJhY2tkcm9wJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBob3N0OiB7J1tjbGFzc10nOiAnXCJtb2RhbC1iYWNrZHJvcCBmYWRlIHNob3dcIiArIChiYWNrZHJvcENsYXNzID8gXCIgXCIgKyBiYWNrZHJvcENsYXNzIDogXCJcIiknfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbEJhY2tkcm9wIHtcbiAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nO1xufVxuIiwiZXhwb3J0IGVudW0gTW9kYWxEaXNtaXNzUmVhc29ucyB7XG4gIEJBQ0tEUk9QX0NMSUNLLFxuICBFU0Ncbn1cbiIsImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIE9uSW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01vZGFsRGlzbWlzc1JlYXNvbnN9IGZyb20gJy4vbW9kYWwtZGlzbWlzcy1yZWFzb25zJztcbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtd2luZG93JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ1wibW9kYWwgZmFkZSBzaG93IGQtYmxvY2tcIiArICh3aW5kb3dDbGFzcyA/IFwiIFwiICsgd2luZG93Q2xhc3MgOiBcIlwiKScsXG4gICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICcoa2V5dXAuZXNjKSc6ICdlc2NLZXkoJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnYmFja2Ryb3BDbGljaygkZXZlbnQpJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdhcmlhTGFiZWxsZWRCeScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZycgKyAoc2l6ZSA/ICcgbW9kYWwtJyArIHNpemUgOiAnJykgKyAoY2VudGVyZWQgPyAnIG1vZGFsLWRpYWxvZy1jZW50ZXJlZCcgOiAnJylcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFdpbmRvdyBpbXBsZW1lbnRzIE9uSW5pdCxcbiAgICBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9kb2N1bWVudDogYW55O1xuICBwcml2YXRlIF9lbFdpdGhGb2N1czogRWxlbWVudDsgIC8vIGVsZW1lbnQgdGhhdCBpcyBmb2N1c2VkIHByaW9yIHRvIG1vZGFsIG9wZW5pbmdcblxuICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuICBASW5wdXQoKSBiYWNrZHJvcDogYm9vbGVhbiB8IHN0cmluZyA9IHRydWU7XG4gIEBJbnB1dCgpIGNlbnRlcmVkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGtleWJvYXJkID0gdHJ1ZTtcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuICBASW5wdXQoKSB3aW5kb3dDbGFzczogc3RyaW5nO1xuXG4gIEBPdXRwdXQoJ2Rpc21pc3MnKSBkaXNtaXNzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQsIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgbmdiRm9jdXNUcmFwKHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGlzbWlzc0V2ZW50KTtcbiAgfVxuXG4gIGJhY2tkcm9wQ2xpY2soJGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmFja2Ryb3AgPT09IHRydWUgJiYgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCA9PT0gJGV2ZW50LnRhcmdldCkge1xuICAgICAgdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuQkFDS0RST1BfQ0xJQ0spO1xuICAgIH1cbiAgfVxuXG4gIGVzY0tleSgkZXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5rZXlib2FyZCAmJiAhJGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkVTQyk7XG4gICAgfVxuICB9XG5cbiAgZGlzbWlzcyhyZWFzb24pOiB2b2lkIHsgdGhpcy5kaXNtaXNzRXZlbnQuZW1pdChyZWFzb24pOyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCF0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50Wydmb2N1cyddLmFwcGx5KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIFtdKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBlbFdpdGhGb2N1cyA9IHRoaXMuX2VsV2l0aEZvY3VzO1xuXG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzO1xuICAgIGlmIChlbFdpdGhGb2N1cyAmJiBlbFdpdGhGb2N1c1snZm9jdXMnXSAmJiBib2R5LmNvbnRhaW5zKGVsV2l0aEZvY3VzKSkge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBlbFdpdGhGb2N1cztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBib2R5O1xuICAgIH1cbiAgICBlbGVtZW50VG9Gb2N1c1snZm9jdXMnXS5hcHBseShlbGVtZW50VG9Gb2N1cywgW10pO1xuXG4gICAgdGhpcy5fZWxXaXRoRm9jdXMgPSBudWxsO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHksICdtb2RhbC1vcGVuJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdG9yLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld1JlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgUmVuZGVyZXIyLFxuICBDb21wb25lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIENvbnRlbnRSZWYge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbm9kZXM6IGFueVtdLCBwdWJsaWMgdmlld1JlZj86IFZpZXdSZWYsIHB1YmxpYyBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55Pikge31cbn1cblxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZTxUPiB7XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPFQ+O1xuICBwcml2YXRlIF9jb250ZW50UmVmOiBDb250ZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfdHlwZTogYW55LCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICBvcGVuKGNvbnRlbnQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+LCBjb250ZXh0PzogYW55KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgdGhpcy5fY29udGVudFJlZiA9IHRoaXMuX2dldENvbnRlbnRSZWYoY29udGVudCwgY29udGV4dCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4odGhpcy5fdHlwZSksIDAsIHRoaXMuX2luamVjdG9yLFxuICAgICAgICAgIHRoaXMuX2NvbnRlbnRSZWYubm9kZXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl93aW5kb3dSZWY7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy5fd2luZG93UmVmLmhvc3RWaWV3KSk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5fY29udGVudFJlZi52aWV3UmVmKSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYucmVtb3ZlKHRoaXMuX3ZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYpKTtcbiAgICAgICAgdGhpcy5fY29udGVudFJlZiA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+LCBjb250ZXh0PzogYW55KTogQ29udGVudFJlZiB7XG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW10pO1xuICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoPFRlbXBsYXRlUmVmPFQ+PmNvbnRlbnQsIGNvbnRleHQpO1xuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFt2aWV3UmVmLnJvb3ROb2Rlc10sIHZpZXdSZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1t0aGlzLl9yZW5kZXJlci5jcmVhdGVUZXh0KGAke2NvbnRlbnR9YCldXSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XG5cbmltcG9ydCB7Q29udGVudFJlZn0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gYW4gYWN0aXZlIChjdXJyZW50bHkgb3BlbmVkKSBtb2RhbC4gSW5zdGFuY2VzIG9mIHRoaXMgY2xhc3NcbiAqIGNhbiBiZSBpbmplY3RlZCBpbnRvIGNvbXBvbmVudHMgcGFzc2VkIGFzIG1vZGFsIGNvbnRlbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ2JBY3RpdmVNb2RhbCB7XG4gIC8qKlxuICAgKiBDYW4gYmUgdXNlZCB0byBjbG9zZSBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlc3VsdC5cbiAgICovXG4gIGNsb3NlKHJlc3VsdD86IGFueSk6IHZvaWQge31cblxuICAvKipcbiAgICogQ2FuIGJlIHVzZWQgdG8gZGlzbWlzcyBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlYXNvbi5cbiAgICovXG4gIGRpc21pc3MocmVhc29uPzogYW55KTogdm9pZCB7fVxufVxuXG4vKipcbiAqIEEgcmVmZXJlbmNlIHRvIGEgbmV3bHkgb3BlbmVkIG1vZGFsLlxuICovXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxSZWYge1xuICBwcml2YXRlIF9yZXNvbHZlOiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xuICBwcml2YXRlIF9yZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgdXNlZCBhcyBtb2RhbCdzIGNvbnRlbnQuXG4gICAqIFVuZGVmaW5lZCB3aGVuIGEgVGVtcGxhdGVSZWYgaXMgdXNlZCBhcyBtb2RhbCdzIGNvbnRlbnQuXG4gICAqL1xuICBnZXQgY29tcG9uZW50SW5zdGFuY2UoKTogYW55IHtcbiAgICBpZiAodGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9XG4gIH1cblxuICAvLyBvbmx5IG5lZWRlZCB0byBrZWVwIFRTMS44IGNvbXBhdGliaWxpdHlcbiAgc2V0IGNvbXBvbmVudEluc3RhbmNlKGluc3RhbmNlOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYSBtb2RhbCBpcyBjbG9zZWQgYW5kIHJlamVjdGVkIHdoZW4gYSBtb2RhbCBpcyBkaXNtaXNzZWQuXG4gICAqL1xuICByZXN1bHQ6IFByb21pc2U8YW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3dpbmRvd0NtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4sIHByaXZhdGUgX2NvbnRlbnRSZWY6IENvbnRlbnRSZWYsXG4gICAgICBwcml2YXRlIF9iYWNrZHJvcENtcHRSZWY/OiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4sIHByaXZhdGUgX2JlZm9yZURpc21pc3M/OiBGdW5jdGlvbikge1xuICAgIF93aW5kb3dDbXB0UmVmLmluc3RhbmNlLmRpc21pc3NFdmVudC5zdWJzY3JpYmUoKHJlYXNvbjogYW55KSA9PiB7IHRoaXMuZGlzbWlzcyhyZWFzb24pOyB9KTtcblxuICAgIHRoaXMucmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB0aGlzLl9yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgdGhpcy5yZXN1bHQudGhlbihudWxsLCAoKSA9PiB7fSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FuIGJlIHVzZWQgdG8gY2xvc2UgYSBtb2RhbCwgcGFzc2luZyBhbiBvcHRpb25hbCByZXN1bHQuXG4gICAqL1xuICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93Q21wdFJlZikge1xuICAgICAgdGhpcy5fcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rpc21pc3MocmVhc29uPzogYW55KSB7XG4gICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XG4gICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbiBiZSB1c2VkIHRvIGRpc21pc3MgYSBtb2RhbCwgcGFzc2luZyBhbiBvcHRpb25hbCByZWFzb24uXG4gICAqL1xuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl93aW5kb3dDbXB0UmVmKSB7XG4gICAgICBpZiAoIXRoaXMuX2JlZm9yZURpc21pc3MpIHtcbiAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlzbWlzcyA9IHRoaXMuX2JlZm9yZURpc21pc3MoKTtcbiAgICAgICAgaWYgKGRpc21pc3MgJiYgZGlzbWlzcy50aGVuKSB7XG4gICAgICAgICAgZGlzbWlzcy50aGVuKFxuICAgICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAoKSA9PiB7fSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlzbWlzcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVNb2RhbEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHdpbmRvd05hdGl2ZUVsID0gdGhpcy5fd2luZG93Q21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuICAgIHdpbmRvd05hdGl2ZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod2luZG93TmF0aXZlRWwpO1xuICAgIHRoaXMuX3dpbmRvd0NtcHRSZWYuZGVzdHJveSgpO1xuXG4gICAgaWYgKHRoaXMuX2JhY2tkcm9wQ21wdFJlZikge1xuICAgICAgY29uc3QgYmFja2Ryb3BOYXRpdmVFbCA9IHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuICAgICAgYmFja2Ryb3BOYXRpdmVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhY2tkcm9wTmF0aXZlRWwpO1xuICAgICAgdGhpcy5fYmFja2Ryb3BDbXB0UmVmLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29udGVudFJlZiAmJiB0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYpIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZi5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fd2luZG93Q21wdFJlZiA9IG51bGw7XG4gICAgdGhpcy5fYmFja2Ryb3BDbXB0UmVmID0gbnVsbDtcbiAgICB0aGlzLl9jb250ZW50UmVmID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgSW5qZWN0LFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q29udGVudFJlZn0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQge2lzRGVmaW5lZCwgaXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XG5pbXBvcnQge05nYkFjdGl2ZU1vZGFsLCBOZ2JNb2RhbFJlZn0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxTdGFjayB7XG4gIHByaXZhdGUgX2RvY3VtZW50OiBhbnk7XG4gIHByaXZhdGUgX3dpbmRvd0F0dHJpYnV0ZXMgPSBbJ2FyaWFMYWJlbGxlZEJ5JywgJ2JhY2tkcm9wJywgJ2NlbnRlcmVkJywgJ2tleWJvYXJkJywgJ3NpemUnLCAnd2luZG93Q2xhc3MnXTtcbiAgcHJpdmF0ZSBfYmFja2Ryb3BBdHRyaWJ1dGVzID0gWydiYWNrZHJvcENsYXNzJ107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcbiAgICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudCkge1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBvcGVuKG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIG9wdGlvbnMpOiBOZ2JNb2RhbFJlZiB7XG4gICAgY29uc3QgY29udGFpbmVyRWwgPVxuICAgICAgICBpc0RlZmluZWQob3B0aW9ucy5jb250YWluZXIpID8gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmNvbnRhaW5lcikgOiB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXG4gICAgaWYgKCFjb250YWluZXJFbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIG1vZGFsIGNvbnRhaW5lciBcIiR7b3B0aW9ucy5jb250YWluZXIgfHwgJ2JvZHknfVwiIHdhcyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVNb2RhbCA9IG5ldyBOZ2JBY3RpdmVNb2RhbCgpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSB0aGlzLl9nZXRDb250ZW50UmVmKG1vZHVsZUNGUiwgb3B0aW9ucy5pbmplY3RvciB8fCBjb250ZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsKTtcblxuICAgIGxldCBiYWNrZHJvcENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiA9XG4gICAgICAgIG9wdGlvbnMuYmFja2Ryb3AgIT09IGZhbHNlID8gdGhpcy5fYXR0YWNoQmFja2Ryb3AoY29udGFpbmVyRWwpIDogbnVsbDtcbiAgICBsZXQgd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiA9IHRoaXMuX2F0dGFjaFdpbmRvd0NvbXBvbmVudChjb250YWluZXJFbCwgY29udGVudFJlZik7XG4gICAgbGV0IG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZiA9IG5ldyBOZ2JNb2RhbFJlZih3aW5kb3dDbXB0UmVmLCBjb250ZW50UmVmLCBiYWNrZHJvcENtcHRSZWYsIG9wdGlvbnMuYmVmb3JlRGlzbWlzcyk7XG5cbiAgICBhY3RpdmVNb2RhbC5jbG9zZSA9IChyZXN1bHQ6IGFueSkgPT4geyBuZ2JNb2RhbFJlZi5jbG9zZShyZXN1bHQpOyB9O1xuICAgIGFjdGl2ZU1vZGFsLmRpc21pc3MgPSAocmVhc29uOiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pOyB9O1xuXG4gICAgdGhpcy5fYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0NtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuXG4gICAgaWYgKGJhY2tkcm9wQ21wdFJlZiAmJiBiYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2FwcGx5QmFja2Ryb3BPcHRpb25zKGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBuZ2JNb2RhbFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaEJhY2tkcm9wKGNvbnRhaW5lckVsOiBhbnkpOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4ge1xuICAgIGxldCBiYWNrZHJvcEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8TmdiTW9kYWxCYWNrZHJvcD4gPVxuICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiTW9kYWxCYWNrZHJvcCk7XG4gICAgbGV0IGJhY2tkcm9wQ21wdFJlZiA9IGJhY2tkcm9wRmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoYmFja2Ryb3BDbXB0UmVmLmhvc3RWaWV3KTtcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZChiYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgcmV0dXJuIGJhY2tkcm9wQ21wdFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaFdpbmRvd0NvbXBvbmVudChjb250YWluZXJFbDogYW55LCBjb250ZW50UmVmOiBhbnkpOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+IHtcbiAgICBsZXQgd2luZG93RmFjdG9yeSA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JNb2RhbFdpbmRvdyk7XG4gICAgbGV0IHdpbmRvd0NtcHRSZWYgPSB3aW5kb3dGYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3RvciwgY29udGVudFJlZi5ub2Rlcyk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh3aW5kb3dDbXB0UmVmLmhvc3RWaWV3KTtcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZCh3aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiB3aW5kb3dDbXB0UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0luc3RhbmNlOiBOZ2JNb2RhbFdpbmRvdywgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fd2luZG93QXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcbiAgICAgICAgd2luZG93SW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BJbnN0YW5jZTogTmdiTW9kYWxCYWNrZHJvcCwgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fYmFja2Ryb3BBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xuICAgICAgICBiYWNrZHJvcEluc3RhbmNlW29wdGlvbk5hbWVdID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoXG4gICAgICBtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LFxuICAgICAgY29udGV4dDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudCwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tQ29tcG9uZW50KG1vZHVsZUNGUiwgY29udGVudEluamVjdG9yLCBjb250ZW50LCBjb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudDogVGVtcGxhdGVSZWY8YW55PiwgY29udGV4dDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcbiAgICBjb25zdCB2aWV3UmVmID0gY29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2NvbnRlbnR9YCk7XG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50XV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbUNvbXBvbmVudChcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksXG4gICAgICBjb250ZXh0OiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbnRlbnRDbXB0RmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb250ZW50KTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnRJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZShbe3Byb3ZpZGU6IE5nYkFjdGl2ZU1vZGFsLCB1c2VWYWx1ZTogY29udGV4dH1dLCBjb250ZW50SW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbnRlbnRDbXB0RmFjdG9yeS5jcmVhdGUobW9kYWxDb250ZW50SW5qZWN0b3IpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dLCBjb21wb25lbnRSZWYuaG9zdFZpZXcsIGNvbXBvbmVudFJlZik7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3IsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiTW9kYWxTdGFja30gZnJvbSAnLi9tb2RhbC1zdGFjayc7XG5pbXBvcnQge05nYk1vZGFsUmVmfSBmcm9tICcuL21vZGFsLXJlZic7XG5cbi8qKlxuICogUmVwcmVzZW50IG9wdGlvbnMgYXZhaWxhYmxlIHdoZW4gb3BlbmluZyBuZXcgbW9kYWwgd2luZG93cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JNb2RhbE9wdGlvbnMge1xuICAvKipcbiAgICogU2V0cyB0aGUgYXJpYSBhdHRyaWJ1dGUgYXJpYS1sYWJlbGxlZGJ5IHRvIGEgbW9kYWwgd2luZG93LlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGEgYmFja2Ryb3AgZWxlbWVudCBzaG91bGQgYmUgY3JlYXRlZCBmb3IgYSBnaXZlbiBtb2RhbCAodHJ1ZSBieSBkZWZhdWx0KS5cbiAgICogQWx0ZXJuYXRpdmVseSwgc3BlY2lmeSAnc3RhdGljJyBmb3IgYSBiYWNrZHJvcCB3aGljaCBkb2Vzbid0IGNsb3NlIHRoZSBtb2RhbCBvbiBjbGljay5cbiAgICovXG4gIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiBhIG1vZGFsIHdpbGwgYmUgZGlzbWlzc2VkLlxuICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggZmFsc2Ugb3IgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQsIHRoZSBtb2RhbCBpcyBub3RcbiAgICogZGlzbWlzc2VkLlxuICAgKi9cbiAgYmVmb3JlRGlzbWlzcz86ICgpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBUbyBjZW50ZXIgdGhlIG1vZGFsIHZlcnRpY2FsbHkgKGZhbHNlIGJ5IGRlZmF1bHQpLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIGNlbnRlcmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gZWxlbWVudCB0byB3aGljaCB0byBhdHRhY2ggbmV3bHkgb3BlbmVkIG1vZGFsIHdpbmRvd3MuXG4gICAqL1xuICBjb250YWluZXI/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEluamVjdG9yIHRvIHVzZSBmb3IgbW9kYWwgY29udGVudC5cbiAgICovXG4gIGluamVjdG9yPzogSW5qZWN0b3I7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY2xvc2UgdGhlIG1vZGFsIHdoZW4gZXNjYXBlIGtleSBpcyBwcmVzc2VkICh0cnVlIGJ5IGRlZmF1bHQpLlxuICAgKi9cbiAga2V5Ym9hcmQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIGEgbmV3IG1vZGFsIHdpbmRvdy5cbiAgICovXG4gIHNpemU/OiAnc20nIHwgJ2xnJztcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgd2luZG93XG4gICAqL1xuICB3aW5kb3dDbGFzcz86IHN0cmluZztcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgYmFja2Ryb3BcbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgc2VydmljZSB0byBvcGVuIG1vZGFsIHdpbmRvd3MuIENyZWF0aW5nIGEgbW9kYWwgaXMgc3RyYWlnaHRmb3J3YXJkOiBjcmVhdGUgYSB0ZW1wbGF0ZSBhbmQgcGFzcyBpdCBhcyBhbiBhcmd1bWVudCB0b1xuICogdGhlIFwib3BlblwiIG1ldGhvZCFcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9tb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9tb2RhbFN0YWNrOiBOZ2JNb2RhbFN0YWNrKSB7fVxuXG4gIC8qKlxuICAgKiBPcGVucyBhIG5ldyBtb2RhbCB3aW5kb3cgd2l0aCB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgYW5kIHVzaW5nIHN1cHBsaWVkIG9wdGlvbnMuIENvbnRlbnQgY2FuIGJlIHByb3ZpZGVkXG4gICAqIGFzIGEgVGVtcGxhdGVSZWYgb3IgYSBjb21wb25lbnQgdHlwZS4gSWYgeW91IHBhc3MgYSBjb21wb25lbnQgdHlwZSBhcyBjb250ZW50IHRoYW4gaW5zdGFuY2VzIG9mIHRob3NlXG4gICAqIGNvbXBvbmVudHMgY2FuIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlIE5nYkFjdGl2ZU1vZGFsIGNsYXNzLiBZb3UgY2FuIHVzZSBtZXRob2RzIG9uIHRoZVxuICAgKiBOZ2JBY3RpdmVNb2RhbCBjbGFzcyB0byBjbG9zZSAvIGRpc21pc3MgbW9kYWxzIGZyb20gXCJpbnNpZGVcIiBvZiBhIGNvbXBvbmVudC5cbiAgICovXG4gIG9wZW4oY29udGVudDogYW55LCBvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMgPSB7fSk6IE5nYk1vZGFsUmVmIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kYWxTdGFjay5vcGVuKHRoaXMuX21vZHVsZUNGUiwgdGhpcy5faW5qZWN0b3IsIGNvbnRlbnQsIG9wdGlvbnMpO1xuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcbmltcG9ydCB7TmdiTW9kYWxTdGFja30gZnJvbSAnLi9tb2RhbC1zdGFjayc7XG5pbXBvcnQge05nYk1vZGFsfSBmcm9tICcuL21vZGFsJztcblxuZXhwb3J0IHtOZ2JNb2RhbCwgTmdiTW9kYWxPcHRpb25zfSBmcm9tICcuL21vZGFsJztcbmV4cG9ydCB7TmdiTW9kYWxSZWYsIE5nYkFjdGl2ZU1vZGFsfSBmcm9tICcuL21vZGFsLXJlZic7XG5leHBvcnQge01vZGFsRGlzbWlzc1JlYXNvbnN9IGZyb20gJy4vbW9kYWwtZGlzbWlzcy1yZWFzb25zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdiTW9kYWxCYWNrZHJvcCwgTmdiTW9kYWxXaW5kb3ddLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ2JNb2RhbEJhY2tkcm9wLCBOZ2JNb2RhbFdpbmRvd10sXG4gIHByb3ZpZGVyczogW05nYk1vZGFsXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JNb2RhbE1vZHVsZSwgcHJvdmlkZXJzOiBbTmdiTW9kYWwsIE5nYk1vZGFsU3RhY2tdfTsgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JQYWdpbmF0aW9uIGNvbXBvbmVudC5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBwYWdpbmF0aW9ucyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25Db25maWcge1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICBib3VuZGFyeUxpbmtzID0gZmFsc2U7XG4gIGRpcmVjdGlvbkxpbmtzID0gdHJ1ZTtcbiAgZWxsaXBzZXMgPSB0cnVlO1xuICBtYXhTaXplID0gMDtcbiAgcGFnZVNpemUgPSAxMDtcbiAgcm90YXRlID0gZmFsc2U7XG4gIHNpemU6ICdzbScgfCAnbGcnO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2dldFZhbHVlSW5SYW5nZSwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlBhZ2luYXRpb25Db25maWd9IGZyb20gJy4vcGFnaW5hdGlvbi1jb25maWcnO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd2lsbCB0YWtlIGNhcmUgb2YgdmlzdWFsaXNpbmcgYSBwYWdpbmF0aW9uIGJhciBhbmQgZW5hYmxlIC8gZGlzYWJsZSBidXR0b25zIGNvcnJlY3RseSFcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXBhZ2luYXRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeydyb2xlJzogJ25hdmlnYXRpb24nfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWwgW2NsYXNzXT1cIidwYWdpbmF0aW9uJyArIChzaXplID8gJyBwYWdpbmF0aW9uLScgKyBzaXplIDogJycpXCI+XG4gICAgICA8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiIWhhc1ByZXZpb3VzKCkgfHwgZGlzYWJsZWRcIj5cbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkZpcnN0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXG4gICAgICAgICAgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZSgxKVwiIFthdHRyLnRhYmluZGV4XT1cIihoYXNQcmV2aW91cygpID8gbnVsbCA6ICctMScpXCI+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24uZmlyc3RcIj4mbGFxdW87JmxhcXVvOzwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cblxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzUHJldmlvdXMoKSB8fCBkaXNhYmxlZFwiPlxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzLWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2UtMSlcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzUHJldmlvdXMoKSA/IG51bGwgOiAnLTEnKVwiPlxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzXCI+JmxhcXVvOzwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZU51bWJlciBvZiBwYWdlc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJwYWdlTnVtYmVyID09PSBwYWdlXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRWxsaXBzaXMocGFnZU51bWJlcikgfHwgZGlzYWJsZWRcIj5cbiAgICAgICAgPGEgKm5nSWY9XCJpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj4uLi48L2E+XG4gICAgICAgIDxhICpuZ0lmPVwiIWlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWYgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZShwYWdlTnVtYmVyKVwiPlxuICAgICAgICAgIHt7cGFnZU51bWJlcn19XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJwYWdlTnVtYmVyID09PSBwYWdlXCIgY2xhc3M9XCJzci1vbmx5XCI+KGN1cnJlbnQpPC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzTmV4dCgpIHx8IGRpc2FibGVkXCI+XG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJOZXh0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5uZXh0LWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2UrMSlcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzTmV4dCgpID8gbnVsbCA6ICctMScpXCI+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dFwiPiZyYXF1bzs8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG5cbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzTmV4dCgpIHx8IGRpc2FibGVkXCI+XG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJMYXN0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5sYXN0LWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2VDb3VudClcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzTmV4dCgpID8gbnVsbCA6ICctMScpXCI+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdFwiPiZyYXF1bzsmcmFxdW87PC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHBhZ2VDb3VudCA9IDA7XG4gIHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc2FibGUgYnV0dG9ucyBmcm9tIHVzZXIgaW5wdXRcbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiAgV2hldGhlciB0byBzaG93IHRoZSBcIkZpcnN0XCIgYW5kIFwiTGFzdFwiIHBhZ2UgbGlua3NcbiAgICovXG4gIEBJbnB1dCgpIGJvdW5kYXJ5TGlua3M6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBXaGV0aGVyIHRvIHNob3cgdGhlIFwiTmV4dFwiIGFuZCBcIlByZXZpb3VzXCIgcGFnZSBsaW5rc1xuICAgKi9cbiAgQElucHV0KCkgZGlyZWN0aW9uTGlua3M6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBXaGV0aGVyIHRvIHNob3cgZWxsaXBzaXMgc3ltYm9scyBhbmQgZmlyc3QvbGFzdCBwYWdlIG51bWJlcnMgd2hlbiBtYXhTaXplID4gbnVtYmVyIG9mIHBhZ2VzXG4gICAqL1xuICBASW5wdXQoKSBlbGxpcHNlczogYm9vbGVhbjtcblxuICAvKipcbiAgICogIFdoZXRoZXIgdG8gcm90YXRlIHBhZ2VzIHdoZW4gbWF4U2l6ZSA+IG51bWJlciBvZiBwYWdlcy5cbiAgICogIEN1cnJlbnQgcGFnZSB3aWxsIGJlIGluIHRoZSBtaWRkbGVcbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogIE51bWJlciBvZiBpdGVtcyBpbiBjb2xsZWN0aW9uLlxuICAgKi9cbiAgQElucHV0KCkgY29sbGVjdGlvblNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogIE1heGltdW0gbnVtYmVyIG9mIHBhZ2VzIHRvIGRpc3BsYXkuXG4gICAqL1xuICBASW5wdXQoKSBtYXhTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqICBDdXJyZW50IHBhZ2UuIFBhZ2UgbnVtYmVycyBzdGFydCB3aXRoIDFcbiAgICovXG4gIEBJbnB1dCgpIHBhZ2UgPSAxO1xuXG4gIC8qKlxuICAgKiAgTnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuICAgKi9cbiAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHBhZ2UgaXMgY2hhbmdlZC5cbiAgICogIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIHBhZ2UuXG4gICAqICBXaWxsIGZpcmUgb25seSBpZiBjb2xsZWN0aW9uIHNpemUgaXMgc2V0IGFuZCBhbGwgdmFsdWVzIGFyZSB2YWxpZC5cbiAgICogIFBhZ2UgbnVtYmVycyBzdGFydCB3aXRoIDFcbiAgICovXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xuXG4gIC8qKlxuICAgKiBQYWdpbmF0aW9uIGRpc3BsYXkgc2l6ZTogc21hbGwgb3IgbGFyZ2VcbiAgICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbGcnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUGFnaW5hdGlvbkNvbmZpZykge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBjb25maWcuZGlzYWJsZWQ7XG4gICAgdGhpcy5ib3VuZGFyeUxpbmtzID0gY29uZmlnLmJvdW5kYXJ5TGlua3M7XG4gICAgdGhpcy5kaXJlY3Rpb25MaW5rcyA9IGNvbmZpZy5kaXJlY3Rpb25MaW5rcztcbiAgICB0aGlzLmVsbGlwc2VzID0gY29uZmlnLmVsbGlwc2VzO1xuICAgIHRoaXMubWF4U2l6ZSA9IGNvbmZpZy5tYXhTaXplO1xuICAgIHRoaXMucGFnZVNpemUgPSBjb25maWcucGFnZVNpemU7XG4gICAgdGhpcy5yb3RhdGUgPSBjb25maWcucm90YXRlO1xuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xuICB9XG5cbiAgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPiAxOyB9XG5cbiAgaGFzTmV4dCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFnZSA8IHRoaXMucGFnZUNvdW50OyB9XG5cbiAgc2VsZWN0UGFnZShwYWdlTnVtYmVyOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5fdXBkYXRlUGFnZXMocGFnZU51bWJlcik7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7IHRoaXMuX3VwZGF0ZVBhZ2VzKHRoaXMucGFnZSk7IH1cblxuICBpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpOiBib29sZWFuIHsgcmV0dXJuIHBhZ2VOdW1iZXIgPT09IC0xOyB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgZWxsaXBzZXMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXIgdG8gdGhlIGRpc3BsYXllZCBwYWdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlFbGxpcHNlcyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmVsbGlwc2VzKSB7XG4gICAgICBpZiAoc3RhcnQgPiAwKSB7XG4gICAgICAgIGlmIChzdGFydCA+IDEpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VzLnVuc2hpZnQoLTEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZXMudW5zaGlmdCgxKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmQgPCB0aGlzLnBhZ2VDb3VudCkge1xuICAgICAgICBpZiAoZW5kIDwgKHRoaXMucGFnZUNvdW50IC0gMSkpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2goLTEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZXMucHVzaCh0aGlzLnBhZ2VDb3VudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgcGFnZSBudW1iZXJzIGJhc2VkIG9uIG1heFNpemUgaXRlbXMgdmlzaWJsZS5cbiAgICogQ3VycmVudGx5IHNlbGVjdGVkIHBhZ2Ugc3RheXMgaW4gdGhlIG1pZGRsZTpcbiAgICpcbiAgICogRXguIGZvciBzZWxlY3RlZCBwYWdlID0gNjpcbiAgICogWzUsKjYqLDddIGZvciBtYXhTaXplID0gM1xuICAgKiBbNCw1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDRcbiAgICovXG4gIHByaXZhdGUgX2FwcGx5Um90YXRpb24oKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgbGV0IHN0YXJ0ID0gMDtcbiAgICBsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XG4gICAgbGV0IGxlZnRPZmZzZXQgPSBNYXRoLmZsb29yKHRoaXMubWF4U2l6ZSAvIDIpO1xuICAgIGxldCByaWdodE9mZnNldCA9IHRoaXMubWF4U2l6ZSAlIDIgPT09IDAgPyBsZWZ0T2Zmc2V0IC0gMSA6IGxlZnRPZmZzZXQ7XG5cbiAgICBpZiAodGhpcy5wYWdlIDw9IGxlZnRPZmZzZXQpIHtcbiAgICAgIC8vIHZlcnkgYmVnaW5uaW5nLCBubyByb3RhdGlvbiAtPiBbMC4ubWF4U2l6ZV1cbiAgICAgIGVuZCA9IHRoaXMubWF4U2l6ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFnZUNvdW50IC0gdGhpcy5wYWdlIDwgbGVmdE9mZnNldCkge1xuICAgICAgLy8gdmVyeSBlbmQsIG5vIHJvdGF0aW9uIC0+IFtsZW4tbWF4U2l6ZS4ubGVuXVxuICAgICAgc3RhcnQgPSB0aGlzLnBhZ2VDb3VudCAtIHRoaXMubWF4U2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcm90YXRlXG4gICAgICBzdGFydCA9IHRoaXMucGFnZSAtIGxlZnRPZmZzZXQgLSAxO1xuICAgICAgZW5kID0gdGhpcy5wYWdlICsgcmlnaHRPZmZzZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdpbmF0ZXMgcGFnZSBudW1iZXJzIGJhc2VkIG9uIG1heFNpemUgaXRlbXMgcGVyIHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2FwcGx5UGFnaW5hdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBsZXQgcGFnZSA9IE1hdGguY2VpbCh0aGlzLnBhZ2UgLyB0aGlzLm1heFNpemUpIC0gMTtcbiAgICBsZXQgc3RhcnQgPSBwYWdlICogdGhpcy5tYXhTaXplO1xuICAgIGxldCBlbmQgPSBzdGFydCArIHRoaXMubWF4U2l6ZTtcblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICBwcml2YXRlIF9zZXRQYWdlSW5SYW5nZShuZXdQYWdlTm8pIHtcbiAgICBjb25zdCBwcmV2UGFnZU5vID0gdGhpcy5wYWdlO1xuICAgIHRoaXMucGFnZSA9IGdldFZhbHVlSW5SYW5nZShuZXdQYWdlTm8sIHRoaXMucGFnZUNvdW50LCAxKTtcblxuICAgIGlmICh0aGlzLnBhZ2UgIT09IHByZXZQYWdlTm8gJiYgaXNOdW1iZXIodGhpcy5jb2xsZWN0aW9uU2l6ZSkpIHtcbiAgICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUGFnZXMobmV3UGFnZTogbnVtYmVyKSB7XG4gICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUpO1xuXG4gICAgaWYgKCFpc051bWJlcih0aGlzLnBhZ2VDb3VudCkpIHtcbiAgICAgIHRoaXMucGFnZUNvdW50ID0gMDtcbiAgICB9XG5cbiAgICAvLyBmaWxsLWluIG1vZGVsIG5lZWRlZCB0byByZW5kZXIgcGFnZXNcbiAgICB0aGlzLnBhZ2VzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5wYWdlQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5wYWdlcy5wdXNoKGkpO1xuICAgIH1cblxuICAgIC8vIHNldCBwYWdlIHdpdGhpbiAxLi5tYXggcmFuZ2VcbiAgICB0aGlzLl9zZXRQYWdlSW5SYW5nZShuZXdQYWdlKTtcblxuICAgIC8vIGFwcGx5IG1heFNpemUgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHRoaXMubWF4U2l6ZSA+IDAgJiYgdGhpcy5wYWdlQ291bnQgPiB0aGlzLm1heFNpemUpIHtcbiAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICBsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XG5cbiAgICAgIC8vIGVpdGhlciBwYWdpbmF0aW5nIG9yIHJvdGF0aW5nIHBhZ2UgbnVtYmVyc1xuICAgICAgaWYgKHRoaXMucm90YXRlKSB7XG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5Um90YXRpb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5UGFnaW5hdGlvbigpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBhZ2VzID0gdGhpcy5wYWdlcy5zbGljZShzdGFydCwgZW5kKTtcblxuICAgICAgLy8gYWRkaW5nIGVsbGlwc2VzXG4gICAgICB0aGlzLl9hcHBseUVsbGlwc2VzKHN0YXJ0LCBlbmQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOZ2JQYWdpbmF0aW9ufSBmcm9tICcuL3BhZ2luYXRpb24nO1xuaW1wb3J0IHtOZ2JQYWdpbmF0aW9uQ29uZmlnfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcblxuZXhwb3J0IHtOZ2JQYWdpbmF0aW9ufSBmcm9tICcuL3BhZ2luYXRpb24nO1xuZXhwb3J0IHtOZ2JQYWdpbmF0aW9uQ29uZmlnfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JQYWdpbmF0aW9uXSwgZXhwb3J0czogW05nYlBhZ2luYXRpb25dLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbk1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JQYWdpbmF0aW9uTW9kdWxlLCBwcm92aWRlcnM6IFtOZ2JQYWdpbmF0aW9uQ29uZmlnXX07IH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUcmlnZ2VyIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9wZW46IHN0cmluZywgcHVibGljIGNsb3NlPzogc3RyaW5nKSB7XG4gICAgaWYgKCFjbG9zZSkge1xuICAgICAgdGhpcy5jbG9zZSA9IG9wZW47XG4gICAgfVxuICB9XG5cbiAgaXNNYW51YWwoKSB7IHJldHVybiB0aGlzLm9wZW4gPT09ICdtYW51YWwnIHx8IHRoaXMuY2xvc2UgPT09ICdtYW51YWwnOyB9XG59XG5cbmNvbnN0IERFRkFVTFRfQUxJQVNFUyA9IHtcbiAgJ2hvdmVyJzogWydtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnXVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJpZ2dlcnModHJpZ2dlcnM6IHN0cmluZywgYWxpYXNlcyA9IERFRkFVTFRfQUxJQVNFUyk6IFRyaWdnZXJbXSB7XG4gIGNvbnN0IHRyaW1tZWRUcmlnZ2VycyA9ICh0cmlnZ2VycyB8fCAnJykudHJpbSgpO1xuXG4gIGlmICh0cmltbWVkVHJpZ2dlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkVHJpZ2dlcnMgPSB0cmltbWVkVHJpZ2dlcnMuc3BsaXQoL1xccysvKS5tYXAodHJpZ2dlciA9PiB0cmlnZ2VyLnNwbGl0KCc6JykpLm1hcCgodHJpZ2dlclBhaXIpID0+IHtcbiAgICBsZXQgYWxpYXMgPSBhbGlhc2VzW3RyaWdnZXJQYWlyWzBdXSB8fCB0cmlnZ2VyUGFpcjtcbiAgICByZXR1cm4gbmV3IFRyaWdnZXIoYWxpYXNbMF0sIGFsaWFzWzFdKTtcbiAgfSk7XG5cbiAgY29uc3QgbWFudWFsVHJpZ2dlcnMgPSBwYXJzZWRUcmlnZ2Vycy5maWx0ZXIodHJpZ2dlclBhaXIgPT4gdHJpZ2dlclBhaXIuaXNNYW51YWwoKSk7XG5cbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyAnVHJpZ2dlcnMgcGFyc2UgZXJyb3I6IG9ubHkgb25lIG1hbnVhbCB0cmlnZ2VyIGlzIGFsbG93ZWQnO1xuICB9XG5cbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRUcmlnZ2Vycy5sZW5ndGggPiAxKSB7XG4gICAgdGhyb3cgJ1RyaWdnZXJzIHBhcnNlIGVycm9yOiBtYW51YWwgdHJpZ2dlciBjYW5cXCd0IGJlIG1peGVkIHdpdGggb3RoZXIgdHJpZ2dlcnMnO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZFRyaWdnZXJzO1xufVxuXG5jb25zdCBub29wRm4gPSAoKSA9PiB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlblRvVHJpZ2dlcnMocmVuZGVyZXI6IGFueSwgbmF0aXZlRWxlbWVudDogYW55LCB0cmlnZ2Vyczogc3RyaW5nLCBvcGVuRm4sIGNsb3NlRm4sIHRvZ2dsZUZuKSB7XG4gIGNvbnN0IHBhcnNlZFRyaWdnZXJzID0gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vycyk7XG4gIGNvbnN0IGxpc3RlbmVycyA9IFtdO1xuXG4gIGlmIChwYXJzZWRUcmlnZ2Vycy5sZW5ndGggPT09IDEgJiYgcGFyc2VkVHJpZ2dlcnNbMF0uaXNNYW51YWwoKSkge1xuICAgIHJldHVybiBub29wRm47XG4gIH1cblxuICBwYXJzZWRUcmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyOiBUcmlnZ2VyKSA9PiB7XG4gICAgaWYgKHRyaWdnZXIub3BlbiA9PT0gdHJpZ2dlci5jbG9zZSkge1xuICAgICAgbGlzdGVuZXJzLnB1c2gocmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3BlbiwgdG9nZ2xlRm4pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3Blbiwgb3BlbkZuKSwgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIuY2xvc2UsIGNsb3NlRm4pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiAoKSA9PiB7IGxpc3RlbmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlRm4gPT4gdW5zdWJzY3JpYmVGbigpKTsgfTtcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JQb3BvdmVyIGRpcmVjdGl2ZS5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBwb3BvdmVycyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJDb25maWcge1xuICBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ3RvcCc7XG4gIHRyaWdnZXJzID0gJ2NsaWNrJztcbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIGRpc2FibGVQb3BvdmVyID0gZmFsc2U7XG4gIHBvcG92ZXJDbGFzczogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPbkNoYW5nZXMsXG4gIEluamVjdG9yLFxuICBSZW5kZXJlcjIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgTmdab25lLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnQsIFBsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcbmltcG9ydCB7TmdiUG9wb3ZlckNvbmZpZ30gZnJvbSAnLi9wb3BvdmVyLWNvbmZpZyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItcG9wb3Zlci13aW5kb3cnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzpcbiAgICAgICAgJ1wicG9wb3ZlciBicy1wb3BvdmVyLVwiICsgcGxhY2VtZW50LnNwbGl0KFwiLVwiKVswXStcIiBicy1wb3BvdmVyLVwiICsgcGxhY2VtZW50ICsgKHBvcG92ZXJDbGFzcyA/IFwiIFwiICsgcG9wb3ZlckNsYXNzIDogXCJcIiknLFxuICAgICdyb2xlJzogJ3Rvb2x0aXAnLFxuICAgICdbaWRdJzogJ2lkJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PlxuICAgIDxoMyBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCI+e3t0aXRsZX19PC9oMz48ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdC5icy1wb3BvdmVyLXRvcCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItYm90dG9tIC5hcnJvdyB7XG4gICAgICBsZWZ0OiA1MCU7XG4gICAgICBtYXJnaW4tbGVmdDogLTVweDtcbiAgICB9XG5cbiAgICA6aG9zdC5icy1wb3BvdmVyLXRvcC1sZWZ0IC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1ib3R0b20tbGVmdCAuYXJyb3cge1xuICAgICAgbGVmdDogMmVtO1xuICAgIH1cblxuICAgIDpob3N0LmJzLXBvcG92ZXItdG9wLXJpZ2h0IC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1ib3R0b20tcmlnaHQgLmFycm93IHtcbiAgICAgIGxlZnQ6IGF1dG87XG4gICAgICByaWdodDogMmVtO1xuICAgIH1cblxuICAgIDpob3N0LmJzLXBvcG92ZXItbGVmdCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItcmlnaHQgLmFycm93IHtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbWFyZ2luLXRvcDogLTVweDtcbiAgICB9XG5cbiAgICA6aG9zdC5icy1wb3BvdmVyLWxlZnQtdG9wIC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1yaWdodC10b3AgLmFycm93IHtcbiAgICAgIHRvcDogMC43ZW07XG4gICAgfVxuXG4gICAgOmhvc3QuYnMtcG9wb3Zlci1sZWZ0LWJvdHRvbSAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItcmlnaHQtYm90dG9tIC5hcnJvdyB7XG4gICAgICB0b3A6IGF1dG87XG4gICAgICBib3R0b206IDAuN2VtO1xuICAgIH1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUG9wb3ZlcldpbmRvdyB7XG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ3RvcCc7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIGFwcGx5UGxhY2VtZW50KF9wbGFjZW1lbnQ6IFBsYWNlbWVudCkge1xuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXBvcG92ZXItJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkuc3BsaXQoJy0nKVswXSk7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtcG9wb3Zlci0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKSk7XG5cbiAgICAvLyBzZXQgdGhlIG5ldyBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgIHRoaXMucGxhY2VtZW50ID0gX3BsYWNlbWVudDtcblxuICAgIC8vIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtcG9wb3Zlci0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKS5zcGxpdCgnLScpWzBdKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy1wb3BvdmVyLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQsIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSBwb3BvdmVyIGNyZWF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JQb3BvdmVyXScsIGV4cG9ydEFzOiAnbmdiUG9wb3Zlcid9KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHBvcG92ZXIuIElmIHRpdGxlIGFuZCBjb250ZW50IGFyZSBlbXB0eSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cbiAgICovXG4gIEBJbnB1dCgpIG5nYlBvcG92ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gIC8qKlxuICAgKiBUaXRsZSBvZiBhIHBvcG92ZXIuIElmIHRpdGxlIGFuZCBjb250ZW50IGFyZSBlbXB0eSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cbiAgICovXG4gIEBJbnB1dCgpIHBvcG92ZXJUaXRsZTogc3RyaW5nO1xuICAvKipcbiAgICogUGxhY2VtZW50IG9mIGEgcG9wb3ZlciBhY2NlcHRzOlxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcbiAgICogYW5kIGFycmF5IG9mIGFib3ZlIHZhbHVlcy5cbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2Vyczogc3RyaW5nO1xuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgc2hvdWxkIG5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMFxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVBvcG92ZXI6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIG5nYi1wb3BvdmVyLXdpbmRvd1xuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciBpcyBzaG93blxuICAgKi9cbiAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciBpcyBoaWRkZW5cbiAgICovXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfbmdiUG9wb3ZlcldpbmRvd0lkID0gYG5nYi1wb3BvdmVyLSR7bmV4dElkKyt9YDtcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz47XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlBvcG92ZXJXaW5kb3c+O1xuICBwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcbiAgcHJpdmF0ZSBfaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlUG9wb3Zlcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5uZ2JQb3BvdmVyICYmICF0aGlzLnBvcG92ZXJUaXRsZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBjb25maWc6IE5nYlBvcG92ZXJDb25maWcsXG4gICAgICBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcbiAgICB0aGlzLnRyaWdnZXJzID0gY29uZmlnLnRyaWdnZXJzO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcbiAgICB0aGlzLmRpc2FibGVQb3BvdmVyID0gY29uZmlnLmRpc2FibGVQb3BvdmVyO1xuICAgIHRoaXMucG9wb3ZlckNsYXNzID0gY29uZmlnLnBvcG92ZXJDbGFzcztcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+KFxuICAgICAgICBOZ2JQb3BvdmVyV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xuXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXG4gICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbiBlbGVtZW50w6LCgMKZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cbiAgICogVGhlIGNvbnRleHQgaXMgYW4gb3B0aW9uYWwgdmFsdWUgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgcG9wb3ZlciB0ZW1wbGF0ZSB3aGVuIGl0IGlzIGNyZWF0ZWQuXG4gICAqL1xuICBvcGVuKGNvbnRleHQ/OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZiAmJiAhdGhpcy5faXNEaXNhYmxlZCgpKSB7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl9wb3B1cFNlcnZpY2Uub3Blbih0aGlzLm5nYlBvcG92ZXIsIGNvbnRleHQpO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucG9wb3ZlckNsYXNzID0gdGhpcy5wb3BvdmVyQ2xhc3M7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQ7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiUG9wb3ZlcldpbmRvd0lkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgLy8gYXBwbHkgc3R5bGluZyB0byBzZXQgYmFzaWMgY3NzLWNsYXNzZXMgb24gdGFyZ2V0IGVsZW1lbnQsIGJlZm9yZSBnb2luZyBmb3IgcG9zaXRpb25pbmdcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIC8vIHBvc2l0aW9uIHBvcG92ZXIgYWxvbmcgdGhlIGVsZW1lbnRcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hcHBseVBsYWNlbWVudChcbiAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5JykpO1xuXG4gICAgICB0aGlzLnNob3duLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFuIGVsZW1lbnTDosKAwplzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIMOiwoDCnG1hbnVhbMOiwoDCnSB0cmlnZ2VyaW5nIG9mIHRoZSBwb3BvdmVyLlxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcbiAgICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcbiAgICAgIHRoaXMuaGlkZGVuLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW50w6LCgMKZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBwb3BvdmVyIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLm9wZW4uYmluZCh0aGlzKSwgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBjbG9zZSBwb3BvdmVyIGlmIHRpdGxlIGFuZCBjb250ZW50IGJlY29tZSBlbXB0eSwgb3IgZGlzYWJsZVBvcG92ZXIgc2V0IHRvIHRydWVcbiAgICBpZiAoKGNoYW5nZXNbJ25nYlBvcG92ZXInXSB8fCBjaGFuZ2VzWydwb3BvdmVyVGl0bGUnXSB8fCBjaGFuZ2VzWydkaXNhYmxlUG9wb3ZlciddKSAmJiB0aGlzLl9pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKCk7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JQb3BvdmVyLCBOZ2JQb3BvdmVyV2luZG93fSBmcm9tICcuL3BvcG92ZXInO1xuaW1wb3J0IHtOZ2JQb3BvdmVyQ29uZmlnfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcbmltcG9ydCB7UGxhY2VtZW50fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuZXhwb3J0IHtOZ2JQb3BvdmVyfSBmcm9tICcuL3BvcG92ZXInO1xuZXhwb3J0IHtOZ2JQb3BvdmVyQ29uZmlnfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcbmV4cG9ydCB7UGxhY2VtZW50fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JQb3BvdmVyLCBOZ2JQb3BvdmVyV2luZG93XSwgZXhwb3J0czogW05nYlBvcG92ZXJdLCBlbnRyeUNvbXBvbmVudHM6IFtOZ2JQb3BvdmVyV2luZG93XX0pXG5leHBvcnQgY2xhc3MgTmdiUG9wb3Zlck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JQb3BvdmVyTW9kdWxlLCBwcm92aWRlcnM6IFtOZ2JQb3BvdmVyQ29uZmlnXX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUHJvZ3Jlc3NiYXIgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHByb2dyZXNzIGJhcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JQcm9ncmVzc2JhckNvbmZpZyB7XG4gIG1heCA9IDEwMDtcbiAgYW5pbWF0ZWQgPSBmYWxzZTtcbiAgc3RyaXBlZCA9IGZhbHNlO1xuICB0eXBlOiBzdHJpbmc7XG4gIHNob3dWYWx1ZSA9IGZhbHNlO1xuICBoZWlnaHQ6IHN0cmluZztcbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2V9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlByb2dyZXNzYmFyQ29uZmlnfSBmcm9tICcuL3Byb2dyZXNzYmFyLWNvbmZpZyc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBmZWVkYmFjayBvbiB0aGUgcHJvZ3Jlc3Mgb2YgYSB3b3JrZmxvdyBvciBhbiBhY3Rpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wcm9ncmVzc2JhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFye3t0eXBlID8gJyBiZy0nICsgdHlwZSA6ICcnfX17e2FuaW1hdGVkID8gJyBwcm9ncmVzcy1iYXItYW5pbWF0ZWQnIDogJyd9fXt7c3RyaXBlZCA/XG4gICAgJyBwcm9ncmVzcy1iYXItc3RyaXBlZCcgOiAnJ319XCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW3N0eWxlLndpZHRoLiVdPVwiZ2V0UGVyY2VudFZhbHVlKClcIlxuICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiZ2V0VmFsdWUoKVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VmFsdWVcIiBpMThuPVwiQEBuZ2IucHJvZ3Jlc3NiYXIudmFsdWVcIj57e2dldFBlcmNlbnRWYWx1ZSgpfX0lPC9zcGFuPjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyIHtcbiAgLyoqXG4gICAqIE1heGltYWwgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzc2Jhci5cbiAgICovXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc3RyaXBlcyBvZiB0aGUgcHJvZ3Jlc3MgYmFyIHNob3VsZCBiZSBhbmltYXRlZC4gVGFrZXMgZWZmZWN0IG9ubHkgZm9yIGJyb3dzZXJzXG4gICAqIHN1cHBvcnRpbmcgQ1NTMyBhbmltYXRpb25zLCBhbmQgaWYgc3RyaXBlZCBpcyB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgcHJvZ3Jlc3MgYmFyIHNob3VsZCBiZSBkaXNwbGF5ZWQgYXMgc3RyaXBlZC5cbiAgICovXG4gIEBJbnB1dCgpIHN0cmlwZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBjdXJyZW50IHBlcmNlbnRhZ2UgdmFsdWUgc2hvdWxkIGJlIHNob3duLlxuICAgKi9cbiAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHByb2dyZXNzIGJhciwgY2FuIGJlIG9uZSBvZiBcInN1Y2Nlc3NcIiwgXCJpbmZvXCIsIFwid2FybmluZ1wiIG9yIFwiZGFuZ2VyXCIuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzc2Jhci4gU2hvdWxkIGJlIHNtYWxsZXIgb3IgZXF1YWwgdG8gXCJtYXhcIiB2YWx1ZS5cbiAgICovXG4gIEBJbnB1dCgpIHZhbHVlID0gMDtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSBwcm9ncmVzcyBiYXIuIEFjY2VwdHMgYW55IHZhbGlkIENTUyBoZWlnaHQgdmFsdWVzLCBleC4gJzJyZW0nXG4gICAqL1xuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlByb2dyZXNzYmFyQ29uZmlnKSB7XG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xuICAgIHRoaXMuYW5pbWF0ZWQgPSBjb25maWcuYW5pbWF0ZWQ7XG4gICAgdGhpcy5zdHJpcGVkID0gY29uZmlnLnN0cmlwZWQ7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5zaG93VmFsdWUgPSBjb25maWcuc2hvd1ZhbHVlO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gZ2V0VmFsdWVJblJhbmdlKHRoaXMudmFsdWUsIHRoaXMubWF4KTsgfVxuXG4gIGdldFBlcmNlbnRWYWx1ZSgpIHsgcmV0dXJuIDEwMCAqIHRoaXMuZ2V0VmFsdWUoKSAvIHRoaXMubWF4OyB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYlByb2dyZXNzYmFyfSBmcm9tICcuL3Byb2dyZXNzYmFyJztcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJDb25maWd9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcblxuZXhwb3J0IHtOZ2JQcm9ncmVzc2Jhcn0gZnJvbSAnLi9wcm9ncmVzc2Jhcic7XG5leHBvcnQge05nYlByb2dyZXNzYmFyQ29uZmlnfSBmcm9tICcuL3Byb2dyZXNzYmFyLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiUHJvZ3Jlc3NiYXJdLCBleHBvcnRzOiBbTmdiUHJvZ3Jlc3NiYXJdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgTmdiUHJvZ3Jlc3NiYXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiUHJvZ3Jlc3NiYXJNb2R1bGUsIHByb3ZpZGVyczogW05nYlByb2dyZXNzYmFyQ29uZmlnXX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUmF0aW5nIGNvbXBvbmVudC5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSByYXRpbmdzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nQ29uZmlnIHtcbiAgbWF4ID0gMTA7XG4gIHJlYWRvbmx5ID0gZmFsc2U7XG4gIHJlc2V0dGFibGUgPSBmYWxzZTtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDb250ZW50Q2hpbGQsXG4gIGZvcndhcmRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JSYXRpbmdDb25maWd9IGZyb20gJy4vcmF0aW5nLWNvbmZpZyc7XG5pbXBvcnQge3RvU3RyaW5nLCBnZXRWYWx1ZUluUmFuZ2V9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBDb250ZXh0IGZvciB0aGUgY3VzdG9tIHN0YXIgZGlzcGxheSB0ZW1wbGF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN0YXJUZW1wbGF0ZUNvbnRleHQge1xuICAvKipcbiAgICogU3RhciBmaWxsIHBlcmNlbnRhZ2UuIEFuIGludGVnZXIgdmFsdWUgYmV0d2VlbiAwIGFuZCAxMDBcbiAgICovXG4gIGZpbGw6IG51bWJlcjtcblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIHN0YXIuXG4gICAqL1xuICBpbmRleDogbnVtYmVyO1xufVxuXG5jb25zdCBOR0JfUkFUSU5HX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiUmF0aW5nKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogUmF0aW5nIGRpcmVjdGl2ZSB0aGF0IHdpbGwgdGFrZSBjYXJlIG9mIHZpc3VhbGlzaW5nIGEgc3RhciByYXRpbmcgYmFyLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItcmF0aW5nJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnZC1pbmxpbmUtZmxleCcsXG4gICAgJ3RhYmluZGV4JzogJzAnLFxuICAgICdyb2xlJzogJ3NsaWRlcicsXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVtYXhdJzogJ21heCcsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVub3ddJzogJ25leHRSYXRlJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZXRleHRdJzogJ2FyaWFWYWx1ZVRleHQoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ3JlYWRvbmx5ID8gdHJ1ZSA6IG51bGwnLFxuICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcbiAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleURvd24oJGV2ZW50KScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdyZXNldCgpJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdCBsZXQtZmlsbD1cImZpbGxcIj57eyBmaWxsID09PSAxMDAgPyAnJiM5NzMzOycgOiAnJiM5NzM0OycgfX08L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJjb250ZXh0c1wiIGxldC1pbmRleD1cImluZGV4XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4oe3sgaW5kZXggPCBuZXh0UmF0ZSA/ICcqJyA6ICcgJyB9fSk8L3NwYW4+XG4gICAgICA8c3BhbiAobW91c2VlbnRlcik9XCJlbnRlcihpbmRleCArIDEpXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKGluZGV4ICsgMSlcIiBbc3R5bGUuY3Vyc29yXT1cInJlYWRvbmx5IHx8IGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGFyVGVtcGxhdGUgfHwgdFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjb250ZXh0c1tpbmRleF1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByb3ZpZGVyczogW05HQl9SQVRJTkdfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE5nYlJhdGluZyBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgY29udGV4dHM6IFN0YXJUZW1wbGF0ZUNvbnRleHRbXSA9IFtdO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICBuZXh0UmF0ZTogbnVtYmVyO1xuXG5cbiAgLyoqXG4gICAqIE1heGltYWwgcmF0aW5nIHRoYXQgY2FuIGJlIGdpdmVuIHVzaW5nIHRoaXMgd2lkZ2V0LlxuICAgKi9cbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcmF0aW5nLiBDYW4gYmUgYSBkZWNpbWFsIHZhbHVlIGxpa2UgMy43NVxuICAgKi9cbiAgQElucHV0KCkgcmF0ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiByYXRpbmcgY2FuIGJlIHVwZGF0ZWQuXG4gICAqL1xuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgcmF0aW5nIGNhbiBiZSByZXNldCB0byAwIG9uIG1vdXNlIGNsaWNrXG4gICAqL1xuICBASW5wdXQoKSByZXNldHRhYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIHRlbXBsYXRlIHRvIG92ZXJyaWRlIHN0YXIgZGlzcGxheS5cbiAgICogQWx0ZXJuYXRpdmVseSBwdXQgYSA8bmctdGVtcGxhdGU+IGFzIHRoZSBvbmx5IGNoaWxkIG9mIDxuZ2ItcmF0aW5nPiBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBzdGFyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPFN0YXJUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIGEgdXNlciBpcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxuICAgKiBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSByYXRpbmcgYmVpbmcgaG92ZXJlZCBvdmVyLlxuICAgKi9cbiAgQE91dHB1dCgpIGhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gYSB1c2VyIHN0b3BzIGhvdmVyaW5nIG92ZXIgYSBnaXZlbiByYXRpbmcuXG4gICAqIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIHJhdGluZyBvZiB0aGUgbGFzdCBpdGVtIGJlaW5nIGhvdmVyZWQgb3Zlci5cbiAgICovXG4gIEBPdXRwdXQoKSBsZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIGEgdXNlciBzZWxlY3RzIGEgbmV3IHJhdGluZy5cbiAgICogRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgcmF0aW5nLlxuICAgKi9cbiAgQE91dHB1dCgpIHJhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JSYXRpbmdDb25maWcsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMubWF4ID0gY29uZmlnLm1heDtcbiAgICB0aGlzLnJlYWRvbmx5ID0gY29uZmlnLnJlYWRvbmx5O1xuICB9XG5cbiAgYXJpYVZhbHVlVGV4dCgpIHsgcmV0dXJuIGAke3RoaXMubmV4dFJhdGV9IG91dCBvZiAke3RoaXMubWF4fWA7IH1cblxuICBlbnRlcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl91cGRhdGVTdGF0ZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuaG92ZXIuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkgeyB0aGlzLm9uVG91Y2hlZCgpOyB9XG5cbiAgaGFuZGxlQ2xpY2sodmFsdWU6IG51bWJlcikgeyB0aGlzLnVwZGF0ZSh0aGlzLnJlc2V0dGFibGUgJiYgdGhpcy5yYXRlID09PSB2YWx1ZSA/IDAgOiB2YWx1ZSk7IH1cblxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKEtleVt0b1N0cmluZyhldmVudC53aGljaCldKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSAtIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgICBjYXNlIEtleS5BcnJvd1JpZ2h0OlxuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSArIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5Ib21lOlxuICAgICAgICAgIHRoaXMudXBkYXRlKDApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5FbmQ6XG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5tYXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sncmF0ZSddKSB7XG4gICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dHMgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMubWF4fSwgKHYsIGspID0+ICh7ZmlsbDogMCwgaW5kZXg6IGt9KSk7XG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5sZWF2ZS5lbWl0KHRoaXMubmV4dFJhdGUpO1xuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cblxuICB1cGRhdGUodmFsdWU6IG51bWJlciwgaW50ZXJuYWxDaGFuZ2UgPSB0cnVlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3UmF0ZSA9IGdldFZhbHVlSW5SYW5nZSh2YWx1ZSwgdGhpcy5tYXgsIDApO1xuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJhdGUgIT09IG5ld1JhdGUpIHtcbiAgICAgIHRoaXMucmF0ZSA9IG5ld1JhdGU7XG4gICAgICB0aGlzLnJhdGVDaGFuZ2UuZW1pdCh0aGlzLnJhdGUpO1xuICAgIH1cbiAgICBpZiAoaW50ZXJuYWxDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5yYXRlKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy51cGRhdGUodmFsdWUsIGZhbHNlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZpbGxWYWx1ZShpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmID0gdGhpcy5uZXh0UmF0ZSAtIGluZGV4O1xuXG4gICAgaWYgKGRpZmYgPj0gMSkge1xuICAgICAgcmV0dXJuIDEwMDtcbiAgICB9XG4gICAgaWYgKGRpZmYgPCAxICYmIGRpZmYgPiAwKSB7XG4gICAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KChkaWZmICogMTAwKS50b0ZpeGVkKDIpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN0YXRlKG5leHRWYWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5uZXh0UmF0ZSA9IG5leHRWYWx1ZTtcbiAgICB0aGlzLmNvbnRleHRzLmZvckVhY2goKGNvbnRleHQsIGluZGV4KSA9PiBjb250ZXh0LmZpbGwgPSB0aGlzLl9nZXRGaWxsVmFsdWUoaW5kZXgpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdiUmF0aW5nQ29uZmlnfSBmcm9tICcuL3JhdGluZy1jb25maWcnO1xuXG5pbXBvcnQge05nYlJhdGluZ30gZnJvbSAnLi9yYXRpbmcnO1xuXG5leHBvcnQge05nYlJhdGluZ30gZnJvbSAnLi9yYXRpbmcnO1xuZXhwb3J0IHtOZ2JSYXRpbmdDb25maWd9IGZyb20gJy4vcmF0aW5nLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiUmF0aW5nXSwgZXhwb3J0czogW05nYlJhdGluZ10sIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcbmV4cG9ydCBjbGFzcyBOZ2JSYXRpbmdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiUmF0aW5nTW9kdWxlLCBwcm92aWRlcnM6IFtOZ2JSYXRpbmdDb25maWddfTsgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUYWJzZXQgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHRhYnNldHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JUYWJzZXRDb25maWcge1xuICBqdXN0aWZ5OiAnc3RhcnQnIHwgJ2NlbnRlcicgfCAnZW5kJyB8ICdmaWxsJyB8ICdqdXN0aWZpZWQnID0gJ3N0YXJ0JztcbiAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG4gIHR5cGU6ICd0YWJzJyB8ICdwaWxscycgPSAndGFicyc7XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgRGlyZWN0aXZlLFxuICBUZW1wbGF0ZVJlZixcbiAgQ29udGVudENoaWxkLFxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiVGFic2V0Q29uZmlnfSBmcm9tICcuL3RhYnNldC1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBzaG91bGQgYmUgdXNlZCB0byB3cmFwIHRhYiB0aXRsZXMgdGhhdCBuZWVkIHRvIGNvbnRhaW4gSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlcy5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWJUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBtdXN0IGJlIHVzZWQgdG8gd3JhcCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiBhIHRhYi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlRhYkNvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgcmVwcmVzZW50aW5nIGFuIGluZGl2aWR1YWwgdGFiLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nYi10YWInfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWIge1xuICAvKipcbiAgICogVW5pcXVlIHRhYiBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG5nYi10YWItJHtuZXh0SWQrK31gO1xuICAvKipcbiAgICogU2ltcGxlIChzdHJpbmcgb25seSkgdGl0bGUuIFVzZSB0aGUgXCJOZ2JUYWJUaXRsZVwiIGRpcmVjdGl2ZSBmb3IgbW9yZSBjb21wbGV4IHVzZS1jYXNlcy5cbiAgICovXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBbGxvd3MgdG9nZ2xpbmcgZGlzYWJsZWQgc3RhdGUgb2YgYSBnaXZlbiBzdGF0ZS4gRGlzYWJsZWQgdGFicyBjYW4ndCBiZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgdGl0bGVUcGw6IE5nYlRhYlRpdGxlIHwgbnVsbDtcbiAgY29udGVudFRwbDogTmdiVGFiQ29udGVudCB8IG51bGw7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJUaXRsZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIHRpdGxlVHBsczogUXVlcnlMaXN0PE5nYlRhYlRpdGxlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJDb250ZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJDb250ZW50PjtcblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGFudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgY2hhbmdlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVGFiQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogSWQgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgdGFiXG4gICAqL1xuICBhY3RpdmVJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgdGFiXG4gICAqL1xuICBuZXh0SWQ6IHN0cmluZztcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIHByZXZlbnQgdGFiIHN3aXRjaCBpZiBjYWxsZWRcbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgbWFrZXMgaXQgZWFzeSB0byBjcmVhdGUgdGFiYmVkIGludGVyZmFjZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRhYnNldCcsXG4gIGV4cG9ydEFzOiAnbmdiVGFic2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWwgW2NsYXNzXT1cIiduYXYgbmF2LScgKyB0eXBlICsgKG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJz8gICcgJyArIGp1c3RpZnlDbGFzcyA6ICcgZmxleC1jb2x1bW4nKVwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFic1wiPlxuICAgICAgICA8YSBbaWRdPVwidGFiLmlkXCIgY2xhc3M9XCJuYXYtbGlua1wiIFtjbGFzcy5hY3RpdmVdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICAgIGhyZWYgKGNsaWNrKT1cIiEhc2VsZWN0KHRhYi5pZClcIiByb2xlPVwidGFiXCIgW2F0dHIudGFiaW5kZXhdPVwiKHRhYi5kaXNhYmxlZCA/ICctMSc6IHVuZGVmaW5lZClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiKCFkZXN0cm95T25IaWRlIHx8IHRhYi5pZCA9PT0gYWN0aXZlSWQgPyB0YWIuaWQgKyAnLXBhbmVsJyA6IG51bGwpXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiPlxuICAgICAgICAgIHt7dGFiLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLnRpdGxlVHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtdGFiIFtuZ0Zvck9mXT1cInRhYnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwidGFiLXBhbmUge3t0YWIuaWQgPT09IGFjdGl2ZUlkID8gJ2FjdGl2ZScgOiBudWxsfX1cIlxuICAgICAgICAgICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGFiLmlkXCIgaWQ9XCJ7e3RhYi5pZH19LXBhbmVsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBqdXN0aWZ5Q2xhc3M6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYikgdGFiczogUXVlcnlMaXN0PE5nYlRhYj47XG5cbiAgLyoqXG4gICAqIEFuIGlkZW50aWZpZXIgb2YgYW4gaW5pdGlhbGx5IHNlbGVjdGVkIChhY3RpdmUpIHRhYi4gVXNlIHRoZSBcInNlbGVjdFwiIG1ldGhvZCB0byBzd2l0Y2ggYSB0YWIgcHJvZ3JhbW1hdGljYWxseS5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNsb3NlZCB0YWJzIHNob3VsZCBiZSBoaWRkZW4gd2l0aG91dCBkZXN0cm95aW5nIHRoZW1cbiAgICovXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIG5hdiB3aXRoIGZsZXhib3ggdXRpbGl0aWVzLiBDYW4gYmUgb25lIG9mICdzdGFydCcsICdjZW50ZXInLCAnZW5kJywgJ2ZpbGwnIG9yXG4gICAqICdqdXN0aWZpZWQnXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdzdGFydCcuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQganVzdGlmeShjbGFzc05hbWU6ICdzdGFydCcgfCAnY2VudGVyJyB8ICdlbmQnIHwgJ2ZpbGwnIHwgJ2p1c3RpZmllZCcpIHtcbiAgICBpZiAoY2xhc3NOYW1lID09PSAnZmlsbCcgfHwgY2xhc3NOYW1lID09PSAnanVzdGlmaWVkJykge1xuICAgICAgdGhpcy5qdXN0aWZ5Q2xhc3MgPSBgbmF2LSR7Y2xhc3NOYW1lfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYGp1c3RpZnktY29udGVudC0ke2NsYXNzTmFtZX1gO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIG5hdiAoaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCkuXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdob3Jpem9udGFsJy5cbiAgICovXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIG5hdmlnYXRpb24gdG8gYmUgdXNlZCBmb3IgdGFicy4gQ2FuIGJlIG9uZSBvZiAndGFicycgb3IgJ3BpbGxzJy5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6ICd0YWJzJyB8ICdwaWxscyc7XG5cbiAgLyoqXG4gICAqIEEgdGFiIGNoYW5nZSBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdGhlIHRhYiBzZWxlY3Rpb24gaGFwcGVucy4gU2VlIE5nYlRhYkNoYW5nZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcbiAgICovXG4gIEBPdXRwdXQoKSB0YWJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlRhYkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiVGFic2V0Q29uZmlnKSB7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5qdXN0aWZ5ID0gY29uZmlnLmp1c3RpZnk7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IGNvbmZpZy5vcmllbnRhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSB0YWIgd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIHNob3dzIGl0cyBhc3NvY2lhdGVkIHBhbmUuXG4gICAqIEFueSBvdGhlciB0YWIgdGhhdCB3YXMgcHJldmlvdXNseSBzZWxlY3RlZCBiZWNvbWVzIHVuc2VsZWN0ZWQgYW5kIGl0cyBhc3NvY2lhdGVkIHBhbmUgaXMgaGlkZGVuLlxuICAgKi9cbiAgc2VsZWN0KHRhYklkOiBzdHJpbmcpIHtcbiAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRhYklkKTtcbiAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgIXNlbGVjdGVkVGFiLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSWQgIT09IHNlbGVjdGVkVGFiLmlkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KFxuICAgICAgICAgIHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkOiBzZWxlY3RlZFRhYi5pZCwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFRhYi5pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gYXV0by1jb3JyZWN0IGFjdGl2ZUlkIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIHNldCBpbmNvcnJlY3RseSBhcyBpbnB1dFxuICAgIGxldCBhY3RpdmVUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVUYWIgPyBhY3RpdmVUYWIuaWQgOiAodGhpcy50YWJzLmxlbmd0aCA/IHRoaXMudGFicy5maXJzdC5pZCA6IG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGFiQnlJZChpZDogc3RyaW5nKTogTmdiVGFiIHtcbiAgICBsZXQgdGFic1dpdGhJZDogTmdiVGFiW10gPSB0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuaWQgPT09IGlkKTtcbiAgICByZXR1cm4gdGFic1dpdGhJZC5sZW5ndGggPyB0YWJzV2l0aElkWzBdIDogbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOZ2JUYWJzZXQsIE5nYlRhYiwgTmdiVGFiQ29udGVudCwgTmdiVGFiVGl0bGUsIE5nYlRhYkNoYW5nZUV2ZW50fSBmcm9tICcuL3RhYnNldCc7XG5pbXBvcnQge05nYlRhYnNldENvbmZpZ30gZnJvbSAnLi90YWJzZXQtY29uZmlnJztcblxuZXhwb3J0IHtOZ2JUYWJzZXQsIE5nYlRhYiwgTmdiVGFiQ29udGVudCwgTmdiVGFiVGl0bGUsIE5nYlRhYkNoYW5nZUV2ZW50fSBmcm9tICcuL3RhYnNldCc7XG5leHBvcnQge05nYlRhYnNldENvbmZpZ30gZnJvbSAnLi90YWJzZXQtY29uZmlnJztcblxuY29uc3QgTkdCX1RBQlNFVF9ESVJFQ1RJVkVTID0gW05nYlRhYnNldCwgTmdiVGFiLCBOZ2JUYWJDb250ZW50LCBOZ2JUYWJUaXRsZV07XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfVEFCU0VUX0RJUkVDVElWRVMsIGV4cG9ydHM6IE5HQl9UQUJTRVRfRElSRUNUSVZFUywgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JUYWJzZXRNb2R1bGUsIHByb3ZpZGVyczogW05nYlRhYnNldENvbmZpZ119OyB9XG59XG4iLCJpbXBvcnQge2lzTnVtYmVyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBOZ2JUaW1lIHtcbiAgaG91cjogbnVtYmVyO1xuICBtaW51dGU6IG51bWJlcjtcbiAgc2Vjb25kOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoaG91cj86IG51bWJlciwgbWludXRlPzogbnVtYmVyLCBzZWNvbmQ/OiBudW1iZXIpIHtcbiAgICB0aGlzLmhvdXIgPSB0b0ludGVnZXIoaG91cik7XG4gICAgdGhpcy5taW51dGUgPSB0b0ludGVnZXIobWludXRlKTtcbiAgICB0aGlzLnNlY29uZCA9IHRvSW50ZWdlcihzZWNvbmQpO1xuICB9XG5cbiAgY2hhbmdlSG91cihzdGVwID0gMSkgeyB0aGlzLnVwZGF0ZUhvdXIoKGlzTmFOKHRoaXMuaG91cikgPyAwIDogdGhpcy5ob3VyKSArIHN0ZXApOyB9XG5cbiAgdXBkYXRlSG91cihob3VyOiBudW1iZXIpIHtcbiAgICBpZiAoaXNOdW1iZXIoaG91cikpIHtcbiAgICAgIHRoaXMuaG91ciA9IChob3VyIDwgMCA/IDI0ICsgaG91ciA6IGhvdXIpICUgMjQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaG91ciA9IE5hTjtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VNaW51dGUoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVNaW51dGUoKGlzTmFOKHRoaXMubWludXRlKSA/IDAgOiB0aGlzLm1pbnV0ZSkgKyBzdGVwKTsgfVxuXG4gIHVwZGF0ZU1pbnV0ZShtaW51dGU6IG51bWJlcikge1xuICAgIGlmIChpc051bWJlcihtaW51dGUpKSB7XG4gICAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0ZSAlIDYwIDwgMCA/IDYwICsgbWludXRlICUgNjAgOiBtaW51dGUgJSA2MDtcbiAgICAgIHRoaXMuY2hhbmdlSG91cihNYXRoLmZsb29yKG1pbnV0ZSAvIDYwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWludXRlID0gTmFOO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZVNlY29uZChzdGVwID0gMSkgeyB0aGlzLnVwZGF0ZVNlY29uZCgoaXNOYU4odGhpcy5zZWNvbmQpID8gMCA6IHRoaXMuc2Vjb25kKSArIHN0ZXApOyB9XG5cbiAgdXBkYXRlU2Vjb25kKHNlY29uZDogbnVtYmVyKSB7XG4gICAgaWYgKGlzTnVtYmVyKHNlY29uZCkpIHtcbiAgICAgIHRoaXMuc2Vjb25kID0gc2Vjb25kIDwgMCA/IDYwICsgc2Vjb25kICUgNjAgOiBzZWNvbmQgJSA2MDtcbiAgICAgIHRoaXMuY2hhbmdlTWludXRlKE1hdGguZmxvb3Ioc2Vjb25kIC8gNjApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWNvbmQgPSBOYU47XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZChjaGVja1NlY3MgPSB0cnVlKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKHRoaXMuaG91cikgJiYgaXNOdW1iZXIodGhpcy5taW51dGUpICYmIChjaGVja1NlY3MgPyBpc051bWJlcih0aGlzLnNlY29uZCkgOiB0cnVlKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkgeyByZXR1cm4gYCR7dGhpcy5ob3VyIHx8IDB9OiR7dGhpcy5taW51dGUgfHwgMH06JHt0aGlzLnNlY29uZCB8fCAwfWA7IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVGltZXBpY2tlciBjb21wb25lbnQuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdGltZXBpY2tlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lcGlja2VyQ29uZmlnIHtcbiAgbWVyaWRpYW4gPSBmYWxzZTtcbiAgc3Bpbm5lcnMgPSB0cnVlO1xuICBzZWNvbmRzID0gZmFsc2U7XG4gIGhvdXJTdGVwID0gMTtcbiAgbWludXRlU3RlcCA9IDE7XG4gIHNlY29uZFN0ZXAgPSAxO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICByZWFkb25seUlucHV0cyA9IGZhbHNlO1xuICBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnID0gJ21lZGl1bSc7XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JUaW1lU3RydWN0fSBmcm9tICcuL25nYi10aW1lLXN0cnVjdCc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBBYnN0cmFjdCB0eXBlIHNlcnZpbmcgYXMgYSBESSB0b2tlbiBmb3IgdGhlIHNlcnZpY2UgY29udmVydGluZyBmcm9tIHlvdXIgYXBwbGljYXRpb24gVGltZSBtb2RlbCB0byBpbnRlcm5hbFxuICogTmdiVGltZVN0cnVjdCBtb2RlbC5cbiAqIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjb252ZXJ0aW5nIGZyb20gYW5kIHRvIE5nYlRpbWVTdHJ1Y3QgaXMgcHJvdmlkZWQgZm9yIHJldHJvLWNvbXBhdGliaWxpdHksXG4gKiBidXQgeW91IGNhbiBwcm92aWRlIGFub3RoZXIgaW1wbGVtZW50YXRpb24gdG8gdXNlIGFuIGFsdGVybmF0aXZlIGZvcm1hdCwgaWUgZm9yIHVzaW5nIHdpdGggbmF0aXZlIERhdGUgT2JqZWN0LlxuICpcbiAqIEBzaW5jZSAyLjIuMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiVGltZUFkYXB0ZXI8VD4ge1xuICAvKipcbiAgICogQ29udmVydHMgdXNlci1tb2RlbCBkYXRlIGludG8gYW4gTmdiVGltZVN0cnVjdCBmb3IgaW50ZXJuYWwgdXNlIGluIHRoZSBsaWJyYXJ5XG4gICAqL1xuICBhYnN0cmFjdCBmcm9tTW9kZWwodmFsdWU6IFQpOiBOZ2JUaW1lU3RydWN0O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBpbnRlcm5hbCB0aW1lIHZhbHVlIE5nYlRpbWVTdHJ1Y3QgdG8gdXNlci1tb2RlbCBkYXRlXG4gICAqIFRoZSByZXR1cm5lZCB0eXBlIGlzIHN1cHBvc2VkIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUgYXMgZnJvbU1vZGVsKCkgaW5wdXQtdmFsdWUgcGFyYW1cbiAgICovXG4gIGFic3RyYWN0IHRvTW9kZWwodGltZTogTmdiVGltZVN0cnVjdCk6IFQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYlRpbWVBZGFwdGVyPE5nYlRpbWVTdHJ1Y3Q+IHtcbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTmdiVGltZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYlRpbWVTdHJ1Y3QgdmFsdWVcbiAgICovXG4gIGZyb21Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0KTogTmdiVGltZVN0cnVjdCB7XG4gICAgcmV0dXJuICh0aW1lICYmIGlzSW50ZWdlcih0aW1lLmhvdXIpICYmIGlzSW50ZWdlcih0aW1lLm1pbnV0ZSkpID9cbiAgICAgICAge2hvdXI6IHRpbWUuaG91ciwgbWludXRlOiB0aW1lLm1pbnV0ZSwgc2Vjb25kOiBpc0ludGVnZXIodGltZS5zZWNvbmQpID8gdGltZS5zZWNvbmQgOiBudWxsfSA6XG4gICAgICAgIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBOZ2JUaW1lU3RydWN0IHZhbHVlIGludG8gTmdiVGltZVN0cnVjdCB2YWx1ZVxuICAgKi9cbiAgdG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0KTogTmdiVGltZVN0cnVjdCB7XG4gICAgcmV0dXJuICh0aW1lICYmIGlzSW50ZWdlcih0aW1lLmhvdXIpICYmIGlzSW50ZWdlcih0aW1lLm1pbnV0ZSkpID9cbiAgICAgICAge2hvdXI6IHRpbWUuaG91ciwgbWludXRlOiB0aW1lLm1pbnV0ZSwgc2Vjb25kOiBpc0ludGVnZXIodGltZS5zZWNvbmQpID8gdGltZS5zZWNvbmQgOiBudWxsfSA6XG4gICAgICAgIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7aXNOdW1iZXIsIHBhZE51bWJlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JUaW1lfSBmcm9tICcuL25nYi10aW1lJztcbmltcG9ydCB7TmdiVGltZXBpY2tlckNvbmZpZ30gZnJvbSAnLi90aW1lcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge05nYlRpbWVBZGFwdGVyfSBmcm9tICcuL25nYi10aW1lLWFkYXB0ZXInO1xuXG5jb25zdCBOR0JfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlRpbWVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0ICYgY29uZmlndXJhYmxlIHRpbWVwaWNrZXIgZGlyZWN0aXZlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItdGltZXBpY2tlcicsXG4gIHN0eWxlczogW2BcblxuICAgIDpob3N0IHtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICB9XG5cbiAgICAubmdiLXRwIHtcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5uZ2ItdHAtaW5wdXQtY29udGFpbmVyIHtcbiAgICAgIHdpZHRoOiA0ZW07XG4gICAgfVxuXG4gICAgLm5nYi10cC1ob3VyLCAubmdiLXRwLW1pbnV0ZSwgLm5nYi10cC1zZWNvbmQsIC5uZ2ItdHAtbWVyaWRpYW4ge1xuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAtbXMtZmxleC1wYWNrOiBkaXN0cmlidXRlO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgfVxuXG4gICAgLm5nYi10cC1zcGFjZXIge1xuICAgICAgd2lkdGg6IDFlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG5cbiAgICAuY2hldnJvbjo6YmVmb3JlIHtcbiAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICBib3JkZXItd2lkdGg6IDAuMjllbSAwLjI5ZW0gMCAwO1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBoZWlnaHQ6IDAuNjllbTtcbiAgICAgIGxlZnQ6IDAuMDVlbTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHRvcDogMC4xNWVtO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIHdpZHRoOiAwLjcxZW07XG4gICAgfVxuXG4gICAgLmNoZXZyb24uYm90dG9tOmJlZm9yZSB7XG4gICAgICB0b3A6IC0uM2VtO1xuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAgIH1cblxuICAgIGlucHV0IHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gIGBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmaWVsZHNldCBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLWhvdXJcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbbmdDbGFzc109XCJzZXRCdXR0b25TaXplKClcIiAoY2xpY2spPVwiY2hhbmdlSG91cihob3VyU3RlcClcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtaG91cnNcIj5JbmNyZW1lbnQgaG91cnM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbbmdDbGFzc109XCJzZXRGb3JtQ29udHJvbFNpemUoKVwiIG1heGxlbmd0aD1cIjJcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJISFwiIGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLkhIXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRIb3VyKG1vZGVsPy5ob3VyKVwiIChjaGFuZ2UpPVwidXBkYXRlSG91cigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiSG91cnNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLmhvdXJzXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW25nQ2xhc3NdPVwic2V0QnV0dG9uU2l6ZSgpXCIgKGNsaWNrKT1cImNoYW5nZUhvdXIoLWhvdXJTdGVwKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBib3R0b21cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtaG91cnNcIj5EZWNyZW1lbnQgaG91cnM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjo8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLW1pbnV0ZVwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtuZ0NsYXNzXT1cInNldEJ1dHRvblNpemUoKVwiIChjbGljayk9XCJjaGFuZ2VNaW51dGUobWludXRlU3RlcClcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtbWludXRlc1wiPkluY3JlbWVudCBtaW51dGVzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW25nQ2xhc3NdPVwic2V0Rm9ybUNvbnRyb2xTaXplKClcIiBtYXhsZW5ndGg9XCIyXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTU1cIiBpMThuLXBsYWNlaG9sZGVyPVwiQEBuZ2IudGltZXBpY2tlci5NTVwiXG4gICAgICAgICAgICBbdmFsdWVdPVwiZm9ybWF0TWluU2VjKG1vZGVsPy5taW51dGUpXCIgKGNoYW5nZSk9XCJ1cGRhdGVNaW51dGUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRzXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgYXJpYS1sYWJlbD1cIk1pbnV0ZXNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLm1pbnV0ZXNcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbbmdDbGFzc109XCJzZXRCdXR0b25TaXplKClcIiAoY2xpY2spPVwiY2hhbmdlTWludXRlKC1taW51dGVTdGVwKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBib3R0b21cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiAgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LW1pbnV0ZXNcIj5EZWNyZW1lbnQgbWludXRlczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWNvbmRzXCIgY2xhc3M9XCJuZ2ItdHAtc3BhY2VyXCI+OjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2Vjb25kc1wiIGNsYXNzPVwibmdiLXRwLWlucHV0LWNvbnRhaW5lciBuZ2ItdHAtc2Vjb25kXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW25nQ2xhc3NdPVwic2V0QnV0dG9uU2l6ZSgpXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZChzZWNvbmRTdGVwKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1zZWNvbmRzXCI+SW5jcmVtZW50IHNlY29uZHM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbbmdDbGFzc109XCJzZXRGb3JtQ29udHJvbFNpemUoKVwiIG1heGxlbmd0aD1cIjJcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTU1wiIGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLlNTXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRNaW5TZWMobW9kZWw/LnNlY29uZClcIiAoY2hhbmdlKT1cInVwZGF0ZVNlY29uZCgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiU2Vjb25kc1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRpbWVwaWNrZXIuc2Vjb25kc1wiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtuZ0NsYXNzXT1cInNldEJ1dHRvblNpemUoKVwiIChjbGljayk9XCJjaGFuZ2VTZWNvbmQoLXNlY29uZFN0ZXApXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uIGJvdHRvbVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmRlY3JlbWVudC1zZWNvbmRzXCI+RGVjcmVtZW50IHNlY29uZHM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm1lcmlkaWFuXCIgY2xhc3M9XCJuZ2ItdHAtbWVyaWRpYW5cIj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XCIgW25nQ2xhc3NdPVwic2V0QnV0dG9uU2l6ZSgpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTWVyaWRpYW4oKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGVsPy5ob3VyID49IDEyOyBlbHNlIGFtXCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuUE1cIj5QTTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNhbSBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5BTVwiPkFNPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2ZpZWxkc2V0PlxuICBgLFxuICBwcm92aWRlcnM6IFtOR0JfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE9uQ2hhbmdlcyB7XG4gIGRpc2FibGVkOiBib29sZWFuO1xuICBtb2RlbDogTmdiVGltZTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IDEySCBvciAyNEggbW9kZS5cbiAgICovXG4gIEBJbnB1dCgpIG1lcmlkaWFuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGhlIHNwaW5uZXJzIGFib3ZlIGFuZCBiZWxvdyB0aGUgaW5wdXRzLlxuICAgKi9cbiAgQElucHV0KCkgc3Bpbm5lcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSBzZWNvbmRzIGlucHV0LlxuICAgKi9cbiAgQElucHV0KCkgc2Vjb25kczogYm9vbGVhbjtcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGhvdXJzIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHdoZW4gdXNpbmcgYSBidXR0b24uXG4gICAqL1xuICBASW5wdXQoKSBob3VyU3RlcDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgbWludXRlcyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxuICAgKi9cbiAgQElucHV0KCkgbWludXRlU3RlcDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygc2Vjb25kcyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxuICAgKi9cbiAgQElucHV0KCkgc2Vjb25kU3RlcDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUbyBtYWtlIHRpbWVwaWNrZXIgcmVhZG9ubHlcbiAgICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5SW5wdXRzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUbyBzZXQgdGhlIHNpemUgb2YgdGhlIGlucHV0cyBhbmQgYnV0dG9uXG4gICAqL1xuICBASW5wdXQoKSBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiVGltZXBpY2tlckNvbmZpZywgcHJpdmF0ZSBfbmdiVGltZUFkYXB0ZXI6IE5nYlRpbWVBZGFwdGVyPGFueT4pIHtcbiAgICB0aGlzLm1lcmlkaWFuID0gY29uZmlnLm1lcmlkaWFuO1xuICAgIHRoaXMuc3Bpbm5lcnMgPSBjb25maWcuc3Bpbm5lcnM7XG4gICAgdGhpcy5zZWNvbmRzID0gY29uZmlnLnNlY29uZHM7XG4gICAgdGhpcy5ob3VyU3RlcCA9IGNvbmZpZy5ob3VyU3RlcDtcbiAgICB0aGlzLm1pbnV0ZVN0ZXAgPSBjb25maWcubWludXRlU3RlcDtcbiAgICB0aGlzLnNlY29uZFN0ZXAgPSBjb25maWcuc2Vjb25kU3RlcDtcbiAgICB0aGlzLmRpc2FibGVkID0gY29uZmlnLmRpc2FibGVkO1xuICAgIHRoaXMucmVhZG9ubHlJbnB1dHMgPSBjb25maWcucmVhZG9ubHlJbnB1dHM7XG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemU7XG4gIH1cblxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgY29uc3Qgc3RydWN0VmFsdWUgPSB0aGlzLl9uZ2JUaW1lQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpO1xuICAgIHRoaXMubW9kZWwgPSBzdHJ1Y3RWYWx1ZSA/IG5ldyBOZ2JUaW1lKHN0cnVjdFZhbHVlLmhvdXIsIHN0cnVjdFZhbHVlLm1pbnV0ZSwgc3RydWN0VmFsdWUuc2Vjb25kKSA6IG5ldyBOZ2JUaW1lKCk7XG4gICAgaWYgKCF0aGlzLnNlY29uZHMgJiYgKCFzdHJ1Y3RWYWx1ZSB8fCAhaXNOdW1iZXIoc3RydWN0VmFsdWUuc2Vjb25kKSkpIHtcbiAgICAgIHRoaXMubW9kZWwuc2Vjb25kID0gMDtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxuXG4gIGNoYW5nZUhvdXIoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VIb3VyKHN0ZXApO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIGNoYW5nZU1pbnV0ZShzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLm1vZGVsLmNoYW5nZU1pbnV0ZShzdGVwKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICBjaGFuZ2VTZWNvbmQoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VTZWNvbmQoc3RlcCk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgdXBkYXRlSG91cihuZXdWYWw6IHN0cmluZykge1xuICAgIGNvbnN0IGlzUE0gPSB0aGlzLm1vZGVsLmhvdXIgPj0gMTI7XG4gICAgY29uc3QgZW50ZXJlZEhvdXIgPSB0b0ludGVnZXIobmV3VmFsKTtcbiAgICBpZiAodGhpcy5tZXJpZGlhbiAmJiAoaXNQTSAmJiBlbnRlcmVkSG91ciA8IDEyIHx8ICFpc1BNICYmIGVudGVyZWRIb3VyID09PSAxMikpIHtcbiAgICAgIHRoaXMubW9kZWwudXBkYXRlSG91cihlbnRlcmVkSG91ciArIDEyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbC51cGRhdGVIb3VyKGVudGVyZWRIb3VyKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgdXBkYXRlTWludXRlKG5ld1ZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbC51cGRhdGVNaW51dGUodG9JbnRlZ2VyKG5ld1ZhbCkpO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZVNlY29uZChuZXdWYWw6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWwudXBkYXRlU2Vjb25kKHRvSW50ZWdlcihuZXdWYWwpKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB0b2dnbGVNZXJpZGlhbigpIHtcbiAgICBpZiAodGhpcy5tZXJpZGlhbikge1xuICAgICAgdGhpcy5jaGFuZ2VIb3VyKDEyKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRIb3VyKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICBpZiAodGhpcy5tZXJpZGlhbikge1xuICAgICAgICByZXR1cm4gcGFkTnVtYmVyKHZhbHVlICUgMTIgPT09IDAgPyAxMiA6IHZhbHVlICUgMTIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDI0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhZE51bWJlcihOYU4pO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdE1pblNlYyh2YWx1ZTogbnVtYmVyKSB7IHJldHVybiBwYWROdW1iZXIodmFsdWUpOyB9XG5cbiAgc2V0Rm9ybUNvbnRyb2xTaXplKCkgeyByZXR1cm4geydmb3JtLWNvbnRyb2wtc20nOiB0aGlzLnNpemUgPT09ICdzbWFsbCcsICdmb3JtLWNvbnRyb2wtbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZSd9OyB9XG5cbiAgc2V0QnV0dG9uU2l6ZSgpIHsgcmV0dXJuIHsnYnRuLXNtJzogdGhpcy5zaXplID09PSAnc21hbGwnLCAnYnRuLWxnJzogdGhpcy5zaXplID09PSAnbGFyZ2UnfTsgfVxuXG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydzZWNvbmRzJ10gJiYgIXRoaXMuc2Vjb25kcyAmJiB0aGlzLm1vZGVsICYmICFpc051bWJlcih0aGlzLm1vZGVsLnNlY29uZCkpIHtcbiAgICAgIHRoaXMubW9kZWwuc2Vjb25kID0gMDtcbiAgICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvcGFnYXRlTW9kZWxDaGFuZ2UodG91Y2hlZCA9IHRydWUpIHtcbiAgICBpZiAodG91Y2hlZCkge1xuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW9kZWwuaXNWYWxpZCh0aGlzLnNlY29uZHMpKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMuX25nYlRpbWVBZGFwdGVyLnRvTW9kZWwoe2hvdXI6IHRoaXMubW9kZWwuaG91ciwgbWludXRlOiB0aGlzLm1vZGVsLm1pbnV0ZSwgc2Vjb25kOiB0aGlzLm1vZGVsLnNlY29uZH0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKG51bGwpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiVGltZXBpY2tlcn0gZnJvbSAnLi90aW1lcGlja2VyJztcbmltcG9ydCB7TmdiVGltZXBpY2tlckNvbmZpZ30gZnJvbSAnLi90aW1lcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge05nYlRpbWVBZGFwdGVyLCBOZ2JUaW1lU3RydWN0QWRhcHRlcn0gZnJvbSAnLi9uZ2ItdGltZS1hZGFwdGVyJztcblxuZXhwb3J0IHtOZ2JUaW1lcGlja2VyfSBmcm9tICcuL3RpbWVwaWNrZXInO1xuZXhwb3J0IHtOZ2JUaW1lcGlja2VyQ29uZmlnfSBmcm9tICcuL3RpbWVwaWNrZXItY29uZmlnJztcbmV4cG9ydCB7TmdiVGltZVN0cnVjdH0gZnJvbSAnLi9uZ2ItdGltZS1zdHJ1Y3QnO1xuZXhwb3J0IHtOZ2JUaW1lQWRhcHRlcn0gZnJvbSAnLi9uZ2ItdGltZS1hZGFwdGVyJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JUaW1lcGlja2VyXSwgZXhwb3J0czogW05nYlRpbWVwaWNrZXJdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmdiVGltZXBpY2tlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW05nYlRpbWVwaWNrZXJDb25maWcsIHtwcm92aWRlOiBOZ2JUaW1lQWRhcHRlciwgdXNlQ2xhc3M6IE5nYlRpbWVTdHJ1Y3RBZGFwdGVyfV1cbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVG9vbHRpcCBkaXJlY3RpdmUuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdG9vbHRpcHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwQ29uZmlnIHtcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICd0b3AnO1xuICB0cmlnZ2VycyA9ICdob3Zlcic7XG4gIGNvbnRhaW5lcjogc3RyaW5nO1xuICBkaXNhYmxlVG9vbHRpcCA9IGZhbHNlO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBJbmplY3RvcixcbiAgUmVuZGVyZXIyLFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7bGlzdGVuVG9UcmlnZ2Vyc30gZnJvbSAnLi4vdXRpbC90cmlnZ2Vycyc7XG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudCwgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHtOZ2JUb29sdGlwQ29uZmlnfSBmcm9tICcuL3Rvb2x0aXAtY29uZmlnJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10b29sdGlwLXdpbmRvdycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnXCJ0b29sdGlwIHNob3cgYnMtdG9vbHRpcC1cIiArIHBsYWNlbWVudC5zcGxpdChcIi1cIilbMF0rXCIgYnMtdG9vbHRpcC1cIiArIHBsYWNlbWVudCcsXG4gICAgJ3JvbGUnOiAndG9vbHRpcCcsXG4gICAgJ1tpZF0nOiAnaWQnXG4gIH0sXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YCxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0LmJzLXRvb2x0aXAtdG9wIC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1ib3R0b20gLmFycm93IHtcbiAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMC40cmVtKTtcbiAgICB9XG5cbiAgICA6aG9zdC5icy10b29sdGlwLXRvcC1sZWZ0IC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1ib3R0b20tbGVmdCAuYXJyb3cge1xuICAgICAgbGVmdDogMWVtO1xuICAgIH1cblxuICAgIDpob3N0LmJzLXRvb2x0aXAtdG9wLXJpZ2h0IC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1ib3R0b20tcmlnaHQgLmFycm93IHtcbiAgICAgIGxlZnQ6IGF1dG87XG4gICAgICByaWdodDogMC44cmVtO1xuICAgIH1cblxuICAgIDpob3N0LmJzLXRvb2x0aXAtbGVmdCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtcmlnaHQgLmFycm93IHtcbiAgICAgIHRvcDogY2FsYyg1MCUgLSAwLjRyZW0pO1xuICAgIH1cblxuICAgIDpob3N0LmJzLXRvb2x0aXAtbGVmdC10b3AgLmFycm93LCA6aG9zdC5icy10b29sdGlwLXJpZ2h0LXRvcCAuYXJyb3cge1xuICAgICAgdG9wOiAwLjRyZW07XG4gICAgfVxuXG4gICAgOmhvc3QuYnMtdG9vbHRpcC1sZWZ0LWJvdHRvbSAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtcmlnaHQtYm90dG9tIC5hcnJvdyB7XG4gICAgICB0b3A6IGF1dG87XG4gICAgICBib3R0b206IDAuNHJlbTtcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXBXaW5kb3cge1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICd0b3AnO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIGFwcGx5UGxhY2VtZW50KF9wbGFjZW1lbnQ6IFBsYWNlbWVudCkge1xuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXRvb2x0aXAtJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkuc3BsaXQoJy0nKVswXSk7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtdG9vbHRpcC0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKSk7XG5cbiAgICAvLyBzZXQgdGhlIG5ldyBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgIHRoaXMucGxhY2VtZW50ID0gX3BsYWNlbWVudDtcblxuICAgIC8vIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtdG9vbHRpcC0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKS5zcGxpdCgnLScpWzBdKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy10b29sdGlwLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQsIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSB0b29sdGlwIGNyZWF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JUb29sdGlwXScsIGV4cG9ydEFzOiAnbmdiVG9vbHRpcCd9KVxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgICogUGxhY2VtZW50IG9mIGEgcG9wb3ZlciBhY2NlcHRzOlxuICAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXG4gICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxuICAgICogYW5kIGFycmF5IG9mIGFib3ZlIHZhbHVlcy5cbiAgICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuICAvKipcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50IG5hbWVzLlxuICAgKi9cbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBhIGdpdmVuIHRvb2x0aXAgaXMgZGlzYWJsZWQgYW5kIHNob3VsZCBub3QgYmUgZGlzcGxheWVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVUb29sdGlwOiBib29sZWFuO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93blxuICAgKi9cbiAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBoaWRkZW5cbiAgICovXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcFdpbmRvd0lkID0gYG5nYi10b29sdGlwLSR7bmV4dElkKyt9YDtcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiVG9vbHRpcFdpbmRvdz47XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlRvb2x0aXBXaW5kb3c+O1xuICBwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgY29uZmlnOiBOZ2JUb29sdGlwQ29uZmlnLFxuICAgICAgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5kaXNhYmxlVG9vbHRpcCA9IGNvbmZpZy5kaXNhYmxlVG9vbHRpcDtcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlRvb2x0aXBXaW5kb3c+KFxuICAgICAgICBOZ2JUb29sdGlwV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xuXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXG4gICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb250ZW50IHRvIGJlIGRpc3BsYXllZCBhcyB0b29sdGlwLiBJZiBmYWxzeSwgdGhlIHRvb2x0aXAgd29uJ3Qgb3Blbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBuZ2JUb29sdGlwKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgdGhpcy5fbmdiVG9vbHRpcCA9IHZhbHVlO1xuICAgIGlmICghdmFsdWUgJiYgdGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5nYlRvb2x0aXAoKSB7IHJldHVybiB0aGlzLl9uZ2JUb29sdGlwOyB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGFuIGVsZW1lbnTDosKAwplzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIMOiwoDCnG1hbnVhbMOiwoDCnSB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxuICAgKiBUaGUgY29udGV4dCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSB0b29sdGlwIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cbiAgICovXG4gIG9wZW4oY29udGV4dD86IGFueSkge1xuICAgIGlmICghdGhpcy5fd2luZG93UmVmICYmIHRoaXMuX25nYlRvb2x0aXAgJiYgIXRoaXMuZGlzYWJsZVRvb2x0aXApIHtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKHRoaXMuX25nYlRvb2x0aXAsIGNvbnRleHQpO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuX25nYlRvb2x0aXBXaW5kb3dJZCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wbGFjZW1lbnQgPSBBcnJheS5pc0FycmF5KHRoaXMucGxhY2VtZW50KSA/IHRoaXMucGxhY2VtZW50WzBdIDogdGhpcy5wbGFjZW1lbnQ7XG5cbiAgICAgIC8vIGFwcGx5IHN0eWxpbmcgdG8gc2V0IGJhc2ljIGNzcy1jbGFzc2VzIG9uIHRhcmdldCBlbGVtZW50LCBiZWZvcmUgZ29pbmcgZm9yIHBvc2l0aW9uaW5nXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAvLyBwb3NpdGlvbiB0b29sdGlwIGFsb25nIHRoZSBlbGVtZW50XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXG4gICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcblxuICAgICAgdGhpcy5zaG93bi5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbiBlbGVtZW50w6LCgMKZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl93aW5kb3dSZWYgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcbiAgICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcbiAgICAgIHRoaXMuaGlkZGVuLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW50w6LCgMKZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB0b29sdGlwIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLm9wZW4uYmluZCh0aGlzKSwgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBhcyBpdCBtaWdodCBoYXBwZW4gdGhhdCBuZ09uRGVzdHJveSBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0XG4gICAgLy8gdW5kZXIgY2VydGFpbiBjb25kaXRpb25zLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMTk5XG4gICAgaWYgKHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbikge1xuICAgICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKCk7XG4gICAgfVxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiVG9vbHRpcCwgTmdiVG9vbHRpcFdpbmRvd30gZnJvbSAnLi90b29sdGlwJztcbmltcG9ydCB7TmdiVG9vbHRpcENvbmZpZ30gZnJvbSAnLi90b29sdGlwLWNvbmZpZyc7XG5pbXBvcnQge1BsYWNlbWVudH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbmV4cG9ydCB7TmdiVG9vbHRpcENvbmZpZ30gZnJvbSAnLi90b29sdGlwLWNvbmZpZyc7XG5leHBvcnQge05nYlRvb2x0aXB9IGZyb20gJy4vdG9vbHRpcCc7XG5leHBvcnQge1BsYWNlbWVudH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiVG9vbHRpcCwgTmdiVG9vbHRpcFdpbmRvd10sIGV4cG9ydHM6IFtOZ2JUb29sdGlwXSwgZW50cnlDb21wb25lbnRzOiBbTmdiVG9vbHRpcFdpbmRvd119KVxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVG9vbHRpcE1vZHVsZSwgcHJvdmlkZXJzOiBbTmdiVG9vbHRpcENvbmZpZ119OyB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtyZWdFeHBFc2NhcGUsIHRvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItaGlnaGxpZ2h0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cInBhcnRzXCIgbGV0LXBhcnQgbGV0LWlzT2RkPVwib2RkXCI+YCArXG4gICAgICBgPHNwYW4gKm5nSWY9XCJpc09kZFwiIGNsYXNzPVwie3toaWdobGlnaHRDbGFzc319XCI+e3twYXJ0fX08L3NwYW4+PG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc09kZFwiPnt7cGFydH19PC9uZy10ZW1wbGF0ZT5gICtcbiAgICAgIGA8L25nLXRlbXBsYXRlPmAsICAvLyB0ZW1wbGF0ZSBuZWVkcyB0byBiZSBmb3JtYXR0ZWQgaW4gYSBjZXJ0YWluIHdheSBzbyB3ZSBkb24ndCBhZGQgZW1wdHkgdGV4dCBub2Rlc1xuICBzdHlsZXM6IFtgXG4gICAgLm5nYi1oaWdobGlnaHQge1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JIaWdobGlnaHQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBwYXJ0czogc3RyaW5nW107XG5cbiAgQElucHV0KCkgaGlnaGxpZ2h0Q2xhc3MgPSAnbmdiLWhpZ2hsaWdodCc7XG4gIEBJbnB1dCgpIHJlc3VsdDogc3RyaW5nO1xuICBASW5wdXQoKSB0ZXJtOiBzdHJpbmc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHJlc3VsdFN0ciA9IHRvU3RyaW5nKHRoaXMucmVzdWx0KTtcbiAgICBjb25zdCByZXN1bHRMQyA9IHJlc3VsdFN0ci50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHRlcm1MQyA9IHRvU3RyaW5nKHRoaXMudGVybSkudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgY3VycmVudElkeCA9IDA7XG5cbiAgICBpZiAodGVybUxDLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucGFydHMgPSByZXN1bHRMQy5zcGxpdChuZXcgUmVnRXhwKGAoJHtyZWdFeHBFc2NhcGUodGVybUxDKX0pYCkpLm1hcCgocGFydCkgPT4ge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFBhcnQgPSByZXN1bHRTdHIuc3Vic3RyKGN1cnJlbnRJZHgsIHBhcnQubGVuZ3RoKTtcbiAgICAgICAgY3VycmVudElkeCArPSBwYXJ0Lmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUGFydDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcnRzID0gW3Jlc3VsdFN0cl07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHt0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBDb250ZXh0IGZvciB0aGUgdHlwZWFoZWFkIHJlc3VsdCB0ZW1wbGF0ZSBpbiBjYXNlIHlvdSB3YW50IHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9uZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdFRlbXBsYXRlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBZb3VyIHR5cGVhaGVhZCByZXN1bHQgZGF0YSBtb2RlbFxuICAgKi9cbiAgcmVzdWx0OiBhbnk7XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0ZXJtIGZyb20gdGhlIGlucHV0IHVzZWQgdG8gZ2V0IGN1cnJlbnQgcmVzdWx0XG4gICAqL1xuICB0ZXJtOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10eXBlYWhlYWQtd2luZG93JyxcbiAgZXhwb3J0QXM6ICduZ2JUeXBlYWhlYWRXaW5kb3cnLFxuICBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLW1lbnUgc2hvdycsICdyb2xlJzogJ2xpc3Rib3gnLCAnW2lkXSc6ICdpZCd9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjcnQgbGV0LXJlc3VsdD1cInJlc3VsdFwiIGxldC10ZXJtPVwidGVybVwiIGxldC1mb3JtYXR0ZXI9XCJmb3JtYXR0ZXJcIj5cbiAgICAgIDxuZ2ItaGlnaGxpZ2h0IFtyZXN1bHRdPVwiZm9ybWF0dGVyKHJlc3VsdClcIiBbdGVybV09XCJ0ZXJtXCI+PC9uZ2ItaGlnaGxpZ2h0PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cInJlc3VsdHNcIiBsZXQtcmVzdWx0IGxldC1pZHg9XCJpbmRleFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgIFtpZF09XCJpZCArICctJyArIGlkeFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaWR4ID09PSBhY3RpdmVJZHhcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJtYXJrQWN0aXZlKGlkeClcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0KHJlc3VsdClcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicmVzdWx0VGVtcGxhdGUgfHwgcnRcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cmVzdWx0OiByZXN1bHQsIHRlcm06IHRlcm0sIGZvcm1hdHRlcjogZm9ybWF0dGVyfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZFdpbmRvdyBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGFjdGl2ZUlkeCA9IDA7XG5cbiAgLyoqXG4gICAqICBUaGUgaWQgZm9yIHRoZSB0eXBlYWhlYWQgd2lkbm93LiBUaGUgaWQgc2hvdWxkIGJlIHVuaXF1ZSBhbmQgdGhlIHNhbWVcbiAgICogIGFzIHRoZSBhc3NvY2lhdGVkIHR5cGVhaGVhZCdzIGlkLlxuICAgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBmaXJzdCByb3cgc2hvdWxkIGJlIGFjdGl2ZSBpbml0aWFsbHlcbiAgICovXG4gIEBJbnB1dCgpIGZvY3VzRmlyc3QgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUeXBlYWhlYWQgbWF0Y2ggcmVzdWx0cyB0byBiZSBkaXNwbGF5ZWRcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdHM7XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0ZXJtIHVzZWQgdG8gZ2V0IGN1cnJlbnQgcmVzdWx0c1xuICAgKi9cbiAgQElucHV0KCkgdGVybTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZm9ybWF0IGEgZ2l2ZW4gcmVzdWx0IGJlZm9yZSBkaXNwbGF5LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGhvdXQgYW55XG4gICAqIEhUTUwgbWFya3VwXG4gICAqL1xuICBASW5wdXQoKSBmb3JtYXR0ZXIgPSB0b1N0cmluZztcblxuICAvKipcbiAgICogQSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBhIG1hdGNoaW5nIHJlc3VsdCBkZWZhdWx0IGRpc3BsYXlcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxSZXN1bHRUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBFdmVudCByYWlzZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBwYXJ0aWN1bGFyIHJlc3VsdCByb3dcbiAgICovXG4gIEBPdXRwdXQoJ3NlbGVjdCcpIHNlbGVjdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoJ2FjdGl2ZUNoYW5nZScpIGFjdGl2ZUNoYW5nZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGhhc0FjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuYWN0aXZlSWR4ID4gLTEgJiYgdGhpcy5hY3RpdmVJZHggPCB0aGlzLnJlc3VsdHMubGVuZ3RoOyB9XG5cbiAgZ2V0QWN0aXZlKCkgeyByZXR1cm4gdGhpcy5yZXN1bHRzW3RoaXMuYWN0aXZlSWR4XTsgfVxuXG4gIG1hcmtBY3RpdmUoYWN0aXZlSWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZUlkeCA9IGFjdGl2ZUlkeDtcbiAgICB0aGlzLl9hY3RpdmVDaGFuZ2VkKCk7XG4gIH1cblxuICBuZXh0KCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZUlkeCA9PT0gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWR4ID0gdGhpcy5mb2N1c0ZpcnN0ID8gKHRoaXMuYWN0aXZlSWR4ICsgMSkgJSB0aGlzLnJlc3VsdHMubGVuZ3RoIDogLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlSWR4Kys7XG4gICAgfVxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlSWR4IDwgMCkge1xuICAgICAgdGhpcy5hY3RpdmVJZHggPSB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlSWR4ID09PSAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMuZm9jdXNGaXJzdCA/IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxIDogLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlSWR4LS07XG4gICAgfVxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZlKCkge1xuICAgIHRoaXMuYWN0aXZlSWR4ID0gdGhpcy5mb2N1c0ZpcnN0ID8gMCA6IC0xO1xuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcbiAgfVxuXG4gIHNlbGVjdChpdGVtKSB7IHRoaXMuc2VsZWN0RXZlbnQuZW1pdChpdGVtKTsgfVxuXG4gIG5nT25Jbml0KCkgeyB0aGlzLnJlc2V0QWN0aXZlKCk7IH1cblxuICBwcml2YXRlIF9hY3RpdmVDaGFuZ2VkKCkge1xuICAgIHRoaXMuYWN0aXZlQ2hhbmdlRXZlbnQuZW1pdCh0aGlzLmFjdGl2ZUlkeCA+PSAwID8gdGhpcy5pZCArICctJyArIHRoaXMuYWN0aXZlSWR4IDogdW5kZWZpbmVkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5cbi8vIHVzZWZ1bG5lc3MgKGFuZCBkZWZhdWx0IHZhbHVlKSBvZiBkZWxheSBkb2N1bWVudGVkIGluIE1hdGVyaWFsJ3MgQ0RLXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi82NDA1ZGE5YjhlODUzMmE3ZTVjODU0YzkyMGVlMTgxNWMyNzVkNzM0L3NyYy9jZGsvYTExeS9saXZlLWFubm91bmNlci9saXZlLWFubm91bmNlci50cyNMNTBcbmV4cG9ydCB0eXBlIEFSSUFfTElWRV9ERUxBWV9UWVBFID0gbnVtYmVyIHwgbnVsbDtcbmV4cG9ydCBjb25zdCBBUklBX0xJVkVfREVMQVkgPSBuZXcgSW5qZWN0aW9uVG9rZW48QVJJQV9MSVZFX0RFTEFZX1RZUEU+KCdsaXZlIGFubm91bmNlciBkZWxheScpO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQVJJQV9MSVZFX0RFTEFZOiBBUklBX0xJVkVfREVMQVlfVFlQRSA9IDEwMDtcblxuXG5cbmZ1bmN0aW9uIGdldExpdmVFbGVtZW50KGRvY3VtZW50OiBhbnksIGxhenlDcmVhdGUgPSBmYWxzZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcjbmdiLWxpdmUnKSBhcyBIVE1MRWxlbWVudDtcblxuICBpZiAoZWxlbWVudCA9PSBudWxsICYmIGxhenlDcmVhdGUpIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmdiLWxpdmUnKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWF0b21pYycsICd0cnVlJyk7XG5cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NyLW9ubHknKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMaXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgQEluamVjdChBUklBX0xJVkVfREVMQVkpIHByaXZhdGUgX2RlbGF5OiBhbnkpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGdldExpdmVFbGVtZW50KHRoaXMuX2RvY3VtZW50KTtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHNheShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZ2V0TGl2ZUVsZW1lbnQodGhpcy5fZG9jdW1lbnQsIHRydWUpO1xuICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5fZGVsYXk7XG5cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgY29uc3Qgc2V0VGV4dCA9ICgpID0+IGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIGlmIChkZWxheSA9PT0gbnVsbCkge1xuICAgICAgc2V0VGV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KHNldFRleHQsIGRlbGF5KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUeXBlYWhlYWQgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHR5cGVhaGVhZHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWRDb25maWcge1xuICBjb250YWluZXI7XG4gIGVkaXRhYmxlID0gdHJ1ZTtcbiAgZm9jdXNGaXJzdCA9IHRydWU7XG4gIHNob3dIaW50ID0gZmFsc2U7XG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge09ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQge05nYlR5cGVhaGVhZFdpbmRvdywgUmVzdWx0VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHt0b1N0cmluZywgaXNEZWZpbmVkfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7TGl2ZX0gZnJvbSAnLi4vdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XG5pbXBvcnQge21hcCwgc3dpdGNoTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlR5cGVhaGVhZCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIFBheWxvYWQgb2YgdGhlIHNlbGVjdEl0ZW0gZXZlbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50IHtcbiAgLyoqXG4gICAqIEFuIGl0ZW0gYWJvdXQgdG8gYmUgc2VsZWN0ZWRcbiAgICovXG4gIGl0ZW06IGFueTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIHByZXZlbnQgaXRlbSBzZWxlY3Rpb24gaWYgY2FsbGVkXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxubGV0IG5leHRXaW5kb3dJZCA9IDA7XG5cbi8qKlxuICogTmdiVHlwZWFoZWFkIGRpcmVjdGl2ZSBwcm92aWRlcyBhIHNpbXBsZSB3YXkgb2YgY3JlYXRpbmcgcG93ZXJmdWwgdHlwZWFoZWFkcyBmcm9tIGFueSB0ZXh0IGlucHV0XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W25nYlR5cGVhaGVhZF0nLFxuICBleHBvcnRBczogJ25nYlR5cGVhaGVhZCcsXG4gIGhvc3Q6IHtcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXG4gICAgJ1tjbGFzcy5vcGVuXSc6ICdpc1BvcHVwT3BlbigpJyxcbiAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdvbkRvY3VtZW50Q2xpY2soJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxuICAgICdbYXV0b2NvbXBsZXRlXSc6ICdhdXRvY29tcGxldGUnLFxuICAgICdhdXRvY2FwaXRhbGl6ZSc6ICdvZmYnLFxuICAgICdhdXRvY29ycmVjdCc6ICdvZmYnLFxuICAgICdyb2xlJzogJ2NvbWJvYm94JyxcbiAgICAnYXJpYS1tdWx0aWxpbmUnOiAnZmFsc2UnLFxuICAgICdbYXR0ci5hcmlhLWF1dG9jb21wbGV0ZV0nOiAnc2hvd0hpbnQgPyBcImJvdGhcIiA6IFwibGlzdFwiJyxcbiAgICAnW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XSc6ICdhY3RpdmVEZXNjZW5kYW50JyxcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdpc1BvcHVwT3BlbigpID8gcG9wdXBJZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdpc1BvcHVwT3BlbigpJ1xuICB9LFxuICBwcm92aWRlcnM6IFtOR0JfVFlQRUFIRUFEX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlR5cGVhaGVhZFdpbmRvdz47XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9pbnB1dFZhbHVlQmFja3VwOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBwcml2YXRlIF9yZXN1YnNjcmliZVR5cGVhaGVhZDogQmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlR5cGVhaGVhZFdpbmRvdz47XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcblxuICAvKipcbiAgICogVmFsdWUgZm9yIHRoZSBjb25maWd1cmFibGUgYXV0b2NvbXBsZXRlIGF0dHJpYnV0ZS5cbiAgICogRGVmYXVsdHMgdG8gJ29mZicgdG8gZGlzYWJsZSB0aGUgbmF0aXZlIGJyb3dzZXIgYXV0b2NvbXBsZXRlLCBidXQgdGhpcyBzdGFuZGFyZCB2YWx1ZSBkb2VzIG5vdCBzZWVtXG4gICAqIHRvIGJlIGFsd2F5cyBjb3JyZWN0bHkgdGFrZW4gaW50byBhY2NvdW50LlxuICAgKlxuICAgKiBAc2luY2UgMi4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGF1dG9jb21wbGV0ZSA9ICdvZmYnO1xuXG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBtb2RlbCB2YWx1ZXMgc2hvdWxkIGJlIHJlc3RyaWN0ZWQgdG8gdGhlIG9uZXMgc2VsZWN0ZWQgZnJvbSB0aGUgcG9wdXAgb25seS5cbiAgICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgZmlyc3QgbWF0Y2ggc2hvdWxkIGF1dG9tYXRpY2FsbHkgYmUgZm9jdXNlZCBhcyB5b3UgdHlwZS5cbiAgICovXG4gIEBJbnB1dCgpIGZvY3VzRmlyc3Q6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gY29udmVydCBhIGdpdmVuIHZhbHVlIGludG8gc3RyaW5nIHRvIGRpc3BsYXkgaW4gdGhlIGlucHV0IGZpZWxkXG4gICAqL1xuICBASW5wdXQoKSBpbnB1dEZvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIHByb3ZpZGVkIG9ic2VydmFibGUgdGV4dCBpbnRvIHRoZSBhcnJheSBvZiByZXN1bHRzLiAgTm90ZSB0aGF0IHRoZSBcInRoaXNcIiBhcmd1bWVudFxuICAgKiBpcyB1bmRlZmluZWQgc28geW91IG5lZWQgdG8gZXhwbGljaXRseSBiaW5kIGl0IHRvIGEgZGVzaXJlZCBcInRoaXNcIiB0YXJnZXQuXG4gICAqL1xuICBASW5wdXQoKSBuZ2JUeXBlYWhlYWQ6ICh0ZXh0OiBPYnNlcnZhYmxlPHN0cmluZz4pID0+IE9ic2VydmFibGU8YW55W10+O1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIGZvcm1hdCBhIGdpdmVuIHJlc3VsdCBiZWZvcmUgZGlzcGxheS4gVGhpcyBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgZm9ybWF0dGVkIHN0cmluZyB3aXRob3V0IGFueVxuICAgKiBIVE1MIG1hcmt1cFxuICAgKi9cbiAgQElucHV0KCkgcmVzdWx0Rm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHRlbXBsYXRlIHRvIG92ZXJyaWRlIGEgbWF0Y2hpbmcgcmVzdWx0IGRlZmF1bHQgZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgcmVzdWx0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPFJlc3VsdFRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIFNob3cgaGludCB3aGVuIGFuIG9wdGlvbiBpbiB0aGUgcmVzdWx0IGxpc3QgbWF0Y2hlcy5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dIaW50OiBib29sZWFuO1xuXG4gIC8qKiBQbGFjZW1lbnQgb2YgYSB0eXBlYWhlYWQgYWNjZXB0czpcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXG4gICAqICAgIFwibGVmdFwiLCBcImxlZnQtdG9wXCIsIFwibGVmdC1ib3R0b21cIiwgXCJyaWdodFwiLCBcInJpZ2h0LXRvcFwiLCBcInJpZ2h0LWJvdHRvbVwiXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXG4gICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gYSBtYXRjaCBpcyBzZWxlY3RlZC4gRXZlbnQgcGF5bG9hZCBpcyBvZiB0eXBlIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudC5cbiAgICovXG4gIEBPdXRwdXQoKSBzZWxlY3RJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQ+KCk7XG5cbiAgYWN0aXZlRGVzY2VuZGFudDogc3RyaW5nO1xuICBwb3B1cElkID0gYG5nYi10eXBlYWhlYWQtJHtuZXh0V2luZG93SWQrK31gO1xuXG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PiwgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBjb25maWc6IE5nYlR5cGVhaGVhZENvbmZpZywgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2xpdmU6IExpdmUpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5lZGl0YWJsZSA9IGNvbmZpZy5lZGl0YWJsZTtcbiAgICB0aGlzLmZvY3VzRmlyc3QgPSBjb25maWcuZm9jdXNGaXJzdDtcbiAgICB0aGlzLnNob3dIaW50ID0gY29uZmlnLnNob3dIaW50O1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcblxuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlcyA9IGZyb21FdmVudDxFdmVudD4oX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKCRldmVudCA9PiAoJGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xuXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxuICAgICAgICBOZ2JUeXBlYWhlYWRXaW5kb3csIF9pbmplY3RvciwgX3ZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcblxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBuZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlcyQgPSB0aGlzLl92YWx1ZUNoYW5nZXMucGlwZSh0YXAodmFsdWUgPT4ge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuZWRpdGFibGUpIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodmFsdWUpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zdCByZXN1bHRzJCA9IGlucHV0VmFsdWVzJC5waXBlKHRoaXMubmdiVHlwZWFoZWFkKTtcbiAgICBjb25zdCBwcm9jZXNzZWRSZXN1bHRzJCA9IHJlc3VsdHMkLnBpcGUodGFwKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSh1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zdCB1c2VySW5wdXQkID0gdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQucGlwZShzd2l0Y2hNYXAoKCkgPT4gcHJvY2Vzc2VkUmVzdWx0cyQpKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9zdWJzY3JpYmVUb1VzZXJJbnB1dCh1c2VySW5wdXQkKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcbiAgICB0aGlzLl91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKTtcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uVG91Y2hlZCA9IGZuOyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkgeyB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHZhbHVlKSk7IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLmRpc21pc3NQb3B1cCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzZXMgdHlwZWFoZWFkIHBvcHVwIHdpbmRvd1xuICAgKi9cbiAgZGlzbWlzc1BvcHVwKCkge1xuICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcbiAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0eXBlYWhlYWQgcG9wdXAgd2luZG93IGlzIGRpc3BsYXllZFxuICAgKi9cbiAgaXNQb3B1cE9wZW4oKSB7IHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDsgfVxuXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgfVxuXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChLZXlbdG9TdHJpbmcoZXZlbnQud2hpY2gpXSkge1xuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UubmV4dCgpO1xuICAgICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucHJldigpO1xuICAgICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkVudGVyOlxuICAgICAgICBjYXNlIEtleS5UYWI6XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpO1xuICAgICAgICAgIGlmIChpc0RlZmluZWQocmVzdWx0KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuRXNjYXBlOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcbiAgICAgICAgICB0aGlzLmRpc21pc3NQb3B1cCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29wZW5Qb3B1cCgpIHtcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLnBvcHVwSWQ7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2Uuc2VsZWN0RXZlbnQuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4gdGhpcy5fc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQpKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hY3RpdmVDaGFuZ2VFdmVudC5zdWJzY3JpYmUoKGFjdGl2ZUlkOiBzdHJpbmcpID0+IHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IGFjdGl2ZUlkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZVBvcHVwKCkge1xuICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0UmVzdWx0KHJlc3VsdDogYW55KSB7XG4gICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdEl0ZW0uZW1pdCh7aXRlbTogcmVzdWx0LCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG5cbiAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShyZXN1bHQpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XG4gICAgdGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0hpbnQoKSB7XG4gICAgaWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmhhc0FjdGl2ZSgpICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT0gbnVsbCkge1xuICAgICAgY29uc3QgdXNlcklucHV0TG93ZXJDYXNlID0gdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gdGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKSk7XG5cbiAgICAgIGlmICh1c2VySW5wdXRMb3dlckNhc2UgPT09IGZvcm1hdHRlZFZhbC5zdWJzdHIoMCwgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgKyBmb3JtYXR0ZWRWYWwuc3Vic3RyKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2V0U2VsZWN0aW9uUmFuZ2UnXS5hcHBseShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgW3RoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoLCBmb3JtYXR0ZWRWYWwubGVuZ3RoXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRJdGVtRm9ySW5wdXQoaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbSAhPSBudWxsICYmIHRoaXMuaW5wdXRGb3JtYXR0ZXIgPyB0aGlzLmlucHV0Rm9ybWF0dGVyKGl0ZW0pIDogdG9TdHJpbmcoaXRlbSk7XG4gIH1cblxuICBwcml2YXRlIF93cml0ZUlucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdG9TdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQ6IE9ic2VydmFibGU8YW55W10+KTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdXNlcklucHV0JC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgIGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGVuUG9wdXAoKTtcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmZvY3VzRmlyc3QgPSB0aGlzLmZvY3VzRmlyc3Q7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRlcm0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEZvcm1hdHRlcikge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5mb3JtYXR0ZXIgPSB0aGlzLnJlc3VsdEZvcm1hdHRlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZXN1bHRUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRUZW1wbGF0ZSA9IHRoaXMucmVzdWx0VGVtcGxhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc2V0QWN0aXZlKCk7XG5cbiAgICAgICAgLy8gVGhlIG9ic2VydmFibGUgc3RyZWFtIHdlIGFyZSBzdWJzY3JpYmluZyB0byBtaWdodCBoYXZlIGFzeW5jIHN0ZXBzXG4gICAgICAgIC8vIGFuZCBpZiBhIGNvbXBvbmVudCBjb250YWluaW5nIHR5cGVhaGVhZCBpcyB1c2luZyB0aGUgT25QdXNoIHN0cmF0ZWd5XG4gICAgICAgIC8vIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHR1cm4gd291bGRuJ3QgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb3VudCA9IHJlc3VsdHMubGVuZ3RoO1xuICAgICAgdGhpcy5fbGl2ZS5zYXkoY291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBhdmFpbGFibGUnIDogYCR7Y291bnR9IHJlc3VsdCR7Y291bnQgPT09IDEgPyAnJyA6ICdzJ30gYXZhaWxhYmxlYCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKSB7XG4gICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiSGlnaGxpZ2h0fSBmcm9tICcuL2hpZ2hsaWdodCc7XG5pbXBvcnQge05nYlR5cGVhaGVhZFdpbmRvd30gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcbmltcG9ydCB7TmdiVHlwZWFoZWFkLCBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnR9IGZyb20gJy4vdHlwZWFoZWFkJztcbmltcG9ydCB7TmdiVHlwZWFoZWFkQ29uZmlnfSBmcm9tICcuL3R5cGVhaGVhZC1jb25maWcnO1xuaW1wb3J0IHtMaXZlLCBBUklBX0xJVkVfREVMQVksIERFRkFVTFRfQVJJQV9MSVZFX0RFTEFZfSBmcm9tICcuLy4uL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlJztcblxuZXhwb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcbmV4cG9ydCB7TmdiVHlwZWFoZWFkV2luZG93fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xuZXhwb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XG5leHBvcnQge05nYlR5cGVhaGVhZCwgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50fSBmcm9tICcuL3R5cGVhaGVhZCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nYlR5cGVhaGVhZCwgTmdiSGlnaGxpZ2h0LCBOZ2JUeXBlYWhlYWRXaW5kb3ddLFxuICBleHBvcnRzOiBbTmdiVHlwZWFoZWFkLCBOZ2JIaWdobGlnaHRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiVHlwZWFoZWFkV2luZG93XVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nYlR5cGVhaGVhZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0xpdmUsIE5nYlR5cGVhaGVhZENvbmZpZywge3Byb3ZpZGU6IEFSSUFfTElWRV9ERUxBWSwgdXNlVmFsdWU6IERFRkFVTFRfQVJJQV9MSVZFX0RFTEFZfV1cbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JBY2NvcmRpb25Nb2R1bGUsIE5nYlBhbmVsQ2hhbmdlRXZlbnR9IGZyb20gJy4vYWNjb3JkaW9uL2FjY29yZGlvbi5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JBbGVydE1vZHVsZX0gZnJvbSAnLi9hbGVydC9hbGVydC5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JCdXR0b25zTW9kdWxlfSBmcm9tICcuL2J1dHRvbnMvYnV0dG9ucy5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JDYXJvdXNlbE1vZHVsZX0gZnJvbSAnLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JDb2xsYXBzZU1vZHVsZX0gZnJvbSAnLi9jb2xsYXBzZS9jb2xsYXBzZS5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTW9kdWxlfSBmcm9tICcuL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JEcm9wZG93bk1vZHVsZX0gZnJvbSAnLi9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JNb2RhbE1vZHVsZSwgTmdiTW9kYWwsIE5nYk1vZGFsT3B0aW9ucywgTmdiTW9kYWxSZWYsIE1vZGFsRGlzbWlzc1JlYXNvbnN9IGZyb20gJy4vbW9kYWwvbW9kYWwubW9kdWxlJztcbmltcG9ydCB7TmdiUGFnaW5hdGlvbk1vZHVsZX0gZnJvbSAnLi9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlJztcbmltcG9ydCB7TmdiUG9wb3Zlck1vZHVsZX0gZnJvbSAnLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJNb2R1bGV9IGZyb20gJy4vcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIubW9kdWxlJztcbmltcG9ydCB7TmdiUmF0aW5nTW9kdWxlfSBmcm9tICcuL3JhdGluZy9yYXRpbmcubW9kdWxlJztcbmltcG9ydCB7TmdiVGFic2V0TW9kdWxlLCBOZ2JUYWJDaGFuZ2VFdmVudH0gZnJvbSAnLi90YWJzZXQvdGFic2V0Lm1vZHVsZSc7XG5pbXBvcnQge05nYlRpbWVwaWNrZXJNb2R1bGV9IGZyb20gJy4vdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQge05nYlRvb2x0aXBNb2R1bGV9IGZyb20gJy4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XG5pbXBvcnQge05nYlR5cGVhaGVhZE1vZHVsZSwgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50fSBmcm9tICcuL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlJztcblxuZXhwb3J0IHtcbiAgTmdiQWNjb3JkaW9uTW9kdWxlLFxuICBOZ2JQYW5lbENoYW5nZUV2ZW50LFxuICBOZ2JBY2NvcmRpb25Db25maWcsXG4gIE5nYkFjY29yZGlvbixcbiAgTmdiUGFuZWwsXG4gIE5nYlBhbmVsVGl0bGUsXG4gIE5nYlBhbmVsQ29udGVudFxufSBmcm9tICcuL2FjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlJztcbmV4cG9ydCB7TmdiQWxlcnRNb2R1bGUsIE5nYkFsZXJ0Q29uZmlnLCBOZ2JBbGVydH0gZnJvbSAnLi9hbGVydC9hbGVydC5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JCdXR0b25zTW9kdWxlLCBOZ2JDaGVja0JveCwgTmdiUmFkaW9Hcm91cH0gZnJvbSAnLi9idXR0b25zL2J1dHRvbnMubW9kdWxlJztcbmV4cG9ydCB7TmdiQ2Fyb3VzZWxNb2R1bGUsIE5nYkNhcm91c2VsQ29uZmlnLCBOZ2JDYXJvdXNlbCwgTmdiU2xpZGV9IGZyb20gJy4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcbmV4cG9ydCB7TmdiQ29sbGFwc2VNb2R1bGUsIE5nYkNvbGxhcHNlfSBmcm9tICcuL2NvbGxhcHNlL2NvbGxhcHNlLm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JDYWxlbmRhcixcbiAgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwsXG4gIE5nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhLFxuICBOZ2JEYXRlcGlja2VyTW9kdWxlLFxuICBOZ2JEYXRlcGlja2VySTE4bixcbiAgTmdiRGF0ZXBpY2tlckNvbmZpZyxcbiAgTmdiRGF0ZVN0cnVjdCxcbiAgTmdiRGF0ZVBhcnNlckZvcm1hdHRlcixcbiAgTmdiRGF0ZUFkYXB0ZXIsXG4gIE5nYkRhdGVOYXRpdmVBZGFwdGVyLFxuICBOZ2JEYXRlcGlja2VyLFxuICBOZ2JJbnB1dERhdGVwaWNrZXIsXG4gIE5nYkRhdGVwaWNrZXJUb2dnbGVcbn0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlJztcbmV4cG9ydCB7TmdiRHJvcGRvd25Nb2R1bGUsIE5nYkRyb3Bkb3duQ29uZmlnLCBOZ2JEcm9wZG93bn0gZnJvbSAnLi9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiTW9kYWxNb2R1bGUsXG4gIE5nYk1vZGFsLFxuICBOZ2JNb2RhbE9wdGlvbnMsXG4gIE5nYkFjdGl2ZU1vZGFsLFxuICBOZ2JNb2RhbFJlZixcbiAgTW9kYWxEaXNtaXNzUmVhc29uc1xufSBmcm9tICcuL21vZGFsL21vZGFsLm1vZHVsZSc7XG5leHBvcnQge05nYlBhZ2luYXRpb25Nb2R1bGUsIE5nYlBhZ2luYXRpb25Db25maWcsIE5nYlBhZ2luYXRpb259IGZyb20gJy4vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZSc7XG5leHBvcnQge05nYlBvcG92ZXJNb2R1bGUsIE5nYlBvcG92ZXJDb25maWcsIE5nYlBvcG92ZXJ9IGZyb20gJy4vcG9wb3Zlci9wb3BvdmVyLm1vZHVsZSc7XG5leHBvcnQge05nYlByb2dyZXNzYmFyTW9kdWxlLCBOZ2JQcm9ncmVzc2JhckNvbmZpZywgTmdiUHJvZ3Jlc3NiYXJ9IGZyb20gJy4vcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIubW9kdWxlJztcbmV4cG9ydCB7TmdiUmF0aW5nTW9kdWxlLCBOZ2JSYXRpbmdDb25maWcsIE5nYlJhdGluZ30gZnJvbSAnLi9yYXRpbmcvcmF0aW5nLm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JUYWJzZXRNb2R1bGUsXG4gIE5nYlRhYkNoYW5nZUV2ZW50LFxuICBOZ2JUYWJzZXRDb25maWcsXG4gIE5nYlRhYnNldCxcbiAgTmdiVGFiLFxuICBOZ2JUYWJDb250ZW50LFxuICBOZ2JUYWJUaXRsZVxufSBmcm9tICcuL3RhYnNldC90YWJzZXQubW9kdWxlJztcbmV4cG9ydCB7XG4gIE5nYlRpbWVwaWNrZXJNb2R1bGUsXG4gIE5nYlRpbWVwaWNrZXJDb25maWcsXG4gIE5nYlRpbWVTdHJ1Y3QsXG4gIE5nYlRpbWVwaWNrZXIsXG4gIE5nYlRpbWVBZGFwdGVyXG59IGZyb20gJy4vdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZSc7XG5leHBvcnQge05nYlRvb2x0aXBNb2R1bGUsIE5nYlRvb2x0aXBDb25maWcsIE5nYlRvb2x0aXB9IGZyb20gJy4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JIaWdobGlnaHQsXG4gIE5nYlR5cGVhaGVhZE1vZHVsZSxcbiAgTmdiVHlwZWFoZWFkQ29uZmlnLFxuICBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQsXG4gIE5nYlR5cGVhaGVhZFxufSBmcm9tICcuL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlJztcblxuZXhwb3J0IHtQbGFjZW1lbnR9IGZyb20gJy4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbmNvbnN0IE5HQl9NT0RVTEVTID0gW1xuICBOZ2JBY2NvcmRpb25Nb2R1bGUsIE5nYkFsZXJ0TW9kdWxlLCBOZ2JCdXR0b25zTW9kdWxlLCBOZ2JDYXJvdXNlbE1vZHVsZSwgTmdiQ29sbGFwc2VNb2R1bGUsIE5nYkRhdGVwaWNrZXJNb2R1bGUsXG4gIE5nYkRyb3Bkb3duTW9kdWxlLCBOZ2JNb2RhbE1vZHVsZSwgTmdiUGFnaW5hdGlvbk1vZHVsZSwgTmdiUG9wb3Zlck1vZHVsZSwgTmdiUHJvZ3Jlc3NiYXJNb2R1bGUsIE5nYlJhdGluZ01vZHVsZSxcbiAgTmdiVGFic2V0TW9kdWxlLCBOZ2JUaW1lcGlja2VyTW9kdWxlLCBOZ2JUb29sdGlwTW9kdWxlLCBOZ2JUeXBlYWhlYWRNb2R1bGVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOZ2JBbGVydE1vZHVsZS5mb3JSb290KCksIE5nYkJ1dHRvbnNNb2R1bGUuZm9yUm9vdCgpLCBOZ2JDb2xsYXBzZU1vZHVsZS5mb3JSb290KCksIE5nYlByb2dyZXNzYmFyTW9kdWxlLmZvclJvb3QoKSxcbiAgICBOZ2JUb29sdGlwTW9kdWxlLmZvclJvb3QoKSwgTmdiVHlwZWFoZWFkTW9kdWxlLmZvclJvb3QoKSwgTmdiQWNjb3JkaW9uTW9kdWxlLmZvclJvb3QoKSwgTmdiQ2Fyb3VzZWxNb2R1bGUuZm9yUm9vdCgpLFxuICAgIE5nYkRhdGVwaWNrZXJNb2R1bGUuZm9yUm9vdCgpLCBOZ2JEcm9wZG93bk1vZHVsZS5mb3JSb290KCksIE5nYk1vZGFsTW9kdWxlLmZvclJvb3QoKSwgTmdiUGFnaW5hdGlvbk1vZHVsZS5mb3JSb290KCksXG4gICAgTmdiUG9wb3Zlck1vZHVsZS5mb3JSb290KCksIE5nYlByb2dyZXNzYmFyTW9kdWxlLmZvclJvb3QoKSwgTmdiUmF0aW5nTW9kdWxlLmZvclJvb3QoKSwgTmdiVGFic2V0TW9kdWxlLmZvclJvb3QoKSxcbiAgICBOZ2JUaW1lcGlja2VyTW9kdWxlLmZvclJvb3QoKSwgTmdiVG9vbHRpcE1vZHVsZS5mb3JSb290KClcbiAgXSxcbiAgZXhwb3J0czogTkdCX01PRFVMRVNcbn0pXG5leHBvcnQgY2xhc3MgTmdiUm9vdE1vZHVsZSB7XG59XG5cbkBOZ01vZHVsZSh7aW1wb3J0czogTkdCX01PRFVMRVMsIGV4cG9ydHM6IE5HQl9NT0RVTEVTfSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiUm9vdE1vZHVsZX07IH1cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRGlyZWN0aXZlIiwiVGVtcGxhdGVSZWYiLCJJbnB1dCIsIkNvbnRlbnRDaGlsZHJlbiIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJuZXh0SWQiLCJSZW5kZXJlcjIiLCJFbGVtZW50UmVmIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJnZXRMb2NhbGVEYXlOYW1lcyIsIkZvcm1TdHlsZSIsIlRyYW5zbGF0aW9uV2lkdGgiLCJnZXRMb2NhbGVNb250aE5hbWVzIiwiSW5qZWN0IiwiTE9DQUxFX0lEIiwiRGF0ZVBpcGUiLCJTdWJqZWN0IiwiZmlsdGVyIiwidGFrZSIsIkNoYW5nZURldGVjdG9yUmVmIiwiTmdab25lIiwidHNsaWJfMS5fX3ZhbHVlcyIsImZyb21FdmVudCIsInRha2VVbnRpbCIsIm1hcCIsIndpdGhMYXRlc3RGcm9tIiwiTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IiLCJOR19WQUxJREFUT1JTIiwicmFjZSIsIlZpZXdDb250YWluZXJSZWYiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJET0NVTUVOVCIsIkZvcm1zTW9kdWxlIiwiQ29udGVudENoaWxkIiwiSW5qZWN0b3IiLCJBcHBsaWNhdGlvblJlZiIsIkluamVjdGlvblRva2VuIiwiQmVoYXZpb3JTdWJqZWN0IiwidGFwIiwic3dpdGNoTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHVCQUEwQixLQUFVO1FBQ2xDLE9BQU8sUUFBUSxDQUFDLEtBQUcsS0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2pDOzs7OztBQUVELHNCQUF5QixLQUFVO1FBQ2pDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBRyxLQUFPLEdBQUcs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TSxhQUFhLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDOztJQUVwRCxJQUFNLFlBQVksR0FBRztRQUVuQixjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztRQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVB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