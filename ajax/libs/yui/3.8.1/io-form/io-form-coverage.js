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
_yuitest_coverage["build/io-form/io-form.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/io-form/io-form.js",
    code: []
};
_yuitest_coverage["build/io-form/io-form.js"].code=["YUI.add('io-form', function (Y, NAME) {","","/**","* Extends IO to enable HTML form data serialization, when specified","* in the transaction's configuration object.","* @module io","* @submodule io-form","* @for IO","*/","","var eUC = encodeURIComponent;","","/**"," * Method to enumerate through an HTML form's elements collection"," * and return a string comprised of key-value pairs."," *"," * @method serialize"," * @static"," * @param {Node|String} form YUI form node or HTML form id"," * @param {Object} [options] Configuration options."," * @param {Boolean} [options.useDisabled=false] Whether to include disabled fields."," * @param {Object|String} [options.extra] Extra values to include. May be a query string or an object with key/value pairs."," * @return {String}"," */","Y.IO.stringify = function(form, options) {","    options = options || {};","","    var s = Y.IO.prototype._serialize({","        id: form,","        useDisabled: options.useDisabled","    },","    options.extra && typeof options.extra === 'object' ? Y.QueryString.stringify(options.extra) : options.extra);","","    return s;","};","","Y.mix(Y.IO.prototype, {","   /**","    * Method to enumerate through an HTML form's elements collection","    * and return a string comprised of key-value pairs.","    *","    * @method _serialize","    * @private","    * @param {Object} c","    * @param {String|Element} c.id YUI form node or HTML form id","    * @param {Boolean} c.useDisabled `true` to include disabled fields","    * @param {String} s Key-value data defined in the configuration object.","    * @return {String}","    */","    _serialize: function(c, s) {","        var data = [],","            df = c.useDisabled || false,","            item = 0,","            id = (typeof c.id === 'string') ? c.id : c.id.getAttribute('id'),","            e, f, n, v, d, i, il, j, jl, o;","","        if (!id) {","            id = Y.guid('io:');","            c.id.setAttribute('id', id);","        }","","        f = Y.config.doc.getElementById(id);","","        if (!f || !f.elements) {","            return s || '';","        }","","        // Iterate over the form elements collection to construct the","        // label-value pairs.","        for (i = 0, il = f.elements.length; i < il; ++i) {","            e = f.elements[i];","            d = e.disabled;","            n = e.name;","","            if (df ? n : n && !d) {","                n = eUC(n) + '=';","                v = eUC(e.value);","","                switch (e.type) {","                    // Safari, Opera, FF all default options.value from .text if","                    // value attribute not specified in markup","                    case 'select-one':","                        if (e.selectedIndex > -1) {","                            o = e.options[e.selectedIndex];","                            data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);","                        }","                        break;","                    case 'select-multiple':","                        if (e.selectedIndex > -1) {","                            for (j = e.selectedIndex, jl = e.options.length; j < jl; ++j) {","                                o = e.options[j];","                                if (o.selected) {","                                  data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);","                                }","                            }","                        }","                        break;","                    case 'radio':","                    case 'checkbox':","                        if (e.checked) {","                            data[item++] = n + v;","                        }","                        break;","                    case 'file':","                        // stub case as XMLHttpRequest will only send the file path as a string.","                    case undefined:","                        // stub case for fieldset element which returns undefined.","                    case 'reset':","                        // stub case for input type reset button.","                    case 'button':","                        // stub case for input type button elements.","                        break;","                    case 'submit':","                    default:","                        data[item++] = n + v;","                }","            }","        }","","        if (s) {","            data[item++] = s;","        }","","        return data.join('&');","    }","}, true);","","","}, '@VERSION@', {\"requires\": [\"io-base\", \"node-base\"]});"];
_yuitest_coverage["build/io-form/io-form.js"].lines = {"1":0,"11":0,"25":0,"26":0,"28":0,"34":0,"37":0,"51":0,"57":0,"58":0,"59":0,"62":0,"64":0,"65":0,"70":0,"71":0,"72":0,"73":0,"75":0,"76":0,"77":0,"79":0,"83":0,"84":0,"85":0,"87":0,"89":0,"90":0,"91":0,"92":0,"93":0,"97":0,"100":0,"101":0,"103":0,"112":0,"115":0,"120":0,"121":0,"124":0};
_yuitest_coverage["build/io-form/io-form.js"].functions = {"stringify:25":0,"_serialize:50":0,"(anonymous 1):1":0};
_yuitest_coverage["build/io-form/io-form.js"].coveredLines = 40;
_yuitest_coverage["build/io-form/io-form.js"].coveredFunctions = 3;
_yuitest_coverline("build/io-form/io-form.js", 1);
YUI.add('io-form', function (Y, NAME) {

/**
* Extends IO to enable HTML form data serialization, when specified
* in the transaction's configuration object.
* @module io
* @submodule io-form
* @for IO
*/

_yuitest_coverfunc("build/io-form/io-form.js", "(anonymous 1)", 1);
_yuitest_coverline("build/io-form/io-form.js", 11);
var eUC = encodeURIComponent;

/**
 * Method to enumerate through an HTML form's elements collection
 * and return a string comprised of key-value pairs.
 *
 * @method serialize
 * @static
 * @param {Node|String} form YUI form node or HTML form id
 * @param {Object} [options] Configuration options.
 * @param {Boolean} [options.useDisabled=false] Whether to include disabled fields.
 * @param {Object|String} [options.extra] Extra values to include. May be a query string or an object with key/value pairs.
 * @return {String}
 */
_yuitest_coverline("build/io-form/io-form.js", 25);
Y.IO.stringify = function(form, options) {
    _yuitest_coverfunc("build/io-form/io-form.js", "stringify", 25);
_yuitest_coverline("build/io-form/io-form.js", 26);
options = options || {};

    _yuitest_coverline("build/io-form/io-form.js", 28);
var s = Y.IO.prototype._serialize({
        id: form,
        useDisabled: options.useDisabled
    },
    options.extra && typeof options.extra === 'object' ? Y.QueryString.stringify(options.extra) : options.extra);

    _yuitest_coverline("build/io-form/io-form.js", 34);
return s;
};

_yuitest_coverline("build/io-form/io-form.js", 37);
Y.mix(Y.IO.prototype, {
   /**
    * Method to enumerate through an HTML form's elements collection
    * and return a string comprised of key-value pairs.
    *
    * @method _serialize
    * @private
    * @param {Object} c
    * @param {String|Element} c.id YUI form node or HTML form id
    * @param {Boolean} c.useDisabled `true` to include disabled fields
    * @param {String} s Key-value data defined in the configuration object.
    * @return {String}
    */
    _serialize: function(c, s) {
        _yuitest_coverfunc("build/io-form/io-form.js", "_serialize", 50);
_yuitest_coverline("build/io-form/io-form.js", 51);
var data = [],
            df = c.useDisabled || false,
            item = 0,
            id = (typeof c.id === 'string') ? c.id : c.id.getAttribute('id'),
            e, f, n, v, d, i, il, j, jl, o;

        _yuitest_coverline("build/io-form/io-form.js", 57);
if (!id) {
            _yuitest_coverline("build/io-form/io-form.js", 58);
id = Y.guid('io:');
            _yuitest_coverline("build/io-form/io-form.js", 59);
c.id.setAttribute('id', id);
        }

        _yuitest_coverline("build/io-form/io-form.js", 62);
f = Y.config.doc.getElementById(id);

        _yuitest_coverline("build/io-form/io-form.js", 64);
if (!f || !f.elements) {
            _yuitest_coverline("build/io-form/io-form.js", 65);
return s || '';
        }

        // Iterate over the form elements collection to construct the
        // label-value pairs.
        _yuitest_coverline("build/io-form/io-form.js", 70);
for (i = 0, il = f.elements.length; i < il; ++i) {
            _yuitest_coverline("build/io-form/io-form.js", 71);
e = f.elements[i];
            _yuitest_coverline("build/io-form/io-form.js", 72);
d = e.disabled;
            _yuitest_coverline("build/io-form/io-form.js", 73);
n = e.name;

            _yuitest_coverline("build/io-form/io-form.js", 75);
if (df ? n : n && !d) {
                _yuitest_coverline("build/io-form/io-form.js", 76);
n = eUC(n) + '=';
                _yuitest_coverline("build/io-form/io-form.js", 77);
v = eUC(e.value);

                _yuitest_coverline("build/io-form/io-form.js", 79);
switch (e.type) {
                    // Safari, Opera, FF all default options.value from .text if
                    // value attribute not specified in markup
                    case 'select-one':
                        _yuitest_coverline("build/io-form/io-form.js", 83);
if (e.selectedIndex > -1) {
                            _yuitest_coverline("build/io-form/io-form.js", 84);
o = e.options[e.selectedIndex];
                            _yuitest_coverline("build/io-form/io-form.js", 85);
data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);
                        }
                        _yuitest_coverline("build/io-form/io-form.js", 87);
break;
                    case 'select-multiple':
                        _yuitest_coverline("build/io-form/io-form.js", 89);
if (e.selectedIndex > -1) {
                            _yuitest_coverline("build/io-form/io-form.js", 90);
for (j = e.selectedIndex, jl = e.options.length; j < jl; ++j) {
                                _yuitest_coverline("build/io-form/io-form.js", 91);
o = e.options[j];
                                _yuitest_coverline("build/io-form/io-form.js", 92);
if (o.selected) {
                                  _yuitest_coverline("build/io-form/io-form.js", 93);
data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);
                                }
                            }
                        }
                        _yuitest_coverline("build/io-form/io-form.js", 97);
break;
                    case 'radio':
                    case 'checkbox':
                        _yuitest_coverline("build/io-form/io-form.js", 100);
if (e.checked) {
                            _yuitest_coverline("build/io-form/io-form.js", 101);
data[item++] = n + v;
                        }
                        _yuitest_coverline("build/io-form/io-form.js", 103);
break;
                    case 'file':
                        // stub case as XMLHttpRequest will only send the file path as a string.
                    case undefined:
                        // stub case for fieldset element which returns undefined.
                    case 'reset':
                        // stub case for input type reset button.
                    case 'button':
                        // stub case for input type button elements.
                        _yuitest_coverline("build/io-form/io-form.js", 112);
break;
                    case 'submit':
                    default:
                        _yuitest_coverline("build/io-form/io-form.js", 115);
data[item++] = n + v;
                }
            }
        }

        _yuitest_coverline("build/io-form/io-form.js", 120);
if (s) {
            _yuitest_coverline("build/io-form/io-form.js", 121);
data[item++] = s;
        }

        _yuitest_coverline("build/io-form/io-form.js", 124);
return data.join('&');
    }
}, true);


}, '@VERSION@', {"requires": ["io-base", "node-base"]});
