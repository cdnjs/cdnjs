if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/dataschema-xml/dataschema-xml.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dataschema-xml/dataschema-xml.js",
    code: []
};
_yuitest_coverage["build/dataschema-xml/dataschema-xml.js"].code=["YUI.add('dataschema-xml', function (Y, NAME) {","","/**","Provides a DataSchema implementation which can be used to work with XML data.","","@module dataschema","@submodule dataschema-xml","**/","","/**","Provides a DataSchema implementation which can be used to work with XML data.","","See the `apply` method for usage.","","@class DataSchema.XML","@extends DataSchema.Base","@static","**/","var Lang = Y.Lang,","","    okNodeType = {","        1 : true,","        9 : true,","        11: true","    },","","    SchemaXML;","","SchemaXML = {","","    ////////////////////////////////////////////////////////////////////////////","    //","    // DataSchema.XML static methods","    //","    ////////////////////////////////////////////////////////////////////////////","    /**","    Applies a schema to an XML data tree, returning a normalized object with","    results in the `results` property. Additional information can be parsed out","    of the XML for inclusion in the `meta` property of the response object.  If","    an error is encountered during processing, an `error` property will be","    added.","","    Field data in the nodes captured by the XPath in _schema.resultListLocator_","    is extracted with the field identifiers described in _schema.resultFields_.","    Field identifiers are objects with the following properties:","","      * `key`    : <strong>(required)</strong> The desired property name to use","            store the retrieved value in the result object.  If `locator` is","            not specified, `key` is also used as the XPath locator (String)","      * `locator`: The XPath locator to the node or attribute within each","            result node found by _schema.resultListLocator_ containing the","            desired field data (String)","      * `parser` : A function or the name of a function on `Y.Parsers` used","            to convert the input value into a normalized type.  Parser","            functions are passed the value as input and are expected to","            return a value.","      * `schema` : Used to retrieve nested field data into an array for","            assignment as the result field value.  This object follows the same","            conventions as _schema_.","","    If no value parsing or nested parsing is needed, you can use XPath locators","    (strings) instead of field identifiers (objects) -- see example below.","","    `response.results` will contain an array of objects with key:value pairs.","    The keys are the field identifier `key`s, and the values are the data","    values extracted from the nodes or attributes found by the field `locator`","    (or `key` fallback).","    ","    To extract additional information from the XML, include an array of","    XPath locators in _schema.metaFields_.  The collected values will be","    stored in `response.meta` with the XPath locator as keys.","","    @example","        var schema = {","                resultListLocator: '//produce/item',","                resultFields: [","                    {","                        locator: 'name',","                        key: 'name'","                    },","                    {","                        locator: 'color',","                        key: 'color',","                        parser: function (val) { return val.toUpperCase(); }","                    }","                ]","            };","","        // Assumes data like","        // <inventory>","        //   <produce>","        //     <item><name>Banana</name><color>yellow</color></item>","        //     <item><name>Orange</name><color>orange</color></item>","        //     <item><name>Eggplant</name><color>purple</color></item>","        //   </produce>","        // </inventory>","","        var response = Y.DataSchema.JSON.apply(schema, data);","","        // response.results[0] is { name: \"Banana\", color: \"YELLOW\" }","     ","    @method apply","    @param {Object} schema Schema to apply.  Supported configuration","        properties are:","      @param {String} [schema.resultListLocator] XPath locator for the","          XML nodes that contain the data to flatten into `response.results`","      @param {Array} [schema.resultFields] Field identifiers to","          locate/assign values in the response records. See above for","          details.","      @param {Array} [schema.metaFields] XPath locators to extract extra","          non-record related information from the XML data","    @param {XMLDoc} data XML data to parse","    @return {Object} An Object with properties `results` and `meta`","    @static","    **/","    apply: function(schema, data) {","        var xmldoc = data, // unnecessary variables","            data_out = { results: [], meta: {} };","","        if (xmldoc && okNodeType[xmldoc.nodeType] && schema) {","            // Parse results data","            data_out = SchemaXML._parseResults(schema, xmldoc, data_out);","","            // Parse meta data","            data_out = SchemaXML._parseMeta(schema.metaFields, xmldoc, data_out);","        } else {","            data_out.error = new Error(\"XML schema parse failure\");","        }","","        return data_out;","    },","","    /**","     * Get an XPath-specified value for a given field from an XML node or document.","     *","     * @method _getLocationValue","     * @param field {String | Object} Field definition.","     * @param context {Object} XML node or document to search within.","     * @return {Object} Data value or null.","     * @static","     * @protected","     */","    _getLocationValue: function(field, context) {","        var locator = field.locator || field.key || field,","            xmldoc = context.ownerDocument || context,","            result, res, value = null;","","        try {","            result = SchemaXML._getXPathResult(locator, context, xmldoc);","            while ((res = result.iterateNext())) {","                value = res.textContent || res.value || res.text || res.innerHTML || null;","            }","","            // FIXME: Why defer to a method that is mixed into this object?","            // DSchema.Base is mixed into DSchema.XML (et al), so","            // DSchema.XML.parse(...) will work.  This supports the use case","            // where DSchema.Base.parse is changed, and that change is then","            // seen by all DSchema.* implementations, but does not support the","            // case where redefining DSchema.XML.parse changes behavior. In","            // fact, DSchema.XML.parse is never even called.","            return Y.DataSchema.Base.parse.call(this, value, field);","        } catch (e) {","        }","","        return null;","    },","","    /**","     * Fetches the XPath-specified result for a given location in an XML node","     * or document.","     * ","     * @method _getXPathResult","     * @param locator {String} The XPath location.","     * @param context {Object} XML node or document to search within.","     * @param xmldoc {Object} XML document to resolve namespace.","     * @return {Object} Data collection or null.","     * @static","     * @protected","     */","    _getXPathResult: function(locator, context, xmldoc) {","        // Standards mode","        if (! Lang.isUndefined(xmldoc.evaluate)) {","            return xmldoc.evaluate(locator, context, xmldoc.createNSResolver(context.ownerDocument ? context.ownerDocument.documentElement : context.documentElement), 0, null);","        }","        // IE mode","        else {","            var values=[], locatorArray = locator.split(/\\b\\/\\b/), i=0, l=locatorArray.length, location, subloc, m, isNth;","            ","            // XPath is supported","            try {","                // this fixes the IE 5.5+ issue where childnode selectors begin at 0 instead of 1","                xmldoc.setProperty(\"SelectionLanguage\", \"XPath\");","                values = context.selectNodes(locator);","            }","            // Fallback for DOM nodes and fragments","            catch (e) {","                // Iterate over each locator piece","                for (; i<l && context; i++) {","                    location = locatorArray[i];","","                    // grab nth child []","                    if ((location.indexOf(\"[\") > -1) && (location.indexOf(\"]\") > -1)) {","                        subloc = location.slice(location.indexOf(\"[\")+1, location.indexOf(\"]\"));","                        //XPath is 1-based while DOM is 0-based","                        subloc--;","                        context = context.children[subloc];","                        isNth = true;","                    }","                    // grab attribute value @","                    else if (location.indexOf(\"@\") > -1) {","                        subloc = location.substr(location.indexOf(\"@\"));","                        context = subloc ? context.getAttribute(subloc.replace('@', '')) : context;","                    }","                    // grab that last instance of tagName","                    else if (-1 < location.indexOf(\"//\")) {","                        subloc = context.getElementsByTagName(location.substr(2));","                        context = subloc.length ? subloc[subloc.length - 1] : null;","                    }","                    // find the last matching location in children","                    else if (l != i + 1) {","                        for (m=context.childNodes.length-1; 0 <= m; m-=1) {","                            if (location === context.childNodes[m].tagName) {","                                context = context.childNodes[m];","                                m = -1;","                            }","                        }","                    }","                }","                ","                if (context) {","                    // attribute","                    if (Lang.isString(context)) {","                        values[0] = {value: context};","                    }","                    // nth child","                    else if (isNth) {","                        values[0] = {value: context.innerHTML};","                    }","                    // all children","                    else {","                        values = Y.Array(context.childNodes, 0, true);","                    }","                }","            }","","            // returning a mock-standard object for IE","            return {","                index: 0,","                ","                iterateNext: function() {","                    if (this.index >= this.values.length) {return undefined;}","                    var result = this.values[this.index];","                    this.index += 1;","                    return result;","                },","","                values: values","            };","        }","    },","","    /**","     * Schema-parsed result field.","     *","     * @method _parseField","     * @param field {String | Object} Required. Field definition.","     * @param result {Object} Required. Schema parsed data object.","     * @param context {Object} Required. XML node or document to search within.","     * @static","     * @protected","     */","    _parseField: function(field, result, context) {","        var key = field.key || field,","            parsed;","","        if (field.schema) {","            parsed = { results: [], meta: {} };","            parsed = SchemaXML._parseResults(field.schema, context, parsed);","","            result[key] = parsed.results;","        } else {","            result[key] = SchemaXML._getLocationValue(field, context);","        }","    },","","    /**","     * Parses results data according to schema","     *","     * @method _parseMeta","     * @param xmldoc_in {Object} XML document parse.","     * @param data_out {Object} In-progress schema-parsed data to update.","     * @return {Object} Schema-parsed data.","     * @static","     * @protected","     */","    _parseMeta: function(metaFields, xmldoc_in, data_out) {","        if(Lang.isObject(metaFields)) {","            var key,","                xmldoc = xmldoc_in.ownerDocument || xmldoc_in;","","            for(key in metaFields) {","                if (metaFields.hasOwnProperty(key)) {","                    data_out.meta[key] = SchemaXML._getLocationValue(metaFields[key], xmldoc);","                }","            }","        }","        return data_out;","    },","","    /**","     * Schema-parsed result to add to results list.","     *","     * @method _parseResult","     * @param fields {Array} Required. A collection of field definition.","     * @param context {Object} Required. XML node or document to search within.","     * @return {Object} Schema-parsed data.","     * @static","     * @protected","     */","    _parseResult: function(fields, context) {","        var result = {}, j;","","        // Find each field value","        for (j=fields.length-1; 0 <= j; j--) {","            SchemaXML._parseField(fields[j], result, context);","        }","","        return result;","    },","","    /**","     * Schema-parsed list of results from full data","     *","     * @method _parseResults","     * @param schema {Object} Schema to parse against.","     * @param context {Object} XML node or document to parse.","     * @param data_out {Object} In-progress schema-parsed data to update.","     * @return {Object} Schema-parsed data.","     * @static","     * @protected","     */","    _parseResults: function(schema, context, data_out) {","        if (schema.resultListLocator && Lang.isArray(schema.resultFields)) {","            var xmldoc = context.ownerDocument || context,","                fields = schema.resultFields,","                results = [],","                node, nodeList, i=0;","","            if (schema.resultListLocator.match(/^[:\\-\\w]+$/)) {","                nodeList = context.getElementsByTagName(schema.resultListLocator);","                ","                // loop through each result node","                for (i = nodeList.length - 1; i >= 0; --i) {","                    results[i] = SchemaXML._parseResult(fields, nodeList[i]);","                }","            } else {","                nodeList = SchemaXML._getXPathResult(schema.resultListLocator, context, xmldoc);","","                // loop through the nodelist","                while ((node = nodeList.iterateNext())) {","                    results[i] = SchemaXML._parseResult(fields, node);","                    i += 1;","                }","            }","","            if (results.length) {","                data_out.results = results;","            } else {","                data_out.error = new Error(\"XML schema result nodes retrieval failure\");","            }","        }","        return data_out;","    }","};","","Y.DataSchema.XML = Y.mix(SchemaXML, Y.DataSchema.Base);","","","}, '@VERSION@', {\"requires\": [\"dataschema-base\"]});"];
_yuitest_coverage["build/dataschema-xml/dataschema-xml.js"].lines = {"1":0,"19":0,"29":0,"117":0,"120":0,"122":0,"125":0,"127":0,"130":0,"144":0,"148":0,"149":0,"150":0,"151":0,"161":0,"165":0,"182":0,"183":0,"187":0,"190":0,"192":0,"193":0,"198":0,"199":0,"202":0,"203":0,"205":0,"206":0,"207":0,"210":0,"211":0,"212":0,"215":0,"216":0,"217":0,"220":0,"221":0,"222":0,"223":0,"224":0,"230":0,"232":0,"233":0,"236":0,"237":0,"241":0,"247":0,"251":0,"252":0,"253":0,"254":0,"273":0,"276":0,"277":0,"278":0,"280":0,"282":0,"297":0,"298":0,"301":0,"302":0,"303":0,"307":0,"321":0,"324":0,"325":0,"328":0,"343":0,"344":0,"349":0,"350":0,"353":0,"354":0,"357":0,"360":0,"361":0,"362":0,"366":0,"367":0,"369":0,"372":0,"376":0};
_yuitest_coverage["build/dataschema-xml/dataschema-xml.js"].functions = {"apply:116":0,"_getLocationValue:143":0,"iterateNext:250":0,"_getXPathResult:180":0,"_parseField:272":0,"_parseMeta:296":0,"_parseResult:320":0,"_parseResults:342":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dataschema-xml/dataschema-xml.js"].coveredLines = 82;
_yuitest_coverage["build/dataschema-xml/dataschema-xml.js"].coveredFunctions = 9;
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 1);
YUI.add('dataschema-xml', function (Y, NAME) {

/**
Provides a DataSchema implementation which can be used to work with XML data.

@module dataschema
@submodule dataschema-xml
**/

/**
Provides a DataSchema implementation which can be used to work with XML data.

See the `apply` method for usage.

@class DataSchema.XML
@extends DataSchema.Base
@static
**/
_yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 19);
var Lang = Y.Lang,

    okNodeType = {
        1 : true,
        9 : true,
        11: true
    },

    SchemaXML;

_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 29);
SchemaXML = {

    ////////////////////////////////////////////////////////////////////////////
    //
    // DataSchema.XML static methods
    //
    ////////////////////////////////////////////////////////////////////////////
    /**
    Applies a schema to an XML data tree, returning a normalized object with
    results in the `results` property. Additional information can be parsed out
    of the XML for inclusion in the `meta` property of the response object.  If
    an error is encountered during processing, an `error` property will be
    added.

    Field data in the nodes captured by the XPath in _schema.resultListLocator_
    is extracted with the field identifiers described in _schema.resultFields_.
    Field identifiers are objects with the following properties:

      * `key`    : <strong>(required)</strong> The desired property name to use
            store the retrieved value in the result object.  If `locator` is
            not specified, `key` is also used as the XPath locator (String)
      * `locator`: The XPath locator to the node or attribute within each
            result node found by _schema.resultListLocator_ containing the
            desired field data (String)
      * `parser` : A function or the name of a function on `Y.Parsers` used
            to convert the input value into a normalized type.  Parser
            functions are passed the value as input and are expected to
            return a value.
      * `schema` : Used to retrieve nested field data into an array for
            assignment as the result field value.  This object follows the same
            conventions as _schema_.

    If no value parsing or nested parsing is needed, you can use XPath locators
    (strings) instead of field identifiers (objects) -- see example below.

    `response.results` will contain an array of objects with key:value pairs.
    The keys are the field identifier `key`s, and the values are the data
    values extracted from the nodes or attributes found by the field `locator`
    (or `key` fallback).
    
    To extract additional information from the XML, include an array of
    XPath locators in _schema.metaFields_.  The collected values will be
    stored in `response.meta` with the XPath locator as keys.

    @example
        var schema = {
                resultListLocator: '//produce/item',
                resultFields: [
                    {
                        locator: 'name',
                        key: 'name'
                    },
                    {
                        locator: 'color',
                        key: 'color',
                        parser: function (val) { return val.toUpperCase(); }
                    }
                ]
            };

        // Assumes data like
        // <inventory>
        //   <produce>
        //     <item><name>Banana</name><color>yellow</color></item>
        //     <item><name>Orange</name><color>orange</color></item>
        //     <item><name>Eggplant</name><color>purple</color></item>
        //   </produce>
        // </inventory>

        var response = Y.DataSchema.JSON.apply(schema, data);

        // response.results[0] is { name: "Banana", color: "YELLOW" }
     
    @method apply
    @param {Object} schema Schema to apply.  Supported configuration
        properties are:
      @param {String} [schema.resultListLocator] XPath locator for the
          XML nodes that contain the data to flatten into `response.results`
      @param {Array} [schema.resultFields] Field identifiers to
          locate/assign values in the response records. See above for
          details.
      @param {Array} [schema.metaFields] XPath locators to extract extra
          non-record related information from the XML data
    @param {XMLDoc} data XML data to parse
    @return {Object} An Object with properties `results` and `meta`
    @static
    **/
    apply: function(schema, data) {
        _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "apply", 116);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 117);
