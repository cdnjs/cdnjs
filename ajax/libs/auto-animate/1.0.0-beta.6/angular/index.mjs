import { Input, Directive, NgModule } from '@angular/core';
import autoAnimate from '../index.mjs';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

let AutoAnimateDirective = class AutoAnimateDirective {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        autoAnimate(this.el.nativeElement, this.options || {});
    }
};
__decorate([
    Input()
], AutoAnimateDirective.prototype, "options", void 0);
AutoAnimateDirective = __decorate([
    Directive({
        selector: "[auto-animate]",
    })
], AutoAnimateDirective);
let AutoAnimateModule = class AutoAnimateModule {
};
AutoAnimateModule = __decorate([
    NgModule({
        declarations: [AutoAnimateDirective],
        exports: [AutoAnimateDirective],
    })
], AutoAnimateModule);

export { AutoAnimateDirective, AutoAnimateModule };
