/*!
 * ZUI: 看板 - v1.8.1 - 2018-01-18
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: boards.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    if(!$.fn.droppable) throw new Error('Droppable requires for boards');

    var Boards = function(element, options) {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.getLang();
        this.init();
    };

    Boards.DEFAULTS = {
        // lang: null,
        langs: {
            'zh_cn': {
                append2end: '移动到末尾'
            },
            'zh_tw': {
                append2end: '移动到末尾'
            },
            'en': {
                append2end: 'Move to the end.'
            }
        }
    }; // default options

    Boards.prototype.getOptions = function(options) {
        options = $.extend({lang: $.zui.clientLang()}, Boards.DEFAULTS, this.$.data(), options);
        return options;
    };

    Boards.prototype.getLang = function() {
        var options = this.options;
        this.lang = options.langs[options.lang] || options.langs[Boards.DEFAULTS.lang];
    };

    Boards.prototype.init = function() {
        var idSeed = 1;
        var lang = this.lang;
        this.$.find('.board-item:not(".disable-drop"), .board:not(".disable-drop")').each(function() {
            var $this = $(this);
            if($this.attr('id')) {
                $this.attr('data-id', $this.attr('id'));
            } else if(!$this.attr('data-id')) {
                $this.attr('data-id', 'board' + (idSeed++));
            }

            if($this.hasClass('board')) {
                $this.find('.board-list').append('<div class="board-item board-item-empty"><i class="icon-plus"></i> {append2end}</div>'.format(lang))
                    .append('<div class="board-item board-item-shadow"></div>'.format(lang));
            }
        });

        this.bind();
    };

    Boards.prototype.bind = function(items) {
        var $boards = this.$,
            setting = this.options;

        $boards.droppable($.extend({
            before: setting.before,
            target: '.board-item:not(".disable-drop, .board-item-shadow")',
            flex: true,
            selector: '.board-item:not(".disable-drop, .board-item-shadow")',
            start: function(e) {
                $boards.addClass('dragging').find('.board-item-shadow').height(e.element.outerHeight());
            },
            drag: function(e) {
                $boards.find('.board.drop-in-empty').removeClass('drop-in-empty');
                if(e.isIn) {
                    var board = e.target.closest('.board').addClass('drop-in');
                    var shadow = board.find('.board-item-shadow');
                    var target = e.target;

                    $boards.addClass('drop-in').find('.board.drop-in').not(board).removeClass('drop-in');

                    shadow.insertBefore(target);

                    board.toggleClass('drop-in-empty', target.hasClass('board-item-empty'));
                }
            },
            drop: function(e) {
                if(e.isNew) {
                    var result;
                    if($.isFunction(setting['drop'])) {
                        result = setting['drop'](e);
                    }
                    if(result !== false) e.element.insertBefore(e.target);
                }
            },
            finish: function() {
                $boards.removeClass('dragging').removeClass('drop-in').find('.board.drop-in').removeClass('drop-in');
            }
        }, setting.droppable));
    };

    $.fn.boards = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('zui.boards');
            var options = typeof option == 'object' && option;

            if(!data) $this.data('zui.boards', (data = new Boards(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.boards.Constructor = Boards;
}(jQuery));
