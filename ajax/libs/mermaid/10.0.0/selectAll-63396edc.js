import { S as Selection, o as root, q as array } from "./config-69acf485.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
//# sourceMappingURL=selectAll-63396edc.js.map
