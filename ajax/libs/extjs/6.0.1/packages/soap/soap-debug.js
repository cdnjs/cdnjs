// @tag enterprise
/**
 * Reader class to access v1.1 SOAP (Simple Object Access Protocol) services.
 */
Ext.define('Ext.data.soap.Reader', {
    extend: 'Ext.data.reader.Xml',
    alias: 'reader.soap',
    getData: function(data) {
        var envelope = data.documentElement,
            // we can't always assume that the Body element's namespace prefix is "soap",
            // but we can assume that it is the same as the envelope's namespace prefix
            prefix = envelope.prefix;
        return Ext.DomQuery.selectNode(prefix + '|Body', data);
    }
});

// @tag enterprise
/**
 * The SOAP Proxy class is an {@link Ext.data.proxy.Ajax Ajax Proxy} to access v1.1 SOAP
 * (Simple Object Access Protocol) services.  SOAP Proxy constructs a SOAP Envelope and 
 * submits an AJAX request to load a SOAP response from the server.
 * 
 * For help getting started please refer to the [Soap Guide](../../../enterprise/soap.html).
 *
 * **Note: **  _This functionality is only available with the purchase of
 * Sencha Complete.  For more information about using this class, please visit
 * our [Sencha Complete](https://www.sencha.com/products/complete/) product page._
 *
 * @class Ext.data.soap.Proxy
 */
