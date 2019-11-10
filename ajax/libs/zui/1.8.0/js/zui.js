/*!
 * ZUI: Standard edition - v1.8.0 - 2018-01-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */

/*! Some code copy from Bootstrap v3.0.0 by @fat and @mdo. (Copyright 2013 Twitter, Inc. Licensed under http://www.apache.org/licenses/)*/

/* ========================================================================
 * ZUI: jquery.extensions.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window, undefined) {
    'use strict';

    /* Check jquery */
    if(typeof($) === 'undefined') throw new Error('ZUI requires jQuery');

    // ZUI shared object
    if(!$.zui) $.zui = function(obj) {
        if($.isPlainObject(obj)) {
            $.extend($.zui, obj);
        }
    };

    var MOUSE_BUTTON_CODES = {
        all: -1,
        left: 0,
        middle: 1,
        right: 2
    };

    var lastUuidAmend = 0;
    $.zui({
        uuid: function() {
            return(new Date()).getTime() * 1000 + (lastUuidAmend++) % 1000;
        },

        callEvent: function(func, event, proxy) {
            if($.isFunction(func)) {
                if(proxy !== undefined) {
                    func = $.proxy(func, proxy);
                }
                var result = func(event);
                if(event) event.result = result;
                return !(result !== undefined && (!result));
            }
            return 1;
        },

        clientLang: function() {
            var lang;
            var config = window.config;
            if(typeof(config) != 'undefined' && config.clientLang) {
                lang = config.clientLang;
            }
            if(!lang) {
                var hl = $('html').attr('lang');
                lang = hl ? hl : (navigator.userLanguage || navigator.userLanguage || 'zh_cn');
            }
            return lang.replace('-', '_').toLowerCase();
        },

        strCode: function(str) {
            var code = 0;
            if(str && str.length) {
                for(var i = 0; i < str.length; ++i) {
                    code += i * str.charCodeAt(i);
                }
            }
            return code;
        },

        getMouseButtonCode: function(mouseButton) {
            if(typeof mouseButton !== 'number') {
                mouseButton = MOUSE_BUTTON_CODES[mouseButton];
            }
            if(mouseButton === undefined || mouseButton === null) mouseButton = -1;
            return mouseButton;
        }
    });

    $.fn.callEvent = function(name, event, model) {
        var $this = $(this);
        var dotIndex = name.indexOf('.zui.');
        var shortName = dotIndex < 0 ? name : name.substring(0, dotIndex);
        var e = $.Event(shortName, event);

        if((model === undefined) && dotIndex > 0) {
            model = $this.data(name.substring(dotIndex + 1));
        }

        if(model && model.options) {
            var func = model.options[shortName];
            if($.isFunction(func)) {
                e.result = $.zui.callEvent(func, e, model);
            }
        }
        $this.trigger(e);
        return e;
    };

    $.fn.callComEvent = function(component, eventName, params) {
        if (params !== undefined && !$.isArray(params)) {
            params = [params];
        }
        var $this = this;
        var result = $this.triggerHandler(eventName, params);

        var eventCallback = component.options[eventName];
        if (eventCallback) {
            result = eventCallback.apply(component, params);
        }
        return result;
    };
}(jQuery, window, undefined));


/* ========================================================================
 * ZUI: typography.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    $.fn.fixOlPd = function(pd) {
        pd = pd || 10;
        return this.each(function() {
            var $ol = $(this);
            $ol.css('paddingLeft', Math.ceil(Math.log10($ol.children().length)) * pd + 10);
        });
    };

    $(function() {
        $('.ol-pd-fix,.article ol').fixOlPd();
    });
}(jQuery));


/* ========================================================================
 * Bootstrap: button.js v3.0.3
 * http://getbootstrap.com/javascript/#buttons
 * 
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+ function($) {
    'use strict';

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var Button = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }

    Button.DEFAULTS = {
        loadingText: 'loading...'
    }

    Button.prototype.setState = function(state) {
        var d = 'disabled'
        var $el = this.$element
        var val = $el.is('input') ? 'val' : 'html'
        var data = $el.data()

        state = state + 'Text'

        if(!data.resetText) $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout($.proxy(function() {
            if(state == 'loadingText') {
                this.isLoading = true
                $el.addClass(d).attr(d, d)
            } else if(this.isLoading) {
                this.isLoading = false
                $el.removeClass(d).removeAttr(d)
            }
        }, this), 0)
    }

    Button.prototype.toggle = function() {
        var changed = true
        var $parent = this.$element.closest('[data-toggle="buttons"]')

        if($parent.length) {
            var $input = this.$element.find('input')
            if($input.prop('type') == 'radio') {
                if($input.prop('checked') && this.$element.hasClass('active')) changed = false
                else $parent.find('.active').removeClass('active')
            }
            if(changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
        }

        if(changed) this.$element.toggleClass('active')
    }


    // BUTTON PLUGIN DEFINITION
    // ========================

    var old = $.fn.button

    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('zui.button')
            var options = typeof option == 'object' && option

            if(!data) $this.data('zui.button', (data = new Button(this, options)))

            if(option == 'toggle') data.toggle()
            else if(option) data.setState(option)
        })
    }

    $.fn.button.Constructor = Button


    // BUTTON NO CONFLICT
    // ==================

    $.fn.button.noConflict = function() {
        $.fn.button = old
        return this
    }


    // BUTTON DATA-API
    // ===============

    $(document).on('click.zui.button.data-api', '[data-toggle^=button]', function(e) {
        var $btn = $(e.target)
        if(!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
        $btn.button('toggle')
        e.preventDefault()
    })

}(jQuery);


/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ======================================================================== */


