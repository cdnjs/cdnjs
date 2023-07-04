import { a2 as Selection, a3 as root, a4 as array } from "./mermaid-21949a01.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
