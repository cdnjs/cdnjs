import { ModuleWithProviders } from '@angular/core';
import { Angulartics2Settings } from './angulartics2-config';
import * as i0 from "@angular/core";
import * as i1 from "./angulartics2On";
export declare class Angulartics2Module {
    static forRoot(settings?: Partial<Angulartics2Settings>): ModuleWithProviders<Angulartics2Module>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2Module, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<Angulartics2Module, never, [typeof i1.Angulartics2OnModule], [typeof i1.Angulartics2On]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<Angulartics2Module>;
}
