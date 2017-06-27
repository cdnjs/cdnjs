/**
 * Backbone-tastypie.js 0.2
 * (c) 2011 Paul Uithol
 * 
 * Backbone-tastypie may be freely distributed under the MIT license.
 * Add or override Backbone.js functionality, for compatibility with django-tastypie.
 * Depends on Backbone (and thus on Underscore as well): https://github.com/documentcloud/backbone.
 */
(function( undefined ) {
	"use strict";

	// Backbone and underscore noConflict support. Save local reference to _ and Backbone objects.
	var _, Backbone;
	// CommonJS shim
	if ( typeof window === 'undefined' ) {
		_ = require( 'underscore' );
		Backbone = require( 'backbone' );
	}
	else {
		_ = window._;
		Backbone = window.Backbone;
	}

	Backbone.Tastypie = {
		doGetOnEmptyPostResponse: true,
		doGetOnEmptyPutResponse: false,
		apiKey: {
			username: '',
			key: ''
		},
		csrfToken: ''
	};

	/**
	 * Override Backbone's sync function, to do a GET upon receiving a HTTP CREATED.
	 * This requires 2 requests to do a create, so you may want to use some other method in production.
	 * Modified from http://joshbohde.com/blog/backbonejs-and-django
	 */
	Backbone.oldSync = Backbone.sync;
	Backbone.sync = function( method, model, options ) {
		var headers = {};

		if ( Backbone.Tastypie.apiKey && Backbone.Tastypie.apiKey.username ) {
			headers[ 'Authorization' ] = 'ApiKey ' + Backbone.Tastypie.apiKey.username + ':' + Backbone.Tastypie.apiKey.key;
		}

		if ( Backbone.Tastypie.csrfToken ) {
			headers[ 'X-CSRFToken' ] = Backbone.Tastypie.csrfToken;
		}

		// Keep `headers` for a potential second request
		headers = _.extend( headers, options.headers );
		options.headers = headers;

		if ( ( method === 'create' && Backbone.Tastypie.doGetOnEmptyPostResponse ) ||
			( method === 'update' && Backbone.Tastypie.doGetOnEmptyPutResponse ) ) {
			var dfd = new $.Deferred();

			// Set up 'success' handling
			var success = options.success;
			dfd.done( function( resp, textStatus, xhr ) {
				_.isFunction( success ) && success( resp );
			});

			options.success = function( resp, textStatus, xhr ) {
				// If create is successful but doesn't return a response, fire an extra GET.
				// Otherwise, resolve the deferred (which triggers the original 'success' callbacks).
				if ( !resp && ( xhr.status === 201 || xhr.status === 202 || xhr.status === 204 ) ) { // 201 CREATED, 202 ACCEPTED or 204 NO CONTENT; response null or empty.
					var location = xhr.getResponseHeader( 'Location' ) || model.url();
					return Backbone.ajax({
						url: location,
						headers: headers,
						success: dfd.resolve,
						error: dfd.reject
					});
				}
				else {
					return dfd.resolveWith( options.context || options, [ resp, textStatus, xhr ] );
				}
			};

			// Set up 'error' handling
			var error = options.error;
			dfd.fail( function( xhr, textStatus, errorThrown ) {
				_.isFunction( error ) && error( xhr.responseText );
			});

			options.error = function( xhr, textStatus, errorText ) {
				dfd.rejectWith( options.context || options, [ xhr, textStatus, xhr.responseText ] );
			};

			// Create the request, and make it accessibly by assigning it to the 'request' property on the deferred
			dfd.request = Backbone.oldSync( method, model, options );
			return dfd;
		}

		return Backbone.oldSync( method, model, options );
	};

	Backbone.Model.prototype.idAttribute = 'resource_uri';

	Backbone.Model.prototype.url = function() {
		// Use the 'resource_uri' if possible
		var url = this.get( 'resource_uri' );

		// If there's no idAttribute, use the 'urlRoot'. Fallback to try to have the collection construct a url.
		// Explicitly add the 'id' attribute if the model has one.
		if ( !url ) {
			url = _.isFunction( this.urlRoot ) ? this.urlRoot() : this.urlRoot;
			url = url || this.collection && ( _.isFunction( this.collection.url ) ? this.collection.url() : this.collection.url );

			if ( url && this.has( 'id' ) ) {
				url = addSlash( url ) + this.get( 'id' );
			}
		}

		url = url && addSlash( url );

		return url || null;
	};

	/**
	 * Return the first entry in 'data.objects' if it exists and is an array, or else just plain 'data'.
	 */
	Backbone.Model.prototype.parse = function( data ) {
		return data && data.objects && ( _.isArray( data.objects ) ? data.objects[ 0 ] : data.objects ) || data;
	};

	/**
	 * Return 'data.objects' if it exists.
	 * If present, the 'data.meta' object is assigned to the 'collection.meta' var.
	 */
	Backbone.Collection.prototype.parse = function( data ) {
		if ( data && data.meta ) {
			this.meta = data.meta;
		}

		return data && data.objects || data;
	};

	Backbone.Collection.prototype.url = function( models ) {
		var url = _.isFunction( this.urlRoot ) ? this.urlRoot() : this.urlRoot;
		// If the collection doesn't specify an url, try to obtain one from a model in the collection
		if ( !url ) {
			var model = models && models.length && models[ 0 ];
			url = model && ( _.isFunction( model.urlRoot ) ? model.urlRoot() : model.urlRoot );
		}
		url = url && addSlash( url );

		// Build a url to retrieve a set of models. This assume the last part of each model's idAttribute
		// (set to 'resource_uri') contains the model's id.
		if ( models && models.length ) {
			var ids = _.map( models, function( model ) {
				var parts = _.compact( model.url().split( '/' ) );
				return parts[ parts.length - 1 ];
			});
			url += 'set/' + ids.join( ';' ) + '/';
		}

		return url || null;
	};

	var addSlash = function( str ) {
		return str + ( ( str.length > 0 && str.charAt( str.length - 1 ) === '/' ) ? '' : '/' );
	};
})();
