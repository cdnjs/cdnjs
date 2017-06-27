export const isBot = !("onscroll" in window) || /glebot/.test(navigator.userAgent);

export const callCallback = function (callback, argument) {
    if (callback) { callback(argument); }
};