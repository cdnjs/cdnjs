import { AfterContentInit, ElementRef, Renderer2 } from '@angular/core';
import { Angulartics2 } from './angulartics2-core';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2On, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Angulartics2On, "[angulartics2On]", never, { "angulartics2On": "angulartics2On"; "angularticsAction": "angularticsAction"; "angularticsCategory": "angularticsCategory"; "angularticsLabel": "angularticsLabel"; "angularticsValue": "angularticsValue"; "angularticsProperties": "angularticsProperties"; }, {}, never>;
}
export declare class Angulartics2OnModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2OnModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<Angulartics2OnModule, [typeof Angulartics2On], never, [typeof Angulartics2On]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<Angulartics2OnModule>;
}
