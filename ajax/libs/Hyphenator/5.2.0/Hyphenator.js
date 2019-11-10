/** @license Hyphenator 5.2.0 - client side hyphenation for webbrowsers
 *  Copyright (C) 2017  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 *  https://github.com/mnater/Hyphenator
 *
 *  Released under the MIT license
 *  http://mnater.github.io/Hyphenator/LICENSE.txt
 */

/*
 * Comments are jsdoc3 formatted. See http://usejsdoc.org
 * Use mergeAndPack.html to get rid of the comments and to reduce the file size of this script!
 */

/* The following comment is for JSLint: */
/*jslint browser: true, multivar: true, single: true*/
/*global Hyphenator window*/

/**
 * @desc Provides all functionality to do hyphenation, except the patterns that are loaded externally
 * @global
 * @namespace Hyphenator
 * @author Mathias Nater, <mathias@mnn.ch>
 * @version 5.2.0
 * @example
 * &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
 * &lt;script type = "text/javascript"&gt;
 *   Hyphenator.run();
 * &lt;/script&gt;
 */
var Hyphenator;
Hyphenator = (function (window) {
    'use strict';

    /**
     * @member Hyphenator~contextWindow
     * @access private
     * @desc
     * contextWindow stores the window for the actual document to be hyphenated.
     * If there are frames this will change.
     * So use contextWindow instead of window!
     */
    var contextWindow = window;


    /**
     * @member {Object.<string, Hyphenator~supportedLangs~supportedLanguage>} Hyphenator~supportedLangs
     * @desc
     * A generated key-value object that stores supported languages and meta data.
     * The key is the {@link http://tools.ietf.org/rfc/bcp/bcp47.txt bcp47} code of the language and the value
     * is an object of type {@link Hyphenator~supportedLangs~supportedLanguage}
     * @namespace Hyphenator~supportedLangs
     * @access private
     * //Check if language lang is supported:
     * if (supportedLangs.hasOwnProperty(lang))
     */
    var supportedLangs = (function () {
        /**
         * @typedef {Object} Hyphenator~supportedLangs~supportedLanguage
         * @property {string} file - The name of the pattern file
         * @property {number} script - The script type of the language (e.g. 'latin' for english), this type is abbreviated by an id
         * @property {string} prompt - The sentence prompted to the user, if Hyphenator.js doesn't find a language hint
         */

        /**
         * @lends Hyphenator~supportedLangs
         */
        var r = {},
            /**
             * @method Hyphenator~supportedLangs~o
             * @desc
             * Sets a value of Hyphenator~supportedLangs
             * @access protected
             * @param {string} code The {@link http://tools.ietf.org/rfc/bcp/bcp47.txt bcp47} code of the language
             * @param {string} file The name of the pattern file
             * @param {Number} script A shortcut for a specific script: latin:0, cyrillic: 1, arabic: 2, armenian:3, bengali: 4, devangari: 5, greek: 6
             * gujarati: 7, kannada: 8, lao: 9, malayalam: 10, oriya: 11, persian: 12, punjabi: 13, tamil: 14, telugu: 15, georgian: 16
             * @param {string} prompt The sentence prompted to the user, if Hyphenator.js doesn't find a language hint
             */
            o = function (code, file, script, prompt) {
                r[code] = {'file': file, 'script': script, 'prompt': prompt};
            };

        o('be', 'be.js', 1, 'Мова гэтага сайта не можа быць вызначаны аўтаматычна. Калі ласка пакажыце мову:');
        o('ca', 'ca.js', 0, '');
        o('cs', 'cs.js', 0, 'Jazyk této internetové stránky nebyl automaticky rozpoznán. Určete prosím její jazyk:');
        o('cu', 'cu.js', 1, 'Ꙗ҆зы́къ сегѡ̀ са́йта не мо́жетъ ѡ҆предѣле́нъ бы́ти. Прошꙋ́ тѧ ᲂу҆каза́ти ꙗ҆зы́къ:');
        o('da', 'da.js', 0, 'Denne websides sprog kunne ikke bestemmes. Angiv venligst sprog:');
        o('bn', 'bn.js', 4, '');
        o('de', 'de.js', 0, 'Die Sprache dieser Webseite konnte nicht automatisch bestimmt werden. Bitte Sprache angeben:');
        o('el', 'el-monoton.js', 6, '');
        o('el-monoton', 'el-monoton.js', 6, '');
        o('el-polyton', 'el-polyton.js', 6, '');
        o('en', 'en-us.js', 0, 'The language of this website could not be determined automatically. Please indicate the main language:');
        o('en-gb', 'en-gb.js', 0, 'The language of this website could not be determined automatically. Please indicate the main language:');
        o('en-us', 'en-us.js', 0, 'The language of this website could not be determined automatically. Please indicate the main language:');
        o('eo', 'eo.js', 0, 'La lingvo de ĉi tiu retpaĝo ne rekoneblas aŭtomate. Bonvolu indiki ĝian ĉeflingvon:');
        o('es', 'es.js', 0, 'El idioma del sitio no pudo determinarse autom%E1ticamente. Por favor, indique el idioma principal:');
        o('et', 'et.js', 0, 'Veebilehe keele tuvastamine ebaõnnestus, palun valige kasutatud keel:');
        o('fi', 'fi.js', 0, 'Sivun kielt%E4 ei tunnistettu automaattisesti. M%E4%E4rit%E4 sivun p%E4%E4kieli:');
        o('fr', 'fr.js', 0, 'La langue de ce site n%u2019a pas pu %EAtre d%E9termin%E9e automatiquement. Veuillez indiquer une langue, s.v.p.%A0:');
        o('ga', 'ga.js', 0, 'Níorbh fhéidir teanga an tsuímh a fháil go huathoibríoch. Cuir isteach príomhtheanga an tsuímh:');
        o('grc', 'grc.js', 6, '');
        o('gu', 'gu.js', 7, '');
        o('hi', 'hi.js', 5, '');
        o('hu', 'hu.js', 0, 'A weboldal nyelvét nem sikerült automatikusan megállapítani. Kérem adja meg a nyelvet:');
        o('hy', 'hy.js', 3, 'Չհաջողվեց հայտնաբերել այս կայքի լեզուն։ Խնդրում ենք նշեք հիմնական լեզուն՝');
        o('it', 'it.js', 0, 'Lingua del sito sconosciuta. Indicare una lingua, per favore:');
        o('ka', 'ka.js', 16, '');
        o('kn', 'kn.js', 8, 'ಜಾಲ ತಾಣದ ಭಾಷೆಯನ್ನು ನಿರ್ಧರಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮುಖ್ಯ ಭಾಷೆಯನ್ನು ಸೂಚಿಸಿ:');
        o('la', 'la.js', 0, '');
        o('lt', 'lt.js', 0, 'Nepavyko automatiškai nustatyti šios svetainės kalbos. Prašome įvesti kalbą:');
        o('lv', 'lv.js', 0, 'Šīs lapas valodu nevarēja noteikt automātiski. Lūdzu norādiet pamata valodu:');
        o('ml', 'ml.js', 10, 'ഈ വെ%u0D2C%u0D4D%u200Cസൈറ്റിന്റെ ഭാഷ കണ്ടുപിടിയ്ക്കാ%u0D28%u0D4D%u200D കഴിഞ്ഞില്ല. ഭാഷ ഏതാണെന്നു തിരഞ്ഞെടുക്കുക:');
        o('nb', 'nb-no.js', 0, 'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');
        o('no', 'nb-no.js', 0, 'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');
        o('nb-no', 'nb-no.js', 0, 'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');
        o('nl', 'nl.js', 0, 'De taal van deze website kan niet automatisch worden bepaald. Geef de hoofdtaal op:');
        o('or', 'or.js', 11, '');
        o('pa', 'pa.js', 13, '');
        o('pl', 'pl.js', 0, 'Języka tej strony nie można ustalić automatycznie. Proszę wskazać język:');
        o('pt', 'pt.js', 0, 'A língua deste site não pôde ser determinada automaticamente. Por favor indique a língua principal:');
        o('ru', 'ru.js', 1, 'Язык этого сайта не может быть определен автоматически. Пожалуйста укажите язык:');
        o('sk', 'sk.js', 0, '');
        o('sl', 'sl.js', 0, 'Jezika te spletne strani ni bilo mogoče samodejno določiti. Prosim navedite jezik:');
        o('sr-cyrl', 'sr-cyrl.js', 1, 'Језик овог сајта није детектован аутоматски. Молим вас наведите језик:');
        o('sr-latn', 'sr-latn.js', 0, 'Jezika te spletne strani ni bilo mogoče samodejno določiti. Prosim navedite jezik:');
        o('sv', 'sv.js', 0, 'Spr%E5ket p%E5 den h%E4r webbplatsen kunde inte avg%F6ras automatiskt. V%E4nligen ange:');
        o('ta', 'ta.js', 14, '');
        o('te', 'te.js', 15, '');
        o('tr', 'tr.js', 0, 'Bu web sitesinin dili otomatik olarak tespit edilememiştir. Lütfen dökümanın dilini seçiniz%A0:');
        o('uk', 'uk.js', 1, 'Мова цього веб-сайту не може бути визначена автоматично. Будь ласка, вкажіть головну мову:');
        o('ro', 'ro.js', 0, 'Limba acestui sit nu a putut fi determinată automat. Alege limba principală:');

        return r;
    }());



    /**
     * @member {Object} Hyphenator~locality
     * @desc
     * An object storing isBookmarklet, basePath and isLocal
     * @access private
     * @see {@link Hyphenator~loadPatterns}
     */
    var locality = (function getLocality() {
        var r = {
            isBookmarklet: false,
            basePath: "//mnater.github.io/Hyphenator/",
            isLocal: false
        };
        var fullPath;
        function getBasePath(path) {
            return path.substring(0, path.lastIndexOf("/") + 1);
        }
        function findCurrentScript() {
            var scripts = contextWindow.document.getElementsByTagName('script');
            var num = scripts.length - 1;
            var currScript;
            var src;
            while (num >= 0) {
                currScript = scripts[num];
                if (currScript.hasAttribute("src") && currScript.src.indexOf("Hyphenator") !== -1) {
                    src = currScript.src;
                    break;
                }
                num -= 1;
            }
            return src;
        }
        if (!!document.currentScript) {
            fullPath = document.currentScript.src;
        } else {
            fullPath = findCurrentScript();
        }
        r.basePath = getBasePath(fullPath);
        if (fullPath.indexOf("bm=true") !== -1) {
            r.isBookmarklet = true;
        }
        if (window.location.href.indexOf(r.basePath) !== -1) {
            r.isLocal = true;
        }
        return r;
    }());

    /**
     * @member {string} Hyphenator~basePath
     * @desc
     * A string storing the basepath from where Hyphenator.js was loaded.
     * This is used to load the pattern files.
     * The basepath is determined dynamically in getLocality by searching all script-tags for Hyphenator.js
     * If the path cannot be determined {@link http://mnater.github.io/Hyphenator/} is used as fallback.
     * @access private
     * @see {@link Hyphenator~loadPatterns}
     */
    var basePath = locality.basePath;

    /**
     * @member {boolean} Hyphenator~isLocal
     * @access private
     * @desc
     * This is computed by getLocality.
     * isLocal is true, if Hyphenator is loaded from the same domain, as the webpage, but false, if
     * it's loaded from an external source (i.e. directly from github)
     */
    var isLocal = locality.isLocal;

    /**
     * @member {boolean} Hyphenator~documentLoaded
     * @access private
     * @desc
     * documentLoaded is true, when the DOM has been loaded. This is set by {@link Hyphenator~runWhenLoaded}
     */
    var documentLoaded = false;

    /**
     * @member {boolean} Hyphenator~persistentConfig
     * @access private
     * @desc
     * if persistentConfig is set to true (defaults to false), config options and the state of the
     * toggleBox are stored in DOM-storage (according to the storage-setting). So they haven't to be
     * set for each page.
     * @default false
     * @see {@link Hyphenator.config}
     */
    var persistentConfig = false;

    /**
     * @member {boolean} Hyphenator~doFrames
     * @access private
     * @desc
     * switch to control if frames/iframes should be hyphenated, too.
     * defaults to false (frames are a bag of hurt!)
     * @default false
     * @see {@link Hyphenator.config}
     */
    var doFrames = false;

    /**
     * @member {Object.<string,boolean>} Hyphenator~dontHyphenate
     * @desc
     * A key-value object containing all html-tags whose content should not be hyphenated
     * @access private
     */
    var dontHyphenate = {'video': true, 'audio': true, 'script': true, 'code': true, 'pre': true, 'img': true, 'br': true, 'samp': true, 'kbd': true, 'var': true, 'abbr': true, 'acronym': true, 'sub': true, 'sup': true, 'button': true, 'option': true, 'label': true, 'textarea': true, 'input': true, 'math': true, 'svg': true, 'style': true};

    /**
     * @member {boolean} Hyphenator~enableCache
     * @desc
     * A variable to set if caching is enabled or not
     * @default true
     * @access private
     * @see {@link Hyphenator.config}
     */
    var enableCache = true;

    /**
     * @member {string} Hyphenator~storageType
     * @desc
     * A variable to define what html5-DOM-Storage-Method is used ('none', 'local' or 'session')
     * @default 'local'
     * @access private
     * @see {@link Hyphenator.config}
     */
    var storageType = 'local';

    /**
     * @member {Object|undefined} Hyphenator~storage
     * @desc
     * An alias to the storage defined in storageType. This is set by {@link Hyphenator~createStorage}.
     * Set by {@link Hyphenator.run}
     * @default null
     * @access private
     * @see {@link Hyphenator~createStorage}
     */
    var storage;

    /**
     * @member {boolean} Hyphenator~enableReducedPatternSet
     * @desc
     * A variable to set if storing the used patterns is set
     * @default false
     * @access private
     * @see {@link Hyphenator.config}
     * @see {@link Hyphenator.getRedPatternSet}
     */
    var enableReducedPatternSet = false;

    /**
     * @member {boolean} Hyphenator~enableRemoteLoading
     * @desc
     * A variable to set if pattern files should be loaded remotely or not
     * @default true
     * @access private
     * @see {@link Hyphenator.config}
     */
    var enableRemoteLoading = true;

    /**
     * @member {boolean} Hyphenator~displayToggleBox
     * @desc
     * A variable to set if the togglebox should be displayed or not
     * @default false
     * @access private
     * @see {@link Hyphenator.config}
     */
    var displayToggleBox = false;

    /**
     * @method Hyphenator~onError
     * @desc
     * A function that can be called upon an error.
     * @see {@link Hyphenator.config}
     * @access private
     */
    var onError = function (e) {
        window.alert("Hyphenator.js says:\n\nAn Error occurred:\n" + e.message);
    };

    /**
     * @method Hyphenator~onWarning
     * @desc
     * A function that can be called upon a warning.
     * @see {@link Hyphenator.config}
     * @access private
     */
    var onWarning = function (e) {
        window.console.log(e.message);
    };

    /**
     * @method Hyphenator~createElem
     * @desc
     * A function alias to document.createElementNS or document.createElement
     * @access private
     */
    function createElem(tagname, context) {
        context = context || contextWindow;
        var el;
        if (window.document.createElementNS) {
            el = context.document.createElementNS('http://www.w3.org/1999/xhtml', tagname);
        } else if (window.document.createElement) {
            el = context.document.createElement(tagname);
        }
        return el;
    }
    /**
     * @method Hyphenator~forEachKey
     * @desc
     * Calls the function f on every property of o
     * @access private
     */
    function forEachKey(o, f) {
        var k;
        if (Object.hasOwnProperty("keys")) {
            Object.keys(o).forEach(f);
        } else {
            for (k in o) {
                if (o.hasOwnProperty(k)) {
                    f(k);
                }
            }
        }
    }

    /**
     * @member {boolean} Hyphenator~css3
     * @desc
     * A variable to set if css3 hyphenation should be used
     * @default false
     * @access private
     * @see {@link Hyphenator.config}
     */
    var css3 = false;

    /**
     * @method Hyphenator~css3_gethsupport
     * @desc
     * This function returns a {@link Hyphenator~css3_hsupport} object for the current UA
     * @type function
     * @access private
     * @see Hyphenator~css3_h9n
     */
    function css3_gethsupport() {
        var support = false,
            supportedBrowserLangs = {},
            property = '',
            checkLangSupport,
            createLangSupportChecker = function (prefix) {
                var testStrings = [
                        //latin: 0
                        'aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz',
                        //cyrillic: 1
                        'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
                        //arabic: 2
                        'أبتثجحخدذرزسشصضطظعغفقكلمنهوي',
                        //armenian: 3
                        'աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ',
                        //bengali: 4
                        'ঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ',
                        //devangari: 5
                        'ँंःअआइईउऊऋऌएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसहऽािीुूृॄेैोौ्॒॑ॠॡॢॣ',
                        //greek: 6
                        'αβγδεζηθικλμνξοπρσςτυφχψω',
                        //gujarati: 7
                        'બહઅઆઇઈઉઊઋૠએઐઓઔાિીુૂૃૄૢૣેૈોૌકખગઘઙચછજઝઞટઠડઢણતથદધનપફસભમયરલળવશષ',
                        //kannada: 8
                        'ಂಃಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹಽಾಿೀುೂೃೄೆೇೈೊೋೌ್ೕೖೞೠೡ',
                        //lao: 9
                        'ກຂຄງຈຊຍດຕຖທນບປຜຝພຟມຢຣລວສຫອຮະັາິີຶືຸູົຼເແໂໃໄ່້໊໋ໜໝ',
                        //malayalam: 10
                        'ംഃഅആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരറലളഴവശഷസഹാിീുൂൃെേൈൊോൌ്ൗൠൡൺൻർൽൾൿ',
                        //oriya: 11
                        'ଁଂଃଅଆଇଈଉଊଋଌଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହାିୀୁୂୃେୈୋୌ୍ୗୠୡ',
                        //persian: 12
                        'أبتثجحخدذرزسشصضطظعغفقكلمنهوي',
                        //punjabi: 13
                        'ਁਂਃਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹਾਿੀੁੂੇੈੋੌ੍ੰੱ',
                        //tamil: 14
                        'ஃஅஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரறலளழவஷஸஹாிீுூெேைொோௌ்ௗ',
                        //telugu: 15
                        'ఁంఃఅఆఇఈఉఊఋఌఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహాిీుూృౄెేైొోౌ్ౕౖౠౡ',
                        //georgian: 16
                        'აიერთხტუფბლდნვკწსგზმქყშჩცძჭჯოღპჟჰ'
                    ],
                    f = function (lang) {
                        var shadow,
                            computedHeight,
                            bdy,
                            r = false;

                        //check if lang has already been tested
                        if (supportedBrowserLangs.hasOwnProperty(lang)) {
                            r = supportedBrowserLangs[lang];
                        } else if (supportedLangs.hasOwnProperty(lang)) {
                            //create and append shadow-test-element
                            bdy = window.document.getElementsByTagName('body')[0];
                            shadow = createElem('div', window);
                            shadow.id = 'Hyphenator_LanguageChecker';
                            shadow.style.width = '5em';
                            shadow.style.padding = '0';
                            shadow.style.border = 'none';
                            shadow.style[prefix] = 'auto';
                            shadow.style.hyphens = 'auto';
                            shadow.style.fontSize = '12px';
                            shadow.style.lineHeight = '12px';
                            shadow.style.wordWrap = 'normal';
                            shadow.style.wordBreak = 'normal';
                            shadow.style.visibility = 'hidden';
                            shadow.lang = lang;
                            shadow.style['-webkit-locale'] = "'" + lang + "'";
                            shadow.innerHTML = testStrings[supportedLangs[lang].script];
                            bdy.appendChild(shadow);
                            //measure its height
                            computedHeight = shadow.offsetHeight;
                            //remove shadow element
                            bdy.removeChild(shadow);
                            r = !!(computedHeight > 12);
                            supportedBrowserLangs[lang] = r;
                        } else {
                            r = false;
                        }
                        return r;
                    };
                return f;
            },
            s;

        if (window.getComputedStyle) {
            s = window.getComputedStyle(window.document.getElementsByTagName('body')[0], null);
            if (s.hyphens !== undefined) {
                support = true;
                property = 'hyphens';
                checkLangSupport = createLangSupportChecker('hyphens');
            } else if (s['-webkit-hyphens'] !== undefined) {
                support = true;
                property = '-webkit-hyphens';
                checkLangSupport = createLangSupportChecker('-webkit-hyphens');
            } else if (s.MozHyphens !== undefined) {
                support = true;
                property = '-moz-hyphens';
                checkLangSupport = createLangSupportChecker('MozHyphens');
            } else if (s['-ms-hyphens'] !== undefined) {
                support = true;
                property = '-ms-hyphens';
                checkLangSupport = createLangSupportChecker('-ms-hyphens');
            }
        } //else we just return the initial values because ancient browsers don't support css3 anyway


        return {
            support: support,
            property: property,
            supportedBrowserLangs: supportedBrowserLangs,
            checkLangSupport: checkLangSupport
        };
    }

    /**
     * @typedef {Object} Hyphenator~css3_hsupport
     * @property {boolean} support - if css3-hyphenation is supported
     * @property {string} property - the css property name to access hyphen-settings (e.g. -webkit-hyphens)
     * @property {Object.<string, boolean>} supportedBrowserLangs - an object caching tested languages
     * @property {function} checkLangSupport - a method that checks if the browser supports a requested language
     */

    /**
     * @member {Hyphenator~css3_h9n} Hyphenator~css3_h9n
     * @desc
     * A generated object containing information for CSS3-hyphenation support
     * This is set by {@link Hyphenator~css3_gethsupport}
     * @default undefined
     * @access private
     * @see {@link Hyphenator~css3_gethsupport}
     * @example
     * //Check if browser supports a language
     * css3_h9n.checkLangSupport(&lt;lang&gt;)
     */
    var css3_h9n;

    /**
     * @member {string} Hyphenator~hyphenateClass
     * @desc
     * A string containing the css-class-name for the hyphenate class
     * @default 'hyphenate'
     * @access private
     * @example
     * &lt;p class = "hyphenate"&gt;Text&lt;/p&gt;
     * @see {@link Hyphenator.config}
     */
    var hyphenateClass = 'hyphenate';

    /**
     * @member {string} Hyphenator~urlHyphenateClass
     * @desc
     * A string containing the css-class-name for the urlhyphenate class
     * @default 'urlhyphenate'
     * @access private
     * @example
     * &lt;p class = "urlhyphenate"&gt;Text&lt;/p&gt;
     * @see {@link Hyphenator.config}
     */
    var urlHyphenateClass = 'urlhyphenate';

    /**
     * @member {string} Hyphenator~classPrefix
     * @desc
     * A string containing a unique className prefix to be used
     * whenever Hyphenator sets a CSS-class
     * @access private
     */
    var classPrefix = 'Hyphenator' + Math.round(Math.random() * 1000);

    /**
     * @member {string} Hyphenator~hideClass
     * @desc
     * The name of the class that hides elements
     * @access private
     */
    var hideClass = classPrefix + 'hide';

    /**
     * @member {RegExp} Hyphenator~hideClassRegExp
     * @desc
     * RegExp to remove hideClass from a list of classes
     * @access private
     */
    var hideClassRegExp = new RegExp("\\s?\\b" + hideClass + "\\b", "g");

    /**
     * @member {string} Hyphenator~hideClass
     * @desc
     * The name of the class that unhides elements
     * @access private
     */
    var unhideClass = classPrefix + 'unhide';

    /**
     * @member {RegExp} Hyphenator~hideClassRegExp
     * @desc
     * RegExp to remove unhideClass from a list of classes
     * @access private
     */
    var unhideClassRegExp = new RegExp("\\s?\\b" + unhideClass + "\\b", "g");

    /**
     * @member {string} Hyphenator~css3hyphenateClass
     * @desc
     * The name of the class that hyphenates elements with css3
     * @access private
     */
    var css3hyphenateClass = classPrefix + 'css3hyphenate';

    /**
     * @member {CSSEdit} Hyphenator~css3hyphenateClass
     * @desc
     * The var where CSSEdit class is stored
     * @access private
     */
    var css3hyphenateClassHandle;

    /**
     * @member {string} Hyphenator~dontHyphenateClass
     * @desc
     * A string containing the css-class-name for elements that should not be hyphenated
     * @default 'donthyphenate'
     * @access private
     * @example
     * &lt;p class = "donthyphenate"&gt;Text&lt;/p&gt;
     * @see {@link Hyphenator.config}
     */
    var dontHyphenateClass = 'donthyphenate';

    /**
     * @member {number} Hyphenator~min
     * @desc
     * A number wich indicates the minimal length of words to hyphenate.
     * @default 6
     * @access private
     * @see {@link Hyphenator.config}
     */
    var min = 6;

    /**
     * @member {number} Hyphenator~leftmin
     * @desc
     * A number wich indicates the minimal length of characters before the first hyphenation.
     * This value is only used if it is greater than the value in the pattern file.
     * @default given by pattern file
     * @access private
     * @see {@link Hyphenator.config}
     */
    var leftmin = 0;

    /**
     * @member {number} Hyphenator~rightmin
     * @desc
     * A number wich indicates the minimal length of characters after the last hyphenation.
     * This value is only used if it is greater than the value in the pattern file.
     * @default given by pattern file
     * @access private
     * @see {@link Hyphenator.config}
     */
    var rightmin = 0;

    /**
     * @member {number} Hyphenator~rightmin
     * @desc
     * Control how compound words are hyphenated.
     * "auto": factory-made -> fac-tory-made ('old' behaviour of Hyphenator.js)
     * "all": factory-made -> fac-tory-[ZWSP]made ('made'.length < minWordLength)
     * "hyphen": factory-made -> factory-[ZWSP]made (Zero Width Space inserted after '-' to provide line breaking opportunity)
     * @default "auto"
     * @access private
     * @see {@link Hyphenator.config}
     */
    var compound = "auto";

    /**
     * @member {number} Hyphenator~orphanControl
     * @desc
     * Control how the last words of a line are handled:
     * level 1 (default): last word is hyphenated
     * level 2: last word is not hyphenated
     * level 3: last word is not hyphenated and last space is non breaking
     * @default 1
     * @access private
     */
    var orphanControl = 1;

    /**
     * @member {boolean} Hyphenator~isBookmarklet
     * @desc
     * This is computed by getLocality.
     * True if Hyphanetor runs as bookmarklet.
     * @access private
     */
    var isBookmarklet = locality.isBookmarklet;

    /**
     * @member {string|null} Hyphenator~mainLanguage
     * @desc
     * The general language of the document. In contrast to {@link Hyphenator~defaultLanguage},
     * mainLanguage is defined by the client (i.e. by the html or by a prompt).
     * @access private
     * @see {@link Hyphenator~autoSetMainLanguage}
     */
    var mainLanguage = null;

    /**
     * @member {string|null} Hyphenator~defaultLanguage
     * @desc
     * The language defined by the developper. This language setting is defined by a config option.
     * It is overwritten by any html-lang-attribute and only taken in count, when no such attribute can
     * be found (i.e. just before the prompt).
     * @access private
     * @see {@link Hyphenator.config}
     * @see {@link Hyphenator~autoSetMainLanguage}
     */
    var defaultLanguage = '';

    /**
     * @member {ElementCollection} Hyphenator~elements
     * @desc
     * A class representing all elements (of type Element) that have to be hyphenated. This var is filled by
     * {@link Hyphenator~gatherDocumentInfos}
     * @access private
     */
    var elements = (function () {
        /**
         * @constructor Hyphenator~elements~ElementCollection~Element
         * @desc represents a DOM Element with additional information
         * @access private
         */
        var makeElement = function (element) {
                return {
                    /**
                     * @member {Object} Hyphenator~elements~ElementCollection~Element~element
                     * @desc A DOM Element
                     * @access protected
                     */
                    element: element,
                    /**
                     * @member {boolean} Hyphenator~elements~ElementCollection~Element~hyphenated
                     * @desc Marks if the element has been hyphenated
                     * @access protected
                     */
                    hyphenated: false,
                    /**
                     * @member {boolean} Hyphenator~elements~ElementCollection~Element~treated
                     * @desc Marks if information of the element has been collected but not hyphenated (e.g. dohyphenation is off)
                     * @access protected
                     */
                    treated: false
                };
            },
            /**
             * @constructor Hyphenator~elements~ElementCollection
             * @desc A collection of Elements to be hyphenated
             * @access protected
             */
            makeElementCollection = function () {
                    /**
                     * @member {number} Hyphenator~elements~ElementCollection~counters
                     * @desc Array of [number of collected elements, number of hyphenated elements]
                     * @access protected
                     */
                var counters = [0, 0],
                    /**
                     * @member {Object.<string, Array.<Element>>} Hyphenator~elements~ElementCollection~list
                     * @desc The collection of elements, where the key is a language code and the value is an array of elements
                     * @access protected
                     */
                    list = {},
                    /**
                     * @method Hyphenator~elements~ElementCollection.prototype~add
                     * @augments Hyphenator~elements~ElementCollection
                     * @access protected
                     * @desc adds a DOM element to the collection
                     * @param {Object} el - The DOM element
                     * @param {string} lang - The language of the element
                     */
                    add = function (el, lang) {
                        var elo = makeElement(el);
                        if (!list.hasOwnProperty(lang)) {
                            list[lang] = [];
                        }
                        list[lang].push(elo);
                        counters[0] += 1;
                        return elo;
                    },
                    /**
                     * @callback Hyphenator~elements~ElementCollection.prototype~each~callback fn - The callback that is executed for each element
                     * @param {string} [k] The key (i.e. language) of the collection
                     * @param {Hyphenator~elements~ElementCollection~Element} element
                     */

                    /**
                     * @method Hyphenator~elements~ElementCollection.prototype~each
                     * @augments Hyphenator~elements~ElementCollection
                     * @access protected
                     * @desc takes each element of the collection as an argument of fn
                     * @param {Hyphenator~elements~ElementCollection.prototype~each~callback} fn - A function that takes an element as an argument
                     */
                    each = function (fn) {
                        forEachKey(list, function (k) {
                            if (fn.length === 2) {
                                fn(k, list[k]);
                            } else {
                                fn(list[k]);
                            }
                        });
                    };

                return {
                    counters: counters,
                    list: list,
                    add: add,
                    each: each
                };

            };
        return makeElementCollection();
    }());


    /**
     * @member {Object.<sting, string>} Hyphenator~exceptions
     * @desc
     * An object containing exceptions as comma separated strings for each language.
     * When the language-objects are loaded, their exceptions are processed, copied here and then deleted.
     * Exceptions can also be set by the user.
     * @see {@link Hyphenator~prepareLanguagesObj}
     * @access private
     */
    var exceptions = {};

    /**
     * @member {Object.<string, boolean>} Hyphenator~docLanguages
     * @desc
     * An object holding all languages used in the document. This is filled by
     * {@link Hyphenator~gatherDocumentInfos}
     * @access private
     */
    var docLanguages = {};

    /**
     * @member {string} Hyphenator~url
     * @desc
     * A string containing a insane RegularExpression to match URL's
     * @access private
     */
    var url = '(?:\\w*:\/\/)?(?:(?:\\w*:)?(?:\\w*)@)?(?:(?:(?:[\\d]{1,3}\\.){3}(?:[\\d]{1,3}))|(?:(?:www\\.|[a-zA-Z]\\.)?[a-zA-Z0-9\\-\\.]+\\.(?:[a-z]{2,})))(?::\\d*)?(?:\/[\\w#!:\\.?\\+=&%@!\\-]*)*';
    //            protocoll     usr     pwd                    ip                             or                       host                           tld        port               path

    /**
     * @member {string} Hyphenator~mail
     * @desc
     * A string containing a RegularExpression to match mail-adresses
     * @access private
     */
    var mail = '[\\w-\\.]+@[\\w\\.]+';

    /**
     * @member {string} Hyphenator~zeroWidthSpace
     * @desc
     * A string that holds a char.
     * Depending on the browser, this is the zero with space or an empty string.
     * zeroWidthSpace is used to break URLs
     * @access private
     */
    var zeroWidthSpace = (function () {
        var zws, ua = window.navigator.userAgent.toLowerCase();
        zws = String.fromCharCode(8203); //Unicode zero width space
        if (ua.indexOf('msie 6') !== -1) {
            zws = ''; //IE6 doesn't support zws
        }
        if (ua.indexOf('opera') !== -1 && ua.indexOf('version/10.00') !== -1) {
            zws = ''; //opera 10 on XP doesn't support zws
        }
        return zws;
    }());

    /**
     * @method Hyphenator~onBeforeWordHyphenation
     * @desc
     * This method is called just before a word is hyphenated.
     * It is called with two parameters: the word and its language.
     * The method must return a string (aka the word).
     * @see {@link Hyphenator.config}
     * @access private
     * @param {string} word
     * @param {string} lang
     * @return {string} The word that goes into hyphenation
     */
    var onBeforeWordHyphenation = function (word) {
        return word;
    };

    /**
     * @method Hyphenator~onAfterWordHyphenation
     * @desc
     * This method is called for each word after it is hyphenated.
     * Takes the word as a first parameter and its language as a second parameter.
     * Returns a string that will replace the word that has been hyphenated.
     * @see {@link Hyphenator.config}
     * @access private
     * @param {string} word
     * @param {string} lang
     * @return {string} The word that goes into hyphenation
     */
    var onAfterWordHyphenation = function (word) {
        return word;
    };

    /**
     * @method Hyphenator~onHyphenationDone
     * @desc
     * A method to be called, when the last element has been hyphenated.
     * If there are frames the method is called for each frame.
     * Therefore the location.href of the contextWindow calling this method is given as a parameter
     * @see {@link Hyphenator.config}
     * @param {string} context
     * @access private
     */
    var onHyphenationDone = function (context) {
        return context;
    };

    /**
     * @name Hyphenator~selectorFunction
     * @desc
     * A function set by the user that has to return a HTMLNodeList or array of Elements to be hyphenated.
     * By default this is set to false so we can check if a selectorFunction is set…
     * @see {@link Hyphenator.config}
     * @see {@link Hyphenator~mySelectorFunction}
     * @default false
     * @type {function|boolean}
     * @access private
     */
    var selectorFunction = false;

    /**
     * @name Hyphenator~flattenNodeList
     * @desc
     * Takes a nodeList and returns an array with all elements that are not contained by another element in the nodeList
     * By using this function the elements returned by selectElements can be 'flattened'.
     * @see {@link Hyphenator~selectElements}
     * @param {nodeList} nl
     * @return {Array} Array of 'parent'-elements
     * @access private
     */
    function flattenNodeList(nl) {
        var parentElements = [],
            i = 1,
            j = 0,
            isParent = true;

        parentElements.push(nl[0]); //add the first item, since this is always an parent

        while (i < nl.length) { //cycle through nodeList
            while (j < parentElements.length) { //cycle through parentElements
                if (parentElements[j].contains(nl[i])) {
                    isParent = false;
                    break;
                }
                j += 1;
            }
            if (isParent) {
                parentElements.push(nl[i]);
            }
            isParent = true;
            i += 1;
        }

        return parentElements;
    }

    /**
     * @method Hyphenator~mySelectorFunction
     * @desc
     * A function that returns a HTMLNodeList or array of Elements to be hyphenated.
     * By default it uses the classname ('hyphenate') to select the elements.
     * @access private
     */
    function mySelectorFunction(hyphenateClass) {
        var tmp,
            el = [],
            i = 0;
        if (window.document.getElementsByClassName) {
            el = contextWindow.document.getElementsByClassName(hyphenateClass);
        } else if (window.document.querySelectorAll) {
            el = contextWindow.document.querySelectorAll('.' + hyphenateClass);
        } else {
            tmp = contextWindow.document.getElementsByTagName('*');
            while (i < tmp.length) {
                if (tmp[i].className.indexOf(hyphenateClass) !== -1 && tmp[i].className.indexOf(dontHyphenateClass) === -1) {
                    el.push(tmp[i]);
                }
                i += 1;
            }
        }
        return el;
    }

    /**
     * @method Hyphenator~selectElements
     * @desc
     * A function that uses either selectorFunction set by the user
     * or the default mySelectorFunction.
     * @access private
     */
    function selectElements() {
        var elems;
        if (selectorFunction) {
            elems = selectorFunction();
        } else {
            elems = mySelectorFunction(hyphenateClass);
        }
        if (elems.length !== 0) {
            elems = flattenNodeList(elems);
        }
        return elems;
    }

    /**
     * @member {string} Hyphenator~intermediateState
     * @desc
     * The visibility of elements while they are hyphenated:
     * 'visible': unhyphenated text is visible and then redrawn when hyphenated.
     * 'hidden': unhyphenated text is made invisible as soon as possible and made visible after hyphenation.
     * @default 'hidden'
     * @see {@link Hyphenator.config}
     * @access private
     */
    var intermediateState = 'hidden';

    /**
     * @member {string} Hyphenator~unhide
     * @desc
     * How hidden elements unhide: either simultaneous (default: 'wait') or progressively.
     * 'wait' makes Hyphenator.js to wait until all elements are hyphenated (one redraw)
     * With 'progressive' Hyphenator.js unhides elements as soon as they are hyphenated.
     * @see {@link Hyphenator.config}
     * @access private
     */
    var unhide = 'wait';

    /**
     * @member {Array.<Hyphenator~CSSEdit>} Hyphenator~CSSEditors
     * @desc A container array that holds CSSEdit classes
     * For each window object one CSSEdit class is inserted
     * @access private
     */
    var CSSEditors = [];

    /**
     * @constructor Hyphenator~CSSEdit
     * @desc
     * This class handles access and editing of StyleSheets.
     * Thanks to this styles (e.g. hiding and unhiding elements upon hyphenation)
     * can be changed in one place instead for each element.
     * @access private
     */
    function makeCSSEdit(w) {
        w = w || window;
        var doc = w.document,
            /**
             * @member {Object} Hyphenator~CSSEdit~sheet
             * @desc
             * A StyleSheet, where Hyphenator can write to.
             * If no StyleSheet can be found, lets create one.
             * @access private
             */
            sheet = (function () {
                var i = 0,
                    l = doc.styleSheets.length,
                    s,
                    element,
                    r = false;
                while (i < l) {
                    s = doc.styleSheets[i];
                    try {
                        if (!!s.cssRules) {
                            r = s;
                            break;
                        }
                    } catch (ignore) {}
                    i += 1;
                }
                if (r === false) {
                    element = doc.createElement('style');
                    element.type = 'text/css';
                    doc.getElementsByTagName('head')[0].appendChild(element);
                    r = doc.styleSheets[doc.styleSheets.length - 1];
                }
                return r;
            }()),

            /**
             * @typedef {Object} Hyphenator~CSSEdit~changes
             * @property {Object} sheet - The StyleSheet where the change was made
             * @property {number} index - The index of the changed rule
             */

            /**
             * @member {Array.<changes>} Hyphenator~CSSEdit~changes
             * @desc
             * Sets a CSS rule for a specified selector
             * @access private
             */
            changes = [],

            /**
             * @typedef Hyphenator~CSSEdit~rule
             * @property {number} index - The index of the rule
             * @property {Object} rule - The style rule
             */
            /**
             * @method Hyphenator~CSSEdit~findRule
             * @desc
             * Searches the StyleSheets for a given selector and returns an object containing the rule.
             * If nothing can be found, false is returned.
             * @param {string} sel
             * @return {Hyphenator~CSSEdit~rule|false}
             * @access private
             */
            findRule = function (sel) {
                var s,
                    rule,
                    sheets = w.document.styleSheets,
                    rules,
                    i = 0,
                    j = 0,
                    r = false;
                while (i < sheets.length) {
                    s = sheets[i];
                    try { //FF has issues here with external CSS (s.o.p)
                        if (!!s.cssRules) {
                            rules = s.cssRules;
                        } else if (!!s.rules) {
                            // IE < 9
                            rules = s.rules;
                        }
                    } catch (ignore) {}
                    if (!!rules && !!rules.length) {
                        while (j < rules.length) {
                            rule = rules[j];
                            if (rule.selectorText === sel) {
                                r = {
                                    index: j,
                                    rule: rule
                                };
                            }
                            j += 1;
                        }
                    }
                    i += 1;
                }
                return r;
            },
            /**
             * @method Hyphenator~CSSEdit~addRule
             * @desc
             * Adds a rule to the {@link Hyphenator~CSSEdit~sheet}
             * @param {string} sel - The selector to be added
             * @param {string} rulesStr - The rules for the specified selector
             * @return {number} index of the new rule
             * @access private
             */
            addRule = function (sel, rulesStr) {
                var i, r;
                if (!!sheet.insertRule) {
                    if (!!sheet.cssRules) {
                        i = sheet.cssRules.length;
                    } else {
                        i = 0;
                    }
                    r = sheet.insertRule(sel + '{' + rulesStr + '}', i);
                } else if (!!sheet.addRule) {
                    // IE < 9
                    if (!!sheet.rules) {
                        i = sheet.rules.length;
                    } else {
                        i = 0;
                    }
                    sheet.addRule(sel, rulesStr, i);
                    r = i;
                }
                return r;
            },
            /**
             * @method Hyphenator~CSSEdit~removeRule
             * @desc
             * Removes a rule with the specified index from the specified sheet
             * @param {Object} sheet - The style sheet
             * @param {number} index - the index of the rule
             * @access private
             */
            removeRule = function (sheet, index) {
                if (sheet.deleteRule) {
                    sheet.deleteRule(index);
                } else {
                    // IE < 9
                    sheet.removeRule(index);
                }
            };

        return {
            /**
             * @method Hyphenator~CSSEdit.setRule
             * @desc
             * Sets a CSS rule for a specified selector
             * @access public
             * @param {string} sel - Selector
             * @param {string} rulesString - CSS-Rules
             */
            setRule: function (sel, rulesString) {
                var i, existingRule, cssText;
                existingRule = findRule(sel);
                if (!!existingRule) {
                    if (!!existingRule.rule.cssText) {
                        cssText = existingRule.rule.cssText;
                    } else {
                        // IE < 9
                        cssText = existingRule.rule.style.cssText.toLowerCase();
                    }
                    if (cssText !== sel + ' { ' + rulesString + ' }') {
                        //cssText of the found rule is not uniquely selector + rulesString,
                        if (cssText.indexOf(rulesString) !== -1) {
                            //maybe there are other rules or IE < 9
                            //clear existing def
                            existingRule.rule.style.visibility = '';
                        }
                        //add rule and register for later removal
                        i = addRule(sel, rulesString);
                        changes.push({sheet: sheet, index: i});
                    }
                } else {
                    i = addRule(sel, rulesString);
                    changes.push({sheet: sheet, index: i});
                }
            },
            /**
             * @method Hyphenator~CSSEdit.clearChanges
             * @desc
             * Removes all changes Hyphenator has made from the StyleSheets
             * @access public
             */
            clearChanges: function () {
                var change = changes.pop();
                while (!!change) {
                    removeRule(change.sheet, change.index);
                    change = changes.pop();
                }
            }
        };
    }

    /**
     * @member {string} Hyphenator~hyphen
     * @desc
     * A string containing the character for in-word-hyphenation
     * @default the soft hyphen
     * @access private
     * @see {@link Hyphenator.config}
     */
    var hyphen = String.fromCharCode(173);

    /**
     * @member {string} Hyphenator~urlhyphen
     * @desc
     * A string containing the character for url/mail-hyphenation
     * @default the zero width space
     * @access private
     * @see {@link Hyphenator.config}
     * @see {@link Hyphenator~zeroWidthSpace}
     */
    var urlhyphen = zeroWidthSpace;

    /**
     * @method Hyphenator~hyphenateURL
     * @desc
     * Puts {@link Hyphenator~urlhyphen} (default: zero width space) after each no-alphanumeric char that my be in a URL.
     * @param {string} url to hyphenate
     * @returns string the hyphenated URL
     * @access public
     */
    function hyphenateURL(url) {
        var tmp = url.replace(/([:\/.?#&\-_,;!@]+)/gi, '$&' + urlhyphen),
            parts = tmp.split(urlhyphen),
            i = 0;
        while (i < parts.length) {
            if (parts[i].length > (2 * min)) {
                parts[i] = parts[i].replace(/(\w{3})(\w)/gi, "$1" + urlhyphen + "$2");
            }
            i += 1;
        }
        if (parts[parts.length - 1] === "") {
            parts.pop();
        }
        return parts.join(urlhyphen);
    }

    /**
     * @member {boolean} Hyphenator~safeCopy
     * @desc
     * Defines wether work-around for copy issues is active or not
     * @default true
     * @access private
     * @see {@link Hyphenator.config}
     * @see {@link Hyphenator~registerOnCopy}
     */
    var safeCopy = true;

    /**
     * @method Hyphenator~zeroTimeOut
     * @desc
     * defer execution of a function on the call stack
     * Analog to window.setTimeout(fn, 0) but without a clamped delay if postMessage is supported
     * @access private
     * @see {@link http://dbaron.org/log/20100309-faster-timeouts}
     */
    var zeroTimeOut = (function () {
        if (window.postMessage && window.addEventListener) {
            return (function () {
                var timeouts = [],
                    msg = "Hyphenator_zeroTimeOut_message",
                    setZeroTimeOut = function (fn) {
                        timeouts.push(fn);
                        window.postMessage(msg, "*");
                    },
                    handleMessage = function (event) {
                        if (event.source === window && event.data === msg) {
                            event.stopPropagation();
                            if (timeouts.length > 0) {
                                //var efn = timeouts.shift();
                                //efn();
                                timeouts.shift()();
                            }
                        }
                    };
                window.addEventListener("message", handleMessage, true);
                return setZeroTimeOut;
            }());
        }
        return function (fn) {
            window.setTimeout(fn, 0);
        };
    }());

    /**
     * @member {Object} Hyphenator~hyphRunFor
     * @desc
     * stores location.href for documents where run() has been executed
     * to warn when Hyphenator.run() executed multiple times
     * @access private
     * @see {@link Hyphenator~runWhenLoaded}
     */
    var hyphRunFor = {};

    /**
     * @method Hyphenator~runWhenLoaded
     * @desc
     * A crossbrowser solution for the DOMContentLoaded-Event based on
     * <a href = "http://jquery.com/">jQuery</a>
     * I added some functionality: e.g. support for frames and iframes…
     * @param {Object} w the window-object
     * @param {function()} f the function to call when the document is ready
     * @access private
     */
    function runWhenLoaded(w, f) {
        var toplevel,
            add = window.document.addEventListener
                ? 'addEventListener'
                : 'attachEvent',
            rem = window.document.addEventListener
                ? 'removeEventListener'
                : 'detachEvent',
            pre = window.document.addEventListener
                ? ''
                : 'on';

        function init(context) {
            if (hyphRunFor[context.location.href]) {
                onWarning(new Error("Warning: multiple execution of Hyphenator.run() – This may slow down the script!"));
            }
            contextWindow = context || window;
            f();
            hyphRunFor[contextWindow.location.href] = true;
        }

        function doScrollCheck() {
            try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                w.document.documentElement.doScroll("left");
            } catch (ignore) {
                window.setTimeout(doScrollCheck, 1);
                return;
            }
            //maybe modern IE fired DOMContentLoaded
            if (!hyphRunFor[w.location.href]) {
                documentLoaded = true;
                init(w);
            }
        }

        function doOnEvent(e) {
            var i = 0,
                fl,
                haveAccess;
            if (!!e && e.type === 'readystatechange' && w.document.readyState !== 'interactive' && w.document.readyState !== 'complete') {
                return;
            }

            //DOM is ready/interactive, but frames may not be loaded yet!
            //cleanup events
            w.document[rem](pre + 'DOMContentLoaded', doOnEvent, false);
            w.document[rem](pre + 'readystatechange', doOnEvent, false);

            //check frames
            fl = w.frames.length;
            if (fl === 0 || !doFrames) {
                //there are no frames!
                //cleanup events
                w[rem](pre + 'load', doOnEvent, false);
                documentLoaded = true;
                init(w);
            } else if (doFrames && fl > 0) {
                //we have frames, so wait for onload and then initiate runWhenLoaded recursevly for each frame:
                if (!!e && e.type === 'load') {
                    //cleanup events
                    w[rem](pre + 'load', doOnEvent, false);
                    while (i < fl) {
                        haveAccess = undefined;
                        //try catch isn't enough for webkit
                        try {
                            //opera throws only on document.toString-access
                            haveAccess = w.frames[i].document.toString();
                        } catch (ignore) {
                            haveAccess = undefined;
                        }
                        if (!!haveAccess) {
                            runWhenLoaded(w.frames[i], f);
                        }
                        i += 1;
                    }
                    init(w);
                }
            }
        }

        if (documentLoaded || w.document.readyState === 'complete') {
            //Hyphenator has run already (documentLoaded is true) or
            //it has been loaded after onLoad
            documentLoaded = true;
            doOnEvent({type: 'load'});
        } else {
            //register events
            w.document[add](pre + 'DOMContentLoaded', doOnEvent, false);
            w.document[add](pre + 'readystatechange', doOnEvent, false);
            w[add](pre + 'load', doOnEvent, false);
            toplevel = false;
            try {
                toplevel = !window.frameElement;
            } catch (ignore) {}
            if (toplevel && w.document.documentElement.doScroll) {
                doScrollCheck(); //calls init()
            }
        }
    }

    /**
     * @method Hyphenator~getLang
     * @desc
     * Gets the language of an element. If no language is set, it may use the {@link Hyphenator~mainLanguage}.
     * @param {Object} el The first parameter is an DOM-Element-Object
     * @param {boolean} fallback The second parameter is a boolean to tell if the function should return the {@link Hyphenator~mainLanguage}
     * if there's no language found for the element.
     * @return {string} The language of the element
     * @access private
     */
    function getLang(el, fallback) {
        try {
            return !!el.getAttribute('lang')
                ? el.getAttribute('lang').toLowerCase()
                : !!el.getAttribute('xml:lang')
                    ? el.getAttribute('xml:lang').toLowerCase()
                    : el.tagName.toLowerCase() !== 'html'
                        ? getLang(el.parentNode, fallback)
                        : fallback
                            ? mainLanguage
                            : null;
        } catch (ignore) {}
    }

    /**
     * @method Hyphenator~autoSetMainLanguage
     * @desc
     * Retrieves the language of the document from the DOM and sets the lang attribute of the html-tag.
     * The function looks in the following places:
     * <ul>
     * <li>lang-attribute in the html-tag</li>
     * <li>&lt;meta http-equiv = "content-language" content = "xy" /&gt;</li>
     * <li>&lt;meta name = "DC.Language" content = "xy" /&gt;</li>
     * <li>&lt;meta name = "language" content = "xy" /&gt;</li>
     * </li>
     * If nothing can be found a prompt using {@link Hyphenator~languageHint} and a prompt-string is displayed.
     * If the retrieved language is in the object {@link Hyphenator~supportedLangs} it is copied to {@link Hyphenator~mainLanguage}
     * @access private
     */
    function autoSetMainLanguage(w) {
        w = w || contextWindow;
        var el = w.document.getElementsByTagName('html')[0],
            m = w.document.getElementsByTagName('meta'),
            i = 0,
            getLangFromUser = function () {
                var ml,
                    text = '',
                    dH = 300,
                    dW = 450,
                    dX = Math.floor((w.outerWidth - dW) / 2) + window.screenX,
                    dY = Math.floor((w.outerHeight - dH) / 2) + window.screenY,
                    ul = '',
                    languageHint;
                if (!!window.showModalDialog && (w.location.href.indexOf(basePath) !== -1)) {
                    ml = window.showModalDialog(basePath + 'modalLangDialog.html', supportedLangs, "dialogWidth: " + dW + "px; dialogHeight: " + dH + "px; dialogtop: " + dY + "; dialogleft: " + dX + "; center: on; resizable: off; scroll: off;");
                } else {
                    languageHint = (function () {
                        var r = '';
                        forEachKey(supportedLangs, function (k) {
                            r += k + ', ';
                        });
                        r = r.substring(0, r.length - 2);
                        return r;
                    }());
                    ul = window.navigator.language || window.navigator.userLanguage;
                    ul = ul.substring(0, 2);
                    if (!!supportedLangs[ul] && supportedLangs[ul].prompt !== '') {
                        text = supportedLangs[ul].prompt;
                    } else {
                        text = supportedLangs.en.prompt;
                    }
                    text += ' (ISO 639-1)\n\n' + languageHint;
                    ml = window.prompt(window.unescape(text), ul).toLowerCase();
                }
                return ml;
            };
        mainLanguage = getLang(el, false);
        if (!mainLanguage) {
            while (i < m.length) {
                //<meta http-equiv = "content-language" content="xy">
                if (!!m[i].getAttribute('http-equiv') && (m[i].getAttribute('http-equiv').toLowerCase() === 'content-language')) {
                    mainLanguage = m[i].getAttribute('content').toLowerCase();
                }
                //<meta name = "DC.Language" content="xy">
                if (!!m[i].getAttribute('name') && (m[i].getAttribute('name').toLowerCase() === 'dc.language')) {
                    mainLanguage = m[i].getAttribute('content').toLowerCase();
                }
                //<meta name = "language" content = "xy">
                if (!!m[i].getAttribute('name') && (m[i].getAttribute('name').toLowerCase() === 'language')) {
                    mainLanguage = m[i].getAttribute('content').toLowerCase();
                }
                i += 1;
            }
        }
        //get lang for frame from enclosing document
        if (!mainLanguage && doFrames && (!!contextWindow.frameElement)) {
            autoSetMainLanguage(window.parent);
        }
        //fallback to defaultLang if set
        if (!mainLanguage && defaultLanguage !== '') {
            mainLanguage = defaultLanguage;
        }
        //ask user for lang
        if (!mainLanguage) {
            mainLanguage = getLangFromUser();
        }
        el.lang = mainLanguage;
    }

    /**
     * @method Hyphenator~gatherDocumentInfos
     * @desc
     * This method runs through the DOM and executes the process()-function on:
     * - every node returned by the {@link Hyphenator~selectorFunction}.
     * @access private
     */
    function gatherDocumentInfos() {
        var elToProcess,
            urlhyphenEls,
            tmp,
            i = 0;
        /**
         * @method Hyphenator~gatherDocumentInfos
         * @desc
         * This method copies the element to the elements-variable, sets its visibility
         * to intermediateState, retrieves its language and recursivly descends the DOM-tree until
         * the child-Nodes aren't of type 1
         * @param {Object} el a DOM element
         * @param {string} plang the language of the parent element
         * @param {boolean} isChild true, if the parent of el has been processed
         */
        function process(el, pLang, isChild) {
            var n,
                j = 0,
                hyphenate = true,
                eLang,
                useCSS3 = function () {
                    css3hyphenateClassHandle = makeCSSEdit(contextWindow);
                    css3hyphenateClassHandle.setRule('.' + css3hyphenateClass, css3_h9n.property + ': auto;');
                    css3hyphenateClassHandle.setRule('.' + dontHyphenateClass, css3_h9n.property + ': manual;');
                    if ((eLang !== pLang) && css3_h9n.property.indexOf('webkit') !== -1) {
                        css3hyphenateClassHandle.setRule('.' + css3hyphenateClass, '-webkit-locale : ' + eLang + ';');
                    }
                    el.className = el.className + ' ' + css3hyphenateClass;
                },
                useHyphenator = function () {
                    //quick fix for test111.html
                    //better: weight elements
                    if (isBookmarklet && eLang !== mainLanguage) {
                        return;
                    }
                    if (supportedLangs.hasOwnProperty(eLang)) {
                        docLanguages[eLang] = true;
                    } else {
                        if (supportedLangs.hasOwnProperty(eLang.split('-')[0])) { //try subtag
                            eLang = eLang.split('-')[0];
                            docLanguages[eLang] = true;
                        } else if (!isBookmarklet) {
                            hyphenate = false;
                            onError(new Error('Language "' + eLang + '" is not yet supported.'));
                        }
                    }
                    if (hyphenate) {
                        if (intermediateState === 'hidden') {
                            el.className = el.className + ' ' + hideClass;
                        }
                        elements.add(el, eLang);
                    }
                };
            isChild = isChild || false;
            if (el.lang && typeof el.lang === 'string') {
                eLang = el.lang.toLowerCase(); //copy attribute-lang to internal eLang
            } else if (!!pLang && pLang !== '') {
                eLang = pLang.toLowerCase();
            } else {
                eLang = getLang(el, true);
            }

            if (!isChild) {
                if (css3 && css3_h9n.support && !!css3_h9n.checkLangSupport(eLang)) {
                    useCSS3();
                } else {
                    useHyphenator();
                }
            } else {
                if (eLang !== pLang) {
                    if (css3 && css3_h9n.support && !!css3_h9n.checkLangSupport(eLang)) {
                        useCSS3();
                    } else {
                        useHyphenator();
                    }
                } else {
                    if (!css3 || !css3_h9n.support || !css3_h9n.checkLangSupport(eLang)) {
                        useHyphenator();
                    } // else do nothing
                }
            }
            n = el.childNodes[j];
            while (!!n) {
                if (n.nodeType === 1 && !dontHyphenate[n.nodeName.toLowerCase()] &&
                        n.className.indexOf(dontHyphenateClass) === -1 &&
                        n.className.indexOf(urlHyphenateClass) === -1 && !elToProcess[n]) {
                    process(n, eLang, true);
                }
                j += 1;
                n = el.childNodes[j];
            }
        }
        function processUrlStyled(el) {
            var n, j = 0;

            n = el.childNodes[j];
            while (!!n) {
                if (n.nodeType === 1 && !dontHyphenate[n.nodeName.toLowerCase()] &&
                        n.className.indexOf(dontHyphenateClass) === -1 &&
                        n.className.indexOf(hyphenateClass) === -1 && !urlhyphenEls[n]) {
                    processUrlStyled(n);
                } else if (n.nodeType === 3) {
                    n.data = hyphenateURL(n.data);
                }
                j += 1;
                n = el.childNodes[j];
            }
        }

        if (css3) {
            css3_h9n = css3_gethsupport();
        }
        if (isBookmarklet) {
            elToProcess = contextWindow.document.getElementsByTagName('body')[0];
            process(elToProcess, mainLanguage, false);
        } else {
            if (!css3 && intermediateState === 'hidden') {
                CSSEditors.push(makeCSSEdit(contextWindow));
                CSSEditors[CSSEditors.length - 1].setRule('.' + hyphenateClass, 'visibility: hidden;');
                CSSEditors[CSSEditors.length - 1].setRule('.' + hideClass, 'visibility: hidden;');
                CSSEditors[CSSEditors.length - 1].setRule('.' + unhideClass, 'visibility: visible;');
            }
            elToProcess = selectElements();
            tmp = elToProcess[i];
            while (!!tmp) {
                process(tmp, '', false);
                i += 1;
                tmp = elToProcess[i];
            }

            urlhyphenEls = mySelectorFunction(urlHyphenateClass);
            i = 0;
            tmp = urlhyphenEls[i];
            while (!!tmp) {
                processUrlStyled(tmp);
                i += 1;
                tmp = urlhyphenEls[i];
            }
        }
        if (elements.counters[0] === 0) {
            //nothing to hyphenate or all hyphenated by css3
            i = 0;
            while (i < CSSEditors.length) {
                CSSEditors[i].clearChanges();
                i += 1;
            }
            onHyphenationDone(contextWindow.location.href);
        }
    }

    /**
     * @method Hyphenator~createCharMap
     * @desc
     * reads the charCodes from lo.characters and stores them in a bidi map:
     * charMap.int2code =  [0: 97, //a
     *                      1: 98, //b
     *                      2: 99] //c etc.
     * charMap.code2int = {"97": 0, //a
     *                     "98": 1, //b
     *                     "99": 2} //c etc.
     * @access private
     * @param {Object} language object
     */
    function makeCharMap() {
        var int2code = [],
            code2int = {},
            add = function (newValue) {
                if (!code2int[newValue]) {
                    int2code.push(newValue);
                    code2int[newValue] = int2code.length - 1;
                }
            };
        return {
            int2code: int2code,
            code2int: code2int,
            add: add
        };
    }

    /**
     * @constructor Hyphenator~ValueStore
     * @desc Storage-Object for storing hyphenation points (aka values)
     * @access private
     */
    function makeValueStore(len) {
        var indexes = (function () {
                var arr;
                if (Object.prototype.hasOwnProperty.call(window, "Uint32Array")) { //IE<9 doesn't have window.hasOwnProperty (host object)
                    arr = new window.Uint32Array(3);
                    arr[0] = 1; //start position of a value set
                    arr[1] = 1; //next index
                    arr[2] = 1; //last index with a significant value
                } else {
                    arr = [1, 1, 1];
                }
                return arr;
            }()),
            keys = (function () {
                var i, r;
                if (Object.prototype.hasOwnProperty.call(window, "Uint8Array")) { //IE<9 doesn't have window.hasOwnProperty (host object)
                    return new window.Uint8Array(len);
                }
                r = [];
                r.length = len;
                i = r.length - 1;
                while (i >= 0) {
                    r[i] = 0;
                    i -= 1;
                }
                return r;
            }()),
            add = function (p) {
                keys[indexes[1]] = p;
                indexes[2] = indexes[1];
                indexes[1] += 1;
            },
            add0 = function () {
                //just do a step, since array is initialized with zeroes
                indexes[1] += 1;
            },
            finalize = function () {
                var start = indexes[0];
                keys[indexes[2] + 1] = 255; //mark end of pattern
                indexes[0] = indexes[2] + 2;
                indexes[1] = indexes[0];
                return start;
            };
        return {
            keys: keys,
            add: add,
            add0: add0,
            finalize: finalize
        };
    }

    /**
     * @method Hyphenator~convertPatternsToArray
     * @desc
     * converts the patterns to a (typed, if possible) array as described by Liang:
     *
     * 1. Create the CharMap: an alphabet of used character codes mapped to an int (e.g. a: "97" -> 0)
     *    This map is bidirectional:
     *    charMap.code2int is an object with charCodes as keys and corresponging ints as values
     *    charMao.int2code is an array of charCodes at int indizes
     *    the length of charMao.int2code is equal the length of the alphabet
     *
     * 2. Create a ValueStore: (typed) array that holds "values", i.e. the digits extracted from the patterns
     *    The first value set starts at index 1 (since the trie is initialized with zeroes, starting at 0 would create errors)
     *    Each value set ends with a value of 255; trailing 0's are not stored. So pattern values like e.g. "010200" will become […,0,1,0,2,255,…]
     *    The ValueStore-Object manages handling of indizes automatically. Use ValueStore.add(p) to add a running value.
     *    Use ValueStore.finalize() when the last value of a pattern is added. It will add the final 255, prepare the valueStore for new values
     *    and return the starting index of the pattern.
     *    To prevent doubles we could temporarly store the values in a object {value: startIndex} and only add new values,
     *    but this object deoptimizes very fast (new hidden map for each entry); here we gain speed and pay memory
     *
     * 3. Create and zero initialize a (typed) array to store the trie. The trie uses two slots for each entry/node:
     *    i: a link to another position in the array or -1 if the pattern ends here or more rows have to be added.
     *    i + 1: a link to a value in the ValueStore or 0 if there's no value for the path to this node.
     *    Although the array is one-dimensional it can be described as an array of "rows",
     *    where each "row" is an array of length trieRowLength (see below).
     *    The first entry of this "row" represents the first character of the alphabet, the second a possible link to value store,
     *    the third represents the second character of the alphabet and so on…
     *
     * 4. Initialize trieRowLength (length of the alphabet * 2)
     *
     * 5. Now we apply extract to each pattern collection (patterns of the same length are collected and concatenated to one string)
     *    extract goes through these pattern collections char by char and adds them either to the ValueStore (if they are digits) or
     *    to the trie (adding more "rows" if necessary, i.e. if the last link pointed to -1).
     *    So the first "row" holds all starting characters, where the subsequent rows hold the characters that follow the
     *    character that link to this row. Therefor the array is dense at the beginning and very sparse at the end.
     *
     *
     * @access private
     * @param {Object} language object
     */
    function convertPatternsToArray(lo) {
        var trieNextEmptyRow = 0,
            i,
            charMapc2i,
            valueStore,
            indexedTrie,
            trieRowLength,

            extract = function (patternSizeInt, patterns) {
                var charPos = 0,
                    charCode = 0,
                    mappedCharCode = 0,
                    rowStart = 0,
                    nextRowStart = 0,
                    prevWasDigit = false;
                while (charPos < patterns.length) {
                    charCode = patterns.charCodeAt(charPos);
                    if ((charPos + 1) % patternSizeInt !== 0) {
                        //more to come…
                        if (charCode <= 57 && charCode >= 49) {
                            //charCode is a digit
                            valueStore.add(charCode - 48);
                            prevWasDigit = true;
                        } else {
                            //charCode is alphabetical
                            if (!prevWasDigit) {
                                valueStore.add0();
                            }
                            prevWasDigit = false;
                            if (nextRowStart === -1) {
                                nextRowStart = trieNextEmptyRow + trieRowLength;
                                trieNextEmptyRow = nextRowStart;
                                indexedTrie[rowStart + mappedCharCode * 2] = nextRowStart;
                            }
                            mappedCharCode = charMapc2i[charCode];
                            rowStart = nextRowStart;
                            nextRowStart = indexedTrie[rowStart + mappedCharCode * 2];
                            if (nextRowStart === 0) {
                                indexedTrie[rowStart + mappedCharCode * 2] = -1;
                                nextRowStart = -1;
                            }
                        }
                    } else {
                        //last part of pattern
                        if (charCode <= 57 && charCode >= 49) {
                            //the last charCode is a digit
                            valueStore.add(charCode - 48);
                            indexedTrie[rowStart + mappedCharCode * 2 + 1] = valueStore.finalize();
                        } else {
                            //the last charCode is alphabetical
                            if (!prevWasDigit) {
                                valueStore.add0();
                            }
                            valueStore.add0();
                            if (nextRowStart === -1) {
                                nextRowStart = trieNextEmptyRow + trieRowLength;
                                trieNextEmptyRow = nextRowStart;
                                indexedTrie[rowStart + mappedCharCode * 2] = nextRowStart;
                            }
                            mappedCharCode = charMapc2i[charCode];
                            rowStart = nextRowStart;
                            if (indexedTrie[rowStart + mappedCharCode * 2] === 0) {
                                indexedTrie[rowStart + mappedCharCode * 2] = -1;
                            }
                            indexedTrie[rowStart + mappedCharCode * 2 + 1] = valueStore.finalize();
                        }
                        rowStart = 0;
                        nextRowStart = 0;
                        prevWasDigit = false;
                    }
                    charPos += 1;
                }
            };/*,
            prettyPrintIndexedTrie = function (rowLength) {
                var s = "0: ",
                    idx;
                for (idx = 0; idx < indexedTrie.length; idx += 1) {
                    s += indexedTrie[idx];
                    s += ",";
                    if ((idx + 1) % rowLength === 0) {
                        s += "\n" + (idx + 1) + ": ";
                    }
                }
                console.log(s);
            };*/

        lo.charMap = makeCharMap();
        i = 0;
        while (i < lo.patternChars.length) {
            lo.charMap.add(lo.patternChars.charCodeAt(i));
            i += 1;
        }
        charMapc2i = lo.charMap.code2int;

        valueStore = makeValueStore(lo.valueStoreLength);
        lo.valueStore = valueStore;

        if (Object.prototype.hasOwnProperty.call(window, "Int32Array")) { //IE<9 doesn't have window.hasOwnProperty (host object)
            lo.indexedTrie = new window.Int32Array(lo.patternArrayLength * 2);
        } else {
            lo.indexedTrie = [];
            lo.indexedTrie.length = lo.patternArrayLength * 2;
            i = lo.indexedTrie.length - 1;
            while (i >= 0) {
                lo.indexedTrie[i] = 0;
                i -= 1;
            }
        }
        indexedTrie = lo.indexedTrie;
        trieRowLength = lo.charMap.int2code.length * 2;

        forEachKey(lo.patterns, function (i) {
            extract(parseInt(i, 10), lo.patterns[i]);
        });
        //prettyPrintIndexedTrie(lo.charMap.int2code.length * 2);
    }

    /**
     * @method Hyphenator~recreatePattern
     * @desc
     * Recreates the pattern for the reducedPatternSet
     * @param {string} pattern The pattern (chars)
     * @param {string} nodePoints The nodePoints (integers)
     * @access private
     * @return {string} The pattern (chars and numbers)
     */
    function recreatePattern(pattern, nodePoints) {
        var r = [],
            c = pattern.split(''),
            i = 0;
        while (i <= c.length) {
            if (nodePoints[i] && nodePoints[i] !== 0) {
                r.push(nodePoints[i]);
            }
            if (c[i]) {
                r.push(c[i]);
            }
            i += 1;
        }
        return r.join('');
    }

    /**
     * @method Hyphenator~convertExceptionsToObject
     * @desc
     * Converts a list of comma seprated exceptions to an object:
     * 'Fortran,Hy-phen-a-tion' -> {'Fortran':'Fortran','Hyphenation':'Hy-phen-a-tion'}
     * @access private
     * @param {string} exc a comma separated string of exceptions (without spaces)
     * @return {Object.<string, string>}
     */
    function convertExceptionsToObject(exc) {
        var w = exc.split(', '),
            r = {},
            i = 0,
            l = w.length,
            key;
        while (i < l) {
            key = w[i].replace(/-/g, '');
            if (!r.hasOwnProperty(key)) {
                r[key] = w[i];
            }
            i += 1;
        }
        return r;
    }

    /**
     * @method Hyphenator~loadPatterns
     * @desc
     * Checks if the requested file is available in the network.
     * Adds a &lt;script&gt;-Tag to the DOM to load an externeal .js-file containing patterns and settings for the given language.
     * If the given language is not in the {@link Hyphenator~supportedLangs}-Object it returns.
     * One may ask why we are not using AJAX to load the patterns. The XMLHttpRequest-Object
     * has a same-origin-policy. This makes the Bookmarklet impossible.
     * @param {string} lang The language to load the patterns for
     * @access private
     * @see {@link Hyphenator~basePath}
     */
    function loadPatterns(lang, cb) {
        var location, xhr, head, script, done = false;
        if (supportedLangs.hasOwnProperty(lang) && !Hyphenator.languages[lang]) {
            location = basePath + 'patterns/' + supportedLangs[lang].file;
        } else {
            return;
        }
        if (isLocal && !isBookmarklet) {
            //check if 'location' is available:
            xhr = null;
            try {
                // Mozilla, Opera, Safari and Internet Explorer (ab v7)
                xhr = new window.XMLHttpRequest();
            } catch (ignore) {
                try {
                    //IE>=6
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                } catch (ignore) {
                    try {
                        //IE>=5
                        xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
                    } catch (ignore) {
                        xhr = null;
                    }
                }
            }

            if (xhr) {
                xhr.open('HEAD', location, true);
                xhr.setRequestHeader('Cache-Control', 'no-cache');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 2) {
                        if (xhr.status >= 400) {
                            onError(new Error('Could not load\n' + location));
                            delete docLanguages[lang];
                            return;
                        }
                        xhr.abort();
                    }
                };
                xhr.send(null);
            }
        }
        if (createElem) {
            head = window.document.getElementsByTagName('head').item(0);
            script = createElem('script', window);
            script.src = location;
            script.type = 'text/javascript';
            script.charset = 'utf8';
            script.onreadystatechange = function () {
                if (!done && (!script.readyState || script.readyState === "loaded" || script.readyState === "complete")) {
                    done = true;

                    cb();

                    // Handle memory leak in IE
                    script.onreadystatechange = null;
                    script.onload = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                }
            };
            script.onload = script.onreadystatechange;
            head.appendChild(script);
        }
    }

    /**
     * @method Hyphenator~createWordRegExp
     * @desc
     * build a regexp string for finding a word of a given languate
     * @access private
     * @param {string} lang The language
     * @return {string}
     */
    function createWordRegExp(lang) {
        var lo = Hyphenator.languages[lang],
            wrd = "";
        if (String.prototype.normalize) {
            wrd = '[\\w' + lo.specialChars + lo.specialChars.normalize("NFD") + hyphen + String.fromCharCode(8204) + '-]{' + min + ',}(?!:\\/\\/)';
        } else {
            wrd = '[\\w' + lo.specialChars + hyphen + String.fromCharCode(8204) + '-]{' + min + ',}(?!:\\/\\/)';
        }
        return wrd;
    }

    /**
     * @method Hyphenator~prepareLanguagesObj
     * @desc
     * Adds some feature to the language object:
     * - cache
     * - exceptions
     * Converts the patterns to a trie using {@link Hyphenator~convertPatterns}
     * @access private
     * @param {string} lang The language of the language object
     */
    function prepareLanguagesObj(lang) {
        var lo = Hyphenator.languages[lang];

        if (!lo.prepared) {
            if (enableCache) {
                lo.cache = {};
                //Export
                //lo['cache'] = lo.cache;
            }
            if (enableReducedPatternSet) {
                lo.redPatSet = {};
            }
            if (leftmin > lo.leftmin) {
                lo.leftmin = leftmin;
            }
            if (rightmin > lo.rightmin) {
                lo.rightmin = rightmin;
            }
            //add exceptions from the pattern file to the local 'exceptions'-obj
            if (lo.hasOwnProperty('exceptions')) {
                Hyphenator.addExceptions(lang, lo.exceptions);
                delete lo.exceptions;
            }
            //copy global exceptions to the language specific exceptions
            if (exceptions.hasOwnProperty('global')) {
                if (exceptions.hasOwnProperty(lang)) {
                    exceptions[lang] += ', ' + exceptions.global;
                } else {
                    exceptions[lang] = exceptions.global;
                }
            }
            //move exceptions from the the local 'exceptions'-obj to the 'language'-object
            if (exceptions.hasOwnProperty(lang)) {
                lo.exceptions = convertExceptionsToObject(exceptions[lang]);
                delete exceptions[lang];
            } else {
                lo.exceptions = {};
            }
            convertPatternsToArray(lo);
            lo.genRegExp = new RegExp('(' + createWordRegExp(lang) + ')|(' + url + ')|(' + mail + ')', 'gi');
            lo.prepared = true;
        }
    }

    /****
     * @method Hyphenator~prepare
     * @desc
     * This funtion prepares the Hyphenator~Object: If RemoteLoading is turned off, it assumes
     * that the patternfiles are loaded, all conversions are made and the callback is called.
     * If storage is active the object is retrieved there.
     * If RemoteLoading is on (default), it loads the pattern files and repeatedly checks Hyphenator.languages.
     * If a patternfile is loaded the patterns are stored in storage (if enabled),
     * converted to their object style and the lang-object extended.
     * Finally the callback is called.
     * @access private
     */
    function prepare(callback) {
        var tmp1;

        function languagesLoaded() {
            forEachKey(docLanguages, function (l) {
                if (Hyphenator.languages.hasOwnProperty(l)) {
                    delete docLanguages[l];
                    if (!!storage) {
                        storage.setItem(l, window.JSON.stringify(Hyphenator.languages[l]));
                    }
                    prepareLanguagesObj(l);
                    callback(l);
                }
            });
        }

        if (!enableRemoteLoading) {
            forEachKey(Hyphenator.languages, function (lang) {
                prepareLanguagesObj(lang);
            });
            callback('*');
            return;
        }
        // get all languages that are used and preload the patterns
        forEachKey(docLanguages, function (lang) {
            if (!!storage && storage.test(lang)) {
                Hyphenator.languages[lang] = window.JSON.parse(storage.getItem(lang));
                prepareLanguagesObj(lang);
                if (exceptions.hasOwnProperty('global')) {
                    tmp1 = convertExceptionsToObject(exceptions.global);
                    forEachKey(tmp1, function (tmp2) {
                        Hyphenator.languages[lang].exceptions[tmp2] = tmp1[tmp2];
                    });
                }
                //Replace exceptions since they may have been changed:
                if (exceptions.hasOwnProperty(lang)) {
                    tmp1 = convertExceptionsToObject(exceptions[lang]);
                    forEachKey(tmp1, function (tmp2) {
                        Hyphenator.languages[lang].exceptions[tmp2] = tmp1[tmp2];
                    });
                    delete exceptions[lang];
                }
                //Replace genRegExp since it may have been changed:
                Hyphenator.languages[lang].genRegExp = new RegExp('(' + createWordRegExp(lang) + ')|(' + url + ')|(' + mail + ')', 'gi');
                if (enableCache) {
                    if (!Hyphenator.languages[lang].cache) {
                        Hyphenator.languages[lang].cache = {};
                    }
                }
                delete docLanguages[lang];
                callback(lang);
            } else {
                loadPatterns(lang, languagesLoaded);
            }
        });
        //call languagesLoaded in case language has been loaded manually
        //and remoteLoading is on (onload won't fire)
        languagesLoaded();
    }

    /**
     * @method Hyphenator~toggleBox
     * @desc
     * Creates the toggleBox: a small button to turn off/on hyphenation on a page.
     * @see {@link Hyphenator.config}
     * @access private
     */
    var toggleBox = function () {
        var bdy,
            myTextNode,
            text = (Hyphenator.doHyphenation
                ? 'Hy-phen-a-tion'
                : 'Hyphenation'),
            myBox = contextWindow.document.getElementById('HyphenatorToggleBox');
        if (!!myBox) {
            myBox.firstChild.data = text;
        } else {
            bdy = contextWindow.document.getElementsByTagName('body')[0];
            myBox = createElem('div', contextWindow);
            myBox.setAttribute('id', 'HyphenatorToggleBox');
            myBox.setAttribute('class', dontHyphenateClass);
            myTextNode = contextWindow.document.createTextNode(text);
            myBox.appendChild(myTextNode);
            myBox.onclick = Hyphenator.toggleHyphenation;
            myBox.style.position = 'absolute';
            myBox.style.top = '0px';
            myBox.style.right = '0px';
            myBox.style.zIndex = '1000';
            myBox.style.margin = '0';
            myBox.style.backgroundColor = '#AAAAAA';
            myBox.style.color = '#FFFFFF';
            myBox.style.font = '6pt Arial';
            myBox.style.letterSpacing = '0.2em';
            myBox.style.padding = '3px';
            myBox.style.cursor = 'pointer';
            myBox.style.WebkitBorderBottomLeftRadius = '4px';
            myBox.style.MozBorderRadiusBottomleft = '4px';
            myBox.style.borderBottomLeftRadius = '4px';
            bdy.appendChild(myBox);
        }
    };

    /**
     * @method Hyphenator~doCharSubst
     * @desc
     * Replace chars in a word
     *
     * @param {Object} loCharSubst Map of substitutions ({'ä': 'a', 'ü': 'u', …})
     * @param {string} w the word
     * @returns string The word with substituted characers
     * @access private
     */
    function doCharSubst(loCharSubst, w) {
        var r = w;
        forEachKey(loCharSubst, function (subst) {
            r = r.replace(new RegExp(subst, 'g'), loCharSubst[subst]);
        });
        return r;
    }

    /**
     * @member {Array} Hyphenator~wwAsMappedCharCodeStore
     * @desc
     * Array (typed if supported) container for charCodes
     * @access private
     * @see {@link Hyphenator~hyphenateWord}
     */
    var wwAsMappedCharCodeStore = (function () {
        if (Object.prototype.hasOwnProperty.call(window, "Int32Array")) {
            return new window.Int32Array(64);
        }
        return [];
    }());

    /**
     * @member {Array} Hyphenator~wwhpStore
     * @desc
     * Array (typed if supported) container for hyphenation points
     * @access private
     * @see {@link Hyphenator~hyphenateWord}
     */
    var wwhpStore = (function () {
        var r;
        if (Object.prototype.hasOwnProperty.call(window, "Uint8Array")) {
            r = new window.Uint8Array(64);
        } else {
            r = [];
        }
        return r;
    }());

    /**
     * @method Hyphenator~hyphenateCompound
     * @desc
     * Treats compound words accordingly to the 'compound' setting
     *
     * @param {Object} lo A language object (containing the patterns)
     * @param {string} lang The language of the word
     * @param {string} word The word
     * @returns string The (hyphenated) compound word
     * @access private
     */
    function hyphenateCompound(lo, lang, word) {
        var hw, parts, i = 0;
        switch (compound) {
        case "auto":
            parts = word.split('-');
            while (i < parts.length) {
                if (parts[i].length >= min) {
                    parts[i] = hyphenateWord(lo, lang, parts[i]);
                }
                i += 1;
            }
            hw = parts.join('-');
            break;
        case "all":
            parts = word.split('-');
            while (i < parts.length) {
                if (parts[i].length >= min) {
                    parts[i] = hyphenateWord(lo, lang, parts[i]);
                }
                i += 1;
            }
            hw = parts.join('-' + zeroWidthSpace);
            break;
        case "hyphen":
            hw = word.replace('-', '-' + zeroWidthSpace);
            break;
        default:
            onError(new Error('Hyphenator.settings: compound setting "' + compound + '" not known.'));
        }
        return hw;
    }

    /**
     * @method Hyphenator~hyphenateWord
     * @desc
     * This function is the heart of Hyphenator.js. It returns a hyphenated word.
     *
     * If there's already a {@link Hyphenator~hypen} in the word, the word is returned as it is.
     * If the word is in the exceptions list or in the cache, it is retrieved from it.
     * If there's a '-' it calls Hyphenator~hyphenateCompound
     * The hyphenated word is returned and (if acivated) cached.
     * Both special Events onBeforeWordHyphenation and onAfterWordHyphenation are called for the word.
     * @param {Object} lo A language object (containing the patterns)
     * @param {string} lang The language of the word
     * @param {string} word The word
     * @returns string The hyphenated word
     * @access private
     */
    function hyphenateWord(lo, lang, word) {
        var pattern = "",
            ww,
            wwlen,
            wwhp = wwhpStore,
            pstart = 0,
            plen,
            hp,
            hpc,
            wordLength = word.length,
            hw = '',
            charMap = lo.charMap.code2int,
            charCode,
            mappedCharCode,
            row = 0,
            link = 0,
            value = 0,
            values,
            indexedTrie = lo.indexedTrie,
            valueStore = lo.valueStore.keys,
            wwAsMappedCharCode = wwAsMappedCharCodeStore;
        word = onBeforeWordHyphenation(word, lang);
        if (word === '') {
            hw = '';
        } else if (enableCache && lo.cache && lo.cache.hasOwnProperty(word)) { //the word is in the cache
            hw = lo.cache[word];
        } else if (word.indexOf(hyphen) !== -1) {
            //word already contains shy; -> leave at it is!
            hw = word;
        } else if (lo.exceptions.hasOwnProperty(word)) { //the word is in the exceptions list
            hw = lo.exceptions[word].replace(/-/g, hyphen);
        } else if (word.indexOf('-') !== -1) {
            hw = hyphenateCompound(lo, lang, word);
        } else {
            ww = word.toLowerCase();
            if (String.prototype.normalize) {
                ww = ww.normalize("NFC");
            }
            if (lo.hasOwnProperty("charSubstitution")) {
                ww = doCharSubst(lo.charSubstitution, ww);
            }
            if (word.indexOf("'") !== -1) {
                ww = ww.replace(/'/g, "’"); //replace APOSTROPHE with RIGHT SINGLE QUOTATION MARK (since the latter is used in the patterns)
            }
            ww = '_' + ww + '_';
            wwlen = ww.length;
            //prepare wwhp and wwAsMappedCharCode
            while (pstart < wwlen) {
                wwhp[pstart] = 0;
                charCode = ww.charCodeAt(pstart);
                wwAsMappedCharCode[pstart] = charMap.hasOwnProperty(charCode)
                    ? charMap[charCode]
                    : -1;
                pstart += 1;
            }
            //get hyphenation points for all substrings
            pstart = 0;
            while (pstart < wwlen) {
                row = 0;
                pattern = '';
                plen = pstart;
                while (plen < wwlen) {
                    mappedCharCode = wwAsMappedCharCode[plen];
                    if (mappedCharCode === -1) {
                        break;
                    }
                    if (enableReducedPatternSet) {
                        pattern += ww.charAt(plen);
                    }
                    link = indexedTrie[row + mappedCharCode * 2];
                    value = indexedTrie[row + mappedCharCode * 2 + 1];
                    if (value > 0) {
                        hpc = 0;
                        hp = valueStore[value + hpc];
                        while (hp !== 255) {
                            if (hp > wwhp[pstart + hpc]) {
                                wwhp[pstart + hpc] = hp;
                            }
                            hpc += 1;
                            hp = valueStore[value + hpc];
                        }
                        if (enableReducedPatternSet) {
                            if (!lo.redPatSet) {
                                lo.redPatSet = {};
                            }
                            if (valueStore.subarray) {
                                values = valueStore.subarray(value, value + hpc);
                            } else {
                                values = valueStore.slice(value, value + hpc);
                            }
                            lo.redPatSet[pattern] = recreatePattern(pattern, values);
                        }
                    }
                    if (link > 0) {
                        row = link;
                    } else {
                        break;
                    }
                    plen += 1;
                }
                pstart += 1;
            }
            //create hyphenated word
            hp = 0;
            while (hp < wordLength) {
                if (hp >= lo.leftmin && hp <= (wordLength - lo.rightmin) && (wwhp[hp + 1] % 2) !== 0) {
                    hw += hyphen + word.charAt(hp);
                } else {
                    hw += word.charAt(hp);
                }
                hp += 1;
            }
        }
        hw = onAfterWordHyphenation(hw, lang);
        if (enableCache) { //put the word in the cache
            lo.cache[word] = hw;
        }
        return hw;
    }

    /**
     * @method Hyphenator~removeHyphenationFromElement
     * @desc
     * Removes all hyphens from the element. If there are other elements, the function is
     * called recursively.
     * Removing hyphens is usefull if you like to copy text. Some browsers are buggy when the copy hyphenated texts.
     * @param {Object} el The element where to remove hyphenation.
     * @access public
     */
    function removeHyphenationFromElement(el) {
        var h, u, i = 0, n;
        //escape hyphen
        if (".\\+*?[^]$(){}=!<>|:-".indexOf(hyphen) !== -1) {
            h = "\\" + hyphen;
        } else {
            h = hyphen;
        }
        //escape hyphen
        if (".\\+*?[^]$(){}=!<>|:-".indexOf(urlhyphen) !== -1) {
            u = "\\" + urlhyphen;
        } else {
            u = urlhyphen;
        }
        n = el.childNodes[i];
        while (!!n) {
            if (n.nodeType === 3) {
                n.data = n.data.replace(new RegExp(h, 'g'), '');
                n.data = n.data.replace(new RegExp(u, 'g'), '');
            } else if (n.nodeType === 1) {
                removeHyphenationFromElement(n);
            }
            i += 1;
            n = el.childNodes[i];
        }
    }

    var copy = (function () {
        var makeCopy = function () {
            var oncopyHandler = function (e) {
                    e = e || window.event;
                    var shadow,
                        selection,
                        range,
                        rangeShadow,
                        restore,
                        target = e.target || e.srcElement,
                        currDoc = target.ownerDocument,
                        bdy = currDoc.getElementsByTagName('body')[0],
                        targetWindow = currDoc.defaultView || currDoc.parentWindow;
                    if (target.tagName && dontHyphenate[target.tagName.toLowerCase()]) {
                        //Safari needs this
                        return;
                    }
                    //create a hidden shadow element
                    shadow = currDoc.createElement('div');
                    //Moving the element out of the screen doesn't work for IE9 (https://connect.microsoft.com/IE/feedback/details/663981/)
                    //shadow.style.overflow = 'hidden';
                    //shadow.style.position = 'absolute';
                    //shadow.style.top = '-5000px';
                    //shadow.style.height = '1px';
                    //doing this instead:
                    shadow.style.color = window.getComputedStyle
                        ? targetWindow.getComputedStyle(bdy, null).backgroundColor
                        : '#FFFFFF';
                    shadow.style.fontSize = '0px';
                    bdy.appendChild(shadow);
                    if (!!window.getSelection) {
                        //FF3, Webkit, IE9
                        e.stopPropagation();
                        selection = targetWindow.getSelection();
                        range = selection.getRangeAt(0);
                        shadow.appendChild(range.cloneContents());
                        removeHyphenationFromElement(shadow);
                        selection.selectAllChildren(shadow);
                        restore = function () {
                            shadow.parentNode.removeChild(shadow);
                            selection.removeAllRanges(); //IE9 needs that
                            selection.addRange(range);
                        };
                    } else {
                        // IE<9
                        e.cancelBubble = true;
                        selection = targetWindow.document.selection;
                        range = selection.createRange();
                        shadow.innerHTML = range.htmlText;
                        removeHyphenationFromElement(shadow);
                        rangeShadow = bdy.createTextRange();
                        rangeShadow.moveToElementText(shadow);
                        rangeShadow.select();
                        restore = function () {
                            shadow.parentNode.removeChild(shadow);
                            if (range.text !== "") {
                                range.select();
                            }
                        };
                    }
                    zeroTimeOut(restore);
                },
                removeOnCopy = function (el) {
                    var body = el.ownerDocument.getElementsByTagName('body')[0];
                    if (!body) {
                        return;
                    }
                    el = el || body;
                    if (window.removeEventListener) {
                        el.removeEventListener("copy", oncopyHandler, true);
                    } else {
                        el.detachEvent("oncopy", oncopyHandler);
                    }
                },
                registerOnCopy = function (el) {
                    var body = el.ownerDocument.getElementsByTagName('body')[0];
                    if (!body) {
                        return;
                    }
                    el = el || body;
                    if (window.addEventListener) {
                        el.addEventListener("copy", oncopyHandler, true);
                    } else {
                        el.attachEvent("oncopy", oncopyHandler);
                    }
                };
            return {
                oncopyHandler: oncopyHandler,
                removeOnCopy: removeOnCopy,
                registerOnCopy: registerOnCopy
            };
        };

        return (safeCopy
            ? makeCopy()
            : false);
    }());


    /**
     * @method Hyphenator~checkIfAllDone
     * @desc
     * Checks if all elements in {@link Hyphenator~elements} are hyphenated, unhides them and fires onHyphenationDone()
     * @access private
     */
    function checkIfAllDone() {
        var allDone = true,
            i = 0,
            doclist = {};
        elements.each(function (ellist) {
            var j = 0,
                l = ellist.length;
            while (j < l) {
                allDone = allDone && ellist[j].hyphenated;
                if (!doclist.hasOwnProperty(ellist[j].element.baseURI)) {
                    doclist[ellist[j].element.ownerDocument.location.href] = true;
                }
                doclist[ellist[j].element.ownerDocument.location.href] = doclist[ellist[j].element.ownerDocument.location.href] && ellist[j].hyphenated;
                j += 1;
            }
        });
        if (allDone) {
            if (intermediateState === 'hidden' && unhide === 'progressive') {
                elements.each(function (ellist) {
                    var j = 0,
                        l = ellist.length,
                        el;
                    while (j < l) {
                        el = ellist[j].element;
                        el.className = el.className.replace(unhideClassRegExp, '');
                        if (el.className === '') {
                            el.removeAttribute('class');
                        }
                        j += 1;
                    }
                });
            }
            while (i < CSSEditors.length) {
                CSSEditors[i].clearChanges();
                i += 1;
            }
            forEachKey(doclist, function (doc) {
                onHyphenationDone(doc);
            });
            if (!!storage && storage.deferred.length > 0) {
                i = 0;
                while (i < storage.deferred.length) {
                    storage.deferred[i].call();
                    i += 1;
                }
                storage.deferred = [];
            }
        }
    }

    /**
     * @method Hyphenator~controlOrphans
     * @desc
     * removes orphans depending on the 'orphanControl'-setting:
     * orphanControl === 1: do nothing
     * orphanControl === 2: prevent last word to be hyphenated
     * orphanControl === 3: prevent one word on a last line (inserts a nobreaking space)
     * @param {string} part - The sring where orphans have to be removed
     * @access private
     */
    function controlOrphans(ignore, leadingWhiteSpace, lastWord, trailingWhiteSpace) {
        var h = hyphen;
        //escape hyphen
        if (".\\+*?[^]$(){}=!<>|:-".indexOf(hyphen) !== -1) {
            h = "\\" + hyphen;
        } else {
            h = hyphen;
        }
        if (orphanControl === 3 && leadingWhiteSpace === " ") {
            leadingWhiteSpace = String.fromCharCode(160);
        }
        return leadingWhiteSpace + lastWord.replace(new RegExp(h + "|" + zeroWidthSpace, 'g'), '') + trailingWhiteSpace;
    }

    /**
     * @method Hyphenator~hyphenateElement
     * @desc
     * Takes the content of the given element and - if there's text - replaces the words
     * by hyphenated words. If there's another element, the function is called recursively.
     * When all words are hyphenated, the visibility of the element is set to 'visible'.
     * @param {string} lang - The language-code of the element
     * @param {Element} elo - The element to hyphenate {@link Hyphenator~elements~ElementCollection~Element}
     * @access private
     */
    function hyphenateElement(lang, elo) {
        var el = elo.element,
            hyphenate,
            n,
            i,
            lo;
        if (Hyphenator.languages.hasOwnProperty(lang) && Hyphenator.doHyphenation) {
            lo = Hyphenator.languages[lang];
            hyphenate = function (match, word, url, mail) {
                var r;
                if (!!url || !!mail) {
                    r = hyphenateURL(match);
                } else {
                    r = hyphenateWord(lo, lang, word);
                }
                return r;
            };
            if (safeCopy && (el.tagName.toLowerCase() !== 'body')) {
                copy.registerOnCopy(el);
            }
            i = 0;
            n = el.childNodes[i];
            while (!!n) {
                if (n.nodeType === 3 //type 3 = #text
                        && (/\S/).test(n.data) //not just white space
                        && n.data.length >= min) { //longer then min
                    n.data = n.data.replace(lo.genRegExp, hyphenate);
                    if (orphanControl !== 1) {
                        //prevent last word from being hyphenated
                        n.data = n.data.replace(/(\u0020*)(\S+)(\s*)$/, controlOrphans);
                    }
                }
                i += 1;
                n = el.childNodes[i];
            }
        }
        if (intermediateState === 'hidden' && unhide === 'wait') {
            el.className = el.className.replace(hideClassRegExp, '');
            if (el.className === '') {
                el.removeAttribute('class');
            }
        }
        if (intermediateState === 'hidden' && unhide === 'progressive') {
            el.className = el.className.replace(hideClassRegExp, ' ' + unhideClass);
        }
        elo.hyphenated = true;
        elements.counters[1] += 1;
        if (elements.counters[0] <= elements.counters[1]) {
            checkIfAllDone();
        }
    }

    /**
     * @method Hyphenator~hyphenateLanguageElements
     * @desc
     * Calls hyphenateElement() for all elements of the specified language.
     * If the language is '*' then all elements are hyphenated.
     * This is done with a setTimout
     * to prevent a "long running Script"-alert when hyphenating large pages.
     * Therefore a tricky bind()-function was necessary.
     * @param {string} lang The language of the elements to hyphenate
     * @access private
     */

    function hyphenateLanguageElements(lang) {
        /*function bind(fun, arg1, arg2) {
            return function () {
                return fun(arg1, arg2);
            };
        }*/
        var i = 0,
            l;
        if (lang === '*') {
            elements.each(function (lang, ellist) {
                var j = 0,
                    le = ellist.length;
                while (j < le) {
                    //zeroTimeOut(bind(hyphenateElement, lang, ellist[j]));
                    hyphenateElement(lang, ellist[j]);
                    j += 1;
                }
            });
        } else {
            if (elements.list.hasOwnProperty(lang)) {
                l = elements.list[lang].length;
                while (i < l) {
                    //zeroTimeOut(bind(hyphenateElement, lang, elements.list[lang][i]));
                    hyphenateElement(lang, elements.list[lang][i]);
                    i += 1;
                }
            }
        }
    }

    /**
     * @method Hyphenator~removeHyphenationFromDocument
     * @desc
     * Does what it says and unregisters the onCopyEvent from the elements
     * @access private
     */
    function removeHyphenationFromDocument() {
        elements.each(function (ellist) {
            var i = 0,
                l = ellist.length;
            while (i < l) {
                removeHyphenationFromElement(ellist[i].element);
                if (safeCopy) {
                    copy.removeOnCopy(ellist[i].element);
                }
                ellist[i].hyphenated = false;
                i += 1;
            }
        });
    }

    /**
     * @method Hyphenator~createStorage
     * @desc
     * inits the private var {@link Hyphenator~storage) depending of the setting in {@link Hyphenator~storageType}
     * and the supported features of the system.
     * @access private
     */
    function createStorage() {
        var s;
        function makeStorage(s) {
            var store = s,
                prefix = 'Hyphenator_' + Hyphenator.version + '_',
                deferred = [],
                test = function (name) {
                    var val = store.getItem(prefix + name);
                    return !!val;
                },
                getItem = function (name) {
                    return store.getItem(prefix + name);
                },
                setItem = function (name, value) {
                    try {
                        store.setItem(prefix + name, value);
                    } catch (e) {
                        onError(e);
                    }
                };
            return {
                deferred: deferred,
                test: test,
                getItem: getItem,
                setItem: setItem
            };
        }
        try {
            if (storageType !== 'none' &&
                    window.JSON !== undefined &&
                    window.localStorage !== undefined &&
                    window.sessionStorage !== undefined &&
                    window.JSON.stringify !== undefined &&
                    window.JSON.parse !== undefined) {
                switch (storageType) {
                case 'session':
                    s = window.sessionStorage;
                    break;
                case 'local':
                    s = window.localStorage;
                    break;
                default:
                    s = undefined;
                }
                //check for private mode
                s.setItem('storageTest', '1');
                s.removeItem('storageTest');
            }
        } catch (ignore) {
            //FF throws an error if DOM.storage.enabled is set to false
            s = undefined;
        }
        if (s) {
            storage = makeStorage(s);
        } else {
            storage = undefined;
        }
    }

    /**
     * @method Hyphenator~storeConfiguration
     * @desc
     * Stores the current config-options in DOM-Storage
     * @access private
     */
    function storeConfiguration() {
        if (!storage) {
            return;
        }
        var settings = {
            'STORED': true,
            'classname': hyphenateClass,
            'urlclassname': urlHyphenateClass,
            'donthyphenateclassname': dontHyphenateClass,
            'minwordlength': min,
            'hyphenchar': hyphen,
            'urlhyphenchar': urlhyphen,
            'togglebox': toggleBox,
            'displaytogglebox': displayToggleBox,
            'remoteloading': enableRemoteLoading,
            'enablecache': enableCache,
            'enablereducedpatternset': enableReducedPatternSet,
            'onhyphenationdonecallback': onHyphenationDone,
            'onerrorhandler': onError,
            'onwarninghandler': onWarning,
            'intermediatestate': intermediateState,
            'selectorfunction': selectorFunction || mySelectorFunction,
            'safecopy': safeCopy,
            'doframes': doFrames,
            'storagetype': storageType,
            'orphancontrol': orphanControl,
            'dohyphenation': Hyphenator.doHyphenation,
            'persistentconfig': persistentConfig,
            'defaultlanguage': defaultLanguage,
            'useCSS3hyphenation': css3,
            'unhide': unhide,
            'onbeforewordhyphenation': onBeforeWordHyphenation,
            'onafterwordhyphenation': onAfterWordHyphenation,
            'leftmin': leftmin,
            'rightmin': rightmin,
            'compound': compound
        };
        storage.setItem('config', window.JSON.stringify(settings));
    }

    /**
     * @method Hyphenator~restoreConfiguration
     * @desc
     * Retrieves config-options from DOM-Storage and does configuration accordingly
     * @access private
     */
    function restoreConfiguration() {
        var settings;
        if (storage.test('config')) {
            settings = window.JSON.parse(storage.getItem('config'));
            Hyphenator.config(settings);
        }
    }

    /**EXPORTED VALUES**/

    /**
     * @member {string} Hyphenator.version
     * @desc
     * String containing the actual version of Hyphenator.js
     * [major release].[minor releas].[bugfix release]
     * major release: new API, new Features, big changes
     * minor release: new languages, improvements
     * @access public
     */
    var version = '5.2.0';

    /**
     * @member {boolean} Hyphenator.doHyphenation
     * @desc
     * If doHyphenation is set to false, hyphenateDocument() isn't called.
     * All other actions are performed.
     * @default true
     */
    var doHyphenation = true;

    /**
     * @typedef {Object} Hyphenator.languages.language
     * @property {Number} leftmin - The minimum of chars to remain on the old line
     * @property {Number} rightmin - The minimum of chars to go on the new line
     * @property {string} specialChars - Non-ASCII chars in the alphabet.
     * @property {Object.<number, string>} patterns - the patterns in a compressed format. The key is the length of the patterns in the value string.
     * @property {Object.<string, string>} charSubstitution - optional: a hash table with chars that are replaced during hyphenation
     * @property {string | Object.<string, string>} exceptions - optional: a csv string containing exceptions
     */

    /**
     * @member {Object.<string, Hyphenator.languages.language>} Hyphenator.languages
     * @desc
     * Objects that holds key-value pairs, where key is the language and the value is the
     * language-object loaded from (and set by) the pattern file.
     * @namespace Hyphenator.languages
     * @access public
     */
    var languages = {};

    /**
     * @method Hyphenator.config
     * @desc
     * The Hyphenator.config() function that takes an object as an argument. The object contains key-value-pairs
     * containig Hyphenator-settings.
     * @param {Hyphenator.config} obj
     * @access public
     * @example
     * &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
     * &lt;script type = "text/javascript"&gt;
     *     Hyphenator.config({'minwordlength':4,'hyphenchar':'|'});
     *     Hyphenator.run();
     * &lt;/script&gt;
     */
    function config(obj) {
        var assert = function (name, type) {
            var r,
                t;
            t = typeof obj[name];
            if (t === type) {
                r = true;
            } else {
                onError(new Error('Config onError: ' + name + ' must be of type ' + type));
                r = false;
            }
            return r;
        };

        if (obj.hasOwnProperty('storagetype')) {
            if (assert('storagetype', 'string')) {
                storageType = obj.storagetype;
            }
            if (!storage) {
                createStorage();
            }
        }
        if (!obj.hasOwnProperty('STORED') && storage && obj.hasOwnProperty('persistentconfig') && obj.persistentconfig === true) {
            restoreConfiguration();
        }

        forEachKey(obj, function (key) {
            switch (key) {
            case 'STORED':
                break;
            case 'classname':
                if (assert('classname', 'string')) {
                    hyphenateClass = obj[key];
                }
                break;
            case 'urlclassname':
                if (assert('urlclassname', 'string')) {
                    urlHyphenateClass = obj[key];
                }
                break;
            case 'donthyphenateclassname':
                if (assert('donthyphenateclassname', 'string')) {
                    dontHyphenateClass = obj[key];
                }
                break;
            case 'minwordlength':
                if (assert('minwordlength', 'number')) {
                    min = obj[key];
                }
                break;
            case 'hyphenchar':
                if (assert('hyphenchar', 'string')) {
                    if (obj.hyphenchar === '&shy;') {
                        obj.hyphenchar = String.fromCharCode(173);
                    }
                    hyphen = obj[key];
                }
                break;
            case 'urlhyphenchar':
                if (obj.hasOwnProperty('urlhyphenchar')) {
                    if (assert('urlhyphenchar', 'string')) {
                        urlhyphen = obj[key];
                    }
                }
                break;
            case 'togglebox':
                if (assert('togglebox', 'function')) {
                    toggleBox = obj[key];
                }
                break;
            case 'displaytogglebox':
                if (assert('displaytogglebox', 'boolean')) {
                    displayToggleBox = obj[key];
                }
                break;
            case 'remoteloading':
                if (assert('remoteloading', 'boolean')) {
                    enableRemoteLoading = obj[key];
                }
                break;
            case 'enablecache':
                if (assert('enablecache', 'boolean')) {
                    enableCache = obj[key];
                }
                break;
            case 'enablereducedpatternset':
                if (assert('enablereducedpatternset', 'boolean')) {
                    enableReducedPatternSet = obj[key];
                }
                break;
            case 'onhyphenationdonecallback':
                if (assert('onhyphenationdonecallback', 'function')) {
                    onHyphenationDone = obj[key];
                }
                break;
            case 'onerrorhandler':
                if (assert('onerrorhandler', 'function')) {
                    onError = obj[key];
                }
                break;
            case 'onwarninghandler':
                if (assert('onwarninghandler', 'function')) {
                    onWarning = obj[key];
                }
                break;
            case 'intermediatestate':
                if (assert('intermediatestate', 'string')) {
                    intermediateState = obj[key];
                }
                break;
            case 'selectorfunction':
                if (assert('selectorfunction', 'function')) {
                    selectorFunction = obj[key];
                }
                break;
            case 'safecopy':
                if (assert('safecopy', 'boolean')) {
                    safeCopy = obj[key];
                }
                break;
            case 'doframes':
                if (assert('doframes', 'boolean')) {
                    doFrames = obj[key];
                }
                break;
            case 'storagetype':
                if (assert('storagetype', 'string')) {
                    storageType = obj[key];
                }
                break;
            case 'orphancontrol':
                if (assert('orphancontrol', 'number')) {
                    orphanControl = obj[key];
                }
                break;
            case 'dohyphenation':
                if (assert('dohyphenation', 'boolean')) {
                    Hyphenator.doHyphenation = obj[key];
                }
                break;
            case 'persistentconfig':
                if (assert('persistentconfig', 'boolean')) {
                    persistentConfig = obj[key];
                }
                break;
            case 'defaultlanguage':
                if (assert('defaultlanguage', 'string')) {
                    defaultLanguage = obj[key];
                }
                break;
            case 'useCSS3hyphenation':
                if (assert('useCSS3hyphenation', 'boolean')) {
                    css3 = obj[key];
                }
                break;
            case 'unhide':
                if (assert('unhide', 'string')) {
                    unhide = obj[key];
                }
                break;
            case 'onbeforewordhyphenation':
                if (assert('onbeforewordhyphenation', 'function')) {
                    onBeforeWordHyphenation = obj[key];
                }
                break;
            case 'onafterwordhyphenation':
                if (assert('onafterwordhyphenation', 'function')) {
                    onAfterWordHyphenation = obj[key];
                }
                break;
            case 'leftmin':
                if (assert('leftmin', 'number')) {
                    leftmin = obj[key];
                }
                break;
            case 'rightmin':
                if (assert('rightmin', 'number')) {
                    rightmin = obj[key];
                }
                break;
            case 'compound':
                if (assert('compound', 'string')) {
                    compound = obj[key];
                }
                break;
            default:
                onError(new Error('Hyphenator.config: property ' + key + ' not known.'));
            }
        });
        if (storage && persistentConfig) {
            storeConfiguration();
        }
    }

    /**
     * @method Hyphenator.run
     * @desc
     * Bootstrap function that starts all hyphenation processes when called:
     * Tries to create storage if required and calls {@link Hyphenator~runWhenLoaded} on 'window' handing over the callback 'process'
     * @access public
     * @example
     * &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
     * &lt;script type = "text/javascript"&gt;
     *   Hyphenator.run();
     * &lt;/script&gt;
     */
    function run() {
            /**
             *@callback Hyphenator.run~process process - The function is called when the DOM has loaded (or called for each frame)
             */
        var process = function () {
            try {
                if (contextWindow.document.getElementsByTagName('frameset').length > 0) {
                    return; //we are in a frameset
                }
                autoSetMainLanguage(undefined);
                gatherDocumentInfos();
                if (displayToggleBox) {
                    toggleBox();
                }
                prepare(hyphenateLanguageElements);
            } catch (e) {
                onError(e);
            }
        };

        if (!storage) {
            createStorage();
        }
        runWhenLoaded(window, process);
    }

    /**
     * @method Hyphenator.addExceptions
     * @desc
     * Adds the exceptions from the string to the appropriate language in the
     * {@link Hyphenator~languages}-object
     * @param {string} lang The language
     * @param {string} words A comma separated string of hyphenated words WITH spaces.
     * @access public
     * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
     * &lt;script type = "text/javascript"&gt;
     *   Hyphenator.addExceptions('de','ziem-lich, Wach-stube');
     *   Hyphenator.run();
     * &lt;/script&gt;
     */
    function addExceptions(lang, words) {
        if (lang === '') {
            lang = 'global';
        }
        if (exceptions.hasOwnProperty(lang)) {
            exceptions[lang] += ", " + words;
        } else {
            exceptions[lang] = words;
        }
    }

    /**
     * @method Hyphenator.hyphenate
     * @access public
     * @desc
     * Hyphenates the target. The language patterns must be loaded.
     * If the target is a string, the hyphenated string is returned,
     * if it's an object, the values are hyphenated directly and undefined (aka nothing) is returned
     * @param {string|Object} target the target to be hyphenated
     * @param {string} lang the language of the target
     * @returns {string|undefined}
     * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
     * &lt;script src = "patterns/en.js" type = "text/javascript"&gt;&lt;/script&gt;
     * &lt;script type = "text/javascript"&gt;
     * var t = Hyphenator.hyphenate('Hyphenation', 'en'); //Hy|phen|ation
     * &lt;/script&gt;
     */
    function hyphenate(target, lang) {
        var turnout, n, i, lo;
        lo = Hyphenator.languages[lang];
        if (Hyphenator.languages.hasOwnProperty(lang)) {
            if (!lo.prepared) {
                prepareLanguagesObj(lang);
            }
            turnout = function (match, word, url, mail) {
                var r;
                if (!!url || !!mail) {
                    r = hyphenateURL(match);
                } else {
                    r = hyphenateWord(lo, lang, word);
                }
                return r;
            };
            if (typeof target === 'object' && !(typeof target === 'string' || target.constructor === String)) {
                i = 0;
                n = target.childNodes[i];
                while (!!n) {
                    if (n.nodeType === 3 //type 3 = #text
                            && (/\S/).test(n.data) //not just white space
                            && n.data.length >= min) { //longer then min
                        n.data = n.data.replace(lo.genRegExp, turnout);
                    } else if (n.nodeType === 1) {
                        if (n.lang !== '') {
                            Hyphenator.hyphenate(n, n.lang);
                        } else {
                            Hyphenator.hyphenate(n, lang);
                        }
                    }
                    i += 1;
                    n = target.childNodes[i];
                }
            } else if (typeof target === 'string' || target.constructor === String) {
                return target.replace(lo.genRegExp, turnout);
            }
        } else {
            onError(new Error('Language "' + lang + '" is not loaded.'));
        }
    }

    /**
     * @method Hyphenator.getRedPatternSet
     * @desc
     * Returns the reduced pattern set: an object looking like: {'patk': pat}
     * @param {string} lang the language patterns are stored for
     * @returns {Object.<string, string>}
     * @access public
     */
    function getRedPatternSet(lang) {
        return Hyphenator.languages[lang].redPatSet;
    }

    /**
     * @method Hyphenator.getConfigFromURI
     * @desc
     * reads and sets configurations from GET parameters in the URI
     * @access public
     */
    function getConfigFromURI() {
        var loc = null,
            re = {},
            jsArray = contextWindow.document.getElementsByTagName('script'),
            i = 0,
            j = 0,
            l = jsArray.length,
            s,
            gp,
            option;
        while (i < l) {
            if (!!jsArray[i].getAttribute('src')) {
                loc = jsArray[i].getAttribute('src');
            }
            if (loc && (loc.indexOf('Hyphenator.js?') !== -1)) {
                s = loc.indexOf('Hyphenator.js?');
                gp = loc.substring(s + 14).split('&');
                while (j < gp.length) {
                    option = gp[j].split('=');
                    if (option[0] !== 'bm') {
                        if (option[1] === 'true') {
                            option[1] = true;
                        } else if (option[1] === 'false') {
                            option[1] = false;
                        } else if (isFinite(option[1])) {
                            option[1] = parseInt(option[1], 10);
                        }
                        if (option[0] === 'togglebox' ||
                                option[0] === 'onhyphenationdonecallback' ||
                                option[0] === 'onerrorhandler' ||
                                option[0] === 'selectorfunction' ||
                                option[0] === 'onbeforewordhyphenation' ||
                                option[0] === 'onafterwordhyphenation') {
                            option[1] = new Function('', option[1]);
                        }
                        re[option[0]] = option[1];
                    }
                    j += 1;
                }
                break;
            }
            i += 1;
        }
        return re;
    }

    /**
     * @method Hyphenator.toggleHyphenation
     * @desc
     * Checks the current state of Hyphenator.doHyphenation and removes or does hyphenation.
     * @access public
     */
    function toggleHyphenation() {
        if (Hyphenator.doHyphenation) {
            if (!!css3hyphenateClassHandle) {
                css3hyphenateClassHandle.setRule('.' + css3hyphenateClass, css3_h9n.property + ': none;');
            }
            removeHyphenationFromDocument();
            Hyphenator.doHyphenation = false;
            storeConfiguration();
            if (displayToggleBox) {
                toggleBox();
            }
        } else {
            if (!!css3hyphenateClassHandle) {
                css3hyphenateClassHandle.setRule('.' + css3hyphenateClass, css3_h9n.property + ': auto;');
            }
            Hyphenator.doHyphenation = true;
            hyphenateLanguageElements('*');
            storeConfiguration();
            if (displayToggleBox) {
                toggleBox();
            }
        }
    }

    return {
        version: version,
        doHyphenation: doHyphenation,
        languages: languages,
        config: config,
        run: run,
        addExceptions: addExceptions,
        hyphenate: hyphenate,
        getRedPatternSet: getRedPatternSet,
        isBookmarklet: isBookmarklet,
        getConfigFromURI: getConfigFromURI,
        toggleHyphenation: toggleHyphenation
    };

}(window));

//Export properties/methods (for google closure compiler)
/**** to be moved to external file
Hyphenator['languages'] = Hyphenator.languages;
Hyphenator['config'] = Hyphenator.config;
Hyphenator['run'] = Hyphenator.run;
Hyphenator['addExceptions'] = Hyphenator.addExceptions;
Hyphenator['hyphenate'] = Hyphenator.hyphenate;
Hyphenator['getRedPatternSet'] = Hyphenator.getRedPatternSet;
Hyphenator['isBookmarklet'] = Hyphenator.isBookmarklet;
Hyphenator['getConfigFromURI'] = Hyphenator.getConfigFromURI;
Hyphenator['toggleHyphenation'] = Hyphenator.toggleHyphenation;
window['Hyphenator'] = Hyphenator;
*/

/*
 * call Hyphenator if it is a Bookmarklet
 */
if (Hyphenator.isBookmarklet) {
    Hyphenator.config({displaytogglebox: true, intermediatestate: 'visible', storagetype: 'local', doframes: true, useCSS3hyphenation: true});
    Hyphenator.config(Hyphenator.getConfigFromURI());
    Hyphenator.run();
}
