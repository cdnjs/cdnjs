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
     * class SweepPruneBehavior < Behavior
     *
     * `Physics.behavior('sweep-prune')`.
     *
     * Sweep and Prune implementation for broad phase collision detection.
     *
     * This massively improves the speed of collision detection. It's set up to always be used with [[BodyCollisionDetection]], and [[BodyImpulseResponse]].
     *
     * Additional options include:
     * - channel: The channel to publish collision candidates to. (default: `collisions:candidates`)
     **/
    Physics.behavior('sweep-prune', function( parent ){
    
        var uid = 1;
    
        // Get a unique numeric id for internal use
        var getUniqueId = function getUniqueId(){
    
            return uid++;
        };
    
        // add z: 2 to get this to work in 3D
        var dof = { x: 0, y: 1 }; // degrees of freedom
        // change to "3" to get it to work in 3D
        var maxDof = 2;
    
        var pairHash = Physics.util.pairHash;
    
        return {
    
            // extended
            init: function( options ){
    
                parent.init.call( this );
                this.options.defaults({
                    channel: 'collisions:candidates' //default channel
                });
                this.options( options );
    
                this.encounters = [];
                this.candidates = [];
    
                this.clear();
            },
    
            /**
             * SweepPruneBehavior#clear()
             *
             * Refresh tracking data
             **/
            clear: function(){
    
                this.tracked = [];
                this.pairs = []; // pairs selected as candidate collisions by broad phase
                this.intervalLists = []; // stores lists of aabb projection intervals to be sorted
    
                // init intervalLists
                for ( var xyz = 0; xyz < maxDof; ++xyz ){
    
                    this.intervalLists[ xyz ] = [];
                }
            },
    
            // extended
            connect: function( world ){
    
                world.on( 'add:body', this.trackBody, this );
                world.on( 'remove:body', this.untrackBody, this );
                world.on( 'integrate:positions', this.sweep, this, 1 );
    
                // add current bodies
                var bodies = world.getBodies();
                for ( var i = 0, l = bodies.length; i < l; ++i ){
    
                    this.trackBody({ body: bodies[ i ] });
                }
            },
    
            // extended
            disconnect: function( world ){
    
                world.off( 'add:body', this.trackBody, this );
                world.off( 'remove:body', this.untrackBody, this );
                world.off( 'integrate:positions', this.sweep, this, 1 );
                this.clear();
            },
    
            /** internal
             * SweepPruneBehavior#broadPhase() -> Array
             * + (Array): The candidate data of overlapping aabbs
             *
             * Execute the broad phase and get candidate collisions
             **/
            broadPhase: function(){
    
                this.updateIntervals();
                this.sortIntervalLists();
    
                if ( this._world ){
                    this._world.emit('sweep-prune:intervals', this.intervalLists);
                }
    
                return this.checkOverlaps();
            },
    
            /** internal
             * SweepPruneBehavior#sortIntervalLists()
             *
             * Simple insertion sort for each axis
             **/
            sortIntervalLists: function(){
    
                var list
                    ,len
                    ,i
                    ,hole
                    ,bound
                    ,boundVal
                    ,left
                    ,leftVal
                    ,axis
                    ;
    
                // for each axis...
                for ( var xyz = 0; xyz < maxDof; ++xyz ){
    
                    // get the intervals for that axis
                    list = this.intervalLists[ xyz ];
                    i = 0;
                    len = list.length;
                    axis = xyz;
    
                    // for each interval bound...
                    while ( (++i) < len ){
    
                        // store bound
                        bound = list[ i ];
                        boundVal = bound.val.get( axis );
                        hole = i;
    
                        left = list[ hole - 1 ];
                        leftVal = left && left.val.get( axis );
    
                        // while others are greater than bound...
                        while (
                            hole > 0 &&
                            (
                                leftVal > boundVal ||
                                // if it's an equality, only move it over if
                                // the hole was created by a minimum
                                // and the previous is a maximum
                                // so that we detect contacts also
                                leftVal === boundVal &&
                                ( left.type && !bound.type )
                            )
                        ) {
    
                            // move others greater than bound to the right
                            list[ hole ] = left;
                            hole--;
                            left = list[ hole - 1 ];
                            leftVal = left && left.val.get( axis );
                        }
    
                        // insert bound in the hole
                        list[ hole ] = bound;
                    }
                }
            },
    
            /** internal
             * SweepPruneBehavior#getPair( tr1, tr2, doCreate ) -> Object
             * - tr1 (Object): First tracker
             * - tr2 (Object): Second tracker
             * - doCreate (Boolean): Create if not found
             * + (Object): Pair object or null if not found
             *
             * Get a pair object for the tracker objects
             **/
            getPair: function(tr1, tr2, doCreate){
    
                var hash = pairHash( tr1.id, tr2.id );
    
                if ( hash === false ){
                    return null;
                }
    
                var c = this.pairs[ hash ];
    
                if ( !c ){
    
                    if ( !doCreate ){
                        return null;
                    }
    
                    c = this.pairs[ hash ] = {
                        bodyA: tr1.body,
                        bodyB: tr2.body,
                        flag: 1
                    };
                }
    
                if ( doCreate){
                    c.flag = 1;
                }
    
                return c;
            },
    
            // getPair: function(tr1, tr2, doCreate){
    
            //     var hash = Math.min(tr1.id, tr2.id) // = pairHash( tr1.id, tr2.id )
            //         ,other = Math.max(tr1.id, tr2.id)
            //         ,first
            //         ,c
            //         ;
    
            //     if ( hash === false ){
            //         return null;
            //     }
    
            //     first = this.pairs[ hash ];
    
            //     if ( !first ){
            //         if ( !doCreate ){
            //             return null;
            //         }
    
            //         first = this.pairs[ hash ] = [];
            //     }
    
            //     c = first[ other ];
    
            //     if ( !c ){
    
            //         if ( !doCreate ){
            //             return null;
            //         }
    
            //         c = first[ other ] = {
            //             bodyA: tr1.body,
            //             bodyB: tr2.body,
            //             flag: 1
            //         };
            //     }
    
            //     return c;
            // },
    
            /** internal
             * SweepPruneBehavior#checkOverlaps() -> Array
             * + (Array): List of candidate collisions
             *
             * Check each axis for overlaps of bodies AABBs
             **/
            checkOverlaps: function(){
    
                var isX
                    ,hash
                    ,tr1
                    ,tr2
                    ,bound
                    ,list
                    ,len
                    ,i
                    ,j
                    ,c
                    // determine which axis is the last we need to check
                    ,collisionFlag = 1 << (dof.z + 1) << (dof.y + 1) << (dof.x + 1)
                    ,encounters = this.encounters
                    ,enclen = 0
                    ,candidates = this.candidates
                    ;
    
                Physics.util.clearArray( encounters );
                Physics.util.clearArray( candidates );
    
                for ( var xyz = 0; xyz < maxDof; ++xyz ){
    
                    // is the x coord
                    isX = (xyz === 0);
                    // get the interval list for this axis
                    list = this.intervalLists[ xyz ];
    
                    // for each interval bound
                    for ( i = 0, len = list.length; i < len; i++ ){
    
                        bound = list[ i ];
                        tr1 = bound.tracker;
    
                        if ( bound.type ){
    
                            // is a max
    
                            j = enclen;
    
                            for ( j = enclen - 1; j >= 0; j-- ){
    
                                tr2 = encounters[ j ];
    
                                // if they are the same tracked interval
                                if ( tr2 === tr1 ){
    
                                    // remove the interval from the encounters list
                                    // faster than .splice()
                                    if ( j < enclen - 1 ) {
    
                                        encounters[ j ] = encounters.pop();
    
                                    } else {
    
                                        // encountered a max right after a min... no overlap
                                        encounters.pop();
                                    }
    
                                    enclen--;
    
                                } else {
    
                                    // check if we have flagged this pair before
                                    // if it's the x axis, create a pair
                                    c = this.getPair( tr1, tr2, isX );
    
                                    if ( c && c.flag < collisionFlag ){
    
                                        // if it's greater than the axis index, set the flag
                                        // to = 0.
                                        // if not, increment the flag by one.
                                        c.flag = c.flag << (xyz + 1);
    
                                        // c.flag will equal collisionFlag
                                        // if we've incremented the flag
                                        // enough that all axes are overlapping
                                        if ( c.flag === collisionFlag ){
    
                                            // overlaps on all axes.
                                            // add it to possible collision
                                            // candidates list for narrow phase
    
                                            candidates.push( c );
                                        }
                                    }
                                }
                            }
    
                        } else {
    
                            // is a min
                            // just add this minimum to the encounters list
                            enclen = encounters.push( tr1 );
                        }
                    }
                }
    
                return candidates;
            },
    
            /** internal
             * SweepPruneBehavior#updateIntervals()
             *
             * Update position intervals on each axis
             **/
            updateIntervals: function(){
    
                var tr
                    ,intr
                    ,aabb
                    ,list = this.tracked
                    ,i = list.length
                    ;
    
                // for all tracked bodies
                while ( (--i) >= 0 ){
    
                    tr = list[ i ];
                    intr = tr.interval;
                    aabb = tr.body.aabb();
    
                    // copy the position (plus or minus) the aabb half-dimensions
                    // into the min/max intervals
                    intr.min.val.clone( aabb ).sub( aabb.hw, aabb.hh );
                    intr.max.val.clone( aabb ).add( aabb.hw, aabb.hh );
                }
            },
    
            /** internal
             * SweepPruneBehavior#trackBody( data )
             * - data (Object): Event data
             *
             * Event callback to add body to list of those tracked by sweep and prune
             **/
            trackBody: function( data ){
    
                var body = data.body
                    ,tracker = {
    
                        id: getUniqueId(),
                        body: body
                    }
                    ,intr = {
    
                        min: {
                            type: false, //min
                            val: new Physics.vector(),
                            tracker: tracker
                        },
    
                        max: {
                            type: true, //max
                            val: new Physics.vector(),
                            tracker: tracker
                        }
                    }
                    ;
    
                tracker.interval = intr;
                this.tracked.push( tracker );
    
                for ( var xyz = 0; xyz < maxDof; ++xyz ){
    
                    this.intervalLists[ xyz ].push( intr.min, intr.max );
                }
            },
    
            /** internal
             * SweepPruneBehavior#untrackBody( data )
             * - data (Object): Event data
             *
             * Event callback to remove body from list of those tracked
             **/
            untrackBody: function( data ){
    
                var body = data.body
                    ,list
                    ,minmax
                    ,trackedList = this.tracked
                    ,tracker
                    ,count
                    ;
    
                for ( var i = 0, l = trackedList.length; i < l; ++i ){
    
                    tracker = trackedList[ i ];
    
                    if ( tracker.body === body ){
    
                        // remove the tracker at this index
                        trackedList.splice(i, 1);
    
                        for ( var xyz = 0; xyz < maxDof; ++xyz ){
    
                            count = 0;
                            list = this.intervalLists[ xyz ];
    
                            for ( var j = 0, m = list.length; j < m; ++j ){
    
                                minmax = list[ j ];
    
                                if ( minmax === tracker.interval.min || minmax === tracker.interval.max ){
    
                                    // remove interval from list
                                    list.splice(j, 1);
                                    j--;
                                    l--;
    
                                    if (count > 0){
                                        break;
                                    }
    
                                    count++;
                                }
                            }
                        }
    
                        break;
                    }
                }
            },
    
            /** internal
             * SweepPruneBehavior#sweep( data )
             * - data (Object): Event data
             *
             * Event callback to sweep and publish event if any candidate collisions are found
             **/
            sweep: function( data ){
    
                var self = this
                    ,candidates
                    ;
    
                candidates = self.broadPhase();
    
                if ( candidates.length ){
    
                    this._world.emit( this.options.channel, {
                        candidates: candidates
                    });
                }
            }
        };
    });
    
    // end module: behaviors/sweep-prune.js
    return Physics;
}));// UMD