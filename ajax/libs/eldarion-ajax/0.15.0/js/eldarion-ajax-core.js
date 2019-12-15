/* ====================================================================
 * eldarion-ajax-core.js v0.13.0
 * ====================================================================
 * Copyright (c) 2015, Eldarion, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *
 *     * Neither the name of Eldarion, Inc. nor the names of its contributors may
 *       be used to endorse or promote products derived from this software without
 *       specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ==================================================================== */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
  strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true,
  indent:4, maxerr:50 */

(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}
}(this, function ($) {
    'use strict';

    var Ajax = function () {};

    Ajax.prototype._ajax = function ($el, url, method, data) {
        $el.trigger('eldarion-ajax:begin', [$el]);
        var newData = $el.triggerHandler('eldarion-ajax:modify-data', data),
            contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
            processData = true,
            cache = true,
            useFormData = typeof data === "object";

        if (newData) {
            data = newData;
        }
        if (useFormData) {
            contentType = false;
            processData = false;
            cache = false;
        }
        $.ajax({
            url: url,
            type: method,
            dataType: 'json',
            data: data,
            cache: cache,
            processData: processData,
            contentType: contentType,
            headers: {'X-Eldarion-Ajax': true}
        }).done( function (responseData, textStatus, jqXHR) {
            if (!responseData) {
                responseData = {};
            }
            $el.trigger('eldarion-ajax:success', [$el, responseData, textStatus, jqXHR]);
        }).fail( function (jqXHR, textStatus, errorThrown) {
            $el.trigger('eldarion-ajax:error', [$el, jqXHR, textStatus, errorThrown]);
        }).always( function (responseData, textStatus, jqXHR) {
            $(document).trigger('eldarion-ajax:complete', [$el, responseData, textStatus, jqXHR]);
        });
    };

    Ajax.prototype.click = function (e) {
        var $this = $(this),
            url = $this.attr('href'),
            method = $this.data('method'),
            data_str = $this.data('data'),
            data = null,
            keyval = null;

        if (!method) {
            method = 'get';
        }

        if (data_str) {
            data = {};
            data_str.split(',').map(
                function(pair) {
                    keyval = pair.split(':');
                    if (keyval[1].indexOf('#') === 0) {
                        data[keyval[0]] = $(keyval[1]).val();
                    } else {
                        data[keyval[0]] = keyval[1];
                    }
                }
            );
        }

        e.preventDefault();

        Ajax.prototype._ajax($this, url, method, data);
    };

    Ajax.prototype.submit = function (e) {
        var $this = $(this),
            url = $this.attr('action'),
            method = $this.attr('method');

        e.preventDefault();

        if (window.FormData === undefined) {
            Ajax.prototype._ajax($this, url, method, $this.serialize());
        } else {
            Ajax.prototype._ajax($this, url, method, new FormData($this[0]));
        }
    };

    Ajax.prototype.cancel = function (e) {
        var $this = $(this),
            selector = $this.attr('data-cancel-closest');
        e.preventDefault();
        $this.closest(selector).remove();
    };

    Ajax.prototype.timeout = function (i, el) {
        var $el = $(el),
            timeout = $el.data('timeout'),
            url = $el.data('url'),
            method = $el.data('method');

        if (!method) {
            method = 'get';
        }

        window.setTimeout(Ajax.prototype._ajax, timeout, $el, url, method, null);
    };

    Ajax.prototype.interval = function (i, el) {
        var $el = $(el),
            interval = $el.data('interval'),
            url = $el.data('url'),
            method = $el.data('method');

        if (!method) {
            method = 'get';
        }

        window.setInterval(Ajax.prototype._ajax, interval, $el, url, method, null);
    };

    $(function () {
        $('body').on('click', 'a.ajax', Ajax.prototype.click);
        $('body').on('submit', 'form.ajax', Ajax.prototype.submit);
        $('body').on('click', 'a[data-cancel-closest]', Ajax.prototype.cancel);

        $('[data-timeout]').each(Ajax.prototype.timeout);
        $('[data-interval]').each(Ajax.prototype.interval);
    });
}));