+ function($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var zuiname = 'zui.alert';

    var Alert = function(el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.prototype.close = function(e) {
        var $this = $(this)
        var selector = $this.attr('data-target')

        if(!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if(e) e.preventDefault()

        if(!$parent.length) {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }

        $parent.trigger(e = $.Event('close.' + zuiname))

        if(e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            $parent.trigger('closed.' + zuiname).remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
            .one($.support.transition.end, removeElement)
            .emulateTransitionEnd(150) :
            removeElement()
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    var old = $.fn.alert

    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data(zuiname)

            if(!data) $this.data(zuiname, (data = new Alert(this)))
            if(typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function() {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.' + zuiname + '.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * ZUI: pager.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2017-2018 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var NAME = 'zui.pager'; // model name

    var DEFAULT_PAGER = {
        page: 0,        // current page index
        recTotal: 0,    // records total count
        recPerPage: 10, // records count per page
    };

    var LANG = {
        zh_cn: {
            prev: '上一页',
            next: '下一页',
            first: '第一页',
            last: '最后一页',
            goto: '跳转',
            pageOf: '第 <strong>{page}</strong> 页',
            totalPage: '共 <strong>{totalPage}</strong> 页',
            totalCount: '共 <strong>{recTotal}</strong> 项',
            pageSize: '每页 <strong>{recPerPage}</strong> 项',
            itemsRange: '第 <strong>{start}</strong> ~ <strong>{end}</strong> 项',
            pageOfTotal: '第 <strong>{page}</strong>/<strong>{totalPage}</strong> 页'
        },
        zh_tw: {
            prev: '上一頁',
            next: '下一頁',
            first: '第一頁',
            last: '最後一頁',
            goto: '跳轉',
            pageOf: '第 <strong>{page}</strong> 頁',
            totalPage: '共 <strong>{totalPage}</strong> 頁',
            totalCount: '共 <strong>{recTotal}</strong> 項',
            pageSize: '每頁 <strong>{recPerPage}</strong> 項',
            itemsRange: '第 <strong>{start}</strong> ~ <strong>{end}</strong> 項',
            pageOfTotal: '第 <strong>{page}</strong>/<strong>{totalPage}</strong> 頁'
        },
        en: {
            prev: 'Prev',
            next: 'Next',
            first: 'First',
            last: 'Last',
            goto: 'Goto',
            pageOf: 'Page <strong>{page}</strong>',
            totalPage: '<strong>{totalPage}</strong> pages',
            totalCount: '<strong>{recTotal}</strong> items',
            pageSize: '<strong>{recPerPage}</strong> items per page',
            itemsRange: 'From <strong>{start}</strong> to <strong>{end}</strong>',
            pageOfTotal: 'Page <strong>{page}</strong> of <strong>{totalPage}</strong>'
        }
    };

    // The pager model class
    var Pager = function(element, options) {
        var that = this;
        that.name = NAME;
        that.$ = $(element);

        options = that.options = $.extend({}, Pager.DEFAULTS, this.$.data(), options);

        var lang   = options.lang || 'zh_cn';
        that.lang  = $.isPlainObject(lang) ? ($.extend(true, {}, LANG[lang.lang || $.zui.clientLang()], lang)) : LANG[lang];

        that.state = {};

        that.set(options.page, options.recTotal, options.recPerPage);

        that.$.on('click', '.pager-goto-btn', function() {
            var $goto = $(this).closest('.pager-goto');
            var page = parseInt($goto.find('.pager-goto-input').val());
            if (page !== NaN) {
                that.set(page);
            }
        }).on('click', '.pager-item', function() {
            var page = $(this).data('page');
            if (typeof page === 'number' && page > 0) {
                that.set(page);
            }
        }).on('click', '.pager-size-menu [data-size]', function() {
            var size = $(this).data('size');
            if (typeof size === 'number' && size > 0) {
                that.set(-1, -1, size);
            }
        });
    };

    Pager.prototype.set = function(page, recTotal, recPerPage) {
        var that = this;
        if (typeof page === 'object' && page !== null) {
            recPerPage = page.recPerPage;
            recTotal = page.recTotal;
            page = page.page;
        }
        var state = that.state;
        if (!state) {
            state = $.extend({}, DEFAULT_PAGER);
        }
        var oldState = $.extend({}, state);
        if (typeof recPerPage === 'number' && recPerPage > 0) {
            state.recPerPage = recPerPage;
        }
        if (typeof recTotal === 'number' && recTotal >= 0) {
            state.recTotal = recTotal;
        }
        if (typeof page === 'number' && page >= 0) {
            state.page = page;
        }
        state.totalPage = (state.recTotal && state.recPerPage) ? (Math.ceil(state.recTotal / state.recPerPage)) : 1;
        state.page = Math.max(0, Math.min(state.page, state.totalPage));
        // stateRecCount is items count in current page
        state.pageRecCount = state.recTotal;
        if (state.page && state.recTotal) {
            if (state.page < state.totalPage) {
                state.pageRecCount = state.recPerPage;
            } else if (state.page > 1) {
                state.pageRecCount = state.recTotal - (state.recPerPage * (state.page - 1));
            }
        }
        state.skip  = state.page > 1 ? ((state.page - 1) * state.recPerPage) : 0;
        state.start = state.skip + 1;
        state.end   = state.skip + state.pageRecCount;
        state.prev  = state.page > 1 ? (state.page - 1) : 0;
        state.next  = state.page < state.totalPage ? (state.page + 1) : 0;
        that.state  = state;
        if (oldState.page !== state.page || oldState.recTotal !== state.recTotal || oldState.recPerPage !== state.recPerPage) {
            that.$.callComEvent(that, 'onPageChange', [state, oldState]);
        }
        return that.render();
    };

    Pager.prototype.createLinkItem = function(page, text, asAElement) {
        var that = this;
        if (text === undefined) {
            text = page;
        }
        var $ele = $('<a class="pager-item" data-page="' + page + '"/>').attr('href', page ? that.createLink(page, that.state) : '###').html(text);
        if (!asAElement) {
            $ele = $('<li />').append($ele).toggleClass('active', page === that.state.page).toggleClass('disabled', !page);
        }
        return $ele;
    };

    Pager.prototype.createNavItems = function(maxCount) {
        var that = this;
        var $nav = that.$;
        var pager = that.state;
        var totalPage = pager.totalPage;
        var page = pager.page;
        var appendItem = function(p, to) {
            if(p === false) {
                $nav.append(that.createLinkItem(0, to || '<i class="icon icon-ellipsis-h"></i>'));
                return;
            }
            if(to === undefined) to = p;
            for(var i = p; i <= to; ++i) {
                $nav.append(that.createLinkItem(i));
            }
        };
        if (maxCount === undefined) {
            maxCount = that.options.maxNavCount || 10;
        }
        appendItem(1);
        if(totalPage > 1) {
            if(totalPage <= maxCount) {
                appendItem(2, totalPage);
            }
            else if(page < (maxCount - 2)) {
                appendItem(2, maxCount - 2);
                appendItem(false);
                appendItem(totalPage);
            }
            else if(page > (totalPage - maxCount + 2)) {
                appendItem(false);
                appendItem((totalPage - maxCount + 2), totalPage);
            }
            else {
                appendItem(false);
                appendItem(page - Math.ceil((maxCount-4)/2), page + Math.floor((maxCount-4)/2));
                appendItem(false);
                appendItem(totalPage);
            }
        }
    };

    Pager.prototype.createGoto = function() {
        var that = this;
        var pager = this.state;
        var $goto = $('<div class="input-group pager-goto" style="width: ' + (35 + (pager.page + '').length * 9 + 25 + that.lang.goto.length*12) + 'px"><input value="' + pager.page + '" type="number" min="1" max="' + pager.totalPage + '" placeholder="' + pager.page + '" class="form-control pager-goto-input"><span class="input-group-btn"><button class="btn pager-goto-btn" type="button">' + that.lang.goto + '</button></span></div>');
        return $goto;
    };

    Pager.prototype.createSizeMenu = function() {
        var that = this;
        var pager = this.state;
        var $menu = $('<ul class="dropdown-menu"></ul>');
        var options = that.options.pageSizeOptions;
        if (typeof options === 'string') {
            options = options.split(',');
        }
        for (var i = 0; i < options.length; ++i) {
            var size = options[i];
            if (typeof size === 'string') {
                size = parseInt(size);
            }
            var $li = $('<li><a href="###" data-size="' + size + '">' + size + '</a></li>').toggleClass('active', size === pager.recPerPage);
            $menu.append($li);
        }
        return $('<div class="btn-group pager-size-menu"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' + that.lang.pageSize.format(pager) + ' <span class="caret"></span></button></div>').addClass(that.options.menuDirection).append($menu);
    };

    Pager.prototype.createElement = function(element, $pager, pager) {
        var that = this;
        var createLinkItem= $.proxy(that.createLinkItem, that);
        var lang = that.lang;
        switch (element) {
            case 'prev':
                return createLinkItem(pager.prev, lang.prev);
            case 'prev_icon':
                return createLinkItem(pager.prev, '<i class="icon ' + that.options.prevIcon + '"></i>');
            case 'next':
                return createLinkItem(pager.next, lang.next);
            case 'next_icon':
                return createLinkItem(pager.next, '<i class="icon ' + that.options.nextIcon + '"></i>');
            case 'first':
                return createLinkItem(1, lang.first, true);
            case 'first_icon':
                return createLinkItem(1, '<i class="icon ' + that.options.firstIcon + '"></i>', true);
            case 'last':
                return createLinkItem(pager.totalPage, lang.last, true);
            case 'last_icon':
                return createLinkItem(pager.totalPage, '<i class="icon ' + that.options.lastIcon + '"></i>', true);
            case 'space':
            case '|':
                return $('<li class="space" />');
            case 'nav':
            case 'pages':
                that.createNavItems();
                return;
            case 'total_text':
                return $(('<div class="pager-label">' + lang.totalCount + '</div>').format(pager));
            case 'page_text':
                return $(('<div class="pager-label">' + lang.pageOf + '</div>').format(pager));
            case 'total_page_text':
                return $(('<div class="pager-label">' + lang.totalPage + '</div>').format(pager));
            case 'page_of_total_text':
                return $(('<div class="pager-label">' + lang.pageOfTotal + '</div>').format(pager));
            case 'page_size_text':
                return $(('<div class="pager-label">' + lang.pageSize + '</div>').format(pager));
            case 'items_range_text':
                return $(('<div class="pager-label">' + lang.itemsRange + '</div>').format(pager));
            case 'goto':
                return that.createGoto();
            case 'size_menu':
                return that.createSizeMenu();
            default:
                return $('<li/>').html(element);
        }
    };

    Pager.prototype.createLink = function(page, pager) {
        var linkCreator = this.options.linkCreator;
        if (typeof linkCreator === 'string') {
            return linkCreator.format($.extend({}, pager, {page: page}));
        } else if ($.isFunction(linkCreator)) {
            return linkCreator(page, pager);
        }
        return '#page=' + page;
    };

    Pager.prototype.render = function(elements) {
        var that = this;
        var state = that.state;
        var createElement = that.options.elementCreator || that.createElement;
        var isMapperCreator = $.isPlainObject(createElement);

        elements = elements || that.elements || that.options.elements;
        if (typeof elements == 'string') {
            elements = elements.split(',');
        }
        that.elements = elements;

        that.$.empty();

        for(var i = 0; i < elements.length; ++i) {
            var element  = $.trim(elements[i]);
            var creator = isMapperCreator ? (createElement[element] || createElement) : createElement;
            var $element = creator.call(that, element, that.$, state);
            if ($element === false) {
                $element = that.createElement(element, that.$, state);
            }
            if ($element instanceof $) {
                if ($element[0].tagName !== 'LI') {
                    $element = $('<li/>').append($element);
                }
                that.$.append($element);
            }
        }

        // Fix page item border
        var $lastItem = null;
        that.$.children('li').each(function() {
            var $li = $(this);
            var isItem = !!$li.children('.pager-item').length;
            if ($lastItem) {
                $lastItem.toggleClass('pager-item-right', !isItem);
            } else {
                if (isItem) {
                    $li.addClass('pager-item-left');
                }
            }
            $lastItem = isItem ? $li : null;
        });

        that.$.callComEvent(that, 'onRender', [state]);
        return that;
    };

    // default options
    Pager.DEFAULTS = $.extend({
        elements: ['first_icon', 'prev_icon', 'pages', 'next_icon', 'last_icon', 'page_of_total_text', 'items_range_text', 'total_text'],
        prevIcon: 'icon-double-angle-left',
        nextIcon: 'icon-double-angle-right',
        firstIcon: 'icon-step-backward',
        lastIcon: 'icon-step-forward',
        maxNavCount: 10,
        menuDirection: 'dropdown', // or dropup
        pageSizeOptions: [10, 20, 30, 50, 100],
        // onPageChange: null
    }, DEFAULT_PAGER);

    // Extense jquery element
    $.fn.pager = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Pager(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    Pager.NAME = NAME;

    $.fn.pager.Constructor = Pager;

    // Auto call pager after document load complete
    $(function() {
        $('[data-ride="pager"]').pager();
    });
}(jQuery));


/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 *  
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+ function($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var zuiname = 'zui.tab'
    var Tab = function(element) {
        this.element = $(element)
    }

    Tab.prototype.show = function() {
        var $this = this.element
        var $ul = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.attr('data-target') || $this.attr('data-tab')

        if(!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        if($this.parent('li').hasClass('active')) return

        var previous = $ul.find('.active:last a')[0]
        var e = $.Event('show.' + zuiname, {
            relatedTarget: previous
        })

        $this.trigger(e)

        if(e.isDefaultPrevented()) return

        var $target = $(selector)

        this.activate($this.parent('li'), $ul)
        this.activate($target, $target.parent(), function() {
            $this.trigger({
                type: 'shown.' + zuiname,
                relatedTarget: previous
            })
        })
    }

    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active')
        var transition = callback && $.support.transition && $active.hasClass('fade')

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')

            element.addClass('active')

            if(transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if(element.parent('.dropdown-menu')) {
                element.closest('li.dropdown').addClass('active')
            }

            callback && callback()
        }

        transition ?
            $active
            .one($.support.transition.end, next)
            .emulateTransitionEnd(150) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    var old = $.fn.tab

    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data(zuiname)

            if(!data) $this.data(zuiname, (data = new Tab(this)))
            if(typeof option == 'string') data[option]()
        })
    }

    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function() {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    $(document).on('click.zui.tab.data-api', '[data-toggle="tab"], [data-tab]', function(e) {
        e.preventDefault()
        $(this).tab('show')
    })

}(window.jQuery);


/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 *  
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+ function($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for(var name in transEndEventNames) {
            if(el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                }
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function() {
            called = true
        })
        var callback = function() {
            if(!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function() {
        $.support.transition = transitionEnd()

        if(!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);


/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * 
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+ function($) {
    'use strict';

    var zuiname = 'zui.collapse'

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.transitioning = null

        if(this.options.parent) this.$parent = $(this.options.parent)
        if(this.options.toggle) this.toggle()
    }

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function() {
        if(this.transitioning || this.$element.hasClass('in')) return

        var startEvent = $.Event('show.' + zuiname)
        this.$element.trigger(startEvent)
        if(startEvent.isDefaultPrevented()) return

        var actives = this.$parent && this.$parent.find('.in')

        if(actives && actives.length) {
            var hasData = actives.data(zuiname)
            if(hasData && hasData.transitioning) return
            actives.collapse('hide')
            hasData || actives.data(zuiname, null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)

        this.transitioning = 1

        var complete = function() {
            this.$element
                .removeClass('collapsing')
                .addClass('in')[dimension]('auto')
            this.transitioning = 0
            this.$element.trigger('shown.' + zuiname)
        }

        if(!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one($.support.transition.end, $.proxy(complete, this))
            .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function() {
        if(this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.' + zuiname)
        this.$element.trigger(startEvent)
        if(startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse')
            .removeClass('in')

        this.transitioning = 1

        var complete = function() {
            this.transitioning = 0
            this.$element
                .trigger('hidden.' + zuiname)
                .removeClass('collapsing')
                .addClass('collapse')
        }

        if(!$.support.transition) return complete.call(this)

        this.$element[dimension](0)
            .one($.support.transition.end, $.proxy(complete, this))
            .emulateTransitionEnd(350)
    }

    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    var old = $.fn.collapse

    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data(zuiname)
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if(!data) $this.data(zuiname, (data = new Collapse(this, options)))
            if(typeof option == 'string') data[option]()
        })
    }

    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.' + zuiname + '.data-api', '[data-toggle=collapse]', function(e) {
        var $this = $(this),
            href
        var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        var $target = $(target)
        var data = $target.data(zuiname)
        var option = data ? 'toggle' : $this.data()
        var parent = $this.attr('data-parent')
        var $parent = parent && $(parent)

        if(!data || !data.transitioning) {
            if($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
            $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
        }

        $target.collapse(option)
    })

}(window.jQuery);


/* ========================================================================
 * ZUI: device.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function(window, $) {
    'use strict';
    var desktopLg = 1200,
        desktop = 992,
        tablet = 768;

    var $window = $(window);

    var resetCssClass = function() {
        var width = $window.width();
        $('html').toggleClass('screen-desktop', width >= desktop && width < desktopLg)
            .toggleClass('screen-desktop-wide', width >= desktopLg)
            .toggleClass('screen-tablet', width >= tablet && width < desktop)
            .toggleClass('screen-phone', width < tablet)
            .toggleClass('device-mobile', width < desktop)
            .toggleClass('device-desktop', width >= desktop);
    };

    var classNames = '';
    var userAgent = navigator.userAgent;
    if (userAgent.match(/(iPad|iPhone|iPod)/i)) {
        classNames += ' os-ios';
    } else if (userAgent.match(/android/i)) {
        classNames += ' os-android';
    } else if (userAgent.match(/Win/i)) {
        classNames += ' os-windows';
    } else if (userAgent.match(/Mac/i)) {
        classNames += ' os-mac';
    } else if (userAgent.match(/Linux/i)) {
        classNames += ' os-linux';
    } else if (userAgent.match(/X11/i)) {
        classNames += ' os-unix';
    }
    if ('ontouchstart' in document.documentElement) {
        classNames += ' is-touchable';
    }
    $('html').addClass(classNames);

    $window.resize(resetCssClass);
    resetCssClass();
}(window, jQuery));


/* ========================================================================
 * ZUI: browser.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var browseHappyTip = {
        'zh_cn': '您的浏览器版本过低，无法体验所有功能，建议升级或者更换浏览器。 <a href="http://browsehappy.com/" target="_blank" class="alert-link">了解更多...</a>',
        'zh_tw': '您的瀏覽器版本過低，無法體驗所有功能，建議升級或者更换瀏覽器。<a href="http://browsehappy.com/" target="_blank" class="alert-link">了解更多...</a>',
        'en': 'Your browser is too old, it has been unable to experience the colorful internet. We strongly recommend that you upgrade a better one. <a href="http://browsehappy.com/" target="_blank" class="alert-link">Learn more...</a>'
    };

    // The browser modal class
    var Browser = function() {
        var ie = this.isIE() || this.isIE10() || false;
        if(ie) {
            for(var i = 10; i > 5; i--) {
                if(this.isIE(i)) {
                    ie = i;
                    break;
                }
            }
        }

        this.ie = ie;

        this.cssHelper();
    };

    // Append CSS class to html tag
    Browser.prototype.cssHelper = function() {
        var ie = this.ie,
            $html = $('html');
        $html.toggleClass('ie', ie)
            .removeClass('ie-6 ie-7 ie-8 ie-9 ie-10');
        if(ie) {
            $html.addClass('ie-' + ie)
                .toggleClass('gt-ie-7 gte-ie-8 support-ie', ie >= 8)
                .toggleClass('lte-ie-7 lt-ie-8 outdated-ie', ie < 8)
                .toggleClass('gt-ie-8 gte-ie-9', ie >= 9)
                .toggleClass('lte-ie-8 lt-ie-9', ie < 9)
                .toggleClass('gt-ie-9 gte-ie-10', ie >= 10)
                .toggleClass('lte-ie-9 lt-ie-10', ie < 10);
        }
    };

    // Show browse happy tip
    Browser.prototype.tip = function(showCoontent) {
        var $browseHappy = $('#browseHappyTip');
        if(!$browseHappy.length) {
            $browseHappy = $('<div id="browseHappyTip" class="alert alert-dismissable alert-danger-inverse alert-block" style="position: relative; z-index: 99999"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><div class="container"><div class="content text-center"></div></div></div>');
            $browseHappy.prependTo('body');
        }

        $browseHappy.find('.content').html(showCoontent || this.browseHappyTip || browseHappyTip[$.zui.clientLang() || 'zh_cn']);
    };

    // Detect it is IE, can given a version
    Browser.prototype.isIE = function(version) {
        if(version === 10) return this.isIE10();
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE ' + (version || '') + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    };

    // Detect ie 10 with hack
    Browser.prototype.isIE10 = function() {
        return (/*@cc_on!@*/false);
    };

    $.zui({
        browser: new Browser()
    });

    $(function() {
        if(!$('body').hasClass('disabled-browser-tip')) {
            if($.zui.browser.ie && $.zui.browser.ie < 8) {
                $.zui.browser.tip();
            }
        }
    });
}(jQuery));


/* ========================================================================
 * ZUI: date.js
 * Date polyfills
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function() {
    'use strict';

    /**
     * Ticks of a whole day
     * @type {number}
     */
    Date.ONEDAY_TICKS = 24 * 3600 * 1000;

    /**
     * Format date to a string
     *
     * @param  string   format
     * @return string
     */
    if(!Date.prototype.format) {
        Date.prototype.format = function(format) {
            var date = {
                'M+': this.getMonth() + 1,
                'd+': this.getDate(),
                'h+': this.getHours(),
                'm+': this.getMinutes(),
                's+': this.getSeconds(),
                'q+': Math.floor((this.getMonth() + 3) / 3),
                'S+': this.getMilliseconds()
            };
            if(/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for(var k in date) {
                if(new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
                }
            }
            return format;
        };
    }

    /**
     * Add milliseconds to the date
     * @param {number} value
     */
    if(!Date.prototype.addMilliseconds) {
        Date.prototype.addMilliseconds = function(value) {
            this.setTime(this.getTime() + value);
            return this;
        };
    }


    /**
     * Add days to the date
     * @param {number} days
     */
    if(!Date.prototype.addDays) {
        Date.prototype.addDays = function(days) {
            this.addMilliseconds(days * Date.ONEDAY_TICKS);
            return this;
        };
    }


    /**
     * Clone a new date instane from the date
     * @return {Date}
     */
    if(!Date.prototype.clone) {
        Date.prototype.clone = function() {
            var date = new Date();
            date.setTime(this.getTime());
            return date;
        };
    }


    /**
     * Judge the year is in a leap year
     * @param  {integer}  year
     * @return {Boolean}
     */
    if(!Date.isLeapYear) {
        Date.isLeapYear = function(year) {
            return(((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        };
    }

    if(!Date.getDaysInMonth) {
        /**
         * Get days number of the date
         * @param  {integer} year
         * @param  {integer} month
         * @return {integer}
         */
        Date.getDaysInMonth = function(year, month) {
            return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        };
    }


    /**
     * Judge the date is in a leap year
     * @return {Boolean}
     */
    if(!Date.prototype.isLeapYear) {
        Date.prototype.isLeapYear = function() {
            return Date.isLeapYear(this.getFullYear());
        };
    }


    /**
     * Clear time part of the date
     * @return {date}
     */
    if(!Date.prototype.clearTime) {
        Date.prototype.clearTime = function() {
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            this.setMilliseconds(0);
            return this;
        };
    }


    /**
     * Get days of this month of the date
     * @return {integer}
     */
    if(!Date.prototype.getDaysInMonth) {
        Date.prototype.getDaysInMonth = function() {
            return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
        };
    }


    /**
     * Add months to the date
     * @param {date} value
     */
    if(!Date.prototype.addMonths) {
        Date.prototype.addMonths = function(value) {
            var n = this.getDate();
            this.setDate(1);
            this.setMonth(this.getMonth() + value);
            this.setDate(Math.min(n, this.getDaysInMonth()));
            return this;
        };
    }


    /**
     * Get last week day of the date
     * @param  {integer} day
     * @return {date}
     */
    if(!Date.prototype.getLastWeekday) {
        Date.prototype.getLastWeekday = function(day) {
            day = day || 1;

            var d = this.clone();
            while(d.getDay() != day) {
                d.addDays(-1);
            }
            d.clearTime();
            return d;
        };
    }


    /**
     * Judge the date is same day as another date
     * @param  {date}  date
     * @return {Boolean}
     */
    if(!Date.prototype.isSameDay) {
        Date.prototype.isSameDay = function(date) {
            return date.toDateString() === this.toDateString();
        };
    }


    /**
     * Judge the date is in same week as another date
     * @param  {date}  date
     * @return {Boolean}
     */
    if(!Date.prototype.isSameWeek) {
        Date.prototype.isSameWeek = function(date) {
            var weekStart = this.getLastWeekday();
            var weekEnd = weekStart.clone().addDays(7);
            return date >= weekStart && date < weekEnd;
        };
    }


    /**
     * Judge the date is in same year as another date
     * @param  {date}  date
     * @return {Boolean}
     */
    if(!Date.prototype.isSameYear) {
        Date.prototype.isSameYear = function(date) {
            return this.getFullYear() === date.getFullYear();
        };
    }

    /**
     * Create an date instance with string, timestamp or date instance
     * @param  {Date|String|Number}  date
     * @return {Date}
     */
    if (!Date.create) {
        Date.create = function(date) {
            if (!(date instanceof Date)) {
                if (typeof date === 'number' && date < 10000000000) {
                    date *= 1000;
                }
                date = new Date(date);
            }
            return date;
        };
    }

    if (!Date.timestamp) {
        Date.timestamp = function(date) {
            if (typeof date === 'number') {
                if (date < 10000000000) {
                    date *= 1000;
                }
            } else {
                date = Date.create(date).getTime();
            }
            return date;
        };
    }
}());


/* ========================================================================
 * ZUI: string.js
 * String Polyfill.
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function() {
    'use strict';

    /**
     * Format string with argument list or object
     * @param  {object | arguments} args
     * @return {String}
     */
    if(!String.prototype.format) {
        String.prototype.format = function(args) {
            var result = this;
            if(arguments.length > 0) {
                var reg;
                if(arguments.length <= 2 && typeof(args) == 'object') {
                    for(var key in args) {
                        if(args[key] !== undefined) {
                            reg = new RegExp('(' + (arguments[1] ? arguments[1].replace('0', key) : '{' + key + '}') + ')', 'g');
                            result = result.replace(reg, args[key]);
                        }
                    }
                } else {
                    for(var i = 0; i < arguments.length; i++) {
                        if(arguments[i] !== undefined) {
                            reg = new RegExp('({[' + i + ']})', 'g');
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        };
    }

    /**
     * Judge the string is a integer number
     *
     * @access public
     * @return bool
     */
    if(!String.prototype.isNum) {
        String.prototype.isNum = function(s) {
            if(s !== null) {
                var r, re;
                re = /\d*/i;
                r = s.match(re);
                return(r == s) ? true : false;
            }
            return false;
        };
    }

    if(!String.prototype.endsWith) {
        String.prototype.endsWith = function(searchString, position) {
            var subjectString = this.toString();
            if(position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }

    if(!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.lastIndexOf(searchString, position) === position;
        };
    }

    if(!String.prototype.includes) {
        String.prototype.includes = function() {
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        };
    }

})();


/* ========================================================================
 * Resize: resize.js [Version: 1.1]
 * http://benalman.com/projects/jquery-resize-plugin/
 *  
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * official version in the future.
 * http://zui.sexy
 * ========================================================================
 * opyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * ======================================================================== */


/*!
 * jQuery resize event - v1.1
 * http://benalman.com/projects/jquery-resize-plugin/
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * MIT & GPL http://benalman.com/about/license/
 */

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
//
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
//
// About: Release History
//
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function($, window, undefined) {
    '$:nomunge'; // Used by YUI compressor.

    // A jQuery object containing all non-window elements to which the resize
    // event is bound.
    var elems = $([]),

        // Extend $.resize if it already exists, otherwise create it.
        jq_resize = $.resize = $.extend($.resize, {}),

        timeout_id,

        // Reused strings.
        str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

    // Property: jQuery.resize.delay
    //
    // The numeric interval (in milliseconds) at which the resize event polling
    // loop executes. Defaults to 250.

    jq_resize[str_delay] = 250;

    // Property: jQuery.resize.throttleWindow
    //
    // Throttle the native window object resize event to fire no more than once
    // every <jQuery.resize.delay> milliseconds. Defaults to true.
    //
    // Because the window object has its own resize event, it doesn't need to be
    // provided by this plugin, and its execution can be left entirely up to the
    // browser. However, since certain browsers fire the resize event continuously
    // while others do not, enabling this will throttle the window resize event,
    // making event behavior consistent across all elements in all browsers.
    //
    // While setting this property to false will disable window object resize
    // event throttling, please note that this property must be changed before any
    // window object resize event callbacks are bound.

    jq_resize[str_throttle] = true;

    // Event: resize event
    //
    // Fired when an element's width or height changes. Because browsers only
    // provide this event for the window element, for other elements a polling
    // loop is initialized, running every <jQuery.resize.delay> milliseconds
    // to see if elements' dimensions have changed. You may bind with either
    // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
    //
    // Usage:
    //
    // > jQuery('selector').bind( 'resize', function(e) {
    // >   // element's width or height has changed!
    // >   ...
    // > });
    //
    // Additional Notes:
    //
    // * The polling loop is not created until at least one callback is actually
    //   bound to the 'resize' event, and this single polling loop is shared
    //   across all elements.
    //
    // Double firing issue in jQuery 1.3.2:
    //
    // While this plugin works in jQuery 1.3.2, if an element's event callbacks
    // are manually triggered via .trigger( 'resize' ) or .resize() those
    // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
    // events system. This is not an issue when using jQuery 1.4+.
    //
    // > // While this works in jQuery 1.4+
    // > $(elem).css({ width: new_w, height: new_h }).resize();
    // >
    // > // In jQuery 1.3.2, you need to do this:
    // > var elem = $(elem);
    // > elem.css({ width: new_w, height: new_h });
    // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
    // > elem.resize();

    $.event.special[str_resize] = {

        // Called only when the first 'resize' event callback is bound per element.
        setup: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will bind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if(!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);

            // Add this element to the list of internal elements to monitor.
            elems = elems.add(elem);

            // Initialize data store on the element.
            $.data(this, str_data, {
                w: elem.width(),
                h: elem.height()
            });

            // If this is the first element added, start the polling loop.
            if(elems.length === 1) {
                loopy();
            }
        },

        // Called only when the last 'resize' event callback is unbound per element.
        teardown: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will unbind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if(!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);

            // Remove this element from the list of internal elements to monitor.
            elems = elems.not(elem);

            // Remove any data stored on the element.
            elem.removeData(str_data);

            // If this is the last element removed, stop the polling loop.
            if(!elems.length) {
                clearTimeout(timeout_id);
            }
        },

        // Called every time a 'resize' event callback is bound per element (new in
        // jQuery 1.4).
        add: function(handleObj) {
            // Since window has its own native 'resize' event, return false so that
            // jQuery doesn't modify the event object. Unless, of course, we're
            // throttling the 'resize' event for window.
            if(!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var old_handler;

            // The new_handler function is executed every time the event is triggered.
            // This is used to update the internal element data store with the width
            // and height when the event is triggered manually, to avoid double-firing
            // of the event callback. See the "Double firing issue in jQuery 1.3.2"
            // comments above for more information.

            function new_handler(e, w, h) {
                var elem = $(this),
                    data = $.data(this, str_data) || {};

                // If called from the polling loop, w and h will be passed in as
                // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
                // those values will need to be computed.
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply(this, arguments);
            };

            // This may seem a little complicated, but it normalizes the special event
            // .add method between jQuery 1.4/1.4.1 and 1.4.2+
            if($.isFunction(handleObj)) {
                // 1.4, 1.4.1
                old_handler = handleObj;
                return new_handler;
            } else {
                // 1.4.2+
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }

    };

    function loopy() {

        // Start the polling loop, asynchronously.
        timeout_id = window[str_setTimeout](function() {

            // Iterate over all elements to which the 'resize' event is bound.
            elems.each(function() {
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data(this, str_data);

                // If element size has changed since the last time, update the element
                // data store and trigger the 'resize' event.
                if(width !== data.w || height !== data.h) {
                    elem.trigger(str_resize, [data.w = width, data.h = height]);
                }

            });

            // Loop.
            loopy();

        }, jq_resize[str_delay]);

    };

})(jQuery, this);


/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.3
 * http://getbootstrap.com/javascript/#scrollspy
 *  
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+ function($) {
    'use strict';

    // SCROLLSPY CLASS DEFINITION
    // ==========================

    var zuiname = 'zui.scrollspy'

    function ScrollSpy(element, options) {
        var href
        var process = $.proxy(this.process, this)

        this.$element = $(element).is('body') ? $(window) : $(element)
        this.$body = $('body')
        this.$scrollElement = this.$element.on('scroll.' + zuiname + '.data-api', process)
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options)
        if(!this.selector) this.selector = (this.options.target || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
            || '') + ' .nav li > a'
        this.offsets = $([])
        this.targets = $([])
        this.activeTarget = null

        this.refresh()
        this.process()
    }

    ScrollSpy.DEFAULTS = {
        offset: 10
    }

    ScrollSpy.prototype.refresh = function() {
        var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

        this.offsets = $([])
        this.targets = $([])

        var self = this
        var $targets = this.$body
            .find(this.selector)
            .map(function() {
                var $el = $(this)
                var href = $el.data('target') || $el.attr('href')
                var $href = /^#./.test(href) && $(href)

                return($href && $href.length && $href.is(':visible') && [
                    [$href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
                ]) || null
            })
            .sort(function(a, b) {
                return a[0] - b[0]
            })
            .each(function() {
                self.offsets.push(this[0])
                self.targets.push(this[1])
            })
    }

    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
        var maxScroll = scrollHeight - this.$scrollElement.height()
        var offsets = this.offsets
        var targets = this.targets
        var activeTarget = this.activeTarget
        var i

        if(scrollTop >= maxScroll) {
            return activeTarget != (i = targets.last()[0]) && this.activate(i)
        }

        if(activeTarget && scrollTop <= offsets[0]) {
            return activeTarget != (i = targets[0]) && this.activate(i)
        }

        for(i = offsets.length; i--;) {
            activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
        }
    }

    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target

        $(this.selector)
            .parentsUntil(this.options.target, '.active')
            .removeClass('active')

        var selector = this.selector +
            '[data-target="' + target + '"],' +
            this.selector + '[href="' + target + '"]'

        var active = $(selector)
            .parents('li')
            .addClass('active')

        if(active.parent('.dropdown-menu').length) {
            active = active
                .closest('li.dropdown')
                .addClass('active')
        }

        active.trigger('activate.' + zuiname)
    }


    // SCROLLSPY PLUGIN DEFINITION
    // ===========================

    var old = $.fn.scrollspy

    $.fn.scrollspy = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data(zuiname)
            var options = typeof option == 'object' && option

            if(!data) $this.data(zuiname, (data = new ScrollSpy(this, options)))
            if(typeof option == 'string') data[option]()
        })
    }

    $.fn.scrollspy.Constructor = ScrollSpy


    // SCROLLSPY NO CONFLICT
    // =====================

    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old
        return this
    }


    // SCROLLSPY DATA-API
    // ==================

    $(window).on('load', function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this)
            $spy.scrollspy($spy.data())
        })
    })

}(jQuery);


