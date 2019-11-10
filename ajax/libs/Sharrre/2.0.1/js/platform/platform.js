var SharrrePlatform = SharrrePlatform || (function () {
    var platforms = {};

    return {
        'register': function (name, constructor) {
            platforms[name] = constructor;
        },
        'get': function (name, options) {
            if (!platforms[name]) {
                console.error("Sharrre - No platform found for " + name);
                return false;
            }
            return new platforms[name](options);
        }
    }
})();