Ext.define('Ext.data.soap.Proxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.soap',
    requires: [
        'Ext.data.soap.Reader'
    ],
    config: {
        /**
        * @cfg {Object} api
        * An object containing "create", "read", "update" and "destroy" properties that define
        * SOAP operations for each CRUD action method. These operations will be appended to
        * the {@link #url} as the {@link #operationParam} for each request type.
        * 
        *     api: {
        *         create: undefined,
        *         read: undefined,
        *         update: undefined,
        *         destroy: undefined
        *     }
        *     
        * At least one operation is required, but additional operations do not need to be configured
        * if they will not be used.  For example, if this proxy is only used for read operations
        * the following configuration will be sufficient:
        * 
        *     api: {
        *         read: 'Foo'
        *     }
        */
        /**
        * @cfg {Object} soapAction
        * An object containing "create", "read", "update" and "destroy" properties that define
        * the [SOAPAction](http://www.w3.org/TR/2000/NOTE-SOAP-20000508/#_Toc478383528) header
        * for each CRUD action method. A soapAction must be specified for each operation
        * configured in {@link #api}  Defaults to:
        * 
        *     soapAction: {
        *         create: undefined,
        *         read: undefined,
        *         update: undefined,
        *         destroy: undefined
        *     }
        */
        soapAction: {},
        /**
        * @cfg {String} [operationParam='op']
        * The name of the operation parameter to be appened to the SOAP endpoint url
        */
        operationParam: 'op',
        /**
        * @cfg {Object/String/Ext.data.soap.Reader} [reader='soap']
        * The {@link Ext.data.soap.Reader} to use to decode the server's response. This can
        * either be a SOAP Reader instance, a SOAP Reader config object or 'soap'.
        */
        reader: 'soap',
        /**
        * @cfg {String} url
        * The SOAP endpoint url that this proxy will use to request the SOAP data. This can
        * be a proxied url to work around same-origin policy if the SOAP endpoint url is on
        * a different domain from your application.
        */
        url: '',
        /**
        * @cfg [envelopeTpl=undefined]
        * The template used to create the SOAP envelope.  Defaults to:
        * 
        *     [
        *         '<?xml version="1.0" encoding="utf-8" ?>',
        *         '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
        *             '{[values.bodyTpl.apply(values)]}',
        *         '</soap:Envelope>'
        *     ]
        */
        envelopeTpl: [
            '<?xml version="1.0" encoding="utf-8" ?>',
            '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
            '{[values.bodyTpl.apply(values)]}',
            '</soap:Envelope>'
        ],
        /**
        * @cfg {Ext.XTemplate/Array} createBodyTpl
        * The template used to create the SOAP body for the "create" action. If not specified
        * {@link #writeBodyTpl} will be used for the "create" action.
        */
        createBodyTpl: null,
        /**
        * @cfg {Ext.XTemplate/Array} [readBodyTpl=undefined]
        * The template used to create the SOAP body for the "read" action.  Defaults to: 
        * 
        *     [
        *         '<soap:Body>',
        *             '<{operation} xmlns="{targetNamespace}">',
        *                 '<tpl foreach="params">',
        *                     '<{$}>{.}</{$}>',
        *                 '</tpl>',
        *             '</{operation}>',
        *         '</soap:Body>'
        *     ]
        */
        readBodyTpl: [
            '<soap:Body>',
            '<{operation} xmlns="{targetNamespace}">',
            '<tpl foreach="params">',
            '<{$}>{.}</{$}>',
            '</tpl>',
            '</{operation}>',
            '</soap:Body>'
        ],
        /**
        * @cfg {Ext.XTemplate/Array} updateBodyTpl
        * The template used to create the SOAP body for the "update" action. If not specified
        * {@link #writeBodyTpl} will be used for the "update" action.
        */
        updateBodyTpl: null,
        /**
        * @cfg {Ext.XTemplate/Array} destroyBodyTpl
        * The template used to create the SOAP body for the "destroy" action. If not specified
        * {@link #writeBodyTpl} will be used for the "destroy" action.
        */
        destroyBodyTpl: null,
        /**
        * @cfg {Ext.XTemplate/Array} [writeBodyTpl=undefined]
        * The default template used to create the SOAP body for write actions (create, update,
        * and destroy). The individual body templates for each write action can be configured
        * using {@link #createBodyTpl}, {@link #updateBodyTpl}, and {@link #destroyBodyTpl}.
        * Defaults to:
        * 
        *     [
        *          '<soap:Body>',
        *              '<{operation} xmlns="{targetNamespace}">',
        *                  '<tpl for="records">',
        *                      '{% var recordName=values.modelName.split(".").pop(); %}',
        *                      '<{[recordName]}>',
        *                          '<tpl for="fields">',
        *                              '<{name}>{[parent.get(values.name)]}</{name}>',
        *                          '</tpl>',
        *                      '</{[recordName]}>',
        *                  '</tpl>',
        *              '</{operation}>',
        *          '</soap:Body>'
        *      ]
        */
        writeBodyTpl: [
            '<soap:Body>',
            '<{operation} xmlns="{targetNamespace}">',
            '<tpl for="records">',
            '{% var recordName=values.modelName.split(".").pop(); %}',
            '<{[recordName]}>',
            '<tpl for="fields">',
            '<{name}>{[parent.get(values.name)]}</{name}>',
            '</tpl>',
            '</{[recordName]}>',
            '</tpl>',
            '</{operation}>',
            '</soap:Body>'
        ],
        /**
        * @cfg {String} targetNamespace
        * namespace URI used by {@link #createBodyTpl}, {@link #readBodyTpl}, {@link #updateBodyTpl},
        * and {@link #destroyBodyTpl} as the "xmlns" attribute for the operation element.
        */
        targetNamespace: ''
    },
    applyEnvelopeTpl: function(tpl) {
        return this.createTpl(tpl);
    },
    applyCreateBodyTpl: function(tpl) {
        return this.createTpl(tpl);
    },
    applyReadBodyTpl: function(tpl) {
        return this.createTpl(tpl);
    },
    applyUpdateBodyTpl: function(tpl) {
        return this.createTpl(tpl);
    },
    applyDestroyBodyTpl: function(tpl) {
        return this.createTpl(tpl);
    },
    applyWriteBodyTpl: function(tpl) {
        return this.createTpl(tpl);
    },
    createTpl: function(tpl) {
        if (tpl && !tpl.isTpl) {
            tpl = new Ext.XTemplate(tpl);
        }
        return tpl;
    },
    /**
     * @property {Object} actionMethods
     * @readonly
     * Mapping of action name to HTTP request method.  All SOAP actions are mapped to 'POST'
     */
    doRequest: function(operation) {
        var me = this,
            action = operation.getAction(),
            soapOperation = me.getApi()[action],
            params = Ext.applyIf(operation.getParams() || {}, me.getExtraParams() || {}),
            xmlData = me.getEnvelopeTpl().apply({
                operation: soapOperation,
                targetNamespace: me.getTargetNamespace(),
                params: params,
                records: operation.getRecords(),
                bodyTpl: me.getBodyTpl(action)
            }),
            request = new Ext.data.Request({
                url: me.getUrl() + '?' + me.getOperationParam() + '=' + soapOperation,
                method: 'POST',
                action: action,
                operation: operation,
                xmlData: xmlData,
                headers: Ext.apply({
                    SOAPAction: me.getSoapAction()[action]
                }, me.getHeaders()),
                timeout: me.getTimeout(),
                scope: me,
                disableCaching: false
            });
        // explicitly set it to false, ServerProxy handles caching
        request.setCallback(me.createRequestCallback(request, operation));
        return me.sendRequest(request);
    },
    getBodyTpl: function(action) {
        action = Ext.String.capitalize(action);
        var tpl = this['get' + action + 'BodyTpl']();
        return tpl || this.getWriteBodyTpl();
    }
});

