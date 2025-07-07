/**
 * Dark Reader v4.9.109
 * https://darkreader.org/
 */

(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? factory(exports)
        : typeof define === "function" && define.amd
          ? define(["exports"], factory)
          : ((global =
                typeof globalThis !== "undefined"
                    ? globalThis
                    : global || self),
            factory((global.DarkReader = {})));
})(this, function (exports) {
    "use strict";

    var MessageTypeUItoBG;
    (function (MessageTypeUItoBG) {
        MessageTypeUItoBG["GET_DATA"] = "ui-bg-get-data";
        MessageTypeUItoBG["GET_DEVTOOLS_DATA"] = "ui-bg-get-devtools-data";
        MessageTypeUItoBG["SUBSCRIBE_TO_CHANGES"] =
            "ui-bg-subscribe-to-changes";
        MessageTypeUItoBG["UNSUBSCRIBE_FROM_CHANGES"] =
            "ui-bg-unsubscribe-from-changes";
        MessageTypeUItoBG["CHANGE_SETTINGS"] = "ui-bg-change-settings";
        MessageTypeUItoBG["SET_THEME"] = "ui-bg-set-theme";
        MessageTypeUItoBG["TOGGLE_ACTIVE_TAB"] = "ui-bg-toggle-active-tab";
        MessageTypeUItoBG["MARK_NEWS_AS_READ"] = "ui-bg-mark-news-as-read";
        MessageTypeUItoBG["MARK_NEWS_AS_DISPLAYED"] =
            "ui-bg-mark-news-as-displayed";
        MessageTypeUItoBG["LOAD_CONFIG"] = "ui-bg-load-config";
        MessageTypeUItoBG["APPLY_DEV_DYNAMIC_THEME_FIXES"] =
            "ui-bg-apply-dev-dynamic-theme-fixes";
        MessageTypeUItoBG["RESET_DEV_DYNAMIC_THEME_FIXES"] =
            "ui-bg-reset-dev-dynamic-theme-fixes";
        MessageTypeUItoBG["APPLY_DEV_INVERSION_FIXES"] =
            "ui-bg-apply-dev-inversion-fixes";
        MessageTypeUItoBG["RESET_DEV_INVERSION_FIXES"] =
            "ui-bg-reset-dev-inversion-fixes";
        MessageTypeUItoBG["APPLY_DEV_STATIC_THEMES"] =
            "ui-bg-apply-dev-static-themes";
        MessageTypeUItoBG["RESET_DEV_STATIC_THEMES"] =
            "ui-bg-reset-dev-static-themes";
        MessageTypeUItoBG["START_ACTIVATION"] = "ui-bg-start-activation";
        MessageTypeUItoBG["RESET_ACTIVATION"] = "ui-bg-reset-activation";
        MessageTypeUItoBG["COLOR_SCHEME_CHANGE"] = "ui-bg-color-scheme-change";
        MessageTypeUItoBG["HIDE_HIGHLIGHTS"] = "ui-bg-hide-highlights";
    })(MessageTypeUItoBG || (MessageTypeUItoBG = {}));
    var MessageTypeBGtoUI;
    (function (MessageTypeBGtoUI) {
        MessageTypeBGtoUI["CHANGES"] = "bg-ui-changes";
    })(MessageTypeBGtoUI || (MessageTypeBGtoUI = {}));
    var DebugMessageTypeBGtoUI;
    (function (DebugMessageTypeBGtoUI) {
        DebugMessageTypeBGtoUI["CSS_UPDATE"] = "debug-bg-ui-css-update";
        DebugMessageTypeBGtoUI["UPDATE"] = "debug-bg-ui-update";
    })(DebugMessageTypeBGtoUI || (DebugMessageTypeBGtoUI = {}));
    var MessageTypeBGtoCS;
    (function (MessageTypeBGtoCS) {
        MessageTypeBGtoCS["ADD_CSS_FILTER"] = "bg-cs-add-css-filter";
        MessageTypeBGtoCS["ADD_DYNAMIC_THEME"] = "bg-cs-add-dynamic-theme";
        MessageTypeBGtoCS["ADD_STATIC_THEME"] = "bg-cs-add-static-theme";
        MessageTypeBGtoCS["ADD_SVG_FILTER"] = "bg-cs-add-svg-filter";
        MessageTypeBGtoCS["CLEAN_UP"] = "bg-cs-clean-up";
        MessageTypeBGtoCS["FETCH_RESPONSE"] = "bg-cs-fetch-response";
        MessageTypeBGtoCS["UNSUPPORTED_SENDER"] = "bg-cs-unsupported-sender";
    })(MessageTypeBGtoCS || (MessageTypeBGtoCS = {}));
    var DebugMessageTypeBGtoCS;
    (function (DebugMessageTypeBGtoCS) {
        DebugMessageTypeBGtoCS["RELOAD"] = "debug-bg-cs-reload";
    })(DebugMessageTypeBGtoCS || (DebugMessageTypeBGtoCS = {}));
    var MessageTypeCStoBG;
    (function (MessageTypeCStoBG) {
        MessageTypeCStoBG["COLOR_SCHEME_CHANGE"] = "cs-bg-color-scheme-change";
        MessageTypeCStoBG["DARK_THEME_DETECTED"] = "cs-bg-dark-theme-detected";
        MessageTypeCStoBG["DARK_THEME_NOT_DETECTED"] =
            "cs-bg-dark-theme-not-detected";
        MessageTypeCStoBG["FETCH"] = "cs-bg-fetch";
        MessageTypeCStoBG["DOCUMENT_CONNECT"] = "cs-bg-document-connect";
        MessageTypeCStoBG["DOCUMENT_FORGET"] = "cs-bg-document-forget";
        MessageTypeCStoBG["DOCUMENT_FREEZE"] = "cs-bg-document-freeze";
        MessageTypeCStoBG["DOCUMENT_RESUME"] = "cs-bg-document-resume";
    })(MessageTypeCStoBG || (MessageTypeCStoBG = {}));
    var DebugMessageTypeCStoBG;
    (function (DebugMessageTypeCStoBG) {
        DebugMessageTypeCStoBG["LOG"] = "debug-cs-bg-log";
    })(DebugMessageTypeCStoBG || (DebugMessageTypeCStoBG = {}));
    var MessageTypeCStoUI;
    (function (MessageTypeCStoUI) {
        MessageTypeCStoUI["EXPORT_CSS_RESPONSE"] = "cs-ui-export-css-response";
    })(MessageTypeCStoUI || (MessageTypeCStoUI = {}));
    var MessageTypeUItoCS;
    (function (MessageTypeUItoCS) {
        MessageTypeUItoCS["EXPORT_CSS"] = "ui-cs-export-css";
    })(MessageTypeUItoCS || (MessageTypeUItoCS = {}));

    const isNavigatorDefined = typeof navigator !== "undefined";
    const userAgent = isNavigatorDefined
        ? navigator.userAgentData &&
          Array.isArray(navigator.userAgentData.brands)
            ? navigator.userAgentData.brands
                  .map(
                      (brand) => `${brand.brand.toLowerCase()} ${brand.version}`
                  )
                  .join(" ")
            : navigator.userAgent.toLowerCase()
        : "some useragent";
    const platform = isNavigatorDefined
        ? navigator.userAgentData &&
          typeof navigator.userAgentData.platform === "string"
            ? navigator.userAgentData.platform.toLowerCase()
            : navigator.platform.toLowerCase()
        : "some platform";
    const isChromium =
        userAgent.includes("chrome") || userAgent.includes("chromium");
    const isFirefox =
        userAgent.includes("firefox") ||
        userAgent.includes("thunderbird") ||
        userAgent.includes("librewolf");
    const isSafari = userAgent.includes("safari") && !isChromium;
    const isWindows = platform.startsWith("win");
    const isMacOS = platform.startsWith("mac");
    isNavigatorDefined && navigator.userAgentData
        ? navigator.userAgentData.mobile
        : userAgent.includes("mobile");
    const isShadowDomSupported = typeof ShadowRoot === "function";
    const isMatchMediaChangeEventListenerSupported =
        typeof MediaQueryList === "function" &&
        typeof MediaQueryList.prototype.addEventListener === "function";
    const isLayerRuleSupported = typeof CSSLayerBlockRule === "function";
    (() => {
        const m = userAgent.match(/chrom(?:e|ium)(?:\/| )([^ ]+)/);
        if (m && m[1]) {
            return m[1];
        }
        return "";
    })();
    (() => {
        const m = userAgent.match(/(?:firefox|librewolf)(?:\/| )([^ ]+)/);
        if (m && m[1]) {
            return m[1];
        }
        return "";
    })();
    const isDefinedSelectorSupported = (() => {
        try {
            document.querySelector(":defined");
            return true;
        } catch (err) {
            return false;
        }
    })();
    const isCSSColorSchemePropSupported = (() => {
        try {
            if (typeof document === "undefined") {
                return false;
            }
            const el = document.createElement("div");
            if (!el || typeof el.style !== "object") {
                return false;
            }
            if (typeof el.style.colorScheme === "string") {
                return true;
            }
            el.setAttribute("style", "color-scheme: dark");
            return el.style.colorScheme === "dark";
        } catch (e) {
            return false;
        }
    })();

    async function getOKResponse(url, mimeType, origin) {
        const credentials =
            origin && url.startsWith(`${origin}/`) ? undefined : "omit";
        const response = await fetch(url, {
            cache: "force-cache",
            credentials,
            referrer: origin
        });
        if (
            isFirefox &&
            mimeType === "text/css" &&
            url.startsWith("moz-extension://") &&
            url.endsWith(".css")
        ) {
            return response;
        }
        if (
            mimeType &&
            !response.headers.get("Content-Type").startsWith(mimeType)
        ) {
            throw new Error(`Mime type mismatch when loading ${url}`);
        }
        if (!response.ok) {
            throw new Error(
                `Unable to load ${url} ${response.status} ${response.statusText}`
            );
        }
        return response;
    }
    async function loadAsDataURL(url, mimeType) {
        const response = await getOKResponse(url, mimeType);
        return await readResponseAsDataURL(response);
    }
    async function loadAsBlob(url, mimeType) {
        const response = await getOKResponse(url, mimeType);
        return await response.blob();
    }
    async function readResponseAsDataURL(response) {
        const blob = await response.blob();
        const dataURL = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
        return dataURL;
    }
    async function loadAsText(url, mimeType, origin) {
        const response = await getOKResponse(url, mimeType, origin);
        return await response.text();
    }

    const throwCORSError = async (url) => {
        return Promise.reject(
            new Error(
                [
                    "Embedded Dark Reader cannot access a cross-origin resource",
                    url,
                    "Overview your URLs and CORS policies or use",
                    "`DarkReader.setFetchMethod(fetch: (url) => Promise<Response>))`.",
                    "See if using `DarkReader.setFetchMethod(window.fetch)`",
                    "before `DarkReader.enable()` works."
                ].join(" ")
            )
        );
    };
    let fetcher = throwCORSError;
    function setFetchMethod$1(fetch) {
        if (fetch) {
            fetcher = fetch;
        } else {
            fetcher = throwCORSError;
        }
    }
    async function callFetchMethod(url) {
        return await fetcher(url);
    }

    if (!window.chrome) {
        window.chrome = {};
    }
    if (!chrome.runtime) {
        chrome.runtime = {};
    }
    const messageListeners = new Set();
    async function sendMessage(...args) {
        if (args[0] && args[0].type === MessageTypeCStoBG.FETCH) {
            const {id} = args[0];
            try {
                const {url, responseType} = args[0].data;
                const response = await callFetchMethod(url);
                let text;
                if (responseType === "data-url") {
                    text = await readResponseAsDataURL(response);
                } else {
                    text = await response.text();
                }
                messageListeners.forEach((cb) =>
                    cb({
                        type: MessageTypeBGtoCS.FETCH_RESPONSE,
                        data: text,
                        error: null,
                        id
                    })
                );
            } catch (error) {
                console.error(error);
                messageListeners.forEach((cb) =>
                    cb({
                        type: MessageTypeBGtoCS.FETCH_RESPONSE,
                        data: null,
                        error,
                        id
                    })
                );
            }
        }
    }
    function addMessageListener(callback) {
        messageListeners.add(callback);
    }
    if (typeof chrome.runtime.sendMessage === "function") {
        const nativeSendMessage = chrome.runtime.sendMessage;
        chrome.runtime.sendMessage = (...args) => {
            sendMessage(...args);
            nativeSendMessage.apply(chrome.runtime, args);
        };
    } else {
        chrome.runtime.sendMessage = sendMessage;
    }
    if (!chrome.runtime.onMessage) {
        chrome.runtime.onMessage = {};
    }
    if (typeof chrome.runtime.onMessage.addListener === "function") {
        const nativeAddListener = chrome.runtime.onMessage.addListener;
        chrome.runtime.onMessage.addListener = (...args) => {
            addMessageListener(args[0]);
            nativeAddListener.apply(chrome.runtime.onMessage, args);
        };
    } else {
        chrome.runtime.onMessage.addListener = (...args) =>
            addMessageListener(args[0]);
    }

    var ThemeEngine;
    (function (ThemeEngine) {
        ThemeEngine["cssFilter"] = "cssFilter";
        ThemeEngine["svgFilter"] = "svgFilter";
        ThemeEngine["staticTheme"] = "staticTheme";
        ThemeEngine["dynamicTheme"] = "dynamicTheme";
    })(ThemeEngine || (ThemeEngine = {}));

    var AutomationMode;
    (function (AutomationMode) {
        AutomationMode["NONE"] = "";
        AutomationMode["TIME"] = "time";
        AutomationMode["SYSTEM"] = "system";
        AutomationMode["LOCATION"] = "location";
    })(AutomationMode || (AutomationMode = {}));

    const DEFAULT_COLORS = {
        darkScheme: {
            background: "#181a1b",
            text: "#e8e6e3"
        },
        lightScheme: {
            background: "#dcdad7",
            text: "#181a1b"
        }
    };
    const DEFAULT_THEME = {
        mode: 1,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        sepia: 0,
        useFont: false,
        fontFamily: isMacOS
            ? "Helvetica Neue"
            : isWindows
              ? "Segoe UI"
              : "Open Sans",
        textStroke: 0,
        engine: ThemeEngine.dynamicTheme,
        stylesheet: "",
        darkSchemeBackgroundColor: DEFAULT_COLORS.darkScheme.background,
        darkSchemeTextColor: DEFAULT_COLORS.darkScheme.text,
        lightSchemeBackgroundColor: DEFAULT_COLORS.lightScheme.background,
        lightSchemeTextColor: DEFAULT_COLORS.lightScheme.text,
        scrollbarColor: "",
        selectionColor: "auto",
        styleSystemControls: !isCSSColorSchemePropSupported,
        lightColorScheme: "Default",
        darkColorScheme: "Default",
        immediateModify: false
    };
    const filterModeSites = [
        "*.officeapps.live.com",
        "*.sharepoint.com",
        "docs.google.com",
        "onedrive.live.com"
    ];
    ({
        customThemes: filterModeSites.map((url) => {
            const engine = ThemeEngine.cssFilter;
            return {
                url: [url],
                theme: {...DEFAULT_THEME, engine},
                builtIn: true
            };
        }),
        automation: {
            mode: AutomationMode.NONE
        }
    });

    function getMatches(regex, input, group = 0) {
        const matches = [];
        let m;
        while ((m = regex.exec(input))) {
            matches.push(m[group]);
        }
        return matches;
    }
    function getMatchesWithOffsets(regex, input, group = 0) {
        const matches = [];
        let m;
        while ((m = regex.exec(input))) {
            matches.push({text: m[group], offset: m.index});
        }
        return matches;
    }
    function getHashCode(text) {
        const len = text.length;
        let hash = 0;
        for (let i = 0; i < len; i++) {
            const c = text.charCodeAt(i);
            hash = ((hash << 5) - hash + c) & 4294967295;
        }
        return hash;
    }
    function escapeRegExpSpecialChars(input) {
        return input.replaceAll(/[\^$.*+?\(\)\[\]{}|\-\\]/g, "\\$&");
    }
    function getParenthesesRange(input, searchStartIndex = 0) {
        return getOpenCloseRange(input, searchStartIndex, "(", ")", []);
    }
    function getOpenCloseRange(
        input,
        searchStartIndex,
        openToken,
        closeToken,
        excludeRanges
    ) {
        let indexOf;
        if (excludeRanges.length === 0) {
            indexOf = (token, pos) => input.indexOf(token, pos);
        } else {
            indexOf = (token, pos) =>
                indexOfExcluding(input, token, pos, excludeRanges);
        }
        const {length} = input;
        let depth = 0;
        let firstOpenIndex = -1;
        for (let i = searchStartIndex; i < length; i++) {
            if (depth === 0) {
                const openIndex = indexOf(openToken, i);
                if (openIndex < 0) {
                    break;
                }
                firstOpenIndex = openIndex;
                depth++;
                i = openIndex;
            } else {
                const closeIndex = indexOf(closeToken, i);
                if (closeIndex < 0) {
                    break;
                }
                const openIndex = indexOf(openToken, i);
                if (openIndex < 0 || closeIndex <= openIndex) {
                    depth--;
                    if (depth === 0) {
                        return {start: firstOpenIndex, end: closeIndex + 1};
                    }
                    i = closeIndex;
                } else {
                    depth++;
                    i = openIndex;
                }
            }
        }
        return null;
    }
    function indexOfExcluding(input, search, position, excludeRanges) {
        const i = input.indexOf(search, position);
        const exclusion = excludeRanges.find((r) => i >= r.start && i < r.end);
        if (exclusion) {
            return indexOfExcluding(
                input,
                search,
                exclusion.end,
                excludeRanges
            );
        }
        return i;
    }
    function splitExcluding(input, separator, excludeRanges) {
        const parts = [];
        let commaIndex = -1;
        let currIndex = 0;
        while (
            (commaIndex = indexOfExcluding(
                input,
                separator,
                currIndex,
                excludeRanges
            )) >= 0
        ) {
            parts.push(input.substring(currIndex, commaIndex).trim());
            currIndex = commaIndex + 1;
        }
        parts.push(input.substring(currIndex).trim());
        return parts;
    }

    let anchor;
    const parsedURLCache = new Map();
    function fixBaseURL($url) {
        if (!anchor) {
            anchor = document.createElement("a");
        }
        anchor.href = $url;
        return anchor.href;
    }
    function parseURL($url, $base = null) {
        const key = `${$url}${$base ? `;${$base}` : ""}`;
        if (parsedURLCache.has(key)) {
            return parsedURLCache.get(key);
        }
        if ($base) {
            const parsedURL = new URL($url, fixBaseURL($base));
            parsedURLCache.set(key, parsedURL);
            return parsedURL;
        }
        const parsedURL = new URL(fixBaseURL($url));
        parsedURLCache.set($url, parsedURL);
        return parsedURL;
    }
    function getAbsoluteURL($base, $relative) {
        if ($relative.match(/^data\\?\:/)) {
            return $relative;
        }
        if (/^\/\//.test($relative)) {
            return `${location.protocol}${$relative}`;
        }
        const b = parseURL($base);
        const a = parseURL($relative, b.href);
        return a.href;
    }
    function isRelativeHrefOnAbsolutePath(href) {
        if (href.startsWith("data:")) {
            return true;
        }
        const url = parseURL(href);
        if (url.protocol !== location.protocol) {
            return false;
        }
        if (url.hostname !== location.hostname) {
            return false;
        }
        if (url.port !== location.port) {
            return false;
        }
        return url.pathname === location.pathname;
    }

    const excludedSelectors = [
        "pre",
        "pre *",
        "code",
        '[aria-hidden="true"]',
        '[class*="fa-"]',
        ".fa",
        ".fab",
        ".fad",
        ".fal",
        ".far",
        ".fas",
        ".fass",
        ".fasr",
        ".fat",
        ".icofont",
        '[style*="font-"]',
        '[class*="icon"]',
        '[class*="Icon"]',
        '[class*="symbol"]',
        '[class*="Symbol"]',
        ".glyphicon",
        '[class*="material-symbol"]',
        '[class*="material-icon"]',
        "mu",
        '[class*="mu-"]',
        ".typcn",
        '[class*="vjs-"]'
    ];
    function createTextStyle(config) {
        const lines = [];
        lines.push(`*:not(${excludedSelectors.join(", ")}) {`);
        if (config.useFont && config.fontFamily) {
            lines.push(`  font-family: ${config.fontFamily} !important;`);
        }
        if (config.textStroke > 0) {
            lines.push(
                `  -webkit-text-stroke: ${config.textStroke}px !important;`
            );
            lines.push(`  text-stroke: ${config.textStroke}px !important;`);
        }
        lines.push("}");
        return lines.join("\n");
    }

    function isArrayLike(items) {
        return items.length != null;
    }
    function forEach(items, iterator) {
        if (isArrayLike(items)) {
            for (let i = 0, len = items.length; i < len; i++) {
                iterator(items[i]);
            }
        } else {
            for (const item of items) {
                iterator(item);
            }
        }
    }
    function push(array, addition) {
        forEach(addition, (a) => array.push(a));
    }
    function toArray(items) {
        const results = [];
        for (let i = 0, len = items.length; i < len; i++) {
            results.push(items[i]);
        }
        return results;
    }

    function scale(x, inLow, inHigh, outLow, outHigh) {
        return ((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow;
    }
    function clamp(x, min, max) {
        return Math.min(max, Math.max(min, x));
    }
    function multiplyMatrices(m1, m2) {
        const result = [];
        for (let i = 0, len = m1.length; i < len; i++) {
            result[i] = [];
            for (let j = 0, len2 = m2[0].length; j < len2; j++) {
                let sum = 0;
                for (let k = 0, len3 = m1[0].length; k < len3; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    function createFilterMatrix(config) {
        let m = Matrix.identity();
        if (config.sepia !== 0) {
            m = multiplyMatrices(m, Matrix.sepia(config.sepia / 100));
        }
        if (config.grayscale !== 0) {
            m = multiplyMatrices(m, Matrix.grayscale(config.grayscale / 100));
        }
        if (config.contrast !== 100) {
            m = multiplyMatrices(m, Matrix.contrast(config.contrast / 100));
        }
        if (config.brightness !== 100) {
            m = multiplyMatrices(m, Matrix.brightness(config.brightness / 100));
        }
        if (config.mode === 1) {
            m = multiplyMatrices(m, Matrix.invertNHue());
        }
        return m;
    }
    function applyColorMatrix([r, g, b], matrix) {
        const rgb = [[r / 255], [g / 255], [b / 255], [1], [1]];
        const result = multiplyMatrices(matrix, rgb);
        return [0, 1, 2].map((i) =>
            clamp(Math.round(result[i][0] * 255), 0, 255)
        );
    }
    const Matrix = {
        identity() {
            return [
                [1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1]
            ];
        },
        invertNHue() {
            return [
                [0.333, -0.667, -0.667, 0, 1],
                [-0.667, 0.333, -0.667, 0, 1],
                [-0.667, -0.667, 0.333, 0, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1]
            ];
        },
        brightness(v) {
            return [
                [v, 0, 0, 0, 0],
                [0, v, 0, 0, 0],
                [0, 0, v, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1]
            ];
        },
        contrast(v) {
            const t = (1 - v) / 2;
            return [
                [v, 0, 0, 0, t],
                [0, v, 0, 0, t],
                [0, 0, v, 0, t],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1]
            ];
        },
        sepia(v) {
            return [
                [
                    0.393 + 0.607 * (1 - v),
                    0.769 - 0.769 * (1 - v),
                    0.189 - 0.189 * (1 - v),
                    0,
                    0
                ],
                [
                    0.349 - 0.349 * (1 - v),
                    0.686 + 0.314 * (1 - v),
                    0.168 - 0.168 * (1 - v),
                    0,
                    0
                ],
                [
                    0.272 - 0.272 * (1 - v),
                    0.534 - 0.534 * (1 - v),
                    0.131 + 0.869 * (1 - v),
                    0,
                    0
                ],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1]
            ];
        },
        grayscale(v) {
            return [
                [
                    0.2126 + 0.7874 * (1 - v),
                    0.7152 - 0.7152 * (1 - v),
                    0.0722 - 0.0722 * (1 - v),
                    0,
                    0
                ],
                [
                    0.2126 - 0.2126 * (1 - v),
                    0.7152 + 0.2848 * (1 - v),
                    0.0722 - 0.0722 * (1 - v),
                    0,
                    0
                ],
                [
                    0.2126 - 0.2126 * (1 - v),
                    0.7152 - 0.7152 * (1 - v),
                    0.0722 + 0.9278 * (1 - v),
                    0,
                    0
                ],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1]
            ];
        }
    };

    var FilterMode;
    (function (FilterMode) {
        FilterMode[(FilterMode["light"] = 0)] = "light";
        FilterMode[(FilterMode["dark"] = 1)] = "dark";
    })(FilterMode || (FilterMode = {}));
    function getCSSFilterValue(config) {
        const filters = [];
        if (config.mode === FilterMode.dark) {
            filters.push("invert(100%) hue-rotate(180deg)");
        }
        if (config.brightness !== 100) {
            filters.push(`brightness(${config.brightness}%)`);
        }
        if (config.contrast !== 100) {
            filters.push(`contrast(${config.contrast}%)`);
        }
        if (config.grayscale !== 0) {
            filters.push(`grayscale(${config.grayscale}%)`);
        }
        if (config.sepia !== 0) {
            filters.push(`sepia(${config.sepia}%)`);
        }
        if (filters.length === 0) {
            return null;
        }
        return filters.join(" ");
    }

    function evalMath(expression) {
        const rpnStack = [];
        const workingStack = [];
        let lastToken;
        for (let i = 0, len = expression.length; i < len; i++) {
            const token = expression[i];
            if (!token || token === " ") {
                continue;
            }
            if (operators.has(token)) {
                const op = operators.get(token);
                while (workingStack.length) {
                    const currentOp = operators.get(workingStack[0]);
                    if (!currentOp) {
                        break;
                    }
                    if (op.lessOrEqualThan(currentOp)) {
                        rpnStack.push(workingStack.shift());
                    } else {
                        break;
                    }
                }
                workingStack.unshift(token);
            } else if (!lastToken || operators.has(lastToken)) {
                rpnStack.push(token);
            } else {
                rpnStack[rpnStack.length - 1] += token;
            }
            lastToken = token;
        }
        rpnStack.push(...workingStack);
        const stack = [];
        for (let i = 0, len = rpnStack.length; i < len; i++) {
            const op = operators.get(rpnStack[i]);
            if (op) {
                const args = stack.splice(0, 2);
                stack.push(op.exec(args[1], args[0]));
            } else {
                stack.unshift(parseFloat(rpnStack[i]));
            }
        }
        return stack[0];
    }
    class Operator {
        constructor(precedence, method) {
            this.precendce = precedence;
            this.execMethod = method;
        }
        exec(left, right) {
            return this.execMethod(left, right);
        }
        lessOrEqualThan(op) {
            return this.precendce <= op.precendce;
        }
    }
    const operators = new Map([
        ["+", new Operator(1, (left, right) => left + right)],
        ["-", new Operator(1, (left, right) => left - right)],
        ["*", new Operator(2, (left, right) => left * right)],
        ["/", new Operator(2, (left, right) => left / right)]
    ]);

    const isSystemDarkModeEnabled = () =>
        matchMedia("(prefers-color-scheme: dark)").matches;

    const hslaParseCache = new Map();
    const rgbaParseCache = new Map();
    function parseColorWithCache($color) {
        $color = $color.trim();
        if (rgbaParseCache.has($color)) {
            return rgbaParseCache.get($color);
        }
        if ($color.includes("calc(")) {
            $color = lowerCalcExpression($color);
        }
        const color = parse($color);
        if (color) {
            rgbaParseCache.set($color, color);
            return color;
        }
        return null;
    }
    function parseToHSLWithCache(color) {
        if (hslaParseCache.has(color)) {
            return hslaParseCache.get(color);
        }
        const rgb = parseColorWithCache(color);
        if (!rgb) {
            return null;
        }
        const hsl = rgbToHSL(rgb);
        hslaParseCache.set(color, hsl);
        return hsl;
    }
    function clearColorCache() {
        hslaParseCache.clear();
        rgbaParseCache.clear();
    }
    function hslToRGB({h, s, l, a = 1}) {
        if (s === 0) {
            const [r, b, g] = [l, l, l].map((x) => Math.round(x * 255));
            return {r, g, b, a};
        }
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        const [r, g, b] = (
            h < 60
                ? [c, x, 0]
                : h < 120
                  ? [x, c, 0]
                  : h < 180
                    ? [0, c, x]
                    : h < 240
                      ? [0, x, c]
                      : h < 300
                        ? [x, 0, c]
                        : [c, 0, x]
        ).map((n) => Math.round((n + m) * 255));
        return {r, g, b, a};
    }
    function rgbToHSL({r: r255, g: g255, b: b255, a = 1}) {
        const r = r255 / 255;
        const g = g255 / 255;
        const b = b255 / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const c = max - min;
        const l = (max + min) / 2;
        if (c === 0) {
            return {h: 0, s: 0, l, a};
        }
        let h =
            (max === r
                ? ((g - b) / c) % 6
                : max === g
                  ? (b - r) / c + 2
                  : (r - g) / c + 4) * 60;
        if (h < 0) {
            h += 360;
        }
        const s = c / (1 - Math.abs(2 * l - 1));
        return {h, s, l, a};
    }
    function toFixed(n, digits = 0) {
        const fixed = n.toFixed(digits);
        if (digits === 0) {
            return fixed;
        }
        const dot = fixed.indexOf(".");
        if (dot >= 0) {
            const zerosMatch = fixed.match(/0+$/);
            if (zerosMatch) {
                if (zerosMatch.index === dot + 1) {
                    return fixed.substring(0, dot);
                }
                return fixed.substring(0, zerosMatch.index);
            }
        }
        return fixed;
    }
    function rgbToString(rgb) {
        const {r, g, b, a} = rgb;
        if (a != null && a < 1) {
            return `rgba(${toFixed(r)}, ${toFixed(g)}, ${toFixed(b)}, ${toFixed(a, 2)})`;
        }
        return `rgb(${toFixed(r)}, ${toFixed(g)}, ${toFixed(b)})`;
    }
    function rgbToHexString({r, g, b, a}) {
        return `#${(a != null && a < 1
            ? [r, g, b, Math.round(a * 255)]
            : [r, g, b]
        )
            .map((x) => {
                return `${x < 16 ? "0" : ""}${x.toString(16)}`;
            })
            .join("")}`;
    }
    function hslToString(hsl) {
        const {h, s, l, a} = hsl;
        if (a != null && a < 1) {
            return `hsla(${toFixed(h)}, ${toFixed(s * 100)}%, ${toFixed(l * 100)}%, ${toFixed(a, 2)})`;
        }
        return `hsl(${toFixed(h)}, ${toFixed(s * 100)}%, ${toFixed(l * 100)}%)`;
    }
    const rgbMatch = /^rgba?\([^\(\)]+\)$/;
    const hslMatch = /^hsla?\([^\(\)]+\)$/;
    const hexMatch = /^#[0-9a-f]+$/i;
    const supportedColorFuncs = [
        "color",
        "color-mix",
        "hwb",
        "lab",
        "lch",
        "oklab",
        "oklch"
    ];
    function parse($color) {
        const c = $color.trim().toLowerCase();
        if (c.includes("(from ")) {
            if (c.indexOf("(from") !== c.lastIndexOf("(from")) {
                return null;
            }
            return domParseColor(c);
        }
        if (c.match(rgbMatch)) {
            if (c.startsWith("rgb(#") || c.startsWith("rgba(#")) {
                if (c.lastIndexOf("rgb") > 0) {
                    return null;
                }
                return domParseColor(c);
            }
            return parseRGB(c);
        }
        if (c.match(hslMatch)) {
            return parseHSL(c);
        }
        if (c.match(hexMatch)) {
            return parseHex(c);
        }
        if (knownColors.has(c)) {
            return getColorByName(c);
        }
        if (systemColors.has(c)) {
            return getSystemColor(c);
        }
        if (c === "transparent") {
            return {r: 0, g: 0, b: 0, a: 0};
        }
        if (
            c.endsWith(")") &&
            supportedColorFuncs.some(
                (fn) =>
                    c.startsWith(fn) &&
                    c[fn.length] === "(" &&
                    c.lastIndexOf(fn) === 0
            )
        ) {
            return domParseColor(c);
        }
        if (c.startsWith("light-dark(") && c.endsWith(")")) {
            const match = c.match(
                /^light-dark\(\s*([a-z]+(\(.*\))?),\s*([a-z]+(\(.*\))?)\s*\)$/
            );
            if (match) {
                const schemeColor = isSystemDarkModeEnabled()
                    ? match[3]
                    : match[1];
                return parse(schemeColor);
            }
        }
        return null;
    }
    function getNumbers($color) {
        const numbers = [];
        let prevPos = 0;
        let isMining = false;
        const startIndex = $color.indexOf("(");
        $color = $color.substring(startIndex + 1, $color.length - 1);
        for (let i = 0; i < $color.length; i++) {
            const c = $color[i];
            if ((c >= "0" && c <= "9") || c === "." || c === "+" || c === "-") {
                isMining = true;
            } else if (isMining && (c === " " || c === "," || c === "/")) {
                numbers.push($color.substring(prevPos, i));
                isMining = false;
                prevPos = i + 1;
            } else if (!isMining) {
                prevPos = i + 1;
            }
        }
        if (isMining) {
            numbers.push($color.substring(prevPos, $color.length));
        }
        return numbers;
    }
    function getNumbersFromString(str, range, units) {
        const raw = getNumbers(str);
        const unitsList = Object.entries(units);
        const numbers = raw
            .map((r) => r.trim())
            .map((r, i) => {
                let n;
                const unit = unitsList.find(([u]) => r.endsWith(u));
                if (unit) {
                    n =
                        (parseFloat(r.substring(0, r.length - unit[0].length)) /
                            unit[1]) *
                        range[i];
                } else {
                    n = parseFloat(r);
                }
                if (range[i] > 1) {
                    return Math.round(n);
                }
                return n;
            });
        return numbers;
    }
    const rgbRange = [255, 255, 255, 1];
    const rgbUnits = {"%": 100};
    function parseRGB($rgb) {
        const [r, g, b, a = 1] = getNumbersFromString($rgb, rgbRange, rgbUnits);
        if (r == null || g == null || b == null || a == null) {
            return null;
        }
        return {r, g, b, a};
    }
    const hslRange = [360, 1, 1, 1];
    const hslUnits = {"%": 100, "deg": 360, "rad": 2 * Math.PI, "turn": 1};
    function parseHSL($hsl) {
        const [h, s, l, a = 1] = getNumbersFromString($hsl, hslRange, hslUnits);
        if (h == null || s == null || l == null || a == null) {
            return null;
        }
        return hslToRGB({h, s, l, a});
    }
    function parseHex($hex) {
        const h = $hex.substring(1);
        switch (h.length) {
            case 3:
            case 4: {
                const [r, g, b] = [0, 1, 2].map((i) =>
                    parseInt(`${h[i]}${h[i]}`, 16)
                );
                const a =
                    h.length === 3 ? 1 : parseInt(`${h[3]}${h[3]}`, 16) / 255;
                return {r, g, b, a};
            }
            case 6:
            case 8: {
                const [r, g, b] = [0, 2, 4].map((i) =>
                    parseInt(h.substring(i, i + 2), 16)
                );
                const a =
                    h.length === 6 ? 1 : parseInt(h.substring(6, 8), 16) / 255;
                return {r, g, b, a};
            }
        }
        return null;
    }
    function getColorByName($color) {
        const n = knownColors.get($color);
        return {
            r: (n >> 16) & 255,
            g: (n >> 8) & 255,
            b: (n >> 0) & 255,
            a: 1
        };
    }
    function getSystemColor($color) {
        const n = systemColors.get($color);
        return {
            r: (n >> 16) & 255,
            g: (n >> 8) & 255,
            b: (n >> 0) & 255,
            a: 1
        };
    }
    function lowerCalcExpression(color) {
        let searchIndex = 0;
        const replaceBetweenIndices = (start, end, replacement) => {
            color =
                color.substring(0, start) + replacement + color.substring(end);
        };
        while ((searchIndex = color.indexOf("calc(")) !== -1) {
            const range = getParenthesesRange(color, searchIndex);
            if (!range) {
                break;
            }
            let slice = color.slice(range.start + 1, range.end - 1);
            const includesPercentage = slice.includes("%");
            slice = slice.split("%").join("");
            const output = Math.round(evalMath(slice));
            replaceBetweenIndices(
                range.start - 4,
                range.end,
                output + (includesPercentage ? "%" : "")
            );
        }
        return color;
    }
    const knownColors = new Map(
        Object.entries({
            aliceblue: 0xf0f8ff,
            antiquewhite: 0xfaebd7,
            aqua: 0x00ffff,
            aquamarine: 0x7fffd4,
            azure: 0xf0ffff,
            beige: 0xf5f5dc,
            bisque: 0xffe4c4,
            black: 0x000000,
            blanchedalmond: 0xffebcd,
            blue: 0x0000ff,
            blueviolet: 0x8a2be2,
            brown: 0xa52a2a,
            burlywood: 0xdeb887,
            cadetblue: 0x5f9ea0,
            chartreuse: 0x7fff00,
            chocolate: 0xd2691e,
            coral: 0xff7f50,
            cornflowerblue: 0x6495ed,
            cornsilk: 0xfff8dc,
            crimson: 0xdc143c,
            cyan: 0x00ffff,
            darkblue: 0x00008b,
            darkcyan: 0x008b8b,
            darkgoldenrod: 0xb8860b,
            darkgray: 0xa9a9a9,
            darkgrey: 0xa9a9a9,
            darkgreen: 0x006400,
            darkkhaki: 0xbdb76b,
            darkmagenta: 0x8b008b,
            darkolivegreen: 0x556b2f,
            darkorange: 0xff8c00,
            darkorchid: 0x9932cc,
            darkred: 0x8b0000,
            darksalmon: 0xe9967a,
            darkseagreen: 0x8fbc8f,
            darkslateblue: 0x483d8b,
            darkslategray: 0x2f4f4f,
            darkslategrey: 0x2f4f4f,
            darkturquoise: 0x00ced1,
            darkviolet: 0x9400d3,
            deeppink: 0xff1493,
            deepskyblue: 0x00bfff,
            dimgray: 0x696969,
            dimgrey: 0x696969,
            dodgerblue: 0x1e90ff,
            firebrick: 0xb22222,
            floralwhite: 0xfffaf0,
            forestgreen: 0x228b22,
            fuchsia: 0xff00ff,
            gainsboro: 0xdcdcdc,
            ghostwhite: 0xf8f8ff,
            gold: 0xffd700,
            goldenrod: 0xdaa520,
            gray: 0x808080,
            grey: 0x808080,
            green: 0x008000,
            greenyellow: 0xadff2f,
            honeydew: 0xf0fff0,
            hotpink: 0xff69b4,
            indianred: 0xcd5c5c,
            indigo: 0x4b0082,
            ivory: 0xfffff0,
            khaki: 0xf0e68c,
            lavender: 0xe6e6fa,
            lavenderblush: 0xfff0f5,
            lawngreen: 0x7cfc00,
            lemonchiffon: 0xfffacd,
            lightblue: 0xadd8e6,
            lightcoral: 0xf08080,
            lightcyan: 0xe0ffff,
            lightgoldenrodyellow: 0xfafad2,
            lightgray: 0xd3d3d3,
            lightgrey: 0xd3d3d3,
            lightgreen: 0x90ee90,
            lightpink: 0xffb6c1,
            lightsalmon: 0xffa07a,
            lightseagreen: 0x20b2aa,
            lightskyblue: 0x87cefa,
            lightslategray: 0x778899,
            lightslategrey: 0x778899,
            lightsteelblue: 0xb0c4de,
            lightyellow: 0xffffe0,
            lime: 0x00ff00,
            limegreen: 0x32cd32,
            linen: 0xfaf0e6,
            magenta: 0xff00ff,
            maroon: 0x800000,
            mediumaquamarine: 0x66cdaa,
            mediumblue: 0x0000cd,
            mediumorchid: 0xba55d3,
            mediumpurple: 0x9370db,
            mediumseagreen: 0x3cb371,
            mediumslateblue: 0x7b68ee,
            mediumspringgreen: 0x00fa9a,
            mediumturquoise: 0x48d1cc,
            mediumvioletred: 0xc71585,
            midnightblue: 0x191970,
            mintcream: 0xf5fffa,
            mistyrose: 0xffe4e1,
            moccasin: 0xffe4b5,
            navajowhite: 0xffdead,
            navy: 0x000080,
            oldlace: 0xfdf5e6,
            olive: 0x808000,
            olivedrab: 0x6b8e23,
            orange: 0xffa500,
            orangered: 0xff4500,
            orchid: 0xda70d6,
            palegoldenrod: 0xeee8aa,
            palegreen: 0x98fb98,
            paleturquoise: 0xafeeee,
            palevioletred: 0xdb7093,
            papayawhip: 0xffefd5,
            peachpuff: 0xffdab9,
            peru: 0xcd853f,
            pink: 0xffc0cb,
            plum: 0xdda0dd,
            powderblue: 0xb0e0e6,
            purple: 0x800080,
            rebeccapurple: 0x663399,
            red: 0xff0000,
            rosybrown: 0xbc8f8f,
            royalblue: 0x4169e1,
            saddlebrown: 0x8b4513,
            salmon: 0xfa8072,
            sandybrown: 0xf4a460,
            seagreen: 0x2e8b57,
            seashell: 0xfff5ee,
            sienna: 0xa0522d,
            silver: 0xc0c0c0,
            skyblue: 0x87ceeb,
            slateblue: 0x6a5acd,
            slategray: 0x708090,
            slategrey: 0x708090,
            snow: 0xfffafa,
            springgreen: 0x00ff7f,
            steelblue: 0x4682b4,
            tan: 0xd2b48c,
            teal: 0x008080,
            thistle: 0xd8bfd8,
            tomato: 0xff6347,
            turquoise: 0x40e0d0,
            violet: 0xee82ee,
            wheat: 0xf5deb3,
            white: 0xffffff,
            whitesmoke: 0xf5f5f5,
            yellow: 0xffff00,
            yellowgreen: 0x9acd32
        })
    );
    const systemColors = new Map(
        Object.entries({
            "ActiveBorder": 0x3b99fc,
            "ActiveCaption": 0x000000,
            "AppWorkspace": 0xaaaaaa,
            "Background": 0x6363ce,
            "ButtonFace": 0xffffff,
            "ButtonHighlight": 0xe9e9e9,
            "ButtonShadow": 0x9fa09f,
            "ButtonText": 0x000000,
            "CaptionText": 0x000000,
            "GrayText": 0x7f7f7f,
            "Highlight": 0xb2d7ff,
            "HighlightText": 0x000000,
            "InactiveBorder": 0xffffff,
            "InactiveCaption": 0xffffff,
            "InactiveCaptionText": 0x000000,
            "InfoBackground": 0xfbfcc5,
            "InfoText": 0x000000,
            "Menu": 0xf6f6f6,
            "MenuText": 0xffffff,
            "Scrollbar": 0xaaaaaa,
            "ThreeDDarkShadow": 0x000000,
            "ThreeDFace": 0xc0c0c0,
            "ThreeDHighlight": 0xffffff,
            "ThreeDLightShadow": 0xffffff,
            "ThreeDShadow": 0x000000,
            "Window": 0xececec,
            "WindowFrame": 0xaaaaaa,
            "WindowText": 0x000000,
            "-webkit-focus-ring-color": 0xe59700
        }).map(([key, value]) => [key.toLowerCase(), value])
    );
    function getSRGBLightness(r, g, b) {
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    }
    let canvas$1;
    let context$1;
    function domParseColor($color) {
        if (!context$1) {
            canvas$1 = document.createElement("canvas");
            canvas$1.width = 1;
            canvas$1.height = 1;
            context$1 = canvas$1.getContext("2d", {willReadFrequently: true});
        }
        context$1.fillStyle = $color;
        context$1.fillRect(0, 0, 1, 1);
        const d = context$1.getImageData(0, 0, 1, 1).data;
        const color = `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${(d[3] / 255).toFixed(2)})`;
        return parseRGB(color);
    }

    function throttle(callback) {
        let pending = false;
        let frameId = null;
        let lastArgs;
        const throttled = (...args) => {
            lastArgs = args;
            if (frameId) {
                pending = true;
            } else {
                callback(...lastArgs);
                frameId = requestAnimationFrame(() => {
                    frameId = null;
                    if (pending) {
                        callback(...lastArgs);
                        pending = false;
                    }
                });
            }
        };
        const cancel = () => {
            cancelAnimationFrame(frameId);
            pending = false;
            frameId = null;
        };
        return Object.assign(throttled, {cancel});
    }
    function createAsyncTasksQueue() {
        const tasks = [];
        let frameId = null;
        function runTasks() {
            let task;
            while ((task = tasks.shift())) {
                task();
            }
            frameId = null;
        }
        function add(task) {
            tasks.push(task);
            if (!frameId) {
                frameId = requestAnimationFrame(runTasks);
            }
        }
        function cancel() {
            tasks.splice(0);
            cancelAnimationFrame(frameId);
            frameId = null;
        }
        return {add, cancel};
    }
    const delayTokens = new Set();
    function requestAnimationFrameOnce(token, callback) {
        if (delayTokens.has(token)) {
            return;
        }
        delayTokens.add(token);
        requestAnimationFrame(() => {
            delayTokens.delete(token);
            callback();
        });
    }

    function hexify(number) {
        return (number < 16 ? "0" : "") + number.toString(16);
    }
    function generateUID() {
        if ("randomUUID" in crypto) {
            const uuid = crypto.randomUUID();
            return (
                uuid.substring(0, 8) +
                uuid.substring(9, 13) +
                uuid.substring(14, 18) +
                uuid.substring(19, 23) +
                uuid.substring(24)
            );
        }
        if ("getRandomValues" in crypto) {
            return Array.from(crypto.getRandomValues(new Uint8Array(16)))
                .map((x) => hexify(x))
                .join("");
        }
        return Math.floor(Math.random() * 2 ** 55).toString(36);
    }

    let documentVisibilityListener = null;
    let documentIsVisible_ = !document.hidden;
    const listenerOptions = {
        capture: true,
        passive: true
    };
    function watchForDocumentVisibility() {
        document.addEventListener(
            "visibilitychange",
            documentVisibilityListener,
            listenerOptions
        );
        window.addEventListener(
            "pageshow",
            documentVisibilityListener,
            listenerOptions
        );
        window.addEventListener(
            "focus",
            documentVisibilityListener,
            listenerOptions
        );
    }
    function stopWatchingForDocumentVisibility() {
        document.removeEventListener(
            "visibilitychange",
            documentVisibilityListener,
            listenerOptions
        );
        window.removeEventListener(
            "pageshow",
            documentVisibilityListener,
            listenerOptions
        );
        window.removeEventListener(
            "focus",
            documentVisibilityListener,
            listenerOptions
        );
    }
    function setDocumentVisibilityListener(callback) {
        const alreadyWatching = Boolean(documentVisibilityListener);
        documentVisibilityListener = () => {
            if (!document.hidden) {
                removeDocumentVisibilityListener();
                callback();
                documentIsVisible_ = true;
            }
        };
        if (!alreadyWatching) {
            watchForDocumentVisibility();
        }
    }
    function removeDocumentVisibilityListener() {
        stopWatchingForDocumentVisibility();
        documentVisibilityListener = null;
    }
    function documentIsVisible() {
        return documentIsVisible_;
    }

    function getDuration(time) {
        let duration = 0;
        if (time.seconds) {
            duration += time.seconds * 1000;
        }
        if (time.minutes) {
            duration += time.minutes * 60 * 1000;
        }
        if (time.hours) {
            duration += time.hours * 60 * 60 * 1000;
        }
        if (time.days) {
            duration += time.days * 24 * 60 * 60 * 1000;
        }
        return duration;
    }

    function logInfo(...args) {}
    function logWarn(...args) {}
    function logAssert(...args) {}
    function ASSERT(description, condition) {
        if (!condition) {
            logAssert(description);
        }
    }

    function removeNode(node) {
        node && node.parentNode && node.parentNode.removeChild(node);
    }
    function watchForNodePosition(node, mode, onRestore = Function.prototype) {
        const MAX_ATTEMPTS_COUNT = 10;
        const RETRY_TIMEOUT = getDuration({seconds: 2});
        const ATTEMPTS_INTERVAL = getDuration({seconds: 10});
        let prevSibling = node.previousSibling;
        let parent = node.parentNode;
        if (!parent) {
            throw new Error(
                "Unable to watch for node position: parent element not found"
            );
        }
        if (mode === "prev-sibling" && !prevSibling) {
            throw new Error(
                "Unable to watch for node position: there is no previous sibling"
            );
        }
        let attempts = 0;
        let start = null;
        let timeoutId = null;
        const restore = throttle(() => {
            if (timeoutId) {
                return;
            }
            attempts++;
            const now = Date.now();
            if (start == null) {
                start = now;
            } else if (attempts >= MAX_ATTEMPTS_COUNT) {
                if (now - start < ATTEMPTS_INTERVAL) {
                    logWarn(
                        `Node position watcher paused: retry in ${RETRY_TIMEOUT}ms`,
                        node,
                        prevSibling
                    );
                    timeoutId = setTimeout(() => {
                        start = null;
                        attempts = 0;
                        timeoutId = null;
                        restore();
                    }, RETRY_TIMEOUT);
                    return;
                }
                start = now;
                attempts = 1;
            }
            if (mode === "head") {
                if (prevSibling && prevSibling.parentNode !== parent) {
                    logWarn(
                        "Sibling moved, moving node to the head end",
                        node,
                        prevSibling,
                        parent
                    );
                    prevSibling = document.head.lastChild;
                }
            }
            if (mode === "prev-sibling") {
                if (prevSibling.parentNode == null) {
                    logWarn(
                        "Unable to restore node position: sibling was removed",
                        node,
                        prevSibling,
                        parent
                    );
                    stop();
                    return;
                }
                if (prevSibling.parentNode !== parent) {
                    logWarn(
                        "Style was moved to another parent",
                        node,
                        prevSibling,
                        parent
                    );
                    updateParent(prevSibling.parentNode);
                }
            }
            if (mode === "head" && !parent.isConnected) {
                parent = document.head;
            }
            logWarn("Restoring node position", node, prevSibling, parent);
            parent.insertBefore(
                node,
                prevSibling && prevSibling.isConnected
                    ? prevSibling.nextSibling
                    : parent.firstChild
            );
            observer.takeRecords();
            onRestore && onRestore();
        });
        const observer = new MutationObserver(() => {
            if (
                (mode === "head" &&
                    (node.parentNode !== parent ||
                        !node.parentNode.isConnected)) ||
                (mode === "prev-sibling" &&
                    node.previousSibling !== prevSibling)
            ) {
                restore();
            }
        });
        const run = () => {
            observer.observe(parent, {childList: true});
        };
        const stop = () => {
            clearTimeout(timeoutId);
            observer.disconnect();
            restore.cancel();
        };
        const skip = () => {
            observer.takeRecords();
        };
        const updateParent = (parentNode) => {
            parent = parentNode;
            stop();
            run();
        };
        run();
        return {run, stop, skip};
    }
    function iterateShadowHosts(root, iterator) {
        if (root == null) {
            return;
        }
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode(node) {
                    return node.shadowRoot == null
                        ? NodeFilter.FILTER_SKIP
                        : NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        for (
            let node = root.shadowRoot ? walker.currentNode : walker.nextNode();
            node != null;
            node = walker.nextNode()
        ) {
            if (node.classList.contains("surfingkeys_hints_host")) {
                continue;
            }
            iterator(node);
            iterateShadowHosts(node.shadowRoot, iterator);
        }
    }
    let isDOMReady = () => {
        return (
            document.readyState === "complete" ||
            document.readyState === "interactive"
        );
    };
    function setIsDOMReady(newFunc) {
        isDOMReady = newFunc;
    }
    const readyStateListeners = new Set();
    function addDOMReadyListener(listener) {
        isDOMReady() ? listener() : readyStateListeners.add(listener);
    }
    function removeDOMReadyListener(listener) {
        readyStateListeners.delete(listener);
    }
    function isReadyStateComplete() {
        return document.readyState === "complete";
    }
    const readyStateCompleteListeners = new Set();
    function addReadyStateCompleteListener(listener) {
        isReadyStateComplete()
            ? listener()
            : readyStateCompleteListeners.add(listener);
    }
    function cleanReadyStateCompleteListeners() {
        readyStateCompleteListeners.clear();
    }
    if (!isDOMReady()) {
        const onReadyStateChange = () => {
            if (isDOMReady()) {
                readyStateListeners.forEach((listener) => listener());
                readyStateListeners.clear();
                if (isReadyStateComplete()) {
                    document.removeEventListener(
                        "readystatechange",
                        onReadyStateChange
                    );
                    readyStateCompleteListeners.forEach((listener) =>
                        listener()
                    );
                    readyStateCompleteListeners.clear();
                }
            }
        };
        document.addEventListener("readystatechange", onReadyStateChange);
    }
    const HUGE_MUTATIONS_COUNT = 1000;
    function isHugeMutation(mutations) {
        if (mutations.length > HUGE_MUTATIONS_COUNT) {
            return true;
        }
        let addedNodesCount = 0;
        for (let i = 0; i < mutations.length; i++) {
            addedNodesCount += mutations[i].addedNodes.length;
            if (addedNodesCount > HUGE_MUTATIONS_COUNT) {
                return true;
            }
        }
        return false;
    }
    function getElementsTreeOperations(mutations) {
        const additions = new Set();
        const deletions = new Set();
        const moves = new Set();
        mutations.forEach((m) => {
            forEach(m.addedNodes, (n) => {
                if (n instanceof Element && n.isConnected) {
                    additions.add(n);
                }
            });
            forEach(m.removedNodes, (n) => {
                if (n instanceof Element) {
                    if (n.isConnected) {
                        moves.add(n);
                        additions.delete(n);
                    } else {
                        deletions.add(n);
                    }
                }
            });
        });
        const duplicateAdditions = [];
        const duplicateDeletions = [];
        additions.forEach((node) => {
            if (additions.has(node.parentElement)) {
                duplicateAdditions.push(node);
            }
        });
        deletions.forEach((node) => {
            if (deletions.has(node.parentElement)) {
                duplicateDeletions.push(node);
            }
        });
        duplicateAdditions.forEach((node) => additions.delete(node));
        duplicateDeletions.forEach((node) => deletions.delete(node));
        return {additions, moves, deletions};
    }
    const optimizedTreeObservers = new Map();
    const optimizedTreeCallbacks = new WeakMap();
    function createOptimizedTreeObserver(root, callbacks) {
        let observer;
        let observerCallbacks;
        let domReadyListener;
        if (optimizedTreeObservers.has(root)) {
            observer = optimizedTreeObservers.get(root);
            observerCallbacks = optimizedTreeCallbacks.get(observer);
        } else {
            let hadHugeMutationsBefore = false;
            let subscribedForReadyState = false;
            observer = new MutationObserver((mutations) => {
                if (isHugeMutation(mutations)) {
                    if (!hadHugeMutationsBefore || isDOMReady()) {
                        observerCallbacks.forEach(({onHugeMutations}) =>
                            onHugeMutations(root)
                        );
                    } else if (!subscribedForReadyState) {
                        domReadyListener = () =>
                            observerCallbacks.forEach(({onHugeMutations}) =>
                                onHugeMutations(root)
                            );
                        addDOMReadyListener(domReadyListener);
                        subscribedForReadyState = true;
                    }
                    hadHugeMutationsBefore = true;
                } else {
                    const elementsOperations =
                        getElementsTreeOperations(mutations);
                    observerCallbacks.forEach(({onMinorMutations}) =>
                        onMinorMutations(root, elementsOperations)
                    );
                }
            });
            observer.observe(root, {childList: true, subtree: true});
            optimizedTreeObservers.set(root, observer);
            observerCallbacks = new Set();
            optimizedTreeCallbacks.set(observer, observerCallbacks);
        }
        observerCallbacks.add(callbacks);
        return {
            disconnect() {
                observerCallbacks.delete(callbacks);
                if (domReadyListener) {
                    removeDOMReadyListener(domReadyListener);
                }
                if (observerCallbacks.size === 0) {
                    observer.disconnect();
                    optimizedTreeCallbacks.delete(observer);
                    optimizedTreeObservers.delete(root);
                }
            }
        };
    }

    function iterateCSSRules(rules, iterate, onImportError) {
        forEach(rules, (rule) => {
            if (isStyleRule(rule)) {
                iterate(rule);
                if (rule.cssRules?.length > 0) {
                    iterateCSSRules(rule.cssRules, iterate);
                }
            } else if (isImportRule(rule)) {
                try {
                    iterateCSSRules(
                        rule.styleSheet.cssRules,
                        iterate,
                        onImportError
                    );
                } catch (err) {
                    onImportError?.();
                }
            } else if (isMediaRule(rule)) {
                const media = Array.from(rule.media);
                const isScreenOrAllOrQuery = media.some(
                    (m) =>
                        m.startsWith("screen") ||
                        m.startsWith("all") ||
                        m.startsWith("(")
                );
                const isPrintOrSpeech = media.some(
                    (m) => m.startsWith("print") || m.startsWith("speech")
                );
                if (isScreenOrAllOrQuery || !isPrintOrSpeech) {
                    iterateCSSRules(rule.cssRules, iterate, onImportError);
                }
            } else if (isSupportsRule(rule)) {
                if (CSS.supports(rule.conditionText)) {
                    iterateCSSRules(rule.cssRules, iterate, onImportError);
                }
            } else if (isLayerRule(rule)) {
                iterateCSSRules(rule.cssRules, iterate, onImportError);
            } else {
                logWarn(`CSSRule type not supported`, rule);
            }
        });
    }
    const shorthandVarDependantProperties = [
        "background",
        "border",
        "border-color",
        "border-bottom",
        "border-left",
        "border-right",
        "border-top",
        "outline",
        "outline-color"
    ];
    const shorthandVarDepPropRegexps = isSafari
        ? shorthandVarDependantProperties.map((prop) => {
              const regexp = new RegExp(`${prop}:\\s*(.*?)\\s*;`);
              return [prop, regexp];
          })
        : null;
    function iterateCSSDeclarations(style, iterate) {
        forEach(style, (property) => {
            const value = style.getPropertyValue(property).trim();
            if (!value) {
                return;
            }
            iterate(property, value);
        });
        const cssText = style.cssText;
        if (cssText.includes("var(")) {
            if (isSafari) {
                shorthandVarDepPropRegexps.forEach(([prop, regexp]) => {
                    const match = cssText.match(regexp);
                    if (match && match[1]) {
                        const val = match[1].trim();
                        iterate(prop, val);
                    }
                });
            } else {
                shorthandVarDependantProperties.forEach((prop) => {
                    const val = style.getPropertyValue(prop);
                    if (val && val.includes("var(")) {
                        iterate(prop, val);
                    }
                });
            }
        }
        if (
            cssText.includes("background-color: ;") &&
            !style.getPropertyValue("background")
        ) {
            handleEmptyShorthand("background", style, iterate);
        }
        if (
            cssText.includes("border-") &&
            cssText.includes("-color: ;") &&
            !style.getPropertyValue("border")
        ) {
            handleEmptyShorthand("border", style, iterate);
        }
    }
    function handleEmptyShorthand(shorthand, style, iterate) {
        const parentRule = style.parentRule;
        if (isStyleRule(parentRule)) {
            const sourceCSSText =
                parentRule.parentStyleSheet?.ownerNode?.textContent;
            if (sourceCSSText) {
                let escapedSelector = escapeRegExpSpecialChars(
                    parentRule.selectorText
                );
                escapedSelector = escapedSelector.replaceAll(/\s+/g, "\\s*");
                escapedSelector = escapedSelector.replaceAll(/::/g, "::?");
                const regexp = new RegExp(
                    `${escapedSelector}\\s*{[^}]*${shorthand}:\\s*([^;}]+)`
                );
                const match = sourceCSSText.match(regexp);
                if (match) {
                    iterate(shorthand, match[1]);
                }
            } else if (shorthand === "background") {
                iterate("background-color", "#ffffff");
            }
        }
    }
    const cssURLRegex = /url\((('.*?')|(".*?")|([^\)]*?))\)/g;
    const cssImportRegex =
        /@import\s*(url\()?(('.+?')|(".+?")|([^\)]*?))\)? ?(screen)?;?/gi;
    function getCSSURLValue(cssURL) {
        return cssURL
            .trim()
            .replace(/[\n\r\\]+/g, "")
            .replace(/^url\((.*)\)$/, "$1")
            .trim()
            .replace(/^"(.*)"$/, "$1")
            .replace(/^'(.*)'$/, "$1")
            .replace(/(?:\\(.))/g, "$1");
    }
    function getCSSBaseBath(url) {
        const cssURL = parseURL(url);
        return `${cssURL.origin}${cssURL.pathname.replace(/\?.*$/, "").replace(/(\/)([^\/]+)$/i, "$1")}`;
    }
    function replaceCSSRelativeURLsWithAbsolute($css, cssBasePath) {
        return $css.replace(cssURLRegex, (match) => {
            try {
                const url = getCSSURLValue(match);
                const absoluteURL = getAbsoluteURL(cssBasePath, url);
                const escapedURL = absoluteURL.replaceAll("'", "\\'");
                return `url('${escapedURL}')`;
            } catch (err) {
                logWarn(
                    "Not able to replace relative URL with Absolute URL, skipping"
                );
                return match;
            }
        });
    }
    const fontFaceRegex = /@font-face\s*{[^}]*}/g;
    function replaceCSSFontFace($css) {
        return $css.replace(fontFaceRegex, "");
    }
    const styleRules = new WeakSet();
    const importRules = new WeakSet();
    const mediaRules = new WeakSet();
    const supportsRules = new WeakSet();
    const layerRules = new WeakSet();
    function isStyleRule(rule) {
        if (!rule) {
            return false;
        }
        if (styleRules.has(rule)) {
            return true;
        }
        if (rule.selectorText) {
            styleRules.add(rule);
            return true;
        }
        return false;
    }
    function isImportRule(rule) {
        if (!rule) {
            return false;
        }
        if (styleRules.has(rule)) {
            return false;
        }
        if (importRules.has(rule)) {
            return true;
        }
        if (rule.href) {
            importRules.add(rule);
            return true;
        }
        return false;
    }
    function isMediaRule(rule) {
        if (!rule) {
            return false;
        }
        if (styleRules.has(rule)) {
            return false;
        }
        if (mediaRules.has(rule)) {
            return true;
        }
        if (rule.media) {
            mediaRules.add(rule);
            return true;
        }
        return false;
    }
    function isSupportsRule(rule) {
        if (!rule) {
            return false;
        }
        if (styleRules.has(rule)) {
            return false;
        }
        if (supportsRules.has(rule)) {
            return true;
        }
        if (rule instanceof CSSSupportsRule) {
            supportsRules.add(rule);
            return true;
        }
        return false;
    }
    function isLayerRule(rule) {
        if (!rule) {
            return false;
        }
        if (styleRules.has(rule)) {
            return false;
        }
        if (layerRules.has(rule)) {
            return true;
        }
        if (isLayerRuleSupported && rule instanceof CSSLayerBlockRule) {
            layerRules.add(rule);
            return true;
        }
        return false;
    }

    const sheetsScopes = new WeakMap();
    function defineSheetScope(sheet, node) {
        sheetsScopes.set(sheet, node);
    }
    function getSheetScope(sheet) {
        if (!sheet.ownerNode) {
            return null;
        }
        if (sheetsScopes.has(sheet)) {
            return sheetsScopes.get(sheet);
        }
        let node = sheet.ownerNode;
        while (node) {
            if (node instanceof ShadowRoot || node instanceof Document) {
                defineSheetScope(sheet, node);
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }

    let variablesSheet;
    const registeredColors = new Map();
    function registerVariablesSheet(sheet) {
        variablesSheet = sheet;
        const types = ["background", "text", "border"];
        registeredColors.forEach((registered) => {
            types.forEach((type) => {
                if (registered[type]) {
                    const {variable, value} = registered[type];
                    variablesSheet?.cssRules[0].style.setProperty(
                        variable,
                        value
                    );
                }
            });
        });
    }
    function releaseVariablesSheet() {
        variablesSheet = null;
        clearColorPalette();
    }
    function getRegisteredVariableValue(type, registered) {
        return `var(${registered[type].variable}, ${registered[type].value})`;
    }
    function getRegisteredColor(type, parsed) {
        const hex = rgbToHexString(parsed);
        const registered = registeredColors.get(hex);
        if (registered?.[type]) {
            return getRegisteredVariableValue(type, registered);
        }
        return null;
    }
    function registerColor(type, parsed, value) {
        const hex = rgbToHexString(parsed);
        let registered;
        if (registeredColors.has(hex)) {
            registered = registeredColors.get(hex);
        } else {
            const parsed = parseColorWithCache(hex);
            registered = {parsed};
            registeredColors.set(hex, registered);
        }
        const variable = `--darkreader-${type}-${hex.replace("#", "")}`;
        registered[type] = {variable, value};
        if (variablesSheet?.cssRules[0]?.style) {
            variablesSheet?.cssRules[0].style.setProperty(variable, value);
        }
        return getRegisteredVariableValue(type, registered);
    }
    function getColorPalette() {
        const background = [];
        const border = [];
        const text = [];
        registeredColors.forEach((registered) => {
            if (registered.background) {
                background.push(registered.parsed);
            }
            if (registered.border) {
                border.push(registered.parsed);
            }
            if (registered.text) {
                text.push(registered.parsed);
            }
        });
        return {background, border, text};
    }
    function clearColorPalette() {
        registeredColors.clear();
    }

    function getBgPole(theme) {
        const isDarkScheme = theme.mode === 1;
        const prop = isDarkScheme
            ? "darkSchemeBackgroundColor"
            : "lightSchemeBackgroundColor";
        return theme[prop];
    }
    function getFgPole(theme) {
        const isDarkScheme = theme.mode === 1;
        const prop = isDarkScheme
            ? "darkSchemeTextColor"
            : "lightSchemeTextColor";
        return theme[prop];
    }
    const colorModificationCache = new Map();
    function clearColorModificationCache() {
        colorModificationCache.clear();
    }
    const rgbCacheKeys = ["r", "g", "b", "a"];
    const themeCacheKeys = [
        "mode",
        "brightness",
        "contrast",
        "grayscale",
        "sepia",
        "darkSchemeBackgroundColor",
        "darkSchemeTextColor",
        "lightSchemeBackgroundColor",
        "lightSchemeTextColor"
    ];
    function getCacheId(rgb, theme) {
        let resultId = "";
        rgbCacheKeys.forEach((key) => {
            resultId += `${rgb[key]};`;
        });
        themeCacheKeys.forEach((key) => {
            resultId += `${theme[key]};`;
        });
        return resultId;
    }
    function modifyColorWithCache(
        rgb,
        theme,
        modifyHSL,
        poleColor,
        anotherPoleColor
    ) {
        let fnCache;
        if (colorModificationCache.has(modifyHSL)) {
            fnCache = colorModificationCache.get(modifyHSL);
        } else {
            fnCache = new Map();
            colorModificationCache.set(modifyHSL, fnCache);
        }
        const id = getCacheId(rgb, theme);
        if (fnCache.has(id)) {
            return fnCache.get(id);
        }
        const hsl = rgbToHSL(rgb);
        const pole = poleColor == null ? null : parseToHSLWithCache(poleColor);
        const anotherPole =
            anotherPoleColor == null
                ? null
                : parseToHSLWithCache(anotherPoleColor);
        const modified = modifyHSL(hsl, pole, anotherPole);
        const {r, g, b, a} = hslToRGB(modified);
        const matrix = createFilterMatrix({...theme, mode: 0});
        const [rf, gf, bf] = applyColorMatrix([r, g, b], matrix);
        const color =
            a === 1
                ? rgbToHexString({r: rf, g: gf, b: bf})
                : rgbToString({r: rf, g: gf, b: bf, a});
        fnCache.set(id, color);
        return color;
    }
    function modifyAndRegisterColor(type, rgb, theme, modifier) {
        const registered = getRegisteredColor(type, rgb);
        if (registered) {
            return registered;
        }
        const value = modifier(rgb, theme);
        return registerColor(type, rgb, value);
    }
    function modifyLightSchemeColor(rgb, theme) {
        const poleBg = getBgPole(theme);
        const poleFg = getFgPole(theme);
        return modifyColorWithCache(
            rgb,
            theme,
            modifyLightModeHSL,
            poleFg,
            poleBg
        );
    }
    function modifyLightModeHSL({h, s, l, a}, poleFg, poleBg) {
        const isDark = l < 0.5;
        let isNeutral;
        if (isDark) {
            isNeutral = l < 0.2 || s < 0.12;
        } else {
            const isBlue = h > 200 && h < 280;
            isNeutral = s < 0.24 || (l > 0.8 && isBlue);
        }
        let hx = h;
        let sx = s;
        if (isNeutral) {
            if (isDark) {
                hx = poleFg.h;
                sx = poleFg.s;
            } else {
                hx = poleBg.h;
                sx = poleBg.s;
            }
        }
        const lx = scale(l, 0, 1, poleFg.l, poleBg.l);
        return {h: hx, s: sx, l: lx, a};
    }
    const MAX_BG_LIGHTNESS = 0.4;
    function modifyBgHSL({h, s, l, a}, pole) {
        const isDark = l < 0.5;
        const isBlue = h > 200 && h < 280;
        const isNeutral = s < 0.12 || (l > 0.8 && isBlue);
        if (isDark) {
            const lx = scale(l, 0, 0.5, 0, MAX_BG_LIGHTNESS);
            if (isNeutral) {
                const hx = pole.h;
                const sx = pole.s;
                return {h: hx, s: sx, l: lx, a};
            }
            return {h, s, l: lx, a};
        }
        let lx = scale(l, 0.5, 1, MAX_BG_LIGHTNESS, pole.l);
        if (isNeutral) {
            const hx = pole.h;
            const sx = pole.s;
            return {h: hx, s: sx, l: lx, a};
        }
        let hx = h;
        const isYellow = h > 60 && h < 180;
        if (isYellow) {
            const isCloserToGreen = h > 120;
            if (isCloserToGreen) {
                hx = scale(h, 120, 180, 135, 180);
            } else {
                hx = scale(h, 60, 120, 60, 105);
            }
        }
        if (hx > 40 && hx < 80) {
            lx *= 0.75;
        }
        return {h: hx, s, l: lx, a};
    }
    function _modifyBackgroundColor(rgb, theme) {
        if (theme.mode === 0) {
            return modifyLightSchemeColor(rgb, theme);
        }
        const pole = getBgPole(theme);
        return modifyColorWithCache(rgb, theme, modifyBgHSL, pole);
    }
    function modifyBackgroundColor(
        rgb,
        theme,
        shouldRegisterColorVariable = true
    ) {
        if (!shouldRegisterColorVariable) {
            return _modifyBackgroundColor(rgb, theme);
        }
        return modifyAndRegisterColor(
            "background",
            rgb,
            theme,
            _modifyBackgroundColor
        );
    }
    const MIN_FG_LIGHTNESS = 0.55;
    function modifyBlueFgHue(hue) {
        return scale(hue, 205, 245, 205, 220);
    }
    function modifyFgHSL({h, s, l, a}, pole) {
        const isLight = l > 0.5;
        const isNeutral = l < 0.2 || s < 0.24;
        const isBlue = !isNeutral && h > 205 && h < 245;
        if (isLight) {
            const lx = scale(l, 0.5, 1, MIN_FG_LIGHTNESS, pole.l);
            if (isNeutral) {
                const hx = pole.h;
                const sx = pole.s;
                return {h: hx, s: sx, l: lx, a};
            }
            let hx = h;
            if (isBlue) {
                hx = modifyBlueFgHue(h);
            }
            return {h: hx, s, l: lx, a};
        }
        if (isNeutral) {
            const hx = pole.h;
            const sx = pole.s;
            const lx = scale(l, 0, 0.5, pole.l, MIN_FG_LIGHTNESS);
            return {h: hx, s: sx, l: lx, a};
        }
        let hx = h;
        let lx;
        if (isBlue) {
            hx = modifyBlueFgHue(h);
            lx = scale(l, 0, 0.5, pole.l, Math.min(1, MIN_FG_LIGHTNESS + 0.05));
        } else {
            lx = scale(l, 0, 0.5, pole.l, MIN_FG_LIGHTNESS);
        }
        return {h: hx, s, l: lx, a};
    }
    function _modifyForegroundColor(rgb, theme) {
        if (theme.mode === 0) {
            return modifyLightSchemeColor(rgb, theme);
        }
        const pole = getFgPole(theme);
        return modifyColorWithCache(rgb, theme, modifyFgHSL, pole);
    }
    function modifyForegroundColor(
        rgb,
        theme,
        shouldRegisterColorVariable = true
    ) {
        if (!shouldRegisterColorVariable) {
            return _modifyForegroundColor(rgb, theme);
        }
        return modifyAndRegisterColor(
            "text",
            rgb,
            theme,
            _modifyForegroundColor
        );
    }
    function modifyBorderHSL({h, s, l, a}, poleFg, poleBg) {
        const isDark = l < 0.5;
        const isNeutral = l < 0.2 || s < 0.24;
        let hx = h;
        let sx = s;
        if (isNeutral) {
            if (isDark) {
                hx = poleFg.h;
                sx = poleFg.s;
            } else {
                hx = poleBg.h;
                sx = poleBg.s;
            }
        }
        const lx = scale(l, 0, 1, 0.5, 0.2);
        return {h: hx, s: sx, l: lx, a};
    }
    function _modifyBorderColor(rgb, theme) {
        if (theme.mode === 0) {
            return modifyLightSchemeColor(rgb, theme);
        }
        const poleFg = getFgPole(theme);
        const poleBg = getBgPole(theme);
        return modifyColorWithCache(
            rgb,
            theme,
            modifyBorderHSL,
            poleFg,
            poleBg
        );
    }
    function modifyBorderColor(rgb, theme, shouldRegisterColorVariable = true) {
        if (!shouldRegisterColorVariable) {
            return _modifyBorderColor(rgb, theme);
        }
        return modifyAndRegisterColor("border", rgb, theme, _modifyBorderColor);
    }
    function modifyShadowColor(rgb, theme) {
        return modifyBackgroundColor(rgb, theme);
    }
    function modifyGradientColor(rgb, theme) {
        return modifyBackgroundColor(rgb, theme);
    }

    const gradientLength = "gradient".length;
    const conicGradient = "conic-";
    const conicGradientLength = conicGradient.length;
    const radialGradient = "radial-";
    const linearGradient = "linear-";
    function parseGradient(value) {
        const result = [];
        let index = 0;
        let startIndex = conicGradient.length;
        while ((index = value.indexOf("gradient", startIndex)) !== -1) {
            let typeGradient;
            [linearGradient, radialGradient, conicGradient].find(
                (possibleType) => {
                    if (index - possibleType.length >= 0) {
                        const possibleGradient = value.substring(
                            index - possibleType.length,
                            index
                        );
                        if (possibleGradient === possibleType) {
                            if (
                                value.slice(
                                    index - possibleType.length - 10,
                                    index - possibleType.length - 1
                                ) === "repeating"
                            ) {
                                typeGradient = `repeating-${possibleType}gradient`;
                                return true;
                            }
                            if (
                                value.slice(
                                    index - possibleType.length - 8,
                                    index - possibleType.length - 1
                                ) === "-webkit"
                            ) {
                                typeGradient = `-webkit-${possibleType}gradient`;
                                return true;
                            }
                            typeGradient = `${possibleType}gradient`;
                            return true;
                        }
                    }
                }
            );
            if (!typeGradient) {
                break;
            }
            const {start, end} = getParenthesesRange(
                value,
                index + gradientLength
            );
            const match = value.substring(start + 1, end - 1);
            startIndex = end + 1 + conicGradientLength;
            result.push({
                typeGradient,
                match,
                offset: typeGradient.length + 2,
                index: index - typeGradient.length + gradientLength,
                hasComma: true
            });
        }
        if (result.length) {
            result[result.length - 1].hasComma = false;
        }
        return result;
    }

    const STORAGE_KEY_IMAGE_DETAILS_LIST = "__darkreader__imageDetails_v2_list";
    const STORAGE_KEY_IMAGE_DETAILS_PREFIX = "__darkreader__imageDetails_v2_";
    const STORAGE_KEY_CSS_FETCH_PREFIX = "__darkreader__cssFetch_";
    let imageCacheTimeout = 0;
    const imageDetailsCacheQueue = new Map();
    const cachedImageUrls = [];
    function writeImageDetailsQueue() {
        imageDetailsCacheQueue.forEach((details, url) => {
            if (url && url.startsWith("https://")) {
                try {
                    const json = JSON.stringify(details);
                    sessionStorage.setItem(
                        `${STORAGE_KEY_IMAGE_DETAILS_PREFIX}${url}`,
                        json
                    );
                    cachedImageUrls.push(url);
                } catch (err) {}
            }
        });
        imageDetailsCacheQueue.clear();
        sessionStorage.setItem(
            STORAGE_KEY_IMAGE_DETAILS_LIST,
            JSON.stringify(cachedImageUrls)
        );
    }
    function writeImageDetailsCache(url, imageDetails) {
        if (!url || !url.startsWith("https://")) {
            return;
        }
        imageDetailsCacheQueue.set(url, imageDetails);
        clearTimeout(imageCacheTimeout);
        imageCacheTimeout = setTimeout(writeImageDetailsQueue, 1000);
    }
    function readImageDetailsCache(targetMap) {
        try {
            const jsonList = sessionStorage.getItem(
                STORAGE_KEY_IMAGE_DETAILS_LIST
            );
            if (!jsonList) {
                return;
            }
            const list = JSON.parse(jsonList);
            list.forEach((url) => {
                const json = sessionStorage.getItem(
                    `${STORAGE_KEY_IMAGE_DETAILS_PREFIX}${url}`
                );
                if (json) {
                    const details = JSON.parse(json);
                    targetMap.set(url, details);
                }
            });
        } catch (err) {}
    }
    function writeCSSFetchCache(url, cssText) {
        const key = `${STORAGE_KEY_CSS_FETCH_PREFIX}${url}`;
        try {
            sessionStorage.setItem(key, cssText);
        } catch (err) {}
    }
    function readCSSFetchCache(url) {
        const key = `${STORAGE_KEY_CSS_FETCH_PREFIX}${url}`;
        try {
            return sessionStorage.getItem(key) ?? null;
        } catch (err) {}
        return null;
    }

    function toSVGMatrix(matrix) {
        return matrix
            .slice(0, 4)
            .map((m) => m.map((m) => m.toFixed(3)).join(" "))
            .join(" ");
    }
    function getSVGFilterMatrixValue(config) {
        return toSVGMatrix(createFilterMatrix(config));
    }

    const MAX_FRAME_DURATION = 1000 / 60;
    class AsyncQueue {
        constructor() {
            this.queue = [];
            this.timerId = null;
        }
        addTask(task) {
            this.queue.push(task);
            this.scheduleFrame();
        }
        stop() {
            if (this.timerId !== null) {
                cancelAnimationFrame(this.timerId);
                this.timerId = null;
            }
            this.queue = [];
        }
        scheduleFrame() {
            if (this.timerId) {
                return;
            }
            this.timerId = requestAnimationFrame(() => {
                this.timerId = null;
                const start = Date.now();
                let cb;
                while ((cb = this.queue.shift())) {
                    cb();
                    if (Date.now() - start >= MAX_FRAME_DURATION) {
                        this.scheduleFrame();
                        break;
                    }
                }
            });
        }
    }

    const resolvers$1 = new Map();
    const rejectors = new Map();
    async function bgFetch(request) {
        if (window.DarkReader?.Plugins?.fetch) {
            return window.DarkReader.Plugins.fetch(request);
        }
        return new Promise((resolve, reject) => {
            const id = generateUID();
            resolvers$1.set(id, resolve);
            rejectors.set(id, reject);
            chrome.runtime.sendMessage({
                type: MessageTypeCStoBG.FETCH,
                data: request,
                id
            });
        });
    }
    chrome.runtime.onMessage.addListener(({type, data, error, id}) => {
        if (type === MessageTypeBGtoCS.FETCH_RESPONSE) {
            const resolve = resolvers$1.get(id);
            const reject = rejectors.get(id);
            resolvers$1.delete(id);
            rejectors.delete(id);
            if (error) {
                reject &&
                    reject(
                        typeof error === "string" ? new Error(error) : error
                    );
            } else {
                resolve && resolve(data);
            }
        }
    });

    const imageManager = new AsyncQueue();
    async function getImageDetails(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataURL = url.startsWith("data:")
                    ? url
                    : await getDataURL(url);
                const blob =
                    tryConvertDataURLToBlobSync(dataURL) ??
                    (await loadAsBlob(url));
                let image;
                if (dataURL.startsWith("data:image/svg+xml")) {
                    image = await loadImage(dataURL);
                } else {
                    image =
                        (await tryCreateImageBitmap(blob)) ??
                        (await loadImage(dataURL));
                }
                imageManager.addTask(() => {
                    const analysis = analyzeImage(image);
                    resolve({
                        src: url,
                        dataURL: analysis.isLarge ? "" : dataURL,
                        width: image.width,
                        height: image.height,
                        ...analysis
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    async function getDataURL(url) {
        const parsedURL = new URL(url);
        if (parsedURL.origin === location.origin) {
            return await loadAsDataURL(url);
        }
        return await bgFetch({url, responseType: "data-url"});
    }
    async function tryCreateImageBitmap(blob) {
        try {
            return await createImageBitmap(blob);
        } catch (err) {
            logWarn(
                `Unable to create image bitmap for type ${blob.type}: ${String(err)}`
            );
            return null;
        }
    }
    const INCOMPLETE_DOC_LOADING_IMAGE_LIMIT = 256;
    let loadingImagesCount = 0;
    async function loadImage(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(`Unable to load image ${url}`);
            if (
                ++loadingImagesCount <= INCOMPLETE_DOC_LOADING_IMAGE_LIMIT ||
                isReadyStateComplete()
            ) {
                image.src = url;
            } else {
                addReadyStateCompleteListener(() => (image.src = url));
            }
        });
    }
    const MAX_ANALYSIS_PIXELS_COUNT = 32 * 32;
    let canvas;
    let context;
    function createCanvas() {
        const maxWidth = MAX_ANALYSIS_PIXELS_COUNT;
        const maxHeight = MAX_ANALYSIS_PIXELS_COUNT;
        canvas = document.createElement("canvas");
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        context = canvas.getContext("2d", {willReadFrequently: true});
        context.imageSmoothingEnabled = false;
    }
    function removeCanvas() {
        canvas = null;
        context = null;
    }
    const LARGE_IMAGE_PIXELS_COUNT = 512 * 512;
    function analyzeImage(image) {
        if (!canvas) {
            createCanvas();
        }
        let sw;
        let sh;
        if (image instanceof HTMLImageElement) {
            sw = image.naturalWidth;
            sh = image.naturalHeight;
        } else {
            sw = image.width;
            sh = image.height;
        }
        if (sw === 0 || sh === 0) {
            logWarn("Image is empty");
            return {
                isDark: false,
                isLight: false,
                isTransparent: false,
                isLarge: false
            };
        }
        const isLarge = sw * sh > LARGE_IMAGE_PIXELS_COUNT;
        const sourcePixelsCount = sw * sh;
        const k = Math.min(
            1,
            Math.sqrt(MAX_ANALYSIS_PIXELS_COUNT / sourcePixelsCount)
        );
        const width = Math.ceil(sw * k);
        const height = Math.ceil(sh * k);
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, sw, sh, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const d = imageData.data;
        const TRANSPARENT_ALPHA_THRESHOLD = 0.05;
        const DARK_LIGHTNESS_THRESHOLD = 0.4;
        const LIGHT_LIGHTNESS_THRESHOLD = 0.7;
        let transparentPixelsCount = 0;
        let darkPixelsCount = 0;
        let lightPixelsCount = 0;
        let i, x, y;
        let r, g, b, a;
        let l;
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                i = 4 * (y * width + x);
                r = d[i + 0];
                g = d[i + 1];
                b = d[i + 2];
                a = d[i + 3];
                if (a / 255 < TRANSPARENT_ALPHA_THRESHOLD) {
                    transparentPixelsCount++;
                } else {
                    l = getSRGBLightness(r, g, b);
                    if (l < DARK_LIGHTNESS_THRESHOLD) {
                        darkPixelsCount++;
                    }
                    if (l > LIGHT_LIGHTNESS_THRESHOLD) {
                        lightPixelsCount++;
                    }
                }
            }
        }
        const totalPixelsCount = width * height;
        const opaquePixelsCount = totalPixelsCount - transparentPixelsCount;
        const DARK_IMAGE_THRESHOLD = 0.7;
        const LIGHT_IMAGE_THRESHOLD = 0.7;
        const TRANSPARENT_IMAGE_THRESHOLD = 0.1;
        return {
            isDark: darkPixelsCount / opaquePixelsCount >= DARK_IMAGE_THRESHOLD,
            isLight:
                lightPixelsCount / opaquePixelsCount >= LIGHT_IMAGE_THRESHOLD,
            isTransparent:
                transparentPixelsCount / totalPixelsCount >=
                TRANSPARENT_IMAGE_THRESHOLD,
            isLarge
        };
    }
    let isBlobURLSupported = null;
    let canUseProxy = false;
    let blobURLCheckRequested = false;
    const blobURLCheckAwaiters = [];
    document.addEventListener(
        "__darkreader__inlineScriptsAllowed",
        () => (canUseProxy = true),
        {once: true}
    );
    async function requestBlobURLCheck() {
        if (!canUseProxy) {
            return;
        }
        if (blobURLCheckRequested) {
            return await new Promise((resolve) =>
                blobURLCheckAwaiters.push(resolve)
            );
        }
        blobURLCheckRequested = true;
        await new Promise((resolve) => {
            document.addEventListener(
                "__darkreader__blobURLCheckResponse",
                (e) => {
                    isBlobURLSupported = e.detail.blobURLAllowed;
                    resolve();
                    blobURLCheckAwaiters.forEach((r) => r());
                    blobURLCheckAwaiters.splice(0);
                },
                {once: true}
            );
            document.dispatchEvent(
                new CustomEvent("__darkreader__blobURLCheckRequest")
            );
        });
    }
    function isBlobURLCheckResultReady() {
        return isBlobURLSupported != null || !canUseProxy;
    }
    function onCSPError(err) {
        if (err.blockedURI === "blob") {
            isBlobURLSupported = false;
            document.removeEventListener("securitypolicyviolation", onCSPError);
        }
    }
    document.addEventListener("securitypolicyviolation", onCSPError);
    const objectURLs = new Set();
    function getFilteredImageURL({dataURL, width, height}, theme) {
        if (dataURL.startsWith("data:image/svg+xml")) {
            dataURL = escapeXML(dataURL);
        }
        const matrix = getSVGFilterMatrixValue(theme);
        const svg = [
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">`,
            "<defs>",
            '<filter id="darkreader-image-filter">',
            `<feColorMatrix type="matrix" values="${matrix}" />`,
            "</filter>",
            "</defs>",
            `<image width="${width}" height="${height}" filter="url(#darkreader-image-filter)" xlink:href="${dataURL}" />`,
            "</svg>"
        ].join("");
        if (!isBlobURLSupported) {
            return `data:image/svg+xml;base64,${btoa(svg)}`;
        }
        const bytes = new Uint8Array(svg.length);
        for (let i = 0; i < svg.length; i++) {
            bytes[i] = svg.charCodeAt(i);
        }
        const blob = new Blob([bytes], {type: "image/svg+xml"});
        const objectURL = URL.createObjectURL(blob);
        objectURLs.add(objectURL);
        return objectURL;
    }
    const xmlEscapeChars = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;"
    };
    function escapeXML(str) {
        return str.replace(/[<>&'"]/g, (c) => xmlEscapeChars[c] ?? c);
    }
    const dataURLBlobURLs = new Map();
    function tryConvertDataURLToBlobSync(dataURL) {
        const colonIndex = dataURL.indexOf(":");
        const semicolonIndex = dataURL.indexOf(";", colonIndex + 1);
        const commaIndex = dataURL.indexOf(",", semicolonIndex + 1);
        const encoding = dataURL
            .substring(semicolonIndex + 1, commaIndex)
            .toLocaleLowerCase();
        const mediaType = dataURL.substring(colonIndex + 1, semicolonIndex);
        if (encoding !== "base64" || !mediaType) {
            return null;
        }
        const characters = atob(dataURL.substring(commaIndex + 1));
        const bytes = new Uint8Array(characters.length);
        for (let i = 0; i < characters.length; i++) {
            bytes[i] = characters.charCodeAt(i);
        }
        return new Blob([bytes], {type: mediaType});
    }
    async function tryConvertDataURLToBlobURL(dataURL) {
        if (!isBlobURLSupported) {
            return null;
        }
        const hash = getHashCode(dataURL);
        let blobURL = dataURLBlobURLs.get(hash);
        if (blobURL) {
            return blobURL;
        }
        let blob = tryConvertDataURLToBlobSync(dataURL);
        if (!blob) {
            const response = await fetch(dataURL);
            blob = await response.blob();
        }
        blobURL = URL.createObjectURL(blob);
        dataURLBlobURLs.set(hash, blobURL);
        return blobURL;
    }
    function cleanImageProcessingCache() {
        imageManager && imageManager.stop();
        removeCanvas();
        objectURLs.forEach((u) => URL.revokeObjectURL(u));
        objectURLs.clear();
        dataURLBlobURLs.forEach((u) => URL.revokeObjectURL(u));
        dataURLBlobURLs.clear();
    }

    function getPriority(ruleStyle, property) {
        return Boolean(ruleStyle && ruleStyle.getPropertyPriority(property));
    }
    function getModifiableCSSDeclaration(
        property,
        value,
        rule,
        variablesStore,
        ignoreImageSelectors,
        isCancelled
    ) {
        let modifier = null;
        if (property.startsWith("--")) {
            modifier = getVariableModifier(
                variablesStore,
                property,
                value,
                rule,
                ignoreImageSelectors,
                isCancelled
            );
        } else if (value.includes("var(")) {
            modifier = getVariableDependantModifier(
                variablesStore,
                property,
                value
            );
        } else if (property === "color-scheme") {
            modifier = getColorSchemeModifier();
        } else if (property === "scrollbar-color") {
            modifier = getScrollbarColorModifier(value);
        } else if (
            (property.includes("color") &&
                property !== "-webkit-print-color-adjust") ||
            property === "fill" ||
            property === "stroke" ||
            property === "stop-color"
        ) {
            if (
                property.startsWith("border") &&
                property !== "border-color" &&
                value === "initial"
            ) {
                const borderSideProp = property.substring(
                    0,
                    property.length - 6
                );
                const borderSideVal =
                    rule.style.getPropertyValue(borderSideProp);
                if (
                    borderSideVal.startsWith("0px") ||
                    borderSideVal === "none"
                ) {
                    property = borderSideProp;
                    modifier = borderSideVal;
                } else {
                    modifier = value;
                }
            } else {
                modifier = getColorModifier(property, value, rule);
            }
        } else if (
            property === "background-image" ||
            property === "list-style-image"
        ) {
            modifier = getBgImageModifier(
                value,
                rule,
                ignoreImageSelectors,
                isCancelled
            );
        } else if (property.includes("shadow")) {
            modifier = getShadowModifier(value);
        }
        if (!modifier) {
            return null;
        }
        return {
            property,
            value: modifier,
            important: getPriority(rule.style, property),
            sourceValue: value
        };
    }
    function joinSelectors(...selectors) {
        return selectors.filter(Boolean).join(", ");
    }
    const hostsWithOddScrollbars = ["calendar.google.com"];
    function getModifiedUserAgentStyle(theme, isIFrame, styleSystemControls) {
        const lines = [];
        if (!isIFrame) {
            lines.push("html {");
            lines.push(
                `    background-color: ${modifyBackgroundColor({r: 255, g: 255, b: 255}, theme)} !important;`
            );
            lines.push("}");
        }
        if (isCSSColorSchemePropSupported && theme.mode === 1) {
            lines.push("html {");
            lines.push(`    color-scheme: dark !important;`);
            lines.push("}");
            lines.push("iframe {");
            lines.push(`    color-scheme: dark !important;`);
            lines.push("}");
        }
        const bgSelectors = joinSelectors(
            isIFrame ? "" : "html, body",
            styleSystemControls ? "input, textarea, select, button, dialog" : ""
        );
        if (bgSelectors) {
            lines.push(`${bgSelectors} {`);
            lines.push(
                `    background-color: ${modifyBackgroundColor({r: 255, g: 255, b: 255}, theme)};`
            );
            lines.push("}");
        }
        lines.push(
            `${joinSelectors("html, body", styleSystemControls ? "input, textarea, select, button" : "")} {`
        );
        lines.push(
            `    border-color: ${modifyBorderColor({r: 76, g: 76, b: 76}, theme)};`
        );
        lines.push(
            `    color: ${modifyForegroundColor({r: 0, g: 0, b: 0}, theme)};`
        );
        lines.push("}");
        lines.push("a {");
        lines.push(
            `    color: ${modifyForegroundColor({r: 0, g: 64, b: 255}, theme)};`
        );
        lines.push("}");
        lines.push("table {");
        lines.push(
            `    border-color: ${modifyBorderColor({r: 128, g: 128, b: 128}, theme)};`
        );
        lines.push("}");
        lines.push("mark {");
        lines.push(
            `    color: ${modifyForegroundColor({r: 0, g: 0, b: 0}, theme)};`
        );
        lines.push("}");
        lines.push("::placeholder {");
        lines.push(
            `    color: ${modifyForegroundColor({r: 169, g: 169, b: 169}, theme)};`
        );
        lines.push("}");
        lines.push("input:-webkit-autofill,");
        lines.push("textarea:-webkit-autofill,");
        lines.push("select:-webkit-autofill {");
        lines.push(
            `    background-color: ${modifyBackgroundColor({r: 250, g: 255, b: 189}, theme)} !important;`
        );
        lines.push(
            `    color: ${modifyForegroundColor({r: 0, g: 0, b: 0}, theme)} !important;`
        );
        lines.push("}");
        if (
            theme.scrollbarColor &&
            !hostsWithOddScrollbars.includes(location.hostname)
        ) {
            lines.push(getModifiedScrollbarStyle(theme));
        }
        if (theme.selectionColor) {
            lines.push(getModifiedSelectionStyle(theme));
        }
        if (isLayerRuleSupported) {
            lines.unshift("@layer {");
            lines.push("}");
        }
        return lines.join("\n");
    }
    function getSelectionColor(theme) {
        let backgroundColorSelection;
        let foregroundColorSelection;
        if (theme.selectionColor === "auto") {
            backgroundColorSelection = modifyBackgroundColor(
                {r: 0, g: 96, b: 212},
                {...theme, grayscale: 0}
            );
            foregroundColorSelection = modifyForegroundColor(
                {r: 255, g: 255, b: 255},
                {...theme, grayscale: 0}
            );
        } else {
            const rgb = parseColorWithCache(theme.selectionColor);
            const hsl = rgbToHSL(rgb);
            backgroundColorSelection = theme.selectionColor;
            if (hsl.l < 0.5) {
                foregroundColorSelection = "#FFF";
            } else {
                foregroundColorSelection = "#000";
            }
        }
        return {backgroundColorSelection, foregroundColorSelection};
    }
    function getModifiedSelectionStyle(theme) {
        const lines = [];
        const modifiedSelectionColor = getSelectionColor(theme);
        const backgroundColorSelection =
            modifiedSelectionColor.backgroundColorSelection;
        const foregroundColorSelection =
            modifiedSelectionColor.foregroundColorSelection;
        ["::selection", "::-moz-selection"].forEach((selection) => {
            lines.push(`${selection} {`);
            lines.push(
                `    background-color: ${backgroundColorSelection} !important;`
            );
            lines.push(`    color: ${foregroundColorSelection} !important;`);
            lines.push("}");
        });
        return lines.join("\n");
    }
    function getModifiedScrollbarStyle(theme) {
        let colorTrack;
        let colorThumb;
        if (theme.scrollbarColor === "auto") {
            colorTrack = modifyBackgroundColor({r: 241, g: 241, b: 241}, theme);
            colorThumb = modifyBackgroundColor({r: 176, g: 176, b: 176}, theme);
        } else {
            const rgb = parseColorWithCache(theme.scrollbarColor);
            const hsl = rgbToHSL(rgb);
            const darken = (darker) => ({
                ...hsl,
                l: clamp(hsl.l - darker, 0, 1)
            });
            colorTrack = hslToString(darken(0.4));
            colorThumb = hslToString(hsl);
        }
        return [
            `* {`,
            `    scrollbar-color: ${colorThumb} ${colorTrack};`,
            `}`
        ].join("\n");
    }
    function getModifiedFallbackStyle(theme, {strict}) {
        const factory = defaultFallbackFactory;
        return factory(theme, {strict});
    }
    function defaultFallbackFactory(theme, {strict}) {
        const lines = [];
        lines.push(
            `html, body, ${strict ? "body :not(iframe)" : "body > :not(iframe)"} {`
        );
        lines.push(
            `    background-color: ${modifyBackgroundColor({r: 255, g: 255, b: 255}, theme)} !important;`
        );
        lines.push(
            `    border-color: ${modifyBorderColor({r: 64, g: 64, b: 64}, theme)} !important;`
        );
        lines.push(
            `    color: ${modifyForegroundColor({r: 0, g: 0, b: 0}, theme)} !important;`
        );
        lines.push("}");
        lines.push(`div[style*="background-color: rgb(135, 135, 135)"] {`);
        lines.push(`    background-color: #878787 !important;`);
        lines.push("}");
        return lines.join("\n");
    }
    const unparsableColors = new Set([
        "inherit",
        "transparent",
        "initial",
        "currentcolor",
        "none",
        "unset",
        "auto"
    ]);
    function getColorModifier(prop, value, rule) {
        if (
            unparsableColors.has(value.toLowerCase()) &&
            !(prop === "color" && value === "initial")
        ) {
            return value;
        }
        let rgb = null;
        if (prop === "color" && value === "initial") {
            rgb = {r: 0, g: 0, b: 0, a: 1};
        } else {
            rgb = parseColorWithCache(value);
        }
        if (!rgb) {
            logWarn("Couldn't parse color", value);
            return null;
        }
        if (prop.includes("background")) {
            if (
                (rule.style.webkitMaskImage &&
                    rule.style.webkitMaskImage !== "none") ||
                (rule.style.webkitMask &&
                    !rule.style.webkitMask.startsWith("none")) ||
                (rule.style.mask && rule.style.mask !== "none") ||
                (rule.style.getPropertyValue("mask-image") &&
                    rule.style.getPropertyValue("mask-image") !== "none")
            ) {
                return (theme) => modifyForegroundColor(rgb, theme);
            }
            return (theme) => modifyBackgroundColor(rgb, theme);
        }
        if (prop.includes("border") || prop.includes("outline")) {
            return (theme) => modifyBorderColor(rgb, theme);
        }
        return (theme) => modifyForegroundColor(rgb, theme);
    }
    const imageDetailsCache = new Map();
    const awaitingForImageLoading = new Map();
    let didTryLoadCache = false;
    function shouldIgnoreImage(selectorText, selectors) {
        if (!selectorText || selectors.length === 0) {
            return false;
        }
        if (selectors.some((s) => s === "*")) {
            return true;
        }
        const ruleSelectors = selectorText.split(/,\s*/g);
        for (let i = 0; i < selectors.length; i++) {
            const ignoredSelector = selectors[i];
            if (ignoredSelector.startsWith("^")) {
                const beginning = ignoredSelector.slice(1);
                if (ruleSelectors.some((s) => s.startsWith(beginning))) {
                    return true;
                }
            } else if (ignoredSelector.endsWith("$")) {
                const ending = ignoredSelector.slice(
                    0,
                    ignoredSelector.length - 1
                );
                if (ruleSelectors.some((s) => s.endsWith(ending))) {
                    return true;
                }
            } else if (ruleSelectors.some((s) => s === ignoredSelector)) {
                return true;
            }
        }
        return false;
    }
    const imageSelectorQueue = new Map();
    const imageSelectorValues = new Map();
    const imageSelectorNodeQueue = new Set();
    let imageSelectorQueueFrameId = null;
    let classObserver = null;
    function checkImageSelectors(node) {
        for (const [selector, callbacks] of imageSelectorQueue) {
            if (
                node.querySelector(selector) ||
                (node instanceof Element && node.matches(selector))
            ) {
                imageSelectorQueue.delete(selector);
                callbacks.forEach((cb) => cb());
            }
        }
        if (!classObserver) {
            classObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    imageSelectorNodeQueue.add(mutation.target);
                    if (!imageSelectorQueueFrameId) {
                        imageSelectorQueueFrameId = requestAnimationFrame(
                            () => {
                                imageSelectorNodeQueue.forEach((element) => {
                                    checkImageSelectors(element);
                                });
                                imageSelectorNodeQueue.clear();
                                imageSelectorQueueFrameId = null;
                            }
                        );
                    }
                });
            });
            classObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class"],
                subtree: true
            });
        }
    }
    function getBgImageModifier(
        value,
        rule,
        ignoreImageSelectors,
        isCancelled
    ) {
        try {
            if (shouldIgnoreImage(rule.selectorText, ignoreImageSelectors)) {
                return value;
            }
            const gradients = parseGradient(value);
            const urls = getMatches(cssURLRegex, value);
            if (urls.length === 0 && gradients.length === 0) {
                return value;
            }
            const getIndices = (matches) => {
                let index = 0;
                return matches.map((match) => {
                    const valueIndex = value.indexOf(match, index);
                    index = valueIndex + match.length;
                    return {match, index: valueIndex};
                });
            };
            const matches = gradients
                .map((i) => ({type: "gradient", ...i}))
                .concat(
                    getIndices(urls).map((i) => ({
                        type: "url",
                        offset: 0,
                        ...i
                    }))
                )
                .sort((a, b) => (a.index > b.index ? 1 : -1));
            const getGradientModifier = (gradient) => {
                const {typeGradient, match, hasComma} = gradient;
                const partsRegex =
                    /([^\(\),]+(\([^\(\)]*(\([^\(\)]*\)*[^\(\)]*)?\))?([^\(\), ]|( (?!calc)))*),?/g;
                const colorStopRegex =
                    /^(from|color-stop|to)\(([^\(\)]*?,\s*)?(.*?)\)$/;
                const parts = getMatches(partsRegex, match, 1).map((part) => {
                    part = part.trim();
                    let rgb = parseColorWithCache(part);
                    if (rgb) {
                        return (theme) => modifyGradientColor(rgb, theme);
                    }
                    const space = part.lastIndexOf(" ");
                    rgb = parseColorWithCache(part.substring(0, space));
                    if (rgb) {
                        return (theme) =>
                            `${modifyGradientColor(rgb, theme)} ${part.substring(space + 1)}`;
                    }
                    const colorStopMatch = part.match(colorStopRegex);
                    if (colorStopMatch) {
                        rgb = parseColorWithCache(colorStopMatch[3]);
                        if (rgb) {
                            return (theme) =>
                                `${colorStopMatch[1]}(${colorStopMatch[2] ? `${colorStopMatch[2]}, ` : ""}${modifyGradientColor(rgb, theme)})`;
                        }
                    }
                    return () => part;
                });
                return (theme) => {
                    return `${typeGradient}(${parts.map((modify) => modify(theme)).join(", ")})${hasComma ? ", " : ""}`;
                };
            };
            const getURLModifier = (urlValue) => {
                if (!didTryLoadCache) {
                    didTryLoadCache = true;
                    readImageDetailsCache(imageDetailsCache);
                }
                let url = getCSSURLValue(urlValue);
                const isURLEmpty = url.length === 0;
                const {parentStyleSheet} = rule;
                const ownerNode = parentStyleSheet?.ownerNode;
                const scope =
                    (parentStyleSheet && getSheetScope(parentStyleSheet)) ??
                    document;
                const baseURL =
                    parentStyleSheet && parentStyleSheet.href
                        ? getCSSBaseBath(parentStyleSheet.href)
                        : ownerNode?.baseURI || location.origin;
                url = getAbsoluteURL(baseURL, url);
                return async (theme) => {
                    if (isURLEmpty) {
                        return "url('')";
                    }
                    let selector = rule.selectorText;
                    if (selector) {
                        if (selector.includes("::before")) {
                            selector = selector.replaceAll("::before", "");
                        }
                        if (selector.includes("::after")) {
                            selector = selector.replaceAll("::after", "");
                        }
                        if (!scope.querySelector(selector)) {
                            await new Promise((resolve) => {
                                if (imageSelectorQueue.has(selector)) {
                                    imageSelectorQueue
                                        .get(selector)
                                        .push(resolve);
                                } else {
                                    imageSelectorQueue.set(selector, [resolve]);
                                    imageSelectorValues.set(selector, urlValue);
                                }
                            });
                        }
                    }
                    let imageDetails = null;
                    if (imageDetailsCache.has(url)) {
                        imageDetails = imageDetailsCache.get(url);
                    } else {
                        try {
                            if (!isBlobURLCheckResultReady()) {
                                await requestBlobURLCheck();
                            }
                            if (awaitingForImageLoading.has(url)) {
                                const awaiters =
                                    awaitingForImageLoading.get(url);
                                imageDetails = await new Promise((resolve) =>
                                    awaiters.push(resolve)
                                );
                                if (!imageDetails) {
                                    return null;
                                }
                            } else {
                                awaitingForImageLoading.set(url, []);
                                imageDetails = await getImageDetails(url);
                                imageDetailsCache.set(url, imageDetails);
                                writeImageDetailsCache(url, imageDetails);
                                awaitingForImageLoading
                                    .get(url)
                                    .forEach((resolve) =>
                                        resolve(imageDetails)
                                    );
                                awaitingForImageLoading.delete(url);
                            }
                            if (isCancelled()) {
                                return null;
                            }
                        } catch (err) {
                            logWarn(err);
                            if (awaitingForImageLoading.has(url)) {
                                awaitingForImageLoading
                                    .get(url)
                                    .forEach((resolve) => resolve(null));
                                awaitingForImageLoading.delete(url);
                            }
                        }
                    }
                    if (imageDetails) {
                        const bgImageValue = getBgImageValue(
                            imageDetails,
                            theme
                        );
                        if (bgImageValue) {
                            return bgImageValue;
                        }
                    }
                    if (url.startsWith("data:")) {
                        const blobURL = await tryConvertDataURLToBlobURL(url);
                        if (blobURL) {
                            return `url("${blobURL}")`;
                        }
                    }
                    return `url("${url}")`;
                };
            };
            const getBgImageValue = (imageDetails, theme) => {
                const {isDark, isLight, isTransparent, isLarge, width} =
                    imageDetails;
                let result;
                const logSrc = imageDetails.src.startsWith("data:")
                    ? "data:"
                    : imageDetails.src;
                if (isLarge && isLight && !isTransparent && theme.mode === 1) {
                    logInfo(`Hiding large light image ${logSrc}`);
                    result = "none";
                } else if (
                    isDark &&
                    isTransparent &&
                    theme.mode === 1 &&
                    width > 2
                ) {
                    logInfo(`Inverting dark image ${logSrc}`);
                    const inverted = getFilteredImageURL(imageDetails, {
                        ...theme,
                        sepia: clamp(theme.sepia + 10, 0, 100)
                    });
                    result = `url("${inverted}")`;
                } else if (isLight && !isTransparent && theme.mode === 1) {
                    logInfo(`Dimming light image ${logSrc}`);
                    const dimmed = getFilteredImageURL(imageDetails, theme);
                    result = `url("${dimmed}")`;
                } else if (theme.mode === 0 && isLight) {
                    logInfo(`Applying filter to image ${logSrc}`);
                    const filtered = getFilteredImageURL(imageDetails, {
                        ...theme,
                        brightness: clamp(theme.brightness - 10, 5, 200),
                        sepia: clamp(theme.sepia + 10, 0, 100)
                    });
                    result = `url("${filtered}")`;
                } else {
                    logInfo(`Not modifying the image ${logSrc}`);
                    result = null;
                }
                return result;
            };
            const modifiers = [];
            let matchIndex = 0;
            let prevHasComma = false;
            matches.forEach(
                ({type, match, index, typeGradient, hasComma, offset}, i) => {
                    const matchStart = index;
                    const prefixStart = matchIndex;
                    const matchEnd = matchStart + match.length + offset;
                    matchIndex = matchEnd;
                    if (prefixStart !== matchStart) {
                        if (prevHasComma) {
                            modifiers.push(() => {
                                let betweenValue = value.substring(
                                    prefixStart,
                                    matchStart
                                );
                                if (betweenValue[0] === ",") {
                                    betweenValue = betweenValue.substring(1);
                                }
                                return betweenValue;
                            });
                        } else {
                            modifiers.push(() =>
                                value.substring(prefixStart, matchStart)
                            );
                        }
                    }
                    prevHasComma = hasComma || false;
                    if (type === "url") {
                        modifiers.push(getURLModifier(match));
                    } else if (type === "gradient") {
                        modifiers.push(
                            getGradientModifier({
                                match,
                                index,
                                typeGradient: typeGradient,
                                hasComma: hasComma || false,
                                offset
                            })
                        );
                    }
                    if (i === matches.length - 1) {
                        modifiers.push(() => value.substring(matchEnd));
                    }
                }
            );
            return (theme) => {
                const results = modifiers
                    .filter(Boolean)
                    .map((modify) => modify(theme));
                if (results.some((r) => r instanceof Promise)) {
                    return Promise.all(results).then((asyncResults) => {
                        return asyncResults.filter(Boolean).join("");
                    });
                }
                const combinedResult = results.join("");
                if (combinedResult.endsWith(", initial")) {
                    return combinedResult.slice(0, -9);
                }
                return combinedResult;
            };
        } catch (err) {
            logWarn(`Unable to parse gradient ${value}`, err);
            return null;
        }
    }
    function getShadowModifierWithInfo(value) {
        try {
            let index = 0;
            const colorMatches = getMatches(
                /(^|\s)(?!calc)([a-z]+\(.+?\)|#[0-9a-f]+|[a-z]+)(.*?(inset|outset)?($|,))/gi,
                value,
                2
            );
            let notParsed = 0;
            const modifiers = colorMatches.map((match, i) => {
                const prefixIndex = index;
                const matchIndex = value.indexOf(match, index);
                const matchEnd = matchIndex + match.length;
                index = matchEnd;
                const rgb = parseColorWithCache(match);
                if (!rgb) {
                    notParsed++;
                    return () => value.substring(prefixIndex, matchEnd);
                }
                return (theme) =>
                    `${value.substring(prefixIndex, matchIndex)}${modifyShadowColor(rgb, theme)}${i === colorMatches.length - 1 ? value.substring(matchEnd) : ""}`;
            });
            return (theme) => {
                const modified = modifiers
                    .map((modify) => modify(theme))
                    .join("");
                return {
                    matchesLength: colorMatches.length,
                    unparsableMatchesLength: notParsed,
                    result: modified
                };
            };
        } catch (err) {
            logWarn(`Unable to parse shadow ${value}`, err);
            return null;
        }
    }
    function getShadowModifier(value) {
        const shadowModifier = getShadowModifierWithInfo(value);
        if (!shadowModifier) {
            return null;
        }
        return (theme) => shadowModifier(theme).result;
    }
    function getScrollbarColorModifier(value) {
        const colorsMatch = value.match(
            /^\s*([a-z]+(\(.*\))?)\s+([a-z]+(\(.*\))?)\s*$/
        );
        if (!colorsMatch) {
            return value;
        }
        const thumb = parseColorWithCache(colorsMatch[1]);
        const track = parseColorWithCache(colorsMatch[3]);
        if (!thumb || !track) {
            logWarn(
                "Couldn't parse color",
                ...[thumb, track].filter((c) => !c)
            );
            return null;
        }
        return (theme) =>
            `${modifyForegroundColor(thumb, theme)} ${modifyBackgroundColor(track, theme)}`;
    }
    function getColorSchemeModifier() {
        return (theme) => (theme.mode === 0 ? "dark light" : "dark");
    }
    function getVariableModifier(
        variablesStore,
        prop,
        value,
        rule,
        ignoredImgSelectors,
        isCancelled
    ) {
        return variablesStore.getModifierForVariable({
            varName: prop,
            sourceValue: value,
            rule,
            ignoredImgSelectors,
            isCancelled
        });
    }
    function getVariableDependantModifier(variablesStore, prop, value) {
        return variablesStore.getModifierForVarDependant(prop, value);
    }
    function cleanModificationCache() {
        clearColorModificationCache();
        imageDetailsCache.clear();
        cleanImageProcessingCache();
        awaitingForImageLoading.clear();
        imageSelectorQueue.clear();
        classObserver?.disconnect();
        classObserver = null;
    }

    const VAR_TYPE_BG_COLOR = 1 << 0;
    const VAR_TYPE_TEXT_COLOR = 1 << 1;
    const VAR_TYPE_BORDER_COLOR = 1 << 2;
    const VAR_TYPE_BG_IMG = 1 << 3;
    class VariablesStore {
        constructor() {
            this.varTypes = new Map();
            this.rulesQueue = new Set();
            this.inlineStyleQueue = [];
            this.definedVars = new Set();
            this.varRefs = new Map();
            this.unknownColorVars = new Set();
            this.unknownBgVars = new Set();
            this.undefinedVars = new Set();
            this.initialVarTypes = new Map();
            this.changedTypeVars = new Set();
            this.typeChangeSubscriptions = new Map();
            this.unstableVarValues = new Map();
        }
        clear() {
            this.varTypes.clear();
            this.rulesQueue.clear();
            this.inlineStyleQueue.splice(0);
            this.definedVars.clear();
            this.varRefs.clear();
            this.unknownColorVars.clear();
            this.unknownBgVars.clear();
            this.undefinedVars.clear();
            this.initialVarTypes.clear();
            this.changedTypeVars.clear();
            this.typeChangeSubscriptions.clear();
            this.unstableVarValues.clear();
        }
        isVarType(varName, typeNum) {
            return (
                this.varTypes.has(varName) &&
                (this.varTypes.get(varName) & typeNum) > 0
            );
        }
        addRulesForMatching(rules) {
            this.rulesQueue.add(rules);
        }
        addInlineStyleForMatching(style) {
            this.inlineStyleQueue.push(style);
        }
        matchVariablesAndDependents() {
            if (
                this.rulesQueue.size === 0 &&
                this.inlineStyleQueue.length === 0
            ) {
                return;
            }
            this.changedTypeVars.clear();
            this.initialVarTypes = new Map(this.varTypes);
            this.collectRootVariables();
            this.collectVariablesAndVarDep();
            this.collectRootVarDependents();
            this.varRefs.forEach((refs, v) => {
                refs.forEach((r) => {
                    if (this.varTypes.has(v)) {
                        this.resolveVariableType(r, this.varTypes.get(v));
                    }
                });
            });
            this.unknownColorVars.forEach((v) => {
                if (this.unknownBgVars.has(v)) {
                    this.unknownColorVars.delete(v);
                    this.unknownBgVars.delete(v);
                    this.resolveVariableType(v, VAR_TYPE_BG_COLOR);
                } else if (
                    this.isVarType(
                        v,
                        VAR_TYPE_BG_COLOR |
                            VAR_TYPE_TEXT_COLOR |
                            VAR_TYPE_BORDER_COLOR
                    )
                ) {
                    this.unknownColorVars.delete(v);
                } else {
                    this.undefinedVars.add(v);
                }
            });
            this.unknownBgVars.forEach((v) => {
                const hasColor =
                    this.findVarRef(v, (ref) => {
                        return (
                            this.unknownColorVars.has(ref) ||
                            this.isVarType(
                                ref,
                                VAR_TYPE_BG_COLOR |
                                    VAR_TYPE_TEXT_COLOR |
                                    VAR_TYPE_BORDER_COLOR
                            )
                        );
                    }) != null;
                if (hasColor) {
                    this.iterateVarRefs(v, (ref) => {
                        this.resolveVariableType(ref, VAR_TYPE_BG_COLOR);
                    });
                } else if (
                    this.isVarType(v, VAR_TYPE_BG_COLOR | VAR_TYPE_BG_IMG)
                ) {
                    this.unknownBgVars.delete(v);
                } else {
                    this.undefinedVars.add(v);
                }
            });
            this.changedTypeVars.forEach((varName) => {
                if (this.typeChangeSubscriptions.has(varName)) {
                    this.typeChangeSubscriptions
                        .get(varName)
                        .forEach((callback) => {
                            callback();
                        });
                }
            });
            this.changedTypeVars.clear();
        }
        getModifierForVariable(options) {
            return (theme) => {
                const {
                    varName,
                    sourceValue,
                    rule,
                    ignoredImgSelectors,
                    isCancelled
                } = options;
                const getDeclarations = () => {
                    const declarations = [];
                    const addModifiedValue = (
                        typeNum,
                        varNameWrapper,
                        colorModifier
                    ) => {
                        if (!this.isVarType(varName, typeNum)) {
                            return;
                        }
                        const property = varNameWrapper(varName);
                        let modifiedValue;
                        if (isVarDependant(sourceValue)) {
                            if (isConstructedColorVar(sourceValue)) {
                                let value = insertVarValues(
                                    sourceValue,
                                    this.unstableVarValues
                                );
                                if (!value) {
                                    value =
                                        typeNum === VAR_TYPE_BG_COLOR
                                            ? "#ffffff"
                                            : "#000000";
                                }
                                modifiedValue = colorModifier(value, theme);
                            } else {
                                modifiedValue = replaceCSSVariablesNames(
                                    sourceValue,
                                    (v) => varNameWrapper(v),
                                    (fallback) => colorModifier(fallback, theme)
                                );
                            }
                        } else {
                            modifiedValue = colorModifier(sourceValue, theme);
                        }
                        declarations.push({
                            property,
                            value: modifiedValue
                        });
                    };
                    addModifiedValue(
                        VAR_TYPE_BG_COLOR,
                        wrapBgColorVariableName,
                        tryModifyBgColor
                    );
                    addModifiedValue(
                        VAR_TYPE_TEXT_COLOR,
                        wrapTextColorVariableName,
                        tryModifyTextColor
                    );
                    addModifiedValue(
                        VAR_TYPE_BORDER_COLOR,
                        wrapBorderColorVariableName,
                        tryModifyBorderColor
                    );
                    if (this.isVarType(varName, VAR_TYPE_BG_IMG)) {
                        const property = wrapBgImgVariableName(varName);
                        let modifiedValue = sourceValue;
                        if (isVarDependant(sourceValue)) {
                            modifiedValue = replaceCSSVariablesNames(
                                sourceValue,
                                (v) => wrapBgColorVariableName(v),
                                (fallback) => tryModifyBgColor(fallback, theme)
                            );
                        }
                        const bgModifier = getBgImageModifier(
                            modifiedValue,
                            rule,
                            ignoredImgSelectors,
                            isCancelled
                        );
                        modifiedValue =
                            typeof bgModifier === "function"
                                ? bgModifier(theme)
                                : bgModifier;
                        declarations.push({
                            property,
                            value: modifiedValue
                        });
                    }
                    return declarations;
                };
                const callbacks = new Set();
                const addListener = (onTypeChange) => {
                    const callback = () => {
                        const decs = getDeclarations();
                        onTypeChange(decs);
                    };
                    callbacks.add(callback);
                    this.subscribeForVarTypeChange(varName, callback);
                };
                const removeListeners = () => {
                    callbacks.forEach((callback) => {
                        this.unsubscribeFromVariableTypeChanges(
                            varName,
                            callback
                        );
                    });
                };
                return {
                    declarations: getDeclarations(),
                    onTypeChange: {addListener, removeListeners}
                };
            };
        }
        getModifierForVarDependant(property, sourceValue) {
            const isConstructedColor = sourceValue.match(/^\s*(rgb|hsl)a?\(/);
            const isSimpleConstructedColor = sourceValue.match(
                /^rgba?\(var\(--[\-_A-Za-z0-9]+\)(\s*,?\/?\s*0?\.\d+)?\)$/
            );
            if (isConstructedColor && !isSimpleConstructedColor) {
                const isBg = property.startsWith("background");
                const isText = isTextColorProperty(property);
                return (theme) => {
                    let value = insertVarValues(
                        sourceValue,
                        this.unstableVarValues
                    );
                    if (!value) {
                        value = isBg ? "#ffffff" : "#000000";
                    }
                    const modifier = isBg
                        ? tryModifyBgColor
                        : isText
                          ? tryModifyTextColor
                          : tryModifyBorderColor;
                    return modifier(value, theme);
                };
            }
            if (
                property === "background-color" ||
                (isSimpleConstructedColor && property === "background")
            ) {
                return (theme) => {
                    const defaultFallback = tryModifyBgColor(
                        isConstructedColor ? "255, 255, 255" : "#ffffff",
                        theme
                    );
                    return replaceCSSVariablesNames(
                        sourceValue,
                        (v) => wrapBgColorVariableName(v),
                        (fallback) => tryModifyBgColor(fallback, theme),
                        defaultFallback
                    );
                };
            }
            if (isTextColorProperty(property)) {
                return (theme) => {
                    const defaultFallback = tryModifyTextColor(
                        isConstructedColor ? "0, 0, 0" : "#000000",
                        theme
                    );
                    return replaceCSSVariablesNames(
                        sourceValue,
                        (v) => wrapTextColorVariableName(v),
                        (fallback) => tryModifyTextColor(fallback, theme),
                        defaultFallback
                    );
                };
            }
            if (
                property === "background" ||
                property === "background-image" ||
                property === "box-shadow"
            ) {
                return (theme) => {
                    const unknownVars = new Set();
                    const modify = () => {
                        const variableReplaced = replaceCSSVariablesNames(
                            sourceValue,
                            (v) => {
                                if (this.isVarType(v, VAR_TYPE_BG_COLOR)) {
                                    return wrapBgColorVariableName(v);
                                }
                                if (this.isVarType(v, VAR_TYPE_BG_IMG)) {
                                    return wrapBgImgVariableName(v);
                                }
                                unknownVars.add(v);
                                return v;
                            },
                            (fallback) => tryModifyBgColor(fallback, theme)
                        );
                        if (property === "box-shadow") {
                            const shadowModifier =
                                getShadowModifierWithInfo(variableReplaced);
                            const modifiedShadow = shadowModifier(theme);
                            if (
                                modifiedShadow.unparsableMatchesLength !==
                                modifiedShadow.matchesLength
                            ) {
                                return modifiedShadow.result;
                            }
                        }
                        return variableReplaced;
                    };
                    const modified = modify();
                    if (unknownVars.size > 0) {
                        const isFallbackResolved = modified.match(
                            /^var\(.*?, ((var\(--darkreader-bg--.*\))|(#[0-9A-Fa-f]+)|([a-z]+)|(rgba?\(.+\))|(hsla?\(.+\)))\)$/
                        );
                        if (isFallbackResolved) {
                            return modified;
                        }
                        return new Promise((resolve) => {
                            for (const unknownVar of unknownVars.values()) {
                                const callback = () => {
                                    this.unsubscribeFromVariableTypeChanges(
                                        unknownVar,
                                        callback
                                    );
                                    const newValue = modify();
                                    resolve(newValue);
                                };
                                this.subscribeForVarTypeChange(
                                    unknownVar,
                                    callback
                                );
                            }
                        });
                    }
                    return modified;
                };
            }
            if (
                property.startsWith("border") ||
                property.startsWith("outline")
            ) {
                return (theme) => {
                    return replaceCSSVariablesNames(
                        sourceValue,
                        (v) => wrapBorderColorVariableName(v),
                        (fallback) => tryModifyBorderColor(fallback, theme)
                    );
                };
            }
            return null;
        }
        subscribeForVarTypeChange(varName, callback) {
            if (!this.typeChangeSubscriptions.has(varName)) {
                this.typeChangeSubscriptions.set(varName, new Set());
            }
            const rootStore = this.typeChangeSubscriptions.get(varName);
            if (!rootStore.has(callback)) {
                rootStore.add(callback);
            }
        }
        unsubscribeFromVariableTypeChanges(varName, callback) {
            if (this.typeChangeSubscriptions.has(varName)) {
                this.typeChangeSubscriptions.get(varName).delete(callback);
            }
        }
        collectVariablesAndVarDep() {
            this.rulesQueue.forEach((rules) => {
                iterateCSSRules(rules, (rule) => {
                    if (rule.style) {
                        this.collectVarsFromCSSDeclarations(rule.style);
                    }
                });
            });
            this.inlineStyleQueue.forEach((style) => {
                this.collectVarsFromCSSDeclarations(style);
            });
            this.rulesQueue.clear();
            this.inlineStyleQueue.splice(0);
        }
        collectVarsFromCSSDeclarations(style) {
            iterateCSSDeclarations(style, (property, value) => {
                if (isVariable(property)) {
                    this.inspectVariable(property, value);
                }
                if (isVarDependant(value)) {
                    this.inspectVarDependant(property, value);
                }
            });
        }
        shouldProcessRootVariables() {
            return (
                this.rulesQueue.size > 0 &&
                document.documentElement.getAttribute("style")?.includes("--")
            );
        }
        collectRootVariables() {
            if (!this.shouldProcessRootVariables()) {
                return;
            }
            iterateCSSDeclarations(
                document.documentElement.style,
                (property, value) => {
                    if (isVariable(property)) {
                        this.inspectVariable(property, value);
                    }
                }
            );
        }
        inspectVariable(varName, value) {
            this.unstableVarValues.set(varName, value);
            if (isVarDependant(value) && isConstructedColorVar(value)) {
                this.unknownColorVars.add(varName);
                this.definedVars.add(varName);
            }
            if (this.definedVars.has(varName)) {
                return;
            }
            this.definedVars.add(varName);
            const isColor = Boolean(
                value.match(rawRGBSpaceRegex) ||
                    value.match(rawRGBCommaRegex) ||
                    parseColorWithCache(value)
            );
            if (isColor) {
                this.unknownColorVars.add(varName);
            } else if (
                value.includes("url(") ||
                value.includes("linear-gradient(") ||
                value.includes("radial-gradient(")
            ) {
                this.resolveVariableType(varName, VAR_TYPE_BG_IMG);
            }
        }
        resolveVariableType(varName, typeNum) {
            const initialType = this.initialVarTypes.get(varName) || 0;
            const currentType = this.varTypes.get(varName) || 0;
            const newType = currentType | typeNum;
            this.varTypes.set(varName, newType);
            if (newType !== initialType || this.undefinedVars.has(varName)) {
                this.changedTypeVars.add(varName);
                this.undefinedVars.delete(varName);
            }
            this.unknownColorVars.delete(varName);
            this.unknownBgVars.delete(varName);
        }
        collectRootVarDependents() {
            if (!this.shouldProcessRootVariables()) {
                return;
            }
            iterateCSSDeclarations(
                document.documentElement.style,
                (property, value) => {
                    if (isVarDependant(value)) {
                        this.inspectVarDependant(property, value);
                    }
                }
            );
        }
        inspectVarDependant(property, value) {
            if (isVariable(property)) {
                this.iterateVarDeps(value, (ref) => {
                    if (!this.varRefs.has(property)) {
                        this.varRefs.set(property, new Set());
                    }
                    this.varRefs.get(property).add(ref);
                });
            } else if (
                property === "background-color" ||
                property === "box-shadow"
            ) {
                this.iterateVarDeps(value, (v) =>
                    this.resolveVariableType(v, VAR_TYPE_BG_COLOR)
                );
            } else if (isTextColorProperty(property)) {
                this.iterateVarDeps(value, (v) =>
                    this.resolveVariableType(v, VAR_TYPE_TEXT_COLOR)
                );
            } else if (
                property.startsWith("border") ||
                property.startsWith("outline")
            ) {
                this.iterateVarDeps(value, (v) =>
                    this.resolveVariableType(v, VAR_TYPE_BORDER_COLOR)
                );
            } else if (
                property === "background" ||
                property === "background-image"
            ) {
                this.iterateVarDeps(value, (v) => {
                    if (
                        this.isVarType(v, VAR_TYPE_BG_COLOR | VAR_TYPE_BG_IMG)
                    ) {
                        return;
                    }
                    const isBgColor =
                        this.findVarRef(v, (ref) => {
                            return (
                                this.unknownColorVars.has(ref) ||
                                this.isVarType(
                                    ref,
                                    VAR_TYPE_BG_COLOR |
                                        VAR_TYPE_TEXT_COLOR |
                                        VAR_TYPE_BORDER_COLOR
                                )
                            );
                        }) != null;
                    this.iterateVarRefs(v, (ref) => {
                        if (isBgColor) {
                            this.resolveVariableType(ref, VAR_TYPE_BG_COLOR);
                        } else {
                            this.unknownBgVars.add(ref);
                        }
                    });
                });
            }
        }
        iterateVarDeps(value, iterator) {
            const varDeps = new Set();
            iterateVarDependencies(value, (v) => varDeps.add(v));
            varDeps.forEach((v) => iterator(v));
        }
        findVarRef(varName, iterator, stack = new Set()) {
            if (stack.has(varName)) {
                return null;
            }
            stack.add(varName);
            const result = iterator(varName);
            if (result) {
                return varName;
            }
            const refs = this.varRefs.get(varName);
            if (!refs || refs.size === 0) {
                return null;
            }
            for (const ref of refs) {
                const found = this.findVarRef(ref, iterator, stack);
                if (found) {
                    return found;
                }
            }
            return null;
        }
        iterateVarRefs(varName, iterator) {
            this.findVarRef(varName, (ref) => {
                iterator(ref);
                return false;
            });
        }
        setOnRootVariableChange(callback) {
            this.onRootVariableDefined = callback;
        }
        putRootVars(styleElement, theme) {
            const sheet = styleElement.sheet;
            if (sheet.cssRules.length > 0) {
                sheet.deleteRule(0);
            }
            const declarations = new Map();
            iterateCSSDeclarations(
                document.documentElement.style,
                (property, value) => {
                    if (isVariable(property)) {
                        if (this.isVarType(property, VAR_TYPE_BG_COLOR)) {
                            declarations.set(
                                wrapBgColorVariableName(property),
                                tryModifyBgColor(value, theme)
                            );
                        }
                        if (this.isVarType(property, VAR_TYPE_TEXT_COLOR)) {
                            declarations.set(
                                wrapTextColorVariableName(property),
                                tryModifyTextColor(value, theme)
                            );
                        }
                        if (this.isVarType(property, VAR_TYPE_BORDER_COLOR)) {
                            declarations.set(
                                wrapBorderColorVariableName(property),
                                tryModifyBorderColor(value, theme)
                            );
                        }
                        this.subscribeForVarTypeChange(
                            property,
                            this.onRootVariableDefined
                        );
                    }
                }
            );
            const cssLines = [];
            cssLines.push(":root {");
            for (const [property, value] of declarations) {
                cssLines.push(`    ${property}: ${value};`);
            }
            cssLines.push("}");
            const cssText = cssLines.join("\n");
            sheet.insertRule(cssText);
        }
    }
    const variablesStore = new VariablesStore();
    function getVariableRange(input, searchStart = 0) {
        const start = input.indexOf("var(", searchStart);
        if (start >= 0) {
            const range = getParenthesesRange(input, start + 3);
            if (range) {
                return {start, end: range.end};
            }
        }
        return null;
    }
    function getVariablesMatches(input) {
        const ranges = [];
        let i = 0;
        let range;
        while ((range = getVariableRange(input, i))) {
            const {start, end} = range;
            ranges.push({start, end, value: input.substring(start, end)});
            i = range.end + 1;
        }
        return ranges;
    }
    function replaceVariablesMatches(input, replacer) {
        const matches = getVariablesMatches(input);
        const matchesCount = matches.length;
        if (matchesCount === 0) {
            return input;
        }
        const inputLength = input.length;
        const replacements = matches.map((m) =>
            replacer(m.value, matches.length)
        );
        const parts = [];
        parts.push(input.substring(0, matches[0].start));
        for (let i = 0; i < matchesCount; i++) {
            parts.push(replacements[i]);
            const start = matches[i].end;
            const end =
                i < matchesCount - 1 ? matches[i + 1].start : inputLength;
            parts.push(input.substring(start, end));
        }
        return parts.join("");
    }
    function getVariableNameAndFallback(match) {
        const commaIndex = match.indexOf(",");
        let name;
        let fallback;
        if (commaIndex >= 0) {
            name = match.substring(4, commaIndex).trim();
            fallback = match.substring(commaIndex + 1, match.length - 1).trim();
        } else {
            name = match.substring(4, match.length - 1).trim();
            fallback = "";
        }
        return {name, fallback};
    }
    function replaceCSSVariablesNames(
        value,
        nameReplacer,
        fallbackReplacer,
        finalFallback
    ) {
        const matchReplacer = (match) => {
            const {name, fallback} = getVariableNameAndFallback(match);
            const newName = nameReplacer(name);
            if (!fallback) {
                if (finalFallback) {
                    return `var(${newName}, ${finalFallback})`;
                }
                return `var(${newName})`;
            }
            let newFallback;
            if (isVarDependant(fallback)) {
                newFallback = replaceCSSVariablesNames(
                    fallback,
                    nameReplacer,
                    fallbackReplacer
                );
            } else if (fallbackReplacer) {
                newFallback = fallbackReplacer(fallback);
            } else {
                newFallback = fallback;
            }
            return `var(${newName}, ${newFallback})`;
        };
        return replaceVariablesMatches(value, matchReplacer);
    }
    function iterateVarDependencies(value, iterator) {
        replaceCSSVariablesNames(value, (varName) => {
            iterator(varName);
            return varName;
        });
    }
    function wrapBgColorVariableName(name) {
        return `--darkreader-bg${name}`;
    }
    function wrapTextColorVariableName(name) {
        return `--darkreader-text${name}`;
    }
    function wrapBorderColorVariableName(name) {
        return `--darkreader-border${name}`;
    }
    function wrapBgImgVariableName(name) {
        return `--darkreader-bgimg${name}`;
    }
    function isVariable(property) {
        return property.startsWith("--");
    }
    function isVarDependant(value) {
        return value.includes("var(");
    }
    function isConstructedColorVar(value) {
        return (
            value.match(/^\s*(rgb|hsl)a?\(/) ||
            value.match(/^(((\d{1,3})|(var\([\-_A-Za-z0-9]+\))),?\s*?){3}$/)
        );
    }
    const textColorProps = [
        "color",
        "caret-color",
        "-webkit-text-fill-color",
        "fill",
        "stroke"
    ];
    function isTextColorProperty(property) {
        return textColorProps.includes(property);
    }
    const rawRGBSpaceRegex = /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/;
    const rawRGBCommaRegex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
    function parseRawColorValue(input) {
        const match =
            input.match(rawRGBSpaceRegex) ?? input.match(rawRGBCommaRegex);
        if (match) {
            const color = `rgb(${match[1]}, ${match[2]}, ${match[3]})`;
            return {isRaw: true, color};
        }
        return {isRaw: false, color: input};
    }
    function handleRawColorValue(input, theme, modifyFunction) {
        const {isRaw, color} = parseRawColorValue(input);
        const rgb = parseColorWithCache(color);
        if (rgb) {
            const outputColor = modifyFunction(rgb, theme, !isRaw);
            if (isRaw) {
                const outputInRGB = parseColorWithCache(outputColor);
                return outputInRGB
                    ? `${outputInRGB.r}, ${outputInRGB.g}, ${outputInRGB.b}`
                    : outputColor;
            }
            return outputColor;
        }
        return color;
    }
    function tryModifyBgColor(color, theme) {
        return handleRawColorValue(color, theme, modifyBackgroundColor);
    }
    function tryModifyTextColor(color, theme) {
        return handleRawColorValue(color, theme, modifyForegroundColor);
    }
    function tryModifyBorderColor(color, theme) {
        return handleRawColorValue(color, theme, modifyBorderColor);
    }
    function insertVarValues(source, varValues, fullStack = new Set()) {
        let containsUnresolvedVar = false;
        const matchReplacer = (match, count) => {
            const {name, fallback} = getVariableNameAndFallback(match);
            const stack = count > 1 ? new Set(fullStack) : fullStack;
            if (stack.has(name)) {
                containsUnresolvedVar = true;
                return null;
            }
            stack.add(name);
            const varValue = varValues.get(name) || fallback;
            let inserted = null;
            if (varValue) {
                if (isVarDependant(varValue)) {
                    inserted = insertVarValues(varValue, varValues, stack);
                } else {
                    inserted = varValue;
                }
            }
            if (!inserted) {
                containsUnresolvedVar = true;
                return null;
            }
            return inserted;
        };
        const replaced = replaceVariablesMatches(source, matchReplacer);
        if (containsUnresolvedVar) {
            return null;
        }
        return replaced;
    }

    function getThemeKey(theme) {
        let resultKey = "";
        themeCacheKeys.forEach((key) => {
            resultKey += `${key}:${theme[key]};`;
        });
        return resultKey;
    }
    const asyncQueue = createAsyncTasksQueue();
    function createStyleSheetModifier() {
        let renderId = 0;
        function getStyleRuleHash(rule) {
            let cssText = rule.cssText;
            if (isMediaRule(rule.parentRule)) {
                cssText = `${rule.parentRule.media.mediaText} { ${cssText} }`;
            }
            return getHashCode(cssText);
        }
        const rulesTextCache = new Set();
        const rulesModCache = new Map();
        const varTypeChangeCleaners = new Set();
        let prevFilterKey = null;
        let hasNonLoadedLink = false;
        let wasRebuilt = false;
        function shouldRebuildStyle() {
            return hasNonLoadedLink && !wasRebuilt;
        }
        function modifySheet(options) {
            const rules = options.sourceCSSRules;
            const {
                theme,
                ignoreImageAnalysis,
                force,
                prepareSheet,
                isAsyncCancelled
            } = options;
            let rulesChanged = rulesModCache.size === 0;
            const notFoundCacheKeys = new Set(rulesModCache.keys());
            const themeKey = getThemeKey(theme);
            const themeChanged = themeKey !== prevFilterKey;
            if (hasNonLoadedLink) {
                wasRebuilt = true;
            }
            const modRules = [];
            iterateCSSRules(
                rules,
                (rule) => {
                    const hash = getStyleRuleHash(rule);
                    let textDiffersFromPrev = false;
                    notFoundCacheKeys.delete(hash);
                    if (!rulesTextCache.has(hash)) {
                        rulesTextCache.add(hash);
                        textDiffersFromPrev = true;
                    }
                    if (textDiffersFromPrev) {
                        rulesChanged = true;
                    } else {
                        modRules.push(rulesModCache.get(hash));
                        return;
                    }
                    if (rule.style.all === "revert") {
                        return;
                    }
                    const modDecs = [];
                    rule.style &&
                        iterateCSSDeclarations(
                            rule.style,
                            (property, value) => {
                                const mod = getModifiableCSSDeclaration(
                                    property,
                                    value,
                                    rule,
                                    variablesStore,
                                    ignoreImageAnalysis,
                                    isAsyncCancelled
                                );
                                if (mod) {
                                    modDecs.push(mod);
                                }
                            }
                        );
                    let modRule = null;
                    if (modDecs.length > 0) {
                        const parentRule = rule.parentRule;
                        modRule = {
                            selector: rule.selectorText,
                            declarations: modDecs,
                            parentRule
                        };
                        modRules.push(modRule);
                    }
                    rulesModCache.set(hash, modRule);
                },
                () => {
                    hasNonLoadedLink = true;
                }
            );
            notFoundCacheKeys.forEach((key) => {
                rulesTextCache.delete(key);
                rulesModCache.delete(key);
            });
            prevFilterKey = themeKey;
            if (!force && !rulesChanged && !themeChanged) {
                return;
            }
            renderId++;
            function setRule(target, index, rule) {
                const {selector, declarations} = rule;
                let selectorText = selector;
                const emptyIsWhereSelector =
                    isChromium &&
                    selector.startsWith(":is(") &&
                    (selector.includes(":is()") ||
                        selector.includes(":where()") ||
                        (selector.includes(":where(") &&
                            selector.includes(":-moz")));
                const viewTransitionSelector =
                    selector.includes("::view-transition-");
                if (emptyIsWhereSelector || viewTransitionSelector) {
                    selectorText = ".darkreader-unsupported-selector";
                }
                let ruleText = `${selectorText} {`;
                for (const dec of declarations) {
                    const {property, value, important} = dec;
                    if (value) {
                        ruleText += ` ${property}: ${value}${important ? " !important" : ""};`;
                    }
                }
                ruleText += " }";
                target.insertRule(ruleText, index);
            }
            const asyncDeclarations = new Map();
            const varDeclarations = new Map();
            let asyncDeclarationCounter = 0;
            let varDeclarationCounter = 0;
            const rootReadyGroup = {rule: null, rules: [], isGroup: true};
            const groupRefs = new WeakMap();
            function getGroup(rule) {
                if (rule == null) {
                    return rootReadyGroup;
                }
                if (groupRefs.has(rule)) {
                    return groupRefs.get(rule);
                }
                const group = {rule, rules: [], isGroup: true};
                groupRefs.set(rule, group);
                const parentGroup = getGroup(rule.parentRule);
                parentGroup.rules.push(group);
                return group;
            }
            varTypeChangeCleaners.forEach((clear) => clear());
            varTypeChangeCleaners.clear();
            modRules
                .filter((r) => r)
                .forEach(({selector, declarations, parentRule}) => {
                    const group = getGroup(parentRule);
                    const readyStyleRule = {
                        selector,
                        declarations: [],
                        isGroup: false
                    };
                    const readyDeclarations = readyStyleRule.declarations;
                    group.rules.push(readyStyleRule);
                    function handleAsyncDeclaration(
                        property,
                        modified,
                        important,
                        sourceValue
                    ) {
                        const asyncKey = ++asyncDeclarationCounter;
                        const asyncDeclaration = {
                            property,
                            value: null,
                            important,
                            asyncKey,
                            sourceValue
                        };
                        readyDeclarations.push(asyncDeclaration);
                        const currentRenderId = renderId;
                        modified.then((asyncValue) => {
                            if (
                                !asyncValue ||
                                isAsyncCancelled() ||
                                currentRenderId !== renderId
                            ) {
                                return;
                            }
                            asyncDeclaration.value = asyncValue;
                            asyncQueue.add(() => {
                                if (
                                    isAsyncCancelled() ||
                                    currentRenderId !== renderId
                                ) {
                                    return;
                                }
                                rebuildAsyncRule(asyncKey);
                            });
                        });
                    }
                    function handleVarDeclarations(
                        property,
                        modified,
                        important,
                        sourceValue
                    ) {
                        const {declarations: varDecs, onTypeChange} = modified;
                        const varKey = ++varDeclarationCounter;
                        const currentRenderId = renderId;
                        const initialIndex = readyDeclarations.length;
                        let oldDecs = [];
                        if (varDecs.length === 0) {
                            const tempDec = {
                                property,
                                value: sourceValue,
                                important,
                                sourceValue,
                                varKey
                            };
                            readyDeclarations.push(tempDec);
                            oldDecs = [tempDec];
                        }
                        varDecs.forEach((mod) => {
                            if (mod.value instanceof Promise) {
                                handleAsyncDeclaration(
                                    mod.property,
                                    mod.value,
                                    important,
                                    sourceValue
                                );
                            } else {
                                const readyDec = {
                                    property: mod.property,
                                    value: mod.value,
                                    important,
                                    sourceValue,
                                    varKey
                                };
                                readyDeclarations.push(readyDec);
                                oldDecs.push(readyDec);
                            }
                        });
                        onTypeChange.addListener((newDecs) => {
                            if (
                                isAsyncCancelled() ||
                                currentRenderId !== renderId
                            ) {
                                return;
                            }
                            const readyVarDecs = newDecs.map((mod) => {
                                return {
                                    property: mod.property,
                                    value: mod.value,
                                    important,
                                    sourceValue,
                                    varKey
                                };
                            });
                            const index = readyDeclarations.indexOf(
                                oldDecs[0],
                                initialIndex
                            );
                            readyDeclarations.splice(
                                index,
                                oldDecs.length,
                                ...readyVarDecs
                            );
                            oldDecs = readyVarDecs;
                            rebuildVarRule(varKey);
                        });
                        varTypeChangeCleaners.add(() =>
                            onTypeChange.removeListeners()
                        );
                    }
                    declarations.forEach(
                        ({property, value, important, sourceValue}) => {
                            if (typeof value === "function") {
                                const modified = value(theme);
                                if (modified instanceof Promise) {
                                    handleAsyncDeclaration(
                                        property,
                                        modified,
                                        important,
                                        sourceValue
                                    );
                                } else if (property.startsWith("--")) {
                                    handleVarDeclarations(
                                        property,
                                        modified,
                                        important,
                                        sourceValue
                                    );
                                } else {
                                    readyDeclarations.push({
                                        property,
                                        value: modified,
                                        important,
                                        sourceValue
                                    });
                                }
                            } else {
                                readyDeclarations.push({
                                    property,
                                    value,
                                    important,
                                    sourceValue
                                });
                            }
                        }
                    );
                });
            const sheet = prepareSheet();
            function buildStyleSheet() {
                function createTarget(group, parent) {
                    const {rule} = group;
                    if (isStyleRule(rule)) {
                        const {selectorText} = rule;
                        const index = parent.cssRules.length;
                        parent.insertRule(`${selectorText} {}`, index);
                        return parent.cssRules[index];
                    }
                    if (isMediaRule(rule)) {
                        const {media} = rule;
                        const index = parent.cssRules.length;
                        parent.insertRule(
                            `@media ${media.mediaText} {}`,
                            index
                        );
                        return parent.cssRules[index];
                    }
                    if (isLayerRule(rule)) {
                        const {name} = rule;
                        const index = parent.cssRules.length;
                        parent.insertRule(`@layer ${name} {}`, index);
                        return parent.cssRules[index];
                    }
                    return parent;
                }
                function iterateReadyRules(group, target, styleIterator) {
                    group.rules.forEach((r) => {
                        if (r.isGroup) {
                            const t = createTarget(r, target);
                            iterateReadyRules(r, t, styleIterator);
                        } else {
                            styleIterator(r, target);
                        }
                    });
                }
                iterateReadyRules(rootReadyGroup, sheet, (rule, target) => {
                    const index = target.cssRules.length;
                    rule.declarations.forEach(({asyncKey, varKey}) => {
                        if (asyncKey != null) {
                            asyncDeclarations.set(asyncKey, {
                                rule,
                                target,
                                index
                            });
                        }
                        if (varKey != null) {
                            varDeclarations.set(varKey, {rule, target, index});
                        }
                    });
                    setRule(target, index, rule);
                });
            }
            function rebuildAsyncRule(key) {
                const {rule, target, index} = asyncDeclarations.get(key);
                target.deleteRule(index);
                setRule(target, index, rule);
                asyncDeclarations.delete(key);
            }
            function rebuildVarRule(key) {
                const {rule, target, index} = varDeclarations.get(key);
                target.deleteRule(index);
                setRule(target, index, rule);
            }
            buildStyleSheet();
        }
        return {modifySheet, shouldRebuildStyle};
    }

    let canUseSheetProxy$1 = false;
    document.addEventListener(
        "__darkreader__inlineScriptsAllowed",
        () => (canUseSheetProxy$1 = true),
        {once: true}
    );
    const overrides$1 = new WeakSet();
    const overridesBySource = new WeakMap();
    function canHaveAdoptedStyleSheets(node) {
        return Array.isArray(node.adoptedStyleSheets);
    }
    function createAdoptedStyleSheetOverride(node) {
        let cancelAsyncOperations = false;
        function iterateSourceSheets(iterator) {
            node.adoptedStyleSheets.forEach((sheet) => {
                if (!overrides$1.has(sheet)) {
                    iterator(sheet);
                }
                defineSheetScope(sheet, node);
            });
        }
        function injectSheet(sheet, override) {
            const newSheets = [...node.adoptedStyleSheets];
            const sheetIndex = newSheets.indexOf(sheet);
            const overrideIndex = newSheets.indexOf(override);
            if (overrideIndex >= 0) {
                newSheets.splice(overrideIndex, 1);
            }
            newSheets.splice(sheetIndex + 1, 0, override);
            node.adoptedStyleSheets = newSheets;
        }
        function clear() {
            const newSheets = [...node.adoptedStyleSheets];
            for (let i = newSheets.length - 1; i >= 0; i--) {
                const sheet = newSheets[i];
                if (overrides$1.has(sheet)) {
                    newSheets.splice(i, 1);
                }
            }
            if (node.adoptedStyleSheets.length !== newSheets.length) {
                node.adoptedStyleSheets = newSheets;
            }
            sourceSheets = new WeakSet();
            sourceDeclarations = new WeakSet();
        }
        const cleaners = [];
        function destroy() {
            cleaners.forEach((c) => c());
            cleaners.splice(0);
            cancelAsyncOperations = true;
            clear();
            if (frameId) {
                cancelAnimationFrame(frameId);
                frameId = null;
            }
        }
        let rulesChangeKey = 0;
        function getRulesChangeKey() {
            let count = 0;
            iterateSourceSheets((sheet) => {
                count += sheet.cssRules.length;
            });
            if (count === 1) {
                const rule = node.adoptedStyleSheets[0].cssRules[0];
                return rule instanceof CSSStyleRule ? rule.style.length : count;
            }
            return count;
        }
        let sourceSheets = new WeakSet();
        let sourceDeclarations = new WeakSet();
        function render(theme, ignoreImageAnalysis) {
            clear();
            for (let i = node.adoptedStyleSheets.length - 1; i >= 0; i--) {
                const sheet = node.adoptedStyleSheets[i];
                if (overrides$1.has(sheet)) {
                    continue;
                }
                sourceSheets.add(sheet);
                const readyOverride = overridesBySource.get(sheet);
                if (readyOverride) {
                    rulesChangeKey = getRulesChangeKey();
                    injectSheet(sheet, readyOverride);
                    continue;
                }
                const rules = sheet.cssRules;
                const override = new CSSStyleSheet();
                overridesBySource.set(sheet, override);
                iterateCSSRules(rules, (rule) =>
                    sourceDeclarations.add(rule.style)
                );
                const prepareSheet = () => {
                    for (let i = override.cssRules.length - 1; i >= 0; i--) {
                        override.deleteRule(i);
                    }
                    override.insertRule("#__darkreader__adoptedOverride {}");
                    injectSheet(sheet, override);
                    overrides$1.add(override);
                    return override;
                };
                const sheetModifier = createStyleSheetModifier();
                sheetModifier.modifySheet({
                    prepareSheet,
                    sourceCSSRules: rules,
                    theme,
                    ignoreImageAnalysis,
                    force: false,
                    isAsyncCancelled: () => cancelAsyncOperations
                });
            }
            rulesChangeKey = getRulesChangeKey();
        }
        let callbackRequested = false;
        function handleArrayChange(callback) {
            if (callbackRequested) {
                return;
            }
            callbackRequested = true;
            queueMicrotask(() => {
                callbackRequested = false;
                const sheets = node.adoptedStyleSheets.filter(
                    (s) => !overrides$1.has(s)
                );
                sheets.forEach((sheet) => overridesBySource.delete(sheet));
                callback(sheets);
            });
        }
        function checkForUpdates() {
            return getRulesChangeKey() !== rulesChangeKey;
        }
        let frameId = null;
        function watchUsingRAF(callback) {
            frameId = requestAnimationFrame(() => {
                if (canUseSheetProxy$1) {
                    return;
                }
                if (checkForUpdates()) {
                    handleArrayChange(callback);
                }
                watchUsingRAF(callback);
            });
        }
        function addSheetChangeEventListener(type, listener) {
            node.addEventListener(type, listener);
            cleaners.push(() => node.removeEventListener(type, listener));
        }
        function watch(callback) {
            const onAdoptedSheetsChange = () => {
                canUseSheetProxy$1 = true;
                handleArrayChange(callback);
            };
            addSheetChangeEventListener(
                "__darkreader__adoptedStyleSheetsChange",
                onAdoptedSheetsChange
            );
            addSheetChangeEventListener(
                "__darkreader__adoptedStyleSheetChange",
                onAdoptedSheetsChange
            );
            addSheetChangeEventListener(
                "__darkreader__adoptedStyleDeclarationChange",
                onAdoptedSheetsChange
            );
            if (canUseSheetProxy$1) {
                return;
            }
            watchUsingRAF(callback);
        }
        return {
            render,
            destroy,
            watch
        };
    }
    class StyleSheetCommandBuilder {
        constructor() {
            this.cssRules = [];
            this.commands = [];
        }
        insertRule(cssText, index = 0) {
            this.commands.push({type: "insert", index, cssText});
            this.cssRules.splice(index, 0, new StyleSheetCommandBuilder());
            return index;
        }
        deleteRule(index) {
            this.commands.push({type: "delete", index});
            this.cssRules.splice(index, 1);
        }
        replaceSync(cssText) {
            this.commands.splice(0);
            this.commands.push({type: "replace", cssText});
            if (cssText === "") {
                this.cssRules.splice(0);
            } else {
                throw new Error(
                    "StyleSheetCommandBuilder.replaceSync() is not fully supported"
                );
            }
        }
        getDeepCSSCommands() {
            const deep = [];
            this.commands.forEach((command) => {
                deep.push({
                    type: command.type,
                    cssText: command.type !== "delete" ? command.cssText : "",
                    path: command.type === "replace" ? [] : [command.index]
                });
            });
            this.cssRules.forEach((rule, i) => {
                const childCommands = rule.getDeepCSSCommands();
                childCommands.forEach((c) => c.path.unshift(i));
            });
            return deep;
        }
        clearDeepCSSCommands() {
            this.commands.splice(0);
            this.cssRules.forEach((rule) => rule.clearDeepCSSCommands());
        }
    }
    function createAdoptedStyleSheetFallback() {
        let cancelAsyncOperations = false;
        const builder = new StyleSheetCommandBuilder();
        function render(options) {
            const prepareSheet = () => {
                builder.replaceSync("");
                return builder;
            };
            const sheetModifier = createStyleSheetModifier();
            sheetModifier.modifySheet({
                prepareSheet,
                sourceCSSRules: options.cssRules,
                theme: options.theme,
                ignoreImageAnalysis: options.ignoreImageAnalysis,
                force: false,
                isAsyncCancelled: () => cancelAsyncOperations
            });
        }
        function commands() {
            const commands = builder.getDeepCSSCommands();
            builder.clearDeepCSSCommands();
            return commands;
        }
        function destroy() {
            cancelAsyncOperations = true;
        }
        return {render, destroy, commands};
    }

    const hostsBreakingOnStylePosition = ["www.diffusioneshop.com", "zhale.me"];
    const mode = hostsBreakingOnStylePosition.includes(location.hostname)
        ? "away"
        : "next";
    function getStyleInjectionMode() {
        return mode;
    }
    function injectStyleAway(styleElement) {
        let container = document.body.querySelector(
            ".darkreader-style-container"
        );
        if (!container) {
            container = document.createElement("div");
            container.classList.add("darkreader");
            container.classList.add("darkreader-style-container");
            container.style.display = "none";
            document.body.append(container);
        }
        container.append(styleElement);
    }

    const overrides = {
        "background-color": {
            customProp: "--darkreader-inline-bgcolor",
            cssProp: "background-color",
            dataAttr: "data-darkreader-inline-bgcolor"
        },
        "background-image": {
            customProp: "--darkreader-inline-bgimage",
            cssProp: "background-image",
            dataAttr: "data-darkreader-inline-bgimage"
        },
        "border-color": {
            customProp: "--darkreader-inline-border",
            cssProp: "border-color",
            dataAttr: "data-darkreader-inline-border"
        },
        "border-bottom-color": {
            customProp: "--darkreader-inline-border-bottom",
            cssProp: "border-bottom-color",
            dataAttr: "data-darkreader-inline-border-bottom"
        },
        "border-left-color": {
            customProp: "--darkreader-inline-border-left",
            cssProp: "border-left-color",
            dataAttr: "data-darkreader-inline-border-left"
        },
        "border-right-color": {
            customProp: "--darkreader-inline-border-right",
            cssProp: "border-right-color",
            dataAttr: "data-darkreader-inline-border-right"
        },
        "border-top-color": {
            customProp: "--darkreader-inline-border-top",
            cssProp: "border-top-color",
            dataAttr: "data-darkreader-inline-border-top"
        },
        "box-shadow": {
            customProp: "--darkreader-inline-boxshadow",
            cssProp: "box-shadow",
            dataAttr: "data-darkreader-inline-boxshadow"
        },
        "color": {
            customProp: "--darkreader-inline-color",
            cssProp: "color",
            dataAttr: "data-darkreader-inline-color"
        },
        "fill": {
            customProp: "--darkreader-inline-fill",
            cssProp: "fill",
            dataAttr: "data-darkreader-inline-fill"
        },
        "stroke": {
            customProp: "--darkreader-inline-stroke",
            cssProp: "stroke",
            dataAttr: "data-darkreader-inline-stroke"
        },
        "outline-color": {
            customProp: "--darkreader-inline-outline",
            cssProp: "outline-color",
            dataAttr: "data-darkreader-inline-outline"
        },
        "stop-color": {
            customProp: "--darkreader-inline-stopcolor",
            cssProp: "stop-color",
            dataAttr: "data-darkreader-inline-stopcolor"
        }
    };
    const shorthandOverrides = {
        "background": {
            customProp: "--darkreader-inline-bg",
            cssProp: "background",
            dataAttr: "data-darkreader-inline-bg"
        },
        "border": {
            customProp: "--darkreader-inline-border-short",
            cssProp: "border",
            dataAttr: "data-darkreader-inline-border-short"
        },
        "border-bottom": {
            customProp: "--darkreader-inline-border-bottom-short",
            cssProp: "border-bottom",
            dataAttr: "data-darkreader-inline-border-bottom-short"
        },
        "border-left": {
            customProp: "--darkreader-inline-border-left-short",
            cssProp: "border-left",
            dataAttr: "data-darkreader-inline-border-left-short"
        },
        "border-right": {
            customProp: "--darkreader-inline-border-right-short",
            cssProp: "border-right",
            dataAttr: "data-darkreader-inline-border-right-short"
        },
        "border-top": {
            customProp: "--darkreader-inline-border-top-short",
            cssProp: "border-top",
            dataAttr: "data-darkreader-inline-border-top-short"
        }
    };
    const overridesList = Object.values(overrides);
    const normalizedPropList = {};
    overridesList.forEach(
        ({cssProp, customProp}) => (normalizedPropList[customProp] = cssProp)
    );
    const INLINE_STYLE_ATTRS = [
        "style",
        "fill",
        "stop-color",
        "stroke",
        "bgcolor",
        "color",
        "background"
    ];
    const INLINE_STYLE_SELECTOR = INLINE_STYLE_ATTRS.map(
        (attr) => `[${attr}]`
    ).join(", ");
    function getInlineOverrideStyle() {
        const allOverrides = overridesList.concat(
            Object.values(shorthandOverrides)
        );
        return allOverrides
            .map(({dataAttr, customProp, cssProp}) => {
                return [
                    `[${dataAttr}] {`,
                    `  ${cssProp}: var(${customProp}) !important;`,
                    "}"
                ].join("\n");
            })
            .concat([
                "[data-darkreader-inline-invert] {",
                "    filter: invert(100%) hue-rotate(180deg);",
                "}"
            ])
            .join("\n");
    }
    function getInlineStyleElements(root) {
        const results = [];
        if (root instanceof Element && root.matches(INLINE_STYLE_SELECTOR)) {
            results.push(root);
        }
        if (
            root instanceof Element ||
            (isShadowDomSupported && root instanceof ShadowRoot) ||
            root instanceof Document
        ) {
            push(results, root.querySelectorAll(INLINE_STYLE_SELECTOR));
        }
        return results;
    }
    const treeObservers = new Map();
    const attrObservers = new Map();
    function watchForInlineStyles(elementStyleDidChange, shadowRootDiscovered) {
        deepWatchForInlineStyles(
            document,
            elementStyleDidChange,
            shadowRootDiscovered
        );
        iterateShadowHosts(document.documentElement, (host) => {
            deepWatchForInlineStyles(
                host.shadowRoot,
                elementStyleDidChange,
                shadowRootDiscovered
            );
        });
    }
    function deepWatchForInlineStyles(
        root,
        elementStyleDidChange,
        shadowRootDiscovered
    ) {
        if (treeObservers.has(root)) {
            treeObservers.get(root).disconnect();
            attrObservers.get(root).disconnect();
        }
        const discoveredNodes = new WeakSet();
        function discoverNodes(node) {
            getInlineStyleElements(node).forEach((el) => {
                if (discoveredNodes.has(el)) {
                    return;
                }
                discoveredNodes.add(el);
                elementStyleDidChange(el);
            });
            iterateShadowHosts(node, (n) => {
                if (discoveredNodes.has(node)) {
                    return;
                }
                discoveredNodes.add(node);
                shadowRootDiscovered(n.shadowRoot);
                deepWatchForInlineStyles(
                    n.shadowRoot,
                    elementStyleDidChange,
                    shadowRootDiscovered
                );
            });
            variablesStore.matchVariablesAndDependents();
        }
        const treeObserver = createOptimizedTreeObserver(root, {
            onMinorMutations: (_root, {additions}) => {
                additions.forEach((added) => discoverNodes(added));
            },
            onHugeMutations: () => {
                discoverNodes(root);
            }
        });
        treeObservers.set(root, treeObserver);
        let attemptCount = 0;
        let start = null;
        const ATTEMPTS_INTERVAL = getDuration({seconds: 10});
        const RETRY_TIMEOUT = getDuration({seconds: 2});
        const MAX_ATTEMPTS_COUNT = 50;
        let cache = [];
        let timeoutId = null;
        const handleAttributeMutations = throttle((mutations) => {
            const handledTargets = new Set();
            mutations.forEach((m) => {
                const target = m.target;
                if (handledTargets.has(target)) {
                    return;
                }
                if (INLINE_STYLE_ATTRS.includes(m.attributeName)) {
                    handledTargets.add(target);
                    elementStyleDidChange(target);
                }
            });
            variablesStore.matchVariablesAndDependents();
        });
        const attrObserver = new MutationObserver((mutations) => {
            if (timeoutId) {
                cache.push(...mutations);
                return;
            }
            attemptCount++;
            const now = Date.now();
            if (start == null) {
                start = now;
            } else if (attemptCount >= MAX_ATTEMPTS_COUNT) {
                if (now - start < ATTEMPTS_INTERVAL) {
                    timeoutId = setTimeout(() => {
                        start = null;
                        attemptCount = 0;
                        timeoutId = null;
                        const attributeCache = cache;
                        cache = [];
                        handleAttributeMutations(attributeCache);
                    }, RETRY_TIMEOUT);
                    cache.push(...mutations);
                    return;
                }
                start = now;
                attemptCount = 1;
            }
            handleAttributeMutations(mutations);
        });
        attrObserver.observe(root, {
            attributes: true,
            attributeFilter: INLINE_STYLE_ATTRS.concat(
                overridesList.map(({dataAttr}) => dataAttr)
            ),
            subtree: true
        });
        attrObservers.set(root, attrObserver);
    }
    function stopWatchingForInlineStyles() {
        treeObservers.forEach((o) => o.disconnect());
        attrObservers.forEach((o) => o.disconnect());
        treeObservers.clear();
        attrObservers.clear();
    }
    const inlineStyleCache = new WeakMap();
    const svgInversionCache = new WeakSet();
    const svgAnalysisConditionCache = new WeakMap();
    const themeProps = ["brightness", "contrast", "grayscale", "sepia", "mode"];
    function shouldAnalyzeSVGAsImage(svg) {
        if (svgAnalysisConditionCache.has(svg)) {
            return svgAnalysisConditionCache.get(svg);
        }
        const shouldAnalyze = Boolean(
            svg &&
                (svg.getAttribute("class")?.includes("logo") ||
                    svg.parentElement?.getAttribute("class")?.includes("logo"))
        );
        svgAnalysisConditionCache.set(svg, shouldAnalyze);
        return shouldAnalyze;
    }
    function getInlineStyleCacheKey(el, theme) {
        return INLINE_STYLE_ATTRS.map(
            (attr) => `${attr}="${el.getAttribute(attr)}"`
        )
            .concat(themeProps.map((prop) => `${prop}="${theme[prop]}"`))
            .join(" ");
    }
    function shouldIgnoreInlineStyle(element, selectors) {
        for (let i = 0, len = selectors.length; i < len; i++) {
            const ingnoredSelector = selectors[i];
            if (element.matches(ingnoredSelector)) {
                return true;
            }
        }
        return false;
    }
    function overrideInlineStyle(
        element,
        theme,
        ignoreInlineSelectors,
        ignoreImageSelectors
    ) {
        const cacheKey = getInlineStyleCacheKey(element, theme);
        if (cacheKey === inlineStyleCache.get(element)) {
            return;
        }
        const unsetProps = new Set(Object.keys(overrides));
        function setCustomProp(targetCSSProp, modifierCSSProp, cssVal) {
            const mod = getModifiableCSSDeclaration(
                modifierCSSProp,
                cssVal,
                {style: element.style},
                variablesStore,
                ignoreImageSelectors,
                null
            );
            if (!mod) {
                return;
            }
            function setStaticValue(value) {
                const {customProp, dataAttr} =
                    overrides[targetCSSProp] ??
                    shorthandOverrides[targetCSSProp];
                element.style.setProperty(customProp, value);
                if (!element.hasAttribute(dataAttr)) {
                    element.setAttribute(dataAttr, "");
                }
                unsetProps.delete(targetCSSProp);
            }
            function setVarDeclaration(mod) {
                let prevDeclarations = [];
                function setProps(declarations) {
                    prevDeclarations.forEach(({property}) => {
                        element.style.removeProperty(property);
                    });
                    declarations.forEach(({property, value}) => {
                        if (!(value instanceof Promise)) {
                            element.style.setProperty(property, value);
                        }
                    });
                    prevDeclarations = declarations;
                }
                setProps(mod.declarations);
                mod.onTypeChange.addListener(setProps);
            }
            function setAsyncValue(promise, sourceValue) {
                promise.then((value) => {
                    if (
                        value &&
                        targetCSSProp === "background" &&
                        value.startsWith("var(--darkreader-bg--")
                    ) {
                        setStaticValue(value);
                    }
                    if (value && targetCSSProp === "background-image") {
                        if (
                            (element === document.documentElement ||
                                element === document.body) &&
                            value === sourceValue
                        ) {
                            value = "none";
                        }
                        setStaticValue(value);
                    }
                    inlineStyleCache.set(
                        element,
                        getInlineStyleCacheKey(element, theme)
                    );
                });
            }
            const value =
                typeof mod.value === "function" ? mod.value(theme) : mod.value;
            if (typeof value === "string") {
                setStaticValue(value);
            } else if (value instanceof Promise) {
                setAsyncValue(value, cssVal);
            } else if (typeof value === "object") {
                setVarDeclaration(value);
            }
        }
        if (ignoreInlineSelectors.length > 0) {
            if (shouldIgnoreInlineStyle(element, ignoreInlineSelectors)) {
                unsetProps.forEach((cssProp) => {
                    element.removeAttribute(overrides[cssProp].dataAttr);
                });
                return;
            }
        }
        const isSVGElement = element instanceof SVGElement;
        const svg = isSVGElement
            ? (element.ownerSVGElement ??
              (element instanceof SVGSVGElement ? element : null))
            : null;
        if (isSVGElement && theme.mode === 1 && svg) {
            if (svgInversionCache.has(svg)) {
                return;
            }
            if (shouldAnalyzeSVGAsImage(svg)) {
                svgInversionCache.add(svg);
                const analyzeSVGAsImage = () => {
                    let svgString = svg.outerHTML;
                    svgString = svgString.replaceAll(
                        '<style class="darkreader darkreader--sync" media="screen"></style>',
                        ""
                    );
                    const dataURL = `data:image/svg+xml;base64,${btoa(svgString)}`;
                    getImageDetails(dataURL).then((details) => {
                        if (
                            (details.isDark && details.isTransparent) ||
                            (details.isLarge &&
                                details.isLight &&
                                !details.isTransparent)
                        ) {
                            svg.setAttribute(
                                "data-darkreader-inline-invert",
                                ""
                            );
                        } else {
                            svg.removeAttribute(
                                "data-darkreader-inline-invert"
                            );
                        }
                    });
                };
                analyzeSVGAsImage();
                if (!isDOMReady()) {
                    addDOMReadyListener(analyzeSVGAsImage);
                }
                return;
            }
        }
        if (element.hasAttribute("bgcolor")) {
            let value = element.getAttribute("bgcolor");
            if (
                value.match(/^[0-9a-f]{3}$/i) ||
                value.match(/^[0-9a-f]{6}$/i)
            ) {
                value = `#${value}`;
            }
            setCustomProp("background-color", "background-color", value);
        }
        if (
            (element === document.documentElement ||
                element === document.body) &&
            element.hasAttribute("background")
        ) {
            const url = getAbsoluteURL(
                location.href,
                element.getAttribute("background") ?? ""
            );
            const value = `url("${url}")`;
            setCustomProp("background-image", "background-image", value);
        }
        if (element.hasAttribute("color") && element.rel !== "mask-icon") {
            let value = element.getAttribute("color");
            if (
                value.match(/^[0-9a-f]{3}$/i) ||
                value.match(/^[0-9a-f]{6}$/i)
            ) {
                value = `#${value}`;
            }
            setCustomProp("color", "color", value);
        }
        if (isSVGElement) {
            if (element.hasAttribute("fill")) {
                const SMALL_SVG_LIMIT = 32;
                const value = element.getAttribute("fill");
                if (value !== "none") {
                    if (!(element instanceof SVGTextElement)) {
                        const handleSVGElement = () => {
                            const {width, height} =
                                element.getBoundingClientRect();
                            const isBg =
                                width > SMALL_SVG_LIMIT ||
                                height > SMALL_SVG_LIMIT;
                            setCustomProp(
                                "fill",
                                isBg ? "background-color" : "color",
                                value
                            );
                        };
                        if (isReadyStateComplete()) {
                            handleSVGElement();
                        } else {
                            addReadyStateCompleteListener(handleSVGElement);
                        }
                    } else {
                        setCustomProp("fill", "color", value);
                    }
                }
            }
            if (element.hasAttribute("stop-color")) {
                setCustomProp(
                    "stop-color",
                    "background-color",
                    element.getAttribute("stop-color")
                );
            }
        }
        if (element.hasAttribute("stroke")) {
            const value = element.getAttribute("stroke");
            setCustomProp(
                "stroke",
                element instanceof SVGLineElement ||
                    element instanceof SVGTextElement
                    ? "border-color"
                    : "color",
                value
            );
        }
        element.style &&
            iterateCSSDeclarations(element.style, (property, value) => {
                if (property === "background-image" && value.includes("url")) {
                    if (
                        element === document.documentElement ||
                        element === document.body
                    ) {
                        setCustomProp(property, property, value);
                    }
                    return;
                }
                if (
                    overrides.hasOwnProperty(property) ||
                    (property.startsWith("--") && !normalizedPropList[property])
                ) {
                    setCustomProp(property, property, value);
                } else if (
                    shorthandOverrides[property] &&
                    value.includes("var(")
                ) {
                    setCustomProp(property, property, value);
                } else {
                    const overriddenProp = normalizedPropList[property];
                    if (
                        overriddenProp &&
                        !element.style.getPropertyValue(overriddenProp) &&
                        !element.hasAttribute(overriddenProp)
                    ) {
                        if (
                            overriddenProp === "background-color" &&
                            element.hasAttribute("bgcolor")
                        ) {
                            return;
                        }
                        element.style.setProperty(property, "");
                    }
                }
            });
        if (
            element.style &&
            element instanceof SVGTextElement &&
            element.style.fill
        ) {
            setCustomProp(
                "fill",
                "color",
                element.style.getPropertyValue("fill")
            );
        }
        if (element.getAttribute("style")?.includes("--")) {
            variablesStore.addInlineStyleForMatching(element.style);
        }
        forEach(unsetProps, (cssProp) => {
            element.removeAttribute(overrides[cssProp].dataAttr);
        });
        inlineStyleCache.set(element, getInlineStyleCacheKey(element, theme));
    }

    const metaThemeColorName = "theme-color";
    const metaThemeColorSelector = `meta[name="${metaThemeColorName}"]`;
    let srcMetaThemeColor = null;
    let observer = null;
    function changeMetaThemeColor(meta, theme) {
        srcMetaThemeColor = srcMetaThemeColor || meta.content;
        const color = parseColorWithCache(srcMetaThemeColor);
        if (!color) {
            logWarn("Invalid meta color", color);
            return;
        }
        meta.content = modifyBackgroundColor(color, theme, false);
    }
    function changeMetaThemeColorWhenAvailable(theme) {
        const meta = document.querySelector(metaThemeColorSelector);
        if (meta) {
            changeMetaThemeColor(meta, theme);
        } else {
            if (observer) {
                observer.disconnect();
            }
            observer = new MutationObserver((mutations) => {
                loop: for (let i = 0; i < mutations.length; i++) {
                    const {addedNodes} = mutations[i];
                    for (let j = 0; j < addedNodes.length; j++) {
                        const node = addedNodes[j];
                        if (
                            node instanceof HTMLMetaElement &&
                            node.name === metaThemeColorName
                        ) {
                            observer.disconnect();
                            observer = null;
                            changeMetaThemeColor(node, theme);
                            break loop;
                        }
                    }
                }
            });
            observer.observe(document.head, {childList: true});
        }
    }
    function restoreMetaThemeColor() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        const meta = document.querySelector(metaThemeColorSelector);
        if (meta && srcMetaThemeColor) {
            meta.content = srcMetaThemeColor;
        }
    }

    const cssCommentsRegex = /\/\*[\s\S]*?\*\//g;
    function removeCSSComments(cssText) {
        return cssText.replace(cssCommentsRegex, "");
    }

    let canUseSheetProxy = false;
    document.addEventListener(
        "__darkreader__inlineScriptsAllowed",
        () => (canUseSheetProxy = true),
        {once: true}
    );
    function createSheetWatcher(
        element,
        safeGetSheetRules,
        callback,
        isCancelled
    ) {
        let rafSheetWatcher = null;
        function watchForSheetChanges() {
            watchForSheetChangesUsingProxy();
            if (!(canUseSheetProxy && element.sheet)) {
                rafSheetWatcher = createRAFSheetWatcher(
                    element,
                    safeGetSheetRules,
                    callback,
                    isCancelled
                );
                rafSheetWatcher.start();
            }
        }
        let areSheetChangesPending = false;
        function onSheetChange() {
            canUseSheetProxy = true;
            rafSheetWatcher?.stop();
            if (areSheetChangesPending) {
                return;
            }
            function handleSheetChanges() {
                areSheetChangesPending = false;
                if (isCancelled()) {
                    return;
                }
                callback();
            }
            areSheetChangesPending = true;
            queueMicrotask(handleSheetChanges);
        }
        function watchForSheetChangesUsingProxy() {
            element.addEventListener(
                "__darkreader__updateSheet",
                onSheetChange
            );
        }
        function stopWatchingForSheetChangesUsingProxy() {
            element.removeEventListener(
                "__darkreader__updateSheet",
                onSheetChange
            );
        }
        function stopWatchingForSheetChanges() {
            stopWatchingForSheetChangesUsingProxy();
            rafSheetWatcher?.stop();
        }
        return {
            start: watchForSheetChanges,
            stop: stopWatchingForSheetChanges
        };
    }
    function createRAFSheetWatcher(
        element,
        safeGetSheetRules,
        callback,
        isCancelled
    ) {
        let rulesChangeKey = null;
        let rulesCheckFrameId = null;
        function getRulesChangeKey() {
            const rules = safeGetSheetRules();
            return rules ? rules.length : null;
        }
        function didRulesKeyChange() {
            return getRulesChangeKey() !== rulesChangeKey;
        }
        function watchForSheetChangesUsingRAF() {
            rulesChangeKey = getRulesChangeKey();
            stopWatchingForSheetChangesUsingRAF();
            const checkForUpdate = () => {
                const cancelled = isCancelled();
                if (!cancelled && didRulesKeyChange()) {
                    rulesChangeKey = getRulesChangeKey();
                    callback();
                }
                if (cancelled || (canUseSheetProxy && element.sheet)) {
                    stopWatchingForSheetChangesUsingRAF();
                    return;
                }
                rulesCheckFrameId = requestAnimationFrame(checkForUpdate);
            };
            checkForUpdate();
        }
        function stopWatchingForSheetChangesUsingRAF() {
            rulesCheckFrameId && cancelAnimationFrame(rulesCheckFrameId);
        }
        return {
            start: watchForSheetChangesUsingRAF,
            stop: stopWatchingForSheetChangesUsingRAF
        };
    }

    const STYLE_SELECTOR = 'style, link[rel*="stylesheet" i]:not([disabled])';
    function isFontsGoogleApiStyle(element) {
        if (!element.href) {
            return false;
        }
        try {
            const elementURL = new URL(element.href);
            return elementURL.hostname === "fonts.googleapis.com";
        } catch (err) {
            logInfo(`Couldn't construct ${element.href} as URL`);
            return false;
        }
    }
    const hostsBreakingOnSVGStyleOverride = [
        "account.containerstore.com",
        "containerstore.com",
        "www.onet.pl"
    ];
    function shouldManageStyle(element) {
        return (
            (element instanceof HTMLStyleElement ||
                (element instanceof SVGStyleElement &&
                    !hostsBreakingOnSVGStyleOverride.includes(
                        location.hostname
                    )) ||
                (element instanceof HTMLLinkElement &&
                    Boolean(element.rel) &&
                    element.rel.toLowerCase().includes("stylesheet") &&
                    Boolean(element.href) &&
                    !element.disabled &&
                    (isFirefox
                        ? !element.href.startsWith("moz-extension://")
                        : true) &&
                    !isFontsGoogleApiStyle(element))) &&
            !element.classList.contains("darkreader") &&
            element.media.toLowerCase() !== "print" &&
            !element.classList.contains("stylus")
        );
    }
    function getManageableStyles(node, results = [], deep = true) {
        if (shouldManageStyle(node)) {
            results.push(node);
        } else if (
            node instanceof Element ||
            (isShadowDomSupported && node instanceof ShadowRoot) ||
            node === document
        ) {
            forEach(node.querySelectorAll(STYLE_SELECTOR), (style) =>
                getManageableStyles(style, results, false)
            );
            if (deep) {
                iterateShadowHosts(node, (host) =>
                    getManageableStyles(host.shadowRoot, results, false)
                );
            }
        }
        return results;
    }
    const syncStyleSet = new WeakSet();
    const corsStyleSet = new WeakSet();
    let loadingLinkCounter = 0;
    const rejectorsForLoadingLinks = new Map();
    function cleanLoadingLinks() {
        rejectorsForLoadingLinks.clear();
    }
    function manageStyle(element, {update, loadingStart, loadingEnd}) {
        const inMode = getStyleInjectionMode();
        let corsCopy = null;
        let syncStyle = null;
        if (inMode === "next") {
            const prevStyles = [];
            let next = element;
            while (
                (next = next.nextElementSibling) &&
                next.matches(".darkreader")
            ) {
                prevStyles.push(next);
            }
            corsCopy =
                prevStyles.find(
                    (el) =>
                        el.matches(".darkreader--cors") && !corsStyleSet.has(el)
                ) || null;
            syncStyle =
                prevStyles.find(
                    (el) =>
                        el.matches(".darkreader--sync") && !syncStyleSet.has(el)
                ) || null;
        }
        let corsCopyPositionWatcher = null;
        let syncStylePositionWatcher = null;
        let cancelAsyncOperations = false;
        let isOverrideEmpty = true;
        const isAsyncCancelled = () => cancelAsyncOperations;
        const sheetModifier = createStyleSheetModifier();
        const observer = new MutationObserver((mutations) => {
            if (
                mutations.some((m) => m.type === "characterData") &&
                containsCSSImport()
            ) {
                const cssText = (element.textContent ?? "").trim();
                createOrUpdateCORSCopy(cssText, location.href).then(update);
            } else {
                update();
            }
        });
        const observerOptions = {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true
        };
        function containsCSSImport() {
            if (!(element instanceof HTMLStyleElement)) {
                return false;
            }
            const cssText = removeCSSComments(element.textContent ?? "").trim();
            return cssText.match(cssImportRegex);
        }
        function hasImports(cssRules, checkCrossOrigin) {
            let result = false;
            if (cssRules) {
                let rule;
                cssRulesLoop: for (
                    let i = 0, len = cssRules.length;
                    i < len;
                    i++
                ) {
                    rule = cssRules[i];
                    if (rule.href) {
                        if (checkCrossOrigin) {
                            if (
                                !rule.href.startsWith(
                                    "https://fonts.googleapis.com/"
                                ) &&
                                rule.href.startsWith("http") &&
                                !rule.href.startsWith(location.origin)
                            ) {
                                result = true;
                                break cssRulesLoop;
                            }
                        } else {
                            result = true;
                            break cssRulesLoop;
                        }
                    }
                }
            }
            return result;
        }
        function getRulesSync() {
            if (corsCopy) {
                return corsCopy.sheet.cssRules;
            }
            if (containsCSSImport()) {
                return null;
            }
            const cssRules = safeGetSheetRules();
            if (
                element instanceof HTMLLinkElement &&
                !isRelativeHrefOnAbsolutePath(element.href) &&
                hasImports(cssRules, false)
            ) {
                return null;
            }
            if (hasImports(cssRules, true)) {
                return null;
            }
            !cssRules &&
                logWarn("[getRulesSync] cssRules is null, trying again.");
            return cssRules;
        }
        function insertStyle() {
            if (inMode === "next") {
                if (corsCopy) {
                    if (element.nextSibling !== corsCopy) {
                        element.parentNode.insertBefore(
                            corsCopy,
                            element.nextSibling
                        );
                    }
                    if (corsCopy.nextSibling !== syncStyle) {
                        element.parentNode.insertBefore(
                            syncStyle,
                            corsCopy.nextSibling
                        );
                    }
                } else if (element.nextSibling !== syncStyle) {
                    element.parentNode.insertBefore(
                        syncStyle,
                        element.nextSibling
                    );
                }
            } else if (inMode === "away") {
                if (corsCopy && !corsCopy.parentNode) {
                    injectStyleAway(corsCopy);
                }
                injectStyleAway(syncStyle);
            }
        }
        function createSyncStyle() {
            syncStyle =
                element instanceof SVGStyleElement
                    ? document.createElementNS(
                          "http://www.w3.org/2000/svg",
                          "style"
                      )
                    : document.createElement("style");
            syncStyle.classList.add("darkreader");
            syncStyle.classList.add("darkreader--sync");
            syncStyle.media = "screen";
            if (element.title) {
                syncStyle.title = element.title;
            }
            syncStyleSet.add(syncStyle);
        }
        let isLoadingRules = false;
        let wasLoadingError = false;
        const loadingLinkId = ++loadingLinkCounter;
        async function getRulesAsync() {
            let cssText;
            let cssBasePath;
            if (element instanceof HTMLLinkElement) {
                let [cssRules, accessError] = getRulesOrError();
                if (accessError) {
                    logWarn(accessError);
                }
                if (
                    (isSafari && !element.sheet) ||
                    (!isSafari && !cssRules && !accessError) ||
                    isStillLoadingError(accessError)
                ) {
                    try {
                        logInfo(
                            `Linkelement ${loadingLinkId} is not loaded yet and thus will be await for`,
                            element
                        );
                        await linkLoading(element, loadingLinkId);
                    } catch (err) {
                        logWarn(err);
                        wasLoadingError = true;
                    }
                    if (cancelAsyncOperations) {
                        return null;
                    }
                    [cssRules, accessError] = getRulesOrError();
                    if (accessError) {
                        logWarn(accessError);
                    }
                }
                if (cssRules) {
                    if (!hasImports(cssRules, false)) {
                        return cssRules;
                    }
                }
                try {
                    cssText = await loadText(element.href);
                } catch (err) {
                    logWarn(err);
                    cssText = "";
                }
                cssBasePath = getCSSBaseBath(element.href);
                if (cancelAsyncOperations) {
                    return null;
                }
            } else if (containsCSSImport()) {
                cssText = element.textContent.trim();
                cssBasePath = getCSSBaseBath(location.href);
            } else {
                return null;
            }
            await createOrUpdateCORSCopy(cssText, cssBasePath);
            if (corsCopy) {
                return corsCopy.sheet.cssRules;
            }
            return null;
        }
        async function createOrUpdateCORSCopy(cssText, cssBasePath) {
            if (cssText) {
                try {
                    const fullCSSText = await replaceCSSImports(
                        cssText,
                        cssBasePath
                    );
                    if (corsCopy) {
                        if (
                            (corsCopy.textContent?.length ?? 0) <
                            fullCSSText.length
                        ) {
                            corsCopy.textContent = fullCSSText;
                        }
                    } else {
                        corsCopy = createCORSCopy(
                            fullCSSText,
                            inMode === "next"
                                ? (cc) =>
                                      element.parentNode.insertBefore(
                                          cc,
                                          element.nextSibling
                                      )
                                : injectStyleAway
                        );
                        if (corsCopy) {
                            if (inMode === "next") {
                                element.parentNode.insertBefore(
                                    corsCopy,
                                    element.nextSibling
                                );
                            } else if (inMode === "away") {
                                injectStyleAway(corsCopy);
                            }
                        }
                    }
                } catch (err) {
                    logWarn(err);
                }
                if (corsCopy && inMode === "next") {
                    corsCopyPositionWatcher = watchForNodePosition(
                        corsCopy,
                        "prev-sibling"
                    );
                }
            }
        }
        function details(options) {
            const rules = getRulesSync();
            if (!rules) {
                if (options.secondRound) {
                    logWarn(
                        "Detected dead-lock at details(), returning early to prevent it."
                    );
                    return null;
                }
                if (isLoadingRules || wasLoadingError) {
                    return null;
                }
                isLoadingRules = true;
                loadingStart();
                getRulesAsync()
                    .then((results) => {
                        isLoadingRules = false;
                        loadingEnd();
                        if (results) {
                            update();
                        }
                    })
                    .catch((err) => {
                        logWarn(err);
                        isLoadingRules = false;
                        loadingEnd();
                    });
                return null;
            }
            return {rules};
        }
        let forceRenderStyle = false;
        function render(theme, ignoreImageAnalysis) {
            const rules = getRulesSync();
            if (!rules) {
                return;
            }
            cancelAsyncOperations = false;
            function removeCSSRulesFromSheet(sheet) {
                if (!sheet) {
                    return;
                }
                for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
                    sheet.deleteRule(i);
                }
            }
            function prepareOverridesSheet() {
                if (!syncStyle) {
                    createSyncStyle();
                }
                syncStylePositionWatcher && syncStylePositionWatcher.stop();
                insertStyle();
                if (syncStyle.sheet == null) {
                    syncStyle.textContent = "";
                }
                const sheet = syncStyle.sheet;
                removeCSSRulesFromSheet(sheet);
                if (syncStylePositionWatcher) {
                    syncStylePositionWatcher.run();
                } else if (inMode === "next") {
                    syncStylePositionWatcher = watchForNodePosition(
                        syncStyle,
                        "prev-sibling",
                        () => {
                            forceRenderStyle = true;
                            buildOverrides();
                        }
                    );
                }
                return syncStyle.sheet;
            }
            function buildOverrides() {
                const force = forceRenderStyle;
                forceRenderStyle = false;
                sheetModifier.modifySheet({
                    prepareSheet: prepareOverridesSheet,
                    sourceCSSRules: rules,
                    theme,
                    ignoreImageAnalysis,
                    force,
                    isAsyncCancelled
                });
                isOverrideEmpty = syncStyle.sheet.cssRules.length === 0;
                if (sheetModifier.shouldRebuildStyle()) {
                    addReadyStateCompleteListener(() => update());
                }
            }
            buildOverrides();
        }
        function getRulesOrError() {
            try {
                if (element.sheet == null) {
                    return [null, null];
                }
                return [element.sheet.cssRules, null];
            } catch (err) {
                return [null, err];
            }
        }
        function isStillLoadingError(error) {
            return error && error.message && error.message.includes("loading");
        }
        function safeGetSheetRules() {
            const [cssRules, err] = getRulesOrError();
            if (err) {
                logWarn(err);
                return null;
            }
            return cssRules;
        }
        const sheetChangeWatcher = createSheetWatcher(
            element,
            safeGetSheetRules,
            update,
            isAsyncCancelled
        );
        function pause() {
            observer.disconnect();
            cancelAsyncOperations = true;
            corsCopyPositionWatcher && corsCopyPositionWatcher.stop();
            syncStylePositionWatcher && syncStylePositionWatcher.stop();
            sheetChangeWatcher.stop();
        }
        function destroy() {
            pause();
            removeNode(corsCopy);
            removeNode(syncStyle);
            loadingEnd();
            if (rejectorsForLoadingLinks.has(loadingLinkId)) {
                const reject = rejectorsForLoadingLinks.get(loadingLinkId);
                rejectorsForLoadingLinks.delete(loadingLinkId);
                reject && reject();
            }
        }
        function watch() {
            observer.observe(element, observerOptions);
            if (element instanceof HTMLStyleElement) {
                sheetChangeWatcher.start();
            }
        }
        const maxMoveCount = 10;
        let moveCount = 0;
        function restore() {
            if (!syncStyle) {
                return;
            }
            moveCount++;
            if (moveCount > maxMoveCount) {
                logWarn("Style sheet was moved multiple times", element);
                return;
            }
            logWarn("Restore style", syncStyle, element);
            insertStyle();
            corsCopyPositionWatcher && corsCopyPositionWatcher.skip();
            syncStylePositionWatcher && syncStylePositionWatcher.skip();
            if (!isOverrideEmpty) {
                forceRenderStyle = true;
                update();
            }
        }
        return {
            details,
            render,
            pause,
            destroy,
            watch,
            restore
        };
    }
    async function linkLoading(link, loadingId) {
        return new Promise((resolve, reject) => {
            const cleanUp = () => {
                link.removeEventListener("load", onLoad);
                link.removeEventListener("error", onError);
                rejectorsForLoadingLinks.delete(loadingId);
            };
            const onLoad = () => {
                cleanUp();
                resolve();
            };
            const onError = () => {
                cleanUp();
                reject(
                    `Linkelement ${loadingId} couldn't be loaded. ${link.href}`
                );
            };
            rejectorsForLoadingLinks.set(loadingId, () => {
                cleanUp();
                reject();
            });
            link.addEventListener("load", onLoad, {passive: true});
            link.addEventListener("error", onError, {passive: true});
            if (!link.href) {
                onError();
            }
        });
    }
    function getCSSImportURL(importDeclaration) {
        return getCSSURLValue(
            importDeclaration
                .substring(7)
                .trim()
                .replace(/;$/, "")
                .replace(/screen$/, "")
        );
    }
    async function loadText(url) {
        if (url.startsWith("data:")) {
            return await (await fetch(url)).text();
        }
        const cache = readCSSFetchCache(url);
        if (cache) {
            return cache;
        }
        const parsedURL = new URL(url);
        let text;
        if (parsedURL.origin === location.origin) {
            text = await loadAsText(url, "text/css", location.origin);
        } else {
            text = await bgFetch({
                url,
                responseType: "text",
                mimeType: "text/css",
                origin: location.origin
            });
        }
        writeCSSFetchCache(url, text);
        return text;
    }
    async function replaceCSSImports(cssText, basePath, cache = new Map()) {
        cssText = removeCSSComments(cssText);
        cssText = replaceCSSFontFace(cssText);
        cssText = replaceCSSRelativeURLsWithAbsolute(cssText, basePath);
        const importMatches = getMatchesWithOffsets(cssImportRegex, cssText);
        let prev = null;
        let shouldIgnoreImportsInBetween = false;
        let diff = 0;
        for (const match of importMatches) {
            let importedCSS;
            const prevImportEnd = prev ? prev.offset + prev.text.length : 0;
            const nextImportStart = match.offset;
            const openBraceIndex = cssText.indexOf("{", prevImportEnd);
            const closeBraceIndex = cssText.indexOf("}", prevImportEnd);
            if (
                shouldIgnoreImportsInBetween ||
                (openBraceIndex >= 0 &&
                    openBraceIndex < nextImportStart &&
                    closeBraceIndex >= 0 &&
                    closeBraceIndex < nextImportStart)
            ) {
                shouldIgnoreImportsInBetween = true;
                importedCSS = "";
            } else {
                const importURL = getCSSImportURL(match.text);
                const absoluteURL = getAbsoluteURL(basePath, importURL);
                if (cache.has(absoluteURL)) {
                    importedCSS = cache.get(absoluteURL);
                } else {
                    try {
                        importedCSS = await loadText(absoluteURL);
                        cache.set(absoluteURL, importedCSS);
                        importedCSS = await replaceCSSImports(
                            importedCSS,
                            getCSSBaseBath(absoluteURL),
                            cache
                        );
                    } catch (err) {
                        logWarn(err);
                        importedCSS = "";
                    }
                }
            }
            cssText =
                cssText.substring(0, match.offset + diff) +
                importedCSS +
                cssText.substring(match.offset + match.text.length + diff);
            diff += importedCSS.length - match.text.length;
            prev = match;
        }
        cssText = cssText.trim();
        return cssText;
    }
    function createCORSCopy(cssText, inject) {
        if (!cssText) {
            return null;
        }
        const cors = document.createElement("style");
        cors.classList.add("darkreader");
        cors.classList.add("darkreader--cors");
        cors.media = "screen";
        cors.textContent = cssText;
        inject(cors);
        cors.sheet.disabled = true;
        corsStyleSet.add(cors);
        return cors;
    }

    function injectProxy(
        enableStyleSheetsProxy,
        enableCustomElementRegistryProxy
    ) {
        document.dispatchEvent(
            new CustomEvent("__darkreader__inlineScriptsAllowed")
        );
        const cleaners = [];
        function cleanUp() {
            cleaners.forEach((clean) => clean());
            cleaners.splice(0);
        }
        function documentEventListener(type, listener, options) {
            document.addEventListener(type, listener, options);
            cleaners.push(() => document.removeEventListener(type, listener));
        }
        function disableConflictingPlugins() {
            const disableWPDarkMode = () => {
                if (window?.WPDarkMode?.deactivate) {
                    window.WPDarkMode.deactivate();
                }
            };
            disableWPDarkMode();
        }
        documentEventListener("__darkreader__cleanUp", cleanUp);
        documentEventListener(
            "__darkreader__disableConflictingPlugins",
            disableConflictingPlugins
        );
        function overrideProperty(cls, prop, overrides) {
            const proto = cls.prototype;
            const oldDescriptor = Object.getOwnPropertyDescriptor(proto, prop);
            if (!oldDescriptor) {
                return;
            }
            const newDescriptor = {...oldDescriptor};
            Object.keys(overrides).forEach((key) => {
                const factory = overrides[key];
                newDescriptor[key] = factory(oldDescriptor[key]);
            });
            Object.defineProperty(proto, prop, newDescriptor);
            cleaners.push(() =>
                Object.defineProperty(proto, prop, oldDescriptor)
            );
        }
        function override(cls, prop, factory) {
            overrideProperty(cls, prop, {value: factory});
        }
        function isDRElement(element) {
            return element?.classList?.contains("darkreader");
        }
        function isDRSheet(sheet) {
            return isDRElement(sheet.ownerNode);
        }
        const updateSheetEvent = new CustomEvent("__darkreader__updateSheet");
        const adoptedSheetChangeEvent = new CustomEvent(
            "__darkreader__adoptedStyleSheetChange"
        );
        const shadowDomAttachingEvent = new CustomEvent(
            "__darkreader__shadowDomAttaching",
            {bubbles: true}
        );
        const adoptedSheetOwners = new WeakMap();
        const adoptedDeclarationSheets = new WeakMap();
        function onAdoptedSheetChange(sheet) {
            const owners = adoptedSheetOwners.get(sheet);
            owners?.forEach((node) => {
                if (node.isConnected) {
                    node.dispatchEvent(adoptedSheetChangeEvent);
                } else {
                    owners.delete(node);
                }
            });
        }
        function reportSheetChange(sheet) {
            if (sheet.ownerNode && !isDRSheet(sheet)) {
                sheet.ownerNode.dispatchEvent(updateSheetEvent);
            }
            if (adoptedSheetOwners.has(sheet)) {
                onAdoptedSheetChange(sheet);
            }
        }
        function reportSheetChangeAsync(sheet, promise) {
            const {ownerNode} = sheet;
            if (
                ownerNode &&
                !isDRSheet(sheet) &&
                promise &&
                promise instanceof Promise
            ) {
                promise.then(() => ownerNode.dispatchEvent(updateSheetEvent));
            }
            if (adoptedSheetOwners.has(sheet)) {
                if (promise && promise instanceof Promise) {
                    promise.then(() => onAdoptedSheetChange(sheet));
                }
            }
        }
        override(
            CSSStyleSheet,
            "addRule",
            (native) =>
                function (selector, style, index) {
                    native.call(this, selector, style, index);
                    reportSheetChange(this);
                    return -1;
                }
        );
        override(
            CSSStyleSheet,
            "insertRule",
            (native) =>
                function (rule, index) {
                    const returnValue = native.call(this, rule, index);
                    reportSheetChange(this);
                    return returnValue;
                }
        );
        override(
            CSSStyleSheet,
            "deleteRule",
            (native) =>
                function (index) {
                    native.call(this, index);
                    reportSheetChange(this);
                }
        );
        override(
            CSSStyleSheet,
            "removeRule",
            (native) =>
                function (index) {
                    native.call(this, index);
                    reportSheetChange(this);
                }
        );
        override(
            CSSStyleSheet,
            "replace",
            (native) =>
                function (cssText) {
                    const returnValue = native.call(this, cssText);
                    reportSheetChangeAsync(this, returnValue);
                    return returnValue;
                }
        );
        override(
            CSSStyleSheet,
            "replaceSync",
            (native) =>
                function (cssText) {
                    native.call(this, cssText);
                    reportSheetChange(this);
                }
        );
        override(
            Element,
            "attachShadow",
            (native) =>
                function (options) {
                    this.dispatchEvent(shadowDomAttachingEvent);
                    return native.call(this, options);
                }
        );
        const shouldWrapHTMLElement =
            location.hostname === "baidu.com" ||
            location.hostname.endsWith(".baidu.com");
        if (shouldWrapHTMLElement) {
            override(
                Element,
                "getElementsByTagName",
                (native) =>
                    function (tagName) {
                        if (tagName !== "style") {
                            return native.call(this, tagName);
                        }
                        const getCurrentElementValue = () => {
                            const elements = native.call(this, tagName);
                            return Object.setPrototypeOf(
                                [...elements].filter(
                                    (element) =>
                                        element && !isDRElement(element)
                                ),
                                NodeList.prototype
                            );
                        };
                        let elements = getCurrentElementValue();
                        const nodeListBehavior = {
                            get: function (_, property) {
                                return getCurrentElementValue()[
                                    Number(property) || property
                                ];
                            }
                        };
                        elements = new Proxy(elements, nodeListBehavior);
                        return elements;
                    }
            );
        }
        const shouldProxyChildNodes = ["brilliant.org", "www.vy.no"].includes(
            location.hostname
        );
        if (shouldProxyChildNodes) {
            overrideProperty(Node, "childNodes", {
                get: (native) =>
                    function () {
                        const childNodes = native.call(this);
                        return Object.setPrototypeOf(
                            [...childNodes].filter((element) => {
                                return !isDRElement(element);
                            }),
                            NodeList.prototype
                        );
                    }
            });
        }
        function resolveCustomElement(tag) {
            customElements.whenDefined(tag).then(() => {
                document.dispatchEvent(
                    new CustomEvent("__darkreader__isDefined", {detail: {tag}})
                );
            });
        }
        documentEventListener("__darkreader__addUndefinedResolver", (e) =>
            resolveCustomElement(e.detail.tag)
        );
        if (enableCustomElementRegistryProxy) {
            override(
                CustomElementRegistry,
                "define",
                (native) =>
                    function (name, constructor, options) {
                        resolveCustomElement(name);
                        native.call(this, name, constructor, options);
                    }
            );
        }
        let blobURLAllowed = null;
        function checkBlobURLSupport() {
            if (blobURLAllowed != null) {
                document.dispatchEvent(
                    new CustomEvent("__darkreader__blobURLCheckResponse", {
                        detail: {blobURLAllowed}
                    })
                );
                return;
            }
            const svg =
                '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="transparent"/></svg>';
            const bytes = new Uint8Array(svg.length);
            for (let i = 0; i < svg.length; i++) {
                bytes[i] = svg.charCodeAt(i);
            }
            const blob = new Blob([bytes], {type: "image/svg+xml"});
            const objectURL = URL.createObjectURL(blob);
            const image = new Image();
            image.onload = () => {
                blobURLAllowed = true;
                sendBlobURLCheckResponse();
            };
            image.onerror = () => {
                blobURLAllowed = false;
                sendBlobURLCheckResponse();
            };
            image.src = objectURL;
        }
        function sendBlobURLCheckResponse() {
            document.dispatchEvent(
                new CustomEvent("__darkreader__blobURLCheckResponse", {
                    detail: {blobURLAllowed}
                })
            );
        }
        documentEventListener(
            "__darkreader__blobURLCheckRequest",
            checkBlobURLSupport
        );
        if (enableStyleSheetsProxy) {
            overrideProperty(Document, "styleSheets", {
                get: (native) =>
                    function () {
                        const getCurrentValue = () => {
                            const docSheets = native.call(this);
                            const filteredSheets = [...docSheets].filter(
                                (styleSheet) =>
                                    styleSheet.ownerNode &&
                                    !isDRSheet(styleSheet)
                            );
                            filteredSheets.item = (item) =>
                                filteredSheets[item];
                            return Object.setPrototypeOf(
                                filteredSheets,
                                StyleSheetList.prototype
                            );
                        };
                        let elements = getCurrentValue();
                        const styleSheetListBehavior = {
                            get: function (_, property) {
                                return getCurrentValue()[property];
                            }
                        };
                        elements = new Proxy(elements, styleSheetListBehavior);
                        return elements;
                    }
            });
        }
        {
            const adoptedSheetsSourceProxies = new WeakMap();
            const adoptedSheetsProxySources = new WeakMap();
            const adoptedSheetsChangeEvent = new CustomEvent(
                "__darkreader__adoptedStyleSheetsChange"
            );
            const adoptedSheetOverrideCache = new WeakSet();
            const adoptedSheetsSnapshots = new WeakMap();
            const isDRAdoptedSheetOverride = (sheet) => {
                if (!sheet || !sheet.cssRules) {
                    return false;
                }
                if (adoptedSheetOverrideCache.has(sheet)) {
                    return true;
                }
                if (
                    sheet.cssRules.length > 0 &&
                    sheet.cssRules[0].cssText.startsWith(
                        "#__darkreader__adoptedOverride"
                    )
                ) {
                    adoptedSheetOverrideCache.add(sheet);
                    return true;
                }
                return false;
            };
            const areArraysEqual = (a, b) => {
                return a.length === b.length && a.every((x, i) => x === b[i]);
            };
            const onAdoptedSheetsChange = (node) => {
                const prev = adoptedSheetsSnapshots.get(node);
                const curr = (node.adoptedStyleSheets || []).filter(
                    (s) => !isDRAdoptedSheetOverride(s)
                );
                adoptedSheetsSnapshots.set(node, curr);
                if (!prev || !areArraysEqual(prev, curr)) {
                    curr.forEach((sheet) => {
                        if (!adoptedSheetOwners.has(sheet)) {
                            adoptedSheetOwners.set(sheet, new Set());
                        }
                        adoptedSheetOwners.get(sheet).add(node);
                        for (const rule of sheet.cssRules) {
                            const declaration = rule.style;
                            if (declaration) {
                                adoptedDeclarationSheets.set(
                                    declaration,
                                    sheet
                                );
                            }
                        }
                    });
                    node.dispatchEvent(adoptedSheetsChangeEvent);
                }
            };
            const proxyAdoptedSheetsArray = (node, source) => {
                if (adoptedSheetsProxySources.has(source)) {
                    return source;
                }
                if (adoptedSheetsSourceProxies.has(source)) {
                    return adoptedSheetsSourceProxies.get(source);
                }
                const proxy = new Proxy(source, {
                    deleteProperty(target, property) {
                        delete target[property];
                        return true;
                    },
                    set(target, property, value) {
                        target[property] = value;
                        if (property === "length") {
                            onAdoptedSheetsChange(node);
                        }
                        return true;
                    }
                });
                adoptedSheetsSourceProxies.set(source, proxy);
                adoptedSheetsProxySources.set(proxy, source);
                return proxy;
            };
            [Document, ShadowRoot].forEach((ctor) => {
                overrideProperty(ctor, "adoptedStyleSheets", {
                    get: (native) =>
                        function () {
                            const source = native.call(this);
                            return proxyAdoptedSheetsArray(this, source);
                        },
                    set: (native) =>
                        function (source) {
                            if (adoptedSheetsProxySources.has(source)) {
                                source = adoptedSheetsProxySources.get(source);
                            }
                            native.call(this, source);
                            onAdoptedSheetsChange(this);
                        }
                });
            });
            const adoptedDeclarationChangeEvent = new CustomEvent(
                "__darkreader__adoptedStyleDeclarationChange"
            );
            ["setProperty", "removeProperty"].forEach((key) => {
                override(CSSStyleDeclaration, key, (native) => {
                    return function (...args) {
                        const returnValue = native.apply(this, args);
                        const sheet = adoptedDeclarationSheets.get(this);
                        if (sheet) {
                            const owners = adoptedSheetOwners.get(sheet);
                            if (owners) {
                                owners.forEach((node) => {
                                    node.dispatchEvent(
                                        adoptedDeclarationChangeEvent
                                    );
                                });
                            }
                        }
                        return returnValue;
                    };
                });
            });
        }
    }

    const definedCustomElements = new Set();
    const undefinedGroups = new Map();
    let elementsDefinitionCallback;
    function isCustomElement(element) {
        if (element.tagName.includes("-") || element.getAttribute("is")) {
            return true;
        }
        return false;
    }
    function recordUndefinedElement(element) {
        let tag = element.tagName.toLowerCase();
        if (!tag.includes("-")) {
            const extendedTag = element.getAttribute("is");
            if (extendedTag) {
                tag = extendedTag;
            } else {
                return;
            }
        }
        if (!undefinedGroups.has(tag)) {
            undefinedGroups.set(tag, new Set());
            customElementsWhenDefined(tag).then(() => {
                if (elementsDefinitionCallback) {
                    const elements = undefinedGroups.get(tag);
                    ASSERT(
                        "recordUndefinedElement() undefined groups should not be empty",
                        elements
                    );
                    undefinedGroups.delete(tag);
                    elementsDefinitionCallback(Array.from(elements));
                }
            });
        }
        undefinedGroups.get(tag).add(element);
    }
    function collectUndefinedElements(root) {
        if (!isDefinedSelectorSupported) {
            return;
        }
        forEach(
            root.querySelectorAll(":not(:defined)"),
            recordUndefinedElement
        );
    }
    let canOptimizeUsingProxy = false;
    document.addEventListener(
        "__darkreader__inlineScriptsAllowed",
        () => {
            canOptimizeUsingProxy = true;
        },
        {once: true, passive: true}
    );
    const unhandledShadowHosts = new Set();
    document.addEventListener("__darkreader__shadowDomAttaching", (e) => {
        const host = e.target;
        if (unhandledShadowHosts.size === 0) {
            queueMicrotask(() => {
                const hosts = [...unhandledShadowHosts].filter(
                    (el) => el.shadowRoot
                );
                elementsDefinitionCallback?.(hosts);
                unhandledShadowHosts.clear();
            });
        }
        unhandledShadowHosts.add(host);
    });
    const resolvers = new Map();
    function handleIsDefined(e) {
        canOptimizeUsingProxy = true;
        const tag = e.detail.tag;
        ASSERT(
            "handleIsDefined() expects lower-case node names",
            () => tag.toLowerCase() === tag
        );
        definedCustomElements.add(tag);
        if (resolvers.has(tag)) {
            const r = resolvers.get(tag);
            resolvers.delete(tag);
            r.forEach((r) => r());
        }
    }
    async function customElementsWhenDefined(tag) {
        ASSERT(
            "customElementsWhenDefined() expects lower-case node names",
            () => tag.toLowerCase() === tag
        );
        if (definedCustomElements.has(tag)) {
            return;
        }
        return new Promise((resolve) => {
            if (
                window.customElements &&
                typeof customElements.whenDefined === "function"
            ) {
                customElements.whenDefined(tag).then(() => resolve());
            } else if (canOptimizeUsingProxy) {
                if (resolvers.has(tag)) {
                    resolvers.get(tag).push(resolve);
                } else {
                    resolvers.set(tag, [resolve]);
                }
                document.dispatchEvent(
                    new CustomEvent("__darkreader__addUndefinedResolver", {
                        detail: {tag}
                    })
                );
            } else {
                const checkIfDefined = () => {
                    const elements = undefinedGroups.get(tag);
                    if (elements && elements.size > 0) {
                        if (
                            elements.values().next().value.matches(":defined")
                        ) {
                            resolve();
                        } else {
                            requestAnimationFrame(checkIfDefined);
                        }
                    }
                };
                requestAnimationFrame(checkIfDefined);
            }
        });
    }
    function watchWhenCustomElementsDefined(callback) {
        elementsDefinitionCallback = callback;
    }
    function unsubscribeFromDefineCustomElements() {
        elementsDefinitionCallback = null;
        undefinedGroups.clear();
        document.removeEventListener(
            "__darkreader__isDefined",
            handleIsDefined
        );
    }

    const observers = [];
    let observedRoots;
    let handledShadowHosts;
    function watchForStylePositions(
        currentStyles,
        update,
        shadowRootDiscovered
    ) {
        stopWatchingForStylePositions();
        const prevStylesByRoot = new WeakMap();
        const getPrevStyles = (root) => {
            if (!prevStylesByRoot.has(root)) {
                prevStylesByRoot.set(root, new Set());
            }
            return prevStylesByRoot.get(root);
        };
        currentStyles.forEach((node) => {
            let root = node;
            while ((root = root.parentNode)) {
                if (
                    root === document ||
                    root.nodeType === Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    const prevStyles = getPrevStyles(root);
                    prevStyles.add(node);
                    break;
                }
            }
        });
        const prevStyleSiblings = new WeakMap();
        const nextStyleSiblings = new WeakMap();
        function saveStylePosition(style) {
            prevStyleSiblings.set(style, style.previousElementSibling);
            nextStyleSiblings.set(style, style.nextElementSibling);
        }
        function forgetStylePosition(style) {
            prevStyleSiblings.delete(style);
            nextStyleSiblings.delete(style);
        }
        function didStylePositionChange(style) {
            return (
                style.previousElementSibling !== prevStyleSiblings.get(style) ||
                style.nextElementSibling !== nextStyleSiblings.get(style)
            );
        }
        currentStyles.forEach(saveStylePosition);
        function handleStyleOperations(root, operations) {
            const {createdStyles, removedStyles, movedStyles} = operations;
            createdStyles.forEach((s) => saveStylePosition(s));
            movedStyles.forEach((s) => saveStylePosition(s));
            removedStyles.forEach((s) => forgetStylePosition(s));
            const prevStyles = getPrevStyles(root);
            createdStyles.forEach((s) => prevStyles.add(s));
            removedStyles.forEach((s) => prevStyles.delete(s));
            if (
                createdStyles.size + removedStyles.size + movedStyles.size >
                0
            ) {
                update({
                    created: Array.from(createdStyles),
                    removed: Array.from(removedStyles),
                    moved: Array.from(movedStyles),
                    updated: []
                });
            }
        }
        function handleMinorTreeMutations(root, {additions, moves, deletions}) {
            const createdStyles = new Set();
            const removedStyles = new Set();
            const movedStyles = new Set();
            additions.forEach((node) =>
                getManageableStyles(node).forEach((style) =>
                    createdStyles.add(style)
                )
            );
            deletions.forEach((node) =>
                getManageableStyles(node).forEach((style) =>
                    removedStyles.add(style)
                )
            );
            moves.forEach((node) =>
                getManageableStyles(node).forEach((style) =>
                    movedStyles.add(style)
                )
            );
            handleStyleOperations(root, {
                createdStyles,
                removedStyles,
                movedStyles
            });
            additions.forEach((n) => {
                deepObserve(n);
                collectUndefinedElements(n);
            });
            additions.forEach(
                (node) => isCustomElement(node) && recordUndefinedElement(node)
            );
            additions.forEach((node) => checkImageSelectors(node));
        }
        function handleHugeTreeMutations(root) {
            const styles = new Set(getManageableStyles(root));
            const createdStyles = new Set();
            const removedStyles = new Set();
            const movedStyles = new Set();
            const prevStyles = getPrevStyles(root);
            styles.forEach((s) => {
                if (!prevStyles.has(s)) {
                    createdStyles.add(s);
                }
            });
            prevStyles.forEach((s) => {
                if (!styles.has(s)) {
                    removedStyles.add(s);
                }
            });
            styles.forEach((s) => {
                if (
                    !createdStyles.has(s) &&
                    !removedStyles.has(s) &&
                    didStylePositionChange(s)
                ) {
                    movedStyles.add(s);
                }
            });
            handleStyleOperations(root, {
                createdStyles,
                removedStyles,
                movedStyles
            });
            deepObserve(root);
            collectUndefinedElements(root);
            checkImageSelectors(root);
        }
        function handleAttributeMutations(mutations) {
            const updatedStyles = new Set();
            const removedStyles = new Set();
            mutations.forEach((m) => {
                const {target} = m;
                if (target.isConnected) {
                    if (shouldManageStyle(target)) {
                        updatedStyles.add(target);
                    } else if (
                        target instanceof HTMLLinkElement &&
                        target.disabled
                    ) {
                        removedStyles.add(target);
                    }
                }
            });
            if (updatedStyles.size + removedStyles.size > 0) {
                update({
                    updated: Array.from(updatedStyles),
                    created: [],
                    removed: Array.from(removedStyles),
                    moved: []
                });
            }
        }
        function observe(root) {
            if (observedRoots.has(root)) {
                return;
            }
            const treeObserver = createOptimizedTreeObserver(root, {
                onMinorMutations: handleMinorTreeMutations,
                onHugeMutations: handleHugeTreeMutations
            });
            const attrObserver = new MutationObserver(handleAttributeMutations);
            attrObserver.observe(root, {
                attributeFilter: ["rel", "disabled", "media", "href"],
                subtree: true
            });
            observers.push(treeObserver, attrObserver);
            observedRoots.add(root);
        }
        function subscribeForShadowRootChanges(node) {
            const {shadowRoot} = node;
            if (shadowRoot == null || observedRoots.has(shadowRoot)) {
                return;
            }
            observe(shadowRoot);
            shadowRootDiscovered(shadowRoot);
        }
        function deepObserve(node) {
            iterateShadowHosts(node, subscribeForShadowRootChanges);
        }
        observe(document);
        deepObserve(document.documentElement);
        watchWhenCustomElementsDefined((hosts) => {
            hosts = hosts.filter((node) => !handledShadowHosts.has(node));
            const newStyles = [];
            hosts.forEach((host) =>
                push(newStyles, getManageableStyles(host.shadowRoot))
            );
            update({created: newStyles, updated: [], removed: [], moved: []});
            hosts.forEach((host) => {
                const {shadowRoot} = host;
                if (shadowRoot == null) {
                    return;
                }
                subscribeForShadowRootChanges(host);
                deepObserve(shadowRoot);
                collectUndefinedElements(shadowRoot);
            });
            hosts.forEach((node) => handledShadowHosts.add(node));
        });
        document.addEventListener("__darkreader__isDefined", handleIsDefined);
        collectUndefinedElements(document);
    }
    function resetObservers() {
        observers.forEach((o) => o.disconnect());
        observers.splice(0, observers.length);
        observedRoots = new WeakSet();
        handledShadowHosts = new WeakSet();
    }
    function stopWatchingForStylePositions() {
        resetObservers();
        unsubscribeFromDefineCustomElements();
    }

    function watchForStyleChanges(currentStyles, update, shadowRootDiscovered) {
        watchForStylePositions(currentStyles, update, shadowRootDiscovered);
    }
    function stopWatchingForStyleChanges() {
        stopWatchingForStylePositions();
    }

    const INSTANCE_ID = generateUID();
    const styleManagers = new Map();
    const adoptedStyleManagers = [];
    const adoptedStyleFallbacks = new Map();
    const adoptedStyleChangeTokens = new WeakMap();
    let theme = null;
    let fixes = null;
    let isIFrame$1 = null;
    let ignoredImageAnalysisSelectors = [];
    let ignoredInlineSelectors = [];
    let staticStyleMap = new WeakMap();
    function createOrUpdateStyle(className, root = document.head || document) {
        let element = root.querySelector(`.${className}`);
        if (!staticStyleMap.has(root)) {
            staticStyleMap.set(root, new Map());
        }
        const classMap = staticStyleMap.get(root);
        if (element) {
            classMap.set(className, element);
        } else if (classMap.has(className)) {
            element = classMap.get(className);
        } else {
            element = document.createElement("style");
            element.classList.add("darkreader");
            element.classList.add(className);
            element.media = "screen";
            element.textContent = "";
            classMap.set(className, element);
        }
        return element;
    }
    function createOrUpdateScript(className, root = document.head || document) {
        let element = root.querySelector(`.${className}`);
        if (!element) {
            element = document.createElement("script");
            element.classList.add("darkreader");
            element.classList.add(className);
        }
        return element;
    }
    const nodePositionWatchers = new Map();
    function setupNodePositionWatcher(node, alias, callback) {
        nodePositionWatchers.has(alias) &&
            nodePositionWatchers.get(alias).stop();
        nodePositionWatchers.set(
            alias,
            watchForNodePosition(node, "head", callback)
        );
    }
    function stopStylePositionWatchers() {
        forEach(nodePositionWatchers.values(), (watcher) => watcher.stop());
        nodePositionWatchers.clear();
    }
    function injectStaticStyle(style, prevNode, watchAlias, callback) {
        const mode = getStyleInjectionMode();
        if (mode === "next") {
            document.head.insertBefore(
                style,
                prevNode ? prevNode.nextSibling : document.head.firstChild
            );
            setupNodePositionWatcher(style, watchAlias, callback);
        } else if (mode === "away") {
            injectStyleAway(style);
        }
    }
    function createStaticStyleOverrides() {
        const fallbackStyle = createOrUpdateStyle(
            "darkreader--fallback",
            document
        );
        fallbackStyle.textContent = getModifiedFallbackStyle(theme, {
            strict: true
        });
        injectStaticStyle(fallbackStyle, null, "fallback");
        const userAgentStyle = createOrUpdateStyle("darkreader--user-agent");
        userAgentStyle.textContent = getModifiedUserAgentStyle(
            theme,
            isIFrame$1,
            theme.styleSystemControls
        );
        injectStaticStyle(userAgentStyle, fallbackStyle, "user-agent");
        const textStyle = createOrUpdateStyle("darkreader--text");
        if (theme.useFont || theme.textStroke > 0) {
            textStyle.textContent = createTextStyle(theme);
        } else {
            textStyle.textContent = "";
        }
        injectStaticStyle(textStyle, userAgentStyle, "text");
        const invertStyle = createOrUpdateStyle("darkreader--invert");
        if (fixes && Array.isArray(fixes.invert) && fixes.invert.length > 0) {
            invertStyle.textContent = [
                `${fixes.invert.join(", ")} {`,
                `    filter: ${getCSSFilterValue({
                    ...theme,
                    contrast:
                        theme.mode === 0
                            ? theme.contrast
                            : clamp(theme.contrast - 10, 0, 100)
                })} !important;`,
                "}"
            ].join("\n");
        } else {
            invertStyle.textContent = "";
        }
        injectStaticStyle(invertStyle, textStyle, "invert");
        const inlineStyle = createOrUpdateStyle("darkreader--inline");
        inlineStyle.textContent = getInlineOverrideStyle();
        injectStaticStyle(inlineStyle, invertStyle, "inline");
        const variableStyle = createOrUpdateStyle("darkreader--variables");
        const selectionColors = theme?.selectionColor
            ? getSelectionColor(theme)
            : null;
        const neutralBackgroundColor = modifyBackgroundColor(
            parseColorWithCache("#ffffff"),
            theme
        );
        const neutralTextColor = modifyForegroundColor(
            parseColorWithCache("#000000"),
            theme
        );
        variableStyle.textContent = [
            `:root {`,
            `   --darkreader-neutral-background: ${neutralBackgroundColor};`,
            `   --darkreader-neutral-text: ${neutralTextColor};`,
            `   --darkreader-selection-background: ${selectionColors?.backgroundColorSelection ?? "initial"};`,
            `   --darkreader-selection-text: ${selectionColors?.foregroundColorSelection ?? "initial"};`,
            `}`
        ].join("\n");
        injectStaticStyle(variableStyle, inlineStyle, "variables", () =>
            registerVariablesSheet(variableStyle.sheet)
        );
        registerVariablesSheet(variableStyle.sheet);
        const rootVarsStyle = createOrUpdateStyle("darkreader--root-vars");
        injectStaticStyle(rootVarsStyle, variableStyle, "root-vars");
        const enableStyleSheetsProxy = !(
            fixes && fixes.disableStyleSheetsProxy
        );
        const enableCustomElementRegistryProxy = !(
            fixes && fixes.disableCustomElementRegistryProxy
        );
        document.dispatchEvent(new CustomEvent("__darkreader__cleanUp"));
        {
            const proxyScript = createOrUpdateScript("darkreader--proxy");
            proxyScript.append(
                `(${injectProxy})(${enableStyleSheetsProxy}, ${enableCustomElementRegistryProxy})`
            );
            document.head.insertBefore(proxyScript, rootVarsStyle.nextSibling);
            proxyScript.remove();
        }
        const overrideStyle = createOrUpdateStyle("darkreader--override");
        overrideStyle.textContent =
            fixes && fixes.css ? replaceCSSTemplates(fixes.css) : "";
        injectStaticStyle(overrideStyle, document.head.lastChild, "override");
    }
    const shadowRootsWithOverrides = new Set();
    function createShadowStaticStyleOverridesInner(root) {
        const inlineStyle = createOrUpdateStyle("darkreader--inline", root);
        inlineStyle.textContent = getInlineOverrideStyle();
        root.insertBefore(inlineStyle, root.firstChild);
        const overrideStyle = createOrUpdateStyle("darkreader--override", root);
        overrideStyle.textContent =
            fixes && fixes.css ? replaceCSSTemplates(fixes.css) : "";
        root.insertBefore(overrideStyle, inlineStyle.nextSibling);
        const invertStyle = createOrUpdateStyle("darkreader--invert", root);
        if (fixes && Array.isArray(fixes.invert) && fixes.invert.length > 0) {
            invertStyle.textContent = [
                `${fixes.invert.join(", ")} {`,
                `    filter: ${getCSSFilterValue({
                    ...theme,
                    contrast:
                        theme.mode === 0
                            ? theme.contrast
                            : clamp(theme.contrast - 10, 0, 100)
                })} !important;`,
                "}"
            ].join("\n");
        } else {
            invertStyle.textContent = "";
        }
        root.insertBefore(invertStyle, overrideStyle.nextSibling);
        shadowRootsWithOverrides.add(root);
    }
    function delayedCreateShadowStaticStyleOverrides(root) {
        const observer = new MutationObserver((mutations, observer) => {
            observer.disconnect();
            for (const {type, removedNodes} of mutations) {
                if (type === "childList") {
                    for (const {nodeName, className} of removedNodes) {
                        if (
                            nodeName === "STYLE" &&
                            [
                                "darkreader darkreader--inline",
                                "darkreader darkreader--override",
                                "darkreader darkreader--invert"
                            ].includes(className)
                        ) {
                            createShadowStaticStyleOverridesInner(root);
                            return;
                        }
                    }
                }
            }
        });
        observer.observe(root, {childList: true});
    }
    function createShadowStaticStyleOverrides(root) {
        const delayed = root.firstChild === null;
        createShadowStaticStyleOverridesInner(root);
        if (delayed) {
            delayedCreateShadowStaticStyleOverrides(root);
        }
    }
    function replaceCSSTemplates($cssText) {
        return $cssText.replace(/\${(.+?)}/g, (_, $color) => {
            const color = parseColorWithCache($color);
            if (color) {
                const lightness = getSRGBLightness(color.r, color.g, color.b);
                if (lightness > 0.5) {
                    return modifyBackgroundColor(color, theme);
                }
                return modifyForegroundColor(color, theme);
            }
            logWarn("Couldn't parse CSSTemplate's color.");
            return $color;
        });
    }
    function cleanFallbackStyle() {
        const fallback =
            staticStyleMap.get(document.head)?.get("darkreader--fallback") ||
            staticStyleMap.get(document)?.get("darkreader--fallback") ||
            document.querySelector(".darkreader--fallback");
        if (fallback) {
            fallback.textContent = "";
        }
    }
    function createDynamicStyleOverrides() {
        cancelRendering();
        const allStyles = getManageableStyles(document);
        const newManagers = allStyles
            .filter((style) => !styleManagers.has(style))
            .map((style) => createManager(style));
        newManagers
            .map((manager) => manager.details({secondRound: false}))
            .filter((detail) => detail && detail.rules.length > 0)
            .forEach((detail) => {
                variablesStore.addRulesForMatching(detail.rules);
            });
        variablesStore.matchVariablesAndDependents();
        variablesStore.setOnRootVariableChange(() => {
            const rootVarsStyle = createOrUpdateStyle("darkreader--root-vars");
            variablesStore.putRootVars(rootVarsStyle, theme);
        });
        const rootVarsStyle = createOrUpdateStyle("darkreader--root-vars");
        variablesStore.putRootVars(rootVarsStyle, theme);
        styleManagers.forEach((manager) =>
            manager.render(theme, ignoredImageAnalysisSelectors)
        );
        if (loadingStyles.size === 0) {
            cleanFallbackStyle();
        }
        newManagers.forEach((manager) => manager.watch());
        const inlineStyleElements = toArray(
            document.querySelectorAll(INLINE_STYLE_SELECTOR)
        );
        iterateShadowHosts(document.documentElement, (host) => {
            createShadowStaticStyleOverrides(host.shadowRoot);
            const elements = host.shadowRoot.querySelectorAll(
                INLINE_STYLE_SELECTOR
            );
            if (elements.length > 0) {
                push(inlineStyleElements, elements);
            }
        });
        inlineStyleElements.forEach((el) =>
            overrideInlineStyle(
                el,
                theme,
                ignoredInlineSelectors,
                ignoredImageAnalysisSelectors
            )
        );
        handleAdoptedStyleSheets(document);
        variablesStore.matchVariablesAndDependents();
        if (isFirefox) {
            const onAdoptedCssChange = (e) => {
                const {sheets} = e.detail;
                if (!Array.isArray(sheets) || sheets.length === 0) {
                    return;
                }
                sheets.forEach(({sheet}) => {
                    const {cssRules} = sheet;
                    variablesStore.addRulesForMatching(cssRules);
                });
                variablesStore.matchVariablesAndDependents();
                const response = [];
                sheets.forEach(({sheetId, sheet}) => {
                    const fallback = getAdoptedStyleSheetFallback(sheet);
                    const cssRules = sheet.cssRules;
                    fallback.render({
                        theme: theme,
                        ignoreImageAnalysis: ignoredImageAnalysisSelectors,
                        cssRules
                    });
                    const commands = fallback.commands();
                    response.push({sheetId, commands});
                });
                requestAnimationFrameOnce(
                    getAdoptedStyleChangeToken(sheets[0].sheet),
                    () => {
                        document.dispatchEvent(
                            new CustomEvent(
                                "__darkreader__adoptedStyleSheetCommands",
                                {detail: JSON.stringify(response)}
                            )
                        );
                    }
                );
            };
            document.addEventListener(
                "__darkreader__adoptedStyleSheetsChange",
                onAdoptedCssChange
            );
            cleaners.push(() =>
                document.removeEventListener(
                    "__darkreader__adoptedStyleSheetsChange",
                    onAdoptedCssChange
                )
            );
            document.dispatchEvent(
                new CustomEvent("__darkreader__startAdoptedStyleSheetsWatcher")
            );
        }
    }
    let loadingStylesCounter = 0;
    const loadingStyles = new Set();
    function createManager(element) {
        const loadingStyleId = ++loadingStylesCounter;
        function loadingStart() {
            if (!isDOMReady() || !documentIsVisible()) {
                loadingStyles.add(loadingStyleId);
                logInfo(
                    `Current amount of styles loading: ${loadingStyles.size}`
                );
                const fallbackStyle = createOrUpdateStyle(
                    "darkreader--fallback"
                );
                if (!fallbackStyle.textContent) {
                    fallbackStyle.textContent = getModifiedFallbackStyle(
                        theme,
                        {strict: false}
                    );
                }
            }
        }
        function loadingEnd() {
            loadingStyles.delete(loadingStyleId);
            logInfo(
                `Removed loadingStyle ${loadingStyleId}, now awaiting: ${loadingStyles.size}`
            );
            if (loadingStyles.size === 0 && isDOMReady()) {
                cleanFallbackStyle();
            }
        }
        function update() {
            const details = manager.details({secondRound: true});
            if (!details) {
                return;
            }
            variablesStore.addRulesForMatching(details.rules);
            variablesStore.matchVariablesAndDependents();
            manager.render(theme, ignoredImageAnalysisSelectors);
        }
        const manager = manageStyle(element, {
            update,
            loadingStart,
            loadingEnd
        });
        styleManagers.set(element, manager);
        return manager;
    }
    function removeManager(element) {
        const manager = styleManagers.get(element);
        if (manager) {
            manager.destroy();
            styleManagers.delete(element);
        }
    }
    const throttledRenderAllStyles = throttle((callback) => {
        styleManagers.forEach((manager) =>
            manager.render(theme, ignoredImageAnalysisSelectors)
        );
        adoptedStyleManagers.forEach((manager) =>
            manager.render(theme, ignoredImageAnalysisSelectors)
        );
        callback && callback();
    });
    const cancelRendering = function () {
        throttledRenderAllStyles.cancel();
    };
    function onDOMReady() {
        if (loadingStyles.size === 0) {
            cleanFallbackStyle();
            return;
        }
        logWarn(
            `DOM is ready, but still have styles being loaded.`,
            loadingStyles
        );
    }
    function runDynamicStyle() {
        createDynamicStyleOverrides();
        watchForUpdates();
    }
    function createThemeAndWatchForUpdates() {
        createStaticStyleOverrides();
        if (!documentIsVisible() && !theme.immediateModify) {
            setDocumentVisibilityListener(runDynamicStyle);
        } else {
            runDynamicStyle();
        }
        changeMetaThemeColorWhenAvailable(theme);
    }
    function handleAdoptedStyleSheets(node) {
        if (isFirefox) {
            return;
        }
        if (canHaveAdoptedStyleSheets(node)) {
            node.adoptedStyleSheets.forEach((s) => {
                variablesStore.addRulesForMatching(s.cssRules);
            });
            const newManger = createAdoptedStyleSheetOverride(node);
            adoptedStyleManagers.push(newManger);
            newManger.render(theme, ignoredImageAnalysisSelectors);
            newManger.watch((sheets) => {
                sheets.forEach((s) => {
                    variablesStore.addRulesForMatching(s.cssRules);
                });
                variablesStore.matchVariablesAndDependents();
                newManger.render(theme, ignoredImageAnalysisSelectors);
            });
        }
    }
    function getAdoptedStyleChangeToken(sheet) {
        if (adoptedStyleChangeTokens.has(sheet)) {
            return adoptedStyleChangeTokens.get(sheet);
        }
        const token = Symbol();
        adoptedStyleChangeTokens.set(sheet, token);
        return token;
    }
    function getAdoptedStyleSheetFallback(sheet) {
        let fallback = adoptedStyleFallbacks.get(sheet);
        if (!fallback) {
            fallback = createAdoptedStyleSheetFallback();
            adoptedStyleFallbacks.set(sheet, fallback);
        }
        return fallback;
    }
    function watchForUpdates() {
        const managedStyles = Array.from(styleManagers.keys());
        watchForStyleChanges(
            managedStyles,
            ({created, updated, removed, moved}) => {
                const stylesToRemove = removed;
                const stylesToManage = created
                    .concat(updated)
                    .concat(moved)
                    .filter((style) => !styleManagers.has(style));
                const stylesToRestore = moved.filter((style) =>
                    styleManagers.has(style)
                );
                stylesToRemove.forEach((style) => removeManager(style));
                const newManagers = stylesToManage.map((style) =>
                    createManager(style)
                );
                newManagers
                    .map((manager) => manager.details({secondRound: false}))
                    .filter((detail) => detail && detail.rules.length > 0)
                    .forEach((detail) => {
                        variablesStore.addRulesForMatching(detail.rules);
                    });
                variablesStore.matchVariablesAndDependents();
                newManagers.forEach((manager) =>
                    manager.render(theme, ignoredImageAnalysisSelectors)
                );
                newManagers.forEach((manager) => manager.watch());
                stylesToRestore.forEach((style) =>
                    styleManagers.get(style).restore()
                );
            },
            (shadowRoot) => {
                createShadowStaticStyleOverrides(shadowRoot);
                handleAdoptedStyleSheets(shadowRoot);
            }
        );
        watchForInlineStyles(
            (element) => {
                overrideInlineStyle(
                    element,
                    theme,
                    ignoredInlineSelectors,
                    ignoredImageAnalysisSelectors
                );
                if (element === document.documentElement) {
                    const styleAttr = element.getAttribute("style") || "";
                    if (styleAttr.includes("--")) {
                        variablesStore.matchVariablesAndDependents();
                        const rootVarsStyle = createOrUpdateStyle(
                            "darkreader--root-vars"
                        );
                        variablesStore.putRootVars(rootVarsStyle, theme);
                    }
                }
            },
            (root) => {
                createShadowStaticStyleOverrides(root);
                const inlineStyleElements = root.querySelectorAll(
                    INLINE_STYLE_SELECTOR
                );
                if (inlineStyleElements.length > 0) {
                    forEach(inlineStyleElements, (el) =>
                        overrideInlineStyle(
                            el,
                            theme,
                            ignoredInlineSelectors,
                            ignoredImageAnalysisSelectors
                        )
                    );
                }
            }
        );
        addDOMReadyListener(onDOMReady);
    }
    function stopWatchingForUpdates() {
        styleManagers.forEach((manager) => manager.pause());
        stopStylePositionWatchers();
        stopWatchingForStyleChanges();
        stopWatchingForInlineStyles();
        removeDOMReadyListener(onDOMReady);
        cleanReadyStateCompleteListeners();
    }
    let metaObserver;
    let headObserver = null;
    function addMetaListener() {
        metaObserver = new MutationObserver(() => {
            if (document.querySelector('meta[name="darkreader-lock"]')) {
                metaObserver.disconnect();
                removeDynamicTheme();
            }
        });
        metaObserver.observe(document.head, {childList: true, subtree: true});
    }
    function createDarkReaderInstanceMarker() {
        const metaElement = document.createElement("meta");
        metaElement.name = "darkreader";
        metaElement.content = INSTANCE_ID;
        document.head.appendChild(metaElement);
    }
    function isDRLocked() {
        return document.querySelector('meta[name="darkreader-lock"]') != null;
    }
    function isAnotherDarkReaderInstanceActive() {
        const meta = document.querySelector('meta[name="darkreader"]');
        if (meta) {
            if (meta.content !== INSTANCE_ID) {
                return true;
            }
            return false;
        }
        createDarkReaderInstanceMarker();
        addMetaListener();
        return false;
    }
    let interceptorAttempts = 2;
    function interceptOldScript({success, failure}) {
        if (--interceptorAttempts <= 0) {
            failure();
            return;
        }
        const oldMeta = document.head.querySelector('meta[name="darkreader"]');
        if (!oldMeta || oldMeta.content === INSTANCE_ID) {
            return;
        }
        const lock = document.createElement("meta");
        lock.name = "darkreader-lock";
        document.head.append(lock);
        queueMicrotask(() => {
            lock.remove();
            success();
        });
    }
    function disableConflictingPlugins() {
        if (document.documentElement.hasAttribute("data-wp-dark-mode-preset")) {
            const disableWPDarkMode = () => {
                document.dispatchEvent(
                    new CustomEvent("__darkreader__disableConflictingPlugins")
                );
                document.documentElement.classList.remove(
                    "wp-dark-mode-active"
                );
                document.documentElement.removeAttribute(
                    "data-wp-dark-mode-active"
                );
            };
            disableWPDarkMode();
            const observer = new MutationObserver(() => {
                if (
                    document.documentElement.classList.contains(
                        "wp-dark-mode-active"
                    ) ||
                    document.documentElement.hasAttribute(
                        "data-wp-dark-mode-active"
                    )
                ) {
                    disableWPDarkMode();
                }
            });
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class", "data-wp-dark-mode-active"]
            });
        }
    }
    let prevTheme = null;
    let prevFixes = null;
    function createOrUpdateDynamicThemeInternal(
        themeConfig,
        dynamicThemeFixes,
        iframe
    ) {
        theme = themeConfig;
        fixes = dynamicThemeFixes;
        const colorAffectingKeys = [
            "brightness",
            "contrast",
            "darkSchemeBackgroundColor",
            "darkSchemeTextColor",
            "grayscale",
            "lightSchemeBackgroundColor",
            "lightSchemeTextColor",
            "sepia"
        ];
        if (prevTheme && prevFixes) {
            const themeKeys = new Set([
                ...Object.keys(theme),
                ...Object.keys(prevTheme)
            ]);
            let onlyColorsChanged = true;
            for (const key of themeKeys) {
                if (
                    theme[key] !== prevTheme[key] &&
                    !colorAffectingKeys.includes(key)
                ) {
                    onlyColorsChanged = false;
                    break;
                }
            }
            if (
                onlyColorsChanged &&
                JSON.stringify(fixes) !== JSON.stringify(prevFixes)
            ) {
                onlyColorsChanged = false;
            }
            if (onlyColorsChanged) {
                const palette = getColorPalette();
                clearColorPalette();
                palette.background.forEach((color) =>
                    modifyBackgroundColor(color, theme)
                );
                palette.text.forEach((color) =>
                    modifyForegroundColor(color, theme)
                );
                palette.border.forEach((color) =>
                    modifyBorderColor(color, theme)
                );
                return;
            }
            clearColorPalette();
        }
        if (fixes) {
            ignoredImageAnalysisSelectors = Array.isArray(
                fixes.ignoreImageAnalysis
            )
                ? fixes.ignoreImageAnalysis
                : [];
            ignoredInlineSelectors = Array.isArray(fixes.ignoreInlineStyle)
                ? fixes.ignoreInlineStyle
                : [];
        } else {
            ignoredImageAnalysisSelectors = [];
            ignoredInlineSelectors = [];
        }
        if (theme.immediateModify) {
            setIsDOMReady(() => {
                return true;
            });
        }
        isIFrame$1 = iframe;
        const ready = () => {
            const success = () => {
                disableConflictingPlugins();
                document.documentElement.setAttribute(
                    "data-darkreader-mode",
                    "dynamic"
                );
                document.documentElement.setAttribute(
                    "data-darkreader-scheme",
                    theme.mode ? "dark" : "dimmed"
                );
                createThemeAndWatchForUpdates();
            };
            const failure = () => {
                removeDynamicTheme();
            };
            if (isDRLocked()) {
                removeNode(document.querySelector(".darkreader--fallback"));
            } else if (isAnotherDarkReaderInstanceActive()) {
                interceptOldScript({
                    success,
                    failure
                });
            } else {
                success();
            }
        };
        if (document.head) {
            ready();
        } else {
            if (!isFirefox) {
                const fallbackStyle = createOrUpdateStyle(
                    "darkreader--fallback"
                );
                document.documentElement.appendChild(fallbackStyle);
                fallbackStyle.textContent = getModifiedFallbackStyle(theme, {
                    strict: true
                });
            }
            headObserver?.disconnect();
            headObserver = new MutationObserver(() => {
                if (document.head) {
                    headObserver?.disconnect();
                    ready();
                }
            });
            cleaners.push(() => {
                headObserver?.disconnect();
                headObserver = null;
            });
            headObserver.observe(document, {childList: true, subtree: true});
        }
        prevTheme = theme;
        prevFixes = fixes;
    }
    function removeProxy() {
        document.dispatchEvent(new CustomEvent("__darkreader__cleanUp"));
        removeNode(document.head.querySelector(".darkreader--proxy"));
    }
    const cleaners = [];
    function removeDynamicTheme() {
        document.documentElement.removeAttribute(`data-darkreader-mode`);
        document.documentElement.removeAttribute(`data-darkreader-scheme`);
        cleanDynamicThemeCache();
        removeNode(document.querySelector(".darkreader--fallback"));
        if (document.head) {
            const selectors = [
                ".darkreader--user-agent",
                ".darkreader--text",
                ".darkreader--invert",
                ".darkreader--inline",
                ".darkreader--override",
                ".darkreader--variables",
                ".darkreader--root-vars",
                'meta[name="darkreader"]'
            ];
            restoreMetaThemeColor();
            selectors.forEach((selector) =>
                removeNode(document.head.querySelector(selector))
            );
            staticStyleMap = new WeakMap();
            removeProxy();
        }
        shadowRootsWithOverrides.forEach((root) => {
            removeNode(root.querySelector(".darkreader--inline"));
            removeNode(root.querySelector(".darkreader--override"));
        });
        shadowRootsWithOverrides.clear();
        forEach(styleManagers.keys(), (el) => removeManager(el));
        loadingStyles.clear();
        cleanLoadingLinks();
        forEach(document.querySelectorAll(".darkreader"), removeNode);
        adoptedStyleManagers.forEach((manager) => manager.destroy());
        adoptedStyleManagers.splice(0);
        adoptedStyleFallbacks.forEach((fallback) => fallback.destroy());
        adoptedStyleFallbacks.clear();
        metaObserver && metaObserver.disconnect();
        cleaners.forEach((clean) => clean());
        cleaners.splice(0);
    }
    function cleanDynamicThemeCache() {
        variablesStore.clear();
        parsedURLCache.clear();
        removeDocumentVisibilityListener();
        cancelRendering();
        stopWatchingForUpdates();
        cleanModificationCache();
        clearColorCache();
        releaseVariablesSheet();
        prevTheme = null;
        prevFixes = null;
    }

    function parseCSS(cssText) {
        cssText = removeCSSComments(cssText);
        cssText = cssText.trim();
        if (!cssText) {
            return [];
        }
        const rules = [];
        const excludeRanges = getTokenExclusionRanges(cssText);
        const bracketRanges = getAllOpenCloseRanges(
            cssText,
            "{",
            "}",
            excludeRanges
        );
        let ruleStart = 0;
        bracketRanges.forEach((brackets) => {
            const key = cssText.substring(ruleStart, brackets.start).trim();
            const content = cssText.substring(
                brackets.start + 1,
                brackets.end - 1
            );
            if (key.startsWith("@")) {
                const typeEndIndex = key.search(/[\s\(]/);
                const rule = {
                    type:
                        typeEndIndex < 0 ? key : key.substring(0, typeEndIndex),
                    query:
                        typeEndIndex < 0
                            ? ""
                            : key.substring(typeEndIndex).trim(),
                    rules: parseCSS(content)
                };
                rules.push(rule);
            } else {
                const rule = {
                    selectors: parseSelectors(key),
                    declarations: parseDeclarations(content)
                };
                rules.push(rule);
            }
            ruleStart = brackets.end;
        });
        return rules;
    }
    function getAllOpenCloseRanges(
        input,
        openToken,
        closeToken,
        excludeRanges = []
    ) {
        const ranges = [];
        let i = 0;
        let range;
        while (
            (range = getOpenCloseRange(
                input,
                i,
                openToken,
                closeToken,
                excludeRanges
            ))
        ) {
            ranges.push(range);
            i = range.end;
        }
        return ranges;
    }
    function getTokenExclusionRanges(cssText) {
        const singleQuoteGoesFirst =
            cssText.indexOf("'") < cssText.indexOf('"');
        const firstQuote = singleQuoteGoesFirst ? "'" : '"';
        const secondQuote = singleQuoteGoesFirst ? '"' : "'";
        const excludeRanges = getAllOpenCloseRanges(
            cssText,
            firstQuote,
            firstQuote
        );
        excludeRanges.push(
            ...getAllOpenCloseRanges(
                cssText,
                secondQuote,
                secondQuote,
                excludeRanges
            )
        );
        excludeRanges.push(
            ...getAllOpenCloseRanges(cssText, "[", "]", excludeRanges)
        );
        excludeRanges.push(
            ...getAllOpenCloseRanges(cssText, "(", ")", excludeRanges)
        );
        return excludeRanges;
    }
    function parseSelectors(selectorText) {
        const excludeRanges = getTokenExclusionRanges(selectorText);
        return splitExcluding(selectorText, ",", excludeRanges);
    }
    function parseDeclarations(cssDeclarationsText) {
        const declarations = [];
        const excludeRanges = getTokenExclusionRanges(cssDeclarationsText);
        splitExcluding(cssDeclarationsText, ";", excludeRanges).forEach(
            (part) => {
                const colonIndex = part.indexOf(":");
                if (colonIndex > 0) {
                    const importantIndex = part.indexOf("!important");
                    declarations.push({
                        property: part.substring(0, colonIndex).trim(),
                        value: part
                            .substring(
                                colonIndex + 1,
                                importantIndex > 0
                                    ? importantIndex
                                    : part.length
                            )
                            .trim(),
                        important: importantIndex > 0
                    });
                }
            }
        );
        return declarations;
    }
    function isParsedStyleRule(rule) {
        return "selectors" in rule;
    }

    function formatCSS(cssText) {
        const parsed = parseCSS(cssText);
        return formatParsedCSS(parsed);
    }
    function formatParsedCSS(parsed) {
        const lines = [];
        const tab = "    ";
        function formatRule(rule, indent) {
            if (isParsedStyleRule(rule)) {
                formatStyleRule(rule, indent);
            } else {
                formatAtRule(rule, indent);
            }
        }
        function formatAtRule({type, query, rules}, indent) {
            lines.push(`${indent}${type} ${query} {`);
            rules.forEach((child) => formatRule(child, `${indent}${tab}`));
            lines.push(`${indent}}`);
        }
        function formatStyleRule({selectors, declarations}, indent) {
            const lastSelectorIndex = selectors.length - 1;
            selectors.forEach((selector, i) => {
                lines.push(
                    `${indent}${selector}${i < lastSelectorIndex ? "," : " {"}`
                );
            });
            const sorted = sortDeclarations(declarations);
            sorted.forEach(({property, value, important}) => {
                lines.push(
                    `${indent}${tab}${property}: ${value}${important ? " !important" : ""};`
                );
            });
            lines.push(`${indent}}`);
        }
        clearEmptyRules(parsed);
        parsed.forEach((rule) => formatRule(rule, ""));
        return lines.join("\n");
    }
    function sortDeclarations(declarations) {
        const prefixRegex = /^-[a-z]-/;
        return [...declarations].sort((a, b) => {
            const aProp = a.property;
            const bProp = b.property;
            const aPrefix = aProp.match(prefixRegex)?.[0] ?? "";
            const bPrefix = bProp.match(prefixRegex)?.[0] ?? "";
            const aNorm = aPrefix ? aProp.replace(prefixRegex, "") : aProp;
            const bNorm = bPrefix ? bProp.replace(prefixRegex, "") : bProp;
            if (aNorm === bNorm) {
                return aPrefix.localeCompare(bPrefix);
            }
            return aNorm.localeCompare(bNorm);
        });
    }
    function clearEmptyRules(rules) {
        for (let i = rules.length - 1; i >= 0; i--) {
            const rule = rules[i];
            if (isParsedStyleRule(rule)) {
                if (rule.declarations.length === 0) {
                    rules.splice(i, 1);
                }
            } else {
                clearEmptyRules(rule.rules);
                if (rule.rules.length === 0) {
                    rules.splice(i, 1);
                }
            }
        }
    }

    const blobRegex = /url\(\"(blob\:.*?)\"\)/g;
    async function replaceBlobs(text) {
        const promises = [];
        getMatches(blobRegex, text, 1).forEach((url) => {
            const promise = loadAsDataURL(url);
            promises.push(promise);
        });
        const data = await Promise.all(promises);
        return text.replace(blobRegex, () => `url("${data.shift()}")`);
    }
    const banner = `/*
                        _______
                       /       \\
                      .==.    .==.
                     ((  ))==((  ))
                    / "=="    "=="\\
                   /____|| || ||___\\
       ________     ____    ________  ___    ___
       |  ___  \\   /    \\   |  ___  \\ |  |  /  /
       |  |  \\  \\ /  /\\  \\  |  |  \\  \\|  |_/  /
       |  |   )  /  /__\\  \\ |  |__/  /|  ___  \\
       |  |__/  /  ______  \\|  ____  \\|  |  \\  \\
_______|_______/__/ ____ \\__\\__|___\\__\\__|___\\__\\____
|  ___  \\ |  ____/ /    \\   |  ___  \\ |  ____|  ___  \\
|  |  \\  \\|  |___ /  /\\  \\  |  |  \\  \\|  |___|  |  \\  \\
|  |__/  /|  ____/  /__\\  \\ |  |   )  |  ____|  |__/  /
|  ____  \\|  |__/  ______  \\|  |__/  /|  |___|  ____  \\
|__|   \\__\\____/__/      \\__\\_______/ |______|__|   \\__\\
                https://darkreader.org
*/

/*! Dark reader generated CSS | Licensed under MIT https://github.com/darkreader/darkreader/blob/main/LICENSE */
`;
    async function collectCSS() {
        const css = [banner];
        function addStaticCSS(selector, comment) {
            const staticStyle = document.querySelector(selector);
            if (staticStyle && staticStyle.textContent) {
                css.push(`/* ${comment} */`);
                css.push(staticStyle.textContent);
                css.push("");
            }
        }
        addStaticCSS(".darkreader--fallback", "Fallback Style");
        addStaticCSS(".darkreader--user-agent", "User-Agent Style");
        addStaticCSS(".darkreader--text", "Text Style");
        addStaticCSS(".darkreader--invert", "Invert Style");
        addStaticCSS(".darkreader--variables", "Variables Style");
        const modifiedCSS = [];
        document.querySelectorAll(".darkreader--sync").forEach((element) => {
            forEach(element.sheet.cssRules, (rule) => {
                rule && rule.cssText && modifiedCSS.push(rule.cssText);
            });
        });
        if (modifiedCSS.length) {
            const formattedCSS = formatCSS(modifiedCSS.join("\n"));
            css.push("/* Modified CSS */");
            css.push(await replaceBlobs(formattedCSS));
            css.push("");
        }
        addStaticCSS(".darkreader--override", "Override Style");
        return css.join("\n");
    }

    let isDarkReaderEnabled = false;
    const isIFrame = (() => {
        try {
            return window.self !== window.top;
        } catch (err) {
            console.warn(err);
            return true;
        }
    })();
    function enable(themeOptions = {}, fixes = null) {
        const theme = {...DEFAULT_THEME, ...themeOptions};
        if (theme.engine !== ThemeEngine.dynamicTheme) {
            throw new Error("Theme engine is not supported.");
        }
        createOrUpdateDynamicThemeInternal(theme, fixes, isIFrame);
        isDarkReaderEnabled = true;
    }
    function isEnabled() {
        return isDarkReaderEnabled;
    }
    function disable() {
        removeDynamicTheme();
        isDarkReaderEnabled = false;
    }
    const darkScheme =
        typeof matchMedia === "function"
            ? matchMedia("(prefers-color-scheme: dark)")
            : undefined;
    let store = {
        themeOptions: null,
        fixes: null
    };
    function handleColorScheme() {
        if (darkScheme?.matches) {
            enable(store.themeOptions, store.fixes);
        } else {
            disable();
        }
    }
    function auto(themeOptions = {}, fixes = null) {
        if (themeOptions) {
            store = {themeOptions, fixes};
            handleColorScheme();
            if (isMatchMediaChangeEventListenerSupported) {
                darkScheme?.addEventListener("change", handleColorScheme);
            } else {
                darkScheme?.addListener(handleColorScheme);
            }
        } else {
            if (isMatchMediaChangeEventListenerSupported) {
                darkScheme?.removeEventListener("change", handleColorScheme);
            } else {
                darkScheme?.removeListener(handleColorScheme);
            }
            disable();
        }
    }
    async function exportGeneratedCSS() {
        return await collectCSS();
    }
    const setFetchMethod = setFetchMethod$1;

    exports.auto = auto;
    exports.disable = disable;
    exports.enable = enable;
    exports.exportGeneratedCSS = exportGeneratedCSS;
    exports.isEnabled = isEnabled;
    exports.setFetchMethod = setFetchMethod;

    Object.defineProperty(exports, "__esModule", {value: true});
});
