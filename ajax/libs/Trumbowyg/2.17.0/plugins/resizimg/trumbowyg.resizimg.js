(function ($) {
    'use strict';

    var defaultOptions = {
        minSize: 32,
        step: 4,
    };

    function preventDefault(ev) {
        return ev.preventDefault();
    }

    function destroyResizable(trumbowyg) {
        trumbowyg.$ed.find('img.resizable')
          .resizable('destroy')
          .off('mousedown', preventDefault)
          .removeClass('resizable');
        trumbowyg.syncTextarea();
    }

    $.extend(true, $.trumbowyg, {
        plugins: {
            resizimg: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.resizimg = $.extend(true, {},
                        defaultOptions,
                        trumbowyg.o.plugins.resizimg || {},
                        {
                            resizable: {
                                resizeWidth: false,
                                onDragStart: function (ev, $el) {
                                    var opt = trumbowyg.o.plugins.resizimg;
                                    var x = ev.pageX - $el.offset().left;
                                    var y = ev.pageY - $el.offset().top;
                                    if (x < $el.width() - opt.minSize || y < $el.height() - opt.minSize) {
                                        return false;
                                    }
                                },
                                onDrag: function (ev, $el, newWidth, newHeight) {
                                    var opt = trumbowyg.o.plugins.resizimg;
                                    if (newHeight < opt.minSize) {
                                        newHeight = opt.minSize;
                                    }
                                    newHeight -= newHeight % opt.step;
                                    $el.height(newHeight);
                                    return false;
                                },
                                onDragEnd: function () {
                                    trumbowyg.syncCode();
                                }
                            }
                        }
                    );

                    function initResizable() {
                        trumbowyg.$ed.find('img:not(.resizable)')
                            .resizable(trumbowyg.o.plugins.resizimg.resizable)
                            .on('mousedown', preventDefault);
                    }

                    // Init
                    trumbowyg.$c.on('tbwinit', initResizable);
                    trumbowyg.$c.on('tbwfocus', initResizable);
                    trumbowyg.$c.on('tbwchange', initResizable);

                    // Destroy
                    trumbowyg.$c.on('tbwblur', function () {
                        destroyResizable(trumbowyg);
                    });
                    trumbowyg.$c.on('tbwclose', function () {
                        destroyResizable(trumbowyg);
                    });
                },
                destroy: function (trumbowyg) {
                    destroyResizable(trumbowyg);
                }
            }
        }
    });
})(jQuery);
