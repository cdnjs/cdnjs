/**
 * Provides information about operating system environment.
 *
 * Should not be manually instantiated unless for unit-testing.
 * Access the global instance stored in {@link Ext.os} instead.
 * @private
 */
Ext.env.OS = function(userAgent, platform, browserScope) {
// @define Ext.env.OS
// @define Ext.os
// @require Ext.Version
// @require Ext.env.Browser

    var me = this,
        names = me.names,
        prefixes = me.prefixes,
        name,
        version = '',
        is = me.is,
        i, prefix, match, item, match1;

    browserScope = browserScope || Ext.browser;

    for (i in prefixes) {
        if (prefixes.hasOwnProperty(i)) {
            prefix = prefixes[i];

            match = userAgent.match(new RegExp('(?:'+prefix+')([^\\s;]+)'));

            if (match) {
                name = names[i];
                match1 = match[1];

                // This is here because some HTC android devices show an OSX Snow Leopard userAgent by default.
                // And the Kindle Fire doesn't have any indicator of Android as the OS in its User Agent
                if (match1 && match1 == "HTC_") {
                    version = new Ext.Version("2.3");
                }
                else if (match1 && match1 == "Silk/") {
                    version = new Ext.Version("2.3");
                }
                else {
                    version = new Ext.Version(match[match.length - 1]);
                }

                break;
            }
        }
    }

    if (!name) {
        name = names[(userAgent.toLowerCase().match(/mac|win|linux/) || ['other'])[0]];
        version = new Ext.Version('');
    }

    this.name = name;
    this.version = version;

    if (platform) {
        this.setFlag(platform.replace(/ simulator$/i, ''));
    }

    this.setFlag(name);

    if (version) {
        this.setFlag(name + (version.getMajor() || ''));
        this.setFlag(name + version.getShortVersion());
    }

    for (i in names) {
        if (names.hasOwnProperty(i)) {
            item = names[i];

            if (!is.hasOwnProperty(name)) {
                this.setFlag(item, (name === item));
            }
        }
    }

    // Detect if the device is the iPhone 5.
    if (this.name == "iOS" && window.screen.height == 568) {
        this.setFlag('iPhone5');
    }

    if (browserScope.is.Safari || browserScope.is.Silk) {
        // Ext.browser.version.shortVersion == 501 is for debugging off device
        if (this.is.Android2 || this.is.Android3 || browserScope.version.shortVersion == 501) {
            browserScope.setFlag("AndroidStock");
            browserScope.setFlag("AndroidStock2");
        }
        if (this.is.Android4) {
            browserScope.setFlag("AndroidStock");
            browserScope.setFlag("AndroidStock4");
        }
    }
};

Ext.env.OS.prototype = {
    constructor: Ext.env.OS,

    names: {
        ios: 'iOS',
        android: 'Android',
        windowsPhone: 'WindowsPhone',
        webos: 'webOS',
        blackberry: 'BlackBerry',
        rimTablet: 'RIMTablet',
        mac: 'MacOS',
        win: 'Windows',
        tizen: 'Tizen',
        linux: 'Linux',
        bada: 'Bada',
        chrome: 'ChromeOS',
        other: 'Other'
    },
    prefixes: {
        tizen: '(Tizen )',
        ios: 'i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ',
        android: '(Android |HTC_|Silk/)', // Some HTC devices ship with an OSX userAgent by default,
                                    // so we need to add a direct check for HTC_
        windowsPhone: 'Windows Phone ',
        blackberry: '(?:BlackBerry|BB)(?:.*)Version\/',
        rimTablet: 'RIM Tablet OS ',
        webos: '(?:webOS|hpwOS)\/',
        bada: 'Bada\/',
        chrome: 'CrOS '
    },

    /**
     * A "hybrid" property, can be either accessed as a method call, i.e:
     *
     *     if (Ext.os.is('Android')) {
     *         // ...
     *     }
     *
     * or as an object with boolean properties, i.e:
     *
     *     if (Ext.os.is.Android) {
     *         // ...
     *     }
     *
     * Versions can be conveniently checked as well. For example:
     *
     *     if (Ext.os.is.Android2) {
     *         // Equivalent to (Ext.os.is.Android && Ext.os.version.equals(2))
     *     }
     *
     *     if (Ext.os.is.iOS32) {
     *         // Equivalent to (Ext.os.is.iOS && Ext.os.version.equals(3.2))
     *     }
     *
     * Note that only {@link Ext.Version#getMajor major component} and {@link Ext.Version#getShortVersion simplified}
     * value of the version are available via direct property checking. Supported values are:
     *
     * - iOS
     * - iPad
     * - iPhone
     * - iPhone5 (also true for 4in iPods).
     * - iPod
     * - Android
     * - WebOS
     * - BlackBerry
     * - Bada
     * - MacOS
     * - Windows
     * - Linux
     * - Other
     * @param {String} name The OS name to check.
     * @return {Boolean}
     */
    is: function (name) {
        return !!this[name];
    },

    /**
     * @property {String} [name=null]
     * @readonly
     * The full name of the current operating system. Possible values are:
     *
     * - iOS
     * - Android
     * - WebOS
     * - BlackBerry,
     * - MacOS
     * - Windows
     * - Linux
     * - Other
     */
    name: null,

    /**
     * @property {Ext.Version} [version=null]
     * Refer to {@link Ext.Version}
     * @readonly
     */
    version: null,

    setFlag: function(name, value) {
        if (typeof value == 'undefined') {
            value = true;
        }

        if (this.flags) {
            this.flags[name] = value;
        }
        this.is[name] = value;
        this.is[name.toLowerCase()] = value;

        return this;
    }
};

