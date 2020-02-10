/**
 * Galleria Flickr Plugin
 *
 *
 * Copyright (c) 2010 - 2019 worse is better UG
 * Licensed under the MIT License.
 */

( function( window, factory ) {
    if ( typeof define == 'function' && define.amd ) {
        define( ['../galleria', 'jquery' ], function( Galleria, jQuery ) {
            return factory( window, Galleria, jQuery );
        });
    } else if ( typeof module == 'object' && module.exports ) {
        module.exports = factory(
            window,
            require('galleria'),
            require('jquery')
        );
    } else {
        factory(
            window,
            window.Galleria,
            window.jQuery
        );
    }
}( window, function factory( window, Galleria, $ ) {

/*global jQuery, Galleria, window */

Galleria.requires(1.25, 'The Flickr Plugin requires Galleria version 1.2.5 or later.');

// The script path
var PATH = Galleria.utils.getScriptPath();

/**

    @class
    @constructor

    @example var flickr = new Galleria.Flickr();

    @requires jQuery
    @requires Galleria

    @param {String} [api_key] Flickr API key to be used, defaults to the Galleria key

    @returns Instance
*/

Galleria.Flickr = function( api_key ) {

    this.api_key = api_key || '2a2ce06c15780ebeb0b706650fc890b2';

    this.options = {
        max: 30,                       // photos to return
        imageSize: 'medium',           // photo size ( thumb,small,medium,big,original )
        thumbSize: 'thumb',            // thumbnail size ( thumb,small,medium,big,original )
        sort: 'interestingness-desc',  // sort option ( date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, relevance )
        description: false,            // set this to true to get description as caption
        complete: function(){},        // callback to be called inside the Galleria.prototype.load
        backlink: false                // set this to true if you want to pass a link back to the original image
    };
};

Galleria.Flickr.prototype = {

    // bring back the constructor reference

    constructor: Galleria.Flickr,

    /**
        Search for anything at Flickr

        @param {String} phrase The string to search for
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    search: function( phrase, callback ) {
        return this._find({
            text: phrase
        }, callback );
    },

    /**
        Search for anything at Flickr by tag

        @param {String} tag The tag(s) to search for
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    tags: function( tag, callback ) {
        return this._find({
            tags: tag
        }, callback);
    },

    /**
        Get a user's public photos

        @param {String} username The username as shown in the URL to fetch
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    user: function( username, callback ) {
        return this._call({
            method: 'flickr.urls.lookupUser',
            url: 'flickr.com/photos/' + username
        }, function( data ) {
            this._find({
                user_id: data.user.id,
                method: 'flickr.people.getPublicPhotos'
            }, callback);
        });
    },

    /**
        Get photos from a photoset by ID

        @param {String|Number} photoset_id The photoset id to fetch
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    set: function( photoset_id, callback ) {
        return this._find({
            photoset_id: photoset_id,
            method: 'flickr.photosets.getPhotos'
        }, callback);
    },

    /**
        Get photos from a gallery by ID

        @param {String|Number} gallery_id The gallery id to fetch
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    gallery: function( gallery_id, callback ) {
        return this._find({
            gallery_id: gallery_id,
            method: 'flickr.galleries.getPhotos'
        }, callback);
    },

    /**
        Search groups and fetch photos from the first group found
        Useful if you know the exact name of a group and want to show the groups photos.

        @param {String} group The group name to search for
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    groupsearch: function( group, callback ) {
        return this._call({
            text: group,
            method: 'flickr.groups.search'
        }, function( data ) {
            this.group( data.groups.group[0].nsid, callback );
        });
    },

    /**
        Get photos from a group by ID

        @param {String} group_id The group id to fetch
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    group: function ( group_id, callback ) {
        return this._find({
            group_id: group_id,
            method: 'flickr.groups.pools.getPhotos'
        }, callback );
    },

    /**
        Set flickr options

        @param {Object} options The options object to blend

        @returns Instance
    */

    setOptions: function( options ) {
        $.extend(this.options, options);
        return this;
    },


    // call Flickr and raise errors

    _call: function( params, callback ) {

        var url = 'https://api.flickr.com/services/rest/?';

        var scope = this;

        params = $.extend({
            format : 'json',
            jsoncallback : '?',
            api_key: this.api_key
        }, params );

        $.each(params, function( key, value ) {
            url += '&' + key + '=' + value;
        });

        $.getJSON(url, function(data) {
            if ( data.stat === 'ok' ) {
                callback.call(scope, data);
            } else {
                Galleria.raise( data.code.toString() + ' ' + data.stat + ': ' + data.message, true );
            }
        });
        return scope;
    },


    // "hidden" way of getting a big image (~1024) from flickr

    _getBig: function( photo ) {

        if ( photo.url_l ) {
            return photo.url_l;
        } else if ( parseInt( photo.width_o, 10 ) > 1280 ) {

            return 'https://farm'+photo.farm + '.static.flickr.com/'+photo.server +
                '/' + photo.id + '_' + photo.secret + '_b.jpg';
        }

        return photo.url_o || photo.url_z || photo.url_m;

    },


    // get image size by option name

    _getSize: function( photo, size ) {

        var img;

        switch(size) {

            case 'thumb':
                img = photo.url_t;
                break;

            case 'small':
                img = photo.url_s;
                break;

            case 'big':
                img = this._getBig( photo );
                break;

            case 'original':
                img = photo.url_o ? photo.url_o : this._getBig( photo );
                break;

            default:
                img = photo.url_z || photo.url_m;
                break;
        }
        return img;
    },


    // ask flickr for photos, parse the result and call the callback with the galleria-ready data array

    _find: function( params, callback ) {

        params = $.extend({
            method: 'flickr.photos.search',
            extras: 'url_t,url_m,url_o,url_s,url_l,url_z,description',
            sort: this.options.sort,
            per_page: Math.min( this.options.max, 500 )
        }, params );

        return this._call( params, function(data) {

            var gallery = [],
                photos = data.photos ? data.photos.photo : data.photoset.photo,
                len = photos.length,
                photo,
                i;

            for ( i=0; i<len; i++ ) {

                photo = photos[i];

                gallery.push({
                    thumb: this._getSize( photo, this.options.thumbSize ),
                    image: this._getSize( photo, this.options.imageSize ),
                    big: this._getBig( photo ),
                    title: photos[i].title,
                    description: this.options.description && photos[i].description ? photos[i].description._content : '',
                    link: this.options.backlink ? 'https://flickr.com/photos/' + photo.owner + '/' + photo.id : ''
                });
            }
            callback.call( this, gallery );
        });
    }
};


/**
    Galleria modifications
    We fake-extend the load prototype to make Flickr integration as simple as possible
*/


// save the old prototype in a local variable

var load = Galleria.prototype.load;


// fake-extend the load prototype using the flickr data

Galleria.prototype.load = function() {

    // pass if no data is provided or flickr option not found
    if ( arguments.length || typeof this._options.flickr !== 'string' ) {
        load.apply( this, Galleria.utils.array( arguments ) );
        return;
    }

    // define some local vars
    var self = this,
        args = Galleria.utils.array( arguments ),
        flickr = this._options.flickr.split(':'),
        f,
        opts = $.extend({}, self._options.flickrOptions),
        loader = typeof opts.loader !== 'undefined' ?
            opts.loader : $('<div>').css({
                width: 48,
                height: 48,
                opacity: 0.7,
                background:"#000 url('data:image/gif;base64,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') no-repeat 50% 50%"
            });

    if ( flickr.length ) {

        // validate the method
        if ( typeof Galleria.Flickr.prototype[ flickr[0] ] !== 'function' ) {
            Galleria.raise( flickr[0] + ' method not found in Flickr plugin' );
            return load.apply( this, args );
        }

        // validate the argument
        if ( !flickr[1] ) {
            Galleria.raise( 'No flickr argument found' );
            return load.apply( this, args );
        }

        // apply the preloader
        window.setTimeout(function() {
            self.$( 'target' ).append( loader );
        },100);

        // create the instance
        f = new Galleria.Flickr();

        // apply Flickr options
        if ( typeof self._options.flickrOptions === 'object' ) {
            f.setOptions( self._options.flickrOptions );
        }

        // call the flickr method and trigger the DATA event
        f[ flickr[0] ]( flickr[1], function( data ) {

            self._data = data;
            loader.remove();
            self.trigger( Galleria.DATA );
            f.options.complete.call(f, data);

        });
    } else {

        // if flickr array not found, pass
        load.apply( this, args );
    }
};

    return Galleria;
}));
