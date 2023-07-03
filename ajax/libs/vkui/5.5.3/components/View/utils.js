var swipeBackExcludedSelector = "input, textarea, [data-vkui-swipe-back=false]";
export function swipeBackExcluded(e) {
    var _target_closest;
    var target = e.originalEvent.target;
    // eslint-disable-next-line no-restricted-properties
    return Boolean(target === null || target === void 0 ? void 0 : (_target_closest = target.closest) === null || _target_closest === void 0 ? void 0 : _target_closest.call(target, swipeBackExcludedSelector));
}

//# sourceMappingURL=utils.js.map