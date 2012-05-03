/**
 * Special Javascript file which gets inserted between JQuery and JQuery mobile scripts when bundling.
 * <p>
 * The problem is that jQuery Mobile does implicit init and tries to render the page instantly
 * the script is loaded.
 * <p>
 * jQuery Mobile relies and jQuery event mechanism and we must set some events for jQuery Mobile
 * to run our own init code after jQuery is loaded. This is what this file is for.
 * <p>
 *
 *
 */

mobilize.extend(mobilize,

/** @lends mobilize */ {

    /**
     * Mobilize code which can be run only after loading jQuery.
     */
    onJQueryLoad: function () {

        if (!jQuery) {
            throw "Need to have jQuery loaded before entering here.";
        }

        mobilize.bindInitEvents();
    },

    /**
     * Must be called before template loading,
     * as immediately when jQuery Mobile script tag is inserted to DOM,
     * some of its event handlers are run.
     */
    bindInitEvents: function () {

        // Assign jQuery Mobile event start up handler 
        //mobilize.bind(window.document, "mobileinit", mobilize.onMobileInit);
        $(window.document).bind("mobileinit", mobilize.onMobileInit);
    },

    /**
     * jQuery mobile initializer handler 
     * 
     * @param {Object} e
     */
    onMobileInit: function (e) {

        // We'll manage our own workflow and don't want to jQuery Mobile
        // start doing things instantly when the script is loaded
        mobilize.log("Disabling jQuery Mobile autoInitialize, was:" + $.mobile.autoInitialize);
        $.mobile.autoInitialize = false;
        $.mobile.ajaxEnabled = false;
		$.mobile.hashListeningEnabled = false; // Don't try to load page on internal link click

        mobilize.jQueryMobileLoaded = true;
        mobilize.prepareFinish();

    }

});
mobilize.onJQueryLoad();