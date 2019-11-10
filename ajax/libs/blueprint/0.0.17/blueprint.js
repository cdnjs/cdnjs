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

        // create the named constructor
        var parent = this;
        var js = "function " + name + "(){return this.init.apply(this,arguments)};" + name;
        var ctor = eval( js );

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

        this.emit( "extend", ctor );
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
        validate: function() {
            this.emit( "validate" );
            var schema = this.constructor.schema()
            for ( var prop in schema ) {
                schema[ prop ].validate( this[ prop ] );
            }
        },
        save: function() {
            this.validate();
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

    // extract the schema from the prototype, and replace it with the defaults
    Model.on( "extend", function( ctor ) {
        var schema = {};
        for ( var prop in ctor.prototype ) {
            if ( !ctor.prototype.hasOwnProperty( prop ) ) {
                continue;
            }

            var v = ctor.prototype[ prop ];
            if ( v === String ) v = new StringField();
            else if ( v === Number ) v = new NumberField();
            else if ( v === Array ) v = new ListField();
            if ( !( v instanceof ModelField ) ) {
                continue; // not a field object
            }

            v.property = prop;
            ctor.prototype[ prop ] = v.default;
            schema[ prop ] = v;
        }
        ctor.schema = function() { return schema };
    });

    // a base model field with a required validator
    var ModelField = Blueprint.extend( "Field", {
        name: null, required: true, default: null,
        init: function( opts ) {
            this.extend( opts );
        },
        assert: function( cond, msg ) {
            if ( !cond ) {
                var msg = "Validation Error (" + this.property + "): " + msg;
                var err = new Error( msg )
                err.property = this.property;
                err.validator = this.constructor;
                throw err
            }
        },
        validate: function( v ) {
            if ( !this.required ) return;
            this.assert( typeof v != "undefined" && v != null, "required" );
        }
    });

    var StringField = ModelField.extend( "String", {
        min: null, max: null, regexp: null,
        validate: function( v ) {
            ModelField.prototype.validate.apply( this, arguments );
            this.assert( typeof v === "string", "not a string" );
            if ( this.max ) {
                this.assert( v.length <= this.max, "Maximum " + this.max + " characters" );
            }
            if ( this.min ) {
                this.assert( v.length >= this.min, "Minimum " + this.max + " characters" );
            }
            if ( this.regexp ) {
                this.assert( v.match( this.regexp ) != null, "doesn't match regexp: " + this.regexp );
            }
        }
    });

    var NumberField = ModelField.extend( "Number", {
        min: null, max: null,
        validate: function( v ) {
            ModelField.prototype.validate.apply( this, arguments );
            this.assert( v instanceof Number || typeof v === "number", "not a number" );
            if ( this.min !== null ) {
                this.assert( v >= this.min, "Minimum is " + this.min );
            }
            if ( this.max !== null ) {
                this.assert( v <= this.max, "Maximum is " + this.max );
            }
        }
    });

    var BooleanField = ModelField.extend( "Boolean", {
        validate: function( v ) {
            ModelField.prototype.validate.apply( this, arguments );
            this.assert( v === true || v === false, "not a boolean" );
        }
    });

    var ListField = ModelField.extend( "List", {
        max: null, min: null, of: null,
        validate: function( v ) {
            ModelField.prototype.validate.apply( this, arguments );
            this.assert( v instanceof Array, "not a list or array" );
            if ( this.max !== null ) {
                this.assert( v.length <= this.max, "maximum of " + this.max + " items" );
            }
            if ( this.min !== null ) {
                this.assert( v.length >= this.min, "minimum of " + this.min + " items" );
            }
            if ( this.of !== null && this.of instanceof ModelField ) {
                for ( var i = 0 ; i < v.length ; i += 1 ) {
                    this.of.validate( v[ i ] );
                }
            }
        }
    });

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


    merge( exports, {
        Blueprint: Blueprint,
        Model: Model,
        Datastore: Datastore,
        Field: ModelField,
        String: StringField,
        Number: NumberField,
        Boolean: BooleanField,
        Array: ListField,
        List: ListField,
    });

})( ( typeof exports == "undefined" ) ? this[ "blueprint" ] = {} : exports );