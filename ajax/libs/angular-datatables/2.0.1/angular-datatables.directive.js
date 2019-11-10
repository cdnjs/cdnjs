/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
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
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import 'jquery';
import 'datatables.net';
export var DataTableDirective = (function () {
    function DataTableDirective(el) {
        this.el = el;
        this.dtOptions = $.extend(true, {}, $.fn.DataTable.defaults);
    }
    DataTableDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.dtInstance = new Promise(function (resolve, reject) {
            Promise.resolve(_this.dtOptions).then(function (dtOptions) {
                var dt = $(_this.el.nativeElement).DataTable(dtOptions);
                resolve(dt);
            });
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DataTableDirective.prototype, "dtOptions", void 0);
    DataTableDirective = __decorate([
        Directive({
            selector: '[datatable]'
        }),
        __param(0, Inject(ElementRef)), 
        __metadata('design:paramtypes', [ElementRef])
    ], DataTableDirective);
    return DataTableDirective;
}());
//# sourceMappingURL=angular-datatables.directive.js.map