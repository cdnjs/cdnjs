import { NgModule, Directive, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
export class Tooltip {
    constructor(el, zone, config) {
        this.el = el;
        this.zone = zone;
        this.config = config;
        this.escape = true;
        this._tooltipOptions = {
            tooltipPosition: 'right',
            tooltipEvent: 'hover',
            appendTo: 'body',
            tooltipZIndex: 'auto',
            escape: false,
            positionTop: 0,
            positionLeft: 0
        };
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
        this.deactivate();
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            if (this.getOption('tooltipEvent') === 'hover') {
                this.mouseEnterListener = this.onMouseEnter.bind(this);
                this.mouseLeaveListener = this.onMouseLeave.bind(this);
                this.clickListener = this.onClick.bind(this);
                this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener);
                this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
                this.el.nativeElement.addEventListener('click', this.clickListener);
            }
            else if (this.getOption('tooltipEvent') === 'focus') {
                this.focusListener = this.onFocus.bind(this);
                this.blurListener = this.onBlur.bind(this);
                this.el.nativeElement.addEventListener('focus', this.focusListener);
                this.el.nativeElement.addEventListener('blur', this.blurListener);
            }
        });
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.tooltipPosition) {
            this.setOption({ tooltipPosition: simpleChange.tooltipPosition.currentValue });
        }
        if (simpleChange.tooltipEvent) {
            this.setOption({ tooltipEvent: simpleChange.tooltipEvent.currentValue });
        }
        if (simpleChange.appendTo) {
            this.setOption({ appendTo: simpleChange.appendTo.currentValue });
        }
        if (simpleChange.positionStyle) {
            this.setOption({ positionStyle: simpleChange.positionStyle.currentValue });
        }
        if (simpleChange.tooltipStyleClass) {
            this.setOption({ tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue });
        }
        if (simpleChange.tooltipZIndex) {
            this.setOption({ tooltipZIndex: simpleChange.tooltipZIndex.currentValue });
        }
        if (simpleChange.escape) {
            this.setOption({ escape: simpleChange.escape.currentValue });
        }
        if (simpleChange.showDelay) {
            this.setOption({ showDelay: simpleChange.showDelay.currentValue });
        }
        if (simpleChange.hideDelay) {
            this.setOption({ showDelay: simpleChange.hideDelay.currentValue });
        }
        if (simpleChange.life) {
            this.setOption({ life: simpleChange.life.currentValue });
        }
        if (simpleChange.positionTop) {
            this.setOption({ positionTop: simpleChange.positionTop.currentValue });
        }
        if (simpleChange.positionLeft) {
            this.setOption({ positionLeft: simpleChange.positionLeft.currentValue });
        }
        if (simpleChange.disabled) {
            this.setOption({ disabled: simpleChange.disabled.currentValue });
        }
        if (simpleChange.text) {
            this.setOption({ tooltipLabel: simpleChange.text.currentValue });
        }
        if (simpleChange.tooltipOptions) {
            this._tooltipOptions = Object.assign(Object.assign({}, this._tooltipOptions), simpleChange.tooltipOptions.currentValue);
            this.deactivate();
            if (this.active) {
                if (this.getOption('tooltipLabel')) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        }
    }
    onMouseEnter(e) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    }
    onMouseLeave(e) {
        this.deactivate();
    }
    onFocus(e) {
        this.activate();
    }
    onBlur(e) {
        this.deactivate();
    }
    onClick(e) {
        this.deactivate();
    }
    activate() {
        this.active = true;
        this.clearHideTimeout();
        if (this.getOption('showDelay'))
            this.showTimeout = setTimeout(() => { this.show(); }, this.getOption('showDelay'));
        else
            this.show();
        if (this.getOption('life')) {
            let duration = this.getOption('showDelay') ? this.getOption('life') + this.getOption('showDelay') : this.getOption('life');
            this.hideTimeout = setTimeout(() => { this.hide(); }, duration);
        }
    }
    deactivate() {
        this.active = false;
        this.clearShowTimeout();
        if (this.getOption('hideDelay')) {
            this.clearHideTimeout(); //life timeout
            this.hideTimeout = setTimeout(() => { this.hide(); }, this.getOption('hideDelay'));
        }
        else {
            this.hide();
        }
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
        if (this.active) {
            if (this._text) {
                if (this.container && this.container.offsetParent) {
                    this.updateText();
                    this.align();
                }
                else {
                    this.show();
                }
            }
            else {
                this.hide();
            }
        }
    }
    create() {
        if (this.container) {
            this.clearHideTimeout();
            this.remove();
        }
        this.container = document.createElement('div');
        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'p-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'p-tooltip-text';
        this.updateText();
        if (this.getOption('positionStyle')) {
            this.container.style.position = this.getOption('positionStyle');
        }
        this.container.appendChild(this.tooltipText);
        if (this.getOption('appendTo') === 'body')
            document.body.appendChild(this.container);
        else if (this.getOption('appendTo') === 'target')
            DomHandler.appendChild(this.container, this.el.nativeElement);
        else
            DomHandler.appendChild(this.container, this.getOption('appendTo'));
        this.container.style.display = 'inline-block';
    }
    show() {
        if (!this.getOption('tooltipLabel') || this.getOption('disabled')) {
            return;
        }
        this.create();
        this.align();
        DomHandler.fadeIn(this.container, 250);
        if (this.getOption('tooltipZIndex') === 'auto')
            ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip);
        else
            this.container.style.zIndex = this.getOption('tooltipZIndex');
        this.bindDocumentResizeListener();
        this.bindScrollListener();
    }
    hide() {
        if (this.getOption('tooltipZIndex') === 'auto') {
            ZIndexUtils.clear(this.container);
        }
        this.remove();
    }
    updateText() {
        if (this.getOption('escape')) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(this.getOption('tooltipLabel')));
        }
        else {
            this.tooltipText.innerHTML = this.getOption('tooltipLabel');
        }
    }
    align() {
        let position = this.getOption('tooltipPosition');
        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    }
    getHostOffset() {
        if (this.getOption('appendTo') === 'body' || this.getOption('appendTo') === 'target') {
            let offset = this.el.nativeElement.getBoundingClientRect();
            let targetLeft = offset.left + DomHandler.getWindowScrollLeft();
            let targetTop = offset.top + DomHandler.getWindowScrollTop();
            return { left: targetLeft, top: targetTop };
        }
        else {
            return { left: 0, top: 0 };
        }
    }
    alignRight() {
        this.preAlign('right');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignLeft() {
        this.preAlign('left');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left - DomHandler.getOuterWidth(this.container);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignTop() {
        this.preAlign('top');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top - DomHandler.getOuterHeight(this.container);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignBottom() {
        this.preAlign('bottom');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    setOption(option) {
        this._tooltipOptions = Object.assign(Object.assign({}, this._tooltipOptions), option);
    }
    getOption(option) {
        return this._tooltipOptions[option];
    }
    preAlign(position) {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
        let defaultClassName = 'p-tooltip p-component p-tooltip-' + position;
        this.container.className = this.getOption('tooltipStyleClass') ? defaultClassName + ' ' + this.getOption('tooltipStyleClass') : defaultClassName;
    }
    isOutOfBounds() {
        let offset = this.container.getBoundingClientRect();
        let targetTop = offset.top;
        let targetLeft = offset.left;
        let width = DomHandler.getOuterWidth(this.container);
        let height = DomHandler.getOuterHeight(this.container);
        let viewport = DomHandler.getViewport();
        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
    }
    onWindowResize(e) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.zone.runOutsideAngular(() => {
            this.resizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.resizeListener);
        });
    }
    unbindDocumentResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
                if (this.container) {
                    this.hide();
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
    unbindEvents() {
        if (this.getOption('tooltipEvent') === 'hover') {
            this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
            this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
            this.el.nativeElement.removeEventListener('click', this.clickListener);
        }
        else if (this.getOption('tooltipEvent') === 'focus') {
            this.el.nativeElement.removeEventListener('focus', this.focusListener);
            this.el.nativeElement.removeEventListener('blur', this.blurListener);
        }
        this.unbindDocumentResizeListener();
    }
    remove() {
        if (this.container && this.container.parentElement) {
            if (this.getOption('appendTo') === 'body')
                document.body.removeChild(this.container);
            else if (this.getOption('appendTo') === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                DomHandler.removeChild(this.container, this.getOption('appendTo'));
        }
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.clearTimeouts();
        this.container = null;
        this.scrollHandler = null;
    }
    clearShowTimeout() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }
    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
    clearTimeouts() {
        this.clearShowTimeout();
        this.clearHideTimeout();
    }
    ngOnDestroy() {
        this.unbindEvents();
        if (this.container) {
            ZIndexUtils.clear(this.container);
        }
        this.remove();
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }
}
Tooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Tooltip, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Directive });
Tooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: Tooltip, selector: "[pTooltip]", inputs: { tooltipPosition: "tooltipPosition", tooltipEvent: "tooltipEvent", appendTo: "appendTo", positionStyle: "positionStyle", tooltipStyleClass: "tooltipStyleClass", tooltipZIndex: "tooltipZIndex", escape: "escape", showDelay: "showDelay", hideDelay: "hideDelay", life: "life", positionTop: "positionTop", positionLeft: "positionLeft", disabled: ["tooltipDisabled", "disabled"], tooltipOptions: "tooltipOptions", text: ["pTooltip", "text"] }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Tooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pTooltip]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }]; }, propDecorators: { tooltipPosition: [{
                type: Input
            }], tooltipEvent: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], positionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], tooltipZIndex: [{
                type: Input
            }], escape: [{
                type: Input
            }], showDelay: [{
                type: Input
            }], hideDelay: [{
                type: Input
            }], life: [{
                type: Input
            }], positionTop: [{
                type: Input
            }], positionLeft: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: ["tooltipDisabled"]
            }], tooltipOptions: [{
                type: Input
            }], text: [{
                type: Input,
                args: ['pTooltip']
            }] } });
