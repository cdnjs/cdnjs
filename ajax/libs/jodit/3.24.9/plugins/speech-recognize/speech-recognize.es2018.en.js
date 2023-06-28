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

/***/ 79177:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ar": function() { return /* binding */ ar; },
/* harmony export */   "cs_cz": function() { return /* binding */ cs_cz; },
/* harmony export */   "de": function() { return /* binding */ de; },
/* harmony export */   "es": function() { return /* binding */ es; },
/* harmony export */   "fa": function() { return /* binding */ fa; },
/* harmony export */   "fr": function() { return /* binding */ fr; },
/* harmony export */   "he": function() { return /* binding */ he; },
/* harmony export */   "hu": function() { return /* binding */ hu; },
/* harmony export */   "id": function() { return /* binding */ id; },
/* harmony export */   "it": function() { return /* binding */ it; },
/* harmony export */   "ja": function() { return /* binding */ ja; },
/* harmony export */   "ko": function() { return /* binding */ ko; },
/* harmony export */   "mn": function() { return /* binding */ mn; },
/* harmony export */   "nl": function() { return /* binding */ nl; },
/* harmony export */   "pl": function() { return /* binding */ pl; },
/* harmony export */   "pt_br": function() { return /* binding */ pt_br; },
/* harmony export */   "ru": function() { return /* binding */ ru; },
/* harmony export */   "tr": function() { return /* binding */ tr; },
/* harmony export */   "zh_cn": function() { return /* binding */ zh_cn; },
/* harmony export */   "zh_tw": function() { return /* binding */ zh_tw; }
/* harmony export */ });
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
const ar = __webpack_require__(5466);
const cs_cz = __webpack_require__(65226);
const de = __webpack_require__(87541);
const es = __webpack_require__(87104);
const fa = __webpack_require__(53808);
const fr = __webpack_require__(48954);
const he = __webpack_require__(14694);
const hu = __webpack_require__(67381);
const id = __webpack_require__(99549);
const it = __webpack_require__(28428);
const ja = __webpack_require__(25363);
const ko = __webpack_require__(96929);
const mn = __webpack_require__(26781);
const nl = __webpack_require__(58499);
const pl = __webpack_require__(59430);
const pt_br = __webpack_require__(70297);
const ru = __webpack_require__(98949);
const tr = __webpack_require__(61232);
const zh_cn = __webpack_require__(56775);
const zh_tw = __webpack_require__(97957);



/***/ }),

/***/ 87552:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "SpeechRecognizeNative": function() { return /* binding */ SpeechRecognizeNative; }
});

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(20255);
// EXTERNAL MODULE: ./src/core/plugin/index.ts
var core_plugin = __webpack_require__(57549);
// EXTERNAL MODULE: ./src/core/decorators/watch/watch.ts
var watch = __webpack_require__(46163);
// EXTERNAL MODULE: ./src/core/helpers/utils/utils.ts
var utils = __webpack_require__(67309);
// EXTERNAL MODULE: ./src/core/global.ts
var global = __webpack_require__(17332);
// EXTERNAL MODULE: ./src/core/dom/dom.ts
var dom = __webpack_require__(24263);
// EXTERNAL MODULE: ./src/core/decorators/debounce/debounce.ts
var debounce = __webpack_require__(55773);
;// CONCATENATED MODULE: ./src/plugins/speech-recognize/helpers/exec-spell-command.ts
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
function execSpellCommand(jodit, commandSentence) {
    const [command, value] = commandSentence.split('::');
    jodit.execCommand(command, null, value);
}

// EXTERNAL MODULE: ./src/config.ts
var config = __webpack_require__(93166);
// EXTERNAL MODULE: ./src/core/helpers/utils/data-bind.ts
var data_bind = __webpack_require__(63122);
// EXTERNAL MODULE: ./src/core/helpers/checker/is-boolean.ts
var is_boolean = __webpack_require__(67749);
// EXTERNAL MODULE: ./src/core/ui/icon.ts
var icon = __webpack_require__(77904);
// EXTERNAL MODULE: ./src/core/event-emitter/eventify.ts
var eventify = __webpack_require__(73852);
// EXTERNAL MODULE: ./src/core/decorators/index.ts + 8 modules
var decorators = __webpack_require__(67493);
;// CONCATENATED MODULE: ./src/plugins/speech-recognize/constants.ts
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
const PII = 440;
const WARN = 940;

;// CONCATENATED MODULE: ./src/plugins/speech-recognize/helpers/sound.ts
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

