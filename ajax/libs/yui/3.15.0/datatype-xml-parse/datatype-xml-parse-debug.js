/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatype-xml-parse', function (Y, NAME) {

/**
 * Parse XML submodule.
 *
 * @module datatype-xml
 * @submodule datatype-xml-parse
 * @for XML
 */

Y.mix(Y.namespace("XML"), {
    /**
     * Converts data to type XMLDocument.
     *
     * @method parse
     * @param data {String} Data to convert.
     * @return {XMLDocument} XML Document.
     */
    parse: function(data) {
        var xmlDoc = null, win;
        if (typeof data === "string") {
            win = Y.config.win;
            if (win.ActiveXObject !== undefined) {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(data);            
            } else if (win.DOMParser !== undefined) {
                xmlDoc = new DOMParser().parseFromString(data, "text/xml");            
            } else if (win.Windows !== undefined) {
                xmlDoc = new Windows.Data.Xml.Dom.XmlDocument();
                xmlDoc.loadXml(data);            
            }
        }

        if (xmlDoc === null || xmlDoc.documentElement === null || xmlDoc.documentElement.nodeName === "parsererror") {
            Y.log("Could not parse data to type XML Document", "warn", "xml");
        }

        return xmlDoc;
    }
});

// Add Parsers shortcut
Y.namespace("Parsers").xml = Y.XML.parse;

Y.namespace("DataType");
Y.DataType.XML = Y.XML;


}, '3.15.0');
