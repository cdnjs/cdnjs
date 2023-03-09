"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavId = getNavId;
function getNavId(props, warn) {
  var id = props.nav || props.id;
  if (process.env.NODE_ENV === 'development' && !id && warn) {
    warn('Навигационный элемент должен иметь свойство "nav" или "id"', 'error');
  }
  return id;
}
//# sourceMappingURL=getNavId.js.map