import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
export class Skeleton {
    constructor() {
        this.shape = "rectangle";
        this.animation = "wave";
        this.borderRadius = null;
        this.size = null;
        this.width = "100%";
        this.height = "1rem";
    }
    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-animation-none': this.animation === 'none'
        };
    }
    containerStyle() {
        if (this.size)
            return Object.assign(Object.assign({}, this.style), { width: this.size, height: this.size, borderRadius: this.borderRadius });
        else
            return Object.assign(Object.assign({}, this.style), { width: this.width, height: this.height, borderRadius: this.borderRadius });
    }
}
Skeleton.decorators = [
    { type: Component, args: [{
                selector: 'p-skeleton',
                template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()">
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-skeleton{overflow:hidden;position:relative}.p-skeleton:after{animation:p-skeleton-animation 1.2s infinite;content:\"\";height:100%;left:0;position:absolute;right:0;top:0;transform:translateX(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translateX(-100%)}to{transform:translateX(100%)}}"]
            },] }
];
Skeleton.propDecorators = {
    styleClass: [{ type: Input }],
    style: [{ type: Input }],
    shape: [{ type: Input }],
    animation: [{ type: Input }],
    borderRadius: [{ type: Input }],
    size: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }]
};
export class SkeletonModule {
}
SkeletonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Skeleton],
                declarations: [Skeleton]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24uanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NrZWxldG9uLyIsInNvdXJjZXMiOlsic2tlbGV0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVkvQyxNQUFNLE9BQU8sUUFBUTtJQVZyQjtRQWdCYSxVQUFLLEdBQVcsV0FBVyxDQUFDO1FBRTVCLGNBQVMsR0FBVyxNQUFNLENBQUM7UUFFM0IsaUJBQVksR0FBVyxJQUFJLENBQUM7UUFFNUIsU0FBSSxHQUFXLElBQUksQ0FBQztRQUVwQixVQUFLLEdBQVcsTUFBTSxDQUFDO1FBRXZCLFdBQU0sR0FBVyxNQUFNLENBQUM7SUFnQnJDLENBQUM7SUFkRyxjQUFjO1FBQ1YsT0FBTztZQUNILHdCQUF3QixFQUFFLElBQUk7WUFDOUIsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBQzVDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTTtTQUN6RCxDQUFDO0lBQ04sQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQ0wsdUNBQVcsSUFBSSxDQUFDLEtBQUssS0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBRTs7WUFFN0YsdUNBQVcsSUFBSSxDQUFDLEtBQUssS0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBRTtJQUM1RyxDQUFDOzs7WUF6Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7OztLQUdUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFFeEM7Ozt5QkFHSSxLQUFLO29CQUVMLEtBQUs7b0JBRUwsS0FBSzt3QkFFTCxLQUFLOzJCQUVMLEtBQUs7bUJBRUwsS0FBSztvQkFFTCxLQUFLO3FCQUVMLEtBQUs7O0FBdUJWLE1BQU0sT0FBTyxjQUFjOzs7WUFMMUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1za2VsZXRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJjb250YWluZXJTdHlsZSgpXCI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9za2VsZXRvbi5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTa2VsZXRvbiB7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc2hhcGU6IHN0cmluZyA9IFwicmVjdGFuZ2xlXCI7XG5cbiAgICBASW5wdXQoKSBhbmltYXRpb246IHN0cmluZyA9IFwid2F2ZVwiO1xuXG4gICAgQElucHV0KCkgYm9yZGVyUmFkaXVzOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmcgPSBcIjEwMCVcIjtcbiAgICBcbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZyA9IFwiMXJlbVwiO1xuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1za2VsZXRvbiBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1za2VsZXRvbi1jaXJjbGUnOiB0aGlzLnNoYXBlID09PSAnY2lyY2xlJyxcbiAgICAgICAgICAgICdwLXNrZWxldG9uLWFuaW1hdGlvbi1ub25lJzogdGhpcy5hbmltYXRpb24gPT09ICdub25lJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnRhaW5lclN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5zaXplKVxuICAgICAgICAgICAgICAgIHJldHVybiB7Li4udGhpcy5zdHlsZSwgd2lkdGg6IHRoaXMuc2l6ZSwgaGVpZ2h0OiB0aGlzLnNpemUsIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXN9O1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB7Li4udGhpcy5zdHlsZSwgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHQsIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXN9O1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU2tlbGV0b25dLFxuICAgIGRlY2xhcmF0aW9uczogW1NrZWxldG9uXVxufSlcbmV4cG9ydCBjbGFzcyBTa2VsZXRvbk1vZHVsZSB7IH1cbiJdfQ==