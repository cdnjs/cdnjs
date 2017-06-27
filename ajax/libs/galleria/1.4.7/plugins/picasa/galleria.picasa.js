/**
 * Galleria Picasa Plugin 2016-09-03
 * http://galleria.io
 *
 * Copyright (c) 2010 - 2016 worse is better UG
 * Licensed under the MIT license
 * https://raw.github.com/worseisbetter/galleria/master/LICENSE
 *
 */

(function($) {

/*global jQuery, Galleria, window */

Galleria.requires(1.25, 'The Picasa Plugin requires Galleria version 1.2.5 or later.');

// The script path
var PATH = Galleria.utils.getScriptPath();

/**

    @class
    @constructor

    @example var picasa = new Galleria.Picasa();

    @author http://wib.io

    @requires jQuery
    @requires Galleria

    @returns Instance
*/

Galleria.Picasa = function() {

    this.options = {
        max: 30,                       // photos to return
        imageSize: 'medium',           // photo size ( thumb,small,medium,big,original ) or a number
        thumbSize: 'thumb',            // thumbnail size ( thumb,small,medium,big,original ) or a number
        complete: function(){}         // callback to be called inside the Galleria.prototype.load
    };

};

Galleria.Picasa.prototype = {

    // bring back the constructor reference

    constructor: Galleria.Picasa,

    /**
        Search for anything at Picasa

        @param {String} phrase The string to search for
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    search: function( phrase, callback ) {
        return this._call( 'search', 'all', {
            q: phrase
        }, callback );
    },

    /**
        Get a user's public photos

        @param {String} username The username to fetch photos from
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    user: function( username, callback ) {
        return this._call( 'user', 'user/' + username, callback );
    },

    /**
        Get photos from an album

        @param {String} username The username that owns the album
        @param {String} album The album ID
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    useralbum: function( username, album, callback ) {
        return this._call( 'useralbum', 'user/' + username + '/album/' + album, callback );
    },

    /**
        Set picasa options

        @param {Object} options The options object to blend

        @returns Instance
    */

    setOptions: function( options ) {
        $.extend(this.options, options);
        return this;
    },


    // call Picasa

    _call: function( type, url, params, callback ) {

        url = 'https://picasaweb.google.com/data/feed/api/' + url + '?';

        if (typeof params == 'function') {
            callback = params;
            params = {};
        }

        var self = this;

        params = $.extend({
            'kind': 'photo',
            'access': 'public',
            'max-results': this.options.max,
            'thumbsize': this._getSizes().join(','),
            'alt': 'json-in-script',
            'callback': '?'
        }, params );

        $.each(params, function( key, value ) {
            url += '&' + key + '=' + value;
        });

        // since Picasa throws 404 when the call is malformed, we must set a timeout here:

        var data = false;

        Galleria.utils.wait({
            until: function() {
                return data;
            },
            success: function() {
                self._parse.call( self, data.feed.entry, callback );
            },
            error: function() {
                var msg = '';
                if ( type == 'user' ) {
                    msg = 'user not found.';
                } else if ( type == 'useralbum' ) {
                    msg = 'album or user not found.';
                }
                Galleria.raise('Picasa request failed' + (msg ? ': ' + msg : '.'));
            },
            timeout: 5000
        });

        $.getJSON( url, function( result ) {
            data = result;
        });

        return self;
    },


    // parse image sizes and return an array of three

    _getSizes: function() {

        var self = this,
            norm = {
                small: '72c',
                thumb: '104u',
                medium: '640u',
                big: '1024u',
                original: '1600u'
            },
            op = self.options,
            t = {},
            n,
            sz = [32,48,64,72,94,104,110,128,144,150,160,200,220,288,320,400,512,576,640,720,800,912,1024,1152,1280,1440,1600];

        $(['thumbSize', 'imageSize']).each(function() {
            if( op[this] in norm ) {
                t[this] = norm[ op[this] ];
            } else {
                n = Galleria.utils.parseValue( op[this] );
                if (n > 1600) {
                    n = 1600;
                } else {
                    $.each( sz, function(i) {
                        if ( n < this ) {
                            n = sz[i-1];
                            return false;
                        }
                    });
                }
                t[this] = n;
            }
        });

        return [ t.thumbSize, t.imageSize, '1280u'];

    },


    // parse the result and call the callback with the galleria-ready data array

    _parse: function( data, callback ) {

        var self = this,
            gallery = [],
            img;

        $.each( data, function() {

            img = this.media$group.media$thumbnail;

            gallery.push({
                thumb: img[0].url,
                image: img[1].url,
                big: img[2].url,
                title: this.summary.$t
            });
        });

        callback.call( this, gallery );
    }
};


/**
    Galleria modifications
    We fake-extend the load prototype to make Picasa integration as simple as possible
*/


// save the old prototype in a local variable

var load = Galleria.prototype.load;


// fake-extend the load prototype using the picasa data

Galleria.prototype.load = function() {

    // pass if no data is provided or picasa option not found
    if ( arguments.length || typeof this._options.picasa !== 'string' ) {
        load.apply( this, Galleria.utils.array( arguments ) );
        return;
    }

    // define some local vars
    var self = this,
        args = Galleria.utils.array( arguments ),
        picasa = this._options.picasa.split(':'),
        p,
        opts = $.extend({}, self._options.picasaOptions),
        loader = typeof opts.loader !== 'undefined' ?
            opts.loader : $('<div>').css({
                width: 48,
                height: 48,
                opacity: 0.7,
                background:'#000 url('+PATH+'loader.gif) no-repeat 50% 50%'
            });

    if ( picasa.length ) {

        // validate the method
        if ( typeof Galleria.Picasa.prototype[ picasa[0] ] !== 'function' ) {
            Galleria.raise( picasa[0] + ' method not found in Picasa plugin' );
            return load.apply( this, args );
        }

        // validate the argument
        if ( !picasa[1] ) {
            Galleria.raise( 'No picasa argument found' );
            return load.apply( this, args );
        }

        // apply the preloader
        window.setTimeout(function() {
            self.$( 'target' ).append( loader );
        },100);

        // create the instance
        p = new Galleria.Picasa();

        // apply Flickr options
        if ( typeof self._options.picasaOptions === 'object' ) {
            p.setOptions( self._options.picasaOptions );
        }

        // call the picasa method and trigger the DATA event
        var arg = [];
        if ( picasa[0] == 'useralbum' ) {
            arg = picasa[1].split('/');
            if (arg.length != 2) {
                Galleria.raise( 'Picasa useralbum not correctly formatted (should be [user]/[album])');
                return;
            }
        } else {
            arg.push( picasa[1] );
        }

        arg.push(function(data) {
            self._data = data;
            loader.remove();
            self.trigger( Galleria.DATA );
            p.options.complete.call(p, data);
        });

        p[ picasa[0] ].apply( p, arg );

    } else {

        // if flickr array not found, pass
        load.apply( this, args );
    }
};

}( jQuery ) );