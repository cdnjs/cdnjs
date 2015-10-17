/*!
 * Bootstrap Colorpicker
 * http://mjaalnir.github.io/bootstrap-colorpicker/
 *
 * Originally written by (c) 2012 Stefan Petre
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 */
(function($) {
    'use strict';

    var CPGlobal = {
        // translate a format from Color object to a string
        translateFormats: {
            'rgb': function() {
                var rgb = this.color.toRGB();
                return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            },
            'rgba': function() {
                var rgb = this.color.toRGB();
                return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';
            },
            'hsl': function() {
                var hsl = this.color.toHSL();
                return 'hsl(' + Math.round(hsl.h * 360) + ',' + Math.round(hsl.s * 100) + '%,' + Math.round(hsl.l * 100) + '%)';
            },
            'hsla': function() {
                var hsl = this.color.toHSL();
                return 'hsla(' + Math.round(hsl.h * 360) + ',' + Math.round(hsl.s * 100) + '%,' + Math.round(hsl.l * 100) + '%,' + hsl.a + ')';
            },
            'hex': function() {
                return this.color.toHex();
            }
        },
        slidersHorizontal: {
            saturation: {
                maxLeft: 100,
                maxTop: 100,
                callLeft: 'setSaturation',
                callTop: 'setLightness'
            },
            hue: {
                maxLeft: 100,
                maxTop: 0,
                callLeft: 'setHue',
                callTop: false
            },
            alpha: {
                maxLeft: 100,
                maxTop: 0,
                callLeft: 'setAlpha',
                callTop: false
            }
        },
        sliders: {
            saturation: {
                maxLeft: 100,
                maxTop: 100,
                callLeft: 'setSaturation',
                callTop: 'setLightness'
            },
            hue: {
                maxLeft: 0,
                maxTop: 100,
                callLeft: false,
                callTop: 'setHue'
            },
            alpha: {
                maxLeft: 0,
                maxTop: 100,
                callLeft: false,
                callTop: 'setAlpha'
            }
        },
        // HSBtoRGB from RaphaelJS
        // https://github.com/DmitryBaranovskiy/raphael/
        RGBtoHSB: function(r, g, b, a) {
            r /= 255;
            g /= 255;
            b /= 255;

            var H, S, V, C;
            V = Math.max(r, g, b);
            C = V - Math.min(r, g, b);
            H = (C === 0 ? null :
                V === r ? (g - b) / C :
                V === g ? (b - r) / C + 2 :
                (r - g) / C + 4
            );
            H = ((H + 360) % 6) * 60 / 360;
            S = C === 0 ? 0 : C / V;
            return {
                h: H || 1,
                s: S,
                b: V,
                a: a || 1
            };
        },
        HueToRGB: function(p, q, h) {
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
            if ((h * 6) < 1) {
                return p + (q - p) * h * 6;
            } else if ((h * 2) < 1) {
                return q;
            } else if ((h * 3) < 2) {
                return p + (q - p) * ((2 / 3) - h) * 6;
            } else {
                return p;
            }
        },
        HSLtoRGB: function(h, s, l, a) {
            if (s < 0) {
                s = 0;
            }
            var q;
            if (l <= 0.5) {
                q = l * (1 + s);
            } else {
                q = l + s - (l * s);
            }

            var p = 2 * l - q;

            var tr = h + (1 / 3);
            var tg = h;
            var tb = h - (1 / 3);

            var r = Math.round(CPGlobal.HueToRGB(p, q, tr) * 255);
            var g = Math.round(CPGlobal.HueToRGB(p, q, tg) * 255);
            var b = Math.round(CPGlobal.HueToRGB(p, q, tb) * 255);
            return [r, g, b, a || 1];
        },
        // a set of RE's that can match strings and generate color tuples.
        // from John Resig color plugin
        // https://github.com/jquery/jquery-color/
        stringParsers: [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [
                    execResult[1],
                    execResult[2],
                    execResult[3],
                    execResult[4]
                ];
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [
                    2.55 * execResult[1],
                    2.55 * execResult[2],
                    2.55 * execResult[3],
                    execResult[4]
                ];
            }
        }, {
            re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            parse: function(execResult) {
                return [
                    parseInt(execResult[1], 16),
                    parseInt(execResult[2], 16),
                    parseInt(execResult[3], 16)
                ];
            }
        }, {
            re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
            parse: function(execResult) {
                return [
                    parseInt(execResult[1] + execResult[1], 16),
                    parseInt(execResult[2] + execResult[2], 16),
                    parseInt(execResult[3] + execResult[3], 16)
                ];
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            space: 'hsla',
            parse: function(execResult) {
                return [
                    execResult[1] / 360,
                    execResult[2] / 100,
                    execResult[3] / 100,
                    execResult[4]
                ];
            }
        }],
        template: '<div class="colorpicker dropdown-menu">' +
            '<div class="colorpicker-saturation"><i><b></b></i></div>' +
            '<div class="colorpicker-hue"><i></i></div>' +
            '<div class="colorpicker-alpha"><i></i></div>' +
            '<div class="colorpicker-color"><div /></div>' +
            '</div>'
    };

    // Color object
    var Color = function(val) {
        this.value = {
            h: 0,
            s: 0,
            b: 0,
            a: 1
        };
        this.setColor(val);
    };

    Color.prototype = {
        constructor: Color,
        //parse a string to HSB
        setColor: function(val) {
            val = val.toLowerCase();
            var that = this;
            $.each(CPGlobal.stringParsers, function(i, parser) {
                var match = parser.re.exec(val),
                    values = match && parser.parse(match),
                    space = parser.space || 'rgba';
                if (values) {
                    if (space === 'hsla') {
                        that.value = CPGlobal.RGBtoHSB.apply(null, CPGlobal.HSLtoRGB.apply(null, values));
                    } else {
                        that.value = CPGlobal.RGBtoHSB.apply(null, values);
                    }
                    return false;
                }
                return true;
            });
        },
        setHue: function(h) {
            this.value.h = 1 - h;
        },
        setSaturation: function(s) {
            this.value.s = s;
        },
        setLightness: function(b) {
            this.value.b = 1 - b;
        },
        setAlpha: function(a) {
            this.value.a = parseInt((1 - a) * 100, 10) / 100;
        },
        // HSBtoRGB from RaphaelJS
        // https://github.com/DmitryBaranovskiy/raphael/
        toRGB: function(h, s, v, a) {
            h = h || this.value.h;
            s = s || this.value.s;
            v = v || this.value.b;
            a = a || this.value.a;

            var r, g, b, i, f, p, q, t;
            if (h && s === undefined && v === undefined) {
                s = h.s, v = h.v, h = h.h;
            }
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0:
                    r = v, g = t, b = p;
                    break;
                case 1:
                    r = q, g = v, b = p;
                    break;
                case 2:
                    r = p, g = v, b = t;
                    break;
                case 3:
                    r = p, g = q, b = v;
                    break;
                case 4:
                    r = t, g = p, b = v;
                    break;
                case 5:
                    r = v, g = p, b = q;
                    break;
            }
            return {
                r: Math.floor(r * 255),
                g: Math.floor(g * 255),
                b: Math.floor(b * 255),
                a: a
            };
        },
        toHex: function(h, s, b, a) {
            var rgb = this.toRGB(h, s, b, a);
            return '#' + ((1 << 24) | (parseInt(rgb.r) << 16) | (parseInt(rgb.g) << 8) | parseInt(rgb.b)).toString(16).substr(1);
        },
        toHSL: function(h, s, b, a) {
            if (!h) {
                h = this.value.h;
                s = this.value.s;
                b = this.value.b;
            }
            var H = h,
                L = (2 - s) * b,
                S = s * b;
            if (L > 0 && L <= 1) {
                S /= L;
            } else {
                S /= 2 - L;
            }
            L /= 2;
            if (S > 1) {
                S = 1;
            }
            return {
                h: H,
                s: S,
                l: L,
                a: a || this.value.a
            };
        }
    };

    var _guid = 0;

    // Picker object

    var Colorpicker = function(element, options) {
        _guid++;
        this.element = $(element).attr('data-colorpicker-guid', _guid);
        var format = options.format || this.element.data('color-format') || 'hex';
        this.format = CPGlobal.translateFormats[format];
        this.isInput = this.element.is('input');
        this.component = this.element.is('.colorpicker-component') ? this.element.find('.add-on, .input-group-addon') : false;
        this.container = options.container || false;
        this.disabled = false;

        var disabled = options.disabled || this.element.data('disabled');
        if (disabled) {
            this.disabled = true;
            if (this.isInput) {
                this.element.attr('disabled', 'disabled');
            } else {
                this.element.find('input').attr('disabled', 'disabled');
            }
        }

        this.picker = $(CPGlobal.template).attr('data-colorpicker-guid', _guid)
        if (!this.container) {
            this.picker.appendTo($('body'));
        } else {
            this.picker.appendTo(this.container);
            this.picker.addClass('colorpicker-inline');
        }

        this.picker.on('mousedown.colorpicker', $.proxy(this.mousedown, this));

        this.isHorizontal = options.horizontal;
        if (this.isHorizontal) {
            this.picker.addClass('colorpicker-horizontal');
        }

        if (this.isInput) {
            this.element.on({
                'focus.colorpicker': $.proxy(this.show, this),
                'keyup.colorpicker': $.proxy(this.update, this)
            });
            if (!this.element.hasClass('colorpicker-inline')) {
                this.element.on({
                    'focusout.colorpicker': $.proxy(this.hide, this)
                });
            }
        } else if (this.component) {
            this.element.on({
                'keyup.colorpicker': $.proxy(this.updateComponent, this)
            });
            this.component.on({
                'click.colorpicker': $.proxy(this.show, this)
            });
        } else {
            this.element.on({
                'click.colorpicker': $.proxy(this.show, this)
            });
        }
        if (format === 'rgba' || format === 'hsla') {
            this.picker.addClass('alpha');
            this.alpha = this.picker.find('.colorpicker-alpha')[0].style;
        }

        if (this.component) {
            this.picker.find('.colorpicker-color').hide();
            this.preview = this.element.find('i')[0].style;
        } else {
            this.preview = this.picker.find('div:last')[0].style;
        }

        this.base = this.picker.find('div:first')[0].style;
        this.update();

        $($.proxy(function() {
            this.element.trigger('create', [this]);
        }, this));
    };

    Colorpicker.prototype = {
        constructor: Colorpicker,
        show: function(e) {

            //don't show it if it's disabled
            if (this.disabled)
                return;

            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            $(window).on('resize.colorpicker', $.proxy(this.place, this));
            if (!this.isInput) {
                if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
            $(document).on({
                'mousedown.colorpicker': $.proxy(this.hide, this)
            });
            this.element.trigger({
                type: 'showPicker',
                color: this.color
            });
        },
        updateComponent: function() {
            var value = $(this.element).children("input").val();
            if (value) {
                this.element.data('color', value);
                this.update();
            }
        },
        update: function() {
            var color = this.isInput ? this.element.prop('value') : this.element.data('color');
            if (typeof color === "undefined" || color === null) {
                color = '#000000';
            }
            this.color = new Color(color);
            this.picker.find('i')
                .eq(0).css({
                    left: this.color.value.s * 100,
                    top: 100 - this.color.value.b * 100
                }).end()
                .eq(1).css('top', 100 * (1 - this.color.value.h)).end()
                .eq(2).css('top', 100 * (1 - this.color.value.a));
            if (this.component) {
                this.component.find('i').css('background-color', this.format());
            }
            this.previewColor();
        },
        hide: function() {
            this.picker.hide();
            $(window).off('resize', this.place);
            $(document).off({
                'mousedown': this.hide
            });
            if (!this.isInput) {
                if (this.component) {
                    //if the input value is empty, do not set any color
                    if (this.element.find('input').val() !== '') {
                        this.element.find('input').prop('value', this.format.call(this)).trigger('change');
                    }
                }
                this.element.data('color', this.format.call(this));
            } else {
                //if the input value is empty, do not set any color
                if (this.element.val() !== '') {
                    this.element.prop('value', this.format.call(this)).trigger('change');
                }
            }
            this.element.trigger({
                type: 'hidePicker',
                color: this.color
            });
        },
        place: function() {
            var offset = this.component ? this.component.offset() : this.element.offset();
            this.picker.css({
                top: offset.top + this.height,
                left: offset.left
            });
        },
        disable: function() {
            this.disabled = true;
            if (this.isInput) {
                this.element.attr('disabled', 'disabled').trigger('disable');
            } else {
                this.element.find("input").attr('disabled', 'disabled').trigger('disable');
            }
        },
        enable: function() {
            this.disabled = false;
            if (this.isInput) {
                this.element.removeAttr('disabled').trigger('enable');
            } else {
                this.element.find("input").removeAttr('disabled').trigger('enable');
            }
        },
        destroy: function() {
            $('.colorpicker[data-colorpicker-guid=' + this.element.attr('data-colorpicker-guid') + ']').remove();
            this.element.removeData('colorpicker').removeAttr('data-colorpicker-guid').off('.colorpicker');
            if (this.component !== false) {
                this.component.off('.colorpicker');
            }
            this.element.removeClass('colorpicker-element');
            this.element.trigger("destroy", [this]);
        },
        setValue: function(value) {
            // set the input or component value
            if (this.isInput) {
                this.element.prop('value', value);
            } else {
                this.element.find('input').val(value);
                this.element.data('color', value);
            }
            this.update();
            this.element.trigger({
                type: 'changeColor',
                color: this.color
            });
        },
        //preview color change
        previewColor: function() {
            try {
                this.preview.backgroundColor = this.format.call(this);
            } catch (e) {
                this.preview.backgroundColor = this.color.toHex();
            }
            //set the color for brightness/saturation slider
            this.base.backgroundColor = this.color.toHex(this.color.value.h, 1, 1, 1);
            //set te color for alpha slider
            if (this.alpha) {
                this.alpha.backgroundColor = this.color.toHex();
            }
        },
        pointer: null,
        slider: null,
        mousedown: function(e) {
            e.stopPropagation();
            e.preventDefault();

            var target = $(e.target);

            //detect the slider and set the limits and callbacks
            var zone = target.closest('div');
            if (!zone.is('.colorpicker')) {
                var sliderOptions = this.isHorizontal ? CPGlobal.slidersHorizontal : CPGlobal.sliders;
                if (zone.is('.colorpicker-saturation')) {
                    this.slider = $.extend({}, sliderOptions.saturation);
                } else if (zone.is('.colorpicker-hue')) {
                    this.slider = $.extend({}, sliderOptions.hue);
                } else if (zone.is('.colorpicker-alpha')) {
                    this.slider = $.extend({}, sliderOptions.alpha);
                } else {
                    return false;
                }
                var offset = zone.offset();
                //reference to knob's style
                this.slider.knob = zone.find('i')[0].style;
                this.slider.left = e.pageX - offset.left;
                this.slider.top = e.pageY - offset.top;
                this.pointer = {
                    left: e.pageX,
                    top: e.pageY
                };
                //trigger mousemove to move the knob to the current position
                $(document).on({
                    'mousemove.colorpicker': $.proxy(this.mousemove, this),
                    'mouseup.colorpicker': $.proxy(this.mouseup, this)
                }).trigger('mousemove');
            }
            return false;
        },
        mousemove: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var left = Math.max(
                0,
                Math.min(
                    this.slider.maxLeft,
                    this.slider.left + ((e.pageX || this.pointer.left) - this.pointer.left)
                )
            );
            var top = Math.max(
                0,
                Math.min(
                    this.slider.maxTop,
                    this.slider.top + ((e.pageY || this.pointer.top) - this.pointer.top)
                )
            );
            this.slider.knob.left = left + 'px';
            this.slider.knob.top = top + 'px';
            if (this.slider.callLeft) {
                this.color[this.slider.callLeft].call(this.color, left / 100);
            }
            if (this.slider.callTop) {
                this.color[this.slider.callTop].call(this.color, top / 100);
            }
            this.previewColor();

            // Set input value on mousemove
            if (!this.isInput) {
                try {
                    this.element.find('input').val(this.format.call(this)).trigger('change');
                } catch (e) {
                    this.element.find('input').val(this.color.toHex()).trigger('change');
                }
            } else {
                try {
                    this.element.val(this.format.call(this)).trigger('change');
                } catch (e) {
                    this.element.val(this.color.toHex()).trigger('change');
                }
            }

            this.element.trigger({
                type: 'changeColor',
                color: this.color
            });
            return false;
        },
        mouseup: function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(document).off({
                mousemove: this.mousemove,
                mouseup: this.mouseup
            });
            return false;
        }
    };

    $.fn.colorpicker = function(option, value) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('colorpicker'),
                options = typeof option === 'object' && option;
            if (!data) {
                if (option !== "destroy") {
                    $this.addClass('colorpicker-element').data('colorpicker', (data = new Colorpicker(this, $.extend({}, $.fn.colorpicker.defaults, options))));
                }
            } else {
                if (typeof option === 'string') {
                    data[option](value);
                }
            }
        });
    };

    $.fn.colorpicker.defaults = {};

    $.fn.colorpicker.Constructor = Colorpicker;

})(window.jQuery);