var xmldoc = data, // unnecessary variables
            data_out = { results: [], meta: {} };

        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 120);
if (xmldoc && okNodeType[xmldoc.nodeType] && schema) {
            // Parse results data
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 122);
data_out = SchemaXML._parseResults(schema, xmldoc, data_out);

            // Parse meta data
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 125);
data_out = SchemaXML._parseMeta(schema.metaFields, xmldoc, data_out);
        } else {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 127);
data_out.error = new Error("XML schema parse failure");
        }

        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 130);
return data_out;
    },

    /**
     * Get an XPath-specified value for a given field from an XML node or document.
     *
     * @method _getLocationValue
     * @param field {String | Object} Field definition.
     * @param context {Object} XML node or document to search within.
     * @return {Object} Data value or null.
     * @static
     * @protected
     */
    _getLocationValue: function(field, context) {
        _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "_getLocationValue", 143);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 144);
var locator = field.locator || field.key || field,
            xmldoc = context.ownerDocument || context,
            result, res, value = null;

        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 148);
try {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 149);
result = SchemaXML._getXPathResult(locator, context, xmldoc);
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 150);
while ((res = result.iterateNext())) {
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 151);
value = res.textContent || res.value || res.text || res.innerHTML || null;
            }

            // FIXME: Why defer to a method that is mixed into this object?
            // DSchema.Base is mixed into DSchema.XML (et al), so
            // DSchema.XML.parse(...) will work.  This supports the use case
            // where DSchema.Base.parse is changed, and that change is then
            // seen by all DSchema.* implementations, but does not support the
            // case where redefining DSchema.XML.parse changes behavior. In
            // fact, DSchema.XML.parse is never even called.
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 161);
return Y.DataSchema.Base.parse.call(this, value, field);
        } catch (e) {
        }

        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 165);
