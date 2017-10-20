/* global console, MobileDetect, jQuery */
/* jQuery Plugin jsPanel
    Dependencies:
        jQuery library ( > 1.9.1 incl. 2.1.3 )
        jQuery.UI library ( > 1.9.2 ) - (at least UI Core, Mouse, Widget, Draggable, Resizable)
        HTML5/CSS3 compatible browser

    Copyright (c) 2014-15 Stefan Sträßer, <http://stefanstraesser.eu/>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

    <http://opensource.org/licenses/MIT>.

    CHANGES IN 2.6.1:
    + bugfix in positioning when using left or top with 0
 */

"use strict";
// check for jQuery and jQuery UI components
if (!$.fn.jquery || !$.fn.uniqueId || !$.widget || !$.ui.mouse || !$.ui.draggable || !$.ui.resizable) {
    console.log("Error: jQuery or at least one jQuery UI component is not loaded! You need at least jQuery 1.9.1 and jQuery UI 1.9.2 (modules Core, Mouse, Widget, Draggable and Resizable).");
} else {
    console.log("Loaded: jQuery " + $.fn.jquery + ", jQuery UI " + $.ui.version +
    "\nUI core: " + $.isFunction($.fn.uniqueId) + ", UI widget: " + $.isFunction($.widget) + ", UI mouse: " +$.isFunction($.ui.mouse) +
    ", UI draggable: " + $.isFunction($.ui.draggable) + ", UI resizable: " + $.isFunction($.ui.resizable));
}

