import { NgModule } from '@angular/core';
import { AngularRouterTracking } from './angular-router';
import { Angulartics2 } from './angulartics2-core';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2On, Angulartics2OnModule } from './angulartics2On';
import { RouterlessTracking } from './routerless';
export class Angulartics2Module {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                { provide: RouterlessTracking, useClass: AngularRouterTracking },
                Angulartics2,
            ],
        };
    }
}
Angulartics2Module.decorators = [
    { type: NgModule, args: [{
                imports: [Angulartics2OnModule],
                exports: [Angulartics2On],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29yZS9hbmd1bGFydGljczIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBTWxELE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FDWixXQUEwQyxFQUFFO1FBRTVDLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdkQsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFO2dCQUNoRSxZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBaEJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDL0IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhclJvdXRlclRyYWNraW5nIH0gZnJvbSAnLi9hbmd1bGFyLXJvdXRlcic7XG5pbXBvcnQgeyBBbmd1bGFydGljczJTZXR0aW5ncyB9IGZyb20gJy4vYW5ndWxhcnRpY3MyLWNvbmZpZyc7XG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuL2FuZ3VsYXJ0aWNzMi1jb3JlJztcbmltcG9ydCB7IEFOR1VMQVJUSUNTMl9UT0tFTiB9IGZyb20gJy4vYW5ndWxhcnRpY3MyLXRva2VuJztcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMk9uLCBBbmd1bGFydGljczJPbk1vZHVsZSB9IGZyb20gJy4vYW5ndWxhcnRpY3MyT24nO1xuaW1wb3J0IHsgUm91dGVybGVzc1RyYWNraW5nIH0gZnJvbSAnLi9yb3V0ZXJsZXNzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FuZ3VsYXJ0aWNzMk9uTW9kdWxlXSxcbiAgZXhwb3J0czogW0FuZ3VsYXJ0aWNzMk9uXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgc2V0dGluZ3M6IFBhcnRpYWw8QW5ndWxhcnRpY3MyU2V0dGluZ3M+ID0ge30sXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QW5ndWxhcnRpY3MyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBbmd1bGFydGljczJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBTkdVTEFSVElDUzJfVE9LRU4sIHVzZVZhbHVlOiB7IHNldHRpbmdzIH0gfSxcbiAgICAgICAgeyBwcm92aWRlOiBSb3V0ZXJsZXNzVHJhY2tpbmcsIHVzZUNsYXNzOiBBbmd1bGFyUm91dGVyVHJhY2tpbmcgfSxcbiAgICAgICAgQW5ndWxhcnRpY3MyLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=