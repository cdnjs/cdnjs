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
			this.accessToken = $.fn.spectragram.accessData.accessToken,
			this.options = $.extend( {}, $.fn.spectragram.options, options );
			this.endpoints = this.setEndpoints();

			this.messages = {
				defaultImageAltText: "Instagram Photo related with " + this.options.query,
				notFound: "This user account is private or doesn't have any photos."
			};
		},

		// Set Endpoints
		// Returns an object of endpoints to use on the app
		setEndpoints: function () {
			return {
				usersSelf: "/users/self/?access_token=" + this.accessToken,
				usersMediaRecent: "/users/self/media/recent/?&count=" + this.options.max + "&access_token=" + this.accessToken,
				tagsMediaRecent: "/tags/" + this.options.query + "/media/recent?&count=" + this.options.max + "&access_token=" + this.accessToken
			}
		},

		// Get Photos
		// Call the fetch function and work with the response
		getPhotos: function ( endpoint ) {
			var self = this;

			self.fetch( endpoint ).done( function ( results ) {
				var status = self.options.query || 'User';

				if ( results.data.length ) {
					self.display( results );
				} else {
					$.error( "Spectragram.js - Error: " + status + " does not have photos." );
				}
			} );
		},

		// Users
		// Get the most recent media published by the owner of the access_token.
        getUserFeed: function () {
			this.getPhotos( this.endpoints.usersMediaRecent );
		},

        // Tags
        // Get a list of recently tagged media
        getRecentTagged: function () {
            this.getPhotos( this.endpoints.tagsMediaRecent );
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
            var $element,
            	$image,
                isWrapperEmpty,
            	imageGroup = [],
                imageCaption,
                imageHeight,
                imageWidth,
                max,
                setSize,
                size;

            isWrapperEmpty = $( this.options.wrapEachWith ).length === 0;

            if ( results.data === undefined || results.meta.code !== 200 || results.data.length === 0 ) {
            	if ( isWrapperEmpty ) {
            		this.$elem.append( this.messages.notFound );
            	} else {
                	this.$elem.append( $( this.options.wrapEachWith ).append( this.messages.notFound ) );
            	}
            } else {
            	max = ( this.options.max >= results.data.length ) ? results.data.length : this.options.max;
            	setSize = this.options.size;

				for ( var i = 0; i < max; i++ ) {
					if ( setSize === "small" ) {
						size = results.data[i].images.thumbnail.url;
						imageHeight = results.data[i].images.thumbnail.height;
						imageWidth = results.data[i].images.thumbnail.width;
					} else if ( setSize === "medium" ) {
						size = results.data[i].images.low_resolution.url;
						imageHeight = results.data[i].images.low_resolution.height;
						imageWidth = results.data[i].images.low_resolution.width;
					} else {
						size = results.data[i].images.standard_resolution.url;
						imageHeight = results.data[i].images.standard_resolution.height;
						imageWidth = results.data[i].images.standard_resolution.width;
					}

					imageCaption = ( results.data[i].caption !== null ) ?
									$( "<span>" ).text( results.data[i].caption.text ).html() :
									this.messages.defaultImageAltText;

					$image = $( "<img>", {
						alt: imageCaption,
						attr: {
							height: imageHeight,
							width: imageWidth
						},
						src: size
					} );

					$element = $( "<a>", {
						href: results.data[i].link,
						target: "_blank",
						title: imageCaption
					} ).append( $image );

					if ( isWrapperEmpty ) {
						imageGroup.push( $element );
					} else {
						imageGroup.push( $( this.options.wrapEachWith ).append( $element ) );
					}
				}

				this.$elem.append( imageGroup );
            }

			if ( typeof this.options.complete === "function" ) {
				this.options.complete.call( this );
			}
        }
    };

	jQuery.fn.spectragram = function ( method, options ) {
		if ( jQuery.fn.spectragram.accessData.accessToken ) {

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
			$.error( "You must define an accessToken on jQuery.spectragram" );
		}
    };

    // Plugin Default Options
    jQuery.fn.spectragram.options = {
		complete : null,
		max: 20,
		query: "instagram",
		size: "medium",
		wrapEachWith: "<li></li>"
    };

	// Instagram Access Data
	jQuery.fn.spectragram.accessData = {
        accessToken: null
    };

} )( jQuery, window, document );
