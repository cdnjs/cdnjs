import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Renderer2, Input, NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';

class StyleClass {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.eventListener = this.renderer.listen(this.el.nativeElement, 'click', () => {
            this.target = this.resolveTarget();
            if (this.toggleClass) {
                if (DomHandler.hasClass(this.target, this.toggleClass))
                    DomHandler.removeClass(this.target, this.toggleClass);
                else
                    DomHandler.addClass(this.target, this.toggleClass);
            }
            else {
                if (this.target.offsetParent === null)
                    this.enter();
                else
                    this.leave();
            }
        });
    }
    enter() {
        if (this.enterActiveClass) {
            if (!this.animating) {
                this.animating = true;
                if (this.enterActiveClass === 'slidedown') {
                    this.target.style.height = '0px';
                    DomHandler.removeClass(this.target, 'hidden');
                    this.target.style.maxHeight = this.target.scrollHeight + 'px';
                    DomHandler.addClass(this.target, 'hidden');
                    this.target.style.height = '';
                }
                DomHandler.addClass(this.target, this.enterActiveClass);
                if (this.enterClass) {
                    DomHandler.removeClass(this.target, this.enterClass);
                }
                this.enterListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.enterActiveClass);
                    if (this.enterToClass) {
                        DomHandler.addClass(this.target, this.enterToClass);
                    }
                    this.enterListener();
                    if (this.enterActiveClass === 'slidedown') {
                        this.target.style.maxHeight = '';
                    }
                    this.animating = false;
                });
            }
        }
        else {
            if (this.enterClass) {
                DomHandler.removeClass(this.target, this.enterClass);
            }
            if (this.enterToClass) {
                DomHandler.addClass(this.target, this.enterToClass);
            }
        }
        if (this.hideOnOutsideClick) {
            this.bindDocumentListener();
        }
    }
    leave() {
        if (this.leaveActiveClass) {
            if (!this.animating) {
                this.animating = true;
                DomHandler.addClass(this.target, this.leaveActiveClass);
                if (this.leaveClass) {
                    DomHandler.removeClass(this.target, this.leaveClass);
                }
                this.leaveListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.leaveActiveClass);
                    if (this.leaveToClass) {
                        DomHandler.addClass(this.target, this.leaveToClass);
                    }
                    this.leaveListener();
                    this.animating = false;
                });
            }
        }
        else {
            if (this.leaveClass) {
                DomHandler.removeClass(this.target, this.leaveClass);
            }
            if (this.leaveToClass) {
                DomHandler.addClass(this.target, this.leaveToClass);
            }
        }
        if (this.hideOnOutsideClick) {
            this.unbindDocumentListener();
        }
    }
    resolveTarget() {
        if (this.target) {
            return this.target;
        }
        switch (this.selector) {
            case '@next':
                return this.el.nativeElement.nextElementSibling;
            case '@prev':
                return this.el.nativeElement.previousElementSibling;
            case '@parent':
                return this.el.nativeElement.parentElement;
            case '@grandparent':
                return this.el.nativeElement.parentElement.parentElement;
            default:
                return document.querySelector(this.selector);
        }
    }
    bindDocumentListener() {
        if (!this.documentListener) {
            this.documentListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'click', event => {
                if (getComputedStyle(this.target).getPropertyValue('position') === 'static') {
                    this.unbindDocumentListener();
                }
                else if (!this.el.nativeElement.isSameNode(event.target) && !this.el.nativeElement.contains(event.target) && !this.target.contains(event.target)) {
                    this.leave();
                }
            });
        }
    }
    unbindDocumentListener() {
        if (this.documentListener) {
            this.documentListener();
            this.documentListener = null;
        }
    }
    ngOnDestroy() {
        this.target = null;
        if (this.eventListener) {
            this.eventListener();
        }
        this.unbindDocumentListener();
    }
}
StyleClass.decorators = [
    { type: Directive, args: [{
                selector: '[pStyleClass]'
            },] }
];
StyleClass.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
StyleClass.propDecorators = {
    selector: [{ type: Input, args: ['pStyleClass',] }],
    enterClass: [{ type: Input }],
    enterActiveClass: [{ type: Input }],
    enterToClass: [{ type: Input }],
    leaveClass: [{ type: Input }],
    leaveActiveClass: [{ type: Input }],
    leaveToClass: [{ type: Input }],
    hideOnOutsideClick: [{ type: Input }],
    toggleClass: [{ type: Input }]
};
class StyleClassModule {
}
StyleClassModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [StyleClass],
                declarations: [StyleClass]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { StyleClass, StyleClassModule };
//# sourceMappingURL=primeng-styleclass.js.map
