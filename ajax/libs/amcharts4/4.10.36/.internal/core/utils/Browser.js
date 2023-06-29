// Also detects iOS
export function isSafari() {
    return /apple/i.test(navigator.vendor);
}
export function isInternetExplorer() {
    return /MSIE |Trident\//.test(navigator.userAgent);
}
//# sourceMappingURL=Browser.js.map