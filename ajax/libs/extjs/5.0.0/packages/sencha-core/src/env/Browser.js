/**
 * @class Ext.env.Browser
 * Provides information about browser.
 *
 * Should not be manually instantiated unless for unit-testing.
 * Access the global instance stored in {@link Ext.browser} instead.
 * @private
 */
Ext.env || (Ext.env = {});
Ext.env.Browser = function (userAgent, publish) {
// @define Ext.env.Browser
// @define Ext.browser
// @require Ext.Object
// @require Ext.Version

    var me = this,
        browserPrefixes = me.browserPrefixes,
        enginePrefixes = me.enginePrefixes,
        browserMatch = userAgent.match(new RegExp('((?:' + 
                Ext.Object.getValues(browserPrefixes).join(')|(?:') + '))([\\w\\._]+)')),
        engineMatch = userAgent.match(new RegExp('((?:' + 
                Ext.Object.getValues(enginePrefixes).join(')|(?:') + '))([\\w\\._]+)')),
        browserNames = me.browserNames,
        browserName = browserNames.other,
        engineNames = me.engineNames,
        engineName = engineNames.other,
        browserVersion = '',
        engineVersion = '',
        majorVer = '',
        isWebView = false,
        i, mode, name;

    /**
     * @property {String}
     * Browser User Agent string.
     */
    me.userAgent = userAgent;

    if (browserMatch) {
        browserName = browserNames[Ext.Object.getKey(browserPrefixes, browserMatch[1])];
        //<feature legacyBrowser>
        if (browserName === 'Safari' && /^Opera/.test(userAgent)) {
            // Prevent Opera 12 and earlier from being incorrectly reported as Safari
            browserName = 'Opera';
        }
        //</feature>
        browserVersion = new Ext.Version(browserMatch[2]);
    }

    if (engineMatch) {
        engineName = engineNames[Ext.Object.getKey(enginePrefixes, engineMatch[1])];
        engineVersion = new Ext.Version(engineMatch[2]);
    }

    if (engineName == 'Trident' && browserName != 'IE') {
        browserName = 'IE';
        var version = userAgent.match(/.*rv:(\d+.\d+)/);
        if (version && version.length) {
            version = version[1];
            browserVersion = new Ext.Version(version);
        }
    }

    // Facebook changes the userAgent when you view a website within their iOS app. For some reason, the strip out information
    // about the browser, so we have to detect that and fake it...
    if (userAgent.match(/FB/) && browserName == "Other") {
        browserName = browserNames.safari;
        engineName = engineNames.webkit;
    }

    if (userAgent.match(/Android.*Chrome/g)) {
        browserName = 'ChromeMobile';
    }

    if (userAgent.match(/OPR/)) {
        browserName = 'Opera';
        browserMatch = userAgent.match(/OPR\/(\d+.\d+)/);
        browserVersion = new Ext.Version(browserMatch[1]);
    }

    Ext.apply(this, {
        engineName: engineName,
        engineVersion: engineVersion,
        name: browserName,
        version: browserVersion
    });

    this.setFlag(browserName, true, publish); // e.g., Ext.isIE

    if (browserVersion) {
        majorVer = browserVersion.getMajor() || '';
        //<feature legacyBrowser>
        if (me.is.IE) {
            majorVer = parseInt(majorVer, 10);
            mode = document.documentMode;

            // IE's Developer Tools allows switching of Browser Mode (userAgent) and
            // Document Mode (actual behavior) independently. While this makes no real
            // sense, the bottom line is that document.documentMode holds the key to
            // getting the proper "version" determined. That value is always 5 when in
            // Quirks Mode.

            if (mode == 7 || (majorVer == 7 && mode != 8 && mode != 9 && mode != 10)) {
                majorVer = 7;
            } else if (mode == 8 || (majorVer == 8 && mode != 8 && mode != 9 && mode != 10)) {
                majorVer = 8;
            } else if (mode == 9 || (majorVer == 9 && mode != 7 && mode != 8 && mode != 10)) {
                majorVer = 9;
            } else if (mode == 10 || (majorVer == 10 && mode != 7 && mode != 8 && mode != 9)) {
                majorVer = 10;
            }

            if (majorVer <= 7) {
                Ext.isIE7m = true;
            }
            if (majorVer <= 8) {
                Ext.isIE8m = true;
            }
            if (majorVer <= 9) {
                Ext.isIE9m = true;
            }

            if (majorVer >= 7) {
                Ext.isIE7p = true;
            }
            if (majorVer >= 8) {
                Ext.isIE8p = true;
            }
            if (majorVer >= 9) {
                Ext.isIE9p = true;
            }
            if (majorVer >= 10) {
                Ext.isIE10p = true;
            }
        }

        if (me.is.Opera && parseInt(majorVer, 10) <= 12) {
            Ext.isOpera12m = true;
        }
        //</feature>

        Ext.chromeVersion = Ext.isChrome ? majorVer : 0;
        Ext.firefoxVersion = Ext.isFirefox ? majorVer : 0;
        Ext.ieVersion = Ext.isIE ? majorVer : 0;
        Ext.operaVersion = Ext.isOpera ? majorVer : 0;
        Ext.safariVersion = Ext.isSafari ? majorVer : 0;
        Ext.webKitVersion = Ext.isWebKit ? majorVer : 0;

        this.setFlag(browserName + majorVer, true, publish); // Ext.isIE10
        this.setFlag(browserName + browserVersion.getShortVersion());
    }

    for (i in browserNames) {
        if (browserNames.hasOwnProperty(i)) {
            name = browserNames[i];

            this.setFlag(name, browserName === name);
        }
    }

    this.setFlag(name);

    if (engineVersion) {
        this.setFlag(engineName + (engineVersion.getMajor() || ''));
        this.setFlag(engineName + engineVersion.getShortVersion());
    }

    for (i in engineNames) {
        if (engineNames.hasOwnProperty(i)) {
            name = engineNames[i];

            this.setFlag(name, engineName === name, publish);
        }
    }

    this.setFlag('Standalone', !!navigator.standalone);

    this.setFlag('Ripple', !!document.getElementById("tinyhippos-injected") && !Ext.isEmpty(window.top.ripple));
    this.setFlag('WebWorks', !!window.blackberry);

    if (typeof window.PhoneGap != 'undefined' || typeof window.Cordova != 'undefined' || typeof window.cordova != 'undefined') {
        isWebView = true;
        this.setFlag('PhoneGap');
        this.setFlag('Cordova');
    }
    else if (!!window.isNK) {
        isWebView = true;
        this.setFlag('Sencha');
    }

    if (/(Glass)/i.test(userAgent)) {
        this.setFlag('GoogleGlass');
    }

    // Check if running in UIWebView
    if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)(?!.*FBAN)/i.test(userAgent)) {
        isWebView = true;
    }

    // Flag to check if it we are in the WebView
    this.setFlag('WebView', isWebView);

    /**
     * @property {Boolean}
     * `true` if browser is using strict mode.
     */
    this.isStrict = Ext.isStrict = document.compatMode == "CSS1Compat";

    /**
     * @property {Boolean}
     * `true` if page is running over SSL.
     */
    this.isSecure = /^https/i.test(window.location.protocol);

    // IE10Quirks, Chrome26Strict, etc.
    this.identity = browserName + majorVer + (this.isStrict ? 'Strict' : 'Quirks');
};