function sound({ sec = 0.1, frequency = PII, gain = 0.1, type = 'sine' } = {}) {
    if (typeof window.AudioContext === 'undefined' &&
        typeof window.webkitAudioContext === 'undefined') {
        return;
    }
    const context = new (window.AudioContext ||
        window.webkitAudioContext)();
    const vol = context.createGain();
    const osc = context.createOscillator();
    osc.type = type;
    osc.frequency.value = frequency;
    osc.connect(vol);
    vol.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + sec);
    vol.gain.value = gain;
}

;// CONCATENATED MODULE: ./src/plugins/speech-recognize/helpers/recognize-manager.ts
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
var RecognizeManager_1;





let RecognizeManager = RecognizeManager_1 = class RecognizeManager extends eventify/* Eventify */.a {
    set lang(v) {
        this._lang = v;
        this._api.lang = v;
    }
    get lang() {
        return this._lang;
    }
    set continuous(v) {
        this._continuous = v;
        this._api.continuous = v;
    }
    get continuous() {
        return this._continuous;
    }
    set interimResults(v) {
        this._interimResults = v;
        this._api.interimResults = v;
    }
    get interimResults() {
        return this._interimResults;
    }
    constructor(async, api) {
        super();
        this.async = async;
        this._continuous = false;
        this._interimResults = false;
        this.sound = true;
        this._isEnabled = false;
        this._restartTimeout = 0;
        this._onSpeechStart = (e) => {
            if (!this._isEnabled) {
                return;
            }
            this.async.clearTimeout(this._restartTimeout);
            this._restartTimeout = this.async.setTimeout(() => {
                this.restart();
                this.emit('pulse', false);
                this._makeSound(WARN);
            }, 5000);
            this.emit('pulse', true);
        };
        this._progressTimeout = 0;
        this._api = api;
        RecognizeManager_1._instances.add(this);
    }
    destruct() {
        this.stop();
        RecognizeManager_1._instances.delete(this);
        super.destruct();
    }
    get isEnabled() {
        return this._isEnabled;
    }
    start() {
        if (this._isEnabled) {
            return;
        }
        this._isEnabled = true;
        RecognizeManager_1._instances.forEach(instance => {
            if (instance !== this) {
                instance.stop();
            }
        });
        this._api.start();
        this.__on('speechstart', this._onSpeechStart)
            .__on('error', this._onError)
            .__on('result', this._onResult);
    }
    stop() {
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
    }
    toggle() {
        if (!this._isEnabled) {
            this.start();
        }
        else {
            this.stop();
        }
    }
    restart() {
        this.stop();
        this.start();
    }
    __on(event, callback) {
        this._api.addEventListener(event, callback);
        return this;
    }
    __off(event, callback) {
        this._api.removeEventListener(event, callback);
        return this;
    }
    _onResult(e) {
        if (!this._isEnabled) {
            return;
        }
        this.async.clearTimeout(this._progressTimeout);
        const resultItem = e.results.item(e.resultIndex);
        const { transcript } = resultItem.item(0);
        const resultHandler = () => {
            try {
                this.async.clearTimeout(this._restartTimeout);
                this.emit('result', transcript);
            }
            catch (_a) { }
            this.restart();
            this.emit('pulse', false);
            this._makeSound(PII);
        };
        if (resultItem.isFinal === false) {
            this.emit('progress', transcript);
            this._progressTimeout = this.async.setTimeout(resultHandler, 500);
            return;
        }
        resultHandler();
    }
    _onError() {
        if (!this._isEnabled) {
            return;
        }
        this._makeSound(WARN);
        this.emit('pulse', false);
        this.restart();
    }
    _makeSound(frequency) {
        if (this.sound) {
            sound({ frequency });
        }
    }
};
RecognizeManager._instances = new Set();
RecognizeManager = RecognizeManager_1 = (0,tslib_es6/* __decorate */.gn)([
    decorators.autobind
], RecognizeManager);


;// CONCATENATED MODULE: ./src/plugins/speech-recognize/helpers/api.ts
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
const SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition;

;// CONCATENATED MODULE: ./src/plugins/speech-recognize/config.ts
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */






