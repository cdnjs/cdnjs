import { c as baseClone } from "./graph-03626afa.js";
var CLONE_SYMBOLS_FLAG = 4;
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}
export {
  clone as c
};
