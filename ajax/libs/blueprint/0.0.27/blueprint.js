var events = require( "events" );
var util = require( "util" );

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
var Blueprint = function Blueprint( opts ) {
    this.extend( opts ).init();
}

merge( Blueprint.prototype, {

    // lazy proxy to events emitter
    // avoids polluting the object and memory with unused event emitter
    // data while most objects may not use it at all.
    events: function() {
        if ( !this.__events ) {
            this.__events = new events.EventEmitter();
        }
        return this.__events;
    },
    on: function( event, listener ) {
        this.events().on( event, listener );
        return this;
    },
    off: function( event, listener ) {
        this.events().removeListener( event, listener );
        return this;
    },
    once: function( event, listener ) {
        this.events().once( event, listener );
        return this;
    },
    emit: function( event ) {
        var es = this.events()
        es.emit.apply( es, arguments );
        return this;
    },

    // blueprint properties
    init: function() {},
    extend: function( obj ) {
        return merge( this, obj );
    },
    toObject: function() {
        var obj = {};
        for ( var name in this ) {
            if ( name.substr( 0, 2 ) == "__" ) {
                // skip internal auxiliary variables
                continue;
            } else if ( !this.hasOwnProperty( name ) ) {
                continue;
            }
            obj[ name ] = this[ name ];
        }
        return obj;
    }
});

// extend a Blueprint class
Blueprint.extend = function( name ) {

    // create the named constructor
    var parent = this;
    var js = "function " + name + "(){return Blueprint.apply(this,arguments)};" + name;
    var ctor = eval( js );

    // most basic inheritance from the first parent
    // and then copy-prototype inheritence for every other parent
    var parents = [ this ];
    util.inherits( ctor, parents[ 0 ] );
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

    return ctor;
};

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

// extract the schema from the prototype, and replace it with the defaults
Model.extend = function() {
    var ctor = Blueprint.extend.apply( this, arguments );
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
    return ctor;
};

Model.find = function( criteria ) {
    return this.datastore().find( this, criteria );
};

// sets the datastore on the prototype instead of the object
// in order to allow inheritance: setting the datastore on a top model class
// will also apply to the bottom ones, as long as it's not overridden.
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

// a base model field with a required validator
var ModelField = Blueprint.extend( "Field", {
    name: null, required: true, default: null,
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
        this.map || ( this.map = {} );
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

module.exports = {
    Blueprint: Blueprint,
    Model: Model,
    Datastore: Datastore,
    Field: ModelField,
    String: StringField,
    Number: NumberField,
    Boolean: BooleanField,
    Array: ListField,
    List: ListField,
};