import { AfterViewInit, ElementRef } from "@angular/core";
import { AutoAnimateOptions } from "../index";
export declare class AutoAnimateDirective implements AfterViewInit {
    private el;
    options?: Partial<AutoAnimateOptions>;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
}
export declare class AutoAnimateModule {
}
