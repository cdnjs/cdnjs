/*!
 * Detectizr v1.5.0
 * http://barisaydinoglu.github.com/Detectizr/
 * https://github.com/barisaydinoglu/Detectizr
 * Written by Baris Aydinoglu (http://baris.aydinoglu.info) - Copyright 2012
 * Contributor: Adrian Maurer (https://github.com/adrianmaurer)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Inspirations:
 *  - Browser selectors in CSS - http://37signals.com/svn/archives2/browser_selectors_in_css.php
 *  - Categorizr - http://www.brettjankord.com/2012/01/16/categorizr-a-modern-device-detection-script/
 */
/*
 * Detectizr, which requires Modernizr, adds some tests to Modernizr.
 * It detects device, device model, screen size, operating system,
 * and browser details.
 * Detection of these sets are optional and can be disabled.
 * 
 * Detectable device types are: tv (includes smart tv and game console), 
 * mobile, tablet, and desktop. Device models of tv, mobile and tablet
 * are being detected.
 *
 * Author         Baris Aydinoglu
 */
/*
 * jslint browser: true, regexp: true, sloppy: true, white: true
 * jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, regexp:false, white:false
 */
(function (window, navigator) {
    var Modernizr = window.Modernizr,
        options = {
            // option for enabling HTML classes of all features (not only the true features) to be added
            addAllFeaturesAsClass: false,
            // option for enabling detection of device
            detectDevice: true,
            // option for enabling detection of device model
            detectDeviceModel: true,
            // option for enabling detection of screen size
            detectScreen: true,
            // option for enabling detection of operating system type and version
            detectOS: true,
            // option for enabling detection of browser type and version
            detectBrowser: true,
            // option for enabling detection of common browser plugins
            detectPlugins: true
        };

    function Detectizr(opt) {
        // Create Global "extend" method, so Detectizr does not need jQuery.extend
        var extend = function (obj, extObj) {
                var a, b, i;
                if (arguments.length > 2) {
                    for (a = 1, b = arguments.length; a < b; a += 1) {
                        extend(obj, arguments[a]);
                    }
                } else {
                    for (i in extObj) {
                        if (extObj.hasOwnProperty(i)) {
                            obj[i] = extObj[i];
                        }
                    }
                }
                return obj;
            },
            that = this,
            device = Modernizr.Detectizr.device,
            docElement = document.documentElement,
            deviceTypes = ["tv", "tablet", "mobile", "desktop"],
            rclass = /[\t\r\n]/g,
            plugins2detect = {
                java: {
                    substrs: ["Java"],
                    progIds: ["JavaWebStart.isInstalled"]
                },
                acrobat: {
                    substrs: ["Adobe", "Acrobat"],
                    progIds: ["AcroPDF.PDF", "PDF.PDFCtrl.5"]
                },
                flash: {
                    substrs: ["Shockwave", "Flash"],
                    progIds: ["ShockwaveFlash.ShockwaveFlash"]
                },
                mediaplayer: {
                    substrs: ["Windows Media"],
                    progIds: ["MediaPlayer.MediaPlayer"]
                },
                silverlight: {
                    substrs: ["Silverlight"],
                    progIds: ["AgControl.AgControl"]
                }
            },
            i, j, k, l, alias, plugin, resizeTimeoutId, oldOrientation;
        options = extend({}, options, opt || {});

        // simplified and localized indexOf method as one parameter fixed as useragent
        that.is = function (key) {
            return device.userAgent.indexOf(key) > -1;
        };

        // simplified and localized regex test method as one parameter fixed as useragent
        that.test = function (regex) {
            return regex.test(device.userAgent);
        };

        // simplified and localized regex exec method as one parameter fixed as useragent
        that.exec = function (regex) {
            return regex.exec(device.userAgent);
        };

        // localized string trim method
        that.trim = function (value) {
            return value.replace(/^\s+|\s+$/g, "");
        };

        // convert string to camelcase
        that.toCamel = function (string) {
            if (string === null || string === undefined) {
                return "";
            }
            return String(string).replace(/((\s|\-|\.)+[a-z0-9])/g, function ($1) {
                return $1.toUpperCase().replace(/(\s|\-|\.)/g, "");
            });
        };

        // removeClass function inspired from jQuery.removeClass
        that.removeClass = function (element, value) {
            var class2remove = value || "",
                cur = element.nodeType === 1 && ( element.className ? ( " " + element.className + " " ).replace( rclass, " " ) : "");
            if ( cur ) {
                while ( cur.indexOf( " " + class2remove + " " ) >= 0 ) {
                    cur = cur.replace( " " + class2remove + " ", " " );
                }
                element.className = value ? that.trim(cur) : "";
            }
        };

        // add version test to Modernizr
        that.addVersionTest = function (mainTest, version, maxLength) {
            if (version !== null && version !== undefined && version !== "") {
                version = that.toCamel(version);
                if (version !== "") {
                    if (maxLength !== undefined && maxLength > 0) {
                        version = version.substr(0, maxLength);
                    }
                    that.addConditionalTest(mainTest + version, true);
                }
            }
        };

        that.checkOrientation = function () {
            //timeout wrapper points with doResizeCode as callback
            window.clearTimeout(resizeTimeoutId);
            resizeTimeoutId = window.setTimeout(function () {
                oldOrientation = device.orientation;
                //wrapper for height/width check
                if (window.innerHeight > window.innerWidth) {
                    device.orientation = "portrait";
                } else {
                    device.orientation = "landscape";
                }
                that.addConditionalTest(device.orientation, true);
                if (oldOrientation !== device.orientation) {
                    that.addConditionalTest(oldOrientation, false);
                }
            }, 10);
        };

        // add test to Modernizr based on a conditi
        that.addConditionalTest = function (feature, test) {
            if (feature === null || feature === undefined || feature === "") {
                return;
            }
            if (options.addAllFeaturesAsClass) {
                Modernizr.addTest(feature, test);
            } else {
                test = typeof test === "function" ? test() : test;
                if (test) {
                    Modernizr.addTest(feature, true);
                } else {
                    delete Modernizr[feature];
                    that.removeClass(docElement, feature);
                }
            }
        };

        /** Device detection **/
        if (options.detectDevice) {
            if (that.test(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i)) {
                // Check if user agent is a smart tv
                device.type = deviceTypes[0];
                device.model = "smartTv";
            } else if (that.test(/Xbox|PLAYSTATION.3|Wii/i)) {
                // Check if user agent is a game console
                device.type = deviceTypes[0];
                device.model = "gameConsole";
            } else if (that.test(/iP(a|ro)d/i)) {
                // Check if user agent is a iPad
                device.type = deviceTypes[1];
                device.model = "ipad";
            } else if ((that.test(/tablet/i) && !that.test(/RX-34/i)) || that.test(/FOLIO/i)) {
                // Check if user agent is a Tablet
                device.type = deviceTypes[1];
                device.model = String(that.exec(/playbook/));
            } else if (that.test(/Linux/i) && that.test(/Android/i) && !that.test(/Fennec|mobi|HTC.Magic|HTCX06HT|Nexus.One|SC-02B|fone.945/i)) {
                // Check if user agent is an Android Tablet
                device.type = deviceTypes[1];
                device.model = "android";
            } else if (that.test(/Kindle/i) || (that.test(/Mac.OS/i) && that.test(/Silk/i))) {
                // Check if user agent is a Kindle or Kindle Fire
                device.type = deviceTypes[1];
                device.model = "kindle";
            } else if (that.test(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || (that.test(/MB511/i) && that.test(/RUTEM/i))) {
                // Check if user agent is a pre Android 3.0 Tablet
                device.type = deviceTypes[1];
                device.model = "android";
            } else if (that.test(/BB10/i)) {
                // Check if user agent is a BB10 device
                device.type = deviceTypes[1];
                device.model = "blackberry";
            } else {
                // Check if user agent is one of common mobile types
                device.model = that.exec(/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/i);
                if (device.model !== null) {
                    device.type = deviceTypes[2];
                    device.model = String(device.model);
                } else {
                    device.model = "";
                    if (that.test(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google.Wireless.Transcoder/i)) {
                        // Check if user agent is unique Mobile User Agent
                        device.type = deviceTypes[2];
                    } else if (that.test(/Opera/i) && that.test(/Windows.NT.5/i) && that.test(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)) {
                        // Check if user agent is an odd Opera User Agent - http://goo.gl/nK90K
                        device.type = deviceTypes[2];
                    } else if ((that.test(/Windows.(NT|XP|ME|9)/i) && !that.test(/Phone/i)) || that.test(/Win(9|.9|NT)/i) || that.test(/\(Windows 8\)/i)) {
                        // Check if user agent is Windows Desktop, "(Windows 8)" Chrome extra exception
                        device.type = deviceTypes[3];
                    } else if (that.test(/Macintosh|PowerPC/i) && !that.test(/Silk/i)) {
                        // Check if agent is Mac Desktop
                        device.type = deviceTypes[3];
                    } else if (that.test(/Linux/i) && that.test(/X11/i)) {
                        // Check if user agent is a Linux Desktop
                        device.type = deviceTypes[3];
                    } else if (that.test(/Solaris|SunOS|BSD/i)) {
                        // Check if user agent is a Solaris, SunOS, BSD Desktop
                        device.type = deviceTypes[3];
                    } else if (that.test(/Bot|Crawler|Spider|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|TinEye/i) && !that.test(/Mobile/i)) {
                        // Check if user agent is a Desktop BOT/Crawler/Spider
                        device.type = deviceTypes[3];
                        device.model = "crawler";
                    } else {
                        // Otherwise assume it is a Mobile Device
                        device.type = deviceTypes[2];
                    }
                }
            }
            for (i = 0, j = deviceTypes.length; i < j; i += 1) {
                that.addConditionalTest(deviceTypes[i], (device.type === deviceTypes[i]));
            }
            if (options.detectDeviceModel) {
                that.addConditionalTest(that.toCamel(device.model), true);
            }
            if (device.type === deviceTypes[1] || device.type === deviceTypes[2]) {
                window.onresize = function (event) {
                    that.checkOrientation(event);
                };
                that.checkOrientation();
            }
        }

        /** Screen detection **/
        if (options.detectScreen && !!Modernizr.mq) {
            that.addConditionalTest("smallScreen", Modernizr.mq("only screen and (max-width: 480px)"));
            that.addConditionalTest("verySmallScreen", Modernizr.mq("only screen and (max-width: 320px)"));
            that.addConditionalTest("veryVerySmallScreen", Modernizr.mq("only screen and (max-width: 240px)"));
        }

        /** OS detection **/
        if (options.detectOS) {
            if (device.model !== "") {
                if (device.model === "ipad" || device.model === "iphone" || device.model === "ipod") {
                    device.osVersion = (that.test(/os\s(\d+)_/) ? RegExp.$1 : "");
                    device.os = "ios";
                    // Full version check
                    device.osVersionFull = (that.test(/os ([^\s]+)/) ? RegExp.$1.replace(/_/g,".") : "");
                } else if (device.model === "android") {
                    device.osVersion = (that.test(/os\s(\d+)_/) ? RegExp.$1 : "").substr(0, 2);
                    if (!device.osVersion) {
                        device.osVersion = (that.test(/android\s(\d+)\./) ? RegExp.$1 : "");
                        device.osVersionFull = (that.test(/android ([^\s]+)/) ? RegExp.$1.replace(/_/g,".") : "");
                    }
                    device.os = "android";
                } else if (device.model === "blackberry") {
                    device.osVersion = (that.test(/version\/([^\s]+)/) ? RegExp.$1 : "");
                    device.os = "blackberry";
                } else if (device.model === "playbook") {
                    device.osVersion = (that.test(/os ([^\s]+)/) ? RegExp.$1.replace(";", "") : "");
                    device.os = "blackberry";
                }
            }
            if (device.os === "") {
                if (that.is("win") || that.is("16bit")) {
                    device.os = "windows";
                    if (that.is("windows nt 6.3")) {
                        device.osVersion = "8";
                        device.osVersionFull = "8.1";
					} else if (that.is("windows nt 6.2") || that.test(/\(windows 8\)/)) { //windows 8 chrome mac fix
                        device.osVersion = "8";
                    } else if (that.is("windows nt 6.1")) {
                        device.osVersion = "7";
                    } else if (that.is("windows nt 6.0")) {
                        device.osVersion = "vista";
                    } else if (that.is("windows nt 5.2") || that.is("windows nt 5.1") || that.is("windows xp")) {
                        device.osVersion = "xp";
                    } else if (that.is("windows nt 5.0") || that.is("windows 2000")) {
                        device.osVersion = "2k";
                    } else if (that.is("winnt") || that.is("windows nt")) {
                        device.osVersion = "nt";
                    } else if (that.is("win98") || that.is("windows 98")) {
                        device.osVersion = "98";
                    } else if (that.is("win95") || that.is("windows 95")) {
                        device.osVersion = "95";
                    }
                } else if (that.is("mac") || that.is("darwin")) {
                    device.os = "mac";
                    if (that.is("68k") || that.is("68000")) {
                        device.osVersion = "68k";
                    } else if (that.is("ppc") || that.is("powerpc")) {
                        device.osVersion = "ppc";
                    } else if (that.is("os x")) {
                        device.osVersion = "os x";
                    }
                } else if (that.is("webtv")) {
                    device.os = "webtv";
                } else if (that.is("x11") || that.is("inux")) {
                    device.os = "linux";
                } else if (that.is("sunos")) {
                    device.os = "sun";
                } else if (that.is("irix")) {
                    device.os = "irix";
                } else if (that.is("freebsd")) {
                    device.os = "freebsd";
                } else if (that.is("bsd")) {
                    device.os = "bsd";
                }
            }
            if (device.os !== "") {
                // assign the full version property if not ios (special case. see above ios check)
                if (!device.osVersionFull && !!device.osVersion) {
                    device.osVersionFull = device.osVersion;
                }
                that.addConditionalTest(device.os, true);
                that.addVersionTest(device.os, device.osVersionFull.replace(/\./g, "_"));
                that.addVersionTest(device.os, device.osVersion);
            }

        }

        /** Browser detection **/
        if (options.detectBrowser) {
            if (!that.test(/opera|webtv/i) && (that.test(/msie\s([0-9]{1,})/) || that.is("trident"))) {
                device.browserEngine = "trident";
                device.browser = "ie";
                if (!window.addEventListener && document.documentMode && document.documentMode === 7) {
                    device.browserVersion = "8compat";
                } else if (that.test(/trident.*rv[ :](\d+)\./)) {
                    device.browserVersion = RegExp.$1;
                } else {
                    device.browserVersion = (that.test(/trident\/4\.0/) ? "8" : RegExp.$1);
                }
            } else if (that.is("firefox")) {
                device.browserEngine = "gecko";
                device.browser = "firefox";
                device.browserVersion = (that.test(/firefox\/(\d+(\.?\d+)*)/) ? RegExp.$1 : "").substr(0, 2);
            } else if (that.is("gecko/")) {
                device.browserEngine = "gecko";
            } else if (that.is("opera")) {
                device.browser = "opera";
                device.browserEngine = "presto";
                device.browserVersion = (that.test(/version\/(\d+)/) ? RegExp.$1 : (that.test(/opera(\s|\/)(\d+)/) ? RegExp.$2 : ""));
            } else if (that.is("konqueror")) {
                device.browser = "konqueror";
            } else if (that.is("chrome")) {
                device.browserEngine = "webkit";
                device.browser = "chrome";
                device.browserVersion = (that.test(/chrome\/(\d+)/) ? RegExp.$1 : "");
            } else if (that.is("iron")) {
                device.browserEngine = "webkit";
                device.browser = "iron";
            } else if (that.is("applewebkit/")) {
                device.browser = "safari";
                device.browserEngine = "webkit";
                device.browserVersion = (that.test(/version\/(\d+)/) ? RegExp.$1 : "");
            } else if (that.is("mozilla/")) {
                device.browserEngine = "gecko";
            }
            if (device.browser !== "") {
                that.addConditionalTest(device.browser, true);
                if (device.browserVersion !== "") {
                    that.addVersionTest(device.browser, device.browserVersion);
                }
            }
            that.addConditionalTest(device.browserEngine, true);
        }

        /** Plugin detection **/
        if (options.detectPlugins) {
            that.detectPlugin = function (substrs) {
                if (navigator.plugins) {
                    for (i = 0, j = navigator.plugins.length; i < j; i += 1) {
                        var plugin = navigator.plugins[i],
                            haystack = plugin.name + plugin.description,
                            found = 0;
                        for (k = 0, l = substrs.length; k < l; k += 1) {
                            if (haystack.indexOf(substrs[k]) !== -1) {
                                found += 1;
                            }
                        }
                        if (found === substrs.length) {
                            return true;
                        }
                    }
                }
                return false;
            };
            that.detectObject = function (progIds, fns) {
                if (window.ActiveXObject) {
                    for (i = 0, j = progIds.length; i < j; i += 1) {
                        try {
                            var obj = new ActiveXObject(progIds[i]);
                            if (obj) {
                                return fns && fns[i] ? fns[i].call(obj) : true;
                            }
                        } catch (e) {
                            // Ignore
                        }
                    }
                }
                return false;
            };
            for (alias in plugins2detect) {
                if (plugins2detect.hasOwnProperty(alias)) {
                    plugin = plugins2detect[alias];
                    if (that.detectPlugin(plugin.substrs) || that.detectObject(plugin.progIds, plugin.fns)) {
                        device.browserPlugins.push(alias);
                        that.addConditionalTest(alias, true);
                    }
                }
            }
        }
    }

    function init() {
        if (Modernizr !== undefined) {
            Modernizr.Detectizr = Modernizr.Detectizr || {};
            Modernizr.Detectizr.device = {
                type: "",
                model: "",
                orientation: "",
                browser: "",
                browserEngine: "",
                browserPlugins: [],
                browserVersion: "",
                os: "",
                osVersion: "",
                osVersionFull: "",
                userAgent: (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
            };
            Modernizr.Detectizr.detect = function (settings) {
                return new Detectizr(settings);
            };
        }
    }
    init();
}(this, navigator));

/** Sample usages **/
// Modernizr.Detectizr.detect();
// Modernizr.Detectizr.detect({detectScreen:false});
