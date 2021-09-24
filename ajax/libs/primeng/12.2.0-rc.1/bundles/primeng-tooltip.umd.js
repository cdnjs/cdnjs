(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/utils'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/tooltip', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/utils', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tooltip = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.utils, global.primeng.api));
}(this, (function (exports, i0, common, dom, utils, i1) { 'use strict';

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

    var Tooltip = /** @class */ (function () {
        function Tooltip(el, zone, config) {
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
        Object.defineProperty(Tooltip.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = val;
                this.deactivate();
            },
            enumerable: false,
            configurable: true
        });
        Tooltip.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                if (_this.getOption('tooltipEvent') === 'hover') {
                    _this.mouseEnterListener = _this.onMouseEnter.bind(_this);
                    _this.mouseLeaveListener = _this.onMouseLeave.bind(_this);
                    _this.clickListener = _this.onClick.bind(_this);
                    _this.el.nativeElement.addEventListener('mouseenter', _this.mouseEnterListener);
                    _this.el.nativeElement.addEventListener('mouseleave', _this.mouseLeaveListener);
                    _this.el.nativeElement.addEventListener('click', _this.clickListener);
                }
                else if (_this.getOption('tooltipEvent') === 'focus') {
                    _this.focusListener = _this.onFocus.bind(_this);
                    _this.blurListener = _this.onBlur.bind(_this);
                    _this.el.nativeElement.addEventListener('focus', _this.focusListener);
                    _this.el.nativeElement.addEventListener('blur', _this.blurListener);
                }
            });
        };
        Tooltip.prototype.ngOnChanges = function (simpleChange) {
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
                if (this.active) {
                    if (simpleChange.text.currentValue) {
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
        };
        Tooltip.prototype.onMouseEnter = function (e) {
            if (!this.container && !this.showTimeout) {
                this.activate();
            }
        };
        Tooltip.prototype.onMouseLeave = function (e) {
            this.deactivate();
        };
        Tooltip.prototype.onFocus = function (e) {
            this.activate();
        };
        Tooltip.prototype.onBlur = function (e) {
            this.deactivate();
        };
        Tooltip.prototype.onClick = function (e) {
            this.deactivate();
        };
        Tooltip.prototype.activate = function () {
            var _this = this;
            this.active = true;
            this.clearHideTimeout();
            if (this.getOption('showDelay'))
                this.showTimeout = setTimeout(function () { _this.show(); }, this.getOption('showDelay'));
            else
                this.show();
            if (this.getOption('life')) {
                var duration = this.getOption('showDelay') ? this.getOption('life') + this.getOption('showDelay') : this.getOption('life');
                this.hideTimeout = setTimeout(function () { _this.hide(); }, duration);
            }
        };
        Tooltip.prototype.deactivate = function () {
            var _this = this;
            this.active = false;
            this.clearShowTimeout();
            if (this.getOption('hideDelay')) {
                this.clearHideTimeout(); //life timeout
                this.hideTimeout = setTimeout(function () { _this.hide(); }, this.getOption('hideDelay'));
            }
            else {
                this.hide();
            }
        };
        Tooltip.prototype.create = function () {
            if (this.container) {
                this.clearHideTimeout();
                this.remove();
            }
            this.container = document.createElement('div');
            var tooltipArrow = document.createElement('div');
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
                dom.DomHandler.appendChild(this.container, this.el.nativeElement);
            else
                dom.DomHandler.appendChild(this.container, this.getOption('appendTo'));
            this.container.style.display = 'inline-block';
        };
        Tooltip.prototype.show = function () {
            if (!this.getOption('tooltipLabel') || this.getOption('disabled')) {
                return;
            }
            this.create();
            this.align();
            dom.DomHandler.fadeIn(this.container, 250);
            if (this.getOption('tooltipZIndex') === 'auto')
                utils.ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip);
            else
                this.container.style.zIndex = this.getOption('tooltipZIndex');
            this.bindDocumentResizeListener();
            this.bindScrollListener();
        };
        Tooltip.prototype.hide = function () {
            if (this.getOption('tooltipZIndex') === 'auto') {
                utils.ZIndexUtils.clear(this.container);
            }
            this.remove();
        };
        Tooltip.prototype.updateText = function () {
            if (this.getOption('escape')) {
                this.tooltipText.innerHTML = '';
                this.tooltipText.appendChild(document.createTextNode(this.getOption('tooltipLabel')));
            }
            else {
                this.tooltipText.innerHTML = this.getOption('tooltipLabel');
            }
        };
        Tooltip.prototype.align = function () {
            var position = this.getOption('tooltipPosition');
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
        };
        Tooltip.prototype.getHostOffset = function () {
            if (this.getOption('appendTo') === 'body' || this.getOption('appendTo') === 'target') {
                var offset = this.el.nativeElement.getBoundingClientRect();
                var targetLeft = offset.left + dom.DomHandler.getWindowScrollLeft();
                var targetTop = offset.top + dom.DomHandler.getWindowScrollTop();
                return { left: targetLeft, top: targetTop };
            }
            else {
                return { left: 0, top: 0 };
            }
        };
        Tooltip.prototype.alignRight = function () {
            this.preAlign('right');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + dom.DomHandler.getOuterWidth(this.el.nativeElement);
            var top = hostOffset.top + (dom.DomHandler.getOuterHeight(this.el.nativeElement) - dom.DomHandler.getOuterHeight(this.container)) / 2;
            this.container.style.left = left + this.getOption('positionLeft') + 'px';
            this.container.style.top = top + this.getOption('positionTop') + 'px';
        };
        Tooltip.prototype.alignLeft = function () {
            this.preAlign('left');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left - dom.DomHandler.getOuterWidth(this.container);
            var top = hostOffset.top + (dom.DomHandler.getOuterHeight(this.el.nativeElement) - dom.DomHandler.getOuterHeight(this.container)) / 2;
            this.container.style.left = left + this.getOption('positionLeft') + 'px';
            this.container.style.top = top + this.getOption('positionTop') + 'px';
        };
        Tooltip.prototype.alignTop = function () {
            this.preAlign('top');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + (dom.DomHandler.getOuterWidth(this.el.nativeElement) - dom.DomHandler.getOuterWidth(this.container)) / 2;
            var top = hostOffset.top - dom.DomHandler.getOuterHeight(this.container);
            this.container.style.left = left + this.getOption('positionLeft') + 'px';
            this.container.style.top = top + this.getOption('positionTop') + 'px';
        };
        Tooltip.prototype.alignBottom = function () {
            this.preAlign('bottom');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + (dom.DomHandler.getOuterWidth(this.el.nativeElement) - dom.DomHandler.getOuterWidth(this.container)) / 2;
            var top = hostOffset.top + dom.DomHandler.getOuterHeight(this.el.nativeElement);
            this.container.style.left = left + this.getOption('positionLeft') + 'px';
            this.container.style.top = top + this.getOption('positionTop') + 'px';
        };
        Tooltip.prototype.setOption = function (option) {
            this._tooltipOptions = Object.assign(Object.assign({}, this._tooltipOptions), option);
        };
        Tooltip.prototype.getOption = function (option) {
            return this._tooltipOptions[option];
        };
        Tooltip.prototype.preAlign = function (position) {
            this.container.style.left = -999 + 'px';
            this.container.style.top = -999 + 'px';
            var defaultClassName = 'p-tooltip p-component p-tooltip-' + position;
            this.container.className = this.getOption('tooltipStyleClass') ? defaultClassName + ' ' + this.getOption('tooltipStyleClass') : defaultClassName;
        };
        Tooltip.prototype.isOutOfBounds = function () {
            var offset = this.container.getBoundingClientRect();
            var targetTop = offset.top;
            var targetLeft = offset.left;
            var width = dom.DomHandler.getOuterWidth(this.container);
            var height = dom.DomHandler.getOuterHeight(this.container);
            var viewport = dom.DomHandler.getViewport();
            return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
        };
        Tooltip.prototype.onWindowResize = function (e) {
            this.hide();
        };
        Tooltip.prototype.bindDocumentResizeListener = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.resizeListener = _this.onWindowResize.bind(_this);
                window.addEventListener('resize', _this.resizeListener);
            });
        };
        Tooltip.prototype.unbindDocumentResizeListener = function () {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        };
        Tooltip.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.el.nativeElement, function () {
                    if (_this.container) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        Tooltip.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        Tooltip.prototype.unbindEvents = function () {
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
        };
        Tooltip.prototype.remove = function () {
            if (this.container && this.container.parentElement) {
                if (this.getOption('appendTo') === 'body')
                    document.body.removeChild(this.container);
                else if (this.getOption('appendTo') === 'target')
                    this.el.nativeElement.removeChild(this.container);
                else
                    dom.DomHandler.removeChild(this.container, this.getOption('appendTo'));
            }
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.clearTimeouts();
            this.container = null;
            this.scrollHandler = null;
        };
        Tooltip.prototype.clearShowTimeout = function () {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = null;
            }
        };
        Tooltip.prototype.clearHideTimeout = function () {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        };
        Tooltip.prototype.clearTimeouts = function () {
            this.clearShowTimeout();
            this.clearHideTimeout();
        };
        Tooltip.prototype.ngOnDestroy = function () {
            this.unbindEvents();
            if (this.container) {
                utils.ZIndexUtils.clear(this.container);
            }
            this.remove();
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
        };
        return Tooltip;
    }());
    Tooltip.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Tooltip, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i1__namespace.PrimeNGConfig }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    Tooltip.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: Tooltip, selector: "[pTooltip]", inputs: { tooltipPosition: "tooltipPosition", tooltipEvent: "tooltipEvent", appendTo: "appendTo", positionStyle: "positionStyle", tooltipStyleClass: "tooltipStyleClass", tooltipZIndex: "tooltipZIndex", escape: "escape", showDelay: "showDelay", hideDelay: "hideDelay", life: "life", positionTop: "positionTop", positionLeft: "positionLeft", text: ["pTooltip", "text"], disabled: ["tooltipDisabled", "disabled"], tooltipOptions: "tooltipOptions" }, host: { classAttribute: "p-element" }, usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Tooltip, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pTooltip]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i1__namespace.PrimeNGConfig }]; }, propDecorators: { tooltipPosition: [{
                    type: i0.Input
                }], tooltipEvent: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], positionStyle: [{
                    type: i0.Input
                }], tooltipStyleClass: [{
                    type: i0.Input
                }], tooltipZIndex: [{
                    type: i0.Input
                }], escape: [{
                    type: i0.Input
                }], showDelay: [{
                    type: i0.Input
                }], hideDelay: [{
                    type: i0.Input
                }], life: [{
                    type: i0.Input
                }], positionTop: [{
                    type: i0.Input
                }], positionLeft: [{
                    type: i0.Input
                }], text: [{
                    type: i0.Input,
                    args: ['pTooltip']
                }], disabled: [{
                    type: i0.Input,
                    args: ["tooltipDisabled"]
                }], tooltipOptions: [{
                    type: i0.Input
                }] } });
    var TooltipModule = /** @class */ (function () {
        function TooltipModule() {
        }
        return TooltipModule;
    }());
    TooltipModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TooltipModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TooltipModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TooltipModule, declarations: [Tooltip], imports: [common.CommonModule], exports: [Tooltip] });
    TooltipModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TooltipModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TooltipModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [Tooltip],
                        declarations: [Tooltip]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Tooltip = Tooltip;
    exports.TooltipModule = TooltipModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tooltip.umd.js.map
