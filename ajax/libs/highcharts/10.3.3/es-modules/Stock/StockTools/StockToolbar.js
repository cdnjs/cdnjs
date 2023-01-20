/* *
 *
 *  GUI generator for Stock tools
 *
 *  (c) 2009-2021 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, createElement = U.createElement, css = U.css, fireEvent = U.fireEvent, getStyle = U.getStyle, isArray = U.isArray, merge = U.merge, pick = U.pick;
/* *
 *
 *  Classes
 *
 * */
/**
 * Toolbar Class
 *
 * @private
 * @class
 *
 * @param {object} options
 *        Options of toolbar
 *
 * @param {Highcharts.Dictionary<string>|undefined} langOptions
 *        Language options
 *
 * @param {Highcharts.Chart} chart
 *        Reference to chart
 */
var Toolbar = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function Toolbar(options, langOptions, chart) {
        /* *
         *
         *  Properties
         *
         * */
        this.arrowDown = void 0;
        this.arrowUp = void 0;
        this.arrowWrapper = void 0;
        this.listWrapper = void 0;
        this.showhideBtn = void 0;
        this.submenu = void 0;
        this.toolbar = void 0;
        this.wrapper = void 0;
        this.chart = chart;
        this.options = options;
        this.lang = langOptions;
        // set url for icons.
        this.iconsURL = this.getIconsURL();
        this.guiEnabled = options.enabled;
        this.visible = pick(options.visible, true);
        this.placed = pick(options.placed, false);
        // General events collection which should be removed upon
        // destroy/update:
        this.eventsToUnbind = [];
        if (this.guiEnabled) {
            this.createHTML();
            this.init();
            this.showHideNavigatorion();
        }
        fireEvent(this, 'afterInit');
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initialize the toolbar. Create buttons and submenu for each option
     * defined in `stockTools.gui`.
     * @private
     */
    Toolbar.prototype.init = function () {
        var _this = this;
        var lang = this.lang, guiOptions = this.options, toolbar = this.toolbar, buttons = guiOptions.buttons, defs = guiOptions.definitions, allButtons = toolbar.childNodes;
        // create buttons
        buttons.forEach(function (btnName) {
            var button = _this.addButton(toolbar, defs, btnName, lang);
            _this.eventsToUnbind.push(addEvent(button.buttonWrapper, 'click', function () { return _this.eraseActiveButtons(allButtons, button.buttonWrapper); }));
            if (isArray(defs[btnName].items)) {
                // create submenu buttons
                _this.addSubmenu(button, defs[btnName]);
            }
        });
    };
    /**
     * Create submenu (list of buttons) for the option. In example main button
     * is Line, in submenu will be buttons with types of lines.
     *
     * @private
     *
     * @param {Highcharts.Dictionary<Highcharts.HTMLDOMElement>} parentBtn
     *        Button which has submenu
     *
     * @param {Highcharts.StockToolsGuiDefinitionsButtonsOptions} button
     *        List of all buttons
     */
    Toolbar.prototype.addSubmenu = function (parentBtn, button) {
        var _this = this;
        var submenuArrow = parentBtn.submenuArrow, buttonWrapper = parentBtn.buttonWrapper, buttonWidth = getStyle(buttonWrapper, 'width'), wrapper = this.wrapper, menuWrapper = this.listWrapper, allButtons = this.toolbar.childNodes, 
        // create submenu container
        submenuWrapper = this.submenu = createElement('ul', {
            className: 'highcharts-submenu-wrapper'
        }, void 0, buttonWrapper);
        // create submenu buttons and select the first one
        this.addSubmenuItems(buttonWrapper, button);
        // show / hide submenu
        this.eventsToUnbind.push(addEvent(submenuArrow, 'click', function (e) {
            e.stopPropagation();
            // Erase active class on all other buttons
            _this.eraseActiveButtons(allButtons, buttonWrapper);
            // hide menu
            if (buttonWrapper.className
                .indexOf('highcharts-current') >= 0) {
                menuWrapper.style.width =
                    menuWrapper.startWidth + 'px';
                buttonWrapper.classList.remove('highcharts-current');
                submenuWrapper.style.display = 'none';
            }
            else {
                // show menu
                // to calculate height of element
                submenuWrapper.style.display = 'block';
                var topMargin = submenuWrapper.offsetHeight -
                    buttonWrapper.offsetHeight - 3;
                // calculate position of submenu in the box
                // if submenu is inside, reset top margin
                if (
                // cut on the bottom
                !(submenuWrapper.offsetHeight +
                    buttonWrapper.offsetTop >
                    wrapper.offsetHeight &&
                    // cut on the top
                    buttonWrapper.offsetTop > topMargin)) {
                    topMargin = 0;
                }
                // apply calculated styles
                css(submenuWrapper, {
                    top: -topMargin + 'px',
                    left: buttonWidth + 3 + 'px'
                });
                buttonWrapper.className += ' highcharts-current';
                menuWrapper.startWidth = wrapper.offsetWidth;
                menuWrapper.style.width = menuWrapper.startWidth +
                    getStyle(menuWrapper, 'padding-left') +
                    submenuWrapper.offsetWidth + 3 + 'px';
            }
        }));
    };
    /**
     * Create buttons in submenu
     *
     * @private
     *
     * @param {Highcharts.HTMLDOMElement} buttonWrapper
     *        Button where submenu is placed
     *
     * @param {Highcharts.StockToolsGuiDefinitionsButtonsOptions} button
     *        List of all buttons options
     */
    Toolbar.prototype.addSubmenuItems = function (buttonWrapper, button) {
        var _this = this;
        var _self = this, submenuWrapper = this.submenu, lang = this.lang, menuWrapper = this.listWrapper, items = button.items;
        var submenuBtn;
        // add items to submenu
        items.forEach(function (btnName) {
            // add buttons to submenu
            submenuBtn = _this.addButton(submenuWrapper, button, btnName, lang);
            _this.eventsToUnbind.push(addEvent(submenuBtn.mainButton, 'click', function () {
                _self.switchSymbol(this, buttonWrapper, true);
                menuWrapper.style.width =
                    menuWrapper.startWidth + 'px';
                submenuWrapper.style.display = 'none';
            }));
        });
        // select first submenu item
        var firstSubmenuItem = submenuWrapper.querySelectorAll('li > .highcharts-menu-item-btn')[0];
        // replace current symbol, in main button, with submenu's button style
        this.switchSymbol(firstSubmenuItem, false);
    };
    /**
     * Erase active class on all other buttons.
     * @private
     */
    Toolbar.prototype.eraseActiveButtons = function (buttons, currentButton, submenuItems) {
        [].forEach.call(buttons, function (btn) {
            if (btn !== currentButton) {
                btn.classList.remove('highcharts-current');
                btn.classList.remove('highcharts-active');
                submenuItems =
                    btn.querySelectorAll('.highcharts-submenu-wrapper');
                // hide submenu
                if (submenuItems.length > 0) {
                    submenuItems[0].style.display = 'none';
                }
            }
        });
    };
    /**
     * Create single button. Consist of HTML elements `li`, `span`, and (if
     * exists) submenu container.
     *
     * @private
     *
     * @param {Highcharts.HTMLDOMElement} target
     *        HTML reference, where button should be added
     *
     * @param {object} options
     *        All options, by btnName refer to particular button
     *
     * @param {string} btnName
     *        Button name of functionality mapped for specific class
     *
     * @param {Highcharts.Dictionary<string>} lang
     *        All titles, by btnName refer to particular button
     *
     * @return {object}
     *         References to all created HTML elements
     */
    Toolbar.prototype.addButton = function (target, options, btnName, lang) {
        if (lang === void 0) { lang = {}; }
        var btnOptions = options[btnName], items = btnOptions.items, classMapping = Toolbar.prototype.classMapping, userClassName = btnOptions.className || '';
        // main button wrapper
        var buttonWrapper = createElement('li', {
            className: pick(classMapping[btnName], '') + ' ' + userClassName,
            title: lang[btnName] || btnName
        }, void 0, target);
        // single button
        var mainButton = createElement('span', {
            className: 'highcharts-menu-item-btn'
        }, void 0, buttonWrapper);
        // submenu
        if (items && items.length) {
            // arrow is a hook to show / hide submenu
            var submenuArrow = createElement('span', {
                className: 'highcharts-submenu-item-arrow ' +
                    'highcharts-arrow-right'
            }, void 0, buttonWrapper);
            submenuArrow.style.backgroundImage = 'url(' +
                this.iconsURL + 'arrow-bottom.svg)';
            return {
                buttonWrapper: buttonWrapper,
                mainButton: mainButton,
                submenuArrow: submenuArrow
            };
        }
        mainButton.style.backgroundImage = 'url(' +
            this.iconsURL + btnOptions.symbol + ')';
        return {
            buttonWrapper: buttonWrapper,
            mainButton: mainButton
        };
    };
    /**
     * Create navigation's HTML elements: container and arrows.
     * @private
     */
    Toolbar.prototype.addNavigation = function () {
        var wrapper = this.wrapper;
        // arrow wrapper
        this.arrowWrapper = createElement('div', {
            className: 'highcharts-arrow-wrapper'
        });
        this.arrowUp = createElement('div', {
            className: 'highcharts-arrow-up'
        }, void 0, this.arrowWrapper);
        this.arrowUp.style.backgroundImage =
            'url(' + this.iconsURL + 'arrow-right.svg)';
        this.arrowDown = createElement('div', {
            className: 'highcharts-arrow-down'
        }, void 0, this.arrowWrapper);
        this.arrowDown.style.backgroundImage =
            'url(' + this.iconsURL + 'arrow-right.svg)';
        wrapper.insertBefore(this.arrowWrapper, wrapper.childNodes[0]);
        // attach scroll events
        this.scrollButtons();
    };
    /**
     * Add events to navigation (two arrows) which allows user to scroll
     * top/down GUI buttons, if container's height is not enough.
     * @private
     */
    Toolbar.prototype.scrollButtons = function () {
        var wrapper = this.wrapper, toolbar = this.toolbar, step = 0.1 * wrapper.offsetHeight; // 0.1 = 10%
        var targetY = 0;
        this.eventsToUnbind.push(addEvent(this.arrowUp, 'click', function () {
            if (targetY > 0) {
                targetY -= step;
                toolbar.style.marginTop = -targetY + 'px';
            }
        }));
        this.eventsToUnbind.push(addEvent(this.arrowDown, 'click', function () {
            if (wrapper.offsetHeight + targetY <=
                toolbar.offsetHeight + step) {
                targetY += step;
                toolbar.style.marginTop = -targetY + 'px';
            }
        }));
    };
    /*
     * Create stockTools HTML main elements.
     *
     */
    Toolbar.prototype.createHTML = function () {
        var chart = this.chart, guiOptions = this.options, container = chart.container, navigation = chart.options.navigation, bindingsClassName = navigation && navigation.bindingsClassName;
        var listWrapper, toolbar;
        // create main container
        var wrapper = this.wrapper = createElement('div', {
            className: 'highcharts-stocktools-wrapper ' +
                guiOptions.className + ' ' + bindingsClassName
        });
        container.appendChild(wrapper);
        // Mimic event behaviour of being outside chart.container
        [
            'mousedown',
            'mousemove',
            'click',
            'touchstart'
        ].forEach(function (eventType) {
            addEvent(wrapper, eventType, function (e) {
                return e.stopPropagation();
            });
        });
        addEvent(wrapper, 'mouseover', function (e) {
            return chart.pointer.onContainerMouseLeave(e);
        });
        // toolbar
        this.toolbar = toolbar = createElement('ul', {
            className: 'highcharts-stocktools-toolbar ' +
                guiOptions.toolbarClassName
        });
        // add container for list of buttons
        this.listWrapper = listWrapper = createElement('div', {
            className: 'highcharts-menu-wrapper'
        });
        wrapper.insertBefore(listWrapper, wrapper.childNodes[0]);
        listWrapper.insertBefore(toolbar, listWrapper.childNodes[0]);
        this.showHideToolbar();
        // add navigation which allows user to scroll down / top GUI buttons
        this.addNavigation();
    };
    /**
     * Function called in redraw verifies if the navigation should be visible.
     * @private
     */
    Toolbar.prototype.showHideNavigatorion = function () {
        // arrows
        // 50px space for arrows
        if (this.visible &&
            this.toolbar.offsetHeight > (this.wrapper.offsetHeight - 50)) {
            this.arrowWrapper.style.display = 'block';
        }
        else {
            // reset margin if whole toolbar is visible
            this.toolbar.style.marginTop = '0px';
            // hide arrows
            this.arrowWrapper.style.display = 'none';
        }
    };
    /**
     * Create button which shows or hides GUI toolbar.
     * @private
     */
    Toolbar.prototype.showHideToolbar = function () {
        var chart = this.chart, wrapper = this.wrapper, toolbar = this.listWrapper, submenu = this.submenu, 
        // Show hide toolbar
        showhideBtn = this.showhideBtn = createElement('div', {
            className: 'highcharts-toggle-toolbar highcharts-arrow-left'
        }, void 0, wrapper);
        var visible = this.visible;
        showhideBtn.style.backgroundImage =
            'url(' + this.iconsURL + 'arrow-right.svg)';
        if (!visible) {
            // hide
            if (submenu) {
                submenu.style.display = 'none';
            }
            showhideBtn.style.left = '0px';
            visible = this.visible = false;
            toolbar.classList.add('highcharts-hide');
            showhideBtn.classList.toggle('highcharts-arrow-right');
            wrapper.style.height = showhideBtn.offsetHeight + 'px';
        }
        else {
            wrapper.style.height = '100%';
            showhideBtn.style.top = getStyle(toolbar, 'padding-top') + 'px';
            showhideBtn.style.left = (wrapper.offsetWidth +
                getStyle(toolbar, 'padding-left')) + 'px';
        }
        // Toggle menu
        this.eventsToUnbind.push(addEvent(showhideBtn, 'click', function () {
            chart.update({
                stockTools: {
                    gui: {
                        visible: !visible,
                        placed: true
                    }
                }
            });
        }));
    };
    /*
     * In main GUI button, replace icon and class with submenu button's
     * class / symbol.
     *
     * @param {HTMLDOMElement} - submenu button
     * @param {Boolean} - true or false
     *
     */
    Toolbar.prototype.switchSymbol = function (button, redraw) {
        var buttonWrapper = button.parentNode, buttonWrapperClass = buttonWrapper.className, 
        // main button in first level og GUI
        mainNavButton = buttonWrapper.parentNode.parentNode;
        // if the button is disabled, don't do anything
        if (buttonWrapperClass.indexOf('highcharts-disabled-btn') > -1) {
            return;
        }
        // set class
        mainNavButton.className = '';
        if (buttonWrapperClass) {
            mainNavButton.classList.add(buttonWrapperClass.trim());
        }
        // set icon
        mainNavButton
            .querySelectorAll('.highcharts-menu-item-btn')[0]
            .style.backgroundImage =
            button.style.backgroundImage;
        // set active class
        if (redraw) {
            this.toggleButtonActiveClass(mainNavButton);
        }
    };
    /**
     * Set select state (active class) on button.
     * @private
     */
    Toolbar.prototype.toggleButtonActiveClass = function (button) {
        var classList = button.classList;
        if (classList.contains('highcharts-active')) {
            classList.remove('highcharts-active');
        }
        else {
            classList.add('highcharts-active');
        }
    };
    /**
     * Remove active class from all buttons except defined.
     * @private
     */
    Toolbar.prototype.unselectAllButtons = function (button) {
        var activeBtns = button.parentNode
            .querySelectorAll('.highcharts-active');
        [].forEach.call(activeBtns, function (activeBtn) {
            if (activeBtn !== button) {
                activeBtn.classList.remove('highcharts-active');
            }
        });
    };
    /**
     * Update GUI with given options.
     * @private
     */
    Toolbar.prototype.update = function (options, redraw) {
        merge(true, this.chart.options.stockTools, options);
        this.destroy();
        this.chart.setStockTools(options);
        // If Stock Tools are updated, then bindings should be updated too:
        if (this.chart.navigationBindings) {
            this.chart.navigationBindings.update();
        }
        this.chart.isDirtyBox = true;
        if (pick(redraw, true)) {
            this.chart.redraw();
        }
    };
    /**
     * Destroy all HTML GUI elements.
     * @private
     */
    Toolbar.prototype.destroy = function () {
        var stockToolsDiv = this.wrapper, parent = stockToolsDiv && stockToolsDiv.parentNode;
        this.eventsToUnbind.forEach(function (unbinder) { return unbinder(); });
        // Remove the empty element
        if (parent) {
            parent.removeChild(stockToolsDiv);
        }
    };
    /**
     * Redraw, GUI requires to verify if the navigation should be visible.
     * @private
     */
    Toolbar.prototype.redraw = function () {
        this.showHideNavigatorion();
    };
    /**
     * @private
     */
    Toolbar.prototype.getIconsURL = function () {
        return this.chart.options.navigation.iconsURL ||
            this.options.iconsURL ||
            'https://code.highcharts.com/10.3.3/gfx/stock-icons/';
    };
    return Toolbar;
}());
Toolbar.prototype.classMapping = {
    circle: 'highcharts-circle-annotation',
    ellipse: 'highcharts-ellipse-annotation',
    rectangle: 'highcharts-rectangle-annotation',
    label: 'highcharts-label-annotation',
    segment: 'highcharts-segment',
    arrowSegment: 'highcharts-arrow-segment',
    ray: 'highcharts-ray',
    arrowRay: 'highcharts-arrow-ray',
    line: 'highcharts-infinity-line',
    arrowInfinityLine: 'highcharts-arrow-infinity-line',
    verticalLine: 'highcharts-vertical-line',
    horizontalLine: 'highcharts-horizontal-line',
    crooked3: 'highcharts-crooked3',
    crooked5: 'highcharts-crooked5',
    elliott3: 'highcharts-elliott3',
    elliott5: 'highcharts-elliott5',
    pitchfork: 'highcharts-pitchfork',
    fibonacci: 'highcharts-fibonacci',
    fibonacciTimeZones: 'highcharts-fibonacci-time-zones',
    parallelChannel: 'highcharts-parallel-channel',
    measureX: 'highcharts-measure-x',
    measureY: 'highcharts-measure-y',
    measureXY: 'highcharts-measure-xy',
    timeCycles: 'highcharts-time-cycles',
    verticalCounter: 'highcharts-vertical-counter',
    verticalLabel: 'highcharts-vertical-label',
    verticalArrow: 'highcharts-vertical-arrow',
    currentPriceIndicator: 'highcharts-current-price-indicator',
    indicators: 'highcharts-indicators',
    flagCirclepin: 'highcharts-flag-circlepin',
    flagDiamondpin: 'highcharts-flag-diamondpin',
    flagSquarepin: 'highcharts-flag-squarepin',
    flagSimplepin: 'highcharts-flag-simplepin',
    zoomX: 'highcharts-zoom-x',
    zoomY: 'highcharts-zoom-y',
    zoomXY: 'highcharts-zoom-xy',
    typeLine: 'highcharts-series-type-line',
    typeOHLC: 'highcharts-series-type-ohlc',
    typeHLC: 'highcharts-series-type-hlc',
    typeCandlestick: 'highcharts-series-type-candlestick',
    typeHollowCandlestick: 'highcharts-series-type-hollowcandlestick',
    typeHeikinAshi: 'highcharts-series-type-heikinashi',
    fullScreen: 'highcharts-full-screen',
    toggleAnnotations: 'highcharts-toggle-annotations',
    saveChart: 'highcharts-save-chart',
    separator: 'highcharts-separator'
};
/* *
 *
 *  Default Export
 *
 * */
export default Toolbar;
