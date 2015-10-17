YUI.add('escape', function(Y) {

/**
 * Provides utility methods for escaping strings.
 *
 * @module escape
 * @class Escape
 * @static
 * @since 3.3.0
 */

var HTML_CHARS = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    },

Escape = {
    // -- Public Static Methods ------------------------------------------------

    /**
     * <p>
     * Returns a copy of the specified string with special HTML characters
     * escaped. The following characters will be converted to their
     * corresponding character entities:
     * <code>&amp; &lt; &gt; &quot; &#x27; &#x2F;</code>
     * </p>
     *
     * <p>
     * This implementation is based on the
     * <a href="http://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet">OWASP
     * HTML escaping recommendations</a>.
     * </p>
     *
     * @method html
     * @param {String} string String to escape.
     * @return {String} Escaped string.
     * @static
     */
    html: function (string) {
        return string.replace(/[&<>"'\/]/g, Escape._htmlReplacer);
    },

    /**
     * Returns a copy of the specified string with special regular expression
     * characters escaped, allowing the string to be used safely inside a regex.
     * The following characters, and all whitespace characters, are escaped:
     * <code>- # $ ^ * ( ) + [ ] { } | \ , . ?</code>
     *
     * @method regex
     * @param {String} string String to escape.
     * @return {String} Escaped string.
     * @static
     */
    regex: function (string) {
        return string.replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g, '\\$&');
    },

    // -- Protected Static Methods ---------------------------------------------

    /**
     * Regex replacer for HTML escaping.
     *
     * @method _htmlReplacer
     * @param {String} match Matched character (must exist in HTML_CHARS).
     * @returns {String} HTML entity.
     * @static
     * @protected
     */
    _htmlReplacer: function (match) {
        return HTML_CHARS[match];
    }
};

Escape.regexp = Escape.regex;

Y.Escape = Escape;


}, '@VERSION@' );
