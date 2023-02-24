/* ===========================================================
 * trumbowyg.pasteembed.js v1.0
 * Url paste to iframe with noembed. Plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Max Seelig
 *          Facebook : https://facebook.com/maxse
 *          Website : https://www.maxmade.nl/
 */

(function($) {
    'use strict';

    var defaultOptions = {
        enabled: true,
        endpoints: [
            'https://noembed.com/embed?nowrap=on',
            'https://api.maxmade.nl/url2iframe/embed'
        ]
    };

    $.extend(true, $.trumbowyg, {
        plugins: {
            pasteEmbed: {
                init: function(trumbowyg) {
                    trumbowyg.o.plugins.pasteEmbed = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.pasteEmbed || {});

                    if (!trumbowyg.o.plugins.pasteEmbed.enabled) {
                        return;
                    }

                    trumbowyg.pasteHandlers.push(function(pasteEvent) {
                        try {
                            var clipboardData = (pasteEvent.originalEvent || pasteEvent).clipboardData,
                                pastedData = clipboardData.getData('Text'),
                                endpoints = trumbowyg.o.plugins.pasteEmbed.endpoints,
                                request = null;

                            if (pastedData.startsWith('http')) {
                                pasteEvent.stopPropagation();
                                pasteEvent.preventDefault();

                                var query = {
                                    url: pastedData.trim()
                                };
                                var content = '';
                                var index = 0;

                                if (request && request.transport) {
                                    request.transport.abort();
                                }

                                request = $.ajax({
                                    crossOrigin: true,
                                    url: endpoints[index],
                                    type: 'GET',
                                    data: query,
                                    cache: false,
                                    dataType: 'jsonp',
                                    success: function(res) {
                                        if (res.html) {
                                            index = 0;
                                            content = res.html;
                                        } else {
                                            index += 1;
                                        }
                                    },
                                    error: function() {
                                        index += 1;
                                    },
                                    complete: function() {
                                        if (content.length === 0 && index < endpoints.length - 1) {
                                            this.url = endpoints[index];
                                            this.data = query;
                                            $.ajax(this);
                                        }
                                        if (index === endpoints.length - 1) {
                                            content = $('<a>', {
                                                href: pastedData,
                                                text: pastedData
                                            }).prop('outerHTML');
                                        }
                                        if (content.length > 0) {
                                            index = 0;
                                            trumbowyg.execCmd('insertHTML', content);
                                        }
                                    }
                                });
                            }
                        } catch (c) {}
                    });
                }
            }
        }
    });
})(jQuery);
