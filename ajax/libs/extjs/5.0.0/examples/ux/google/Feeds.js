/**
 * This class, when required, ensures that the Google RSS Feeds API is available.
 */
Ext.define('Ext.ux.google.Feeds', {
    extend: 'Ext.ux.google.Api',

    requiresGoogle: { api:'feeds', nocss : true }
});
