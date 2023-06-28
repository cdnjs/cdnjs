/*!
 * jodit - Jodit is awesome and usefully wysiwyg editor with filebrowser
 * Author: Chupurnov <chupurnov@gmail.com> (https://xdsoft.net/)
 * Version: v3.24.9
 * Url: https://xdsoft.net/jodit/
 * License(s): MIT
 */
	
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return (self["webpackChunkjodit"] = self["webpackChunkjodit"] || []).push([[781],{

/***/ 90327:
/***/ (function(module) {

module.exports = "<svg viewBox=\"0 0 16 16\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M8,11c1.657,0,3-1.343,3-3V3c0-1.657-1.343-3-3-3S5,1.343,5,3v5C5,9.657,6.343,11,8,11z\"/> <path d=\"M13,8V6h-1l0,1.844c0,1.92-1.282,3.688-3.164,4.071C6.266,12.438,4,10.479,4,8V6H3v2c0,2.414,1.721,4.434,4,4.899V15H5v1h6 v-1H9v-2.101C11.279,12.434,13,10.414,13,8z\"/> </svg>"

/***/ }),

/***/ 57368:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 71235:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(93166);
var data_bind_1 = __webpack_require__(63122);
var is_boolean_1 = __webpack_require__(67749);
var icon_1 = __webpack_require__(77904);
var recognize_manager_1 = __webpack_require__(49438);
var api_1 = __webpack_require__(69792);
config_1.Config.prototype.speechRecognize = {
    api: api_1.SpeechRecognition,
    sound: true,
    continuous: true,
    interimResults: true,
    commands: {
        'newline|enter': 'enter',
        'delete|remove word|delete word': 'backspaceWordButton',
        comma: 'inserthtml::,',
        underline: 'inserthtml::_',
        hyphen: 'inserthtml::-',
        space: 'inserthtml:: ',
        question: 'inserthtml::?',
        dot: 'inserthtml::.',
        'quote|quotes|open quote': "inserthtml::'",
        'header|header h1': 'formatblock::h1',
        'select all': 'selectall'
    }
};
icon_1.Icon.set('speech-recognize', __webpack_require__(90327));
config_1.Config.prototype.controls.speechRecognize = {
    isActive: function (jodit, _) {
        var api = (0, data_bind_1.dataBind)(jodit, 'speech');
        return Boolean(api === null || api === void 0 ? void 0 : api.isEnabled);
    },
    isDisabled: function (jodit) {
        return !jodit.o.speechRecognize.api;
    },
    exec: function (jodit, current, _a) {
        var button = _a.button, control = _a.control;
        var _b = jodit.o.speechRecognize, Api = _b.api, lang = _b.lang, continuous = _b.continuous, interimResults = _b.interimResults, sound = _b.sound;
        if (!Api) {
            jodit.alert('Speech recognize API unsupported in your browser');
            return;
        }
        var api = (0, data_bind_1.dataBind)(jodit, 'speech');
        if (!api) {
            var nativeApi = new Api();
            api = new recognize_manager_1.RecognizeManager(jodit.async, nativeApi);
            api.lang = lang;
            api.continuous = continuous;
            api.interimResults = interimResults;
            api.sound = sound;
            (0, data_bind_1.dataBind)(jodit, 'speech', api);
            api.on('pulse', function (enable) {
                button.setMod('pulse', enable);
            });
            api.on('result', function (text) {
                return jodit.e.fire('speechRecognizeResult', text);
            });
            api.on('progress', function (text) {
                return jodit.e.fire('speechRecognizeProgressResult', text);
            });
            button.hookStatus('beforeDestruct', function () {
                api.destruct();
            });
        }
        if (control.args) {
            var key = control.args[0];
            if ((0, is_boolean_1.isBoolean)(api[key])) {
                api[key] = !api[key];
                if (api.isEnabled) {
                    api.restart();
                }
                return;
            }
        }
        api.toggle();
        button.state.activated = api.isEnabled;
    },
    name: 'speechRecognize',
    command: 'toggleSpeechRecognize',
    tooltip: 'Speech Recognize',
    list: {
        sound: 'Sound',
        interimResults: 'Interim Results'
    },
    childTemplate: function (jodit, key, value) {
        var _a;
        var api = (0, data_bind_1.dataBind)(jodit, 'speech'), checked = (_a = api === null || api === void 0 ? void 0 : api[key]) !== null && _a !== void 0 ? _a : jodit.o.speechRecognize[key];
        return "<span class='jodit-speech-recognize__list-item'><input ".concat(checked ? 'checked' : '', " class='jodit-checkbox' type='checkbox'>&nbsp;").concat(value, "</span>");
    },
    mods: {
        stroke: false
    }
};


/***/ }),

/***/ 23420:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WARN = exports.PII = void 0;
exports.PII = 440;
exports.WARN = 940;


/***/ }),

