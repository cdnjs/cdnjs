/* jquery.jspanel.js file version and date: 3.4.0 2016-10-27 13:45 */
/* global jsPanel */
'use strict';
// Object.assign Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign - ONLY FOR IE11
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable:   false,
        configurable: true,
        writable:     true,
        value:        function (target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}
// Array.prototype.find Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill - ONLY FOR IE11
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
// Array.prototype.findIndex Polyfill - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#Polyfill - ONLY FOR IE11
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}
// Array.prototype.includes Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill - ONLY FOR IE11 & EDGE
if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement /*, fromIndex*/) {
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {
                k = 0;
            }
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
            k++;
        }
        return false;
    };
}
// String.prototype.includes Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill - ONLY FOR IE11
if (!String.prototype.includes) {
    String.prototype.includes = function () {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

var jsPanel = {
    version:             '3.4.0',
    date:                '2016-10-27 13:45',
    id:                  0,     // counter to add to automatically generated id attribute
    ziBase:              100,   // the lowest z-index a jsPanel may have
    zi:                  100,   // z-index counter, has initially to be the same as ziBase
    modalcount:          0,     // counter to set modal background and modal jsPanel z-index
    autopositionSpacing: 5,     // sets spacing between autopositioned jsPanels
    pbTreshold:          0.556, // perceived brightness threshold to switch between white or black font color
    lastbeforeclose:     false, // used in the handlers to reposition autopositioned panels
    template:            `<div class="jsPanel">
                <div class="jsPanel-hdr">
                    <div class="jsPanel-headerbar">
                        <div class="jsPanel-headerlogo"></div>
                        <div class="jsPanel-titlebar">
                            <h3 class="jsPanel-title"></h3>
                        </div>
                        <div class="jsPanel-controlbar">
                            <div class="jsPanel-btn jsPanel-btn-smallify"><span class="jsglyph jsglyph-chevron-up"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-smallifyrev"><span class="jsglyph jsglyph-chevron-down"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-minimize"><span class="jsglyph jsglyph-minimize"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-normalize"><span class="jsglyph jsglyph-normalize"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-maximize"><span class="jsglyph jsglyph-maximize"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>
                        </div>
                    </div>
                    <div class="jsPanel-hdr-toolbar"></div>
                </div>
                <div class="jsPanel-content"></div>
                <div class="jsPanel-minimized-box"></div>
                <div class="jsPanel-ftr"></div>
               </div>`,
    replacementTemplate: `<div class="jsPanel-replacement">
                            <div class="jsPanel-hdr">
                                <div class="jsPanel-headerbar">
                                    <div class="jsPanel-titlebar">
                                        <h3 class="jsPanel-title"></h3>
                                    </div>
                                    <div class="jsPanel-controlbar">
                                        <div class="jsPanel-btn jsPanel-btn-normalize"><span class="jsglyph jsglyph-normalize"></span></div>
                                        <div class="jsPanel-btn jsPanel-btn-maximize"><span class="jsglyph jsglyph-maximize"></span></div>
                                        <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>
                                    </div>
                                </div>
                            </div>
                          </div>`,
    themes:              ['default', 'primary', 'info', 'success', 'warning', 'danger'],
    mdbthemes:           ['secondary', 'elegant', 'stylish', 'unique', 'special'], // just the extra themes which are not contained in jsPanel.themes
    tplHeaderOnly:       `<div class="jsPanel">
                        <div class="jsPanel-hdr">
                            <div class="jsPanel-headerbar">
                                <div class="jsPanel-headerlogo"></div>
                                <div class="jsPanel-titlebar">
                                    <h3 class="jsPanel-title"></h3>
                                </div>
                                <div class="jsPanel-controlbar">
                                    <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>
                                </div>
                            </div>
                            <div class="jsPanel-hdr-toolbar"></div>
                        </div>
                    </div>`,
    tplContentOnly:      `<div class="jsPanel">
                        <div class="jsPanel-content jsPanel-content-noheader jsPanel-content-nofooter"></div>
                        <div class="jsPanel-minimized-box"></div>
                     </div>`,
    activePanels:        {
        list: [],
        getPanel(arg) {
            return typeof arg === 'string' ? document.getElementById(arg).jspanel.noop() : document.getElementById(this.list[arg]).jspanel.noop();
        }
        // example: jsPanel.activePanels.getPanel(0).resize(600,250).reposition().css('background','yellow');
        // or:      jsPanel.activePanels.getPanel('jsPanel-1').resize(600,250).reposition().css('background','yellow');
    },
    closeOnEscape:       false,
    isIE:                (function () {
        return navigator.appVersion.includes('Trident');
    }()),
    isEdge:              (function () {
        return navigator.appVersion.includes('Edge');
    }()),

    addConnector(panel) {
        const bgColor = panel.option.paneltype.connectorBG || null;

        if (panel.hasClass('jsPanel-tooltip-top')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-top">');
            $('.jsPanel-connector-top', panel).css('border-top-color', bgColor || this.calcConnectorBg(panel, 'top'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;

        } else if (panel.hasClass('jsPanel-tooltip-bottom')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-bottom">');
            $('.jsPanel-connector-bottom', panel).css('border-bottom-color', bgColor || this.calcConnectorBg(panel, 'bottom'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;

        } else if (panel.hasClass('jsPanel-tooltip-left')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-left">');
            $('.jsPanel-connector-left', panel).css('border-left-color', bgColor || this.calcConnectorBg(panel, 'left'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;

        } else if (panel.hasClass('jsPanel-tooltip-right')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-right">');
            $('.jsPanel-connector-right', panel).css('border-right-color', bgColor || this.calcConnectorBg(panel, 'right'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;

        } else if (panel.hasClass('jsPanel-tooltip-lefttopcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-lefttopcorner">');
            $('.jsPanel-connector-lefttopcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'lefttopcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-righttopcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-righttopcorner">');
            $('.jsPanel-connector-righttopcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'righttopcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-rightbottomcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-rightbottomcorner">');
            $('.jsPanel-connector-rightbottomcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'rightbottomcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-leftbottomcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-leftbottomcorner">');
            $('.jsPanel-connector-leftbottomcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'leftbottomcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-lefttop')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-lefttop">');
            $('.jsPanel-connector-lefttop', panel).css('border-left-color', bgColor || this.calcConnectorBg(panel, 'lefttop'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;

        } else if (panel.hasClass('jsPanel-tooltip-leftbottom')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-leftbottom">');
            $('.jsPanel-connector-leftbottom', panel).css('border-left-color', bgColor || this.calcConnectorBg(panel, 'leftbottom'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;
        } else if (panel.hasClass('jsPanel-tooltip-topleft')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-topleft">');
            $('.jsPanel-connector-topleft', panel).css('border-top-color', bgColor || this.calcConnectorBg(panel, 'topleft'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;

        } else if (panel.hasClass('jsPanel-tooltip-topright')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-topright">');
            $('.jsPanel-connector-topright', panel).css('border-top-color', bgColor || this.calcConnectorBg(panel, 'topright'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;

        } else if (panel.hasClass('jsPanel-tooltip-righttop')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-righttop">');
            $('.jsPanel-connector-righttop', panel).css('border-right-color', bgColor || this.calcConnectorBg(panel, 'righttop'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;

        } else if (panel.hasClass('jsPanel-tooltip-rightbottom')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-rightbottom">');
            $('.jsPanel-connector-rightbottom', panel).css('border-right-color', bgColor || this.calcConnectorBg(panel, 'rightbottom'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;

        } else if (panel.hasClass('jsPanel-tooltip-bottomleft')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-bottomleft">');
            $('.jsPanel-connector-bottomleft', panel).css('border-bottom-color', bgColor || this.calcConnectorBg(panel, 'bottomleft'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;

        } else if (panel.hasClass('jsPanel-tooltip-bottomright')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-bottomright">');
            $('.jsPanel-connector-bottomright', panel).css('border-bottom-color', bgColor || this.calcConnectorBg(panel, 'bottomright'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;

        }
    },

    addCustomTheme(theme) {
        if (!this.themes.includes(theme)) {
            this.themes.push(theme);
        }
    },

    ajax(panel) {

        const oAjax = panel.option.contentAjax;

        if (oAjax.then) {
            if (oAjax.then[0]) {
                oAjax.done = oAjax.then[0];
            }
            if (oAjax.then[1]) {
                oAjax.fail = oAjax.then[1];
            }
        }

        $.ajax(oAjax)
            .done((data, textStatus, jqXHR) => {

                if (oAjax.autoload) {
                    panel.content.append(data);
                }
                if ($.isFunction(oAjax.done)) {
                    oAjax.done.call(panel, data, textStatus, jqXHR, panel);
                }

            })
            .fail((jqXHR, textStatus, errorThrown) => {

                if ($.isFunction(oAjax.fail)) {
                    oAjax.fail.call(panel, jqXHR, textStatus, errorThrown, panel);
                }

            })
            .always((arg1, textStatus, arg3) => {

                if ($.isFunction(oAjax.always)) {
                    oAjax.always.call(panel, arg1, textStatus, arg3, panel);
                }

            });

        panel.data('ajaxURL', oAjax.url); // needed for exportPanels()

    },

    applyBuiltInTheme(panel, themeDetails) {

        panel.addClass(`jsPanel-theme-${themeDetails.color}`)  // do not remove theme from jsP
            .header.addClass(`jsPanel-theme-${themeDetails.color}`);

        // optionally set theme style
        if (themeDetails.filling === 'filled') {
            panel.content.css('background', '').addClass('jsPanel-content-filled');
        } else if (themeDetails.filling === 'filledlight') {
            panel.content.css('background', '').addClass('jsPanel-content-filledlight');
        }

        if (!panel.option.headerToolbar) {
            panel.content.css({borderTop: `1px solid ${panel.header.title.css('color')}`});
        }

    },

    applyArbitraryTheme(panel, themeDetails) {

        panel.header.css('background-color', themeDetails.colors[0]);
        $('.jsPanel-headerlogo, .jsPanel-title, .jsPanel-controlbar .jsPanel-btn .jsglyph, .jsPanel-hdr-toolbar', panel).css({color: themeDetails.colors[3]});

        if (panel.option.headerToolbar) {

            panel.header.toolbar.css({
                boxShadow:  `0 0 1px ${themeDetails.colors[3]} inset`,
                width:      'calc(100% + 4px)',
                marginLeft: '-1px'
            });

        } else {

            panel.content.css({borderTop: `1px solid ${themeDetails.colors[3]}`});

        }

        if (themeDetails.filling === 'filled') {

            panel.content.css({backgroundColor: themeDetails.colors[0], color: themeDetails.colors[3]});

        } else if (themeDetails.filling === 'filledlight') {

            panel.content.css({backgroundColor: themeDetails.colors[1]});

        }

    },

    applyBootstrapTheme(panel, themeDetails) {

        let pColor;

        panel.addClass(`panel panel-${themeDetails.bstheme} card card-inverse card-${themeDetails.bstheme}`)
            .header.addClass('panel-heading')
            .title.addClass('panel-title');

        // added support for material-design-for-bootstrap 4.x colors
        if (themeDetails.bs === 'mdb') {
            let mdbColor = `${themeDetails.bstheme}-color`;
            if (themeDetails.mdbStyle) {
                mdbColor = `${mdbColor}-dark`;
            }
            panel.removeClass(`panel panel-${themeDetails.bstheme}`)
                .addClass(mdbColor);
        }
        // ----------------------------------------------------

        panel.content.addClass('panel-body')
            // fix css problems for panels nested in other bootstrap panels
            .css('border-top-color', () => {
                return panel.header.css('border-top-color');
            });

        panel.footer.addClass('panel-footer card-footer');

        if ($('.panel-heading', panel).css('background-color') === 'transparent') {
            pColor = panel.css('background-color').replace(/\s+/g, '');
        } else {
            pColor = $('.panel-heading', panel).css('background-color').replace(/\s+/g, '');
        }

        const bsColors = this.calcColors(pColor);
        $('.jsPanel-headerlogo, .jsPanel-title, .jsPanel-controlbar .jsPanel-btn, .jsPanel-hdr-toolbar', panel.header).css('color', bsColors[3]);

        if (panel.option.headerToolbar) {
            panel.header.toolbar.css({
                boxShadow:  `0 0 1px ${bsColors[3]} inset`,
                width:      'calc(100% + 4px)',
                marginLeft: '-1px'
            });
        } else {
            panel.content.css({borderTop: `1px solid ${bsColors[3]}`});
        }

        if (themeDetails.filling === 'filled') {
            panel.content.css({backgroundColor: pColor, color: bsColors[3]});
        } else if (themeDetails.filling === 'filledlight') {
            panel.content.css({backgroundColor: bsColors[1], color: '#000000'});
        }

    },

    applyThemeBorder(panel, themeDetails) {

        const bordervalues = panel.option.border.split(' ');
        panel.css({'border-width': bordervalues[0], 'border-style': bordervalues[1]});
        panel.header.css({'border-top-left-radius': 0, 'border-top-right-radius': 0});

        if (!themeDetails.bs) {
            if (!this.themes.includes(themeDetails.color)) {
                // arbitrary themes only (for built-in themes it's taken from the css file)
                bordervalues[2] ? panel.css('border-color', bordervalues[2]) : panel.css('border-color', themeDetails.colors[0]);
            }
        } else {
            // bootstrap
            let pColor;
            if ($('.panel-heading', panel).css('background-color') === 'transparent') {
                pColor = panel.css('background-color').replace(/\s+/g, '');
            } else {
                pColor = $('.panel-heading', panel).css('background-color').replace(/\s+/g, '');
            }
            bordervalues[2] ? panel.css('border-color', bordervalues[2]) : panel.css('border-color', pColor);
        }

    },

    calcColors(primaryColor) {
        const primeColor = this.color(primaryColor),
            secondColor = this.lighten(primaryColor, 0.81),
            thirdColor = this.darken(primaryColor, 0.5),
            fontColorForPrimary = this.perceivedBrightness(primaryColor) <= this.pbTreshold ? '#ffffff' : '#000000',
            fontColorForSecond = this.perceivedBrightness(secondColor) <= this.pbTreshold ? '#ffffff' : '#000000',
            fontColorForThird = this.perceivedBrightness(thirdColor) <= this.pbTreshold ? '#000000' : '#ffffff';

        return [primeColor.hsl.css, secondColor, thirdColor, fontColorForPrimary, fontColorForSecond, fontColorForThird];
    },

    calcConnectorBg(panel, connector) {
        const bgColor_content = panel.content.css('background-color'),
            bgColor_ftr = panel.footer.css('background-color'),
            bgColor_panel = panel.header.css('background-color');

        if (connector.match(/^(top|topleft|topright|lefttopcorner|righttopcorner|leftbottom|rightbottom)$/)) {

            if (panel.footer.css('display') !== 'none') {
                return bgColor_ftr;
            } else if (parseFloat(panel.option.contentSize.height) > 0) {
                return bgColor_content;
            }
            return bgColor_panel;

        } else if (connector.match(/^(bottom|bottomleft|bottomright|leftbottomcorner|rightbottomcorner)$/)) {

            if (!panel.option.headerRemove) {
                return bgColor_panel;
            } else if (parseFloat(panel.option.contentSize.height) > 0) {
                return bgColor_content;
            } else if (panel.footer.css('display') !== 'none') {
                return bgColor_ftr;
            }

        } else if (connector.match(/^(lefttop|righttop)$/)) {

            if (!panel.option.headerRemove) {
                return bgColor_panel;
            } else {
                return bgColor_content;
            }

        } else if (connector.match(/^(left|right)$/)) {

            if (parseFloat(panel.option.contentSize.height) > 0) {
                return bgColor_content;
            } else if (!panel.option.headerRemove) {
                return bgColor_panel;
            } else if (panel.footer.css('display') !== 'none') {
                return bgColor_ftr;
            }

        }

    },

    clearTheme(panel) {
        this.themes.concat(this.mdbthemes).forEach(function (value) {
            panel.removeClass(`panel card card-inverse jsPanel-theme-${value} panel-${value} card-${value} ${value}-color`);
            panel.header.removeClass(`panel-heading jsPanel-theme-${value}`);
        });
        $('.jsPanel-content', panel).removeClass('jsPanel-content-filled jsPanel-content-filledlight');
        panel.css({borderWidth: '', borderStyle: '', borderColor: ''});
        $('.jsPanel-hdr, .jsPanel-content', panel).css({background: ''});
        $('.jsPanel-headerlogo, .jsPanel-title, .jsPanel-controlbar .jsPanel-btn .jsglyph, .jsPanel-hdr-toolbar, .jsPanel-content', panel).css({color: ''});
        panel.header.title.removeClass('panel-title');
        panel.header.toolbar.css({boxShadow: '', width: '', marginLeft: ''});
        panel.content.removeClass('panel-body').css({borderTop: '', borderTopColor: ''});
        panel.footer.removeClass('panel-footer card-footer');
    },

    close(panel, ...params) {

        const id = panel.attr('id'),
            trigger = this.setTrigger(panel.option.position),
            delay = panel.option.delayClose,
            args = params;
        // params[0] has to be the callback or false
        // params[1] has to skipOnbeforeClose (if true callback is skipped)
        // params[2] has to be skipOnclosed (if true callback is skipped)

        function closePanel(panel, ...params) {
            params = args;

            // this code block is only relevant if panel uses autoposition ------------------------------
            const jsPop = panel.option.position;
            if (jsPop.autoposition || ( typeof jsPop === 'string' && jsPop.match(/DOWN|RIGHT|UP|LEFT/))) {

                const regex = /left-top|center-top|right-top|left-center|center|right-center|left-bottom|center-bottom|right-bottom/,
                    parent = $(panel).parent(),
                    match = document.getElementById(id).className.match(regex);

                if (match) {
                    jsPanel.lastbeforeclose = {
                        parent: parent,
                        class:  match[0]
                    };
                }

            }
            // ------------------------------------------------------------------------------------------

            // close all childpanels and then the panel itself
            panel.closeChildpanels().remove();

            // execute the following code only when panel really was removed
            if (!$(`#${id}`).length) {
                // remove id from activePanels.list
                const index = jsPanel.activePanels.list.findIndex(function (element) {
                    return element === id;
                });
                if (index > -1) {
                    jsPanel.activePanels.list.splice(index, 1);
                }

                // remove replacement if present
                jsPanel.remMinReplacement(panel);

                // remove modal backdrop of corresponding modal jsPanel
                if (panel.option.paneltype === 'modal') {
                    jsPanel.removeModalBackdrop(panel);
                }

                // remove class hasTooltip from tooltip trigger if panel to close is tooltip
                if (panel.option.paneltype.tooltip) {
                    $(trigger).removeClass('hasTooltip');
                }

                $(document).trigger('jspanelclosed', id);
                $(document).trigger('jspanelstatuschange', id);

                // this code block is only relevant if panel uses autoposition ------------------------------
                let container, panels, pos;
                if (jsPanel.lastbeforeclose) {
                    container = jsPanel.lastbeforeclose.parent;
                    panels = $(`.${jsPanel.lastbeforeclose.class}`, container);
                    pos = jsPanel.lastbeforeclose.class;
                }

                // than reposition all elmts
                if (panels) {

                    // remove classname from all panels
                    panels.each(function (index, elmt) {
                        $(elmt).removeClass(pos);
                    });

                    // reposition remaining autopositioned panels
                    panels.each(function (index, elmt) {
                        jsPanel.position(elmt, panel.option.position);
                    });

                }

                jsPanel.lastbeforeclose = false;
                // -----------------------------------------------------------------------------------------------

                // call onclosed callback of panel to close
                if (params[2] === true) {
                    $.noop();
                } else {
                    if ($.isFunction(panel.option.onclosed)) {
                        panel.option.onclosed.call(panel, panel);
                    }
                }
                // call individual callback
                if (params[0] && $.isFunction(params[0])) {
                    params[0].call(panel, panel);
                }

                jsPanel.resetZis();
            }
        }

        $(document).trigger('jspanelbeforeclose', id);

        if ($.isFunction(panel.option.onbeforeclose)) {
            // do not close panel if onbeforeclose callback returns false
            if (params[1] === true) {
                $.noop();
            } else {
                if (panel.option.onbeforeclose.call(panel, panel) === false) {
                    return panel;
                }
            }
        }

        // delay is not implemented as function parameter because it wouldn't allow to pass in a delay used also
        // when hitting the close button which just calls panel.close();
        if (!delay) {
            closePanel(panel, params[0], params[2]);
        } else if (typeof delay === 'number' && delay > 0) {
            window.setTimeout(function () {
                closePanel(panel, params[0], params[2]);
            }, delay);
        } else {
            closePanel(panel, params[0], params[2]);
        }
    },

    // can be called on any container, not only jsPanels
    closeChildpanels(panel) {
        $('.jsPanel', panel).each((index, elmt) => {
            // jspanel is not the global object jsPanel but the extension for the individual panel elmt
            elmt.jspanel.close();
        });
        return panel;
    },

    closeTooltips() {
        $('.jsPanel-tooltip').each((index, elmt) => {
            if (elmt.jspanel) elmt.jspanel.close();
        });
    },

    calcPositionFactors(panel) {
        if (panel.option.container === 'body') {
            panel.hf = parseInt(panel.css('left'), 10) / ($(window).outerWidth() - panel.outerWidth());
            panel.vf = parseInt(panel.css('top'), 10) / ($(window).outerHeight() - panel.outerHeight());
        } else {
            panel.hf = parseInt(panel.css('left'), 10) / (panel.parent().outerWidth() - panel.outerWidth());
            panel.vf = parseInt(panel.css('top'), 10) / (panel.parent().outerHeight() - panel.outerHeight());
        }
    },

    color(val) {

        let color = val.toLowerCase(),
            r, g, b, h, s, l, match, channels, hsl, result = {};
        const hexPattern = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi, // matches "#123" or "#f05a78" with or without "#"
            RGBAPattern = /^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi, // matches rgb/rgba color values, whitespace allowed
            HSLAPattern = /^hsla?\(([0-9]{1,3}),([0-9]{1,3}\%),([0-9]{1,3}\%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
            namedColors = {
                aliceblue:            'f0f8ff',
                antiquewhite:         'faebd7',
                aqua:                 '0ff',
                aquamarine:           '7fffd4',
                azure:                'f0ffff',
                beige:                'f5f5dc',
                bisque:               'ffe4c4',
                black:                '000',
                blanchedalmond:       'ffebcd',
                blue:                 '00f',
                blueviolet:           '8a2be2',
                brown:                'a52a2a',
                burlywood:            'deb887',
                cadetblue:            '5f9ea0',
                chartreuse:           '7fff00',
                chocolate:            'd2691e',
                coral:                'ff7f50',
                cornflowerblue:       '6495ed',
                cornsilk:             'fff8dc',
                crimson:              'dc143c',
                cyan:                 '0ff',
                darkblue:             '00008b',
                darkcyan:             '008b8b',
                darkgoldenrod:        'b8860b',
                darkgray:             'a9a9a9',
                darkgrey:             'a9a9a9',
                darkgreen:            '006400',
                darkkhaki:            'bdb76b',
                darkmagenta:          '8b008b',
                darkolivegreen:       '556b2f',
                darkorange:           'ff8c00',
                darkorchid:           '9932cc',
                darkred:              '8b0000',
                darksalmon:           'e9967a',
                darkseagreen:         '8fbc8f',
                darkslateblue:        '483d8b',
                darkslategray:        '2f4f4f',
                darkslategrey:        '2f4f4f',
                darkturquoise:        '00ced1',
                darkviolet:           '9400d3',
                deeppink:             'ff1493',
                deepskyblue:          '00bfff',
                dimgray:              '696969',
                dimgrey:              '696969',
                dodgerblue:           '1e90ff',
                firebrick:            'b22222',
                floralwhite:          'fffaf0',
                forestgreen:          '228b22',
                fuchsia:              'f0f',
                gainsboro:            'dcdcdc',
                ghostwhite:           'f8f8ff',
                gold:                 'ffd700',
                goldenrod:            'daa520',
                gray:                 '808080',
                grey:                 '808080',
                green:                '008000',
                greenyellow:          'adff2f',
                honeydew:             'f0fff0',
                hotpink:              'ff69b4',
                indianred:            'cd5c5c',
                indigo:               '4b0082',
                ivory:                'fffff0',
                khaki:                'f0e68c',
                lavender:             'e6e6fa',
                lavenderblush:        'fff0f5',
                lawngreen:            '7cfc00',
                lemonchiffon:         'fffacd',
                lightblue:            'add8e6',
                lightcoral:           'f08080',
                lightcyan:            'e0ffff',
                lightgoldenrodyellow: 'fafad2',
                lightgray:            'd3d3d3',
                lightgrey:            'd3d3d3',
                lightgreen:           '90ee90',
                lightpink:            'ffb6c1',
                lightsalmon:          'ffa07a',
                lightseagreen:        '20b2aa',
                lightskyblue:         '87cefa',
                lightslategray:       '789',
                lightslategrey:       '789',
                lightsteelblue:       'b0c4de',
                lightyellow:          'ffffe0',
                lime:                 '0f0',
                limegreen:            '32cd32',
                linen:                'faf0e6',
                magenta:              'f0f',
                maroon:               '800000',
                mediumaquamarine:     '66cdaa',
                mediumblue:           '0000cd',
                mediumorchid:         'ba55d3',
                mediumpurple:         '9370d8',
                mediumseagreen:       '3cb371',
                mediumslateblue:      '7b68ee',
                mediumspringgreen:    '00fa9a',
                mediumturquoise:      '48d1cc',
                mediumvioletred:      'c71585',
                midnightblue:         '191970',
                mintcream:            'f5fffa',
                mistyrose:            'ffe4e1',
                moccasin:             'ffe4b5',
                navajowhite:          'ffdead',
                navy:                 '000080',
                oldlace:              'fdf5e6',
                olive:                '808000',
                olivedrab:            '6b8e23',
                orange:               'ffa500',
                orangered:            'ff4500',
                orchid:               'da70d6',
                palegoldenrod:        'eee8aa',
                palegreen:            '98fb98',
                paleturquoise:        'afeeee',
                palevioletred:        'd87093',
                papayawhip:           'ffefd5',
                peachpuff:            'ffdab9',
                peru:                 'cd853f',
                pink:                 'ffc0cb',
                plum:                 'dda0dd',
                powderblue:           'b0e0e6',
                purple:               '800080',
                rebeccapurple:        '639',
                red:                  'f00',
                rosybrown:            'bc8f8f',
                royalblue:            '4169e1',
                saddlebrown:          '8b4513',
                salmon:               'fa8072',
                sandybrown:           'f4a460',
                seagreen:             '2e8b57',
                seashell:             'fff5ee',
                sienna:               'a0522d',
                silver:               'c0c0c0',
                skyblue:              '87ceeb',
                slateblue:            '6a5acd',
                slategray:            '708090',
                slategrey:            '708090',
                snow:                 'fffafa',
                springgreen:          '00ff7f',
                steelblue:            '4682b4',
                tan:                  'd2b48c',
                teal:                 '008080',
                thistle:              'd8bfd8',
                tomato:               'ff6347',
                turquoise:            '40e0d0',
                violet:               'ee82ee',
                wheat:                'f5deb3',
                white:                'fff',
                whitesmoke:           'f5f5f5',
                yellow:               'ff0',
                yellowgreen:          '9acd32'
            };

        // change named color to corresponding hex value
        if (namedColors[color]) {
            color = namedColors[color];
        }

        // check val for hex color
        if (color.match(hexPattern) !== null) {

            // '#' entfernen wenn vorhanden
            color = color.replace('#', '');

            // color has either 3 or 6 characters
            if (color.length % 2 === 1) {

                // color has 3 char -> convert to 6 char
                // r = color.substr(0,1).repeat(2);
                // g = color.substr(1,1).repeat(2); // String.prototype.repeat() doesn't work in IE11
                // b = color.substr(2,1).repeat(2);
                r = String(color.substr(0, 1)) + color.substr(0, 1);
                g = String(color.substr(1, 1)) + color.substr(1, 1);
                b = String(color.substr(2, 1)) + color.substr(2, 1);

                result.rgb = {
                    r: parseInt(r, 16),
                    g: parseInt(g, 16),
                    b: parseInt(b, 16)
                };

                result.hex = `#${r}${g}${b}`;

            } else {

                // color has 6 char
                result.rgb = {
                    r: parseInt(color.substr(0, 2), 16),
                    g: parseInt(color.substr(2, 2), 16),
                    b: parseInt(color.substr(4, 2), 16)
                };

                result.hex = `#${color}`;

            }

            hsl = this.rgbToHsl(result.rgb.r, result.rgb.g, result.rgb.b);
            result.hsl = hsl;
            result.rgb.css = `rgb(${result.rgb.r},${result.rgb.g},${result.rgb.b})`;

        }
        // check val for rgb/rgba color
        else if (color.match(RGBAPattern)) {

            match = RGBAPattern.exec(color);
            result.rgb = {css: color, r: match[1], g: match[2], b: match[3]};
            result.hex = this.rgbToHex(match[1], match[2], match[3]);
            hsl = this.rgbToHsl(match[1], match[2], match[3]);
            result.hsl = hsl;

        }
        // check val for hsl/hsla color
        else if (color.match(HSLAPattern)) {

            match = HSLAPattern.exec(color);

            h = match[1] / 360;
            s = match[2].substr(0, match[2].length - 1) / 100;
            l = match[3].substr(0, match[3].length - 1) / 100;

            channels = this.hslToRgb(h, s, l);

            result.rgb = {
                css: `rgb(${channels[0]},${channels[1]},${channels[2]})`,
                r:   channels[0],
                g:   channels[1],
                b:   channels[2]
            };
            result.hex = this.rgbToHex(result.rgb.r, result.rgb.g, result.rgb.b);
            result.hsl = {css: `hsl(${match[1]},${match[2]},${match[3]})`, h: match[1], s: match[2], l: match[3]};

        }

        // or return #f5f5f5
        else {
            result.hex = '#f5f5f5';
            result.rgb = {css: 'rgb(245,245,245)', r: 245, g: 245, b: 245};
            result.hsl = {css: 'hsl(0,0%,96.08%)', h: 0, s: '0%', l: '96.08%'};
        }

        return result;

    },

    configIconfont(panel) {
        const controlsArray = ['close', 'maximize', 'normalize', 'minimize', 'smallify', 'smallifyrev'],
            bootstrapArray = ['remove', 'fullscreen', 'resize-full', 'minus', 'chevron-up', 'chevron-down'],
            fontawesomeArray = ['times fa-window-close', 'arrows-alt fa-window-maximize', 'expand fa-window-restore', 'minus fa-window-minimize', 'chevron-up', 'chevron-down'],
            materialArray = ['close', 'fullscreen', 'fullscreen_exit', 'call_received', 'expand_less', 'expand_more'],
            optIconfont = panel.option.headerControls.iconfont,
            controls = panel.header.headerbar;
        // set icons
        if (optIconfont === 'bootstrap' || optIconfont === 'glyphicon') {

            controlsArray.forEach((item, i) => {
                $(`.jsPanel-btn-${item} span`, controls).removeClass().addClass(`glyphicon glyphicon-${bootstrapArray[i]}`);
            });

        } else if (optIconfont === 'font-awesome') {

            controlsArray.forEach((item, i) => {
                $(`.jsPanel-btn-${item} span`, controls).removeClass().addClass(`fa fa-${fontawesomeArray[i]}`);
            });

        } else if (optIconfont === 'material-icons') {

            controlsArray.forEach((item, i) => {
                $(`.jsPanel-btn-${item} span`, controls).removeClass().addClass('material-icons').text(materialArray[i]);
            });

        }
    },

    // builds toolbar
    configToolbar(toolbaritems, toolbarplace, panel) {

        let el;

        toolbaritems.forEach(item => {

            if (typeof item === 'object') {

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

                    const elEvent = item.event || 'click';
                    el.on(elEvent, panel, item.callback);
                    // jsP is accessible in the handler as "event.data"

                }

            }

        });

    },

    contentReload(panel, callback) {
        if (panel.option.content) {
            panel.content.empty().append(panel.option.content);
        } else if (panel.option.contentAjax) {
            panel.content.empty();
            this.ajax(panel);
        } else if (panel.option.contentIframe) {
            panel.content.empty();
            this.iframe(panel);
        }
        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }
        return panel;
    },

    contentResize(panel, callback) {
        const hdrftr = panel.footer.hasClass('active') ? panel.header.outerHeight() + panel.footer.outerHeight() : panel.header.outerHeight(),
            borderWidth = parseInt(panel.css('border-top-width'), 10) + parseInt(panel.css('border-bottom-width'), 10);

        panel.content.css({height: panel.outerHeight() - hdrftr - borderWidth});

        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },

    // create and configure minimized replacement
    createMinimizedReplacement(panel) {
        let replacement = $(this.replacementTemplate);
        const fontColor = panel.header.title.css('color');
        let bgColor;
        if (panel.header.css('background-color') === 'transparent') {
            bgColor = panel.css('background-color');
        } else {
            bgColor = panel.header.css('background-color');
        }

        // move jsPanel off screen
        panel.css('left', '-9999px')
            .data('status', 'minimized');

        // set replacement colors
        replacement.css({backgroundColor: bgColor})
            .prop('id', `${panel.prop('id')}-min`)
            .find('h3').css({color: fontColor})
            .prop('title', panel.header.title[0].textContent)
            .html(panel.headerTitle());

        // add logo
        if (panel.header.logo.children().length) {
            $('.jsPanel-headerbar', replacement).prepend(panel.header.logo.clone());
        }

        // set replacement iconfont
        const iconfont = panel.option.headerControls.iconfont;
        if (iconfont === 'font-awesome') {
            $('.jsglyph.jsglyph-normalize', replacement).removeClass().addClass('fa fa-expand fa-window-restore');
            $('.jsglyph.jsglyph-maximize', replacement).removeClass().addClass('fa fa-arrows-alt fa-window-maximize');
            $('.jsglyph.jsglyph-close', replacement).removeClass().addClass('fa fa-times fa-window-close');
        } else if (iconfont === 'bootstrap' || iconfont === 'glyphicon') {
            $('.jsglyph.jsglyph-normalize', replacement).removeClass().addClass('glyphicon glyphicon-resize-full');
            $('.jsglyph.jsglyph-maximize', replacement).removeClass().addClass('glyphicon glyphicon-fullscreen');
            $('.jsglyph.jsglyph-close', replacement).removeClass().addClass('glyphicon glyphicon-remove');
        } else if (iconfont === 'material-icons') {
            $('.jsglyph.jsglyph-normalize', replacement).removeClass().addClass('material-icons').text('call_made');
            $('.jsglyph.jsglyph-maximize', replacement).removeClass().addClass('material-icons').text('fullscreen');
            $('.jsglyph.jsglyph-close', replacement).removeClass().addClass('material-icons').text('close');
        }
        $('.jsPanel-btn span', replacement).css({color: fontColor});

        return replacement;
    },

    darken(val, amount) {
        // amount is value between 0 and 1
        const hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = l - (l * amount) + '%';
        return `hsl(${hsl.h},${hsl.s},${lnew})`;
    },

    // helper function for the doubleclick handlers (title, content, footer)
    dblclickhelper(odcs, panel) {

        if (typeof odcs === 'string') {

            if (odcs === 'maximize' || odcs === 'normalize') {

                panel.data('status') === 'normalized' ? panel.maximize() : panel.normalize();

            } else if (odcs === 'minimize' || odcs === 'smallify' || odcs === 'close') {

                panel[odcs]();

            }

        }

    },

    // export a panel layout to localStorage and returns array with an object for each panel
    exportPanels(selector = '.jsPanel', name = 'jspanels') {
        // only panels that match the passed selector are exported

        let panelArr = [];
        const panels = $('.jsPanel').not('.jsPanel-tooltip, .jsPanel-hint, .jsPanel-modal').filter(selector);

        // normalize minimized/maximized panels before export
        // status to restore is saved in exportedPanel.status
        panels.each((index, elmt) => {
            if ($(elmt).data('status') !== 'normalized') {

                $('.jsPanel-btn-normalize', elmt).trigger('click');

            }
        });

        panels.each((index, elmt) => {

            let elmtTop, elmtLeft, elmtWidth, elmtHeight, exportedPanel;
            const panelParent = $(elmt).data('container'),
                elmtOffset = $(elmt).offset(),
                elmtPosition = $(elmt).position(),
                elmtStatus = $(elmt).data('status');

            if (elmtStatus === 'minimized') {

                if (panelParent.toLowerCase() === 'body') {

                    elmtTop = $(elmt).data('paneltop') - $(window).scrollTop();
                    elmtLeft = $(elmt).data('panelleft') - $(window).scrollLeft();

                } else {

                    elmtTop = $(elmt).data('paneltop');
                    elmtLeft = $(elmt).data('panelleft');

                }

                elmtWidth = $(elmt).data('panelwidth');
                elmtHeight = $(elmt).data('panelheight');

            } else {

                if (panelParent.toLowerCase() === 'body') {

                    elmtTop = Math.floor(elmtOffset.top - $(window).scrollTop());
                    elmtLeft = Math.floor(elmtOffset.left - $(window).scrollLeft());

                } else {

                    elmtTop = Math.floor(elmtPosition.top);
                    elmtLeft = Math.floor(elmtPosition.left);

                }

                elmtWidth = $(elmt).css('width');
                elmtHeight = $('.jsPanel-content', elmt).css('height');

            }

            exportedPanel = {
                status:      $(elmt).data('status'),
                id:          $(elmt).prop('id'),
                headerTitle: $('.jsPanel-title', elmt).html(),
                custom:      $(elmt).data('custom'),
                content:     $(elmt).data('content'),
                contentSize: {width: elmtWidth, height: elmtHeight},
                position:    {my: 'left-top', at: 'left-top', offsetX: elmtLeft, offsetY: elmtTop}
            };

            if ($(elmt).data('ajaxURL')) {

                exportedPanel.contentAjax = {
                    url:      $(elmt).data('ajaxURL'),
                    autoload: true
                };

            }

            if ($(elmt).data('iframeDOC') || $(elmt).data('iframeSRC')) {

                exportedPanel.contentIframe = {
                    src:    $(elmt).data('iframeSRC') || '',
                    srcdoc: $(elmt).data('iframeDOC') || ''
                };

            }

            panelArr.push(exportedPanel);

            // restore status that is saved
            switch (exportedPanel.status) {

                case 'minimized':
                    $('.jsPanel-btn-minimize', elmt).trigger('click');
                    break;

                case 'maximized':
                    $('.jsPanel-btn-maximize', elmt).trigger('click');
                    break;

                case 'smallified':
                    $('.jsPanel-btn-smallify', elmt).trigger('click');
                    break;

                case 'smallifiedMax':
                    $('.jsPanel-btn-smallify', elmt).trigger('click');
                    break;

            }

        });

        window.localStorage.setItem(name, JSON.stringify(panelArr));

        return panelArr;

    },

    front(panel, callback) {
        panel.css('z-index', this.setZi(panel));
        this.resetZis();
        $(document).trigger('jspanelfronted', panel.prop('id'));
        if ($.isFunction(panel.option.onfronted)) {
            // do not front panel if onfronted callback returns false
            if (panel.option.onfronted.call(panel, panel) === false) {
                return panel;
            } else {
                panel.option.onfronted.call(panel, panel);
            }
        }
        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }
        return panel;
    },

    getThemeDetails(passedtheme) {
        const theme = {color: false, colors: false, filling: false, bs: false, bstheme: false};

        if (passedtheme.substr(-6, 6) === 'filled') {
            theme.filling = 'filled';
            theme.color = passedtheme.substr(0, passedtheme.length - 6);
        } else if (passedtheme.substr(-11, 11) === 'filledlight') {
            theme.filling = 'filledlight';
            theme.color = passedtheme.substr(0, passedtheme.length - 11);
        } else {
            theme.filling = '';
            theme.color = passedtheme; // themeDetails.color is the primary color
        }
        theme.colors = this.calcColors(theme.color);

        // if first part of theme includes a "-" it's assumed to be a bootstrap theme
        if (theme.color.match('-')) {
            const bsVariant = theme.color.split('-');
            theme.bs = bsVariant[0];
            theme.bstheme = bsVariant[1];
            theme.mdbStyle = bsVariant[2] || undefined;
        }

        return theme;

    },

    // get panel with highest z-index (only standard and modal panels, no hints or tooltips)
    getTopmostPanel() {

        let array = [];
        const panels = $('.jsPanel:not(.jsPanel-tooltip):not(.jsPanel-hint)');

        panels.each(function (index, item) {
            array.push(item);
        });

        array.sort(function (a, b) {
            // sort array in reverse order
            return $(b).css('z-index') - $(a).css('z-index');
        });

        return array[0].getAttribute('id');
    },

    headerTitle(panel, text) {
        if (text) {
            panel.header.title.empty().append(text);
            return panel;
        }
        return panel.header.title.html();
    },

    headerControl(panel, ctrl, action = 'enable') {
        if (ctrl) {
            this.setControlStatus(panel, ctrl, action);
        } else {
            ['close', 'maximize', 'minimize', 'normalize', 'smallify'].forEach(function (value) {
                jsPanel.setControlStatus(panel, value);
            });
        }
        return panel;
    },

    // https://gist.github.com/mjackson/5311256
    hslToRgb(h, s, l){
        // h, s and l must be values between 0 and 1
        var r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) {
                    t += 1;
                }
                if (t > 1) {
                    t -= 1;
                }
                if (t < 1 / 6) {
                    return p + (q - p) * 6 * t;
                }
                if (t < 1 / 2) {
                    return q;
                }
                if (t < 2 / 3) {
                    return p + (q - p) * (2 / 3 - t) * 6;
                }
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },

    iframe(panel) {

        let iFrame = $('<iframe></iframe>');
        const poi = panel.option.contentIframe;

        // iframe content
        if (poi.srcdoc) {
            iFrame.prop('srcdoc', poi.srcdoc);
            panel.data('iframeDOC', poi.srcdoc); // needed for exportPanels()
        }

        if (poi.src) {
            iFrame.prop('src', poi.src);
            panel.data('iframeSRC', poi.src); // needed for exportPanels()
        }

        //iframe size
        (panel.option.contentSize.width !== 'auto' && !poi.width) ? iFrame.css('width', '100%') : iFrame.prop('width', poi.width);
        (panel.option.contentSize.height !== 'auto' && !poi.height) ? iFrame.css('height', '100%') : iFrame.prop('height', poi.height);

        //iframe name
        if (poi.name) {
            iFrame.prop('name', poi.name);
        }

        //iframe sandbox
        if (poi.sandbox) {
            iFrame.prop('sandox', poi.sandbox);
        }

        //iframe id
        if (poi.id) {
            iFrame.prop('id', poi.id);
        }

        //iframe style
        if ($.isPlainObject(poi.style)) {
            iFrame.css(poi.style);
        }

        //iframe css classes
        if (typeof poi.classname === 'string') {

            iFrame.addClass(poi.classname);

        } else if ($.isFunction(poi.classname)) {

            iFrame.addClass(poi.classname());

        }

        panel.content.append(iFrame);

    },

    importPanels(predefinedConfigs, name = 'jspanels') {
        /* panelConfig needs to be an object with predefined configs.
         * A config named "default" will be applied to ALL panels
         *
         *       panelConfig = { default: { } [, config1 [, config2 [, configN ]]] };
         */

        const savedPanels = JSON.parse(localStorage[name]),
            defaultConfig = predefinedConfigs['default'] || {};
        let restoredConfig;

        savedPanels.forEach((savedconfig) => {

            // savedconfig represents one item in savedPanels
            if (typeof savedconfig.custom.config === 'string') {

                restoredConfig = $.extend(true, {}, defaultConfig, predefinedConfigs[savedconfig.custom.config], savedconfig);

            } else {

                restoredConfig = $.extend(true, {}, defaultConfig, savedconfig);

            }

            // restore panel
            $.jsPanel(restoredConfig);

        });

    },

    insertModalBackdrop(panel) {
        // inserts an individual modal backdrop for a modal jsPanel
        const backdropCount = $('.jsPanel-modal-backdrop').length,
            backdropClass = backdropCount === 0 ? 'jsPanel-modal-backdrop' : 'jsPanel-modal-backdrop jsPanel-modal-backdrop-multi',
            backdrop = `<div id="jsPanel-modal-backdrop-${panel.attr('id')}" class="${backdropClass}" style="z-index:${this.modalcount + 9999}"></div>`;

        $('body').append(backdrop);
        this.modalcount += 1;
        $(`#jsPanel-modal-backdrop-${panel.attr('id')}`).animate({opacity: 0.65}, 750);
    },

    lighten(val, amount) {
        // amount is value between 0 and 1
        const hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = (l + ((100 - l) * amount)) + '%';
        return `hsl(${hsl.h},${hsl.s},${lnew})`;
    },

    maximize(panel, callback, zi = true) {
        const margins = panel.option.maximizedMargin,
            pnt = panel[0].parentNode,
            id = panel.attr('id');

        // cache panel data like size and position etc. for later use
        if (panel.data('status') === 'normalized') {
            panel.updateCachedData();
        }

        $(document).trigger('jspanelbeforemaximize', id);

        if ($.isFunction(panel.option.onbeforemaximize)) {
            // do not maximize panel if onbeforemaximize callback returns false
            if (panel.option.onbeforemaximize.call(panel, panel) === false) {
                return panel;
            }
        }

        panel.css('overflow', 'visible');

        if (pnt === document.body) {
            // maximize within window
            panel.css({
                width:  (document.documentElement.clientWidth - margins.left - margins.right) + 'px',
                height: (document.documentElement.clientHeight - margins.top - margins.bottom) + 'px',
                left:   margins.left + 'px',
                top:    margins.top + 'px'
            });

            if (panel.option.position.fixed === false) {

                panel.css({
                    left: (window.pageXOffset + margins.left) + 'px',
                    top:  (window.pageYOffset + margins.top) + 'px'
                });

            }

        } else {
            // maximize within parentNode
            panel.css({
                width:  (pnt.clientWidth - margins.left - margins.right) + 'px',
                height: (pnt.clientHeight - margins.top - margins.bottom) + 'px',
                left:   margins.left + 'px',
                top:    margins.top + 'px'
            });

        }

        // update current panel data like size and position etc. for later use
        panel.contentResize().data('status', 'maximized');

        // zi is set to false in option.responsiveTo.windowresize to prevent maximized panel from being fronted on window.resize
        if (zi) {
            panel.css('z-index', this.setZi(panel));
        }

        panel.hideControls('.jsPanel-btn-maximize, .jsPanel-btn-smallifyrev');

        // remove replacement if present
        this.remMinReplacement(panel);

        $(document).trigger('jspanelmaximized', id);
        $(document).trigger('jspanelstatuschange', id);

        // call onmximized callback
        if ($.isFunction(panel.option.onmaximized)) {
            panel.option.onmaximized.call(panel, panel);
        }
        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;

    },

    minimize(panel, callback) {
        const id = panel.attr('id');
        if (panel.data('status') === 'minimized') {
            return panel;
        }

        $(document).trigger('jspanelbeforeminimize', id);

        if ($.isFunction(panel.option.onbeforeminimize)) {
            // do not minimize panel if onbeforeminimize callback returns false
            if (panel.option.onbeforeminimize.call(panel, panel) === false) {
                return panel;
            }
        }

        // cache panel data like size and position etc. for later use
        const status = panel.data('status');
        if (status === 'normalized') {
            panel.updateCachedData();
        } else if (status === 'smallified') {
            panel.cachedData.top = panel.css('top');
            panel.cachedData.left = panel.css('left');
        }

        // create and configure minimized replacement
        const replacement = this.createMinimizedReplacement(panel);

        // append replacement
        // cont has a positive length if option.container is .jsPanel-content or descendant of .jsPanel-content
        // so childpanels are minimized to their parent panel
        const cont = $(panel.option.container).closest('.jsPanel-content');
        if (!cont.length) {
            // if panel to minimize is not a childpanel
            let replacementContainer = '#jsPanel-replacement-container';
            if (panel.option.minimizeTo) {
                if (typeof panel.option.minimizeTo === 'string') {
                    replacementContainer = panel.option.minimizeTo;
                }
                $(replacementContainer).append(replacement);
            }
        } else {
            // wenn zu minimierendes panel childpanel ist
            let replacementContainer = '.jsPanel-minimized-box';
            if (panel.option.minimizeTo) {
                if (typeof panel.option.minimizeTo === 'string') {
                    replacementContainer = panel.option.minimizeTo;
                    $(replacementContainer).append(replacement);
                } else {
                    $(replacementContainer, cont.parent()).append(replacement);
                }
            }
        }

        $(document).trigger('jspanelminimized', id);
        $(document).trigger('jspanelstatuschange', id);

        // call onminimized callback
        if ($.isFunction(panel.option.onminimized)) {
            panel.option.onminimized.call(panel, panel);
        }
        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }

        // set handlers for replacement controls and disable replacement control if needed
        $('.jsPanel-btn-normalize', replacement).css('display', 'block').on('click', () => panel.normalize());

        if (panel[0].dataset.btnnormalize === 'disabled') {

            $('.jsPanel-btn-normalize', replacement).css({pointerEvents: 'none', opacity: 0.5, cursor: 'default'});

        } else if (panel[0].dataset.btnnormalize === 'removed') {

            $('.jsPanel-btn-normalize', replacement).remove();

        }

        $('.jsPanel-btn-maximize', replacement).on('click', () => panel.maximize());

        if (panel[0].dataset.btnmaximize === 'disabled') {

            $('.jsPanel-btn-maximize', replacement).css({pointerEvents: 'none', opacity: 0.5, cursor: 'default'});

        } else if (panel[0].dataset.btnmaximize === 'removed') {

            $('.jsPanel-btn-maximize', replacement).remove();

        }

        $('.jsPanel-btn-close', replacement).on('click', () => panel.close());

        if (panel[0].dataset.btnclose === 'disabled') {

            $('.jsPanel-btn-close', replacement).css({pointerEvents: 'none', opacity: 0.5, cursor: 'default'});

        }

        return panel;
    },

    normalize(panel, callback) {
        const id = panel.attr('id');
        if (panel.data('status') === 'normalized') {
            return panel;
        }

        $(document).trigger('jspanelbeforenormalize', id);

        if ($.isFunction(panel.option.onbeforenormalize)) {
            // do not normalize panel if onbeforenormalize callback returns false
            if (panel.option.onbeforenormalize.call(panel, panel) === false) {
                return panel;
            }
        }

        // if panel is only smallified just unsmallify it
        if (panel.data('status') === 'smallified') {
            panel.smallify();
            $(document).trigger('jspanelnormalized', id);
            $(document).trigger('jspanelstatuschange', id);
            // call onnormalized callback
            if ($.isFunction(panel.option.onnormalized)) {
                panel.option.onnormalized.call(panel, panel);
            }
            return panel;
        }

        panel.css({
            left:     panel.cachedData.left,
            top:      panel.cachedData.top,
            width:    panel.cachedData.width,
            height:   panel.cachedData.height,
            zIndex:   function () {
                jsPanel.setZi(panel);
            },
            overflow: 'visible'
        }).data('status', 'normalized')
            .contentResize();

        panel.hideControls('.jsPanel-btn-normalize, .jsPanel-btn-smallifyrev');

        // remove replacement
        this.remMinReplacement(panel);

        $(document).trigger('jspanelnormalized', id);
        $(document).trigger('jspanelstatuschange', id);

        // call onnormalized callback
        if ($.isFunction(panel.option.onnormalized)) {
            panel.option.onnormalized.call(panel, panel);
        }
        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },

    perceivedBrightness(val) {
        const rgb = this.color(val).rgb;
        // return value is in the range 0 - 1 and input rgb values must also be in the range 0 - 1
        // algorithm from: https://en.wikipedia.org/wiki/Rec._2020
        return ( (rgb.r / 255 * 0.2627) + (rgb.g / 255 * 0.6780) + (rgb.b / 255 * 0.0593) );
    },

    position(elmt, options) {
        /*
         elmt:    string selector or element object, default false
         options object {
         my:      string
         at:      string
         of:      string selector, defaults to 'window'
         offsetX: number, %-value, function
         offsetY: number, %-value, function
         modify:  function, default false
         fixed:   boolean, default true (effects only elmt appended to body when positioned relative to window
         autoposition: string, default false, can be one of 'DOWN', 'RIGHT', 'UP', 'LEFT'
         }
         return value: the positioned element

         NOTES:
         + when positioning an element appended to a parent other than body it's mandatory that the parent element is positioned somehow
         + border width of parent elmt is taken into account when calculating position
         + trying to position an elmt that is appended to some elmt other than body relative to window doesn't have an effect
         + when elmt is NOT appended to 'body' options.of has to be set with something other than 'window'
         */

        let elmtToPosition,
            elmtData,
            option,
            parentElmt,
            leftOffset = 0,
            topOffset = 0,
            newCoords,
            newCoordsLeft,
            newCoordsTop,
            optionDefaults = {
                my:      'center',
                at:      'center',
                offsetX: 0,
                offsetY: 0,
                modify:  false,
                fixed:   'true'
            };
        const leftArray = ['left-top', 'left-center', 'left-bottom'],
            centerVerticalArray = ['center-top', 'center', 'center-bottom'],
            rightArray = ['right-top', 'right-center', 'right-bottom'],
            topArray = ['left-top', 'center-top', 'right-top'],
            centerHorizontalArray = ['left-center', 'center', 'right-center'],
            bottomArray = ['left-bottom', 'center-bottom', 'right-bottom'];

        // returns coordinates for a number of standard window positions relative to window
        function getWindowCoords(pos) {
            let coords = {};

            if (leftArray.includes(pos)) {
                coords.left = window.pageXOffset;
            } else if (centerVerticalArray.includes(pos)) {
                coords.left = window.pageXOffset + (document.documentElement.clientWidth / 2);
            } else if (rightArray.includes(pos)) {
                coords.left = window.pageXOffset + (document.documentElement.clientWidth);
            } else {
                coords.left = window.pageXOffset;
            }

            if (topArray.includes(pos)) {
                coords.top = window.pageYOffset;
            } else if (centerHorizontalArray.includes(pos)) {
                coords.top = window.pageYOffset + (window.innerHeight / 2);
            } else if (bottomArray.includes(pos)) {
                coords.top = window.pageYOffset + (window.innerHeight);
            } else {
                coords.top = window.pageYOffset;
            }

            return coords;
        }

        // returns coordinates for a number of standard element positions relative to document
        function getElmtAgainstCoords(pos) {
            let coords = {},
                elmtAgainstData = getElementData(option.of);

            if (leftArray.includes(pos)) {
                coords.left = elmtAgainstData.left;
            } else if (centerVerticalArray.includes(pos)) {
                coords.left = elmtAgainstData.left + elmtAgainstData.width / 2;
            } else if (rightArray.includes(pos)) {
                coords.left = elmtAgainstData.left + elmtAgainstData.width;
            } else {
                coords.left = elmtAgainstData.left;
            }

            if (topArray.includes(pos)) {
                coords.top = elmtAgainstData.top;
            } else if (centerHorizontalArray.includes(pos)) {
                coords.top = elmtAgainstData.top + elmtAgainstData.height / 2;
            } else if (bottomArray.includes(pos)) {
                coords.top = elmtAgainstData.top + elmtAgainstData.height;
            } else {
                coords.top = elmtAgainstData.top;
            }

            return coords;
        }

        // returns coordinates for a number of standard positions inside an element with left:0 top:0 as starting point
        function getParentCoords(pos) {
            let coords = {},
                parentElmtData = parentElmt.getBoundingClientRect();

            if (leftArray.includes(pos)) {
                coords.left = 0;
            } else if (centerVerticalArray.includes(pos)) {
                coords.left = parentElmtData.width / 2;
            } else if (rightArray.includes(pos)) {
                coords.left = parentElmtData.width;
            } else {
                coords.left = 0;
            }

            if (topArray.includes(pos)) {
                coords.top = 0;
            } else if (centerHorizontalArray.includes(pos)) {
                coords.top = parentElmtData.height / 2;
            } else if (bottomArray.includes(pos)) {
                coords.top = parentElmtData.height;
            } else {
                coords.top = 0;
            }

            return coords;
        }

        // returns coordinates for a number of standard positions inside an element with position of element relative to parent as starting point
        function getElementCoords(pos) {
            let coords = {};
            const parentData = parentElmt.getBoundingClientRect(),
                againstData = document.querySelector(option.of).getBoundingClientRect(),
                baseLeft = againstData.left - parentData.left,
                baseTop = againstData.top - parentData.top;

            if (leftArray.includes(pos)) {
                coords.left = baseLeft;
            } else if (centerVerticalArray.includes(pos)) {
                coords.left = baseLeft + againstData.width / 2;
            } else if (rightArray.includes(pos)) {
                coords.left = baseLeft + againstData.width;
            } else {
                coords.left = baseLeft;
            }

            if (topArray.includes(pos)) {
                coords.top = baseTop;
            } else if (centerHorizontalArray.includes(pos)) {
                coords.top = baseTop + againstData.height / 2;
            } else if (bottomArray.includes(pos)) {
                coords.top = baseTop + againstData.height;
            } else {
                coords.top = baseTop;
            }

            return coords;
        }

        // returns some data of argument elt
        function getElementData(elt) {
            // elt: string selector or element reference
            let elData;

            if (elt.jquery) {
                elData = elt[0].getBoundingClientRect();
            } else if (typeof elt === 'string') {
                elData = document.querySelector(elt).getBoundingClientRect();
            } else {
                elData = elt.getBoundingClientRect();
            }

            return {
                width:  Math.round(elData.width),                       // width of elt (includes border)
                height: Math.round(elData.height),                     // height of elt (includes border)
                left:   Math.round(elData.left + window.pageXOffset),    // left value of elt option.of RELATIVE TO DOCUMENT
                top:    Math.round(elData.top + window.pageYOffset)       // top value of elt option.of RELATIVE TO DOCUMENT
            };
        }

        if (typeof options === 'string') {

            // convert options string to object accepted by jsPanel.position()
            //noinspection JSLint
            const rxpos = /\b[a-z]{4,6}-{1}[a-z]{3,6}\b/,
                rxautopos = /DOWN|UP|RIGHT|LEFT/,
                rxoffset = /[+-]?\d+\.?\d*%?/g,
                posValue = options.match(rxpos),
                autoposValue = options.match(rxautopos),
                offsetValue = options.match(rxoffset);
            let position;

            if ($.isArray(posValue)) {
                position = {my: posValue[0], at: posValue[0]};
            } else {
                position = {my: 'center', at: 'center'};
            }

            if ($.isArray(autoposValue)) {
                position.autoposition = autoposValue[0];
            }

            if ($.isArray(offsetValue)) {
                position.offsetX = offsetValue[0];
                if (offsetValue.length === 2) {
                    position.offsetY = offsetValue[1];
                }
            }
            options = position;

        } else {

            // convert options with left, top, right, bottom values
            const posLeft = (options.left === 0 || options.left) ? true : false;
            const posTop = (options.top === 0 || options.top) ? true : false;
            const posRight = (options.right === 0 || options.right) ? true : false;
            const posBottom = (options.bottom === 0 || options.bottom) ? true : false;

            if (posLeft && posTop) {
                options.my = 'left-top';
                options.at = 'left-top';
                options.offsetX = options.left;
                options.offsetY = options.top;
            } else if (posLeft && posBottom) {
                options.my = 'left-bottom';
                options.at = 'left-bottom';
                options.offsetX = options.left;
                options.offsetY = -(options.bottom);
            } else if (posRight && posTop) {
                options.my = 'right-top';
                options.at = 'right-top';
                options.offsetX = -(options.right);
                options.offsetY = options.top;
            } else if (posRight && posBottom) {
                options.my = 'right-bottom';
                options.at = 'right-bottom';
                options.offsetX = -(options.right);
                options.offsetY = -(options.bottom);
            }

        }

        // merge option defaults with passed options
        option = Object.assign(optionDefaults, options);

        if (typeof elmt === 'string') {
            elmtToPosition = document.querySelector(elmt);
        } else if (elmt.jquery) {
            elmtToPosition = elmt[0];
        } else {
            elmtToPosition = elmt;
        }

        parentElmt = elmtToPosition.parentElement || document.body;

        // set option.of defaults
        if (!option.of) {
            parentElmt === document.body ? option.of = 'window' : option.of = parentElmt;
        }

        elmtData = getElementData(elmtToPosition);

        // convert strings/%-values of option.offset to useful numbers
        if (typeof option.offsetX === 'string' && option.offsetX.slice(-1) === '%') {

            if (option.of === 'window') {
                option.offsetX = window.innerWidth * (parseInt(option.offsetX, 10) / 100);
            } else {
                option.offsetX = parentElmt.clientWidth * (parseInt(option.offsetX, 10) / 100);
            }

        } else if (typeof option.offsetX === 'string') {

            option.offsetX = parseFloat(option.offsetX);

        } else if ($.isFunction(option.offsetX)) {

            option.offsetX = parseInt(option.offsetX.call(elmt, elmt), 10);

        }

        if (typeof option.offsetY === 'string' && option.offsetY.slice(-1) === '%') {

            if (option.of === 'window') {
                option.offsetY = window.innerHeight * (parseInt(option.offsetY, 10) / 100);
            } else {
                option.offsetY = parentElmt.clientHeight * (parseInt(option.offsetY, 10) / 100);
            }

        } else if (typeof option.offsetY === 'string') {

            option.offsetY = parseFloat(option.offsetY);

        } else if ($.isFunction(option.offsetY)) {

            option.offsetY = parseInt(option.offsetY.call(elmt, elmt), 10);

        }

        // calculate horizontal correction of element to position
        const borderLeftCorrection = parseInt(window.getComputedStyle(parentElmt)['border-left-width'], 10) || 0;
        // window.getComputedStyle doesn't work as expected in FF < 47, therefore the logical || 0

        if (leftArray.includes(option.my)) {

            leftOffset = borderLeftCorrection;

        } else if (centerVerticalArray.includes(option.my)) {

            leftOffset = elmtData.width / 2 + borderLeftCorrection;

        } else if (rightArray.includes(option.my)) {

            leftOffset = elmtData.width + borderLeftCorrection;

        }

        // calculate vertical correction of element to position
        const borderTopCorrection = parseInt(window.getComputedStyle(parentElmt)['border-top-width'], 10) || 0;

        if (topArray.includes(option.my)) {

            topOffset = borderTopCorrection;

        } else if (centerHorizontalArray.includes(option.my)) {

            topOffset = elmtData.height / 2 + borderTopCorrection;

        } else if (bottomArray.includes(option.my)) {

            topOffset = elmtData.height + borderTopCorrection;

        }

        // calculate final position values of elmt ...
        if (elmtToPosition.parentElement === document.body) {

            // ... appended to body element ...
            if (option.of === 'window') {

                // ... against window
                const windowCoords = getWindowCoords(option.at);

                if (option.fixed) {

                    newCoordsLeft = windowCoords.left - leftOffset + option.offsetX - window.pageXOffset;
                    newCoordsTop = windowCoords.top - topOffset + option.offsetY - window.pageYOffset;

                } else {

                    newCoordsLeft = windowCoords.left - leftOffset + option.offsetX;
                    newCoordsTop = windowCoords.top - topOffset + option.offsetY;

                }

            } else {
                // ... against other element than window
                const elmtAgainstCoords = getElmtAgainstCoords(option.at);

                // calculate position values for element to position relative to element other than window
                newCoordsLeft = elmtAgainstCoords.left - leftOffset + option.offsetX;
                newCoordsTop = elmtAgainstCoords.top - topOffset + option.offsetY;

            }

        } else {

            let targetCoords, optionOf;

            if (typeof option.of === 'string') {
                optionOf = document.querySelector(option.of);
            } else if (option.of.jquery) {
                optionOf = option.of[0];
            } else {
                optionOf = option.of;
            }

            if (parentElmt === optionOf) {

                // ... appended to other element than body AND positioning against parent!
                targetCoords = getParentCoords(option.at);

                // calculate position values for element with parent other than body
                newCoordsLeft = targetCoords.left - leftOffset + option.offsetX;
                newCoordsTop = targetCoords.top - topOffset + option.offsetY;

            } else {

                // ... appended to other element than body AND positioning against other element than parent!
                targetCoords = getElementCoords(option.at);

                // calculate position values for element
                newCoordsLeft = targetCoords.left - leftOffset + option.offsetX;
                newCoordsTop = targetCoords.top - topOffset + option.offsetY;

            }

        }

        // optionally autoposition elmts
        if (option.autoposition) {

            let newClass, allNewClass = [];

            // add a class to recognize panels for autoposition
            if (option.my === option.at) {
                newClass = option.my;
            }

            elmtToPosition.classList.add(newClass); // IE9 doesn't support classList

            // get all elmts with 'newClass' within parent of elmtToPosition
            const list = document.getElementsByClassName(newClass);

            for (let i = 0; i < list.length; i++) {

                if (list[i].parentElement === parentElmt) {

                    allNewClass.push(list[i]);

                }

            }

            if (option.autoposition === 'DOWN') {

                // collect heights of all elmts to calc new top position
                for (let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsTop += allNewClass[i].getBoundingClientRect().height + this.autopositionSpacing;

                }

            } else if (option.autoposition === 'UP') {

                for (let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsTop -= allNewClass[i].getBoundingClientRect().height + this.autopositionSpacing;

                }

            } else if (option.autoposition === 'RIGHT') {

                // collect widths of all elmts to calc new left position
                for (let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsLeft += allNewClass[i].getBoundingClientRect().width + this.autopositionSpacing;

                }

            } else if (option.autoposition === 'LEFT') {

                for (let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsLeft -= allNewClass[i].getBoundingClientRect().width + this.autopositionSpacing;

                }

            }

        }

        newCoords = {left: newCoordsLeft, top: newCoordsTop};

        if (typeof option.modify === 'function') {

            newCoords = option.modify.call(newCoords, newCoords);
            // inside the function 'this' refers to the object 'newCoords'
            // option.modify is optional. If present has to be a function returning an object with the keys 'left' and 'top'

        }

        // finally position elmt ...
        elmtToPosition.style.position = 'absolute';
        elmtToPosition.style.left = `${newCoords.left}px`; // seems not to work with integers
        elmtToPosition.style.top = `${newCoords.top}px`;

        elmtToPosition.style.opacity = 1;

        // ... and fix position if ...
        if (option.of === 'window' && option.fixed && parentElmt === document.body) {

            elmtToPosition.style.position = 'fixed';

        }

        return elmtToPosition;
    },

    remMinReplacement(panel) {
        $(`[id^="${panel.prop('id')}-min"]`).remove();
        // see http://stackoverflow.com/questions/22755867/javascript-call-remove-twice-to-remove-element
    },

    removeModalBackdrop(panel) {
        $(`#jsPanel-modal-backdrop-${panel.attr('id')}`).animate({
            opacity: 0
        }, {
            duration: 500,
            done:     function () {
                $(this).remove();
            }
        });
    },

    reposition(panel, position = panel.option.position, callback) {
        // reposition of tooltips is experimental (position.of has to be set when repositioning tooltips)
        if (panel.data('status') !== 'minimized') {

            // reset option.position
            panel.option.position = position;

            // if panel to reposition is tooltip
            if (panel.option.paneltype.tooltip) {

                // remove tooltip classes
                const classes = panel.attr('class').split(' ');
                $.each(classes, function (i, c) {
                    if (c.indexOf('jsPanel-tooltip-') === 0) {
                        panel.removeClass(c);
                    }
                });

                this.setTooltipClass(panel);

                // remove/add tooltip connector
                $('.jsPanel-connector', panel).remove();
                if (panel.option.paneltype.connector) {
                    this.addConnector(panel);
                }

            }

            this.position(panel, position);

        }

        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }
        return panel;
    },

    // reset all z-index values for non-modal jsPanels
    resetZis() {

        let array = [];
        const panels = $('.jsPanel:not(.jsPanel-modal):not(.jsPanel-hint)');

        panels.each(function (index, item) {
            array.push(item);
        });

        array.sort(function (a, b) {

            return $(a).css('z-index') - $(b).css('z-index');

        }).forEach(function (item, index) {

            if ((jsPanel.zi += 1) > $(item).css('z-index')) {

                $(item).css('z-index', jsPanel.ziBase + index);

            }

        });

        this.zi = (this.ziBase - 1) + array.length;

    },

    resize(panel, config) {
        if (panel.data('status') !== 'minimized') {

            // callback to execute before a panel is resized
            if ($.isFunction(panel.option.onbeforeresize)) {
                if (panel.option.onbeforeresize.call(panel, panel) === false) {
                    return panel;
                }
            }

            if ($.isPlainObject(config)) {
                let arg = $.extend({}, false, $.jsPanel.resizedefaults, config),
                    panelW, panelH;

                if (arg.width && arg.width === 'auto') {
                    panel.content.css('width', 'auto');
                    panel.css('width', 'auto');
                    panel.css('width', panel.outerWidth()); // we need explicit pixel value in order to prevent panel being 'glued' to window border
                } else if (arg.width) {
                    panel.css('width', arg.width);
                }

                if (arg.height && arg.height === 'auto') {
                    panel.content.css('height', 'auto');
                    panel.css('height', 'auto');
                } else if (arg.height) {
                    panel.css('height', arg.height);
                }

                // checks for min and max values
                panelW = panel.outerWidth();
                panelH = panel.outerHeight();

                if (arg.minwidth && panelW < arg.minwidth) {
                    panel.css('width', arg.minwidth);
                }
                if (arg.maxwidth && panelW > arg.maxwidth) {
                    panel.css('width', arg.maxwidth);
                }
                if (arg.minheight && panelH < arg.minheight) {
                    panel.css('height', arg.minheight);
                }
                if (arg.maxheight && panelH > arg.maxheight) {
                    panel.css('height', arg.maxheight);
                }

                this.contentResize(panel);

                // callback to execute after a panel was resized
                if ($.isFunction(panel.option.onresized)) {
                    if (panel.option.onresized.call(panel, panel) === false) {
                        return panel;
                    }
                }
                // call individual callback
                if (arg.callback && $.isFunction(arg.callback)) {
                    arg.callback.call(panel, panel);
                }
            }

        }
        return panel;
    },

    // https://gist.github.com/mjackson/5311256
    rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b),
            h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
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
        //return [ h, s, l ];
        h = h * 360;
        s = s * 100 + '%';
        l = l * 100 + '%';
        return {css: 'hsl(' + h + ',' + s + ',' + l + ')', h: h, s: s, l: l};
    },

    rgbToHex(r, g, b) {

        let red = Number(r).toString(16),
            green = Number(g).toString(16),
            blue = Number(b).toString(16);

        if (red.length === 1) {
            red = `0${red}`;
        }
        if (green.length === 1) {
            green = `0${green}`;
        }
        if (blue.length === 1) {
            blue = `0${blue}`;
        }

        return `#${red}${green}${blue}`;

    },

    // enables/disables individual controls
    setControlStatus(panel, ctrl, action = 'enable') {
        const controls = panel.header.headerbar,
            p = panel[0];
        if (action === 'disable') {
            if (p.getAttribute(`data-btn${ctrl}`) !== 'removed') {
                p.setAttribute(`data-btn${ctrl}`, 'disabled');
                $(`.jsPanel-btn-${ctrl}`, controls).css({pointerEvents: 'none', opacity: 0.4, cursor: 'default'});
            }
        } else if (action === 'enable') {
            if (p.getAttribute(`data-btn${ctrl}`) !== 'removed') {
                p.setAttribute(`data-btn${ctrl}`, 'enabled');
                $(`.jsPanel-btn-${ctrl}`, controls).css({pointerEvents: 'auto', opacity: 1, cursor: 'pointer'});
            }
        } else if (action === 'remove') {
            $(`.jsPanel-btn-${ctrl}`, controls).remove();
            p.setAttribute(`data-btn${ctrl}`, 'removed');
        }
    },

    // add class depending on position
    setTooltipClass(panel) {

        const pos = panel.option.position.my + panel.option.position.at;

        if (pos === 'center-bottomcenter-top') {

            panel.addClass('jsPanel-tooltip-top');

        } else if (pos === 'left-bottomright-top') {

            panel.addClass('jsPanel-tooltip-righttopcorner');

        } else if (pos === 'left-centerright-center') {

            panel.addClass('jsPanel-tooltip-right');

        } else if (pos === 'left-topright-bottom') {

            panel.addClass('jsPanel-tooltip-rightbottomcorner');

        } else if (pos === 'center-topcenter-bottom') {

            panel.addClass('jsPanel-tooltip-bottom');

        } else if (pos === 'right-topleft-bottom') {

            panel.addClass('jsPanel-tooltip-leftbottomcorner');

        } else if (pos === 'right-centerleft-center') {

            panel.addClass('jsPanel-tooltip-left');

        } else if (pos === 'right-bottomleft-top') {

            panel.addClass('jsPanel-tooltip-lefttopcorner');

        } else if (pos === 'centercenter') {

            panel.addClass('jsPanel-tooltip-center');

        } else if (pos === 'right-topleft-top') {

            panel.addClass('jsPanel-tooltip-lefttop');

        } else if (pos === 'right-bottomleft-bottom') {

            panel.addClass('jsPanel-tooltip-leftbottom');

        } else if (pos === 'left-bottomleft-top') {

            panel.addClass('jsPanel-tooltip-topleft');

        } else if (pos === 'right-bottomright-top') {

            panel.addClass('jsPanel-tooltip-topright');

        } else if (pos === 'left-topright-top') {

            panel.addClass('jsPanel-tooltip-righttop');

        } else if (pos === 'left-bottomright-bottom') {

            panel.addClass('jsPanel-tooltip-rightbottom');

        } else if (pos === 'left-topleft-bottom') {

            panel.addClass('jsPanel-tooltip-bottomleft');

        } else if (pos === 'right-topright-bottom') {

            panel.addClass('jsPanel-tooltip-bottomright');

        }

    },

    setTooltipMode(panel, trigger) {

        if (panel.option.paneltype.mode === 'semisticky') {

            panel.hover(
                () => $.noop(),

                () => {
                    panel.close();
                    $(trigger).removeClass('hasTooltip');
                }
            );

        } else if (panel.option.paneltype.mode === 'sticky') {

            // tooltip remains in the DOM until closed manually
            $.noop();

        } else {

            // tooltip will be removed whenever mouse leaves trigger
            $(trigger).mouseout(() => {
                panel.close();
                $(trigger).removeClass('hasTooltip');
            });

        }

    },

    // returns elmt reference to elmt triggering the tooltip
    setTrigger(pos) {
        const opof = pos.of || 'window';
        // option.position.of used as trigger of the tooltip
        if (typeof opof === 'string') {
            return document.querySelector(opof);
        } else if (opof.jquery) {
            return opof[0];
        } else {
            return opof;
        }
    },

    // returns a z-index value for a panel in order to have it on top
    setZi(panel) {
        if (!panel.hasClass('jsPanel-modal')) {

            if ((this.zi += 1) > panel.css('z-index')) {
                panel.css('z-index', this.zi);
            }

        }
    },

    smallify(panel, callback) {
        const id = panel.attr('id');

        if (panel.data('status') === 'normalized' || panel.data('status') === 'maximized') {

            if (panel.data('status') !== 'smallified' && panel.data('status') !== 'smallifiedMax') {

                $(document).trigger('jspanelbeforesmallify', id);
                if ($.isFunction(panel.option.onbeforesmallify)) {
                    if (panel.option.onbeforesmallify.call(panel, panel) === false) {
                        return panel;
                    }
                }

                // store panel height in function property
                panel.smallify.height = panel.outerHeight();
                panel.css('overflow', 'hidden');

                panel.animate({
                    height: panel.header.headerbar.outerHeight() + 'px'
                }, {
                    done: function () {

                        if (panel.data('status') === 'maximized') {
                            panel.hideControls('.jsPanel-btn-maximize, .jsPanel-btn-smallify');
                            panel.data('status', 'smallifiedMax');
                            $(document).trigger('jspanelsmallifiedmax', id);
                        } else {
                            panel.hideControls('.jsPanel-btn-normalize, .jsPanel-btn-smallify');
                            panel.data('status', 'smallified');
                            $(document).trigger('jspanelsmallified', id);
                        }

                        if ($.isFunction(panel.option.onsmallified)) {
                            panel.option.onsmallified.call(panel, panel);
                        }
                        $(document).trigger('jspanelstatuschange', id);

                    }
                });

            }

        } else if (panel.data('status') !== 'minimized') {

            $(document).trigger('jspanelbeforeunsmallify', id);
            if ($.isFunction(panel.option.onbeforeunsmallify)) {
                if (panel.option.onbeforeunsmallify.call(panel, panel) === false) {
                    return panel;
                }
            }

            panel.css('overflow', 'visible');
            panel.animate({
                height: panel.smallify.height
            }, {
                done: function () {
                    if (panel.data('status') === 'smallified') {
                        panel.hideControls('.jsPanel-btn-normalize, .jsPanel-btn-smallifyrev');
                        panel.data('status', 'normalized');
                        $(document).trigger('jspanelnormalized', id);
                    } else {
                        panel.hideControls('.jsPanel-btn-maximize, .jsPanel-btn-smallifyrev');
                        panel.data('status', 'maximized');
                        $(document).trigger('jspanelmaximized', id);
                    }
                    panel.contentResize();
                    $(document).trigger('jspanelunsmallified', id);
                    $(document).trigger('jspanelstatuschange', id);
                    if ($.isFunction(panel.option.onunsmallified)) {
                        panel.option.onunsmallified.call(panel, panel);
                    }
                }
            });

        }

        panel.css('z-index', this.setZi(panel));

        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },

    toolbarAdd(panel, place, items, callback) {
        if (place === 'header') {

            panel.header.toolbar.addClass('active');
            if ($.isArray(items)) {
                this.configToolbar(items, panel.header.toolbar, panel);
            } else if ($.isFunction(items)) {
                panel.header.toolbar.append(items(panel.header));
            } else {
                panel.header.toolbar.append(items);
            }

        } else if (place === 'footer') {

            panel.content.removeClass('jsPanel-content-nofooter');
            panel.footer.addClass('active');
            if (panel.option.theme === 'none') {
                panel.footer.css({background: 'transparent', borderTop: 'none'});
            }
            if ($.isArray(items)) {
                this.configToolbar(items, panel.footer, panel);
            } else if ($.isFunction(items)) {
                panel.footer.append(items(panel.footer));
            } else {
                panel.footer.append(items);
            }

        }

        this.contentResize(panel);
        // call individual callback
        if (callback && $.isFunction(callback)) {
            callback.call(panel, panel);
        }
        return panel;
    }

};


(function ($) {

    $.jsPanel = function (config) {

        var pid,
            panelconfig = config || {},
            optConfig = panelconfig.config || {},
            passedconfig = $.extend(true, {}, optConfig, panelconfig),
            jsP = $(panelconfig.template || jsPanel.template),
            trigger; // elmt triggering the tooltip

        // if passedconfig.position is a function: execute function and reset passedconfig.position with the return value
        // this enables the use of a function to calculate the config passed to the positioning function
        if (passedconfig.position && $.isFunction(passedconfig.position)) {
            passedconfig.position = passedconfig.position();
        }

        // enable paneltype: 'tooltip' for default tooltips
        if (passedconfig.paneltype === 'tooltip') {
            passedconfig.paneltype = {tooltip: true};
        }

        // Extend our default config with those provided. Note that the first arg to extend is an empty object - this is to keep from overriding our "defaults" object.
        if (!passedconfig.paneltype) {

            // if option.paneltype is not set in passed config simply merge passed config with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, passedconfig);

        } else if (passedconfig.paneltype === 'modal') {

            // if panel to create is a modal first merge passed config with modal defaults and then with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, $.jsPanel.modaldefaults, passedconfig);

        } else if (passedconfig.paneltype.tooltip) {

            // if panel to create is a tooltip first merge passed config with tooltip defaults and then with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, $.jsPanel.tooltipdefaults, passedconfig);

        } else if (passedconfig.paneltype === 'hint') {

            // if panel to create is a hint first merge passed config with hint defaults and then with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, $.jsPanel.hintdefaults, passedconfig);

        }

        // create a variable for every option used within $.jsPanel()
        let {
            autoclose: o$autoclose, border: o$border, callback: o$callback, container: o$container, content: o$content,
            contentAjax: o$contentAjax, contentIframe: o$contentIframe, contentOverflow: o$contentOverflow,
            contentSize: o$contentSize, custom: o$custom, dblclicks: o$dblclicks, draggable: o$draggable,
            footerToolbar: o$footerToolbar, headerControls: o$headerControls, headerLogo: o$headerLogo,
            headerRemove: o$headerRemove, headerTitle: o$headerTitle, headerToolbar: o$headerToolbar, id: o$id,
            onwindowresize: o$onwindowresize, paneltype: o$paneltype, position: o$position, resizable: o$resizable,
            rtl: o$rtl, setstatus: o$setstatus, show: o$show, theme: o$theme
        } = jsP.option;

        // check whether panel to create is tooltip
        if (o$paneltype.tooltip) {
            // the elmt triggering the tooltip
            trigger = jsPanel.setTrigger(o$position);

            // if panel to create is a tooltip and the trigger already has a tooltip exit jsPanel()
            if ($(trigger).hasClass('hasTooltip')) {
                return false;
            }
        }

        // option.id ---------------------------------------------------------------------------------------------------
        if (typeof o$id === 'string') {
            pid = o$id;
        } else if ($.isFunction(o$id)) {
            pid = o$id();
        }

        // check whether id already exists in document
        if ($(`#${pid}`).length > 0) {
            console.warn('jsPanel Error: No jsPanel created - id attribute passed with option.id already exists in document');
            return false;
        } else {
            jsP.attr('id', pid);
        }

        jsP.data('custom', o$custom);

        // panel properties
        jsP.header = $('.jsPanel-hdr', jsP);
        jsP.header.headerbar = $('.jsPanel-headerbar', jsP.header);
        jsP.header.logo = $('.jsPanel-headerlogo', jsP.header.headerbar);
        jsP.header.title = $('.jsPanel-title', jsP.header.headerbar);
        jsP.header.controls = $('.jsPanel-controlbar', jsP.header.headerbar);
        jsP.header.toolbar = $('.jsPanel-hdr-toolbar', jsP.header);
        jsP.content = $('.jsPanel-content', jsP);
        jsP.footer = $('.jsPanel-ftr', jsP);
        jsP.data('status', 'initialized');
        jsP.cachedData = {};

        /* panel methods -------------------------------------------------------------------------------------------- */
        //jsP.close = (callback) => jsPanel.close(jsP, callback);
        jsP.close = (...params) => jsPanel.close(jsP, ...params);

        jsP.closeChildpanels = () => jsPanel.closeChildpanels(jsP);

        jsP.contentReload = (callback) => jsPanel.contentReload(jsP, callback);

        jsP.contentResize = (callback) => jsPanel.contentResize(jsP, callback);

        jsP.front = (callback) => jsPanel.front(jsP, callback);

        jsP.headerControl = (ctrl, action) => jsPanel.headerControl(jsP, ctrl, action);

        jsP.headerTitle = (text) => jsPanel.headerTitle(jsP, text);

        jsP.hideControls = (sel) => {
            const controls = jsP.header.controls;
            $('div', controls).css('display', 'block');
            $(sel, controls).css('display', 'none');
        };
        /* used only internally */

        jsP.maximize = (callback) => jsPanel.maximize(jsP, callback);

        jsP.minimize = (callback) => jsPanel.minimize(jsP, callback);

        jsP.normalize = (callback) => jsPanel.normalize(jsP, callback);

        jsP.reposition = (o$position, callback) => jsPanel.reposition(jsP, o$position, callback);

        jsP.resize = function (width = $.jsPanel.resizedefaults.width, height = $.jsPanel.resizedefaults.height, callback = $.jsPanel.resizedefaults.callback) {

            let passedconfig = {},
                config = width;

            if (!$.isPlainObject(config)) {
                passedconfig.width = width;
                passedconfig.height = height;
                passedconfig.callback = callback;
                config = $.extend({}, false, $.jsPanel.resizedefaults, passedconfig);
            }

            jsPanel.resize(jsP, config);

            return jsP;
        };

        jsP.setTheme = (passedtheme = o$theme.toLowerCase().replace(/ /g, ''), callback) => {
            // remove all whitespace from passedtheme
            passedtheme = passedtheme.toLowerCase().replace(/ /g, '');

            // first remove all theme related syles
            jsPanel.clearTheme(jsP);

            if (o$theme === 'none') {
                // results in an all white panel without any theme related classes/styles applied
                // removal of footer background/border is done in jsP.toolbarAdd()
                jsP.css('background-color', 'white');
                return jsP;
            }

            const themeDetails = jsPanel.getThemeDetails(passedtheme);

            if (!themeDetails.bs) {

                if (jsPanel.themes.includes(themeDetails.color)) {

                    // apply built in theme
                    jsPanel.applyBuiltInTheme(jsP, themeDetails);

                } else {

                    // apply arbitrary color theme
                    jsPanel.applyArbitraryTheme(jsP, themeDetails);

                }

            } else {

                // apply bootstrap theme
                jsPanel.applyBootstrapTheme(jsP, themeDetails);

            }

            if (o$border) {

                jsPanel.applyThemeBorder(jsP, themeDetails);

            } else {

                jsP.css({borderWidth: '', borderStyle: '', borderColor: ''});

            }

            if (callback && $.isFunction(callback)) {
                callback.call(jsP, jsP);
            }

            return jsP;

        };

        jsP.smallify = (callback) => jsPanel.smallify(jsP, callback);

        jsP.toolbarAdd = (place, items, callback) => jsPanel.toolbarAdd(jsP, place, items, callback);

        jsP.updateCachedData = () => {
            jsP.cachedData.top = jsP.css('top');
            jsP.cachedData.left = jsP.css('left');
            jsP.cachedData.width = jsP.css('width');
            jsP.cachedData.height = jsP.css('height');
        };
        /* used only internally */

        // jsPanel close
        $('.jsPanel-btn-close', jsP).on('click', e => {
            e.preventDefault();
            jsPanel.close(jsP);
        });

        // jsPanel minimize
        $('.jsPanel-btn-minimize', jsP).on('click', e => {
            e.preventDefault();
            jsPanel.minimize(jsP);
        });

        // jsPanel maximize
        $('.jsPanel-btn-maximize', jsP).on('click', e => {
            e.preventDefault();
            jsPanel.maximize(jsP);
        });

        // jsPanel normalize
        $('.jsPanel-btn-normalize', jsP).on('click', e => {
            e.preventDefault();
            jsPanel.normalize(jsP);
        });

        // jsPanel smallify
        $('.jsPanel-btn-smallify, .jsPanel-btn-smallifyrev', jsP).on('click', e => {
            e.preventDefault();
            jsPanel.smallify(jsP);
        });


        /* option.container ----------------------------------------------------------------------------------------- */
        jsP.appendTo($(o$container)[0]); // append panel only to the first element of option.container !! important !!
        jsPanel.activePanels.list.push(pid);
        $(document).trigger('jspanelloaded', pid);
        jsP.data('container', o$container);

        /* option.theme now includes bootstrap ---------------------------------------------------------------------- */
        jsP.setTheme();

        /* option.headerRemove,
         option.headerControls (controls in header right) ----------------------------------------------------------- */
        if (!o$headerRemove) {

            if (o$headerControls.controls === 'closeonly') {

                ['maximize', 'minimize', 'normalize', 'smallify'].forEach(ctrl => {
                    jsPanel.setControlStatus(jsP, ctrl, 'remove');
                });

            } else if (o$headerControls.controls === 'none') {

                ['close', 'maximize', 'minimize', 'normalize', 'smallify', 'smallifyrev'].forEach(ctrl => {
                    jsPanel.setControlStatus(jsP, ctrl, 'remove');
                });

            } else {

                // disable controls individually
                ['close', 'maximize', 'minimize', 'normalize', 'smallify'].forEach(ctrl => {

                    if (o$headerControls[ctrl] === 'disable') {

                        // disable individual control btn and store btn status in data attr
                        jsPanel.setControlStatus(jsP, ctrl, 'disable');

                    } else if (o$headerControls[ctrl] === 'remove') {

                        jsPanel.setControlStatus(jsP, ctrl, 'remove');

                    } else {

                        jsP[0].setAttribute(`data-btn${ctrl}`, 'enabled');

                    }

                });

            }

            /* option.headerLogo ------------------------------------------------------------------------------------ */
            if (o$headerLogo) {
                let logo = o$headerLogo;

                if (typeof logo === 'string' && logo.substring(0, 1) !== '<') {

                    jsP.header.logo.append(`<img src="${logo}" height="38" alt="logo">`);

                } else {

                    jsP.header.logo.append(logo);

                }

            }

        } else {

            jsP.header.remove();
            jsP.content.addClass('jsPanel-content-noheader');
            ['close', 'maximize', 'minimize', 'normalize', 'smallify', 'smallifyrev'].forEach(ctrl => {
                jsP[0].setAttribute(`data-btn${ctrl}`, 'removed');
            });

        }
        /* corrections for a removed header */
        if (o$headerRemove || $('.jsPanel-hdr').length < 1) {
            jsP.content.css('border', 'none');
        }

        /* insert iconfonts if option.headerControls.iconfont set (default is "jsglyph") ---------------------------- */
        jsPanel.configIconfont(jsP);

        /* option.paneltype ----------------------------------------------------------------------------------------- */
        if (o$paneltype === 'modal') {

            jsPanel.insertModalBackdrop(jsP);
            jsP.addClass('jsPanel-modal').css('z-index', jsPanel.modalcount + 9999);

        } else if (o$paneltype === 'hint') {

            jsP.addClass('jsPanel-hint').css('z-index', 10000);

        } else if (o$paneltype.tooltip) {

            trigger = jsPanel.setTrigger(o$position); // elmt triggering the tooltip
            jsP.addClass('jsPanel-tooltip');
            jsPanel.setTooltipClass(jsP);
            if (o$paneltype.solo) {
                jsPanel.closeTooltips();
            }
            jsPanel.setTooltipMode(jsP, trigger);

        }

        if (o$paneltype.tooltip) {
            $(trigger).addClass('hasTooltip');
        }

        /* option.headerToolbar | default: false -------------------------------------------------------------------- */
        if (o$headerToolbar && !o$headerRemove) {
            jsP.toolbarAdd('header', o$headerToolbar);
        }

        /* option.footerToolbar | default: false -------------------------------------------------------------------- */
        if (o$footerToolbar) {
            jsP.toolbarAdd('footer', o$footerToolbar);
        }

        /* option.content ------------------------------------------------------------------------------------------- */
        if (o$content) {
            jsP.content.append(o$content);
            jsP.data('content', o$content);
        }

        /* option.contentAjax --------------------------------------------------------------------------------------- */
        if (o$contentAjax) {
            if (typeof o$contentAjax === 'string') {
                jsP.option.contentAjax = {
                    url:      o$contentAjax,
                    autoload: true
                };
            }
            jsPanel.ajax(jsP);
        }

        /* option.contentIframe ------------------------------------------------------------------------------------- */
        if ($.isPlainObject(o$contentIframe) && (o$contentIframe.src || o$contentIframe.srcdoc)) {
            jsPanel.iframe(jsP);
        }

        /* tooltips continued --------------------------------------------------------------------------------------- */
        /* jquery.css() doesn't work properly if jsPanel isn't in the DOM yet, so the code for the tooltip connectors
         is placed after the jsPanel is appended to the DOM !!! */
        if (o$paneltype.connector) {
            jsPanel.addConnector(jsP);
        }

        /* option.contentSize - needs to be set before option.position and should be after option.content ----------- */
        if (typeof o$contentSize === 'string') {
            const sizes = o$contentSize.trim().split(' '),
                sizesLength = sizes.length;

            o$contentSize = {
                width:  sizes[0],
                height: sizes[sizesLength - 1]
            };
        }

        if (o$contentSize.height === 0) {
            o$contentSize.height = '0';
        }

        jsP.content.css({
            width:  o$contentSize.width || $.jsPanel.defaults.contentSize.width,
            height: o$contentSize.height || $.jsPanel.defaults.contentSize.height
        });

        jsP.css({
            // necessary if title text exceeds content width & correction for panel padding
            // or if content section is removed prior positioning
            //width: jsP.content.outerWidth() + 'px',
            width:  function () {
                if ($('.jsPanel-content', jsP).length > 0) {
                    return jsP.content.outerWidth() + 'px';
                } else {
                    return o$contentSize.width || $.jsPanel.defaults.contentSize.width;
                }
            },
            zIndex: function () {
                jsPanel.setZi(jsP);
            } // set z-index to get new panel to front;
        });

        // after content width is set and jsP width is set accordingly set content width to 100%
        jsP.content.css('width', '100%');

        /* option.position ------------------------------------------------------------------------------------------ */
        jsPanel.position(jsP, o$position);
        jsPanel.calcPositionFactors(jsP);

        jsP.data('status', 'normalized');
        $(document).trigger('jspanelstatuschange', pid);

        // handlers for doubleclicks -----------------------------------------------------------------------------------
        // dblclicks disabled for normal modals, hints and tooltips
        if (!o$paneltype) {
            if (o$dblclicks) {
                if (o$dblclicks.title) {
                    jsP.header.headerbar.on('dblclick', e => {
                        e.preventDefault();
                        jsPanel.dblclickhelper(o$dblclicks.title, jsP);
                    });
                }
                if (o$dblclicks.content) {
                    jsP.content.on('dblclick', e => {
                        e.preventDefault();
                        jsPanel.dblclickhelper(o$dblclicks.content, jsP);
                    });
                }
                if (o$dblclicks.footer) {
                    jsP.footer.on('dblclick', e => {
                        e.preventDefault();
                        jsPanel.dblclickhelper(o$dblclicks.footer, jsP);
                    });
                }
            }
        }

        /* option.contentOverflow  | default: 'hidden' -------------------------------------------------------------- */
        if (typeof o$contentOverflow === 'string') {

            jsP.content.css('overflow', o$contentOverflow);

        } else if ($.isPlainObject(o$contentOverflow)) {

            jsP.content.css({
                'overflow-y': o$contentOverflow.vertical || o$contentOverflow['overflow-y'],
                'overflow-x': o$contentOverflow.horizontal || o$contentOverflow['overflow-x']
            });

        }

        /* option.draggable ----------------------------------------------------------------------------------------- */
        if ($.isPlainObject(o$draggable)) {

            jsP.draggable(o$draggable);

        } else if (o$draggable === 'disabled') {

            // reset cursor, draggable deactivated
            $('.jsPanel-titlebar, .jsPanel-ftr', jsP).css('cursor', 'default');
            // jquery ui draggable initialize disabled to allow to query status
            jsP.draggable({disabled: true});

        } else {

            // draggable is not even initialised
            $('.jsPanel-titlebar, .jsPanel-ftr', jsP).css('cursor', 'default');

        }

        jsP.on('dragstop', () => jsPanel.calcPositionFactors(jsP));

        /* option.resizable ----------------------------------------------------------------------------------------- */
        if ($.isPlainObject(o$resizable)) {

            jsP.resizable(o$resizable);

        } else if (o$resizable === 'disabled') {

            // jquery ui resizable initialize disabled to allow to query status
            jsP.resizable({disabled: true});
            $('.ui-icon-gripsmall-diagonal-se, .ui-resizable-handle.ui-resizable-sw', jsP).css({
                'background-image': 'none',
                'text-indent':      -9999
            });
            $('.ui-resizable-handle', jsP).css({'cursor': 'inherit'});

        }

        jsP.on('resize', () => jsPanel.contentResize(jsP));

        /* option.rtl | default: false - needs to be after option.resizable ----------------------------------------- */
        if (o$rtl.rtl === true) {

            $('.jsPanel-hdr, .jsPanel-headerbar, .jsPanel-titlebar, .jsPanel-controlbar, .jsPanel-hdr-toolbar, .jsPanel-ftr', jsP).addClass('jsPanel-rtl');

            [jsP.header.title, jsP.content, $('*', jsP.header.toolbar), $('*', jsP.footer)].forEach(item => {

                item.prop('dir', 'rtl');
                if (o$rtl.lang) {
                    item.prop('lang', o$rtl.lang);
                }

            });

            $('.ui-icon-gripsmall-diagonal-se', jsP).css({backgroundImage: 'none', textIndent: -9999});

        }

        /* option.show ---------------------------------------------------------------------------------------------- */
        if (typeof o$show === 'string') {
            jsP.addClass(o$show).css('opacity', 1);
        } //extra call to jQuery.css() needed for EDGE

        /* option.headerTitle | needs to be late in the file! ------------------------------------------------------- */
        jsP.header.title.empty().prepend(o$headerTitle);

        /* VARIOUS EVENT HANDLERS ----------------------------------------------------------------------------------- */
        // handler to move panel to foreground
        jsP[0].addEventListener('mousedown', (e) => {

            if ($(e.target).hasClass('jsglyph-close') || $(e.target).hasClass('jsglyph-minimize')) {
                return;
            }

            const zi = $(e.target).closest('.jsPanel').css('z-index');

            if (!jsP.hasClass('jsPanel-modal') && zi <= jsPanel.zi) {
                jsP.front();
            }

        }, false);

        jsP.updateCachedData();

        /* option.setstatus ----------------------------------------------------------------------------------------- */
        if (typeof o$setstatus === 'string') {

            (o$setstatus === 'maximize smallify') ? jsP.maximize().smallify() : jsP[o$setstatus]();

        }

        /* option.autoclose | default: false ------------------------------------------------------------------------ */
        if (typeof o$autoclose === 'number' && o$autoclose > 0) {

            window.setTimeout(() => {

                if (jsP) {
                    jsP.close();
                }

            }, o$autoclose);

        }

        // handlers to normalize a panel and reset controls only when resizing a smallified panel with mouse ...
        jsP.on('resizestop', function (event, ui) {
            if ((jsP.data('status') === 'smallified' || jsP.data('status') === 'smallifiedMax') && (jsP.outerHeight() > ui.originalSize.height)) {
                // ... and only when panel height changed
                jsP.hideControls('.jsPanel-btn-normalize, .jsPanel-btn-smallifyrev');
                jsP.data('status', 'normalized');
                $(document).trigger('jspanelnormalized', pid);
                $(document).trigger('jspanelstatuschange', pid);
            }
            jsPanel.calcPositionFactors(jsP);
        });

        /* option.onwindowresize ------------------------------------------------------------------------------------ */
        if (o$onwindowresize) {
            $(window).resize(function (event) {
                if (event.target === window) {       // see https://bugs.jqueryui.com/ticket/7514
                    let param = o$onwindowresize,
                        status = jsP.data('status');
                    if (status === 'maximized' && !$.isFunction(param)) {
                        jsP.maximize(false, false);
                    } else if (status === 'normalized' || status === 'smallified' || status === 'maximized') {
                        if ($.isFunction(param)) {
                            param.call(jsP, event, jsP);
                        } else {
                            jsP.reposition({
                                left: function () {
                                    let l;
                                    if (this.option.container === 'body') {
                                        l = ($(window).outerWidth() - this.outerWidth()) * this.hf;
                                    } else {
                                        l = (this.parent().outerWidth() - this.outerWidth()) * this.hf;
                                    }
                                    return l <= 0 ? 0 : l;
                                },
                                top:  function () {
                                    let t;
                                    if (this.option.container === 'body') {
                                        t = ($(window).outerHeight() - this.outerHeight()) * this.vf;
                                    } else {
                                        t = (this.parent().outerHeight() - this.outerHeight()) * this.vf;
                                    }
                                    return t <= 0 ? 0 : t;
                                }
                            });
                        }
                    }
                }
            });
        }

        /* adding a few methods/props directly to the HTMLElement --------------------------------------------------- */
        jsP[0].jspanel = {
            options: jsP.option,
            close(...params) {
                const cb = params[0] || false,
                    skipOnBefore = params[1] || false,
                    skipOnclose = params[2] || false;
                jsPanel.close(jsP, cb, skipOnBefore, skipOnclose);
            },
            normalize(callback) {
                return jsPanel.normalize(jsP, callback);
            },
            maximize(callback) {
                return jsPanel.maximize(jsP, callback);
            },
            minimize(callback) {
                return jsPanel.minimize(jsP, callback);
            },
            smallify(callback) {
                return jsPanel.smallify(jsP, callback);
            },
            front(callback) {
                return jsPanel.front(jsP, callback);
            },
            closeChildpanels() {
                return jsPanel.closeChildpanels(jsP);
            },
            reposition(pos, callback) {
                return jsPanel.reposition(jsP, pos, callback);
            },
            resize(w, h, callback) {
                return jsP.resize(w, h, callback);
            },
            contentResize(callback) {
                return jsPanel.contentResize(jsP, callback);
            },
            contentReload(callback) {
                return jsPanel.contentReload(jsP, callback);
            },
            headerTitle(text) {
                return jsPanel.headerTitle(jsP, text);
            },
            headerControl(ctrl, action) {
                return jsPanel.headerControl(jsP, ctrl, action);
            },
            toolbarAdd(place, tb, callback) {
                return jsPanel.toolbarAdd(jsP, place, tb, callback);
            },
            setTheme(theme, callback) {
                return jsP.setTheme(theme, callback);
            },
            noop() {
                return jsP; // used in jsPanel.activePanels.getPanel()
            }
        };
        // sample:          document.getElementById('jsPanel-1').jspanel.close();
        // or:              document.querySelector('#jsPanel-1').jspanel.close();
        // or using jquery: $('#jsPanel-1')[0].jspanel.close();

        /* option.callback ------------------------------------------------------------------------------------------ */
        if (o$callback && $.isFunction(o$callback)) {

            o$callback.call(jsP, jsP);

        } else if ($.isArray(o$callback)) {

            o$callback.forEach(item => {

                if ($.isFunction(item)) {
                    item.call(jsP, jsP);
                }

            });

        }

        return jsP;

    };

    $.jsPanel.defaults = {
        autoclose:          false,
        border:             false,
        callback:           false,
        container:          'body',
        content:            false,
        contentAjax:        false,
        contentIframe:      false,
        contentOverflow:    'hidden',
        contentSize:        {
            width:  400, /* do not replace with "400 200" */
            height: 200
        },
        custom:             false,
        dblclicks:          false,
        delayClose:         0,
        draggable:          {
            handle:  'div.jsPanel-titlebar, div.jsPanel-ftr',
            opacity: 0.8
        },
        footerToolbar:      false,
        headerControls:     {
            close:     false,
            maximize:  false,
            minimize:  false,
            normalize: false,
            smallify:  false,
            controls:  'all',
            iconfont:  'jsglyph'
        },
        headerLogo:         false,
        headerRemove:       false,
        headerTitle:        'jsPanel',
        headerToolbar:      false,
        id:                 () => `jsPanel-${jsPanel.id += 1}`,
        maximizedMargin:    {
            top:    5,
            right:  5,
            bottom: 5,
            left:   5
        },
        minimizeTo:         true,
        onbeforeclose:      false,
        onbeforemaximize:   false,
        onbeforeminimize:   false,
        onbeforenormalize:  false,
        onbeforesmallify:   false,
        onbeforeunsmallify: false,
        onclosed:           false,
        onmaximized:        false,
        onminimized:        false,
        onnormalized:       false,
        onbeforeresize:     false,
        onresized:          false,
        onsmallified:       false,
        onunsmallified:     false,
        onfronted:          false,
        onwindowresize:     false,
        paneltype:          false,
        position:           'center', // all other defaults are set in jsPanel.position()
        resizable:          {
            handles:   'n, e, s, w, ne, se, sw, nw',
            autoHide:  false,
            minWidth:  40,
            minHeight: 40
        },
        rtl:                false,
        setstatus:          false,
        show:               false,
        template:           false,
        theme:              'default'
    };

    $.jsPanel.modaldefaults = {
        draggable:      'disabled',
        headerControls: {controls: 'closeonly'},
        position:       'center',
        resizable:      'disabled',
        onwindowresize: true,
    };

    $.jsPanel.tooltipdefaults = {
        draggable:      false,
        headerControls: {controls: 'closeonly'},
        position:       {fixed: false},
        resizable:      false
    };

    $.jsPanel.hintdefaults = {
        autoclose:      8000,
        draggable:      false,
        headerControls: {controls: 'closeonly'},
        resizable:      false
    };

    $.jsPanel.resizedefaults = {
        width:     null,
        height:    null,
        minwidth:  false,
        maxwidth:  false,
        minheight: false,
        maxheight: false,
        callback:  false
    };

    /* body click handler: remove all tooltips on click in body except click is inside jsPanel or trigger of tooltip */
    $(document).ready(function () {

        document.body.addEventListener('click', e => {
            const isTT = $(e.target).closest('.jsPanel').length;
            if (isTT < 1 && !$(e.target).hasClass('hasTooltip')) {
                jsPanel.closeTooltips();
                $('.hasTooltip').removeClass('hasTooltip');
            }
        }, false);

        $('body').css('-ms-overflow-style', 'scrollbar').append('<div id="jsPanel-replacement-container">');

        window.addEventListener('keydown', e => {
            const key = e.key || e.code;
            if (key === 'Escape' || key === 'Esc') {
                if (jsPanel.closeOnEscape) {
                    jsPanel.activePanels.getPanel(jsPanel.getTopmostPanel()).close();
                }
            }
        }, false);

    });

}(jQuery));
