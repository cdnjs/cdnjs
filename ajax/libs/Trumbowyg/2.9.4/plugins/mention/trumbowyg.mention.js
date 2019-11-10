/* ===========================================================
 * trumbowyg.mention.js v0.1
 * Mention plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Viper
 *          Github: https://github.com/Globulopolis
 *          Website: http://киноархив.com
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        source: '',
        formatDropdownItem: formatDropdownItem,
        formatResult: formatResult
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                mention: 'Mention'
            },
            ru: {
                mention: 'Упомянуть'
            }
        },

        plugins: {
            mention: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.mention = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.mention || {});

                    var btnDef = {
                        dropdown: buildDropdown(trumbowyg.o.plugins.mention.source, trumbowyg)
                    };

                    trumbowyg.addBtnDef('mention', btnDef);
                }
            }
        }
    });

    /**
     * Build dropdown list
     *
     * @param   {Array}   items      Items
     * @param   {object}  trumbowyg  Editor
     *
     * @return  {Array}
     */
    function buildDropdown(items, trumbowyg) {
        var dropdown = [];

        // Check if source is an array
        if (items.constructor === Array) {
            $.each(items, function (i, item) {
                var btn = 'mention-' + i,
                    btnDef = {
                        hasIcon: false,
                        text: trumbowyg.o.plugins.mention.formatDropdownItem(item),
                        fn: function () {
                            trumbowyg.execCmd('insertHTML', trumbowyg.o.plugins.mention.formatResult(item));

                            return true;
                        }
                    };

                trumbowyg.addBtnDef(btn, btnDef);
                dropdown.push(btn);
            });
        }

        return dropdown;
    }

    /**
     * Format item in dropdown.
     *
     * @param   {object}  item  Item object.
     *
     * @return  {string}
     */
    function formatDropdownItem(item) {
        return item.login;
    }

    /**
     * Format result pasted in editor.
     *
     * @param   {object}  item  Item object.
     *
     * @return  {string}
     */
    function formatResult(item) {
        return '@' + item.login + ' ';
    }
})(jQuery);
