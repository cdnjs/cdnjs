(function($){
	$.fn.smkValidate.Languaje = {
		en: {
			// Mensaje de error para los input vacíos
			textEmpty        : 'Required field',
			// Mensaje de error para el input email
			textEmail        : 'Enter a valid email',
			// Mensaje de error para el input number
			textNumber       : 'Only numbers are allowed',
			// Mensaje de error para el input alphanumeric
			textAlphanumeric : 'Only numbers and/or letters allowed',
			// Mensaje de error para el input currency
			textCurrency     : 'Please enter a valid monetary amount',
			// Mensaje de error para el input select
			textSelect       : 'It is necessary that you select an option',
			// Mensaje de error para el input checkbox y radio
			textCheckbox     : 'It is necessary that you select an option',
			// Mensaje de error para longitud de caracteres
			textLength       : 'The number of characters is equal to <b> {@} </b>',
			// Mensaje de error para rango de caracteres
			textRange        : 'The number of characters must be greater than <b> {@} </b> and less than <b> {@} </b>',
			// Mensaje de error para strongPass Default
			textSPassDefault : 'Minimum 4 characters',
			// Mensaje de error para strongPass Weak
			textSPassWeak    : 'Minimum 6 characters',
			// Mensaje de error para strongPass Madium
			textSPassMedium  : 'Minimum 6 characters and a number',
			// Mensaje de error para strongPass Strong
			textSPassStrong  : 'Minimum 6 characters a number and a capital'
		}
	};

	$.smkDate.Languaje = {
		en: {
			shortMonthNames  : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		}
	};

}(jQuery));