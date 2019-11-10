/*!
 * ZUI - v1.2.0 - 2014-11-18
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: auto-trigger.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($)
{
    'use strict';

    var AutoTrigger = function(element, options)
    {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    AutoTrigger.DEFAULTS = {
        trigger: 'toggle',
        selector: null,
        animate: 'slide',
        easing: 'linear',
        animateSpeed: 'fast',
        events: 'click',
        preventDefault: true,
        cancelBubble: true,
        target: null
        //,before:
        //,after:
    }; // default options

    AutoTrigger.prototype.getOptions = function(options)
    {
        options = $.extend(
        {}, AutoTrigger.DEFAULTS, this.$.data(), options);
        return options;
    };

    AutoTrigger.prototype.init = function()
    {
        this.bindEvents();
    };

    AutoTrigger.prototype.bindEvents = function()
    {
        var options = this.options,
            i;
        this.bindTrigger(options);

        if ($.isArray(options.triggers))
        {
            for (i in options.triggers)
            {
                this.bindTrigger($.extend(
                {}, options, options.triggers[i]));
            }
        }
        else if (typeof options.triggers === 'string')
        {
            /* events,trigger,target,data */
            var triggers = options.triggers.split('|');
            for (i in triggers)
            {
                var ops = triggers[i].split(',', 4);
                if (ops.length < 2) continue;
                var option = {};
                if (ops[0]) option.events = ops[0];
                if (ops[1]) option.trigger = ops[1];
                if (ops[2]) option.target = ops[2];
                if (ops[3]) option.data = ops[3];

                this.bindTrigger($.extend(
                {}, options, option));
            }
        }
    };

    AutoTrigger.prototype.bindTrigger = function(options)
    {
        var that = this;
        that.$.on(options.events, options.selector, function(event)
        {
            var target = (!options.target) || options.target == 'self' ? that.$ : $(options.target);
            var data = {
                event: event,
                element: this,
                target: target,
                options: options
            };
            if (!$.callEvent(options.before, data, that)) return;

            if ($.isFunction(options.trigger))
            {
                $.callEvent(options.trigger, data, that);
            }
            else
            {
                var type = options.trigger;
                if (type === 'toggle')
                {
                    type = target.hasClass('hide') ? 'show' : 'hide';
                }
                var params;
                switch (type)
                {
                    case 'toggle':
                        target.toggle();
                        break;
                    case 'show':
                        params = {
                            duration: options.animateSpeed,
                            easing: options.easing
                        };

                        target.removeClass('hide');
                        if (options.animate === 'slide')
                        {
                            target.slideDown(params);
                        }
                        else if (options.animate === 'fade')
                        {
                            target.fadeIn(params);
                        }
                        else
                        {
                            target.show(params);
                        }
                        break;
                    case 'hide':
                        params = {
                            duration: options.animateSpeed,
                            easing: options.easing,
                            complete: function()
                            {
                                target.addClass('hide');
                            }
                        };
                        if (options.animate === 'slide')
                        {
                            target.slideUp(params);
                        }
                        else if (options.animate === 'fade')
                        {
                            target.fadeOut(params);
                        }
                        else
                        {
                            target.hide(params);
                        }
                        break;
                    case 'addClass':
                    case 'removeClass':
                    case 'toggleClass':
                        target[type](options.data);
                        break;
                }
            }

            $.callEvent(options.after, data, that);

            if (options.preventDefault) event.preventDefault();
            if (options.cancelBubble) event.stopPropagation();
        });
    };

    $.fn.autoTrigger = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data('zui.autoTrigger');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.autoTrigger', (data = new AutoTrigger(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.autoTrigger.Constructor = AutoTrigger;

    $(function()
    {
        $('[data-toggle="autoTrigger"]').autoTrigger();
        $('[data-toggle="toggle"]').autoTrigger();
        $('[data-toggle="show"]').autoTrigger(
        {
            trigger: 'show'
        });
        $('[data-toggle="hide"]').autoTrigger(
        {
            trigger: 'hide'
        });
        $('[data-toggle="addClass"]').autoTrigger(
        {
            trigger: 'addClass'
        });
        $('[data-toggle="removeClass"]').autoTrigger(
        {
            trigger: 'removeClass'
        });
        $('[data-toggle="toggleClass"]').autoTrigger(
        {
            trigger: 'toggleClass'
        });
    });
}(jQuery));
