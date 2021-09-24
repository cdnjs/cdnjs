(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/button'), require('primeng/ripple'), require('primeng/tooltip'), require('primeng/dom'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/speeddial', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/button', 'primeng/ripple', 'primeng/tooltip', 'primeng/dom', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.speeddial = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.button, global.primeng.ripple, global.primeng.tooltip, global.primeng.dom, global.ng.router));
}(this, (function (exports, i0, i1, api, i3, i2, i4, dom, i5) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);

    var SpeedDial = /** @class */ (function () {
        function SpeedDial(el, cd) {
            this.el = el;
            this.cd = cd;
            this.model = null;
            this.direction = 'up';
            this.transitionDelay = 30;
            this.type = 'linear';
            this.radius = 0;
            this.mask = false;
            this.disabled = false;
            this.hideOnClickOutside = true;
            this.showIcon = 'pi pi-plus';
            this.rotateAnimation = true;
            this.onVisibleChange = new i0.EventEmitter();
            this.visibleChange = new i0.EventEmitter();
            this.onClick = new i0.EventEmitter();
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.isItemClicked = false;
            this._visible = false;
        }
        Object.defineProperty(SpeedDial.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                if (this._visible) {
                    this.bindDocumentClickListener();
                }
                else {
                    this.unbindDocumentClickListener();
                }
            },
            enumerable: false,
            configurable: true
        });
        SpeedDial.prototype.ngAfterViewInit = function () {
            if (this.type !== 'linear') {
                var button = dom.DomHandler.findSingle(this.container.nativeElement, '.p-speeddial-button');
                var firstItem = dom.DomHandler.findSingle(this.list.nativeElement, '.p-speeddial-item');
                if (button && firstItem) {
                    var wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                    var hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                    this.list.nativeElement.style.setProperty('--item-diff-x', wDiff / 2 + "px");
                    this.list.nativeElement.style.setProperty('--item-diff-y', hDiff / 2 + "px");
                }
            }
        };
        SpeedDial.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'button':
                        _this.buttonTemplate = item.template;
                        break;
                }
            });
        };
        SpeedDial.prototype.show = function () {
            this.onVisibleChange.emit(true);
            this.visibleChange.emit(true);
            this._visible = true;
            this.onShow.emit();
            this.bindDocumentClickListener();
            this.cd.markForCheck();
        };
        SpeedDial.prototype.hide = function () {
            this.onVisibleChange.emit(false);
            this.visibleChange.emit(false);
            this._visible = false;
            this.onHide.emit();
            this.unbindDocumentClickListener();
            this.cd.markForCheck();
        };
        SpeedDial.prototype.onButtonClick = function (event) {
            this.visible ? this.hide() : this.show();
            this.onClick.emit(event);
            this.isItemClicked = true;
        };
        SpeedDial.prototype.onItemClick = function (e, item) {
            if (item.command) {
                item.command({ originalEvent: e, item: item });
            }
            this.hide();
            this.isItemClicked = true;
        };
        SpeedDial.prototype.calculatePointStyle = function (index) {
            var type = this.type;
            if (type !== 'linear') {
                var length = this.model.length;
                var radius = this.radius || (length * 20);
                if (type === 'circle') {
                    var step = 2 * Math.PI / length;
                    return {
                        left: "calc(" + radius * Math.cos(step * index) + "px + var(--item-diff-x, 0px))",
                        top: "calc(" + radius * Math.sin(step * index) + "px + var(--item-diff-y, 0px))",
                    };
                }
                else if (type === 'semi-circle') {
                    var direction = this.direction;
                    var step = Math.PI / (length - 1);
                    var x = "calc(" + radius * Math.cos(step * index) + "px + var(--item-diff-x, 0px))";
                    var y = "calc(" + radius * Math.sin(step * index) + "px + var(--item-diff-y, 0px))";
                    if (direction === 'up') {
                        return { left: x, bottom: y };
                    }
                    else if (direction === 'down') {
                        return { left: x, top: y };
                    }
                    else if (direction === 'left') {
                        return { right: y, top: x };
                    }
                    else if (direction === 'right') {
                        return { left: y, top: x };
                    }
                }
                else if (type === 'quarter-circle') {
                    var direction = this.direction;
                    var step = Math.PI / (2 * (length - 1));
                    var x = "calc(" + radius * Math.cos(step * index) + "px + var(--item-diff-x, 0px))";
                    var y = "calc(" + radius * Math.sin(step * index) + "px + var(--item-diff-y, 0px))";
                    if (direction === 'up-left') {
                        return { right: x, bottom: y };
                    }
                    else if (direction === 'up-right') {
                        return { left: x, bottom: y };
                    }
                    else if (direction === 'down-left') {
                        return { right: y, top: x };
                    }
                    else if (direction === 'down-right') {
                        return { left: y, top: x };
                    }
                }
            }
            return {};
        };
        SpeedDial.prototype.calculateTransitionDelay = function (index) {
            var length = this.model.length;
            return (this.visible ? index : length - index - 1) * this.transitionDelay;
        };
        SpeedDial.prototype.containerClass = function () {
            var _a;
            return _a = {},
                _a['p-speeddial p-component' + (" p-speeddial-" + this.type)] = true,
                _a["p-speeddial-direction-" + this.direction] = this.type !== 'circle',
                _a['p-speeddial-opened'] = this.visible,
                _a['p-disabled'] = this.disabled,
                _a;
        };
        SpeedDial.prototype.buttonClass = function () {
            var _a;
            return _a = {
                    'p-speeddial-button p-button-rounded': true,
                    'p-speeddial-rotate': this.rotateAnimation && !this.hideIcon
                },
                _a[this.buttonClassName] = true,
                _a;
        };
        Object.defineProperty(SpeedDial.prototype, "buttonIconClass", {
            get: function () {
                return ((!this.visible && this.showIcon) || !this.hideIcon) ? this.showIcon : this.hideIcon;
            },
            enumerable: false,
            configurable: true
        });
        SpeedDial.prototype.getItemStyle = function (index) {
            var transitionDelay = this.calculateTransitionDelay(index);
            var pointStyle = this.calculatePointStyle(index);
            return Object.assign({ transitionDelay: transitionDelay + "ms" }, pointStyle);
        };
        SpeedDial.prototype.isClickableRouterLink = function (item) {
            return item.routerLink && !this.disabled && !item.disabled;
        };
        SpeedDial.prototype.isOutsideClicked = function (event) {
            return this.container && !(this.container.nativeElement.isSameNode(event.target) || this.container.nativeElement.contains(event.target) || this.isItemClicked);
        };
        SpeedDial.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener && this.hideOnClickOutside) {
                this.documentClickListener = function (event) {
                    if (_this.visible && _this.isOutsideClicked(event)) {
                        _this.hide();
                    }
                    _this.isItemClicked = false;
                };
                document.addEventListener('click', this.documentClickListener);
            }
        };
        SpeedDial.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        };
        SpeedDial.prototype.ngOnDestroy = function () {
            this.unbindDocumentClickListener();
        };
        return SpeedDial;
    }());
    SpeedDial.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpeedDial, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SpeedDial.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SpeedDial, selector: "p-speedDial", inputs: { id: "id", model: "model", visible: "visible", style: "style", className: "className", direction: "direction", transitionDelay: "transitionDelay", type: "type", radius: "radius", mask: "mask", disabled: "disabled", hideOnClickOutside: "hideOnClickOutside", buttonStyle: "buttonStyle", buttonClassName: "buttonClassName", maskStyle: "maskStyle", maskClassName: "maskClassName", showIcon: "showIcon", hideIcon: "hideIcon", rotateAnimation: "rotateAnimation" }, outputs: { onVisibleChange: "onVisibleChange", visibleChange: "visibleChange", onClick: "onClick", onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }, { propertyName: "list", first: true, predicate: ["list"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #container [attr.id]=\"id\" [ngClass]=\"containerClass()\" [class]=\"className\" [ngStyle]=\"style\">\n            <button pRipple pButton [style]=\"buttonStyle\" [icon]=\"buttonIconClass\" [ngClass]=\"buttonClass()\" (click)=\"onButtonClick($event)\">\n                <ng-container *ngIf=\"buttonTemplate\">\n                    <ng-container *ngTemplateOutlet=\"buttonTemplate\"></ng-container>\n                </ng-container>\n            </button>\n            <ul #list class=\"p-speeddial-list\" role=\"menu\">\n                <li *ngFor=\"let item of model; let i = index\" [ngStyle]=\"getItemStyle(i)\" class=\"p-speeddial-item\" pTooltip [tooltipOptions]=\"item.tooltipOptions\">\n                    <a *ngIf=\"isClickableRouterLink(item); else elseBlock\" pRipple [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" class=\"p-speeddial-action\" [ngClass]=\"{'p-disabled':item.disabled}\"  role=\"menuitem\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" (click)=\"onItemClick($event, item)\" (keydown.enter)=\"onItemClick($event, item, i)\"\n                        [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                            <span class=\"p-speeddial-action-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                    </a>\n                    <ng-template #elseBlock>\n                        <a [attr.href]=\"item.url||null\" class=\"p-speeddial-action\" role=\"menuitem\" pRipple (click)=\"onItemClick($event, item)\" [ngClass]=\"{'p-disabled':item.disabled}\"\n                            (keydown.enter)=\"onItemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                            <span class=\"p-speeddial-action-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                        </a>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n        <div *ngIf=\"mask && visible\" [ngClass]=\"{'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible}\" [class]=\"maskClassName\" [ngStyle]=\"maskStyle\"></div>\n    ", isInline: true, styles: [".p-speeddial{position:absolute;display:flex;z-index:1}.p-speeddial-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center;transition:top 0s linear .2s;pointer-events:none}.p-speeddial-item{transform:scale(0);opacity:0;transition:transform .2s cubic-bezier(.4,0,.2,1) 0ms,opacity .8s;will-change:transform}.p-speeddial-action{display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;overflow:hidden;cursor:pointer}.p-speeddial-circle .p-speeddial-item,.p-speeddial-quarter-circle .p-speeddial-item,.p-speeddial-semi-circle .p-speeddial-item{position:absolute}.p-speeddial-rotate{transition:transform .25s cubic-bezier(.4,0,.2,1) 0ms;will-change:transform}.p-speeddial-mask{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;transition:opacity .25s cubic-bezier(.25,.8,.25,1)}.p-speeddial-mask-visible{pointer-events:none;opacity:1;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.p-speeddial-opened .p-speeddial-list{pointer-events:auto}.p-speeddial-opened .p-speeddial-item{transform:scale(1);opacity:1}.p-speeddial-opened .p-speeddial-rotate{transform:rotate(45deg)}.p-speeddial-direction-up{align-items:center}.p-speeddial-direction-up,.p-speeddial-direction-up .p-speeddial-list{flex-direction:column-reverse}.p-speeddial-direction-down{align-items:center;flex-direction:column}.p-speeddial-direction-down .p-speeddial-list{flex-direction:column}.p-speeddial-direction-left{justify-content:center;flex-direction:row-reverse}.p-speeddial-direction-left .p-speeddial-list{flex-direction:row-reverse}.p-speeddial-direction-right{justify-content:center;flex-direction:row}.p-speeddial-direction-right .p-speeddial-list{flex-direction:row}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.Ripple, selector: "[pRipple]" }, { type: i3__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i5__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpeedDial, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-speedDial',
                        template: "\n        <div #container [attr.id]=\"id\" [ngClass]=\"containerClass()\" [class]=\"className\" [ngStyle]=\"style\">\n            <button pRipple pButton [style]=\"buttonStyle\" [icon]=\"buttonIconClass\" [ngClass]=\"buttonClass()\" (click)=\"onButtonClick($event)\">\n                <ng-container *ngIf=\"buttonTemplate\">\n                    <ng-container *ngTemplateOutlet=\"buttonTemplate\"></ng-container>\n                </ng-container>\n            </button>\n            <ul #list class=\"p-speeddial-list\" role=\"menu\">\n                <li *ngFor=\"let item of model; let i = index\" [ngStyle]=\"getItemStyle(i)\" class=\"p-speeddial-item\" pTooltip [tooltipOptions]=\"item.tooltipOptions\">\n                    <a *ngIf=\"isClickableRouterLink(item); else elseBlock\" pRipple [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" class=\"p-speeddial-action\" [ngClass]=\"{'p-disabled':item.disabled}\"  role=\"menuitem\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" (click)=\"onItemClick($event, item)\" (keydown.enter)=\"onItemClick($event, item, i)\"\n                        [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                            <span class=\"p-speeddial-action-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                    </a>\n                    <ng-template #elseBlock>\n                        <a [attr.href]=\"item.url||null\" class=\"p-speeddial-action\" role=\"menuitem\" pRipple (click)=\"onItemClick($event, item)\" [ngClass]=\"{'p-disabled':item.disabled}\"\n                            (keydown.enter)=\"onItemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                            <span class=\"p-speeddial-action-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                        </a>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n        <div *ngIf=\"mask && visible\" [ngClass]=\"{'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible}\" [class]=\"maskClassName\" [ngStyle]=\"maskStyle\"></div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./speeddial.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { id: [{
                    type: i0.Input
                }], model: [{
                    type: i0.Input
                }], visible: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], className: [{
                    type: i0.Input
                }], direction: [{
                    type: i0.Input
                }], transitionDelay: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], radius: [{
                    type: i0.Input
                }], mask: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], hideOnClickOutside: [{
                    type: i0.Input
                }], buttonStyle: [{
                    type: i0.Input
                }], buttonClassName: [{
                    type: i0.Input
                }], maskStyle: [{
                    type: i0.Input
                }], maskClassName: [{
                    type: i0.Input
                }], showIcon: [{
                    type: i0.Input
                }], hideIcon: [{
                    type: i0.Input
                }], rotateAnimation: [{
                    type: i0.Input
                }], onVisibleChange: [{
                    type: i0.Output
                }], visibleChange: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.Output
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], list: [{
                    type: i0.ViewChild,
                    args: ['list']
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var SpeedDialModule = /** @class */ (function () {
        function SpeedDialModule() {
        }
        return SpeedDialModule;
    }());
    SpeedDialModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpeedDialModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SpeedDialModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpeedDialModule, declarations: [SpeedDial], imports: [i1.CommonModule, i3.ButtonModule, i2.RippleModule, i4.TooltipModule, i5.RouterModule], exports: [SpeedDial, api.SharedModule, i3.ButtonModule, i4.TooltipModule, i5.RouterModule] });
    SpeedDialModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpeedDialModule, imports: [[i1.CommonModule, i3.ButtonModule, i2.RippleModule, i4.TooltipModule, i5.RouterModule], api.SharedModule, i3.ButtonModule, i4.TooltipModule, i5.RouterModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpeedDialModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i3.ButtonModule, i2.RippleModule, i4.TooltipModule, i5.RouterModule],
                        exports: [SpeedDial, api.SharedModule, i3.ButtonModule, i4.TooltipModule, i5.RouterModule],
                        declarations: [SpeedDial]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SpeedDial = SpeedDial;
    exports.SpeedDialModule = SpeedDialModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-speeddial.umd.js.map
