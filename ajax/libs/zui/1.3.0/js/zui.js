/*!
 * ZUI - v1.3.0 - 2015-05-15
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2015 cnezsoft.com; Licensed MIT
 */

/* Some code copy from Bootstrap v3.0.0 by @fat and @mdo. (Copyright 2013 Twitter, Inc. Licensed under http://www.apache.org/licenses/)*/

/* ========================================================================
 * ZUI: jquery.extensions.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window){
    'use strict';

    /* Check jquery */
    if (typeof($) === 'undefined') throw new Error('ZUI requires jQuery');

    // ZUI shared object
    if (!$.zui) $.zui = function(obj)
    {
        if ($.isPlainObject(obj))
        {
            $.extend($.zui, obj);
        }
    };

    var lastUuidAmend = 0;
    $.zui(
    {
        uuid: function()
        {
            return (new Date()).getTime() * 1000 + (lastUuidAmend++) % 1000;
        },

        callEvent: function(func, event, proxy)
        {
            if ($.isFunction(func))
            {
                if (typeof proxy != 'undefined')
                {
                    func = $.proxy(func, proxy);
                }
                var result = func(event);
                if (event) event.result = result;
                return !(result !== undefined && (!result));
            }
            return 1;
        },

        clientLang: function()
        {
            var lang;
            var config = window.config;
            if (typeof(config) != 'undefined' && config.clientLang)
            {
                lang = config.clientLang;
            }
            else
            {
                var hl = $('html').attr('lang');
                lang = hl ? hl : (navigator.userLanguage || navigator.userLanguage || 'zh_cn');
            }
            return lang.replace('-', '_').toLowerCase();
        }
    });

    $.fn.callEvent = function(name, event, model)
    {
        var $this = $(this);
        var dotIndex = name.indexOf('.zui.');
        var shortName = name;
        if (dotIndex < 0 && model && model.name)
        {
            name += '.' + model.name;
        }
        else
        {
            shortName = name.substring(0, dotIndex);
        }
        var e = $.Event(name, event);

        if ((typeof model === 'undefined') && dotIndex > 0)
        {
            model = $this.data(name.substring(dotIndex + 1));
        }

        if (model && model.options)
        {
            var func = model.options[shortName];
            if ($.isFunction(func))
            {
                $.zui.callEvent(model.options[shortName], e, model);
            }
        }
        return e;
    };
}(jQuery, window));

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
 * ======================================================================== */


