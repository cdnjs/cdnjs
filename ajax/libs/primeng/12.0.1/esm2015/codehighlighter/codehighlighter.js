import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class CodeHighlighter {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        if (window['Prism']) {
            window['Prism'].highlightElement(this.el.nativeElement);
        }
    }
}
CodeHighlighter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CodeHighlighter, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
CodeHighlighter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: CodeHighlighter, selector: "[pCode]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CodeHighlighter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pCode]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
export class CodeHighlighterModule {
}
CodeHighlighterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CodeHighlighterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CodeHighlighterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CodeHighlighterModule, declarations: [CodeHighlighter], imports: [CommonModule], exports: [CodeHighlighter] });
CodeHighlighterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CodeHighlighterModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CodeHighlighterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [CodeHighlighter],
                    declarations: [CodeHighlighter]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWhpZ2hsaWdodGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQTZCLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLL0MsTUFBTSxPQUFPLGVBQWU7SUFFeEIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBSSxDQUFDO0lBRXRDLGVBQWU7UUFDWCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7OzRHQVJRLGVBQWU7Z0dBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUgzQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO2lCQUN0Qjs7QUFpQkQsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGlCQWhCckIsZUFBZSxhQVlkLFlBQVksYUFaYixlQUFlO21IQWdCZixxQkFBcUIsWUFKckIsQ0FBQyxZQUFZLENBQUM7MkZBSWQscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcENvZGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2RlSGlnaGxpZ2h0ZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3dbJ1ByaXNtJ10pIHtcbiAgICAgICAgICAgIHdpbmRvd1snUHJpc20nXS5oaWdobGlnaHRFbGVtZW50KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NvZGVIaWdobGlnaHRlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ29kZUhpZ2hsaWdodGVyXVxufSlcbmV4cG9ydCBjbGFzcyBDb2RlSGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG5cblxuIl19