return null;
    },

    /**
     * Fetches the XPath-specified result for a given location in an XML node
     * or document.
     * 
     * @method _getXPathResult
     * @param locator {String} The XPath location.
     * @param context {Object} XML node or document to search within.
     * @param xmldoc {Object} XML document to resolve namespace.
     * @return {Object} Data collection or null.
     * @static
     * @protected
     */
    _getXPathResult: function(locator, context, xmldoc) {
        // Standards mode
        _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "_getXPathResult", 180);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 182);
if (! Lang.isUndefined(xmldoc.evaluate)) {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 183);
return xmldoc.evaluate(locator, context, xmldoc.createNSResolver(context.ownerDocument ? context.ownerDocument.documentElement : context.documentElement), 0, null);
        }
        // IE mode
        else {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 187);
var values=[], locatorArray = locator.split(/\b\/\b/), i=0, l=locatorArray.length, location, subloc, m, isNth;
            
            // XPath is supported
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 190);
try {
                // this fixes the IE 5.5+ issue where childnode selectors begin at 0 instead of 1
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 192);
xmldoc.setProperty("SelectionLanguage", "XPath");
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 193);
values = context.selectNodes(locator);
            }
            // Fallback for DOM nodes and fragments
            catch (e) {
                // Iterate over each locator piece
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 198);
for (; i<l && context; i++) {
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 199);
location = locatorArray[i];

                    // grab nth child []
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 202);
if ((location.indexOf("[") > -1) && (location.indexOf("]") > -1)) {
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 203);
subloc = location.slice(location.indexOf("[")+1, location.indexOf("]"));
                        //XPath is 1-based while DOM is 0-based
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 205);
subloc--;
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 206);
context = context.children[subloc];
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 207);
isNth = true;
                    }
                    // grab attribute value @
                    else {_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 210);
