YUI.add('classnamemanager', function(Y) {

/**
* Contains a singleton (ClassNameManager) that enables easy creation and caching of 
* prefixed class names.
* @module classnamemanager
*/

/**
 * A singleton class providing: 
 * 
 * <ul>
 *    <li>Easy creation of prefixed class names</li>
 *    <li>Caching of previously created class names for improved performance.</li>
 * </ul>
 * 
 * @class ClassNameManager
 * @static 
 */

// String constants
var CLASS_NAME_PREFIX = 'classNamePrefix',
	CLASS_NAME_DELIMITER = 'classNameDelimiter',
    CONFIG = Y.config;

// Global config

/**
 * Configuration property indicating the prefix for all CSS class names in this YUI instance.
 *
 * @property Y.config.classNamePrefix
 * @type {String}
 * @default "yui"
 * @static
 */
CONFIG[CLASS_NAME_PREFIX] = CONFIG[CLASS_NAME_PREFIX] || 'yui';

/**
 * Configuration property indicating the delimiter used to compose all CSS class names in
 * this YUI instance.
 *
 * @property Y.config.classNameDelimiter
 * @type {String}
 * @default "-"
 * @static
 */
CONFIG[CLASS_NAME_DELIMITER] = CONFIG[CLASS_NAME_DELIMITER] || '-';

Y.ClassNameManager = function () {

	var sPrefix    = CONFIG[CLASS_NAME_PREFIX],
		sDelimiter = CONFIG[CLASS_NAME_DELIMITER];

	return {

		/**
		 * Returns a class name prefixed with the the value of the 
		 * <code>Y.config.classNamePrefix</code> attribute + the provided strings.
		 * Uses the <code>Y.config.classNameDelimiter</code> attribute to delimit the 
		 * provided strings. E.g. Y.ClassNameManager.getClassName('foo','bar'); // yui-foo-bar
		 * 
		 * @method getClassName
		 * @param {String}+ one or more classname bits to be joined and prefixed
		 */
		getClassName: Y.cached(function (c, x) {

			var sClass = sPrefix + sDelimiter + 
                   // ((x) ? Y.Array(arguments, 0, true).join(sDelimiter) : c);
                   ((x) ? Array.prototype.join.call(arguments, sDelimiter) : c);

			return sClass.replace(/\s/g, '');

		})

	};

}();


}, '@VERSION@' );
