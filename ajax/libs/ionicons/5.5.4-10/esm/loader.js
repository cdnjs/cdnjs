import { p as promiseResolve, b as bootstrapLazy } from './index-f392fe63.js';

/*
 Stencil Client Patch Esm v2.10.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["ion-icon",[[1,"ion-icon",{"mode":[1025],"color":[1],"ariaLabel":[1537,"aria-label"],"ariaHidden":[513,"aria-hidden"],"ios":[1],"md":[1],"flipRtl":[4,"flip-rtl"],"name":[513],"src":[1],"icon":[8],"size":[1],"lazy":[4],"sanitize":[4],"svgContent":[32],"isVisible":[32]}]]]], options);
  });
};

export { defineCustomElements };
