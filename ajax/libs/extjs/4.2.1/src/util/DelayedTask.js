/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag dom,core
// @require ../Support.js
// @define Ext.util.DelayedTask

/**
 * @class Ext.util.DelayedTask
 * 
 * The DelayedTask class provides a convenient way to "buffer" the execution of a method,
 * performing setTimeout where a new timeout cancels the old timeout. When called, the
 * task will wait the specified time period before executing. If durng that time period,
 * the task is called again, the original call will be cancelled. This continues so that
 * the function is only called a single time for each iteration.
 * 
 * This method is especially useful for things like detecting whether a user has finished
 * typing in a text field. An example would be performing validation on a keypress. You can
 * use this class to buffer the keypress events for a certain number of milliseconds, and
 * perform only if they stop for that amount of time.  
 * 
 * ## Usage
 * 
 *     var task = new Ext.util.DelayedTask(function(){
 *         alert(Ext.getDom('myInputField').value.length);
 *     });
 *     
 *     // Wait 500ms before calling our function. If the user presses another key
 *     // during that 500ms, it will be cancelled and we'll wait another 500ms.
 *     Ext.get('myInputField').on('keypress', function() {
 *         task.{@link #delay}(500);
 *     });
 * 
 * Note that we are using a DelayedTask here to illustrate a point. The configuration
 * option `buffer` for {@link Ext.util.Observable#addListener addListener/on} will
 * also setup a delayed task for you to buffer events.
 * 
 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn (optional) The default function to call. If not specified here, it must be specified during the {@link #delay} call.
 * @param {Object} scope (optional) The default scope (The **`this`** reference) in which the
 * function is called. If not specified, `this` will refer to the browser window.
 * @param {Array} args (optional) The default Array of arguments.
 * @param {Boolean} [cancelOnDelay=true] By default, each call to {@link #delay} cancels any pending invocation and reschedules a new
 * invocation. Specifying this as `false` means that calls to {@link #delay} when an invocation is pending just update the call settings,
 * `newDelay`, `newFn`, `newScope` or `newArgs`, whichever are passed.
 */
Ext.util.DelayedTask = function(fn, scope, args, cancelOnDelay) {
    var me = this,
        delay,
        call = function() {
            clearInterval(me.id);
            me.id = null;
            fn.apply(scope, args || []);
            Ext.EventManager.idleEvent.fire();
        };

    cancelOnDelay = typeof cancelOnDelay === 'boolean' ? cancelOnDelay : true;

    /**
     * @property {Number} id
     * The id of the currently pending invocation.  Will be set to `null` if there is no
     * invocation pending.
     */
    me.id = null;

    /**
     * By default, cancels any pending timeout and queues a new one.
     *
     * If the `cancelOnDelay` parameter was specified as `false` in the constructor, this does not cancel and
     * reschedule, but just updates the call settings, `newDelay`, `newFn`, `newScope` or `newArgs`, whichever are passed.
     *
     * @param {Number} newDelay The milliseconds to delay
     * @param {Function} newFn (optional) Overrides function passed to constructor
     * @param {Object} newScope (optional) Overrides scope passed to constructor. Remember that if no scope
     * is specified, <code>this</code> will refer to the browser window.
     * @param {Array} newArgs (optional) Overrides args passed to constructor
     */
    me.delay = function(newDelay, newFn, newScope, newArgs) {
        if (cancelOnDelay) {
            me.cancel();
        }
        delay = newDelay || delay,
        fn    = newFn    || fn;
        scope = newScope || scope;
        args  = newArgs  || args;
        if (!me.id) {
            me.id = setInterval(call, delay);
        }
    };

    /**
     * Cancel the last queued timeout
     */
    me.cancel = function() {
        if (me.id) {
            clearInterval(me.id);
            me.id = null;
        }
    };
};