if (location.indexOf("@") > -1) {
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 211);
subloc = location.substr(location.indexOf("@"));
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 212);
context = subloc ? context.getAttribute(subloc.replace('@', '')) : context;
                    }
                    // grab that last instance of tagName
                    else {_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 215);
if (-1 < location.indexOf("//")) {
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 216);
subloc = context.getElementsByTagName(location.substr(2));
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 217);
context = subloc.length ? subloc[subloc.length - 1] : null;
                    }
                    // find the last matching location in children
                    else {_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 220);
if (l != i + 1) {
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 221);
for (m=context.childNodes.length-1; 0 <= m; m-=1) {
                            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 222);
if (location === context.childNodes[m].tagName) {
                                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 223);
context = context.childNodes[m];
                                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 224);
m = -1;
                            }
                        }
                    }}}}
                }
                
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 230);
if (context) {
                    // attribute
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 232);
if (Lang.isString(context)) {
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 233);
values[0] = {value: context};
                    }
                    // nth child
                    else {_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 236);
if (isNth) {
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 237);
values[0] = {value: context.innerHTML};
                    }
                    // all children
                    else {
                        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 241);
values = Y.Array(context.childNodes, 0, true);
                    }}
                }
            }

            // returning a mock-standard object for IE
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 247);
return {
                index: 0,
                
                iterateNext: function() {
                    _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "iterateNext", 250);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 251);
