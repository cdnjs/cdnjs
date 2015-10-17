YUI.add('array-invoke', function(Y) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule array-invoke
 */

/**
 * Adds the <code>Y.Array.invoke( items, methodName )</code> utility method.
 * @class YUI~array~invoke
 */

/**
 * <p>Execute a named method on an array of objects.  Items in the list that do
 * not have a function by that name will be skipped. For example,
 * <code>Y.Array.invoke( arrayOfDrags, 'plug', Y.Plugin.DDProxy );</code></p>
 *
 * <p>The return values from each call are returned in an array.</p>
 *
 * @method invoke
 * @static
 * @param { Array } items Array of objects supporting the named method.
 * @param { String } name the name of the method to execute on each item.
 * @param { mixed } args* Any number of additional args are passed as
 *                        parameters to the execution of the named method.
 * @return { Array } All return values, indexed according to item index.
 */
Y.Array.invoke = function(items, name) {
    var args = Y.Array(arguments, 2, true),
        isFunction = Y.Lang.isFunction,
        ret = [];

    Y.Array.each(Y.Array(items), function(item, i) {
        if (isFunction(item[name])) {
            ret[i] = item[name].apply(item, args);
        }
    });

    return ret;
};


}, '@VERSION@' );
