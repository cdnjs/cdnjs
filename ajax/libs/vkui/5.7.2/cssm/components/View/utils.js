const swipeBackExcludedSelector = 'input, textarea, [data-vkui-swipe-back=false]';
export function swipeBackExcluded(e) {
    const target = e.originalEvent.target;
    // eslint-disable-next-line no-restricted-properties
    return Boolean(target?.closest?.(swipeBackExcludedSelector));
}

//# sourceMappingURL=utils.js.map