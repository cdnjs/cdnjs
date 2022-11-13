import { extend } from './helpers';
const translations = {};
/**
 * Show all translations.
 * @return {object}	The translations.
 */
export const show = () => {
    return translations;
};
/**
 * Add translations to a language.
 * @param {object}  text        Object of key/value translations.
 * @param {string}  language    The translated language.
 */
export const add = (text, language) => {
    if (typeof translations[language] === 'undefined') {
        translations[language] = {};
    }
    extend(translations[language], text);
};
/**
 * Find a translated text in a language.
 * @param   {string} text       The text to find the translation for.
 * @param   {string} language   The language to search in.
 * @return  {string}            The translated text.
 */
export const get = (text, language) => {
    if (typeof language === 'string' &&
        typeof translations[language] !== 'undefined') {
        return translations[language][text] || text;
    }
    return text;
};
