/**
 * gridstack-ddi.ts 5.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { GridItemHTMLElement } from './types';
/**
 * Abstract Partial Interface API for drag'n'drop plugin - look at GridStackDD and HTML5 / Jquery implementation versions
 */
export declare class GridStackDDI {
    protected static ddi: GridStackDDI;
    /** call this method to register your plugin instead of the default no-op one */
    static registerPlugin(pluginClass: typeof GridStackDDI): GridStackDDI;
    /** get the current registered plugin to use */
    static get(): GridStackDDI;
    /** removes any drag&drop present (called during destroy) */
    remove(el: GridItemHTMLElement): GridStackDDI;
}
