import getUserLocale from 'get-user-locale';
const formatterCache = new Map();
export function getFormatter(options) {
    return function formatter(locale, date) {
        const localeWithDefault = locale || getUserLocale();
        if (!formatterCache.has(localeWithDefault)) {
            formatterCache.set(localeWithDefault, new Map());
        }
        const formatterCacheLocale = formatterCache.get(localeWithDefault);
        if (!formatterCacheLocale.has(options)) {
            formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || undefined, options).format);
        }
        return formatterCacheLocale.get(options)(date);
    };
}
/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 * @returns {Date} Date with hour set to 12.
 */
function toSafeHour(date) {
    const safeDate = new Date(date);
    return new Date(safeDate.setHours(12));
}
function getSafeFormatter(options) {
    return (locale, date) => getFormatter(options)(locale, toSafeHour(date));
}
const formatMonthOptions = { month: 'long' };
const formatShortMonthOptions = { month: 'short' };
export const formatMonth = getSafeFormatter(formatMonthOptions);
export const formatShortMonth = getSafeFormatter(formatShortMonthOptions);
