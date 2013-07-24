/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/form/SearchAction.js
 */

/** api: (define)
 *  module = GeoExt.form
 *  class = BasicForm
 *  base_link = `Ext.form.BasicForm <http://dev.sencha.com/deploy/dev/docs/?class=Ext.form.BasicForm>`_
 */

Ext.namespace("GeoExt.form");

/** api: constructor
 *  .. class:: BasicForm(config)
 *
 *      A specific ``Ext.form.BasicForm`` whose doAction method creates
 *      a :class:`GeoExt.form.SearchAction` if it is passed the string
 *      "search" as its first argument.
 *
 *      In most cases one would not use this class directly, but
 *      :class:`GeoExt.form.FormPanel` instead.
 */
GeoExt.form.BasicForm = Ext.extend(Ext.form.BasicForm, {
    /** private: property[protocol]
     *  ``OpenLayers.Protocol`` The protocol configured in this
     *  instance.
     */
    protocol: null,

    /**
     * private: property[prevResponse]
     * ``OpenLayers.Protocol.Response`` The response return by a call to
     *  protocol.read method.
     */
    prevResponse: null,

    /**
     * api: config[autoAbort]
     * ``Boolean`` Tells if pending requests should be aborted
     *      when a new action is performed.
     */
    autoAbort: true,

    /** api: method[doAction]
     *  :param action: ``String or Ext.form.Action`` Either the name
     *      of the action or a ``Ext.form.Action`` instance.
     *  :param options: ``Object`` The options passed to the Action
     *      constructor.
     *  :return: :class:`GeoExt.form.BasicForm` This form.
     *
     *  Performs the action, if the string "search" is passed as the
     *  first argument then a :class:`GeoExt.form.SearchAction` is created.
     */
    doAction: function(action, options) {
        if(action == "search") {
            options = Ext.applyIf(options || {}, {
                protocol: this.protocol,
                abortPrevious: this.autoAbort
            });
            action = new GeoExt.form.SearchAction(this, options);
        }
        return GeoExt.form.BasicForm.superclass.doAction.call(
            this, action, options
        );
    },

    /** api: method[search]
     *  :param options: ``Object`` The options passed to the Action
     *      constructor.
     *  :return: :class:`GeoExt.form.BasicForm` This form.
     *  
     *  Shortcut to do a search action.
     */
    search: function(options) {
        return this.doAction("search", options);
    }
});
