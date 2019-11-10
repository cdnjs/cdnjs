(function( exports ) {

    // a utility method for merging objects (similar to underscore's _.extend() )
    var merge = function( obj ) {
        for ( var i = 1 ; i < arguments.length ; i ++ ) {
            for ( var name in arguments[ i ] ) {
                obj[ name ] = arguments[ i ][ name ];
            }
        }
        return obj;
    };

    // Blueprint
    var Blueprint = function Blueprint() {}
    Blueprint.prototype.init = function() {
        this.emit( "init" );
    };

    Blueprint.prototype.extend = function( obj ) {
        return merge( this, obj );
    };

    Blueprint.prototype.toObject = function() {
        return merge( {}, this );
    };

    Blueprint.extend = function( name ) {
        this.emit( "extend:before", arguments );

        // create the named constructor
        var js = "function " + name + "(){this.init.apply(this,arguments)};";
        var ctor = eval( js + name );

        // most basic inheritance from the first parent
        // and then copy-prototype inheritence for every other parent
        var parents = [ this ];
        ctor.prototype = Object.create( parents[ 0 ].prototype );
        for ( var i = 1; i < arguments.length ; i += 1 ) {
            var proto = arguments[ i ];
            if ( typeof proto === "function" ) {
                parents.push( proto )
                proto = proto.prototype;
            }
            merge( ctor.prototype, proto );
        }

        // copy class members
        for ( var i = 0 ; i < parents.length ; i += 1 ) {
            merge( ctor, parents[ i ] );
        }

        // finally override the constructor setting to the first parent
        ctor.prototype.constructor = ctor;
        ctor.prototype.constructor.parents = parents;

        this.emit( "extend:after", ctor );
        return ctor;
    };

    /** Events **/
    Blueprint.Events = {
        on: function( type, callback ) {
            this._listeners || ( this._listeners = {} );
            this._listeners[ type ] || ( this._listeners[ type ] = [] );
            this._listeners[ type ].push( callback );
            return this;
        },

        off: function( type, callback ) {
            if ( !this._listeners ) return this;
            if ( !this._listeners[ type ] ) return this;

            var i = 0;
            while ( -1 !== ( i = this._listeners[ type ].indexOf( callback ) ) ) {
                this._listeners[ type ].splice( i, 1 );
            }
            return this;
        },

        emit: function( type ) {
            if ( !this._listeners ) return this;
            if ( !this._listeners[ type ] ) return this;

            var args = [].slice.call( arguments, 1 );
            for ( var i = 0 ; i < this._listeners[ type ].length ; i += 1 ) {
                this._listeners[ type ][ i ].apply( this, args );
            }
            return this;
        }
    };

    merge( Blueprint.prototype, Blueprint.Events );
    merge( Blueprint, Blueprint.Events );


    /** Model **/
    var Model = Blueprint.extend( "Model", {
        save: function() {
            this.constructor.datastore().save( this );
            return this;
        },
        load: function() {
            this.constructor.datastore().load( this );
            return this;
        },
        remove: function() {
            this.constructor.datastore().remove( this );
            return this;
        }
    });

    Model.find = function( criteria ) {
        return this.datastore().find( this, criteria );
    };

    Model.datastore = function( ds ) {
        if ( arguments.length == 0 ) {
            var ds = this.prototype._datastore;
            if ( !ds ) {
                throw new Error( "No datastore has been assigned" );
            }
            return ds;
        } else if ( ds === null ) {
            delete this.prototype._datastore;
        } else {
            this.prototype._datastore = ds;
        }
        return this;
    };

    /** Datastore **/
    var Datastore = Blueprint.extend( "Datastore", {
        init: function( map ) {
            this.map = map || {};
            Datastore.__id = 0;
        },

        key: function( model ) {
            return model.constructor.name + "." + model.id;
        },

        save: function( model ) {
            if ( !model.id ) {
                Datastore.__id += 1;
                model.id = Datastore.__id;
            }

            this.map[ this.key( model ) ] = model.toObject();
            model.emit( "saved" );
            return this;
        },

        load: function( model ) {
            var obj = this.map[ this.key( model ) ]
            if ( !obj ) {
                var err = new Error( "Unable to load model: not found" );
                return model.emit( "error", err );
            }
            model.extend( obj );
            model.emit( "loaded" );
            return this;
        },

        remove: function( model ) {
            delete this.map[ this.key( model ) ];
            model.emit( "removed" );
            return this;
        },
    });

    // export the Blueprint class
    exports.Blueprint = Blueprint
    exports.Model = Model
    exports.Datastore = Datastore

})( ( typeof exports == "undefined" ) ? this[ "blueprint" ] = {} : exports );