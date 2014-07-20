// @tag enterprise
/**
 * The AMF Proxy is an {@link Ext.data.proxy.Ajax Ajax Proxy} that requests
 * binary data from a remote server and parses it into records using an
 * {@link Ext.data.amf.Reader AMF Reader} for use in a
 * {@link Ext.data.Store Store}.
 *
 *     Ext.create('Ext.data.Store', {
 *         model: 'Foo',
 *         proxy: {
 *             type: 'amf',
 *             url: 'some/url'
 *         }
 *     });
 *     
 * For a detailed tutorial on using AMF data see the [AMF Guide](#/guide/amf).
 *
 * **Note: **  _This functionality is only available with the purchase of 
 * Sencha Complete.  For more information about using this class, please visit 
 * our [Sencha Complete](https://www.sencha.com/products/complete/) product page._
 *
 */
Ext.define('Ext.data.amf.Proxy', {
    extend: 'Ext.data.proxy.Ajax',

    alias: 'proxy.amf',

    requires: [
        'Ext.data.amf.Reader'
    ],

    /**
     * @cfg
     * @inheritdoc
     */
    binary: true,

    /**
     * @cfg
     * @inheritdoc
     */
    reader: 'amf'
});