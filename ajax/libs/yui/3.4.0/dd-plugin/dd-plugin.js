YUI.add('dd-plugin', function(Y) {


       /**
        * Simple Drag plugin that can be attached to a Node or Widget via the plug method.
        * @module dd
        * @submodule dd-plugin
        */
       /**
        * Simple Drag plugin that can be attached to a Node or Widget via the plug method.
        * @class Drag
        * @extends DD.Drag
        * @constructor
        * @namespace Plugin
        */
        var Drag = function(config) {
                if (Y.Widget && config.host instanceof Y.Widget) {
                        config.node = config.host.get('boundingBox');
                        config.widget = config.host;
                }
                else {
                        config.node = config.host;
                        config.widget = false;
                }
                Drag.superclass.constructor.call(this, config);
        },

        EV_DRAG = 'drag:drag',
        EV_DRAG_END = 'drag:end';
        
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

        Y.extend(Drag, Y.DD.Drag, {
                
                
                /**
                 * refers to a Y.Widget if its the host, otherwise = false.
                 *
                 * @attribute _widget
                 * @private
                 */
                _widget: undefined,

                
                /**
                 * refers to the [x,y] coordinate where the drag was stopped last
                 *
                 * @attribute _stoppedPosition
                 * @private
                 */
                _stoppedPosition: undefined,


                  /**
                    * Returns true if widget uses widgetPosition, otherwise returns false
                    *
                    * @method _usesWidgetPosition
                    * @private
                    */
                _usesWidgetPosition: function(widget) {
                        var r = false;
                        if (widget) {
                                r = (widget.hasImpl && widget.hasImpl(Y.WidgetPosition)) ? true : false;
                        }
                        return r;
                },


                /**
                  * Sets up event listeners on drag events if interacting with a widget
                  *
                  * @method initializer
                  * @protected
                  */
                initializer: function(config) {
                        

                        this._widget = config.widget;
                        
                        //if this thing is a widget, and it uses widgetposition...
                        if (this._usesWidgetPosition(this._widget)) {
                               
                               //set the x,y on the widget's ATTRS
                               this.on(EV_DRAG, this._setWidgetCoords);

                               //store the new position that the widget ends up on
                               this.on(EV_DRAG_END, this._updateStopPosition); 
                        }

                               
                },

                /**
                  * Updates x,y or xy attributes on widget based on where the widget is dragged
                  *
                  * @method initializer
                  * @param {EventFacade} e Event Facade
                  * @private
                  */
                _setWidgetCoords: function(e) {

                        //get the last position where the widget was, or get the starting point
                        var nodeXY = this._stoppedPosition || e.target.nodeXY,
                         realXY = e.target.realXY,

                         //amount moved = [(x2 - x1) , (y2 - y1)]
                         movedXY = [realXY[0] - nodeXY[0], realXY[1] - nodeXY[0]];

                         //if both have changed..
                         if (movedXY[0] !== 0 && movedXY[1] !== 0) {
                                 this._widget.set('xy', realXY);
                         }

                         //if only x is 0, set the Y
                         else if (movedXY[0] === 0) {
                                 this._widget.set('y',realXY[1]);
                         }

                         //otherwise, y is 0, so set X
                         else if (movedXY[1] === 0){
                                 this._widget.set('x', realXY[0]);
                         }
                },

                /**
                  * Updates the last position where the widget was stopped.
                  *
                  * @method updateStopPosition
                  * @param {EventFacade} e Event Facade
                  * @private
                  */
                updateStopPosition: function(e) {
                        this._stoppedPosition = e.target.realXY;
                }
        });

        Y.namespace('Plugin');
        Y.Plugin.Drag = Drag;





}, '@VERSION@' ,{optional:['dd-constrain', 'dd-proxy'], skinnable:false, requires:['dd-drag']});
