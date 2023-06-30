var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { ZalgoPromise } from 'zalgo-promise/src';
import { cleanUpWindow } from 'post-robot/src';
import { findFrameByName, isSameDomain } from 'cross-domain-utils/src';

import { iframe, popup, toCSS, showElement, hideElement, destroyElement, normalizeDimension, watchElementForClose, awaitFrameWindow, addClass, removeClass, noop } from '../../lib';
import { CONTEXT_TYPES, DELEGATE, CLOSE_REASONS, CLASS_NAMES, DEFAULT_DIMENSIONS } from '../../constants';
import { getPosition, getParentComponentWindow } from '../window';

/*  Render Drivers
    --------------

    There are various differences in how we treat:

    - Opening frames and windows
    - Rendering up to the parent
    - Resizing
    - etc.

    based on the context we're rendering to.

    These render drivers split this functionality out in a driver pattern, so our component code doesn't bunch up into a
    series of if-popup-then-else-if-iframe code.
*/

export var RENDER_DRIVERS = {};

// Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
// to feel like a native element on the page.

RENDER_DRIVERS[CONTEXT_TYPES.IFRAME] = {

    focusable: false,
    renderedIntoContainerTemplate: true,
    allowResize: true,
    openOnClick: false,
    needsBridge: false,

    open: function open(url) {
        var _this = this;

        var attributes = this.component.attributes.iframe || {};

        this.iframe = iframe({
            url: url,
            attributes: _extends({
                name: this.childWindowName,
                title: this.component.name,
                scrolling: this.component.scrolling ? 'yes' : 'no'
            }, attributes),
            'class': [CLASS_NAMES.COMPONENT_FRAME, CLASS_NAMES.INVISIBLE]
        }, this.element);

        return awaitFrameWindow(this.iframe).then(function (frameWindow) {

            _this.window = frameWindow;

            var detectClose = function detectClose() {
                return ZalgoPromise['try'](function () {
                    return _this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
                })['finally'](function () {
                    return _this.destroy();
                });
            };

            var iframeWatcher = watchElementForClose(_this.iframe, detectClose);
            var elementWatcher = watchElementForClose(_this.element, detectClose);

            _this.clean.register('destroyWindow', function () {

                iframeWatcher.cancel();
                elementWatcher.cancel();

                cleanUpWindow(_this.window);

                delete _this.window;

                if (_this.iframe) {
                    destroyElement(_this.iframe);
                    delete _this.iframe;
                }
            });
        });
    },
    openPrerender: function openPrerender() {
        var _this2 = this;

        var attributes = this.component.attributes.iframe || {};

        this.prerenderIframe = iframe({
            attributes: _extends({
                name: '__prerender__' + this.childWindowName,
                scrolling: this.component.scrolling ? 'yes' : 'no'
            }, attributes),
            'class': [CLASS_NAMES.PRERENDER_FRAME, CLASS_NAMES.VISIBLE]
        }, this.element);

        return awaitFrameWindow(this.prerenderIframe).then(function (prerenderFrameWindow) {

            _this2.prerenderWindow = prerenderFrameWindow;

            _this2.clean.register('destroyPrerender', function () {

                if (_this2.prerenderIframe) {
                    destroyElement(_this2.prerenderIframe);
                    delete _this2.prerenderIframe;
                }
            });
        });
    },
    switchPrerender: function switchPrerender() {
        var _this3 = this;

        addClass(this.prerenderIframe, CLASS_NAMES.INVISIBLE);
        removeClass(this.prerenderIframe, CLASS_NAMES.VISIBLE);

        addClass(this.iframe, CLASS_NAMES.VISIBLE);
        removeClass(this.iframe, CLASS_NAMES.INVISIBLE);

        setTimeout(function () {
            if (_this3.prerenderIframe) {
                destroyElement(_this3.prerenderIframe);
            }
        }, 1000);
    },


    delegateOverrides: {

        openContainer: DELEGATE.CALL_DELEGATE,
        destroyComponent: DELEGATE.CALL_DELEGATE,
        destroyContainer: DELEGATE.CALL_DELEGATE,
        cancelContainerEvents: DELEGATE.CALL_DELEGATE,
        createPrerenderTemplate: DELEGATE.CALL_DELEGATE,
        elementReady: DELEGATE.CALL_DELEGATE,
        showContainer: DELEGATE.CALL_DELEGATE,
        showComponent: DELEGATE.CALL_DELEGATE,
        hideContainer: DELEGATE.CALL_DELEGATE,
        hideComponent: DELEGATE.CALL_DELEGATE,
        hide: DELEGATE.CALL_DELEGATE,
        show: DELEGATE.CALL_DELEGATE,
        resize: DELEGATE.CALL_DELEGATE,
        loadUrl: DELEGATE.CALL_DELEGATE,
        hijackSubmit: DELEGATE.CALL_DELEGATE,
        openPrerender: DELEGATE.CALL_DELEGATE,
        switchPrerender: DELEGATE.CALL_DELEGATE,

        renderTemplate: DELEGATE.CALL_ORIGINAL,
        openContainerFrame: DELEGATE.CALL_ORIGINAL,
        getOutlet: DELEGATE.CALL_ORIGINAL,

        open: function open(original, override) {
            return function overrideOpen() {
                var _this4 = this;

                return override.apply(this, arguments).then(function () {
                    _this4.clean.set('window', findFrameByName(getParentComponentWindow(), _this4.childWindowName));

                    if (!_this4.window) {
                        throw new Error('Unable to find parent component iframe window');
                    }
                });
            };
        }
    },

    resize: function resize(width, height) {

        if (width) {
            this.container.style.width = toCSS(width);
            this.element.style.width = toCSS(width);
        }

        if (height) {
            this.container.style.height = toCSS(height);
            this.element.style.height = toCSS(height);
        }
    },
    show: function show() {
        showElement(this.element);
    },
    hide: function hide() {
        hideElement(this.element);
    },
    loadUrl: function loadUrl(url) {
        this.iframe.setAttribute('src', url);
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {

    // Popup context opens up a centered popup window on the page.

    RENDER_DRIVERS[CONTEXT_TYPES.POPUP] = {

        focusable: true,
        renderedIntoContainerTemplate: false,
        allowResize: false,
        openOnClick: true,
        needsBridge: true,

        open: function open() {
            var _this5 = this;

            var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return ZalgoPromise['try'](function () {
                var _ref = _this5.component.dimensions || {},
                    _ref$width = _ref.width,
                    width = _ref$width === undefined ? DEFAULT_DIMENSIONS.WIDTH : _ref$width,
                    _ref$height = _ref.height,
                    height = _ref$height === undefined ? DEFAULT_DIMENSIONS.HEIGHT : _ref$height;

                width = normalizeDimension(width, window.outerWidth);
                height = normalizeDimension(height, window.outerWidth);

                var _getPosition = getPosition({ width: width, height: height }),
                    x = _getPosition.x,
                    y = _getPosition.y;

                var attributes = _this5.component.attributes.popup || {};

                _this5.window = popup(url || '', _extends({
                    name: _this5.childWindowName,
                    width: width,
                    height: height,
                    top: y,
                    left: x,
                    status: 1,
                    toolbar: 0,
                    menubar: 0,
                    resizable: 1,
                    scrollbars: 1
                }, attributes));

                _this5.prerenderWindow = _this5.window;

                _this5.clean.register('destroyWindow', function () {
                    if (_this5.window) {
                        _this5.window.close();
                        cleanUpWindow(_this5.window);
                        delete _this5.window;
                        delete _this5.prerenderWindow;
                    }
                });

                _this5.resize(width, height);
            });
        },
        openPrerender: function openPrerender() {
            return ZalgoPromise['try'](noop);
        },
        resize: function resize() {
            // pass
        },
        hide: function hide() {
            throw new Error('Can not hide popup');
        },
        show: function show() {
            throw new Error('Can not show popup');
        },


        delegateOverrides: {

            openContainer: DELEGATE.CALL_DELEGATE,
            destroyContainer: DELEGATE.CALL_DELEGATE,

            elementReady: DELEGATE.CALL_DELEGATE,

            showContainer: DELEGATE.CALL_DELEGATE,
            showComponent: DELEGATE.CALL_DELEGATE,
            hideContainer: DELEGATE.CALL_DELEGATE,
            hideComponent: DELEGATE.CALL_DELEGATE,

            hide: DELEGATE.CALL_DELEGATE,
            show: DELEGATE.CALL_DELEGATE,

            cancelContainerEvents: DELEGATE.CALL_DELEGATE,

            open: DELEGATE.CALL_ORIGINAL,
            loadUrl: DELEGATE.CALL_ORIGINAL,
            createPrerenderTemplate: DELEGATE.CALL_ORIGINAL,
            destroyComponent: DELEGATE.CALL_ORIGINAL,
            resize: DELEGATE.CALL_ORIGINAL,
            renderTemplate: DELEGATE.CALL_ORIGINAL,
            openContainerFrame: DELEGATE.CALL_ORIGINAL,
            getOutlet: DELEGATE.CALL_ORIGINAL
        },

        loadUrl: function loadUrl(url) {

            if (isSameDomain(this.window)) {
                try {
                    if (this.window.location && this.window.location.replace) {
                        this.window.location.replace(url);
                        return;
                    }
                } catch (err) {
                    // pass
                }
            }

            this.window.location = url;
        }
    };
}