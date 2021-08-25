import { NgModule, Directive, HostListener, Input, ViewEncapsulation, ChangeDetectionStrategy, ContentChildren, Component, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { PrimeTemplate, TranslationKeys, SharedModule } from 'primeng/api';
import { ZIndexUtils } from 'primeng/utils';
import { InputTextModule } from 'primeng/inputtext';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/inputtext";
export class PasswordDirective {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.promptLabel = 'Enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
        this.feedback = true;
    }
    set showPassword(show) {
        this.el.nativeElement.type = show ? 'text' : 'password';
    }
    ngDoCheck() {
        this.updateFilledState();
    }
    onInput(e) {
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }
    createPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'p-password-panel p-component p-password-panel-overlay p-connected-overlay';
        this.meter = document.createElement('div');
        this.meter.className = 'p-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'p-password-info';
        this.info.textContent = this.promptLabel;
        this.panel.appendChild(this.meter);
        this.panel.appendChild(this.info);
        this.panel.style.minWidth = DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
        document.body.appendChild(this.panel);
    }
    showOverlay() {
        if (this.feedback) {
            if (!this.panel) {
                this.createPanel();
            }
            this.panel.style.zIndex = String(++DomHandler.zindex);
            this.panel.style.display = 'block';
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    DomHandler.addClass(this.panel, 'p-connected-overlay-visible');
                    this.bindScrollListener();
                    this.bindDocumentResizeListener();
                }, 1);
            });
            DomHandler.absolutePosition(this.panel, this.el.nativeElement);
        }
    }
    hideOverlay() {
        if (this.feedback && this.panel) {
            DomHandler.addClass(this.panel, 'p-connected-overlay-hidden');
            DomHandler.removeClass(this.panel, 'p-connected-overlay-visible');
            this.unbindScrollListener();
            this.unbindDocumentResizeListener();
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.ngOnDestroy();
                }, 150);
            });
        }
    }
    onFocus() {
        this.showOverlay();
    }
    onBlur() {
        this.hideOverlay();
    }
    onKeyup(e) {
        if (this.feedback) {
            let value = e.target.value, label = null, meterPos = null;
            if (value.length === 0) {
                label = this.promptLabel;
                meterPos = '0px 0px';
            }
            else {
                var score = this.testStrength(value);
                if (score < 30) {
                    label = this.weakLabel;
                    meterPos = '0px -10px';
                }
                else if (score >= 30 && score < 80) {
                    label = this.mediumLabel;
                    meterPos = '0px -20px';
                }
                else if (score >= 80) {
                    label = this.strongLabel;
                    meterPos = '0px -30px';
                }
            }
            if (!this.panel || !DomHandler.hasClass(this.panel, 'p-connected-overlay-visible')) {
                this.showOverlay();
            }
            this.meter.style.backgroundPosition = meterPos;
            this.info.textContent = label;
        }
    }
    testStrength(str) {
        let grade = 0;
        let val;
        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
        grade *= str.length / 8;
        return grade > 100 ? 100 : grade;
    }
    normalize(x, y) {
        let diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    }
    get disabled() {
        return this.el.nativeElement.disabled;
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
                if (DomHandler.hasClass(this.panel, 'p-connected-overlay-visible')) {
                    this.hideOverlay();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    onWindowResize() {
        this.hideOverlay();
    }
    ngOnDestroy() {
        if (this.panel) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            this.unbindDocumentResizeListener();
            document.body.removeChild(this.panel);
            this.panel = null;
            this.meter = null;
            this.info = null;
        }
    }
}
PasswordDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PasswordDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
PasswordDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: PasswordDirective, selector: "[pPassword]", inputs: { promptLabel: "promptLabel", weakLabel: "weakLabel", mediumLabel: "mediumLabel", strongLabel: "strongLabel", feedback: "feedback", showPassword: "showPassword" }, host: { listeners: { "input": "onInput($event)", "focus": "onFocus()", "blur": "onBlur()", "keyup": "onKeyup($event)" }, properties: { "class.p-inputtext": "true", "class.p-component": "true", "class.p-filled": "filled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PasswordDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pPassword]',
                    host: {
                        '[class.p-inputtext]': 'true',
                        '[class.p-component]': 'true',
                        '[class.p-filled]': 'filled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { promptLabel: [{
                type: Input
            }], weakLabel: [{
                type: Input
            }], mediumLabel: [{
                type: Input
            }], strongLabel: [{
                type: Input
            }], feedback: [{
                type: Input
            }], showPassword: [{
                type: Input
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onKeyup: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }] } });
export const Password_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Password),
    multi: true
};
export class Password {
    constructor(cd, config, el, overlayService) {
        this.cd = cd;
        this.config = config;
        this.el = el;
        this.overlayService = overlayService;
        this.mediumRegex = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
        this.strongRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';
        this.feedback = true;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.overlayVisible = false;
        this.focused = false;
        this.unmasked = false;
        this.value = null;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        this.infoText = this.promptText();
        this.mediumCheckRegExp = new RegExp(this.mediumRegex);
        this.strongCheckRegExp = new RegExp(this.strongRegex);
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.updateUI(this.value || "");
        });
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                this.appendContainer();
                this.alignOverlay();
                this.bindScrollListener();
                this.bindResizeListener();
                break;
            case 'void':
                this.unbindScrollListener();
                this.unbindResizeListener();
                this.overlay = null;
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                document.getElementById(this.appendTo).appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.appendTo) {
            this.overlay.style.minWidth = DomHandler.getOuterWidth(this.input.nativeElement) + 'px';
            DomHandler.absolutePosition(this.overlay, this.input.nativeElement);
        }
        else {
            DomHandler.relativePosition(this.overlay, this.input.nativeElement);
        }
    }
    onInput(event) {
        this.value = event.target.value;
        this.onModelChange(this.value);
        this.onModelTouched();
    }
    onFocus() {
        this.focused = true;
        if (this.feedback) {
            this.overlayVisible = true;
        }
    }
    onBlur() {
        this.focused = false;
        if (this.feedback) {
            this.overlayVisible = false;
        }
    }
    onKeyUp(event) {
        if (this.feedback) {
            let value = event.target.value;
            this.updateUI(value);
            if (!this.overlayVisible) {
                this.overlayVisible = true;
            }
        }
    }
    updateUI(value) {
        let label = null;
        let meter = null;
        switch (this.testStrength(value)) {
            case 1:
                label = this.weakText();
                meter = {
                    strength: 'weak',
                    width: '33.33%'
                };
                break;
            case 2:
                label = this.mediumText();
                meter = {
                    strength: 'medium',
                    width: '66.66%'
                };
                break;
            case 3:
                label = this.strongText();
                meter = {
                    strength: 'strong',
                    width: '100%'
                };
                break;
            default:
                label = this.promptText();
                meter = null;
                break;
        }
        this.meter = meter;
        this.infoText = label;
    }
    onMaskToggle() {
        this.unmasked = !this.unmasked;
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    testStrength(str) {
        let level = 0;
        if (this.strongCheckRegExp.test(str))
            level = 3;
        else if (this.mediumCheckRegExp.test(str))
            level = 2;
        else if (str.length)
            level = 1;
        return level;
    }
    writeValue(value) {
        if (value === undefined)
            this.value = null;
        else
            this.value = value;
        if (this.feedback)
            this.updateUI(this.value || "");
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.input.nativeElement, () => {
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    bindResizeListener() {
        if (!this.resizeListener) {
            this.resizeListener = () => {
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                }
            };
            window.addEventListener('resize', this.resizeListener);
        }
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    unbindResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }
    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }
    containerClass() {
        return { 'p-password p-component p-inputwrapper': true,
            'p-input-icon-right': this.toggleMask
        };
    }
    inputFieldClass() {
        return { 'p-password-input': true,
            'p-disabled': this.disabled
        };
    }
    toggleIconClass() {
        return this.unmasked ? 'pi pi-eye-slash' : 'pi pi-eye';
    }
    strengthClass() {
        return `p-password-strength ${this.meter ? this.meter.strength : ''}`;
    }
    filled() {
        return (this.value != null && this.value.toString().length > 0);
    }
    promptText() {
        return this.promptLabel || this.getTranslation(TranslationKeys.PASSWORD_PROMPT);
    }
    weakText() {
        return this.weakLabel || this.getTranslation(TranslationKeys.WEAK);
    }
    mediumText() {
        return this.mediumLabel || this.getTranslation(TranslationKeys.MEDIUM);
    }
    strongText() {
        return this.strongLabel || this.getTranslation(TranslationKeys.STRONG);
    }
    restoreAppend() {
        if (this.overlay && this.appendTo) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.overlay);
            else
                document.getElementById(this.appendTo).removeChild(this.overlay);
        }
    }
    inputType() {
        return this.unmasked ? 'text' : 'password';
    }
    getTranslation(option) {
        return this.config.getTranslation(option);
    }
    ngOnDestroy() {
        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
        this.restoreAppend();
        this.unbindResizeListener();
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
}
Password.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Password, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }, { token: i0.ElementRef }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
Password.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Password, selector: "p-password", inputs: { disabled: "disabled", promptLabel: "promptLabel", mediumRegex: "mediumRegex", strongRegex: "strongRegex", weakLabel: "weakLabel", mediumLabel: "mediumLabel", strongLabel: "strongLabel", inputId: "inputId", feedback: "feedback", appendTo: "appendTo", toggleMask: "toggleMask", inputStyleClass: "inputStyleClass", styleClass: "styleClass", style: "style", inputStyle: "inputStyle", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", placeholder: "placeholder" }, host: { properties: { "class.p-inputwrapper-filled": "filled()", "class.p-inputwrapper-focus": "focused" } }, providers: [Password_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="containerClass()" [ngStyle]="style" [class]="styleClass">
            <input #input [attr.id]="inputId" pInputText [ngClass]="inputFieldClass()" [ngStyle]="inputStyle" [class]="inputStyleClass" [attr.type]="inputType()" [attr.placeholder]="placeholder" [value]="value" (input)="onInput($event)" (focus)="onFocus()"
                (blur)="onBlur()" (keyup)="onKeyUp($event)" />
            <i *ngIf="toggleMask" [ngClass]="toggleIconClass()" (click)="onMaskToggle()"></i>
            <div #overlay *ngIf="overlayVisible" [ngClass]="'p-password-panel p-component'" (click)="onOverlayClick($event)"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onAnimationStart($event)" (@overlayAnimation.done)="onAnimationEnd($event)">
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="contentTemplate; else content">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </ng-container>
                <ng-template #content>
                    <div class="p-password-meter">
                        <div [ngClass]="strengthClass()" [ngStyle]="{'width': meter ? meter.width : ''}"></div>
                    </div>
                    <div className="p-password-info">{{infoText}}</div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-password{position:relative;display:inline-flex}.p-password-panel{position:absolute;top:0;left:0}.p-password .p-password-panel{min-width:100%}.p-password-meter{height:10px}.p-password-strength{height:100%;width:0;transition:width 1s ease-in-out}.p-fluid .p-password{display:flex}"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.InputText, selector: "[pInputText]" }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('{{showTransitionParams}}')
            ]),
            transition(':leave', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Password, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-password',
                    template: `
        <div [ngClass]="containerClass()" [ngStyle]="style" [class]="styleClass">
            <input #input [attr.id]="inputId" pInputText [ngClass]="inputFieldClass()" [ngStyle]="inputStyle" [class]="inputStyleClass" [attr.type]="inputType()" [attr.placeholder]="placeholder" [value]="value" (input)="onInput($event)" (focus)="onFocus()"
                (blur)="onBlur()" (keyup)="onKeyUp($event)" />
            <i *ngIf="toggleMask" [ngClass]="toggleIconClass()" (click)="onMaskToggle()"></i>
            <div #overlay *ngIf="overlayVisible" [ngClass]="'p-password-panel p-component'" (click)="onOverlayClick($event)"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onAnimationStart($event)" (@overlayAnimation.done)="onAnimationEnd($event)">
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="contentTemplate; else content">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </ng-container>
                <ng-template #content>
                    <div class="p-password-meter">
                        <div [ngClass]="strengthClass()" [ngStyle]="{'width': meter ? meter.width : ''}"></div>
                    </div>
                    <div className="p-password-info">{{infoText}}</div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
                    animations: [
                        trigger('overlayAnimation', [
                            transition(':enter', [
                                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition(':leave', [
                                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled()',
                        '[class.p-inputwrapper-focus]': 'focused'
                    },
                    providers: [Password_VALUE_ACCESSOR],
                    styleUrls: ['./password.css'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }, { type: i0.ElementRef }, { type: i1.OverlayService }]; }, propDecorators: { disabled: [{
                type: Input
            }], promptLabel: [{
                type: Input
            }], mediumRegex: [{
                type: Input
            }], strongRegex: [{
                type: Input
            }], weakLabel: [{
                type: Input
            }], mediumLabel: [{
                type: Input
            }], strongLabel: [{
                type: Input
            }], inputId: [{
                type: Input
            }], feedback: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], toggleMask: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], input: [{
                type: ViewChild,
                args: ['input']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class PasswordModule {
}
PasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PasswordModule, declarations: [PasswordDirective, Password], imports: [CommonModule, InputTextModule], exports: [PasswordDirective, Password, SharedModule] });
PasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PasswordModule, imports: [[CommonModule, InputTextModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule],
                    exports: [PasswordDirective, Password, SharedModule],
                    declarations: [PasswordDirective, Password]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcGFzc3dvcmQvcGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQVksWUFBWSxFQUFDLEtBQUssRUFBbUMsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUEwQixTQUFTLEVBQW9CLFNBQVMsRUFBcUIsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVRLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBRSw2QkFBNkIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN0RSxPQUFPLEVBQWdDLGFBQWEsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hHLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQVdsRCxNQUFNLE9BQU8saUJBQWlCO0lBNEIxQixZQUFtQixFQUFjLEVBQVMsSUFBWTtRQUFuQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQTFCN0MsZ0JBQVcsR0FBVyxrQkFBa0IsQ0FBQztRQUV6QyxjQUFTLEdBQVcsTUFBTSxDQUFDO1FBRTNCLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBRS9CLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBRS9CLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFrQnVCLENBQUM7SUFoQjFELElBQWEs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QixRQUFRLGFBNFlQLFlBQVksRUFBRSxlQUFlLGFBN3BCOUIsaUJBQWlCLEVBaVJqQixRQUFRLEVBNllzQixZQUFZOzRHQUcxQyxjQUFjLFlBSmQsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEVBQ0QsWUFBWTsyRkFHMUMsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO29CQUNwRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUM7aUJBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsRWxlbWVudFJlZixIb3N0TGlzdGVuZXIsSW5wdXQsT25EZXN0cm95LERvQ2hlY2ssTmdab25lLCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBDb21wb25lbnQsIEFmdGVyQ29udGVudEluaXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge2FuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7T3ZlcmxheVNlcnZpY2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFRyYW5zbGF0aW9uS2V5cywgU2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1pJbmRleFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7SW5wdXRUZXh0TW9kdWxlfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFBhc3N3b3JkXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnAtaW5wdXR0ZXh0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy5wLWNvbXBvbmVudF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MucC1maWxsZWRdJzogJ2ZpbGxlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LERvQ2hlY2sge1xuXG4gICAgQElucHV0KCkgcHJvbXB0TGFiZWw6IHN0cmluZyA9ICdFbnRlciBhIHBhc3N3b3JkJztcblxuICAgIEBJbnB1dCgpIHdlYWtMYWJlbDogc3RyaW5nID0gJ1dlYWsnO1xuXG4gICAgQElucHV0KCkgbWVkaXVtTGFiZWw6IHN0cmluZyA9ICdNZWRpdW0nO1xuXG4gICAgQElucHV0KCkgc3Ryb25nTGFiZWw6IHN0cmluZyA9ICdTdHJvbmcnO1xuXG4gICAgQElucHV0KCkgZmVlZGJhY2s6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHNob3dQYXNzd29yZChzaG93OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC50eXBlID0gc2hvdyA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gICAgfVxuXG4gICAgcGFuZWw6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgbWV0ZXI6IGFueTtcblxuICAgIGluZm86IGFueTtcblxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIHNjcm9sbEhhbmRsZXI6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgICBvbklucHV0KGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhbmVsKCkge1xuICAgICAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gJ3AtcGFzc3dvcmQtcGFuZWwgcC1jb21wb25lbnQgcC1wYXNzd29yZC1wYW5lbC1vdmVybGF5IHAtY29ubmVjdGVkLW92ZXJsYXknO1xuICAgICAgICB0aGlzLm1ldGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMubWV0ZXIuY2xhc3NOYW1lID0gJ3AtcGFzc3dvcmQtbWV0ZXInO1xuICAgICAgICB0aGlzLmluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5pbmZvLmNsYXNzTmFtZSA9ICdwLXBhc3N3b3JkLWluZm8nO1xuICAgICAgICB0aGlzLmluZm8udGV4dENvbnRlbnQgPSB0aGlzLnByb21wdExhYmVsO1xuICAgICAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMubWV0ZXIpO1xuICAgICAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuaW5mbyk7XG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUubWluV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50KSArICdweCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgfVxuXG4gICAgc2hvd092ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmZlZWRiYWNrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBhbmVsKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUuekluZGV4ID0gU3RyaW5nKCsrRG9tSGFuZGxlci56aW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnBhbmVsLCAncC1jb25uZWN0ZWQtb3ZlcmxheS12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMucGFuZWwsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmVlZGJhY2sgJiYgdGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnBhbmVsLCAncC1jb25uZWN0ZWQtb3ZlcmxheS1oaWRkZW4nKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5wYW5lbCwgJ3AtY29ubmVjdGVkLW92ZXJsYXktdmlzaWJsZScpO1xuICAgICAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9LCAxNTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSlcbiAgICBvbktleXVwKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZmVlZGJhY2spIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgbGFiZWwgPSBudWxsLFxuICAgICAgICAgICAgbWV0ZXJQb3MgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnByb21wdExhYmVsO1xuICAgICAgICAgICAgICAgIG1ldGVyUG9zID0gJzBweCAwcHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gdGhpcy50ZXN0U3RyZW5ndGgodmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlIDwgMzApIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLndlYWtMYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0xMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NvcmUgPj0gMzAgJiYgc2NvcmUgPCA4MCkge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMubWVkaXVtTGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIG1ldGVyUG9zID0gJzBweCAtMjBweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3JlID49IDgwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5zdHJvbmdMYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0zMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wYW5lbCB8fCAhRG9tSGFuZGxlci5oYXNDbGFzcyh0aGlzLnBhbmVsLCAncC1jb25uZWN0ZWQtb3ZlcmxheS12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWV0ZXIuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gbWV0ZXJQb3M7XG4gICAgICAgICAgICB0aGlzLmluZm8udGV4dENvbnRlbnQgPSBsYWJlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRlc3RTdHJlbmd0aChzdHI6IHN0cmluZykge1xuICAgICAgICBsZXQgZ3JhZGU6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCB2YWw6IFJlZ0V4cE1hdGNoQXJyYXk7XG5cbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbMC05XScpO1xuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS80LCAxKSAqIDI1O1xuXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnW2EtekEtWl0nKTtcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvMiwgMykgKiAxMDtcblxuICAgICAgICB2YWwgPSBzdHIubWF0Y2goJ1shQCMkJV4mKj9ffi4sOz1dJyk7XG4gICAgICAgIGdyYWRlICs9IHRoaXMubm9ybWFsaXplKHZhbCA/IHZhbC5sZW5ndGggOiAxLzYsIDEpICogMzU7XG5cbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbQS1aXScpO1xuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS82LCAxKSAqIDMwO1xuXG4gICAgICAgIGdyYWRlICo9IHN0ci5sZW5ndGggLyA4O1xuXG4gICAgICAgIHJldHVybiBncmFkZSA+IDEwMCA/IDEwMCA6IGdyYWRlO1xuICAgIH1cblxuICAgIG5vcm1hbGl6ZSh4LCB5KSB7XG4gICAgICAgIGxldCBkaWZmID0geCAtIHk7XG5cbiAgICAgICAgaWYgKGRpZmYgPD0gMClcbiAgICAgICAgICAgIHJldHVybiB4IC8geTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIDEgKyAwLjUgKiAoeCAvICh4ICsgeS80KSk7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRpc2FibGVkO1xuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyh0aGlzLnBhbmVsLCAncC1jb25uZWN0ZWQtb3ZlcmxheS12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBhbmVsKTtcbiAgICAgICAgICAgIHRoaXMucGFuZWwgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5tZXRlciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmluZm8gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBQYXNzd29yZF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBhc3N3b3JkKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYXNzd29yZCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGlucHV0ICNpbnB1dCBbYXR0ci5pZF09XCJpbnB1dElkXCIgcElucHV0VGV4dCBbbmdDbGFzc109XCJpbnB1dEZpZWxkQ2xhc3MoKVwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIiBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCIgW2F0dHIudHlwZV09XCJpbnB1dFR5cGUoKVwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW3ZhbHVlXT1cInZhbHVlXCIgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAgICAgICAgICAgICAgIChibHVyKT1cIm9uQmx1cigpXCIgKGtleXVwKT1cIm9uS2V5VXAoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICA8aSAqbmdJZj1cInRvZ2dsZU1hc2tcIiBbbmdDbGFzc109XCJ0b2dnbGVJY29uQ2xhc3MoKVwiIChjbGljayk9XCJvbk1hc2tUb2dnbGUoKVwiPjwvaT5cbiAgICAgICAgICAgIDxkaXYgI292ZXJsYXkgKm5nSWY9XCJvdmVybGF5VmlzaWJsZVwiIFtuZ0NsYXNzXT1cIidwLXBhc3N3b3JkLXBhbmVsIHAtY29tcG9uZW50J1wiIChjbGljayk9XCJvbk92ZXJsYXlDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbQG92ZXJsYXlBbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZTsgZWxzZSBjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhc3N3b3JkLW1ldGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInN0cmVuZ3RoQ2xhc3MoKVwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBtZXRlciA/IG1ldGVyLndpZHRoIDogJyd9XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtcGFzc3dvcmQtaW5mb1wiPnt7aW5mb1RleHR9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkKCknLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1c2VkJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbUGFzc3dvcmRfVkFMVUVfQUNDRVNTT1JdLFxuICAgIHN0eWxlVXJsczogWycuL3Bhc3N3b3JkLmNzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgUGFzc3dvcmQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHByb21wdExhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtZWRpdW1SZWdleDogc3RyaW5nID0gJ14oKCg/PS4qW2Etel0pKD89LipbQS1aXSkpfCgoPz0uKlthLXpdKSg/PS4qWzAtOV0pKXwoKD89LipbQS1aXSkoPz0uKlswLTldKSkpKD89Lns2LH0pJztcblxuICAgIEBJbnB1dCgpIHN0cm9uZ1JlZ2V4OiBzdHJpbmcgPSAnXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlswLTldKSg/PS57OCx9KSc7XG5cbiAgICBASW5wdXQoKSB3ZWFrTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1lZGl1bUxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHJvbmdMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmVlZGJhY2s6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIHRvZ2dsZU1hc2s6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgb3ZlcmxheVZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG1ldGVyOiBhbnk7XG5cbiAgICBpbmZvVGV4dDogc3RyaW5nO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdW5tYXNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG1lZGl1bUNoZWNrUmVnRXhwOiBhbnk7XG5cbiAgICBzdHJvbmdDaGVja1JlZ0V4cDogYW55O1xuXG4gICAgcmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIG91dHNpZGVDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG5cbiAgICBvdmVybGF5OiBhbnk7XG5cbiAgICB2YWx1ZTogc3RyaW5nID0gbnVsbDtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSkge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluZm9UZXh0ID0gdGhpcy5wcm9tcHRUZXh0KCk7XG4gICAgICAgIHRoaXMubWVkaXVtQ2hlY2tSZWdFeHAgPSBuZXcgUmVnRXhwKHRoaXMubWVkaXVtUmVnZXgpO1xuICAgICAgICB0aGlzLnN0cm9uZ0NoZWNrUmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLnN0cm9uZ1JlZ2V4KTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uT2JzZXJ2ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUkodGhpcy52YWx1ZSB8fCBcIlwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ292ZXJsYXknLCB0aGlzLm92ZXJsYXksIHRoaXMuY29uZmlnLnpJbmRleC5vdmVybGF5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25FbmQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKGV2ZW50LmVsZW1lbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmFwcGVuZFRvKS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ25PdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm1pbldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCkgKyAncHgnO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbih0aGlzLm92ZXJsYXksIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0KGV2ZW50KSAge1xuICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVSSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVUkodmFsdWUpIHtcbiAgICAgICAgbGV0IGxhYmVsID0gbnVsbDtcbiAgICAgICAgbGV0IG1ldGVyID0gbnVsbDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMudGVzdFN0cmVuZ3RoKHZhbHVlKSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy53ZWFrVGV4dCgpO1xuICAgICAgICAgICAgICAgIG1ldGVyID0ge1xuICAgICAgICAgICAgICAgICAgICBzdHJlbmd0aDogJ3dlYWsnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzMzLjMzJSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLm1lZGl1bVRleHQoKTtcbiAgICAgICAgICAgICAgICBtZXRlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RyZW5ndGg6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzY2LjY2JSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnN0cm9uZ1RleHQoKTtcbiAgICAgICAgICAgICAgICBtZXRlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RyZW5ndGg6ICdzdHJvbmcnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMucHJvbXB0VGV4dCgpO1xuICAgICAgICAgICAgICAgIG1ldGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWV0ZXIgPSBtZXRlcjtcbiAgICAgICAgdGhpcy5pbmZvVGV4dCA9IGxhYmVsO1xuICAgIH1cblxuICAgIG9uTWFza1RvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy51bm1hc2tlZCA9ICF0aGlzLnVubWFza2VkO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVNlcnZpY2UuYWRkKHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGVzdFN0cmVuZ3RoKHN0cikge1xuICAgICAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLnN0cm9uZ0NoZWNrUmVnRXhwLnRlc3Qoc3RyKSlcbiAgICAgICAgICAgIGxldmVsID0gMztcbiAgICAgICAgZWxzZSBpZiAodGhpcy5tZWRpdW1DaGVja1JlZ0V4cC50ZXN0KHN0cikpXG4gICAgICAgICAgICBsZXZlbCA9IDI7XG4gICAgICAgIGVsc2UgaWYgKHN0ci5sZW5ndGgpXG4gICAgICAgICAgICBsZXZlbCA9IDE7XG5cbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZWRiYWNrKVxuICAgICAgICAgICAgdGhpcy51cGRhdGVVSSh0aGlzLnZhbHVlIHx8IFwiXCIpO1xuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgYmluZFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHsncC1wYXNzd29yZCBwLWNvbXBvbmVudCBwLWlucHV0d3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAncC1pbnB1dC1pY29uLXJpZ2h0JzogdGhpcy50b2dnbGVNYXNrXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaW5wdXRGaWVsZENsYXNzKCkge1xuICAgICAgICByZXR1cm4geydwLXBhc3N3b3JkLWlucHV0JyA6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdG9nZ2xlSWNvbkNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51bm1hc2tlZCA/ICdwaSBwaS1leWUtc2xhc2gnIDogJ3BpIHBpLWV5ZSc7XG4gICAgfVxuXG4gICAgc3RyZW5ndGhDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIGBwLXBhc3N3b3JkLXN0cmVuZ3RoICR7dGhpcy5tZXRlciA/IHRoaXMubWV0ZXIuc3RyZW5ndGggOiAnJ31gO1xuICAgIH1cblxuICAgIGZpbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnZhbHVlICE9IG51bGwgJiYgdGhpcy52YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IDApXG4gICAgfVxuXG4gICAgcHJvbXB0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0TGFiZWwgfHwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuUEFTU1dPUkRfUFJPTVBUKTtcbiAgICB9XG5cbiAgICB3ZWFrVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vha0xhYmVsIHx8IHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLldFQUspO1xuICAgIH1cblxuICAgIG1lZGl1bVRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGl1bUxhYmVsIHx8IHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1FRElVTSk7XG4gICAgfVxuXG4gICAgc3Ryb25nVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Ryb25nTGFiZWwgfHwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuU1RST05HKTtcbiAgICB9XG5cbiAgICByZXN0b3JlQXBwZW5kKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5ICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYXBwZW5kVG8pLnJlbW92ZUNoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dFR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVubWFza2VkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJztcbiAgICB9XG5cbiAgICBnZXRUcmFuc2xhdGlvbihvcHRpb246IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24ob3B0aW9uKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc3RvcmVBcHBlbmQoKTtcbiAgICAgICAgdGhpcy51bmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJbnB1dFRleHRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQYXNzd29yZERpcmVjdGl2ZSwgUGFzc3dvcmQsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGFzc3dvcmREaXJlY3RpdmUsIFBhc3N3b3JkXVxufSlcbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1vZHVsZSB7IH1cbiJdfQ==