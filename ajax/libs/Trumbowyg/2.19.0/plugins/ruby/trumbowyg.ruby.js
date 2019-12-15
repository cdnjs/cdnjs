/* ===========================================================
 * trumbowyg.ruby.js v1.0
 * Ruby text plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author	: Fathi Anshory (0x00000F5C)
 * Twitter	: @fscchannl
 * Comment	: Since I use trumbowyg in my project and required it to insert ruby text, so I thought I can contribute a little. :D
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                ruby: 'Add ruby text',
                rubyModal: 'Ruby modal',
                rubyText: 'Ruby text'
            },
            da: {
                ruby: 'Tilføj ruby tekst',
                rubyModal: 'Ruby modal',
                rubyText: 'Ruby tekst'
            },
            fr: {
                ruby: 'Ajouter du texte ruby',
                rubyModal: 'Modale ruby',
                rubyText: 'Texte ruby'
            },
            id: {
                ruby: 'Sisipkan teks ruby',
                rubyModal: 'Modal teks ruby',
                rubyText: 'Teks ruby'
            },
            tr: {
                ruby: 'Ruby metni ekle',
                rubyModal: 'Ruby modal',
                rubyText: 'Ruby metni'
            },
            zh_tw: {
                ruby: '加入 ruby 文字',
                rubyModal: 'Ruby 彈跳視窗',
                rubyText: 'Ruby 文字'
            },
            pt_br: {
                ruby: 'Adicionar texto ruby',
                rubyModal: 'Modal ruby',
                rubyText: 'Texto ruby'
            },
            ko: {
                ruby: '루비 문자 넣기',
                rubyModal: '대상 문자',
                rubyText: '루비 문자'
            },
        },
        plugins: {
            ruby: {
                init: function (trumbowyg) {
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();
                            trumbowyg.openModalInsert(
                                trumbowyg.lang.ruby,
                                {
                                    rubyText: {
                                        label: trumbowyg.lang.rubyText,
                                        required: false,
                                    },
                                    modal: {
                                        label: trumbowyg.lang.rubyModal,
                                        value: trumbowyg.getRangeText(),
                                        required: true
                                    }
                                },
                                function (v) {
                                    var node = $('<ruby title="' + v.rubyText + '">' + v.modal + '<rp> (</rp><rt>' + v.rubyText + '</rt><rp>)</rp></ruby>')[0];
                                    trumbowyg.range.deleteContents();
                                    trumbowyg.range.insertNode(node);
                                    trumbowyg.syncCode();
                                    trumbowyg.$c.trigger('tbwchange');
                                    return true;
                                }
                            );
                        }
                    };
                    trumbowyg.addBtnDef('ruby', btnDef);
                }
            }
        }
    });
})(jQuery);
