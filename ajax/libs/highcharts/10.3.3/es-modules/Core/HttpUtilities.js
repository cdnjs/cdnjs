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
/* *
 *
 *  Functions
 *
 * */
/**
 * Perform an Ajax call.
 *
 * @function Highcharts.ajax
 *
 * @param {Highcharts.AjaxSettingsObject} settings
 *        The Ajax settings to use.
 *
 * @return {false|undefined}
 *         Returns false, if error occured.
 */
function ajax(settings) {
    var headers = {
        json: 'application/json',
        xml: 'application/xml',
        text: 'text/plain',
        octet: 'application/octet-stream'
    }, r = new XMLHttpRequest();
    /**
     * Private error handler.
     * @private
     * @param {XMLHttpRequest} xhr
     * Internal request object.
     * @param {string|Error} err
     * Occured error.
     */
    function handleError(xhr, err) {
        if (settings.error) {
            settings.error(xhr, err);
        }
        else {
            // @todo Maybe emit a highcharts error event here
        }
    }
    if (!settings.url) {
        return false;
    }
    r.open((settings.type || 'get').toUpperCase(), settings.url, true);
    if (!settings.headers || !settings.headers['Content-Type']) {
        r.setRequestHeader('Content-Type', headers[settings.dataType || 'json'] || headers.text);
    }
    objectEach(settings.headers, function (val, key) {
        r.setRequestHeader(key, val);
    });
    if (settings.responseType) {
        r.responseType = settings.responseType;
    }
    // @todo lacking timeout handling
    r.onreadystatechange = function () {
        var res;
        if (r.readyState === 4) {
            if (r.status === 200) {
                if (settings.responseType !== 'blob') {
                    res = r.responseText;
                    if (settings.dataType === 'json') {
                        try {
                            res = JSON.parse(res);
                        }
                        catch (e) {
                            if (e instanceof Error) {
                                return handleError(r, e);
                            }
                        }
                    }
                }
                return settings.success && settings.success(res, r);
            }
            handleError(r, r.responseText);
        }
    };
    if (settings.data && typeof settings.data !== 'string') {
        settings.data = JSON.stringify(settings.data);
    }
    r.send(settings.data);
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
        }, void 0, form);
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
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @interface Highcharts.AjaxSettingsObject
 */ /**
* The payload to send.
*
* @name Highcharts.AjaxSettingsObject#data
* @type {string|Highcharts.Dictionary<any>|undefined}
*/ /**
* The data type expected.
* @name Highcharts.AjaxSettingsObject#dataType
* @type {"json"|"xml"|"text"|"octet"|undefined}
*/ /**
* Function to call on error.
* @name Highcharts.AjaxSettingsObject#error
* @type {Function|undefined}
*/ /**
* The headers; keyed on header name.
* @name Highcharts.AjaxSettingsObject#headers
* @type {Highcharts.Dictionary<string>|undefined}
*/ /**
* Function to call on success.
* @name Highcharts.AjaxSettingsObject#success
* @type {Function|undefined}
*/ /**
* The HTTP method to use. For example GET or POST.
* @name Highcharts.AjaxSettingsObject#type
* @type {string|undefined}
*/ /**
* The URL to call.
* @name Highcharts.AjaxSettingsObject#url
* @type {string}
*/
(''); // keeps doclets above in JS file