export class TooltipModule {
}
TooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TooltipModule, declarations: [Tooltip], imports: [CommonModule], exports: [Tooltip] });
TooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TooltipModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Tooltip],
                    declarations: [Tooltip]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQXdDLEtBQUssRUFBeUIsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQTs7O0FBdUIzQyxNQUFNLE9BQU8sT0FBTztJQTRFaEIsWUFBbUIsRUFBYyxFQUFTLElBQVksRUFBUyxNQUFxQjtRQUFqRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWU7UUE5RDNFLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFzQmhDLG9CQUFlLEdBQW1CO1lBQzlCLGVBQWUsRUFBRSxPQUFPO1lBQ3hCLFlBQVksRUFBRSxPQUFPO1lBQ3JCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQztTQUNsQixDQUFBO0lBZ0N1RixDQUFDO0lBbER6RixJQUE4QixRQUFRO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsR0FBVztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQThDRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFH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SUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxZQUFZLENBQUMsY0FBYyxFQUFFO1lBQzdCLElBQUksQ0FBQyxlQUFlLG1DQUFPLElBQUksQ0FBQyxlQUFlLEdBQUssWUFBWSxDQUFD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SUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNuRTtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU3QyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssTUFBTTtZQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFFBQVE7WUFDNUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7O1lBRTlELFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0QsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxNQUFNO1lBQzFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7O1lBRXZFLElBQUksQ0FBQyxT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dFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBJbnB1dCwgTmdab25lLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnXG5pbXBvcnQgeyBQcmltZU5HQ29uZmlnIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvb2x0aXBPcHRpb25zIHtcbiAgICB0b29sdGlwTGFiZWw/OiBzdHJpbmc7XG4gICAgdG9vbHRpcFBvc2l0aW9uPzogc3RyaW5nO1xuICAgIHRvb2x0aXBFdmVudD86IHN0cmluZztcbiAgICBhcHBlbmRUbz86IGFueTtcbiAgICBwb3NpdGlvblN0eWxlPzogc3RyaW5nO1xuICAgIHRvb2x0aXBTdHlsZUNsYXNzPzogc3RyaW5nO1xuICAgIHRvb2x0aXBaSW5kZXg/OiBzdHJpbmc7XG4gICAgZXNjYXBlPzogYm9vbGVhbjtcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgc2hvd0RlbGF5PzogbnVtYmVyO1xuICAgIGhpZGVEZWxheT86IG51bWJlcjtcbiAgICBwb3NpdGlvblRvcD86IG51bWJlcjtcbiAgICBwb3NpdGlvbkxlZnQ/OiBudW1iZXI7XG4gICAgbGlmZT86IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFRvb2x0aXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcEV2ZW50OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgcG9zaXRpb25TdHlsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRvb2x0aXBaSW5kZXg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzaG93RGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGhpZGVEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbGlmZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcG9zaXRpb25Ub3A6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBvc2l0aW9uTGVmdDogbnVtYmVyO1xuXG4gICAgQElucHV0KFwidG9vbHRpcERpc2FibGVkXCIpIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQodmFsOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHRvb2x0aXBPcHRpb25zOiBUb29sdGlwT3B0aW9ucztcblxuICAgIF90b29sdGlwT3B0aW9uczogVG9vbHRpcE9wdGlvbnMgPSB7XG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgdG9vbHRpcEV2ZW50OiAnaG92ZXInLFxuICAgICAgICBhcHBlbmRUbzogJ2JvZHknLFxuICAgICAgICB0b29sdGlwWkluZGV4OiAnYXV0bycsXG4gICAgICAgIGVzY2FwZTogZmFsc2UsXG4gICAgICAgIHBvc2l0aW9uVG9wOiAwLFxuICAgICAgICBwb3NpdGlvbkxlZnQ6IDBcbiAgICB9XG5cbiAgICBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBjb250YWluZXI6IGFueTtcblxuICAgIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIHRvb2x0aXBUZXh0OiBhbnk7XG5cbiAgICBzaG93VGltZW91dDogYW55O1xuXG4gICAgaGlkZVRpbWVvdXQ6IGFueTtcblxuICAgIGFjdGl2ZTogYm9vbGVhbjtcblxuICAgIF90ZXh0OiBzdHJpbmc7XG5cbiAgICBtb3VzZUVudGVyTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgbW91c2VMZWF2ZUxpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAgIGNsaWNrTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgZm9jdXNMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBibHVyTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xuXG4gICAgcmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZykgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBFdmVudCcpID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VMZWF2ZUxpc3RlbmVyID0gdGhpcy5vbk1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrTGlzdGVuZXIgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW91c2VFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMubW91c2VMZWF2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBFdmVudCcpID09PSAnZm9jdXMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0xpc3RlbmVyID0gdGhpcy5vbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibHVyTGlzdGVuZXIgPSB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuZm9jdXNMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJsdXJMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvb2x0aXBQb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oe3Rvb2x0aXBQb3NpdGlvbjogc2ltcGxlQ2hhbmdlLnRvb2x0aXBQb3NpdGlvbi5jdXJyZW50VmFsdWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudG9vbHRpcEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7dG9vbHRpcEV2ZW50OiBzaW1wbGVDaGFuZ2UudG9vbHRpcEV2ZW50LmN1cnJlbnRWYWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oe2FwcGVuZFRvOiBzaW1wbGVDaGFuZ2UuYXBwZW5kVG8uY3VycmVudFZhbHVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnBvc2l0aW9uU3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHtwb3NpdGlvblN0eWxlOiBzaW1wbGVDaGFuZ2UucG9zaXRpb25TdHlsZS5jdXJyZW50VmFsdWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudG9vbHRpcFN0eWxlQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHt0b29sdGlwU3R5bGVDbGFzczogc2ltcGxlQ2hhbmdlLnRvb2x0aXBTdHlsZUNsYXNzLmN1cnJlbnRWYWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS50b29sdGlwWkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7dG9vbHRpcFpJbmRleDogc2ltcGxlQ2hhbmdlLnRvb2x0aXBaSW5kZXguY3VycmVudFZhbHVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmVzY2FwZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oe2VzY2FwZTogc2ltcGxlQ2hhbmdlLmVzY2FwZS5jdXJyZW50VmFsdWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc2hvd0RlbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7c2hvd0RlbGF5OiBzaW1wbGVDaGFuZ2Uuc2hvd0RlbGF5LmN1cnJlbnRWYWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5oaWRlRGVsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHtzaG93RGVsYXk6IHNpbXBsZUNoYW5nZS5oaWRlRGVsYXkuY3VycmVudFZhbHVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmxpZmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHtsaWZlOiBzaW1wbGVDaGFuZ2UubGlmZS5jdXJyZW50VmFsdWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UucG9zaXRpb25Ub3ApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHtwb3NpdGlvblRvcDogc2ltcGxlQ2hhbmdlLnBvc2l0aW9uVG9wLmN1cnJlbnRWYWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5wb3NpdGlvbkxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHtwb3NpdGlvbkxlZnQ6IHNpbXBsZUNoYW5nZS5wb3NpdGlvbkxlZnQuY3VycmVudFZhbHVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7ZGlzYWJsZWQ6IHNpbXBsZUNoYW5nZS5kaXNhYmxlZC5jdXJyZW50VmFsdWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudGV4dCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oe3Rvb2x0aXBMYWJlbDogc2ltcGxlQ2hhbmdlLnRleHQuY3VycmVudFZhbHVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvb2x0aXBPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwT3B0aW9ucyA9IHsuLi50aGlzLl90b29sdGlwT3B0aW9ucywgLi4uc2ltcGxlQ2hhbmdlLnRvb2x0aXBPcHRpb25zLmN1cnJlbnRWYWx1ZX07XG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwTGFiZWwnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRW50ZXIoZTogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lciAmJiAhdGhpcy5zaG93VGltZW91dCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZUxlYXZlKGU6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZTogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIG9uQmx1cihlOiBFdmVudCkge1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGU6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xlYXJIaWRlVGltZW91dCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignc2hvd0RlbGF5JykpXG4gICAgICAgICAgICB0aGlzLnNob3dUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuc2hvdygpIH0sIHRoaXMuZ2V0T3B0aW9uKCdzaG93RGVsYXknKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignbGlmZScpKSB7XG4gICAgICAgICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLmdldE9wdGlvbignc2hvd0RlbGF5JykgPyB0aGlzLmdldE9wdGlvbignbGlmZScpICsgdGhpcy5nZXRPcHRpb24oJ3Nob3dEZWxheScpIDogdGhpcy5nZXRPcHRpb24oJ2xpZmUnKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5oaWRlKCkgfSwgZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGVhclNob3dUaW1lb3V0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdoaWRlRGVsYXknKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckhpZGVUaW1lb3V0KCk7ICAgIC8vbGlmZSB0aW1lb3V0XG4gICAgICAgICAgICB0aGlzLmhpZGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuaGlkZSgpIH0sIHRoaXMuZ2V0T3B0aW9uKCdoaWRlRGVsYXknKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH1cblxuICAgIEBJbnB1dCgncFRvb2x0aXAnKSBzZXQgdGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RleHQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuXHRcdFx0XHRcdHRoaXMuYWxpZ24oKTtcblx0XHRcdFx0fVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFySGlkZVRpbWVvdXQoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGxldCB0b29sdGlwQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9vbHRpcEFycm93LmNsYXNzTmFtZSA9ICdwLXRvb2x0aXAtYXJyb3cnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b29sdGlwQXJyb3cpO1xuXG4gICAgICAgIHRoaXMudG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50b29sdGlwVGV4dC5jbGFzc05hbWUgPSAncC10b29sdGlwLXRleHQnO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbigncG9zaXRpb25TdHlsZScpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IHRoaXMuZ2V0T3B0aW9uKCdwb3NpdGlvblN0eWxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBUZXh0KTtcblxuICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICdib2R5JylcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICBlbHNlIGlmICh0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSA9PT0gJ3RhcmdldCcpXG4gICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBMYWJlbCcpIHx8IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgICAgIERvbUhhbmRsZXIuZmFkZUluKHRoaXMuY29udGFpbmVyLCAyNTApO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbigndG9vbHRpcFpJbmRleCcpID09PSAnYXV0bycpXG4gICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ3Rvb2x0aXAnLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcuekluZGV4LnRvb2x0aXApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSB0aGlzLmdldE9wdGlvbigndG9vbHRpcFpJbmRleCcpO1xuXG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBaSW5kZXgnKSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignZXNjYXBlJykpIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwTGFiZWwnKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5pbm5lckhUTUwgPSB0aGlzLmdldE9wdGlvbigndG9vbHRpcExhYmVsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbigpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBQb3NpdGlvbicpO1xuXG4gICAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnblRvcCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduQm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblJpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbkJvdHRvbSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblJpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25SaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblRvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduQm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWduUmlnaHQoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbkxlZnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25Ub3AoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbkJvdHRvbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SG9zdE9mZnNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpID09PSAnYm9keScgfHwgdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICd0YXJnZXQnKSB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbGV0IHRhcmdldExlZnQgPSBvZmZzZXQubGVmdCArIERvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsTGVmdCgpO1xuICAgICAgICAgICAgbGV0IHRhcmdldFRvcCA9IG9mZnNldC50b3AgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xuXG4gICAgICAgICAgICByZXR1cm4geyBsZWZ0OiB0YXJnZXRMZWZ0LCB0b3A6IHRhcmdldFRvcCB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogMCwgdG9wOiAwIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnblJpZ2h0KCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCdyaWdodCcpO1xuICAgICAgICBsZXQgaG9zdE9mZnNldCA9IHRoaXMuZ2V0SG9zdE9mZnNldCgpO1xuICAgICAgICBsZXQgbGVmdCA9IGhvc3RPZmZzZXQubGVmdCArIERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBsZXQgdG9wID0gaG9zdE9mZnNldC50b3AgKyAoRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIC0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcikpIC8gMjtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IGxlZnQgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25MZWZ0JykgKyAncHgnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3AgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25Ub3AnKSArICdweCc7XG4gICAgfVxuXG4gICAgYWxpZ25MZWZ0KCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCdsZWZ0Jyk7XG4gICAgICAgIGxldCBob3N0T2Zmc2V0ID0gdGhpcy5nZXRIb3N0T2Zmc2V0KCk7XG4gICAgICAgIGxldCBsZWZ0ID0gaG9zdE9mZnNldC5sZWZ0IC0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgbGV0IHRvcCA9IGhvc3RPZmZzZXQudG9wICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSAtIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpKSAvIDI7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uTGVmdCcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uVG9wJykgKyAncHgnO1xuICAgIH1cblxuICAgIGFsaWduVG9wKCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCd0b3AnKTtcbiAgICAgICAgbGV0IGhvc3RPZmZzZXQgPSB0aGlzLmdldEhvc3RPZmZzZXQoKTtcbiAgICAgICAgbGV0IGxlZnQgPSBob3N0T2Zmc2V0LmxlZnQgKyAoRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCkgLSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpKSAvIDI7XG4gICAgICAgIGxldCB0b3AgPSBob3N0T2Zmc2V0LnRvcCAtIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdCArIHRoaXMuZ2V0T3B0aW9uKCdwb3NpdGlvbkxlZnQnKSArICdweCc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcCArIHRoaXMuZ2V0T3B0aW9uKCdwb3NpdGlvblRvcCcpICsgJ3B4JztcbiAgICB9XG5cbiAgICBhbGlnbkJvdHRvbSgpIHtcbiAgICAgICAgdGhpcy5wcmVBbGlnbignYm90dG9tJyk7XG4gICAgICAgIGxldCBob3N0T2Zmc2V0ID0gdGhpcy5nZXRIb3N0T2Zmc2V0KCk7XG4gICAgICAgIGxldCBsZWZ0ID0gaG9zdE9mZnNldC5sZWZ0ICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIC0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKSkgLyAyO1xuICAgICAgICBsZXQgdG9wID0gaG9zdE9mZnNldC50b3AgKyBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uTGVmdCcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uVG9wJykgKyAncHgnO1xuICAgIH1cblxuICAgIHNldE9wdGlvbihvcHRpb246IFRvb2x0aXBPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBPcHRpb25zID0gey4uLnRoaXMuX3Rvb2x0aXBPcHRpb25zLCAuLi5vcHRpb259XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uKG9wdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwT3B0aW9uc1tvcHRpb25dO1xuICAgIH1cblxuICAgIHByZUFsaWduKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IC05OTkgKyAncHgnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSAtOTk5ICsgJ3B4JztcblxuICAgICAgICBsZXQgZGVmYXVsdENsYXNzTmFtZSA9ICdwLXRvb2x0aXAgcC1jb21wb25lbnQgcC10b29sdGlwLScgKyBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBTdHlsZUNsYXNzJykgPyBkZWZhdWx0Q2xhc3NOYW1lICsgJyAnICsgdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBTdHlsZUNsYXNzJykgOiBkZWZhdWx0Q2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGlzT3V0T2ZCb3VuZHMoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHRhcmdldFRvcCA9IG9mZnNldC50b3A7XG4gICAgICAgIGxldCB0YXJnZXRMZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgIGxldCB3aWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGxldCBoZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuXG4gICAgICAgIHJldHVybiAodGFyZ2V0TGVmdCArIHdpZHRoID4gdmlld3BvcnQud2lkdGgpIHx8ICh0YXJnZXRMZWZ0IDwgMCkgfHwgKHRhcmdldFRvcCA8IDApIHx8ICh0YXJnZXRUb3AgKyBoZWlnaHQgPiB2aWV3cG9ydC5oZWlnaHQpO1xuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKGU6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbigndG9vbHRpcEV2ZW50JykgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm1vdXNlTGVhdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwRXZlbnQnKSA9PT0gJ2ZvY3VzJykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0xpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5ibHVyTGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSA9PT0gJ3RhcmdldCcpXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dHMoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNsZWFyU2hvd1RpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLnNob3dUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFySGlkZVRpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZGVUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dHMoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTaG93VGltZW91dCgpO1xuICAgICAgICB0aGlzLmNsZWFySGlkZVRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Rvb2x0aXBdLFxuICAgIGRlY2xhcmF0aW9uczogW1Rvb2x0aXBdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBNb2R1bGUgeyB9XG4iXX0=