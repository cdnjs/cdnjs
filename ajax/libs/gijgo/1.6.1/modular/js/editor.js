/*
 * Gijgo Editor v1.6.1
 * http://gijgo.com/editor
 *
 * Copyright 2014, 2017 gijgo.com
 * Released under the MIT license
 */
if (typeof (gj.editor) === 'undefined') {
    gj.editor = {
        plugins: {},
        messages: []
    };
}

gj.editor.messages['en-us'] = {
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    listBulleted: 'List Bulleted',
    listNumbered: 'List Numbered',
    indentDecrease: 'Indent Decrease',
    indentIncrease: 'Indent Increase',
    alignLeft: 'Align Left',
    alignCenter: 'Align Center',
    alignRight: 'Align Right',
    alignJustify: 'Align Justify',
    undo: 'Undo',
    redo: 'Redo'
};
/* global window alert jQuery */
/**  */if (typeof (gj.editor) === 'undefined') {
    gj.editor = {
        plugins: {}
    };
}

gj.editor.config = {
    base: {

        /** The height of the editor. Numeric values are treated as pixels.         */        height: 300,

        /** The width of the editor. Numeric values are treated as pixels.         */        width: undefined,

        /** The name of the UI library that is going to be in use. Currently we support only Material Design and Bootstrap.          */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons and Font Awesome.         */        iconsLibrary: 'materialicons',

        /** The language that needs to be in use.         */        locale: 'en-us',

        buttons: undefined,

        style: {
            wrapper: 'gj-editor-md',
            buttonsGroup: 'gj-button-md-group',
            button: 'gj-button-md',
            buttonActive: 'active'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-default gj-cursor-pointer',
            buttonActive: 'active'
        },
        iconsLibrary: 'fontawesome'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-outline-secondary gj-cursor-pointer',
            buttonActive: 'active'
        },
        iconsLibrary: 'fontawesome'
    },

    materialicons: {
        icons: {
            bold: '<i class="material-icons">format_bold</i>',
            italic: '<i class="material-icons">format_italic</i>',
            strikethrough: '<i class="material-icons">strikethrough_s</i>',
            underline: '<i class="material-icons">format_underlined</i>',

            listBulleted: '<i class="material-icons">format_list_bulleted</i>',
            listNumbered: '<i class="material-icons">format_list_numbered</i>',
            indentDecrease: '<i class="material-icons">format_indent_decrease</i>',
            indentIncrease: '<i class="material-icons">format_indent_increase</i>',

            alignLeft: '<i class="material-icons">format_align_left</i>',
            alignCenter: '<i class="material-icons">format_align_center</i>',
            alignRight: '<i class="material-icons">format_align_right</i>',
            alignJustify: '<i class="material-icons">format_align_justify</i>',

            undo: '<i class="material-icons">undo</i>',
            redo: '<i class="material-icons">redo</i>'
        }
    },

    fontawesome: {
        icons: {
            bold: '<i class="fa fa-bold" aria-hidden="true"></i>',
            italic: '<i class="fa fa-italic" aria-hidden="true"></i>',
            strikethrough: '<i class="fa fa-strikethrough" aria-hidden="true"></i>',
            underline: '<i class="fa fa-underline" aria-hidden="true"></i>',

            listBulleted: '<i class="fa fa-list-ul" aria-hidden="true"></i>',
            listNumbered: '<i class="fa fa-list-ol" aria-hidden="true"></i>',
            indentDecrease: '<i class="fa fa-indent" aria-hidden="true"></i>',
            indentIncrease: '<i class="fa fa-outdent" aria-hidden="true"></i>',

            alignLeft: '<i class="fa fa-align-left" aria-hidden="true"></i>',
            alignCenter: '<i class="fa fa-align-center" aria-hidden="true"></i>',
            alignRight: '<i class="fa fa-align-right" aria-hidden="true"></i>',
            alignJustify: '<i class="fa fa-align-justify" aria-hidden="true"></i>',

            undo: '<i class="fa fa-undo" aria-hidden="true"></i>',
            redo: '<i class="fa fa-repeat" aria-hidden="true"></i>'
        }
    }
};

