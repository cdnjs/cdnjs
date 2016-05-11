/* ===========================================================
 * trumbowyg.editlink.js v1.0
 * Link editation plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Rastislav Švarba (ra100)
 *          Twitter : @ra100
 *          Website : ra100.net
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                editLink: 'Edit Link'
            },
            fr: {
                editLink: 'Editer un lien'
            },
            cs: {
                editLink: 'Upravit odkaz'
            },
            sk: {
                editLink: 'Upraviť odkaz'
            }
        },
        opts: {
            btnsDef: {
                editLink: {
                    func: function (params, tbw) {
                        var t = tbw,
                            url = '',
                            title = '',
                            target = '_blank',
                            node = '',
                            edit = false;

                        var sel = t.doc.getSelection();
                        var range = new Range();
                        if (sel.type === 'Caret') { //if range is not selected, select whole <a> element
                            range.selectNode(sel.baseNode);
                            sel.addRange(range);
                            t.saveSelection();
                            node = t.selection.commonAncestorContainer;
                        } else {
                            if ((sel.anchorOffset + sel.focusOffset) === sel.focusNode.length) { //if selection is large as whole <a>
                                range.selectNode(sel.focusNode);
                                sel.addRange(range);
                                t.saveSelection();
                                node = t.selection.commonAncestorContainer;
                            } else {
                                t.saveSelection();
                                node = t.selection.commonAncestorContainer.parentNode;
                            }
                        }

                        if (node !== '' && $(node).prop('tagName') === 'A') {
                            var $a = $(node);
                            url = $a.attr('href');
                            title = ($a.attr('title') !== undefined) ? $a.attr('title') : $a.text();
                            target = ($a.attr('target') !== undefined) ? $a.attr('target') : target;
                            edit = true;
                        }

                        t.openModalInsert(t.lang.editLink, {
                            url: {
                                label: 'URL',
                                required: true,
                                value: url
                            },
                            title: {
                                label: t.lang.title,
                                value: title
                            },
                            text: {
                                label: t.lang.text,
                                value: t.getSelectedText()
                            },
                            target: {
                                label: t.lang.target,
                                value: target
                            }
                        }, function (v) { // v is value
                            t.execCmd('createLink', v.url);
                            if (!edit) return true;
                            var l = $('a[href="' + v.url + '"]:not([title])', t.$box);
                            if (v.text.length > 0) {
                                l.text(v.text);
                            }
                            if (v.title.length > 0) {
                                l.attr('title', v.title);
                            } else {
                                l.removeAttr('title');
                            }
                            if (v.target.length > 0) {
                                l.attr('target', v.target);
                            } else {
                                l.removeAttr('target');
                            }
                            return true;
                        });
                    }
                },
                link: {
                    dropdown: ['createLink', 'editLink', 'unlink']
                }
            }
        }
    });
})(jQuery);