/* ========================================================================
 * ZUI: storeb.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function(window, $) {
    'use strict';

    var lsName = 'localStorage';
    var storage,
        dataset,
        pageName = 'page_' + window.location.pathname + window.location.search;

    /* The Store object */
    var Store = function() {
        this.slience = true;
        try {
            if((lsName in window) && window[lsName] && window[lsName].setItem) {
                this.enable = true;
                storage = window[lsName];
            }
        } catch(e){}
        if(!this.enable) {
            dataset = {};
            storage = {
                getLength: function() {
                    var length = 0;
                    $.each(dataset, function() {
                        length++;
                    });
                    return length;
                },
                key: function(index) {
                    var key, i = 0;
                    $.each(dataset, function(k) {
                        if(i === index) {
                            key = k;
                            return false;
                        }
                        i++;
                    });
                    return key;
                },
                removeItem: function(key) {
                    delete dataset[key];
                },
                getItem: function(key) {
                    return dataset[key];
                },
                setItem: function(key, val) {
                    dataset[key] = val;
                },
                clear: function() {
                    dataset = {};
                }
            };
        }
        this.storage = storage;
        this.page = this.get(pageName, {});
    };

    /* Save page data */
    Store.prototype.pageSave = function() {
        if($.isEmptyObject(this.page)) {
            this.remove(pageName);
        } else {
            var forDeletes = [],
                i;
            for(i in this.page) {
                var val = this.page[i];
                if(val === null)
                    forDeletes.push(i);
            }
            for(i = forDeletes.length - 1; i >= 0; i--) {
                delete this.page[forDeletes[i]];
            }
            this.set(pageName, this.page);
        }
    };

    /* Remove page data item */
    Store.prototype.pageRemove = function(key) {
        if(typeof this.page[key] != 'undefined') {
            this.page[key] = null;
            this.pageSave();
        }
    };

    /* Clear page data */
    Store.prototype.pageClear = function() {
        this.page = {};
        this.pageSave();
    };

    /* Get page data */
    Store.prototype.pageGet = function(key, defaultValue) {
        var val = this.page[key];
        return(defaultValue !== undefined && (val === null || val === undefined)) ? defaultValue : val;
    };

    /* Set page data */
    Store.prototype.pageSet = function(objOrKey, val) {
        if($.isPlainObject(objOrKey)) {
            $.extend(true, this.page, objOrKey);
        } else {
            this.page[this.serialize(objOrKey)] = val;
        }
        this.pageSave();
    };

    /* Check enable status */
    Store.prototype.check = function() {
        if(!this.enable) {
            if(!this.slience) throw new Error('Browser not support localStorage or enable status been set true.');
        }
        return this.enable;
    };

    /* Get length */
    Store.prototype.length = function() {
        if(this.check()) {
            return storage.getLength ? storage.getLength() : storage.length;
        }
        return 0;
    };

    /* Remove item with browser localstorage native method */
    Store.prototype.removeItem = function(key) {
        storage.removeItem(key);
        return this;
    };

    /* Remove item with browser localstorage native method, same as removeItem */
    Store.prototype.remove = function(key) {
        return this.removeItem(key);
    };

    /* Get item value with browser localstorage native method, and without deserialize */
    Store.prototype.getItem = function(key) {
        return storage.getItem(key);
    };

    /* Get item value and deserialize it, if value is null and defaultValue been given then return defaultValue */
    Store.prototype.get = function(key, defaultValue) {
        var val = this.deserialize(this.getItem(key));
        if(typeof val === 'undefined' || val === null) {
            if(typeof defaultValue !== 'undefined') {
                return defaultValue;
            }
        }
        return val;
    };

    /* Get item key by index and deserialize it */
    Store.prototype.key = function(index) {
        return storage.key(index);
    };

    /* Set item value with browser localstorage native method, and without serialize filter */
    Store.prototype.setItem = function(key, val) {
        storage.setItem(key, val);
        return this;
    };

    /* Set item value, serialize it if the given value is not an string */
    Store.prototype.set = function(key, val) {
        if(val === undefined) return this.remove(key);
        this.setItem(key, this.serialize(val));
        return this;
    };

    /* Clear all items with browser localstorage native method */
    Store.prototype.clear = function() {
        storage.clear();
        return this;
    };

    /* Iterate all items with callback */
    Store.prototype.forEach = function(callback) {
        var length = this.length();
        for(var i = length - 1; i >= 0; i--) {
            var key = storage.key(i);
            callback(key, this.get(key));
        }
        return this;
    };

    /* Get all items and set value in an object. */
    Store.prototype.getAll = function() {
        var all = {};
        this.forEach(function(key, val) {
            all[key] = val;
        });

        return all;
    };

    /* Serialize value with JSON.stringify */
    Store.prototype.serialize = function(value) {
        if(typeof value === 'string') return value;
        return JSON.stringify(value);
    };

    /* Deserialize value, with JSON.parse if the given value is not a string */
    Store.prototype.deserialize = function(value) {
        if(typeof value !== 'string') return undefined;
        try {
            return JSON.parse(value);
        } catch(e) {
            return value || undefined;
        }
    };

    $.zui({
        store: new Store()
    });
}(window, jQuery));


