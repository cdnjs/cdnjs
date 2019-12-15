var Icon = /** @class */ (function () {
    function Icon() {
        /**
         * @input {string} Specifies the label to use for accessibility. Defaults to the icon name.
         */
        this.ariaLabel = '';
        /**
         * @input {string} Specifies which icon to use. The appropriate icon will be used based on the mode.
         * For more information, see [Ionicons](/docs/ionicons/).
         */
        this.name = '';
        /**
         * @input {string} Specifies which icon to use on `ios` mode.
         */
        this.ios = '';
        /**
         * @input {string} Specifies which icon to use on `md` mode.
         */
        this.md = '';
        this.svgContent = null;
    }
    Object.defineProperty(Icon.prototype, "iconName", {
        get: function () {
            // if no name was passed set iconName to null
            if (!this.name) {
                return null;
            }
            var iconName = this.name.toLowerCase();
            // default to "md" if somehow the mode wasn't set
            var mode = this.mode || 'md';
            if (!(/^md-|^ios-|^logo-/.test(iconName))) {
                // this does not have one of the defaults
                // so lets auto add in the mode prefix for them
                iconName = mode + '-' + iconName;
            }
            else if (this.ios && mode === 'ios') {
                // if an icon was passed in using the ios or md attributes
                // set the iconName to whatever was passed in
                // when we're also on that mode
                // basically, use the ios attribute when you're on ios
                iconName = this.ios;
            }
            else if (this.md && mode === 'md') {
                // use the md attribute when you're in md mode
                // and the md attribute has been set
                iconName = this.md;
            }
            // only allow alpha characters and dash
            var invalidChars = iconName.replace(/[a-z]|-|\d/g, '');
            if (invalidChars !== '') {
                console.error("invalid characters in ion-icon name: " + invalidChars);
                return null;
            }
            return iconName;
        },
        enumerable: true,
        configurable: true
    });
    Icon.prototype.hostData = function () {
        var attrs = {
            'role': 'img'
        };
        if (this.ariaLabel) {
            // user provided label
            attrs['aria-label'] = this.ariaLabel;
        }
        else {
            // come up with the label based on the icon name
            var iconName = this.iconName;
            if (iconName) {
                attrs['aria-label'] = iconName
                    .replace('ios-', '')
                    .replace('md-', '')
                    .replace(/\-/g, ' ');
            }
        }
        return {
            attrs: attrs
        };
    };
    Icon.prototype.render = function () {
        var _this = this;
        if (this.isServer) {
            return h("div", { "c": { "icon-inner": true } });
        }
        var iconName = this.iconName;
        if (!iconName) {
            // we don't have good data
            return h("div", { "c": { "icon-inner": true } });
        }
        var svgContent = svgContents[iconName];
        if (svgContent === this.svgContent) {
            // we've already loaded up this svg at one point
            // and the svg content we've loaded and assigned checks out
            // render this svg!!
            return h("div", { "c": { "icon-inner": true }, "p": { "innerHTML": svgContent } });
        }
        // haven't loaded this svg yet
        // start the request
        loadSvgContent(iconName, function (loadedSvgContent) {
            // we're finished loading the svg content!
            // set to this.svgContent so we do another render
            _this.svgContent = loadedSvgContent;
        });
        // actively requesting the svg, so let's just render a div for now
        return h("div", { "c": { "icon-inner": true } });
    };
    return Icon;
}());
export { Icon };
function loadSvgContent(iconName, callback) {
    // static since all IonIcons use this same function and pointing at global/shared data
    // passed in callback will have instance info
    // add to the list of callbacks to fiure when this url is finished loading
    (loadCallbacks[iconName] = loadCallbacks[iconName] || []).push(callback);
    if (activeRequests[iconName]) {
        // already requesting this icon, don't bother kicking off another
        return;
    }
    // add this icons to our list of active requests
    activeRequests[iconName] = true;
    // kick off the request for the external svg file
    // create a script element to add to the document.head
    var scriptElm = document.createElement('script');
    scriptElm.charset = 'utf-8';
    scriptElm.async = true;
    scriptElm.src = publicPath + "svj/" + iconName + ".svj";
    // create a fallback timeout if something goes wrong
    var tmrId = setTimeout(onScriptComplete, 120000);
    function onScriptComplete() {
        clearTimeout(tmrId);
        scriptElm.onerror = scriptElm.onload = null;
        scriptElm.parentNode.removeChild(scriptElm);
        // remove from our list of active requests
        delete activeRequests[iconName];
    }
    // add script completed listener to this script element
    scriptElm.onerror = scriptElm.onload = onScriptComplete;
    // inject a script tag in the head
    // kick off the actual request
    document.head.appendChild(scriptElm);
}
var activeRequests = {};
var loadCallbacks = [];
var svgContents = {};
// add a jsonp handler to the window
// as svg jsonp files are requested
// once they load they'll call this method
window.loadIonicon = function loadIonicon(svgContent, iconName) {
    // awesome, we've finished loading the svg file
    // remove this url from the active requests
    delete activeRequests[iconName];
    svgContents[iconName] = svgContent;
    // find any callbacks waiting on this icon
    var svgLoadCallbacks = loadCallbacks[iconName];
    if (svgLoadCallbacks) {
        // loop through all the callbacks that are waiting on the svg content
        svgLoadCallbacks.forEach(function (cb) {
            // fire off this callback which was provided by an instance
            cb(svgContent);
        });
        delete loadCallbacks[iconName];
    }
};
