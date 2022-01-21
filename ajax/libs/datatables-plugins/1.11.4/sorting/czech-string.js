/**
 * This plug-in provides locale aware sorting for Czech.
 *
 *  @name Czech
 *  @summary Sort locale aware sorting for Czech.
 *  @author  
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'czech', targets: 0 }
 *       ]
 *    } );
 */

 $.extend( $.fn.dataTableExt.oSort, {
   "czech-pre": function ( a ) {
        var special_letters = {
            "A": "Aa", "a": "aa", "Á": "Ab", "á": "ab",
            "C": "Ca", "c": "ca", "Č": "Cb", "č": "cb",
            "D": "Da", "d": "da", "Ď": "db", "ď": "db",
            "E": "Ea", "e": "ea", "É": "eb", "é": "eb", "Ě": "Ec", "ě": "ec",
            "I": "Ia", "i": "ia", "Í": "Ib", "í": "ib",
            "N": "Na", "n": "na", "Ň": "Nb", "ň": "nb",
            "O": "Oa", "o": "oa", "Ó": "Ob", "ó": "ob",
            "R": "Ra", "r": "ra", "Ř": "Rb", "ř": "rb",
            "S": "Sa", "s": "sa", "Š": "Sb", "š": "sb",
            "T": "Ta", "t": "ta", "Ť": "Tb", "ť": "tb",
            "U": "Ua", "u": "ua", "Ú": "Ub", "ú": "ub", "Ů": "Uc", "ů": "uc",
            "Y": "Ya", "y": "ya", "Ý": "Yb", "ý": "yb",
            "Z": "Za", "z": "za", "Ž": "Zb", "ž": "zb"
        };
        for (var val in special_letters)
            a = a.split(val).join(special_letters[val]).toLowerCase();
        return a;
    },

    "czech-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "czech-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
} );
