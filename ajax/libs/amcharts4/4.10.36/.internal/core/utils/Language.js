/**
 * Language module contains everything related to language-specific operations:
 * * Translating prompts
 * * Translating functions
 * * Date format localizations
 */
import { __extends, __read, __spread } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObjectEvents } from "../Base";
import { Adapter } from "./Adapter";
import * as $array from "./Array";
import * as $type from "./Type";
import en from "../../../lang/en";
import { options } from "../Options";
;
;
/**
 * Handles all language-related tasks, like loading and storing translations,
 * translating prompts, lists of prompts and even functions.
 *
 * Almost every object in amCharts4 universe will have a `language` property,
 * which can be accessed for prompt translation.
 *
 * @see {@link ILanguageAdapters} for a list of available Adapters
 * @todo Make prompt keys case-insensitive
 * @important
 */
var Language = /** @class */ (function (_super) {
    __extends(Language, _super);
    /**
     * Constructor
     */
    function Language() {
        var _this = _super.call(this) || this;
        /**
         * Adapter.
         */
        _this.adapter = new Adapter(_this);
        /**
         * Current locale.
         */
        _this._locale = en;
        /**
         * Default locale. A locale to fall back to if none is specified, or
         * if there's no translation for the prompt for the current language.
         */
        _this._defaultLocale = en;
        _this.className = "Language";
        // Set default language if necessary
        if ($type.hasValue(options.defaultLocale)) {
            _this.locale = options.defaultLocale;
        }
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns locale that is currently used.
     *
     * @param locale  Force locale. Will use current language if not set.
     * @return Locale
     */
    Language.prototype.getLocale = function (locale) {
        if (locale == null) {
            locale = this._locale;
        }
        return this.adapter.apply("locale", {
            locale: locale
        }).locale;
    };
    /**
     * Returns the translation of the string.
     *
     * If the translation is empty, it will return untranslated prompt.
     *
     * Third parameter and up are strings that can be used to replace "%X"
     * placeholders in prompt.
     *
     * E.g.:
     *
     * ```TypeScript
     * // Results in "This is a first translation test"
     * chart.language.translate("This is a %1 translation %2", null, "first", "test");
     * ```
     * ```JavaScriptScript
     * // Results in "This is a first translation test"
     * chart.language.translate("This is a %1 translation %2", null, "first", "test");
     * ```
     *
     * @param  prompt   A string to translate
     * @param  locale   Force translation into specific locale, e.g. fr_FR
     * @param  rest     Parameters to replace in string
     * @return          Translation
     */
    Language.prototype.translate = function (prompt, locale) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        // Get langauge
        locale = this.getLocale(locale);
        // Init translation
        var translation = prompt;
        // Get translations for the locale
        var translations = this.getTranslations(locale);
        var value = translations[prompt];
        // Try to look for the translation
        if (value === null) {
            translation = "";
        }
        else if ($type.hasValue(value)) {
            // It might be an empty string
            if (value) {
                translation = value;
            }
        }
        else if (locale !== this._defaultLocale) {
            // Try to look in default language
            return this.translate.apply(this, __spread([prompt, this._defaultLocale], rest));
        }
        // Replace %1, %2, etc params
        if (rest.length) {
            for (var len = rest.length, i = 0; i < len; ++i) {
                translation = translation.split("%" + (i + 1)).join(rest[i]);
            }
        }
        // Return the translation
        return this.adapter.apply("translate", {
            translation: translation,
            locale: locale
        }).translation;
    };
    /**
     * Non-type-checked translation.
     *
     * Can be used by plugins and other code that may have their own non-standard
     * translation prompts.
     *
     * @since 4.5.5
     * @param  prompt   A string to translate
     * @param  locale   Force translation into specific locale, e.g. fr_FR
     * @param  rest     Parameters to replace in string
     * @return          Translation
     */
    Language.prototype.translateAny = function (prompt, locale) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        return this.translate.apply(this, __spread([prompt, locale], rest));
    };
    /**
     * Sets a prompt translation.
     *
     * @since 4.9.35
     * @param  prompt       Prompt in English
     * @param  translation  Translation
     * @param  locale       Locale
     */
    Language.prototype.setTranslationAny = function (prompt, translation, locale) {
        var localeTarget = locale || this.locale;
        localeTarget[prompt] = translation;
    };
    /**
     * Translates prompt.
     *
     * If translation is empty, it will return empty string, which is a different
     * behavior than that of regular `translate`.
     *
     * @param prompt   A string to translate
     * @param locale   Force translation into specific locale, e.g. fr_FR
     * @param ...rest  Parameters to replace in string
     * @return Translation
     */
    Language.prototype.translateEmpty = function (prompt, locale) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        var translation = this.translate.apply(this, __spread([prompt, locale], rest));
        return translation == prompt ? "" : translation;
    };
    /**
     * Translates a function.
     *
     * This method will return a function reference, but will not run it. It's
     * up to the caller script to run the function.
     *
     * @param prompt  A function id to translate
     * @param locale  Force translation into specific locale. e.g. fr_FR
     * @return A language-specific version of the function
     * @todo Apply adapter
     */
    Language.prototype.translateFunc = function (prompt, locale) {
        // Get langauge
        locale = this.getLocale(locale);
        // Get translations for the locale
        var translations = this.getTranslations(locale);
        var value = translations[prompt];
        // Try to look for the translation
        if (value != null) {
            return value;
        }
        // Try to look in default language
        if (locale !== this._defaultLocale) {
            return this.translateFunc(prompt, this._defaultLocale);
        }
        // Fail - return empty function
        return function () {
            return "";
        };
    };
    /**
     * Translates a list of prompts in one go.
     *
     * @param list    An array of strings to translate
     * @param locale  Force translation into specific locale. e.g. fr_FR
     * @return An array of translated strings in the same order as source list
     */
    Language.prototype.translateAll = function (list, locale) {
        var _this = this;
        // Translate all items in the list
        if (!this.isDefault()) {
            return $array.map(list, function (x) { return _this.translate(x, locale); });
        }
        else {
            return list;
        }
    };
    /**
     * Returns `true` if the currently selected locale is a default locale.
     *
     * @return `true` if locale is default; `false` if it is not.
     */
    Language.prototype.isDefault = function () {
        return this._defaultLocale === this._locale;
    };
    Object.defineProperty(Language.prototype, "locale", {
        /**
         * @return Locale definition
         */
        get: function () {
            return this._locale;
        },
        /**
         * Current locale.
         *
         * @param value  Locale definition (translations)
         */
        set: function (value) {
            if (this._locale != value) {
                this._locale = value;
                if (this.events.isEnabled("localechanged")) {
                    var event_1 = {
                        type: "localechanged",
                        locale: value,
                        target: this
                    };
                    this.events.dispatchImmediately("localechanged", event_1);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns translations for a given locale.
     *
     * @ignore
     * @deprecated
     * @param locale  Locale
     * @return Translations
     */
    Language.prototype.getTranslations = function (locale) {
        return this.adapter.apply("translations", {
            translations: locale,
            locale: locale
        }).translations;
    };
    return Language;
}(BaseObjectEvents));
export { Language };
//# sourceMappingURL=Language.js.map