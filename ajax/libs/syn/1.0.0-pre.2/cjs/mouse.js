/*syn@1.0.0-pre.1#mouse*/
var syn = require('./synthetic.js');
syn.helpers.extend(syn, {
    click: function (element, options, force) {
        var args = syn.args(options, element);
        return new Promise(resolve => {
            var element = args.element;
            syn.helpers.addOffset(options, element);
            if (syn.support.pointerEvents) {
                syn.trigger(element, 'pointerdown', options);
            }
            if (syn.support.touchEvents) {
                syn.trigger(element, 'touchstart', options);
            }
            syn.trigger(element, 'mousedown', options);
            syn.helpers.schedule(function () {
                if (syn.support.pointerEvents) {
                    syn.trigger(element, 'pointerup', options);
                }
                if (syn.support.touchEvents) {
                    syn.trigger(element, 'touchend', options);
                }
                syn.trigger(element, 'mouseup', options);
                if (!syn.support.mouseDownUpClicks || force) {
                    syn.trigger(element, 'click', options);
                    resolve(true);
                } else {
                    syn.create.click.setup('click', options, element);
                    syn.defaults.click.call(element);
                    syn.helpers.schedule(function () {
                        resolve(true);
                    }, 1);
                }
            }, 1);
        });
    },
    rightClick: function (element, options) {
        var args = syn.args(options, element);
        return new Promise(resolve => {
            var element = args.element;
            syn.helpers.addOffset(options, element);
            var mouseopts = syn.helpers.extend(syn.helpers.extend({}, syn.mouse.browser.right.mouseup), options);
            if (syn.support.pointerEvents) {
                syn.trigger(element, 'pointerdown', mouseopts);
            }
            syn.trigger(element, 'mousedown', mouseopts);
            syn.helpers.schedule(function () {
                if (syn.support.pointerEvents) {
                    syn.trigger(element, 'pointerup', mouseopts);
                }
                syn.trigger(element, 'mouseup', mouseopts);
                if (syn.mouse.browser.right.contextmenu) {
                    syn.trigger(element, 'contextmenu', syn.helpers.extend(syn.helpers.extend({}, syn.mouse.browser.right.contextmenu), options));
                }
                resolve();
            }, 1);
        });
    },
    dblclick: async function (element, options) {
        var args = syn.args(options, element);
        syn.helpers.addOffset(options, args.element);
        await this.click(args.element, options);
        await syn.helpers.schedulePromise(2);
        await this.click(args.element, options);
        syn.trigger(args.element, 'dblclick', options);
        return true;
    }
});
syn.helpers.extend(syn.events.kinds, {
    mouse: {
        options: function (type, options, element) {
            var doc = document.documentElement, body = document.body, center = [
                    options.pageX || 0,
                    options.pageY || 0
                ], left = syn.mouse.browser && syn.mouse.browser.left[type], right = syn.mouse.browser && syn.mouse.browser.right[type];
            return syn.helpers.extend({
                bubbles: true,
                cancelable: true,
                view: window,
                detail: 1,
                screenX: 1,
                screenY: 1,
                clientX: options.clientX || center[0] - (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0),
                clientY: options.clientY || center[1] - (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0),
                ctrlKey: !!syn.keysBeingHeldDown.ctrlKey,
                altKey: !!syn.keysBeingHeldDown.altKey,
                shiftKey: !!syn.keysBeingHeldDown.shiftKey,
                metaKey: !!syn.keysBeingHeldDown.metaKey,
                button: left && left.button !== null ? left.button : right && right.button || (type === 'contextmenu' ? 2 : 0),
                relatedTarget: document.documentElement
            }, options);
        },
        create: function (type, defaults, element) {
            var doc = syn.helpers.getWindow(element).document || document, event;
            if (doc.createEvent) {
                try {
                    defaults.view = doc.defaultView;
                    event = doc.createEvent('MouseEvents');
                    event.initMouseEvent(type, defaults.bubbles, defaults.cancelable, defaults.view, defaults.detail, defaults.screenX, defaults.screenY, defaults.clientX, defaults.clientY, defaults.ctrlKey, defaults.altKey, defaults.shiftKey, defaults.metaKey, defaults.button, defaults.relatedTarget);
                } catch (e) {
                    event = syn.helpers.createBasicStandardEvent(type, defaults, doc);
                }
                event.synthetic = true;
                return event;
            } else {
                try {
                    event = syn.helpers.createEventObject(type, defaults, element);
                } catch (e) {
                }
                return event;
            }
        }
    }
});
syn.helpers.extend(syn.events.types, {
    mousedown: {
        setup: function (type, options, element) {
            var nn = element.nodeName.toLowerCase();
            if (syn.browser.safari && (nn === 'select' || nn === 'option')) {
                options._autoPrevent = true;
            }
        },
        default: function (options) {
            syn.trigger(this, 'focus', {});
        }
    },
    click: {
        setup: function (type, options, element) {
            var nodeName = element.nodeName.toLowerCase();
            if (!syn.support.clickChecks && !syn.support.changeChecks && nodeName === 'input') {
                type = element.type.toLowerCase();
                if (type === 'checkbox') {
                    element.checked = !element.checked;
                }
                if (type === 'radio') {
                    if (!element.checked) {
                        try {
                            syn.helpers.data(element, 'radioChanged', true);
                        } catch (e) {
                        }
                        element.checked = true;
                    }
                }
            }
            if (nodeName === 'a' && element.href && !/^\s*javascript:/.test(element.href)) {
                syn.helpers.data(element, 'href', element.href);
            }
            if (/option/i.test(element.nodeName)) {
                var child = element.parentNode.firstChild, i = -1;
                while (child) {
                    if (child.nodeType === 1) {
                        i++;
                        if (child === element) {
                            break;
                        }
                    }
                    child = child.nextSibling;
                }
                if (i !== element.parentNode.selectedIndex) {
                    element.parentNode.selectedIndex = i;
                    syn.helpers.data(element, 'createChange', true);
                }
            }
        },
        default: function () {
            var element = this, href, type, createChange, radioChanged, nodeName, scope;
            try {
                href = element.href;
                type = element.type;
                createChange = syn.helpers.data(element, 'createChange');
                radioChanged = syn.helpers.data(element, 'radioChanged');
                scope = syn.helpers.getWindow(element);
                nodeName = element.nodeName.toLowerCase();
            } catch (e) {
                return;
            }
            if (!syn.support.linkHrefJS && /^\s*javascript:/.test(href)) {
                var code = href.replace(/^\s*javascript:/, '');
                if (code !== '//' && code.indexOf('void(0)') === -1) {
                    if (window.selenium) {
                        eval('with(selenium.browserbot.getCurrentWindow()){' + code + '}');
                    } else {
                        eval('with(scope){' + code + '}');
                    }
                }
            }
            if (!syn.support.clickSubmits && ((nodeName === 'input' || nodeName === 'button') && type === 'submit')) {
                var form = syn.helpers.closest(element, 'form');
                if (form) {
                    syn.trigger(form, 'submit', {});
                }
            }
            if (nodeName === 'a' && element.href && !/^\s*javascript:/.test(href)) {
                scope.location.href = href;
            }
            if (nodeName === 'input' && type === 'checkbox') {
                if (!syn.support.clickChanges) {
                    syn.trigger(element, 'change', {});
                }
            }
            if (nodeName === 'input' && type === 'radio') {
                if (radioChanged && !syn.support.radioClickChanges) {
                    syn.trigger(element, 'change', {});
                }
            }
            if (nodeName === 'option' && createChange) {
                syn.trigger(element.parentNode, 'change', {});
                syn.helpers.data(element, 'createChange', false);
            }
        }
    }
});