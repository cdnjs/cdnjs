YUI.add('dd-plugin', function(Y) {


       /**
        * This is a simple Drag plugin that can be attached to a Node via the plug method.
        * @module dd
        * @submodule dd-plugin
        */
       /**
        * This is a simple Drag plugin that can be attached to a Node via the plug method.
        * @class Drag
        * @extends DD.Drag
        * @constructor
        * @namespace Plugin
        */


        var Drag = function(config) {
            config.node = ((Y.Widget && config.host instanceof Y.Widget) ? config.host.get('boundingBox') : config.host);
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
        Y.namespace('Plugin');
        Y.Plugin.Drag = Drag;





}, '@VERSION@' ,{skinnable:false, requires:['dd-drag'], optional:['dd-constrain', 'dd-proxy']});
