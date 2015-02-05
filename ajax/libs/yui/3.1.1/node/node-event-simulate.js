YUI.add('node-event-simulate', function(Y) {

/*
 * Functionality to simulate events.
 * @module node
 * @for Node
 * @submodule node-event-simulate
 */

    /**
     * Simulates an event on the node.
     * @param {String} type The type of event to simulate (i.e., "click").
     * @param {Object} options (Optional) Extra options to copy onto the event object.
     * @return {void}
     * @method simulate
     * @static
     */     
    Y.Node.prototype.simulate = function(type, options) {
        Y.Event.simulate(Y.Node.getDOMNode(this), type, options);
    };



}, '@VERSION@' ,{requires:['node-base', 'event-simulate']});