if (this.index >= this.values.length) {return undefined;}
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 252);
var result = this.values[this.index];
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 253);
this.index += 1;
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 254);
return result;
                },

                values: values
            };
        }
    },

    /**
     * Schema-parsed result field.
     *
     * @method _parseField
     * @param field {String | Object} Required. Field definition.
     * @param result {Object} Required. Schema parsed data object.
     * @param context {Object} Required. XML node or document to search within.
     * @static
     * @protected
     */
    _parseField: function(field, result, context) {
        _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "_parseField", 272);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 273);
var key = field.key || field,
            parsed;

        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 276);
if (field.schema) {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 277);
parsed = { results: [], meta: {} };
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 278);
parsed = SchemaXML._parseResults(field.schema, context, parsed);

            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 280);
result[key] = parsed.results;
        } else {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 282);
result[key] = SchemaXML._getLocationValue(field, context);
        }
    },

    /**
     * Parses results data according to schema
     *
     * @method _parseMeta
     * @param xmldoc_in {Object} XML document parse.
     * @param data_out {Object} In-progress schema-parsed data to update.
     * @return {Object} Schema-parsed data.
     * @static
     * @protected
     */
    _parseMeta: function(metaFields, xmldoc_in, data_out) {
        _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "_parseMeta", 296);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 297);
