var swipeBackExcludedSelector = "input, textarea, [data-vkui-swipe-back=false]";
export function swipeBackExcluded(e) {
  var target = e.originalEvent.target;
  return Boolean(target === null || target === void 0 ? void 0 : target.closest(swipeBackExcludedSelector));
}
//# sourceMappingURL=utils.js.map