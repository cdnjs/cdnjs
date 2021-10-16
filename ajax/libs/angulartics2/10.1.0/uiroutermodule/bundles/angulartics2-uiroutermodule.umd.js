(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2'), require('@uirouter/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('angulartics2/uiroutermodule', ['exports', '@angular/core', 'angulartics2', '@uirouter/core', 'rxjs'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.uiroutermodule = {}), global.ng.core, global.angulartics2, global.i1, global.rxjs));
}(this, (function (exports, i0, angulartics2, i1, rxjs) { 'use strict';

    /**
     * Track Route changes for applications using UI-Router
     *
     * @link https://ui-router.github.io/ng2/docs/latest/
     *
     * referenced: https://github.com/ui-router/sample-app-angular/blob/9adb533b85c0f0fccef23968489cca0a5ec84654/src/app/util/ga.ts
     */
    var UIRouterTracking = /** @class */ (function () {
        function UIRouterTracking(transitionService) {
            this.transitionService = transitionService;
        }
        UIRouterTracking.prototype.path = function (trans) {
            return trans.$to().url.format(trans.params());
        };
        UIRouterTracking.prototype.trackLocation = function (settings) {
            var _this = this;
            var subject = new rxjs.Subject();
            this.transitionService.onSuccess({}, function (trans) {
                return subject.next({ url: _this.path(trans) });
            }, {
                priority: -10000,
            });
            return subject;
        };
        UIRouterTracking.prototype.prepareExternalUrl = function (url) {
            return url;
        };
        return UIRouterTracking;
    }());
    UIRouterTracking.ɵprov = i0.ɵɵdefineInjectable({ factory: function UIRouterTracking_Factory() { return new UIRouterTracking(i0.ɵɵinject(i1.TransitionService)); }, token: UIRouterTracking, providedIn: "root" });
    UIRouterTracking.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    UIRouterTracking.ctorParameters = function () { return [
        { type: i1.TransitionService }
    ]; };

    var Angulartics2UirouterModule = /** @class */ (function () {
        function Angulartics2UirouterModule() {
        }
        Angulartics2UirouterModule.forRoot = function (settings) {
            if (settings === void 0) { settings = {}; }
            return {
                ngModule: Angulartics2UirouterModule,
                providers: [
                    { provide: angulartics2.ANGULARTICS2_TOKEN, useValue: { settings: settings } },
                    { provide: angulartics2.RouterlessTracking, useClass: UIRouterTracking },
                    angulartics2.Angulartics2,
                ],
            };
        };
        return Angulartics2UirouterModule;
    }());
    Angulartics2UirouterModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [angulartics2.Angulartics2OnModule],
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2UirouterModule = Angulartics2UirouterModule;
    exports.UIRouterTracking = UIRouterTracking;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-uiroutermodule.umd.js.map