if(Lang.isObject(metaFields)) {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 298);
var key,
                xmldoc = xmldoc_in.ownerDocument || xmldoc_in;

            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 301);
for(key in metaFields) {
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 302);
if (metaFields.hasOwnProperty(key)) {
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 303);
data_out.meta[key] = SchemaXML._getLocationValue(metaFields[key], xmldoc);
                }
            }
        }
        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 307);
return data_out;
    },

    /**
     * Schema-parsed result to add to results list.
     *
     * @method _parseResult
     * @param fields {Array} Required. A collection of field definition.
     * @param context {Object} Required. XML node or document to search within.
     * @return {Object} Schema-parsed data.
     * @static
     * @protected
     */
    _parseResult: function(fields, context) {
        _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "_parseResult", 320);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 321);
var result = {}, j;

        // Find each field value
        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 324);
for (j=fields.length-1; 0 <= j; j--) {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 325);
SchemaXML._parseField(fields[j], result, context);
        }

        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 328);
return result;
    },

    /**
     * Schema-parsed list of results from full data
     *
     * @method _parseResults
     * @param schema {Object} Schema to parse against.
     * @param context {Object} XML node or document to parse.
     * @param data_out {Object} In-progress schema-parsed data to update.
     * @return {Object} Schema-parsed data.
     * @static
     * @protected
     */
    _parseResults: function(schema, context, data_out) {
        _yuitest_coverfunc("build/dataschema-xml/dataschema-xml.js", "_parseResults", 342);
_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 343);
if (schema.resultListLocator && Lang.isArray(schema.resultFields)) {
            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 344);
var xmldoc = context.ownerDocument || context,
                fields = schema.resultFields,
                results = [],
                node, nodeList, i=0;

            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 349);
if (schema.resultListLocator.match(/^[:\-\w]+$/)) {
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 350);
nodeList = context.getElementsByTagName(schema.resultListLocator);
                
                // loop through each result node
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 353);
for (i = nodeList.length - 1; i >= 0; --i) {
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 354);
results[i] = SchemaXML._parseResult(fields, nodeList[i]);
                }
            } else {
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 357);
nodeList = SchemaXML._getXPathResult(schema.resultListLocator, context, xmldoc);

                // loop through the nodelist
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 360);
while ((node = nodeList.iterateNext())) {
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 361);
results[i] = SchemaXML._parseResult(fields, node);
                    _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 362);
i += 1;
                }
            }

            _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 366);
if (results.length) {
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 367);
data_out.results = results;
            } else {
                _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 369);
data_out.error = new Error("XML schema result nodes retrieval failure");
            }
        }
        _yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 372);
return data_out;
    }
};

_yuitest_coverline("build/dataschema-xml/dataschema-xml.js", 376);
Y.DataSchema.XML = Y.mix(SchemaXML, Y.DataSchema.Base);


}, '@VERSION@', {"requires": ["dataschema-base"]});