/* ========================================================================
 * ZUI: searchbox.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var NAME = 'zui.searchBox'; // modal name

    // The searchbox modal class
    var SearchBox = function(element, options) {
        var that = this;
        that.name = name;
        that.$ = $(element);

        that.options = options = $.extend({}, SearchBox.DEFAULTS, that.$.data(), options);

        // Initialize here
        var $input = that.$.is(options.inputSelector) ? that.$ : that.$.find(options.inputSelector);
        if ($input.length) {
            var clearChangeTimer = function() {
                if (that.changeTimer) {
                    clearTimeout(that.changeTimer);
                    that.changeTimer = null;
                }
            };

            var handleChange = function() {
                clearChangeTimer();
                var value = that.getSearch();
                if (value !== that.lastValue) {
                    var isEmpty = value === '';
                    $input.toggleClass('empty', isEmpty);
                    that.$.callComEvent(that, 'onSearchChange', [value, isEmpty]);
                    that.lastValue = value;
                }
            };

            that.$input = $input = $input.first();
            that.lastValue = that.getSearch();

            $input.on(options.listenEvent, function(params) {
                that.changeTimer = setTimeout(function() {
                    handleChange();
                }, options.changeDelay);
            }).on('focus', function(e) {
                $input.addClass('focus');
                that.$.callComEvent(that, 'onFocus', [e]);
            }).on('blur', function(e) {
                $input.removeClass('focus');
                that.$.callComEvent(that, 'onBlur', [e]);
            }).on('keydown', function(e) {
                var handled = 0;
                var keyCode = e.witch;
                if (keyCode === 27 && options.escToClear) { // esc
                    this.setSearch('', true);
                    handleChange();
                    handled = 1;
                } else if (keyCode === 13 && options.onPressEnter) {
                    handleChange();
                    that.$.callComEvent(that, 'onPressEnter', [e]);
                }
                var onKeyDownResult = that.$.callComEvent(that, 'onKeyDown', [e]);
                if (onKeyDownResult === false) {
                    handled = 1;
                }
                if (handled) {
                    e.preventDefault();
                }
            });

            that.$.on('click', '.search-clear-btn', function(e) {
                that.setSearch('', true);
                handleChange();
                e.preventDefault();
            });

            handleChange();
        } else {
            console.error('ZUI: search box init error, cannot find search box input element.');
        }
    };

    // default options
    SearchBox.DEFAULTS = {
        inputSelector: 'input[type="search"],input[type="text"]',
        listenEvent: 'change input paste',
        changeDelay: 500,

        // onKeyDown: null,
        // onFocus: null,
        // onBlur: null,
        // onSearchChange: null,
        // onPressEnter: null,
        // escToClear: true
    };

    // Get current search string
    SearchBox.prototype.getSearch = function() {
        return this.$input && $.trim(this.$input.val());
    };

    // Set current search string
    SearchBox.prototype.setSearch = function(value, notTriggerChange) {
        var $input = this.$input;
        if ($input) {
            $input.val(value);
            if (!notTriggerChange) {
                $input.trigger('change');
            }
        }
    };

    // Focus input element
    SearchBox.prototype.focus = function() {
        this.$input && this.$input.focus();
    };

    // Extense jquery element
    $.fn.searchBox = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new SearchBox(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    SearchBox.NAME = NAME;

    $.fn.searchBox.Constructor = SearchBox;
}(jQuery));


/* ========================================================================
 * ZUI: draggable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, document) {
    'use strict';

    var NAME     = 'zui.draggable',
        DEFAULTS = {
        // selector: '',
        container: 'body',
        move: true
        // mouseButton: -1 // 0, 1, 2, -1, all, left,  right, middle
    };
    var idIncrementer = 0;

    var Draggable = function(element, options) {
        var that     = this;
        that.$       = $(element);
        that.id      = idIncrementer++;
        that.options = $.extend({}, DEFAULTS, that.$.data(), options);
        that.init();
    };

    Draggable.DEFAULTS = DEFAULTS;
    Draggable.NAME     = NAME;

    Draggable.prototype.init = function() {
        var that           = this,
            $root          = that.$,
            BEFORE         = 'before',
            DRAG           = 'drag',
            FINISH         = 'finish',
            eventSuffix    = '.' + NAME + '.' + that.id,
            mouseDownEvent = 'mousedown' + eventSuffix,
            mouseUpEvent   = 'mouseup' + eventSuffix,
            mouseMoveEvent = 'mousemove' + eventSuffix,
            setting        = that.options,
            selector       = setting.selector,
            handle         = setting.handle,
            $ele           = $root,
            isMoveFunc     = $.isFunction(setting.move),
            startPos,
            cPos,
            startOffset,
            mousePos,
            moved;

        var mouseMove = function(event) {
            var mX      = event.pageX,
                mY      = event.pageY;
                moved   = true;
            var dragPos = {
                left: mX - startOffset.x,
                top: mY - startOffset.y
            };

            $ele.removeClass('drag-ready').addClass('dragging');
            if(setting.move) {
                if (isMoveFunc) {
                    setting.move(dragPos, $ele);
                } else {
                    $ele.css(dragPos);
                }
            }

            setting[DRAG] && setting[DRAG]({
                event: event,
                element: $ele,
                startOffset: startOffset,
                pos: dragPos,
                offset: {
                    x: mX - startPos.x,
                    y: mY - startPos.y
                },
                smallOffset: {
                    x: mX - mousePos.x,
                    y: mY - mousePos.y
                }
            });
            mousePos.x = mX;
            mousePos.y = mY;

            if(setting.stopPropagation) {
                event.stopPropagation();
            }
        };

        var mouseUp = function(event) {
            $(document).off(eventSuffix);
            if(!moved) {
                $ele.removeClass('drag-ready');
                return;
            }
            var endPos = {
                left: event.pageX - startOffset.x,
                top: event.pageY - startOffset.y
            };
            $ele.removeClass('drag-ready dragging');
            if(setting.move) {
                if (isMoveFunc) {
                    setting.move(endPos, $ele);
                } else {
                    $ele.css(endPos);
                }
            }

            setting[FINISH] && setting[FINISH]({
                event: event,
                element: $ele,
                startOffset: startOffset,
                pos: endPos,
                offset: {
                    x: event.pageX - startPos.x,
                    y: event.pageY - startPos.y
                },
                smallOffset: {
                    x: event.pageX - mousePos.x,
                    y: event.pageY - mousePos.y
                }
            });
            event.preventDefault();
            if(setting.stopPropagation) {
                event.stopPropagation();
            }
        };

        var mouseDown = function(event) {
            var mouseButton = $.zui.getMouseButtonCode(setting.mouseButton);
            if(mouseButton > -1 && event.button !== mouseButton) {
                return;
            }

            var $mouseDownEle = $(this);
            if(selector) {
                $ele = handle ? $mouseDownEle.closest(selector) : $mouseDownEle;
            }

            if(setting[BEFORE]) {
                var isSure = setting[BEFORE]({
                    event: event,
                    element: $ele
                });
                if(isSure === false) return;
            }

            var $container = $(setting.container),
                pos        = $ele.offset();
                cPos       = $container.offset();
                startPos   = {
                    x: event.pageX,
                    y: event.pageY
                };
                startOffset = {
                    x: event.pageX - pos.left + cPos.left,
                    y: event.pageY - pos.top + cPos.top
                };
                mousePos    = $.extend({}, startPos);
                moved       = false;

            $ele.addClass('drag-ready');
            event.preventDefault();

            if(setting.stopPropagation) {
                event.stopPropagation();
            }

            $(document).on(mouseMoveEvent, mouseMove).on(mouseUpEvent, mouseUp);
        };

        if(handle) {
            $root.on(mouseDownEvent, handle, mouseDown);
        } else if(selector) {
            $root.on(mouseDownEvent, selector, mouseDown);
        } else {
            $root.on(mouseDownEvent, mouseDown);
        }
    };

    Draggable.prototype.destroy = function() {
        var eventSuffix = '.' + NAME + '.' + this.id;
        this.$.off(eventSuffix);
        $(document).off(eventSuffix);
        this.$.data(NAME, null);
    };

    $.fn.draggable = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Draggable(this, options)));
            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.draggable.Constructor = Draggable;
}(jQuery, document));


/* ========================================================================
 * ZUI: droppable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, document, Math) {
    'use strict';

    var NAME     = 'zui.droppable',
        DEFAULTS = {
        // container: '',
        // selector: '',
        // handle: '',
        // flex: false,
        // nested: false,
        target: '.droppable-target',
        deviation: 5,
        sensorOffsetX: 0,
        sensorOffsetY: 0,
         // mouseButton: -1 // 0, 1, 2, -1, all, left,  right, middle
    };
    var idIncrementer = 0;

    var Droppable = function(element, options) {
        var that     = this;
        that.id      = idIncrementer++;
        that.$       = $(element);
        that.options = $.extend({}, DEFAULTS, that.$.data(), options);
        that.init();
    };

    Droppable.DEFAULTS = DEFAULTS;
    Droppable.NAME     = NAME;

    Droppable.prototype.trigger = function(name, params) {
        return $.zui.callEvent(this.options[name], params, this);
    };

    Droppable.prototype.init = function() {
        var that           = this,
            $root          = that.$,
            setting        = that.options,
            deviation      = setting.deviation,
            eventSuffix    = '.' + NAME + '.' + that.id,
            mouseDownEvent = 'mousedown' + eventSuffix,
            mouseUpEvent   = 'mouseup' + eventSuffix,
            mouseMoveEvent = 'mousemove' + eventSuffix,
            selector       = setting.selector,
            handle         = setting.handle,
            flex           = setting.flex,
            container      = setting.container,
            canMoveHere    = setting.canMoveHere,
            $ele           = $root,
            isMouseDown    = false,
            $container     = container ? $(setting.container).first() : (selector ? $root : $('body')),
            $targets,
            $target,
            $shadow,
            isIn,
            isSelf,
            oldCssPosition,
            startOffset,
            startMouseOffset,
            containerOffset,
            clickOffset,
            mouseOffset,
            lastMouseOffset,
            mouseDownBackEventCall;

        var mouseMove = function(event) {
            if(!isMouseDown) return;

            mouseOffset = {left: event.pageX, top: event.pageY};

            // ignore small move
            if(Math.abs(mouseOffset.left - startMouseOffset.left) < deviation && Math.abs(mouseOffset.top - startMouseOffset.top) < deviation) return;

            if($shadow === null) // create shadow
            {
                var cssPosition = $container.css('position');
                if(cssPosition != 'absolute' && cssPosition != 'relative' && cssPosition != 'fixed') {
                    oldCssPosition = cssPosition;
                    $container.css('position', 'relative');
                }

                $shadow = $ele.clone().removeClass('drag-from').addClass('drag-shadow').css({
                    position:   'absolute',
                    width:      $ele.outerWidth(),
                    transition: 'none'
                }).appendTo($container);
                $ele.addClass('dragging');

                that.trigger('start', {
                    event:   event,
                    element: $ele
                });
            }

            var offset = {
                left: mouseOffset.left - clickOffset.left,
                top:  mouseOffset.top - clickOffset.top
            };
            var position = {
                left: offset.left - containerOffset.left,
                top:  offset.top - containerOffset.top
            };
            $shadow.css(position);
            $.extend(lastMouseOffset, mouseOffset);

            var isNew = false;
                isIn = false;

            if(!flex) {
                $targets.removeClass('drop-to');
            }

            var $newTarget = null;
            $targets.each(function() {
                var t    = $(this),
                    tPos = t.offset(),
                    tW   = t.outerWidth(),
                    tH   = t.outerHeight(),
                    tX   = tPos.left + setting.sensorOffsetX,
                    tY   = tPos.top + setting.sensorOffsetY;

                if(mouseOffset.left > tX && mouseOffset.top > tY && mouseOffset.left < (tX + tW) && mouseOffset.top < (tY + tH)) {
                    if($newTarget) $newTarget.removeClass('drop-to');
                    $newTarget = t;
                    if(!setting.nested) return false;
                }
            });

            if($newTarget) {
                isIn = true;
                var id = $newTarget.data('id');
                if($ele.data('id') != id) isSelf = false;
                if($target === null || ($target.data('id') !== id && (!isSelf))) isNew = true;
                $target = $newTarget;
                if(flex) {
                    $targets.removeClass('drop-to');
                }
                $target.addClass('drop-to');
            }


            if(!flex) {
                $ele.toggleClass('drop-in', isIn);
                $shadow.toggleClass('drop-in', isIn);
            } else if($target !== null && $target.length) {
                isIn = true;
            }

            if(!canMoveHere || canMoveHere($ele, $target) !== false) {
                that.trigger('drag', {
                    event: event,
                    isIn: isIn,
                    target: $target,
                    element: $ele,
                    isNew: isNew,
                    selfTarget: isSelf,
                    clickOffset: clickOffset,
                    offset: offset,
                    position: {
                        left: offset.left - containerOffset.left,
                        top: offset.top - containerOffset.top
                    },
                    mouseOffset: mouseOffset
                });
            }

            event.preventDefault();
        };

        var mouseUp = function(event) {
            $(document).off(eventSuffix);
            clearTimeout(mouseDownBackEventCall);
            if(!isMouseDown) return;

            isMouseDown = false;

            if(oldCssPosition) {
                $container.css('position', oldCssPosition);
            }

            if($shadow === null) {
                $ele.removeClass('drag-from');
                that.trigger('always', {
                    event: event,
                    cancel: true
                });
                return;
            }

            if(!isIn) $target = null;
            var isSure = true;
            mouseOffset = event ? {
                left: event.pageX,
                top: event.pageY
            } : lastMouseOffset;
            var offset = {
                left: mouseOffset.left - clickOffset.left,
                top: mouseOffset.top - clickOffset.top
            };
            var moveOffset = {
                left: mouseOffset.left - lastMouseOffset.left,
                top: mouseOffset.top - lastMouseOffset.top
            };
            lastMouseOffset.left = mouseOffset.left;
            lastMouseOffset.top = mouseOffset.top;
            var eventOptions = {
                event: event,
                isIn: isIn,
                target: $target,
                element: $ele,
                isNew: (!isSelf) && $target !== null,
                selfTarget: isSelf,
                offset: offset,
                mouseOffset: mouseOffset,
                position: {
                    left: offset.left - containerOffset.left,
                    top: offset.top - containerOffset.top
                },
                lastMouseOffset: lastMouseOffset,
                moveOffset: moveOffset
            };

            isSure = that.trigger('beforeDrop', eventOptions);

            if(isSure && isIn) {
                that.trigger('drop', eventOptions);
            }

            $targets.removeClass('drop-to');
            $ele.removeClass('dragging').removeClass('drag-from');
            $shadow.remove();
            $shadow = null;

            that.trigger('finish', eventOptions);
            that.trigger('always', eventOptions);

            if(event) event.preventDefault();
        };

        var mouseDown = function(event) {
            var mouseButton = $.zui.getMouseButtonCode(setting.mouseButton);
            if(mouseButton > -1 && event.button !== mouseButton) {
                return;
            }
            
            var $mouseDownEle = $(this);
            if(selector) {
                $ele = handle ? $mouseDownEle.closest(selector) : $mouseDownEle;
            }

            if($ele.hasClass('drag-shadow')) {
                return;
            }

            if(setting['before']) {
                if(setting['before']({
                    event: event,
                    element: $ele
                }) === false) return;
            }

            isMouseDown = true;
            $targets         = $.isFunction(setting.target) ? setting.target($root) : $container.find(setting.target),
            $target          = null,
            $shadow          = null,
            isIn             = false,
            isSelf           = true,
            oldCssPosition   = null,
            startOffset      = $ele.offset(),
            containerOffset  = $container.offset();
            startMouseOffset = {left: event.pageX, top: event.pageY};
            lastMouseOffset  = $.extend({}, startMouseOffset);
            clickOffset      = {
                left: startMouseOffset.left - startOffset.left,
                top: startMouseOffset.top - startOffset.top
            };

            $ele.addClass('drag-from');
            $(document).on(mouseMoveEvent, mouseMove).on(mouseUpEvent, mouseUp);
            mouseDownBackEventCall = setTimeout(function() {
                $(document).on(mouseDownEvent, mouseUp);
            }, 10);
            event.preventDefault();
        };

        if(handle) {
            $root.on(mouseDownEvent, handle, mouseDown);
        } else if(selector) {
            $root.on(mouseDownEvent, selector, mouseDown);
        } else {
            $root.on(mouseDownEvent, mouseDown);
        }
    };

    Droppable.prototype.destroy = function() {
        var eventSuffix = '.' + NAME + '.' + this.id;
        this.$.off(eventSuffix);
        $(document).off(eventSuffix);
        this.$.data(NAME, null);
    };

    Droppable.prototype.reset = function() {
        this.destroy();
        this.init();
    };

    $.fn.droppable = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Droppable(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.droppable.Constructor = Droppable;
}(jQuery, document, Math));


/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 *
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ========================================================================
 * Updates in ZUI：
 * 1. changed event namespace to *.zui.modal
 * 2. added position option to ajust poisition of modal
 * 3. added event 'escaping.zui.modal' with an param 'esc' to judge the esc
 *    key down
 * 4. get moveable options value from '.modal-moveable' on '.modal-dialog'
 * 5. add setMoveable method to make modal dialog moveable
 * ======================================================================== */

