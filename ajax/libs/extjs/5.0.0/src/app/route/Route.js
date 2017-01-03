/**
 * Represents a mapping between a url and a controller/action pair. May also contain
 * additional params.
 *
 * This is a private internal class that should not need to be used by end-developer code.
 * Its API and existence are subject to change so use at your own risk.
 *
 * @author Mitchell Simoens
 * @private
 */
Ext.define('Ext.app.route.Route', {
    /**
     * @cfg {String} action The name of the action that will be called on the
     * {@link #controller} if this route is matched.
     */
    action: null,

    /**
     * @cfg {Object} conditions Optional set of conditions for each token in the url
     * string. Each key should be one of the tokens, each value should be a regex that the
     * token should accept. For example, if you have a Route with a url like
     * `"files/:fileName"` and you want it to match urls like "files/someImage.jpg" then
     * you can set these conditions to allow the :fileName token to accept strings
     * containing a period ("."):
     *
     *     conditions: {
     *         ':fileName': "[0-9a-zA-Z\.]+"
     *     }
     */
    conditions: null,

    /**
     * @cfg {String} controller The name of the Controller whose {@link #action} will be
     * called if this route is matched.
     */
    controller: null,
    
    /**
     * @cfg {Boolean} allowInactive `true` to allow this route to be triggered on
     * a controller that is not active.
     */
    allowInactive: false,

    /**
     * @cfg {String} url (required) The url regex to match against.
     */
    url: null,

    /**
     * @cfg {Function} before An optional function to use to intercept the {@link #action}
     * to do extra means and possibly stop the execution. An example is if the route is
     * for editing a user and you need to verify the current user has permission you can
     * send an {@link Ext.Ajax} request to a server or some arbitrary code.
     *
     * @param {Function} callback A function that MUST be executed passing in a Boolean
     * value to allow execution of the configured action on this {@link Ext.app.route.Route}.
     *
     * Defaults to `null`
     */
    before: null,

    /**
     * @cfg {Boolean} caseInsensitive `true` to allow the tokens to be matched with
     * case-insensitive. Defaults to `false` which will force case matching.
     */
    caseInsensitive: false,

    /**
     * A regular expression to match the token to the configured {@link #url}.
     *
     * @private
     */
    matcherRegex: null,

    /**
     * A regular expression to check if there are parameters in the configured {@link #url}.
     *
     * @private
     */
    paramMatchingRegex: null,

    /**
     * An array of parameters in the configured {@link #url}.
     *
     * @private
     */
    paramsInMatchString: null,

    constructor : function(config) {
        var me = this,
            url;

        Ext.apply(me, config, {
            conditions : {}
        });

        url = me.url;

        me.paramMatchingRegex  = new RegExp(/:([0-9A-Za-z\_]*)/g);
        me.paramsInMatchString = url.match(me.paramMatchingRegex) || [];
        me.matcherRegex        = me.createMatcherRegex(url);
    },

    /**
     * Attempts to recognize a given url string and return controller/action pair for it.
     *
     * @param {String} url The url to recognize.
     * @return {Object/Boolean} The matched data, or `false` if no match.
     */
    recognize : function(url) {
        var me = this,
            controller = me.controller,
            matches, args;

        if ((me.allowInactive || controller.isActive()) && me.recognizes(url)) {
            //find parameter matches
            matches = me.matchesFor(url);
            //find the arguments for the parameters
            args    = url.match(me.matcherRegex);

            //first one is the entire match, remove
            args.shift();

            return Ext.applyIf(matches, {
                controller : controller,
                action     : me.action,
                historyUrl : url,
                args       : args
            });
        }

        return false;
    },

    /**
     * Returns true if this {@link Ext.app.route.Route} matches the given url string.
     *
     * @private
     * @param {String} url The url to test.
     * @return {Boolean} `true` if this {@link Ext.app.route.Route} recognizes the url.
     */
    recognizes : function (url) {
        return this.matcherRegex.test(url);
    },

    /**
     * The method to execute the action using the configured before function which will
     * kick off the actual {@link #action} on the {@link #controller}.
     *
     * @private
     * @param {String} token The hash to execute with.
     * @param {Object} argConfig The object from the {@link Ext.app.route.Route}'s
     * recognize method call.
     * @param {Function} callback An optional callback function to execute after the
     * {@link #action} is executed.
     * @param {Object} scope The scope to execute the callback with, defaults to this
     * {@link Ext.app.route.Route}.
     */
    execute : function(token, argConfig, callback, scope) {
        var args           = argConfig.args || [],
            before         = this.before,
            controller     = this.controller,
            beforeCallback = this.createCallback(argConfig, callback, scope);

        if (before) {
            args.push(beforeCallback);

            if (Ext.isString(before)) {
                //get method from the controller
                before = this.before = controller[before];
            }

            if (before) {
                before.apply(controller, args);
            }
            //<debug>
            else {
                Ext.log.warn('The before action: ' + this.before +
                    ' was not found on the controller. The action method will not be executed.');
            }
            //</debug>
        } else {
            //If no before was specified, proceed to action
            beforeCallback.resume();
        }
    },

    /**
     * Returns a hash of matching url segments for the given url.
     *
     * @private
     * @param {String} url The url to extract matches for
     * @return {Object} matching url segments
     */
    matchesFor : function (url) {
        var params = {},
            keys   = this.paramsInMatchString,
            values = url.match(this.matcherRegex),
            i      = 0,
            len    = keys.length;

        //first value is the entire match so reject
        values.shift();

        for (; i < len; i++) {
            params[keys[i].replace(':', '')] = values[i];
        }

        return params;
    },

    /**
     * Takes the configured url string including wildcards and returns a regex that can be
     * used to match against a url.
     *
     * @private
     * @param {String} url The url string.
     * @return {RegExp} The matcher regex.
     */
    createMatcherRegex : function (url) {
        // Converts a route string into an array of symbols starting with a colon. e.g.
        // ":controller/:action/:id" => [':controller', ':action', ':id']
        //
        var paramsInMatchString = this.paramsInMatchString,
            conditions          = this.conditions,
            i                   = 0,
            len                 = paramsInMatchString.length,
            format              = Ext.util.Format.format,
            modifiers           = this.caseInsensitive ? 'i' : '',
            params, cond, matcher;

        for (; i < len; i++) {
            params  = paramsInMatchString[i];
            cond    = conditions[params];
            matcher = format('{0}', cond || '([%a-zA-Z0-9\\-\\_\\s,]+)');

            url = url.replace(new RegExp(params), matcher);
        }

        //we want to match the whole string, so include the anchors
        return new RegExp('^' + url + '$', modifiers);
    },

    /**
     * Creates the callback function to execute in the configured {@link #before} function.
     *
     * @private
     * @param {Object} args The arguments found from the {@link Ext.app.route.Route}'s
     * recognize call.
     * @param {Function} callback The function to be executed after the {@link #action}
     * has been executed.
     * @param {Object} scope The scope to execute on the callback function, defaults to
     * the {@link Ext.app.route.Route}.
     * @return {Object} An object with the `resume` and `stop` methods on it to control to continue
     * with the action or not.
     */
    createCallback : function (args, callback, scope) {
        var me = this;

        scope = scope || me;

        return {
            resume : function() {
                var controller = me.controller,
                    action = me.action,
                    resume;

                if (Ext.isString(action)) {
                    //get method from the controller
                    action = controller[action];
                }

                //get the parameter arguments
                args = args && args.args ? args.args : [];

                //remove the action argument from the before method
                resume = args.pop();

                if (resume && !Ext.isObject(resume)) {
                    args.push(resume);
                }

                //make sure there is an action
                if (action) {
                    me.action = action;

                    //execute the action on the controller scoping to the controller
                    action.apply(controller, args);
                }
                //<debug>
                else {
                    Ext.log.warn('The action: ' + me.action + ' was not found on the controller.');
                }
                //</debug>

                if (callback) {
                    callback.call(scope);
                }
            },

            stop : function(all) {
                if (callback) {
                    callback.call(scope, all);
                }
            }
        };
    }
});
