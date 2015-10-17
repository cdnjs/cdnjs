YUI.add('node-event-simulate', function(Y) {

/**
 * Adds functionality to simulate events.
 * @module node
 * @submodule node-event-simulate
 */

/**
 * Simulates an event on the node.
 * @param {String} type The type of event (i.e., "click").
 * @param {Object} options (Optional) Extra options to copy onto the event object.
 * @return {void}
 * @for Node
 * @method simulate
 */
Y.Node.prototype.simulate = function (type, options) {
    
    Y.Event.simulate(Y.Node.getDOMNode(this), type, options);
};


/**
 * Simulates a gesture on the node. On desktop, single touch gestures
 * such as tap, flick are simulated by using mouse events. A gesture will 
 * generate a set of underlaying low level events asynchronously.
 * @param {String} type The type of supported gesture to simulate 
 *      (i.e., "tap", "flick").
 * @param {Object} options (Optional) Extra options are used to refine the 
 *      gesture behavior.
 * @param {Function} cb The callback to execute when the gesture simulation 
 *      is completed.  
 * @return {void}
 * @for Node
 * @method simulateGesture
 */
Y.Node.prototype.simulateGesture = function (type, options, cb) {

    Y.Event.simulateGesture(this, type, options, cb);
};


}, '@VERSION@' ,{requires:['node-base', 'event-simulate', 'gesture-simulate']});
