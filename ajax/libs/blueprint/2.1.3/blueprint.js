/*
 * Blueprint
 */
(function() {

    var extend = function( obj, var_args ) {
        for ( var i = 1; i < arguments.length ; i += 1 ) {
            var other = arguments[ i ];
            for ( var p in other ) {
                var v = Object.getOwnPropertyDescriptor( other, p );
                if ( typeof v == "undefined" || typeof v.value == "undefined" ) {
                    delete obj[ p ];
                } else {
                    Object.defineProperty( obj, p, v );
                }
            }
        }
        return obj;
    };

    var blueprint = ({ configure: function( fn ) { fn.apply( this ); return this } })

        .configure(function() {
            this.ctor = function Object() {
                if ( this.init ) {
                    this.init.apply( this, arguments );
                }
            };

            this.__decorators = [];
            this.apply_decorators = function( name, value ) {
                var decorators = [].concat( this.__decorators );
                this.__decorators = [];
                while ( decorators.length ) {
                    value = decorators.shift().call( this, name, value )
                }
                return value;
            }

            this.directive = function( name, fn ) {
                fn = this.apply_decorators( name, fn );
                this[ name ] = fn;
                return this;
            }
        })

        // .decorate( name, decorator )
        //  basic function decoration logic
        .directive( "decorate", function( name, decorator ) {
            var that = this;
            if ( typeof name == "function" && arguments.length == 1 ) {
                decorator = name;
                name = undefined;
            }
            decorator = this.apply_decorators( name, decorator );
            var decoration = function() {
                var value = decorator.apply( this, arguments );
                this.__decorators.push( value );
                return this;
            }
            decoration.decorator = function() {
                return decorator.apply( that, arguments );
            };

            if ( typeof name == "undefined" ) {
                return decoration.apply( this ); // apply the decoration in-place
            }

            this[ name ] = decoration; // define a new decorator
            return this;
        })

        // .define( name, value )
        //  adds a new key-value pair to the class
        .directive( "define", function( name, value ) {
            value = this.apply_decorators( name, value );

            // static
            var obj = this.ctor.prototype;
            if ( this.__static ) {
                delete this.__static;
                obj = this.ctor;
            }

            // property
            obj[ name ] = value;
            var payload = { name: name, value: value, obj: obj };
            this.ctor.trigger( "define", payload )
            this.ctor.trigger( "define:" + name, payload )
            this.__lastdefine = payload;
            return this;
        })

        // static
        // decorates the next definition to be attached to the class as a static
        // member instead of an instance member
        .decorate( "static", function() {
            this.__static = true;
            return function( name, value ) {
                return value;
            }
        })

        // .trigger( name, [ arg1, args2, ... ] )
        // triggers an event by name to all of the attached listeners (if any)
        .static()
        .define( "trigger", function( name ) {
            if ( this.__events && this.__events[ name ] ) {
                // clone the list of listeners in order to allow them to modify
                // the original list of callbacks
                var listeners = [].concat( this.__events[ name ] );
                for ( var i = 0 ; i < listeners.length ; i += 1 ) {
                    listeners[ i ].apply( this, arguments );
                }
            }
            return this;
        })

        // .on( name, listener )
        // adds a new event listener to events of the given name
        .static()
        .define( "on", function( name, fn ) {
            this.__events || ( this.__events = {} );
            this.__events[ name ] || ( this.__events[ name ] = [] );

            // avoid duplicates
            if ( this.__events[ name ].indexOf( fn ) != -1 ) return this;
            this.__events[ name ].push( fn )
            return this;
        })

        // .off( name, listener )
        // removes an existing listener from the events of the given name
        .static()
        .define( "off", function( name, fn ) {
            if ( !name ) {
                delete this.__events;
                return this;
            } else if ( !this.__events[ name ] ){
                return this;
            } else if ( !fn ) {
                delete this.__events[ name ];
                return this;
            } else {
                var i = this.__events[ name ].indexOf( fn );
                if ( i != -1 ) {
                    this.__events[ name ].splice( i, 1 );
                }
                return this;
            }
        })

        // add the event methods to the prototype as well
        .configure(function() {
            this.ctor.prototype.trigger = this.ctor.trigger;
            this.ctor.prototype.on = this.ctor.on;
            this.ctor.prototype.off = this.ctor.off;

            // prevent copying the the events from the parent class to the subclass
            this.ctor.on( "extend", function( ev, subcls ) {
                delete this.__events;
                subcls.on( "extend", arguments.callee );
            })
        })

        // .bind( to, [ restore ] )
        //  decorates the next defined method to run with the provided context
        .decorate( "bind", function( to ) {
            return function( name, fn ) {
                if ( typeof fn != "function" ) {
                    throw new Error( "'bind' decorator is only applicable to functions" )
                }

                var that = this;
                return function() {
                    var _to = ( typeof to == "function" ) ? to.call( that, this ) : to;
                    return fn.apply( _to, arguments );
                }
            }
        })

        // .extend( name )
        //  create a new sub-class which will inherit from the current class
        .bind(function() { return this } )
        .static()
        .define( "extend", function( name, proto ) {
            var _super = this.ctor;
            var ctor = "(function NAME(){return _super.apply(this,arguments)})";
            ctor = ctor.replace( "NAME", name || "" );
            ctor = extend( eval( ctor ), this.ctor );
            ctor.prototype = Object.create( this.ctor.prototype );
            ctor.prototype.constructor = ctor;
            var subcls = extend( Object.create( this ), { 
                ctor: ctor, super: this,
                __decorators: [],
                privates: extend( {}, this.privates ), 
                static_privates: extend( {}, this.static_privates )
            })
            ctor.extend = this.bind.decorator( subcls )( "extend", arguments.callee )
            this.ctor.trigger( "extend", ctor );
            return subcls;
        })

        .directive( "mixin", function( ctor ) {
            extend( this.ctor, ctor );
            extend( this.ctor.prototype, ctor.prototype );
            this.ctor.prototype.constructor = this.ctor;
            return this;
        })

        // .alias( name )
        //  decorate the next definition to also be assigned to the provided name
        .decorate( "alias", function( other ) {
            return function( name, value ) {
                this.ctor.on( "define", function( ev, options ) {
                    this.off( "define", arguments.callee );
                    var v = Object.getOwnPropertyDescriptor( options.obj, options.name );
                    Object.defineProperty( options.obj, other, v );
                })
                return value;
            }
        })

        .decorate( "trigger", function( event_ ) {
            return function( name, fn ) {
                return function() {
                    this.trigger( event_, { arguments: arguments } );
                    return fn.apply( this, arguments );
                }
            }
        })

        // .thenable()
        //  define the function as an async method that exposes a promise
        .decorate( "thenable", function() {
            return function( name, fn ) {
                return function() {
                    var args = [].slice.call( arguments );
                    var that = this;
                    return new Promise(function( fulfill, reject ) {
                        args.push( fulfill, reject );
                        fn.apply( that, args );
                    })
                }
            }
        })

        .directive( "then", function( fn ) {
            var last = this.__lastdefine;
            fn = this.apply_decorators( last.name, fn );
            var lastfn = last.obj[ last.name ];
            last.obj[ last.name ] = function() {
                var rv = lastfn.apply( this, arguments );
                return ( rv instanceof Promise ) ? rv.then( fn ) : fn.call( this, rv );
            };
            return this;
        })

        .directive( "catch", function( fn ) {
            var last = this.__lastdefine;
            fn = this.apply_decorators( last.name, fn );
            var lastfn = last.obj[ last.name ];
            last.obj[ last.name ] = function() {
                var rv;
                try {
                    rv = lastfn.apply( this, arguments );
                    if ( rv instanceof Promise ) {
                        rv = rv.catch( fn );
                    }
                } catch ( e ) {
                    rv = fn.call( this, e );
                };
                return rv;
            };
            return this;
        })

        .directive( "init", function( fn ) {
            return this.define( "init", fn );
        })

        .directive( "create", function() {
            this.ctor.trigger( "create" );
            return this.ctor;
        })

        .create();


    var Promise = blueprint.extend( "Promise" )

        .init(function(fn) {
            var that = this;
            var onfulfill = this.__onfulfill = [];
            var onreject  = this.__onreject = [];
            var next = ( typeof process != "undefined" && process.nextTick )
                ? process.nextTick
                : function( fn ) { setTimeout( fn, 1 ); }
                ;

            var fulfill = function( value ) {
                next(function() {
                    if ( !onfulfill.length ) return;
                    onfulfill.shift()( value );
                    fulfill( value );
                })
            };

            var reject = function( reason ) {
                next(function() {
                    if ( !onreject.length ) return;
                    onreject.shift()( reason );
                    reject( reason );
                })
            };

            fn( fulfill, reject );
        })

        .define( "resolve", function( x, fulfill, reject ) {
            var that = this;
            if ( this == x ) {
                return reject( new TypeError() );
            }

            // if ( x instanceof Promise ) {
            //     x.on( "fulfilled", function( ev, v ) { fulfill( v ) } );
            //     x.on( "rejected",  function( ev, r ) { reject( r )  } );
            //     return;
            // }

            if ( [ "object", "function" ].indexOf( typeof x ) == -1 ) {
                return fulfill( x )
            }

            try {
                var then = x.then
            } catch( e ) {
                return reject( e );
            }

            if ( typeof then != "function" ) {
                return fulfill( x );
            }

            var called = false;
            try {
                then.call( x, function( y ) { // resolve promise
                    if ( called ) return;
                    called = true;
                    that.resolve( y, fulfill, reject );
                }, function( r ) { // reject promise
                    if ( called ) return;
                    called = true;
                    reject( r );
                })
            } catch( e ) {
                if ( called ) return;
                reject( e );
            }
        })

        .define( "then", function( onfulfill, onreject ) {
            var that = this;
            var resolve = that.resolve;
            var promise = new Promise(function( fulfill, reject ) {
                that.__onfulfill.push(function( value ) {
                    if ( typeof onfulfill != "function" ) {
                        fulfill( value );
                        return;
                    }

                    try {
                        promise.resolve( onfulfill( value ), fulfill, reject );
                    } catch( e ) {
                        reject( e );
                    }
                });

                that.__onreject.push(function( reason ) {
                    if ( typeof onreject != "function" ) {
                        reject( reason );
                        return;
                    }

                    try {
                        promise.resolve( onreject( reason ), fulfill, reject );
                    } catch( e ) {
                        reject( e );
                    }
                });

            });

            return promise;
        })

        .define( "catch", function( onreject ) {
            return this.then( null, onreject );
        })

        .create();

    var Model = blueprint.extend( "Model" )
        .define( "id", null )

        .directive( "collection", function( name ) {
            this.static()
                .define( "collection", name );
            return this;
        })

        .thenable()
        .define( "save", function( options ) {
            return this._backend.save( this, options );
        })

        .thenable()
        .define( "load", function( options ) {
            return this._backend.load( this, options );
        })

        .thenable()
        .define( "remove", function( options ) {
            return this._backend.remove( this, options );
        })

        .static()
        .define( "find", function( options ) {
            return this._backend.find( this, options )
        })

        .static()
        .define( "backend", function( backend ) {
            this._backend = backend;
            return this;
        })

        .create();

    var MemoryBackend = blueprint.extend( "MemoryBackend" )
        .init( function( storage ) {
            this.storage = storage || {};
            this.__id = 0;
        })

        .thenable()
        .define( "save", function( model, options, fulfill, reject ) {
            var id = model.id;
            while ( !id ) {
                this.__id += 1;
                if ( !this.storage.hasOwnProperty( this.__id ) ) {
                    id = model.id = this.__id;
                }
            }
            this.storage[ id ] = JSON.stringify( model );
            fulfill( model )
        })

        .thenable()
        .define( "load", function( model, options, fulfill, reject ) {
            var id = model.id;
            if ( !id ) {
                return reject( new Error( "Unable to load model: missing id" ) );
            }
            var data = this.storage[ id ];
            if ( !data ) {
                return reject( "Unable to load model: not found" )
            }
            extend( model, JSON.parse( data ) )
            fulfill( model );
        })
        
        .thenable()
        .define( "remove", function( model, options, fulfill, reject ) {
            var id = model.id;
            if ( !id ) {
                return reject( new Error( "Unable to remove: missing id" ) );
            }
            if ( !this.storage.hasOwnProperty( id ) ) {
                return reject( "Unable to remove model: not found" )
            }
            delete this.storage[ id ];
            fulfill( model );
        })

        .static()
        .thenable()
        .define( "find", function( Model, options, fulfill, reject ) {
            var models = this.storage.map(function( model ) {
                return new Model( JSON.parse( model ) );
            })
            fulfill( models );
        })

        .create();

    blueprint = extend(function( name, ctor ) {
        if ( typeof name == "function" ) {
            ctor = name;
            name = undefined;
        }
        
        var cls = arguments.callee.Object.extend( name );
        if ( ctor ) {
            extend( cls.ctor, ctor );
            cls.ctor.prototype = Object.create( ctor.prototype );
            cls.ctor.prototype.constructor = cls.ctor;
            cls.init( ctor );
        }
        return cls;
    }, {
        Object: blueprint,
        Promise: Promise,
        Model: Model,
        MemoryBackend: MemoryBackend
    })
    
    if ( typeof exports == "undefined" ) {
        window[ "blueprint" ] = blueprint 
    } else {
        module.exports = blueprint
    }
})();
