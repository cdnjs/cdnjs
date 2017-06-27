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
_yuitest_coverage["/build/datatype-xml-format/datatype-xml-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/datatype-xml-format/datatype-xml-format.js",
    code: []
};
_yuitest_coverage["/build/datatype-xml-format/datatype-xml-format.js"].code=["YUI.add('datatype-xml-format', function(Y) {","","/**"," * Format XML submodule."," *"," * @module datatype"," * @submodule datatype-xml-format"," */","","/**"," * XML submodule."," *"," * @module datatype"," * @submodule datatype-xml"," */","","/**"," * DataType.XML provides a set of utility functions to operate against XML documents."," *"," * @class DataType.XML"," * @static"," */","var LANG = Y.Lang;","","Y.mix(Y.namespace(\"DataType.XML\"), {","    /**","     * Converts data to type XMLDocument.","     *","     * @method format","     * @param data {XMLDoc} Data to convert.","     * @return {String} String.","     */","    format: function(data) {","        try {","            if(!LANG.isUndefined(XMLSerializer)) {","                return (new XMLSerializer()).serializeToString(data);","            }","        }","        catch(e) {","            if(data && data.xml) {","                return data.xml;","            }","            else {","                return (LANG.isValue(data) && data.toString) ? data.toString() : \"\";","            }","        }","    }","});","","","","}, '@VERSION@' );"];
_yuitest_coverage["/build/datatype-xml-format/datatype-xml-format.js"].lines = {"1":0,"23":0,"25":0,"34":0,"35":0,"36":0,"40":0,"41":0,"44":0};
_yuitest_coverage["/build/datatype-xml-format/datatype-xml-format.js"].functions = {"format:33":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/datatype-xml-format/datatype-xml-format.js"].coveredLines = 9;
_yuitest_coverage["/build/datatype-xml-format/datatype-xml-format.js"].coveredFunctions = 2;
_yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 1);
YUI.add('datatype-xml-format', function(Y) {

/**
 * Format XML submodule.
 *
 * @module datatype
 * @submodule datatype-xml-format
 */

/**
 * XML submodule.
 *
 * @module datatype
 * @submodule datatype-xml
 */

/**
 * DataType.XML provides a set of utility functions to operate against XML documents.
 *
 * @class DataType.XML
 * @static
 */
_yuitest_coverfunc("/build/datatype-xml-format/datatype-xml-format.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 23);
var LANG = Y.Lang;

_yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 25);
Y.mix(Y.namespace("DataType.XML"), {
    /**
     * Converts data to type XMLDocument.
     *
     * @method format
     * @param data {XMLDoc} Data to convert.
     * @return {String} String.
     */
    format: function(data) {
        _yuitest_coverfunc("/build/datatype-xml-format/datatype-xml-format.js", "format", 33);
_yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 34);
try {
            _yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 35);
if(!LANG.isUndefined(XMLSerializer)) {
                _yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 36);
return (new XMLSerializer()).serializeToString(data);
            }
        }
        catch(e) {
            _yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 40);
if(data && data.xml) {
                _yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 41);
return data.xml;
            }
            else {
                _yuitest_coverline("/build/datatype-xml-format/datatype-xml-format.js", 44);
return (LANG.isValue(data) && data.toString) ? data.toString() : "";
            }
        }
    }
});



}, '@VERSION@' );
