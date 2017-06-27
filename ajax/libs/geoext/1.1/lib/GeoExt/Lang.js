/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt
 *  class = Lang
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */
Ext.namespace("GeoExt");

/** api: constructor
 *  .. class:: Lang
 *
 *      The GeoExt.Lang singleton is created when the library is loaded.
 *      Include all relevant language files after this file in your build.
 */
GeoExt.Lang = new (Ext.extend(Ext.util.Observable, {

    /** api: property[locale]
     *  ``String``
     *  The current language tag.  Use :meth:`set` to set the locale.  Defaults
     *  to the browser language where available.
     */
    locale: navigator.language || navigator.userLanguage,

    /** private: property[dict]
     *  ``Object``
     *  Dictionary of string lookups per language.
     */
    dict: null,

    /** private: method[constructor]
     *  Construct the Lang singleton.
     */
    constructor: function() {
        this.addEvents(
            /** api: event[localize]
             *  Fires when localized strings are set.  Listeners will receive a
             *  single ``locale`` event with the language tag.
             */
            "localize"
        );
        this.dict = {};
        Ext.util.Observable.constructor.apply(this, arguments);
    },

    /** api: method[add]
     *  :param locale: ``String`` A language tag that follows the "en-CA"
     *      convention (http://www.ietf.org/rfc/rfc3066.txt).
     *  :param lookup: ``Object`` An object with properties that are dot
     *      delimited names of objects with localizable strings (e.g.
     *      "GeoExt.VectorLegend.prototype").  The values for these properties
     *      are objects that will be used to extend the target objects with
     *      localized strings (e.g. {untitledPrefix: "Untitiled "})
     *
     *  Add translation strings to the dictionary.  This method can be called
     *  multiple times with the same language tag (locale argument) to extend
     *  a single dictionary.
     */
    add: function(locale, lookup) {
        var obj = this.dict[locale];
        if (!obj) {
            this.dict[locale] = Ext.apply({}, lookup);
        } else {
            for (var key in lookup) {
                obj[key] = Ext.apply(obj[key] || {}, lookup[key]);
            }
        }
        if (!locale || locale === this.locale) {
            this.set(locale);
        } else if (this.locale.indexOf(locale + "-") === 0) {
            // current locale is regional variation of added strings
            // call set so newly added strings are used where appropriate
            this.set(this.locale);
        }
    },

    /** api: method[set]
     * :arg locale: ''String'' Language identifier tag following recommendations
     *     at http://www.ietf.org/rfc/rfc3066.txt.
     *
     * Set the language for all GeoExt components.  This will use any localized
     * strings in the dictionary (set with the :meth:`add` method) that
     * correspond to the complete matching language tag or any "higher order"
     * tag (e.g. setting "en-CA" will use strings from the "en" dictionary if
     * matching strings are not found in the "en-CA" dictionary).
     */
    set: function(locale) {
        // compile lookup based on primary and all subtags
        var tags = locale ? locale.split("-") : [];
        var id = "";
        var lookup = {}, parent;
        for (var i=0, ii=tags.length; i<ii; ++i) {
            id += (id && "-" || "") + tags[i];
            if (id in this.dict) {
                parent = this.dict[id];
                for (var str in parent) {
                    if (str in lookup) {
                        Ext.apply(lookup[str], parent[str]);
                    } else {
                        lookup[str] = Ext.apply({}, parent[str]);
                    }
                }
            }
        }

        // now extend all objects given by dot delimited names in lookup
        for (var str in lookup) {
            var obj = window;
            var parts = str.split(".");
            var missing = false;
            for (var i=0, ii=parts.length; i<ii; ++i) {
                var name = parts[i];
                if (name in obj) {
                    obj = obj[name];
                } else {
                    missing = true;
                    break;
                }
            }
            if (!missing) {
                Ext.apply(obj, lookup[str]);
            }
        }
        this.locale = locale;
        this.fireEvent("localize", locale);
    }
}))();

