'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-76b01094.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["ion-icon.cjs",[[1,"ion-icon",{"mode":[1025],"color":[1],"ariaLabel":[1537,"aria-label"],"ios":[1],"md":[1],"flipRtl":[4,"flip-rtl"],"name":[1],"src":[1],"icon":[8],"size":[1],"lazy":[4],"svgContent":[32],"isVisible":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
