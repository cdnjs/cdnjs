YUI.add('node-load', function(Y) {

/**
 * Extended Node interface with an basic IO api.
 * @module node
 * @submodule node-load
 */

/**
 * The default IO complete handler.
 * @method _ioComplete
 * @protected
 * @for Node
 * @param {String} code The response code. 
 * @param {Object} response The response object. 
 * @param {Array} args An array containing the callback and selector   
 */

Y.Node.prototype._ioComplete = function(code, response, args) {
    var selector = args[0],
        callback = args[1],
        tmp,
        content;

    if (response && response.responseText) {
        content = response.responseText;
        if (selector) {
            tmp = Y.DOM.create(content);
            content = Y.Selector.query(selector, tmp);
        }
        this.setContent(content);
    }
    if (callback) {
        callback.call(this, code, response);
    }
};

/**
 * Loads content from the given url and replaces the Node's
 * existing content with it. 
 * @method load
 * @param {String} html The markup to wrap around the node. 
 * @param {String} selector An optional selector representing subset
 * @param {Function} callback An optional function to run after the content has been loaded. 
 * of the content.
 * @chainable
 */
Y.Node.prototype.load = function(url, selector, callback) {
    if (typeof selector == 'function') {
        callback = selector;
        selector = null;
    }
    var config = {
        context: this,
        on: {
            complete: this._ioComplete
        },
        arguments: [selector, callback]
    };

    Y.io(url, config);
    return this;
}


}, '@VERSION@' ,{requires:['node-base', 'io-base']});
