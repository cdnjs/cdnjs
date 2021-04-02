/*syn@1.0.0-pre.2#key*/
define([
    'require',
    'exports',
    'module',
    './synthetic',
    './typeable',
    './browsers'
], function (require, exports, module) {
    var syn = require('./synthetic');
    require('./typeable');
    require('./browsers');
    var h = syn.helpers;
    var synKey = syn.key;
    syn.helpers.extend(syn, {
        key: function (element, options) {
            var args = syn.args(options, element);
            return new Promise(resolve => {
                var element = args.element;
                if (/-up$/.test(options) && h.inArray(options.replace('-up', ''), syn.key.kinds.special) !== -1) {
                    syn.trigger(element, 'keyup', options.replace('-up', ''));
                    return resolve({
                        runDefaults: true,
                        element
                    });
                }
                var activeElement = h.getWindow(element).document.activeElement, caret = syn.typeable.test(element) && getSelection(element), key = syn.key.convert[options] || options, runDefaults = syn.trigger(element, 'keydown', key), prevent = syn.key.browser.prevent, defaultResult, keypressOptions = getKeyOptions(key, 'keypress');
                if (runDefaults) {
                    if (!keypressOptions) {
                        defaultResult = getKeyDefault(key).call(element, keypressOptions, h.getWindow(element), key, undefined, caret);
                    } else {
                        if (activeElement !== h.getWindow(element).document.activeElement) {
                            element = h.getWindow(element).document.activeElement;
                        }
                        runDefaults = syn.trigger(element, 'keypress', keypressOptions);
                        if (runDefaults) {
                            defaultResult = getKeyDefault(key).call(element, keypressOptions, h.getWindow(element), key, undefined, caret);
                        }
                    }
                } else {
                    if (keypressOptions && h.inArray('keypress', prevent.keydown) === -1) {
                        if (activeElement !== h.getWindow(element).document.activeElement) {
                            element = h.getWindow(element).document.activeElement;
                        }
                        syn.trigger(element, 'keypress', keypressOptions);
                    }
                }
                if (defaultResult && defaultResult.nodeName) {
                    element = defaultResult;
                }
                if (defaultResult !== null) {
                    syn.helpers.schedule(function () {
                        if (key === '\r' && element.nodeName.toLowerCase() === 'input') {
                        } else if (syn.support.oninput) {
                            syn.trigger(element, 'input', getKeyOptions(key, 'input'));
                        }
                        syn.trigger(element, 'keyup', getKeyOptions(key, 'keyup'));
                        resolve({
                            runDefaults: true,
                            element
                        });
                    }, 1);
                } else {
                    resolve({
                        runDefaults: true,
                        element
                    });
                }
            });
        },
        type: async function (element, options) {
            var args = syn.args(options, element);
            var parts = (options + '').match(/(\[[^\]]+\])|([^\[])/g), el = args.element, part;
            while (part = parts.shift()) {
                if (part.length > 1) {
                    part = part.substr(1, part.length - 2);
                }
                var result = await syn.key(el, part);
                el = result.element || el;
            }
            return { element: el };
        }
    });
    syn.helpers.extend(syn.events.kinds, {
        key: {
            events: syn.helpers.toMap('keypress|keyup|keydown'),
            options: function (type, options, element) {
                options = typeof options !== 'object' ? { character: options } : options;
                options = h.extend({}, options);
                if (options.character) {
                    h.extend(options, getKeyOptions(options.character, type));
                    delete options.character;
                }
                options = h.extend({
                    ctrlKey: !!syn.keysBeingHeldDown.ctrlKey,
                    altKey: !!syn.keysBeingHeldDown.altKey,
                    shiftKey: !!syn.keysBeingHeldDown.shiftKey,
                    metaKey: !!syn.keysBeingHeldDown.metaKey
                }, options);
                return options;
            },
            create: function (type, options, element) {
                var doc = h.getWindow(element).document || document, event;
                if (typeof KeyboardEvent !== 'undefined') {
                    var keyboardEventKeys = syn.key.keyboardEventKeys;
                    if (options.key && keyboardEventKeys[options.key]) {
                        options.key = keyboardEventKeys[options.key];
                    }
                    event = new KeyboardEvent(type, options);
                    event.synthetic = true;
                    return event;
                } else if (doc.createEvent) {
                    try {
                        event = doc.createEvent('KeyEvents');
                        event.initKeyEvent(type, true, true, window, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.keyCode, options.charCode);
                    } catch (e) {
                        event = h.createBasicStandardEvent(type, options, doc);
                    }
                    event.synthetic = true;
                    return event;
                } else {
                    try {
                        event = h.createEventObject.apply(this, arguments);
                        h.extend(event, options);
                    } catch (e) {
                    }
                    return event;
                }
            }
        }
    });
    syn.helpers.extend(syn.events.types, {
        keydown: {
            setup: function (type, options, element) {
                if (h.inArray(options, syn.key.kinds.special) !== -1) {
                    syn.keysBeingHeldDown[options + 'Key'] = element;
                }
            }
        },
        keypress: {
            setup: function (type, options, element) {
                if (syn.support.keyCharacters && !syn.support.keysOnNotFocused) {
                    syn.helpers.tryFocus(element);
                }
            }
        },
        keyup: {
            setup: function (type, options, element) {
                if (h.inArray(options, syn.key.kinds.special) !== -1) {
                    syn.keysBeingHeldDown[options + 'Key'] = null;
                }
            }
        }
    });
    syn.helpers.extend(syn.key, {
        defaults: {
            'character': function (options, scope, key, force, sel) {
                if (/num\d+/.test(key)) {
                    key = key.match(/\d+/)[0];
                }
                if (force || !syn.support.keyCharacters && syn.typeable.test(this)) {
                    var current = getText(this), before = current.substr(0, sel.start), after = current.substr(sel.end), character = key;
                    setText(this, before + character + after);
                    var charLength = character === '\n' && syn.support.textareaCarriage ? 2 : character.length;
                    selectText(this, before.length + charLength);
                }
            },
            'c': function (options, scope, key, force, sel) {
                if (syn.keysBeingHeldDown.ctrlKey) {
                    syn.key.clipboard = getSelectionText(this);
                } else {
                    syn.key.defaults.character.apply(this, arguments);
                }
            },
            'v': function (options, scope, key, force, sel) {
                if (syn.keysBeingHeldDown.ctrlKey) {
                    syn.key.defaults.character.call(this, options, scope, syn.key.clipboard, true, sel);
                } else {
                    syn.key.defaults.character.apply(this, arguments);
                }
            },
            'a': function (options, scope, key, force, sel) {
                if (syn.keysBeingHeldDown.ctrlKey) {
                    selectText(this, 0, getText(this).length);
                } else {
                    syn.key.defaults.character.apply(this, arguments);
                }
            },
            'home': function () {
                syn.helpers.onParents(this, function (el) {
                    if (el.scrollHeight !== el.clientHeight) {
                        el.scrollTop = 0;
                        return false;
                    }
                });
            },
            'end': function () {
                syn.helpers.onParents(this, function (el) {
                    if (el.scrollHeight !== el.clientHeight) {
                        el.scrollTop = el.scrollHeight;
                        return false;
                    }
                });
            },
            'page-down': function () {
                syn.helpers.onParents(this, function (el) {
                    if (el.scrollHeight !== el.clientHeight) {
                        var ch = el.clientHeight;
                        el.scrollTop += ch;
                        return false;
                    }
                });
            },
            'page-up': function () {
                syn.helpers.onParents(this, function (el) {
                    if (el.scrollHeight !== el.clientHeight) {
                        var ch = el.clientHeight;
                        el.scrollTop -= ch;
                        return false;
                    }
                });
            },
            '\b': function (options, scope, key, force, sel) {
                if (!syn.support.backspaceWorks && syn.typeable.test(this)) {
                    var current = getText(this), before = current.substr(0, sel.start), after = current.substr(sel.end);
                    if (sel.start === sel.end && sel.start > 0) {
                        setText(this, before.substring(0, before.length - 1) + after);
                        selectText(this, sel.start - 1);
                    } else {
                        setText(this, before + after);
                        selectText(this, sel.start);
                    }
                }
            },
            'delete': function (options, scope, key, force, sel) {
                if (!syn.support.backspaceWorks && syn.typeable.test(this)) {
                    var current = getText(this), before = current.substr(0, sel.start), after = current.substr(sel.end);
                    if (sel.start === sel.end && sel.start <= getText(this).length - 1) {
                        setText(this, before + after.substring(1));
                    } else {
                        setText(this, before + after);
                    }
                    selectText(this, sel.start);
                }
            },
            '\r': function (options, scope, key, force, sel) {
                var nodeName = this.nodeName.toLowerCase();
                if (nodeName === 'input') {
                    syn.trigger(this, 'change', {});
                }
                if (!syn.support.keypressSubmits && nodeName === 'input') {
                    var form = syn.helpers.closest(this, 'form');
                    if (form) {
                        syn.trigger(form, 'submit', {});
                    }
                }
                if (!syn.support.keyCharacters && nodeName === 'textarea') {
                    syn.key.defaults.character.call(this, options, scope, '\n', undefined, sel);
                }
                if (!syn.support.keypressOnAnchorClicks && nodeName === 'a') {
                    syn.trigger(this, 'click', {});
                }
            },
            '\t': function (options, scope) {
                var focusEls = getFocusable(this), current = null, i = 0, el, firstNotIndexed, orders = [];
                for (; i < focusEls.length; i++) {
                    orders.push([
                        focusEls[i],
                        i
                    ]);
                }
                var sort = function (order1, order2) {
                    var el1 = order1[0], el2 = order2[0], tab1 = syn.helpers.tabIndex(el1) || 0, tab2 = syn.helpers.tabIndex(el2) || 0;
                    if (tab1 === tab2) {
                        return order1[1] - order2[1];
                    } else {
                        if (tab1 === 0) {
                            return 1;
                        } else if (tab2 === 0) {
                            return -1;
                        } else {
                            return tab1 - tab2;
                        }
                    }
                };
                orders.sort(sort);
                var ordersLength = orders.length;
                for (i = 0; i < ordersLength; i++) {
                    el = orders[i][0];
                    if (this === el) {
                        var nextIndex = i;
                        if (syn.keysBeingHeldDown.shiftKey) {
                            nextIndex--;
                            current = nextIndex >= 0 && orders[nextIndex][0] || orders[ordersLength - 1][0];
                        } else {
                            nextIndex++;
                            current = nextIndex < ordersLength && orders[nextIndex][0] || orders[0][0];
                        }
                    }
                }
                if (!current) {
                    current = firstNotIndexed;
                } else {
                    syn.helpers.tryFocus(current);
                }
                return current;
            },
            'left': function (options, scope, key, force, sel) {
                if (syn.typeable.test(this)) {
                    if (syn.keysBeingHeldDown.shiftKey) {
                        selectText(this, sel.start === 0 ? 0 : sel.start - 1, sel.end);
                    } else {
                        selectText(this, sel.start === 0 ? 0 : sel.start - 1);
                    }
                }
            },
            'right': function (options, scope, key, force, sel) {
                if (syn.typeable.test(this)) {
                    if (syn.keysBeingHeldDown.shiftKey) {
                        selectText(this, sel.start, sel.end + 1 > getText(this).length ? getText(this).length : sel.end + 1);
                    } else {
                        selectText(this, sel.end + 1 > getText(this).length ? getText(this).length : sel.end + 1);
                    }
                }
            },
            'up': function () {
                if (/select/i.test(this.nodeName)) {
                    this.selectedIndex = this.selectedIndex ? this.selectedIndex - 1 : 0;
                }
            },
            'down': function () {
                if (/select/i.test(this.nodeName)) {
                    syn.helpers.changeOnBlur(this, 'selectedIndex', this.selectedIndex);
                    this.selectedIndex = this.selectedIndex + 1;
                }
            },
            'shift': function () {
                return null;
            },
            'ctrl': function () {
                return null;
            },
            'alt': function () {
                return null;
            },
            'meta': function () {
                return null;
            }
        },
        kinds: {
            special: [
                'shift',
                'ctrl',
                'alt',
                'meta',
                'caps'
            ],
            specialChars: ['\b'],
            navigation: [
                'page-up',
                'page-down',
                'end',
                'home',
                'left',
                'up',
                'right',
                'down',
                'insert',
                'delete'
            ],
            'function': [
                'f1',
                'f2',
                'f3',
                'f4',
                'f5',
                'f6',
                'f7',
                'f8',
                'f9',
                'f10',
                'f11',
                'f12'
            ]
        },
        convert: {
            'enter': '\r',
            'backspace': '\b',
            'tab': '\t',
            'space': ' '
        },
        keycodes: {
            '\b': 8,
            '\t': 9,
            '\r': 13,
            'shift': 16,
            'ctrl': 17,
            'alt': 18,
            'meta': 91,
            'pause-break': 19,
            'caps': 20,
            'escape': 27,
            'num-lock': 144,
            'scroll-lock': 145,
            'print': 44,
            'page-up': 33,
            'page-down': 34,
            'end': 35,
            'home': 36,
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40,
            'insert': 45,
            'delete': 46,
            ' ': 32,
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57,
            'a': 65,
            'b': 66,
            'c': 67,
            'd': 68,
            'e': 69,
            'f': 70,
            'g': 71,
            'h': 72,
            'i': 73,
            'j': 74,
            'k': 75,
            'l': 76,
            'm': 77,
            'n': 78,
            'o': 79,
            'p': 80,
            'q': 81,
            'r': 82,
            's': 83,
            't': 84,
            'u': 85,
            'v': 86,
            'w': 87,
            'x': 88,
            'y': 89,
            'z': 90,
            'num0': 96,
            'num1': 97,
            'num2': 98,
            'num3': 99,
            'num4': 100,
            'num5': 101,
            'num6': 102,
            'num7': 103,
            'num8': 104,
            'num9': 105,
            '*': 106,
            '+': 107,
            'subtract': 109,
            'decimal': 110,
            'divide': 111,
            ';': 186,
            '=': 187,
            ',': 188,
            'dash': 189,
            '-': 189,
            'period': 190,
            '.': 190,
            'forward-slash': 191,
            '/': 191,
            '`': 192,
            '[': 219,
            '\\': 220,
            ']': 221,
            '\'': 222,
            'left window key': 91,
            'right window key': 92,
            'select key': 93,
            'f1': 112,
            'f2': 113,
            'f3': 114,
            'f4': 115,
            'f5': 116,
            'f6': 117,
            'f7': 118,
            'f8': 119,
            'f9': 120,
            'f10': 121,
            'f11': 122,
            'f12': 123
        },
        helpers: {
            isSpecial: function (keyCode) {
                var specials = syn.key.kinds.special;
                for (var i = 0; i < specials.length; i++) {
                    if (syn.key.keycodes[specials[i]] === keyCode) {
                        return specials[i];
                    }
                }
            }
        }
    });
    var textProperty = function () {
            var el = document.createElement('span');
            return el.textContent != null ? 'textContent' : 'innerText';
        }(), formElExp = /input|textarea/i;
    function getKeyDefault(key) {
        if (syn.key.defaults[key]) {
            return syn.key.defaults[key];
        }
        for (var kind in syn.key.kinds) {
            if (h.inArray(key, syn.key.kinds[kind]) > -1 && syn.key.defaults[kind]) {
                return syn.key.defaults[kind];
            }
        }
        return syn.key.defaults.character;
    }
    function getKeyOptions(key, event) {
        var keyData = getKeyData(key);
        if (!keyData[event]) {
            return null;
        }
        var charCode = keyData[event][0], keyCode = keyData[event][1], result = { key: key };
        if (keyCode === 'key') {
            result.keyCode = syn.key.keycodes[key];
        } else if (keyCode === 'char') {
            result.keyCode = key.charCodeAt(0);
        } else {
            result.keyCode = keyCode;
        }
        if (charCode === 'char') {
            result.charCode = key.charCodeAt(0);
        } else if (charCode !== null) {
            result.charCode = charCode;
        }
        if (result.keyCode) {
            result.which = result.keyCode;
        } else {
            result.which = result.charCode;
        }
        return result;
    }
    function getKeyData(key) {
        if (syn.key.browser[key]) {
            return syn.key.browser[key];
        }
        for (var kind in syn.key.kinds) {
            if (h.inArray(key, syn.key.kinds[kind]) > -1) {
                return syn.key.browser[kind];
            }
        }
        return syn.key.browser.character;
    }
    function supportsSelection(el) {
        var result;
        try {
            result = el.selectionStart !== undefined && el.selectionStart !== null;
        } catch (e) {
            result = false;
        }
        return result;
    }
    function selectText(el, start, end) {
        if (supportsSelection(el)) {
            if (!end) {
                syn.helpers.tryFocus(el);
                el.setSelectionRange(start, start);
            } else {
                el.selectionStart = start;
                el.selectionEnd = end;
            }
        } else if (el.createTextRange) {
            var r = el.createTextRange();
            r.moveStart('character', start);
            end = end || start;
            r.moveEnd('character', end - el.value.length);
            r.select();
        }
    }
    function getSelection(el) {
        var real, r, start;
        if (supportsSelection(el)) {
            if (document.activeElement && document.activeElement !== el && el.selectionStart === el.selectionEnd && el.selectionStart === 0) {
                return {
                    start: el.value.length,
                    end: el.value.length
                };
            }
            return {
                start: el.selectionStart,
                end: el.selectionEnd
            };
        } else {
            try {
                if (el.nodeName.toLowerCase() === 'input') {
                    real = h.getWindow(el).document.selection.createRange();
                    r = el.createTextRange();
                    r.setEndPoint('EndToStart', real);
                    start = r.text.length;
                    return {
                        start: start,
                        end: start + real.text.length
                    };
                } else {
                    real = h.getWindow(el).document.selection.createRange();
                    r = real.duplicate();
                    var r2 = real.duplicate(), r3 = real.duplicate();
                    r2.collapse();
                    r3.collapse(false);
                    r2.moveStart('character', -1);
                    r3.moveStart('character', -1);
                    r.moveToElementText(el);
                    r.setEndPoint('EndToEnd', real);
                    start = r.text.length - real.text.length;
                    var end = r.text.length;
                    if (start !== 0 && r2.text === '') {
                        start += 2;
                    }
                    if (end !== 0 && r3.text === '') {
                        end += 2;
                    }
                    return {
                        start: start,
                        end: end
                    };
                }
            } catch (e) {
                var prop = formElExp.test(el.nodeName) ? 'value' : 'textContent';
                return {
                    start: el[prop].length,
                    end: el[prop].length
                };
            }
        }
    }
    function getSelectionText(el) {
        if (syn.typeable.test(el)) {
            var sel = getSelection(el);
            return el.value.substring(sel.start, sel.end);
        }
        var win = syn.helpers.getWindow(el);
        if (win.getSelection) {
            return win.getSelection().toString();
        } else if (win.document.getSelection) {
            return win.document.getSelection().toString();
        } else {
            return win.document.selection.createRange().text;
        }
    }
    function getFocusable(el) {
        var document = h.getWindow(el).document, res = [];
        var els = document.getElementsByTagName('*'), len = els.length;
        for (var i = 0; i < len; i++) {
            if (syn.helpers.isFocusable(els[i]) && els[i] !== document.documentElement) {
                res.push(els[i]);
            }
        }
        return res;
    }
    function getText(el) {
        if (formElExp.test(el.nodeName)) {
            return el.value;
        }
        return el[textProperty];
    }
    function setText(el, value) {
        if (formElExp.test(el.nodeName)) {
            el.value = value;
        } else {
            el[textProperty] = value;
        }
    }
    syn.helpers.extend(syn.key, synKey);
});