+ function($){
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var zuiname = 'zui.alert';

    var Alert = function(el)
    {
        $(el).on('click', dismiss, this.close)
    }

    Alert.prototype.close = function(e)
    {
        var $this = $(this)
        var selector = $this.attr('data-target')

        if (!selector)
        {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if (e) e.preventDefault()

        if (!$parent.length)
        {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }

        $parent.trigger(e = $.Event('close.' + zuiname))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement()
        {
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

    $.fn.alert = function(option)
    {
        return this.each(function()
        {
            var $this = $(this)
            var data = $this.data(zuiname)

            if (!data) $this.data(zuiname, (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function()
    {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.' + zuiname + '.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
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


+function ($) { 'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var zuiname = 'zui.tab'
  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.' + zuiname, {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.' + zuiname
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
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

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data(zuiname)

      if (!data) $this.data(zuiname, (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.zui.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+ function($){
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd()
    {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames)
        {
            if (el.style[name] !== undefined)
            {
                return {
                    end: transEndEventNames[name]
                }
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration)
    {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function()
        {
            called = true
        })
        var callback = function()
        {
            if (!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function()
    {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e)
            {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
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


+ function($){
    'use strict';

    var zuiname = 'zui.collapse'

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function(element, options)
    {
        this.$element = $(element)
        this.options = $.extend(
        {}, Collapse.DEFAULTS, options)
        this.transitioning = null

        if (this.options.parent) this.$parent = $(this.options.parent)
        if (this.options.toggle) this.toggle()
    }

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function()
    {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function()
    {
        if (this.transitioning || this.$element.hasClass('in')) return

        var startEvent = $.Event('show.' + zuiname)
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var actives = this.$parent && this.$parent.find('> .panel > .in')

        if (actives && actives.length)
        {
            var hasData = actives.data(zuiname)
            if (hasData && hasData.transitioning) return
            actives.collapse('hide')
            hasData || actives.data(zuiname, null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)

        this.transitioning = 1

        var complete = function()
        {
            this.$element
                .removeClass('collapsing')
                .addClass('in')[dimension]('auto')
            this.transitioning = 0
            this.$element.trigger('shown.' + zuiname)
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one($.support.transition.end, $.proxy(complete, this))
            .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function()
    {
        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.' + zuiname)
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse')
            .removeClass('in')

        this.transitioning = 1

        var complete = function()
        {
            this.transitioning = 0
            this.$element
                .trigger('hidden.' + zuiname)
                .removeClass('collapsing')
                .addClass('collapse')
        }

        if (!$.support.transition) return complete.call(this)

        this.$element[dimension](0)
            .one($.support.transition.end, $.proxy(complete, this))
            .emulateTransitionEnd(350)
    }

    Collapse.prototype.toggle = function()
    {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    var old = $.fn.collapse

    $.fn.collapse = function(option)
    {
        return this.each(function()
        {
            var $this = $(this)
            var data = $this.data(zuiname)
            var options = $.extend(
            {}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data(zuiname, (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function()
    {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.' + zuiname + '.data-api', '[data-toggle=collapse]', function(e)
    {
        var $this = $(this),
            href
        var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        var $target = $(target)
        var data = $target.data(zuiname)
        var option = data ? 'toggle' : $this.data()
        var parent = $this.attr('data-parent')
        var $parent = parent && $(parent)

        if (!data || !data.transitioning)
        {
            if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
            $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
        }

        $target.collapse(option)
    })

}(window.jQuery);

/* ========================================================================
 * ZUI: device.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function(window, $)
{
    'use strict';
    var desktopLg = 1200,
        desktop = 992,
        tablet = 768,
        cssNames = {
            desktop: 'screen-desktop',
            desktopLg: 'screen-desktop-wide',
            tablet: 'screen-tablet',
            phone: 'screen-phone',
            isMobile: 'device-mobile',
            isDesktop: 'device-desktop'
        };

    var $window = $(window);

    var resetCssClass = function()
    {
        var width = $window.width();
        $('html').toggleClass(cssNames.desktop, width >= desktop && width < desktopLg)
            .toggleClass(cssNames.desktopLg, width >= desktopLg)
            .toggleClass(cssNames.tablet, width >= tablet && width < desktop)
            .toggleClass(cssNames.phone, width < tablet)
            .toggleClass(cssNames.isMobile, width < desktop)
            .toggleClass(cssNames.isDesktop, width >= desktop);
    };

    $window.resize(resetCssClass);
    resetCssClass();
}(window, jQuery));

/* ========================================================================
 * ZUI: browser.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($)
{
    'use strict';

    var browseHappyTip = {
        'zh_cn': '您的浏览器版本过低，无法体验所有功能，建议升级或者更换浏览器。 <a href="http://browsehappy.com/" target="_blank" class="alert-link">了解更多...</a>',
        'zh_tw': '您的瀏覽器版本過低，無法體驗所有功能，建議升級或者更换瀏覽器。<a href="http://browsehappy.com/" target="_blank" class="alert-link">了解更多...</a>',
        'en': 'Your browser is too old, it has been unable to experience the colorful internet. We strongly recommend that you upgrade a better one. <a href="http://browsehappy.com/" target="_blank" class="alert-link">Learn more...</a>'
    };

    // The browser modal class
    var Browser = function()
    {
        var isIE = this.isIE;
        var ie = isIE();
        if (ie)
        {
            for (var i = 10; i > 5; i--)
            {
                if (isIE(i))
                {
                    ie = i;
                    break;
                }
            }
        }

        this.ie = ie;

        this.cssHelper();
    };

    // Append CSS class to html tag
    Browser.prototype.cssHelper = function()
    {
        var ie = this.ie,
            $html = $('html');
        $html.toggleClass('ie', ie)
            .removeClass('ie-6 ie-7 ie-8 ie-9 ie-10');
        if (ie)
        {
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
    Browser.prototype.tip = function()
    {
        if (this.ie && this.ie < 8)
        {
            var $browseHappy = $('#browseHappyTip');
            if (!$browseHappy.length)
            {
                $browseHappy = $('<div id="browseHappyTip" class="alert alert-dismissable alert-danger alert-block" style="position: relative; z-index: 99999"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><div class="container"><div class="content text-center"></div></div></div>');
                $browseHappy.prependTo('body');
            }

            $browseHappy.find('.content').html(this.browseHappyTip || browseHappyTip[$.zui.clientLang() || 'zh_cn']);
        }
    };

    // Detect it is IE, can given a version
    Browser.prototype.isIE = function(version)
    {
        // var ie = /*@cc_on !@*/false;
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE ' + (version || '') + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    };

    // Detect ie 10 with hack
    Browser.prototype.isIE10 = function()
    {
        return ( /*@cc_on!@*/ false);
    };

    $.zui({browser: new Browser()});

    $(function()
    {
        if (!$('body').hasClass('disabled-browser-tip'))
        {
            $.zui.browser.tip();
        }
    });
}(jQuery));

/* ========================================================================
 * ZUI: date.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function()
{
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
    if(!Date.prototype.format)
    {
        Date.prototype.format = function(format)
        {
            var date = {
                'M+': this.getMonth() + 1,
                'd+': this.getDate(),
                'h+': this.getHours(),
                'm+': this.getMinutes(),
                's+': this.getSeconds(),
                'q+': Math.floor((this.getMonth() + 3) / 3),
                'S+': this.getMilliseconds()
            };
            if (/(y+)/i.test(format))
            {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date)
            {
                if (new RegExp('(' + k + ')').test(format))
                {
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
    if(!Date.prototype.addMilliseconds)
    {
        Date.prototype.addMilliseconds = function(value)
        {
            this.setTime(this.getTime() + value);
            return this;
        };
    }


    /**
     * Add days to the date
     * @param {number} days
     */
    if(!Date.prototype.addDays)
    {
        Date.prototype.addDays = function(days)
        {
            this.addMilliseconds(days * Date.ONEDAY_TICKS);
            return this;
        };
    }


    /**
     * Clone a new date instane from the date
     * @return {Date}
     */
    if(!Date.prototype.clone)
    {
        Date.prototype.clone = function()
        {
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
    if(!Date.isLeapYear)
    {
        Date.isLeapYear = function(year)
        {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        };
    }

    if(!Date.getDaysInMonth)
    {
        /**
         * Get days number of the date
         * @param  {integer} year
         * @param  {integer} month
         * @return {integer}
         */
        Date.getDaysInMonth = function(year, month)
        {
            return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        };
    }


    /**
     * Judge the date is in a leap year
     * @return {Boolean}
     */
    if(!Date.prototype.isLeapYear)
    {
        Date.prototype.isLeapYear = function()
        {
            return Date.isLeapYear(this.getFullYear());
        };
    }


    /**
     * Clear time part of the date
     * @return {date}
     */
    if(!Date.prototype.clearTime)
    {
        Date.prototype.clearTime = function()
        {
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
    if(!Date.prototype.getDaysInMonth)
    {
        Date.prototype.getDaysInMonth = function()
        {
            return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
        };
    }


    /**
     * Add months to the date
     * @param {date} value
     */
    if(!Date.prototype.addMonths)
    {
        Date.prototype.addMonths = function(value)
        {
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
    if(!Date.prototype.getLastWeekday)
    {
        Date.prototype.getLastWeekday = function(day)
        {
            day = day || 1;

            var d = this.clone();
            while (d.getDay() != day)
            {
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
    if(!Date.prototype.isSameDay)
    {
        Date.prototype.isSameDay = function(date)
        {
            return date.toDateString() === this.toDateString();
        };
    }


    /**
     * Judge the date is in same week as another date
     * @param  {date}  date
     * @return {Boolean}
     */
    if(!Date.prototype.isSameWeek)
    {
        Date.prototype.isSameWeek = function(date)
        {
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
    if(!Date.prototype.isSameYear)
    {
        Date.prototype.isSameYear = function(date)
        {
            return this.getFullYear() === date.getFullYear();
        };
    }
}());

/* ========================================================================
 * ZUI: string.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function()
{
    'use strict';

    if (!String.prototype.format)
    {
        String.prototype.format = function(args)
        {
            var result = this;
            if (arguments.length > 0)
            {
                var reg;
                if (arguments.length == 1 && typeof(args) == "object")
                {
                    for (var key in args)
                    {
                        if (args[key] !== undefined)
                        {
                            reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else
                {
                    for (var i = 0; i < arguments.length; i++)
                    {
                        if (arguments[i] !== undefined)
                        {
                            reg = new RegExp("({[" + i + "]})", "g");
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
    if (!String.prototype.isNum)
    {
        String.prototype.isNum = function(s)
        {
            if (s !== null)
            {
                var r, re;
                re = /\d*/i;
                r = s.match(re);
                return (r == s) ? true : false;
            }
            return false;
        };
    }

})();

/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
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

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.

  // A jQuery object containing all non-window elements to which the resize
  // event is bound.
  var elems = $([]),

    // Extend $.resize if it already exists, otherwise create it.
    jq_resize = $.resize = $.extend( $.resize, {} ),

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

  jq_resize[ str_delay ] = 250;

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

  jq_resize[ str_throttle ] = true;

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

  $.event.special[ str_resize ] = {

    // Called only when the first 'resize' event callback is bound per element.
    setup: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will bind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

      var elem = $(this);

      // Add this element to the list of internal elements to monitor.
      elems = elems.add( elem );

      // Initialize data store on the element.
      $.data( this, str_data, { w: elem.width(), h: elem.height() } );

      // If this is the first element added, start the polling loop.
      if ( elems.length === 1 ) {
        loopy();
      }
    },

    // Called only when the last 'resize' event callback is unbound per element.
    teardown: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will unbind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

      var elem = $(this);

      // Remove this element from the list of internal elements to monitor.
      elems = elems.not( elem );

      // Remove any data stored on the element.
      elem.removeData( str_data );

      // If this is the last element removed, stop the polling loop.
      if ( !elems.length ) {
        clearTimeout( timeout_id );
      }
    },

    // Called every time a 'resize' event callback is bound per element (new in
    // jQuery 1.4).
    add: function( handleObj ) {
      // Since window has its own native 'resize' event, return false so that
      // jQuery doesn't modify the event object. Unless, of course, we're
      // throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

      var old_handler;

      // The new_handler function is executed every time the event is triggered.
      // This is used to update the internal element data store with the width
      // and height when the event is triggered manually, to avoid double-firing
      // of the event callback. See the "Double firing issue in jQuery 1.3.2"
      // comments above for more information.

      function new_handler( e, w, h ) {
        var elem = $(this),
          data = $.data( this, str_data ) || {};

        // If called from the polling loop, w and h will be passed in as
        // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
        // those values will need to be computed.
        data.w = w !== undefined ? w : elem.width();
        data.h = h !== undefined ? h : elem.height();

        old_handler.apply( this, arguments );
      };

      // This may seem a little complicated, but it normalizes the special event
      // .add method between jQuery 1.4/1.4.1 and 1.4.2+
      if ( $.isFunction( handleObj ) ) {
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
    timeout_id = window[ str_setTimeout ](function(){

      // Iterate over all elements to which the 'resize' event is bound.
      elems.each(function(){
        var elem = $(this),
          width = elem.width(),
          height = elem.height(),
          data = $.data( this, str_data );

        // If element size has changed since the last time, update the element
        // data store and trigger the 'resize' event.
        if ( width !== data.w || height !== data.h ) {
          elem.trigger( str_resize, [ data.w = width, data.h = height ] );
        }

      });

      // Loop.
      loopy();

    }, jq_resize[ str_delay ] );

  };

})(jQuery,this);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.3
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  var zuiname = 'zui.scrollspy'
  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll. ' + zuiname + ' .data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    if(!this.selector) this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
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

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.' + zuiname)
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data(zuiname)
      var options = typeof option == 'object' && option

      if (!data) $this.data(zuiname, (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * ZUI: storeb.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function(window, $)
{
    'use strict';

    var lsName = 'localStorage';
    var storage = window[lsName],
        old = window.store,
        pageName = 'page_' + window.location.pathname + window.location.search;

    /* The Store object */
    var Store = function()
    {
        this.slience = true;
        this.enable = (lsName in window) && window[lsName] && window[lsName].setItem;
        this.storage = storage;

        this.page = this.get(pageName,
        {});
    };

    /* Save page data */
    Store.prototype.pageSave = function()
    {
        if ($.isEmptyObject(this.page))
        {
            this.remove(pageName);
        }
        else
        {
            var forDeletes = [],
                i;
            for (i in this.page)
            {
                var val = this.page[i];
                if (val === null)
                    forDeletes.push(i);
            }
            for (i = forDeletes.length - 1; i >= 0; i--)
            {
                delete this.page[forDeletes[i]];
            }
            this.set(pageName, this.page);
        }
    };

    /* Remove page data item */
    Store.prototype.pageRemove = function(key)
    {
        if (typeof this.page[key] != 'undefined')
        {
            this.page[key] = null;
            this.pageSave();
        }
    };

    /* Clear page data */
    Store.prototype.pageClear = function()
    {
        this.page = {};
        this.pageSave();
    };

    /* Get page data */
    Store.prototype.pageGet = function(key, defaultValue)
    {
        var val = this.page[key];
        return (defaultValue !== undefined && (val === null || val === undefined)) ? defaultValue : val;
    };

    /* Set page data */
    Store.prototype.pageSet = function(objOrKey, val)
    {
        if ($.isPlainObject(objOrKey))
        {
            $.extend(true, this.page, objOrKey);
        }
        else
        {
            this.page[this.serialize(objOrKey)] = val;
        }
        this.pageSave();
    };

    /* Check enable status */
    Store.prototype.check = function()
    {
        if (!this.enable)
        {
            if (!this.slience) throw new Error('Browser not support localStorage or enable status been set true.');
        }
        return this.enable;
    };

    /* Get length */
    Store.prototype.length = function()
    {
        if (this.check())
        {
            return storage.getLength ? storage.getLength() : storage.length;
        }
        return 0;
    };

    /* Remove item with browser localstorage native method */
    Store.prototype.removeItem = function(key)
    {
        storage.removeItem(key);
        return this;
    };

    /* Remove item with browser localstorage native method, same as removeItem */
    Store.prototype.remove = function(key)
    {
        return this.removeItem(key);
    };

    /* Get item value with browser localstorage native method, and without deserialize */
    Store.prototype.getItem = function(key)
    {
        return storage.getItem(key);
    };

    /* Get item value and deserialize it, if value is null and defaultValue been given then return defaultValue */
    Store.prototype.get = function(key, defaultValue)
    {
        var val = this.deserialize(this.getItem(key));
        if (typeof val === 'undefined' || val === null)
        {
            if (typeof defaultValue !== 'undefined')
            {
                return defaultValue;
            }
        }
        return val;
    };

    /* Get item key by index and deserialize it */
    Store.prototype.key = function(index)
    {
        return storage.key(index);
    };

    /* Set item value with browser localstorage native method, and without serialize filter */
    Store.prototype.setItem = function(key, val)
    {
        storage.setItem(key, val);
        return this;
    };

    /* Set item value, serialize it if the given value is not an string */
    Store.prototype.set = function(key, val)
    {
        if (val === undefined) return this.remove(key);
        this.setItem(key, this.serialize(val));
        return this;
    };

    /* Clear all items with browser localstorage native method */
    Store.prototype.clear = function()
    {
        storage.clear();
        return this;
    };

    /* Iterate all items with callback */
    Store.prototype.forEach = function(callback)
    {
        for (var i = storage.length - 1; i >= 0; i--)
        {
            var key = storage.key(i);
            callback(key, this.get(key));
        }
        return this;
    };

    /* Get all items and set value in an object. */
    Store.prototype.getAll = function()
    {
        var all = {};
        this.forEach(function(key, val)
        {
            all[key] = val;
        });

        return all;
    };

    /* Serialize value with JSON.stringify */
    Store.prototype.serialize = function(value)
    {
        if (typeof value === 'string') return value;
        return JSON.stringify(value);
    };

    /* Deserialize value, with JSON.parse if the given value is not a string */
    Store.prototype.deserialize = function(value)
    {
        if (typeof value !== 'string') return undefined;
        try
        {
            return JSON.parse(value);
        }
        catch (e)
        {
            return value || undefined;
        }
    };

    $.zui(
    {
        store: new Store()
    });
}(window, jQuery));

/* ========================================================================
 * ZUI: draggable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($)
{
    'use strict';

    var Draggable = function(element, options)
    {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Draggable.DEFAULTS = {
        container: 'body',
        move: true
    };

    Draggable.prototype.getOptions = function(options)
    {
        options = $.extend(
        {}, Draggable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Draggable.prototype.init = function()
    {
        this.handleMouseEvents();
    };

    Draggable.prototype.handleMouseEvents = function()
    {
        var $e = this.$,
            BEFORE = 'before',
            DRAG = 'drag',
            FINISH = 'finish',
            setting = this.options,
            startPos, cPos, startOffset, mousePos, moved;

        var mouseDown = function(event)
        {
            if (setting.hasOwnProperty(BEFORE) && $.isFunction(setting[BEFORE]))
            {
                var isSure = setting[BEFORE](
                {
                    event: event,
                    element: $e
                });
                if (isSure !== undefined && (!isSure)) return;
            }

            var $container = $(setting.container),
                pos = $e.offset();
            cPos = $container.offset();
            startPos = {
                x: event.pageX,
                y: event.pageY
            };
            startOffset = {
                x: event.pageX - pos.left + cPos.left,
                y: event.pageY - pos.top + cPos.top
            };
            mousePos = $.extend(
            {}, startPos);
            moved = false;

            $e.addClass('drag-ready');
            $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
            event.preventDefault();
            if (setting.stopPropagation)
            {
                event.stopPropagation();
            }
        };

        var mouseMove = function(event)
        {
            moved = true;
            var mX = event.pageX,
                mY = event.pageY;
            var dragPos = {
                left: mX - startOffset.x,
                top: mY - startOffset.y
            };

            $e.removeClass('drag-ready').addClass('dragging');
            if (setting.move)
            {
                $e.css(dragPos);
            }

            if (setting.hasOwnProperty(DRAG) && $.isFunction(setting[DRAG]))
            {
                setting[DRAG](
                {
                    event: event,
                    element: $e,
                    startOffset: startOffset,
                    pos: dragPos,
                    offset:
                    {
                        x: mX - startPos.x,
                        y: mY - startPos.y
                    },
                    smallOffset:
                    {
                        x: mX - mousePos.x,
                        y: mY - mousePos.y
                    }
                });
            }
            mousePos.x = mX;
            mousePos.y = mY;

            if (setting.stopPropagation)
            {
                event.stopPropagation();
            }
        };

        var mouseUp = function(event)
        {
            $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
            if (!moved)
            {
                $e.removeClass('drag-ready');
                return;
            }
            var endPos = {
                left: event.pageX - startOffset.x,
                top: event.pageY - startOffset.y
            };
            $e.removeClass('drag-ready').removeClass('dragging');
            if (setting.move)
            {
                $e.css(endPos);
            }

            if (setting.hasOwnProperty(FINISH) && $.isFunction(setting[FINISH]))
            {
                setting[FINISH](
                {
                    event: event,
                    element: $e,
                    pos: endPos,
                    offset:
                    {
                        x: event.pageX - startPos.x,
                        y: event.pageY - startPos.y
                    },
                    smallOffset:
                    {
                        x: event.pageX - mousePos.x,
                        y: event.pageY - mousePos.y
                    }
                });
            }
            event.preventDefault();
            if (setting.stopPropagation)
            {
                event.stopPropagation();
            }
        };

        if (setting.handle)
        {
            $e.on('mousedown', setting.handle, mouseDown);
        }
        else
        {
            $e.on('mousedown', mouseDown);
        }
    };

    $.fn.draggable = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data('zui.draggable');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.draggable', (data = new Draggable(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.draggable.Constructor = Draggable;
}(jQuery));

/* ========================================================================
 * ZUI: droppable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, document, Math)
{
    'use strict';

    var Droppable = function(element, options)
    {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Droppable.DEFAULTS = {
        container: 'body',
        // flex: false,
        // nested: false,
        deviation: 5,
        sensorOffsetX: 0,
        sensorOffsetY: 0
    };

    Droppable.prototype.getOptions = function(options)
    {
        options = $.extend(
        {}, Droppable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Droppable.prototype.callEvent = function(name, params)
    {
        return $.zui.callEvent(this.options[name], params, this);
    };

    Droppable.prototype.init = function()
    {
        this.handleMouseEvents();
    };

    Droppable.prototype.handleMouseEvents = function()
    {
        var $e = this.$,
            self = this,
            setting = this.options,
            BEFORE = 'before';

        this.$triggerTarget = (setting.trigger ? ($.isFunction(setting.trigger) ? setting.trigger($e) : $e.find(setting.trigger)).first() : $e);

        this.$triggerTarget.on('mousedown', function(event)
        {
            if (setting.hasOwnProperty(BEFORE) && $.isFunction(setting[BEFORE]))
            {
                var isSure = setting[BEFORE](
                {
                    event: event,
                    element: $e
                });
                if (isSure !== undefined && (!isSure)) return;
            }

            var $targets = $.isFunction(setting.target) ? setting.target($e) : $(setting.target),
                target = null,
                shadow = null,
                $container = $(setting.container).first(),
                isIn = false,
                isSelf = true,
                oldCssPosition,
                startOffset = $e.offset(),
                startMouseOffset = {
                    left: event.pageX,
                    top: event.pageY
                };
            var containerOffset = $container.offset();
            var clickOffset = {
                left: startMouseOffset.left - startOffset.left,
                top: startMouseOffset.top - startOffset.top
            };
            var lastMouseOffset = {
                left: startMouseOffset.left,
                top: startMouseOffset.top
            };

            $e.addClass('drag-from');
            $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
            event.preventDefault();

            function mouseMove(event)
            {
                var mouseOffset = {
                    left: event.pageX,
                    top: event.pageY
                };

                // ignore small move
                if (Math.abs(mouseOffset.left - startMouseOffset.left) < setting.deviation && Math.abs(mouseOffset.top - startMouseOffset.top) < setting.deviation) return;

                if (shadow === null) // create shadow
                {
                    var cssPosition = $container.css('position');
                    if (cssPosition != 'absolute' && cssPosition != 'relative' && cssPosition != 'fixed')
                    {
                        oldCssPosition = cssPosition;
                        $container.css('position', 'relative');
                    }

                    shadow = $e.clone().removeClass('drag-from').addClass('drag-shadow').css(
                    {
                        position: 'absolute',
                        width: $e.outerWidth(),
                        transition: 'none'
                    }).appendTo($container);
                    $e.addClass('dragging');

                    self.callEvent('start',
                    {
                        event: event,
                        element: $e
                    });
                }

                var offset = {
                    left: mouseOffset.left - clickOffset.left,
                    top: mouseOffset.top - clickOffset.top
                };
                var position = {
                    left: offset.left - containerOffset.left,
                    top: offset.top - containerOffset.top
                };
                shadow.css(position);
                lastMouseOffset.left = mouseOffset.left;
                lastMouseOffset.top = mouseOffset.top;

                var isNew = false;
                isIn = false;

                if (!setting.flex)
                {
                    $targets.removeClass('drop-to');
                }

                var newTarget = null;
                $targets.each(function()
                {
                    var t = $(this);
                    var tPos = t.offset();
                    var tW = t.outerWidth(),
                        tH = t.outerHeight(),
                        tX = tPos.left + setting.sensorOffsetX,
                        tY = tPos.top + setting.sensorOffsetY;

                    if (mouseOffset.left > tX && mouseOffset.top > tY && mouseOffset.left < (tX + tW) && mouseOffset.top < (tY + tH))
                    {
                        if (newTarget) newTarget.removeClass('drop-to');
                        newTarget = t;
                        if (!setting.nested) return false;
                    }
                });

                if (newTarget)
                {
                    isIn = true;
                    var id = newTarget.data('id');
                    if ($e.data('id') != id) isSelf = false;
                    if (target === null || (target.data('id') !== id && (!isSelf))) isNew = true;
                    target = newTarget;
                    if (setting.flex)
                    {
                        $targets.removeClass('drop-to');
                    }
                    target.addClass('drop-to');
                }

                if (!setting.flex)
                {
                    $e.toggleClass('drop-in', isIn);
                    shadow.toggleClass('drop-in', isIn);
                }
                else if (target !== null && target.length)
                {
                    isIn = true;
                }

                self.callEvent('drag',
                {
                    event: event,
                    isIn: isIn,
                    target: target,
                    element: $e,
                    isNew: isNew,
                    selfTarget: isSelf,
                    clickOffset: clickOffset,
                    offset: offset,
                    position:
                    {
                        left: offset.left - containerOffset.left,
                        top: offset.top - containerOffset.top
                    },
                    mouseOffset: mouseOffset
                });
                event.preventDefault();
            }

            function mouseUp(event)
            {
                if (oldCssPosition)
                {
                    $container.css('position', oldCssPosition);
                }

                if (shadow === null)
                {
                    $e.removeClass('drag-from');
                    $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                    self.callEvent('always', {event: event, cancel: true});
                    return;
                }

                if (!isIn) target = null;
                var isSure = true,
                    mouseOffset = {
                        left: event.pageX,
                        top: event.pageY
                    };
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
                    target: target,
                    element: $e,
                    isNew: (!isSelf) && target !== null,
                    selfTarget: isSelf,
                    offset: offset,
                    mouseOffset: mouseOffset,
                    position:
                    {
                        left: offset.left - containerOffset.left,
                        top: offset.top - containerOffset.top
                    },
                    lastMouseOffset: lastMouseOffset,
                    moveOffset: moveOffset
                };

                isSure = self.callEvent('beforeDrop', eventOptions);

                if (isSure && isIn)
                {
                    self.callEvent('drop', eventOptions);
                }

                $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                $targets.removeClass('drop-to');
                $e.removeClass('dragging').removeClass('drag-from');
                shadow.remove();

                self.callEvent('finish', eventOptions);
                self.callEvent('always', eventOptions);

                event.preventDefault();
            }
        });

    };

    Droppable.prototype.reset = function()
    {
        this.$triggerTarget.off('mousedown');
        this.handleMouseEvents();
    };

    $.fn.droppable = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data('zui.droppable');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.droppable', (data = new Droppable(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.droppable.Constructor = Droppable;
}(jQuery, document, Math));

/* ========================================================================
 * ZUI: sortable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


+function($, window, document, Math)
{
    'use strict';

    var Sortable = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    Sortable.DEFAULTS = {selector: 'li, div', dragCssClass: 'invisible'}; // default options

    Sortable.prototype.getOptions = function (options)
    {
        options = $.extend({}, Sortable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Sortable.prototype.init = function()
    {
        this.bindEventToList(this.$.children(this.options.selector));
    };

    Sortable.prototype.reset = function()
    {
        var that = this, order = 0;
        var list = this.$.children(this.options.selector).not('.drag-shadow');
        list.each(function()
        {
            var $this = $(this);
            if($this.data('zui.droppable'))
            {
                $this.data('zui.droppable').options.target = list;
                $this.droppable('reset');
            }
            else
            {
                that.bindEventToList($this);
            }
        });
    };

    Sortable.prototype.bindEventToList = function($list)
    {
        var self = this.$,
            options = this.options;

        markOrders($list);
        $list.droppable(
        {
            trigger: options.trigger,
            target: self.children(options.selector),
            container: self,
            always: options.always,
            flex: true,
            start: function(e)
            {
                if(options.dragCssClass) e.element.addClass(options.dragCssClass);
                $.zui.callEvent(options['start']);
            },
            drag: function(e)
            {
                self.addClass('sortable-sorting');
                if(e.isIn)
                {
                    var $ele = e.element, $target = e.target;
                    var eleOrder = $ele.attr('data-order'), targetOrder = $target.attr('data-order');
                    if(eleOrder == targetOrder) return;
                    else if(eleOrder > targetOrder)
                    {
                        $target.before($ele);
                    }
                    else
                    {
                        $target.after($ele);
                    }
                    var list = self.children(options.selector).not('.drag-shadow');
                    markOrders(list);
                    $.zui.callEvent(options['order'], {list: list, element: $ele});
                }
            },
            finish: function(e)
            {
                if(options.dragCssClass && e.element) e.element.removeClass(options.dragCssClass);
                $.zui.callEvent(options['finish'], {list: self.children(options.selector), element: e.element});
                self.removeClass('sortable-sorting');
            }
        });

        function markOrders(list)
        {
            var orders = [];
            list.each(function()
            {
                var thisOrder = $(this).data('order');
                if(typeof thisOrder === 'number')
                {
                    orders.push(thisOrder);
                }
            });
            orders.sort(function(a, b) {return a - b;});

            var listSize = list.length;
            while(orders.length < listSize)
            {
                orders.push(orders.length ? (orders[orders.length - 1] + 1) : 0);
            }

            if(options.reverse)
            {
                orders.reverse();
            }

            var listIndex = 0
            list.each(function()
            {
                $(this).attr('data-order', orders[listIndex++]);
            });
        }
    };

    $.fn.sortable = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.sortable');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.sortable', (data = new Sortable(this, options)));
            else if(typeof option == 'object') data.reset();

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.sortable.Constructor = Sortable;
}(jQuery,window,document,Math);

/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
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

+ function($){
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var zuiname = 'zui.modal'
    var Modal = function(element, options)
    {
        this.options = options
        this.$body = $(document.body)
        this.$element = $(element)
        this.$backdrop =
            this.isShown = null
        this.scrollbarWidth = 0

        if (typeof this.options.moveable === 'undefined')
        {
            this.options.moveable = this.$element.hasClass('modal-moveable');
        }

        if (this.options.remote)
        {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function()
                {
                    this.$element.trigger('loaded.' + zuiname)
                }, this))
        }
    }

    Modal.VERSION = '3.2.0'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true,
        rememberPos: true,
        position: 'fit' // 'center' or '40px' or '10%'
    }

    Modal.prototype.toggle = function(_relatedTarget, position)
    {
        return this.isShown ? this.hide() : this.show(_relatedTarget, position)
    }

    Modal.prototype.ajustPosition = function(position)
    {
        if (typeof position === 'undefined') position = this.options.position;
        if (typeof position === 'undefined') return;
        var $dialog = this.$element.find('.modal-dialog');
        // if($dialog.hasClass('modal-dragged')) return;

        var half = Math.max(0, ($(window).height() - $dialog.outerHeight()) / 2);
        var topPos = position == 'fit' ? (half * 2 / 3) : (position == 'center' ? half : position);
        if ($dialog.hasClass('modal-moveable'))
        {
            var pos = this.options.rememberPos ? this.$element.data('modal-pos') : null;
            if (!pos)
            {
                pos = {
                    left: Math.max(0, ($(window).width() - $dialog.outerWidth()) / 2),
                    top: topPos
                };
            }
            $dialog.css(pos);
        }
        else
        {
            $dialog.css('margin-top', topPos);
        }
    }

    Modal.prototype.setMoveale = function()
    {
        var that = this;
        var options = that.options;
        var $dialog = that.$element.find('.modal-dialog').removeClass('modal-dragged');
        $dialog.toggleClass('modal-moveable', options.moveable);

        if (!that.$element.data('modal-moveable-setup'))
        {
            $dialog.draggable(
            {
                container: that.$element,
                handle: '.modal-header',
                before: function()
                {
                    $dialog.css('margin-top', '').addClass('modal-dragged');
                },
                finish: function(e)
                {
                    that.$element.data('modal-pos', e.pos);
                }
            });
        }
    }

    Modal.prototype.show = function(_relatedTarget, position)
    {
        var that = this
        var e = $.Event('show.' + zuiname,
        {
            relatedTarget: _relatedTarget
        })

        that.$element.trigger(e)

        if (that.isShown || e.isDefaultPrevented()) return

        that.isShown = true

        if (that.options.draggable) that.setMoveale();

        that.checkScrollbar()
        that.$body.addClass('modal-open')

        that.setScrollbar()
        that.escape()

        that.$element.on('click.dismiss.' + zuiname, '[data-dismiss="modal"]', $.proxy(that.hide, that))

        that.backdrop(function()
        {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length)
            {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            if (transition)
            {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element
                .addClass('in')
                .attr('aria-hidden', false)

            that.ajustPosition(position);

            that.enforceFocus()

            var e = $.Event('shown.' + zuiname,
            {
                relatedTarget: _relatedTarget
            })

            transition ?
                that.$element.find('.modal-dialog') // wait for modal to slide in
                .one('bsTransitionEnd', function()
                {
                    that.$element.trigger('focus').trigger(e)
                })
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function(e)
    {
        if (e) e.preventDefault()

        e = $.Event('hide.' + zuiname)

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

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

    Modal.prototype.enforceFocus = function()
    {
        $(document)
            .off('focusin.' + zuiname) // guard against infinite focus loop
            .on('focusin.' + zuiname, $.proxy(function(e)
            {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length)
                {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function()
    {
        if (this.isShown && this.options.keyboard)
        {
            $(document).on('keydown.dismiss.' + zuiname, $.proxy(function(e)
            {
                if (e.which == 27)
                {
                    var et = $.Event('escaping.' + zuiname)
                    var result = this.$element.triggerHandler(et, 'esc')
                    if (result != undefined && (!result)) return
                    this.hide()
                }
            }, this))
        }
        else if (!this.isShown)
        {
            $(document).off('keydown.dismiss.' + zuiname)
        }
    }

    Modal.prototype.hideModal = function()
    {
        var that = this
        this.$element.hide()
        this.backdrop(function()
        {
            that.$element.trigger('hidden.' + zuiname)
        })
    }

    Modal.prototype.removeBackdrop = function()
    {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function(callback)
    {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop)
        {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                .appendTo(this.$body)

            this.$element.on('mousedown.dismiss.' + zuiname, $.proxy(function(e)
            {
                if (e.target !== e.currentTarget) return
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
            }, this))

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if (!callback) return

            doAnimate ?
                this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        }
        else if (!this.isShown && this.$backdrop)
        {
            this.$backdrop.removeClass('in')

            var callbackRemove = function()
            {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        }
        else if (callback)
        {
            callback()
        }
    }

    Modal.prototype.checkScrollbar = function()
    {
        if (document.body.clientWidth >= window.innerWidth) return
        this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function()
    {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function()
    {
        this.$body.css('padding-right', '')
    }

    Modal.prototype.measureScrollbar = function()
    { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }


    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget, position)
    {
        return this.each(function()
        {
            var $this = $(this)
            var data = $this.data(zuiname)
            var options = $.extend(
            {}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data(zuiname, (data = new Modal(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget, position)
            else if (options.show) data.show(_relatedTarget, position)
        })
    }

    var old = $.fn.modal

    $.fn.modal = Plugin
    $.fn.modal.Constructor = Modal


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function()
    {
        $.fn.modal = old
        return this
    }


    // MODAL DATA-API
    // ==============

    $(document).on('click.' + zuiname + '.data-api', '[data-toggle="modal"]', function(e)
    {
        var $this = $(this)
        var href = $this.attr('href')
        var $target = null
        try
        {
            // strip for ie7
            $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        }
        catch (ex)
        {
            return
        }
        if (!$target.length) return;
        var option = $target.data(zuiname) ? 'toggle' : $.extend(
        {
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data())

        if ($this.is('a')) e.preventDefault()

        $target.one('show.' + zuiname, function(showEvent)
        {
            // only register focus restorer if modal will actually get shown
            if (showEvent.isDefaultPrevented()) return
            $target.one('hidden.' + zuiname, function()
            {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this, $this.data('position'))
    })

}(jQuery);

/* ========================================================================
 * ZUI: modal.trigger.js v1.2.0
 * http://zui.sexy/docs/javascript.html#modals
 * Licensed under MIT
 * ======================================================================== */


(function($, window)
{
    'use strict';

    if (!$.fn.modal) throw new Error('Modal trigger requires modal.js');

    var NAME = 'zui.modaltrigger',
        STR_AJAX = 'ajax',
        ZUI_MODAL = '.zui.modal',
        STR_STRING = 'string';

    // MODAL TRIGGER CLASS DEFINITION
    // ======================
    var ModalTrigger = function(options)
    {
        options = $.extend(
        {}, ModalTrigger.DEFAULTS, $.ModalTriggerDefaults, options);
        this.isShown;
        this.options = options;
        this.id = $.zui.uuid();

        // todo: handle when: options.show = true
    };

    ModalTrigger.DEFAULTS = {
        type: 'custom',
        // width: null, // number, css definition
        // size: null, // 'md', 'sm', 'lg', 'fullscreen'
        height: 'auto',
        // icon: null,
        name: 'triggerModal',
        fade: true,
        position: 'fit',
        showHeader: true,
        delay: 0,
        backdrop: true,
        keyboard: true
    };

    ModalTrigger.prototype.init = function(options)
    {
        var that = this;
        if (options.url)
        {
            if (!options.type || (options.type != STR_AJAX && options.type != 'iframe'))
            {
                options.type = STR_AJAX;
            }
        }
        if (options.remote)
        {
            options.type = STR_AJAX;
            if (typeof options.remote === STR_STRING) options.url = options.remote;
        }
        else if (options.iframe)
        {
            options.type = 'iframe';
            if (typeof options.iframe === STR_STRING) options.url = options.iframe;
        }
        else if (options.custom)
        {
            options.type = 'custom';
            if (typeof options.custom === STR_STRING)
            {
                var $doms;
                try
                {
                    $doms = $(options.custom);
                }
                catch (e)
                {}

                if ($doms && $doms.length)
                {
                    options.custom = $doms;
                }
                else if ($.isFunction(window[options.custom]))
                {
                    options.custom = window[options.custom];
                }
            }
        }

        var $modal = $('#' + options.name);
        if ($modal.length)
        {
            if (!that.isShown) $modal.off(ZUI_MODAL);
            $modal.remove();
        }
        $modal = $('<div id="' + options.name + '" class="modal modal-trigger"><div class="icon-spinner icon-spin loader"></div><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" data-dismiss="modal">×</button><h4 class="modal-title"><i class="modal-icon"></i> <span class="modal-title-name"></span></h4></div><div class="modal-body"></div></div></div></div>').appendTo('body').data(NAME, that);

        var bindEvent = function(optonName, eventName)
        {
            var handleFunc = options[optonName];
            if ($.isFunction(handleFunc)) $modal.on(eventName + ZUI_MODAL, handleFunc);
        };
        bindEvent('onShow', 'show');
        bindEvent('shown', 'shown');
        bindEvent('onHide', 'hide');
        bindEvent('hidden', 'hidden');
        bindEvent('loaded', 'loaded');

        $modal.on('shown' + ZUI_MODAL, function()
        {
            that.isShown = true;
        }).on('hidden' + ZUI_MODAL, function()
        {
            that.isShown = false;
        });

        this.$modal = $modal;
        this.$dialog = $modal.find('.modal-dialog');
    };

    ModalTrigger.prototype.show = function(option)
    {
        var options = $.extend(
        {}, this.options, option);
        this.init(options);
        var that = this,
            $modal = this.$modal,
            $dialog = this.$dialog,
            custom = options.custom;
        var $body = $dialog.find('.modal-body').css('padding', ''),
            $header = $dialog.find('.modal-header'),
            $content = $dialog.find('.modal-content');

        $modal.toggleClass('fade', options.fade)
            .addClass(options.cssClass)
            .toggleClass('modal-md', options.size === 'md')
            .toggleClass('modal-sm', options.size === 'sm')
            .toggleClass('modal-lg', options.size === 'lg')
            .toggleClass('modal-fullscreen', options.size === 'fullscreen')
            .toggleClass('modal-loading', !this.isShown);
        $header.toggle(options.showHeader);
        $header.find('.modal-icon').attr('class', 'modal-icon icon-' + options.icon);
        $header.find('.modal-title-name').html(options.title || '');
        if (options.size && options.size === 'fullscreen')
        {
            options.width = '';
            options.height = '';
        }

        var readyToShow = function(delay)
        {
            if (typeof delay === 'undefined') delay = 300;
            setTimeout(function()
            {
                $dialog = $modal.find('.modal-dialog');
                if (options.width && options.width != 'auto')
                {
                    $dialog.css('width', options.width);
                }
                if (options.height && options.height != 'auto')
                {
                    $dialog.css('height', options.height);
                    if(options.type === 'iframe') $body.css('height', $dialog.height() - $header.outerHeight());
                }
                that.ajustPosition(options.position);
                $modal.removeClass('modal-loading');

                if (options.type != 'iframe')
                {
                    $dialog.off('resize.' + NAME).on('resize.' + NAME, function()
                    {
                        that.ajustPosition();
                    });
                }
            }, delay);
        };

        if (options.type === 'custom' && custom)
        {
            if ($.isFunction(custom))
            {
                var customContent = custom(
                {
                    modal: $modal,
                    options: options,
                    modalTrigger: that,
                    ready: readyToShow
                });
                if (typeof customContent === STR_STRING)
                {
                    $body.html(customContent);
                    readyToShow();
                }
            }
            else if (custom instanceof $)
            {
                $body.html($('<div>').append(custom.clone()).html());
                readyToShow();
            }
            else
            {
                $body.html(custom);
                readyToShow();
            }
        }
        else if (options.url)
        {
            $modal.attr('ref', options.url);
            if (options.type === 'iframe')
            {
                $modal.addClass('modal-iframe');
                this.firstLoad = true;
                var iframeName = 'iframe-' + options.name;
                $header.detach();
                $body.detach();
                $content.empty().append($header).append($body);
                $body.css('padding', 0)
                    .html('<iframe id="' + iframeName + '" name="' + iframeName + '" src="' + options.url + '" frameborder="no" allowtransparency="true" scrolling="auto" style="width: 100%; height: 100%; left: 0px;"></iframe>');

                if (options.waittime > 0)
                {
                    that.waitTimeout = setTimeout(readyToShow, options.waittime);
                }

                var frame = document.getElementById(iframeName);
                frame.onload = frame.onreadystatechange = function()
                {
                    if (that.firstLoad) $modal.addClass('modal-loading');
                    if (this.readyState && this.readyState != 'complete') return;
                    that.firstLoad = false;

                    if (options.waittime > 0)
                    {
                        clearTimeout(that.waitTimeout);
                    }

                    try
                    {
                        $modal.attr('ref', frame.contentWindow.location.href);
                        var frame$ = window.frames[iframeName].$;
                        if (frame$ && options.height === 'auto' && options.size != 'fullscreen')
                        {
                            // todo: update iframe url to ref attribute
                            var $framebody = frame$('body').addClass('body-modal');
                            var ajustFrameSize = function()
                            {
                                $modal.removeClass('fade');
                                var height = $framebody.outerHeight();
                                $body.css('height', height);
                                if (options.fade) $modal.addClass('fade');
                                readyToShow();
                            };

                            $modal.callEvent('loaded' + ZUI_MODAL,
                            {
                                modalType: 'iframe'
                            });

                            setTimeout(ajustFrameSize, 100);

                            $framebody.off('resize.' + NAME).on('resize.' + NAME, ajustFrameSize);
                        }

                        frame$.extend(
                        {
                            closeModal: window.closeModal
                        });
                    }
                    catch (e)
                    {
                        readyToShow();
                    }
                };
            }
            else
            {
                $.get(options.url, function(data)
                {
                    try
                    {
                        var $data = $(data);
                        if ($data.hasClass('modal-dialog'))
                        {
                            $dialog.replaceWith($data);
                        }
                        else if ($data.hasClass('modal-content'))
                        {
                            $dialog.find('.modal-content').replaceWith($data);
                        }
                        else
                        {
                            $body.wrapInner($data);
                        }
                    }
                    catch(e)
                    {
                        $modal.html(data);
                    }
                    $modal.callEvent('loaded' + ZUI_MODAL,
                    {
                        modalType: STR_AJAX
                    });
                    readyToShow();
                });
            }
        }

        $modal.modal(
        {
            show: 'show',
            backdrop: options.backdrop,
            keyboard: options.keyboard
        });
    };

    ModalTrigger.prototype.close = function(callback, redirect)
    {
        if(callback || redirect)
        {
            this.$modal.on('hidden' + ZUI_MODAL, function()
            {
                if ($.isFunction(callback)) callback();

                if (typeof redirect === STR_STRING)
                {
                    if (redirect === 'this') window.location.reload();
                    else window.location = redirect;
                }
            });
        }
        this.$modal.modal('hide');
    };

    ModalTrigger.prototype.toggle = function(options)
    {
        if (this.isShown) this.close();
        else this.show(options);
    };

    ModalTrigger.prototype.ajustPosition = function(position)
    {
        this.$modal.modal('ajustPosition', position || this.options.position);
    };

    $.zui({ModalTrigger: ModalTrigger, modalTrigger: new ModalTrigger()});

    $.fn.modalTrigger = function(option, settings)
    {
        return $(this).each(function()
        {
            var $this = $(this);
            var data = $this.data(NAME),
                options = $.extend(
                {
                    title: $this.attr('title') || $this.text(),
                    url: $this.attr('href'),
                    type: $this.hasClass('iframe') ? 'iframe' : ''
                }, $this.data(), $.isPlainObject(option) && option);
            if (!data) $this.data(NAME, (data = new ModalTrigger(options)));
            if (typeof option == STR_STRING) data[option](settings);
            else if (options.show) data.show(settings);

            $this.on((options.trigger || 'click') + '.toggle.' + NAME, function(e)
            {
                data.toggle(options);
                if ($this.is('a')) e.preventDefault();
            });
        });
    };

    var old = $.fn.modal;
    $.fn.modal = function(option, settings)
    {
        return $(this).each(function()
        {
            var $this = $(this);
            if ($this.hasClass('modal')) old.call($this, option, settings);
            else $this.modalTrigger(option, settings);
        });
    };

    var getModal = function(modal)
    {
        var modalType = typeof(modal);
        if (modalType === 'undefined')
        {
            modal = $('.modal.modal-trigger');
        }
        else if (modalType === STR_STRING)
        {
            modal = $(modal);
        }
        if (modal && (modal instanceof $)) return modal;
        return null;
    };

    // callback, redirect, modal
    var closeModal = function(modal, callback, redirect)
    {
        if($.isFunction(modal))
        {
            var oldModal = redirect;
            redirect = callback;
            callback = modal;
            modal = oldModal;
        }
        modal = getModal(modal);
        if (modal && modal.length)
        {
            modal.each(function()
            {
                $(this).data(NAME).close(callback, redirect);
            });
        }
    };

    var ajustModalPosition = function(position, modal)
    {
        modal = getModal(modal);
        if (modal && modal.length)
        {
            modal.modal('ajustPosition', position);
        }
    };

    $.zui(
    {
        closeModal: closeModal,
        ajustModalPosition: ajustModalPosition
    });

    $(document).on('click.' + NAME + '.data-api', '[data-toggle="modal"]', function(e)
    {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = null;
        try
        {
            $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        }
        catch (ex)
        {}
        if (!$target || !$target.length)
        {
            if (!$this.data(NAME))
            {
                $this.modalTrigger(
                {
                    show: true
                });
            }
            else
            {
                $this.trigger('.toggle.' + NAME);
            }
        }
        if ($this.is('a'))
        {
            e.preventDefault();
        }
    });
}(window.jQuery, window));

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twzui.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
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


+ function($){
    'use strict';

    // TOOLTIP PUBLIC CLASS DEFINITION
    // ===============================

    var Tooltip = function(element, options)
    {
        this.type =
            this.options =
            this.enabled =
            this.timeout =
            this.hoverState =
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

    Tooltip.prototype.init = function(type, element, options)
    {
        this.enabled = true
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)

        var triggers = this.options.trigger.split(' ')

        for (var i = triggers.length; i--;)
        {
            var trigger = triggers[i]

            if (trigger == 'click')
            {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            }
            else if (trigger != 'manual')
            {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }

        this.options.selector ?
            (this._options = $.extend(
            {}, this.options,
            {
                trigger: 'manual',
                selector: ''
            })) :
            this.fixTitle()
    }

    Tooltip.prototype.getDefaults = function()
    {
        return Tooltip.DEFAULTS
    }

    Tooltip.prototype.getOptions = function(options)
    {
        options = $.extend(
        {}, this.getDefaults(), this.$element.data(), options)

        if (options.delay && typeof options.delay == 'number')
        {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        return options
    }

    Tooltip.prototype.getDelegateOptions = function()
    {
        var options = {}
        var defaults = this.getDefaults()

        this._options && $.each(this._options, function(key, value)
        {
            if (defaults[key] != value) options[key] = value
        })

        return options
    }

    Tooltip.prototype.enter = function(obj)
    {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('zui.' + this.type)

        clearTimeout(self.timeout)

        self.hoverState = 'in'

        if (!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function()
        {
            if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }

    Tooltip.prototype.leave = function(obj)
    {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('zui.' + this.type)

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function()
        {
            if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }

    Tooltip.prototype.show = function()
    {
        var e = $.Event('show.zui.' + this.type)

        if (this.hasContent() && this.enabled)
        {
            this.$element.trigger(e)

            if (e.isDefaultPrevented()) return

            var $tip = this.tip()

            this.setContent()

            if (this.options.animation) $tip.addClass('fade')

            var placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement

            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

            $tip
                .detach()
                .css(
                {
                    top: 0,
                    left: 0,
                    display: 'block'
                })
                .addClass(placement)

            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

            var pos = this.getPosition()
            var actualWidth = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight

            if (autoPlace)
            {
                var $parent = this.$element.parent()

                var orgPlacement = placement
                var docScroll = document.documentElement.scrollTop || document.body.scrollTop
                var parentWidth = this.options.container == 'body' ? window.innerWidth : $parent.outerWidth()
                var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
                var parentLeft = this.options.container == 'body' ? 0 : $parent.offset().left

                placement = placement == 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' :
                    placement == 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' :
                    placement == 'right' && pos.right + actualWidth > parentWidth ? 'left' :
                    placement == 'left' && pos.left - actualWidth < parentLeft ? 'right' :
                    placement

                $tip
                    .removeClass(orgPlacement)
                    .addClass(placement)
            }

            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

            this.applyPlacement(calculatedOffset, placement)
            this.$element.trigger('shown.zui.' + this.type)
        }
    }

    Tooltip.prototype.applyPlacement = function(offset, placement)
    {
        var replace
        var $tip = this.tip()
        var width = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)

        // we must check for NaN for ie 8/9
        if (isNaN(marginTop)) marginTop = 0
        if (isNaN(marginLeft)) marginLeft = 0

        offset.top = offset.top + marginTop
        offset.left = offset.left + marginLeft

        $tip
            .offset(offset)
            .addClass('in')

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if (placement == 'top' && actualHeight != height)
        {
            replace = true
            offset.top = offset.top + height - actualHeight
        }

        if (/bottom|top/.test(placement))
        {
            var delta = 0

            if (offset.left < 0)
            {
                delta = offset.left * -2
                offset.left = 0

                $tip.offset(offset)

                actualWidth = $tip[0].offsetWidth
                actualHeight = $tip[0].offsetHeight
            }

            this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
        }
        else
        {
            this.replaceArrow(actualHeight - height, actualHeight, 'top')
        }

        if (replace) $tip.offset(offset)
    }

    Tooltip.prototype.replaceArrow = function(delta, dimension, position)
    {
        this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

    Tooltip.prototype.setContent = function()
    {
        var $tip = this.tip()
        var title = this.getTitle()

        if (this.options.tipId) $tip.attr('id', this.options.tipId)
        if (this.options.tipClass) $tip.addClass(this.options.tipClass)

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }

    Tooltip.prototype.hide = function()
    {
        var that = this
        var $tip = this.tip()
        var e = $.Event('hide.zui.' + this.type)

        function complete()
        {
            if (that.hoverState != 'in') $tip.detach()
        }

        this.$element.trigger(e)

        if (e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && this.$tip.hasClass('fade') ?
            $tip
            .one($.support.transition.end, complete)
            .emulateTransitionEnd(150) :
            complete()

        this.$element.trigger('hidden.zui.' + this.type)

        return this
    }

    Tooltip.prototype.fixTitle = function()
    {
        var $e = this.$element
        if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string')
        {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }

    Tooltip.prototype.hasContent = function()
    {
        return this.getTitle()
    }

    Tooltip.prototype.getPosition = function()
    {
        var el = this.$element[0]
        return $.extend(
        {}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() :
        {
            width: el.offsetWidth,
            height: el.offsetHeight
        }, this.$element.offset())
    }

    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight)
    {
        return placement == 'bottom' ?
            {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } :
            placement == 'top' ?
            {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } :
            placement == 'left' ?
            {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } :
            /* placement == 'right' */
            {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            }
    }

    Tooltip.prototype.getTitle = function()
    {
        var title
        var $e = this.$element
        var o = this.options

        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

        return title
    }

    Tooltip.prototype.tip = function()
    {
        return this.$tip = this.$tip || $(this.options.template)
    }

    Tooltip.prototype.arrow = function()
    {
        return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
    }

    Tooltip.prototype.validate = function()
    {
        if (!this.$element[0].parentNode)
        {
            this.hide()
            this.$element = null
            this.options = null
        }
    }

    Tooltip.prototype.enable = function()
    {
        this.enabled = true
    }

    Tooltip.prototype.disable = function()
    {
        this.enabled = false
    }

    Tooltip.prototype.toggleEnabled = function()
    {
        this.enabled = !this.enabled
    }

    Tooltip.prototype.toggle = function(e)
    {
        var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('zui.' + this.type) : this
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }

    Tooltip.prototype.destroy = function()
    {
        this.hide().$element.off('.' + this.type).removeData('zui.' + this.type)
    }


    // TOOLTIP PLUGIN DEFINITION
    // =========================

    var old = $.fn.tooltip

    $.fn.tooltip = function(option)
    {
        return this.each(function()
        {
            var $this = $(this)
            var data = $this.data('zui.tooltip')
            var options = typeof option == 'object' && option

            if (!data) $this.data('zui.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.tooltip.Constructor = Tooltip


    // TOOLTIP NO CONFLICT
    // ===================

    $.fn.tooltip.noConflict = function()
    {
        $.fn.tooltip = old
        return this
    }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
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


+ function($){
    'use strict';

    // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover = function(element, options)
    {
        this.init('popover', element, options)
    }

    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

    Popover.DEFAULTS = $.extend(
    {}, $.fn.tooltip.Constructor.DEFAULTS,
    {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })


    // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover.prototype = $.extend(
    {}, $.fn.tooltip.Constructor.prototype)

    Popover.prototype.constructor = Popover

    Popover.prototype.getDefaults = function()
    {
        return Popover.DEFAULTS
    }

    Popover.prototype.setContent = function()
    {
        var $tip = this.tip()
        var target = this.getTarget()

        if (target)
        {
            if (target.find('.arrow').length < 1)
                $tip.addClass('no-arrow')
            $tip.html(target.html())
            return
        }

        var title = this.getTitle()
        var content = this.getContent()

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

        $tip.removeClass('fade top bottom left right in')

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
    }

    Popover.prototype.hasContent = function()
    {
        return this.getTarget() || this.getTitle() || this.getContent()
    }

    Popover.prototype.getContent = function()
    {
        var $e = this.$element
        var o = this.options

        return $e.attr('data-content') || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
    }

    Popover.prototype.getTarget = function()
    {
        var $e = this.$element
        var o = this.options

        var target = $e.attr('data-target') || (typeof o.target == 'function' ?
            o.target.call($e[0]) :
            o.target)
        return (target && true) ? (target == '$next' ? $e.next('.popover') : $(target)) : false
    }

    Popover.prototype.arrow = function()
    {
        return this.$arrow = this.$arrow || this.tip().find('.arrow')
    }

    Popover.prototype.tip = function()
    {
        if (!this.$tip) this.$tip = $(this.options.template)
        return this.$tip
    }


    // POPOVER PLUGIN DEFINITION
    // =========================

    var old = $.fn.popover

    $.fn.popover = function(option)
    {
        return this.each(function()
        {
            var $this = $(this)
            var data = $this.data('zui.popover')
            var options = typeof option == 'object' && option

            if (!data) $this.data('zui.popover', (data = new Popover(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.popover.Constructor = Popover


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popover.noConflict = function()
    {
        $.fn.popover = old
        return this
    }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
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


+ function($){
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var zuiname = 'zui.dropdown';
    var backdrop = '.dropdown-backdrop'
    var toggle = '[data-toggle=dropdown]'
    var Dropdown = function(element)
    {
        var $el = $(element).on('click.' + zuiname, this.toggle)
    }

    Dropdown.prototype.toggle = function(e)
    {
        var $this = $(this)

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive)
        {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length)
            {
                // if mobile we we use a backdrop because click events don't delegate
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
            }

            $parent.trigger(e = $.Event('show.' + zuiname))

            if (e.isDefaultPrevented()) return

            $parent
                .toggleClass('open')
                .trigger('shown.' + zuiname)

            $this.focus()
        }

        return false
    }

    Dropdown.prototype.keydown = function(e)
    {
        if (!/(38|40|27)/.test(e.keyCode)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        if (!isActive || (isActive && e.keyCode == 27))
        {
            if (e.which == 27) $parent.find(toggle).focus()
            return $this.click()
        }

        var $items = $('[role=menu] li:not(.divider):visible a', $parent)

        if (!$items.length) return

        var index = $items.index($items.filter(':focus'))

        if (e.keyCode == 38 && index > 0) index-- // up
            if (e.keyCode == 40 && index < $items.length - 1) index++ // down
                if (!~index) index = 0

        $items.eq(index).focus()
    }

    function clearMenus()
    {
        $(backdrop).remove()
        $(toggle).each(function(e)
        {
            var $parent = getParent($(this))
            if (!$parent.hasClass('open')) return
            $parent.trigger(e = $.Event('hide.' + zuiname))
            if (e.isDefaultPrevented()) return
            $parent.removeClass('open').trigger('hidden.' + zuiname)
        })
    }

    function getParent($this)
    {
        var selector = $this.attr('data-target')

        if (!selector)
        {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        var $parent = selector && $(selector)

        return $parent && $parent.length ? $parent : $this.parent()
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    var old = $.fn.dropdown

    $.fn.dropdown = function(option)
    {
        return this.each(function()
        {
            var $this = $(this)
            var data = $this.data('dropdown')

            if (!data) $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function()
    {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    var apiName = zuiname + '.data-api'
    $(document)
        .on('click.' + apiName, clearMenus)
        .on('click.' + apiName, '.dropdown form', function(e)
        {
            e.stopPropagation()
        })
        .on('click.' + apiName, toggle, Dropdown.prototype.toggle)
        .on('keydown.' + apiName, toggle + ', [role=menu]', Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twzui.github.com/bootstrap/javascript.html#carousel
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


+ function($){
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function(element, options)
    {
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

    Carousel.prototype.touchable = function()
    {
        if (!this.options.touchable) return;

        this.$element.on('touchstart touchmove touchend', touch);
        var touchStartX, touchStartY;

        /* listen the touch event */
        function touch(event)
        {
            var event = event || window.event;
            if (event.originalEvent) event = event.originalEvent;
            var carousel = $(this);

            switch (event.type)
            {
                case "touchstart":
                    touchStartX = event.touches[0].pageX;
                    touchStartY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var distanceX = event.changedTouches[0].pageX - touchStartX;
                    var distanceY = event.changedTouches[0].pageY - touchStartY;
                    if (Math.abs(distanceX) > Math.abs(distanceY))
                    {
                        handleCarousel(carousel, distanceX);
                        if (Math.abs(distanceX) > 10)
                        {
                            event.preventDefault();
                        }
                    }
                    else
                    {
                        var $w = $(window);
                        $('body,html').animate(
                        {
                            scrollTop: $w.scrollTop() - distanceY
                        }, 400)
                    }
                    break;
            }
        }

        function handleCarousel(carousel, distance)
        {
            if (distance > 10) carousel.find('.left.carousel-control').click();
            if (distance < -10) carousel.find('.right.carousel-control').click();
        }
    }

    Carousel.prototype.cycle = function(e)
    {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getActiveIndex = function()
    {
        this.$active = this.$element.find('.item.active')
        this.$items = this.$active.parent().children()

        return this.$items.index(this.$active)
    }

    Carousel.prototype.to = function(pos)
    {
        var that = this
        var activeIndex = this.getActiveIndex()

        if (pos > (this.$items.length - 1) || pos < 0) return

        if (this.sliding) return this.$element.one('slid', function()
        {
            that.to(pos)
        })
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

    Carousel.prototype.pause = function(e)
    {
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition.end)
        {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function()
    {
        if (this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function()
    {
        if (this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function(type, next)
    {
        var $active = this.$element.find('.item.active')
        var $next = next || $active[type]()
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var fallback = type == 'next' ? 'first' : 'last'
        var that = this

        if (!$next.length)
        {
            if (!this.options.wrap) return
            $next = this.$element.find('.item')[fallback]()
        }

        this.sliding = true

        isCycling && this.pause()

        var e = $.Event('slide.zui.carousel',
        {
            relatedTarget: $next[0],
            direction: direction
        })

        if ($next.hasClass('active')) return

        if (this.$indicators.length)
        {
            this.$indicators.find('.active').removeClass('active')
            this.$element.one('slid', function()
            {
                var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
                $nextIndicator && $nextIndicator.addClass('active')
            })
        }

        if ($.support.transition && this.$element.hasClass('slide'))
        {
            this.$element.trigger(e)
            if (e.isDefaultPrevented()) return
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one($.support.transition.end, function()
                {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function()
                    {
                        that.$element.trigger('slid')
                    }, 0)
                })
                .emulateTransitionEnd(600)
        }
        else
        {
            this.$element.trigger(e)
            if (e.isDefaultPrevented()) return
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

    $.fn.carousel = function(option)
    {
        return this.each(function()
        {
            var $this = $(this)
            var data = $this.data('zui.carousel')
            var options = $.extend(
            {}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide

            if (!data) $this.data('zui.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()

            if (options.touchable) data.touchable()
        })
    }

    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function()
    {
        $.fn.carousel = old
        return this
    }


    // CAROUSEL DATA-API
    // =================

    $(document).on('click.zui.carousel.data-api', '[data-slide], [data-slide-to]', function(e)
    {
        var $this = $(this),
            href
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        var options = $.extend(
        {}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false

        $target.carousel(options)

        if (slideIndex = $this.attr('data-slide-to'))
        {
            $target.data('zui.carousel').to(slideIndex)
        }

        e.preventDefault()
    })

    $(window).on('load', function()
    {
        $('[data-ride="carousel"]').each(function()
        {
            var $carousel = $(this)
            $carousel.carousel($carousel.data())
        })
    })

}(window.jQuery);

/* ========================================================================
 * image.ready.js
 * http://www.planeart.cn/?p=1121
 * ========================================================================
 * @version 2011.05.27
 * @author  TangBin
 * ======================================================================== */


(function()
{
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
    $.zui.imgReady = (function()
    {
        var list = [],
            intervalId = null,

            // 用来执行队列
            tick = function()
            {
                var i = 0;
                for (; i < list.length; i++)
                {
                    list[i].end ? list.splice(i--, 1) : list[i]();
                }
                !list.length && stop();
            },

            // 停止所有定时器队列
            stop = function()
            {
                clearInterval(intervalId);
                intervalId = null;
            };

        return function(url, ready, load, error)
        {
            var onready, width, height, newWidth, newHeight,
                img = new Image();

            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete)
            {
                ready.call(img);
                load && load.call(img);
                return;
            }

            width = img.width;
            height = img.height;

            // 加载错误后的事件
            img.onerror = function()
            {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
            };

            // 图片尺寸就绪
            onready = function()
            {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                    newWidth * newHeight > 1024
                )
                {
                    ready.call(img);
                    onready.end = true;
                }
            };
            onready();

            // 完全加载完毕的事件
            img.onload = function()
            {
                // onload在定时器时间差范围内可能比onready快
                // 这里进行检查并保证onready优先执行
                !onready.end && onready();

                load && load.call(img);

                // IE gif动画会循环执行onload，置空onload即可
                img = img.onload = img.onerror = null;
            };

            // 加入队列中定期执行
            if (!onready.end)
            {
                list.push(onready);
                // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                if (intervalId === null) intervalId = setInterval(tick, 40);
            }
        };
    })();
}());

/* ========================================================================
 * ZUI: lightbox.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window, Math)
{
    'use strict';

    if (!$.fn.modalTrigger) throw new Error('modal & modalTrigger requires for lightbox');
    if (!$.zui.imgReady) throw new Error('imgReady requires for lightbox');

    var Lightbox = function(element, options)
    {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Lightbox.DEFAULTS = {
        modalTeamplate: '<div class="icon-spinner icon-spin loader"></div><div class="modal-dialog"><button class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button><button class="controller prev"><i class="icon icon-chevron-left"></i></button><button class="controller next"><i class="icon icon-chevron-right"></i></button><img class="lightbox-img" src="{image}" alt="" data-dismiss="modal" /><div class="caption"><div class="content">{caption}<div></div></div>'
    }; // default options

    Lightbox.prototype.getOptions = function(options)
    {
        var IMAGE = 'image';
        options = $.extend(
        {}, Lightbox.DEFAULTS, this.$.data(), options);
        if (!options[IMAGE])
        {
            options[IMAGE] = this.$.attr('src') || this.$.attr('href') || this.$.find('img').attr('src');
            this.$.data(IMAGE, options[IMAGE]);
        }
        return options;
    };

    Lightbox.prototype.init = function()
    {
        this.bindEvents();
    };

    Lightbox.prototype.initGroups = function()
    {
        var groups = this.$.data('groups');
        if (!groups)
        {
            groups = $('[data-toggle="lightbox"][data-group="' + this.options.group + '"], [data-lightbox-group="' + this.options.group + '"]');
            this.$.data('groups', groups);
            groups.each(function(index)
            {
                $(this).attr('data-group-index', index);
            });
        }
        this.groups = groups;
        this.groupIndex = parseInt(this.$.data('group-index'));
    };

    Lightbox.prototype.bindEvents = function()
    {
        var $e = this.$,
            that = this;
        var options = this.options;
        if (!options.image) return false;
        $e.modalTrigger(
        {
            type: 'custom',
            name: 'lightboxModal',
            position: 'center',
            custom: function(e)
            {
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
                $.zui.imgReady(options.image, function()
                {
                    dialog.css(
                    {
                        width: Math.min(winWidth, this.width)
                    });
                    if (winWidth < (this.width + 30)) modal.addClass('lightbox-full');
                    e.ready();
                });

                modal.find('.prev').toggleClass('show', groups.filter('[data-group-index="' + (groupIndex - 1) + '"]').length > 0);
                modal.find('.next').toggleClass('show', groups.filter('[data-group-index="' + (groupIndex + 1) + '"]').length > 0);

                modal.find('.controller').click(function()
                {
                    var $this = $(this);
                    var id = modal.data('group-index') + ($this.hasClass('prev') ? -1 : 1);
                    var $e = groups.filter('[data-group-index="' + id + '"]');
                    if ($e.length)
                    {
                        var image = $e.data('image'),
                            caption = $e.data('caption');
                        modal.addClass('modal-loading')
                            .data('group-index', id)
                            .toggleClass('lightbox-with-caption', typeof caption == 'string')
                            .removeClass('lightbox-full');
                        modal.find('.lightbox-img').attr('src', image);
                        winWidth = $(window).width();
                        $.zui.imgReady(image, function()
                        {
                            dialog.css(
                            {
                                width: Math.min(winWidth, this.width)
                            });
                            if (winWidth < (this.width + 30)) modal.addClass('lightbox-full');
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

    $.fn.lightbox = function(option)
    {
        var defaultGroup = 'group' + (new Date()).getTime();
        return this.each(function()
        {
            var $this = $(this);

            var options = typeof option == 'object' && option;
            if (typeof options == 'object' && options.group)
            {
                $this.attr('data-lightbox-group', options.group);
            }
            else if ($this.data('group'))
            {
                $this.attr('data-lightbox-group', $this.data('group'));
            }
            else
            {
                $this.attr('data-lightbox-group', defaultGroup);
            }
            $this.data('group', $this.data('lightbox-group'));

            var data = $this.data('zui.lightbox');
            if (!data) $this.data('zui.lightbox', (data = new Lightbox(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.lightbox.Constructor = Lightbox;

    $(function()
    {
        $('[data-toggle="lightbox"]').lightbox();
    });
}(jQuery, window, Math));

/* ========================================================================
 * ZUI: messager.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window)
{
    'use strict';

    var id = 0;
    var template = '<div class="messager messager-{type} {placement}" id="messager{id}" style="display:none"><div class="messager-content"></div><div class="messager-actions"><button type="button" class="close action">&times;</button></div></div>';
    var defaultOptions = {
        type: 'default',
        placement: 'top',
        time: 4000,
        parent: 'body',
        // clear: false,
        icon: null,
        close: true,
        fade: true,
        scale: true
    };
    var lastMessager;

    var Messager = function(message, options)
    {
        var that = this;
        that.id = id++;
        options = that.options = $.extend(
        {}, defaultOptions, options);
        that.message = (options.icon ? '<i class="icon-' + options.icon + ' icon"></i> ' : '') + message;

        that.$ = $(template.format(options)).toggleClass('fade', options.fade).toggleClass('scale', options.scale).attr('id', 'messager-' + that.id);
        if (!options.close)
        {
            that.$.find('.close').remove();
        }
        else
        {
            that.$.on('click', '.close', function()
            {
                that.hide();
            });
        }

        that.$.find('.messager-content').html(that.message);


        that.$.data('zui.messager', that);
    };

    Messager.prototype.show = function(message)
    {
        var that = this,
            options = this.options;

        if (lastMessager)
        {
            if (lastMessager.id == that.id)
            {
                that.$.removeClass('in');
            }
            else if (lastMessager.isShow)
            {
                lastMessager.hide();
            }
        }

        if (that.hiding)
        {
            clearTimeout(that.hiding);
            that.hiding = null;
        }

        if (message)
        {
            that.message = (options.icon ? '<i class="icon-' + options.icon + ' icon"></i> ' : '') + message;
            that.$.find('.messager-content').html(that.message);
        }

        that.$.appendTo(options.parent).show();

        if (options.placement === 'top' || options.placement === 'bottom' || options.placement === 'center')
        {
            that.$.css('left', ($(window).width() - that.$.width() - 50) / 2);
        }

        if (options.placement === 'left' || options.placement === 'right' || options.placement === 'center')
        {
            that.$.css('top', ($(window).height() - that.$.height() - 50) / 2);
        }

        that.$.addClass('in');

        if (options.time)
        {
            that.hiding = setTimeout(function()
            {
                that.hide();
            }, options.time);
        }

        that.isShow = true;
        lastMessager = that;
    };

    Messager.prototype.hide = function()
    {
        var that = this;
        if (that.$.hasClass('in'))
        {
            that.$.removeClass('in');
            setTimeout(function()
            {
                that.$.remove();
            }, 200);
        }

        that.isShow = false;
    };

    var showMessage = function(message, options)
    {
        if (typeof options === 'string')
        {
            options = {
                type: options
            };
        }
        var msg = new Messager(message, options);
        msg.show();
        return msg;
    };

    var getOptions = function(options)
    {
        return (typeof options === 'string') ?
        {
            placement: options
        } : options;
    };

    $.zui({
        Messager: Messager,
        showMessager: showMessage,
        messager:
        {
            show: showMessage,
            primary: function(message, options)
            {
                return showMessage(message, $.extend(
                {
                    type: 'primary'
                }, getOptions(options)));
            },
            success: function(message, options)
            {
                return showMessage(message, $.extend(
                {
                    type: 'success',
                    icon: 'ok-sign'
                }, getOptions(options)));
            },
            info: function(message, options)
            {
                return showMessage(message, $.extend(
                {
                    type: 'info',
                    icon: 'info-sign'
                }, getOptions(options)));
            },
            warning: function(message, options)
            {
                return showMessage(message, $.extend(
                {
                    type: 'warning',
                    icon: 'warning-sign'
                }, getOptions(options)));
            },
            danger: function(message, options)
            {
                return showMessage(message, $.extend(
                {
                    type: 'danger',
                    icon: 'exclamation-sign'
                }, getOptions(options)));
            },
            important: function(message, options)
            {
                return showMessage(message, $.extend(
                {
                    type: 'important'
                }, getOptions(options)));
            },
            special: function(message, options)
            {
                return showMessage(message, $.extend(
                {
                    type: 'special'
                }, getOptions(options)));
            }
        }
    });
}(jQuery, window));

/* ========================================================================
 * ZUI: menu.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($)
{
    'use strict';

    var Menu = function(element, options)
    {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Menu.DEFAULTS = {
        auto: false,
        foldicon: 'icon-chevron-right'
    };

    Menu.prototype.getOptions = function(options)
    {
        options = $.extend(
        {}, Menu.DEFAULTS, this.$.data(), options);
        return options;
    };

    Menu.prototype.init = function()
    {
        var children = this.$.children('.nav');
        children.find('.nav').closest('li').addClass('nav-parent');
        children.find('.nav > li.active').closest('li').addClass('active');
        children.find('.nav-parent > a').append('<i class="' + this.options.foldicon + ' nav-parent-fold-icon"></i>');

        this.handleFold();
    };

    Menu.prototype.handleFold = function()
    {
        var auto = this.options.auto;
        var $menu = this.$;
        this.$.on('click', '.nav-parent > a', function(event)
        {
            if (auto)
            {
                $menu.find('.nav-parent.show').find('.nav').slideUp(function()
                {
                    $(this).closest('.nav-parent').removeClass('show');
                });
                $menu.find('.icon-rotate-90').removeClass('icon-rotate-90');
            }

            var li = $(this).closest('.nav-parent');
            if (li.hasClass('show'))
            {
                li.find('.icon-rotate-90').removeClass('icon-rotate-90');
                li.find('.nav').slideUp(function()
                {
                    $(this).closest('.nav-parent').removeClass('show');
                });
            }
            else
            {
                li.find('.nav-parent-fold-icon').addClass('icon-rotate-90');
                li.find('.nav').slideDown(function()
                {
                    $(this).closest('.nav-parent').addClass('show');
                });
            }

            event.preventDefault();
            return false;
        });
    };

    $.fn.menu = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data('zui.menu');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.menu', (data = new Menu(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.menu.Constructor = Menu;

    $(function()
    {
        $('[data-toggle="menu"]').menu();
    });
}(jQuery));

/* ========================================================================
 * bootbox.js [master branch]
 * http://bootboxjs.com/license.txt
 * ========================================================================
 * Updates in ZUI:
 * 1. Determine client language and apply setting automatically.
 * 2. Changed button position.
 * ======================================================================== */


// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function(root, factory){

    'use strict';
    if (typeof define === "function" && define.amd)
    {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    }
    else if (typeof exports === "object")
    {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    }
    else
    {
        // Browser globals (root is window)
        root.bootbox = factory(root.jQuery);
    }

}(this, function init($, undefined)
{

    'use strict';

    // the base DOM structure needed to create a modal
    var templates = {
        dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
            "<div class='modal-dialog'>" +
            "<div class='modal-content'>" +
            "<div class='modal-body'><div class='bootbox-body'></div></div>" +
            "</div>" +
            "</div>" +
            "</div>",
        header: "<div class='modal-header'>" +
            "<h4 class='modal-title'></h4>" +
            "</div>",
        footer: "<div class='modal-footer'></div>",
        closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
        form: "<form class='bootbox-form'></form>",
        inputs:
        {
            text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
            textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
            select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
            checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
            password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
        }
    };

    var defaults = {
        // default language
        locale: judgeClientLang(),
        // show backdrop or not
        backdrop: true,
        // animate the modal in/out
        animate: true,
        // additional class string applied to the top level dialog
        className: null,
        // whether or not to include a close button
        closeButton: true,
        // show the dialog immediately by default
        show: true,
        // dialog container
        container: "body"
    };

    // our public object; augmented after our private API
    var exports = {};

    function judgeClientLang()
    {
        var lang;
        if (typeof(config) != 'undefined' && config.clientLang)
        {
            lang = config.clientLang;
        }
        else
        {
            var hl = $('html').attr('lang');
            lang = hl ? hl : 'en';
        }
        return lang.replace('-', '_').toLowerCase();
    }

    /**
     * @private
     */
    function _t(key)
    {
        var locale = locales[defaults.locale];
        return locale ? locale[key] : locales.en[key];
    }

    function processCallback(e, dialog, callback)
    {
        e.stopPropagation();
        e.preventDefault();

        // by default we assume a callback will get rid of the dialog,
        // although it is given the opportunity to override this

        // so, if the callback can be invoked and it *explicitly returns false*
        // then we'll set a flag to keep the dialog active...
        var preserveDialog = $.isFunction(callback) && callback(e) === false;

        // ... otherwise we'll bin it
        if (!preserveDialog)
        {
            dialog.modal("hide");
        }
    }

    function getKeyLength(obj)
    {
        // @TODO defer to Object.keys(x).length if available?
        var k, t = 0;
        for (k in obj)
        {
            t++;
        }
        return t;
    }

    function each(collection, iterator)
    {
        var index = 0;
        $.each(collection, function(key, value)
        {
            iterator(key, value, index++);
        });
    }

    function sanitize(options)
    {
        var buttons;
        var total;

        if (typeof options !== "object")
        {
            throw new Error("Please supply an object of options");
        }

        if (!options.message)
        {
            throw new Error("Please specify a message");
        }

        // make sure any supplied options take precedence over defaults
        options = $.extend(
        {}, defaults, options);

        if (!options.buttons)
        {
            options.buttons = {};
        }

        // we only support Bootstrap's "static" and false backdrop args
        // supporting true would mean you could dismiss the dialog without
        // explicitly interacting with it
        options.backdrop = options.backdrop ? "static" : false;

        buttons = options.buttons;

        total = getKeyLength(buttons);

        each(buttons, function(key, button, index)
        {

            if ($.isFunction(button))
            {
                // short form, assume value is our callback. Since button
                // isn't an object it isn't a reference either so re-assign it
                button = buttons[key] = {
                    callback: button
                };
            }

            // before any further checks make sure by now button is the correct type
            if ($.type(button) !== "object")
            {
                throw new Error("button with key " + key + " must be an object");
            }

            if (!button.label)
            {
                // the lack of an explicit label means we'll assume the key is good enough
                button.label = key;
            }

            if (!button.className)
            {
                if (total == 1 || (total >= 2 && key === 'confirm'))
                {
                    // always add a primary to the main option in a two-button dialog
                    button.className = "btn-primary";
                }
                else
                {
                    button.className = "btn-default";
                }
            }
        });

        return options;
    }

    /**
     * map a flexible set of arguments into a single returned object
     * if args.length is already one just return it, otherwise
     * use the properties argument to map the unnamed args to
     * object properties
     * so in the latter case:
     * mapArguments(["foo", $.noop], ["message", "callback"])
     * -> { message: "foo", callback: $.noop }
     */
    function mapArguments(args, properties)
    {
        var argn = args.length;
        var options = {};

        if (argn < 1 || argn > 2)
        {
            throw new Error("Invalid argument length");
        }

        if (argn === 2 || typeof args[0] === "string")
        {
            options[properties[0]] = args[0];
            options[properties[1]] = args[1];
        }
        else
        {
            options = args[0];
        }

        return options;
    }

    /**
     * merge a set of default dialog options with user supplied arguments
     */
    function mergeArguments(defaults, args, properties)
    {
        return $.extend(
            // deep merge
            true,
            // ensure the target is an empty, unreferenced object
            {},
            // the base options object for this type of dialog (often just buttons)
            defaults,
            // args could be an object or array; if it's an array properties will
            // map it to a proper options object
            mapArguments(
                args,
                properties
            )
        );
    }

    /**
     * this entry-level method makes heavy use of composition to take a simple
     * range of inputs and return valid options suitable for passing to bootbox.dialog
     */
    function mergeDialogOptions(className, labels, properties, args)
    {
        //  build up a base set of dialog properties
        var baseOptions = {
            className: "bootbox-" + className,
            buttons: createLabels.apply(null, labels)
        };

        // ensure the buttons properties generated, *after* merging
        // with user args are still valid against the supplied labels
        return validateButtons(
            // merge the generated base properties with user supplied arguments
            mergeArguments(
                baseOptions,
                args,
                // if args.length > 1, properties specify how each arg maps to an object key
                properties
            ),
            labels
        );
    }

    /**
     * from a given list of arguments return a suitable object of button labels
     * all this does is normalise the given labels and translate them where possible
     * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
     */
    function createLabels()
    {
        var buttons = {};

        for (var i = 0, j = arguments.length; i < j; i++)
        {
            var argument = arguments[i];
            var key = argument.toLowerCase();
            var value = argument.toUpperCase();

            buttons[key] = {
                label: _t(value)
            };
        }

        return buttons;
    }

    function validateButtons(options, buttons)
    {
        var allowedButtons = {};
        each(buttons, function(key, value)
        {
            allowedButtons[value] = true;
        });

        each(options.buttons, function(key)
        {
            if (allowedButtons[key] === undefined)
            {
                throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
            }
        });

        return options;
    }

    exports.alert = function()
    {
        var options;

        options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

        if (options.callback && !$.isFunction(options.callback))
        {
            throw new Error("alert requires callback property to be a function when provided");
        }

        /**
         * overrides
         */
        options.buttons.ok.callback = options.onEscape = function()
        {
            if ($.isFunction(options.callback))
            {
                return options.callback();
            }
            return true;
        };

        return exports.dialog(options);
    };

    exports.confirm = function()
    {
        var options;

        options = mergeDialogOptions("confirm", ["confirm", "cancel"], ["message", "callback"], arguments);

        /**
         * overrides; undo anything the user tried to set they shouldn't have
         */
        options.buttons.cancel.callback = options.onEscape = function()
        {
            return options.callback(false);
        };

        options.buttons.confirm.callback = function()
        {
            return options.callback(true);
        };

        // confirm specific validation
        if (!$.isFunction(options.callback))
        {
            throw new Error("confirm requires a callback");
        }

        return exports.dialog(options);
    };

    exports.prompt = function()
    {
        var options;
        var defaults;
        var dialog;
        var form;
        var input;
        var shouldShow;
        var inputOptions;

        // we have to create our form first otherwise
        // its value is undefined when gearing up our options
        // @TODO this could be solved by allowing message to
        // be a function instead...
        form = $(templates.form);

        // prompt defaults are more complex than others in that
        // users can override more defaults
        // @TODO I don't like that prompt has to do a lot of heavy
        // lifting which mergeDialogOptions can *almost* support already
        // just because of 'value' and 'inputType' - can we refactor?
        defaults = {
            className: "bootbox-prompt",
            buttons: createLabels("confirm", "cancel"),
            value: "",
            inputType: "text"
        };

        options = validateButtons(
            mergeArguments(defaults, arguments, ["title", "callback"]), ["cancel", "confirm"]
        );

        // capture the user's show value; we always set this to false before
        // spawning the dialog to give us a chance to attach some handlers to
        // it, but we need to make sure we respect a preference not to show it
        shouldShow = (options.show === undefined) ? true : options.show;

        // check if the browser supports the option.inputType
        var html5inputs = ["date", "time", "number"];
        var i = document.createElement("input");
        i.setAttribute("type", options.inputType);
        if (html5inputs[options.inputType])
        {
            options.inputType = i.type;
        }

        /**
         * overrides; undo anything the user tried to set they shouldn't have
         */
        options.message = form;

        options.buttons.cancel.callback = options.onEscape = function()
        {
            return options.callback(null);
        };

        options.buttons.confirm.callback = function()
        {
            var value;

            switch (options.inputType)
            {
                case "text":
                case "textarea":
                case "email":
                case "select":
                case "date":
                case "time":
                case "number":
                case "password":
                    value = input.val();
                    break;

                case "checkbox":
                    var checkedItems = input.find("input:checked");

                    // we assume that checkboxes are always multiple,
                    // hence we default to an empty array
                    value = [];

                    each(checkedItems, function(_, item)
                    {
                        value.push($(item).val());
                    });
                    break;
            }

            return options.callback(value);
        };

        options.show = false;

        // prompt specific validation
        if (!options.title)
        {
            throw new Error("prompt requires a title");
        }

        if (!$.isFunction(options.callback))
        {
            throw new Error("prompt requires a callback");
        }

        if (!templates.inputs[options.inputType])
        {
            throw new Error("invalid prompt type");
        }

        // create the input based on the supplied type
        input = $(templates.inputs[options.inputType]);

        switch (options.inputType)
        {
            case "text":
            case "textarea":
            case "email":
            case "date":
            case "time":
            case "number":
            case "password":
                input.val(options.value);
                break;

            case "select":
                var groups = {};
                inputOptions = options.inputOptions || [];

                if (!inputOptions.length)
                {
                    throw new Error("prompt with select requires options");
                }

                each(inputOptions, function(_, option)
                {

                    // assume the element to attach to is the input...
                    var elem = input;

                    if (option.value === undefined || option.text === undefined)
                    {
                        throw new Error("given options in wrong format");
                    }


                    // ... but override that element if this option sits in a group

                    if (option.group)
                    {
                        // initialise group if necessary
                        if (!groups[option.group])
                        {
                            groups[option.group] = $("<optgroup/>").attr("label", option.group);
                        }

                        elem = groups[option.group];
                    }

                    elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
                });

                each(groups, function(_, group)
                {
                    input.append(group);
                });

                // safe to set a select's value as per a normal input
                input.val(options.value);
                break;

            case "checkbox":
                var values = $.isArray(options.value) ? options.value : [options.value];
                inputOptions = options.inputOptions || [];

                if (!inputOptions.length)
                {
                    throw new Error("prompt with checkbox requires options");
                }

                if (!inputOptions[0].value || !inputOptions[0].text)
                {
                    throw new Error("given options in wrong format");
                }

                // checkboxes have to nest within a containing element, so
                // they break the rules a bit and we end up re-assigning
                // our 'input' element to this container instead
                input = $("<div/>");

                each(inputOptions, function(_, option)
                {
                    var checkbox = $(templates.inputs[options.inputType]);

                    checkbox.find("input").attr("value", option.value);
                    checkbox.find("label").append(option.text);

                    // we've ensured values is an array so we can always iterate over it
                    each(values, function(_, value)
                    {
                        if (value === option.value)
                        {
                            checkbox.find("input").prop("checked", true);
                        }
                    });

                    input.append(checkbox);
                });
                break;
        }

        if (options.placeholder)
        {
            input.attr("placeholder", options.placeholder);
        }

        if (options.pattern)
        {
            input.attr("pattern", options.pattern);
        }

        // now place it in our form
        form.append(input);

        form.on("submit", function(e)
        {
            e.preventDefault();
            // Fix for SammyJS (or similar JS routing library) hijacking the form post.
            e.stopPropagation();
            // @TODO can we actually click *the* button object instead?
            // e.g. buttons.confirm.click() or similar
            dialog.find(".btn-primary").click();
        });

        dialog = exports.dialog(options);

        // clear the existing handler focusing the submit button...
        dialog.off("shown.bs.modal");

        // ...and replace it with one focusing our input, if possible
        dialog.on("shown.bs.modal", function()
        {
            input.focus();
        });

        if (shouldShow === true)
        {
            dialog.modal("show");
        }

        return dialog;
    };

    exports.dialog = function(options)
    {
        options = sanitize(options);

        var dialog = $(templates.dialog);
        var innerDialog = dialog.find(".modal-dialog");
        var body = dialog.find(".modal-body");
        var buttons = options.buttons;
        var buttonStr = "";
        var callbacks = {
            onEscape: options.onEscape
        };

        each(buttons, function(key, button)
        {

            // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
            // can we just build up button elements instead? slower but neater. Then button
            // can just become a template too
            buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
            callbacks[key] = button.callback;
        });

        body.find(".bootbox-body").html(options.message);

        if (options.animate === true)
        {
            dialog.addClass("fade");
        }

        if (options.className)
        {
            dialog.addClass(options.className);
        }

        if (options.size === "large")
        {
            innerDialog.addClass("modal-lg");
        }

        if (options.size === "small")
        {
            innerDialog.addClass("modal-sm");
        }

        if (options.title)
        {
            body.before(templates.header);
        }

        if (options.closeButton)
        {
            var closeButton = $(templates.closeButton);

            if (options.title)
            {
                dialog.find(".modal-header").prepend(closeButton);
            }
            else
            {
                closeButton.css("margin-top", "-10px").prependTo(body);
            }
        }

        if (options.title)
        {
            dialog.find(".modal-title").html(options.title);
        }

        if (buttonStr.length)
        {
            body.after(templates.footer);
            dialog.find(".modal-footer").html(buttonStr);
        }


        /**
         * Bootstrap event listeners; used handle extra
         * setup & teardown required after the underlying
         * modal has performed certain actions
         */

        dialog.on("hidden.bs.modal", function(e)
        {
            // ensure we don't accidentally intercept hidden events triggered
            // by children of the current dialog. We shouldn't anymore now BS
            // namespaces its events; but still worth doing
            if (e.target === this)
            {
                dialog.remove();
            }
        });

        /*
    dialog.on("show.bs.modal", function() {
      // sadly this doesn't work; show is called *just* before
      // the backdrop is added so we'd need a setTimeout hack or
      // otherwise... leaving in as would be nice
      if (options.backdrop) {
        dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
      }
    });
    */

        dialog.on("shown.bs.modal", function()
        {
            dialog.find(".btn-primary:first").focus();
        });

        /**
         * Bootbox event listeners; experimental and may not last
         * just an attempt to decouple some behaviours from their
         * respective triggers
         */

        dialog.on("escape.close.bb", function(e)
        {
            if (callbacks.onEscape)
            {
                processCallback(e, dialog, callbacks.onEscape);
            }
        });

        /**
         * Standard jQuery event listeners; used to handle user
         * interaction with our dialog
         */

        dialog.on("click", ".modal-footer button", function(e)
        {
            var callbackKey = $(this).data("bb-handler");

            processCallback(e, dialog, callbacks[callbackKey]);

        });

        dialog.on("click", ".bootbox-close-button", function(e)
        {
            // onEscape might be falsy but that's fine; the fact is
            // if the user has managed to click the close button we
            // have to close the dialog, callback or not
            processCallback(e, dialog, callbacks.onEscape);
        });

        dialog.on("keyup", function(e)
        {
            if (e.which === 27)
            {
                dialog.trigger("escape.close.bb");
            }
        });

        // the remainder of this method simply deals with adding our
        // dialogent to the DOM, augmenting it with Bootstrap's modal
        // functionality and then giving the resulting object back
        // to our caller

        $(options.container).append(dialog);

        dialog.modal(
        {
            backdrop: options.backdrop,
            keyboard: false,
            show: false
        });

        if (options.show)
        {
            dialog.modal("show");
        }

        // @TODO should we return the raw element here or should
        // we wrap it in an object on which we can expose some neater
        // methods, e.g. var d = bootbox.alert(); d.hide(); instead
        // of d.modal("hide");

        /*
    function BBDialog(elem) {
      this.elem = elem;
    }

    BBDialog.prototype = {
      hide: function() {
        return this.elem.modal("hide");
      },
      show: function() {
        return this.elem.modal("show");
      }
    };
    */

        return dialog;

    };

    exports.setDefaults = function()
    {
        var values = {};

        if (arguments.length === 2)
        {
            // allow passing of single key/value...
            values[arguments[0]] = arguments[1];
        }
        else
        {
            // ... and as an object too
            values = arguments[0];
        }

        $.extend(defaults, values);
    };

    exports.hideAll = function()
    {
        $(".bootbox").modal("hide");
    };


    /**
     * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
     * unlikely to be required. If this gets too large it can be split out into separate JS files.
     */
    var locales = {
        en:
        {
            OK: "OK",
            CANCEL: "Cancel",
            CONFIRM: "OK"
        },
        zh_cn:
        {
            OK: "确认",
            CANCEL: "取消",
            CONFIRM: "确认"
        },
        zh_tw:
        {
            OK: "確認",
            CANCEL: "取消",
            CONFIRM: "確認"
        }
    };

    exports.init = function(_$)
    {
        return init(_$ || $);
    };

    return exports;
}));

/* ========================================================================
 * ZUI: dashboard.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, Math)
{
    'use strict';

    var Dashboard = function(element, options)
    {
        this.$ = $(element);
        this.options = this.getOptions(options);
        this.draggable = this.$.hasClass('dashboard-draggable') || this.options.draggable;

        this.init();
    };

    Dashboard.DEFAULTS = {
        height: 360,
        shadowType: 'normal',
        sensitive: false,
        circleShadowSize: 100
    };

    Dashboard.prototype.getOptions = function(options)
    {
        options = $.extend(
        {}, Dashboard.DEFAULTS, this.$.data(), options);
        return options;
    };

    Dashboard.prototype.handleRemoveEvent = function()
    {
        var afterPanelRemoved = this.options.afterPanelRemoved;
        var tip = this.options.panelRemovingTip;
        this.$.on('click', '.remove-panel', function()
        {
            var panel = $(this).closest('.panel');
            var name = panel.data('name') || panel.find('.panel-heading').text().replace('\n', '').replace(/(^\s*)|(\s*$)/g, '');
            var index = panel.attr('data-id');

            if (tip === undefined || confirm(tip.format(name)))
            {
                panel.parent().remove();
                if (afterPanelRemoved && $.isFunction(afterPanelRemoved))
                {
                    afterPanelRemoved(index);
                }
            }
        });
    };

    Dashboard.prototype.handleRefreshEvent = function()
    {
        this.$.on('click', '.refresh-panel', function()
        {
            var panel = $(this).closest('.panel');
            refreshPanel(panel);
        });
    };

    Dashboard.prototype.handleDraggable = function()
    {
        var dashboard = this.$;
        var options = this.options;
        var circleShadow = options.shadowType === 'circle';
        var circleSize = options.circleShadowSize;
        var halfCircleSize = circleSize / 2;
        var afterOrdered = options.afterOrdered;

        this.$.addClass('dashboard-draggable');

        this.$.find('.panel-actions').mousedown(function(event)
        {
            event.preventDefault();
            event.stopPropagation();
        });

        var pColClass;
        this.$.find('.panel-heading').mousedown(function(event)
        {
            // console.log('--------------------------------');
            var panel = $(this).closest('.panel');
            var pCol = panel.parent();
            var row = panel.closest('.row');
            var dPanel = panel.clone().addClass('panel-dragging-shadow');
            var pos = panel.offset();
            var dPos = dashboard.offset();
            var dColShadow = row.find('.dragging-col-holder');
            var sWidth = panel.width(),
                sHeight = panel.height(),
                sX1, sY1, sX2, sY2, moveFn, dropCol, dropBefore, nextDropCol;
            if (!dColShadow.length)
            {
                dColShadow = $('<div class="dragging-col-holder"><div class="panel"></div></div>').removeClass('dragging-col').appendTo(row);
            }

            if (pColClass) dColShadow.removeClass(pColClass);
            dColShadow.addClass(pColClass = pCol.attr('class'));

            dColShadow.insertBefore(pCol).find('.panel').replaceWith(panel.clone().addClass('panel-dragging panel-dragging-holder'));

            dashboard.addClass('dashboard-dragging');
            panel.addClass('panel-dragging').parent().addClass('dragging-col');

            dPanel.css(
            {
                left: pos.left - dPos.left,
                top: pos.top - dPos.top,
                width: sWidth,
                height: sHeight
            }).appendTo(dashboard).data('mouseOffset',
            {
                x: event.pageX - pos.left + dPos.left,
                y: event.pageY - pos.top + dPos.top
            });

            if (circleShadow)
            {
                dPanel.addClass('circle');
                setTimeout(function()
                {
                    dPanel.css(
                    {
                        left: event.pageX - dPos.left - halfCircleSize,
                        top: event.pageY - dPos.top - halfCircleSize,
                        width: circleSize,
                        height: circleSize
                    }).data('mouseOffset',
                    {
                        x: dPos.left + halfCircleSize,
                        y: dPos.top + halfCircleSize
                    });
                }, 100);
            }

            $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
            event.preventDefault();

            function mouseMove(event)
            {
                // console.log('......................');
                var offset = dPanel.data('mouseOffset');
                sX1 = event.pageX - offset.x;
                sY1 = event.pageY - offset.y;
                sX2 = sX1 + sWidth;
                sY2 = sY1 + sHeight;
                dPanel.css(
                {
                    left: sX1,
                    top: sY1
                });

                row.find('.dragging-in').removeClass('dragging-in');
                dropBefore = false;
                dropCol = null;
                var area = 0,
                    thisArea;
                row.children(':not(.dragging-col)').each(function()
                {
                    var col = $(this);
                    if (col.hasClass('dragging-col-holder'))
                    {
                        dropBefore = (!options.sensitive) || (area < 100);
                        return true;
                    }
                    var p = col.children('.panel');
                    var pP = p.offset(),
                        pW = p.width(),
                        pH = p.height();
                    var pX = pP.left,
                        pY = pP.top;

                    if (options.sensitive)
                    {
                        pX -= dPos.left;
                        pY -= dPos.top;
                        thisArea = getIntersectArea(sX1, sY1, sX2, sY2, pX, pY, pX + pW, pY + pH);
                        if (thisArea > 100 && thisArea > area && thisArea > Math.min(getRectArea(sX1, sY1, sX2, sY2), getRectArea(pX, pY, pX + pW, pY + pH)) / 3)
                        {
                            area = thisArea;
                            dropCol = col;
                        }
                        // if(thisArea)
                        // {
                        //     console.log('panel ' + col.data('id'), '({0}, {1}, {2}, {3}), ({4}, {5}, {6}, {7})'.format(sX1, sY1, sX2, sY2, pX, pY, pX + pW, pY + pH));
                        // }
                    }
                    else
                    {
                        var mX = event.pageX,
                            mY = event.pageY;

                        if (mX > pX && mY > pY && mX < (pX + pW) && mY < (pY + pH))
                        {
                            // var dCol = row.find('.dragging-col');
                            dropCol = col;
                            return false;
                        }
                    }
                });

                if (dropCol)
                {
                    if (moveFn) clearTimeout(moveFn);
                    nextDropCol = dropCol;
                    moveFn = setTimeout(movePanel, 50);
                }
                event.preventDefault();
            }

            function movePanel()
            {
                if (nextDropCol)
                {
                    nextDropCol.addClass('dragging-in');
                    if (dropBefore) dColShadow.insertAfter(nextDropCol);
                    else dColShadow.insertBefore(nextDropCol);
                    dashboard.addClass('dashboard-holding');
                    moveFn = null;
                    nextDropCol = null;
                }
            }

            function mouseUp(event)
            {
                if (moveFn) clearTimeout(moveFn);

                var oldOrder = panel.data('order');
                panel.parent().insertAfter(dColShadow);
                var newOrder = 0;
                var newOrders = {};

                row.children(':not(.dragging-col-holder)').each(function()
                {
                    var p = $(this).children('.panel');
                    p.data('order', ++newOrder);
                    newOrders[p.attr('id')] = newOrder;
                    p.parent().attr('data-order', newOrder);
                });

                if (oldOrder != newOrders[panel.attr('id')])
                {
                    row.data('orders', newOrders);

                    if (afterOrdered && $.isFunction(afterOrdered))
                    {
                        afterOrdered(newOrders);
                    }
                }

                dPanel.remove();

                dashboard.removeClass('dashboard-holding');
                dashboard.find('.dragging-col').removeClass('dragging-col');
                dashboard.find('.panel-dragging').removeClass('panel-dragging');
                row.find('.dragging-in').removeClass('dragging-in');
                dashboard.removeClass('dashboard-dragging');
                $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                event.preventDefault();
            }
        });
    };

    Dashboard.prototype.handlePanelPadding = function()
    {
        this.$.find('.panel-body > table, .panel-body > .list-group').closest('.panel-body').addClass('no-padding');
    };

    Dashboard.prototype.handlePanelHeight = function()
    {
        var dHeight = this.options.height;

        this.$.find('.row').each(function()
        {
            var row = $(this);
            var panels = row.find('.panel');
            var height = row.data('height') || dHeight;

            if (typeof height != 'number')
            {
                height = 0;
                panels.each(function()
                {
                    height = Math.max(height, $(this).innerHeight());
                });
            }

            panels.each(function()
            {
                var $this = $(this);
                $this.find('.panel-body').css('height', height - $this.find('.panel-heading').outerHeight() - 2);
            });
        });
    };

    function refreshPanel(panel)
    {
        var url = panel.data('url');
        if (!url) return;
        panel.addClass('panel-loading').find('.panel-heading .icon-refresh,.panel-heading .icon-repeat').addClass('icon-spin');
        $.ajax(
        {
            url: url,
            dataType: 'html'
        }).done(function(data)
        {
            panel.find('.panel-body').html(data);
        }).fail(function()
        {
            panel.addClass('panel-error');
        }).always(function()
        {
            panel.removeClass('panel-loading');
            panel.find('.panel-heading .icon-refresh,.panel-heading .icon-repeat').removeClass('icon-spin');
        });
    }

    function getRectArea(x1, y1, x2, y2)
    {
        return Math.abs((x2 - x1) * (y2 - y1));
    }

    function isPointInner(x, y, x1, y1, x2, y2)
    {
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    }

    function getIntersectArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2)
    {
        var x1 = Math.max(ax1, bx1),
            y1 = Math.max(ay1, by1),
            x2 = Math.min(ax2, bx2),
            y2 = Math.min(ay2, by2);
        if (isPointInner(x1, y1, ax1, ay1, ax2, ay2) && isPointInner(x2, y2, ax1, ay1, ax2, ay2) && isPointInner(x1, y1, bx1, by1, bx2, by2) && isPointInner(x2, y2, bx1, by1, bx2, by2))
        {
            return getRectArea(x1, y1, x2, y2);
        }
        return 0;
    }

    Dashboard.prototype.init = function()
    {
        this.handlePanelHeight();
        this.handlePanelPadding();
        this.handleRemoveEvent();
        this.handleRefreshEvent();

        if (this.draggable) this.handleDraggable();

        var orderSeed = 0;
        this.$.find('.panel').each(function()
        {
            var $this = $(this);
            $this.data('order', ++orderSeed);
            if (!$this.attr('id'))
            {
                $this.attr('id', 'panel' + orderSeed);
            }
            if (!$this.attr('data-id'))
            {
                $this.attr('data-id', orderSeed);
            }

            refreshPanel($this);
        });
    };

    $.fn.dashboard = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data('zui.dashboard');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.dashboard', (data = new Dashboard(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.dashboard.Constructor = Dashboard;
}(jQuery, Math));

/* ========================================================================
 * ZUI: boards.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($){
    'use strict';

    if (!$.fn.droppable) throw new Error('droppable requires for boards');

    var Boards = function(element, options)
    {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.getLang();
        this.init();
    };

    Boards.DEFAULTS = {
        lang: 'zh-cn',
        langs:
        {
            'zh-cn':
            {
                append2end: '移动到末尾'
            },
            'zh-tw':
            {
                append2end: '移动到末尾'
            },
            'en':
            {
                append2end: 'Move to the end.'
            }
        }
    }; // default options

    Boards.prototype.getOptions = function(options)
    {
        options = $.extend(
        {}, Boards.DEFAULTS, this.$.data(), options);
        return options;
    };

    Boards.prototype.getLang = function()
    {
        var config = window.config;
        if (!this.options.lang)
        {
            if (typeof(config) != 'undefined' && config.clientLang)
            {
                this.options.lang = config.clientLang;
            }
            else
            {
                var hl = $('html').attr('lang');
                this.options.lang = hl ? hl : 'en';
            }
            this.options.lang = this.options.lang.replace(/-/, '_').toLowerCase();
        }
        this.lang = this.options.langs[this.options.lang] || this.options.langs[Boards.DEFAULTS.lang];
    };

    Boards.prototype.init = function()
    {
        var idSeed = 1;
        var lang = this.lang;
        this.$.find('.board-item:not(".disable-drop"), .board:not(".disable-drop")').each(function()
        {
            var $this = $(this);
            if ($this.attr('id'))
            {
                $this.attr('data-id', $this.attr('id'));
            }
            else if (!$this.attr('data-id'))
            {
                $this.attr('data-id', 'board' + (idSeed++));
            }

            if ($this.hasClass('board'))
            {
                $this.find('.board-list').append('<div class="board-item board-item-empty"><i class="icon-plus"></i> {append2end}</div>'.format(lang))
                    .append('<div class="board-item board-item-shadow"></div>'.format(lang));
            }
        });

        this.bind();
    };

    Boards.prototype.bind = function(items)
    {
        var $boards = this.$,
            setting = this.options;
        if (typeof(items) == 'undefined')
        {
            items = $boards.find('.board-item:not(".disable-drop, .board-item-shadow")');
        }

        items.droppable(
        {
            target: '.board-item:not(".disable-drop, .board-item-shadow")',
            flex: true,
            start: function(e)
            {
                $boards.addClass('dragging').find('.board-item-shadow').height(e.element.outerHeight());
            },
            drag: function(e)
            {
                $boards.find('.board.drop-in-empty').removeClass('drop-in-empty');
                if (e.isIn)
                {
                    var board = e.target.closest('.board').addClass('drop-in');
                    var shadow = board.find('.board-item-shadow');
                    var target = e.target;

                    $boards.addClass('drop-in').find('.board.drop-in').not(board).removeClass('drop-in');

                    shadow.insertBefore(target);

                    board.toggleClass('drop-in-empty', target.hasClass('board-item-empty'));
                }
            },
            drop: function(e)
            {
                if (e.isNew)
                {
                    var DROP = 'drop';
                    var result;
                    if (setting.hasOwnProperty(DROP) && $.isFunction(setting[DROP]))
                    {
                        result = setting[DROP](e);
                    }
                    if (result !== false) e.element.insertBefore(e.target);
                }
            },
            finish: function()
            {
                $boards.removeClass('dragging').removeClass('drop-in').find('.board.drop-in').removeClass('drop-in');
            }
        });
    };

    $.fn.boards = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data('zui.boards');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.boards', (data = new Boards(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.boards.Constructor = Boards;

    $(function()
    {
        $('[data-toggle="boards"]').boards();
    });
}(jQuery));

/* ========================================================================
 * ZUI: datatable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($)
{
    'use strict';

    var name = 'zui.datatable';
    var store = $.zui.store;

    var DataTable = function(element, options)
    {
        this.name = name;
        this.$ = $(element);
        this.isTable = (this.$[0].tagName === 'TABLE');
        this.firstShow = true;
        if (this.isTable)
        {
            this.$table = this.$;
            this.id = 'datatable-' + (this.$.attr('id') || $.zui.uuid());
        }
        else
        {
            this.$datatable = this.$.addClass('datatable');
            if (this.$.attr('id'))
            {
                this.id = this.$.attr('id');
            }
            else
            {
                this.id = 'datatable-' + $.zui.uuid();
                this.$.attr('id', this.id);
            }
        }
        this.getOptions(options);
        this.load();

        this.callEvent('ready');
    };

    // default options
    DataTable.DEFAULTS = {
        // Check options
        checkable: false, // added check icon to the head of rows
        checkByClickRow: true, // change check status by click anywhere on a row
        checkedClass: 'active', // apply CSS class to an checked row
        checkboxName: null,

        // Sort options
        sortable: false, // enable sorter

        // storage
        storage: true, // enable storage

        // fixed header of columns
        fixedHeader: true,      // fixed header
        fixedHeaderOffset: 0,   // set top offset of header when fixed
        fixedLeftWidth: '30%',  // set left width after first render
        fixedRightWidth: '30%', // set right width after first render
        flexHeadDrag: true,     // scroll flexarea by drag header
        scrollPos: 'in',        // scroll bar position: 'out' | 'in'

        // hover effection
        rowHover: true, // apply hover effection to row
        colHover: true, // apply hover effection to head
        hoverClass: 'hover',
        colHoverClass: 'col-hover',

        // Merge rows
        mergeRows: false, // Merge rows

        // custom columns size
        // customizable: false, // enable customizable
        minColWidth: 20, // min width of columns
        minFixedLeftWidth: 200, // min left width
        minFixedRightWidth: 200, // min right width
        minFlexAreaWidth: 200 // min flexarea width
    };

    // Get options
    DataTable.prototype.getOptions = function(options)
    {
        var $e = this.$;
        options = $.extend(
            {}, DataTable.DEFAULTS, this.$.data(), options);

        options.tableClass = options.tableClass || '';
        options.tableClass = ' ' + options.tableClass + ' table-datatable';

        $.each(['bordered', 'condensed', 'striped', 'condensed', 'fixed'], function(idx, cls)
        {
            cls = 'table-' + cls;
            if($e.hasClass(cls)) options.tableClass += ' ' + cls;
        });

        if ($e.hasClass('table-hover') || options.rowHover)
        {
            options.tableClass += ' table-hover';
        }

        this.options = options;
    };

    // Load data form options or table dom
    DataTable.prototype.load = function(data)
    {
        var options = this.options,
            cols;

        if($.isPlainObject(data))
        {
            this.data = data;
        }
        else if(typeof data === 'string')
        {
            var $table = $(data);
            if($table.length)
            {
                this.$table = $table.first();
                this.$table.data(name, this);
                this.isTable = true;
            }
            data = null;
        }
        else
        {
            data = options.data;
        }

        if (!data)
        {
            if (this.isTable)
            {
                data = {
                    cols: [],
                    rows: []
                };
                cols = data.cols;
                var rows = data.rows, i,
                    $th, $tr, $td, row, $t = this.$table, colSpan;

                $t.find('thead > tr:first').children('th').each(function()
                {
                    $th = $(this);
                    cols.push($.extend(
                    {
                        text: $th.html(),
                        flex: false || $th.hasClass('flex-col'),
                        width: 'auto',
                        cssClass: $th.attr('class'),
                        css: $th.attr('style'),
                        type: 'string',
                        ignore: $th.hasClass('ignore'),
                        sort: !$th.hasClass('sort-disabled'),
                        mergeRows: $th.attr('merge-rows')
                    }, $th.data()));
                });

                $t.find('tbody > tr').each(function()
                {
                    $tr = $(this);
                    row = $.extend(
                    {
                        data: [],
                        checked: false,
                        cssClass: $tr.attr('class'),
                        css: $tr.attr('style'),
                        id: $tr.attr('id')
                    }, $tr.data());

                    $tr.children('td').each(function()
                    {
                        $td = $(this);
                        colSpan = $td.attr('colspan') || 1;
                        row.data.push($.extend(
                        {
                            cssClass: $td.attr('class'),
                            css: $td.attr('style'),
                            text: $td.html(),
                            colSpan: colSpan
                        }, $td.data()));

                        if(colSpan > 1)
                        {
                            for(i = 1; i < colSpan; i++)
                            {
                                row.data.push({empty: true});
                            }
                        }
                    });

                    rows.push(row);
                });

                var $tfoot = $t.find('tfoot');
                if ($tfoot.length)
                {
                    data.footer = $('<table class="table' + options.tableClass + '"></table>').append($tfoot);
                }
            }
            else
            {
                throw new Error('No data avaliable!');
            }
        }

        data.flexStart = -1;
        data.flexEnd = -1;

        cols = data.cols;
        data.colsLength = cols.length;
        for (var i = 0; i < data.colsLength; ++i)
        {
            var col = cols[i];
            if (col.flex)
            {
                if (data.flexStart < 0)
                {
                    data.flexStart = i;
                }

                data.flexEnd = i;
            }
        }

        if (data.flexStart === 0 && data.flexEnd === data.colsLength)
        {
            data.flexStart = -1;
            data.flexEnd = -1;
        }

        data.flexArea = data.flexStart >= 0;
        data.fixedRight = data.flexEnd >= 0 && data.flexEnd < (data.colsLength - 1);
        data.fixedLeft = data.flexStart > 0;
        if (data.flexStart < 0 && data.flexEnd < 0)
        {
            data.fixedLeft = true;
            data.flexStart = data.colsLength;
            data.flexEnd = data.colsLength;
        }

        this.data = data;

        this.callEvent('afterLoad',
        {
            data: data
        });

        this.render();
    };

    // Render datatable
    DataTable.prototype.render = function()
    {
        var that = this;
        var $datatable = that.$datatable || (that.isTable ? $('<div class="datatable" id="' + that.id + '"/>') : that.$datatable),
            options = that.options,
            data = that.data,
            cols = that.data.cols,
            rows = that.data.rows;
        var checkable = options.checkable,
            $left,
            i,
            $right,
            $flex,
            dataRowSpan = '<div class="datatable-rows-span datatable-span"><div class="datatable-wrapper"><table class="table"></table></div></div>',
            dataHeadSpan = '<div class="datatable-head-span datatable-span"><div class="datatable-wrapper"><table class="table"><thead></thead></table></div></div>';

        $datatable.children('.datatable-head, .datatable-rows, .scroll-wrapper').remove();

        // Set css class to datatable by options
        $datatable.toggleClass('sortable', options.sortable);
        // $datatable.toggleClass('customizable', options.customizable);

        // Head
        var $head = $('<div class="datatable-head"/>'),
            $tr,
            $th,
            col;
        $left = $('<tr/>');
        $right = $('<tr/>');
        $flex = $('<tr/>');
        for (i = 0; i < cols.length; i++)
        {
            col = cols[i];
            $tr = i < data.flexStart ? $left : ((i >= data.flexStart && i <= data.flexEnd) ? $flex : $right);
            if(i === 0 && checkable)
            {
                $tr.append('<th data-index="check" class="check-all check-btn"><i class="icon-check-empty"></i></th>');
            }
            if(col.ignore) continue;

            $th = $('<th/>');

            // set sort class
            $th.toggleClass('sort-down', col.sort === 'down')
               .toggleClass('sort-up', col.sort === 'up')
               .toggleClass('sort-disabled', col.sort === false);

            $th.addClass(col.cssClass)
               .addClass(col.colClass)
               .html(col.text)
               .attr(
                {
                    'data-index' : i,
                    'data-type'  : col.type,
                    style        : col.css
                });


            $tr.append($th);
        }

        var $headSpan;
        if(data.fixedLeft)
        {
            $headSpan = $(dataHeadSpan);
            $headSpan.addClass('fixed-left')
                     // .find('.datatable-wrapper')
                     // .append('<div class="size-handle size-handle-head size-handle-left"></div>')
                     .find('table')
                     .addClass(options.tableClass)
                     .find('thead').append($left);
            $head.append($headSpan);
        }
        if (data.flexArea)
        {
            $headSpan = $(dataHeadSpan);
            $headSpan.addClass('flexarea')
                     .find('.datatable-wrapper')
                     .append('<div class="scrolled-shadow scrolled-in-shadow"></div><div class="scrolled-shadow scrolled-out-shadow"></div>')
                     .find('table')
                     .addClass(options.tableClass)
                     .find('thead').append($flex);
            $head.append($headSpan);
        }
        if (data.fixedRight)
        {
            $headSpan = $(dataHeadSpan);
            $headSpan.addClass('fixed-right')
                     // .find('.datatable-wrapper')
                     // .append('<div class="size-handle size-handle-head size-handle-right"></div>')
                     .find('table')
                     .addClass(options.tableClass)
                     .find('thead').append($right);
            $head.append($headSpan);
        }
        $datatable.append($head);

        // Rows
        var $rows = $('<div class="datatable-rows">');
        var $leftRow,
            $flexRow,
            $rightRow,
            // $tr,
            $td,
            $cTd,
            row,
            rowLen = rows.length,
            rowCol,
            rowColLen;
        $left = $('<tbody/>');
        $right = $('<tbody/>');
        $flex = $('<tbody/>');

        for (var r = 0; r < rowLen; ++r)
        {
            row = rows[r];

            // format row
            if(typeof row.id === 'undefined')
            {
                row.id = r;
            }
            row.index = r;

            $leftRow = $('<tr/>');
            $leftRow.addClass(row.cssClass)
                   .toggleClass(options.checkedClass, row.checked)
                   .attr(
                    {
                        'data-index' : r,
                        'data-id'    : row.id
                    });
            $flexRow = $leftRow.clone();
            $rightRow = $leftRow.clone();

            rowColLen = row.data.length;
            for (i = 0; i < rowColLen; ++i)
            {
                rowCol = row.data[i];
                if(i > 0 && rowCol.empty)
                {
                    continue;
                }

                $tr = i < data.flexStart ? $leftRow : ((i >= data.flexStart && i <= data.flexEnd) ? $flexRow : $rightRow);
                if(i === 0 && checkable)
                {
                    $cTd = $('<td data-index="check" class="check-row check-btn"><i class="icon-check-empty"></i></td>');
                    if(options.checkboxName)
                    {
                        $cTd.append('<input class="hide" type="checkbox" name="' + options.checkboxName + '" value="' + row.id + '">');
                    }
                    $tr.append($cTd);
                }

                if(cols[i].ignore) continue;

                // format row column
                if (!$.isPlainObject(rowCol))
                {
                    rowCol =
                    {
                        text: rowCol,
                        row: r,
                        index: i
                    };
                }
                else
                {
                    rowCol.row = r;
                    rowCol.index = i;
                }
                row.data[i] = rowCol;

                $td = $('<td/>');

                $td.html(rowCol.text)
                   .addClass(rowCol.cssClass)
                   .addClass(cols[i].colClass)
                   .attr('colspan', rowCol.colSpan)
                   .attr(
                    {
                        'data-row'   : r,
                        'data-index' : i,
                        'data-flex'  : false,
                        'data-type'  : cols[i].type,
                        style        : rowCol.css
                    });


                $tr.append($td);
            }

            $left.append($leftRow);
            $flex.append($flexRow);
            $right.append($rightRow);
        }

        var $rowSpan;
        if (data.fixedLeft)
        {
            $rowSpan = $(dataRowSpan);
            $rowSpan.addClass('fixed-left')
                    .find('table')
                    .addClass(options.tableClass)
                    .append($left);
            $rows.append($rowSpan);
        }
        if (data.flexArea)
        {
            $rowSpan = $(dataRowSpan);
            $rowSpan.addClass('flexarea')
                    .find('.datatable-wrapper')
                    .append('<div class="scrolled-shadow scrolled-in-shadow"></div><div class="scrolled-shadow scrolled-out-shadow"></div>')
                    .find('table')
                    .addClass(options.tableClass)
                    .append($flex);
            $rows.append($rowSpan);
        }
        if (data.fixedRight)
        {
            $rowSpan = $(dataRowSpan);
            $rowSpan.addClass('fixed-right')
                    .find('table')
                    .addClass(options.tableClass)
                    .append($right);
            $rows.append($rowSpan);
        }
        $datatable.append($rows);

        if(data.flexArea)
        {
            $datatable.append('<div class="scroll-wrapper"><div class="scroll-slide scroll-pos-' + options.scrollPos + '"><div class="bar"></div></div></div>');
        }

        var $oldFooter = $datatable.children('.datatable-footer').detach();
        if (data.footer)
        {
            $datatable.append($('<div class="datatable-footer"/>').append(data.footer));
            data.footer = null;
        }
        else if($oldFooter.length)
        {
            $datatable.append($oldFooter);
        }

        that.$datatable = $datatable.data(name, that);
        if (that.isTable && that.firstShow)
        {
            that.$table.attr('data-datatable-id', this.id).hide().after($datatable);
            that.firstShow = false;
        }

        that.bindEvents();
        that.refreshSize();

        that.callEvent('render');
    };

    // Bind global events
    DataTable.prototype.bindEvents = function()
    {
        var that       = this,
            data       = this.data,
            options    = this.options,
            store      = $.zui.store,
            $datatable = this.$datatable;

        var $dataSpans = that.$dataSpans = $datatable.children('.datatable-head, .datatable-rows').find('.datatable-span');
        var $rowsSpans = that.$rowsSpans = $datatable.children('.datatable-rows').children('.datatable-rows-span');
        var $headSpans = that.$headSpans = $datatable.children('.datatable-head').children('.datatable-head-span');
        var $cells     = that.$cells     = $dataSpans.find('td, th');
        var $dataCells = that.$dataCells = $cells.filter('td');
        that.$headCells = $cells.filter('th');
        var $rows      = that.$rows      = that.$rowsSpans.find('.table > tbody > tr');

        // handle row hover events
        if(options.rowHover)
        {
            var hoverClass = options.hoverClass;
            $rowsSpans.on('mouseenter', 'td', function()
            {
                $dataCells.filter('.' + hoverClass).removeClass(hoverClass);
                $rows.filter('.' + hoverClass).removeClass(hoverClass);

                $rows.filter('[data-index="' + $(this).addClass(hoverClass).closest('tr').data('index') + '"]').addClass(hoverClass);
            }).on('mouseleave', 'td', function()
            {
                $dataCells.filter('.' + hoverClass).removeClass(hoverClass);
                $rows.filter('.' + hoverClass).removeClass(hoverClass);
            });
        }

        // handle col hover events
        if (options.colHover)
        {
            var colHoverClass = options.colHoverClass;
            $headSpans.on('mouseenter', 'th', function()
            {
                $cells.filter('.' + colHoverClass).removeClass(colHoverClass);
                $cells.filter('[data-index="' + $(this).data('index') + '"]').addClass(colHoverClass);
            }).on('mouseleave', 'th', function()
            {
                $cells.filter('.' + colHoverClass).removeClass(colHoverClass);
            });
        }

        // handle srcoll for flex area
        if(data.flexArea)
        {
            var $scrollbar = $datatable.find('.scroll-slide'),
                // $flexArea = $datatable.find('.datatable-span.flexarea .table'),
                $flexArea = $datatable.find('.datatable-span.flexarea'),
                $fixedLeft = $datatable.find('.datatable-span.fixed-left'),
                // $flexTable = $datatable.find('.datatable-rows-span.flexarea .table');
                $flexTable = $datatable.find('.datatable-span.flexarea .table');
            var $bar = $scrollbar.children('.bar'),
                flexWidth,
                scrollWidth,
                tableWidth,
                lastBarLeft,
                barLeft,
                scrollOffsetStoreName = that.id + '_' + 'scrollOffset',
                firtScroll,
                left;

            that.width = $datatable.width();
            $datatable.resize(function()
            {
                that.width = $datatable.width();
            });

            var srollTable = function(offset, silence)
            {
                barLeft = Math.max(0, Math.min(flexWidth - scrollWidth, offset));
                if (!silence)
                {
                    $datatable.addClass('scrolling');
                }
                $bar.css('left', barLeft);
                left = 0 - Math.floor((tableWidth - flexWidth) * barLeft / (flexWidth - scrollWidth));
                $flexTable.css('left', left);
                lastBarLeft = barLeft;

                $datatable.toggleClass('scrolled-in', barLeft > 2)
                    .toggleClass('scrolled-out', barLeft < flexWidth - scrollWidth - 2);

                if(options.storage) store.pageSet(scrollOffsetStoreName, barLeft);
            };
            var resizeScrollbar = function()
            {
                flexWidth = $flexArea.width();
                $scrollbar.width(flexWidth).css('left', $fixedLeft.width());
                tableWidth = $flexTable.width();
                scrollWidth = Math.floor((flexWidth * flexWidth) / tableWidth);
                $bar.css('width', scrollWidth);
                $flexTable.css('min-width', flexWidth);
                $datatable.toggleClass('show-scroll-slide', tableWidth > flexWidth);

                if (!firtScroll && flexWidth !== scrollWidth)
                {
                    firtScroll = true;
                    srollTable(store.pageGet(scrollOffsetStoreName, 0), true); // todo: unused?
                }

                if ($datatable.hasClass('size-changing'))
                {
                    srollTable(barLeft, true);
                }
            };
            // $scrollbar.resize(resizeScrollbar); // todo: unuseful?
            $flexArea.resize(resizeScrollbar);
            if(options.storage) resizeScrollbar();

            var dragOptions = {
                move: false,
                stopPropagation: true,
                drag: function(e)
                {
                    srollTable($bar.position().left + e.smallOffset.x * (e.element.hasClass('bar') ? 1 : -1));
                },
                finish: function()
                {
                    $datatable.removeClass('scrolling');
                }
            };

            $bar.draggable(dragOptions);
            if (options.flexHeadDrag)
            {
                $datatable.find('.datatable-head-span.flexarea').draggable(dragOptions);
            }

            $scrollbar.mousedown(function(event)
            {
                var x = event.pageX - $scrollbar.offset().left;
                srollTable(x - (scrollWidth / 2));
            });
        }

        //  handle row check events
        if (options.checkable)
        {
            var checkedStatusStoreName = that.id + '_checkedStatus',
                checkedClass = options.checkedClass,
                rowId;
            var syncChecks = function()
            {
                var $checkRows = $rowsSpans.first().find('.table > tbody > tr');
                var $checkedRows = $checkRows.filter('.' + checkedClass);
                $checkRows.find('.check-row input:checkbox').prop('checked', false);
                var checkedStatus = {
                    checkedAll: $checkRows.length === $checkedRows.length && $checkedRows.length > 0,
                    checks: $checkedRows.map(function()
                    {
                        rowId = $(this).data('id');
                        if(options.checkboxName)
                        {
                            $(this).find('.check-row input:checkbox').prop('checked', true);
                        }
                        return rowId;
                    }).toArray()
                };
                $.each(data.rows, function(index, value)
                {
                    value.checked = ($.inArray(value.id, checkedStatus.checks) > -1);
                });
                $headSpans.find('.check-all').toggleClass('checked', checkedStatus.checkedAll);

                if(options.storage) store.pageSet(checkedStatusStoreName, checkedStatus);

                that.callEvent('checksChanged',
                {
                    checks: checkedStatus
                });
            };

            this.$rowsSpans.on('click', options.checkByClickRow ? 'tr' : '.check-row', function()
            {
                $rows.filter('[data-index="' + $(this).closest('tr').data('index') + '"]').toggleClass(checkedClass);
                syncChecks();
            });

            var checkAllEventName = 'click.zui.datatable.check-all';
            this.$datatable.off(checkAllEventName).on(checkAllEventName, '.check-all', function()
            {
                $rows.toggleClass(checkedClass, $(this).toggleClass('checked').hasClass('checked'));
                syncChecks();
            }).on('click', '.check-none', function()
            {
                $rows.toggleClass(checkedClass, false);
                syncChecks();
            }).on('click', '.check-inverse', function()
            {
                $rows.toggleClass(checkedClass);
                syncChecks();
            });

            if(options.storage)
            {
                var checkedStatus = store.pageGet(checkedStatusStoreName);
                if (checkedStatus)
                {
                    $headSpans.find('.check-all').toggleClass('checked', checkedStatus.checkedAll);
                    if (checkedStatus.checkedAll)
                    {
                        $rows.addClass(checkedClass);
                    }
                    else
                    {
                        $rows.removeClass(checkedClass);
                        $.each(checkedStatus.checks, function(index, ele)
                        {
                            $rows.filter('[data-id="' + ele + '"]').addClass(checkedClass);
                        });
                    }
                    if (checkedStatus.checks.length)
                    {
                        syncChecks();
                    }
                }
            }
        }

        // fixed header
        if(options.fixedHeader)
        {
            var offsetTop,
                height,
                scrollTop,
                $dataTableHead = $datatable.children('.datatable-head'),
                navbarHeight = options.fixedHeaderOffset || $('.navbar.navbar-fixed-top').height() || 0;
            var handleScroll = function()
            {
                offsetTop = $datatable.offset().top;
                scrollTop = $(window).scrollTop();
                height = $datatable.height();
                $datatable.toggleClass('head-fixed', (scrollTop + navbarHeight) > offsetTop && (scrollTop + navbarHeight) < (offsetTop + height));
                if($datatable.hasClass('head-fixed'))
                {
                    $dataTableHead.css(
                    {
                        width: $datatable.width(),
                        top: navbarHeight
                    });
                }
                else
                {
                    $dataTableHead.attr('style', '');
                }
            };

            $(window).scroll(handleScroll);
            handleScroll();
        }

        // handle sort
        if (options.sortable)
        {
            $headSpans.on('click', 'th:not(.sort-disabled, .check-btn)', function()
            {
                if ($datatable.hasClass('size-changing')) return;
                that.sortTable($(this));
            });

            if(options.storage) that.sortTable();
        }
        else if (options.mergeRows)
        {
            this.mergeRows();
        }
    };

    DataTable.prototype.mergeRows = function()
    {
        var $cells = this.$rowsSpans.find('.table > tbody > tr > td');
        var cols = this.data.cols;
        for(var i = 0; i < cols.length; i++)
        {
            var col = cols[i];
            if(col.mergeRows)
            {
                var $cs = $cells.filter('[data-index="' + i + '"]');
                if($cs.length > 1)
                {
                    var $lastCell, rowspan;
                    $cs.each(function()
                    {
                        var $cell = $(this);
                        if($lastCell)
                        {
                            if($cell.html() === $lastCell.html())
                            {
                                rowspan = $lastCell.attr('rowspan') || 1;
                                if(typeof rowspan !== 'number')
                                {
                                    rowspan = parseInt(rowspan);
                                    if(isNaN(rowspan)) rowspan = 1;
                                }

                                $lastCell.attr('rowspan', rowspan + 1).css('vertical-align', 'middle');
                                $cell.remove();
                            }
                            else
                            {
                                $lastCell = $cell;
                            }
                        }
                        else
                        {
                            $lastCell = $cell;
                        }
                    });
                }
            }
        }
    };

    // Sort table
    DataTable.prototype.sortTable = function($th)
    {
        var store = $.zui.store,
            options = this.options;
        var sorterStoreName = this.id + '_datatableSorter';
        var sorter = options.storage ? store.pageGet(sorterStoreName) : null;

        if (!$th)
        {
            if (sorter)
            {
                $th = this.$headCells.filter('[data-index="' + sorter.index + '"]').addClass('sort-' + sorter.type);
            }
            else
            {
                $th = this.$headCells.filter('.sort-up, .sort-down').first();
            }
        }

        if (!$th.length)
        {
            return;
        }


        var data = this.data;
        var cols = data.cols,
            rows = data.rows,
            $headCells = this.$headCells,
            sortUp,
            type,
            index;

        sortUp = !$th.hasClass('sort-up');
        $headCells.removeClass('sort-up sort-down');
        $th.addClass(sortUp ? 'sort-up' : 'sort-down');

        index = $th.data('index');
        sortUp = $th.hasClass('sort-up');

        $.each(cols, function(idx, col)
        {
            if (idx != index && (col.sort === 'up' || col.sort === 'down'))
            {
                col.sort = true;
            }
            else if (idx == index)
            {
                col.sort = sortUp ? 'up' : 'down';
                type = col.type;
            }
        });

        var valA, valB, result, $dataRows = this.$dataCells.filter('[data-index="' + index + '"]');
        rows.sort(function(cellA, cellB)
        {
            cellA = cellA.data[index];
            cellB = cellB.data[index];
            valA = $dataRows.filter('[data-row="' + cellA.row + '"]').text();
            valB = $dataRows.filter('[data-row="' + cellB.row + '"]').text();
            if (type === 'number')
            {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }
            else if (type === 'date')
            {
                valA = Date.parse(valA);
                valB = Date.parse(valB);
            }
            else
            {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            result = valA > valB ? 1 : (valA < valB ? -1 : 0);
            if (sortUp)
            {
                result = result * (-1);
            }
            return result;
        });

        var $rows = this.$rows,
            lastRows = [],
            $row, $lastRow, $r;
        $.each(rows, function(idx, row)
        {
            $row = $rows.filter('[data-index="' + row.index + '"]');
            $row.each(function(rIdx)
            {
                $r = $(this);
                $lastRow = lastRows[rIdx];
                if ($lastRow)
                {
                    $lastRow.after($r);
                }
                else
                {
                    $r.parent().prepend($r);
                }
                lastRows[rIdx] = $r;
            });
        });

        sorter = {
            index: index,
            type: sortUp ? 'up' : 'down'
        };

        // save sort with local storage
        if(options.storage) store.pageSet(sorterStoreName, sorter);

        this.callEvent('sort',
        {
            sorter: sorter
        });
    };

    // Refresh size
    DataTable.prototype.refreshSize = function()
    {
        var $datatable = this.$datatable,
            options = this.options,
            rows = this.data.rows,
            cols = this.data.cols,
            i;

        $datatable.find('.datatable-span.fixed-left').css('width', options.fixedLeftWidth);
        $datatable.find('.datatable-span.fixed-right').css('width', options.fixedRightWidth);

        var findMaxHeight = function($cells)
            {
                var mx = 0, $cell, rowSpan;
                $cells.css('height', 'auto');
                $cells.each(function()
                {
                    $cell = $(this);
                    rowSpan = $cell.attr('rowspan');
                    if(!rowSpan || rowSpan == 1) mx = Math.max(mx, $cell.outerHeight());
                });
                return mx;
            },
            $dataCells = this.$dataCells,
            $cells = this.$cells,
            $headCells = this.$headCells;

        // set width of data cells
        for (i = 0; i < cols.length; ++i)
        {
            $cells.filter('[data-index="' + i + '"]').css('width', cols[i].width);
        }

        // set height of head cells
        var headMaxHeight = findMaxHeight($headCells);
        $headCells.css('min-height', headMaxHeight).css('height', headMaxHeight);

        // set height of data cells
        var $rowCells;
        for (i = 0; i < rows.length; ++i)
        {
            $rowCells = $dataCells.filter('[data-row="' + i + '"]');
            var rowMaxHeight = findMaxHeight($rowCells);
            $rowCells.css('min-height', rowMaxHeight).css('height', rowMaxHeight);
        }
    };

    // Call event
    DataTable.prototype.callEvent = function(name, params)
    {
        var result = this.$.callEvent(name + '.' + this.name, params, this).result;
        return !(result !== undefined && (!result));
    };

    $.fn.datatable = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data(name);
            var options = typeof option == 'object' && option;

            if (!data) $this.data(name, (data = new DataTable(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.datatable.Constructor = DataTable;
}(jQuery));

/* ========================================================================
 * ZUI: color.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, Math, window){
    'use strict';

    var hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var namedColors = {
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

    /* color */
    var Color = function(r, g, b, a)
    {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;

        if (a !== undefined) this.a = clamp(number(a), 1);

        if (r !== undefined && g !== undefined && b !== undefined)
        {
            this.r = parseInt(clamp(number(r), 255));
            this.g = parseInt(clamp(number(g), 255));
            this.b = parseInt(clamp(number(b), 255));
        }
        else if (r !== undefined)
        {
            var type = typeof(r);
            if (type == 'string')
            {
                r = r.toLowerCase();
                if (r === 'transparent')
                {
                    this.a = 0;
                }
                else if (namedColors[r])
                {
                    this.rgb(hexToRgb(namedColors[r]));
                }
                else
                {
                    this.rgb(hexToRgb(r));
                }
            }
            else if (type == 'number' && g === undefined)
            {
                this.r = parseInt(clamp(r, 255));
                this.g = this.r;
                this.b = this.r;
            }
            else if (type == 'object' && r.hasOwnProperty('r'))
            {
                this.r = parseInt(clamp(number(r.r), 255));
                if (r.hasOwnProperty('g')) this.g = parseInt(clamp(number(r.g), 255));
                if (r.hasOwnProperty('b')) this.b = parseInt(clamp(number(r.b), 255));
                if (r.hasOwnProperty('a')) this.a = clamp(number(r.a), 1);
            }
            else if (type == 'object' && r.hasOwnProperty('h'))
            {
                var hsl = {
                    h: clamp(number(r.h), 360),
                    s: 1,
                    l: 1,
                    a: 1
                };
                if (r.hasOwnProperty('s')) hsl.s = clamp(number(r.s), 1);
                if (r.hasOwnProperty('l')) hsl.l = clamp(number(r.l), 1);
                if (r.hasOwnProperty('a')) hsl.a = clamp(number(r.a), 1);

                this.rgb(hslToRgb(hsl));
            }
        }
    };

    Color.prototype.rgb = function(rgb)
    {
        if (rgb !== undefined)
        {
            if (typeof(rgb) == 'object')
            {
                if (rgb.hasOwnProperty('r')) this.r = parseInt(clamp(number(rgb.r), 255));
                if (rgb.hasOwnProperty('g')) this.g = parseInt(clamp(number(rgb.g), 255));
                if (rgb.hasOwnProperty('b')) this.b = parseInt(clamp(number(rgb.b), 255));
                if (rgb.hasOwnProperty('a')) this.a = clamp(number(rgb.a), 1);
            }
            else
            {
                var v = parseInt(number(rgb));
                this.r = v;
                this.g = v;
                this.b = v;
            }
            return this;
        }
        else return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        };
    };

    Color.prototype.hue = function(hue)
    {
        var hsl = this.toHsl();

        if (hue === undefined) return hsl.h;
        else
        {
            hsl.h = clamp(number(hue), 360);
            this.rgb(hslToRgb(hsl));

            return this;
        }
    };

    Color.prototype.darken = function(amount)
    {
        var hsl = this.toHsl();

        hsl.l -= amount / 100;
        hsl.l = clamp(hsl.l, 1);

        this.rgb(hslToRgb(hsl));
        return this;
    };

    Color.prototype.clone = function()
    {
        return new Color(this.r, this.g, this.b, this.a);
    };

    Color.prototype.lighten = function(amount)
    {
        return this.darken(-amount);
    };

    Color.prototype.fade = function(amount)
    {
        this.a = clamp(amount / 100, 1);

        return this;
    };

    Color.prototype.spin = function(amount)
    {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;

        hsl.h = hue < 0 ? 360 + hue : hue;
        this.rgb(hslToRgb(hsl));

        return this;
    };

    Color.prototype.toHsl = function()
    {
        var r = this.r / 255,
            g = this.g / 255,
            b = this.b / 255,
            a = this.a;

        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2,
            d = max - min;

        if (max === min)
        {
            h = s = 0;
        }
        else
        {
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max)
            {
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
            h: h * 360,
            s: s,
            l: l,
            a: a
        };
    };

    Color.prototype.luma = function()
    {
        var r = this.r / 255,
            g = this.g / 255,
            b = this.b / 255;

        r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
        g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
        b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    Color.prototype.saturate = function(amount)
    {
        var hsl = this.toHsl();

        hsl.s += amount / 100;
        hsl.s = clamp(hsl.s);

        this.rgb(hslToRgb(hsl));

        return this;
    };

    Color.prototype.desaturate = function(amount)
    {
        return this.saturate(-amount);
    };

    Color.prototype.contrast = function(dark, light, threshold)
    {
        if (typeof light === 'undefined') light = new Color(255, 255, 255, 1);
        else light = new Color(light);
        if (typeof dark === 'undefined') dark = new Color(0, 0, 0, 1);
        else dark = new Color(dark);

        if (this.a < 0.5) return dark;

        if (threshold === undefined) threshold = 0.43;
        else threshold = number(threshold);

        if (dark.luma() > light.luma())
        {
            var t = light;
            light = dark;
            dark = t;
        }

        if (this.luma() < threshold)
        {
            return light;
        }
        else
        {
            return dark;
        }
    };

    Color.prototype.hexStr = function()
    {
        var r = this.r.toString(16),
            g = this.g.toString(16),
            b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;

        return '#' + r + g + b;
    };

    Color.prototype.toCssStr = function()
    {
        if (this.a > 0)
        {
            if (this.a < 1)
            {
                return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
            }
            else
            {
                return this.hexStr();
            }
        }
        else
        {
            return 'transparent';
        }
    };

    Color.prototype.isColor = isColor;

    /* helpers */
    function hexToRgb(hex)
    {
        hex = hex.toLowerCase();
        if (hex && hexReg.test(hex))
        {
            var i;
            if (hex.length === 4)
            {
                var hexNew = '#';
                for (i = 1; i < 4; i += 1)
                {
                    hexNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
                }
                hex = hexNew;
            }

            var hexChange = [];
            for (i = 1; i < 7; i += 2)
            {
                hexChange.push(parseInt('0x' + hex.slice(i, i + 2)));
            }
            return {
                r: hexChange[0],
                g: hexChange[1],
                b: hexChange[2],
                a: 1
            };
        }
        else
        {
            throw new Error('function hexToRgb: Wrong hex string! (hex: ' + hex + ')');
        }
    }

    function isColor(hex)
    {
        return typeof(hex) === 'string' && (hex.toLowerCase() === 'transparent' || namedColors[hex.toLowerCase()] || hexReg.test($.trim(hex.toLowerCase())));
    }

    function hslToRgb(hsl)
    {
        var h = hsl.h,
            s = hsl.s,
            l = hsl.l,
            a = hsl.a;

        h = (number(h) % 360) / 360;
        s = clamp(number(s));
        l = clamp(number(l));
        a = clamp(number(a));

        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        var m1 = l * 2 - m2;

        var r = {
            r: hue(h + 1 / 3) * 255,
            g: hue(h) * 255,
            b: hue(h - 1 / 3) * 255,
            a: a
        };

        return r;

        function hue(h)
        {
            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
            if (h * 6 < 1)
            {
                return m1 + (m2 - m1) * h * 6;
            }
            else if (h * 2 < 1)
            {
                return m2;
            }
            else if (h * 3 < 2)
            {
                return m1 + (m2 - m1) * (2 / 3 - h) * 6;
            }
            else
            {
                return m1;
            }
        }
    }

    function fit(n, end, start)
    {
        if (start === undefined) start = 0;
        if (end === undefined) end = 255;

        return Math.min(Math.max(n, start), end);
    }

    function clamp(v, max)
    {
        return fit(v, max);
    }

    function number(n)
    {
        if (typeof(n) == 'number') return n;
        return parseFloat(n);
    }

    $.zui({Color: Color});

}(jQuery, Math, window));
