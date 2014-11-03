/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datatype-xml-parse",function(e,t){e.mix(e.namespace("XML"),{parse:function(t){var n=null,r;return typeof t=="string"&&(r=e.config.win,r.ActiveXObject!==undefined?(n=new ActiveXObject("Microsoft.XMLDOM"),n.async=!1,n.loadXML(t)):r.DOMParser!==undefined?n=(new DOMParser).parseFromString(t,"text/xml"):r.Windows!==undefined&&(n=new Windows.Data.Xml.Dom.XmlDocument,n.loadXml(t))),n===null||n.documentElement===null||n.documentElement.nodeName==="parsererror",n}}),e.namespace("Parsers").xml=e.XML.parse,e.namespace("DataType"),e.DataType.XML=e.XML},"3.15.0");
