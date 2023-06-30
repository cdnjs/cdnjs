import { a3 as Selection, a4 as root, a5 as array } from "./mermaid-d4cb7d83.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
