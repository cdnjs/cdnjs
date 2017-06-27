/**
 * Trumbowyg v2.6.0 - A lightweight WYSIWYG editor
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
            strikethrough: 'Stroke',
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
            target: 'Target'
        }
    },

    // Plugins
    plugins: {},

    // SVG Path globally
    svgPath: null,

    hideButtonTexts: null
};


(function (navigator, window, document, $) {
    'use strict';

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
                        return t.execCmd(params.cmd, params.param, params.forceCss);

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
                        return t.toggleDisable(false);
                    case 'disable':
                        return t.toggleDisable(true);

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
            trumbowygIconsId = 'trumbowyg-icons';

        // Get the document of the element. It use to makes the plugin
        // compatible on iframes.
        t.doc = editorElem.ownerDocument || document;

        // jQuery object of the editor
        t.$ta = $(editorElem); // $ta : Textarea
        t.$c = $(editorElem); // $c : creator

        options = options || {};

        // Localization management
        if (options.lang != null || $.trumbowyg.langs[options.lang] != null) {
            t.lang = $.extend(true, {}, $.trumbowyg.langs.en, $.trumbowyg.langs[options.lang]);
        } else {
            t.lang = $.trumbowyg.langs.en;
        }

        t.hideButtonTexts = $.trumbowyg.hideButtonTexts != null ? $.trumbowyg.hideButtonTexts : options.hideButtonTexts;

        // SVG path
        var svgPathOption = $.trumbowyg.svgPath != null ? $.trumbowyg.svgPath : options.svgPath;
        t.hasSvg = svgPathOption !== false;
        t.svgPath = !!t.doc.querySelector('base') ? window.location.href.split('#')[0] : '';
        if ($('#' + trumbowygIconsId, t.doc).length === 0 && svgPathOption !== false) {
            if (svgPathOption == null) {
                try {
                    throw new Error();
                } catch (e) {
                    var stackLines = e.stack.split('\n');

                    for (var i in stackLines) {
                        if (!stackLines[i].match(/http[s]?:\/\//)) {
                            continue;
                        }
                        svgPathOption = stackLines[Number(i)].match(/((http[s]?:\/\/.+\/)([^\/]+\.js))(\?.*)?:/)[1].split('/');
                        svgPathOption.pop();
                        svgPathOption = svgPathOption.join('/') + '/ui/icons.svg';
                        break;
                    }
                }
            }

            var div = t.doc.createElement('div');
            div.id = trumbowygIconsId;
            t.doc.body.insertBefore(div, t.doc.body.childNodes[0]);
            $.ajax({
                async: true,
                type: 'GET',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: 'xml',
                crossDomain : true,
                url: svgPathOption,
                data: null,
                beforeSend: null,
                complete: null,
                success: function (data) {
                    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
                }
            });
        }


        /**
         * When the button is associated to a empty object
         * fn and title attributs are defined from the button key value
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
                fn: 'toggle'
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

        // Defaults Options
        t.o = $.extend(true, {}, {
            lang: 'en',

            fixedBtnPane: false,
            fixedFullWidth: false,
            autogrow: false,

            prefix: 'trumbowyg-',

            semantic: true,
            resetCss: false,
            removeformatPasted: false,
            tagsToRemove: [],

            btnsGrps: {
                design: ['bold', 'italic', 'underline', 'strikethrough'],
                semantic: ['strong', 'em', 'del'],
                justify: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                lists: ['unorderedList', 'orderedList']
            },
            btns: [
                ['viewHTML'],
                ['undo', 'redo'],
                ['formatting'],
                'btnGrp-semantic',
                ['superscript', 'subscript'],
                ['link'],
                ['insertImage'],
                'btnGrp-justify',
                'btnGrp-lists',
                ['horizontalRule'],
                ['removeformat'],
                ['fullscreen']
            ],
            // For custom button definitions
            btnsDef: {},

            inlineElementsSelector: 'a,abbr,acronym,b,caption,cite,code,col,dfn,dir,dt,dd,em,font,hr,i,kbd,li,q,span,strikeout,strong,sub,sup,u',

            pasteHandlers: [],

            imgDblClickHandler: function () {
                var $img = $(this),
                    src = $img.attr('src'),
                    base64 = '(Base64)';

                if (src.indexOf('data:image') === 0) {
                    src = base64;
                }

                t.openModalInsert(t.lang.insertImage, {
                    url: {
                        label: 'URL',
                        value: src,
                        required: true
                    },
                    alt: {
                        label: t.lang.description,
                        value: $img.attr('alt')
                    }
                }, function (v) {
                    if (v.src !== base64) {
                        $img.attr({
                            src: v.src
                        });
                    }
                    $img.attr({
                        alt: v.alt
                    });
                    return true;
                });
                return false;
            },

            plugins: {}
        }, options);

        t.disabled = t.o.disabled || (editorElem.nodeName === 'TEXTAREA' && editorElem.disabled);

        if (options.btns) {
            t.o.btns = options.btns;
        } else if (!t.o.semantic) {
            t.o.btns[4] = 'btnGrp-design';
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
        t.isIE = (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') !== -1);

        t.init();
    };

    Trumbowyg.prototype = {
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
                    t.toggleDisable(true);
                }
                t.$c.trigger('tbwinit');
            });
        },

        addBtnDef: function (btnName, btnDef) {
            this.btnsDef[btnName] = btnDef;
        },

        buildEditor: function () {
            var t = this,
                prefix = t.o.prefix,
                html = '';

            t.$box = $('<div/>', {
                class: prefix + 'box ' + prefix + 'editor-visible ' + prefix + t.o.lang + ' trumbowyg'
            });

            // $ta = Textarea
            // $ed = Editor
            t.isTextarea = t.$ta.is('textarea');
            if (t.isTextarea) {
                html = t.$ta.val();
                t.$ed = $('<div/>');
                t.$box
                    .insertAfter(t.$ta)
                    .append(t.$ed, t.$ta);
            } else {
                t.$ed = t.$ta;
                html = t.$ed.html();

                t.$ta = $('<textarea/>', {
                    name: t.$ta.attr('id'),
                    height: t.height
                }).val(html);

                t.$box
                    .insertAfter(t.$ed)
                    .append(t.$ta, t.$ed);
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

            if (t.o.resetCss) {
                t.$ed.addClass(prefix + 'reset-css');
            }

            if (!t.o.autogrow) {
                t.$ta.add(t.$ed).css({
                    height: t.height
                });
            }

            t.semanticCode();


            var ctrl = false,
                composition = false,
                debounceButtonPaneStatus,
                updateEventName = t.isIE ? 'keyup' : 'input';

            t.$ed
                .on('dblclick', 'img', t.o.imgDblClickHandler)
                .on('keydown', function (e) {
                    if (e.ctrlKey) {
                        ctrl = true;
                        var key = t.keys[String.fromCharCode(e.which).toUpperCase()];

                        try {
                            t.execCmd(key.fn, key.param);
                            return false;
                        } catch (c) {
                        }
                    }
                })
                .on('compositionstart compositionupdate', function () {
                    composition = true;
                })
                .on(updateEventName + ' compositionend', function (e) {
                  if (e.type === 'compositionend') {
                        composition = false;
                    } else if(composition) {
                        return;
                    }

                    var keyCode = e.which;

                    if (keyCode >= 37 && keyCode <= 40) {
                        return;
                    }

                    if (e.ctrlKey && (keyCode === 89 || keyCode === 90)) {
                        t.$c.trigger('tbwchange');
                    } else if (!ctrl && keyCode !== 17) {
                        t.semanticCode(false, keyCode === 13);
                        t.$c.trigger('tbwchange');
                    } else if (typeof e.which === 'undefined') {
                        t.semanticCode(false, false, true);
                    }

                    setTimeout(function () {
                        ctrl = false;
                    }, 200);
                })
                .on('mouseup keydown keyup', function () {
                    clearTimeout(debounceButtonPaneStatus);
                    debounceButtonPaneStatus = setTimeout(function () {
                        t.updateButtonPaneStatus();
                    }, 50);
                })
                .on('focus blur', function (e) {
                    t.$c.trigger('tbw' + e.type);
                    if (e.type === 'blur') {
                        $('.' + prefix + 'active-button', t.$btnPane).removeClass(prefix + 'active-button ' + prefix + 'active');
                    }
                })
                .on('cut', function () {
                    setTimeout(function () {
                        t.semanticCode(false, true);
                        t.$c.trigger('tbwchange');
                    }, 0);
                })
                .on('paste', function (e) {
                    if (t.o.removeformatPasted) {
                        e.preventDefault();

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
                    }, 0);
                });
            t.$ta.on('keyup paste', function () {
              t.$c.trigger('tbwchange');
            });

            t.$box.on('keydown', function (e) {
                if (e.which === 27 && $('.' + prefix + 'modal-box', t.$box).length === 1) {
                    t.closeModal();
                    return false;
                }
            });
        },


        // Build button pane, use o.btns option
        buildBtnPane: function () {
            var t = this,
                prefix = t.o.prefix;

            var $btnPane = t.$btnPane = $('<div/>', {
                class: prefix + 'button-pane'
            });

            $.each(t.o.btns, function (i, btnGrps) {
                // Managment of group of buttons
                try {
                    var b = btnGrps.split('btnGrp-');
                    if (b[1] != null) {
                        btnGrps = t.o.btnsGrps[b[1]];
                    }
                } catch (c) {
                }

                if (!$.isArray(btnGrps)) {
                    btnGrps = [btnGrps];
                }

                var $btnGroup = $('<div/>', {
                    class: prefix + 'button-group ' + ((btnGrps.indexOf('fullscreen') >= 0) ? prefix + 'right' : '')
                });
                $.each(btnGrps, function (i, btn) {
                    try { // Prevent buildBtn error
                        var $item;

                        if (t.isSupportedBtn(btn)) { // It's a supported button
                            $item = t.buildBtn(btn);
                        }

                        $btnGroup.append($item);
                    } catch (c) {
                    }
                });
                $btnPane.append($btnGroup);
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
                    title: (btn.title || btn.text || textDef) + ((btn.key) ? ' (Ctrl + ' + btn.key + ')' : ''),
                    tabindex: -1,
                    mousedown: function () {
                        if (!isDropdown || $('.' + btnName + '-' + prefix + 'dropdown', t.$box).is(':hidden')) {
                            $('body', t.doc).trigger('mousedown');
                        }

                        if (t.$btnPane.hasClass(prefix + 'disable') && !$(this).hasClass(prefix + 'active') && !$(this).hasClass(prefix + 'not-disable')) {
                            return false;
                        }

                        t.execCmd((isDropdown ? 'dropdown' : false) || btn.fn || btnName, btn.param || btnName, btn.forceCss || false);

                        return false;
                    }
                });

            if (isDropdown) {
                $btn.addClass(prefix + 'open-dropdown');
                var dropdownPrefix = prefix + 'dropdown',
                    $dropdown = $('<div/>', { // the dropdown
                        class: dropdownPrefix + '-' + btnName + ' ' + dropdownPrefix + ' ' + prefix + 'fixed-top',
                        'data-dropdown': btnName
                    });
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
                class: prefix + btnName + '-dropdown-button' + (btn.ico ? ' ' + prefix + btn.ico + '-button' : ''),
                html: t.hasSvg && hasIcon ? '<svg><use xlink:href="' + t.svgPath + '#' + prefix + (btn.ico || btnName).replace(/([A-Z]+)/g, '-$1').toLowerCase() + '"/></svg>' + (btn.text || btn.title || t.lang[btnName] || btnName) : (btn.text || btn.title || t.lang[btnName] || btnName),
                title: ((btn.key) ? ' (Ctrl + ' + btn.key + ')' : null),
                style: btn.style || null,
                mousedown: function () {
                    $('body', t.doc).trigger('mousedown');

                    t.execCmd(btn.fn || btnName, btn.param || btnName, btn.forceCss || false);

                    return false;
                }
            });
        },
        // Check if button is supported
        isSupportedBtn: function (b) {
            try {
                return this.btnsDef[b].isSupported();
            } catch (c) {
            }
            return true;
        },

        // Build overlay for modal box
        buildOverlay: function () {
            var t = this;
            t.$overlay = $('<div/>', {
                class: t.o.prefix + 'overlay'
            }).css({
                top: t.$btnPane.outerHeight(),
                height: (t.$ed.outerHeight() + 1) + 'px'
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
                .on('scroll.'+t.eventNamespace+' resize.'+t.eventNamespace, function () {
                    if (!$box) {
                        return;
                    }

                    t.syncCode();

                    var scrollTop = $(window).scrollTop(),
                        offset = $box.offset().top + 1,
                        bp = t.$btnPane,
                        oh = bp.outerHeight() - 2;

                    if ((scrollTop - offset > 0) && ((scrollTop - offset - t.height) < 0)) {
                        if (!t.isFixed) {
                            t.isFixed = true;
                            bp.css({
                                position: 'fixed',
                                top: 0,
                                left: fixedFullWidth ? '0' : 'auto',
                                zIndex: 7
                            });
                            $([t.$ta, t.$ed]).css({marginTop: bp.height()});
                        }
                        bp.css({
                            width: fixedFullWidth ? '100%' : (($box.width() - 1) + 'px')
                        });

                        $('.' + t.o.prefix + 'fixed-top', $box).css({
                            position: fixedFullWidth ? 'fixed' : 'absolute',
                            top: fixedFullWidth ? oh : oh + (scrollTop - offset) + 'px',
                            zIndex: 15
                        });
                    } else if (t.isFixed) {
                        t.isFixed = false;
                        bp.removeAttr('style');
                        $([t.$ta, t.$ed]).css({marginTop: 0});
                        $('.' + t.o.prefix + 'fixed-top', $box).css({
                            position: 'absolute',
                            top: oh
                        });
                    }
                });
        },

        // Disable editor
        toggleDisable: function (disable) {
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
                prefix = t.o.prefix,
                height = t.height;

            if (t.isTextarea) {
                t.$box.after(
                    t.$ta
                        .css({height: height})
                        .val(t.html())
                        .removeClass(prefix + 'textarea')
                        .show()
                );
            } else {
                t.$box.after(
                    t.$ed
                        .css({height: height})
                        .removeClass(prefix + 'editor')
                        .removeAttr('contenteditable')
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
            $(window).off('scroll.'+t.eventNamespace+' resize.'+t.eventNamespace);
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
            t.semanticCode(false, true);
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
            }, 0);
        },

        // Open dropdown when click on a button which open that
        dropdown: function (name) {
            var t = this,
                d = t.doc,
                prefix = t.o.prefix,
                $dropdown = $('[data-dropdown=' + name + ']', t.$box),
                $btn = $('.' + prefix + name + '-button', t.$btnPane),
                show = $dropdown.is(':hidden');

            $('body', d).trigger('mousedown');

            if (show) {
                var o = $btn.offset().left;
                $btn.addClass(prefix + 'active');

                $dropdown.css({
                    position: 'absolute',
                    top: $btn.offset().top - t.$btnPane.offset().top + $btn.outerHeight(),
                    left: (t.o.fixedFullWidth && t.isFixed) ? o + 'px' : (o - t.$btnPane.offset().left) + 'px'
                }).show();

                $(window).trigger('scroll');

                $('body', d).on('mousedown.'+t.eventNamespace, function (e) {
                    if (!$dropdown.is(e.target)) {
                        $('.' + prefix + 'dropdown', d).hide();
                        $('.' + prefix + 'active', d).removeClass(prefix + 'active');
                        $('body', d).off('mousedown.'+t.eventNamespace);
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
                return t;
            }
            return t.$ta.val();
        },
        syncTextarea: function () {
            var t = this;
            t.$ta.val(t.$ed.text().trim().length > 0 || t.$ed.find('hr,img,embed,iframe,input').length > 0 ? t.$ed.html() : '');
        },
        syncCode: function (force) {
            var t = this;
            if (!force && t.$ed.is(':visible')) {
                t.syncTextarea();
            } else {
                // wrap the content in a div it's easier to get the innerhtml
                var html = '<div>' + t.$ta.val() + '</div>';
                //scrub the html before loading into the doc
                html = $(t.o.tagsToRemove.join(','), html).remove().end().html();
                t.$ed.html(html);
            }

            if (t.o.autogrow) {
                t.height = t.$ed.height();
                if (t.height !== t.$ta.css('height')) {
                    t.$ta.css({height: t.height});
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

            if (t.o.semantic) {
                t.semanticTag('b', 'strong');
                t.semanticTag('i', 'em');

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

                    t.semanticTag('div', 'p', true);

                    // Unwrap paragraphs content, containing nothing usefull
                    t.$ed.find('p').filter(function () {
                        // Don't remove currently being edited element
                        if (t.range && this === t.range.startContainer) {
                            return false;
                        }
                        return $(this).text().trim().length === 0 && $(this).children().not('br,span').length === 0;
                    }).contents().unwrap();

                    // Get rid of temporial span's
                    $('[data-tbw]', t.$ed).contents().unwrap();

                    // Remove empty <p>
                    t.$ed.find('p:empty').remove();
                }

                if (!keepRange) {
                    t.restoreRange();
                }

                t.syncTextarea();
            }
        },

        semanticTag: function (oldTag, newTag, copyAttributes) {
            $(oldTag, this.$ed).each(function () {
                var $oldTag = $(this);
                $oldTag.wrap('<' + newTag + '/>');
                if (copyAttributes) {
                    $.each($oldTag.prop('attributes'), function () {
                        $oldTag.parent().attr(this.name, this.value);
                    });
                }
                $oldTag.contents().unwrap();
            });
        },

        // Function call when user click on "Insert Link"
        createLink: function () {
            var t = this,
                documentSelection = t.doc.getSelection(),
                node = documentSelection.focusNode,
                url,
                title,
                target;

            while (['A', 'DIV'].indexOf(node.nodeName) < 0) {
                node = node.parentNode;
            }

            if (node && node.nodeName === 'A') {
                var $a = $(node);
                url = $a.attr('href');
                title = $a.attr('title');
                target = $a.attr('target');
                var range = t.doc.createRange();
                range.selectNode(node);
                documentSelection.removeAllRanges();
                documentSelection.addRange(range);
            }

            t.saveRange();

            t.openModalInsert(t.lang.createLink, {
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
                    value: t.getRangeText()
                },
                target: {
                    label: t.lang.target,
                    value: target
                }
            }, function (v) { // v is value
                var link = $(['<a href="', v.url, '">', v.text, '</a>'].join(''));
                if (v.title.length > 0) {
                    link.attr('title', v.title);
                }
                if (v.target.length > 0) {
                    link.attr('target', v.target);
                }
                t.range.deleteContents();
                t.range.insertNode(link[0]);
                return true;
            });
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
            t.openModalInsert(t.lang.insertImage, {
                url: {
                    label: 'URL',
                    required: true
                },
                alt: {
                    label: t.lang.description,
                    value: t.getRangeText()
                }
            }, function (v) { // v are values
                t.execCmd('insertImage', v.url);
                $('img[src="' + v.url + '"]:not([alt])', t.$box).attr('alt', v.alt);
                return true;
            });
        },
        fullscreen: function () {
            var t = this,
                prefix = t.o.prefix,
                fullscreenCssClass = prefix + 'fullscreen',
                isFullscreen;

            t.$box.toggleClass(fullscreenCssClass);
            isFullscreen = t.$box.hasClass(fullscreenCssClass);
            $('body').toggleClass(prefix + 'body-fullscreen', isFullscreen);
            $(window).trigger('scroll');
            t.$c.trigger('tbw' + (isFullscreen ? 'open' : 'close') + 'fullscreen');
        },


        /*
         * Call method of trumbowyg if exist
         * else try to call anonymous function
         * and finaly native execCommand
         */
        execCmd: function (cmd, param, forceCss, skipTrumbowyg) {
            var t = this;
            skipTrumbowyg = !!skipTrumbowyg || '';

            if (cmd !== 'dropdown') {
                t.$ed.focus();
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
                }

                if (cmd !== 'dropdown') {
                    t.updateButtonPaneStatus();
                    t.$c.trigger('tbwchange');
                }
            }
        },


        // Open a modal box
        openModal: function (title, content) {
            var t = this,
                prefix = t.o.prefix;

            // No open a modal box when exist other modal box
            if ($('.' + prefix + 'modal-box', t.$box).length > 0) {
                return false;
            }

            t.saveRange();
            t.showOverlay();

            // Disable all btnPane btns
            t.$btnPane.addClass(prefix + 'disable');

            // Build out of ModalBox, it's the mask for animations
            var $modal = $('<div/>', {
                class: prefix + 'modal ' + prefix + 'fixed-top'
            }).css({
                top: t.$btnPane.height()
            }).appendTo(t.$box);

            // Click on overlay close modal by cancelling them
            t.$overlay.one('click', function () {
                $modal.trigger('tbwcancel');
                return false;
            });

            // Build the form
            var $form = $('<form/>', {
                action: '',
                html: content
            })
                .on('submit', function () {
                    $modal.trigger('tbwconfirm');
                    return false;
                })
                .on('reset', function () {
                    $modal.trigger('tbwcancel');
                    return false;
                });


            // Build ModalBox and animate to show them
            var $box = $('<div/>', {
                class: prefix + 'modal-box',
                html: $form
            })
                .css({
                    top: '-' + t.$btnPane.outerHeight() + 'px',
                    opacity: 0
                })
                .appendTo($modal)
                .animate({
                    top: 0,
                    opacity: 1
                }, 100);


            // Append title
            $('<span/>', {
                text: title,
                class: prefix + 'modal-title'
            }).prependTo($box);

            $modal.height($box.outerHeight() + 10);


            // Focus in modal box
            $('input:first', $box).focus();


            // Append Confirm and Cancel buttons
            t.buildModalBtn('submit', $box);
            t.buildModalBtn('reset', $box);


            $(window).trigger('scroll');

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
            var $modalBox = $('.' + prefix + 'modal-box', t.$box);

            $modalBox.animate({
                top: '-' + $modalBox.height()
            }, 100, function () {
                $modalBox.parent().remove();
                t.hideOverlay();
            });

            t.restoreRange();
        },
        // Preformated build and management modal
        openModalInsert: function (title, fields, cmd) {
            var t = this,
                prefix = t.o.prefix,
                lg = t.lang,
                html = '',
                CONFIRM_EVENT = 'tbwconfirm';

            $.each(fields, function (fieldName, field) {
                var l = field.label,
                    n = field.name || fieldName,
                    a = field.attributes || {};

                var attr = Object.keys(a).map(function (prop) {
                    return prop + '="' + a[prop] + '"';
                }).join(' ');

                html += '<label><input type="' + (field.type || 'text') + '" name="' + n + '" value="' + (field.value || '').replace(/"/g, '&quot;') + '"' + attr + '><span class="' + prefix + 'input-infos"><span>' +
                    ((!l) ? (lg[fieldName] ? lg[fieldName] : fieldName) : (lg[l] ? lg[l] : l)) +
                    '</span></span></label>';
            });

            return t.openModal(title, html)
                .on(CONFIRM_EVENT, function () {
                    var $form = $('form', $(this)),
                        valid = true,
                        values = {};

                    $.each(fields, function (fieldName, field) {
                        var $field = $('input[name="' + fieldName + '"]', $form),
                            inputType = $field.attr('type');

                        if (inputType.toLowerCase() === 'checkbox') {
                            values[fieldName] = $field.is(':checked');
                        } else {
                            values[fieldName] = $.trim($field.val());
                        }
                        // Validate value
                        if (field.required && values[fieldName] === '') {
                            valid = false;
                            t.addErrorOnModalField($field, t.lang.required);
                        } else if (field.pattern && !field.pattern.test(values[fieldName])) {
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
                .one('tbwcancel', function () {
                    $(this).off(CONFIRM_EVENT);
                    t.closeModal();
                });
        },
        addErrorOnModalField: function ($field, err) {
            var prefix = this.o.prefix,
                $label = $field.parent();

            $field
                .on('change keyup', function () {
                    $label.removeClass(prefix + 'input-error');
                });

            $label
                .addClass(prefix + 'input-error')
                .find('input+span')
                .append(
                    $('<span/>', {
                        class: prefix + 'msg-error',
                        text: err
                    })
                );
        },


        // Range management
        saveRange: function () {
            var t = this,
                documentSelection = t.doc.getSelection();

            t.range = null;

            if (documentSelection.rangeCount) {
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
            }
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

            documentSelection.removeAllRanges();
            documentSelection.addRange(range || savedRange);
        },
        getRangeText: function () {
            return this.range + '';
        },

        updateButtonPaneStatus: function () {
            var t = this,
                prefix = t.o.prefix,
                tags = t.getTagsRecursive(t.doc.getSelection().focusNode),
                activeClasses = prefix + 'active-button ' + prefix + 'active';

            $('.' + prefix + 'active-button', t.$btnPane).removeClass(activeClasses);
            $.each(tags, function (i, tag) {
                var btnName = t.tagToButton[tag.toLowerCase()],
                    $btn = $('.' + prefix + btnName + '-button', t.$btnPane);

                if ($btn.length > 0) {
                    $btn.addClass(activeClasses);
                } else {
                    try {
                        $btn = $('.' + prefix + 'dropdown .' + prefix + btnName + '-dropdown-button', t.$box);
                        var dropdownBtnName = $btn.parent().data('dropdown');
                        $('.' + prefix + dropdownBtnName + '-button', t.$box).addClass(activeClasses);
                    } catch (e) {
                    }
                }
            });
        },
        getTagsRecursive: function (element, tags) {
            var t = this;
            tags = tags || (element && element.tagName ? [element.tagName] : []);

            if (element && element.parentNode) {
                element = element.parentNode;
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

            return t.getTagsRecursive(element, tags);
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
            $.each(this.loadedPlugins, function (i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy();
                }
            });
        }
    };
})(navigator, window, document, jQuery);
