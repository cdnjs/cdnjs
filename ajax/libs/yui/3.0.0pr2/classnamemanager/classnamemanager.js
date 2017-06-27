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
	CLASS_NAME_DELIMITER = 'classNameDelimiter';


// Global config

/**
 * Configuration property indicating the prefix for all CSS class names in this YUI instance.
 *
 * @property Y.config.classNamePrefix
 * @type {String}
 * @default "yui"
 * @static
 */
Y.config[CLASS_NAME_PREFIX] = Y.config[CLASS_NAME_PREFIX] || 'yui';


/**
 * Configuration property indicating the delimiter used to compose all CSS class names in
 * this YUI instance.
 *
 * @property Y.config.classNameDelimiter
 * @type {String}
 * @default "-"
 * @static
 */
Y.config[CLASS_NAME_DELIMITER] = Y.config[CLASS_NAME_DELIMITER] || '-';


Y.ClassNameManager = function () {

	var sPrefix = Y.config[CLASS_NAME_PREFIX],
		sDelimiter = Y.config[CLASS_NAME_DELIMITER],
		classNames = {};

	return {

		/**
		 * Returns a class name prefixed with the the value of the 
		 * <code>Y.config.classNamePrefix</code> attribute + the provided strings.
		 * Uses the <code>Y.config.classNameDelimiter</code> attribute to delimit the 
		 * provided strings. E.g. Y.ClassNameManager.getClassName('foo','bar'); // yui-foo-bar
		 * 
		 * 
		 * @method getClassName
		 * @param {String}+ one or more classname bits to be joined and prefixed
		 */
		getClassName: function (c,x) {
	
			// Test for multiple classname bits
			if (x) {
				c = Y.Array(arguments,0,true).join(sDelimiter);
			}
		
			// memoize in classNames map
			return classNames[c] || (classNames[c] = sPrefix + sDelimiter + c);
	
		}
	
	};

}();


}, '@VERSION@' );
