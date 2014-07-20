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