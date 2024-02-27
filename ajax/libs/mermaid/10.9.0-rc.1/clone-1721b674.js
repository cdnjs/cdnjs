import { c as baseClone } from "./graph-d6862e40.js";
var CLONE_SYMBOLS_FLAG = 4;
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}
export {
  clone as c
};
