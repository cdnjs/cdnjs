/**
 * This plug-in will add automatic negative currency detection for currency columns to
 * DataTables. Note that only $, c, £ and € symbols are detected with this code,
 * This plugin has also been updated to automatically detect negative values either those
 * using '-' as well as numbers using '()' to specify negatives.
 * This plugin also includes automatic type detection
 *
 *  @name brackets-negative
 *  @summary Detect data of currency type with a leading currency symbol as well at detect two types of negative number formatting
 *  @author [Tom Buckle](http://sprymedia.co.uk)
 */
(function(){
	// Change this list to the valid characters you want to be detected
	var validChars = "$£€c" + "0123456789" + ".-,()'";
	// Init the regex just once for speed - it is "closure locked"
	var
	str = jQuery.fn.dataTableExt.oApi._fnEscapeRegex( validChars ),re = new RegExp('[^'+str+']');
	$.fn.dataTableExt.aTypes.unshift(
		function ( data )
		{
			if ( typeof data !== 'string' || re.test(data) ) {
				return null;
			}
			return 'currency';
		}
	);
	$.fn.dataTable.ext.type.order['currency-pre'] = function ( data ) {
		if ( data === '' ) {
			return 0;
		}

		//Check if its in the proper format
		if(data.match(/[\()]/g)){
			if( data.match(/[\-]/g) !== true){
				//It matched - strip out parentheses & any characters we dont want and append - at front
				data = '-' + data.replace(/[\$£€c\(\),]/g,'');
			}else{
				//Already has a '-' so just strip out non-numeric charactors exluding '-'
				data = data.replace(/[^\d\-\.]/g,'');
			}
		}else{
			data = data.replace(/[\$£€\,]/g,'');
		}
		return parseFloat( data );
	};
}());
