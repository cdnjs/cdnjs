(function(root, factory){
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(function(){
      return factory(root);
    });
  } else if (typeof module == 'object' && module && module.exports) {
    module.exports = factory(root);
  } else {
    root.Levenshtein = factory(root);
  }
}(this, function(root){

  var forEach;
  // Generics
  if ( ! Array.forEach ) {
    forEach = function ( array, iterator, context ) {
      iterator = context
        ? iterator.bind( context )
        : iterator
      Array.prototype.forEach.call( array, iterator )
    }
  } else {
    forEach = Array.forEach;
  }

  // Levenshtein distance
  return function Levenshtein( str_m, str_n ) { var previous, current, matrix
    // Instance methods
    this.valueOf = function() {
      return this.distance
    }

    this.toString = this.inspect = function inspect ( no_print ) { var max, buff, sep, rows
      max = matrix.reduce( function( m, o ) {
        return Math.max( m, o.reduce( Math.max, 0 ) )
      }, 0 )
      buff = Array( ( max + '' ).length ).join( ' ' )

      sep = []
      while ( sep.length < (matrix[0] && matrix[0].length || 0) )
        sep[ sep.length ] = Array( buff.length + 1 ).join( '-' )
      sep = sep.join( '-+' ) + '-'

      rows = matrix.map( function( row ) { var cells
        cells = row.map( function( cell ) {
          return ( buff + cell ).slice( - buff.length )
        })
        return cells.join( ' |' ) + ' '
      })

      return rows.join( "\n" + sep + "\n" )
    }

    // Constructor
    matrix = []

    // Sanity checks
    if ( str_m == str_n )
      return this.distance = 0
    else if ( str_m == '' )
      return this.distance = str_n.length
    else if ( str_n == '' )
      return this.distance = str_m.length
    else {
      // Danger Will Robinson
      previous = [ 0 ]
      forEach( str_m, function( v, i ) { i++, previous[ i ] = i } )

      matrix[0] = previous
      forEach( str_n, function( n_val, n_idx ) {
        current = [ ++n_idx ]
        forEach( str_m, function( m_val, m_idx ) {
          m_idx++
          if ( str_m.charAt( m_idx - 1 ) == str_n.charAt( n_idx - 1 ) )
            current[ m_idx ] = previous[ m_idx - 1 ]
          else
            current[ m_idx ] = Math.min
              ( previous[ m_idx ]     + 1   // Deletion
              , current[  m_idx - 1 ] + 1   // Insertion
              , previous[ m_idx - 1 ] + 1   // Subtraction
              )
        })
        previous = current
        matrix[ matrix.length ] = previous
      })

      return this.distance = current[ current.length - 1 ]
    }
  }
}));
