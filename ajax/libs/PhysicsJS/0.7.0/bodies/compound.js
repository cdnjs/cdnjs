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
        define(['physicsjs','../geometries/compound'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory.apply(root, ['physicsjs','../geometries/compound'].map(require));
    } else {
        factory.call(root, root.Physics);
    }
}(this, function (Physics) {
    'use strict';
    /*
     * @requires geometries/compound
     */
     /**
      * class CompoundBody < Body
      *
      * Physics.body('compound')
      *
      * Not a body in itself. It's a container to group other bodies. The position of the body is the center of mass.
      * It must have at least one child before being added to the world.
      *
      * Additional config options:
      *
      * - children: Array of [[Body]] objects.
      *
      * Example:
      *
      * ```javascript
      * var thing = Physics.body('compound', {
      *     // place the center of mass at (300, 200)
      *     x: 300,
      *     y: 200,
      *     // the center of mass is automatically calculated and used to position the shape
      *     children: [
      *         body1,
      *         body2,
      *         // ...
      *     ]
      * });
      * ```
      **/
    Physics.body('compound', function( parent ){
    
        var defaults = {
    
        };
    
        return {
    
            // extended
            init: function( options ){
    
                // call parent init method
                parent.init.call(this, options);
    
                this.mass = 0;
                this.moi = 0;
    
                this.children = [];
                this.geometry = Physics.geometry('compound');
                this.addChildren( options.children );
            },
    
            // extended
            connect: function( world ){
                // sanity check
                if ( this.mass <= 0 ){
                    throw 'Can not add empty compound body to world.';
                }
            },
    
            /**
             * CompoundBody#addChild( body ) -> this
             * - body (Body): The child to add
             *
             * Add a body as a child.
             **/
            addChild: function( body ){
    
                this.addChildren([ body ]);
                return this;
            },
    
            /**
             * CompoundBody#addChildren( bodies ) -> this
             * - bodies (Array): The list of children to add
             *
             * Add an array of children to the compound.
             **/
            addChildren: function( bodies ){
    
                var self = this
                    ,scratch = Physics.scratchpad()
                    ,com = scratch.vector().zero()
                    ,b
                    ,pos
                    ,i
                    ,l = bodies && bodies.length
                    ,M = 0
                    ;
    
                if ( !l ){
                    return scratch.done( this );
                }
    
                for ( i = 0; i < l; i++ ){
                    b = bodies[ i ];
                    // remove body from world if applicable
                    if ( b._world ){
                        b._world.remove( b );
                    }
                    // add child
                    this.children.push( b );
                    // add child to geometry
                    this.geometry.addChild(
                        b.geometry,
                        new Physics.vector(b.offset)
                            .rotate(b.state.angular.pos)
                            .vadd(b.state.pos),
                        b.state.angular.pos
                    );
                    // calc com contribution
                    pos = b.state.pos;
                    com.add( pos._[0] * b.mass, pos._[1] * b.mass );
                    M += b.mass;
                }
    
                // add mass
                this.mass += M;
                // com adjustment (assuming com is currently at (0,0) body coords)
                com.mult( 1 / this.mass );
    
                // shift the center of mass
                this.offset.vsub( com );
    
                // refresh view on next render
                if ( this._world ){
                    this._world.one('render', function(){
                        self.view = null;
                    });
                }
                this.recalc();
    
                return scratch.done( this );
            },
    
            /**
             * CompoundBody#clear() -> this
             *
             * Remove all children.
             **/
            clear: function(){
    
                this._aabb = null;
                this.moi = 0;
                this.mass = 0;
                this.offset.zero();
                this.children = [];
                this.geometry.clear();
    
                return this;
            },
    
            /**
             * CompoundBody#refreshGeometry() -> this
             *
             * If the children's positions change, `refreshGeometry()` should be called to fix the shape.
             **/
            refreshGeometry: function(){
    
                this.geometry.clear();
    
                for ( var i = 0, b, l = this.children.length; i < l; i++ ) {
                    b = this.children[ i ];
                    this.geometry.addChild( b.geometry, new Physics.vector(b.state.pos).vadd(b.offset), b.state.angular.pos );
                }
    
                return this;
            },
    
            // extended
            recalc: function(){
    
                parent.recalc.call(this);
                // moment of inertia
                var b
                    ,moi = 0
                    ;
    
                for ( var i = 0, l = this.children.length; i < l; i++ ) {
                    b = this.children[ i ];
                    b.recalc();
                    // parallel axis theorem
                    moi += b.moi + b.mass * b.state.pos.normSq();
                }
    
                this.moi = moi;
                return this;
            }
        };
    });
    
    // end module: bodies/compound.js
    return Physics;
}));// UMD