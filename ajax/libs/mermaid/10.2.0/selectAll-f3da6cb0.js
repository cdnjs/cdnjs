import { a3 as Selection, a4 as root, a5 as array } from "./mermaid-4b4b971d.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
