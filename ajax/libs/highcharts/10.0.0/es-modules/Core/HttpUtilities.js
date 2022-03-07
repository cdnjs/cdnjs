/* *
 *
 *  (c) 2010-2021 Christer Vasseng, Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import G from '../Core/Globals.js';
var doc = G.doc;
import U from '../Core/Utilities.js';
var createElement = U.createElement, discardElement = U.discardElement, merge = U.merge, objectEach = U.objectEach;
/**
 * Perform an Ajax call.
 *
 * @function Highcharts.ajax
 *
 * @param {Partial<Highcharts.AjaxSettingsObject>} attr
 *        The Ajax settings to use.
 *
 * @return {false|undefined}
 *         Returns false, if error occured.
 */
function ajax(attr) {
    var options = merge(true, {
        url: false,
        type: 'get',
        dataType: 'json',
        success: false,
        error: false,
        data: false,
        headers: {}
    }, attr), headers = {
        json: 'application/json',
        xml: 'application/xml',
        text: 'text/plain',
        octet: 'application/octet-stream'
    }, r = new XMLHttpRequest();
    /**
     * @private
     * @param {XMLHttpRequest} xhr
     * Internal request object.
     * @param {string|Error} err
     * Occured error.
     */
    function handleError(xhr, err) {
        if (options.error) {
            options.error(xhr, err);
        }
        else {
            // @todo Maybe emit a highcharts error event here
        }
    }
    if (!options.url) {
        return false;
    }
    r.open(options.type.toUpperCase(), options.url, true);
    if (!options.headers['Content-Type']) {
        r.setRequestHeader('Content-Type', headers[options.dataType] || headers.text);
    }
    objectEach(options.headers, function (val, key) {
        r.setRequestHeader(key, val);
    });
    if (options.responseType) {
        r.responseType = options.responseType;
    }
    // @todo lacking timeout handling
    r.onreadystatechange = function () {
        var res;
        if (r.readyState === 4) {
            if (r.status === 200) {
                if (options.responseType !== 'blob') {
                    res = r.responseText;
                    if (options.dataType === 'json') {
                        try {
                            res = JSON.parse(res);
                        }
                        catch (e) {
                            return handleError(r, e);
                        }
                    }
                }
                return options.success && options.success(res, r);
            }
            handleError(r, r.responseText);
        }
    };
    try {
        options.data = JSON.stringify(options.data);
    }
    catch (e) {
        // empty
    }
    r.send(options.data || true);
}
/**
 * Get a JSON resource over XHR, also supporting CORS without preflight.
 *
 * @function Highcharts.getJSON
 * @param {string} url
 *        The URL to load.
 * @param {Function} success
 *        The success callback. For error handling, use the `Highcharts.ajax`
 *        function instead.
 */
function getJSON(url, success) {
    HttpUtilities.ajax({
        url: url,
        success: success,
        dataType: 'json',
        headers: {
            // Override the Content-Type to avoid preflight problems with CORS
            // in the Highcharts demos
            'Content-Type': 'text/plain'
        }
    });
}
/**
 * The post utility
 *
 * @private
 * @function Highcharts.post
 *
 * @param {string} url
 * Post URL
 *
 * @param {Object} data
 * Post data
 *
 * @param {Highcharts.Dictionary<string>} [formAttributes]
 * Additional attributes for the post request
 */
function post(url, data, formAttributes) {
    // create the form
    var form = createElement('form', merge({
        method: 'post',
        action: url,
        enctype: 'multipart/form-data'
    }, formAttributes), {
        display: 'none'
    }, doc.body);
    // add the data
    objectEach(data, function (val, name) {
        createElement('input', {
            type: 'hidden',
            name: name,
            value: val
        }, null, form);
    });
    // submit
    form.submit();
    // clean up
    discardElement(form);
}
/* *
 *
 *  Default Export
 *
 * */
var HttpUtilities = {
    ajax: ajax,
    getJSON: getJSON,
    post: post
};
export default HttpUtilities;
/**
 * @interface Highcharts.AjaxSettingsObject
 */ /**
* The payload to send.
*
* @name Highcharts.AjaxSettingsObject#data
* @type {string|Highcharts.Dictionary<any>}
*/ /**
* The data type expected.
* @name Highcharts.AjaxSettingsObject#dataType
* @type {"json"|"xml"|"text"|"octet"}
*/ /**
* Function to call on error.
* @name Highcharts.AjaxSettingsObject#error
* @type {Function}
*/ /**
* The headers; keyed on header name.
* @name Highcharts.AjaxSettingsObject#headers
* @type {Highcharts.Dictionary<string>}
*/ /**
* Function to call on success.
* @name Highcharts.AjaxSettingsObject#success
* @type {Function}
*/ /**
* The HTTP method to use. For example GET or POST.
* @name Highcharts.AjaxSettingsObject#type
* @type {string}
*/ /**
* The URL to call.
* @name Highcharts.AjaxSettingsObject#url
* @type {string}
*/
(''); // keeps doclets above in JS file
