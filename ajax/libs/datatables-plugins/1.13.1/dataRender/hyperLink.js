/**
 * This data rendering helper method can be useful when a hyperLink with custom
 * anchorText has to rendered. The data for the column is still fully searchable and sortable, based on the hyperLink value,
 * and sortable, based on the hyperLink value, but during display in webpage is rendered with custom placeholder
 *
 * It accepts four parameters:
 *
 * 1. 'anchorText' -  type string - (optional - default `Click Here`)  - The custom placeholder to display
 * 2. 'location' -  type string - (optional - default `newTab`)
 * 		takes two values 'newTab' and 'popup'
 * 3. 'width' -  type integer - (optional - default `600`)
 *		The custom width of popup to display.
 *		Value is utilised on when 'location' is given as 'popup'.
 * 4. 'height' -  type integer - (optional - default `400`)
 *		The custom heigth of popup to display.
 *		Value is utilised on when 'location' is given as 'popup'.
 *
 *  @name hyperLink
 *  @summary Displays url data in hyperLink with custom plcaeholder
 *  @author [Lokesh Babu]
 *  @requires DataTables 1.10+
 *
 *
 *  @example
 *    // Display the hyperlink with 'Click Here', which open hyperlink in new Tab or new Window based on Browser setting
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 1,
 *        render: $.fn.dataTable.render.hyperLink()
 *      } ]
 *    } );
 *
 *  @example
 *    // Display the hyperlink with 'Download', which open hyperlink in new Tab or new Window based on Browser setting
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: $.fn.dataTable.render.hyperLink( 'Download' )
 *      } ]
 *    } );
 *
 *  @example
 *    // Display the hyperlink with 'Download', which open hyperlink in popup
 *    //		with size 600as width and 400 as height
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: $.fn.dataTable.render.hyperLink( 'Download', 'popup' )
 *      } ]
 *    } );
 *
 *  @example
 *    // Display the hyperlink with 'Download', which open hyperlink in popup
 *    //		with size 1000 width and 500 as height
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: $.fn.dataTable.render.hyperLink( 'Download', 'popup' , 1000, 500)
 *      } ]
 *    } );
 */

jQuery.fn.dataTable.render.hyperLink = function (
  anchorText,
  location,
  width,
  height
) {
  validateAndReturnDefaultIfFailed = function (item, defaultValue) {
    if (typeof item === "number") {
      return item;
    }

    if (typeof item === "string") {
      return parseInt(item) ? item : defaultValue;
    }

    return defaultValue;
  };

  var anchorText = anchorText || "Click Here";
  var location = location || "newTab";
  var width = validateAndReturnDefaultIfFailed(width, "600");
  var height = validateAndReturnDefaultIfFailed(height, "400");

  return function (data, type, row) {
    // restriction only for table display rendering
    if (type !== "display") {
      return data;
    }

    var url = data;

    try {
      url = new URL(data);

      switch (location) {
        case "newTab":
          return (
            '<a title="' +
            url +
            '" href="' +
            url +
            '" target="_blank">' +
            anchorText +
            "</a>"
          );
        case "popup":
          return (
            '<a title="' +
            url +
            '" href="' +
            url +
            '" target="popup" rel="noopener noreferrer" onclick="window.open(\'' +
            url +
            "', '" +
            anchorText +
            "', 'width=" +
            width +
            ",height=" +
            height +
            "'); return false;\">" +
            anchorText +
            "</a>"
          );
        default:
          return (
            '<a title="' +
            url +
            '" href="' +
            url +
            '" target="_blank">' +
            anchorText +
            "</a>"
          );
      }
    } catch (e) {
      return url;
    }
  };
};
