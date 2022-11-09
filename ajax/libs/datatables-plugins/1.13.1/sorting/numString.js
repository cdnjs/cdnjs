/**
 * 
 * This plug in will sort only on the number value that is included anywhere in a Regex.
 * This is useful for sorting data which requires some extra context to be included in the table.
 *
 *  @name numString
 *  @summary Sorting for number value that is included anywhere in a regex.
 *  @author [Sandy Galloway](http://datatables.net)
 *
 * 
 *  @example
 * //This example shows a mixture of text and number values, with the number at the start of the expression.
 * //It is using regex and start and end of expression tags.
 * //It will match "5 examples completed." for example. 
 * $(document).ready( function(){
 *      $.fn.dataTable.numString(/^\d+ examples? completed.$/);
 *      var table = $('#example').DataTable();
 * })
 * 
 * @example
 *  //This example shows a mixture of text and number values, with the number at the end of the expression.
 * //It is using regex and start and end of expression tags.
 * //It will match "Examples left: 67" for example. 
 *  $(document).ready( function(){
 *      $.fn.dataTable.numString(/^Examples? left: \d+$/);
 *      var table = $('#example').DataTable();
 * })
 * 
 * @example
 * //This example shows a mixture of text and number values, with the number in the middle of the expression.
 * //It is using regex and no start and end of expression tags.
 * //It will match "Only 1 left." for example. 
 *  $(document).ready(function(){
 *      $.fn.dataTable.numString(/Only \d+ left./);
 *      var table = $('example').DataTable();
 * })
 * 
    */
$.fn.dataTable.numString = function(format) {
    //This is the type detection plug in
    $.fn.dataTable.ext.type.detect.unshift(function(data) {
      if (typeof data !== "string") {
        return null;
      }
  
      if (data.match(format)) {
        return "numString-" + format.source;
      }
  
      return null;
    });
    
    //This is the ordering plug in
    $.fn.dataTable.ext.type.order[
      "numString-" + format.source + "-pre"
    ] = function(data) {
      var num = data.replace(/\D/g, "");
  
      return num * 1;
    };
    // end plug-in
  };
  