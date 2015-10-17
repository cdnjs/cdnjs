YUI.add('anim-node-plugin', function(Y) {

/**
 *  Binds an Anim instance to a Node instance
 * @module anim
 * @namespace plugin
 * @submodule anim-node-plugin
 */

var NodeFX = function(config) {
    config = (config) ? Y.merge(config) : {};
    config.node = config.owner;
    NodeFX.superclass.constructor.apply(this, arguments);
};

NodeFX.NAME = "nodefx";
NodeFX.NS = "fx";

Y.extend(NodeFX, Y.Anim);

Y.namespace('plugin');
Y.plugin.NodeFX = NodeFX;


}, '@VERSION@' ,{requires:['anim-base', 'node-base']});
