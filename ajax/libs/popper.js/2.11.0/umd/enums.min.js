/**
 * @popperjs/core v2.11.0 - MIT License
 */

"use strict";!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){var t=["top","bottom","right","left"],r=t.reduce((function(e,t){return e.concat([t+"-start",t+"-end"])}),[]),a=[].concat(t,["auto"]).reduce((function(e,t){return e.concat([t,t+"-start",t+"-end"])}),[]);e.afterMain="afterMain",e.afterRead="afterRead",e.afterWrite="afterWrite",e.auto="auto",e.basePlacements=t,e.beforeMain="beforeMain",e.beforeRead="beforeRead",e.beforeWrite="beforeWrite",e.bottom="bottom",e.clippingParents="clippingParents",e.end="end",e.left="left",e.main="main",e.modifierPhases="beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),e.placements=a,e.popper="popper",e.read="read",e.reference="reference",e.right="right",e.start="start",e.top="top",e.variationPlacements=r,e.viewport="viewport",e.write="write",Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=enums.min.js.map
