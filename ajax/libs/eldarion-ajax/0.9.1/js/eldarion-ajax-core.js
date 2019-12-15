/* ====================================================================
 * eldarion-ajax-core.js v0.7.3
 * ====================================================================
 * Copyright (c) 2013, Eldarion, Inc.
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

(function ($) {
    'use strict';

    var Ajax = function () {};

    Ajax.prototype.click = function (e) {
        var $this = $(this),
            url = $this.attr('href'),
            method = $this.data('method');

        if (!method) {
            method = 'get';
        }

        $this.trigger('eldarion-ajax:begin', [$this]);

        e.preventDefault();

        $.ajax({
            url: url,
            type: method,
            dataType: 'json',
            headers: {'X-Eldarion-Ajax': true},
            statusCode: {
                200: function (data) {
                    if (!data) {
                        data = {};
                    }
                    $this.trigger('eldarion-ajax:success', [$this, data]);
                },
                500: function () {
                    $this.trigger('eldarion-ajax:error', [$this, 500]);
                },
                400: function () {
                    $this.trigger('eldarion-ajax:error', [$this, 400]);
                },
                404: function () {
                    $this.trigger('eldarion-ajax:error', [$this, 404]);
                }
            },
            complete: function (jqXHR, textStatus) {
                $(document).trigger('eldarion-ajax:complete', [$this, jqXHR, textStatus]);
            }
        });
    };

    Ajax.prototype.submit = function (e) {
        var $this = $(this),
            url = $this.attr('action'),
            method = $this.attr('method'),
            data = $this.serialize();

        $this.trigger('eldarion-ajax:begin', [$this]);

        e.preventDefault();

        $.ajax({
            url: url,
            type: method,
            data: data,
            dataType: 'json',
            headers: {'X-Eldarion-Ajax': true},
            statusCode: {
                200: function (data) {
                    if (!data) {
                        data = {};
                    }
                    $this.trigger('eldarion-ajax:success', [$this, data]);
                },
                500: function () {
                    $this.trigger('eldarion-ajax:error', [$this, 500]);
                },
                400: function () {
                    $this.trigger('eldarion-ajax:error', [$this, 400]);
                },
                404: function () {
                    $this.trigger('eldarion-ajax:error', [$this, 404]);
                }
            },
            complete: function (jqXHR, textStatus) {
                $(document).trigger('eldarion-ajax:complete', [$this, jqXHR, textStatus]);
            }
        });
    };

    Ajax.prototype.cancel = function (e) {
        var $this = $(this),
            selector = $this.attr('data-cancel-closest');
        e.preventDefault();
        $this.closest(selector).remove();
    };

    $(function () {
        $('body').on('click', 'a.ajax', Ajax.prototype.click);
        $('body').on('submit', 'form.ajax', Ajax.prototype.submit);
        $('body').on('click', 'a[data-cancel-closest]', Ajax.prototype.cancel);
    });
}(window.jQuery));
