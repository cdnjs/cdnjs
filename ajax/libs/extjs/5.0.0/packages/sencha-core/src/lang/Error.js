/**
 * A helper class for the native JavaScript Error object that adds a few useful capabilities for handling
 * errors in an application. When you use Ext.Error to {@link #raise} an error from within any class that
 * uses the Class System, the Error class can automatically add the source class and method from which
 * the error was raised. It also includes logic to automatically log the error to the console, if available,
 * with additional metadata about the error. In all cases, the error will always be thrown at the end so that
 * execution will halt.
 *
 * Ext.Error also offers a global error {@link #handle handling} method that can be overridden in order to
 * handle application-wide errors in a single spot. You can optionally {@link #ignore} errors altogether,
 * although in a real application it's usually a better idea to override the handling function and perform
 * logging or some other method of reporting the errors in a way that is meaningful to the application.
 *
 * At its simplest you can simply raise an error as a simple string from within any code:
 *
 * Example usage:
 *
 *     Ext.Error.raise('Something bad happened!');
 *
 * If raised from plain JavaScript code, the error will be logged to the console (if available) and the message
 * displayed. In most cases however you'll be raising errors from within a class, and it may often be useful to add
 * additional metadata about the error being raised.  The {@link #raise} method can also take a config object.
 * In this form the `msg` attribute becomes the error description, and any other data added to the config gets
 * added to the error object and, if the console is available, logged to the console for inspection.
 *
 * Example usage:
 *
 *     Ext.define('Ext.Foo', {
 *         doSomething: function(option){
 *             if (someCondition === false) {
 *                 Ext.Error.raise({
 *                     msg: 'You cannot do that!',
 *                     option: option,   // whatever was passed into the method
 *                     'error code': 100 // other arbitrary info
 *                 });
 *             }
 *         }
 *     });
 *
 * If a console is available (that supports the `console.dir` function) you'll see console output like:
 *
 *     An error was raised with the following data:
 *     option:         Object { foo: "bar"}
 *         foo:        "bar"
 *     error code:     100
 *     msg:            "You cannot do that!"
 *     sourceClass:   "Ext.Foo"
 *     sourceMethod:  "doSomething"
 *
 *     uncaught exception: You cannot do that!
 *
 * As you can see, the error will report exactly where it was raised and will include as much information as the
 * raising code can usefully provide.
 *
 * If you want to handle all application errors globally you can simply override the static {@link #handle} method
 * and provide whatever handling logic you need. If the method returns true then the error is considered handled
 * and will not be thrown to the browser. If anything but true is returned then the error will be thrown normally.
 *
 * Example usage:
 *
 *     Ext.Error.handle = function(err) {
 *         if (err.someProperty == 'NotReallyAnError') {
 *             // maybe log something to the application here if applicable
 *             return true;
 *         }
 *         // any non-true return value (including none) will cause the error to be thrown
 *     }
 *
 * @class Ext.Error
 */
