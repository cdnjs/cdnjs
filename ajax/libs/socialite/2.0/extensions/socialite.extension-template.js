/*!
 * Socialite v2.0 - Extension template
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // External documentation URLs

    // add required default settings
    Socialite.setup({
        'network_name': {
            lang: 'en'
        }
    });

    /**
     * One network can cater for multiple widgets
     * Check the extensions repository to make sure it doesn't already exist
     * The script object is optional for extentions that require simple images or iframes
     */
    Socialite.network('network_name', {
        script: {
            src     : '//network_name.js',
            charset : 'utf-8'
        },
        /**
         * (optional) Called before `Socialite.load()` appends the network script via `Socialite.appendNetwork()`
         */
        append: function(network)
        {
            // return false to cancel the append and activate all instances immedicately
        },
        /**
         * (optional) called after an appended network script has loaded
         */
        onload: function(network)
        {
            // return false to cancel automatically activation of all instances
        }
    });

    /**
     * Add a unique widget to the network
     * Socialite will activate elements with a class name of `network_name-widget_name`, e.g. `twitter-share`
     */
    Socialite.widget('network_name', 'widget_name', {
        /**
         * (optional) Called after a new instance has been created but before it is initialised
         */
        process: function(instance)
        {
            // return false or replace function with `null` to cancel the default processing of `Socialite.processInstance()`
        },
        /**
         * Called when an instance is loaded
         */
        init: function(instance)
        {
            // After this function that instance should resemble the suggested implementation by the social network
        },
        /**
         * (optional) Called by `Socialite.activateInstance()` when the network has loaded and the final widget is ready to display
         */
        activate: function(instance)
        {
            // 
        }
    });

})(window, window.document, window.Socialite);
