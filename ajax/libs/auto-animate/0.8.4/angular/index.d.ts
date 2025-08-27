import { AfterViewInit, ElementRef, OnDestroy } from "@angular/core";
import { AutoAnimateOptions } from "../index";
export declare class AutoAnimateDirective implements AfterViewInit, OnDestroy {
    private el;
    options?: Partial<AutoAnimateOptions>;
    private controller?;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class AutoAnimateModule {
}
