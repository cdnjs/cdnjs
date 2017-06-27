(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var helpers = require('./helpers');

/**
 * Block's constructor
 */
var Block = function(block) {
    var name = block.data('b');
    var params = block.data('p');
    var decl = helpers.decls[name];

    if (!decl) {
        throw new Error(name + ' block is not declared');
    }

    var info = {
        name: name,
        params: params,
        $node: block,
        _id: helpers.guid()
    };
    $.extend(this, info, decl.methods);

    this._addEvents();
    this._setInited();
    this._trigger('b-inited');
};

/**
 * Adds events to block's node according its decl
 */
Block.prototype._addEvents = function() {
    var decl = helpers.decls[this.name];
    var events = decl.events;

    for (var e in events) {
        if (events.hasOwnProperty(e)) {
            var p = e.split(' ');
            var handler = events[e];

            if (typeof handler === 'string') {
                handler = decl.methods[handler];
            }
            this.$node.on(p[0], p[1], handler.bind(this));
        }
    }
};

/**
 * Mark the block as inited
 */
Block.prototype._setInited = function() {
    this.$node.addClass('jb-inited');
};

/**
 * Triggers specified event
 */
Block.prototype._trigger = function(name) {
    this.$node.trigger(name);
};

/**
 * Removes block from cache and triggers b-destroy event
 */
Block.prototype.destroy = function() {
    helpers.cache[this._id] = null;
    this.$node.removeClass('jb-inited');
    this.$node.off();
    this._trigger('b-destroyed');
};

module.exports = Block;

},{"./helpers":3}],2:[function(require,module,exports){
var helpers = require('./helpers');
var Block = require('./Block');

/**
 * Block's declaration
 * @param  {String} name
 * @param  {Object} proto
 */
$.define = function(name, proto) {
    if (helpers.decls[name]) {
        throw new Error('Can`t redefine ' + name + ' block');
    }
    helpers.decls[name] = proto;
};

/**
 * Returns block from cache or create it if doesn't exist
 * @return {Block} block
 */
$.fn.getBlocks = function() {
    return this.map(function() {
        var $b = $(this);
        var bid = $b.data('_bid');

        if (bid) {
            return helpers.cache[bid];
        }

        var block = new Block($b);
        bid = block._id;

        $b.data('_bid', bid);
        helpers.cache[bid] = block;

        return block;
    });
};

/**
 * Init all blocks inside
 */
$.fn.initBlocks = function() {
    return this.find('[data-b]').getBlocks();
};

/**
 * Destroy all blocks
 */
$.fn.destroyBlocks = function() {
    this.find('[data-b]').getBlocks().each(function() {
        this.destroy();
    });
};

// to get Block from global outspace
$.Block = Block;

},{"./Block":1,"./helpers":3}],3:[function(require,module,exports){
var id = 0;

exports.cache = {};
exports.decls = {};

/**
 * Returns unique id
 */
exports.guid = function() {
    return 'b-' + id++;
};

},{}]},{},[2])