/**
 * History management component that allows you to register arbitrary tokens that signify application
 * history state on navigation actions.  You can then handle the history {@link #change} event in order
 * to reset your application UI to the appropriate state when the user navigates forward or backward through
 * the browser history stack.
 *
 * ## Initializing
 *
 * The {@link #init} method of the History object must be called before using History. This sets up the internal
 * state and must be the first thing called before using History.
 */
Ext.define('Ext.util.History', {
    singleton: true,
    alternateClassName: 'Ext.History',
    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @property
     * True to use `window.top.location.hash` or false to use `window.location.hash`. Must be set before {@link #init} is called
     * because the `hashchange` event listener is added to the window at initialization time.
     */
    useTopWindow: false,

    /**
     * @property {String} currentToken The current token.
     * @private
     */

    /**
     * @event ready
     * Fires when the Ext.util.History singleton has been initialized and is ready for use.
     * @param {Ext.util.History} The Ext.util.History singleton.
     */

    /**
     * @event change
     * Fires when navigation back or forwards within the local page's history occurs.
     * @param {String} token An identifier associated with the page state at that point in its history.
     */

    constructor: function() {
        var me = this,
            hash,
            newHash;

        me.hiddenField = null;
        me.ready = false;
        me.currentToken = null;
        me.mixins.observable.constructor.call(me);
        me.onHashChange = function () {
            newHash = me.getHash();
            if (newHash !== hash) {
                hash = newHash;
                me.handleStateChange(hash);
            }
        };
    },

    /**
     * Gets the actual hash from the url. This shouldn't need to be used directly but use the
     * {@link #getToken} method instead.
     *
     * @returns {String} The hash from the window object.
     * @private
     */
    getHash: function() {
        return this.win.location.hash.substr(1);
    },

    /**
     * Updates the hash on the window. This shouldn't need to be used directly but use the
     * {@link #add} method instead.
     *
     * @param {String} hash The hash to use
     * @private
     */
    setHash: function(hash) {
        try {
            this.win.location.hash = hash;
            this.currentToken = hash;
        } catch (e) {
            // IE can give Access Denied (esp. in popup windows)
        }
    },

    /**
     * Handles when the hash in the URL has been updated. Will also fired the change event.
     *
     * @param {String} token The token that was changed to
     * @private
     */
    handleStateChange: function(token) {
        this.currentToken = token;
        this.fireEvent('change', token);
    },

    /**
     * Bootstraps the initialization the location.hash.
     * This will setup the {@link Ext.TaskManager} to poll for hash changes every 50ms.
     * @private
     */
    startUp: function() {
        var me = this;

        me.currentToken = me.getHash();

        if (Ext.supports.Hashchange) {
            Ext.Element.on(me.win, 'hashchange', me.onHashChange);
        } else {
            Ext.TaskManager.start({
                fireIdleEvent: false,
                run: me.onHashChange,
                interval: 50
            });
        }
        me.ready = true;
        me.fireEvent('ready', me);
    },

    /**
     * Initializes the global History instance.
     * @param {Function} [onReady] A callback function that will be called once the history
     * component is fully initialized.
     * @param {Object} [scope] The scope (`this` reference) in which the callback is executed.
     * Defaults to the browser window.
     */
    init: function(onReady, scope) {
        var me = this;

        if (me.ready) {
            Ext.callback(onReady, scope, [me]);
            return;
        }

        if (!Ext.isReady) {
            Ext.onReady(function() {
                me.init(onReady, scope);
            });
            return;
        }

        me.win = me.useTopWindow ? window.top : window;

        if (onReady) {
            me.on('ready', onReady, scope, {single: true});
        }
        me.startUp();
    },

    /**
     * Add a new token to the history stack. This can be any arbitrary value, although it would
     * commonly be the concatenation of a component id and another id marking the specific history
     * state of that component. Example usage:
     *
     *     // Handle tab changes on a TabPanel
     *     tabPanel.on('tabchange', function(tabPanel, tab){
     *          Ext.History.add(tabPanel.id + ':' + tab.id);
     *     });
     *
     * @param {String} token The value that defines a particular application-specific history state
     * @param {Boolean} [preventDuplicates=true] When true, if the passed token matches the current token
     * it will not save a new history step. Set to false if the same state can be saved more than once
     * at the same history stack location.
     */
    add: function(token, preventDuplicates) {
        var me = this,
            set = false;

        if (preventDuplicates === false || me.getToken() !== token) {
            me.setHash(token);
            set = true;
        }

        return set;
    },

    /**
     * Programmatically steps back one step in browser history (equivalent to the user pressing the Back button).
     */
    back: function() {
        var win = this.useTopWindow ? window.top : window;
        win.history.go(-1);
    },

    /**
     * Programmatically steps forward one step in browser history (equivalent to the user pressing the Forward button).
     */
    forward: function(){
        var win = this.useTopWindow ? window.top : window;
        win.history.go(1);
    },

    /**
     * Retrieves the currently-active history token.
     * @return {String} The token
     */
    getToken: function() {
        return this.ready ? this.currentToken : this.getHash();
    }
});