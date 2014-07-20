/**
 * @author Don Griffin
 *
 * This singleton manages simulated Ajax responses. This allows application logic to be
 * written unaware that its Ajax calls are being handled by simulations ("simlets"). This
 * is currently done by hooking {@link Ext.data.Connection} methods, so all users of that
 * class (and {@link Ext.Ajax} since it is a derived class) qualify for simulation.
 *
 * The requires hooks are inserted when either the {@link #init} method is called or the
 * first {@link Ext.ux.ajax.Simlet} is registered. For example:
 *
 *      Ext.onReady(function () {
 *          initAjaxSim();
 *
 *          // normal stuff
 *      });
 *
 *      function initAjaxSim () {
 *          Ext.ux.ajax.SimManager.init({
 *              delay: 300
 *          }).register({
 *              '/app/data/url': {
 *                  type: 'json',  // use JsonSimlet (type is like xtype for components)
 *                  data: [
 *                      { foo: 42, bar: 'abc' },
 *                      ...
 *                  ]
 *              }
 *          });
 *      }
 *
 * As many URL's as desired can be registered and associated with a {@link Ext.ux.ajax.Simlet}. To make
 * non-simulated Ajax requests once this singleton is initialized, add a `nosim:true` option
 * to the Ajax options:
 *
 *      Ext.Ajax.request({
 *          url: 'page.php',
 *          nosim: true, // ignored by normal Ajax request
 *          params: {
 *              id: 1
 *          },
 *          success: function(response){
 *              var text = response.responseText;
 *              // process server response here
 *          }
 *      });
 */
Ext.define('Ext.ux.ajax.SimManager', {
    singleton: true,

    requires: [
        'Ext.data.Connection',
        'Ext.ux.ajax.SimXhr',
        'Ext.ux.ajax.Simlet',
        'Ext.ux.ajax.JsonSimlet'
    ],

    /**
     * @cfg {Ext.ux.ajax.Simlet} defaultSimlet
     * The {@link Ext.ux.ajax.Simlet} instance to use for non-matching URL's. By default, this will
     * return 404. Set this to null to use real Ajax calls for non-matching URL's.
     */

    /**
     * @cfg {String} defaultType
     * The default `type` to apply to generic {@link Ext.ux.ajax.Simlet} configuration objects. The
     * default is 'basic'.
     */
    defaultType: 'basic',

    /**
     * @cfg {Number} delay
     * The number of milliseconds to delay before delivering a response to an async request.
     */
    delay: 150,

    /**
     * @property {Boolean} ready
     * True once this singleton has initialized and applied its Ajax hooks.
     * @private
     */
    ready: false,

    constructor: function () {
        this.simlets = [];
    },

    getSimlet: function (url) {
        // Strip down to base URL (no query parameters or hash):
        var me = this,
            index = url.indexOf('?'),
            simlets = me.simlets,
            len = simlets.length,
            i, simlet, simUrl, match;

        if (index < 0) {
            index = url.indexOf('#');
        }
        if (index > 0) {
            url = url.substring(0, index);
        }
        
        for (i = 0; i < len; ++i) {
            simlet = simlets[i];
            simUrl = simlet.url;
            if (simUrl instanceof RegExp) {
                match = simUrl.test(url);
            } else {
                match = simUrl === url;
            }
            if (match) {
                return simlet;
            }
        }

        return me.defaultSimlet;
    },

    getXhr: function (method, url, options, async) {
        var simlet = this.getSimlet(url);

        if (simlet) {
            return simlet.openRequest(method, url, options, async);
        }

        return null;
    },

    /**
     * Initializes this singleton and applies configuration options.
     * @param {Object} config An optional object with configuration properties to apply.
     * @return {Ext.ux.ajax.SimManager} this
     * @markdown
     */
    init: function (config) {
        var me = this;

        Ext.apply(me, config);

        if (!me.ready) {
            me.ready = true;

            if (!('defaultSimlet' in me)) {
                me.defaultSimlet = new Ext.ux.ajax.Simlet({
                    status: 404,
                    statusText: 'Not Found'
                });
            }

            me._openRequest = Ext.data.Connection.prototype.openRequest;

            Ext.data.Connection.override({
                openRequest: function (options, requestOptions, async) {
                    var xhr = !options.nosim &&
                              me.getXhr(requestOptions.method, requestOptions.url, options, async);
                    if (!xhr) {
                        xhr = this.callParent(arguments);
                    }
                    return xhr;
                }
            });

            if (Ext.data.JsonP) {
                Ext.data.JsonP.self.override({
                    createScript: function (url, params, options) {
                        var fullUrl = Ext.urlAppend(url, Ext.Object.toQueryString(params)),
                            script = !options.nosim &&
                                     me.getXhr('GET', fullUrl, options, true);

                        if (!script) {
                            script = this.callParent(arguments);
                        }

                        return script;
                    },

                    loadScript: function (request) {
                        var script = request.script;
                        if (script.simlet) {
                            script.jsonpCallback = request.params[request.callbackKey];
                            script.send(null);

                            // Ext.data.JsonP will attempt dom removal of a script tag, so emulate its presence
                            request.script = document.createElement('script');
                        } else {
                            this.callParent(arguments);
                        }
                    }
                });
            }
        }

        return me;
    },

    openRequest: function (method, url, async) {
        var opt = {
            method: method,
            url: url
        };
        return this._openRequest.call(Ext.data.Connection.prototype, {}, opt, async);
    },

    /**
     * Registeres one or more {@link Ext.ux.ajax.Simlet} instances.
     * @param {Array/Object} simlet Either a {@link Ext.ux.ajax.Simlet} instance or config, an Array
     * of such elements or an Object keyed by URL with values that are {@link Ext.ux.ajax.Simlet}
     * instances or configs.
     * @markdown
     */
    register: function (simlet) {
        var me = this;

        me.init();

        function reg (one) {
            var simlet = one;
            if (!simlet.isSimlet) {
                simlet = Ext.create('simlet.' + (simlet.type || simlet.stype || me.defaultType), one);
            }
            me.simlets.push(simlet);
            simlet.manager = me;
        }

        if (Ext.isArray(simlet)) {
            Ext.each(simlet, reg);
        } else if (simlet.isSimlet || simlet.url) {
            reg(simlet);
        } else {
            Ext.Object.each(simlet, function (url, s) {
                s.url = url;
                reg(s);
            });
        }

        return me;
    }
});
