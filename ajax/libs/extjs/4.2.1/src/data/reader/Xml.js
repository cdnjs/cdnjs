/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @author Ed Spencer
 *
 * The XML Reader is used by a Proxy to read a server response that is sent back in XML format. This usually happens as
 * a result of loading a Store - for example we might create something like this:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email']
 *     });
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.xml',
 *             reader: {
 *                 type: 'xml',
 *                 record: 'user',
 *                 root: 'users'
 *             }
 *         }
 *     });
 *
 * The example above creates a 'User' model. Models are explained in the {@link Ext.data.Model Model} docs if you're not
 * already familiar with them.
 *
 * We created the simplest type of XML Reader possible by simply telling our {@link Ext.data.Store Store}'s {@link
 * Ext.data.proxy.Proxy Proxy} that we want a XML Reader. The Store automatically passes the configured model to the
 * Store, so it is as if we passed this instead:
 *
 *     reader: {
 *         type : 'xml',
 *         model: 'User',
 *         record: 'user',
 *         root: 'users'
 *     }
 *
 * The reader we set up is ready to read data from our server - at the moment it will accept a response like this:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <users>
 *         <user>
 *             <id>1</id>
 *             <name>Ed Spencer</name>
 *             <email>ed@sencha.com</email>
 *         </user>
 *         <user>
 *             <id>2</id>
 *             <name>Abe Elias</name>
 *             <email>abe@sencha.com</email>
 *         </user>
 *     </users>
 *
 * First off there's {@link #root} option to define the root node `<users>` (there should be only one in a well-formed
 * XML document). Then the XML Reader uses the configured {@link #record} option to pull out the data for each record -
 * in this case we set record to 'user', so each `<user>` above will be converted into a User model.
 *
 * Note that XmlReader doesn't care whether your {@link #root} and {@link #record} elements are nested deep inside a
 * larger structure, so a response like this will still work:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <deeply>
 *         <nested>
 *             <xml>
 *                 <users>
 *                     <user>
 *                         <id>1</id>
 *                         <name>Ed Spencer</name>
 *                         <email>ed@sencha.com</email>
 *                     </user>
 *                     <user>
 *                         <id>2</id>
 *                         <name>Abe Elias</name>
 *                         <email>abe@sencha.com</email>
 *                     </user>
 *                 </users>
 *             </xml>
 *         </nested>
 *     </deeply>
 *
 * If this Reader is being used by a {@link Ext.data.TreeStore TreeStore} to read tree-structured data in which records
 * are nested as descendant nodes of other records, then this lenient behaviour must be overridden by using a more specific
 * child node selector as your {@link #record} selector which will not select all descendants, such as:
 *
 *    record: '>user'
 *
 * # Response metadata
 *
 * The server can return additional data in its response, such as the {@link #totalProperty total number of records} and
 * the {@link #successProperty success status of the response}. These are typically included in the XML response like
 * this:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <users>
 *         <total>100</total>
 *         <success>true</success>
 *         <user>
 *             <id>1</id>
 *             <name>Ed Spencer</name>
 *             <email>ed@sencha.com</email>
 *         </user>
 *         <user>
 *             <id>2</id>
 *             <name>Abe Elias</name>
 *             <email>abe@sencha.com</email>
 *         </user>
 *     </users>
 *
 * If these properties are present in the XML response they can be parsed out by the XmlReader and used by the Store
 * that loaded it. We can set up the names of these properties by specifying a final pair of configuration options:
 *
 *     reader: {
 *         type: 'xml',
 *         root: 'users',
 *         totalProperty  : 'total',
 *         successProperty: 'success'
 *     }
 *
 * These final options are not necessary to make the Reader work, but can be useful when the server needs to report an
 * error or if it needs to indicate that there is a lot of data available of which only a subset is currently being
 * returned.
 *
 * # Response format
 *
 * **Note:** in order for the browser to parse a returned XML document, the Content-Type header in the HTTP response
 * must be set to "text/xml" or "application/xml". This is very important - the XmlReader will not work correctly
 * otherwise.
 */
Ext.define('Ext.data.reader.Xml', {
    extend: 'Ext.data.reader.Reader',
    alternateClassName: 'Ext.data.XmlReader',
    alias : 'reader.xml',

    /**
     * @cfg {String} record (required)
     * The DomQuery path to the repeated element which contains record information.
     *
     * By default, the elements which match the selector may be nested at any level below the {@link #root}
     *
     * If this Reader is being used by a {@link Ext.data.TreeStore TreeStore} to read tree-structured data,
     * then only first generation child nodes of the root element must be selected, so the record selector must be
     * specified with a more specific selector which will not select all descendants. For example:
     *
     *    record: '>node'
     *
     */

    /**
     * @cfg {String} namespace
     * A namespace prefix that will be prepended to the field name when reading a
     * field from an XML node.  Take, for example, the following Model:
     * 
     *     Ext.define('Foo', {
     *         extend: 'Ext.data.Model',
     *         fields: ['bar', 'baz']
     *     });
     *     
     * The reader would need to be configured with a namespace of 'n' in order to read XML
     * data in the following format:
     * 
     *     <foo>
     *         <n:bar>bar</n:bar>
     *         <n:baz>baz</n:baz>
     *     </foo>
     */

    /**
     * @private
     * Creates a function to return some particular key of data from a response. The totalProperty and
     * successProperty are treated as special cases for type casting, everything else is just a simple selector.
     * @param {String} key
     * @return {Function}
     */
    createAccessor: function(expr) {
        var me = this;

        if (Ext.isEmpty(expr)) {
            return Ext.emptyFn;
        }

        if (Ext.isFunction(expr)) {
            return expr;
        }

        return function(root) {
            return me.getNodeValue(Ext.DomQuery.selectNode(expr, root));
        };
    },

    getNodeValue: function(node) {
        if (node) {
            // overcome a limitation of maximum textnode size
            // http://reference.sitepoint.com/javascript/Node/normalize
            // https://developer.mozilla.org/En/DOM/Node.normalize
            if (typeof node.normalize === 'function') {
                node.normalize();
            }
            node = node.firstChild;
            if (node) {
                return node.nodeValue;
            }
        }
        return undefined;
    },

    //inherit docs
    getResponseData: function(response) {
        var xml = response.responseXML,
            error,
            msg;

        if (!xml) {
            msg = 'XML data not found in the response';               

            error = new Ext.data.ResultSet({
                total  : 0,
                count  : 0,
                records: [],
                success: false,
                message: msg
            });

            this.fireEvent('exception', this, response, error);

            Ext.Logger.warn(msg);

            return error;
        }

        return this.readRecords(xml);
    },

    /**
     * Normalizes the data object.
     * @param {Object} data The raw data object
     * @return {Object} The documentElement property of the data object if present, or the same object if not.
     */
    getData: function(data) {
        return data.documentElement || data;
    },

    /**
     * @private
     * Given an XML object, returns the Element that represents the root as configured by the Reader's meta data.
     * @param {Object} data The XML data object
     * @return {XMLElement} The root node element
     */
    getRoot: function(data) {
        var nodeName = data.nodeName,
            root     = this.root;

        if (!root || (nodeName && nodeName == root)) {
            return data;
        } else if (Ext.DomQuery.isXml(data)) {
            // This fix ensures we have XML data
            // Related to TreeStore calling getRoot with the root node, which isn't XML
            // Probably should be resolved in TreeStore at some point
            return Ext.DomQuery.selectNode(root, data);
        }
    },

    /**
     * @private
     * We're just preparing the data for the superclass by pulling out the record nodes we want.
     * @param {XMLElement} root The XML root node
     * @return {Ext.data.Model[]} The records
     */
    extractData: function(root) {
        var recordName = this.record;

        //<debug>
        if (!recordName) {
            Ext.Error.raise('Record is a required parameter');
        }
        //</debug>

        if (recordName != root.nodeName) {
            root = Ext.DomQuery.select(recordName, root);
        } else {
            root = [root];
        }
        return this.callParent([root]);
    },

    /**
     * @private
     * See Ext.data.reader.Reader's getAssociatedDataRoot docs.
     * @param {Object} data The raw data object
     * @param {String} associationName The name of the association to get data for (uses associationKey if present)
     * @return {XMLElement} The root
     */
    getAssociatedDataRoot: function(data, associationName) {
        return Ext.DomQuery.select(associationName, data)[0];
    },

    /**
     * Parses an XML document and returns a ResultSet containing the model instances.
     * @param {Object} doc Parsed XML document
     * @return {Ext.data.ResultSet} The parsed result set
     */
    readRecords: function(doc) {
        // it's possible that we get passed an array here by associations.
        // Make sure we strip that out (see Ext.data.reader.Reader#readAssociated)
        if (Ext.isArray(doc)) {
            doc = doc[0];
        }

        /**
         * @property {Object} xmlData
         * Copy of {@link #rawData}.
         * @deprecated Will be removed in Ext JS 5.0. Use {@link #rawData} instead.
         */
        this.xmlData = doc;
        return this.callParent([doc]);
    },

    /**
     * @private
     * Returns an accessor expression for the passed Field from an XML element using either the Field's mapping, or
     * its ordinal position in the fields collsction as the index.
     * This is used by buildExtractors to create optimized on extractor function which converts raw data into model instances.
     */
    createFieldAccessExpression: function(field, fieldVarName, dataName) {
        var namespace = this.namespace,
            selector, result;

        selector = field.mapping || ((namespace ? namespace + '|' : '') + field.name); 

        if (typeof selector === 'function') {
            result = fieldVarName + '.mapping(' + dataName + ', this)';
        } else {
            result = 'me.getNodeValue(Ext.DomQuery.selectNode("' + selector + '", ' + dataName + '))';
        }
        return result;
    }
});
