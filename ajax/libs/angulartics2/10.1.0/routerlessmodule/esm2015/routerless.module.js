import { NgModule } from '@angular/core';
import { Angulartics2, Angulartics2OnModule, ANGULARTICS2_TOKEN, RouterlessTracking, } from 'angulartics2';
export class Angulartics2RouterlessModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVybGVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRlcmxlc3Ntb2R1bGUvcm91dGVybGVzcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFFcEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixHQUNuQixNQUFNLGNBQWMsQ0FBQztBQUt0QixNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQ1osV0FBMEMsRUFBRTtRQUU1QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3ZELGtCQUFrQjtnQkFDbEIsWUFBWTthQUNiO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWZGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFuZ3VsYXJ0aWNzMixcbiAgQW5ndWxhcnRpY3MyT25Nb2R1bGUsXG4gIEFuZ3VsYXJ0aWNzMlNldHRpbmdzLFxuICBBTkdVTEFSVElDUzJfVE9LRU4sXG4gIFJvdXRlcmxlc3NUcmFja2luZyxcbn0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FuZ3VsYXJ0aWNzMk9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyUm91dGVybGVzc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHNldHRpbmdzOiBQYXJ0aWFsPEFuZ3VsYXJ0aWNzMlNldHRpbmdzPiA9IHt9LFxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFuZ3VsYXJ0aWNzMlJvdXRlcmxlc3NNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJ0aWNzMlJvdXRlcmxlc3NNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBTkdVTEFSVElDUzJfVE9LRU4sIHVzZVZhbHVlOiB7IHNldHRpbmdzIH0gfSxcbiAgICAgICAgUm91dGVybGVzc1RyYWNraW5nLFxuICAgICAgICBBbmd1bGFydGljczIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==