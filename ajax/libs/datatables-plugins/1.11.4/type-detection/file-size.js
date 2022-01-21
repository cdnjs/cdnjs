/**
 * Detect file size type columns automatically. Commonly used for computer
 * file sizes, this can allow sorting to take the order of magnitude indicated
 * by the label (GB etc) into account.
 *
 *  @name File size
 *  @summary Detect abbreviated file size data (8MB, 4KB, 3B, etc)
 *  @author Allan Jardine - datatables.net
 */

jQuery.fn.dataTable.ext.type.detect.unshift( function ( data ) {
	if ( typeof data !== 'string' ) {
		return null;
	}

	var matches = data.match( /^(\d+(?:\.\d+)?)\s*([a-z]+)/i );
	var units = ['b', 'kb', 'mb', 'gb', 'tb', 'pb'];
	var is_file_size = ( matches && jQuery.inArray(matches[2].toLowerCase(), units) !== -1 );
	return is_file_size ? 'file-size' : null;
} );
