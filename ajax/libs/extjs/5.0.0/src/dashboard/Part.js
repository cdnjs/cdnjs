/**
 * This class encapsulates the creation of items for a `Dashboard`. Generally a `Part` is a
 * component factory that allows all parts of a common type to be easily coordinated as
 * needed for that type. For example, an RSS feed might need certain configuration data to
 * properly initialize. Perahps not all of this data can or should be supplied from the UI
 * that creates new instances for the `Dashboard`.
 *
 * ## Part Configuration
 *
 * The primary role of a `Part` is to provide an abstract way to define the configuration
 * needed to create views. For example, an RSS Part would at least need the URL for the
 * feed.
 *
 * To implement this a derived class provides a `displayForm` method:
 *
 *      Ext.define('App.parts.RSS', {
 *          extend: 'Ext.dashboard.Part',
 *          alias: 'part.rss',
 *
 *          displayForm: function (instance, currentConfig, callback, scope) {
 *              var me = this,
 *                  title = instance ? 'Edit RSS Feed' : 'Add RSS Feed';
 *
 *              // Display a prompt using current URL as default text.
 *              //
 *              Ext.Msg.prompt(title, 'RSS Feed URL', function (btn, text) {
 *                  if (btn === 'ok') {
 *                      var config = {
 *                          feedUrl: text
 *                      };
 *
 *                      callback.call(scope || me, config);
 *                  }
 *              }, me, false, currentConfig ? currentConfig.feedUrl : '');
 *          }
 *      });
 *
 * The returned configuration object is used to create views. It is also passed back to
 * `displayForm` to allow the user to edit the configuration for an existing view.
 *
 * ## Creating Views
 *
 * The next step is to define the view (the components) appropriate for the part. To
 * continue with the above example.
 *
 *      Ext.define('App.parts.RSS', {
 *          extend: 'Ext.dashboard.Part',
 *          alias: 'part.rss',
 *
 *          // The viewTemplate is "component template" that is evaluated against the
 *          // configuration (as returned by displayForm). The top-most component is
 *          // a panel specific to the Dashboard so it can be configured but should
 *          // not be replaced. Instead, fit an appropriate component to the panel.
 *          //
 *          viewTemplate: {
 *              layout: 'fit',
 *              items: [{
 *                  xtype: 'feedpanel',
 *                  feedUrl: '{feedUrl}'  // from the configuration object
 *              }]
 *          },
 *
 *          displayForm: ...
 *      });
 *
 * You can instead choose to override the `createView` method if `viewTemplate` does not
 * provide enough flexibility. It is usually a better solution to create a class (like
 * in the above example) and pass basic configurations to it rather than over-complicate
 * either the `viewTemplate` or a custom `createView` method.
 *
 * @since 5.0.0
 */
Ext.define('Ext.dashboard.Part', {
    mixins: [
        'Ext.mixin.Factoryable',
        'Ext.mixin.Identifiable'
    ],

    requires: [
        'Ext.util.ObjectTemplate'
    ],

    alias: 'part.part',

    factoryConfig: {
        type: 'part'
    },

    isPart: true,

    /**
     * The last assigned identifier for instances created by this `Part`.
     * @private
     */
    _lastId: 0,

    config: {
        id: null,

        /**
         * The `Dashboard` instance that owns this `part`.
         * @property {Ext.dashboard.Panel} dashboard
         * @readonly
         */
        dashboard: null,

        /**
         * @cfg {Object/Ext.util.ObjectTemplate} viewTemplate
         * The configuration object used for creating instances of this `Part`. This is
         * used by the `createView` method to create views.
         */
        viewTemplate: {
            collapsed: '{collapsed}',
            columnIndex: '{columnIndex}',
            id: '{id}',
            title: '{title}',
            height: '{height}'
        }
    },

    viewTemplateOptions: {
        excludeProperties: {
            bind: 1
        }
    },

    valueRe: /^[{][a-z]*[}]$/i,

    constructor: function (config) {
        this.initConfig(config);
    },

    applyViewTemplate: function (template) {
        //<debug>
        if (!Ext.isObject(template)) {
            Ext.Error.raise('The viewTemplate for ' + this.$className + ' is not an Object');
        }
        //</debug>

        return Ext.util.ObjectTemplate.create(template, this.viewTemplateOptions);
    },

    /**
     * This method should display an appropriate edit form (probably a modal `Ext.Window`
     * or `Ext.Msg.prompt`) to get or edit configuration for an instance of this part.
     *
     * See the class documentation for examples on implementing this method.
     *
     * @param {Ext.Component} instance The already existing view or `null` if called to
     * configure a new instance.
     *
     * @param {Object} currentConfig The configuration returned from this method for the
     * existing view (`instance`) or `null` if called to configure a new instance.
     *
     * @param {Function} callback The function to call passing
     * @param {Object} callback.config The configuration that defines the instance to be
     * created. This value is passed to `createView` and applied to the `viewTemplate`.
     *
     * @param {Object} scope The scope with which to call the `callback`.
     *
     * @method displayForm
     * @abstract
     * @since 5.0.0
     */
    displayForm: function (instance, currentConfig, callback, scope) {
        callback.call(scope || this, {});
    },

    /**
     * This method is responsible for converting a configuration object from `displayForm`
     * into a "view" (an object that can be passed to `Ext.widget`).
     *
     * If you override this method it is recommended that you `callParent` to get the view
     * produced and then edit that result. This is because there are several private
     * properties placed on the returned configuration object.
     *
     *      createView: function (config) {
     *          var view = this.callParent([config]);
     *
     *          // edit view
     *
     *          return view;
     *      }
     *
     * @param {Object} config The object returned from `displayForm`.
     * @return {Object} The view configuration object.
     * @protected
     * @since 5.0.0
     */
    createView: function (config) {
        var me = this,
            template = me.getViewTemplate(),
            ret = template.apply(config);

        ret.dashboard = me.getDashboard();
        ret.part = me;
        ret._partConfig = config;

        return ret;
    }
});
