import { S as Selection, o as root, q as array } from "./config-59a2f5c3.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
//# sourceMappingURL=selectAll-e68e5c64.js.map
