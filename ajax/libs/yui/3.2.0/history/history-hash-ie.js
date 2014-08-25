YUI.add('history-hash-ie', function(Y) {

/**
 * Improves IE6/7 support in history-hash by using a hidden iframe to create
 * entries in IE's browser history. This module is only needed if IE6/7 support
 * is necessary; it's not needed for any other browser.
 *
 * @module history
 * @submodule history-hash-ie
 * @since 3.2.0
 */

// Combination of a UA sniff to ensure this is IE (or a browser that wants us to
// treat it like IE) and feature detection for native hashchange support (false
// for IE < 8 or IE8/9 in IE7 mode).
if (Y.UA.ie && !Y.HistoryBase.nativeHashChange) {
    var Do          = Y.Do,
        GlobalEnv   = YUI.namespace('Env.HistoryHash'),
        HistoryHash = Y.HistoryHash,
        iframe      = GlobalEnv._iframe,
        win         = Y.config.win,
        location    = win.location;

    HistoryHash.getHash = function () {
        // The iframe's hash always wins over the parent frame's. This results
        // in the unfortunate edge case that changing the parent's hash without
        // using the YUI History API will not result in a hashchange event, but
        // this is a reasonable tradeoff. The only time the parent frame's hash
        // will be returned is if the iframe hasn't been created yet (i.e.,
        // before domready).
        var prefix = HistoryHash.hashPrefix,
            hash   = iframe ? iframe.contentWindow.location.hash.substr(1) :
                        location.hash.substr(1);

        return prefix && hash.indexOf(prefix) === 0 ?
                    hash.replace(prefix, '') : hash;
    };

    HistoryHash.getUrl = function () {
        var hash = HistoryHash.getHash();

        if (hash && hash !== location.hash.substr(1)) {
            return location.href.replace(/#.*$/, '') + '#' + hash;
        } else {
            return location.href;
        }
    };

    /**
     * Updates the history iframe with the specified hash.
     *
     * @method _updateIframe
     * @param {String} hash location hash
     * @param {Boolean} replace (optional) if <code>true</code>, the current
     *   history state will be replaced without adding a new history entry
     * @protected
     * @static
     * @for HistoryHash
     */
    HistoryHash._updateIframe = function (hash, replace) {
        var iframeDoc      = iframe.contentWindow.document,
            iframeLocation = iframeDoc.location;


        iframeDoc.open().close();

        if (replace) {
            iframeLocation.replace(hash.charAt(0) === '#' ? hash : '#' + hash);
        } else {
            iframeLocation.hash = hash;
        }
    };

    Do.after(HistoryHash._updateIframe, HistoryHash, 'replaceHash', HistoryHash, true);
    Do.after(HistoryHash._updateIframe, HistoryHash, 'setHash');

    if (!iframe) {
        Y.on('domready', function () {
            // Create a hidden iframe to store history state, following the
            // iframe-hiding recommendations from
            // http://www.paciellogroup.com/blog/?p=604.
            //
            // This iframe will allow history navigation within the current page
            // context. After navigating to another page, all but the most
            // recent history state will be lost.
            //
            // Earlier versions of the YUI History Utility attempted to work
            // around this limitation by having the iframe load a static
            // resource. This workaround was extremely fragile and tended to
            // break frequently (and silently) since it was entirely dependent
            // on IE's inconsistent handling of iframe history.
            //
            // Since this workaround didn't work much of the time anyway and
            // added significant complexity, it has been removed, and IE6 and 7
            // now get slightly degraded history support.

            iframe = GlobalEnv._iframe = Y.Node.getDOMNode(Y.Node.create(
                '<iframe src="javascript:0" style="display:none" height="0" width="0" tabindex="-1" title="empty"/>'
            ));

            // Append the iframe to the documentElement rather than the body.
            // Keeping it outside the body prevents scrolling on the initial
            // page load (hat tip to Ben Alman and jQuery BBQ for this
            // technique).
            Y.config.doc.documentElement.appendChild(iframe);

            // Update the iframe with the initial location hash, if any. This
            // will create an initial history entry that the user can return to
            // after the state has changed.
            HistoryHash._updateIframe(location.hash.substr(1));
        });

        // Listen for hashchange events and keep the parent window's location
        // hash in sync with the hash stored in the iframe.
        Y.on('hashchange', function (e) {
            if (location.hash.substr(1) !== e.newHash) {
                location.hash = e.newHash;
            }
        }, win);
    }
}


}, '@VERSION@' ,{requires:['history-hash', 'node-base']});
