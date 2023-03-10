/**
 * This type-detection plug-in will look at an HTML string from a data cell,
 * strip the HTML tags and then check to see if the remaining data is numeric.
 * If it is, then the data can be sorted numerically with the Numbers with HTML
 * sorting plug-in.
 *
 * DataTables 1.10+ has numeric HTML data type and sorting abilities built-in.
 * As such this plug-in is marked as deprecated, but might be useful when
 * working with old versions of DataTables.
 *
 *  @name Numbers with HTML
 *  @summary Detect data which is a mix of HTML and numeric data.
 *  @deprecated DataTables 1.10+ has built in support for this data type
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 */

jQuery.fn.dataTableExt.aTypes.unshift( function ( sData )
{
	sData = typeof sData.replace == 'function' ?
		sData.replace( /<[\s\S]*?>/g, "" ) : sData;
	sData = sData.trim();

	var sValidFirstChars = "0123456789-";
	var sValidChars = "0123456789.";
	var Char;
	var bDecimal = false;

	/* Check for a valid first char (no period and allow negatives) */
	Char = sData.charAt(0);
	if (sValidFirstChars.indexOf(Char) == -1)
	{
		return null;
	}

	/* Check all the other characters are valid */
	for ( var i=1 ; i<sData.length ; i++ )
	{
		Char = sData.charAt(i);
		if (sValidChars.indexOf(Char) == -1)
		{
			return null;
		}

		/* Only allowed one decimal place... */
		if ( Char == "." )
		{
			if ( bDecimal )
			{
				return null;
			}
			bDecimal = true;
		}
	}

	return 'num-html';
} );
