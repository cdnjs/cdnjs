import { a0 as Selection, a1 as root, a2 as array } from "./mermaid-c66525a4.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