+ function($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var zuiname = 'zui.modal'
    var Modal = function(element, options) {
        var that = this;
        that.options = options
        that.$body = $(document.body)
        that.$element = $(element)
        that.$backdrop =
            that.isShown = null
        that.scrollbarWidth = 0

        if(options.moveable === undefined) {
            that.options.moveable = that.$element.hasClass('modal-moveable');
        }

        if(options.remote) {
            that.$element
                .find('.modal-content')
                .load(options.remote, function() {
                    that.$element.trigger('loaded.' + zuiname)
                })
        }
    }

    Modal.VERSION = '3.2.0'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true,
        // rememberPos: false,
        // moveable: false,
        position: 'fit' // 'center' or '40px' or '10%'
    };

    var setDialogPos = function($dialog, pos) {
        var $window = $(window);
        pos.left = Math.max(0, Math.min(pos.left, $window.width() - $dialog.outerWidth()));
        pos.top = Math.max(0, Math.min(pos.top, $window.height() - $dialog.outerHeight()));
        $dialog.css(pos);
    };

    Modal.prototype.toggle = function(_relatedTarget, position) {
        return this.isShown ? this.hide() : this.show(_relatedTarget, position)
    }

    Modal.prototype.ajustPosition = function(position) {
        var that = this;
        var options = that.options;
        if(typeof position === 'undefined') position = options.position;
        if(typeof position === 'undefined') return;
        var $dialog = that.$element.find('.modal-dialog');
        // if($dialog.hasClass('modal-dragged')) return;

        var half = Math.max(0, ($(window).height() - $dialog.outerHeight()) / 2);
        var topPos = position == 'fit' ? (half * 2 / 3) : (position == 'center' ? half : position);
        if($dialog.hasClass('modal-moveable')) {
            var pos = null;
            var rememberPos = options.rememberPos;
            if(rememberPos) {
                if(rememberPos === true) {
                    pos = that.$element.data('modal-pos');
                } else if($.zui.store) {
                    pos = $.zui.store.pageGet(zuiname + '.rememberPos.' + rememberPos);
                }
            }
            if(!pos) {
                pos = {
                    left: Math.max(0, ($(window).width() - $dialog.outerWidth()) / 2),
                    top: topPos
                };
            }
            if (options.moveable === 'inside') {
                setDialogPos($dialog, pos);
            } else {
                $dialog.css(pos);
            }
        } else {
            $dialog.css('margin-top', topPos);
        }
    }

    Modal.prototype.setMoveale = function() {
        if(!$.fn.draggable) console.error('Moveable modal requires draggable.js.');
        var that = this;
        var options = that.options;
        var $dialog = that.$element.find('.modal-dialog').removeClass('modal-dragged');
        $dialog.toggleClass('modal-moveable', !!options.moveable);

        if(!that.$element.data('modal-moveable-setup')) {
            $dialog.draggable({
                container: that.$element,
                handle: '.modal-header',
                before: function() {
                    $dialog.css('margin-top', '').addClass('modal-dragged');
                },
                finish: function(e) {
                    var rememberPos = options.rememberPos;
                    if(rememberPos) {
                        that.$element.data('modal-pos', e.pos);
                        if($.zui.store && rememberPos !== true) {
                            $.zui.store.pageSet(zuiname + '.rememberPos.' + rememberPos, e.pos);
                        }
                    }
                },
                move: options.moveable === 'inside' ? function (dragPos) {
                    setDialogPos($dialog, dragPos);
                } : true
            });
        }
    }

    Modal.prototype.show = function(_relatedTarget, position) {
        var that = this
        var e = $.Event('show.' + zuiname, {
            relatedTarget: _relatedTarget
        })

        that.$element.trigger(e)

        if(that.isShown || e.isDefaultPrevented()) return

        that.isShown = true

        if(that.options.moveable) that.setMoveale();

        that.checkScrollbar()
        that.$body.addClass('modal-open')

        that.setScrollbar()
        that.escape()

        that.$element.on('click.dismiss.' + zuiname, '[data-dismiss="modal"]', $.proxy(that.hide, that))

        that.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if(!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            if(transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element
                .addClass('in')
                .attr('aria-hidden', false)

            that.ajustPosition(position);

            that.enforceFocus()

            var e = $.Event('shown.' + zuiname, {
                relatedTarget: _relatedTarget
            })

            transition ?
                that.$element.find('.modal-dialog') // wait for modal to slide in
                .one('bsTransitionEnd', function() {
                    that.$element.trigger('focus').trigger(e)
                })
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function(e) {
        if(e) e.preventDefault()

        e = $.Event('hide.' + zuiname)

        this.$element.trigger(e)

        if(!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.$body.removeClass('modal-open')

        this.resetScrollbar()
        this.escape()

        $(document).off('focusin.' + zuiname)

        this.$element
            .removeClass('in')
            .attr('aria-hidden', true)
            .off('click.dismiss.' + zuiname)

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
            .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
    }

    Modal.prototype.enforceFocus = function() {
        $(document)
            .off('focusin.' + zuiname) // guard against infinite focus loop
            .on('focusin.' + zuiname, $.proxy(function(e) {
                if(this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function() {
        if(this.isShown && this.options.keyboard) {
            $(document).on('keydown.dismiss.' + zuiname, $.proxy(function(e) {
                if(e.which == 27) {
                    var et = $.Event('escaping.' + zuiname)
                    var result = this.$element.triggerHandler(et, 'esc')
                    if(result != undefined && (!result)) return
                    this.hide()
                }
            }, this))
        } else if(!this.isShown) {
            $(document).off('keydown.dismiss.' + zuiname)
        }
    }

    Modal.prototype.hideModal = function() {
        var that = this
        this.$element.hide()
        this.backdrop(function() {
            that.$element.trigger('hidden.' + zuiname)
        })
    }

    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function(callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if(this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                .appendTo(this.$body)

            this.$element.on('mousedown.dismiss.' + zuiname, $.proxy(function(e) {
                if(e.target !== e.currentTarget) return
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
            }, this))

            if(doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if(!callback) return

            doAnimate ?
                this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        } else if(!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            var callbackRemove = function() {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        } else if(callback) {
            callback()
        }
    }

    Modal.prototype.checkScrollbar = function() {
        if(document.body.clientWidth >= window.innerWidth) return
        this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        if(this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function() {
        this.$body.css('padding-right', '')
    }

    Modal.prototype.measureScrollbar = function() { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }


    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget, position) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data(zuiname)
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if(!data) $this.data(zuiname, (data = new Modal(this, options)))
            if(typeof option == 'string') data[option](_relatedTarget, position)
            else if(options.show) data.show(_relatedTarget, position)
        })
    }

    var old = $.fn.modal

    $.fn.modal = Plugin
    $.fn.modal.Constructor = Modal


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function() {
        $.fn.modal = old
        return this
    }


    // MODAL DATA-API
    // ==============

    $(document).on('click.' + zuiname + '.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this)
        var href = $this.attr('href')
        var $target = null
        try {
            // strip for ie7
            $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        } catch(ex) {
            return
        }
        if(!$target.length) return;
        var option = $target.data(zuiname) ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data())

        if($this.is('a')) e.preventDefault()

        $target.one('show.' + zuiname, function(showEvent) {
            // only register focus restorer if modal will actually get shown
            if(showEvent.isDefaultPrevented()) return
            $target.one('hidden.' + zuiname, function() {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this, $this.data('position'))
    })

}(jQuery);


/* ========================================================================
 * ZUI: modal.trigger.js [1.2.0+]
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window) {
    'use strict';

    if(!$.fn.modal) throw new Error('Modal trigger requires modal.js');

    var NAME = 'zui.modaltrigger',
        STR_AJAX = 'ajax',
        ZUI_MODAL = '.zui.modal',
        STR_STRING = 'string';

    // MODAL TRIGGER CLASS DEFINITION
    // ======================
    var ModalTrigger = function(options, $trigger) {
        options = $.extend({}, ModalTrigger.DEFAULTS, $.ModalTriggerDefaults, $trigger ? $trigger.data() : null, options);
        this.isShown;
        this.$trigger = $trigger;
        this.options = options;
        this.id = $.zui.uuid();
    };

    ModalTrigger.DEFAULTS = {
        type: 'custom',
        // width: null, // number, css definition
        // size: null, // 'md', 'sm', 'lg', 'fullscreen'
        height: 'auto',
        // icon: null,
        name: 'triggerModal',
        // className: '',
        fade: true,
        position: 'fit',
        showHeader: true,
        delay: 0,
        // iframeBodyClass: '',
        // onlyIncreaseHeight: false,
        // moveable: false,
        // rememberPos: false,
        backdrop: true,
        keyboard: true,
        waittime: 0,
        loadingIcon: 'icon-spinner-indicator'
    };

    ModalTrigger.prototype.init = function(options) {
        var that = this;
        if(options.url) {
            if(!options.type || (options.type != STR_AJAX && options.type != 'iframe')) {
                options.type = STR_AJAX;
            }
        }
        if(options.remote) {
            options.type = STR_AJAX;
            if(typeof options.remote === STR_STRING) options.url = options.remote;
        } else if(options.iframe) {
            options.type = 'iframe';
            if(typeof options.iframe === STR_STRING) options.url = options.iframe;
        } else if(options.custom) {
            options.type = 'custom';
            if(typeof options.custom === STR_STRING) {
                var $doms;
                try {
                    $doms = $(options.custom);
                } catch(e) {}

                if($doms && $doms.length) {
                    options.custom = $doms;
                } else if($.isFunction(window[options.custom])) {
                    options.custom = window[options.custom];
                }
            }
        }

        var $modal = $('#' + options.name);
        if($modal.length) {
            if(!that.isShown) $modal.off(ZUI_MODAL);
            $modal.remove();
        }
        $modal = $('<div id="' + options.name + '" class="modal modal-trigger ' + (options.className || '') + '">' + (typeof options.loadingIcon === 'string' && options.loadingIcon.indexOf('icon-') === 0 ? ('<div class="icon icon-spin loader ' + options.loadingIcon + '"></div>') : options.loadingIcon) + '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" data-dismiss="modal">×</button><h4 class="modal-title"><i class="modal-icon"></i> <span class="modal-title-name"></span></h4></div><div class="modal-body"></div></div></div></div>').appendTo('body').data(NAME, that);

        var bindEvent = function(optonName, eventName) {
            var handleFunc = options[optonName];
            if($.isFunction(handleFunc)) $modal.on(eventName + ZUI_MODAL, handleFunc);
        };
        bindEvent('onShow', 'show');
        bindEvent('shown',  'shown');
        bindEvent('onHide', 'hide');
        bindEvent('hidden', 'hidden');
        bindEvent('loaded', 'loaded');

        $modal.on('shown' + ZUI_MODAL, function() {
            that.isShown = true;
        }).on('hidden' + ZUI_MODAL, function() {
            that.isShown = false;
        });

        this.$modal = $modal;
        this.$dialog = $modal.find('.modal-dialog');

        if(options.mergeOptions) this.options = options;
    };

    ModalTrigger.prototype.show = function(option) {
        var options = $.extend({}, this.options, {url: this.$trigger ? (this.$trigger.attr('href') || this.$trigger.attr('data-url') || this.$trigger.data('url')) : this.options.url}, option);
        this.init(options);
        var that = this,
            $modal = this.$modal,
            $dialog = this.$dialog,
            custom = options.custom;
        var $body = $dialog.find('.modal-body').css('padding', ''),
            $header = $dialog.find('.modal-header'),
            $content = $dialog.find('.modal-content');

        $modal.toggleClass('fade', options.fade)
            .addClass(options.className)
            .toggleClass('modal-loading', !this.isShown);

        $dialog.toggleClass('modal-md', options.size === 'md')
            .toggleClass('modal-sm', options.size === 'sm')
            .toggleClass('modal-lg', options.size === 'lg')
            .toggleClass('modal-fullscreen', options.size === 'fullscreen');

        $header.toggle(options.showHeader);
        $header.find('.modal-icon').attr('class', 'modal-icon icon-' + options.icon);
        $header.find('.modal-title-name').text(options.title || '');
        if(options.size && options.size === 'fullscreen') {
            options.width = '';
            options.height = '';
        }

        var resizeDialog = function() {
            clearTimeout(this.resizeTask);
            this.resizeTask = setTimeout(function() {
                that.ajustPosition();
            }, 100);
        };

        var readyToShow = function(delay, callback) {
            if(typeof delay === 'undefined') delay = options.delay;
            return setTimeout(function() {
                $dialog = $modal.find('.modal-dialog');
                if(options.width && options.width != 'auto') {
                    $dialog.css('width', options.width);
                }
                if(options.height && options.height != 'auto') {
                    $dialog.css('height', options.height);
                    if(options.type === 'iframe') $body.css('height', $dialog.height() - $header.outerHeight());
                }
                that.ajustPosition(options.position);
                $modal.removeClass('modal-loading');

                if(options.type != 'iframe') {
                    $dialog.off('resize.' + NAME).on('resize.' + NAME, resizeDialog);
                }

                callback && callback();
            }, delay);
        };

        if(options.type === 'custom' && custom) {
            if($.isFunction(custom)) {
                var customContent = custom({
                    modal: $modal,
                    options: options,
                    modalTrigger: that,
                    ready: readyToShow
                });
                if(typeof customContent === STR_STRING) {
                    $body.html(customContent);
                    readyToShow();
                }
            } else if(custom instanceof $) {
                $body.html($('<div>').append(custom.clone()).html());
                readyToShow();
            } else {
                $body.html(custom);
                readyToShow();
            }
        } else if(options.url) {
            var onLoadBroken = function() {
                var brokenContent = $modal.callComEvent(that, 'broken');
                if(brokenContent) {
                    $body.html(brokenContent);
                    readyToShow();
                }
            };

            $modal.attr('ref', options.url);
            if(options.type === 'iframe') {
                $modal.addClass('modal-iframe');
                this.firstLoad = true;
                var iframeName = 'iframe-' + options.name;
                $header.detach();
                $body.detach();
                $content.empty().append($header).append($body);
                $body.css('padding', 0)
                    .html('<iframe id="' + iframeName + '" name="' + iframeName + '" src="' + options.url + '" frameborder="no"  allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"  allowtransparency="true" scrolling="auto" style="width: 100%; height: 100%; left: 0px;"></iframe>');

                if(options.waittime > 0) {
                    that.waitTimeout = readyToShow(options.waittime, onLoadBroken);
                }

                var frame = document.getElementById(iframeName);
                frame.onload = frame.onreadystatechange = function() {
                    if(that.firstLoad) $modal.addClass('modal-loading');
                    if(this.readyState && this.readyState != 'complete') return;
                    that.firstLoad = false;

                    if(options.waittime > 0) {
                        clearTimeout(that.waitTimeout);
                    }

                    try {
                        $modal.attr('ref', frame.contentWindow.location.href);
                        var frame$ = window.frames[iframeName].$;
                        if(frame$ && options.height === 'auto' && options.size != 'fullscreen') {
                            // todo: update iframe url to ref attribute
                            var $framebody = frame$('body').addClass('body-modal');
                            if(options.iframeBodyClass) $framebody.addClass(options.iframeBodyClass);
                            var ajustFrameSize = function(check) {
                                $modal.removeClass('fade');
                                var height = $framebody.outerHeight();
                                if(check === true && options.onlyIncreaseHeight) {
                                    height = Math.max(height, $body.data('minModalHeight') || 0);
                                    $body.data('minModalHeight', height);
                                }
                                $body.css('height', height);
                                if(options.fade) $modal.addClass('fade');
                                readyToShow();
                            };

                            $modal.callComEvent(that, 'loaded', {
                                modalType: 'iframe',
                                jQuery: frame$
                            });

                            setTimeout(ajustFrameSize, 100);

                            $framebody.off('resize.' + NAME).on('resize.' + NAME, resizeDialog);
                        } else {
                            readyToShow();
                        }

                        frame$.extend({
                            closeModal: window.closeModal
                        });
                    } catch(e) {
                        readyToShow();
                    }
                };
            } else {
                $.ajax($.extend({
                    url: options.url,
                    success: function(data) {
                        try {
                            var $data = $(data);
                            if($data.hasClass('modal-dialog')) {
                                $dialog.replaceWith($data);
                            } else if($data.hasClass('modal-content')) {
                                $dialog.find('.modal-content').replaceWith($data);
                            } else {
                                $body.wrapInner($data);
                            }
                        } catch(e) {
                            $modal.html(data);
                        }
                        $modal.callComEvent(that, 'loaded', {
                            modalType: STR_AJAX
                        });
                        readyToShow();
                    },
                    error: onLoadBroken
                }, options.ajaxOptions));
            }
        }

        $modal.modal({
            show       : 'show',
            backdrop   : options.backdrop,
            moveable   : options.moveable,
            rememberPos: options.rememberPos,
            keyboard   : options.keyboard
        });
    };

    ModalTrigger.prototype.close = function(callback, redirect) {
        if(callback || redirect) {
            this.$modal.on('hidden' + ZUI_MODAL, function() {
                if($.isFunction(callback)) callback();

                if(typeof redirect === STR_STRING) {
                    if(redirect === 'this') window.location.reload();
                    else window.location = redirect;
                }
            });
        }
        this.$modal.modal('hide');
    };

    ModalTrigger.prototype.toggle = function(options) {
        if(this.isShown) this.close();
        else this.show(options);
    };

    ModalTrigger.prototype.ajustPosition = function(position) {
        this.$modal.modal('ajustPosition', position || this.options.position);
    };

    $.zui({
        ModalTrigger: ModalTrigger,
        modalTrigger: new ModalTrigger()
    });

    $.fn.modalTrigger = function(option, settings) {
        return $(this).each(function() {
            var $this = $(this);
            var data = $this.data(NAME),
                options = $.extend({
                    title: $this.attr('title') || $this.text(),
                    url: $this.attr('href'),
                    type: $this.hasClass('iframe') ? 'iframe' : ''
                }, $this.data(), $.isPlainObject(option) && option);
            if(!data) $this.data(NAME, (data = new ModalTrigger(options, $this)));
            if(typeof option == STR_STRING) data[option](settings);
            else if(options.show) data.show(settings);

            $this.on((options.trigger || 'click') + '.toggle.' + NAME, function(e) {
                data.toggle(options);
                if($this.is('a')) e.preventDefault();
            });
        });
    };

    var old = $.fn.modal;
    $.fn.modal = function(option, settings) {
        return $(this).each(function() {
            var $this = $(this);
            if($this.hasClass('modal')) old.call($this, option, settings);
            else $this.modalTrigger(option, settings);
        });
    };

    var getModal = function(modal) {
        var modalType = typeof(modal);
        if(modalType === 'undefined') {
            modal = $('.modal.modal-trigger');
        } else if(modalType === STR_STRING) {
            modal = $(modal);
        }
        if(modal && (modal instanceof $)) return modal;
        return null;
    };

    // callback, redirect, modal
    var closeModal = function(modal, callback, redirect) {
        if($.isFunction(modal)) {
            var oldModal = redirect;
            redirect = callback;
            callback = modal;
            modal = oldModal;
        }
        modal = getModal(modal);
        if(modal && modal.length) {
            modal.each(function() {
                $(this).data(NAME).close(callback, redirect);
            });
        }
    };

    var ajustModalPosition = function(position, modal) {
        modal = getModal(modal);
        if(modal && modal.length) {
            modal.modal('ajustPosition', position);
        }
    };

    $.zui({
        closeModal: closeModal,
        ajustModalPosition: ajustModalPosition
    });

    $(document).on('click.' + NAME + '.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = null;
        try {
            $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        } catch(ex) {}
        if(!$target || !$target.length) {
            if(!$this.data(NAME)) {
                $this.modalTrigger({
                    show: true,
                });
            } else {
                $this.trigger('.toggle.' + NAME);
            }
        }
        if($this.is('a')) {
            e.preventDefault();
        }
    });
}(window.jQuery, window));


/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twzui.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 *  
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+ function($) {
    'use strict';

    // TOOLTIP PUBLIC CLASS DEFINITION
    // ===============================

    var Tooltip = function(element, options) {
        this.type = null
        this.options = null
        this.enabled = null
        this.timeout = null
        this.hoverState = null
        this.$element = null

        this.init('tooltip', element, options)
    } 

    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false
    }

    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)

        var triggers = this.options.trigger.split(' ')

        for(var i = triggers.length; i--;) {
            var trigger = triggers[i]

            if(trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if(trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }

        this.options.selector ?
            (this._options = $.extend({}, this.options, {
                trigger: 'manual',
                selector: ''
            })) :
            this.fixTitle()
    }

    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS
    }

    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)

        if(options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        return options
    }

    Tooltip.prototype.getDelegateOptions = function() {
        var options = {}
        var defaults = this.getDefaults()

        this._options && $.each(this._options, function(key, value) {
            if(defaults[key] != value) options[key] = value
        })

        return options
    }

    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('zui.' + this.type)

        clearTimeout(self.timeout)

        self.hoverState = 'in'

        if(!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function() {
            if(self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }

    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('zui.' + this.type)

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if(!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function() {
            if(self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }

    Tooltip.prototype.show = function(content) {
        var e = $.Event('show.zui.' + this.type)

        if((content || this.hasContent()) && this.enabled) {
            var that = this
            that.$element.trigger(e)

            if(e.isDefaultPrevented()) return

            var $tip = that.tip()

            that.setContent(content)

            if(that.options.animation) $tip.addClass('fade')

            var placement = typeof that.options.placement == 'function' ?
                that.options.placement.call(that, $tip[0], that.$element[0]) :
                that.options.placement

            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if(autoPlace) placement = placement.replace(autoToken, '') || 'top'

            $tip
                .detach()
                .css({
                    top: 0,
                    left: 0,
                    display: 'block'
                })
                .addClass(placement)

            that.options.container ? $tip.appendTo(that.options.container) : $tip.insertAfter(that.$element)

            var pos = that.getPosition()
            var actualWidth = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight

            if(autoPlace) {
                var $parent = that.$element.parent()

                var orgPlacement = placement
                var docScroll = document.documentElement.scrollTop || document.body.scrollTop
                var parentWidth = that.options.container == 'body' ? window.innerWidth : $parent.outerWidth()
                var parentHeight = that.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
                var parentLeft = that.options.container == 'body' ? 0 : $parent.offset().left

                placement = placement == 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' :
                    placement == 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' :
                    placement == 'right' && pos.right + actualWidth > parentWidth ? 'left' :
                    placement == 'left' && pos.left - actualWidth < parentLeft ? 'right' :
                    placement

                $tip
                    .removeClass(orgPlacement)
                    .addClass(placement)
            }

            var calculatedOffset = that.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

            that.applyPlacement(calculatedOffset, placement)
            var complete = function () {
                var prevHoverState = that.hoverState
                that.$element.trigger('shown.zui.' + that.type)
                that.hoverState = null

                if (prevHoverState == 'out') that.leave(that)
            }

            $.support.transition && that.$tip.hasClass('fade') ?
                $tip
                  .one('bsTransitionEnd', complete)
                  .emulateTransitionEnd(150) :
                complete()
        }
    }

    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var replace
        var $tip = this.tip()
        var width = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)

        // we must check for NaN for ie 8/9
        if(isNaN(marginTop)) marginTop = 0
        if(isNaN(marginLeft)) marginLeft = 0

        offset.top = offset.top + marginTop
        offset.left = offset.left + marginLeft

        $tip
            .offset(offset)
            .addClass('in')

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if(placement == 'top' && actualHeight != height) {
            replace = true
            offset.top = offset.top + height - actualHeight
        }

        if(/bottom|top/.test(placement)) {
            var delta = 0

            if(offset.left < 0) {
                delta = offset.left * -2
                offset.left = 0

                $tip.offset(offset)

                actualWidth = $tip[0].offsetWidth
                actualHeight = $tip[0].offsetHeight
            }

            this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
        } else {
            this.replaceArrow(actualHeight - height, actualHeight, 'top')
        }

        if(replace) $tip.offset(offset)
    }

    Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
        this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

    Tooltip.prototype.setContent = function(content) {
        var $tip = this.tip()
        var title = content || this.getTitle()

        if(this.options.tipId) $tip.attr('id', this.options.tipId)
        if(this.options.tipClass) $tip.addClass(this.options.tipClass)

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }

    Tooltip.prototype.hide = function() {
        var that = this
        var $tip = this.tip()
        var e = $.Event('hide.zui.' + this.type)

        function complete() {
            if(that.hoverState != 'in') $tip.detach()
        }

        this.$element.trigger(e)

        if(e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && this.$tip.hasClass('fade') ?
            $tip
            .one($.support.transition.end, complete)
            .emulateTransitionEnd(150) :
            complete()

        this.$element.trigger('hidden.zui.' + this.type)

        return this
    }

    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element
        if($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }

    Tooltip.prototype.hasContent = function() {
        return this.getTitle()
    }

    Tooltip.prototype.getPosition = function() {
        var el = this.$element[0]
        return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
            width: el.offsetWidth,
            height: el.offsetHeight
        }, this.$element.offset())
    }

    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } :
            placement == 'top' ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } :
            placement == 'left' ? {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } :
            /* placement == 'right' */
            {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            }
    }

    Tooltip.prototype.getTitle = function() {
        var title
        var $e = this.$element
        var o = this.options

        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

        return title
    }

    Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template)
    }

    Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
    }

    Tooltip.prototype.validate = function() {
        if(!this.$element[0].parentNode) {
            this.hide()
            this.$element = null
            this.options = null
        }
    }

    Tooltip.prototype.enable = function() {
        this.enabled = true
    }

    Tooltip.prototype.disable = function() {
        this.enabled = false
    }

    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }

    Tooltip.prototype.toggle = function(e) {
        var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('zui.' + this.type) : this
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }

    Tooltip.prototype.destroy = function() {
        this.hide().$element.off('.' + this.type).removeData('zui.' + this.type)
    }


    // TOOLTIP PLUGIN DEFINITION
    // =========================

    var old = $.fn.tooltip

    $.fn.tooltip = function(option, params) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('zui.tooltip')
            var options = typeof option == 'object' && option

            if(!data) $this.data('zui.tooltip', (data = new Tooltip(this, options)))
            if(typeof option == 'string') data[option](params)
        })
    }

    $.fn.tooltip.Constructor = Tooltip


    // TOOLTIP NO CONFLICT
    // ===================

    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old
        return this
    }

}(window.jQuery);


/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 *
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+ function($) {
    'use strict';

    // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover = function(element, options) {
        this.init('popover', element, options)
    }

    if(!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })


    // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

    Popover.prototype.constructor = Popover

    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS
    }

    Popover.prototype.setContent = function() {
        var $tip = this.tip()
        var target = this.getTarget()

        if(target) {
            if(target.find('.arrow').length < 1)
                $tip.addClass('no-arrow')
            $tip.html(target.html())
            return
        }

        var title = this.getTitle()
        var content = this.getContent()

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

        $tip.removeClass('fade top bottom left right in')

        if(this.options.tipId) $tip.attr('id', this.options.tipId)
        if(this.options.tipClass) $tip.addClass(this.options.tipClass)

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if(!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
    }

    Popover.prototype.hasContent = function() {
        return this.getTarget() || this.getTitle() || this.getContent()
    }

    Popover.prototype.getContent = function() {
        var $e = this.$element
        var o = this.options

        return $e.attr('data-content') || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
    }

    Popover.prototype.getTarget = function() {
        var $e = this.$element
        var o = this.options

        var target = $e.attr('data-target') || (typeof o.target == 'function' ?
            o.target.call($e[0]) :
            o.target)
        return(target && true) ? (target == '$next' ? $e.next('.popover') : $(target)) : false
    }

    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.arrow')
    }

    Popover.prototype.tip = function() {
        if(!this.$tip) this.$tip = $(this.options.template)
        return this.$tip
    }


    // POPOVER PLUGIN DEFINITION
    // =========================

    var old = $.fn.popover

    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('zui.popover')
            var options = typeof option == 'object' && option

            if(!data) $this.data('zui.popover', (data = new Popover(this, options)))
            if(typeof option == 'string') data[option]()
        })
    }

    $.fn.popover.Constructor = Popover


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popover.noConflict = function() {
        $.fn.popover = old
        return this
    }

}(window.jQuery);