Ext.env.Browser.prototype = {
    constructor: Ext.env.Browser,

    browserNames: {
        ie: 'IE',
        firefox: 'Firefox',
        safari: 'Safari',
        chrome: 'Chrome',
        opera: 'Opera',
        dolfin: 'Dolfin',
        webosbrowser: 'webOSBrowser',
        chromeMobile: 'ChromeMobile',
        chromeiOS: 'ChromeiOS',
        silk: 'Silk',
        other: 'Other'
    },
    engineNames: {
        webkit: 'WebKit',
        gecko: 'Gecko',
        presto: 'Presto',
        trident: 'Trident',
        other: 'Other'
    },
    enginePrefixes: {
        webkit: 'AppleWebKit/',
        gecko: 'Gecko/',
        presto: 'Presto/',
        trident: 'Trident/'
    },
    browserPrefixes: {
        ie: 'MSIE ',
        firefox: 'Firefox/',
        chrome: 'Chrome/',
        safari: 'Version/',
        opera: 'OPR/',
        dolfin: 'Dolfin/',
        webosbrowser: 'wOSBrowser/',
        chromeMobile: 'CrMo/',
        chromeiOS: 'CriOS/',
        silk: 'Silk/'
    },

    styleDashPrefixes: {
        WebKit: '-webkit-',
        Gecko: '-moz-',
        Trident: '-ms-',
        Presto: '-o-',
        Other: ''
    },

    stylePrefixes: {
        WebKit: 'Webkit',
        Gecko: 'Moz',
        Trident: 'ms',
        Presto: 'O',
        Other: ''
    },

    propertyPrefixes: {
        WebKit: 'webkit',
        Gecko: 'moz',
        Trident: 'ms',
        Presto: 'o',
        Other: ''
    },

    // scope: Ext.env.Browser.prototype

    /**
     * A "hybrid" property, can be either accessed as a method call, for example:
     *
     *     if (Ext.browser.is('IE')) {
     *         // ...
     *     }
     *
     * Or as an object with Boolean properties, for example:
     *
     *     if (Ext.browser.is.IE) {
     *         // ...
     *     }
     *
     * Versions can be conveniently checked as well. For example:
     *
     *     if (Ext.browser.is.IE10) {
     *         // Equivalent to (Ext.browser.is.IE && Ext.browser.version.equals(10))
     *     }
     *
     * __Note:__ Only {@link Ext.Version#getMajor major component}  and {@link Ext.Version#getShortVersion simplified}
     * value of the version are available via direct property checking.
     *
     * Supported values are:
     *
     * - IE
     * - Firefox
     * - Safari
     * - Chrome
     * - Opera
     * - WebKit
     * - Gecko
     * - Presto
     * - Trident
     * - WebView
     * - Other
     *
     * @param {String} name The OS name to check.
     * @return {Boolean}
     */
    is: function (name) {
        return !!this.is[name];
    },

    /**
     * The full name of the current browser.
     * Possible values are:
     *
     * - IE
     * - Firefox
     * - Safari
     * - Chrome
     * - Opera
     * - Other
     * @type String
     * @readonly
     */
    name: null,

    /**
     * Refer to {@link Ext.Version}.
     * @type Ext.Version
     * @readonly
     */
    version: null,

    /**
     * The full name of the current browser's engine.
     * Possible values are:
     *
     * - WebKit
     * - Gecko
     * - Presto
     * - Trident
     * - Other
     * @type String
     * @readonly
     */
    engineName: null,

    /**
     * Refer to {@link Ext.Version}.
     * @type Ext.Version
     * @readonly
     */
    engineVersion: null,

    setFlag: function(name, value, publish) {
        if (typeof value == 'undefined') {
            value = true;
        }

        this.is[name] = value;
        this.is[name.toLowerCase()] = value;
        if (publish) {
            Ext['is' + name] = value;
        }

        return this;
    },

    getStyleDashPrefix: function() {
        return this.styleDashPrefixes[this.engineName];
    },

    getStylePrefix: function() {
        return this.stylePrefixes[this.engineName];
    },

    getVendorProperyName: function(name) {
        var prefix = this.propertyPrefixes[this.engineName];

        if (prefix.length > 0) {
            return prefix + Ext.String.capitalize(name);
        }

        return name;
    },

    getPreferredTranslationMethod: function(config) {
        if (typeof config == 'object' && 'translationMethod' in config && config.translationMethod !== 'auto') {
            return config.translationMethod;
        } else {
            if (this.is.AndroidStock2 || this.is.IE) {
                return 'scrollposition';
            }
            else {
                return 'csstransform';
            }
        }
    }

};

/**
 * @class Ext.browser
 * @extends Ext.env.Browser
 * @singleton
 * Provides useful information about the current browser.
 *
 * Example:
 *
 *     if (Ext.browser.is.IE) {
 *         // IE specific code here
 *     }
 *
 *     if (Ext.browser.is.WebKit) {
 *         // WebKit specific code here
 *     }
 *
 *     console.log("Version " + Ext.browser.version);
 *
 * For a full list of supported values, refer to {@link #is} property/method.
 *
 * @aside guide environment_package
 */
(function (userAgent) {
    Ext.browser = new Ext.env.Browser(userAgent, true);
    Ext.userAgent = userAgent.toLowerCase();

}(Ext.global.navigator.userAgent));
