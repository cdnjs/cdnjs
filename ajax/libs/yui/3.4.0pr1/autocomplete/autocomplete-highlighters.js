YUI.add('autocomplete-highlighters', function(Y) {

/**
 * Provides pre-built result highlighters for AutoComplete.
 *
 * @module autocomplete
 * @submodule autocomplete-highlighters
 * @class AutoCompleteHighlighters
 * @static
 */

var YArray    = Y.Array,
    Highlight = Y.Highlight,

Highlighters = Y.mix(Y.namespace('AutoCompleteHighlighters'), {
    // -- Public Methods -------------------------------------------------------

    /**
     * Highlights any individual query character that occurs anywhere in a
     * result. Case-insensitive.
     *
     * @method charMatch
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    charMatch: function (query, results, caseSensitive) {
        // The caseSensitive parameter is only intended for use by
        // charMatchCase(). It's intentionally undocumented.

        if (!query) { return results; }

        var queryChars = YArray.unique((caseSensitive ? query :
                query.toLowerCase()).split(''));

        return YArray.map(results, function (result) {
            return Highlight.all(result.text, queryChars, {
                caseSensitive: caseSensitive
            });
        });
    },

    /**
     * Case-sensitive version of <code>charMatch()</code>.
     *
     * @method charMatchCase
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    charMatchCase: function (query, results) {
        return Highlighters.charMatch(query, results, true);
    },

    /**
     * Highlights the complete query as a phrase anywhere within a result.
     * Case-insensitive.
     *
     * @method phraseMatch
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    phraseMatch: function (query, results, caseSensitive) {
        // The caseSensitive parameter is only intended for use by
        // phraseMatchCase(). It's intentionally undocumented.

        if (!query) { return results; }

        return YArray.map(results, function (result) {
            return Highlight.all(result.text, [query], {
                caseSensitive: caseSensitive
            });
        });
    },

    /**
     * Case-sensitive version of <code>phraseMatch()</code>.
     *
     * @method phraseMatchCase
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    phraseMatchCase: function (query, results) {
        return Highlighters.phraseMatch(query, results, true);
    },

    /**
     * Highlights the complete query as a phrase at the beginning of a result.
     * Case-insensitive.
     *
     * @method startsWith
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    startsWith: function (query, results, caseSensitive) {
        // The caseSensitive parameter is only intended for use by
        // startsWithCase(). It's intentionally undocumented.

        if (!query) { return results; }

        return YArray.map(results, function (result) {
            return Highlight.all(result.text, [query], {
                caseSensitive: caseSensitive,
                startsWith   : true
            });
        });
    },

    /**
     * Case-sensitive version of <code>startsWith()</code>.
     *
     * @method startsWithCase
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    startsWithCase: function (query, results) {
        return Highlighters.startsWith(query, results, true);
    },

    /**
     * Highlights portions of results in which words from the query match either
     * whole words or parts of words in the result. Non-word characters like
     * whitespace and certain punctuation are ignored. Case-insensitive.
     *
     * @method subWordMatch
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    subWordMatch: function (query, results, caseSensitive) {
        // The caseSensitive parameter is only intended for use by
        // subWordMatchCase(). It's intentionally undocumented.

        if (!query) { return results; }

        var queryWords = Y.Text.WordBreak.getUniqueWords(query, {
            ignoreCase: !caseSensitive
        });

        return YArray.map(results, function (result) {
            return Highlight.all(result.text, queryWords, {
                caseSensitive: caseSensitive
            });
        });
    },

    /**
     * Case-sensitive version of <code>subWordMatch()</code>.
     *
     * @method subWordMatchCase
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    subWordMatchCase: function (query, results) {
        return Highlighters.subWordMatch(query, results, true);
    },

    /**
     * Highlights individual words in results that are also in the query.
     * Non-word characters like punctuation are ignored. Case-insensitive.
     *
     * @method wordMatch
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    wordMatch: function (query, results, caseSensitive) {
        // The caseSensitive parameter is only intended for use by
        // wordMatchCase(). It's intentionally undocumented.

        if (!query) { return results; }

        return YArray.map(results, function (result) {
            return Highlight.words(result.text, query, {
                caseSensitive: caseSensitive
            });
        });
    },

    /**
     * Case-sensitive version of <code>wordMatch()</code>.
     *
     * @method wordMatchCase
     * @param {String} query Query to match
     * @param {Array} results Results to highlight
     * @return {Array} Highlighted results
     * @static
     */
    wordMatchCase: function (query, results) {
        return Highlighters.wordMatch(query, results, true);
    }
});


}, '@VERSION@' ,{requires:['array-extras', 'highlight-base', 'text-wordbreak']});
