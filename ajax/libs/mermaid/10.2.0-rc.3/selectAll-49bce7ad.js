import { _ as Selection, $ as root, a0 as array } from "./mermaid-d1efb8f7.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
