import { EventEmitter, Directive, ElementRef, Renderer2, ViewContainerRef, Output, ContentChild, TemplateRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class DeferredLoader {
    constructor(el, renderer, viewContainer) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.onLoad = new EventEmitter();
    }
    ngAfterViewInit() {
        if (this.shouldLoad()) {
            this.load();
        }
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                if (this.shouldLoad()) {
                    this.load();
                    this.documentScrollListener();
                    this.documentScrollListener = null;
                }
            });
        }
    }
    shouldLoad() {
        if (this.isLoaded()) {
            return false;
        }
        else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = document.documentElement;
            let winHeight = docElement.clientHeight;
            return (winHeight >= rect.top);
        }
    }
    load() {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    }
    isLoaded() {
        return this.view != null;
    }
    ngOnDestroy() {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    }
}
DeferredLoader.decorators = [
    { type: Directive, args: [{
                selector: '[pDefer]'
            },] }
];
DeferredLoader.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef }
];
DeferredLoader.propDecorators = {
    onLoad: [{ type: Output }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};
class DeferModule {
}
DeferModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [DeferredLoader],
                declarations: [DeferredLoader]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { DeferModule, DeferredLoader };
//# sourceMappingURL=primeng-defer.js.map
