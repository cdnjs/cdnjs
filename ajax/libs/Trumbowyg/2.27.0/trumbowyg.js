/**
 * Trumbowyg v2.27.0 - A lightweight WYSIWYG editor
 * Trumbowyg core file
 * ------------------------
 * @link http://alex-d.github.io/Trumbowyg
 * @license MIT
 * @author Alexandre Demode (Alex-D)
 *         Twitter : @AlexandreDemode
 *         Website : alex-d.fr
 */

jQuery.trumbowyg = {
    langs: {
        en: {
            viewHTML: 'View HTML',

            undo: 'Undo',
            redo: 'Redo',

            formatting: 'Formatting',
            p: 'Paragraph',
            blockquote: 'Quote',
            code: 'Code',
            header: 'Header',

            bold: 'Bold',
            italic: 'Italic',
            strikethrough: 'Strikethrough',
            underline: 'Underline',

            strong: 'Strong',
            em: 'Emphasis',
            del: 'Deleted',

            superscript: 'Superscript',
            subscript: 'Subscript',

            unorderedList: 'Unordered list',
            orderedList: 'Ordered list',

            insertImage: 'Insert Image',
            link: 'Link',
            createLink: 'Insert link',
            unlink: 'Remove link',

            _self: 'Same tab (default)',
            _blank: 'New tab',

            justifyLeft: 'Align Left',
            justifyCenter: 'Align Center',
            justifyRight: 'Align Right',
            justifyFull: 'Align Justify',

            horizontalRule: 'Insert horizontal rule',
            removeformat: 'Remove format',

            fullscreen: 'Fullscreen',

            close: 'Close',

            submit: 'Confirm',
            reset: 'Cancel',

            required: 'Required',
            description: 'Description',
            title: 'Title',
            text: 'Text',
            target: 'Target',
            width: 'Width'
        }
    },

    // Plugins
    plugins: {},

    // SVG Path globally
    svgPath: null,
    svgAbsoluteUseHref: false,

    hideButtonTexts: null
};

