/*!
 * micromustache.js - A stripped down version of the {{mustache}} template engine with JavaScript
 * @license Creative Commons V3
 */

var MicroMustache = (function () {

    /**
     * Replaces every {{variable}} inside the template with values provided by view
     * @param template {string} the template containing one or more {{key}}
     * @param view {object} an object containing string (or number) values for every key that is used in the template
     * @return {string} template with its valid variable names replaced with corresponding values
     */
    function render (template, view) {
        //don't touch the template if it is not a string
        if (typeof template !== 'string') {
            return template;
        }
        //if view is not a valid object, assume it is an empty object which effectively removes all variable assignments
        if (typeof view !== 'object' || view === null) {
            view = {};
        }
        return template.replace(/\{?\{\{\s*(.*?)\s*\}\}\}?/g, function (match, varName) {
            var value = view[varName];
            switch (typeof value) {
                case 'string':
                case 'number':
                case 'boolean':
                    return value;
                case 'function':
                    //if the value is a function, call it passing the variable name
                    return value(varName);
                default:
                    //anything else will be replaced with an empty string. This includes object, array and null.
                    return '';
            }
        });
    }

    /**
     * This function really doesn't make things particularly faster.
     * However it makes the repeated calls shorter!
     * @param template {string} the template containing one or more {{key}}
     * @return {function} a function that calls render(template, view) under the hood
     */
    function compile (template) {
        //create and return a function that will always apply this template under the hood
        return function (view) {
            return render(template, view);
        };
    }

    return {
        render:render,
        to_html:render,
        compile:compile
    };
})();