import { p as promiseResolve, b as bootstrapLazy } from './index-BNvuUjt3.js';
export { s as setNonce } from './index-BNvuUjt3.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

/*
 Stencil Client Patch Browser v4.30.0 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["ion-icon",[[1,"ion-icon",{"mode":[1025],"color":[1],"ios":[1],"md":[1],"flipRtl":[4,"flip-rtl"],"name":[513],"src":[1],"icon":[8],"size":[1],"lazy":[4],"sanitize":[4],"svgContent":[32],"isVisible":[32]},null,{"name":["loadIcon"],"src":["loadIcon"],"icon":["loadIcon"],"ios":["loadIcon"],"md":["loadIcon"]}]]]], options);
});