// Makes default options read-only
Object.defineProperty(jQuery.trumbowyg, 'defaultOptions', {
    value: {
        lang: 'en',

        fixedBtnPane: false,
        fixedFullWidth: false,
        autogrow: false,
        autogrowOnEnter: false,
        imageWidthModalEdit: false,
        hideButtonTexts: null,

        prefix: 'trumbowyg-',
        tagClasses: {},
        semantic: true,
        semanticKeepAttributes: false,
        resetCss: false,
        removeformatPasted: false,
        tabToIndent: false,
        tagsToRemove: [],
        tagsToKeep: ['hr', 'img', 'embed', 'iframe', 'input'],
        btns: [
            ['viewHTML'],
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em', 'del'],
            ['superscript', 'subscript'],
            ['link'],
            ['insertImage'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
        ],
        // For custom button definitions
        btnsDef: {},
        changeActiveDropdownIcon: false,

        inlineElementsSelector: 'a,abbr,acronym,b,caption,cite,code,col,dfn,dir,dt,dd,em,font,hr,i,kbd,li,q,span,strikeout,strong,sub,sup,u',

        pasteHandlers: [],

        // imgDblClickHandler: default is defined in constructor

        plugins: {},

        urlProtocol: false,
        minimalLinks: false,
        linkTargets: ['_self', '_blank'],

        svgPath: null
    },
    writable: false,
    enumerable: true,
    configurable: false
});

(function (navigator, window, document, $) {
    'use strict';

    var CONFIRM_EVENT = 'tbwconfirm',
        CANCEL_EVENT = 'tbwcancel';

    $.fn.trumbowyg = function (options, params) {
        var trumbowygDataName = 'trumbowyg';
        if (options === Object(options) || !options) {
            return this.each(function () {
                if (!$(this).data(trumbowygDataName)) {
                    $(this).data(trumbowygDataName, new Trumbowyg(this, options));
                }
            });
        }
        if (this.length === 1) {
            try {
                var t = $(this).data(trumbowygDataName);
                switch (options) {
                    // Exec command
                    case 'execCmd':
                        return t.execCmd(params.cmd, params.param, params.forceCss, params.skipTrumbowyg);

                    // Modal box
                    case 'openModal':
                        return t.openModal(params.title, params.content);
                    case 'closeModal':
                        return t.closeModal();
                    case 'openModalInsert':
                        return t.openModalInsert(params.title, params.fields, params.callback);

                    // Range
                    case 'saveRange':
                        return t.saveRange();
                    case 'getRange':
                        return t.range;
                    case 'getRangeText':
                        return t.getRangeText();
                    case 'restoreRange':
                        return t.restoreRange();

                    // Enable/disable
                    case 'enable':
                        return t.setDisabled(false);
                    case 'disable':
                        return t.setDisabled(true);

                    // Toggle
                    case 'toggle':
                        return t.toggle();

                    // Destroy
                    case 'destroy':
                        return t.destroy();

                    // Empty
                    case 'empty':
                        return t.empty();

                    // HTML
                    case 'html':
                        return t.html(params);
                }
            } catch (c) {
            }
        }

        return false;
    };

    // @param: editorElem is the DOM element
    var Trumbowyg = function (editorElem, options) {
        var t = this,
            trumbowygIconsId = 'trumbowyg-icons',
            $trumbowyg = $.trumbowyg;

        // Get the document of the element. It use to makes the plugin
        // compatible on iframes.
        t.doc = editorElem.ownerDocument || document;

        // jQuery object of the editor
        t.$ta = $(editorElem); // $ta : Textarea
        t.$c = $(editorElem); // $c : creator

        options = options || {};

        // Localization management
        if (options.lang != null || $trumbowyg.langs[options.lang] != null) {
            t.lang = $.extend(true, {}, $trumbowyg.langs.en, $trumbowyg.langs[options.lang]);
        } else {
            t.lang = $trumbowyg.langs.en;
        }

        t.hideButtonTexts = $trumbowyg.hideButtonTexts != null ? $trumbowyg.hideButtonTexts : options.hideButtonTexts;

        // SVG path
        var svgPathOption = $trumbowyg.svgPath != null ? $trumbowyg.svgPath : options.svgPath;
        t.hasSvg = svgPathOption !== false;

        if (svgPathOption !== false && ($trumbowyg.svgAbsoluteUseHref || $('#' + trumbowygIconsId, t.doc).length === 0)) {
            if (svgPathOption == null) {
                // Hack to get svgPathOption based on trumbowyg.js path
                var $scriptElements = $('script[src]');
                $scriptElements.each(function (i, scriptElement) {
                    var source = scriptElement.src;
                    var matches = source.match('trumbowyg(\.min)?\.js');
                    if (matches != null) {
                        svgPathOption = source.substring(0, source.indexOf(matches[0])) + 'ui/icons.svg';
                    }
                });
            }

            // Do not merge with previous if block: svgPathOption can be redefined in it.
            // Here we are checking that we find a match
            if (svgPathOption == null) {
                console.warn('You must define svgPath: https://goo.gl/CfTY9U'); // jshint ignore:line
            } else if (!$trumbowyg.svgAbsoluteUseHref) {
                var div = t.doc.createElement('div');
                div.id = trumbowygIconsId;
                t.doc.body.insertBefore(div, t.doc.body.childNodes[0]);
                $.ajax({
                    async: true,
                    type: 'GET',
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    dataType: 'xml',
                    crossDomain: true,
                    url: svgPathOption,
                    data: null,
                    beforeSend: null,
                    complete: null,
                    success: function (data) {
                        div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
                    }
                });
            }
        }

        var baseHref = !!t.doc.querySelector('base') ? window.location.href.replace(window.location.hash, '') : '';
        t.svgPath = $trumbowyg.svgAbsoluteUseHref ? svgPathOption : baseHref;


        /**
         * When the button is associated to a empty object
         * fn and title attributes are defined from the button key value
         *
         * For example
         *      foo: {}
         * is equivalent to :
         *      foo: {
         *          fn: 'foo',
         *          title: this.lang.foo
         *      }
         */
        var h = t.lang.header, // Header translation
            isBlinkFunction = function () {
                return (window.chrome || (window.Intl && Intl.v8BreakIterator)) && 'CSS' in window;
            };
        t.btnsDef = {
            viewHTML: {
                fn: 'toggle',
                class: 'trumbowyg-not-disable',
            },

            undo: {
                isSupported: isBlinkFunction,
                key: 'Z'
            },
            redo: {
                isSupported: isBlinkFunction,
                key: 'Y'
            },

            p: {
                fn: 'formatBlock'
            },
            blockquote: {
                fn: 'formatBlock'
            },
            h1: {
                fn: 'formatBlock',
                title: h + ' 1'
            },
            h2: {
                fn: 'formatBlock',
                title: h + ' 2'
            },
            h3: {
                fn: 'formatBlock',
                title: h + ' 3'
            },
            h4: {
                fn: 'formatBlock',
                title: h + ' 4'
            },
            h5: {
                fn: 'formatBlock',
                title: h + ' 5'
            },
            h6: {
                fn: 'formatBlock',
                title: h + ' 6'
            },
            subscript: {
                tag: 'sub'
            },
            superscript: {
                tag: 'sup'
            },

            bold: {
                key: 'B',
                tag: 'b'
            },
            italic: {
                key: 'I',
                tag: 'i'
            },
            underline: {
                tag: 'u'
            },
            strikethrough: {
                tag: 'strike'
            },

            strong: {
                fn: 'bold',
                key: 'B'
            },
            em: {
                fn: 'italic',
                key: 'I'
            },
            del: {
                fn: 'strikethrough'
            },

            createLink: {
                key: 'K',
                tag: 'a'
            },
            unlink: {},

            insertImage: {},

            justifyLeft: {
                tag: 'left',
                forceCss: true
            },
            justifyCenter: {
                tag: 'center',
                forceCss: true
            },
            justifyRight: {
                tag: 'right',
                forceCss: true
            },
            justifyFull: {
                tag: 'justify',
                forceCss: true
            },

            unorderedList: {
                fn: 'insertUnorderedList',
                tag: 'ul'
            },
            orderedList: {
                fn: 'insertOrderedList',
                tag: 'ol'
            },

            horizontalRule: {
                fn: 'insertHorizontalRule'
            },

            removeformat: {},

            fullscreen: {
                class: 'trumbowyg-not-disable'
            },
            close: {
                fn: 'destroy',
                class: 'trumbowyg-not-disable'
            },

            // Dropdowns
            formatting: {
                dropdown: ['p', 'blockquote', 'h1', 'h2', 'h3', 'h4'],
                ico: 'p'
            },
            link: {
                dropdown: ['createLink', 'unlink']
            }
        };

        // Default Options
        t.o = $.extend(true, {}, $trumbowyg.defaultOptions, options);
        if (!t.o.hasOwnProperty('imgDblClickHandler')) {
            t.o.imgDblClickHandler = t.getDefaultImgDblClickHandler();
        }

        t.urlPrefix = t.setupUrlPrefix();

        t.disabled = t.o.disabled || (editorElem.nodeName === 'TEXTAREA' && editorElem.disabled);

        if (options.btns) {
            t.o.btns = options.btns;
        } else if (!t.o.semantic) {
            t.o.btns[3] = ['bold', 'italic', 'underline', 'strikethrough'];
        }

        $.each(t.o.btnsDef, function (btnName, btnDef) {
            t.addBtnDef(btnName, btnDef);
        });

        // put this here in the event it would be merged in with options
        t.eventNamespace = 'trumbowyg-event';

        // Keyboard shortcuts are load in this array
        t.keys = [];

        // Tag to button dynamically hydrated
        t.tagToButton = {};
        t.tagHandlers = [];

        // Admit multiple paste handlers
        t.pasteHandlers = [].concat(t.o.pasteHandlers);

        // Check if browser is IE
        t.isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') !== -1;

        // Check if we are on macOs
        t.isMac = navigator.platform.toUpperCase().indexOf('MAC') !== -1;

        t.init();
    };

    Trumbowyg.prototype = {
        DEFAULT_SEMANTIC_MAP: {
            'b': 'strong',
            'i': 'em',
            's': 'del',
            'strike': 'del',
            'div': 'p'
        },

        init: function () {
            var t = this;
            t.height = t.$ta.height();

            t.initPlugins();

            try {
                // Disable image resize, try-catch for old IE
                t.doc.execCommand('enableObjectResizing', false, false);
                t.doc.execCommand('defaultParagraphSeparator', false, 'p');
            } catch (e) {
            }

            t.buildEditor();
            t.buildBtnPane();

            t.fixedBtnPaneEvents();

            t.buildOverlay();

            setTimeout(function () {
                if (t.disabled) {
                    t.setDisabled(true);
                }
                t.$c.trigger('tbwinit');
            });
        },

        addBtnDef: function (btnName, btnDef) {
            this.btnsDef[btnName] = $.extend(btnDef, this.btnsDef[btnName] || {});
        },

        setupUrlPrefix: function () {
            var protocol = this.o.urlProtocol;
            if (!protocol) {
                return;
            }

            if (typeof (protocol) !== 'string') {
                return 'https://';
            }
            return protocol.replace('://', '') + '://';
        },

        buildEditor: function () {
            var t = this,
                prefix = t.o.prefix,
                html = '';

            t.$box = $('<div/>', {
                class: prefix + 'box ' + prefix + 'editor-visible ' + prefix + t.o.lang + ' trumbowyg'
            });

            t.$edBox = $('<div/>', {
                class: prefix + 'editor-box',
            });

            // $ta = Textarea
            // $ed = Editor
            t.isTextarea = t.$ta.is('textarea');
            if (t.isTextarea) {
                html = t.$ta.val();
                t.$ed = $('<div/>')
                    .appendTo(t.$edBox);
                t.$box
                    .insertAfter(t.$ta)
                    .append(t.$edBox, t.$ta);
            } else {
                t.$ed = t.$ta;
                html = t.$ed.html();

                t.$ta = $('<textarea/>', {
                    name: t.$ta.attr('id'),
                    height: t.height
                }).val(html);

                t.$box
                    .insertAfter(t.$ed)
                    .append(t.$ta, t.$edBox);
                t.$edBox.append(t.$ed);
                t.syncCode();
            }

            t.$ta
                .addClass(prefix + 'textarea')
                .attr('tabindex', -1)
            ;

            t.$ed
                .addClass(prefix + 'editor')
                .attr({
                    contenteditable: true,
                    dir: t.lang._dir || 'ltr'
                })
                .html(html)
            ;

            if (t.o.tabindex) {
                t.$ed.attr('tabindex', t.o.tabindex);
            }

            if (t.$c.is('[placeholder]')) {
                t.$ed.attr('placeholder', t.$c.attr('placeholder'));
            }

            if (t.$c.is('[spellcheck]')) {
                t.$ed.attr('spellcheck', t.$c.attr('spellcheck'));
            }

            if (t.o.resetCss) {
                t.$ed.addClass(prefix + 'reset-css');
            }

            if (!t.o.autogrow) {
                t.$ta.add(t.$edBox).css({
                    height: t.height
                });
            }

            t.semanticCode();

            if (t.o.autogrowOnEnter) {
                t.$ed.addClass(prefix + 'autogrow-on-enter');
            }

            var ctrl = false,
                composition = false,
                debounceButtonPaneStatus;

            t.$ed
                .on('dblclick', 'img', t.o.imgDblClickHandler)
                .on('keydown', function (e) {
                    // append flags to differentiate Chrome spans
                    var keyCode = e.which;
                    if (keyCode === 8 || keyCode === 13 || keyCode === 46) {
                        t.toggleSpan(true);
                    }
                    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                        ctrl = true;
                        var key = t.keys[String.fromCharCode(e.which).toUpperCase()];

                        try {
                            t.execCmd(key.fn, key.param);
                            return false;
                        } catch (c) {
                        }
                    } else {
                        if (t.o.tabToIndent && e.key === 'Tab') {
                            try {
                                if (e.shiftKey) {
                                    t.execCmd('outdent', true, null);
                                } else {
                                    t.execCmd('indent', true, null);
                                }
                                return false;
                            } catch (c) {
                            }
                        }
                    }
                })
                .on('compositionstart compositionupdate', function () {
                    composition = true;
                })
                .on('keyup compositionend', function (e) {
                    if (e.type === 'compositionend') {
                        composition = false;
                    } else if (composition) {
                        return;
                    }

                    var keyCode = e.which;

                    if (keyCode >= 37 && keyCode <= 40) {
                        return;
                    }

                    // remove Chrome generated span tags
                    if (keyCode === 8 || keyCode === 13 || keyCode === 46) {
                        t.toggleSpan();
                    }

                    if ((e.ctrlKey || e.metaKey) && (keyCode === 89 || keyCode === 90)) {
                        t.semanticCode(false, true);
                        t.$c.trigger('tbwchange');
                    } else if (!ctrl && keyCode !== 16 && keyCode !== 17) {
                        var compositionEndIE = t.isIE ? e.type === 'compositionend' : true;
                        t.semanticCode(false, compositionEndIE && keyCode === 13);
                        t.$c.trigger('tbwchange');
                    } else if (typeof e.which === 'undefined') {
                        t.semanticCode(false, false, true);
                    }

                    setTimeout(function () {
                        ctrl = false;
                    }, 50);
                })
                .on('input', function (e) {
                    // Trigger change event when spelling fixes applied
                    var event = e.originalEvent;
                    if (typeof event === 'object' && (event.inputType === 'insertReplacementText' ||
                        (event.inputType === 'insertText' && event.data === null))) {
                        t.$c.trigger('tbwchange');
                    }
                })
                .on('mouseup keydown keyup', function (e) {
                    if ((!e.ctrlKey && !e.metaKey) || e.altKey) {
                        setTimeout(function () { // "hold on" to the ctrl key for 50ms
                            ctrl = false;
                        }, 50);
                    }
                    clearTimeout(debounceButtonPaneStatus);
                    debounceButtonPaneStatus = setTimeout(function () {
                        t.updateButtonPaneStatus();
                    }, 50);
                })
                .on('focus blur', function (e) {
                    if (e.type === 'blur') {
                        t.clearButtonPaneStatus();
                    }
                    t.$c.trigger('tbw' + e.type);
                    if (t.o.autogrowOnEnter) {
                        if (t.autogrowOnEnterDontClose) {
                            return;
                        }
                        if (e.type === 'focus') {
                            t.autogrowOnEnterWasFocused = true;
                            t.autogrowEditorOnEnter();
                        } else if (!t.o.autogrow) {
                            t.$edBox.css({height: t.$edBox.css('min-height')});
                            t.$c.trigger('tbwresize');
                        }
                    }
                })
                .on('keyup focus', function () {
                  if (!t.$ta.val().match(/<.*>/) && !t.$ed.html().match(/<.*>/)) {
                        setTimeout(function () {
                            var block = t.isIE ? '<p>' : 'p';
                            t.doc.execCommand('formatBlock', false, block);
                            t.syncCode();
                        }, 0);
                    }
                })
                .on('cut drop', function () {
                    setTimeout(function () {
                        t.semanticCode(false, true);
                        t.$c.trigger('tbwchange');
                    }, 0);
                })
                .on('paste', function (e) {
                    if (t.o.removeformatPasted) {
                        e.preventDefault();

                        if (window.getSelection && window.getSelection().deleteFromDocument) {
                            window.getSelection().deleteFromDocument();
                        }

                        try {
                            // IE
                            var text = window.clipboardData.getData('Text');

                            try {
                                // <= IE10
                                t.doc.selection.createRange().pasteHTML(text);
                            } catch (c) {
                                // IE 11
                                t.doc.getSelection().getRangeAt(0).insertNode(t.doc.createTextNode(text));
                            }
                            t.$c.trigger('tbwchange', e);
                        } catch (d) {
                            // Not IE
                            t.execCmd('insertText', (e.originalEvent || e).clipboardData.getData('text/plain'));
                        }
                    }

                    // Call pasteHandlers
                    $.each(t.pasteHandlers, function (i, pasteHandler) {
                        pasteHandler(e);
                    });

                    setTimeout(function () {
                        t.semanticCode(false, true);
                        t.$c.trigger('tbwpaste', e);
                        t.$c.trigger('tbwchange');
                    }, 0);
                });

            t.$ta
                .on('keyup', function () {
                    t.$c.trigger('tbwchange');
                })
                .on('paste', function () {
                    setTimeout(function () {
                        t.$c.trigger('tbwchange');
                    }, 0);
                });

            $(t.doc.body).on('keydown.' + t.eventNamespace, function (e) {
                if (e.which === 27 && $('.' + prefix + 'modal-box').length >= 1) {
                    t.closeModal();
                    return false;
                }
            });
        },

        //autogrow when entering logic
        autogrowEditorOnEnter: function () {
            var t = this;
            t.$ed.removeClass('autogrow-on-enter');
            var oldHeight = t.$ed[0].clientHeight;
            t.$edBox.height('auto');
            var totalHeight = t.$ed[0].scrollHeight;
            t.$ed.addClass('autogrow-on-enter');
            if (oldHeight !== totalHeight) {
                t.$edBox.height(oldHeight);
                setTimeout(function () {
                    t.$edBox.css({height: totalHeight});
                    t.$c.trigger('tbwresize');
                }, 0);
            }
        },


        // Build button pane, use o.btns option
        buildBtnPane: function () {
            var t = this,
                prefix = t.o.prefix;

            var $btnPane = t.$btnPane = $('<div/>', {
                class: prefix + 'button-pane'
            });

            $.each(t.o.btns, function (i, btnGrp) {
                if (!Array.isArray(btnGrp)) {
                    btnGrp = [btnGrp];
                }

                var $btnGroup = $('<div/>', {
                    class: prefix + 'button-group ' + ((btnGrp.indexOf('fullscreen') >= 0) ? prefix + 'right' : '')
                });
                $.each(btnGrp, function (i, btn) {
                    try { // Prevent buildBtn error
                        if (t.isSupportedBtn(btn)) { // It's a supported button
                            $btnGroup.append(t.buildBtn(btn));
                        }
                    } catch (c) {
                    }
                });

                if ($btnGroup.html().trim().length > 0) {
                    $btnPane.append($btnGroup);
                }
            });

            t.$box.prepend($btnPane);
        },


        // Build a button and his action
        buildBtn: function (btnName) { // btnName is name of the button
            var t = this,
                prefix = t.o.prefix,
                btn = t.btnsDef[btnName],
                isDropdown = btn.dropdown,
                hasIcon = btn.hasIcon != null ? btn.hasIcon : true,
                textDef = t.lang[btnName] || btnName,

                $btn = $('<button/>', {
                    type: 'button',
                    class: prefix + btnName + '-button ' + (btn.class || '') + (!hasIcon ? ' ' + prefix + 'textual-button' : ''),
                    html: t.hasSvg && hasIcon ?
                        '<svg><use xlink:href="' + t.svgPath + '#' + prefix + (btn.ico || btnName).replace(/([A-Z]+)/g, '-$1').toLowerCase() + '"/></svg>' :
                        t.hideButtonTexts ? '' : (btn.text || btn.title || t.lang[btnName] || btnName),
                    title: (btn.title || btn.text || textDef) + (btn.key ? ' (' + (t.isMac ? 'Cmd' : 'Ctrl') + ' + ' + btn.key + ')' : ''),
                    tabindex: -1,
                    mousedown: function () {
                        if (!isDropdown || $('.' + btnName + '-' + prefix + 'dropdown', t.$box).is(':hidden')) {
                            $('body', t.doc).trigger('mousedown');
                        }

                        if ((t.$btnPane.hasClass(prefix + 'disable') || t.$box.hasClass(prefix + 'disabled')) &&
                            !$(this).hasClass(prefix + 'active') &&
                            !$(this).hasClass(prefix + 'not-disable')) {
                            return false;
                        }

                        t.execCmd((isDropdown ? 'dropdown' : false) || btn.fn || btnName, btn.param || btnName, btn.forceCss);

                        return false;
                    }
                });

            if (isDropdown) {
                $btn.addClass(prefix + 'open-dropdown');
                var dropdownPrefix = prefix + 'dropdown',
                    dropdownOptions = { // the dropdown
                        class: dropdownPrefix + '-' + btnName + ' ' + dropdownPrefix + ' ' + prefix + 'fixed-top ' + (btn.dropdownClass || '')
                    };
                dropdownOptions['data-' + dropdownPrefix] = btnName;
                var $dropdown = $('<div/>', dropdownOptions);
                $.each(isDropdown, function (i, def) {
                    if (t.btnsDef[def] && t.isSupportedBtn(def)) {
                        $dropdown.append(t.buildSubBtn(def));
                    }
                });
                t.$box.append($dropdown.hide());
            } else if (btn.key) {
                t.keys[btn.key] = {
                    fn: btn.fn || btnName,
                    param: btn.param || btnName
                };
            }

            if (!isDropdown) {
                t.tagToButton[(btn.tag || btnName).toLowerCase()] = btnName;
            }

            return $btn;
        },
        // Build a button for dropdown menu
        // @param n : name of the subbutton
        buildSubBtn: function (btnName) {
            var t = this,
                prefix = t.o.prefix,
                btn = t.btnsDef[btnName],
                hasIcon = btn.hasIcon != null ? btn.hasIcon : true;

            if (btn.key) {
                t.keys[btn.key] = {
                    fn: btn.fn || btnName,
                    param: btn.param || btnName
                };
            }

            t.tagToButton[(btn.tag || btnName).toLowerCase()] = btnName;

            return $('<button/>', {
                type: 'button',
                class: prefix + btnName + '-dropdown-button ' + (btn.class || '') + (btn.ico ? ' ' + prefix + btn.ico + '-button' : ''),
                html: t.hasSvg && hasIcon ?
                    '<svg><use xlink:href="' + t.svgPath + '#' + prefix + (btn.ico || btnName).replace(/([A-Z]+)/g, '-$1').toLowerCase() + '"/></svg>' + (btn.text || btn.title || t.lang[btnName] || btnName) :
                    (btn.text || btn.title || t.lang[btnName] || btnName),
                title: (btn.key ? '(' + (t.isMac ? 'Cmd' : 'Ctrl') + ' + ' + btn.key + ')' : null),
                style: btn.style || null,
                mousedown: function () {
                    $('body', t.doc).trigger('mousedown');

                    t.execCmd(btn.fn || btnName, btn.param || btnName, btn.forceCss);

                    return false;
                }
            });
        },
        // Check if button is supported
        isSupportedBtn: function (btnName) {
            try {
                return this.btnsDef[btnName].isSupported();
            } catch (e) {
            }
            return true;
        },

        // Build overlay for modal box
        buildOverlay: function () {
            var t = this;
            t.$overlay = $('<div/>', {
                class: t.o.prefix + 'overlay'
            }).appendTo(t.$box);
            return t.$overlay;
        },
        showOverlay: function () {
            var t = this;
            $(window).trigger('scroll');
            t.$overlay.fadeIn(200);
            t.$box.addClass(t.o.prefix + 'box-blur');
        },
        hideOverlay: function () {
            var t = this;
            t.$overlay.fadeOut(50);
            t.$box.removeClass(t.o.prefix + 'box-blur');
        },

        // Management of fixed button pane
        fixedBtnPaneEvents: function () {
            var t = this,
                fixedFullWidth = t.o.fixedFullWidth,
                $box = t.$box;

            if (!t.o.fixedBtnPane) {
                return;
            }

            t.isFixed = false;

            $(window)
                .on('scroll.' + t.eventNamespace + ' resize.' + t.eventNamespace, function () {
                    if (!$box) {
                        return;
                    }

                    t.syncCode();

                    var scrollTop = $(window).scrollTop(),
                        offset = $box.offset().top + 1,
                        $buttonPane = t.$btnPane,
                        buttonPaneOuterHeight = $buttonPane.outerHeight() - 2;

                    if ((scrollTop - offset > 0) && ((scrollTop - offset - t.height) < 0)) {
                        if (!t.isFixed) {
                            t.isFixed = true;
                            $buttonPane.css({
                                position: 'fixed',
                                top: 0,
                                left: fixedFullWidth ? 0 : 'auto',
                                zIndex: 7
                            });
                            t.$box.css({paddingTop: $buttonPane.height()});
                        }
                        $buttonPane.css({
                            width: fixedFullWidth ? '100%' : (($box.width() - 1))
                        });

                        $('.' + t.o.prefix + 'fixed-top', $box).css({
                            position: fixedFullWidth ? 'fixed' : 'absolute',
                            top: fixedFullWidth ? buttonPaneOuterHeight : buttonPaneOuterHeight + (scrollTop - offset),
                            zIndex: 15
                        });
                    } else if (t.isFixed) {
                        t.isFixed = false;
                        $buttonPane.removeAttr('style');
                        t.$box.css({paddingTop: 0});
                        $('.' + t.o.prefix + 'fixed-top', $box).css({
                            position: 'absolute',
                            top: buttonPaneOuterHeight
                        });
                    }
                });
        },

        // Disable editor
        setDisabled: function (disable) {
            var t = this,
                prefix = t.o.prefix;

            t.disabled = disable;

            if (disable) {
                t.$ta.attr('disabled', true);
            } else {
                t.$ta.removeAttr('disabled');
            }
            t.$box.toggleClass(prefix + 'disabled', disable);
            t.$ed.attr('contenteditable', !disable);
        },

        // Destroy the editor
        destroy: function () {
            var t = this,
                prefix = t.o.prefix;

            if (t.isTextarea) {
                t.$box.after(
                    t.$ta
                        .css({height: ''})
                        .val(t.html())
                        .removeClass(prefix + 'textarea')
                        .show()
                );
            } else {
                t.$box.after(
                    t.$edBox
                        .css({height: ''})
                        .removeClass(prefix + 'editor')
                        .removeAttr('contenteditable')
                        .removeAttr('dir')
                        .html(t.html())
                        .show()
                );
            }

            t.$ed.off('dblclick', 'img');

            t.destroyPlugins();

            t.$box.remove();
            t.$c.removeData('trumbowyg');
            $('body').removeClass(prefix + 'body-fullscreen');
            t.$c.trigger('tbwclose');
            $(window).off('scroll.' + t.eventNamespace + ' resize.' + t.eventNamespace);
            $(t.doc.body).off('keydown.' + t.eventNamespace);
        },


        // Empty the editor
        empty: function () {
            this.$ta.val('');
            this.syncCode(true);
        },


        // Function call when click on viewHTML button
        toggle: function () {
            var t = this,
                prefix = t.o.prefix;

            if (t.o.autogrowOnEnter) {
                t.autogrowOnEnterDontClose = !t.$box.hasClass(prefix + 'editor-hidden');
            }

            t.semanticCode(false, true);
            t.$c.trigger('tbwchange');

            setTimeout(function () {
                t.doc.activeElement.blur();
                t.$box.toggleClass(prefix + 'editor-hidden ' + prefix + 'editor-visible');
                t.$btnPane.toggleClass(prefix + 'disable');
                $('.' + prefix + 'viewHTML-button', t.$btnPane).toggleClass(prefix + 'active');
                if (t.$box.hasClass(prefix + 'editor-visible')) {
                    t.$ta.attr('tabindex', -1);
                } else {
                    t.$ta.removeAttr('tabindex');
                }

                if (t.o.autogrowOnEnter && !t.autogrowOnEnterDontClose) {
                    t.autogrowEditorOnEnter();
                }
            }, 0);
        },

        // Remove or add flags to span tags to remove Chrome generated spans
        toggleSpan: function (addFlag) {
            var t = this;
            t.$ed.find('span').each(function () {
                if (addFlag === true) {
                    $(this).attr('data-tbw-flag', true);
                } else {
                    if ($(this).attr('data-tbw-flag')) {
                        $(this).removeAttr('data-tbw-flag');
                    } else {
                        $(this).contents().unwrap();
                    }
                }
            });
        },

        // Open dropdown when click on a button which open that
        dropdown: function (name) {
            var t = this,
                $body = $('body', t.doc),
                prefix = t.o.prefix,
                $dropdown = $('[data-' + prefix + 'dropdown=' + name + ']', t.$box),
                $btn = $('.' + prefix + name + '-button', t.$btnPane),
                show = $dropdown.is(':hidden');

            $body.trigger('mousedown');

            if (show) {
                var btnOffsetLeft = $btn.offset().left;
                $btn.addClass(prefix + 'active');

                $dropdown.css({
                    position: 'absolute',
                    top: $btn.offset().top - t.$btnPane.offset().top + $btn.outerHeight(),
                    left: (t.o.fixedFullWidth && t.isFixed) ? btnOffsetLeft : (btnOffsetLeft - t.$btnPane.offset().left)
                }).show();

                $(window).trigger('scroll');

                $body.on('mousedown.' + t.eventNamespace, function (e) {
                    if (!$dropdown.is(e.target)) {
                        $('.' + prefix + 'dropdown', t.$box).hide();
                        $('.' + prefix + 'active', t.$btnPane).removeClass(prefix + 'active');
                        $body.off('mousedown.' + t.eventNamespace);
                    }
                });
            }
        },


        // HTML Code management
        html: function (html) {
            var t = this;

            if (html != null) {
                t.$ta.val(html);
                t.syncCode(true);
                t.$c.trigger('tbwchange');
                return t;
            }

            return t.$ta.val();
        },
        syncTextarea: function () {
            var t = this;
            t.$ta.val(t.$ed.text().trim().length > 0 || t.$ed.find(t.o.tagsToKeep.join(',')).length > 0 ? t.$ed.html() : '');
        },
        syncCode: function (force) {
            var t = this;
            if (!force && t.$ed.is(':visible')) {
                t.syncTextarea();
            } else {
                // wrap the content in a div it's easier to get the inner html
                var html = $('<div>').html(t.$ta.val());
                // scrub the html before loading into the doc
                var safe = $('<div>').append(html);
                $(t.o.tagsToRemove.join(','), safe).remove();
                t.$ed.html(safe.contents().html());
            }

            if (t.o.autogrow) {
                t.height = t.$edBox.height();
                if (t.height !== t.$ta.css('height')) {
                    t.$ta.css({height: t.height});
                    t.$c.trigger('tbwresize');
                }
            }
            if (t.o.autogrowOnEnter) {
                t.$edBox.height('auto');
                var totalHeight = t.autogrowOnEnterWasFocused ? t.$edBox[0].scrollHeight : t.$edBox.css('min-height');
                if (totalHeight !== t.$ta.css('height')) {
                    t.$edBox.css({height: totalHeight});
                    t.$c.trigger('tbwresize');
                }
            }
        },

        // Analyse and update to semantic code
        // @param force : force to sync code from textarea
        // @param full  : wrap text nodes in <p>
        // @param keepRange  : leave selection range as it is
        semanticCode: function (force, full, keepRange) {
            var t = this;
            t.saveRange();
            t.syncCode(force);

            var restoreRange = true;
            if (t.range && t.range.collapsed) {
                restoreRange = false;
            }

            if (t.o.semantic) {
                t.semanticTag('b', t.o.semanticKeepAttributes);
                t.semanticTag('i', t.o.semanticKeepAttributes);
                t.semanticTag('s', t.o.semanticKeepAttributes);
                t.semanticTag('strike', t.o.semanticKeepAttributes);

                if (full) {
                    var inlineElementsSelector = t.o.inlineElementsSelector,
                        blockElementsSelector = ':not(' + inlineElementsSelector + ')';

                    // Wrap text nodes in span for easier processing
                    t.$ed.contents().filter(function () {
                        return this.nodeType === 3 && this.nodeValue.trim().length > 0;
                    }).wrap('<span data-tbw/>');

                    // Wrap groups of inline elements in paragraphs (recursive)
                    var wrapInlinesInParagraphsFrom = function ($from) {
                        if ($from.length !== 0) {
                            var $finalParagraph = $from.nextUntil(blockElementsSelector).addBack().wrapAll('<p/>').parent(),
                                $nextElement = $finalParagraph.nextAll(inlineElementsSelector).first();
                            $finalParagraph.next('br').remove();
                            wrapInlinesInParagraphsFrom($nextElement);
                        }
                    };
                    wrapInlinesInParagraphsFrom(t.$ed.children(inlineElementsSelector).first());

                    t.semanticTag('div', true);

                    // Get rid of temporary span's
                    $('[data-tbw]', t.$ed).contents().unwrap();

                    // Remove empty <p>
                    t.$ed.find('p:empty').remove();
                }

                if (!keepRange && restoreRange) {
                    t.restoreRange();
                }

                t.syncTextarea();
            }
        },

        semanticTag: function (oldTag, copyAttributes, revert) {
            var newTag, t = this;
            var tmpTag = oldTag;

            if (this.o.semantic != null && typeof this.o.semantic === 'object' && this.o.semantic.hasOwnProperty(oldTag)) {
                newTag = this.o.semantic[oldTag];
            } else if (this.o.semantic === true && this.DEFAULT_SEMANTIC_MAP.hasOwnProperty(oldTag)) {
                newTag = this.DEFAULT_SEMANTIC_MAP[oldTag];
            } else {
                return;
            }

            if(revert) {
                oldTag = newTag;
                newTag = tmpTag;
            }

            $(oldTag, this.$ed).each(function () {
                var resetRange = false;
                var $oldTag = $(this);
                if ($oldTag.contents().length === 0) {
                    return false;
                }

                if (t.range && t.range.startContainer.parentNode === this) {
                    resetRange = true;
                }
                var $newTag = $('<' + newTag + '/>');
                $newTag.insertBefore($oldTag);
                if (copyAttributes) {
                    $.each($oldTag.prop('attributes'), function () {
                        $newTag.attr(this.name, this.value);
                    });
                }
                $newTag.html($oldTag.html());
                $oldTag.remove();
                if(resetRange === true) {
                    t.range.selectNodeContents($newTag.get(0));
                    t.range.collapse(false);
                }
            });
        },

        // Function call when user click on "Insert Link"
        createLink: function () {
            var t = this,
                documentSelection = t.doc.getSelection(),
                selectedRange = documentSelection.getRangeAt(0),
                node = documentSelection.focusNode,
                text = new XMLSerializer().serializeToString(selectedRange.cloneContents()) || selectedRange + '',
                url,
                title,
                target,
                linkDefaultTarget = t.o.linkTargets[0];

            while (['A', 'DIV'].indexOf(node.nodeName) < 0) {
                node = node.parentNode;
            }

            if (node && node.nodeName === 'A') {
                var $a = $(node);
                text = $a.text();
                url = $a.attr('href');
                if (!t.o.minimalLinks) {
                    title = $a.attr('title');
                    target = $a.attr('target') || linkDefaultTarget;
                }
                var range = t.doc.createRange();
                range.selectNode(node);
                documentSelection.removeAllRanges();
                documentSelection.addRange(range);
            }

            t.saveRange();

            var options = {
                url: {
                    label: t.lang.linkUrl || 'URL',
                    required: true,
                    value: url
                },
                text: {
                    label: t.lang.text,
                    value: text
                }
            };
            if (!t.o.minimalLinks) {
                var targetOptions = t.o.linkTargets.reduce(function (options, optionValue) {
                    options[optionValue] = t.lang[optionValue];

                    return options;
                }, {});

                $.extend(options, {
                    title: {
                        label: t.lang.title,
                        value: title
                    },
                    target: {
                        label: t.lang.target,
                        value: target,
                        options: targetOptions
                    }
                });
            }

            t.openModalInsert(t.lang.createLink, options, function (v) { // v is value
                var url = t.prependUrlPrefix(v.url);
                if (!url.length) {
                    return false;
                }

                var link = $(['<a href="', url, '">', v.text || v.url, '</a>'].join(''));

                if (v.title) {
                    link.attr('title', v.title);
                }
                if (v.target || linkDefaultTarget) {
                    link.attr('target', v.target || linkDefaultTarget);
                }
                t.range.deleteContents();
                t.range.insertNode(link[0]);
                t.syncCode();
                t.$c.trigger('tbwchange');
                return true;
            });
        },
        prependUrlPrefix: function (url) {
            var t = this;
            if (!t.urlPrefix) {
                return url;
            }

            var VALID_LINK_PREFIX = /^([a-z][-+.a-z0-9]*:|\/|#)/i;
            if (VALID_LINK_PREFIX.test(url)) {
                return url;
            }

            var SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (SIMPLE_EMAIL_REGEX.test(url)) {
                return 'mailto:' + url;
            }

            return t.urlPrefix + url;
        },
        unlink: function () {
            var t = this,
                documentSelection = t.doc.getSelection(),
                node = documentSelection.focusNode;

            if (documentSelection.isCollapsed) {
                while (['A', 'DIV'].indexOf(node.nodeName) < 0) {
                    node = node.parentNode;
                }

                if (node && node.nodeName === 'A') {
                    var range = t.doc.createRange();
                    range.selectNode(node);
                    documentSelection.removeAllRanges();
                    documentSelection.addRange(range);
                }
            }
            t.execCmd('unlink', undefined, undefined, true);
        },
        insertImage: function () {
            var t = this;
            t.saveRange();

            var options = {
                url: {
                    label: 'URL',
                    required: true
                },
                alt: {
                    label: t.lang.description,
                    value: t.getRangeText()
                }
            };

            if (t.o.imageWidthModalEdit) {
                options.width = {};
            }

            t.openModalInsert(t.lang.insertImage, options, function (v) { // v are values
                t.execCmd('insertImage', v.url, false, true);
                var $img = $('img[src="' + v.url + '"]:not([alt])', t.$box);
                $img.attr('alt', v.alt);

                if (t.o.imageWidthModalEdit) {
                    $img.attr({
                        width: v.width
                    });
                }

                t.syncCode();
                t.$c.trigger('tbwchange');

                return true;
            });
        },
        fullscreen: function () {
            var t = this,
                prefix = t.o.prefix,
                fullscreenCssClass = prefix + 'fullscreen',
                fullscreenPlaceholderClass = fullscreenCssClass + '-placeholder',
                isFullscreen,
                editorHeight = t.$box.outerHeight();

            t.$box.toggleClass(fullscreenCssClass);
            isFullscreen = t.$box.hasClass(fullscreenCssClass);

            if (isFullscreen) {
                t.$box.before(
                    $('<div/>', {
                        class: fullscreenPlaceholderClass
                    }).css({
                        height: editorHeight
                    })
                );
            } else {
                $('.' + fullscreenPlaceholderClass).remove();
            }

            $('body').toggleClass(prefix + 'body-fullscreen', isFullscreen);
            $(window).trigger('scroll');
            t.$c.trigger('tbw' + (isFullscreen ? 'open' : 'close') + 'fullscreen');
        },


        /*
         * Call method of trumbowyg if exist
         * else try to call anonymous function
         * and finally native execCommand
         */
        execCmd: function (cmd, param, forceCss, skipTrumbowyg) {
            var t = this;
            skipTrumbowyg = !!skipTrumbowyg || '';

            if (cmd !== 'dropdown') {
                t.$ed.focus();
            }

            if(cmd === 'strikethrough' && t.o.semantic) {
                t.semanticTag('strike', t.o.semanticKeepAttributes, true); // browsers cannot undo e.g. <del> as they expect <strike>
            }

            try {
                t.doc.execCommand('styleWithCSS', false, forceCss || false);
            } catch (c) {
            }

            try {
                t[cmd + skipTrumbowyg](param);
            } catch (c) {
                try {
                    cmd(param);
                } catch (e2) {
                    if (cmd === 'insertHorizontalRule') {
                        param = undefined;
                    } else if (cmd === 'formatBlock' && t.isIE) {
                        param = '<' + param + '>';
                    }

                    t.doc.execCommand(cmd, false, param);

                    t.syncCode();
                    t.semanticCode(false, true);
                    try {
                        var listId = window.getSelection().focusNode;
                        if(!$(window.getSelection().focusNode.parentNode).hasClass('trumbowyg-editor')){
                            listId = window.getSelection().focusNode.parentNode;
                        }
                        var classes = t.o.tagClasses[param];
                        if (classes) {
                            $(listId).addClass(classes);
                        }
                    } catch (e) {

                    }

                }

                if (cmd !== 'dropdown') {
                    t.updateButtonPaneStatus();
                    t.$c.trigger('tbwchange');
                }
            }
        },


        // Open a modal box
        openModal: function (title, content, buildForm) {
            var t = this,
                prefix = t.o.prefix;

            buildForm = buildForm !== false;

            // No open a modal box when exist other modal box
            if ($('.' + prefix + 'modal-box', t.$box).length > 0) {
                return false;
            }
            if (t.o.autogrowOnEnter) {
                t.autogrowOnEnterDontClose = true;
            }

            t.saveRange();
            t.showOverlay();

            // Disable all btnPane btns
            t.$btnPane.addClass(prefix + 'disable');

            // Build out of ModalBox, it's the mask for animations
            var $modal = $('<div/>', {
                class: prefix + 'modal ' + prefix + 'fixed-top'
            }).css({
                top: t.$box.offset().top + t.$btnPane.height(),
                zIndex: 99999
            }).appendTo($(t.doc.body));

            var darkClass = prefix + 'dark';
            if (t.$c.parents('.' + darkClass).length !== 0) {
                $modal.addClass(darkClass);
            }

            // Click on overlay close modal by cancelling them
            t.$overlay.one('click', function () {
                $modal.trigger(CANCEL_EVENT);
                return false;
            });

            // Build the form
            var formOrContent;
            if (buildForm) {
                formOrContent = $('<form/>', {
                    action: '',
                    html: content
                })
                    .on('submit', function () {
                        $modal.trigger(CONFIRM_EVENT);
                        return false;
                    })
                    .on('reset', function () {
                        $modal.trigger(CANCEL_EVENT);
                        return false;
                    })
                    .on('submit reset', function () {
                        if (t.o.autogrowOnEnter) {
                            t.autogrowOnEnterDontClose = false;
                        }
                    });
            } else {
                formOrContent = content;
            }


            // Build ModalBox and animate to show them
            var $box = $('<div/>', {
                class: prefix + 'modal-box',
                html: formOrContent
            })
                .css({
                    top: '-' + t.$btnPane.outerHeight(),
                    opacity: 0,
                    paddingBottom: buildForm ? null : '5%',
                })
                .appendTo($modal)
                .animate({
                    top: 0,
                    opacity: 1
                }, 100);


            // Append title
            if (title) {
                $('<span/>', {
                    text: title,
                    class: prefix + 'modal-title'
                }).prependTo($box);
            }

            if (buildForm) {
                // Focus in modal box
                $(':input:first', $box).focus();

                // Append Confirm and Cancel buttons
                t.buildModalBtn('submit', $box);
                t.buildModalBtn('reset', $box);

                $modal.height($box.outerHeight() + 10);
            }

            $(window).trigger('scroll');
            t.$c.trigger('tbwmodalopen');

            return $modal;
        },
        // @param n is name of modal
        buildModalBtn: function (n, $modal) {
            var t = this,
                prefix = t.o.prefix;

            return $('<button/>', {
                class: prefix + 'modal-button ' + prefix + 'modal-' + n,
                type: n,
                text: t.lang[n] || n
            }).appendTo($('form', $modal));
        },
        // close current modal box
        closeModal: function () {
            var t = this,
                prefix = t.o.prefix;

            t.$btnPane.removeClass(prefix + 'disable');
            t.$overlay.off();

            // Find the modal box
            var $modalBox = $('.' + prefix + 'modal-box', $(t.doc.body));

            $modalBox.animate({
                top: '-' + $modalBox.height()
            }, 100, function () {
                $modalBox.parent().remove();
                t.hideOverlay();
                t.$c.trigger('tbwmodalclose');
            });

            t.restoreRange();
        },
        // Pre-formatted build and management modal
        openModalInsert: function (title, fields, cmd) {
            var t = this,
                prefix = t.o.prefix,
                lg = t.lang,
                html = '',
                idPrefix = prefix + 'form-' + Date.now() + '-';

            $.each(fields, function (fieldName, field) {
                var l = field.label || fieldName,
                    n = field.name || fieldName,
                    a = field.attributes || {},
                    fieldId = idPrefix + fieldName;

                var attr = Object.keys(a).map(function (prop) {
                    return prop + '="' + a[prop] + '"';
                }).join(' ');

                if (typeof field.type === 'function') {
                  if (!field.name) {
                    field.name = n;
                  }

                  html += field.type(field, fieldId, prefix, lg);

                  return;
                }

                html += '<div class="' + prefix + 'input-row">';
                html += '<div class="' + prefix + 'input-infos"><label for="' + fieldId + '"><span>' + (lg[l] ? lg[l] : l) + '</span></label></div>';
                html += '<div class="' + prefix + 'input-html">';

                if ($.isPlainObject(field.options)) {
                    html += '<select name="target">';
                    html += Object.keys(field.options).map((optionValue) => {
                        return '<option value="' + optionValue + '" ' + (optionValue === field.value ? 'selected' : '') + '>' + field.options[optionValue] + '</option>';
                    }).join('');
                    html += '</select>';
                } else {
                    html += '<input id="' + fieldId + '" type="' + (field.type || 'text') + '" name="' + n + '" ' + attr;
                    html += (field.type === 'checkbox' && field.value ? ' checked="checked"' : '') + ' value="' + (field.value || '').replace(/"/g, '&quot;') + '">';
                }

                html += '</div></div>';
            });

            return t.openModal(title, html)
                .on(CONFIRM_EVENT, function () {
                    var $form = $('form', $(this)),
                        valid = true,
                        values = {};

                    $.each(fields, function (fieldName, field) {
                        var n = field.name || fieldName;

                        var $field = $(':input[name="' + n + '"]', $form),
                            inputType = $field[0].type;

                        switch (inputType.toLowerCase()) {
                            case 'checkbox':
                                values[n] = $field.is(':checked');
                                break;
                            case 'radio':
                                values[n] = $field.filter(':checked').val();
                                break;
                            default:
                                values[n] = $.trim($field.val());
                                break;
                        }
                        // Validate value
                        if (field.required && values[n] === '') {
                            valid = false;
                            t.addErrorOnModalField($field, t.lang.required);
                        } else if (field.pattern && !field.pattern.test(values[n])) {
                            valid = false;
                            t.addErrorOnModalField($field, field.patternError);
                        }
                    });

                    if (valid) {
                        t.restoreRange();

                        if (cmd(values, fields)) {
                            t.syncCode();
                            t.$c.trigger('tbwchange');
                            t.closeModal();
                            $(this).off(CONFIRM_EVENT);
                        }
                    }
                })
                .one(CANCEL_EVENT, function () {
                    $(this).off(CONFIRM_EVENT);
                    t.closeModal();
                });
        },
        addErrorOnModalField: function ($field, err) {
            var prefix = this.o.prefix,
                spanErrorClass = prefix + 'msg-error',
                $row = $field.closest('.' + prefix + 'input-row');

            $field
                .on('change keyup', function () {
                    $row.removeClass(prefix + 'input-error');
                    setTimeout(function () {
                        $row.find('.' + spanErrorClass).remove();
                    }, 150);
                });

            $row
                .addClass(prefix + 'input-error')
                .find('.' + prefix + 'input-infos label')
                .append(
                    $('<span/>', {
                        class: spanErrorClass,
                        text: err
                    })
                );
        },

        getDefaultImgDblClickHandler: function () {
            var t = this;

            return function () {
                var $img = $(this),
                    src = $img.attr('src'),
                    base64 = '(Base64)';

                if (src.indexOf('data:image') === 0) {
                    src = base64;
                }

                var options = {
                    url: {
                        label: 'URL',
                        value: src,
                        required: true
                    },
                    alt: {
                        label: t.lang.description,
                        value: $img.attr('alt')
                    }
                };

                if (t.o.imageWidthModalEdit) {
                    options.width = {
                        value: $img.attr('width') ? $img.attr('width') : ''
                    };
                }

                t.openModalInsert(t.lang.insertImage, options, function (v) {
                    if (v.url !== base64) {
                        $img.attr({
                            src: v.url
                        });
                    }
                    $img.attr({
                        alt: v.alt
                    });

                    if (t.o.imageWidthModalEdit) {
                        if (parseInt(v.width) > 0) {
                            $img.attr({
                                width: v.width
                            });
                        } else {
                            $img.removeAttr('width');
                        }
                    }

                    return true;
                });
                return false;
            };
        },

        // Range management
        saveRange: function () {
            var t = this,
                documentSelection = t.doc.getSelection();

            t.range = null;

            if (!documentSelection || !documentSelection.rangeCount) {
                return;
            }

            var savedRange = t.range = documentSelection.getRangeAt(0),
                range = t.doc.createRange(),
                rangeStart;
            range.selectNodeContents(t.$ed[0]);
            range.setEnd(savedRange.startContainer, savedRange.startOffset);
            rangeStart = (range + '').length;
            t.metaRange = {
                start: rangeStart,
                end: rangeStart + (savedRange + '').length
            };
        },
        restoreRange: function () {
            var t = this,
                metaRange = t.metaRange,
                savedRange = t.range,
                documentSelection = t.doc.getSelection(),
                range;

            if (!savedRange) {
                return;
            }

            if (metaRange && metaRange.start !== metaRange.end) { // Algorithm from http://jsfiddle.net/WeWy7/3/
                var charIndex = 0,
                    nodeStack = [t.$ed[0]],
                    node,
                    foundStart = false,
                    stop = false;

                range = t.doc.createRange();

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType === 3) {
                        var nextCharIndex = charIndex + node.length;
                        if (!foundStart && metaRange.start >= charIndex && metaRange.start <= nextCharIndex) {
                            range.setStart(node, metaRange.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && metaRange.end >= charIndex && metaRange.end <= nextCharIndex) {
                            range.setEnd(node, metaRange.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        var cn = node.childNodes,
                            i = cn.length;

                        while (i > 0) {
                            i -= 1;
                            nodeStack.push(cn[i]);
                        }
                    }
                }
            }

            // Fix IE11 Error 'Could not complete the operation due to error 800a025e'.
            // https://stackoverflow.com/questions/16160996/could-not-complete-the-operation-due-to-error-800a025e
            try {
                documentSelection.removeAllRanges();
            } catch (e) {
            }

            documentSelection.addRange(range || savedRange);
        },
        getRangeText: function () {
            return this.range + '';
        },

        clearButtonPaneStatus: function () {
            var t = this,
                prefix = t.o.prefix,
                activeClasses = prefix + 'active-button ' + prefix + 'active',
                originalIconClass = prefix + 'original-icon';

            // Reset all buttons and dropdown state
            $('.' + prefix + 'active-button', t.$btnPane).removeClass(activeClasses);
            $('.' + originalIconClass, t.$btnPane).each(function () {
                $(this).find('svg use').attr('xlink:href', $(this).data(originalIconClass));
            });
        },
        updateButtonPaneStatus: function () {
            var t = this,
                prefix = t.o.prefix,
                activeClasses = prefix + 'active-button ' + prefix + 'active',
                originalIconClass = prefix + 'original-icon',
                tags = t.getTagsRecursive(t.doc.getSelection().anchorNode);

            t.clearButtonPaneStatus();

            $.each(tags, function (i, tag) {
                var btnName = t.tagToButton[tag.toLowerCase()],
                    $btn = $('.' + prefix + btnName + '-button', t.$btnPane);

                if ($btn.length > 0) {
                    $btn.addClass(activeClasses);
                } else {
                    try {
                        $btn = $('.' + prefix + 'dropdown .' + prefix + btnName + '-dropdown-button', t.$box);
                        var $btnSvgUse = $btn.find('svg use'),
                            dropdownBtnName = $btn.parent().data(prefix + 'dropdown'),
                            $dropdownBtn = $('.' + prefix + dropdownBtnName + '-button', t.$box),
                            $dropdownBtnSvgUse = $dropdownBtn.find('svg use');

                        // Highlight the dropdown button
                        $dropdownBtn.addClass(activeClasses);

                        // Switch dropdown icon to the active sub-icon one
                        if (t.o.changeActiveDropdownIcon && $btnSvgUse.length > 0) {
                            // Save original icon
                            $dropdownBtn
                                .addClass(originalIconClass)
                                .data(originalIconClass, $dropdownBtnSvgUse.attr('xlink:href'));

                            // Put the active sub-button's icon
                            $dropdownBtnSvgUse
                                .attr('xlink:href', $btnSvgUse.attr('xlink:href'));
                        }
                    } catch (e) {
                    }
                }
            });
        },
        getTagsRecursive: function (element, tags) {
            var t = this;
            tags = tags || (element && element.tagName ? [element.tagName] : []);

            if (element && element.parentNode) {
                if (element.nodeType !== Node.ELEMENT_NODE) {
                    element = element.parentNode;
                }
            } else {
                return tags;
            }

            var tag = element.tagName;
            if (tag === 'DIV') {
                return tags;
            }
            if (tag === 'P' && element.style.textAlign !== '') {
                tags.push(element.style.textAlign);
            }

            $.each(t.tagHandlers, function (i, tagHandler) {
                tags = tags.concat(tagHandler(element, t));
            });

            tags.push(tag);

            return t.getTagsRecursive(element.parentNode, tags).filter(function (tag) {
                return tag != null;
            });
        },

        // Plugins
        initPlugins: function () {
            var t = this;
            t.loadedPlugins = [];
            $.each($.trumbowyg.plugins, function (name, plugin) {
                if (!plugin.shouldInit || plugin.shouldInit(t)) {
                    plugin.init(t);
                    if (plugin.tagHandler) {
                        t.tagHandlers.push(plugin.tagHandler);
                    }
                    t.loadedPlugins.push(plugin);
                }
            });
        },
        destroyPlugins: function () {
            var t = this;
            $.each(this.loadedPlugins, function (i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy(t);
                }
            });
        }
    };
})(navigator, window, document, jQuery);