/***/ 69792:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechRecognition = void 0;
exports.SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition;


/***/ }),

/***/ 64356:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.execSpellCommand = void 0;
var tslib_1 = __webpack_require__(20255);
function execSpellCommand(jodit, commandSentence) {
    var _a = tslib_1.__read(commandSentence.split('::'), 2), command = _a[0], value = _a[1];
    jodit.execCommand(command, null, value);
}
exports.execSpellCommand = execSpellCommand;


/***/ }),

/***/ 49438:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecognizeManager = void 0;
var tslib_1 = __webpack_require__(20255);
var eventify_1 = __webpack_require__(73852);
var decorators_1 = __webpack_require__(43441);
var sound_1 = __webpack_require__(1224);
var constants_1 = __webpack_require__(23420);
var RecognizeManager = (function (_super) {
    tslib_1.__extends(RecognizeManager, _super);
    function RecognizeManager(async, api) {
        var _this = _super.call(this) || this;
        _this.async = async;
        _this._continuous = false;
        _this._interimResults = false;
        _this.sound = true;
        _this._isEnabled = false;
        _this._restartTimeout = 0;
        _this._onSpeechStart = function (e) {
            if (!_this._isEnabled) {
                return;
            }
            _this.async.clearTimeout(_this._restartTimeout);
            _this._restartTimeout = _this.async.setTimeout(function () {
                _this.restart();
                _this.emit('pulse', false);
                _this._makeSound(constants_1.WARN);
            }, 5000);
            _this.emit('pulse', true);
        };
        _this._progressTimeout = 0;
        _this._api = api;
        RecognizeManager_1._instances.add(_this);
        return _this;
    }
    RecognizeManager_1 = RecognizeManager;
    Object.defineProperty(RecognizeManager.prototype, "lang", {
        get: function () {
            return this._lang;
        },
        set: function (v) {
            this._lang = v;
            this._api.lang = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizeManager.prototype, "continuous", {
        get: function () {
            return this._continuous;
        },
        set: function (v) {
            this._continuous = v;
            this._api.continuous = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizeManager.prototype, "interimResults", {
        get: function () {
            return this._interimResults;
        },
        set: function (v) {
            this._interimResults = v;
            this._api.interimResults = v;
        },
        enumerable: false,
        configurable: true
    });
    RecognizeManager.prototype.destruct = function () {
        this.stop();
        RecognizeManager_1._instances.delete(this);
        _super.prototype.destruct.call(this);
    };
    Object.defineProperty(RecognizeManager.prototype, "isEnabled", {
        get: function () {
            return this._isEnabled;
        },
        enumerable: false,
        configurable: true
    });
    RecognizeManager.prototype.start = function () {
        var _this = this;
        if (this._isEnabled) {
            return;
        }
        this._isEnabled = true;
        RecognizeManager_1._instances.forEach(function (instance) {
            if (instance !== _this) {
                instance.stop();
            }
        });
        this._api.start();
        this.__on('speechstart', this._onSpeechStart)
            .__on('error', this._onError)
            .__on('result', this._onResult);
    };
    RecognizeManager.prototype.stop = function () {
        if (!this._isEnabled) {
            return;
        }
        try {
            this._api.abort();
            this._api.stop();
        }
        catch (_a) { }
        this.__off('speechstart', this._onSpeechStart)
            .__off('error', this._onError)
            .__off('result', this._onResult);
        this.async.clearTimeout(this._restartTimeout);
        this._isEnabled = false;
        this.emit('pulse', false);
    };
    RecognizeManager.prototype.toggle = function () {
        if (!this._isEnabled) {
            this.start();
        }
        else {
            this.stop();
        }
    };
    RecognizeManager.prototype.restart = function () {
        this.stop();
        this.start();
    };
    RecognizeManager.prototype.__on = function (event, callback) {
        this._api.addEventListener(event, callback);
        return this;
    };
    RecognizeManager.prototype.__off = function (event, callback) {
        this._api.removeEventListener(event, callback);
        return this;
    };
    RecognizeManager.prototype._onResult = function (e) {
        var _this = this;
        if (!this._isEnabled) {
            return;
        }
        this.async.clearTimeout(this._progressTimeout);
        var resultItem = e.results.item(e.resultIndex);
        var transcript = resultItem.item(0).transcript;
        var resultHandler = function () {
            try {
                _this.async.clearTimeout(_this._restartTimeout);
                _this.emit('result', transcript);
            }
            catch (_a) { }
            _this.restart();
            _this.emit('pulse', false);
            _this._makeSound(constants_1.PII);
        };
        if (resultItem.isFinal === false) {
            this.emit('progress', transcript);
            this._progressTimeout = this.async.setTimeout(resultHandler, 500);
            return;
        }
        resultHandler();
    };
    RecognizeManager.prototype._onError = function () {
        if (!this._isEnabled) {
            return;
        }
        this._makeSound(constants_1.WARN);
        this.emit('pulse', false);
        this.restart();
    };
    RecognizeManager.prototype._makeSound = function (frequency) {
        if (this.sound) {
            (0, sound_1.sound)({ frequency: frequency });
        }
    };
    var RecognizeManager_1;
    RecognizeManager._instances = new Set();
    RecognizeManager = RecognizeManager_1 = tslib_1.__decorate([
        decorators_1.autobind
    ], RecognizeManager);
    return RecognizeManager;
}(eventify_1.Eventify));
exports.RecognizeManager = RecognizeManager;


/***/ }),

/***/ 1224:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sound = void 0;
var constants_1 = __webpack_require__(23420);
function sound(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.sec, sec = _c === void 0 ? 0.1 : _c, _d = _b.frequency, frequency = _d === void 0 ? constants_1.PII : _d, _e = _b.gain, gain = _e === void 0 ? 0.1 : _e, _f = _b.type, type = _f === void 0 ? 'sine' : _f;
    if (typeof window.AudioContext === 'undefined' &&
        typeof window.webkitAudioContext === 'undefined') {
        return;
    }
    var context = new (window.AudioContext ||
        window.webkitAudioContext)();
    var vol = context.createGain();
    var osc = context.createOscillator();
    osc.type = type;
    osc.frequency.value = frequency;
    osc.connect(vol);
    vol.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + sec);
    vol.gain.value = gain;
}
exports.sound = sound;


/***/ }),

