/*!
 * ZUI - v1.3.1 - 2015-05-19
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2015 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: zui.migrate.1.2.js
 * This file inclues some helper methods to help upgrad version 1.2 or
 * lower to version 1.3
 * If you are using 1.3+, then ignore this.
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window)
{
    var zui = $.zui;
    if (zui)
    {
        var extendTo = function(name, $orWindow)
        {
            if ($.isArray(name))
            {
                $.each(name, function(i, n)
                {
                    extendTo(n, $orWindow);
                });
                return;
            }

            if ($orWindow)
            {
                $.extend(window,
                {
                    name: zui[name]
                });
            }
            else
            {
                $.extend(
                {
                    name: zui[name]
                });
            }
        }

        extendTo(['uuid', 'callEvent', 'clientLang', 'browser', 'messager', 'Messager', 'showMessager', 'closeModal', 'ajustModalPosition', 'ModalTrigger', 'modalTrigger', 'store']);
        extendTo(['Color', 'imgReady', 'messager', 'Messager', 'showMessager', 'closeModal', 'ajustModalPosition', 'ModalTrigger', 'modalTrigger', 'store'], true);
    }
}(jQuery, window));
