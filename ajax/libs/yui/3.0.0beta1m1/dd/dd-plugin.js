YUI.add('dd-plugin', function(Y) {


       /**
        * This is a simple Drag plugin that can be attached to a Node via the plug method.
        * @module dd-plugin
        * @submodule dd-plugin
        */
       /**
        * This is a simple Drag plugin that can be attached to a Node via the plug method.
        * @class DragPlugin
        * @extends Drag
        * @constructor
        * @namespace plugin
        */


        var Drag = function(config) {
            config.node = config.owner;
            Drag.superclass.constructor.apply(this, arguments);
        };
        
        /**
        * @property NAME
        * @description dd-plugin
        * @type {String}
        */
        Drag.NAME = "dd-plugin";
        /**
        * @property NS
        * @description The Drag instance will be placed on the Node instance under the dd namespace. It can be accessed via Node.dd;
        * @type {String}
        */
        Drag.NS = "dd";


        Y.extend(Drag, Y.DD.Drag);
        Y.namespace('plugin');
        Y.plugin.Drag = Drag;





}, '@VERSION@' ,{skinnable:false, requires:['dd-drag'], optional:['dd-constrain', 'dd-proxy']});