/***/ 79177:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zh_tw = exports.zh_cn = exports.tr = exports.ru = exports.pt_br = exports.pl = exports.nl = exports.mn = exports.ko = exports.ja = exports.it = exports.id = exports.hu = exports.he = exports.fr = exports.fa = exports.es = exports.de = exports.cs_cz = exports.ar = void 0;
var ar = __webpack_require__(5466);
exports.ar = ar;
var cs_cz = __webpack_require__(65226);
exports.cs_cz = cs_cz;
var de = __webpack_require__(87541);
exports.de = de;
var es = __webpack_require__(87104);
exports.es = es;
var fa = __webpack_require__(53808);
exports.fa = fa;
var fr = __webpack_require__(48954);
exports.fr = fr;
var he = __webpack_require__(14694);
exports.he = he;
var hu = __webpack_require__(67381);
exports.hu = hu;
var id = __webpack_require__(99549);
exports.id = id;
var it = __webpack_require__(28428);
exports.it = it;
var ja = __webpack_require__(25363);
exports.ja = ja;
var ko = __webpack_require__(96929);
exports.ko = ko;
var mn = __webpack_require__(26781);
exports.mn = mn;
var nl = __webpack_require__(58499);
exports.nl = nl;
var pl = __webpack_require__(59430);
exports.pl = pl;
var pt_br = __webpack_require__(70297);
exports.pt_br = pt_br;
var ru = __webpack_require__(98949);
exports.ru = ru;
var tr = __webpack_require__(61232);
exports.tr = tr;
var zh_cn = __webpack_require__(56775);
exports.zh_cn = zh_cn;
var zh_tw = __webpack_require__(97957);
exports.zh_tw = zh_tw;


/***/ }),

