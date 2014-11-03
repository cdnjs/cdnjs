/**
 * p2.js
 * 2D physics library
 * @author Stefan Hedman <schteppe@gmail.com>
 */
(function(p2){

    var p2 = {};

    var vecCount = 0;
    var matCount = 0;
    var ARRAY_TYPE = Float32Array;

    var cos = Math.cos;
    var abs = Math.abs;
    var sin = Math.sin;
    var sqrt = Math.sqrt;
    var floor = Math.floor;


    // Typed arrays!
    p2.tVec2 = {};
    p2.oVec2 = {};
    p2.tVec2.create = function(x,y){
        vecCount++;
        var a = new ARRAY_TYPE(2);
        a[0] = x||0;
        a[1] = y||0;
        return a;
    }
    p2.oVec2.create = function(x,y){
        return {x:x||0, y:y||0};
    }
    p2.tVec2.set = function(v, x, y) {
        v[0] = x;
        v[1] = y;
    }
    p2.oVec2.set = function(v, x, y) {
        v.x = x;
        v.y = y;
    }
    p2.tVec2.copy = function(a, out) {
        out[0] = a[0];
        out[1] = a[1];
    }
    p2.oVec2.copy = function(a, out) {
        out.x = a.x;
        out.y = a.y;
    }
    p2.tVec2.add = function(a, b, out) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
    }
    p2.oVec2.add = function(a, b, out) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
    }
    p2.tVec2.subtract = function(a, b, out) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
    }
    p2.oVec2.subtract = function(a, b, out) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
    }
    p2.tVec2.scale = function(a, s, out) {
        out[0] = a[0] * s;
        out[1] = a[1] * s;
    }
    p2.oVec2.scale = function(a, s, out) {
        out.x = a.x * s;
        out.y = a.y * s;
    }
    p2.tVec2.normalize = function(a, out) {
        var iLen = 1 / p2.tVec2.norm(a);
        out[0] = a[0] * iLen;
        out[1] = a[1] * iLen;
    }
    p2.oVec2.normalize = function(a, out) {
        var iLen = 1 / p2.oVec2.norm(a);
        out.x = a.x * iLen;
        out.y = a.y * iLen;
    }
    p2.tVec2.norm = function(a) {
        return sqrt((a[0] * a[0]) + (a[1] * a[1]));
    }
    p2.oVec2.norm = function(a) {
        return sqrt((a.x * a.x) + (a.y * a.y));
    }
    p2.tVec2.norm2 = function(a) {
        return (a[0] * a[0]) + (a[1] * a[1]);
    }
    p2.oVec2.norm2 = function(a) {
        return (a.x * a.x) + (a.y * a.y);
    }
    p2.tVec2.dot = function(a,b){
        return a[0]*b[0] + a[1]*b[1];
    };
    p2.oVec2.dot = function(a,b){
        return a.x*b.x + a.y*b.y;
    };
    p2.tVec2.cross = function(a,b){
        return a[0]*b[1] - a[1]*b[0];
    };
    p2.oVec2.cross = function(a,b){
        return a.x*b.y - a.y*b.x;
    };
    p2.tVec2.rotate = function(v,angle,out){
        var c = cos(angle),
            s = sin(angle);
        out[0] = c*v[0] -s*v[1];
        out[1] = s*v[0] +c*v[1];
    };
    p2.oVec2.rotate = function(v,angle,out){
        var c = cos(angle),
            s = sin(angle);
        out.x = c*v.x -s*v.y;
        out.y = s*v.x +c*v.y;
    };
    p2.tVec2.getX = function(v){ return v[0]; };
    p2.tVec2.getY = function(v){ return v[1]; };
    p2.oVec2.getX = function(v){ return v.x; };
    p2.oVec2.getY = function(v){ return v.y; };

    var V = p2.V = p2.tVec2;
    var Vadd = V.add;
    var Vscale = V.scale;
    var Vsub = V.subtract;
    var Vdot = V.dot;
    var Vcross = V.cross;
    var Vnorm2 = V.norm2;
    var Vcopy = V.copy;



    // Matrices
    p2.tMat2 = {};
    p2.oMat2 = {};
    p2.tMat2.create = function(e11,e12,e21,e22){
        matCount++;
        var m = new ARRAY_TYPE(4);
        m[0] = e11||0.0;
        m[1] = e12||0.0;
        m[2] = e21||0.0;
        m[3] = e22||0.0;
        return m;
    };
    p2.oMat2.create = function(e11,e12,e21,e22){
        return {e11:e11||0,
                e12:e12||0,
                e21:e21||0,
                e22:e22||0};
    };
    p2.tMat2.vectorMultiply = function(m,v,out){
        out[0] = m[0]*v[0] + m[1]*v[1];
        out[1] = m[2]*v[0] + m[3]*v[1];
    };
    p2.oMat2.vectorMultiply = function(m,v,out){
        out.x = m.e11*v.x + m.e12*v.y;
        out.y = m.e21*v.x + m.e22*v.y;
    };
    p2.tMat2.setIdentity = function(m){
        m[0] = 1.0;
        m[1] = 0.0;
        m[2] = 0.0;
        m[3] = 1.0;
    };
    p2.oMat2.setIdentity = function(m){
        m.e11 = 1.0;
        m.e12 = 0.0;
        m.e21 = 0.0;
        m.e22 = 1.0;
    };
    p2.tMat2.setFromRotation = function(m,angle){
        m[0] =  cos(angle);
        m[1] = -sin(angle);
        m[2] =  sin(angle);
        m[3] =  cos(angle);
    };
    p2.oMat2.setFromRotation = function(m,angle){
        m.e11 =  cos(angle);
        m.e12 = -sin(angle);
        m.e21 =  sin(angle);
        m.e22 =  cos(angle);
    };

    var M = p2.M = p2.tMat2;

    /**
     * Base class for shapes.
     * @class
     */
    p2.Shape = function(){};

    /**
     * Particle shape class.
     * @class
     * @extends p2.Shape
     */
    p2.Particle = function(){
        p2.Shape.apply(this);
    };

    /**
     * Circle shape class.
     * @class
     * @extends p2.Shape
     * @param {number} radius
     */
    p2.Circle = function(radius){
        p2.Shape.apply(this);
        /**
         * The radius of the circle.
         * @member {number}
         * @memberof p2.Circle
         */
        this.radius = radius || 1;
    };

    /**
     * Plane shape class. The plane is facing in the Y direction.
     * @class
     * @extends p2.Shape
     */
    p2.Plane = function(){
        p2.Shape.apply(this);
    };

    /**
     * A spring, connecting two bodies.
     *
     * Options:
     *   - restLength: A number > 0. Default: 1
     *   - stiffness: A number >= 0. Default: 100
     *   - damping: A number >= 0. Default: 1
     *
     * @class
     * @param {p2.Body} bodyA
     * @param {p2.Body} bodyB
     * @param {Object} options
     */
    p2.Spring = function(bodyA,bodyB,options){
        options = options || {};

        /**
         * Rest length of the spring.
         * @member {number}
         * @memberof p2.Spring
         */
        this.restLength = options.restLength || 1;

        /**
         * Stiffness of the spring.
         * @member {number}
         * @memberof p2.Spring
         */
        this.stiffness = options.stiffness || 100;

        /**
         * Damping of the spring.
         * @member {number}
         * @memberof p2.Spring
         */
        this.damping = options.damping || 1;

        /**
         * First connected body.
         * @member {p2.Body}
         * @memberof p2.Spring
         */
        this.bodyA = bodyA;

        /**
         * Second connected body.
         * @member {p2.Body}
         * @memberof p2.Spring
         */
        this.bodyB = bodyB;
    };

    /**
     * A physics body.
     *
     * Options:
     *   - shape: A {p2.Shape} used for collision detection. If absent the body will not collide.
     *   - mass: A number >= 0. If zero, the body becomes static. Defaults to static [0].
     *   - position (vec2)
     *   - velocity (vec2)
     *   - angle (number)
     *   - angularVelocity (number)
     *   - force (vec2)
     *   - angularForce (number)
     *
     * @class
     * @param {Object} options
     */
    p2.Body = function(options){
        options = options || {};

        /**
         * The shape belonging to the body.
         * @member {p2.Shape}
         * @memberof p2.Body
         */
        this.shape = options.shape;

        /**
         * The mass of the body.
         * @member {number}
         * @memberof p2.Body
         */
        this.mass = options.mass || 0;
        this.invMass = this.mass > 0 ? 1 / this.mass : 0;
        this.inertia = options.inertia || this.mass; // todo
        this.invInertia = this.invMass; // todo

        /**
         * The position of the body
         * @member {vec2}
         * @memberof p2.Body
         */
        this.position = options.position || V.create();

        /**
         * The velocity of the body
         * @member {vec2}
         * @memberof p2.Body
         */
        this.velocity = options.velocity || V.create();

        this.vlambda = V.create();
        this.wlambda = 0;

        /**
         * The angle of the body
         * @member {number}
         * @memberof p2.Body
         */
        this.angle = options.angle || 0;

        /**
         * The angular velocity of the body
         * @member {number}
         * @memberof p2.Body
         */
        this.angularVelocity = options.angularVelocity || 0;

        /**
         * The force acting on the body
         * @member {vec2}
         * @memberof p2.Body
         */
        this.force = options.force || V.create();

        /**
         * The angular force acting on the body
         * @member {number}
         * @memberof p2.Body
         */
        this.angularForce = options.angularForce || 0;
    };

    /**
     * Apply force to a world point. This could for example be a point on the RigidBody surface. Applying force this way will add to Body.force and Body.angularForce.
     * @method
     * @memberof p2.Body
     * @param {vec2} force The force to add.
     * @param {vec2} worldPoint A world point to apply the force on.
     */
    var Body_applyForce_r = V.create();
    p2.Body.prototype.applyForce = function(force,worldPoint){
        // Compute point position relative to the body center
        var r = Body_applyForce_r;
        V.subtract(worldPoint,this.position,r);

        // Add linear force
        V.add(this.force,force,this.force);

        // Compute produced rotational force
        var rotForce = V.cross(r,force);

        // Add rotational force
        this.angularForce += rotForce;
    };

    // Broadphase
    var dist = V.create();
    var rot = M.create();
    var worldNormal = V.create();
    var yAxis = V.create(0,1);
    function checkCircleCircle(c1,c2,result){
        Vsub(c1.position,c2.position,dist);
        var R1 = c1.shape.radius;
        var R2 = c2.shape.radius;
        if(Vnorm2(dist) < (R1+R2)*(R1+R2)){
            result.push(c1);
            result.push(c2);
        }
    }
    function checkCirclePlane(c,p,result){
        Vsub(c.position,p.position,dist);
        M.setFromRotation(rot,p.angle);
        M.vectorMultiply(rot,yAxis,worldNormal);
        if(Vdot(dist,worldNormal) <= c.shape.radius){
            result.push(c);
            result.push(p);
        }
    }
    function checkCircleParticle(c,p,result){
        result.push(c);
        result.push(p);
    }

    // Generate contacts / do nearphase
    function nearphaseCircleCircle(c1,c2,result,oldContacts){
        //var c = new p2.ContactEquation(c1,c2);
        var c = oldContacts.length ? oldContacts.pop() : new p2.ContactEquation(c1,c2);
        c.bi = c1;
        c.bj = c2;
        Vsub(c2.position,c1.position,c.ni);
        V.normalize(c.ni,c.ni);
        Vscale(c.ni, c1.shape.radius, c.ri);
        Vscale(c.ni,-c2.shape.radius, c.rj);
        result.push(c);
    }
    function nearphaseCircleParticle(c,p,result,oldContacts){
        // todo
    }
    var nearphaseCirclePlane_rot = M.create();
    var nearphaseCirclePlane_planeToCircle = V.create();
    var nearphaseCirclePlane_temp = V.create();
    function nearphaseCirclePlane(c,p,result,oldContacts){
        var rot = nearphaseCirclePlane_rot;
        var contact = oldContacts.length ? oldContacts.pop() : new p2.ContactEquation(p,c);
        contact.bi = p;
        contact.bj = c;
        var planeToCircle = nearphaseCirclePlane_planeToCircle;
        var temp = nearphaseCirclePlane_temp;

        M.setFromRotation(rot,p.angle);
        M.vectorMultiply(rot,yAxis,contact.ni);

        V.scale(contact.ni, -c.shape.radius, contact.rj);

        V.subtract(c.position,p.position,planeToCircle);
        var d = V.dot(contact.ni , planeToCircle );
        V.scale(contact.ni,d,temp);
        V.subtract(planeToCircle , temp , contact.ri );

        result.push(contact);
    }

    var step_r = V.create();
    var step_runit = V.create();
    var step_u = V.create();
    var step_f = V.create();
    var step_fhMinv = V.create();
    var step_velodt = V.create();
    function now(){
        if(performance.now) return performance.now();
        else if(performance.webkitNow) return performance.webkitNow();
        else new Date().getTime();
    }

    /**
     * Base class for broadphase implementations.
     * @class
     */
    p2.Broadphase = function(){

    };

    /**
     * Get all potential intersecting body pairs.
     * @method
     * @memberof p2.Broadphase
     * @param  {p2.World} world The world to search in.
     * @return {Array} An array of the bodies, ordered in pairs. Example: A result of [a,b,c,d] means that the potential pairs are: (a,b), (c,d).
     */
    p2.Broadphase.prototype.getCollisionPairs = function(world){
        throw new Error("getCollisionPairs must be implemented in a subclass!");
    };

    /**
     * Naive broadphase implementation. Does N^2 tests.
     *
     * @class
     * @extends p2.Broadphase
     */
    p2.NaiveBroadphase = function(){
        p2.Broadphase.apply(this);
        this.getCollisionPairs = function(world){
            var collidingBodies = world.collidingBodies;
            var result = [];
            for(var i=0, Ncolliding=collidingBodies.length; i!==Ncolliding; i++){
                var bi = collidingBodies[i];
                var si = bi.shape;
                if (si === undefined) continue;
                for(var j=0; j!==i; j++){
                    var bj = collidingBodies[j];
                    var sj = bj.shape;
                    if (sj === undefined) {
                        continue;
                    } else if(si instanceof p2.Circle){
                             if(sj instanceof p2.Circle)   checkCircleCircle  (bi,bj,result);
                        else if(sj instanceof p2.Particle) checkCircleParticle(bi,bj,result);
                        else if(sj instanceof p2.Plane)    checkCirclePlane   (bi,bj,result);
                    } else if(si instanceof p2.Particle){
                             if(sj instanceof p2.Circle)   checkCircleParticle(bj,bi,result);
                    } else if(si instanceof p2.Plane){
                             if(sj instanceof p2.Circle)   checkCirclePlane   (bj,bi,result);
                    }
                }
            }
            return result;
        };
    };
    p2.NaiveBroadphase.prototype = new p2.Broadphase();

    /**
     * Broadphase that uses axis-aligned bins.
     * @class
     * @extends p2.Broadphase
     * @param {number} xmin Lower x bound of the grid
     * @param {number} xmax Upper x bound
     * @param {number} ymin Lower y bound
     * @param {number} ymax Upper y bound
     * @param {number} nx Number of bins along x axis
     * @param {number} ny Number of bins along y axis
     */
    p2.GridBroadphase = function(xmin,xmax,ymin,ymax,nx,ny){
        p2.Broadphase.apply(this);

        nx = nx || 10;
        ny = ny || 10;
        var binsizeX = (xmax-xmin) / nx;
        var binsizeY = (ymax-ymin) / ny;
        var Plane = p2.Plane,
            Circle = p2.Circle,
            Particle = p2.Particle;

        function getBinIndex(x,y){
            var xi = Math.floor(nx * (x - xmin) / (xmax-xmin));
            var yi = Math.floor(ny * (y - ymin) / (ymax-ymin));
            return xi*ny + yi;
        }

        this.getCollisionPairs = function(world){
            var result = [];
            var collidingBodies = world.collidingBodies;
            var Ncolliding = Ncolliding=collidingBodies.length;

            var bins=[], Nbins=nx*ny;
            for(var i=0; i<Nbins; i++)
                bins.push([]);

            var xmult = nx / (xmax-xmin);
            var ymult = ny / (ymax-ymin);

            // Put all bodies into bins
            for(var i=0; i!==Ncolliding; i++){
                var bi = collidingBodies[i];
                var si = bi.shape;
                if (si === undefined) {
                    continue;
                } else if(si instanceof Circle){
                    // Put in bin
                    // check if overlap with other bins
                    var x = V.getX(bi.position);
                    var y = V.getY(bi.position);
                    var r = si.radius;

                    var xi1 = floor(xmult * (x-r - xmin));
                    var yi1 = floor(ymult * (y-r - ymin));
                    var xi2 = floor(xmult * (x+r - xmin));
                    var yi2 = floor(ymult * (y+r - ymin));

                    for(var j=xi1; j<=xi2; j++){
                        for(var k=yi1; k<=yi2; k++){
                            var xi = j;
                            var yi = k;
                            if(xi*(ny-1) + yi >= 0 && xi*(ny-1) + yi < Nbins)
                                bins[ xi*(ny-1) + yi ].push(bi);
                        }
                    }
                } else if(si instanceof Plane){
                    // Put in all bins for now
                    if(bi.angle == 0){
                        var y = V.getY(bi.position);
                        for(var j=0; j!==Nbins && ymin+binsizeY*(j-1)<y; j++){
                            for(var k=0; k<nx; k++){
                                var xi = k;
                                var yi = floor(ymult * (binsizeY*j - ymin));
                                bins[ xi*(ny-1) + yi ].push(bi);
                            }
                        }
                    } else if(bi.angle == Math.PI*0.5){
                        var x = V.getX(bi.position);
                        for(var j=0; j!==Nbins && xmin+binsizeX*(j-1)<x; j++){
                            for(var k=0; k<ny; k++){
                                var yi = k;
                                var xi = floor(xmult * (binsizeX*j - xmin));
                                bins[ xi*(ny-1) + yi ].push(bi);
                            }
                        }
                    } else {
                        for(var j=0; j!==Nbins; j++)
                            bins[j].push(bi);
                    }
                } else {
                    throw new Error("Shape not supported in GridBroadphase!");
                }
            }

            // Check each bin
            for(var i=0; i!==Nbins; i++){
                var bin = bins[i];
                for(var j=0, NbodiesInBin=bin.length; j!==NbodiesInBin; j++){
                    var bi = bin[j];
                    var si = bi.shape;

                    for(var k=0; k!==j; k++){
                        var bj = bin[k];
                        var sj = bj.shape;

                        if(si instanceof p2.Circle){
                                 if(sj instanceof Circle)   checkCircleCircle  (bi,bj,result);
                            else if(sj instanceof Particle) checkCircleParticle(bi,bj,result);
                            else if(sj instanceof Plane)    checkCirclePlane   (bi,bj,result);
                        } else if(si instanceof Particle){
                                 if(sj instanceof Circle)   checkCircleParticle(bj,bi,result);
                        } else if(si instanceof Plane){
                                 if(sj instanceof Circle)   checkCirclePlane   (bj,bi,result);
                        }
                    }
                }
            }
            return result;
        };
    };
    p2.GridBroadphase.prototype = new p2.Broadphase();

    /**
     * The dynamics world, where all bodies and constraints lives.
     *
     * Options:
     *   - solver (p2.Solver) Default: {p2.GSSolver}
     *   - gravity (vec2) Default: -9.78
     *   - broadphase (p2.Broadphase) Default: {p2.NaiveBroadphase}
     *
     * @class
     * @param {Object} options
     */
    p2.World = function(options){
        options = options || {};

        /**
         * All springs in the world.
         * @member {Array}
         * @memberof p2.World
         */
        this.springs = [];

        /**
         * All bodies in the world.
         * @member {Array}
         * @memberof p2.World
         */
        this.bodies = [];

        /**
         * The solver used to satisfy constraints and contacts.
         * @member {p2.Solver}
         * @memberof p2.World
         */
        this.solver = options.solver || new p2.GSSolver();

        /**
         * The contacts in the world that were generated during the last step().
         * @member {Array}
         * @memberof p2.World
         */
        this.contacts = [];

        this.oldContacts = [];
        this.collidingBodies = [];

        /**
         * Gravity in the world. This is applied on all bodies in the beginning of each step().
         * @member {vec2}
         * @memberof p2.World
         */
        this.gravity = options.gravity || V.create(0, -9.78);

        /**
         * Whether to do timing measurements during the step() or not.
         * @member {bool}
         * @memberof p2.World
         */
        this.doProfiling = options.doProfiling || false;

        /**
         * How many millisecconds the last step() took. This is updated each step if .doProfiling is set to true.
         * @member {number}
         * @memberof p2.World
         */
        this.lastStepTime = 0.0;

        /**
         * The broadphase algorithm to use.
         * @member {p2.Broadphase}
         * @memberof p2.World
         */
        this.broadphase = options.broadphase || new p2.NaiveBroadphase();
    };

    /**
     * Step the physics world forward in time.
     *
     * @method
     * @memberof p2.World
     * @param {number} dt The time step size to use.
     */
    p2.World.prototype.step = function(dt){
        var doProfiling = this.doProfiling,
            Nsprings = this.springs.length,
            springs = this.springs,
            bodies = this.bodies,
            collidingBodies=this.collidingBodies,
            g = this.gravity,
            solver = this.solver,
            Nbodies = this.bodies.length,
            broadphase = this.broadphase,
            t0, t1;
        if(doProfiling){
            t0 = now();
            vecCount = 0; // Start counting vector creations
            matCount = 0;
        }

        // add gravity to bodies
        for(var i=0; i!==Nbodies; i++){
            var fi = bodies[i].force;
            Vadd(fi,g,fi);
        }

        // Calculate all new spring forces
        for(var i=0; i!==Nsprings; i++){
            var s = springs[i];
            var k = s.stiffness;
            var d = s.damping;
            var l = s.restLength;
            var bodyA = s.bodyA;
            var bodyB = s.bodyB;
            var r = step_r;
            var r_unit = step_runit;
            var u = step_u;
            var f = step_f;

            Vsub(bodyA.position,bodyB.position,r);
            Vsub(bodyA.velocity,bodyB.velocity,u);
            var rlen = V.norm(r);
            V.normalize(r,r_unit);
            Vscale(r_unit, k*(rlen-l) + d*V.dot(u,r_unit), f);
            Vsub(bodyA.force, f, bodyA.force);
            Vadd(bodyB.force, f, bodyB.force);
        }

        // Broadphase
        var result = broadphase.getCollisionPairs(this);

        // Nearphase
        var oldContacts = this.contacts.concat(this.oldContacts);
        var contacts = this.contacts = [];
        var Circle = p2.Circle,
            Plane = p2.Plane,
            Particle = p2.Particle;
        for(var i=0, Nresults=result.length; i!==Nresults; i+=2){
            var bi = result[i];
            var bj = result[i+1];
            var si = bi.shape;
            var sj = bj.shape;
            if(si instanceof p2.Circle){
                     if(sj instanceof Circle)   nearphaseCircleCircle  (bi,bj,contacts,oldContacts);
                else if(sj instanceof Particle) nearphaseCircleParticle(bi,bj,contacts,oldContacts);
                else if(sj instanceof Plane)    nearphaseCirclePlane   (bi,bj,contacts,oldContacts);
            } else if(si instanceof Particle){
                     if(sj instanceof Circle)   nearphaseCircleParticle(bj,bi,contacts,oldContacts);
            } else if(si instanceof Plane){
                     if(sj instanceof Circle)   nearphaseCirclePlane   (bj,bi,contacts,oldContacts);
            }
        }
        this.oldContacts = oldContacts;

        // Solver
        for(var i=0, Ncontacts=contacts.length; i!==Ncontacts; i++){
            solver.addEquation(contacts[i]);
        }
        solver.solve(dt,this);
        solver.removeAllEquations();

        // Step forward
        var fhMinv = step_fhMinv;
        var velodt = step_velodt;
        for(var i=0; i!==Nbodies; i++){
            var body = bodies[i];
            if(body.mass>0){
                var minv = 1.0 / body.mass,
                    f = body.force,
                    pos = body.position,
                    velo = body.velocity;

                // Angular step
                body.angularVelocity += body.angularForce * body.invInertia * dt;
                body.angle += body.angularVelocity * dt;

                // Linear step
                Vscale(f,dt*minv,fhMinv);
                Vadd(fhMinv,velo,velo);
                Vscale(velo,dt,velodt);
                Vadd(pos,velodt,pos);
            }
        }

        // Reset force
        for(var i=0; i!==Nbodies; i++){
            var bi = bodies[i];
            V.set(bi.force,0.0,0.0);
            bi.angularForce = 0.0;
        }

        if(doProfiling){
            t1 = now();
            this.lastStepTime = t1-t0;
            this.vecCreations = vecCount;
            this.matCreations = matCount;
        }
    };

    /**
     * Add a spring to the simulation
     *
     * @method
     * @memberof p2.World
     * @param {p2.Spring} s
     */
    p2.World.prototype.addSpring = function(s){
        this.springs.push(s);
    };

    /**
     * Remove a spring
     *
     * @method
     * @memberof p2.World
     * @param {p2.Spring} s
     */
    p2.World.prototype.removeSpring = function(s){
        var idx = this.springs.indexOf(s);
        if(idx===-1)
            this.springs.splice(idx,1);
    };

    /**
     * Add a body to the simulation
     *
     * @method
     * @memberof p2.World
     * @param {p2.Body} body
     */
    p2.World.prototype.addBody = function(body){
        this.bodies.push(body);
        this.collidingBodies.push(body);
    };

    /**
     * Remove a body from the simulation
     *
     * @method
     * @memberof p2.World
     * @param {p2.Body} body
     */
    p2.World.prototype.removeBody = function(body){
        var idx = this.bodies.indexOf(body);
        if(idx===-1)
            this.bodies.splice(idx,1);
    };

    /**
     * Base class for constraint solvers.
     * @class
     */
    p2.Solver = function(){
        /**
         * Current equations in the solver.
         * @member {Array}
         * @memberof p2.Solver
         */
        this.equations = [];
    };
    p2.Solver.prototype.solve = function(dt,world){ return 0; };

    /**
     * Add an equation to be solved.
     * @method
     * @memberof p2.Solver
     * @param {p2.Equation} eq
     */
    p2.Solver.prototype.addEquation = function(eq){
        this.equations.push(eq);
    };

    /**
     * Remove an equation.
     * @method
     * @memberof p2.Solver
     * @param {p2.Equation} eq
     */
    p2.Solver.prototype.removeEquation = function(eq){
        var i = this.equations.indexOf(eq);
        if(i!=-1)
            this.equations.splice(i,1);
    };

    /**
     * Remove all currently added equations.
     * @method
     * @memberof p2.Solver
     */
    p2.Solver.prototype.removeAllEquations = function(){
        this.equations = [];
    };

    /**
     * Iterative Gauss-Seidel constraint equation solver.
     * @class
     * @extends p2.Solver
     */
    p2.GSSolver = function(){
        p2.Solver.call(this);
        this.iterations = 10;
        this.h = 1.0/60.0;
        this.k = 1e7;
        this.d = 6;
        this.a = 0.0;
        this.b = 0.0;
        this.eps = 0.0;
        this.tolerance = 0;
        this.setSpookParams(this.k,this.d);
        this.debug = false;
        this.arrayStep = 30;
        this.lambda = new ARRAY_TYPE(this.arrayStep);
        this.Bs =     new ARRAY_TYPE(this.arrayStep);
        this.invCs =  new ARRAY_TYPE(this.arrayStep);
    };
    p2.GSSolver.prototype = new p2.Solver();
    p2.GSSolver.prototype.setSpookParams = function(k,d){
        var h=this.h;
        this.k = k;
        this.d = d;
        this.a = 4.0 / (h * (1 + 4 * d));
        this.b = (4.0 * d) / (1 + 4 * d);
        this.eps = 4.0 / (h * h * k * (1 + 4 * d));
    };
    p2.GSSolver.prototype.solve = function(dt,world){
        var d = this.d,
            ks = this.k,
            iter = 0,
            maxIter = this.iterations,
            tolSquared = this.tolerance*this.tolerance,
            a = this.a,
            b = this.b,
            eps = this.eps,
            equations = this.equations,
            Neq = equations.length,
            bodies = world.bodies,
            Nbodies = world.bodies.length,
            h = dt;

        // Things that does not change during iteration can be computed once
        if(this.lambda.length < Neq){
            this.lambda = new ARRAY_TYPE(Neq + this.arrayStep);
            this.Bs =     new ARRAY_TYPE(Neq + this.arrayStep);
            this.invCs =  new ARRAY_TYPE(Neq + this.arrayStep);
        }
        var invCs = this.invCs;
        var Bs = this.Bs;
        var lambda = this.lambda;

        // Create array for lambdas
        for(var i=0; i!==Neq; i++){
            var c = equations[i];
            lambda[i] = 0.0;
            Bs[i] = c.computeB(a,b,h);
            invCs[i] = 1.0 / c.computeC(eps);
        }

        var q, B, c, invC, deltalambda, deltalambdaTot, GWlambda, lambdaj;

        if(Neq !== 0){
            var i,j, minForce, maxForce, lambdaj_plus_deltalambda;

            // Reset vlambda
            for(i=0; i!==Nbodies; i++){
                var b=bodies[i], vlambda=b.vlambda;
                V.set(vlambda,0,0);
                b.wlambda = 0;
            }

            // Iterate over equations
            for(iter=0; iter!==maxIter; iter++){

                // Accumulate the total error for each iteration.
                deltalambdaTot = 0.0;

                for(j=0; j!==Neq; j++){

                    c = equations[j];

                    // Compute iteration
                    maxForce = c.maxForce;
                    minForce = c.minForce;
                    B = Bs[j];
                    invC = invCs[j];
                    lambdaj = lambda[j];
                    GWlambda = c.computeGWlambda(eps);
                    deltalambda = invC * ( B - GWlambda - eps * lambdaj );

                    // Clamp if we are not within the min/max interval
                    lambdaj_plus_deltalambda = lambdaj + deltalambda;
                    if(lambdaj_plus_deltalambda < minForce){
                        deltalambda = minForce - lambdaj;
                    } else if(lambdaj_plus_deltalambda > maxForce){
                        deltalambda = maxForce - lambdaj;
                    }
                    lambda[j] += deltalambda;

                    deltalambdaTot += abs(deltalambda);

                    c.addToWlambda(deltalambda);
                }

                // If the total error is small enough - stop iterate
                if(deltalambdaTot*deltalambdaTot <= tolSquared) break;
            }

            // Add result to velocity
            for(i=0; i!==Nbodies; i++){
                var b=bodies[i], v=b.velocity;
                Vadd(v, b.vlambda, v);
                b.angularVelocity += b.wlambda;
            }
        }
        errorTot = deltalambdaTot;
        return iter;
    };

    /**
     * Base class for constraint equations.
     * @class
     * @param {p2.Body} bi First body participating in the equation
     * @param {p2.Body} bj Second body participating in the equation
     * @param {number} minForce Minimum force to apply. Default: -1e6
     * @param {number} maxForce Maximum force to apply. Default: 1e6
     */
   p2.Equation = function(bi,bj,minForce,maxForce){
      this.id = -1;
      this.minForce = typeof(minForce)=="undefined" ? -1e6 : minForce;
      this.maxForce = typeof(maxForce)=="undefined" ? 1e6 : maxForce;
      this.bi = bi;
      this.bj = bj;
    };
    p2.Equation.prototype.constructor = p2.Equation;

    /**
     * Non-penetration constraint equation.
     * @class
     * @extends p2.Equation
     * @param {p2.Body} bi
     * @param {p2.Body} bj
     */
    p2.ContactEquation = function(bi,bj){
        p2.Equation.call(this,bi,bj,0,1e6);
        this.penetration = 0.0;
        this.ri = V.create();
        this.penetrationVec = V.create();
        this.rj = V.create();
        this.ni = V.create();
        this.rixn = V.create();
        this.rjxn = V.create();
        this.rixw = V.create();
        this.rjxw = V.create();
        this.relVel = V.create();
        this.relForce = V.create();
    };
    p2.ContactEquation.prototype = new p2.Equation();
    p2.ContactEquation.prototype.constructor = p2.ContactEquation;
    p2.ContactEquation.prototype.computeB = function(a,b,h){
        var bi = this.bi,
            bj = this.bj,
            ri = this.ri,
            rj = this.rj,
            xi = bi.position,
            xj = bj.position;

        var vi = bi.velocity,
            wi = bi.angularVelocity,
            fi = bi.force,
            taui = bi.angularForce;

        var vj = bj.velocity,
            wj = bj.angularVelocity,
            fj = bj.force,
            tauj = bj.angularForce;

        var relVel = this.relVel,
            relForce = this.relForce,
            penetrationVec = this.penetrationVec,
            invMassi = bi.invMass,
            invMassj = bj.invMass,
            invIi = bi.invInertia,
            invIj = bj.invInertia,
            n = this.ni;

        // Caluclate cross products
        var rixn = this.rixn = Vcross(ri,n);
        var rjxn = this.rjxn = Vcross(rj,n);

        // Calculate q = xj+rj -(xi+ri) i.e. the penetration vector
        V.set(penetrationVec,0,0);
        Vadd(xj,rj,penetrationVec);
        Vsub(penetrationVec,xi,penetrationVec);
        Vsub(penetrationVec,ri,penetrationVec);

        var Gq = Vdot(n,penetrationVec);

        // Compute iteration
        var GW = Vdot(vj,n) - Vdot(vi,n) + wj * rjxn - wi * rixn;
        var GiMf = Vdot(fj,n)*invMassj - Vdot(fi,n)*invMassi + invIj*tauj*rjxn - invIi*taui*rixn;

        var B = - Gq * a - GW * b - h*GiMf;

        return B;
    };
    // Compute C = GMG+eps in the SPOOK equation
    p2.ContactEquation.prototype.computeC = function(eps){
        var bi = this.bi;
        var bj = this.bj;
        var rixn = this.rixn;
        var rjxn = this.rjxn;
        var invMassi = bi.invMass;
        var invMassj = bj.invMass;

        var C = invMassi + invMassj + eps;

        var invIi = bi.invInertia;
        var invIj = bj.invInertia;

        // Compute rxn * I * rxn for each body
        C += invIi * rixn * rixn;
        C += invIj * rjxn * rjxn;

        return C;
    };
    var computeGWlambda_ulambda = V.create();
    p2.ContactEquation.prototype.computeGWlambda = function(){
        var bi = this.bi;
        var bj = this.bj;
        var ulambda = computeGWlambda_ulambda;

        var GWlambda = 0.0;
        V.subtract(bj.vlambda, bi.vlambda, ulambda);
        GWlambda += V.dot(ulambda,this.ni);

        // Angular
        GWlambda -= bi.wlambda * this.rixn;
        GWlambda += bj.wlambda * this.rjxn;

        return GWlambda;
    };

    var addToWlambda_temp = V.create();
    p2.ContactEquation.prototype.addToWlambda = function(deltalambda){
        var bi = this.bi;
        var bj = this.bj;
        var rixn = this.rixn;
        var rjxn = this.rjxn;
        var invMassi = bi.invMass;
        var invMassj = bj.invMass;
        var n = this.ni;
        var temp = addToWlambda_temp;

        // Add to linear velocity
        Vscale(n,invMassi*deltalambda,temp);
        Vsub(bi.vlambda, temp , bi.vlambda);

        Vscale(n,invMassj*deltalambda,temp);
        Vadd(bj.vlambda, temp, bj.vlambda);

        // Add to angular velocity
        bi.wlambda -= bi.invInertia * rixn * deltalambda;
        bj.wlambda += bj.invInertia * rjxn * deltalambda;
    };

	if (typeof module !== 'undefined') {
   		// export for node
    	module.exports = p2;
	} else {
    	// assign to window
    	this.p2 = p2;
	}

}).apply(this);