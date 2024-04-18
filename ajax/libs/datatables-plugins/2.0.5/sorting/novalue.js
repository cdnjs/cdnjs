/**
 * When sorting values in a DataTable you might want to sort any 'novalue' 
 * pattern as max or min value in a column (e.g. '-' treat as -1000 or 1000).
 * 
 * This is very useful if You want to sort incomplete data, there is no 
 * data available for each entry in a column (e.g. Recovered for covid-19). 
 * 
 * If You do not have data, You can set the 'novalue' pattern to '-' or 
 * any other pattern and set exact column to treat this 'novalue' pattern 
 * as the max value (sethigh) or the min value (setlow).
 * 
 * @name novalue.js
 * @summary Sort any "novalue" pattern as max or min (e.g. '-' treat as -1000 or 1000).
 * @author Darek L https://github.com/dprojects
 * @deprecated
 * 
 * @example
 * 
 *      gTable = $('#covid-table').DataTable({
 *                  "orderClasses": true,
 *                  "responsive": true,
 *                  "columnDefs": [ { "type": "sethigh", "targets": [2, ,3, 4, 7, 8] }, 
 *                                  { "type": "setlow", "targets": [5, 6] } ]
 *      });
 * 
 * To change order later:
 * 
 *      gTable.order([8, 'asc'],[6, 'desc']).draw();
 * 
 * Keep in mind there must be "desc" in this case not "dsc".
 * 
 */


/**
 * Set novalue pattern below if You want other.
 * For example:
 * 
 * var novalue = 'N/A';
 * var novalue = 'no value';
 * var novalue = 'empty';
 * 
 */

var novalue = '-';

$.extend( $.fn.dataTableExt.oSort, {

    "sethigh-asc": function ( a, b ) {
        
        let x = a;
        let y = b;
        
             if (x == novalue && y != novalue) { return  1; }
        else if (x != novalue && y == novalue) { return -1; }
        else if (x == novalue && y == novalue) { return  0; }
        else if (x != novalue && y != novalue) { 
            
            x = parseFloat(a); 
            y = parseFloat(b);
            
            return ( (x < y) ? -1 : ( (x > y) ? 1 : 0 ) );
        }
    },
    "sethigh-desc": function ( a, b ) {
        
        let x = a;
        let y = b;
        
             if (x == novalue && y != novalue) { return -1; }
        else if (x != novalue && y == novalue) { return  1; }
        else if (x == novalue && y == novalue) { return  0; }
        else if (x != novalue && y != novalue) { 
            
            x = parseFloat(a); 
            y = parseFloat(b);            
            
            return ( (x < y) ? 1 : ( (x > y) ? -1 : 0 ) );
        }
    },
    
    "setlow-asc": function ( a, b ) {
        
        let x = a;
        let y = b;
        
             if (x == novalue && y != novalue) { return -1; }
        else if (x != novalue && y == novalue) { return  1; }
        else if (x == novalue && y == novalue) { return  0; }
        else if (x != novalue && y != novalue) { 
            
            x = parseFloat(a); 
            y = parseFloat(b);
            
            return ( (x < y) ? -1 : ( (x > y) ? 1 : 0 ) );
        }
    },
    "setlow-desc": function ( a, b ) {
        
        let x = a;
        let y = b;
        
             if (x == novalue && y != novalue) { return  1; }
        else if (x != novalue && y == novalue) { return -1; }
        else if (x == novalue && y == novalue) { return  0; }
        else if (x != novalue && y != novalue) { 
            
            x = parseFloat(a); 
            y = parseFloat(b);            
            
            return ( (x < y) ? 1 : ( (x > y) ? -1 : 0 ) );
        }
    }
});
