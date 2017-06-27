YUI.add('anim-node-plugin', function(Y) {

/**
 *  Binds an Anim instance to a Node instance
 * @module anim
 * @submodule anim-node-plugin
 */

Y.namespace('Plugin');
Y.Plugin.NodeFX = function(config) {
    config.node = config.owner;
    Y.Plugin.NodeFX.superclass.constructor.apply(this, arguments);
};

Y.Plugin.NodeFX.NAME = "nodefxplugin";
Y.Plugin.NodeFX.NS = "fx";

Y.extend(Y.Plugin.NodeFX, Y.Anim);



}, '@VERSION@' ,{requires:['anim-base', 'node-base']});
