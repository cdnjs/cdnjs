/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('io-form', function (Y, NAME) {

/**
* Extends IO to enable HTML form data serialization, when specified
* in the transaction's configuration object.
* @module io
* @submodule io-form
* @for IO
*/

var eUC = encodeURIComponent;

/**
 * Enumerate through an HTML form's elements collection
 * and return a string comprised of key-value pairs.
 *
 * @method stringify
 * @static
 * @param {Node|String} form YUI form node or HTML form id
 * @param {Object} [options] Configuration options.
 * @param {Boolean} [options.useDisabled=false] Whether to include disabled fields.
 * @param {Object|String} [options.extra] Extra values to include. May be a query string or an object with key/value pairs.
 * @return {String}
 */
Y.IO.stringify = function(form, options) {
    options = options || {};

    var s = Y.IO.prototype._serialize({
        id: form,
        useDisabled: options.useDisabled
    },
    options.extra && typeof options.extra === 'object' ? Y.QueryString.stringify(options.extra) : options.extra);

    return s;
};

Y.mix(Y.IO.prototype, {
   /**
    * Enumerate through an HTML form's elements collection
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
        var data = [],
            df = c.useDisabled || false,
            item = 0,
            id = (typeof c.id === 'string') ? c.id : c.id.getAttribute('id'),
            e, f, n, v, d, i, il, j, jl, o;

        if (!id) {
            id = Y.guid('io:');
            c.id.setAttribute('id', id);
        }

        f = Y.config.doc.getElementById(id);

        if (!f || !f.elements) {
            return s || '';
        }

        // Iterate over the form elements collection to construct the
        // label-value pairs.
        for (i = 0, il = f.elements.length; i < il; ++i) {
            e = f.elements[i];
            d = e.disabled;
            n = e.name;

            if (df ? n : n && !d) {
                n = eUC(n) + '=';
                v = eUC(e.value);

                switch (e.type) {
                    // Safari, Opera, FF all default options.value from .text if
                    // value attribute not specified in markup
                    case 'select-one':
                        if (e.selectedIndex > -1) {
                            o = e.options[e.selectedIndex];
                            data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);
                        }
                        break;
                    case 'select-multiple':
                        if (e.selectedIndex > -1) {
                            for (j = e.selectedIndex, jl = e.options.length; j < jl; ++j) {
                                o = e.options[j];
                                if (o.selected) {
                                  data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);
                                }
                            }
                        }
                        break;
                    case 'radio':
                    case 'checkbox':
                        if (e.checked) {
                            data[item++] = n + v;
                        }
                        break;
                    case 'file':
                        // stub case as XMLHttpRequest will only send the file path as a string.
                    case undefined:
                        // stub case for fieldset element which returns undefined.
                    case 'reset':
                        // stub case for input type reset button.
                    case 'button':
                        // stub case for input type button elements.
                        break;
                    case 'submit':
                    default:
                        data[item++] = n + v;
                }
            }
        }

        if (s) {
            data[item++] = s;
        }

        return data.join('&');
    }
}, true);


}, '3.17.2', {"requires": ["io-base", "node-base"]});
