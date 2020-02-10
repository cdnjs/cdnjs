/* global jsPanel */
'use strict'; // Object.assign Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign - ONLY FOR IE11

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(target) {
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

var jsPanel = {
    version: '3.11.3',
    date: '2019-11-25 21:49',
    id: 0,
    // counter to add to automatically generated id attribute
    ziBase: 100,
    // the lowest z-index a jsPanel may have
    zi: 100,
    // z-index counter, has initially to be the same as ziBase
    modalcount: 0,
    // counter to set modal background and modal jsPanel z-index
    autopositionSpacing: 5,
    // sets spacing between autopositioned jsPanels
    pbTreshold: 0.556,
    // perceived brightness threshold to switch between white or black font color
    lastbeforeclose: false,
    // used in the handlers to reposition autopositioned panels
    template: "<div class=\"jsPanel\">\n                <div class=\"jsPanel-hdr\">\n                    <div class=\"jsPanel-headerbar\">\n                        <div class=\"jsPanel-headerlogo\"></div>\n                        <div class=\"jsPanel-titlebar\">\n                            <h3 class=\"jsPanel-title\"></h3>\n                        </div>\n                        <div class=\"jsPanel-controlbar\">\n                            <div class=\"jsPanel-btn jsPanel-btn-smallify\"><span class=\"jsglyph jsglyph-chevron-up\"></span></div>\n                            <div class=\"jsPanel-btn jsPanel-btn-smallifyrev\"><span class=\"jsglyph jsglyph-chevron-down\"></span></div>\n                            <div class=\"jsPanel-btn jsPanel-btn-minimize\"><span class=\"jsglyph jsglyph-minimize\"></span></div>\n                            <div class=\"jsPanel-btn jsPanel-btn-normalize\"><span class=\"jsglyph jsglyph-normalize\"></span></div>\n                            <div class=\"jsPanel-btn jsPanel-btn-maximize\"><span class=\"jsglyph jsglyph-maximize\"></span></div>\n                            <div class=\"jsPanel-btn jsPanel-btn-close\"><span class=\"jsglyph jsglyph-close\"></span></div>\n                        </div>\n                    </div>\n                    <div class=\"jsPanel-hdr-toolbar\"></div>\n                </div>\n                <div class=\"jsPanel-content jsPanel-content-nofooter\"></div>\n                <div class=\"jsPanel-minimized-box\"></div>\n                <div class=\"jsPanel-ftr\"></div>\n               </div>",
    replacementTemplate: "<div class=\"jsPanel-replacement\">\n                            <div class=\"jsPanel-hdr\">\n                                <div class=\"jsPanel-headerbar\">\n                                    <div class=\"jsPanel-titlebar\">\n                                        <h3 class=\"jsPanel-title\"></h3>\n                                    </div>\n                                    <div class=\"jsPanel-controlbar\">\n                                        <div class=\"jsPanel-btn jsPanel-btn-normalize\"><span class=\"jsglyph jsglyph-normalize\"></span></div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-maximize\"><span class=\"jsglyph jsglyph-maximize\"></span></div>\n                                        <div class=\"jsPanel-btn jsPanel-btn-close\"><span class=\"jsglyph jsglyph-close\"></span></div>\n                                    </div>\n                                </div>\n                            </div>\n                          </div>",
    themes: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
    mdbthemes: ['secondary', 'elegant', 'stylish', 'unique', 'special'],
    // just the extra themes which are not contained in jsPanel.themes
    controls: ['close', 'maximize', 'normalize', 'minimize', 'smallify', 'smallifyrev'],
    tplHeaderOnly: "<div class=\"jsPanel\">\n                        <div class=\"jsPanel-hdr\">\n                            <div class=\"jsPanel-headerbar\">\n                                <div class=\"jsPanel-headerlogo\"></div>\n                                <div class=\"jsPanel-titlebar\">\n                                    <h3 class=\"jsPanel-title\"></h3>\n                                </div>\n                                <div class=\"jsPanel-controlbar\">\n                                    <div class=\"jsPanel-btn jsPanel-btn-close\"><span class=\"jsglyph jsglyph-close\"></span></div>\n                                </div>\n                            </div>\n                            <div class=\"jsPanel-hdr-toolbar\"></div>\n                        </div>\n                    </div>",
    tplContentOnly: "<div class=\"jsPanel\">\n                        <div class=\"jsPanel-content jsPanel-content-noheader jsPanel-content-nofooter\"></div>\n                        <div class=\"jsPanel-minimized-box\"></div>\n                     </div>",
    activePanels: {
        list: [],
        getPanel: function getPanel(arg) {
            return typeof arg === 'string' ? document.getElementById(arg).jspanel.noop() : document.getElementById(this.list[arg]).jspanel.noop();
        } // example: jsPanel.activePanels.getPanel(0).resize(600,250).reposition().css('background','yellow');
        // or:      jsPanel.activePanels.getPanel('jsPanel-1').resize(600,250).reposition().css('background','yellow');

    },
    closeOnEscape: false,
    isIE: function () {
        return navigator.appVersion.indexOf('Trident') !== -1;
    }(),
    isEdge: function () {
        return navigator.appVersion.indexOf('Edge') !== -1;
    }(),
    addConnector: function addConnector(panel) {
        var bgColor = panel.option.paneltype.connectorBG || null;

        if (panel[0].classList.contains('jsPanel-tooltip-top')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-top">');
            jQuery('.jsPanel-connector-top', panel).css('border-top-color', bgColor || this.calcConnectorBg(panel, 'top'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;
        } else if (panel[0].classList.contains('jsPanel-tooltip-bottom')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-bottom">');
            jQuery('.jsPanel-connector-bottom', panel).css('border-bottom-color', bgColor || this.calcConnectorBg(panel, 'bottom'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;
        } else if (panel[0].classList.contains('jsPanel-tooltip-left')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-left">');
            jQuery('.jsPanel-connector-left', panel).css('border-left-color', bgColor || this.calcConnectorBg(panel, 'left'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;
        } else if (panel[0].classList.contains('jsPanel-tooltip-right')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-right">');
            jQuery('.jsPanel-connector-right', panel).css('border-right-color', bgColor || this.calcConnectorBg(panel, 'right'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;
        } else if (panel[0].classList.contains('jsPanel-tooltip-lefttopcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-lefttopcorner">');
            jQuery('.jsPanel-connector-lefttopcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'lefttopcorner'));
        } else if (panel[0].classList.contains('jsPanel-tooltip-righttopcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-righttopcorner">');
            jQuery('.jsPanel-connector-righttopcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'righttopcorner'));
        } else if (panel[0].classList.contains('jsPanel-tooltip-rightbottomcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-rightbottomcorner">');
            jQuery('.jsPanel-connector-rightbottomcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'rightbottomcorner'));
        } else if (panel[0].classList.contains('jsPanel-tooltip-leftbottomcorner')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-leftbottomcorner">');
            jQuery('.jsPanel-connector-leftbottomcorner', panel).css('background-color', bgColor || this.calcConnectorBg(panel, 'leftbottomcorner'));
        } else if (panel[0].classList.contains('jsPanel-tooltip-lefttop')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-lefttop">');
            jQuery('.jsPanel-connector-lefttop', panel).css('border-left-color', bgColor || this.calcConnectorBg(panel, 'lefttop'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;
        } else if (panel[0].classList.contains('jsPanel-tooltip-leftbottom')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-leftbottom">');
            jQuery('.jsPanel-connector-leftbottom', panel).css('border-left-color', bgColor || this.calcConnectorBg(panel, 'leftbottom'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;
        } else if (panel[0].classList.contains('jsPanel-tooltip-topleft')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-topleft">');
            jQuery('.jsPanel-connector-topleft', panel).css('border-top-color', bgColor || this.calcConnectorBg(panel, 'topleft'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;
        } else if (panel[0].classList.contains('jsPanel-tooltip-topright')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-topright">');
            jQuery('.jsPanel-connector-topright', panel).css('border-top-color', bgColor || this.calcConnectorBg(panel, 'topright'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;
        } else if (panel[0].classList.contains('jsPanel-tooltip-righttop')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-righttop">');
            jQuery('.jsPanel-connector-righttop', panel).css('border-right-color', bgColor || this.calcConnectorBg(panel, 'righttop'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;
        } else if (panel[0].classList.contains('jsPanel-tooltip-rightbottom')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-rightbottom">');
            jQuery('.jsPanel-connector-rightbottom', panel).css('border-right-color', bgColor || this.calcConnectorBg(panel, 'rightbottom'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;
        } else if (panel[0].classList.contains('jsPanel-tooltip-bottomleft')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-bottomleft">');
            jQuery('.jsPanel-connector-bottomleft', panel).css('border-bottom-color', bgColor || this.calcConnectorBg(panel, 'bottomleft'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;
        } else if (panel[0].classList.contains('jsPanel-tooltip-bottomright')) {
            panel.append('<div class="jsPanel-connector jsPanel-connector-bottomright">');
            jQuery('.jsPanel-connector-bottomright', panel).css('border-bottom-color', bgColor || this.calcConnectorBg(panel, 'bottomright'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;
        }
    },
    addCustomTheme: function addCustomTheme(theme) {
        if (this.themes.indexOf(theme) === -1) {
            this.themes.push(theme);
        }
    },
    ajax: function ajax(panel) {
        var oAjax = panel.option.contentAjax,
            oSize = panel.option.contentSize;

        if (oAjax.then) {
            if (oAjax.then[0]) {
                oAjax.done = oAjax.then[0];
            }

            if (oAjax.then[1]) {
                oAjax.fail = oAjax.then[1];
            }
        }

        jQuery.ajax(oAjax).done(function (data, textStatus, jqXHR) {
            if (oAjax.autoload) {
                panel.content.append(data);
            }

            if (jQuery.isFunction(oAjax.done)) {
                oAjax.done.call(panel, data, textStatus, jqXHR, panel);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jQuery.isFunction(oAjax.fail)) {
                oAjax.fail.call(panel, jqXHR, textStatus, errorThrown, panel);
            }
        }).always(function (arg1, textStatus, arg3) {
            if (jQuery.isFunction(oAjax.always)) {
                oAjax.always.call(panel, arg1, textStatus, arg3, panel);
            }

            if (panel.hasClass('jsPanel-contextmenu')) {
                jsPanel.checkContextmenuOverflow(panel);
            } // resize panel if either width or height is set to 'auto'


            if (typeof oSize === 'string' && oSize.match(/auto/i)) {
                var parts = oSize.split(' '),
                    sizes = Object.assign({}, jQuery.jsPanel.resizedefaults, {
                        width: parts[0],
                        height: parts[1]
                    });

                if (oAjax.autoresize) {
                    panel.resize(sizes);
                }

                if (!panel.hasClass('jsPanel-contextmenu')) {
                    if (oAjax.autoreposition) {
                        panel.reposition();
                    }
                }
            } else if (jQuery.isPlainObject(oSize) && (oSize.width === 'auto' || oSize.height === 'auto')) {
                var sizes = Object.assign({}, jQuery.jsPanel.resizedefaults, oSize);

                if (oAjax.autoresize) {
                    panel.resize(sizes);
                }

                if (!panel.hasClass('jsPanel-contextmenu')) {
                    if (oAjax.autoreposition) {
                        panel.reposition();
                    }
                }
            }
        });
        panel.data('ajaxURL', oAjax.url); // needed for exportPanels()
    },
    applyBuiltInTheme: function applyBuiltInTheme(panel, themeDetails) {
        panel[0].classList.add("jsPanel-theme-".concat(themeDetails.color)); // do not remove theme from jsP

        if (panel.header[0]) {
            panel.header[0].classList.add("jsPanel-theme-".concat(themeDetails.color));
        } // optionally set theme filling


        if (themeDetails.filling === 'filled') {
            panel.content.css('background', '')[0].classList.add('jsPanel-content-filled');
        } else if (themeDetails.filling === 'filledlight') {
            panel.content.css('background', '')[0].classList.add('jsPanel-content-filledlight');
        }

        if (!panel.option.headerToolbar) {
            panel.content.css({
                borderTop: "1px solid ".concat(panel.header.title.css('color'))
            });
        }
    },
    applyArbitraryTheme: function applyArbitraryTheme(panel, themeDetails) {
        panel.header.css('background-color', themeDetails.colors[0]);
        jQuery('.jsPanel-headerlogo, .jsPanel-title, .jsPanel-controlbar .jsPanel-btn .jsglyph, .jsPanel-hdr-toolbar', panel).css({
            color: themeDetails.colors[3]
        });

        if (panel.option.headerToolbar) {
            panel.header.toolbar.css({
                boxShadow: "0 0 1px ".concat(themeDetails.colors[3], " inset"),
                width: 'calc(100% + 4px)',
                marginLeft: '-1px'
            });
        } else {
            panel.content.css({
                borderTop: "1px solid ".concat(themeDetails.colors[3])
            });
        }

        if (themeDetails.filling === 'filled') {
            panel.content.css({
                backgroundColor: themeDetails.colors[0],
                color: themeDetails.colors[3]
            });
        } else if (themeDetails.filling === 'filledlight') {
            panel.content.css({
                backgroundColor: themeDetails.colors[1]
            });
        }
    },
    applyBootstrapTheme: function applyBootstrapTheme(panel, themeDetails) {
        var pColor;
        panel.addClass("panel panel-".concat(themeDetails.bstheme, " card card-inverse card-").concat(themeDetails.bstheme));

        if (panel.header[0]) {
            panel.header[0].classList.add('panel-heading');
            panel.header.title[0].classList.add('panel-title');
        } // added support for material-design-for-bootstrap 4.x colors


        if (themeDetails.bs === 'mdb') {
            var mdbColor = "".concat(themeDetails.bstheme, "-color");

            if (themeDetails.mdbStyle) {
                mdbColor = "".concat(mdbColor, "-dark");
            }

            panel.removeClass("panel panel-".concat(themeDetails.bstheme));
            panel[0].classList.add(mdbColor);
        } // ----------------------------------------------------


        panel.content[0].classList.add('panel-body'); // fix css problems for panels nested in other bootstrap panels

        panel.content.css('border-top-color', function () {
            return panel.header.css('border-top-color');
        });
        panel.footer.addClass('panel-footer card-footer');

        if (jQuery('.panel-heading', panel).css('background-color') === 'transparent') {
            pColor = panel.css('background-color').replace(/\s+/g, '');
        } else {
            pColor = jQuery('.panel-heading', panel).css('background-color').replace(/\s+/g, '');
        }

        var bsColors = this.calcColors(pColor);
        jQuery('.jsPanel-headerlogo, .jsPanel-title, .jsPanel-controlbar .jsPanel-btn, .jsPanel-hdr-toolbar', panel.header).css('color', bsColors[3]);

        if (panel.option.headerToolbar) {
            panel.header.toolbar.css({
                boxShadow: "0 0 1px ".concat(bsColors[3], " inset"),
                width: 'calc(100% + 4px)',
                marginLeft: '-1px'
            });
        } else {
            panel.content.css({
                borderTop: "1px solid ".concat(bsColors[3])
            });
        }

        if (themeDetails.filling === 'filled') {
            panel.content.css({
                backgroundColor: pColor,
                color: bsColors[3]
            });
        } else if (themeDetails.filling === 'filledlight') {
            panel.content.css({
                backgroundColor: bsColors[1],
                color: '#000000'
            });
        }
    },
    applyThemeBorder: function applyThemeBorder(panel, themeDetails) {
        var bordervalues = panel.option.border.split(' ');
        panel.css({
            borderWidth: bordervalues[0],
            borderStyle: bordervalues[1],
            borderColor: bordervalues[2]
        }); //panel.header.css({'border-top-left-radius': 0, 'border-top-right-radius': 0});

        if (!themeDetails.bs) {
            if (this.themes.indexOf(themeDetails.color) === -1) {
                // arbitrary themes only (for built-in themes it's taken from the css file)
                bordervalues[2] ? panel.css('border-color', bordervalues[2]) : panel.css('border-color', themeDetails.colors[0]);
            }
        } else {
            // bootstrap
            var pColor;

            if (jQuery('.panel-heading', panel).css('background-color') === 'transparent') {
                pColor = panel.css('background-color').replace(/\s+/g, '');
            } else {
                pColor = jQuery('.panel-heading', panel).css('background-color').replace(/\s+/g, '');
            }

            bordervalues[2] ? panel.css('border-color', bordervalues[2]) : panel.css('border-color', pColor);
        }
    },
    calcColors: function calcColors(primaryColor) {
        var primeColor = this.color(primaryColor),
            secondColor = this.lighten(primaryColor, 0.81),
            thirdColor = this.darken(primaryColor, 0.5),
            fontColorForPrimary = this.perceivedBrightness(primaryColor) <= this.pbTreshold ? '#ffffff' : '#000000',
            fontColorForSecond = this.perceivedBrightness(secondColor) <= this.pbTreshold ? '#ffffff' : '#000000',
            fontColorForThird = this.perceivedBrightness(thirdColor) <= this.pbTreshold ? '#000000' : '#ffffff';
        return [primeColor.hsl.css, secondColor, thirdColor, fontColorForPrimary, fontColorForSecond, fontColorForThird];
    },
    calcConnectorBg: function calcConnectorBg(panel, connector) {
        var bgColor_content = panel.content.css('background-color'),
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
    clearTheme: function clearTheme(panel) {
        this.themes.concat(this.mdbthemes).forEach(function (value) {
            panel.removeClass("panel card card-inverse jsPanel-theme-".concat(value, " panel-").concat(value, " card-").concat(value, " ").concat(value, "-color"));
            panel.header.removeClass("panel-heading jsPanel-theme-".concat(value));
        });
        panel.content.removeClass('panel-body jsPanel-content-filled jsPanel-content-filledlight');
        panel.css({
            borderWidth: '',
            borderStyle: '',
            borderColor: ''
        });
        jQuery('.jsPanel-hdr, .jsPanel-content', panel).css({
            background: ''
        });
        jQuery('.jsPanel-headerlogo, .jsPanel-title, .jsPanel-controlbar .jsPanel-btn .jsglyph, .jsPanel-hdr-toolbar, .jsPanel-content', panel).css({
            color: ''
        });
        panel.header.title.removeClass('panel-title');
        panel.header.toolbar.css({
            boxShadow: '',
            width: '',
            marginLeft: ''
        });
        panel.css({
            borderTop: '',
            borderTopColor: ''
        });
        panel.footer.removeClass('panel-footer card-footer');
    },
    close: function close(panel) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
        }

        var id = panel.attr('id'),
            trigger = this.setTrigger(panel.option.position),
            delay = panel.option.delayClose,
            args = params; // params[0] has to be the callback or false
        // params[1] has to skipOnbeforeClose (if true callback is skipped)
        // params[2] has to be skipOnclosed (if true callback is skipped)

        function closePanel(panel) {
            for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                params[_key2 - 1] = arguments[_key2];
            }

            params = args; // this code block is only relevant if panel uses autoposition ------------------------------

            var jsPop = panel.option.position;

            if (jsPop.autoposition || typeof jsPop === 'string' && jsPop.match(/DOWN|RIGHT|UP|LEFT/i)) {
                var regex = /left-top|center-top|right-top|left-center|center|right-center|left-bottom|center-bottom|right-bottom/,
                    parent = jQuery(panel).parent(),
                    match = document.getElementById(id).className.match(regex);

                if (match) {
                    jsPanel.lastbeforeclose = {
                        parent: parent,
                        "class": match[0]
                    };
                }
            } // ------------------------------------------------------------------------------------------
            // close all childpanels and then the panel itself


            panel.closeChildpanels().remove(); // execute the following code only when panel really was removed

            if (!jQuery("#".concat(id)).length) {
                // remove id from activePanels.list
                var index = jsPanel.activePanels.list.indexOf(id);

                if (index > -1) {
                    jsPanel.activePanels.list.splice(index, 1);
                } // remove replacement if present


                jsPanel.remMinReplacement(panel); // remove modal backdrop of corresponding modal jsPanel

                if (panel.option.paneltype === 'modal') {
                    jsPanel.removeModalBackdrop(panel);
                } // remove class hasTooltip from tooltip trigger if panel to close is tooltip


                if (panel.option.paneltype.tooltip) {
                    trigger.classList.remove('hasTooltip');
                }

                jQuery(document).trigger('jspanelclosed', id);
                jQuery(document).trigger('jspanelstatuschange', id); // this code block is only relevant if panel uses autoposition ------------------------------

                var container, panels, pos;

                if (jsPanel.lastbeforeclose) {
                    container = jsPanel.lastbeforeclose.parent;
                    panels = jQuery(".".concat(jsPanel.lastbeforeclose["class"]), container);
                    pos = jsPanel.lastbeforeclose["class"];
                } // than reposition all elmts


                if (panels) {
                    // remove classname from all panels
                    panels.each(function (index, elmt) {
                        elmt.classList.remove(pos);
                    }); // reposition remaining autopositioned panels

                    panels.each(function (index, elmt) {
                        jsPanel.position(elmt, panel.option.position);
                    });
                }

                jsPanel.lastbeforeclose = false; // -----------------------------------------------------------------------------------------------
                // call onclosed callback of panel to close

                if (params[2] === true) {
                    jQuery.noop();
                } else {
                    if (jQuery.isFunction(panel.option.onclosed)) {
                        panel.option.onclosed.call(panel, panel);
                    }
                } // call individual callback


                if (params[0] && jQuery.isFunction(params[0])) {
                    params[0].call(panel, panel);
                }

                jsPanel.resetZis();
            }
        }

        jQuery(document).trigger('jspanelbeforeclose', id);

        if (jQuery.isFunction(panel.option.onbeforeclose)) {
            // do not close panel if onbeforeclose callback returns false
            if (params[1] === true) {
                jQuery.noop();
            } else {
                if (panel.option.onbeforeclose.call(panel, panel) === false) {
                    return panel;
                }
            }
        } // delay is not implemented as function parameter because it wouldn't allow to pass in a delay used also
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
    closeChildpanels: function closeChildpanels(panel) {
        jQuery('.jsPanel', panel).each(function (index, elmt) {
            // jspanel is not the global object jsPanel but the extension for the individual panel elmt
            elmt.jspanel.close();
        });
        return panel;
    },
    closePanels: function closePanels(paneltype) {
        jQuery(".jsPanel-".concat(paneltype)).each(function (index, elmt) {
            if (elmt.jspanel) elmt.jspanel.close();
        });
    },
    calcPositionFactors: function calcPositionFactors(panel) {
        if (panel.option.container === 'body') {
            panel.hf = parseInt(panel.css('left'), 10) / (jQuery(window).outerWidth() - panel.outerWidth());
            panel.vf = parseInt(panel.css('top'), 10) / (jQuery(window).outerHeight() - panel.outerHeight());
        } else {
            panel.hf = parseInt(panel.css('left'), 10) / (panel.parent().outerWidth() - panel.outerWidth());
            panel.vf = parseInt(panel.css('top'), 10) / (panel.parent().outerHeight() - panel.outerHeight());
        }
    },
    color: function color(val) {
        var color = val.toLowerCase(),
            r,
            g,
            b,
            h,
            s,
            l,
            match,
            channels,
            hsl,
            result = {};
        var hexPattern = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi,
            // matches "#123" or "#f05a78" with or without "#"
            RGBAPattern = /^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
            // matches rgb/rgba color values, whitespace allowed
            HSLAPattern = /^hsla?\(([0-9]{1,3}),([0-9]{1,3}\%),([0-9]{1,3}\%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
            namedColors = {
                aliceblue: 'f0f8ff',
                antiquewhite: 'faebd7',
                aqua: '0ff',
                aquamarine: '7fffd4',
                azure: 'f0ffff',
                beige: 'f5f5dc',
                bisque: 'ffe4c4',
                black: '000',
                blanchedalmond: 'ffebcd',
                blue: '00f',
                blueviolet: '8a2be2',
                brown: 'a52a2a',
                burlywood: 'deb887',
                cadetblue: '5f9ea0',
                chartreuse: '7fff00',
                chocolate: 'd2691e',
                coral: 'ff7f50',
                cornflowerblue: '6495ed',
                cornsilk: 'fff8dc',
                crimson: 'dc143c',
                cyan: '0ff',
                darkblue: '00008b',
                darkcyan: '008b8b',
                darkgoldenrod: 'b8860b',
                darkgray: 'a9a9a9',
                darkgrey: 'a9a9a9',
                darkgreen: '006400',
                darkkhaki: 'bdb76b',
                darkmagenta: '8b008b',
                darkolivegreen: '556b2f',
                darkorange: 'ff8c00',
                darkorchid: '9932cc',
                darkred: '8b0000',
                darksalmon: 'e9967a',
                darkseagreen: '8fbc8f',
                darkslateblue: '483d8b',
                darkslategray: '2f4f4f',
                darkslategrey: '2f4f4f',
                darkturquoise: '00ced1',
                darkviolet: '9400d3',
                deeppink: 'ff1493',
                deepskyblue: '00bfff',
                dimgray: '696969',
                dimgrey: '696969',
                dodgerblue: '1e90ff',
                firebrick: 'b22222',
                floralwhite: 'fffaf0',
                forestgreen: '228b22',
                fuchsia: 'f0f',
                gainsboro: 'dcdcdc',
                ghostwhite: 'f8f8ff',
                gold: 'ffd700',
                goldenrod: 'daa520',
                gray: '808080',
                grey: '808080',
                green: '008000',
                greenyellow: 'adff2f',
                honeydew: 'f0fff0',
                hotpink: 'ff69b4',
                indianred: 'cd5c5c',
                indigo: '4b0082',
                ivory: 'fffff0',
                khaki: 'f0e68c',
                lavender: 'e6e6fa',
                lavenderblush: 'fff0f5',
                lawngreen: '7cfc00',
                lemonchiffon: 'fffacd',
                lightblue: 'add8e6',
                lightcoral: 'f08080',
                lightcyan: 'e0ffff',
                lightgoldenrodyellow: 'fafad2',
                lightgray: 'd3d3d3',
                lightgrey: 'd3d3d3',
                lightgreen: '90ee90',
                lightpink: 'ffb6c1',
                lightsalmon: 'ffa07a',
                lightseagreen: '20b2aa',
                lightskyblue: '87cefa',
                lightslategray: '789',
                lightslategrey: '789',
                lightsteelblue: 'b0c4de',
                lightyellow: 'ffffe0',
                lime: '0f0',
                limegreen: '32cd32',
                linen: 'faf0e6',
                magenta: 'f0f',
                maroon: '800000',
                mediumaquamarine: '66cdaa',
                mediumblue: '0000cd',
                mediumorchid: 'ba55d3',
                mediumpurple: '9370d8',
                mediumseagreen: '3cb371',
                mediumslateblue: '7b68ee',
                mediumspringgreen: '00fa9a',
                mediumturquoise: '48d1cc',
                mediumvioletred: 'c71585',
                midnightblue: '191970',
                mintcream: 'f5fffa',
                mistyrose: 'ffe4e1',
                moccasin: 'ffe4b5',
                navajowhite: 'ffdead',
                navy: '000080',
                oldlace: 'fdf5e6',
                olive: '808000',
                olivedrab: '6b8e23',
                orange: 'ffa500',
                orangered: 'ff4500',
                orchid: 'da70d6',
                palegoldenrod: 'eee8aa',
                palegreen: '98fb98',
                paleturquoise: 'afeeee',
                palevioletred: 'd87093',
                papayawhip: 'ffefd5',
                peachpuff: 'ffdab9',
                peru: 'cd853f',
                pink: 'ffc0cb',
                plum: 'dda0dd',
                powderblue: 'b0e0e6',
                purple: '800080',
                rebeccapurple: '639',
                red: 'f00',
                rosybrown: 'bc8f8f',
                royalblue: '4169e1',
                saddlebrown: '8b4513',
                salmon: 'fa8072',
                sandybrown: 'f4a460',
                seagreen: '2e8b57',
                seashell: 'fff5ee',
                sienna: 'a0522d',
                silver: 'c0c0c0',
                skyblue: '87ceeb',
                slateblue: '6a5acd',
                slategray: '708090',
                slategrey: '708090',
                snow: 'fffafa',
                springgreen: '00ff7f',
                steelblue: '4682b4',
                tan: 'd2b48c',
                teal: '008080',
                thistle: 'd8bfd8',
                tomato: 'ff6347',
                turquoise: '40e0d0',
                violet: 'ee82ee',
                wheat: 'f5deb3',
                white: 'fff',
                whitesmoke: 'f5f5f5',
                yellow: 'ff0',
                yellowgreen: '9acd32'
            }; // change named color to corresponding hex value

        if (namedColors[color]) {
            color = namedColors[color];
        } // check val for hex color


        if (color.match(hexPattern) !== null) {
            // '#' entfernen wenn vorhanden
            color = color.replace('#', ''); // color has either 3 or 6 characters

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
                result.hex = "#".concat(r).concat(g).concat(b);
            } else {
                // color has 6 char
                result.rgb = {
                    r: parseInt(color.substr(0, 2), 16),
                    g: parseInt(color.substr(2, 2), 16),
                    b: parseInt(color.substr(4, 2), 16)
                };
                result.hex = "#".concat(color);
            }

            hsl = this.rgbToHsl(result.rgb.r, result.rgb.g, result.rgb.b);
            result.hsl = hsl;
            result.rgb.css = "rgb(".concat(result.rgb.r, ",").concat(result.rgb.g, ",").concat(result.rgb.b, ")");
        } // check val for rgb/rgba color
        else if (color.match(RGBAPattern)) {
            match = RGBAPattern.exec(color);
            result.rgb = {
                css: color,
                r: match[1],
                g: match[2],
                b: match[3]
            };
            result.hex = this.rgbToHex(match[1], match[2], match[3]);
            hsl = this.rgbToHsl(match[1], match[2], match[3]);
            result.hsl = hsl;
        } // check val for hsl/hsla color
        else if (color.match(HSLAPattern)) {
            match = HSLAPattern.exec(color);
            h = match[1] / 360;
            s = match[2].substr(0, match[2].length - 1) / 100;
            l = match[3].substr(0, match[3].length - 1) / 100;
            channels = this.hslToRgb(h, s, l);
            result.rgb = {
                css: "rgb(".concat(channels[0], ",").concat(channels[1], ",").concat(channels[2], ")"),
                r: channels[0],
                g: channels[1],
                b: channels[2]
            };
            result.hex = this.rgbToHex(result.rgb.r, result.rgb.g, result.rgb.b);
            result.hsl = {
                css: "hsl(".concat(match[1], ",").concat(match[2], ",").concat(match[3], ")"),
                h: match[1],
                s: match[2],
                l: match[3]
            };
        } // or return #f5f5f5
        else {
            result.hex = '#f5f5f5';
            result.rgb = {
                css: 'rgb(245,245,245)',
                r: 245,
                g: 245,
                b: 245
            };
            result.hsl = {
                css: 'hsl(0,0%,96.08%)',
                h: 0,
                s: '0%',
                l: '96.08%'
            };
        }

        return result;
    },
    configIconfont: function configIconfont(panel) {
        var bootstrapArray = ['remove', 'fullscreen', 'resize-full', 'minus', 'chevron-up', 'chevron-down'],
            fontawesomeArray = ['times fa-window-close', 'arrows-alt fa-window-maximize', 'expand fa-window-restore', 'minus fa-window-minimize', 'chevron-up', 'chevron-down'],
            materialArray = ['close', 'fullscreen', 'fullscreen_exit', 'call_received', 'expand_less', 'expand_more'],
            optIconfont = panel.option.headerControls.iconfont,
            controls = panel.header.headerbar; // set icons

        if (optIconfont === 'bootstrap' || optIconfont === 'glyphicon') {
            this.controls.forEach(function (item, i) {
                jQuery(".jsPanel-btn-".concat(item, " span"), controls).removeClass().addClass("glyphicon glyphicon-".concat(bootstrapArray[i]));
            });
        } else if (optIconfont === 'font-awesome') {
            this.controls.forEach(function (item, i) {
                jQuery(".jsPanel-btn-".concat(item, " span"), controls).removeClass().addClass("fa fa-".concat(fontawesomeArray[i]));
            });
        } else if (optIconfont === 'material-icons') {
            this.controls.forEach(function (item, i) {
                jQuery(".jsPanel-btn-".concat(item, " span"), controls).removeClass().addClass('material-icons').text(materialArray[i]);
            });
        } else if (Array.isArray(optIconfont)) {
            // ['custom-close', 'custom-maximize', 'custom-normalize', 'custom-minimize', 'custom-smallify', 'custom-unsmallify']
            this.controls.forEach(function (item, i) {
                jQuery(".jsPanel-btn-".concat(item, " span"), controls).removeClass().addClass("custom-control-icon ".concat(optIconfont[i]));
            });
        }
    },
    // builds toolbar
    configToolbar: function configToolbar(toolbaritems, toolbarplace, panel) {
        toolbaritems.forEach(function (item) {
            if (_typeof(item) === 'object') {
                var el = jQuery(item.item); // add text to button

                if (typeof item.btntext === 'string') {
                    el.append(item.btntext);
                } // add class to button


                if (typeof item.btnclass === 'string') {
                    item.btnclass.split(' ').forEach(function (classname) {
                        el[0].classList.add(classname);
                    });
                }

                toolbarplace.append(el); // bind handler to the item

                if (jQuery.isFunction(item.callback)) {
                    var elEvent = item.event || 'click';
                    el.on(elEvent, panel, item.callback); // jsP is accessible in the handler as "event.data"
                }
            }
        });
    },
    contentReload: function contentReload(panel, callback) {
        if (panel.option.content) {
            panel.content.empty().append(panel.option.content);
        } else if (panel.option.contentAjax) {
            panel.content.empty();
            this.ajax(panel);
        } else if (panel.option.contentIframe) {
            panel.content.empty();
            this.iframe(panel);
        } // call individual callback


        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    contentResize: function contentResize(panel, callback) {
        var hdrftr = panel.footer[0].classList.contains('active') ? panel.header.outerHeight() + panel.footer.outerHeight() : panel.header.outerHeight(),
            borderWidth = parseInt(panel.css('border-top-width'), 10) + parseInt(panel.css('border-bottom-width'), 10);
        panel.content.css({
            height: panel.outerHeight() - hdrftr - borderWidth
        }); // call individual callback

        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    createMinimizedReplacement: function createMinimizedReplacement(panel) {
        var replacement = jQuery(this.replacementTemplate),
            fontColor = panel.header.title.css('color'),
            titletext = panel.header.title[0].textContent;
        var bgColor;

        if (panel.header.css('background-color') === 'transparent') {
            bgColor = panel.css('background-color');
        } else {
            bgColor = panel.header.css('background-color');
        } // move jsPanel off screen


        panel.css('left', '-9999px').data('status', 'minimized'); // set replacement props

        replacement.css('background-color', bgColor).prop('id', "".concat(panel.prop('id'), "-min")).find('h3').css('color', fontColor).prop('title', titletext).html(titletext); // add logo

        if (panel.header.logo.children().length) {
            jQuery('.jsPanel-headerbar', replacement).prepend(panel.header.logo.clone());
        } // set replacement iconfont


        var iconfont = panel.option.headerControls.iconfont;

        if (iconfont === 'font-awesome') {
            jQuery('.jsglyph.jsglyph-normalize', replacement).removeClass().addClass('fa fa-expand fa-window-restore');
            jQuery('.jsglyph.jsglyph-maximize', replacement).removeClass().addClass('fa fa-arrows-alt fa-window-maximize');
            jQuery('.jsglyph.jsglyph-close', replacement).removeClass().addClass('fa fa-times fa-window-close');
        } else if (iconfont === 'bootstrap' || iconfont === 'glyphicon') {
            jQuery('.jsglyph.jsglyph-normalize', replacement).removeClass().addClass('glyphicon glyphicon-resize-full');
            jQuery('.jsglyph.jsglyph-maximize', replacement).removeClass().addClass('glyphicon glyphicon-fullscreen');
            jQuery('.jsglyph.jsglyph-close', replacement).removeClass().addClass('glyphicon glyphicon-remove');
        } else if (iconfont === 'material-icons') {
            jQuery('.jsglyph.jsglyph-normalize', replacement).removeClass().addClass('material-icons').text('call_made');
            jQuery('.jsglyph.jsglyph-maximize', replacement).removeClass().addClass('material-icons').text('fullscreen');
            jQuery('.jsglyph.jsglyph-close', replacement).removeClass().addClass('material-icons').text('close');
        } else if (Array.isArray(iconfont)) {
            jQuery('.jsglyph.jsglyph-normalize', replacement).removeClass().addClass("custom-control-icon ".concat(iconfont[2]));
            jQuery('.jsglyph.jsglyph-maximize', replacement).removeClass().addClass("custom-control-icon ".concat(iconfont[1]));
            jQuery('.jsglyph.jsglyph-close', replacement).removeClass().addClass("custom-control-icon ".concat(iconfont[0]));
        }

        jQuery('.jsPanel-btn span', replacement).css({
            color: fontColor
        });
        return replacement;
    },
    darken: function darken(val, amount) {
        // amount is value between 0 and 1
        var hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = l - l * amount + '%';
        return "hsl(".concat(hsl.h, ",").concat(hsl.s, ",").concat(lnew, ")");
    },
    // helper function for the doubleclick handlers (title, content, footer)
    dblclickhelper: function dblclickhelper(odcs, panel) {
        if (typeof odcs === 'string') {
            if (odcs === 'maximize' || odcs === 'normalize') {
                panel.data('status') === 'normalized' ? panel.maximize() : panel.normalize();
            } else if (odcs === 'minimize' || odcs === 'smallify' || odcs === 'close') {
                panel[odcs]();
            }
        }
    },
    // my own implementation of a draggable functionality
    dragit: function dragit(element) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        //let freezeVp = function(e) {e.preventDefault();};
        var elmt;

        if (typeof element === 'string') {
            elmt = document.querySelector(element);
        } else if (element.jquery) {
            elmt = element[0];
        } else {
            elmt = element;
        }

        var el = element.jquery ? element : elmt; // el is used as arg within dragstart, drag and dragstop callbacks and as return value

        var dragstarted,
            opts = Object.assign({}, jQuery.jsPanel.defaults.dragit, options),
            containment = opts.containment,
            containmentArray,
            dragPanel,
            handles,
            elmtParent = elmt.parentElement,
            elmtStyles = window.getComputedStyle(elmt, null),
            elmtStylesPosition = elmtStyles.getPropertyValue('position'),
            elmtParentTagName = elmtParent.tagName.toLowerCase(),
            elmtContent = elmt.querySelector('.jsPanel-content'),
            dragstart,
            drag,
            dragstop,
            left,
            top,
            frames = [];

        if (jsPanel.isIE) {
            // old fashioned only for IE11
            dragstart = document.createEvent('CustomEvent');
            drag = document.createEvent('CustomEvent');
            dragstop = document.createEvent('CustomEvent');
            dragstart.initCustomEvent('dragstart', true, true, {});
            drag.initCustomEvent('drag', true, true, {});
            dragstop.initCustomEvent('dragstop', true, true, {});
        } else {
            dragstart = new Event('dragstart');
            drag = new Event('drag');
            dragstop = new Event('dragstop');
        }

        handles = opts.handles ? elmt.querySelectorAll(opts.handles) : [elmt];

        if (typeof containment === 'number') {
            // containment: 20 => containment: [20, 20, 20, 20]
            containment = [].concat(containment, containment, containment, containment);
        } else if (Object.prototype.toString.call(containment) === '[object Array]') {
            if (containment.length === 2) {
                // containment: [20, 40] => containment: [20, 40, 20, 40]
                containment = containment.concat(containment);
            } else if (containment.length === 3) {
                containment[3] = containment[1];
            }
        } // if containment is array save array to another var and reset containment depending on parent elmt


        if (Object.prototype.toString.call(containment) === '[object Array]') {
            containmentArray = containment;

            if (elmtParentTagName === 'body') {
                opts.containment = containment = 'window';
            } else {
                opts.containment = containment = 'parent';
            }
        } // if elmt is appended to body containment can only be set to "window"


        if (containment && elmtParentTagName === 'body') {
            opts.containment = containment = 'window';
        }

        var _loop = function _loop(i) {
            jsPanel.evtStart.forEach(function (item) {
                handles[i].addEventListener(item, function (e) {
                    e.preventDefault(); // disable dragging for all mouse buttons but left

                    if (e.button && e.button > 0) {
                        return false;
                    }

                    frames = Array.prototype.slice.call(document.querySelectorAll('iframe'));

                    if (frames.length) {
                        frames.forEach(function (item) {
                            item.style.pointerEvents = 'none';
                        });
                    }

                    var elmtRect = elmt.getBoundingClientRect(),

                        /* needs to be calculated on pointerdown!! */
                        elmtParentRect = elmtParent.getBoundingClientRect(),

                        /* needs to be calculated on pointerdown!! */
                        elmtParentStyles = window.getComputedStyle(elmtParent, null),
                        elmtParentPosition = elmtParentStyles.getPropertyValue('position'),
                        elmtParentLeftBorder = parseInt(elmtParentStyles.getPropertyValue('border-left-width'), 10),
                        elmtParentRightBorder = parseInt(elmtParentStyles.getPropertyValue('border-right-width'), 10),
                        elmtParentTopBorder = parseInt(elmtParentStyles.getPropertyValue('border-top-width'), 10),
                        elmtParentBottomBorder = parseInt(elmtParentStyles.getPropertyValue('border-bottom-width'), 10),
                        startLeft,
                        startTop,
                        startX = e.touches ? e.touches[0].pageX : e.pageX,
                        startY = e.touches ? e.touches[0].pageY : e.pageY,
                        scrollLeft = window.scrollX || window.pageXOffset,
                        // IE11 doesn't know scrollX
                        scrollTop = window.scrollY || window.pageYOffset,
                        // IE11 doesn't know scrollY
                        minLeft,
                        maxLeft,
                        minTop,
                        maxTop;

                    if (elmtStylesPosition === 'fixed') {
                        startLeft = elmtRect.left;
                        startTop = elmtRect.top;
                    } else if (elmtParentTagName === 'body' || elmtParentPosition === 'static') {
                        startLeft = elmtRect.left;
                        startTop = elmtRect.top;
                    } else if (elmtParentTagName !== 'body') {
                        startLeft = elmtRect.left - elmtParentRect.left - elmtParentLeftBorder + elmtParent.scrollLeft;
                        startTop = elmtRect.top - elmtParentRect.top - elmtParentTopBorder + elmtParent.scrollTop;
                    } // calc min/max left/top values if containment is set


                    if (elmtParentTagName === 'body' && containment) {
                        if (elmtStylesPosition === 'fixed') {
                            minLeft = 0;
                            minTop = 0;
                            maxLeft = document.documentElement.clientWidth - elmtRect.width;
                            maxTop = document.documentElement.clientHeight - elmtRect.height;
                        } else {
                            minLeft = scrollLeft;
                            minTop = scrollTop;
                            maxLeft = document.documentElement.clientWidth - elmtRect.width + scrollLeft;
                            maxTop = document.documentElement.clientHeight - elmtRect.height + scrollTop;
                        }
                    } else {
                        // if panel is NOT in body
                        if (containment === 'parent') {
                            if (elmtParentPosition === 'static') {
                                minLeft = elmtParentRect.left + elmtParentLeftBorder + scrollLeft;
                                minTop = elmtParentRect.top + elmtParentTopBorder + scrollTop;
                                maxLeft = minLeft + elmtParentRect.width - elmtRect.width - elmtParentLeftBorder - elmtParentRightBorder;
                                maxTop = minTop + elmtParentRect.height - elmtRect.height - elmtParentTopBorder - elmtParentBottomBorder;
                            } else {
                                minLeft = 0;
                                minTop = 0;
                                maxLeft = elmtParentRect.width - elmtRect.width - elmtParentLeftBorder - elmtParentRightBorder;
                                maxTop = elmtParentRect.height - elmtRect.height - elmtParentTopBorder - elmtParentBottomBorder;
                            }
                        } else if (containment === 'window') {
                            if (elmtParentPosition === 'static') {
                                minLeft = scrollLeft;
                                minTop = scrollTop;
                                maxLeft = document.documentElement.clientWidth - elmtRect.width + scrollLeft;
                                maxTop = document.documentElement.clientHeight - elmtRect.height + scrollTop;
                            } else {
                                minLeft = -elmtParentRect.left - elmtParentLeftBorder;
                                minTop = -elmtParentRect.top - elmtParentTopBorder;
                                maxLeft = document.documentElement.clientWidth - elmtParentRect.left - elmtRect.width - elmtParentRightBorder;
                                maxTop = document.documentElement.clientHeight - elmtParentRect.top - elmtRect.height - elmtParentBottomBorder;
                            }
                        }
                    } // if original opts.containment is array


                    if (containmentArray) {
                        minLeft += containmentArray[3];
                        minTop += containmentArray[0];
                        maxLeft -= containmentArray[1];
                        maxTop -= containmentArray[2];
                    } // calculate corrections for rotated panels


                    var xDif = parseFloat(elmt.style.left) - elmtRect.left,
                        yDif = parseFloat(elmt.style.top) - elmtRect.top;

                    if (elmtParent !== document.body) {
                        xDif += elmtParentRect.left;
                        yDif += elmtParentRect.top;
                    }

                    dragPanel = function dragPanel(evt) {
                        e.preventDefault();

                        if (opts.disableOnMaximized && jQuery(elmt).data('status') === 'maximized') {
                            return false;
                        } // trigger dragstarted only once per drag


                        if (!dragstarted) {
                            document.dispatchEvent(dragstart);
                            elmt.style.opacity = opts.opacity;

                            if (typeof opts.start === 'function') {
                                opts.start.call(el, el, {
                                    left: startLeft,
                                    top: startTop
                                });
                            }
                        }

                        dragstarted = 1; // trigger drag permanently while draging

                        document.dispatchEvent(drag);
                        left = elmtParentLeftBorder + startLeft + (evt.touches ? evt.touches[0].pageX : evt.pageX) - startX + xDif;
                        top = elmtParentTopBorder + startTop + (evt.touches ? evt.touches[0].pageY : evt.pageY) - startY + yDif; // apply min/max left/top values if needed

                        if (left <= minLeft) {
                            left = minLeft;
                        } else if (left >= maxLeft) {
                            left = maxLeft;
                        }

                        if (top <= minTop) {
                            top = minTop;
                        } else if (top >= maxTop) {
                            top = maxTop;
                        } // restrict draging to one direction


                        if (opts.axis === 'x') {
                            elmt.style.left = left + 'px';
                        } else if (opts.axis === 'y') {
                            elmt.style.top = top + 'px';
                        } else {
                            elmt.style.left = left + 'px';
                            elmt.style.top = top + 'px';
                        } // snap panel to grid


                        if (opts.grid && Array.isArray(opts.grid)) {
                            if (opts.grid.length === 1) {
                                opts.grid[1] = opts.grid[0];
                            }

                            var cx = parseFloat(elmt.style.left),
                                cy = parseFloat(elmt.style.top),
                                modX = cx % opts.grid[0],
                                modY = cy % opts.grid[1];

                            if (modX < opts.grid[0] / 2) {
                                elmt.style.left = cx - modX + 'px';
                            } else {
                                elmt.style.left = cx + (opts.grid[0] - modX) + 'px';
                            }

                            if (modY < opts.grid[1] / 2) {
                                elmt.style.top = cy - modY + 'px';
                            } else {
                                elmt.style.top = cy + (opts.grid[1] - modY) + 'px';
                            }
                        } // prevent selctions while draging


                        window.getSelection().removeAllRanges();

                        if (typeof opts.drag === 'function') {
                            opts.drag.call(el, el, {
                                left: parseFloat(el.css('left')),
                                top: parseFloat(el.css('top'))
                            });
                        }
                    };

                    jsPanel.evtMove.forEach(function (item) {
                        document.addEventListener(item, dragPanel, false);
                    });
                }, false);
            });
        };

        for (var i = 0; i < handles.length; i++) {
            _loop(i);
        }

        jsPanel.evtEnd.forEach(function (item) {
            document.addEventListener(item, function () {
                jsPanel.evtMove.forEach(function (item) {
                    document.removeEventListener(item, dragPanel, false);
                });

                if (dragstarted) {
                    elmtContent.style.pointerEvents = 'inherit';
                    document.dispatchEvent(dragstop);
                    elmt.style.opacity = 1;
                    dragstarted = undefined;
                    jsPanel.calcPositionFactors(element);

                    if (typeof opts.stop === 'function') {
                        opts.stop.call(el, el, {
                            left: parseFloat(el.css('left')),
                            top: parseFloat(el.css('top'))
                        });
                    }
                }

                if (frames.length) {
                    frames.forEach(function (item) {
                        item.style.pointerEvents = 'inherit';
                    });
                }
            }, false);
        });
        return el;
    },
    // my own implementation of a resizable functionality
    resizeit: function resizeit(element) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        //let freezeVp = function(e) {e.preventDefault();};
        var elmt;

        if (typeof element === 'string') {
            elmt = document.querySelector(element);
        } else if (element.jquery) {
            elmt = element[0];
        } else {
            elmt = element;
        }

        var el = element.jquery ? element : elmt;
        var resizestarted,
            opts = Object.assign({}, jQuery.jsPanel.defaults.resizeit, options),
            containment = opts.containment,
            containmentArray,
            resizePanel,
            elmtStyles = window.getComputedStyle(elmt, null),
            elmtStylesPosition = elmtStyles.getPropertyValue('position'),
            elmtLeftBorder = parseInt(elmtStyles.getPropertyValue('border-left-width'), 10),
            elmtTopBorder = parseInt(elmtStyles.getPropertyValue('border-top-width'), 10),
            elmtRightBorder = parseInt(elmtStyles.getPropertyValue('border-right-width'), 10),
            elmtBottomBorder = parseInt(elmtStyles.getPropertyValue('border-bottom-width'), 10),
            elmtParent = elmt.parentElement,
            elmtParentTagName = elmtParent.tagName.toLowerCase(),
            elmtContent = elmt.querySelector('.jsPanel-content'),
            maxWidth = typeof opts.maxWidth === 'function' ? opts.maxWidth() : opts.maxWidth,
            maxHeight = typeof opts.maxHeight === 'function' ? opts.maxHeight() : opts.maxHeight,
            minWidth = typeof opts.minWidth === 'function' ? opts.minWidth() : opts.minWidth,
            minHeight = typeof opts.minHeight === 'function' ? opts.minHeight() : opts.minHeight,
            resizestart,
            resize,
            resizestop,
            frames = [];

        if (jsPanel.isIE) {
            // old fashioned only for IE11
            resizestart = document.createEvent('CustomEvent');
            resize = document.createEvent('CustomEvent');
            resizestop = document.createEvent('CustomEvent');
            resizestart.initCustomEvent('dragstart', true, true, {});
            resize.initCustomEvent('drag', true, true, {});
            resizestop.initCustomEvent('dragstop', true, true, {});
        } else {
            resizestart = new Event('dragstart');
            resize = new Event('drag');
            resizestop = new Event('dragstop');
        }

        if (typeof containment === 'number') {
            // containment: 20 => containment: [20, 20, 20, 20]
            containment = [].concat(containment, containment, containment, containment);
        } else if (Object.prototype.toString.call(containment) === '[object Array]') {
            if (containment.length === 2) {
                // containment: [20, 40] => containment: [20, 40, 20, 40]
                containment = containment.concat(containment);
            } else if (containment.length === 3) {
                containment[3] = containment[1];
            }
        } // if containment is array save array to another var and reset containment depending on parent elmt


        if (Object.prototype.toString.call(containment) === '[object Array]') {
            containmentArray = containment;

            if (elmtParentTagName === 'body') {
                opts.containment = containment = 'window';
            } else {
                opts.containment = containment = 'parent';
            }
        } // if elmt is appended to body containment can only be set to "window"


        if (containment && elmtParentTagName === 'body') {
            opts.containment = containment = 'window';
        }

        opts.handles.split(',').forEach(function (item) {
            var node = document.createElement('DIV');
            node.className = "jsPanel-resizeit-handle jsPanel-resizeit-".concat(item.trim());
            node.style.zIndex = 90;
            elmt.appendChild(node);
        });
        var handles = elmt.getElementsByClassName('jsPanel-resizeit-handle');

        var _loop2 = function _loop2(i) {
            jsPanel.evtStart.forEach(function (item) {
                handles[i].addEventListener(item, function (e) {
                    e.preventDefault(); // disable dragging for all mouse buttons but left

                    if (e.button && e.button > 0) {
                        return false;
                    }

                    frames = Array.prototype.slice.call(document.querySelectorAll('iframe'));

                    if (frames.length) {
                        frames.forEach(function (item) {
                            item.style.pointerEvents = 'none';
                        });
                    }

                    var elmtRect = elmt.getBoundingClientRect(),
                        // needs to be calculated on pointerdown!!
                        elmtParentRect = elmtParent.getBoundingClientRect(),
                        // needs to be calculated on pointerdown!!
                        elmtParentStyles = window.getComputedStyle(elmtParent, null),
                        elmtParentPosition = elmtParentStyles.getPropertyValue('position'),
                        elmtParentLeftBorder = parseInt(elmtParentStyles.getPropertyValue('border-left-width'), 10),
                        elmtParentTopBorder = parseInt(elmtParentStyles.getPropertyValue('border-top-width'), 10),
                        elmtParentBottomBorder = parseInt(elmtParentStyles.getPropertyValue('border-bottom-width'), 10),
                        startX = e.pageX || e.touches[0].pageX,
                        startY = e.pageY || e.touches[0].pageY,
                        scrollLeft = window.scrollX || window.pageXOffset,
                        // IE11 doesn't know scrollX
                        startWidth = elmtRect.width,
                        startHeight = elmtRect.height,
                        startLeft,
                        startTop,
                        resizeHandle = e.target,
                        maxWidthEast = 10000,
                        maxWidthWest = 10000,
                        maxHeightSouth = 10000,
                        maxHeightNorth = 10000;
                    elmtContent.style.pointerEvents = 'none';

                    if (elmtStylesPosition === 'fixed') {
                        startLeft = elmtRect.left - elmtLeftBorder - elmtRightBorder;
                        startTop = elmtRect.top - elmtTopBorder - elmtBottomBorder;
                    } else if (elmtParentTagName === 'body' || elmtParentPosition === 'static') {
                        startLeft = elmtRect.left - elmtLeftBorder - elmtRightBorder;
                        startTop = elmtRect.top - elmtTopBorder - elmtBottomBorder;
                    } else if (elmtParentTagName !== 'body') {
                        startLeft = elmtRect.left - elmtParentRect.left - elmtParentLeftBorder + elmtParent.scrollLeft - elmtLeftBorder - elmtRightBorder;
                        startTop = elmtRect.top - elmtParentRect.top - elmtParentTopBorder + elmtParent.scrollTop - elmtTopBorder - elmtBottomBorder;
                    } // calc min/max left/top values if containment is set - code from jsDraggable


                    if (elmtParentTagName === 'body' && containment) {
                        maxWidthEast = document.documentElement.clientWidth - elmtRect.left - elmtLeftBorder - elmtRightBorder;
                        maxHeightSouth = document.documentElement.clientHeight - elmtRect.top - elmtTopBorder - elmtBottomBorder;
                        maxWidthWest = elmtRect.width + elmtRect.left - elmtLeftBorder - elmtRightBorder;
                        maxHeightNorth = elmtRect.height + elmtRect.top - elmtTopBorder - elmtBottomBorder;
                    } else {
                        // if panel is NOT in body
                        if (containment === 'parent') {
                            if (elmtParentPosition === 'static') {
                                maxWidthEast = elmtParentRect.width - elmtRect.left - elmtLeftBorder - scrollLeft;
                                maxHeightSouth = elmtParentRect.height + elmtParentRect.top - elmtRect.top + elmtTopBorder - elmtParentTopBorder - elmtParentBottomBorder;
                                maxWidthWest = elmtRect.width + (elmtRect.left - elmtParentRect.left) - elmtParentLeftBorder;
                                maxHeightNorth = elmtRect.height + (elmtRect.top - elmtParentRect.top) - elmtParentTopBorder;
                            } else {
                                maxWidthEast = elmtParent.clientWidth - (elmtRect.left - elmtParentRect.left) + elmtLeftBorder;
                                maxHeightSouth = elmtParent.clientHeight - (elmtRect.top - elmtParentRect.top) + elmtTopBorder;
                                maxWidthWest = elmtRect.width + (elmtRect.left - elmtParentRect.left) - elmtParentLeftBorder - elmtLeftBorder - elmtRightBorder;
                                maxHeightNorth = elmt.clientHeight + (elmtRect.top - elmtParentRect.top) - elmtTopBorder - elmtTopBorder - elmtBottomBorder;
                            }
                        } else if (containment === 'window') {
                            maxWidthEast = document.documentElement.clientWidth - elmtRect.left - elmtLeftBorder - elmtRightBorder;
                            maxHeightSouth = document.documentElement.clientHeight - elmtRect.top - elmtTopBorder - elmtBottomBorder;
                            maxWidthWest = elmtRect.left + elmtRect.width - elmtLeftBorder - elmtRightBorder;
                            maxHeightNorth = elmtRect.top + elmtRect.height - elmtTopBorder - elmtBottomBorder;
                        }
                    } // if original opts.containment is array


                    if (containmentArray) {
                        maxWidthWest -= containmentArray[3];
                        maxHeightNorth -= containmentArray[0];
                        maxWidthEast -= containmentArray[1];
                        maxHeightSouth -= containmentArray[2];
                    } // calculate corrections for rotated panels


                    var computedStyle = window.getComputedStyle(elmt),
                        wDif = parseFloat(computedStyle.width) - elmtRect.width,
                        hDif = parseFloat(computedStyle.height) - elmtRect.height,
                        xDif = parseFloat(computedStyle.left) - elmtRect.left,
                        yDif = parseFloat(computedStyle.top) - elmtRect.top;

                    if (elmtParent !== document.body) {
                        xDif += elmtParentRect.left;
                        yDif += elmtParentRect.top;
                    }

                    resizePanel = function resizePanel(evt) {
                        evt.preventDefault(); // trigger resizestarted only once per resize

                        if (!resizestarted) {
                            document.dispatchEvent(resizestart);

                            if (typeof opts.start === 'function') {
                                opts.start.call(el, el, {
                                    width: startWidth,
                                    height: startHeight
                                });
                            }
                        }

                        resizestarted = 1; // trigger resize permanently while resizing

                        document.dispatchEvent(resize);

                        if (resizeHandle.classList.contains('jsPanel-resizeit-e')) {
                            var w = startWidth + (evt.pageX || evt.touches[0].pageX) - startX + wDif;

                            if (w >= maxWidthEast) {
                                w = maxWidthEast;
                            }

                            if (w >= maxWidth) {
                                w = maxWidth;
                            } else if (w <= minWidth) {
                                w = minWidth;
                            }

                            elmt.style.width = w + 'px';
                        } else if (resizeHandle.classList.contains('jsPanel-resizeit-se')) {
                            var _w = startWidth + (evt.pageX || evt.touches[0].pageX) - startX + wDif,
                                h = startHeight + (evt.pageY || evt.touches[0].pageY) - startY + hDif;

                            if (_w >= maxWidthEast) {
                                _w = maxWidthEast;
                            }

                            if (h >= maxHeightSouth) {
                                h = maxHeightSouth;
                            }

                            if (_w >= maxWidth) {
                                _w = maxWidth;
                            } else if (_w <= minWidth) {
                                _w = minWidth;
                            }

                            if (h >= maxHeight) {
                                h = maxHeight;
                            } else if (h <= minHeight) {
                                h = minHeight;
                            }

                            elmt.style.width = _w + 'px';
                            elmt.style.height = h + 'px';
                        } else if (resizeHandle.classList.contains('jsPanel-resizeit-s')) {
                            var _h = startHeight + (evt.pageY || evt.touches[0].pageY) - startY + hDif;

                            if (_h >= maxHeightSouth) {
                                _h = maxHeightSouth;
                            }

                            if (_h >= maxHeight) {
                                _h = maxHeight;
                            } else if (_h <= minHeight) {
                                _h = minHeight;
                            }

                            elmt.style.height = _h + 'px';
                        } else if (resizeHandle.classList.contains('jsPanel-resizeit-w')) {
                            var _w2 = startWidth + startX - (evt.pageX || evt.touches[0].pageX) + wDif;

                            if (_w2 <= maxWidth && _w2 >= minWidth && _w2 <= maxWidthWest) {
                                elmt.style.left = startLeft + elmtParentLeftBorder + (evt.pageX || evt.touches[0].pageX) - startX + xDif + 'px';
                            }

                            if (_w2 >= maxWidthWest) {
                                _w2 = maxWidthWest;
                            }

                            if (_w2 >= maxWidth) {
                                _w2 = maxWidth;
                            } else if (_w2 <= minWidth) {
                                _w2 = minWidth;
                            }

                            elmt.style.width = _w2 + 'px';
                        } else if (resizeHandle.classList.contains('jsPanel-resizeit-n')) {
                            var _h2 = startHeight + startY - (evt.pageY || evt.touches[0].pageY) + hDif;

                            if (_h2 <= maxHeight && _h2 >= minHeight && _h2 <= maxHeightNorth) {
                                elmt.style.top = startTop + elmtParentTopBorder + (evt.pageY || evt.touches[0].pageY) - startY + yDif + 'px';
                            }

                            if (_h2 >= maxHeightNorth) {
                                _h2 = maxHeightNorth;
                            }

                            if (_h2 >= maxHeight) {
                                _h2 = maxHeight;
                            } else if (_h2 <= minHeight) {
                                _h2 = minHeight;
                            }

                            elmt.style.height = _h2 + 'px';
                        } else if (resizeHandle.classList.contains('jsPanel-resizeit-sw')) {
                            var _h3 = startHeight + (evt.pageY || evt.touches[0].pageY) - startY + hDif;

                            if (_h3 >= maxHeightSouth) {
                                _h3 = maxHeightSouth;
                            }

                            if (_h3 >= maxHeight) {
                                _h3 = maxHeight;
                            } else if (_h3 <= minHeight) {
                                _h3 = minHeight;
                            }

                            elmt.style.height = _h3 + 'px';

                            var _w3 = startWidth + startX - (evt.pageX || evt.touches[0].pageX) + wDif;

                            if (_w3 <= maxWidth && _w3 >= minWidth && _w3 <= maxWidthWest) {
                                elmt.style.left = startLeft + elmtParentLeftBorder + (evt.pageX || evt.touches[0].pageX) - startX + xDif + 'px';
                            }

                            if (_w3 >= maxWidthWest) {
                                _w3 = maxWidthWest;
                            }

                            if (_w3 >= maxWidth) {
                                _w3 = maxWidth;
                            } else if (_w3 <= minWidth) {
                                _w3 = minWidth;
                            }

                            elmt.style.width = _w3 + 'px';
                        } else if (resizeHandle.classList.contains('jsPanel-resizeit-nw')) {
                            var _h4 = startHeight + startY - (evt.pageY || evt.touches[0].pageY) + hDif;

                            if (_h4 <= maxHeight && _h4 >= minHeight && _h4 <= maxHeightNorth) {
                                elmt.style.top = startTop + elmtParentTopBorder + (evt.pageY || evt.touches[0].pageY) - startY + yDif + 'px';
                            }

                            if (_h4 >= maxHeightNorth) {
                                _h4 = maxHeightNorth;
                            }

                            if (_h4 >= maxHeight) {
                                _h4 = maxHeight;
                            } else if (_h4 <= minHeight) {
                                _h4 = minHeight;
                            }

                            elmt.style.height = _h4 + 'px';

                            var _w4 = startWidth + startX - (evt.pageX || evt.touches[0].pageX) + wDif;

                            if (_w4 <= maxWidth && _w4 >= minWidth && _w4 <= maxWidthWest) {
                                elmt.style.left = startLeft + elmtParentLeftBorder + (evt.pageX || evt.touches[0].pageX) - startX + xDif + 'px';
                            }

                            if (_w4 >= maxWidthWest) {
                                _w4 = maxWidthWest;
                            }

                            if (_w4 >= maxWidth) {
                                _w4 = maxWidth;
                            } else if (_w4 <= minWidth) {
                                _w4 = minWidth;
                            }

                            elmt.style.width = _w4 + 'px';
                        } else if (resizeHandle.classList.contains('jsPanel-resizeit-ne')) {
                            var _h5 = startHeight + startY - (evt.pageY || evt.touches[0].pageY) + hDif;

                            if (_h5 <= maxHeight && _h5 >= minHeight && _h5 <= maxHeightNorth) {
                                elmt.style.top = startTop + elmtParentTopBorder + (evt.pageY || evt.touches[0].pageY) - startY + yDif + 'px';
                            }

                            if (_h5 >= maxHeightNorth) {
                                _h5 = maxHeightNorth;
                            }

                            if (_h5 >= maxHeight) {
                                _h5 = maxHeight;
                            } else if (_h5 <= minHeight) {
                                _h5 = minHeight;
                            }

                            elmt.style.height = _h5 + 'px';

                            var _w5 = startWidth + (evt.pageX || evt.touches[0].pageX) - startX + wDif;

                            if (_w5 >= maxWidthEast) {
                                _w5 = maxWidthEast;
                            }

                            if (_w5 >= maxWidth) {
                                _w5 = maxWidth;
                            } else if (_w5 <= minWidth) {
                                _w5 = minWidth;
                            }

                            elmt.style.width = _w5 + 'px';
                        }

                        jsPanel.contentResize(element);
                        window.getSelection().removeAllRanges();

                        if (typeof opts.resize === 'function') {
                            opts.resize.call(el, el, {
                                width: parseFloat(el.css('width')),
                                height: parseFloat(el.css('height'))
                            });
                        }
                    };

                    jsPanel.evtMove.forEach(function (item) {
                        document.addEventListener(item, resizePanel, false);
                    }); // remove resize handler when mouse leaves browser window (mouseleave doesn't work)

                    window.addEventListener('mouseout', function (e) {
                        if (e.relatedTarget === null) {
                            jsPanel.evtMove.forEach(function (item) {
                                document.removeEventListener(item, resizePanel, false);
                            });
                        }
                    }, false);
                }, false);
            });
        };

        for (var i = 0; i < handles.length; i++) {
            _loop2(i);
        }

        jsPanel.evtEnd.forEach(function (item) {
            document.addEventListener(item, function (e) {
                if (e.target.classList && e.target.classList.contains('jsPanel-resizeit-handle')) {
                    var isLeftChange,
                        isTopChange,
                        cl = e.target.className;

                    if (cl.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i)) {
                        isLeftChange = true;
                    }

                    if (cl.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i)) {
                        isTopChange = true;
                    } // snap panel to grid (doesn't work that well if inside function resizePanel)


                    if (opts.grid && Array.isArray(opts.grid)) {
                        if (opts.grid.length === 1) {
                            opts.grid[1] = opts.grid[0];
                        }

                        var cw = parseFloat(elmt.style.width),
                            ch = parseFloat(elmt.style.height),
                            modW = cw % opts.grid[0],
                            modH = ch % opts.grid[1],
                            cx = parseFloat(elmt.style.left),
                            cy = parseFloat(elmt.style.top),
                            modX = cx % opts.grid[0],
                            modY = cy % opts.grid[1];

                        if (modW < opts.grid[0] / 2) {
                            elmt.style.width = cw - modW + 'px';
                        } else {
                            elmt.style.width = cw + (opts.grid[0] - modW) + 'px';
                        }

                        if (modH < opts.grid[1] / 2) {
                            elmt.style.height = ch - modH + 'px';
                        } else {
                            elmt.style.height = ch + (opts.grid[1] - modH) + 'px';
                        }

                        if (isLeftChange) {
                            if (modX < opts.grid[0] / 2) {
                                elmt.style.left = cx - modX + 'px';
                            } else {
                                elmt.style.left = cx + (opts.grid[0] - modX) + 'px';
                            }
                        }

                        if (isTopChange) {
                            if (modY < opts.grid[1] / 2) {
                                elmt.style.top = cy - modY + 'px';
                            } else {
                                elmt.style.top = cy + (opts.grid[1] - modY) + 'px';
                            }
                        }
                    }

                    jsPanel.contentResize(element);
                }

                jsPanel.evtMove.forEach(function (item) {
                    document.removeEventListener(item, resizePanel, false);
                });

                if (resizestarted) {
                    elmtContent.style.pointerEvents = 'inherit';
                    document.dispatchEvent(resizestop);
                    resizestarted = undefined; //  jsPanel specific code ---------------------------------------

                    if ((jQuery(elmt).data('status') === 'smallified' || jQuery(elmt).data('status') === 'smallifiedMax') && jQuery(elmt).height() > jQuery(elmt).header.height()) {
                        // ... and only when element height changed
                        jQuery(elmt).hideControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallifyrev']);
                        jQuery(elmt).data('status', 'normalized');
                        jQuery(document).trigger('jspanelnormalized');
                        jQuery(document).trigger('jspanelstatuschange');
                    }

                    jsPanel.calcPositionFactors(element); // jsPanel specific code end ------------------------------------

                    if (typeof opts.stop === 'function') {
                        opts.stop.call(el, el, {
                            width: parseFloat(el.css('width')),
                            height: parseFloat(el.css('height'))
                        });
                    }
                }

                if (frames.length) {
                    frames.forEach(function (item) {
                        item.style.pointerEvents = 'inherit';
                    });
                }
            }, false);
        });
        return el;
    },
    // export a panel layout to localStorage and returns array with an object for each panel
    exportPanels: function exportPanels() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.jsPanel';
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jspanels';
        // only panels that match the passed selector are exported
        var panelArr = [];
        var panels = jQuery('.jsPanel').not('.jsPanel-tooltip, .jsPanel-hint, .jsPanel-modal').filter(selector); // normalize minimized/maximized panels before export
        // status to restore is saved in exportedPanel.status

        panels.each(function (index, elmt) {
            if (jQuery(elmt).data('status') !== 'normalized') {
                jQuery('.jsPanel-btn-normalize', elmt).trigger('click');
            }
        });
        panels.each(function (index, elmt) {
            var elmtTop, elmtLeft, elmtWidth, elmtHeight, exportedPanel;
            var panelParent = jQuery(elmt).data('container'),
                elmtOffset = jQuery(elmt).offset(),
                elmtPosition = jQuery(elmt).position(),
                elmtStatus = jQuery(elmt).data('status');

            if (elmtStatus === 'minimized') {
                if (panelParent.toLowerCase() === 'body') {
                    elmtTop = jQuery(elmt).data('paneltop') - jQuery(window).scrollTop();
                    elmtLeft = jQuery(elmt).data('panelleft') - jQuery(window).scrollLeft();
                } else {
                    elmtTop = jQuery(elmt).data('paneltop');
                    elmtLeft = jQuery(elmt).data('panelleft');
                }

                elmtWidth = jQuery(elmt).data('panelwidth');
                elmtHeight = jQuery(elmt).data('panelheight');
            } else {
                if (panelParent.toLowerCase() === 'body') {
                    elmtTop = Math.floor(elmtOffset.top - jQuery(window).scrollTop());
                    elmtLeft = Math.floor(elmtOffset.left - jQuery(window).scrollLeft());
                } else {
                    elmtTop = Math.floor(elmtPosition.top);
                    elmtLeft = Math.floor(elmtPosition.left);
                }

                elmtWidth = jQuery(elmt).css('width');
                elmtHeight = jQuery('.jsPanel-content', elmt).css('height');
            }

            exportedPanel = {
                status: jQuery(elmt).data('status'),
                id: jQuery(elmt).prop('id'),
                headerTitle: jQuery('.jsPanel-title', elmt).html(),
                custom: jQuery(elmt).data('custom'),
                content: jQuery(elmt).data('content'),
                contentSize: {
                    width: elmtWidth,
                    height: elmtHeight
                },
                position: {
                    my: 'left-top',
                    at: 'left-top',
                    offsetX: elmtLeft,
                    offsetY: elmtTop
                }
            };

            if (jQuery(elmt).data('ajaxURL')) {
                exportedPanel.contentAjax = {
                    url: jQuery(elmt).data('ajaxURL'),
                    autoload: true
                };
            }

            if (jQuery(elmt).data('iframeDOC') || jQuery(elmt).data('iframeSRC')) {
                exportedPanel.contentIframe = {
                    src: jQuery(elmt).data('iframeSRC') || '',
                    srcdoc: jQuery(elmt).data('iframeDOC') || ''
                };
            }

            panelArr.push(exportedPanel); // restore status that is saved

            switch (exportedPanel.status) {
                case 'minimized':
                    jQuery('.jsPanel-btn-minimize', elmt).trigger('click');
                    break;

                case 'maximized':
                    jQuery('.jsPanel-btn-maximize', elmt).trigger('click');
                    break;

                case 'smallified':
                    jQuery('.jsPanel-btn-smallify', elmt).trigger('click');
                    break;

                case 'smallifiedMax':
                    jQuery('.jsPanel-btn-smallify', elmt).trigger('click');
                    break;
            }
        });
        window.localStorage.setItem(name, JSON.stringify(panelArr));
        return panelArr;
    },
    front: function front(panel, callback) {
        panel.css('z-index', this.setZi(panel));
        this.resetZis();
        jQuery(document).trigger('jspanelfronted', panel.prop('id'));

        if (jQuery.isFunction(panel.option.onfronted)) {
            // do not front panel if onfronted callback returns false
            if (panel.option.onfronted.call(panel, panel) === false) {
                return panel;
            } else {
                panel.option.onfronted.call(panel, panel);
            }
        } // call individual callback


        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    getThemeDetails: function getThemeDetails(passedtheme) {
        var theme = {
            color: false,
            colors: false,
            filling: false,
            bs: false,
            bstheme: false
        };

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

        theme.colors = this.calcColors(theme.color); // if first part of theme includes a "-" it's assumed to be a bootstrap theme

        if (theme.color.match('-')) {
            var bsVariant = theme.color.split('-');
            theme.bs = bsVariant[0];
            theme.bstheme = bsVariant[1];
            theme.mdbStyle = bsVariant[2] || undefined;
        }

        return theme;
    },
    // get panel with highest z-index (only standard and modal panels, no hints or tooltips)
    getTopmostPanel: function getTopmostPanel() {
        var array = [];
        jQuery('.jsPanel:not(.jsPanel-tooltip):not(.jsPanel-hint)').each(function (index, item) {
            array.push(item);
        });
        array.sort(function (a, b) {
            // sort array in reverse order
            return jQuery(b).css('z-index') - jQuery(a).css('z-index');
        });
        return array[0].getAttribute('id');
    },
    headerTitle: function headerTitle(panel, text) {
        if (text) {
            panel.header.title.empty().append(text);
            return panel;
        }

        return panel.header.title.html();
    },
    headerControl: function headerControl(panel, ctrl) {
        var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'enable';

        if (ctrl) {
            this.setControlStatus(panel, ctrl, action);
        } else {
            this.controls.forEach(function (value) {
                jsPanel.setControlStatus(panel, value);
            });
        }

        return panel;
    },
    // https://gist.github.com/mjackson/5311256
    hslToRgb: function hslToRgb(h, s, l) {
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
    iframe: function iframe(panel) {
        var iFrame = jQuery('<iframe></iframe>');
        var poi = panel.option.contentIframe; // iframe content

        if (poi.srcdoc) {
            iFrame.prop('srcdoc', poi.srcdoc);
            panel.data('iframeDOC', poi.srcdoc); // needed for exportPanels()
        }

        if (poi.src) {
            iFrame.prop('src', poi.src);
            panel.data('iframeSRC', poi.src); // needed for exportPanels()
        } //iframe size


        panel.option.contentSize.width !== 'auto' && !poi.width ? iFrame.css('width', '100%') : iFrame.prop('width', poi.width);
        panel.option.contentSize.height !== 'auto' && !poi.height ? iFrame.css('height', '100%') : iFrame.prop('height', poi.height); //iframe name

        if (poi.name) {
            iFrame.prop('name', poi.name);
        } //iframe sandbox


        if (poi.sandbox) {
            iFrame.prop('sandox', poi.sandbox);
        } //iframe id


        if (poi.id) {
            iFrame.prop('id', poi.id);
        } //iframe style


        if (jQuery.isPlainObject(poi.style)) {
            iFrame.css(poi.style);
        } //iframe css classes


        if (typeof poi.classname === 'string') {
            iFrame.addClass(poi.classname);
        } else if (jQuery.isFunction(poi.classname)) {
            iFrame.addClass(poi.classname());
        }

        panel.content.append(iFrame);
    },
    importPanels: function importPanels(predefinedConfigs) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jspanels';

        /* panelConfig needs to be an object with predefined configs.
     * A config named "default" will be applied to ALL panels
     *
     *       panelConfig = { default: { } [, config1 [, config2 [, configN ]]] };
     */
        var defaultConfig = predefinedConfigs['default'] || {};
        var restoredConfig;
        JSON.parse(localStorage[name]).forEach(function (savedconfig) {
            // savedconfig represents one item in savedPanels
            if (typeof savedconfig.custom.config === 'string') {
                restoredConfig = jQuery.extend(true, {}, defaultConfig, predefinedConfigs[savedconfig.custom.config], savedconfig);
            } else {
                restoredConfig = jQuery.extend(true, {}, defaultConfig, savedconfig);
            } // restore panel


            jQuery.jsPanel(restoredConfig);
        });
    },
    insertModalBackdrop: function insertModalBackdrop(panel) {
        // inserts an individual modal backdrop for a modal jsPanel
        var backdropCount = jQuery('.jsPanel-modal-backdrop').length,
            backdropClass = backdropCount === 0 ? 'jsPanel-modal-backdrop' : 'jsPanel-modal-backdrop jsPanel-modal-backdrop-multi',
            backdrop = "<div id=\"jsPanel-modal-backdrop-".concat(panel.attr('id'), "\" class=\"").concat(backdropClass, "\" style=\"z-index:").concat(this.modalcount + 9999, "\"></div>");
        jQuery('body').append(backdrop);
        this.modalcount += 1;
    },
    removeModalBackdrop: function removeModalBackdrop(panel) {
        var backdrop = jQuery("#jsPanel-modal-backdrop-".concat(panel.attr('id')));
        backdrop[0].classList.add('jsPanel-modal-backdrop-out');
        var delay = parseFloat(backdrop.css('animation-duration'), 10) * 1000;
        window.setTimeout(function () {
            backdrop.remove();
        }, delay);
        this.modalcount -= 1;
    },
    lighten: function lighten(val, amount) {
        // amount is value between 0 and 1
        var hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = l + (100 - l) * amount + '%';
        return "hsl(".concat(hsl.h, ",").concat(hsl.s, ",").concat(lnew, ")");
    },
    maximize: function maximize(panel, callback) {
        var zi = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var margins = panel.option.maximizedMargin,
            pnt = panel[0].parentNode,
            id = panel.attr('id');

        if (jQuery.isPlainObject(margins)) {
            var top = typeof margins.top === 'number' ? margins.top : 5;
            var right = typeof margins.right === 'number' ? margins.right : 5;
            var bottom = typeof margins.bottom === 'number' ? margins.bottom : 5;
            var left = typeof margins.left === 'number' ? margins.left : 5;
            margins = [top, right, bottom, left];
        }

        if (typeof margins === 'number') {
            // containment: 20 => containment: [20, 20, 20, 20]
            margins = [].concat(margins, margins, margins, margins);
        } else if (jQuery.isArray(margins) && margins.length === 2) {
            // containment: [20, 40] => containment: [20, 40, 20, 40]
            margins = margins.concat(margins);
        } else if (jQuery.isArray(margins) && margins.length === 3) {
            // containment: [20, 40, 50] => containment: [20, 40, 50, 40]
            margins[3] = margins[1];
        } // cache panel data like size and position etc. for later use


        if (panel.data('status') === 'normalized') {
            panel.updateCachedData();
        }

        jQuery(document).trigger('jspanelbeforemaximize', id); // do not maximize panel if onbeforemaximize callback returns false

        if (jQuery.isFunction(panel.option.onbeforemaximize) && panel.option.onbeforemaximize.call(panel, panel) === false) {
            return panel;
        }

        panel.css('overflow', 'visible');

        if (pnt === document.body) {
            // maximize within window
            panel.css({
                width: document.documentElement.clientWidth - margins[3] - margins[1] + 'px',
                height: document.documentElement.clientHeight - margins[0] - margins[2] + 'px',
                left: margins[3] + 'px',
                top: margins[0] + 'px'
            });

            if (panel.option.position.fixed === false) {
                panel.css({
                    left: window.pageXOffset + margins[3] + 'px',
                    top: window.pageYOffset + margins[0] + 'px'
                });
            }
        } else {
            // maximize within parentNode
            panel.css({
                width: pnt.clientWidth - margins[3] - margins[1] + 'px',
                height: pnt.clientHeight - margins[0] - margins[2] + 'px',
                left: margins[3] + 'px',
                top: margins[0] + 'px'
            });
        } // update current panel data like size and position etc. for later use


        panel.contentResize().data('status', 'maximized'); // zi is set to false in option.responsiveTo.windowresize to prevent maximized panel from being fronted on window.resize

        if (zi) {
            panel.css('z-index', this.setZi(panel));
        }

        panel.hideControls(['.jsPanel-btn-maximize', '.jsPanel-btn-smallifyrev']); // remove replacement if present

        this.remMinReplacement(panel);
        jQuery(document).trigger('jspanelmaximized', id);
        jQuery(document).trigger('jspanelstatuschange', id); // call onmximized callback

        if (jQuery.isFunction(panel.option.onmaximized)) {
            panel.option.onmaximized.call(panel, panel);
        } // call individual callback


        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    minimize: function minimize(panel, callback) {
        var id = panel.attr('id');

        if (panel.data('status') === 'minimized') {
            return panel;
        }

        jQuery(document).trigger('jspanelbeforeminimize', id); // do not minimize panel if onbeforeminimize callback returns false

        if (jQuery.isFunction(panel.option.onbeforeminimize) && panel.option.onbeforeminimize.call(panel, panel) === false) {
            return panel;
        } // cache panel data like size and position etc. for later use


        var status = panel.data('status');

        if (status === 'normalized') {
            panel.updateCachedData();
        } else if (status === 'smallified') {
            panel.cachedData.top = panel.css('top');
            panel.cachedData.left = panel.css('left');
        } // create and configure minimized replacement


        var replacement = this.createMinimizedReplacement(panel); // append replacement
        // cont has a positive length if option.container is .jsPanel-content or descendant of .jsPanel-content
        // so childpanels are minimized to their parent panel

        var cont = jQuery(panel.option.container).closest('.jsPanel-content');

        if (!cont.length) {
            // if panel to minimize is not a childpanel
            var replacementContainer = '#jsPanel-replacement-container';

            if (panel.option.minimizeTo) {
                if (typeof panel.option.minimizeTo === 'string') {
                    replacementContainer = panel.option.minimizeTo;
                }

                jQuery(replacementContainer).append(replacement);
            }
        } else {
            // wenn zu minimierendes panel childpanel ist
            var _replacementContainer = '.jsPanel-minimized-box';

            if (panel.option.minimizeTo) {
                if (typeof panel.option.minimizeTo === 'string') {
                    _replacementContainer = panel.option.minimizeTo;
                    jQuery(_replacementContainer).append(replacement);
                } else {
                    jQuery(_replacementContainer, cont.parent()).append(replacement);
                }
            }
        }

        jQuery(document).trigger('jspanelminimized', id);
        jQuery(document).trigger('jspanelstatuschange', id); // call onminimized callback

        if (jQuery.isFunction(panel.option.onminimized)) {
            panel.option.onminimized.call(panel, panel);
        } // call individual callback


        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        } // set handlers for replacement controls and disable replacement control if needed


        jQuery('.jsPanel-btn-normalize', replacement).css('display', 'block').on('click', function () {
            return panel.normalize();
        });

        if (panel[0].dataset.btnnormalize === 'disabled') {
            jQuery('.jsPanel-btn-normalize', replacement).css({
                pointerEvents: 'none',
                opacity: 0.5,
                cursor: 'default'
            });
        } else if (panel[0].dataset.btnnormalize === 'removed') {
            jQuery('.jsPanel-btn-normalize', replacement).remove();
        }

        jQuery('.jsPanel-btn-maximize', replacement).on('click', function () {
            return panel.maximize();
        });

        if (panel[0].dataset.btnmaximize === 'disabled') {
            jQuery('.jsPanel-btn-maximize', replacement).css({
                pointerEvents: 'none',
                opacity: 0.5,
                cursor: 'default'
            });
        } else if (panel[0].dataset.btnmaximize === 'removed') {
            jQuery('.jsPanel-btn-maximize', replacement).remove();
        }

        jQuery('.jsPanel-btn-close', replacement).on('click', function () {
            return panel.close();
        });

        if (panel[0].dataset.btnclose === 'disabled') {
            jQuery('.jsPanel-btn-close', replacement).css({
                pointerEvents: 'none',
                opacity: 0.5,
                cursor: 'default'
            });
        }

        return panel;
    },
    normalize: function normalize(panel, callback) {
        var id = panel.attr('id');

        if (panel.data('status') === 'normalized') {
            return panel;
        }

        jQuery(document).trigger('jspanelbeforenormalize', id); // do not normalize panel if onbeforenormalize callback returns false

        if (jQuery.isFunction(panel.option.onbeforenormalize) && panel.option.onbeforenormalize.call(panel, panel) === false) {
            return panel;
        } // if panel is only smallified just unsmallify it


        if (panel.data('status') === 'smallified') {
            panel.smallify();
            jQuery(document).trigger('jspanelnormalized', id);
            jQuery(document).trigger('jspanelstatuschange', id); // call onnormalized callback

            if (jQuery.isFunction(panel.option.onnormalized)) {
                panel.option.onnormalized.call(panel, panel);
            }

            return panel;
        }

        panel.css({
            left: panel.cachedData.left,
            top: panel.cachedData.top,
            width: panel.cachedData.width,
            height: panel.cachedData.height,
            zIndex: function zIndex() {
                jsPanel.setZi(panel);
            },
            overflow: 'visible'
        }).data('status', 'normalized').contentResize();
        panel.hideControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallifyrev']); // remove replacement

        this.remMinReplacement(panel);
        jQuery(document).trigger('jspanelnormalized', id);
        jQuery(document).trigger('jspanelstatuschange', id); // call onnormalized callback

        if (jQuery.isFunction(panel.option.onnormalized)) {
            panel.option.onnormalized.call(panel, panel);
        } // call individual callback


        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    noscroll: function noscroll(e) {
        e.preventDefault();
    },
    perceivedBrightness: function perceivedBrightness(val) {
        var rgb = this.color(val).rgb; // return value is in the range 0 - 1 and input rgb values must also be in the range 0 - 1
        // algorithm from: https://en.wikipedia.org/wiki/Rec._2020

        return rgb.r / 255 * 0.2627 + rgb.g / 255 * 0.6780 + rgb.b / 255 * 0.0593;
    },
    position: function position(elmt, options) {
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
        var elmtToPosition,
            elmtData,
            option,
            parentElmt,
            leftOffset = 0,
            topOffset = 0,
            newCoords,
            newCoordsLeft,
            newCoordsTop,
            optionDefaults = {
                my: 'center',
                at: 'center',
                offsetX: 0,
                offsetY: 0,
                modify: false,
                fixed: 'true'
            };
        var leftArray = ['left-top', 'left-center', 'left-bottom'],
            centerVerticalArray = ['center-top', 'center', 'center-bottom'],
            rightArray = ['right-top', 'right-center', 'right-bottom'],
            topArray = ['left-top', 'center-top', 'right-top'],
            centerHorizontalArray = ['left-center', 'center', 'right-center'],
            bottomArray = ['left-bottom', 'center-bottom', 'right-bottom']; // returns coordinates for a number of standard window positions relative to window

        function getWindowCoords(pos) {
            var coords = {};

            if (leftArray.indexOf(pos) > -1) {
                coords.left = window.pageXOffset;
            } else if (centerVerticalArray.indexOf(pos) > -1) {
                coords.left = window.pageXOffset + document.documentElement.clientWidth / 2;
            } else if (rightArray.indexOf(pos) > -1) {
                coords.left = window.pageXOffset + document.documentElement.clientWidth;
            } else {
                coords.left = window.pageXOffset;
            }

            if (topArray.indexOf(pos) > -1) {
                coords.top = window.pageYOffset;
            } else if (centerHorizontalArray.indexOf(pos) > -1) {
                coords.top = window.pageYOffset + window.innerHeight / 2;
            } else if (bottomArray.indexOf(pos) > -1) {
                coords.top = window.pageYOffset + window.innerHeight;
            } else {
                coords.top = window.pageYOffset;
            }

            return coords;
        } // returns coordinates for a number of standard element positions relative to document


        function getElmtAgainstCoords(pos) {
            var coords = {},
                elmtAgainstData = getElementData(option.of);

            if (leftArray.indexOf(pos) > -1) {
                coords.left = elmtAgainstData.left;
            } else if (centerVerticalArray.indexOf(pos) > -1) {
                coords.left = elmtAgainstData.left + elmtAgainstData.width / 2;
            } else if (rightArray.indexOf(pos) > -1) {
                coords.left = elmtAgainstData.left + elmtAgainstData.width;
            } else {
                coords.left = elmtAgainstData.left;
            }

            if (topArray.indexOf(pos) > -1) {
                coords.top = elmtAgainstData.top;
            } else if (centerHorizontalArray.indexOf(pos) > -1) {
                coords.top = elmtAgainstData.top + elmtAgainstData.height / 2;
            } else if (bottomArray.indexOf(pos) > -1) {
                coords.top = elmtAgainstData.top + elmtAgainstData.height;
            } else {
                coords.top = elmtAgainstData.top;
            }

            return coords;
        } // returns coordinates for a number of standard positions inside an element with left:0 top:0 as starting point


        function getParentCoords(pos) {
            var coords = {},
                parentElmtData = parentElmt.getBoundingClientRect();

            if (leftArray.indexOf(pos) > -1) {
                coords.left = 0;
            } else if (centerVerticalArray.indexOf(pos) > -1) {
                coords.left = parentElmtData.width / 2;
            } else if (rightArray.indexOf(pos) > -1) {
                coords.left = parentElmtData.width;
            } else {
                coords.left = 0;
            }

            if (topArray.indexOf(pos) > -1) {
                coords.top = 0;
            } else if (centerHorizontalArray.indexOf(pos) > -1) {
                coords.top = parentElmtData.height / 2;
            } else if (bottomArray.indexOf(pos) > -1) {
                coords.top = parentElmtData.height;
            } else {
                coords.top = 0;
            }

            return coords;
        } // returns coordinates for a number of standard positions inside an element with position of element relative to parent as starting point


        function getElementCoords(pos) {
            var coords = {};
            var parentData = parentElmt.getBoundingClientRect(),
                againstData = document.querySelector(option.of).getBoundingClientRect(),
                baseLeft = againstData.left - parentData.left,
                baseTop = againstData.top - parentData.top;

            if (leftArray.indexOf(pos) > -1) {
                coords.left = baseLeft;
            } else if (centerVerticalArray.indexOf(pos) > -1) {
                coords.left = baseLeft + againstData.width / 2;
            } else if (rightArray.indexOf(pos) > -1) {
                coords.left = baseLeft + againstData.width;
            } else {
                coords.left = baseLeft;
            }

            if (topArray.indexOf(pos) > -1) {
                coords.top = baseTop;
            } else if (centerHorizontalArray.indexOf(pos) > -1) {
                coords.top = baseTop + againstData.height / 2;
            } else if (bottomArray.indexOf(pos) > -1) {
                coords.top = baseTop + againstData.height;
            } else {
                coords.top = baseTop;
            }

            return coords;
        } // returns some data of argument elt


        function getElementData(elt) {
            // elt: string selector or element reference
            var elData;

            if (elt.jquery) {
                elData = elt[0].getBoundingClientRect();
            } else if (typeof elt === 'string') {
                elData = document.querySelector(elt).getBoundingClientRect();
            } else {
                elData = elt.getBoundingClientRect();
            }

            return {
                width: Math.round(elData.width),
                // width of elt (includes border)
                height: Math.round(elData.height),
                // height of elt (includes border)
                left: Math.round(elData.left + window.pageXOffset),
                // left value of elt option.of RELATIVE TO DOCUMENT
                top: Math.round(elData.top + window.pageYOffset) // top value of elt option.of RELATIVE TO DOCUMENT

            };
        }

        if (typeof options === 'string') {
            // convert options string to object accepted by jsPanel.position()
            //noinspection JSLint
            var rxpos = /\b[a-z]{4,6}-{1}[a-z]{3,6}\b/,
                rxautopos = /DOWN|UP|RIGHT|LEFT/,
                rxoffset = /[+-]?\d+\.?\d*%?/g,
                posValue = options.match(rxpos),
                autoposValue = options.match(rxautopos),
                offsetValue = options.match(rxoffset);
            var position;

            if (jQuery.isArray(posValue)) {
                position = {
                    my: posValue[0],
                    at: posValue[0]
                };
            } else {
                position = {
                    my: 'center',
                    at: 'center'
                };
            }

            if (jQuery.isArray(autoposValue)) {
                position.autoposition = autoposValue[0];
            }

            if (jQuery.isArray(offsetValue)) {
                position.offsetX = offsetValue[0];

                if (offsetValue.length === 2) {
                    position.offsetY = offsetValue[1];
                }
            }

            options = position;
        } else {
            // convert options with left, top, right, bottom values
            var posLeft = options.left === 0 || options.left;
            var posTop = options.top === 0 || options.top;
            var posRight = options.right === 0 || options.right;
            var posBottom = options.bottom === 0 || options.bottom;

            if (posLeft && posTop) {
                options.my = 'left-top';
                options.at = 'left-top';
                options.offsetX = options.left;
                options.offsetY = options.top;
            } else if (posLeft && posBottom) {
                options.my = 'left-bottom';
                options.at = 'left-bottom';
                options.offsetX = options.left;
                options.offsetY = -options.bottom;
            } else if (posRight && posTop) {
                options.my = 'right-top';
                options.at = 'right-top';
                options.offsetX = -options.right;
                options.offsetY = options.top;
            } else if (posRight && posBottom) {
                options.my = 'right-bottom';
                options.at = 'right-bottom';
                options.offsetX = -options.right;
                options.offsetY = -options.bottom;
            }
        } // merge option defaults with passed options


        option = Object.assign(optionDefaults, options);

        if (typeof elmt === 'string') {
            elmtToPosition = document.querySelector(elmt);
        } else if (elmt.jquery) {
            elmtToPosition = elmt[0];
        } else {
            elmtToPosition = elmt;
        } // do not position elmt when parameter options is set to boolean false


        if (typeof options === 'boolean' && options === false) {
            elmtToPosition.style.opacity = 1;
            return elmtToPosition;
        }

        parentElmt = elmtToPosition.parentElement || document.body; // set option.of defaults

        if (!option.of) {
            parentElmt === document.body ? option.of = 'window' : option.of = parentElmt;
        }

        elmtData = getElementData(elmtToPosition); // convert strings/%-values of option.offset to useful numbers

        if (typeof option.offsetX === 'string' && option.offsetX.slice(-1) === '%') {
            if (option.of === 'window') {
                option.offsetX = window.innerWidth * (parseInt(option.offsetX, 10) / 100);
            } else {
                option.offsetX = parentElmt.clientWidth * (parseInt(option.offsetX, 10) / 100);
            }
        } else if (typeof option.offsetX === 'string') {
            option.offsetX = parseFloat(option.offsetX);
        } else if (jQuery.isFunction(option.offsetX)) {
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
        } else if (jQuery.isFunction(option.offsetY)) {
            option.offsetY = parseInt(option.offsetY.call(elmt, elmt), 10);
        } // calculate horizontal correction of element to position


        if (leftArray.indexOf(option.my) > -1) {
            leftOffset = 0;
        } else if (centerVerticalArray.indexOf(option.my) > -1) {
            leftOffset = elmtData.width / 2;
        } else if (rightArray.indexOf(option.my) > -1) {
            leftOffset = elmtData.width;
        } // calculate vertical correction of element to position


        if (topArray.indexOf(option.my) > -1) {
            topOffset = 0;
        } else if (centerHorizontalArray.indexOf(option.my) > -1) {
            topOffset = elmtData.height / 2;
        } else if (bottomArray.indexOf(option.my) > -1) {
            topOffset = elmtData.height;
        } // calculate final position values of elmt ...


        if (parentElmt === document.body) {
            // ... appended to body element ...
            if (option.of === 'window') {
                // ... against window
                var windowCoords = getWindowCoords(option.at);

                if (option.fixed) {
                    newCoordsLeft = windowCoords.left - leftOffset + option.offsetX - window.pageXOffset;
                    newCoordsTop = windowCoords.top - topOffset + option.offsetY - window.pageYOffset;
                } else {
                    newCoordsLeft = windowCoords.left - leftOffset + option.offsetX;
                    newCoordsTop = windowCoords.top - topOffset + option.offsetY;
                }
            } else {
                // ... against other element than window
                var elmtAgainstCoords = getElmtAgainstCoords(option.at); // calculate position values for element to position relative to element other than window

                newCoordsLeft = elmtAgainstCoords.left - leftOffset + option.offsetX;
                newCoordsTop = elmtAgainstCoords.top - topOffset + option.offsetY;
            }
        } else {
            var targetCoords, optionOf;

            if (typeof option.of === 'string') {
                optionOf = document.querySelector(option.of);
            } else if (option.of.jquery) {
                optionOf = option.of[0];
            } else {
                optionOf = option.of;
            }

            if (parentElmt === optionOf) {
                // ... appended to other element than body AND positioning against parent!
                targetCoords = getParentCoords(option.at); // calculate position values for element with parent other than body

                newCoordsLeft = targetCoords.left - leftOffset + option.offsetX;
                newCoordsTop = targetCoords.top - topOffset + option.offsetY;
            } else {
                // ... appended to other element than body AND positioning against other element than parent!
                targetCoords = getElementCoords(option.at); // calculate position values for element

                newCoordsLeft = targetCoords.left - leftOffset + option.offsetX;
                newCoordsTop = targetCoords.top - topOffset + option.offsetY;
            }
        } // optionally autoposition elmts


        if (option.autoposition) {
            var newClass,
                allNewClass = []; // add a class to recognize panels for autoposition

            if (option.my === option.at) {
                newClass = option.my;
            }

            elmtToPosition.classList.add(newClass); // IE9 doesn't support classList
            // get all elmts with 'newClass' within parent of elmtToPosition

            allNewClass = Array.prototype.slice.call(parentElmt.getElementsByClassName(newClass));

            if (option.autoposition === 'DOWN') {
                // collect heights of all elmts to calc new top position
                allNewClass.forEach(function (item, index) {
                    if (index > 0) {
                        newCoordsTop += allNewClass[--index].getBoundingClientRect().height + jsPanel.autopositionSpacing;
                    }
                });
            } else if (option.autoposition === 'UP') {
                allNewClass.forEach(function (item, index) {
                    if (index > 0) {
                        newCoordsTop -= allNewClass[--index].getBoundingClientRect().height + jsPanel.autopositionSpacing;
                    }
                });
            } else if (option.autoposition === 'RIGHT') {
                // collect widths of all elmts to calc new left position
                allNewClass.forEach(function (item, index) {
                    if (index > 0) {
                        newCoordsLeft += allNewClass[--index].getBoundingClientRect().width + jsPanel.autopositionSpacing;
                    }
                });
            } else if (option.autoposition === 'LEFT') {
                allNewClass.forEach(function (item, index) {
                    if (index > 0) {
                        newCoordsLeft -= allNewClass[--index].getBoundingClientRect().width + jsPanel.autopositionSpacing;
                    }
                });
            }
        }

        newCoords = {
            left: newCoordsLeft,
            top: newCoordsTop
        }; // apply minLeft, minTop, maxLeft and maxTop values (need to be numbers)

        if ((option.minLeft || option.minLeft === 0) && typeof option.minLeft === 'number' && newCoords.left < option.minLeft) {
            newCoords.left = option.minLeft;
        }

        if ((option.maxLeft || option.maxLeft === 0) && typeof option.maxLeft === 'number' && newCoords.left > option.maxLeft) {
            newCoords.left = option.maxLeft;
        }

        if ((option.minTop || option.minTop === 0) && typeof option.minTop === 'number' && newCoords.top < option.minTop) {
            newCoords.top = option.minTop;
        }

        if ((option.maxTop || option.maxTop === 0) && typeof option.maxTop === 'number' && newCoords.top > option.maxTop) {
            newCoords.top = option.maxTop;
        }

        if (typeof option.modify === 'function') {
            newCoords = option.modify.call(newCoords, newCoords); // inside the function 'this' refers to the object 'newCoords'
            // option.modify is optional. If present has to be a function returning an object with the keys 'left' and 'top'
        } // finally position elmt ...


        elmtToPosition.style.position = 'absolute';
        elmtToPosition.style.left = "".concat(newCoords.left, "px"); // seems not to work with integers

        elmtToPosition.style.top = "".concat(newCoords.top, "px"); // ... and fix position if ...

        if (option.of === 'window' && option.fixed && parentElmt === document.body) {
            elmtToPosition.style.position = 'fixed';
        }

        return elmtToPosition;
    },
    remMinReplacement: function remMinReplacement(panel) {
        jQuery("[id^=\"".concat(panel.prop('id'), "-min\"]")).remove(); // see http://stackoverflow.com/questions/22755867/javascript-call-remove-twice-to-remove-element
    },
    reposition: function reposition(panel) {
        var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : panel.option.position;
        var callback = arguments.length > 2 ? arguments[2] : undefined;

        // reposition of tooltips is experimental (position.of has to be set when repositioning tooltips)
        if (panel.data('status') !== 'minimized') {
            // reset option.position
            panel.option.position = position; // if panel to reposition is tooltip

            if (panel.option.paneltype.tooltip) {
                // remove tooltip classes
                var classes = panel.attr('class').split(' ');
                jQuery.each(classes, function (i, c) {
                    if (c.indexOf('jsPanel-tooltip-') === 0) {
                        panel.removeClass(c);
                    }
                });
                this.setTooltipClass(panel); // remove/add tooltip connector

                jQuery('.jsPanel-connector', panel).remove();

                if (panel.option.paneltype.connector) {
                    this.addConnector(panel);
                }
            }

            this.position(panel, position);
        } // call individual callback


        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    // reset all z-index values for non-modal jsPanels
    resetZis: function resetZis() {
        var array = [];
        jQuery('.jsPanel:not(.jsPanel-modal):not(.jsPanel-hint)').each(function (index, item) {
            array.push(item);
        });
        array.sort(function (a, b) {
            return jQuery(a).css('z-index') - jQuery(b).css('z-index');
        }).forEach(function (item, index) {
            if ((jsPanel.zi += 1) > jQuery(item).css('z-index')) {
                jQuery(item).css('z-index', jsPanel.ziBase + index);
            }
        });
        this.zi = this.ziBase - 1 + array.length;
    },
    resize: function resize(panel, config) {
        if (panel.data('status') !== 'minimized') {
            // do not resize panel if onbeforeresize callback returns false
            if (jQuery.isFunction(panel.option.onbeforeresize) && panel.option.onbeforeresize.call(panel, panel) === false) {
                return panel;
            }

            if (jQuery.isPlainObject(config)) {
                var arg = jQuery.extend({}, false, jQuery.jsPanel.resizedefaults, config),
                    panelW,
                    panelH;

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
                } // checks for min and max values


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

                this.contentResize(panel); // callback to execute after a panel was resized

                if (jQuery.isFunction(panel.option.onresized)) {
                    if (panel.option.onresized.call(panel, panel) === false) {
                        return panel;
                    }
                } // call individual callback


                if (arg.callback && jQuery.isFunction(arg.callback)) {
                    arg.callback.call(panel, panel);
                }
            }
        }

        return panel;
    },
    // https://gist.github.com/mjackson/5311256
    rgbToHsl: function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h,
            s,
            l = (max + min) / 2;

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
        } //return [ h, s, l ];


        h = h * 360;
        s = s * 100 + '%';
        l = l * 100 + '%';
        return {
            css: 'hsl(' + h + ',' + s + ',' + l + ')',
            h: h,
            s: s,
            l: l
        };
    },
    rgbToHex: function rgbToHex(r, g, b) {
        var red = Number(r).toString(16),
            green = Number(g).toString(16),
            blue = Number(b).toString(16);

        if (red.length === 1) {
            red = "0".concat(red);
        }

        if (green.length === 1) {
            green = "0".concat(green);
        }

        if (blue.length === 1) {
            blue = "0".concat(blue);
        }

        return "#".concat(red).concat(green).concat(blue);
    },
    // enables/disables individual controls
    setControlStatus: function setControlStatus(panel, ctrl) {
        var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'enable';
        var controls = panel.header.headerbar,
            p = panel[0];

        if (action === 'disable') {
            if (p.getAttribute("data-btn".concat(ctrl)) !== 'removed') {
                p.setAttribute("data-btn".concat(ctrl), 'disabled');
                jQuery(".jsPanel-btn-".concat(ctrl), controls).css({
                    pointerEvents: 'none',
                    opacity: 0.4,
                    cursor: 'default'
                });
            }
        } else if (action === 'enable') {
            if (p.getAttribute("data-btn".concat(ctrl)) !== 'removed') {
                p.setAttribute("data-btn".concat(ctrl), 'enabled');
                jQuery(".jsPanel-btn-".concat(ctrl), controls).css({
                    pointerEvents: 'auto',
                    opacity: 1,
                    cursor: 'pointer'
                });
            }
        } else if (action === 'remove') {
            jQuery(".jsPanel-btn-".concat(ctrl), controls).remove();
            p.setAttribute("data-btn".concat(ctrl), 'removed');
        }
    },
    setTooltipClass: function setTooltipClass(panel) {
        var pos = panel.option.position.my + panel.option.position.at;

        if (pos === 'center-bottomcenter-top') {
            panel[0].classList.add('jsPanel-tooltip-top');
        } else if (pos === 'left-bottomright-top') {
            panel[0].classList.add('jsPanel-tooltip-righttopcorner');
        } else if (pos === 'left-centerright-center') {
            panel[0].classList.add('jsPanel-tooltip-right');
        } else if (pos === 'left-topright-bottom') {
            panel[0].classList.add('jsPanel-tooltip-rightbottomcorner');
        } else if (pos === 'center-topcenter-bottom') {
            panel[0].classList.add('jsPanel-tooltip-bottom');
        } else if (pos === 'right-topleft-bottom') {
            panel[0].classList.add('jsPanel-tooltip-leftbottomcorner');
        } else if (pos === 'right-centerleft-center') {
            panel[0].classList.add('jsPanel-tooltip-left');
        } else if (pos === 'right-bottomleft-top') {
            panel[0].classList.add('jsPanel-tooltip-lefttopcorner');
        } else if (pos === 'centercenter') {
            panel[0].classList.add('jsPanel-tooltip-center');
        } else if (pos === 'right-topleft-top') {
            panel[0].classList.add('jsPanel-tooltip-lefttop');
        } else if (pos === 'right-bottomleft-bottom') {
            panel[0].classList.add('jsPanel-tooltip-leftbottom');
        } else if (pos === 'left-bottomleft-top') {
            panel[0].classList.add('jsPanel-tooltip-topleft');
        } else if (pos === 'right-bottomright-top') {
            panel[0].classList.add('jsPanel-tooltip-topright');
        } else if (pos === 'left-topright-top') {
            panel[0].classList.add('jsPanel-tooltip-righttop');
        } else if (pos === 'left-bottomright-bottom') {
            panel[0].classList.add('jsPanel-tooltip-rightbottom');
        } else if (pos === 'left-topleft-bottom') {
            panel[0].classList.add('jsPanel-tooltip-bottomleft');
        } else if (pos === 'right-topright-bottom') {
            panel[0].classList.add('jsPanel-tooltip-bottomright');
        }
    },
    setTooltipMode: function setTooltipMode(panel, trigger) {
        if (panel.option.paneltype.mode === 'semisticky') {
            panel.hover(function () {
                return jQuery.noop();
            }, function () {
                panel.close();
                trigger.classList.remove('hasTooltip');
            });
        } else if (panel.option.paneltype.mode === 'sticky') {
            // tooltip remains in the DOM until closed manually
            jQuery.noop();
        } else {
            // tooltip will be removed whenever mouse leaves trigger
            jQuery(trigger).mouseout(function () {
                panel.close();
                trigger.classList.remove('hasTooltip');
            });
        }
    },
    // returns elmt reference to elmt triggering the tooltip
    setTrigger: function setTrigger(pos) {
        var opof = pos.of || 'window'; // option.position.of used as trigger of the tooltip

        if (typeof opof === 'string') {
            return document.querySelector(opof);
        } else if (opof.jquery) {
            return opof[0];
        } else {
            return opof;
        }
    },
    // returns a z-index value for a panel in order to have it on top
    setZi: function setZi(panel) {
        if (!panel[0].classList.contains('jsPanel-modal')) {
            if ((this.zi += 1) > panel.css('z-index')) {
                panel.css('z-index', this.zi);
            }
        }
    },
    smallify: function smallify(panel, callback) {
        var id = panel.attr('id');

        if (panel.data('status') === 'normalized' || panel.data('status') === 'maximized') {
            if (panel.data('status') !== 'smallified' && panel.data('status') !== 'smallifiedMax') {
                jQuery(document).trigger('jspanelbeforesmallify', id); // do not smallify panel if onbeforesmallify callback returns false

                if (jQuery.isFunction(panel.option.onbeforesmallify) && panel.option.onbeforesmallify.call(panel, panel) === false) {
                    return panel;
                } // store panel height in function property


                panel.smallify.height = panel.outerHeight();
                panel.css('overflow', 'hidden');
                panel.animate({
                    height: panel.header.headerbar.outerHeight() + 'px'
                }, {
                    done: function done() {
                        if (panel.data('status') === 'maximized') {
                            panel.hideControls(['.jsPanel-btn-maximize', '.jsPanel-btn-smallify']);
                            panel.data('status', 'smallifiedMax');
                            jQuery(document).trigger('jspanelsmallifiedmax', id);
                        } else {
                            panel.hideControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallify']);
                            panel.data('status', 'smallified');
                            jQuery(document).trigger('jspanelsmallified', id);
                        }

                        if (jQuery.isFunction(panel.option.onsmallified)) {
                            panel.option.onsmallified.call(panel, panel);
                        }

                        jQuery(document).trigger('jspanelstatuschange', id);
                    }
                });
            }
        } else if (panel.data('status') !== 'minimized') {
            jQuery(document).trigger('jspanelbeforeunsmallify', id);

            if (jQuery.isFunction(panel.option.onbeforeunsmallify)) {
                if (panel.option.onbeforeunsmallify.call(panel, panel) === false) {
                    return panel;
                }
            }

            panel.css('overflow', 'visible');
            panel.animate({
                height: panel.smallify.height
            }, {
                done: function done() {
                    if (panel.data('status') === 'smallified') {
                        panel.hideControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallifyrev']);
                        panel.data('status', 'normalized');
                        jQuery(document).trigger('jspanelnormalized', id);
                    } else {
                        panel.hideControls(['.jsPanel-btn-maximize', '.jsPanel-btn-smallifyrev']);
                        panel.data('status', 'maximized');
                        jQuery(document).trigger('jspanelmaximized', id);
                    }

                    panel.contentResize();
                    jQuery(document).trigger('jspanelunsmallified', id);
                    jQuery(document).trigger('jspanelstatuschange', id);

                    if (jQuery.isFunction(panel.option.onunsmallified)) {
                        panel.option.onunsmallified.call(panel, panel);
                    }
                }
            });
        }

        panel.css('z-index', this.setZi(panel)); // call individual callback

        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    toolbarAdd: function toolbarAdd(panel, place, items, callback) {
        if (place === 'header') {
            panel.header.toolbar[0].classList.add('active');

            if (jQuery.isArray(items)) {
                this.configToolbar(items, panel.header.toolbar, panel);
            } else if (jQuery.isFunction(items)) {
                panel.header.toolbar.append(items(panel.header));
            } else {
                panel.header.toolbar.append(items);
            }
        } else if (place === 'footer') {
            panel.content[0].classList.remove('jsPanel-content-nofooter');
            panel.footer[0].classList.add('active');

            if (panel.option.theme === 'none') {
                panel.footer.css({
                    background: 'transparent',
                    borderTop: 'none'
                });
            }

            if (jQuery.isArray(items)) {
                this.configToolbar(items, panel.footer, panel);
            } else if (jQuery.isFunction(items)) {
                panel.footer.append(items(panel.footer));
            } else {
                panel.footer.append(items);
            }
        }

        this.contentResize(panel); // call individual callback

        if (callback && jQuery.isFunction(callback)) {
            callback.call(panel, panel);
        }

        return panel;
    },
    contextmenu: function contextmenu(elmt, config, callback) {
        // elmt: element triggering the contextmenu on rightclick
        // config: panel configuration object
        var el;

        if (typeof elmt === 'string') {
            el = document.querySelector(elmt);
        } else if (elmt.jquery) {
            el = jQuery(elmt)[0];
        } else {
            el = elmt;
        }

        el.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            e.stopPropagation();
            jsPanel.closePanels('contextmenu');
            var l = e.clientX + (window.scrollX || window.pageXOffset),
                t = e.clientY + (window.scrollY || window.pageYOffset),
                conf = Object.assign({}, jQuery.jsPanel.defaults, jQuery.jsPanel.contextmenudefaults, config, {
                    container: 'body',
                    position: false
                });
            var cm = jQuery.jsPanel(conf).css({
                position: 'absolute',
                left: l,
                top: t
            }).addClass('jsPanel-contextmenu').on('mouseleave', function (e) {
                cm.close();
            }).on('click', function (e) {
                e.stopPropagation();
            }); // update contextmenu z-index if contextmenu is triggered from within a modal

            if (jQuery(e.target).closest('.jsPanel-modal')) {
                cm.css('z-index', jQuery(e.target).closest('.jsPanel-modal').css('z-index'));
            } // save event object as property of contextmenu outer div (needed in checkContextmenuOverflow())


            cm[0].cmEvent = e; // update left/top values if menu overflows browser viewport

            jsPanel.checkContextmenuOverflow(cm); // call individual callback

            if (callback && jQuery.isFunction(callback)) {
                callback.call(cm, cm);
            }
        }, false);
    },
    checkContextmenuOverflow: function checkContextmenuOverflow(panel) {
        var cltX = panel[0].cmEvent.clientX,
            cltY = panel[0].cmEvent.clientY,
            panelW = panel.outerWidth(),
            panelH = panel.outerHeight(),
            corrLeft = window.innerWidth - (cltX + panelW),
            corrTop = window.innerHeight - (cltY + panelH);

        if (corrLeft < 0) {
            panel.css('left', cltX + (window.scrollX || window.pageXOffset) - panelW);
        }

        if (corrTop < 0) {
            panel.css('top', cltY + (window.scrollY || window.pageYOffset) - panelH);
        }
    }
};

if ('ontouchend' in window) {
    jsPanel.evtStart = ['touchstart', 'mousedown'];
    jsPanel.evtMove = ['touchmove', 'mousemove'];
    jsPanel.evtEnd = ['touchend', 'mouseup'];
} else {
    jsPanel.evtStart = ['mousedown'];
    jsPanel.evtMove = ['mousemove'];
    jsPanel.evtEnd = ['mouseup'];
}

(function (jQuery) {
    jQuery.jsPanel = function (config) {
        var pid,
            panelconfig = config || {},
            optConfig = panelconfig.config || {},
            passedconfig = jQuery.extend(true, {}, optConfig, panelconfig),
            trigger,
            // elmt triggering the tooltip
            jsP = panelconfig.template ? jQuery(panelconfig.template) : optConfig.template ? jQuery(optConfig.template) : jQuery(jsPanel.template);
        delete passedconfig.config; // if maximizedMargin is array and array[4] is true -> synchronize maximizedMargin, dragit.containment and resizeit.containment with this array

        if (jQuery.isArray(passedconfig.maximizedMargin) && passedconfig.maximizedMargin[4] === true) {
            passedconfig.maximizedMargin.pop();
            var containmentDragit, containmentResizeit;

            if (passedconfig.dragit) {
                containmentDragit = passedconfig.dragit.containment || passedconfig.maximizedMargin;
                passedconfig.dragit = jQuery.extend({}, true, passedconfig.dragit, {
                    containment: containmentDragit
                });
            }

            if (passedconfig.resizeit) {
                containmentResizeit = passedconfig.resizeit.containment || passedconfig.maximizedMargin;
                passedconfig.resizeit = jQuery.extend({}, true, passedconfig.resizeit, {
                    containment: containmentResizeit
                });
            }
        } // if passedconfig.position is a function: execute function and reset passedconfig.position with the return value
        // this enables the use of a function to calculate the config passed to the positioning function


        if (passedconfig.position && jQuery.isFunction(passedconfig.position)) {
            passedconfig.position = passedconfig.position();
        } // enable paneltype: 'tooltip' for default tooltips


        if (passedconfig.paneltype === 'tooltip') {
            passedconfig.paneltype = {
                tooltip: true
            };
        } // Extend our default config with those provided. Note that the first arg to extend is an empty object - this is to keep from overriding our "defaults" object.


        if (!passedconfig.paneltype) {
            // if option.paneltype is not set in passed config simply merge passed config with defaults
            jsP.option = jQuery.extend(true, {}, jQuery.jsPanel.defaults, passedconfig);
        } else if (passedconfig.paneltype === 'modal') {
            // if panel to create is a modal first merge passed config with modal defaults and then with defaults
            jsP.option = jQuery.extend(true, {}, jQuery.jsPanel.defaults, jQuery.jsPanel.modaldefaults, passedconfig);
        } else if (passedconfig.paneltype.tooltip) {
            // if panel to create is a tooltip first merge passed config with tooltip defaults and then with defaults
            jsP.option = jQuery.extend(true, {}, jQuery.jsPanel.defaults, jQuery.jsPanel.tooltipdefaults, passedconfig);
        } else if (passedconfig.paneltype === 'hint') {
            // if panel to create is a hint first merge passed config with hint defaults and then with defaults
            jsP.option = jQuery.extend(true, {}, jQuery.jsPanel.defaults, jQuery.jsPanel.hintdefaults, passedconfig);
        } // create a variable for every option used within jQuery.jsPanel()


        var _jsP$option = jsP.option,
            o$autoclose = _jsP$option.autoclose,
            o$border = _jsP$option.border,
            o$callback = _jsP$option.callback,
            o$closeOnEsc = _jsP$option.closeOnEscape,
            o$container = _jsP$option.container,
            o$content = _jsP$option.content,
            o$contentAjax = _jsP$option.contentAjax,
            o$contentIframe = _jsP$option.contentIframe,
            o$contentOverflow = _jsP$option.contentOverflow,
            o$contentSize = _jsP$option.contentSize,
            o$custom = _jsP$option.custom,
            o$dblclicks = _jsP$option.dblclicks,
            o$draggable = _jsP$option.draggable,
            o$dragit = _jsP$option.dragit,
            o$footerToolbar = _jsP$option.footerToolbar,
            o$headerControls = _jsP$option.headerControls,
            o$headerLogo = _jsP$option.headerLogo,
            o$headerRemove = _jsP$option.headerRemove,
            o$headerTitle = _jsP$option.headerTitle,
            o$headerToolbar = _jsP$option.headerToolbar,
            o$id = _jsP$option.id,
            o$onwindowresize = _jsP$option.onwindowresize,
            o$panelSize = _jsP$option.panelSize,
            o$paneltype = _jsP$option.paneltype,
            o$position = _jsP$option.position,
            o$resizable = _jsP$option.resizable,
            o$resizeit = _jsP$option.resizeit,
            o$rtl = _jsP$option.rtl,
            o$setstatus = _jsP$option.setstatus,
            o$show = _jsP$option.show,
            o$theme = _jsP$option.theme; // check whether panel to create is tooltip

        if (o$paneltype.tooltip) {
            // the elmt triggering the tooltip
            trigger = jsPanel.setTrigger(o$position); // if panel to create is a tooltip and the trigger already has a tooltip exit jsPanel()

            if (trigger.classList.contains('hasTooltip')) {
                return false;
            }
        } // option.id ---------------------------------------------------------------------------------------------------


        if (typeof o$id === 'string') {
            pid = o$id;
        } else if (typeof o$id === 'function') {
            pid = o$id();
        } // check whether id already exists in document


        if (jQuery("#".concat(pid)).length > 0) {
            console.warn('jsPanel Error: No jsPanel created - id attribute passed with option.id already exists in document');
            jQuery("#".concat(pid))[0].jspanel.front();
            return false;
        } else {
            jsP[0].id = pid;
        }

        jsP.data('custom', o$custom);
        jsP.header = jQuery('.jsPanel-hdr', jsP);
        jsP.header.headerbar = jQuery('.jsPanel-headerbar', jsP.header);
        jsP.header.logo = jQuery('.jsPanel-headerlogo', jsP.header.headerbar);
        jsP.header.title = jQuery('.jsPanel-title', jsP.header.headerbar);
        jsP.header.controls = jQuery('.jsPanel-controlbar', jsP.header.headerbar);
        jsP.header.toolbar = jQuery('.jsPanel-hdr-toolbar', jsP.header);
        jsP.content = jQuery('.jsPanel-content', jsP);
        jsP.footer = jQuery('.jsPanel-ftr', jsP);
        jsP.data('status', 'initialized');
        jsP.cachedData = {};

        jsP.close = function () {
            for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                params[_key3] = arguments[_key3];
            }

            return jsPanel.close.apply(jsPanel, [jsP].concat(params));
        };

        jsP.closeChildpanels = function () {
            return jsPanel.closeChildpanels(jsP);
        };

        jsP.contentReload = function (callback) {
            return jsPanel.contentReload(jsP, callback);
        };

        jsP.contentResize = function (callback) {
            return jsPanel.contentResize(jsP, callback);
        };

        jsP.front = function (callback) {
            return jsPanel.front(jsP, callback);
        };

        jsP.headerControl = function (ctrl, action) {
            return jsPanel.headerControl(jsP, ctrl, action);
        };

        jsP.headerTitle = function (text) {
            return jsPanel.headerTitle(jsP, text);
        };

        jsP.hideControls = function (sel) {
            // NodeList.forEach() is not supported by all browsers yet -> convert to array
            Array.prototype.slice.call(jsP.header.controls[0].getElementsByClassName('jsPanel-btn')).forEach(function (item) {
                if (item) {
                    item.style.display = 'block';
                }
            });
            sel.forEach(function (item) {
                if (jsP.header.controls[0].querySelector(item)) {
                    jsP.header.controls[0].querySelector(item).style.display = 'none';
                }
            });
        };
        /* used only internally */


        jsP.maximize = function (callback) {
            return jsPanel.maximize(jsP, callback);
        };

        jsP.minimize = function (callback) {
            return jsPanel.minimize(jsP, callback);
        };

        jsP.normalize = function (callback) {
            return jsPanel.normalize(jsP, callback);
        };

        jsP.reposition = function (o$position, callback) {
            return jsPanel.reposition(jsP, o$position, callback);
        };

        jsP.resize = function () {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jQuery.jsPanel.resizedefaults.width;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jQuery.jsPanel.resizedefaults.height;
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : jQuery.jsPanel.resizedefaults.callback;
            var passedconfig = {},
                config = width;

            if (!jQuery.isPlainObject(config)) {
                passedconfig.width = width;
                passedconfig.height = height;
                passedconfig.callback = callback;
                config = jQuery.extend({}, false, jQuery.jsPanel.resizedefaults, passedconfig);
            } else {
                if (config.resize === 'content') {
                    // resize only content section
                    // if width/height values have any char that's not 0-9 or a literal dot it's converted to value + 'px'
                    if (!String(config.height).match(/[^0-9\.]/)) {
                        config.height += 'px';
                    }

                    if (!String(config.width).match(/[^0-9\.]/)) {
                        config.width += 'px';
                    }

                    config.height = "calc(".concat(config.height, " + ").concat(jsP.header.outerHeight() + 'px', " + ").concat(jsP.css('border-top-width'), " + ").concat(jsP.css('border-bottom-width'), ")");
                    config.width = "calc(".concat(config.width, " + ").concat(jsP.css('border-left-width'), " + ").concat(jsP.css('border-right-width'), ")");
                }
            }

            jsPanel.resize(jsP, config);
            return jsP;
        };

        jsP.setTheme = function () {
            var passedtheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : o$theme.toLowerCase().replace(/ /g, '');
            var callback = arguments.length > 1 ? arguments[1] : undefined;
            // remove all whitespace from passedtheme
            passedtheme = passedtheme.toLowerCase().replace(/ /g, ''); // first remove all theme related syles

            jsPanel.clearTheme(jsP);

            if (o$theme === 'none') {
                // results in an all white panel without any theme related classes/styles applied
                // removal of footer background/border is done in jsP.toolbarAdd()
                jsP.css('background-color', 'white');
                return jsP;
            }

            var themeDetails = jsPanel.getThemeDetails(passedtheme);

            if (!themeDetails.bs) {
                if (jsPanel.themes.indexOf(themeDetails.color) > -1) {
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
                jsP.css({
                    borderWidth: '',
                    borderStyle: '',
                    borderColor: ''
                });
            }

            if (callback && jQuery.isFunction(callback)) {
                callback.call(jsP, jsP);
            }

            return jsP;
        };

        jsP.smallify = function (callback) {
            return jsPanel.smallify(jsP, callback);
        };

        jsP.toolbarAdd = function (place, items, callback) {
            return jsPanel.toolbarAdd(jsP, place, items, callback);
        };

        jsP.updateCachedData = function () {
            jsP.cachedData.top = jsP.css('top');
            jsP.cachedData.left = jsP.css('left');
            jsP.cachedData.width = jsP.css('width');
            jsP.cachedData.height = jsP.css('height');
        };
        /* used only internally */


        jsP.dragit = function (string) {
            if (string === 'disable') {
                jQuery(o$dragit.handles, jsP).css('pointer-events', 'none');
            } else {
                jQuery(o$dragit.handles, jsP).css('pointer-events', 'auto');
            }

            return jsP;
        };

        jsP.resizeit = function (string) {
            if (string === 'disable') {
                jQuery('.jsPanel-resizeit-handle', jsP).css('pointer-events', 'none');
            } else {
                jQuery('.jsPanel-resizeit-handle', jsP).css('pointer-events', 'auto');
            }

            return jsP;
        }; // jsPanel close


        jQuery('.jsPanel-btn-close', jsP).on('click', function (e) {
            e.preventDefault(); // disable close for all mouse buttons but left

            if (e.button && e.button > 0) {
                return false;
            }

            jsPanel.close(jsP);
        }); // jsPanel minimize

        jQuery('.jsPanel-btn-minimize', jsP).on('click', function (e) {
            e.preventDefault();

            if (e.button && e.button > 0) {
                return false;
            }

            jsPanel.minimize(jsP);
        }); // jsPanel maximize

        jQuery('.jsPanel-btn-maximize', jsP).on('click', function (e) {
            e.preventDefault();

            if (e.button && e.button > 0) {
                return false;
            }

            jsPanel.maximize(jsP);
        }); // jsPanel normalize

        jQuery('.jsPanel-btn-normalize', jsP).on('click', function (e) {
            e.preventDefault();

            if (e.button && e.button > 0) {
                return false;
            }

            jsPanel.normalize(jsP);
        }); // jsPanel smallify

        jQuery('.jsPanel-btn-smallify, .jsPanel-btn-smallifyrev', jsP).on('click', function (e) {
            e.preventDefault();

            if (e.button && e.button > 0) {
                return false;
            }

            jsPanel.smallify(jsP);
        });
        /* option.container ----------------------------------------------------------------------------------------- */

        jsP.appendTo(jQuery(o$container)[0]); // append panel only to the first element of option.container !! important !!

        jsPanel.activePanels.list.push(pid);
        jQuery(document).trigger('jspanelloaded', pid);
        jsP.data('container', o$container);
        /* option.theme now includes bootstrap ---------------------------------------------------------------------- */

        jsP.setTheme();
        /* option.headerRemove,
     option.headerControls (controls in header right) ----------------------------------------------------------- */

        if (!o$headerRemove) {
            if (o$headerControls.controls === 'closeonly') {
                jsPanel.controls.forEach(function (ctrl) {
                    if (ctrl !== 'close') {
                        jsPanel.setControlStatus(jsP, ctrl, 'remove');
                    }
                });
            } else if (o$headerControls.controls === 'none') {
                jsPanel.controls.forEach(function (ctrl) {
                    jsPanel.setControlStatus(jsP, ctrl, 'remove');
                });
            } else {
                // disable controls individually
                jsPanel.controls.forEach(function (ctrl) {
                    if (o$headerControls[ctrl] === 'disable') {
                        // disable individual control btn and store btn status in data attr
                        jsPanel.setControlStatus(jsP, ctrl, 'disable');
                    } else if (o$headerControls[ctrl] === 'remove') {
                        jsPanel.setControlStatus(jsP, ctrl, 'remove');
                    } else {
                        jsP[0].setAttribute("data-btn".concat(ctrl), 'enabled');
                    }
                });
            }
            /* option.headerLogo ------------------------------------------------------------------------------------ */


            if (o$headerLogo) {
                var logo = o$headerLogo;

                if (typeof logo === 'string' && logo.substring(0, 1) !== '<') {
                    jsP.header.logo.append("<img src=\"".concat(logo, "\" alt=\"logo\">"));
                } else {
                    jsP.header.logo.append(logo);
                }
            }
        } else {
            jsP.header.remove();
            jsP.content[0].classList.add('jsPanel-content-noheader');
            jsPanel.controls.forEach(function (ctrl) {
                jsP[0].setAttribute("data-btn".concat(ctrl), 'removed');
            });
        }
        /* corrections for a removed header */


        if (o$headerRemove || jQuery('.jsPanel-hdr').length < 1) {
            jsP.content.css('border', 'none');
        }
        /* insert iconfonts if option.headerControls.iconfont set (default is "jsglyph") ---------------------------- */


        jsPanel.configIconfont(jsP);
        /* option.paneltype ----------------------------------------------------------------------------------------- */

        if (o$paneltype === 'modal') {
            jsPanel.insertModalBackdrop(jsP);
            jsP[0].classList.add('jsPanel-modal');
            jsP.css('z-index', jsPanel.modalcount + 9999);
        } else if (o$paneltype === 'hint') {
            jsP[0].classList.add('jsPanel-hint');
            jsP.css('z-index', 10000);
        } else if (o$paneltype.tooltip) {
            trigger = jsPanel.setTrigger(o$position); // elmt triggering the tooltip

            jsP[0].classList.add('jsPanel-tooltip');
            jsPanel.setTooltipClass(jsP);

            if (o$paneltype.solo) {
                jsPanel.closePanels('tooltip');
            }

            jsPanel.setTooltipMode(jsP, trigger); // update tooltip z-index if tooltip is triggered from within a modal

            if (jQuery(trigger).closest('.jsPanel-modal')) {
                jsP[0].style.zIndex = jQuery(trigger).closest('.jsPanel-modal').css('z-index');
            }
        }

        if (o$paneltype.tooltip) {
            trigger.classList.add('hasTooltip');
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
                    url: o$contentAjax,
                    autoload: true,
                    autoresize: true,
                    autoreposition: true
                };
            } else {
                jsP.option.contentAjax = Object.assign({
                    autoresize: true,
                    autoreposition: true
                }, o$contentAjax);
            }

            jsPanel.ajax(jsP);
        }
        /* option.contentIframe ------------------------------------------------------------------------------------- */


        if (jQuery.isPlainObject(o$contentIframe) && (o$contentIframe.src || o$contentIframe.srcdoc)) {
            jsPanel.iframe(jsP);
        }
        /* tooltips continued --------------------------------------------------------------------------------------- */

        /* jquery.css() doesn't work properly if jsPanel isn't in the DOM yet, so the code for the tooltip connectors
     is placed after the jsPanel is appended to the DOM !!! */


        if (o$paneltype.connector) {
            jsPanel.addConnector(jsP);
        }
        /* option.panelSize/contentSize - needs to be set before option.position and should be after option.content - */


        var sizes = o$panelSize || o$contentSize,
            finalSizes = sizes;

        if (typeof sizes === 'string') {
            sizes = sizes.trim().split(/\s{1,}/);

            for (var i = 0; i < sizes.length; i++) {
                if (sizes[i].match(/^\d{1,}$/)) {
                    sizes[i] = parseInt(sizes[i], 10);
                }
            }

            finalSizes = {
                width: sizes[0] || jQuery.jsPanel.defaults.contentSize.width,
                height: sizes[1] || jQuery.jsPanel.defaults.contentSize.height
            };
        }

        if (finalSizes.height === 0) {
            finalSizes.height = '0';
        }

        if (o$panelSize) {
            jsP.css({
                width: finalSizes.width,
                height: finalSizes.height
            });
            jsP.contentResize();
        } else {
            jsP.content.css({
                width: finalSizes.width,
                height: finalSizes.height
            });
        }

        jsP.css({
            // necessary if title text exceeds content width & correction for panel padding
            // or if content section is removed prior positioning
            //width: jsP.content.outerWidth() + 'px',
            width: function width() {
                if (jQuery('.jsPanel-content', jsP).length > 0) {
                    return jsP.content.outerWidth() + 'px';
                } else {
                    return o$contentSize.width || jQuery.jsPanel.defaults.contentSize.width;
                }
            },
            zIndex: function zIndex() {
                jsPanel.setZi(jsP);
            } // set z-index to get new panel to front;

        }); // after content width is set and jsP width is set accordingly set content width to 100%

        jsP.content.css('width', '100%');
        /* option.position ------------------------------------------------------------------------------------------ */

        if (o$position) {
            jsPanel.position(jsP, o$position);
            jsPanel.calcPositionFactors(jsP);
        }

        jsP.css('opacity', 1);
        jsP.data('status', 'normalized');
        jQuery(document).trigger('jspanelstatuschange', pid); // handlers for doubleclicks -----------------------------------------------------------------------------------
        // dblclicks disabled for normal modals, hints and tooltips

        if (!o$paneltype) {
            if (o$dblclicks) {
                if (o$dblclicks.title) {
                    jsP.header.headerbar.on('dblclick', function (e) {
                        e.preventDefault();
                        jsPanel.dblclickhelper(o$dblclicks.title, jsP);
                    });
                }

                if (o$dblclicks.content) {
                    jsP.content.on('dblclick', function (e) {
                        e.preventDefault();
                        jsPanel.dblclickhelper(o$dblclicks.content, jsP);
                    });
                }

                if (o$dblclicks.footer) {
                    jsP.footer.on('dblclick', function (e) {
                        e.preventDefault();
                        jsPanel.dblclickhelper(o$dblclicks.footer, jsP);
                    });
                }
            }
        }
        /* option.contentOverflow  | default: 'hidden' -------------------------------------------------------------- */


        if (typeof o$contentOverflow === 'string') {
            jsP.content.css('overflow', o$contentOverflow);
        } else if (jQuery.isPlainObject(o$contentOverflow)) {
            jsP.content.css({
                'overflow-y': o$contentOverflow.vertical || o$contentOverflow['overflow-y'],
                'overflow-x': o$contentOverflow.horizontal || o$contentOverflow['overflow-x']
            });
        }
        /* option.draggable ----------------------------------------------------------------------------------------- */


        if (jQuery.ui && jQuery.ui.draggable && !o$dragit.disableui) {
            if (jQuery.isPlainObject(o$draggable)) {
                jsP.draggable(o$draggable);
            } else if (o$draggable === 'disabled') {
                // reset cursor, draggable deactivated
                jQuery('.jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr', jsP).css('cursor', 'default'); // jquery ui draggable initialize disabled to allow to query status

                jsP.draggable({
                    disabled: true
                });
            } else {
                // draggable is not even initialised
                jQuery('.jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr', jsP).css('cursor', 'default');
            }
        } else {
            if (o$dragit) {
                jsPanel.dragit(jsP, o$dragit);

                if (o$dragit.disable) {
                    jsP.dragit('disable');
                }
            } else {
                jQuery('.jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr', jsP).css('cursor', 'default');
            }
        }
        /* option.resizable ----------------------------------------------------------------------------------------- */


        if (jQuery.ui && jQuery.ui.resizable && !o$resizeit.disableui) {
            if (jQuery.isPlainObject(o$resizable)) {
                jsP.resizable(o$resizable);
            } else if (o$resizable === 'disabled') {
                // jquery ui resizable initialize disabled to allow to query status
                jsP.resizable({
                    disabled: true
                });
                jQuery('.ui-icon-gripsmall-diagonal-se, .ui-resizable-handle.ui-resizable-sw', jsP).css({
                    'background-image': 'none',
                    'text-indent': -9999
                });
                jQuery('.ui-resizable-handle', jsP).css({
                    'cursor': 'inherit'
                });
            }
        } else {
            if (o$resizeit) {
                jsPanel.resizeit(jsP, o$resizeit);

                if (o$resizeit.disable) {
                    jsP.resizeit('disable');
                }
            }
        }
        /* option.rtl | default: false - needs to be after option.resizable ----------------------------------------- */


        if (o$rtl.rtl === true) {
            jQuery('.jsPanel-hdr, .jsPanel-headerbar, .jsPanel-titlebar, .jsPanel-controlbar, .jsPanel-hdr-toolbar, .jsPanel-ftr', jsP).addClass('jsPanel-rtl');
            [jsP.header.title, jsP.content, jQuery('*', jsP.header.toolbar), jQuery('*', jsP.footer)].forEach(function (item) {
                item.prop('dir', 'rtl');

                if (o$rtl.lang) {
                    item.prop('lang', o$rtl.lang);
                }
            });
            jQuery('.ui-icon-gripsmall-diagonal-se', jsP).css({
                backgroundImage: 'none',
                textIndent: -9999
            });
        }
        /* option.show ---------------------------------------------------------------------------------------------- */


        if (typeof o$show === 'string') {
            jsP.addClass(o$show).css('opacity', 1); //extra call to jQuery.css() needed for EDGE
        }
        /* option.headerTitle | needs to be late in the file! ------------------------------------------------------- */


        jsP.header.title.empty().prepend(o$headerTitle);
        jsP.updateCachedData();
        /* option.setstatus ----------------------------------------------------------------------------------------- */

        if (typeof o$setstatus === 'string') {
            o$setstatus === 'maximize smallify' ? jsP.maximize().smallify() : jsP[o$setstatus]();
        }
        /* option.autoclose | default: false ------------------------------------------------------------------------ */


        if (typeof o$autoclose === 'number' && o$autoclose > 0) {
            window.setTimeout(function () {
                if (jsP) {
                    jsP.close();
                }
            }, o$autoclose);
        }

        if (jQuery.ui && jQuery.ui.resizable) {
            jsP.on('resize', function () {
                return jsPanel.contentResize(jsP);
            });
            jsP.on('resizestop', function () {
                if (jsP.data('status') === 'smallified' || jsP.data('status') === 'smallifiedMax') {
                    // ... and only when panel height changed
                    jsP.hideControls(['.jsPanel-btn-normalize', '.jsPanel-btn-smallifyrev']);
                    jsP.data('status', 'normalized');
                    jQuery(document).trigger('jspanelnormalized', pid);
                    jQuery(document).trigger('jspanelstatuschange', pid);
                }

                jsPanel.calcPositionFactors(jsP);
            }); // handler to normalize a panel and reset controls only when resizing a smallified panel with mouse ...
        }

        if (jQuery.ui && jQuery.ui.draggable) {
            jsP.on('dragstop', function () {
                return jsPanel.calcPositionFactors(jsP);
            });
        }

        jsPanel.evtStart.forEach(function (item) {
            jsP.on(item, function (e) {
                if (e.target.classList.contains('jsglyph-close') || e.target.classList.contains('jsglyph-minimize')) {
                    return;
                }

                var zi = jQuery(e.target).closest('.jsPanel').css('z-index');

                if (!jsP[0].classList.contains('jsPanel-modal') && zi <= jsPanel.zi) {
                    jsP.front();
                }
            }); // handler to move panel to foreground
        });
        /* option.closeOnEscape ------------------------------------------------------------------------------------- */

        if (o$closeOnEsc) {
            jsP[0].setAttribute('data-closeonescape', 'true');
        }
        /* option.onwindowresize ------------------------------------------------------------------------------------ */


        if (o$onwindowresize) {
            jQuery(window).resize(function (event) {
                if (event.target === window) {
                    // see https://bugs.jqueryui.com/ticket/7514
                    var param = o$onwindowresize,
                        status = jsP.data('status');

                    if (status === 'maximized' && !jQuery.isFunction(param)) {
                        jsP.maximize(false, false);
                    } else if (status === 'normalized' || status === 'smallified' || status === 'maximized') {
                        if (jQuery.isFunction(param)) {
                            param.call(jsP, event, jsP);
                        } else {
                            jsP.reposition({
                                left: function left() {
                                    var l;

                                    if (this.option.container === 'body') {
                                        l = (jQuery(window).outerWidth() - this.outerWidth()) * this.hf;
                                    } else {
                                        l = (this.parent().outerWidth() - this.outerWidth()) * this.hf;
                                    }

                                    return l <= 0 ? 0 : l;
                                },
                                top: function top() {
                                    var t;

                                    if (this.option.container === 'body') {
                                        t = (jQuery(window).outerHeight() - this.outerHeight()) * this.vf;
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
            close: function close() {
                var cb = (arguments.length <= 0 ? undefined : arguments[0]) || false,
                    skipOnBefore = (arguments.length <= 1 ? undefined : arguments[1]) || false,
                    skipOnclose = (arguments.length <= 2 ? undefined : arguments[2]) || false;
                jsPanel.close(jsP, cb, skipOnBefore, skipOnclose);
            },
            normalize: function normalize(callback) {
                return jsPanel.normalize(jsP, callback);
            },
            maximize: function maximize(callback) {
                return jsPanel.maximize(jsP, callback);
            },
            minimize: function minimize(callback) {
                return jsPanel.minimize(jsP, callback);
            },
            smallify: function smallify(callback) {
                return jsPanel.smallify(jsP, callback);
            },
            front: function front(callback) {
                return jsPanel.front(jsP, callback);
            },
            closeChildpanels: function closeChildpanels() {
                return jsPanel.closeChildpanels(jsP);
            },
            reposition: function reposition(pos, callback) {
                return jsPanel.reposition(jsP, pos, callback);
            },
            resize: function resize(w, h, callback) {
                return jsP.resize(w, h, callback);
            },
            contentResize: function contentResize(callback) {
                return jsPanel.contentResize(jsP, callback);
            },
            contentReload: function contentReload(callback) {
                return jsPanel.contentReload(jsP, callback);
            },
            headerTitle: function headerTitle(text) {
                return jsPanel.headerTitle(jsP, text);
            },
            headerControl: function headerControl(ctrl, action) {
                return jsPanel.headerControl(jsP, ctrl, action);
            },
            toolbarAdd: function toolbarAdd(place, tb, callback) {
                return jsPanel.toolbarAdd(jsP, place, tb, callback);
            },
            setTheme: function setTheme(theme, callback) {
                return jsP.setTheme(theme, callback);
            },
            noop: function noop() {
                return jsP; // used in jsPanel.activePanels.getPanel()
            },
            dragit: function dragit(str) {
                return jsP.dragit(str);
            },
            resizeit: function resizeit(str) {
                return jsP.resizeit(str);
            }
        }; // sample:          document.getElementById('jsPanel-1').jspanel.close();
        // or:              document.querySelector('#jsPanel-1').jspanel.close();
        // or using jquery: jQuery('#jsPanel-1')[0].jspanel.close();

        /* option.callback ------------------------------------------------------------------------------------------ */

        if (o$callback && jQuery.isFunction(o$callback)) {
            o$callback.call(jsP, jsP);
        } else if (jQuery.isArray(o$callback)) {
            o$callback.forEach(function (item) {
                if (jQuery.isFunction(item)) {
                    item.call(jsP, jsP);
                }
            });
        }

        return jsP;
    };

    jQuery.jsPanel.defaults = {
        autoclose: false,
        border: false,
        callback: false,
        closeOnEscape: false,
        container: 'body',
        content: false,
        contentAjax: false,
        contentIframe: false,
        contentOverflow: 'hidden',
        contentSize: {
            width: 400,

            /* do not replace with "400 200" */
            height: 200
        },
        custom: false,
        dblclicks: false,
        delayClose: 0,
        draggable: {
            handle: 'div.jsPanel-headerlogo, div.jsPanel-titlebar, div.jsPanel-ftr',
            opacity: 0.8
        },
        dragit: {
            axis: false,
            containment: false,
            grid: false,
            handles: '.jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr.active',
            // do not set .jsPanel-titlebar to .jsPanel-hdr
            opacity: 0.8,
            start: false,
            drag: false,
            stop: false,
            disable: false,
            disableui: false
        },
        footerToolbar: false,
        headerControls: {
            close: false,
            maximize: false,
            minimize: false,
            normalize: false,
            smallify: false,
            controls: 'all',
            iconfont: 'jsglyph'
        },
        headerLogo: false,
        headerRemove: false,
        headerTitle: 'jsPanel',
        headerToolbar: false,
        id: function id() {
            return "jsPanel-".concat(jsPanel.id += 1);
        },
        maximizedMargin: [5, 5, 5, 5],
        minimizeTo: true,
        onbeforeclose: false,
        onbeforemaximize: false,
        onbeforeminimize: false,
        onbeforenormalize: false,
        onbeforesmallify: false,
        onbeforeunsmallify: false,
        onclosed: false,
        onmaximized: false,
        onminimized: false,
        onnormalized: false,
        onbeforeresize: false,
        onresized: false,
        onsmallified: false,
        onunsmallified: false,
        onfronted: false,
        onwindowresize: false,
        paneltype: false,
        position: 'center',
        // all other defaults are set in jsPanel.position()
        resizable: {
            handles: 'n, e, s, w, ne, se, sw, nw',
            autoHide: false,
            minWidth: 40,
            minHeight: 40
        },
        resizeit: {
            containment: false,
            grid: false,
            handles: 'n, e, s, w, ne, se, sw, nw',
            minWidth: 40,
            minHeight: 40,
            maxWidth: 10000,
            maxHeight: 10000,
            start: false,
            resize: false,
            stop: false,
            disable: false,
            disableui: false
        },
        rtl: false,
        setstatus: false,
        show: false,
        template: false,
        theme: 'default'
    };
    jQuery.jsPanel.modaldefaults = {
        draggable: false,
        dragit: false,
        headerControls: {
            controls: 'closeonly'
        },
        position: 'center',
        resizable: false,
        resizeit: false,
        onwindowresize: true
    };
    jQuery.jsPanel.tooltipdefaults = {
        draggable: false,
        dragit: false,
        headerControls: {
            controls: 'closeonly'
        },
        position: {
            fixed: false
        },
        resizable: false,
        resizeit: false
    };
    jQuery.jsPanel.hintdefaults = {
        autoclose: 8000,
        draggable: false,
        dragit: false,
        headerControls: {
            controls: 'closeonly'
        },
        resizable: false,
        resizeit: false
    };
    jQuery.jsPanel.contextmenudefaults = {
        draggable: false,
        resizable: false,
        dragit: false,
        resizeit: false,
        //position: false,    set in contextmenu()
        //container: 'body',  set in contextmenu()
        headerRemove: true,
        headerControls: {
            controls: 'none'
        }
    };
    jQuery.jsPanel.resizedefaults = {
        width: 'auto',
        height: 'auto',
        minwidth: false,
        maxwidth: false,
        minheight: false,
        maxheight: false,
        resize: false,
        callback: false
    };
    /* body click handler: remove all tooltips on click in body except click is inside jsPanel or trigger of tooltip */

    jQuery(document).ready(function () {
        document.body.addEventListener('click', function (e) {
            var isTT = jQuery(e.target).closest('.jsPanel').length;

            if (isTT < 1 && !e.target.classList.contains('hasTooltip')) {
                jsPanel.closePanels('tooltip');
                jQuery('.hasTooltip').removeClass('hasTooltip');
            }

            jsPanel.closePanels('contextmenu');
        }, false);
        jQuery('body').css('-ms-overflow-style', 'scrollbar').append('<div id="jsPanel-replacement-container">');
        window.addEventListener('keydown', function (e) {
            var key = e.key || e.code;

            if (key === 'Escape' || key === 'Esc') {
                jsPanel.activePanels.list.sort(function (a, b) {
                    return document.getElementById(b).style.zIndex - document.getElementById(a).style.zIndex; // sort array in reverse order, panel with highest z-index is first in array
                }).some(function (item) {
                    var panel = jQuery('#' + item),
                        parent = panel.parent().closest('.jsPanel');

                    if (jsPanel.closeOnEscape || panel[0].getAttribute('data-closeonescape')) {
                        if (parent.length && (jsPanel.closeOnEscape === 'closeparent' || panel[0].getAttribute('data-closeonescape')) || e.shiftKey) {
                            jsPanel.activePanels.getPanel(parent[0].id).close();
                            return true;
                        } else {
                            jsPanel.activePanels.getPanel(panel[0].id).close();
                            return true;
                        }
                    }
                });
            }
        }, false);
    });
})(jQuery);