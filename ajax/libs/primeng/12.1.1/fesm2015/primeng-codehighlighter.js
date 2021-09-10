import * as i0 from '@angular/core';
import { Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class CodeHighlighter {
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
CodeHighlighter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: CodeHighlighter, selector: "[pCode]", host: { classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CodeHighlighter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pCode]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
class CodeHighlighterModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { CodeHighlighter, CodeHighlighterModule };
//# sourceMappingURL=primeng-codehighlighter.js.map
