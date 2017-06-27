/**
 * PhysicsJS v0.7.0 - 2014-12-08
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2014 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['physicsjs'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory.apply(root, ['physicsjs'].map(require));
    } else {
        factory.call(root, root.Physics);
    }
}(this, function (Physics) {
    'use strict';
    /**
     * class InteractiveBehavior < Behavior
     *
     * `Physics.behavior('interactive')`.
     *
     * User interaction helper.
     *
     * Used to get mouse/touch events and add grab interactions.
     *
     * Additional options include:
     * - el: The element of the renderer. What you input as the `el` for the renderer.
     * - moveThrottle: The min time between move events (default: `10`).
     * - minVel: The minimum velocity clamp [[Vectorish]] (default: { x: -5, y: -5 }) to restrict velocity a user can give to a body
     * - maxVel: The maximum velocity clamp [[Vectorish]] (default: { x: 5, y: 5 }) to restrict velocity a user can give to a body
     *
     * The behavior also triggers the following events on the world:
     * ```javascript
     * // a body has been grabbed
     * world.on('interact:grab', function( data ){
     *     data.x; // the x coord
     *     data.y; // the y coord
     *     data.body; // the body that was grabbed
     * });
     * // no body was grabbed, but the renderer area was clicked, or touched
     * world.on('interact:poke', function( data ){
     *     data.x; // the x coord
     *     data.y; // the y coord
     * });
     * // when a mouse or pointer moves
     * world.on('interact:move', function( data ){
     *     data.x; // the x coord
     *     data.y; // the y coord
     *     data.body; // the grabbed body that was moved (if applicable)
     * });
     * // when the viewport is released (mouseup, touchend)
     * world.on('interact:release', function( data ){
     *     data.x; // the x coord
     *     data.y; // the y coord
     *     data.body; // the body that was grabbed (if applicable)
     * });
     * ```
     *
     * The behavior also sets body.isGrabbed = true for any grabbed bodies while they are grabbed.
     **/
    Physics.behavior('interactive', function( parent ){
    
        if ( !document ){
            // must be in node environment
            return {};
        }
    
        var defaults = {
                // the element to monitor
                el: null,
                // time between move events
                moveThrottle: 1000 / 100 | 0,
                // minimum velocity clamp
                minVel: { x: -5, y: -5 },
                // maximum velocity clamp
                maxVel: { x: 5, y: 5 }
            }
            ,getElementOffset = function( el ){
                var curleft = 0
                    ,curtop = 0
                    ;
    
                if (el.offsetParent) {
                    do {
                        curleft += el.offsetLeft;
                        curtop += el.offsetTop;
                    } while (el = el.offsetParent);
                }
    
                return { left: curleft, top: curtop };
            }
            ;
    
        return {
            // extended
            init: function( options ){
    
                var self = this;
    
                // call parent init method
                parent.init.call( this );
                this.options.defaults( defaults );
                this.options( options );
    
                // vars
                this.bodyData = {};
                this.bodyDataByUID = {};
    
                this.el = typeof this.options.el === 'string' ? document.getElementById(this.options.el) : this.options.el;
    
                if ( !this.el ){
                    throw "No DOM element specified";
                }
    
                // init events
                // when there are multiple touchdowns, grab is usually called separately for each,
                // but we loop through e.changedTouches just in case
                self.grab = function grab( e ){
                    var pos
                        ,body
                        ,touchId
                        ,touch
                        ,offset
                        ,data
                        ,touchIndex
                        ,l
                        ;
    
                    if ( self._world ){
    
                        // Adjust for PointerEvent and older browsers
                        if ( !e.changedTouches ) {
                            e.changedTouches = [ e ];
                        }
    
                        offset = getElementOffset( e.target );
    
                        for ( touchIndex = 0, l = e.changedTouches.length; touchIndex < l; touchIndex++) {
                            touch = e.changedTouches[touchIndex];
                            touchId = touch.identifier || touch.pointerId || "mouse";
                            pos = { idx: touchId, x: touch.pageX - offset.left, y: touch.pageY - offset.top };
                            body = self._world.findOne({ $at: new Physics.vector( pos ), $in: self.getTargets() });
    
                            if ( body ){
                                // we're trying to grab a body
    
                                // fix the body in place
                                body.state.vel.zero();
                                body.state.angular.vel = 0;
                                body.isGrabbed = true;
                                // remember the currently grabbed bodies
                                data = self.bodyData[touchId] || {};
                                data.body = body;
                                // wake the body up
                                body.sleep( false );
                                data.time = Physics.util.ticker.now();
    
                                // if we're grabbing the same body twice we don't want to remember the wrong treatment.
                                data.treatment = self.bodyDataByUID[ body.uid ] ? self.bodyDataByUID[ body.uid ].treatment : body.treatment;
                                // change its treatment but remember its old treatment
                                body.treatment = 'kinematic';
                                // remember the click/touch offset
                                data.pos = data.pos || new Physics.vector();
                                data.pos.clone( pos );
    
                                data.offset = data.offset || new Physics.vector();
                                data.offset.clone( pos ).vsub( body.state.pos );
                                // init touchPointsOld here, too, so we don't have to do it in "move"
                                data.oldPos = data.oldPos || new Physics.vector();
                                data.oldPos.clone( pos );
    
                                pos.body = body;
                                self.bodyData[touchId] = data;
                                self.bodyDataByUID[ body.uid ] = data;
                                self._world.emit('interact:grab', pos);
    
                            } else {
    
                                self._world.emit('interact:poke', pos);
                            }
                        }
                    }
                };
    
                // when there are multiple touchdowns, move is called once
                // and e.changedTouches will have one or more touches in it
                self.move = Physics.util.throttle(function move( e ){
                    var pos
                        ,state
                        ,body
                        ,touchId
                        ,touch
                        ,offset
                        ,data
                        ,touchIndex
                        ,l
                        ;
    
                    if ( self._world ){
    
                        // Adjust for PointerEvent and older browsers
                        if ( !e.changedTouches ) {
                            e.changedTouches = [ e ];
                        }
    
                        offset = getElementOffset( self.el );
    
                        for ( touchIndex = 0, l = e.changedTouches.length; touchIndex < l; touchIndex++) {
                            touch = e.changedTouches[touchIndex];
                            touchId = touch.identifier || touch.pointerId || "mouse";
                            pos = { idx: touchId, x: touch.pageX - offset.left, y: touch.pageY - offset.top };
                            data = self.bodyData[touchId];
    
                            if ( data ){
                                body = data.body;
    
                                // wake the body up
                                body.sleep( false );
                                data.time = Physics.util.ticker.now();
    
                                // set old mouse position
                                data.oldPos.clone( data.pos );
                                // get new mouse position
                                data.pos.clone( pos );
    
                                pos.body = body;
                            }
    
                            self._world.emit('interact:move', pos);
                        }
                    }
    
                }, self.options.moveThrottle);
    
                // when there are multiple touchups, release is called once
                // and e.changedTouches will have one or more touches in it
                self.release = function release( e ){
                    var pos
                        ,body
                        ,touchId
                        ,touch
                        ,offset
                        ,data
                        ,dt
                        ,touchIndex
                        ,l
                        ;
    
                    if ( self._world ){
    
                        // Adjust for PointerEvent and older browsers
                        if ( !e.changedTouches ) {
                            e.changedTouches = [ e ];
                        }
    
                        for ( touchIndex = 0, l = e.changedTouches.length; touchIndex < l; touchIndex++) {
                            offset = getElementOffset( self.el );
                            touch = e.changedTouches[touchIndex];
                            touchId = touch.identifier || touch.pointerId || "mouse";
                            pos = { idx: touchId, x: touch.pageX - offset.left, y: touch.pageY - offset.top };
                            data = self.bodyData[touchId];
    
                            // release the body
                            if ( data ){
                                body = data.body;
                                // wake the body up
                                body.sleep( false );
                                // get new mouse position
                                data.pos.clone( pos );
    
                                dt = Math.max(Physics.util.ticker.now() - data.time, self.options.moveThrottle);
                                body.treatment = data.treatment;
                                // calculate the release velocity
                                body.state.vel.clone( data.pos ).vsub( data.oldPos ).mult( 1 / dt );
                                // make sure it's not too big
                                body.state.vel.clamp( self.options.minVel, self.options.maxVel );
    
                                body.isGrabbed = false;
                                pos.body = body;
    
                                delete body.isGrabbed;
                            }
    
                            // emit before we delete the vars in case
                            // the listeners need the body
                            self._world.emit('interact:release', pos);
    
                            // remove vars
                            delete self.bodyData[touchId];
                        }
                    }
                };
            },
    
            // extended
            connect: function( world ){
    
                // subscribe the .behave() method to the position integration step
                world.on('integrate:positions', this.behave, this);
    
                if ( window.PointerEvent ) {
    
                    this.el.addEventListener('pointerdown', this.grab);
                    window.addEventListener('pointermove', this.move);
                    window.addEventListener('pointerup', this.release);
    
                } else {
    
                    this.el.addEventListener('mousedown', this.grab);
                    this.el.addEventListener('touchstart', this.grab);
    
                    window.addEventListener('mousemove', this.move);
                    window.addEventListener('touchmove', this.move);
    
                    window.addEventListener('mouseup', this.release);
                    window.addEventListener('touchend', this.release);
    
                }
            },
    
            // extended
            disconnect: function( world ){
    
                // unsubscribe when disconnected
                world.off('integrate:positions', this.behave, this);
    
                if ( window.PointerEvent ) {
    
                    this.el.removeEventListener('pointerdown', this.grab);
                    window.removeEventListener('pointermove', this.move);
                    window.removeEventListener('pointerup', this.release);
    
                } else {
    
                    this.el.removeEventListener('mousedown', this.grab);
                    this.el.removeEventListener('touchstart', this.grab);
    
                    window.removeEventListener('mousemove', this.move);
                    window.removeEventListener('touchmove', this.move);
    
                    window.removeEventListener('mouseup', this.release);
                    window.removeEventListener('touchend', this.release);
    
                }
            },
    
            // extended
            behave: function( data ){
    
                var self = this
                    ,state
                    ,dt = Math.max(data.dt, self.options.moveThrottle)
                    ,body
                    ,d
                    ;
    
                // if we have one or more bodies grabbed, we need to move them to the new mouse/finger positions.
                // we'll do this by adjusting the velocity so they get there at the next step
                for ( var touchId in self.bodyData ) {
                    d = self.bodyData[touchId];
                    body = d.body;
                    state = body.state;
                    state.vel.clone( d.pos ).vsub( d.offset ).vsub( state.pos ).mult( 1 / dt );
                }
            }
        };
    });
    
    // end module: behaviors/interactive.js
    return Physics;
}));// UMD