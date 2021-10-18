import { AfterContentInit, ElementRef, Renderer2 } from '@angular/core';
import { Angulartics2 } from './angulartics2-core';
export declare class Angulartics2On implements AfterContentInit {
    private elRef;
    private angulartics2;
    private renderer;
    angulartics2On: string;
    angularticsAction: string;
    angularticsCategory: string;
    angularticsLabel: string;
    angularticsValue: string;
    angularticsProperties: any;
    constructor(elRef: ElementRef, angulartics2: Angulartics2, renderer: Renderer2);
    ngAfterContentInit(): void;
    eventTrack(event: Event): void;
}
export declare class Angulartics2OnModule {
}
