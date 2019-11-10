/*!
 * ZUI: 标签页管理器 - v1.9.0 - 2019-03-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2019 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: tabs.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2017-2018 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    /**
     * Tab object
     * @param {Object | String} tab
     */
    var Tab = function(tab) {
        var that = this;
        if(typeof tab === 'string') {
            that.url = tab;
        } else if($.isPlainObject(tab)) {
            $.extend(that, tab);
        }
        if(!that.id) {
            that.id = $.zui.uuid();
        }
        if(!that.type) {
            if(that.iframe) {
                that.type = 'iframe';
                that.url = that.url || that.iframe;
            } else if(that.ajax) {
                that.type = 'ajax';
                that.url = that.url || ($.isPlainObject(that.ajax) ? that.ajax.url : that.ajax);
            } else if(that.url) {
                that.type = tab.ajax ? 'ajax' : 'iframe';
            } else {
                that.type = 'custom';
            }
        }
        that.createTime = new Date().getTime();
        that.openTime = 0;
        that.onCreate && that.onCreate.call(that);
    };

    Tab.prototype.open = function() {
        var that = this;
        that.openTime = new Date().getTime();
        that.onOpen && that.onOpen.call(that);
    };

    Tab.prototype.close = function() {
        var that = this;
        that.openTime = 0;
        that.onClose && that.onClose.call(that);
    };

    Tab.create = function(data) {
        if (data instanceof Tab) {
            return data;
        }
        return new Tab(data);
    };

    var NAME = 'zui.tabs'; // model name
    var DEFAULTS = {
        tabs: [],
        defaultTabIcon: 'icon-window',
        contextMenu: true,
        errorTemplate: '<div class="alert alert-block alert-danger with-icon"><i class="icon-warning-sign"></i><div class="content">{0}</div></div>',
        // messagerOptions: null,
        showMessage: true,
        navTemplate: '<nav class="tabs-navbar"></nav>',
        containerTemplate: '<div class="tabs-container"></div>'
    };

    var LANG = {
        zh_cn: {
            reload: '重新加载',
            close: '关闭',
            closeOthers: '关闭其他标签页',
            closeRight: '关闭右侧标签页',
            reopenLast: '恢复上次关闭的标签页',
            errorCannotFetchFromRemote: '无法从远程服务器（{0}）获取内容。'
        },
        zh_tw: {
            reload: '重新加載',
            close: '關閉',
            closeOthers: '關閉其他標籤頁',
            closeRight: '關閉右側標籤頁',
            reopenLast: '恢復上次關閉的標籤頁',
            errorCannotFetchFromRemote: '無法從遠程服務器（{0}）獲取內容。'
        },
        en: {
            reload: 'Reload',
            close: 'Close',
            closeOthers: 'Close others',
            closeRight: 'Close right',
            reopenLast: 'Reopen last',
            errorCannotFetchFromRemote: 'Cannot fetch data from remote server {0}.'
        }
    };

    // The tabs model class
    var Tabs = function(element, options) {
        var that = this;
        that.name = NAME;
        that.$ = $(element);

        options = that.options = $.extend({}, DEFAULTS, this.$.data(), options);
        var lang   = options.lang || 'zh_cn';
        that.lang  = $.isPlainObject(lang) ? ($.extend(true, {}, LANG[lang.lang || $.zui.clientLang()], lang)) : LANG[lang];

        // Initialize here
        var $navbar = that.$.find('.tabs-navbar');
        if (!$navbar.length) {
            $navbar = $(options.navTemplate).appendTo(that.$);
        }
        that.$navbar = $navbar;

        var $nav = $navbar.find('.tabs-nav');
        if (!$nav.length) {
            $nav = $('<ul class="tabs-nav nav nav-tabs"></ul>').appendTo($navbar);
        }
        that.$nav = $nav;

        var $tabs = that.$.find('.tabs-container');
        if (!$tabs.length) {
            $tabs = $(options.containerTemplate).appendTo(that.$);
        }
        that.$tabs = $tabs;

        that.activeTabId = options.defaultTab;
        var tabs = options.tabs || [];
        that.tabs = {};
        $.each(tabs, function(index, item) {
            var tab = Tab.create(item);
            that.tabs[tab.id] = tab;

            if (!that.activeTabId) {
                that.activeTabId = tab.id;
            }

            that.renderTab(tab);
        });
        that.closedTabs = [];

        that.open(that.getActiveTab());

        $nav.on('click.' + NAME, '.tab-nav-link', function () {
            that.open(that.getTab($(this).data('id')));
        }).on('click.' + NAME, '.tab-nav-close', function (e) {
            that.close($(this).closest('.tab-nav-link').data('id'));
            e.stopPropagation();
        }).on('resize.' + NAME, function () {
            that.adjustNavs();
        });

        if (options.contextMenu) {
            $nav.contextmenu({
                selector: '.tab-nav-link',
                itemsCreator: function (e) {
                    return that.createMenuItems(that.getTab($(this).data('id')));
                },
                onShow: function () {
                    that.$.addClass('tabs-show-contextmenu');
                },
                onHide: function () {
                    that.$.removeClass('tabs-show-contextmenu');
                }
            });
        }
    };

    Tabs.prototype.createMenuItems = function (tab) {
        var that = this;
        var lang = that.lang;
        return [{
            label: lang.reload,
            onClick: function () {
                that.open(tab, true);
            }
        }, '-', {
            label: lang.close,
            disabled: tab.forbidClose,
            onClick: function () {
                that.close(tab.id);
            }
        }, {
            label: lang.closeOthers,
            disabled: that.$nav.find('.tab-nav-item:not(.hidden)').length <= 1,
            onClick: function () {
                that.closeOthers(tab.id);
            }
        }, {
            label: lang.closeRight,
            disabled: !$('#tab-nav-item-' + tab.id).next('.tab-nav-item:not(.hidden)').length,
            onClick: function () {
                that.closeRight(tab.id);
            }
        }, '-', {
            label: lang.reopenLast,
            disabled: !that.closedTabs.length,
            onClick: function () {
                that.reopen();
            }
        }];
    };

    Tabs.prototype.adjustNavs = function (immediately) {
        var that = this;
        if (!immediately) {
            if (that.adjustNavsTimer) {
                clearTimeout(that.adjustNavsTimer);
            }
            that.adjustNavsTimer = setTimeout(function() {
                that.adjustNavs(true);
            }, 50);
            return;
        }
        if (that.adjustNavsTimer) {
            that.adjustNavsTimer = null;
        }
        var $nav = that.$nav;
        var $navItems = $nav.find('.tab-nav-item:not(.hidden)');
        var totalWidth = $nav.width();
        var totalCount = $navItems.length;
        var maxWidth = Math.floor(totalWidth/totalCount);
        if(maxWidth < 96) {
            maxWidth = Math.floor((totalWidth-96)/(totalCount-1))
        }
        $nav.toggleClass('tab-nav-condensed', maxWidth <= 50);
        $navItems.css('max-width', maxWidth);
    };

    Tabs.prototype.renderTab = function(tab, beforeTabId) {
        var that = this;
        var $nav = that.$nav;
        var $tabNav = $('#tab-nav-item-' + tab.id);
        if (!$tabNav.length) {
            var $a = $('<a class="tab-nav-link"><i class="icon"></i><span class="title"></span><i class="close tab-nav-close" title="' + that.lang.close + '">&times;</i></a>').attr({
                href: '#tabs-item-' + tab.id,
                'data-id': tab.id
            });
            $tabNav = $('<li class="tab-nav-item" data-id="' + tab.id + '" id="tab-nav-item-' + tab.id + '" />').append($a).appendTo(that.$nav);
            if (beforeTabId) {
                var $before$nav = $('#tab-nav-item-' + beforeTabId);
                if ($before$nav.length) {
                    $tabNav.insertAfter($before$nav);
                }
            }
            that.adjustNavs();
        }
        var $a = $tabNav.find('a').attr('title', tab.desc).toggleClass('not-closable', !!tab.forbidClose);
        $a.find('.icon').attr('class', 'icon ' + (tab.icon || that.options.defaultTabIcon));
        $a.find('.title').text(tab.title || tab.defaultTitle || '');
        return $tabNav;
    };

    Tabs.prototype.getActiveTab = function() {
        var that = this;
        return that.activeTabId ? that.tabs[that.activeTabId] : null;
    };

    Tabs.prototype.getTab = function(tabId) {
        var that = this;
        if (!tabId) {
            return that.getActiveTab();
        }
        if (typeof tabId === 'object') {
            tabId = tabId.id;
        }
        return that.tabs[tabId];
    };

    Tabs.prototype.close = function(tabId, forceClose) {
        var that = this;
        var tab = that.getTab(tabId);
        if (tab && (forceClose || !tab.forbidClose)) {
            $('#tab-nav-item-' + tab.id).remove();
            $('#tab-' + tab.id).remove();
            tab.close();
            delete that.tabs[tab.id];
            that.closedTabs.push(tab);
            that.$.callComEvent(that, 'onClose', tab);

            var lastTab;
            $.each(that.tabs, function (tabId, tab) {
                if (!lastTab || lastTab.openTime < tab.openTime) {
                    lastTab = tab;
                }
            });
            lastTab && that.open(lastTab);
        }
    };

    Tabs.prototype.open = function(tab, forceReload) {
        var that = this;

        if (!(tab instanceof Tab)) {
            tab = Tab.create(tab);
        }

        var $tabNav = that.renderTab(tab);
        that.$nav.find('.tab-nav-item.active').removeClass('active');
        $tabNav.addClass('active');

        var $tabPane = $('#tab-' + tab.id);
        if (!$tabPane.length) {
            $tabPane = $('<div class="tab-pane" id="tab-' + tab.id + '" />').appendTo(that.$tabs);
        }
        that.$tabs.find('.tab-pane.active').removeClass('active');
        $tabPane.addClass('active');

        tab.open();
        that.activeTabId = tab.id;
        that.tabs[tab.id] = tab;

        if (forceReload || !tab.loaded) {
            that.reload(tab);
        }

        that.$.callComEvent(that, 'onOpen', tab);
    };

    Tabs.prototype.showMessage = function (message, type) {
        $.zui.messager.show(message, $.extend({
            placement: 'center'
        }, this.options.messagerOptions, {
            type: type
        }));
    };

    Tabs.prototype.reload = function(tab) {
        var that = this;

        if (typeof tab === 'string') {
            tab = that.getTab(tab);
        } else if (!tab) {
            tab = that.getActiveTab();
        }

        if (!tab) {
            return;
        }

        if (!tab.openTime) {
            return that.open(tab);
        }

        var $tabNav = $('#tab-nav-item-' + tab.id).addClass('loading').removeClass('has-error');
        var $tabPane = $('#tab-' + tab.id).addClass('loading').removeClass('has-error');
        var afterRefresh = function (content, error) {
            if (!tab.openTime) {
                return;
            }
            $tabNav.removeClass('loading');
            $tabPane.removeClass('loading');
            that.$.callComEvent(that, 'onLoad', tab);
            if(typeof content === 'string' || content instanceof $) {
                if (tab.contentConverter) {
                    content = tab.contentConverter(content, tab);
                }
                $tabPane.empty().append(content);
                if (!tab.title) {
                    content = $tabPane.text().replace(/\n/g, '');
                    tab.title = content.length > 10 ? content.substr(0, 10) : content;
                    that.renderTab(tab);
                }
            }
            if (error) {
                $tabNav.addClass('has-error');
                $tabPane.addClass('has-error');
                var showMessage = that.options.showMessage;
                if (showMessage) {
                    if ($.isFunction(showMessage)) {
                        error = showMessage(error);
                    }
                    that.showMessage(error, 'danger');
                }
                if (!content) {
                    $tabPane.html(that.options.errorTemplate.format(error));
                }
            }
            tab.loaded = new Date().getTime();
        };
        if (tab.type === 'ajax') {
            var ajaxOption = {
                type: 'get',
                url: tab.url,
                error: function(jqXHR, textStatus, errorThrown) {
                    afterRefresh(false, that.lang.errorCannotFetchFromRemote.format(tab.url));
                },
                success: function(data) {
                    afterRefresh(data);
                }
            };
            if($.isPlainObject(tab.ajax)) {
                ajaxOption = $.extend(ajaxOption, tab.ajax);
            }
            $.ajax(ajaxOption);
        } else if (tab.type === 'iframe') {
            try {
                var iframeName = 'tab-iframe-' + tab.id;
                var $iframe = $('<iframe id="' + iframeName + '" name="' + iframeName + '" src="' + (tab.url) + '" frameborder="no"  allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"  allowtransparency="true" scrolling="auto" style="width: 100%; height: 100%; left: 0px;"></iframe>');
                $iframe.appendTo($tabPane.empty());
                $('<div class="tab-iframe-cover" />').appendTo($tabPane);
                var frame = document.getElementById(iframeName);
                frame.onload = frame.onreadystatechange = function() {
                    if(this.readyState && this.readyState != 'complete') return;
                    afterRefresh();
                    var contentDocument = frame.contentDocument;
                    if (contentDocument && !tab.title) {
                        tab.title = contentDocument.title;
                        that.renderTab(tab);
                    }
                };
            } catch (e) {
                afterRefresh();
            }
        } else {
            var content = tab.content || tab.custom;
            if (typeof content === 'function') {
                content = content(tab, afterRefresh, that);
                if (content !== true) {
                    afterRefresh(content);
                }
            } else {
                afterRefresh(content);
            }
        }
    };

    Tabs.prototype.closeOthers = function(tabId) {
        var that = this;
        that.$nav.find('.tab-nav-link:not(.hidden)').each(function() {
            var thisTabId = $(this).data('id');
            if (thisTabId !== tabId) {
                that.close(thisTabId);
            }
        });
    };

    Tabs.prototype.closeRight = function(tabId) {
        var $tabNav = $('#tab-nav-item-' + tabId);
        var $rightNav = $tabNav.next('.tab-nav-item:not(.hidden)');
        while ($rightNav.length) {
            this.close($rightNav.data('id'));
            $rightNav = $tabNav.next('.tab-nav-item:not(.hidden)');
        }
    };

    Tabs.prototype.closeAll = function() {
        var that = this;
        that.$nav.find('.tab-nav-link:not(.hidden)').each(function() {
            that.close($(this).data('id'));
        });
    };

    Tabs.prototype.reopen = function() {
        var that = this;
        if(that.closedTabs.length) {
            that.open(that.closedTabs.pop(), true);
        }
    };

    // Extense jquery element
    $.fn.tabs = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Tabs(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    Tabs.NAME = NAME;
    $.fn.tabs.Constructor = Tabs;
}(jQuery));

