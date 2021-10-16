import { NgModule } from '@angular/core';
import { ANGULARTICS2_TOKEN, RouterlessTracking, Angulartics2, Angulartics2OnModule } from 'angulartics2';

class Angulartics2RouterlessModule {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2RouterlessModule,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                RouterlessTracking,
                Angulartics2,
            ],
        };
    }
}
Angulartics2RouterlessModule.decorators = [
    { type: NgModule, args: [{
                imports: [Angulartics2OnModule],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2RouterlessModule };
//# sourceMappingURL=angulartics2-routerlessmodule.js.map
