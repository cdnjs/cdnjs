import { Directive, ElementRef, Input, NgModule, Renderer2, } from '@angular/core';
import { Angulartics2 } from './angulartics2-core';
export class Angulartics2On {
    constructor(elRef, angulartics2, renderer) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.renderer = renderer;
        this.angularticsProperties = {};
    }
    ngAfterContentInit() {
        this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', (event) => this.eventTrack(event));
    }
    eventTrack(event) {
        const action = this.angularticsAction; // || this.inferEventName();
        const properties = Object.assign(Object.assign({}, this.angularticsProperties), { eventType: event.type });
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action,
            properties,
        });
    }
}
Angulartics2On.decorators = [
    { type: Directive, args: [{ selector: '[angulartics2On]' },] }
];
Angulartics2On.ctorParameters = () => [
    { type: ElementRef },
    { type: Angulartics2 },
    { type: Renderer2 }
];
Angulartics2On.propDecorators = {
    angulartics2On: [{ type: Input, args: ['angulartics2On',] }],
    angularticsAction: [{ type: Input }],
    angularticsCategory: [{ type: Input }],
    angularticsLabel: [{ type: Input }],
    angularticsValue: [{ type: Input }],
    angularticsProperties: [{ type: Input }]
};
export class Angulartics2OnModule {
}
Angulartics2OnModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Angulartics2On],
                exports: [Angulartics2On],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyT24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvcmUvYW5ndWxhcnRpY3MyT24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELE1BQU0sT0FBTyxjQUFjO0lBU3pCLFlBQ1UsS0FBaUIsRUFDakIsWUFBMEIsRUFDMUIsUUFBbUI7UUFGbkIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBTHBCLDBCQUFxQixHQUFRLEVBQUUsQ0FBQztJQU1yQyxDQUFDO0lBRUwsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFDeEIsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEVBQzlCLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFZO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLDRCQUE0QjtRQUNuRSxNQUFNLFVBQVUsbUNBQ1gsSUFBSSxDQUFDLHFCQUFxQixLQUM3QixTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksR0FDdEIsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUMxQztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNoQyxNQUFNO1lBQ04sVUFBVTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQTdDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7OztZQVB6QyxVQUFVO1lBS0gsWUFBWTtZQUZuQixTQUFTOzs7NkJBT1IsS0FBSyxTQUFDLGdCQUFnQjtnQ0FDdEIsS0FBSztrQ0FDTCxLQUFLOytCQUNMLEtBQUs7K0JBQ0wsS0FBSztvQ0FDTCxLQUFLOztBQXNEUixNQUFNLE9BQU8sb0JBQW9COzs7WUFKaEMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdNb2R1bGUsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuL2FuZ3VsYXJ0aWNzMi1jb3JlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2FuZ3VsYXJ0aWNzMk9uXScgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJPbiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnYW5ndWxhcnRpY3MyT24nKSBhbmd1bGFydGljczJPbjogc3RyaW5nO1xuICBASW5wdXQoKSBhbmd1bGFydGljc0FjdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBhbmd1bGFydGljc0NhdGVnb3J5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFuZ3VsYXJ0aWNzTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgYW5ndWxhcnRpY3NWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBhbmd1bGFydGljc1Byb3BlcnRpZXM6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICB0aGlzLmFuZ3VsYXJ0aWNzMk9uIHx8ICdjbGljaycsXG4gICAgICAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmV2ZW50VHJhY2soZXZlbnQpLFxuICAgICk7XG4gIH1cblxuICBldmVudFRyYWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuYW5ndWxhcnRpY3NBY3Rpb247IC8vIHx8IHRoaXMuaW5mZXJFdmVudE5hbWUoKTtcbiAgICBjb25zdCBwcm9wZXJ0aWVzOiBhbnkgPSB7XG4gICAgICAuLi50aGlzLmFuZ3VsYXJ0aWNzUHJvcGVydGllcyxcbiAgICAgIGV2ZW50VHlwZTogZXZlbnQudHlwZSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuYW5ndWxhcnRpY3NDYXRlZ29yeSkge1xuICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSA9IHRoaXMuYW5ndWxhcnRpY3NDYXRlZ29yeTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYW5ndWxhcnRpY3NMYWJlbCkge1xuICAgICAgcHJvcGVydGllcy5sYWJlbCA9IHRoaXMuYW5ndWxhcnRpY3NMYWJlbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuYW5ndWxhcnRpY3NWYWx1ZSkge1xuICAgICAgcHJvcGVydGllcy52YWx1ZSA9IHRoaXMuYW5ndWxhcnRpY3NWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrLm5leHQoe1xuICAgICAgYWN0aW9uLFxuICAgICAgcHJvcGVydGllcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qcHJpdmF0ZSBpc0NvbW1hbmQoKSB7XG4gICAgcmV0dXJuIFsnYTonLCAnYnV0dG9uOicsICdidXR0b246YnV0dG9uJywgJ2J1dHRvbjpzdWJtaXQnLCAnaW5wdXQ6YnV0dG9uJywgJ2lucHV0OnN1Ym1pdCddLmluZGV4T2YoXG4gICAgICBnZXRET00oKS50YWdOYW1lKHRoaXMuZWwpLnRvTG93ZXJDYXNlKCkgKyAnOicgKyAoZ2V0RE9NKCkudHlwZSh0aGlzLmVsKSB8fCAnJykpID49IDA7XG4gIH1cblxuICBwcml2YXRlIGluZmVyRXZlbnROYW1lKCkge1xuICAgIGlmICh0aGlzLmlzQ29tbWFuZCgpKSByZXR1cm4gZ2V0RE9NKCkuZ2V0VGV4dCh0aGlzLmVsKSB8fCBnZXRET00oKS5nZXRWYWx1ZSh0aGlzLmVsKTtcbiAgICByZXR1cm4gZ2V0RE9NKCkuZ2V0UHJvcGVydHkodGhpcy5lbCwgJ2lkJykgfHwgZ2V0RE9NKCkuZ2V0UHJvcGVydHkodGhpcy5lbCwgJ25hbWUnKSB8fCBnZXRET00oKS50YWdOYW1lKHRoaXMuZWwpO1xuICB9Ki9cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQW5ndWxhcnRpY3MyT25dLFxuICBleHBvcnRzOiBbQW5ndWxhcnRpY3MyT25dLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJPbk1vZHVsZSB7fVxuIl19