gj.editor.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'editor');
        this.attr('data-editor', 'true');
        gj.editor.methods.initialize(this);
        return this;
    },

    initialize: function ($editor) {
        var self = this, data = $editor.data(), $group, $btn,
            $body = $editor.children('div[data-role="body"]'),
            $toolbar = $editor.children('div[data-role="toolbar"]');

        gj.editor.methods.localization(data);

        $editor.addClass(data.style.wrapper);
        if (data.width) {
            $editor.width(data.width);
        }

        if ($body.length === 0) {
            $editor.wrapInner('<div data-role="body"></div>');
            $body = $editor.children('div[data-role="body"]');
        }

        $body.attr('contenteditable', true);

        $body.on('mouseup keyup mouseout', function () {
            self.updateToolbar($editor, $toolbar);
        });

        if ($toolbar.length === 0) {
            $toolbar = $('<div data-role="toolbar"></div>');
            $body.before($toolbar);

            for (var group in data.buttons) {
                $group = $('<div />').addClass(data.style.buttonsGroup);
                for (var btn in data.buttons[group]) {
                    $btn = $(data.buttons[group][btn]);
                    $btn.on('click', function () {
                        gj.editor.methods.executeCmd($editor, $body, $toolbar, $(this));
                    });
                    $group.append($btn);
                }
                $toolbar.append($group);
            }
        }

        $body.height(data.height - $toolbar.outerHeight());
    },

    localization: function (data) {
        var msg = gj.editor.messages[data.locale];
        if (typeof (data.buttons) === 'undefined') {
            data.buttons = [
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.bold + '" data-role="bold">' + data.icons.bold + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.italic + '" data-role="italic">' + data.icons.italic + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.strikethrough + '" data-role="strikethrough">' + data.icons.strikethrough + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.underline + '" data-role="underline">' + data.icons.underline + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listBulleted + '" data-role="insertunorderedlist">' + data.icons.listBulleted + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listNumbered + '" data-role="insertorderedlist">' + data.icons.listNumbered + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentDecrease + '" data-role="outdent">' + data.icons.indentDecrease + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentIncrease + '" data-role="indent">' + data.icons.indentIncrease + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignLeft + '" data-role="justifyleft">' + data.icons.alignLeft + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignCenter + '" data-role="justifycenter">' + data.icons.alignCenter + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignRight + '" data-role="justifyright">' + data.icons.alignRight + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignJustify + '" data-role="justifyfull">' + data.icons.alignJustify + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.undo + '" data-role="undo">' + data.icons.undo + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.redo + '" data-role="redo">' + data.icons.redo + '</button>'
                ]
            ];
        }
    },

    updateToolbar: function ($editor, $toolbar) {
        var data = $editor.data();
        $buttons = $toolbar.find('[data-role]').each(function() {
            var $btn = $(this),
                cmd = $btn.attr('data-role');

            if (cmd && document.queryCommandEnabled(cmd) && document.queryCommandValue(cmd) === "true") {
                $btn.addClass(data.style.buttonActive);
            } else {
                $btn.removeClass(data.style.buttonActive);
            }
        });
        gj.editor.events.change($editor);
    },

    executeCmd: function ($editor, $body, $toolbar, $btn) {
        $body.focus();
        document.execCommand($btn.attr('data-role'), false);
        gj.editor.methods.updateToolbar($editor, $toolbar);
    },

    content: function ($editor, html) {
        var $body = $editor.children('div[data-role="body"]');
        if (typeof (html) === "undefined") {
            return $body.html();
        } else {
            return $body.html(html);
        }
    },

    destroy: function ($editor) {
        if ($editor.attr('data-editor') === 'true') {
            $editor.removeClass($editor.data().style.wrapper);
            $editor.removeData();
            $editor.removeAttr('data-guid');
            $editor.removeAttr('data-editor');
            $editor.off();
            $editor.empty();
        }
        return $editor;
    }
};

gj.editor.events = {
    /**
     * Triggered when the editor text is changed.
     *     */    change: function ($editor) {
        return $editor.triggerHandler('change');
    }
};

gj.editor.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.editor.methods;

    /** Get or set html content in the body.     */    self.content = function (html) {
        return methods.content(this, html);
    };

    /** Remove editor functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-editor')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.editor.widget.prototype = new gj.widget();
gj.editor.widget.constructor = gj.editor.widget;

(function ($) {
    $.fn.editor = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.editor.widget(this, method);
            } else {
                $widget = new gj.editor.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
gj.editor.messages['bg-bg'] = {
	bold: 'Удебеляване',
	italic: 'Накланяне',
	strikethrough: 'Зачертаване',
	underline: 'Подчертаване',
	listBulleted: 'Списък',
	listNumbered: 'Номериран Списък',
	indentDecrease: 'Намаляване на абзаца',
	indentIncrease: 'Увеличаване на абзаца',
	alignLeft: 'Подравняване в ляво',
	alignCenter: 'Центриране',
	alignRight: 'Подравняване в дясно',
	alignJustify: 'Изравняване',
	undo: 'Назад',
	redo: 'Напред'
};
gj.editor.messages['fr-fr'] = {
    bold: 'Gras',
    italic: 'Italique',
    strikethrough: 'Barr\u00e9',
    underline: 'Soulign\u00e9',
    listBulleted: 'Puces',
    listNumbered: 'Num\u00e9rotation',
    indentDecrease: 'Diminuer le retrait',
    indentIncrease: 'Augmenter le retrait',
    alignLeft: 'Aligner \u00e0 gauche',
    alignCenter: 'Centrer',
    alignRight: 'Aligner \u00e0 droite',
    alignJustify: 'Justifier',
    undo: 'Annuler',
    redo: 'R\u00e9tablir'
};
gj.editor.messages['de-de'] = {
    bold: 'Fett',
    italic: 'Kursiv',
    strikethrough: 'Durchgestrichen',
    underline: 'Unterstrichen',
    listBulleted: 'Aufz\u00e4hlung',
    listNumbered: 'Nummerierte Liste',
    indentDecrease: 'Einzug verkleinern',
    indentIncrease: 'Einzug vergr\u00f6\u00dfern',
    alignLeft: 'Linksb\u00fcndig ausrichten',
    alignCenter: 'Zentriert ausrichten',
    alignRight: 'Rechtsb\u00fcndig ausrichten',
    alignJustify: 'Blocksatz',
    undo: 'R\u00fcckg\u00e4ngig',
    redo: 'Wiederholen'
};
gj.editor.messages['pt-br'] = {
    bold: 'Negrito',
    italic: 'It\u00e1lico',
    strikethrough: 'Riscar',
    underline: 'Sublinhar',
    listBulleted: 'Lista n\u00e3o ordenada',
    listNumbered: 'Lista ordenada',
    indentDecrease: 'Diminuir recuo',
    indentIncrease: 'Aumentar recuo',
    alignLeft: 'Alinhar \u00e0 esquerda',
    alignCenter: 'Centralizar',
    alignRight: 'Alinhar \u00e0 direita',
    alignJustify: 'Justificar',
    undo: 'Desfazer',
    redo: 'Refazer'
};
