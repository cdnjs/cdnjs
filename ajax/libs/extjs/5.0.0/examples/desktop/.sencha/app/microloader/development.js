/**
 * Sencha Blink - Development
 * @author Jacky Nguyen <jacky@sencha.com>
 */
(function() {
    var head = document.head || document.getElementsByTagName('head')[0];

    function write(content) {
        document.write(content);
    }

    function addMeta(name, content) {
        var meta = document.createElement('meta');

        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        head.appendChild(meta);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'bootstrap.json', false);
    xhr.send(null);

    var options = eval("(" + xhr.responseText + ")"),
        scripts = options.js || [],
        styleSheets = options.css || [],
        i, ln, path, platform, theme, exclude;

    if(options.platform && options.platforms && options.platforms[options.platform] && options.platforms[options.platform].js) {
        scripts = options.platforms[options.platform].js.concat(scripts);
    }

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(
            document.createTextNode(
                "@media screen and (orientation: portrait) {" +
                    "@-ms-viewport {width: 320px !important;}" +
                "}" +
                "@media screen and (orientation: landscape) {" +
                    "@-ms-viewport {width: 560px !important;}" +
                "}"
            )
        );
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }

    addMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
    addMeta('apple-mobile-web-app-capable', 'yes');
    addMeta('apple-touch-fullscreen', 'yes');

    if (!window.Ext) {
        window.Ext = {};
    }
    Ext.microloaded = true;

    var filterPlatform = window.Ext.filterPlatform = function(platform) {
        var profileMatch = false,
            ua = navigator.userAgent,
            j, jln;

        platform = [].concat(platform);

        function isPhone(ua) {
            var isMobile = /Mobile(\/|\s)/.test(ua);

            // Either:
            // - iOS but not iPad
            // - Android 2
            // - Android with "Mobile" in the UA

            return /(iPhone|iPod)/.test(ua) ||
                      (!/(Silk)/.test(ua) && (/(Android)/.test(ua) && (/(Android 2)/.test(ua) || isMobile))) ||
                      (/(BlackBerry|BB)/.test(ua) && isMobile) ||
                      /(Windows Phone)/.test(ua);
        }

        function isTablet(ua) {
            return !isPhone(ua) && (/iPad/.test(ua) || /Android|Silk/.test(ua) || /(RIM Tablet OS)/.test(ua) ||
                (/MSIE 10/.test(ua) && /; Touch/.test(ua)));
        }

        // Check if the ?platform parameter is set in the URL
        var paramsString = window.location.search.substr(1),
            paramsArray = paramsString.split("&"),
            params = {},
            testPlatform, i;

        for (i = 0; i < paramsArray.length; i++) {
            var tmpArray = paramsArray[i].split("=");
            params[tmpArray[0]] = tmpArray[1];
        }

        testPlatform = params.platform;
        if (testPlatform) {
            return platform.indexOf(testPlatform) != -1;
        }

        for (j = 0, jln = platform.length; j < jln; j++) {
            switch (platform[j]) {
                case 'phone':
                    profileMatch = isPhone(ua);
                    break;
                case 'tablet':
                    profileMatch = isTablet(ua);
                    break;
                case 'desktop':
                    profileMatch = !isPhone(ua) && !isTablet(ua);
                    break;
                case 'ios':
                    profileMatch = /(iPad|iPhone|iPod)/.test(ua);
                    break;
                case 'android':
                    profileMatch = /(Android|Silk)/.test(ua);
                    break;
                case 'blackberry':
                    profileMatch = /(BlackBerry|BB)/.test(ua);
                    break;
                case 'safari':
                    profileMatch = /Safari/.test(ua) && !(/(BlackBerry|BB)/.test(ua));
                    break;
                case 'chrome':
                    profileMatch = /Chrome/.test(ua);
                    break;
                case 'ie10':
                    profileMatch = /MSIE 10/.test(ua);
                    break;
                case 'windows':
                    profileMatch = /MSIE 10/.test(ua) || /Trident/.test(ua);
                    break;
                case 'tizen':
                    profileMatch = /Tizen/.test(ua);
                    break;
                case 'firefox':
                    profileMatch = /Firefox/.test(ua);
            }
            if (profileMatch) {
                return true;
            }
        }
        return false;
    };


    for (i = 0,ln = styleSheets.length; i < ln; i++) {
        path = styleSheets[i];

        if (typeof path != 'string') {
            platform = path.platform;
            exclude = path.exclude;
            theme = path.theme;
            path = path.path;
        }

        if (platform) {
            if (!filterPlatform(platform) || filterPlatform(exclude)) {
                continue;
            }

            if(!Ext.theme) {
                Ext.theme = {};
            }
            if(!Ext.theme.name) {
                Ext.theme.name = theme || 'Default';
            }
        }

        write('<link rel="stylesheet" href="'+path+'">');
    }

    for (i = 0,ln = scripts.length; i < ln; i++) {
        path = scripts[i];

        if (typeof path != 'string') {
            platform = path.platform;
            exclude = path.exclude;
            path = path.path;
        }

        if (platform) {
            if (!filterPlatform(platform) || filterPlatform(exclude)) {
                continue;
            }
        }

        write('<script src="'+path+'"></'+'script>');
    }

})();