export class Icon {
    constructor() {
        this.svgContent = null;
        /**
         * Specifies the label to use for accessibility. Defaults to the icon name.
         */
        this.ariaLabel = '';
        /**
         * Specifies which icon to use on `ios` mode.
         */
        this.ios = '';
        /**
         * Specifies which icon to use on `md` mode.
         */
        this.md = '';
        /**
         * Specifies which icon to use. The appropriate icon will be used based on the mode.
         * For more information, see [Ionicons](/docs/ionicons/).
         */
        this.name = '';
    }
    get iconName() {
        let iconName = this.name.toLowerCase();
        // default to "md" if somehow the mode wasn't set
        const mode = this.mode || 'md';
        // if an icon was passed in using the ios or md attributes
        // set the iconName to whatever was passed in
        if (this.ios && mode === 'ios') {
            iconName = this.ios.toLowerCase();
        }
        else if (this.md && mode === 'md') {
            iconName = this.md.toLowerCase();
            // this does not have one of the defaults
            // so lets auto add in the mode prefix for them
        }
        else if (iconName && !(/^md-|^ios-|^logo-/.test(iconName))) {
            iconName = mode + '-' + iconName;
        }
        // only allow alpha characters and dash
        const invalidChars = iconName.replace(/[a-z]|-|\d/g, '');
        if (invalidChars !== '') {
            console.error(`invalid characters in ion-icon name: ${invalidChars}`);
            return null;
        }
        return iconName;
    }
    hostData() {
        const attrs = {
            'role': 'img'
        };
        if (this.ariaLabel) {
            // user provided label
            attrs['aria-label'] = this.ariaLabel;
        }
        else {
            // come up with the label based on the icon name
            const iconName = this.iconName;
            if (iconName) {
                attrs['aria-label'] =
                    iconName
                        .replace('ios-', '')
                        .replace('md-', '')
                        .replace('-outline', '')
                        .replace(/\-/g, ' ');
            }
        }
        const iconClasses = {};
        if (this.size) {
            iconClasses[`icon-${this.size}`] = true;
        }
        return Object.assign({}, attrs, { class: iconClasses });
    }
    render() {
        if (this.isServer) {
            return h("div", { class: "icon-inner" });
        }
        const iconName = this.iconName;
        if (!iconName) {
            // we don't have good data
            return h("div", { class: "icon-inner" });
        }
        const svgContent = svgContents[iconName];
        if (svgContent === this.svgContent) {
            // we've already loaded up this svg at one point
            // and the svg content we've loaded and assigned checks out
            // render this svg!!
            return h("div", { class: "icon-inner", innerHTML: svgContent });
        }
        // haven't loaded this svg yet
        // start the request
        loadSvgContent(iconName, this.publicPath, loadedSvgContent => {
            // we're finished loading the svg content!
            // set to this.svgContent so we do another render
            this.svgContent = loadedSvgContent;
        });
        // actively requesting the svg, so let's just render a div for now
        return h("div", { class: "icon-inner" });
    }
    static get is() { return "ion-icon"; }
    static get host() { return {
        "theme": "icon"
    }; }
    static get properties() { return {
        "ariaLabel": {
            "type": String,
            "attr": "aria-label"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "ios": {
            "type": String,
            "attr": "ios"
        },
        "isServer": {
            "context": "isServer"
        },
        "md": {
            "type": String,
            "attr": "md"
        },
        "mode": {
            "context": "mode"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "publicPath": {
            "context": "publicPath"
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "svgContent": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:ion-icon:**/"; }
}
function loadSvgContent(iconName, publicPath, callback) {
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
    scriptElm.src = `${publicPath}svg/${iconName}.js`;
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
const activeRequests = {};
const loadCallbacks = [];
const svgContents = {};
// add a jsonp handler to the window
// as svg jsonp files are requested
// once they load they'll call this method
window.loadIonicon = function loadIonicon(svgContent, iconName) {
    // awesome, we've finished loading the svg file
    // remove this url from the active requests
    delete activeRequests[iconName];
    svgContents[iconName] = svgContent;
    // find any callbacks waiting on this icon
    const svgLoadCallbacks = loadCallbacks[iconName];
    if (svgLoadCallbacks) {
        // loop through all the callbacks that are waiting on the svg content
        svgLoadCallbacks.forEach(cb => {
            // fire off this callback which was provided by an instance
            cb(svgContent);
        });
        delete loadCallbacks[iconName];
    }
};
