/**
 * Trumbowyg v1.1.6 - A lightweight WYSIWYG editor
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
            viewHTML:       "View HTML",

            formatting:     "Formatting",
            p:              "Paragraph",
            blockquote:     "Quote",
            code:           "Code",
            header:         "Header",

            bold:           "Bold",
            italic:         "Italic",
            strikethrough:  "Stroke",
            underline:      "Underline",

            strong:         "Strong",
            em:             "Emphasis",
            del:            "Deleted",

            unorderedList:  "Unordered list",
            orderedList:    "Ordered list",

            insertImage:    "Insert Image",
            insertVideo:    "Insert Video",
            link:           "Link",
            createLink:     "Insert link",
            unlink:         "Remove link",

            justifyLeft:    "Align Left",
            justifyCenter:  "Align Center",
            justifyRight:   "Align Right",
            justifyFull:    "Align Justify",

            horizontalRule: "Insert horizontal rule",

            fullscreen:     "fullscreen",

            close:          "Close",

            submit:         "Confirm",
            reset:          "Cancel",

            invalidUrl:     "Invalid URL",
            required:       "Required",
            description:    "Description",
            title:          "Title",
            text:           "Text"
        }
    },

    // User default options
    opts: {},

    btnsGrps: {
        design:     ['bold', 'italic', 'underline', 'strikethrough'],
        semantic:   ['strong', 'em', 'del'],
        justify:    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        lists:      ['unorderedList', 'orderedList']
    }
};



(function(window, document, $, undefined){
    'use strict';

    // @param : o are options
    // @param : p are params
    $.fn.trumbowyg = function(o, p){
        if(o === Object(o) || !o){
            return this.each(function(){
                if(!$(this).data('trumbowyg'))
                    $(this).data('trumbowyg', new Trumbowyg(this, o));
            });
        } else if(this.length === 1){
            try {
                var t = $(this).data('trumbowyg');
                switch(o){
                    // Modal box
                    case 'openModal':
                        return t.openModal(p.title, p.content);
                    case 'closeModal':
                        return t.closeModal();
                    case 'openModalInsert':
                        return t.openModalInsert(p.title, p.fields, p.callback);

                    // Selection
                    case 'saveSelection':
                        return t.saveSelection();
                    case 'getSelection':
                        return t.selection;
                    case 'getSelectedText':
                        return t.selection+'';
                    case 'restoreSelection':
                        return t.restoreSelection();

                    // Destroy
                    case 'destroy':
                        return t.destroy();

                    // Empty
                    case 'empty':
                        return t.empty();

                    // Public options
                    case 'lang':
                        return t.lang;
                    case 'duration':
                        return t.o.duration;

                    // HTML
                    case 'html':
                        return t.html(p);
                }
            } catch(e){}
        }

        return false;
    };

    var Trumbowyg = function(editorElem, opts){
        var t = this;
        // Get the document of the element. It use to makes the plugin
        // compatible on iframes.
        t.doc = editorElem.ownerDocument || document;
        // jQuery object of the editor
        t.$e = $(editorElem);
        t.$creator = $(editorElem);

        // Extend with options
        opts = $.extend(true, {}, opts, $.trumbowyg.opts);

        // Localization management
        if(typeof opts.lang === 'undefined' || typeof $.trumbowyg.langs[opts.lang] === 'undefined')
            t.lang = $.trumbowyg.langs.en;
        else
            t.lang = $.extend(true, {}, $.trumbowyg.langs.en, $.trumbowyg.langs[opts.lang]);

        // Defaults Options
        t.o = $.extend(true, {}, {
            lang: 'en',
            dir: 'ltr',
            duration: 200, // Duration of modal box animations

            mobile: false,
            tablet: true,
            closable: false,
            fullscreenable: true,
            fixedBtnPane: false,
            fixedFullWidth: false,
            autogrow: false,

            prefix: 'trumbowyg-',

            // WYSIWYG only
            convertLink: true, // TODO
            semantic: false,
            resetCss: false,

            btns: [
                'viewHTML',
                '|', 'formatting',
                '|', $.trumbowyg.btnsGrps.design,
                '|', 'link',
                '|', 'insertImage',
                '|', $.trumbowyg.btnsGrps.justify,
                '|', $.trumbowyg.btnsGrps.lists,
                '|', 'horizontalRule'
            ],
            btnsAdd: [],

            /**
             * When the button is associated to a empty object
             * func and title attributs are defined from the button key value
             *
             * For example
             *      foo: {}
             * is equivalent to :
             *      foo: {
             *          func: 'foo',
             *          title: this.lang.foo
             *      }
             */
            btnsDef: {
                viewHTML: {
                    func: 'toggle'
                },

                p: {
                    func: 'formatBlock'
                },
                blockquote: {
                    func: 'formatBlock'
                },
                h1: {
                    func: 'formatBlock',
                    title: t.lang.header + ' 1'
                },
                h2: {
                    func: 'formatBlock',
                    title: t.lang.header + ' 2'
                },
                h3: {
                    func: 'formatBlock',
                    title: t.lang.header + ' 3'
                },
                h4: {
                    func: 'formatBlock',
                    title: t.lang.header + ' 4'
                },

                bold: {},
                italic: {},
                underline: {},
                strikethrough: {},

                strong: {
                    func: 'bold'
                },
                em: {
                    func: 'italic'
                },
                del: {
                    func: 'strikethrough'
                },

                createLink: {},
                unlink: {},

                insertImage: {},

                justifyLeft: {},
                justifyCenter: {},
                justifyRight: {},
                justifyFull: {},

                unorderedList: {
                    func: 'insertUnorderedList'
                },
                orderedList: {
                    func: 'insertOrderedList'
                },

                horizontalRule: {
                    func: 'insertHorizontalRule'
                },

                // Dropdowns
                formatting: {
                    dropdown: ['p', 'blockquote', 'h1', 'h2', 'h3', 'h4']
                },
                link: {
                    dropdown: ['createLink', 'unlink']
                }
            }
        }, opts);

        if(t.o.semantic && !opts.btns)
            t.o.btns = [
                'viewHTML',
                '|', 'formatting',
                '|', $.trumbowyg.btnsGrps.semantic,
                '|', 'link',
                '|', 'insertImage',
                '|', $.trumbowyg.btnsGrps.justify,
                '|', $.trumbowyg.btnsGrps.lists,
                '|', 'horizontalRule'
            ];
        else if(opts && opts.btns)
            t.o.btns = opts.btns;

        t.init();
    };

    Trumbowyg.prototype = {
        init: function(){
            var t = this;
            t.height = t.$e.css('height');

            if(t.isEnabled()){
                t.buildEditor(true);
                return;
            }

            t.buildEditor();
            t.buildBtnPane();

            t.fixedBtnPaneEvents();

            t.buildOverlay();
        },

        buildEditor: function(disable){
            var t = this,
                pfx = t.o.prefix,
                html = '';


            if(disable === true){
                if(!t.$e.is('textarea')){
                    var textarea = t.buildTextarea().val(t.$e.val());
                    t.$e.hide().after(textarea);
                }
                return;
            }


            t.$box = $('<div/>', {
                class: pfx + 'box ' + pfx + t.o.lang + ' trumbowyg'
            });

            t.isTextarea = true;
            if(t.$e.is('textarea'))
                t.$editor = $('<div/>');
            else {
                t.$editor = t.$e;
                t.$e = t.buildTextarea().val(t.$e.val());
                t.isTextarea = false;
            }

            if(t.$creator.is('[placeholder]'))
                t.$editor.attr('placeholder', t.$creator.attr('placeholder'));

            t.$e.hide()
                   .addClass(pfx + 'textarea');


            if(t.isTextarea){
                html = t.$e.val();
                t.$box.insertAfter(t.$e)
                         .append(t.$editor)
                         .append(t.$e);
            } else {
                html = t.$editor.html();
                t.$box.insertAfter(t.$editor)
                         .append(t.$e)
                         .append(t.$editor);
                t.syncCode();
            }

            t.$editor.addClass(pfx + 'editor')
                        .attr('contenteditable', true)
                        .attr('dir', t.lang._dir || t.o.dir)
                        .html(html);

            if(t.o.resetCss)
                t.$editor.addClass(pfx + 'reset-css');

            if(!t.o.autogrow){
                $.each([t.$editor, t.$e], function(i, $el){
                    $el.css({
                        height: t.height,
                        overflow: 'auto'
                    });
                });
            }

            if(t.o.semantic){
                t.$editor.html(
                    t.$editor.html()
                        .replace('<br>', '</p><p>')
                        .replace('&nbsp;', '')
                );
                t.semanticCode();
            }



            t.$editor
            .on('dblclick', 'img', function(e){
                var $img = $(this);
                t.openModalInsert(t.lang.insertImage, {
                    url: {
                        label: 'URL',
                        value: $img.attr('src'),
                        required: true
                    },
                    alt: {
                        label: 'description',
                        value: $img.attr('alt')
                    }
                }, function(v){
                    $img.attr({
                        src: v.url,
                        alt: v.alt
                    });
                });
                e.stopPropagation();
            })
            .on('keyup', function(e){
                t.semanticCode(false, e.which === 13);
            })
            .on('focus', function(){
                t.$creator.trigger('tbwfocus');
            })
            .on('blur', function(){
                t.syncCode();
                t.$creator.trigger('tbwblur');
            });
        },


        // Build the Textarea which contain HTML generated code
        buildTextarea: function(){
            return $('<textarea/>', {
                name: this.$e.attr('id'),
                height: this.height
            });
        },


        // Build button pane, use o.btns and o.btnsAdd options
        buildBtnPane: function(){
            var t = this,
                pfx = t.o.prefix;

            if(t.o.btns === false)
                return;

            t.$btnPane = $('<ul/>', {
                class: pfx + 'button-pane'
            });

            $.each(t.o.btns.concat(t.o.btnsAdd), function(i, btn){
                // Managment of group of buttons
                try {
                    var b = btn.split('btnGrp-');
                    if(b[1] !== undefined)
                        btn = $.trumbowyg.btnsGrps[b[1]];
                } catch(e){}

                if(!$.isArray(btn))
                    btn = [btn];

                $.each(btn, function(i, b){
                    try { // Prevent buildBtn error
                        var $li = $('<li/>');

                        if(b === '|') // It's a separator
                            $li.addClass(pfx + 'separator');
                        else if(t.isSupportedBtn(b)) // It's a supported button
                            $li.append(t.buildBtn(b));

                        t.$btnPane.append($li);
                    } catch(e){}
                });
            });

            // Build right li for fullscreen and close buttons
            var $liRight = $('<li/>', {
                class: pfx + 'not-disable ' + pfx + 'buttons-right'
            });

            // Add the fullscreen button
            if(t.o.fullscreenable)
                $liRight.append(
                    t.buildRightBtn('fullscreen')
                    .on('click', function(){
                        var cssClass = pfx + 'fullscreen';
                        t.$box.toggleClass(cssClass);

                        if(t.$box.hasClass(cssClass)){
                            $('body').css('overflow', 'hidden');
                            $.each([t.$editor, t.$e], function(){
                                $(this).css({
                                    height: 'calc(100% - 35px)',
                                    overflow: 'auto'
                                });
                            });
                            t.$btnPane.css('width', '100%');
                        } else {
                            $('body').css('overflow', 'auto');
                            t.$box.removeAttr('style');
                            if(!t.o.autogrow)
                                $.each([t.$editor, t.$e], function(){
                                    $(this).css('height', t.height);
                                });
                        }
                        $(window).trigger('scroll');
                    })
                );

            // Build and add close button
            if(t.o.closable)
                $liRight
                    .append(
                        t.buildRightBtn('close')
                        .on('click', function(){
                            if(t.$box.hasClass(pfx + 'fullscreen'))
                                $('body').css('overflow', 'auto');
                            t.destroy();
                        })
                    );


            // Add right li only if isn't empty
            if($liRight.not(':empty'))
                t.$btnPane.append($liRight);

            t.$box.prepend(t.$btnPane);
        },


        // Build a button and his action
        buildBtn: function(n){ // n is name of the button
            var t = this,
                pfx = t.o.prefix,
                btn = t.o.btnsDef[n],
                d = btn.dropdown,
                textDef = t.lang[n] || n,

                $btn = $('<button/>', {
                    type: 'button',
                    class: pfx + n +'-button' + (btn.ico ? ' '+ pfx + btn.ico +'-button' : ''),
                    text: btn.text || btn.title || textDef,
                    title: btn.title || btn.text || textDef,
                    mousedown: function(e){
                        if(!d || t.$box.find('.'+n+'-'+pfx + 'dropdown').is(':hidden'))
                            $('body', t.doc).trigger('mousedown');

                        if(t.$btnPane.hasClass(pfx + 'disable') && !$(this).hasClass(pfx + 'active') && !$(this).parent().hasClass(pfx + 'not-disable'))
                            return false;

                        t.execCmd((d ? 'dropdown' : false) || btn.func || n,
                                  btn.param || n);

                        e.stopPropagation();
                        e.preventDefault();
                    }
                });



            if(d){
                $btn.addClass(pfx + 'open-dropdown');
                var c = pfx + 'dropdown',
                    dd = $('<div/>', { // the dropdown
                        class: n + '-' + c + ' ' + c + ' ' + pfx + 'fixed-top'
                    });
                $.each(d, function(i, def){
                    if(t.o.btnsDef[def] && t.isSupportedBtn(def))
                        dd.append(t.buildSubBtn(def));
                });
                t.$box.append(dd.hide());
            }

            return $btn;
        },
        // Build a button for dropdown menu
        // @param n : name of the subbutton
        buildSubBtn: function(n){
            var t = this,
                btnDef = t.o.btnsDef[n];
            return $('<button/>', {
                type: 'button',
                text: btnDef.text || btnDef.title || t.lang[n] || n,
                style: btnDef.style || null,
                mousedown: function(e){
                    $('body', t.doc).trigger('mousedown');

                    t.execCmd(btnDef.func || n,
                              btnDef.param || n);

                    e.stopPropagation();
                }
            });
        },
        // Build a button for right li
        // @param n : name of the right button
        buildRightBtn: function(n){
            return $('<button/>', {
                type: 'button',
                class: this.o.prefix + n + '-button',
                title: this.lang[n],
                text: this.lang[n]
            });
        },
        // Check if button is supported
        isSupportedBtn: function(btn){
            var def = this.o.btnsDef[btn];
            return typeof def.isSupported !== 'function' || def.isSupported();
        },

        // Build overlay for modal box
        buildOverlay: function(){
            var t = this;
            t.$overlay = $('<div/>', {
                class: t.o.prefix + 'overlay'
            }).css({
                top: t.$btnPane.outerHeight(),
                height: (parseInt(t.$editor.outerHeight()) + 1) + 'px'
            }).appendTo(t.$box);
            return t.$overlay;
        },
        showOverlay: function(){
            var t = this;
            $(window).trigger('scroll');
            t.$overlay.fadeIn(t.o.duration);
            t.$box.addClass(t.o.prefix + 'box-blur');
        },
        hideOverlay: function(){
            var t = this;
            t.$overlay.fadeOut(t.o.duration/4);
            t.$box.removeClass(t.o.prefix + 'box-blur');
        },

        // Management of fixed button pane
        fixedBtnPaneEvents: function(){
            var t = this,
                ffw = t.o.fixedFullWidth;
            if(!t.o.fixedBtnPane)
                return;

            t.isFixed = false;

            $(window)
            .on('scroll resize', function(){
                if(!t.$box)
                    return;

                t.syncCode();

                var s = $(window).scrollTop(), // s is top scroll
                    o = t.$box.offset().top + 1, // o is offset
                    toFixed = (s - o > 0) && ((s - o - parseInt(t.height)) < 0),
                    bp = t.$btnPane,
                    mt = bp.css('height'),
                    oh = bp.outerHeight();

                if(toFixed){
                    if(!t.isFixed){
                        t.isFixed = true;
                        bp.css({
                            position: 'fixed',
                            top: 0,
                            left: ffw ? '0' : 'auto',
                            zIndex: 7
                        });
                        $([t.$editor, t.$e]).css({ marginTop: mt });
                    }
                    bp.css({
                        width: ffw ? '100%' : ((parseInt(t.$box.css('width'))-1) + 'px')
                    });

                    $('.' + t.o.prefix + 'fixed-top', t.$box).css({
                        position: ffw ? 'fixed' : 'absolute',
                        top: ffw ? oh : parseInt(oh) + (s - o) + 'px',
                        zIndex: 15
                    });
                } else if(t.isFixed) {
                    t.isFixed = false;
                    bp.removeAttr('style');
                    $([t.$editor, t.$e]).css({ marginTop: 0 });
                    $('.' + t.o.prefix + 'fixed-top', t.$box).css({
                        position: 'absolute',
                        top: oh
                    });
                }
            });
        },



        // Destroy the editor
        destroy: function(){
            var t = this,
                pfx = t.o.prefix,
                h = t.height,
                html = t.html();

            if(t.isTextarea)
                t.$box.after(
                    t.$e.css({ height: h })
                        .val(html)
                        .removeClass(pfx + 'textarea')
                        .show()
                );
            else
                t.$box.after(
                    t.$editor
                        .css({ height: h })
                        .removeClass(pfx + 'editor')
                        .removeAttr('contenteditable')
                        .html(html)
                        .show()
                );

            t.$box.remove();
            t.$creator.removeData('trumbowyg');
        },



        // Empty the editor
        empty: function(){
            this.$e.val('');
            this.syncCode(true);
        },



        // Function call when click on viewHTML button
        toggle: function(){
            var t = this,
                pfx = t.o.prefix;
            t.semanticCode(false, true);
            t.$editor.toggle();
            t.$e.toggle();
            t.$btnPane.toggleClass(pfx + 'disable');
            t.$btnPane.find('.'+pfx + 'viewHTML-button').toggleClass(pfx + 'active');
        },

        // Open dropdown when click on a button which open that
        dropdown: function(name){
            var t = this,
                d = t.doc,
                pfx = t.o.prefix,
                $dropdown = t.$box.find('.'+name+'-'+pfx + 'dropdown'),
                $btn = t.$btnPane.find('.'+pfx+name+'-button');

            if($dropdown.is(':hidden')){
                var o = $btn.offset().left;
                $btn.addClass(pfx + 'active');

                $dropdown.css({
                    position: 'absolute',
                    top: t.$btnPane.outerHeight(),
                    left: (t.o.fixedFullWidth && t.isFixed) ? o+'px' : (o - t.$btnPane.offset().left)+'px'
                }).show();

                $(window).trigger('scroll');

                $('body', d).on('mousedown', function(){
                    $('.' + pfx + 'dropdown', d).hide();
                    $('.' + pfx + 'active', d).removeClass(pfx + 'active');
                    $('body', d).off('mousedown');
                });
            } else
                $('body', d).trigger('mousedown');
        },




        // HTML Code management
        html: function(html){
            var t = this;
            if(html){
                t.$e.val(html);
                t.syncCode(true);
                return t;
            } else
                return t.$e.val();
        },
        syncCode: function(force){
            var t = this;
            if(!force && t.$editor.is(':visible'))
                t.$e.val(t.$editor.html());
            else
                t.$editor.html(t.$e.val());

            if(t.o.autogrow){
                t.height = t.$editor.css('height');
                t.$e.css({ height: t.height });
            }
        },

        // Analyse and update to semantic code
        // @param force : force to sync code from textarea
        // @param full  : wrap text nodes in <p>
        semanticCode: function(force, full){
            var t = this;
            t.syncCode(force);

            if(t.o.semantic){
                t.semanticTag('b', 'strong');
                t.semanticTag('i', 'em');
                t.semanticTag('strike', 'del');

                if(full){
                    // Wrap text nodes in p
                    t.$editor.contents()
                    .filter(function(){
                        // Only non-empty text nodes
                        return this.nodeType === 3 && $.trim(this.nodeValue).length > 0;
                    }).wrap('<p></p>').end()

                    // Remove all br
                    .filter('br').remove();

                    t.saveSelection();
                    t.semanticTag('div', 'p');
                    t.restoreSelection();
                }

                t.$e.val(t.$editor.html());
            }
        },
        semanticTag: function(oldTag, newTag){
            $(oldTag, this.$editor).each(function(){
                $(this).replaceWith(function(){
                    return '<'+newTag+'>' + $(this).html() + '</'+newTag+'>';
                });
            });
        },


        // Function call when user click on "Insert Link"
        createLink: function(){
            var t = this;
            t.saveSelection();
            t.openModalInsert(t.lang.createLink, {
                url: {
                    label: 'URL',
                    value: 'http://',
                    required: true
                },
                title: {
                    label: t.lang.title,
                    value: t.selection
                },
                text: {
                    label: t.lang.text,
                    value: t.selection
                }
            }, function(v){ // v is value
                t.execCmd('createLink', v.url);
                var l = $('a[href="'+v.url+'"]:not([title])', t.$box);
                if(v.text.length > 0)
                    l.text(v.text);

                if(v.title.length > 0)
                    l.attr('title', v.title);

                return true;
            });
        },
        insertImage: function(){
            var t = this;
            t.saveSelection();
            t.openModalInsert(t.lang.insertImage, {
                url: {
                    label: 'URL',
                    value: 'http://',
                    required: true
                },
                alt: {
                    label: t.lang.description,
                    value: t.selection
                }
            }, function(v){ // v are values
                t.execCmd('insertImage', v.url);
                $('img[src="'+v.url+'"]:not([alt])', t.$box).attr('alt', v.alt);
                return true;
            });
        },


        /*
         * Call method of trumbowyg if exist
         * else try to call anonymous function
         * and finaly native execCommand
         */
        execCmd: function(cmd, param){
            var t = this;
            if(cmd != 'dropdown')
                t.$editor.focus();

            try {
                t[cmd](param);
            } catch(e){
                try {
                    cmd(param, t);
                } catch(e2){
                    //t.$editor.focus();
                    if(cmd == 'insertHorizontalRule')
                        param = null;
                    else if(cmd == 'formatBlock' && (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0))
                        param = '<' + param + '>';

                    t.doc.execCommand(cmd, false, param);
                }
            }
            t.syncCode();
        },


        // Open a modal box
        openModal: function(title, content){
            var t = this,
                pfx = t.o.prefix;

            // No open a modal box when exist other modal box
            if($('.' + pfx + 'modal-box', t.$box).size() > 0)
                return false;

            t.saveSelection();
            t.showOverlay();

            // Disable all btnPane btns
            t.$btnPane.addClass(pfx + 'disable');

            // Build out of ModalBox, it's the mask for animations
            var $modal = $('<div/>', {
                class: pfx + 'modal ' + pfx + 'fixed-top'
            }).css({
                top: (parseInt(t.$btnPane.css('height')) + 1) + 'px'
            }).appendTo(t.$box);

            // Click on overflay close modal by cancelling them
            t.$overlay.one('click', function(e){
                e.preventDefault();
                $modal.trigger(pfx + 'cancel');
            });

            // Build the form
            var $form = $('<form/>', {
                action: '',
                html: content
            })
            .on('submit', function(e){
                e.preventDefault();
                $modal.trigger(pfx + 'confirm');
            })
            .on('reset', function(e){
                e.preventDefault();
                $modal.trigger(pfx + 'cancel');
            });


            // Build ModalBox and animate to show them
            var $box = $('<div/>', {
                class: pfx + 'modal-box',
                html: $form
            })
            .css({
                top: '-' + parseInt(t.$btnPane.outerHeight()) + 'px',
                opacity: 0
            })
            .appendTo($modal)
            .animate({
                top: 0,
                opacity: 1
            }, t.o.duration / 2);


            // Append title
            $('<span/>', {
                text: title,
                class: pfx + 'modal-title'
            }).prependTo($box);


            // Focus in modal box
            $box.find('input:first').focus();


            // Append Confirm and Cancel buttons
            t.buildModalBtn('submit', $box);
            t.buildModalBtn('reset', $box);


            $(window).trigger('scroll');

            return $modal;
        },
        // @param n is name of modal
        buildModalBtn: function(n, modal){
            var t = this,
                pfx = t.o.prefix;

            return $('<button/>', {
                class: pfx + 'modal-button ' + pfx + 'modal-' + n,
                type: n,
                text: t.lang[n] || n
            }).appendTo(modal.find('form'));
        },
        // close current modal box
        closeModal: function(){
            var t = this,
                pfx = t.o.prefix;

            t.$btnPane.removeClass(pfx + 'disable');
            t.$overlay.off();

            var $modalBox = $('.' + pfx + 'modal-box', t.$box);

            $modalBox.animate({
                top: '-' + $modalBox.css('height')
            }, t.o.duration/2, function(){
                $(this).parent().remove();
                t.hideOverlay();
            });
        },
        // Preformated build and management modal
        openModalInsert: function(title, fields, cmd){
            var t = this,
                pfx  = t.o.prefix,
                lg = t.lang,
                html = '';

            for(var f in fields){
                var fd = fields[f], // field definition
                    label = (fd.label === undefined) ? (lg[f] ? lg[f] : f) : (lg[fd.label] ? lg[fd.label] : fd.label);

                if(fd.name === undefined)
                    fd.name = f;

                if(!fd.pattern && f === 'url'){
                    fd.pattern = /^(http|https):\/\/([\w~#!:.?+=&%@!\-\/]+)$/;
                    fd.patternError = lg.invalidUrl;
                }

                html += '<label><input type="'+(fd.type || 'text')+'" name="'+fd.name+'" value="'+(fd.value || '')+'"><span class="'+pfx+'input-infos"><span>'+label+'</span></span></label>';
            }

            return t.openModal(title, html)
            .on(pfx + 'confirm', function(){
                var $form = $(this).find('form'),
                    valid = true,
                    v = {}; // values

                for(var f in fields){
                    var $field = $('input[name="'+f+'"]', $form);

                    v[f] = $.trim($field.val());

                    // Validate value
                    if(fields[f].required && v[f] === ''){
                        valid = false;
                        t.addErrorOnModalField($field, t.lang.required);
                    } else if(fields[f].pattern && !fields[f].pattern.test(v[f])){
                        valid = false;
                        t.addErrorOnModalField($field, fields[f].patternError);
                    }
                }

                if(valid){
                    t.restoreSelection();

                    if(cmd(v, fields)){
                        t.syncCode();
                        t.closeModal();
                        $(this).off(pfx + 'confirm');
                    }
                }
            })
            .one(pfx + 'cancel', function(){
                $(this).off(pfx + 'confirm');
                t.closeModal();
                t.restoreSelection();
            });
        },
        addErrorOnModalField: function($field, err){
            var pfx = this.o.prefix,
                $label = $field.parent();

            $field.on('change keyup', function(){
                $label.removeClass(pfx + 'input-error');
            });
            $label
            .addClass(pfx + 'input-error')
            .find('input+span').append(
                $('<span/>', {
                    class: pfx +'msg-error',
                    text: err
                })
            );
        },




        // Selection management
        saveSelection: function(){
            var t = this,
                d = t.doc;

            t.selection = null;
            if(window.getSelection){
                var s = window.getSelection();
                if(s.getRangeAt && s.rangeCount)
                    t.selection = s.getRangeAt(0);
            } else if(d.selection && d.selection.createRange)
                t.selection = d.selection.createRange();
        },
        restoreSelection: function(){
            var t = this,
                range = t.selection;

            if(range){
                if(window.getSelection){
                    var s = window.getSelection();
                    s.removeAllRanges();
                    s.addRange(range);
                } else if(t.doc.selection && range.select)
                    range.select();
            }
        },



        // Return true if must enable Trumbowyg on this mobile device
        isEnabled: function(){
            var exprTablet = new RegExp("(iPad|webOS)"),
                exprMobile = new RegExp("(iPhone|iPod|Android|BlackBerry|Windows Phone|ZuneWP7)"),
                ua = navigator.userAgent;

            return (this.o.tablet === true && exprTablet.test(ua)) || (this.o.mobile === true && exprMobile.test(ua));
        }
    };
})(window, document, jQuery);