/*!
 * Spectragram by Adrian Quevedo (http://adrianquevedo.com/)
 * http://spectragram.js.org/
 *
 * Licensed under the MIT license.
 * You are free to use this plugin in commercial projects as long as the copyright header is left intact.
 *
 * This plugin uses the Instagram(tm) API and is not endorsed or certified by Instagram, Inc.
 * All Instagram(tm) logos and trademarks displayed on this plugin are property of Instagram, Inc.
 *
 */

// Utility for older browsers
if ( typeof Object.create !== "function" ) {
    Object.create = function ( obj ) {
        function F () {}
        F.prototype = obj;
        return new F();
    };
}

( function ( $, window, document, undefined ) {

	var Instagram = {

		API_URL: "https://api.instagram.com/v1",

        // Initialize function
        initialize: function ( options, elem ) {
            this.elem = elem;
            this.$elem = $( elem );
			this.accessData = $.fn.spectragram.accessData,
			this.accessToken = this.accessData.accessToken,
			this.clientID = this.accessData.clientID,
			this.userCredentials = this.clientID + "&access_token=" + this.accessToken + "",
			this.options = $.extend( {}, $.fn.spectragram.options, options );
        },

        // Users
		// Get the most recent media published by a user.
        getRecentMedia: function ( userID ) {
			var self = this,
				getData = "/users/" + userID + "/media/recent/?" + self.userCredentials;

                self.fetch( getData ).done( function ( results ) {
                    self.display( results );
                } );
		},

		// Search for a user by name.
        getUserFeed: function () {
			var self = this,
				getData = "/users/search?q=" + self.options.query + "&count=" + self.options.max + "&access_token=" + self.accessToken + "";

				self.fetch( getData ).done( function ( results ) {
					if ( results.data.length ) {
						// Only request media for exact match, otherwise 400 error
						for ( var length = results.data.length, i = 0; i < length; i++ ) {
							if ( results.data[i].username === self.options.query ) {
								self.getRecentMedia( results.data[i].id );
							}
						}
					} else {
						$.error( "Spectragram.js - Error: the username " + self.options.query + " does not exist." );
					}
                } );
		},

        // Media
        // Get a list of what media is most popular at the moment
        getPopular: function () {
            var self = this,
                getData = "/media/popular?client_id=" + self.userCredentials;

                self.fetch( getData ).done( function ( results ) {
                    self.display( results );
                } );
        },

        // Tags
        // Get a list of recently tagged media
        getRecentTagged: function () {
            var self = this,
                getData = "/tags/" + self.options.query + "/media/recent?client_id=" + self.userCredentials;

                self.fetch( getData ).done( function ( results ) {
					if ( results.data.length ) {
						self.display( results );
					} else {
						$.error( "Spectragram.js - Error: the tag " + self.options.query + " does not have results." );
					}
                } );
        },

        fetch: function ( getData ) {
            var getUrl = this.API_URL + getData;

            return $.ajax( {
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: getUrl
            } );
        },

        display: function ( results ) {
            var self = this,
                max = ( self.options.max >= results.data.length ) ? results.data.length : self.options.max,
                setSize = self.options.size,
                size,
                titleIMG;

            if ( results.data.length === 0 ) {
                self.$elem.append( $( self.options.wrapEachWith ).append( self.options.notFoundMsg ) );
            } else {
				for ( var i = 0; i < max; i++ ) {
					if ( setSize === "small" ) {
						size = results.data[i].images.thumbnail.url;
					} else if ( setSize === "medium" ) {
						size = results.data[i].images.low_resolution.url;
					} else {
						size = results.data[i].images.standard_resolution.url;
					}

					// Skip if the caption is empty.
					if ( results.data[i].caption !== null ) {
						/**
						* 1. First it creates a dummy element <span/>
						* 2. And then puts the caption inside the element created previously.
						* 3. Extracts the html caption (this allows html codes to be included).
						* 4. Lastly, the most important part, create the Title attribute using double quotes
						* to enclose the text. This fixes the bug when the caption retrieved from Instagram
						* includes single quotes which breaks the Title attribute.
						*/
						titleIMG = "title='" + $( "<span/>" ).text( results.data[i].caption.text ).html() + "'";
					}

					// Now concatenate the titleIMG generated.
					self.$elem.append( $( self.options.wrapEachWith ).append( "<a " + titleIMG + " target='_blank' href='" + results.data[i].link + "'><img src='" + size + "'></img></a>" ) );
				}
            }

			if ( typeof self.options.complete === "function" ) {
				self.options.complete.call( self );
			}
        }
    };

	jQuery.fn.spectragram = function ( method, options ) {
		if ( jQuery.fn.spectragram.accessData.clientID ) {

			this.each( function () {
				var instagram = Object.create( Instagram );

				instagram.initialize( options, this );

				if ( instagram[method] ) {
					return instagram[method]( this );
				} else {
					$.error( "Method " + method + " does not exist on jQuery.spectragram" );
				}
			});

		} else {
			$.error( "You must define an accessToken and a clientID on jQuery.spectragram" );
		}
    };

    // Plugin Default Options
    jQuery.fn.spectragram.options = {
		complete : null,
		max: 10,
		query: "coffee",
		size: "medium",
		wrapEachWith: "<li></li>"
    };

	// Instagram Access Data
	jQuery.fn.spectragram.accessData = {
        accessToken: null,
		clientID: null
    };

} )( jQuery, window, document );
