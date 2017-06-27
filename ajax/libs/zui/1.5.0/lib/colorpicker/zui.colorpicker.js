/*!
 * ZUI: 颜色选择器 - v1.5.0 - 2016-09-06
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: ColorPicker.js [1.5.0+]
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var name = 'zui.colorPicker'; // modal name
    var TEAMPLATE = '<div class="colorpicker"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown"><span class="cp-title"></span><i class="ic"></i></button><ul class="dropdown-menu clearfix"></ul></div>';
    var LANG = {
        zh_cn: {
            errorTip: "不是有效的颜色值"
        },
        zh_tw: {
            errorTip: "不是有效的顏色值"
        },
        en: {
            errorTip: "Not a valid color value"
        }
    };

    // The ColorPicker modal class
    var ColorPicker = function(element, options) {
        this.name = name;
        this.$ = $(element);

        this.getOptions(options);
        this.init();
    };

    // default options
    ColorPicker.DEFAULTS = {
        colors: ['#00BCD4', '#388E3C', '#3280fc', '#3F51B5', '#9C27B0', '#795548', '#F57C00', '#F44336', '#E91E63'],
        pullMenuRight: true,
        wrapper: 'btn-wrapper',
        tileSize: 30,
        lineCount: 5,
        optional: true,
        tooltip: 'top',
        icon: 'caret-down',
        // btnTip: 'Tool tip in button'
    };

    ColorPicker.prototype.init = function() {
        var options = this.options,
            that = this;
        
        this.$picker = $(TEAMPLATE).addClass(options.wrapper);
        this.$picker.find('.cp-title').toggle(options.title !== undefined).text(options.title);
        this.$menu = this.$picker.find('.dropdown-menu').toggleClass('pull-right', options.pullMenuRight);
        this.$btn = this.$picker.find('.btn.dropdown-toggle');
        this.$btn.find('.ic').addClass('icon-' + options.icon);
        if(options.btnTip) {
            this.$picker.attr('data-toggle', 'tooltip').tooltip({title: options.btnTip, placement: options.tooltip, container: 'body'});
        }
        this.$.attr('data-provide', null).after(this.$picker);

        // init colors
        this.colors = {};
        $.each(this.options.colors, function(idx, rawColor) {
            if($.zui.Color.isColor(rawColor)) {
                var color = new $.zui.Color(rawColor);
                that.colors[color.toCssStr()] = color;
            }
        });

        this.updateColors();
        var that = this;
        this.$picker.on('click', '.cp-tile', function() {
            that.setValue($(this).data('color'));
        });
        var $input = this.$;
        var setInputColor = function() {
            var val = $input.val();
            var isColor = $.zui.Color.isColor(val);
            $input.parent().toggleClass('has-error', !isColor && !(options.optional && val === ''));
            if(isColor) {
                that.setValue(val, true);
            } else {
                if(options.optional && val === '') {
                    $input.tooltip('hide');
                } else if(!$input.is(':focus')) {
                    $input.tooltip('show', options.errorTip);
                }
            }
        }
        if($input.is('input:not([type=hidden])')) {
            if(options.tooltip) {
                $input.attr('data-toggle', 'tooltip').tooltip({trigger: 'manual', placement: options.tooltip, tipClass: 'tooltip-danger', container: 'body'});
            }
            $input.on('keyup paste input change', setInputColor);
        } else {
            $input.appendTo(this.$picker);
        }
        setInputColor();
    };

    ColorPicker.prototype.addColor = function(color) {
        var hex = color.toCssStr(),
            options = this.options;

        if(!this.colors[hex]) {
            this.colors[hex] = color;
        }

        var $a = $('<a href="###" class="cp-tile"></a>', {
            titile: color
        }).data('color', color).css({
            'color': color.contrast().toCssStr(),
            'background': hex,
            'border-color': color.luma() > 0.43 ? '#ccc' : 'transparent'
        }).attr('data-color', hex);
        this.$menu.append($('<li/>').css({width: options.tileSize, height: options.tileSize}).append($a));
        if(options.optional) {
            this.$menu.find('.cp-tile.empty').parent().detach().appendTo(this.$menu);
        }
    };

    ColorPicker.prototype.updateColors = function(colors) {
        var $picker = this.$picker, 
            $menu = this.$menu.empty(), 
            options = this.options,
            colors = colors || this.colors,
            that = this;
        var bestLineCount = 0;
        $.each(colors, function(idx, color) {
            that.addColor(color);
            bestLineCount++;
        });
        if(options.optional) {
            var $li = $('<li><a class="cp-tile empty" href="###"></a></li>').css({width: options.tileSize, height: options.tileSize});
            this.$menu.append($li);
            bestLineCount++;
        }
        $menu.css('width', Math.min(bestLineCount, options.lineCount) * options.tileSize + 6);
    };

    ColorPicker.prototype.setValue = function(color, notSetInput) {
        var options = this.options;
        this.$menu.find('.cp-tile.active').removeClass('active');
        var hex = '';
        if(color) {
            var c = new $.zui.Color(color);
            hex = c.toCssStr().toLowerCase();
            this.$btn.css({
                background: hex,
                color: c.contrast().toCssStr(),
                borderColor: c.luma() > 0.43 ? '#ccc' : hex
            });
            if(!this.colors[hex]) {
                this.addColor(c);
            }
            if(!notSetInput && this.$.val().toLowerCase() !== hex) {
                this.$.val(hex).trigger('change');
            }
            this.$menu.find('.cp-tile[data-color=' + hex + ']').addClass('active');
            this.$.tooltip('hide');
            this.$.trigger('colorchange', c);
        } else {
            this.$btn.attr('style', null);
            if(!notSetInput && this.$.val() !== '') {
                this.$.val(hex).trigger('change');
            }
            if(options.optional) {
                this.$.tooltip('hide');
            }
            this.$menu.find('.cp-tile.empty').addClass('active');
            this.$.trigger('colorchange', null);
        }

        if(options.updateBorder) {
            $(options.updateBorder).css('border-color', hex);
        }
        if(options.updateBackground) {
            $(options.updateBackground).css('background-color', hex);
        }
        if(options.updateColor) {
            $(options.updateText).css('color', hex);
        }
        if(options.updateText) {
            $(options.updateText).text(hex);
        }
    };

    // Get and init options
    ColorPicker.prototype.getOptions = function(options) {
        var thisOptions = $.extend({}, ColorPicker.DEFAULTS, this.$.data(), options);
        if(typeof thisOptions.colors === 'string') thisOptions.colors = thisOptions.colors.split(',');
        var lang = (thisOptions.lang || $.zui.clientLang()).toLowerCase();
        if(!thisOptions.errorTip) {
            thisOptions.errorTip = LANG[lang].errorTip;
        }
        if(!$.fn.tooltip) thisOptions.btnTip = false;
        this.options = thisOptions;
    };

    // Extense jquery element
    $.fn.colorPicker = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(name);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(name, (data = new ColorPicker(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.colorPicker.Constructor = ColorPicker;

    // Auto call colorPicker after document load complete
    $(function() {
        $('[data-provide="colorpicker"]').colorPicker();
    });
}(jQuery));
