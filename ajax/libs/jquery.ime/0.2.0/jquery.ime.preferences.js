( function ( $ ) {
	'use strict';

	$.extend( $.ime.preferences, {
		registry: {
			isDirty: false,
			language: null,
			previousLanguages: [], // array of previous languages
			previousInputMethods: [], // array of previous inputmethods
			imes: {
				en: 'system'
			}
		},

		setLanguage: function ( language ) {
			// Do nothing if there's no actual change
			if ( language === this.registry.language ) {
				return;
			}

			this.registry.language = language;
			this.registry.isDirty = true;
			if ( !this.registry.previousLanguages ) {
				this.registry.previousLanguages = [];
			}

			// Add to the previous languages, but avoid duplicates.
			if ( $.inArray( language, this.registry.previousLanguages ) === -1 ) {
				this.registry.previousLanguages.unshift( language );
				this.registry.previousLanguages = this.registry.previousLanguages.slice( 0, 5 );
			}
		},

		getLanguage: function () {
			return this.registry.language;
		},

		getDefaultLanguage: function () {
			return 'en';
		},

		getPreviousLanguages: function () {
			return this.registry.previousLanguages;
		},

		getPreviousInputMethods: function () {
			return this.registry.previousInputMethods;
		},

		// Set the given IM as the last used for the language
		setIM: function ( inputMethod ) {
			if ( !this.registry.imes ) {
				this.registry.imes = {};
			}

			// Do nothing if there's no actual change
			if ( inputMethod === this.registry.imes[ this.registry.language ] ) {
				return;
			}

			this.registry.imes[ this.getLanguage() ] = inputMethod;
			this.registry.isDirty = true;
			if ( !this.registry.previousInputMethods ) {
				this.registry.previousInputMethods = [];
			}

			// Add to the previous languages,
			if ( inputMethod !== 'system' ) {
				this.registry.previousInputMethods.unshift( inputMethod );
				this.registry.previousInputMethods = this.registry.previousInputMethods.slice( 0, 5 );
			}
		},

		// Return the last used or the default IM for language
		getIM: function ( language ) {
			if ( !this.registry.imes ) {
				this.registry.imes = {};
			}

			return this.registry.imes[ language ] || 'system';
		},

		save: function () {
			// save registry in cookies or localstorage
		},

		load: function () {
			// load registry from cookies or localstorage
		}
	} );
}( jQuery ) );