(function() {
// @define Ext.lang.Error
// @define Ext.Error
// @require Ext

    function toString() {
        var me = this,
            cls = me.sourceClass,
            method = me.sourceMethod,
            msg = me.msg;

        if (method) {
            if (msg) {
                method += '(): ';
                method += msg;
            } else {
                method += '()';
            }
        }

        if (cls) {
            method = method ? (cls + '.' + method) : cls;
        }
        
        return method || msg || '';
    }

    Ext.Error = function(config) {
        if (Ext.isString(config)) {
            config = { msg: config };
        }

        var error = new Error();

        Ext.apply(error, config);

        error.message = error.message || error.msg; // 'message' is standard ('msg' is non-standard)
        // note: the above does not work in old WebKit (me.message is readonly) (Safari 4)

        error.toString = toString;

        return error;
    };

    Ext.apply(Ext.Error, {
        /**
         * @property {Boolean} ignore
         * Static flag that can be used to globally disable error reporting to the browser if set to true
         * (defaults to false). Note that if you ignore Ext errors it's likely that some other code may fail
         * and throw a native JavaScript error thereafter, so use with caution. In most cases it will probably
         * be preferable to supply a custom error {@link #handle handling} function instead.
         *
         * Example usage:
         *
         *     Ext.Error.ignore = true;
         *
         * @static
         */
        ignore: false,

        /**
         * Raise an error that can include additional data and supports automatic console logging if available.
         * You can pass a string error message or an object with the `msg` attribute which will be used as the
         * error message. The object can contain any other name-value attributes (or objects) to be logged
         * along with the error.
         *
         * Note that after displaying the error message a JavaScript error will ultimately be thrown so that
         * execution will halt.
         *
         * Example usage:
         *
         *     Ext.Error.raise('A simple string error message');
         *
         *     // or...
         *
         *     Ext.define('Ext.Foo', {
         *         doSomething: function(option){
         *             if (someCondition === false) {
         *                 Ext.Error.raise({
         *                     msg: 'You cannot do that!',
         *                     option: option,   // whatever was passed into the method
         *                     'error code': 100 // other arbitrary info
         *                 });
         *             }
         *         }
         *     });
         *
         * @param {String/Object} err The error message string, or an object containing the attribute "msg" that will be
         * used as the error message. Any other data included in the object will also be logged to the browser console,
         * if available.
         * @static
         */
        raise: function(err) {
            err = err || {};
            if (Ext.isString(err)) {
                err = { msg: err };
            }

            var me = this,
                method = me.raise.caller,
                msg, name;

            if (method) {
                if (!err.sourceMethod && (name = method.$name)) {
                    err.sourceMethod = name;
                }
                if (!err.sourceClass && (name = method.$owner) && (name = name.$className)) {
                    err.sourceClass = name;
                }
            }

            if (me.handle(err) !== true) {
                msg = toString.call(err);

                //<debug>
                Ext.log({
                    msg: msg,
                    level: 'error',
                    dump: err,
                    stack: true
                });
                //</debug>

                throw new Ext.Error(err);
            }
        },

        /**
         * Globally handle any Ext errors that may be raised, optionally providing custom logic to
         * handle different errors individually. Return true from the function to bypass throwing the
         * error to the browser, otherwise the error will be thrown and execution will halt.
         *
         * Example usage:
         *
         *     Ext.Error.handle = function(err) {
         *         if (err.someProperty == 'NotReallyAnError') {
         *             // maybe log something to the application here if applicable
         *             return true;
         *         }
         *         // any non-true return value (including none) will cause the error to be thrown
         *     }
         *
         * @param {Object} err The error being raised. It will contain any attributes that were originally
         * raised with it, plus properties about the method and class from which the error originated
         * (if raised from a class that uses the Class System).
         * @static
         */
        handle: function () {
            return this.ignore;
        }
    });
})();

/*
 * Create a function that will throw an error if called (in debug mode) with a message that
 * indicates the method has been removed.
 * @param {String} suggestion Optional text to include in the message (a workaround perhaps).
 * @return {Function} The generated function.
 * @private
 */
Ext.deprecated = function (suggestion) {
    //<debug>
    if (!suggestion) {
        suggestion = '';
    }

    function fail () {
        Ext.Error.raise('The method "' + fail.$owner.$className + '.' + fail.$name + 
                '" has been removed. ' + suggestion);
    }

    return fail;
    //</debug>
    return Ext.emptyFn;
};

/*
 * This mechanism is used to notify the user of the first error encountered on the page. In
 * most cases errors go unobserved especially on IE. This mechanism pushes this information
 * to the status bar so that users don't miss it.
 */
//<debug>
(function () {
    if (typeof window === 'undefined') {
        return; // build system or some such environment...
    }

    var win = Ext.global,
        last = 0,
        // This method is called to notify the user of the current error status.
        notify = function() {
            var cnt = Ext.log && Ext.log.counters,
                n = cnt && (cnt.error + cnt.warn + cnt.info + cnt.log),
                msg;

            // Put log counters to the status bar (for most browsers):
            if (n && last !== n) {
                msg = [];
                if (cnt.error) {
                    msg.push('Errors: ' + cnt.error);
                }
                if (cnt.warn) {
                    msg.push('Warnings: ' + cnt.warn);
                }
                if (cnt.info) {
                    msg.push('Info: ' + cnt.info);
                }
                if (cnt.log) {
                    msg.push('Log: ' + cnt.log);
                }
                win.status = '*** ' + msg.join(' -- ');
                last = n;
            }
        };

    // window.onerror sounds ideal but it prevents the built-in error dialog from doing
    // its (better) thing.
    win.setInterval(notify, 1000);
}());
//</debug>
