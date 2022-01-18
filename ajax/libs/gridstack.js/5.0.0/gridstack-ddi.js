"use strict";
/**
 * gridstack-ddi.ts 5.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridStackDDI = void 0;
/**
 * Abstract Partial Interface API for drag'n'drop plugin - look at GridStackDD and HTML5 / Jquery implementation versions
 */
class GridStackDDI {
    /** call this method to register your plugin instead of the default no-op one */
    static registerPlugin(pluginClass) {
        GridStackDDI.ddi = new pluginClass();
        return GridStackDDI.ddi;
    }
    /** get the current registered plugin to use */
    static get() {
        return GridStackDDI.ddi || GridStackDDI.registerPlugin(GridStackDDI);
    }
    /** removes any drag&drop present (called during destroy) */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    remove(el) {
        return this; // no-op for static grids
    }
}
exports.GridStackDDI = GridStackDDI;
//# sourceMappingURL=gridstack-ddi.js.map