/***/ 69045:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechRecognizeNative = void 0;
var tslib_1 = __webpack_require__(20255);
__webpack_require__(57368);
var plugin_1 = __webpack_require__(57549);
var watch_1 = __webpack_require__(46163);
var utils_1 = __webpack_require__(67309);
var global_1 = __webpack_require__(17332);
var dom_1 = __webpack_require__(24263);
var debounce_1 = __webpack_require__(55773);
var exec_spell_command_1 = __webpack_require__(64356);
__webpack_require__(71235);
var SpeechRecognizeNative = (function (_super) {
    tslib_1.__extends(SpeechRecognizeNative, _super);
    function SpeechRecognizeNative(j) {
        var _this = _super.call(this, j) || this;
        _this._commandToWord = {};
        if (j.o.speechRecognize.api) {
            j.registerButton({
                group: 'state',
                name: 'speechRecognize'
            });
        }
        return _this;
    }
    SpeechRecognizeNative.prototype.afterInit = function (jodit) {
        var _this = this;
        var commands = jodit.o.speechRecognize.commands;
        if (commands) {
            (0, global_1.extendLang)(__webpack_require__(79177));
            (0, utils_1.keys)(commands, false).forEach(function (words) {
                var keys = words.split('|');
                keys.forEach(function (key) {
                    key = key.trim().toLowerCase();
                    _this._commandToWord[key] = commands[words];
                    var translatedKeys = jodit.i18n(key);
                    if (translatedKeys !== key) {
                        translatedKeys.split('|').forEach(function (translatedKey) {
                            _this._commandToWord[translatedKey.trim().toLowerCase()] = commands[words].trim();
                        });
                    }
                });
            });
        }
    };
    SpeechRecognizeNative.prototype.beforeDestruct = function (jodit) { };
    SpeechRecognizeNative.prototype.onSpeechRecognizeProgressResult = function (text) {
        var _this = this;
        if (!this.messagePopup) {
            this.messagePopup = this.j.create.div('jodit-speech-recognize__popup');
        }
        this.j.workplace.appendChild(this.messagePopup);
        this.j.async.setTimeout(function () {
            dom_1.Dom.safeRemove(_this.messagePopup);
        }, {
            label: 'onSpeechRecognizeProgressResult',
            timeout: 1000
        });
        this.messagePopup.innerText = text + '|';
    };
    SpeechRecognizeNative.prototype.onSpeechRecognizeResult = function (text) {
        var j = this.j, s = j.s;
        dom_1.Dom.safeRemove(this.messagePopup);
        if (!this._checkCommand(text)) {
            var range = s.range, node = s.current();
            if (s.isCollapsed() &&
                dom_1.Dom.isText(node) &&
                dom_1.Dom.isOrContains(j.editor, node) &&
                node.nodeValue) {
                var sentence = node.nodeValue;
                node.nodeValue =
                    sentence +
                        (/[\u00A0 ]\uFEFF*$/.test(sentence) ? '' : ' ') +
                        text;
                range.setStartAfter(node);
                s.selectRange(range);
                j.synchronizeValues();
            }
            else {
                s.insertHTML(text);
            }
        }
    };
    SpeechRecognizeNative.prototype._checkCommand = function (command) {
        command = command.toLowerCase().replace(/\./g, '');
        if (this._commandToWord[command]) {
            (0, exec_spell_command_1.execSpellCommand)(this.j, this._commandToWord[command]);
            return true;
        }
        return false;
    };
    tslib_1.__decorate([
        (0, watch_1.watch)(':speechRecognizeProgressResult'),
        (0, debounce_1.debounce)()
    ], SpeechRecognizeNative.prototype, "onSpeechRecognizeProgressResult", null);
    tslib_1.__decorate([
        (0, watch_1.watch)(':speechRecognizeResult')
    ], SpeechRecognizeNative.prototype, "onSpeechRecognizeResult", null);
    return SpeechRecognizeNative;
}(plugin_1.Plugin));
exports.SpeechRecognizeNative = SpeechRecognizeNative;
if (typeof Jodit !== 'undefined') {
    Jodit.plugins.add('speech-recognize', SpeechRecognizeNative);
}


/***/ }),

/***/ 5466:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'الخط الجديد',
	delete: 'حذف',
	space: 'الفضاء',
	'Speech Recognize': 'التعرف على الكلام',
	Sound: 'الصوت',
	'Interim Results': 'النتائج المؤقتة'
};


/***/ }),

/***/ 65226:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'řádek',
	delete: 'odstranit',
	space: 'prostora',
	'Speech Recognize': 'Rozpoznání Řeči',
	Sound: 'Zvuk',
	'Interim Results': 'Průběžné Výsledky'
};


/***/ }),

/***/ 87541:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'Zeilenumbruch',
	delete: 'löschen',
	space: 'Raum',
	'Speech Recognize': 'Sprache Erkennen',
	Sound: 'Sound',
	'Interim Results': 'Zwischenergebnis'
};


/***/ }),