/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 *
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+ function($) {
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var zuiname = 'zui.dropdown';
    var backdrop = '.dropdown-backdrop'
    var toggle = '[data-toggle=dropdown]'
    var Dropdown = function(element) {
        var $el = $(element).on('click.' + zuiname, this.toggle)
    }

    Dropdown.prototype.toggle = function(e) {
        var $this = $(this)

        if($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if(!isActive) {
            if('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we we use a backdrop because click events don't delegate
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
            }

            $parent.trigger(e = $.Event('show.' + zuiname))

            if(e.isDefaultPrevented()) return

            $parent
                .toggleClass('open')
                .trigger('shown.' + zuiname)

            $this.focus()
        }

        return false
    }

    Dropdown.prototype.keydown = function(e) {
        if(!/(38|40|27)/.test(e.keyCode)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        if(!isActive || (isActive && e.keyCode == 27)) {
            if(e.which == 27) $parent.find(toggle).focus()
            return $this.click()
        }

        var $items = $('[role=menu] li:not(.divider):visible a', $parent)

        if(!$items.length) return

        var index = $items.index($items.filter(':focus'))

        if(e.keyCode == 38 && index > 0) index-- // up
            if(e.keyCode == 40 && index < $items.length - 1) index++ // down
                if(!~index) index = 0

        $items.eq(index).focus()
    }

    function clearMenus() {
        $(backdrop).remove()
        $(toggle).each(function(e) {
            var $parent = getParent($(this))
            if(!$parent.hasClass('open')) return
            $parent.trigger(e = $.Event('hide.' + zuiname))
            if(e.isDefaultPrevented()) return
            $parent.removeClass('open').trigger('hidden.' + zuiname)
        })
    }

    function getParent($this) {
        var selector = $this.attr('data-target')

        if(!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }
        var $parent;
        try {
            $parent = selector && $(selector);
        } catch(e) {}
        return $parent && $parent.length ? $parent : $this.parent()
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    var old = $.fn.dropdown

    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('dropdown')

            if(!data) $this.data('dropdown', (data = new Dropdown(this)))
            if(typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    var apiName = zuiname + '.data-api'
    $(document)
        .on('click.' + apiName, clearMenus)
        .on('click.' + apiName, '.dropdown form', function(e) {
            e.stopPropagation()
        })
        .on('click.' + apiName, toggle, Dropdown.prototype.toggle)
        .on('keydown.' + apiName, toggle + ', [role=menu]', Dropdown.prototype.keydown)

}(window.jQuery);


/* ========================================================================
 * ZUI: contextmenu.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2017-2018 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, undefined) {
    'use strict';

    var NAME = 'zui.contextmenu'; // model name

    var DEFAULTS = {
        // onShow: null,
        // onShown: null,
        // onHide: null,
        // onHidden: null,
        // itemCreator: null,
        // x: 0,
        // y: 0,
        // onClickItem: null,
        duration: 200,
    };

    var isShowingMenu = false;
    var ContextMenu = {};
    var targetId = 'zui-contextmenu-' + $.zui.uuid();
    var mouseX = 0, mouseY = 0;
    var listenMouseMove = function() {
        $(document).off('mousemove.' + NAME).on('mousemove.' + NAME, function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        return ContextMenu;
    };
    var stopListenMouse = function() {
        $(document).off('mousemove.' + NAME);
        return ContextMenu;
    };
    var createMenuItem = function(item, index) {
        if (typeof item === 'string') {
            if (item === 'seperator' || item === 'divider' || item === '-' || item === '|') {
                item = {type: 'seperator'};
            } else {
                item = {label: item, id: index};
            }
        }
        if (item.type === 'seperator' || item.type === 'divider') {
            return $('<li class="divider"></li>');
        }
        var $a = $('<a/>').attr({
            href: item.url || '###',
            'class': item.className,
            style: item.style
        }).data('item', item);
        if (item.html) {
            $a.html(item.html);
        } else {
            $a.text(item.label || item.text);
        }
        if (item.onClick) {
            $a.on('click', item.onClick);
        }
        return $('<li />').toggleClass('disabled', item.disabled === true).append($a);
    };

    var animationTimer = null;
    var hideContextMenu = function(id, callback) {
        if (typeof id === 'function') {
            callback = id;
            id = null;
        }

        if (animationTimer) {
            clearTimeout(animationTimer);
            animationTimer = null;
        }

        var $target = $('#' + targetId);
        if ($target.length) {
            var options = $target.data('options');
            if (!id || options.id === id) {
                var afterHide = function() {
                    $target.hide();
                    options.onHidden && options.onHidden();
                    callback && callback();
                };
                options.onHide && options.onHide();
                var animation = options.animation;
                $target.removeClass('in');
                if (animation) {
                    animationTimer = setTimeout(afterHide, options.duration);
                } else {
                    afterHide();
                }
            }
        }
        return ContextMenu;
    };

    var showContextMenu = function(items, options, callback) {
        if ($.isPlainObject(items)) {
            callback = options;
            options = items;
            items = options.items;
        }

        isShowingMenu = true;
        // hideContextMenu();

        options = $.extend({}, DEFAULTS, options);
        var x = options.x;
        var y = options.y;
        if (x === undefined) x = (options.event || options).clientX;
        if (x === undefined) x = mouseX;
        if (y === undefined) y = (options.event || options).clientY;
        if (y === undefined) y = mouseY;

        var $target = $('#' + targetId);
        if (!$target.length) {
            $target = $('<div style="display: none; position: fixed; z-index: 2000;" class="contextmenu" id="' + targetId + '"><ul class="dropdown-menu contextmenu-menu"></ul></div>').appendTo('body');
        }
        var $menu = $target.find('.contextmenu-menu').off('click.' + NAME).on('click.' + NAME, 'a', function(e) {
            var $item = $(this);
            var clickResult = options.onClickItem && options.onClickItem($item.data('item'), $item, e);
            if (clickResult !== false) {
                hideContextMenu();
            }
        }).empty();;
        $target.hide().attr('class', 'contextmenu');
        var itemCreator = options.itemCreator || createMenuItem;
        var itemsType = typeof items;
        if (itemsType === 'string') {
            items = items.split(',');
        } else if (itemsType === 'function') {
            items = items(options);
        }
        $.each(items, function(index, item) {
            $menu.append(itemCreator(item, index, options));
        });

        // Show menu
        var animation = options.animation;
        var duration = options.duration;
        if (animation === true) options.animation = animation = 'fade';
        if (animationTimer) {
            clearTimeout(animationTimer);
            animationTimer = null;
        }
        var afterShow = function() {
            $target.addClass('in');
            options.onShown && options.onShown();
            callback && callback();
        };
        options.onShow && options.onShow();
        $target.data('options', {
            animation: animation,
            onHide: options.onHide,
            onHidden: options.onHidden,
            id: options.id,
            duration: duration
        });

        var $w = $(window);
        x = Math.max(0, Math.min(x, $w.width() - $menu.outerWidth()));
        y = Math.max(0, Math.min(y, $w.height() - $menu.outerHeight()));
        $target.css({
            left: x,
            top: y
        });

        if (animation) {
            $target.addClass('open').addClass(animation).show();
            animationTimer = setTimeout(function() {
                afterShow();
                isShowingMenu = false;
            }, options.duration);
        } else {
            $target.addClass('open').show();
            afterShow();
            animationTimer = setTimeout(function() {
                isShowingMenu = false;
            }, 200);
        }
        return ContextMenu;
    };

    $(document).on('click', function(e) {
        if (!isShowingMenu && !$(e.target).closest('.contextmenu').length) {
            hideContextMenu();
        }
    });

    $.extend(ContextMenu, {
        NAME: NAME,
        DEFAULTS: DEFAULTS,
        show: showContextMenu,
        hide: hideContextMenu,
        listenMouse: listenMouseMove
    });
    $.zui({ContextMenu: ContextMenu});


    // The contextmenu model class
    var ContextListener = function(element, options) {
        var that = this;
        that.name = NAME;
        that.$ = $(element);

        options = that.options = $.extend({trigger: 'contextmenu'}, ContextMenu.DEFAULTS, this.$.data(), options);

        var trigger = options.trigger;

        that.id = $.zui.uuid();
        var eventHandler = function(e) {
            if (e.type === 'mousedown' && e.button !== 2) {
                return;
            }
            var config = {
                x: e.clientX,
                y: e.clientY,
                event: e
            };
            if (options.itemsCreator) {
                config.items = options.itemsCreator.call(this, e);
            }
            that.show(config);
            e.preventDefault();
            e.returnValue = false; // 解决IE8右键弹出
            return false;
        };
        var eventName = trigger + '.' + NAME;
        if (options.selector) {
            that.$.on(eventName, options.selector, eventHandler);
        } else {
            that.$.on(eventName, eventHandler);
        }
    };

    ContextListener.prototype.destory = function () {
        that.$.off('.' + NAME);
    };

    ContextListener.prototype.hide = function (callback) {
        ContextMenu.hide(this.id, callback);
    };

    ContextListener.prototype.show = function (options, callback) {
        options = $.extend({}, this.options, options);
        ContextMenu.show(options, callback);
    };

    // Extense jquery element
    $.fn.contextmenu = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new ContextListener(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };
    $.fn.contextmenu.Constructor = ContextListener;
}(jQuery, undefined));


/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twzui.github.com/bootstrap/javascript.html#carousel
 * 
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://zui.sexy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 * Updates in ZUI:
 * 1. support touch event for touchable devices
 * ======================================================================== */


+ function($) {
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function(element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.paused =
            this.sliding =
            this.interval =
            this.$active =
            this.$items = null

        this.options.pause == 'hover' && this.$element
            .on('mouseenter', $.proxy(this.pause, this))
            .on('mouseleave', $.proxy(this.cycle, this))
    }

    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        touchable: true
    }

    Carousel.prototype.touchable = function() {
        if(!this.options.touchable) return;

        this.$element.on('touchstart touchmove touchend', touch);
        var touchStartX, touchStartY;
        var that = this;

        /* listen the touch event */
        function touch(event) {
            var event = event || window.event;
            if(event.originalEvent) event = event.originalEvent;
            var carousel = $(this);

            switch(event.type) {
                case "touchstart":
                    touchStartX = event.touches[0].pageX;
                    touchStartY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var distanceX = event.changedTouches[0].pageX - touchStartX;
                    var distanceY = event.changedTouches[0].pageY - touchStartY;
                    if(Math.abs(distanceX) > Math.abs(distanceY)) {
                        handleCarousel(carousel, distanceX);
                        if(Math.abs(distanceX) > 10) {
                            event.preventDefault();
                        }
                    } else {
                        var $w = $(window);
                        $('body,html').animate({
                            scrollTop: $w.scrollTop() - distanceY
                        }, 400)
                    }
                    break;
            }
        }

        function handleCarousel(carousel, distance) {
            if(distance > 10) that.prev();
            else if(distance < -10) that.next();
        }
    }

    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getActiveIndex = function() {
        this.$active = this.$element.find('.item.active')
        this.$items = this.$active.parent().children()

        return this.$items.index(this.$active)
    }

    Carousel.prototype.to = function(pos) {
        var that = this
        var activeIndex = this.getActiveIndex()

        if(pos > (this.$items.length - 1) || pos < 0) return

        if(this.sliding) return this.$element.one('slid', function() {
            that.to(pos)
        })
        if(activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

    Carousel.prototype.pause = function(e) {
        e || (this.paused = true)

        if(this.$element.find('.next, .prev').length && $.support.transition.end) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function() {
        if(this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function() {
        if(this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active')
        var $next = next || $active[type]()
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var fallback = type == 'next' ? 'first' : 'last'
        var that = this

        if(!$next.length) {
            if(!this.options.wrap) return
            $next = this.$element.find('.item')[fallback]()
        }

        this.sliding = true

        isCycling && this.pause()

        var e = $.Event('slide.zui.carousel', {
            relatedTarget: $next[0],
            direction: direction
        })

        if($next.hasClass('active')) return

        if(this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            this.$element.one('slid', function() {
                var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
                $nextIndicator && $nextIndicator.addClass('active')
            })
        }

        if($.support.transition && this.$element.hasClass('slide')) {
            this.$element.trigger(e)
            if(e.isDefaultPrevented()) return
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one($.support.transition.end, function() {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function() {
                        that.$element.trigger('slid')
                    }, 0)
                })
                .emulateTransitionEnd(600)
        } else {
            this.$element.trigger(e)
            if(e.isDefaultPrevented()) return
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger('slid')
        }

        isCycling && this.cycle()

        return this
    }


    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    var old = $.fn.carousel

    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('zui.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide

            if(!data) $this.data('zui.carousel', (data = new Carousel(this, options)))
            if(typeof option == 'number') data.to(option)
            else if(action) data[action]()
            else if(options.interval) data.pause().cycle()

            if(options.touchable) data.touchable()
        })
    }

    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old
        return this
    }


    // CAROUSEL DATA-API
    // =================

    $(document).on('click.zui.carousel.data-api', '[data-slide], [data-slide-to]', function(e) {
        var $this = $(this),
            href
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if(slideIndex) options.interval = false

        $target.carousel(options)

        if(slideIndex = $this.attr('data-slide-to')) {
            $target.data('zui.carousel').to(slideIndex)
        }

        e.preventDefault()
    })

    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this)
            $carousel.carousel($carousel.data())
        })
    })

}(window.jQuery);


/* ========================================================================
 * TangBin: image.ready.js
 * http://www.planeart.cn/?p=1121
 *
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * original version in the future.
 * http://zui.sexy
 * ========================================================================
 * @version 2011.05.27
 * @author  TangBin
 * ======================================================================== */


/*! TangBin: image.ready.js http://www.planeart.cn/?p=1121 */

(function($) {
    'use strict';

    /**
     * Image ready
     * @param {String}  image url
     * @param {Function}  callback on image ready
     * @param {Function}  callback on image load
     * @param {Function}  callback on error
     * @example imgReady('image.png', function () {
        alert('size ready: width=' + this.width + '; height=' + this.height);
      });
     */
    $.zui.imgReady = (function() {
        var list = [],
            intervalId = null,

            // 用来执行队列
            tick = function() {
                var i = 0;
                for(; i < list.length; i++) {
                    list[i].end ? list.splice(i--, 1) : list[i]();
                }!list.length && stop();
            },

            // 停止所有定时器队列
            stop = function() {
                clearInterval(intervalId);
                intervalId = null;
            };

        return function(url, ready, load, error) {
            var onready, width, height, newWidth, newHeight,
                img = new Image();

            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if(img.complete) {
                ready.call(img);
                load && load.call(img);
                return;
            }

            width = img.width;
            height = img.height;

            // 加载错误后的事件
            img.onerror = function() {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
            };

            // 图片尺寸就绪
            onready = function() {
                newWidth = img.width;
                newHeight = img.height;
                if(newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                    newWidth * newHeight > 1024
                ) {
                    ready.call(img);
                    onready.end = true;
                }
            };
            onready();

            // 完全加载完毕的事件
            img.onload = function() {
                // onload在定时器时间差范围内可能比onready快
                // 这里进行检查并保证onready优先执行
                !onready.end && onready();

                load && load.call(img);

                // IE gif动画会循环执行onload，置空onload即可
                img = img.onload = img.onerror = null;
            };

            // 加入队列中定期执行
            if(!onready.end) {
                list.push(onready);
                // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                if(intervalId === null) intervalId = setInterval(tick, 40);
            }
        };
    })();
}(jQuery));


