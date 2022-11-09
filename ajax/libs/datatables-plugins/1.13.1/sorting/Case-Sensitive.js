/**
 * 
 *This plug in will sort data taking into account upper and lower case. In ascending order it will prioritise
 *upper case letters, before continuing to the lower case letters.
 *
 *  @name Case-Sensitive
 *  @summary Sort based on case of data, In ascending order capitals are prioritised over lower case.
 *  @author [Sandy Galloway](http://datatables.net)
 *
 * 
 *  @example
 * //This example shows how to invoke the case-sensitive plugin on the first column.
 * //It will sort the data in alphabetical order Prioritising the capital letters to take
 * //a form similair to [A,B,C,D,...,a,b,c,d,...] for ascending order. 
 * $(document).ready( function () {
 *   var table = $('#example').DataTable({
 *           "columnDefs": [
 *            {"type": "case-sensitive",targets:0}
 *         ]
 *      });
 * } );
 * 
 **/

jQuery.extend(jQuery.fn.dataTableExt.oSort,{

    "case-sensitive-asc": function(a,b){
          if(a<b){
              return -1;
          } else if(a>b){
              return 1;
          } else{
              return 0;
          }
    },
    "case-sensitive-desc": function(a,b){
          if(a>b){
              return -1;
          } else if(a<b){
              return 1;
          } else{
              return 0;
          } 
    }
  });
  