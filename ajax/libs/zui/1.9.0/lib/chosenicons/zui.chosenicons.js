/*!
 * ZUI: 图标选择器 - v1.9.0 - 2019-03-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2019 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: chosen.icons.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


+ function($) {
    'use strict';

    var ChosenIcons = function(element, options) {
        this.$ = $(element);
        this.options = this.getOptions(options);
        this.lang = ChosenIcons.LANGS[this.options.lang];
        this.id = 'chosen-icons-' + parseInt(Math.random() * 10000000000 + 1);

        this.init();
    };

    ChosenIcons.DEFAULTS = {
        optional: true,
        lang: 'zh_cn',
        icons: {
            common: ['heart', 'user', 'group', 'list-ul', 'th', 'th-large', 'star', 'star-empty', 'search', 'envelope', 'dashboard', 'sitemap', 'umbrella', 'lightbulb', 'envelope-alt', 'cog', 'ok', 'remove', 'home', 'time', 'flag', 'flag-alt', 'flag-checkered', 'qrcode', 'tag', 'tags', 'book', 'bookmark', 'bookmark-empty', 'print', 'camera', 'picture', 'globe', 'map-marker', 'edit', 'edit-sign', 'play', 'stop', 'plus-sign', 'minus-sign', 'remove-sign', 'ok-sign', 'check-sign', 'question-sign', 'info-sign', 'exclamation-sign', 'plus', 'plus-sign', 'minus', 'minus-sign', 'asterisk', 'calendar', 'calendar-empty', 'comment', 'comment-alt', 'comments', 'comments-alt', 'folder-close', 'folder-open', 'folder-close-alt', 'folder-open-alt', 'thumbs-up', 'thumbs-down', 'pushpin', 'building', 'phone', 'rss', 'rss-sign', 'bullhorn', 'bell', 'bell-alt', 'certificate', 'wrench', 'tasks', 'cloud', 'beaker', 'magic', 'smile', 'frown', 'meh', 'code', 'location-arrow'],
            web: ['share', 'pencil', 'trash', 'file-alt', 'file', 'file-text', 'download-alt', 'upload-alt', 'inbox', 'repeat', 'refresh', 'lock', 'check', 'check-empty', 'eye-open', 'eye-close', 'key', 'signin', 'signout', 'external-link', 'external-link-sign', 'link', 'reorder', 'quote-left', 'quote-right', 'spinner', 'reply', 'question', 'info', 'archive', 'collapse', 'collapse-top'],
            editor: ['table', 'copy', 'save', 'list-ol', 'paste', 'keyboard', 'paper-clip', 'crop', 'unlink', 'sort-by-alphabet', 'sort-by-alphabet-alt', 'sort-by-attributes', 'sort-by-attributes-alt', 'sort-by-order', 'sort-by-order-alt'],
            directional: ['chevron-left', 'chevron-right', 'chevron-down', 'chevron-up', 'arrow-left', 'arrow-right', 'arrow-down', 'arrow-up', 'hand-right', 'hand-left', 'hand-up', 'hand-down', 'circle-arrow-left', 'circle-arrow-right', 'circle-arrow-up', 'circle-arrow-down', 'double-angle-left', 'double-angle-right', 'double-angle-down', 'double-angle-up', 'angle-left', 'angle-right', 'angle-down', 'angle-up', 'long-arrow-left', 'long-arrow-right', 'long-arrow-down', 'long-arrow-up', 'caret-left', 'caret-right', 'caret-down', 'caret-up'],
            other: ['desktop', 'laptop', 'tablet', 'mobile', 'building', 'firefox', 'ie', 'opera', 'qq', 'lemon', 'sign-blank', 'circle', 'circle-blank', 'terminal', 'html5', 'android', 'apple', 'windows', 'weibo', 'wechat', 'renren', 'bug', 'moon', 'sun']
        }
    };

    ChosenIcons.LANGS = {};
    ChosenIcons.LANGS['zh_cn'] = {
        emptyIcon: '[没有图标]',
        commonIcons: '常用图标',
        webIcons: 'Web 图标',
        editorIcons: '编辑器图标',
        directionalIcons: '箭头总汇',
        otherIcons: '其他图标',
    };
    ChosenIcons.LANGS['en'] = {
        emptyIcon: '[No Icon]',
        commonIcons: 'Common Icons',
        webIcons: 'Web Icons',
        editorIcons: 'Editor Icons',
        directionalIcons: 'Directional Icons',
        otherIcons: 'Other Icons'
    };
    ChosenIcons.LANGS['zh_tw'] = {
        emptyIcon: '[沒有圖標]',
        commonIcons: '常用圖標',
        webIcons: 'Web 圖標',
        editorIcons: '編輯器圖標',
        directionalIcons: '箭頭總匯',
        otherIcons: '其他圖標'
    };

    ChosenIcons.prototype.getOptions = function(options) {
        options = $.extend(true, {
            placeholder_text: ' ',
            disable_search: true,
            width: '100%',
            inherit_select_classes: true
        }, ChosenIcons.DEFAULTS, this.$.data(), options);
        return options;
    };

    ChosenIcons.prototype.init = function() {
        var that = this;
        var $this = this.$.addClass('chosen-icons').addClass(this.id).removeClass('form-control');

        $this.empty();

        if(this.options.optional) {
            $this.append(this.getOptionHtml());
        }

        var lang = this.lang;

        var iconsHtml = [];
        $.each(this.options.icons, function(name, icons) {
            iconsHtml.push(that.getgroupHtml(name, icons));
        });

        $this.append(iconsHtml.join(''));

        $this.chosen(this.options);

        var chosenSelector = '.chosen-container.' + this.id;

        $this.on('chosen:showing_dropdown', function() {
            $(chosenSelector + ' .chosen-results .group-option').each(function() {
                var $this = $(this).addClass('icon');
                var text = $(this).text();
                $this.html('<i class="icon-' + text + '" title="' + text + '"></i>');
            });
        }).change(function() {
            var span = $(chosenSelector + ' .chosen-single > span');
            var text = $(this).val();

            if(text && text.length > 0) {
                span.html('<i class="' + text + '"></i> &nbsp; <span class="text-muted">' + text.substr(5).replace(/-/g, ' ') + '</span>');
            }
            else {
                span.html('<span class="text-muted">' + lang.emptyIcon + '</span>');
            }
        });

        var val = $this.data('value');
        if(val) {
            $this.val(val).change();
        }
    }

    ChosenIcons.prototype.getgroupHtml = function(name, icons) {
        icons = icons || this.options.icons[name]
        var iconsHtml = [],
            that = this;

        $.each(icons, function(i, icon) {
            iconsHtml.push(that.getOptionHtml(icon));
        });

        return '<optgroup label="' + this.lang[name + 'Icons'] + '">' + iconsHtml.join('') + '</optgroup>';
    }

    ChosenIcons.prototype.getOptionHtml = function(value) {
        var name = value;
        if(value && value.length > 0) {
            value = 'icon-' + value;
        } else {
            value = '';
            name = this.lang.emptyIcon;
        }
        return '<option value="' + value + '">' + name + '</option>';
    }

    $.fn.chosenIcons = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('zui.chosenIcons');
            var options = typeof option == 'object' && option;

            if(!data) $this.data('zui.chosenIcons', (data = new ChosenIcons(this, options)));

            if(typeof option == 'string') data[option]();
        })
    };

    $.fn.chosenIcons.Constructor = ChosenIcons;
}(jQuery);

