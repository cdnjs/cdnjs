/**
 * Sencha Blink
 * @author Jacky Nguyen <jacky@sencha.com>
 */
(function(global) {
    var emptyFn = function(){},
        callbacks = [],
        doc = global.document,
        head = doc.head || doc.getElementsByTagName('head')[0],
        addWindowListener = global.addEventListener,
        removeWindowListener = global.removeEventListener,
        jsonParse = JSON.parse,
        a = doc.createElement('a'),
        documentLocation = doc.location,
        documentUri = documentLocation.protocol + '//' + documentLocation.hostname + documentLocation.pathname + documentLocation.search,
        manifestFile = 'app.json',
        isRefreshing = false,
        activeManifest, appCache, storage;

    try {
        storage = global.localStorage;
        appCache = global.applicationCache;
    }
    catch(e) {}

    function getManifestStorageKey(id) {
        return id + '-' + documentUri + manifestFile;
    }

    function Manifest(manifest) {
        var manifestContent;

        if (typeof manifest == 'string') {
            manifestContent = manifest;
            manifest = jsonParse(manifestContent);
        }
        else {
            manifestContent = JSON.stringify(manifest);
        }

        var applicationId = manifest.id,
            key = getManifestStorageKey(applicationId),
            assetMap = {};

        function processAsset(asset) {
            var uri;

            if (typeof asset == 'string') {
                asset = {
                    path: asset
                };
            }

            if (asset.shared) {
                asset.version = asset.shared;
                uri = asset.shared + asset.path;
            }
            else {
                uri = toAbsoluteUri(asset.path);
            }

            asset.uri = uri;
            asset.key = applicationId + '-' + uri;
            assetMap[uri] = asset;

            return asset;
        }

        function processAssets(assets, type) {
            var ln = assets.length,
                i, asset;

            for (i = 0; i < ln; i++) {
                asset = assets[i];

                assets[i] = asset = processAsset(asset);

                asset.type = type;
                asset.index = i;
                asset.collection = assets;
                asset.ready = false;
                asset.evaluated = false;
            }

            return assets;
        }

        this.key = key;
        this.css = processAssets(manifest.css, 'css');
        this.js = processAssets(manifest.js, 'js');

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

        this.css = this.css.filter(function(css) {
            var platform = css.platform,
                exclude = css.exclude;

            css.type = "css";

            if (platform) {
                if (filterPlatform(platform) && !filterPlatform(exclude)) {
                    if(!Ext.theme) {
                        Ext.theme = {};
                    }
                    if(!Ext.theme.name) {
                        Ext.theme.name = css.theme || 'Default';
                    }
                    return true;
                }
                css.filtered = true;
                return false;
            }
            return true;
        });

        this.js = this.js.filter(function(js) {
            var platform = js.platform,
                exclude = js.exclude;

            js.type = "js";

            if (platform) {
                if (filterPlatform(platform) && !filterPlatform(exclude)) {
                    return true;
                }
                else {
                    js.filtered = true;
                    return false;
                }
            }
            return true;
        });

        this.assets = this.css.concat(this.js);
        this.getAsset = function(uri) {
            return assetMap[uri];
        };
        this.store = function() {
            store(key, manifestContent);
        };
    }

    if (typeof global.Ext === 'undefined') {
        var Ext = global.Ext = {};
    }

    function toAbsoluteUri(uri) {
        a.href = uri;
        return a.href;
    }

    function addMeta(name, content) {
        var meta = document.createElement('meta');

        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        head.appendChild(meta);
    }

    function request(uri, isShared, onSuccess, onFailure) {
        (isShared ? requestIframe : requestXhr)(uri, onSuccess, onFailure);
    }

    function requestXhr(uri, onSuccess, onFailure) {
        var xhr = new XMLHttpRequest();

        onFailure = onFailure || emptyFn;

        uri = uri + ((uri.indexOf('?') == -1) ? '?' : '&') + Date.now();

        try {
            xhr.open('GET', uri, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var status = xhr.status,
                        content = xhr.responseText;

                    if ((status >= 200 && status < 300) || status == 304 || (status == 0 && content.length > 0)) {
                        onSuccess(content);
                    }
                    else {
                        onFailure();
                    }
                }
            };
            xhr.send(null);
        } catch (e) {
            onFailure();
        }
    }

    function requestIframe(uri, onSuccess) {
        var iframe = doc.createElement('iframe');

        callbacks.push({
            iframe: iframe,
            callback: onSuccess
        });

        iframe.src = uri + '.html';
        iframe.style.cssText = 'width:0;height:0;border:0;position:absolute;z-index:-999;visibility:hidden';
        doc.body.appendChild(iframe);
    }

    // for remote assets, inject a script element
    function addRemoteScript(uri, onSuccess, onFailure) {
        var script = document.createElement('script');
        script.src = uri;
        script.type = "text/javascript";
        script.charset = "UTF-8";

        script.onerror = onFailure;

        if ('addEventListener' in script ) {
            script.onload = onSuccess;
        } else if ('readyState' in script) {
            script.onreadystatechange = function() {
                if (this.readyState === 'loaded' ||
                    this.readyState === 'complete') {
                    onSuccess();
                }
            };
        } else {
            script.onload = onSuccess;
        }

        head.appendChild(script);
    }

    function addRemoteLink(uri) {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = uri;
        head.appendChild(link);
    }

    function requestAsset(asset, onSuccess, onFailure) {
        var isRemote = !!asset.remote,
            isShared = !!asset.shared;

        if (isRemote) {
            if(asset.type === "js") {
                addRemoteScript(asset.uri, function(){
                    onSuccess('');
                }, onFailure);
            } else {
                addRemoteLink(asset.uri);
                onSuccess('');
            }
            return;
        }

        if (!isShared && asset.version && asset.version.length) {
            var onRequestSuccess = onSuccess,
                version = asset.version,
                versionLn = version.length,
                checksumFail, checksumType;

            onSuccess = function(content) {
                checksumType = content.substring(0, 1);
                if (checksumType == '/') {
                    if (content.substring(2, versionLn + 2) !== version) {
                        checksumFail = true;
                    }
                }
                else if (checksumType == 'f') {
                    if (content.substring(10, versionLn + 10) !== version) {
                        checksumFail = true;
                    }
                }
                else if (checksumType == '.') {
                    if (content.substring(1, versionLn + 1) !== version) {
                        checksumFail = true;
                    }
                }
                if (checksumFail === true) {
                    if (confirm("Requested: '" + asset.uri + " seems to have been changed. Attempt to refresh the application?")) {
                        refresh();
                    }
                    return;
                }
                onRequestSuccess(content);
            };
        }

        request(asset.uri, isShared, onSuccess, onFailure);
    }

    function onMessage(e) {
        var data = e.data,
            sourceWindow = e.source.window,
            i, ln, callback, iframe;

        for (i = 0, ln = callbacks.length; i < ln; i++) {
            callback = callbacks[i];
            iframe = callback.iframe;

            if (iframe.contentWindow === sourceWindow) {
                callback.callback(data);
                doc.body.removeChild(iframe);
                callbacks.splice(i, 1);
                return;
            }
        }
    }

    function patch(content, delta) {
        var output = [],
            chunk, i, ln;

        if (delta.length === 0) {
            return content;
        }

        for (i = 0,ln = delta.length; i < ln; i++) {
            chunk = delta[i];

            if (typeof chunk === 'number') {
                output.push(content.substring(chunk, chunk + delta[++i]));
            }
            else {
                output.push(chunk);
            }
        }

        return output.join('');
    }

    function log(message) {
        if (typeof console != 'undefined') {
            (console.error || console.log).call(console, message);
        }
    }

    function store(key, value) {
        try {
            storage.setItem(key, value);
        }
        catch (e) {
            if (storage && e.code == e.QUOTA_EXCEEDED_ERR && activeManifest) {
                log("LocalStorage Quota exceeded, cannot store " + key + " locally");
                // Quota exceeded, clean up unused items
//                var items = activeManifest.assets.map(function(asset) {
//                        return asset.key;
//                    }),
//                    i = 0,
//                    ln = storage.length,
//                    cleaned = false,
//                    item;
//
//                items.push(activeManifest.key);
//
//                while (i <= ln - 1) {
//                    item = storage.key(i);
//
//                    if (items.indexOf(item) == -1) {
//                        storage.removeItem(item);
//                        cleaned = true;
//                        ln--;
//                    }
//                    else {
//                        i++;
//                    }
//                }

                // Done cleaning up, attempt to store the value again
                // If there's still not enough space, no other choice
                // but to skip this item from being stored
//                if (cleaned) {
//                    store(key, value);
//                }
            }
        }
    }

    function retrieve(key) {
        try {
            return storage.getItem(key);
        }
        catch (e) {
            // Private browsing mode
            return null;
        }
    }

    function retrieveAsset(asset) {
        return retrieve(asset.key);
    }

    function storeAsset(asset, content) {
        return store(asset.key, content);
    }

    function refresh() {
        if (!isRefreshing) {
            isRefreshing = true;
            requestXhr(manifestFile, function(content) {
                new Manifest(content).store();
                global.location.reload();
            });
        }
    }

    function blink(currentManifest) {
        var currentAssets = currentManifest.assets,
            assetsCount = currentAssets.length,
            newManifest;

        activeManifest = currentManifest;

        addWindowListener('message', onMessage, false);

        function onAssetReady(asset, content) {
            var assets = asset.collection,
                index = asset.index,
                ln = assets.length,
                i;

            asset.ready = true;
            asset.content = content;

            for (i = index - 1; i >= 0; i--) {
                asset = assets[i];
                if (!asset.filtered && (!asset.ready || !asset.evaluated)) {
                    return;
                }
            }

            for (i = index; i < ln; i++) {
                asset = assets[i];
                if (asset.ready) {
                    if (!asset.evaluated) {
                        evaluateAsset(asset);
                    }
                }
                else {
                    return;
                }
            }
        }

        function evaluateAsset(asset) {
            asset.evaluated = true;

            if (asset.type == 'js') {
                try {
                    eval(asset.content);
                }
                catch (e) {
                    log("Error evaluating " + asset.uri + " with message: " + e);
                }
            }
            else {
                var style = doc.createElement('style'),
                    base;

                style.type = 'text/css';
                style.textContent = asset.content;

                if ('id' in asset) {
                    style.id = asset.id;
                }

                if ('disabled' in asset) {
                    style.disabled = asset.disabled;
                }

                base = document.createElement('base');
                base.href = asset.path.replace(/\/[^\/]*$/, '/');
                head.appendChild(base);
                head.appendChild(style);
                head.removeChild(base);
            }

            delete asset.content;

            if (--assetsCount == 0) {
                onReady();
            }
        }

        function onReady() {
            var updatingAssets = [],
                appCacheReady = false,
                onAppCacheIdle = function() {},
                onAppCacheReady = function() {
                    appCache.swapCache();
                    appCacheReady = true;
                    onAppCacheIdle();
                },
                updatingCount;

            removeWindowListener('message', onMessage, false);

            if (appCache.status == appCache.UPDATEREADY) {
                onAppCacheReady();
            }
            else if (appCache.status == appCache.CHECKING || appCache.status == appCache.DOWNLOADING) {
                appCache.onupdateready = onAppCacheReady;
                appCache.onnoupdate = appCache.onobsolete = function() {
                    onAppCacheIdle();
                };
            }

            function notifyUpdateIfAppCacheReady() {
                if (appCacheReady) {
                    notifyUpdate();
                }
            }

            function notifyUpdate() {
                var updatedCallback = Ext.onUpdated || emptyFn;

                if ('onSetup' in Ext) {
                    Ext.onSetup(updatedCallback);
                }
                else {
                    updatedCallback();
                }
            }

            function doUpdate() {
                newManifest.store();

                updatingAssets.forEach(function(asset) {
                    storeAsset(asset, asset.content);
                });

                notifyUpdate();
            }

            function onAssetUpdated(asset, content) {
                asset.content = content;

                if (--updatingCount == 0) {
                    if (appCache.status == appCache.IDLE) {
                        doUpdate();
                    }
                    else {
                        onAppCacheIdle = doUpdate;
                    }
                }
            }

            function checkForUpdate() {
                removeWindowListener('online', checkForUpdate, false);
                requestXhr(manifestFile, function(manifestContent) {
                    activeManifest = newManifest = new Manifest(manifestContent);

                    var assets = newManifest.assets,
                        currentAsset;

                    assets.forEach(function(asset) {
                        currentAsset = currentManifest.getAsset(asset.uri);

                        if (!currentAsset || asset.version !== currentAsset.version) {
                            updatingAssets.push(asset);
                        }
                    });

                    updatingCount = updatingAssets.length;

                    if (updatingCount == 0) {
                        if (appCache.status == appCache.IDLE) {
                            notifyUpdateIfAppCacheReady();
                        }
                        else {
                            onAppCacheIdle = notifyUpdateIfAppCacheReady;
                        }
                        return;
                    }

                    updatingAssets.forEach(function(asset) {
                        var currentAsset = currentManifest.getAsset(asset.uri),
                            path = asset.path,
                            update = asset.update;

                        function updateFull() {
                            requestAsset(asset, function(content) {
                                onAssetUpdated(asset, content);
                            });
                        }

                        // New asset (never used before)
                        // OR Shared from CDN
                        // OR Missing local storage
                        // OR Full update
                        if (!currentAsset || !update || retrieveAsset(asset) === null || update != 'delta') {
                            updateFull();
                        }
                        else {
                            requestXhr('deltas/' + path + '/' + currentAsset.version + '.json',
                                function(content) {
                                    try {
                                        onAssetUpdated(asset, patch(retrieveAsset(asset), jsonParse(content)));
                                    }
                                    catch (e) {
                                        log("Malformed delta content received for " + asset.uri);
                                    }
                                },
                                updateFull
                            );
                        }
                    })
                });
            }

            if (navigator.onLine !== false) {
                checkForUpdate();
            }
            else {
                addWindowListener('online', checkForUpdate, false);
            }
        }

        if (assetsCount == 0) {
            onReady();
            return;
        }

        currentAssets.forEach(function(asset) {
            var content = retrieveAsset(asset);

            if (content === null) {
                requestAsset(asset, function(content) {
                    if (!asset.remote) {
                        storeAsset(asset, content);
                    }
                    onAssetReady(asset, content);
                }, function() {
                    onAssetReady(asset, '');
                });
            }
            else {
                onAssetReady(asset, content);
            }
        });
    }

    function blinkOnDomReady(manifest) {
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

        var readyStateRe =  (/MSIE 10/.test(navigator.userAgent)) ? /complete|loaded/ : /interactive|complete|loaded/;
        if (doc.readyState.match(readyStateRe) !== null) {
            blink(manifest);
        }
        else {
            addWindowListener('DOMContentLoaded', function() {
                if (navigator.standalone) {
                    // When running from Home Screen, the splash screen will not disappear until all
                    // external resource requests finish.
                    // The first timeout clears the splash screen
                    // The second timeout allows inital HTML content to be displayed
                    setTimeout(function() {
                        setTimeout(function() {
                            blink(manifest);
                        }, 1);
                    }, 1);
                }
                else {
                  setTimeout(function() {
                    blink(manifest);
                  }, 1);
                }
            }, false);
        }
    }

    Ext.blink = function(manifest) {
        var manifestContent = retrieve(getManifestStorageKey(manifest.id));

        addMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
        addMeta('apple-mobile-web-app-capable', 'yes');
        addMeta('apple-touch-fullscreen', 'yes');

        if (manifestContent) {
            manifest = new Manifest(manifestContent);
            blinkOnDomReady(manifest);
        }
        else {
            requestXhr(manifestFile, function(content) {
                manifest = new Manifest(content);
                manifest.store();
                blinkOnDomReady(manifest);
            });
        }
    };
})(this);