/* ========================================================================
 * ZUI: lightbox.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window, Math) {
    'use strict';

    if(!$.fn.modalTrigger) throw new Error('modal & modalTrigger requires for lightbox');
    if(!$.zui.imgReady) throw new Error('imgReady requires for lightbox');

    var Lightbox = function(element, options) {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Lightbox.DEFAULTS = {
        modalTeamplate: '<div class="icon-spinner icon-spin loader"></div><div class="modal-dialog"><button class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button><button class="controller prev"><i class="icon icon-chevron-left"></i></button><button class="controller next"><i class="icon icon-chevron-right"></i></button><img class="lightbox-img" src="{image}" alt="" data-dismiss="modal" /><div class="caption"><div class="content">{caption}<div></div></div>'
    }; // default options

    Lightbox.prototype.getOptions = function(options) {
        var IMAGE = 'image';
        options = $.extend({}, Lightbox.DEFAULTS, this.$.data(), options);
        if(!options[IMAGE]) {
            options[IMAGE] = this.$.attr('src') || this.$.attr('href') || this.$.find('img').attr('src');
            this.$.data(IMAGE, options[IMAGE]);
        }
        return options;
    };

    Lightbox.prototype.init = function() {
        this.bindEvents();
    };

    Lightbox.prototype.initGroups = function() {
        var groups = this.$.data('groups');
        if(!groups) {
            groups = $('[data-toggle="lightbox"][data-group="' + this.options.group + '"], [data-lightbox-group="' + this.options.group + '"]');
            this.$.data('groups', groups);
            groups.each(function(index) {
                $(this).attr('data-group-index', index);
            });
        }
        this.groups = groups;
        this.groupIndex = parseInt(this.$.data('group-index'));
    };

    Lightbox.prototype.bindEvents = function() {
        var $e = this.$,
            that = this;
        var options = this.options;
        if(!options.image) return false;
        $e.modalTrigger({
            type: 'custom',
            name: 'lightboxModal',
            position: 'center',
            custom: function(e) {
                that.initGroups();
                var modal = e.modal,
                    groups = that.groups,
                    groupIndex = that.groupIndex;

                modal.addClass('modal-lightbox')
                    .html(options.modalTeamplate.format(options))
                    .toggleClass('lightbox-with-caption', typeof options.caption == 'string')
                    .removeClass('lightbox-full')
                    .data('group-index', groupIndex);
                var dialog = modal.find('.modal-dialog'),
                    winWidth = $(window).width();
                $.zui.imgReady(options.image, function() {
                    dialog.css({
                        width: Math.min(winWidth, this.width)
                    });
                    if(winWidth < (this.width + 30)) modal.addClass('lightbox-full');
                    e.ready(200);
                });

                modal.find('.prev').toggleClass('show', groups.filter('[data-group-index="' + (groupIndex - 1) + '"]').length > 0);
                modal.find('.next').toggleClass('show', groups.filter('[data-group-index="' + (groupIndex + 1) + '"]').length > 0);

                modal.find('.controller').click(function() {
                    var $this = $(this);
                    var id = modal.data('group-index') + ($this.hasClass('prev') ? -1 : 1);
                    var $e = groups.filter('[data-group-index="' + id + '"]');
                    if($e.length) {
                        var image = $e.data('image'),
                            caption = $e.data('caption');
                        modal.addClass('modal-loading')
                            .data('group-index', id)
                            .toggleClass('lightbox-with-caption', typeof caption == 'string')
                            .removeClass('lightbox-full');
                        modal.find('.lightbox-img').attr('src', image);
                        modal.find('.caption > .content').text(caption);
                        winWidth = $(window).width();
                        $.zui.imgReady(image, function() {
                            dialog.css({
                                width: Math.min(winWidth, this.width)
                            });
                            if(winWidth < (this.width + 30)) modal.addClass('lightbox-full');
                            e.ready();
                        });
                    }
                    modal.find('.prev').toggleClass('show', groups.filter('[data-group-index="' + (id - 1) + '"]').length > 0);
                    modal.find('.next').toggleClass('show', groups.filter('[data-group-index="' + (id + 1) + '"]').length > 0);
                    return false;
                });
            }
        });
    };

    $.fn.lightbox = function(option) {
        var defaultGroup = 'group' + (new Date()).getTime();
        return this.each(function() {
            var $this = $(this);

            var options = typeof option == 'object' && option;
            if(typeof options == 'object' && options.group) {
                $this.attr('data-lightbox-group', options.group);
            } else if($this.data('group')) {
                $this.attr('data-lightbox-group', $this.data('group'));
            } else {
                $this.attr('data-lightbox-group', defaultGroup);
            }
            $this.data('group', $this.data('lightbox-group'));

            var data = $this.data('zui.lightbox');
            if(!data) $this.data('zui.lightbox', (data = new Lightbox(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.lightbox.Constructor = Lightbox;

    $(function() {
        $('[data-toggle="lightbox"]').lightbox();
    });
}(jQuery, window, Math));


/* ========================================================================
 * ZUI: messager.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window, undefined) {
    'use strict';

    var id = 0;
    var template = '<div class="messager messager-{type} {placement}" style="display: none"><div class="messager-content"></div><div class="messager-actions"></div></div>';
    var defaultOptions = {
        type: 'default',
        placement: 'top',
        time: 4000,
        parent: 'body',
        // clear: false,
        icon: null,
        close: true,
        // actions: [{icon, name, action, title}],
        // contentClass: null,
        // cssClass: null,
        // onAction: function,
        fade: true,
        scale: true
    };
    var all = {};

    var Messager = function(message, options) {
        if($.isPlainObject(message)) {
            options = message;
            message = options.message;
        }

        var that = this;
        options = that.options = $.extend({}, defaultOptions, options);
        
        that.id = options.id || (id++);
        var oldMessager = all[that.id];
        if(oldMessager) oldMessager.destroy();
        all[that.id] = that;
        that.message = (options.icon ? '<i class="icon-' + options.icon + ' icon"></i> ' : '') + message;

        that.$ = $(template.format(options)).toggleClass('fade', options.fade).toggleClass('scale', options.scale).attr('id', 'messager-' + that.id);

        if(options.cssClass) that.$.addClass(options.cssClass);

        var hasCloseAction = false;
        var $actions = that.$.find('.messager-actions');
        var appendAction = function(action) {
            var $btn = $('<button type="button" class="action action-' + action.name + '"/>');
            if(action.name === 'close') $btn.addClass('close');
            if(action.html !== undefined) {
                $btn.html(action.html);
            }
            if(action.icon !== undefined) {
                $btn.append('<i class="action-icon icon-' + action.icon + '"/>');
            }
            if(action.text !== undefined) {
                $btn.append('<span class="action-text">' + action.text + '</span>');
            }
            if(action.tooltip !== undefined) {
                $btn.attr('title', action.tooltip).tooltip();
            }
            $btn.data('action', action);
            $actions.append($btn);
        };
        if(options.actions) {
            $.each(options.actions, function(idx, action) {
                if(action.name === undefined) action.name = idx;
                if(action.name == 'close') hasCloseAction = true;
                appendAction(action);
            });
        }
        if(!hasCloseAction && options.close) {
            appendAction({name: 'close', html: '&times;'});
        }

        that.$.on('click', '.action', function(e) {
            var action = $(this).data('action'), result;
            if(options.onAction) {
                result = options.onAction.call(this, action.name, action, that);
                if(result === false) return;
            }
            if($.isFunction(action.action)) {
                result = action.action.call(this, that);
                if(result === false) return;
            }
            that.hide();
            e.stopPropagation();
        });

        that.$.on('click', function(e) {
            if(options.onAction) {
                var result = options.onAction.call(this, 'content', null, that);
                if(result === true) that.hide();
            }
        });

        var $content = that.$.find('.messager-content').html(that.message);
        if(options.contentClass) $content.addClass(options.contentClass);

        that.$.data('zui.messager', that);

        if(options.show && that.message !== undefined) {
            that.show();
        }
    };

    Messager.prototype.update = function(message, newOptions) {
        var that = this;
        var options = that.options;
        that.$.removeClass('messager-' + options.type);
        if(newOptions) {
            options = $.extend(options, newOptions);
        }
        that.$.addClass('messager-' + options.type);
        if(message) {
            that.message = (options.icon ? '<i class="icon-' + options.icon + ' icon"></i> ' : '') + message;
            that.$.find('.messager-content').html(that.message);
        }
    };

    Messager.prototype.show = function(message, callback) {
        var that = this,
            options = this.options;

        if($.isFunction(message)) {
            var oldCallback = callback;
            callback = message;
            if(oldCallback !== undefined) {
                message = oldCallback;
            }
        }

        if(that.isShow) {
            that.hide(function() {
                that.show(message, callback);
            });
            return;
        }

        if(that.hiding) {
            clearTimeout(that.hiding);
            that.hiding = null;
        }

        that.update(message);

        var placement = options.placement;
        var $parent = $(options.parent);
        var $holder = $parent.children('.messagers-holder.' + placement);
        if(!$holder.length) {
            $holder = $('<div/>').attr('class', 'messagers-holder ' + placement).appendTo($parent);
        }
        $holder.append(that.$);
        if(placement === 'center') {
            var offset = $(window).height() - $holder.height();
            $holder.css('top', Math.max(-offset, offset/2));
        }

        that.$.show().addClass('in');

        if(options.time) {
            that.hiding = setTimeout(function() {
                that.hide();
            }, options.time);
        }

        that.isShow = true;
        callback && callback();
        return that;
    };

    Messager.prototype.hide = function(callback, immediately) {
        if(callback === true) {
            immediately = true;
            callback = null;
        }
        var that = this;
        if(that.$.hasClass('in')) {
            that.$.removeClass('in');
            var removeMessager = function() {
                var $parent = that.$.parent();
                that.$.detach();
                if(!$parent.children().length) $parent.remove();
                callback && callback(true);
            };
            if(immediately) removeMessager();
            else setTimeout(removeMessager, 200);
        } else {
            callback && callback(false);
        }

        that.isShow = false;
    };

    Messager.prototype.destroy = function() {
        var that = this;
        that.hide(function()
        {
            that.$.remove();
            that.$ = null;
        }, true);
        delete all[that.id];
    };

    Messager.all = all;

    var hideMessage = function() {
        $('.messager').each(function() {
            var msg = $(this).data('zui.messager');
            if(msg && msg.hide) msg.hide(true);
        });
    };

    var showMessage = function(message, options) {
        if(typeof options === 'string') {
            options = {
                type: options
            };
        }
        options = $.extend({}, options);
        if(options.id === undefined) hideMessage();
        var msg = all[options.id] || new Messager(message, options);
        msg.show();
        return msg;
    };

    var getOptions = function(options) {
        return(typeof options === 'string') ? {
            placement: options
        } : options;
    };

    var zuiMessager = {
        show: showMessage,
        hide: hideMessage
    };

    $.each({
        primary  : 0,
        success  : 'ok-sign',
        info     : 'info-sign',
        warning  : 'warning-sign',
        danger   : 'exclamation-sign',
        important: 0,
        special  : 0
    }, function(name, icon){
        zuiMessager[name] = function(message, options) {
            return showMessage(message, $.extend({
                type: name,
                icon: icon || null
            }, getOptions(options)));
        };
    });

    $.zui({
        Messager: Messager,
        showMessager: showMessage,
        messager: zuiMessager
    });
}(jQuery, window, undefined));


/* ========================================================================
 * ZUI: menu.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var Menu = function(element, options) {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Menu.DEFAULTS = {
        auto: false,
        foldicon: 'icon-chevron-right'
    };

    Menu.prototype.getOptions = function(options) {
        options = $.extend({}, Menu.DEFAULTS, this.$.data(), options);
        return options;
    };

    Menu.prototype.init = function() {
        var $children = this.$.children('.nav');
        $children.find('.nav').closest('li').addClass('nav-parent');
        $children.find('.nav > li.active').parent().closest('li').addClass('active');
        $children.find('.nav-parent > a').append('<i class="' + this.options.foldicon + ' nav-parent-fold-icon"></i>');
        $children.find('.nav-parent.show').find('.nav-parent-fold-icon').addClass('icon-rotate-90');

        this.handleFold();
    };

    Menu.prototype.handleFold = function() {
        var auto = this.options.auto;
        var $menu = this.$;
        this.$.on('click', '.nav-parent > a', function(event) {
            if(auto) {
                $menu.find('.nav-parent.show').find('.nav').slideUp(function() {
                    $(this).closest('.nav-parent').removeClass('show');
                });
                $menu.find('.icon-rotate-90').removeClass('icon-rotate-90');
            }

            var li = $(this).closest('.nav-parent');
            if(li.hasClass('show')) {
                li.find('.icon-rotate-90').removeClass('icon-rotate-90');
                li.find('.nav').slideUp(function() {
                    $(this).closest('.nav-parent').removeClass('show');
                });
            } else {
                li.find('.nav-parent-fold-icon').addClass('icon-rotate-90');
                li.find('.nav').slideDown(function() {
                    $(this).closest('.nav-parent').addClass('show');
                });
            }

            event.preventDefault();
            return false;
        });
    };

    $.fn.menu = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('zui.menu');
            var options = typeof option == 'object' && option;

            if(!data) $this.data('zui.menu', (data = new Menu(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.menu.Constructor = Menu;

    $(function() {
        $('[data-toggle="menu"],[data-ride="menu"]').menu();
    });
}(jQuery));


/* ========================================================================
 * ZUI: color.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, Math, window, undefined) {
    'use strict';

    var hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
        N255 = 255,
        N360 = 360,
        N100 = 100,
        STR_STRING = 'string',
        STR_OBJECT = 'object',
        namedColors = {
            aliceblue: '#f0f8ff',
            antiquewhite: '#faebd7',
            aqua: '#00ffff',
            aquamarine: '#7fffd4',
            azure: '#f0ffff',
            beige: '#f5f5dc',
            bisque: '#ffe4c4',
            black: '#000000',
            blanchedalmond: '#ffebcd',
            blue: '#0000ff',
            blueviolet: '#8a2be2',
            brown: '#a52a2a',
            burlywood: '#deb887',
            cadetblue: '#5f9ea0',
            chartreuse: '#7fff00',
            chocolate: '#d2691e',
            coral: '#ff7f50',
            cornflowerblue: '#6495ed',
            cornsilk: '#fff8dc',
            crimson: '#dc143c',
            cyan: '#00ffff',
            darkblue: '#00008b',
            darkcyan: '#008b8b',
            darkgoldenrod: '#b8860b',
            darkgray: '#a9a9a9',
            darkgreen: '#006400',
            darkkhaki: '#bdb76b',
            darkmagenta: '#8b008b',
            darkolivegreen: '#556b2f',
            darkorange: '#ff8c00',
            darkorchid: '#9932cc',
            darkred: '#8b0000',
            darksalmon: '#e9967a',
            darkseagreen: '#8fbc8f',
            darkslateblue: '#483d8b',
            darkslategray: '#2f4f4f',
            darkturquoise: '#00ced1',
            darkviolet: '#9400d3',
            deeppink: '#ff1493',
            deepskyblue: '#00bfff',
            dimgray: '#696969',
            dodgerblue: '#1e90ff',
            firebrick: '#b22222',
            floralwhite: '#fffaf0',
            forestgreen: '#228b22',
            fuchsia: '#ff00ff',
            gainsboro: '#dcdcdc',
            ghostwhite: '#f8f8ff',
            gold: '#ffd700',
            goldenrod: '#daa520',
            gray: '#808080',
            green: '#008000',
            greenyellow: '#adff2f',
            honeydew: '#f0fff0',
            hotpink: '#ff69b4',
            indianred: '#cd5c5c',
            indigo: '#4b0082',
            ivory: '#fffff0',
            khaki: '#f0e68c',
            lavender: '#e6e6fa',
            lavenderblush: '#fff0f5',
            lawngreen: '#7cfc00',
            lemonchiffon: '#fffacd',
            lightblue: '#add8e6',
            lightcoral: '#f08080',
            lightcyan: '#e0ffff',
            lightgoldenrodyellow: '#fafad2',
            lightgray: '#d3d3d3',
            lightgreen: '#90ee90',
            lightpink: '#ffb6c1',
            lightsalmon: '#ffa07a',
            lightseagreen: '#20b2aa',
            lightskyblue: '#87cefa',
            lightslategray: '#778899',
            lightsteelblue: '#b0c4de',
            lightyellow: '#ffffe0',
            lime: '#00ff00',
            limegreen: '#32cd32',
            linen: '#faf0e6',
            magenta: '#ff00ff',
            maroon: '#800000',
            mediumaquamarine: '#66cdaa',
            mediumblue: '#0000cd',
            mediumorchid: '#ba55d3',
            mediumpurple: '#9370db',
            mediumseagreen: '#3cb371',
            mediumslateblue: '#7b68ee',
            mediumspringgreen: '#00fa9a',
            mediumturquoise: '#48d1cc',
            mediumvioletred: '#c71585',
            midnightblue: '#191970',
            mintcream: '#f5fffa',
            mistyrose: '#ffe4e1',
            moccasin: '#ffe4b5',
            navajowhite: '#ffdead',
            navy: '#000080',
            oldlace: '#fdf5e6',
            olive: '#808000',
            olivedrab: '#6b8e23',
            orange: '#ffa500',
            orangered: '#ff4500',
            orchid: '#da70d6',
            palegoldenrod: '#eee8aa',
            palegreen: '#98fb98',
            paleturquoise: '#afeeee',
            palevioletred: '#db7093',
            papayawhip: '#ffefd5',
            peachpuff: '#ffdab9',
            peru: '#cd853f',
            pink: '#ffc0cb',
            plum: '#dda0dd',
            powderblue: '#b0e0e6',
            purple: '#800080',
            red: '#ff0000',
            rosybrown: '#bc8f8f',
            royalblue: '#4169e1',
            saddlebrown: '#8b4513',
            salmon: '#fa8072',
            sandybrown: '#f4a460',
            seagreen: '#2e8b57',
            seashell: '#fff5ee',
            sienna: '#a0522d',
            silver: '#c0c0c0',
            skyblue: '#87ceeb',
            slateblue: '#6a5acd',
            slategray: '#708090',
            snow: '#fffafa',
            springgreen: '#00ff7f',
            steelblue: '#4682b4',
            tan: '#d2b48c',
            teal: '#008080',
            thistle: '#d8bfd8',
            tomato: '#ff6347',
            turquoise: '#40e0d0',
            violet: '#ee82ee',
            wheat: '#f5deb3',
            white: '#ffffff',
            whitesmoke: '#f5f5f5',
            yellow: '#ffff00',
            yellowgreen: '#9acd32'
        };

    var isUndefined = function(x) {
        return x === undefined;
    };

    var isNotUndefined = function(x) {
        return !isUndefined(x);
    };

    var convertToInt = function(x) {
        return parseInt(x);
    };

    var convertToRgbInt = function(x) {
        return convertToInt(clamp(number(x), N255));
    };

    /* color */
    var Color = function(r, g, b, a) {
        var that = this;
        that.r = that.g = that.b = 0;
        that.a = 1;

        if(isNotUndefined(a)) that.a = clamp(number(a), 1);
        if(isNotUndefined(r) && isNotUndefined(g) && isNotUndefined(b)) {
            that.r = convertToRgbInt(r);
            that.g = convertToRgbInt(g);
            that.b = convertToRgbInt(b);
        } else if(isNotUndefined(r)) {
            var type = typeof(r);
            if(type == STR_STRING) {
                r = r.toLowerCase();
                if(r === 'transparent') {
                    that.a = 0;
                } else if(namedColors[r]) {
                    this.rgb(hexToRgb(namedColors[r]));
                } else {
                    that.rgb(hexToRgb(r));
                }
            } else if(type == 'number' && isUndefined(g)) {
                that.r = that.g = that.b = convertToRgbInt(r);
            } else if(type == STR_OBJECT && isNotUndefined(r.r)) {
                that.r = convertToRgbInt(r.r);
                if(isNotUndefined(r.g)) that.g = convertToRgbInt(r.g);
                if(isNotUndefined(r.b)) that.b = convertToRgbInt(r.b);
                if(isNotUndefined(r.a)) that.a = clamp(number(r.a), 1);
            } else if(type == STR_OBJECT && isNotUndefined(r.h)) {
                var hsl = {
                    h: clamp(number(r.h), N360),
                    s: 1,
                    l: 1,
                    a: 1
                };
                if(isNotUndefined(r.s)) hsl.s = clamp(number(r.s), 1);
                if(isNotUndefined(r.l)) hsl.l = clamp(number(r.l), 1);
                if(isNotUndefined(r.a)) hsl.a = clamp(number(r.a), 1);

                that.rgb(hslToRgb(hsl));
            }
        }
    };

    Color.prototype.rgb = function(rgb) {
        var that = this;
        if(isNotUndefined(rgb)) {
            if(typeof(rgb) == STR_OBJECT) {
                if(isNotUndefined(rgb.r)) that.r = convertToRgbInt(rgb.r);
                if(isNotUndefined(rgb.g)) that.g = convertToRgbInt(rgb.g);
                if(isNotUndefined(rgb.b)) that.b = convertToRgbInt(rgb.b);
                if(isNotUndefined(rgb.a)) that.a = clamp(number(rgb.a), 1);
            } else {
                var v = convertToInt(number(rgb));
                that.r = v;
                that.g = v;
                that.b = v;
            }
            return that;
        } else return {
            r: that.r,
            g: that.g,
            b: that.b,
            a: that.a
        };
    };

    Color.prototype.hue = function(hue) {
        var that = this;
        var hsl = that.toHsl();

        if(isUndefined(hue)) return hsl.h;
        else {
            hsl.h = clamp(number(hue), N360);
            that.rgb(hslToRgb(hsl));
            return that;
        }
    };

    Color.prototype.darken = function(amount) {
        var that = this;
        var hsl = that.toHsl();

        hsl.l -= amount / N100;
        hsl.l = clamp(hsl.l, 1);

        that.rgb(hslToRgb(hsl));
        return that;
    };

    Color.prototype.clone = function() {
        var that = this;
        return new Color(that.r, that.g, that.b, that.a);
    };

    Color.prototype.lighten = function(amount) {
        return this.darken(-amount);
    };

    Color.prototype.fade = function(amount) {
        this.a = clamp(amount / N100, 1);

        return this;
    };

    Color.prototype.spin = function(amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % N360;

        hsl.h = hue < 0 ? N360 + hue : hue;
        return this.rgb(hslToRgb(hsl));
    };

    Color.prototype.toHsl = function() {
        var that = this;
        var r = that.r / N255,
            g = that.g / N255,
            b = that.b / N255,
            a = that.a;

        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2,
            d = max - min;

        if(max === min) {
            h = s = 0;
        } else {
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch(max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: h * N360,
            s: s,
            l: l,
            a: a
        };
    };

    Color.prototype.luma = function() {
        var r = this.r / N255,
            g = this.g / N255,
            b = this.b / N255;

        r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
        g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
        b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    Color.prototype.saturate = function(amount) {
        var hsl = this.toHsl();

        hsl.s += amount / N100;
        hsl.s = clamp(hsl.s);

        return this.rgb(hslToRgb(hsl));
    };

    Color.prototype.desaturate = function(amount) {
        return this.saturate(-amount);
    };

    Color.prototype.contrast = function(dark, light, threshold) {
        if(isUndefined(light)) light = new Color(N255, N255, N255, 1);
        else light = new Color(light);
        if(isUndefined(dark)) dark = new Color(0, 0, 0, 1);
        else dark = new Color(dark);

        if(dark.luma() > light.luma()) {
            var t = light;
            light = dark;
            dark = t;
        }
        
        if(this.a < 0.5) return dark;

        if(isUndefined(threshold)) threshold = 0.43;
        else threshold = number(threshold);

        if(this.luma() < threshold) {
            return light;
        } else {
            return dark;
        }
    };

    Color.prototype.hexStr = function() {
        var r = this.r.toString(16),
            g = this.g.toString(16),
            b = this.b.toString(16);
        if(r.length == 1) r = '0' + r;
        if(g.length == 1) g = '0' + g;
        if(b.length == 1) b = '0' + b;

        return '#' + r + g + b;
    };

    Color.prototype.toCssStr = function() {
        var that = this;
        if(that.a > 0) {
            if(that.a < 1) {
                return 'rgba(' + that.r + ',' + that.g + ',' + that.b + ',' + that.a + ')';
            } else {
                return that.hexStr();
            }
        } else {
            return 'transparent';
        }
    };

    Color.isColor = isColor;
    Color.names = namedColors;

    Color.get = function(colorName) {
        return new Color(colorName);
    };

    /* helpers */
    function hexToRgb(hex) {
        hex = hex.toLowerCase();
        if(hex && hexReg.test(hex)) {
            var i;
            if(hex.length === 4) {
                var hexNew = '#';
                for(i = 1; i < 4; i += 1) {
                    hexNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
                }
                hex = hexNew;
            }

            var hexChange = [];
            for(i = 1; i < 7; i += 2) {
                hexChange.push(convertToInt('0x' + hex.slice(i, i + 2)));
            }
            return {
                r: hexChange[0],
                g: hexChange[1],
                b: hexChange[2],
                a: 1
            };
        } else {
            throw new Error('Wrong hex string! (hex: ' + hex + ')');
        }
    }

    function isColor(hex) {
        return typeof(hex) === STR_STRING && (hex.toLowerCase() === 'transparent' || namedColors[hex.toLowerCase()] || hexReg.test($.trim(hex.toLowerCase())));
    }

    function hslToRgb(hsl) {
        var h = hsl.h,
            s = hsl.s,
            l = hsl.l,
            a = hsl.a;

        h = (number(h) % N360) / N360;
        s = clamp(number(s));
        l = clamp(number(l));
        a = clamp(number(a));

        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        var m1 = l * 2 - m2;

        var r = {
            r: hue(h + 1 / 3) * N255,
            g: hue(h) * N255,
            b: hue(h - 1 / 3) * N255,
            a: a
        };

        return r;

        function hue(h) {
            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
            if(h * 6 < 1) {
                return m1 + (m2 - m1) * h * 6;
            } else if(h * 2 < 1) {
                return m2;
            } else if(h * 3 < 2) {
                return m1 + (m2 - m1) * (2 / 3 - h) * 6;
            } else {
                return m1;
            }
        }
    }

    function fit(n, end, start) {
        if(isUndefined(start)) start = 0;
        if(isUndefined(end)) end = N255;

        return Math.min(Math.max(n, start), end);
    }

    function clamp(v, max) {
        return fit(v, max);
    }

    function number(n) {
        if(typeof(n) == 'number') return n;
        return parseFloat(n);
    }

    $.zui({
        Color: Color
    });

}(jQuery, Math, window, undefined));

