import { S as Selection, B as root, C as array } from "./commonDb-89160e91.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
//# sourceMappingURL=selectAll-7c7a6d44.js.map