/***/ 87104:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'nueva línea',
	delete: 'eliminar',
	space: 'espacio',
	'Speech Recognize': 'Reconocimiento de Voz',
	Sound: 'Sonido',
	'Interim Results': 'Resultados Provisionales'
};


/***/ }),

/***/ 53808:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'خط جدید',
	delete: 'حذف',
	space: 'فضا',
	'Speech Recognize': 'گفتار را تشخیص دهید',
	Sound: 'صدا',
	'Interim Results': 'نتایج موقت'
};


/***/ }),

/***/ 48954:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'nouvelle ligne',
	delete: 'supprimer',
	space: 'espace',
	'Speech Recognize': 'Reconnaissance Vocale',
	Sound: 'Son',
	'Interim Results': 'Résultats Intermédiaires'
};


/***/ }),

/***/ 14694:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'חדשות',
	delete: 'מחק',
	space: 'שטח',
	'Speech Recognize': 'דיבור מזהה',
	Sound: 'קול',
	'Interim Results': 'תוצאות ביניים'
};


/***/ }),

/***/ 67381:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'újsor',
	delete: 'törlés',
	space: 'tér',
	'Speech Recognize': 'A Beszéd Felismeri',
	Sound: 'Hang',
	'Interim Results': 'Időközi Eredmények'
};


/***/ }),

/***/ 99549:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'newline',
	delete: 'Hapus',
	space: 'ruang',
	'Speech Recognize': 'Pidato Mengenali',
	Sound: 'Suara',
	'Interim Results': 'Hasil Sementara'
};


/***/ }),

/***/ 28428:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'nuova riga',
	delete: 'eliminare',
	space: 'spazio',
	'Speech Recognize': 'Discorso Riconoscere',
	Sound: 'Suono',
	'Interim Results': 'Risultati intermedi'
};


/***/ }),

/***/ 25363:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: '改行',
	delete: '削除',
	space: 'スペース',
	'Speech Recognize': '音声認識',
	Sound: '音',
	'Interim Results': '中間結果'
};


/***/ }),

/***/ 96929:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: '줄 바꿈',
	delete: '삭제',
	space: '공간',
	'Speech Recognize': '음성 인식',
	Sound: '소리',
	'Interim Results': '중간 결과'
};


/***/ }),

/***/ 26781:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'Шинэ мөр',
	delete: 'Устгах',
	space: 'Зай',
	'Speech Recognize': 'Дуу хоолой таних',
	Sound: 'Дуу',
	'Interim Results': 'Түр зуурын үр дүн'
};


/***/ }),

/***/ 58499:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'regel',
	delete: 'verwijderen',
	space: 'ruimte',
	'Speech Recognize': 'Spraak Herkennen',
	Sound: 'Geluid',
	'Interim Results': 'Tussentijdse Resultaten'
};


/***/ }),

/***/ 59430:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'newline',
	delete: 'usunąć',
	space: 'przestrzeń',
	'Speech Recognize': 'Rozpoznawanie Mowy',
	Sound: 'Dźwięk',
	'Interim Results': 'Wyniki Okresowe'
};


/***/ }),

/***/ 70297:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'linha',
	delete: 'excluir',
	space: 'espaco',
	'Speech Recognize': 'Discurso Reconhecer',
	Sound: 'Som',
	'Interim Results': 'Resultados Provisórios'
};


/***/ }),

/***/ 98949:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'новая строка|перенос|энтер',
	delete: 'удалить',
	space: 'пробел',
	'Speech Recognize': 'Распознавание речи',
	Sound: 'Звук',
	'Interim Results': 'Промежуточные результаты'
};


/***/ }),

/***/ 61232:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'yeni satır',
	delete: 'silmek',
	space: 'uzay',
	'Speech Recognize': 'Konuşma Tanıma',
	Sound: 'Ses',
	'Interim Results': 'Ara Sonuçlar'
};


/***/ }),

/***/ 56775:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: '新行',
	delete: '删除',
	space: '空间',
	'Speech Recognize': '言语识别',
	Sound: '声音',
	'Interim Results': '中期业绩'
};


/***/ }),

/***/ 97957:
/***/ (function(module) {

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

module.exports = {
	newline: 'นิวไลน์',
	delete: 'ลบ',
	space: 'พื้นที่',
	'Speech Recognize': 'การรับรู้คำพูด',
	Sound: 'เสียง',
	'Interim Results': 'ผลระหว่างกาล'
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(69045));
/******/ return __webpack_exports__;
/******/ }
]);
});