/* ========================================================================
 * ZUI: tree.js [1.4.0+]
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var name = 'zui.tree'; // modal name
    var globalId = 0;

    // The tree modal class
    var Tree = function(element, options) {
        this.name = name;
        this.$ = $(element);

        this.getOptions(options);
        this._init();
    };

    var DETAULT_ACTIONS = {
        sort: {
            template: '<a class="sort-handler" href="javascript:;"><i class="icon icon-move"></i></a>'
        },
        add: {
            template: '<a href="javascript:;"><i class="icon icon-plus"></i></a>'
        },
        edit: {
            template: '<a href="javascript:;"><i class="icon icon-pencil"></i></a>'
        },
        "delete": {
            template: '<a href="javascript:;"><i class="icon icon-trash"></i></a>'
        }
    };

    function formatActions(actions, parentActions) {
        if(actions === false) return actions;
        if(!actions) return parentActions;

        if(actions === true) {
            actions = {add: true, "delete": true, edit: true, sort: true};
        } else if(typeof actions === 'string') {
            actions = actions.split(',');
        }
        var _actions;
        if($.isArray(actions)) {
            _actions = {};
            $.each(actions, function(idx, action) {
                if($.isPlainObject(action)) {
                    _actions[action.action] = action;
                } else {
                    _actions[action] = true;
                }
            });
            actions = _actions;
        }
        if($.isPlainObject(actions)) {
            _actions = {};
            $.each(actions, function(name, action) {
                if(action) {
                    _actions[name] = $.extend({type: name}, DETAULT_ACTIONS[name], $.isPlainObject(action) ? action : null);
                } else {
                    _actions[name] = false;
                }
            });
            actions = _actions;
        }
        return parentActions ? $.extend(true, {}, parentActions, actions) : actions;
    }

    function createActionEle(action, name, template) {
        name = name || action.type;
        return $(template || action.template).addClass('tree-action').attr($.extend({'data-type': name, title: action.title || ''}, action.attr)).data('action', action);
    }

    // default options
    Tree.DEFAULTS = {
        animate: null,
        initialState: 'normal', // 'normal' | 'preserve' | 'expand' | 'collapse',
        toggleTemplate: '<i class="list-toggle icon"></i>',
        // sortable: false, //
    };

    Tree.prototype.add = function(rootEle, items, expand, disabledAnimate, notStore) {
        var $e = $(rootEle), $ul, options = this.options;
        if($e.is('li')) {
            $ul = $e.children('ul');
            if(!$ul.length) {
                $ul = $('<ul/>');
                $e.append($ul);
                this._initList($ul, $e);
            }
        } else {
            $ul = $e;
        }

        if($ul) {
            var that = this;
            if(!$.isArray(items)) {
                items = [items];
            }
            $.each(items, function(idx, item) {
                var $li = $('<li/>').data(item).appendTo($ul);
                if(item.id !== undefined) $li.attr('data-id', item.id);
                var $wrapper = options.itemWrapper ? $(options.itemWrapper === true ? '<div class="tree-item-wrapper"/>' : options.itemWrapper).appendTo($li) : $li;
                if(item.html) {
                    $wrapper.html(item.html)
                } else if($.isFunction(that.options.itemCreator)) {
                    var itemContent = that.options.itemCreator($li, item);
                    if(itemContent !== true && itemContent !== false) $wrapper.html(itemContent);
                } else if(item.url) {
                    $wrapper.append($('<a/>', {href: item.url}).text(item.title || item.name));
                } else {
                    $wrapper.append($('<span/>').text(item.title || item.name));
                }
                that._initItem($li, item.idx || idx, $ul, item);
                if(item.children && item.children.length) {
                    that.add($li, item.children);
                }
            });
            this._initList($ul);
            if(expand && !$ul.hasClass('tree')) {
                that.expand($ul.parent('li'), disabledAnimate, notStore);
            }
        }
    };

    Tree.prototype.reload = function(data) {
        var that = this;

        if(data) {
            that.$.empty();
            that.add(that.$, data);
        }

        if(that.isPreserve)
        {
            if(that.store.time) {
                that.$.find('li:not(.tree-action-item)').each(function() {
                    var $li= $(this);
                    that[that.store[$li.data('id')] ? 'expand' : 'collapse']($li, true, true);
                });
            }
        }
    };

    Tree.prototype._initList = function($list, $parentItem, idx, data) {
        var that = this;
        if(!$list.hasClass('tree')) {
            $parentItem = ($parentItem || $list.closest('li')).addClass('has-list');
            if(!$parentItem.find('.list-toggle').length) {
                $parentItem.prepend(this.options.toggleTemplate);
            }
            idx = idx || $parentItem.data('idx');
        } else {
            idx = 0;
            $parentItem = null;
        }
        var $children = $list.attr('data-idx', idx || 0).children('li:not(.tree-action-item)').each(function(index) {
            that._initItem($(this), index + 1, $list);
        });
        if($children.length === 1 && !$children.find('ul').length)
        {
            $children.addClass('tree-single-item');
        }
        data = data || ($parentItem ? $parentItem.data() : null);
        var actions = formatActions(data ? data.actions : null, this.actions);
        if(actions) {
            if(actions.add && actions.add.templateInList !== false) {
                var $actionItem = $list.children('li.tree-action-item');
                if(!$actionItem.length) {
                    $('<li class="tree-action-item"/>').append(createActionEle(actions.add, 'add', actions.add.templateInList)).appendTo($list);
                } else {
                    $actionItem.detach().appendTo($list);
                }
            }
            if(actions.sort) {
                $list.sortable($.extend({
                    dragCssClass: 'tree-drag-holder', 
                    trigger: '.sort-handler', 
                    selector: 'li:not(.tree-action-item)',
                    finish: function(e) {
                        that.callEvent('action', {action: actions.sort, $list: $list, target: e.target, item: data});
                    }
                }, actions.sort.options, $.isPlainObject(this.options.sortable) ? this.options.sortable : null));
            }
        }
        if($parentItem && ($parentItem.hasClass('open') || (data && data.open))) {
            $parentItem.addClass('open in');
        }
    };

    Tree.prototype._initItem = function($item, idx, $parentList, data) {
        if(idx === undefined) {
            var $pre = $item.prev('li');
            idx = $pre.length ? ($pre.data('idx') + 1) : 1;
        }
        $parentList = $parentList || $item.closest('ul');
        $item.attr('data-idx', idx).removeClass('tree-single-item');
        if(!$item.data('id')) {
            var id = idx;
            if(!$parentList.hasClass('tree')) {
                id = $parentList.parent('li').data('id') + '-' + id;
            }
            $item.attr('data-id', id);
        }
        data = data || $item.data();
        var actions = formatActions(data.actions, this.actions);
        if(actions) {
            var $actions = $item.find('.tree-actions');
            if(!$actions.length) {
                $actions = $('<div class="tree-actions"/>').appendTo(this.options.itemWrapper ? $item.find('.tree-item-wrapper') : $item);
                $.each(actions, function(actionName, action) {
                    if(action) $actions.append(createActionEle(action, actionName));
                });
            }
        }

        var $children = $item.children('ul');
        if($children.length) {
            this._initList($children, $item, idx, data);
        }
    };

    Tree.prototype._init = function() {
        var options = this.options, that = this;
        this.actions = formatActions(options.actions);

        this.$.addClass('tree');
        if(options.animate) this.$.addClass('tree-animate');

        this._initList(this.$);

        var initialState = options.initialState;
        var isPreserveEnable = $.zui && $.zui.store && $.zui.store.enable;
        if(isPreserveEnable) {
            this.selector = name + '::' + (options.name || '') + '#' + (this.$.attr('id') || globalId++);
            this.store = $.zui.store[options.name ? 'get' : 'pageGet'](this.selector, {});
        }
        if(initialState === 'preserve') {
            if(isPreserveEnable) this.isPreserve = true;
            else this.options.initialState = initialState = 'normal';
        }

        // init data
        this.reload(options.data);
        if(isPreserveEnable) this.isPreserve = true;

        if(initialState === 'expand') {
            this.expand();
        } else if(initialState === 'collapse') {
            this.collapse();
        }

        // Bind event
        this.$.on('click', '.list-toggle,a[href="#"],.tree-toggle', function(e) {
            var $this = $(this);
            var $li = $this.parent('li');
            that.callEvent('hit', {target: $li, item: $li.data()});
            that.toggle($li);
            if($this.is('a')) e.preventDefault();
        }).on('click', '.tree-action', function() {
            var $action = $(this);
            var action = $action.data();
            if(action.action) action = action.action;
            if(action.type === 'sort') return;
            var $li = $action.closest('li:not(.tree-action-item)');
            that.callEvent('action', {action: action, target: this, $item: $li, item: $li.data()});
        });
    };

    Tree.prototype.preserve = function($li, id, expand) {
        if(!this.isPreserve) return;
        if($li) {
            id = id || $li.data('id');
            expand = expand === undefined ? $li.hasClass('open') : false;
            if(expand) this.store[id] = expand;
            else delete this.store[id];
            this.store.time = new Date().getTime();
            $.zui.store[this.options.name ? 'set' : 'pageSet'](this.selector, this.store);
        } else {
            var that = this;
            this.store = {};
            this.$.find('li').each(function() {
                that.preserve($(this));
            });
        }
    };

    Tree.prototype.expand = function($li, disabledAnimate, notStore) {
        if($li) {
            $li.addClass('open');
            if(!disabledAnimate && this.options.animate) {
                setTimeout(function() {
                    $li.addClass('in');
                }, 10);
            } else {
                $li.addClass('in');
            }
        } else {
            $li = this.$.find('li.has-list').addClass('open in');
        }
        if(!notStore) this.preserve($li);
        this.callEvent('expand', $li, this);
    };

    Tree.prototype.show = function($lis, disabledAnimate, notStore) {
        var that = this;
        $lis.each(function() {
            var $li = $(this);
            that.expand($li, disabledAnimate, notStore);
            if($li) {
                var $ul = $li.parent('ul');
                while($ul && $ul.length && !$ul.hasClass('tree')) {
                    var $parentLi = $ul.parent('li');
                    if($parentLi.length) {
                        that.expand($parentLi, disabledAnimate, notStore);
                        $ul = $parentLi.parent('ul');
                    } else {
                        $ul = false;
                    }
                }
            }
        });
    };

    Tree.prototype.collapse = function($li, disabledAnimate, notStore) {
        if($li) {
            if(!disabledAnimate && this.options.animate) {
                $li.removeClass('in');
                setTimeout(function() {
                    $li.removeClass('open');
                }, 300);
            } else {
                $li.removeClass('open in');
            }
        } else {
            $li = this.$.find('li.has-list').removeClass('open in');
        }
        if(!notStore) this.preserve($li);
        this.callEvent('collapse', $li, this);
    };

    Tree.prototype.toggle = function($li) {
        var collapse = ($li && $li.hasClass('open')) || $li === false || ($li === undefined && this.$.find('li.has-list.open').length);
        this[collapse ? 'collapse' : 'expand']($li);
    };

    // Get and init options
    Tree.prototype.getOptions = function(options) {
        this.options = $.extend({}, Tree.DEFAULTS, this.$.data(), options);
        if(this.options.animate === null && this.$.hasClass('tree-animate')) {
            this.options.animate = true;
        }
    };

    Tree.prototype.toData = function($ul, filter) {
        if($.isFunction($ul)) {
            filter = $ul;
            $ul = null;
        }
        $ul = $ul || this.$;
        var that = this;
        return $ul.children('li:not(.tree-action-item)').map(function() {
            var $li = $(this);
            var data = $li.data();
            delete data['zui.droppable'];
            var $children = $li.children('ul');
            if($children.length) data.children = that.toData($children);
            return $.isFunction(filter) ? filter(data, $li) : data;
        }).get();
    };

    // Call event helper
    Tree.prototype.callEvent = function(name, params) {
        var result;
        if($.isFunction(this.options[name])) {
            result = this.options[name](params, this);
        }
        this.$.trigger($.Event(name + '.' + this.name, params));
        return result;
    };

    // Extense jquery element
    $.fn.tree = function(option, params) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(name);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(name, (data = new Tree(this, options)));

            if(typeof option == 'string') data[option](params);
        });
    };

    $.fn.tree.Constructor = Tree;

    // Auto call tree after document load complete
    $(function() {
        $('[data-ride="tree"]').tree();
    });
}(jQuery));

