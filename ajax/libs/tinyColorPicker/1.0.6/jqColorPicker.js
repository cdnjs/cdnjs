(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(root, require('jquery'), require('colors'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery', 'colors'], function (jQuery, Colors) {
            return factory(root, jQuery, Colors);
        });
    } else {
        factory(root, root.jQuery, root.Colors);
    }
}(this, function(window, $, Colors, undefined){
    'use strict';

    var $document = $(document),
        _instance = $(),
        _colorPicker,
        _color,
        _options,

        _$trigger, _$UI, 
        _$z_slider, _$xy_slider,
        _$xy_cursor, _$z_cursor , _$alpha , _$alpha_cursor,

        _pointermove = 'touchmove.tcp mousemove.tcp pointermove.tcp',
        _pointerdown = 'touchstart.tcp mousedown.tcp pointerdown.tcp',
        _pointerup = 'touchend.tcp mouseup.tcp pointerup.tcp',
        _GPU = false,
        _round = Math.round,
        _animate = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame || function(cb){cb()},
        _html = '<div class="cp-color-picker"><div class="cp-z-slider"><div c' +
            'lass="cp-z-cursor"></div></div><div class="cp-xy-slider"><div cl' +
            'ass="cp-white"></div><div class="cp-xy-cursor"></div></div><div ' +
            'class="cp-alpha"><div class="cp-alpha-cursor"></div></div></div>',
            // 'grunt-contrib-uglify' puts all this back to one single string...
        _css = '.cp-color-picker{position:absolute;overflow:hidden;padding:6p' +
            'x 6px 0;background-color:#444;color:#bbb;font-family:Arial,Helve' +
            'tica,sans-serif;font-size:12px;font-weight:400;cursor:default;bo' +
            'rder-radius:5px}.cp-color-picker>div{position:relative;overflow:' +
            'hidden}.cp-xy-slider{float:left;height:128px;width:128px;margin-' +
            'bottom:6px;background:linear-gradient(to right,#FFF,rgba(255,255' +
            ',255,0))}.cp-white{height:100%;width:100%;background:linear-grad' +
            'ient(rgba(0,0,0,0),#000)}.cp-xy-cursor{position:absolute;top:0;w' +
            'idth:10px;height:10px;margin:-5px;border:1px solid #fff;border-r' +
            'adius:100%;box-sizing:border-box}.cp-z-slider{float:right;margin' +
            '-left:6px;height:128px;width:20px;background:linear-gradient(red' +
            ' 0,#f0f 17%,#00f 33%,#0ff 50%,#0f0 67%,#ff0 83%,red 100%)}.cp-z-' +
            'cursor{position:absolute;margin-top:-4px;width:100%;border:4px s' +
            'olid #fff;border-color:transparent #fff;box-sizing:border-box}.c' +
            'p-alpha{clear:both;width:100%;height:16px;margin:6px 0;backgroun' +
            'd:linear-gradient(to right,#444,rgba(0,0,0,0))}.cp-alpha-cursor{' +
            'position:absolute;margin-left:-4px;height:100%;border:4px solid ' +
            '#fff;border-color:#fff transparent;box-sizing:border-box}',

        ColorPicker = function(options) {
            _color = this.color = new Colors(options);
            _options = _color.options;
            _colorPicker = this;
        };

    ColorPicker.prototype = {
        render: preRender,
        toggle: toggle
    };

    function extractValue(elm) {
        return elm.value || elm.getAttribute('value') ||
            $(elm).css('background-color') || '#fff';
    }

    function resolveEventType(event) {
        event = event.originalEvent && event.originalEvent.touches ?
            event.originalEvent.touches[0] : event;

        return event.originalEvent ? event.originalEvent : event;
    }

    function findElement($elm) {
        return $($elm.find(_options.doRender)[0] || $elm[0]);
    }

    function toggle(event) {
        var $this = $(this),
            position = $this.offset(),
            $window = $(window),
            gap = _options.gap;

        if (event) {
            _$trigger = findElement($this);
            _$trigger._colorMode = _$trigger.data('colorMode');

            _colorPicker.$trigger = $this;

            (_$UI || build()).css({
                // 'width': _$UI[0]._width,
                'left': (_$UI[0]._left = position.left) -
                    ((_$UI[0]._left += _$UI[0]._width -
                    ($window.scrollLeft() + $window.width())) + gap > 0 ?
                    _$UI[0]._left + gap : 0),
                'top': (_$UI[0]._top = position.top + $this.outerHeight()) -
                    ((_$UI[0]._top += _$UI[0]._height -
                    ($window.scrollTop() + $window.height())) + gap > 0 ?
                    _$UI[0]._top + gap : 0)
            }).show(_options.animationSpeed, function() {
                if (event === true) { // resize, scroll
                    return;
                }
                _$alpha._width = _$alpha.width();
                _$xy_slider._width = _$xy_slider.width();
                _$xy_slider._height = _$xy_slider.height();
                _$z_slider._height = _$z_slider.height();
                _color.setColor(extractValue(_$trigger[0]));

                preRender(true);
            })
            .off('.tcp').on(_pointerdown,
                '.cp-xy-slider,.cp-z-slider,.cp-alpha', pointerdown);
        } else if (_colorPicker.$trigger) {
            $(_$UI).hide(_options.animationSpeed, function() {
                preRender(false);
                _colorPicker.$trigger = null;
            }).off('.tcp');
        }
    }

    function build() {
        $('head').append('<style type="text/css" id="tinyColorPickerStyles">' +
            (_options.css || _css) + (_options.cssAddon || '') + '</style>');

        return _colorPicker.$UI = _$UI =
            $(_html).css({'margin': _options.margin})
            .appendTo('body')
            .show(0, function() {
                var $this = $(this);

                _GPU = _options.GPU && $this.css('perspective') !== undefined;
                _$z_slider = $('.cp-z-slider', this);
                _$xy_slider = $('.cp-xy-slider', this);
                _$xy_cursor = $('.cp-xy-cursor', this);
                _$z_cursor = $('.cp-z-cursor', this);
                _$alpha = $('.cp-alpha', this).toggle(!!_options.opacity);
                _$alpha_cursor = $('.cp-alpha-cursor', this);
                _options.buildCallback.call(_colorPicker, $this);
                $this.prepend('<div>').children().eq(0).css('width',
                    $this.children().eq(0).width() // stabilizer
                );
                this._width = this.offsetWidth;
                this._height = this.offsetHeight;
            }).hide();
    }

    function pointerdown(e) {
        var action = this.className
                .replace(/cp-(.*?)(?:\s*|$)/, '$1').replace('-', '_');

        if ((e.button || e.which) > 1) return;

        e.preventDefault && e.preventDefault();
        e.returnValue = false;

        _$trigger._offset = $(this).offset();

        (action = action === 'xy_slider' ? xy_slider :
            action === 'z_slider' ? z_slider : alpha)(e);
        preRender();

        $document.on(_pointerup, function(e) {
            $document.off('.tcp');
        }).on(_pointermove, function(e) {
            action(e);
            preRender();
        });
    }

    function xy_slider(event) {
        var e = resolveEventType(event),
            x = e.pageX - _$trigger._offset.left,
            y = e.pageY - _$trigger._offset.top;

        _color.setColor({
            s: x / _$xy_slider._width * 100,
            v: 100 - (y / _$xy_slider._height * 100)
        }, 'hsv');
    }

    function z_slider(event) {
        var z = resolveEventType(event).pageY - _$trigger._offset.top;

        _color.setColor({h: 360 - (z / _$z_slider._height * 360)}, 'hsv');
    }

    function alpha(event) {
        var x = resolveEventType(event).pageX - _$trigger._offset.left,
            alpha = x / _$alpha._width;

        _color.setColor({}, 'rgb', alpha);
    }

    function preRender(toggled) {
        var colors = _color.colors,
            hueRGB = colors.hueRGB,
            RGB = colors.RND.rgb,
            HSL = colors.RND.hsl,
            dark = '#222',
            light = '#ddd',
            colorText = _color.toString(_$trigger._colorMode, _options.forceAlpha),
            HUEContrast = colors.HUELuminance > 0.22 ? dark : light,
            alphaContrast = colors.rgbaMixBlack.luminance > 0.22 ? dark : light,
            h = (1 - colors.hsv.h) * _$z_slider._height,
            s = colors.hsv.s * _$xy_slider._width,
            v = (1 - colors.hsv.v) * _$xy_slider._height,
            a = colors.alpha * _$alpha._width,
            translate3d = _GPU ? 'translate3d' : '',
            triggerValue = _$trigger[0].value,
            hasNoValue = _$trigger[0].hasAttribute('value') && // question this
                triggerValue === '' && toggled !== undefined;

        _$xy_slider._css = {
            backgroundColor: 'rgb(' +
                hueRGB.r + ',' + hueRGB.g + ',' + hueRGB.b + ')'};
        _$xy_cursor._css = {
            transform: translate3d + '(' + s + 'px, ' + v + 'px, 0)',
            left: !_GPU ? s : '',
            top: !_GPU ? v : '',
            borderColor : colors.RGBLuminance > 0.22 ? dark : light
        };
        _$z_cursor._css = {
            transform: translate3d + '(0, ' + h + 'px, 0)',
            top: !_GPU ? h : '',
            borderColor : 'transparent ' + HUEContrast
        };
        _$alpha._css = {backgroundColor: '#' + colors.HEX};
        _$alpha_cursor._css = {
            transform: translate3d + '(' + a + 'px, 0, 0)',
            left: !_GPU ? a : '',
            borderColor : alphaContrast + ' transparent'
        };
        _$trigger._css = {
            backgroundColor : hasNoValue ? '' : colorText,
            color: hasNoValue ? '' :
                colors.rgbaMixBGMixCustom.luminance > 0.22 ? dark : light
        };
        _$trigger.text = hasNoValue ? '' : triggerValue !== colorText ? colorText : '';

        toggled !== undefined ? render(toggled) : _animate(render);
    }

    // As _animate() is actually requestAnimationFrame(), render() gets called
    // decoupled from any pointer action (whenever the browser decides to do
    // so) as an event. preRender() is coupled to toggle() and all pointermove
    // actions; that's where all the calculations happen. render() can now be
    // called without extra calculations which results in faster rendering.
    function render(toggled) {
        _$xy_slider.css(_$xy_slider._css);
        _$xy_cursor.css(_$xy_cursor._css);
        _$z_cursor.css(_$z_cursor._css);
        _$alpha.css(_$alpha._css);
        _$alpha_cursor.css(_$alpha_cursor._css);

        _options.doRender && _$trigger.css(_$trigger._css);
        _$trigger.text && _$trigger.val(_$trigger.text);

        _options.renderCallback.call(
            _colorPicker,
            _$trigger,
            typeof toggled === 'boolean' ? toggled : undefined
        );
    }

    $.fn.colorPicker = function(options) {
        var noop = function(){};

        options = $.extend({
            animationSpeed: 150,
            GPU: true,
            doRender: true,
            customBG: '#FFF',
            opacity: true,
            renderCallback: noop,
            buildCallback: noop,
            body: document.body,
            scrollResize: true,
            gap: 4,
            // forceAlpha: undefined,
            // css: '',
            // cssAddon: '',
            // margin: '',
            // preventFocus: false
        }, options);

        !_colorPicker && options.scrollResize && $(window)
        .on('resize.tcp scroll.tcp', function() {
            if (_colorPicker.$trigger) {
                _colorPicker.toggle.call(_colorPicker.$trigger[0], true);
            }
        });
        _instance = _instance.add(this);
        this.colorPicker = _instance.colorPicker =
            _colorPicker || new ColorPicker(options);

        $(options.body).off('.tcp').on(_pointerdown, function(e) {
            !_instance.add(_$UI).find(e.target)
                .add(_instance.filter(e.target))[0] && toggle();
        });

        return this.on('focusin.tcp click.tcp', toggle)
        .on('change.tcp', function() {
            _color.setColor(this.value || '#FFF');
            _instance.colorPicker.render(true);
        })
        .each(function() {
            var value = extractValue(this),
                mode = value.split('('),
                $elm = findElement($(this));

            $elm.data('colorMode', mode[1] ? mode[0].substr(0, 3) : 'HEX')
                .attr('readonly', _options.preventFocus);
            options.doRender &&
            $elm.css({'background-color': value,
                'color': function() {
                    return _color.setColor(value)
                        .rgbaMixBGMixCustom.luminance > 0.22 ? '#222' : '#DDD'
                }
            });
        });
    };

    $.fn.colorPicker.destroy = function() {
        $('*').off('.tcp'); // slower but saver
        _colorPicker.toggle(false);
        _instance = $();
        // destroy _colorPicker
    };

}));