(function() {
    var navigation = Ext.global.navigator,
        userAgent = navigation.userAgent,
        OS = Ext.env.OS,
        is = (Ext.is || (Ext.is = {})),
        osEnv, osName, deviceType;

    OS.prototype.flags = is;

    /**
     * @class Ext.os
     * @extends Ext.env.OS
     * @singleton
     * Provides useful information about the current operating system environment.
     *
     * Example:
     *
     *     if (Ext.os.is.Windows) {
     *         // Windows specific code here
     *     }
     *
     *     if (Ext.os.is.iOS) {
     *         // iPad, iPod, iPhone, etc.
     *     }
     *
     *     console.log("Version " + Ext.os.version);
     *
     * For a full list of supported values, refer to the {@link #is} property/method.
     *
     * @aside guide environment_package
     */
    Ext.os = osEnv = new OS(userAgent, navigation.platform);

    osName = osEnv.name;

    // A couple compatible flavors:
    Ext['is' + osName] = true; // e.g., Ext.isWindows
    Ext.isMac = is.Mac = is.MacOS;

    var search = window.location.search.match(/deviceType=(Tablet|Phone)/),
        nativeDeviceType = window.deviceType;

    // Override deviceType by adding a get variable of deviceType. NEEDED FOR DOCS APP.
    // E.g: example/kitchen-sink.html?deviceType=Phone
    if (search && search[1]) {
        deviceType = search[1];
    }
    else if (nativeDeviceType === 'iPhone') {
        deviceType = 'Phone';
    }
    else if (nativeDeviceType === 'iPad') {
        deviceType = 'Tablet';
    }
    else {
        if (!osEnv.is.Android && !osEnv.is.iOS && !osEnv.is.WindowsPhone && /Windows|Linux|MacOS/.test(osName)) {
            deviceType = 'Desktop';

            // always set it to false when you are on a desktop not using Ripple Emulation
            Ext.browser.is.WebView = !!Ext.browser.is.Ripple;
        }
        else if (osEnv.is.iPad || osEnv.is.RIMTablet || osEnv.is.Android3 || Ext.browser.is.Silk || (osEnv.is.Android4 && userAgent.search(/mobile/i) == -1)) {
            deviceType = 'Tablet';
        }
        else {
            deviceType = 'Phone';
        }
    }

    /**
     * @property {String} deviceType
     * The generic type of the current device.
     *
     * Possible values:
     *
     * - Phone
     * - Tablet
     * - Desktop
     *
     * For testing purposes the deviceType can be overridden by adding
     * a deviceType parameter to the URL of the page, like so:
     *
     *     http://localhost/mypage.html?deviceType=Tablet
     *
     */
    osEnv.setFlag(deviceType, true);
    osEnv.deviceType = deviceType;

    delete OS.prototype.flags;
}());
