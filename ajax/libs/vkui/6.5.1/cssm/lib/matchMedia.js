export function matchMediaListAddListener(mediaQueryList, listener) {
    mediaQueryList.addEventListener ? mediaQueryList.addEventListener('change', listener) : mediaQueryList.addListener(listener);
}
export function matchMediaListRemoveListener(mediaQueryList, listener) {
    mediaQueryList.removeEventListener ? mediaQueryList.removeEventListener('change', listener) : mediaQueryList.removeListener(listener);
}

//# sourceMappingURL=matchMedia.js.map