var jsPanel = {
    version: '2.6.2 2016-03-18 08:17',
    device: (function(){
        try {
            // requires "mobile-detect.js" to be loaded
            var md = new MobileDetect(window.navigator.userAgent),
                mobile = md.mobile(),
                phone = md.phone(),
                tablet = md.tablet(),
                os = md.os(),
                userAgent = md.userAgent();
            return {mobile: mobile, tablet: tablet, phone: phone, os: os, userAgent: userAgent};
        } catch (e) {
            console.log(e + "; Seems like mobile-detect.js is not loaded");
            return {mobile: undefined, tablet: undefined, phone: undefined, os: undefined, userAgent: undefined};
        }
    })(),
    ID: 0,                              // kind of a counter to add to automatically generated id attribute
    widthForMinimized: 180,             // default width of minimized panels
    template: '<div class="jsPanel jsPanel-theme-default jsPanel-state-initialized">' +
                '<div class="jsPanel-hdr jsPanel-theme-default">' +
                    '<h3 class="jsPanel-title"></h3>' +
                    '<div class="jsPanel-hdr-r">' +
                        '<div class="jsPanel-btn-close"><span class="jsglyph jsglyph-remove"></span></div>' +
                        '<div class="jsPanel-btn-max"><span class="jsglyph jsglyph-maximize"></span></div>' +
                        '<div class="jsPanel-btn-norm"><span class="jsglyph jsglyph-normalize"></span></div>' +
                        '<div class="jsPanel-btn-min"><span class="jsglyph jsglyph-minimize"></span></div>' +
                        '<div class="jsPanel-btn-small"><span class="jsglyph jsglyph-chevron-up"></span></div>' +
                        '<div class="jsPanel-btn-smallrev"><span class="jsglyph jsglyph-chevron-down"></span></div>' +
                    '</div>' +
                    '<div class="jsPanel-hdr-toolbar jsPanel-clearfix"></div>' +
                '</div>' +
                '<div class="jsPanel-content jsPanel-theme-default"></div>' +
                '<div class="jsPanel-ftr jsPanel-theme-default jsPanel-clearfix"></div>' +
              '</div>',

    // add toolbar
    addToolbar: function (panel, place, items) {
        if (place === 'header') {
            this.configToolbar(items, panel.header.toolbar, panel);
        } else if (place === 'footer') {
            panel.footer.css({display: 'block'});
            this.configToolbar(items, panel.footer, panel);
        }
        // give toolbar the same font-family as title
        panel.header.toolbar.css("font-family", panel.header.title.css("font-family"));
        return panel;
    },

    // loads content using jQuery.ajax();
    ajax: function(panel) {
        var oAjax = panel.option.ajax,
            pc = panel.content;
        $.ajax(oAjax)
            .done(function (data, textStatus, jqXHR) {
                if (oAjax.autoload && oAjax.url) {
                    pc.empty().append(data);
                }
                if ($.isFunction(oAjax.done)) {
                    oAjax.done.call(pc, data, textStatus, jqXHR, panel);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if ($.isFunction(oAjax.fail)) {
                    oAjax.fail.call(pc, jqXHR, textStatus, errorThrown, panel);
                }
            })
            .always(function (arg1, textStatus, arg3) {
                //In response to a successful request, the function's arguments are the same as those of .done(): data(hier: arg1), textStatus, and the jqXHR object(hier: arg3)
                //For failed requests the arguments are the same as those of .fail(): the jqXHR object(hier: arg1), textStatus, and errorThrown(hier: arg3)
                // fix for a bug in jQuery-UI draggable? that causes the jsPanel to reduce width when dragged beyond boundary of containing element and option.size.width is 'auto'
                pc.css('width', function () {
                    return pc.outerWidth();
                });
                if ($.isFunction(oAjax.always)) {
                    oAjax.always.call(pc, arg1, textStatus, arg3, panel);
                }
                // title h3 might be to small: load() is async!
                jsPanel.resizeTitle(panel);
                // update option.size (content might come delayed)
                jsPanel.updateOptionSize(panel, panel.option.size);
            })
            .then(function (data, textStatus, jqXHR) {
                if (oAjax.then && $.isArray(oAjax.then)) {
                    if ($.isFunction(oAjax.then[0])) {
                        oAjax.then[0].call(pc, data, textStatus, jqXHR, panel);
                    }
                    // title h3 might be to small: load() is async!
                    jsPanel.resizeTitle(panel);
                    // update option.size (content might come delayed)
                    jsPanel.updateOptionSize(panel, panel.option.size);
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (oAjax.then && $.isArray(oAjax.then)) {
                    if ($.isFunction(oAjax.then[1])) {
                        oAjax.then[1].call(pc, jqXHR, textStatus, errorThrown, panel);
                    }
                    // title h3 might be to small: load() is async!
                    jsPanel.resizeTitle(panel);
                }
            }
        );
        panel.data("ajaxURL", oAjax.url); // needed for exportPanels()
    },

    // used in option.autoclose and checks prior use of .close() whether the panel is still there
    autoclose: function (panel) {
        window.setTimeout(function () {
            if(panel) {
                panel.fadeOut('slow', function () {
                    panel.close();
                });
            }
        }, panel.option.autoclose);
    },

    calcPanelposition: function (jsP) {
        // when using option.size = 'auto' and option.position = 'center' consider use of option.ajax with
        // async: false -> size will be known when position is calculated
        // value "center" not allowed for option.position.bottom & option.position.right -> use top and/or left
        var panelpos = {};
        // get px values for panel size in case option.size is 'auto' - results will be incorrect whenever content
        // is not loaded yet ( e.g. option.load, option.ajax ) -> centering can't work correctly
        jsP.option.size.width = $(jsP).outerWidth();
        jsP.option.size.height = $(jsP).innerHeight();
        // delete option.position.top and/or left if option.position.bottom and/or right (top & left values come from defaults object)
        if (jsP.option.position.bottom) {
            delete jsP.option.position.top;
        }
        if (jsP.option.position.right) {
            delete jsP.option.position.left;
        }
        // calculate top | bottom values != center
        // if not checked for 0 as well code would not be executed!
        if (jsP.option.position.bottom || jsP.option.position.bottom === 0) {
            this.calcPos('bottom', jsP);
        } else if (jsP.option.position.top || jsP.option.position.top === 0) {
            if (jsP.option.position.top === 'center') {
                jsP.option.position.top = this.calcPosCenter(jsP.option).top;
            } else {
                panelpos.top = this.calcPos('top', jsP);  // change in 2.5.4
            }
        }
        // calculate left | right values != center
        if (jsP.option.position.right || jsP.option.position.right === 0) {
            this.calcPos('right', jsP);
        } else if (jsP.option.position.left || jsP.option.position.left === 0) {
            if (jsP.option.position.left === 'center') {
                jsP.option.position.left = this.calcPosCenter(jsP.option).left;
            } else {
                panelpos.left = this.calcPos('left', jsP);  // change in 2.5.4
            }
        }
        if (jsP.option.position.top || jsP.option.position.top === 0) {                         // bugfix in 2.6.1
            panelpos.top = parseInt(jsP.option.position.top, 10) + jsP.option.offset.top;
        } else {
            panelpos.bottom = parseInt(jsP.option.position.bottom, 10) + jsP.option.offset.top;
        }
        if (jsP.option.position.left || jsP.option.position.left === 0) {                       // bugfix in 2.6.1
            panelpos.left = parseInt(jsP.option.position.left, 10) + jsP.option.offset.left;
        } else {
            panelpos.right = parseInt(jsP.option.position.right, 10) + jsP.option.offset.left;
        }
        jsP.css(panelpos);
        jsP.option.position = {
            top: jsP.css('top'),
            left: jsP.css('left')
        };
    },

    // used in calcPanelposition
    calcPos: function (prop, panel) {
        var optPosition = panel.option.position;
        if (optPosition[prop] === 'auto') {
            panel.option.position[prop] = panel.count * 30;
        } else if ($.isFunction(optPosition[prop])) {
            panel.option.position[prop] = optPosition[prop](panel);
        } else if (optPosition[prop] === 0) {
            panel.option.position[prop] = '0';
        } else {
            panel.option.position[prop] = parseInt(optPosition[prop], 10);
        }
        // corrections if jsPanel is appended to the body element
        if (panel.option.selector === 'body') {
            if (prop === 'top') {
                panel.option.position.top = parseInt(optPosition.top, 10) + $(window).scrollTop();
            } else if (prop === 'bottom') {
                panel.option.position.bottom = parseInt(optPosition.bottom, 10) - $(window).scrollTop();
            } else if (prop === 'left') {
                panel.option.position.left = parseInt(optPosition.left, 10) + $(window).scrollLeft();
            } else if (prop === 'right') {
                panel.option.position.right = parseInt(optPosition.right, 10) - $(window).scrollLeft();
            }
        }
        return panel.option.position[prop];
    },

    // calculate position center for option.position == 'center'
    calcPosCenter: function (option) {
        var optSelector = option.selector,
            optSize = option.size,
            posL = ($(optSelector).outerWidth() / 2) - ((parseInt(optSize.width, 10) / 2)),
            posT;
        if (optSelector === 'body') {
            posT = ($(window).outerHeight() / 2) - ((parseInt(optSize.height, 10) / 2) - $(window).scrollTop());
        } else {
            posT = ($(optSelector).outerHeight() / 2) - ((parseInt(optSize.height, 10) / 2));
        }
        return {top: posT, left: posL};
    },

    // calculate position for maximized panels using option.controls.maxtoScreen (for devmondo)
    calcPosmaxtoScreen: function(panel) {
        var offset = panel.offset();
        return {
            top: parseInt(panel.css('top')) - (offset.top - $(document).scrollTop()) + 5,
            left: parseInt(panel.css('left')) - (offset.left - $(document).scrollLeft()) + 5
        };
    },

    // calculates css left for tooltips
    calcPosTooltipLeft: function (jsPparent, option) {
        // width of element serving as trigger for the tooltip
        var parW = jsPparent.outerWidth(),
        // check possible margins of  trigger
            mL = parseInt(jsPparent.css('margin-left')),
        // check whether offset is set
            oX = option.offset.left || 0,
            optptPosition = option.paneltype.position;
        if (optptPosition === 'top' || optptPosition === 'bottom') {
            return (parW - option.size.width) / 2 + mL + oX;
        } else if (optptPosition === 'left') {
            return -(option.size.width) + mL + oX;
        } else if (optptPosition === 'right') {
            return parW + mL + oX;
        }
        return false;
    },

    // calculates css top for tooltips
    calcPosTooltipTop: function (jsPparent, option) {
        var parH = jsPparent.innerHeight(),
            mT = parseInt(jsPparent.css('margin-top')),
            oY = option.offset.top || 0,
            optptPosition = option.paneltype.position;
        if (optptPosition === 'left' || optptPosition === 'right') {
            return -(option.size.height / 2) + (parH / 2) + mT + oY;
        } else if (optptPosition === 'top') {
            return -(option.size.height + oY) + mT;
        } else if (optptPosition === 'bottom') {
            return parH + mT + oY;
        }
        return false;
    },

    // calculate final tooltip position
    calcToooltipPosition: function(jsPparent, option) {
        return {
            top: this.calcPosTooltipTop(jsPparent, option),
            left: this.calcPosTooltipLeft(jsPparent, option)
        };
    },

    calcVerticalOffset: function (panel) {
        return Math.floor(panel.offset().top - $(window).scrollTop());
    },

    // closes a jsPanel and removes it from the DOM
    close: function (panel) {
        // get parent-element of jsPanel
        var context = panel.parent(),
            panelID = panel.attr('id');
        panel.trigger('jspanelbeforeclose', panelID);
        if ($.isFunction(panel.option.onbeforeclose)) {
            var close = panel.option.onbeforeclose.call(panel, panel);
            if (close === false) {
                return panel;
            }
        }
        // delete childpanels ...
        this.closeChildpanels(panel);
        // if present remove tooltip wrapper
        if (context.hasClass('jsPanel-tooltip-wrapper')) {
            panel.unwrap();
        }
        // remove the jsPanel itself
        panel.remove();
        $('body').trigger('jspanelclosed', panelID);
        // remove backdrop only when modal jsPanel is closed
        if (panel.option.paneltype.type === 'modal') {
            $('.jsPanel-backdrop').remove();
        }
        // reposition minimized panels
        this.reposMinimized(this.widthForMinimized);
        // reposition hints
        if (panel.option.paneltype.type === 'hint') {
            if (panel.hasClass("jsPanel-hint-tl")) {
                jsPanel.reposHints("jsPanel-hint-tl", panel.parentElmtTagname);
            } else if (panel.hasClass("jsPanel-hint-tc")) {
                jsPanel.reposHints("jsPanel-hint-tc", panel.parentElmtTagname);
            } else if (panel.hasClass("jsPanel-hint-tr")) {
                jsPanel.reposHints("jsPanel-hint-tr", panel.parentElmtTagname);
            }
        }
        if ($.isFunction(panel.option.onclosed)) {
            panel.option.onclosed.call(panel, panel);
        }
        return context;
    },

    // close all tooltips
    closeallTooltips: function () {
        $('.jsPanel-tt').each(function () {
            // remove tooltip wrapper and than remove tooltip
            $(this).unwrap().remove();
            $('body').trigger('jspanelclosed', $(this).attr('id'));
        });
    },

    // closes/removes all childpanels within the parent jsPanel
    closeChildpanels: function (panel) {
        $('.jsPanel', panel).each(function () {
            panel.trigger('jspanelbeforeclose', $(this).attr('id'));
            $(this).remove();
            $('body').trigger('jspanelclosed', $(this).attr('id'));
        });
        return panel;
    },

    // configure controls
    configControls: function(panel) {
        var controls = ["close", "maximize", "minimize", "normalize", "smallify"];
        if (panel.option.controls.buttons === 'closeonly') {
            $("div:not('.jsPanel-btn-close')", panel.header.controls).remove();               // change in 2.5.3
            panel.header.title.css("width", "calc(100% - 30px)");
        } else if (panel.option.controls.buttons === 'none') {
            $('*', panel.header.controls).remove();
            panel.header.title.css("width", "100%");
        }
        // disable controls individually
        controls.forEach(function(ctrl){
            if (panel.option.controls[ctrl]) {panel.control('disable', ctrl);}
        });
    },

    // configure iconfonts
    configIconfont: function(panel) {
        var controlsArray = ["close", "max", "norm", "min", "small", "smallrev"],
            bootstrapArray = ["remove", "fullscreen", "resize-full", "minus", "chevron-up", "chevron-down"],
            fontawesomeArray = ["times", "arrows-alt", "expand", "minus", "chevron-up", "chevron-down"],
            optIconfont = panel.option.controls.iconfont,
            controls = panel.header.controls;
        // remove icon sprites
        $('*', controls).css('background-image', 'none');
        // set icons
        if (optIconfont === 'bootstrap') {
            controlsArray.forEach(function(item, i){
                $('.jsPanel-btn-' + item, controls).empty().append('<span class="glyphicon glyphicon-' + bootstrapArray[i] + '"></span>');
            });
        } else if (optIconfont === 'font-awesome') {
            controlsArray.forEach(function(item, i){
                $('.jsPanel-btn-' + item, controls).empty().append('<span class="fa fa-' + fontawesomeArray[i] + '"></span>');
            });
        }
    },

    // builds toolbar
    configToolbar: function (toolbaritems, toolbarplace, panel) {
        var el;
        toolbaritems.forEach(function(item){
            if(typeof item === "object") {
                el = $(item.item);
                // add text to button
                if (typeof item.btntext === 'string') {
                    el.append(item.btntext);
                }
                // add class to button
                if (typeof item.btnclass === 'string') {
                    el.addClass(item.btnclass);
                }
                toolbarplace.append(el);
                // bind handler to the item
                if ($.isFunction(item.callback)) {
                    el.on(item.event, panel, item.callback);
                    // jsP is accessible in the handler as "event.data"
                }
            }
        });
    },

    // disable/enable individual controls
    control: function (panel, action, btn) {
        var controls = panel.header.controls,
            controlbtn;
        if (arguments.length === 3) {
            if (arguments[1] === 'disable') {
                if (btn === 'close') {
                    controlbtn = $('.jsPanel-btn-close', controls);
                } else if (btn === 'maximize') {
                    controlbtn = $('.jsPanel-btn-max', controls);
                } else if (btn === 'minimize') {
                    controlbtn = $('.jsPanel-btn-min', controls);
                } else if (btn === 'normalize') {
                    controlbtn = $('.jsPanel-btn-norm', controls);
                } else if (btn === 'smallify') {
                    controlbtn = $('.jsPanel-btn-small', controls);
                }
                // unbind handler and set styles
                controlbtn.off().css({opacity:0.5, cursor: 'default'});
            } else if (arguments[1] === 'enable') {
                if (btn === 'close') {
                    controlbtn = $('.jsPanel-btn-close', controls);
                } else if (btn === 'maximize') {
                    controlbtn = $('.jsPanel-btn-max', controls);
                } else if (btn === 'minimize') {
                    controlbtn = $('.jsPanel-btn-min', controls);
                } else if (btn === 'normalize') {
                    controlbtn = $('.jsPanel-btn-norm', controls);
                } else if (btn === 'smallify') {
                    controlbtn = $('.jsPanel-btn-small', controls);
                }
                // enable control and reset styles
                controlbtn.on('click', function (e) {
                    e.preventDefault();
                    panel[btn]();
                }).css({opacity: 1, cursor: 'pointer'});
            }
        }
        return panel;
    },

    // helper function for the doubleclick handlers (title, content, footer)
    dblclickhelper: function (odcs, panel) {
        if (typeof odcs === 'string') {
            if (odcs === "maximize" || odcs === "normalize") {
                if (panel.status === "normalized" || panel.option.panelstatus === "normalized") {
                    panel.maximize();
                } else {
                    panel.normalize();
                }
            } else if (odcs === "minimize" || odcs === "smallify" || odcs === "close") {
                panel[odcs]();
            }
        }
    },

    // export a panel layout to localStorage and returns array with an object for each panel
    exportPanels: function() {
        var elmtOffset, elmtPosition, elmtTop, elmtLeft, elmtWidth, elmtHeight, elmtStatus, panelParent,
            panelArr = [], exportedPanel,
            panels = $(".jsPanel").not(".jsPanel-tt, .jsPanel-hint, .jsPanel-modal");

        // normalize minimized/maximized panels before export
        // status to restore is saved in exportedPanel.panelstatus
        panels.each(function(index, elmt) {
            // for some reason this does not work properly inside the following .each() block
            if ($(elmt).data("panelstatus") !== "normalized") {
                $(".jsPanel-btn-norm", elmt).trigger("click");
            }
        });

        panels.each(function(index, elmt){
            exportedPanel = {
                panelstatus: $(elmt).data("panelstatus"),
                id: $(elmt).prop("id"),
                title: $(".jsPanel-title", elmt).html(),
                custom: $(elmt).data("custom"),
                offset: { top: 0, left: 0 },
                content: $(elmt).data("content")
            };

            panelParent = $(elmt).data("selector");
            elmtOffset = $(elmt).offset();
            elmtPosition = $(elmt).position();
            if (elmtStatus === "minimized") {
                if (panelParent.toLowerCase() === "body") {
                    elmtTop = $(elmt).data("paneltop") - $(window).scrollTop() + "px";
                    elmtLeft = $(elmt).data("panelleft") - $(window).scrollLeft() + "px";
                } else {
                    elmtTop = $(elmt).data("paneltop") + "px";
                    elmtLeft = $(elmt).data("panelleft") + "px";
                }
                elmtWidth = $(elmt).data("panelwidth") + "px";
                elmtHeight = $(elmt).data("panelheight") + "px";
            } else {
                if (panelParent.toLowerCase() === "body") {
                    elmtTop = Math.floor(elmtOffset.top - $(window).scrollTop()) + "px";
                    elmtLeft = Math.floor(elmtOffset.left - $(window).scrollLeft()) + "px";
                } else {
                    elmtTop = Math.floor(elmtPosition.top) + "px";
                    elmtLeft = Math.floor(elmtPosition.left) + "px";
                }
                elmtWidth = $(elmt).css("width");
                elmtHeight = $(".jsPanel-content", elmt).css("height");
            }
            exportedPanel.size = {
                width: elmtWidth,
                height: elmtHeight
            };
            exportedPanel.position = {
                top: elmtTop,
                left: elmtLeft
            };
            if ($(elmt).data("loadURL")) {
                exportedPanel.load = {};
                exportedPanel.load.url = $(elmt).data("loadURL");
            }
            if ($(elmt).data("ajaxURL")) {
                exportedPanel.ajax = {};
                exportedPanel.ajax.url = $(elmt).data("ajaxURL");
            }
            if ($(elmt).data("iframeDOC") || $(elmt).data("iframeSRC")) {
                exportedPanel.iframe = {};
                if ($(elmt).data("iframeDOC")) {
                    exportedPanel.iframe.srcdoc = $(elmt).data("iframeDOC");
                }
                if ($(elmt).data("iframeSRC")) {
                    exportedPanel.iframe.src = $(elmt).data("iframeSRC");
                }
            }
            panelArr.push(exportedPanel);
            // restore status that is saved
            switch (exportedPanel.panelstatus) {
                case "minimized":
                    $(".jsPanel-btn-min", elmt).trigger("click");
                    break;
                case "maximized":
                    $(".jsPanel-btn-max", elmt).trigger("click");
                    break;
                case "smallified":
                    $(".jsPanel-btn-small", elmt).trigger("click");
                    break;
                case "smallifiedMax":
                    $(".jsPanel-btn-small", elmt).trigger("click");
                    break;
            }
        });
        //window.localStorage.setItem("jspanels", panelArr);
        window.localStorage.setItem("jspanels", JSON.stringify(panelArr));
        return panelArr;
    },

    // imports panel layout from localStorage.jspanels and restores panels
    importPanels: function(predefinedConfigs) {
        /* panelConfig needs to be an object with predefined configs.
         * A config named "default" will be applied to ALL panels
         *
         *       panelConfig = { default: { } [, config1 [, config2 [, configN ]]] };
         */
        var savedPanels,restoredConfig, defaultConfig;
        savedPanels = JSON.parse(localStorage.jspanels) || {};
        defaultConfig = predefinedConfigs["default"] || {};
        savedPanels.forEach(function(savedconfig){
            // safedconfig represents one item in safedPanels
            if (typeof savedconfig.custom.config === "string") {
                restoredConfig = $.extend(true, {}, defaultConfig, predefinedConfigs[savedconfig.custom.config], savedconfig);
            } else {
                restoredConfig = $.extend(true, {}, defaultConfig, savedconfig);
            }
            // restore panel
            $.jsPanel(restoredConfig);
        });
    },

    // maintains panel position relative to window on scroll of page
    fixPosition: function (panel) {
        var jspaneldiff = panel.offset().top - $(window).scrollTop();
        panel.jsPanelfixPos = function () {
            panel.css('top', $(window).scrollTop() + jspaneldiff);
        };
        $(window).on('scroll', panel.jsPanelfixPos);
    },

    // calculate panel margins
    getMargins: function(panel) {
        var off, elmtOff, mR, mL, mB, mT,
            selector = panel.option.paneltype.shiftwithin,
            winWidth = $(window).outerWidth(),
            winHeight = $(window).outerHeight(),
            panelWidth = panel.outerWidth(),
            panelHeight = panel.outerHeight();
        if(!selector || selector === "body") {
            // panel margins relative to browser viewport
            off = panel.offset();
            mR = winWidth - off.left - panelWidth + $(window).scrollLeft();
            mL = winWidth - panelWidth - mR;
            mB = winHeight - off.top - panelHeight + $(window).scrollTop();
            mT = winHeight - panelHeight - mB;
        } else {
            // panel margins relative to element matching selector "selector"
            elmtOff = $(selector).offset();
            off = panel.offset();
            mR = $(selector).outerWidth() - parseInt(panel.css('width')) - (off.left - elmtOff.left);
            mL = off.left - elmtOff.left;
            mB = $(selector).outerHeight() - (off.top - elmtOff.top) - parseInt(panel.css('height'));
            mT = off.top - elmtOff.top;
        }
        return {marginTop: parseInt(mT), marginRight: parseInt(mR), marginBottom: parseInt(mB), marginLeft: parseInt(mL)};
    },

    // return max value of an array with numbers
    getMaxOfArray: function (numArray) {
        return Math.max.apply(null, numArray);
    },

    // calculate max horizontal and vertical tooltip shift
    getMaxpanelshift: function(panel) {
        var panelWidth = panel.outerWidth(),
            panelHeight = panel.outerHeight(),
            horiz = parseInt( panelWidth/2 ) + parseInt( panel.parent().outerWidth()/2 ) - 20,
            vert = parseInt( panelHeight/2 ) + parseInt( panel.parent().outerHeight()/2 ) - 20,
            cornerHoriz = parseInt( panelWidth/2 ) - 16,
            cornerVert = parseInt( panelHeight/2 ) - 16;
        return {maxshiftH: horiz, maxshiftV: vert, maxCornerH: cornerHoriz, maxCornerV: cornerVert};
    },

    // hide controls specified by param "sel" of the jsPanel "panel"
    hideControls: function (sel, panel) {
        var controls = panel.header.controls;
        $("*", controls).css('display', 'block');
        $(sel, controls).css('display', 'none');
    },

    // calculates option.position for hints using 'top left', 'top center' or 'top right'
    hintTop: function (hintGroup) {
        var hintH = 0;
        $("." + hintGroup).each(function(){
            hintH += $(this).outerHeight(true);
        });
        if (hintGroup === "jsPanel-hint-tr") {
            return {top: hintH, right: 0};
        } else if (hintGroup === "jsPanel-hint-tl") {
            return {top: hintH, left: 0};
        } else if (hintGroup === "jsPanel-hint-tc") {
            return {top: hintH, left: 'center'};
        }
        return {top: 0, left: 0};
    },

    // loads content in an iFrame
    iframe: function(panel) {
        var iFrame = $("<iframe></iframe>");
        // iframe content
        if (panel.option.iframe.srcdoc) {
            iFrame.prop("srcdoc", panel.option.iframe.srcdoc);
            panel.data("iframeDOC", panel.option.iframe.srcdoc); // needed for exportPanels()
        }
        if (panel.option.iframe.src) {
            iFrame.prop("src", panel.option.iframe.src);
            panel.data("iframeSRC", panel.option.iframe.src); // needed for exportPanels()
        }
        //iframe size
        if (panel.option.size.width !== "auto" && !panel.option.iframe.width) {
            iFrame.prop("width", "100%");
        } else if (typeof panel.option.iframe.width === 'string' && panel.option.iframe.width.slice(-1) === '%') {
            iFrame.prop("width", panel.option.iframe.width);
        } else {
            iFrame.prop("width", parseInt(panel.option.iframe.width) + 'px');
        }
        if (panel.option.size.height !== "auto" && !panel.option.iframe.height) {
            iFrame.prop("height", "100%");
        } else if (typeof panel.option.iframe.height === 'string' && panel.option.iframe.height.slice(-1) === '%') {
            iFrame.prop("height", panel.option.iframe.height);
        } else {
            iFrame.prop("height", parseInt(panel.option.iframe.height) + 'px');
        }
        //iframe name
        if (typeof panel.option.iframe.name === 'string') {
            iFrame.prop("name", panel.option.iframe.name);
        }
        //iframe id
        if (typeof panel.option.iframe.id === 'string') {
            iFrame.prop("id", panel.option.iframe.id);
        }
        //iframe seamless (not yet supported by any browser)
        if (panel.option.iframe.seamless) {
            iFrame.prop("seamless", "seamless");
        }
        //iframe sandbox
        if (typeof panel.option.iframe.sandbox === 'string') {
            iFrame.prop("sandox", panel.option.iframe.sandbox);
        }
        //iframe style
        if ($.isPlainObject(panel.option.iframe.style)) {
            iFrame.css(panel.option.iframe.style);
        }
        //iframe css classes
        if (typeof panel.option.iframe.classname === 'string') {
            iFrame.addClass(panel.option.iframe.classname);
        } else if ($.isFunction(panel.option.iframe.classname)) {
            iFrame.addClass(panel.option.iframe.classname());
        }
        panel.content.empty().append(iFrame);
    },

    // append modal backdrop
    insertModalBackdrop: function () {
        var backdrop = '<div class="jsPanel-backdrop" style="height:' + $(document).outerHeight() + 'px;"></div>';
        $('body').append(backdrop);
        /*$(document).on("keydown", ".jsPanel-backdrop", function(e){
         e.preventDefault();
         return false;
         });*/
    },

    // check whether a bootstrap compatible theme is used
    isBootstrapTheme: function(optionBootstrap) {
        if ($.inArray(optionBootstrap, ["default", "primary", "info", "success", "warning", "danger"]) > -1) {
            return optionBootstrap;
        }
        return "default";
    },

    // loads content using jQuery.load()
    load: function(panel) {
        panel.content.load(panel.option.load.url, panel.option.load.data || undefined, function (responseText, textStatus, jqXHR) {
            if ($.isFunction(panel.option.load.complete)) {
                panel.option.load.complete.call(panel.content, responseText, textStatus, jqXHR, panel);
            }
            // title h3 might be to small: load() is async!
            jsPanel.resizeTitle(panel);
            // update option.size (content might come delayed)
            jsPanel.updateOptionSize(panel, panel.option.size);
            // fix for a bug in jQuery-UI draggable? that causes the jsPanel to reduce width when dragged beyond boundary of containing element and option.size.width is 'auto'
            panel.content.css('width', function () {
                return panel.content.outerWidth();
            });
        });
        panel.data("loadURL", panel.option.load.url); // needed for exportPanels()
    },

    // maximizes a panel within the body element
    maxWithinBody: function (panel) {
        var newPos, newTop, newLeft;
        if ((panel.status !== "maximized" || panel.option.panelstatus !== "maximized") && panel.option.paneltype.mode !== 'default') {
            // remove window.scroll handler, is added again later in this function
            $(window).off('scroll', panel.jsPanelfixPos);
            // restore minimized panel to initial container if necessary
            if (panel.status === "minimized" || panel.option.panelstatus === "minimized") {
                this.restoreFromMinimized(panel);
            }
            // test to enable fullscreen maximize for panels in a parent other than body
            if (panel.option.controls.maxtoScreen === true) {
                newPos = this.calcPosmaxtoScreen(panel);
                newTop = newPos.top + parseInt(panel.option.maximizedMargin.top);
                newLeft = newPos.left + parseInt(panel.option.maximizedMargin.left);
            } else {
                newTop = $(window).scrollTop() + parseInt(panel.option.maximizedMargin.top);
                newLeft = $(window).scrollLeft() + parseInt(panel.option.maximizedMargin.left);
            }
            panel.css({
                top: newTop,
                left: newLeft,
                width: $(window).outerWidth() - parseInt(panel.option.maximizedMargin.left) - parseInt(panel.option.maximizedMargin.right),
                height: $(window).outerHeight() - parseInt(panel.option.maximizedMargin.top) - parseInt(panel.option.maximizedMargin.bottom)
            });
            if (!panel.option.controls.maxtoScreen || (panel.option.controls.maxtoScreen && panel.option.selector === 'body')) {
                // test to enable fullscreen maximize for panels in a parent other than body
                this.fixPosition(panel);
            }
        }
    },

    // maximizes a panel within an element other than body
    maxWithinElement: function (panel) {
        if ((panel.status !== "maximized" || panel.option.panelstatus !== "maximized") && panel.option.paneltype.mode !== 'default') {
            // restore minimized panel to initial container if necessary
            if (panel.status === "minimized" || panel.option.panelstatus === "minimized") {
                this.restoreFromMinimized(panel);
            }
            panel.css({
                top: parseInt(panel.option.maximizedMargin.top),
                left: parseInt(panel.option.maximizedMargin.left),
                width: parseInt(panel.parent().outerWidth(), 10) - parseInt(panel.option.maximizedMargin.left) - parseInt(panel.option.maximizedMargin.right),
                height: parseInt(panel.parent().outerHeight(), 10) - parseInt(panel.option.maximizedMargin.top) - parseInt(panel.option.maximizedMargin.bottom)
            });
        }
    },

    // calls functions to maximize a jsPanel
    maximize: function (panel) {
        panel.trigger('jspanelbeforemaximize', panel.attr('id'));
        if ($.isFunction(panel.option.onbeforemaximize)) {
            var maximize = panel.option.onbeforemaximize.call(panel, panel);
            if (maximize === false) {
                return panel;
            }
        }
        if (panel.parentElmtTagname === 'body' || panel.option.controls.maxtoScreen === true) {
            this.maxWithinBody(panel);
        } else {
            this.maxWithinElement(panel);
        }
        panel.trigger('jspanelmaximized', panel.attr('id'));
        panel.trigger('jspanelstatechange', panel.attr('id'));
        if ($.isFunction(panel.option.onmaximized)) {
            panel.option.onmaximized.call(panel, panel);
        }
        return panel;
    },

    // minimizes a jsPanel to the lower left corner of the browser viewport
    minimize: function (panel) {
        panel.trigger('jspanelbeforeminimize', panel.attr('id'));
        if ($.isFunction(panel.option.onbeforeminimize)) {
            var minimize = panel.option.onbeforeminimize.call(panel, panel);
            if (minimize === false) {
                return panel;
            }
        }
        panel.data({ // needed for method exportPanels()
            "paneltop": parseInt(panel.option.position.top),
            "panelleft": parseInt(panel.option.position.left),
            "panelwidth": parseInt(panel.option.size.width),
            "panelheight": parseInt($(".jsPanel-content", panel).css("height"))
        });
        // update panel size to have correct values when normalizing again
        if (panel.status === "normalized" || panel.option.panelstatus === "normalized") {
            panel.option.size.width = panel.outerWidth();
            panel.option.size.height = panel.outerHeight();
        }
        panel.animate({
            opacity: 0
        }, {
            duration: 400, // fade out speed when minimizing
            complete: function () {
                panel.animate({
                    width: jsPanel.widthForMinimized + "px",
                    height: '28px'
                }, {
                    duration: 100,
                    complete: function () {
                        jsPanel.movetoMinified(panel);
                        jsPanel.resizeTitle(panel);
                        panel.css('opacity', 1);
                    }
                });
            }
        });
        if ($.isFunction(panel.option.onminimized)) {
            panel.option.onminimized.call(panel, panel);
        }
        return panel;
    },

    // moves a panel to the minimized container
    movetoMinified: function (panel) {
        // wenn der Container für die minimierten jsPanels noch nicht existiert -> erstellen
        if ($('#jsPanel-min-container').length === 0) {
            $('body').append('<div id="jsPanel-min-container"></div>');
        }
        if (panel.status !== "minimized" || panel.option.panelstatus !== "minimized") {
            // jsPanel in vorgesehenen Container verschieben
            panel.css({
                left: ($('.jsPanel', '#jsPanel-min-container').length * jsPanel.widthForMinimized),
                top: 0,
                opacity: 1
            })
                .appendTo('#jsPanel-min-container')
                .resizable({disabled: true})
                .draggable({disabled: true});
            panel.trigger('jspanelminimized', panel.attr('id'));
            panel.trigger('jspanelstatechange', panel.attr('id'));
        }
    },

    // restores a panel to its "normalized" (not minimized, maximized or smallified) position & size
    normalize: function (panel) {
        var panelTop,
            interactions = ["resizable", "draggable"];
        panel.trigger('jspanelbeforenormalize', panel.attr('id'));
        if ($.isFunction(panel.option.onbeforenormalize)) {
            var normalize = panel.option.onbeforenormalize.call(panel, panel);
            if (normalize === false) {
                return panel;
            }
        }
        // remove window.scroll handler, is added again later in this function
        $(window).off('scroll', panel.jsPanelfixPos);
        // restore minimized panel to initial container if necessary
        if (panel.status === "minimized" || panel.option.panelstatus === "minimized") {
            this.restoreFromMinimized(panel);
        }
        // correction for panels maximized in body after page was scrolled
        if (panel.parentElmtTagname === 'body') {
            panelTop = $(window).scrollTop() + panel.verticalOffset;
        } else {
            panelTop = panel.option.position.top;
        }
        panel.css({
            width: panel.option.size.width,
            height: panel.option.size.height,
            top: panelTop,
            left: panel.option.position.left
        });
        interactions.forEach(function(action){
            if (panel.option[action] !== "disabled") {
                panel[action]("enable");
                // get resizer and cursor for resizable back
                $('.ui-icon-gripsmall-diagonal-se', panel).css({'background-image': 'none', 'text-indent': 0});
                $('.ui-resizable-handle', panel).css({'cursor': ''});
            }
        });
        panel.trigger('jspanelnormalized', panel.attr('id'));
        panel.trigger('jspanelstatechange', panel.attr('id'));
        if (panel.parentElmtTagname === 'body') {
            this.fixPosition(panel);
        }
        if ($.isFunction(panel.option.onnormalized)) {
            panel.option.onnormalized.call(panel, panel);
        }
        return panel;
    },

    // replace bottom/right values with corresponding top/left values if necessary and update option.position
    replaceCSSBottomRight: function (panel) {
        var panelPosition = panel.position();
        if (panel.css('bottom')) {
            panel.css({
                'top': parseInt(panelPosition.top, 10),
                'bottom': ''
            });
            panel.option.position.top = parseInt(panelPosition.top, 10);
        }
        if (panel.css('right')) {
            panel.css({
                'left': parseInt(panelPosition.left, 10),
                'right': ''
            });
            panel.option.position.left = parseInt(panelPosition.left, 10);
        }
    },

    // reposition hint upon closing
    reposHints: function (hintGroup, jsPtagname) {
        var hintH;
        if (jsPtagname === 'body') {
            hintH = $(window).scrollTop();
        } else {
            hintH = 0;
        }
        $("." + hintGroup).each(function(){
            $(this).animate({
                top: hintH
            });
            hintH += $(this).outerHeight(true);
        });
    },

    // reposition hints on window scroll
    reposHintsScroll: function(panel) {
        var dif = panel.offset().top - $(window).scrollTop();
        // with window.onscroll only the last added hint would stay in position
        $(window).scroll(function () {
            panel.css('top', $(window).scrollTop() + dif);
        });
    },

    // repositions a panel and optionally moves it to another container
    reposition: function(panel, position, selector) {
        if (selector && typeof selector === "string") {
            panel.option.selector = selector;
            panel.appendTo(selector);
            panel.parentElmt = $(selector).first();
            panel.parentElmtTagname = panel.parentElmt[0].tagName.toLowerCase();
        }
        if (panel.option.paneltype.type !== 'tooltip' && panel.option.paneltype.type !== 'hint') {
            // rewrite passed position to be a proper object
            panel.option.position = jsPanel.rewriteOPosition(position);
            // delete element styles concerning position, otherwise you might end up with left &right and/or top & bottom values
            panel.css({top: "", right: "", bottom: "", left: ""});
            this.calcPanelposition(panel);
            panel.verticalOffset = jsPanel.calcVerticalOffset(panel) || 0;
            this.replaceCSSBottomRight(panel);
            if (panel.parentElmtTagname === "body") {
                this.fixPosition(panel);
            } else {
                $(window).off('scroll', panel.jsPanelfixPos);
            }
            this.updateOptionPosition(panel);
        }
        return panel;
    },

    // repositions minimized jsPanels
    reposMinimized: function () {
        $('.jsPanel', '#jsPanel-min-container').each(function(index, elmt){
            $(elmt).animate({
                left: (index * jsPanel.widthForMinimized)
            });
        });
    },

    // resize exsisting jsPanel; resizes the full panel (not content section only)
    resize: function(panel, width, height) {
        if (panel.option.panelstatus !== "minimized") {             // v2.4.1 don't call resize() on minimized panels
            if(width && width !== null) {
                panel.css("width", width);
            } else {
                panel.css("width", panel.content.css("width"));
            }
            if(height && height !== null) {
                panel.css("height", height);
            }
            this.resizeContent(panel);
            this.resizeTitle(panel);
        }
    },

    // reset dimensions of content section after resize and so on
    resizeContent: function (panel) {
        var hdrftr;
        if (panel.footer.css('display') === 'none') {
            hdrftr = panel.header.outerHeight();
        } else {
            hdrftr = panel.header.outerHeight() + panel.footer.outerHeight();
        }
        panel.content.css({
            height: (panel.outerHeight() - hdrftr),
            width: panel.outerWidth()
        });
        return panel;
    },

    // resize the title h3 to use full width minus controls width (and prevent being longer than panel)
    resizeTitle: function(panel) {
        var titleWidth = (panel.outerWidth() - $(panel.header.controls).outerWidth() - 15);
        panel.header.title.css('width', titleWidth);
    },

    // restores minimized panels to their initial container, reenables resizable and draggable, repositions minimized panels
    restoreFromMinimized: function (panel) {
        var interactions = ["resizable", "draggable"];
        // restore minimized panel to initial container
        if (panel.status === "minimized" || panel.option.panelstatus === "minimized") {
            panel.appendTo(panel.option.selector);
        }
        interactions.forEach(function(action){
            if (panel.option[action] !== "disabled") {
                panel[action]("enable");
                // get resizer and cursor for resizable back
                $('.ui-icon-gripsmall-diagonal-se', panel).css({'background-image': 'none', 'text-indent': 0});
                $('.ui-resizable-handle', panel).css({'cursor': ''});
            }
        });
        // reposition minimized panels
        this.reposMinimized(jsPanel.widthForMinimized);
    },

    // rewrite option.paneltype strings to objects and set defaults for option.paneltype
    rewriteOPaneltype: function (optionPaneltype) {
        var op = optionPaneltype;
        if (op === 'modal') {
            return {type: 'modal', mode: 'default'};
        } else if (op === 'tooltip') {
            return {type: 'tooltip', position: 'top'};
        } else if (op === 'hint') {
            return {type: 'hint'};
        } else if (op.type === 'modal') {
            return {type: 'modal', mode: op.mode || 'default'};
        } else if (op.type === 'tooltip') {
            return {
                type: 'tooltip',
                mode: op.mode || false,
                position: op.position || false,
                shiftwithin: op.shiftwithin || "body",
                solo: op.solo || false,
                cornerBG: op.cornerBG || false,
                cornerOX: op.cornerOX || false,
                cornerOY: op.cornerOY || false
            };
        } else {
            return {paneltype: false};
        }
    },

    // converts option.position string to object
    rewriteOPosition: function (optionPosition) {
        var op = optionPosition;
        if (op === 'center') {
            return {top: 'center', left: 'center'};
        } else if (op === 'auto') {
            return {top: 'auto', left: 'auto'};
        } else if (op === 'top left') {
            return {top: '0', left: '0'};
        } else if (op === 'top center') {
            return {top: '0', left: 'center'};
        } else if (op === 'top right') {
            return {top: '0', right: '0'};
        } else if (op === 'center right') {
            return {top: 'center', right: '0'};
        } else if (op === 'bottom right') {
            return {bottom: '0', right: '0'};
        } else if (op === 'bottom center') {
            return {bottom: '0', left: 'center'};
        } else if (op === 'bottom left') {
            return {bottom: '0', left: '0'};
        } else if (op === 'center left') {
            return {top: 'center', left: '0'};
        }
        // if bottom and/or right is set to "center" change that to top and/or left set to "center"
        if (op.bottom === "center") {
            delete op.bottom;
            op.top = "center";
        }
        if (op.right === "center") {
            delete op.right;
            op.left = "center";
        }
        return optionPosition;
    },

    // converts option.size string to object
    rewriteOSize: function(optionSize) {
        var oSize = optionSize;
        if (typeof oSize === 'string' && oSize === 'auto') {
            oSize = {
                width: 'auto',
                height: 'auto'
            };
        }
        return oSize;
    },

    // set default options for hints and add necessary classes
    setHintDefaults: function(panel) {
        panel.option.resizable = false;
        panel.option.draggable = false;
        panel.option.removeHeader = true;
        panel.option.toolbarFooter = false;
        panel.option.show = 'fadeIn';
        panel.addClass('jsPanel-hint');
        panel.content.addClass('jsPanel-hint-content');
        // autoclose default 8 sec | or -1 to deactivate
        if (!panel.option.autoclose) {
            panel.option.autoclose = 8000;
        } else if (panel.option.autoclose < 0) {
            panel.option.autoclose = false;
        }
        // add class according option.theme to color the hint background
        panel.content.addClass('jsPanel-hint-' + panel.option.theme);
        panel.content.append('<div class="jsPanel-hint-close jsglyph jsglyph-remove"></div>');
    },

    // set default options for standard modal
    setModalDefaults: function (panel) {
        panel.option.selector = 'body';
        panel.option.show = 'fadeIn';
        panel.addClass('jsPanel-modal');
        if (panel.option.paneltype.mode === 'default') {
            panel.option.resizable = false;
            panel.option.draggable = false;
            panel.option.removeHeader = false;
            panel.option.position = {top: 'center', left: 'center'};
            panel.option.offset = {top: 0, left: 0};
            panel.option.controls.buttons = 'closeonly'; //do not delete else "modal" with no close button possible
            $(".jsPanel-btn-min, .jsPanel-btn-norm, .jsPanel-btn-max, .jsPanel-btn-small, .jsPanel-btn-smallrev", panel).remove();
            $(panel.header, panel.header.title, panel.footer).css('cursor', 'default');
            $('.jsPanel-title', panel).css('cursor', 'inherit');
        }
    },

    // set right-to-left text direction and language; set styles and reoorder controls for rtl
    setRTL: function(panel) {
        var elmts = [ panel.header.title, panel.content, panel.header.toolbar, panel.footer ];
        elmts.forEach(function(item){
            item.prop('dir', 'rtl');
            if (panel.option.rtl.lang) {
                item.prop('lang', panel.option.rtl.lang);
            }
        });
        panel.header.title.css('text-align', 'right');
        $('.jsPanel-btn-close', panel.header.controls).insertAfter($('.jsPanel-btn-min', panel.header.controls));
        $('.jsPanel-btn-max', panel.header.controls).insertAfter($('.jsPanel-btn-min', panel.header.controls));
        $('.jsPanel-btn-small', panel.header.controls).insertBefore($('.jsPanel-btn-min', panel.header.controls));
        $('.jsPanel-btn-smallrev', panel.header.controls).insertBefore($('.jsPanel-btn-min', panel.header.controls));
        $('.jsPanel-hdr-r', panel).css({left: '0px', right: '', position: 'relative', 'float': 'left'});
        $('.jsPanel-hint-close', panel).css('float', 'left');
        $('.jsPanel-title', panel).css('float', 'right');
        $('.jsPanel-ftr', panel).append('<div style="clear:both;height:0;"></div>');
        $('button', panel.footer).css('float', 'left');
    },

    // set default options for tooltips
    setTooltipDefaults: function(panel) {
        panel.option.position = {};
        panel.option.resizable = false;
        panel.option.draggable = false;
        panel.option.show = 'fadeIn';
        panel.option.controls.buttons = 'closeonly';
        panel.header.title.css('cursor', 'inherit');
        panel.footer.css('cursor', 'inherit');
        panel.addClass('jsPanel-tt');
    },

    // returns a z-index value for a panel in order to have it on top
    setZi: function (panel) {
        var jspanel, allZi = [], maxZi;
        if (typeof panel === "string") {
            jspanel = $(panel);
        } else {
            jspanel = panel;
        }
        // build array with all z-index values
        $(".jsPanel:not('.jsPanel-modal, .jsPanel-nofront')").each(function(i, elmt){
            if (jspanel.attr("id") !== $(elmt).attr("id")) {
                allZi.push($(elmt).css("z-index"));
            }
        });
        //allZi.sort(function(a, b) {return a - b}); // sort array ascending
        //console.log(allZi);
        maxZi = this.getMaxOfArray(allZi);
        return maxZi + 1;
    },

    // shift tooltip left/right if it overflows window; when using horizontal offsets of panel and/or corner result might be not as expected
    shiftTooltipHorizontal: function(panel){
        var margins = this.getMargins(panel),
            leftShiftRequired,
            maxShift = this.getMaxpanelshift(panel),
            maxLeftShift = maxShift.maxshiftH,
            shift,
            maxCornerLeft = maxShift.maxCornerH,
            cornerShift,
            newPanelLeft = 0,
            newCornerLeft = 0;
        if (margins.marginLeft < 0 && margins.marginRight > 0) {
            // if panel overflows left window border
            leftShiftRequired = Math.abs(margins.marginLeft) + 5 || 0;
            shift = Math.min(leftShiftRequired, maxLeftShift) || 0;
            cornerShift = Math.min(maxCornerLeft, shift) || 0;
            newPanelLeft = parseInt(panel.css('left')) + shift + "px";
            newCornerLeft = parseInt($('.jsPanel-corner', panel).css('left')) - cornerShift + "px";
        } else if (margins.marginRight < 0 && margins.marginLeft > 0) {
            // if panel overflows right window border
            leftShiftRequired = Math.abs(margins.marginRight) + 5 || 0;
            shift = Math.min(leftShiftRequired, maxLeftShift) || 0;
            cornerShift = Math.min(maxCornerLeft, shift) || 0;
            newPanelLeft = parseInt(panel.css('left')) - shift + "px";
            newCornerLeft = parseInt($('.jsPanel-corner', panel).css('left')) + cornerShift + "px";
        }
        if ((margins.marginLeft < 0 && margins.marginRight > 0) || (margins.marginRight < 0 && margins.marginLeft > 0)) {
            // shift panel
            panel.animate({
                "left": newPanelLeft
            },{ queue: false /* to have both animation run simultaneously */ });

            // shift corner if present
            if ($('.jsPanel-corner', panel)) {
                $('.jsPanel-corner', panel).animate({
                    "left": newCornerLeft
                },{ queue: false /* to have both animation run simultaneously */ });
            }
        }
    },

    // shift tooltip up/down if it overflows window; when using vertical offsets of panel and/or corner result might be not as expected
    shiftTooltipVertical: function(panel){
        //console.log( parseInt($('*:first-child', panel.parent()).css('margin-left')) );
        var margins = this.getMargins(panel),
            topShiftRequired,
            maxShift = this.getMaxpanelshift(panel),
            maxTopShift = maxShift.maxshiftV,
            shift,
            maxCornerTop = maxShift.maxCornerV,
            cornerShift,
            newPanelTop = 0,
            newCornerTop = 0;
        if (margins.marginTop < 0 && margins.marginBottom > 0) {
            // if panel overflows top window border
            topShiftRequired = Math.abs(margins.marginTop) + 5 || 0;
            shift = Math.min(topShiftRequired, maxTopShift) || 0;
            cornerShift = Math.min(maxCornerTop, shift) || 0;
            newPanelTop = parseInt(panel.css('top')) + shift + "px";
            newCornerTop = parseInt($('.jsPanel-corner', panel).css('top')) - cornerShift + "px";
        } else if (margins.marginBottom < 0 && margins.marginTop > 0) {
            // if panel overflows bottom window border
            topShiftRequired = Math.abs(margins.marginBottom) + 5 || 0;
            shift = Math.min(topShiftRequired, maxTopShift) || 0;
            cornerShift = Math.min(maxCornerTop, shift) || 0;
            newPanelTop = parseInt(panel.css('top')) - shift + "px";
            newCornerTop = parseInt($('.jsPanel-corner', panel).css('top')) + cornerShift + "px";
        }
        if ((margins.marginTop < 0 && margins.marginBottom > 0) || (margins.marginBottom < 0 && margins.marginTop > 0)) {
            // shift panel
            panel.animate({
                "top": newPanelTop
            },{ queue: false /* to have both animation run simultaneously */ });

            // shift corner if present
            if ($('.jsPanel-corner', panel)) {
                $('.jsPanel-corner', panel).animate({
                    "top": newCornerTop
                },{ queue: false /* to have both animation run simultaneously */ });
            }
        }
    },

    smallify: function(panel) {
        var statusNew;
        if ((panel.status !== "smallified" || panel.option.panelstatus !== "smallified") && (panel.status !== "smallifiedMax" || panel.option.panelstatus !== "smallifiedMax")) {
            if (panel.status === "maximized" || panel.option.panelstatus === "maximized") {
                statusNew = "smallifiedMax";
            } else {
                statusNew = "smallified";
            }
            // store panel height in function property
            panel.smallify.height = panel.outerHeight();
            panel.panelheaderheight = panel.header.outerHeight() - 2;
            panel.panelfooterheight = panel.footer.outerHeight();
            panel.panelcontentheight = panel.content.outerHeight();
            panel.animate({
                    height: panel.panelheaderheight
                },
                {
                    done: function () {
                        if (panel.status === 'maximized' || panel.option.panelstatus === 'maximized') {
                            jsPanel.hideControls(".jsPanel-btn-max, .jsPanel-btn-small", panel);
                        } else {
                            jsPanel.hideControls(".jsPanel-btn-norm, .jsPanel-btn-small", panel);
                        }
                        jsPanel.updateStateProps(panel, statusNew);
                        panel.trigger('jspanel' + statusNew, panel.attr('id'));
                        panel.trigger('jspanelstatechange', panel.attr('id'));
                    }
                });
        }
    },

    unsmallify: function(panel) {
        panel.animate({
                height: panel.smallify.height
            },
            {
                done: function () {
                    if (panel.status === 'smallified' || panel.option.panelstatus === 'smallified') {
                        jsPanel.hideControls(".jsPanel-btn-norm, .jsPanel-btn-smallrev", panel);
                        jsPanel.updateStateProps(panel, "normalized");
                        panel.trigger('jspanelnormalized', panel.attr('id'));
                        panel.trigger('jspanelstatechange', panel.attr('id'));
                    } else {
                        jsPanel.hideControls(".jsPanel-btn-max, .jsPanel-btn-smallrev", panel);
                        jsPanel.updateStateProps(panel, "maximized");
                        panel.trigger('jspanelmaximized', panel.attr('id'));
                        panel.trigger('jspanelstatechange', panel.attr('id'));
                    }
                }
            }
        );
    },

    // updates option.position to hold actual values
    updateOptionPosition: function(panel) {
        panel.option.position.top = panel.css('top');
        panel.option.position.left = panel.css('left');
    },

    // updates option.size to hold actual values
    updateOptionSize: function(panel) {
        panel.option.size.width = panel.css('width');
        panel.option.size.height = $(".jsPanel-content", panel).css("height");
    },

    updateCustomData: function(panel, key, val) {
        var custom = panel.data("custom");
        custom[key] = val;
        panel.data("custom", custom);
    },

    updateStateProps: function(panel, status) {
        panel.status = status;
        panel.option.panelstatus = status;
        panel.data("panelstatus", status);
        panel.alterClass("jsPanel-state-*", "jsPanel-state-" + status);
    }

};

console.log("jsPanel version: " + jsPanel.version);

(function($){
    $.jsPanel = function (config) {

        var jsP, template, id,
            panelconfig = config || {},
            optConfig = panelconfig.config || {};

        // use custom jsPanel template if present else standard template
        template = panelconfig.template || jsPanel.template;
        jsP = $(template);

        // Extend our default config with those provided. Note that the first arg to extend is an empty object - this is to keep from overriding our "defaults" object.
        jsP.option = $.extend(true, {}, $.jsPanel.defaults, optConfig, panelconfig);

        // option.id ---------------------------------------------------------------------------------------------------
        if (typeof jsP.option.id === "string") {
            id = jsP.option.id;
        } else if ($.isFunction(jsP.option.id)) {
            id = jsP.option.id();
        } else {
            jsPanel.ID += 1;
            id = jsPanel.ID;
        }
        if ($("#" + id).length > 0) {
            alert("jsPanel Error: No jsPanel created - id attribute passed with option.id already exists in document");
            return false;
        } else {
            jsP.attr("id", id);
        }

        jsP.data("custom", jsP.option.custom);

        jsP.verticalOffset = 0; // always use 0 ... not "0" !

        try {
            jsP.parentElmt = $(jsP.option.selector).first();
            jsP.parentElmtTagname = jsP.parentElmt[0].tagName.toLowerCase();
            jsP.count = jsP.parentElmt.children('.jsPanel').length;
        } catch (e) {
            alert(e + "\n\nThe element you want to append the jsPanel to does not exist!\n\n The jsPanel will be appended to the body element instead.");
            jsP.option.selector = 'body';
            jsP.parentElmt = $('body');
            jsP.parentElmtTagname = 'body';
            jsP.count = jsP.parentElmt.children('.jsPanel').length;
        }

        jsP.status = "initialized";

        jsP.header = $('.jsPanel-hdr', jsP);

        jsP.header.title = $('.jsPanel-title', jsP.header);

        jsP.header.controls = $('.jsPanel-hdr-r', jsP.header);

        jsP.header.toolbar = $('.jsPanel-hdr-toolbar', jsP.header);

        jsP.content = $('.jsPanel-content', jsP);

        jsP.footer = $('.jsPanel-ftr', jsP);

        jsP.normalize = function() {
            jsPanel.normalize(jsP);
            return jsP;
        };

        jsP.close = function () {
            jsPanel.close(jsP);
            // no need to return something
        };

        jsP.closeChildpanels = function () {
            jsPanel.closeChildpanels(jsP);
            return jsP;
        };

        jsP.minimize = function () {
            jsPanel.minimize(jsP);
            return jsP;
        };

        jsP.maximize = function () {
            jsPanel.maximize(jsP);
            return jsP;
        };

        jsP.smallify = function () {
            if ((jsP.status === "normalized" || jsP.option.panelstatus === "normalized") || (jsP.status === "maximized" || jsP.option.panelstatus === "maximized")) {
                jsPanel.smallify(jsP);
            } else if ((jsP.status !== "minimized" || jsP.option.panelstatus !== "minimized")) {
                jsPanel.unsmallify(jsP);
            }
            return jsP;
        };

        jsP.front = function () {
            jsP.css('z-index', jsPanel.setZi(jsP));
            return jsP;
        };

        jsP.title = function (text) {
            if (text && typeof text === "string") {
                jsP.header.title.html(text);
                return jsP;
            } else if (arguments.length === 0) {
                return jsP.header.title.html();
            }
        };

        jsP.addToolbar = function (place, items) {
            jsPanel.addToolbar(jsP, place, items);
            return jsP;
        };

        jsP.control = function (action, btn) {
            jsPanel.control(jsP, action, btn);
            return jsP;
        };

        jsP.resize = function (width, height) {
            // method resizes the full panel (not content section only)
            jsPanel.resize(jsP, width, height);
            return jsP;
        };

        jsP.reposition = function (position, selector) {
            jsPanel.reposition(jsP, position, selector);
            return jsP;
        };

        jsP.reloadContent = function() {
            if (jsP.option.content) {
                jsP.content.empty().append(jsP.option.content);
            } else if (jsP.option.load) {
                jsP.content.empty();
                jsPanel.load(jsP);
            } else if (jsP.option.ajax) {
                jsPanel.ajax(jsP);
            } else if (jsP.option.iframe) {
                jsPanel.iframe(jsP);
            }
        };

        // handler to move panel to foreground on click
        jsP.on('click', function (e) {
            // use of e.preventDefault(); would prevent events from inside a panel from firing properly
            if (!$(e.target).is("a[href], button, .jsPanel-nofront, .jsPanel-nofront *")) {
                if (!jsP.hasClass("jsPanel-modal")) {
                    jsP.css('z-index', jsPanel.setZi(jsP));
                }
            }
        });

        // jsPanel close
        $('.jsPanel-btn-close', jsP).on('click', function (e) {
            e.preventDefault();
            if (!jsP.option.controls.confirmClose) {
                jsPanel.close(jsP, jsP.parentElmtTagname);
            } else {
                if (window.confirm(jsP.option.controls.confirmClose) === true) {
                    jsPanel.close(jsP, jsP.parentElmtTagname);
                }
            }
        });

        // jsPanel minimize
        $('.jsPanel-btn-min', jsP).on('click', function (e) {
            e.preventDefault();
            jsPanel.minimize(jsP);
        });

        // jsPanel maximize
        $('.jsPanel-btn-max', jsP).on('click', function (e) {
            e.preventDefault();
            jsPanel.maximize(jsP);
        });

        // jsPanel normalize
        $('.jsPanel-btn-norm', jsP).on('click', function (e) {
            e.preventDefault();
            jsPanel.normalize(jsP);
        });

        // jsPanel smallify
        $('.jsPanel-btn-small', jsP).on('click', function (e) {
            e.preventDefault();
            jsPanel.smallify(jsP);
        });

        // jsPanel unsmallify
        $('.jsPanel-btn-smallrev', jsP).on('click', function (e) {
            e.preventDefault();
            jsPanel.unsmallify(jsP);
        });

        // rewrite option.paneltype strings to objects and set defaults for option.paneltype
        jsP.option.paneltype = jsPanel.rewriteOPaneltype(jsP.option.paneltype);

        // converts option.position string to object
        jsP.option.position = jsPanel.rewriteOPosition(jsP.option.position);

        // converts option.size string to object
        jsP.option.size = jsPanel.rewriteOSize(jsP.option.size);

        /* option.paneltype - override or set various settings depending on option.paneltype ------------------------ */
        if (jsP.option.paneltype.type === 'modal') {
            // set defaults for standard modal
            jsPanel.setModalDefaults(jsP);
            // insert backdrop
            if ($('.jsPanel-backdrop').length < 1) {
                jsPanel.insertModalBackdrop();
            }
        } else if (jsP.option.paneltype.type === 'tooltip') {
            jsPanel.setTooltipDefaults(jsP);
            // optionally remove all other tooltips
            if (jsP.option.paneltype.solo) {
                jsPanel.closeallTooltips();
            }
            // calc top & left for the various tooltip positions
            jsP.option.position = jsPanel.calcToooltipPosition(jsP.parentElmt, jsP.option);
            // position the tooltip & add tooltip class
            jsP.css({
                top: jsP.option.position.top,
                left: jsP.option.position.left
            });
            if (!jsP.parentElmt.parent().hasClass('jsPanel-tooltip-wrapper')) {
                // wrap element serving as trigger in a div - will take the tooltip
                jsP.parentElmt.wrap('<div class="jsPanel-tooltip-wrapper">');
                // append tooltip (jsPanel) to the wrapper div
                jsP.parentElmt.parent().append(jsP);
                if (jsP.option.paneltype.mode === 'semisticky') {
                    jsP.hover(
                        function () {
                            $.noop();
                        },
                        function () {
                            jsPanel.close(jsP);
                        }
                    );
                } else if (jsP.option.paneltype.mode === 'sticky') {
                    $.noop();
                } else {
                    jsP.option.controls.buttons = 'none';
                    // tooltip will be removed whenever mouse leaves trigger
                    jsP.parentElmt.off('mouseout'); // to prevent mouseout from firing several times
                    jsP.parentElmt.mouseout(function () {
                        jsPanel.close(jsP);
                    });
                }
            }
            // corners
            jsP.css('overflow', 'visible');
            if (jsP.option.paneltype.cornerBG) {
                var corner = $("<div></div>"),
                    cornerLoc = "jsPanel-corner-" + jsP.option.paneltype.position,
                    cornerPos,
                    cornerOX = parseInt(jsP.option.paneltype.cornerOX) || 0,
                    cornerOY = parseInt(jsP.option.paneltype.cornerOY) || 0,
                    cornerBG = jsP.option.paneltype.cornerBG;
                if (jsP.option.paneltype.position !== "bottom") {
                    corner.addClass("jsPanel-corner " + cornerLoc).appendTo(jsP);
                } else {
                    corner.addClass("jsPanel-corner " + cornerLoc).prependTo(jsP);
                }
                if (jsP.option.paneltype.position === "top") {
                    cornerPos = parseInt(jsP.option.size.width)/2 - 12 + (cornerOX) + "px";
                    corner.css({borderTopColor: cornerBG, left: cornerPos});
                } else if (jsP.option.paneltype.position === "right") {
                    cornerPos = parseInt(jsP.option.size.height)/2 - 12 + (cornerOY) + "px";
                    corner.css({borderRightColor: cornerBG, left: "-22px", top: cornerPos});
                } else if (jsP.option.paneltype.position === "bottom") {
                    cornerPos = parseInt(jsP.option.size.width)/2 - 12 + (cornerOX) + "px";
                    corner.css({borderBottomColor: cornerBG, left: cornerPos, top: "-22px"});
                } else if (jsP.option.paneltype.position === "left") {
                    cornerPos = parseInt(jsP.option.size.height)/2 - 12 + (cornerOY) + "px";
                    corner.css({borderLeftColor: cornerBG, left: jsP.option.size.width, top: cornerPos});
                }
            }
        } else if (jsP.option.paneltype.type === 'hint') {
            jsPanel.setHintDefaults(jsP);
            // bind callback for close button
            $('.jsPanel-hint-close', jsP).on('click', jsP, function (event) {
                event.data.close(jsP);
            });
            // set option.position for hints using 'top left', 'top center' or 'top right'
            if (jsP.option.position.top === '0' && jsP.option.position.left === 'center') {
                jsP.addClass("jsPanel-hint-tc");
                if ($(".jsPanel-hint-tc").length > 0) {
                    jsP.option.position = jsPanel.hintTop("jsPanel-hint-tc");
                }
            } else if (jsP.option.position.top === '0' && jsP.option.position.left === '0') {
                jsP.addClass("jsPanel-hint-tl");
                if ($(".jsPanel-hint-tl").length > 0) {
                    jsP.option.position = jsPanel.hintTop("jsPanel-hint-tl");
                }
            } else if (jsP.option.position.top === '0' && jsP.option.position.right === '0') {
                jsP.addClass("jsPanel-hint-tr");
                if ($(".jsPanel-hint-tr").length > 0) {
                    jsP.option.position = jsPanel.hintTop("jsPanel-hint-tr");
                }
            }
        }

        /* option.selector - append jsPanel only to the first object in selector ------------------------------------ */
        jsP.data("selector", jsP.option.selector);  // needed for exportPanels()
        if (jsP.option.paneltype.type !== 'tooltip') {
            jsP.appendTo(jsP.parentElmt);
        }
        if (jsP.option.paneltype.type === 'modal') {
            jsP.css('zIndex', 10001);
            if (jsP.option.paneltype.mode === 'extended') {
                $('.jsPanel-backdrop').css('z-index', '9998');
            }
        } else {
            if (!jsP.hasClass("jsPanel-modal")) {
                jsP.css('z-index', jsPanel.setZi(jsP));
            }
        }

        /* option.bootstrap & option.theme -------------------------------------------------------------------------- */
        if (jsP.option.bootstrap) {
            // check whether a bootstrap compatible theme is used and set option.theme accordingly
            jsP.option.theme = jsPanel.isBootstrapTheme(jsP.option.bootstrap);
            jsP.option.controls.iconfont = 'bootstrap';
            jsP.alterClass('jsPanel-theme-*', 'panel panel-' + jsP.option.theme);
            jsP.header.alterClass('jsPanel-theme-*', 'panel-heading');
            jsP.header.title.addClass('panel-title');
            jsP.content.alterClass('jsPanel-theme-*', 'panel-body');
            jsP.footer.addClass('panel-footer');
            // fix css problems for panels nested in other bootstrap panels
            jsP.header.title.css('color', function () {
                return jsP.header.css('color');
            });
            jsP.content.css('border-top-color', function () {
                return jsP.header.css('border-top-color');
            });
        } else {
            // activate normal non bootstrap themes
            var components = [jsP, jsP.header, jsP.content, jsP.footer];
            components.forEach(function(elmt){
                $(elmt).alterClass('jsPanel-theme-*', 'jsPanel-theme-' + jsP.option.theme);
            });
        }

        /* option.removeHeader; option.controls (buttons in header right) ------------------------------------------- */
        if (jsP.option.removeHeader) {
            jsP.header.remove();
        } else {
            jsPanel.configControls(jsP);
        }

        /* insert iconfonts if option.iconfont set (default is "jsglyph") */
        if (jsP.option.controls.iconfont) {
            jsPanel.configIconfont(jsP);
        } else {
            // if option.controls.iconfont === false restore old icon sprite
            $('.jsPanel-btn-close, .jsPanel-btn-max, .jsPanel-btn-norm, .jsPanel-btn-min, .jsPanel-btn-small, .jsPanel-btn-smallrev', jsP.header.controls).empty();
        }

        /* option.toolbarHeader | default: false -------------------------------------------------------------------- */
        if (jsP.option.toolbarHeader && jsP.option.removeHeader === false) {
            if (typeof jsP.option.toolbarHeader === 'string') {
                jsP.header.toolbar.append(jsP.option.toolbarHeader);
            } else if ($.isFunction(jsP.option.toolbarHeader)) {
                jsP.header.toolbar.append(jsP.option.toolbarHeader(jsP.header));
            } else if ($.isArray(jsP.option.toolbarHeader)) {
                jsPanel.configToolbar(jsP.option.toolbarHeader, jsP.header.toolbar, jsP);
            }
            // give toolbar the same font-family as title
            jsP.header.toolbar.css("font-family", jsP.header.title.css("font-family"));
        }

        /* option.toolbarFooter | default: false -------------------------------------------------------------------- */
        if (jsP.option.toolbarFooter) {
            jsP.footer.css({
                display: 'block'
            });
            if (typeof jsP.option.toolbarFooter === 'string') {
                jsP.footer.append(jsP.option.toolbarFooter);
            } else if ($.isFunction(jsP.option.toolbarFooter)) {
                jsP.footer.append(jsP.option.toolbarFooter(jsP.footer));
            } else if ($.isArray(jsP.option.toolbarFooter)) {
                jsPanel.configToolbar(jsP.option.toolbarFooter, jsP.footer, jsP);
            }
            // give toolbar the same font-family as title
            jsP.footer.css("font-family", jsP.header.title.css("font-family"));
        }

        /* option.rtl | default: false ------------------------------------------------------------------------------ */
        if (jsP.option.rtl.rtl === true) {
            jsPanel.setRTL(jsP, jsP.option.rtl.lang);
        }

        /* option.overflow  | default: 'hidden' --------------------------------------------------------------------- */
        if (typeof jsP.option.overflow === 'string') {
            jsP.content.css('overflow', jsP.option.overflow);
        } else if ($.isPlainObject(jsP.option.overflow)) {
            jsP.content.css({
                'overflow-y': jsP.option.overflow.vertical,
                'overflow-x': jsP.option.overflow.horizontal
            });
        }

        /* option.draggable ----------------------------------------------------------------------------------------- */
        if ($.isPlainObject(jsP.option.draggable)) {
            // if jsPanel is childpanel
            if (jsP.parent().hasClass('jsPanel-content')) {
                jsP.option.draggable.containment = 'parent';
            }
            // merge draggable settings and apply
            jsP.option.customdraggable = $.extend(true, {}, $.jsPanel.defaults.draggable, jsP.option.draggable);
            jsP.draggable(jsP.option.customdraggable);
        } else if (jsP.option.draggable === 'disabled') {
            // reset cursor, draggable deactivated
            $('.jsPanel-title, .jsPanel-ftr', jsP).css('cursor', 'inherit');
            // jquery ui draggable initialize disabled to allow to query status
            jsP.draggable({ disabled: true });
        }

        /* option.resizable ----------------------------------------------------------------------------------------- */
        if ($.isPlainObject(jsP.option.resizable)) {
            jsP.option.customresizable = $.extend(true, {}, $.jsPanel.defaults.resizable, jsP.option.resizable);
            jsP.resizable(jsP.option.customresizable);
        } else if (jsP.option.resizable === 'disabled') {
            // jquery ui resizable initialize disabled to allow to query status
            jsP.resizable({ disabled: true });
            $('.ui-icon-gripsmall-diagonal-se', jsP).css({'background-image': 'none', 'text-indent': -9999});
            $('.ui-resizable-handle', jsP).css({'cursor': 'inherit'});
        }

        /* option.content ------------------------------------------------------------------------------------------- */
        // option.content can be any valid argument for jQuery.append()
        if (jsP.option.content) {
            jsP.content.append(jsP.option.content);
            jsP.data("content", jsP.option.content);
        }

        /* option.load ---------------------------------------------------------------------------------------------- */
        if ($.isPlainObject(jsP.option.load) && jsP.option.load.url) {
            jsPanel.load(jsP);
        }

        /* option.ajax ---------------------------------------------------------------------------------------------- */
        if ($.isPlainObject(jsP.option.ajax) && jsP.option.ajax.url) {
            jsPanel.ajax(jsP);
        }

        /* option.size ---------------------------------------------------------------------------------------------- */
        jsP.content.css({
            width: jsP.option.size.width || 'auto',
            height: jsP.option.size.height || 'auto'
        });

        // Important! limit title width; final adjustment follows later; otherwise title might be longer than panel width
        jsP.header.title.css('width', jsP.content.width()-90);

        /* option.iframe -------------------------------------------------------------------------------------------- */
        // implemented after option.size because option.size.width/height are either "auto" or pixel values already
        if ($.isPlainObject(jsP.option.iframe) && (jsP.option.iframe.src || jsP.option.iframe.srcdoc)) {
            jsPanel.iframe(jsP);
        }

        /* option.position ------------------------------------------------------------------------------------------ */
        if (jsP.option.paneltype.type !== 'tooltip') {
            // value "center" not allowed for option.position.bottom & option.position.right -> use top and/or left
            // finally calculate & position the jsPanel
            jsPanel.calcPanelposition(jsP);
        }

        /* option.addClass ------------------------------------------------------------------------------------------ */
        if (typeof jsP.option.addClass.header === 'string') {
            jsP.header.addClass(jsP.option.addClass.header);
        }
        if (typeof jsP.option.addClass.content === 'string') {
            jsP.content.addClass(jsP.option.addClass.content);
        }
        if (typeof jsP.option.addClass.footer === 'string') {
            jsP.footer.addClass(jsP.option.addClass.footer);
        }

        // handlers for doubleclicks -----------------------------------------------------------------------------------
        // dblclicks disabled for normal modals, hints and tooltips
        if (jsP.option.paneltype.mode !== "default") {
            if (jsP.option.dblclicks) {
                if (jsP.option.dblclicks.title) {
                    jsP.header.title.on('dblclick', function (e) {
                        e.preventDefault();
                        jsPanel.dblclickhelper(jsP.option.dblclicks.title, jsP);
                    });
                }
                if (jsP.option.dblclicks.content) {
                    jsP.content.on('dblclick', function (e) {
                        e.preventDefault();
                        jsPanel.dblclickhelper(jsP.option.dblclicks.content, jsP);
                    });
                }
                if (jsP.option.dblclicks.footer) {
                    jsP.footer.on('dblclick', function (e) {
                        e.preventDefault();
                        jsPanel.dblclickhelper(jsP.option.dblclicks.footer, jsP);
                    });
                }
            }
        }

        /* option.show ---------------------------------------------------------------------------------------------- */
        if (!jsP.option.show) {
            jsP.css({
                display: 'block',
                opacity: 1
            });
            $(jsP).trigger('jspanelloaded', jsP.attr('id'));
            $(jsP).trigger('jspanelstatechange', jsP.attr('id'));
            jsP.option.size = {
                width: jsP.outerWidth(),
                height: jsP.outerHeight()
            };
        } else if (jsP.option.show.indexOf(" ") === -1) {
            // if no space is found in "jsP.option.show" -> function anwenden
            jsP[jsP.option.show]({
                done: function () {
                    // trigger custom event
                    $(jsP).trigger('jspanelloaded', jsP.attr('id'));
                    $(jsP).trigger('jspanelstatechange', jsP.attr('id'));
                    jsP.option.size = {
                        width: jsP.outerWidth(),
                        height: jsP.outerHeight()
                    };
                }
            });
        } else {
            // does not work with certain combinations of type of animation and positioning
            jsP.css({
                display: 'block',
                opacity: 1
            });
            $(jsP).addClass(jsP.option.show);
            $(jsP) .trigger('jspanelloaded', jsP.attr('id'));
            $(jsP).trigger('jspanelstatechange', jsP.attr('id'));
            jsP.option.size = {
                width: jsP.outerWidth(),
                height: jsP.outerHeight()
            };
        }

        /* needed if a maximized panel in body is normalized again -------------------------------------------------- */
        // don't put this under $('body').on('jspanelloaded', function () { ... }
        jsP.verticalOffset = jsPanel.calcVerticalOffset(jsP) || 0;

        /* replace bottom/right values with corresponding top/left values if necessary ------------------------------ */
        jsPanel.replaceCSSBottomRight(jsP);

        /* option.title | needs to be late in the file! ------------------------------------------------------------- */
        jsP.header.title.empty().prepend(jsP.option.title);
        jsPanel.resizeTitle(jsP);

        /* reposition hints while scrolling window, must be after normalization of position ------------------------- */
        if (jsP.option.paneltype.type === 'hint') {
            jsPanel.reposHintsScroll(jsP);
        }

        /* reposition jsPanel appended to body while scrolling window ----------------------------------------------- */
        if (jsP.parentElmtTagname === 'body' && (jsP.option.paneltype.type !== 'tooltip' || jsP.option.paneltype.type !== 'hint')) {
            jsPanel.fixPosition(jsP);
        }

        /* resizestart & resizestop & dragstop callbacks ------------------------------------------------------------ */
        if (!jsP.option.paneltype || jsP.option.paneltype.mode !== 'default') {
            // not needed for modals, hints and tooltips
            $(jsP).on("resizestart", function () {
                $("iframe", jsP.content).css("display", "none"); // on test
            });

            $(jsP).on("resize", function () {
                // jquery ui resize event is also fired when panel is maximized or normalized (on request of Gareth Bult)
                jsPanel.resizeContent(jsP);
                jsPanel.resizeTitle(jsP);
            });

            $(jsP).on("resizestop", function () {
                jsP.option.size = {
                    width: jsP.outerWidth(),
                    height: jsP.outerHeight()
                };
                jsPanel.updateStateProps(jsP, "normalized");
                $(jsP).trigger('jspanelnormalized', jsP.attr('id'));
                $(jsP).trigger('jspanelstatechange', jsP.attr('id'));
                // controls und title zurücksetzen
                jsPanel.hideControls(".jsPanel-btn-norm, .jsPanel-btn-smallrev", jsP);
                $("iframe", jsP.content).css("display", "block"); // on test
            });

            $(jsP).on("dragstart", function () {
                // remove window.scroll handler, is added again on dragstop
                $(window).off('scroll', jsP.jsPanelfixPos);
                if (jsP.option.paneltype.mode === 'extended') {
                    jsP.css('z-index', '10000');
                }
            });

            $(jsP).on("dragstop", function () {
                jsP.option.position = {
                    top: jsP.css('top'),
                    left: jsP.css('left')
                };
                jsP.verticalOffset = jsPanel.calcVerticalOffset(jsP) || 0;
                if (jsP.parentElmtTagname === 'body') {
                    jsPanel.fixPosition(jsP);
                }
            });

            $(jsP).on( "jspanelminimized", function(){
                jsPanel.hideControls(".jsPanel-btn-min, .jsPanel-btn-small, .jsPanel-btn-smallrev, .jsPanel-btn-hide", jsP);
                jsPanel.updateStateProps(jsP, "minimized");
                $(window).off('scroll', jsP.jsPanelfixPos);
            });

            $(jsP).on( "jspanelmaximized", function(){
                jsPanel.resizeContent(jsP);
                jsPanel.resizeTitle(jsP);
                jsPanel.hideControls(".jsPanel-btn-max, .jsPanel-btn-smallrev", jsP);
                jsPanel.updateStateProps(jsP, "maximized");
                // additionally trigger the jQuery UI resize event (on request of Gareth Bult)
                jsP.trigger("resize");
            });

            $(jsP).on( "jspanelnormalized", function(){
                jsPanel.hideControls(".jsPanel-btn-norm, .jsPanel-btn-smallrev", jsP);
                jsPanel.resizeTitle(jsP);
                jsPanel.resizeContent(jsP);
                jsPanel.updateStateProps(jsP, "normalized");
                // additionally trigger the jQuery UI resize event (on request of Gareth Bult)
                jsP.trigger("resize");
            });

        }

        /* option.autoclose | default: false --------------------------------------- */
        if (typeof jsP.option.autoclose === 'number' && jsP.option.autoclose > 0) {
            jsPanel.autoclose(jsP);
        }

        /* tooltip corrections ----------------------------------------------------- */
        if (jsP.option.paneltype.type === "tooltip" && (jsP.option.paneltype.position === "top" || jsP.option.paneltype.position === "bottom")) {
            jsPanel.shiftTooltipHorizontal(jsP, jsP.option.paneltype.shiftwithin);
        } else if (jsP.option.paneltype.position === "left" || jsP.option.paneltype.position === "right") {
            jsPanel.shiftTooltipVertical(jsP, jsP.option.paneltype.shiftwithin);
        }

        /* option.panelstatus --------------------------------------------------------------------------------------- */
        if (jsP.option.panelstatus) {
            switch (jsP.option.panelstatus) {
                case "minimized":
                    jsPanel.minimize(jsP);
                    break;
                case "maximized":
                    jsPanel.maximize(jsP);
                    break;
                case ("smallified"):
                    jsPanel.smallify(jsP);
                    break;
                case ("smallifiedMax"):
                    jsPanel.maximize(jsP);
                    jsPanel.smallify(jsP);
                    break;
            }
        } else {
            jsPanel.updateStateProps(jsP, "normalized");
        }

        /* jsP.option.callback --------------------------------------------------------- */
        if ($.isFunction(jsP.option.callback)) {
            jsP.option.callback.call(jsP, jsP);
        } else if ($.isArray(jsP.option.callback)) {
            jsP.option.callback.forEach(function(item){
                if ($.isFunction(item)) {
                    item.call(jsP, jsP);
                }
            });
        }

        return jsP;
    };

    /* jsPanel.defaults */
    $.jsPanel.defaults = {
        "addClass": {
            header: false,
            content: false,
            footer: false
        },
        "ajax": {
            autoload: true
        },
        "autoclose": false,
        "bootstrap": false,
        "callback": undefined,
        "content": false,
        "controls": {
            buttons: true,
            iconfont: 'jsglyph',
            close: false,
            confirmClose: false,
            maximize: false,
            minimize: false,
            normalize: false,
            smallify: false,
            maxtoScreen: false
        },
        "custom": false,
        "dblclicks": false,
        "draggable": {
            handle: 'div.jsPanel-hdr, div.jsPanel-ftr',
            stack: '.jsPanel',
            opacity: 0.7
        },
        "id": function () {
            jsPanel.ID += 1;
            return 'jsPanel-' + jsPanel.ID;
        },
        "iframe": false,
        "load": false,
        "maximizedMargin": {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        },
        "offset": {
            top: 0,
            left: 0
        },
        "onbeforeclose": false,
        "onbeforemaximize": false,
        "onbeforeminimize": false,
        "onbeforenormalize": false,
        "onclosed": false,
        "oncmaximized": false,
        "onminimized": false,
        "onnormalized": false,
        "overflow": 'hidden',
        "panelstatus": false,
        "paneltype": false,
        "position": 'auto',
        "removeHeader": false,
        "resizable": {
            handles: 'n, e, s, w, ne, se, sw, nw',
            autoHide: false,
            minWidth: 150,
            minHeight: 93
        },
        "rtl": false,
        "selector": 'body',
        "show": 'fadeIn',
        "size": {
            width: '400px',
            height: '222px'
        },
        "template": false,
        "theme": 'default',
        "title": 'jsPanel',
        "toolbarFooter": false,
        "toolbarHeader": false
    };

    /*
     * jQuery alterClass plugin
     * Remove element classes with wildcard matching. Optionally add classes:
     * $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
     * Copyright (c) 2011 Pete Boere (the-echoplex.net)
     * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
     */
    $.fn.alterClass = function (removals, additions) {
        var self = this,
            patt;
        if (removals.indexOf('*') === -1) {
            // Use native jQuery methods if there is no wildcard matching
            self.removeClass(removals);
            return !additions ? self : self.addClass(additions);
        }
        patt = new RegExp('\\s' +
            removals.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') +
            '\\s', 'g');
        self.each(function (i, it) {
            var cn = ' ' + it.className + ' ';
            while (patt.test(cn)) {
                cn = cn.replace(patt, ' ');
            }
            it.className = $.trim(cn);
        });
        return !additions ? self : self.addClass(additions);
    };

    /* body click handler: remove all tooltips on click in body except click is inside tooltip */
    $('body').click(function (e) {
        var pID,
            isTT = $(e.target).closest('.jsPanel-tt' ).length;
        if (isTT < 1) {
            $('.jsPanel-tt').each(function () {
                pID = $(this).attr('id');
                // if present remove tooltip wrapper and than remove tooltip
                $('#' + pID).unwrap().remove();
                $('body').trigger('jspanelclosed', pID);
            });
        }
    });

}(jQuery));

/*
  :: Number.isInteger() polyfill ::
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
*/
if (!Number.isInteger) {
    Number.isInteger = function isInteger(nVal) {
        "use strict";
        return typeof nVal === 'number' && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
    };
}
