(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('@angular/forms'), require('primeng/utils'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/colorpicker', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', '@angular/forms', 'primeng/utils', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.colorpicker = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.ng.forms, global.primeng.utils, global.primeng.api));
}(this, (function (exports, i0, animations, i2, dom, forms, utils, i1) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var COLORPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return ColorPicker; }),
        multi: true
    };
    var ColorPicker = /** @class */ (function () {
        function ColorPicker(el, renderer, cd, config, overlayService) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.config = config;
            this.overlayService = overlayService;
            this.format = 'hex';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onChange = new i0.EventEmitter();
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.value = { h: 0, s: 100, b: 100 };
            this.defaultColor = 'ff0000';
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Object.defineProperty(ColorPicker.prototype, "colorSelector", {
            set: function (element) {
                this.colorSelectorViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPicker.prototype, "colorHandle", {
            set: function (element) {
                this.colorHandleViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPicker.prototype, "hue", {
            set: function (element) {
                this.hueViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPicker.prototype, "hueHandle", {
            set: function (element) {
                this.hueHandleViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        ColorPicker.prototype.onHueMousedown = function (event) {
            if (this.disabled) {
                return;
            }
            this.bindDocumentMousemoveListener();
            this.bindDocumentMouseupListener();
            this.hueDragging = true;
            this.pickHue(event);
        };
        ColorPicker.prototype.onHueTouchStart = function (event) {
            if (this.disabled) {
                return;
            }
            this.hueDragging = true;
            this.pickHue(event, event.changedTouches[0]);
        };
        ColorPicker.prototype.onColorTouchStart = function (event) {
            if (this.disabled) {
                return;
            }
            this.colorDragging = true;
            this.pickColor(event, event.changedTouches[0]);
        };
        ColorPicker.prototype.pickHue = function (event, position) {
            var pageY = position ? position.pageY : event.pageY;
            var top = this.hueViewChild.nativeElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            this.value = this.validateHSB({
                h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (pageY - top)))) / 150),
                s: this.value.s,
                b: this.value.b
            });
            this.updateColorSelector();
            this.updateUI();
            this.updateModel();
            this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
        };
        ColorPicker.prototype.onColorMousedown = function (event) {
            if (this.disabled) {
                return;
            }
            this.bindDocumentMousemoveListener();
            this.bindDocumentMouseupListener();
            this.colorDragging = true;
            this.pickColor(event);
        };
        ColorPicker.prototype.onMove = function (event) {
            if (this.colorDragging) {
                this.pickColor(event, event.changedTouches[0]);
                event.preventDefault();
            }
            if (this.hueDragging) {
                this.pickHue(event, event.changedTouches[0]);
                event.preventDefault();
            }
        };
        ColorPicker.prototype.onDragEnd = function () {
            this.colorDragging = false;
            this.hueDragging = false;
            this.unbindDocumentMousemoveListener();
            this.unbindDocumentMouseupListener();
        };
        ColorPicker.prototype.pickColor = function (event, position) {
            var pageX = position ? position.pageX : event.pageX;
            var pageY = position ? position.pageY : event.pageY;
            var rect = this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
            var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            var left = rect.left + document.body.scrollLeft;
            var saturation = Math.floor(100 * (Math.max(0, Math.min(150, ((pageX) - left)))) / 150);
            var brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, ((pageY) - top)))) / 150);
            this.value = this.validateHSB({
                h: this.value.h,
                s: saturation,
                b: brightness
            });
            this.updateUI();
            this.updateModel();
            this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
        };
        ColorPicker.prototype.getValueToUpdate = function () {
            var val;
            switch (this.format) {
                case 'hex':
                    val = '#' + this.HSBtoHEX(this.value);
                    break;
                case 'rgb':
                    val = this.HSBtoRGB(this.value);
                    break;
                case 'hsb':
                    val = this.value;
                    break;
            }
            return val;
        };
        ColorPicker.prototype.updateModel = function () {
            this.onModelChange(this.getValueToUpdate());
        };
        ColorPicker.prototype.writeValue = function (value) {
            if (value) {
                switch (this.format) {
                    case 'hex':
                        this.value = this.HEXtoHSB(value);
                        break;
                    case 'rgb':
                        this.value = this.RGBtoHSB(value);
                        break;
                    case 'hsb':
                        this.value = value;
                        break;
                }
            }
            else {
                this.value = this.HEXtoHSB(this.defaultColor);
            }
            this.updateColorSelector();
            this.updateUI();
            this.cd.markForCheck();
        };
        ColorPicker.prototype.updateColorSelector = function () {
            if (this.colorSelectorViewChild) {
                var hsb = {};
                hsb.s = 100;
                hsb.b = 100;
                hsb.h = this.value.h;
                this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
            }
        };
        ColorPicker.prototype.updateUI = function () {
            if (this.colorHandleViewChild && this.hueHandleViewChild.nativeElement) {
                this.colorHandleViewChild.nativeElement.style.left = Math.floor(150 * this.value.s / 100) + 'px';
                this.colorHandleViewChild.nativeElement.style.top = Math.floor(150 * (100 - this.value.b) / 100) + 'px';
                this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';
            }
            this.inputBgColor = '#' + this.HSBtoHEX(this.value);
        };
        ColorPicker.prototype.onInputFocus = function () {
            this.onModelTouched();
        };
        ColorPicker.prototype.show = function () {
            this.overlayVisible = true;
        };
        ColorPicker.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (!this.inline) {
                        this.overlay = event.element;
                        this.appendOverlay();
                        if (this.autoZIndex) {
                            utils.ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                        }
                        this.alignOverlay();
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                        this.bindScrollListener();
                        this.updateColorSelector();
                        this.updateUI();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        ColorPicker.prototype.onOverlayAnimationEnd = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (!this.inline) {
                        this.onShow.emit({});
                    }
                    break;
                case 'void':
                    if (this.autoZIndex) {
                        utils.ZIndexUtils.clear(event.element);
                    }
                    this.onHide.emit({});
                    break;
            }
        };
        ColorPicker.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    dom.DomHandler.appendChild(this.overlay, this.appendTo);
            }
        };
        ColorPicker.prototype.restoreOverlayAppend = function () {
            if (this.overlay && this.appendTo) {
                this.el.nativeElement.appendChild(this.overlay);
            }
        };
        ColorPicker.prototype.alignOverlay = function () {
            if (this.appendTo)
                dom.DomHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
            else
                dom.DomHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
        };
        ColorPicker.prototype.hide = function () {
            this.overlayVisible = false;
            this.cd.markForCheck();
        };
        ColorPicker.prototype.onInputClick = function () {
            this.selfClick = true;
            this.togglePanel();
        };
        ColorPicker.prototype.togglePanel = function () {
            if (!this.overlayVisible)
                this.show();
            else
                this.hide();
        };
        ColorPicker.prototype.onInputKeydown = function (event) {
            switch (event.which) {
                //space
                case 32:
                    this.togglePanel();
                    event.preventDefault();
                    break;
                //escape and tab
                case 27:
                case 9:
                    this.hide();
                    break;
            }
        };
        ColorPicker.prototype.onOverlayClick = function (event) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
            this.selfClick = true;
        };
        ColorPicker.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        ColorPicker.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        ColorPicker.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        ColorPicker.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function () {
                    if (!_this.selfClick) {
                        _this.overlayVisible = false;
                        _this.unbindDocumentClickListener();
                    }
                    _this.selfClick = false;
                    _this.cd.markForCheck();
                });
            }
        };
        ColorPicker.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        ColorPicker.prototype.bindDocumentMousemoveListener = function () {
            var _this = this;
            if (!this.documentMousemoveListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentMousemoveListener = this.renderer.listen(documentTarget, 'mousemove', function (event) {
                    if (_this.colorDragging) {
                        _this.pickColor(event);
                    }
                    if (_this.hueDragging) {
                        _this.pickHue(event);
                    }
                });
            }
        };
        ColorPicker.prototype.unbindDocumentMousemoveListener = function () {
            if (this.documentMousemoveListener) {
                this.documentMousemoveListener();
                this.documentMousemoveListener = null;
            }
        };
        ColorPicker.prototype.bindDocumentMouseupListener = function () {
            var _this = this;
            if (!this.documentMouseupListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentMouseupListener = this.renderer.listen(documentTarget, 'mouseup', function () {
                    _this.colorDragging = false;
                    _this.hueDragging = false;
                    _this.unbindDocumentMousemoveListener();
                    _this.unbindDocumentMouseupListener();
                });
            }
        };
        ColorPicker.prototype.unbindDocumentMouseupListener = function () {
            if (this.documentMouseupListener) {
                this.documentMouseupListener();
                this.documentMouseupListener = null;
            }
        };
        ColorPicker.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        ColorPicker.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        ColorPicker.prototype.onWindowResize = function () {
            this.hide();
        };
        ColorPicker.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        ColorPicker.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        ColorPicker.prototype.validateHSB = function (hsb) {
            return {
                h: Math.min(360, Math.max(0, hsb.h)),
                s: Math.min(100, Math.max(0, hsb.s)),
                b: Math.min(100, Math.max(0, hsb.b))
            };
        };
        ColorPicker.prototype.validateRGB = function (rgb) {
            return {
                r: Math.min(255, Math.max(0, rgb.r)),
                g: Math.min(255, Math.max(0, rgb.g)),
                b: Math.min(255, Math.max(0, rgb.b))
            };
        };
        ColorPicker.prototype.validateHEX = function (hex) {
            var len = 6 - hex.length;
            if (len > 0) {
                var o = [];
                for (var i = 0; i < len; i++) {
                    o.push('0');
                }
                o.push(hex);
                hex = o.join('');
            }
            return hex;
        };
        ColorPicker.prototype.HEXtoRGB = function (hex) {
            var hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
            return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF) };
        };
        ColorPicker.prototype.HEXtoHSB = function (hex) {
            return this.RGBtoHSB(this.HEXtoRGB(hex));
        };
        ColorPicker.prototype.RGBtoHSB = function (rgb) {
            var hsb = {
                h: 0,
                s: 0,
                b: 0
            };
            var min = Math.min(rgb.r, rgb.g, rgb.b);
            var max = Math.max(rgb.r, rgb.g, rgb.b);
            var delta = max - min;
            hsb.b = max;
            hsb.s = max != 0 ? 255 * delta / max : 0;
            if (hsb.s != 0) {
                if (rgb.r == max) {
                    hsb.h = (rgb.g - rgb.b) / delta;
                }
                else if (rgb.g == max) {
                    hsb.h = 2 + (rgb.b - rgb.r) / delta;
                }
                else {
                    hsb.h = 4 + (rgb.r - rgb.g) / delta;
                }
            }
            else {
                hsb.h = -1;
            }
            hsb.h *= 60;
            if (hsb.h < 0) {
                hsb.h += 360;
            }
            hsb.s *= 100 / 255;
            hsb.b *= 100 / 255;
            return hsb;
        };
        ColorPicker.prototype.HSBtoRGB = function (hsb) {
            var rgb = {
                r: null, g: null, b: null
            };
            var h = hsb.h;
            var s = hsb.s * 255 / 100;
            var v = hsb.b * 255 / 100;
            if (s == 0) {
                rgb = {
                    r: v,
                    g: v,
                    b: v
                };
            }
            else {
                var t1 = v;
                var t2 = (255 - s) * v / 255;
                var t3 = (t1 - t2) * (h % 60) / 60;
                if (h == 360)
                    h = 0;
                if (h < 60) {
                    rgb.r = t1;
                    rgb.b = t2;
                    rgb.g = t2 + t3;
                }
                else if (h < 120) {
                    rgb.g = t1;
                    rgb.b = t2;
                    rgb.r = t1 - t3;
                }
                else if (h < 180) {
                    rgb.g = t1;
                    rgb.r = t2;
                    rgb.b = t2 + t3;
                }
                else if (h < 240) {
                    rgb.b = t1;
                    rgb.r = t2;
                    rgb.g = t1 - t3;
                }
                else if (h < 300) {
                    rgb.b = t1;
                    rgb.g = t2;
                    rgb.r = t2 + t3;
                }
                else if (h < 360) {
                    rgb.r = t1;
                    rgb.g = t2;
                    rgb.b = t1 - t3;
                }
                else {
                    rgb.r = 0;
                    rgb.g = 0;
                    rgb.b = 0;
                }
            }
            return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
        };
        ColorPicker.prototype.RGBtoHEX = function (rgb) {
            var hex = [
                rgb.r.toString(16),
                rgb.g.toString(16),
                rgb.b.toString(16)
            ];
            for (var key in hex) {
                if (hex[key].length == 1) {
                    hex[key] = '0' + hex[key];
                }
            }
            return hex.join('');
        };
        ColorPicker.prototype.HSBtoHEX = function (hsb) {
            return this.RGBtoHEX(this.HSBtoRGB(hsb));
        };
        ColorPicker.prototype.onOverlayHide = function () {
            this.unbindScrollListener();
            this.unbindDocumentResizeListener();
            this.unbindDocumentClickListener();
            this.overlay = null;
        };
        ColorPicker.prototype.ngOnDestroy = function () {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            if (this.overlay && this.autoZIndex) {
                utils.ZIndexUtils.clear(this.overlay);
            }
            this.restoreOverlayAppend();
            this.onOverlayHide();
        };
        return ColorPicker;
    }());
    ColorPicker.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColorPicker, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.PrimeNGConfig }, { token: i1__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ColorPicker.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ColorPicker, selector: "p-colorPicker", inputs: { style: "style", styleClass: "styleClass", inline: "inline", format: "format", appendTo: "appendTo", disabled: "disabled", tabindex: "tabindex", inputId: "inputId", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onChange: "onChange", onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, providers: [COLORPICKER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputViewChild", first: true, predicate: ["input"], descendants: true }, { propertyName: "colorSelector", first: true, predicate: ["colorSelector"], descendants: true }, { propertyName: "colorHandle", first: true, predicate: ["colorHandle"], descendants: true }, { propertyName: "hue", first: true, predicate: ["hue"], descendants: true }, { propertyName: "hueHandle", first: true, predicate: ["hueHandle"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'p-colorpicker p-component':true,'p-colorpicker-overlay':!inline,'p-colorpicker-dragging':colorDragging||hueDragging}\">\n            <input #input type=\"text\" *ngIf=\"!inline\" class=\"p-colorpicker-preview p-inputtext\" readonly=\"readonly\" [ngClass]=\"{'p-disabled': disabled}\"\n                (focus)=\"onInputFocus()\" (click)=\"onInputClick()\" (keydown)=\"onInputKeydown($event)\" [attr.id]=\"inputId\" [attr.tabindex]=\"tabindex\" [disabled]=\"disabled\"\n                [style.backgroundColor]=\"inputBgColor\">\n            <div *ngIf=\"inline || overlayVisible\" [ngClass]=\"{'p-colorpicker-panel': true, 'p-colorpicker-overlay-panel':!inline, 'p-disabled': disabled}\" (click)=\"onOverlayClick($event)\"\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"inline === true\"\n                    (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\">\n                <div class=\"p-colorpicker-content\">\n                    <div #colorSelector class=\"p-colorpicker-color-selector\" (touchstart)=\"onColorTouchStart($event)\" (touchmove)=\"onMove($event)\" (touchend)=\"onDragEnd()\" (mousedown)=\"onColorMousedown($event)\">\n                        <div class=\"p-colorpicker-color\">\n                            <div #colorHandle class=\"p-colorpicker-color-handle\"></div>\n                        </div>\n                    </div>\n                    <div #hue class=\"p-colorpicker-hue\" (mousedown)=\"onHueMousedown($event)\" (touchstart)=\"onHueTouchStart($event)\" (touchmove)=\"onMove($event)\" (touchend)=\"onDragEnd()\">\n                        <div #hueHandle class=\"p-colorpicker-hue-handle\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-colorpicker{display:inline-block}.p-colorpicker-dragging{cursor:pointer}.p-colorpicker-overlay{position:relative}.p-colorpicker-panel{position:relative;width:193px;height:166px}.p-colorpicker-overlay-panel{position:absolute;top:0;left:0}.p-colorpicker-preview{cursor:pointer}.p-colorpicker-panel .p-colorpicker-content{position:relative}.p-colorpicker-panel .p-colorpicker-color-selector{width:150px;height:150px;top:8px;left:8px;position:absolute}.p-colorpicker-panel .p-colorpicker-color{width:150px;height:150px}.p-colorpicker-panel .p-colorpicker-color-handle{position:absolute;top:0;left:150px;border-radius:100%;width:10px;height:10px;border-width:1px;border-style:solid;margin:-5px 0 0 -5px;cursor:pointer;opacity:.85}.p-colorpicker-panel .p-colorpicker-hue{width:17px;height:150px;top:8px;left:167px;position:absolute;opacity:.85}.p-colorpicker-panel .p-colorpicker-hue-handle{position:absolute;top:150px;left:0;width:21px;margin-left:-2px;margin-top:-5px;height:10px;border-width:2px;border-style:solid;opacity:.85;cursor:pointer}"], directives: [{ type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
            animations.trigger('overlayAnimation', [
                animations.transition(':enter', [
                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                    animations.animate('{{showTransitionParams}}')
                ]),
                animations.transition(':leave', [
                    animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColorPicker, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-colorPicker',
                        template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'p-colorpicker p-component':true,'p-colorpicker-overlay':!inline,'p-colorpicker-dragging':colorDragging||hueDragging}\">\n            <input #input type=\"text\" *ngIf=\"!inline\" class=\"p-colorpicker-preview p-inputtext\" readonly=\"readonly\" [ngClass]=\"{'p-disabled': disabled}\"\n                (focus)=\"onInputFocus()\" (click)=\"onInputClick()\" (keydown)=\"onInputKeydown($event)\" [attr.id]=\"inputId\" [attr.tabindex]=\"tabindex\" [disabled]=\"disabled\"\n                [style.backgroundColor]=\"inputBgColor\">\n            <div *ngIf=\"inline || overlayVisible\" [ngClass]=\"{'p-colorpicker-panel': true, 'p-colorpicker-overlay-panel':!inline, 'p-disabled': disabled}\" (click)=\"onOverlayClick($event)\"\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"inline === true\"\n                    (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\">\n                <div class=\"p-colorpicker-content\">\n                    <div #colorSelector class=\"p-colorpicker-color-selector\" (touchstart)=\"onColorTouchStart($event)\" (touchmove)=\"onMove($event)\" (touchend)=\"onDragEnd()\" (mousedown)=\"onColorMousedown($event)\">\n                        <div class=\"p-colorpicker-color\">\n                            <div #colorHandle class=\"p-colorpicker-color-handle\"></div>\n                        </div>\n                    </div>\n                    <div #hue class=\"p-colorpicker-hue\" (mousedown)=\"onHueMousedown($event)\" (touchstart)=\"onHueTouchStart($event)\" (touchmove)=\"onMove($event)\" (touchend)=\"onDragEnd()\">\n                        <div #hueHandle class=\"p-colorpicker-hue-handle\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('overlayAnimation', [
                                animations.transition(':enter', [
                                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                    animations.animate('{{showTransitionParams}}')
                                ]),
                                animations.transition(':leave', [
                                    animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                                ])
                            ])
                        ],
                        providers: [COLORPICKER_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./colorpicker.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.PrimeNGConfig }, { type: i1__namespace.OverlayService }]; }, propDecorators: { style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], inline: [{
                    type: i0.Input
                }], format: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], onChange: [{
                    type: i0.Output
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], containerViewChild: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], inputViewChild: [{
                    type: i0.ViewChild,
                    args: ['input']
                }], colorSelector: [{
                    type: i0.ViewChild,
                    args: ['colorSelector']
                }], colorHandle: [{
                    type: i0.ViewChild,
                    args: ['colorHandle']
                }], hue: [{
                    type: i0.ViewChild,
                    args: ['hue']
                }], hueHandle: [{
                    type: i0.ViewChild,
                    args: ['hueHandle']
                }] } });
    var ColorPickerModule = /** @class */ (function () {
        function ColorPickerModule() {
        }
        return ColorPickerModule;
    }());
    ColorPickerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColorPickerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ColorPickerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColorPickerModule, declarations: [ColorPicker], imports: [i2.CommonModule], exports: [ColorPicker] });
    ColorPickerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColorPickerModule, imports: [[i2.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColorPickerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule],
                        exports: [ColorPicker],
                        declarations: [ColorPicker]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.COLORPICKER_VALUE_ACCESSOR = COLORPICKER_VALUE_ACCESSOR;
    exports.ColorPicker = ColorPicker;
    exports.ColorPickerModule = ColorPickerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-colorpicker.umd.js.map