config/* Config.prototype.speechRecognize */.D.prototype.speechRecognize = {
    api: SpeechRecognition,
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
icon/* Icon.set */.J.set('speech-recognize', __webpack_require__(90327));
config/* Config.prototype.controls.speechRecognize */.D.prototype.controls.speechRecognize = {
    isActive(jodit, _) {
        const api = (0,data_bind/* dataBind */.q)(jodit, 'speech');
        return Boolean(api === null || api === void 0 ? void 0 : api.isEnabled);
    },
    isDisabled(jodit) {
        return !jodit.o.speechRecognize.api;
    },
    exec(jodit, current, { button, control }) {
        const { api: Api, lang, continuous, interimResults, sound } = jodit.o.speechRecognize;
        if (!Api) {
            jodit.alert('Speech recognize API unsupported in your browser');
            return;
        }
        let api = (0,data_bind/* dataBind */.q)(jodit, 'speech');
        if (!api) {
            const nativeApi = new Api();
            api = new RecognizeManager(jodit.async, nativeApi);
            api.lang = lang;
            api.continuous = continuous;
            api.interimResults = interimResults;
            api.sound = sound;
            (0,data_bind/* dataBind */.q)(jodit, 'speech', api);
            api.on('pulse', (enable) => {
                button.setMod('pulse', enable);
            });
            api.on('result', (text) => jodit.e.fire('speechRecognizeResult', text));
            api.on('progress', (text) => jodit.e.fire('speechRecognizeProgressResult', text));
            button.hookStatus('beforeDestruct', () => {
                api.destruct();
            });
        }
        if (control.args) {
            const key = control.args[0];
            if ((0,is_boolean/* isBoolean */.j)(api[key])) {
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
    childTemplate(jodit, key, value) {
        var _a;
        const api = (0,data_bind/* dataBind */.q)(jodit, 'speech'), checked = (_a = api === null || api === void 0 ? void 0 : api[key]) !== null && _a !== void 0 ? _a : jodit.o.speechRecognize[key];
        return `<span class='jodit-speech-recognize__list-item'><input ${checked ? 'checked' : ''} class='jodit-checkbox' type='checkbox'>&nbsp;${value}</span>`;
    },
    mods: {
        stroke: false
    }
};

;// CONCATENATED MODULE: ./src/plugins/speech-recognize/speech-recognize.ts
/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */










class SpeechRecognizeNative extends core_plugin/* Plugin */.S {
    constructor(j) {
        super(j);
        this._commandToWord = {};
        if (j.o.speechRecognize.api) {
            j.registerButton({
                group: 'state',
                name: 'speechRecognize'
            });
        }
    }
    afterInit(jodit) {
        const { commands } = jodit.o.speechRecognize;
        if (commands) {
            (0,global/* extendLang */.xl)(__webpack_require__(79177));
            (0,utils/* keys */.XP)(commands, false).forEach(words => {
                const keys = words.split('|');
                keys.forEach(key => {
                    key = key.trim().toLowerCase();
                    this._commandToWord[key] = commands[words];
                    const translatedKeys = jodit.i18n(key);
                    if (translatedKeys !== key) {
                        translatedKeys.split('|').forEach(translatedKey => {
                            this._commandToWord[translatedKey.trim().toLowerCase()] = commands[words].trim();
                        });
                    }
                });
            });
        }
    }
    beforeDestruct(jodit) { }
    onSpeechRecognizeProgressResult(text) {
        if (!this.messagePopup) {
            this.messagePopup = this.j.create.div('jodit-speech-recognize__popup');
        }
        this.j.workplace.appendChild(this.messagePopup);
        this.j.async.setTimeout(() => {
            dom/* Dom.safeRemove */.i.safeRemove(this.messagePopup);
        }, {
            label: 'onSpeechRecognizeProgressResult',
            timeout: 1000
        });
        this.messagePopup.innerText = text + '|';
    }
    onSpeechRecognizeResult(text) {
        const { j } = this, { s } = j;
        dom/* Dom.safeRemove */.i.safeRemove(this.messagePopup);
        if (!this._checkCommand(text)) {
            const { range } = s, node = s.current();
            if (s.isCollapsed() &&
                dom/* Dom.isText */.i.isText(node) &&
                dom/* Dom.isOrContains */.i.isOrContains(j.editor, node) &&
                node.nodeValue) {
                const sentence = node.nodeValue;
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
    }
    _checkCommand(command) {
        command = command.toLowerCase().replace(/\./g, '');
        if (this._commandToWord[command]) {
            execSpellCommand(this.j, this._commandToWord[command]);
            return true;
        }
        return false;
    }
}
(0,tslib_es6/* __decorate */.gn)([
    (0,watch/* watch */.YP)(':speechRecognizeProgressResult'),
    (0,debounce/* debounce */.D)()
], SpeechRecognizeNative.prototype, "onSpeechRecognizeProgressResult", null);
(0,tslib_es6/* __decorate */.gn)([
    (0,watch/* watch */.YP)(':speechRecognizeResult')
], SpeechRecognizeNative.prototype, "onSpeechRecognizeResult", null);
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
/******/ var __webpack_exports__ = (__webpack_exec__(87552));
/******/ return __webpack_exports__;
/******/ }
]);
});